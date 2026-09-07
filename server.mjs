import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const bridgePath = path.join(__dirname, "tools", "detect_anime_nsfw.py");
const port = Number(process.env.PORT || 4173);
const detectorWorker = { child: null, buffer: "", pending: [] };

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 35 * 1024 * 1024) throw new Error("La imagen supera el límite de 35 MB.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function decodeDataUrl(dataUrl) {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl || "");
  if (!match) throw new Error("Formato de imagen inválido.");
  return { mime: match[1], data: Buffer.from(match[2], "base64") };
}

function localPythonPath() {
  const localPython = process.platform === "win32"
    ? path.join(__dirname, ".venv", "Scripts", "python.exe")
    : path.join(__dirname, ".venv", "bin", "python");
  const fallbackPython = process.platform === "win32" ? "py" : "python3";
  return process.env.PYTHON || (existsSync(localPython) ? localPython : fallbackPython);
}

function rejectWorker(error) {
  const pending = detectorWorker.pending.splice(0);
  for (const request of pending) request.reject(error);
}

function ensureDetectorWorker() {
  if (detectorWorker.child && !detectorWorker.child.killed) return detectorWorker.child;

  const python = localPythonPath();
  const args = process.platform === "win32" && python === "py"
    ? ["-3", bridgePath]
    : [bridgePath];
  const child = spawn(python, args, { windowsHide: true, cwd: __dirname });
  detectorWorker.child = child;
  detectorWorker.buffer = "";

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    detectorWorker.buffer += chunk;
    let newline;
    while ((newline = detectorWorker.buffer.indexOf("\n")) >= 0) {
      const line = detectorWorker.buffer.slice(0, newline).trim();
      detectorWorker.buffer = detectorWorker.buffer.slice(newline + 1);
      if (!line) continue;
      const request = detectorWorker.pending.shift();
      if (!request) continue;
      try {
        const result = JSON.parse(line);
        if (!result.ok) request.reject(new Error(result.error || "El detector anime NSFW devolvió un error."));
        else request.resolve(result.detections || []);
      } catch {
        request.reject(new Error("El detector anime NSFW devolvió una respuesta inválida."));
      }
    }
  });
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => console.error(`[Anime NSFW] ${chunk.trim()}`));
  child.on("error", (error) => {
    if (detectorWorker.child === child) detectorWorker.child = null;
    rejectWorker(new Error(`No se pudo iniciar el detector anime NSFW: ${error.message}`));
  });
  child.on("close", (code) => {
    if (detectorWorker.child === child) detectorWorker.child = null;
    if (code !== 0) rejectWorker(new Error(`El detector anime NSFW terminó con código ${code}.`));
  });
  return child;
}

function runAnimeNsfwDetector(imagePath, threshold, classes) {
  const child = ensureDetectorWorker();
  return new Promise((resolve, reject) => {
    detectorWorker.pending.push({ resolve, reject });
    try {
      child.stdin.write(JSON.stringify({ imagePath, threshold, classes }) + "\n");
    } catch (error) {
      detectorWorker.pending.pop();
      reject(error);
    }
  });
}

async function detect(request, response) {
  let payload;
  try {
    payload = JSON.parse(await readBody(request));
    const { data } = decodeDataUrl(payload.dataUrl);
    const tempDir = await fs.mkdtemp(path.join(process.env.TEMP || process.env.TMP || ".", "autocensor-"));
    const extension = payload.mime === "image/png" ? ".png" : payload.mime === "image/webp" ? ".webp" : ".jpg";
    const imagePath = path.join(tempDir, `${crypto.randomUUID()}${extension}`);
    await fs.writeFile(imagePath, data);
    try {
      const result = await runAnimeNsfwDetector(
        imagePath,
        Math.min(0.99, Math.max(0.01, Number(payload.threshold ?? 0.35))),
        Array.isArray(payload.classes) ? payload.classes : [],
      );
      sendJson(response, 200, { ok: true, detections: result });
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    sendJson(response, 501, {
      ok: false,
      code: "DETECTOR_UNAVAILABLE",
      message: error instanceof Error ? error.message : "Error desconocido en el detector.",
      hint: "Instala ultralytics y coloca models\\nsfw-anime-xl-x1280.pt; la revisión manual sigue disponible.",
    });
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, "http://localhost");
  const relative = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const requested = path.normalize(path.join(publicDir, relative));
  if (!requested.startsWith(publicDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const file = await fs.readFile(requested);
    response.writeHead(200, { "content-type": mimeTypes[path.extname(requested)] || "application/octet-stream" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "POST" && request.url === "/api/detect") {
      await detect(request, response);
      return;
    }
    if (request.method === "GET") {
      await serveStatic(request, response);
      return;
    }
    response.writeHead(405);
    response.end("Method not allowed");
  } catch (error) {
    sendJson(response, 500, { ok: false, message: error instanceof Error ? error.message : "Error interno." });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Censor Station disponible en http://127.0.0.1:${port}`);
});

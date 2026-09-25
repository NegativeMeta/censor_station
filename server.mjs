import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { folderAccess } from "./tools/folder-access.mjs";
import { clamp, decodeDataUrl, readJsonBody, withTemporaryImage } from "./tools/server/image-api.mjs";
import { createPythonWorker } from "./tools/server/python-worker.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const publicDir = existsSync(distDir) ? distDir : path.join(__dirname, "public");
const port = Number(process.env.PORT || 4173);
import crypto from "node:crypto";
import os from "node:os";
const detectorWorker = createPythonWorker({ projectRoot: __dirname, moduleName: "tools.python.detector_worker", label: "Anime NSFW" });
const optimizerWorker = createPythonWorker({ projectRoot: __dirname, moduleName: "tools.python.optimizer_worker", label: "Pillow" });
const gifWorker = createPythonWorker({ projectRoot: __dirname, moduleName: "tools.python.gif_worker", label: "GIF" });
const MAX_GIF_ASSEMBLY_REQUEST_BYTES = 256 * 1024 * 1024;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(body));
}

async function detect(request, response) {
  try {
    const payload = await readJsonBody(request);
    const { mime, data } = decodeDataUrl(payload.dataUrl);
    const result = await withTemporaryImage({ data, mime, prefix: "autocensor-" }, async ({ imagePath }) => detectorWorker.request({
      imagePath,
      threshold: clamp(payload.threshold, 0.01, 0.99, 0.85),
      classes: Array.isArray(payload.classes) ? payload.classes : [],
    }));
    sendJson(response, 200, { ok: true, detections: result.detections || [] });
  } catch (error) {
    sendJson(response, 501, {
      ok: false,
      code: "DETECTOR_UNAVAILABLE",
      message: error instanceof Error ? error.message : "Error desconocido en el detector.",
      hint: "Instala ultralytics y coloca models\\nsfw-anime-xl-x1280.pt; la revisión manual sigue disponible.",
    });
  }
}

function unloadModel(request, response) {
  try {
    detectorWorker.stop();
    sendJson(response, 200, { ok: true, message: "Modelo descargado de memoria. Se recargará solo al analizar." });
  } catch (error) {
    sendJson(response, 500, { ok: false, message: error instanceof Error ? error.message : "No se pudo descargar el modelo." });
  }
}

async function optimize(request, response) {
  try {
    const payload = await readJsonBody(request);
    const { mime, data } = decodeDataUrl(payload.dataUrl);
    const allowedFormats = new Set(["original", "png", "webp", "jpeg"]);
    const format = allowedFormats.has(payload.format) ? payload.format : "original";
    const quality = clamp(payload.quality, 1, 95, 92);
    const optimized = await withTemporaryImage({ data, mime, prefix: "autocensor-optimize-" }, async ({ imagePath, outputPath }) => {
      const result = await optimizerWorker.request({ imagePath, outputPath, format, quality, lossless: payload.lossless === true });
      return { result, bytes: await fs.readFile(outputPath) };
    });
    sendJson(response, 200, {
      ok: true,
      dataUrl: `data:${optimized.result.mime};base64,${optimized.bytes.toString("base64")}`,
      mime: optimized.result.mime,
      extension: optimized.result.extension,
      width: optimized.result.width,
      height: optimized.result.height,
      size: optimized.bytes.length,
      lossless: optimized.result.lossless,
    });
  } catch (error) {
    sendJson(response, 501, {
      ok: false,
      code: "OPTIMIZER_UNAVAILABLE",
      message: error instanceof Error ? error.message : "Error desconocido al optimizar.",
      hint: "Instala Pillow con: python -m pip install -r requirements.txt",
    });
  }
}

async function gifExtract(request, response) {
  try {
    const payload = await readJsonBody(request);
    const { data } = decodeDataUrl(payload.dataUrl);
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "autocensor-gif-"));
    try {
      const imagePath = path.join(tempDir, `${crypto.randomUUID()}.gif`);
      const framesDir = path.join(tempDir, "frames");
      await fs.writeFile(imagePath, data);
      const result = await gifWorker.request({ action: "extract", imagePath, framesDir, maxFrames: payload.maxFrames });
      const frames = [];
      for (const frame of result.frames || []) {
        const bytes = await fs.readFile(path.join(framesDir, frame.file));
        frames.push({ ...frame, dataUrl: `data:image/png;base64,${bytes.toString("base64")}` });
      }
      sendJson(response, 200, { ok: true, width: result.width, height: result.height, loop: result.loop, frameCount: result.frameCount, frames });
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    sendJson(response, 501, {
      ok: false,
      code: "GIF_UNAVAILABLE",
      message: error instanceof Error ? error.message : "Error desconocido al extraer el GIF.",
      hint: "Instala Pillow con: python -m pip install -r requirements.txt",
    });
  }
}

/** SSE variant: streams {"done","total"} lines while Pillow extracts frames. */
async function gifExtractStream(request, response) {
  const payload = await readJsonBody(request);
  const { data } = decodeDataUrl(payload.dataUrl);
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "autocensor-gif-"));
  response.writeHead(200, { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store", connection: "keep-alive" });
  const send = (event) => response.write(`data: ${JSON.stringify(event)}\n\n`);
  try {
    const imagePath = path.join(tempDir, `${crypto.randomUUID()}.gif`);
    const framesDir = path.join(tempDir, "frames");
    await fs.writeFile(imagePath, data);
    const result = await gifWorker.request(
      { action: "extract", imagePath, framesDir, maxFrames: payload.maxFrames, progress: true },
      { onProgress: (event) => send({ done: event.done, total: event.total }) },
    );
    const frames = [];
    const list = result.frames || [];
    for (let index = 0; index < list.length; index++) {
      const bytes = await fs.readFile(path.join(framesDir, list[index].file));
      frames.push({ ...list[index], dataUrl: `data:image/png;base64,${bytes.toString("base64")}` });
      if (index % 10 === 0 || index === list.length - 1) send({ done: result.frameCount, total: result.frameCount, sending: index + 1 });
    }
    send({ finished: true, width: result.width, height: result.height, loop: result.loop, frameCount: result.frameCount, frames });
  } catch (error) {
    send({ finished: true, ok: false, code: "GIF_UNAVAILABLE", message: error instanceof Error ? error.message : "Error desconocido al extraer el GIF." });
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
    response.end();
  }
}

async function gifAssemble(request, response) {
  try {
    const payload = await readJsonBody(request, MAX_GIF_ASSEMBLY_REQUEST_BYTES);
    const metas = Array.isArray(payload.frames) ? payload.frames : [];
    if (!metas.length) throw new Error("Sin frames para ensamblar el GIF.");
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "autocensor-gif-"));
    try {
      const framesDir = path.join(tempDir, "frames");
      await fs.mkdir(framesDir, { recursive: true });
      for (const frame of metas) {
        const { data } = decodeDataUrl(frame.dataUrl);
        await fs.writeFile(path.join(framesDir, path.basename(String(frame.file || `${frame.index}.png`))), data);
      }
      const outputPath = path.join(tempDir, `${crypto.randomUUID()}.gif`);
      const result = await gifWorker.request({
        action: "assemble",
        framesDir,
        outputPath,
        loop: payload.loop,
        quality: payload.quality,
        frames: metas.map((frame) => ({ index: frame.index, delay: frame.delay, file: path.basename(String(frame.file || `${frame.index}.png`)) })),
      });
      const bytes = await fs.readFile(outputPath);
      sendJson(response, 200, { ok: true, encoder: result.encoder, frames: result.frames, loop: result.loop, dataUrl: `data:image/gif;base64,${bytes.toString("base64")}`, size: bytes.length });
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    sendJson(response, 501, {
      ok: false,
      code: "GIF_UNAVAILABLE",
      message: error instanceof Error ? error.message : "Error desconocido al ensamblar el GIF.",
      hint: "Instala Pillow con: python -m pip install -r requirements.txt",
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
    // Dev note: no-store on purpose. The UI is served from the same mutable
    // working tree the user edits; any caching here serves stale JS/CSS and
    // produces "I restarted and nothing changed" ghost bugs.
    response.writeHead(200, { "content-type": mimeTypes[path.extname(requested)] || "application/octet-stream", "cache-control": "no-store" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url === "/api/folder") {
      const host = request.headers.host;
      const allowedHosts = [`127.0.0.1:${port}`, `localhost:${port}`];
      if (request.method !== "POST" || !allowedHosts.includes(host) || request.headers.origin !== `http://${host}` || request.headers["x-censor-station"] !== "folder-access") {
        sendJson(response, 403, { ok: false, message: "Acceso local no autorizado." });
        return;
      }
      const result = await folderAccess(await readJsonBody(request));
      sendJson(response, 200, { ok: true, ...result });
      return;
    }
    if (request.method === "POST" && request.url === "/api/detect") return detect(request, response);
    if (request.method === "POST" && request.url === "/api/model/unload") return unloadModel(request, response);
    if (request.method === "POST" && request.url === "/api/optimize") return optimize(request, response);
    if (request.method === "POST" && request.url === "/api/gif/extract") return gifExtract(request, response);
    if (request.method === "POST" && request.url === "/api/gif/extract-stream") return gifExtractStream(request, response);
    if (request.method === "POST" && request.url === "/api/gif/assemble") return gifAssemble(request, response);
    if (request.method === "GET") return serveStatic(request, response);
    response.writeHead(405);
    response.end("Method not allowed");
  } catch (error) {
    sendJson(response, 500, { ok: false, message: error instanceof Error ? error.message : "Error interno." });
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`[Censor Station] Port ${port} is already in use. Stop the existing server or choose another port.`);
    process.exitCode = 1;
    return;
  }
  console.error("[Censor Station] Server error:", error);
  process.exitCode = 1;
});

process.once("exit", () => {
  detectorWorker.stop();
  optimizerWorker.stop();
  gifWorker.stop();
});

server.listen(port, "127.0.0.1", () => {
  console.log(String.raw`
        /\_/\
      .'     '.
     /  /\ /\  \       C E N S O R   S T A T I O N
    |  / o   o\  |
    |  |  ._. |  |      Let's censor until the world is free
    |  |      |  |      and this tool is no longer needed.
    | /'-----'\ |
     / /| >o< |\ \      SERVER ON {127.0.0.1:${port}}
    (_/ |_____| \_)
        /_____\          http://127.0.0.1:${port}
         | | |
         |_|_|           Press Ctrl+C to stop the server.
  `);
  if (process.platform === "win32" && process.argv.includes("--open-browser")) {
    const browser = spawn("explorer.exe", [`http://127.0.0.1:${port}`], { windowsHide: true, stdio: "ignore" });
    browser.on("error", () => console.error("[Censor Station] Could not open the browser. Open the address above manually."));
  }
});

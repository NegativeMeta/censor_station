import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";
import { promises as fs } from "node:fs";

const MAX_REQUEST_BYTES = 35 * 1024 * 1024;

export async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_REQUEST_BYTES) throw new Error("La imagen supera el límite de 35 MB.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function decodeDataUrl(dataUrl) {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl || "");
  if (!match) throw new Error("Formato de imagen inválido.");
  return { mime: match[1], data: Buffer.from(match[2], "base64") };
}

function imageExtension(mime) {
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  return ".jpg";
}

export async function withTemporaryImage({ data, mime, prefix }, action) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
  const imagePath = path.join(tempDir, `${crypto.randomUUID()}${imageExtension(mime)}`);
  const outputPath = path.join(tempDir, `${crypto.randomUUID()}.optimized`);
  await fs.writeFile(imagePath, data);
  try {
    return await action({ imagePath, outputPath });
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

export function clamp(value, minimum, maximum, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}

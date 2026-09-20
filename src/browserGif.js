import { decompressFrames, parseGIF } from "gifuct-js";
import { GIFEncoder, applyPalette, quantize } from "gifenc";

export const MAX_GIF_FRAMES = 300;
export const MIN_DELAY_MS = 10;
export const MAX_DELAY_MS = 10000;

export function clampDelay(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 100;
  return Math.max(MIN_DELAY_MS, Math.min(MAX_DELAY_MS, Math.round(number)));
}

/** Decode a GIF File/Blob into full-canvas RGBA frames. */
export async function decodeGif(blob, { maxFrames = MAX_GIF_FRAMES } = {}) {
  const buffer = await blob.arrayBuffer();
  const parsed = parseGIF(new Uint8Array(buffer));
  const raw = decompressFrames(parsed, true);
  if (!raw.length) throw new Error("El GIF no contiene frames.");
  if (raw.length > maxFrames) throw new Error(`El GIF tiene ${raw.length} frames; el máximo es ${maxFrames}.`);
  const width = parsed.lsd?.width || raw[0].dims.width;
  const height = parsed.lsd?.height || raw[0].dims.height;
  const loop = extractLoop(parsed);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  let previousRestore = null;
  const frames = [];

  for (let index = 0; index < raw.length; index++) {
    const frame = raw[index];
    if (frame.disposalType === 3 && previousRestore) {
      context.putImageData(previousRestore, 0, 0);
    } else if (frame.disposalType === 3) {
      context.clearRect(0, 0, width, height);
    }
    // Snapshot BEFORE drawing: disposal 3 restores this state after display.
    previousRestore = context.getImageData(0, 0, width, height);

    const { dims, patch } = frame;
    if (patch?.length) {
      const patchCanvas = document.createElement("canvas");
      patchCanvas.width = dims.width;
      patchCanvas.height = dims.height;
      patchCanvas.getContext("2d").putImageData(new ImageData(patch, dims.width, dims.height), 0, 0);
      context.drawImage(patchCanvas, dims.left, dims.top);
    }
    if (index === 0 && !patch?.length) {
      // Degenerate single-frame input: keep the canvas transparent instead of black.
      context.clearRect(0, 0, width, height);
    }

    const snapshot = context.getImageData(0, 0, width, height);
    frames.push({
      index,
      delay: clampDelay(frame.delay ?? 100),
      width,
      height,
      rgba: new Uint8ClampedArray(snapshot.data),
      dataUrl: renderFramePng(snapshot, width, height),
    });

    if (frame.disposalType === 2) {
      context.clearRect(dims.left, dims.top, dims.width, dims.height);
    }
  }
  return { width, height, loop, frameCount: frames.length, frames };
}

function renderFramePng(imageData, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

function extractLoop(parsed) {
  for (const frame of parsed.frames || []) {
    for (const extension of collectExtensions(frame)) {
      const text = JSON.stringify(extension);
      if (!/NETSCAPE/i.test(text)) continue;
      const bytes = collectBytes(extension);
      if (bytes.length >= 3) return Math.max(0, bytes[1] | (bytes[2] << 8));
      const match = text.match(/"(\d+)"\s*:\s*(\d+)/g) || [];
      const values = match.map((pair) => Number(pair.split(":")[1]));
      if (values.length >= 3) return Math.max(0, values[1] | (values[2] << 8));
      // NETSCAPE present but unreadable: assume infinite loop instead of once.
      return 0;
    }
  }
  return 0;
}

function collectExtensions(frame) {
  const found = [];
  for (const candidate of [frame.application, frame.applicationExtension, ...(frame.extensions || [])]) {
    if (candidate) found.push(candidate);
  }
  return found;
}

function collectBytes(extension) {
  const bytes = [];
  const walk = (value) => {
    if (typeof value === "number" && Number.isInteger(value)) bytes.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk(extension.blocks ?? extension.data ?? extension.authCode);
  return bytes;
}

/** Encode full-canvas RGBA frames back into a GIF blob. */
export function encodeGif(frames, { width, height, loop = 0 } = {}) {
  if (!frames?.length) throw new Error("Sin frames para ensamblar el GIF.");
  const gif = GIFEncoder();
  frames.forEach((frame, position) => {
    const rgba = frame.rgba instanceof Uint8ClampedArray ? frame.rgba : new Uint8ClampedArray(frame.rgba);
    const palette = quantize(rgba, 256);
    const indexed = applyPalette(rgba, palette);
    gif.writeFrame(indexed, width, height, {
      palette,
      delay: clampDelay(frame.delay),
      repeat: position === 0 ? Math.max(0, Number(loop) || 0) : undefined,
    });
  });
  gif.finish();
  return new Blob([gif.bytes()], { type: "image/gif" });
}

/** Non-animated convenience check used before choosing the frame pipeline. */
export function isAnimatedGifBlob(blob, name = "") {
  return blob?.type === "image/gif" || /\.gif$/i.test(name || "");
}

const MODEL_INPUT_SIZE = 1280;
const MASK_SIZE = 320;
const MASK_CHANNELS = 32;
const MASK_CONTEXT_CELLS = 2;
const OUTPUT_ROW_SIZE = 6 + MASK_CHANNELS;
const DEFAULT_MODEL_URL = "https://huggingface.co/negativemeta/censor-station-web-model/resolve/main/nsfw-anime-xl-x1280.onnx";
const CLASS_NAMES = ["anus", "nipple", "penis", "vagina", "female face", "male face", "pubic hair"];

function normalize(value) {
  return String(value || "").trim().toLowerCase().replaceAll("_", "-").replace(/\s+/g, " ");
}

function selectedClassSet(classes) {
  return new Set((classes || []).map(normalize).filter(Boolean));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

function modelPointToImage(x, y, meta) {
  return [
    clamp((x - meta.padX) / meta.scaleX, 0, meta.width),
    clamp((y - meta.padY) / meta.scaleY, 0, meta.height),
  ];
}

function preprocess(image) {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const scale = Math.min(MODEL_INPUT_SIZE / width, MODEL_INPUT_SIZE / height);
  const drawWidth = Math.max(1, Math.round(width * scale));
  const drawHeight = Math.max(1, Math.round(height * scale));
  const padX = (MODEL_INPUT_SIZE - drawWidth) / 2;
  const padY = (MODEL_INPUT_SIZE - drawHeight) / 2;
  const canvas = document.createElement("canvas");
  canvas.width = MODEL_INPUT_SIZE;
  canvas.height = MODEL_INPUT_SIZE;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.fillStyle = "rgb(114, 114, 114)";
  context.fillRect(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);
  context.imageSmoothingEnabled = true;
  context.drawImage(image, 0, 0, width, height, padX, padY, drawWidth, drawHeight);
  const pixels = context.getImageData(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE).data;
  const plane = MODEL_INPUT_SIZE * MODEL_INPUT_SIZE;
  const data = new Float32Array(plane * 3);
  for (let index = 0; index < plane; index++) {
    const pixel = index * 4;
    data[index] = pixels[pixel] / 255;
    data[plane + index] = pixels[pixel + 1] / 255;
    data[plane * 2 + index] = pixels[pixel + 2] / 255;
  }
  return { data, width, height, scale: drawWidth / width, scaleX: drawWidth / width, scaleY: drawHeight / height, padX, padY };
}

function addSegment(adjacency, first, second) {
  const key = (point) => `${point[0]}:${point[1]}`;
  const firstKey = key(first);
  const secondKey = key(second);
  if (firstKey === secondKey) return;
  if (!adjacency.has(firstKey)) adjacency.set(firstKey, { point: first, neighbors: new Set() });
  if (!adjacency.has(secondKey)) adjacency.set(secondKey, { point: second, neighbors: new Set() });
  adjacency.get(firstKey).neighbors.add(secondKey);
  adjacency.get(secondKey).neighbors.add(firstKey);
}

function marchingSquares(values, width, height, offsetX, offsetY, threshold = 0.5, activeMask = null) {
  const adjacency = new Map();
  const indexAt = (x, y) => y * width + x;
  const valueAt = (x, y) => {
    const index = indexAt(x, y);
    return activeMask && !activeMask[index] ? threshold - 1 : values[index];
  };
  const filled = (x, y) => x >= 0 && y >= 0 && x < width && y < height && valueAt(x, y) >= threshold;
  const crossing = (firstX, firstY, secondX, secondY) => {
    const first = valueAt(firstX, firstY);
    const second = valueAt(secondX, secondY);
    const difference = second - first;
    const amount = Math.abs(difference) < 0.000001 ? 0.5 : clamp((threshold - first) / difference, 0, 1);
    return [offsetX + firstX + (secondX - firstX) * amount, offsetY + firstY + (secondY - firstY) * amount];
  };
  const top = (x, y) => crossing(x, y, x + 1, y);
  const right = (x, y) => crossing(x + 1, y, x + 1, y + 1);
  const bottom = (x, y) => crossing(x, y + 1, x + 1, y + 1);
  const left = (x, y) => crossing(x, y, x, y + 1);
  const cases = {
    1: [[left, top]], 2: [[top, right]], 3: [[left, right]], 4: [[right, bottom]],
    5: [[left, top], [right, bottom]], 6: [[top, bottom]], 7: [[left, bottom]],
    8: [[bottom, left]], 9: [[top, bottom]], 10: [[top, left], [right, bottom]],
    11: [[right, bottom]], 12: [[right, left]], 13: [[top, right]],
    14: [[left, top]],
  };
  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const index = (filled(x, y) ? 1 : 0) | (filled(x + 1, y) ? 2 : 0) | (filled(x + 1, y + 1) ? 4 : 0) | (filled(x, y + 1) ? 8 : 0);
      for (const [first, second] of cases[index] || []) addSegment(adjacency, first(x, y), second(x, y));
    }
  }
  return adjacency;
}

function largestContour(adjacency) {
  const used = new Set();
  const paths = [];
  const edgeKey = (first, second) => first < second ? `${first}|${second}` : `${second}|${first}`;
  for (const [startKey, startNode] of adjacency) {
    for (const neighborKey of startNode.neighbors) {
      const firstEdge = edgeKey(startKey, neighborKey);
      if (used.has(firstEdge)) continue;
      const path = [];
      let previous = null;
      let current = startKey;
      while (current) {
        const node = adjacency.get(current);
        if (!node) break;
        path.push(node.point);
        const next = [...node.neighbors].find((candidate) => candidate !== previous && !used.has(edgeKey(current, candidate)));
        if (!next) break;
        used.add(edgeKey(current, next));
        previous = current;
        current = next === startKey ? null : next;
      }
      if (path.length >= 3) paths.push(path);
    }
  }
  return paths.sort((first, second) => second.length - first.length)[0] || [];
}

function simplify(points, maxPoints = 180) {
  if (points.length <= maxPoints) return points;
  const step = points.length / maxPoints;
  return Array.from({ length: maxPoints }, (_, index) => points[Math.floor(index * step)]);
}

function keepLargestMaskComponent(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  let largest = [];
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || visited[start]) continue;
    const component = [];
    const stack = [start];
    visited[start] = 1;
    while (stack.length) {
      const current = stack.pop();
      component.push(current);
      const x = current % width;
      const y = Math.floor(current / width);
      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          if (!offsetX && !offsetY) continue;
          const neighborX = x + offsetX;
          const neighborY = y + offsetY;
          if (neighborX < 0 || neighborY < 0 || neighborX >= width || neighborY >= height) continue;
          const neighbor = neighborY * width + neighborX;
          if (mask[neighbor] && !visited[neighbor]) {
            visited[neighbor] = 1;
            stack.push(neighbor);
          }
        }
      }
    }
    if (component.length > largest.length) largest = component;
  }
  const cleaned = new Uint8Array(mask.length);
  largest.forEach((index) => { cleaned[index] = 1; });
  return cleaned;
}

function decodePolygon(proto, coefficients, box, meta, maskThreshold = 0.58) {
  const protoPlane = MASK_SIZE * MASK_SIZE;
  const stride = MODEL_INPUT_SIZE / MASK_SIZE;
  const x1 = clamp(Math.floor(box[0] / stride) - MASK_CONTEXT_CELLS, 0, MASK_SIZE - 1);
  const y1 = clamp(Math.floor(box[1] / stride) - MASK_CONTEXT_CELLS, 0, MASK_SIZE - 1);
  const x2 = clamp(Math.ceil(box[2] / stride) + 1 + MASK_CONTEXT_CELLS, x1 + 1, MASK_SIZE);
  const y2 = clamp(Math.ceil(box[3] / stride) + 1 + MASK_CONTEXT_CELLS, y1 + 1, MASK_SIZE);
  const width = x2 - x1;
  const height = y2 - y1;
  const mask = new Uint8Array(width * height);
  const probabilities = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = 0;
      const maskIndex = y * width + x;
      const protoIndex = (y1 + y) * MASK_SIZE + x1 + x;
      for (let channel = 0; channel < MASK_CHANNELS; channel++) value += coefficients[channel] * proto[channel * protoPlane + protoIndex];
      const probability = sigmoid(value);
      probabilities[maskIndex] = probability;
      mask[maskIndex] = probability >= maskThreshold ? 1 : 0;
    }
  }
  const cleanedMask = keepLargestMaskComponent(mask, width, height);
  // La máscara puede tocar el borde del crop y marching squares solo recorre
  // celdas interiores: el contorno quedaría abierto y closePath() lo cerraría
  // con una recta (el corte diagonal). Rodear con una celda vacía garantiza
  // un bucle cerrado siguiendo el borde.
  const paddedWidth = width + 2;
  const paddedHeight = height + 2;
  const paddedProbabilities = new Float32Array(paddedWidth * paddedHeight).fill(maskThreshold - 1);
  const paddedMask = new Uint8Array(paddedWidth * paddedHeight);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      paddedProbabilities[(y + 1) * paddedWidth + x + 1] = probabilities[y * width + x];
      paddedMask[(y + 1) * paddedWidth + x + 1] = cleanedMask[y * width + x];
    }
  }
  const contour = simplify(largestContour(marchingSquares(paddedProbabilities, paddedWidth, paddedHeight, x1 - 1, y1 - 1, maskThreshold, paddedMask)));
  return contour.map(([x, y]) => modelPointToImage(x * stride, y * stride, meta));
}

function decodeDetections(outputs, meta, threshold, classes, maskThreshold = 0.58) {
  const rows = outputs.output0?.data || outputs[0]?.data;
  const proto = outputs.output1?.data || outputs[1]?.data;
  if (!rows || !proto) throw new Error("El modelo ONNX no devolvió las salidas esperadas.");
  const allowed = selectedClassSet(classes);
  const detections = [];
  for (let row = 0; row < rows.length / OUTPUT_ROW_SIZE; row++) {
    const offset = row * OUTPUT_ROW_SIZE;
    const score = Number(rows[offset + 4]);
    if (!Number.isFinite(score) || score < threshold) continue;
    const classId = Math.round(rows[offset + 5]);
    const className = CLASS_NAMES[classId] || `class-${classId}`;
    if (allowed.size && !allowed.has(normalize(className))) continue;
    const rawBox = [rows[offset], rows[offset + 1], rows[offset + 2], rows[offset + 3]];
    const first = modelPointToImage(rawBox[0], rawBox[1], meta);
    const second = modelPointToImage(rawBox[2], rawBox[3], meta);
    const x = Math.min(first[0], second[0]);
    const y = Math.min(first[1], second[1]);
    const right = Math.max(first[0], second[0]);
    const bottom = Math.max(first[1], second[1]);
    const box = [x, y, Math.max(1, right - x), Math.max(1, bottom - y)];
    const coefficients = rows.slice(offset + 6, offset + OUTPUT_ROW_SIZE);
    const polygon = decodePolygon(proto, coefficients, rawBox, meta, maskThreshold);
    detections.push({ class: className, score, box, polygon });
  }
  return detections;
}

export function createWebDetector() {
  let sessionPromise;
  let runtime = "unavailable";
  const modelUrl = globalThis.CENSOR_STATION_CONFIG?.webModelUrl || import.meta.env.VITE_WEB_MODEL_URL || DEFAULT_MODEL_URL;

  async function loadSession() {
    if (sessionPromise) return sessionPromise;
    sessionPromise = (async () => {
      if (globalThis.navigator?.gpu) {
        try {
          const ort = await import("onnxruntime-web/webgpu");
          const session = await ort.InferenceSession.create(modelUrl, { executionProviders: ["webgpu"], graphOptimizationLevel: "all" });
          runtime = "webgpu";
          return { ort, session };
        } catch (error) {
          console.warn("WebGPU detector unavailable; falling back to WASM.", error);
        }
      }
      const ort = await import("onnxruntime-web/wasm");
      const session = await ort.InferenceSession.create(modelUrl, { executionProviders: ["wasm"], graphOptimizationLevel: "all" });
      runtime = "wasm";
      return { ort, session };
    })().catch((error) => {
      sessionPromise = null;
      throw error;
    });
    return sessionPromise;
  }

  return {
    get runtime() { return runtime; },
    get modelUrl() { return modelUrl; },
    isAvailable() { return Boolean(globalThis.navigator?.gpu || globalThis.WebAssembly); },
    isLoaded() { return Boolean(sessionPromise); },
    unload() {
      sessionPromise = null;
      runtime = "unavailable";
    },
    async detect(image, { threshold = 0.35, classes = [], maskThreshold = 0.58 } = {}) {
      const { ort, session } = await loadSession();
      const meta = preprocess(image);
      const input = new ort.Tensor("float32", meta.data, [1, 3, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE]);
      const outputs = await session.run({ [session.inputNames[0]]: input });
      return { runtime, detections: decodeDetections(outputs, meta, threshold, classes, clamp(maskThreshold, 0.45, 0.9)) };
    },
  };
}

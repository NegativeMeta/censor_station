const MODEL_INPUT_SIZE = 1280;
const MASK_SIZE = 320;
const MASK_CHANNELS = 32;
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
    clamp((x - meta.padX) / meta.scale, 0, meta.width),
    clamp((y - meta.padY) / meta.scale, 0, meta.height),
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
  return { data, width, height, scale: drawWidth / width, padX, padY };
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

function marchingSquares(mask, width, height, offsetX, offsetY) {
  const adjacency = new Map();
  const top = (x, y) => [offsetX + x + 0.5, offsetY + y];
  const right = (x, y) => [offsetX + x + 1, offsetY + y + 0.5];
  const bottom = (x, y) => [offsetX + x + 0.5, offsetY + y + 1];
  const left = (x, y) => [offsetX + x, offsetY + y + 0.5];
  const filled = (x, y) => x >= 0 && y >= 0 && x < width && y < height && mask[y * width + x];
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

function decodePolygon(proto, coefficients, box, meta) {
  const protoPlane = MASK_SIZE * MASK_SIZE;
  const stride = MODEL_INPUT_SIZE / MASK_SIZE;
  const x1 = clamp(Math.floor(box[0] / stride), 0, MASK_SIZE - 1);
  const y1 = clamp(Math.floor(box[1] / stride), 0, MASK_SIZE - 1);
  const x2 = clamp(Math.ceil(box[2] / stride) + 1, x1 + 1, MASK_SIZE);
  const y2 = clamp(Math.ceil(box[3] / stride) + 1, y1 + 1, MASK_SIZE);
  const width = x2 - x1;
  const height = y2 - y1;
  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = 0;
      const protoIndex = (y1 + y) * MASK_SIZE + x1 + x;
      for (let channel = 0; channel < MASK_CHANNELS; channel++) value += coefficients[channel] * proto[channel * protoPlane + protoIndex];
      mask[y * width + x] = sigmoid(value) > 0.5 ? 1 : 0;
    }
  }
  const contour = simplify(largestContour(marchingSquares(mask, width, height, x1, y1)));
  return contour.map(([x, y]) => modelPointToImage(x * stride, y * stride, meta));
}

function decodeDetections(outputs, meta, threshold, classes) {
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
    const polygon = decodePolygon(proto, coefficients, rawBox, meta);
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
    async detect(image, { threshold = 0.35, classes = [] } = {}) {
      const { ort, session } = await loadSession();
      const meta = preprocess(image);
      const input = new ort.Tensor("float32", meta.data, [1, 3, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE]);
      const outputs = await session.run({ [session.inputNames[0]]: input });
      return { runtime, detections: decodeDetections(outputs, meta, threshold, classes) };
    },
  };
}

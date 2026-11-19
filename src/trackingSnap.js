/** Polygon helpers and detection snapping shared by the UI and unit tests. */

export function polygonArea(polygon) {
  if (!polygon || polygon.length < 3) return 0;
  let doubled = 0;
  for (let index = 0; index < polygon.length; index += 1) {
    const [x1, y1] = polygon[index];
    const [x2, y2] = polygon[(index + 1) % polygon.length];
    doubled += x1 * y2 - x2 * y1;
  }
  return Math.abs(doubled) / 2;
}

export function polygonCenter(polygon) {
  if (!polygon?.length) return { x: 0, y: 0 };
  let doubled = 0, cx = 0, cy = 0;
  for (let index = 0; index < polygon.length; index += 1) {
    const [x1, y1] = polygon[index];
    const [x2, y2] = polygon[(index + 1) % polygon.length];
    const cross = x1 * y2 - x2 * y1;
    doubled += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  if (Math.abs(doubled) < 1e-6) {
    const sum = polygon.reduce((total, [x, y]) => [total[0] + x, total[1] + y], [0, 0]);
    return { x: sum[0] / polygon.length, y: sum[1] / polygon.length };
  }
  return { x: cx / (3 * doubled), y: cy / (3 * doubled) };
}

export function polygonBounds(polygon) {
  if (!polygon?.length) return null;
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const [x, y] of polygon) {
    if (x < x1) x1 = x;
    if (y < y1) y1 = y;
    if (x > x2) x2 = x;
    if (y > y2) y2 = y;
  }
  if (!Number.isFinite(x1)) return null;
  return { x: x1, y: y1, w: Math.max(1, x2 - x1), h: Math.max(1, y2 - y1) };
}

export function polygonBoxIoU(a, b) {
  if (!a || !b) return 0;
  const left = Math.max(a.x, b.x), top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.w, b.x + b.w), bottom = Math.min(a.y + a.h, b.y + b.h);
  const overlap = Math.max(0, right - left) * Math.max(0, bottom - top);
  const union = a.w * a.h + b.w * b.h - overlap;
  return union > 0 ? overlap / union : 0;
}

function rasterizePolygon(polygon, bounds, width, height) {
  const mask = new Uint8Array(width * height);
  const scaleX = width / bounds.w;
  const scaleY = height / bounds.h;
  const points = polygon.map(([x, y]) => [(x - bounds.x) * scaleX, (y - bounds.y) * scaleY]);
  for (let row = 0; row < height; row += 1) {
    const y = row + 0.5;
    const crossings = [];
    for (let index = 0; index < points.length; index += 1) {
      const [x1, y1] = points[index];
      const [x2, y2] = points[(index + 1) % points.length];
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) {
        crossings.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1));
      }
    }
    crossings.sort((a, b) => a - b);
    for (let index = 0; index + 1 < crossings.length; index += 2) {
      const from = Math.max(0, Math.ceil(crossings[index] - 0.5));
      const to = Math.min(width - 1, Math.floor(crossings[index + 1] - 0.5));
      for (let column = from; column <= to; column += 1) mask[row * width + column] = 1;
    }
  }
  return mask;
}

/** Shape IoU from a low-resolution rasterization, not bounding boxes. */
export function polygonIoU(a, b) {
  const boxA = polygonBounds(a);
  const boxB = polygonBounds(b);
  if (!boxA || !boxB) return 0;
  const left = Math.min(boxA.x, boxB.x);
  const top = Math.min(boxA.y, boxB.y);
  const right = Math.max(boxA.x + boxA.w, boxB.x + boxB.w);
  const bottom = Math.max(boxA.y + boxA.h, boxB.y + boxB.h);
  const bounds = { x: left, y: top, w: Math.max(1, right - left), h: Math.max(1, bottom - top) };
  const scale = Math.min(1, 128 / Math.max(bounds.w, bounds.h));
  const width = Math.max(8, Math.round(bounds.w * scale));
  const height = Math.max(8, Math.round(bounds.h * scale));
  const maskA = rasterizePolygon(a, bounds, width, height);
  const maskB = rasterizePolygon(b, bounds, width, height);
  let intersection = 0;
  let union = 0;
  for (let index = 0; index < maskA.length; index += 1) {
    if (maskA[index] && maskB[index]) intersection += 1;
    if (maskA[index] || maskB[index]) union += 1;
  }
  return union > 0 ? intersection / union : 0;
}

/**
 * Snap a propagated layer to the closest analyzed detection on the target frame.
 * Matching is by rasterized shape IoU; the class is only a tie-breaker when two
 * detections fit almost equally well. Returns null when nothing is confident
 * enough, so the caller keeps the tracker output untouched.
 */
export function snapLayerToDetections(layer, target, threshold = 0.3) {
  const polygon = layer?.polygon || [];
  if (polygon.length < 3) return null;
  const layerArea = polygonArea(polygon);
  if (layerArea <= 0) return null;
  const className = String(layer.class || "").toUpperCase();
  const candidates = (target?.detections || []).filter((box) => box !== layer && box.polygon?.length >= 3 && box.visible !== false && box.source !== "manual");
  if (!candidates.length) return null;
  const scored = candidates.map((detection) => ({
    detection,
    iou: polygonIoU(polygon, detection.polygon),
    sameClass: Boolean(className && className !== "MANUAL" && String(detection.class || "").toUpperCase() === className),
  })).sort((a, b) => b.iou - a.iou);
  let best = scored[0];
  if (best && !best.sameClass) {
    // Only break a near-tie: a same-class detection that fits noticeably worse
    // must never win over the shape that actually overlaps the layer.
    const rival = scored.find((entry) => entry.sameClass && best.iou - entry.iou <= 0.05);
    if (rival) best = rival;
  }
  if (!best || best.iou < threshold) return null;
  const detectionArea = polygonArea(best.detection.polygon);
  const ratio = detectionArea / layerArea;
  if (ratio < 0.45 || ratio > 2.2) return null;
  const from = polygonCenter(polygon);
  const to = polygonCenter(best.detection.polygon);
  const scale = Math.min(2, Math.max(0.5, Math.sqrt(ratio)));
  return {
    polygon: best.detection.polygon.map(([x, y]) => [x, y]),
    brushEdits: (layer.brushEdits || []).map((edit) => ({
      ...edit,
      x: to.x + (edit.x - from.x) * scale,
      y: to.y + (edit.y - from.y) * scale,
      radius: Math.max(1, Number(edit.radius || 1) * scale),
    })),
    score: best.iou,
  };
}
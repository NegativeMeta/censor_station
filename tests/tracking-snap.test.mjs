import test from "node:test";
import assert from "node:assert/strict";

import {
  polygonArea,
  polygonBounds,
  polygonBoxIoU,
  polygonCenter,
  polygonIoU,
  snapLayerToDetections,
} from "../src/trackingSnap.js";

const square = (x, y, size) => [[x, y], [x + size, y], [x + size, y + size], [x, y + size]];

test("polygonArea and polygonCenter are exact for a square", () => {
  assert.equal(polygonArea(square(0, 0, 100)), 10000);
  const center = polygonCenter(square(0, 0, 100));
  assert.ok(Math.abs(center.x - 50) < 1e-9);
  assert.ok(Math.abs(center.y - 50) < 1e-9);
});

test("polygonBoxIoU compares bounding boxes", () => {
  const a = polygonBounds(square(0, 0, 100));
  const b = polygonBounds(square(50, 0, 100));
  assert.ok(Math.abs(polygonBoxIoU(a, b) - 1 / 3) < 1e-9);
});

test("polygonIoU measures the shape, not the bounding box", () => {
  const triangle = [[0, 0], [100, 0], [0, 100]];
  assert.ok(polygonIoU(triangle, triangle) > 0.99);
  // A triangle and the square around it share a box but not most of the area.
  const boxIoU = polygonBoxIoU(polygonBounds(triangle), polygonBounds(square(0, 0, 100)));
  assert.equal(boxIoU, 1);
  assert.ok(polygonIoU(triangle, square(0, 0, 100)) < 0.55);
});

test("class only breaks a near-tie", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  const exactOther = { class: "penis", source: "auto", polygon: square(0, 0, 100) };
  const nearSame = { class: "anus", source: "auto", polygon: square(1, 0, 100) };
  const snapped = snapLayerToDetections(layer, { detections: [exactOther, nearSame] });
  assert.ok(snapped);
  assert.deepEqual(snapped.polygon, square(1, 0, 100));
});

test("a clearly better different-class detection wins over class", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  const exactOther = { class: "penis", source: "auto", polygon: square(0, 0, 100) };
  const farSame = { class: "anus", source: "auto", polygon: square(12, 0, 100) };
  const snapped = snapLayerToDetections(layer, { detections: [exactOther, farSame] });
  assert.ok(snapped);
  assert.deepEqual(snapped.polygon, square(0, 0, 100));
});

test("snap keeps the same class, moves the polygon and the brush edits", () => {
  const layer = {
    class: "anus",
    polygon: square(0, 0, 100),
    brushEdits: [{ x: 10, y: 10, radius: 5, mode: "add" }],
  };
  const target = {
    detections: [
      { class: "anus", source: "auto", polygon: square(20, 30, 100) },
      { class: "penis", source: "auto", polygon: square(20, 30, 100) },
    ],
  };
  const snapped = snapLayerToDetections(layer, target);
  assert.ok(snapped);
  assert.deepEqual(snapped.polygon, square(20, 30, 100));
  assert.ok(Math.abs(snapped.brushEdits[0].x - 30) < 1e-9);
  assert.ok(Math.abs(snapped.brushEdits[0].y - 40) < 1e-9);
  assert.equal(snapped.brushEdits[0].radius, 5);
});

test("snap rejects a detection when the overlap is weak", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  const target = { detections: [{ class: "penis", source: "auto", polygon: square(90, 90, 100) }] };
  assert.equal(snapLayerToDetections(layer, target), null);
});

test("snap accepts a different class when the geometry matches", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  const target = { detections: [{ class: "vagina", source: "auto", polygon: square(20, 20, 100) }] };
  const snapped = snapLayerToDetections(layer, target);
  assert.ok(snapped);
  assert.deepEqual(snapped.polygon, square(20, 20, 100));
});

test("snap prefers the same class only when the overlap is close", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  const target = {
    detections: [
      { class: "vagina", source: "auto", polygon: square(8, 0, 100) },
      { class: "anus", source: "auto", polygon: square(10, 0, 100) },
    ],
  };
  const snapped = snapLayerToDetections(layer, target);
  assert.ok(snapped);
  assert.deepEqual(snapped.polygon, square(10, 0, 100));
});

test("snap rejects detections whose area is far from the layer", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  const target = { detections: [{ class: "anus", source: "auto", polygon: square(10, 10, 40) }] };
  assert.equal(snapLayerToDetections(layer, target), null);
});

test("manual layers need a strong overlap and never use manual detections", () => {
  const layer = { class: "MANUAL", polygon: square(0, 0, 100), brushEdits: [] };
  const manual = { detections: [{ class: "anus", source: "manual", polygon: square(0, 0, 100) }] };
  assert.equal(snapLayerToDetections(layer, manual), null);
  const auto = { detections: [{ class: "anus", source: "auto", polygon: square(10, 10, 100) }] };
  assert.ok(snapLayerToDetections(layer, auto));
});

test("snap returns null when the frame has no detections", () => {
  const layer = { class: "anus", polygon: square(0, 0, 100), brushEdits: [] };
  assert.equal(snapLayerToDetections(layer, { detections: [] }), null);
});
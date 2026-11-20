import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");

test("large images warm the layer thumbnail before the first click", () => {
  assert.match(appSource, /function scheduleLayerThumbnailWarmup/);
  assert.match(appSource, /requestIdleCallback\(run, \{ timeout: 500 \}\)/);
  assert.match(appSource, /pixels <= 500000/);
  assert.match(appSource, /box\.manualBlank\) && !box\.polygon\?\.length && !\(box\.brushEdits\?\.length\)/);
  assert.match(appSource, /Math\.min\(imageWidth, imageHeight, 192\)/);
});

test("the first pointer-down defers layer chrome until after the brush paints", () => {
  assert.match(appSource, /const created = item\.detections\.length === 0/);
  assert.match(appSource, /if \(created\) requestAnimationFrame\(\(\) => \{ renderLayers\(\); renderQueue\(\); syncControls\(\); \}\)/);
  assert.match(appSource, /function draw\(\) \{[\s\S]*?paintFrame\(item\);[\s\S]*?if \(!state\.brush\) \{/);
});

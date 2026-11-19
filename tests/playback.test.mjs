import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
const editorSource = readFileSync(new URL("../src/components/EditorPanel.jsx", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../public/styles.css", import.meta.url), "utf8");

test("the editor exposes a play control for GIF frames", () => {
  assert.match(editorSource, /id="play-preview"/);
  assert.match(editorSource, /id="play-preview-label"/);
  assert.match(stylesSource, /\.play-preview/);
});

test("playback paints every frame with its own censorship layers", () => {
  assert.match(appSource, /function paintFrame\(item\)/);
  assert.match(appSource, /item\.detections\.forEach\(\(box\) => \{ if \(box\.visible !== false\) drawDetection\(box, item\); \}\);/);
  assert.match(appSource, /function togglePlayback\(\)/);
  assert.match(appSource, /state\.playback\.index = \(state\.playback\.index \+ 1\) % state\.playback\.frames\.length/);
});

test("playback uses each frame delay and can be stopped", () => {
  assert.match(appSource, /frame\.frameDelay/);
  assert.match(appSource, /function stopPlayback\(\{ restore = true \} = \{\}\)/);
  assert.match(appSource, /showFile\(savedIndex\)/);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const gifSource = readFileSync(new URL("../tools/python/gif.py", import.meta.url), "utf8");
const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");

test("desktop gif worker auto-uses gifski for uniform delays, pillow otherwise", () => {
  assert.match(gifSource, /gifski_binary\(\) and delays_are_uniform\(delays\)/);
  assert.match(gifSource, /except Exception:\s*\n\s+_assemble_with_pillow/);
  assert.match(gifSource, /disposal=1/);
  assert.match(gifSource, /MAX_GIF_FRAMES = 300/);
});

test("gif extraction streams live progress", () => {
  assert.match(gifSource, /on_progress\(index \+ 1, total\)/);
  const workerSource = readFileSync(new URL("../tools/python/gif_worker.py", import.meta.url), "utf8");
  assert.match(workerSource, /"progress": True/);
  assert.match(appSource, /gif\/extract-stream/);
  assert.match(appSource, /onExtractProgress/);
});

test("all gif frames queue as pending images with timing metadata", () => {
  assert.match(appSource, /function makeGifFrameFile/);
  assert.match(appSource, /GIF \$\{file\.frameIndex \+ 1\}/);
  assert.match(appSource, /function assembleGif/);
  assert.match(appSource, /function expandGifIntake/);
  assert.match(appSource, /notice\.gifReady/);
});

test("save-single on a gif frame reassembles the whole gif", () => {
  assert.match(appSource, /\$\("save-single"\)\.addEventListener\("click"/);
  assert.match(appSource, /await withSaveLoading\(label, 1/);
  assert.match(appSource, /await assembleGif\(record\)/);
  assert.match(appSource, /toolbar\.saveGif/);
});

test("every save path shows the save loading dialog", () => {
  assert.match(appSource, /function withSaveLoading/);
  assert.match(appSource, /save\.saving/);
  assert.match(appSource, /save\.imagesSaved/);
});

test("approve-all marks pending and saves immediately", () => {
  assert.match(appSource, /\$\("approve-all"\)\.addEventListener\("click"/);
  assert.match(appSource, /file\.status = "approved";\s*\n\s*renderQueue\(\);\s*\n\s*updateProgress\(\);\s*\n\s*updateSingleModeUi\(\);\s*\n\s*await saveApprovedItems\(\);/);
  const toolbarSource = readFileSync(new URL("../src/components/Toolbar.jsx", import.meta.url), "utf8");
  assert.match(toolbarSource, /id="approve-all"/);
  assert.match(appSource, /actions\.approveAll/);
});

test("analyze buttons split single image vs whole queue", () => {
  assert.match(appSource, /function detectCurrent/);
  assert.match(appSource, /\$\("detect-single"\)\.addEventListener\("click", \(\) => detectCurrent\(\)\)/);
  const toolbarSource = readFileSync(new URL("../src/components/Toolbar.jsx", import.meta.url), "utf8");
  assert.match(toolbarSource, /id="detect-single"/);
});

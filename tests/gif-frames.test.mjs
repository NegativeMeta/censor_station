import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { readJsonBody } from "../tools/server/image-api.mjs";

const gifSource = readFileSync(new URL("../tools/python/gif.py", import.meta.url), "utf8");
const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");

test("desktop gif worker auto-uses gifski for uniform delays, pillow otherwise", () => {
  assert.match(gifSource, /gifski_binary\(\) and delays_are_uniform\(delays\)/);
  assert.match(gifSource, /except Exception:\s*\n\s+_assemble_with_pillow/);
  assert.match(gifSource, /disposal=1/);
  assert.match(gifSource, /MAX_GIF_FRAMES = 300/);
  assert.match(gifSource, /fps = max\(1, min\(100, round\(1000 \* len\(delays\) \/ sum\(delays\)\)\)\)/);
});

test("GIF assembly permits large frame JSON while other endpoints keep their default limit", async () => {
  const body = Buffer.from(JSON.stringify({ frames: ["frame"], data: "x" }));
  const request = () => ({ async *[Symbol.asyncIterator]() { yield body; } });
  assert.deepEqual(await readJsonBody(request(), body.length), { frames: ["frame"], data: "x" });
  await assert.rejects(readJsonBody(request(), body.length - 1), /La solicitud supera el límite/);

  const serverSource = readFileSync(new URL("../server.mjs", import.meta.url), "utf8");
  assert.match(serverSource, /MAX_GIF_ASSEMBLY_REQUEST_BYTES = 256 \* 1024 \* 1024/);
  assert.match(serverSource, /async function gifAssemble[\s\S]*?readJsonBody\(request, MAX_GIF_ASSEMBLY_REQUEST_BYTES\)/);
});

test("gif extraction streams live progress", () => {
  assert.match(gifSource, /on_progress\(index \+ 1, total\)/);
  const workerSource = readFileSync(new URL("../tools/python/gif_worker.py", import.meta.url), "utf8");
  assert.match(workerSource, /"progress": True/);
  assert.match(appSource, /gif\/extract-stream/);
  assert.match(appSource, /onExtractProgress/);
});

test("analysis cancellation waits for the current image and the default threshold is 85 percent", () => {
  assert.match(appSource, /function requestAnalysisCancel\(\)/);
  assert.match(appSource, /cancelRequested && done < total/);
  assert.match(appSource, /analysis\.cancelled/);
  assert.match(appSource, /button\.id = "cancel-analysis"/);
  const editorSource = readFileSync(new URL("../src/components/EditorPanel.jsx", import.meta.url), "utf8");
  assert.match(editorSource, /id="cancel-analysis"/);
  const settingsSource = readFileSync(new URL("../src/components/SettingsPanel.jsx", import.meta.url), "utf8");
  assert.match(settingsSource, /id="threshold-value">85%/);
  assert.match(settingsSource, /id="threshold"[^>]*value="85"/);
  const serverSource = readFileSync(new URL("../server.mjs", import.meta.url), "utf8");
  assert.match(serverSource, /clamp\(payload\.threshold, 0\.01, 0\.99, 0\.85\)/);
  const detectorSource = readFileSync(new URL("../src/webDetector.js", import.meta.url), "utf8");
  assert.match(detectorSource, /threshold = 0\.85/);
});

test("all gif frames queue as pending images with timing metadata", () => {
  assert.match(appSource, /function makeGifFrameFile/);
  assert.match(appSource, /file\.mediaType === "video" \? "MP4" : "GIF"/);
  assert.match(appSource, /function assembleGif/);
  assert.match(appSource, /function expandGifIntake/);
  assert.match(appSource, /notice\.gifReady/);
});

test("browser-decoded GIFs try the server encoder before gifenc", async () => {
  const start = appSource.indexOf("async function assembleGif(record) {");
  const end = appSource.indexOf("\nfunction frameDataUrlToRgba", start);
  assert.ok(start >= 0 && end > start, "assembleGif should be present");

  let requestedUrl = "";
  let browserEncoderUsed = false;
  const record = {
    id: "gif-1",
    source: "browser",
    loop: 0,
    frames: [{ index: 0, delay: 100, file: "frame-0000.png", dataUrl: "data:image/png;base64,AAAA" }],
  };
  const context = {
    state: { files: [] },
    async fetch(url) {
      requestedUrl = url;
      return {
        ok: true,
        async json() { return { ok: true, dataUrl: "data:image/gif;base64,AAAA", encoder: "gifski" }; },
      };
    },
    dataUrlToBlob: () => ({ type: "image/gif" }),
    async writeGifOutput(_record, _blob) {},
    async frameDataUrlToRgba() { return { rgba: new Uint8ClampedArray(4) }; },
    gifTools: () => ({ encodeGif() { browserEncoderUsed = true; return { type: "image/gif" }; } }),
    console: { warn() {} },
  };
  vm.runInNewContext(appSource.slice(start, end), context);
  await context.assembleGif(record);

  assert.equal(requestedUrl, "/api/gif/assemble");
  assert.equal(record.savedEncoder, "gifski");
  assert.equal(browserEncoderUsed, false);
});

test("Analyze images targets queue selection without a separate help or action box", () => {
  for (const snippet of [
    /function fetchDetections/,
    /function selectQueueItem/,
    /function queueAnalysisTargets/,
    /async function detectAll/,
    /state\.queueSelection/,
    /selected-for-analysis/,
    /aria-pressed="\$\{state\.queueSelection\.has\(index\)\}"/,
    /event\.ctrlKey \|\| event\.metaKey/,
    /function removeLegacyQueueSelectionUi/,
  ]) assert.match(appSource, snippet);
  assert.doesNotMatch(appSource, /queue\.selectionHelp/);
  assert.doesNotMatch(appSource, /recheckSelectedLayers|state\.recheck/);
  assert.doesNotMatch(appSource, /reanalyzeSelectedFiles|\$\("reanalyze-selected"\)\.addEventListener/);
  const queueSource = readFileSync(new URL("../src/components/QueuePanel.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(queueSource, /selectionHelp|Ctrl \+ clic/);
  assert.doesNotMatch(queueSource, /reanalyze-selected/);
  const settingsSource = readFileSync(new URL("../src/components/SettingsPanel.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(settingsSource, /recheck-selected|Ctrl \+ clic/);
  const cssSource = readFileSync(new URL("../public/styles.css", import.meta.url), "utf8");
  assert.match(cssSource, /\.queue-item\.selected-for-analysis/);
  assert.doesNotMatch(cssSource, /\.queue-selection-help/);
});

test("global settings stage preview first, propagate over time", () => {
  assert.match(appSource, /function stageGlobalApply/);
  assert.match(appSource, /function scheduleGlobalChunk/);
  assert.match(appSource, /requestIdleCallback/);
  assert.match(appSource, /global\.propagating/);
  assert.match(appSource, /global\.previewing/);
  assert.match(appSource, /function applyGlobalToAllLayers/);
  assert.match(appSource, /box\.polygon/);
  assert.match(appSource, /data-global-style-button/);
  assert.match(appSource, /global\.applied/);
  const settingsSource = readFileSync(new URL("../src/components/SettingsPanel.jsx", import.meta.url), "utf8");
  assert.match(settingsSource, /id="global-padding"/);
  assert.match(settingsSource, /id="global-advanced"/);
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

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");

function functionBlock(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `Missing ${start}`);
  return source.slice(from, to);
}

test("Ctrl/Cmd-click toggles queue images independently of layer selection", () => {
  const state = {
    files: [{ name: "one.png" }, { name: "two.png" }, { name: "three.png" }],
    queueSelection: new Set(),
    analysis: { active: false },
  };
  const opened = [];
  const context = {
    state,
    showFile: async (index) => { opened.push(index); },
  };
  vm.runInNewContext(functionBlock("function selectQueueItem(index, event = {}) {", "\nfunction queueAnalysisTargets"), context);

  context.selectQueueItem(0, {});
  context.selectQueueItem(1, { ctrlKey: true });
  assert.deepEqual([...state.queueSelection], [0, 1]);
  assert.deepEqual(opened, [0, 1]);

  context.selectQueueItem(2, { metaKey: true });
  context.selectQueueItem(1, { ctrlKey: true });
  assert.deepEqual([...state.queueSelection], [0, 2]);

  context.selectQueueItem(2, {});
  assert.deepEqual([...state.queueSelection], [2]);

  state.analysis.active = true;
  context.selectQueueItem(1, { ctrlKey: true });
  assert.deepEqual([...state.queueSelection], [2]);
});

test("Analyze images uses multiple selected images, but one or none means the whole queue", async () => {
  const files = ["one.png", "two.png", "three.png", "four.png"].map((name) => ({ name, detections: [], analyzed: true, kind: "image" }));
  const state = { files, queueSelection: new Set([0, 2]), current: 2, selected: 0, analysis: { active: false }, gifs: new Map(), singleMode: false };
  const processed = [];
  const notices = [];
  const progress = [];
  let currentImageRefreshes = 0;
  const failures = new Set(["one.png"]);
  const context = {
    state,
    startAnalysisProgress(total) { state.analysis.active = true; progress.push(["start", total]); },
    startAnalysisStep(current, completed) { progress.push(["step", current, completed]); },
    updateAnalysisProgress(current, completed) { progress.push(["update", current, completed]); },
    finishAnalysisProgress() { state.analysis.active = false; progress.push(["finish"]); },
    updateSingleModeUi() {},
    setNotice: (message) => notices.push(message),
    t: (key, values = {}) => `${key}:${values.count ?? `${values.updated ?? 0}:${values.failed ?? 0}`}`,
    async detectFile(item, options) {
      assert.equal(options.throwOnError, true);
      processed.push(item.name);
      if (failures.has(item.name)) throw new Error("test failure");
      item.detections = [{ source: "auto", score: 0.9 }];
      item.analyzed = true;
    },
    renderLayers() { currentImageRefreshes += 1; },
    syncControls() {},
    draw() {},
    renderQueue() {},
    console: { warn() {} },
  };
  vm.runInNewContext([
    functionBlock("function queueAnalysisTargets() {", "\nfunction removeLegacyQueueSelectionUi"),
    functionBlock("async function detectAll() {", "\n/** Raw detector call"),
  ].join("\n"), context);

  await context.detectAll();

  assert.deepEqual(processed, ["one.png", "three.png"]);
  assert.equal(files[2].detections[0].score, 0.9);
  assert.equal(currentImageRefreshes, 1);
  assert.deepEqual([...state.queueSelection], [0, 2]);
  assert.ok(notices.includes("queue.analysisPartial:1:1"));
  assert.deepEqual(progress.at(-1), ["finish"]);
  assert.equal(state.analysis.active, false);

  const singleSelectionState = { files, queueSelection: new Set([1]), current: 1, selected: 0, analysis: { active: false }, gifs: new Map(), singleMode: false };
  const allProcessed = [];
  const allContext = {
    ...context,
    state: singleSelectionState,
    async detectFile(item) { allProcessed.push(item.name); item.detections = []; item.analyzed = true; },
    t: (key) => key,
  };
  vm.runInNewContext([
    functionBlock("function queueAnalysisTargets() {", "\nfunction removeLegacyQueueSelectionUi"),
    functionBlock("async function detectAll() {", "\n/** Raw detector call"),
  ].join("\n"), allContext);
  await allContext.detectAll();
  assert.deepEqual(allProcessed, ["one.png", "two.png", "three.png", "four.png"]);
});

test("cancelling a batch keeps completed updates and untouched images", async () => {
  const files = ["one.png", "two.png", "three.png"].map((name, index) => ({
    name,
    detections: [{ id: `existing-${index}` }],
    analyzed: true,
    kind: "image",
  }));
  const untouchedDetections = files.slice(1).map((file) => file.detections);
  const state = {
    files,
    queueSelection: new Set([0, 1, 2]),
    current: 0,
    selected: 0,
    analysis: { active: false },
    gifs: new Map(),
    singleMode: false,
  };
  const processed = [];
  const notices = [];
  const context = {
    state,
    startAnalysisProgress(total) { state.analysis = { active: true, cancelRequested: false, total }; },
    startAnalysisStep() {},
    updateAnalysisProgress() {},
    finishAnalysisProgress() { state.analysis.active = false; },
    updateSingleModeUi() {},
    renderAnalysisProgress() {},
    setNotice: (message) => notices.push(message),
    t: (key, values = {}) => `${key}:${values.completed ?? values.count ?? ""}`,
    async detectFile(item, options) {
      assert.equal(options.throwOnError, true);
      processed.push(item.name);
      item.detections = [{ id: `updated-${item.name}` }];
      item.analyzed = true;
      if (item.name === "one.png") context.requestAnalysisCancel();
    },
    renderLayers() {},
    syncControls() {},
    draw() {},
    renderQueue() {},
    console: { warn() {} },
  };
  vm.runInNewContext([
    functionBlock("function requestAnalysisCancel() {", "\nfunction startAnalysisProgress"),
    functionBlock("function queueAnalysisTargets() {", "\nfunction removeLegacyQueueSelectionUi"),
    functionBlock("async function detectAll() {", "\n/** Raw detector call"),
  ].join("\n"), context);

  await context.detectAll();

  assert.deepEqual(processed, ["one.png"]);
  assert.deepEqual(files[0].detections, [{ id: "updated-one.png" }]);
  assert.equal(files[1].detections, untouchedDetections[0]);
  assert.equal(files[2].detections, untouchedDetections[1]);
  assert.ok(notices.includes("analysis.cancelPending:"));
  assert.ok(notices.includes("analysis.cancelled:1"));
  assert.equal(state.analysis.active, false);
});

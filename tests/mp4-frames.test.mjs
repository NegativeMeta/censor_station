import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");

function functionBlock(start, end) {
  const from = appSource.indexOf(start);
  const to = appSource.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `Missing ${start}`);
  return appSource.slice(from, to);
}

test("MP4 extraction schedules 24 fps samples and respects the 300-frame cap", () => {
  const context = {
    VIDEO_FRAME_RATE: 24,
    GIF_FRAME_CAP: 300,
    t: (key, values) => `${key}:${values.count}:${values.limit}`,
  };
  vm.runInNewContext(functionBlock("function videoFrameSchedule(", "\n/** Every GIF frame"), context);

  const frames = context.videoFrameSchedule(5);
  assert.equal(frames.length, 120);
  assert.equal(frames[0].timestamp, 0);
  assert.equal(frames[119].timestamp, 119 / 24);
  assert.ok(frames.every((frame) => frame.delay === 42));
  assert.throws(() => context.videoFrameSchedule(12.51), /video\.frameLimit:301:300/);
});

test("MP4 files enter the existing animation queue and GIF export flow", () => {
  assert.match(appSource, /function isVideoFile/);
  assert.match(appSource, /async function decodeMp4Frames/);
  assert.match(appSource, /mediaType === "video"/);
  assert.match(appSource, /mediaType === "video"\s*\? await decodeMp4Frames/);
  assert.match(appSource, /function gifRecordFor/);
  assert.match(appSource, /async function assembleGif/);
  assert.match(appSource, /mp4: "video\/mp4"/);

  const toolbarSource = readFileSync(new URL("../src/components/Toolbar.jsx", import.meta.url), "utf8");
  assert.match(toolbarSource, /accept="image\/\*,video\/mp4,\.mp4"/);
  assert.match(toolbarSource, /toolbar\.chooseMedia/);
});

test("folder intake keeps MP4 out of the image optimizer unless video is explicitly enabled", async () => {
  const context = {
    isVideoFile: (file) => /\.mp4$/i.test(file?.name || ""),
    mimeFromName: (name) => /\.(png|gif|mp4)$/i.test(name) ? "supported" : "",
    updateFolderLoading: () => {},
  };
  vm.runInNewContext(functionBlock("async function readImageFolder(", "\n\nfunction renderOptimizerQueue()"), context);
  const entries = ["image.png", "animation.gif", "clip.mp4"].map((name) => ({
    kind: "file",
    name,
    async getFile() { return { name }; },
  }));
  const handle = { async *values() { yield* entries; } };

  const imageFiles = await context.readImageFolder(handle);
  const mediaFiles = await context.readImageFolder(handle, { includeVideo: true });
  assert.equal(imageFiles.map((file) => file.name).join(","), "animation.gif,image.png");
  assert.equal(mediaFiles.map((file) => file.name).join(","), "animation.gif,clip.mp4,image.png");
});

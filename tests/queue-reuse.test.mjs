import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");

test("queue rows are reused instead of rebuilt on every update", () => {
  assert.match(appSource, /const queueRows = new Map\(\)/);
  assert.match(appSource, /function createQueueRow\(file\)/);
  assert.match(appSource, /function updateQueueRow\(node, file, index\)/);
  assert.match(appSource, /if \(list\.children\[cursor\] !== node\)/);
  assert.doesNotMatch(appSource, /list\.innerHTML = state\.files\.map/);
});

test("queue thumbnails load lazily", () => {
  assert.match(appSource, /thumb\.loading = "lazy"/);
  assert.match(appSource, /thumb\.decoding = "async"/);
});

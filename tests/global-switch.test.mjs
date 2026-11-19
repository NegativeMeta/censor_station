import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
const settingsSource = readFileSync(new URL("../src/components/SettingsPanel.jsx", import.meta.url), "utf8");
const accordionSource = readFileSync(new URL("../public/accordion.css", import.meta.url), "utf8");

test("global is a scope switch with a live count and a header chip", () => {
  assert.match(settingsSource, /id="global-toggle"/);
  assert.match(settingsSource, /id="global-scope-count"/);
  assert.match(settingsSource, /id="global-mode-chip"/);
  assert.doesNotMatch(settingsSource, /global-apply-toggle/);
  assert.match(appSource, /function globalScopeCounts/);
  assert.match(appSource, /global\.chip/);
  assert.match(accordionSource, /\.global-switch\.is-on/);
  assert.match(accordionSource, /\.global-scope\.is-on/);
  assert.match(accordionSource, /#a34858/);
});

test("global changes copy the current layer style before propagating", () => {
  assert.match(appSource, /function copyGlobalStyleFrom/);
  assert.match(appSource, /copyGlobalStyleFrom\(current\?\.detections/);
  assert.match(appSource, /if \(state\.global\.enabled\) stageGlobalApply\(\)/);
  assert.match(appSource, /scheduleSettingsProcessing\(state\.global\.enabled\)/);
});

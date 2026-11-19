import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const appSource = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
const stylesSource = readFileSync(new URL("../public/styles.css", import.meta.url), "utf8");
const accordionSource = readFileSync(new URL("../public/accordion.css", import.meta.url), "utf8");
const settingsSource = readFileSync(new URL("../src/components/SettingsPanel.jsx", import.meta.url), "utf8");

test("tracking marks applied frames edited and stopped frames pending", () => {
  assert.match(appSource, /function markTrackingFailed\(target, batchId\)/);
  assert.match(appSource, /target\.status = "pending"/);
  assert.match(appSource, /target\.status = "edited"/);
  assert.match(appSource, /showFile\(failedIndex\)/);
  assert.match(appSource, /\$\("tracking-start"\)\.value = String\(Math\.min\(lastReached\.frameIndex \+ 1/);
});

test("failed tracking frames render a red pending status", () => {
  assert.match(appSource, /file\.trackingLost \? "tracking-failed"/);
  assert.match(appSource, /queue-status \$\{file\.trackingLost \? "failed"/);
  assert.match(stylesSource, /\.queue-status\.failed/);
  assert.match(stylesSource, /\.queue-status\.edited/);
});

test("GIF intake leaves the canvas on its first frame", () => {
  assert.match(appSource, /showFile\(state\.files\.length - items\.length\)/);
});

test("edited status is translated in every locale", () => {
  for (const label of ["Editado", "Edited", "編集済み", "已编辑"]) {
    assert.match(appSource, new RegExp(`"status\\.edited": "${label}"`));
  }
});

test("manual layers inherit the selected style and become edited", () => {
  assert.match(appSource, /mode: state\.defaultMode \|\| "pixelate"/);
  assert.match(appSource, /item\.status = "edited"/);
  assert.match(appSource, /function applyCensorMode\(mode\)/);
});

test("style cards are enabled before a layer exists", () => {
  for (const mode of ["pixelate", "blur", "lines", "glow-white"]) {
    assert.doesNotMatch(settingsSource, new RegExp(`data-style-button="${mode}" disabled`));
  }
  assert.match(appSource, /button\.disabled = false;/);
});

test("leading help text is not clipped by the accordion overflow", () => {
  assert.match(accordionSource, /\.settings-accordion \.accordion-panel-inner > \.help:first-child/);
});

const assert = require("node:assert/strict");
const { chromium } = require(process.env.CENSOR_PLAYWRIGHT || "playwright");

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    const page = await browser.newPage();
    const data = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aX1cAAAAASUVORK5CYII=";
    const writes = [];
    await page.addInitScript(() => { window.showDirectoryPicker = undefined; });
    await page.route("**/api/folder", async route => {
      const payload = route.request().postDataJSON();
      let result;
      if (payload.action === "pick") result = { id: "test-folder", name: "Test folder" };
      if (payload.action === "list") result = { files: ["image.png"] };
      if (payload.action === "read") result = { data };
      if (payload.action === "write") { writes.push(payload); result = { saved: true }; }
      await route.fulfill({ json: { ok: true, ...result } });
    });
    await page.route("**/api/optimize", route => route.fulfill({ json: { ok: true, dataUrl: "data:image/png;base64," + data, mime: "image/png", extension: ".png", width: 1, height: 1, size: 68, lossless: true } }));
    await page.goto("http://127.0.0.1:4173/");
    await page.click("#choose-input");
    await page.waitForFunction(() => document.querySelector("#current-name").textContent === "image.png" && !document.querySelector("#approve").disabled);
    await page.evaluate(async () => { await loadImage(currentFile()); await saveItem(currentFile()); });
    assert.equal(writes[0].name, "image_censored.png");
    assert.equal(writes[0].subfolder, "censored");
    await page.click("#choose-output");
    await page.waitForFunction(() => Boolean(state.outputHandle));
    await page.evaluate(() => saveItem(currentFile()));
    assert.equal(writes[1].subfolder, "");
    await page.click('[data-app-tab="optimizer"]');
    await page.click("#optimizer-choose-input");
    await page.waitForFunction(() => Boolean(state.optimizer.files[0]?.optimizedBlob));
    await page.evaluate(() => saveOptimizerFile(optimizerCurrentFile()));
    assert.equal(writes[2].name, "image_optimized.png");
    assert.equal(writes[2].subfolder, "optimized");
    console.log("PASS: browser fallback loads both tabs and saves default and explicit output folders.");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

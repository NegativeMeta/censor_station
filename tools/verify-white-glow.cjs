const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const { chromium } = require(process.env.CENSOR_PLAYWRIGHT || 'playwright');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8').replace(/<script[^>]*src="\/app.js"[^>]*><\/script>/, ''));
    const source = fs.readFileSync(path.join(__dirname, '../public/app.js'), 'utf8');
    // Load the actual rendering functions without starting the application.
    await page.addScriptTag({ content: source.slice(source.indexOf('function renderPolygon('), source.indexOf('function hitTest(')) + source.slice(source.indexOf('function createCensoredLayer('), source.indexOf('async function moveNext(')) });
    const results = await page.evaluate(() => {
      const image = { naturalWidth: 240, naturalHeight: 240 };
      const base = { x: 80, y: 80, w: 80, h: 80, mode: 'glow-white', strength: 65, brushEdits: [] };
      const sample = (layer, x, y) => Array.from(layer.getContext('2d').getImageData(x, y, 1, 1).data);
      return [base, { ...base, manualBlank: true, brushEdits: [{ mode: 'add', x: 120, y: 120, radius: 40 }] }].map(box => {
        const layer = createCensoredLayer(image, box, 240, 240);
        const saved = document.createElement('canvas');
        saved.width = saved.height = 240;
        renderSavedBox(saved.getContext('2d'), image, box);
        return { center: sample(layer, 120, 120), halo: sample(layer, 169, 120), far: sample(layer, 235, 120), saved: sample(saved, 169, 120) };
      });
    });
    for (const result of results) {
      assert.deepEqual(result.center, [255, 255, 255, 255]);
      assert(result.halo[3] > 10 && result.halo[3] < 255, 'Visible soft halo outside mask');
      assert(result.far[3] < result.halo[3], 'Halo fades outward');
      assert.deepEqual(result.saved, result.halo, 'Preview and export match');
    }
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

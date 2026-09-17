import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../public/app.js", import.meta.url), "utf8");
const functionSource = (name) => {
  const marker = `function ${name}(`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `${name} must remain a named function`);
  let depth = 0;
  let bodyStarted = false;
  for (let index = start; index < source.length; index++) {
    if (source[index] === "{") { depth += 1; bodyStarted = true; }
    if (source[index] === "}") {
      depth -= 1;
      if (bodyStarted && depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Could not extract ${name}`);
};

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext([
  functionSource("renderPolygon"),
  "globalThis.renderPolygon = renderPolygon;",
].join("\n"), sandbox);

const originalPolygon = [[10, 10], [70, 10], [70, 70], [42, 42], [10, 70]];
const box = {
  source: "auto",
  maskInset: 4,
  x: 0,
  y: 0,
  w: 80,
  h: 80,
  base: { x: 0, y: 0, w: 80, h: 80 },
  polygon: originalPolygon,
  basePolygon: originalPolygon,
};

assert.deepEqual(
  JSON.parse(JSON.stringify(sandbox.renderPolygon(box))),
  originalPolygon,
  "Automatic masks must retain the detector contour: no geometric inset pre-transform."
);
assert.equal(source.includes("quadraticCurveTo"), false, "Mask contours must not be rounded with Bézier curves.");

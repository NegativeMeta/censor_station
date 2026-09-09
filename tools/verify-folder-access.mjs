import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { folderAccess } from "./folder-access.mjs";

const root = await fs.mkdtemp(path.join(os.tmpdir(), "censor-folder-test-"));
try {
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aX1cAAAAASUVORK5CYII=", "base64");
  await fs.writeFile(path.join(root, "image.png"), png);
  await fs.writeFile(path.join(root, "ignore.txt"), "ignore");
  const { id } = await folderAccess({ action: "pick" }, async () => root);
  assert.deepEqual((await folderAccess({ action: "list", id })).files, ["image.png"]);
  assert.equal((await folderAccess({ action: "read", id, name: "image.png" })).data, png.toString("base64"));
  for (const subfolder of ["censored", "optimized", ""]) {
    const name = "image_" + (subfolder || "output") + ".png";
    await folderAccess({ action: "write", id, subfolder, name, dataUrl: "data:image/png;base64," + png.toString("base64") });
    assert.deepEqual(await fs.readFile(path.join(root, subfolder, name)), png);
  }
  assert.deepEqual(await fs.readFile(path.join(root, "image.png")), png);
  await assert.rejects(folderAccess({ action: "read", id, name: "../image.png" }));
  await assert.rejects(folderAccess({ action: "list", id: "unselected" }));
  await assert.rejects(folderAccess({ action: "write", id, subfolder: "../outside", name: "image.png" }));
  assert.deepEqual(await folderAccess({ action: "pick" }, async () => ""), { cancelled: true });
  console.log("PASS: read, filtered list, both default folders, explicit output, original preserved, cancellation and invalid access.");
} finally { await fs.rm(root, { recursive: true, force: true }); }

import { zipSync } from "fflate";

export async function createZip(files) {
  const entries = {};
  for (const file of files) entries[file.name] = new Uint8Array(await file.blob.arrayBuffer());
  return new Blob([zipSync(entries, { level: 6 })], { type: "application/zip" });
}

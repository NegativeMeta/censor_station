// Run the API server and the Vite dev server together for hot reload.
// UI: http://127.0.0.1:5173  ·  API/proxy target: http://127.0.0.1:4173
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const children = [];
let stopping = false;

function start(name, args) {
  const child = spawn(process.execPath, args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  child.name = name;
  child.on("exit", (code) => {
    if (stopping) return;
    console.error(`[dev:all] ${name} exited with code ${code}; stopping the other process.`);
    stopping = true;
    for (const other of children) if (other !== child && !other.killed) other.kill();
    process.exitCode = code ?? 1;
  });
  children.push(child);
}

start("api", ["server.mjs"]);
start("vite", ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "5173", "--strictPort"]);

function stop() {
  if (stopping) return;
  stopping = true;
  for (const child of children) if (!child.killed) child.kill();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

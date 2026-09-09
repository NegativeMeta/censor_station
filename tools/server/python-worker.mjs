import path from "node:path";
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";

function pythonPath(projectRoot) {
  const localPython = process.platform === "win32"
    ? path.join(projectRoot, ".venv", "Scripts", "python.exe")
    : path.join(projectRoot, ".venv", "bin", "python");
  const fallbackPython = process.platform === "win32" ? "py" : "python3";
  return process.env.PYTHON || (existsSync(localPython) ? localPython : fallbackPython);
}

/** Create a persistent, ordered JSONL worker backed by a Python module. */
export function createPythonWorker({ projectRoot, moduleName, label }) {
  const state = { child: null, buffer: "", pending: [] };

  function rejectPending(error) {
    const pending = state.pending.splice(0);
    for (const request of pending) request.reject(error);
  }

  function ensure() {
    if (state.child && !state.child.killed) return state.child;

    const python = pythonPath(projectRoot);
    const args = process.platform === "win32" && python === "py"
      ? ["-3", "-m", moduleName]
      : ["-m", moduleName];
    const child = spawn(python, args, { windowsHide: true, cwd: projectRoot });
    state.child = child;
    state.buffer = "";

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      state.buffer += chunk;
      let newline;
      while ((newline = state.buffer.indexOf("\n")) >= 0) {
        const line = state.buffer.slice(0, newline).trim();
        state.buffer = state.buffer.slice(newline + 1);
        if (!line) continue;
        const request = state.pending.shift();
        if (!request) continue;
        try {
          const result = JSON.parse(line);
          if (!result.ok) request.reject(new Error(result.error || `${label} devolvió un error.`));
          else request.resolve(result);
        } catch {
          request.reject(new Error(`${label} devolvió una respuesta inválida.`));
        }
      }
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => console.error(`[${label}] ${chunk.trim()}`));
    child.on("error", (error) => {
      if (state.child === child) state.child = null;
      rejectPending(new Error(`No se pudo iniciar ${label}: ${error.message}`));
    });
    child.on("close", (code) => {
      if (state.child === child) state.child = null;
      if (state.pending.length) rejectPending(new Error(`${label} terminó con código ${code ?? "desconocido"}.`));
    });
    return child;
  }

  return {
    request(payload) {
      const child = ensure();
      return new Promise((resolve, reject) => {
        state.pending.push({ resolve, reject });
        try {
          child.stdin.write(`${JSON.stringify(payload)}\n`);
        } catch (error) {
          state.pending.pop();
          reject(error);
        }
      });
    },
    stop() {
      state.child?.kill();
      state.child = null;
      rejectPending(new Error(`${label} fue detenido.`));
    },
  };
}

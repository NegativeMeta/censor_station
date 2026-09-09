import path from "node:path";
import { promises as fs } from "node:fs";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".avif"]);
const grants = new Map();
let picking = false;
const pickerPath = fileURLToPath(new URL("./select-folder.ps1", import.meta.url));

async function chooseFolder() {
  if (process.platform !== "win32") throw new Error("El selector local requiere Windows.");
  if (picking) throw new Error("Ya hay un selector de carpetas abierto.");
  picking = true;
  try {
    return await new Promise((resolve, reject) => {
      const child = spawn("powershell.exe", ["-NoProfile", "-STA", "-ExecutionPolicy", "Bypass", "-File", pickerPath], { windowsHide: true });
      let output = "";
      child.stdout.setEncoding("utf8");
      child.stdout.on("data", chunk => { output += chunk; });
      child.stderr.resume();
      child.on("error", reject);
      child.on("close", code => code === 0 ? resolve(output.trim()) : reject(new Error("No se pudo abrir el selector de carpetas.")));
    });
  } finally { picking = false; }
}

function leaf(name) {
  if (typeof name !== "string" || !name || name === "." || name === ".." || /[<>:"/\\|?*\x00-\x1f]/.test(name) || /[. ]$/.test(name)) throw new Error("Nombre de archivo inválido.");
  return name;
}

export async function folderAccess(payload, picker = chooseFolder) {
  if (payload.action === "pick") {
    const selected = await picker();
    if (!selected) return { cancelled: true };
    const root = await fs.realpath(selected);
    const id = randomUUID();
    grants.set(id, root);
    return { id, name: path.basename(root) || root };
  }
  const root = grants.get(payload.id);
  if (!root) throw new Error("Selecciona de nuevo la carpeta; la sesión ha terminado.");
  if (payload.action === "list") {
    const entries = await fs.readdir(root, { withFileTypes: true });
    return { files: entries.filter(entry => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())).map(entry => entry.name) };
  }
  if (payload.action === "read") {
    const name = leaf(payload.name);
    if (!extensions.has(path.extname(name).toLowerCase())) throw new Error("Formato no permitido.");
    const target = path.join(root, name);
    if ((await fs.realpath(target)) !== target) throw new Error("No se permiten enlaces fuera de la carpeta.");
    return { data: (await fs.readFile(target)).toString("base64") };
  }
  if (payload.action === "write") {
    const name = leaf(payload.name);
    if (!extensions.has(path.extname(name).toLowerCase())) throw new Error("Formato no permitido.");
    let directory = root;
    if (payload.subfolder) {
      if (!["censored", "optimized"].includes(payload.subfolder)) throw new Error("Subcarpeta inválida.");
      directory = path.join(root, payload.subfolder);
      await fs.mkdir(directory, { recursive: true });
      if ((await fs.realpath(directory)) !== directory) throw new Error("La subcarpeta no puede ser un enlace.");
    }
    const target = path.join(directory, name);
    try {
      if ((await fs.lstat(target)).isSymbolicLink()) throw new Error("El destino no puede ser un enlace.");
    } catch (error) { if (error.code !== "ENOENT") throw error; }
    const match = /^data:image\/[\w.+-]+;base64,([A-Za-z0-9+/=]+)$/.exec(payload.dataUrl || "");
    if (!match) throw new Error("Imagen inválida.");
    // Replace atomically so existing originals/hard links are never truncated.
    const temporary = path.join(directory, "." + randomUUID() + ".tmp");
    try {
      await fs.writeFile(temporary, Buffer.from(match[1], "base64"), { flag: "wx" });
      await fs.rename(temporary, target);
    } finally { await fs.unlink(temporary).catch(() => {}); }
    return { saved: true };
  }
  throw new Error("Acción inválida.");
}

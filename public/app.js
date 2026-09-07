const CLASS_OPTIONS = [
  { value: "vagina", label: "Vagina", icon: "shield", visible: true, enabled: true },
  { value: "penis", label: "Pene", icon: "spark", visible: true, enabled: true },
  { value: "anus", label: "Ano", icon: "target", visible: true, enabled: true },
  { value: "nipple", label: "Pezones", visible: false, enabled: false },
  { value: "pubic hair", label: "Vello púbico", visible: false, enabled: false },
  { value: "female face", label: "Rostro femenino", visible: false, enabled: false },
  { value: "male face", label: "Rostro masculino", visible: false, enabled: false },
];

const state = {
  files: [],
  current: -1,
  inputHandle: null,
  outputHandle: null,
  selected: -1,
  drag: null,
  brush: null,
};

const $ = (id) => document.getElementById(id);
const canvas = $("preview");
const ctx = canvas.getContext("2d");

CLASS_OPTIONS.filter((option) => option.visible).forEach(({ value, label, icon, enabled }) => {
  const wrapper = document.createElement("div");
  wrapper.className = "class-toggle";
  wrapper.innerHTML = `<button type="button" class="class-toggle-button ${enabled ? "is-on" : ""}" data-class-toggle data-class="${value}" role="switch" aria-checked="${enabled}" aria-label="${label}"><span class="class-toggle-icon icon-${icon}" aria-hidden="true"></span><span class="class-toggle-copy"><strong>${label}</strong></span></button>`;
  $("class-options").appendChild(wrapper);
});

function setNotice(message, type = "") {
  const notice = $("notice");
  notice.textContent = message;
  notice.className = `notice ${type}`.trim();
}

function clearNotice() { $("notice").className = "notice hidden"; }

function selectedClasses() {
  return [...document.querySelectorAll("[data-class-toggle][aria-checked=\"true\"]")].map((button) => button.dataset.class);
}

document.querySelectorAll("[data-class-toggle]").forEach((button) => button.addEventListener("click", () => {
  const enabled = button.getAttribute("aria-checked") !== "true";
  button.setAttribute("aria-checked", String(enabled));
  button.classList.toggle("is-on", enabled);
}));

function fileStatus(file) {
  if (file.status === "approved") return "Aprobada";
  if (file.status === "rejected") return "Saltada";
  if (file.detections.length) return `${file.detections.length} capa${file.detections.length === 1 ? "" : "s"} detectada${file.detections.length === 1 ? "" : "s"}`;
  return file.analyzed ? "Sin capas" : "Pendiente";
}

function renderQueue() {
  const list = $("queue-list");
  $("queue-count").textContent = String(state.files.length);
  if (!state.files.length) {
    list.className = "queue-list empty-state";
    list.textContent = "Elige una carpeta para comenzar.";
    return;
  }
  list.className = "queue-list";
  list.innerHTML = state.files.map((file, index) => `
    <div class="queue-item ${index === state.current ? "active" : ""}" data-index="${index}">
      <img class="queue-thumb" src="${file.url}" alt="" />
      <div><div class="queue-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div><div class="queue-status ${file.status || (file.analyzed ? "detected" : "")}">${fileStatus(file)}</div></div>
    </div>`).join("");
  list.querySelectorAll(".queue-item").forEach((item) => item.addEventListener("click", () => showFile(Number(item.dataset.index))));
}

function escapeHtml(value) { return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }

function layerName(box, index) {
  return `Layer ${index + 1}`;
}

function renderLayers() {
  const list = $("layer-list");
  const item = currentFile();
  if (!item?.detections.length) {
    list.className = "layer-list empty-state";
    list.textContent = item?.analyzed ? "No hay capas detectadas." : "Analiza una imagen para crear capas.";
    return;
  }
  list.className = "layer-list";
  list.innerHTML = item.detections.map((box, index) => {
    const mode = ["pixelate", "blur", "black", "white"].includes(box.mode) ? box.mode : "pixelate";
    return `
    <div class="layer-row">
      <button class="layer-select ${index === state.selected ? "active" : ""}" data-layer-select="${index}"><span class="layer-mini-thumb mode-${mode}"></span><span class="layer-copy"><strong>${escapeHtml(layerName(box, index))}</strong><small>${box.source === "manual" ? "Manual" : "Máscara automática"}</small></span></button>
      <button class="layer-visibility ${box.visible === false ? "off" : ""}" data-layer-visibility="${index}" title="${box.visible === false ? "Mostrar capa" : "Ocultar capa"}">${box.visible === false ? "○" : "◉"}</button>
    </div>`;
  }).join("");
  list.querySelectorAll("[data-layer-select]").forEach((button) => button.addEventListener("click", () => {
    state.selected = Number(button.dataset.layerSelect);
    state.brush = null;
    renderLayers();
    syncControls();
    draw();
  }));
  list.querySelectorAll("[data-layer-visibility]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    const box = item.detections[Number(button.dataset.layerVisibility)];
    box.visible = box.visible === false;
    renderLayers();
    draw();
  }));
}

function makeFile(file) {
  return { file, name: file.name, url: URL.createObjectURL(file), image: null, detections: [], analyzed: false, status: "" };
}

async function loadImage(item) {
  if (item.image) return item.image;
  const image = new Image();
  image.src = item.url;
  await image.decode();
  item.image = image;
  return image;
}

function currentFile() { return state.files[state.current]; }

async function showFile(index) {
  if (index < 0 || index >= state.files.length) return;
  state.current = index;
  const item = currentFile();
  state.selected = item.detections.length ? 0 : -1;
  renderQueue();
  renderLayers();
  $("current-name").textContent = item.name;
  $("current-index").textContent = `${index + 1} / ${state.files.length}`;
  $("previous").disabled = index === 0;
  $("next").disabled = index === state.files.length - 1;
  $("reject").disabled = false;
  $("approve").disabled = false;
  $("canvas-wrap").classList.remove("empty-canvas");
  canvas.hidden = false;
  await loadImage(item);
  fitCanvas(item);
  draw();
  syncControls();
}

function fitCanvas(item) {
  const area = $("canvas-wrap");
  const ratio = Math.min((area.clientWidth - 24) / item.image.naturalWidth, (area.clientHeight - 24) / item.image.naturalHeight, 1);
  canvas.width = Math.max(1, Math.round(item.image.naturalWidth * ratio));
  canvas.height = Math.max(1, Math.round(item.image.naturalHeight * ratio));
  canvas.dataset.scale = String(ratio);
}

function draw() {
  const item = currentFile();
  if (!item?.image) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(item.image, 0, 0, canvas.width, canvas.height);
  item.detections.forEach((box, index) => { if (box.visible !== false) drawDetection(box, index === state.selected); });
  $("detection-summary").textContent = item.detections.length ? `${item.detections.length} capa${item.detections.length === 1 ? "" : "s"} · ${item.status || "pendiente de aprobación"}` : "Sin capas detectadas · puedes añadirlas manualmente";
}

function drawDetection(box, selected) {
  const scale = Number(canvas.dataset.scale || 1);
  const x = box.x * scale, y = box.y * scale, w = box.w * scale, h = box.h * scale;
  const polygon = renderPolygon(box).map(([pointX, pointY]) => [pointX * scale, pointY * scale]);
  const effect = createEffectLayer(currentFile().image, box, canvas.width, canvas.height);
  const mask = createMaskCanvas(box, effect.width, effect.height, scale);
  const effectCtx = effect.getContext("2d");
  effectCtx.globalCompositeOperation = "destination-in";
  effectCtx.drawImage(mask, 0, 0);
  ctx.globalAlpha = .93;
  ctx.drawImage(effect, 0, 0);
  ctx.globalAlpha = 1;
  ctx.save();
  ctx.strokeStyle = selected ? "#42d6bc" : box.source === "manual" ? "#42d6bc" : "#73a6ff";
  ctx.lineWidth = selected ? 2 : 1;
  ctx.setLineDash(selected ? [] : [5, 4]);
  if (polygon.length >= 3) strokePolygon(ctx, polygon);
  else ctx.strokeRect(x, y, w, h);
  if (selected) {
    ctx.setLineDash([]);
    ctx.fillStyle = "#42d6bc";
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(([cx, cy]) => ctx.fillRect(cx - 4, cy - 4, 8, 8));
  }
  ctx.restore();
}

function clipPolygon(target, polygon) {
  target.beginPath();
  polygon.forEach(([x, y], index) => index ? target.lineTo(x, y) : target.moveTo(x, y));
  target.closePath();
  target.clip();
}

function strokePolygon(target, polygon) {
  target.beginPath();
  polygon.forEach(([x, y], index) => index ? target.lineTo(x, y) : target.moveTo(x, y));
  target.closePath();
  target.stroke();
}

function renderPolygon(box) {
  if (!box.polygon?.length || !box.basePolygon?.length || !box.base) return box.polygon || [];
  const scaleX = box.w / Math.max(1, box.base.w);
  const scaleY = box.h / Math.max(1, box.base.h);
  return box.basePolygon.map(([x, y]) => [box.x + (x - box.base.x) * scaleX, box.y + (y - box.base.y) * scaleY]);
}

function createEffectLayer(image, box, width, height) {
  const effect = document.createElement("canvas");
  effect.width = width;
  effect.height = height;
  const effectCtx = effect.getContext("2d");
  if (box.mode === "black" || box.mode === "white") {
    effectCtx.fillStyle = box.mode === "black" ? "#050607" : "#f3f4f5";
    effectCtx.fillRect(0, 0, width, height);
    return effect;
  }

  const block = box.mode === "pixelate" ? Math.max(2, Math.round(22 - Number(box.strength || 65) / 7)) : 1;
  const source = document.createElement("canvas");
  source.width = Math.max(1, Math.round(width / block));
  source.height = Math.max(1, Math.round(height / block));
  source.getContext("2d").drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, source.width, source.height);
  if (box.mode === "blur") effectCtx.filter = `blur(${Math.max(2, Number(box.strength || 65) / 10)}px)`;
  effectCtx.imageSmoothingEnabled = box.mode !== "pixelate";
  effectCtx.drawImage(source, 0, 0, source.width, source.height, 0, 0, width, height);
  effectCtx.filter = "none";
  return effect;
}

function createMaskCanvas(box, width, height, scale, offsetX = 0, offsetY = 0) {
  const mask = document.createElement("canvas");
  mask.width = Math.max(1, Math.round(width));
  mask.height = Math.max(1, Math.round(height));
  const maskCtx = mask.getContext("2d");
  const local = (pointX, pointY) => [pointX * scale - offsetX, pointY * scale - offsetY];
  const polygon = renderPolygon(box).map(([pointX, pointY]) => local(pointX, pointY));
  maskCtx.fillStyle = "#fff";
  if (polygon.length >= 3) {
    maskCtx.beginPath();
    polygon.forEach(([pointX, pointY], index) => index ? maskCtx.lineTo(pointX, pointY) : maskCtx.moveTo(pointX, pointY));
    maskCtx.closePath();
    maskCtx.fill();
  } else {
    const [boxX, boxY] = local(box.x, box.y);
    maskCtx.fillRect(boxX, boxY, box.w * scale, box.h * scale);
  }

  for (const edit of box.brushEdits || []) {
    const [pointX, pointY] = local(edit.x, edit.y);
    maskCtx.globalCompositeOperation = edit.mode === "erase" ? "destination-out" : "source-over";
    maskCtx.fillStyle = edit.mode === "erase" ? "#000" : "#fff";
    maskCtx.beginPath();
    maskCtx.arc(pointX, pointY, Math.max(1, edit.radius * scale), 0, Math.PI * 2);
    maskCtx.fill();
  }
  maskCtx.globalCompositeOperation = "source-over";
  return mask;
}

function hitTest(event) {
  const rect = canvas.getBoundingClientRect();
  const scale = Number(canvas.dataset.scale || 1);
  const x = (event.clientX - rect.left) / scale;
  const y = (event.clientY - rect.top) / scale;
  for (let i = state.files[state.current]?.detections.length - 1; i >= 0; i--) {
    const box = currentFile().detections[i];
    if (box.visible === false) continue;
    if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) return { index: i, x, y };
  }
  return { index: -1, x, y };
}

canvas.addEventListener("contextmenu", (event) => event.preventDefault());

canvas.addEventListener("pointerdown", (event) => {
  const hit = hitTest(event);
  const hitBox = hit.index >= 0 ? currentFile().detections[hit.index] : null;
  const selectedBox = currentFile()?.detections[state.selected];
  if (event.button === 2 && selectedBox) {
    state.drag = null;
    state.brush = { mode: "erase", boxIndex: state.selected, last: null, pointerId: event.pointerId };
    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
    brushAt(hit.x, hit.y);
    syncControls();
    return;
  }
  if (event.button === 0 && selectedBox && hit.index === state.selected && isNearEdge(hit.x, hit.y, selectedBox)) {
    state.drag = { startX: hit.x, startY: hit.y, original: { ...selectedBox }, corner: nearestCorner(hit.x, hit.y, selectedBox) };
    canvas.setPointerCapture(event.pointerId);
    return;
  }
  if (event.button === 0 && selectedBox) {
    state.drag = null;
    state.brush = { mode: "add", boxIndex: state.selected, last: null, pointerId: event.pointerId };
    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
    brushAt(hit.x, hit.y);
    syncControls();
    return;
  }
  if (event.button !== 0) return;
  if (hit.index < 0) {
    state.selected = -1;
    syncControls(); draw();
    return;
  }
  state.selected = hit.index;
  const box = currentFile().detections[hit.index];
  state.drag = { startX: hit.x, startY: hit.y, original: { ...box }, corner: nearestCorner(hit.x, hit.y, box) };
  canvas.setPointerCapture(event.pointerId);
  renderLayers(); syncControls(); draw();
});

canvas.addEventListener("pointermove", (event) => {
  if (state.brush && event.pointerId === state.brush.pointerId) {
    const rect = canvas.getBoundingClientRect();
    const scale = Number(canvas.dataset.scale || 1);
    brushLine((event.clientX - rect.left) / scale, (event.clientY - rect.top) / scale);
    event.preventDefault();
    return;
  }
  if (!state.drag || state.selected < 0) return;
  const hit = hitTest(event);
  const box = currentFile().detections[state.selected];
  const origin = state.drag.original;
  const dx = hit.x - state.drag.startX, dy = hit.y - state.drag.startY;
  if (state.drag.corner) resizeBox(box, origin, state.drag.corner, dx, dy);
  else { box.x = clamp(origin.x + dx, 0, canvas.width / Number(canvas.dataset.scale)); box.y = clamp(origin.y + dy, 0, canvas.height / Number(canvas.dataset.scale)); }
  draw();
});

canvas.addEventListener("pointerup", () => { state.drag = null; state.brush = null; });
canvas.addEventListener("pointercancel", () => { state.drag = null; state.brush = null; });

function pointInsideBox(x, y, box) { return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h; }
function isNearEdge(x, y, box) { const edge = 14; return Math.abs(x - box.x) < edge || Math.abs(x - (box.x + box.w)) < edge || Math.abs(y - box.y) < edge || Math.abs(y - (box.y + box.h)) < edge; }
function brushRadius() { return Math.max(2, Number($("brush-size").value || 24)) / Number(canvas.dataset.scale || 1); }
function brushAt(x, y) { brushLine(x, y, true); }
function brushLine(x, y, first = false) {
  if (!state.brush) return;
  const item = currentFile();
  const box = item?.detections[state.brush.boxIndex];
  if (!box) return;
  if (!box.brushEdits) box.brushEdits = [];
  const maxX = item.image.naturalWidth, maxY = item.image.naturalHeight;
  const point = { x: clamp(x, 0, maxX), y: clamp(y, 0, maxY) };
  const radius = brushRadius();
  const previous = state.brush.last;
  const distance = previous && !first ? Math.hypot(point.x - previous.x, point.y - previous.y) : 0;
  const steps = Math.max(1, Math.ceil(distance / Math.max(1, radius * .35)));
  for (let index = 1; index <= steps; index++) {
    const amount = previous && !first ? index / steps : 1;
    box.brushEdits.push({ mode: state.brush.mode, x: previous && !first ? previous.x + (point.x - previous.x) * amount : point.x, y: previous && !first ? previous.y + (point.y - previous.y) * amount : point.y, radius });
  }
  state.brush.last = point;
  draw();
}

function nearestCorner(x, y, box) {
  const threshold = 18;
  const points = { nw: [box.x, box.y], ne: [box.x + box.w, box.y], sw: [box.x, box.y + box.h], se: [box.x + box.w, box.y + box.h] };
  return Object.entries(points).find(([, [cx, cy]]) => Math.abs(x - cx) < threshold && Math.abs(y - cy) < threshold)?.[0] || null;
}

function resizeBox(box, original, corner, dx, dy) {
  const min = 10;
  if (corner.includes("n")) { box.y = Math.max(0, original.y + dy); box.h = Math.max(min, original.h - dy); }
  if (corner.includes("s")) box.h = Math.max(min, original.h + dy);
  if (corner.includes("w")) { box.x = Math.max(0, original.x + dx); box.w = Math.max(min, original.w - dx); }
  if (corner.includes("e")) box.w = Math.max(min, original.w + dx);
}

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function syncControls() {
  const box = currentFile()?.detections[state.selected];
  const enabled = Boolean(box);
  $("add-box").disabled = !currentFile();
  $("style-select").disabled = !enabled;
  $("strength").disabled = !enabled;
  $("padding").disabled = !enabled;
  $("brush-size").disabled = !enabled;
  $("delete-box").disabled = !enabled;
  $("selected-badge").textContent = enabled ? `${state.selected + 1} seleccionada` : "Ninguna";
  document.querySelectorAll("[data-style-button]").forEach((button) => {
    button.disabled = !enabled;
    button.classList.toggle("active", enabled && button.dataset.styleButton === box.mode);
  });
  if (enabled) {
    $("style-select").value = box.mode;
    $("strength").value = box.strength;
    $("padding").value = box.padding;
  }
  $("strength-value").textContent = `${$("strength").value}%`;
  $("padding-value").textContent = `${$("padding").value} px`;
  $("brush-size-value").textContent = `${$("brush-size").value} px`;
}

$("style-select").addEventListener("change", (event) => updateSelected("mode", event.target.value));
document.querySelectorAll("[data-style-button]").forEach((button) => button.addEventListener("click", () => {
  if (!currentFile()?.detections[state.selected]) return;
  $("style-select").value = button.dataset.styleButton;
  updateSelected("mode", button.dataset.styleButton);
  renderLayers();
  syncControls();
}));
$("strength").addEventListener("input", (event) => { $("strength-value").textContent = `${event.target.value}%`; updateSelected("strength", Number(event.target.value)); });
$("padding").addEventListener("input", (event) => { $("padding-value").textContent = `${event.target.value} px`; updateSelected("padding", Number(event.target.value)); });
$("brush-size").addEventListener("input", (event) => { $("brush-size-value").textContent = `${event.target.value} px`; });
$("threshold").addEventListener("input", (event) => { $("threshold-value").textContent = `${event.target.value}%`; });
function updateSelected(key, value) { const box = currentFile()?.detections[state.selected]; if (!box) return; box[key] = value; applyPadding(box); draw(); }
function applyPadding(box) { const p = Number(box.padding || 0); if (!box.base) box.base = { x: box.x, y: box.y, w: box.w, h: box.h }; box.x = Math.max(0, box.base.x - p); box.y = Math.max(0, box.base.y - p); box.w = box.base.w + p * 2; box.h = box.base.h + p * 2; }

$("add-box").addEventListener("click", () => {
  const item = currentFile(); if (!item) return;
  const scale = Number(canvas.dataset.scale || 1);
  item.detections.push({ x: canvas.width / scale * .35, y: canvas.height / scale * .35, w: canvas.width / scale * .3, h: canvas.height / scale * .3, mode: "pixelate", strength: 65, padding: 0, source: "manual", class: "MANUAL", brushEdits: [], visible: true });
  state.selected = item.detections.length - 1; renderLayers(); draw(); syncControls();
});

$("delete-box").addEventListener("click", () => { const item = currentFile(); if (!item || state.selected < 0) return; item.detections.splice(state.selected, 1); state.selected = Math.min(state.selected, item.detections.length - 1); renderLayers(); draw(); syncControls(); renderQueue(); });

$("choose-input").addEventListener("click", async () => {
  try {
    if (!window.showDirectoryPicker) throw new Error("Tu navegador no permite elegir carpetas. Usa Chrome o Edge recientes.");
    state.inputHandle = await window.showDirectoryPicker({ mode: "read" });
    state.files = [];
    for await (const entry of state.inputHandle.values()) {
      if (entry.kind !== "file" || !/^image\/(jpeg|png|webp|gif|bmp|avif)$/i.test(entry.name.match(/\.[^.]+$/)?.[0] ? mimeFromName(entry.name) : "")) continue;
      state.files.push(makeFile(await entry.getFile()));
    }
    state.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    $("input-name").textContent = state.inputHandle.name;
    $("choose-output").disabled = false;
    $("detect-all").disabled = !state.files.length;
    $("save-all").disabled = !state.files.length;
    clearNotice(); renderQueue();
    if (state.files.length) await showFile(0); else setNotice("No encontré imágenes compatibles en esa carpeta.", "error");
  } catch (error) { if (error.name !== "AbortError") setNotice(error.message, "error"); }
});

function mimeFromName(name) { const ext = name.split(".").pop().toLowerCase(); return ({ jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", bmp: "image/bmp", avif: "image/avif" })[ext] || ""; }

$("choose-output").addEventListener("click", async () => { try { state.outputHandle = await window.showDirectoryPicker({ mode: "readwrite" }); $("output-name").textContent = `Salida: ${state.outputHandle.name}`; } catch (error) { if (error.name !== "AbortError") setNotice(error.message, "error"); } });
$("previous").addEventListener("click", () => showFile(state.current - 1));
$("next").addEventListener("click", () => showFile(state.current + 1));
$("reject").addEventListener("click", () => { if (!currentFile()) return; currentFile().status = "rejected"; renderQueue(); moveNext(); });
$("approve").addEventListener("click", async () => { if (!currentFile()) return; await saveItem(currentFile()); currentFile().status = "approved"; renderQueue(); updateProgress(); moveNext(); });
$("save-all").addEventListener("click", async () => { const approved = state.files.filter((file) => file.status === "approved"); if (!approved.length) { setNotice("Aprueba al menos una imagen antes de guardar aprobadas."); return; } for (const item of approved) await saveItem(item); setNotice(`${approved.length} imagen${approved.length === 1 ? "" : "es"} guardada${approved.length === 1 ? "" : "s"}.`); });
$("detect-all").addEventListener("click", () => detectAll());

async function detectAll() {
  if (!state.files.length) return;
  $("detect-all").disabled = true; setNotice("Analizando carpeta localmente…");
  for (let i = 0; i < state.files.length; i++) {
    await detectFile(state.files[i]);
    if (state.current === i && state.selected < 0 && state.files[i].detections.length) state.selected = 0;
    if (state.current === i) { renderLayers(); syncControls(); draw(); }
    renderQueue(); const progressLabel = $("progress-label"); const progressBar = $("progress-bar"); if (progressLabel) progressLabel.textContent = `Analizando ${i + 1} de ${state.files.length}`; if (progressBar) progressBar.style.width = `${((i + 1) / state.files.length) * 100}%`;
  }
  $("detect-all").disabled = false; setNotice("Análisis terminado. Revisa cada imagen, ajusta las zonas y aprueba solo las correctas.");
}

async function detectFile(item) {
  await loadImage(item);
  const blob = await new Promise((resolve) => canvasToBlob(item.image, resolve));
  const dataUrl = await blobToDataUrl(blob);
  try {
    const response = await fetch("/api/detect", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ dataUrl, mime: blob.type, threshold: Number($("threshold").value) / 100, classes: selectedClasses() }) });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || result.hint || "Detector no disponible.");
    item.detections = result.detections.map((detection) => ({
      x: detection.box[0], y: detection.box[1], w: detection.box[2], h: detection.box[3],
      base: { x: detection.box[0], y: detection.box[1], w: detection.box[2], h: detection.box[3] },
      polygon: detection.polygon || [], basePolygon: detection.polygon || [],
      mode: "pixelate", strength: 65, padding: Number($("padding").value), source: "auto", class: detection.class, score: detection.score, brushEdits: [], visible: true,
    }));
  } catch (error) {
    if (!item.analyzed) setNotice(`Detector automático no disponible: ${error.message} Puedes seguir dibujando zonas manuales.`, "error");
  }
  item.analyzed = true;
}

function canvasToBlob(image, callback) { const temporary = document.createElement("canvas"); temporary.width = image.naturalWidth; temporary.height = image.naturalHeight; temporary.getContext("2d").drawImage(image, 0, 0); temporary.toBlob(callback, "image/jpeg", .93); }
function blobToDataUrl(blob) { return new Promise((resolve) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(blob); }); }

async function saveItem(item) {
  await loadImage(item);
  const output = document.createElement("canvas"); output.width = item.image.naturalWidth; output.height = item.image.naturalHeight; const outputCtx = output.getContext("2d"); outputCtx.drawImage(item.image, 0, 0);
  for (const box of item.detections) if (box.visible !== false) renderSavedBox(outputCtx, item.image, box);
  const blob = await new Promise((resolve) => output.toBlob(resolve, mimeFromName(item.name) || "image/jpeg", .95));
  const name = `${item.name.replace(/(\.[^.]+)?$/, "")}_censurada${item.name.match(/\.[^.]+$/)?.[0] || ".jpg"}`;
  if (state.outputHandle) { const handle = await state.outputHandle.getFileHandle(name, { create: true }); const writable = await handle.createWritable(); await writable.write(blob); await writable.close(); }
  else { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 5000); }
}

function renderSavedBox(outputCtx, image, box) {
  const effect = createEffectLayer(image, box, image.naturalWidth, image.naturalHeight);
  const mask = createMaskCanvas(box, effect.width, effect.height, 1);
  const effectCtx = effect.getContext("2d");
  effectCtx.globalCompositeOperation = "destination-in";
  effectCtx.drawImage(mask, 0, 0);
  outputCtx.drawImage(effect, 0, 0);
}

async function moveNext() { updateProgress(); if (state.current < state.files.length - 1) await showFile(state.current + 1); }
function updateProgress() { const done = state.files.filter((file) => file.status === "approved").length; const progressDetail = $("progress-detail"); const progressBar = $("progress-bar"); const progressLabel = $("progress-label"); if (progressDetail) progressDetail.textContent = `${done} de ${state.files.length} aprobadas`; if (progressBar) progressBar.style.width = state.files.length ? `${done / state.files.length * 100}%` : "0%"; if (progressLabel) progressLabel.textContent = state.files.length ? `${done} aprobada${done === 1 ? "" : "s"}` : "Sin carpeta"; }

window.addEventListener("resize", () => { if (currentFile()?.image) { fitCanvas(currentFile()); draw(); } });
syncControls();

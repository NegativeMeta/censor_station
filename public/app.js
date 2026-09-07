const TRANSLATIONS = {
  es: {
    "brand.tag": "// LET'S CENSOR!", "topbar.tag": "MAGICAL FILTER // ONLINE", "language.label": "Idioma",
    "toolbar.chooseInput": "Elegir carpeta", "toolbar.chooseOutput": "Carpeta de salida", "toolbar.noFolder": "Ninguna carpeta seleccionada", "toolbar.outputHint": "Las aprobadas se descargarán si no eliges salida", "toolbar.outputName": "Salida: {name}", "toolbar.analyze": "Analizar carpeta", "toolbar.saveApproved": "Guardar aprobadas",
    "status.ready": "ESTADO: LISTO", "status.review": "MODO: REVISIÓN",
    "queue.eyebrow": "COLA", "queue.title": "Imágenes", "queue.empty": "Elige una carpeta para comenzar",
    "review.eyebrow": "REVISIÓN", "review.empty": "Selecciona una imagen", "review.previous": "Anterior", "review.next": "Siguiente",
    "canvas.noDetections": "Sin detecciones", "canvas.preview": "VISTA PREVIA EN VIVO // EDITOR DE MÁSCARAS", "canvas.auto": "Auto", "canvas.manual": "Manual",
    "layers.title": "LAYERS", "layers.none": "Ninguna", "layers.stack": "LAYER STACK", "layers.empty": "Analiza una imagen para crear capas", "layers.noDetections": "No hay capas detectadas", "layers.layer": "Capa", "layers.add": "Añadir capa", "layers.delete": "Eliminar", "layers.manual": "Manual", "layers.auto": "Máscara automática", "layers.show": "Mostrar capa", "layers.hide": "Ocultar capa", "layers.selected": "{index} seleccionada",
    "censor.title": "CENSOR", "censor.style": "Estilo de la selección", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.black": "BARRA", "censor.pixelateOption": "Píxeles", "censor.blurOption": "Desenfoque", "censor.blackOption": "Barra negra", "censor.whiteOption": "Barra blanca",
    "controls.strength": "Intensidad", "controls.padding": "Margen de seguridad", "controls.brushSize": "Tamaño del pincel", "controls.brushHelp": "Con el botón izquierdo pintas censura; con el derecho la borras dentro de la zona seleccionada.", "controls.threshold": "Umbral automático", "controls.thresholdHelp": "Baja el umbral para encontrar más zonas; súbelo para reducir falsos positivos.",
    "classes.title": "Clases a censurar", "classes.help": "Activa o desactiva las clases de detección antes de analizar la carpeta.", "class.vagina": "Vagina", "class.penis": "Pene", "class.anus": "Ano",
    "actions.reject": "Rechazar y saltar", "actions.rejectShort": "Rechazar", "actions.approve": "APPROVE",
    "notice.noImages": "No encontré imágenes compatibles en esa carpeta.", "notice.folderUnsupported": "Tu navegador no permite elegir carpetas. Usa Chrome o Edge recientes.", "notice.saveAtLeast": "Aprueba al menos una imagen antes de guardar aprobadas.", "notice.savedOne": "1 imagen guardada.", "notice.savedMany": "{count} imágenes guardadas.", "notice.analyzing": "Analizando carpeta localmente…", "notice.analysisDone": "Análisis terminado. Revisa cada imagen, ajusta las zonas y aprueba solo las correctas.", "notice.detectorUnavailable": "Detector automático no disponible: {message} Puedes seguir dibujando zonas manuales.",
    "status.approved": "Aprobada", "status.rejected": "Saltada", "status.pending": "Pendiente", "status.noLayers": "Sin capas", "status.detectedOne": "1 capa detectada", "status.detectedMany": "{count} capas detectadas", "canvas.summaryOne": "1 capa · {status}", "canvas.summaryMany": "{count} capas · {status}", "canvas.manualHint": "Sin capas detectadas · puedes añadirlas manualmente", "progress.none": "Sin carpeta", "progress.one": "1 aprobada", "progress.many": "{count} aprobadas", "progress.detail": "{count} de {total} aprobadas", "progress.analyzing": "Analizando {current} de {total}", "footer.local": "Censor Station 0.1 · procesamiento local", "footer.instructions": "Izquierdo pinta · derecho borra · arrastra el borde para mover · esquinas para ajustar"
  },
  en: {
    "brand.tag": "// LET'S CENSOR!", "topbar.tag": "MAGICAL FILTER // ONLINE", "language.label": "Language",
    "toolbar.chooseInput": "Choose folder", "toolbar.chooseOutput": "Output folder", "toolbar.noFolder": "No folder selected", "toolbar.outputHint": "Approved images download if no output folder is chosen", "toolbar.outputName": "Output: {name}", "toolbar.analyze": "Analyze folder", "toolbar.saveApproved": "Save approved",
    "status.ready": "STATUS: READY", "status.review": "MODE: REVIEW",
    "queue.eyebrow": "QUEUE", "queue.title": "Images", "queue.empty": "Choose a folder to begin",
    "review.eyebrow": "REVIEW", "review.empty": "Select an image", "review.previous": "Previous", "review.next": "Next",
    "canvas.noDetections": "No detections", "canvas.preview": "LIVE PREVIEW // MASK EDITOR", "canvas.auto": "Auto", "canvas.manual": "Manual",
    "layers.title": "LAYERS", "layers.none": "None", "layers.stack": "LAYER STACK", "layers.empty": "Analyze an image to create layers", "layers.noDetections": "No layers detected", "layers.layer": "Layer", "layers.add": "Add layer", "layers.delete": "Delete", "layers.manual": "Manual", "layers.auto": "Automatic mask", "layers.show": "Show layer", "layers.hide": "Hide layer", "layers.selected": "{index} selected",
    "censor.title": "CENSOR", "censor.style": "Selection style", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.black": "BAR", "censor.pixelateOption": "Pixels", "censor.blurOption": "Blur", "censor.blackOption": "Black bar", "censor.whiteOption": "White bar",
    "controls.strength": "Strength", "controls.padding": "Safety margin", "controls.brushSize": "Brush size", "controls.brushHelp": "Left click paints censorship; right click erases it inside the selected area.", "controls.threshold": "Automatic threshold", "controls.thresholdHelp": "Lower the threshold to find more areas; raise it to reduce false positives.",
    "classes.title": "Classes to censor", "classes.help": "Enable or disable detection classes before analyzing the folder.", "class.vagina": "Vagina", "class.penis": "Penis", "class.anus": "Anus",
    "actions.reject": "Reject and skip", "actions.rejectShort": "Reject", "actions.approve": "APPROVE",
    "notice.noImages": "No compatible images were found in that folder.", "notice.folderUnsupported": "Your browser cannot choose folders. Use a recent version of Chrome or Edge.", "notice.saveAtLeast": "Approve at least one image before saving approved files.", "notice.savedOne": "1 image saved.", "notice.savedMany": "{count} images saved.", "notice.analyzing": "Analyzing folder locally…", "notice.analysisDone": "Analysis complete. Review each image, adjust the areas and approve only the correct ones.", "notice.detectorUnavailable": "Automatic detector unavailable: {message} You can continue drawing manual areas.",
    "status.approved": "Approved", "status.rejected": "Skipped", "status.pending": "Pending", "status.noLayers": "No layers", "status.detectedOne": "1 layer detected", "status.detectedMany": "{count} layers detected", "canvas.summaryOne": "1 layer · {status}", "canvas.summaryMany": "{count} layers · {status}", "canvas.manualHint": "No layers detected · you can add them manually", "progress.none": "No folder", "progress.one": "1 approved", "progress.many": "{count} approved", "progress.detail": "{count} of {total} approved", "progress.analyzing": "Analyzing {current} of {total}", "footer.local": "Censor Station 0.1 · local processing", "footer.instructions": "Left click paints · right click erases · drag edges to move · corners to resize"
  },
  ja: {
    "brand.tag": "// 検閲しよう!", "topbar.tag": "魔法フィルター // ONLINE", "language.label": "言語",
    "toolbar.chooseInput": "フォルダーを選択", "toolbar.chooseOutput": "出力フォルダー", "toolbar.noFolder": "フォルダー未選択", "toolbar.outputHint": "出力先を選ばない場合、承認済み画像をダウンロードします", "toolbar.outputName": "出力: {name}", "toolbar.analyze": "フォルダーを解析", "toolbar.saveApproved": "承認済みを保存",
    "status.ready": "状態: 準備完了", "status.review": "モード: レビュー",
    "queue.eyebrow": "キュー", "queue.title": "画像", "queue.empty": "開始するフォルダーを選択",
    "review.eyebrow": "レビュー", "review.empty": "画像を選択", "review.previous": "前へ", "review.next": "次へ",
    "canvas.noDetections": "検出なし", "canvas.preview": "ライブプレビュー // マスクエディター", "canvas.auto": "自動", "canvas.manual": "手動",
    "layers.title": "レイヤー", "layers.none": "なし", "layers.stack": "レイヤー", "layers.empty": "画像を解析してレイヤーを作成", "layers.noDetections": "レイヤー未検出", "layers.layer": "レイヤー", "layers.add": "レイヤー追加", "layers.delete": "削除", "layers.manual": "手動", "layers.auto": "自動マスク", "layers.show": "レイヤーを表示", "layers.hide": "レイヤーを隠す", "layers.selected": "{index} 件を選択",
    "censor.title": "検閲", "censor.style": "選択範囲のスタイル", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.black": "バー", "censor.pixelateOption": "ピクセル", "censor.blurOption": "ぼかし", "censor.blackOption": "黒いバー", "censor.whiteOption": "白いバー",
    "controls.strength": "強度", "controls.padding": "安全マージン", "controls.brushSize": "ブラシサイズ", "controls.brushHelp": "左クリックで検閲を追加、右クリックで選択範囲から削除します。", "controls.threshold": "自動しきい値", "controls.thresholdHelp": "下げると多く検出し、上げると誤検出を減らします。",
    "classes.title": "検閲クラス", "classes.help": "フォルダーを解析する前に検出クラスを切り替えます。", "class.vagina": "膣", "class.penis": "陰茎", "class.anus": "肛門",
    "actions.reject": "拒否してスキップ", "actions.rejectShort": "拒否", "actions.approve": "承認",
    "notice.noImages": "対応する画像が見つかりません。", "notice.folderUnsupported": "このブラウザーではフォルダーを選択できません。新しい Chrome または Edge を使用してください。", "notice.saveAtLeast": "保存する前に画像を1枚以上承認してください。", "notice.savedOne": "1枚を保存しました。", "notice.savedMany": "{count}枚を保存しました。", "notice.analyzing": "フォルダーをローカル解析中…", "notice.analysisDone": "解析完了。各画像を確認し、必要なら調整して承認してください。", "notice.detectorUnavailable": "自動検出が利用できません: {message} 手動で範囲を描けます。",
    "status.approved": "承認済み", "status.rejected": "スキップ", "status.pending": "保留", "status.noLayers": "レイヤーなし", "status.detectedOne": "1レイヤーを検出", "status.detectedMany": "{count}レイヤーを検出", "canvas.summaryOne": "1レイヤー · {status}", "canvas.summaryMany": "{count}レイヤー · {status}", "canvas.manualHint": "レイヤー未検出 · 手動で追加できます", "progress.none": "フォルダーなし", "progress.one": "1件承認", "progress.many": "{count}件承認", "progress.detail": "{count} / {total} 件承認", "progress.analyzing": "{current} / {total} 件を解析中", "footer.local": "Censor Station 0.1 · ローカル処理", "footer.instructions": "左クリックで追加 · 右クリックで削除 · 辺をドラッグで移動 · 角でサイズ変更"
  },
  zh: {
    "brand.tag": "// 开始遮挡!", "topbar.tag": "魔法过滤器 // ONLINE", "language.label": "语言",
    "toolbar.chooseInput": "选择文件夹", "toolbar.chooseOutput": "输出文件夹", "toolbar.noFolder": "未选择文件夹", "toolbar.outputHint": "未选择输出文件夹时，已批准图片会下载", "toolbar.outputName": "输出：{name}", "toolbar.analyze": "分析文件夹", "toolbar.saveApproved": "保存已批准",
    "status.ready": "状态：就绪", "status.review": "模式：审核",
    "queue.eyebrow": "队列", "queue.title": "图片", "queue.empty": "选择文件夹开始",
    "review.eyebrow": "审核", "review.empty": "选择一张图片", "review.previous": "上一张", "review.next": "下一张",
    "canvas.noDetections": "没有检测结果", "canvas.preview": "实时预览 // 遮挡编辑器", "canvas.auto": "自动", "canvas.manual": "手动",
    "layers.title": "图层", "layers.none": "无", "layers.stack": "图层堆栈", "layers.empty": "分析图片以创建图层", "layers.noDetections": "未检测到图层", "layers.layer": "图层", "layers.add": "添加图层", "layers.delete": "删除", "layers.manual": "手动", "layers.auto": "自动蒙版", "layers.show": "显示图层", "layers.hide": "隐藏图层", "layers.selected": "已选择第 {index} 个",
    "censor.title": "审查", "censor.style": "选区样式", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.black": "黑条", "censor.pixelateOption": "像素化", "censor.blurOption": "模糊", "censor.blackOption": "黑色遮挡条", "censor.whiteOption": "白色遮挡条",
    "controls.strength": "强度", "controls.padding": "安全边距", "controls.brushSize": "画笔大小", "controls.brushHelp": "左键绘制遮挡，右键在选区内擦除。", "controls.threshold": "自动阈值", "controls.thresholdHelp": "降低阈值可发现更多区域，提高阈值可减少误报。",
    "classes.title": "要遮挡的类别", "classes.help": "分析文件夹前启用或停用检测类别。", "class.vagina": "阴道", "class.penis": "阴茎", "class.anus": "肛门",
    "actions.reject": "拒绝并跳过", "actions.rejectShort": "拒绝", "actions.approve": "批准",
    "notice.noImages": "文件夹中没有兼容的图片。", "notice.folderUnsupported": "你的浏览器不支持选择文件夹。请使用新版 Chrome 或 Edge。", "notice.saveAtLeast": "请先批准至少一张图片再保存。", "notice.savedOne": "已保存 1 张图片。", "notice.savedMany": "已保存 {count} 张图片。", "notice.analyzing": "正在本地分析文件夹…", "notice.analysisDone": "分析完成。请检查每张图片，调整区域后再批准。", "notice.detectorUnavailable": "自动检测不可用：{message} 你仍可手动绘制区域。",
    "status.approved": "已批准", "status.rejected": "已跳过", "status.pending": "待处理", "status.noLayers": "无图层", "status.detectedOne": "检测到 1 个图层", "status.detectedMany": "检测到 {count} 个图层", "canvas.summaryOne": "1 个图层 · {status}", "canvas.summaryMany": "{count} 个图层 · {status}", "canvas.manualHint": "未检测到图层 · 可以手动添加", "progress.none": "未选择文件夹", "progress.one": "已批准 1 张", "progress.many": "已批准 {count} 张", "progress.detail": "已批准 {count} / {total} 张", "progress.analyzing": "正在分析 {current} / {total}", "footer.local": "Censor Station 0.1 · 本地处理", "footer.instructions": "左键绘制 · 右键擦除 · 拖动边缘移动 · 拖动角落调整大小"
  }
};

let currentLanguage = localStorage.getItem("censor-station-language") || "es";
if (!TRANSLATIONS[currentLanguage]) currentLanguage = "es";

function t(key, values = {}) {
  let text = TRANSLATIONS[currentLanguage][key] || TRANSLATIONS.es[key] || key;
  return Object.entries(values).reduce((result, [name, value]) => result.replaceAll(`{${name}}`, String(value)), text);
}

const CLASS_OPTIONS = [
  { value: "vagina", labelKey: "class.vagina", asset: "/assets/icons/genital_icons/pussy_icon.png", visible: true, enabled: true },
  { value: "penis", labelKey: "class.penis", asset: "/assets/icons/genital_icons/penis_icon.png", visible: true, enabled: true },
  { value: "anus", labelKey: "class.anus", asset: "/assets/icons/genital_icons/anus_icon.png", visible: true, enabled: true },
  { value: "nipple", labelKey: "class.nipple", visible: false, enabled: false },
  { value: "pubic hair", labelKey: "class.pubicHair", visible: false, enabled: false },
  { value: "female face", labelKey: "class.femaleFace", visible: false, enabled: false },
  { value: "male face", labelKey: "class.maleFace", visible: false, enabled: false },
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

function renderClassOptions() {
  const container = $("class-options");
  container.innerHTML = "";
  CLASS_OPTIONS.filter((option) => option.visible).forEach(({ value, labelKey, asset, enabled }) => {
    const label = t(labelKey);
    const wrapper = document.createElement("div");
    wrapper.className = "class-toggle";
    wrapper.innerHTML = `<button type="button" class="class-toggle-button ${enabled ? "is-on" : ""}" data-class-toggle data-class="${value}" role="switch" aria-checked="${enabled}" aria-label="${escapeHtml(label)}"><span class="class-toggle-icon" aria-hidden="true"><img src="${asset}" alt="" /></span><span class="class-toggle-copy"><strong>${escapeHtml(label)}</strong></span></button>`;
    container.appendChild(wrapper);
  });
  container.querySelectorAll("[data-class-toggle]").forEach((button) => button.addEventListener("click", () => {
    const enabled = button.getAttribute("aria-checked") !== "true";
    button.setAttribute("aria-checked", String(enabled));
    button.classList.toggle("is-on", enabled);
    const option = CLASS_OPTIONS.find((candidate) => candidate.value === button.dataset.class);
    if (option) option.enabled = enabled;
  }));
}

function setNotice(message, type = "") {
  const notice = $("notice");
  notice.textContent = message;
  notice.className = `notice ${type}`.trim();
}

function clearNotice() { $("notice").className = "notice hidden"; }

function selectedClasses() {
  return [...document.querySelectorAll("[data-class-toggle][aria-checked=\"true\"]")].map((button) => button.dataset.class);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.id === "input-name" && state.inputHandle) return;
    if (element.id === "output-name" && state.outputHandle) return;
    if (element.id === "current-name" && currentFile()) return;
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => { element.title = t(element.dataset.i18nTitle); });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel)); });
  document.querySelectorAll("option[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $("language-select").value = currentLanguage;
  renderClassOptions();
  renderQueue();
  renderLayers();
  syncControls();
  draw();
}

$("language-select").addEventListener("change", (event) => {
  currentLanguage = TRANSLATIONS[event.target.value] ? event.target.value : "es";
  localStorage.setItem("censor-station-language", currentLanguage);
  applyLanguage();
});

function fileStatus(file) {
  if (file.status === "approved") return t("status.approved");
  if (file.status === "rejected") return t("status.rejected");
  if (file.detections.length === 1) return t("status.detectedOne");
  if (file.detections.length) return t("status.detectedMany", { count: file.detections.length });
  return file.analyzed ? t("status.noLayers") : t("status.pending");
}

function renderQueue() {
  const list = $("queue-list");
  $("queue-count").textContent = String(state.files.length);
  if (!state.files.length) {
    list.className = "queue-list empty-state";
    list.textContent = t("queue.empty");
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
  return `${t("layers.layer")} ${index + 1}`;
}

function renderLayers() {
  const list = $("layer-list");
  const item = currentFile();
  if (!item?.detections.length) {
    list.className = "layer-list empty-state";
    list.textContent = item?.analyzed ? t("layers.noDetections") : t("layers.empty");
    return;
  }
  list.className = "layer-list";
  list.innerHTML = item.detections.map((box, index) => {
    const mode = ["pixelate", "blur", "black", "white"].includes(box.mode) ? box.mode : "pixelate";
    return `
      <div class="layer-row">
      <button class="layer-select ${index === state.selected ? "active" : ""}" data-layer-select="${index}"><span class="layer-mini-thumb mode-${mode}"></span><span class="layer-copy"><strong>${escapeHtml(layerName(box, index))}</strong><small>${t(box.source === "manual" ? "layers.manual" : "layers.auto")}</small></span></button>
      <button class="layer-visibility ${box.visible === false ? "off" : ""}" data-layer-visibility="${index}" title="${t(box.visible === false ? "layers.show" : "layers.hide")}">${box.visible === false ? "○" : "◉"}</button>
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
  $("detection-summary").textContent = item.detections.length === 1
    ? t("canvas.summaryOne", { status: item.status || t("status.pending") })
    : item.detections.length
      ? t("canvas.summaryMany", { count: item.detections.length, status: item.status || t("status.pending") })
      : t("canvas.manualHint");
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
  $("selected-badge").textContent = enabled ? t("layers.selected", { index: state.selected + 1 }) : t("layers.none");
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
    if (!window.showDirectoryPicker) throw new Error(t("notice.folderUnsupported"));
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
    if (state.files.length) await showFile(0); else setNotice(t("notice.noImages"), "error");
  } catch (error) { if (error.name !== "AbortError") setNotice(error.message, "error"); }
});

function mimeFromName(name) { const ext = name.split(".").pop().toLowerCase(); return ({ jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", bmp: "image/bmp", avif: "image/avif" })[ext] || ""; }

$("choose-output").addEventListener("click", async () => { try { state.outputHandle = await window.showDirectoryPicker({ mode: "readwrite" }); $("output-name").textContent = t("toolbar.outputName", { name: state.outputHandle.name }); } catch (error) { if (error.name !== "AbortError") setNotice(error.message, "error"); } });
$("previous").addEventListener("click", () => showFile(state.current - 1));
$("next").addEventListener("click", () => showFile(state.current + 1));
$("reject").addEventListener("click", () => { if (!currentFile()) return; currentFile().status = "rejected"; renderQueue(); moveNext(); });
$("approve").addEventListener("click", async () => { if (!currentFile()) return; await saveItem(currentFile()); currentFile().status = "approved"; renderQueue(); updateProgress(); moveNext(); });
$("save-all").addEventListener("click", async () => { const approved = state.files.filter((file) => file.status === "approved"); if (!approved.length) { setNotice(t("notice.saveAtLeast")); return; } for (const item of approved) await saveItem(item); setNotice(approved.length === 1 ? t("notice.savedOne") : t("notice.savedMany", { count: approved.length })); });
$("detect-all").addEventListener("click", () => detectAll());

async function detectAll() {
  if (!state.files.length) return;
  $("detect-all").disabled = true; setNotice(t("notice.analyzing"));
  for (let i = 0; i < state.files.length; i++) {
    await detectFile(state.files[i]);
    if (state.current === i && state.selected < 0 && state.files[i].detections.length) state.selected = 0;
    if (state.current === i) { renderLayers(); syncControls(); draw(); }
    renderQueue(); const progressLabel = $("progress-label"); const progressBar = $("progress-bar"); if (progressLabel) progressLabel.textContent = t("progress.analyzing", { current: i + 1, total: state.files.length }); if (progressBar) progressBar.style.width = `${((i + 1) / state.files.length) * 100}%`;
  }
  $("detect-all").disabled = false; setNotice(t("notice.analysisDone"));
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
    if (!item.analyzed) setNotice(t("notice.detectorUnavailable", { message: error.message }), "error");
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
function updateProgress() { const done = state.files.filter((file) => file.status === "approved").length; const progressDetail = $("progress-detail"); const progressBar = $("progress-bar"); const progressLabel = $("progress-label"); if (progressDetail) progressDetail.textContent = t("progress.detail", { count: done, total: state.files.length }); if (progressBar) progressBar.style.width = state.files.length ? `${done / state.files.length * 100}%` : "0%"; if (progressLabel) progressLabel.textContent = state.files.length ? (done === 1 ? t("progress.one") : t("progress.many", { count: done })) : t("progress.none"); }

window.addEventListener("resize", () => { if (currentFile()?.image) { fitCanvas(currentFile()); draw(); } });
applyLanguage();
syncControls();

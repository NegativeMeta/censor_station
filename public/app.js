const TRANSLATIONS = {
  es: {
    "tabs.censor": "CENSURA", "tabs.optimizer": "OPTIMIZAR",
    "optimizer.eyebrow": "OPTIMIZADOR", "optimizer.queueTitle": "Imágenes censuradas", "optimizer.previewEyebrow": "VISTA PREVIA", "optimizer.settingsTitle": "OPTIMIZACIÓN", "optimizer.previewEmpty": "Selecciona una imagen", "optimizer.previewHint": "Pulsa optimizar para ver el resultado", "optimizer.original": "ORIGINAL", "optimizer.optimized": "OPTIMIZADA", "optimizer.originalSize": "Original", "optimizer.optimizedSize": "Optimizada", "optimizer.reduction": "Reducción", "optimizer.dimensions": "Dimensiones", "optimizer.statusReady": "OPTIMIZER READY", "optimizer.empty": "Selecciona una carpeta para comenzar", "optimizer.inputEmpty": "Ninguna carpeta seleccionada", "optimizer.outputEmpty": "Se guardarán en la subcarpeta optimized si no eliges salida", "optimizer.chooseInput": "Abrir carpeta censurada", "optimizer.chooseOutput": "Carpeta optimizada", "optimizer.process": "Optimizar imágenes", "optimizer.saveAll": "Guardar optimizadas", "optimizer.format": "Formato de salida", "optimizer.formatOriginal": "Conservar formato", "optimizer.formatWebp": "WebP · recomendado", "optimizer.formatJpeg": "JPEG", "optimizer.formatPng": "PNG · sin pérdida", "optimizer.quality": "Calidad visual", "optimizer.lossless": "Modo sin pérdida", "optimizer.qualityHint": "PNG conserva cada píxel. WebP y JPEG reducen mucho el peso con calidad visual alta.", "optimizer.localHint": "Todo el proceso ocurre localmente y los originales no se modifican.", "optimizer.pending": "Pendiente", "optimizer.ready": "Lista para guardar", "optimizer.processing": "Optimizando {current} de {total}…", "optimizer.completed": "Optimización terminada: {count} imágenes procesadas.", "optimizer.saveNoResults": "Optimiza al menos una imagen antes de guardar.", "optimizer.savedOne": "1 imagen optimizada guardada.", "optimizer.savedMany": "{count} imágenes optimizadas guardadas.", "optimizer.error": "No se pudo optimizar {name}: {message}",
    "brand.tag": "// LET'S CENSOR!", "topbar.tag": "MAGICAL FILTER // ONLINE", "language.label": "Idioma",
    "toolbar.chooseImage": "Abrir imagen", "toolbar.chooseInput": "Abrir carpeta", "toolbar.chooseOutput": "Carpeta de salida", "toolbar.noFolder": "Ninguna carpeta seleccionada", "toolbar.outputHint": "Se guardarán en la subcarpeta censored si no eliges salida", "toolbar.singleHint": "Se descargará al guardar esta imagen", "toolbar.outputName": "Salida: {name}", "toolbar.analyze": "Analizar imágenes", "toolbar.analyzeImage": "Analizar imagen", "toolbar.saveApproved": "Guardar aprobadas", "toolbar.saveImage": "Guardar imagen", "toolbar.saveGif": "Guardar GIF", "toolbar.unloadModel": "Liberar modelo",
    "status.ready": "ESTADO: LISTO", "status.review": "MODO: REVISIÓN",
    "queue.eyebrow": "COLA", "queue.title": "Imágenes", "queue.empty": "Elige una carpeta para comenzar",
    "review.eyebrow": "REVISIÓN", "review.empty": "Selecciona una imagen", "review.previous": "Anterior", "review.next": "Siguiente",
    "canvas.noDetections": "Sin detecciones", "canvas.preview": "VISTA PREVIA EN VIVO // EDITOR DE MÁSCARAS", "canvas.auto": "Auto", "canvas.manual": "Manual",
    "layers.title": "LAYERS", "layers.none": "Ninguna", "layers.stack": "LAYER STACK", "layers.empty": "Analiza una imagen para crear capas", "layers.noDetections": "No hay capas detectadas", "layers.layer": "Capa", "layers.add": "Añadir capa", "layers.delete": "Eliminar", "layers.manual": "Manual", "layers.auto": "Máscara automática", "layers.show": "Mostrar capa", "layers.hide": "Ocultar capa", "layers.selected": "{index} seleccionada",
    "censor.title": "CENSOR", "censor.type": "CENSOR TYPE", "censor.style": "Estilo de la selección", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.lines": "LÍNEAS", "censor.glowWhite": "BLANCO GLOW", "censor.pixelateOption": "Píxeles", "censor.blurOption": "Desenfoque", "censor.linesOption": "Múltiples líneas negras", "censor.glowWhiteOption": "Blanco resplandeciente",
    "controls.optionsTitle": "OPTIONS", "controls.padding": "Margen de seguridad", "controls.brushSize": "Tamaño del pincel", "controls.brushHelp": "Con el botón izquierdo pintas censura; si no hay capas, el primer clic crea una automáticamente. Con el derecho borras dentro de la zona seleccionada.", "controls.threshold": "Umbral automático", "controls.thresholdHelp": "¿Se le escapa alguna zona? Baja el umbral. ¿Marca de más? Súbelo.", "controls.maskThreshold": "Precisión del contorno", "controls.maskThresholdHelp": "Ciñe el borde al cuerpo subiendo el valor. Reanaliza para aplicarlo.", "controls.maskInset": "Ajuste interior", "controls.maskInsetHelp": "Recorta un poco el borde de las máscaras automáticas.",
    "classes.title": "Partes a censurar", "classes.help": "Activa o desactiva las partes detectables antes de analizar la carpeta.", "class.vagina": "Vagina", "class.penis": "Pene", "class.anus": "Ano",
    "actions.reject": "Rechazar y saltar", "actions.rejectShort": "Rechazar", "actions.approve": "APPROVE", "actions.approveAll": "APROBAR TODO", "actions.save": "GUARDAR", "layers.recheckHint": "Ctrl + clic para sumar a la re-revisión", "recheck.help": "Selecciona capas con Ctrl + clic y vuelve a detectarlas solo a ellas con el umbral actual (deslizador Umbral automático).", "recheck.run": "Re-revisar selección", "recheck.runOne": "Re-revisar 1 capa", "recheck.running": "Re-revisando {count} capas al {threshold}%…", "recheck.done": "{count} capas actualizadas.", "recheck.doneMissing": "{updated} actualizadas, {missing} sin coincidencia.", "save.saving": "Guardando…", "save.imagesSaved": "imágenes guardadas", "global.title": "Ajustes globales", "global.enable": "Aplicar a toda la cola", "global.help": "Actívalo y estos valores se aplican a todas las capas de todas las imágenes de la cola. Cambiar aquí reescribe cada capa; el pincel y las zonas dibujadas no se tocan.", "global.style": "Estilo para todas", "global.applied": "Ajustes globales aplicados a {count} capas.", "global.empty": "No hay capas en la cola. Analiza primero.", "global.previewing": "Vista previa en la imagen actual · {total} imágenes en cola.", "global.propagating": "Aplicando a la cola… {done}/{total} imágenes.",
        "notice.noImages": "No encontré imágenes compatibles en esa carpeta.", "notice.folderUnsupported": "Tu navegador no permite elegir carpetas. Usa Chrome o Edge recientes.", "notice.saveAtLeast": "Aprueba al menos una imagen antes de guardar aprobadas.", "notice.reviewComplete": "Ya no quedan imágenes por aprobar. ¿Quieres guardar ahora las imágenes aprobadas?", "notice.saveLater": "Las imágenes aprobadas quedaron listas. Puedes guardarlas con «Guardar aprobadas».", "notice.savedOne": "1 imagen guardada.", "notice.savedMany": "{count} imágenes guardadas.", "notice.analyzing": "Analizando carpeta localmente…", "notice.analyzingImage": "Analizando imagen localmente…", "notice.analysisDone": "Análisis terminado. Revisa cada imagen, ajusta las zonas y aprueba solo las correctas.", "notice.analysisImageDone": "Análisis terminado. Ajusta la zona y guarda la imagen cuando esté lista.", "notice.detectorUnavailable": "Detector automático no disponible: {message} Puedes seguir dibujando zonas manuales.", "notice.modelUnloaded": "Modelo descargado de memoria. Se recargará solo al analizar.", "notice.modelUnloadServerDown": "Sesión del navegador liberada. El servidor no respondió: arranca el backend para liberar su memoria también.", "notice.gifTooManyFrames": "«{name}» tiene {count} frames y el límite es {limit}. No se puede procesar ese GIF.", "dialog.gifLimitTitle": "GIF demasiado largo", "dialog.gifLimitBody": "«{name}» tiene {count} frames y el límite es {limit}. Reduce el GIF o divídelo en partes para censurarlo.", "dialog.dismiss": "Entendido", "gif.expanding": "Extrayendo frames del GIF…", "gif.framesLoaded": "frames cargados", "notice.gifReady": "GIF cargado: {count} frames en cola. Pulsa «Analizar» para detectar zonas.", "toolbar.analyzeGif": "Analizar frames",
    "status.approved": "Aprobada", "status.rejected": "Saltada", "status.pending": "Pendiente", "status.noLayers": "Sin capas", "status.detectedOne": "1 capa detectada", "status.detectedMany": "{count} capas detectadas", "canvas.summaryOne": "1 capa · {status}", "canvas.summaryMany": "{count} capas · {status}", "canvas.manualHint": "Sin capas detectadas · haz clic para crear una capa", "progress.none": "Sin carpeta", "progress.one": "1 aprobada", "progress.many": "{count} aprobadas", "progress.detail": "{count} de {total} aprobadas", "progress.analyzing": "Analizando {current} de {total}", "footer.local": "Censor Station 0.1 · procesamiento local", "footer.motto": "Let's censor until the world is free and this tool becomes useless!", "footer.instructions": "Izquierdo pinta · derecho borra"
  },
  en: {
    "tabs.censor": "CENSOR", "tabs.optimizer": "OPTIMIZE",
    "optimizer.eyebrow": "OPTIMIZER", "optimizer.queueTitle": "Censored images", "optimizer.previewEyebrow": "PREVIEW", "optimizer.settingsTitle": "OPTIMIZATION", "optimizer.previewEmpty": "Select an image", "optimizer.previewHint": "Press optimize to see the result", "optimizer.original": "ORIGINAL", "optimizer.optimized": "OPTIMIZED", "optimizer.originalSize": "Original", "optimizer.optimizedSize": "Optimized", "optimizer.reduction": "Reduction", "optimizer.dimensions": "Dimensions", "optimizer.statusReady": "OPTIMIZER READY", "optimizer.empty": "Choose a folder to begin", "optimizer.inputEmpty": "No folder selected", "optimizer.outputEmpty": "Saved in the optimized subfolder if no output folder is chosen", "optimizer.chooseInput": "Choose censored folder", "optimizer.chooseOutput": "Optimized folder", "optimizer.process": "Optimize images", "optimizer.saveAll": "Save optimized", "optimizer.format": "Output format", "optimizer.formatOriginal": "Keep original format", "optimizer.formatWebp": "WebP · recommended", "optimizer.formatJpeg": "JPEG", "optimizer.formatPng": "PNG · lossless", "optimizer.quality": "Visual quality", "optimizer.lossless": "Lossless mode", "optimizer.qualityHint": "PNG preserves every pixel. WebP and JPEG reduce file size with high visual quality.", "optimizer.localHint": "Everything runs locally and originals are never modified.", "optimizer.pending": "Pending", "optimizer.ready": "Ready to save", "optimizer.processing": "Optimizing {current} of {total}…", "optimizer.completed": "Optimization complete: {count} images processed.", "optimizer.saveNoResults": "Optimize at least one image before saving.", "optimizer.savedOne": "1 optimized image saved.", "optimizer.savedMany": "{count} optimized images saved.", "optimizer.error": "Could not optimize {name}: {message}",
    "brand.tag": "// LET'S CENSOR!", "topbar.tag": "MAGICAL FILTER // ONLINE", "language.label": "Language",
    "toolbar.chooseImage": "Open image", "toolbar.chooseInput": "Open folder", "toolbar.chooseOutput": "Output folder", "toolbar.noFolder": "No folder selected", "toolbar.outputHint": "Files are saved in a censored subfolder if no output is chosen", "toolbar.singleHint": "The image will download when saved", "toolbar.outputName": "Output: {name}", "toolbar.analyze": "Analyze images", "toolbar.analyzeImage": "Analyze image", "toolbar.saveApproved": "Save approved", "toolbar.saveImage": "Save image", "toolbar.saveGif": "Save GIF", "toolbar.unloadModel": "Unload model",
    "status.ready": "STATUS: READY", "status.review": "MODE: REVIEW",
    "queue.eyebrow": "QUEUE", "queue.title": "Images", "queue.empty": "Choose a folder to begin",
    "review.eyebrow": "REVIEW", "review.empty": "Select an image", "review.previous": "Previous", "review.next": "Next",
    "canvas.noDetections": "No detections", "canvas.preview": "LIVE PREVIEW // MASK EDITOR", "canvas.auto": "Auto", "canvas.manual": "Manual",
    "layers.title": "LAYERS", "layers.none": "None", "layers.stack": "LAYER STACK", "layers.empty": "Analyze an image to create layers", "layers.noDetections": "No layers detected", "layers.layer": "Layer", "layers.add": "Add layer", "layers.delete": "Delete", "layers.manual": "Manual", "layers.auto": "Automatic mask", "layers.show": "Show layer", "layers.hide": "Hide layer", "layers.selected": "{index} selected",
    "censor.title": "CENSOR", "censor.type": "CENSOR TYPE", "censor.style": "Selection style", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.lines": "LINES", "censor.glowWhite": "WHITE GLOW", "censor.pixelateOption": "Pixels", "censor.blurOption": "Blur", "censor.linesOption": "Multiple black lines", "censor.glowWhiteOption": "Glowing white",
    "controls.optionsTitle": "OPTIONS", "controls.padding": "Safety margin", "controls.brushSize": "Brush size", "controls.brushHelp": "Left click paints censorship; if there are no layers, the first click creates one automatically. Right click erases inside the selected area.", "controls.threshold": "Automatic threshold", "controls.thresholdHelp": "Missing a spot? Lower it. Marking too much? Raise it.", "controls.maskThreshold": "Contour precision", "controls.maskThresholdHelp": "Hug the edge tighter by raising it. Re-analyze to apply.", "controls.maskInset": "Inner adjustment", "controls.maskInsetHelp": "Trims automatic mask edges just a little.",
    "classes.title": "Parts to censor", "classes.help": "Enable or disable detectable parts before analyzing the folder.", "class.vagina": "Vagina", "class.penis": "Penis", "class.anus": "Anus",
    "actions.reject": "Reject and skip", "actions.rejectShort": "Reject", "actions.approve": "APPROVE", "actions.approveAll": "APPROVE ALL", "actions.save": "SAVE", "layers.recheckHint": "Ctrl + click to add to re-check", "recheck.help": "Select layers with Ctrl + click and re-detect only them with the current threshold (Automatic threshold slider).", "recheck.run": "Re-check selection", "recheck.runOne": "Re-check 1 layer", "recheck.running": "Re-checking {count} layers at {threshold}%…", "recheck.done": "{count} layers updated.", "recheck.doneMissing": "{updated} updated, {missing} with no match.", "save.saving": "Saving…", "save.imagesSaved": "images saved", "global.title": "Global settings", "global.enable": "Apply to whole queue", "global.help": "Enable it and these values apply to every layer of every queued image. Changing here rewrites each layer; brush strokes and drawn areas stay untouched.", "global.style": "Style for all", "global.applied": "Global settings applied to {count} layers.", "global.empty": "No layers in the queue. Analyze first.", "global.previewing": "Previewing on the current image · {total} images queued.", "global.propagating": "Applying to the queue… {done}/{total} images.",
    "notice.noImages": "No compatible images were found in that folder.", "notice.folderUnsupported": "Your browser cannot choose folders. Use a recent version of Chrome or Edge.", "notice.saveAtLeast": "Approve at least one image before saving approved files.", "notice.reviewComplete": "There are no more images to approve. Do you want to save the approved images now?", "notice.saveLater": "The approved images are ready. You can save them with “Save approved”.", "notice.savedOne": "1 image saved.", "notice.savedMany": "{count} images saved.", "notice.analyzing": "Analyzing folder locally…", "notice.analyzingImage": "Analyzing image locally…", "notice.analysisDone": "Analysis complete. Review each image, adjust the areas and approve only the correct ones.", "notice.analysisImageDone": "Analysis complete. Adjust the area and save the image when ready.", "notice.detectorUnavailable": "Automatic detector unavailable: {message} You can continue drawing manual areas.", "notice.modelUnloaded": "Model unloaded from memory. It reloads automatically on analyze.",     "notice.modelUnloadServerDown": "Browser session released. The server did not respond: start the backend to free its memory too.", "notice.gifTooManyFrames": "“{name}” has {count} frames and the limit is {limit}. That GIF cannot be processed.", "dialog.gifLimitTitle": "GIF too long", "dialog.gifLimitBody": "“{name}” has {count} frames and the limit is {limit}. Trim the GIF or split it into parts to censor it.", "dialog.dismiss": "Got it", "gif.expanding": "Extracting GIF frames…", "gif.framesLoaded": "frames loaded", "notice.gifReady": "GIF loaded: {count} frames queued. Press “Analyze” to detect areas.", "toolbar.analyzeGif": "Analyze frames",
    "status.approved": "Approved", "status.rejected": "Skipped", "status.pending": "Pending", "status.noLayers": "No layers", "status.detectedOne": "1 layer detected", "status.detectedMany": "{count} layers detected", "canvas.summaryOne": "1 layer · {status}", "canvas.summaryMany": "{count} layers · {status}", "canvas.manualHint": "No layers detected · click to create a layer", "progress.none": "No folder", "progress.one": "1 approved", "progress.many": "{count} approved", "progress.detail": "{count} of {total} approved", "progress.analyzing": "Analyzing {current} of {total}", "footer.local": "Censor Station 0.1 · local processing", "footer.motto": "Let's censor until the world is free and this tool becomes useless!", "footer.instructions": "Left click paints · right click erases"
  },
  ja: {
    "tabs.censor": "検閲", "tabs.optimizer": "最適化",
    "optimizer.eyebrow": "オプティマイザー", "optimizer.queueTitle": "検閲済み画像", "optimizer.previewEyebrow": "プレビュー", "optimizer.settingsTitle": "最適化", "optimizer.previewEmpty": "画像を選択", "optimizer.previewHint": "最適化を押すと結果を表示", "optimizer.original": "元画像", "optimizer.optimized": "最適化後", "optimizer.originalSize": "元サイズ", "optimizer.optimizedSize": "最適化後", "optimizer.reduction": "削減率", "optimizer.dimensions": "サイズ", "optimizer.statusReady": "最適化の準備完了", "optimizer.empty": "開始するフォルダーを選択", "optimizer.inputEmpty": "フォルダー未選択", "optimizer.outputEmpty": "出力先を選ばない場合、optimized サブフォルダーに保存します", "optimizer.chooseInput": "検閲済みフォルダー", "optimizer.chooseOutput": "最適化フォルダー", "optimizer.process": "画像を最適化", "optimizer.saveAll": "最適化画像を保存", "optimizer.format": "出力形式", "optimizer.formatOriginal": "元の形式を維持", "optimizer.formatWebp": "WebP · 推奨", "optimizer.formatJpeg": "JPEG", "optimizer.formatPng": "PNG · 可逆", "optimizer.quality": "画質", "optimizer.lossless": "可逆モード", "optimizer.qualityHint": "PNGは全ピクセルを保持します。WebPとJPEGは高画質のまま容量を削減します。", "optimizer.localHint": "すべてローカルで処理し、元画像は変更しません。", "optimizer.pending": "保留", "optimizer.ready": "保存準備完了", "optimizer.processing": "{current} / {total} 件を最適化中…", "optimizer.completed": "最適化完了: {count}枚を処理しました。", "optimizer.saveNoResults": "保存する前に画像を最適化してください。", "optimizer.savedOne": "最適化画像を1枚保存しました。", "optimizer.savedMany": "最適化画像を{count}枚保存しました。", "optimizer.error": "{name}を最適化できませんでした: {message}",
    "brand.tag": "// 検閲しよう!", "topbar.tag": "魔法フィルター // ONLINE", "language.label": "言語",
    "toolbar.chooseImage": "画像を開く", "toolbar.chooseInput": "フォルダーを選択", "toolbar.chooseOutput": "出力フォルダー", "toolbar.noFolder": "フォルダー未選択", "toolbar.outputHint": "出力先を選ばない場合、censored サブフォルダーに保存します", "toolbar.singleHint": "保存すると画像をダウンロードします", "toolbar.outputName": "出力: {name}", "toolbar.analyze": "画像をすべて解析", "toolbar.analyzeImage": "この画像を解析", "toolbar.saveApproved": "承認済みを保存", "toolbar.saveImage": "画像を保存", "toolbar.saveGif": "GIFを保存", "toolbar.unloadModel": "モデルを解放",
    "status.ready": "状態: 準備完了", "status.review": "モード: レビュー",
    "queue.eyebrow": "キュー", "queue.title": "画像", "queue.empty": "開始するフォルダーを選択",
    "review.eyebrow": "レビュー", "review.empty": "画像を選択", "review.previous": "前へ", "review.next": "次へ",
    "canvas.noDetections": "検出なし", "canvas.preview": "ライブプレビュー // マスクエディター", "canvas.auto": "自動", "canvas.manual": "手動",
    "layers.title": "レイヤー", "layers.none": "なし", "layers.stack": "レイヤー", "layers.empty": "画像を解析してレイヤーを作成", "layers.noDetections": "レイヤー未検出", "layers.layer": "レイヤー", "layers.add": "レイヤー追加", "layers.delete": "削除", "layers.manual": "手動", "layers.auto": "自動マスク", "layers.show": "レイヤーを表示", "layers.hide": "レイヤーを隠す", "layers.selected": "{index} 件を選択",
    "censor.title": "検閲", "censor.type": "検閲タイプ", "censor.style": "選択範囲のスタイル", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.lines": "ライン", "censor.glowWhite": "白い光", "censor.pixelateOption": "ピクセル", "censor.blurOption": "ぼかし", "censor.linesOption": "複数の黒い線", "censor.glowWhiteOption": "光る白",
    "controls.optionsTitle": "オプション", "controls.padding": "安全マージン", "controls.brushSize": "ブラシサイズ", "controls.brushHelp": "左クリックで検閲を追加します。レイヤーがない場合、最初のクリックで自動作成します。右クリックで選択範囲から削除します。", "controls.threshold": "自動しきい値", "controls.thresholdHelp": "見つからない部分がある？下げてみて。検出しすぎ？上げてみて。", "controls.maskThreshold": "輪郭の精度", "controls.maskThresholdHelp": "値を上げると輪郭が体にぴったりします。再解析で適用されます。", "controls.maskInset": "内側調整", "controls.maskInsetHelp": "自動マスクの端を少しだけ内側にします。",
    "classes.title": "検閲する部位", "classes.help": "フォルダーを解析する前に検出する部位を切り替えます。", "class.vagina": "膣", "class.penis": "陰茎", "class.anus": "肛門",
    "actions.reject": "拒否してスキップ", "actions.rejectShort": "拒否", "actions.approve": "承認", "actions.approveAll": "すべて承認", "actions.save": "保存", "layers.recheckHint": "Ctrl + クリックで再チェックに追加", "recheck.help": "Ctrl + クリックでレイヤーを選択し、現在のしきい値（自動しきい値スライダー）でそれだけを再検出します。", "recheck.run": "選択を再チェック", "recheck.runOne": "1レイヤーを再チェック", "recheck.running": "{count}レイヤーを{threshold}%で再チェック中…", "recheck.done": "{count}レイヤーを更新しました。", "recheck.doneMissing": "{updated}件更新、{missing}件は一致なし。", "save.saving": "保存中…", "save.imagesSaved": "枚保存済み", "global.title": "全体設定", "global.enable": "キュー全体に適用", "global.help": "有効にすると、ここでの値がキューの全画像・全レイヤーに適用されます。ブラシや描画範囲は変更されません。", "global.style": "全体のスタイル", "global.applied": "{count}レイヤーに全体設定を適用しました。", "global.empty": "キューにレイヤーがありません。先に解析してください。", "global.previewing": "現在の画像でプレビュー中 · キューに{total}枚。", "global.propagating": "キューに適用中… {done}/{total}枚。",
    "notice.noImages": "対応する画像が見つかりません。", "notice.folderUnsupported": "このブラウザーではフォルダーを選択できません。新しい Chrome または Edge を使用してください。", "notice.saveAtLeast": "保存する前に画像を1枚以上承認してください。", "notice.reviewComplete": "承認する画像はもうありません。承認済みの画像を保存しますか？", "notice.saveLater": "承認済みの画像を保存できます。「承認済みを保存」を押してください。", "notice.savedOne": "1枚を保存しました。", "notice.savedMany": "{count}枚を保存しました。", "notice.analyzing": "フォルダーをローカル解析中…", "notice.analyzingImage": "画像をローカル解析中…", "notice.analysisDone": "解析完了。各画像を確認し、必要なら調整して承認してください。", "notice.analysisImageDone": "解析完了。範囲を調整して、準備ができたら画像を保存してください。", "notice.detectorUnavailable": "自動検出が利用できません: {message} 手動で範囲を描けます。", "notice.modelUnloaded": "モデルをメモリから解放しました。解析時に自動で再読み込みします。",     "notice.modelUnloadServerDown": "ブラウザーのセッションを解放しました。サーバーが応答しません: バックエンドを起動してください。", "notice.gifTooManyFrames": "「{name}」は{count}フレームあり、上限は{limit}です。このGIFは処理できません。", "dialog.gifLimitTitle": "GIFが長すぎます", "dialog.gifLimitBody": "「{name}」は{count}フレームあり、上限は{limit}です。短くするか分割して検閲してください。", "dialog.dismiss": "了解", "gif.expanding": "GIFのフレームを展開中…", "gif.framesLoaded": "フレーム展開済み", "notice.gifReady": "GIFを読み込みました:{count}フレームをキューに追加しました。「解析」を押して検出してください。", "toolbar.analyzeGif": "フレームを解析",
    "status.approved": "承認済み", "status.rejected": "スキップ", "status.pending": "保留", "status.noLayers": "レイヤーなし", "status.detectedOne": "1レイヤーを検出", "status.detectedMany": "{count}レイヤーを検出", "canvas.summaryOne": "1レイヤー · {status}", "canvas.summaryMany": "{count}レイヤー · {status}", "canvas.manualHint": "レイヤー未検出 · クリックでレイヤーを作成", "progress.none": "フォルダーなし", "progress.one": "1件承認", "progress.many": "{count}件承認", "progress.detail": "{count} / {total} 件承認", "progress.analyzing": "{current} / {total} 件を解析中", "footer.local": "Censor Station 0.1 · ローカル処理", "footer.motto": "Let's censor until the world is free and this tool becomes useless!", "footer.instructions": "左クリックで追加 · 右クリックで削除"
  },
  zh: {
    "tabs.censor": "遮挡", "tabs.optimizer": "优化",
    "optimizer.eyebrow": "优化器", "optimizer.queueTitle": "已遮挡图片", "optimizer.previewEyebrow": "预览", "optimizer.settingsTitle": "图片优化", "optimizer.previewEmpty": "选择一张图片", "optimizer.previewHint": "点击优化查看结果", "optimizer.original": "原图", "optimizer.optimized": "优化后", "optimizer.originalSize": "原始大小", "optimizer.optimizedSize": "优化后", "optimizer.reduction": "减少比例", "optimizer.dimensions": "尺寸", "optimizer.statusReady": "优化器就绪", "optimizer.empty": "选择文件夹开始", "optimizer.inputEmpty": "未选择文件夹", "optimizer.outputEmpty": "未选择输出文件夹时会保存到 optimized 子文件夹", "optimizer.chooseInput": "选择已遮挡文件夹", "optimizer.chooseOutput": "优化输出文件夹", "optimizer.process": "优化图片", "optimizer.saveAll": "保存优化图片", "optimizer.format": "输出格式", "optimizer.formatOriginal": "保留原格式", "optimizer.formatWebp": "WebP · 推荐", "optimizer.formatJpeg": "JPEG", "optimizer.formatPng": "PNG · 无损", "optimizer.quality": "视觉质量", "optimizer.lossless": "无损模式", "optimizer.qualityHint": "PNG保留每个像素。WebP和JPEG在保持高视觉质量的同时减小文件大小。", "optimizer.localHint": "所有处理都在本地完成，原图不会被修改。", "optimizer.pending": "待处理", "optimizer.ready": "可以保存", "optimizer.processing": "正在优化 {current} / {total}…", "optimizer.completed": "优化完成：已处理 {count} 张图片。", "optimizer.saveNoResults": "请先优化至少一张图片再保存。", "optimizer.savedOne": "已保存 1 张优化图片。", "optimizer.savedMany": "已保存 {count} 张优化图片。", "optimizer.error": "无法优化 {name}：{message}",
    "brand.tag": "// 开始遮挡!", "topbar.tag": "魔法过滤器 // ONLINE", "language.label": "语言",
    "toolbar.chooseImage": "打开图片", "toolbar.chooseInput": "选择文件夹", "toolbar.chooseOutput": "输出文件夹", "toolbar.noFolder": "未选择文件夹", "toolbar.outputHint": "未选择输出文件夹时，会保存到 censored 子文件夹", "toolbar.singleHint": "保存时将下载这张图片", "toolbar.outputName": "输出：{name}", "toolbar.analyze": "分析全部图片", "toolbar.analyzeImage": "分析当前图片", "toolbar.saveApproved": "保存已批准", "toolbar.saveImage": "保存图片", "toolbar.saveGif": "保存 GIF", "toolbar.unloadModel": "释放模型",
    "status.ready": "状态：就绪", "status.review": "模式：审核",
    "queue.eyebrow": "队列", "queue.title": "图片", "queue.empty": "选择文件夹开始",
    "review.eyebrow": "审核", "review.empty": "选择一张图片", "review.previous": "上一张", "review.next": "下一张",
    "canvas.noDetections": "没有检测结果", "canvas.preview": "实时预览 // 遮挡编辑器", "canvas.auto": "自动", "canvas.manual": "手动",
    "layers.title": "图层", "layers.none": "无", "layers.stack": "图层堆栈", "layers.empty": "分析图片以创建图层", "layers.noDetections": "未检测到图层", "layers.layer": "图层", "layers.add": "添加图层", "layers.delete": "删除", "layers.manual": "手动", "layers.auto": "自动蒙版", "layers.show": "显示图层", "layers.hide": "隐藏图层", "layers.selected": "已选择第 {index} 个",
    "censor.title": "审查", "censor.type": "遮挡类型", "censor.style": "选区样式", "censor.pixelate": "PIXELATE", "censor.blur": "BLUR", "censor.lines": "黑线", "censor.glowWhite": "白色光晕", "censor.pixelateOption": "像素化", "censor.blurOption": "模糊", "censor.linesOption": "多条黑线", "censor.glowWhiteOption": "发光白色",
    "controls.optionsTitle": "选项", "controls.padding": "安全边距", "controls.brushSize": "画笔大小", "controls.brushHelp": "左键绘制遮挡；如果没有图层，第一次点击会自动创建。右键在选区内擦除。", "controls.threshold": "自动阈值", "controls.thresholdHelp": "有漏掉的区域？调低。误报太多？调高。", "controls.maskThreshold": "轮廓精度", "controls.maskThresholdHelp": "调高可使轮廓更贴合。重新分析后生效。", "controls.maskInset": "内部调整", "controls.maskInsetHelp": "轻微收缩自动蒙版的边缘。",
    "classes.title": "要遮挡的部位", "classes.help": "分析文件夹前启用或停用要检测的部位。", "class.vagina": "阴道", "class.penis": "阴茎", "class.anus": "肛门",
    "actions.reject": "拒绝并跳过", "actions.rejectShort": "拒绝", "actions.approve": "批准", "actions.approveAll": "全部批准", "actions.save": "保存", "layers.recheckHint": "按住 Ctrl 并点击加入重新检查", "recheck.help": "按住 Ctrl 并点击选择图层，仅用当前阈值（自动阈值滑块）重新检测它们。", "recheck.run": "重新检查所选", "recheck.runOne": "重新检查 1 个图层", "recheck.running": "正在以 {threshold}% 重新检查 {count} 个图层…", "recheck.done": "已更新 {count} 个图层。", "recheck.doneMissing": "已更新 {updated} 个，{missing} 个无匹配。", "save.saving": "正在保存…", "save.imagesSaved": "张图片已保存", "global.title": "全局设置", "global.enable": "应用于整个队列", "global.help": "启用后，这些值将应用于队列中所有图片的所有图层。画笔和已绘制区域不受影响。", "global.style": "全部样式", "global.applied": "全局设置已应用于 {count} 个图层。", "global.empty": "队列中没有图层。请先分析。", "global.previewing": "正在当前图片上预览 · 队列共 {total} 张。", "global.propagating": "正在应用于队列… {done}/{total} 张。",
    "notice.noImages": "文件夹中没有兼容的图片。", "notice.folderUnsupported": "你的浏览器不支持选择文件夹。请使用新版 Chrome 或 Edge。", "notice.saveAtLeast": "请先批准至少一张图片再保存。", "notice.reviewComplete": "已经没有需要批准的图片了。现在要保存已批准的图片吗？", "notice.saveLater": "已批准的图片已经准备好。你可以点击“保存已批准”进行保存。", "notice.savedOne": "已保存 1 张图片。", "notice.savedMany": "已保存 {count} 张图片。", "notice.analyzing": "正在本地分析文件夹…", "notice.analyzingImage": "正在本地分析图片…", "notice.analysisDone": "分析完成。请检查每张图片，调整区域后再批准。", "notice.analysisImageDone": "分析完成。请调整区域，准备好后保存图片。", "notice.detectorUnavailable": "自动检测不可用：{message} 你仍可手动绘制区域。", "notice.modelUnloaded": "模型已从内存释放。分析时会自动重新加载。",     "notice.modelUnloadServerDown": "已释放浏览器会话。服务器无响应：请启动后端以释放其内存。", "notice.gifTooManyFrames": "“{name}”有 {count} 帧，上限为 {limit}。无法处理该 GIF。", "dialog.gifLimitTitle": "GIF 过长", "dialog.gifLimitBody": "“{name}”有 {count} 帧，上限为 {limit}。请裁剪或拆分后再进行遮挡。", "dialog.dismiss": "知道了", "gif.expanding": "正在提取 GIF 帧…", "gif.framesLoaded": "帧已加载", "notice.gifReady": "GIF 已加载：队列中有 {count} 帧。点击“分析”检测区域。", "toolbar.analyzeGif": "分析帧",
    "status.approved": "已批准", "status.rejected": "已跳过", "status.pending": "待处理", "status.noLayers": "无图层", "status.detectedOne": "检测到 1 个图层", "status.detectedMany": "检测到 {count} 个图层", "canvas.summaryOne": "1 个图层 · {status}", "canvas.summaryMany": "{count} 个图层 · {status}", "canvas.manualHint": "未检测到图层 · 点击创建图层", "progress.none": "未选择文件夹", "progress.one": "已批准 1 张", "progress.many": "已批准 {count} 张", "progress.detail": "已批准 {count} / {total} 张", "progress.analyzing": "正在分析 {current} / {total}", "footer.local": "Censor Station 0.1 · 本地处理", "footer.motto": "Let's censor until the world is free and this tool becomes useless!", "footer.instructions": "左键绘制 · 右键擦除"
  }
};

const ADDITIONAL_TRANSLATIONS = {
  es: {
    "queue.analyzingSelection": "Analizando {count} imágenes seleccionadas…",
    "queue.selectionAnalysisDone": "Análisis terminado: {count} imágenes seleccionadas.",
    "queue.analysisPartial": "{updated} imágenes analizadas; {failed} fallaron.",
    "analysis.cancel": "Cancelar",
    "analysis.cancelling": "Deteniendo…",
    "analysis.cancelTitle": "Se detendrá al terminar la imagen en curso.",
    "analysis.cancelPending": "Se detendrá al terminar la imagen en curso.",
    "analysis.cancelled": "Análisis cancelado tras {completed} imágenes. Se conservaron los resultados ya completados.",
    "analysis.cancelledCurrent": "Terminó la imagen en curso; no se analizarán más imágenes.",
  },
  en: {
    "queue.analyzingSelection": "Analyzing {count} selected images…",
    "queue.selectionAnalysisDone": "Analysis complete: {count} selected images.",
    "queue.analysisPartial": "{updated} images analyzed; {failed} failed.",
    "analysis.cancel": "Cancel",
    "analysis.cancelling": "Stopping…",
    "analysis.cancelTitle": "Stops after the image currently being analyzed.",
    "analysis.cancelPending": "Analysis will stop after the current image finishes.",
    "analysis.cancelled": "Analysis stopped after {completed} images. Completed results were kept.",
    "analysis.cancelledCurrent": "The current image finished; no more images were analyzed.",
  },
  ja: {
    "queue.analyzingSelection": "選択した {count} 枚の画像を解析中…",
    "queue.selectionAnalysisDone": "解析完了: 選択した {count} 枚。",
    "queue.analysisPartial": "{updated} 枚を解析、{failed} 枚失敗。",
    "analysis.cancel": "キャンセル",
    "analysis.cancelling": "停止中…",
    "analysis.cancelTitle": "現在の画像の解析後に停止します。",
    "analysis.cancelPending": "現在の画像の解析後に停止します。",
    "analysis.cancelled": "{completed} 枚の解析後に停止しました。完了済みの結果は保持されています。",
    "analysis.cancelledCurrent": "現在の画像が完了しました。以降の画像は解析しません。",
  },
  zh: {
    "queue.analyzingSelection": "正在分析所选的 {count} 张图片…",
    "queue.selectionAnalysisDone": "分析完成：所选的 {count} 张图片。",
    "queue.analysisPartial": "已分析 {updated} 张图片；{failed} 张失败。",
    "analysis.cancel": "取消",
    "analysis.cancelling": "正在停止…",
    "analysis.cancelTitle": "当前图片分析完成后停止。",
    "analysis.cancelPending": "当前图片分析完成后将停止。",
    "analysis.cancelled": "已在分析 {completed} 张图片后停止。已完成的结果已保留。",
    "analysis.cancelledCurrent": "当前图片已完成；后续图片未分析。",
  },
};

let currentLanguage = localStorage.getItem("censor-station-language") || "es";
if (!TRANSLATIONS[currentLanguage]) currentLanguage = "es";

function t(key, values = {}) {
  let text = TRANSLATIONS[currentLanguage][key] || ADDITIONAL_TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.es[key] || ADDITIONAL_TRANSLATIONS.es[key] || key;
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
  singleMode: false,
  inputHandle: null,
  outputHandle: null,
  selected: -1,
  brush: null,
  analysis: { active: false, current: 0, completed: 0, total: 0, stepFraction: 0, timer: null },
  optimizer: { files: [], current: -1, inputHandle: null, outputHandle: null, previewToken: 0 },
  gifs: new Map(),
  global: {
    enabled: false,
    mode: "pixelate",
    padding: 8,
    pixelFrequency: 100,
    pixelShape: "square",
    pixelIrregularity: 0,
    blurRadius: 10,
    blurPasses: 1,
    lineCount: 6,
    lineThickness: 8,
    lineAngle: -10,
    glowRadius: 20,
    glowStrength: 100,
    // Staged propagation: the current image previews instantly, the rest of
    // the queue follows in idle-time chunks so the UI never freezes.
    job: 0,
    queue: [],
  },
  queueSelection: new Set(),
};

const GIF_FRAME_CAP = 300;

function gifTools() { return window.__censorStationGif || null; }

function isGifFile(file) {
  return file?.type === "image/gif" || /\.gif$/i.test(file?.name || "");
}

/** Every GIF frame enters the queue as a pending image; Analyze fills detections. */
function makeGifFrameFile({ gifId, gifName, frame, detections }) {
  return {
    file: null,
    name: `${gifName.replace(/\.[^.]+$/, "")} · f${frame.index + 1}`,
    url: frame.dataUrl,
    image: null,
    detections,
    analyzed: false,
    status: "",
    kind: "gif-frame",
    gifId,
    gifName,
    frameIndex: frame.index,
    frameFile: frame.file || `frame-${String(frame.index).padStart(4, "0")}.png`,
    frameDelay: frame.delay,
  };
}

function gifRecordFor(item) {
  if (!item || item.kind !== "gif-frame") return null;
  return state.gifs.get(item.gifId) || null;
}

async function decodeGifFrames(file, dataUrl, { onExtractProgress } = {}) {
  // Prefer the streaming endpoint so the loading dialog counts frames live;
  // fall back to the single-shot endpoint (then the browser decoder) below.
  try {
    const streamed = await decodeGifFramesStream(dataUrl, onExtractProgress);
    if (streamed) return streamed;
  } catch (streamError) {
    console.warn("GIF streaming extract unavailable; using single-shot extract.", streamError);
  }
  try {
    const response = await fetch("/api/gif/extract", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ dataUrl, maxFrames: GIF_FRAME_CAP }),
    });
    const result = await response.json();
    if (response.ok && result.ok) {
      return { source: "server", width: result.width, height: result.height, loop: result.loop, frameCount: result.frameCount, frames: result.frames };
    }
    throw new Error(result.message || "Desktop GIF decoder unavailable.");
  } catch (serverError) {
    const tools = gifTools();
    if (!tools) throw serverError;
    console.warn("Desktop GIF decoder unavailable; using the browser decoder.", serverError);
    return { source: "browser", ...(await tools.decodeGif(file, { maxFrames: GIF_FRAME_CAP })) };
  }
}

/** Read the SSE stream from /api/gif/extract-stream; null when unsupported. */
async function decodeGifFramesStream(dataUrl, onExtractProgress) {
  const response = await fetch("/api/gif/extract-stream", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ dataUrl, maxFrames: GIF_FRAME_CAP }),
  });
  if (!response.ok || !response.body) return null;
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = null;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let boundary = buffer.indexOf("\n\n");
    while (boundary >= 0) {
      const chunk = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      for (const line of chunk.split("\n")) {
        const text = line.startsWith("data:") ? line.slice(5).trim() : "";
        if (!text) continue;
        const event = JSON.parse(text);
        if (event.finished) {
          finished = event;
        } else if (Number.isFinite(event.done)) {
          onExtractProgress?.(event.done, event.total);
        }
      }
      boundary = buffer.indexOf("\n\n");
    }
  }
  if (!finished || finished.ok === false) {
    if (finished && finished.message) throw new Error(finished.message);
    return null;
  }
  return { source: "server", width: finished.width, height: finished.height, loop: finished.loop, frameCount: finished.frameCount, frames: finished.frames };
}

const ADVANCED_STYLE_COPY = {
  es: { pixelate: "AJUSTES PIXELATE", blur: "AJUSTES BLUR", lines: "AJUSTES LÍNEAS", "glow-white": "AJUSTES WHITE GLOW", frequency: "Frecuencia", shape: "Forma", irregularity: "Bordes irregulares", square: "Cuadrado", circle: "Círculo", diamond: "Diamante", radius: "Radio", passes: "Pasadas", count: "Cantidad", thickness: "Grosor", angle: "Ángulo", haloSize: "Tamaño del halo", haloStrength: "Intensidad del halo" },
  en: { pixelate: "PIXELATE TUNING", blur: "BLUR TUNING", lines: "LINES TUNING", "glow-white": "WHITE GLOW TUNING", frequency: "Frequency", shape: "Shape", irregularity: "Irregular edges", square: "Square", circle: "Circle", diamond: "Diamond", radius: "Radius", passes: "Passes", count: "Count", thickness: "Thickness", angle: "Angle", haloSize: "Halo size", haloStrength: "Halo strength" },
  ja: { pixelate: "PIXELATE 設定", blur: "BLUR 設定", lines: "ライン設定", "glow-white": "白い光の設定", frequency: "頻度", shape: "形", irregularity: "不規則なエッジ", square: "四角", circle: "円", diamond: "ひし形", radius: "半径", passes: "回数", count: "本数", thickness: "太さ", angle: "角度", haloSize: "ハローの大きさ", haloStrength: "ハローの強さ" },
  zh: { pixelate: "像素化设置", blur: "模糊设置", lines: "线条设置", "glow-white": "白色光晕设置", frequency: "频率", shape: "形状", irregularity: "不规则边缘", square: "方形", circle: "圆形", diamond: "菱形", radius: "半径", passes: "层数", count: "数量", thickness: "粗细", angle: "角度", haloSize: "光晕大小", haloStrength: "光晕强度" },
};

function advancedCopy(key) { return (ADVANCED_STYLE_COPY[currentLanguage] || ADVANCED_STYLE_COPY.en)[key] || key; }
const advancedValue = (box, key, fallback) => Number.isFinite(Number(box?.[key])) ? Number(box[key]) : fallback;

const $ = (id) => document.getElementById(id);
const canvas = $("preview");
const ctx = canvas.getContext("2d");
const optimizerOriginalCanvas = $("optimizer-original-preview");
const optimizerOptimizedCanvas = $("optimizer-optimized-preview");
const optimizerOriginalCtx = optimizerOriginalCanvas.getContext("2d");
const optimizerOptimizedCtx = optimizerOptimizedCanvas.getContext("2d");

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

function updateSingleModeUi() {
  const single = state.singleMode;
  const item = currentFile();
  const analyzeLabel = $("detect-all").querySelector(".button-label");
  const analyzeButton = $("detect-all");
  const modeKnown = Boolean(state.inputHandle || state.singleMode);
  if (!modeKnown) {
    analyzeLabel.textContent = "-----";
    $("save-all").querySelector(".button-label").textContent = "-----";
    $("save-single").querySelector(".button-label").textContent = "-----";
    $("approve").querySelector(".button-label").textContent = "-----";
    $("approve-all").querySelector(".button-label").textContent = "-----";
  } else {
    const multi = state.files.length > 1;
    analyzeLabel.textContent = t(multi ? "toolbar.analyze" : "toolbar.analyzeImage");
    const isGifFrame = item?.kind === "gif-frame";
    $("save-all").querySelector(".button-label").textContent = t("toolbar.saveApproved");
    // In single-image mode the solo save button targets whatever is selected:
    // a still image saves as an image, a GIF frame reassembles the whole GIF.
    $("save-single").querySelector(".button-label").textContent = t(isGifFrame ? "toolbar.saveGif" : "toolbar.saveImage");
    const actionKey = item && state.current === state.files.length - 1 ? "actions.save" : "actions.approve";
    $("approve").querySelector(".button-label").textContent = t(actionKey);
    $("approve-all").querySelector(".button-label").textContent = t("actions.approveAll");
  }
  const multiFiles = state.files.length > 1;
  analyzeButton.title = t(multiFiles ? "toolbar.analyze" : "toolbar.analyzeImage");
  analyzeButton.disabled = !state.files.length || state.analysis.active;
  const detectSingleButton = $("detect-single");
  if (detectSingleButton) {
    detectSingleButton.querySelector(".button-label").textContent = t("toolbar.analyzeImage");
    detectSingleButton.title = t("toolbar.analyzeImage");
    // Show only when there is a choice to make: 2+ items in the queue
    // (folder mode, or a single GIF expanded into frames). With just one
    // image both buttons would target the same file, so keep only one.
    detectSingleButton.hidden = !multiFiles;
    detectSingleButton.disabled = !item || state.analysis.active;
  }
  const unloadModelButton = $("unload-model");
  if (unloadModelButton) unloadModelButton.disabled = state.analysis.active;
  const approveAllButton = $("approve-all");
  if (approveAllButton) {
    approveAllButton.title = t("actions.approveAll");
    // Needs at least one pending item; pointless with 0-1 files and while
    // the detector is running (statuses would be overwritten mid-flight).
    const pendingCount = state.files.filter((file) => file.status !== "approved" && file.status !== "rejected").length;
    approveAllButton.disabled = pendingCount === 0 || state.analysis.active;
  }
  $("reject").disabled = !item;
  $("approve").disabled = !item;
  $("save-all").hidden = single;
  $("save-single").hidden = !single;
  $("save-single").disabled = !single || !item;
  $("choose-output").disabled = single || !state.inputHandle || !writableFolder(state.inputHandle);
  if (single && item) {
    $("input-name").textContent = item.name;
    $("output-name").textContent = t("toolbar.singleHint");
  } else {
    $("input-name").textContent = state.inputHandle?.name || t("toolbar.noFolder");
    $("output-name").textContent = state.outputHandle ? t("toolbar.outputName", { name: state.outputHandle.name }) : t("toolbar.outputHint");
  }
}

function renderAnalysisProgress() {
  const progress = state.analysis;
  const panel = $("analysis-progress");
  const cancelButton = $("cancel-analysis");
  if (!progress.active) {
    panel.hidden = true;
    if (cancelButton) cancelButton.hidden = true;
    return;
  }
  const total = Math.max(1, progress.total);
  const progressUnits = Math.min(total, progress.completed + (progress.completed < total ? progress.stepFraction : 0));
  const percent = Math.round(Math.min(1, progressUnits / total) * 100);
  $("analysis-progress-label").textContent = t("progress.analyzing", { current: progress.current, total });
  $("analysis-progress-value").textContent = `${percent}%`;
  $("analysis-progress-bar").style.width = `${percent}%`;
  $("analysis-progress-track").setAttribute("aria-valuenow", String(percent));
  if (cancelButton) {
    cancelButton.hidden = false;
    cancelButton.disabled = progress.cancelRequested;
    cancelButton.textContent = t(progress.cancelRequested ? "analysis.cancelling" : "analysis.cancel");
    cancelButton.title = t("analysis.cancelTitle");
  }
  panel.hidden = false;
}

function requestAnalysisCancel() {
  if (!state.analysis.active || state.analysis.cancelRequested) return;
  state.analysis.cancelRequested = true;
  renderAnalysisProgress();
  setNotice(t("analysis.cancelPending"));
}

function startAnalysisProgress(total) {
  if (state.analysis.timer) clearInterval(state.analysis.timer);
  state.analysis = { active: true, cancelRequested: false, current: 1, completed: 0, total, stepFraction: 0, timer: null };
  startAnalysisStep(1, 0);
}

function ensureAnalysisCancelButton() {
  if ($("cancel-analysis")) return;
  const progressValue = $("analysis-progress-value");
  if (!progressValue) return;
  const button = document.createElement("button");
  button.type = "button";
  button.id = "cancel-analysis";
  button.className = "button ghost-danger analysis-cancel";
  button.dataset.i18n = "analysis.cancel";
  button.dataset.i18nTitle = "analysis.cancelTitle";
  button.hidden = true;
  button.textContent = t("analysis.cancel");
  progressValue.before(button);
}

ensureAnalysisCancelButton();
$("cancel-analysis").addEventListener("click", requestAnalysisCancel);

let analysisEtaMs = 0;

function startAnalysisStep(current, completed) {
  if (state.analysis.timer) clearInterval(state.analysis.timer);
  state.analysis.current = current;
  state.analysis.completed = completed;
  state.analysis.stepFraction = 0;
  state.analysis.stepStart = performance.now();
  state.analysis.timer = setInterval(() => {
    if (!state.analysis.active) return;
    if (analysisEtaMs > 0) {
      const elapsed = performance.now() - state.analysis.stepStart;
      state.analysis.stepFraction = Math.min(.95, .95 * (1 - Math.exp(-2 * elapsed / analysisEtaMs)));
    } else {
      const fraction = state.analysis.stepFraction;
      state.analysis.stepFraction = fraction < .45 ? Math.min(.45, fraction + .05) : Math.min(.9, fraction + .004);
    }
    renderAnalysisProgress();
  }, 120);
  renderAnalysisProgress();
}

function updateAnalysisProgress(current, completed) {
  if (state.analysis.stepStart) {
    const elapsed = Math.max(1, performance.now() - state.analysis.stepStart);
    analysisEtaMs = analysisEtaMs > 0 ? analysisEtaMs * .6 + elapsed * .4 : elapsed;
  }
  state.analysis.current = current;
  state.analysis.completed = completed;
  state.analysis.stepFraction = 0;
  if (completed >= state.analysis.total && state.analysis.timer) {
    clearInterval(state.analysis.timer);
    state.analysis.timer = null;
  }
  renderAnalysisProgress();
}

function finishAnalysisProgress() {
  if (state.analysis.timer) clearInterval(state.analysis.timer);
  state.analysis.timer = null;
  state.analysis.completed = state.analysis.total;
  state.analysis.active = false;
  renderAnalysisProgress();
}

function selectedClasses() {
  return [...document.querySelectorAll("[data-class-toggle][aria-checked=\"true\"]")].map((button) => button.dataset.class);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.id === "input-name" && (state.inputHandle || state.singleMode)) return;
    if (element.id === "output-name" && state.outputHandle) return;
    if (element.id === "current-name" && currentFile()) return;
    if (element.id === "optimizer-input-name" && state.optimizer.inputHandle) return;
    if (element.id === "optimizer-output-name" && state.optimizer.outputHandle) return;
    if (element.id === "optimizer-current-name" && optimizerCurrentFile()) return;
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => { element.title = t(element.dataset.i18nTitle); });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel)); });
  document.querySelectorAll("option[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
  $("language-select").value = currentLanguage;
  renderClassOptions();
  updateSingleModeUi();
  renderAnalysisProgress();
  renderQueue();
  renderLayers();
  syncControls();
  draw();
  renderOptimizerQueue();
  syncOptimizerControls();
  updateOptimizerStats();
}

$("language-select").addEventListener("change", (event) => {
  currentLanguage = TRANSLATIONS[event.target.value] ? event.target.value : "es";
  localStorage.setItem("censor-station-language", currentLanguage);
  applyLanguage();
});

document.querySelectorAll("[data-app-tab]").forEach((button) => button.addEventListener("click", () => {
  const tab = button.dataset.appTab;
  document.querySelectorAll("[data-app-tab]").forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-app-panel]").forEach((panel) => { panel.hidden = panel.dataset.appPanel !== tab; });
  if (tab === "optimizer") {
    renderOptimizerQueue();
    syncOptimizerControls();
    updateOptimizerStats();
  }
}));

function fileStatus(file) {
  if (file.status === "approved") return t("status.approved");
  if (file.status === "rejected") return t("status.rejected");
  if (file.kind === "gif-frame") {
    const total = state.gifs.get(file.gifId)?.frameCount;
    const label = `GIF ${file.frameIndex + 1}${Number.isFinite(total) ? `/${total}` : ""}`;
    if (!file.analyzed) return `${label} · ${t("status.pending")}`;
    if (!file.detections.length) return `${label} · ${t("status.noLayers")}`;
    const base = file.detections.length === 1 ? t("status.detectedOne") : t("status.detectedMany", { count: file.detections.length });
    return `${label} · ${base}`;
  }
  if (file.detections.length === 1) return t("status.detectedOne");
  if (file.detections.length) return t("status.detectedMany", { count: file.detections.length });
  return file.analyzed ? t("status.noLayers") : t("status.pending");
}

function renderQueue() {
  const list = $("queue-list");
  $("queue-count").textContent = String(state.files.length);
  $("item-count").textContent = `ITEMS: ${state.files.length}`;
  if (!state.files.length) {
    list.className = "queue-list empty-state";
    list.textContent = t("queue.empty");
    return;
  }
  list.className = "queue-list";
  list.innerHTML = state.files.map((file, index) => `
    <div class="queue-item ${index === state.current ? "active" : ""} ${state.queueSelection.has(index) ? "selected-for-analysis" : ""}" data-index="${index}" role="button" tabindex="0" aria-pressed="${state.queueSelection.has(index)}">
      <img class="queue-thumb" src="${file.url}" alt="" />
      <div><div class="queue-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div><div class="queue-status ${file.status || (file.analyzed ? "detected" : "")}">${fileStatus(file)}</div></div>
    </div>`).join("");
  list.querySelectorAll(".queue-item").forEach((item) => {
    const select = (event) => selectQueueItem(Number(item.dataset.index), event);
    item.addEventListener("click", select);
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      select(event);
    });
  });
}

function selectQueueItem(index, event = {}) {
  if (state.analysis.active || !state.files[index]) return;
  if (event.ctrlKey || event.metaKey) {
    if (state.queueSelection.has(index)) state.queueSelection.delete(index);
    else state.queueSelection.add(index);
  } else {
    state.queueSelection.clear();
    state.queueSelection.add(index);
  }
  showFile(index);
}

function queueAnalysisTargets() {
  const selected = [...state.queueSelection]
    .filter((index) => state.files[index])
    .sort((first, second) => first - second);
  return selected.length > 1 ? selected : state.files.map((_, index) => index);
}

function removeLegacyQueueSelectionUi() {
  document.querySelectorAll(".queue-selection-help, .queue-selection-controls, .recheck-section").forEach((element) => element.remove());
}

function escapeHtml(value) { return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }

function layerName(box, index) {
  return `${t("layers.layer")} ${index + 1}`;
}

function detectedPartName(box) {
  const className = String(box.class || "").trim();
  if (!className) return "";
  const key = `class.${className}`;
  const translated = t(key);
  return translated === key ? className.replace(/\b\w/g, (character) => character.toUpperCase()) : translated;
}

function layerVisibilityIcon(hidden) {
  return hidden
    ? `<svg class="layer-eye-icon is-hidden" viewBox="0 0 32 24" aria-hidden="true"><path d="M3 12c3.6-5.8 8-8.7 13-8.7 2.4 0 4.7.6 6.8 1.8M29 12c-3.6 5.8-8 8.7-13 8.7-2.4 0-4.7-.6-6.8-1.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 3 29 21" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="16" cy="12" r="3.2" fill="currentColor" opacity=".55"/></svg>`
    : `<svg class="layer-eye-icon is-visible" viewBox="0 0 32 24" aria-hidden="true"><path d="M2.5 12C6.2 6.1 10.7 3.1 16 3.1S25.8 6.1 29.5 12C25.8 17.9 21.3 20.9 16 20.9S6.2 17.9 2.5 12Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="16" cy="12" r="4" fill="currentColor"/><circle cx="14.5" cy="10.5" r="1.2" fill="#180d2d" opacity=".8"/></svg>`;
}

function layerThumbnailSignature(box, index) {
  return [index, box.mode, box.visible, box.padding, box.maskInset, box.manualBlank, box.brushEdits?.length || 0, box.polygon?.length || 0].join("|");
}

function paintLayerThumbnail(target, image, box) {
  const size = 84;
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const bounds = polygonBounds(box.polygon) || { x: 0, y: 0, w: imageWidth, h: imageHeight };
  const side = Math.max(1, Math.round(Math.min(imageWidth, imageHeight, Math.max(bounds.w, bounds.h) * 1.35)));
  const centerX = bounds.x + bounds.w / 2;
  const centerY = bounds.y + bounds.h / 2;
  const cropX = clamp(centerX - side / 2, 0, Math.max(0, imageWidth - side));
  const cropY = clamp(centerY - side / 2, 0, Math.max(0, imageHeight - side));
  const crop = document.createElement("canvas");
  crop.width = side;
  crop.height = side;
  Object.defineProperties(crop, { naturalWidth: { value: side }, naturalHeight: { value: side } });
  crop.getContext("2d").drawImage(image, cropX, cropY, side, side, 0, 0, side, side);
  const translatePoint = ([x, y]) => [x - cropX, y - cropY];
  const localBox = {
    ...box,
    polygon: (box.polygon || []).map(translatePoint),
    brushEdits: (box.brushEdits || []).map((edit) => ({ ...edit, x: edit.x - cropX, y: edit.y - cropY })),
  };
  const context = target.getContext("2d");
  context.clearRect(0, 0, size, size);
  context.imageSmoothingEnabled = true;
  context.drawImage(crop, 0, 0, size, size);
  if (box.visible !== false) context.drawImage(createCensoredLayer(crop, localBox, size, size), 0, 0);
}

function renderLayerThumbnails(item) {
  if (!item?.image) return;
  document.querySelectorAll("[data-layer-thumb]").forEach((target) => {
    const index = Number(target.dataset.layerThumb);
    const box = item.detections[index];
    if (!box) return;
    const signature = layerThumbnailSignature(box, index);
    if (target.dataset.signature === signature) return;
    paintLayerThumbnail(target, item.image, box);
    target.dataset.signature = signature;
  });
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
    const mode = ["pixelate", "blur", "lines", "black", "glow-white", "white"].includes(box.mode) ? box.mode : "pixelate";
    return `
      <div class="layer-row">
      <button class="layer-select ${index === state.selected ? "active" : ""}" data-layer-select="${index}" aria-label="${escapeHtml(layerName(box, index))}" aria-pressed="${index === state.selected}"><canvas class="layer-mini-thumb mode-${mode}" width="84" height="84" data-layer-thumb="${index}" aria-hidden="true"></canvas><span class="layer-copy"><strong>${escapeHtml(layerName(box, index))}</strong><small>${t(box.source === "manual" ? "layers.manual" : "layers.auto")}</small>${box.source === "manual" ? "" : `<em class="layer-part">${escapeHtml(detectedPartName(box))}</em>`}</span></button>
      <button class="layer-visibility ${box.visible === false ? "off" : ""}" data-layer-visibility="${index}" title="${escapeHtml(t(box.visible === false ? "layers.show" : "layers.hide"))}" aria-label="${escapeHtml(t(box.visible === false ? "layers.show" : "layers.hide"))}" aria-pressed="${box.visible !== false}">${layerVisibilityIcon(box.visible === false)}</button>
    </div>`;
  }).join("");
  renderLayerThumbnails(item);
  list.querySelectorAll("[data-layer-select]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.layerSelect);
      state.selected = index;
      state.brush = null;
      renderLayers();
      syncControls();
      draw();
    });
  });
  list.querySelectorAll("[data-layer-visibility]").forEach((button) => button.addEventListener("click", (event) => {
    event.stopPropagation();
    const box = item.detections[Number(button.dataset.layerVisibility)];
    box.visible = box.visible === false;
    renderLayers();
    draw();
  }));
}

async function folderRequest(payload) {
  const response = await fetch("/api/folder", {
    method: "POST",
    headers: { "content-type": "application/json", "x-censor-station": "folder-access" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.message || "No se pudo acceder a la carpeta local.");
  return result;
}

function fileListFolder(input) {
  return new Promise((resolve, reject) => {
    input.value = "";
    input.onchange = () => {
      const files = [...(input.files || [])].filter((file) => mimeFromName(file.name));
      input.onchange = null;
      if (!files.length) {
        reject(new DOMException("Cancelled", "AbortError"));
        return;
      }
      const firstPath = files[0].webkitRelativePath || files[0].name;
      const name = firstPath.split("/")[0] || "Selected folder";
      resolve({
        name,
        canWrite: false,
        async *values() {
          for (const file of files) yield { kind: "file", name: file.name, async getFile() { return file; } };
        },
      });
    };
    input.click();
  });
}

function localFolderHandle(id, name, subfolder = "") {
  return {
    name,
    canWrite: true,
    async *values() {
      const result = await folderRequest({ action: "list", id });
      for (const filename of result.files) {
        yield {
          kind: "file", name: filename,
          async getFile() {
            const result = await folderRequest({ action: "read", id, name: filename });
            const bytes = Uint8Array.from(atob(result.data), char => char.charCodeAt(0));
            return new File([bytes], filename, { type: mimeFromName(filename) });
          },
        };
      }
    },
    async getDirectoryHandle(child) { return localFolderHandle(id, child, child); },
    async getFileHandle(filename) {
      return {
        async createWritable() {
          let blob;
          return {
            async write(value) { blob = value; },
            async close() {
              await folderRequest({ action: "write", id, subfolder, name: filename, dataUrl: await blobToDataUrl(blob) });
            },
          };
        },
      };
    },
  };
}

async function pickFolder() {
  if (window.showDirectoryPicker) return window.showDirectoryPicker({ mode: "readwrite" });
  try {
    const result = await folderRequest({ action: "pick" });
    if (result.cancelled) throw new DOMException("Cancelled", "AbortError");
    return localFolderHandle(result.id, result.name);
  } catch (error) {
    if (error.name === "AbortError") throw error;
    return fileListFolder($("folder-input"));
  }
}

function writableFolder(handle) { return Boolean(handle && handle.canWrite !== false); }

const folderLoadingText = {
  es: ["Cargando carpeta…", "imágenes cargadas"],
  en: ["Loading folder…", "images loaded"],
  ja: ["フォルダーを読み込み中…", "枚読み込み済み"],
  zh: ["正在加载文件夹…", "张图片已加载"],
};
function updateFolderLoading(count) {
  $("folder-loading-count").textContent = count + " " + (folderLoadingText[currentLanguage] || folderLoadingText.en)[1];
}
async function startFolderLoading(name, { title } = {}) {
  $("folder-loading-title").textContent = title || (folderLoadingText[currentLanguage] || folderLoadingText.en)[0];
  $("folder-loading-name").textContent = name;
  updateFolderLoading(0);
  if (!$("folder-loading").open) $("folder-loading").showModal();
  await new Promise(resolve => setTimeout(resolve, 20));
}
function updateGifLoading(count, total) {
  const suffix = Number.isFinite(total) && total > 0 ? ` / ${total}` : "";
  $("folder-loading-count").textContent = count + suffix + " " + t("gif.framesLoaded");
}
$("folder-loading").addEventListener("cancel", event => event.preventDefault());

/** Keep the loading dialog informative while a GIF expands frame by frame. */
async function withGifExpandingNotice(name, expand) {
  await startFolderLoading(name, { title: t("gif.expanding") });
  // startFolderLoading leaves "0 images loaded" on the counter; replace it
  // immediately so the wait shows frames, not images. The total is unknown
  // until the decoder responds, so the count fills in as frames arrive.
  updateGifLoading(0);
  try {
    return await expand(updateGifLoading);
  } finally {
    $("folder-loading").close();
  }
}

function makeFile(file) {
  return { file, name: file.name, url: URL.createObjectURL(file), image: null, detections: [], analyzed: false, status: "" };
}

/** Expand every GIF in the intake into its full-canvas frames before analysis.
 *  Frames enter the queue immediately as pending items; detection happens
 *  later via the Analyze button (same as still images). */
async function expandGifIntake(files, { onFrameCount, onFrameTotal } = {}) {
  const expanded = [];
  for (const file of files) {
    if (!isGifFile(file)) {
      expanded.push({ file, name: file.name, url: URL.createObjectURL(file), image: null, detections: [], analyzed: false, status: "" });
      continue;
    }
    try {
      const decoded = await decodeGifFrames(file, await blobToDataUrl(file), {
        onExtractProgress: (done, total) => {
          // Live extraction progress: the total is known from the first tick,
          // long before any frame reaches the queue.
          onFrameTotal?.(total);
          updateGifLoading(done, total);
        },
      });
      onFrameTotal?.(decoded.frameCount);
      const gifId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      const record = {
        id: gifId,
        name: file.name,
        source: decoded.source,
        width: decoded.width,
        height: decoded.height,
        loop: decoded.loop,
        frameCount: decoded.frameCount,
        analyzed: false,
        frames: decoded.frames.map((frame, position) => ({
          index: frame.index ?? position,
          delay: frame.delay ?? 100,
          file: frame.file || `frame-${String(frame.index ?? position).padStart(4, "0")}.png`,
          dataUrl: frame.dataUrl,
        })),
      };
      state.gifs.set(gifId, record);
      for (const meta of record.frames) {
        expanded.push(makeGifFrameFile({ gifId, gifName: file.name, frame: meta, detections: [] }));
        onFrameCount?.(expanded.length);
      }
    } catch (error) {
      const limit = parseGifLimit(error, file);
      if (limit) {
        showGifLimitDialog({ name: file.name, count: limit.count, limit: limit.limit });
        setNotice(t("notice.gifTooManyFrames", { name: file.name, count: limit.count, limit: limit.limit }), "error");
      } else {
        setNotice(`No se pudo expandir ${file.name}: ${error.message}`, "error");
      }
    }
  }
  return expanded;
}

function dataUrlToImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No se pudo leer un frame del GIF."));
    image.src = dataUrl;
  });
}

/** Detect the "<count> frames … <limit>" shape from either decoder. */
function parseGifLimit(error, file) {
  const match = /(\d+)\s*frames?;?\s*el m[áa]ximo es\s*(\d+)|(\d+)\s*frames?.*?(\d+)/i.exec(error?.message || "");
  if (!match) return null;
  const count = Number(match[1] || match[3]);
  const limit = Number(match[2] || match[4]);
  if (!Number.isFinite(count) || !Number.isFinite(limit)) return null;
  void file;
  return { count, limit };
}

function showGifLimitDialog({ name, count, limit }) {
  const dialog = $("gif-limit-dialog");
  if (!dialog) return;
  $("gif-limit-title").textContent = t("dialog.gifLimitTitle");
  $("gif-limit-body").textContent = t("dialog.gifLimitBody", { name, count, limit });
  $("gif-limit-dismiss").textContent = t("dialog.dismiss");
  if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
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
  updateSingleModeUi();
}

function fitCanvas(item) {
  const area = $("canvas-wrap");
  const ratio = Math.min((area.clientWidth - 24) / item.image.naturalWidth, (area.clientHeight - 24) / item.image.naturalHeight, 1);
  canvas.width = Math.max(1, Math.round(item.image.naturalWidth * ratio));
  canvas.height = Math.max(1, Math.round(item.image.naturalHeight * ratio));
  canvas.dataset.scale = String(ratio);
}

function ensureLayerList(item) {
  const list = $("layer-list");
  const expected = item?.detections?.length || 0;
  if (!list || !expected) return;
  const actual = list.querySelectorAll(".layer-row").length;
  if (list.classList.contains("empty-state") || actual !== expected) renderLayers();
}

function draw() {
  const item = currentFile();
  if (!item?.image) return;
  // Keep the layer stack recoverable if the component shell re-renders it.
  ensureLayerList(item);
  renderLayerThumbnails(item);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(item.image, 0, 0, canvas.width, canvas.height);
  item.detections.forEach((box) => { if (box.visible !== false) drawDetection(box); });
  $("detection-summary").textContent = item.detections.length === 1
    ? t("canvas.summaryOne", { status: item.status || t("status.pending") })
    : item.detections.length
      ? t("canvas.summaryMany", { count: item.detections.length, status: item.status || t("status.pending") })
      : t("canvas.manualHint");
}

function drawDetection(box) {
  const effect = createCensoredLayer(currentFile().image, box, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  ctx.drawImage(effect, 0, 0);
  ctx.globalAlpha = 1;
}

function tracePolygon(target, polygon) {
  target.beginPath();
  polygon.forEach(([x, y], index) => index ? target.lineTo(x, y) : target.moveTo(x, y));
  target.closePath();
}

function renderPolygon(box) {
  return box.polygon || [];
}

function polygonBounds(polygon) {
  if (!polygon?.length) return null;
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const [x, y] of polygon) {
    if (x < x1) x1 = x;
    if (y < y1) y1 = y;
    if (x > x2) x2 = x;
    if (y > y2) y2 = y;
  }
  if (!Number.isFinite(x1)) return null;
  return { x: x1, y: y1, w: Math.max(1, x2 - x1), h: Math.max(1, y2 - y1) };
}

function paintBounds(box) {
  const base = polygonBounds(box.polygon);
  let x1 = base ? base.x : Infinity, y1 = base ? base.y : Infinity;
  let x2 = base ? base.x + base.w : -Infinity, y2 = base ? base.y + base.h : -Infinity;
  for (const edit of box.brushEdits || []) {
    if (edit.mode === "erase") continue;
    const radius = edit.radius || 0;
    x1 = Math.min(x1, edit.x - radius); y1 = Math.min(y1, edit.y - radius);
    x2 = Math.max(x2, edit.x + radius); y2 = Math.max(y2, edit.y + radius);
  }
  if (!Number.isFinite(x1)) return null;
  return { x: x1, y: y1, w: Math.max(1, x2 - x1), h: Math.max(1, y2 - y1) };
}

function drawSquareBar(target, x1, y1, x2, y2, thickness) {
  const length = Math.max(1, Math.hypot(x2 - x1, y2 - y1));
  const normalX = -(y2 - y1) / length * thickness / 2;
  const normalY = (x2 - x1) / length * thickness / 2;
  target.beginPath();
  target.moveTo(x1 + normalX, y1 + normalY);
  target.lineTo(x2 + normalX, y2 + normalY);
  target.lineTo(x2 - normalX, y2 - normalY);
  target.lineTo(x1 - normalX, y1 - normalY);
  target.closePath();
  target.fill();
}

function pixelBlockSize(box, renderScale) {
  const frequency = advancedValue(box, "pixelFrequency", 100);
  return Math.max(2, Math.round((24 - frequency / 9) * renderScale));
}

function tileNoise(x, y, seed = 0) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

function drawAdvancedPixelate(target, source, width, height, block, box) {
  target.imageSmoothingEnabled = false;
  target.drawImage(source, 0, 0, source.width, source.height, 0, 0, width, height);
  const shape = box.pixelShape || "square";
  const irregularity = advancedValue(box, "pixelIrregularity", 0);
  if (shape === "square" && irregularity <= 0) return;
  const pixels = source.getContext("2d").getImageData(0, 0, source.width, source.height).data;
  const jitter = block * irregularity / 180;
  for (let row = 0, y = 0; y < height; row++, y += block) {
    for (let column = 0, x = 0; x < width; column++, x += block) {
      const sampleX = Math.min(source.width - 1, Math.floor((x + block / 2) / block));
      const sampleY = Math.min(source.height - 1, Math.floor((y + block / 2) / block));
      const offset = (sampleY * source.width + sampleX) * 4;
      target.fillStyle = `rgb(${pixels[offset]}, ${pixels[offset + 1]}, ${pixels[offset + 2]})`;
      const centerX = x + block / 2;
      const centerY = y + block / 2;
      target.beginPath();
      if (shape === "circle") {
        target.arc(centerX, centerY, block * .72, 0, Math.PI * 2);
      } else if (shape === "diamond") {
        const radius = block * .74;
        target.moveTo(centerX, centerY - radius);
        target.lineTo(centerX + radius, centerY);
        target.lineTo(centerX, centerY + radius);
        target.lineTo(centerX - radius, centerY);
        target.closePath();
      } else {
        const corner = (index) => (tileNoise(column, row, index) - .5) * jitter;
        target.moveTo(x + corner(1), y + corner(2));
        target.lineTo(x + block + corner(3), y + corner(4));
        target.lineTo(x + block + corner(5), y + block + corner(6));
        target.lineTo(x + corner(7), y + block + corner(8));
        target.closePath();
      }
      target.fill();
    }
  }
}

function createEffectLayer(image, box, width, height) {
  const effect = document.createElement("canvas");
  effect.width = width;
  effect.height = height;
  const effectCtx = effect.getContext("2d");
  const scaleX = width / Math.max(1, image.naturalWidth);
  const scaleY = height / Math.max(1, image.naturalHeight);
  const bounds = paintBounds(box);
  if ((box.mode === "lines" || box.mode === "black") && !bounds) return effect;
  const safe = bounds || { x: 0, y: 0, w: image.naturalWidth, h: image.naturalHeight };
  const boxY = safe.y * scaleY;
  const boxH = safe.h * scaleY;

  if (box.mode === "lines" || box.mode === "black") {
    effectCtx.globalAlpha = 1;
    effectCtx.fillStyle = "#000000";
    const lineCount = box.mode === "lines" ? advancedValue(box, "lineCount", 6) : 1;
    const thickness = Math.max(2, boxH * (box.mode === "lines" ? advancedValue(box, "lineThickness", 8) / 100 : .14));
    const angle = (box.mode === "lines" ? advancedValue(box, "lineAngle", -10) : -10) * Math.PI / 180;
    const paintBar = (y) => {
      const halfLength = width / 2 + thickness;
      drawSquareBar(effectCtx, width / 2 - Math.cos(angle) * halfLength, y - Math.sin(angle) * halfLength, width / 2 + Math.cos(angle) * halfLength, y + Math.sin(angle) * halfLength, thickness);
    };
    if (lineCount === 1) {
      paintBar(boxY + boxH * .5);
      return effect;
    }
    // Tile the same rhythm beyond the painted bounds so brush additions reveal lines too.
    const pad = Number(box.padding || 0);
    const topY = safe.y - pad, bottomY = safe.y + safe.h + pad;
    const spacing = boxH * .76 / (lineCount - 1);
    const firstY = boxY + boxH * .12;
    // Untouched layers keep the exact legacy bars; only edited/extended masks tile further.
    const extended = pad > 0 || (box.brushEdits || []).some((edit) => edit.mode !== "erase");
    const firstIndex = extended ? Math.ceil((topY * scaleY - firstY) / spacing) : 0;
    const lastIndex = extended ? Math.floor((bottomY * scaleY - firstY) / spacing) : lineCount - 1;
    for (let index = firstIndex; index <= lastIndex; index++) paintBar(firstY + spacing * index);
    return effect;
  }

  if (box.mode === "white") {
    effectCtx.fillStyle = "#f3f4f5";
    effectCtx.fillRect(0, 0, width, height);
    return effect;
  }

  const renderScale = (scaleX + scaleY) / 2;
  const block = box.mode === "pixelate" ? pixelBlockSize(box, renderScale) : 1;
  const source = document.createElement("canvas");
  source.width = Math.max(1, Math.round(width / block));
  source.height = Math.max(1, Math.round(height / block));
  source.getContext("2d").drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, source.width, source.height);
  if (box.mode === "pixelate") drawAdvancedPixelate(effectCtx, source, width, height, block, box);
  else {
    if (box.mode === "blur") {
      const radius = advancedValue(box, "blurRadius", 10) * advancedValue(box, "blurPasses", 1) * renderScale;
      effectCtx.filter = `blur(${Math.max(1, radius)}px)`;
    }
    effectCtx.imageSmoothingEnabled = true;
    effectCtx.drawImage(source, 0, 0, source.width, source.height, 0, 0, width, height);
  }
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
  const paintMaskShape = (target) => {
    if (polygon.length < 3) return;
    target.fillStyle = "#fff";
    tracePolygon(target, polygon);
    const inset = Number(box.padding || 0) * scale;
    if (inset > 0) {
      target.lineJoin = "round";
      target.lineWidth = inset * 2;
      target.stroke();
    }
    target.fill();
  };
  if (!box.manualBlank) {
    paintMaskShape(maskCtx);
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

canvas.addEventListener("contextmenu", (event) => event.preventDefault());

function createManualLayer(item) {
  item.detections.push({ mode: "pixelate", padding: 0, source: "manual", class: "MANUAL", polygon: [], brushEdits: [], visible: true, manualBlank: true });
  state.selected = item.detections.length - 1;
}

canvas.addEventListener("pointerdown", (event) => {
  const item = currentFile();
  if (!item?.image) return;
  if (event.button !== 0 && event.button !== 2) return;
  if (item.detections.length === 0) {
    createManualLayer(item);
    renderLayers();
    syncControls();
  }
  if (state.selected < 0 || !item.detections[state.selected]) state.selected = item.detections.length - 1;
  const rect = canvas.getBoundingClientRect();
  const scale = Number(canvas.dataset.scale || 1);
  state.brush = { mode: event.button === 2 ? "erase" : "add", boxIndex: state.selected, last: null, pointerId: event.pointerId };
  canvas.setPointerCapture(event.pointerId);
  event.preventDefault();
  brushAt((event.clientX - rect.left) / scale, (event.clientY - rect.top) / scale);
  syncControls();
});

canvas.addEventListener("pointermove", (event) => {
  if (state.brush && event.pointerId === state.brush.pointerId) {
    const rect = canvas.getBoundingClientRect();
    const scale = Number(canvas.dataset.scale || 1);
    brushLine((event.clientX - rect.left) / scale, (event.clientY - rect.top) / scale);
    event.preventDefault();
    return;
  }
});

canvas.addEventListener("pointerup", () => { state.brush = null; });
canvas.addEventListener("pointercancel", () => { state.brush = null; });
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

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

function renderAdvancedSettings(box) {
  const panel = $("style-advanced");
  if (!box) { panel.hidden = true; panel.innerHTML = ""; return; }
  panel.hidden = false;
  panel.innerHTML = advancedFieldsFor(box.mode, box);
}

function advancedFieldsFor(mode, values) {
  const title = advancedCopy(mode);
  const range = (key, labelKey, min, max, fallback, suffix = "") => {
    const value = advancedValue(values, key, fallback);
    return `<label class="advanced-setting"><span class="field-row"><span class="field-label">${escapeHtml(advancedCopy(labelKey))}</span><output>${value}${suffix}</output></span><input type="range" data-advanced-key="${key}" min="${min}" max="${max}" value="${value}" /></label>`;
  };
  let fields = "";
  if (mode === "pixelate") {
    const shape = values?.pixelShape || "square";
    fields = range("pixelFrequency", "frequency", 10, 200, 100)
      + `<label class="advanced-setting"><span class="field-row"><span class="field-label">${advancedCopy("shape")}</span></span><select data-advanced-key="pixelShape"><option value="square" ${shape === "square" ? "selected" : ""}>${advancedCopy("square")}</option><option value="circle" ${shape === "circle" ? "selected" : ""}>${advancedCopy("circle")}</option><option value="diamond" ${shape === "diamond" ? "selected" : ""}>${advancedCopy("diamond")}</option></select></label>`
      + range("pixelIrregularity", "irregularity", 0, 100, 0, "%");
  } else if (mode === "blur") {
    fields = range("blurRadius", "radius", 1, 50, 10, " px")
      + range("blurPasses", "passes", 1, 3, 1, "×");
  } else if (mode === "lines") {
    fields = range("lineCount", "count", 1, 12, 6)
      + range("lineThickness", "thickness", 2, 25, 8, "%")
      + range("lineAngle", "angle", -45, 45, -10, "°");
  } else if (mode === "glow-white") {
    fields = range("glowRadius", "haloSize", 2, 50, 20, " px")
      + range("glowStrength", "haloStrength", 10, 100, 100, "%");
  }
  return fields ? `<div class="style-advanced-heading">✦ ${escapeHtml(title)}</div>${fields}` : "";
}

function advancedSuffix(key) {
  return key === "pixelIrregularity" || key === "lineThickness" || key === "glowStrength" ? "%"
    : key === "blurRadius" || key === "glowRadius" ? " px"
    : key === "blurPasses" ? "×"
    : key === "lineAngle" ? "°" : "";
}

function renderGlobalAdvancedSettings() {
  const panel = $("global-advanced");
  if (!panel) return;
  const enabled = state.global.enabled;
  const hasLayers = state.files.some((file) => file.detections?.length);
  const fields = advancedFieldsFor(state.global.mode, state.global);
  panel.hidden = !enabled || !hasLayers || !fields;
  panel.innerHTML = enabled && fields
    ? fields.replaceAll('data-advanced-key="', 'data-global-advanced-key="')
    : "";
}

$("style-advanced").addEventListener("input", (event) => {
  const input = event.target.closest("[data-advanced-key]");
  const box = currentFile()?.detections[state.selected];
  if (!input || !box) return;
  const value = input instanceof HTMLSelectElement ? input.value : Number(input.value);
  box[input.dataset.advancedKey] = value;
  const output = input.closest(".advanced-setting")?.querySelector("output");
  if (output) output.textContent = `${value}${advancedSuffix(input.dataset.advancedKey)}`;
  draw();
});

$("global-advanced").addEventListener("input", (event) => {
  const input = event.target.closest("[data-global-advanced-key]");
  if (!input) return;
  const key = input.dataset.globalAdvancedKey;
  state.global[key] = input instanceof HTMLSelectElement ? input.value : Number(input.value);
  const output = input.closest(".advanced-setting")?.querySelector("output");
  if (output) output.textContent = `${state.global[key]}${advancedSuffix(key)}`;
  stageGlobalApply();
});

function syncControls() {
  const box = currentFile()?.detections[state.selected];
  const enabled = Boolean(box);
  const hasLayers = state.files.some((file) => file.detections?.length);
  $("add-box").disabled = !currentFile();
  $("style-select").disabled = !enabled;
  $("padding").disabled = !enabled || Boolean(box?.manualBlank);
  $("brush-size").disabled = !enabled;
  $("delete-box").disabled = !enabled;
  $("selected-badge").textContent = enabled ? t("layers.selected", { index: state.selected + 1 }) : t("layers.none");
  syncGlobalControls(hasLayers);
  document.querySelectorAll("[data-style-button]").forEach((button) => {
    button.disabled = !enabled;
    button.classList.toggle("active", enabled && button.dataset.styleButton === box.mode);
  });
  if (enabled) {
    $("style-select").value = box.mode;
    $("padding").value = box.padding;
  }
  $("padding-value").textContent = `${$("padding").value} px`;
  $("brush-size-value").textContent = `${$("brush-size").value} px`;
  renderAdvancedSettings(box);
}

function syncGlobalControls(hasLayers) {
  const toggle = $("global-enabled");
  const enabled = Boolean(toggle?.checked);
  state.global.enabled = enabled;
  const hint = $("global-hint");
  if (hint) hint.style.opacity = enabled ? "1" : ".55";
  document.querySelectorAll("[data-global-style-button]").forEach((button) => {
    button.disabled = !enabled || !hasLayers;
    button.classList.toggle("active", enabled && hasLayers && button.dataset.globalStyleButton === state.global.mode);
  });
  const padding = $("global-padding");
  if (padding) {
    padding.disabled = !enabled || !hasLayers;
    padding.value = state.global.padding;
    $("global-padding-value").textContent = `${padding.value} px`;
  }
  renderGlobalAdvancedSettings();
}

$("style-select").addEventListener("change", (event) => updateSelected("mode", event.target.value));
document.querySelectorAll("[data-style-button]").forEach((button) => button.addEventListener("click", () => {
  if (!currentFile()?.detections[state.selected]) return;
  $("style-select").value = button.dataset.styleButton;
  updateSelected("mode", button.dataset.styleButton);
  renderLayers();
  syncControls();
}));
$("padding").addEventListener("input", (event) => { $("padding-value").textContent = `${event.target.value} px`; updateSelected("padding", Number(event.target.value)); });
$("global-enabled").addEventListener("change", (event) => {
  state.global.enabled = event.target.checked;
  if (state.global.enabled) {
    stageGlobalApply();
  } else {
    // Disabling stops any in-flight propagation; already-restyled layers keep
    // their values (no destructive rollback).
    state.global.job += 1;
    state.global.queue = [];
  }
  syncControls();
});
$("global-padding").addEventListener("input", (event) => {
  state.global.padding = Number(event.target.value);
  $("global-padding-value").textContent = `${event.target.value} px`;
  stageGlobalApply();
});
document.querySelectorAll("[data-global-style-button]").forEach((button) => button.addEventListener("click", () => {
  state.global.mode = button.dataset.globalStyleButton;
  stageGlobalApply();
  syncControls();
}));
$("brush-size").addEventListener("input", (event) => { $("brush-size-value").textContent = `${event.target.value} px`; });
$("threshold").addEventListener("input", (event) => { $("threshold-value").textContent = `${event.target.value}%`; });
$("mask-threshold").addEventListener("input", (event) => { $("mask-threshold-value").textContent = `${event.target.value}%`; });
$("mask-inset").addEventListener("input", (event) => {
  const value = Number(event.target.value);
  $("mask-inset-value").textContent = `${value} px`;
  currentFile()?.detections.filter((box) => box.source === "auto").forEach((box) => { box.maskInset = value; });
  draw();
});
function updateSelected(key, value) { const box = currentFile()?.detections[state.selected]; if (!box) return; box[key] = value; draw(); }

/** Rewrite style-related fields on every layer of every queued image.
 *  Geometry (polygon, brushEdits, manualBlank, visible) is never touched,
 *  so hand-drawn work survives a global restyle. */
function applyGlobalToAllLayers() {
  let count = 0;
  for (const file of state.files) {
    for (const box of file.detections || []) {
      applyGlobalToBox(box);
      count += 1;
    }
  }
  return count;
}

function applyGlobalToBox(box) {
  box.mode = state.global.mode;
  box.padding = state.global.padding;
  box.pixelFrequency = state.global.pixelFrequency;
  box.pixelShape = state.global.pixelShape;
  box.pixelIrregularity = state.global.pixelIrregularity;
  box.blurRadius = state.global.blurRadius;
  box.blurPasses = state.global.blurPasses;
  box.lineCount = state.global.lineCount;
  box.lineThickness = state.global.lineThickness;
  box.lineAngle = state.global.lineAngle;
  box.glowRadius = state.global.glowRadius;
  box.glowStrength = state.global.glowStrength;
}

function refreshAfterGlobalApply(count) {
  renderLayers();
  syncControls();
  draw();
  renderQueue();
  setNotice(count ? t("global.applied", { count }) : t("global.empty"));
}

/** Staged propagation: preview on the current image now, rest over time.
 *
 *  Moving a global slider rewrites only the visible image synchronously so
 *  the preview feels instant. Remaining queue entries are restyled in small
 *  idle-time chunks (or ~60ms timer slices where idle callbacks are
 *  unavailable). Each new global edit cancels the previous job and restarts
 *  from the current values, so rapid slider drags never pile up work. */
function stageGlobalApply() {
  const job = ++state.global.job;
  const current = currentFile();
  if (current?.detections?.length) {
    for (const box of current.detections) applyGlobalToBox(box);
    renderLayers();
    syncControls();
    draw();
  }
  const rest = state.files.filter((file) => file !== current && file.detections?.length);
  state.global.queue = rest;
  if (!rest.length) {
    setNotice(current?.detections?.length ? t("global.previewing", { total: state.files.length }) : t("global.empty"));
    renderQueue();
    return;
  }
  setNotice(t("global.propagating", { done: 0, total: rest.length }));
  scheduleGlobalChunk(job);
}

function scheduleGlobalChunk(job) {
  const pump = (deadline) => {
    if (job !== state.global.job) return;
    const start = performance.now();
    const budget = typeof deadline?.timeRemaining === "function" ? Math.max(1, deadline.timeRemaining()) : 8;
    let processed = 0;
    while (state.global.queue.length && (processed === 0 || performance.now() - start < budget)) {
      const file = state.global.queue.shift();
      for (const box of file.detections || []) applyGlobalToBox(box);
      processed += 1;
    }
    const remaining = state.global.queue.length;
    const total = state.files.filter((file) => file.detections?.length).length;
    if (remaining) {
      setNotice(t("global.propagating", { done: total - remaining, total }));
      if (typeof requestIdleCallback === "function") requestIdleCallback(pump, { timeout: 120 });
      else setTimeout(() => pump(), 60);
    } else if (job === state.global.job) {
      renderLayers();
      syncControls();
      draw();
      renderQueue();
      setNotice(t("global.applied", { count: total }));
    }
  };
  if (typeof requestIdleCallback === "function") requestIdleCallback(pump, { timeout: 120 });
  else setTimeout(() => pump(), 60);
}

$("add-box").addEventListener("click", () => {
  const item = currentFile(); if (!item) return;
  createManualLayer(item); renderLayers(); draw(); syncControls();
});

$("delete-box").addEventListener("click", () => {
  const item = currentFile();
  if (!item || state.selected < 0) return;
  item.detections.splice(state.selected, 1);
  state.selected = Math.min(state.selected, item.detections.length - 1);
  renderLayers();
  draw();
  syncControls();
  renderQueue();
});

$("choose-single").addEventListener("click", () => $("single-image-input").click());
$("single-image-input").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  if (!mimeFromName(file.name)) { setNotice(t("notice.noImages"), "error"); return; }
  if (!state.files.length) {
    state.singleMode = true;
    state.inputHandle = null;
    state.outputHandle = null;
  }
  if (isGifFile(file)) {
    try {
      const items = await withGifExpandingNotice(file.name, (count) => expandGifIntake([file], { onFrameCount: count, onFrameTotal: count }));
      if (items.length) {
        state.queueSelection.clear();
        state.files.push(...items);
        state.selected = -1;
        state.brush = null;
        updateSingleModeUi();
        renderQueue();
        if (state.files.length) await showFile(state.files.length - 1);
        setNotice(t("notice.gifReady", { count: items.length }));
        updateSingleModeUi();
        return;
      }
    } catch (error) {
      if (error?.name !== "AbortError") setNotice(error.message, "error");
    }
  } else {
    state.queueSelection.clear();
    state.files.push(makeFile(file));
  }
  state.selected = -1;
  state.brush = null;
  clearNotice();
  updateSingleModeUi();
  renderQueue();
  if (state.files.length) await showFile(state.files.length - 1);
  updateSingleModeUi();
});

$("choose-input").addEventListener("click", async () => {
  try {
    const handle = await pickFolder();
    await startFolderLoading(handle.name);
    const files = await readImageFolder(handle);
    state.inputHandle = handle;
    state.singleMode = false;
    state.files.forEach((item) => URL.revokeObjectURL(item.url));
    state.gifs.clear();
    state.queueSelection.clear();
    const gifFiles = files.filter(isGifFile);
    const stillFiles = files.filter((file) => !isGifFile(file));
    state.files = stillFiles.map(makeFile);
    state.current = -1;
    state.selected = -1;
    renderQueue();
    // Expand GIFs after stills are visible, streaming frames into the queue
    // with the loading dialog counting progress.
    for (const file of gifFiles) {
      $("folder-loading-title").textContent = t("gif.expanding");
      $("folder-loading-name").textContent = file.name;
      updateGifLoading(0);
      let expandedCount = 0;
      let decodedTotal = 0;
      const items = await expandGifIntake([file], {
        onFrameCount: () => {
          expandedCount += 1;
          updateGifLoading(expandedCount, decodedTotal);
        },
        onFrameTotal: (total) => { decodedTotal = total; },
      });
      state.files.push(...items);
      state.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      renderQueue();
    }
    state.files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    $("input-name").textContent = state.inputHandle.name;
    $("choose-output").disabled = !writableFolder(state.inputHandle);
    $("detect-all").disabled = false;
    $("save-all").disabled = false;
    clearNotice(); updateSingleModeUi(); renderQueue();
    if (state.files.length) await showFile(0);
    else if (state.gifs.size) setNotice(t("notice.analysisDone"));
    else setNotice(t("notice.noImages"), "error");
  } catch (error) { if (error.name !== "AbortError") setNotice(error.message, "error"); }
  finally { $("folder-loading").close(); }
});

function mimeFromName(name) { const ext = name.split(".").pop().toLowerCase(); return ({ jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", bmp: "image/bmp", avif: "image/avif" })[ext] || ""; }

$("choose-output").addEventListener("click", async () => { try { state.outputHandle = await pickFolder(); $("output-name").textContent = t("toolbar.outputName", { name: state.outputHandle.name }); } catch (error) { if (error.name !== "AbortError") setNotice(error.message, "error"); } });
$("previous").addEventListener("click", () => showFile(state.current - 1));
$("next").addEventListener("click", () => showFile(state.current + 1));
$("reject").addEventListener("click", () => { if (!currentFile()) return; currentFile().status = "rejected"; renderQueue(); moveNext(); });
/** Modal progress dialog shared by every save path (single, batch, GIF). */
function updateSaveLoading(done, total) {
  const suffix = Number.isFinite(total) && total > 0 ? ` / ${total}` : "";
  $("folder-loading-count").textContent = done + suffix + " " + t("save.imagesSaved");
}
async function withSaveLoading(name, total, action) {
  await startFolderLoading(name, { title: t("save.saving") });
  updateSaveLoading(0, total);
  try {
    return await action((done) => updateSaveLoading(done, total));
  } finally {
    $("folder-loading").close();
  }
}

async function saveApprovedItems() {
  const approved = state.files.filter((file) => file.status === "approved");
  if (!approved.length) { setNotice(t("notice.saveAtLeast")); return false; }
  const label = approved.length === 1 ? approved[0].name : `${approved.length}`;
  try {
    return await withSaveLoading(label, approved.length, async (onOneSaved) => {
      let saved = 0;
      const savedGifIds = await saveApprovedGifFrames(approved, () => onOneSaved(++saved));
      const stillImages = approved.filter((file) => file.kind !== "gif-frame");
      if (stillImages.length) {
        if (!writableFolder(state.outputHandle) && !writableFolder(state.inputHandle) && stillImages.length > 1) {
          const archive = window.__censorStationArchive;
          if (!archive?.createZip) throw new Error("El empaquetador ZIP no está disponible.");
          const outputs = [];
          for (const item of stillImages) outputs.push(await createCensoredOutput(item));
          const zip = await archive.createZip(outputs);
          downloadBlob(zip, "censor-station-censored.zip");
        } else {
          for (const item of stillImages) {
            await saveItem(item);
            onOneSaved(++saved);
          }
        }
      }
      // GIFs assembled above already counted via savedGifIds callback; stills
      // counted inline. saved tracks every approved entry exactly once.
      void savedGifIds;
      setNotice(approved.length === 1 ? t("notice.savedOne") : t("notice.savedMany", { count: approved.length }));
      return true;
    });
  } catch (error) {
    setNotice(error.message, "error");
    return false;
  }
}

/** Reassemble every source GIF that has at least one approved frame. */
async function saveApprovedGifFrames(approved, onOneSaved) {
  const byGif = new Map();
  for (const item of approved) {
    if (item.kind !== "gif-frame") continue;
    if (!byGif.has(item.gifId)) byGif.set(item.gifId, []);
    byGif.get(item.gifId).push(item);
  }
  const savedGifIds = [];
  for (const [gifId, items] of byGif) {
    const record = state.gifs.get(gifId);
    if (!record) continue;
    await assembleGif(record);
    savedGifIds.push(gifId);
    // One GIF counts as the sum of its approved frames toward the dialog.
    for (let index = 0; index < items.length; index++) onOneSaved?.();
  }
  return savedGifIds;
}

/** Build the final GIF: frames with layers go censored, the rest go untouched. */
async function assembleGif(record) {
  const frames = [];
  for (const meta of record.frames) {
    const item = state.files.find((file) => file.kind === "gif-frame" && file.gifId === record.id && file.frameIndex === meta.index);
    if (item?.status === "approved" || (item?.detections?.length)) {
      const { blob } = await createCensoredOutput(item);
      frames.push({ index: meta.index, delay: meta.delay, file: meta.file || `frame-${String(meta.index).padStart(4, "0")}.png`, dataUrl: await blobToDataUrl(blob) });
    } else {
      frames.push({ index: meta.index, delay: meta.delay, file: meta.file || `frame-${String(meta.index).padStart(4, "0")}.png`, dataUrl: meta.dataUrl });
    }
  }
  let result = null;
  try {
    const response = await fetch("/api/gif/assemble", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ loop: record.loop, quality: 90, frames }),
    });
    result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || "GIF assembly failed.");
    result = { blob: dataUrlToBlob(result.dataUrl), encoder: result.encoder };
  } catch (serverError) {
    console.warn("Server GIF assembly unavailable; using the browser encoder.", serverError);
    result = null;
  }
  if (!result) {
    const tools = gifTools();
    if (!tools?.encodeGif) throw new Error("El ensamblador GIF no está disponible.");
    const encodeFrames = [];
    for (const frame of frames) {
      encodeFrames.push({ ...(await frameDataUrlToRgba(frame.dataUrl)), delay: frame.delay, index: frame.index });
    }
    encodeFrames.sort((a, b) => a.index - b.index);
    result = { blob: tools.encodeGif(encodeFrames, { width: record.width, height: record.height, loop: record.loop }), encoder: "gifenc" };
  }
  await writeGifOutput(record, result.blob);
  record.savedEncoder = result.encoder;
}

function frameDataUrlToRgba(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        const canvasElement = document.createElement("canvas");
        canvasElement.width = image.naturalWidth;
        canvasElement.height = image.naturalHeight;
        const context = canvasElement.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        resolve({ rgba: new Uint8ClampedArray(context.getImageData(0, 0, canvasElement.width, canvasElement.height).data) });
      } catch (error) { reject(error); }
    };
    image.onerror = () => reject(new Error("No se pudo leer un frame del GIF."));
    image.src = dataUrl;
  });
}

async function writeGifOutput(record, blob) {
  const name = `${record.name.replace(/\.[^.]+$/, "")}_censored.gif`;
  if (writableFolder(state.outputHandle) || writableFolder(state.inputHandle)) {
    const directory = state.outputHandle || await state.inputHandle.getDirectoryHandle("censored", { create: true });
    const handle = await directory.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } else {
    downloadBlob(blob, name);
  }
}

$("approve").addEventListener("click", async () => {
  const item = currentFile();
  if (!item) return;
  item.status = "approved";
  renderQueue();
  updateProgress();
  const hasPendingImages = state.files.some((file) => file.status !== "approved" && file.status !== "rejected");
  if (!hasPendingImages) {
    if (window.confirm(t("notice.reviewComplete"))) await saveApprovedItems();
    else setNotice(t("notice.saveLater"));
  }
  await moveNext();
});
$("save-all").addEventListener("click", () => saveApprovedItems());
$("approve-all").addEventListener("click", async () => {
  if (state.analysis.active) return;
  const pending = state.files.filter((file) => file.status !== "approved" && file.status !== "rejected");
  if (!pending.length) return;
  // Mark everything approved in one step, then run the normal save flow
  // immediately (per user choice: approve + save now, no second click).
  for (const file of pending) file.status = "approved";
  renderQueue();
  updateProgress();
  updateSingleModeUi();
  await saveApprovedItems();
});
$("save-single").addEventListener("click", async () => {
  const item = currentFile();
  if (!item) return;
  try {
    const record = gifRecordFor(item);
    const label = record ? record.name : item.name;
    await withSaveLoading(label, 1, async (onOneSaved) => {
      if (record) {
        await assembleGif(record);
      } else {
        await saveItem(item);
      }
      item.status = "approved";
      renderQueue();
      onOneSaved(1);
      setNotice(t("notice.savedOne"));
    });
  } catch (error) {
    setNotice(error.message, "error");
  }
});
$("detect-all").addEventListener("click", () => detectAll());
$("detect-single").addEventListener("click", () => detectCurrent());
if ($("unload-model")) {
  $("unload-model").addEventListener("click", async () => {
    if (state.analysis.active) return;
    try {
      await window.__censorStationWebDetector?.unload?.();
    } catch (error) {
      console.warn("Could not unload the browser detector.", error);
    }
    let serverOk = true;
    try {
      const response = await fetch("/api/model/unload", { method: "POST" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) throw new Error(result.message || "Unload failed.");
    } catch (error) {
      serverOk = false;
      console.warn("Server model unload unavailable; the browser session was still released.", error);
    }
    setNotice(t(serverOk ? "notice.modelUnloaded" : "notice.modelUnloadServerDown"));
  });
}

/** Analyze one queue entry: the image currently shown in the editor. */
async function detectCurrent() {
  const item = currentFile();
  if (!item || state.analysis.active) return;
  startAnalysisProgress(1);
  updateSingleModeUi();
  setNotice(t("notice.analyzingImage"));
  try {
    startAnalysisStep(1, 0);
    await detectFile(item);
    updateAnalysisProgress(1, 1);
    if (item.detections.length && state.selected < 0) state.selected = 0;
    renderLayers();
    syncControls();
    draw();
    renderQueue();
    setNotice(state.analysis.cancelRequested ? t("analysis.cancelledCurrent") : t("notice.analysisImageDone"));
  } catch (error) {
    setNotice(error.message, "error");
  } finally {
    finishAnalysisProgress();
    updateSingleModeUi();
  }
}

async function detectAll() {
  if (!state.files.length || state.analysis.active) return;
  const selectedCount = [...state.queueSelection].filter((index) => state.files[index]).length;
  const useSelection = selectedCount > 1;
  const targets = queueAnalysisTargets();
  const total = targets.length;
  startAnalysisProgress(total);
  updateSingleModeUi();
  setNotice(t(useSelection ? "queue.analyzingSelection" : state.singleMode ? "notice.analyzingImage" : "notice.analyzing", { count: total }));
  const failures = [];
  let cancelled = false;
  try {
    let done = 0;
    for (const index of targets) {
      const item = state.files[index];
      startAnalysisStep(done + 1, done);
      try {
        await detectFile(item, { throwOnError: true });
      } catch (error) {
        failures.push({ item, error });
      }
      done += 1;
      if (state.current === index) {
        state.selected = item.detections.length
          ? Math.min(Math.max(state.selected, 0), item.detections.length - 1)
          : -1;
        renderLayers();
        syncControls();
        draw();
      }
      renderQueue();
      updateAnalysisProgress(done, done);
      if (state.analysis.cancelRequested && done < total) {
        cancelled = true;
        break;
      }
    }
    for (const [gifId, record] of state.gifs) {
      const frames = state.files.filter((item) => item.kind === "gif-frame" && item.gifId === gifId);
      record.analyzed = frames.length > 0 && frames.every((frame) => frame.analyzed);
    }
    if (state.files.length && state.current < 0) await showFile(0);
    for (const { item, error } of failures) console.warn(`Could not analyze ${item.name}.`, error);
    setNotice(cancelled
      ? t("analysis.cancelled", { completed: done })
      : failures.length
      ? t("queue.analysisPartial", { updated: total - failures.length, failed: failures.length })
      : useSelection
        ? t("queue.selectionAnalysisDone", { count: total })
        : t(state.singleMode ? "notice.analysisImageDone" : "notice.analysisDone"));
  } catch (error) {
    setNotice(error.message, "error");
  } finally {
    finishAnalysisProgress();
    updateSingleModeUi();
  }
}

/** Raw detector call shared by full analysis and selected-queue analysis.
 *  Returns normalized detection objects without touching queue state. */
async function fetchDetections(image, { threshold, maskThreshold, classes } = {}) {
  const blob = await new Promise((resolve) => canvasToBlob(image, resolve));
  const dataUrl = await blobToDataUrl(blob);
  let result;
  const webDetector = window.__censorStationWebDetector;
  if (webDetector?.isAvailable()) {
    try {
      result = { ok: true, detections: (await webDetector.detect(image, { threshold, classes, maskThreshold })).detections };
    } catch (webError) {
      console.warn("Browser detector unavailable; falling back to the local server.", webError);
    }
  }
  if (!result) {
    const response = await fetch("/api/detect", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ dataUrl, mime: blob.type, threshold, classes }) });
    result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || result.hint || "Detector no disponible.");
  }
  return (result.detections || []).map((detection) => ({
    polygon: detection.polygon || [],
    mode: "pixelate", padding: Number($("padding").value), maskInset: Number($("mask-inset").value), source: "auto", class: detection.class, score: detection.score, brushEdits: [], visible: true,
  }));
}

async function detectFile(item, { throwOnError = false } = {}) {
  await loadImage(item);
  try {
    item.detections = await fetchDetections(item.image, {
      threshold: Number($("threshold").value) / 100,
      maskThreshold: Number($("mask-threshold").value) / 100,
      classes: selectedClasses(),
    });
  } catch (error) {
    if (throwOnError) throw error;
    if (!item.analyzed) setNotice(t("notice.detectorUnavailable", { message: error.message }), "error");
  }
  item.analyzed = true;
}

removeLegacyQueueSelectionUi();

function canvasToBlob(image, callback) { const temporary = document.createElement("canvas"); temporary.width = image.naturalWidth; temporary.height = image.naturalHeight; temporary.getContext("2d").drawImage(image, 0, 0); temporary.toBlob(callback, "image/jpeg", .93); }
function blobToDataUrl(blob) { return new Promise((resolve) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(blob); }); }
function dataUrlToBlob(dataUrl) { const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUrl || ""); if (!match) throw new Error("El optimizador devolvió una imagen inválida."); const binary = atob(match[2]); const bytes = new Uint8Array(binary.length); for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index); return new Blob([bytes], { type: match[1] }); }

async function createCensoredOutput(item) {
  await loadImage(item);
  const output = document.createElement("canvas"); output.width = item.image.naturalWidth; output.height = item.image.naturalHeight; const outputCtx = output.getContext("2d"); outputCtx.drawImage(item.image, 0, 0);
  for (const box of item.detections) if (box.visible !== false) renderSavedBox(outputCtx, item.image, box);
  if (item.kind === "gif-frame") {
    const blob = await new Promise((resolve) => output.toBlob(resolve, "image/png"));
    const name = `${item.gifName.replace(/\.[^.]+$/, "")}_f${String(item.frameIndex).padStart(4, "0")}_censored.png`;
    return { blob, name };
  }
  const blob = await new Promise((resolve) => output.toBlob(resolve, mimeFromName(item.name) || "image/jpeg", .95));
  const name = `${item.name.replace(/(\.[^.]+)?$/, "")}_censored${item.name.match(/\.[^.]+$/)?.[0] || ".jpg"}`;
  return { blob, name };
}

async function saveItem(item) {
  const { blob, name } = await createCensoredOutput(item);
  if (writableFolder(state.outputHandle) || writableFolder(state.inputHandle)) {
    const directory = state.outputHandle || await state.inputHandle.getDirectoryHandle("censored", { create: true });
    const handle = await directory.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } else downloadBlob(blob, name);
}

function createCensoredLayer(image, box, width, height) {
  const scale = width / image.naturalWidth;
  const mask = createMaskCanvas(box, width, height, scale);
  if (box.mode === "glow-white") {
    const effect = document.createElement("canvas");
    effect.width = width;
    effect.height = height;
    const target = effect.getContext("2d");
    // Use the finished mask, including brush additions and erasures.
    // White source-in also normalizes the RGB of the erased mask edges.
    const maskCtx = mask.getContext("2d");
    maskCtx.globalCompositeOperation = "source-in";
    maskCtx.fillStyle = "#fff";
    maskCtx.fillRect(0, 0, width, height);
    const radius = advancedValue(box, "glowRadius", 20) * scale;
    target.globalAlpha = advancedValue(box, "glowStrength", 100) / 100;
    target.filter = `blur(${radius}px)`;
    target.drawImage(mask, 0, 0);
    target.drawImage(mask, 0, 0);
    target.filter = `blur(${radius * .4}px)`;
    target.drawImage(mask, 0, 0);
    target.filter = "none";
    // Restore a fully opaque core after drawing the exterior halo.
    target.globalAlpha = 1;
    target.drawImage(mask, 0, 0);
    return effect;
  }
  const effect = createEffectLayer(image, box, width, height);
  const effectCtx = effect.getContext("2d");
  effectCtx.globalCompositeOperation = "destination-in";
  effectCtx.drawImage(mask, 0, 0);
  return effect;
}

function renderSavedBox(outputCtx, image, box) {
  outputCtx.drawImage(createCensoredLayer(image, box, image.naturalWidth, image.naturalHeight), 0, 0);
}

async function moveNext() { updateProgress(); if (state.current < state.files.length - 1) await showFile(state.current + 1); }
function updateProgress() { const done = state.files.filter((file) => file.status === "approved").length; const progressDetail = $("progress-detail"); const progressBar = $("progress-bar"); const progressLabel = $("progress-label"); if (progressDetail) progressDetail.textContent = t("progress.detail", { count: done, total: state.files.length }); if (progressBar) progressBar.style.width = state.files.length ? `${done / state.files.length * 100}%` : "0%"; if (progressLabel) progressLabel.textContent = state.files.length ? (done === 1 ? t("progress.one") : t("progress.many", { count: done })) : t("progress.none"); }

function optimizerCurrentFile() { return state.optimizer.files[state.optimizer.current]; }
function setOptimizerNotice(message, type = "") { const notice = $("optimizer-notice"); notice.textContent = message; notice.className = `notice ${type}`.trim(); }
function clearOptimizerNotice() { $("optimizer-notice").className = "notice hidden"; }
function makeOptimizerFile(file) { return { file, name: file.name, url: URL.createObjectURL(file), image: null, optimizedBlob: null, optimizedImage: null, optimizedUrl: "", optimizedSize: 0, optimizedMime: "", optimizedExtension: "" }; }
function formatBytes(bytes) { if (!bytes) return "—"; if (bytes < 1024) return `${bytes} B`; if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`; return `${(bytes / 1024 / 1024).toFixed(2)} MB`; }
function optimizerStatus(item) { return item.optimizedBlob ? t("optimizer.ready") : t("optimizer.pending"); }

async function readImageFolder(handle) {
  const files = [];
  for await (const entry of handle.values()) {
    if (entry.kind !== "file" || !mimeFromName(entry.name)) continue;
    files.push(await entry.getFile());
    updateFolderLoading(files.length);
    if (files.length % 20 === 0) await new Promise(resolve => setTimeout(resolve, 0));
  }
  return files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

function renderOptimizerQueue() {
  const list = $("optimizer-file-list");
  $("optimizer-count").textContent = String(state.optimizer.files.length);
  if (!state.optimizer.files.length) { list.className = "queue-list empty-state"; list.textContent = t("optimizer.empty"); return; }
  list.className = "queue-list";
  list.innerHTML = state.optimizer.files.map((file, index) => `
    <div class="queue-item ${index === state.optimizer.current ? "active" : ""}" data-optimizer-index="${index}">
      <img class="queue-thumb" src="${file.url}" alt="" />
      <div><div class="queue-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div><div class="queue-status ${file.optimizedBlob ? "approved" : ""}">${optimizerStatus(file)}</div></div>
    </div>`).join("");
  list.querySelectorAll("[data-optimizer-index]").forEach((item) => item.addEventListener("click", () => showOptimizerFile(Number(item.dataset.optimizerIndex))));
}

async function loadOptimizerImage(item) {
  if (item.image) return item.image;
  const image = new Image();
  image.src = item.url;
  await image.decode();
  item.image = image;
  return image;
}

function drawOptimizerCanvas(target, image) {
  const frame = target.parentElement;
  const ratio = Math.min((frame.clientWidth - 18) / image.naturalWidth, (frame.clientHeight - 28) / image.naturalHeight, 1);
  target.width = Math.max(1, Math.round(image.naturalWidth * ratio));
  target.height = Math.max(1, Math.round(image.naturalHeight * ratio));
  target.getContext("2d").clearRect(0, 0, target.width, target.height);
  target.getContext("2d").drawImage(image, 0, 0, target.width, target.height);
  target.hidden = false;
}

function canvasBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error(`El navegador no puede codificar ${mime}.`)), mime, quality);
  });
}

function optimizerOutputDetails(item, requestedFormat, lossless) {
  const sourceExtension = item.name.split(".").pop().toLowerCase();
  const sourceFormat = sourceExtension === "jpg" || sourceExtension === "jpeg" ? "jpeg" : ["png", "webp"].includes(sourceExtension) ? sourceExtension : "webp";
  const format = lossless ? "png" : requestedFormat === "original" ? sourceFormat : requestedFormat;
  return format === "png" ? { format, mime: "image/png", extension: ".png" }
    : format === "jpeg" ? { format, mime: "image/jpeg", extension: ".jpg" }
      : { format: "webp", mime: "image/webp", extension: ".webp" };
}

async function optimizeInBrowser(item) {
  const image = await loadOptimizerImage(item);
  const output = document.createElement("canvas");
  output.width = image.naturalWidth;
  output.height = image.naturalHeight;
  const context = output.getContext("2d");
  const details = optimizerOutputDetails(item, $("optimizer-format").value, $("optimizer-lossless").checked);
  const sourceMime = item.file.type || mimeFromName(item.name);
  if (details.format === "jpeg" && ["image/png", "image/gif", "image/webp"].includes(sourceMime)) {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, output.width, output.height);
  }
  context.drawImage(image, 0, 0);
  const quality = Math.min(95, Math.max(1, Number($("optimizer-quality").value))) / 100;
  let blob = await canvasBlob(output, details.mime, details.format === "png" ? undefined : quality);
  let mime = details.mime;
  let extension = details.extension;
  if ($("optimizer-lossless").checked && details.format === "png" && sourceMime === "image/png" && blob.size >= item.file.size) {
    blob = item.file;
    mime = "image/png";
    extension = ".png";
  }
  return { blob, mime, extension };
}

async function optimizeWithServer(item) {
  const sourceDataUrl = await blobToDataUrl(item.file);
  const response = await fetch("/api/optimize", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      dataUrl: sourceDataUrl,
      mime: item.file.type || mimeFromName(item.name),
      format: $("optimizer-format").value,
      quality: Number($("optimizer-quality").value),
      lossless: $("optimizer-lossless").checked,
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.message || result.hint || "El optimizador no está disponible.");
  return { blob: dataUrlToBlob(result.dataUrl), mime: result.mime, extension: result.extension };
}

async function refreshOptimizerPreview() {
  const item = optimizerCurrentFile();
  if (!item) { updateOptimizerStats(); return; }
  const token = ++state.optimizer.previewToken;
  const image = await loadOptimizerImage(item);
  drawOptimizerCanvas(optimizerOriginalCanvas, image);
  $("optimizer-empty-preview").hidden = true;
  try {
    let result;
    try {
      result = await optimizeInBrowser(item);
    } catch (browserError) {
      console.warn("Browser optimizer unavailable; falling back to the local server.", browserError);
      result = await optimizeWithServer(item);
    }
    const blob = result.blob;
    if (token !== state.optimizer.previewToken) return;
    item.optimizedBlob = blob;
    item.optimizedSize = blob.size;
    item.optimizedMime = result.mime;
    item.optimizedExtension = result.extension;
    if (item.optimizedUrl) URL.revokeObjectURL(item.optimizedUrl);
    item.optimizedUrl = URL.createObjectURL(blob);
    const optimizedImage = new Image();
    optimizedImage.src = item.optimizedUrl;
    await optimizedImage.decode();
    item.optimizedImage = optimizedImage;
    drawOptimizerCanvas(optimizerOptimizedCanvas, optimizedImage);
    renderOptimizerQueue();
    updateOptimizerStats();
  } catch (error) {
    if (token === state.optimizer.previewToken) setOptimizerNotice(t("optimizer.error", { name: item.name, message: error.message }), "error");
  }
}

function updateOptimizerStats() {
  const item = optimizerCurrentFile();
  if (!item) {
    $("optimizer-original-size").textContent = "—";
    $("optimizer-optimized-size").textContent = "—";
    $("optimizer-reduction").textContent = "—";
    $("optimizer-dimensions").textContent = "—";
    return;
  }
  $("optimizer-original-size").textContent = formatBytes(item.file.size);
  $("optimizer-optimized-size").textContent = item.optimizedSize ? formatBytes(item.optimizedSize) : "—";
  $("optimizer-reduction").textContent = item.optimizedSize ? `${((1 - item.optimizedSize / item.file.size) * 100).toFixed(1)}%` : "—";
  $("optimizer-dimensions").textContent = item.image ? `${item.image.naturalWidth} × ${item.image.naturalHeight}` : "—";
}

function syncOptimizerControls() {
  const lossless = $("optimizer-lossless").checked;
  const png = $("optimizer-format").value === "png";
  $("optimizer-format").disabled = lossless;
  $("optimizer-quality").disabled = lossless || png;
  $("optimizer-quality-value").textContent = lossless || png ? "100%" : `${$("optimizer-quality").value}%`;
  $("optimizer-process").disabled = !state.optimizer.files.length;
  $("optimizer-save-all").disabled = !state.optimizer.files.some((item) => item.optimizedBlob);
}

function invalidateOptimizerResults() {
  state.optimizer.files.forEach((item) => {
    item.optimizedBlob = null;
    item.optimizedImage = null;
    item.optimizedSize = 0;
    item.optimizedMime = "";
    item.optimizedExtension = "";
    if (item.optimizedUrl) URL.revokeObjectURL(item.optimizedUrl);
    item.optimizedUrl = "";
  });
  optimizerOptimizedCanvas.hidden = true;
  $("optimizer-empty-preview").hidden = false;
  renderOptimizerQueue();
  updateOptimizerStats();
}

async function showOptimizerFile(index) {
  if (index < 0 || index >= state.optimizer.files.length) return;
  state.optimizer.current = index;
  const item = optimizerCurrentFile();
  $("optimizer-current-name").textContent = item.name;
  $("optimizer-current-index").textContent = `${index + 1} / ${state.optimizer.files.length}`;
  optimizerOptimizedCanvas.hidden = true;
  $("optimizer-empty-preview").hidden = false;
  await refreshOptimizerPreview();
  renderOptimizerQueue();
  syncOptimizerControls();
}

async function optimizeAll() {
  if (!state.optimizer.files.length) return;
  $("optimizer-process").disabled = true;
  setOptimizerNotice(t("optimizer.processing", { current: 0, total: state.optimizer.files.length }));
  for (let index = 0; index < state.optimizer.files.length; index++) {
    state.optimizer.current = index;
    await refreshOptimizerPreview();
    setOptimizerNotice(t("optimizer.processing", { current: index + 1, total: state.optimizer.files.length }));
  }
  renderOptimizerQueue();
  syncOptimizerControls();
  setOptimizerNotice(t("optimizer.completed", { count: state.optimizer.files.length }));
}

function optimizerFileName(item) {
  const stem = item.name.replace(/\.[^.]+$/, "");
  return `${stem}_optimized${item.optimizedExtension || ".webp"}`;
}

async function saveOptimizerFile(item) {
  if (!item.optimizedBlob) {
    const index = state.optimizer.files.indexOf(item);
    state.optimizer.current = index;
    await refreshOptimizerPreview();
  }
  const name = optimizerFileName(item);
  if (writableFolder(state.optimizer.outputHandle) || writableFolder(state.optimizer.inputHandle)) {
    const directory = state.optimizer.outputHandle || await state.optimizer.inputHandle.getDirectoryHandle("optimized", { create: true });
    const handle = await directory.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    await writable.write(item.optimizedBlob);
    await writable.close();
  } else {
    const url = URL.createObjectURL(item.optimizedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

async function saveOptimizerCollection() {
  const files = state.optimizer.files;
  if (writableFolder(state.optimizer.outputHandle) || writableFolder(state.optimizer.inputHandle) || files.length === 1) {
    for (const item of files) await saveOptimizerFile(item);
    return;
  }
  const archive = window.__censorStationArchive;
  if (!archive?.createZip) throw new Error("El empaquetador ZIP no está disponible.");
  const zip = await archive.createZip(files.map((item) => ({ name: optimizerFileName(item), blob: item.optimizedBlob })));
  downloadBlob(zip, "censor-station-optimized.zip");
}

$("optimizer-format").addEventListener("change", () => { invalidateOptimizerResults(); syncOptimizerControls(); refreshOptimizerPreview(); });
$("optimizer-quality").addEventListener("input", () => { invalidateOptimizerResults(); syncOptimizerControls(); refreshOptimizerPreview(); });
$("optimizer-lossless").addEventListener("change", () => { invalidateOptimizerResults(); syncOptimizerControls(); refreshOptimizerPreview(); });
$("optimizer-choose-input").addEventListener("click", async () => {
  try {
    const handle = await pickFolder();
    await startFolderLoading(handle.name);
    const files = await readImageFolder(handle);
    state.optimizer.inputHandle = handle;
    state.optimizer.files.forEach((item) => { URL.revokeObjectURL(item.url); if (item.optimizedUrl) URL.revokeObjectURL(item.optimizedUrl); });
    state.optimizer.files = files.map(makeOptimizerFile);
    state.optimizer.current = -1;
    $("optimizer-input-name").textContent = state.optimizer.inputHandle.name;
    $("optimizer-choose-output").disabled = !state.optimizer.files.length || !writableFolder(state.optimizer.inputHandle);
    clearOptimizerNotice();
    renderOptimizerQueue();
    syncOptimizerControls();
    if (state.optimizer.files.length) await showOptimizerFile(0); else setOptimizerNotice(t("notice.noImages"), "error");
  } catch (error) { if (error.name !== "AbortError") setOptimizerNotice(error.message, "error"); }
  finally { $("folder-loading").close(); }
});
$("optimizer-choose-output").addEventListener("click", async () => { try { state.optimizer.outputHandle = await pickFolder(); $("optimizer-output-name").textContent = t("toolbar.outputName", { name: state.optimizer.outputHandle.name }); } catch (error) { if (error.name !== "AbortError") setOptimizerNotice(error.message, "error"); } });
$("optimizer-process").addEventListener("click", () => optimizeAll());
$("optimizer-save-all").addEventListener("click", async () => {
  if (!state.optimizer.files.length) return;
  try {
    if (state.optimizer.files.some((item) => !item.optimizedBlob)) await optimizeAll();
    await saveOptimizerCollection();
    setOptimizerNotice(state.optimizer.files.length === 1 ? t("optimizer.savedOne") : t("optimizer.savedMany", { count: state.optimizer.files.length }));
  } catch (error) { setOptimizerNotice(error.message, "error"); }
});

window.addEventListener("resize", () => { if (currentFile()?.image) { fitCanvas(currentFile()); draw(); } });
if (Number($("threshold").value) === 35) {
  $("threshold").value = "85";
  $("threshold-value").textContent = "85%";
}
applyLanguage();
syncControls();

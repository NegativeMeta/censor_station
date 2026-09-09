export function SettingsPanel() {
  return <aside className="settings card">
    <div className="panel-heading"><div><h2 data-i18n="layers.title">LAYERS</h2></div><span id="selected-badge" className="selection-badge" data-i18n="layers.none">Ninguna</span></div>
    <div className="settings-body">
      <label className="field-label layer-heading" data-i18n="layers.stack">LAYER STACK</label>
      <div id="layer-list" className="layer-list empty-state" data-i18n="layers.empty">Analiza una imagen para crear capas.</div>
      <div className="selection-actions"><button id="add-box" className="button secondary" data-i18n-title="layers.add" disabled><span className="button-icon icon-plus" aria-hidden="true" /><span className="button-label" data-i18n="layers.add">Añadir capa</span></button><button id="delete-box" className="button ghost-danger" data-i18n-title="layers.delete" disabled><span className="button-icon icon-trash" aria-hidden="true" /><span className="button-label" data-i18n="layers.delete">Eliminar</span></button></div>
      <div className="wing-divider" aria-hidden="true"><span>♥</span></div>
      <div className="settings-section-heading censor-type-heading"><span className="eyebrow" data-i18n="censor.type">CENSOR TYPE</span><strong>✦ // ✦</strong></div>
      <label className="field-label" htmlFor="style-select" data-i18n="censor.style">Estilo de la selección</label>
      <div className="style-cards" role="group" data-i18n-aria-label="censor.style">
        <button type="button" className="style-card style-pixel" data-style-button="pixelate" disabled><span className="style-icon button-icon icon-pixel" aria-hidden="true" /><strong data-i18n="censor.pixelate">PIXELATE</strong><b>+</b></button>
        <button type="button" className="style-card style-blur" data-style-button="blur" disabled><span className="style-icon button-icon icon-blur" aria-hidden="true" /><strong data-i18n="censor.blur">BLUR</strong><b>+</b></button>
        <button type="button" className="style-card style-lines" data-style-button="lines" disabled><span className="style-icon button-icon icon-lines" aria-hidden="true" /><strong data-i18n="censor.lines">LÍNEAS</strong><b>+</b></button>
        <button type="button" className="style-card style-glow" data-style-button="glow-white" disabled><span className="style-icon button-icon icon-glow" aria-hidden="true" /><strong data-i18n="censor.glowWhite">BLANCO GLOW</strong><b>+</b></button>
      </div>
      <select id="style-select" className="select style-select-hidden" disabled aria-hidden="true" tabIndex={-1}>
        <option value="pixelate" data-i18n="censor.pixelateOption">Píxeles</option><option value="blur" data-i18n="censor.blurOption">Desenfoque</option><option value="lines" data-i18n="censor.linesOption">Múltiples líneas negras</option><option value="glow-white" data-i18n="censor.glowWhiteOption">Blanco resplandeciente</option>
      </select>
      <section id="style-advanced" className="style-advanced" hidden aria-live="polite" />
      <div className="divider" />
      <div className="settings-section-heading options-heading"><span className="eyebrow" data-i18n="controls.optionsTitle">OPTIONS</span><strong>✦ // ✦</strong></div>
      <div className="field-row"><label className="field-label" htmlFor="padding" data-i18n="controls.padding">Margen de seguridad</label><output id="padding-value">8 px</output></div>
      <input id="padding" type="range" min="0" max="60" value="8" disabled />
      <div className="divider" />
      <div className="field-row"><label className="field-label" htmlFor="brush-size" data-i18n="controls.brushSize">Tamaño del pincel</label><output id="brush-size-value">24 px</output></div>
      <input id="brush-size" type="range" min="4" max="120" value="24" disabled />
      <p className="help" data-i18n="controls.brushHelp">Con el botón izquierdo pintas censura; con el derecho la borras dentro de la zona seleccionada.</p>
      <div className="divider" />
      <div className="field-row"><label className="field-label" htmlFor="threshold" data-i18n="controls.threshold">Umbral automático</label><output id="threshold-value">35%</output></div>
      <input id="threshold" type="range" min="10" max="90" value="35" />
      <p className="help" data-i18n="controls.thresholdHelp">Baja el umbral para encontrar más zonas; súbelo para reducir falsos positivos.</p>
      <div className="divider parts-divider" />
      <section className="censor-parts">
        <label className="field-label" data-i18n="classes.title">Partes a censurar</label>
        <div id="class-options" className="check-grid" />
        <p className="help" data-i18n="classes.help">Activa o desactiva las partes detectables antes de analizar la carpeta.</p>
      </section>
    </div>
    <div className="review-actions settings-actions"><button id="reject" className="button danger-outline" data-i18n-title="actions.reject" data-i18n-aria-label="actions.reject" disabled><span className="button-icon icon-reject" aria-hidden="true" /><span className="button-label" data-i18n="actions.rejectShort">Rechazar</span></button><button id="approve" className="button approve" data-i18n-title="actions.approve" data-i18n-aria-label="actions.approve" disabled><span className="button-icon icon-approve" aria-hidden="true" /><span className="button-label approve-line">-----</span></button></div>
  </aside>;
}

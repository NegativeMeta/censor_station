import { useState } from "preact/hooks";

function Accordion({ id, title, titleKey, children, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <section id={id} className={`settings-accordion${open ? " open" : ""}${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        className="settings-section-heading accordion-trigger"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="eyebrow" data-i18n={titleKey}>{title}</span>
        <span className="accordion-chevron" aria-hidden="true">▾</span>
      </button>
      <div className="accordion-panel" id={`${id}-panel`} aria-hidden={!open}>
        <div className="accordion-panel-inner">{children}</div>
      </div>
    </section>
  );
}

function GlobalApplyToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => {
    const next = !on;
    const checkbox = document.getElementById("global-enabled");
    if (checkbox) {
      checkbox.checked = next;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setOn(next);
  };
  return <>
    <input id="global-enabled" type="checkbox" hidden checked={on} onChange={() => {}} />
    <button type="button" className={`style-card global-apply-toggle${on ? " active" : ""}`}
      aria-pressed={on} onClick={toggle} data-i18n-title="global.help"
      title="Enable it and these values apply to every layer of every queued image. Changing here rewrites each layer; brush strokes and drawn areas stay untouched.">
      <span className="style-icon button-icon icon-queue-global" aria-hidden="true" />
      <strong>GLOBAL</strong>
    </button>
  </>;
}

export function SettingsPanel() {
  return <aside className="settings card">
    <div className="panel-heading"><div><h2 data-i18n="layers.title">SETTINGS</h2></div><span id="selected-badge" className="selection-badge" data-i18n="layers.none">Ninguna</span></div>
    <div className="settings-body">
      <Accordion id="layers-accordion" titleKey="layers.stack" title="LAYER STACK">
        <div id="layer-list" className="layer-list empty-state" data-i18n="layers.empty">Analiza una imagen para crear capas.</div>
        <div className="selection-actions"><button id="add-box" className="button secondary" data-i18n-title="layers.add" disabled><span className="button-icon icon-plus" aria-hidden="true" /><span className="button-label" data-i18n="layers.add">Añadir capa</span></button><button id="delete-box" className="button ghost-danger" data-i18n-title="layers.delete" disabled><span className="button-icon icon-trash" aria-hidden="true" /><span className="button-label" data-i18n="layers.delete">Eliminar</span></button></div>
      </Accordion>

      <Accordion id="censor-settings" titleKey="censor.settings" title="CENSOR SETTINGS">
      <div id="options" className="censor-settings-group">
        <label className="field-label censor-settings-label" data-i18n="controls.optionsTitle">OPTIONS</label>
        <div className="field-row"><label className="field-label" htmlFor="padding" data-i18n="controls.padding">Margen de seguridad</label><output id="padding-value">8 px</output></div>
        <input id="padding" type="range" min="0" max="60" value="8" disabled />
        <div className="field-row"><label className="field-label" htmlFor="brush-size" data-i18n="controls.brushSize" data-i18n-title="controls.brushHelp" title="Left click paints censorship; if there are no layers, the first click creates one automatically. Right click erases inside the selected area.">Tamaño del pincel</label><output id="brush-size-value">24 px</output></div>
        <input id="brush-size" type="range" min="4" max="120" value="24" disabled />
        <div className="field-row"><label className="field-label" htmlFor="threshold" data-i18n="controls.threshold">Umbral automático</label><output id="threshold-value">85%</output></div>
        <input id="threshold" type="range" min="10" max="90" value="85" />
        <p className="help" data-i18n="controls.thresholdHelp">¿Se le escapa alguna zona? Baja el umbral. ¿Marca de más? Súbelo.</p>
        <div hidden>
          <div className="field-row"><label className="field-label" htmlFor="mask-threshold" data-i18n="controls.maskThreshold">Precisión del contorno</label><output id="mask-threshold-value">90%</output></div>
          <input id="mask-threshold" type="range" min="45" max="90" value="90" />
          <p className="help" data-i18n="controls.maskThresholdHelp">Ciñe el borde al cuerpo subiendo el valor. Reanaliza para aplicarlo.</p>
          <div className="field-row"><label className="field-label" htmlFor="mask-inset" data-i18n="controls.maskInset">Ajuste interior</label><output id="mask-inset-value">1 px</output></div>
          <input id="mask-inset" type="range" min="0" max="4" step="1" value="1" />
          <p className="help" data-i18n="controls.maskInsetHelp">Recorta un poco el borde de las máscaras automáticas.</p>
        </div>
      </div>
      <div id="censor-parts" className="censor-settings-group">
        <label className="field-label censor-settings-label" data-i18n="classes.title">Partes a censurar</label>
        <div id="class-options" className="check-grid" />
        <p className="help" data-i18n="classes.help">Activa o desactiva las partes detectables antes de analizar la carpeta.</p>
      </div>
      <div id="censor-type" className="censor-settings-group">
        <label className="field-label censor-settings-label" data-i18n="censor.type">CENSOR TYPE</label>
        <label className="field-label" htmlFor="style-select" data-i18n="censor.style">Estilo de la selección</label>
        <div className="style-cards" role="group" data-i18n-aria-label="censor.style">
          <button type="button" className="style-card style-pixel" data-style-button="pixelate"><span className="style-icon button-icon icon-pixel" aria-hidden="true" /><strong data-i18n="censor.pixelate">PIXELATE</strong><b>+</b></button>
          <button type="button" className="style-card style-blur" data-style-button="blur"><span className="style-icon button-icon icon-blur" aria-hidden="true" /><strong data-i18n="censor.blur">BLUR</strong><b>+</b></button>
          <button type="button" className="style-card style-lines" data-style-button="lines"><span className="style-icon button-icon icon-lines" aria-hidden="true" /><strong data-i18n="censor.lines">LÍNEAS</strong><b>+</b></button>
          <button type="button" className="style-card style-glow" data-style-button="glow-white"><span className="style-icon button-icon icon-glow" aria-hidden="true" /><strong data-i18n="censor.glowWhite">BLANCO GLOW</strong><b>+</b></button>
        </div>
        <select id="style-select" className="select style-select-hidden" disabled aria-hidden="true" tabIndex={-1}>
          <option value="pixelate" data-i18n="censor.pixelateOption">Píxeles</option><option value="blur" data-i18n="censor.blurOption">Desenfoque</option><option value="lines" data-i18n="censor.linesOption">Múltiples líneas negras</option><option value="glow-white" data-i18n="censor.glowWhiteOption">Blanco resplandeciente</option>
        </select>
        <section id="style-advanced" className="style-advanced" hidden aria-live="polite" />
      </div>
      <div id="global-settings" className="censor-settings-group">
        <GlobalApplyToggle />
      </div>
      </Accordion>

      <Accordion id="tracking-controls" titleKey="tracking.title" title="FRAME TRACKING" className="tracking-accordion">
        <p className="help" data-i18n="tracking.help">Propagate the selected layer from this frame. Results need review.</p>
        <label className="field-label" htmlFor="tracking-direction" data-i18n="tracking.direction">Direction</label>
        <select id="tracking-direction" className="select"><option value="both" data-i18n="tracking.both">Both directions</option><option value="forward" data-i18n="tracking.forward">Forward</option><option value="backward" data-i18n="tracking.backward">Backward</option></select>
        <label className="field-label" htmlFor="tracking-method" data-i18n="tracking.method">Method</label>
        <select id="tracking-method" className="select"><option value="motion" data-i18n="tracking.motion">Follow motion</option><option value="fixed" data-i18n="tracking.fixed">Fixed position</option></select>
        <label className="global-toggle"><input id="tracking-snap" type="checkbox" defaultChecked /><span className="field-label" data-i18n="tracking.snapDetections">Snap to analyzed detections</span></label>
        <div className="tracking-range"><label><span data-i18n="tracking.start">First frame</span><input id="tracking-start" type="number" min="1" defaultValue="1" /></label><label><span data-i18n="tracking.end">Last frame</span><input id="tracking-end" type="number" min="1" defaultValue="1" /></label></div>
        <button id="tracking-run" className="button secondary" disabled data-i18n="tracking.run">Propagate layer</button>
        <button id="tracking-undo" className="button ghost-danger" disabled data-i18n="tracking.undo">Undo propagation</button>
        <p id="tracking-summary" className="help" aria-live="polite" />
      </Accordion>

      <dialog id="tracking-dialog" className="tracking-dialog" aria-labelledby="tracking-title">
        <h2 id="tracking-title" data-i18n="tracking.title">FRAME TRACKING</h2>
        <p id="tracking-progress-text" aria-live="polite" />
        <progress id="tracking-progress" max="1" value="0" />
        <button id="tracking-cancel" className="button secondary" data-i18n="analysis.cancel">Cancel</button>
      </dialog>

      <Accordion id="gif-export" titleKey="gif.export" title="GIF EXPORT">
        <div className="field-row"><label className="field-label" htmlFor="gif-target-size" data-i18n="gif.target">Target file size</label><output id="gif-target-size-value">16 MB</output></div>
        <input id="gif-target-size" type="range" min="0" max="100" step="1" value="16" />
        <p className="help" data-i18n="gif.targetHelp">0 keeps the original resolution. A limit tries smaller resolutions without removing frames.</p>
        <p id="gif-export-result" className="help" aria-live="polite" />
      </Accordion>

    </div>
    <div className="review-actions settings-actions"><button id="reject" className="button danger-outline" data-i18n-title="actions.reject" data-i18n-aria-label="actions.reject" disabled><span className="button-icon icon-reject" aria-hidden="true" /><span className="button-label" data-i18n="actions.rejectShort">Rechazar</span></button><button id="approve" className="button approve" data-i18n-title="actions.approve" data-i18n-aria-label="actions.approve" disabled><span className="button-icon icon-approve" aria-hidden="true" /><span className="button-label approve-line">-----</span></button></div>
  </aside>;
}

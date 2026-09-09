export function Toolbar() {
  return <section className="toolbar card">
    <div className="folder-actions">
      <button id="choose-single" className="button secondary" data-i18n-title="toolbar.chooseImage"><span className="button-icon icon-folder" aria-hidden="true" /><span className="button-label" data-i18n="toolbar.chooseImage">Abrir imagen</span></button>
      <button id="choose-input" className="button primary" data-i18n-title="toolbar.chooseInput"><span className="button-icon icon-folder" aria-hidden="true" /><span className="button-label" data-i18n="toolbar.chooseInput">Abrir carpeta</span></button>
      <button id="choose-output" className="button secondary" data-i18n-title="toolbar.chooseOutput" disabled><span className="button-icon icon-folder-arrow" aria-hidden="true" /><span className="button-label" data-i18n="toolbar.chooseOutput">Carpeta de salida</span></button>
      <div className="folder-text"><strong id="input-name" data-i18n="toolbar.noFolder">Ninguna carpeta seleccionada</strong><span id="output-name" data-i18n="toolbar.outputHint">Se guardarán en la subcarpeta censored si no eliges salida</span></div>
      <input id="single-image-input" type="file" accept="image/*" hidden />
    </div>
    <div className="toolbar-status-strip" aria-hidden="true"><span className="status-online">▮ ONLINE</span><span data-i18n="status.ready">STATUS: READY</span><span id="item-count">ITEMS: 0</span><span data-i18n="status.review">MODE: REVIEW</span></div>
    <div className="toolbar-actions">
      <button id="detect-all" className="button secondary" data-i18n-title="toolbar.analyze" disabled><span className="button-icon icon-radar" aria-hidden="true" /><span className="button-label" data-i18n="toolbar.analyze">-----</span></button>
      <button id="save-all" className="button accent" data-i18n-title="toolbar.saveApproved" disabled><span className="button-icon icon-floppy" aria-hidden="true" /><span className="button-label" data-i18n="toolbar.saveApproved">-----</span></button>
      <button id="save-single" className="button accent" data-i18n-title="toolbar.saveImage" hidden disabled><span className="button-icon icon-floppy" aria-hidden="true" /><span className="button-label" data-i18n="toolbar.saveImage">-----</span></button>
    </div>
  </section>;
}

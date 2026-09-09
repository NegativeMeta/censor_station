export function QueuePanel() {
  return <aside className="queue card">
    <div className="panel-heading"><div><span className="eyebrow" data-i18n="queue.eyebrow">COLA</span><h2 data-i18n="queue.title">Imágenes</h2></div><span id="queue-count" className="count-badge">0</span></div>
    <div id="queue-list" className="queue-list empty-state" data-i18n="queue.empty">Elige una carpeta para comenzar.</div>
    <div className="queue-mascot" aria-hidden="true"><img src="/assets/queue-catgirl-upper.png" alt="" /><div className="mascot-status"><span>HP</span><i><b /></i><span>MP</span><i><b /></i></div></div>
  </aside>;
}

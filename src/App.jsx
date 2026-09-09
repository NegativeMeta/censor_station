import { Header } from "./components/Header.jsx";
import { Toolbar } from "./components/Toolbar.jsx";
import { QueuePanel } from "./components/QueuePanel.jsx";
import { EditorPanel } from "./components/EditorPanel.jsx";
import { SettingsPanel } from "./components/SettingsPanel.jsx";
import { OptimizerPanel } from "./components/OptimizerPanel.jsx";

export function App() {
  return <>
    <Header />
    <main className="shell">
      <nav className="app-tabs" role="tablist" aria-label="Secciones de la aplicación">
        <button type="button" className="app-tab is-active" data-app-tab="censor" role="tab" aria-selected="true"><span className="button-icon icon-reject" aria-hidden="true" /><span data-i18n="tabs.censor">CENSURA</span></button>
        <button type="button" className="app-tab" data-app-tab="optimizer" role="tab" aria-selected="false"><span className="button-icon icon-floppy" aria-hidden="true" /><span data-i18n="tabs.optimizer">OPTIMIZAR</span></button>
      </nav>
      <section id="censor-panel" className="app-panel" data-app-panel="censor">
        <Toolbar />
        <section id="notice" className="notice hidden" />
        <div className="workspace"><QueuePanel /><EditorPanel /><SettingsPanel /></div>
        <footer className="footer"><span data-i18n="footer.local">Censor Station 0.1 · procesamiento local</span><span data-i18n="footer.instructions">Izquierdo pinta · derecho borra · arrastra el borde para mover · esquinas para ajustar</span></footer>
      </section>
      <OptimizerPanel />
    </main>
    <dialog id="folder-loading" className="folder-loading" aria-labelledby="folder-loading-title">
      <div className="folder-loading-brand">✦ CENSOR STATION ✦</div>
      <h2 id="folder-loading-title">Loading folder…</h2>
      <p id="folder-loading-name" />
      <div className="analysis-progress-track" aria-hidden="true"><div className="analysis-progress-bar" /></div>
      <p id="folder-loading-count" role="status" aria-live="polite" />
    </dialog>
  </>;
}

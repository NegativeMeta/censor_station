export function Header() {
  return <header className="topbar">
    <div className="brand brand-frame"><span className="brand-mascot brand-mascot-left"><img src="/assets/mascot-silhouette-generated.png" alt="" /></span><span className="brand-word">Censor Station</span><span className="brand-mascot"><img src="/assets/mascot-silhouette-generated.png" alt="" /></span></div>
    <div className="topbar-center"><span>✦</span> <span data-i18n="topbar.tag">MAGICAL FILTER // ONLINE</span> <span>✦</span></div>
    <label className="language-switch"><span data-i18n="language.label">Idioma</span><select id="language-select" data-i18n-aria-label="language.label" aria-label="Idioma"><option value="es">ES</option><option value="en">EN</option><option value="ja">日本語</option><option value="zh">中文</option></select></label>
  </header>;
}

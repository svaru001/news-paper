// Parallax Research — Sidebar, Topbar, Ticker
const { useState: uS1, useEffect: uE1 } = React;

window.Sidebar = function Sidebar({ screen, setScreen }) {
  const items = [
    { key: "discover", label: "Discover",  icon: "compass", count: null },
    { key: "reader",   label: "Reader",    icon: "doc",     count: null },
    { key: "analyst",  label: "Analyst",   icon: "user",    count: null },
    { key: "watch",    label: "Watchlist", icon: "star",    count: "7" },
  ];
  const libs = [
    { key: "bk",    label: "Bookmarks", icon: "bookmark", count: "24" },
    { key: "feed2", label: "Following", icon: "feed",     count: "18" },
    { key: "cal",   label: "Calendar",  icon: "calendar", count: null },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"/>
        <div>
          <div className="brand-name">Parallax</div>
          <div className="brand-sub">Research · Asia</div>
        </div>
      </div>

      <div className="nav-group">
        <div className="nav-group-label">Platform</div>
        {items.map(it => (
          <div key={it.key}
            className={"nav-item" + (screen === it.key ? " active" : "")}
            onClick={() => setScreen(it.key)}>
            <Icon name={it.icon} size={14}/>
            <span>{it.label}</span>
            {it.count && <span className="count">{it.count}</span>}
          </div>
        ))}
      </div>

      <div className="nav-group">
        <div className="nav-group-label">Library</div>
        {libs.map(it => (
          <div key={it.key} className="nav-item">
            <Icon name={it.icon} size={14}/>
            <span>{it.label}</span>
            {it.count && <span className="count">{it.count}</span>}
          </div>
        ))}
      </div>

      <div className="nav-group">
        <div className="nav-group-label">Sectors</div>
        {["Industrials", "Technology", "Financials", "Energy", "Consumer"].map(s => (
          <div key={s} className="nav-item">
            <span style={{width:14, display:"inline-block", textAlign:"center", color:"var(--ink-mute)", fontFamily:"var(--font-mono)", fontSize:10}}>·</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-foot">
        <div className="avatar">JL</div>
        <div className="who">
          <b>Jordan Lee</b>
          <small>PRO · Desk 04</small>
        </div>
        <Icon name="bell" size={14}/>
      </div>
    </aside>
  );
};

window.Topbar = function Topbar({ screen }) {
  const crumbs = {
    discover: ["Parallax", "Discover"],
    reader:   ["Discover", "Japan Industrials", "Silent Repricing"],
    analyst:  ["Analysts", "Mira Tanaka"],
    watch:    ["Library", "Watchlist"],
  }[screen] || ["Parallax"];
  return (
    <div className="topbar">
      <div className="crumb">
        {crumbs.map((c, i) => (
          <span key={i}>
            {i === crumbs.length - 1 ? <b>{c}</b> : c}
            {i < crumbs.length - 1 && " / "}
          </span>
        ))}
      </div>
      <div className="search-wrap">
        <Icon name="search" size={14}/>
        <input className="search" placeholder="Search insights, analysts, tickers…"/>
        <span className="kbd">⌘K</span>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" title="Notifications"><Icon name="bell" size={16}/><span className="dot"/></button>
        <button className="icon-btn" title="Write"><Icon name="pen" size={16}/></button>
        <div className="avatar" style={{width: 30, height: 30, fontSize: 10}}>JL</div>
      </div>
    </div>
  );
};

window.TickerTape = function TickerTape() {
  return (
    <div className="market-strip">
      {DATA.ticker.map(t => (
        <div key={t.sym} className="tick">
          <span className="sym">{t.sym}</span>
          <span className="px">{t.px}</span>
          <span className={"chg " + (t.up ? "up" : "dn")}>{t.chg}</span>
        </div>
      ))}
    </div>
  );
};

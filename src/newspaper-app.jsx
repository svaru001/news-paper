// Main Daily Parallax app component

const { useState: uS, useEffect: uE } = React;

function Masthead({ dateStr }) {
  return (
    <header className="masthead">
      <div className="masthead-ornament left">
        <span className="star">✦</span>
        <span>Vol. MMXXVI · No. 412</span>
      </div>
      <div className="masthead-ornament right">
        <span>Est. 2026 · $3.50</span>
        <span className="star">✦</span>
      </div>
      <h1 className="nameplate">The Daily <em>Parallax</em></h1>
      <div className="nameplate-sub">Moving Photographs · Living Headlines · Asia & The World</div>
    </header>
  );
}

function Ribbon({ loading, onRefresh, source }) {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="ribbon">
      <span className="live"><span className="dot"/> LIVE WIRE</span>
      <span>Updated {time}</span>
      <span className="sep"/>
      <span>{source === "live" ? "Sourced via Claude" : source === "fallback" ? "Cached Edition" : "Loading…"}</span>
      <span className="sep"/>
      <span>Global Edition</span>
      <div className="right">
        <span>Singapore 28°C ⛅</span>
        <span className="sep"/>
        <span>FX · USD/JPY 149.82</span>
        <button className={"refresh-btn " + (loading ? "spinning" : "")} onClick={onRefresh}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>
          </svg>
          {loading ? "Fetching" : "Refresh"}
        </button>
      </div>
    </div>
  );
}

function Sections({ active, onChange }) {
  return (
    <nav className="sections">
      {window.SECTIONS.map(s => (
        <button key={s.id}
          className={"section-btn" + (active === s.id ? " active" : "")}
          onClick={() => onChange(s.id)}>
          {s.label}
        </button>
      ))}
    </nav>
  );
}

function HeroStory({ a, onOpen, idx }) {
  return (
    <div className="hero-story">
      <div className="hero-kicker">
        <span>{a.kicker || "Lead Story"}</span>
        <span className="rule"/>
        <span>{a.location || "Global"}</span>
      </div>
      <h2 className="hero-headline" onClick={() => onOpen(a)}>{a.headline}</h2>
      <p className="hero-dek">{a.dek}</p>
      <div className="hero-byline">
        <b>{a.byline || "Parallax Wire"}</b>
        <span>·</span>
        <span>{a.time || "Today"}</span>
      </div>
      <MovingPhoto
        scene={window.pickScene(a.section || "front", idx)}
        seed={(a.id || "h").charCodeAt(0) + idx}
        caption={a.location ? `${a.location.toUpperCase()} · STAFF DISPATCH` : "ARCHIVE · MOVING IMAGE"}/>
      <div className="hero-lede" onClick={() => onOpen(a)} style={{cursor: "pointer"}}>
        <p>{a.lede || a.dek}</p>
        {a.lede && <p style={{fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--accent-ink)", textTransform: "uppercase"}}>Continue reading →</p>}
      </div>
    </div>
  );
}

function SideStory({ a, onOpen }) {
  return (
    <div className="side-story">
      <h3 onClick={() => onOpen(a)}>{a.headline}</h3>
      <p>{a.dek}</p>
      <div className="mini-meta">{a.kicker || a.section} · {a.time || "today"}</div>
    </div>
  );
}

function StoryCard({ a, onOpen, idx }) {
  return (
    <div className="story-card" onClick={() => onOpen(a)}>
      <MovingPhoto
        scene={window.pickScene(a.section || "front", idx + 1)}
        seed={(a.id || "c").charCodeAt(0) * (idx + 3)}/>
      <div className="kicker" style={{marginTop: 12}}>{a.kicker || a.section}</div>
      <h3>{a.headline}</h3>
      <p>{a.dek}</p>
      <div className="meta">{a.byline || "Parallax"} · {a.time || "today"}</div>
    </div>
  );
}

function Brief({ a, onOpen }) {
  return (
    <div className="brief" onClick={() => onOpen(a)}>
      <div className="num">№ {a.num || "??"}</div>
      <h4>{a.headline}</h4>
      <p>{a.dek}</p>
    </div>
  );
}

function Drawer({ article, onClose }) {
  const open = !!article;
  const a = article || {};
  // lock scroll
  uE(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // rich body paragraphs — use lede + generated continuation
  const paras = a.lede
    ? [a.lede, ...BODY_PARAS]
    : [a.dek || "", ...BODY_PARAS];

  return (
    <>
      <div className={"drawer-backdrop" + (open ? " open" : "")} onClick={onClose}/>
      <aside className={"drawer" + (open ? " open" : "")}>
        <div className="drawer-header">
          <span>{a.kicker || a.section || "The Daily Parallax"}</span>
          <span>·</span>
          <span>{a.time || "Today"}</span>
          <button className="drawer-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M6 18 18 6"/>
            </svg>
          </button>
        </div>
        <div className="drawer-body">
          <h1>{a.headline}</h1>
          <p className="dek">{a.dek}</p>
          <div className="byline">
            <b>{a.byline || "Parallax Wire"}</b>
            <span>·</span>
            <span>{a.location || "Global"}</span>
            <span>·</span>
            <span>{a.time || "Today"}</span>
          </div>
          {open && (
            <MovingPhoto
              scene={window.pickScene(a.section || "front", 0)}
              seed={(a.id || "d").charCodeAt(0) + 7}
              caption={(a.location || "Global").toUpperCase() + " · PARALLAX STAFF"}/>
          )}
          <article style={{marginTop: 28}}>
            {paras.slice(0, 3).map((p, i) => <p key={i}>{p}</p>)}
            <div className="pullquote">
              "{a.dek}"
            </div>
            {paras.slice(3).map((p, i) => <p key={i}>{p}</p>)}
          </article>
        </div>
      </aside>
    </>
  );
}

const BODY_PARAS = [
  "The reverberations are already visible in secondary markets, where traders have begun to price in a sequence of adjustments that would have seemed unlikely only weeks ago. Analysts note that the shift is less about any single announcement than about the cumulative weight of signals — slow in coming, but now unmistakable.",
  "Regional officials, speaking on condition of anonymity, described a changed mood in private meetings. The urgency has shifted from abstract risk to specific contingency, and the vocabulary with it.",
  "What remains uncertain is timing. A senior figure familiar with the deliberations cautioned against treating any near-term move as decisive, noting that the institutions involved typically signal intent long before acting.",
  "For now, the consensus expectation is one of measured calibration rather than abrupt change. That view could not survive another set of surprising data points — but it is the view for today.",
];

function App() {
  const [section, setSection] = uS(() => {
    try { return localStorage.getItem("dp-sec") || "front"; } catch(e) { return "front"; }
  });
  const [state, setState] = uS({ loading: true, data: null, source: null });
  const [open, setOpen] = uS(null);

  const load = async (sec) => {
    setState(s => ({ ...s, loading: true }));
    const res = await window.fetchNews(sec);
    setState({ loading: false, data: res, source: res.source });
  };

  uE(() => { load(section); }, [section]);
  uE(() => { try { localStorage.setItem("dp-sec", section); } catch(e) {} }, [section]);

  const arts = state.data?.articles || [];
  const hero  = arts.find(a => a.tier === "hero");
  const sides = arts.filter(a => a.tier === "side");
  const grid  = arts.filter(a => a.tier === "grid");
  const briefs = arts.filter(a => a.tier === "brief");

  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="wrap">
      <Ribbon loading={state.loading} source={state.source} onRefresh={() => load(section)}/>
      <Masthead/>

      <div className="meta-row">
        <span>{dateStr}</span>
        <span>Early Edition</span>
        <span>12 Stories · 7 Sections</span>
      </div>

      <Sections active={section} onChange={setSection}/>

      {state.source === "fallback" && (
        <div className="status-notice">
          <span className="ico">◆</span>
          <span>Live wire temporarily unavailable — showing cached edition. Try Refresh to re-connect.</span>
        </div>
      )}

      {state.loading && (
        <div className="fold" style={{marginBottom: 36}}>
          <div>
            <div className="skeleton" style={{height: 24, marginBottom: 16, width: "40%"}}/>
            <div className="skeleton" style={{height: 56, marginBottom: 12}}/>
            <div className="skeleton" style={{height: 56, marginBottom: 24, width: "90%"}}/>
            <div className="skeleton" style={{aspectRatio: "16/9", marginBottom: 24}}/>
            <div className="skeleton" style={{height: 14, marginBottom: 8}}/>
            <div className="skeleton" style={{height: 14, marginBottom: 8}}/>
            <div className="skeleton" style={{height: 14, marginBottom: 8, width: "80%"}}/>
          </div>
          <div>
            {[1,2,3].map(i => (
              <div key={i} style={{marginBottom: 24}}>
                <div className="skeleton" style={{height: 40, marginBottom: 10}}/>
                <div className="skeleton" style={{height: 14, marginBottom: 6}}/>
                <div className="skeleton" style={{height: 14, width: "70%"}}/>
              </div>
            ))}
          </div>
        </div>
      )}

      {!state.loading && hero && (
        <section className="fold">
          <HeroStory a={hero} onOpen={setOpen} idx={0}/>
          <aside className="sidebar-col">
            <div className="side-headline">◆ On the Wire</div>
            {sides.map((a, i) => <SideStory key={a.id || i} a={a} onOpen={setOpen}/>)}
          </aside>
        </section>
      )}

      {!state.loading && grid.length > 0 && (
        <>
          <div className="below-fold-label">Below the Fold</div>
          <section className="grid-3">
            {grid.map((a, i) => <StoryCard key={a.id || i} a={a} onOpen={setOpen} idx={i}/>)}
          </section>
        </>
      )}

      {!state.loading && briefs.length > 0 && (
        <>
          <div className="below-fold-label">In Brief</div>
          <section className="briefs">
            {briefs.map((a, i) => <Brief key={a.id || i} a={a} onOpen={setOpen}/>)}
          </section>
        </>
      )}

      <Drawer article={open} onClose={() => setOpen(null)}/>

      <footer style={{textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-mute)", textTransform: "uppercase", marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--rule)"}}>
        ✦ The Daily Parallax · Published Daily · Moving Photographs Powered by SMIL ✦
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

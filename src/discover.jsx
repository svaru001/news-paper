// Parallax Research — Discover screen

window.Discover = function Discover({ setScreen }) {
  const { hero, feed } = DATA;
  const [tab, setTab] = React.useState("All");
  const tabs = ["All", "Japan", "Tech", "Macro", "Energy", "Consumer", "Deep Dives"];
  return (
    <div className="page fade-in">
      <div className="kicker">Morning Brief · Mon 21 April</div>
      <h1 className="page-h1">Today's thinking in <em>Asia-Pacific</em> capital markets.</h1>
      <p className="page-lede">
        Curated insights from 1,400+ independent analysts. We surface what moves risk, not what moves clicks.
      </p>

      <div className="filterbar">
        {tabs.map(t => (
          <button key={t}
            className={"pill" + (tab === t ? " active" : "")}
            onClick={() => setTab(t)}>{t}</button>
        ))}
        <div className="filter-sep"/>
        <button className="pill"><Icon name="filter" size={12}/> Filters</button>
        <div className="filter-meta">64 insights · updated 2 min ago</div>
      </div>

      {/* HERO */}
      <div className="hero" onClick={() => setScreen("reader")}>
        <div className="hero-art">
          <div className="grid-bg"/>
          <div className="hot">Flagship</div>
          <HeroChart/>
          <div className="label">NIKKEI MID-CAP INDUSTRIALS · 12M</div>
        </div>
        <div className="hero-body">
          <div className="kicker" style={{margin: "0 0 12px"}}>{hero.kicker}</div>
          <h2 className="hero-title">{hero.title}</h2>
          <p className="hero-dek">{hero.dek}</p>
          <div className="byline">
            <span className="avatar-sm">{hero.authorInitials}</span>
            <span><b>{hero.author}</b> · {hero.firm}</span>
            {hero.verified && <span className="verified" title="Verified Analyst"><Icon name="check" size={7} stroke={2.2}/></span>}
            <span className="sep">·</span>
            <span>{hero.date} · {hero.reading}</span>
          </div>
          <div className="rating">
            <div className="rating-item">
              <span className="rating-label">Rating</span>
              <span className="rating-val buy">{hero.rating}</span>
            </div>
            <div className="rating-item">
              <span className="rating-label">12M Target</span>
              <span className="rating-val up">{hero.target}</span>
            </div>
            <div className="rating-item">
              <span className="rating-label">Horizon</span>
              <span className="rating-val">{hero.horizon}</span>
            </div>
            <div className="rating-item">
              <span className="rating-label">Confidence</span>
              <span className="rating-val">High</span>
            </div>
          </div>
          <div className="hero-meta">
            {hero.tags.map(t => <span key={t} className="tag">{t}</span>)}
            <span style={{marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6}}>
              Read thesis <Icon name="arrow" size={12}/>
            </span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN: feed + rail */}
      <div className="with-rail">
        <div>
          <div className="section-head">
            <h2>Latest Insights</h2>
            <div className="rule"/>
            <a>View all →</a>
          </div>
          <div className="insights">
            {feed.map(f => (
              <div key={f.id} className="insight-row" onClick={() => setScreen("reader")}>
                <div className="insight-idx">{f.num}</div>
                <div className="insight-main">
                  <h3>{f.title}</h3>
                  <p>{f.excerpt}</p>
                  <div className="insight-meta">
                    <span className="avatar-sm" style={{width:18, height:18, fontSize: 8, borderRadius: "50%", background:"var(--paper-3)", color:"var(--ink-2)", display:"inline-grid", placeItems:"center", fontWeight: 600}}>{f.initials}</span>
                    <b>{f.author}</b>
                    <span>· {f.firm}</span>
                    <span>· {f.date}</span>
                    {f.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
                <div className="insight-chart">
                  <Sparkline seed={f.seed} width={200} height={60} trend={f.trend}
                    stroke={f.up ? "var(--sage)" : "var(--claret)"} fill/>
                </div>
                <div className="insight-stats">
                  <span className={"big " + (f.up ? "up" : "dn")}>{f.move}</span>
                  <span>{f.views} reads</span>
                  <span style={{color: "var(--ink-mute)"}}>last 24h</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{textAlign: "center", marginTop: 28}}>
            <button className="btn ghost">Load 58 more insights</button>
          </div>
        </div>

        <aside className="rail">
          <div className="widget">
            <h4><span className="led"/> Live Movers · Asia</h4>
            {DATA.movers.map(m => (
              <div key={m.sym} className="widget-row">
                <span className="ticker">{m.sym}</span>
                <span className="name">{m.name}</span>
                <span className={"move " + (m.up ? "up" : "dn")}>{m.chg}</span>
              </div>
            ))}
          </div>

          <div className="widget">
            <h4>This Week</h4>
            {DATA.calendar.map((c, i) => (
              <div key={i} className="widget-row">
                <span className="ticker">{c.d}</span>
                <span className="name">{c.t}</span>
                <span className="chip">{c.tag}</span>
              </div>
            ))}
          </div>

          <div className="widget">
            <h4>Analyst Spotlight</h4>
            <div className="spotlight">
              <div className="av">MT</div>
              <div>
                <h5>Mira Tanaka</h5>
                <div className="role">Japan Industrials · Kashiwa</div>
              </div>
            </div>
            <div className="spotlight" style={{paddingTop: 4}}>
              <div className="bio">Twelve years on the Tokyo desk. Her Q3 call on Fanuc ran +31% in 90 days.</div>
            </div>
            <div className="spot-stats">
              <div className="s"><b>71%</b><span>Hit Rate</span></div>
              <div className="s"><b>184</b><span>Insights</span></div>
              <div className="s"><b>4.2K</b><span>Followers</span></div>
            </div>
            <button className="btn ghost small" style={{width: "100%", marginTop: 14}}>Follow</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

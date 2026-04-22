// Parallax Research — Analyst profile + Watchlist screens

window.Analyst = function Analyst({ setScreen }) {
  const { analyst, perfBars, feed } = DATA;
  const [tab, setTab] = React.useState("Insights");
  const tabs = ["Insights", "Performance", "Coverage", "Disclosures"];
  return (
    <div className="page fade-in">
      <div className="kicker">Analyst Profile</div>

      <div className="profile-hero">
        <div className="profile-av">{analyst.initials}</div>
        <div className="profile-info">
          <h1>{analyst.name}
            <span style={{display:"inline-grid", placeItems:"center", verticalAlign:"middle", marginLeft: 10, width:20, height:20, borderRadius:"50%", background:"var(--accent)", color:"var(--paper)"}}>
              <Icon name="check" size={10} stroke={2.4}/>
            </span>
          </h1>
          <div className="role">{analyst.role}</div>
          <p className="bio">{analyst.bio}</p>
          <div className="profile-chips">
            {analyst.chips.map(c => <span key={c} className="tag">{c}</span>)}
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn">Follow · 4,218</button>
          <button className="btn ghost">Subscribe to Inbox</button>
          <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"var(--ink-mute)", letterSpacing:"0.14em", textAlign:"center", marginTop: 6}}>LAST PUBLISHED · 3H AGO</div>
        </div>
      </div>

      <div className="stat-grid">
        {analyst.stats.map(s => (
          <div key={s.lbl} className="stat">
            <div className="lbl">{s.lbl}</div>
            <div className="num">{s.num}</div>
            <div className={"sub " + (s.sub.startsWith("+") ? "up" : "")}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="filterbar" style={{border: 0, marginBottom: 20}}>
        {tabs.map(t => (
          <button key={t}
            className={"pill" + (tab === t ? " active" : "")}
            onClick={() => setTab(t)}>{t}</button>
        ))}
        <div className="filter-meta">Sorted by recency</div>
      </div>

      {tab === "Insights" && (
        <div className="with-rail">
          <div>
            <div className="insights">
              {feed.slice(0, 4).map(f => (
                <div key={f.id} className="insight-row" onClick={() => setScreen("reader")}>
                  <div className="insight-idx">{f.num}</div>
                  <div className="insight-main">
                    <h3>{f.title}</h3>
                    <p>{f.excerpt}</p>
                    <div className="insight-meta">
                      <b>Mira Tanaka</b>
                      <span>· Kashiwa Capital</span>
                      <span>· {f.date}</span>
                      {f.tags.map(t => <span key={t} className="chip">{t}</span>)}
                    </div>
                  </div>
                  <div className="insight-chart">
                    <Sparkline seed={f.seed + 3} width={200} height={60} trend={f.trend}
                      stroke={f.up ? "var(--sage)" : "var(--claret)"} fill/>
                  </div>
                  <div className="insight-stats">
                    <span className={"big " + (f.up ? "up" : "dn")}>{f.move}</span>
                    <span>{f.views} reads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="rail">
            <div className="widget">
              <h4>12-Month Performance</h4>
              <div style={{padding:"6px 0 0"}}>
                <BarChart data={perfBars} width={268} height={140} color="var(--accent)"/>
              </div>
              <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"var(--ink-mute)", letterSpacing:"0.1em", marginTop: 6}}>
                RETURNS VS TOPIX BENCHMARK
              </div>
            </div>
            <div className="widget">
              <h4>Rating Distribution</h4>
              {[
                { l: "Buy",  v: 64, c: "var(--sage)"   },
                { l: "Hold", v: 28, c: "var(--ink-3)"  },
                { l: "Sell", v: 8,  c: "var(--claret)" },
              ].map(r => (
                <div key={r.l} style={{marginBottom: 10}}>
                  <div style={{display:"flex", justifyContent:"space-between", fontSize:12, marginBottom: 4, fontFamily:"var(--font-mono)"}}>
                    <span>{r.l}</span>
                    <span>{r.v}%</span>
                  </div>
                  <div style={{height: 4, background: "var(--paper-2)", borderRadius: 2, overflow:"hidden"}}>
                    <div style={{height:"100%", width: r.v + "%", background: r.c}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="widget">
              <h4>Coverage Universe</h4>
              {["6301 Komatsu", "7011 Mitsubishi Heavy", "6954 Fanuc", "6326 Kubota", "7267 Honda"].map(s => (
                <div key={s} className="widget-row">
                  <span className="ticker">{s}</span>
                  <span style={{fontFamily:"var(--font-mono)", fontSize:11, color:"var(--ink-mute)"}}>Active</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {tab !== "Insights" && (
        <div style={{padding:"60px 0", textAlign:"center", fontFamily:"var(--font-mono)", fontSize: 12, color:"var(--ink-mute)", letterSpacing:"0.12em"}}>
          {tab.toUpperCase()} TAB · DEMO PLACEHOLDER
        </div>
      )}
    </div>
  );
};

window.Watchlist = function Watchlist({ setScreen }) {
  const [sel, setSel] = React.useState(null);
  const [sort, setSort] = React.useState("sym");
  const rows = DATA.watchlist;
  return (
    <div className="page fade-in">
      <div className="kicker">Library · Watchlist</div>
      <h1 className="page-h1" style={{fontSize: 36, marginBottom: 4}}>Japan Industrials Basket</h1>
      <p className="page-lede" style={{fontSize: 15, marginBottom: 24}}>
        7 names · last synced 2 min ago · tracking thesis by Mira Tanaka.
      </p>

      <div className="toolbar">
        <button className="pill active">All 7</button>
        <button className="pill">Buy 4</button>
        <button className="pill">Hold 2</button>
        <button className="pill">Sell 1</button>
        <div className="filter-sep"/>
        <button className="pill"><Icon name="plus" size={12}/> Add ticker</button>
        <div className="spacer"/>
        <button className="btn ghost small"><Icon name="chart" size={12}/> Chart View</button>
        <button className="btn small"><Icon name="share" size={12}/> Export</button>
      </div>

      <table className="watch-table">
        <thead>
          <tr>
            <th style={{width: 40}}></th>
            <th>Instrument</th>
            <th>Sector</th>
            <th className="num">Last</th>
            <th className="num">Change</th>
            <th>Signal</th>
            <th className="num">12M Target</th>
            <th style={{width: 120}}>Trend</th>
            <th style={{width: 40}}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.sym}
              onClick={() => setSel(r.sym === sel ? null : r.sym)}
              style={sel === r.sym ? { background: "var(--paper-2)" } : {}}>
              <td><input type="checkbox" style={{accentColor:"var(--ink)"}} defaultChecked={i < 4}/></td>
              <td>
                <div className="tick-cell">
                  <div className="sq">{r.sym.slice(0,2)}</div>
                  <div className="nm">
                    <b>{r.name}</b>
                    <small>{r.sym} · TSE</small>
                  </div>
                </div>
              </td>
              <td><span className="chip">{r.sec}</span></td>
              <td className="num">¥{r.px}</td>
              <td className={"num chg " + (r.up ? "up" : "dn")}>{r.chg}</td>
              <td><span className={"signal " + r.sig}>{r.sig.toUpperCase()}</span></td>
              <td className={"num " + (r.target.startsWith("+") ? "chg up" : r.target.startsWith("-") ? "chg dn" : "")}>{r.target}</td>
              <td>
                <Sparkline seed={r.seed} width={100} height={28} trend={r.up ? 1 : -1}
                  stroke={r.up ? "var(--sage)" : "var(--claret)"}/>
              </td>
              <td>
                <button className="icon-btn" style={{width: 28, height: 28}}>
                  <Icon name="arrow" size={12}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary strip */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 32, border: "1px solid var(--rule-soft)", borderRadius: 8, overflow: "hidden"}}>
        {[
          { lbl: "Basket Value",     num: "¥48.2M",  sub: "+2.14% today" },
          { lbl: "12M Return",       num: "+18.2%",  sub: "vs TOPIX +6.4%" },
          { lbl: "Avg FCF Yield",    num: "7.4%",    sub: "Basket median" },
          { lbl: "Thesis Horizon",   num: "9 mo",    sub: "Of original 12" },
        ].map(s => (
          <div key={s.lbl} style={{padding: 20, borderRight: "1px solid var(--rule-soft)"}}>
            <div className="lbl" style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.18em", color:"var(--ink-mute)", textTransform:"uppercase", marginBottom:10}}>{s.lbl}</div>
            <div style={{fontFamily:"var(--font-serif)", fontSize: 28, letterSpacing:"-0.02em", fontWeight: 500}}>{s.num}</div>
            <div style={{fontFamily:"var(--font-mono)", fontSize: 11, color: s.sub.startsWith("+") ? "var(--sage)" : "var(--ink-mute)", marginTop: 6}}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Parallax Research — Reader screen

window.Reader = function Reader({ setScreen }) {
  const [active, setActive] = React.useState("summary");
  const sections = [
    { id: "summary",  label: "Summary"         },
    { id: "thesis",   label: "Thesis"          },
    { id: "data",     label: "Data & Charts"   },
    { id: "risks",    label: "Risks"           },
    { id: "basket",   label: "The 14 Names"    },
  ];
  return (
    <div className="reader fade-in">
      <div className="reader-header">
        <div className="reader-kicker">
          <span>THESIS · FLAGSHIP</span>
          <span className="dotsep"/>
          <span>JAPAN · INDUSTRIALS</span>
          <span className="dotsep"/>
          <span>APR 21, 2026</span>
        </div>
        <h1 className="reader-h1">The Silent Repricing of Japan's Mid-Cap Industrials</h1>
        <p className="reader-dek">
          Three quarters of cap-ex discipline, yen tailwinds, and a quiet re-rating are converging on a basket the sell-side still treats as cyclical.
        </p>
        <div className="reader-byline">
          <div className="av">MT</div>
          <div>
            <b>Mira Tanaka</b>
            <small>KASHIWA CAPITAL · VERIFIED ANALYST</small>
          </div>
          <div className="meta">
            <b>14 min read</b><br/>
            Published 3 hrs ago
          </div>
          <button className="btn small" style={{marginLeft: 20}}>
            <Icon name="bookmark" size={12}/> Save
          </button>
          <button className="btn ghost small">
            <Icon name="share" size={12}/> Share
          </button>
        </div>
      </div>

      {/* dock TOC */}
      <div className="reader-dock">
        <div className="dock-title">In this insight</div>
        <div className="dock-toc">
          {sections.map(s => (
            <a key={s.id}
              className={active === s.id ? "active" : ""}
              onClick={() => setActive(s.id)}>
              {s.label}
            </a>
          ))}
        </div>
        <div className="dock-progress"><span style={{width: `${(sections.findIndex(s=>s.id===active)+1)/sections.length*100}%`}}/></div>
        <div style={{marginTop: 14, fontSize: 10, letterSpacing: "0.12em"}}>
          34% READ
        </div>
      </div>

      <article>
        <p>
          The consensus on Japanese mid-cap industrials has hardened into a reflex: cyclical, yen-sensitive, and structurally challenged. That reflex is three years out of date. What has actually happened since 2023 is a quiet shift in capital allocation that the Street has filed under "governance reform" and then stopped paying attention.
        </p>

        <div className="thesis">
          <div className="lbl">Core Thesis</div>
          <p className="big">
            A basket of 14 Japanese mid-cap industrials is trading at <em>11.2x forward earnings</em> while quietly generating first-quartile free cash yields and <em>double-digit ROIC</em>. The re-rating has begun in the tape but not in the models.
          </p>
        </div>

        <p>
          Specifically: across our universe of 62 TOPIX-listed industrials with market caps between ¥200bn and ¥2tn, free cash flow conversion has averaged 92% over the last eight quarters, against a fifteen-year historical mean of 68%. Buyback announcements have increased 2.4x year on year. And — crucially — cap-ex intensity has compressed even as order backlogs have grown.
        </p>

        <h3>What the sell-side is missing</h3>

        <p>
          Three things. First, the yen tailwind is being underestimated because consensus models still apply pre-2022 translation sensitivities that assume a higher share of domestic cost base than what actually exists post-supply-chain diversification. Second, the cap-ex discipline is being misread as weakness rather than as an inflection in capital allocation culture. Third, the re-rating trigger — a rotation out of mega-cap exporters into undercovered mid-caps — has already begun for the top quintile of our basket, but hasn't been generalized.
        </p>

        <blockquote>
          "The market is pricing these names as if 2015 is still the reference quarter. Our work suggests 2024 is."
        </blockquote>

        <div className="data-figure">
          <h5>Figure 1 · Basket FCF yield vs TOPIX industrials (8-qtr trailing)</h5>
          <AreaChart seed={99} width={660} height={240} color="var(--accent)"/>
          <div className="capt">Source: Company filings, Parallax analysis. Grey line indicates sector median.</div>
        </div>

        <h3>How we built the basket</h3>

        <p>
          The 14 names were selected from an initial universe of 62 using four screens: free cash flow conversion above 80% (8-quarter trailing), net debt / EBITDA below 1.5x, order backlog coverage of at least 14 months, and a forward P/E within one standard deviation of the sector median. We then cross-checked each name against our proprietary governance score, eliminating any constituent below the seventieth percentile.
        </p>

        <ul className="bullets">
          <li>Median forward P/E: 11.2x vs sector 16.8x</li>
          <li>Median FCF yield: 7.4% vs sector 4.1%</li>
          <li>Median ROIC (ex. cash): 13.6% vs sector 8.9%</li>
          <li>Median order backlog: 18.2 months vs sector 11.4</li>
          <li>Net buyback yield, trailing 12M: 3.8% — the highest in our database since we began tracking in 2014</li>
        </ul>

        <div className="data-figure">
          <h5>Figure 2 · Forward P/E dispersion, 62-name universe</h5>
          <CandleChart seed={31} width={660} height={260}/>
          <div className="capt">Each bar represents a name. Green = inside basket. Data as of previous close.</div>
        </div>

        <h3>The path to re-rating</h3>

        <p>
          We see three catalysts over the next six to nine months. A BOJ policy drift that finally reprices the JGB curve. A round of passive rebalancing following the MSCI semi-annual review. And the 2026 shareholder meeting season, where our governance work suggests a meaningful cohort of these names will face activist proposals — most constructive, most already in dialogue with management.
        </p>

        <p>
          We are long the basket with a 12-month price target implying <em>+28.4% total return</em>, against a TOPIX benchmark of +6 to +9%. Risks, positions, and the full 14-name list follow in the appendix.
        </p>

        <h3>Risks</h3>

        <ul className="bullets">
          <li>Sharp yen appreciation breaking the translation-benefit thesis</li>
          <li>A China industrial slowdown severe enough to compress Asian ex-Japan orderbooks</li>
          <li>A passive flow reversal if the JGB curve does not normalise on schedule</li>
          <li>Idiosyncratic governance setbacks in 2–3 of the basket names</li>
        </ul>
      </article>
    </div>
  );
};

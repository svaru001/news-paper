// Live news fetcher — calls /api/news (backed by NewsAPI.org / Google News)
// Exposes window.fetchNews(section) -> Promise<{source, articles}>

window.SECTIONS = [
  { id: "front",    label: "Front Page" },
  { id: "world",    label: "World" },
  { id: "business", label: "Business" },
  { id: "tech",     label: "Technology" },
  { id: "science",  label: "Science" },
  { id: "sports",   label: "Sports" },
  { id: "culture",  label: "Culture" },
];

const SCENE_BY_SECTION = {
  front:    ["city", "markets", "politics"],
  world:    ["politics", "city", "nature"],
  business: ["markets", "city", "tech"],
  tech:     ["tech", "science", "markets"],
  science:  ["science", "nature", "tech"],
  sports:   ["sports", "city", "nature"],
  culture:  ["nature", "city", "politics"],
};

window.pickScene = function pickScene(section, i) {
  const pool = SCENE_BY_SECTION[section] || ["city"];
  return pool[i % pool.length];
};

const FALLBACK = {
  fetchedAt: new Date().toISOString(),
  articles: [
    { id: "f1", tier: "hero", section: "world",
      kicker: "World · Breaking",
      headline: "Global Markets Weigh New Policy Pivot as Central Banks Signal Caution",
      dek: "Finance ministers converge amid shifting rate expectations and renewed trade tensions.",
      lede: "Policy makers from the world's largest economies gathered this weekend under a darkening geopolitical sky, facing a question that has defined the year: how long can divergent rate paths hold before currency markets force a reckoning? The answer, according to officials briefed on the discussions, is shorter than the consensus view had assumed.",
      byline: "Editorial Desk · Parallax Wire",
      location: "Global",
      time: "2 hrs ago" },
    { id: "f2", tier: "side", section: "business",
      kicker: "Markets · Reuters",
      headline: "Oil Steadies as OPEC+ Delegates Signal Discipline",
      dek: "Brent crude held above $84 ahead of this week's production meeting.",
      byline: "Reuters", time: "4h ago" },
    { id: "f3", tier: "side", section: "tech",
      kicker: "Technology · The Wire",
      headline: "AI Chip Race Enters Its Real Cost Phase, Analysts Say",
      dek: "Hyperscaler capex projections imply a multi-year squeeze on free cash flow.",
      byline: "The Wire", time: "6h ago" },
    { id: "f4", tier: "side", section: "science",
      kicker: "Science · Bureau",
      headline: "Deep-Sea Telescope Captures First Neutrino Burst From Galactic Core",
      dek: "The observation is consistent with a long-standing dark-matter model.",
      byline: "Science Bureau", time: "9h ago" },
    { id: "g1", tier: "grid", section: "politics",
      kicker: "Elections · Desk",
      headline: "A Quiet Realignment in the Electorate, Polls Suggest",
      dek: "New survey data finds a growing bloc of voters defying traditional party lines.",
      byline: "Politics Desk", time: "12h ago" },
    { id: "g2", tier: "grid", section: "business",
      kicker: "Business · Trade Bureau",
      headline: "Shipping Rates Jump Again as Red Sea Tensions Resurface",
      dek: "Spot rates on the Asia-Europe lane are up 14% week-on-week.",
      byline: "Trade Bureau", time: "1d ago" },
    { id: "g3", tier: "grid", section: "culture",
      kicker: "Culture",
      headline: "A Curator's Case for the Return of the Slow Exhibition",
      dek: "Major museums are reconsidering the pace of their programming.",
      byline: "Culture", time: "1d ago" },
    { id: "b1", tier: "brief", section: "sports", num: "01",
      headline: "Tokyo Marathon Sees Course Record Under Cool Morning Skies",
      dek: "A Kenyan veteran crossed the line in 2:03:14, breaking a twelve-year-old mark." },
    { id: "b2", tier: "brief", section: "tech", num: "02",
      headline: "Regulators Advance Rules on Foundation-Model Transparency",
      dek: "Disclosure requirements would extend to training data provenance by 2027." },
    { id: "b3", tier: "brief", section: "world", num: "03",
      headline: "Seasonal Monsoon Forecast Revised Upward Across South Asia",
      dek: "Meteorologists now expect rainfall 8% above the long-period average." },
    { id: "b4", tier: "brief", section: "science", num: "04",
      headline: "Vaccine Trial for Dengue Variant Shows 82% Efficacy in Phase III",
      dek: "Approval applications are expected to be filed in three markets this quarter." },
  ],
};

window.fetchNews = async function fetchNews(sectionId = "front", page = 1) {
  try {
    const resp = await Promise.race([
      fetch(`/api/news?section=${encodeURIComponent(sectionId)}&page=${page}`),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 15000)),
    ]);

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();
    if (!data.ok || !Array.isArray(data.articles)) throw new Error(data.error || "bad response");

    return { source: "live", fetchedAt: data.fetchedAt, articles: data.articles, totalResults: data.totalResults, page };
  } catch (err) {
    console.warn("News API unavailable, using fallback:", err.message);
    return { source: "fallback", ...FALLBACK, error: err.message, page: 1 };
  }
};

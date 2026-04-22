// Data — sample content for the prototype
// Exposed as window.DATA

window.DATA = {
  hero: {
    kicker: "Flagship · Asia-Pacific",
    title: "The Silent Repricing of Japan's Mid-Cap Industrials",
    dek: "Three quarters of cap-ex discipline, yen tailwinds, and a quiet re-rating are converging. We see asymmetric upside in a basket of 14 names the sell-side still treats as cyclical.",
    author: "Mira Tanaka",
    authorInitials: "MT",
    verified: true,
    firm: "Kashiwa Capital",
    date: "3 hrs ago",
    reading: "14 min read",
    tags: ["Japan", "Industrials", "Thesis"],
    rating: "BUY",
    target: "+28.4%",
    horizon: "12M",
  },
  feed: [
    {
      id: 1, num: "001",
      title: "TSMC's 2nm Ramp: The Supply-Chain Winners No One Is Modeling",
      excerpt: "Our channel checks across three Taiwan OSATs suggest yield curves are compressing six months ahead of consensus. We identify four second-order beneficiaries trading at a discount to historical multiples.",
      author: "Wei-Han Chang", initials: "WC", firm: "Formosa Insight", date: "6h",
      tags: ["Taiwan", "Semis"], seed: 12, trend: 1.2, move: "+3.4%", up: true, views: "2.1K"
    },
    {
      id: 2, num: "002",
      title: "India's Consumer Goods De-Rating: Structural or Cyclical?",
      excerpt: "We walk through 40 quarters of volume growth, input costs, and rural wage data. The narrative of a 'premiumisation permabull' is running into a demographic ceiling that few buy-side models capture.",
      author: "Arjun Mehta", initials: "AM", firm: "Banyan Research", date: "11h",
      tags: ["India", "Consumer"], seed: 45, trend: -0.4, move: "-1.8%", up: false, views: "1.4K"
    },
    {
      id: 3, num: "003",
      title: "Korean Shipbuilders: Orderbook Discipline Finally Meets Steel Prices",
      excerpt: "For the first time since 2008, Hyundai Heavy and Samsung Heavy are turning down low-margin tonnage. We quantify the EPS sensitivity across three plate-price scenarios.",
      author: "Seo-Yeon Park", initials: "SP", firm: "Seoul Alpha", date: "1d",
      tags: ["Korea", "Shipping"], seed: 77, trend: 0.9, move: "+5.1%", up: true, views: "3.3K"
    },
    {
      id: 4, num: "004",
      title: "ASEAN Banks: The Deposit Beta Asymmetry Is About to Flip",
      excerpt: "Our regional deposit-mix analysis finds that DBS, OCBC, and BCA are carrying hidden NIM upside in a pivot scenario. We disagree with the Street's symmetric elasticity assumption.",
      author: "Liwei Goh", initials: "LG", firm: "Straits Macro", date: "1d",
      tags: ["ASEAN", "Banks"], seed: 33, trend: 0.6, move: "+2.0%", up: true, views: "980"
    },
    {
      id: 5, num: "005",
      title: "Australia Iron Ore: Why We're Short Into the Budget Cycle",
      excerpt: "Chinese steel inventory destocking has further to run. We pair-trade against gold miners carrying cleaner balance sheets and stronger free-cash conversion.",
      author: "Callum Boyd", initials: "CB", firm: "Harbour Ridge", date: "2d",
      tags: ["Australia", "Mining"], seed: 21, trend: -0.8, move: "-4.2%", up: false, views: "1.8K"
    },
  ],
  movers: [
    { sym: "TSM",   name: "Taiwan Semi",     px: "198.40", chg: "+3.42%", up: true },
    { sym: "7203",  name: "Toyota Motor",    px: "3,210",  chg: "+2.11%", up: true },
    { sym: "RELI",  name: "Reliance Ind.",   px: "2,945",  chg: "+1.70%", up: true },
    { sym: "005930", name: "Samsung Elec.",  px: "78,200", chg: "-0.84%", up: false },
    { sym: "HDFC",  name: "HDFC Bank",       px: "1,612",  chg: "-1.22%", up: false },
  ],
  calendar: [
    { d: "Tue 22", t: "Samsung Q1 results",   tag: "Earnings" },
    { d: "Wed 23", t: "BOJ policy statement", tag: "Macro" },
    { d: "Thu 24", t: "TSMC capex guidance",  tag: "Earnings" },
    { d: "Fri 25", t: "China PMI print",      tag: "Macro" },
  ],
  ticker: [
    { sym: "NIKKEI",   px: "39,412.80", chg: "+0.84%", up: true },
    { sym: "HSI",      px: "17,204.10", chg: "-0.22%", up: false },
    { sym: "KOSPI",    px: "2,678.45",  chg: "+1.10%", up: true },
    { sym: "STI",      px: "3,344.10",  chg: "+0.30%", up: true },
    { sym: "SENSEX",   px: "74,218.22", chg: "+0.62%", up: true },
    { sym: "ASX 200",  px: "7,812.40",  chg: "-0.15%", up: false },
    { sym: "USD/JPY",  px: "149.82",    chg: "-0.38%", up: false },
    { sym: "BRENT",    px: "84.20",     chg: "+0.95%", up: true },
  ],
  analyst: {
    name: "Mira Tanaka",
    initials: "MT",
    role: "Lead Analyst · Japan Industrials · Kashiwa Capital",
    bio: "Former Daiwa sell-side, 12 years covering Japanese industrials and autos. Publishes weekly thesis work and quarterly deep-dives on cap-ex cycles. Views: structural, contrarian, mean-reverting.",
    chips: ["Japan", "Industrials", "Autos", "Capex", "Deep-Dive"],
    stats: [
      { lbl: "Insights", num: "184",    sub: "All-time" },
      { lbl: "Followers", num: "4,218",  sub: "+124 this month" },
      { lbl: "Hit Rate",  num: "71%",    sub: "12M realised" },
      { lbl: "Alpha",     num: "+18.2%", sub: "Ann., vs TOPIX" },
    ],
  },
  watchlist: [
    { sym: "6301", name: "Komatsu Ltd",     sec: "Industrials", px: "4,512",  chg: "+2.14%", up: true,  sig: "buy",  target: "+18%", seed: 11 },
    { sym: "7011", name: "Mitsubishi Heavy", sec: "Industrials", px: "11,240", chg: "+3.80%", up: true,  sig: "buy",  target: "+24%", seed: 22 },
    { sym: "6326", name: "Kubota Corp",     sec: "Industrials", px: "2,180",  chg: "-0.45%", up: false, sig: "hold", target: "+4%",  seed: 33 },
    { sym: "7267", name: "Honda Motor",     sec: "Autos",       px: "1,705",  chg: "+1.22%", up: true,  sig: "buy",  target: "+12%", seed: 44 },
    { sym: "6954", name: "Fanuc Corp",      sec: "Industrials", px: "3,860",  chg: "-1.60%", up: false, sig: "sell", target: "-8%",  seed: 55 },
    { sym: "8058", name: "Mitsubishi Corp", sec: "Trading Cos.", px: "3,475", chg: "+0.85%", up: true,  sig: "buy",  target: "+14%", seed: 66 },
    { sym: "9984", name: "SoftBank Group",  sec: "Tech",        px: "8,910",  chg: "-2.10%", up: false, sig: "hold", target: "+2%",  seed: 77 },
  ],
  perfBars: [
    { l: "1M", v: 2.1 }, { l: "3M", v: 5.8, hi: true }, { l: "6M", v: 9.2, hi: true },
    { l: "YTD", v: 11.4, hi: true }, { l: "1Y", v: 18.2, hi: true }, { l: "3Y", v: 42.1 },
  ],
};

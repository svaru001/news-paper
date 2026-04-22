require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// ── Section configs ───────────────────────────────────────────────────

const HEADLINE_SECTIONS = {
  front:    { category: "general" },
  business: { category: "business" },
  tech:     { category: "technology" },
  science:  { category: "science" },
  sports:   { category: "sports" },
  culture:  { category: "entertainment" },
};

const SOURCE_SECTIONS = {
  world: "bbc-news,reuters,associated-press,al-jazeera-english,the-guardian-uk",
};

const EVERYTHING_SECTIONS = {
  politics: { q: "politics", sortBy: "publishedAt" },
};

const SECTION_KICKER = {
  front:    "Front Page",
  world:    "World",
  business: "Business",
  tech:     "Technology",
  science:  "Science",
  sports:   "Sports",
  culture:  "Culture",
  politics: "Politics",
};

// ── SEO metadata per section ──────────────────────────────────────────

const SECTION_SEO = {
  front: {
    title: "The Daily Parallax — Today's Front Page",
    description: "Today's top stories: breaking news, world affairs, business, technology and more — The Daily Parallax, your live edition newspaper.",
    keywords: "breaking news, top stories, world news, today's news, live news",
  },
  world: {
    title: "World News — The Daily Parallax",
    description: "International headlines and global affairs from BBC, Reuters, AP and Al Jazeera — The Daily Parallax world desk.",
    keywords: "world news, international news, global affairs, foreign news",
  },
  business: {
    title: "Business & Markets — The Daily Parallax",
    description: "Financial markets, economic policy, corporate news and business analysis from The Daily Parallax.",
    keywords: "business news, markets, economy, finance, stocks, trade",
  },
  tech: {
    title: "Technology — The Daily Parallax",
    description: "The latest in technology, AI, science and innovation — The Daily Parallax technology desk.",
    keywords: "technology news, AI, artificial intelligence, startups, silicon valley, gadgets",
  },
  science: {
    title: "Science — The Daily Parallax",
    description: "Scientific discoveries, research breakthroughs, climate, space and health — The Daily Parallax science desk.",
    keywords: "science news, research, space, climate, health, medicine",
  },
  sports: {
    title: "Sports — The Daily Parallax",
    description: "Live scores, match reports and sports analysis from around the world — The Daily Parallax sports desk.",
    keywords: "sports news, football, basketball, tennis, cricket, athletics",
  },
  culture: {
    title: "Culture & Arts — The Daily Parallax",
    description: "Film, music, books, exhibitions and cultural commentary — The Daily Parallax culture desk.",
    keywords: "culture, arts, film, music, books, entertainment",
  },
};

// ── HTML template helpers ─────────────────────────────────────────────

const HTML_PATH = path.join(__dirname, "The Daily Parallax.html");
const HTML_TEMPLATE = fs.readFileSync(HTML_PATH, "utf-8");

const ALL_SECTIONS = ["front", "world", "business", "tech", "science", "sports", "culture"];

function sectionUrl(section) {
  return section === "front" ? BASE_URL : `${BASE_URL}/${section}`;
}

function buildMeta(section) {
  const seo = SECTION_SEO[section] || SECTION_SEO.front;
  const url = sectionUrl(section);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${BASE_URL}/#organization`,
        name: "The Daily Parallax",
        url: BASE_URL,
        description: "The Daily Parallax — Live Edition Newspaper covering world news, business, technology, science, sports and culture.",
        foundingDate: "1932",
        publishingPrinciples: BASE_URL,
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "The Daily Parallax",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?section={section}` },
          "query-input": "required name=section",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        dateModified: new Date().toISOString(),
        inLanguage: "en",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            ...(section !== "front" ? [{ "@type": "ListItem", position: 2, name: SECTION_KICKER[section] || section, item: url }] : []),
          ],
        },
      },
    ],
  });

  return `
  <!-- Primary SEO -->
  <meta name="description" content="${escAttr(seo.description)}"/>
  <meta name="keywords" content="${escAttr(seo.keywords)}"/>
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
  <link rel="canonical" href="${escAttr(url)}"/>

  <!-- Open Graph -->
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="The Daily Parallax"/>
  <meta property="og:title" content="${escAttr(seo.title)}"/>
  <meta property="og:description" content="${escAttr(seo.description)}"/>
  <meta property="og:url" content="${escAttr(url)}"/>
  <meta property="og:locale" content="en_US"/>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${escAttr(seo.title)}"/>
  <meta name="twitter:description" content="${escAttr(seo.description)}"/>

  <!-- Structured Data -->
  <script type="application/ld+json">${jsonLd}</script>`;
}

function escAttr(s) {
  return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function renderPage(section) {
  const seo = SECTION_SEO[section] || SECTION_SEO.front;
  return HTML_TEMPLATE
    .replace(/<title>.*?<\/title>/, `<title>${escAttr(seo.title)}</title>`)
    .replace("</head>", `${buildMeta(section)}\n</head>`);
}

// ── Routes ────────────────────────────────────────────────────────────

// Serve the newspaper HTML with injected SEO (must come before static middleware)
app.get("/", (req, res) => {
  res.type("html").send(renderPage("front"));
});

ALL_SECTIONS.filter(s => s !== "front").forEach(section => {
  app.get(`/${section}`, (req, res) => {
    res.type("html").send(renderPage(section));
  });
});

// robots.txt
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml`
  );
});

// sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  const now = new Date().toISOString().split("T")[0];
  const urls = ALL_SECTIONS.map((s) => `
  <url>
    <loc>${sectionUrl(s)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>${s === "front" ? "1.0" : "0.8"}</priority>
  </url>`).join("");

  res.type("application/xml").send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`
  );
});

// Static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ── News API ──────────────────────────────────────────────────────────

app.get("/api/news", async (req, res) => {
  if (!NEWS_API_KEY) {
    return res.status(500).json({
      ok: false,
      error: "NEWS_API_KEY not set. Copy .env.example to .env and add your key from newsapi.org.",
    });
  }

  const section = req.query.section || "front";

  let apiUrl;
  if (SOURCE_SECTIONS[section]) {
    const params = new URLSearchParams({
      sources: SOURCE_SECTIONS[section],
      pageSize: "11",
      apiKey: NEWS_API_KEY,
    });
    apiUrl = `https://newsapi.org/v2/top-headlines?${params}`;
  } else if (EVERYTHING_SECTIONS[section]) {
    const params = new URLSearchParams({
      ...EVERYTHING_SECTIONS[section],
      pageSize: "11",
      language: "en",
      apiKey: NEWS_API_KEY,
    });
    apiUrl = `https://newsapi.org/v2/everything?${params}`;
  } else {
    const { category } = HEADLINE_SECTIONS[section] || { category: "general" };
    const params = new URLSearchParams({
      category,
      pageSize: "11",
      language: "en",
      apiKey: NEWS_API_KEY,
    });
    apiUrl = `https://newsapi.org/v2/top-headlines?${params}`;
  }

  try {
    const resp = await fetch(apiUrl);
    const json = await resp.json();

    if (json.status !== "ok") {
      throw new Error(json.message || `NewsAPI error ${resp.status}`);
    }

    const articles = (json.articles || []).filter(
      (a) => a.title && a.title !== "[Removed]"
    );

    res.json({
      ok: true,
      source: "live",
      fetchedAt: new Date().toISOString(),
      articles: mapArticles(articles, section),
    });
  } catch (err) {
    console.error("News fetch error:", err.message);
    res.status(502).json({ ok: false, error: err.message });
  }
});

// ── Helpers ───────────────────────────────────────────────────────────

function relativeTime(dateStr) {
  if (!dateStr) return "Today";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffH = Math.floor(diffMs / 3_600_000);
  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return diffD === 1 ? "Yesterday" : `${diffD}d ago`;
}

function cleanTitle(title) {
  if (!title) return "Untitled";
  return title.replace(/\s[-–|]\s[^-–|]{2,60}$/, "").trim();
}

function cleanContent(content) {
  if (!content) return "";
  return content.replace(/\s*\[.*?\]\s*$/, "").trim();
}

function mapArticles(items, sectionId) {
  const TIERS = ["hero", "side", "side", "side", "grid", "grid", "grid", "brief", "brief", "brief", "brief"];
  const sectionLabel = SECTION_KICKER[sectionId] || "News";

  return items.slice(0, 11).map((a, i) => {
    const tier = TIERS[i] || "brief";
    const sourceName = (a.source && a.source.name) || "News Wire";
    const headline = cleanTitle(a.title);
    const dek = (a.description || "").replace(/\s*\[.*?\]$/, "").trim() || headline;

    const base = {
      id: a.url || String(i),
      tier,
      section: sectionId,
      kicker: `${sectionLabel} · ${sourceName}`,
      headline,
      dek,
      byline: a.author ? a.author.split(",")[0].trim() : sourceName,
      time: relativeTime(a.publishedAt),
      url: a.url,
      image: a.urlToImage || null,
    };

    if (tier === "hero") {
      base.lede = cleanContent(a.content) || dek;
      base.location = "";
    }

    if (tier === "brief") {
      base.num = String(i - 6).padStart(2, "0");
    }

    return base;
  });
}

// ── Start ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
  The Daily Parallax
  ──────────────────────────────────
  Local:      http://localhost:${PORT}
  Sitemap:    http://localhost:${PORT}/sitemap.xml
  Robots:     http://localhost:${PORT}/robots.txt
  ──────────────────────────────────
`);
});

// Shared SVG icons + chart helpers for Parallax Research prototype
// Exposes: Icon, Sparkline, AreaChart, CandleChart, BarChart, TickerTape

const { useEffect, useRef, useState, useMemo } = React;

// ────────────────────────────────────────────────────────────
// Icons — minimal stroke icons in one consistent set
const ICONS = {
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4z"/></>,
  doc:     <><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h6M10 16h6"/></>,
  user:    <><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></>,
  star:    <><path d="m12 3 2.6 5.9 6.4.6-4.8 4.4 1.4 6.3L12 17l-5.6 3.2 1.4-6.3L3 9.5l6.4-.6z"/></>,
  bell:    <><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
  search:  <><circle cx="11" cy="11" r="6"/><path d="m20 20-4.3-4.3"/></>,
  calendar:<><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
  feed:    <><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 5a15 15 0 0 1 15 15"/><circle cx="5" cy="19" r="1.5"/></>,
  bookmark:<><path d="M6 4h12v17l-6-4-6 4z"/></>,
  plus:    <><path d="M12 5v14M5 12h14"/></>,
  arrow:   <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  check:   <><path d="m5 12 5 5L20 7"/></>,
  close:   <><path d="M6 6l12 12M6 18 18 6"/></>,
  filter:  <><path d="M4 5h16l-6 8v6l-4 2v-8z"/></>,
  chart:   <><path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 3 5-6"/></>,
  briefcase:<><rect x="3" y="7" width="18" height="13" rx="1"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/></>,
  pen:     <><path d="M14 4l6 6-10 10H4v-6z"/></>,
  share:   <><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4M8 13l8 4"/></>,
  sun:     <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
};

window.Icon = function Icon({ name, size = 16, color = "currentColor", stroke = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
};

// ────────────────────────────────────────────────────────────
// Charts (pure SVG, deterministic from a seed)
function seeded(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

window.Sparkline = function Sparkline({ seed = 1, width = 100, height = 28, trend = 1, stroke = "currentColor", fill = false }) {
  const pts = useMemo(() => {
    const r = seeded(seed);
    const n = 40;
    const arr = [];
    let v = 50;
    for (let i = 0; i < n; i++) {
      v += (r() - 0.5) * 8 + trend * 0.6;
      arr.push(v);
    }
    const min = Math.min(...arr), max = Math.max(...arr);
    return arr.map((y, i) => [ (i/(n-1))*width, height - ((y-min)/(max-min||1))*height ]);
  }, [seed, width, height, trend]);
  const d = "M " + pts.map(p => p.join(",")).join(" L ");
  const area = d + ` L ${width},${height} L 0,${height} Z`;
  return (
    <svg width={width} height={height} style={{display:"block"}}>
      {fill && <path d={area} fill={stroke} opacity="0.12"/>}
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
};

window.AreaChart = function AreaChart({ seed = 7, width = 560, height = 260, color = "var(--accent)", bg = "transparent" }) {
  const { pts, w, h, gridy } = useMemo(() => {
    const r = seeded(seed);
    const n = 80;
    const arr = [];
    let v = 100;
    for (let i = 0; i < n; i++) { v += (r() - 0.45) * 5 + 0.8; arr.push(v); }
    const min = Math.min(...arr), max = Math.max(...arr);
    const pts = arr.map((y, i) => [ (i/(n-1))*width, height - ((y-min)/(max-min||1))*(height-30) - 15 ]);
    return { pts, w: width, h: height, gridy: [0.25, 0.5, 0.75] };
  }, [seed, width, height]);
  const d = "M " + pts.map(p => p.join(",")).join(" L ");
  const area = d + ` L ${w},${h} L 0,${h} Z`;
  const id = "g"+seed;
  return (
    <svg width={w} height={h} style={{display:"block"}}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {bg !== "transparent" && <rect width={w} height={h} fill={bg}/>}
      {gridy.map(g => <line key={g} x1="0" x2={w} y1={h*g} y2={h*g} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2 4"/>)}
      <path d={area} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6"/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3.5" fill={color}/>
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="7" fill={color} opacity="0.2"/>
    </svg>
  );
};

window.CandleChart = function CandleChart({ seed = 3, width = 520, height = 300 }) {
  const candles = useMemo(() => {
    const r = seeded(seed);
    const n = 34;
    let close = 100;
    const arr = [];
    for (let i = 0; i < n; i++) {
      const o = close;
      const move = (r() - 0.45) * 6;
      const c = o + move;
      const h = Math.max(o, c) + r() * 2;
      const l = Math.min(o, c) - r() * 2;
      arr.push({ o, c, h, l });
      close = c;
    }
    const min = Math.min(...arr.map(d => d.l));
    const max = Math.max(...arr.map(d => d.h));
    const sx = width / n;
    const scale = y => height - ((y - min) / (max - min)) * (height - 20) - 10;
    return arr.map((d, i) => ({
      x: i * sx + sx/2,
      top: scale(d.h), bot: scale(d.l),
      oy: scale(d.o), cy: scale(d.c),
      up: d.c >= d.o,
      w: sx * 0.55
    }));
  }, [seed, width, height]);
  return (
    <svg width={width} height={height} style={{display:"block"}}>
      {[0.25, 0.5, 0.75].map(g => <line key={g} x1="0" x2={width} y1={height*g} y2={height*g} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2 4"/>)}
      {candles.map((d, i) => (
        <g key={i}>
          <line x1={d.x} x2={d.x} y1={d.top} y2={d.bot}
            stroke={d.up ? "var(--sage)" : "var(--claret)"} strokeWidth="1"/>
          <rect x={d.x - d.w/2} y={Math.min(d.oy, d.cy)}
            width={d.w} height={Math.max(2, Math.abs(d.cy - d.oy))}
            fill={d.up ? "var(--sage)" : "var(--claret)"}/>
        </g>
      ))}
    </svg>
  );
};

window.BarChart = function BarChart({ data, width = 420, height = 180, color = "var(--accent)" }) {
  const max = Math.max(...data.map(d => d.v));
  const bw = width / data.length - 6;
  return (
    <svg width={width} height={height} style={{display:"block"}}>
      {data.map((d, i) => {
        const h = (d.v / max) * (height - 36);
        return (
          <g key={i}>
            <rect x={i * (bw + 6)} y={height - h - 18} width={bw} height={h}
              fill={color} opacity={d.hi ? 1 : 0.35} rx="1"/>
            <text x={i * (bw + 6) + bw/2} y={height - 4}
              textAnchor="middle" fontSize="10"
              fontFamily="var(--font-mono)" fill="var(--ink-mute)">{d.l}</text>
          </g>
        );
      })}
    </svg>
  );
};

// Hero art — abstract "market moving" visual
window.HeroChart = function HeroChart() {
  return (
    <svg viewBox="0 0 600 400" style={{position:"absolute", inset:0, width:"100%", height:"100%"}}>
      {[80, 160, 240, 320].map(y => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#2B3447" strokeWidth="1" strokeDasharray="2 5"/>
      ))}
      <path d="M 30 300 Q 100 280 150 240 T 260 170 T 380 150 T 500 80 T 570 60"
        fill="none" stroke="#C88A5C" strokeWidth="2.5"/>
      <path d="M 30 300 Q 100 280 150 240 T 260 170 T 380 150 T 500 80 T 570 60 L 570 360 L 30 360 Z"
        fill="#C88A5C" opacity="0.15"/>
      <path d="M 30 340 Q 120 320 180 310 T 290 270 T 400 250 T 520 220 T 570 200"
        fill="none" stroke="#6B7588" strokeWidth="1.5" strokeDasharray="3 3"/>
      <circle cx="500" cy="80" r="5" fill="#C88A5C"/>
      <circle cx="500" cy="80" r="12" fill="#C88A5C" opacity="0.25"/>
      <text x="510" y="76" fontSize="11" fontFamily="var(--font-mono)" fill="#F6F2EA">+42.8%</text>
      {/* annotations */}
      <g fontFamily="var(--font-mono)" fontSize="9" fill="#7A8497">
        <text x="30" y="380">09:30</text>
        <text x="290" y="380" textAnchor="middle">12:00</text>
        <text x="560" y="380" textAnchor="end">16:00</text>
      </g>
    </svg>
  );
};

// Moving-photo component — Harry-Potter-style animated scenes
// No video needed; CSS parallax of SVG/gradient "scenes" keyed by sceneId

const { useEffect: uEff, useRef: uRef, useState: uSt } = React;

// Deterministic pseudo-random
function rng(seed) {
  let s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// A palette of cinematic "scenes" — abstract, newsy, mood-based
// Each returns SVG markup with embedded <animate>/transforms.
const SCENES = {
  city: (seed) => {
    const r = rng(seed);
    const windows = Array.from({length: 60}, (_, i) => ({
      x: 20 + (i % 15) * 22 + r()*4,
      y: 120 + Math.floor(i / 15) * 28 + r()*3,
      lit: r() > 0.5,
      delay: r() * 4,
    }));
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <defs>
          <linearGradient id={`sky-${seed}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="#2a2135"/>
            <stop offset="60%" stopColor="#5b3a2e"/>
            <stop offset="100%" stopColor="#c88a5c"/>
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill={`url(#sky-${seed})`}/>
        {/* slow cloud drift */}
        <g opacity="0.35">
          <ellipse cx="80" cy="40" rx="60" ry="10" fill="#e8d4b8">
            <animate attributeName="cx" values="-60;460" dur="40s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="260" cy="28" rx="80" ry="8" fill="#e8d4b8">
            <animate attributeName="cx" values="-120;520" dur="55s" repeatCount="indefinite"/>
          </ellipse>
        </g>
        {/* skyline */}
        <g>
          <rect x="0"   y="110" width="50"  height="115" fill="#0e0a06"/>
          <rect x="50"  y="90"  width="70"  height="135" fill="#151009"/>
          <rect x="120" y="70"  width="40"  height="155" fill="#0a0805"/>
          <rect x="160" y="100" width="60"  height="125" fill="#1a130a"/>
          <rect x="220" y="60"  width="50"  height="165" fill="#0e0a06"/>
          <rect x="270" y="85"  width="80"  height="140" fill="#15100a"/>
          <rect x="350" y="95"  width="50"  height="130" fill="#0a0805"/>
        </g>
        {/* lit windows twinkling */}
        {windows.map((w, i) => w.lit && (
          <rect key={i} x={w.x} y={w.y} width="4" height="5" fill="#f4d28a">
            <animate attributeName="opacity" values="1;0.3;1" dur={`${2 + w.delay}s`} repeatCount="indefinite"/>
          </rect>
        ))}
        {/* moving car lights */}
        <g>
          <circle cx="0" cy="210" r="2.2" fill="#fff2c0">
            <animate attributeName="cx" values="-20;420" dur="9s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="212" r="1.5" fill="#ffb46b">
            <animate attributeName="cx" values="420;-20" dur="11s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    );
  },

  markets: (seed) => {
    const r = rng(seed);
    const pts = Array.from({length: 40}, (_, i) => [i * 10, 100 + Math.sin(i * 0.4 + r()*3) * 20 + r()*15 - 7]);
    const d = "M " + pts.map(p => p.join(",")).join(" L ");
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <rect width="400" height="225" fill="#0f0d08"/>
        {/* grid */}
        {[45, 90, 135, 180].map(y => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#2a2115" strokeDasharray="2 4"/>
        ))}
        {[80,160,240,320].map(x => (
          <line key={x} x1={x} x2={x} y1="0" y2="225" stroke="#2a2115" strokeDasharray="2 4"/>
        ))}
        {/* ticker streams */}
        {[0,1,2].map(row => {
          const yy = 30 + row * 60;
          return (
            <g key={row}>
              <text x="0" y={yy} fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#c88a5c" opacity="0.5">
                NIKKEI 39412 ▲ 0.84%  HSI 17204 ▼ 0.22%  KOSPI 2678 ▲ 1.10%  STI 3344 ▲ 0.30%  SENSEX 74218 ▲ 0.62%  ASX 7812 ▼ 0.15%
                <animate attributeName="x" values="400;-800" dur={`${22 + row * 4}s`} repeatCount="indefinite"/>
              </text>
            </g>
          );
        })}
        {/* main chart */}
        <path d={d + " L 400,225 L 0,225 Z"} fill="#c88a5c" opacity="0.18"/>
        <path d={d} fill="none" stroke="#e8a770" strokeWidth="2">
          <animate attributeName="stroke-dasharray" values="0 2000;2000 0" dur="6s" repeatCount="indefinite"/>
        </path>
        <circle r="4" fill="#fff2c0">
          <animateMotion dur="6s" repeatCount="indefinite" path={d}/>
        </circle>
      </svg>
    );
  },

  politics: (seed) => {
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <defs>
          <linearGradient id={`pol-${seed}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="#2d2116"/>
            <stop offset="100%" stopColor="#0d0906"/>
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill={`url(#pol-${seed})`}/>
        {/* columns */}
        <g>
          {[60, 120, 180, 240, 300].map(x => (
            <g key={x}>
              <rect x={x-10} y="60" width="20" height="140" fill="#1a1208"/>
              <rect x={x-14} y="55" width="28" height="8" fill="#221810"/>
              <rect x={x-14} y="198" width="28" height="8" fill="#221810"/>
            </g>
          ))}
        </g>
        {/* pediment */}
        <polygon points="30,60 370,60 350,30 50,30" fill="#1a1208"/>
        <line x1="30" y1="60" x2="370" y2="60" stroke="#c88a5c" strokeWidth="1.5" opacity="0.6"/>
        {/* flag waving */}
        <g transform="translate(200,10)">
          <rect x="-1" y="0" width="2" height="200" fill="#c88a5c"/>
          <path d="M 1 10 Q 25 15 50 10 T 100 10 L 100 40 Q 75 45 50 40 T 1 40 Z" fill="#c88a5c">
            <animate attributeName="d"
              values="M 1 10 Q 25 15 50 10 T 100 10 L 100 40 Q 75 45 50 40 T 1 40 Z;
                      M 1 10 Q 25 5 50 12 T 100 8 L 100 38 Q 75 42 50 32 T 1 40 Z;
                      M 1 10 Q 25 15 50 10 T 100 10 L 100 40 Q 75 45 50 40 T 1 40 Z"
              dur="3s" repeatCount="indefinite"/>
          </path>
        </g>
        {/* spotlights */}
        <ellipse cx="200" cy="220" rx="180" ry="40" fill="#c88a5c" opacity="0.1"/>
      </svg>
    );
  },

  tech: (seed) => {
    const r = rng(seed);
    const nodes = Array.from({length: 18}, () => [r()*400, r()*225]);
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <rect width="400" height="225" fill="#0a0d12"/>
        {/* pulsing network */}
        {nodes.map((a, i) =>
          nodes.slice(i+1).map(([bx, by], j) => {
            const [ax, ay] = a;
            const dist = Math.hypot(ax-bx, ay-by);
            if (dist > 90) return null;
            return (
              <line key={`${i}-${j}`} x1={ax} y1={ay} x2={bx} y2={by}
                stroke="#c88a5c" strokeOpacity="0.25" strokeWidth="0.8">
                <animate attributeName="stroke-opacity"
                  values="0.1;0.5;0.1" dur={`${2 + (i % 4)}s`} repeatCount="indefinite"/>
              </line>
            );
          })
        )}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2.5" fill="#e8a770"/>
            <circle cx={x} cy={y} r="6" fill="none" stroke="#e8a770" strokeOpacity="0.4">
              <animate attributeName="r" values="2;12;2" dur={`${2 + (i%3)}s`} repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur={`${2 + (i%3)}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
        {/* data stream */}
        <text x="0" y="15" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#c88a5c" opacity="0.4">
          01001110 01000101 01010111 01010011  11010110 00101011 01011010
          <animate attributeName="x" values="400;-600" dur="25s" repeatCount="indefinite"/>
        </text>
      </svg>
    );
  },

  nature: (seed) => {
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <defs>
          <linearGradient id={`nat-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#4b5a3c"/>
            <stop offset="55%" stopColor="#2a3321"/>
            <stop offset="100%" stopColor="#1a1f14"/>
          </linearGradient>
        </defs>
        <rect width="400" height="225" fill={`url(#nat-${seed})`}/>
        {/* sun */}
        <circle cx="320" cy="55" r="22" fill="#f4d28a" opacity="0.8">
          <animate attributeName="opacity" values="0.7;0.95;0.7" dur="5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="320" cy="55" r="40" fill="#f4d28a" opacity="0.12"/>
        {/* mountains */}
        <polygon points="0,160 100,90 170,140 250,70 330,130 400,100 400,225 0,225" fill="#1a1f14"/>
        <polygon points="0,180 80,130 160,170 240,120 320,165 400,140 400,225 0,225" fill="#0f130a"/>
        {/* drifting mist */}
        <ellipse cx="100" cy="150" rx="120" ry="8" fill="#e8d4b8" opacity="0.15">
          <animate attributeName="cx" values="-100;500" dur="30s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="280" cy="175" rx="100" ry="6" fill="#e8d4b8" opacity="0.12">
          <animate attributeName="cx" values="500;-100" dur="40s" repeatCount="indefinite"/>
        </ellipse>
        {/* birds */}
        <g fill="none" stroke="#1a1f14" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 0 80 q 3 -3 6 0 q 3 -3 6 0">
            <animateTransform attributeName="transform" type="translate"
              values="-20 0;420 -30" dur="28s" repeatCount="indefinite"/>
          </path>
          <path d="M 0 95 q 3 -3 6 0 q 3 -3 6 0">
            <animateTransform attributeName="transform" type="translate"
              values="-50 0;420 -50" dur="35s" repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    );
  },

  sports: (seed) => {
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <rect width="400" height="225" fill="#1a3020"/>
        {/* field lines */}
        {[0, 100, 200, 300, 400].map(x => (
          <line key={x} x1={x} x2={x} y1="0" y2="225" stroke="#2a4330" strokeWidth="1"/>
        ))}
        <rect x="140" y="50" width="120" height="125" fill="none" stroke="#c9d4b8" strokeWidth="1.5"/>
        <circle cx="200" cy="112" r="30" fill="none" stroke="#c9d4b8" strokeWidth="1.5"/>
        {/* stadium lights */}
        <g>
          <circle cx="50" cy="20" r="3" fill="#f4d28a"/>
          <circle cx="50" cy="20" r="40" fill="#f4d28a" opacity="0.08"/>
          <circle cx="350" cy="20" r="3" fill="#f4d28a"/>
          <circle cx="350" cy="20" r="40" fill="#f4d28a" opacity="0.08"/>
        </g>
        {/* running ball */}
        <circle r="5" fill="#f4d28a" stroke="#1a1208" strokeWidth="1">
          <animateMotion dur="4s" repeatCount="indefinite"
            path="M 50 180 Q 150 80 250 140 Q 320 200 50 180"/>
        </circle>
        {/* player silhouettes */}
        <g fill="#0d1a10">
          <ellipse cx="120" cy="150" rx="5" ry="10">
            <animate attributeName="cx" values="120;280;120" dur="6s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="280" cy="160" rx="5" ry="10">
            <animate attributeName="cx" values="280;150;280" dur="7s" repeatCount="indefinite"/>
          </ellipse>
        </g>
      </svg>
    );
  },

  science: (seed) => {
    return (
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%"}}>
        <rect width="400" height="225" fill="#0a0612"/>
        {/* stars */}
        {Array.from({length: 40}, (_, i) => {
          const r = rng(seed + i);
          return <circle key={i} cx={r()*400} cy={r()*225} r="0.8" fill="#e8d4b8" opacity={0.4 + r()*0.6}>
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + (i%4)}s`} repeatCount="indefinite"/>
          </circle>;
        })}
        {/* orbiting atom */}
        <g transform="translate(200,112)">
          <circle r="8" fill="#c88a5c"/>
          <ellipse rx="70" ry="20" fill="none" stroke="#c88a5c" strokeOpacity="0.4" strokeWidth="1"/>
          <ellipse rx="70" ry="20" fill="none" stroke="#c88a5c" strokeOpacity="0.4" strokeWidth="1" transform="rotate(60)"/>
          <ellipse rx="70" ry="20" fill="none" stroke="#c88a5c" strokeOpacity="0.4" strokeWidth="1" transform="rotate(120)"/>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
            <circle cx="70" cy="0" r="3" fill="#e8a770"/>
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="60" to="420" dur="8s" repeatCount="indefinite"/>
            <circle cx="70" cy="0" r="3" fill="#e8a770"/>
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="120" to="480" dur="10s" repeatCount="indefinite"/>
            <circle cx="70" cy="0" r="3" fill="#e8a770"/>
          </g>
        </g>
      </svg>
    );
  },
};

window.MovingPhoto = function MovingPhoto({ scene = "city", seed = 1, caption, className = "", src }) {
  const { useState: uStMP } = React;
  const [imgError, setImgError] = uStMP(false);
  const Render = SCENES[scene] || SCENES.city;
  const showReal = src && !imgError;

  return (
    <>
      <div className={"photo " + className} style={showReal ? {border: "8px solid var(--ink)"} : {}}>
        {showReal ? (
          <img
            src={src}
            alt={caption || ""}
            onError={() => setImgError(true)}
            style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}}
          />
        ) : (
          Render(seed)
        )}
      </div>
      {caption && (
        <div className="photo-caption">
          <span>{caption}</span>
          {!showReal && <span className="mov"><span className="blink"/> MOVING IMAGE</span>}
        </div>
      )}
    </>
  );
};

window.SCENE_KEYS = Object.keys(SCENES);

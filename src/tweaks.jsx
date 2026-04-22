// Parallax Research — Tweaks panel (wired to edit-mode host)

window.Tweaks = function Tweaks({ tw, setTw }) {
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    function onMsg(e) {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setOn(true);
      if (d.type === "__deactivate_edit_mode") setOn(false);
    }
    window.addEventListener("message", onMsg);
    window.parent.postMessage({type: "__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function set(k, v) {
    const next = { ...tw, [k]: v };
    setTw(next);
    window.parent.postMessage({type: "__edit_mode_set_keys", edits: { [k]: v }}, "*");
  }

  if (!on) return null;

  const accents = [
    { id: "copper", v: "oklch(0.62 0.11 55)",  v2: "oklch(0.52 0.11 55)",  ink: "oklch(0.30 0.08 55)" },
    { id: "indigo", v: "oklch(0.55 0.14 270)", v2: "oklch(0.45 0.14 270)", ink: "oklch(0.30 0.10 270)" },
    { id: "forest", v: "oklch(0.55 0.10 150)", v2: "oklch(0.45 0.10 150)", ink: "oklch(0.30 0.08 150)" },
    { id: "claret", v: "oklch(0.52 0.14 25)",  v2: "oklch(0.42 0.14 25)",  ink: "oklch(0.30 0.10 25)" },
  ];

  return (
    <div className="tweaks">
      <h4><span className="led"/> Tweaks</h4>

      <div className="tweak-row">
        <label>Theme</label>
        <div className="seg">
          <button className={tw.theme === "light" ? "on" : ""} onClick={() => set("theme", "light")}>Light</button>
          <button className={tw.theme === "dark"  ? "on" : ""} onClick={() => set("theme", "dark")}>Dark</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Accent</label>
        <div className="swatch-row">
          {accents.map(a => (
            <button key={a.id}
              className={"swatch" + (tw.accent === a.id ? " active" : "")}
              style={{background: a.v}}
              onClick={() => set("accent", a.id)}/>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>Display font</label>
        <div className="seg">
          <button className={tw.display === "serif"   ? "on" : ""} onClick={() => set("display", "serif")}>Serif</button>
          <button className={tw.display === "grotesk" ? "on" : ""} onClick={() => set("display", "grotesk")}>Grotesk</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Density</label>
        <div className="seg">
          <button className={tw.density === "airy"    ? "on" : ""} onClick={() => set("density", "airy")}>Airy</button>
          <button className={tw.density === "default" ? "on" : ""} onClick={() => set("density", "default")}>Default</button>
          <button className={tw.density === "dense"   ? "on" : ""} onClick={() => set("density", "dense")}>Dense</button>
        </div>
      </div>

      <div className="tweak-row">
        <label>Brand name</label>
        <input
          value={tw.brand}
          onChange={e => set("brand", e.target.value)}
          style={{
            width: 140, background:"var(--paper-2)", border:"1px solid var(--rule-soft)",
            borderRadius: 4, padding: "4px 8px", font:"inherit", fontSize: 12, color:"var(--ink)"
          }}/>
      </div>

      <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"var(--ink-mute)", letterSpacing:"0.12em", marginTop:10, paddingTop:10, borderTop:"1px solid var(--rule-soft)"}}>
        CHANGES PERSIST ACROSS RELOADS
      </div>
    </div>
  );
};

// Apply tweaks to :root
window.applyTweaks = function applyTweaks(tw) {
  const root = document.documentElement;
  root.dataset.theme = tw.theme;

  const accents = {
    copper: { v: "oklch(0.62 0.11 55)",  v2: "oklch(0.52 0.11 55)",  ink: "oklch(0.30 0.08 55)" },
    indigo: { v: "oklch(0.55 0.14 270)", v2: "oklch(0.45 0.14 270)", ink: "oklch(0.30 0.10 270)" },
    forest: { v: "oklch(0.55 0.10 150)", v2: "oklch(0.45 0.10 150)", ink: "oklch(0.30 0.08 150)" },
    claret: { v: "oklch(0.52 0.14 25)",  v2: "oklch(0.42 0.14 25)",  ink: "oklch(0.30 0.10 25)" },
  }[tw.accent] || {};
  if (accents.v)   root.style.setProperty("--accent", accents.v);
  if (accents.v2)  root.style.setProperty("--accent-2", accents.v2);
  if (accents.ink) root.style.setProperty("--accent-ink", accents.ink);

  root.style.setProperty("--font-serif-display",
    tw.display === "serif"
      ? `"Source Serif 4", Georgia, serif`
      : `"Inter Tight", system-ui, sans-serif`);

  const dens = { airy: 1.2, default: 1, dense: 0.82 }[tw.density] || 1;
  root.style.setProperty("--density", dens);

  // density affects padding scale
  document.querySelectorAll(".page").forEach(el => {
    el.style.padding = `${36*dens}px ${40*dens}px 80px`;
  });

  // brand name
  const bn = document.querySelector(".brand-name");
  if (bn && tw.brand) bn.textContent = tw.brand;
};

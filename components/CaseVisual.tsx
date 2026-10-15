import type { CaseStudy } from "@/lib/content";

/** Case-specific illustrations, drawn with HTML/CSS (they scale with container query units). */
export function CaseVisual({ cs, big = false }: { cs: CaseStudy; big?: boolean }) {
  const cls = `g-case__media g-cm${big ? " g-case__media--big" : ""}`;
  const l = cs.labels;
  if (cs.visual === "timeline") {
    const axis = l.axis.split("|");
    const rows = [false, true, false, true];
    return (
      <div className={cls} aria-hidden="true">
        <div className="g-blob g-blob--1" />
        <div className="g-blob g-blob--2" />
        <div className="g-tl">
          <div className="g-tl-axis">
            {axis.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
          {rows.map((iterated, i) => (
            <div key={i} className="g-tl-row" style={{ ["--d" as string]: `${(i * 0.18).toFixed(2)}s` }}>
              <span className="g-tl-name">
                {l.product} {i + 1}
              </span>
              <div className="g-tl-track">
                <span className="g-tl-line" />
                {["0%", "33%", "66%", "100%"].map((x, k) => (
                  <span key={x} className={k === 3 ? "g-tl-dot g-tl-dot--end" : "g-tl-dot"} style={{ ["--x" as string]: x }} />
                ))}
                {iterated && <span className="g-tl-loop">{l.iterate}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={cls} aria-hidden="true">
      <div className="g-blob g-blob--1" />
      <div className="g-blob g-blob--3" />
      <div className="g-win g-win--a">
        <div className="g-win__bar">
          <i />
          <i />
          <i />
          <span className="g-win__url">{l.appUrl}</span>
        </div>
        <div className="g-win__body g-w-app">
          <div className="g-w-side">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={i < 3 ? "g-w-lesson is-done" : "g-w-lesson"} />
            ))}
          </div>
          <div className="g-w-main">
            <span className="g-w-h" />
            <span className="g-w-video" />
            <span className="g-w-prog">
              <i />
            </span>
            <div className="g-w-row">
              <span className="g-w-pay">{l.pay}</span>
              <span className="g-w-badge">{l.students}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="g-win g-win--b">
        <div className="g-win__bar">
          <i />
          <i />
          <i />
          <span className="g-win__url">{l.siteUrl}</span>
        </div>
        <div className="g-win__body g-w-site">
          <div className="g-w-nav">
            <b />
            <span />
            <span />
            <span />
          </div>
          <span className="g-w-hero" />
          <span className="g-w-hero g-w-hero--short" />
          <span className="g-w-cta" />
          <div className="g-w-cards">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="g-w-card">
                <i />
                <b />
                <b />
              </span>
            ))}
          </div>
        </div>
        <span className="g-w-geo">{l.geo}</span>
      </div>
    </div>
  );
}

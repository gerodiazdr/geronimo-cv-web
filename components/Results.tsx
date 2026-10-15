import type { Content, ShapeKind } from "@/lib/content";
import { Shape } from "./Shape";

const KINDS: ShapeKind[] = ["diamond", "quarter", "tri", "sq", "circ"];

function layerPoints(k: number) {
  const t0 = k / 5, t1 = (k + 1) / 5;
  const x0 = ((1 - (1 - 0.7 * t0)) / 2) * 100, x1 = ((1 - (1 - 0.7 * t1)) / 2) * 100;
  const y0 = t0 * 100 + 0.6, y1 = t1 * 100 - 0.6;
  return `${x0.toFixed(2)},${y0.toFixed(2)} ${(100 - x0).toFixed(2)},${y0.toFixed(2)} ${(100 - x1).toFixed(2)},${y1.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`;
}

/** "From first touch to revenue": shapes fall through the funnel while the metrics count up. */
export function Results({ c }: { c: Content }) {
  const t = c.ui.results;
  const layers = t.layers.split("|");
  return (
    <section id="results" className="g-funnel" aria-labelledby="res-title">
      <div className="g-sticky">
        <div className="g-wrap g-funnel__inner">
          <div className="g-sec-head">
            <h2 id="res-title" className="g-h2">
              {t.title}
            </h2>
            <p className="g-sub">{t.sub}</p>
          </div>
          <div className="g-funnel__grid">
            <div className="g-funnel__box" aria-hidden="true">
              <svg className="g-funnel__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {layers.map((_, k) => (
                  <polygon key={k} className="g-funnel__layer" points={layerPoints(k)} />
                ))}
              </svg>
              {layers.map((l, k) => (
                <span key={l} className="g-funnel__label" style={{ top: `${(k + 0.5) * 20}%` }}>
                  {l}
                </span>
              ))}
              <div className="g-drops">
                {Array.from({ length: 18 }, (_, i) => (
                  <div key={i} className="g-drop">
                    <Shape kind={KINDS[i % 5]} gradient={i % 3 === 0 ? "gHot" : "gPastel"} />
                  </div>
                ))}
              </div>
            </div>
            <div className="g-metrics">
              {c.metrics.map((m) => (
                <div key={m.text} className="g-metric glass">
                  <div className="g-metric__num g-grad-text">
                    {/* Final value is rendered on the server; the engine animates it when the section is reached. */}
                    <span data-count={m.value} data-prefix={m.prefix} data-suffix={m.suffix}>
                      {m.prefix}
                      {m.value}
                      {m.suffix}
                    </span>
                  </div>
                  <p>{m.text}</p>
                  <span className="g-mono">{m.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Content } from "@/lib/content";

/** Illustrative AI GTM workflow: nodes light up and a pulse travels between them as you scroll. */
export function AiFlow({ c }: { c: Content }) {
  const t = c.ui.ai;
  const nodes = c.ai.nodes;
  return (
    <section id="ai" className="g-ai" aria-labelledby="ai-title">
      <div className="g-sticky">
        <div className="g-wrap g-ai__inner">
          <div className="g-sec-head">
            <h2 id="ai-title" className="g-h2">
              {t.title}
            </h2>
            <p className="g-sub">{t.sub}</p>
          </div>
          <div className="g-ai__flow">
            <svg className="g-ai__svg" aria-hidden="true">
              {nodes.slice(1).map((_, i) => (
                <path key={i} className="g-link" pathLength={1} />
              ))}
            </svg>
            <div className="g-packet" aria-hidden="true" />
            {nodes.map(([step, title, tool], i) => (
              <div key={step} className="g-node">
                <span className="g-node__dot" />
                <span className="g-mono">
                  {String(i + 1).padStart(2, "0")} · {step}
                </span>
                <strong>{title}</strong>
                <span className="g-node__tool">{tool}</span>
              </div>
            ))}
          </div>
          <div className="g-ai__log glass">
            <span className="g-mono">{t.logLabel}</span>
            <ul>
              {c.ai.log.map((line) => (
                <li key={line} className="g-log">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

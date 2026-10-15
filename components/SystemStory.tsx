import { companiesForStage, type Content } from "@/lib/content";
import { Shape } from "./Shape";

/** Pinned on desktop (the engine crossfades the panels); stacked cards on phones. */
export function SystemStory({ c }: { c: Content }) {
  const t = c.ui.story;
  return (
    <section id="system" className="g-story" aria-labelledby="sys-title">
      <div className="g-story__sticky">
        <div className="g-story__inner">
          <div className="g-story__index">
            <div className="g-track" aria-hidden="true">
              <div className="g-fill" />
            </div>
            <div className="g-story__list">
              <h2 id="sys-title" className="g-story__title">
                {t.title}
              </h2>
              <ol className="g-stages">
                {c.stages.map((s) => (
                  <li key={s.id} className="g-stage">
                    <span className="g-slot" aria-hidden="true" />
                    <span className="g-mono">{s.n}</span>
                    <span className="g-verb">{s.verb}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="g-panels">
            {c.stages.map((s) => (
              <article key={s.id} className="g-panel glass">
                <div className="g-panel__head">
                  <span className="g-panel__shape">
                    <Shape kind={s.shape} gradient="gPastel" />
                  </span>
                  <div>
                    <span className="g-mono">
                      {s.n} · {s.verb}
                    </span>
                    <h3 className="g-panel__name">{s.name}</h3>
                  </div>
                </div>
                <p className="g-panel__desc">{s.desc}</p>
                <ul className="g-chips" aria-label={`${s.name} ${t.tools}`}>
                  {s.tools.map((tool) => (
                    <li key={tool} className="g-chip">
                      {tool}
                    </li>
                  ))}
                </ul>
                <div className="g-used">
                  <span className="g-used__label">{t.usedAt}</span>
                  <ul className="g-chips">
                    {companiesForStage(c, s.id).map((co) => (
                      <li key={co} className="g-chip g-chip--dark">
                        {co}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

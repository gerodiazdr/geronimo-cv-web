import type { Content } from "@/lib/content";
import { CaseVisual } from "./CaseVisual";

export function Work({ c }: { c: Content }) {
  const t = c.ui.work;
  return (
    <section id="work" className="g-work" aria-labelledby="work-title">
      <div className="g-wrap">
        <div className="g-sec-head">
          <h2 id="work-title" className="g-h2">
            {t.title}
          </h2>
          <p className="g-sub">{t.sub}</p>
        </div>
        <div className="g-cases">
          {c.cases.map((cs, i) => (
            <article key={cs.id} className="g-case glass" data-index={i}>
              <CaseVisual cs={cs} />
              <div className="g-case__body">
                <span className="g-mono">{cs.tag}</span>
                <h3 className="g-case__title">{cs.title}</h3>
                <p>{cs.one}</p>
                <button type="button" className="g-btn g-btn--dark g-btn--sm" data-action="open-case" data-index={i}>
                  {t.read}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full-screen case view. Lives outside the content layer so it covers the nav; opened by the engine. */
export function CaseOverlay({ c }: { c: Content }) {
  const t = c.ui.work;
  return (
    <div className="g-case-overlay" role="dialog" aria-modal="true" aria-label={t.dialog}>
      <button type="button" className="g-case-close" data-action="close-case" aria-label={t.close}>
        ×
      </button>
      {c.cases.map((cs, i) => (
        <article key={cs.id} className="g-case-full" data-case={i} hidden>
          <CaseVisual cs={cs} big />
          <div className="g-case-full__body">
            <span className="g-mono">{cs.tag}</span>
            <h2 className="g-case-full__title">{cs.title}</h2>
            <div className="g-case-full__cols">
              <div>
                <h4>{t.context}</h4>
                <p>{cs.context}</p>
              </div>
              <div>
                <h4>{t.did}</h4>
                <ul>
                  {cs.did.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="g-case-full__res">
                <h4>{t.results}</h4>
                <ul>
                  {cs.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

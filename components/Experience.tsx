import type { CSSProperties } from "react";
import type { Content } from "@/lib/content";

/** Recent roles stack on top of each other as you scroll (CSS sticky); earlier roles follow as a list. */
export function Experience({ c }: { c: Content }) {
  const featured = c.roles.slice(0, 3);
  const earlier = c.roles.slice(3);
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section__title">
        {c.ui.experience.title}
      </h2>

      <div className="stack">
        {featured.map((r, i) => (
          <article key={r.id} className="stack__card glass" style={{ "--i": i } as CSSProperties}>
            <div className="stack__meta">
              <span className="stack__year grad-text">{r.year}</span>
              <h3 className="stack__company">{r.company}</h3>
              <span className="stack__role">{r.role}</span>
              <span className="mono">{r.dates}</span>
            </div>
            <ul className="stack__bullets">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="earlier glass">
        <h3 className="earlier__title">{c.ui.experience.earlier}</h3>
        <ul className="earlier__list">
          {earlier.map((r) => (
            <li key={r.id} className="earlier__row">
              <span className="mono earlier__year">{r.year}</span>
              <span className="earlier__company">{r.company}</span>
              <span className="earlier__role">{r.role}</span>
              <span className="earlier__summary">{r.bullets[0]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

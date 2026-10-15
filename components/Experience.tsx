import type { Content, Role } from "@/lib/content";

function RoleCard({ r, lane }: { r: Role; lane: "a" | "b" | "m" }) {
  return (
    <article className="g-exp-item g-exp-card glass" data-lane={lane}>
      <span className="g-mono">{r.dates}</span>
      <h3 className="g-exp-card__co">{r.company}</h3>
      <span className="g-exp-card__role">{r.role}</span>
      <ul>
        {r.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

/** Timeline drawn with scroll: two parallel lanes (Ingenii + Tekne, same group) that merge into one. */
export function Experience({ c }: { c: Content }) {
  const t = c.ui.experience;
  const byId = Object.fromEntries(c.roles.map((r) => [r.id, r]));
  const earlier = c.roles.slice(3);
  const dots = 3 + earlier.length;
  return (
    <section id="experience" className="g-exp" aria-labelledby="exp-title">
      <div className="g-wrap">
        <div className="g-sec-head">
          <h2 id="exp-title" className="g-h2">
            {t.title}
          </h2>
          <p className="g-sub">{t.sub}</p>
        </div>
        <div className="g-exp__body">
          <svg className="g-exp__svg" aria-hidden="true">
            <path className="g-lane g-lane-a" pathLength={1} />
            <path className="g-lane g-lane-b" pathLength={1} />
            <path className="g-lane g-lane-main" pathLength={1} />
            {Array.from({ length: dots }, (_, i) => (
              <circle key={i} className="g-exp-dot" r={6} />
            ))}
          </svg>
          <div className="g-exp-group">
            <div className="g-exp-group__head">
              <span className="g-mono">{t.group}</span>
              <span className="g-exp-group__lanes">
                <b>Ingenii</b> {t.lanesProducts} · <b>Tekne</b> {t.lanesServices}
              </span>
            </div>
            <div className="g-exp-group__cards">
              <RoleCard r={byId.ingenii} lane="a" />
              <RoleCard r={byId.tekne} lane="b" />
            </div>
          </div>
          <RoleCard r={byId.rockindev} lane="m" />
          <div className="g-exp-earlier">
            <h3 className="g-exp-earlier__title">{t.earlier}</h3>
            {earlier.map((r) => (
              <div key={r.id} className="g-exp-item g-exp-row" data-lane="m">
                <span className="g-mono">{r.year}</span>
                <span className="g-exp-row__co">{r.company}</span>
                <span className="g-exp-row__role">{r.role}</span>
                <span className="g-exp-row__sum">{r.bullets[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

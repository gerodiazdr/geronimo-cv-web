import { Fragment } from "react";
import type { CaseStudy, OfficeDetail } from "@/lib/content";

// The stations run in rows of five (matches .g-oo-grid); the folder wraps from the end of one row to the start of the next.
const PER_ROW = 5;

function Next({ wrap = false }: { wrap?: boolean }) {
  return (
    <span className={wrap ? "g-oo-next g-oo-next--wrap" : "g-oo-next"} aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </span>
  );
}

/** Card extras for the featured case: headline numbers, what it reads and where it ships. */
export function OfficeHighlights({ office, labels }: { office: OfficeDetail; labels: CaseStudy["labels"] }) {
  return (
    <>
      <ul className="g-oo-stats">
        {office.stats.map((s) => (
          <li key={s.value} className="g-oo-stat">
            <b>{s.value}</b>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
      <div className="g-oo-chiprow">
        <span className="g-mono">{labels.sources}</span>
        <ul className="g-oo-chips">
          {office.sources.map((s) => (
            <li key={s} className="g-oo-chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="g-oo-chiprow">
        <span className="g-mono">{labels.channels}</span>
        <ul className="g-oo-chips">
          {office.channels.map((s) => (
            <li key={s} className="g-oo-chip g-oo-chip--out">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** How the Content floor works: where the signals come from, then each station, what it does and what it hands on. */
export function OfficeFlow({ flow }: { flow: OfficeDetail["flow"] }) {
  const last = flow.rooms.length - 1;
  const kindLabel = { agent: flow.legend.agent, robot: flow.legend.robot };
  return (
    <section className="g-oo-panel glass" aria-labelledby="oo-flow-title">
      <div className="g-oo-head">
        <div>
          <h3 id="oo-flow-title" className="g-oo-title">
            {flow.title}
          </h3>
          <p className="g-oo-sub">{flow.sub}</p>
        </div>
        <ul className="g-oo-legend">
          <li>
            <span className="g-oo-mk g-oo-mk--agent" aria-hidden="true" />
            {flow.legend.agent}
          </li>
          <li>
            <span className="g-oo-mk g-oo-mk--robot" aria-hidden="true" />
            {flow.legend.robot}
          </li>
          <li>
            <span className="g-oo-out">{flow.legend.givesSample}</span>
            {flow.legend.gives}
          </li>
        </ul>
      </div>
      <div className="g-oo-scroll">
        <div className="g-oo-flow">
          <div className="g-oo-sources">
            <span className="g-mono">{flow.sourcesTitle}</span>
            <div className="g-oo-sources__grid">
              {flow.sourceGroups.map((g) => (
                <div key={g.name} className="g-oo-src">
                  <div className="g-oo-src__head">
                    <strong>{g.name}</strong>
                    <span className="g-mono">{g.feeds}</span>
                  </div>
                  <ul className="g-oo-chips">
                    {g.items.map((it) => (
                      <li key={it} className="g-oo-chip">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="g-oo-baseline">{flow.baseline}</p>
          </div>
          <div className="g-oo-signal" aria-hidden="true">
            <svg width="12" height="26" viewBox="0 0 12 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 1v22M1 18l5 5 5-5" />
            </svg>
            <span className="g-mono">{flow.signals}</span>
          </div>
          <ol className="g-oo-grid">
            {flow.rooms.map((room, i) => (
              <Fragment key={room.name}>
                {i > 0 && i % PER_ROW === 0 && (
                  <li className="g-oo-wrap" aria-hidden="true">
                    <i />
                    <i>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1l5 5 5-5" />
                      </svg>
                    </i>
                  </li>
                )}
                <li className={room.roles.some((r) => r.kind === "person") ? "g-oo-tile g-oo-tile--you" : "g-oo-tile"}>
                  <span className="g-oo-num">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="g-oo-room">{room.name}</h4>
                  {room.roles.map((r) => (
                    <div key={r.name} className="g-oo-role">
                      <span className="g-oo-role__name">
                        {r.kind !== "person" && <span className={`g-oo-mk g-oo-mk--${r.kind}`} role="img" aria-label={kindLabel[r.kind]} />}
                        {r.name}
                      </span>
                      <span className="g-oo-role__does">{r.does}</span>
                      <span className="g-oo-out">
                        <span aria-hidden="true">→ </span>
                        {r.gives}
                      </span>
                    </div>
                  ))}
                  {room.note && <span className="g-oo-tile__note">{room.note}</span>}
                  {i < last && <Next wrap={(i + 1) % PER_ROW === 0} />}
                </li>
              </Fragment>
            ))}
          </ol>
        </div>
      </div>
      <div className="g-oo-rules">
        <span className="g-mono">{flow.rulesLabel}</span>
        <ul>
          {flow.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <p className="g-oo-note">{flow.sales}</p>
    </section>
  );
}

/** What the Content floor ships: one card per channel, then what every output carries. */
export function OfficeOutput({ output }: { output: OfficeDetail["output"] }) {
  return (
    <section className="g-oo-panel glass" aria-labelledby="oo-output-title">
      <div className="g-oo-head">
        <div>
          <h3 id="oo-output-title" className="g-oo-title">
            {output.title}
          </h3>
          <p className="g-oo-sub">{output.sub}</p>
        </div>
      </div>
      <ul className="g-oo-channels">
        {output.channels.map((ch) => (
          <li key={ch.name} className="g-oo-ch">
            <div className="g-oo-ch__head">
              <h4>{ch.name}</h4>
              <span className={ch.searchable ? "g-oo-tag g-oo-tag--search" : "g-oo-tag"}>{ch.type}</span>
            </div>
            <span className="g-mono">{ch.format}</span>
            <ul>
              {ch.traits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="g-oo-common">
        <span className="g-mono">{output.commonLabel}</span>
        <ul className="g-oo-chips">
          {output.common.map((x) => (
            <li key={x} className="g-oo-chip">
              {x}
            </li>
          ))}
        </ul>
      </div>
      <p className="g-oo-note">{output.note}</p>
    </section>
  );
}

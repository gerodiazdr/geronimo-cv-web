"use client";

import { useRef, useState } from "react";
import { companiesForStage, type Content } from "@/lib/content";
import { clamp01, pinHeight, pinnedProgress, usePrefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { Shape } from "./Shape";

const MOBILE = 760;

/** Pinned section: scrolling advances Position → Create → Grow → Build → Automate, crossfading the glass panel. */
export function SystemStory({ c }: { c: Content }) {
  const stages = c.stages;
  const t = c.ui.story;
  const ref = useRef<HTMLElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduce = usePrefersReducedMotion();

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const mobile = window.innerWidth < MOBILE;
    const ps = mobile ? 0 : pinnedProgress(el, pinHeight());
    el.style.setProperty("--ps", ps.toFixed(4));

    const n = stages.length;
    const idx = Math.min(n - 1, Math.floor(ps * n));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }

    panels.current.forEach((panel, i) => {
      if (!panel) return;
      if (mobile) {
        panel.style.opacity = "";
        panel.style.transform = "";
        panel.style.pointerEvents = "";
        panel.removeAttribute("aria-hidden");
        return;
      }
      const x = ps * n - (i + 0.5);
      let o = clamp01((0.62 - Math.abs(x)) / 0.24);
      if (i === 0 && x < 0) o = 1;
      if (i === n - 1 && x > 0) o = 1;
      panel.style.opacity = o.toFixed(3);
      panel.style.transform = reduce ? "none" : `translateY(${(-x * 36).toFixed(1)}px) scale(${(0.97 + 0.03 * o).toFixed(4)})`;
      panel.style.pointerEvents = o > 0.5 ? "auto" : "none";
      if (o > 0.5) panel.removeAttribute("aria-hidden");
      else panel.setAttribute("aria-hidden", "true");
    });
  });

  return (
    <section id="system" ref={ref} className="story" aria-labelledby="system-title">
      <div className="story__sticky">
        <div className="story__inner">
          <div className="story__index">
            <div className="story__track" aria-hidden="true">
              <div className="story__fill" />
            </div>
            <div className="story__list">
              <h2 id="system-title" className="story__heading">
                {t.title}
              </h2>
              <ol className="story__stages">
                {stages.map((st, i) => (
                  <li key={st.id} className={i === active ? "story__stage is-active" : "story__stage"} aria-current={i === active ? "step" : undefined}>
                    <span className="mono">{st.n}</span>
                    <span className="story__verb">{st.verb}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="story__panels">
            {stages.map((st, i) => (
              <article
                key={st.id}
                ref={(node) => {
                  panels.current[i] = node;
                }}
                className="story__panel glass"
              >
                <div className="story__panel-head">
                  <span className="story__shape">
                    <Shape kind={st.shape} size={128} colors={["#FFC29E", "#F7A1CF", "#B9A2FF"]} />
                  </span>
                  <div>
                    <span className="mono">
                      {st.n} · {st.verb}
                    </span>
                    <h3 className="story__name">{st.name}</h3>
                  </div>
                </div>
                <p className="story__desc">{st.desc}</p>
                <ul className="chips" aria-label={`${st.name} ${t.tools}`}>
                  {st.tools.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="story__used">
                  <span className="story__used-label">{t.usedAt}</span>
                  <ul className="chips">
                    {companiesForStage(c, st.id).map((co) => (
                      <li key={co} className="chip chip--dark">
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

"use client";

import { useEffect, useRef, useState } from "react";
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
  const shapes = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduce = usePrefersReducedMotion();

  /**
   * Phones: the cards stack (CSS sticky). While the next card slides over the current one,
   * the current one shrinks and fades away; each card's shape turns and grows as the card
   * enters, and keeps turning while it is covered.
   */
  const animateMobile = () => {
    const vh = window.innerHeight;
    const rects = panels.current.map((p) => (p ? p.getBoundingClientRect() : null));
    panels.current.forEach((panel, i) => {
      const r = rects[i];
      if (!panel || !r) return;
      panel.removeAttribute("aria-hidden");
      panel.style.pointerEvents = "";
      const shape = shapes.current[i];
      if (reduce) {
        panel.style.opacity = "";
        panel.style.transform = "";
        if (shape) shape.style.transform = "";
        return;
      }
      const next = rects[i + 1];
      const enter = clamp01((vh - r.top) / (vh * 0.75));
      const cover = next ? clamp01((r.bottom - next.top) / r.height) : 0;
      // Fade over the whole cover range: a steeper curve empties the card while part of it
      // is still uncovered, leaving a band of bare background inside the stack.
      panel.style.opacity = clamp01(1 - cover).toFixed(3);
      panel.style.transform = `translateY(${(-20 * cover).toFixed(1)}px) scale(${(1 - 0.08 * cover).toFixed(4)})`;
      if (shape) {
        shape.style.transform = `rotate(${((enter + cover) * 180 - 180).toFixed(1)}deg) scale(${(0.55 + 0.45 * enter).toFixed(3)})`;
      }
    });
  };

  const frame = () => {
    const el = ref.current;
    if (!el) return;
    // <= because the CSS phone branch is `max-width: MOBILE`, which includes MOBILE itself:
    // with `<` the stacked phone layout would run under the desktop crossfade at exactly that width.
    const mobile = window.innerWidth <= MOBILE;
    if (mobile) {
      animateMobile();
      return;
    }
    const ps = pinnedProgress(el, pinHeight());
    el.style.setProperty("--ps", ps.toFixed(4));

    const n = stages.length;
    const idx = Math.min(n - 1, Math.floor(ps * n));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }

    panels.current.forEach((panel, i) => {
      if (!panel) return;
      const shape = shapes.current[i];
      if (shape) shape.style.transform = "";
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
  };

  useScrollFrame(frame);

  // usePrefersReducedMotion resolves after mount, so the one frame useScrollFrame runs on mount
  // already applied the animated transforms. Re-run once it flips, or a visitor who lands on
  // /#system with reduced motion and never scrolls keeps the rotated, scaled-down shapes.
  useEffect(() => {
    frame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

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
                  <span
                    className="story__shape"
                    ref={(node) => {
                      shapes.current[i] = node;
                    }}
                  >
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

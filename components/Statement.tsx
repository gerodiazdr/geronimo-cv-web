"use client";

import { useRef, type CSSProperties } from "react";
import type { Content } from "@/lib/content";
import { enterProgress, usePrefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { Shape } from "./Shape";

/** Positioning card: gradient frame, clear glass, white text lighting up word by word, mini system on the side. */
export function Statement({ c }: { c: Content }) {
  const words = c.statement.split(" ");
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const pw = reduce ? 1 : enterProgress(el, 0.7);
    el.style.setProperty("--pw", pw.toFixed(4));
  });

  return (
    <section ref={ref} className="statement" aria-label={c.ui.statement.label} style={{ "--n": words.length + 4 } as CSSProperties}>
      <div className="statement__bridge" aria-hidden="true" />
      <div className="gradient-frame statement__frame">
        <div className="statement__card glass-clear">
          <span className="mono statement__label">{c.ui.statement.label}</span>
          <span className="mono statement__index" aria-hidden="true">
            01_
          </span>
          <p className="statement__text">
            {words.map((w, i) => (
              <span key={i} className="statement__word" style={{ "--i": i } as CSSProperties}>
                {w}{" "}
              </span>
            ))}
          </p>
          <ul className="statement__system" aria-label={c.ui.statement.system}>
            {c.stages.map((st) => (
              <li key={st.id} className="statement__stage">
                <Shape kind={st.shape} size={26} colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.55)"]} />
                <span className="mono">
                  {st.n} {st.verb}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

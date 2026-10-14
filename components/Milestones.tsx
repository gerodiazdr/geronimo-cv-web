"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import { easeInOutCubic } from "@/lib/motion";

export function Milestones({ c }: { c: Content }) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setT(easeInOutCubic(p));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="section" aria-labelledby="milestones-title">
      <h2 id="milestones-title" className="section__title">
        {c.ui.milestones.title}
      </h2>
      <div className="milestones">
        {c.milestones.map((m) => {
          const value = Math.round(m.from + (m.to - m.from) * t);
          return (
            <div key={m.source} className="milestone glass">
              <div className="milestone__num">
                <span className="grad-text" aria-hidden="true">
                  {value}
                  {m.suffix}
                </span>
                <span className="sr-only">
                  {m.to}
                  {m.suffix}
                </span>
              </div>
              <p className="milestone__text">{m.text}</p>
              <span className="mono">{m.source}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

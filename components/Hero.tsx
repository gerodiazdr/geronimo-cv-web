"use client";

import { useRef, type CSSProperties } from "react";
import { CV_FILES, MAILTO, type Content, type ShapeKind } from "@/lib/content";
import { clamp01, easeInOutCubic as ease, lerp, pinHeight, pinnedProgress, usePrefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { Shape } from "./Shape";

type Flyer = { kind: ShapeKind; x: number; y: number; size: number; rot: number };

// Soft light-grey shapes around the portal: no outlines, a small #F7F7F7 → #D9D9D9 gradient.
// Positions are % of the hero stage; all sit outside the portal circle at rest.
const FLYERS: Flyer[] = [
  { kind: "diamond", x: 16, y: 26, size: 150, rot: -8 },
  { kind: "sq", x: 84, y: 22, size: 120, rot: 18 },
  { kind: "circ", x: 10, y: 72, size: 170, rot: 0 },
  { kind: "quarter", x: 88, y: 74, size: 160, rot: -10 },
  { kind: "tri", x: 72, y: 88, size: 54, rot: 12 },
  { kind: "circ", x: 28, y: 90, size: 50, rot: 0 },
  { kind: "diamond", x: 70, y: 9, size: 36, rot: 0 },
];

export function Hero({ c }: { c: Content }) {
  const t = c.ui.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const vw = window.innerWidth;
    const pin = pinHeight();
    const p = pinnedProgress(el, pin);

    const fly = reduce ? 0 : ease(clamp01(p / 0.8));
    const portal = reduce ? (p > 0.3 ? 1 : 0) : ease(clamp01((p - 0.12) / 0.62));
    // Portal radius: big enough to hold the hero copy; on phones it covers the whole stage.
    const r0 = vw < 700 ? Math.hypot(vw, pin) * 0.6 : Math.min(400, vw * 0.3, pin * 0.46);
    const rMax = Math.hypot(vw, pin) * 0.62 + 40;
    const R = lerp(r0, rMax, portal);
    const inner = clamp01((p - 0.62) / 0.2);

    const s = el.style;
    s.setProperty("--fly", fly.toFixed(4));
    s.setProperty("--fly-o", (1 - clamp01((p - 0.4) / 0.3)).toFixed(3));
    s.setProperty("--R", R.toFixed(1));
    s.setProperty("--ring-o", (1 - clamp01((portal - 0.45) / 0.35)).toFixed(3));
    s.setProperty("--copy-o", (1 - clamp01(p / 0.26)).toFixed(3));
    s.setProperty("--copy-y", reduce ? "0" : (-90 * clamp01(p / 0.4)).toFixed(1));
    s.setProperty("--copy-s", reduce ? "1" : (1 - 0.08 * clamp01(p / 0.3)).toFixed(4));
    s.setProperty("--inner-o", inner.toFixed(3));
    s.setProperty("--inner-y", reduce ? "0" : (30 * (1 - inner)).toFixed(1));
    s.setProperty("--inner-s", reduce ? "1" : (0.96 + 0.04 * inner).toFixed(4));
    s.setProperty("--cue-o", (1 - clamp01(p / 0.08)).toFixed(3));
    el.dataset.phase = p > 0.3 ? "inside" : "outside";
  });

  return (
    <section id="top" ref={ref} className="hero" aria-label="Introduction">
      <div className="hero__stage">
        <div className="hero__haze hero__haze--warm" aria-hidden="true" />
        <div className="hero__haze hero__haze--cool" aria-hidden="true" />

        {FLYERS.map((f, i) => (
          <div
            key={i}
            className="hero__flyer"
            aria-hidden="true"
            style={{ "--fx": f.x, "--fy": f.y, "--rot": f.rot, width: f.size, height: f.size } as CSSProperties}
          >
            <Shape kind={f.kind} size="100%" colors={["#F7F7F7", "#D9D9D9"]} />
          </div>
        ))}

        <div className="hero__world" aria-hidden="true">
          <div className="blob blob--1" />
          <div className="blob blob--2" />
          <div className="blob blob--3" />
        </div>
        <div className="hero__ring" aria-hidden="true" />

        <div className="hero__copy">
          <span className="pill pill--tint">{t.pill}</span>
          <h1 className="hero__title">
            Gerónimo
            <br />
            Díaz De Rosa
          </h1>
          <p className="hero__lead">{t.lead}</p>
          <div className="btn-row btn-row--center">
            <a href={MAILTO} className="btn btn--light">
              {t.email}
            </a>
            <a href={CV_FILES[c.lang]} download className="btn glass-dark btn--on-dark">
              {t.download}
            </a>
          </div>
        </div>

        <div className="hero__inner">
          <span className="hero__inner-kicker">{t.kicker}</span>
          <p className="hero__inner-title">
            {t.inner1}
            <br />
            {t.inner2}
          </p>
        </div>

        <div className="hero__cue" aria-hidden="true">
          <span>{t.cue}</span>
          <span className="hero__cue-line" />
        </div>
      </div>
    </section>
  );
}

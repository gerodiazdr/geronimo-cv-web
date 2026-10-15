"use client";

import { useRef, type CSSProperties } from "react";
import { CV_FILES, MAILTO, type Content, type ShapeKind } from "@/lib/content";
import { clamp01, easeInOutCubic as ease, lerp, pinHeight, pinnedProgress, usePrefersReducedMotion, useScrollFrame } from "@/lib/motion";
import { Shape } from "./Shape";

type Depth = "back" | "mid" | "front";

/**
 * Shapes drifting on elliptical orbits around the portal.
 * kx / ky: orbit radii as multiples of the portal radius (back shapes may dip behind the circle).
 * dur: seconds per half orbit. phase: start position (0–1). dir: 1 clockwise, -1 counter-clockwise.
 * Depth sets blur and opacity: back shapes are blurred and pass behind the portal, front shapes are large, sharp and stay outside it.
 */
type Orbiter = { kind: ShapeKind; depth: Depth; size: number; kx: number; ky: number; dur: number; phase: number; dir: 1 | -1; spin: number };

const ORBITERS: Orbiter[] = [
  // back
  { kind: "diamond", depth: "back", size: 70, kx: 1.22, ky: 1.12, dur: 50, phase: 0.05, dir: 1, spin: 80 },
  { kind: "circ", depth: "back", size: 56, kx: 1.5, ky: 1.16, dur: 56, phase: 0.3, dir: -1, spin: 0 },
  { kind: "tri", depth: "back", size: 80, kx: 1.68, ky: 1.14, dur: 62, phase: 0.55, dir: 1, spin: 90 },
  { kind: "quarter", depth: "back", size: 64, kx: 1.35, ky: 1.2, dur: 54, phase: 0.78, dir: -1, spin: 75 },
  { kind: "sq", depth: "back", size: 52, kx: 1.8, ky: 1.15, dur: 60, phase: 0.18, dir: 1, spin: 95 },
  { kind: "diamond", depth: "back", size: 60, kx: 1.42, ky: 1.13, dur: 58, phase: 0.92, dir: -1, spin: 85 },
  // mid
  { kind: "sq", depth: "mid", size: 130, kx: 1.42, ky: 1.26, dur: 42, phase: 0.12, dir: -1, spin: 60 },
  { kind: "quarter", depth: "mid", size: 150, kx: 1.58, ky: 1.3, dur: 46, phase: 0.52, dir: 1, spin: 65 },
  { kind: "diamond", depth: "mid", size: 120, kx: 1.3, ky: 1.24, dur: 40, phase: 0.7, dir: 1, spin: 55 },
  { kind: "tri", depth: "mid", size: 140, kx: 1.7, ky: 1.28, dur: 50, phase: 0.35, dir: -1, spin: 70 },
  { kind: "circ", depth: "mid", size: 110, kx: 1.5, ky: 1.22, dur: 44, phase: 0.88, dir: 1, spin: 0 },
  // front
  { kind: "circ", depth: "front", size: 260, kx: 1.6, ky: 1.42, dur: 36, phase: 0.02, dir: 1, spin: 0 },
  { kind: "diamond", depth: "front", size: 230, kx: 1.78, ky: 1.45, dur: 38, phase: 0.45, dir: -1, spin: 50 },
  { kind: "quarter", depth: "front", size: 240, kx: 1.5, ky: 1.48, dur: 34, phase: 0.74, dir: 1, spin: 45 },
  { kind: "tri", depth: "front", size: 210, kx: 1.85, ky: 1.4, dur: 40, phase: 0.24, dir: -1, spin: 60 },
  { kind: "sq", depth: "front", size: 180, kx: 1.65, ky: 1.44, dur: 42, phase: 0.6, dir: 1, spin: 55 },
];

function orbitStyle(o: Orbiter): CSSProperties {
  const angle = o.phase * Math.PI * 2;
  return {
    "--kx": o.kx,
    "--ky": o.ky,
    "--dur": `${o.dur}s`,
    // negative delay = start part-way through the orbit; Y runs a quarter cycle apart to trace an ellipse
    "--delay": `${(-o.phase * o.dur * 2).toFixed(2)}s`,
    "--ydelay": `${(-o.phase * o.dur * 2 - (o.dir * o.dur) / 2).toFixed(2)}s`,
    // resting position when animations are off (reduced motion)
    "--sx": Math.cos(angle).toFixed(3),
    "--sy": Math.sin(angle).toFixed(3),
    "--size": `${o.size}px`,
    "--spin": o.spin ? `${o.spin}s` : "0s",
    "--spin-dir": o.dir === 1 ? "normal" : "reverse",
  } as CSSProperties;
}

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
    // Portal radius: big enough to hold the hero copy.
    // Phones: a circle wider than the screen, so the copy fits and the shapes show above and below it.
    const r0 = vw < 700 ? Math.max(240, vw * 0.64) : Math.min(400, vw * 0.3, pin * 0.46);
    const rMax = Math.hypot(vw, pin) * 0.62 + 40;
    const R = lerp(r0, rMax, portal);
    const inner = clamp01((p - 0.62) / 0.2);

    const s = el.style;
    s.setProperty("--R0", r0.toFixed(1));
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

        <div className="hero__orbits" aria-hidden="true">
          {ORBITERS.map((o, i) => (
            <div key={i} className={`orb orb--${o.depth}`} style={orbitStyle(o)}>
              <div className="orb__x">
                <div className="orb__y">
                  <div className="orb__shape">
                    <Shape kind={o.kind} size="100%" colors={["#F7F7F7", "#D9D9D9"]} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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

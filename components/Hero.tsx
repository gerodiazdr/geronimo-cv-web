import type { CSSProperties } from "react";
import { CONTACT, CV_FILES, MAILTO, type Content, type ShapeKind } from "@/lib/content";
import { Shape } from "./Shape";

type Orbiter = { kind: ShapeKind; depth: "back" | "mid" | "front"; size: number; kx: number; ky: number; dur: number; phase: number; dir: 1 | -1; spin: number };

// Decorative shapes on elliptical orbits around the portal, in three depth layers.
// kx/ky: orbit radii as multiples of the portal radius · dur: seconds per half orbit · phase: start point (0–1).
const ORBITERS: Orbiter[] = [
  { kind: "diamond", depth: "back", size: 70, kx: 1.22, ky: 1.12, dur: 50, phase: 0.05, dir: 1, spin: 80 },
  { kind: "circ", depth: "back", size: 56, kx: 1.5, ky: 1.16, dur: 56, phase: 0.3, dir: -1, spin: 0 },
  { kind: "tri", depth: "back", size: 80, kx: 1.68, ky: 1.14, dur: 62, phase: 0.55, dir: 1, spin: 90 },
  { kind: "quarter", depth: "back", size: 64, kx: 1.35, ky: 1.2, dur: 54, phase: 0.78, dir: -1, spin: 75 },
  { kind: "sq", depth: "back", size: 52, kx: 1.8, ky: 1.15, dur: 60, phase: 0.18, dir: 1, spin: 95 },
  { kind: "diamond", depth: "back", size: 60, kx: 1.42, ky: 1.13, dur: 58, phase: 0.92, dir: -1, spin: 85 },
  { kind: "sq", depth: "mid", size: 130, kx: 1.42, ky: 1.26, dur: 42, phase: 0.12, dir: -1, spin: 60 },
  { kind: "quarter", depth: "mid", size: 150, kx: 1.58, ky: 1.3, dur: 46, phase: 0.52, dir: 1, spin: 65 },
  { kind: "diamond", depth: "mid", size: 120, kx: 1.3, ky: 1.24, dur: 40, phase: 0.7, dir: 1, spin: 55 },
  { kind: "tri", depth: "mid", size: 140, kx: 1.7, ky: 1.28, dur: 50, phase: 0.35, dir: -1, spin: 70 },
  { kind: "circ", depth: "mid", size: 110, kx: 1.5, ky: 1.22, dur: 44, phase: 0.88, dir: 1, spin: 0 },
  { kind: "circ", depth: "front", size: 260, kx: 1.6, ky: 1.42, dur: 36, phase: 0.02, dir: 1, spin: 0 },
  { kind: "diamond", depth: "front", size: 230, kx: 1.78, ky: 1.45, dur: 38, phase: 0.45, dir: -1, spin: 50 },
  { kind: "quarter", depth: "front", size: 240, kx: 1.5, ky: 1.48, dur: 34, phase: 0.74, dir: 1, spin: 45 },
  { kind: "tri", depth: "front", size: 210, kx: 1.85, ky: 1.4, dur: 40, phase: 0.24, dir: -1, spin: 60 },
  { kind: "sq", depth: "front", size: 180, kx: 1.65, ky: 1.44, dur: 42, phase: 0.6, dir: 1, spin: 55 },
];

function orbitStyle(o: Orbiter): CSSProperties {
  const a = o.phase * Math.PI * 2;
  return {
    "--kx": o.kx,
    "--ky": o.ky,
    "--dur": `${o.dur}s`,
    "--delay": `${(-o.phase * o.dur * 2).toFixed(2)}s`,
    "--ydelay": `${(-o.phase * o.dur * 2 - (o.dir * o.dur) / 2).toFixed(2)}s`,
    "--sx": Math.cos(a).toFixed(3),
    "--sy": Math.sin(a).toFixed(3),
    "--size": `${o.size}px`,
    "--spin": `${o.spin}s`,
    "--spin-dir": o.dir === 1 ? "normal" : "reverse",
  } as CSSProperties;
}

export function Hero({ c }: { c: Content }) {
  const t = c.ui.hero;
  return (
    <section id="top" className="g-hero" aria-label="Introduction">
      <div className="g-hero__stage">
        <div className="g-haze g-haze--warm" aria-hidden="true" />
        <div className="g-haze g-haze--cool" aria-hidden="true" />
        <div className="g-orbits" aria-hidden="true">
          {ORBITERS.map((o, i) => (
            <div key={i} className={`g-orb g-orb--${o.depth}`} style={orbitStyle(o)}>
              <div className="g-orb-x">
                <div className="g-orb-y">
                  <div className="g-orb-push">
                    <div className="g-orb-shape">
                      <Shape kind={o.kind} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="g-world" aria-hidden="true">
          <div className="g-blob g-blob--1" />
          <div className="g-blob g-blob--2" />
          <div className="g-blob g-blob--3" />
        </div>
        <div className="g-ring" aria-hidden="true" />
        <div className="g-copy">
          <span className="g-pill">{t.pill}</span>
          <h1 className="g-title">
            Gerónimo
            <br />
            Díaz De Rosa
          </h1>
          <p className="g-lead">{t.lead}</p>
          <div className="g-btns">
            <a className="g-btn g-btn--light" href={MAILTO}>
              {t.email}
            </a>
            <a className="g-btn g-btn--ghost" href={CV_FILES[c.lang]} download>
              {t.download}
            </a>
          </div>
          <button type="button" className="g-copylink" data-action="copy">
            {t.orCopy} <span className="g-copy-label">{CONTACT.email}</span>
          </button>
        </div>
        <div className="g-inner">
          <span className="g-kicker">{t.kicker}</span>
          <p className="g-inner__title">
            {t.inner1}
            <br />
            {t.inner2}
          </p>
        </div>
        <div className="g-cue" aria-hidden="true">
          <span>{t.cue}</span>
          <span className="g-cue__line" />
        </div>
      </div>
    </section>
  );
}

const ACTORS: ShapeKind[] = ["diamond", "quarter", "tri", "sq", "circ"];

/** The five stage shapes that leave the portal and land in the system section (positioned by the engine). */
export function Actors() {
  return (
    <div className="g-actors" aria-hidden="true">
      {ACTORS.map((k) => (
        <div key={k} className="g-actor">
          <Shape kind={k} />
        </div>
      ))}
      <div className="g-dot" />
    </div>
  );
}

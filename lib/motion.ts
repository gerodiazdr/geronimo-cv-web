"use client";

import { useEffect, useRef, useState } from "react";

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Height of the pinned (sticky) viewport used by the scroll scenes. Must match --pin-h in globals.css. */
export const pinHeight = () => Math.min(window.innerHeight, 900);

/** 0 → 1 while a tall section scrolls under its sticky child. */
export function pinnedProgress(el: HTMLElement, pin = pinHeight()) {
  const r = el.getBoundingClientRect();
  return clamp01(-r.top / Math.max(1, r.height - pin));
}

/** 0 → 1 as an element enters the viewport (starts at 88% of the viewport height). */
export function enterProgress(el: HTMLElement, span: number) {
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  return clamp01((vh * 0.88 - r.top) / (vh * span));
}

/**
 * Runs `callback` once per animation frame while the page scrolls or resizes.
 * Continuous values are written straight to the DOM (CSS custom properties) inside the
 * callback instead of React state, so scrolling never re-renders the tree.
 */
export function useScrollFrame(callback: () => void) {
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      cb.current();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    run();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

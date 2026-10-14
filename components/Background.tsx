"use client";

import { useRef } from "react";
import { useScrollFrame } from "@/lib/motion";

/** Fixed light environment behind the whole page. Colored orbs drift at different speeds (parallax). */
export function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    ref.current?.style.setProperty("--y", String(Math.round(window.scrollY)));
  });

  return (
    <div ref={ref} className="bg" aria-hidden="true">
      <div className="bg__orb bg__orb--orange" />
      <div className="bg__orb bg__orb--pink" />
      <div className="bg__orb bg__orb--violet" />
    </div>
  );
}

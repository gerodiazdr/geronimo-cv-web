"use client";

import { useEffect, useRef } from "react";
import { startEngine } from "@/lib/engine";

type Props = { email: string; copied: string; copyFail: string; children: React.ReactNode };

/** Wraps the page and starts the animation engine once the markup is on screen. */
export function SiteRoot({ email, copied, copyFail, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return startEngine(ref.current);
  }, []);
  return (
    <div ref={ref} className="g-root" data-email={email} data-copied={copied} data-copy-fail={copyFail}>
      {children}
    </div>
  );
}

import type { ShapeKind } from "@/lib/content";

export type GradientId = "gSoft" | "gPastel" | "gWhite" | "gHot";

const PATHS: Record<ShapeKind, (fill: string) => React.ReactNode> = {
  tri: (f) => <path d="M24 4 L45 43 L3 43 Z" fill={f} />,
  sq: (f) => <rect x="4" y="4" width="40" height="40" fill={f} />,
  circ: (f) => <circle cx="24" cy="24" r="21" fill={f} />,
  diamond: (f) => <path d="M24 3 L45 24 L24 45 L3 24 Z" fill={f} />,
  quarter: (f) => <path d="M6 42 L6 6 A36 36 0 0 1 42 42 Z" fill={f} />,
};

/** Stage shapes, filled with one of the shared gradients defined in <SvgDefs />. */
export function Shape({ kind, gradient = "gSoft", className }: { kind: ShapeKind; gradient?: GradientId; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true" focusable="false">
      {PATHS[kind](`url(#${gradient})`)}
    </svg>
  );
}

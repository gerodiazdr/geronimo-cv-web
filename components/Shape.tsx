import { useId } from "react";
import type { ShapeKind } from "@/lib/content";

type Props = {
  kind: ShapeKind;
  size?: number | string;
  /** Gradient stops, top-left → bottom-right. A single color gives a flat fill. */
  colors?: string[];
  className?: string;
};

/** Stage shapes, filled (no outlines): Position = diamond, Create = quarter circle, Grow = triangle, Build = square, Automate = circle. */
export function Shape({ kind, size = 48, colors = ["#FFFFFF", "#EFEFEF"], className }: Props) {
  const id = useId().replace(/:/g, "");
  const fill = colors.length > 1 ? `url(#g${id})` : colors[0];
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {colors.length > 1 && (
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
            {colors.map((c, i) => (
              <stop key={i} offset={i / (colors.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
      )}
      {kind === "tri" && <path d="M24 4 L45 43 L3 43 Z" fill={fill} />}
      {kind === "sq" && <rect x="4" y="4" width="40" height="40" fill={fill} />}
      {kind === "circ" && <circle cx="24" cy="24" r="21" fill={fill} />}
      {kind === "diamond" && <path d="M24 3 L45 24 L24 45 L3 24 Z" fill={fill} />}
      {kind === "quarter" && <path d="M6 42 L6 6 A36 36 0 0 1 42 42 Z" fill={fill} />}
    </svg>
  );
}

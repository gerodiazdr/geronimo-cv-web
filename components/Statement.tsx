import type { CSSProperties } from "react";
import type { Content } from "@/lib/content";

export function Statement({ c }: { c: Content }) {
  const words = c.statement.split(" ");
  return (
    <section className="g-statement" aria-label={c.ui.statement.label} style={{ "--n": words.length + 4 } as CSSProperties}>
      <div className="g-frame">
        <div className="g-stmt glass-clear">
          <span className="g-mono g-stmt__label">{c.ui.statement.label}</span>
          <span className="g-mono g-stmt__index" aria-hidden="true">
            01_
          </span>
          <p className="g-stmt__text">
            {words.map((w, i) => (
              <span key={i} className="g-word" style={{ "--i": i } as CSSProperties}>
                {w}{" "}
              </span>
            ))}
          </p>
          <ul className="g-facts">
            {c.facts.map((f) => (
              <li key={f.label}>
                <span className="g-mono">{f.label}</span>
                <span>{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

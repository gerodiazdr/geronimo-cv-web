import type { CSSProperties } from "react";
import { CONTACT, CV_FILES, MAILTO, type Content } from "@/lib/content";
import { LangSwitch } from "./LangSwitch";
import { Shape } from "./Shape";

/**
 * Closing scene: the hero's gradient circle rises from the bottom edge, alive with drifting color,
 * while the five stage shapes orbit slowly around it. The footer content sits on a glass panel on top.
 */
export function Footer({ c }: { c: Content }) {
  const t = c.ui.footer;
  const n = c.ui.nav;
  return (
    <footer className="footer-scene">
      <div className="footer-scene__sun" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>
      <div className="footer-scene__orbit" aria-hidden="true">
        {c.stages.map((st, i) => (
          <span
            key={st.id}
            className="footer-scene__planet"
            style={{ "--a": `${(360 / c.stages.length) * i}deg` } as CSSProperties}
          >
            <Shape kind={st.shape} size={i % 2 ? 34 : 46} colors={["#F7F7F7", "#D9D9D9"]} />
          </span>
        ))}
      </div>

      <div className="footer-scene__panel glass">
        <div className="footer-scene__brand">
          <a href="#top" className="footer-scene__name">
            {CONTACT.name}
          </a>
          <p className="footer-scene__tagline">{t.tagline}</p>
          <LangSwitch lang={c.lang} label={t.language} className="lang--light" />
        </div>

        <nav className="footer-scene__col" aria-label={t.navigate}>
          <span className="mono footer-scene__heading">{t.navigate}</span>
          <a href="#system">{n.system}</a>
          <a href="#experience">{n.experience}</a>
          <a href="#contact">{n.contact}</a>
        </nav>

        <div className="footer-scene__col">
          <span className="mono footer-scene__heading">{t.contact}</span>
          <a href={MAILTO}>{CONTACT.email}</a>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={CONTACT.linkedinHref} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>

        <div className="footer-scene__col">
          <span className="mono footer-scene__heading">{t.cv}</span>
          <a href={CV_FILES.en} download hrefLang="en">
            {t.cvEn}
          </a>
          <a href={CV_FILES.es} download hrefLang="es">
            {t.cvEs}
          </a>
        </div>
      </div>

      <div className="footer-scene__bottom">
        <span>
          © {new Date().getFullYear()} {CONTACT.name}. {t.rights}
        </span>
        <a href="#top">{t.top}</a>
      </div>
    </footer>
  );
}

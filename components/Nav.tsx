import { CONTACT, CV_FILES, type Content } from "@/lib/content";
import { LangSwitch } from "./LangSwitch";

export function Nav({ c }: { c: Content }) {
  const t = c.ui.nav;
  return (
    <header className="nav glass">
      <a href="#top" className="nav__brand" aria-label={CONTACT.name}>
        <span className="nav__brand-full">{CONTACT.name}</span>
        <span className="nav__brand-short" aria-hidden="true">
          Gerónimo
        </span>
      </a>
      <nav aria-label="Main" className="nav__links">
        <a href="#system">{t.system}</a>
        <a href="#experience">{t.experience}</a>
        <a href="#contact">{t.contact}</a>
        <LangSwitch lang={c.lang} label={c.ui.footer.language} />
        <a href={CV_FILES[c.lang]} download className="btn btn--dark btn--sm nav__cta" aria-label={t.download}>
          <span className="nav__cta-full">{t.download}</span>
          <span className="nav__cta-short" aria-hidden="true">
            CV
          </span>
        </a>
      </nav>
    </header>
  );
}

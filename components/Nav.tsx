import { CONTACT, CV_FILES, type Content } from "@/lib/content";
import { LangSwitch } from "./LangSwitch";

export function Nav({ c }: { c: Content }) {
  const t = c.ui.nav;
  return (
    <header className="nav glass">
      <a href="#top" className="nav__brand">
        {CONTACT.name}
      </a>
      <nav aria-label="Main" className="nav__links">
        <a href="#system">{t.system}</a>
        <a href="#experience">{t.experience}</a>
        <a href="#contact">{t.contact}</a>
        <LangSwitch lang={c.lang} label={c.ui.footer.language} />
        <a href={CV_FILES[c.lang]} download className="btn btn--dark btn--sm">
          {t.download}
        </a>
      </nav>
    </header>
  );
}

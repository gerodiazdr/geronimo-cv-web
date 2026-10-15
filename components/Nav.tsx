import { CONTACT, CV_FILES, type Content, type Lang } from "@/lib/content";

const LANG_NAMES: Record<Lang, string> = { en: "English", es: "Español" };

export function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  return (
    <span className="g-lang" role="group" aria-label={label}>
      {(["en", "es"] as Lang[]).map((l) => (
        <a key={l} href={`/${l}`} hrefLang={l} lang={l} aria-current={l === lang ? "page" : undefined} className={l === lang ? "is-active" : undefined}>
          {l.toUpperCase()}
          <span className="sr-only"> ({LANG_NAMES[l]})</span>
        </a>
      ))}
    </span>
  );
}

export function Nav({ c }: { c: Content }) {
  const t = c.ui.nav;
  return (
    <header className="g-nav glass">
      <a href="#top" className="g-nav__brand">
        <span className="g-nav__full">{CONTACT.name}</span>
        <span className="g-nav__short">{CONTACT.shortName}</span>
      </a>
      <nav aria-label="Main" className="g-nav__links">
        <a href="#system">{t.system}</a>
        <a href="#work">{t.work}</a>
        <a href="#experience">{t.experience}</a>
        <a href="#contact">{t.contact}</a>
        <LangSwitch lang={c.lang} label={t.language} />
        <a className="g-btn g-btn--dark g-btn--sm" href={CV_FILES[c.lang]} download>
          <span className="g-nav__full">{t.download}</span>
          <span className="g-nav__short">CV</span>
        </a>
      </nav>
    </header>
  );
}

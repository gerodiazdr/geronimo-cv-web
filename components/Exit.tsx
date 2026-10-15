import { CONTACT, CV_FILES, MAILTO, type Content } from "@/lib/content";
import { LangSwitch } from "./Nav";

/** The portal opens again at the end and the contact sits inside it. */
export function Exit({ c }: { c: Content }) {
  const t = c.ui.exit;
  const other = c.lang === "en" ? "es" : "en";
  return (
    <section id="contact" className="g-exit" aria-labelledby="ct-title">
      <div className="g-exit__stage">
        <div className="g-exit__sun" aria-hidden="true">
          <div className="g-blob g-blob--1" />
          <div className="g-blob g-blob--2" />
          <div className="g-blob g-blob--3" />
        </div>
        <div className="g-exit__cta">
          <span className="g-mono g-exit__kicker">{t.kicker}</span>
          <h2 id="ct-title" className="g-exit__title">
            {t.title}
          </h2>
          <div className="g-exit__mail">
            <a href={MAILTO}>{CONTACT.email}</a>
            <button type="button" className="g-btn g-btn--light g-btn--sm" data-action="copy">
              <span className="g-copy-label">{t.copy}</span>
            </button>
          </div>
          <div className="g-btns">
            <a className="g-btn g-btn--light" href={MAILTO}>
              {t.email}
            </a>
            <a className="g-btn g-btn--ghost" href={CV_FILES[c.lang]} download>
              {t.download}
            </a>
          </div>
          <a className="g-exit__alt" href={CV_FILES[other]} download hrefLang={other}>
            {t.altCv}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ c }: { c: Content }) {
  const t = c.ui.footer;
  const n = c.ui.nav;
  return (
    <footer className="g-footer">
      <div className="g-footer__panel glass">
        <div>
          <a href="#top" className="g-footer__name">
            {CONTACT.name}
          </a>
          <p>{t.tagline}</p>
          <div className="g-footer__lang">
            <LangSwitch lang={c.lang} label={n.language} />
          </div>
        </div>
        <nav aria-label={t.navigate} className="g-footer__col">
          <span className="g-mono">{t.navigate}</span>
          <a href="#system">{n.system}</a>
          <a href="#work">{n.work}</a>
          <a href="#experience">{n.experience}</a>
        </nav>
        <div className="g-footer__col">
          <span className="g-mono">{t.contact}</span>
          <a href={MAILTO}>{CONTACT.email}</a>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={CONTACT.linkedinHref} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className="g-footer__col">
          <span className="g-mono">{t.colophon}</span>
          <span>{t.built}</span>
          <span>{t.type}</span>
        </div>
      </div>
      <p className="g-footer__legal">
        © {new Date().getFullYear()} {CONTACT.name} · {t.legal}
      </p>
    </footer>
  );
}

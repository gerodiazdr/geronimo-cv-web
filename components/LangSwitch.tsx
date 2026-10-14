import type { Lang } from "@/lib/content";

const OPTIONS: { lang: Lang; label: string; name: string }[] = [
  { lang: "en", label: "EN", name: "English" },
  { lang: "es", label: "ES", name: "Español" },
];

/** EN / ES switch. Each language lives at its own URL (/en, /es) so both are shareable and indexable. */
export function LangSwitch({ lang, label, className = "" }: { lang: Lang; label: string; className?: string }) {
  return (
    <div className={`lang ${className}`} role="group" aria-label={label}>
      {OPTIONS.map((o) => (
        <a
          key={o.lang}
          href={`/${o.lang}`}
          hrefLang={o.lang}
          lang={o.lang}
          aria-label={o.name}
          aria-current={o.lang === lang ? "page" : undefined}
          className={o.lang === lang ? "lang__opt is-active" : "lang__opt"}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, CV_FILES, MAILTO, type Content } from "@/lib/content";

type CopyState = "idle" | "copied" | "failed";

export function Contact({ c }: { c: Content }) {
  const t = c.ui.contact;
  const other = c.lang === "en" ? "es" : "en";
  const [copy, setCopy] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 2000);
  };

  const copyLabel = copy === "copied" ? t.copied : copy === "failed" ? t.copyFail : t.copy;

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <h2 id="contact-title" className="contact__title">
          {t.title}
        </h2>

        <div className="gradient-frame contact__frame">
          <div className="contact__card glass-clear">
            <span className="mono contact__label">{t.label}</span>
            <div className="contact__email-row">
              <a href={MAILTO} className="contact__email">
                {CONTACT.email}
              </a>
              <button type="button" className="btn btn--light btn--sm" onClick={copyEmail}>
                {copyLabel}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copy === "copied" ? t.copiedSr : ""}
              </span>
            </div>
            <div className="contact__details">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={CONTACT.linkedinHref} target="_blank" rel="noopener noreferrer">
                {CONTACT.linkedin}
              </a>
              <span>{t.location}</span>
            </div>
          </div>
        </div>

        <div className="btn-row btn-row--center">
          <a href={MAILTO} className="btn btn--dark">
            {t.email}
          </a>
          <a href={CV_FILES[c.lang]} download className="btn glass">
            {t.download}
          </a>
          <a href={CV_FILES[other]} download className="contact__alt" hrefLang={other}>
            {t.altCv}
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, DM_Mono, Geist } from "next/font/google";
import { LANGS, isLang } from "@/lib/content";
import "../globals.css";

// Headlines only
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// Body / UI text (everything that is not a headline)
const body = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const META = {
  en: {
    title: "Gerónimo Díaz De Rosa — Head of Marketing & Sales, Brand & Growth",
    description:
      "I position B2B brands, create the content that earns them a place in the market and build the system that makes them grow: brand, content, GTM, web, AI and data.",
    ogTitle: "Gerónimo Díaz De Rosa — From brand to growth",
    ogAlt: "From brand to growth. One system. Position, Create, Grow, Build, Automate.",
    locale: "en_US",
  },
  es: {
    title: "Gerónimo Díaz De Rosa — Head of Marketing & Sales, Brand & Growth",
    description:
      "Posiciono brands B2B, creo el contenido que les gana un lugar en el mercado y construyo el sistema de growth que las impulsa: brand, contenido, GTM, web, IA y datos.",
    ogTitle: "Gerónimo Díaz De Rosa — De brand a growth",
    ogAlt: "De brand a growth. Un solo sistema. Posicionamiento, Contenido, Growth, Producto, Automatización.",
    locale: "es_AR",
  },
} as const;

// Absolute base for canonical/alternate/OG URLs. Set NEXT_PUBLIC_SITE_URL once you have a custom domain.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const m = META[lang];
  const image = { url: `/og/og-${lang}.png`, width: 1200, height: 630, alt: m.ogAlt };
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}`, languages: { en: "/en", es: "/es", "x-default": "/en" } },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      type: "website",
      url: `/${lang}`,
      siteName: "Gerónimo Díaz De Rosa",
      locale: m.locale,
      alternateLocale: lang === "en" ? ["es_AR"] : ["en_US"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: m.ogTitle, description: m.description, images: [image.url] },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f4f4",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

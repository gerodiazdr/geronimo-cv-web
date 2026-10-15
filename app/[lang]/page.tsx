import { notFound } from "next/navigation";
import { AiFlow } from "@/components/AiFlow";
import { Background } from "@/components/Background";
import { Exit, Footer } from "@/components/Exit";
import { Experience } from "@/components/Experience";
import { Actors, Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Results } from "@/components/Results";
import { SiteRoot } from "@/components/SiteRoot";
import { Statement } from "@/components/Statement";
import { SvgDefs } from "@/components/SvgDefs";
import { SystemStory } from "@/components/SystemStory";
import { CaseOverlay, Work } from "@/components/Work";
import { CONTACT, getContent, isLang } from "@/lib/content";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = getContent(lang);

  return (
    <SiteRoot email={CONTACT.email} copied={c.ui.exit.copied} copyFail={c.ui.exit.copyFail}>
      <SvgDefs />
      <Background />
      <Nav c={c} />
      <main>
        <Hero c={c} />
        <div className="g-content">
          <Statement c={c} />
          <SystemStory c={c} />
          <Results c={c} />
          <Work c={c} />
          <AiFlow c={c} />
          <Experience c={c} />
          <Exit c={c} />
          <Footer c={c} />
        </div>
      </main>
      <Actors />
      <CaseOverlay c={c} />
    </SiteRoot>
  );
}

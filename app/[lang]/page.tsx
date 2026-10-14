import { notFound } from "next/navigation";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Milestones } from "@/components/Milestones";
import { Nav } from "@/components/Nav";
import { Statement } from "@/components/Statement";
import { SystemStory } from "@/components/SystemStory";
import { getContent, isLang } from "@/lib/content";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = getContent(lang);

  return (
    <div className="site">
      <Background />
      <Nav c={c} />
      <main>
        <Hero c={c} />
        <div className="content">
          <Statement c={c} />
          <SystemStory c={c} />
          <Milestones c={c} />
          <Experience c={c} />
          <Contact c={c} />
        </div>
      </main>
      <Footer c={c} />
    </div>
  );
}

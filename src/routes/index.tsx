import { createFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsMarquee from "@/components/SkillsMarquee";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AgentChat from "@/components/AgentChat";
import ScrollProgress from "@/components/ScrollProgress";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Azka Azeem — MERN Developer, Prompt Engineer & Designer" },
      {
        name: "description",
        content:
          "Portfolio of Azka Azeem, a 14-year-old MERN stack developer, prompt engineer and graphic designer from Karachi. See skills, certifications and projects.",
      },
      {
        property: "og:title",
        content: "Azka Azeem — MERN Developer, Prompt Engineer & Designer",
      },
      {
        property: "og:description",
        content:
          "MERN stack development, prompt engineering and graphic design projects by Azka Azeem.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Azka Azeem",
          jobTitle: "MERN Stack Developer, Prompt Engineer, Graphic Designer",
          address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <AgentChat />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AgentChat from "@/components/AgentChat";
import ScrollProgress from "@/components/ScrollProgress";

import { ScrollTrigger } from "@/lib/gsap";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Azka Azeem | Data Scientist, MERN Developer, Prompt Engineer & Designer 🩷" },
      {
        name: "description",
        content:
          "Portfolio of Azka Azeem, a 14-year-old data scientist, MERN stack developer, prompt engineer and graphic designer from Karachi. See skills, certifications and projects.",
      },
      {
        property: "og:title",
        content: "Azka Azeem — Data Scientist, MERN Developer, Prompt Engineer & Designer",
      },
      {
        property: "og:description",
        content:
          "Data science, MERN stack development, prompt engineering and graphic design projects by Azka Azeem.",
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
          jobTitle: "Data Scientist, MERN Stack Developer, Prompt Engineer, Graphic Designer",
          address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
        }),
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
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

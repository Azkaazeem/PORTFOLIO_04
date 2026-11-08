import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bioParagraphs } from "@/data/portfolio";
import LivingPortrait from "./LivingPortrait";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement | null>(null);

  // Bio scroll reveal with pinned section
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      // Pin the section and scrub the text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=75%", // Scroll distance
          pin: true,
          scrub: 0.5,
        },
      });

      tl.fromTo(
        gsap.utils.toArray("[data-bio-line]"),
        { opacity: 0.42 },
        { opacity: 1, stagger: 0.5, ease: "none", duration: 1 },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative bg-surface min-h-screen flex items-center py-24 sm:py-28 overflow-hidden"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Interactive WebGL Living Portrait */}
        <div data-about-media className="relative mx-auto w-full max-w-lg self-center">
          <LivingPortrait />
        </div>

        {/* Bio */}
        <div className="self-center">
          <p className="font-hand text-5xl text-primary sm:text-6xl">HELLO.</p>
          <div className="mt-6 space-y-5">
            {bioParagraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                data-bio-line
                className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

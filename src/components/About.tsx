import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "@/assets/profile.png";
import { bioParagraphs } from "@/data/portfolio";
import ShootingStars from "@/components/ShootingStars";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement | null>(null);
  const [hover, setHover] = useState(false);

  // Bio scroll reveal with pinned section
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance
      gsap.from("[data-about-media]", {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-about-media]", start: "top 85%" },
      });

      // Pin the section and scrub the text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=150%", // Scroll distance
          pin: true,
          scrub: 1,
        }
      });

      tl.fromTo(
        gsap.utils.toArray("[data-bio-line]"),
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.5, ease: "none", duration: 2 }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative bg-surface min-h-screen flex items-center py-24 sm:py-28 overflow-hidden">
      <ShootingStars direction="top-left" />
      
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Profile image with lightning hover */}
        <div
          data-about-media
          className="relative mx-auto w-full max-w-sm self-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className="relative overflow-hidden border transition-all duration-500"
            style={{
              borderRadius: "0 3px 0 3px",
              borderColor: hover ? "var(--primary)" : "var(--border)",
              boxShadow: hover ? "var(--shadow-glow-soft)" : "none",
            }}
          >
            <img
              src={profile}
              alt="Portrait of Azka Azeem"
              width={912}
              height={1104}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700"
              style={{ transform: hover ? "scale(1.03)" : "scale(1)" }}
            />

            {/* Soft electric overlay */}
            <div
              aria-hidden
              className={`lightning-layer pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                hover ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="none">
                <g stroke="var(--primary)" strokeWidth="1.4" fill="none" opacity="0.75">
                  <path d="M40 0 L110 130 L60 150 L150 320 L110 340 L190 500" />
                  <path d="M330 0 L280 120 L340 160 L250 300 L300 340 L230 500" />
                  <path d="M200 20 L170 140 L215 175 L165 290" opacity="0.5" />
                </g>
              </svg>
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
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

import { useEffect, useRef } from "react";
import { ArrowDownToLine, Mail, MoveDown } from "lucide-react";
import heroAndroid from "@/assets/hero-android.jpg";
import { cvUrl } from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import LightningWordmark from "./LightningWordmark";

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);

  // Cinematic entrance + subtle parallax on the character
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-art]", { opacity: 0, scale: 1.08, duration: 1.6 }, 0)
        .from("[data-hero-copy] > *", { y: 28, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.2)
        .from("[data-hero-wordmark]", { y: 40, opacity: 0, duration: 1.1 }, 0.5);

      gsap.to("[data-hero-art] img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative isolate overflow-hidden pb-24 pt-8 sm:pt-14">
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-32 top-0 h-[26rem] w-[26rem] rounded-full bg-primary/25"
      />
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-40 top-64 h-72 w-72 rounded-full bg-primary/10"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:gap-10 lg:grid-cols-[1fr_1fr]">
        <div data-hero-copy className="relative z-20 max-w-xl">
          <p className="section-label text-[0.6rem] sm:text-[0.72rem]">Welcome to my portfolio</p>
          <p className="mt-4 text-lg leading-tight text-muted-foreground sm:text-2xl lg:mt-6 lg:text-3xl">
            I build interfaces, and
            <br />
            <span className="text-foreground">I build them faster with AI.</span>
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm lg:mt-5">
            MERN stack developer, prompt engineer and graphic designer from Karachi — crafting fast,
            motion-rich products with a red-on-black edge.
          </p>

          <div className="mt-6 flex flex-row gap-3 lg:mt-9">

            <a
              href={cvUrl}
              download
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-soft transition-transform duration-300 hover:-translate-y-0.5"
            >
              <ArrowDownToLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
          >
            <MoveDown className="h-4 w-4 animate-bounce" />
            Scroll
          </button>
        </div>

        {/* AI character visual */}
        <div data-hero-art className="relative order-first lg:order-none">
          <img
            src={heroAndroid}
            alt="Futuristic android character lit with red rim light"
            width={1280}
            height={1600}
            className="mx-auto max-h-[32rem] w-auto object-contain lg:max-h-[40rem]"
            style={{
              maskImage:
                "radial-gradient(120% 100% at 60% 40%, black 55%, transparent 92%)",
              WebkitMaskImage:
                "radial-gradient(120% 100% at 60% 40%, black 55%, transparent 92%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
          />
        </div>
      </div>

      {/* Outlined wordmark with travelling electric pulse */}
      <div
        data-hero-wordmark
        className="relative z-10 mx-auto mt-2 max-w-7xl px-5 sm:px-8 lg:-mt-20"
      >
        <h1 className="sr-only">Azka Azeem — MERN Developer, Prompt Engineer &amp; Designer</h1>
        <LightningWordmark />
      </div>

      {/* Bottom wave transition into About */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="wave-anim w-[200%]">
          <svg viewBox="0 0 2880 120" className="h-24 w-full sm:h-32" preserveAspectRatio="none">
            <path
              d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 C1680,110 1920,10 2160,60 C2400,110 2640,10 2880,60 L2880,120 L0,120 Z"
              fill="var(--surface)"
            />
            <path
              d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 C1680,110 1920,10 2160,60 C2400,110 2640,10 2880,60"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="5"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

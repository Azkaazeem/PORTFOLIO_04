import { useEffect, useRef } from "react";
import { ArrowDownToLine, Mail, MoveDown, Sparkles } from "lucide-react";
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
        .from("[data-hero-art]", { opacity: 0, scale: 1.05, duration: 1.4 }, 0)
        .from("[data-hero-copy] > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.15)
        .from("[data-hero-wordmark]", { y: 35, opacity: 0, duration: 1 }, 0.45);

      gsap.to("[data-hero-art] img", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative isolate overflow-hidden pb-20 pt-8 sm:pt-14">
      {/* Subtle modern tech grid */}
      <div
        aria-hidden
        className="bg-grid-subtle mask-radial-fade pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Atmospheric ambient glows */}
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-28 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-32 top-80 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div data-hero-copy className="relative z-20 max-w-xl">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="font-mono text-[0.72rem] tracking-wide text-primary uppercase font-semibold">Available for Work</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-[0.75rem] text-muted-foreground">Karachi, PK</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.12]">
            I build modern interfaces, and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-red-200 to-primary">
              accelerate with AI.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            MERN stack developer, prompt engineer &amp; graphic designer. Crafting sleek,
            high-performance digital products with precision and clean architecture.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href={cvUrl}
              download="azka_azeem_simple_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_4px_24px_-4px_rgba(230,57,70,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-4px_rgba(230,57,70,0.6)]"
            >
              <ArrowDownToLine className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card/60 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
          </div>

          {/* Key metrics row */}
          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border/60 pt-6">
            <div className="flex flex-col">
              <span className="font-display text-2xl text-foreground tracking-tight sm:text-3xl">11+</span>
              <span className="text-[0.68rem] uppercase tracking-widest text-muted-foreground">Projects Built</span>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div className="flex flex-col">
              <span className="font-display text-2xl text-foreground tracking-tight sm:text-3xl">6+</span>
              <span className="text-[0.68rem] uppercase tracking-widest text-muted-foreground">Certifications</span>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div className="flex flex-col">
              <span className="font-display text-2xl text-primary tracking-tight sm:text-3xl">14 yrs</span>
              <span className="text-[0.68rem] uppercase tracking-widest text-muted-foreground">Young Tech Talent</span>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("about")}
            className="mt-8 inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-muted-foreground/80 transition-colors hover:text-primary"
          >
            <MoveDown className="h-3.5 w-3.5 animate-bounce" />
            Explore More
          </button>
        </div>

        {/* AI Character Visual with glowing backdrop */}
        <div data-hero-art className="relative order-first lg:order-none">
          <div className="relative mx-auto max-w-[28rem] lg:max-w-none">
            {/* Ambient circular backlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[80px]"
            />
            <img
              src={heroAndroid}
              alt="Futuristic android character with red neon lighting"
              width={1280}
              height={1600}
              priority="true"
              className="relative z-10 mx-auto max-h-[28rem] w-auto object-contain sm:max-h-[34rem] lg:max-h-[38rem] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{
                maskImage:
                  "radial-gradient(120% 100% at 50% 40%, black 60%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(120% 100% at 50% 40%, black 60%, transparent 95%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Outlined wordmark with electric pulse */}
      <div
        data-hero-wordmark
        className="relative z-10 mx-auto mt-4 max-w-7xl px-5 sm:px-8 lg:-mt-16"
      >
        <LightningWordmark />
      </div>

      {/* Modern High-End Divider Transition into About */}
      <div aria-hidden className="pointer-events-none relative mt-12 w-full">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative flex items-center justify-center">
            {/* Fine hairline divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
            {/* Center glowing badge */}
            <div className="absolute flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1 text-[0.65rem] font-mono uppercase tracking-widest text-muted-foreground shadow-sm">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Developer &bull; Designer &bull; Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

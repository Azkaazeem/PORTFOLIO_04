import { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { cvUrl } from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);

  // Smooth cinematic entrance for hero elements
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-copy] > *", { y: 24, opacity: 0, duration: 0.85, stagger: 0.1 }, 0.1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate flex min-h-[86vh] items-center justify-center overflow-hidden py-20 sm:py-28"
    >
      {/* Smoothly animated background image at 0.2 (20%) opacity */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/assets/aistudio/Untitled_design_63e8421d.jpg"
          alt=""
          className="hero-bg-animate h-full w-full object-cover object-center opacity-20 select-none"
        />
        {/* Soft vignette & vertical gradient so text stays crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/35 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_95%)]" />
      </div>

      {/* Subtle modern tech grid */}
      <div
        aria-hidden
        className="bg-grid-subtle mask-radial-fade pointer-events-none absolute inset-0 opacity-30"
      />

      {/* Atmospheric ambient red glows */}
      <div
        aria-hidden
        className="blob pointer-events-none absolute -right-28 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-5 sm:px-8 lg:px-12">
        <div data-hero-copy className="relative z-20 flex w-full max-w-5xl flex-col items-start">
          {/* Top doodle icons row: Monitor < / >, Lightbulb, and Red < / > */}
          <div className="mb-[clamp(0.5rem,1.2vw,1rem)] flex items-center gap-[clamp(1.25rem,2.5vw,2.25rem)]">
            {/* Monitor with code icon */}
            <svg
              viewBox="0 0 40 36"
              fill="none"
              className="h-7 w-8 text-foreground sm:h-9 sm:w-10 lg:h-10 lg:w-11"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="34"
                height="23"
                rx="3.5"
                stroke="currentColor"
                strokeWidth="2.2"
                transform="rotate(-3 20 14)"
              />
              <path
                d="M15 11.5L11.5 14.5L15 17.5M25 11.5L28.5 14.5L25 17.5M21.5 10L18.5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 27.5L12 32.5H28L26 27.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 32.5H31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>

            {/* Lightbulb with rays icon */}
            <svg
              viewBox="0 0 38 38"
              fill="none"
              className="h-7 w-7 text-foreground sm:h-9 sm:w-9 lg:h-10 lg:w-10"
              aria-hidden="true"
            >
              <circle cx="19" cy="18" r="6" className="fill-primary/35" />
              <path
                d="M14 24.5C12.2 22.8 11 20.4 11 17.5C11 13.1 14.6 9.5 19 9.5C23.4 9.5 27 13.1 27 17.5C27 20.4 25.8 22.8 24 24.5L23.2 27.5H14.8L14 24.5Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 30.5H22.5M16.8 33.5H21.2"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M19 3V5.5M8.5 7.5L10.5 9.5M29.5 7.5L27.5 9.5M4 17.5H6.5M31.5 17.5H34"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Code brackets < / > in primary red */}
            <svg
              viewBox="0 0 38 32"
              fill="none"
              className="h-6 w-7 text-primary sm:h-8 sm:w-9 lg:h-9 lg:w-10"
              aria-hidden="true"
            >
              <path
                d="M12 8L4 16L12 24M26 8L34 16L26 24M21.5 5L16.5 27"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Quote bars + tilted CREATIVE VISUAL & CODER pill */}
          <div className="mb-[clamp(0.75rem,1.6vw,1.35rem)] flex items-end gap-[clamp(0.75rem,1.5vw,1.25rem)]">
            {/* Two bold red tapered quote bars */}
            <svg
              viewBox="0 0 42 40"
              fill="none"
              className="h-8 w-8 shrink-0 text-primary sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              aria-hidden="true"
            >
              <path d="M2 2H17L14.5 36H4.5L2 2Z" fill="currentColor" />
              <path d="M23 2H38L35.5 36H25.5L23 2Z" fill="currentColor" />
            </svg>

            <div className="-rotate-2 rounded-md bg-primary px-3.5 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-primary-foreground shadow-[0_6px_20px_-4px_rgba(230,57,70,0.65)] sm:px-5 sm:py-2 sm:text-sm">
              CREATIVE VISUAL &amp; CODER
            </div>
          </div>

          {/* Single-line PORTOFOLO. heading with tilted camera icon */}
          <h1 className="flex flex-wrap items-baseline gap-x-[clamp(0.75rem,2vw,1.75rem)] select-none text-[clamp(2.8rem,9.2vw,8rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground whitespace-nowrap">
            <span>
              PORTOFOLO<span className="text-primary">.</span>
            </span>
            {/* Hand-drawn tilted camera icon */}
            <svg
              viewBox="0 0 48 42"
              fill="none"
              className="-rotate-12 inline-block h-[clamp(2rem,5vw,4rem)] w-[clamp(2.2rem,5.5vw,4.5rem)] -translate-y-[clamp(0.35rem,1vw,1rem)] text-foreground shrink-0"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="10"
                width="40"
                height="28"
                rx="5"
                stroke="currentColor"
                strokeWidth="2.8"
              />
              <path
                d="M15 10L18 4H30L33 10"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="8.5" stroke="currentColor" strokeWidth="2.8" />
              <circle cx="24" cy="24" r="3.5" className="fill-primary" />
              <circle cx="36.5" cy="16.5" r="2" fill="currentColor" />
            </svg>
          </h1>

          {/* Bio Paragraph — full fluid width without forced line breaks */}
          <p className="mt-[clamp(1.25rem,2.5vw,2rem)] w-full max-w-5xl text-[clamp(0.95rem,1.35vw,1.22rem)] leading-[1.7] text-muted-foreground">
            I&apos;m <strong className="font-bold text-foreground">Azka Azeem</strong>, a
            14-year-old data scientist, MERN stack developer, prompt engineer &amp; graphic designer
            based in Karachi. I build modern web applications, interactive 3D WebGL experiences, and
            clean digital architectures.
          </p>

          {/* Pill CTAs with offset solid shadows in Red & Black theme */}
          <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap items-center gap-[clamp(0.85rem,1.8vw,1.35rem)]">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-foreground bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[4px_5px_0px_0px_rgba(255,255,255,0.9)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_3px_0px_0px_rgba(255,255,255,0.9)] sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
            >
              <span>Selected Works</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </button>

            <a
              href={cvUrl}
              download="Azka_Azeem_CV.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-card px-7 py-3 text-sm font-bold text-foreground shadow-[4px_5px_0px_0px_var(--color-primary)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:border-primary hover:shadow-[2px_3px_0px_0px_var(--color-primary)] sm:px-8 sm:py-3.5 sm:text-base cursor-pointer"
            >
              <Download className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

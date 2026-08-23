import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { navItems } from "@/data/portfolio";
import { scrollToSection, scrollToTop } from "@/lib/scroll";
import { gsap, prefersReducedMotion, revealOnScroll } from "@/lib/gsap";
import LightningWordmark from "./LightningWordmark";

export default function Footer() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const trigger = root.current;

    const ctx = gsap.context(() => {
      revealOnScroll({ trigger, targets: "[data-footer-row]", stagger: 0.12 });
      gsap.from("[data-footer-mark]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger, start: "top 88%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-border/60 pt-16">
      <div
        aria-hidden
        className="blob pointer-events-none absolute bottom-0 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <nav
          data-footer-row
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-8"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="red-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div
          data-footer-row
          className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-border/60 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:pt-8"
        >
          <p className="text-xs text-muted-foreground sm:text-sm">
            Thanks for visiting my portfolio! 🩷
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:px-5 sm:py-3 sm:text-sm"
          >
            Back to Top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Watermark wordmark with electric pulse */}
      <div data-footer-mark className="pointer-events-none mt-8 select-none px-2 pb-4">
        <LightningWordmark />
      </div>
    </footer>
  );
}

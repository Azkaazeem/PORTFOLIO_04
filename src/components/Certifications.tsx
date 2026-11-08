import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { certifications, type Certification } from "@/data/portfolio";

export default function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
    }
  };

  // Certificate modal: close on Escape, lock scroll
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 sm:flex-row sm:items-end sm:px-8">
        <div>
          <p className="section-label text-[0.62rem] sm:text-[0.72rem]">My Certifications</p>
          <h2 className="display-xl mt-3 text-4xl sm:text-5xl lg:text-7xl">
            Certificates &amp; <span className="text-primary">Achievements</span>
          </h2>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:text-primary cursor-pointer"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:text-primary cursor-pointer"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Certificates Slider (Projects-style cards & arrow slider, no image badge) */}
      <div
        ref={scrollRef}
        className="mx-auto mt-10 flex max-w-[1400px] snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-10 sm:px-8 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {certifications.map((cert) => (
          <div
            key={cert.title}
            onClick={() => setActive(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(cert)}
            aria-label={`View certificate: ${cert.title}`}
            className="group relative w-[100%] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-glow-soft sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] cursor-pointer"
          >
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-muted/20 p-2">
              <img
                src={cert.image}
                alt={`${cert.title} certificate`}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105">
                  View Certificate <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {cert.issuer}
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground">{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Full-Size Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-2xl"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close certificate"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={active.image}
              alt={`${active.title} certificate, full size`}
              className="mx-auto h-auto max-h-[75vh] w-full rounded-lg object-contain"
            />
            <div className="px-1 pb-1 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {active.issuer}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-foreground">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

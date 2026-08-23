import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { certifications, type Certification } from "@/data/portfolio";

export default function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);

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
    <section id="certifications" className="relative bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-label">My Certifications</p>
        <h2 className="display-xl mt-4 text-4xl sm:text-5xl lg:text-6xl">
          Learning, Growing &amp; <span className="text-primary">Getting Certified</span>
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          Every certificate represents something I learned, practiced, and completed during my
          learning journey.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <button
              key={cert.title}
              onClick={() => setActive(cert)}
              className="group flex flex-col overflow-hidden rounded-md border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-primary hover:shadow-glow-soft"
              aria-label={`View certificate: ${cert.title}`}
            >
              <div className="relative overflow-hidden bg-background">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="h-48 w-full object-contain p-3"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                    View Certificate
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="border-t border-border/70 px-5 py-4">
                <span aria-hidden className="block h-0.5 w-8 bg-primary" />
                <h3 className="mt-3 text-sm font-semibold">{cert.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Certificate modal */}
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
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-md border border-border bg-card p-4"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close certificate"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={active.image}
              alt={`${active.title} certificate, full size`}
              className="mx-auto h-auto w-full max-w-full object-contain"
            />
            <div className="px-1 pb-1 pt-4">
              <h3 className="text-base font-semibold">{active.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{active.issuer}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

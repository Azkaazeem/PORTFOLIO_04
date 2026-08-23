import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

// Slight rotations create the layered, overlapping composition (desktop only).
const rotations = [-7, -3, 0, 4, 8];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);


  return (
    <section id="projects" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-label text-[0.62rem] sm:text-[0.72rem]">Selected Work</p>
        <h2 className="display-xl mt-3 text-4xl sm:text-5xl lg:text-7xl">
          My <span className="text-primary">Projects</span>
        </h2>
      </div>

      {/* Project hover animation: focused card straightens and lifts */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 justify-items-center gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:mt-16 lg:flex lg:-space-x-16 lg:flex-row lg:justify-center lg:gap-0">
        {projects.map((project, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;

          return (
            <button
              key={project.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group relative w-full max-w-sm shrink-0 overflow-hidden rounded-md border border-border bg-card text-left transition-all duration-500 ease-out"
              style={{
                transform: isDesktop
                  ? `rotate(${isActive ? 0 : rotations[i]}deg) scale(${isActive ? 1.07 : 1})`
                  : isActive
                    ? "scale(1.02)"
                    : undefined,
                zIndex: isActive ? 30 : 10 + i,
                filter: dimmed ? "brightness(0.45)" : "brightness(1)",
                boxShadow: isActive ? "var(--shadow-glow-soft)" : "none",
                borderColor: isActive ? "var(--primary)" : "var(--border)",
              }}
              aria-label={`${project.name} — ${project.tech}`}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-muted/45 transition-opacity duration-400 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-primary bg-background/80">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                  </span>
                </div>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {project.tech}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

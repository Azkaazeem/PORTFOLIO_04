import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

declare global {
  interface Window {
    __setProjectsProgress?: (progress: number) => void;
  }
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Horizontal scroll-driven sliding using native CSS sticky container + getBoundingClientRect()
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const applyProgress = (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const totalWidth = track.scrollWidth;
      const visibleWidth = viewport.clientWidth;
      const maxScroll = Math.max(0, totalWidth - visibleWidth);
      const tx = -clamped * maxScroll;
      track.style.transform = `translate3d(${tx.toFixed(2)}px, 0, 0)`;
    };

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      applyProgress(progress);
    };

    updateFromScroll();

    window.__setProjectsProgress = (p: number) => applyProgress(p);

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      delete window.__setProjectsProgress;
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative h-[380vh] w-full bg-background">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-background pt-16 pb-10 sm:pt-20 sm:pb-12">
        {/* Section Header (no prev/next arrows — driven by scroll) */}
        <div className="relative z-10 mx-auto w-full max-w-7xl shrink-0 px-5 sm:px-8">
          <p className="section-label text-[0.6rem] sm:text-[0.68rem]">Selected Work</p>
          <h2 className="display-xl mt-2 text-3xl sm:text-4xl lg:text-5xl">
            My <span className="text-primary">Projects</span>
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div ref={viewportRef} className="relative z-10 mt-5 sm:mt-7 w-full overflow-hidden py-3">
          <div
            ref={trackRef}
            data-projects-track
            className="flex w-max items-stretch gap-5 sm:gap-6 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] will-change-transform"
          >
            {projects.map((project, i) => (
              <article
                key={`${project.name}-${i}`}
                className="group relative flex w-[76vw] max-w-[340px] sm:w-[330px] lg:w-[360px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_14px_34px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-primary hover:shadow-glow-soft"
              >
                {/* Top Project Image Area + Top-Right Category Pill Badge in Red & Black theme */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${project.name} live demo`}
                  className="relative block aspect-[16/9.5] w-full overflow-hidden bg-surface"
                >
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    loading="eager"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Soft bottom vignette into card body */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent opacity-80" />

                  {/* Top-right category pill badge in website's Red & Black theme */}
                  <span className="absolute right-3 top-3 z-10 rounded-full border border-primary/40 bg-background/85 px-3 py-1 text-[0.58rem] sm:text-[0.65rem] font-extrabold uppercase tracking-[0.08em] text-primary shadow-md backdrop-blur-md transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    {project.tech}
                  </span>
                </a>

                {/* Bottom Editorial Footer with Title, Spaced Subtitle & Circular Action Buttons */}
                <div className="flex flex-1 items-center justify-between gap-3 border-t border-border/50 bg-card px-5 py-4 sm:px-5 sm:py-4.5">
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1 truncate text-[0.6rem] sm:text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {project.tech}
                    </p>
                  </div>

                  {/* Right circular action buttons (GitHub + Live Demo Arrow) in Red & Black theme */}
                  <div className="flex shrink-0 items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.name} GitHub repository`}
                        className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-primary hover:text-primary"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.name} Live Demo`}
                      className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-primary/40 bg-primary/15 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

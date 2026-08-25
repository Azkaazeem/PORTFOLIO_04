import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current;
      // Scroll by mostly one screen width, leaving a bit of context
      const scrollAmount = direction === "left" ? -(clientWidth * 0.8) : (clientWidth * 0.8);
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="section-label text-[0.62rem] sm:text-[0.72rem]">Selected Work</p>
          <h2 className="display-xl mt-3 text-4xl sm:text-5xl lg:text-7xl">
            My <span className="text-primary">Projects</span>
          </h2>
        </div>
        
        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => scroll("left")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors"
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Projects Slider */}
      <div 
        ref={scrollRef}
        className="mt-10 mx-auto max-w-[1400px] px-5 sm:px-8 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-10 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((project, i) => (
          <div 
            key={i} 
            className="group relative w-[85vw] max-w-[400px] shrink-0 snap-center overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-glow-soft"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center gap-4">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  Live Demo <ArrowUpRight className="h-4 w-4" />
                </a>
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-black/60"
                  >
                    GitHub <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="px-6 py-5">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {project.tech}
              </p>
              <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

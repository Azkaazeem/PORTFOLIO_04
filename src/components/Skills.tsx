import { skills } from "@/data/portfolio";

// Skills carousel — duplicated track for a seamless horizontal loop.
export default function Skills() {
  const cards = [...skills, ...skills];

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="blob pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/15"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="section-label">My Skills</p>
        <h2 className="display-xl mt-4 text-5xl sm:text-6xl lg:text-7xl">
          Tools I <span className="text-primary">Work</span> With
        </h2>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Web development, AI prompting and design — the stack I use to build and ship ideas.
        </p>
      </div>

      <div className="edge-fade mt-14 overflow-hidden">
        <div
          className="marquee-track marquee-left"
          style={{ "--marquee-duration": "60s" } as React.CSSProperties}
        >
          {cards.map((skill, i) => (
            <article
              key={`${skill.name}-${i}`}
              className="mx-3 flex w-48 shrink-0 flex-col items-center gap-3 rounded-md border border-border bg-card px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-glow-soft"
            >
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10"
              />
              <h3 className="text-sm font-semibold">{skill.name}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {skill.category}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

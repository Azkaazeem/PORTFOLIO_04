import { skillNames, skills } from "@/data/portfolio";

// Infinite skills marquee — the track is duplicated so the loop never shows a gap.
export default function SkillsMarquee() {
  const names = [...skillNames, ...skillNames];
  const logos = [...skills, ...skills];

  return (
    <div className="mt-20 space-y-5 border-y border-border/60 py-8">
      <div className="edge-fade overflow-hidden">
        <div className="marquee-track marquee-left" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
          {names.map((name, i) => (
            <span key={`${name}-${i}`} className="flex items-center whitespace-nowrap px-6">
              <span className="text-lg font-medium text-muted-foreground sm:text-xl">{name}</span>
              <span aria-hidden className="ml-6 h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div className="edge-fade overflow-hidden">
        <div className="marquee-track marquee-right" style={{ "--marquee-duration": "42s" } as React.CSSProperties}>
          {logos.map((skill, i) => (
            <span key={`${skill.name}-${i}`} className="px-7">
              <img
                src={skill.logo}
                alt={`${skill.name} logo`}
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-8 opacity-75 transition-opacity hover:opacity-100"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

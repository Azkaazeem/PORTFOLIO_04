import { useEffect, useRef } from "react";
import { skills } from "@/data/portfolio";
import { computeSkillCardPose } from "@/lib/skills-loop-math";

declare global {
  interface Window {
    __setSkillsProgress?: (progress: number) => void;
  }
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const applyPoses = (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      progressRef.current = clamped;
      const stageRect = stage.getBoundingClientRect();
      const vw = stageRect.width || window.innerWidth;
      const vh = stageRect.height || window.innerHeight;
      const isSmall = vw < 640;
      const cardWidth = isSmall ? 102 : 124;
      const cardHeight = isSmall ? 118 : 140;
      const totalCards = skills.length;

      for (let i = 0; i < totalCards; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const pose = computeSkillCardPose(clamped, i, {
          viewportWidth: vw,
          viewportHeight: vh,
          cardWidth,
          cardHeight,
          totalCards,
        });
        const tx = pose.x - cardWidth * 0.5;
        const ty = pose.y - cardHeight * 0.5;
        el.style.zIndex = String(pose.zIndex);
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${pose.rotation.toFixed(2)}deg)`;
      }
    };

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      applyPoses(progress);
    };

    // Initial render
    updateFromScroll();

    window.__setSkillsProgress = (p: number) => applyPoses(p);

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      delete window.__setSkillsProgress;
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Technical Stack and Skills"
      className="relative h-[360vh] w-full bg-background select-none"
    >
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Giant hollow outlined STACK background wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center pb-[8vh]"
        >
          <span
            className="font-black uppercase tracking-[-0.03em] text-transparent select-none"
            style={{
              fontSize: "clamp(5.2rem, 23vw, 22rem)",
              lineHeight: 0.9,
              WebkitTextStroke: "1.6px rgba(255, 255, 255, 0.16)",
            }}
          >
            STACK
          </span>
        </div>

        {/* Loop-de-loop skill cards stage */}
        <div className="relative h-full w-full">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-skill-card={skill.name}
              className="absolute left-0 top-0 flex h-[118px] w-[102px] sm:h-[140px] sm:w-[124px] flex-col items-center justify-between rounded-2xl border border-white/25 bg-[#0c0c10]/95 p-3 sm:p-4 shadow-[0_12px_32px_rgba(0,0,0,0.75)] backdrop-blur-md will-change-transform"
            >
              {/* Subtle brand radial glow inside card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-25"
                style={{
                  background: `radial-gradient(circle at 50% 42%, ${skill.glowColor}, transparent 72%)`,
                }}
              />

              {/* Centered skill icon */}
              <div className="relative z-10 flex flex-1 items-center justify-center">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={48}
                  height={48}
                  loading="eager"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Bold uppercase label at bottom */}
              <span className="relative z-10 text-center text-[0.62rem] sm:text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

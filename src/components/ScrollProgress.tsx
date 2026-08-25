import { useEffect, useState } from "react";

/** Very thin red scroll-progress line pinned at the very top of the page. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[3px] bg-transparent"
    >
      <div
        className="relative h-full bg-primary transition-all duration-150 ease-out"
        style={{ 
          width: `${progress * 100}%`,
          boxShadow: '0 0 10px 1px var(--primary)' 
        }}
      >
        {/* Glowing Head / Flare */}
        <div 
          className="absolute right-0 top-1/2 h-[14px] w-[30px] -translate-y-1/2 translate-x-1/2 rounded-full mix-blend-screen"
          style={{
             background: 'radial-gradient(ellipse at center, white 0%, var(--primary) 40%, transparent 80%)',
             filter: 'blur(1.5px)'
          }}
        />
        {/* Core bright dot */}
        <div 
           className="absolute right-0 top-1/2 h-[3px] w-[3px] -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_4px_var(--primary)]"
        />
      </div>
    </div>
  );
}

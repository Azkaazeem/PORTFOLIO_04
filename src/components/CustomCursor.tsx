import { useEffect, useRef, useState } from "react";

// Sleek, high-performance custom cursor — luxury trailing ring + precision center dot
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("hide-cursor");

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let isHovering = false;
    let isClicking = false;
    let onRed = false;
    let raf = 0;
    let lastSample = 0;

    const isRedish = (color: string) => {
      const m = color.match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return false;
      const r = Number(m[0]);
      const g = Number(m[1]);
      const b = Number(m[2]);
      return r > 120 && r > g * 1.5 && r > b * 1.5;
    };

    const sample = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;
      isHovering = !!el.closest("button, a, input, textarea, select, [role='button'], [data-cursor-hover]");
      let node: HTMLElement | null = el;
      let red = false;
      for (let i = 0; i < 4 && node; i++) {
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && !bg.includes("rgba(0, 0, 0, 0)")) {
          red = isRedish(bg);
          break;
        }
        node = node.parentElement;
      }
      onRed = red;
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const now = performance.now();
      if (now - lastSample > 80) {
        lastSample = now;
        sample(e.clientX, e.clientY);
      }
    };

    const onMouseDown = () => { isClicking = true; };
    const onMouseUp = () => { isClicking = false; };

    const render = () => {
      // Smooth lerp for trailing ring
      ring.x += (mouse.x - ring.x) * 0.22;
      ring.y += (mouse.y - ring.y) * 0.22;

      // Update ring
      if (ringRef.current) {
        const scale = isClicking ? 0.8 : isHovering ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = onRed ? "rgba(255, 255, 255, 0.7)" : "var(--primary)";
        ringRef.current.style.backgroundColor = isHovering
          ? onRed ? "rgba(255, 255, 255, 0.15)" : "oklch(0.58 0.222 25.5 / 15%)"
          : "transparent";
      }

      // Update center dot
      if (dotRef.current) {
        const dotScale = isClicking ? 1.4 : isHovering ? 0.6 : 1;
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.backgroundColor = onRed ? "#ffffff" : "var(--primary)";
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    raf = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("hide-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
      {/* Trailing halo ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-primary/50 transition-[border-color,background-color] duration-200 ease-out shadow-[0_0_12px_rgba(230,57,70,0.25)]"
        style={{ willChange: "transform" }}
      />
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full shadow-[0_0_8px_var(--primary)] transition-transform duration-75 ease-out"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

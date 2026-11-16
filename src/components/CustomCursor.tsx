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
      if (!color || color === "transparent" || color.includes("rgba(0, 0, 0, 0)")) {
        return false;
      }
      if (color.startsWith("oklch")) {
        const m = color.match(/\d+(\.\d+)?/g);
        if (!m || m.length < 3) return false;
        const l = Number(m[0]);
        const c = Number(m[1]);
        const h = Number(m[2]);
        return l > 0.3 && c > 0.1 && (h <= 55 || h >= 330);
      }
      const m = color.match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return false;
      const r = Number(m[0]);
      const g = Number(m[1]);
      const b = Number(m[2]);
      return r > 120 && r > g * 1.4 && r > b * 1.4;
    };

    const sample = (x: number, y: number) => {
      const stack = document.elementsFromPoint(x, y) as HTMLElement[];
      const topEl = stack[0];
      if (!topEl) return;
      isHovering = !!topEl.closest(
        "button, a, input, textarea, select, [role='button'], [data-cursor-hover]",
      );

      let red = false;
      for (const el of stack) {
        if (
          el.classList?.contains("bg-primary") ||
          el.classList?.contains("about-portrait-wrap") ||
          el.closest?.(".about-portrait-wrap, .bg-primary")
        ) {
          red = true;
          break;
        }
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "transparent" && !bg.includes("rgba(0, 0, 0, 0)")) {
          if (isRedish(bg)) {
            red = true;
          }
          break;
        }
      }
      onRed = red;
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const now = performance.now();
      if (now - lastSample > 45) {
        lastSample = now;
        sample(e.clientX, e.clientY);
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };
    const onMouseUp = () => {
      isClicking = false;
    };

    const render = () => {
      // Smooth lerp for trailing ring
      ring.x += (mouse.x - ring.x) * 0.22;
      ring.y += (mouse.y - ring.y) * 0.22;

      // Update ring
      if (ringRef.current) {
        const scale = isClicking ? 0.8 : isHovering ? 1.55 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = onRed ? "#08080a" : "var(--primary)";
        ringRef.current.style.boxShadow = onRed
          ? "0 0 0 1.5px rgba(0, 0, 0, 0.45), 0 4px 16px rgba(0, 0, 0, 0.85)"
          : "0 0 0 1.5px rgba(0, 0, 0, 0.85), 0 0 14px rgba(230, 57, 70, 0.45)";
        ringRef.current.style.backgroundColor = isHovering
          ? onRed
            ? "rgba(8, 8, 10, 0.28)"
            : "oklch(0.58 0.222 25.5 / 15%)"
          : onRed
            ? "rgba(8, 8, 10, 0.14)"
            : "transparent";
      }

      // Update center dot
      if (dotRef.current) {
        const dotScale = isClicking ? 1.4 : isHovering ? 0.75 : 1;
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.backgroundColor = onRed ? "#08080a" : "var(--primary)";
        dotRef.current.style.boxShadow = onRed
          ? "0 0 0 1.5px rgba(255, 255, 255, 0.35), 0 2px 10px rgba(0, 0, 0, 0.95)"
          : "0 0 0 1.5px rgba(0, 0, 0, 0.9), 0 0 8px var(--primary)";
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
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[10001] hidden md:block overflow-hidden"
    >
      {/* Trailing halo ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border-2 border-primary transition-[border-color,background-color,box-shadow] duration-150 ease-out"
        style={{ willChange: "transform" }}
      />
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full transition-[background-color,box-shadow,transform] duration-75 ease-out"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}

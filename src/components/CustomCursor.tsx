import { useEffect, useRef, useState } from "react";

const TRAIL = 14;

// Custom cursor effect — glowing blob with a soft color-reactive smoke trail + global interactive sparkles.
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const trail = useRef<HTMLDivElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("hide-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const points = Array.from({ length: TRAIL }, () => ({ ...pos }));
    let hovering = false;
    let onRed = false;
    let raf = 0;
    let lastSample = 0;

    // Canvas setup for global sparkles
    const canvas = canvasRef.current;
    let ctxCanvas: CanvasRenderingContext2D | null = null;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles: {x: number, y: number, r: number, vx: number, vy: number, life: number}[] = [];

    if (canvas) {
      ctxCanvas = canvas.getContext("2d");
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    const onResize = () => {
      if (canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", onResize);

    const isRedish = (color: string) => {
      const m = color.match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return false;
      const r = Number(m[0]);
      const g = Number(m[1]);
      const b = Number(m[2]);
      return r > 90 && r > g * 1.6 && r > b * 1.6;
    };

    // Sample what is under the cursor to flip the smoke color
    const sample = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;
      hovering = !!el.closest("button, a, img, [data-cursor-hover]");
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
      pos.x = e.clientX;
      pos.y = e.clientY;
      const now = performance.now();
      if (now - lastSample > 120) {
        lastSample = now;
        sample(e.clientX, e.clientY);
      }
    };

    const render = () => {
      // Trail rendering
      let prev = pos;
      points.forEach((p, i) => {
        p.x += (prev.x - p.x) * 0.15;
        p.y += (prev.y - p.y) * 0.15;
        const node = trail.current[i];
        if (node) {
          const scale = (1 - i / TRAIL) * (hovering ? 1.7 : 1);
          node.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${scale})`;
          node.style.backgroundColor = onRed ? "var(--background)" : "var(--primary)";
        }
        prev = p;
      });

      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
          hovering ? 2.1 : 1
        })`;
        dot.current.style.backgroundColor = onRed ? "var(--foreground)" : "var(--primary)";
      }

      // Sparkles canvas rendering
      if (ctxCanvas) {
        // Continuously emit sparkles even when stationary
        for(let i=0; i<3; i++) { // Spawn 3 particles per frame
          particles.push({
            x: pos.x + (Math.random() - 0.5) * 40,
            y: pos.y + (Math.random() - 0.5) * 40,
            r: Math.random() * 2.5 + 0.5,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 1
          });
        }

        ctxCanvas.clearRect(0, 0, w, h);
        for(let i=0; i<particles.length; i++) {
          let p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02; // Sparkle lifetime
          ctxCanvas.globalAlpha = Math.max(0, p.life);
          ctxCanvas.fillStyle = onRed ? "oklch(0.97 0.002 285)" : "oklch(0.58 0.222 25.5)"; // White if on red, otherwise primary red
          ctxCanvas.beginPath();
          ctxCanvas.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctxCanvas.fill();
        }
        particles = particles.filter(p => p.life > 0);
        ctxCanvas.globalAlpha = 1;
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("hide-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={(node) => {
            if (node) trail.current[i] = node;
          }}
          className="absolute left-0 top-0 rounded-full mix-blend-screen"
          style={{
            height: 36,
            width: 36,
            opacity: (1 - i / TRAIL) * 0.2,
            filter: `blur(${6 + i * 1.5}px)`,
            transition: "background-color 500ms ease",
          }}
        />
      ))}
      <div
        ref={dot}
        className="absolute left-0 top-0 h-4 w-4 rounded-full"
        style={{ transition: "background-color 400ms ease" }}
      />
    </div>
  );
}

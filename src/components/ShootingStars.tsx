import { useEffect, useRef } from "react";

interface ShootingStarsProps {
  direction?: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function ShootingStars({ direction = "top-left" }: ShootingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const getAngle = () => {
      switch (direction) {
        case "left": return { dx: 1, dy: 0 };
        case "right": return { dx: -1, dy: 0 };
        case "top": return { dx: 0, dy: 1 };
        case "bottom": return { dx: 0, dy: -1 };
        case "top-left": return { dx: 1, dy: 1 };
        case "top-right": return { dx: -1, dy: 1 };
        case "bottom-left": return { dx: 1, dy: -1 };
        case "bottom-right": return { dx: -1, dy: -1 };
        default: return { dx: 1, dy: 1 };
      }
    };

    interface Star {
      x: number; y: number;
      length: number;
      speed: number;
      opacity: number;
      life: number;
      maxLife: number;
      dx: number;
      dy: number;
      color: string;
    }
    
    let stars: Star[] = [];
    
    // Theme primary is roughly RGB(250, 20, 20)
    const colors = [
      "250, 40, 40", // Red
      "255, 100, 100", // Light red/pinkish
      "200, 10, 10"  // Darker red
    ];

    const spawnStar = () => {
      const { dx: baseX, dy: baseY } = getAngle();
      const variance = (Math.random() - 0.5) * 0.15;
      const nx = baseX + variance;
      const ny = baseY + variance;
      
      const mag = Math.sqrt(nx*nx + ny*ny);
      const fdx = nx / mag;
      const fdy = ny / mag;
      
      let x = 0, y = 0;
      
      if (direction.includes("left")) x = -50;
      else if (direction.includes("right")) x = w + 50;
      else x = Math.random() * w;
      
      if (direction.includes("top")) y = -50;
      else if (direction.includes("bottom")) y = h + 50;
      else y = Math.random() * h;
      
      if (direction === "left" || direction === "right") y = Math.random() * h;
      if (direction === "top" || direction === "bottom") x = Math.random() * w;
      
      if (direction === "top-left") {
        if (Math.random() > 0.5) { x = Math.random() * w; y = -50; }
        else { x = -50; y = Math.random() * h; }
      } else if (direction === "top-right") {
        if (Math.random() > 0.5) { x = Math.random() * w; y = -50; }
        else { x = w + 50; y = Math.random() * h; }
      } else if (direction === "bottom-left") {
        if (Math.random() > 0.5) { x = Math.random() * w; y = h + 50; }
        else { x = -50; y = Math.random() * h; }
      } else if (direction === "bottom-right") {
        if (Math.random() > 0.5) { x = Math.random() * w; y = h + 50; }
        else { x = w + 50; y = Math.random() * h; }
      }
      
      stars.push({
        x, y,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 8,
        opacity: Math.random() * 0.5 + 0.7,
        life: 0,
        maxLife: Math.random() * 150 + 50,
        dx: fdx,
        dy: fdy,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    let rafId: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Spawn chance
      if (Math.random() < 0.1) { 
        spawnStar();
      }
      
      for(let i = 0; i < stars.length; i++) {
        let s = stars[i];
        s.x += s.dx * s.speed;
        s.y += s.dy * s.speed;
        s.life++;
        
        let currentOpacity = s.opacity;
        if (s.life < 10) currentOpacity = s.opacity * (s.life / 10);
        else if (s.life > s.maxLife - 20) currentOpacity = Math.max(0, s.opacity * ((s.maxLife - s.life) / 20));
        
        const tailX = s.x - s.dx * s.length;
        const tailY = s.y - s.dy * s.length;
        
        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, currentOpacity)})`); // bright white head
        grad.addColorStop(0.05, `rgba(${s.color}, ${Math.min(1, currentOpacity)})`); 
        grad.addColorStop(1, `rgba(${s.color}, 0)`); // faded tail
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4.5;
        ctx.lineCap = "round";
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${s.color}, 0.8)`;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        
        // Reset shadow for next frame optimizations if needed, but we clearRect anyway so it's fine 
        // wait, shadow affects the line. Let's reset it to be safe.
        ctx.shadowBlur = 0;
      }
      
      stars = stars.filter(s => s.life < s.maxLife && s.x > -150 && s.x < w + 150 && s.y > -150 && s.y < h + 150);
      
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [direction]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none z-0" />;
}

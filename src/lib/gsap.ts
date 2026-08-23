// Shared GSAP setup + reusable reveal helpers.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealOptions = {
  trigger: Element;
  targets: gsap.TweenTarget;
  y?: number;
  x?: number;
  scale?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

/** One consistent scroll reveal used by every section. */
export function revealOnScroll({
  trigger,
  targets,
  y = 34,
  x = 0,
  scale,
  stagger = 0.1,
  duration = 0.8,
  delay = 0,
  start = "top 82%",
}: RevealOptions) {
  return gsap.from(targets, {
    y,
    x,
    ...(scale ? { scale } : {}),
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: "power3.out",
    scrollTrigger: { trigger, start, once: true },
  });
}

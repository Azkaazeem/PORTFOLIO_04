import { useEffect, useState } from "react";
import { azkaRest } from "@/lib/living-portrait-frames";
import { resolvePreloaderPhase, type PreloaderPhase } from "@/lib/preloader-timeline";

const CRITICAL_ASSETS = [
  "/assets/aistudio/637cb7b7-2be9-4931-9f7a-a30e6a517395_a9255698.png",
  azkaRest,
];

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export default function PortfolioPreloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("emblem");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autostart") === "1") {
      setPhase("done");
      return;
    }

    let assetsReady = false;
    let skipped = false;
    let rafId = 0;
    let revealTriggeredAt: number | null = null;
    const startTime = performance.now();

    // Lock body scroll while preloader is active
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const waitForAssets = async () => {
      try {
        const imagePromises = CRITICAL_ASSETS.map(preloadImage);
        const fontPromise =
          "fonts" in document && document.fonts?.ready
            ? document.fonts.ready.then(() => undefined)
            : Promise.resolve();
        const windowLoadPromise =
          document.readyState === "complete"
            ? Promise.resolve()
            : new Promise<void>((res) =>
                window.addEventListener("load", () => res(), { once: true }),
              );

        await Promise.all([...imagePromises, fontPromise, windowLoadPromise]);
      } catch {
        // Ignore individual asset errors so the site always opens
      } finally {
        assetsReady = true;
      }
    };

    void waitForAssets();

    const tick = (now: number) => {
      if (skipped) return;
      const elapsed = now - startTime;

      if (elapsed < 600) {
        setPhase("emblem");
      } else if (!assetsReady && elapsed < 2600) {
        setPhase("badgeFade");
      } else if (elapsed < 1250) {
        setPhase("badgeFade");
      } else {
        if (revealTriggeredAt === null) {
          revealTriggeredAt = elapsed;
        }
        const sinceReveal = elapsed - revealTriggeredAt;
        if (sinceReveal < 420) {
          setPhase("laser");
        } else if (sinceReveal < 950) {
          setPhase("split");
        } else {
          document.body.style.overflow = prevOverflow;
          setPhase("done");
          return;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      skipped = true;
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleSkip = () => {
    document.body.style.overflow = "";
    setPhase(
      resolvePreloaderPhase({
        elapsedMs: 5000,
        assetsReady: true,
        skipped: true,
        autostart: false,
      }),
    );
  };

  if (phase === "done") return null;

  const isSplitting = phase === "split";
  const isLaser = phase === "laser" || phase === "split";
  const hideBadgeBox = phase !== "emblem";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Azka Azeem Portfolio"
      data-testid="portfolio-preloader"
      data-phase={phase}
      className={`fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden select-none transition-opacity duration-500 ${
        isSplitting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Top Curtain Half */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[#070506] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Bottom Curtain Half */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#070506] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Warm Crimson Radial Ambient Glow in Center */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.24)_0%,rgba(136,19,55,0.10)_32%,rgba(7,5,6,0)_68%)] transition-opacity duration-500 ${
          isSplitting ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Center Brand Lockup */}
      <div
        className={`relative z-20 flex flex-col items-center px-6 transition-all duration-500 ${
          isSplitting ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Left Monogram Emblem with Dissolving 3D Dark Square Badge */}
          <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
            <div
              aria-hidden="true"
              className={`absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d1416] via-[#110b0c] to-[#080506] shadow-[0_14px_34px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-500 ${
                hideBadgeBox ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            {/* Stylized Red 'AA' Monogram SVG */}
            <svg
              viewBox="0 0 64 52"
              className="relative z-10 h-11 w-14 drop-shadow-[0_0_18px_rgba(230,57,70,0.55)] sm:h-12 sm:w-16"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="azkaPreloaderRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4d5a" />
                  <stop offset="55%" stopColor="#e63946" />
                  <stop offset="100%" stopColor="#9e1b24" />
                </linearGradient>
              </defs>
              {/* Sleek interlocking italic AA */}
              <path
                d="M8 44L23 8H32L21 44H13.5L16 35H11L8 44ZM17.8 28H23.2L25.8 17.5L17.8 28Z"
                fill="url(#azkaPreloaderRed)"
              />
              <path
                d="M25 44L40 8H49.5L56 44H47.5L46.2 35.5H35.2L31.5 44H25ZM37.8 28.5H45L43.4 17.2L37.8 28.5Z"
                fill="url(#azkaPreloaderRed)"
              />
              <path d="M6 31.5H57L54.5 34.5H3.5L6 31.5Z" fill="#ff5a66" fillOpacity="0.85" />
            </svg>
          </div>

          {/* Vertical Divider Line */}
          <div
            aria-hidden="true"
            className="h-12 w-[1.5px] bg-gradient-to-b from-transparent via-primary/70 to-transparent sm:h-16"
          />

          {/* Right Name & Cursive Subtitle */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-2xl font-bold uppercase tracking-[0.2em] text-foreground sm:text-4xl">
              AZKA AZEEM
            </span>
            <div className="mt-1 flex w-full items-center justify-center gap-2.5 sm:mt-1.5">
              <span
                aria-hidden="true"
                className="h-[1px] w-7 bg-gradient-to-r from-transparent to-primary/80 sm:w-11"
              />
              <span className="font-handwriting text-xl leading-none text-primary sm:text-2xl">
                Web &amp; AI Artistry
              </span>
              <span
                aria-hidden="true"
                className="h-[1px] w-7 bg-gradient-to-l from-transparent to-primary/80 sm:w-11"
              />
            </div>
          </div>
        </div>

        {/* Tracked Tagline Below */}
        <p className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-center text-[9px] font-medium uppercase tracking-[0.34em] text-foreground/75 sm:mt-7 sm:text-[11px]">
          <span>WHERE DATA SCIENCE MEETS CREATIVE CODE</span>
          <span aria-hidden="true" className="text-primary">
            &bull;
          </span>
          <span>KARACHI</span>
        </p>
      </div>

      {/* Horizontal Glowing Laser Split Line Across the Center (00:02 in reference video) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 transition-all duration-300 ease-out ${
          isLaser ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent shadow-[0_0_28px_4px_rgba(230,57,70,0.95)]" />
        <div className="mx-auto -mt-[1px] h-[1px] w-3/4 bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
      </div>

      {/* Bottom-Right SKIP Button */}
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip loading screen"
        className="fixed bottom-6 right-6 z-40 rounded-full border border-white/25 bg-black/40 px-5 py-1.5 text-[10px] font-medium uppercase tracking-[0.26em] text-foreground/80 backdrop-blur-sm transition-colors hover:border-primary hover:text-foreground cursor-pointer sm:bottom-8 sm:right-8"
      >
        SKIP
      </button>
    </div>
  );
}

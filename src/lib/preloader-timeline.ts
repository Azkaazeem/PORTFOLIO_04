export type PreloaderPhase = "emblem" | "badgeFade" | "laser" | "split" | "done";

export interface PreloaderStateInput {
  elapsedMs: number;
  assetsReady: boolean;
  skipped: boolean;
  autostart: boolean;
}

/**
 * Computes the current preloader animation phase based on elapsed time and asset readiness.
 * Ensures the website only opens once critical assets have loaded (or the safety timeout of 2600ms is reached).
 */
export function resolvePreloaderPhase(input: PreloaderStateInput): PreloaderPhase {
  if (input.autostart || input.skipped) {
    return "done";
  }
  if (input.elapsedMs < 600) {
    return "emblem";
  }
  const canStartReveal = (input.assetsReady && input.elapsedMs >= 1250) || input.elapsedMs >= 2600;
  if (!canStartReveal) {
    return "badgeFade";
  }
  const revealStartMs = input.assetsReady ? 1250 : 2600;
  const sinceReveal = input.elapsedMs - revealStartMs;
  if (sinceReveal < 420) {
    return "laser";
  }
  if (sinceReveal < 950) {
    return "split";
  }
  return "done";
}

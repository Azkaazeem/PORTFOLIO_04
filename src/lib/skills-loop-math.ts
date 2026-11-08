export interface LoopLayoutParams {
  viewportWidth: number;
  viewportHeight: number;
  cardWidth: number;
  cardHeight: number;
  totalCards: number;
}

export interface CardPose {
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  localProgress: number;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Computes the (x, y, rotation, zIndex) pose of card `index` (0..totalCards-1)
 * using constant arc-length kinematics along a horizontal baseline with a central
 * 360-degree counter-clockwise rollercoaster loop-de-loop.
 *
 * Because all cards travel at uniform arc-length speed separated by a fixed train
 * spacing `cardSpacing = cardWidth + 14`, cards on the horizontal segments form a
 * crisp, non-overlapping side-by-side row while 6-7 cards simultaneously form the
 * circular loop in the center.
 */
export function computeSkillCardPose(
  scrollProgress: number,
  index: number,
  params: LoopLayoutParams,
): CardPose {
  const { viewportWidth, viewportHeight, cardWidth, cardHeight, totalCards } = params;
  const p = clamp(scrollProgress, 0, 1);

  // Subtle physical deck offset when resting in the left or right stack
  const reverseIdx = Math.max(0, totalCards - 1 - index);
  const stackStep = Math.min(1.8, 30 / Math.max(1, totalCards));

  const marginX = Math.max(16, Math.min(44, viewportWidth * 0.03));
  const startX = marginX + cardWidth * 0.5 + reverseIdx * stackStep;
  const endX = viewportWidth - marginX - cardWidth * 0.5 - reverseIdx * stackStep;

  // Baseline Y near the bottom of the viewport
  const baseY = clamp(
    viewportHeight * 0.76,
    cardHeight * 1.5,
    viewportHeight - cardHeight * 0.62 - 20,
  );

  // Loop center X and radius R
  const loopCenterX = viewportWidth * 0.46;
  const maxRadiusByHeight = (baseY - cardHeight * 0.72) * 0.46;
  const maxRadiusByWidth = viewportWidth * 0.2;
  const loopRadius = clamp(Math.min(maxRadiusByHeight, maxRadiusByWidth), 90, 185);

  // Arc lengths of the 3 segments:
  // L1: straight entry from startX to loopCenterX
  // L2: 360-degree loop circumference (2 * pi * R)
  // L3: straight exit from loopCenterX to endX
  const L1 = Math.max(10, loopCenterX - startX);
  const L2 = 2 * Math.PI * loopRadius;
  const L3 = Math.max(10, endX - loopCenterX);
  const totalTrackLength = L1 + L2 + L3;

  // Fixed physical spacing between consecutive cards in the train
  const cardSpacing = cardWidth + 14;
  const totalTrainSpan = Math.max(0, totalCards - 1) * cardSpacing;
  const totalTravel = totalTrackLength + totalTrainSpan;

  // Current distance along the track for card `index`
  const rawS = p * totalTravel - index * cardSpacing;
  const s = clamp(rawS, 0, totalTrackLength);
  const localProgress = totalTrackLength > 0 ? s / totalTrackLength : 0;

  let x = startX;
  let y = baseY;
  let rotation = 0;

  if (s <= 0) {
    x = startX;
    y = baseY;
    rotation = 0;
  } else if (s < L1) {
    // Segment 1: Horizontal train entry from left stack to bottom of loop
    x = startX + s;
    y = baseY;
    rotation = 0;
  } else if (s <= L1 + L2) {
    // Segment 2: 360-degree counter-clockwise loop above baseline
    const loopT = (s - L1) / L2; // 0..1 around the circle
    const theta = Math.PI / 2 - loopT * Math.PI * 2;
    const circleCenterY = baseY - loopRadius;
    x = loopCenterX + loopRadius * Math.cos(theta);
    y = circleCenterY + loopRadius * Math.sin(theta);
    rotation = -360 * loopT;
  } else if (s < totalTrackLength) {
    // Segment 3: Horizontal train exit from bottom of loop to right stack
    const exitS = s - (L1 + L2);
    x = loopCenterX + exitS;
    y = baseY;
    rotation = -360;
  } else {
    x = endX;
    y = baseY;
    rotation = -360;
  }

  return {
    x,
    y,
    rotation,
    zIndex: index + 1,
    localProgress,
  };
}

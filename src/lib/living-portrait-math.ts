// Pure math, physics, zone detection, and expression recipe definitions
// for Azka Azeem's interactive WebGL Living Portrait (Section 2 / About).

export const IDS: Record<string, string> = {
  left: "20261031_041539_0c28e75d-625c-458f-8856-6b453a928025",
  closed: "20261031_041538_8fc82176-77a6-4184-8f32-945745b2f221",
  shock: "20261031_041539_ee462c23-6248-4ef8-83d4-807441048b67",
  tongue: "20261031_041539_75259b31-bca1-4dcd-adb9-31a25fa07a11",
  right: "20261031_041648_92b934ff-4d25-4e28-972f-cef1e88f054f",
  downleft: "20261031_041648_94ec5df2-86e4-481d-a104-6604cd3ee36b",
  upright: "20261031_041648_8de72dda-4c29-4d52-a259-acb682b21567",
  up: "20261031_041648_736f4839-4571-4677-898f-c5f64bfeb525",
  downright: "20261031_041649_eed87373-0d0c-4401-ab76-ad8da40421d3",
  down: "20261031_041649_143660e6-f71a-4874-b97f-fb8890d5b1a1",
  half: "20261031_041704_053e92a5-721a-4f93-86d8-631c1b8ea31a",
  cross: "20261031_041705_dc163465-5cfa-40c1-8c43-76c5deb789a0",
  angry: "20261031_041706_bc89f0b6-438d-46fc-86bd-d3ae08b1a561",
  scrunch: "20261031_041706_87b48b08-cc37-4278-96c2-8ac49d48a165",
  winkr: "20261031_041705_f622e78c-2c3d-4635-b4ac-bab0e5b2862a",
  winkl: "20261031_041705_df901488-4988-4b29-9517-44d417ead6f2",
  raised: "20261031_041705_53d6bed3-91ae-47f4-a306-6615fc30c3a7",
  puff: "20261031_041721_69a2bd4b-a663-4638-9fe1-952d640726e5",
  laugh: "20261031_041722_402f7a03-a57c-418c-a513-65d5ee89aecf",
  yawn: "20261031_041726_3ccd0f66-112a-408b-870d-84a73b907211",
  grin: "20261031_041722_14bedc29-1d7e-407f-800c-f8a584be9743",
  kiss: "20261031_041722_c9dfa379-7ad7-469a-a7a1-2207ea3b2132",
  cry: "20261031_041725_ab6d29ed-9c51-4d18-9a19-15161a42b914",
  smug: "20261031_041726_941343db-f191-42e2-a20d-76471622963b",
  scared: "20261031_041742_76d19aad-5f53-4657-bda1-ed0ba07d0919",
  fish: "20261031_041738_1b8b311f-0b40-4014-9301-f855cadf7775",
  blue: "20261031_041743_0d2ae3ce-1ef4-4e25-bde2-f850d836a452",
  dizzy: "20261031_041739_d2d94cc6-c8a8-4948-b160-433b4ee8d335",
  blonde: "20261031_041745_54be8d58-68ad-4cdc-b894-57f3820521fc",
  pink: "20261031_041742_b07d9eeb-d0c2-4684-bd82-dd0a34faae70",
  wind: "20261031_041748_a042c812-0a19-4c44-8e26-19ebba49d827",
  sse: "20261031_041847_06cd56a3-85a3-428f-9761-40f0455fea28",
  nnw: "20261031_041848_c954304f-6a0f-40e7-90a7-61e760ec3217",
  ese: "20261031_041848_cf01800b-186c-4534-b3fa-839000a9ab40",
  ene: "20261031_041848_5baf5c75-5af4-43cc-9e36-6d5bb7268cc9",
  wnw: "20261031_041848_9b609e34-57f0-47f0-a733-270f3d487766",
  ssw: "20261031_041848_08ae5fa2-0ba2-43b3-948c-dcde293d6957",
  wsw: "20261031_041849_84482741-9730-4a28-be2f-e85c04206a2d",
  ouch: "20261031_041903_1df48a13-6d25-42e4-9666-f762bc338f2a",
  deadpan: "20261031_041904_18bc71c8-d88a-4c12-9e43-82b8ac222b00",
  yawn1: "20261031_041904_3b68d48d-633a-4761-9af7-e574da308039",
  yawn2: "20261031_041904_7027967a-59be-4eec-b6e1-6ec2255df748",
  whistle1: "20261031_041905_03626778-4a7a-4bd8-9136-658e44c36fe3",
  nne: "20261031_041903_73a000c6-37b6-48a1-a60a-628954160c41",
  yawn4: "20261031_041905_66ce2f38-8e7d-4ade-b678-9020af378b08",
  sneeze1: "20261031_041920_d4fee90e-7fb7-43ff-b378-bc549653f68d",
  gum1: "20261031_041921_3c249ba4-f88e-49f5-b985-c7380ec5c91a",
  gum2: "20261031_041922_8d65cee5-5d05-4c89-a3c9-8a397c060e04",
  whistle2: "20261031_041920_ba051a0a-45bb-4004-b0e6-73d2cd519d71",
  sneeze2: "20261031_041920_f30e74cb-21f3-4f11-8b9d-e4a1f469307e",
  gum3: "20261031_041923_a427c4d9-f78a-41e5-acd6-91adc3c79025",
  gumpop: "20261031_041926_358ed853-58d5-45c0-bcb6-f052169c6f2d",
  hearts: "20261031_041938_b3929b4d-e3d9-4e5d-8cd0-7ec8ef5248ba",
  stars: "20261031_041940_4128a9d8-9ce2-4b51-a8b7-84cdcb0b4f12",
  snore: "20261031_041936_e5a6759e-7dd8-4425-a913-98ac6633603f",
  shy: "20261031_041937_7f0eff0c-37ce-4d0c-9f5d-547d75e45e93",
  sick: "20261031_041941_59aa6c28-2fc5-40d7-bb9a-699fd8539d59",
  rest: "20261031_040619_2f6f349e-a4a7-40db-8e9b-03b6acd8b99a",
};

export const RING = [
  "e",
  "ene",
  "ne",
  "nne",
  "n",
  "nnw",
  "nw",
  "wnw",
  "w",
  "wsw",
  "sw",
  "ssw",
  "s",
  "sse",
  "se",
  "ese",
] as const;

export const EYEFILE: Record<string, string> = {
  e: "right",
  ene: "ene",
  ne: "upright",
  nne: "nne",
  n: "up",
  nnw: "nnw",
  nw: "wnw",
  wnw: "wnw",
  w: "left",
  wsw: "wsw",
  sw: "downleft",
  ssw: "ssw",
  s: "down",
  sse: "sse",
  se: "downright",
  ese: "ese",
  half: "half",
  closed: "closed",
};

export const HAIRS = ["pink", "blue", "blonde"] as const;

// Calibrated facial landmark spots on Azka Azeem's portrait (src/assets/profile.png)
export const SPOT = {
  nose: [0.493, 0.382] as [number, number],
  brow: [0.5, 0.255] as [number, number],
  cheekR: [0.578, 0.388] as [number, number],
  cheekL: [0.415, 0.378] as [number, number],
  mouth: [0.493, 0.425] as [number, number],
  eyeCenter: [0.504, 0.32] as [number, number],
};

export const ZONES = {
  hover: {
    eyeL: "winkl",
    eyeR: "winkr",
    nose: "cross",
    mouth: "kiss",
  } as Record<string, string>,
  tap: {
    brow: "angry",
    eyeL: "ouch",
    eyeR: "ouch",
    nose: "act:sneeze",
    mouth: "act:gum",
    cheek: "puff",
    chin: "laugh",
  } as Record<string, string>,
};

export const ROTATION = [
  "yawn",
  "shifty",
  "gum",
  "fly",
  "flirt",
  "roll",
  "sneeze",
  "hair",
  "tug",
  "cross",
  "whistle",
  "doze",
  "cheeky",
  "wow",
  "sad",
] as const;

export type FaceZone = "hair" | "brow" | "eyeL" | "eyeR" | "nose" | "mouth" | "chin" | "cheek";

/**
 * Classifies normalized portrait UV coordinates (0..1, 0..1) into facial zones
 * calibrated to Azka Azeem's portrait in src/assets/profile.png.
 */
export function zoneAt(u: number, v: number): FaceZone {
  // Inner face oval centered at (0.50, 0.355), radii (0.145, 0.165)
  const faceA = (u - 0.5) / 0.145;
  const faceB = (v - 0.355) / 0.165;
  if (faceA * faceA + faceB * faceB > 1 || v < 0.21) {
    return "hair";
  }
  if (v < 0.288) {
    return "brow";
  }
  // Left eye around (0.441, 0.314)
  if (Math.abs(v - 0.314) < 0.032 && u > 0.39 && u < 0.482) {
    return "eyeL";
  }
  // Right eye around (0.567, 0.325)
  if (Math.abs(v - 0.325) < 0.032 && u > 0.52 && u < 0.612) {
    return "eyeR";
  }
  // Nose around (0.493, 0.382)
  if (Math.abs(u - 0.493) < 0.046 && v >= 0.31 && v < 0.404) {
    return "nose";
  }
  // Mouth around (0.493, 0.425)
  if (v >= 0.404 && v < 0.452 && Math.abs(u - 0.493) < 0.068) {
    return "mouth";
  }
  return v >= 0.452 ? "chin" : "cheek";
}

/**
 * Checks whether normalized UV (u, v) falls within Azka's interactive silhouette
 * (head, hijab, and shoulders) rather than the outer background margin.
 */
export function isSolidAvatar(u: number, v: number): boolean {
  if (u < 0.08 || u > 0.92 || v < 0.08 || v > 0.96) return false;
  // Head & hijab dome
  const headDx = (u - 0.5) / 0.27;
  const headDy = (v - 0.38) / 0.31;
  if (headDx * headDx + headDy * headDy <= 1) return true;
  // Scarf drape & shoulders
  if (v >= 0.52 && v <= 0.96) {
    const halfWidth = 0.27 + ((v - 0.52) / 0.44) * 0.17;
    if (Math.abs(u - 0.5) <= halfWidth) return true;
  }
  return false;
}

/**
 * Maps a 2D pointer delta vector to one of the 16 compass gaze directions.
 */
export function ringFor(dx: number, dy: number): string {
  const angle = (Math.atan2(-dy, dx) + Math.PI * 2) % (Math.PI * 2);
  const idx = Math.round(angle / (Math.PI / 8)) % 16;
  return RING[idx] ?? "e";
}

/**
 * Forces a single row or column back into monotonic order with minimum gap `gap`
 * so the WebGL triangle sheet can squash but never fold over itself.
 */
export function untangleLine(
  start: number,
  stride: number,
  field: Float32Array,
  base: Float32Array,
  lineP: Float32Array,
  lineA: Float32Array,
  lineB: Float32Array,
  M: number,
  N: number,
  gap: number,
): void {
  for (let i = 0; i < M; i++) {
    const k = start + i * stride;
    lineP[i] = (base[k] ?? 0) + (field[k] ?? 0);
  }
  lineA[0] = lineP[0] ?? 0;
  for (let i = 1; i < M; i++) {
    lineA[i] = Math.max(lineP[i] ?? 0, (lineA[i - 1] ?? 0) + gap);
  }
  lineB[N] = lineP[N] ?? 0;
  for (let i = N - 1; i >= 0; i--) {
    lineB[i] = Math.min(lineP[i] ?? 0, (lineB[i + 1] ?? 0) - gap);
  }
  for (let i = 0; i < M; i++) {
    const k = start + i * stride;
    field[k] = ((lineA[i] ?? 0) + (lineB[i] ?? 0)) / 2 - (base[k] ?? 0);
  }
}

export function untangleGrid(
  sx: Float32Array,
  sy: Float32Array,
  restX: Float32Array,
  restY: Float32Array,
  M: number,
  N: number,
  gap: number,
): void {
  const lineA = new Float32Array(M);
  const lineB = new Float32Array(M);
  const lineP = new Float32Array(M);
  for (let pass = 0; pass < 2; pass++) {
    for (let j = 0; j < M; j++) {
      untangleLine(j * M, 1, sx, restX, lineP, lineA, lineB, M, N, gap);
    }
    for (let i = 0; i < M; i++) {
      untangleLine(i, M, sy, restY, lineP, lineA, lineB, M, N, gap);
    }
  }
}

export interface BrushHold {
  u: number;
  v: number;
  list: Array<[number, number, number, number]>;
  px: number;
  py: number;
}

export function stepWavePhysics(
  ux: Float32Array,
  uy: Float32Array,
  vx: Float32Array,
  vy: Float32Array,
  M: number,
  N: number,
  dt: number,
  C: number,
  WOBBLE: number,
  GAMMA: number,
  NU: number,
  brush: BrushHold | null,
): void {
  const c2 = C * C;
  const wo2 = WOBBLE * WOBBLE;
  const count = M * M;
  for (let j = 1; j < N; j++) {
    for (let i = 1; i < N; i++) {
      const k = j * M + i;
      const l = k - 1;
      const r = k + 1;
      const t = k - M;
      const b = k + M;
      const uk = ux[k] ?? 0;
      const uyk = uy[k] ?? 0;
      const vxk = vx[k] ?? 0;
      const vyk = vy[k] ?? 0;
      const lx = (ux[l] ?? 0) + (ux[r] ?? 0) + (ux[t] ?? 0) + (ux[b] ?? 0) - 4 * uk;
      const ly = (uy[l] ?? 0) + (uy[r] ?? 0) + (uy[t] ?? 0) + (uy[b] ?? 0) - 4 * uyk;
      const lvx = (vx[l] ?? 0) + (vx[r] ?? 0) + (vx[t] ?? 0) + (vx[b] ?? 0) - 4 * vxk;
      const lvy = (vy[l] ?? 0) + (vy[r] ?? 0) + (vy[t] ?? 0) + (vy[b] ?? 0) - 4 * vyk;
      vx[k] = vxk + (c2 * lx - wo2 * uk - GAMMA * vxk + NU * lvx) * dt;
      vy[k] = vyk + (c2 * ly - wo2 * uyk - GAMMA * vyk + NU * lvy) * dt;
    }
  }
  if (brush) {
    for (const [k, w, u0, v0] of brush.list) {
      const K = 3000 * w;
      const D = 90 * w;
      const vxk = vx[k] ?? 0;
      const vyk = vy[k] ?? 0;
      vx[k] = vxk + ((u0 + brush.px * w - (ux[k] ?? 0)) * K - vxk * D) * dt;
      vy[k] = vyk + ((v0 + brush.py * w - (uy[k] ?? 0)) * K - vyk * D) * dt;
    }
  }
  for (let k = 0; k < count; k++) {
    ux[k] = (ux[k] ?? 0) + (vx[k] ?? 0) * dt;
    uy[k] = (uy[k] ?? 0) + (vy[k] ?? 0) * dt;
  }
}

export type LidStyle = "normal" | "happy" | "squint" | "wide";
export type SpecialOverlay =
  | "none"
  | "hearts"
  | "stars"
  | "dizzy"
  | "cry"
  | "tongue"
  | "gum1"
  | "gum2"
  | "gum3"
  | "gumpop"
  | "snore"
  | "sick"
  | "wind";

export interface ExpressionRecipe {
  /** Left eye normalized gaze offset [-1..1, -1..1] */
  gazeL: [number, number];
  /** Right eye normalized gaze offset [-1..1, -1..1] */
  gazeR: [number, number];
  /** Left eyelid closure 0 (open) .. 1 (closed), or -0.25 (wide shock) */
  lidL: number;
  /** Right eyelid closure 0 (open) .. 1 (closed), or -0.25 (wide shock) */
  lidR: number;
  lidStyle: LidStyle;
  /** Eyebrow vertical shift [-1 (down/angry) .. +1 (raised)] */
  browRaiseL: number;
  browRaiseR: number;
  /** Eyebrow slant [-1 (furrowed angry) .. +1 (worried/sad inner lift)] */
  browTiltL: number;
  browTiltR: number;
  /** Mouth corner smile [-1 (frown) .. +1 (big smile)] */
  mouthSmile: number;
  /** Mouth jaw open [0 .. 1] */
  mouthOpen: number;
  /** Mouth horizontal pucker [0 .. 1] (kiss/whistle/gum) */
  mouthPucker: number;
  /** Cheek puff [-0.8 (fish suck-in) .. +1 (puffed cheeks)] */
  cheekPuff: number;
  /** Nose scrunch [0 .. 1] */
  noseScrunch: number;
  /** Cheek blush intensity [0 .. 1] */
  blush: number;
  /** Hijab color tint override */
  hijabTint: "none" | "pink" | "blue" | "blonde";
  /** Special expression detail baked into this single frame */
  overlay: SpecialOverlay;
}

const DEFAULT_RECIPE: ExpressionRecipe = {
  gazeL: [0, 0],
  gazeR: [0, 0],
  lidL: 0,
  lidR: 0,
  lidStyle: "normal",
  browRaiseL: 0,
  browRaiseR: 0,
  browTiltL: 0,
  browTiltR: 0,
  mouthSmile: 0,
  mouthOpen: 0,
  mouthPucker: 0,
  cheekPuff: 0,
  noseScrunch: 0,
  blush: 0,
  hijabTint: "none",
  overlay: "none",
};

const COMPASS_VECTORS: Record<string, [number, number]> = {
  right: [0.95, 0],
  ene: [0.88, -0.38],
  upright: [0.68, -0.68],
  nne: [0.38, -0.88],
  up: [0, -0.92],
  nnw: [-0.38, -0.88],
  wnw: [-0.82, -0.48],
  left: [-0.95, 0],
  wsw: [-0.88, 0.38],
  downleft: [-0.68, 0.68],
  ssw: [-0.38, 0.88],
  down: [0, 0.92],
  sse: [0.38, 0.88],
  downright: [0.68, 0.68],
  ese: [0.88, 0.38],
};

export function getExpressionRecipe(name: string): ExpressionRecipe {
  const r: ExpressionRecipe = {
    ...DEFAULT_RECIPE,
    gazeL: [0, 0],
    gazeR: [0, 0],
  };

  if (name in COMPASS_VECTORS) {
    const v = COMPASS_VECTORS[name]!;
    r.gazeL = [v[0], v[1]];
    r.gazeR = [v[0], v[1]];
    // Subtle natural brow follow on vertical gaze
    r.browRaiseL = -v[1] * 0.25;
    r.browRaiseR = -v[1] * 0.25;
    return r;
  }

  switch (name) {
    case "rest":
      return r;
    case "half":
      return { ...r, lidL: 0.52, lidR: 0.52, browRaiseL: -0.1, browRaiseR: -0.1 };
    case "closed":
      return { ...r, lidL: 1, lidR: 1, browRaiseL: -0.15, browRaiseR: -0.15 };
    case "winkl":
      return {
        ...r,
        lidL: 1,
        lidR: 0,
        lidStyle: "happy",
        browRaiseL: -0.2,
        browRaiseR: 0.35,
        mouthSmile: 0.55,
        blush: 0.35,
      };
    case "winkr":
      return {
        ...r,
        lidL: 0,
        lidR: 1,
        lidStyle: "happy",
        browRaiseL: 0.35,
        browRaiseR: -0.2,
        mouthSmile: 0.55,
        blush: 0.35,
      };
    case "cross":
      return {
        ...r,
        gazeL: [0.88, 0.18],
        gazeR: [-0.88, 0.18],
        browTiltL: 0.3,
        browTiltR: 0.3,
        mouthPucker: 0.35,
        noseScrunch: 0.35,
      };
    case "shock":
      return {
        ...r,
        lidL: -0.25,
        lidR: -0.25,
        lidStyle: "wide",
        browRaiseL: 0.85,
        browRaiseR: 0.85,
        mouthOpen: 0.72,
        mouthPucker: 0.35,
      };
    case "scared":
      return {
        ...r,
        lidL: -0.28,
        lidR: -0.28,
        lidStyle: "wide",
        browRaiseL: 0.75,
        browRaiseR: 0.75,
        browTiltL: 0.75,
        browTiltR: 0.75,
        mouthOpen: 0.85,
        mouthSmile: -0.65,
      };
    case "ouch":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        lidStyle: "squint",
        browRaiseL: -0.45,
        browRaiseR: -0.45,
        browTiltL: 0.6,
        browTiltR: 0.6,
        noseScrunch: 0.8,
        mouthOpen: 0.35,
        mouthSmile: -0.5,
      };
    case "scrunch":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        lidStyle: "squint",
        browRaiseL: -0.6,
        browRaiseR: -0.6,
        browTiltL: -0.5,
        browTiltR: -0.5,
        noseScrunch: 0.95,
        mouthPucker: 0.6,
        mouthSmile: -0.3,
      };
    case "angry":
      return {
        ...r,
        lidL: 0.28,
        lidR: 0.28,
        browRaiseL: -0.75,
        browRaiseR: -0.75,
        browTiltL: -0.95,
        browTiltR: -0.95,
        noseScrunch: 0.6,
        mouthSmile: -0.75,
        cheekPuff: 0.25,
        blush: 0.4,
      };
    case "laugh":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        lidStyle: "happy",
        browRaiseL: 0.45,
        browRaiseR: 0.45,
        mouthSmile: 0.95,
        mouthOpen: 0.65,
        cheekPuff: 0.35,
        blush: 0.55,
      };
    case "grin":
      return {
        ...r,
        lidL: 0.15,
        lidR: 0.15,
        lidStyle: "happy",
        browRaiseL: 0.35,
        browRaiseR: 0.35,
        mouthSmile: 0.85,
        cheekPuff: 0.25,
        blush: 0.45,
      };
    case "kiss":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        lidStyle: "happy",
        browRaiseL: 0.25,
        browRaiseR: 0.25,
        mouthPucker: 0.95,
        mouthSmile: 0.2,
        blush: 0.65,
      };
    case "tongue":
      return {
        ...r,
        gazeL: [0, -0.15],
        gazeR: [0, -0.15],
        browRaiseL: 0.35,
        browRaiseR: 0.35,
        mouthSmile: 0.65,
        mouthOpen: 0.55,
        blush: 0.35,
        overlay: "tongue",
      };
    case "puff":
      return {
        ...r,
        gazeL: [-0.25, 0],
        gazeR: [-0.25, 0],
        browRaiseL: -0.35,
        browRaiseR: -0.35,
        browTiltL: -0.45,
        browTiltR: -0.45,
        mouthPucker: 0.75,
        cheekPuff: 1.0,
        blush: 0.6,
      };
    case "fish":
      return {
        ...r,
        gazeL: [0.75, 0],
        gazeR: [-0.75, 0],
        lidL: -0.15,
        lidR: -0.15,
        browRaiseL: 0.45,
        browRaiseR: 0.45,
        mouthPucker: 0.95,
        cheekPuff: -0.85,
      };
    case "smug":
      return {
        ...r,
        gazeL: [0.45, -0.1],
        gazeR: [0.45, -0.1],
        lidL: 0.38,
        lidR: 0.32,
        browRaiseL: -0.25,
        browRaiseR: 0.65,
        mouthSmile: 0.6,
      };
    case "raised":
      return {
        ...r,
        lidL: 0.15,
        lidR: -0.1,
        browRaiseL: -0.35,
        browRaiseR: 0.85,
        browTiltL: 0.3,
        browTiltR: 0.3,
        mouthSmile: -0.25,
      };
    case "deadpan":
      return {
        ...r,
        lidL: 0.48,
        lidR: 0.48,
        browRaiseL: -0.2,
        browRaiseR: -0.2,
        mouthSmile: -0.15,
      };
    case "shy":
      return {
        ...r,
        gazeL: [-0.55, 0.55],
        gazeR: [-0.55, 0.55],
        lidL: 0.25,
        lidR: 0.25,
        browRaiseL: 0.2,
        browRaiseR: 0.2,
        browTiltL: 0.65,
        browTiltR: 0.65,
        mouthSmile: 0.45,
        blush: 0.9,
      };
    case "cry":
      return {
        ...r,
        lidL: 0.35,
        lidR: 0.35,
        browRaiseL: 0.3,
        browRaiseR: 0.3,
        browTiltL: 0.9,
        browTiltR: 0.9,
        mouthSmile: -0.8,
        mouthOpen: 0.3,
        blush: 0.5,
        overlay: "cry",
      };
    case "dizzy":
      return {
        ...r,
        browRaiseL: 0.3,
        browRaiseR: -0.2,
        mouthOpen: 0.35,
        mouthPucker: 0.4,
        blush: 0.45,
        overlay: "dizzy",
      };
    case "hearts":
      return {
        ...r,
        browRaiseL: 0.45,
        browRaiseR: 0.45,
        mouthSmile: 0.8,
        mouthOpen: 0.25,
        cheekPuff: 0.25,
        blush: 0.85,
        overlay: "hearts",
      };
    case "stars":
      return {
        ...r,
        lidL: -0.15,
        lidR: -0.15,
        browRaiseL: 0.65,
        browRaiseR: 0.65,
        mouthSmile: 0.85,
        mouthOpen: 0.4,
        blush: 0.6,
        overlay: "stars",
      };
    case "yawn1":
      return {
        ...r,
        lidL: 0.45,
        lidR: 0.45,
        browRaiseL: 0.25,
        browRaiseR: 0.25,
        mouthOpen: 0.35,
        mouthPucker: 0.4,
      };
    case "yawn2":
      return {
        ...r,
        lidL: 0.75,
        lidR: 0.75,
        browRaiseL: 0.45,
        browRaiseR: 0.45,
        mouthOpen: 0.65,
        mouthPucker: 0.3,
      };
    case "yawn":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        lidStyle: "squint",
        browRaiseL: 0.6,
        browRaiseR: 0.6,
        mouthOpen: 0.95,
        mouthPucker: 0.25,
      };
    case "yawn4":
      return {
        ...r,
        lidL: 0.35,
        lidR: 0.35,
        browRaiseL: 0.1,
        browRaiseR: 0.1,
        mouthSmile: 0.25,
        blush: 0.3,
      };
    case "whistle1":
      return {
        ...r,
        gazeL: [-0.45, -0.45],
        gazeR: [-0.45, -0.45],
        browRaiseL: 0.4,
        browRaiseR: 0.4,
        mouthPucker: 0.9,
        mouthOpen: 0.18,
        cheekPuff: 0.45,
      };
    case "whistle2":
      return {
        ...r,
        gazeL: [0.45, -0.45],
        gazeR: [0.45, -0.45],
        browRaiseL: 0.4,
        browRaiseR: 0.4,
        mouthPucker: 0.95,
        mouthOpen: 0.22,
        cheekPuff: 0.6,
      };
    case "sneeze1":
      return {
        ...r,
        lidL: 0.65,
        lidR: 0.65,
        browRaiseL: 0.4,
        browRaiseR: 0.4,
        browTiltL: 0.5,
        browTiltR: 0.5,
        noseScrunch: 0.65,
        mouthOpen: 0.45,
        mouthSmile: -0.3,
      };
    case "sneeze2":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        lidStyle: "squint",
        browRaiseL: -0.6,
        browRaiseR: -0.6,
        noseScrunch: 1.0,
        mouthOpen: 0.8,
        cheekPuff: 0.4,
      };
    case "gum1":
      return {
        ...r,
        mouthPucker: 0.85,
        cheekPuff: 0.45,
        overlay: "gum1",
      };
    case "gum2":
      return {
        ...r,
        lidL: -0.1,
        lidR: -0.1,
        mouthPucker: 0.9,
        cheekPuff: 0.7,
        overlay: "gum2",
      };
    case "gum3":
      return {
        ...r,
        gazeL: [0.45, 0.35],
        gazeR: [-0.45, 0.35],
        lidL: -0.2,
        lidR: -0.2,
        browRaiseL: 0.5,
        browRaiseR: 0.5,
        mouthPucker: 0.95,
        cheekPuff: 0.9,
        overlay: "gum3",
      };
    case "gumpop":
      return {
        ...r,
        lidL: -0.2,
        lidR: -0.2,
        browRaiseL: 0.6,
        browRaiseR: 0.6,
        mouthOpen: 0.3,
        overlay: "gumpop",
      };
    case "snore":
      return {
        ...r,
        lidL: 1,
        lidR: 1,
        browRaiseL: -0.1,
        browRaiseR: -0.1,
        mouthOpen: 0.4,
        mouthPucker: 0.5,
        overlay: "snore",
      };
    case "sick":
      return {
        ...r,
        lidL: 0.55,
        lidR: 0.55,
        browTiltL: 0.7,
        browTiltR: 0.7,
        mouthSmile: -0.6,
        cheekPuff: 0.4,
        overlay: "sick",
      };
    case "wind":
      return {
        ...r,
        lidL: 0.65,
        lidR: 0.65,
        lidStyle: "squint",
        browRaiseL: -0.3,
        browRaiseR: -0.3,
        mouthOpen: 0.25,
        overlay: "wind",
      };
    case "pink":
      return {
        ...r,
        mouthSmile: 0.35,
        blush: 0.35,
        hijabTint: "pink",
      };
    case "blue":
      return {
        ...r,
        mouthSmile: 0.35,
        hijabTint: "blue",
      };
    case "blonde":
      return {
        ...r,
        mouthSmile: 0.35,
        hijabTint: "blonde",
      };
    default:
      return r;
  }
}

import test from "node:test";
import assert from "node:assert/strict";
import {
  IDS,
  RING,
  EYEFILE,
  SPOT,
  zoneAt,
  isSolidAvatar,
  ringFor,
  untangleGrid,
  stepWavePhysics,
  getExpressionRecipe,
} from "./living-portrait-math";

test("all 59 IDS keys produce valid expression recipes", () => {
  const keys = Object.keys(IDS);
  assert.ok(keys.length >= 58, `Expected at least 58 IDS keys, got ${keys.length}`);
  for (const key of keys) {
    const recipe = getExpressionRecipe(key);
    assert.ok(Array.isArray(recipe.gazeL) && recipe.gazeL.length === 2);
    assert.ok(Array.isArray(recipe.gazeR) && recipe.gazeR.length === 2);
    assert.ok(recipe.lidL >= -0.5 && recipe.lidL <= 1.2);
    assert.ok(recipe.lidR >= -0.5 && recipe.lidR <= 1.2);
  }
});

test("16 compass directions in RING map through ringFor and EYEFILE", () => {
  assert.equal(RING.length, 16);
  assert.equal(ringFor(1, 0), "e");
  assert.equal(ringFor(-1, 0), "w");
  assert.equal(ringFor(0, -1), "n");
  assert.equal(ringFor(0, 1), "s");

  for (const dir of RING) {
    const mapped = EYEFILE[dir];
    assert.ok(mapped && mapped in IDS, `Missing IDS entry for ${dir} -> ${mapped}`);
  }
});

test("zoneAt accurately maps Azka's portrait facial landmarks", () => {
  // Left eye center (0.441, 0.314) & Right eye center (0.567, 0.325)
  assert.equal(zoneAt(0.441, 0.314), "eyeL");
  assert.equal(zoneAt(0.567, 0.325), "eyeR");
  // Nose spot
  assert.equal(zoneAt(SPOT.nose[0], SPOT.nose[1]), "nose");
  // Mouth spot
  assert.equal(zoneAt(SPOT.mouth[0], SPOT.mouth[1]), "mouth");
  // Forehead / brow spot
  assert.equal(zoneAt(SPOT.brow[0], SPOT.brow[1]), "brow");
  // Cheeks
  assert.equal(zoneAt(SPOT.cheekR[0], SPOT.cheekR[1]), "cheek");
  assert.equal(zoneAt(SPOT.cheekL[0], SPOT.cheekL[1]), "cheek");
  // Chin
  assert.equal(zoneAt(0.492, 0.475), "chin");
  // Hijab / hair outer crown
  assert.equal(zoneAt(0.5, 0.16), "hair");
  assert.equal(zoneAt(0.31, 0.35), "hair");
});

test("isSolidAvatar distinguishes avatar silhouette from outer corners", () => {
  assert.equal(isSolidAvatar(0.5, 0.35), true);
  assert.equal(isSolidAvatar(0.5, 0.75), true);
  assert.equal(isSolidAvatar(0.02, 0.02), false);
  assert.equal(isSolidAvatar(0.98, 0.1), false);
});

test("untangleGrid enforces minimum gap and prevents mesh folding", () => {
  const N = 12;
  const M = N + 1;
  const OVER = 1.7;
  const SPAN = OVER / N;
  const ORIGIN = 0.5 - OVER / 2;
  const GAP = SPAN * 0.34;
  const count = M * M;
  const restX = new Float32Array(count);
  const restY = new Float32Array(count);
  const sx = new Float32Array(count);
  const sy = new Float32Array(count);

  for (let j = 0; j < M; j++) {
    for (let i = 0; i < M; i++) {
      const k = j * M + i;
      restX[k] = ORIGIN + i * SPAN;
      restY[k] = ORIGIN + j * SPAN;
    }
  }

  // Create an extreme fold in the middle of the sheet
  const center = 6 * M + 6;
  sx[center] = 0.45;
  sx[center + 1] = -0.45;
  sy[center] = 0.45;
  sy[center + M] = -0.45;

  untangleGrid(sx, sy, restX, restY, M, N, GAP);

  for (let j = 0; j < M; j++) {
    for (let i = 1; i < M; i++) {
      const k = j * M + i;
      const prev = (restX[k - 1] ?? 0) + (sx[k - 1] ?? 0);
      const curr = (restX[k] ?? 0) + (sx[k] ?? 0);
      assert.ok(curr - prev >= GAP - 1e-5, `Row fold detected at (${i}, ${j})`);
    }
  }
});

test("stepWavePhysics pulls nodes toward brush and remains finite", () => {
  const N = 10;
  const M = N + 1;
  const count = M * M;
  const ux = new Float32Array(count);
  const uy = new Float32Array(count);
  const vx = new Float32Array(count);
  const vy = new Float32Array(count);

  const mid = 5 * M + 5;
  const brush = {
    u: 0.5,
    v: 0.5,
    list: [[mid, 1.0, 0, 0] as [number, number, number, number]],
    px: 0.12,
    py: -0.08,
  };

  for (let s = 0; s < 20; s++) {
    stepWavePhysics(ux, uy, vx, vy, M, N, 1 / 240, 10, 14, 4, 2, brush);
  }

  assert.ok((ux[mid] ?? 0) > 0.01, "Expected positive x displacement toward brush");
  assert.ok((uy[mid] ?? 0) < -0.005, "Expected negative y displacement toward brush");
});

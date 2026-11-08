import { useEffect, useRef, useState } from "react";
import { Bug, CircleDot, Hand, Palette, Wind } from "lucide-react";
import {
  IDS,
  EYEFILE,
  HAIRS,
  SPOT,
  ZONES,
  ROTATION,
  zoneAt,
  isSolidAvatar,
  ringFor,
  untangleGrid,
  stepWavePhysics,
  computeGrabWeight,
  BrushHold,
} from "@/lib/living-portrait-math";
import { PORTRAIT_FRAME_URLS, azkaRest } from "@/lib/living-portrait-frames";

type ActExtra = {
  jolt?: [number, number, number, number, number];
  lean?: [number, number];
  wake?: number;
  call?: (now: number) => void;
};

type ActStep = [string, number, number, ActExtra?];

interface EngineControls {
  triggerAct: (name: string) => void;
  cycleHair: () => string;
  setMood: (face: string, durationMs: number) => void;
}

export default function LivingPortrait() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackRef = useRef<HTMLImageElement | null>(null);
  const flyRef = useRef<SVGSVGElement | null>(null);
  const handRef = useRef<SVGSVGElement | null>(null);
  const controlsRef = useRef<EngineControls | null>(null);
  const [bubbleText, setBubbleText] = useState("HEY! Drag & stretch my face!");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const fallback = fallbackRef.current;
    const fly = flyRef.current;
    const hand = handRef.current;
    if (!wrap || !canvas || !fallback || !fly || !hand) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;

    (window as unknown as { __faceEngine?: boolean }).__faceEngine = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const OVER = 1.7;
    const N = 72;
    const M = N + 1;
    const SPAN = OVER / N;
    const ORIGIN = 0.5 - OVER / 2;
    const WOBBLE = 3.2 * 2 * Math.PI;
    const REACH = 0.092 / SPAN;
    const C = REACH * WOBBLE;
    const GAMMA = 2 * 0.12 * WOBBLE;
    const NU = 0.16 * C;
    const GAP = SPAN * 0.34;

    const VS = `attribute vec2 a, d; attribute float s; varying vec2 vUv; varying float vS;
      uniform vec2 lean; uniform float overS;
      void main(){
        vUv = a;
        vS = s;
        float torsoPin = smoothstep(0.68, 0.45, a.y);
        vec2 p = a + d + lean * torsoPin;
        gl_Position = vec4(vec2(p.x - .5, .5 - p.y) * 2. / overS, 0., 1.);
      }`;

    const FS = `precision highp float; varying vec2 vUv; varying float vS;
      uniform sampler2D faceA, faceB, maskTex;
      uniform float fade;
      void main(){
        if(vUv.x < 0. || vUv.y < 0. || vUv.x > 1. || vUv.y > 1.){ gl_FragColor = vec4(0.); return; }
        float maskA = texture2D(maskTex, vUv).a;
        if(maskA < .004){ gl_FragColor = vec4(0.); return; }
        vec4 c = mix(texture2D(faceA, vUv), texture2D(faceB, vUv), fade);
        float a = maskA * c.a;
        if(a < .004){ gl_FragColor = vec4(0.); return; }
        gl_FragColor = vec4(c.rgb * vS * a, a);
      }`;

    const compileShader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const vsObj = compileShader(gl.VERTEX_SHADER, VS);
    const fsObj = compileShader(gl.FRAGMENT_SHADER, FS);
    const pr = gl.createProgram()!;
    gl.attachShader(pr, vsObj);
    gl.attachShader(pr, fsObj);
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const U = {
      over_: gl.getUniformLocation(pr, "overS"),
      lean: gl.getUniformLocation(pr, "lean"),
      faceA: gl.getUniformLocation(pr, "faceA"),
      faceB: gl.getUniformLocation(pr, "faceB"),
      maskTex: gl.getUniformLocation(pr, "maskTex"),
      fade: gl.getUniformLocation(pr, "fade"),
    };
    gl.uniform1f(U.over_, OVER);
    gl.uniform1i(U.faceA, 0);
    gl.uniform1i(U.faceB, 1);
    gl.uniform1i(U.maskTex, 2);

    // ---- the sheet: damped wave equation on the displacement of each node ----
    const count = M * M;
    const ux = new Float32Array(count);
    const uy = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const rest = new Float32Array(count * 2);
    const dyn = new Float32Array(count * 3);
    const sx = new Float32Array(count);
    const sy = new Float32Array(count);
    const restX = new Float32Array(count);
    const restY = new Float32Array(count);

    for (let j = 0, k = 0; j < M; j++) {
      for (let i = 0; i < M; i++) {
        const rx = ORIGIN + i * SPAN;
        const ry = ORIGIN + j * SPAN;
        rest[k++] = rx;
        rest[k++] = ry;
      }
    }
    for (let k = 0; k < count; k++) {
      restX[k] = rest[k * 2] ?? 0;
      restY[k] = rest[k * 2 + 1] ?? 0;
    }

    const idx = new Uint16Array(N * N * 6);
    for (let j = 0, k = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const a = j * M + i;
        const b = a + 1;
        const c = a + M;
        const d = c + 1;
        idx[k++] = a;
        idx[k++] = c;
        idx[k++] = b;
        idx[k++] = b;
        idx[k++] = c;
        idx[k++] = d;
      }
    }

    const staticBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, staticBuf);
    gl.bufferData(gl.ARRAY_BUFFER, rest, gl.STATIC_DRAW);
    const aa = gl.getAttribLocation(pr, "a");
    gl.enableVertexAttribArray(aa);
    gl.vertexAttribPointer(aa, 2, gl.FLOAT, false, 0, 0);

    const dynBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf);
    gl.bufferData(gl.ARRAY_BUFFER, dyn, gl.DYNAMIC_DRAW);
    const ad = gl.getAttribLocation(pr, "d");
    const as = gl.getAttribLocation(pr, "s");
    gl.enableVertexAttribArray(ad);
    gl.vertexAttribPointer(ad, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(as);
    gl.vertexAttribPointer(as, 1, gl.FLOAT, false, 12, 8);

    const elemBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let brush: BrushHold | null = null;
    function takeHold(u: number, v: number, radius = 0.13, px = 0, py = 0) {
      const list: Array<[number, number, number, number]> = [];
      for (let k = 0; k < count; k++) {
        const rx = rest[k * 2] ?? 0;
        const ry = rest[k * 2 + 1] ?? 0;
        const w = computeGrabWeight(
          rx,
          ry,
          ux[k] ?? 0,
          uy[k] ?? 0,
          u,
          v,
          radius,
          ORIGIN,
          OVER,
          px,
          py,
        );
        if (w > 0.008) {
          list.push([k, w, ux[k] ?? 0, uy[k] ?? 0]);
        }
      }
      brush = { u, v, list, px, py };
    }

    function poke(u: number, v: number, dx: number, dy: number, radius = 0.09) {
      for (let k = 0; k < count; k++) {
        const ax = (rest[k * 2] ?? 0) - u;
        const ay = (rest[k * 2 + 1] ?? 0) - v;
        const w = Math.exp(-(ax * ax + ay * ay) / (radius * radius));
        vx[k] = (vx[k] ?? 0) + dx * w;
        vy[k] = (vy[k] ?? 0) + dy * w;
      }
    }

    // ---- WebGL textures loaded directly from pixel-aligned 3D portrait renders ----
    const tex: Record<string, WebGLTexture> = {};
    const urlTexCache = new Map<string, Promise<WebGLTexture>>();
    let maskGlTex: WebGLTexture | null = null;
    let restImageEl: HTMLImageElement | null = null;

    const param = () => {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

    // Build an exact, hole-free full-figure silhouette mask (head, hijab, arms, and floral shirt down to v = 1.0)
    // while removing 100% of the vertical-pleated pink curtain background.
    function buildSilhouetteMaskTexture(fgImg: HTMLImageElement) {
      const S = 512;
      const c = document.createElement("canvas");
      c.width = S;
      c.height = S;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;

      ctx.drawImage(fgImg, 0, 0, S, S);
      const fg = ctx.getImageData(0, 0, S, S);
      const fgData = fg.data;

      const rawLeft = new Int32Array(S).fill(S);
      const rawRight = new Int32Array(S).fill(-1);

      const isFgAt = (x: number, y: number, v: number) => {
        const idx = (y * S + x) * 4;
        const r = fgData[idx] ?? 0;
        const g = fgData[idx + 1] ?? 0;
        const b = fgData[idx + 2] ?? 0;
        if (r < 95 && g < 88 && b < 95) return true;
        if (v <= 0.585) return false;
        if (x > S * 0.5 && v <= 0.625) return false;

        const yUp = Math.max(0, y - 4);
        const yDn = Math.min(S - 1, y + 4);
        const idxUp = (yUp * S + x) * 4;
        const idxDn = (yDn * S + x) * 4;
        const vGrad =
          Math.abs((fgData[idxDn] ?? r) - (fgData[idxUp] ?? r)) +
          Math.abs((fgData[idxDn + 1] ?? g) - (fgData[idxUp + 1] ?? g)) +
          Math.abs((fgData[idxDn + 2] ?? b) - (fgData[idxUp + 2] ?? b));

        const rg = r - g;
        const bg = b - g;
        const isPinkCurtain =
          r >= 138 &&
          g >= 85 &&
          g <= 168 &&
          b >= 95 &&
          b <= 178 &&
          rg >= 42 &&
          rg <= 96 &&
          bg >= -4 &&
          bg <= 26 &&
          vGrad <= 28;

        return !isPinkCurtain;
      };

      let prevLx = Math.floor(S * 0.25);
      let prevRx = Math.floor(S * 0.75);

      for (let y = 0; y < S; y++) {
        const v = y / (S - 1);
        if (v < 0.118) continue;

        let lx = S;
        const minSleeveU =
          v <= 0.625 ? 0.228 - ((v - 0.585) / 0.04) * 0.052 : 0.176 - ((v - 0.625) / 0.375) * 0.084;
        const minX =
          v <= 0.585
            ? Math.floor(S * 0.06)
            : Math.max(Math.round(minSleeveU * (S - 1)), prevLx - 1);
        const midX = Math.floor(S * 0.5);
        for (let x = minX; x < midX; x++) {
          let hits = 0;
          for (let dx = 0; dx < 5; dx++) {
            if (isFgAt(Math.min(S - 1, x + dx), y, v)) hits++;
          }
          if (hits >= 4) {
            lx = x;
            break;
          }
        }

        let rx = -1;
        const maxSleeveU =
          v <= 0.665 ? 0.806 + ((v - 0.625) / 0.04) * 0.034 : 0.84 + ((v - 0.665) / 0.335) * 0.072;
        const maxX =
          v <= 0.625
            ? Math.floor(S * 0.94)
            : Math.min(Math.round(maxSleeveU * (S - 1)), prevRx + 1);
        for (let x = maxX; x >= midX; x--) {
          let hits = 0;
          for (let dx = 0; dx < 5; dx++) {
            if (isFgAt(Math.max(0, x - dx), y, v)) hits++;
          }
          if (hits >= 4) {
            rx = x;
            break;
          }
        }

        if (lx < rx) {
          prevLx = lx;
          prevRx = rx;
          // Step 3px inward to eliminate any pink JPEG anti-aliasing halo along the hijab & sleeve seam
          rawLeft[y] = lx + 3;
          rawRight[y] = rx - 3;
        }
      }

      // Smooth silhouette contour across rows and keep full arms & shirt all the way to the bottom of the box (v = 1.0)
      const out = ctx.createImageData(S, S);
      const outData = out.data;

      for (let y = 0; y < S; y++) {
        const v = y / (S - 1);
        let sumL = 0;
        let sumR = 0;
        let cnt = 0;
        for (let dy = -4; dy <= 4; dy++) {
          const yy = Math.max(0, Math.min(S - 1, y + dy));
          if ((rawLeft[yy] ?? S) < (rawRight[yy] ?? -1)) {
            sumL += rawLeft[yy]!;
            sumR += rawRight[yy]!;
            cnt++;
          }
        }
        if (cnt === 0) continue;
        const lEdge = sumL / cnt;
        const rEdge = sumR / cnt;
        if (lEdge >= rEdge) continue;

        // Soft top crown feather; keep bottom solid all the way to v = 1.0 so arms & shirt fill the box down to the bottom edge
        const topFeather = Math.max(0, Math.min(1, (v - 0.116) / 0.01));
        const vAlpha = topFeather;

        for (let x = 0; x < S; x++) {
          const distIn = Math.min(x - lEdge, rEdge - x);
          if (distIn <= -2) continue;
          const hAlpha = Math.max(0, Math.min(1, (distIn + 1.5) / 3.0));
          const a = Math.round(hAlpha * vAlpha * 255);
          const idx = (y * S + x) * 4;
          outData[idx] = 255;
          outData[idx + 1] = 255;
          outData[idx + 2] = 255;
          outData[idx + 3] = a;
        }
      }

      const t = gl.createTexture()!;
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, out);
      param();
      maskGlTex = t;
    }

    function loadPortraitTexture(name: string): Promise<WebGLTexture> {
      if (tex[name]) return Promise.resolve(tex[name]!);
      const url = PORTRAIT_FRAME_URLS[name] ?? azkaRest;
      const existing = urlTexCache.get(url);
      if (existing) {
        return existing.then((t) => {
          tex[name] = t;
          return t;
        });
      }
      const p = new Promise<WebGLTexture>((resolve) => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.onload = () => {
          if (disposed) return;
          if (name === "rest" && !restImageEl) {
            restImageEl = im;
          }
          const t = gl.createTexture()!;
          gl.activeTexture(gl.TEXTURE5);
          gl.bindTexture(gl.TEXTURE_2D, t);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
          param();
          tex[name] = t;
          resolve(t);
        };
        im.onerror = () => {
          if (tex["rest"]) {
            tex[name] = tex["rest"]!;
            resolve(tex["rest"]!);
          }
        };
        im.src = url;
      });
      urlTexCache.set(url, p);
      return p;
    }

    // ---- acts & choreography ----
    let wantEyes: string | null = null;
    let handHeld = false;
    let handGrip: false | "on" | "pull" | "off" = false;
    let handFrom: [number, number] = [1.4, 0.9];
    let handTo: [number, number] = [1.4, 0.9];
    let flyFrom: [number, number] = [1.4, 0];
    let flyTo: [number, number] = [1.4, 0];
    let moveT = 0;
    let moveMs = 1;
    let flyPos: [number, number] = [1.4, 0];

    const place = (el: SVGSVGElement, u: number, v: number) => {
      el.style.left = (u - 0.5) * 100 + 50 + "%";
      el.style.top = (v - 0.5) * 100 + 50 + "%";
    };
    const moveHand = (u: number, v: number, ms: number) => (now: number) => {
      handFrom = handTo;
      handTo = [u, v];
      moveT = now;
      moveMs = ms;
    };
    const moveFly = (u: number, v: number, ms: number) => (now: number) => {
      flyFrom = flyTo;
      flyTo = [u, v];
      moveT = now;
      moveMs = ms;
    };

    const ACTS: Record<string, ActStep[] | "fly" | "tug" | "hair"> = {
      yawn: [
        ["yawn1", 140, 240],
        ["yawn2", 140, 200],
        ["yawn", 170, 900],
        ["yawn2", 150, 130],
        ["yawn4", 180, 700],
      ],
      whistle: [
        ["whistle1", 150, 700],
        ["whistle2", 100, 700],
        ["whistle1", 100, 620],
        ["whistle2", 100, 620],
      ],
      shifty: [
        ["eye:w", 60, 520],
        ["eye:e", 60, 600],
        ["eye:w", 60, 400],
        ["eye:rest", 60, 260],
      ],
      roll: [
        ["eye:w", 70, 200],
        ["eye:wnw", 50, 55],
        ["eye:nw", 50, 55],
        ["eye:nnw", 50, 60],
        ["eye:n", 50, 140],
        ["eye:nne", 50, 60],
        ["eye:ne", 50, 55],
        ["eye:ene", 50, 55],
        ["eye:e", 50, 240],
        ["eye:rest", 90, 200],
        ["deadpan", 120, 700],
      ],
      sneeze: [
        ["sneeze1", 130, 380],
        ["half", 90, 120],
        ["sneeze1", 90, 560],
        ["sneeze2", 50, 300, { jolt: [SPOT.nose[0], SPOT.nose[1], 0, 1.4, 0.32], lean: [0, 0.03] }],
        ["dizzy", 110, 620],
        ["shy", 140, 650],
      ],
      gum: [
        ["gum1", 110, 550],
        ["gum2", 130, 600],
        ["gum3", 150, 750],
        ["gumpop", 35, 2800, { jolt: [SPOT.mouth[0], SPOT.mouth[1], 0, -1.0, 0.28] }],
        ["laugh", 140, 800],
      ],
      cheeky: [
        ["winkl", 90, 340],
        ["tongue", 110, 900],
        ["grin", 120, 620],
      ],
      cross: [
        ["cross", 140, 800],
        ["fish", 130, 800],
        ["puff", 120, 700, { jolt: [SPOT.mouth[0], SPOT.mouth[1], 0, -0.25, 0.3] }],
        ["laugh", 90, 800],
      ],
      sad: [
        ["raised", 140, 500],
        ["cry", 240, 1500],
        ["shy", 200, 520],
      ],
      wow: [
        ["stars", 130, 1000],
        ["grin", 140, 640],
      ],
      fly: "fly",
      tug: "tug",
      hair: "hair",
    };

    function flyAct(): ActStep[] {
      flyTo = [1.35, 0.02];
      fly!.style.opacity = "1";
      lookAt = () => flyPos;
      const hop = (u: number, v: number, ms: number): ActStep => [
        "rest",
        40,
        ms,
        { call: moveFly(u, v, ms * 0.9) },
      ];
      return [
        hop(0.86, 0.18, 620),
        hop(0.16, 0.26, 680),
        hop(0.84, 0.48, 640),
        hop(0.2, 0.44, 600),
        hop(SPOT.nose[0], SPOT.nose[1], 520),
        ["cross", 110, 950, { jolt: [SPOT.nose[0], SPOT.nose[1], 0, 0.28, 0.05] }],
        ["whistle1", 90, 340, { call: moveFly(0.5, 0.2, 280) }],
        ["deadpan", 110, 480, { call: moveFly(SPOT.nose[0], SPOT.nose[1], 320) }],
        ["cross", 90, 560, { jolt: [SPOT.nose[0], SPOT.nose[1], 0, 0.28, 0.05] }],
        ["whistle2", 90, 620, { call: moveFly(1.45, -0.3, 600) }],
        ["smug", 120, 600],
      ];
    }

    function tugAct(): ActStep[] {
      handTo = [1.3, 0.76];
      hand!.style.opacity = "1";
      hand!.classList.remove("shut");
      const g = (
        u: number,
        v: number,
        ms: number,
        face: string,
        grip: false | "on" | "pull" | "off",
      ): ActStep => [
        face,
        90,
        ms,
        {
          call: (now: number) => {
            moveHand(u, v, ms * 0.8)(now);
            handGrip = grip;
          },
        },
      ];
      return [
        g(SPOT.cheekR[0], SPOT.cheekR[1], 760, "eye:se", false),
        g(SPOT.cheekR[0], SPOT.cheekR[1], 240, "shock", "on"),
        g(0.88, 0.32, 620, "ouch", "pull"),
        g(0.68, 0.42, 240, "ouch", "pull"),
        g(0.92, 0.28, 260, "scared", "pull"),
        g(0.74, 0.38, 260, "ouch", "pull"),
        g(1.35, 0.22, 1000, "dizzy", "off"),
        ["angry", 120, 620],
      ];
    }

    function hairAct(): ActStep[] {
      return [
        ["pink", 70, 950],
        ["blue", 70, 850],
        ["blonde", 70, 950],
        ["rest", 70, 200],
      ];
    }

    // ---- runtime state ----
    let ready = false;
    let disposed = false;
    let rafId = 0;
    let tStart = 0;
    let last = performance.now();
    let mx = 0;
    let my = 0;
    let pu = 0.5;
    let pv = 0.32;
    let onHead = false;
    let zone: string | null = null;
    let zoneSince = 0;
    let lastInput = performance.now();
    let awake = true;
    let pressed = false;
    let downAt = 0;
    let downU = 0;
    let downV = 0;
    let lastX = 0;
    let lastY = 0;
    let speed = 0;
    let shake = 0;
    let moodFace: string | null = null;
    let moodUntil = 0;
    let pulls: number[] = [];
    let lookAt: (() => [number, number]) | null = null;
    let act: ActStep[] | null = null;
    let actI = 0;
    let actT = 0;
    let rotation: string[] = [];
    let nextIdle = 30000;
    let faceA = "rest";
    let faceB = "rest";
    let fadeT = 0;
    let fadeMs = 1;
    let logical = "rest";
    let logicalMs = 70;
    let eyeNow = "rest";
    let eyeNowMs = 40;
    let nextBlink = performance.now() + 2000;
    let blinkStep = -1;
    let blinkT = 0;
    let leanX = 0;
    let leanY = 0;
    let lvX = 0;
    let lvY = 0;
    let wantLean: [number, number] = [0, 0];
    let hairI = -1; // -1 is her own black hijab, then pink, blue, blonde

    const fileOf = (cell: string) => (cell === "rest" ? "rest" : (EYEFILE[cell] ?? "rest"));
    const setFace = (n: string, ms: number) => {
      logical = n;
      logicalMs = ms;
    };
    const setEye = (cell: string, ms: number) => {
      const f = fileOf(cell);
      if (tex[f]) {
        eyeNow = cell;
        eyeNowMs = ms;
      } else {
        void loadPortraitTexture(f);
      }
    };

    function show(n: string, ms: number, now: number) {
      if (!tex[n]) {
        void loadPortraitTexture(n);
        return;
      }
      if (n === faceB) return;
      faceA = (now - fadeT) / fadeMs > 0.5 ? faceB : faceA;
      faceB = n;
      canvas.dataset.face = n;
      fadeT = now;
      fadeMs = Math.min(70, Math.max(1, ms));
    }

    function compose(now: number) {
      if (logical !== "rest") show(logical, logicalMs, now);
      else if (hairI >= 0) show(HAIRS[hairI]!, 70, now);
      else show(fileOf(eyeNow), eyeNowMs, now);
    }

    function startAct(name: string, now: number) {
      endAct();
      const a = ACTS[name];
      if (!a) return;
      if (a === "fly") act = flyAct();
      else if (a === "tug") act = tugAct();
      else if (a === "hair") act = hairAct();
      else act = a;
      actI = -1;
      actT = now;
      advance(now);
    }

    function endAct() {
      act = null;
      fly!.style.opacity = "0";
      hand!.style.opacity = "0";
      lookAt = null;
      if (handHeld) {
        handHeld = false;
        brush = null;
        hand!.classList.remove("shut");
      }
    }

    function advance(now: number) {
      actI++;
      if (!act || actI >= act.length) {
        endAct();
        return;
      }
      const stepItem = act[actI]!;
      const [showTarget, fade, , x] = stepItem;
      actT = now;
      if (showTarget.startsWith("eye:")) {
        setFace("rest", fade);
        setEye(showTarget.slice(4), fade);
        wantEyes = showTarget.slice(4);
      } else if (showTarget === "half" || showTarget === "closed") {
        setFace("rest", fade);
        setEye(showTarget, fade);
        wantEyes = showTarget;
      } else {
        wantEyes = null;
        setFace(showTarget, fade);
      }
      if (x) {
        if (x.jolt) poke(...x.jolt);
        wantLean = x.lean || [0, 0];
        if (x.call) x.call(now);
      } else {
        wantLean = [0, 0];
      }
    }

    const toUv = (x: number, y: number): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [
        ((x - r.left) / r.width - 0.5) * OVER + 0.5,
        ((y - r.top) / r.height - 0.5) * OVER + 0.5,
      ];
    };

    function wake(now: number) {
      lastInput = now;
      if (!awake) {
        awake = true;
        nextBlink = now + 1600;
        setEye("half", 90);
        setTimeout(() => {
          if (!disposed && awake) setEye("rest", 100);
        }, 110);
      }
      nextIdle = 30000 + Math.random() * 15000;
    }

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      mx = e.clientX;
      my = e.clientY;
      [pu, pv] = toUv(mx, my);
      speed += Math.hypot(dx, dy) * 0.004;
      wake(now);

      if (act && !pressed && !manualActLock) {
        endAct();
      }

      onHead = isSolidAvatar(pu, pv);
      const z = onHead ? zoneAt(pu, pv) : null;
      if (z !== zone) {
        zone = z;
        zoneSince = now;
      }
      wrap.style.cursor = pressed ? "grabbing" : onHead ? "grab" : "";

      if (onHead && !pressed) {
        poke(pu, pv, dx * 0.00065, dy * 0.00065, 0.09);
      }
      if (pressed && brush) {
        let px = pu - brush.u;
        let py = pv - brush.v;
        const L = Math.hypot(px, py);
        const lim = 0.18;
        if (L > 0) {
          const k = (lim * (1 - Math.exp(-L / lim))) / L;
          px *= k;
          py *= k;
        }
        brush.px = Math.max(-0.18, Math.min(0.18, px));
        brush.py = Math.max(-0.14, Math.min(0.14, py));
      }
    };

    let manualActLock = false;
    let manualLockTimer: ReturnType<typeof setTimeout> | null = null;

    const onPointerDown = (e: PointerEvent) => {
      const now = performance.now();
      const [u, v] = toUv(e.clientX, e.clientY);
      if (!isSolidAvatar(u, v)) return;
      // If she is currently inflating a bubblegum bubble (gum1/gum2/gum3), clicking pops it right onto her face!
      if (act === ACTS["gum"] && actI < 3) {
        actI = 2;
        advance(now);
        e.preventDefault();
        return;
      }
      manualActLock = false;
      wake(now);
      endAct();
      pressed = true;
      downAt = now;
      downU = u;
      downV = v;
      takeHold(u, v);
      moodFace = null;
      setBubbleText("OW! HEY, Easy on my face!");
      wrap.style.cursor = "grabbing";
      try {
        wrap.setPointerCapture(e.pointerId);
      } catch {
        // Synthetic pointer events in headless tests may not have an active pointerId
      }
      e.preventDefault();
    };

    const release = () => {
      if (!pressed || !brush) return;
      const now = performance.now();
      const L = Math.hypot(brush.px, brush.py);
      const z = zoneAt(downU, downV);
      const held = now - downAt;
      pressed = false;
      brush = null;
      wrap.style.cursor = onHead ? "grab" : "";
      pulls = pulls.filter((t) => now - t < 14000);

      if (L < 0.03 && held < 380) {
        // Tap reaction
        if (z === "hair") {
          hairI = hairI + 1 >= HAIRS.length ? -1 : hairI + 1;
          setBubbleText(
            hairI >= 0 ? `New ${HAIRS[hairI]!.toUpperCase()} hijab!` : "Back to classic black!",
          );
        } else {
          const r = ZONES.tap[z];
          if (r) {
            if (r.startsWith("act:")) {
              startAct(r.slice(4), now);
            } else {
              moodFace = r;
              moodUntil = now + 1100;
            }
          }
          poke(downU, downV, 0, 0.45, 0.06);
          setBubbleText("HEY! That tickles!");
        }
        return;
      }

      pulls.push(now);
      const n = pulls.length;
      moodFace =
        n >= 8 ? "cry" : n >= 5 ? "angry" : L > 0.18 ? "dizzy" : L > 0.08 ? "scrunch" : "deadpan";
      moodUntil = now + (n >= 5 ? 2600 : 700 + L * 2800);
      setBubbleText(
        n >= 5
          ? "STOP PULLING MY CHEEKS!"
          : L > 0.18
            ? "WOAH! So stretchy & dizzy!"
            : "HEY! Drag & stretch my face!",
      );
    };

    const onPointerLeave = () => {
      zone = null;
    };

    const onContactEnter = () => {
      moodFace = "grin";
      moodUntil = performance.now() + 1e7;
    };
    const onContactLeave = () => {
      moodFace = "grin";
      moodUntil = performance.now() + 700;
    };

    let lastScroll = window.scrollY;
    let scrollUntil = 0;
    const onScroll = () => {
      const n = performance.now();
      if (Math.abs(window.scrollY - lastScroll) > 2) {
        scrollUntil = n + 500;
        lastScroll = window.scrollY;
      }
      wake(n);
    };

    window.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    const contactButtons = Array.from(document.querySelectorAll(".contact-btn"));
    contactButtons.forEach((b) => {
      b.addEventListener("pointerenter", onContactEnter);
      b.addEventListener("pointerleave", onContactLeave);
    });

    let visible = true;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]) visible = es[0].isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      const r = Math.min(window.devicePixelRatio || 1, 2);
      const b = canvas.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) {
        canvas.width = Math.round(b.width * r);
        canvas.height = Math.round(b.height * r);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    });
    ro.observe(canvas);

    // Expose manual trigger controls for the interactive bar
    controlsRef.current = {
      triggerAct: (name: string) => {
        const now = performance.now();
        wake(now);
        zone = null;
        moodFace = null;
        manualActLock = true;
        if (manualLockTimer) clearTimeout(manualLockTimer);
        manualLockTimer = setTimeout(() => {
          manualActLock = false;
        }, 6000);
        startAct(name, now);
      },
      cycleHair: () => {
        const now = performance.now();
        wake(now);
        endAct();
        zone = null;
        moodFace = null;
        setFace("rest", 70);
        hairI = hairI + 1 >= HAIRS.length ? -1 : hairI + 1;
        const label = hairI >= 0 ? HAIRS[hairI]!.toUpperCase() : "Original";
        poke(0.5, 0.25, 0, 0.35, 0.12);
        return label;
      },
      setMood: (face: string, durationMs: number) => {
        const now = performance.now();
        wake(now);
        endAct();
        zone = null;
        moodFace = face;
        moodUntil = now + durationMs;
        poke(0.5, 0.36, 0, 0.35, 0.08);
      },
    };

    const H = 1 / 240;
    let simLeft = 0;

    function frame(now: number) {
      if (disposed) return;
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      if (!ready || !visible) return;

      const f = (r: number) => 1 - Math.exp(-dt * r);
      speed *= Math.exp(-dt * 6);
      shake += ((speed > 1.5 ? 1 : 0) - shake) * f(speed > 1.5 ? 1.2 : 0.9);

      // Acts when the page goes quiet
      if (act) {
        const currentStep = act[actI];
        if (currentStep && now - actT > currentStep[2]) {
          advance(now);
        }
      } else if (!reduced && !pressed && tStart && now - Math.max(lastInput, tStart) > nextIdle) {
        if (!rotation.length) rotation = [...ROTATION];
        const nextAct = rotation.shift()!;
        startAct(nextAct, now);
        lastInput = now;
        nextIdle = 30000 + Math.random() * 15000;
        if (!awake) wake(now);
      }

      // Moving SVG props (#faceFly, #faceHand)
      const mk = Math.min(1, (now - moveT) / moveMs);
      const me = mk * mk * (3 - 2 * mk);
      flyPos = [
        flyFrom[0] +
          (flyTo[0] - flyFrom[0]) * me +
          Math.sin(now * 0.02) * 0.012 * (1 - (mk >= 1 ? 0.85 : 0)),
        flyFrom[1] +
          (flyTo[1] - flyFrom[1]) * me +
          Math.cos(now * 0.027) * 0.012 * (1 - (mk >= 1 ? 0.85 : 0)),
      ];
      place(fly!, flyPos[0], flyPos[1]);

      const hp: [number, number] = [
        handFrom[0] + (handTo[0] - handFrom[0]) * me,
        handFrom[1] + (handTo[1] - handFrom[1]) * me,
      ];
      place(hand!, hp[0], hp[1]);
      if (handGrip === "on" && !handHeld) {
        takeHold(hp[0], hp[1], 0.24);
        handHeld = true;
        hand!.classList.add("shut");
        handGrip = "pull";
      }
      if (handHeld && brush) {
        brush.px = hp[0] - brush.u;
        brush.py = hp[1] - brush.v;
      }
      if (handGrip === "off" && handHeld) {
        handHeld = false;
        brush = null;
        hand!.classList.remove("shut");
        handGrip = false;
      }

      // Decide which single picture to show
      let want: string | null = "rest";
      const pull = brush ? Math.hypot(brush.px, brush.py) : 0;
      if (act) {
        want = null;
      } else if (pressed) {
        want =
          pull > 0.18
            ? "scared"
            : pull > 0.08
              ? "ouch"
              : pull > 0.02 || zoneAt(downU, downV) !== "hair"
                ? "shock"
                : "rest";
      } else if (moodFace && now < moodUntil) {
        want = moodFace;
      } else if (shake > 0.55) {
        want = shake > 0.92 ? "sick" : "wind";
      } else if (zone && now - zoneSince > 80 && ZONES.hover[zone]) {
        want = ZONES.hover[zone]!;
      }

      if (want) setFace(want, want === "rest" ? 110 : 90);

      // Eyes: only over the resting face
      const neutral = logical === "rest";
      if (neutral) {
        if (wantEyes) {
          setEye(wantEyes, 60);
        } else if (!awake) {
          setEye("closed", 200);
        } else if (blinkStep >= 0) {
          const s = ((now - blinkT) / 62) | 0;
          if (s !== blinkStep) {
            blinkStep = s;
            if (s === 0) setEye("half", 20);
            else if (s === 1) setEye("closed", 20);
            else if (s === 2) setEye("half", 20);
            else blinkStep = -1;
          }
        } else {
          let target: [number, number];
          if (lookAt) {
            const p = lookAt();
            target = [p[0] - SPOT.eyeCenter[0], p[1] - SPOT.eyeCenter[1]];
          } else if (now < scrollUntil) {
            target = [0, 1];
          } else {
            target = [pu - SPOT.eyeCenter[0], pv - SPOT.eyeCenter[1]];
          }
          setEye(
            Math.hypot(target[0], target[1]) < 0.085 ? "rest" : ringFor(target[0], target[1]),
            50,
          );
          if (now > nextBlink) {
            blinkStep = 0;
            blinkT = now;
            setEye("half", 20);
            nextBlink = now + 2200 + Math.random() * 3400;
          }
        }
      }

      compose(now);

      // Subtle head lean while allowing the grabbed feature (cheek/nose/chin/brow) to elongate dramatically
      const tx =
        (pressed || handHeld
          ? brush
            ? brush.px * 0.035
            : 0
          : awake
            ? Math.max(-0.024, Math.min(0.024, (pu - 0.5) * 0.018))
            : 0) +
        wantLean[0] +
        Math.sin(now * 0.0009) * 0.0015;
      const ty =
        (pressed || handHeld
          ? brush
            ? brush.py * 0.035
            : 0
          : awake
            ? Math.max(-0.018, Math.min(0.018, (pv - 0.35) * 0.012))
            : 0) +
        wantLean[1] +
        Math.sin(now * 0.0013) * 0.0022;
      lvX += ((tx - leanX) * 70 - lvX * 8) * dt;
      lvY += ((ty - leanY) * 70 - lvY * 8) * dt;
      leanX += lvX * dt;
      leanY += lvY * dt;

      // Fixed 1/240s physics step
      simLeft += dt;
      let steps = 0;
      while (simLeft >= H && steps < 9) {
        stepWavePhysics(ux, uy, vx, vy, M, N, H, C, WOBBLE, GAMMA, NU, brush);
        simLeft -= H;
        steps++;
      }
      if (steps === 9) simLeft = 0;

      for (let j = 0; j < M; j++) {
        for (let i = 0; i < M; i++) {
          const k = j * M + i;
          const edge = i === 0 || j === 0 || i === N || j === N;
          sx[k] = edge
            ? (ux[k] ?? 0)
            : ((ux[k] ?? 0) * 4 +
                (ux[k - 1] ?? 0) +
                (ux[k + 1] ?? 0) +
                (ux[k - M] ?? 0) +
                (ux[k + M] ?? 0)) /
              8;
          sy[k] = edge
            ? (uy[k] ?? 0)
            : ((uy[k] ?? 0) * 4 +
                (uy[k - 1] ?? 0) +
                (uy[k + 1] ?? 0) +
                (uy[k - M] ?? 0) +
                (uy[k + M] ?? 0)) /
              8;
        }
      }

      untangleGrid(sx, sy, restX, restY, M, N, GAP);

      for (let k = 0, o = 0; k < count; k++) {
        dyn[o++] = sx[k] ?? 0;
        dyn[o++] = sy[k] ?? 0;
        const r = k % M;
        const c = (k / M) | 0;
        let sh = 1;
        if (r > 0 && r < N && c > 0 && c < N) {
          sh = Math.max(
            0.86,
            Math.min(
              1.16,
              1 -
                ((sx[k + 1] ?? 0) - (sx[k - 1] ?? 0) + ((sy[k + M] ?? 0) - (sy[k - M] ?? 0))) * 1.8,
            ),
          );
        }
        dyn[o++] = sh;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, dyn);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex[faceA] || tex["rest"]!);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, tex[faceB] || tex["rest"]!);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, maskGlTex || tex["rest"]!);
      gl.uniform1f(U.fade, Math.min(1, (now - fadeT) / fadeMs));
      gl.uniform2f(U.lean, leanX, leanY);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
      if (fallback.style.visibility !== "hidden") {
        fallback.style.visibility = "hidden";
      }
    }

    // Boot: load the resting portrait first so the cutout mask and WebGL canvas render immediately,
    // then preload blink, stretch reaction, and remaining expression textures in the background.
    loadPortraitTexture("rest").then(() => {
      if (disposed) return;
      if (restImageEl) {
        buildSilhouetteMaskTexture(restImageEl);
      }
      canvas.dataset.face = "rest";
      ready = true;
      tStart = performance.now();
      rafId = requestAnimationFrame(frame);

      const priorityKeys = [
        "closed",
        "half",
        "shock",
        "ouch",
        "scared",
        "dizzy",
        "gum1",
        "gum2",
        "gum3",
        "gumpop",
      ];
      const restKeys = [
        ...priorityKeys,
        ...Object.keys(IDS).filter((n) => n !== "rest" && !priorityKeys.includes(n)),
      ];
      const next = (): Promise<unknown> | undefined => {
        if (disposed) return undefined;
        const k = restKeys.shift();
        return k ? loadPortraitTexture(k).then(next) : undefined;
      };
      for (let k = 0; k < 6; k++) next();
    });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (manualLockTimer) clearTimeout(manualLockTimer);
      window.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      contactButtons.forEach((b) => {
        b.removeEventListener("pointerenter", onContactEnter);
        b.removeEventListener("pointerleave", onContactLeave);
      });
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center gap-3.5 sm:gap-5 w-full">
      {/* Vertical rounded icon-only action rail docked on the left edge */}
      <div className="z-30 flex flex-col gap-2.5" role="toolbar" aria-label="Portrait interactions">
        <button
          type="button"
          onClick={() => controlsRef.current?.triggerAct("fly")}
          title="Fly on Nose"
          aria-label="Fly on Nose"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <Bug className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsRef.current?.triggerAct("tug")}
          title="Cheek Tug"
          aria-label="Cheek Tug"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <Hand className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsRef.current?.triggerAct("gum")}
          title="Bubblegum"
          aria-label="Bubblegum"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <CircleDot className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsRef.current?.triggerAct("sneeze")}
          title="Sneeze"
          aria-label="Sneeze"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <Wind className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsRef.current?.cycleHair()}
          title="Change Hijab Color"
          aria-label="Change Hijab Color"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <Palette className="h-4 w-4" />
        </button>
      </div>

      {/* Unclipped stage: stationary red box background behind the full cutout elastic WebGL portrait */}
      <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square flex items-center justify-center overflow-visible">
        {/* Separate red box background (stays 100% still while full cutout portrait with arms & shirt sits inside and can stretch outside) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl bg-primary shadow-[0_20px_70px_-15px_var(--glow)] ring-2 ring-foreground/15"
        />

        {/* Tilted comic speech-bubble callout badge like rameerez.com */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-3 z-30 rotate-3 rounded-lg border-2 border-background bg-card px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-foreground shadow-[3px_4px_0px_0px_rgba(0,0,0,0.85)] sm:text-xs"
        >
          <span>{bubbleText}</span>
        </div>

        <div
          className="hero-portrait-wrap about-portrait-wrap"
          id="magnetWrap"
          ref={wrapRef}
          data-testid="living-portrait-wrap"
        >
          <div
            className="hero-portrait-inner fade-in"
            id="magnetInner"
            style={{ ["--fade-y" as string]: "30px" }}
            data-delay="600"
          >
            <img
              id="faceFallback"
              ref={fallbackRef}
              src={azkaRest}
              alt="Portrait of Azka Azeem"
              width={1024}
              height={1024}
              className="rounded-2xl opacity-0"
            />
            <canvas
              id="faceGl"
              ref={canvasRef}
              aria-hidden="true"
              data-testid="living-portrait-canvas"
            />
            <div id="faceProps" aria-hidden="true">
              <svg id="faceFly" ref={flyRef} viewBox="0 0 32 32">
                <path
                  className="wing"
                  d="M15 15C12 9.500 4.500 8.500 2 13c2.500 4.500 10 4.500 13 2z"
                />
                <path
                  className="wing r"
                  d="M17 15c3-5.500 10.500-6.500 13-2-2.500 4.500-10 4.500-13 2z"
                />
                <ellipse cx="16" cy="19.500" rx="4" ry="6.500" />
                <circle cx="16" cy="11.500" r="3.300" />
              </svg>
              <svg id="faceHand" ref={handRef} viewBox="0 0 32 32">
                <path
                  className="open"
                  d="M10.500 16.500V8.200a1.800 1.800 0 0 1 3.600 0V14v-8a1.800 1.800 0 0 1 3.600 0V14 7a1.800 1.800 0 0 1 3.600 0v8-5a1.800 1.800 0 0 1 3.600 0v10.500c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-3.500-5.600c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.600 1z"
                />
                <path
                  className="grab"
                  d="M10.500 17v-3.300a1.800 1.800 0 0 1 3.600 0V14v-1.800a1.800 1.800 0 0 1 3.600 0V14v-1.300a1.800 1.800 0 0 1 3.600 0V14v-.3a1.800 1.800 0 0 1 3.600 0v6.800c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-2.300-3.700c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.700 1z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

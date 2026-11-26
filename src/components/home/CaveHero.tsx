import { useEffect, useRef } from "react";
import { BookButton } from "../BookButton";
import { Icon } from "../Icon";
import { Waveform } from "../Waveform";
import { STUDIO_ADDRESS } from "../../data/siteData";
import { easeOut, mix, seg, smooth, useScrollScene } from "../../lib/motion";

/*
 * Signature scene: you stand inside the cave and scroll through its mouth into the real studio.
 * The rock is drawn as flat, faceted shapes in the style of the mountains in the Caverna Cast logo.
 * Camera-move technique adapted from Kedhareswer's "Keystone Crossing" template (MIT, 21st.dev).
 */

type Point = [number, number];

/** Irregular cave-mouth outline around (cx, cy), slightly flattened at the floor. */
function mouthPoints(cx: number, cy: number, rx: number, ry: number, jag: number, seed: number, count = 16): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const noise = 1 + jag * Math.sin(i * 2.3 + seed) * Math.cos(i * 1.1 + seed * 0.7);
    const floor = Math.sin(angle) > 0.55 ? 0.86 : 1;
    // A peaked top, like the logo's mountains.
    const peak = Math.sin(angle) < -0.8 ? 1.12 : 1;
    return [cx + Math.cos(angle) * rx * noise, cy + Math.sin(angle) * ry * noise * floor * peak];
  });
}

const toPath = (points: Point[]) => "M" + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z";
const OUTER = "M-4000 -4000H5000V5000H-4000Z";

function hexMix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

type Tones = { inner: [string, string]; outer: [string, string] };

/** Two rings of flat facets around the mouth, lit from the upper left like the logo's mountains. */
function RockLayer({ points, tones, base, rim, className, seed }: { points: Point[]; tones: Tones; base: string; rim: string; className: string; seed: number }) {
  const cx = 500;
  const cy = 500;
  const out = (p: Point, k: number): Point => [cx + (p[0] - cx) * k, cy + (p[1] - cy) * k];
  const ring1 = points.map((_, i) => 1.16 + 0.22 * Math.abs(Math.sin(i * 1.7 + seed)));
  const ring2 = ring1.map((k, i) => k + 0.28 + 0.26 * Math.abs(Math.cos(i * 2.3 + seed)));
  const light = (point: Point) => {
    const angle = Math.atan2(point[1] - cy, point[0] - cx);
    return 0.5 + 0.5 * Math.cos(angle + (3 * Math.PI) / 4);
  };
  const facets = points.flatMap((point, i) => {
    const j = (i + 1) % points.length;
    const next = points[j];
    const mid: Point = [(point[0] + next[0]) / 2, (point[1] + next[1]) / 2];
    const lit = light(mid) * (0.75 + 0.25 * Math.abs(Math.sin(i * 3.1 + seed)));
    return [
      { d: toPath([point, next, out(next, ring1[j]), out(point, ring1[i])]), fill: hexMix(tones.inner[1], tones.inner[0], lit) },
      {
        d: toPath([out(point, ring1[i]), out(next, ring1[j]), out(next, ring2[j]), out(point, ring2[i])]),
        fill: hexMix(tones.outer[1], tones.outer[0], lit * 0.9),
      },
    ];
  });
  return (
    <svg className={"cave__rock " + className} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d={OUTER + toPath(points)} fill={base} fillRule="evenodd" />
      {facets.map((facet, i) => (
        <path key={i} d={facet.d} fill={facet.fill} />
      ))}
      <path d={toPath(points)} fill="none" stroke={rim} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

const FAR = mouthPoints(500, 500, 215, 245, 0.14, 2, 18);
const NEAR = mouthPoints(500, 500, 360, 400, 0.16, 5, 14);

/** Same breakpoint as the vertical-photo <source> and the tall-screen CSS. */
const tallScreen = typeof window === "undefined" ? { matches: false } : window.matchMedia("(max-aspect-ratio: 11/10)");

export function CaveHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const seconds = Math.floor((Date.now() - start) / 1000);
      if (timerRef.current) {
        timerRef.current.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useScrollScene(trackRef, (p, reduced) => {
    const root = trackRef.current;
    if (!root) return;
    const q = (selector: string) => root.querySelector<HTMLElement>(selector)!;
    const near = q(".cave__rock--near");
    const far = q(".cave__rock--far");
    const studio = q(".cave__studio");
    const copy = q(".cave__copy");
    const rec = q(".cave__rec");
    const arrive = q(".cave__arrive");
    const glow = q(".cave__glow");
    const hint = q(".cave__hint");

    const copyOut = smooth(seg(p, 0.03, 0.14));
    const nearT = Math.pow(seg(p, 0.02, 0.6), 2.1);
    const farT = Math.pow(seg(p, 0.07, 0.68), 2.1);
    const arriveIn = easeOut(seg(p, 0.7, 0.8));

    if (reduced) {
      near.style.transform = "none";
      far.style.transform = "none";
      near.style.opacity = String(1 - seg(p, 0.1, 0.3));
      far.style.opacity = String(1 - seg(p, 0.2, 0.4));
      studio.style.transform = "none";
      studio.style.filter = "none";
    } else {
      near.style.transform = `scale(${mix(1, 13, nearT).toFixed(4)})`;
      far.style.transform = `scale(${mix(1, 8, farT).toFixed(4)})`;
      near.style.opacity = String(1 - seg(p, 0.5, 0.6));
      far.style.opacity = String(1 - seg(p, 0.58, 0.68));
      const travel = easeOut(seg(p, 0, 0.72));
      // Tall screens show the whole vertical photo; start with the microphone head (right of
      // centre) under the cave mouth and let it slide to the middle on the way in.
      const shift = tallScreen.matches ? mix(-23, 0, travel) : 0;
      studio.style.transform = `translate3d(${shift.toFixed(3)}vw, 0, 0) scale(${mix(1.05, 1, travel).toFixed(4)})`;
      studio.style.filter = `brightness(${mix(0.82, 1, seg(p, 0.1, 0.6)).toFixed(3)})`;
    }
    near.style.visibility = near.style.opacity === "0" ? "hidden" : "";
    far.style.visibility = far.style.opacity === "0" ? "hidden" : "";

    copy.style.opacity = String(1 - copyOut);
    copy.style.filter = !reduced && copyOut > 0.01 ? `blur(${(copyOut * 10).toFixed(2)}px)` : "none";
    copy.style.transform = reduced ? "none" : `translate3d(0, ${(-60 * copyOut).toFixed(1)}px, 0)`;
    copy.style.visibility = copyOut > 0.99 ? "hidden" : "";
    rec.style.opacity = String(1 - seg(p, 0.02, 0.1));
    hint.style.opacity = String(1 - seg(p, 0, 0.04));
    glow.style.opacity = String(1 - seg(p, 0.15, 0.5));

    arrive.style.opacity = String(arriveIn);
    arrive.style.transform = reduced ? "none" : `translate3d(0, ${(40 * (1 - arriveIn)).toFixed(1)}px, 0)`;
    arrive.style.visibility = arriveIn < 0.01 ? "hidden" : "visible";
  });

  return (
    <section className="cave" id="inicio" aria-labelledby="cave-title">
      <div className="cave__track" ref={trackRef}>
        <div className="cave__stage">
          <div className="cave__studio">
            {/* Tall screens get the vertical microphone photo: the wide table photo would have to be
                stretched three to four times on a phone and turns to mush. */}
            <picture>
              <source
                media="(max-aspect-ratio: 11/10)"
                srcSet="/images/studio/hero-microfone-caverna-800.webp 800w, /images/studio/hero-microfone-caverna.webp 1024w"
                sizes="150vw"
                width="1024"
                height="1536"
              />
              <img
                src="/images/studio/mesa-estudio.webp"
                srcSet="/images/studio/mesa-estudio-800.webp 800w, /images/studio/mesa-estudio.webp 1501w"
                sizes="100vw"
                width="1501"
                height="997"
                alt="O estúdio do Caverna Cast, com microfones sobre a mesa de gravação"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="cave__glow" aria-hidden="true" />
          <RockLayer
            className="cave__rock--far"
            points={FAR}
            seed={2}
            base="#2a1f17"
            tones={{ inner: ["#9a7152", "#4a3426"], outer: ["#634631", "#2e211a"] }}
            rim="rgba(243, 196, 126, 0.6)"
          />
          <RockLayer
            className="cave__rock--near"
            points={NEAR}
            seed={5}
            base="#120d0a"
            tones={{ inner: ["#453325", "#1d1611"], outer: ["#2c2119", "#140f0c"] }}
            rim="rgba(227, 162, 69, 0.3)"
          />
          <div className="cave__grain" aria-hidden="true" />

          <div className="cave__rec" aria-hidden="true">
            <span className="cave__rec-dot" />
            <span>REC</span>
            <span ref={timerRef}>00:00</span>
          </div>

          <div className="cave__copy">
            <h1 id="cave-title" className="cave__title">
              Sua ideia merece ser ouvida.
            </h1>
            <div className="cave__aside">
              <p className="cave__lead">
                Estúdio de podcast e videocast no Pacheco, em São Gonçalo. Câmeras em 4K, captação profissional de
                áudio e cenário para até 4 pessoas.
              </p>
              <div className="cave__actions">
                <BookButton label="Agendar gravação" />
                <a className="btn btn--line" href="./estudio.html">
                  Conhecer o estúdio
                </a>
              </div>
            </div>
          </div>

          <div className="cave__bottom" aria-hidden="true">
            <Waveform bars={110} live className="cave__wave" />
          </div>
          <p className="cave__hint" aria-hidden="true">Role para entrar na Caverna</p>

          <div className="cave__arrive">
            <p className="cave__arrive-title">Você chegou na Caverna.</p>
            <p className="cave__arrive-address">
              <Icon name="map-pin" /> {STUDIO_ADDRESS}
            </p>
            <a className="text-link" href="./estudio.html">
              Ver fotos do estúdio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

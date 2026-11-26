import { useRef } from "react";
import type { CSSProperties } from "react";
import { mix, smooth, useScrollScene } from "../../lib/motion";

/*
 * Zoom parallax: a collage of real studio photos where each picture grows at its own speed
 * until the centre photo fills the screen. Pattern after the "Zoom Parallax" component on 21st.dev.
 */

type Photo = {
  src: string;
  alt: string;
  /** How much this layer grows by the end of the scene. */
  scale: number;
  /**
   * Placement on wide screens: CSS offsets from the centre, height in vh and width/height ratio.
   * Offsets mix vw (the centre frame is 25vw wide) and vh (frame widths follow their height), so
   * the photos sit a fixed gap from the centre frame at any screen shape.
   */
  place?: { x: string; y: string; h: number; r: number };
  /** Tighter placement for tall screens, all in vw so the cluster scales evenly with the width. */
  tall?: { x: number; y: number; h: number };
};

// Full-size files: every photo is drawn larger than its frame mid-zoom, so small variants would blur.
const photos: Photo[] = [
  { src: "/images/studio/mesa-estudio-ia-2560.webp", alt: "Mesa de gravação com quatro microfones diante das cortinas azuis", scale: 4 },
  { src: "/images/studio/camera-estudio.webp", alt: "Câmera de vídeo do estúdio", scale: 5, place: { x: "calc(-13.7vw - 8.3vh)", y: "0vh", h: 25, r: 663 / 997 }, tall: { x: -23.7, y: -5, h: 27.2 } },
  { src: "/images/studio/guitarras-estudio-1200.webp", alt: "Guitarras em miniatura na prateleira da parede azul", scale: 6, place: { x: "calc(-0.6vw - 16.6vh)", y: "-25.5vh", h: 22, r: 2144 / 1424 }, tall: { x: 7.5, y: -34.1, h: 26.7 } },
  { src: "/images/studio/microfones-mesa.webp", alt: "Microfones e canecas sobre a mesa", scale: 5, place: { x: "calc(7.95vh + 0.6vw)", y: "26.5vh", h: 24, r: 1287 / 855 }, tall: { x: 30.7, y: -8, h: 21.3 } },
  { src: "/images/studio/caneca-caverna.webp", alt: "Caneca com a marca Caverna Cast", scale: 6, place: { x: "calc(-18.05vh - 0.6vw)", y: "26.5vh", h: 24, r: 946 / 1424 }, tall: { x: -3.5, y: 34.4, h: 27.2 } },
  { src: "/images/studio/sala-equipamentos.webp", alt: "Monitores e computador de captura da sala", scale: 8, place: { x: "calc(0.6vw + 16.6vh)", y: "-25.5vh", h: 22, r: 1287 / 855 }, tall: { x: 30.7, y: 15.5, h: 21.3 } },
  { src: "/images/studio/microfone-detalhe.webp", alt: "Microfone de estúdio sobre a mesa de madeira", scale: 9, place: { x: "calc(13.7vw + 8.3vh)", y: "0vh", h: 25, r: 663 / 997 }, tall: { x: -23.7, y: 24.3, h: 27.2 } },
];

export function ZoomCollage() {
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollScene(trackRef, (p, reduced) => {
    const root = trackRef.current;
    if (!root) return;
    const t = smooth(p);
    root.querySelectorAll<HTMLElement>(".zoom__layer").forEach((layer, index) => {
      const scale = reduced ? 1 : mix(1, photos[index].scale, t);
      layer.style.transform = `scale(${scale.toFixed(4)})`;
    });
    const caption = root.querySelector<HTMLElement>(".zoom__caption");
    if (caption) caption.style.opacity = String(reduced ? 1 : Math.max(0, (p - 0.78) / 0.15));
  });

  return (
    <section className="zoom" aria-label="Fotos do estúdio">
      <div className="zoom__track" ref={trackRef}>
        <div className="zoom__stage">
          {photos.map((photo, index) => (
            <div className="zoom__layer" key={photo.src}>
              <div
                className={"zoom__frame" + (photo.place ? " zoom__frame--float" : "")}
                style={
                  photo.place
                    ? ({
                        "--x": photo.place.x,
                        "--y": photo.place.y,
                        "--h": `${photo.place.h}vh`,
                        "--r": photo.place.r,
                        "--tx": `${photo.tall?.x ?? 0}vw`,
                        "--ty": `${photo.tall?.y ?? 0}vw`,
                        "--th": `${photo.tall?.h ?? 0}vw`,
                      } as CSSProperties)
                    : undefined
                }
              >
                {index === 0 ? (
                  // The centre photo ends filling the screen width. Tall screens get the vertical
                  // photo, shown whole; the wide table photo would be stretched and blur.
                  <picture>
                    <source media="(max-aspect-ratio: 11/10)" srcSet="/images/studio/hero-microfone-caverna.webp" />
                    <img src={photo.src} alt={photo.alt} loading="eager" fetchPriority="high" decoding="async" />
                  </picture>
                ) : (
                  <img src={photo.src} alt={photo.alt} loading="eager" decoding="async" />
                )}
              </div>
            </div>
          ))}
          <p className="zoom__caption">Onde a conversa acontece.</p>
        </div>
      </div>
    </section>
  );
}

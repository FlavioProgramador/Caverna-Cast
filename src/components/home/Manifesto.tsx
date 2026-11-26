import { Fragment, useRef } from "react";
import { clamp, useScrollScene } from "../../lib/motion";

/*
 * Words ink in one by one while the section is pinned.
 * Word-window math adapted from the official Motion "Scroll word reveal" example on 21st.dev.
 */

const HEADLINE = "Histórias, ideias e conexões precisam de um lugar para acontecer.";
const BODY =
  "Na Caverna, você chega com a conversa e sai com o programa gravado em 4K, com captação profissional de áudio e cortes prontos para as redes.";

const REST = 0.16;
const SPAN = 0.78;
const WINDOW = 0.14;

export function Manifesto() {
  const trackRef = useRef<HTMLDivElement>(null);
  const words = HEADLINE.split(" ");

  useScrollScene(trackRef, (p, reduced) => {
    const root = trackRef.current;
    if (!root) return;
    const spans = root.querySelectorAll<HTMLElement>(".manifesto__word");
    const count = spans.length;
    spans.forEach((span, index) => {
      const start = (index / Math.max(1, count - 1)) * SPAN;
      const t = reduced ? 1 : clamp((p - start) / WINDOW);
      span.style.opacity = (REST + (1 - REST) * t).toFixed(3);
      span.style.transform = reduced ? "none" : `translate3d(0, ${((1 - t) * 0.12).toFixed(3)}em, 0)`;
    });
    const body = root.querySelector<HTMLElement>(".manifesto__body");
    if (body) body.style.opacity = String(reduced ? 1 : clamp((p - 0.82) / 0.12));
    const bar = root.querySelector<HTMLElement>(".manifesto__progress span");
    if (bar) bar.style.transform = `scaleY(${p.toFixed(4)})`;
  });

  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="manifesto__track" ref={trackRef}>
        <div className="manifesto__stage">
          <div className="shell manifesto__layout">
            <div className="manifesto__progress" aria-hidden="true">
              <span />
            </div>
            <div>
              <h2 id="manifesto-title" className="manifesto__title" aria-label={HEADLINE}>
                {words.map((word, index) => (
                  <Fragment key={index}>
                    <span className="manifesto__word" aria-hidden="true">
                      {word}
                    </span>
                    {index < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h2>
              <p className="manifesto__body">{BODY}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

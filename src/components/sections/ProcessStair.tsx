import { useRef } from "react";
import type { CSSProperties } from "react";
import { processSteps } from "../../data/siteData";
import { clamp, useScrollScene } from "../../lib/motion";

/*
 * The booking process as a staircase (after the Overtone "path" section): while the section is pinned,
 * a play-button marker walks down the steps and the current step turns dark.
 */
export function ProcessStair() {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = processSteps.length;

  useScrollScene(trackRef, (p, reduced) => {
    const root = trackRef.current;
    if (!root) return;
    const position = clamp(p * 1.15) * (count - 1);
    const current = Math.round(position);
    root.querySelectorAll<HTMLElement>(".stair__step").forEach((step, index) => {
      step.classList.toggle("is-current", index === current);
      step.classList.toggle("is-past", index < current);
    });
    const marker = root.querySelector<HTMLElement>(".stair__marker");
    if (marker) {
      marker.style.setProperty("--pos", (reduced ? current : position).toFixed(3));
    }
  });

  return (
    <section className="stair" aria-labelledby="stair-title">
      <div className="stair__track" ref={trackRef}>
        <div className="stair__stage">
          <div className="shell stair__head">
            <h2 id="stair-title" className="h-section">
              Do primeiro oi à entrega
            </h2>
          </div>
          <div className="shell stair__steps" style={{ "--count": count } as CSSProperties}>
            <span className="stair__marker" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M3 1.8v12.4a.8.8 0 0 0 1.2.7l10.1-6.2a.8.8 0 0 0 0-1.4L4.2 1.1A.8.8 0 0 0 3 1.8Z" />
              </svg>
            </span>
            <ol className="stair__list">
            {processSteps.map((step, index) => (
              <li className="stair__step" key={step.number} style={{ "--n": index } as CSSProperties}>
                <span className="stair__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

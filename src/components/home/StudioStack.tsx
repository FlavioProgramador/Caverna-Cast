import { useRef } from "react";
import type { CSSProperties } from "react";
import { studioStack } from "../../data/siteData";
import { clamp, useScrollScene } from "../../lib/motion";

/*
 * Real studio photos pile up as you scroll: each card arrives tilted and lands flat while the
 * ones beneath tip back and darken. Pose math adapted from Kedhareswer's "Scroll Stacking Cards"
 * component on 21st.dev (MIT).
 */

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function pose(p: number, i: number, reduced: boolean) {
  const enter = i === 0 ? 1 : clamp(p - (i - 1));
  const depth = clamp(p - i, 0, 3);
  if (reduced) return { transform: "none", shade: Math.min(depth, 1) * 0.5, opacity: enter >= 1 ? 1 : enter };
  const e = easeOut(enter);
  const y = (1 - e) * 120 - depth * 3.4;
  const scale = (1 - depth * 0.07) * (0.9 + 0.1 * e);
  const rx = (1 - e) * 20 - depth * 8;
  const rz = (1 - e) * (i % 2 ? 4 : -4);
  return {
    transform: `translate3d(0, ${y.toFixed(3)}%, 0) perspective(1400px) rotateX(${rx.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg) scale(${scale.toFixed(4)})`,
    shade: Math.min(depth, 2) * 0.32,
    opacity: depth > 2.6 ? clamp((3 - depth) / 0.4) : 1,
  };
}

export function StudioStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = studioStack.length;

  useScrollScene(trackRef, (raw, reduced) => {
    const root = trackRef.current;
    if (!root) return;
    const p = clamp(raw * 1.12) * (count - 1);
    root.querySelectorAll<HTMLElement>(".stack__card").forEach((card, i) => {
      const q = pose(p, i, reduced);
      card.style.transform = q.transform;
      card.style.opacity = String(q.opacity);
      const shade = card.querySelector<HTMLElement>(".stack__shade");
      if (shade) shade.style.opacity = String(q.shade);
    });
    const index = Math.min(count - 1, Math.round(p));
    const counter = root.querySelector<HTMLElement>(".stack__count b");
    if (counter && counter.textContent !== String(index + 1).padStart(2, "0")) {
      counter.textContent = String(index + 1).padStart(2, "0");
    }
    const rail = root.querySelector<HTMLElement>(".stack__rail i");
    if (rail) rail.style.transform = `scaleX(${(p / (count - 1)).toFixed(4)})`;
  });

  return (
    <section className="stack" aria-labelledby="stack-title">
      <div className="stack__track" ref={trackRef} style={{ "--cards": count } as CSSProperties}>
        <div className="stack__stage">
          <div className="shell stack__head">
            <h2 id="stack-title" className="h-section">O que tem na sala</h2>
            <div className="stack__count" aria-hidden="true">
              <b>01</b>
              <span className="stack__rail">
                <i />
              </span>
              <span>{String(count).padStart(2, "0")}</span>
            </div>
          </div>
          <ol className="shell stack__deck">
            {studioStack.map((item, i) => (
              <li className="stack__card" key={item.title} style={{ zIndex: i + 1 }}>
                {/* The photo keeps its own proportions so it is never stretched past its real size. */}
                <figure className="stack__photo" style={{ "--ratio": item.ratio } as CSSProperties}>
                  <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                </figure>
                <div className="stack__body">
                  <h3 className="h-card">{item.title}</h3>
                  <p>{item.body}</p>
                  <ul className="stack__tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="stack__shade" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

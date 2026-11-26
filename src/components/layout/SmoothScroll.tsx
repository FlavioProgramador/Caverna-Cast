import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Smooth wheel scrolling on pointer devices. Off for reduced motion; touch keeps native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: { offset: -80 } });
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

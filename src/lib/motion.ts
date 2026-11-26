import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/*
 * Small scroll-choreography toolkit.
 * The pinned-scene approach (a tall track, a sticky stage, one `paint(progress)` function that writes
 * styles directly) is adapted from Kedhareswer's MIT-licensed templates on 21st.dev.
 */

export const clamp = (value: number, min = 0, max = 1) => (value < min ? min : value > max ? max : value);
/** Progress of `p` inside the window [a, b], clamped to 0..1. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type ScenePaint = (progress: number, reduced: boolean) => void;

/**
 * Calls `paint` with the progress (0..1) of a tall `track` scrolling past its sticky stage.
 * Progress is lightly smoothed so wheel steps feel continuous; reduced motion paints the raw value.
 */
export function useScrollScene(
  trackRef: RefObject<HTMLElement | null>,
  paint: ScenePaint,
  { smoothing = 0.2, mode = "pin" }: { smoothing?: number; mode?: "pin" | "enter" } = {},
) {
  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = -1;
    let frame = 0;

    const target = () => {
      const rect = track.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (mode === "enter") {
        // 0 when the element's top touches the bottom of the screen, 1 when it is fully in view.
        return clamp((viewport - rect.top) / Math.min(rect.height, viewport));
      }
      const run = rect.height - viewport;
      return run > 0 ? clamp(-rect.top / run) : rect.top < 0 ? 1 : 0;
    };

    const tick = () => {
      frame = 0;
      const goal = target();
      current = current < 0 || media.matches ? goal : current + (goal - current) * smoothing;
      if (Math.abs(goal - current) < 0.0005) current = goal;
      paintRef.current(current, media.matches);
      if (current !== goal) frame = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    media.addEventListener("change", kick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      media.removeEventListener("change", kick);
    };
  }, [trackRef, smoothing, mode]);
}

/**
 * Adds `is-in` to every `[data-reveal]` element once it enters the viewport.
 * Used sparingly for one-off entrances (tickets printing, footer wordmark).
 */
export function useRevealOnce() {
  useEffect(() => {
    const elements = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      elements().forEach((element) => element.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    const observeAll = () => elements().forEach((element) => observer.observe(element));
    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}

import type { CSSProperties } from "react";

/** Deterministic bar heights (0..1) shaped like a voice recording. */
export function waveHeights(count: number, seed = 1): number[] {
  return Array.from({ length: count }, (_, i) => {
    const x = i + seed * 7;
    const envelope = 0.55 + 0.45 * Math.sin((i / count) * Math.PI);
    const detail = Math.abs(Math.sin(x * 1.7) * Math.cos(x * 0.43) + 0.35 * Math.sin(x * 3.1));
    return Math.min(1, 0.16 + envelope * detail);
  });
}

type WaveformProps = {
  bars?: number;
  seed?: number;
  /** Bars pulse like a live input level. */
  live?: boolean;
  className?: string;
};

/** Audio waveform drawn with CSS bars; one scaleY keyframe per bar when live. */
export function Waveform({ bars = 48, seed = 1, live = false, className = "" }: WaveformProps) {
  const heights = waveHeights(bars, seed);
  return (
    <span className={"wave" + (live ? " wave--live" : "") + (className ? " " + className : "")} aria-hidden="true">
      {heights.map((height, index) => (
        <span
          key={index}
          style={
            {
              "--h": height.toFixed(3),
              "--d": `${((index * 137) % 900) / -1000}s`,
              "--t": `${0.7 + ((index * 53) % 60) / 100}s`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

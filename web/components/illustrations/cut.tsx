// Shared pieces of the cut-paper illustration style: flat shapes, no outline,
// a short hard shadow that lifts each piece off the page, 2px detail lines.
import { cloneElement, type ReactElement, type SVGProps } from "react";

export const ink = "var(--t-color-ink)";
export const paper = (id: string) => `var(--t-paper-${id})`;
export const white = "var(--t-color-bg)";
export const neutral = "var(--t-color-line)";

export const line = {
  fill: "none",
  stroke: ink,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Draws a shape twice: first as its shadow, then filled.
export function Cut({ children, fill }: { children: ReactElement<SVGProps<SVGElement>>; fill: string }) {
  return (
    <>
      {cloneElement(children, { transform: "translate(3 4)", style: { fill: ink, opacity: 0.14 } })}
      {cloneElement(children, { style: { fill } })}
    </>
  );
}

// A hanger stands in for a garment: illustrations never pretend to be product results.
export function Hanger({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y + 8 * s} a${6 * s} ${6 * s} 0 1 1 ${6 * s} ${6 * s} v${4 * s} l${26 * s} ${16 * s} h${-64 * s} l${26 * s} ${-16 * s}`}
      style={line}
    />
  );
}

// A photo print: white border, a paper backdrop inside, a hanger in the middle.
export function Print({ w, h, backdrop, hanger = true }: { w: number; h: number; backdrop: string; hanger?: boolean }) {
  const inset = Math.round(w * 0.075);
  const innerH = h - inset * 2;
  return (
    <>
      <Cut fill={white}>
        <rect width={w} height={h} rx={6} />
      </Cut>
      <rect x={inset} y={inset} width={w - inset * 2} height={innerH} rx={3} style={{ fill: backdrop }} />
      <path
        d={`M${inset} ${inset + innerH * 0.72} C${w * 0.35} ${inset + innerH * 0.8} ${w * 0.65} ${inset + innerH * 0.8} ${w - inset} ${inset + innerH * 0.72} V${inset + innerH} H${inset} Z`}
        style={{ fill: ink, opacity: 0.07 }}
      />
      {hanger && <Hanger x={w / 2} y={inset + innerH * 0.28} s={w / 140} />}
    </>
  );
}

export function Grain({ id }: { id: string }) {
  return (
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" />
    </filter>
  );
}

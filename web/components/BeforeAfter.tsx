"use client";

// The large before/after card. Drag with mouse or finger, or use the arrow keys: a native
// range input sits on top, so it works with keyboard and screen readers.
// This is an illustration, not a real result. TODO(owner): swap in real photos after the test.
import Image from "next/image";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/lib/tokens";
import { FeatureCard } from "./FeatureCard";

const SIZES = "(min-width: 1024px) 40vw, 90vw";
const sticker = "absolute top-4 rounded-pill bg-ink/85 px-4 py-1.5 text-small font-semibold text-bg backdrop-blur-sm";

function Slider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  // One small sweep the first time it's seen, to show the line can move. Touching it stops the sweep.
  useEffect(() => {
    if (!inView || reduceMotion || touched.current) return;
    const sweep = animate(50, [50, 28, 70, 50], {
      duration: 1.8,
      delay: 0.3,
      ease: ease.inOut as unknown as [number, number, number, number],
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => sweep.stop();
  }, [inView, reduceMotion]);

  const shown = Math.round(pos);

  return (
    <div ref={ref} className="relative mx-auto aspect-[5/6] w-full overflow-hidden max-lg:max-w-[520px] rounded-md bg-surface shadow-float select-none">
      {/* Each sticker lives inside its own side, so the line wipes it away with that side. */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image unoptimized src="/assets/3d/before.webp" alt="" fill sizes={SIZES} className="object-cover" />
        <span className={`${sticker} left-4`}>Before</span>
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image unoptimized src="/assets/3d/wood.webp" alt="" fill sizes={SIZES} className="object-cover" />
        <span className={`${sticker} right-4`}>After</span>
      </div>
      {/* The garment is one file on top of both sides: it can't change as the line moves. */}
      <Image unoptimized src="/assets/3d/jeans.webp" alt="" fill sizes={SIZES} className="pointer-events-none object-cover" />

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={shown}
        onPointerDown={() => {
          touched.current = true;
        }}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        aria-label="Compare before and after"
        aria-valuetext={`${shown}% before, ${100 - shown}% after`}
        className="peer absolute inset-0 z-10 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-bg shadow-card"
        style={{ left: `${pos}%` }}
      />
      {/* The handle stops short of the edges, so it's never cut in half. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-bg text-ink shadow-clay peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bg"
        style={{ left: `clamp(2.25rem, ${pos}%, calc(100% - 2.25rem))` }}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  );
}

export function BeforeAfterCard() {
  return (
    <FeatureCard
      tone="sky"
      split
      className="lg:col-span-12"
      title="The garment stays untouched"
      text="We cut out the garment and only change what’s behind it. Drag the line to compare."
    >
      <Slider />
    </FeatureCard>
  );
}

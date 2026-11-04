"use client";

// The large before/after card. Drag with mouse or finger, or use the arrow keys: a native
// range input sits on top, so it works with keyboard and screen readers.
// This is an illustration, not a real result. TODO(owner): swap in real photos after the test.
import Image from "next/image";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ease, sitePapers } from "@/lib/tokens";
import { FeatureCard } from "./FeatureCard";

const SIZES = "(min-width: 1024px) 40vw, 90vw";
const sticker = "absolute top-4 rounded-pill bg-ink/85 px-4 py-1.5 text-small font-semibold text-bg backdrop-blur-sm";

function Slider({ paper }: { paper: string }) {
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
        <div className="absolute inset-0 transition-colors duration-(--t-dur-paper)" style={{ backgroundColor: paper }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--t-color-bg)_32%,transparent),transparent_45%,color-mix(in_srgb,var(--t-color-ink)_9%,transparent))]" />
        <div className="absolute inset-0 translate-x-[1.5%] translate-y-[1.5%] opacity-30 blur-[8px] brightness-0">
          <Image unoptimized src="/assets/3d/jeans.webp" alt="" fill sizes={SIZES} className="object-cover" />
        </div>
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
  const [paper, setPaper] = useState(sitePapers[0]);

  return (
    <FeatureCard
      tone="sky"
      split
      className="lg:col-span-12"
      title="The garment stays untouched"
      text="We cut out the garment and only change what’s behind it. Drag the line, then try another paper."
      aside={
        <fieldset className="mt-7 flex flex-wrap gap-3">
          <legend className="sr-only">Backdrop colour</legend>
          {sitePapers.map((p) => (
            <label key={p.id} className="cursor-pointer" title={p.label}>
              <input
                type="radio"
                name="compare-backdrop"
                value={p.id}
                checked={p.id === paper.id}
                onChange={() => setPaper(p)}
                aria-label={p.label}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="block size-12 rounded-pill shadow-clay ring-offset-3 ring-offset-primary transition-transform duration-(--t-dur-hover) ease-standard peer-checked:ring-3 peer-checked:ring-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-6 peer-focus-visible:outline-bg hover:scale-105 active:scale-[0.97] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                style={{ background: p.hex }}
              />
            </label>
          ))}
        </fieldset>
      }
    >
      <Slider paper={paper.hex} />
    </FeatureCard>
  );
}

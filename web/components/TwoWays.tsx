"use client";

// "Two ways to use it". Each stage plays once when the section comes into view or the switch
// changes, and stops when it leaves. The markup is the finished state; the animation only
// plays over it, so reduced motion and no JavaScript see the result straight away.
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { bezier, duration, ease } from "@/lib/tokens";
import { prefersReducedMotion, useInView } from "@/lib/use-in-view";
import { Segmented } from "./Segmented";

const modes = [
  {
    id: "placement",
    label: "Placement",
    text: "Your item, taken from your photo and placed in one of our scenes.",
  },
  {
    id: "replacement",
    label: "Replacement",
    text: "Pick a styled scene that already has a product, and we swap it for yours.",
  },
] as const;

type Mode = (typeof modes)[number]["id"];

const out = bezier(ease.out);
const inOut = bezier(ease.inOut);
const SIZES = "(min-width: 1024px) 400px, 90vw";
// Both full frames are framed the same way, so the jeans stay exactly on top of their old spot.
const FRAMING = { objectPosition: "50% 30%" };

function Print({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto aspect-[4/5] w-full max-w-[400px] rounded-md bg-bg p-3 shadow-clay">
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-line">{children}</div>
    </div>
  );
}

function Placement({ active }: { active: boolean }) {
  const blanket = useRef<HTMLDivElement>(null);
  const jeans = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const timing = { duration: duration.placement, delay: 300, fill: "both" } as const;
    // The lift is mostly scale: the frames below have the jeans in them, and this keeps those covered.
    const running = [
      blanket.current?.animate(
        [{ opacity: 1 }, { opacity: 1, offset: 0.26, easing: inOut }, { opacity: 0, offset: 0.6 }, { opacity: 0 }],
        timing,
      ),
      jeans.current?.animate(
        [
          { transform: "none", easing: out },
          { transform: "translateY(-2.5%) scale(1.07)", offset: 0.22 },
          { transform: "translateY(-2.5%) scale(1.07)", offset: 0.62, easing: inOut },
          { transform: "translateY(0.8%) scale(1.03, 0.96)", offset: 0.8, easing: out },
          { transform: "translateY(-0.3%) scale(0.99, 1.01)", offset: 0.9, easing: out },
          { transform: "none" },
        ],
        timing,
      ),
      shadow.current?.animate(
        [{ opacity: 0 }, { opacity: 0, offset: 0.72, easing: out }, { opacity: 0.3, offset: 0.86 }, { opacity: 0.3 }],
        timing,
      ),
    ];
    return () => running.forEach((a) => a?.cancel());
  }, [active]);

  return (
    <Print>
      <Image
        unoptimized
        src="/assets/3d/wood.webp"
        alt="Blue jeans lying on a warm wooden floor beside a white vase of lavender."
        fill
        sizes={SIZES}
        className="object-cover"
        style={FRAMING}
      />
      <div ref={blanket} className="absolute inset-0 opacity-0">
        <Image unoptimized src="/assets/3d/before.webp" alt="" fill sizes={SIZES} className="object-cover" style={FRAMING} />
      </div>
      <div ref={shadow} className="absolute inset-0 translate-x-[1.5%] translate-y-[1.5%] opacity-30 blur-[8px] brightness-0">
        <Image unoptimized src="/assets/3d/jeans.webp" alt="" fill sizes={SIZES} className="object-cover" style={FRAMING} />
      </div>
      <div ref={jeans} className="absolute inset-0 origin-[50%_50%]">
        <Image unoptimized src="/assets/3d/jeans.webp" alt="" fill sizes={SIZES} className="object-cover" style={FRAMING} />
      </div>
    </Print>
  );
}

function Replacement({ active }: { active: boolean }) {
  const previous = useRef<HTMLDivElement>(null);
  const next = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const timing = { duration: duration.replacement, delay: 300, fill: "both" } as const;
    const running = [
      previous.current?.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: "none", opacity: 1, offset: 0.2, easing: inOut },
          { transform: "translateX(-135%) rotate(-10deg)", opacity: 1, offset: 0.56 },
          { transform: "translateX(-135%) rotate(-10deg)", opacity: 0 },
        ],
        timing,
      ),
      next.current?.animate(
        [
          { transform: "translateX(190%) rotate(8deg)" },
          { transform: "translateX(190%) rotate(8deg)", offset: 0.42, easing: out },
          { transform: "none" },
        ],
        timing,
      ),
    ];
    return () => running.forEach((a) => a?.cancel());
  }, [active]);

  const spot = "absolute top-[50%] left-[2%] h-[48%] w-[48%]";
  const garment = "object-contain drop-shadow-[0_10px_10px_color-mix(in_srgb,var(--t-color-ink)_30%,transparent)]";

  return (
    <Print>
      {/* TODO(owner): replace with the real styled scene that has a beige sweater in it. */}
      <Image unoptimized src="/assets/3d/scene.webp" alt="A wooden floor with a white vase of lavender." fill sizes={SIZES} className="object-cover" style={{ objectPosition: "100% 50%" }} />
      {/* TODO(owner): the outgoing product becomes the beige sweater; the incoming one a white tee. */}
      <div ref={previous} className={`${spot} opacity-0`}>
        <Image unoptimized src="/assets/3d/hoodie-blue.webp" alt="" fill sizes="240px" className={garment} />
      </div>
      <div ref={next} className={spot}>
        <Image unoptimized src="/assets/3d/jeans-cut.webp" alt="Blue jeans placed in the scene, in the spot the previous product held." fill sizes="240px" className={garment} />
      </div>
    </Print>
  );
}

export function TwoWays() {
  const [mode, setMode] = useState<Mode>("placement");
  const [ref, inView] = useInView<HTMLDivElement>();
  const current = modes.find((m) => m.id === mode)!;

  return (
    <section aria-labelledby="two-ways-title" className="mx-auto mt-32 max-w-[1240px] px-4 sm:mt-40">
      <h2
        id="two-ways-title"
        className="font-display-tight mx-auto max-w-[16ch] text-center text-h2 leading-heading tracking-heading text-balance"
      >
        Two ways to use it
      </h2>
      <div ref={ref} className="mt-12 grid items-center gap-8 rounded-lg bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <div>
          <Segmented label="Way to use it" name="two-ways" options={modes} value={mode} onChange={setMode} className="max-w-[360px]" />
          <p className="mt-7 max-w-[30ch] font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]">
            {current.text}
          </p>
        </div>
        {/* The key mounts a fresh stage, so changing the switch plays it from the start. */}
        {mode === "placement" ? <Placement key="placement" active={inView} /> : <Replacement key="replacement" active={inView} />}
      </div>
    </section>
  );
}

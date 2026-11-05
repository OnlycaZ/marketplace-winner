"use client";

// The phone demo in the hero. One CSS timeline drives every step (see .demo-* in globals.css),
// so one data attribute pauses it all when it leaves the screen.
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const spring = { stiffness: 120, damping: 18, mass: 0.6 };
const SCREEN = "(min-width: 640px) 200px, 170px";
// Sparkles that ride along with the wipe: height in the screen, and start offset.
const sparks = [
  { y: "18%", d: "0ms", s: "14px" },
  { y: "38%", d: "90ms", s: "9px" },
  { y: "55%", d: "40ms", s: "16px" },
  { y: "72%", d: "140ms", s: "10px" },
  { y: "86%", d: "70ms", s: "13px" },
];

// The jeans are one transparent file drawn over both states, so they can't change between them.
function Jeans({ sizes }: { sizes: string }) {
  return <Image unoptimized src="/assets/3d/jeans.webp" alt="" fill sizes={sizes} className="object-cover" />;
}

// The new background, with its own shadows. The jeans line up with it exactly: same frame, same size.
function Wood({ sizes }: { sizes: string }) {
  return <Image unoptimized src="/assets/3d/wood.webp" alt="" fill sizes={sizes} className="object-cover" />;
}

export function HeroDemo() {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Cursor position in the stage, -1 to 1, smoothed so the phone drifts instead of snapping.
  const mx = useSpring(useMotionValue(0), spring);
  const my = useSpring(useMotionValue(0), spring);
  const rotateY = useTransform(mx, [-1, 1], [-9, 9]);
  const rotateX = useTransform(my, [-1, 1], [6, -6]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative mx-auto mt-6 w-full max-w-[560px]">
      <div
        ref={stageRef}
        role="img"
        aria-label="A phone shows a photo of jeans on a grey blanket. A glowing blue line crosses the screen and reveals the same jeans on a wooden floor with a vase of lavender. The finished photo pops out as a card and gets a blue tick."
        data-running={!paused && inView && tabVisible}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="demo relative h-[clamp(340px,calc(100svh-520px),440px)] [perspective:1100px]"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="absolute top-0 left-1/2 aspect-[598/1024] h-full -translate-x-1/2 [transform-style:preserve-3d]"
        >
          <div className="float relative h-full w-full drop-shadow-[0_26px_30px_color-mix(in_srgb,var(--t-color-primary)_34%,transparent)]">
            <div className="absolute top-[2.8%] left-[8.6%] h-[93.1%] w-[83%] overflow-hidden rounded-[10%/5.8%] bg-line [container-type:inline-size]">
              <Image unoptimized src="/assets/3d/before.webp" alt="" fill priority sizes={SCREEN} className="object-cover" />
              <div className="demo-after absolute inset-0">
                <Wood sizes={SCREEN} />
              </div>
              <Jeans sizes={SCREEN} />
              <div className="demo-bar absolute inset-y-[-5%] left-0 w-[18%]" />
              {sparks.map((s) => (
                <span
                  key={s.y}
                  className="demo-spark absolute left-0"
                  style={{ top: s.y, width: s.s, height: s.s, animationDelay: s.d }}
                />
              ))}
            </div>
            <Image unoptimized src="/assets/3d/phone.webp" alt="" fill priority sizes="(min-width: 640px) 240px, 200px" className="pointer-events-none object-contain" />
            <span className="demo-tag absolute top-[9%] right-[94%] rounded-pill bg-bg px-3 py-1.5 text-small font-semibold whitespace-nowrap text-ink shadow-card">
              Your photo
            </span>

            <div className="demo-card absolute top-[24%] left-1/2 w-[60%] rounded-md bg-bg p-[3%] shadow-float sm:w-[66%]">
              <div className="relative aspect-[9/14] overflow-hidden rounded-sm">
                <Wood sizes="160px" />
                <Jeans sizes="160px" />
              </div>
              <span className="demo-badge absolute -top-[9%] -right-[11%] flex aspect-square w-[32%] items-center justify-center rounded-pill bg-primary shadow-float">
                <svg viewBox="0 0 24 24" className="w-[56%]" fill="none" stroke="var(--t-color-on-primary)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Only keyboard users see this, when they tab to it. Hidden by CSS for reduced motion:
          the server can't know that setting, and the HTML must match. */}
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-label={paused ? "Play the demo" : "Pause the demo"}
        className="pointer-events-none absolute top-0 left-0 z-10 flex min-h-11 items-center gap-2 rounded-pill bg-ink px-4 text-small font-semibold text-bg opacity-0 focus-visible:pointer-events-auto focus-visible:opacity-100 motion-reduce:hidden"
      >
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="currentColor">
          {paused ? <path d="M5 3l8 5-8 5z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
        </svg>
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { sitePapers as papers } from "@/lib/tokens";
import { SweepPaper, SweepRoll } from "./illustrations/StudioSweep";

const START = papers.findIndex((p) => p.id === "paleblue");
const spring = { stiffness: 120, damping: 18, mass: 0.6 };
// Sparkles that ride along with the wipe: height in the screen, and start offset.
const sparks = [
  { y: "18%", d: "0ms", s: "14px" },
  { y: "38%", d: "90ms", s: "9px" },
  { y: "55%", d: "40ms", s: "16px" },
  { y: "72%", d: "140ms", s: "10px" },
  { y: "86%", d: "70ms", s: "13px" },
];

// Measured from the images: `hook` is the inside top of the hook, where it rests on the rail,
// and `tip` the corner that holds the hook's tip, as % of the image. `place` puts that point
// on the rail; it works at every width because the stage keeps a fixed ratio.
const hangers = [
  {
    src: "/assets/3d/hoodie-blue.webp",
    width: 1385,
    height: 1495,
    place: "top-[6%] left-[1%] w-[30%] sm:left-[20%] sm:w-[16%]",
    sizes: "(min-width: 640px) 16vw, 30vw",
    hook: "52% 4.6%",
    tip: { x: 52, y: 11 },
    delay: "0s",
  },
  {
    src: "/assets/3d/mascot.webp",
    width: 1638,
    height: 1395,
    place: "top-[5.5%] right-[2%] w-[24%] sm:top-[5.3%] sm:right-[20%] sm:w-[13%]",
    sizes: "(min-width: 640px) 13vw, 24vw",
    hook: "48% 10.5%",
    tip: { x: 48, y: 26 },
    delay: "-2s",
  },
];

function Hanger({ src, width, height, place, sizes, hook, tip, delay, front }: (typeof hangers)[number] & { front?: boolean }) {
  return (
    <div className={`absolute ${place}`}>
      <div className="sway" style={{ transformOrigin: hook, animationDelay: delay }}>
        <Image
          unoptimized
          src={src}
          alt=""
          width={width}
          height={height}
          sizes={sizes}
          className={`h-auto w-full ${front ? "" : "drop-shadow-[0_18px_18px_color-mix(in_srgb,var(--t-color-ink)_18%,transparent)]"}`}
          style={
            front
              ? { clipPath: `polygon(${tip.x}% 0, 100% 0, 100% 100%, 0 100%, 0 ${tip.y}%, ${tip.x}% ${tip.y}%)` }
              : undefined
          }
        />
      </div>
    </div>
  );
}

// The jeans are one transparent file drawn over both states, so they can't change between them.
function Jeans({ sizes }: { sizes: string }) {
  return <Image unoptimized src="/assets/3d/jeans.webp" alt="" fill sizes={sizes} className="object-cover" />;
}

export function StudioScene() {
  const [index, setIndex] = useState(START);
  const [pinned, setPinned] = useState(false);
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

  // Cursor position in the stage, -1 to 1, smoothed so objects drift instead of snapping.
  const mx = useSpring(useMotionValue(0), spring);
  const my = useSpring(useMotionValue(0), spring);
  const rotateY = useTransform(mx, [-1, 1], [-11, 11]);
  const rotateX = useTransform(my, [-1, 1], [8, -8]);
  const nearX = useTransform(mx, [-1, 1], [-22, 22]);

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

  const paper = papers[index];
  const running = !paused && inView && tabVisible;

  return (
    <section aria-label="Studio backdrop demo" className="mx-auto mt-14 max-w-[1240px] px-4 sm:mt-16">
      <div
        ref={stageRef}
        role="img"
        aria-label="A phone shows a photo of jeans on a grey sheet. Coloured studio paper wipes in behind the jeans, which stay exactly the same, and the finished photo pops out approved."
        data-running={running}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="demo relative aspect-[4/5] overflow-hidden rounded-lg bg-surface sm:aspect-[5/3]"
        style={
          {
            "--paper": paper.hex,
            "--paper-dur": pinned ? "var(--t-dur-paper)" : "var(--t-dur-cycle-fade)",
          } as React.CSSProperties
        }
      >
        <div className="unroll absolute inset-0">
          <SweepPaper className="h-full w-full" />
        </div>

        {/* Each hanger is drawn twice, so the rail threads through its hook: the whole image
            behind the rail, then a copy in front with the hook's tip cut away. */}
        {hangers.map((h) => (
          <Hanger key={h.src} {...h} />
        ))}
        <SweepRoll className="absolute inset-0 h-full w-full" />
        {hangers.map((h) => (
          <Hanger key={h.src} {...h} front />
        ))}

        <div className="absolute inset-x-0 top-[14%] bottom-[5%] [perspective:1100px] sm:top-[13%]">
          <div className="absolute bottom-[-1%] left-1/2 h-[5%] w-[34%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--t-color-ink)_30%,transparent),transparent)] sm:w-[22%]" />
          <motion.div
            style={{ rotateX, rotateY, x: nearX }}
            className="absolute left-1/2 top-0 h-full aspect-[598/1024] -translate-x-1/2 [transform-style:preserve-3d]"
          >
            <div className="float relative h-full w-full drop-shadow-[0_26px_30px_color-mix(in_srgb,var(--t-color-ink)_28%,transparent)]">
              <div className="absolute top-[2.8%] left-[8.6%] h-[93.1%] w-[83%] overflow-hidden rounded-[10%/5.8%] bg-line [container-type:inline-size]">
                <Image unoptimized src="/assets/3d/before.webp" alt="" fill priority sizes="(min-width: 640px) 24vw, 46vw" className="object-cover" />
                <div className="demo-after absolute inset-0" onAnimationIteration={(e) => {
                  if (e.animationName === "demo-after" && !pinned) setIndex((i) => (i + 1) % papers.length);
                }}>
                  <div className="absolute inset-0 bg-(--paper) transition-colors duration-(--paper-dur)" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--t-color-bg)_32%,transparent),transparent_45%,color-mix(in_srgb,var(--t-color-ink)_9%,transparent))]" />
                  {/* contact shadow: the same cut-out, darkened, only on the new backdrop */}
                  <div className="absolute inset-0 translate-x-[1.5%] translate-y-[1.5%] opacity-30 blur-[6px] brightness-0">
                    <Jeans sizes="(min-width: 640px) 24vw, 46vw" />
                  </div>
                </div>
                <Jeans sizes="(min-width: 640px) 24vw, 46vw" />
                <div className="demo-bar absolute inset-y-[-5%] left-0 w-[18%]" />
                {sparks.map((s) => (
                  <span
                    key={s.y}
                    className="demo-spark absolute left-0"
                    style={{ top: s.y, width: s.s, height: s.s, animationDelay: s.d }}
                  />
                ))}
              </div>
              <Image unoptimized src="/assets/3d/phone.webp" alt="" fill priority sizes="(min-width: 640px) 29vw, 56vw" className="pointer-events-none object-contain" />

              <div className="demo-card absolute top-[34%] left-1/2 w-[50%] rounded-md sm:top-[22%] sm:w-[68%] bg-bg p-[3%] shadow-float">
                <div className="relative aspect-[9/14] overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-(--paper) transition-colors duration-(--paper-dur)" />
                  <Jeans sizes="(min-width: 640px) 16vw, 32vw" />
                </div>
                <span className="demo-badge absolute -top-[9%] -right-[11%] flex aspect-square w-[32%] items-center justify-center rounded-pill bg-primary shadow-float">
                  <svg viewBox="0 0 24 24" className="w-[56%]" fill="none" stroke="var(--t-color-on-primary)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <fieldset className="flex flex-wrap justify-center gap-2">
          <legend className="sr-only">Backdrop colour</legend>
          {papers.map((p, i) => (
            <label key={p.id} className="cursor-pointer">
              <input
                type="radio"
                name="backdrop"
                value={p.id}
                checked={i === index}
                onChange={() => {
                  setIndex(i);
                  setPinned(true);
                }}
                className="peer sr-only"
              />
              <span className="flex min-h-11 items-center gap-2 rounded-pill border-[1.5px] border-line py-1.5 pr-4 pl-1.5 text-small font-medium text-ink-2 transition-[border-color,color,transform] duration-(--t-dur-hover) ease-standard hover:border-ink-2 peer-checked:border-ink peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-primary active:scale-[0.97] motion-reduce:active:scale-100">
                <span
                  aria-hidden="true"
                  className="size-7 rounded-pill shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--t-color-ink)_12%,transparent)]"
                  style={{ background: p.hex }}
                />
                {p.label}
              </span>
            </label>
          ))}
        </fieldset>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Play the demo" : "Pause the demo"}
            className="flex min-h-11 items-center gap-2 rounded-pill bg-ink px-4 text-small font-semibold text-bg transition-[background-color,transform] duration-(--t-dur-hover) hover:bg-ink-2 active:scale-[0.97]"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="currentColor">
              {paused ? <path d="M5 3l8 5-8 5z" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" />}
            </svg>
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </section>
  );
}

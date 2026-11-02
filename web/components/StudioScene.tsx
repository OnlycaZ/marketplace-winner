"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { duration, papers } from "@/lib/tokens";
import { SweepFixtures, SweepPaper } from "./illustrations/StudioSweep";

type Props = { garmentSrc: string | null };

const START = papers.findIndex((p) => p.id === "paleblue");

export function StudioScene({ garmentSrc }: Props) {
  const [index, setIndex] = useState(START);
  // null until the visitor presses Play/Pause or picks a colour.
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  // "auto" uses the slow crossfade, "pick" the quicker change after a click.
  const [mode, setMode] = useState<"auto" | "pick">("auto");
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  // Reduced motion: the cycle never starts on its own.
  const playing = userPlaying ?? !reduceMotion;

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const cycling = playing && inView && tabVisible;
  useEffect(() => {
    if (!cycling) return;
    const id = window.setInterval(() => {
      setMode("auto");
      setIndex((i) => (i + 1) % papers.length);
    }, duration.cycleInterval);
    return () => window.clearInterval(id);
  }, [cycling]);

  const paper = papers[index];
  const onPaper = paper.text === "light" ? "text-bg" : "text-ink";

  const pick = (i: number) => {
    setMode("pick");
    setIndex(i);
    setUserPlaying(false);
  };

  return (
    <section aria-label="Studio backdrop demo" className="mx-auto mt-14 max-w-[1240px] px-4 sm:mt-16">
      <div
        ref={sceneRef}
        className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface sm:aspect-[16/10] lg:aspect-[16/9]"
        style={
          {
            "--paper": paper.hex,
            "--paper-dur": mode === "auto" ? "var(--t-dur-cycle-fade)" : "var(--t-dur-paper)",
          } as React.CSSProperties
        }
      >
        <div className="unroll absolute inset-0">
          <SweepPaper className="h-full w-full" />
        </div>
        <SweepFixtures className="enter absolute inset-0 h-full w-full" />

        <div
          className="enter absolute inset-x-0 bottom-[12%] mx-auto flex h-[64%] w-[62%] max-w-[400px] flex-col items-center justify-end sm:h-[66%] sm:w-[30%]"
          style={{ animationDelay: "calc(var(--t-dur-unroll) + 250ms)" }}
        >
          {garmentSrc ? (
            <div className="relative h-full w-full">
              <Image
                src={garmentSrc}
                alt="The garment, cut out from its original photo"
                fill
                priority
                sizes="(min-width: 640px) 30vw, 62vw"
                className="object-contain object-bottom"
              />
            </div>
          ) : (
            <div
              className={`flex h-full w-full flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-current p-6 text-center transition-colors duration-(--t-dur-paper) ${onPaper}`}
            >
              <svg viewBox="0 0 64 40" className="w-14" aria-hidden="true">
                <path
                  d="M26 8 a6 6 0 1 1 6 6 v4 l26 16 H6 l26 -16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="max-w-[16ch] text-small font-semibold">Your garment photo goes here</p>
            </div>
          )}
          {/* contact shadow */}
          <div
            aria-hidden="true"
            className="-mb-3 h-6 w-[90%] shrink-0 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--t-color-ink)_28%,transparent),transparent)]"
          />
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
                onChange={() => pick(i)}
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
        <button
          type="button"
          onClick={() => setUserPlaying(!playing)}
          aria-label={playing ? "Pause backdrop cycle" : "Play backdrop cycle"}
          className="flex min-h-11 items-center gap-2 rounded-pill bg-ink px-4 text-small font-semibold text-bg transition-[background-color,transform] duration-(--t-dur-hover) hover:bg-ink-2 active:scale-[0.97] motion-reduce:active:scale-100"
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="currentColor">
            {playing ? (
              <path d="M4 3h3v10H4zM9 3h3v10H9z" />
            ) : (
              <path d="M5 3l8 5-8 5z" />
            )}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}

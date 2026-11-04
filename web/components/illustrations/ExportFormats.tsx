"use client";

// "Ready for any marketplace": one print that changes between square and portrait.
import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { Print3D } from "./Print3D";
import { Tilt } from "./Tilt";

const formats = [
  { id: "square", label: "Square 1:1", width: "62%", ratio: 1 },
  { id: "portrait", label: "Portrait 4:5", width: "52%", ratio: 4 / 5 },
] as const;

export function ExportFormats() {
  const [format, setFormat] = useState<(typeof formats)[number]>(formats[1]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-[360px]">
        <Tilt className="flex h-[270px] items-center justify-center sm:h-[300px]">
          <div className="flex h-full w-full items-center justify-center">
            <motion.div
              initial={false}
              animate={{ width: format.width, aspectRatio: format.ratio }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
            >
              <Print3D paper="paleblue" garment="hoodie-blue" className="h-full w-full" sizes="240px" />
            </motion.div>
          </div>
        </Tilt>
        <div role="group" aria-label="Photo format" className="mt-4 flex justify-center gap-2">
          {formats.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={format.id === f.id}
              onClick={() => setFormat(f)}
              className="min-h-11 rounded-pill bg-bg/15 px-4 text-small font-semibold text-bg transition-[background-color,color,transform] duration-(--t-dur-hover) hover:bg-bg/25 focus-visible:outline-bg active:scale-[0.97] aria-pressed:bg-bg aria-pressed:text-ink motion-reduce:active:scale-100"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

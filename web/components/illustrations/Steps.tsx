"use client";

// The three "How it works" steps. Each plays once when it scrolls into view, because
// the small movement is the explanation: photos drop in, paper pulls down, the tick lands.
import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Badge3D, Print3D } from "./Print3D";
import { Tilt } from "./Tilt";

const inView = { once: true, amount: 0.5 };
const bounce = { type: "spring", duration: 0.7, bounce: 0.35 } as const;

function Stage({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Tilt className="aspect-[3/2] w-full" max={7}>
        <div className="relative h-full w-full" aria-hidden="true">
          {children}
        </div>
      </Tilt>
    </MotionConfig>
  );
}

// 1. Upload: your photos, as they are, drop into the tray.
export function StepUpload() {
  const drops = [
    { left: "20%", rotate: -10, delay: 0 },
    { left: "54%", rotate: 9, delay: 0.1 },
    { left: "37%", rotate: 0, delay: 0.2 },
  ];
  return (
    <Stage>
      {drops.map((d, i) => (
        <motion.div
          key={i}
          initial={{ y: -70, opacity: 0, rotate: 0 }}
          whileInView={{ y: 0, opacity: 1, rotate: d.rotate }}
          viewport={inView}
          transition={{ ...bounce, delay: d.delay }}
          className="absolute top-[6%] w-[26%]"
          style={{ left: d.left }}
        >
          <Print3D paper="plain" garment="jeans" className="aspect-[4/5]" sizes="110px" />
        </motion.div>
      ))}
      <div className="absolute inset-x-[12%] bottom-[8%] h-[36%] rounded-md bg-[linear-gradient(to_bottom,var(--t-paper-paleblue),color-mix(in_srgb,var(--t-paper-paleblue)_82%,var(--t-color-ink)))] shadow-clay" />
      <Badge3D icon="up" className="absolute bottom-[14%] left-1/2 w-[14%] -translate-x-1/2" />
    </Stage>
  );
}

// 2. Pick a backdrop: paper rolls on a rail, and one pulls down.
export function StepBackdrop() {
  const rolls: { id: string; color: string; pulled?: boolean }[] = [
    { id: "paleblue", color: "var(--t-paper-paleblue)" },
    { id: "powder", color: "var(--t-paper-powder)" },
    { id: "cobalt", color: "var(--t-color-primary)", pulled: true },
    { id: "butter", color: "var(--t-paper-butter)" },
    { id: "ink", color: "var(--t-color-ink)" },
  ];
  return (
    <Stage>
      <div className="absolute inset-x-[8%] top-[8%] h-[7%] rounded-pill bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--t-paper-charcoal)_72%,var(--t-color-bg)),var(--t-paper-charcoal)_45%,var(--t-color-ink))] shadow-clay" />
      <div className="absolute inset-x-[12%] top-[12%] flex justify-between">
        {rolls.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scaleY: 0.45 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{ ...bounce, delay: r.pulled ? 0.25 : 0 }}
            className={`w-[17%] origin-top rounded-b-sm shadow-clay ${r.pulled ? "h-[150px]" : "h-[84px]"} max-[1100px]:h-auto max-[1100px]:aspect-[1/2]`}
            style={{
              backgroundColor: r.color,
              backgroundImage:
                "linear-gradient(to right, color-mix(in srgb, var(--t-color-ink) 10%, transparent), transparent 30%, transparent 70%, color-mix(in srgb, var(--t-color-ink) 10%, transparent))",
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

// 3. Check & download: the finished print gets its tick, then the arrow.
export function StepCheck() {
  return (
    <Stage>
      <motion.div
        initial={{ scale: 0.86, opacity: 0, rotate: -4 }}
        whileInView={{ scale: 1, opacity: 1, rotate: -3 }}
        viewport={inView}
        transition={bounce}
        className="absolute top-[6%] left-[32%] w-[36%]"
      >
        <Print3D paper="paleblue" garment="hoodie-blue" className="aspect-[4/5]" sizes="150px" />
      </motion.div>
      <motion.span
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={inView}
        transition={{ ...bounce, delay: 0.3 }}
        className="absolute top-[3%] right-[24%] w-[15%]"
      >
        <Badge3D className="w-full" />
      </motion.span>
      <motion.span
        initial={{ y: -14, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={inView}
        transition={{ ...bounce, delay: 0.45 }}
        className="absolute bottom-[6%] left-[22%] w-[13%]"
      >
        <Badge3D icon="down" className="w-full" />
      </motion.span>
    </Stage>
  );
}

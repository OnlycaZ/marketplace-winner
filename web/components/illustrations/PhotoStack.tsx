"use client";

// "Whole batches at once": a stack of prints that fans out on hover
// (docs/motion-plan.md #7). Touch screens and reduced motion get the fanned state, static.
import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { paper, Print } from "./cut";

const prints = [
  { backdrop: paper("charcoal"), rest: { x: 0, y: 6, rotate: -4 }, fan: { x: -112, y: 22, rotate: -12 } },
  { backdrop: paper("terracotta"), rest: { x: 0, y: 4, rotate: -2 }, fan: { x: -56, y: 6, rotate: -6 } },
  { backdrop: paper("butter"), rest: { x: 0, y: 2, rotate: 1 }, fan: { x: 0, y: 0, rotate: 0 } },
  { backdrop: paper("sage"), rest: { x: 0, y: 2, rotate: 3 }, fan: { x: 56, y: 6, rotate: 6 } },
  { backdrop: paper("powder"), rest: { x: 0, y: 0, rotate: 5 }, fan: { x: 112, y: 22, rotate: 12 } },
];

const hoverQuery = "(hover: hover) and (pointer: fine)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(hoverQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function PhotoStack({ fanned }: { fanned: boolean }) {
  const reduceMotion = useReducedMotion();
  const canHover = useSyncExternalStore(subscribe, () => window.matchMedia(hoverQuery).matches, () => true);
  const open = fanned || !canHover || !!reduceMotion;

  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      {prints.map((p, i) => (
        <motion.g
          key={i}
          initial={false}
          animate={open ? p.fan : p.rest}
          transition={
            open
              ? { type: "spring", duration: 0.3, bounce: 0.15 }
              : { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
          }
          style={{ originX: "50%", originY: "100%" }}
        >
          <g transform="translate(182 40)">
            <Print w={156} h={200} backdrop={p.backdrop} />
          </g>
        </motion.g>
      ))}
    </svg>
  );
}

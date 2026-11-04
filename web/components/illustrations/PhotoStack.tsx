"use client";

// "Whole batches at once": a stack of prints that fans out on hover
// (docs/motion-plan.md #7). Touch screens and reduced motion get the fanned state, static.
import { motion } from "motion/react";
import { ease, type WoodId } from "@/lib/tokens";
import { useMediaQuery } from "@/lib/use-media-query";
import { Print3D, type Garment } from "./Print3D";

const prints: { backdrop: WoodId; garment: Garment; rest: Pose; fan: Pose }[] = [
  { backdrop: "ash", garment: "jeans", rest: { x: "-30%", y: 12, rotate: -9 }, fan: { x: "-92%", y: 30, rotate: -14 } },
  { backdrop: "walnut", garment: "hoodie-blue", rest: { x: "-15%", y: 4, rotate: -4 }, fan: { x: "-46%", y: 8, rotate: -7 } },
  { backdrop: "oak", garment: "jeans", rest: { x: "0%", y: 0, rotate: 0 }, fan: { x: "0%", y: 0, rotate: 0 } },
  { backdrop: "ash", garment: "hoodie-blue", rest: { x: "15%", y: 4, rotate: 4 }, fan: { x: "46%", y: 8, rotate: 7 } },
  { backdrop: "walnut", garment: "hoodie-blue", rest: { x: "30%", y: 12, rotate: 9 }, fan: { x: "92%", y: 30, rotate: 14 } },
];

type Pose = { x: string; y: number; rotate: number };

export function PhotoStack({ fanned }: { fanned: boolean }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)", true);
  const open = fanned || !canHover || reduceMotion;

  return (
    <div className="relative mx-auto h-[250px] max-w-[520px] sm:h-[320px]" aria-hidden="true">
      {prints.map((p, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={open ? p.fan : p.rest}
          whileHover={open && !reduceMotion ? { y: p.fan.y - 18, scale: 1.04 } : undefined}
          transition={
            reduceMotion
              ? { duration: 0 }
              : open
              ? { type: "spring", duration: 0.45, bounce: 0.25 }
              : { duration: 0.2, ease: ease.out as unknown as [number, number, number, number] }
          }
          style={{ transformOrigin: "50% 120%" }}
          className="absolute bottom-0 left-[calc(50%-19%)] w-[38%]"
        >
          <Print3D backdrop={p.backdrop} garment={p.garment} className="aspect-[4/5]" sizes="170px" />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

// Tilts its content toward the mouse, so flat images read as objects in space.
// Mouse only: on touch and with reduced motion it stays still.
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const spring = { stiffness: 140, damping: 16, mass: 0.5 };

export function Tilt({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  const rotateY = useTransform(x, [-1, 1], [-max, max]);
  const rotateX = useTransform(y, [-1, 1], [max, -max]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 2 - 1);
    y.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`[perspective:900px] ${className}`} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div style={{ rotateX, rotateY }} className="h-full w-full [transform-style:preserve-3d]">
        {children}
      </motion.div>
    </div>
  );
}

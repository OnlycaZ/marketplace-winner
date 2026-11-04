"use client";

// "You approve every photo": a small working review screen.
// Approve puts the tick on a print; Redo swaps its backdrop and clears the tick.
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { sitePapers as papers, type PaperId } from "@/lib/tokens";
import { Badge3D, Print3D, type Garment } from "./Print3D";

type Item = { label: string; garment: Garment; paper: PaperId; approved: boolean; version: number };

const start: Item[] = [
  { label: "jeans", garment: "jeans", paper: "paleblue", approved: true, version: 0 },
  { label: "hoodie", garment: "hoodie-blue", paper: "powder", approved: false, version: 0 },
];

const pill =
  "min-h-11 flex-1 rounded-pill px-2 text-small font-semibold transition-[background-color,color,transform] duration-(--t-dur-hover) active:scale-[0.97] motion-reduce:active:scale-100";

export function ReviewScreen() {
  const [items, setItems] = useState(start);

  const update = (i: number, change: (item: Item) => Partial<Item>) =>
    setItems((all) => all.map((it, n) => (n === i ? { ...it, ...change(it) } : it)));

  const redo = (it: Item) => {
    const next = (papers.findIndex((p) => p.id === it.paper) + 1) % papers.length;
    return { paper: papers[next].id, approved: false, version: it.version + 1 };
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-3 rounded-lg bg-bg p-3 shadow-clay sm:gap-4 sm:p-4">
        {items.map((it, i) => (
          <div key={it.label} className="flex min-w-0 flex-col gap-3">
            <div className="relative [perspective:700px]">
              <motion.div
                key={it.version}
                initial={it.version ? { rotateY: -90, opacity: 0.4 } : false}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              >
                <Print3D paper={it.paper} garment={it.garment} className="aspect-[4/5]" sizes="190px" />
              </motion.div>
              <AnimatePresence>
                {it.approved && (
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0.45 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge3D className="w-11" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-pressed={it.approved}
                aria-label={`Approve the ${it.label} photo`}
                onClick={() => update(i, () => ({ approved: true }))}
                className={`${pill} ${it.approved ? "bg-primary text-on-primary" : "bg-surface text-ink hover:bg-line"}`}
              >
                Approve
              </button>
              <button
                type="button"
                aria-label={`Redo the ${it.label} photo with the next backdrop`}
                onClick={() => update(i, redo)}
                className={`${pill} bg-surface text-ink hover:bg-line`}
              >
                Redo
              </button>
            </div>
          </div>
        ))}
      </div>
    </MotionConfig>
  );
}

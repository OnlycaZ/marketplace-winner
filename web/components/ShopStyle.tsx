"use client";

// "Your shop, one style": nine items on mismatched backgrounds move into one scene, one by one.
// CSS transitions, so pressing the button halfway through turns them around smoothly.
import Image from "next/image";
import { useState } from "react";
import { duration } from "@/lib/tokens";
import { buttonClass } from "./Button";
import { garments, type Garment } from "./illustrations/Print3D";

const names: Record<Garment, string> = { jeans: "Blue jeans", "hoodie-blue": "A blue hoodie" };

// TODO(owner): placeholders until there are more garments and real messy backgrounds to show.
const tiles: { garment: Garment; backdrop: string; background: string }[] = [
  { garment: "jeans", backdrop: "yellow stripes", background: "repeating-linear-gradient(45deg, var(--t-paper-butter) 0 14px, var(--t-color-bg) 14px 28px)" },
  { garment: "hoodie-blue", backdrop: "a dotted pink sheet", background: "radial-gradient(var(--t-color-bg) 3px, transparent 4px) 0 0 / 18px 18px, var(--t-paper-powder)" },
  { garment: "jeans", backdrop: "a dark grey wall", background: "linear-gradient(160deg, var(--t-paper-charcoal), var(--t-color-ink))" },
  { garment: "hoodie-blue", backdrop: "a blue checked cloth", background: "conic-gradient(var(--t-paper-paleblue) 25%, var(--t-color-bg) 0 50%, var(--t-paper-paleblue) 0 75%, var(--t-color-bg) 0) 0 0 / 34px 34px" },
  { garment: "jeans", backdrop: "a pink and yellow blanket", background: "linear-gradient(135deg, var(--t-paper-powder), var(--t-paper-butter))" },
  { garment: "hoodie-blue", backdrop: "a charcoal rug", background: "repeating-linear-gradient(90deg, var(--t-paper-charcoal) 0 5px, var(--t-color-ink) 5px 10px)" },
  { garment: "hoodie-blue", backdrop: "a pale striped bedsheet", background: "repeating-linear-gradient(0deg, var(--t-color-line) 0 8px, var(--t-color-surface) 8px 16px)" },
  { garment: "jeans", backdrop: "a yellow towel", background: "radial-gradient(circle at 30% 25%, var(--t-color-bg), var(--t-paper-butter) 70%)" },
  { garment: "hoodie-blue", backdrop: "a dotted yellow sheet", background: "radial-gradient(var(--t-paper-charcoal) 2px, transparent 3px) 0 0 / 15px 15px, var(--t-paper-butter)" },
];

export function ShopStyle() {
  const [applied, setApplied] = useState(false);

  return (
    <section aria-labelledby="shop-title" className="mx-auto mt-32 max-w-[1240px] px-4 text-center sm:mt-40">
      <h2
        id="shop-title"
        className="font-display-tight mx-auto max-w-[16ch] text-h2 leading-heading tracking-heading text-balance"
      >
        Your shop, one style
      </h2>
      <p className="mx-auto mt-4 max-w-[46ch] text-lead text-ink-2">
        Save your scene once. Every new item matches the rest of your shop.
      </p>
      <ul className="mx-auto mt-12 grid max-w-[660px] grid-cols-3 gap-2.5 sm:gap-4">
        {tiles.map((t, i) => {
          // Going in they follow each other; going back they all return at once.
          const delay = applied ? i * duration.shopStagger : 0;
          return (
            <li key={i} className="relative aspect-square overflow-hidden rounded-md shadow-clay" style={{ background: t.background }}>
              <div
                className="absolute inset-0 transition-opacity duration-(--t-dur-paper) ease-out"
                style={{ opacity: applied ? 1 : 0, transitionDelay: `${delay}ms` }}
              >
                <Image unoptimized src="/assets/3d/scene.webp" alt="" fill sizes="(min-width: 640px) 210px, 30vw" className="object-cover" />
              </div>
              <div
                className="absolute inset-[14%] transition-transform duration-(--t-dur-paper) ease-out"
                style={{
                  transform: applied ? "translate(-24%, 22%) scale(0.8)" : "none",
                  transitionDelay: `${delay}ms`,
                }}
              >
                <Image
                  unoptimized
                  src={garments[t.garment]}
                  alt={`${names[t.garment]} on ${applied ? "the shop’s wooden floor scene with lavender" : t.backdrop}.`}
                  fill
                  sizes="(min-width: 640px) 150px, 22vw"
                  className="object-contain drop-shadow-[0_6px_6px_color-mix(in_srgb,var(--t-color-ink)_30%,transparent)]"
                />
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={() => setApplied((v) => !v)} className={buttonClass("primary", "mt-8 min-w-48")}>
        {applied ? "Reset" : "Apply shop style"}
      </button>
    </section>
  );
}

// Soft 3D building blocks: a photo print on a wood background and a round badge.
// Garments are cut-out images drawn over the wood, so a tone change never touches them.
// These are illustrations, never real results.
import Image from "next/image";
import type { ReactNode } from "react";
import { woods, type WoodId } from "@/lib/tokens";

export const garments = {
  jeans: "/assets/3d/jeans-cut.webp",
  "hoodie-blue": "/assets/3d/hoodie-blue.webp",
} as const;

export type Garment = keyof typeof garments;

type PrintProps = {
  backdrop: WoodId | "plain";
  garment?: Garment;
  className?: string;
  sizes?: string;
  children?: ReactNode;
};

export function Print3D({ backdrop, garment, className = "", sizes = "220px", children }: PrintProps) {
  const wood = woods.find((w) => w.id === backdrop);
  return (
    <div className={`relative rounded-md bg-bg p-[6%] shadow-clay ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-sm bg-line">
        {wood && (
          <Image
            unoptimized
            src="/assets/3d/wood-tile.webp"
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: wood.position, filter: wood.filter }}
          />
        )}
        {garment && (
          <Image
            unoptimized
            src={garments[garment]}
            alt=""
            fill
            sizes={sizes}
            className="object-contain p-[12%] drop-shadow-[0_8px_8px_color-mix(in_srgb,var(--t-color-ink)_25%,transparent)]"
          />
        )}
      </div>
      {children}
    </div>
  );
}

export function Badge3D({ className = "", icon = "check" }: { className?: string; icon?: "check" | "down" | "up" }) {
  const paths = {
    check: "M5 12.5l4.5 4.5L19 7.5",
    down: "M12 5v13M6.5 12.5L12 18l5.5-5.5",
    up: "M12 19V6M6.5 11.5L12 6l5.5 5.5",
  };
  return (
    <span
      className={`flex aspect-square items-center justify-center rounded-pill bg-[radial-gradient(circle_at_35%_30%,color-mix(in_srgb,var(--t-color-primary)_70%,var(--t-color-bg)),var(--t-color-primary)_70%)] shadow-clay ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-[56%]" fill="none" stroke="var(--t-color-on-primary)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={paths[icon]} />
      </svg>
    </span>
  );
}

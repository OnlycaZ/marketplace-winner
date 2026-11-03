import type { ReactNode } from "react";
import type { PaperId } from "@/lib/tokens";

const tones: Record<PaperId, string> = {
  terracotta: "bg-paper-terracotta text-bg",
  sage: "bg-paper-sage text-ink",
  butter: "bg-paper-butter text-ink",
  paleblue: "bg-paper-paleblue text-ink",
  powder: "bg-paper-powder text-ink",
  charcoal: "bg-paper-charcoal text-bg",
};

type Props = {
  title: string;
  text: string;
  tone: PaperId;
  // Pictures run off the card's bottom edge; anything with buttons stays fully inside.
  bleed?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

// A card on studio paper, with its picture at the bottom.
export function FeatureCard({ title, text, tone, bleed = true, children, className = "", ...rest }: Props) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-lg ${tones[tone]} ${className}`} {...rest}>
      <div className="px-7 pt-8 sm:px-10 sm:pt-10">
        <h3 className="font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]">{title}</h3>
        <p className="mt-2 max-w-[42ch]">{text}</p>
      </div>
      <div className={`mt-auto px-7 pt-8 sm:px-10 ${bleed ? "translate-y-6" : "pb-8 sm:pb-10"}`}>{children}</div>
    </article>
  );
}

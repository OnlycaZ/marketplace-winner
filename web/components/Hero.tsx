"use client";

import Image from "next/image";
import { motion, MotionConfig, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "./Button";

export function Hero() {
  // The clouds sink slightly slower than the page, which gives the sky some depth.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 90]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-[max(100svh,760px)] flex-col items-center overflow-hidden bg-sky px-4 pt-32 text-center text-bg sm:pt-[17vh]"
      >
        {/* Bottom-aligned and never narrower than 520px, so phones still see the clothes on both sides.
            The image's top edge is the same blue as the section, so the join can't be seen. */}
        <motion.div style={{ y }} className="absolute bottom-0 left-1/2 w-[max(100%,520px)] -translate-x-1/2">
          <Image unoptimized src="/assets/3d/sky.webp" alt="" width={2752} height={1536} priority sizes="(min-width: 520px) 100vw, 520px" className="h-auto w-full" />
        </motion.div>
        {/* deepens the blue behind the text only, so white stays readable; clouds keep their colour */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_36%_40%_at_50%_32%,color-mix(in_srgb,var(--t-color-primary)_66%,transparent)_70%,transparent)] max-sm:bg-[radial-gradient(ellipse_80%_40%_at_50%_34%,color-mix(in_srgb,var(--t-color-primary)_66%,transparent)_70%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(to_bottom,transparent,var(--t-color-bg))] sm:h-32" />

        <div className="relative">
          <h1
            id="hero-title"
            className="font-display-tight mx-auto text-display leading-display tracking-display text-balance"
          >
            <span className="enter block" style={{ "--i": 0 } as React.CSSProperties}>
              Real clothes.
            </span>
            <span className="enter block" style={{ "--i": 1 } as React.CSSProperties}>
              Natural <em className="font-[760] italic">backgrounds.</em>
            </span>
          </h1>
          <p className="enter mx-auto mt-7 max-w-[54ch] text-lead" style={{ "--i": 2 } as React.CSSProperties}>
            Upload a batch of photos, pick a natural background, check every result and download listing-ready images. The
            garment stays exactly as you shot it.
          </p>
          <div
            className="enter mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <ButtonLink href="#waitlist" variant="inverse">
              Join the waitlist
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="outlineLight">
              See how it works
            </ButtonLink>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

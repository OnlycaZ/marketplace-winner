"use client";

import { useState } from "react";
import { BeforeAfter } from "./BeforeAfter";
import { FeatureCard } from "./FeatureCard";
import { ExportFormats } from "./illustrations/ExportFormats";
import { PhotoStack } from "./illustrations/PhotoStack";
import { ReviewScreen } from "./illustrations/ReviewScreen";

export function Features() {
  const [stackHover, setStackHover] = useState(false);

  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto mt-32 max-w-[1240px] px-4 sm:mt-40">
      <h2
        id="features-title"
        className="font-display-tight mx-auto max-w-[18ch] text-center text-h2 leading-heading tracking-heading text-balance"
      >
        The garment stays. The background changes.
      </h2>
      <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-5">
        <FeatureCard
          tone="surface"
          className="lg:col-span-7"
          title="The garment stays untouched"
          text="We cut out the garment and only change what’s behind it. Drag the line to compare."
        >
          <BeforeAfter />
        </FeatureCard>
        <FeatureCard
          tone="sky"
          className="lg:col-span-5"
          title="Whole batches at once"
          text="Drop in every photo from today’s shoot. They all get the same backdrop."
          onPointerEnter={() => setStackHover(true)}
          onPointerLeave={() => setStackHover(false)}
        >
          <PhotoStack fanned={stackHover} />
        </FeatureCard>
        <FeatureCard
          tone="paper"
          className="lg:col-span-5"
          title="You approve every photo"
          text="Nothing is final until you say so. Approve the good ones, redo the rest."
          bleed={false}
        >
          <ReviewScreen />
        </FeatureCard>
        <FeatureCard
          tone="ink"
          className="lg:col-span-7"
          title="Ready for any marketplace"
          text="Download each photo square or portrait, sized for the listing."
          bleed={false}
        >
          <ExportFormats />
        </FeatureCard>
      </div>
    </section>
  );
}

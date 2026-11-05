"use client";

import { useState } from "react";
import { BeforeAfterCard } from "./BeforeAfter";
import { FeatureCard } from "./FeatureCard";
import { Measurements } from "./Measurements";
import { CroppedLabel } from "./illustrations/CroppedLabel";
import { PhotoStack } from "./illustrations/PhotoStack";
import { ReviewScreen } from "./illustrations/ReviewScreen";

export function Compare() {
  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto mt-32 max-w-[1240px] px-4 sm:mt-40">
      <h2
        id="features-title"
        className="font-display-tight mx-auto max-w-[18ch] text-center text-h2 leading-heading tracking-heading text-balance"
      >
        The garment stays. The background changes.
      </h2>
      <div className="mt-12 grid lg:grid-cols-12">
        <BeforeAfterCard />
      </div>
    </section>
  );
}

export function FeatureCards() {
  const [stackHover, setStackHover] = useState(false);

  return (
    <section aria-label="More features" className="mx-auto mt-32 max-w-[1240px] px-4 sm:mt-40">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <FeatureCard
          tone="surface"
          className="lg:col-span-7"
          title="Whole batches at once"
          text="Drop in every photo from today’s shoot. They all get the same background."
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
          tone="paper"
          className="lg:col-span-8"
          title="Measurements"
          text="Add measurements once. We turn them into a clean image buyers can read at a glance."
          bleed={false}
        >
          <Measurements />
        </FeatureCard>
        <FeatureCard
          tone="surface"
          className="lg:col-span-4"
          title="Labels & flaws stay as they are"
          text="Label, detail and flaw photos are cropped and straightened, not restyled."
          bleed={false}
        >
          <CroppedLabel />
        </FeatureCard>
      </div>
    </section>
  );
}

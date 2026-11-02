import { LabelToText } from "./illustrations/LabelToText";
import { StepBackdrop, StepCheck, StepUpload } from "./illustrations/Steps";

const steps = [
  {
    title: "Upload",
    text: "Add the photos you already took of your clothes.",
    Illustration: StepUpload,
  },
  {
    title: "Pick a backdrop",
    text: "Choose a paper colour. Every photo in the batch gets it.",
    Illustration: StepBackdrop,
  },
  {
    title: "Check & download",
    text: "Look at each result, approve it or redo it, then download.",
    Illustration: StepCheck,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="mx-auto mt-32 max-w-[1240px] px-4 sm:mt-40">
      <h2
        id="how-title"
        className="font-display-tight mx-auto max-w-[16ch] text-center text-h2 leading-heading tracking-heading text-balance"
      >
        Three steps, then you post.
      </h2>
      <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-6">
        {steps.map(({ title, text, Illustration }, i) => (
          <li key={title} className="flex flex-col">
            <div className="rounded-lg bg-surface px-6 pt-6 pb-2">
              <Illustration />
            </div>
            <div className="mt-6 flex items-start gap-4">
              <span
                aria-hidden="true"
                className="font-display text-[4.5rem] leading-[0.8] font-black text-primary [font-stretch:80%]"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-1 text-ink-2">{text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ComingLater() {
  return (
    <section aria-labelledby="later-title" className="mx-auto mt-24 max-w-[1240px] px-4">
      <div className="grid items-center gap-8 overflow-hidden rounded-lg bg-paper-charcoal px-7 py-10 text-bg sm:px-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 id="later-title" className="font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]">
            In progress: listing text from your photos
          </h2>
          <p className="mt-3 max-w-[48ch] text-bg/85">
            Not part of the first version. It will read the garment’s label and write a title and description
            you can edit.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[380px]">
          <LabelToText />
        </div>
      </div>
    </section>
  );
}

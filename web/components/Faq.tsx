"use client";

import { useId, useState } from "react";

const faqs = [
  {
    q: "Will the colour of my clothes change?",
    a: "No. We cut out the garment and only change what’s behind it.",
  },
  {
    q: "Does it post my listings?",
    a: "No. You download the photos and post them yourself.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing isn’t set yet. Waitlist members hear first.",
  },
  {
    q: "Is this allowed on marketplaces?",
    a: "Each marketplace has its own photo rules. Photos must show the real item and its real condition; check your platform’s rules.",
  },
  {
    q: "What happens to my photos?",
    // TODO(owner): decide photo storage and retention, then replace this answer.
    a: "This isn’t decided yet. Waitlist members hear first.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-lead font-semibold"
        >
          {q}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-6 shrink-0 transition-transform duration-(--t-dur-ui) ease-out data-[open=true]:rotate-45"
            data-open={open}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        data-open={open}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-(--t-dur-ui) ease-out data-[open=true]:grid-rows-[1fr]"
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="max-w-[60ch] pb-6 text-ink-2">{a}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto mt-32 max-w-[820px] px-4 sm:mt-40">
      <h2 id="faq-title" className="font-display-tight text-center text-h2 leading-heading tracking-heading">
        Questions
      </h2>
      <ul className="mt-10 border-t border-line">
        {faqs.map((f) => (
          <Item key={f.q} {...f} />
        ))}
      </ul>
    </section>
  );
}

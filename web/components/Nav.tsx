"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { buttonClass } from "./Button";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4 sm:top-4">
      <nav
        aria-label="Main"
        data-compact={compact}
        className="pointer-events-auto flex w-full max-w-[720px] [&_:focus-visible]:outline-bg origin-top items-center gap-2 rounded-pill bg-ink/80 p-1.5 pl-5 text-bg shadow-float backdrop-blur-md transition-[transform,background-color] duration-(--t-dur-ui) ease-out data-[compact=true]:scale-[0.96] data-[compact=true]:bg-ink/92"
      >
        <a
          href="#top"
          translate="no"
          className="mr-auto truncate font-display text-lg font-extrabold tracking-tight [font-stretch:90%] max-[359px]:text-base"
        >
          {site.name}
        </a>
        <ul className="hidden items-center md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-pill px-4 py-2 text-small font-medium text-bg/85 transition-colors duration-(--t-dur-hover) hover:bg-bg/10 hover:text-bg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#waitlist" className={buttonClass("inverse", "min-h-10 shrink-0 px-5 text-small")}>
          {/* very narrow phones: the short label keeps the name on one line */}
          <span className="max-[359px]:hidden">Join the waitlist</span>
          <span className="min-[360px]:hidden">Join</span>
        </a>
      </nav>
    </header>
  );
}

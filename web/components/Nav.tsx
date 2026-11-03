"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useScroll } from "motion/react";
import { ease } from "@/lib/tokens";
import { site } from "@/lib/site";
import { buttonClass } from "./Button";

const links = [
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "faq", label: "FAQ" },
];

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section crossing the middle of the screen is the current one.
  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id);
          else seen.delete(e.target.id);
        }
        setActive(links.find((l) => seen.has(l.id))?.id ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const highlighted = hovered ?? active;

  return (
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4 sm:top-4">
        <nav
          ref={navRef}
          aria-label="Main"
          data-compact={compact}
          className="pointer-events-auto relative flex w-full max-w-[760px] origin-top items-center gap-2 rounded-pill bg-ink/80 p-1.5 pl-3 text-bg shadow-float backdrop-blur-md transition-[transform,background-color] duration-(--t-dur-ui) ease-out data-[compact=true]:scale-[0.96] data-[compact=true]:bg-ink/92 [&_:focus-visible]:outline-bg"
        >
          <a
            href="#top"
            translate="no"
            className="group mr-auto flex min-w-0 items-center gap-2 font-display text-lg font-extrabold tracking-tight [font-stretch:90%] max-[439px]:text-base max-[439px]:[font-stretch:82%]"
          >
            {/* the key restarts the swing each time the current section changes */}
            <span key={active ?? "top"} className="swing-once shrink-0 group-hover:animate-[swing_var(--t-dur-swing)_var(--ease-in-out)]">
              <Image src="/assets/3d/mascot.webp" alt="" width={34} height={29} className="h-auto w-8.5" />
            </span>
            <span className="truncate">{site.name}</span>
          </a>

          <ul className="hidden items-center md:flex" onPointerLeave={() => setHovered(null)}>
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  onPointerEnter={() => setHovered(l.id)}
                  onFocus={() => setHovered(l.id)}
                  onBlur={() => setHovered(null)}
                  className="relative block rounded-pill px-4 py-2 text-small font-medium text-bg/85 transition-colors duration-(--t-dur-hover) hover:text-bg aria-[current=true]:text-bg"
                >
                  {highlighted === l.id && (
                    <motion.span
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-pill bg-bg/15"
                      transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a href="#waitlist" className={buttonClass("inverse", "min-h-10 shrink-0 px-5 text-small max-[439px]:px-4")}>
            {/* narrow phones: the short label leaves room for the name and the menu button */}
            <span className="max-[439px]:hidden">Join the waitlist</span>
            <span className="min-[440px]:hidden">Join</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 shrink-0 items-center justify-center rounded-pill text-bg transition-colors duration-(--t-dur-hover) hover:bg-bg/15 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>

          {/* how far down the page you are */}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-x-7 bottom-0 h-0.5 origin-left rounded-pill bg-bg/60"
          />

          <AnimatePresence>
            {open && (
              <motion.ul
                id="nav-panel"
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ duration: 0.18, ease: ease.out as unknown as [number, number, number, number] }}
                className="absolute inset-x-0 top-full mt-2 origin-top rounded-lg bg-ink/95 p-2 shadow-float backdrop-blur-md md:hidden"
              >
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      aria-current={active === l.id ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-md px-4 font-medium text-bg hover:bg-bg/10 aria-[current=true]:bg-bg/15"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </MotionConfig>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#features", label: "Features" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  { title: "Legal", links: [{ href: "/privacy", label: "Privacy" }] },
];

export function Footer() {
  return (
    <footer className="mt-32 sm:mt-40">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-4 pb-14 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-h3 font-extrabold tracking-tight [font-stretch:88%]">{site.name}</p>
          <p className="mt-2 max-w-[34ch] text-ink-2">Natural backgrounds for the clothes you sell.</p>
        </div>
        <nav aria-label="Footer" className="flex gap-16">
          {columns.map((c) => (
            <div key={c.title}>
              <h2 className="font-semibold">{c.title}</h2>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-2 underline-offset-4 hover:text-ink hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="relative overflow-hidden bg-paper-paleblue">
        <p className="mx-auto max-w-[1240px] px-4 pt-6 text-small text-ink">
          © 2026 {site.name}
        </p>
        {/* The giant name, cut off by the bottom edge of the page. */}
        <p
          aria-hidden="true"
          translate="no"
          className="mt-4 -mb-[0.24em] text-center font-display text-[12.4vw] leading-[0.8] font-black tracking-[-0.04em] whitespace-nowrap text-ink [font-stretch:72%] select-none"
        >
          {site.name}
        </p>
      </div>
    </footer>
  );
}

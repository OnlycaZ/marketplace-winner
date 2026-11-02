import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy · ${site.name}`,
  description: `How ${site.name} handles your email and photos.`,
};

// TODO(owner): write the privacy policy (what is collected, why, where it is stored, how to delete it).
export default function Privacy() {
  return (
    <main id="main" className="mx-auto max-w-[720px] px-4 py-32">
      <h1 className="font-display-tight text-h2 leading-heading tracking-heading">Privacy</h1>
      <p className="mt-6 text-lead text-ink-2">
        This page isn’t written yet. The waitlist form currently runs in demo mode and doesn’t store any
        email address.
      </p>
      <Link href="/" className="mt-10 inline-block font-semibold text-primary underline underline-offset-4">
        Back to the home page
      </Link>
    </main>
  );
}

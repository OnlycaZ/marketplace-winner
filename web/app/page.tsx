import { existsSync } from "node:fs";
import path from "node:path";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ComingLater, HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { StudioScene } from "@/components/StudioScene";
import { Waitlist } from "@/components/Waitlist";

// The real cut-out garment, if it has been added. Otherwise the scene shows a marked placeholder.
const GARMENT = "/assets/hero-garment.png";
const garmentSrc = existsSync(path.join(process.cwd(), "public", GARMENT)) ? GARMENT : null;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <StudioScene garmentSrc={garmentSrc} />
        <Features />
        <HowItWorks />
        <ComingLater />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

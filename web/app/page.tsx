import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ComingLater, HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { StudioScene } from "@/components/StudioScene";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <StudioScene />
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

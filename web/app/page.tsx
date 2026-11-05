import { Faq } from "@/components/Faq";
import { Compare, FeatureCards } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { FounderNote } from "@/components/FounderNote";
import { Hero } from "@/components/Hero";
import { ComingLater, HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { ShopStyle } from "@/components/ShopStyle";
import { TwoWays } from "@/components/TwoWays";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <Compare />
        <TwoWays />
        <ShopStyle />
        <FeatureCards />
        <HowItWorks />
        <ComingLater />
        <Faq />
        <FounderNote />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

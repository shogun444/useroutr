"use client";

import { useRef, useState } from "react";
import Hero from "@/components/Hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/navbar";
import { ProductsSection } from "@/components/ProductsSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { CodeSection } from "@/components/CodeSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { WaitlistModal } from "@/components/WaitlistModal";
import { ConnectivitySection } from "@/components/ConnectivitySection";
import { Simulator } from "@/components/Simulator";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TerminalPreview } from "@/components/TerminalPreview";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, MotionPathPlugin);

export default function Home() {
  const main = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useGSAP(
    () => {
      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
    },
    { scope: main }
  );

  return (
    <>
      <Navbar />
      <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content" className="pt-20">
          <Hero onWaitlistClick={() => setIsWaitlistOpen(true)} />
          <ProductsSection />
          <InfrastructureSection />
          <ConnectivitySection />
          <Simulator />
          <CodeSection />
          <PricingSection onWaitlistClick={() => setIsWaitlistOpen(true)} />
          <TerminalPreview />
          <Footer onWaitlistClick={() => setIsWaitlistOpen(true)} />
        </div>
      </div>
      <WaitlistModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </>
  );
}

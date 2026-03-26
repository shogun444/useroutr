"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  ArrowRightLeft,
  Navigation,
  Key,
  Cpu,
} from "lucide-react";

const features = [
  {
    t: "Inbound Layer",
    d: "Accept payments from any source — cards (Visa, Mastercard), bank transfers (ACH, SEPA), and crypto from 10+ chains including Ethereum, Solana, and Base.",
    i: ArrowRightLeft,
  },
  {
    t: "Routing & Conversion",
    d: "Funds are automatically converted through the most efficient path on Stellar. Quotes are locked for 30 seconds so your customers always know what they're paying.",
    i: Navigation,
  },
  {
    t: "Settlement Layer",
    d: "Choose how you receive funds — stablecoins, XLM, or direct to bank accounts and mobile wallets via Stellar's global anchor network.",
    i: Key,
  },
  {
    t: "Smart Contracts",
    d: "Custom settlement rules, automatic fee splitting, and multi-party disbursements — all handled by Soroban contracts on Stellar.",
    i: Cpu,
  },
];

const stats = [
  { n: "~5s", l: "Settlement time" },
  { n: "$0.001", l: "Per transaction" },
  { n: "174", l: "Countries" },
  { n: "30s", l: "Locked quotes" },
];

export function InfrastructureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(".infra-reveal", { y: 50, opacity: 0 });
      gsap.set(".infra-line", { scaleX: 0 });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      mainTl
        .to(".infra-line", {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.inOut",
          stagger: 0.15,
        })
        .to(
          ".infra-reveal",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.8"
        );

      gsap.to(gridLinesRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".infra-pin-left",
          pinSpacing: false,
          scrub: true,
        });

        const featureCards = gsap.utils.toArray<HTMLElement>(".feature-card");
        featureCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.97 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 65%",
                end: "bottom 35%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      id="infrastructure"
      ref={containerRef}
      className="bg-[#050505] text-white overflow-hidden"
    >
      {/* Grid background */}
      <div
        ref={gridLinesRef}
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      <section className="relative py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column: Pinned on desktop */}
            <div className="lg:col-span-5 lg:h-screen flex flex-col justify-center gap-12 infra-pin-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/2 infra-reveal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500">
                    How It Works
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[0.95] tracking-tight infra-reveal">
                  Four layers. <br />
                  <span className="text-zinc-700 italic font-light">
                    One settlement.
                  </span>
                </h2>

                <p className="font-sans font-light text-base sm:text-lg text-zinc-500 leading-relaxed max-w-lg infra-reveal">
                  Every payment flows through four optimized stages — from
                  ingestion to final settlement — in under 5 seconds.
                </p>

                <div className="h-px w-full bg-white/5 origin-left infra-line" />
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden infra-reveal max-w-sm">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="bg-[#080808] p-5 sm:p-6 group hover:bg-[#0c0c0c] transition-colors duration-500"
                  >
                    <div className="font-display text-2xl sm:text-3xl font-bold mb-1 tracking-tighter text-white group-hover:translate-x-0.5 transition-transform">
                      {s.n}
                    </div>
                    <div className="font-mono text-[10px] sm:text-[11px] text-zinc-600 uppercase tracking-widest">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Scrolling feature cards */}
            <div className="lg:col-span-7 flex flex-col space-y-8 sm:space-y-12 lg:space-y-20 lg:py-24">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="feature-card group relative flex flex-col gap-5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm transition-all duration-500 hover:border-white/10"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                    <f.i size={24} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-700">
                        0{i + 1}
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        {f.t}
                        <ArrowUpRight
                          size={16}
                          className="opacity-30 group-hover:opacity-100 transition-opacity"
                        />
                      </h4>
                    </div>
                    <p className="font-sans font-light text-base sm:text-lg text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                      {f.d}
                    </p>
                  </div>

                  <span className="absolute top-6 right-6 sm:top-8 sm:right-8 font-display text-6xl sm:text-8xl font-black text-white/2 pointer-events-none transition-all duration-700 group-hover:text-white/5">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

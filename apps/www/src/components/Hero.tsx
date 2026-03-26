"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "./ui/button";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

interface HeroProps {
  onWaitlistClick: () => void;
}

const Hero = ({ onWaitlistClick }: HeroProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current || !paraRef.current) return;

      const ctx = gsap.context(() => {
        const split = new SplitText(headingRef.current, {
          type: "chars, words, lines",
        });

        gsap.from(split.chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.02,
          duration: 1.2,
          ease: "expo.out",
        });

        const paraSplit = new SplitText(paraRef.current, { type: "lines" });
        gsap.from(paraSplit.lines, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
        });

        gsap.from(".hero-reveal", {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
        });

        gsap.to(".data-stream", {
          strokeDashoffset: -1000,
          duration: 20,
          repeat: -1,
          ease: "none",
        });

        const onMouseMove = (e: MouseEvent) => {
          const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
          const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
          gsap.to(".hero-parallax", {
            x: xPos,
            y: yPos,
            duration: 1.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => window.removeEventListener("mousemove", onMouseMove);
      }, mainRef);

      return () => ctx.revert();
    },
    { scope: mainRef },
  );

  return (
    <header
      ref={mainRef}
      className="relative z-1 overflow-hidden min-h-svh flex flex-col bg-black  bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, #000000, #1110 34%, #1110 81%, #000000), url('https://cdn.prod.website-files.com/697b2f7b5c6c6bd8ea41646d/697b9f53307ab54faa7c9276_backdrop_pattern_dark-01.svg'), url('https://cdn.prod.website-files.com/697b2f7b5c6c6bd8ea41646d/697b3469ac2d8c7bd97b5f77_697a3a6862e0e83e13e59998_ss.webp')`,
        backgroundPosition: "0 0, 0 0, 100%",
        backgroundSize: "auto, cover, contain",
      }}
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      {/* Animated SVG lines */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            className="data-stream"
            d="M-100 200 C 200 100 400 400 700 300 S 1100 100 1540 250"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="10 20"
          />
          <path
            className="data-stream"
            d="M-100 500 C 300 400 600 600 900 450 S 1200 300 1540 500"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="5 15"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="150"
            r="2"
            fill="white"
            className="hero-parallax"
          />
          <circle
            cx="800"
            cy="350"
            r="1.5"
            fill="white"
            className="hero-parallax"
          />
          <circle
            cx="1200"
            cy="100"
            r="3"
            fill="white"
            className="hero-parallax"
            opacity="0.3"
          />
          <circle
            cx="400"
            cy="600"
            r="2"
            fill="white"
            className="hero-parallax"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black pointer-events-none z-1" />

      {/* Main content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-28 md:py-32 lg:py-40 relative z-10 grow flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 sm:mb-10 hero-reveal">
            <Activity size={12} className="text-emerald-400" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium font-mono">
              All Systems Operational
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-[clamp(2.5rem,8vw,7rem)] font-display font-bold leading-[0.9] tracking-tighter text-white mb-8 sm:mb-10"
          >
            Pay anything. <br />
            <span className="text-zinc-600 italic font-light">
              Settle everywhere.
            </span>
          </h1>

          {/* Description */}
          <p
            ref={paraRef}
            className="text-lg sm:text-xl lg:text-2xl font-sans text-zinc-400 max-w-2xl leading-relaxed font-light mb-10 sm:mb-14"
          >
            One API for fiat and crypto payments.{" "}
            <span className="text-white">
              Accept cards, bank transfers, and 20+ digital assets
            </span>{" "}
            — settle globally in seconds on Stellar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 hero-reveal">
            <Button
              variant="primary"
              size="lg"
              magnetic
              className="rounded-full px-8 sm:px-10 h-14 sm:h-16 text-base sm:text-lg group w-full sm:w-auto"
              onClick={onWaitlistClick}
            >
              Get Early Access
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              magnetic
              className="rounded-full px-8 h-14 sm:h-16 group border-white/10 hover:border-white/20 w-full sm:w-auto"
            >
              Read the Docs
            </Button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/5 bg-black/80 backdrop-blur-xl z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-0">
            {[
              { label: "Settlement", value: "~5s", sub: "Average finality" },
              {
                label: "Transaction Fee",
                value: "$0.001",
                sub: "Per transaction",
              },
              { label: "Countries", value: "174", sub: "Global coverage" },
              { label: "Chains", value: "10+", sub: "Networks supported" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-1.5 hero-reveal ${
                  i !== 0 ? "lg:border-l border-white/5 lg:pl-10" : ""
                }`}
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tighter">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] text-zinc-500 font-medium">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-700">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;

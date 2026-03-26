"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { Link2, Zap, Lock } from "lucide-react";
import { Badge } from "./ui/badge";

const chains = [
  { n: "Ethereum", b: "CCTP", c: "zinc-400" },
  { n: "Base", b: "CCTP", c: "zinc-400" },
  { n: "Solana", b: "Wormhole", c: "zinc-400" },
  { n: "Avalanche", b: "CCTP", c: "zinc-400" },
  { n: "Arbitrum", b: "CCTP", c: "zinc-400" },
  { n: "Stellar", b: "Native", c: "zinc-200" },
  { n: "SEP-24", b: "Off-Ramp", c: "white" },
  { n: "Card / Bank", b: "Fiat Rail", c: "white" },
];

export function ConnectivitySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(".conn-reveal", { y: 40, opacity: 0 });

      gsap.from(".chain-badge", {
        opacity: 0,
        scale: 0.85,
        y: 15,
        stagger: {
          each: 0.05,
          grid: "auto",
          from: "center",
        },
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      gsap.to(".conn-reveal", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-40 bg-black relative border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-14 sm:space-y-20 relative z-10">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight conn-reveal">
            Connected to{" "}
            <span className="text-zinc-700 italic font-light">
              every major network.
            </span>
          </h2>
          <p className="font-sans font-light text-base sm:text-lg text-zinc-500 max-w-xl mx-auto conn-reveal">
            One integration gives your users access to 10+ blockchain networks
            and traditional payment rails — no extra work required.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {chains.map((chain, i) => (
            <Badge
              key={i}
              className="chain-badge group flex items-center gap-2.5 sm:gap-3 bg-white/2 border border-white/5 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all hover:bg-white/5 hover:border-white/20 cursor-default"
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  chain.c === "white"
                    ? "bg-white"
                    : chain.c === "zinc-200"
                      ? "bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      : "bg-zinc-700 group-hover:bg-zinc-400"
                )}
              />
              <span className="font-display text-xs sm:text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
                {chain.n}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-700 bg-black/40 px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-tighter group-hover:text-zinc-500">
                {chain.b}
              </span>
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-white/5 conn-reveal">
          {[
            {
              label: "Multi-Protocol",
              val: "L1, L2, and Fiat rails",
              icon: Link2,
            },
            {
              label: "Non-Custodial",
              val: "You keep control",
              icon: Zap,
            },
            {
              label: "Secure Settlement",
              val: "Atomic path payments",
              icon: Lock,
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 sm:gap-3">
              <item.icon size={16} className="text-zinc-600" />
              <div className="font-mono text-[10px] sm:text-[11px] text-zinc-700 uppercase tracking-widest">
                {item.label}
              </div>
              <div className="font-display text-sm font-bold text-zinc-300">
                {item.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] aspect-square rounded-full bg-white/1 blur-[120px] pointer-events-none" />
    </section>
  );
}

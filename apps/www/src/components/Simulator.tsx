"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  RotateCcw,
  Zap,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { Button } from "./ui/button";

gsap.registerPlugin(MotionPathPlugin);

const ASSETS = [
  { id: "usdc-sol", label: "USDC (Solana)", color: "#14F195", icon: "S" },
  { id: "eth", label: "ETH (Ethereum)", color: "#627EEA", icon: "E" },
  { id: "usdc-base", label: "USDC (Base)", color: "#0052FF", icon: "B" },
];

const RAILS = [
  { id: "sepa", label: "EUR (SEPA)", type: "Fiat", color: "#FFD700" },
  { id: "ach", label: "USD (ACH)", type: "Fiat", color: "#54D1DB" },
  { id: "xlm", label: "XLM (Stellar)", type: "Crypto", color: "#FFFFFF" },
];

const STATUS_LABELS: Record<string, string> = {
  idle: "Ready to simulate",
  ingesting: "Receiving asset...",
  routing: "Finding best route...",
  settling: "Settling payment...",
  done: "Payment complete",
};

export function Simulator() {
  const [source, setSource] = useState(ASSETS[0]);
  const [dest, setDest] = useState(RAILS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [status, setStatus] = useState("idle");

  const containerRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setStatus("ingesting");

    const tl = gsap.timeline({
      onComplete: () => {
        setIsSimulating(false);
        setStatus("done");
      },
    });

    tl.set(packetRef.current, {
      opacity: 1,
      scale: 1,
      motionPath: {
        path: pathRef.current!,
        align: pathRef.current!,
        start: 0,
        end: 0,
      },
    });

    // Phase 1: Ingestion
    tl.to(packetRef.current, {
      motionPath: { path: pathRef.current!, start: 0, end: 0.33 },
      duration: 1,
      ease: "power2.inOut",
      onStart: () => setStatus("ingesting"),
    });

    // Phase 2: Routing
    tl.to(packetRef.current, {
      motionPath: { path: pathRef.current!, start: 0.33, end: 0.66 },
      duration: 0.8,
      scale: 1.5,
      ease: "none",
      onStart: () => setStatus("routing"),
      onComplete: () => {
        gsap.to(".core-node", {
          scale: 1.15,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
      },
    });

    // Phase 3: Settlement
    tl.to(packetRef.current, {
      motionPath: { path: pathRef.current!, start: 0.66, end: 1 },
      duration: 1,
      scale: 1,
      ease: "power2.inOut",
      onStart: () => setStatus("settling"),
    });

    tl.to(packetRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo(
          ".success-badge",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }
        );
      },
    });
  };

  const resetSimulator = () => {
    setIsSimulating(false);
    setStatus("idle");
    gsap.set(".success-badge", { opacity: 0, scale: 0.5 });
    gsap.set(packetRef.current, { opacity: 0 });
  };

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-32 bg-black relative border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/2">
              <Cpu size={12} className="text-zinc-500" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500">
                Interactive Demo
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              See it in{" "}
              <span className="text-zinc-700 italic font-light">action.</span>
            </h2>
            <p className="font-sans font-light text-base sm:text-lg text-zinc-500 max-w-lg mx-auto">
              Pick a source and destination, then watch a payment flow through
              the system in real time.
            </p>
          </div>

          {/* Simulator */}
          <div className="bg-[#080808] border border-white/5 rounded-2xl sm:rounded-3xl lg:rounded-[40px] p-6 sm:p-8 lg:p-12 shadow-2xl relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Source */}
              <div className="space-y-4 sm:space-y-6">
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] text-zinc-600">
                  Pay with
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {ASSETS.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => !isSimulating && setSource(asset)}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300",
                        source.id === asset.id
                          ? "bg-white/5 border-white/20 text-white"
                          : "border-transparent text-zinc-600 hover:text-zinc-400"
                      )}
                    >
                      <span className="font-display text-sm font-bold">
                        {asset.label}
                      </span>
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: asset.color,
                          boxShadow: `0 0 10px ${asset.color}`,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Center visualization */}
              <div className="relative h-52 sm:h-64 md:h-80 flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 400 300"
                >
                  <path
                    ref={pathRef}
                    d="M 50 150 C 150 150, 150 150, 200 150 S 250 150, 350 150"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    fill="none"
                    className="opacity-10"
                  />
                </svg>

                {/* Packet */}
                <div
                  ref={packetRef}
                  className="absolute w-4 h-4 rounded-full blur-[2px] opacity-0 z-20"
                  style={{
                    backgroundColor: source.color,
                    boxShadow: `0 0 20px ${source.color}, 0 0 40px ${source.color}`,
                  }}
                />

                {/* Core node */}
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "core-node w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 flex items-center justify-center bg-black transition-all duration-700",
                      isSimulating &&
                        "border-white/30 scale-110 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                    )}
                  >
                    <div
                      className={cn(
                        "w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/5 flex items-center justify-center bg-white/2",
                        isSimulating && "animate-pulse"
                      )}
                    >
                      <Image
                        src="/logo.svg"
                        alt="Useroutr"
                        width={32}
                        height={32}
                        className="opacity-40 w-6 sm:w-8"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-xs sm:text-sm font-semibold text-zinc-400">
                      {STATUS_LABELS[status]}
                    </div>
                  </div>
                </div>

                {/* Success badge */}
                <div className="success-badge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 scale-50 pointer-events-none">
                  <div className="bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md px-5 sm:px-6 py-2 rounded-full flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" size={16} />
                    <span className="font-display text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest whitespace-nowrap">
                      Complete
                    </span>
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-4 sm:space-y-6">
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] text-zinc-600">
                  Settle as
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {RAILS.map((rail) => (
                    <button
                      key={rail.id}
                      onClick={() => !isSimulating && setDest(rail)}
                      className={cn(
                        "w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300",
                        dest.id === rail.id
                          ? "bg-white/5 border-white/20 text-white"
                          : "border-transparent text-zinc-600 hover:text-zinc-400"
                      )}
                    >
                      <span className="font-display text-sm font-bold">
                        {rail.label}
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase text-zinc-700 bg-white/2 px-2 py-0.5 rounded">
                        {rail.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex gap-8 sm:gap-10">
                <div className="space-y-1">
                  <div className="font-mono text-[10px] sm:text-[11px] text-zinc-700 uppercase tracking-widest">
                    Est. Time
                  </div>
                  <div className="font-display text-base sm:text-lg font-bold text-white">
                    ~5.2s
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] sm:text-[11px] text-zinc-700 uppercase tracking-widest">
                    Fee
                  </div>
                  <div className="font-display text-base sm:text-lg font-bold text-white">
                    0.35%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] sm:text-[11px] text-zinc-700 uppercase tracking-widest">
                    Network
                  </div>
                  <div className="font-display text-base sm:text-lg font-bold text-white">
                    Stellar
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {!isSimulating && status === "done" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-12 h-12 sm:w-14 sm:h-14 text-zinc-600 hover:text-white"
                    onClick={resetSimulator}
                  >
                    <RotateCcw size={18} />
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="primary"
                  className="rounded-full px-8 sm:px-12 h-14 sm:h-16 group flex-1 sm:flex-none"
                  onClick={startSimulation}
                  disabled={isSimulating}
                >
                  {isSimulating
                    ? "Processing..."
                    : status === "done"
                      ? "Run Again"
                      : "Start Transfer"}
                  {!isSimulating && <ArrowRight size={18} className="ml-2" />}
                  {isSimulating && (
                    <Zap size={18} className="ml-2 animate-pulse" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

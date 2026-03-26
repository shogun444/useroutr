"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Terminal,
  Activity,
  Globe,
  ShieldCheck,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

const INITIAL_LOGS = [
  { id: 1, type: "SYSTEM", msg: "Engine initialized — all services healthy", time: "09:40:12" },
  { id: 2, type: "NETWORK", msg: "Connected to 174 settlement nodes", time: "09:40:13" },
  { id: 3, type: "INFO", msg: "Liquidity bridges active (USDC, SOL, ETH)", time: "09:40:15" },
];

const LOG_TYPES = ["GATEWAY", "PAYOUT", "SETTLE", "BRIDGE"];
const NETWORKS = ["Ethereum", "Polygon", "Base", "Stellar", "Solana"];
const ACTIONS = ["Payment received", "Payout sent", "Settlement confirmed", "Bridge completed"];

export function TerminalPreview() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [activeNodes, setActiveNodes] = useState(1420);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const mapDots = useMemo(() => {
    return [...Array(40)].map(() => ({
      cx: 50 + Math.random() * 300,
      cy: 40 + Math.random() * 120,
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const type = LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)];
      const network = NETWORKS[Math.floor(Math.random() * NETWORKS.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const id = Date.now();
      const time = new Date().toLocaleTimeString("en-GB", { hour12: false });

      const newLog = {
        id,
        type,
        msg: `${action} [${network} → Stellar]`,
        time,
      };

      setLogs((prev) => [...prev.slice(-14), newLog]);
      setActiveNodes((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      gsap.from(".terminal-window", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.to(".map-dot", {
        scale: 1.5,
        opacity: 0.5,
        duration: 1,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 bg-black relative border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/2">
            <Terminal size={12} className="text-zinc-500" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500">
              Live Dashboard
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Real-time{" "}
            <span className="text-zinc-700 italic font-light">
              visibility.
            </span>
          </h2>
          <p className="font-sans font-light text-base sm:text-lg text-zinc-500 max-w-lg">
            Monitor every transaction, payout, and settlement as it happens
            across your entire payment network.
          </p>
        </div>

        {/* Terminal */}
        <div className="terminal-window max-w-6xl mx-auto bg-[#080808] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] relative">
          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] z-20 opacity-15" />

          {/* Header */}
          <div className="bg-white/5 border-b border-white/5 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Activity
                  size={10}
                  className="animate-pulse text-emerald-400"
                />
                <span className="hidden sm:inline">
                  Useroutr Dashboard — Live
                </span>
                <span className="sm:hidden">Live</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-zinc-600">
              <Minimize2 size={12} />
              <Maximize2 size={12} />
              <X size={12} />
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 h-[400px] sm:h-[450px] lg:h-[500px]">
            {/* Left: Stats + Logs */}
            <div className="lg:col-span-5 xl:col-span-5 border-r border-white/5 flex flex-col">
              <div className="grid grid-cols-2 gap-px bg-white/5">
                {[
                  { l: "Status", v: "Operational", c: "text-emerald-400" },
                  {
                    l: "Active Nodes",
                    v: activeNodes.toLocaleString(),
                    c: "text-white",
                  },
                  { l: "Latency", v: "14ms", c: "text-zinc-300" },
                  { l: "Health", v: "Optimal", c: "text-emerald-400" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#080808] p-3 sm:p-4 space-y-1"
                  >
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-600">
                      {stat.l}
                    </div>
                    <div
                      className={cn(
                        "font-display text-xs sm:text-sm font-bold",
                        stat.c
                      )}
                    >
                      {stat.v}
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={logContainerRef}
                className="flex-1 p-4 sm:p-6 font-mono text-[10px] sm:text-[11px] space-y-1.5 sm:space-y-2 overflow-y-auto scrollbar-hide"
              >
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex gap-3 sm:gap-4 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <span className="text-zinc-700 shrink-0">
                      [{log.time}]
                    </span>
                    <span
                      className={cn(
                        "font-bold shrink-0",
                        log.type === "SYSTEM"
                          ? "text-blue-400"
                          : log.type === "INFO"
                            ? "text-zinc-400"
                            : "text-zinc-200"
                      )}
                    >
                      {log.type}:
                    </span>
                    <span className="text-zinc-500 truncate">{log.msg}</span>
                  </div>
                ))}
                <div className="flex gap-2 items-center text-zinc-300 pt-1">
                  <span className="animate-pulse inline-block w-1.5 h-3 bg-zinc-500" />
                  <span className="text-[10px] text-zinc-700 uppercase tracking-widest">
                    Listening...
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="hidden lg:col-span-7 bg-[#050505] lg:flex flex-col relative group">
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30 space-y-1">
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-700">
                  Global Network
                </div>
                <div className="font-display text-xs font-bold text-zinc-500">
                  Settlement Nodes
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-8 sm:p-12 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <svg
                  className="w-full h-full max-w-md"
                  viewBox="0 0 400 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {mapDots.map((dot, i) => (
                    <circle
                      key={i}
                      className="map-dot text-zinc-800"
                      cx={dot.cx}
                      cy={dot.cy}
                      r="1.5"
                      fill="currentColor"
                    />
                  ))}
                  <path
                    d="M 100,80 Q 200,40 300,100"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 80,120 Q 150,150 250,90"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="100"
                    cy="80"
                    r="2"
                    fill="white"
                    className="animate-pulse"
                  />
                  <circle
                    cx="300"
                    cy="100"
                    r="2"
                    fill="white"
                    className="animate-pulse"
                  />
                  <circle
                    cx="200"
                    cy="140"
                    r="2"
                    fill="white"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-600">
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features below terminal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mt-14 sm:mt-16 lg:mt-20 max-w-5xl mx-auto">
          {[
            {
              t: "Full Visibility",
              d: "Track every payment from initiation to settlement in real time.",
              i: Activity,
            },
            {
              t: "Team Controls",
              d: "Role-based access and multi-signature approval workflows.",
              i: ShieldCheck,
            },
            {
              t: "Global Reach",
              d: "Expand to new markets instantly with 174 country coverage.",
              i: Globe,
            },
          ].map((f, i) => (
            <div key={i} className="space-y-3 sm:space-y-4 group">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-white transition-colors">
                <f.i size={18} />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-zinc-200">
                {f.t}
              </h4>
              <p className="font-sans font-light text-sm text-zinc-500 leading-relaxed">
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-zinc-900/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}

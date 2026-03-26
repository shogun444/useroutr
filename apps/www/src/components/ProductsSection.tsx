"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  CreditCard,
  Globe,
  FileText,
  RefreshCw,
  Link2,
  CheckCircle2,
  ArrowRightLeft,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-item", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(".bento-item");
      items.forEach((item) => {
        const onMouseMove = (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 12;
          const rotateY = (centerX - x) / 12;

          gsap.to(item, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onMouseLeave = () => {
          gsap.to(item, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        item.addEventListener("mousemove", onMouseMove);
        item.addEventListener("mouseleave", onMouseLeave);
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="products"
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-32 bg-black relative overflow-hidden border-t border-white/5"
    >
      <div className="container px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-auto relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 sm:mb-6 tracking-tight">
            Everything you need <br className="hidden sm:block" />
            <span className="text-zinc-600 italic font-light">to move money globally.</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 font-sans max-w-xl">
            Five products. One unified API. Accept payments, send payouts, and
            bridge currencies — all through a single integration.
          </p>
        </div>

        <div ref={gridRef}>
          <BentoGrid className="mx-auto md:auto-rows-[20rem]">
            {products.map((item, i) => (
              <div key={i} className={cn("group/tile relative", item.span)}>
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={cn("bento-item transition-none [&>p:text-lg] h-full")}
                  icon={item.icon}
                />
                {item.slug && (
                  <Link
                    href={`/products/${item.slug}`}
                    className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] rounded-xl"
                  >
                    <div className="bg-white text-black px-6 py-2 rounded-full font-display font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover/tile:translate-y-0 transition-transform">
                      Learn More
                      <ArrowUpRight size={16} />
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

const SkeletonCheckout = () => {
  const iconRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(iconRef.current, {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    },
    { scope: iconRef }
  );

  return (
    <div className="flex flex-1 w-full h-full min-h-24 flex-col space-y-2 justify-center items-center">
      <div
        ref={iconRef}
        className="flex flex-row rounded-2xl border border-white/10 p-4 items-center space-x-4 bg-black/50 backdrop-blur-sm shadow-2xl"
      >
        <div className="h-10 w-10 rounded-full bg-blue/20 flex items-center justify-center">
          <CreditCard className="text-blue h-6 w-6" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-24 bg-white/10 rounded-full" />
          <div className="h-2 w-16 bg-white/5 rounded-full" />
        </div>
        <div className="ml-4">
          <CheckCircle2 className="text-green h-6 w-6 animate-pulse" />
        </div>
      </div>
      <div className="flex space-x-2 opacity-50">
        <div className="h-8 w-12 rounded bg-white/5" />
        <div className="h-8 w-12 rounded bg-white/5" />
        <div className="h-8 w-12 rounded bg-white/5" />
      </div>
    </div>
  );
};

const SkeletonPayouts = () => {
  const globeRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(globeRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: globeRef }
  );

  return (
    <div className="flex flex-1 w-full h-full min-h-24 relative items-center justify-center overflow-hidden">
      <div ref={globeRef}>
        <Globe className="h-24 w-24 text-teal/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "absolute h-2 w-2 rounded-full",
              i === 1
                ? "bg-teal shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                : "bg-blue shadow-[0_0_10px_rgba(59,130,246,0.5)] opacity-50"
            )}
            style={{
              animation: `pulse ${2 + i}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const SkeletonInvoicing = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 flex-col p-4 space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-10 rounded-lg border border-white/5 bg-white/2 flex items-center px-4 justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="h-2 w-12 bg-white/10 rounded-full" />
          </div>
          <div className="h-2 w-16 bg-amber/30 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
};

const SkeletonRamps = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 items-center justify-center p-4">
      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-blue2/10">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <span className="text-[11px] text-white/40 uppercase font-mono">Fiat</span>
        </div>
        <ArrowRightLeft className="text-blue2 h-6 w-6" />
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-blue/10">
            <div className="h-6 w-6 rounded-full border-2 border-blue border-t-transparent animate-spin" />
          </div>
          <span className="text-[11px] text-white/40 uppercase font-mono">Crypto</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonLinks = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 items-center justify-center p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
          <Link2 className="h-7 w-7 text-zinc-500" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="h-2 w-24 bg-white/10 rounded-full" />
          <div className="h-2 w-16 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const products = [
  {
    title: "Gateway",
    slug: "gateway",
    description:
      "Accept credit cards, bank transfers, and 20+ crypto assets in a single checkout session. One integration, every payment method.",
    header: <SkeletonCheckout />,
    icon: <CreditCard className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Payouts",
    slug: "payouts",
    description:
      "Send money to bank accounts and mobile wallets in 174 countries. Automatic currency conversion with real-time tracking.",
    header: <SkeletonPayouts />,
    icon: <Globe className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Invoicing",
    slug: "invoicing",
    description:
      "Create and send professional invoices that accept fiat and crypto. Automatic reconciliation when payments arrive.",
    header: <SkeletonInvoicing />,
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "On/Off Ramp",
    description:
      "Convert between fiat and crypto seamlessly. Connected to licensed partners across 174 countries for instant liquidity.",
    header: <SkeletonRamps />,
    icon: <RefreshCw className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Payment Links",
    description:
      "Create shareable payment links in seconds — no code required. Share via URL, QR code, or embed anywhere.",
    header: <SkeletonLinks />,
    icon: <Link2 className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-2 lg:col-span-1",
  },
];

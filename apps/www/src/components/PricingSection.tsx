"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { Zap, ShieldCheck, Building2, Lock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface PricingSectionProps {
  onWaitlistClick: () => void;
}

const pricingTiers = [
  {
    name: "Starter",
    price: "0.5%",
    desc: "Pay as you go. No monthly fees, no minimums.",
    features: [
      "All payment methods",
      "9 supported chains",
      "Payment links & invoicing",
      "Community support",
    ],
    cta: "Get Started Free",
    icon: Zap,
    popular: false,
  },
  {
    name: "Growth",
    price: "0.35%",
    desc: "For businesses processing over $50k/month.",
    features: [
      "Everything in Starter",
      "Payouts to 174 countries",
      "Fiat on/off ramp",
      "Priority support",
    ],
    cta: "Join the Waitlist",
    icon: ShieldCheck,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Dedicated infrastructure for high-volume operations.",
    features: [
      "Everything in Growth",
      "White-label checkout",
      "Dedicated Stellar node",
      "Slack channel + account manager",
    ],
    cta: "Talk to Sales",
    icon: Building2,
    popular: false,
  },
];

export function PricingSection({ onWaitlistClick }: PricingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(".pricing-card", {
        opacity: 0,
        y: 50,
        scale: 0.96,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".pricing-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.from(".pricing-feature", {
        opacity: 0,
        x: -8,
        duration: 0.5,
        stagger: 0.04,
        scrollTrigger: {
          trigger: tiersRef.current,
          start: "top 80%",
        },
      });

      // Magnetic CTAs
      const ctas = gsap.utils.toArray<HTMLElement>(".pricing-cta");
      ctas.forEach((cta) => {
        const onMove = (e: MouseEvent) => {
          const rect = cta.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(cta, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(cta, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        };
        cta.addEventListener("mousemove", onMove);
        cta.addEventListener("mouseleave", onLeave);
      });

      // Subtle 3D tilt
      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      cards.forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.5,
            ease: "back.out(1.7)",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
          });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      id="pricing"
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-40 bg-black overflow-hidden border-t border-white/5"
      style={{ perspective: "1000px" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-12 sm:mb-16 lg:mb-24 max-w-2xl">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-600">
              Pricing
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none text-white">
            Simple, transparent <br className="hidden sm:block" />
            <span className="text-zinc-700 italic font-light">
              pricing.
            </span>
          </h2>
        </div>

        <div
          ref={tiersRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "pricing-card relative flex flex-col p-7 sm:p-8 lg:p-10 border rounded-2xl sm:rounded-3xl transition-colors duration-700",
                tier.popular
                  ? "bg-white/3 border-white/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
                  : "bg-[#050505] border-white/5"
              )}
            >
              <div className="mb-8 sm:mb-10 flex justify-between items-start">
                <div
                  className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border transition-all duration-500",
                    tier.popular
                      ? "bg-white border-white text-black"
                      : "bg-white/5 border-white/10 text-zinc-500"
                  )}
                >
                  <tier.icon size={22} />
                </div>
                {tier.popular && (
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-white text-black font-bold">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mb-8 sm:mb-10">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="font-sans text-sm text-zinc-500 font-light leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="mb-8 sm:mb-10 flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tighter">
                  {tier.price}
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-zinc-600 uppercase tracking-widest">
                  / transaction
                </span>
              </div>

              <div className="flex-1 space-y-6 sm:space-y-8 mb-10 sm:mb-12">
                <div className="font-mono text-[11px] sm:text-xs text-zinc-700 uppercase tracking-widest border-b border-white/5 pb-3 sm:pb-4">
                  What&apos;s included
                </div>
                <ul className="space-y-3 sm:space-y-4">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="pricing-feature flex items-center gap-3 sm:gap-4 font-sans text-sm text-zinc-500 font-light group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover/item:bg-white transition-colors" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={tier.popular ? "primary" : "secondary"}
                className="pricing-cta w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-xs sm:text-sm uppercase tracking-wider group/btn"
                onClick={onWaitlistClick}
              >
                {tier.cta}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-8 sm:pt-12 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="space-y-1">
            <div className="font-mono text-[11px] sm:text-xs text-zinc-700 uppercase tracking-widest">
              No hidden fees
            </div>
            <div className="font-display text-base sm:text-lg font-bold text-white">
              0% merchant markup
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[11px] sm:text-xs text-zinc-700 uppercase tracking-widest">
              Settlement network
            </div>
            <div className="font-display text-base sm:text-lg font-bold text-white">
              Stellar native anchors
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-zinc-700 sm:justify-end">
            <Lock size={16} />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest">
              AES-256-GCM / TLS 1.3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

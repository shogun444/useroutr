"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react";
import { X, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/button";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (open) {
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      tl.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.2"
      );
      tl.from(
        ".modal-item",
        {
          opacity: 0,
          y: 10,
          stagger: 0.08,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          ref={overlayRef}
          className="fixed inset-0 z-2000 bg-black/60 backdrop-blur-sm"
        />
        <Dialog.Popup
          ref={contentRef}
          className="fixed left-1/2 top-1/2 z-2001 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 outline-none p-4 sm:p-1"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -inset-px bg-linear-to-b from-white/5 to-transparent rounded-[inherit] -z-10" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8 sm:mb-10">
              <div className="flex items-center gap-3 modal-item">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <ShieldCheck size={20} className="text-zinc-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                    Get Early Access
                  </h2>
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-600">
                    Limited spots available
                  </p>
                </div>
              </div>
              <Dialog.Close className="modal-item p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-600 hover:text-white">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form */}
            <form
              className="space-y-5 sm:space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="modal-item space-y-2">
                <label className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500 block px-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full h-12 sm:h-14 bg-white/2 border border-white/5 rounded-xl sm:rounded-2xl pl-12 pr-6 font-display text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/20 transition-all focus:bg-white/5 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="modal-item space-y-2">
                <label className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500 block px-1">
                  What are you building?
                </label>
                <select className="w-full h-12 sm:h-14 bg-white/2 border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 font-display text-white focus:outline-none focus:border-white/20 transition-all focus:bg-white/5 appearance-none cursor-pointer text-sm sm:text-base">
                  <option className="bg-zinc-950">
                    E-commerce / Marketplace
                  </option>
                  <option className="bg-zinc-950">
                    Cross-border Payments
                  </option>
                  <option className="bg-zinc-950">Fintech Application</option>
                  <option className="bg-zinc-950">DeFi / Web3 Product</option>
                  <option className="bg-zinc-950">Other</option>
                </select>
              </div>

              <div className="modal-item pt-2 sm:pt-4">
                <Button
                  variant="primary"
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base group"
                  onClick={() => onOpenChange(false)}
                >
                  Request Access
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
                <p className="text-center font-mono text-[10px] sm:text-[11px] text-zinc-700 mt-3 sm:mt-4 uppercase tracking-wider">
                  By requesting access, you agree to our{" "}
                  <span className="text-zinc-500 underline cursor-pointer">
                    Terms of Service
                  </span>
                </p>
              </div>
            </form>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

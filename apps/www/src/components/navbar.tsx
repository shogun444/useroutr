"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "https://thirtn.mintlify.app/" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useGSAP(() => {
    if (!navRef.current || !bgRef.current) return;

    gsap.set(bgRef.current, { opacity: 0 });
    ScrollTrigger.create({
      start: "top top",
      end: "+=80",
      onUpdate: (self) => {
        gsap.to(bgRef.current, {
          opacity: self.progress,
          duration: 0.1,
          overwrite: "auto",
        });
      },
    });

    let lastY = 0;
    ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        const currentY = self.scroll();
        if (currentY > lastY && currentY > 80 && !isMobileMenuOpen) {
          gsap.to(navRef.current, {
            y: "-100%",
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
        } else {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        lastY = currentY;
      },
    });
  }, [isMobileMenuOpen]);

  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "expo.out",
      });
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "expo.in",
      });
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <section
      ref={navRef}
      className="fixed top-0 left-0 right-0 w-full z-10000 font-display"
    >
      {/* Glass effect */}
      <div className="backdrop-blur-[3px] rounded-[inherit] absolute inset-0 overflow-hidden" />
      {/* Glass tint */}
      <div
        ref={bgRef}
        className="rounded-[inherit] bg-[#0009] absolute inset-0 overflow-hidden"
      />

      <section className="relative z-10">
        <div className="flex items-center justify-between w-full max-w-7xl h-16 sm:h-20 mx-auto px-6 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href="/" className="relative z-20">
            <Image
              src="/logo.svg"
              alt="Useroutr"
              width={110}
              height={32}
              className="w-auto h-6 sm:h-7 md:h-8"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="h-4 w-px bg-white/10 mx-3" />

            <Button
              variant="primary"
              size="sm"
              className="rounded-full px-6 font-mono text-xs uppercase tracking-wider"
            >
              Get Access
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-3 relative z-20">
            <Button
              variant="primary"
              size="sm"
              className="rounded-full px-4 h-8 font-mono text-[10px] uppercase tracking-wider"
            >
              Access
            </Button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-10 bg-black/98 backdrop-blur-md translate-x-full md:hidden flex flex-col pt-28 px-8 sm:px-10"
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col gap-2">
          {[
            { label: "Products", href: "#products" },
            { label: "Infrastructure", href: "#infrastructure" },
            { label: "Pricing", href: "#pricing" },
            { label: "Documentation", href: "https://thirtn.mintlify.app/" },
            { label: "Company", href: "https://x.com/useroutr" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item font-display text-3xl sm:text-4xl font-bold text-white/40 hover:text-white transition-colors tracking-tight py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pb-10 mobile-nav-item">
          <div className="h-px w-full bg-white/5 mb-6" />
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              Legal
            </Link>
            <Link
              href="#"
              className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

import type { Metadata } from "next";
import "./globals.css";
import { Syne, Newsreader, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { StructuredData } from "@/components/StructuredData";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["300", "400"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Useroutr - Pay anything, Settle Everywhere.",
  description:
    "Useroutr unifies fiat and crypto payments into one API. Accept cards, bank transfers, and 20+ crypto assets — settle globally in seconds on Stellar.",
  keywords: [
    "Payment Infrastructure",
    "Crypto Payments",
    "Fiat Payments",
    "Cross-chain Payments",
    "Payment Gateway",
    "Stellar Blockchain",
    "Useroutr",
    "Payment API",
    "Useroutr Protocol",
  ],
  authors: [{ name: "Useroutr Labs" }],
  creator: "Useroutr Labs",
  publisher: "Useroutr Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://useroutr.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Useroutr — Pay anything. Settle everywhere.",
    description:
      "One API for fiat and crypto payments. Accept any currency, settle globally in seconds.",
    url: "https://useroutr.io",
    siteName: "Useroutr",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Useroutr - Unified Payment Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Useroutr — Pay anything. Settle everywhere.",
    description:
      "One API for fiat and crypto payments. Accept any currency, settle globally in seconds.",
    creator: "@useroutr",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark selection:bg-blue/30 selection:text-white",
        syne.variable,
        newsreader.variable,
        jetbrains.variable,
      )}
    >
      <body className="antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

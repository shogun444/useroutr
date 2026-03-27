import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";

// Use system fonts as fallback to avoid Google Fonts timeout
const fontVariables = "";

export const metadata: Metadata = {
  title: {
    default: "Tavvio Dashboard",
    template: "%s | Tavvio Dashboard",
  },
  description: "Manage your payments, invoices, and analytics with Tavvio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariables}>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

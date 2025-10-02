import React from "react";
import "./globals.css";
import "./theme.css";
import { Inter } from "next/font/google";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbsGate from "@/components/BreadcrumbsGate";

export const metadata = {
  title: { default: "BlueNord", template: "BlueNord — %s" },
  description: "Focused North Sea operator. Investor information, reports and assets.",
  metadataBase: new URL("https://bluenord-clean.vercel.app"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "BlueNord",
    description: "Focused North Sea operator. Investor information, reports and assets.",
    url: "https://bluenord-clean.vercel.app",
    siteName: "BlueNord",
    images: [{ url: "/images/hero-offshore.png", width: 1200, height: 630, alt: "BlueNord" }],
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueNord",
    description: "Focused North Sea operator. Investor information, reports and assets.",
    images: ["/images/hero-offshore.png"]
  }
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900`}>
        <TopNav />
        <div className="container mx-auto max-w-5xl px-4 pt-3">
          <BreadcrumbsGate />
        </div>
        <main id="main" className="container mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

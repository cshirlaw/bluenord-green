"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "@/components/MobileNav";

const nav = [
  { href: "/company", label: "Company" },
  { href: "/assets", label: "Assets" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      role="banner"
      className={[
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" aria-label="BlueNord Home" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">BlueNord</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "text-sm transition-colors",
                  "focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black/40",
                  active ? "font-semibold text-black" : "text-black/60 hover:text-black/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/investors#reports"
            className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          >
            Reports
          </Link>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        >
          Menu
          <span className="sr-only">{mobileOpen ? "Close" : "Open"} navigation</span>
        </button>
      </div>

      <div id="mobile-nav">
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} items={nav} />
      </div>
    </header>
  );
}

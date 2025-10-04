// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavItem = { href: string; label: string };

export default function TopNav() {
  const pathname = usePathname();

  const nav: NavItem[] = useMemo(
    () => [
      { href: "/renewables", label: "Renewables 2025" }, // first
      { href: "/investors", label: "Investors" },
      { href: "/financials", label: "Financials" },
      { href: "/assets/tyra", label: "Assets" },
    ],
    []
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b bg-white">
      {/* Mobile: stack; Desktop: align horizontally */}
      <div className="mx-auto max-w-6xl px-4 py-2 md:flex md:h-12 md:items-center md:justify-between md:py-0">
        {/* Row 1: Brand/home */}
        <div className="text-sm font-semibold">HomeGreen</div>

        {/* Row 2: Scrollable pill nav on mobile, inline on desktop */}
        <nav
          className="
            mt-2 flex gap-2 overflow-x-auto whitespace-nowrap md:mt-0 md:gap-4
            -mx-4 px-4 md:mx-0 md:px-0
          "
          style={{
            scrollbarWidth: "none",        // Firefox
            msOverflowStyle: "none",       // IE/Edge
          }}
        >
          {/* Hide webkit scrollbar */}
          <style jsx>{`
            nav::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "inline-flex shrink-0 items-center rounded-md px-3 py-1.5 text-sm transition",
                isActive(item.href)
                  ? "bg-green-600 text-white"
                  : "text-neutral-700 hover:bg-neutral-100",
              ].join(" ")}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
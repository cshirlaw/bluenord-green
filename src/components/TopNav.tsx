// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavItem = { href: string; label: string };

export default function TopNav() {
  const pathname = usePathname();

  // Minimal, mirrored set for Green
  const nav: NavItem[] = useMemo(
    () => [
      { href: "/renewables", label: "Renewables 2025" }, // ← now first
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
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-4">
        {/* Home label per Green convention */}
        <Link href="/" className="text-sm font-semibold">  {/* remove shrink-0 to allow wrap */}
          HomeGreen
        </Link>

         {/* allow wrap on small screens so nothing overflows */}
         <nav className="flex flex-wrap items-center gap-2 md:gap-4 min-w-0">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-md px-3 py-1.5 text-sm transition",
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
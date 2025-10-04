// src/components/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/renewables", label: "Renewables 2025" }, // first
  { href: "/investors", label: "Investors" },
  { href: "/financials", label: "Financials" },
  { href: "/assets/tyra", label: "Assets" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 md:h-12 md:py-0">
        {/* Brand / Home */}
        <Link href="/" className="text-sm font-semibold">
          HomeGreen
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex">
          {NAV.map((item) => (
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

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden hover:bg-neutral-100"
        >
          {/* Icon toggles */}
          <svg
            className={["h-5 w-5", open ? "hidden" : "block"].join(" ")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            className={["h-5 w-5", open ? "block" : "hidden"].join(" ")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={[
          "md:hidden overflow-hidden border-t",
          open ? "max-h-96" : "max-h-0",
          "transition-[max-height] duration-200 ease-out",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div className="flex flex-col gap-2 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-md px-3 py-2 text-sm",
                  isActive(item.href)
                    ? "bg-green-600 text-white"
                    : "text-neutral-700 hover:bg-neutral-100",
                ].join(" ")}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
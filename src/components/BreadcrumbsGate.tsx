// src/components/BreadcrumbsGate.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  "/": "HomeGreen",
  "/investors": "Investors",
  "/financials": "Financials",
  "/assets": "Assets",
  "/renewables": "Renewables 2025", // ← add/keep this
};

function humanise(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BreadcrumbsGate() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);

  // Build cumulative paths: ["/assets", "/assets/tyra", ...]
  const crumbs = ["/", ...parts.map((_, i) => `/${parts.slice(0, i + 1).join("/")}`)];

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-white">
      <ol className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-sm">
        {crumbs.map((href, i) => {
          const isLast = i === crumbs.length - 1;
          const label =
            LABELS[href] ??
            (href === "/" ? "HomeGreen" : humanise(href.split("/").pop() || ""));

          if (isLast) {
            return (
              <li key={href} className="text-neutral-500" aria-current="page">
                {label}
              </li>
            );
          }

          return (
            <li key={href} className="flex items-center gap-2">
              <Link href={href} className="text-green-600 hover:underline">
                {label}
              </Link>
              <span className="text-neutral-300">/</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
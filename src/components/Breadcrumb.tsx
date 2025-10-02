"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = { href?: string; label: string };

const LABELS: Record<string, string> = {
  company: "Company",
  assets: "Assets",
  investors: "Investors",
  contact: "Contact",
};

export default function Breadcrumbs({ trail }: { trail?: Crumb[] }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const autoTrail: Crumb[] = [
    { href: "/", label: "Home" },
    ...parts.map((seg, i) => {
      const href = "/" + parts.slice(0, i + 1).join("/");
      const label = LABELS[seg] || seg.replace(/-/g, " ");
      return { href: i < parts.length - 1 ? href : undefined, label };
    }),
  ];

  const crumbs = trail && trail.length ? trail : autoTrail;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-black underline underline-offset-4">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gray-500">{c.label}</span>
              )}
              {!isLast && <span className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

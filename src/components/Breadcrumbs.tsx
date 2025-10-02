"use client";

import React from "react";
import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ trail = [] as Crumb[] }: { trail?: Crumb[] }) {
  if (!trail.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-gray-600">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
              {c.href && !last ? (
                <Link href={c.href} className="hover:underline">{c.label}</Link>
              ) : (
                <span className="font-medium text-gray-900">{c.label}</span>
              )}
              {!last && <span className="opacity-60">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
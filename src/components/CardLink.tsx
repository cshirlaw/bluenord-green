import React from "react";
import Link from "next/link";

export default function CardLink({
  href,
  eyebrow,
  title,
  desc,
}: {
  href: string;
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-black/5 hover:shadow-md transition focus-visible:ring-2 focus-visible:ring-black/25"
    >
      <div className="text-[11px] uppercase tracking-[0.08em] text-gray-500">{eyebrow}</div>
      <div className="mt-1 text-[17px] font-medium">{title}</div>
      {desc ? <div className="mt-2 text-[13.5px] leading-relaxed text-gray-600">{desc}</div> : null}
      <div className="mt-3 text-sm text-gray-500 group-hover:text-gray-700">Learn more →</div>
    </Link>
  );
}

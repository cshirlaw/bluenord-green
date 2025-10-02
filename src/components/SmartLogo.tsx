"use client";

import Link from "next/link";

export default function SmartLogo({ className = "", height = 32 }: { className?: string; height?: number }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <img src="/images/nordblue-2-1.png" alt="BlueNord" height={height} style={{ height, width: "auto" }} />
      <span className="sr-only">BlueNord</span>
    </Link>
  );
}

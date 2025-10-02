"use client";

import React from "react";
import Link from "next/link";

type ChipProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  title?: string;
  "aria-pressed"?: boolean;
};

export default function Chip({
  active = false,
  children,
  onClick,
  href,
  className = "",
  title,
  ...rest
}: ChipProps) {
  const base = "inline-flex items-center rounded-full border px-3 py-1 text-sm transition";
  const styles = active ? "bg-black text-white border-black" : "bg-white text-gray-900 hover:bg-gray-50";

  if (href) {
    return (
      <Link href={href} title={title} className={`${base} no-underline ${styles} ${className}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} title={title} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BreadcrumbsGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Breadcrumbs />;
}

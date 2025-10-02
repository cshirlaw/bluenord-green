// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.VERCEL_ENV === "production";
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://bluenord-clean-94ar.vercel.app";

  // Don’t expose a sitemap on preview deployments
  if (!isProd) return [];

  const now = new Date();
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/assets", priority: 0.9 },
    { path: "/assets/tyra", priority: 0.8 },
    { path: "/assets/gorm", priority: 0.8 },
    { path: "/assets/dan", priority: 0.8 },
    { path: "/assets/halfdan", priority: 0.8 },
    { path: "/company", priority: 0.6 },
    { path: "/investors", priority: 0.6 },
    { path: "/contact", priority: 0.4 },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}

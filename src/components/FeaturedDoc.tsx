"use client";

import React from "react";

type Featured = { title: string; href: string; date?: string; blurb?: string };

export default function FeaturedDoc() {
  const [feat, setFeat] = React.useState<Featured | null>(null);

  React.useEffect(() => {
    fetch("/data/financials.json", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : null)
      .then((j) => setFeat(j?.featured || null))
      .catch(() => setFeat(null));
  }, []);

  if (!feat) {
    return <p className="opacity-70">No featured document yet.</p>;
  }

  return (
    <a href={feat.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border p-5 hover:shadow">
      <div className="text-sm opacity-70">{feat.date}</div>
      <div className="text-lg font-semibold leading-snug">{feat.title}</div>
      {feat.blurb ? <p className="opacity-80 text-sm mt-1">{feat.blurb}</p> : null}
      <div className="mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-sm">
        Open PDF
        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
          <path d="M7 5h8v8h-2V8.4l-8.3 8.3-1.4-1.4L11.6 7H7V5z" fill="currentColor" />
        </svg>
      </div>
    </a>
  );
}
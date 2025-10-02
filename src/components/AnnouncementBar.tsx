"use client";

import Link from "next/link";
import { useState } from "react";

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
        <p>
          Q3 Operations Update is live.{" "}
          <Link href="/investors#updates" className="underline">
            Read more
          </Link>
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => setHidden(true)}
          className="rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

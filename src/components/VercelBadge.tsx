import React from "react";

export default function VercelBadge() {
  const env = process.env.VERCEL_ENV ?? "local";
  const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null;
  const branch = process.env.VERCEL_GIT_COMMIT_REF ?? null;

  const label =
    env === "production" ? "Production" :
    env === "preview"    ? `Preview${branch ? ` (${branch})` : ""}` :
                           "Local dev";

  return (
    <div className="text-xs opacity-70">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )}
      {sha ? ` · ${sha}` : ""}
    </div>
  );
}

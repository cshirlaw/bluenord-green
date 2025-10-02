import Link from "next/link";

type FieldKey = "tyra" | "halfdan" | "dan" | "gorm";

const ORDER: FieldKey[] = ["tyra", "halfdan", "dan", "gorm"];
const META: Record<FieldKey, { name: string; href: string }> = {
  tyra: { name: "Tyra", href: "/assets/tyra" },
  halfdan: { name: "Halfdan", href: "/assets/halfdan" },
  dan: { name: "Dan", href: "/assets/dan" },
  gorm: { name: "Gorm", href: "/assets/gorm" },
};

function neighbors(current: FieldKey) {
  const i = ORDER.indexOf(current);
  const prev = ORDER[(i - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(i + 1) % ORDER.length];
  return { prev, next };
}

export default function FieldPager({ current }: { current: FieldKey }) {
  const { prev, next } = neighbors(current);
  return (
    <nav aria-label="Field navigation" className="border-t mt-8 pt-6">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between gap-4">
        <Link
          href={META[prev].href}
          className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path d="M12.5 5l-5 5 5 5" fill="currentColor" />
          </svg>
          <span>{META[prev].name}</span>
        </Link>

        <Link
          href="/assets"
          className="rounded-2xl border px-4 py-2 hover:shadow"
        >
          All assets
        </Link>

        <Link
          href={META[next].href}
          className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow"
        >
          <span>{META[next].name}</span>
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path d="M7.5 5l5 5-5 5" fill="currentColor" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

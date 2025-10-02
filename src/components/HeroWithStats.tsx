export default function HeroWithStats() {
  const stats = [
    { label: "Net production (boe/d)", value: "XX,XXX" },
    { label: "Unit OPEX (USD/boe)", value: "X.X" },
    { label: "Net debt / EBITDA", value: "X.X×" },
    { label: "HSE TRIR (LTM)", value: "X.XX" },
  ];

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <h1 className="text-3xl font-semibold md:text-4xl">Investor Centre</h1>
        <p className="mt-4 max-w-2xl text-black/70">
          Transparent reporting, disciplined capital allocation, and a focus on returns.
        </p>
      </div>

      <div className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 p-4">
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="mt-1 text-xs text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

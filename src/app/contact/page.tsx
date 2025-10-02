import HeroPrimary from "@/components/HeroPrimary";
import Section from "@/components/Section";
// Optional JSON wiring:
// import contactJson from "@/content/contact.json";

export const metadata = {
  title: "Contact | BlueNord",
  description: "General enquiries and investor relations contact information.",
};

export default function ContactPage() {
  // If using JSON:
  // const { offices, emails } = contactJson as {
  //   offices?: Array<{ name: string; address: string }>;
  //   emails?: Array<{ label: string; href: string }>;
  // };

  const offices = [
    { name: "Head Office", address: "Example Street 12\n0123 Oslo\nNorway" },
  ];
  const emails = [
    { label: "General enquiries", href: "mailto:info@example.com" },
    { label: "Investor relations", href: "mailto:ir@example.com" },
  ];

  return (
    <>
      <HeroPrimary />

      <Section title="Get in touch">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emails / quick links */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold tracking-tight text-brand">Email</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {emails.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className="underline hover:no-underline">{e.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Simple contact form (mailto fallback) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
            <h3 className="text-lg font-semibold tracking-tight text-brand">Send a message</h3>
            <form
              className="mt-4 grid grid-cols-1 gap-4"
              action="mailto:info@example.com"
              method="post"
              encType="text/plain"
            >
              <label className="text-sm">
                Name
                <input className="mt-1 w-full rounded-md border px-3 py-2" name="name" required />
              </label>
              <label className="text-sm">
                Email
                <input className="mt-1 w-full rounded-md border px-3 py-2" type="email" name="email" required />
              </label>
              <label className="text-sm">
                Message
                <textarea className="mt-1 w-full rounded-md border px-3 py-2 min-h-[120px]" name="message" required />
              </label>
              <button className="self-start rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90">
                Send
              </button>
            </form>
            {/* Later: we can swap this to a Next.js Server Action for real submissions */}
          </div>
        </div>
      </Section>

      <Section title="Offices">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((o) => (
            <div key={o.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight text-brand">{o.name}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{o.address}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

import { SectionHeader } from "@/components/section-header";

export default function SmartStopImpactPage() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Impact & business value"
          title="Why SmartStop AI is useful, credible, and scalable"
          description="The product combines public value with operator visibility and authority support without overcomplicating the demo."
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {[
            ["Passenger value", ["Less uncertainty at the stop", "Better boarding decisions", "Nearby stop guidance", "Useful even without installing a mobile app everywhere"]],
            ["Operator value", ["Stop-level analytics", "Demand hotspot visibility", "Route pressure insight", "Display network status"]],
            ["Authority value", ["Structured violation reporting", "Evidence-backed intervention support", "Corridor problem summaries", "Admin-only intelligence layer"]],
            ["Business value", ["B2G and B2B deployment story", "Scalable stop network", "Can grow corridor by corridor", "Strong startup pitch positioning"]],
          ].map(([title, bullets]) => (
            <div key={String(title)} className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {(bullets as string[]).map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-line bg-white/5 px-4 py-3">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

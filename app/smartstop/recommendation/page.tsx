import { SectionHeader } from "@/components/section-header";
import { getRecommendationBreakdown } from "@/lib/simulators";

export default function SmartStopRecommendationPage() {
  const items = getRecommendationBreakdown();
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Recommendation engine"
          title="Why the AI recommends one bus over another"
          description="The scoring model blends ETA, crowd level, delay risk, route suitability, and stop proximity."
        />

        <div className="grid gap-4 xl:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.routeCode} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-cyanSoft">Rank {index + 1}</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{item.routeCode}</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan">Score {item.totalScore}</div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["ETA score", item.etaScore],
                  ["Crowd score", item.crowdScore],
                  ["Delay risk", item.delayRisk],
                  ["Stop proximity", item.stopProximity],
                  ["Route suitability", item.routeSuitability],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>{label}</span>
                      <span className="text-white">{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-cyan" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-300">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

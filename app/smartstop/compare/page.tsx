import { SectionHeader } from "@/components/section-header";
import { getComparisonData } from "@/lib/simulators";

export default function SmartStopComparePage() {
  const data = getComparisonData();
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Stop comparison"
          title="Nearby stop tradeoffs made clear"
          description="This is one of the strongest judging screens because it shows why a location-aware system is more useful than a generic route checker."
        />

        <div className="space-y-6">
          {data.pairs.map((pair) => (
            <div key={pair.title} className="glass-card p-6">
              <h2 className="text-2xl font-semibold text-white">{pair.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{pair.recommendation}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {pair.options.map((option) => (
                  <div key={String(option.stopName)} className="rounded-3xl border border-line bg-white/5 p-5">
                    <div className="text-xl font-semibold text-white">{option.stopName}</div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <div>Walk time</div><div className="text-right text-white">{option.walkingMinutes} min</div>
                      <div>ETA</div><div className="text-right text-white">{option.etaMin} min</div>
                      <div>Expected crowd</div><div className="text-right text-white">{option.expectedLoadPct}%</div>
                      <div>Comfort score</div><div className="text-right text-cyan">{option.comfortScore}</div>
                      <div>Speed score</div><div className="text-right text-cyan">{option.speedScore}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

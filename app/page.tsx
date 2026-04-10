import Link from "next/link";
import { ArrowRight, Bike, BusFront, Gauge, Radar, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { ModuleCard } from "@/components/module-card";
import { MetricCard } from "@/components/metric-card";
import { DhakaLiveMap } from "@/components/maps/dhaka-live-map";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { BarChartCard } from "@/components/charts/bar-chart-card";

const metrics = [
  { label: "Monitored bus stops & stands", value: "17", icon: <Gauge className="h-5 w-5" /> },
  { label: "Pilot congestion improvement", value: "42%", icon: <Radar className="h-5 w-5" /> },
  { label: "High-risk alerts surfaced", value: "31", icon: <ShieldAlert className="h-5 w-5" /> },
  { label: "Avg intervention response", value: "4.2m", icon: <Sparkles className="h-5 w-5" /> },
];

const corridorRows = [
  ["Shahbagh corridor", "17 km/h", "Critical", "Demand spike + boarding pressure"],
  ["Farmgate junction", "11 km/h", "Watch", "Interchange congestion"],
  ["Uttara outbound", "44 km/h", "Clear", "Healthy movement"],
  ["Katabon link", "28 km/h", "Stable", "Balanced load"],
] as const;

const flowTrend = [
  { label: "7AM", value: 38 },
  { label: "8AM", value: 52 },
  { label: "9AM", value: 78 },
  { label: "10AM", value: 66 },
  { label: "11AM", value: 48 },
  { label: "Now", value: 58 },
];

const aiPressure = [
  { zone: "Shahbagh", pressure: 84 },
  { zone: "Farmgate", pressure: 91 },
  { zone: "Uttara", pressure: 41 },
  { zone: "Katabon", pressure: 49 },
];

export default function HomePage() {
  return (
    <>
      <section className="section-space border-b border-white/5">
        <div className="page-shell grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="glass-card relative min-h-[620px] overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,197,94,0.16),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(56,189,248,0.14),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="eyebrow">AI Traffic Intelligence — Dhaka Metropolitan</div>
                <h1 className="heading-xl max-w-3xl leading-[0.94]">
                  Dhaka <span className="block text-cyan">Moves</span>
                  <span className="block font-light text-slate-500">Smarter.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                  A premium software-first mobility platform that combines location-aware bus-stop guidance, rickshaw stand intelligence, real city mapping, prediction, and intervention support.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/smartstop" className="rounded-sm bg-cyan px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-black hover:bg-cyanSoft">
                    Explore SmartStop
                  </Link>
                  <Link href="/rickshawflow" className="rounded-sm border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 hover:border-white/30 hover:text-white">
                    Open RickshawFlow
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-cyanSoft"><TrendingUp className="h-4 w-4" /> AI is analysing</div>
                    <div className="mt-3 text-sm leading-7 text-slate-200">Live corridor pulse, stop-level crowd signals, ETA prediction, overload scoring, and intervention recommendations are rendered together.</div>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-cyanSoft">Investor-facing value</div>
                    <div className="mt-3 text-sm leading-7 text-slate-200">Public utility on one side, operator intelligence on another, and authority visibility in the control layer.</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-white">847+</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">Monitored corridors</div>
                </div>
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-white">1.2M</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">Daily urban movement</div>
                </div>
                <div>
                  <div className="text-4xl font-semibold tracking-tight text-white">34%</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">Congestion reduction</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <DhakaLiveMap
              focus="farmgate"
              title="Real Dhaka mobility map"
              subtitle="An interactive city map replaces the fake diagram. Focus zones, predicted pressure, and key stops now sit on a real Dhaka map layer."
              highlightRoutes={["M7 · Motijheel", "F2 · Farmgate", "7B · Shahbagh"]}
              compact
            />

            <div className="glass-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="eyebrow mb-0">Live corridor pulse</div>
                <span className="rounded-sm border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-greenSignal">Live</span>
              </div>
              <div className="space-y-3">
                {corridorRows.map(([label, speed, status, note]) => (
                  <div key={label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="mt-1 text-xs leading-6 text-slate-400">{note}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-slate-300">{speed}</div>
                      <div className="mt-1 rounded-sm border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-b border-white/5">
        <div className="page-shell grid gap-6 xl:grid-cols-2">
          <LineChartCard title="Predicted movement trend" data={flowTrend} dataKey="value" />
          <BarChartCard title="AI congestion pressure by zone" data={aiPressure} xKey="zone" yKey="pressure" color="#4ade80" />
        </div>
      </section>

      <section className="section-space border-b border-white/5">
        <div className="page-shell">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Platform modules</div>
              <h2 className="heading-lg">Two mobility systems.<br />One city intelligence layer.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              SmartStop focuses on public bus-stop decision support and passenger guidance. RickshawFlow focuses on stand overload, risk detection, virtual signals, and traffic control room visibility.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ModuleCard
              title="SmartStop AI"
              description="Location-aware smart bus stop displays, passenger guidance, nearby stop comparison, recommendation logic, operator insights, and admin enforcement intelligence."
              href="/smartstop"
              badge="Bus intelligence"
              icon={<BusFront className="h-6 w-6" />}
            />
            <ModuleCard
              title="RickshawFlow AI"
              description="CCTV-inspired stand monitoring, overload prediction, virtual green/yellow/red stand signals, and a separate AI control room for traffic authorities."
              href="/rickshawflow"
              badge="Stand intelligence"
              icon={<Bike className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell grid gap-4 lg:grid-cols-4">
          {[
            ["Public guidance", "Stop-specific boards, live city maps, and stand-facing signal output"],
            ["Passenger intelligence", "Location-aware recommendations and nearby stop choices"],
            ["Operator visibility", "Overload, delay, and corridor pressure analytics"],
            ["Authority action support", "Risk scoring, alerts, CCTV-inspired monitoring"],
          ].map(([title, text]) => (
            <div key={title} className="glass-card p-5">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
              <Link href={title === "Public guidance" ? "/smartstop" : title === "Operator visibility" ? "/smartstop/operator" : "/rickshawflow/control-room"} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-cyanSoft">
                Open view <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

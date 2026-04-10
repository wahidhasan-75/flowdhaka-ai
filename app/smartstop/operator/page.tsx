import { BarChartCard } from "@/components/charts/bar-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { getOperatorDashboard } from "@/lib/simulators";
import { Activity, AlertTriangle, Bus, CheckCircle2 } from "lucide-react";

export default function SmartStopOperatorPage() {
  const data = getOperatorDashboard();
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Operator dashboard"
          title="Stop-level and route-level system visibility"
          description="This view proves that SmartStop AI is useful beyond passengers. Operators can see overloaded stops, route pressure, and network status at a glance."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Active displays" value={data.summary.activeDisplays} icon={<CheckCircle2 className="h-5 w-5" />} />
          <MetricCard label="Overloaded stops" value={data.summary.overloadedStops} icon={<AlertTriangle className="h-5 w-5" />} accent="yellow" />
          <MetricCard label="Average delay" value={`${data.summary.avgDelay}m`} icon={<Activity className="h-5 w-5" />} />
          <MetricCard label="Recommendation accuracy" value={`${data.summary.recommendationAccuracy}%`} icon={<Bus className="h-5 w-5" />} accent="green" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <LineChartCard title="Demand by hour" data={data.hourlyDemand.map((row) => ({ label: row.hour, value: row.value }))} dataKey="value" />
          <BarChartCard title="Route pressure" data={data.routePressure} xKey="route" yKey="pressure" />
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {data.stops.map((stop) => (
            <div key={stop.stopName} className="glass-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{stop.stopName}</h3>
                  <p className="mt-1 text-sm text-slate-400">{stop.networkStatus}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-cyan">Risk {stop.overloadRisk}</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-line bg-white/5 p-4">
                  <div className="text-slate-400">Demand</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{stop.demandIndex}</div>
                </div>
                <div className="rounded-2xl border border-line bg-white/5 p-4">
                  <div className="text-slate-400">Overload risk</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{stop.overloadRisk}</div>
                </div>
                <div className="rounded-2xl border border-line bg-white/5 p-4">
                  <div className="text-slate-400">Avg delay</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{stop.avgDelayMin}m</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

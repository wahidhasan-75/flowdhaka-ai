import Link from "next/link";
import { Download, ShieldAlert } from "lucide-react";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { SectionHeader } from "@/components/section-header";
import { getAdminInsights } from "@/lib/simulators";

export default function SmartStopAdminPage() {
  const data = getAdminInsights();
  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Admin access only"
          title="Enforcement intelligence support layer"
          description="This page is intentionally separate from the public experience. It stores and summarizes illegal stopping patterns so admins can forward structured reports to traffic authorities."
          action={
            <Link href="/api/smartstop/admin/export" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan">
              <Download className="h-4 w-4" />
              Export report
            </Link>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.headlineStats.map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <div className="text-sm uppercase tracking-[0.24em] text-cyanSoft">{stat.label}</div>
              <div className="mt-3 text-2xl font-semibold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="glass-card overflow-hidden p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <ShieldAlert className="h-5 w-5 text-cyan" />
              Stored illegal stopping records
            </div>
            <div className="overflow-hidden rounded-3xl border border-line">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Corridor</th>
                    <th className="px-4 py-3 font-medium">Route</th>
                    <th className="px-4 py-3 font-medium">Violation</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Repeats</th>
                  </tr>
                </thead>
                <tbody>
                  {data.events.map((event) => (
                    <tr key={event.id} className="border-t border-line/70 bg-slate-950/30 text-slate-200">
                      <td className="px-4 py-4">{event.corridor}</td>
                      <td className="px-4 py-4 font-semibold text-white">{event.routeCode}</td>
                      <td className="px-4 py-4">{event.violationType}</td>
                      <td className="px-4 py-4">{event.timeLabel}</td>
                      <td className="px-4 py-4 text-cyan">{event.severity}</td>
                      <td className="px-4 py-4">{event.repeatCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BarChartCard title="Violation hotspots by corridor" data={data.corridorCounts} xKey="name" yKey="value" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Activity, AlertTriangle, Eye, Gauge, MoveRight, RefreshCcw, ShieldAlert } from "lucide-react";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { MetricCard } from "@/components/metric-card";
import { SectionHeader } from "@/components/section-header";
import { SignalLight } from "@/components/signal-light";
import { DhakaLiveMap } from "@/components/maps/dhaka-live-map";
import { usePollingJson } from "@/hooks/use-polling-json";
import { getRickshawControlRoom } from "@/lib/simulators";
import { RickshawStandSnapshot } from "@/lib/types";

const modes = [
  { id: "normal", label: "Normal" },
  { id: "peak", label: "Peak hour" },
  { id: "rain", label: "Rain pressure" },
  { id: "event", label: "Event rush" },
];

interface RoomResponse {
  mode: string;
  metrics: {
    activeStands: number;
    redRiskStands: number;
    spilloverReduced: number;
    avgInterventionTime: number;
    alertsToday: number;
  };
  stands: RickshawStandSnapshot[];
  alerts: Array<{ id: string; severity: string; standName: string; issueType: string; timestamp: string; recommendation: string }>;
  detections: Array<{ id: string; camera: string; label: string; confidence: number; zone: string }>;
  beforeAfter: { before: string[]; after: string[] };
}

export default function RickshawControlRoomPage() {
  const [mode, setMode] = useState("normal");
  const [selectedStandId, setSelectedStandId] = useState("rf-1");
  const [message, setMessage] = useState<string | null>(null);
  const initial = useMemo(() => getRickshawControlRoom("normal"), []);
  const { data } = usePollingJson<RoomResponse>(`/api/rickshawflow/control-room?mode=${mode}`, initial, 12000);

  const selectedStand = data.stands.find((stand) => stand.id === selectedStandId) || data.stands[0];

  const applyIntervention = async () => {
    const response = await fetch("/api/rickshawflow/apply-intervention", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ standId: selectedStand.id, mode }),
    });
    const json = await response.json();
    setMessage(json.message);
  };

  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="AI control room"
          title="CCTV-inspired stand intelligence and intervention support"
          description="This view is for traffic controllers, government operators, and stand supervisors. It shows the AI analysis, risk scoring, predictions, alerts, and recommended actions behind the public stand signal."
        />

        <div className="mb-8 flex flex-wrap gap-3">
          {modes.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${mode === item.id ? "bg-cyan text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"}`}
            >
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => setMessage(null)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-white/30 hover:text-white">
            <RefreshCcw className="h-4 w-4" /> Reset demo note
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Active stands" value={data.metrics.activeStands} icon={<Activity className="h-5 w-5" />} />
          <MetricCard label="Red-risk stands" value={data.metrics.redRiskStands} icon={<ShieldAlert className="h-5 w-5" />} accent="red" />
          <MetricCard label="Spillover reduced" value={`${data.metrics.spilloverReduced}%`} icon={<MoveRight className="h-5 w-5" />} accent="green" />
          <MetricCard label="Avg intervention time" value={`${data.metrics.avgInterventionTime}m`} icon={<Gauge className="h-5 w-5" />} />
          <MetricCard label="Alerts today" value={data.metrics.alertsToday} icon={<AlertTriangle className="h-5 w-5" />} accent="yellow" />
        </div>

        {message ? <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-greenSignal">{message}</div> : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <DhakaLiveMap
            mode="control-room"
            title="City stand pressure map"
            subtitle="Controllers can now inspect rickshaw stand risk on a real Dhaka map layer instead of a static mock panel. Red zones show the most urgent roadside pressure."
            highlightRoutes={["Farmgate · Critical", "New Market · Watch", "Mirpur 10 · Stable"]}
          />

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white">Real problem section</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Overcrowded Stand", "Too many rickshaws gather at one stand and push overflow into the road."],
                ["Road Spillover", "Stand activity eats into lane space and slows general traffic."],
                ["Unsafe Pickup Zone", "Passengers cluster in conflict areas near the carriageway."],
                ["Lane Occupation", "Waiting behavior narrows roadside mobility."],
                ["Accident Risk", "Unmanaged roadside stand pressure increases conflict and crash risk."],
              ].map(([title, text]) => (
                <div key={String(title)} className="rounded-3xl border border-line bg-white/5 p-4 text-sm leading-7 text-slate-300">
                  <div className="font-semibold text-white">{title}</div>
                  <div className="mt-2">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white">How the AI works</h2>
            <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              {[
                "CCTV monitors stand and roadside zone",
                "Object and zone detection estimate density and occupation",
                "AI calculates stand pressure and safety risk",
                "Prediction engine forecasts overload in the next few minutes",
                "Recommendation engine suggests redistribution or hold action",
                "Virtual stand signal updates to green / yellow / red",
                "Control room receives alert and action recommendation",
              ].map((step, index) => (
                <li key={step} className="rounded-3xl border border-line bg-white/5 px-4 py-3">
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan text-xs font-semibold text-slate-950">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white">Live stand dashboard</h2>
            <div className="mt-5 space-y-4">
              {data.stands.map((stand) => (
                <button
                  key={stand.id}
                  type="button"
                  onClick={() => setSelectedStandId(stand.id)}
                  className={`w-full rounded-3xl border p-5 text-left transition ${selectedStandId === stand.id ? "border-white/20 bg-white/5" : "border-line bg-white/5 hover:border-white/30"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-white">{stand.standName}</div>
                      <div className="mt-2 text-sm text-slate-400">{stand.issueSummary}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <SignalLight signal={stand.status} size="sm" />
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Risk score</div>
                        <div className="text-2xl font-semibold text-white">{stand.riskScore}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-5 text-sm text-slate-300">
                    <div>Rickshaws <span className="block text-white">{stand.rickshawCount}</span></div>
                    <div>Crowd <span className="block text-white">{stand.passengerCrowd}</span></div>
                    <div>Spillover <span className="block text-white">{stand.roadSpilloverPct}%</span></div>
                    <div>Forecast <span className="block text-white">{stand.overloadForecast}</span></div>
                    <div>Status <span className="block text-cyan">{stand.interventionStatus}</span></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Stand detail panel</h2>
                <p className="mt-2 text-sm text-slate-300">{selectedStand.standName}</p>
              </div>
              <button type="button" onClick={applyIntervention} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan">
                Apply intervention
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-white/5 p-4">
                <div className="text-sm text-slate-400">Recommended action</div>
                <div className="mt-2 text-base font-semibold text-white">{selectedStand.actionRecommendation}</div>
              </div>
              <div className="rounded-3xl border border-line bg-white/5 p-4">
                <div className="text-sm text-slate-400">Intervention status</div>
                <div className="mt-2 text-base font-semibold text-cyan">{selectedStand.interventionStatus}</div>
              </div>
            </div>

            <div className="mt-5">
              <LineChartCard title="Last 15-minute trend" data={selectedStand.trend.map((row) => ({ label: row.label, risk: row.risk }))} dataKey="risk" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white">CCTV detection preview</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {data.detections.map((detection) => (
                <div key={detection.id} className="rounded-3xl border border-line bg-slate-950/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm uppercase tracking-[0.24em] text-cyanSoft">{detection.camera}</div>
                    <Eye className="h-4 w-4 text-cyan" />
                  </div>
                  <div className="relative mt-4 h-40 overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="absolute left-5 top-6 h-16 w-24 rounded-xl border-2 border-cyan/80" />
                    <div className="absolute right-6 bottom-6 h-12 w-16 rounded-xl border-2 border-yellowSignal/80" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-white">{detection.zone}</div>
                  </div>
                  <div className="mt-4 text-base font-semibold text-white">{detection.label}</div>
                  <div className="mt-2 text-sm text-slate-300">Confidence {(detection.confidence * 100).toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <BarChartCard title="AI risk score by stand" data={data.stands.map((stand) => ({ name: stand.standName.split(" ")[0], value: stand.riskScore }))} xKey="name" yKey="value" />
            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold text-white">Control room alert feed</h2>
              <div className="mt-5 space-y-4">
                {data.alerts.map((alert) => (
                  <div key={alert.id} className="rounded-3xl border border-line bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-base font-semibold text-white">{alert.standName}</div>
                      <div className="rounded-full border border-yellowSignal/20 bg-yellowSignal/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-yellowSignal">{alert.severity}</div>
                    </div>
                    <div className="mt-2 text-sm text-slate-300">{alert.issueType} • {alert.timestamp}</div>
                    <div className="mt-3 text-sm text-cyan">{alert.recommendation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white">Before AI intervention</h2>
            <div className="mt-5 space-y-3">
              {data.beforeAfter.before.map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-white/5 px-4 py-3 text-sm text-slate-300">{item}</div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold text-white">After AI intervention</h2>
            <div className="mt-5 space-y-3">
              {data.beforeAfter.after.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-greenSignal">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

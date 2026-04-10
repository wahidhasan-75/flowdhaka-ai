"use client";

import { useState } from "react";
import { ArrowRightLeft, CloudRain, TimerReset, Users } from "lucide-react";
import { SignalLight } from "@/components/signal-light";
import { usePollingJson } from "@/hooks/use-polling-json";
import { RickshawStandDisplay } from "@/lib/types";
import { getRickshawStandDisplay } from "@/lib/simulators";

const modes = [
  { id: "normal", label: "Normal flow" },
  { id: "peak", label: "Peak hour" },
  { id: "rain", label: "Rain pressure" },
  { id: "event", label: "Event rush" },
];

export default function VirtualStandDisplayPage() {
  const [mode, setMode] = useState("normal");
  const initial = getRickshawStandDisplay("normal");
  const { data } = usePollingJson<RickshawStandDisplay>(`/api/rickshawflow/status?mode=${mode}`, initial, 9000);

  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="glass-card overflow-hidden p-8 md:p-12">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
            <div>
              <div className="eyebrow">Stand-facing signal interface</div>
              <h1 className="heading-lg text-4xl sm:text-5xl">{data.standName}</h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                This is the simple field output that rickshaw pullers or stand users would see. The signal is the hero, not dense analytics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-line bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-400"><Users className="h-4 w-4 text-cyan" /> Pressure level</div>
                  <div className="mt-3 text-2xl font-semibold text-white">{data.pressureLabel}</div>
                </div>
                <div className="rounded-3xl border border-line bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-400"><CloudRain className="h-4 w-4 text-cyan" /> Crowd level</div>
                  <div className="mt-3 text-2xl font-semibold text-white">{data.crowdLabel}</div>
                </div>
                <div className="rounded-3xl border border-line bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-400"><TimerReset className="h-4 w-4 text-cyan" /> Next update</div>
                  <div className="mt-3 text-2xl font-semibold text-white">{data.nextUpdate}</div>
                </div>
                <div className="rounded-3xl border border-line bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-400"><ArrowRightLeft className="h-4 w-4 text-cyan" /> Nearby redirect</div>
                  <div className="mt-3 text-lg font-semibold text-white">{data.nearbyAlternative}</div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-line bg-slate-950/60 p-8 text-center">
              <SignalLight signal={data.signal} size="lg" />
              <div className={`mt-6 text-4xl font-semibold ${data.signal === "green" ? "text-greenSignal" : data.signal === "yellow" ? "text-yellowSignal" : "text-redSignal"}`}>
                {data.signalLabel}
              </div>
              <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-slate-200">{data.instruction}</p>
              <div className="mx-auto mt-8 max-w-md rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                Overflow risk: <span className="font-semibold text-white">{data.overflowRisk}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

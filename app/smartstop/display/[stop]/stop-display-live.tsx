"use client";

import { useClock } from "@/hooks/use-clock";
import { usePollingJson } from "@/hooks/use-polling-json";
import { SmartStopDisplay } from "@/lib/types";

export function StopDisplayLive({ stop, initialData }: { stop: string; initialData: SmartStopDisplay }) {
  const time = useClock();
  const { data } = usePollingJson<SmartStopDisplay>(`/api/smartstop/display/${stop}`, initialData, 12000);

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[28px] border border-line bg-slate-950/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-cyanSoft">Current time</div>
            <div className="mt-2 text-3xl font-semibold text-white">{time}</div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan">Stop-bound board active</div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Bus</th>
                <th className="px-4 py-3 font-medium">Route</th>
                <th className="px-4 py-3 font-medium">ETA</th>
                <th className="px-4 py-3 font-medium">Expected Crowd</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {data.arrivals.map((arrival) => (
                <tr key={arrival.id} className="border-t border-line/70 bg-slate-950/30 text-slate-200">
                  <td className="px-4 py-4 font-semibold text-white">{arrival.routeCode}</td>
                  <td className="px-4 py-4">{arrival.routeName}</td>
                  <td className="px-4 py-4">{arrival.etaMin} min</td>
                  <td className="px-4 py-4">{arrival.expectedLoadPct}%</td>
                  <td className="px-4 py-4">{arrival.status}</td>
                  <td className="px-4 py-4 text-cyan">{arrival.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass-card p-5">
          <div className="text-sm uppercase tracking-[0.24em] text-cyanSoft">AI advice</div>
          <div className="mt-3 text-xl font-semibold text-white">{data.aiAdvice}</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-sm uppercase tracking-[0.24em] text-cyanSoft">Service alert</div>
          <div className="mt-3 text-base leading-7 text-slate-300">{data.serviceAlert}</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="glass-card p-5">
            <div className="text-sm text-slate-400">Stop demand</div>
            <div className="mt-2 text-3xl font-semibold text-white">High</div>
          </div>
          <div className="glass-card p-5">
            <div className="text-sm text-slate-400">Next refresh</div>
            <div className="mt-2 text-3xl font-semibold text-white">12s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

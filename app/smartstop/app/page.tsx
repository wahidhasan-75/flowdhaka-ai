"use client";

import { useMemo, useState } from "react";
import { LocateFixed, Navigation, Smartphone } from "lucide-react";
import { DhakaLiveMap } from "@/components/maps/dhaka-live-map";
import { SectionHeader } from "@/components/section-header";
import { passengerScenarios } from "@/lib/data";
import { usePollingJson } from "@/hooks/use-polling-json";
import { PassengerScenario } from "@/lib/types";

export default function SmartStopAppPage() {
  const [location, setLocation] = useState(passengerScenarios[0].locationId);
  const initialData = useMemo(() => passengerScenarios[0], []);
  const { data } = usePollingJson<PassengerScenario>(`/api/smartstop/passenger?location=${location}`, initialData, 12000);

  return (
    <section className="section-space">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Passenger app"
          title="Location-aware passenger guidance"
          description="This screen simulates the passenger app/web view. It now uses a map-first UI so the commuter can visually understand nearby stops, not just read a list."
        />

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="glass-card p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[8px] border border-white/10 bg-white/5 text-cyan">
              <Smartphone className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">Passenger context</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">Enable location, choose where the user is standing, and let the map and stop recommendation update automatically.</p>

            <div className="mt-6 space-y-3">
              <div className="rounded-[10px] border border-white/10 bg-white/5 p-4 text-greenSignal">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em]"><LocateFixed className="h-4 w-4" /> Location enabled</div>
                <p className="mt-2 text-sm text-slate-200">{data.userMessage}</p>
              </div>
              {passengerScenarios.map((scenario) => (
                <button
                  type="button"
                  key={scenario.locationId}
                  onClick={() => setLocation(scenario.locationId)}
                  className={`w-full rounded-[8px] px-4 py-3 text-left text-sm transition ${location === scenario.locationId ? "bg-cyan text-black" : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"}`}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
              <DhakaLiveMap
                focus={data.nearestStop.stopSlug as "shahbagh" | "farmgate" | "uttara" | "katabon"}
                location={location as "near-shahbagh" | "near-farmgate" | "near-katabon" | "near-motijheel"}
                title="Passenger-side live map"
                subtitle="The passenger app uses a real Dhaka map to show where the commuter is, the nearest stop, and a nearby alternative if comfort or crowd level makes that a better choice."
                highlightRoutes={data.nearbyStops.map((stop) => `${stop.bestRoute} · ${stop.stopName}`)}
                compact
              />

              <div className="rounded-[26px] border border-white/10 bg-black/40 p-5 shadow-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.26em] text-cyanSoft">Nearest stop</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{data.nearestStop.stopName}</div>
                  </div>
                  <Navigation className="h-6 w-6 text-cyan" />
                </div>

                <div className="mt-5 rounded-[10px] border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-cyanSoft">Best option</div>
                  <div className="mt-2 text-xl font-semibold text-white">Bus {data.nearestStop.bestRoute} in {data.nearestStop.etaMin} min</div>
                  <div className="mt-2 text-sm text-slate-200">Expected crowd {data.nearestStop.expectedLoadPct}% • {data.nearestStop.recommendation}</div>
                </div>

                <div className="mt-5">
                  <div className="text-sm uppercase tracking-[0.24em] text-cyanSoft">Nearby stop options</div>
                  <div className="mt-3 space-y-3">
                    {data.nearbyStops.map((stop) => (
                      <div key={stop.stopSlug} className="rounded-[10px] border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-white">{stop.stopName}</div>
                            <div className="mt-1 text-sm text-slate-400">Walk {stop.walkingMinutes} min • Bus {stop.bestRoute}</div>
                          </div>
                          <div className="text-right text-sm text-cyan">{stop.etaMin} min</div>
                        </div>
                        <div className="mt-3 text-sm text-slate-300">Expected crowd {stop.expectedLoadPct}% • {stop.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

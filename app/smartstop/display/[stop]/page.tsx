import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftRight, Bell, MapPin } from "lucide-react";
import { LivePill } from "@/components/live-pill";
import { DhakaLiveMap } from "@/components/maps/dhaka-live-map";
import { getSmartStopDisplay, getStops } from "@/lib/simulators";
import { StopDisplayLive } from "./stop-display-live";

export async function generateStaticParams() {
  return getStops().map((stop) => ({ stop: stop.slug }));
}

export default function SmartStopDisplayPage({ params }: { params: { stop: string } }) {
  const display = getSmartStopDisplay(params.stop);
  if (!display) notFound();

  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="glass-card overflow-hidden p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="eyebrow">Public stop display</div>
              <h1 className="heading-lg">{display.stopName}</h1>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <MapPin className="h-4 w-4 text-cyan" />
                  Location-aware live board
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <Bell className="h-4 w-4 text-cyan" />
                  {display.corridorStatus}
                </span>
              </div>
            </div>
            <LivePill />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                {getStops().map((stop) => (
                  <Link
                    key={stop.slug}
                    href={`/smartstop/display/${stop.slug}`}
                    className={`rounded-sm px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition ${stop.slug === params.stop ? "bg-cyan text-black" : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"}`}
                  >
                    {stop.name}
                  </Link>
                ))}
              </div>

              <StopDisplayLive stop={params.stop} initialData={display} />
            </div>

            <DhakaLiveMap
              focus={params.stop as "shahbagh" | "farmgate" | "uttara" | "katabon"}
              title="Physical SmartStop display map"
              subtitle="This board now sits on a real Dhaka city map. It shows the current stop, nearby corridor context, and the routes most relevant to people standing here."
              highlightRoutes={display.arrivals.map((arrival) => `${arrival.routeCode} · ${arrival.destination}`)}
            />
          </div>

          <div className="mt-8 rounded-[10px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
            <div className="mb-2 font-semibold text-white">Why the map is on the public bus-stop screen</div>
            The SmartStop display should not feel like a plain table. It should feel like a real intelligent stop board: a live route panel plus a map showing where the passenger is and how this stop connects to the nearby bus network.
            <Link href="/smartstop/app" className="mt-4 inline-flex items-center gap-2 text-cyan hover:text-cyanSoft">
              See the passenger side next
              <ArrowLeftRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

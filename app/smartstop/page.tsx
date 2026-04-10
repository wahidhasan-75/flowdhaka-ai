import Link from "next/link";
import { ArrowRight, Bus, Layers3, LocateFixed, ShieldAlert, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

const pages = [
  { href: "/smartstop/display/shahbagh", title: "Stop Display", description: "Public-facing display that only shows buses for the current stop.", icon: Bus },
  { href: "/smartstop/app", title: "Passenger App", description: "Location-aware commuter interface with nearby stop logic.", icon: LocateFixed },
  { href: "/smartstop/compare", title: "Stop Comparison", description: "Compare nearby stops for comfort, speed, and walking tradeoffs.", icon: Layers3 },
  { href: "/smartstop/recommendation", title: "Recommendation Breakdown", description: "See why the AI recommends one bus over another.", icon: Sparkles },
  { href: "/smartstop/operator", title: "Operator Dashboard", description: "Track demand, overload, delay, and corridor pressure.", icon: Bus },
  { href: "/smartstop/admin", title: "Admin Enforcement Panel", description: "Admin-only violation intelligence and report export layer.", icon: ShieldAlert },
  { href: "/smartstop/impact", title: "Impact & Business", description: "Passenger, operator, authority, and deployment value of the product.", icon: Layers3 },
];

export default function SmartStopOverviewPage() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="glass-card p-8 md:p-10">
          <div className="eyebrow">SmartStop AI</div>
          <h1 className="heading-xl max-w-4xl text-4xl sm:text-5xl">Location-aware bus stop intelligence</h1>
          <p className="subtle-text mt-5 max-w-3xl">
            SmartStop AI turns every major bus stop into an intelligent decision point. The core product rule stays visible everywhere: the stop display only shows buses relevant to that exact stop, and the passenger view changes by nearby location.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Public hero", "Stop-specific display boards"],
              ["Personal layer", "Nearby stop guidance for passengers"],
              ["System layer", "Operator and admin intelligence"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-line bg-white/5 p-5">
                <div className="text-lg font-semibold text-white">{title}</div>
                <div className="mt-2 text-sm text-slate-300">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <SectionHeader
            eyebrow="Pages"
            title="Walk the full SmartStop product story"
            description="The user journey moves from stop-specific public display to location-aware passenger guidance, then into operator and authority intelligence."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <Link key={page.href} href={page.href} className="glass-card group p-6 transition hover:border-white/30">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{page.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{page.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan group-hover:text-cyanSoft">
                    Open page
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

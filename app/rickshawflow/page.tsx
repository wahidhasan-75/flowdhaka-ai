import Link from "next/link";
import { Activity, ArrowRight, Bike, Monitor, ShieldAlert, TimerReset } from "lucide-react";
import { SignalLight } from "@/components/signal-light";
import { MetricCard } from "@/components/metric-card";
import { getRickshawLandingMetrics } from "@/lib/simulators";

export default function RickshawFlowLandingPage() {
  const metrics = getRickshawLandingMetrics();
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="glass-card overflow-hidden p-8 md:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan">
              <Bike className="h-7 w-7" />
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              RickshawFlow <span className="text-cyan">AI</span>
            </h1>
            <div className="mt-4 text-sm uppercase tracking-[0.34em] text-cyanSoft">CCTV-Based Safety and Congestion Control</div>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              An AI-powered software platform that monitors rickshaw stands using CCTV-inspired logic, predicts stand overflow, assigns virtual green/yellow/red stand signals, and recommends actions that reduce congestion and accident risk.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400">
              Built for high-chaos roadside zones in Dhaka where unmanaged stand activity creates road blockage, unsafe pickup behavior, and traffic slowdown.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <SignalLight signal="green" />
              <div className="mt-4 text-lg font-semibold text-greenSignal">Safe</div>
            </div>
            <div className="text-center">
              <SignalLight signal="yellow" />
              <div className="mt-4 text-lg font-semibold text-yellowSignal">Caution</div>
            </div>
            <div className="text-center">
              <SignalLight signal="red" />
              <div className="mt-4 text-lg font-semibold text-redSignal">Critical</div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label={metrics[0].label} value={metrics[0].value} icon={<Activity className="h-5 w-5" />} />
            <MetricCard label={metrics[1].label} value={metrics[1].value} icon={<ArrowRight className="h-5 w-5" />} accent="green" />
            <MetricCard label={metrics[2].label} value={metrics[2].value} icon={<ShieldAlert className="h-5 w-5" />} accent="yellow" />
            <MetricCard label={metrics[3].label} value={metrics[3].value} icon={<TimerReset className="h-5 w-5" />} />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="glass-card p-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan">
                <Bike className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-white">Virtual Stand Signals</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                The signal display board for rickshaw stands. It shows live green/yellow/red status, short instructions, and nearby stand availability for field users.
              </p>
              <Link href="/rickshawflow/virtual-stand-display" className="mt-6 inline-flex items-center gap-2 text-base font-medium text-cyan">
                Open Stand Display
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="glass-card p-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan">
                <Monitor className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-white">AI Control Room</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                The full dashboard for traffic controllers and government operators — live monitoring, CCTV-style detection, risk scores, predictions, alerts, and intervention recommendations.
              </p>
              <Link href="/rickshawflow/control-room" className="mt-6 inline-flex items-center gap-2 text-base font-medium text-cyan">
                Open Control Room
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

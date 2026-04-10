import { ReactNode } from "react";

export function MetricCard({ label, value, icon, accent = "cyan" }: { label: string; value: string | number; icon?: ReactNode; accent?: "cyan" | "green" | "yellow" | "red" }) {
  const accentMap = {
    cyan: "text-cyan border-white/10 bg-white/5",
    green: "text-greenSignal border-white/10 bg-white/5",
    yellow: "text-yellowSignal border-white/10 bg-white/5",
    red: "text-redSignal border-white/10 bg-white/5",
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="metric-number">{value}</div>
          <p className="mt-2 text-sm text-slate-400">{label}</p>
        </div>
        {icon ? <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${accentMap[accent]}`}>{icon}</span> : null}
      </div>
    </div>
  );
}

import { MapPin } from "lucide-react";

type StopKey = "shahbagh" | "farmgate" | "uttara" | "katabon";

const points: Record<StopKey, { x: string; y: string; label: string }> = {
  shahbagh: { x: "44%", y: "56%", label: "Shahbagh" },
  farmgate: { x: "35%", y: "38%", label: "Farmgate" },
  uttara: { x: "64%", y: "18%", label: "Uttara" },
  katabon: { x: "48%", y: "50%", label: "Katabon" },
};

function RouteLine({ from, to, active = false }: { from: StopKey; to: StopKey; active?: boolean }) {
  const a = points[from];
  const b = points[to];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line
        x1={parseFloat(a.x)}
        y1={parseFloat(a.y)}
        x2={parseFloat(b.x)}
        y2={parseFloat(b.y)}
        stroke={active ? "#4ade80" : "rgba(255,255,255,0.18)"}
        strokeWidth="0.8"
        strokeDasharray={active ? "0" : "2.5 2.5"}
      />
    </svg>
  );
}

export function TransitMap({
  focus,
  title,
  subtitle,
  routes = [["uttara", "farmgate"], ["farmgate", "shahbagh"], ["shahbagh", "katabon"]] as Array<[StopKey, StopKey]>,
  highlightRoutes = [] as Array<string>,
  compact = false,
}: {
  focus: StopKey;
  title?: string;
  subtitle?: string;
  routes?: Array<[StopKey, StopKey]>;
  highlightRoutes?: string[];
  compact?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-white/10 bg-[#121722] ${compact ? "p-3" : "p-4"}`}>
      {(title || subtitle) ? (
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            {title ? <div className="font-semibold text-white">{title}</div> : null}
            {subtitle ? <div className="mt-1 text-xs leading-6 text-slate-400">{subtitle}</div> : null}
          </div>
          <div className="table-chip text-[10px] text-slate-300">Live map</div>
        </div>
      ) : null}

      <div className={`relative overflow-hidden rounded-[8px] border border-white/10 bg-[#202c3f] ${compact ? "h-[260px]" : "h-[360px]"}`}>
        <div className="absolute inset-0 opacity-90" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(74,222,128,0.10), transparent 10%), radial-gradient(circle at 60% 20%, rgba(255,255,255,0.06), transparent 14%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 42px 42px, 42px 42px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
        }} />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage:
            "linear-gradient(130deg, transparent 0%, transparent 30%, rgba(74,222,128,0.3) 31%, transparent 34%, transparent 100%), linear-gradient(20deg, transparent 0%, transparent 58%, rgba(255,255,255,0.2) 59%, transparent 61%, transparent 100%)",
        }} />

        {routes.map(([from, to], idx) => (
          <RouteLine key={`${from}-${to}-${idx}`} from={from} to={to} active={from === focus || to === focus} />
        ))}

        {Object.entries(points).map(([key, point]) => {
          const active = key === focus;
          return (
            <div key={key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: point.x, top: point.y }}>
              <div className={`relative flex h-8 w-8 items-center justify-center rounded-full border ${active ? "border-greenSignal bg-greenSignal text-black" : "border-white/20 bg-black/40 text-white"}`}>
                <MapPin className="h-4 w-4" />
                {active ? <span className="absolute inset-0 rounded-full bg-greenSignal/40 blur-md" /> : null}
              </div>
              <div className={`mt-2 rounded-sm px-2 py-1 text-[10px] font-medium ${active ? "bg-white text-black" : "bg-black/55 text-slate-200"}`}>
                {point.label}
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
          {highlightRoutes.map((route) => (
            <span key={route} className="rounded-sm border border-white/10 bg-black/55 px-2 py-1 font-mono text-[10px] text-white">
              {route}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LivePill({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-greenSignal">
      <span className="h-2 w-2 animate-pulse rounded-full bg-greenSignal" />
      {label}
    </span>
  );
}

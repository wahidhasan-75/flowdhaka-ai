import Link from "next/link";

const links = [
  { href: "/smartstop", label: "SmartStop" },
  { href: "/rickshawflow", label: "RickshawFlow" },
  { href: "/modules", label: "Modules" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-2xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          Flow<span className="font-light text-cyan">Dhaka</span>
          <span className="ml-2 text-sm uppercase tracking-[0.25em] text-slate-500">AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-greenSignal">
            <span className="h-2 w-2 rounded-full bg-greenSignal animate-pulse" /> Live demo
          </span>
          <Link href="/rickshawflow/control-room" className="rounded-sm bg-cyan px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black hover:bg-cyanSoft">
            Open dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

export function ModuleCard({ title, description, href, icon, badge }: { title: string; description: string; href: string; icon: ReactNode; badge?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="glass-card h-full p-6">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[8px] border border-white/10 bg-white/5 text-cyan">
        {icon}
      </div>
      {badge ? <div className="mb-3 text-xs uppercase tracking-[0.24em] text-cyanSoft">{badge}</div> : null}
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan transition hover:text-cyanSoft">
        Open module
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

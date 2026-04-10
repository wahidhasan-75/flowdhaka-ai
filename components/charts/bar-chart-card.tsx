"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BarChartCard({ title, data, xKey, yKey, color = "#3fc9ff" }: { title: string; data: Array<Record<string, string | number>>; xKey: string; yKey: string; color?: string }) {
  return (
    <div className="glass-card h-[340px] p-5">
      <div className="mb-4 text-lg font-semibold text-white">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={32} />
          <Tooltip contentStyle={{ background: "#071524", border: "1px solid rgba(139,170,202,0.16)", borderRadius: 16 }} />
          <Bar dataKey={yKey} fill={color} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

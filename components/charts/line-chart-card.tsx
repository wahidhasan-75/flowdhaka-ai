"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function LineChartCard({ title, data, dataKey, color = "#3fc9ff" }: { title: string; data: Array<Record<string, string | number>>; dataKey: string; color?: string }) {
  return (
    <div className="glass-card h-[340px] p-5">
      <div className="mb-4 text-lg font-semibold text-white">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} width={32} />
          <Tooltip contentStyle={{ background: "#071524", border: "1px solid rgba(139,170,202,0.16)", borderRadius: 16 }} />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#gradient-${dataKey})`} strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

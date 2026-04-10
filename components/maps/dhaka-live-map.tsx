"use client";

import "leaflet/dist/leaflet.css";

import { motion } from "framer-motion";
import { LocateFixed, MapPinned, Radar } from "lucide-react";
import { useMemo } from "react";
import { Circle, CircleMarker, MapContainer, Pane, Polyline, TileLayer, Tooltip } from "react-leaflet";

type StopKey = "shahbagh" | "farmgate" | "uttara" | "katabon";
type LocationKey = StopKey | "near-shahbagh" | "near-farmgate" | "near-katabon" | "near-motijheel";

type MarkerSpec = {
  id: string;
  label: string;
  position: [number, number];
  type: "stop" | "user" | "stand";
  status?: "good" | "watch" | "critical";
  meta?: string;
};

const dhakaCenter: [number, number] = [23.7806, 90.4070];

const stopPoints: Record<StopKey, MarkerSpec> = {
  shahbagh: { id: "shahbagh", label: "Shahbagh SmartStop", position: [23.7395, 90.3957], type: "stop", status: "critical", meta: "High demand corridor" },
  farmgate: { id: "farmgate", label: "Farmgate SmartStop", position: [23.7586, 90.3892], type: "stop", status: "watch", meta: "Peak interchange pressure" },
  uttara: { id: "uttara", label: "Uttara Sector 7", position: [23.8754, 90.3988], type: "stop", status: "good", meta: "Stable outbound flow" },
  katabon: { id: "katabon", label: "Katabon Connector", position: [23.7345, 90.3925], type: "stop", status: "good", meta: "Connector stop" },
};

const userPoints: Record<Exclude<LocationKey, StopKey>, MarkerSpec> = {
  "near-shahbagh": { id: "near-shahbagh", label: "Passenger near Shahbagh", position: [23.7411, 90.3982], type: "user", meta: "Location enabled" },
  "near-farmgate": { id: "near-farmgate", label: "Passenger near Farmgate", position: [23.7607, 90.3873], type: "user", meta: "High demand zone" },
  "near-katabon": { id: "near-katabon", label: "Passenger near Katabon", position: [23.7361, 90.3901], type: "user", meta: "Comfort tradeoff zone" },
  "near-motijheel": { id: "near-motijheel", label: "Passenger near Motijheel", position: [23.7296, 90.4174], type: "user", meta: "Transfer recommendation zone" },
};

const rickshawStandPoints: MarkerSpec[] = [
  { id: "rf-1", label: "Farmgate Stand North", position: [23.7578, 90.3878], type: "stand", status: "critical", meta: "Overflow likely in 8 min" },
  { id: "rf-2", label: "Mirpur 10 Road Edge", position: [23.8067, 90.3688], type: "stand", status: "good", meta: "Controlled occupancy" },
  { id: "rf-3", label: "New Market South", position: [23.7328, 90.3851], type: "stand", status: "watch", meta: "Pressure rising" },
  { id: "rf-4", label: "Jatrabari Connector", position: [23.7099, 90.4357], type: "stand", status: "watch", meta: "Spillover watch" },
];

const networkRoutes: Array<[StopKey, StopKey]> = [
  ["uttara", "farmgate"],
  ["farmgate", "shahbagh"],
  ["shahbagh", "katabon"],
];

function getMarkerColors(marker: MarkerSpec) {
  if (marker.type === "user") return { fill: "#38bdf8", stroke: "#e0f2fe", radius: 10 };
  if (marker.status === "critical") return { fill: "#ef4444", stroke: "#fecaca", radius: 11 };
  if (marker.status === "watch") return { fill: "#f59e0b", stroke: "#fde68a", radius: 10 };
  return { fill: "#4ade80", stroke: "#dcfce7", radius: 10 };
}

export function DhakaLiveMap({
  focus,
  location,
  title,
  subtitle,
  compact = false,
  highlightRoutes = [],
  mode = "smartstop",
}: {
  focus?: StopKey;
  location?: LocationKey;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  highlightRoutes?: string[];
  mode?: "smartstop" | "control-room";
}) {
  const markers = useMemo(() => {
    const base = mode === "control-room" ? [...rickshawStandPoints] : Object.values(stopPoints);
    const locationMarker = location && !(location in stopPoints) ? userPoints[location as Exclude<LocationKey, StopKey>] : null;
    return locationMarker ? [...base, locationMarker] : base;
  }, [location, mode]);

  const mapFocus = focus ? stopPoints[focus].position : location && location in stopPoints ? stopPoints[location as StopKey].position : dhakaCenter;
  const zoom = compact ? 11 : 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`overflow-hidden rounded-[18px] border border-white/10 bg-[#0b1220] ${compact ? "p-3" : "p-4"}`}
    >
      {(title || subtitle) ? (
        <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            {title ? <div className="font-semibold text-white">{title}</div> : null}
            {subtitle ? <div className="mt-1 max-w-2xl text-xs leading-6 text-slate-400">{subtitle}</div> : null}
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span className="table-chip inline-flex items-center gap-2 text-cyanSoft"><Radar className="h-3.5 w-3.5" /> Live city map</span>
            <span className="table-chip inline-flex items-center gap-2 text-slate-300"><MapPinned className="h-3.5 w-3.5" /> Dhaka layer</span>
          </div>
        </div>
      ) : null}

      <div className={`relative overflow-hidden rounded-[14px] border border-white/10 ${compact ? "h-[280px]" : "h-[390px]"}`}>
        <div className="absolute inset-x-0 top-0 z-[500] flex flex-wrap gap-2 p-3 pointer-events-none">
          {focus ? (
            <span className="rounded-full border border-cyan/20 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-cyanSoft backdrop-blur">Focus: {stopPoints[focus].label}</span>
          ) : null}
          {location && !(location in stopPoints) ? (
            <span className="rounded-full border border-sky-400/20 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-sky-200 backdrop-blur inline-flex items-center gap-2"><LocateFixed className="h-3.5 w-3.5" /> Passenger tracked</span>
          ) : null}
          {mode === "control-room" ? (
            <span className="rounded-full border border-red-400/20 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-red-200 backdrop-blur">Risk heat watch enabled</span>
          ) : null}
        </div>

        <MapContainer center={mapFocus} zoom={zoom} scrollWheelZoom className="h-full w-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <Pane name="risk-rings" style={{ zIndex: 420 }}>
            {mode === "control-room" ? rickshawStandPoints.filter((m) => m.status !== "good").map((marker) => (
              <Circle
                key={`${marker.id}-ring`}
                center={marker.position}
                radius={marker.status === "critical" ? 520 : 360}
                pathOptions={{ color: marker.status === "critical" ? "#ef4444" : "#f59e0b", fillColor: marker.status === "critical" ? "#ef4444" : "#f59e0b", fillOpacity: 0.12, weight: 1.2, dashArray: "6 6" }}
              />
            )) : null}

            {focus ? (
              <Circle
                center={stopPoints[focus].position}
                radius={420}
                pathOptions={{ color: "#4ade80", fillColor: "#4ade80", fillOpacity: 0.08, weight: 1.3, dashArray: "8 6" }}
              />
            ) : null}
          </Pane>

          {mode === "smartstop" && networkRoutes.map(([from, to]) => {
            const active = focus === from || focus === to;
            return (
              <Polyline
                key={`${from}-${to}`}
                positions={[stopPoints[from].position, stopPoints[to].position]}
                pathOptions={{ color: active ? "#4ade80" : "#64748b", weight: active ? 4 : 2.6, opacity: active ? 0.85 : 0.45, dashArray: active ? undefined : "6 7" }}
              />
            );
          })}

          {markers.map((marker) => {
            const colors = getMarkerColors(marker);
            return (
              <CircleMarker
                key={marker.id}
                center={marker.position}
                radius={colors.radius}
                pathOptions={{ color: colors.stroke, fillColor: colors.fill, fillOpacity: 0.95, weight: 2 }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                  <div className="text-xs font-semibold">{marker.label}</div>
                  {marker.meta ? <div className="mt-1 text-[11px] text-slate-300">{marker.meta}</div> : null}
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {highlightRoutes.length ? (
          <div className="absolute bottom-3 left-3 right-3 z-[500] flex flex-wrap gap-2 pointer-events-none">
            {highlightRoutes.slice(0, 5).map((route) => (
              <span key={route} className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">
                {route}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

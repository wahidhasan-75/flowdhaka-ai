import { baseStopDisplays, enforcementEvents, operatorMetrics, passengerScenarios, recommendationSeed, rickshawModes, rickshawStandSnapshots, smartStops } from "@/lib/data";
import { ControlAlert, DetectionPreview, PassengerScenario, RickshawStandSnapshot, SmartStopDisplay } from "@/lib/types";

function tickSeed() {
  return Math.floor(Date.now() / 12000);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function getSmartStopDisplay(stopSlug: string): SmartStopDisplay | null {
  const base = baseStopDisplays[stopSlug];
  if (!base) return null;
  const tick = tickSeed();
  const arrivals = base.arrivals.map((arrival, index) => {
    const etaShift = ((tick + index) % 3) - 1;
    const loadShift = (((tick + index * 2) % 7) - 3) * 2;
    const etaMin = clamp(arrival.etaMin + etaShift, 1, 15);
    const expectedLoadPct = clamp(arrival.expectedLoadPct + loadShift, 28, 98);
    const status = expectedLoadPct > 84 ? "Almost Full" : expectedLoadPct > 67 ? "Crowded" : expectedLoadPct > 50 ? "Balanced" : "Comfortable";
    return { ...arrival, etaMin, expectedLoadPct, status };
  });

  const bestChoice = [...arrivals].sort((a, b) => (a.expectedLoadPct + a.etaMin * 4) - (b.expectedLoadPct + b.etaMin * 4))[0];

  return {
    ...base,
    arrivals,
    aiAdvice: `${bestChoice.routeCode} is currently the best balance of ETA and comfort for ${base.stopName}.`,
  };
}

export function getStops() {
  return smartStops;
}

export function getPassengerScenario(locationId: string): PassengerScenario {
  const base = passengerScenarios.find((item) => item.locationId === locationId) || passengerScenarios[0];
  const tick = tickSeed();
  const nearbyStops = base.nearbyStops.map((stop, index) => ({
    ...stop,
    etaMin: clamp(stop.etaMin + ((tick + index) % 2), 1, 15),
    expectedLoadPct: clamp(stop.expectedLoadPct + (((tick + index) % 5) - 2) * 2, 28, 95),
  }));
  const nearestStop = nearbyStops[0];
  return { ...base, nearestStop, nearbyStops };
}

export function getComparisonData() {
  const shahbagh = getSmartStopDisplay("shahbagh");
  const katabon = getSmartStopDisplay("katabon");
  const farmgate = getSmartStopDisplay("farmgate");
  return {
    pairs: [
      {
        title: "Shahbagh vs Katabon",
        recommendation: "If comfort matters, walk to Katabon. If speed matters, board at Shahbagh now.",
        options: [
          { stopName: shahbagh?.stopName, walkingMinutes: 2, etaMin: shahbagh?.arrivals[1]?.etaMin ?? 5, expectedLoadPct: shahbagh?.arrivals[1]?.expectedLoadPct ?? 48, comfortScore: 58, speedScore: 90 },
          { stopName: katabon?.stopName, walkingMinutes: 5, etaMin: katabon?.arrivals[0]?.etaMin ?? 6, expectedLoadPct: katabon?.arrivals[0]?.expectedLoadPct ?? 46, comfortScore: 88, speedScore: 68 },
        ],
      },
      {
        title: "Farmgate Main vs Shahbagh Transfer",
        recommendation: "Farmgate is faster now, but Shahbagh is less crowded.",
        options: [
          { stopName: farmgate?.stopName, walkingMinutes: 1, etaMin: farmgate?.arrivals[1]?.etaMin ?? 6, expectedLoadPct: farmgate?.arrivals[1]?.expectedLoadPct ?? 54, comfortScore: 72, speedScore: 86 },
          { stopName: shahbagh?.stopName, walkingMinutes: 12, etaMin: shahbagh?.arrivals[1]?.etaMin ?? 5, expectedLoadPct: shahbagh?.arrivals[1]?.expectedLoadPct ?? 48, comfortScore: 84, speedScore: 56 },
        ],
      },
    ],
  };
}

export function getRecommendationBreakdown() {
  const tick = tickSeed();
  return recommendationSeed.map((item, index) => {
    const totalScore = clamp(item.totalScore + (((tick + index) % 3) - 1), 50, 95);
    return { ...item, totalScore };
  }).sort((a, b) => b.totalScore - a.totalScore);
}

export function getOperatorDashboard() {
  const tick = tickSeed();
  return {
    summary: {
      activeDisplays: 12,
      overloadedStops: 3,
      avgDelay: 4.8,
      recommendationAccuracy: 86,
    },
    stops: operatorMetrics.map((stop, index) => ({
      ...stop,
      demandIndex: clamp(stop.demandIndex + (((tick + index) % 5) - 2), 20, 98),
      overloadRisk: clamp(stop.overloadRisk + (((tick + index * 2) % 5) - 2), 10, 95),
    })),
    hourlyDemand: [
      { hour: "6AM", value: 28 },
      { hour: "7AM", value: 44 },
      { hour: "8AM", value: 70 },
      { hour: "9AM", value: 86 },
      { hour: "10AM", value: 62 },
      { hour: "11AM", value: 50 },
      { hour: "12PM", value: 58 },
    ],
    routePressure: [
      { route: "6A", pressure: 82 },
      { route: "7B", pressure: 67 },
      { route: "M7", pressure: 73 },
      { route: "U1", pressure: 41 },
    ],
  };
}

export function getAdminInsights() {
  return {
    headlineStats: [
      { label: "Most reported route", value: "6A" },
      { label: "Most reported corridor", value: "Farmgate" },
      { label: "Peak violation time", value: "8:00–9:30 AM" },
      { label: "Priority issue", value: "Off-stop boarding near Shahbagh" },
    ],
    events: enforcementEvents,
    corridorCounts: [
      { name: "Farmgate", value: 26 },
      { name: "Shahbagh", value: 19 },
      { name: "Karwan Bazar", value: 17 },
      { name: "Uttara", value: 11 },
    ],
  };
}

export function getRickshawLandingMetrics() {
  return [
    { label: "Stands monitored", value: "5" },
    { label: "Spillover reduced", value: "38%" },
    { label: "High-risk alerts", value: "12" },
    { label: "Avg response time", value: "4.2m" },
  ];
}

export function getRickshawStandDisplay(mode: string) {
  return rickshawModes[mode] || rickshawModes.normal;
}

export function getRickshawControlRoom(mode: string) {
  const selectedMode = rickshawModes[mode] ? mode : "normal";
  const tick = tickSeed();
  const stands = rickshawStandSnapshots.map((stand, index) => {
    let riskOffset = (((tick + index) % 5) - 2) * (selectedMode === "normal" ? 1 : selectedMode === "peak" ? 3 : 4);
    let spillOffset = (((tick + index) % 3) - 1) * (selectedMode === "normal" ? 1 : 2);
    if (selectedMode === "rain" || selectedMode === "event") {
      riskOffset += 6;
      spillOffset += 3;
    }
    const riskScore = clamp(stand.riskScore + riskOffset, 12, 98);
    const roadSpilloverPct = clamp(stand.roadSpilloverPct + spillOffset, 4, 55);
    const status = riskScore > 60 ? "red" : riskScore > 35 ? "yellow" : "green";
    return { ...stand, riskScore, roadSpilloverPct, status } as RickshawStandSnapshot;
  });

  const alerts: ControlAlert[] = [
    { id: "a1", severity: "High", standName: "Farmgate Stand North", issueType: "High spillover", timestamp: "09:12 AM", recommendation: "Redirect 8 rickshaws to Khamarbari Link" },
    { id: "a2", severity: "Watch", standName: "New Market South Stand", issueType: "Unsafe pickup rise", timestamp: "09:14 AM", recommendation: "Limit new waiting for 6 min" },
    { id: "a3", severity: "High", standName: "Jatrabari Connector Stand", issueType: "Illegal roadside occupation", timestamp: "09:17 AM", recommendation: "Use alternate staging point" },
  ];

  const detections: DetectionPreview[] = [
    { id: "d1", camera: "CAM-01", label: "Rickshaw cluster detected", confidence: 0.94, zone: "Farmgate North" },
    { id: "d2", camera: "CAM-03", label: "Passenger buildup detected", confidence: 0.87, zone: "New Market South" },
    { id: "d3", camera: "CAM-04", label: "Stand boundary breach", confidence: 0.91, zone: "Jatrabari Connector" },
    { id: "d4", camera: "CAM-06", label: "Unsafe curbside pickup", confidence: 0.89, zone: "Mohakhali Link" },
  ];

  return {
    mode: selectedMode,
    metrics: {
      activeStands: stands.length,
      redRiskStands: stands.filter((stand) => stand.riskScore > 60).length,
      spilloverReduced: selectedMode === "normal" ? 38 : selectedMode === "peak" ? 26 : 19,
      avgInterventionTime: selectedMode === "normal" ? 4.2 : selectedMode === "peak" ? 5.3 : 6.1,
      alertsToday: selectedMode === "normal" ? 12 : selectedMode === "peak" ? 17 : 21,
    },
    stands,
    alerts,
    detections,
    beforeAfter: {
      before: ["Overcrowded stand", "Chaotic roadside waiting", "Lane space occupied", "No early warning"],
      after: ["Yellow/red status triggered", "Redistribution recommended", "Lower spillover", "Safer curbside flow"],
    },
  };
}

export function applyIntervention(standId: string, mode: string) {
  const room = getRickshawControlRoom(mode);
  const stands = room.stands.map((stand) => {
    if (stand.id === standId) {
      const lowered = Math.max(18, stand.riskScore - 18);
      return {
        ...stand,
        riskScore: lowered,
        roadSpilloverPct: Math.max(5, stand.roadSpilloverPct - 12),
        interventionStatus: "Applied",
        actionRecommendation: "Pressure reduced. Keep monitoring.",
        status: lowered > 60 ? "red" : lowered > 35 ? "yellow" : "green",
      };
    }
    if (stand.id === "rf-5") {
      return {
        ...stand,
        rickshawCount: stand.rickshawCount + 4,
        interventionStatus: "Receiving redirected flow",
      };
    }
    return stand;
  });

  return {
    ...room,
    stands,
    message: "Intervention applied. Overflow redirected and risk score adjusted.",
  };
}

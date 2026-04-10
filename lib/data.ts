import { EnforcementEvent, OperatorStopMetric, PassengerScenario, RecommendationBreakdownItem, RickshawStandDisplay, RickshawStandSnapshot, SmartStopDisplay } from "@/lib/types";

export const smartStops = [
  { slug: "shahbagh", name: "Shahbagh SmartStop" },
  { slug: "farmgate", name: "Farmgate SmartStop" },
  { slug: "uttara", name: "Uttara Sector 7 SmartStop" },
  { slug: "katabon", name: "Katabon Connector SmartStop" },
];

export const baseStopDisplays: Record<string, SmartStopDisplay> = {
  shahbagh: {
    stopSlug: "shahbagh",
    stopName: "Shahbagh SmartStop",
    corridorStatus: "High demand on Shahbagh corridor",
    aiAdvice: "Wait 2 minutes for Bus 7B for better space and lower delay risk.",
    serviceAlert: "Heavy corridor pressure near TSC and Bangla Motor.",
    arrivals: [
      { id: "s1", routeCode: "6A", routeName: "Mirpur → Motijheel", destination: "Motijheel", etaMin: 3, expectedLoadPct: 92, status: "Almost Full", recommendation: "Skip" },
      { id: "s2", routeCode: "7B", routeName: "Uttara → Shahbagh", destination: "Shahbagh", etaMin: 5, expectedLoadPct: 48, status: "Comfortable", recommendation: "Best Choice" },
      { id: "s3", routeCode: "9C", routeName: "Mohammadpur → Gulistan", destination: "Gulistan", etaMin: 8, expectedLoadPct: 65, status: "Moderate", recommendation: "Backup" },
    ],
  },
  farmgate: {
    stopSlug: "farmgate",
    stopName: "Farmgate SmartStop",
    corridorStatus: "Severe peak hour pressure",
    aiAdvice: "Board Bus F2 now if speed matters. Walk 2 minutes to Tejgaon Link if comfort matters.",
    serviceAlert: "Queue buildup near Khamarbari side.",
    arrivals: [
      { id: "f1", routeCode: "F2", routeName: "Mirpur 10 → Farmgate", destination: "Farmgate", etaMin: 2, expectedLoadPct: 81, status: "Crowded", recommendation: "Fastest" },
      { id: "f2", routeCode: "M7", routeName: "Mohakhali → Motijheel", destination: "Motijheel", etaMin: 6, expectedLoadPct: 54, status: "Balanced", recommendation: "Best Choice" },
      { id: "f3", routeCode: "U4", routeName: "Uttara → Karwan Bazar", destination: "Karwan Bazar", etaMin: 7, expectedLoadPct: 47, status: "Comfortable", recommendation: "Comfort Option" },
    ],
  },
  uttara: {
    stopSlug: "uttara",
    stopName: "Uttara Sector 7 SmartStop",
    corridorStatus: "Stable outbound flow",
    aiAdvice: "Bus U1 is on time and still has enough capacity.",
    serviceAlert: "Light rain may slow arrivals after 15 minutes.",
    arrivals: [
      { id: "u1", routeCode: "U1", routeName: "Uttara → Airport → Banani", destination: "Banani", etaMin: 4, expectedLoadPct: 41, status: "Comfortable", recommendation: "Best Choice" },
      { id: "u2", routeCode: "B3", routeName: "Abdullahpur → Badda", destination: "Badda", etaMin: 7, expectedLoadPct: 56, status: "Balanced", recommendation: "Backup" },
      { id: "u3", routeCode: "A9", routeName: "Azampur → Motijheel", destination: "Motijheel", etaMin: 10, expectedLoadPct: 67, status: "Moderate", recommendation: "Later Option" },
    ],
  },
  katabon: {
    stopSlug: "katabon",
    stopName: "Katabon Connector SmartStop",
    corridorStatus: "Medium demand with low queue stress",
    aiAdvice: "Walking here from Shahbagh improves comfort for the next 6-minute arrival.",
    serviceAlert: "Low boarding pressure right now.",
    arrivals: [
      { id: "k1", routeCode: "K2", routeName: "Katabon → Dhanmondi", destination: "Dhanmondi", etaMin: 6, expectedLoadPct: 46, status: "Comfortable", recommendation: "Best Choice" },
      { id: "k2", routeCode: "S4", routeName: "Shahbagh → Science Lab", destination: "Science Lab", etaMin: 5, expectedLoadPct: 73, status: "Crowded", recommendation: "Fastest" },
      { id: "k3", routeCode: "G8", routeName: "Gulistan → New Market", destination: "New Market", etaMin: 9, expectedLoadPct: 58, status: "Balanced", recommendation: "Backup" },
    ],
  },
};

export const passengerScenarios: PassengerScenario[] = [
  {
    locationId: "near-shahbagh",
    label: "Near Shahbagh",
    userMessage: "You are near Shahbagh. The nearest smart stop is Shahbagh.",
    nearestStop: { stopSlug: "shahbagh", stopName: "Shahbagh SmartStop", walkingMinutes: 2, bestRoute: "7B", etaMin: 5, expectedLoadPct: 48, recommendation: "Best option now" },
    nearbyStops: [
      { stopSlug: "shahbagh", stopName: "Shahbagh SmartStop", walkingMinutes: 2, bestRoute: "7B", etaMin: 5, expectedLoadPct: 48, recommendation: "Board here" },
      { stopSlug: "katabon", stopName: "Katabon Connector", walkingMinutes: 5, bestRoute: "K2", etaMin: 6, expectedLoadPct: 46, recommendation: "Walk if comfort matters" },
      { stopSlug: "farmgate", stopName: "Farmgate SmartStop", walkingMinutes: 13, bestRoute: "M7", etaMin: 6, expectedLoadPct: 54, recommendation: "Too far right now" },
    ],
  },
  {
    locationId: "near-farmgate",
    label: "Near Farmgate",
    userMessage: "You are in a heavy demand zone. Nearby stop choice matters now.",
    nearestStop: { stopSlug: "farmgate", stopName: "Farmgate SmartStop", walkingMinutes: 1, bestRoute: "M7", etaMin: 6, expectedLoadPct: 54, recommendation: "Balanced best choice" },
    nearbyStops: [
      { stopSlug: "farmgate", stopName: "Farmgate SmartStop", walkingMinutes: 1, bestRoute: "M7", etaMin: 6, expectedLoadPct: 54, recommendation: "Best balance" },
      { stopSlug: "shahbagh", stopName: "Shahbagh SmartStop", walkingMinutes: 12, bestRoute: "7B", etaMin: 5, expectedLoadPct: 48, recommendation: "Less crowded but farther" },
      { stopSlug: "katabon", stopName: "Katabon Connector", walkingMinutes: 10, bestRoute: "K2", etaMin: 6, expectedLoadPct: 46, recommendation: "Comfort option" },
    ],
  },
  {
    locationId: "near-katabon",
    label: "Near Katabon",
    userMessage: "You are near Katabon. Short walking shifts can improve comfort a lot.",
    nearestStop: { stopSlug: "katabon", stopName: "Katabon Connector", walkingMinutes: 1, bestRoute: "K2", etaMin: 6, expectedLoadPct: 46, recommendation: "Best choice now" },
    nearbyStops: [
      { stopSlug: "katabon", stopName: "Katabon Connector", walkingMinutes: 1, bestRoute: "K2", etaMin: 6, expectedLoadPct: 46, recommendation: "Board here" },
      { stopSlug: "shahbagh", stopName: "Shahbagh SmartStop", walkingMinutes: 4, bestRoute: "7B", etaMin: 5, expectedLoadPct: 48, recommendation: "Nearly equal" },
      { stopSlug: "farmgate", stopName: "Farmgate SmartStop", walkingMinutes: 11, bestRoute: "M7", etaMin: 6, expectedLoadPct: 54, recommendation: "Not ideal" },
    ],
  },
  {
    locationId: "near-motijheel",
    label: "Near Motijheel",
    userMessage: "You are farther from the highlighted stops, so the system suggests the fastest practical boarding point.",
    nearestStop: { stopSlug: "farmgate", stopName: "Farmgate SmartStop", walkingMinutes: 3, bestRoute: "M7", etaMin: 6, expectedLoadPct: 54, recommendation: "Recommended transfer point" },
    nearbyStops: [
      { stopSlug: "farmgate", stopName: "Farmgate SmartStop", walkingMinutes: 3, bestRoute: "M7", etaMin: 6, expectedLoadPct: 54, recommendation: "Best transfer" },
      { stopSlug: "shahbagh", stopName: "Shahbagh SmartStop", walkingMinutes: 6, bestRoute: "7B", etaMin: 5, expectedLoadPct: 48, recommendation: "Less crowded" },
      { stopSlug: "katabon", stopName: "Katabon Connector", walkingMinutes: 7, bestRoute: "K2", etaMin: 6, expectedLoadPct: 46, recommendation: "Comfort option" },
    ],
  },
];

export const recommendationSeed: RecommendationBreakdownItem[] = [
  { routeCode: "6A", etaScore: 92, crowdScore: 18, delayRisk: 44, stopProximity: 86, routeSuitability: 74, totalScore: 62, explanation: "Very fast, but likely too full by arrival." },
  { routeCode: "7B", etaScore: 80, crowdScore: 88, delayRisk: 70, stopProximity: 84, routeSuitability: 90, totalScore: 82, explanation: "Slightly slower, but best balance of comfort and route fit." },
  { routeCode: "9C", etaScore: 56, crowdScore: 61, delayRisk: 60, stopProximity: 82, routeSuitability: 72, totalScore: 66, explanation: "Acceptable backup if the top option is missed." },
];

export const operatorMetrics: OperatorStopMetric[] = [
  { stopName: "Shahbagh SmartStop", demandIndex: 88, overloadRisk: 74, avgDelayMin: 5, networkStatus: "High pressure" },
  { stopName: "Farmgate SmartStop", demandIndex: 92, overloadRisk: 81, avgDelayMin: 7, networkStatus: "Peak overload" },
  { stopName: "Uttara Sector 7", demandIndex: 49, overloadRisk: 32, avgDelayMin: 3, networkStatus: "Stable" },
  { stopName: "Katabon Connector", demandIndex: 54, overloadRisk: 29, avgDelayMin: 4, networkStatus: "Balanced" },
];

export const enforcementEvents: EnforcementEvent[] = [
  { id: "e1", corridor: "Farmgate", routeCode: "6A", violationType: "Off-stop boarding", timeLabel: "08:12 AM", severity: "High", repeatCount: 12 },
  { id: "e2", corridor: "Shahbagh", routeCode: "7B", violationType: "Zone breach", timeLabel: "08:37 AM", severity: "Medium", repeatCount: 8 },
  { id: "e3", corridor: "Karwan Bazar", routeCode: "F2", violationType: "Roadside stop", timeLabel: "09:04 AM", severity: "High", repeatCount: 10 },
  { id: "e4", corridor: "Uttara", routeCode: "U1", violationType: "Repeated curbside pickup", timeLabel: "09:26 AM", severity: "Watch", repeatCount: 5 },
];

export const rickshawModes: Record<string, RickshawStandDisplay> = {
  normal: {
    standName: "Farmgate Stand North",
    signal: "green",
    signalLabel: "Safe",
    instruction: "Stand open. Controlled waiting can continue.",
    pressureLabel: "Balanced",
    crowdLabel: "Medium",
    overflowRisk: "Low",
    nextUpdate: "9s",
    nearbyAlternative: "Nearest standby stand: Karwan Connector",
  },
  peak: {
    standName: "Farmgate Stand North",
    signal: "yellow",
    signalLabel: "Caution",
    instruction: "Pressure rising. Slow new waiting and keep curb clear.",
    pressureLabel: "Rising",
    crowdLabel: "High",
    overflowRisk: "Medium",
    nextUpdate: "7s",
    nearbyAlternative: "Shift overflow to Khamarbari Link Point",
  },
  rain: {
    standName: "Farmgate Stand North",
    signal: "red",
    signalLabel: "Critical",
    instruction: "Stand full. Redirect waiting to alternate point immediately.",
    pressureLabel: "Overloaded",
    crowdLabel: "Very High",
    overflowRisk: "Severe",
    nextUpdate: "5s",
    nearbyAlternative: "Nearest low-pressure stand: Khamarbari Link Point",
  },
  event: {
    standName: "Shahbagh Event Edge",
    signal: "red",
    signalLabel: "Critical",
    instruction: "Temporary hold active. Do not gather at curbside edge.",
    pressureLabel: "Event Rush",
    crowdLabel: "Very High",
    overflowRisk: "Severe",
    nextUpdate: "4s",
    nearbyAlternative: "Use Katabon Alternate Stand",
  },
};

const commonStandTrend = [
  { label: "-15m", risk: 34, spillover: 12 },
  { label: "-10m", risk: 48, spillover: 18 },
  { label: "-5m", risk: 59, spillover: 28 },
  { label: "Now", risk: 72, spillover: 36 },
];

export const rickshawStandSnapshots: RickshawStandSnapshot[] = [
  {
    id: "rf-1",
    standName: "Farmgate Stand North",
    status: "red",
    rickshawCount: 34,
    passengerCrowd: "Medium",
    roadSpilloverPct: 42,
    riskScore: 81,
    overloadForecast: "Overflow likely in 8 min",
    issueSummary: "Stand overflow touching main lane edge",
    actionRecommendation: "Move 8 rickshaws to Khamarbari Link Stand",
    interventionStatus: "Pending",
    trend: commonStandTrend,
  },
  {
    id: "rf-2",
    standName: "Mirpur 10 Road Edge Point",
    status: "green",
    rickshawCount: 11,
    passengerCrowd: "Rising",
    roadSpilloverPct: 8,
    riskScore: 26,
    overloadForecast: "Stable",
    issueSummary: "Controlled stand occupancy",
    actionRecommendation: "Accept redirected flow if needed",
    interventionStatus: "Ready",
    trend: [
      { label: "-15m", risk: 18, spillover: 4 },
      { label: "-10m", risk: 22, spillover: 6 },
      { label: "-5m", risk: 24, spillover: 6 },
      { label: "Now", risk: 26, spillover: 8 },
    ],
  },
  {
    id: "rf-3",
    standName: "New Market South Stand",
    status: "yellow",
    rickshawCount: 23,
    passengerCrowd: "High",
    roadSpilloverPct: 25,
    riskScore: 57,
    overloadForecast: "Pressure rise in 10 min",
    issueSummary: "Unsafe pickup forming near curb",
    actionRecommendation: "Limit new waiting for 6 min",
    interventionStatus: "Watch",
    trend: [
      { label: "-15m", risk: 38, spillover: 14 },
      { label: "-10m", risk: 45, spillover: 17 },
      { label: "-5m", risk: 51, spillover: 22 },
      { label: "Now", risk: 57, spillover: 25 },
    ],
  },
  {
    id: "rf-4",
    standName: "Jatrabari Connector Stand",
    status: "yellow",
    rickshawCount: 20,
    passengerCrowd: "Medium",
    roadSpilloverPct: 21,
    riskScore: 49,
    overloadForecast: "Manageable but rising",
    issueSummary: "Side friction increasing",
    actionRecommendation: "Stage overflow away from junction mouth",
    interventionStatus: "Monitoring",
    trend: [
      { label: "-15m", risk: 28, spillover: 9 },
      { label: "-10m", risk: 34, spillover: 13 },
      { label: "-5m", risk: 42, spillover: 18 },
      { label: "Now", risk: 49, spillover: 21 },
    ],
  },
  {
    id: "rf-5",
    standName: "Mohakhali Link Stand",
    status: "green",
    rickshawCount: 14,
    passengerCrowd: "Low",
    roadSpilloverPct: 11,
    riskScore: 31,
    overloadForecast: "Can accept redirected flow",
    issueSummary: "Stable curbside condition",
    actionRecommendation: "Keep ready for overflow transfer",
    interventionStatus: "Available",
    trend: [
      { label: "-15m", risk: 22, spillover: 7 },
      { label: "-10m", risk: 25, spillover: 8 },
      { label: "-5m", risk: 29, spillover: 10 },
      { label: "Now", risk: 31, spillover: 11 },
    ],
  },
];

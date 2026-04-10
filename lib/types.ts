export type SignalState = "green" | "yellow" | "red";

export interface BusArrival {
  id: string;
  routeCode: string;
  routeName: string;
  destination: string;
  etaMin: number;
  expectedLoadPct: number;
  status: string;
  recommendation: string;
}

export interface SmartStopDisplay {
  stopSlug: string;
  stopName: string;
  corridorStatus: string;
  aiAdvice: string;
  serviceAlert: string;
  arrivals: BusArrival[];
}

export interface NearbyStopOption {
  stopSlug: string;
  stopName: string;
  walkingMinutes: number;
  bestRoute: string;
  etaMin: number;
  expectedLoadPct: number;
  recommendation: string;
}

export interface PassengerScenario {
  locationId: string;
  label: string;
  nearestStop: NearbyStopOption;
  nearbyStops: NearbyStopOption[];
  userMessage: string;
}

export interface RecommendationBreakdownItem {
  routeCode: string;
  etaScore: number;
  crowdScore: number;
  delayRisk: number;
  stopProximity: number;
  routeSuitability: number;
  totalScore: number;
  explanation: string;
}

export interface OperatorStopMetric {
  stopName: string;
  demandIndex: number;
  overloadRisk: number;
  avgDelayMin: number;
  networkStatus: string;
}

export interface EnforcementEvent {
  id: string;
  corridor: string;
  routeCode: string;
  violationType: string;
  timeLabel: string;
  severity: string;
  repeatCount: number;
}

export interface RickshawStandDisplay {
  standName: string;
  signal: SignalState;
  signalLabel: string;
  instruction: string;
  pressureLabel: string;
  crowdLabel: string;
  overflowRisk: string;
  nextUpdate: string;
  nearbyAlternative: string;
}

export interface RickshawStandSnapshot {
  id: string;
  standName: string;
  status: SignalState;
  rickshawCount: number;
  passengerCrowd: string;
  roadSpilloverPct: number;
  riskScore: number;
  overloadForecast: string;
  issueSummary: string;
  actionRecommendation: string;
  interventionStatus: string;
  trend: Array<{ label: string; risk: number; spillover: number }>;
}

export interface ControlAlert {
  id: string;
  severity: string;
  standName: string;
  issueType: string;
  timestamp: string;
  recommendation: string;
}

export interface DetectionPreview {
  id: string;
  camera: string;
  label: string;
  confidence: number;
  zone: string;
}

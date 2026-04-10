import { NextResponse } from "next/server";
import { getRecommendationBreakdown } from "@/lib/simulators";

export async function GET() {
  return NextResponse.json(getRecommendationBreakdown());
}

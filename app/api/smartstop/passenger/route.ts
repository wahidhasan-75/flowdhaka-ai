import { NextRequest, NextResponse } from "next/server";
import { getPassengerScenario } from "@/lib/simulators";

export async function GET(request: NextRequest) {
  const location = request.nextUrl.searchParams.get("location") || "near-shahbagh";
  return NextResponse.json(getPassengerScenario(location));
}

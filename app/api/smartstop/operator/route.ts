import { NextResponse } from "next/server";
import { getOperatorDashboard } from "@/lib/simulators";

export async function GET() {
  return NextResponse.json(getOperatorDashboard());
}

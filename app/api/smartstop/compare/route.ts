import { NextResponse } from "next/server";
import { getComparisonData } from "@/lib/simulators";

export async function GET() {
  return NextResponse.json(getComparisonData());
}

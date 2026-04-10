import { NextResponse } from "next/server";
import { getStops } from "@/lib/simulators";

export async function GET() {
  return NextResponse.json(getStops());
}

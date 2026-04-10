import { NextRequest, NextResponse } from "next/server";
import { getRickshawControlRoom } from "@/lib/simulators";

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("mode") || "normal";
  return NextResponse.json(getRickshawControlRoom(mode));
}

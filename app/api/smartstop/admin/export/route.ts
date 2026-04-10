import { NextResponse } from "next/server";
import { getAdminInsights } from "@/lib/simulators";

export async function GET() {
  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    reportType: "SmartStop admin enforcement intelligence",
    ...getAdminInsights(),
  });
}

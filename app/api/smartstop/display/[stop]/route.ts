import { NextResponse } from "next/server";
import { getSmartStopDisplay } from "@/lib/simulators";

export async function GET(_request: Request, { params }: { params: { stop: string } }) {
  const data = getSmartStopDisplay(params.stop);
  if (!data) {
    return NextResponse.json({ message: "Stop not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

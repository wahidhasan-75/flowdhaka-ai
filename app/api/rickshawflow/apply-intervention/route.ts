import { NextResponse } from "next/server";
import { z } from "zod";
import { applyIntervention } from "@/lib/simulators";

const bodySchema = z.object({
  standId: z.string(),
  mode: z.string().optional(),
});

export async function POST(request: Request) {
  const json = await request.json();
  const result = bodySchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  return NextResponse.json(applyIntervention(result.data.standId, result.data.mode || "normal"));
}

// src/app/api/get-nombres-maps/route.ts
import { NextResponse } from "next/server";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";

export async function GET() {
  const data = await getNombreMaps();
  return NextResponse.json(data);
}

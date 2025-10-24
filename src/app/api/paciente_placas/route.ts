import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function POST(req: NextRequest) {
  const body = await req.json();
   console.log("Datos recibidos en backend:", body);
  const url = `/api/paciente_placas/`;

  return await authFetchWithCookies(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

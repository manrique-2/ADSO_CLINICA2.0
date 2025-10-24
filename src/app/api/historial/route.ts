// src/app/api/historial/route.ts

import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = new URLSearchParams();

     const paciente = searchParams.get("paciente");
//   const pacienteId = req.nextUrl.searchParams.get("paciente");

    if (paciente) {
    query.set("paciente", paciente);
    }
    
    const url = `/api/historial/?${query.toString()}`;

    return await authFetchWithCookies(url)

   
}

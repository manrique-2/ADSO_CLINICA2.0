// src/app/api/medicos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const nombre = searchParams.get("nombre");

  if (page) {
    query.set("page", page);
  }
  if (nombre) {
    query.set("nombre", nombre);
  }

  const url = `/api/medico_list/?${query.toString()}`;
  console.log("Fetching medico_list from URL:", url);
  
  return await authFetchWithCookies(url);
}
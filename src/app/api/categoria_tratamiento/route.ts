// src/app/api/categoria_tratamiento/route.ts

import { NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: Request) {
  try {
    const res = await authFetchWithCookies("/api/categoria_tratamiento/");

    if (!res.ok) {
      return NextResponse.json(
        { detail: "Error al obtener categorías" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { detail: "Error inesperado del servidor" },
      { status: 500 }
    );
  }
}

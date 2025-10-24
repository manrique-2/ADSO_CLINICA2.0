// src/lib/server/tratamientos.ts
import { authFetchWithCookies } from "@/lib/api/authFetch";
import { cookies } from "next/headers";
import { Tratamiento } from "@/lib/types/tratamiento/tratamiento";

export async function getTratamientosOptions(): Promise<Tratamiento[]> {
   const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/tratamientos`, {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    console.error("❌ Error al cargar tratamientos:", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data.results) ? data.results : [];
}

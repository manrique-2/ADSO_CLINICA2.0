// lib/server/paciente.ts
// import { authFetchWithCookies } from "@/lib/server/authFetchWithCookies";

import { authFetchWithCookies } from "@/lib/api/authFetch";
import { Paciente } from "@/lib/types/paciente";
import { cookies } from "next/headers";

// 🔹 Fetch de todos los pacientes (sin paginación)
export async function getPaciente() {
  let page = 1;
  let allResults: any[] = [];
  let hasNext = true;

  while (hasNext) {
    const resp = await authFetchWithCookies(`/api/pacientes/?page=${page}&page_size=1000`);
    if (!resp.ok) throw new Error(`Error page ${page}`);
    const data = await resp.json();

    allResults = [...allResults, ...(data.results ?? [])];

    hasNext = Boolean(data.next);
    page++;
  }

  return allResults;
}


// src/lib/server/pacientes.ts
export async function getPacientesOptions():Promise<Paciente[]> {
   const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/pacientes`, {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(), // si necesitas pasar cookies explícitamente
    },
  });

  if (!res.ok) {
    console.error("❌ Error al cargar pacientes:", res.status, res.statusText);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data.results) ? data.results : [];
}



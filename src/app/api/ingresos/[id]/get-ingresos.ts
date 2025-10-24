// src/app/api/pacientes/[id]/get-paciente.ts
"use server";

import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getIngresosByIdServer(id: string) {
  const res = await authFetchWithCookies(`/api/ingresos/${id}/`, {
    method: "GET",
  });

  if (!res.ok) return null;
  return res.json();
}

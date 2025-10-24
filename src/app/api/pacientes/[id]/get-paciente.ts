// src/app/api/pacientes/[id]/get-paciente.ts
"use server";

import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getPacienteByIdServer(id: string) {
  const res = await authFetchWithCookies(`/api/pacientes/${id}/`, {
    method: "GET",
  });

  if (!res.ok) return null;
  return res.json();
}

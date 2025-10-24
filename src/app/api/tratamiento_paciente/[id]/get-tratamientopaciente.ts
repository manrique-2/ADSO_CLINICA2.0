// src/app/api/pacientes/[id]/get-paciente.ts
"use server";

import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getTratamientoPacienteByIdServer(id: string) {
  const res = await authFetchWithCookies(`/api/tratamiento_paciente/${id}/`, {
    method: "GET",
  });

  if (!res.ok) return null;
  return res.json();
}

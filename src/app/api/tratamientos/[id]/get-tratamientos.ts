// src/app/api/tratamientos/[id]/getTratamientoByIdServer-.ts
"use server";

import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getTratamientoByIdServer(id: string) {
  const res = await authFetchWithCookies(`/api/tratamientos/${id}/`, {
    method: "GET",
  });

  if (!res.ok) return null;
  return res.json();
}

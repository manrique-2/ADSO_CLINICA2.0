// src/app/api/citas/[id]/get-citas.ts
"use server";

import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getCitaByIdServer(id: string) {
  const res = await authFetchWithCookies(`/api/citas/${id}/`, {
    method: "GET",
  });

  if (!res.ok) return null;
  return res.json();
}

// src/app/api/usuarios/[id]/get-users.ts
"use server";

import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getUsersByIdServer(id: string) {
  const res = await authFetchWithCookies(`/api/users/${id}/`, {
    method: "GET",
  });

  if (!res.ok) return null;
  return res.json();
}

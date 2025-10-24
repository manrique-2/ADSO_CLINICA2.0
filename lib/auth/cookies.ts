'use server'

import { cookies } from "next/headers"

// Guardar access token (válido por 15 min aprox)
export async function setAccessToken(token: string) {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, 
  });
}

// Guardar refresh token (válido por 7 días)
export async function setRefreshToken(token: string) {
  (await cookies()).set("refresh_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

// Eliminar ambos tokens
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("refresh_token");
}

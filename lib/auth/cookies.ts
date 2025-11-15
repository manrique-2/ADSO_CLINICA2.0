import { NextResponse } from "next/server";
// Guardar access token
export function setAccessToken(response: NextResponse, token: string) {
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
}

// Guardar refresh token
export function setRefreshToken(response: NextResponse, token: string) {
  response.cookies.set("refresh_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Eliminar ambos cookies
export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("token");
  response.cookies.delete("refresh_token");
}

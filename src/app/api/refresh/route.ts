// /app/api/refresh/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { setAccessToken } from "@/lib/auth/cookies";

const BASE_API = process.env.API_BASE_URL || "https://flask-django-adso.jmtqu4.easypanel.host";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  
  console.log("🔄 Intentando renovar con refresh_token:", refreshToken);

  if (!refreshToken) {
    return NextResponse.json({ error: "No hay refresh token" }, { status: 401 });
  }

  const res = await fetch(`${BASE_API}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    console.log("❌ El backend rechazó el refresh");
    return NextResponse.json({ error: "No se pudo renovar token" }, { status: res.status });
  }

  const data = await res.json();
  console.log("✅ Nuevo access token:", data.access);

  const response = NextResponse.json({ access: data.access }, { status: 200 }); 
  response.cookies.set("token", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
  console.log("🧁 Cookies después de renovar:", (await cookies()).getAll());

  return response;
}

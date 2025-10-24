// lib/api/authFetchWithCookies.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { BASE_API, SITE_URL } from "@/lib/config";



export async function authFetchWithCookies(urlPath: string, options?: RequestInit) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const fullUrl = `${BASE_API}${urlPath}`;
  console.log("➡️ FULL URL:", fullUrl);
  const makeRequest = async (accessToken: string) => {
    return await fetch(fullUrl, {
      ...options,
      headers: {
        ...(options?.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  };

  let didRefresh = false;

  // Intentar refresh si no hay token
  if (!token && refreshToken) {
    const refreshRes = await fetch(`${SITE_URL}/api/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      token = data.access;
      didRefresh = true;
    }
  }

  // Si aún no hay token, fallamos
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  let res = await makeRequest(token);

  // Si token expiró justo ahora
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(`${SITE_URL}/api/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      token = data.access;
      didRefresh = true;

      res = await makeRequest(token!);
    } else {
      return NextResponse.json({ detail: "No se pudo renovar token" }, { status: 401 });
    }
  }

  // const jsonData = await res.json();
  const isJson = res.headers.get("content-type")?.includes("application/json");


  let jsonData = null;

  if (isJson) {
    try {
      jsonData = await res.json();
    } catch {
      jsonData = null;
   } 
  }
  const response = isJson
  ? NextResponse.json(jsonData || {}, { status: res.status })
    : new NextResponse(null, { status: res.status });
  
  
  if (didRefresh && token) {
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
  }

  return response;
}

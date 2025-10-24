import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authFetchWithCookies } from "@/lib/api/authFetch";
import { SITE_URL } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();
  
  const page = searchParams.get("page");
  const pageSize = searchParams.get("page_size");
  const paciente = searchParams.get("paciente");
  // const fechaRegistroAfter = searchParams.get("fecha_registro_after");
  // const fechaRegistroBefore = searchParams.get("fecha_registro_before");

  if (page) {
    query.set("page", page);
  }
  if (pageSize) {
    query.set("page_size", pageSize);
  }
  if (paciente) {
    query.set("paciente", paciente);
  }
  // if (fechaRegistroAfter) {
  //   query.set("fecha_registro_after", fechaRegistroAfter);
  // }
  // if (fechaRegistroBefore) {
  //   query.set("fecha_registro_before", fechaRegistroBefore);
  // }

  const url = `/api/tratamientos/?${query.toString()}`;
  console.log("Fetching pacientes from URL:", url);
  
  return await authFetchWithCookies(url);

}

export async function POST(req: NextRequest) {
  const b = await req.json();

  // ✅ Claves que tu backend espera
  const payload = {
    nombre: b?.nombre ?? "",
    precioBase: b?.precioBase !== undefined && b?.precioBase !== null
      ? Number(b.precioBase)
      : null, // 👈 ahora acepta null
    categoria: Number.isInteger(+b?.categoria) ? +b.categoria : null,
  };

  // 1) Intento normal
  const first = await authFetchWithCookies("/api/tratamientos/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (first.status !== 401) return first;

  // 2) Refresh manual
  const jar = await cookies();
  const refresh = jar.get("refresh_token")?.value;
  if (!refresh) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const r = await fetch(`${SITE_URL}/api/refresh`, {
    method: "POST",
    headers: { Cookie: `refresh_token=${refresh}` },
    cache: "no-store",
  });
  if (!r.ok) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const { access } = await r.json();
  if (!access) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  // fija nuevo access
  const out = NextResponse.json({ ok: true });
  out.cookies.set("token", access, {
    httpOnly: true, sameSite: "lax",
    secure: process.env.NODE_ENV === "production", path: "/", maxAge: 3600,
  });

  // 3) Reintento con helper y retorno directo
  const second = await authFetchWithCookies("/api/tratamientos/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return second;
}


// export async function POST(req: NextRequest) {
//   const body = await req.json();
//    console.log("Datos recibidos en backend:", body);
//   const url = `/api/users/`;

//   return await authFetchWithCookies(url, {
//     method: "PUT",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }



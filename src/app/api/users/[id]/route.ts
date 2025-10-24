// /src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

const BASE_PATH = "/api/users";

// Función utilitaria para extraer el ID desde la URL
function extractIdFromUrl(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
}

// GET: obtener detalles de un users
export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, { method: "GET" });

  if (!res.ok) {
    return NextResponse.json({ detail: "Error al obtener users" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}

// PUT: actualizar un usuario
export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const body = await req.json();

  const payload: any = {
    email: body.email,
    name: body.name,
    tipo_doc: body.tipo_doc,
    num_doc: body.num_doc,
    rol: body.rol,
    estado: body.estado,
    direccion: body.direccion,
    telefono: body.telefono,
      // especialidad: body.especialidad ? String(body.especialidad) : "",
    especialidad: body.especialidad,
    clinica: body.clinica,
    // password:body.password,
    // password2:body.password2,
  };

  // 👇 Solo incluir password si realmente se mandó
  if (body.password && body.password2) {
    payload.password = body.password;
    payload.password2 = body.password2;
  }

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json({ detail: error.detail || "Error al actualizar paciente" }, { status: res.status });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// DELETE: eliminar un usuario
export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json({ detail: "Error al eliminar users" }, { status: res.status });
  }

    // return NextResponse.json({ success: true }, { status: 204 });
    return NextResponse.json({ success: true }, { status: 200 });
    // return new NextResponse(null, { status: 204 });
}


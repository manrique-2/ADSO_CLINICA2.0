// /src/app/api/pacientes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

const BASE_PATH = "/api/pacientes";

// Función utilitaria para extraer el ID desde la URL
function extractIdFromUrl(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  return id;
}

// GET: obtener detalles de un paciente
export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, { method: "GET" });

  if (!res.ok) {
    return NextResponse.json({ detail: "Error al obtener paciente" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}

// PUT: actualizar un paciente
export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const body = await req.json();

  const payload = {
    dni_pac: body.dni_pac,
    nomb_pac: body.nomb_pac ,
    apel_pac: body.apel_pac,
    dire_pac: body.dire_pac,
    tel_pac: body.telf_pac,
    emai_pac: body.emai_pac,
    sexo: body.sexo,
    // fecha_nac: body.fena_pac,
    observacione: body.observacion,
    civi_pac: body.civi_pac,
    afil_pac: body.afil_pac,
    edad_pac: body.edad_pac,
    estudios_pac: body.estudios_pac,
    lugar_nacimiento: body.lugar_nacimiento,
    pais_id: Number(body.pais_id),
    departamento_id: Number(body.departamento_id),
    provincia_id: Number(body.provincia_id),
    distrito_id: Number(body.distrito_id),
    esta_pac: body.esta_pac,
    aler_pac: body.aler_pac,
    clinica: body.clinica,
  };

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

// DELETE: eliminar un paciente
export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json({ detail: "Error al eliminar paciente" }, { status: res.status });
  }

    // return NextResponse.json({ success: true }, { status: 204 });
    return NextResponse.json({ success: true }, { status: 200 });
    // return new NextResponse(null, { status: 204 });
}

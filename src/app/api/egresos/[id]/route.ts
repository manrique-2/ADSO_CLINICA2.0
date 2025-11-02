// /src/app/api/pacientes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

const BASE_PATH = "/api/egresos";

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
    return NextResponse.json({ detail: "Error al obtener el egreso" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}

// PUT: actualizar un tratamiento paciente
export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const body = await req.json();

//   const payload = {
//     fecha: body.fecha,
//     hora: body.hora,
//     // enfermedad: body.enfermedad ?? "", // opcional
//     // estadoCita: body.estadoCita,
//     // estadoPago: body.estadoPago,
//     // costo: body.costo,
//     // pagado: body.pagado,
//     // saldo: body.saldo,
//     medico: Number(body.medico),
//     paciente: Number(body.paciente),
//     consultorio: Number(body.consultorio),
//   };

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return NextResponse.json({ detail: error.detail || "Error al actualizar el ingreso" }, { status: res.status });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

// DELETE: eliminar un tratamiento del paciente
export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) return NextResponse.json({ detail: "ID inválido" }, { status: 400 });

  const res = await authFetchWithCookies(`${BASE_PATH}/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json({ detail: "Error al eliminar el egreso" }, { status: res.status });
  }

    // return NextResponse.json({ success: true }, { status: 204 });
    return NextResponse.json({ success: true }, { status: 200 });
    // return new NextResponse(null, { status: 204 });
}

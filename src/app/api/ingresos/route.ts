import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const pageSize = searchParams.get("page_size");
  const paciente_nombre = searchParams.get("paciente_nombre");
  const tratamiento_nombre = searchParams.get("tratamiento_nombre");
  // const fechaRegistroAfter = searchParams.get("fecha_registro_after");
  // const fechaRegistroBefore = searchParams.get("fecha_registro_before");

  if (page) {
    query.set("page", page);
  }
  if (pageSize) {
    query.set("page_size", pageSize);
  }
  if (paciente_nombre) {
    query.set("paciente_nombre", paciente_nombre);
  }
  if (tratamiento_nombre) {
    query.set("tratamiento_nombre", tratamiento_nombre);
  }
  // if (fechaRegistroAfter) {
  //   query.set("fecha_registro_after", fechaRegistroAfter);
  // }
  // if (fechaRegistroBefore) {
  //   query.set("fecha_registro_before", fechaRegistroBefore);
  // }

  const url = `/api/ingresos/?${query.toString()}`;
  console.log("Fetching pacientes from URL:", url);

  return await authFetchWithCookies(url);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Datos recibidos en backend:", body);
  const url = `/api/ingresos/`;

  return await authFetchWithCookies(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

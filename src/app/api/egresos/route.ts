import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const pageSize = searchParams.get("page_size");
  const paciente_nombre = searchParams.get("paciente_nombre");
  const tratamiento_nombre = searchParams.get("tratamiento_nombre");
  const divide = searchParams.get("divide");
  const tipo_egreso = searchParams.get("tipo_egreso");
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
  if (divide) {
    query.set("divide", divide);
  }
  if (tipo_egreso) {
    query.set("tipo_egreso", tipo_egreso);
  }
  const url = `/api/egresos/?${query.toString()}`;
  console.log("Fetching pacientes from URL:", url);

  return await authFetchWithCookies(url);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Datos recibidos en backend:", body);
  const url = `/api/egresos/`;

  return await authFetchWithCookies(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

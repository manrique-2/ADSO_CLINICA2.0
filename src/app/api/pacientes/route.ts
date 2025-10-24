
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const pageSize = searchParams.get("page_size");
  const nombre = searchParams.get("nomb_pac");
  const fechaRegistroAfter = searchParams.get("fecha_registro_after");
  const fechaRegistroBefore = searchParams.get("fecha_registro_before");

  if (page) {
    query.set("page", page);
  }
  if (pageSize) {
    query.set("page_size", pageSize);
  }
  if (nombre) {
    query.set("nomb_pac", nombre);
  }
  if (fechaRegistroAfter) {
    query.set("fecha_registro_after", fechaRegistroAfter);
  }
  if (fechaRegistroBefore) {
    query.set("fecha_registro_before", fechaRegistroBefore);
  }

  const url = `/api/pacientes/?${query.toString()}`;
  console.log("Fetching pacientes from URL:", url);
  
  return await authFetchWithCookies(url);
}

// POST: 
// crear nuevo paciente
export async function POST(req: NextRequest) {
  const body = await req.json();

  const payload = {
    nomb_pac: body.nomb_pac || "",
    apel_pac: body.apel_pac || "",
    edad_pac: body.edad_pac || "",
    estudios_pac: body.estudios_pac || "",
    // lugar_nacimiento: body.lugar_nacimiento || "",
    dire_pac: body.dire_pac || "",
    dni_pac: body.dni_pac || "",
    telf_pac: body.telf_pac || "",
    // fena_pac: body.fena_pac || null, // backend acepta fecha como YYYY-MM-DD o null
    // civi_pac: body.civi_pac || "",
    afil_pac: body.afil_pac || "",
    sexo: body.sexo || "",
    // esta_pac: body.esta_pac || "",
    aler_pac: body.aler_pac || "",
    emai_pac: body.emai_pac || "",
    clinica: body.clinica || "",
    observacion: body.observacion || "",

    pais_id: parseNullableInt(body.pais_id),
    departamento_id: parseNullableInt(body.departamento_id),
    provincia_id: parseNullableInt(body.provincia_id),
    distrito_id: parseNullableInt(body.distrito_id),
    
  }
  // 👇 Esto imprimirá el JSON limpio en tu consola del backend (Next.js)
  console.log("Payload limpio a enviar:", payload);

  return await authFetchWithCookies("/api/pacientes/", {
    method: "POST",
    body: JSON.stringify(payload),
  })
  
}
function parseNullableInt(value: any) {
  const num = parseInt(value);
  return isNaN(num) ? null : num;
}


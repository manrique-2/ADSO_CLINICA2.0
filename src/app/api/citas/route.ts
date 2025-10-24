
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const medico = searchParams.get("medico_id");
  const estadoCita = searchParams.get("estadoCita");
  const fecha = searchParams.get("fecha");
//   const pageSize = searchParams.get("page_size");
  // const paciente = searchParams.get("paciente");

  if (page) {
    query.set("page", page);
  }
  if (medico) {
    query.set("medico_id", medico);
  }
  if (estadoCita) {
    query.set("estadoCita", estadoCita);
  }
   if (fecha) {
    query.set("fecha", fecha);
  }
  
//   if (searchParams.has("fecha")) {
//   const fecha = searchParams.get("fecha");
//   if (fecha) {
//     query.set("fecha_after", fecha);
//     query.set("fecha_before", fecha);
//   }
// }
//   if (pageSize) {
//     query.set("page_size", pageSize);
//   }
  // if (paciente) {
  //   query.set("nomb_pac", paciente);
  // }

  const url = `/api/citas/?${query.toString()}`;
  console.log("Fetching citas from URL:", url);
  
  return await authFetchWithCookies(url);
 
}

export async function POST(req: NextRequest) {
  const body = await req.json();
   console.log("Datos recibidos en backend:", body);
  const url = `/api/citas/`;

  return await authFetchWithCookies(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

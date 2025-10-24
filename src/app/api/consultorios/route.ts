
import { NextRequest } from "next/server";
import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = new URLSearchParams();

  const page = searchParams.get("page");
  const pageSize = searchParams.get("page_size");
  const clinica = searchParams.get("clinica");
//   const fechaRegistroAfter = searchParams.get("fecha_registro_after");
//   const fechaRegistroBefore = searchParams.get("fecha_registro_before");

  if (page) {
    query.set("page", page);
  }
  if (pageSize) {
    query.set("page_size", pageSize);
  }
  if (clinica) {
    query.set("clinica", clinica);
  }
//   if (fechaRegistroAfter) {
//     query.set("fecha_registro_after", fechaRegistroAfter);
//   }
//   if (fechaRegistroBefore) {
//     query.set("fecha_registro_before", fechaRegistroBefore);
//   }

  const url = `/api/consultorios/?${query.toString()}`;
  console.log("Fetching pacientes from URL:", url);
  
  return await authFetchWithCookies(url);
 
}
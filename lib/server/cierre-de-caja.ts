// import { CierreCaja } from "@/lib/types/cierre-de-caja/cierreCaja";

// export async function getCierreDeCaja(): Promise<CierreCaja> {
//   console.log("Fetching cierre de caja desde /api/cierre-de-caja");
  

//   const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/cierre-de-caja`, {
//     cache: "no-store",
//   });
// console.log(res.statusText)
//   if (!res.ok) {
//     throw new Error(`Error ${res.status} al obtener cierre de caja`);
//   }

//   const data: CierreCaja = await res.json();
//   return data;
// }

import { authFetchWithCookies } from "@/lib/api/authFetch";
import { CierreCaja } from "@/lib/types/cierre-de-caja/cierreCaja";

export async function getCierreDeCaja(): Promise<CierreCaja> {
  const data = await authFetchWithCookies("/api/cierre-de-caja");
  return data as unknown as CierreCaja;
}

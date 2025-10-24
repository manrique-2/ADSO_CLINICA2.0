// lib/server/medico.ts
import { cookies } from "next/headers";
import { BASE_API } from "@/lib/config";

export async function getMedicosByUsuario(): Promise<any[]> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      console.error("Token no encontrado");
      return [];
    }

    const res = await fetch(`${BASE_API}/api/medico_list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error al obtener médicos:", res.status);
      return [];
    }

    const medicos = await res.json();
    if (!Array.isArray(medicos)) {
      console.warn("Formato inesperado al obtener médicos:", medicos);
      return [];
    }

    return medicos;
  } catch (err) {
    console.error("Error en getMedicosByUsuario:", err);
    return [];
  }
}

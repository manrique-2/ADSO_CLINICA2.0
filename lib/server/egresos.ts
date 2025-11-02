// lib/server/egresos.ts
import { EgresoClinica } from "@/lib/types/egresos/egreso-clinica";
import { EgresoLab } from "@/lib/types/egresos/egreso-lab";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

export type ApiEgresosResponse = {
  clinica: EgresoClinica[];
  laboratorio: EgresoLab[];
  medico?: any[]; // opcional por ahora
};

export async function getAllEgresos(): Promise<ApiEgresosResponse> {
  try {
    const res = await fetch(
      
      `${BASE_URL}/api/egresos/?divide=true`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch egresos");
    console.log(res.json)

    return (await res.json()) as ApiEgresosResponse;
  } catch (error) {
    console.error("Error cargando egresos:", error);
    return {
      clinica: [],
      laboratorio: [],
      medico: [],
    };
  }
}

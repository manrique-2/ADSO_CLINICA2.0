import React from "react";
import HistorialPaciente from "@/src/components/historia-clinica/ver/HistorialPaciente";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";
import { getAlergiaMaps } from "@/lib/server/alergias/getAlergiaMaps";
import { authFetchWithCookies } from "@/lib/api/authFetch";
// interface PageProps {
//   params: {
//     id: string;
//   };
// }
type Params = Promise<{ id: string }>;

export default async function VerPacientePage({ params }: { params: Params }) {
  // const pacienteId = Number(params.id);
  const { id } = await params;
  const pacienteId = parseInt(id, 10);

  if (isNaN(pacienteId)) {
    return <div>ID de paciente inválido</div>;
  }
  // const { medicosMap, especialidadesMap, pacientesMap, alergiasMap } =
  //   await getNombreMaps();

  // // Fetch del historial desde el servidor
  // let historialData = [];
  // try {
  //   const res = await authFetchWithCookies(
  //     `/api/historial/?paciente=${pacienteId}`
  //   );
  //   if (res.ok) {
  //     historialData = await res.json();
  //   } else {
  //     console.error("Error al obtener historial:", res.status);
  //   }
  // } catch (error) {
  //   console.error("Error al hacer fetch del historial:", error);
  // }

  // ✅ Llamamos en paralelo para optimizar
  const [maps, alergiasMap, historialRes] = await Promise.all([
    getNombreMaps(),
    getAlergiaMaps(),
    authFetchWithCookies(`/api/historial/?paciente=${pacienteId}`),
  ]);

  let historialData = [];
  if (historialRes.ok) {
    historialData = await historialRes.json();
  } else {
    console.error("Error al obtener historial:", historialRes.status);
  }

  return (
    <div>
      <HistorialPaciente
        // paciente={pacienteId}
        historialData={historialData} // ✅ Datos listos
        medicosMap={maps.medicosMap}
        especialidadesMap={maps.especialidadesMap}
        // pacientesMap={maps.pacientesMap}
        enfermedadesMap={maps.enfermedadesMap}
        alergiasMap={alergiasMap}
      />
      {/* <Link href="/dashboard/historia-clinica/movimiento">
        <Button className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer">
          Atras
        </Button>
      </Link> */}
    </div>
  );
}

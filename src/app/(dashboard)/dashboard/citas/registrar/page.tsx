import React from "react";
import RegistrarCitaPage from "@/src/components/citas/registarCita/RegistrarCitaPage";
import { getUsuario } from "@/lib/server/usuario";
import { getMedicosByUsuario } from "@/lib/server/medicos/getMedicosByUsuario";

export default async function CitaRegistroPage() {
  // const { medicosMap, pacientesMap } = await getNombreMaps();
  const medicos = await getMedicosByUsuario();
  const usuario = await getUsuario();

  // console.log("Médicos obtenidos para el usuario:", medicos);
  // if (medicos.length === 0) {
  //   return (
  //     <div>
  //       <h2 className="text-2xl font-semibold mb-4">Registrar cita</h2>
  //       <p className="text-red-500">
  //         No hay médicos disponibles para tu usuario. Por favor, contacta al
  //         administrador.
  //       </p>
  //     </div>
  //   );
  // }
  return (
    <div>
      <h2 className="text-2xl font-semibold ">Registrar cita</h2>
      <RegistrarCitaPage
        medicos={medicos}
        usuario={usuario}
        // medicosMap={medicosMap}
        // pacientesMap={pacientesMap}
      />
    </div>
  );
}

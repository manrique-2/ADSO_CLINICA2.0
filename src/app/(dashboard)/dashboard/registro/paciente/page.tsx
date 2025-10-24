import React, { useEffect, useState } from "react";
// import { Calendar22 } from "@/src/components/date-picker";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { columns } from "@/src/components/paciente/columnas";
// import { DataTable } from "@/src/components/paciente/data-table";
import { getPacientes } from "@/lib/server/paciente";
import { PacienteListClient } from "@/src/components/paciente/PacienteListClient";

export default async function PacientesPage() {
  const { results } = await getPacientes(); // tipo Paciente[]

  return (
    <div>
      <h2 className="text-2xl font-semibold ">Gestión de Pacientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <PacienteListClient initialData={results} />
      </div>
    </div>
  );
}

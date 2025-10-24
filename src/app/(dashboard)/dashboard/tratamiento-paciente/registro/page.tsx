import { getTratamientoPaciente } from "@/lib/server/tratamiento-paciente";
import { ListTratamientoPaciente } from "@/src/components/tratamiento-paciente/ListTratamientoPaciente";
import React from "react";

export default async function page() {
  const { results } = await getTratamientoPaciente();
  return (
    <div>
      {" "}
      <h2 className="text-2xl font-semibold ">Tratamiento de Pacientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <ListTratamientoPaciente
          initialData={results}
        ></ListTratamientoPaciente>
      </div>
    </div>
  );
}

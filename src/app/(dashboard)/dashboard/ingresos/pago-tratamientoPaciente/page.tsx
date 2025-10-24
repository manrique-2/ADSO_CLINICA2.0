import { getIngresos } from "@/lib/server/ingresos";
import { ListPagoTratamientoPaciente } from "@/src/components/ingresos/ListPagoTratamientoPaciente";
import React from "react";

export default async function PagoTratamientoPacientePage() {
  const { results } = await getIngresos();
  return (
    <div>
      {" "}
      <h2 className="text-2xl font-semibold ">Pago del Tratamiento</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <ListPagoTratamientoPaciente
          initialData={results}
        ></ListPagoTratamientoPaciente>
      </div>
    </div>
  );
}

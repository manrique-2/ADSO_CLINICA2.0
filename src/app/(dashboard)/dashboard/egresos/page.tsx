import { getAllEgresos } from "@/lib/server/egresos";
import { ListEgresos } from "@/src/components/egresos/ListEgresos";
import React from "react";

export default async function EgresosPage() {
  const { clinica, laboratorio } = await getAllEgresos();
  return (
    <div>
      {" "}
      <h2 className="text-2xl font-semibold ">Registro de Egresos</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <ListEgresos
          initialData={{ dataClinica: clinica, dataLab: laboratorio }}
        ></ListEgresos>
      </div>
    </div>
  );
}

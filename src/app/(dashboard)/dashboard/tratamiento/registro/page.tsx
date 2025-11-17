import React from "react";
import { TratamientosList } from "@/src/components/tratamiento/TratamientosList";
import { getTratamientos } from "@/lib/server/tratamientos";

export default async function TratamientoRegistroPage() {
  const { results } = await getTratamientos();

  return (
    <div>
      <h2 className="text-2xl font-semibold ">Listado de Tratamientos</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <TratamientosList initialData={results}></TratamientosList>
      </div>
    </div>
  );
}

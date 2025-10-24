import AgendaList from "@/src/components/citas/agenda/AgendaList";
import React from "react";
// import { getCitas } from "@/lib/server/citas";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";

export default async function AgendaPage() {
  // const { results } = await getCitas(); // tipo Paciente[]
  // const { pacientesMap, medicosMap } = await getNombreMaps();

  // const res = await fetch(`${process.env.SITE_URL}/api/get-nombres-maps`, { //luego lo implemento bien
  //   cache: "no-store", // evita caching
  // });
  // const { pacientesMap, medicosMap } = await res.json();
  // console.log(res.status, await res.text());

  return (
    <div>
      <h2 className="text-2xl font-semibold ">Agenda</h2>
      <AgendaList
      // initialData={results}
      // pacientesMap={pacientesMap}
      // medicosMap={medicosMap}
      />
    </div>
  );
}

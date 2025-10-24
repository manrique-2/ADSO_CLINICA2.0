import { MovimientoList } from "@/src/components/historia-clinica/movimientoList";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";

export default async function MovimientoPage() {
  // const { results } = await getPacientes(); // tipo Paciente[]
  // const { medicosMap, pacientesMap } = await getNombreMaps();
  return (
    <div>
      <h2 className="text-2xl font-semibold ">Historia odontologica</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <MovimientoList
        // initialData={results}
        // medicosMap={medicosMap}
        // pacientesMap={pacientesMap}
        />
      </div>
    </div>
  );
}

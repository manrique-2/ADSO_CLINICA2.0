import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCitaByIdServer } from "@/src/app/api/citas/[id]/get-citas";
import { Calendar28 } from "@/src/components/date-picker2";
import { FormEditarCita } from "@/src/components/citas/agenda/editar/editar-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";
import { getUsuario } from "@/lib/server/usuario";

type Params = Promise<{ id: string }>;

export default async function EditarCitaPage({ params }: { params: Params }) {
  // Espera a que params esté disponible
  const { id } = await params;
  const { medicosMap } = await getNombreMaps();
  const usuario = await getUsuario();

  try {
    const cita = await getCitaByIdServer(id);

    if (!cita) {
      return (
        <div className="p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Cita no encontrado
          </div>
          <Link href="/dashboard/citas/agenda">
            <Button className="mt-4 bg-[#337ab7] hover:bg-[#286090] text-white">
              <ArrowLeft className="mr-2" />
              Volver al listado
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="p-">
        <h1 className="text-xl font-medium mb-4">Editar Cita</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Panel izquierdo */}
          <div className="bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
            <div className="flex flex-col items-center justify-center">
              <div className="w-fit rounded-full border-4 border-blue-500">
                <div className="bg-blue-500 w-[100px] h-[100px] rounded-full border-4 border-white"></div>
              </div>
              <p className="text-gray-500 mt-2">Cita {cita.id}</p>
            </div>

            <Separator className="my-4 bg-gray-300" />

            {/* <div className="mt-4">
              <p className="text mt-2 font-medium mb-1">Fecha de registro:</p>
              <div className="flex items-center">
                <Calendar28 />
              </div>
            </div> */}

            <Separator className="my-4 bg-gray-300" />

            <div className="mt-6">
              <Link href="/dashboard/citas/agenda">
                <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white">
                  <ArrowLeft className="mr-2" />
                  Regresar
                </Button>
              </Link>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="bg-white p-6 rounded-md shadow-sm col-span-3 border-t-4 border-blue-500">
            <FormEditarCita
              cita={cita}
              medicosOptions={Object.entries(medicosMap).map(([id, medico]) => {
                const m = medico as { name: string; clinica: number };
                return {
                  id: Number(id),
                  name: m.name,
                  clinica: m.clinica,
                };
              })}
              usuario={usuario}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching cita:", error);
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Ocurrió un error al cargar el cita
        </div>
        <Link href="/dashboard/citas/agenda">
          <Button className="mt-4 bg-[#337ab7] hover:bg-[#286090] text-white">
            <ArrowLeft className="mr-2" />
            Volver al listado
          </Button>
        </Link>
      </div>
    );
  }
}

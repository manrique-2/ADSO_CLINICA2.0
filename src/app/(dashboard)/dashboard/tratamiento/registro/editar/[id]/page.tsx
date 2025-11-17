import { getTratamientoByIdServer } from "@/src/app/api/tratamientos/[id]/get-tratamientos";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormEditarTratamiento from "@/src/components/tratamiento/editarTratamiento/formEditarTratamiento";

type Params = Promise<{ id: string }>;

export default async function EditarTratamientoPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  try {
    const tratamiento = await getTratamientoByIdServer(id);

    if (!tratamiento) {
      return (
        <div className="p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Tratamiento no encontrado
          </div>
          <Link href="/dashboard/tratamiento/registro">
            <Button className="mt-4 bg-[#337ab7] hover:bg-[#286090] text-white">
              <ArrowLeft className="mr-2" />
              Volver al listado
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Editar Tratamiento</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Columna izquierda - botón regresar */}
          <div className="bg-white p-6 rounded-md shadow-md border-t-4 border-blue-500 h-fit">
            <Link href="/dashboard/tratamiento/registro">
              <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white">
                <ArrowLeft className="mr-2" />
                Regresar
              </Button>
            </Link>
          </div>

          {/* Columna derecha - formulario */}
          <div className="bg-white p-6 rounded-md shadow-md border-t-4 border-blue-500 col-span-4">
            <FormEditarTratamiento tratamiento={tratamiento} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error cargando tratamiento:", error);
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Ocurrió un error al cargar el tratamiento
        </div>
        <Link href="/dashboard/tratamiento/registro">
          <Button className="mt-4 bg-[#337ab7] hover:bg-[#286090] text-white">
            <ArrowLeft className="mr-2" />
            Volver al listado
          </Button>
        </Link>
      </div>
    );
  }
}

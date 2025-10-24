import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUsersByIdServer } from "@/src/app/api/users/[id]/get-users";
import { EditarUserForm } from "@/src/components/usuarios/editar/editarUserForm";
import { register } from "module";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";

type Params = Promise<{ id: string }>;

export default async function EditarUsuariosPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  // const { especialidadesMap } = await getNombreMaps();

  // const especialidadesOptions = Object.entries(especialidadesMap).map(
  //   ([id, nombre]) => ({
  //     id: Number(id),
  //     nombre,
  //   })
  // );

  try {
    const user = await getUsersByIdServer(id);

    if (!user) {
      return (
        <div className="p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Paciente no encontrado
          </div>
          <Link href="/dashboard/gestion-usuarios/usuarios">
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
        <h1 className="text-xl font-medium mb-4">Editar Usuario</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Panel izquierdo */}
          <div className="bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
            <div className="flex flex-col items-center justify-center">
              <div className="w-fit rounded-full border-4 border-blue-500">
                <div className="bg-blue-500 w-[100px] h-[100px] rounded-full border-4 border-white"></div>
              </div>
              <p className="text-gray-500 mt-2">Usuario:</p>
            </div>
            <Separator className="my-4 bg-gray-300" />
            <div className="flex justify-center font-medium uppercase text-center">
              {user.name}
            </div>

            <Separator className="my-4 bg-gray-300" />

            <div className="mt-6">
              <Link href="/dashboard/gestion-usuarios/usuarios">
                <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer">
                  <ArrowLeft className="mr-2" />
                  Regresar
                </Button>
              </Link>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="bg-white p-6 rounded-md shadow-sm col-span-3 border-t-4 border-blue-500">
            <EditarUserForm
              usuario={user}
              // especialidadesOptions={especialidadesOptions}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching paciente:", error);
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Ocurrió un error al cargar el paciente
        </div>
        <Link href="/dashboard/gestion-usuarios/usuarios">
          <Button className="mt-4 bg-[#337ab7] hover:bg-[#286090] text-white">
            <ArrowLeft className="mr-2" />
            Volver al listado
          </Button>
        </Link>
      </div>
    );
  }
}

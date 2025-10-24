import { Button } from "@/components/ui/button";
import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";
import NuevoUser from "@/src/components/usuarios/nuevo/NuevoUser";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function RegistrarUsuariosPage() {
  const { especialidadesMap } = await getNombreMaps();
  return (
    <div>
      <h1 className="text-xl font-medium">Registro de Usuarios</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        <div className=" bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
          <Link className="w-full" href="/dashboard/gestion-usuarios/usuarios">
            <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer">
              <ArrowLeft className=" hover:" />
              Regresar
            </Button>
          </Link>
        </div>
        <div className="rounded-md shadow-s col-span-4 border-t-4 border-blue-500">
          <NuevoUser especialidadesMap={especialidadesMap} />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
// import { Calendar22 } from "@/src/components/date-picker";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { columns } from "@/src/components/paciente/columnas";
// import { DataTable } from "@/src/components/paciente/data-table";
import { getMedicos } from "@/lib/server/medico";
import { OdontologoList } from "@/src/components/odontologos/OdontologoList";
// import { getUsuario } from "@/lib/server/usuario";
// import { redirect } from "next/navigation";
import ProtectedPage from "@/src/components/auth/ProtectedPage";

export default async function OdontologosPage() {
  // const user = await getUsuario();

  // ⚠ Verificación de rol en servidor
  // if (!user || user.rol !== "admin") {
  //   redirect("/dashboard/acceso-denegado");
  // }

  const { results } = await getMedicos(); // tipo Paciente[]

  return (
    <ProtectedPage allowedRoles={["admin"]}>
      <div>
        {/* solo admin puede */}
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold mt-3">
            Gestión de Odontologos
          </h2>
          {/* <p className="text-red-600 font-semibold">(SOLO ES VISUAL)</p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <OdontologoList initialData={results} />
        </div>
      </div>
      //{" "}
    </ProtectedPage>
  );
}

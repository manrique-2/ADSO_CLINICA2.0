// src/app/dashboard/tratamiento/registrar/nuevo/page.tsx
"use client";

import React from "react";
import FormRegistroTratamiento from "@/src/components/tratamiento/registrotratamiento/RegistroTratamiento";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NuevoTratamientoPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Registro de Tratamientos</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
{/* Columna izquierda - botón regresar */}
        <div className="bg-white p-6 rounded-md shadow-md border-t-4 border-blue-500 h-fit">
          <Link href="/dashboard/tratamiento/registrar">
            <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white">
              <ArrowLeft className="mr-2" />
              Regresar
            </Button>
          </Link>
        </div>

{/* Columna derecha - formulario */}
        <div className="bg-white p-6 rounded-md shadow-md border-t-4 border-blue-500 col-span-4">
          <FormRegistroTratamiento />
        </div>
      </div>
    </div>
  );
}

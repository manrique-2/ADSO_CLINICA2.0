"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import FormEgresoClinica from "src/components/egresos/nuevoegreso/formEgresoClinica";

export default function EgresoClinicaPage() {
  return (
    <div>
      <h1 className="text-xl font-medium">Registrar Egreso de Clínica</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-fit rounded-full border-4 border-blue-500">
              <div className="bg-blue-500 w-[100px] h-[100px] rounded-full border-4 border-white" />
            </div>
          </div>

          <Separator className="my-4 bg-gray-300" />

          <div className="mt-4">
            <p className="font-medium mb-2">Fecha de registro:</p>
            <div className="flex items-center">
              <Input
                disabled
                type="date"
                value={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <Separator className="my-4 bg-gray-300" />

          <div className="mt-6 flex justify-center">
            <Link href="/dashboard/egresos">
              <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer">
                <ArrowLeft />
                Regresar
              </Button>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm col-span-3 border-t-4 border-blue-500">
          <FormEgresoClinica />
        </div>
      </div>
    </div>
  );
}

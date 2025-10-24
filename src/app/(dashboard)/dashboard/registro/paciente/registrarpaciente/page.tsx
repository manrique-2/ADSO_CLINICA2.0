"use client";
import React from "react";
import FormRegistro from "@/src/components/paciente/registropaciente/RegistroPaciente";
import { Calendar28 } from "@/src/components/date-picker2";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function RegistroPaciente() {
  return (
    <div className="">
      <h1 className="text-xl font-medium">Registro de Pacientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-fit rounded-full border-4 border-blue-500 ">
              <div className=" bg-blue-500 w-[100px] h-[100px] rounded-full border-4 border-white "></div>
            </div>
            <p className="text- text-gray-500">Paciente</p>
          </div>
          <Separator className="my-4 bg-gray-300" />
          <div className="mt-4">
            <p className="text mt-2 font-medium mb-1">Fecha de registro:</p>
            <div className="flex items-center">
              <Calendar28 />
            </div>
          </div>
          <Separator className="my-4 bg-gray-300" />
          <div className="mt-6  flex justify-center">
            <Link className="w-full" href="/dashboard/registro/paciente">
              <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer">
                <ArrowLeft className=" hover:" />
                Regresar
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-4 bg-white p-6 rounded-md shadow-s col-span-3 border-t-4 border-blue-500">
          <FormRegistro />
        </div>
      </div>
    </div>
  );
}

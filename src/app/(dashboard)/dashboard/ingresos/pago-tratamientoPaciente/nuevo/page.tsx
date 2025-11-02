"use client";
import React, { useEffect, useState } from "react";
// import FormRegistro from "@/src/components/paciente/registropaciente/RegistroPaciente";
import { Calendar28 } from "@/src/components/date-picker2";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import FormPagoTratamiento from "@/src/components/ingresos/nuevoingreso/formPagoTratamiento";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import { Input } from "@/components/ui/input";

export default function PagoTratamiento() {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [medicosOptions, setMedicosOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [pacientesOptions, setPacientesOptions] = useState<
    Array<{ id: number; nomb_pac: string; apel_pac: string }>
  >([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await fetchWithAuthRedirect("/api/medicos"); // Ajusta si necesitas paginación
        const data = await res.json();
        if (Array.isArray(data)) {
          setMedicosOptions(data);
        } else if (Array.isArray(data.results)) {
          setMedicosOptions(data.results);
        } else {
          console.warn("⚠️ Formato de datos inesperado:", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar :", err);
      }
    };

    fetchMedicos();
  }, []);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await fetchWithAuthRedirect("/api/pacientes?has_debt=true"); // Ajusta si necesitas paginación
        const data = await res.json();
        if (Array.isArray(data.results)) {
          setPacientesOptions(data.results);
        } else {
          console.warn("⚠️ No se encontró el array 'results':", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar pacientes:", err);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div className="">
      <h1 className="text-xl font-medium">Pagar Tratamiento</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-fit rounded-full border-4 border-blue-500 ">
              <div className=" bg-blue-500 w-[100px] h-[100px] rounded-full border-4 border-white "></div>
            </div>
            {/* <p className="text- text-gray-500">Paciente</p> */}
          </div>
          <Separator className="my-4 bg-gray-300" />
          <div className="mt-4">
            <p className="text mt-2 font-medium mb-2">Fecha de registro:</p>
            <div className="flex items-center">
              {/* <Calendar28 /> */}
              <Input
                disabled
                type="date"
                value={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <Separator className="my-4 bg-gray-300" />
          <div className="mt-6  flex justify-center">
            <Link
              className="w-full"
              href="/dashboard/ingresos/pago-tratamientoPaciente"
            >
              <Button className="w-full bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer">
                <ArrowLeft className=" hover:" />
                Regresar
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-4 bg-white p-6 rounded-md shadow-s col-span-3 border-t-4 border-blue-500">
          <FormPagoTratamiento
            pacientesOptions={pacientesOptions}
            medicosOptions={medicosOptions}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BriefcaseMedical,
  CalendarPlus2,
  ClipboardPlus,
  Files,
  Heart,
  Pill,
  SquareActivity,
  UserRound,
} from "lucide-react";
import { DatosPaciente } from "@/src/components/historia-clinica/ver/DatosPaciente";
import { DiagnosticoPaciente } from "@/src/components/historia-clinica/ver/diagnosticopaciente/DiagnosticoPaciente";
import { CitaPaciente } from "@/src/components/historia-clinica/ver/citapaciente/CitaPaciente";
import { HistorialResponse } from "lib/types/historial"; // Tipo de datos
import { EvolucionPaciente } from "@/src/components/historia-clinica/ver/evolucionpaciente/EvolucionPaciente";
import { PlacasPaciente } from "./placaspaciente/PlacasPaciente";
import { AlergiaPaciente } from "@/src/components/historia-clinica/ver/alergiapaciente/AlergiaPaciente";
import { TratamientoPaciente } from "@/src/components/historia-clinica/ver/tratamientopaciente/TratamientoPaciente";
import Link from "next/link";
// import { getNombreMaps } from "@/lib/server/citas/getNombreMaps";

const tabs = [
  { id: "datos", label: "Datos del Paciente", icon: <UserRound size="16" /> },
  { id: "diagnostico", label: "Diagnóstico", icon: <Heart size="16" /> },
  { id: "evolucion", label: "Evolución", icon: <SquareActivity size="16" /> },
  { id: "alergias", label: "Alergias", icon: <Pill size="16" /> },
  {
    id: "exam",
    label: "Exám. Auxliares Placas / Escaneo Intraoral",
    icon: <ClipboardPlus size="16" />,
  },
  {
    id: "tratamiento",
    label: "Tratamientos realizados",
    icon: <BriefcaseMedical size="16" />,
  },
  { id: "citas", label: "Citas", icon: <CalendarPlus2 size="16" /> },
];

interface HistorialPacienteProps {
  alergiasMap: Record<number, string>;
  // paciente: number;
  historialData: HistorialResponse;
  // pacientesMap: Record<
  //   number,
  //   { nombre: string; estado: string; edad: number; dni: string }
  // >;
  medicosMap: Record<number, string>;
  especialidadesMap: Record<number, string>;
  enfermedadesMap: Record<number, string>;
  // alergiasMap: Record<number, string>;
}

export default function HistorialPaciente({
  // paciente,
  alergiasMap,
  historialData,
  medicosMap,
  // pacientesMap,
  especialidadesMap,
  enfermedadesMap,
}: // alergiasMap,
HistorialPacienteProps) {
  const [historial, setHistorial] = useState<HistorialResponse>(historialData);
  const [tab, setTab] = useState("datos");
  const [error, setError] = useState(false);

  if (!historial) return <div>Cargando...</div>;

  const tabComponents: Record<string, React.ReactNode> = {
    datos: <DatosPaciente paciente={historial.paciente} />,
    diagnostico: (
      <DiagnosticoPaciente
        diagnosticos={historial.diagnosticos}
        // pacientesMap={pacientesMap}
        paciente={historial.paciente}
        enfermedadesMap={enfermedadesMap}
        selectedPacienteId={historial.paciente.id}
        error={error}
        onAddDiagnostico={(nueva) => {
          setHistorial((prev) =>
            prev
              ? {
                  ...prev,
                  diagnosticos: [nueva, ...(prev.diagnosticos || [])],
                }
              : prev
          );
        }}
      />
    ),
    alergias: (
      <AlergiaPaciente
        alergias={historial.alergias}
        // medicosMap={medicosMap}
        // especialidadesMap={especialidadesMap}
        // pacientesMap={pacientesMap}
        paciente={historial.paciente}
        alergiasMap={alergiasMap}
        error={error}
        selectedPacienteId={historial.paciente.id}
        onAddAlergia={(nueva) => {
          setHistorial((prev) =>
            prev
              ? {
                  ...prev,
                  alergias: [nueva, ...(prev.alergias || [])],
                }
              : prev
          );
        }}
      />
    ),
    exam: (
      <PlacasPaciente
        placas={historial.placas}
        // medicosMap={medicosMap}
        // pacientesMap={pacientesMap}
        paciente={historial.paciente}
        selectedPacienteId={historial.paciente.id}
        error={error}
        onAddPlacas={(nueva) => {
          setHistorial((prev) =>
            prev
              ? {
                  ...prev,
                  placas: [nueva, ...(prev.placas || [])],
                }
              : prev
          );
        }}
      />
    ),
    evolucion: (
      <EvolucionPaciente
        evoluciones={historial.evoluciones}
        medicosMap={medicosMap}
        // pacientesMap={pacientesMap}
        paciente={historial.paciente}
        especialidadesMap={especialidadesMap}
        selectedPacienteId={historial.paciente.id}
        onAddEvolucion={(nueva) => {
          setHistorial((prev) =>
            prev
              ? {
                  ...prev,
                  evoluciones: [nueva, ...(prev.evoluciones || [])],
                }
              : prev
          );
        }}
      />
    ),
    tratamiento: <TratamientoPaciente tratamientos={historial.tratamientos} />,
    citas: <CitaPaciente citas={historial.citas} medicosMap={medicosMap} />,
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Historia Clínica</h2>
      </div>
      <div className=" bg-white rounded-lg shadow-md border-t-3 border-blue-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {/* Lado derecho - Tabs */}
          <div className="col-span-1 md:col-span-1 borde rounded-md p- flex flex-col items-center order-2">
            {/* <div className="bg-blue-600 aspect-auto rounded-full p-12 mb-2"></div> */}
            <div className="w-fit rounded-full border-4 border-blue-500">
              <div className="bg-blue-500 w-[100px] h-[100px] rounded-full border-4 border-white"></div>
            </div>
            <p className="text-lg font-medium text-[#333333] mb-2">
              H.C: {historial.paciente.id}
            </p>
            <p className="uppercase text-center text-[14.5px]">
              {historial.paciente.nomb_pac} {historial.paciente.apel_pac}
            </p>
            <div className="w-full mt-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left p-2 border-b border-x border-t hover:text-  cursor-pointer ${
                    tab === t.id
                      ? "bg-[#337ab7] border-x-[#337ab7] border-t-[#337ab7] hover:bg-[#337ab7] text-white "
                      : "hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 text-[14.5px]">
                    {t.icon} {t.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contenido - Lado izquierdo */}
          <div className=" col-span-1 md:col-span-3  rounded-md order-1 ">
            {/* <Link href="/dashboard/historia-clinica/movimiento">
              <Button className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer w-f">
                Regresar
              </Button>
            </Link> */}
            <div className="h-">
              <div className="bg-[#337ab7] text-white py-2 px-4 rounded-t-sm">
                <p> {tabs.find((t) => t.id === tab)?.label || "Sección"}</p>
              </div>
              <div className=" p-4 border border-[#337ab7] rounded-b-sm ">
                {tabComponents[tab] || <p>Contenido no disponible.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

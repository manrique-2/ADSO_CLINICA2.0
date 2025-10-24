"use client";
import React, { useState } from "react";
import { DiagnosticoHistorial } from "lib/types/historial";
import { DataTable } from "@/src/components/historia-clinica/ver/components/data-table";
import { columns } from "@/src/components/historia-clinica/ver/diagnosticopaciente/columnas";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormDiagnostico from "@/src/components/historia-clinica/ver/diagnosticopaciente/FormDiagnostico";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Componente para mostrar la evolucion de un paciente en su historial.
 * @param diagnostico - Lista de evolucion del paciente.
 */
interface DiagnosticoPacienteProps {
  diagnosticos: DiagnosticoHistorial[];
  enfermedadesMap: Record<number, string>;
  paciente: { id: number; nomb_pac: string };
  // pacientesMap: Record<
  //   number,
  //   { nombre: string; estado: string; edad: number; dni: string }
  // >;
  error: boolean;
  selectedPacienteId: number; //
  onAddDiagnostico?: (evo: DiagnosticoHistorial) => void;
  // enfermedadMap: Record<number, string>;
}

export function DiagnosticoPaciente({
  diagnosticos,
  paciente,
  enfermedadesMap,
  selectedPacienteId,
  onAddDiagnostico,
  error,
}: // enfermedadMap,
DiagnosticoPacienteProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false); // para controlar el modal

  // Simulamos paginación local (ya que citas es un array estático)
  const diagnosticoSeguro: DiagnosticoHistorial[] = Array.isArray(diagnosticos)
    ? diagnosticos
    : [];
  // const diagnosticoSeguro = diagnostico ?? []; // si es null/undefined, será []
  const totalPages = Math.ceil(diagnosticoSeguro.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const diagnosticoPaginadas = diagnosticoSeguro.slice(start, end);

  const handleSuccess = async () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <p className="mb-4 text-[14.5px] text-gray-500">Listado de citas</p> */}
      <div className="mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer flex items-center gap-0.5"
            >
              <Plus />
              Agregar
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agregar diagnostico</DialogTitle>
              <DialogDescription>
                Aquí puedes registrar una nueva diagnostico para el paciente.
              </DialogDescription>
            </DialogHeader>

            <FormDiagnostico
              // pacientesOptions={Object.entries(pacientesMap).map(([id, p]) => ({
              //   id: Number(id),
              //   nombre: p.nombre,
              // }))}
              pacientesOptions={[paciente]}
              enfermedadesOptions={Object.entries(enfermedadesMap).map(
                ([id, en]) => ({
                  id: Number(id),
                  descripcion: en,
                })
              )}
              selectedPacienteId={selectedPacienteId}
              onSuccess={handleSuccess}
              onAddDiagnostico={onAddDiagnostico}
            />

            {/* <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={() => setOpen(false)}>Guardar</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <DataTable
          columns={columns({ enfermedadesMap })}
          // data={citas}
          // page={1}
          // totalPages={1}
          // setPage={() => {}}
          // // pagination
          // // pageSize={1}
          data={diagnosticoPaginadas}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          emptyMessage={
            error
              ? "No se pudo cargar la lista de diagnosticos. Verifica tu sesión o conexión."
              : "No hay diagnosticos registrados por el momento."
          }
        />
      </div>
    </div>
  );
}

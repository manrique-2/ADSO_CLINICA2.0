"use client";
import React, { useEffect, useState } from "react";
import { AlergiaHistorial } from "lib/types/historial";
import { DataTable } from "@/src/components/historia-clinica/ver/components/data-table";
import { columns } from "@/src/components/historia-clinica/ver/alergiapaciente/columnas";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAlergia from "@/src/components/historia-clinica/ver/alergiapaciente/FormAlergia";

/**
 * Componente para mostrar la evolucion de un paciente en su historial.
 * @param alergia - Lista de evolucion del paciente.
 */
interface AlergiaPacienteProps {
  alergias: AlergiaHistorial[];
  // medicosMap: Record<number, string>;
  // especialidadesMap: Record<number, string>;
  paciente: { id: number; nomb_pac: string };
  // pacientesMap: Record<
  //   number,
  //   { nombre: string; estado: string; edad: number; dni: string }
  // >;
  alergiasMap: Record<number, string>;
  error: boolean;
  selectedPacienteId: number; //
  onAddAlergia?: (evo: AlergiaHistorial) => void;
}

export function AlergiaPaciente({
  alergias,
  // medicosMap,
  // especialidadesMap,
  paciente,
  alergiasMap,
  error,
  selectedPacienteId,
  onAddAlergia,
}: AlergiaPacienteProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false); // para controlar el modal
  // const [error, setError] = useState(false);

  // Simulamos paginación local (ya que citas es un array estático)
  const alergiaSeguro = alergias ?? []; // si es null/undefined, será []
  const totalPages = Math.ceil(alergiaSeguro.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const alergiaPaginadas = alergiaSeguro.slice(start, end);

  const handleSuccess = async () => {
    setOpen(false);
    // await fetchEvoluciones(); // refresca la lista al guardar
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
              <DialogTitle>Agregar alergia</DialogTitle>
              <DialogDescription>
                Aquí puedes registrar una nueva evolución para el paciente.
              </DialogDescription>
            </DialogHeader>

            <FormAlergia
              // medicosOptions={medicosOptions}
              alergiasOptions={Object.entries(alergiasMap).map(
                ([id, nombre]) => ({
                  id: Number(id),
                  nombre_ale: nombre,
                })
              )}
              pacientesOptions={[paciente]}
              // pacientesOptions={Object.entries(pacientesMap).map(([id, p]) => ({
              //   id: Number(id),
              //   nombre: p.nombre,
              // }))}
              // especialidadesOptions={especialidadesOptions}
              selectedPacienteId={selectedPacienteId}
              onSuccess={handleSuccess}
              onAddAlergia={onAddAlergia}
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
          columns={columns({ alergiasMap })}
          // data={citas}
          // page={1}
          // totalPages={1}
          // setPage={() => {}}
          // // pagination
          // // pageSize={1}
          data={alergiaPaginadas}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          emptyMessage={
            error
              ? "No se pudo cargar la lista de alergias. Verifica tu sesión o conexión."
              : "No hay alergias registrados por el momento."
          }
        />
      </div>
    </div>
  );
}

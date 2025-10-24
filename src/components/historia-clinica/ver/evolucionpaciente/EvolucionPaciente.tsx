"use client";
import React, { useEffect, useState } from "react";
import { EvolucionHistorial } from "lib/types/historial";
import { DataTable } from "@/src/components/historia-clinica/ver/components/data-table";
import { columns } from "@/src/components/historia-clinica/ver/evolucionpaciente/columnas";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import FormEvolucion from "@/src/components/historia-clinica/ver/evolucionpaciente/FormEvolucion";

/**
 * Componente para mostrar la evolucion de un paciente en su historial.
 * @param evolucion - Lista de evolucion del paciente.
 */
interface EvoPacienteProps {
  evoluciones: EvolucionHistorial[];
  paciente: { id: number; nomb_pac: string }; // el paciente actual
  // pacientesMap: Record<
  //   number,
  //   { nombre: string; estado: string; edad: number; dni: string }
  // >;
  medicosMap: Record<number, string>;
  especialidadesMap: Record<number, string>;
  selectedPacienteId: number; //
  onAddEvolucion?: (evo: EvolucionHistorial) => void;
}

export function EvolucionPaciente({
  evoluciones,
  medicosMap,
  paciente,
  especialidadesMap,
  selectedPacienteId,
  onAddEvolucion,
}: EvoPacienteProps) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false); // para controlar el modal
  const [error, setError] = useState(false);

  // Simulamos paginación local (ya que citas es un array estático)
  const evolucionSeguro: EvolucionHistorial[] = Array.isArray(evoluciones)
    ? evoluciones
    : [];
  const totalPages = Math.ceil(evolucionSeguro.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const evolucionPaginadas = evolucionSeguro.slice(start, end);

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
              <DialogTitle>Agregar evolución</DialogTitle>
              <DialogDescription>
                Aquí puedes registrar una nueva evolución para el paciente.
              </DialogDescription>
            </DialogHeader>

            <FormEvolucion
              medicosOptions={Object.entries(medicosMap).map(
                ([id, nombre]) => ({
                  id: Number(id),
                  name: nombre,
                })
              )}
              // pacientesOptions={pacientesOptions}
              pacientesOptions={[paciente]}
              especialidadesOptions={Object.entries(especialidadesMap).map(
                ([id, e]) => ({
                  id: Number(id),
                  nombre: e,
                })
              )}
              selectedPacienteId={selectedPacienteId}
              onSuccess={handleSuccess}
              onAddEvolucion={onAddEvolucion}
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
          columns={columns({ medicosMap, especialidadesMap })}
          // data={citas}
          // page={1}
          // totalPages={1}
          // setPage={() => {}}
          // // pagination
          // // pageSize={1}
          data={evolucionPaginadas}
          loading={loading}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          emptyMessage={
            error
              ? "No se pudo cargar la lista de evoluciones. Verifica tu sesión o conexión."
              : "No hay evolucion registrados por el momento."
          }
        />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { PlacasHistorial } from "lib/types/historial";
import { DataTable } from "@/src/components/historia-clinica/ver/components/data-table";
import { columns } from "@/src/components/historia-clinica/ver/placaspaciente/columnas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormPlacas from "./FormPlacas";

/**
 * Componente para mostrar la placa de un paciente en su historial.
 * @param placa - Lista de placa del paciente.
 */
interface PlacaPacienteProps {
  placas: PlacasHistorial[];
  paciente: { id: number; nomb_pac: string };
  // pacientesMap: Record<
  //   number,
  //   { nombre: string; estado: string; edad: number; dni: string }
  // >;
  // medicosMap: Record<number, string>;
  error: boolean;
  selectedPacienteId: number; //
  onAddPlacas?: (evo: PlacasHistorial) => void;
}

export function PlacasPaciente({
  placas,
  paciente,
  // medicosMap,
  error,
  selectedPacienteId,
  onAddPlacas,
}: PlacaPacienteProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false); // para controlar el modal

  // const [pacientesOptions, setPacientesOptions] = useState<
  //   Array<{ id: number; nomb_pac: string; apel_pac: string }>
  // >([]);

  // useEffect(() => {
  //   const fetchPacientes = async () => {
  //     try {
  //       const res = await fetch("/api/pacientes"); // Ajusta si necesitas paginación
  //       const data = await res.json();
  //       if (Array.isArray(data.results)) {
  //         setPacientesOptions(data.results);
  //       } else {
  //         console.warn("⚠️ No se encontró el array 'results':", data);
  //       }
  //     } catch (err) {
  //       console.error("❌ Error al cargar pacientes:", err);
  //     }
  //   };

  //   fetchPacientes();
  // }, []);

  // Simulamos paginación local (ya que citas es un array estático)
  const placaSeguro = placas ?? [];
  const totalPages = Math.ceil(placaSeguro.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const placasPaginadas = placaSeguro.slice(start, end);

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
              <DialogTitle>Agregar placa</DialogTitle>
              <DialogDescription>
                Aquí puedes registrar una nueva placa para el paciente.
              </DialogDescription>
            </DialogHeader>

            <FormPlacas
              // medicosOptions={medicosOptions}
              // alergiasOptions={alergiasOptions}
              // pacientesOptions={Object.entries(pacientesMap).map(([id, p]) => ({
              //   id: Number(id),
              //   nombre: p.nombre,
              // }))}
              pacientesOptions={[paciente]}
              // especialidadesOptions={especialidadesOptions}
              selectedPacienteId={selectedPacienteId}
              onSuccess={handleSuccess}
              onAddPlacas={onAddPlacas}
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
          columns={columns}
          // data={citas}
          // page={1}
          // totalPages={1}
          // setPage={() => {}}
          // // pagination
          // // pageSize={1}
          data={placasPaginadas}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          emptyMessage={
            error
              ? "No se pudo cargar la lista de placas. Verifica tu sesión o conexión."
              : "No hay placas registrados por el momento."
          }
        />
      </div>
    </div>
  );
}

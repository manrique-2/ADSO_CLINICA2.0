"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Cita } from "@/lib/types/cita";
import { string } from "zod";
import { Button } from "@/components/ui/button";

export type SlotCita = {
  hora: string;
  fecha: string;
  medico?: string;
  id?: number;
  // paciente?: string;
  paciente?: {
    id: number;
    name: string;
  };
  secuencia?: number;
  // observaciones?: string;
  estadoCita?: string;
};

export const getColumns = (
  setShowModal: (v: boolean) => void,
  setSelectedSlot: (slot: SlotCita) => void
  // pacientesMap: Record<
  //   number,
  //   {
  //     nombre: string;
  //     estado: string;
  //     edad: number;
  //     dni: string;
  //     telefono: string;
  //   }
  // >
): ColumnDef<SlotCita>[] => [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: ({ row }) => row.original.id ?? "—",
  // },
  {
    accessorKey: "hora",
    header: "Hora",
  },
  {
    id: "seleccionar",
    header: "Seleccionar hora",
    cell: ({ row }) => {
      const slot = row.original;
      const estaOcupado = !!slot.paciente;
      // return (
      //   <Button
      //     size="sm"
      //     variant="ghost"
      //     className="cursor-pointer hover:bg-gray-300"
      //     onClick={() => {
      //       setSelectedSlot(slot);
      //       setShowModal(true);
      //     }}
      //   >
      //     Seleccionar
      //   </Button>
      return estaOcupado ? (
        <Button size="sm" variant="destructive" disabled>
          Ocupado
        </Button>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="cursor-pointer hover:bg-gray-300"
          onClick={() => {
            setSelectedSlot(slot);
            setShowModal(true);
          }}
        >
          Seleccionar
        </Button>
      );
    },
  },

  //solo se muestra el id del paciente, que es lo mismo que el numero de Historia
  {
    accessorKey: "paciente",
    header: "Historia",
    cell: ({ row }) => row.original.paciente?.id ?? "—",
  },
  {
    id: "paciente_nombre",
    header: "Paciente",
    // cell: ({ row }) => row.original.paciente ?? "—",
    cell: ({ row }) => {
      const paciente = row.original.paciente;
      return paciente?.name ?? "—";
    },
  },
  {
    accessorKey: "id",
    header: "Secuencia",
    cell: ({ row }) => row.original.id ?? "—",
  },
  // {
  //   accessorKey: "observaciones",
  //   header: "Observaciones",
  //   cell: ({ row }) => row.original.observaciones ?? "—",
  // },
  {
    accessorKey: "estadoCita",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.estadoCita ?? "—";
      // Opcional: mostrar etiquetas con colores según estado
      const estadoMap: Record<string, string> = {
        PENDIENTE: "Pendiente",
        CONFIRMADA: "Confirmada",
        CANCELADA: "Cancelada",
        COMPLETADA: "Completada",
      };
      return estadoMap[estado] || estado;
    },
  },
];

"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ExternalLink,
  Eye,
  SquareMousePointer,
  SquarePen,
} from "lucide-react";
import { DataTableColumnHeader } from "@/src/components/paciente/data-table-column-header";
import { TratamientoHistorial } from "@/lib/types/historial";
import { toast } from "sonner";
import Link from "next/link";

// type ColumnProps = {
//   // pacientesMap: Record<number, string>;
//   medicosMap: Record<number, string>;
// };

export const columns: ColumnDef<TratamientoHistorial>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Secuencia" />
    ),
  },
  {
    accessorKey: "asunto",
    // header: "Hora de cita",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asunto tratamiento" />
    ),
  },
  {
    accessorKey: "created_at",
    // header: "Fecha de cita",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha " />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div className="text-sm">
          {date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },

  {
    accessorKey: "total",
    // header: "Hora de cita",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
  {
    accessorKey: "pago",
    // header: "Paciente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pago" />
    ),
  },

  {
    accessorKey: "ver",
    header: "Ver",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Ver" />
    // ),
  },
  // {
  //   id: "actions",
  //   header: "Opciones",
  //   cell: ({ row }) => {
  //     const historia = row.original;
  //     return (
  //       <div>
  //         <Link
  //           href={`/dashboard/historia-clinica/ver/${historia.paciente}`}
  //           className=""
  //         >
  //           <div className="cursor-pointer text-blue-700 hover:text-blue-500 font-medium flex gap-1 items-center">
  //             <span>Editar</span>
  //             <SquarePen size="15" />
  //           </div>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
// }

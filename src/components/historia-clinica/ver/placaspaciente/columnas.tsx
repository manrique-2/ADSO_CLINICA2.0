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
import { PlacasHistorial } from "@/lib/types/historial";
import { toast } from "sonner";
import Link from "next/link";

// type ColumnProps = {
//   // pacientesMap: Record<number, string>;
//   medicosMap: Record<number, string>;
// };

export const columns: ColumnDef<PlacasHistorial>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="N° cita" />
  //   ),
  // },

  // {
  //   accessorKey: "edad_pac",
  //   header: "Edad",
  //   // header: ({ column }) => (
  //   //   <DataTableColumnHeader column={column} title="Edad" />
  //   // ),
  //   cell: ({ row }) => {
  //     const edad = String(row.getValue("edad_pac"));
  //     return (
  //       <div className="text-sm">
  //         {edad} {edad === "1" ? "año" : "años"}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "dni_pac",
  //   header: "DNI",
  //   // header: ({ column }) => (
  //   //   <DataTableColumnHeader column={column} title="DNI" />
  //   // ),
  //   cell: ({ row }) => {
  //     const dni = String(row.getValue("dni_pac"));
  //     return (
  //       <div className="text-sm">
  //         {dni.length === 8 ? dni : "DNI inválido"}
  //       </div>
  //     );
  //   },
  // },
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
    accessorKey: "nombre",
    // header: "Hora de cita",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "notas",
    // header: "Hora de cita",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notas" />
    ),
  },
  // {
  //   accessorKey: "medico",
  //   // header: "Paciente",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Medico" />
  //   ),
  //   cell: ({ row }) => {
  //     const id = row.getValue("medico") as number;
  //     if (!medicosMap || typeof id !== "number") return "Desconocido";
  //     return medicosMap[id] ?? "Desconocido";
  //   },
  // },
  {
    accessorKey: "archivo",
    // header: "Tipo Citado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Archivo" />
    ),
    cell: ({ row }) => {
      const archivo = row.getValue("archivo") as string;
      return (
        <div>
          <a
            href={archivo}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-blue-700 hover:text-blue-500 font-medium flex gap-1 items-center"
          >
            <span>Ver archivo</span>
            <Eye size="15" />
          </a>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "especialidad",
  //   // header: "Tipo Citado",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Especialidad" />
  //   ),
  // },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const historia = row.original;
      return (
        <div>
          <Link
            href={`/dashboard/historia-clinica/ver/${historia.paciente}`}
            className=""
          >
            <div className="cursor-pointer text-blue-700 hover:text-blue-500 font-medium flex gap-1 items-center">
              <span>Editar</span>
              <SquarePen size="15" />
            </div>
          </Link>
        </div>
      );
    },
  },
];
// }

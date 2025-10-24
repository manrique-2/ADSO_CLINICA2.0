"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, Eye, SquarePen } from "lucide-react";
import { DataTableColumnHeader } from "@/src/components/paciente/data-table-column-header";
import { Cita } from "@/lib/types/cita";
import { toast } from "sonner";
import Link from "next/link";

type ColumnProps = {
  // pacientesMap: Record<number, string>;
  // medicosMap: Record<number, string>;
};

export function columns({}: // pacientesMap,
// medicosMap,
ColumnProps): ColumnDef<Cita>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="N° cita" />
      ),
    },

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
      accessorKey: "fecha",
      // header: "Fecha de cita",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de cita" />
      ),
    },
    {
      accessorKey: "hora",
      // header: "Hora de cita",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hora de cita" />
      ),
    },
    {
      accessorKey: "medico",
      // header: "Paciente",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Medico" />
      ),
      cell: ({ row }) => {
        const medico = row.original.medico;
        return medico?.name ?? "—";
      },
    },
    // {
    //   accessorKey: "estadoCita",
    //   // header: "Tipo Citado",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Tipo Citado" />
    //   ),
    // },
    {
      accessorKey: "consultorio",
      // header: "Tipo Citado",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Consultorio" />
      ),
      cell: ({ row }) => {
        const consultorio = row.original.consultorio;
        return consultorio?.nombreConsultorio ?? "—";
      },
    },
    {
      id: "actions",
      header: "Opciones",
      cell: ({ row }) => {
        const historia = row.original;
        return (
          <div>
            <Link href="#" className="">
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
}

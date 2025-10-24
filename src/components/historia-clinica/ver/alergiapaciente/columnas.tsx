"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, Eye, SquarePen } from "lucide-react";
import { DataTableColumnHeader } from "@/src/components/paciente/data-table-column-header";
import { AlergiaHistorial } from "@/lib/types/historial";
import { toast } from "sonner";
import Link from "next/link";

type ColumnProps = {
  // pacientesMap: Record<number, string>;
  // medicosMap: Record<number, string>;
  // especialidadesMap: Record<number, string>;
  alergiasMap: Record<number, string>;
};

export function columns({
  // pacientesMap,
  // especialidadesMap,
  // medicosMap,
  alergiasMap,
}: ColumnProps): ColumnDef<AlergiaHistorial>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Secuencia" />
      ),
    },
    {
      accessorKey: "alergia",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => {
        const id = row.getValue("alergia") as number;
        if (!alergiasMap || typeof id !== "number") return "Sin alergia";
        return alergiasMap[id] ?? "Sin alergia";
      },
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
    // {
    //   accessorKey: "created_at",
    //   // header: "Fecha de cita",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Fecha " />
    //   ),
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("created_at"));
    //     return (
    //       <div className="text-sm">
    //         {date.toLocaleDateString("es-ES", {
    //           year: "numeric",
    //           month: "2-digit",
    //           day: "2-digit",
    //           hour: "2-digit",
    //           minute: "2-digit",
    //         })}
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "observacion",
      // header: "Hora de cita",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Observacion" />
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
    // {
    //   accessorKey: "especialidad",
    //   // header: "Tipo Citado",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Especialidad" />
    //   ),
    //   cell: ({ row }) => {
    //     const id = row.getValue("especialidad") as number;
    //     // console.log("especialidad:", id, especialidadesMap);
    //     if (!especialidadesMap || typeof id !== "number") return "Desconocido";
    //     return especialidadesMap[id] ?? "Desconocido";
    //   },
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
}

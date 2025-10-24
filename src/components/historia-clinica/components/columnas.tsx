import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink, Eye } from "lucide-react";
import { DataTableColumnHeader } from "@/src/components/paciente/data-table-column-header";
import { Cita } from "@/lib/types/cita";
import Link from "next/link";

export function columns(): ColumnDef<Cita>[] {
  return [
    {
      accessorKey: "paciente",
      // header: "N°",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Historia" />
      ),
      cell: ({ row }) => {
        const historia = row.original;
        return historia.paciente.id;
      },
    },
    {
      id: "paciente_nombre",
      // header: "Paciente",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paciente" />
      ),
      cell: ({ row }) => {
        const paciente = row.original.paciente;
        return paciente?.name ?? "—";
      },
    },
    {
      id: "edad",
      header: "Edad",
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title="Edad" />
      // ),
      cell: ({ row }) => {
        const paciente = row.original.paciente;
        return paciente?.age ?? "—";
      },
    },
    {
      accessorKey: "dni_pac",
      header: "DNI",
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title="DNI" />
      // ),
      cell: ({ row }) => {
        const paciente = row.original.paciente;
        const dni = paciente?.dni ?? "—";
        return (
          <div className="text-sm">
            {dni.length === 8 ? dni : "DNI inválido"}
          </div>
        );
      },
    },
    {
      accessorKey: "fecha",
      header: "Fecha de cita",
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title="Fecha de cita" />
      // ),
    },
    {
      accessorKey: "hora",
      header: "Hora de cita",
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title="Hora de cita" />
      // ),
      // cell: ({ row }) => {
      //   const date = new Date(row.getValue("fecha_registro"));
      //   return (
      //     <div className="text-sm">
      //       {date.toLocaleDateString("es-ES", {
      //         year: "numeric",
      //         month: "2-digit",
      //         day: "2-digit",
      //         hour: "2-digit",
      //         minute: "2-digit",
      //       })}
      //     </div>
      //   );
      // },
    },
    {
      id: "estadopaciente",
      header: "Estado",
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title="Estado" />
      // ),
      cell: ({ row }) => {
        const paciente = row.original.paciente;
        const estado = paciente?.state ?? "Desconocido";
        return (
          <div>
            <span className="text-[10.5px] capitalize">
              {estado === "ACTIVO" ? (
                <div className="bg-green-600 py-[2px] px-[6px] rounded-sm w-fit text-white font-medium">
                  {estado}
                </div>
              ) : (
                <div className="bg-red-600 py-[2px] px-[6px] rounded-sm w-fit text-white font-medium">
                  {estado}
                </div>
              )}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Opciones",
      cell: ({ row }) => {
        const historia = row.original;
        // const router = useRouter();
        // const [loading, setLoading] = useState(false);

        return (
          // <div className="flex justify-center">
          //   <DropdownMenu>
          //     <DropdownMenuTrigger asChild>
          //       <Button
          //         variant="ghost"
          //         className="h-8 w-8 p-0 hover:bg-gray-400"
          //       >
          //         <span className="sr-only">Open menu</span>
          //         <MoreHorizontal className="h-4 w-4" />
          //       </Button>
          //     </DropdownMenuTrigger>
          //     <DropdownMenuContent align="end">
          //       <DropdownMenuSeparator />
          //       <DropdownMenuItem asChild className="cursor-pointer">
          //         <Link
          //           href={`/dashboard/historia-clinica/ver/${historia.paciente}`}
          //         >
          //           Ver historia
          //         </Link>
          //       </DropdownMenuItem>
          //     </DropdownMenuContent>
          //   </DropdownMenu>
          // </div>
          <div>
            <Link
              href={`/dashboard/historia-clinica/ver/${historia.paciente.id}`}
              className=""
            >
              <div className="cursor-pointer text-blue-700 hover:text-blue-500 font-medium flex gap-1 items-center">
                <span>Ver historia</span>
                <Eye size="18" />
              </div>
            </Link>
          </div>
        );
      },
    },
  ];
}

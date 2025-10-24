"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/src/components/paciente/data-table-column-header";
import { Medico } from "@/lib/types/medico";
import { eliminarPaciente } from "@/lib/actions/paciente";
import { toast } from "sonner";
import Link from "next/link";

export const columns: ColumnDef<Medico>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    // header: "N°",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N°" />
    ),
  },
  {
    accessorKey: "name",
    // header: "Paciente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Odontologo" />
    ),
    cell: ({ row }) => {
      const nombre = row.original.name || "--";
      // const apellido = row.original.apel_pac || "";
      return (
        <div className="uppercase">
          <span>{`${nombre}`}</span>
          {/* <span className="text-muted-foreground"> ({row.original.id})</span> */}
        </div>
      );
    },
  },
  {
    accessorKey: "especialidad",
    // header: "N°",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Especialidad" />
    ),
  },
  {
    accessorKey: "num_doc",
    // header: "DNI",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DNI" />
    ),
    cell: ({ row }) => {
      const dni = String(row.getValue("num_doc"));
      return (
        <div className="text-sm">{dni.length === 8 ? dni : "DNI inválido"}</div>
      );
    },
  },
  {
    accessorKey: "colegiatura",
    // header: "Dirección",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Colegiatura" />
    ),
  },
  {
    accessorKey: "date_joined", // 🔧 sin espacio
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="F. Registro" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_joined"));
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
    accessorKey: "estado",
    // header: "Estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const estado = String(row.getValue("estado"));
      return (
        <div>
          <span className="text-[10.5px] capitalize">
            {estado === "Activo" ? (
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
      const medico = row.original;
      // const router = useRouter();
      // const [loading, setLoading] = useState(false);

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-400">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(medico.name)}
              >
                Copiar nombre
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem asChild>
                <Link href={`/dashboard/registro/paciente/editar/${medico.id}`}>
                  Editar
                </Link>
              </DropdownMenuItem> */}
              {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="cursor-pointer px-2 py-1.5 text-sm hover:bg-muted rounded-sm">
                    Eliminar
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estás seguro de que deseas eliminar este paciente?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-red-600 font-medium">
                        - {medico.name} -
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#337ab7] hover:bg-[#285e8e]"
                      onClick={async () => {
                        // const [loading, setLoading] =useState(false)
                        // const router = useRouter();

                        try {
                          // setLoading(true);
                          await eliminarPaciente(medico.id);
                          toast.success("Paciente eliminado correctamente");
                          // puedes recargar los datos o mostrar un toast
                          // router.refresh();
                          window.location.reload();
                        } catch (error: any) {
                          // setLoading(false);
                          console.error(error);
                          toast.error("Error al eliminar paciente");
                          // puedes mostrar un toast de error aquí
                        }
                      }}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

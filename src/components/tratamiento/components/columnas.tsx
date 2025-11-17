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
import { Tratamiento } from "@/lib/types/tratamiento/tratamiento";
import { eliminarTratamiento } from "@/lib/actions/tratamiento";
import { toast } from "sonner";
import Link from "next/link";
import { eliminarUsers } from "@/lib/actions/users";

export const columns: ColumnDef<Tratamiento>[] = [
  {
    // id: "id",
    accessorKey: "id",
    // header: "°",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Secuencia" />
    ),
  },

  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "precioBase",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Precio" />
    ),
  },
  {
    accessorKey: "categoria",
    // header: "Dirección",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    // cell: ({ row }) => {
    //   const correo = String(row.getValue("email"));
    //   return (
    //     <div className="lowercase">{correo ? correo : "no hay email"}</div>
    //   );
    // },
  },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const tratamiento = row.original;
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
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(usuario.name)}
              >
                Copiar nombre
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/tratamiento/registro/editar/${tratamiento.id}`}
                >
                  Editar
                </Link>
              </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="cursor-pointer px-2 py-1.5 text-sm text-red-600 hover:bg-red-200 rounded-sm">
                      Eliminar
                    </div>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-[18px]">
                        ¿Eliminar este tratamiento?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <p className="text-black text-[16px]">
                          Esto eliminará de forma permanente el tratamiento{" "}
                          <span className="font-semibold">{tratamiento.nombre}</span>
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-[#e02e2a] hover:bg-[#e02d2acc] cursor-pointer"
                        onClick={async () => {
                          try {
                            await eliminarTratamiento(tratamiento.id);
                            toast.success("Tratamiento eliminado correctamente");
                            window.location.reload();
                          } catch (error) {
                            console.error(error);
                            toast.error("Error al eliminar tratamiento");
                          }
                        }}
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

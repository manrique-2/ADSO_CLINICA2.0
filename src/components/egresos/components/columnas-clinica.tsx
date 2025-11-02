"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/src/components/paciente/data-table-column-header";
import { EgresoClinica } from "@/lib/types/egresos/egreso-clinica";
import { eliminarEgreso } from "@/lib/actions/egresos";
import { toast } from "sonner";
import Link from "next/link";


export const columns: ColumnDef<EgresoClinica>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "monto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monto del gasto" />
    ),
    cell: ({ row }) => {
      const monto = row.getValue<number>("monto");
      return (
        <div className="text-sm font-medium">
          S/ {monto.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    cell: ({ row }) => {
      const desc = row.getValue<string | undefined>("description");
      return <span className="text-sm">{desc || "-"}</span>;
    },
  },
  {
    accessorKey: "fecha_registro",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha del egreso" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("fecha_registro"));
      return (
        <div className="text-sm">
          {date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registrado" />
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
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const egreso = row.original;

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
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(paciente.nomb_pac)}
              >
                Copiar nombre
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/egresos/egreso-clinica/editar/${egreso.id}`}
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
                      ¿Eliminar este egreso?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-black text-[16px] ">
                        Esto eliminará de forma permanente el egreso
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#e02e2a] hover:bg-[#e02d2acc] cursor-pointer"
                      onClick={async () => {
                        // const [loading, setLoading] =useState(false)
                        // const router = useRouter();

                        try {
                          // setLoading(true);
                          await eliminarEgreso(egreso.id);
                          toast.success("Egreso eliminado correctamente");
                          // puedes recargar los datos o mostrar un toast
                          // router.refresh();
                          window.location.reload();
                        } catch (error: any) {
                          // setLoading(false);
                          console.error(error);
                          toast.error("Error al eliminar el Egreso");
                          // puedes mostrar un toast de error aquí
                        }
                      }}
                    >
                      {/* {loading ? "Eliminando" : "Eliminar"} */}
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

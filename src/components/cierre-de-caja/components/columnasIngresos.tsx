"use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
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
import { Ingreso, CierreCaja } from "@/lib/types/cierre-de-caja/cierreCaja";
import { eliminarIngreso } from "@/lib/actions/ingresos";
import { toast } from "sonner";
import Link from "next/link";

export const columnsIngresos: ColumnDef<Ingreso>[] = [
  {
    accessorKey: "paciente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paciente" />
    ),
    // cell: ({ row }) => {
    //   const paciente = row.original.paciente;
    //   return paciente ?? "—";
    // },
  },
  {
    accessorKey: "medico",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Medico" />
    ),
    // cell: ({ row }) => {
    //   const medico = row.original.medico;
    //   return medico ?? "—";
    // },
  },
  {
    accessorKey: "monto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monto" />
    ),
    // cell: ({ row }) => {
    //   const monto = row.original.monto;
    //   return monto ?? "—";
    // },
  },
  {
    accessorKey: "metodo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metodo de pago" />
    ),
    // cell: ({ row }) => {
    //   const metodo = row.original.metodo;
    //   return metodo ?? "—";
    // },
  },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Fecha" />
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
  // {
  //   accessorKey: "total",
  //   // header: "DNI",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Total" />
  //   ),
  //   // cell: ({ row }) => {
  //   //   const rol = String(row.getValue("rol"));
  //   //   return <div className="capitalize">{rol ? rol : "no hay rol"}</div>;
  //   // },
  // },
  // {
  //   accessorKey: "pago",
  //   // header: "Dirección",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Pago" />
  //   ),
  //   // cell: ({ row }) => {
  //   //   const correo = String(row.getValue("email"));
  //   //   return (
  //   //     <div className="lowercase">{correo ? correo : "no hay email"}</div>
  //   //   );
  //   // },
  // },
  {
    id: "actions",
    header: "Opciones",
    cell: ({ row }) => {
      const ingreso = row.original;
      // const paciente = row.original.paciente_nombre;
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
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(paciente.nomb_pac)}
              >
                Copiar nombre
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                {/* <Link
                  href={`/dashboard/ingresos/pago-tratamientoPaciente/editar/${ingreso.id}`}
                >
                  Editar
                </Link> */}
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
                      ¿Eliminar este paciente?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-black text-[16px] ">
                        Esto eliminará de forma permanente el ingreso de{" "}
                        <span className="font-semibold">
                          {/* {tratamientoPaciente.tratamientoPaciente} de{" "} */}
                          {/* {paciente} */}
                        </span>
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
                          // await eliminarIngreso(ingreso.id);
                          toast.success("Ingreso eliminado correctamente");
                          // puedes recargar los datos o mostrar un toast
                          // router.refresh();
                          window.location.reload();
                        } catch (error: any) {
                          // setLoading(false);
                          console.error(error);
                          toast.error("Error al eliminar el Ingreso");
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

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
import { Users } from "@/lib/types/users";
// import { eliminarPaciente } from "@/lib/actions/paciente";
import { toast } from "sonner";
import Link from "next/link";
import { eliminarUsers } from "@/lib/actions/users";

export const columns: ColumnDef<Users>[] = [
  {
    // id: "id",
    accessorKey: "id",
    header: "N°",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="N°" />
    // ),
  },
  {
    accessorKey: "name",
    // header: "Paciente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const nombre = row.original.name || "";
      // const apellido = row.original.apel_pac || "";
      return (
        <div className="uppercase">
          <span>{`${nombre}`}</span>
          {/* <span className="text-muted-foreground"> ({row.original.id})</span> */}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "usuario",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Usuario" />
  //   ),
  //   // cell: ({ row }) => {
  //   //   const edad = String(row.getValue("edad_pac"));
  //   //   return (
  //   //     <div className="text-sm">
  //   //       {edad} {edad === "1" ? "año" : "años"}
  //   //     </div>
  //   //   );
  //   // },
  // },
  {
    accessorKey: "rol",
    // header: "DNI",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cargo" />
    ),
    cell: ({ row }) => {
      const rol = String(row.getValue("rol"));
      return <div className="capitalize">{rol ? rol : "no hay rol"}</div>;
    },
  },
  {
    accessorKey: "email",
    // header: "Dirección",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const correo = String(row.getValue("email"));
      return (
        <div className="lowercase">{correo ? correo : "no hay email"}</div>
      );
    },
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
      const usuario = row.original;
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
                onClick={() => navigator.clipboard.writeText(usuario.name)}
              >
                Copiar nombre
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/gestion-usuarios/usuarios/editar/${usuario.id}`}
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
                      ¿Eliminar este paciente?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className="text-black text-[16px] ">
                        Esto eliminará de forma permanente a{" "}
                        <span className="font-semibold">{usuario.name}</span>
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
                          await eliminarUsers(usuario.id);
                          toast.success("Usuario eliminado correctamente");
                          // puedes recargar los datos o mostrar un toast
                          // router.refresh();
                          window.location.reload();
                        } catch (error: any) {
                          // setLoading(false);
                          console.error(error);
                          toast.error("Error al eliminar usuario");
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

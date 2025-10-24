"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BanknoteArrowDown, Eye, HandCoins } from "lucide-react";
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
import { Cita } from "@/lib/types/cita";
import { eliminarCita } from "@/lib/actions/citas";
import { toast } from "sonner";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ColumnProps = {
  fetchCitas: () => Promise<void>;
};

export function columns({ fetchCitas }: ColumnProps): ColumnDef<Cita>[] {
  return [
    {
      accessorKey: "hora",
      header: "Hora Inicio",
    },
    {
      id: "horafin",
      header: "Hora Fin",
      cell: ({ row }) => {
        const horaInicio = row.getValue("hora") as string | undefined;
        if (!horaInicio || typeof horaInicio !== "string") return "-";

        const [h, m, s] = horaInicio.split(":").map(Number);
        const fecha = new Date(0, 0, 0, h, m, s);

        fecha.setMinutes(fecha.getMinutes() + 30);

        const horaFinal = fecha.toTimeString().slice(0, 5);

        return horaFinal;
      },
    },
    {
      accessorKey: "paciente",
      header: "Paciente",
      cell: ({ row }) => {
        const paciente = row.original.paciente;
        return paciente?.name ?? "—";
      },
    },
    {
      accessorKey: "medico",
      header: "Odontologo",
      cell: ({ row }) => {
        const medico = row.original.medico;
        return medico?.name ?? "—";
      },
    },
    {
      accessorKey: "consultorio",
      header: "Consultorio",
      cell: ({ row }) => {
        const consultorio = row.original.consultorio;
        return consultorio?.nombreConsultorio ?? "—";
      },
    },
    // {
    //   accessorKey: "estadoCita",
    //   header: "Estado Cita",

    //   // header: ({ column }) => (
    //   //   <DataTableColumnHeader column={column} title="Direccion" />
    //   // ),
    // },
    {
      id: "actions",
      header: "Opciones",
      cell: ({ row }) => {
        const cita = row.original;
        const [loading, setLoading] = useState(false);
        // const rawId = row.getValue("paciente"); // puede venir como string o number
        // const id = Number(rawId);
        const paciente = cita.paciente;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-gray-400"
                >
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                <DropdownMenuItem>
                  Hacer pago
                  <HandCoins />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/dashboard/citas/agenda/editar/${cita.id}`}
                    className="cursor-pointer"
                  >
                    <div className="cursor-pointer">Editar</div>
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
                        ¿Eliminar este cita?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <p className="text-black text-[16px] ">
                          Esto eliminará de forma permanente la cita de{" "}
                          <span className="font-semibold">
                            {paciente?.name || "Desconocido"}.
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
                            setLoading(true);
                            await eliminarCita(cita.id);
                            toast.success("Cita eliminado correctamente");
                            // puedes recargar los datos o mostrar un toast
                            // router.refresh();
                            await fetchCitas();
                            // window.location.reload();
                          } catch (error: any) {
                            // setLoading(false);
                            console.error(error);
                            toast.error("Error al eliminar cita");
                            // puedes mostrar un toast de error aquí
                          } finally {
                            setLoading(false); // 👈 desactivar loading
                          }
                        }}
                      >
                        {loading ? "Eliminando" : "Eliminar"}
                        {/* Eliminar */}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      // header: ({ column }) => (
      //   <DataTableColumnHeader column={column} title="Direccion" />
      // ),
    },
  ];
}

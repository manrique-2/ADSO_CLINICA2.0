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

export function columns(): ColumnDef<Cita>[] {
  return [
    {
      accessorKey: "hora",
      header: "Hora",
    },
    // {
    //   id: "horafin",
    //   header: "Hora Fin",
    //   cell: ({ row }) => {
    //     const horaInicio = row.getValue("hora") as string | undefined;
    //     if (!horaInicio || typeof horaInicio !== "string") return "-";

    //     const [h, m, s] = horaInicio.split(":").map(Number);
    //     const fecha = new Date(0, 0, 0, h, m, s);

    //     fecha.setMinutes(fecha.getMinutes() + 30);

    //     const horaFinal = fecha.toTimeString().slice(0, 5);

    //     return horaFinal;
    //   },
    // },
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
    // {
    //   accessorKey: "consultorio",
    //   header: "Consultorio",
    //   cell: ({ row }) => {
    //     const consultorio = row.original.consultorio;
    //     return consultorio?.nombreConsultorio ?? "—";
    //   },
    // },
    // {
    //   accessorKey: "estadoCita",
    //   header: "Estado Cita",

    //   // header: ({ column }) => (
    //   //   <DataTableColumnHeader column={column} title="Direccion" />
    //   // ),
    // },
  ];
}

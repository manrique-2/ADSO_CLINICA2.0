"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Cita } from "@/lib/types/cita";
import { Loader2 } from "lucide-react";
import { DataTable } from "../inicio/components/data-table";
import { columns } from "../inicio/components/columnas";

type AgendaHoy = Record<string, Cita[]>;

export default function CitasHoyModal() {
  const [open, setOpen] = useState(false);
  const [agenda, setAgenda] = useState<AgendaHoy>({});
  const [loading, setLoading] = useState(false);

  const fetchAgendaHoy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/agenda_today/");
      if (!res.ok) throw new Error("Error al obtener agenda");
      const data = await res.json();
      setAgenda(data);
    } catch (err) {
      console.error(err);
      setAgenda({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchAgendaHoy();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg col-span-2 h-fit p-5 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
          <p className=" text-[#337ab7] font-semibold text-lg">
            Buscar agenda de citas
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              Busca tu agenda de citas odontologicas del día de manera rápida.
            </p>
            <p className="font-bold text-[#337ab7]">CLICK AQUI</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: "700px" }}>
        <DialogHeader>
          <DialogTitle className="text-[#337ab7]">Agenda de Citas</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="f gap-6 overflow-x-auto py-2">
            {Object.entries(agenda).map(([consultorioId, citas]) => (
              <div
                key={consultorioId}
                className="min-w-[300px] border border-border rounded-md p-4 bg-mut flex flex-col"
              >
                <h2 className="text-md font-semibold mb-2">
                  Consultorio {consultorioId}
                </h2>

                <div className="flex-1 overflow-y-auto max-h-[400px]">
                  {citas.length > 0 ? (
                    <DataTable
                      columns={columns()} // <-- tus columnas ya preparadas para Cita
                      data={citas} // <-- pasamos directamente el array de citas
                      loading={false}
                      page={1}
                      totalPages={1}
                      setPage={() => {}}
                      emptyMessage="No hay citas"
                    />
                  ) : (
                    <p>No hay citas</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <DialogClose asChild>
          <div className="flex justify-end ">
            <Button className="mt-4 bg-[#337ab7] hover:bg-[#285e8e]">
              Cerrar
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

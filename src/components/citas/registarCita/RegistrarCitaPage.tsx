"use client";

import FormRegistrarCita from "@/src/components/citas/registarCita/FormRegistrarCita";
import React, { useEffect, useState } from "react";
import CalendarCard from "../../CalendarCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { getColumns } from "./columnas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { SlotCita } from "@/src/components/citas/registarCita/columnas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchCitas } from "@/hooks/useFetchCitas";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

const FormSchema = z.object({
  medico: z.string().optional(),
});

type Medico = {
  id: number;
  name: string;
  clinica: number;
};

function generarHorariosDisponibles() {
  const horarios: { inicio: string; fin: string }[] = [];

  const horaInicio = 8; // 8 AM
  const horaFin = 20; // 8 PM
  const duracionCitaMin = 30; // cada cita dura 30 minutos
  const slotsPorHora = 60 / duracionCitaMin; // cuántos slots por hora

  for (let hora = horaInicio; hora < horaFin; hora++) {
    for (let i = 0; i < slotsPorHora; i++) {
      const inicio = new Date();
      inicio.setHours(hora, i * duracionCitaMin, 0, 0);

      const fin = new Date(inicio.getTime() + duracionCitaMin * 60 * 1000);

      horarios.push({
        inicio: inicio.toTimeString().slice(0, 5),
        fin: fin.toTimeString().slice(0, 5),
      });
    }
  }

  return horarios;
}

function formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

interface RegistrarCitaPageProps {
  medicos: Medico[];
  usuario?: { id: number; clinica: number };
}

export default function RegistrarCitaPage({
  medicos,
  usuario,
}: RegistrarCitaPageProps) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const { data: citas, loading, fetchCitas } = useFetchCitas();
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotCita | null>(null);

  const [medicosOptions, setMedicosOptions] = useState<
    Array<{ id: number; name: string; clinica: number }>
  >([]);
  const [pacientesOptions, setPacientesOptions] = useState<
    Array<{ id: number; nomb_pac: string; apel_pac: string }>
  >([]);

  const [slotsDisponibles, setSlotsDisponibles] = useState<
    { inicio: string; fin: string }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setMedicosOptions(medicos);
  }, [medicos]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await fetchWithAuthRedirect("/api/pacientes"); // Ajusta si necesitas paginación
        const data = await res.json();
        if (Array.isArray(data.results)) {
          setPacientesOptions(data.results);
        } else {
          console.warn("⚠️ No se encontró el array 'results':", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar pacientes:", err);
      }
    };

    fetchPacientes();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!data.medico) return;
    const horarios = generarHorariosDisponibles();
    setSlotsDisponibles(horarios);

    console.log("Médico seleccionado:", data.medico);
    console.log("Horarios generados:", horarios);
  };

  const horariosData: SlotCita[] = slotsDisponibles.map(({ inicio, fin }) => {
    const horaSlot = `${inicio} - ${fin}`;

    const cita = citas.find((c: any) => {
      const horaCita = c.hora?.slice(0, 5); // "08:00:00" → "08:00"
      return horaCita === inicio;
    });

    return {
      hora: horaSlot,
      fecha: formatDateLocal(selectedDate),
      medico: form.getValues("medico") ?? "",
      id: cita?.id,
      paciente: cita?.paciente, // ✅ number | undefined
      estadoCita: cita?.estadoCita,
    };
  });

  const columns = getColumns(setShowModal, setSelectedSlot);
  // Obtener el id seleccionado desde el form (string)
  const selectedMedicoId = form.getValues("medico");

  // Convertir a number y buscar el objeto médico en medicosOptions
  const selectedMedico =
    medicosOptions.find((m) => m.id === Number(selectedMedicoId)) || null;

  useEffect(() => {
    if (selectedMedicoId && selectedDate) {
      fetchCitas({
        medico: selectedMedicoId,
        fecha: formatDateLocal(selectedDate),
      });
    }
  }, [selectedMedicoId, selectedDate]);
  useEffect(() => {
    console.log("📋 Citas obtenidas:", citas);
  }, [citas]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 bg-white p-6 rounded-md shadow-sm mt-4 border-t-4 border-blue-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex gap-12 col-span-1">
            <div>
              <CalendarCard
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div className="w-full flex flex-col gap-4 justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="medico"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Odontologo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {medicosOptions.map((medico) => (
                              <SelectItem
                                key={medico.id}
                                value={medico.id.toString()}
                              >
                                {medico.name}
                              </SelectItem>
                            ))}
                            {/* {medicos &&
                              medicos.map((medico) => (
                                <SelectItem
                                  key={medico.id}
                                  value={medico.id.toString()}
                                >
                                  {medico.name}
                                </SelectItem>
                              ))} */}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-fit bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        Buscando...
                      </div>
                    ) : (
                      "Buscar"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          {/* <div></div> */}
          {/* <div className="flex flex-col gap-2 justify-center items-center">
            <p>Horarios Ocupados:</p>
            <p>Horarios Disponibles:</p>
          </div> */}
          <div className="flex gap-8 items-center justify-center w-full text-sm text-muted-foreground px-2">
            {/* <p className="flex items-center gap-2"> */}
            <p className=" flex flex-col">
              <span className="font-semibold text-red-600 text-2xl">
                {horariosData.filter((h) => h.estadoCita !== undefined).length}
              </span>{" "}
              <p>Horarios ocupados</p>
            </p>
            {/* <p className="flex items-center gap-2"> */}
            <p className="flex flex-col ">
              <span className="font-semibold text-green-600 text-2xl">
                {horariosData.filter((h) => h.estadoCita === undefined).length}
              </span>{" "}
              <p>Horarios disponibles</p>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="" style={{ maxWidth: "600px" }}>
              <DialogHeader>
                <DialogTitle>Registrar Cita</DialogTitle>
                <DialogDescription>
                  Completa la información para registrar la cita.
                </DialogDescription>
              </DialogHeader>
              {selectedSlot && (
                <FormRegistrarCita
                  usuario={usuario}
                  medicosOptions={medicosOptions}
                  pacientesOptions={pacientesOptions}
                  selectedSlot={selectedSlot}
                  selectedDate={selectedDate}
                  selectedMedicoId={
                    selectedMedico ? selectedMedico.id : undefined
                  }
                  onSuccess={() => {
                    setShowModal(false); // Cierra el modal
                    fetchCitas({
                      // Refresca citas de la tabla
                      medico: selectedMedicoId!,
                      fecha: formatDateLocal(selectedDate),
                    });
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
          <DataTable
            columns={columns}
            data={horariosData}
            loading={false}
            page={1}
            totalPages={1}
            setPage={() => {}}
            emptyMessage="No hay horarios disponibles"
          />
        </div>
      </div>
    </div>
  );
}

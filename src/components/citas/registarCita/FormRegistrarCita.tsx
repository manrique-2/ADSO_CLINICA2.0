"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citaSchema } from "@/lib/types/cita-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import PacienteSelect from "../components/PacienteSelect";
import { PacienteCombobox } from "../components/PacienteCombobox";

type FormValues = z.infer<typeof citaSchema>;
// interface Props {
//   medicosOptions: Array<{ id: number; nombre: string }>;
//   pacientesOptions: Array<{ id: number; nombre: string }>;
//   selectedSlot: {
//     hora: string;
//     medicoId: number;
//     fecha: string;
//   } | null;
// }

export default function FormRegistrarCita({
  medicosOptions,
  pacientesOptions,
  selectedSlot,
  selectedDate,
  selectedMedicoId,
  usuario,
  onSuccess,
}: {
  medicosOptions: { id: number; name: string; clinica: number }[];
  pacientesOptions: { id: number; nomb_pac: string; apel_pac: string }[];
  selectedSlot?: {
    hora: string;
    fecha: string;
    medico?: string;
  };
  selectedDate: Date;
  selectedMedicoId?: number;
  usuario?: { id: number; clinica: number };
  onSuccess: () => void;
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [loading, setLoading] = useState(false);
  const horaInicio = selectedSlot?.hora.split(" - ")[0] || "";
  const fallbackFecha = selectedDate.toISOString().split("T")[0];

  const [consultorios, setConsultorios] = useState<
    { id: number; nombreConsultorio: string }[]
  >([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      // estadoCita: "PENDIENTE",
      // estadoPago: "NO_PAGADO",
      consultorio: "",
      hora: horaInicio,
      fecha: selectedSlot?.fecha || fallbackFecha,
      medico: selectedSlot?.medico
        ? String(selectedSlot.medico)
        : selectedMedicoId
        ? String(selectedMedicoId)
        : "",
    },
  });

  console.log("Estado del formulario:", form.getValues());

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log("Datos a enviar:", data);
    try {
      // const payload = {
      //   ...data,
      //   paciente: data.paciente?.id, // ← solo el id al backend
      //   medico: data.medico, // igual con el medico si tu backend espera id
      // };
      const response = await fetchWithAuthRedirect("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al registrar cita");

      toast.success("Cita registrada correctamente");
      form.reset();
      onSuccess(); // Llama a la función de éxito pasada como prop
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la cita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSlot) {
      const horaInicio = selectedSlot.hora.split(" - ")[0];
      form.setValue("hora", horaInicio);
      form.setValue("fecha", selectedSlot.fecha);
    }
  }, [selectedSlot, form]);

  //obtener consultorios debido a la clinica del usuario
  useEffect(() => {
    if (!usuario?.clinica) return;

    const fetchConsultorios = async () => {
      try {
        const resCons = await fetchWithAuthRedirect(
          `/api/consultorios/?clinica=${usuario?.clinica}`
        );
        const data = await resCons.json();
        setConsultorios(data.results);
      } catch (err) {
        console.error("Error cargando consultorios", err);
      }
    };

    fetchConsultorios();
  }, [usuario?.clinica]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-3 bg-muted px-3 py-2 rounded-md">
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="medico"
                render={({ field }) => (
                  <FormItem className="flex justify-center items-center">
                    <FormLabel className="font-semibold text-[#337ab7]  ">
                      Cita medica para:
                    </FormLabel>
                    <FormControl>
                      <div>
                        <span className="text-sm font-bold text-[#337ab7] uppercase">
                          {medicosOptions.find(
                            (m) => String(m.id) === form.getValues("medico")
                          )?.name || "No seleccionado"}
                        </span>
                        {/* <p className="border border-input rounded px-3 py-2 bg-muted text-muted-foreground">
                        {field.value}
                        </p> */}
                        <input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-start">
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem className="flex justify-center items-center">
                      <FormLabel className=" text-[#337ab7] font-semibold">
                        Fecha:
                      </FormLabel>
                      <FormControl>
                        <div>
                          <span className="text-sm font-bold text-[#337ab7]">
                            {field.value}
                          </span>
                          {/* <p className="border border-input rounded px-3 py-2 bg-muted text-muted-foreground">
                        {field.value}
                      </p> */}
                          <input type="hidden" {...field} />
                        </div>
                        {/* <Input type="date" {...field} disabled /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start">
                <FormField
                  control={form.control}
                  name="hora"
                  render={({ field }) => (
                    <FormItem className="flex justify-center items-center">
                      <FormLabel className=" text-[#337ab7] font-semibold">
                        Hora:
                      </FormLabel>
                      <FormControl>
                        <div>
                          <span className="text-sm font-bold text-[#337ab7]">
                            {field.value}
                          </span>
                          {/* <p className="border border-input rounded px-3 py-2 bg-muted text-muted-foreground">
                        {field.value}
                      </p> */}
                          <input type="hidden" {...field} />
                        </div>
                        {/* <Input type="time" {...field} /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="paciente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente</FormLabel>
                <FormControl>
                  <PacienteSelect
                    value={field.value}
                    onChange={field.onChange}
                    pacientesOptions={pacientesOptions}
                  />
                  {/* <PacienteCombobox
                    selectedPaciente={field.value} // ← ahora es un objeto
                    onSelect={(paciente) => {
                      field.onChange(paciente); // guarda solo el ID en el form
                    }}
                  /> */}

                  {/* <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {pacientesOptions.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.nomb_pac} {p.apel_pac}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consultorio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consultorio</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione consultorio" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultorios.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.nombreConsultorio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 mt-6">
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => {
                form.reset(); // Limpia el formulario
                onSuccess(); // Cierra el modal (o lo que pase desde el padre)
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className=" cursor-pointer bg-[#337ab7] hover:bg-[#285e8e]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  Registrando...
                </div>
              ) : (
                "Registrar Cita"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

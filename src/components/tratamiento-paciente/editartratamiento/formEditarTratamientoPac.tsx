// components/tratamiento-paciente/nuevotratamiento/formtratarpaciente.tsx
"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  TratamientoPacientes,
  tratamientoPacienteSchema,
} from "@/lib/types/tratamiento-paciente/tratamiento-paciente-form";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import PacienteSelect from "../../citas/components/PacienteSelect";
import { TratamientoPaciente } from "@/lib/types/tratamiento-paciente/tratamiento-paciente";
import { TratamientoResponse } from "@/lib/types/tratamiento/tratamiento";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormEditarTratamientoPac({
  //   pacientesOptions,
  //   tratamientosOptions,
  tratamientoPaciente,
}: {
  //   pacientesOptions: { id: number; nomb_pac: string; apel_pac: string }[];
  //   tratamientosOptions: { id: number; name: string }[];
  tratamientoPaciente: TratamientoPaciente;
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pacienteActual, setPacienteActual] = useState<{
    id: number;
    nomb_pac: string;
    apel_pac: string;
  } | null>(null);

  const [tratamientos, setTratamientos] = useState<TratamientoResponse | null>(
    null
  );

  // Cargar paciente actual
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await fetch(
          `/api/pacientes/${tratamientoPaciente.paciente.id}`
        );
        if (!res.ok) throw new Error("No se pudo obtener el paciente");

        const data = await res.json();
        setPacienteActual(data); // 👈 guardamos paciente actual
      } catch (err) {
        console.error("Error cargando paciente:", err);
      }
    };

    if (tratamientoPaciente.paciente.id) {
      fetchPaciente();
    }
  }, [tratamientoPaciente.paciente.id]);

  // Cargar lista de tratamientos
  useEffect(() => {
    const fetchTratamientos = async () => {
      const res = await fetch("/api/tratamientos");
      const data: TratamientoResponse = await res.json();
      setTratamientos(data);
    };
    fetchTratamientos();
  }, []);

  const form = useForm<TratamientoPacientes>({
    resolver: zodResolver(tratamientoPacienteSchema),
    defaultValues: {
      asunto: tratamientoPaciente.asunto ?? "",
      observacion: tratamientoPaciente.observacion,
      descuento: Number(tratamientoPaciente.descuento ?? 0),
      paciente: tratamientoPaciente.paciente.id, // 👈 número
      tratamiento: tratamientoPaciente.tratamiento.id,
      convenio: tratamientoPaciente.convenio ?? false,
    },
  });

  const onSubmit = async (values: TratamientoPacientes) => {
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect(
        `/api/tratamiento_paciente/${tratamientoPaciente.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok)
        throw new Error("Error al actualizar tratamiento del paciente");

      toast.success("Tratamiento del paciente actualizado con éxito");

      setTimeout(() => {
        router.push("/dashboard/tratamiento-paciente/registro");
      }, 1000);
    } catch (error) {
      toast.error("Error al enviar solicitud");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols gap-4">
          <div className="grid grid-cols-1 gap-3 bg-muted px-3 py-2 rounded-md">
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="paciente"
                render={({ field }) => (
                  <FormItem className="flex justify-center items-center">
                    <FormLabel className="font-semibold text-[#337ab7]">
                      Paciente:
                    </FormLabel>
                    <FormControl>
                      {/* <PacienteSelect
                    value={field.value}
                    onChange={field.onChange}
                    pacientesOptions={pacienteActual ? [pacienteActual] : []} // 👈 paciente precargado
                  /> */}
                      <div>
                        <span className="text-sm font-bold text-[#337ab7] uppercase">
                          {pacienteActual
                            ? `${pacienteActual.nomb_pac} ${pacienteActual.apel_pac}`
                            : "Cargando..."}
                        </span>
                        {/* campo oculto para que el form mantenga el id */}
                        <input
                          type="hidden"
                          {...field}
                          value={String(tratamientoPaciente.paciente.id)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <FormField
            control={form.control}
            name="convenio"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <FormLabel>Convenio</FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="asunto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asunto</FormLabel>
                <FormControl>
                  <Input placeholder="asunto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tratamiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tratamiento</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione tratamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {tratamientos?.results.map(
                        (t: { id: number; nombre: string }) => (
                          <SelectItem key={t.id} value={t.id.toString()}>
                            {t.nombre}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="descuento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    value={field.value != null ? String(field.value) : ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.onChange(v === "" ? 0 : Number(v));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/*  */}

        <FormField
          control={form.control}
          name="observacion"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Boton guardar*/}
        <div className="flex justify-">
          <Button
            type="submit"
            className=" bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                Actualizando...
              </div>
            ) : (
              "Actualizar Tratamiento"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

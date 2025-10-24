"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pacienteEvolucionSchema } from "@/lib/types/pacientevolucion-form";
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
import { EvolucionHistorial } from "lib/types/historial";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

type FormValues = z.infer<typeof pacienteEvolucionSchema>;

export default function FormEvolucion({
  medicosOptions,
  pacientesOptions,
  especialidadesOptions,
  selectedPacienteId,
  //   selectedMedicoId,
  onSuccess,
  onAddEvolucion,
}: {
  medicosOptions: { id: number; name: string }[];
  pacientesOptions: { id: number; nomb_pac: string }[];
  especialidadesOptions: { id: number; nombre: string }[];
  //   selectedMedicoId?: number;
  selectedPacienteId?: number;
  onSuccess: () => void;
  onAddEvolucion?: (evo: EvolucionHistorial) => void;
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(pacienteEvolucionSchema),
    defaultValues: {
      paciente: String(selectedPacienteId),
      descripcion: "",
      medico: "",
      especialidad: "",
    },
  });

  console.log("Estado del formulario:", form.getValues());

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log("Datos a enviar:", data);
    try {
      const response = await fetchWithAuthRedirect(
        "/api/paciente_evoluciones",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast.error("Error al registrar evolución");
        return;
      }

      const nuevaEvolucion = await response.json();

      toast.success("Evolucion registrada correctamente");
      // ✅ ACTUALIZAR LISTA EN HISTORIAL (sin refetch)
      onAddEvolucion?.(nuevaEvolucion);
      form.reset();
      onSuccess(); // Llama a la función de éxito pasada como prop
    } catch (error) {
      console.error("Error al registrar evolución:", error);
      toast.error("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-3 bg-muted px-3 py-2 rounded-md"></div>
          {/* 👇 Texto informativo del paciente */}
          <div className="text-sm text-muted-foreground">
            Evolución para el paciente:{" "}
            <strong>
              {
                pacientesOptions.find((p) => p.id === selectedPacienteId)
                  ?.nomb_pac
              }
              {/* {
                pacientesOptions.find((p) => p.id === selectedPacienteId)
                  ?.apel_pac
              } */}
            </strong>
          </div>

          {/* 👇 Campo oculto del paciente */}
          <input
            type="hidden"
            value={selectedPacienteId}
            {...form.register("paciente")}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="medico"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medico</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicosOptions.map((m) => (
                          <SelectItem key={m.id} value={String(m.id)}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="especialidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {especialidadesOptions.map((e) => (
                          <SelectItem key={e.id} value={String(e.id)}>
                            {e.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 ">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion evolucion</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                "Registrar evolucion"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

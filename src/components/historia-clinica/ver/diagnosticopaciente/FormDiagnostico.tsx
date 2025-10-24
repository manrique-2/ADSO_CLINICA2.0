"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pacienteDiagnosticoSchema } from "@/lib/types/pacientediagnostico-form";
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
import { DiagnosticoHistorial } from "lib/types/historial";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

type FormValues = z.infer<typeof pacienteDiagnosticoSchema>;

export default function FormDiagnostico({
  // medicosOptions,
  pacientesOptions,
  enfermedadesOptions,
  // especialidadesOptions,
  selectedPacienteId,
  //   selectedMedicoId,
  onSuccess,
  onAddDiagnostico,
}: {
  // medicosOptions: { id: number; name: string }[];
  pacientesOptions: { id: number; nomb_pac: string }[];
  enfermedadesOptions: { id: number; descripcion: string }[];
  // especialidadesOptions: { id: number; nombre: string }[];
  //   selectedMedicoId?: number;
  selectedPacienteId?: number;
  onSuccess: () => void;
  onAddDiagnostico?: (evo: DiagnosticoHistorial) => void;
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(pacienteDiagnosticoSchema),
    defaultValues: {
      paciente: String(selectedPacienteId),
      enfermedad: "",
      // medico: "",
      // especialidad: "",
    },
  });

  console.log("Estado del formulario:", form.getValues());

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log("Datos a enviar:", data);
    try {
      const payload = {
        ...data,
        activo: true, // 👈 Este campo es requerido por el backend
      };
      const response = await fetchWithAuthRedirect(
        "/api/paciente_diagnosticos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        toast.error("Error al registrar diagnostico");
        return;
      }

      const nuevoDiagnostico = await response.json();

      toast.success("Diagnostico registrada correctamente");
      // ✅ ACTUALIZAR LISTA EN HISTORIAL (sin refetch)
      onAddDiagnostico?.(nuevoDiagnostico);
      form.reset();
      onSuccess(); // Llama a la función de éxito pasada como prop
    } catch (error) {
      console.error("Error al registrar diagnostico:", error);
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
              }{" "}
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
              name="enfermedad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnostico o enfermedad</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {enfermedadesOptions.map((e) => (
                          <SelectItem key={e.id} value={String(e.id)}>
                            {e.descripcion}
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
          {/* <div className="grid grid-cols-1 gap-4 ">
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
          </div> */}
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
                "Registrar diagnostico"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

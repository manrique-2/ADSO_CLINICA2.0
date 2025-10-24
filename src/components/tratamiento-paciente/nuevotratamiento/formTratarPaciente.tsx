// components/tratamiento-paciente/nuevotratamiento/formtratarpaciente.tsx
"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function FormTrataPaciente({
  pacientesOptions,
  tratamientosOptions,
}: {
  pacientesOptions: { id: number; nomb_pac: string; apel_pac: string }[];
  tratamientosOptions: { id: number; nombre: string }[];
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<TratamientoPacientes>({
    resolver: zodResolver(tratamientoPacienteSchema),
    defaultValues: {
      asunto: "",
      descuento: 0,
      paciente: undefined, // o null, si tu schema lo permite
      tratamiento: undefined,
      observacion: "",
      convenio: false,
    },
  });

  const onSubmit = async (values: TratamientoPacientes) => {
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect("/api/tratamiento_paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok)
        throw new Error("Error al registrar tratamiento del paciente");

      toast.success("Tratamiento del paciente registrado con éxito");

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
          <FormField
            control={form.control}
            name="paciente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Paciente</FormLabel>
                <FormControl>
                  <PacienteSelect
                    value={field.value ? String(field.value) : ""}
                    onChange={(val) => field.onChange(Number(val))}
                    pacientesOptions={pacientesOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      {tratamientosOptions.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.nombre}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="descuento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
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
                Registrando...
              </div>
            ) : (
              "Registrar Tratamiento"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

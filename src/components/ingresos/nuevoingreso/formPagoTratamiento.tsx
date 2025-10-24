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
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  IngresosData,
  ingresosSchema,
} from "@/lib/types/ingresos/ingresos-form";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import PacienteSelect from "../../citas/components/PacienteSelect";

export default function FormTrataPaciente({
  pacientesOptions,
  medicosOptions,
  tratamientoPacienteOptions,
}: {
  pacientesOptions: { id: number; nomb_pac: string; apel_pac: string }[];
  medicosOptions: { id: number; name: string }[];
  tratamientoPacienteOptions: {
    id: number;
    asunto: string;
    paciente: { id: number; name: string };
  }[];
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<number | null>(null);
  const [tratamientosFiltrados, setTratamientosFiltrados] = useState<
    { id: number; asunto: string; paciente: { id: number; name: string } }[]
  >([]);

  useEffect(() => {
    if (selectedPaciente) {
      const filtrados = tratamientoPacienteOptions.filter(
        (t: any) => t.paciente?.id === selectedPaciente
      );
      setTratamientosFiltrados(filtrados);
    } else {
      setTratamientosFiltrados(tratamientoPacienteOptions);
    }
  }, [selectedPaciente, tratamientoPacienteOptions]);

  const form = useForm<IngresosData>({
    resolver: zodResolver(ingresosSchema),
    defaultValues: {
      tratamientoPaciente: 0,
      medico: 0,
      monto: 0,
      metodo: "Efectivo",
    },
  });

  const onSubmit = async (values: IngresosData) => {
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect("/api/ingresos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Error al registrar ingreso");

      toast.success("Ingreso registrado con éxito");

      setTimeout(() => {
        router.push("/dashboard/ingresos/pago-tratamientoPaciente");
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
          {/* <FormField
                    control={form.control}
                    name="paciente"
                    render={({ field }) => ( */}
          <FormItem>
            <FormLabel>Paciente</FormLabel>
            <FormControl>
              <PacienteSelect
                value={selectedPaciente ? String(selectedPaciente) : ""}
                onChange={(val) => setSelectedPaciente(Number(val))}
                pacientesOptions={pacientesOptions}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          {/* )}
                  /> */}
        </div>
        <FormField
          control={form.control}
          name="tratamientoPaciente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tratamiento del paciente</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    {tratamientosFiltrados.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.asunto}
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
          name="medico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Odontologo(a)</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? String(field.value) : ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione medico" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicosOptions.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="metodo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metodo de pago</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    // defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="--Seleccione metodo--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      {/* <SelectItem value="YAPE">Yape</SelectItem> */}
                      {/* <SelectItem value="PLIN">Plin</SelectItem> */}
                      <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                      <SelectItem value="Transferencia">
                        Transferencia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monto"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              "Registrar Pago"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

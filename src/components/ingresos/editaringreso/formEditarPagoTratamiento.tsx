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
import { Ingresos } from "@/lib/types/ingresos/ingresos";
// import PacienteSelect from "../../citas/components/PacienteSelect";

export default function FormEditarPagoTratamientoPaciente({
  ingreso,
}: // medicosOptions,
// tratamientoPacienteOptions,
{
  ingreso: Ingresos;
  // medicosOptions: { id: number; name: string }[];
  // tratamientoPacienteOptions: { id: number; asunto: string }[];
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [medicosOptions, setMedicosOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [tratamientoPacienteOptions, setTratamientoPacienteOptions] = useState<
    Array<{ id: number; asunto: string }>
  >([]);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await fetchWithAuthRedirect("/api/medicos"); // Ajusta si necesitas paginación
        const data = await res.json();
        if (Array.isArray(data)) {
          setMedicosOptions(data);
        } else if (Array.isArray(data.results)) {
          setMedicosOptions(data.results);
        } else {
          console.warn("⚠️ Formato de datos inesperado:", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar :", err);
      }
    };

    fetchMedicos();
  }, []);

  useEffect(() => {
    const fetchTratamientoPaciente = async () => {
      try {
        const res = await fetchWithAuthRedirect("/api/tratamiento_paciente"); // Ajusta si necesitas paginación
        const data = await res.json();
        if (Array.isArray(data)) {
          setTratamientoPacienteOptions(data);
        } else if (Array.isArray(data.results)) {
          setTratamientoPacienteOptions(data.results);
        } else {
          console.warn("⚠️ Formato de datos inesperado:", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar tratamiento del paciente:", err);
      }
    };

    fetchTratamientoPaciente();
  }, []);

  // console.log("ingresos:", ingreso);
  const form = useForm<IngresosData>({
    resolver: zodResolver(ingresosSchema),
    defaultValues: {
      tratamientoPaciente:
        ingreso.tratamientoPaciente?.id ?? ingreso.tratamientoPaciente,
      medico: ingreso.medico,
      monto: ingreso.monto,
      metodo: ingreso.metodo,
    },
  });

  const onSubmit = async (values: IngresosData) => {
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect(`/api/ingresos/${ingreso.id}`, {
        method: "PUT",
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
                    {tratamientoPacienteOptions.map((t) => (
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
                Actualizando...
              </div>
            ) : (
              "Actualizar Pago"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

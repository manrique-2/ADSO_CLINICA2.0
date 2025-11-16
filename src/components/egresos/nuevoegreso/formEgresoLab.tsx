"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import {
  egresoLabSchema,
  EgresoLabData,
} from "@/lib/types/egresos/egreso-lab-form";
import PacienteSelect from "src/components/citas/components/PacienteSelect";

export default function FormEgresoLab({
  pacientesOptions,
  tratamientoPacienteOptions,
}: {
  pacientesOptions: { id: number; nomb_pac: string; apel_pac: string }[];
  tratamientoPacienteOptions: {
    id: number;
    show_str: string;
    asunto: string;
    paciente: { id: number; name: string };
  }[];
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<number | null>(null);
  const [tratamientosFiltrados, setTratamientosFiltrados] = useState<
    { id: number; show_str: string; asunto: string; paciente: { id: number; name: string } }[]
  >([]);

  useEffect(() => {
    const fetchTratamientos = async () => {
      console.log("Selected paciente ID:", selectedPaciente);
      
      if (!selectedPaciente) {
        setTratamientosFiltrados([]);
        return;
      }
  
      try {
        const res = await fetchWithAuthRedirect(
          `/api/tratamiento_paciente?paciente=${selectedPaciente}`
        );
        const data = await res.json();
  
        if (Array.isArray(data.results)) {
          setTratamientosFiltrados(data.results);
        } else if (Array.isArray(data)) {
          setTratamientosFiltrados(data);
        } else {
          console.warn("⚠️ Formato de datos inesperado:", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar tratamientos filtrados:", err);
        setTratamientosFiltrados([]);
      }
    };
    
    fetchTratamientos();
  }, [selectedPaciente, fetchWithAuthRedirect]);

  const form = useForm<EgresoLabData>({
    resolver: zodResolver(egresoLabSchema),
    defaultValues: {
      tratamientoPaciente: 0,
      monto: 0,
      description: "",
      fecha_registro: new Date().toISOString(),
    },
  });

  const onSubmit = async (values: EgresoLabData) => {
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect(`/api/egresos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Error al registrar egreso de laboratorio");

      toast.success("Egreso de laboratorio registrado con éxito");
      setTimeout(() => {
        router.push("/dashboard/egresos/");
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
        {/* Paciente */}
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

        {/* Tratamiento */}
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
                    <SelectValue placeholder="Seleccione tratamiento" />
                  </SelectTrigger>
                  <SelectContent>
                    {tratamientosFiltrados.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.show_str}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Monto y descripción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Monto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_registro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de registro</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalle del egreso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button
          type="submit"
          className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Registrando...
            </div>
          ) : (
            "Registrar Egreso"
          )}
        </Button>
      </form>
    </Form>
  );
}

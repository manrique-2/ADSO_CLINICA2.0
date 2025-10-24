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
import { Cita } from "@/lib/types/cita";
import { useRouter } from "next/navigation";
import PacienteSelect from "../../components/PacienteSelect";
// import PacienteSelect from "../components/PacienteSelect";

type FormValues = z.infer<typeof citaSchema>;
interface FormEditarProps {
  cita: Cita;
  medicosOptions: { id: number; name: string; clinica: number }[];
  usuario?: { id: number; clinica: number };
  // pacientesOptions: { id: number; nomb_pac: string; apel_pac: string }[];
  //   onSuccess: () => void;
}

function generarHoras(inicio = "08:00", fin = "20:00"): string[] {
  const horas: string[] = [];
  let [h, m] = inicio.split(":").map(Number);
  const [hFin, mFin] = fin.split(":").map(Number);

  while (h < hFin || (h === hFin && m < mFin)) {
    const horaStr = `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}`;
    horas.push(horaStr);
    m += 30;
    if (m >= 60) {
      h++;
      m = 0;
    }
  }
  return horas;
}

function normalizarHora(hora: string): string {
  // Si viene con segundos (ej: "08:00:00") → deja solo hh:mm
  return hora.length === 8 ? hora.slice(0, 5) : hora;
}

export function FormEditarCita({
  cita,
  medicosOptions,
  usuario,
}: // pacientesOptions,
//   onSuccess,
FormEditarProps) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [pacienteActual, setPacienteActual] = useState<{
    id: number;
    nomb_pac: string;
    apel_pac: string;
  } | null>(null); // 👈 estado para paciente actual

  const [consultorios, setConsultorios] = useState<
    { id: number; nombreConsultorio: string }[]
  >([]);

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

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await fetch(`/api/pacientes/${cita.paciente.id}`);
        if (!res.ok) throw new Error("No se pudo obtener el paciente");

        const data = await res.json();
        setPacienteActual(data); // 👈 guardamos paciente actual
      } catch (err) {
        console.error("Error cargando paciente:", err);
      }
    };

    if (cita.paciente.id) {
      fetchPaciente();
    }
  }, [cita.paciente.id]);

  const form = useForm<FormValues>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      // estadoCita: "PENDIENTE",
      // estadoPago: "NO_PAGADO",
      fecha: cita.fecha,
      hora: cita.hora ? normalizarHora(cita.hora) : "",
      medico: cita.medico.id ? String(cita.medico.id) : "",
      paciente: cita.paciente.id ? String(cita.paciente.id) : "",
      consultorio: cita.consultorio.id ? String(cita.consultorio.id) : "",
    },
  });

  console.log("Estado del formulario:", form.getValues());

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log("Datos a enviar:", data);
    try {
      const response = await fetchWithAuthRedirect(`/api/citas/${cita.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al registrar cita");

      toast.success("Paciente actualizado con éxito");

      setTimeout(() => {
        router.push("/dashboard/citas/agenda");
      }, 1000);
      //   form.reset();
      //   onSuccess(); // Llama a la función de éxito pasada como prop
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          value={String(cita.paciente.id)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="">Fecha</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                  <FormItem className="">
                    <FormLabel className="">Hora</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccione hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {generarHoras().map((hora) => (
                            <SelectItem key={hora} value={hora}>
                              {hora}
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
          </div>
          <FormField
            control={form.control}
            name="medico"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="  ">Medico</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione médico" />
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
            name="consultorio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consultorio</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
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
            {/* <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
            //   onClick={() => {
            //     form.reset(); // Limpia el formulario
            //     // onSuccess(); // Cierra el modal (o lo que pase desde el padre)
            //   }}
            >
              Cancelar
            </Button> */}
            <Button
              type="submit"
              className=" cursor-pointer bg-[#337ab7] hover:bg-[#285e8e]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  Actualizando...
                </div>
              ) : (
                "Actualizar Cita"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

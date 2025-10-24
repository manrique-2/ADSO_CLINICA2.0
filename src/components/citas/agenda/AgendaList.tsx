"use client";

import { EmptyState } from "@/src/components/EmptyState";
import { DataTable } from "@/src/components/citas/agenda/data-table";
import { columns } from "@/src/components/citas/agenda/columnas";
import CalendarioCard from "@/src/components/CalendarioCard";
import CalendarHeader from "@/src/components/CalendarHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { Cita } from "@/lib/types/cita";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

const FormSchema = z.object({
  medico: z.string().optional(),
  estado: z.string().optional(),
});

type Props = {
  // initialData: Cita[];
  // pacientesMap: Record<
  //   number,
  //   {
  //     nombre: string;
  //     estado: string;
  //     edad: number;
  //     dni: string;
  //     telefono: string;
  //   }
  // >;
  // medicosMap: Record<number, string>;
};

function formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AgendaList({}: // initialData,
// pacientesMap,
// medicosMap,
Props) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [data, setData] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [medicosOptions, setMedicosOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<{ medico?: string; estado?: string }>(
    {}
  );
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const fetchCitas = async (filers?: {
    medico?: string;
    estado?: string;
    page?: number;
  }) => {
    // const formattedDate = formatDateLocal(selectedDate);
    // const fecha = formattedDate;
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      // params.set("page", String(page));
      if (filers?.page) {
        setPage(filers.page);
        params.set("page", String(filers.page));
      } else {
        params.set("page", String(page));
      }
      if (filers?.medico) {
        params.set("medico_id", filers.medico);
      }
      if (filers?.estado) {
        params.set("estadoCita", filers.estado);
      }
      if (selectedDate) {
        const formattedDate = formatDateLocal(selectedDate); // Formato YYYY-MM-DD
        params.set("fecha", formattedDate);
      }

      const res = await fetchWithAuthRedirect(
        `/api/citas?${params.toString()}`
      );
      const json = await res.json();

      setData(json.results);

      const total = json.count;
      const pageSize = json.results.length || 1;
      const pages = Math.ceil(total / pageSize);
      setTotalPages(pages);
    } catch (error) {
      console.error("❌ Error al cargar citas:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const res = await fetchWithAuthRedirect("/api/medicos"); // Ajusta la ruta según tu API
        const medicoArray = await res.json();
        if (Array.isArray(medicoArray)) {
          setMedicosOptions(medicoArray);
        } else {
          console.warn("⚠️ Formato inesperado en médicos:", medicoArray);
        }
      } catch (err) {
        console.error("Error al cargar médicos", err);
      }
    };

    fetchMedicos();
  }, []);
  // Cargar pacientes iniciales si no se pasó initialData
  // useEffect(() => {
  //   fetchCitas();
  // }, [page]);

  // Re-fetch cuando cambia la página
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setFilters(data);
    setPage(1); // Resetear página
    fetchCitas({ ...data, page: 1 });
  };

  useEffect(() => {
    if (filters.medico || filters.estado) {
      fetchCitas({ ...filters, page });
    }
  }, [page, selectedDate]);

  const hayFiltrosActivos = Boolean(filters.medico || filters.estado);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm h-fit border-t-4 border-blue-500">
          <div className="flex items-center justify-center mb-6 ">
            <CalendarioCard />
          </div>
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
                        {medicosOptions &&
                          medicosOptions.map((medico) => (
                            <SelectItem
                              key={medico.id}
                              value={medico.id.toString()}
                            >
                              {medico.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
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
                        <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                        <SelectItem value="CONFIRMADA">Confirmada</SelectItem>
                        <SelectItem value="CANCELADA">Cancelada</SelectItem>
                        <SelectItem value="COMPLETADA">Completada</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              /> */}
              <Button
                type="submit"
                className="w-full bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
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
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => {
                  form.reset({ medico: "", estado: "" }); // Limpia los selects (medico, estado)
                  setFilters({}); // Limpia el objeto de filtros
                  setPage(1); // Vuelve a la página 1
                  setSelectedDate(new Date()); // Resetea fecha a hoy
                  // fetchCitas({ page: 1, medico: "", estado: "" });
                  setData([]); // Limpia los datos de citas
                }}
              >
                Limpiar filtros
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm col-span-3 h-fit border-t-4 border-blue-500">
          <div className="flex items-start">
            <CalendarHeader
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="py-6">
            <RadioGroup defaultValue="dia" className="flex items-center gap-4 ">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="año" id="r1" />
                <Label htmlFor="r1">Año</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="mes" id="r2" />
                <Label htmlFor="r2">Mes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="semana" id="r3" />
                <Label htmlFor="r3">Semana</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="dia" id="r3" />
                <Label htmlFor="r3">Dia</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <DataTable
              columns={columns({ fetchCitas })}
              data={data}
              loading={loading}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              emptyMessage={
                // hayFiltrosActivos
                //   ? "No hay citas registrados por el momento."
                //   : "Aún no has aplicado ningún filtro. Usa los campos de búsqueda para comenzar."
                <EmptyState
                  type={hayFiltrosActivos ? "no-results" : "no-filters"}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

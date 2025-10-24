"use client";

import { useEffect, useState } from "react";
import { Paciente } from "@/lib/types/paciente";
import { DataTable } from "@/src/components/paciente/data-table";
import { columns } from "@/src/components/paciente/columnas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar28 } from "@/src/components/date-picker2";
import { CalendarRange } from "@/src/components/date-picker";
import { Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

export function PacienteListClient({
  initialData,
}: {
  initialData: Paciente[];
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [data, setData] = useState<Paciente[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const fetchPacientes = async (nombre?: string, range?: DateRange) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (nombre) params.set("nomb_pac", nombre);
      if (range?.from) {
        params.set("fecha_registro_after", range.from.toISOString());
      }
      if (range?.to) {
        params.set("fecha_registro_before", range.to.toISOString());
      }

      // const res = await fetch(`/api/pacientes?${params.toString()}`);
      const res = await fetchWithAuthRedirect(
        `/api/pacientes?${params.toString()}`
      );
      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar pacientes`);
      }

      const json = await res.json();
      if (!json.results) {
        throw new Error("Respuesta no contiene resultados");
      }

      setData(json.results);

      const total = json.count;
      const pageSize = json.results?.length ?? 1;
      const pages = Math.ceil(total / pageSize);
      setTotalPages(pages);
    } catch (error) {
      console.error("❌ Error al cargar pacientes:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Cargar pacientes iniciales si no se pasó initialData
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPacientes(search); // ← solo se ejecuta si el usuario deja de escribir por 500ms
    }, 500);

    return () => clearTimeout(delay); // ← cancela si el usuario sigue escribiendo
  }, [search, page]);

  // Re-fetch cuando cambia la página
  const handleSearch = () => {
    setPage(1); // volver a la página 1 al hacer nueva búsqueda
    // el efecto se activa con el nuevo search
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 mr-8">
            {/* <div>
              <p className="text text mb-2 font-semibold">
                Seleccionar una fecha
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <CalendarRange onChange={setRange} />
              </div>
            </div> */}
            <div className="flex-1">
              <h3 className="text- font-semibold mb-2">Buscar por Paciente</h3>
              <div className="flex gap-4">
                <Input
                  placeholder="Buscar por nombre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
                <Button
                  className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
                  onClick={handleSearch}
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
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white p-6 rounded-md shadow-sm flex-1 min-h-[100vh] md:min-h-min">
          <h3 className="text mb font-semibold">Lista de Pacientes</h3>
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            emptyMessage={
              error
                ? "No se pudo cargar la lista de pacientes. Verifica tu sesión o conexión."
                : "No hay pacientes registrados por el momento."
            }
          />
        </div>
      </div>
    </div>
  );
}

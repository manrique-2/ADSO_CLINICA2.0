"use client";

import { useEffect, useState } from "react";
import { Cita } from "@/lib/types/cita";
import { DataTable } from "@/src/components/historia-clinica/components/data-table";
import { columns } from "@/src/components/historia-clinica/components/columnas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

function formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function MovimientoList() {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [data, setData] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedToday = formatDateLocal(today);

  const fetchCitas = async (nombre?: string) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("fecha", formattedToday);
      if (nombre) {
        params.set("paciente", nombre);
      }

      const res = await fetchWithAuthRedirect(
        `/api/citas?${params.toString()}`
      );
      const json = await res.json();

      setData(json.results);

      const total = json.count;
      const pageSize = json.results.length;
      const pages = Math.ceil(total / pageSize);
      setTotalPages(pages);
    } catch (error) {
      console.error("❌ Error al cargar citas del día:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas(search);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchCitas(search);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 mr-8 w-full">
            <div className="flex-1">
              <h3 className="text font-semibold mb-2">Nombres Apellidos</h3>
              <div className="flex gap-4">
                <Input
                  disabled
                  placeholder="Buscar por nombre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
                <Button
                  disabled
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

        <div className="bg-white p-6 rounded-md shadow-sm flex-1 min-h-[100vh] md:min-h-min">
          <DataTable
            columns={columns()}
            data={data}
            loading={loading}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            emptyMessage={
              error
                ? "No se pudo cargar la lista de citas. Verifica tu sesión o conexión."
                : "No hay citas registradas para hoy."
            }
          />
        </div>
      </div>
    </div>
  );
}

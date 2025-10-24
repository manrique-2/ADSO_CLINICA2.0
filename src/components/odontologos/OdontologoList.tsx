"use client";

import { useEffect, useState } from "react";
import { Medico } from "@/lib/types/medico";
import { DataTable } from "@/src/components/odontologos/data-table";
import { columns } from "@/src/components/odontologos/columnas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { CalendarRange } from "@/src/components/date-picker";
import { Loader2 } from "lucide-react";
// import { DateRange } from "react-day-picker";
// import { Skeleton } from "@/components/ui/skeleton";

export function OdontologoList({ initialData }: { initialData: Medico[] }) {
  const [data, setData] = useState<Medico[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  // const [loadSearch, setLoadSearch] =useState(false)
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOdontologos = async (nombre?: string) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (nombre) params.set("nombre", nombre);
      // if (range?.from) {
      //   params.set("fecha_registro_after", range.from.toISOString());
      // }
      // if (range?.to) {
      //   params.set("fecha_registro_before", range.to.toISOString());
      // }

      const res = await fetch(`/api/medicos?${params.toString()}`);
      const json = await res.json();

      setData(json);

      const total = json.count;
      const pageSize = json.length;
      const pages = Math.ceil(total / pageSize);
      setTotalPages(pages);
    } catch (err) {
      console.error("❌ Error al cargar medicos:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Por si initialData es vacío, carga por defecto (solo la primera vez)
  useEffect(() => {
    if (initialData.length === 0) {
      fetchOdontologos();
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* 🔍 Barra de búsqueda */}
        <div className="mt-4 bg-white p-6 rounded-md shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 mr-8">
            {/* <div>
              <p className="text text mb-2 font-semibold">
                Seleccionar una fecha
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <CalendarRange />
              </div>
            </div> */}
            <div className="flex-1">
              <h3 className="text- font-semibold mb-2">
                Buscar por Odontologo
              </h3>
              <div className="flex gap-4">
                <Input
                  placeholder="Buscar por nombre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
                <Button
                  className="bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
                  onClick={() => fetchOdontologos(search)}
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
        {/*  Tabla */}
        <div className=" bg-white p-6 rounded-md shadow-sm flex-1 min-h-[100vh] md:min-h-min">
          <h3 className="text mb font-semibold">Lista de Odontologos</h3>
          <DataTable
            columns={columns}
            data={data}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            emptyMessage={
              error
                ? "No se pudo cargar la lista de odontologos. Verifica tu sesión o conexión."
                : "No hay odontologos registrados por el momento."
            }
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

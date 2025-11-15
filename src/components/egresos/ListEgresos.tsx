"use client";

import { useEffect, useState } from "react";
import { EgresoClinica } from "@/lib/types/egresos/egreso-clinica";
import { EgresoLab } from "@/lib/types/egresos/egreso-lab";
import { DataTableClinica } from "@/src/components/egresos/components/data-table-clinica";
import { DataTableLab } from "@/src/components/egresos/components/data-table-lab";
import { columns as columnsClinica } from "@/src/components/egresos/components/columnas-clinica";
import { columns as columsLab } from "@/src/components/egresos/components/columnas-lab";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

export function ListEgresos({
  initialData,
}: {
  initialData: {
    dataClinica: EgresoClinica[];
    dataLab: EgresoLab[];
  };
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();

  const [tipo, setTipo] = useState<"clinica" | "lab">("clinica");
  const [dataClinica, setDataClinica] = useState<EgresoClinica[]>(initialData.dataClinica);
  const [dataLab, setDataLab] = useState<EgresoLab[]>(initialData.dataLab);
  const [loading, setLoading] = useState(
    (initialData?.dataClinica?.length ?? 0) === 0 &&
    (initialData?.dataLab?.length ?? 0) === 0
  );
  const [error, setError] = useState(false);
  const [fechaRegistro, setFechaRegistro] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEgresos = async (fecha_registro?: string) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (fecha_registro) params.set("fecha_registro", fecha_registro);

      const res = await fetchWithAuthRedirect(
        `/api/egresos/?tipo_egreso=${tipo}&divide=true&${params.toString()}`
      );
      if (!res.ok) throw new Error(`Error ${res.status} al cargar egresos`);

      const json = await res.json();

      if (!json.clinica && !json.laboratorio) {
        throw new Error("Respuesta inválida del backend");
      }

      // ✅ Set results
      setDataClinica(json.clinica ?? []);
      setDataLab(json.laboratorio ?? []);

      // ✅ pagination using active table size
      const currentResults =
        tipo === "clinica" ? json.clinica ?? [] : json.laboratorio ?? [];

      const total = json.count;
      const pageSize = currentResults.length || 1;
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error("❌ Error al cargar egresos:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEgresos(fechaRegistro);
  }, [page, fechaRegistro, tipo]);

  const handleBuscar = () => {
    setPage(1);
    fetchEgresos(fechaRegistro);
  };

  const ActiveTable =
    tipo === "clinica" ? (
      <DataTableClinica
        columns={columnsClinica}
        data={dataClinica}
        loading={loading}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        emptyMessage="No hay egresos de clínica registrados."
      />
    ) : (
      <DataTableLab
        columns={columsLab}
        data={dataLab}
        loading={loading}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        emptyMessage="No hay egresos de laboratorio registrados."
      />
    );

  return (
    <div className="space-y-4">
      {/* Selector tipo de egreso */}
      <div className="flex gap-3">
        <Button
          variant={tipo === "clinica" ? "default" : "outline"}
          onClick={() => {
            setTipo("clinica");
            setPage(1);
          }}
        >
          Clínica
        </Button>
        <Button
          variant={tipo === "lab" ? "default" : "outline"}
          onClick={() => {
            setTipo("lab");
            setPage(1);
          }}
        >
          Laboratorio
        </Button>
      </div>

      {/* Filtro Fecha */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="font-semibold mb-2">Buscar por Fecha de Registro</h3>

        {/* ✅ Display selected date */}
        {fechaRegistro && (
          <p className="text-sm text-muted-foreground mb-2">
            Fecha seleccionada:{" "}
            <span className="font-semibold text-black">
              {new Date(fechaRegistro).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        )}

        <div className="flex gap-4">
          <Calendar
            mode="single"
            selected={fechaRegistro ? new Date(fechaRegistro) : undefined}
            onSelect={(date) => {
              if (!date) return;
              const iso = date.toISOString().split("T")[0];
              setFechaRegistro(iso);
              setPage(1);
            }}
          />

          <Button
            className="bg-[#337ab7] hover:bg-[#285e8e]"
            onClick={handleBuscar}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" /> Buscando...
              </div>
            ) : (
              "Buscar"
            )}
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white p-6 rounded-md shadow-sm">{ActiveTable}</div>
    </div>
  );
}

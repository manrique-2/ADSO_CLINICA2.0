"use client";

import { useEffect, useState } from "react";
import {
  Ingreso,
  Egreso,
  CierreCaja,
} from "@/lib/types/cierre-de-caja/cierreCaja";
import { DataTable } from "@/src/components/cierre-de-caja/components/data-table";
import { DataTableEgresos } from "@/src/components/cierre-de-caja/components/data-tableEgresos";
import { columnsIngresos } from "@/src/components/cierre-de-caja/components/columnasIngresos";
import { columnsEgresos } from "@/src/components/cierre-de-caja/components/columnasEgresos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumenCierreCaja } from "@/src/components/cierre-de-caja/components/ResumenCierreCaja";
import { Loader2, Search } from "lucide-react";

type Props = {
  ingresos: Ingreso[];
  egresos: Egreso[];
  balance: number;
  total_ingresos: number;
  total_egresos: number;
};

export function ListaIngresosyEgresos({
  ingresos,
  egresos,
  balance,
  total_ingresos,
  total_egresos,
}: Props) {
  const [data, setData] = useState<CierreCaja>({
    ingresos: ingresos ?? [],
    egresos: egresos ?? [],
    balance: balance ?? 0,
    total_ingresos: total_ingresos ?? 0,
    total_egresos: total_egresos ?? 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCierreCaja = async (selectedDate?: string) => {
    setLoading(true);
    setError(false);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (selectedDate) params.set("date", selectedDate);

      const res = await fetch(`/api/cierre-de-caja?${params.toString()}`);
      if (!res.ok) throw new Error("Error al cargar cierre de caja");

      const json: CierreCaja = await res.json();
      setData(json);

      // si luego tu backend soporta paginación, puedes actualizar esto
      setTotalPages(1);
    } catch (err) {
      console.error("❌ Error al cargar cierre de caja:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCierreCaja(date);
  }, []);

  return (
    <div className="space-y-6">
      <ResumenCierreCaja
        total_ingresos={data.total_ingresos}
        total_egresos={data.total_egresos}
        balance={data.balance}
      />
      {/* INGRESOS */}
      <div className="bg-white p-6 rounded-md shadow-sm flex-1 ">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Ingresos del día</h3>
          <div className="flex items-center gap-3">
            <div className="w-full flex items-center gap-3">
              <p className="font-medium w-full">Seleccionar fecha:</p>
              <Input
                // placeholder="Buscar paciente..."
                type="date"
                // value={search}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-"
              />
            </div>
            <Button
              className="bg-[#337ab7] hover:bg-blue-600 cursor-pointer"
              onClick={() => fetchCierreCaja(date)}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  Buscando...
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Search />
                  <p className="text-md">Buscar</p>
                </div>
              )}

              {/* Buscar */}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 ml-2"
              onClick={async () => {
                setReportLoading(true);
                try {
                  // Enviar los datos ya cargados en el cliente al endpoint POST para evitar re-fetch y problemas de auth
                  const payload = {
                    date,
                    data,
                  };

                  const res = await fetch(`/api/cierre-de-caja/report`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  if (!res.ok) {
                    const errJson = await res.json().catch(() => null);
                    console.error("Error generando reporte:", errJson || res.statusText);
                    throw new Error("Error generando reporte");
                  }

                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `cierre-${date}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error(err);
                  alert("Error al generar el reporte. Revisa la consola para más detalles.");
                } finally {
                  setReportLoading(false);
                }
              }}
              disabled={reportLoading}
            >
              {reportLoading ? "Generando..." : "Generar reporte"}
            </Button>
          </div>
        </div>

        <DataTable
          columns={columnsIngresos}
          data={data.ingresos}
          loading={loading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          emptyMessage={
            error ? "Error al cargar ingresos." : "No hay ingresos registrados."
          }
        />
      </div>

      {/* EGRESOS */}
      <div className="bg-white p-6 rounded-md shadow-sm flex-1">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Egresos del día</h3>
        </div>

        <DataTableEgresos
          columns={columnsEgresos}
          data={data.egresos}
          loading={loading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          emptyMessage={
            error ? "Error al cargar egresos." : "No hay egresos registrados."
          }
        />

        <div className="text-right mt-4">
          {/* <p>
            <strong>Balance:</strong> S/ {data.balance?.toFixed(2) ?? 0}
          </p> */}
        </div>
      </div>
    </div>
  );
}

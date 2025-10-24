import React from "react";
import { getCierreDeCaja } from "@/lib/server/cierre-de-caja";
import { ListaIngresosyEgresos } from "@/src/components/cierre-de-caja/ListaIngresosyEgresos";

export default async function Cajapage() {
  // 🔹 Llamas a tu función del servidor (usa cookies del backend correctamente)
  const data = await getCierreDeCaja();

  // 🔹 Renderizas los datos pasando las props al componente cliente
  return (
    <div>
      <div className="flex items-end gap-2 mb-4">
        <h2 className="text-2xl font-semibold ">Cierre de Caja </h2>
        <p className="text-[15px] text-gray-500">Control de ingresos del dia</p>
      </div>

      <ListaIngresosyEgresos
        ingresos={data.ingresos}
        egresos={data.egresos}
        total_ingresos={data.total_ingresos}
        total_egresos={data.total_egresos}
        balance={data.balance}
        // initialData={results}
      />
    </div>
  );
}

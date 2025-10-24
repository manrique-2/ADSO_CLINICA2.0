"use client";
import React, { useState } from "react";
import { CitaHistorial } from "lib/types/historial";
import { DataTable } from "@/src/components/historia-clinica/ver/components/data-table";
import { columns } from "@/src/components/historia-clinica/ver/citapaciente/columnas";

/**
 * Componente para mostrar las citas de un paciente en su historial.
 * @param citas - Lista de citas del paciente.
 */
interface CitaPacienteProps {
  citas: CitaHistorial[];
  medicosMap: Record<number, string>;
}

export function CitaPaciente({ citas, medicosMap }: CitaPacienteProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Simulamos paginación local (ya que citas es un array estático)
  const totalPages = Math.ceil(citas.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const citasPaginadas = citas.slice(start, end);
  return (
    <div>
      {/* <p className="mb-4 text-[14.5px] text-gray-500">Listado de citas</p> */}
      <div>
        <DataTable
          columns={columns({ medicosMap })}
          // data={citas}
          // page={1}
          // totalPages={1}
          // setPage={() => {}}
          // // pagination
          // // pageSize={1}
          data={citasPaginadas}
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}

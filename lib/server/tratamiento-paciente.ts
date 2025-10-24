// import { cookies } from "next/headers";
import { TratamientoPaciente } from "@/lib/types/tratamiento-paciente/tratamiento-paciente";

// lib/server/tratamientos.ts
export async function getTratamientoPaciente(): Promise<{ results: TratamientoPaciente[] }> {
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/tratamiento_paciente`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
}


import { cookies } from "next/headers";
import { Paciente } from "@/lib/types/paciente";

// lib/server/paciente.ts
export async function getPacientes(): Promise<{ results: Paciente[] }> {
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/pacientes`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
}


// import { cookies } from "next/headers";
import { Medico } from "@/lib/types/medico";

// const BASE_API = process.env.API_BASE_URL || "https://flask-django-adso.jmtqu4.easypanel.host"
// const SITE_URL = process.env.SITE_URL || "http://localhost:3000"; //

// lib/server/paciente.ts
export async function getMedicos(): Promise<{ results: Medico[] }> {
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/medicos`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
  
}


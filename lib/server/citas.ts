import { cookies } from "next/headers";
import { Cita } from "@/lib/types/cita";

const BASE_API = process.env.API_BASE_URL || "https://flask-django-adso.jmtqu4.easypanel.host"
const SITE_URL = process.env.SITE_URL || "http://localhost:3000"; //

// lib/server/paciente.ts
export async function getCitas(): Promise<{ results: Cita[] }> {
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/citas`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
}


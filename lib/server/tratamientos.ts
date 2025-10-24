// import { cookies } from "next/headers";
import { Tratamiento } from "@/lib/types/tratamiento/tratamiento";

// const BASE_API = process.env.API_BASE_URL || "https://flask-django-adso.jmtqu4.easypanel.host"
// const SITE_URL = process.env.SITE_URL || "http://localhost:3000"; //

// lib/server/tratamientos.ts
export async function getTratamientos(): Promise<{ results: Tratamiento[] }> {
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/tratamientos`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
}


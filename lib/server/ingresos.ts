// import { cookies } from "next/headers";
import { Ingresos } from "@/lib/types/ingresos/ingresos";

// lib/server/ingresos.ts
export async function getIngresos(): Promise<{ results: Ingresos[] }> {
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/ingresos`, {
    cache: "no-store",
  });

  if (!res.ok) return { results: [] };

  return res.json();
}


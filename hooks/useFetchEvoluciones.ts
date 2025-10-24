// hooks/useFetchEvoluciones.ts
import { useState } from "react";
import { EvolucionHistorial } from "@/lib/types/historial"; // Asegúrate de tener este tipo definido correctamente

export const useFetchEvoluciones = () => {
  const [data, setData] = useState<EvolucionHistorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchEvoluciones = async (pacienteId?: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/paciente_evoluciones/?paciente=${pacienteId}`);
    
    if (!res.ok) {
      throw new Error(`Error del servidor: ${res.status}`);
    }

    const text = await res.text(); // lee como texto para revisar antes de parsear
    const json = text ? JSON.parse(text) : { results: [] };

    setData(json.results || []);
    } catch (err) {
      console.error("Error fetching evoluciones:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchEvoluciones };
};

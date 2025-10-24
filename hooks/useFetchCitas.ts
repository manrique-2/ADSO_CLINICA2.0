import { useState } from "react";
import { Cita } from "@/lib/types/cita"; // Asegúrate de tener el tipo Cita bien definido

export const useFetchCitas = () => {
  const [data, setData] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCitas = async ({
    medico,
    fecha,
  }: {
    medico?: string;
    fecha?: string;
  }) => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      if (medico) params.set("medico_id", medico);
      if (fecha) params.set("fecha", fecha);

      const res = await fetch(`/api/citas?${params.toString()}`);
      const json = await res.json();
      setData(json.results);
    } catch (err) {
      console.error("Error fetching citas:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchCitas };
};

"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Paciente = {
  id: number;
  nomb_pac: string;
  apel_pac: string;
};

type PacienteSelectProps = {
  value?: string; // id del paciente seleccionado
  onChange: (value: string) => void;
  pacientesOptions?: Paciente[]; // lista inicial (ej: paciente de la cita)
  has_debt?: boolean; // filtrar solo pacientes con deuda
};

export default function PacienteSelect({
  value,
  onChange,
  pacientesOptions = [],
  has_debt,
}: PacienteSelectProps) {
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length < 2) return;

    const fetchPacientes = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("nomb_pac", search);
        // params.set("page", "1");
        // params.set("page_size", "20");
        if (has_debt) {
          params.set("has_debt", "true");
        }

        const res = await fetch(`/api/pacientes?${params.toString()}`);
        if (!res.ok) throw new Error("Error al buscar pacientes");

        const data = await res.json();
        setPacientes(data.results || data);
      } catch (err) {
        console.error(err);
        setPacientes([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchPacientes, 500);
    return () => clearTimeout(delay);
  }, [search]);

  // Mezclamos opciones iniciales con resultados de búsqueda (evitando duplicados)
  // const allPacientes = [...pacientesOptions, ...pacientes].filter(
  //   (p, index, self) => index === self.findIndex((x) => x.id === p.id)
  // );

  // Ya no mezclamos con pacientesOptions
  // const allPacientes = pacientes;
  return (
    <div className="space-y-2">
      <Input
        placeholder="Buscar paciente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={value} onValueChange={(val) => {
        console.log("Paciente selected:", val);
        onChange(val);
      }}>
        <SelectTrigger>
          <SelectValue
            placeholder={loading ? "Buscando..." : "Seleccionar paciente"}
          />
        </SelectTrigger>
        <SelectContent>
          {pacientes.length > 0 ? (
            pacientes.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.nomb_pac} {p.apel_pac}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground">
              No hay resultados
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

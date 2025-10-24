"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Check } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import { cn } from "@/lib/utils";

interface Paciente {
  id: number;
  nomb_pac: string;
  apel_pac: string;
  // dni_pac: string;
}

export function PacienteCombobox({
  onSelect,
  selectedPaciente,
}: {
  onSelect: (paciente: Paciente) => void;
  selectedPaciente?: Paciente;
}) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Paciente[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Debounce para evitar demasiadas llamadas a la API
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms de delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  React.useEffect(() => {
    if (debouncedQuery.length >= 2) {
      handleSearch(debouncedQuery);
    } else {
      setOptions([]);
    }
  }, [debouncedQuery]);

  async function handleSearch(query: string) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("nomb_pac", query);

      const res = await fetchWithAuthRedirect(
        `/api/pacientes?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setOptions(data.results ?? []);
    } catch (error) {
      console.error("Error al buscar pacientes:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectPaciente = (paciente: Paciente) => {
    onSelect(paciente);
    setOpen(false);
    setSearchQuery(""); // Limpiar búsqueda al seleccionar
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPaciente ? (
            <span className="truncate">
              {selectedPaciente.nomb_pac} {selectedPaciente.apel_pac}
            </span>
          ) : (
            <span className="text-muted-foreground">
              Seleccionar paciente...
            </span>
          )}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={handleInputChange}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {loading && (
            <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin" />
          )}
        </div>

        <Command>
          <CommandList>
            {loading && (
              <CommandEmpty>
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando pacientes...
                </div>
              </CommandEmpty>
            )}

            {!loading && searchQuery.length < 2 && (
              <CommandEmpty>
                Escribe al menos 2 caracteres para buscar
              </CommandEmpty>
            )}

            {!loading && searchQuery.length >= 2 && options.length === 0 && (
              <CommandEmpty>
                No se encontraron pacientes con "{searchQuery}"
              </CommandEmpty>
            )}

            {!loading && options.length > 0 && (
              <CommandGroup>
                {options.map((paciente) => (
                  <CommandItem
                    key={paciente.id}
                    value={paciente.nomb_pac}
                    onSelect={() => handleSelectPaciente(paciente)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPaciente?.id === paciente.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {paciente.nomb_pac} {paciente.apel_pac}
                      </span>
                      {/* <span className="text-sm text-muted-foreground">
                        DNI: {paciente.dni_pac}
                      </span> */}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

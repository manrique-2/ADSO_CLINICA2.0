// src/components/tratamiento/tratamiento-form.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  tratamientoSchema,
  TratamientoFormData,
} from "@/lib/types/tratamiento/tratamiento-form";

export default function TratamientoForm(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);

  const form = useForm<TratamientoFormData>({
    resolver: zodResolver(tratamientoSchema),
    defaultValues: { nombre: "", precioBase: undefined, categoria: "" },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/categoria_tratamiento", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCategorias(Array.isArray(data.results) ? data.results : []);
      } catch {
        toast.error("No se pudieron cargar las categorías");
      }
    })();
  }, []);

  const onSubmit = async (values: TratamientoFormData) => {
    setLoading(true);
    try {
      const payload = {
        nombre: values.nombre,
        precioBase: Number(values.precioBase) || 0,
        categoria: values.categoria ? Number(values.categoria) : null,
      };

      const res = await fetch("/api/tratamientos", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();

      if (res.status === 401) {
        toast.error("Sesión expirada. Inicia sesión.");
        return;
      }
      if (!res.ok) {
        console.error("POST /api/tratamientos", res.status, text);
        toast.error("Error al registrar tratamiento");
        return;
      }

      toast.success("Tratamiento registrado");
      router.replace("/dashboard/tratamiento/registrar");
    } catch (e) {
      console.error(e);
      toast.error("Error al enviar solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Tratamiento</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="precioBase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio Base</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    placeholder="Precio Base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={(field.value ?? "").toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          <Button type="submit" className="bg-[#337ab7] hover:bg-[#285e8e]">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                Registrando...
              </div>
            ) : (
              "Registrar tratamiento"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// components/paciente/paciente-form.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar28 } from "../date-picker2";
import { pacienteSchema, PacienteFormData } from "@/lib/types/paciente-form";
import { Loader2 } from "lucide-react";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";

export default function PacienteForm() {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nomb_pac: "",
      apel_pac: "",
      dni_pac: "",
      dire_pac: "",
      telf_pac: "",
      emai_pac: "",
      sexo: "MASCULINO",
      observacion: "",
      edad_pac: "",
      estudios_pac: "NINGUNO",
      lugar_nacimiento: "",
      pais_id: "",
      departamento_id: "",
      provincia_id: "",
      distrito_id: "",
      fena_pac: "",
      civi_pac: "S",
      afil_pac: "",
      esta_pac: "ACTIVO",
      aler_pac: "",
      clinica: "",
    },
  });

  const onSubmit = async (values: PacienteFormData) => {
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect("/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        let errorDetail = "Error al registrar paciente";

        try {
          const error = await res.json();
          if (error && typeof error === "object") {
            // Combinar todos los mensajes de error si vienen como objeto
            if (error.dni_pac?.[0]?.includes("already exists")) {
              errorDetail = "El DNI ya está registrado, intente con otro";

              // 🔽 Esto muestra el mensaje debajo del campo de DNI en el formulario
              form.setError("dni_pac", {
                type: "manual",
                message: "El DNI ya está registrado, intente con otro",
              });
            } else {
              errorDetail = Object.values(error).flat().join("\n");
            }
          }
        } catch {
          // Si no se puede parsear el error, se deja el mensaje genérico
        }

        toast.error(errorDetail);
        return;
      }

      toast.success("Paciente registrado con éxito");

      setTimeout(() => {
        router.push("/dashboard/registro/paciente");
      }, 1000);
    } catch (error) {
      toast.error("Error al enviar solicitud");
      console.error(error);
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
            name="nomb_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre<span>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nombre completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apel_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Apellido<span>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="edad_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edad</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estudios_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grado de Instruccion</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Seleccionar -- " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NINGUNO">Ninguno</SelectItem>
                    <SelectItem value="PRIMARIA">Primaria</SelectItem>
                    <SelectItem value="SECUNDARIA">Secundaria</SelectItem>
                    <SelectItem value="TECNICO">Tecnico</SelectItem>
                    <SelectItem value="UNIVERSITARIO">Universitario</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lugar_nacimiento"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Hospital de nacimiento</FormLabel>
                <FormControl>
                  <Input placeholder="Hospital de nacimiento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="pais_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pais:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Peru -- " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="departamento_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Seleccionar -- " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="provincia_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Seleccionar -- " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distrito_id"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Distrito:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={true} // Disable the select if needed
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Seleccionar -- " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="dire_pac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direccion</FormLabel>
              <FormControl>
                <Input className="" placeholder="Direccion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dni_pac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                DNI<span>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="w-fit"
                  placeholder="N° Documento"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="telf_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="Telefono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fena_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  {/* <Calendar28 /> */}
                  <Input type="date" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="civi_pac"
            render={({ field }) => (
              <FormItem className="col-span">
                <FormLabel>Estado civil</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || "C"}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="  " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="C">Casado(a)</SelectItem>
                    <SelectItem value="S">Soltero(a)</SelectItem>
                    <SelectItem value="V">Viudo(a)</SelectItem>
                    <SelectItem value="D">Divorciado(a)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="afil_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Afiliado</FormLabel>
                <FormControl>
                  <Input placeholder="Afiliado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem className="col-span-">
                <FormLabel>Sexo:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    // defaultValue="MASCULINO"
                    value={field.value}
                    className="flex "
                    // name="sexo"
                    // onGotPointerCapture={field.onChange}
                  >
                    {/* <Input placeholder="" {...field} /> */}
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="MASCULINO" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Masculino
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="FEMENINO" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Femenino
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="esta_pac"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="  " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activo</SelectItem>
                    <SelectItem value="INACTIVO">Inactivo</SelectItem>
                    {/* <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="aler_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alergia</FormLabel>
                <FormControl>
                  <Input placeholder="Alergia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emai_pac"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="clinica"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clínica</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Seleccione clínica --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      Clínica Dental Sede Iquitos
                    </SelectItem>
                    <SelectItem value="2">
                      Clínica Dental Filial Yurimaguas
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observacion"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Boton guardar*/}
        <div className="flex justify-">
          <Button
            type="submit"
            className=" bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                Registrando...
              </div>
            ) : (
              "Registrar paciente"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

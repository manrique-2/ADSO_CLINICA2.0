// components/paciente/paciente-form.tsx
"use client";

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
// import { Calendar22 } from "../date-picker";

// 1. Validación
const pacienteSchema = z.object({
  nomb_pac: z.string().min(1, { message: "El nombre es requerido." }).trim(),
  apel_pac: z.string().min(1, { message: "El apellido es requerido." }).trim(),
  dire_pac: z.string().trim(),
  dni_pac: z.string().min(1, { message: "El DNI es requerido." }).trim(),
  telf_pac: z.string().trim(),
  sexo: z.string().trim(),
  esta_pac: z.string().trim(),
  emai_pac: z.string().trim(),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;

export default function OdontoForm() {
  const router = useRouter();

  const form = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nomb_pac: "",
      apel_pac: "",
      dni_pac: "",
      dire_pac: "",
      telf_pac: "",
      emai_pac: "",
      sexo: "",
      esta_pac: "",
    },
  });

  const onSubmit = async (values: PacienteFormData) => {
    // try {
    //   const res = await fetch("/api/pacientes", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });
    //   if (!res.ok) {
    //     const error = await res.json().catch(() => ({}));
    //     toast.error(error.detail || "Error al registrar paciente");
    //     return;
    //   }
    //   toast.success("Paciente registrado con éxito");
    //   setTimeout(() => {
    //     router.push("/dashboard/registro/paciente");
    //   }, 1000);
    // } catch (error) {
    //   toast.error("Error al enviar solicitud");
    //   console.error(error);
    // }
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
                <FormLabel>Nombre</FormLabel>
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
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="esta_pac"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Especialidad</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="ACTIVO">
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="  " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activado</SelectItem>
                    <SelectItem value="INACTIVO">Inactivo</SelectItem>
                    {/* <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dni_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input className="" placeholder="N° Documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="telf_pac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input placeholder="N° celular" {...field} />
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
                    defaultValue={field.value}
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
                <Select onValueChange={field.onChange} defaultValue="ACTIVO">
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="  " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activado</SelectItem>
                    <SelectItem value="INACTIVO">Inactivo</SelectItem>
                    {/* <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}
        <FormField
          control={form.control}
          name="emai_pac"
          render={({ field }) => (
            <FormItem className="col-span">
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}
        {/* Boton guardar*/}
        <div className="flex justify-">
          <Button
            type="submit"
            className=" bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
          >
            Registrar Odontologo
          </Button>
        </div>
      </form>
    </Form>
  );
}

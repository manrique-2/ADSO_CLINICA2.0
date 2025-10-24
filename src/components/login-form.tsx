"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Correo inválido").min(1, {
    message: "El correo es requerido.",
  }),
  password: z
    .string()
    .min(1, {
      message: "La contraseña es requerida.",
    })
    .trim(),
});

export function LoginForm() {
  // const router = useRouter();
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      console.log("Valores enviados al backend:", values);
      console.log("🟢 Respuesta del servidor:", res);

      if (!res.ok) {
        throw new Error("Credenciales inválidas");
      }
      // Redirigir al dashboard
      await res.json(); // 👈 fuerza espera de la cookie
      // router.push("/dashboard");
      // toast.success("Inicio de sesión exitoso");
      // toast.success("Inicio de sesión correctamente");
      toast.success("Sesión Iniciada correctamente");
      window.location.href = "/dashboard";
      console.log("Inicio de sesión exitoso");
    } catch (error: any) {
      console.error("Login fallido:", error);
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input
                  type="email"
                  placeholder="Correo electronico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input type="password" placeholder="Contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer"
        >
          {/* {loading ? "Ingresando..." : "Ingresar"} */}
          {/* {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto text-white" />
          ) : (
            "Ingresar"
          )} */}
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              Ingresando...
            </div>
          ) : (
            "Ingresar"
          )}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserSchema } from "@/lib/types/users-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Users } from "@/lib/types/users";
import { useFetchWithAuthRedirect } from "@/lib/client/fetchWithAuthRedirect";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  // especialidadesOptions: { id: number; nombre: string }[];
  usuario: Users;
  // enfermedadesMap: Record<number, string>;
  // alergiasMap: Record<number, string>
}

export function EditarUserForm({ usuario }: Props) {
  const fetchWithAuthRedirect = useFetchWithAuthRedirect();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cambiarPass, setCambiarPass] = useState(false);

  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: usuario.email,
      password: usuario.password,
      password2: usuario.password2,
      name: usuario.name,
      tipo_doc: usuario.tipo_doc,
      num_doc: usuario.num_doc,
      rol: usuario.rol,
      estado: usuario.estado,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      especialidad: usuario.especialidad ? String(usuario.especialidad) : "",
      clinica: usuario.clinica ? String(usuario.clinica) : "",
      // especialidad: usuario.especialidad,
    },
  });

  const onSubmit = async (values: User) => {
    console.log("SUBMIT EJECUTADO", values);
    setLoading(true);
    try {
      const res = await fetchWithAuthRedirect(`/api/users/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");

      toast.success("Usuario actualizado correctamente");

      setTimeout(() => {
        router.push("/dashboard/gestion-usuarios/usuarios");
      }, 1000);
      // form.reset();
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.log("Errores de validación:", errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nombre completo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Direccion" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Telefono" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={!cambiarPass}
                    {...field}
                    placeholder="Contraseña"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={!cambiarPass}
                    {...field}
                    placeholder="Confirmar contraseña"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cambiarPass"
            checked={cambiarPass}
            onCheckedChange={(checked) => setCambiarPass(!!checked)}
          />
          <Label htmlFor="cambiarPass">Cambiar contraseña</Label>
        </div> */}

        {/* <div className="grid gap-2">
          <Label htmlFor="password">Nueva contraseña</Label>
          <Input
            id="password"
            type="password"
            disabled={!cambiarPass}
            placeholder="********"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password2">Confirmar contraseña</Label>
          <Input
            id="password2"
            type="password"
            disabled={!cambiarPass}
            placeholder="********"
          />
        </div> */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipo_doc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Documento</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="RUC">RUC</SelectItem>
                      <SelectItem value="PASAPORTE">PASAPORTE</SelectItem>
                      <SelectItem value="NIC">NIC</SelectItem>
                      <SelectItem value="CEDULA">CEDULA</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="num_doc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de documento</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="N° documento" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medico">Médico</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="enfermero">Enfermero</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="especialidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidad</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Seleccione especialidad --" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {especialidadesOptions.map((e) => (
                        <SelectItem key={e.id} value={String(e.id)}>
                          {e.nombre}
                        </SelectItem>
                      ))} */}
                      <SelectItem value="1">General</SelectItem>
                      <SelectItem value="2">Ortodoncia</SelectItem>
                      <SelectItem value="3">Endodoncia dental</SelectItem>
                      <SelectItem value="4">tratamiento en niños</SelectItem>
                      <SelectItem value="5">
                        Tratamiento integro facial
                      </SelectItem>
                      <SelectItem value="6">Correcion de sonrisa</SelectItem>
                      <SelectItem value="7">
                        Atencion odontologica de urgencia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={!cambiarPass}
                      {...field}
                      placeholder="Contraseña"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={!cambiarPass}
                      {...field}
                      placeholder="Confirmar contraseña"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cambiarPass"
              checked={cambiarPass}
              onCheckedChange={(checked) => setCambiarPass(!!checked)}
            />
            <Label htmlFor="cambiarPass">Cambiar contraseña</Label>
          </div>
        </div>
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Seleccione estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="grid justify-end">
          <Button
            type="submit"
            className=" bg-[#337ab7] hover:bg-[#285e8e] cursor-pointer w-fit"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                Actualizando...
              </div>
            ) : (
              "Actualizar usuario"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

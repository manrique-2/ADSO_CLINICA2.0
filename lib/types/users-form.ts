import { z } from "zod";

export const RolUsuarioSchema = z.enum(["medico", "admin", "enfermero"]);

export const UserSchema = z.object({
  // id: z.number(),
  password: z.string().optional(),
  password2: z.string().optional(),
  
  // last_login: z.string().datetime().nullable().optional(),
  // is_superuser: z.boolean(),
  // first_name: z.string().optional(),
  // last_name: z.string().optional
  // is_staff: z.boolean(),
  // is_active: z.boolean(),
  // date_joined: z.string().datetime(),
  email: z.string()
      .min(1, { message: "El correo es obligatorio" })
      .email({ message: "Debe ser un correo válido" }),
  tipo_doc: z.string(),
  num_doc: z.string(),
  name: z.string().min(1, { message: "El nombre completo es obligatorio" }),
  direccion: z.string().min(1, { message: "La dirección es obligatoria" }),
  telefono: z.string().optional(),
  // foto: z.string().url().nullable().optional(),
  estado: z.string(),
  rol: RolUsuarioSchema,
  // is_active: z.
  // created_at: z.string().datetime(),
  // updated_at: z.string().datetime(),
  especialidad: z.string().optional(),
  clinica: z.string().optional(),
  // groups: z.array(z.number()),
  // user_permissions: z.array(z.number()),
}).refine(
  (data) => {
    // regla: si escribió una de las contraseñas, debe escribir la otra y deben coincidir
    if (data.password || data.password2) {
      return data.password === data.password2;
    }
    return true; // si no escribió nada, pasa la validación
  },
  {
    message: "Las contraseñas no coinciden",
    path: ["password2"], // el error se muestra en ese campo
  }
);

export type User = z.infer<typeof UserSchema>;

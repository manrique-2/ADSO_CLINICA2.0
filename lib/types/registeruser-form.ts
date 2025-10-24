// schemas/registerSchema.ts
import { z } from "zod";

export const rolUsuarioEnum = z.enum(["medico", "admin", "enfermero"]);
 
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El correo es obligatorio" })
      .email({ message: "Debe ser un correo válido" })
      .max(254, { message: "El correo no debe superar los 254 caracteres" }),

    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),

    password_confirmation: z
      .string()
      .min(1, { message: "Debe confirmar la contraseña" }),

    name: z
      .string()
      .min(1, { message: "El nombre completo es obligatorio" })
      .max(150, { message: "El nombre no debe superar los 150 caracteres" }),

    tipo_doc: z
      .string()
      .min(1, { message: "El tipo de documento es obligatorio" })
      .max(50, { message: "El tipo de documento no debe superar los 50 caracteres" }),

    num_doc: z
      .string()
      .min(1, { message: "El número de documento es obligatorio" })
      .max(50, { message: "El número de documento no debe superar los 50 caracteres" }),

    rol: rolUsuarioEnum,

    estado: z
      .string()
      .min(1, { message: "El estado es obligatorio" })
      .max(50, { message: "El estado no debe superar los 50 caracteres" }),

    direccion: z
      .string()
      .min(1, { message: "La dirección es obligatoria" })
      .max(200, { message: "La dirección no debe superar los 200 caracteres" }),

    telefono: z
      .string()
      .max(20, { message: "El teléfono no debe superar los 20 caracteres" })
      // .nullable()
      .optional(),

    especialidad: z.string().optional(),
    
    // clinica: z.string().optional(),
    clinica: z.string().min(1, { message: "La clínica es obligatoria" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

import { z } from "zod";

// ✅ Esquema Zod para validar los datos del formulario de paciente
export const pacienteSchema = z.object({
  nomb_pac: z.string().min(1, { message: "El nombre es requerido." }),
  apel_pac: z.string().min(1, { message: "El apellido es requerido." }),
  edad_pac: z.string().optional(),
  dire_pac: z.string().optional(),
  telf_pac: z.string().optional(),
  dni_pac: z.string().min(1, { message: "El DNI es requerido." }),
  fena_pac: z.string().optional(),
  civi_pac: z.string().optional(),
  afil_pac: z.string().optional(),
  aler_pac: z.string().optional(),
  emai_pac: z.string().optional(),
  sexo: z.enum(["MASCULINO", "FEMENINO"]),
  esta_pac: z.enum(["ACTIVO", "INACTIVO"]),
  estudios_pac: z.enum([
    "NINGUNO",
    "PRIMARIA",
    "SECUNDARIA",
    "TECNICO",
    "UNIVERSITARIO",
  ]),
  lugar_nacimiento: z.union([z.string().min(1), z.literal("")]).optional(),
  pais_id: z.string(), // se captura como string desde el select
  departamento_id: z.string(),
  provincia_id: z.string(),
  distrito_id: z.string(),
  observacion: z.string().optional(),
   clinica: z.string().min(1),
});

// 🟦 Tipo inferido a partir del schema
export type PacienteFormData = z.infer<typeof pacienteSchema>;

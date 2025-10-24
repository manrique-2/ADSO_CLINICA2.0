import { z } from "zod";

export const tratamientoPacienteSchema = z.object({
   asunto: z.string().min(1, "El asunto es obligatorio").max(200),
  observacion: z.string().max(1000).optional(),
  descuento: z.coerce.number().min(0, "El descuento no puede ser negativo"),
  paciente: z.number(),      // id
  tratamiento: z.number(),   // id
  convenio: z.boolean().optional(), // Nuevo campo opcional
});

export type TratamientoPacientes = z.infer<typeof tratamientoPacienteSchema>;

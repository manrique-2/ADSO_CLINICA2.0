import { z } from "zod";

export const tratamientoSchema = z.object({
// //   id: z.number().int().readonly(),
//   asunto: z.string().min(1).max(200),
//   observacion: z.string().max(1000).nullable().optional(),
// //   created_at: z.string().datetime().readonly(),
// //   updated_at: z.string().datetime().readonly(),
//   paciente: z.number().int(),
//   medico: z.number().int().nullable().optional(),
  
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  precioBase: z.number().min(0, { message: "El precio debe ser mayor o igual a 0" }),
  categoria: z.string().min(1, { message: "Selecciona una categoría" }),
});

export type TratamientoFormData = z.infer<typeof tratamientoSchema>;
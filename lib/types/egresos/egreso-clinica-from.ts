import { z } from "zod";

// lib/types/egresos/egreso-clinica-form.ts
export const egresoClinicaSchema = z.object({
  monto: z.coerce.number().min(0, "El monto debe ser mayor o igual a 0"),
  description: z.string().max(1000).optional(),
  fecha_registro: z.string().min(1, "La fecha es obligatoria"), // 👈 now required
});

export type EgresoClinicaData = z.infer<typeof egresoClinicaSchema>;


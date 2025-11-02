import { z } from "zod";

export const egresoLabSchema = z.object({
    tratamientoPaciente: z.number(),      // id
    monto: z.coerce.number().min(0, "El monto debe ser mayor o igual a 0"),
    description: z.string().max(1000).optional(),
    fecha_registro: z.string().min(1, "La fecha es obligatoria"),

});

export type EgresoLabData = z.infer<typeof egresoLabSchema>;

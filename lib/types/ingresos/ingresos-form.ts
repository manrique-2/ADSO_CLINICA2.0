import { z } from "zod";

export const ingresosSchema = z.object({
    tratamientoPaciente: z.number(),      // id
    medico: z.number(),   // id
    monto: z.coerce.number().min(0, "El monto debe ser mayor o igual a 0"),
    metodo: z.string().min(1, "El método de pago es obligatorio").max(100),

});

export type IngresosData = z.infer<typeof ingresosSchema>;

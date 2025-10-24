import { z } from "zod";

export const citaSchema = z.object({
  fecha: z.string().min(1, "La fecha es obligatoria"),
  hora: z.string().min(1, "La hora es obligatoria"),
  // enfermedad: z.string().min(1, "Especifica la enfermedad").max(100),
  // costo: z.coerce.number().optional(),
  // pagado: z.coerce.number().optional(),
  // saldo: z.coerce.number().optional(),
  // observaciones: z.string().min(1, "Las observaciones son obligatorias").max(100),
  // motivo: z.string().min(1, "El motivo es obligatorio").max(100),
  // estadoCita: z.enum(["PENDIENTE", "CONFIRMADA", "CANCELADA", "COMPLETADA"]),
  // estadoPago: z.enum(["NO_PAGADO", "PARCIAL", "PAGADO"]),
  medico: z.string().min(1,),
  paciente: z.string().min(1,),
  consultorio: z.string().min(1),
});

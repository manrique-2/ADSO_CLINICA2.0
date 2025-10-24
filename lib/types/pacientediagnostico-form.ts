import { z } from "zod";

export const pacienteDiagnosticoSchema = z.object({
  enfermedad: z.string().min(1),
//   medico: z.string().min(1,),
    paciente: z.string().min(1,),
//   especialidad: z.string().min(1),
});

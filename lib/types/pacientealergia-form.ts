import { z } from "zod";

export const pacienteAlergiaSchema = z.object({
  observacion: z.string().min(1).max(100),
  alergia: z.string().min(1,),
  paciente: z.string().min(1,),
//   especialidad: z.string().min(1),
});

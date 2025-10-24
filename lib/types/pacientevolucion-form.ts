import { z } from "zod";

export const pacienteEvolucionSchema = z.object({
  descripcion: z.string().min(1).max(100),
  medico: z.string().min(1,),
    paciente: z.string().min(1,),
  especialidad: z.string().min(1),
});

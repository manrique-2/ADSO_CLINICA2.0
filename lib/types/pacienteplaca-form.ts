import { z } from "zod";

export const pacientePlacaSchema = z.object({
   notas: z.string().max(1000).optional(),
    nombre: z
        .string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(100, { message: "El nombre no debe superar los 100 caracteres" }),
    paciente: z.string().min(1),
//    archivo: z
//         .any()
//         .refine(
//             (file) =>
//             file === undefined ||
//             file === null ||
//             file instanceof File,
//             { message: "El archivo debe ser válido o puede omitirse" }
//         )
//         .optional()

});

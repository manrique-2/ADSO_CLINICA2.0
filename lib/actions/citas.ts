// lib/actions/citas.ts
export async function eliminarCita(id: number) {
  const res = await fetch(`/api/citas/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    let errorDetail = "No se pudo eliminar";

    try {
      const error = await res.json();
      errorDetail = error?.detail || errorDetail;
    } catch {
      // Si la respuesta no tiene JSON (por ejemplo, 204), no pasa nada
    }

    throw new Error(errorDetail);
  }

  return true;
}

// const baseUrl = process.env.SITE_URL || "http://localhost:3000";
// export async function getCitaById(id: string) {
//   const res = await fetch(`${baseUrl}/api/citas/${id}`, {
//     method: "GET",
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return null;
//   }

//   const data = await res.json();

//   return {
//     id: data.id,
//     nomb_pac: data.nomb_pac || "",
//     apel_pac: data.apel_pac || "",
//     edad_pac: data.edad_pac || "",
//     dni_pac: data.dni_pac || "",
//     ocupacion: data.ocupacion || "",
//     lugar_nacimiento: data.lugar_nacimiento || "",
//     informacion_clinica: data.informacion_clinica || "",
//     dire_pac: data.direccion || "",
//     telf_pac: data.telefono || "",
//     foto_paciente: data.foto_paciente || "",
//     fena_pac: data.fena_pac || "",
//     fecha_registro: data.fecha_registro || "",
//     sexo_pac: data.sexo || "M",
//     civi_pac: data.civi_pac || "",
//     afil_pac: data.afil_pac || "",
//     aler_pac: data.aler_pac || "",
//     emai_pac: data.email || "",
//     titu_pac: data.titu_pac || "",
//     pais_id: data.pais_id || 0,
//     departamento_id: data.departamento_id || 0,
//     provincia_id: data.provincia_id || 0,
//     distrito_id: data.distrito_id || 0,
//     observacion: data.observacion || "",
//     esta_pac: data.esta_pac || "",
//     registro_pac: data.registro_pac || "",
//     estudios_pac: data.estudios_pac || "",
//   };
// }
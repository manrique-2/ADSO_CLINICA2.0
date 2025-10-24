  // src/lib/server/citas/getNombreMaps.ts

  // import { cookies } from "next/headers";
import { authFetchWithCookies } from "@/lib/api/authFetch";
import { getPaciente } from "@/lib/server/pacientes/getPacientes";

  // const BASE_API = process.env.API_BASE_URL;

  export async function getNombreMaps() {
  try {
    const [
      // pacientesResults,
      medResp, especResp,
      // alerResp
      enferResp] = await Promise.all([
      // authFetchWithCookies(`/api/pacientes/?page_size=1000`),
      // getPaciente(), // 👈 ya devuelve el array limpio
      authFetchWithCookies(`/api/medico_list/?page_size=1000`),
      authFetchWithCookies(`/api/especialidades/?page_size=1000`),
      // authFetchWithCookies(`/api/alergias/?page_size=1000`),
      authFetchWithCookies(`/api/enfermedades/?page_size=1000`),
    ]);

    // if (!pacResp.ok) throw new Error(`Error en pacientes: ${pacResp.status}`);
    if (!medResp.ok) throw new Error(`Error en medicos: ${medResp.status}`);
    if (!especResp.ok) throw new Error(`Error en especialidades: ${especResp.status}`);
    // if (!alerResp.ok) throw new Error(`Error en alergias: ${alerResp.status}`);
    if (!enferResp.ok) throw new Error(`Error en alergias: ${enferResp.status}`);

    // const pacientesData = await pacResp.json();
    const medicosData = await medResp.json();
    const especialidadesData = await especResp.json();
    // const alergiasData = await alerResp.json();
    const enfermedadesData = await enferResp.json();

    // const pacientesResults = Array.isArray(pacientesData.results) ? pacientesData.results : [];
    const medicosResults = Array.isArray(medicosData) ? medicosData : [];
    const especialidadesResults = Array.isArray(especialidadesData.results) ? especialidadesData.results : [];
    // const alergiasResults = Array.isArray(alergiasData.results) ? alergiasData.results : [];
    const enfermedadesResults = Array.isArray(enfermedadesData.results) ? enfermedadesData.results : [];

    // const pacientesMap = Object.fromEntries(
    //   pacientesResults.map((p: any) => [
    //     p.id,
    //     {
    //       nombre: `${p.nomb_pac} ${p.apel_pac}`,
    //       estado: p.esta_pac,
    //       edad: p.edad_pac,
    //       dni: p.dni_pac,
    //       telefono: p.telf_pac,
    //     },
    //   ])
    // );

    const medicosMap = Object.fromEntries(
      medicosResults.map((m: any) => [
        m.id,
    {
      name: m.name,
      clinica: m.clinica, // 👈 asegúrate de que venga en la API
    },])
    );

    const especialidadesMap = Object.fromEntries(
      especialidadesResults.map((e: any) => [e.id, `${e.nombre}`])
    );

    // const alergiasMap = Object.fromEntries(
    //   alergiasResults.map((a: any) => [a.id, `${a.nombre_ale}`])
    // );

 const enfermedadesMap = Object.fromEntries(
      enfermedadesResults.map((es: any) => [es.id, `${es.descripcion}`])
    );

    return {
      // pacientesMap,
      medicosMap, especialidadesMap,
      // alergiasMap,
      enfermedadesMap
    };
  } catch (error) {
    console.error("Error en getNombreMaps:", error);
    return {
      // pacientesMap: {},
      medicosMap: {},
      especialidadesMap: {},
      // alergiasMap: {},
      enfermedadesMap: {},
    };
  }
}

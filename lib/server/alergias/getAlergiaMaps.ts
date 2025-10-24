import { authFetchWithCookies } from "@/lib/api/authFetch";

export async function getAlergiaMaps(): Promise<Record<number, string>> {
  try {
    const res = await authFetchWithCookies("/api/alergias/");
    if (!res.ok) {
      console.error("Error al obtener alergias:", res.status);
      return {};
    }

    const data = await res.json();
    const alergiasArray = Array.isArray(data) ? data : data.results ?? [];

    // Convertimos array a objeto
    return alergiasArray.reduce((acc: Record<number, string>, a: any) => {
      acc[a.id] = a.nombre_ale;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error al hacer fetch de alergias:", error);
    return {};
  }
}

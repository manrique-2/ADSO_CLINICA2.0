// lib/actions/egresos.ts
const API_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://adso-adso-backend.4oghcf.easypanel.host";

export async function eliminarEgreso(id: number) {
  const res = await fetch(`${API_URL}/api/egresos/${id}`, {
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
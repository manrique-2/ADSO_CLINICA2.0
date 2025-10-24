// @/lib/actions/tratamiento.ts
export async function eliminarTratamiento(id: number) {
  const res = await fetch(`/api/tratamientos/${id}/`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("DELETE /api/tratamientos/:id", res.status, body);
    throw new Error("Error al eliminar tratamiento");
  }
  // Si el API devuelve 204 No Content, no intentes parsear JSON
  return res.status === 204 ? true : res.json().catch(() => true);
}

export async function eliminarUsers(id: number) {
  const res = await fetch(`/api/users/${id}`, {
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
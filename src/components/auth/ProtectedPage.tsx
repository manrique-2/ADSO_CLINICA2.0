import { getUsuario } from "@/lib/server/usuario";
import { redirect } from "next/navigation";

interface ProtectedPageProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default async function ProtectedPage({
  allowedRoles,
  children,
}: ProtectedPageProps) {
  const usuario = await getUsuario();

  if (!usuario) {
    // No hay usuario logueado -> redirigir o mostrar mensaje
    redirect("/login");
  }

  if (!allowedRoles.includes(usuario.rol.toLowerCase())) {
    // Rol no permitido
    redirect("/dashboard/acceso-denegado");
  }

  return <>{children}</>;
}

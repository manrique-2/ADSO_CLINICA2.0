"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Diccionario para mostrar nombres más legibles
const routeLabels: Record<string, string> = {
  dashboard: "Inicio",
  pacientes: "Pacientes",
  odontologo: "Odontologo",
  citas: "Citas",
  crear: "Crear",
  editar: "Editar",
  usuarios: "Usuarios",
  configuraciones: "Configuraciones",
  permisos: "Permisos",
  // Agrega más según tus rutas
};

function toTitleCase(text: string) {
  return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

const DynamicBreadcrumb = () => {
  const pathname = usePathname(); // p.ej. /dashboard/pacientes/crear
  const pathSegments = pathname.split("/").filter(Boolean); // ["dashboard", "pacientes", "crear"]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const label = routeLabels[segment] || toTitleCase(segment);

          return (
            <BreadcrumbItem key={href}>
              {isLast ? (
                <BreadcrumbPage className="text-white">{label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link className="text-gray-300" href={href}>
                      {label}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator className="hidden md:block text-white" />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;

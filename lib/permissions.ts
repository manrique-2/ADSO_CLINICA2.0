// src/lib/permissions.ts
export const rolePermissions: Record<string, string[]> = {
  admin: [
    "Inicio",
    "Registro",
    "Citas",
    "Tratamiento",
    "Tratamiento Paciente",
    "Historia clinica",
    "Ingresos",
    "Cierre de caja",
    "Reportes",
    // "Procedimiento",
    "Mantenimiento",
    "Catalogo",
    "Gestion Usuarios",
    "Configuracion",
  ],
  medico: [ "Inicio",
    "Registro",
    "Citas",
    "Tratamiento",
    "Tratamiento Paciente",
    "Historia clinica",
    "Ingresos",
    "Cierre de caja",
    "Reportes",
    // "Procedimiento",
    "Mantenimiento",
    "Catalogo",
    // "Gestion Usuarios",
    "Configuracion",],
  enfermero: ["Inicio", "Registro", "Citas", "Tratamiento","Tratamiento Paciente","Ingresos", "Cierre de caja", "Reportes"],
};

export function filterNavByRole(navMain: any[], role: string) {
  const allowed = rolePermissions[role] || [];
  return navMain.filter((item) => allowed.includes(item.title));
}

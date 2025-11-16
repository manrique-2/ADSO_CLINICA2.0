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
    'Transacciones',
    // "Procedimiento",
    "Mantenimiento",
    "Catalogo",
    "Gestion Usuarios",
    "Configuracion",
  ],
  medico: [ 
    "Inicio",
    "Registro",
    "Citas",
    "Tratamiento",
    "Tratamiento Paciente",
    "Historia clinica",
    "Ingresos",
    "Cierre de caja",
    //"Cierre de caja",
    'Transacciones',
  ],
  enfermero: [
    "Inicio", 
    "Registro", 
    "Citas", 
    "Tratamiento",
    "Tratamiento Paciente",
    "Historia clinica",
    "Ingresos", 
    "Cierre de caja", 
    "Reportes",
    'Transacciones',
  ],
};

export function filterNavByRole(navMain: any[], role: string) {
  const allowed = rolePermissions[role] || [];
  return navMain.filter((item) => allowed.includes(item.title));
}

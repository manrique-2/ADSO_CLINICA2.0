// types/user.ts

export type RolUsuario = "medico" | "admin" | "enfermero";

// Lo que devuelve el backend (GET /users/)
export interface Users {
  id: number;
  password: string;
  password2: string;
  // last_login?: string | null; // formato date-time
  // is_superuser: boolean;
  // first_name?: string;
  // last_name?: string;
  // is_staff: boolean;
  // is_active: boolean;
  // date_joined: string; // formato date-time
  email: string;
  tipo_doc: string;
  num_doc: string;
  name: string;
  direccion: string;
  telefono?: string;
  // foto?: string | null; // formato uri
  estado: string;
  rol: RolUsuario;
  // created_at: string; // formato date-time
  // updated_at: string; // formato date-time
  especialidad?: number;
  // groups: number[];
  // user_permissions: number[];
  clinica: number;
}

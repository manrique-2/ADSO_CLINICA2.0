// types/register.ts

export type RolUsuario = "medico" | "admin" | "enfermero";

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  tipo_doc: string;
  num_doc: string;
  rol: RolUsuario;
  estado: string;
  direccion: string;
  telefono?: string | null;
  especialidad?: number | null;
   clinica: number;
}

export interface RegisterResponse {
  id: number;
  email: string;
  password: string;
  name: string;
  tipo_doc: string;
  num_doc: string;
  rol: RolUsuario;
  estado: string;
  telefono?: string;
  foto?: string | null;
  direccion: string;
  especialidad?: number;
  clinica: number;
}

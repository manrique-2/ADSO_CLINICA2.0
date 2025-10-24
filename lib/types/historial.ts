export type Paciente = {
  id: number;
  name: string;
  dni: string;
  age: number;
  state: string;
  // puedes agregar más campos si el backend los manda
};

export type Medico = {
  id: number;
  name: string;
  dni: string;
  email: string;
  // puedes agregar más campos si el backend los manda
};

export type Consultorio = {
  id: number;
  nombreConsultorio: string;
  clinica: number;
  // puedes agregar más campos si el backend los manda
};
export interface HistorialResponse {
  paciente: PacienteHistorial;
  diagnosticos: DiagnosticoHistorial[];
  alergias: AlergiaHistorial[];
  placas: PlacasHistorial[];
  evoluciones: EvolucionHistorial[];
  tratamientos: TratamientoHistorial[];
  citas: CitaHistorial[];
}

export interface PacienteHistorial {
  id: number;
  nomb_pac: string;
  apel_pac: string;
  edad_pac: string;
  ocupacion: string;
  lugar_nacimiento: string;
  informacion_clinica: string | null;
  dire_pac: string;
  telf_pac: string;
  dni_pac: string;
  foto_paciente: string | null;
  fena_pac: string;
  fecha_registro: string;
  civi_pac: string;
  afil_pac: string | null;
  aler_pac: string | null;
  emai_pac: string;
  titu_pac: string | null;
  pais_id: number;
  departamento_id: number;
  provincia_id: number;
  distrito_id: number;
  observacion: string;
  registro_pac: string;
  detalleodontograma_pac: string | null;
  sexo: string;
  esta_pac: string;
  estudios_pac: string;
  created_at: string;
  updated_at: string;
  clinica: number;
}

export interface CitaHistorial {
  id: number;
  fecha: string;
  hora: string;
  // enfermedad: string;
  estadoCita: string;
  // estadoPago: string;
  // costo: number;
  // pagado: number;
  // saldo: number;
  // observaciones: string;
  // motivo: string;
  created_at: string;
  updated_at: string;
 medico: Medico;
  paciente: Paciente;
  consultorio: Consultorio;
}

export interface EvolucionHistorial {
  id: number;
  descripcion: string;
  paciente: number;
  especialidad: number;
  medico: number;
  created_at: string;
  updated_at: string;
}

export interface PlacasHistorial {
  id: number;
  nombre: string;
  notas: string;
  paciente: number;
  archivo: string;
  created_at: string;
  updated_at: string;
} 

export interface DiagnosticoHistorial {
  id: number;
  paciente: number;
  enfermedad: number;
  created_at: string;
  updated_at: string;
}

export interface AlergiaHistorial {
  id: number;
  paciente: number;
  alergia: number;
  observacion: string;
  created_at: string;
  updated_at: string;
}

export interface TratamientoHistorial {
  id: number;
  asunto: string;
  observacion: string;
  paciente: number;
  medico: number;
}
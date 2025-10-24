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

export type Cita = {
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
  // tratamiento: number;
  medico: Medico;
  paciente: Paciente;
  consultorio: Consultorio;
};

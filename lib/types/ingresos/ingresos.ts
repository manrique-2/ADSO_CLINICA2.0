export interface TratamientoPaciente{
    id: number,
    convenio: boolean,
    asunto: string,
    observacion: string,
    descuento: number,
    descuento_porcentaje: boolean,
    paciente: number,
    tratamiento: number,
}

export interface Ingresos {
  id: number; // readOnly
  tratamientoPaciente: TratamientoPaciente;
  paciente_nombre: string;
  medico_username: string;
  pacienteTratamiento:string
  medico: number;
  monto: number;
  metodo: string;
  created_at: string; // ISO date-time string
  updated_at: string; // ISO date-time string
}
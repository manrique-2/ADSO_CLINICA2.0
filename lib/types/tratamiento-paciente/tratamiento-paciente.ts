export type Paciente = {
  id: number;
  name: string;
  dni: string;
  age: number;
  state: string;
  // puedes agregar más campos si el backend los manda
};

export type Tratamiento = {
    id: number;
    name: string;
}

export interface TratamientoPaciente {
    id: number; // readOnly
    asunto: string;
    show_str: string; // readOnly
    observacion?: string;
  descuento: string;
    created_at: string; // ISO date-time string
    updated_at: string; // ISO date-time string
    paciente: Paciente;
  tratamiento: Tratamiento;
  convenio?: boolean;
}

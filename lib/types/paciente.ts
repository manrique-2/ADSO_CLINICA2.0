// lib/types/paciente.ts
export type Paciente = {
    id: number;
    nomb_pac: string;
    apel_pac: string;
    edad_pac: string;
    ocupacion: string;
    lugar_nacimiento: string;
    informacion_clinica: string;
    dire_pac: string;
    telf_pac: string;
    dni_pac: string;
    foto_paciente: string;
    fena_pac: string;
    fecha_registro: string;
    civi_pac: string; // estado civil
    afil_pac: string;
    aler_pac: string;
    emai_pac: string;
    titu_pac: string;
    pais_id: number;
    departamento_id: number;
    provincia_id: number;
    distrito_id: number;
    observacion: string;
    registro_pac: string;
    sexo: "MASCULINO" | "FEMENINO";
    esta_pac: "ACTIVO" | "INACTIVO";
    estudios_pac: "NINGUNO" | "PRIMARIA" | "SECUNDARIA" | "TECNICO" | "UNIVERSITARIO";
    clinica:number,
  };
  



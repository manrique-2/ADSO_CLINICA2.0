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


export interface EgresoLab {
    id: number,
    tratamientoPaciente: TratamientoPaciente,
    monto: number,
    description?: string,
    fecha_registro: string,
    created_at: string,
    updated_at: string,
}

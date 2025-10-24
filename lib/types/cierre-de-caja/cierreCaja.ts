export type Ingreso = { 
    paciente: string;
    monto: number;
    metodo: string;
    medico: string;
}

export type Egreso = { 
    monto: number;
    medico: string;
}

export type CierreCaja = { 
    ingresos: Ingreso[];
    egresos: Egreso[];
    total_ingresos: number;
    total_egresos: number;
    balance: number;
}
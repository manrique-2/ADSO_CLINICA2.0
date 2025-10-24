export type Tratamiento = {
  id: number;
  nombre: string;
  precioBase: number;
  categoria: number;
};

export type TratamientoResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Tratamiento[];
};

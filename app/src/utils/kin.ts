const MS = 24 * 60 * 60 * 1000; // Milisegundos en un día
const BASE = new Date('1987-07-26T00:00:00Z'); // Fecha de inicio del Dreamspell (Kin 34)
const BASE_KIN = 34; // El Kin de la fecha base

// Define el tipo de dato para un Kin (número, sello, tono)
export type Kin = { num: number; sello: number; tono: number };

// Función que calcula el Kin para una fecha dada
export function kinFromDate(d: Date): Kin {
  // Calcula la diferencia de días entre la fecha dada y la fecha base
  const dias = Math.floor((d.getTime() - BASE.getTime()) / MS);

  // Calcula el número del Kin (del 1 al 260)
  const num = (((BASE_KIN - 1 + dias) % 260) + 260) % 260 + 1;

  // Calcula el Sello (del 1 al 20)
  const sello = ((num - 1) % 20) + 1;

  // Calcula el Tono (del 1 al 13)
  const tono = ((num - 1) % 13) + 1;

  // Devuelve el Kin completo
  return {
    num,
    sello,
    tono,
  };
}
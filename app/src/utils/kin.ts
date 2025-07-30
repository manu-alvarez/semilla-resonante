const MS = 24 * 60 * 60 * 1000; // Milisegundos en un día

// Define el tipo de dato para un Kin (número, sello, tono)
export type Kin = { num: number; sello: number; tono: number };

// Función para obtener una fecha UTC sin horas
function getUTCDateOnly(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

// Función que calcula el Kin para una fecha dada
export function kinFromDate(d: Date): Kin {
  // Fecha de referencia: HOY (ajusta esta fecha a la fecha actual)
  const fechaReferencia = new Date(Date.UTC(2025, 6, 30)); // 30 de julio de 2025
  const kinReferencia = 128; // Kin correcto para hoy
  
  // Fecha seleccionada en UTC sin horas
  const fechaSeleccionada = getUTCDateOnly(d);

  // Diferencia de días desde la fecha de referencia
  const dias = Math.floor((fechaSeleccionada.getTime() - fechaReferencia.getTime()) / MS);

  // Número de Kin (1 a 260)
  const num = (((kinReferencia - 1 + dias) % 260) + 260) % 260 + 1;

  // Sello (1 a 20)
  const sello = ((num - 1) % 20) + 1;

  // Tono (1 a 13)
  const tono = ((num - 1) % 13) + 1;

  return {
    num,
    sello,
    tono,
  };
}

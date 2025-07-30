const MS = 24 * 60 * 60 * 1000; // Milisegundos en un día

export type Kin = { num: number; sello: number; tono: number };

// Devuelve true si la fecha es 29 de febrero
function esHunabKu(date: Date): boolean {
  return date.getMonth() === 1 && date.getDate() === 29;
}

// Devuelve el número de días (excluyendo 29 de febrero) entre dos fechas, puede ser negativo
function diasSinHunabKu(fechaInicio: Date, fechaFin: Date): number {
  let dias = 0;
  let actual = new Date(fechaInicio.getTime());

  if (fechaFin > fechaInicio) {
    while (actual < fechaFin) {
      actual.setDate(actual.getDate() + 1);
      if (!esHunabKu(actual)) {
        dias++;
      }
    }
  } else if (fechaFin < fechaInicio) {
    while (actual > fechaFin) {
      if (!esHunabKu(actual)) {
        dias--;
      }
      actual.setDate(actual.getDate() - 1);
    }
  }
  return dias;
}

// Devuelve una fecha UTC sin horas
function getUTCDateOnly(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

// Calcula el Kin para una fecha dada
export function kinFromDate(d: Date): Kin {
  // Fecha base oficial: 26 de julio de 1987 = Kin 34
  const fechaBase = new Date(Date.UTC(1987, 6, 26)); // 26 de julio de 1987
  const kinBase = 34;

  // Fecha seleccionada en UTC sin horas
  const fechaSeleccionada = getUTCDateOnly(d);

  // Si la fecha es 29 de febrero, NO hay Kin (Hunab Ku 0.0)
  if (esHunabKu(fechaSeleccionada)) {
    return {
      num: 0,
      sello: 0,
      tono: 0,
    };
  }

  // Días transcurridos SIN contar los 29 de febrero (puede ser negativo)
  let dias = diasSinHunabKu(fechaBase, fechaSeleccionada);

  // AJUSTE: sumar 1 si la fecha seleccionada es anterior a la base
  if (fechaSeleccionada < fechaBase) {
    dias += 1;
  }

  // Número de Kin (1 a 260)
  const num = (((kinBase - 1 + dias) % 260) + 260) % 260 + 1;

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

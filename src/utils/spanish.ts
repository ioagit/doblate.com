export const pluralize = (
  count: number,
  singular: string,
  plural: string,
): string => `${formatCount(count)} ${count === 1 ? singular : plural}`;

export const formatCount = (count: number): string =>
  count.toLocaleString('es-ES');

export const veces = (count: number): string => pluralize(count, 'vez', 'veces');

export const datosDescubiertos = (count: number): string =>
  pluralize(count, 'dato descubierto', 'datos descubiertos');

export const nivelesCompletados = (count: number): string =>
  pluralize(count, 'nivel completado', 'niveles completados');

export const respuestasCorrectas = (count: number): string =>
  pluralize(count, 'respuesta correcta', 'respuestas correctas');

export const categoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    matemáticas: 'Matemáticas',
    ciencia: 'Ciencia',
    tecnología: 'Tecnología',
    naturaleza: 'Naturaleza',
    historia: 'Historia',
    comparación: 'Comparación',
    tiempo: 'Tiempo',
    datos: 'Datos',
    probabilidad: 'Probabilidad',
    usos: 'Usos',
  };
  return labels[category] ?? category;
};

export const SUCCESS_MESSAGES = [
  '¡Nivel superado!',
  '¡Te acabas de doblar!',
  'El número crece. Tu cerebro también.',
  '¡Doblado con elegancia!',
  'Otra potencia de dos conquistada.',
  '¡Excelente! El crecimiento exponencial no te intimida.',
] as const;

export const pickSuccessMessage = (seed: number): string =>
  SUCCESS_MESSAGES[Math.abs(seed) % SUCCESS_MESSAGES.length]!;

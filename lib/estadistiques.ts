import type { ClauEstadistica } from "./tipus";

export const ESTADISTIQUES: { clau: ClauEstadistica; etiqueta: string }[] = [
  { clau: "forca", etiqueta: "FORÇA" },
  { clau: "cardio", etiqueta: "CARDIO" },
  { clau: "informatica", etiqueta: "INFORMÀTICA" },
  { clau: "rugby", etiqueta: "RUGBY" },
  { clau: "disciplina", etiqueta: "DISCIPLINA" },
  { clau: "intelligencia", etiqueta: "INTEL·LIGÈNCIA" },
  { clau: "productivitat", etiqueta: "PRODUCTIVITAT" },
  { clau: "comunicacio", etiqueta: "COMUNICACIÓ" },
  { clau: "social", etiqueta: "SOCIAL" },
  { clau: "nutricio", etiqueta: "NUTRICIÓ" },
];

export function etiquetaEstadistica(clau: ClauEstadistica): string {
  return ESTADISTIQUES.find((e) => e.clau === clau)?.etiqueta ?? clau;
}

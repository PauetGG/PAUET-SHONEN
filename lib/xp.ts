import type { TipusMissio } from "./tipus";

// Aquesta fórmula ha de coincidir amb la funció xp_needed() de Supabase.
// Nivell 1 -> 100 XP, nivell 2 -> 110 XP, nivell 3 -> 120 XP...
export function xpNecessari(nivell: number): number {
  return 100 + (nivell - 1) * 10;
}

export const PERCENTATGE_XP: Record<TipusMissio, number> = {
  main: 0.1,
  side: 0.05,
};

export function xpMissio(nivell: number, tipus: TipusMissio): number {
  return Math.max(1, Math.round(xpNecessari(nivell) * PERCENTATGE_XP[tipus]));
}

export function percentatgeBarra(xp: number, nivell: number): number {
  const necessari = xpNecessari(nivell);
  if (necessari <= 0) return 0;
  return Math.min(100, Math.max(0, (xp / necessari) * 100));
}

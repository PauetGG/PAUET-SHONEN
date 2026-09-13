"use client";

import { useCallback, useRef, useState } from "react";
import { crearClientNavegador } from "./supabase/client";
import type { Missio, Perfil, ResultatCompletar } from "./tipus";

export function usarJoc(perfilInicial: Perfil, missionsInicials: Missio[]) {
  const supabase = crearClientNavegador();
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial);
  const [missions, setMissions] = useState<Missio[]>(missionsInicials);
  const [recompensa, setRecompensa] = useState<ResultatCompletar | null>(null);
  const [pujada, setPujada] = useState<{ de: number; a: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ocupat = useRef(false);

  const completar = useCallback(
    async (missio: Missio) => {
      if (ocupat.current || missio.completed) return;
      ocupat.current = true;
      setError(null);

      const { data, error: errorRpc } = await supabase.rpc("complete_mission", {
        p_mission_id: missio.id,
      });

      if (errorRpc) {
        setError("No s'ha pogut completar la missió. Torna-ho a provar.");
        ocupat.current = false;
        return;
      }

      const resultat = data as ResultatCompletar;

      setPerfil((anterior) => {
        const noves = { ...anterior.stats };
        resultat.estadistiques.forEach((clau) => {
          noves[clau] = (noves[clau] ?? 0) + 1;
        });
        return {
          ...anterior,
          level: resultat.nivell_actual,
          xp: resultat.xp_actual,
          stats: noves,
        };
      });

      setMissions((anteriors) =>
        anteriors.map((m) =>
          m.id === missio.id
            ? {
                ...m,
                completed: true,
                xp_awarded: resultat.xp_guanyat,
                completed_at: new Date().toISOString(),
              }
            : m
        )
      );

      setRecompensa(resultat);

      window.setTimeout(() => {
        setRecompensa(null);
        if (resultat.nivell_actual > resultat.nivell_anterior) {
          setPujada({
            de: resultat.nivell_anterior,
            a: resultat.nivell_actual,
          });
          window.setTimeout(() => {
            setPujada(null);
            ocupat.current = false;
          }, 2200);
        } else {
          ocupat.current = false;
        }
      }, 1800);
    },
    [supabase]
  );

  return {
    perfil,
    setPerfil,
    missions,
    setMissions,
    completar,
    recompensa,
    pujada,
    error,
    setError,
  };
}

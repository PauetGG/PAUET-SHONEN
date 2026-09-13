"use client";

import AvisPujadaNivell from "@/components/AvisPujadaNivell";
import AvisRecompensa from "@/components/AvisRecompensa";
import CapcaleraJugador from "@/components/CapcaleraJugador";
import LlistaMissions from "@/components/LlistaMissions";
import TaulaEstadistiques from "@/components/TaulaEstadistiques";
import Panell from "@/components/ui/Panell";
import { usarJoc } from "@/lib/usarJoc";
import type { Missio, Perfil } from "@/lib/tipus";

export default function PantallaInici({
  perfilInicial,
  missionsInicials,
}: {
  perfilInicial: Perfil;
  missionsInicials: Missio[];
}) {
  const { perfil, missions, completar, recompensa, pujada, error } = usarJoc(
    perfilInicial,
    missionsInicials
  );

  const actives = missions.filter((m) => !m.completed);
  const principals = actives.filter((m) => m.type === "main");
  const secundaries = actives.filter((m) => m.type === "side");
  const completades = missions.filter((m) => m.completed);

  return (
    <>
      <CapcaleraJugador perfil={perfil} />

      {error && (
        <p className="rounded border-2 border-perillvora/60 bg-perillfons/70 px-3 py-2 font-xifra text-sm text-perill">
          {error}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <LlistaMissions
            titol="MISSIONS PRINCIPALS"
            missions={principals}
            buit="Cap missió principal pendent."
            onCompletar={completar}
          />
          <LlistaMissions
            titol="MISSIONS SECUNDÀRIES"
            missions={secundaries}
            buit="Cap missió secundària pendent."
            onCompletar={completar}
          />
          {completades.length > 0 && (
            <LlistaMissions
              titol="MISSIONS COMPLETADES"
              missions={completades}
              buit=""
            />
          )}
        </div>

        <Panell titol="ESTADÍSTIQUES" className="h-fit">
          <TaulaEstadistiques estadistiques={perfil.stats} />
        </Panell>
      </div>

      <AvisRecompensa dades={recompensa} />
      <AvisPujadaNivell dades={pujada} />
    </>
  );
}

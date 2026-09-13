"use client";

import BarraExperiencia from "./BarraExperiencia";
import Panell from "./ui/Panell";
import type { Perfil } from "@/lib/tipus";

export default function CapcaleraJugador({ perfil }: { perfil: Perfil }) {
  return (
    <Panell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-menu text-2xl tracking-[0.16em] text-text">
            {perfil.nickname}
          </p>
          <p className="font-menu text-sm tracking-[0.22em] text-or">
            NIVELL <span className="font-xifra">{perfil.level}</span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <BarraExperiencia xp={perfil.xp} nivell={perfil.level} />
      </div>
    </Panell>
  );
}

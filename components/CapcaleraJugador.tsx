"use client";

import Avatar from "./Avatar";
import BarraExperiencia from "./BarraExperiencia";
import Panell from "./ui/Panell";
import type { Perfil } from "@/lib/tipus";

export default function CapcaleraJugador({ perfil }: { perfil: Perfil }) {
  return (
    <Panell>
      <div className="flex items-center gap-4">
        <Avatar
          avatar={perfil.avatar}
          nickname={perfil.nickname}
          className="h-24 w-20 shrink-0"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate font-menu text-2xl tracking-[0.16em] text-text">
            {perfil.nickname}
          </p>
          <p className="font-menu text-sm tracking-[0.22em] text-or">
            NIVELL <span className="font-xifra">{perfil.level}</span>
          </p>
          <div className="mt-3">
            <BarraExperiencia xp={perfil.xp} nivell={perfil.level} />
          </div>
        </div>
      </div>
    </Panell>
  );
}

"use client";

import type { Missio } from "@/lib/tipus";
import FilaMissio from "./FilaMissio";
import Panell from "./ui/Panell";

type Props = {
  titol: string;
  missions: Missio[];
  buit: string;
  onCompletar?: (missio: Missio) => void;
  onEditar?: (missio: Missio) => void;
  onEliminar?: (missio: Missio) => void;
};

export default function LlistaMissions({
  titol,
  missions,
  buit,
  onCompletar,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <Panell titol={titol}>
      {missions.length === 0 ? (
        <p className="text-sm text-apagat">{buit}</p>
      ) : (
        <ul className="space-y-2">
          {missions.map((missio) => (
            <FilaMissio
              key={missio.id}
              missio={missio}
              onCompletar={onCompletar}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </ul>
      )}
    </Panell>
  );
}

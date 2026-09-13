"use client";

import { etiquetaEstadistica } from "@/lib/estadistiques";
import type { Missio } from "@/lib/tipus";
import Boto from "./ui/Boto";

type Props = {
  missio: Missio;
  onCompletar?: (missio: Missio) => void;
  onEditar?: (missio: Missio) => void;
  onEliminar?: (missio: Missio) => void;
};

export default function FilaMissio({
  missio,
  onCompletar,
  onEditar,
  onEliminar,
}: Props) {
  const percentatge = missio.type === "main" ? 10 : 5;

  return (
    <li
      className={`rounded border-2 px-3 py-3 transition-opacity ${
        missio.completed
          ? "border-vora/20 bg-missiofeta/60 opacity-55"
          : "border-vora/35 bg-missio/70"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          disabled={missio.completed || !onCompletar}
          onClick={() => onCompletar?.(missio)}
          aria-label={
            missio.completed ? "Missió completada" : "Completar la missió"
          }
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border-2 font-xifra text-sm ${
            missio.completed
              ? "border-or/60 text-or"
              : "border-vora/70 text-transparent hover:border-or hover:text-or/50"
          }`}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`font-menu text-base tracking-[0.06em] ${
              missio.completed ? "text-apagat line-through" : "text-text"
            }`}
          >
            {missio.title}
          </p>

          {missio.description && (
            <p className="mt-1 text-sm text-apagat">{missio.description}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-xifra text-xs text-exp">
              +{percentatge}% EXP
            </span>
            {missio.stats.map((clau) => (
              <span key={clau} className="font-xifra text-xs text-or/85">
                {etiquetaEstadistica(clau)} +1
              </span>
            ))}
          </div>
        </div>

        {(onEditar || onEliminar) && !missio.completed && (
          <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
            {onEditar && (
              <Boto
                variant="secundari"
                className="px-2 py-1 text-xs"
                onClick={() => onEditar(missio)}
              >
                EDITAR
              </Boto>
            )}
            {onEliminar && (
              <Boto
                variant="perill"
                className="px-2 py-1 text-xs"
                onClick={() => onEliminar(missio)}
              >
                ELIMINAR
              </Boto>
            )}
          </div>
        )}

        {onEliminar && missio.completed && (
          <Boto
            variant="perill"
            className="shrink-0 px-2 py-1 text-xs"
            onClick={() => onEliminar(missio)}
          >
            ELIMINAR
          </Boto>
        )}
      </div>
    </li>
  );
}

"use client";

import { etiquetaEstadistica } from "@/lib/estadistiques";
import type { ResultatCompletar } from "@/lib/tipus";

export default function AvisRecompensa({
  dades,
}: {
  dades: ResultatCompletar | null;
}) {
  if (!dades) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className="w-full max-w-sm animate-entrada rounded-md border-2 border-vora bg-panell shadow-panellalt">
        <div className="border-b-2 border-vora/50 px-4 py-2 text-center">
          <p className="font-menu text-sm tracking-[0.3em] text-vora">
            MISSIÓ COMPLETADA
          </p>
        </div>
        <div className="px-6 py-5 text-center">
          <p className="font-xifra text-3xl text-exp">
            +{dades.xp_guanyat} XP
          </p>
          {dades.estadistiques.length > 0 && (
            <ul className="mt-4 space-y-1">
              {dades.estadistiques.map((clau) => (
                <li
                  key={clau}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span className="font-menu text-sm tracking-[0.14em] text-apagat">
                    {etiquetaEstadistica(clau)}
                  </span>
                  <span className="font-xifra text-sm text-or">+1</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

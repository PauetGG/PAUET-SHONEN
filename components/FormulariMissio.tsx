"use client";

import { useState } from "react";
import { ESTADISTIQUES } from "@/lib/estadistiques";
import type { ClauEstadistica, Missio, TipusMissio } from "@/lib/tipus";
import Boto from "./ui/Boto";
import { Camp, CampArea } from "./ui/Camp";
import Panell from "./ui/Panell";

export type DadesMissio = {
  title: string;
  description: string | null;
  type: TipusMissio;
  stats: ClauEstadistica[];
};

type Props = {
  missio?: Missio | null;
  onDesar: (dades: DadesMissio) => Promise<void> | void;
  onCancellar: () => void;
};

export default function FormulariMissio({
  missio,
  onDesar,
  onCancellar,
}: Props) {
  const [titol, setTitol] = useState(missio?.title ?? "");
  const [descripcio, setDescripcio] = useState(missio?.description ?? "");
  const [tipus, setTipus] = useState<TipusMissio>(missio?.type ?? "main");
  const [seleccio, setSeleccio] = useState<ClauEstadistica[]>(
    missio?.stats ?? []
  );
  const [desant, setDesant] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function commutar(clau: ClauEstadistica) {
    setSeleccio((actual) =>
      actual.includes(clau)
        ? actual.filter((c) => c !== clau)
        : [...actual, clau]
    );
  }

  async function desar() {
    if (!titol.trim()) {
      setError("La missió necessita un títol.");
      return;
    }
    setDesant(true);
    setError(null);
    await onDesar({
      title: titol.trim(),
      description: descripcio.trim() || null,
      type: tipus,
      stats: seleccio,
    });
    setDesant(false);
  }

  return (
    <Panell titol={missio ? "EDITAR MISSIÓ" : "NOVA MISSIÓ"}>
      <div className="space-y-4">
        <Camp
          etiqueta="TÍTOL"
          value={titol}
          maxLength={120}
          onChange={(e) => setTitol(e.target.value)}
          placeholder="Entrenament de rugby"
        />

        <CampArea
          etiqueta="DESCRIPCIÓ (OPCIONAL)"
          value={descripcio}
          rows={2}
          onChange={(e) => setDescripcio(e.target.value)}
        />

        <fieldset>
          <legend className="mb-2 font-menu text-xs tracking-[0.18em] text-apagat">
            TIPUS
          </legend>
          <div className="flex gap-2">
            {(
              [
                ["main", "MISSIÓ PRINCIPAL", "+10% EXP"],
                ["side", "MISSIÓ SECUNDÀRIA", "+5% EXP"],
              ] as const
            ).map(([valor, etiqueta, pista]) => (
              <button
                key={valor}
                type="button"
                onClick={() => setTipus(valor)}
                className={`flex-1 rounded border-2 px-3 py-2 text-left font-menu text-xs tracking-[0.12em] transition-colors ${
                  tipus === valor
                    ? "border-or bg-panellclar text-text"
                    : "border-vora/35 text-apagat hover:border-vora/60"
                }`}
              >
                <span className="mr-2 text-or">
                  {tipus === valor ? "◉" : "○"}
                </span>
                {etiqueta}
                <span className="mt-1 block font-xifra text-[11px] text-exp">
                  {pista}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 font-menu text-xs tracking-[0.18em] text-apagat">
            ESTADÍSTIQUES QUE AUGMENTA
          </legend>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {ESTADISTIQUES.map(({ clau, etiqueta }) => {
              const marcat = seleccio.includes(clau);
              return (
                <button
                  key={clau}
                  type="button"
                  onClick={() => commutar(clau)}
                  className={`flex items-center gap-2 rounded border-2 px-2 py-1.5 font-menu text-xs tracking-[0.08em] transition-colors ${
                    marcat
                      ? "border-or/80 bg-panellclar text-text"
                      : "border-vora/30 text-apagat hover:border-vora/60"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center border-2 text-[10px] ${
                      marcat
                        ? "border-or text-or"
                        : "border-vora/50 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  {etiqueta}
                </button>
              );
            })}
          </div>
        </fieldset>

        {error && <p className="font-xifra text-sm text-perill">{error}</p>}

        <div className="flex gap-2">
          <Boto onClick={desar} disabled={desant}>
            {desant ? "DESANT..." : "DESAR"}
          </Boto>
          <Boto variant="secundari" onClick={onCancellar} disabled={desant}>
            CANCEL·LAR
          </Boto>
        </div>
      </div>
    </Panell>
  );
}

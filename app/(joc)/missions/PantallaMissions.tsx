"use client";

import { useState } from "react";
import AvisPujadaNivell from "@/components/AvisPujadaNivell";
import AvisRecompensa from "@/components/AvisRecompensa";
import BarraExperiencia from "@/components/BarraExperiencia";
import FormulariMissio, { type DadesMissio } from "@/components/FormulariMissio";
import LlistaMissions from "@/components/LlistaMissions";
import Boto from "@/components/ui/Boto";
import Panell from "@/components/ui/Panell";
import { crearClientNavegador } from "@/lib/supabase/client";
import type { Missio, Perfil } from "@/lib/tipus";
import { usarJoc } from "@/lib/usarJoc";

export default function PantallaMissions({
  perfilInicial,
  missionsInicials,
}: {
  perfilInicial: Perfil;
  missionsInicials: Missio[];
}) {
  const supabase = crearClientNavegador();
  const {
    perfil,
    missions,
    setMissions,
    completar,
    recompensa,
    pujada,
    error,
    setError,
  } = usarJoc(perfilInicial, missionsInicials);

  const [formulariObert, setFormulariObert] = useState(false);
  const [editant, setEditant] = useState<Missio | null>(null);

  async function desar(dades: DadesMissio) {
    setError(null);

    if (editant) {
      const { data, error: errorDb } = await supabase
        .from("missions")
        .update(dades)
        .eq("id", editant.id)
        .select()
        .single();

      if (errorDb || !data) {
        setError("No s'ha pogut desar la missió.");
        return;
      }
      setMissions((actuals) =>
        actuals.map((m) => (m.id === data.id ? (data as Missio) : m))
      );
    } else {
      const { data, error: errorDb } = await supabase
        .from("missions")
        .insert({ ...dades, user_id: perfil.id })
        .select()
        .single();

      if (errorDb || !data) {
        setError("No s'ha pogut crear la missió.");
        return;
      }
      setMissions((actuals) => [data as Missio, ...actuals]);
    }

    setFormulariObert(false);
    setEditant(null);
  }

  async function eliminar(missio: Missio) {
    if (!window.confirm(`Vols eliminar "${missio.title}"?`)) return;

    const { error: errorDb } = await supabase
      .from("missions")
      .delete()
      .eq("id", missio.id);

    if (errorDb) {
      setError("No s'ha pogut eliminar la missió.");
      return;
    }
    setMissions((actuals) => actuals.filter((m) => m.id !== missio.id));
  }

  function editar(missio: Missio) {
    setEditant(missio);
    setFormulariObert(true);
  }

  const actives = missions.filter((m) => !m.completed);
  const principals = actives.filter((m) => m.type === "main");
  const secundaries = actives.filter((m) => m.type === "side");
  const completades = missions.filter((m) => m.completed);

  return (
    <>
      <Panell>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-menu text-sm tracking-[0.2em] text-or">
              NIVELL <span className="font-xifra">{perfil.level}</span>
            </p>
            <div className="mt-2">
              <BarraExperiencia xp={perfil.xp} nivell={perfil.level} compacta />
            </div>
          </div>
          {!formulariObert && (
            <Boto
              onClick={() => {
                setEditant(null);
                setFormulariObert(true);
              }}
            >
              CREAR MISSIÓ
            </Boto>
          )}
        </div>
      </Panell>

      {error && (
        <p className="rounded border-2 border-perillvora/60 bg-perillfons/70 px-3 py-2 font-xifra text-sm text-perill">
          {error}
        </p>
      )}

      {formulariObert && (
        <FormulariMissio
          key={editant?.id ?? "nova"}
          missio={editant}
          onDesar={desar}
          onCancellar={() => {
            setFormulariObert(false);
            setEditant(null);
          }}
        />
      )}

      <LlistaMissions
        titol="MISSIONS PRINCIPALS"
        missions={principals}
        buit="Encara no hi ha missions principals."
        onCompletar={completar}
        onEditar={editar}
        onEliminar={eliminar}
      />

      <LlistaMissions
        titol="MISSIONS SECUNDÀRIES"
        missions={secundaries}
        buit="Encara no hi ha missions secundàries."
        onCompletar={completar}
        onEditar={editar}
        onEliminar={eliminar}
      />

      {completades.length > 0 && (
        <LlistaMissions
          titol="MISSIONS COMPLETADES"
          missions={completades}
          buit=""
          onEliminar={eliminar}
        />
      )}

      <AvisRecompensa dades={recompensa} />
      <AvisPujadaNivell dades={pujada} />
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Boto from "@/components/ui/Boto";
import { Camp } from "@/components/ui/Camp";
import Panell from "@/components/ui/Panell";
import { crearClientNavegador } from "@/lib/supabase/client";
import type { Perfil } from "@/lib/tipus";

export default function PantallaPerfil({
  perfil,
  correu,
}: {
  perfil: Perfil;
  correu: string;
}) {
  const router = useRouter();
  const supabase = crearClientNavegador();
  const [nickname, setNickname] = useState(perfil.nickname ?? "");
  const [missatge, setMissatge] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [desant, setDesant] = useState(false);

  async function desar() {
    const net = nickname.trim();
    if (!net) {
      setError("El nickname no pot quedar buit.");
      return;
    }
    setDesant(true);
    setError(null);
    setMissatge(null);

    const { error: errorDb } = await supabase
      .from("profiles")
      .update({ nickname: net })
      .eq("id", perfil.id);

    if (errorDb) {
      setError("No s'ha pogut desar el nickname.");
      setDesant(false);
      return;
    }

    setMissatge("Nickname desat.");
    setDesant(false);
    router.refresh();
  }

  async function tancarSessio() {
    await supabase.auth.signOut();
    router.replace("/entrar");
    router.refresh();
  }

  return (
    <Panell titol="PERFIL">
      <div className="max-w-sm space-y-4">
        <div>
          <p className="font-menu text-xs tracking-[0.18em] text-apagat">
            CORREU
          </p>
          <p className="font-xifra text-sm text-text">{correu}</p>
        </div>

        <Camp
          etiqueta="NICKNAME"
          value={nickname}
          maxLength={24}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && desar()}
        />

        {error && <p className="font-xifra text-sm text-perill">{error}</p>}
        {missatge && (
          <p className="font-xifra text-sm text-or">{missatge}</p>
        )}

        <Boto onClick={desar} disabled={desant}>
          {desant ? "DESANT..." : "DESAR"}
        </Boto>

        <div className="border-t-2 border-vora/30 pt-4">
          <Boto variant="perill" onClick={tancarSessio}>
            TANCAR SESSIÓ
          </Boto>
        </div>
      </div>
    </Panell>
  );
}

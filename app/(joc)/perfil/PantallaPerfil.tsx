"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import Boto from "@/components/ui/Boto";
import { Camp } from "@/components/ui/Camp";
import Panell from "@/components/ui/Panell";
import { AVATARS } from "@/lib/avatars";
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
  const [avatar, setAvatar] = useState<string | null>(perfil.avatar);
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
      .update({ nickname: net, avatar })
      .eq("id", perfil.id);

    if (errorDb) {
      setError("No s'ha pogut desar el perfil.");
      setDesant(false);
      return;
    }

    setMissatge("Perfil desat.");
    setDesant(false);
    router.refresh();
  }

  async function tancarSessio() {
    await supabase.auth.signOut();
    router.replace("/entrar");
    router.refresh();
  }

  return (
    <>
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
          {missatge && <p className="font-xifra text-sm text-or">{missatge}</p>}

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

      <Panell titol="AVATAR">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {AVATARS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setAvatar(id)}
              aria-pressed={avatar === id}
              className={`rounded border-2 p-1 transition-colors ${
                avatar === id
                  ? "border-or bg-panellclar"
                  : "border-vora/30 hover:border-vora/70"
              }`}
            >
              <Avatar
                avatar={id}
                nickname={null}
                className="h-24 w-full border-0 shadow-none"
              />
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-apagat">
          Tria un avatar i prem DESAR.
        </p>
      </Panell>
    </>
  );
}

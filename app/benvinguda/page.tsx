"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Boto from "@/components/ui/Boto";
import { Camp } from "@/components/ui/Camp";
import Panell from "@/components/ui/Panell";
import { crearClientNavegador } from "@/lib/supabase/client";

export default function Benvinguda() {
  const router = useRouter();
  const supabase = crearClientNavegador();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [desant, setDesant] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/entrar");
    });
  }, [router, supabase]);

  async function continuar() {
    const net = nickname.trim();
    if (!net) {
      setError("Escriu un nickname per continuar.");
      return;
    }
    setDesant(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/entrar");
      return;
    }

    const { error: errorDb } = await supabase
      .from("profiles")
      .update({ nickname: net })
      .eq("id", user.id);

    if (errorDb) {
      setError("No s'ha pogut desar el nickname. Torna-ho a provar.");
      setDesant(false);
      return;
    }

    router.replace("/inici");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full">
        <Panell>
          <div className="space-y-5 text-center">
            <p className="font-menu text-xl tracking-[0.24em] text-or">
              BENVINGUT, JUGADOR
            </p>
            <p className="text-sm text-apagat">Tria el teu nickname</p>
            <div className="text-left">
              <Camp
                etiqueta="NICKNAME"
                value={nickname}
                maxLength={24}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && continuar()}
              />
            </div>
            {error && (
              <p className="font-xifra text-sm text-perill">{error}</p>
            )}
            <Boto onClick={continuar} disabled={desant} className="w-full">
              {desant ? "DESANT..." : "CONTINUAR"}
            </Boto>
          </div>
        </Panell>
      </div>
    </main>
  );
}

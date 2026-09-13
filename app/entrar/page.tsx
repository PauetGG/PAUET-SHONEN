"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Boto from "@/components/ui/Boto";
import { Camp } from "@/components/ui/Camp";
import Panell from "@/components/ui/Panell";
import { crearClientNavegador } from "@/lib/supabase/client";

export default function Entrar() {
  const router = useRouter();
  const supabase = crearClientNavegador();
  const [correu, setCorreu] = useState("");
  const [contrasenya, setContrasenya] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [carregant, setCarregant] = useState(false);

  async function entrar() {
    setCarregant(true);
    setError(null);
    const { error: errorAuth } = await supabase.auth.signInWithPassword({
      email: correu.trim(),
      password: contrasenya,
    });
    if (errorAuth) {
      setError("El correu o la contrasenya no són correctes.");
      setCarregant(false);
      return;
    }
    router.replace("/inici");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full">
        <Panell titol="INICIAR SESSIÓ">
          <div className="space-y-4">
            <Camp
              etiqueta="CORREU"
              type="email"
              autoComplete="email"
              value={correu}
              onChange={(e) => setCorreu(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && entrar()}
            />
            <Camp
              etiqueta="CONTRASENYA"
              type="password"
              autoComplete="current-password"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && entrar()}
            />
            {error && (
              <p className="font-xifra text-sm text-perill">{error}</p>
            )}
            <Boto onClick={entrar} disabled={carregant} className="w-full">
              {carregant ? "ENTRANT..." : "ENTRAR"}
            </Boto>
          </div>
        </Panell>
        <p className="mt-4 text-center text-sm text-apagat">
          Encara no tens compte?{" "}
          <Link href="/registre" className="text-or hover:underline">
            Registra't
          </Link>
        </p>
      </div>
    </main>
  );
}

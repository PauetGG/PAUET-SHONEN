"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Boto from "@/components/ui/Boto";
import { Camp } from "@/components/ui/Camp";
import Panell from "@/components/ui/Panell";
import { crearClientNavegador } from "@/lib/supabase/client";

export default function Registre() {
  const router = useRouter();
  const supabase = crearClientNavegador();
  const [correu, setCorreu] = useState("");
  const [contrasenya, setContrasenya] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [carregant, setCarregant] = useState(false);

  async function registrar() {
    if (contrasenya.length < 6) {
      setError("La contrasenya ha de tenir com a mínim 6 caràcters.");
      return;
    }
    setCarregant(true);
    setError(null);
    const { error: errorAuth } = await supabase.auth.signUp({
      email: correu.trim(),
      password: contrasenya,
    });
    if (errorAuth) {
      setError("No s'ha pogut crear el compte. Prova amb un altre correu.");
      setCarregant(false);
      return;
    }
    router.replace("/benvinguda");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full">
        <Panell titol="REGISTRAR-SE">
          <div className="space-y-4">
            <Camp
              etiqueta="CORREU"
              type="email"
              autoComplete="email"
              value={correu}
              onChange={(e) => setCorreu(e.target.value)}
            />
            <Camp
              etiqueta="CONTRASENYA"
              type="password"
              autoComplete="new-password"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && registrar()}
            />
            {error && (
              <p className="font-xifra text-sm text-perill">{error}</p>
            )}
            <Boto onClick={registrar} disabled={carregant} className="w-full">
              {carregant ? "CREANT..." : "CREAR COMPTE"}
            </Boto>
          </div>
        </Panell>
        <p className="mt-4 text-center text-sm text-apagat">
          Ja tens compte?{" "}
          <Link href="/entrar" className="text-or hover:underline">
            Inicia sessió
          </Link>
        </p>
      </div>
    </main>
  );
}

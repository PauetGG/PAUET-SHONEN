import { redirect } from "next/navigation";
import BarraExperiencia from "@/components/BarraExperiencia";
import TaulaEstadistiques from "@/components/TaulaEstadistiques";
import Panell from "@/components/ui/Panell";
import { crearClientServidor } from "@/lib/supabase/server";
import type { Perfil } from "@/lib/tipus";

export const dynamic = "force-dynamic";

export default async function Personatge() {
  const supabase = crearClientServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!data) redirect("/entrar");
  const perfil = data as Perfil;
  const inicial = (perfil.nickname ?? "?").charAt(0).toUpperCase();

  return (
    <Panell titol="PERSONATGE">
      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="flex h-28 w-28 items-center justify-center justify-self-center rounded border-2 border-vora/70 bg-camp/80 shadow-panell sm:justify-self-start">
          <span className="font-menu text-5xl text-or">{inicial}</span>
        </div>

        <div className="self-center">
          <p className="font-menu text-2xl tracking-[0.16em] text-text">
            {perfil.nickname}
          </p>
          <p className="font-menu text-sm tracking-[0.22em] text-or">
            NIVELL <span className="font-xifra">{perfil.level}</span>
          </p>
          <div className="mt-3 max-w-sm">
            <BarraExperiencia xp={perfil.xp} nivell={perfil.level} />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t-2 border-vora/30 pt-5">
        <p className="mb-3 font-menu text-sm tracking-[0.24em] text-vora">
          ESTADÍSTIQUES
        </p>
        <div className="sm:columns-2 sm:gap-8">
          <TaulaEstadistiques estadistiques={perfil.stats} />
        </div>
      </div>
    </Panell>
  );
}

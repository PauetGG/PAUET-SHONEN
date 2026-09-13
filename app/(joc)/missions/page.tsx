import { redirect } from "next/navigation";
import { crearClientServidor } from "@/lib/supabase/server";
import type { Missio, Perfil } from "@/lib/tipus";
import PantallaMissions from "./PantallaMissions";

export const dynamic = "force-dynamic";

export default async function Missions() {
  const supabase = crearClientServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");

  const [{ data: perfil }, { data: missions }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("missions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!perfil) redirect("/entrar");

  return (
    <PantallaMissions
      perfilInicial={perfil as Perfil}
      missionsInicials={(missions ?? []) as Missio[]}
    />
  );
}

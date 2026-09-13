import { redirect } from "next/navigation";
import { crearClientServidor } from "@/lib/supabase/server";
import type { Perfil } from "@/lib/tipus";
import PantallaPerfil from "./PantallaPerfil";

export const dynamic = "force-dynamic";

export default async function PerfilPagina() {
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

  return <PantallaPerfil perfil={data as Perfil} correu={user.email ?? ""} />;
}

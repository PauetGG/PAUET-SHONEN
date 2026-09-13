import { redirect } from "next/navigation";
import { crearClientServidor } from "@/lib/supabase/server";

export default async function Portada() {
  const supabase = crearClientServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? "/inici" : "/entrar");
}

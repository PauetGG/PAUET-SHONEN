import { redirect } from "next/navigation";
import Navegacio from "@/components/Navegacio";
import { crearClientServidor } from "@/lib/supabase/server";

export default async function LayoutJoc({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = crearClientServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/entrar");

  const { data: perfil } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", user.id)
    .single();

  if (!perfil?.nickname) redirect("/benvinguda");

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-24 md:pb-6">
      <div className="flex gap-6">
        <Navegacio />
        <main className="min-w-0 flex-1 space-y-4">{children}</main>
      </div>
    </div>
  );
}

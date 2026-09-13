"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { crearClientNavegador } from "@/lib/supabase/client";

const SECCIONS = [
  { ruta: "/inici", etiqueta: "INICI" },
  { ruta: "/missions", etiqueta: "MISSIONS" },
  { ruta: "/personatge", etiqueta: "PERSONATGE" },
  { ruta: "/perfil", etiqueta: "PERFIL" },
];

export default function Navegacio() {
  const ruta = usePathname();
  const router = useRouter();
  const supabase = crearClientNavegador();

  async function tancarSessio() {
    await supabase.auth.signOut();
    router.replace("/entrar");
    router.refresh();
  }

  return (
    <>
      {/* Barra lateral (escriptori) */}
      <nav className="hidden shrink-0 md:block md:w-56">
        <div className="sticky top-6 rounded-md border-2 border-vora/75 bg-panell/85 shadow-panell backdrop-blur-[2px]">
          <div className="border-b-2 border-vora/40 px-4 py-3">
            <p className="font-menu text-sm tracking-[0.28em] text-or">
              MENÚ
            </p>
          </div>
          <ul className="p-2">
            {SECCIONS.map(({ ruta: r, etiqueta }) => {
              const actiu = ruta === r;
              return (
                <li key={r}>
                  <Link
                    href={r}
                    className={`flex items-center gap-2 rounded px-3 py-2 font-menu text-sm tracking-[0.18em] transition-colors ${
                      actiu
                        ? "bg-panellclar text-text"
                        : "text-apagat hover:text-text"
                    }`}
                  >
                    <span className={actiu ? "text-or" : "text-transparent"}>
                      ❯
                    </span>
                    {etiqueta}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t-2 border-vora/25 pt-2">
              <button
                onClick={tancarSessio}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-left font-menu text-sm tracking-[0.18em] text-apagat transition-colors hover:text-perill"
              >
                <span className="text-transparent">❯</span>
                TANCAR SESSIÓ
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Barra inferior (mòbil) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-vora/60 bg-panell/95 backdrop-blur md:hidden">
        <ul className="flex">
          {SECCIONS.map(({ ruta: r, etiqueta }) => {
            const actiu = ruta === r;
            return (
              <li key={r} className="flex-1">
                <Link
                  href={r}
                  className={`block px-1 py-3 text-center font-menu text-[11px] tracking-[0.1em] ${
                    actiu
                      ? "border-t-2 border-or bg-panellclar text-text"
                      : "border-t-2 border-transparent text-apagat"
                  }`}
                >
                  {etiqueta}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

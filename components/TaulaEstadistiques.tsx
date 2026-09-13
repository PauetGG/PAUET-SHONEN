import { ESTADISTIQUES } from "@/lib/estadistiques";
import type { Perfil } from "@/lib/tipus";

export default function TaulaEstadistiques({
  estadistiques,
}: {
  estadistiques: Perfil["stats"];
}) {
  return (
    <ul className="space-y-1.5">
      {ESTADISTIQUES.map(({ clau, etiqueta }) => (
        <li key={clau} className="flex items-baseline gap-2">
          <span className="font-menu text-sm tracking-[0.14em] text-apagat">
            {etiqueta}
          </span>
          <span
            aria-hidden
            className="min-w-4 flex-1 border-b border-dotted border-vora/25"
          />
          <span className="font-xifra text-base text-text">
            {estadistiques?.[clau] ?? 0}
          </span>
        </li>
      ))}
    </ul>
  );
}

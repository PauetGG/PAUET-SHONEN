"use client";

import { percentatgeBarra, xpNecessari } from "@/lib/xp";

export default function BarraExperiencia({
  xp,
  nivell,
  compacta = false,
}: {
  xp: number;
  nivell: number;
  compacta?: boolean;
}) {
  const necessari = xpNecessari(nivell);
  const percentatge = percentatgeBarra(xp, nivell);

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-menu text-xs tracking-[0.28em] text-apagat">
          EXP
        </span>
        <span className="font-xifra text-sm text-text">
          {xp} / {necessari}
        </span>
      </div>
      <div
        className={`w-full overflow-hidden rounded-sm border-2 border-vora/60 bg-camp ${
          compacta ? "h-3" : "h-5"
        }`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={necessari}
        aria-valuenow={xp}
      >
        <div
          className="h-full bg-exp transition-[width] duration-700 ease-out"
          style={{
            width: `${percentatge}%`,
            boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.35)",
          }}
        />
      </div>
    </div>
  );
}

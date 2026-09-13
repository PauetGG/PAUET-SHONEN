"use client";

export default function AvisPujadaNivell({
  dades,
}: {
  dades: { de: number; a: number } | null;
}) {
  if (!dades) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md animate-pujada rounded-md border-2 border-or bg-panell shadow-panellalt">
        <div className="px-6 py-10 text-center">
          <p className="font-menu text-lg tracking-[0.34em] text-or animate-pampallugueig">
            PUJADA DE NIVELL
          </p>
          <p className="mt-6 font-xifra text-5xl text-text">
            {dades.de} <span className="text-or">→</span> {dades.a}
          </p>
        </div>
      </div>
    </div>
  );
}

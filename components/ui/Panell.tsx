import type { ReactNode } from "react";

type Props = {
  titol?: string;
  children: ReactNode;
  className?: string;
};

export default function Panell({ titol, children, className = "" }: Props) {
  return (
    <section
      className={`rounded-md border-2 border-vora/75 bg-panell/85 shadow-panell backdrop-blur-[2px] ${className}`}
    >
      {titol && (
        <header className="border-b-2 border-vora/40 px-4 py-2">
          <h2 className="font-menu text-sm tracking-[0.22em] text-vora">
            {titol}
          </h2>
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "principal" | "secundari" | "perill";
};

const estils: Record<string, string> = {
  principal:
    "border-vora/80 bg-panellclar text-text hover:bg-panellsobre active:translate-y-[2px]",
  secundari:
    "border-vora/40 bg-transparent text-apagat hover:border-vora/70 hover:text-text active:translate-y-[2px]",
  perill:
    "border-perillvora/70 bg-transparent text-perill hover:bg-perillfons active:translate-y-[2px]",
};

export default function Boto({
  variant = "principal",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`rounded border-2 px-4 py-2 font-menu text-sm tracking-[0.16em] shadow-[0_2px_0_rgba(0,0,0,0.5)] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${estils[variant]} ${className}`}
    />
  );
}

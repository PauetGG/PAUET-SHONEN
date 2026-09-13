import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type PropsCamp = InputHTMLAttributes<HTMLInputElement> & { etiqueta: string };

export function Camp({ etiqueta, className = "", ...props }: PropsCamp) {
  return (
    <label className="block">
      <span className="mb-1 block font-menu text-xs tracking-[0.18em] text-apagat">
        {etiqueta}
      </span>
      <input
        {...props}
        className={`w-full rounded border-2 border-vora/45 bg-camp/70 px-3 py-2 text-text outline-none placeholder:text-apagat/50 focus:border-vora ${className}`}
      />
    </label>
  );
}

type PropsArea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  etiqueta: string;
};

export function CampArea({ etiqueta, className = "", ...props }: PropsArea) {
  return (
    <label className="block">
      <span className="mb-1 block font-menu text-xs tracking-[0.18em] text-apagat">
        {etiqueta}
      </span>
      <textarea
        {...props}
        className={`w-full rounded border-2 border-vora/45 bg-camp/70 px-3 py-2 text-text outline-none placeholder:text-apagat/50 focus:border-vora ${className}`}
      />
    </label>
  );
}

import { rutaAvatar } from "@/lib/avatars";

type Props = {
  avatar: string | null;
  nickname: string | null;
  className?: string;
};

export default function Avatar({ avatar, nickname, className = "" }: Props) {
  const ruta = rutaAvatar(avatar);

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded border-2 border-vora/70 bg-camp/80 shadow-panell ${className}`}
    >
      {ruta ? (
        <img
          src={ruta}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      ) : (
        <span className="font-menu text-5xl text-or">
          {(nickname ?? "?").charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

// Els avatars són fitxers dins de public/avatars/.
// Per afegir-ne o treure'n, canvia només aquesta llista.
// L'id ha de coincidir amb el nom del fitxer sense extensió: "01" -> public/avatars/01.png
export const AVATARS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
];

export function rutaAvatar(id: string | null | undefined): string | null {
  if (!id || !AVATARS.includes(id)) return null;
  return `/avatars/${id}.png`;
}
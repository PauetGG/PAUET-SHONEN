export type ClauEstadistica =
  | "forca"
  | "cardio"
  | "informatica"
  | "rugby"
  | "disciplina"
  | "intelligencia"
  | "productivitat"
  | "comunicacio"
  | "social"
  | "nutricio";

export type TipusMissio = "main" | "side";

export type Perfil = {
  id: string;
  nickname: string | null;
  avatar: string | null;
  level: number;
  xp: number;
  stats: Record<ClauEstadistica, number>;
};

export type Missio = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  type: TipusMissio;
  stats: ClauEstadistica[];
  completed: boolean;
  xp_awarded: number | null;
  created_at: string;
  completed_at: string | null;
};

export type ResultatCompletar = {
  xp_guanyat: number;
  nivell_anterior: number;
  nivell_actual: number;
  xp_actual: number;
  xp_necessari: number;
  estadistiques: ClauEstadistica[];
};
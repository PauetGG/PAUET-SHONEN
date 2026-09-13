# Missions RPG

Registre personal de missions amb XP, nivells i estadístiques.
Next.js 14 (App Router) + React + Supabase + Tailwind.

## Posada en marxa

### 1. Supabase

Crea un projecte a supabase.com. Després:

- **SQL Editor** → enganxa tot `supabase/schema.sql` → Run.
- **Authentication → Sign In / Providers → Email** → desactiva *Confirm email*.
- **Project Settings → API** → copia la Project URL i la clau `anon public`.

### 2. Variables d'entorn

Copia `.env.local.example` a `.env.local` i posa-hi els teus valors:

```
NEXT_PUBLIC_SUPABASE_URL=https://elteuprojecte.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3. Arrencar

```bash
npm install
npm run dev
```

Obre http://localhost:3000, registra't i tria el nickname.

## On tocar les coses

| Vull canviar... | Fitxer |
|---|---|
| La fórmula de nivells | `lib/xp.ts` **i** `xp_needed()` a `supabase/schema.sql` |
| El percentatge d'XP per tipus de missió | `lib/xp.ts` **i** `complete_mission()` al SQL |
| Les estadístiques | `lib/estadistiques.ts` + el `check` de la taula `missions` + el default de `profiles.stats` |
| Els colors i les fonts | `tailwind.config.ts` i `app/layout.tsx` |
| L'aspecte dels panells | `components/ui/Panell.tsx` |

La fórmula viu en dos llocs a propòsit: el client la fa servir per mostrar
previsions i la base de dades és qui decideix de debò. Si en canvies una,
canvia l'altra.

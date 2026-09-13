-- ============================================================
--  MISSIONS RPG - Esquema complet de Supabase
--  Enganxa tot aquest fitxer al SQL Editor i executa'l una sola vegada.
-- ============================================================

-- ------------------------------------------------------------
-- 1. TAULA profiles
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nickname   text,
  level      int not null default 1,
  xp         int not null default 0,
  stats      jsonb not null default '{
                "forca":0,"cardio":0,"informatica":0,"rugby":0,"disciplina":0,
                "intelligencia":0,"productivitat":0,"comunicacio":0,"social":0,"nutricio":0
              }'::jsonb,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. TAULA missions
-- ------------------------------------------------------------
create table if not exists public.missions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  title        text not null check (char_length(title) between 1 and 120),
  description  text,
  type         text not null check (type in ('main', 'side')),
  stats        text[] not null default '{}'
                 check (stats <@ array['forca','cardio','informatica','rugby','disciplina',
                                       'intelligencia','productivitat','comunicacio','social','nutricio']),
  completed    boolean not null default false,
  xp_awarded   int,
  created_at   timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists missions_user_idx
  on public.missions (user_id, completed, created_at desc);

-- ------------------------------------------------------------
-- 3. Creació automàtica del perfil en registrar-se
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 4. Row Level Security
-- ------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.missions enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists missions_select on public.missions;
create policy missions_select on public.missions
  for select using (auth.uid() = user_id);

drop policy if exists missions_insert on public.missions;
create policy missions_insert on public.missions
  for insert with check (auth.uid() = user_id);

drop policy if exists missions_update on public.missions;
create policy missions_update on public.missions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists missions_delete on public.missions;
create policy missions_delete on public.missions
  for delete using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 5. Fórmula de nivells
--    Nivell 1 -> 100 XP, nivell 2 -> 110 XP, nivell 3 -> 120 XP...
--    Si la canvies aquí, canvia-la també a lib/xp.ts
-- ------------------------------------------------------------
create or replace function public.xp_needed(lvl int)
returns int
language sql
immutable
as $$
  select 100 + (lvl - 1) * 10;
$$;

-- ------------------------------------------------------------
-- 6. Completar una missió (tot en una sola transacció)
--    - comprova que no estigui ja completada
--    - calcula l'XP segons el nivell actual
--    - suma XP i gestiona pujades de nivell conservant l'excedent
--    - suma +1 a cada estadística de la missió
--    - marca la missió com a completada
-- ------------------------------------------------------------
create or replace function public.complete_mission(p_mission_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  m              public.missions%rowtype;
  p              public.profiles%rowtype;
  v_gain         int;
  v_level_before int;
  v_stats        jsonb;
  s              text;
begin
  select * into m from public.missions where id = p_mission_id for update;
  if not found then
    raise exception 'MISSIO_NO_TROBADA';
  end if;

  if m.completed then
    raise exception 'MISSIO_JA_COMPLETADA';
  end if;

  select * into p from public.profiles where id = auth.uid() for update;
  if not found then
    raise exception 'PERFIL_NO_TROBAT';
  end if;

  v_level_before := p.level;

  v_gain := greatest(
    1,
    round(xp_needed(p.level) * case m.type when 'main' then 0.10 else 0.05 end)::int
  );

  p.xp := p.xp + v_gain;
  while p.xp >= xp_needed(p.level) loop
    p.xp := p.xp - xp_needed(p.level);
    p.level := p.level + 1;
  end loop;

  v_stats := p.stats;
  foreach s in array m.stats loop
    v_stats := jsonb_set(
      v_stats,
      array[s],
      to_jsonb(coalesce((v_stats ->> s)::int, 0) + 1),
      true
    );
  end loop;

  update public.profiles
     set xp = p.xp, level = p.level, stats = v_stats
   where id = p.id;

  update public.missions
     set completed = true, completed_at = now(), xp_awarded = v_gain
   where id = m.id;

  return jsonb_build_object(
    'xp_guanyat',      v_gain,
    'nivell_anterior', v_level_before,
    'nivell_actual',   p.level,
    'xp_actual',       p.xp,
    'xp_necessari',    xp_needed(p.level),
    'estadistiques',   to_jsonb(m.stats)
  );
end;
$$;

grant execute on function public.complete_mission(uuid) to authenticated;

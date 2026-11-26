-- Vértice: um registro por usuário, legível e gravável só pelo próprio dono.
create table if not exists public.vertice_estado (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  dados      jsonb not null,
  atualizado timestamptz not null default now()
);

alter table public.vertice_estado enable row level security;

create policy "vertice: dono lê" on public.vertice_estado
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "vertice: dono cria" on public.vertice_estado
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "vertice: dono atualiza" on public.vertice_estado
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

revoke all on public.vertice_estado from anon;
grant select, insert, update on public.vertice_estado to authenticated;

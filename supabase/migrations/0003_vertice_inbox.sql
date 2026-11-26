-- Fila de eventos da extensão do Chrome: a extensão insere, o app aplica e apaga.
create table if not exists public.vertice_inbox (
  id      bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tipo    text not null check (tipo in ('captura','agua','habito','foco','gasto','prioridade')),
  dados   jsonb not null default '{}'::jsonb,
  criado  timestamptz not null default now()
);
create index if not exists vertice_inbox_user_idx on public.vertice_inbox (user_id, id);
alter table public.vertice_inbox enable row level security;
create policy "inbox: dono lê" on public.vertice_inbox for select to authenticated using ((select auth.uid()) = user_id);
create policy "inbox: dono cria" on public.vertice_inbox for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "inbox: dono apaga" on public.vertice_inbox for delete to authenticated using ((select auth.uid()) = user_id);
revoke all on public.vertice_inbox from anon;
grant select, insert, delete on public.vertice_inbox to authenticated;

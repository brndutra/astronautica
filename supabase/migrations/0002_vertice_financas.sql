-- Finanças (AxisHub) sincronizadas na mesma linha do usuário, com relógio próprio.
alter table public.vertice_estado
  add column if not exists financas jsonb,
  add column if not exists fin_ts bigint;
alter table public.vertice_estado alter column dados drop not null;

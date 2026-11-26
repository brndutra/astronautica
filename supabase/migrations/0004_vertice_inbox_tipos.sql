-- Novos eventos da extensão: humor, contadores e ciclo de estudos.
alter table public.vertice_inbox drop constraint if exists vertice_inbox_tipo_check;
alter table public.vertice_inbox add constraint vertice_inbox_tipo_check
  check (tipo in ('captura','agua','habito','foco','gasto','prioridade','humor','contador','ciclo'));

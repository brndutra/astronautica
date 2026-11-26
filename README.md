# Astronáutica

Planner pessoal gamificado, inspirado na Argonáutica: convés do dia (rota, foco, prioridades, faixas de horário), expedição (projetos), biblioteca (concurso, idiomas, runas), porão (ficha antiga) e tesouro (finanças).

## Estrutura

- `index.html`: o app inteiro, num arquivo só. Funciona aberto direto no navegador.
- `supabase/migrations/`: a tabela `vertice_estado`, com RLS (cada usuário só vê a própria linha).

## Dados

- Sem login, o registro fica no navegador (localStorage, chave `arquivo-sigma-vertice-v2`).
- Com login, cada gravação também vai para o Supabase. Ao abrir em outro aparelho, o app compara as versões: baixa o que mudou na nuvem, envia o que mudou no aparelho e, se os dois mudaram, fica o mais recente e o outro vira cópia local (`arquivo-sigma-vertice-v2-conflito`).
- A URL do projeto e a chave publicável do Supabase ficam no `index.html` (variável `NUVEM`). A chave publicável é pública por natureza; quem protege os dados é a RLS.

## Publicação

O projeto na Vercel está ligado a este repositório: cada push na `main` publica sozinho. Não há etapa de build.

## Tesouro (finanças)

- `financas.html` é o AxisHub (WeekHub, FinanceHub, Mapa, Saúde, Projetos), aberto na aba **05 / Tesouro** direto no FinanceHub.
- A versão publicada começa vazia. Os dados entram pelo botão **Importar** (backup JSON) e sobem para o Supabase nas colunas `financas` e `fin_ts`, com relógio próprio.
- Nunca coloque backups de finanças neste repositório.

## Extensão do Chrome (`extensao/`)

- Instalar: `chrome://extensions` → ativar **Modo do desenvolvedor** → **Carregar sem compactação** → escolher a pasta `extensao`.
- Atalho: **Alt+Shift+A** abre o registro rápido.
- Faz: captura (vai para o Cérebro), timer de foco de 25 ou 50 min com aviso no fim, +1 copo d'água, marcar hábitos e as três prioridades do dia, registrar gasto (vai para o Tesouro), aviso no começo de cada faixa da grade (06, 09, 12, 15, 18 e 21h).
- Como conversa com o app: entra na mesma conta do Supabase, lê só grade, hábitos, prioridades e água, e deposita eventos na tabela `vertice_inbox`. O app aplica os eventos e os apaga. A extensão nunca regrava o registro inteiro.
- Sem rede, os eventos ficam guardados e saem sozinhos a cada 5 minutos.
- Em `extensao/api.js`, `CFG.app` recebe o endereço do site publicado para mostrar o botão "abrir o app".

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

- A aba **05 / Tesouro** traz o antigo AxisHub (agora **Cofre da Argo**) rodando dentro da própria página, sem iframe: Tesouro (finanças), Diário de Bordo (semana), Carga (guarda-roupa, itinerário e consumo), Enfermaria (saúde) e Rotas (projetos).
- A marcação, o CSS (escopado em `.ax-html`) e os scripts do cofre ficam no `index.html`, entre os marcadores `AXISHUB`, em blocos inertes (`#ax-tpl` e `#ax-js`). O app monta tudo quando a aba Tesouro abre; os scripts rodam num escopo próprio e usam as fontes e a paleta do app.
- `financas.html` ficou como cópia de referência do AxisHub original e não é mais carregado pelo app.
- A versão publicada começa vazia. Os dados entram pelo botão **Importar** (backup JSON) e sobem para o Supabase nas colunas `financas` e `fin_ts`, com relógio próprio.
- Nunca coloque backups de finanças neste repositório.

## Extensão do Chrome (`extensao/`)

- Baixar pronta: ícone no verso do cartão-postal do banner (`downloads/astronautica-extensao.zip`, com o `manifest.json` na raiz).
- Templo no visual do app: frontão com placa (faces Hoje · Arena · Registro), pilares, frisos e base; faixa do Toque com a linha do dia, cartão-postal que vira, guardião com fala do dia, Em andamento, últimas capturas e Mensagens de bordo.
- Três refúgios, escolhidos na engrenagem: Acampamento Meio-Sangue, Hotel Valhala e Casa do Brooklyn (textos, cores, moeda, guardião e avisos).
- Modos: popup, painel lateral do Chrome (largura ajustável na borda) ou janela solta (move e redimensiona; volta no mesmo lugar). A− e A+ mudam o tamanho. Na engrenagem dá para escolher o que o clique no ícone abre.

- Instalar: `chrome://extensions` → ativar **Modo do desenvolvedor** → **Carregar sem compactação** → escolher a pasta `extensao`.
- Atalho: **Alt+Shift+A** abre o registro rápido.
- Visual do Acampamento Meio-Sangue, em três abas:
  - **Arena**: faixa de agora na grade, timer de foco de 25 ou 50 min com pausa e retomada, pausa de 5 min, e o ciclo de estudos do app ("treinar a da vez" abre 50 min na disciplina da vez e, ao terminar, fecha o bloco; "pular" passa a vez).
  - **Chalé**: humor do dia (o mesmo 1 a 5 da leitura do ciclo) com nota opcional, e contadores com meta (água e os que você criar).
  - **Registro**: captura (vai para o Cérebro), três prioridades, hábitos e gasto (vai para o Tesouro).
- Colar de contas e dracmas no topo: uma conta por bloco de foco do dia; uma dracma por bloco e por meta de contador batida. São só leitura do dia, nada é gravado à parte.
- Aviso no começo de cada faixa da grade (06, 09, 12, 15, 18 e 21h).
- Como conversa com o app: entra na mesma conta do Supabase, lê só grade, hábitos, prioridades e água, e deposita eventos na tabela `vertice_inbox`. O app aplica os eventos e os apaga. A extensão nunca regrava o registro inteiro.
- Os contadores criados na extensão ficam no registro em `cont` (`def` com a lista e `dia` com o valor de cada dia) e aparecem no painel do corpo, no Convés.
- A migração `0004_vertice_inbox_tipos.sql` libera os eventos `humor`, `contador` e `ciclo` na fila. Sem ela, esses eventos ficam guardados na extensão até a migração ser aplicada.
- Sem rede, os eventos ficam guardados e saem sozinhos a cada 5 minutos.
- Em `extensao/api.js`, `CFG.app` recebe o endereço do site publicado para mostrar o botão "abrir o app".

## Caduceu de Hermes (`pontes.js`, `pontes.css`)

Integrações externas, num arquivo à parte. O script principal só expõe `window.ASTRO` e guarda `S.pz`.

- **Hefesto TV (RSS):** faixa discreta acima do rodapé, via rss2json, com cache de 30 min, várias fontes e filtro de assuntos. ✕ esconde até o dia seguinte.
- **Hermes Express (Raindrop.io):** fila de leitura no Laptop. "ler 15 min" abre o link e conta o tempo; "lido" vira bloco na Linha de Tiro e põe a etiqueta #lido no Raindrop.
- **Águas do Lete (Readwise):** cada livro ou artigo com destaques vira uma Tabuinha de Cadmo (nota com a etiqueta `readwise`); cinco destaques por dia formam a quest diária `pz-rw`, Fuga do Lete (revisão espaçada).
- **Relógio-escudo de Tyson (Toggl Track):** entradas encerradas viram sessões (`tg<id>`) e contam nas dracmas e na Copa dos Chalés. Opcional: mandar ao Toggl os blocos feitos no app, com a etiqueta `astronautica`, que o app ignora na volta.
- **Tênis alados · Maia! (Strava):** minutos por dia somam em `S.ativ` (medidor de Movimento); a parte do Strava fica em `S.pz.sv.ativ` para não somar em dobro.
- **Acampamento Júpiter (Habitica):** dailies com o mesmo nome dos hábitos se ligam sozinhas; marcou de um lado, marca do outro. Chamadas automáticas com 30 s entre elas e cabeçalho `x-client`.
- As chaves ficam só no aparelho (`localStorage`, chave `astro-pontes-v1`). Readwise, Raindrop, Toggl e Strava passam pela função `supabase/functions/pontes` (CORS), que só aceita esses destinos e não guarda nada.


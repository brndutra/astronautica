# Astronáutica: como o código está organizado

O app não é mais um `index.html` gigante. Ele foi separado em arquivos:

| O quê | Onde editar | Gerado (não editar à mão) |
|---|---|---|
| Marcação da página | `index.html` | — |
| Estilos | `src/css/NN-nome.css` | `app.css` |
| Código do app | `src/app/NN-nome.js` | `app.js` |
| Pontes, planner, temas | `pontes.js`, `pontes.css`, `planner/`, `temas/` | — |

## Regras

1. **Edite só `src/css/` e `src/app/`** (e a marcação em `index.html`). `app.css` e `app.js` são montados por `build.py`.
2. **Depois de qualquer mudança, rode `python3 build.py`** e faça commit de `src/`, `app.css`, `app.js` e `index.html` juntos. `python3 build.py --check` diz se algo ficou desatualizado.
3. **A ordem importa.** Os arquivos são juntados pela ordem do número no começo do nome (`00`, `01`…). O código de `src/app/` roda num escopo só (a função grande que começa em `00-nucleo.js` e fecha no último arquivo), então uma parte pode usar funções declaradas em qualquer outra.
4. **Código novo vai num arquivo novo**, com o próximo número livre antes de `99-fim.js` (ex.: `38-nome-da-mudanca.js`, `28-nome.css`). O `99-fim.js` só fecha a função grande (`})();`) e deve continuar sendo o último.
5. Caminhos de imagem nos estilos são relativos à raiz do site (`img/...`), porque `app.css` fica na raiz.
6. Publicação: o Vercel serve os arquivos estáticos do ramo `unificado`; não há etapa de build no Vercel. Por isso `app.css` e `app.js` precisam estar no commit.

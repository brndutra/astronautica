/* ======================= Posto de comando como página inicial =======================
   O app sempre abre no Posto (modo operacional). O templo continua a um clique:
   "templo completo" no Posto, o botão OP no painel ou Alt+O.
   O 22-modo-operacional abre o Posto quando astro_modo === 'op'; aqui esse valor é
   gravado antes daquela checagem (que roda 900 ms depois do carregamento).
   Para voltar a abrir no templo, apague este arquivo e rode build.py. */
try{localStorage.setItem('astro_modo','op');}catch(e){}

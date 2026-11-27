/* ==========================================================================
   Caderno de papel: o manual do caderno de discos G dentro do Manual de campo
   - consulta "Caderno de papel" (rotina, montagem, hábitos, quando bagunçar)
   - botão que abre as páginas para imprimir (planner/imprimir.html)
   Depende de window.ASTRO (MF_T, MF_C, cxPinta), exposto pelo index.html.
   ========================================================================== */
(function(){
"use strict";
var A=window.ASTRO;
if(!A){return;}
var T,C;
try{T=A.MF_T;C=A.MF_C;}catch(e){return;}
if(!T||!C||C['c-papel'])return;

C['c-papel']=['Caderno de papel',
 'O caderno de discos G é o livro único. Este é o roteiro para não depender da memória: o mesmo que fica impresso na primeira folha.',[
 ['Regra de ouro',['Menos é mais: três prioridades por dia, três hábitos.','Dia ruim não estraga o caderno: pule e recomece na página de hoje, sem compensar nada.']],
 ['A ordem do caderno',['1 · Manual e, no verso, o despejo.','2 · O mês atual, com hábitos e finanças no verso.','3 · As semanas.','4 · Folhas pontilhadas e quadriculadas para notas.','Divisórias entre o mês, as semanas e as notas.','Comece só com o mês atual: não monte o ano inteiro.']],
 ['Os três hábitos',['Dormir na hora (meta realista; adiantar 15 a 30 minutos por semana).','Encerrar o trabalho no horário marcado.','Natação ou estudo para o TRF3 (escolha um).','Marque o dia em que cumprir. Não precisa cumprir todos.']],
 ['De manhã · 5 minutos',['Abra na semana, na faixa de hoje.','Escreva até três prioridades.','Para cada uma, o primeiro passo de 2 minutos.','Anote a hora de encerrar.']],
 ['Durante o dia',['Blocos de 25 a 45 minutos, com pausa curta.','Travou? Qual é o menor passo agora?','Lembrou de algo no meio da tarefa? Anote no despejo e volte.','Faltou espaço? Enfie uma folha pontilhada no meio da semana.']],
 ['No fim do dia · 2 minutos',['Marque o que fez.','Uma linha: onde parou e o próximo passo.','Passe o que sobrou para amanhã, sem culpa.','Marque os hábitos.']],
 ['Domingo · 10 minutos',['Revisão: o que funcionou, o que travou.','Meta, foco e três prioridades da próxima semana.','Olhe os gastos.','Ajuste a hora de dormir, se for o caso.']],
 ['No começo do mês',['Marcos das sessões: peço dia, sessão e a sua entrega.','Prazos e aniversários.','Contas fixas com valor e vencimento.']],
 ['Quando tudo parecer bagunçado',['Despeje tudo no verso do manual, sem ordem.','Escolha uma coisa e escreva só o primeiro passo dela.']],
 ['Imprimir e montar',['Frente e verso, virando pela borda longa, em papel de 90 a 120 g.','No A4, corte nas marcas dos cantos (a folha G tem 200 × 275 mm).','Fure com o furador de caderno de discos: a frente tem os furos à esquerda e o verso, à direita.']],
 ['À caneta no tablet',['A Folha livre da Ficha do Campista aceita caneta: toque em "caneta" na barra do papel.','Com caneta de tablet, o dedo rola a página e só a caneta escreve.']]],
 [['@papel-imprimir','imprimir as páginas'],['listas','despejo'],['semana','revisão da semana']]];

/* entra no começo da consulta por assunto */
var i=-1;for(var k=0;k<T.length;k++){if(T[k][0]==='#'&&/consulta/.test(T[k][1])){i=k;break;}}
var item=['c-papel','Caderno de papel','caderno G, rotina e páginas para imprimir'];
if(i>=0)T.splice(i+1,0,item);else T.push(item);

/* o botão de imprimir abre a página das folhas (antes do clique do manual) */
window.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('[data-mfp="@papel-imprimir"]');if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 var u=new URL('planner/imprimir.html',location.href).href;
 var w=window.open(u,'_blank','noopener');if(!w)location.href=u;},true);
})();

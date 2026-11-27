/* ======================= Colunas laterais do Posto: diário de bordo (esquerda) e vigia (direita) =======================
   O convés ficou com três velas e o casco encolheu junto. Nas laterais (estilo e encaixes no css 32):
   esquerda · Rota da travessia (caixa do mar), o cartão de registro rápido (abre aqui ao tocar num medalhão do casco)
             e os registros de hoje (S.log);
   direita  · vigia (caixa "próximo" do mar), a ronda e as falas do NPC, e o Píthos: captura, trajeto, próximos,
             bandeira e flechas (opLadoHTML, no 22 e 24), que saiu da quarta vela.
   opPinta (22) chama opLatPinta com o mesmo set, que não repinta campo em uso. */
function opLatMonta(o){if(o.querySelector(':scope>.op-lat-e'))return;
 o.insertAdjacentHTML('beforeend','<section class="op-lat op-lat-e" aria-label="Diário de bordo"><header class="ol-k">diário de bordo</header><div class="ol-vaga"></div><div class="ol-c"></div></section>'+
  '<section class="op-lat op-lat-d" aria-label="Vigia"><header class="ol-k">vigia</header><div class="ol-vaga"></div><div class="ol-c"></div></section>');}
function opLatRegHTML(){var hj=hoje(),L=(S.log||[]).filter(function(x){return x.dia===hj;}).slice(0,14);
 return '<div class="op-grp"><span class="op-k">registros de hoje</span><ul class="ol-reg">'+(L.map(function(x){return '<li><b>'+esc(x.t||'')+'</b><span>'+esc(x.d||'')+'</span></li>';}).join('')||
  '<li class="op-vz">nada ainda · toque num medalhão do casco</li>')+'</ul></div>';}
function opLatPinta(set){var o=document.getElementById('modo-op');if(!o)return;opLatMonta(o);
 var g=o.querySelector('.op-g'),t=g?Math.round(g.getBoundingClientRect().top):76;if(t>0&&document.body.style.getPropertyValue('--ol-t')!==t+'px')document.body.style.setProperty('--ol-t',t+'px');
 set('.op-lat-e .ol-c',opLatRegHTML());set('.op-lat-d .ol-c',opLadoHTML());}

/* ===== Avisos moram no Posto de comando; um aviso por assunto =====
   - No Posto, os avisos do guardião (fim de bloco, extensão etc.) entram numa faixa dentro do cabeçalho, sem cobrir as colunas.
   - No templo, continuam no canto.
   - Um assunto só tem um aviso: o fim de bloco novo substitui o anterior; se o bloco foi estendido ou encerrado em outro lugar, o aviso velho sai. */
function avChave(tit){tit=String(tit||'');if(/^Tempo!|^Fim da pausa/.test(tit))return 'foco';if(/^Extens[aã]o/.test(tit))return 'ext';return tit;}
function avDock(){var b=document.getElementById('td-toasts'),o=document.getElementById('modo-op');if(!b)return;
 var top=o&&o.querySelector(':scope>.op-top'),on=document.body.classList.contains('op-on')&&top;
 if(on){var d=document.getElementById('op-avisos');if(!d){d=document.createElement('div');d.id='op-avisos';d.setAttribute('aria-label','avisos');}
  if(d.parentNode!==top)top.appendChild(d);if(b.parentNode!==d)d.appendChild(b);}
 else if(b.parentNode!==document.body)document.body.appendChild(b);}
function avTira(k){var b=document.getElementById('td-toasts');if(!b)return;[].slice.call(b.children).forEach(function(t){if(t.dataset.k===k)t.remove();});}
tdAvisa=(function(f0){return function(tit){var k=avChave(tit);avTira(k);var r=f0.apply(this,arguments),b=document.getElementById('td-toasts');if(b&&b.lastElementChild)b.lastElementChild.dataset.k=k;avDock();return r;};})(tdAvisa);
tdDisco=(function(f0){return function(){var r=f0.apply(this,arguments);try{var f=tdD().foco;if(!f||!f.avisou)avTira('foco');}catch(e){}return r;};})(tdDisco);
opModo=(function(f0){return function(){var r=f0.apply(this,arguments);try{avDock();}catch(e){}return r;};})(opModo);
setInterval(function(){try{avDock();}catch(e){}},1500);setTimeout(function(){try{avDock();}catch(e){}},800);

/* ===== Faixa do nível: os botões ganham uma linha própria, com nome =====
   Antes os quatro botões disputavam a pílula do nível com o logo e os dias: o nível sumia e o último botão vazava. */
var LT_BT={'fc-tg':'ficha','mf-tg':'manual','tv-tg':'tema','pt-tg':'panteão'};
topoBotoes=function(){var t=document.getElementById('lat-topo'),r1=t&&t.querySelector(':scope>.lt-r1');if(!r1)return;
 var r0=t.querySelector(':scope>.lt-r0');if(!r0){r0=document.createElement('div');r0.className='lt-r0';}if(r0.previousElementSibling!==r1)r1.after(r0);
 var g=t.querySelector('.lt-bts');if(!g){g=document.createElement('span');g.className='lt-bts';}if(g.parentNode!==r0)r0.appendChild(g);
 ['fc-tg','mf-tg','tv-tg','pt-tg'].forEach(function(id){var b=document.getElementById(id);if(!b)return;if(b.parentNode!==g||g.lastElementChild!==b)g.appendChild(b);
  if(!b.querySelector('.lt-bl')){var s=document.createElement('span');s.className='lt-bl';s.textContent=LT_BT[id];b.appendChild(s);}});
 var tv=document.getElementById('tv-tg');if(tv&&tv.title!=='Trocar o tema'){tv.title='Trocar o tema';tv.setAttribute('aria-label','Trocar o tema');}};
/* quem punha os botões na pílula (ficha, manual) passa a chamar a arrumação */
fcTg=(function(f0){return function(){var r=f0.apply(this,arguments);try{topoBotoes();}catch(e){}return r;};})(fcTg);
mfTg=(function(f0){return function(){var r=f0.apply(this,arguments);try{topoBotoes();}catch(e){}return r;};})(mfTg);
setInterval(function(){try{var t=document.getElementById('lat-topo');if(t&&(t.querySelector('.lt-r1 .lt-bts')||[].map.call(t.querySelectorAll('.lt-r0 .lt-bts>button'),function(b){return b.id;}).join()!=='fc-tg,mf-tg,tv-tg,pt-tg'))topoBotoes();}catch(e){}},1200);
setTimeout(function(){try{topoBotoes();}catch(e){}},300);

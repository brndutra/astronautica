/* ======================= Harmonia (Acampamento): uma ordem de coluna e uma paleta =======================
   Antes cada templo tinha ordem e cor próprias (lilás jônico, rosa, pêssego dórico, manteiga coríntio,
   e o Rastreio azul). Agora todos usam a mesma coluna jônica em marfim e ouro, com tinta bronze,
   igual à régua do dia. Os números e símbolos de sorte de cada templo continuam. */
(function(){if(TV_ON||EG_ON||typeof COL_PAINEL==='undefined')return;
 var C='#f3e2b3',K='#8a5a14';
 Object.keys(COL_PAINEL).forEach(function(k){var cf=COL_PAINEL[k];cf.st='ionica';cf.c=C;cf.k=K;});
 try{rtLaranja=function(){};}catch(e){}
 /* uma ordem só: toda coluna desenhada vira jônica */
 try{colSvgs=(function(f0){return function(cf){var x={};for(var k in cf)x[k]=cf[k];x.st='ionica';return f0(x);};})(colSvgs);}catch(e){}
 /* painel direito: as três faces (Tarefas, Hora livre, Arsenal) no mesmo ouro */
 try{if(typeof FACE_COR!=='undefined'){['tm','rec','ars'].forEach(function(f){FACE_COR[f]={c:C,k:K};});Object.keys(FACE_SVG).forEach(function(f){delete FACE_SVG[f];});}}catch(e){}
 function aplica(){try{Object.keys(COL_CACHE).forEach(function(k){delete COL_CACHE[k];});}catch(e){}
  Object.keys(COL_PAINEL).forEach(function(k){var n=document.querySelector(COL_PAINEL[k].q);if(n)n.dataset.col='';});
  try{colAplica();}catch(e){}
  var h=document.getElementById('h-rast');if(h){h.style.setProperty('--pk',K);h.style.setProperty('--pc',C);}
  try{var fr=document.querySelector('#tp-painel .tp-fr');if(fr)fr.dataset.face='';tpBanda();}catch(e){}}
 setTimeout(aplica,1600);setTimeout(aplica,4000);})();

/* ======================= Posto: placar do campista no topo e cartões laterais situacionais =======================
   Topo (opHudHTML, chamado pelo opTopR do 22): emblema do tema (abre o seletor de tema, tmMenu no 30, pelo [data-tmenu]
   do 31), nível e XP (gmXP/gmNivel, 06), dracmas (drSaldo, 20; abre a loja), sequência de dias e claro/escuro (#b-tema).
   Laterais: nada fica fixo. O cartão de registro rápido (medalhões do casco) e a ronda abrem nas margens, logo acima do
   casco (css 32); o Píthos (opLadoHTML: captura, trajeto, próximos, bandeira, flechas) abre na margem direita pelo botão
   "Píthos" do topo e fecha no ✕, no Esc ou clicando fora. */
var OP_EMB={acampamento:'img/acampamento/logo-camp.webp',valhala:'img/acampamento/vh-emblema-hv-prata.webp',egito:'img/egito/emblema.svg?v=1'};
function opHudHTML(){var x={total:0},nv={n:1,no:0},dr=0,sq=0;try{x=gmXP();nv=gmNivel(x.total);}catch(e){}try{dr=drSaldo();}catch(e){}try{sq=gmSeq();}catch(e){}
 var tm=TV_ON?'valhala':EG_ON?'egito':'acampamento',claro=!document.documentElement.classList.contains('noite');
 return '<span class="op-pill op-hud" role="group" aria-label="campista">'+
  '<button type="button" class="oh-emb" data-tmenu title="trocar o tema do app"><img src="'+OP_EMB[tm]+'" alt=""></button>'+
  '<span class="oh-nv" title="'+x.total+' XP no total"><b>Nível '+nv.n+'</b><span class="oh-bar"><i style="width:'+nv.no+'%"></i></span><small>'+nv.no+'/100 xp</small></span>'+
  '<button type="button" class="oh-dr" data-ohloja title="dracmas de ouro · 10 por hora de foco ou estudo · abrir a loja"><i aria-hidden="true">◉</i>'+dr+'</button>'+
  (sq?'<span class="oh-sq" title="sequência de dias">'+sq+'<small>seq.</small></span>':'')+
  '<button type="button" class="oh-luz" data-ohluz title="'+(claro?'mudar para o modo escuro':'mudar para o modo claro')+'">'+(claro?TEMA_IC.lua:TEMA_IC.sol)+'</button></span>';}
function opLatMonta(o){if(o.querySelector(':scope>.op-lat-d'))return;
 o.insertAdjacentHTML('beforeend','<section class="op-lat op-lat-d" aria-label="Píthos"><button type="button" class="ol-x" data-opith aria-label="fechar">✕</button><div class="ol-c"></div></section>');}
function opLatPinta(set){var o=document.getElementById('modo-op');if(!o)return;opLatMonta(o);
 var g=o.querySelector('.op-g'),rt=document.querySelector('#rod-apps .rod-top')||document.getElementById('rod-apps'),B=document.body.style;
 var t=g?Math.round(g.getBoundingClientRect().top):76,b=rt?Math.round(innerHeight-rt.getBoundingClientRect().top+10):290;
 if(t>0&&B.getPropertyValue('--ol-t')!==t+'px')B.setProperty('--ol-t',t+'px');if(b>0&&B.getPropertyValue('--ol-b')!==b+'px')B.setProperty('--ol-b',b+'px');
 set('.op-lat-d .ol-c',opLadoHTML());}
function opPithos(on){document.body.classList.toggle('op-pithos',on);}
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;
 if(t.closest('[data-opith]')){opPithos(!document.body.classList.contains('op-pithos'));return;}
 if(t.closest('[data-ohloja]')){try{ferAbre('loja');}catch(z){}return;}
 if(t.closest('[data-ohluz]')){var b=document.getElementById('b-tema');if(b)b.click();setTimeout(function(){try{opTopR();}catch(z){}},0);return;}
 if(document.body.classList.contains('op-pithos')&&!t.closest('#modo-op>.op-lat-d'))opPithos(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('op-pithos'))opPithos(false);});

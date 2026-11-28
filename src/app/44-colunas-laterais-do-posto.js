/* ======================= Posto: placar do campista no topo, Píthos sob chamada e NPC ao lado =======================
   Topo (opHudHTML, chamado pelo opTopR do 22): emblema do tema (abre o seletor de tema, tmMenu no 30, pelo [data-tmenu]
   do 31), nível e XP (gmXP/gmNivel, 06), dracmas (drSaldo, 20; abre a loja), sequência de dias e claro/escuro (#b-tema).
   Embarcação: ocupa a largura toda. Os medalhões do casco abrem o registro rápido no lugar de sempre (logo acima do casco).
   NPC ao lado: quando um NPC aparece (fala do guardião ou do antagonista, NPC_FALA no 36, ou a ronda do sidekick,
   #cx-ronda no 35), abre a coluna da direita (body.op-npc) e a embarcação recua para dar lugar a ele; sem NPC,
   a coluna some e a embarcação volta à largura toda. O cabeçalho fica só com o marcador das falas (36).
   Píthos (opLadoHTML: captura, trajeto, próximos, bandeira, flechas): abre pelo botão "Píthos" do topo e fecha no ✕,
   no Esc ou clicando fora. */
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
 o.insertAdjacentHTML('beforeend','<section class="op-lat op-lat-d" aria-label="Píthos"><button type="button" class="ol-x" data-opith aria-label="fechar">✕</button><div class="ol-c"></div></section>'+
  '<aside class="op-npc" aria-live="polite" aria-label="NPC"><div class="on-c"></div></aside>');}
/* cartão do NPC: retrato, nome e a fala ativa */
function opNpcHTML(){var at=(typeof NPC_FALA!=='undefined')?NPC_FALA.ativo:null;if(!at)return '';
 var m=at.m,an='';if(m.quem==='a'){try{an=antMonstro(antHoje().m).n;}catch(e){}}
 var t=String(m.t||'');if(an&&t.indexOf(an+':')===0)t=t.slice(an.length+1).trim();
 var nm=m.quem==='a'?(an||'antagonista'):npcNome(),av='';
 if(m.quem!=='a'){try{av=satAvatar(satFala().h);}catch(e){}}
 return '<div class="on-av'+(m.quem==='a'?' on-ant':'')+'">'+(av||'<i aria-hidden="true">⚔</i>')+'</div>'+
  '<small>'+esc(nm)+(m.quem==='a'?' · antagonista':' · guardião')+'</small><p>'+esc(t)+'</p>'+
  '<button type="button" class="on-ok" data-opnpcok>ok</button>';}
function opNpcPinta(set){var B=document.body,h=opNpcHTML(),r=document.getElementById('cx-ronda');
 set('.op-npc .on-c',h);B.classList.toggle('op-npc-fala',!!h);
 var on=!!h||!!(r&&r.isConnected);if(B.classList.contains('op-npc')!==on)B.classList.toggle('op-npc',on);}
function opLatPinta(set){var o=document.getElementById('modo-op');if(!o)return;opLatMonta(o);
 var g=o.querySelector('.op-g'),t=g?Math.round(g.getBoundingClientRect().top):76,B=document.body.style;
 if(t>0&&B.getPropertyValue('--ol-t')!==t+'px')B.setProperty('--ol-t',t+'px');
 set('.op-lat-d .ol-c',opLadoHTML());opNpcPinta(set);}
/* a ronda entra e sai sozinha (35): a coluna acompanha */
setInterval(function(){if(!document.body.classList.contains('op-on'))return;var r=document.getElementById('cx-ronda'),on=document.body.classList.contains('op-npc');
 if(!!(r&&r.isConnected)!==on&&!document.body.classList.contains('op-npc-fala'))document.body.classList.toggle('op-npc',!on);},400);
function opPithos(on){document.body.classList.toggle('op-pithos',on);}
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;
 if(t.closest('[data-opnpcok]')){if(typeof NPC_FALA!=='undefined')NPC_FALA.ativo=null;try{opPinta();}catch(z){}return;}
 if(t.closest('[data-opith]')){opPithos(!document.body.classList.contains('op-pithos'));return;}
 if(t.closest('[data-ohloja]')){try{ferAbre('loja');}catch(z){}return;}
 if(t.closest('[data-ohluz]')){var b=document.getElementById('b-tema');if(b)b.click();setTimeout(function(){try{opTopR();}catch(z){}},0);return;}
 if(document.body.classList.contains('op-pithos')&&!t.closest('#modo-op>.op-lat-d'))opPithos(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('op-pithos'))opPithos(false);});

/* ======================= Abas Casa Grande e Missões saem; o botão Operacional sobe para o topo do painel esquerdo ======================= */
function opTgNoTopo(){var lt=document.getElementById('lat-topo'),bt=document.getElementById('op-tg');if(!lt||!bt)return;var r=lt.querySelector(':scope>.lt-r2')||lt;
 if(bt.parentNode!==r)r.appendChild(bt);var r3=lt.querySelector(':scope>.lt-r3');if(r3)r3.remove();}
(function(){var t0=ttIndice;ttIndice=function(){var x=t0.apply(this,arguments);try{opTgNoTopo();}catch(e){}return x;};})();
setTimeout(function(){try{opTgNoTopo();}catch(e){}},900);setInterval(function(){try{opTgNoTopo();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='op-topo-css';st.textContent=[
 '#tt-indice>button[data-tt="op"],#tt-indice>button[data-tt="camp"]{display:none!important}',
 '#lat-topo>.lt-r3{display:flex;margin:6px 0 0}',
 '#lat-topo>.lt-r3>#op-tg{flex:1;display:flex!important;align-items:center;justify-content:center;gap:8px;width:auto!important;height:30px;margin:0!important;padding:0 12px!important;border:1px solid #5a3f2c!important;border-radius:999px!important;background:#f4ead2!important;',
 ' color:#5a3f2c!important;font:600 10px var(--mono,monospace)!important;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;box-shadow:none!important}',
 '#lat-topo>.lt-r3>#op-tg svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#lat-topo>.lt-r3>#op-tg:hover,body.op-on #lat-topo>.lt-r3>#op-tg{background:#5a3f2c!important;color:#f4ead2!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Fio de Ariadne no pé do painel esquerdo; Píthos de Pandora no rodapé do Diário de bordo =======================
   O Fio de Ariadne (leitura e retomadas) sai do Quadro do rodapé e vira o último cartão do painel esquerdo.
   O Píthos (captura e caixa) sai de dentro dele e passa a ser o rodapé do cartão Diário de bordo. */
function fioNoPainel(){var e=document.getElementById('lat-e'),pc=document.getElementById('qa-d-pc');if(!e||!pc)return;if(pc.parentNode!==e)e.appendChild(pc);pc.classList.add('lat-fio');}
function pithosNoDiario(){var db=document.getElementById('lat-db'),ri=document.getElementById('rail-in');if(!db||!ri)return;var f=db.querySelector(':scope>.db-pithos');
 if(!f){f=document.createElement('div');f.className='db-pithos';f.innerHTML='<div class="dp-cab"><span class="dp-k">Píthos de Pandora</span><small>o jarro guarda tudo · despeje antes de perder</small><i class="dp-n"></i></div><div class="dp-slot"></div>';db.appendChild(f);}
 var sl=f.querySelector('.dp-slot'),novos=['.rcap','.rlist','.rbt'].map(function(q){return ri.querySelector(':scope>'+q);});
 if(novos.some(function(x){return x;})){sl.innerHTML='';novos.forEach(function(x){if(x)sl.appendChild(x);});var c=ri.querySelector(':scope>.rcab.cer');if(c)c.remove();}
 var n=sl.querySelectorAll('.rlist li:not(.rvz)').length,ni=f.querySelector('.dp-n'),t=n+' na caixa';if(ni._t!==t||ni.textContent==='' ){ni.textContent=t;ni._t=t;}}
qaHermesQtd=function(){return document.querySelectorAll('.rlist li:not(.rvz)').length;};
(function(){var t=null,mo=new MutationObserver(function(){if(t)return;t=requestAnimationFrame(function(){t=null;try{fioNoPainel();pithosNoDiario();}catch(e){}});});
 var liga=function(){var ri=document.getElementById('rail-in'),e=document.getElementById('lat-e');if(!ri||!e)return false;mo.observe(ri,{childList:true});mo.observe(e,{childList:true});fioNoPainel();pithosNoDiario();return true;};
 var n=0,tt=setInterval(function(){if(liga()||++n>20)clearInterval(tt);},700);})();
(function(){var st=document.createElement('style');st.id='fio-pithos-css';st.textContent=[
 '#lat-e>#qa-d-pc{order:20;--lc:#7a6a2a;margin:0 12px!important;padding:0!important;box-sizing:border-box;background:#fbf5e6!important;border:1px solid #d6c69c!important;border-top:3px solid var(--lc)!important;border-radius:10px!important;box-shadow:0 1px 0 #e9dcbc!important;overflow:hidden}',
 '#lat-e>#qa-d-pc>summary{padding:12px 14px!important;cursor:pointer}',
 '#lat-e>#qa-d-pc>.qa-sb{padding:0 14px 14px!important}',
 '#lat-e>#qa-d-pc .qa-sb>*{margin:0 0 10px!important;border:0!important;background:none!important;padding:0!important;box-shadow:none!important}',
 '#lat-e>#qa-d-pc .pctabs{display:flex;flex-wrap:wrap;gap:4px}',
 '#lat-e>#qa-hermes{display:none!important}',
 '#lat-db .db-pithos{margin:12px 0 0;padding:10px 0 0;border-top:1px dashed #c9b28a}',
 '#lat-db .dp-cab{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px;margin:0 0 7px}',
 '#lat-db .dp-k{font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#9a4a30}',
 '#lat-db .dp-k::before{content:"⚱ "}',
 '#lat-db .dp-cab small{flex:1 1 100%;order:3;font:italic 11.5px Georgia,serif;color:#6b5140}',
 '#lat-db .dp-n{margin-left:auto;font:700 8.5px var(--mono,monospace);font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#8a6f55}',
 '#lat-db .db-pithos .rcap{display:flex!important;gap:6px;margin:0 0 6px}',
 '#lat-db .db-pithos .rcap input{flex:1;min-width:0;height:32px;box-sizing:border-box;padding:0 10px!important;border:1px solid #c9b28a!important;border-radius:8px!important;background:#fffaf0!important;font:13px var(--sans)!important}',
 '#lat-db .db-pithos .rcap button{flex:none;height:32px;margin:0!important;padding:0 12px!important;width:auto!important;border-radius:8px!important}',
 '#lat-db .db-pithos .rlist{margin:0 0 6px!important;padding:0!important;list-style:none;max-height:180px;overflow-y:auto}',
 '#lat-db .db-pithos .rlist li.rvz{font:italic 12px Georgia,serif;color:#8a6f55}',
 '#lat-db .db-pithos .rbt{display:flex;gap:6px}#lat-db .db-pithos .rbt button{margin:0!important;width:auto!important;padding:3px 10px!important;font-size:11px!important}',
 '#lat-db .db-pithos .rlist li{display:flex!important;align-items:center;gap:4px;margin:0 0 4px!important;padding:5px 8px!important;border:1px solid #e2d4b0!important;border-radius:7px!important;background:#fffaf0!important}',
 '#lat-db .db-pithos .rlist li>span{flex:1;min-width:0;font:13px var(--sans);color:#2a2418;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
 '#lat-db .db-pithos .rlist li>button{flex:none;width:auto!important;height:22px;margin:0!important;padding:0 7px!important;border:1px solid #c9b28a!important;border-radius:999px!important;background:transparent!important;font:600 10px var(--mono,monospace)!important;letter-spacing:.06em;color:#6b5140!important}',
 '#lat-db .db-pithos .rlist li>button:hover{background:#5a3f2c!important;color:#fbf5e6!important}',
 '#lat-e>#qa-d-pc>summary{display:flex!important;align-items:center;flex-wrap:wrap;gap:2px 10px;list-style:none;position:relative;padding-right:34px!important}',
 '#lat-e>#qa-d-pc>summary::-webkit-details-marker{display:none}',
 '#lat-e>#qa-d-pc>summary::after{content:"+";position:absolute;right:12px;top:50%;transform:translateY(-50%);width:22px;height:22px;display:grid;place-items:center;border:1px solid rgba(90,63,44,.45);border-radius:50%;font:700 14px/1 var(--sans);color:#5a3f2c}',
 '#lat-e>#qa-d-pc[open]>summary::after{content:"−"}',
 '#lat-e>#qa-d-pc>summary .qa-ic{grid-row:span 2;flex:none;width:30px!important;height:30px!important;display:grid;place-items:center;border:1px solid #c9b28a;border-radius:50%;background:#f4ead2;order:0}',
 '#lat-e>#qa-d-pc>summary .qa-ic svg{width:16px!important;height:16px!important;fill:none!important;stroke:var(--lc)!important;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#lat-e>#qa-d-pc>summary>div,#lat-e>#qa-d-pc>summary>span:not(.qa-ic),#lat-e>#qa-d-pc>summary>b{min-width:0}',
 '#lat-e>#qa-d-pc>summary .qa-sk{flex:1 1 calc(100% - 44px);order:1;font:700 8.5px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:var(--lc)}',
 '#lat-e>#qa-d-pc>summary>b{order:2;margin-left:40px;font:700 15px/1.2 Georgia,serif;color:#2a2418}',
 '#lat-e>#qa-d-pc>summary .qa-deus{order:3;font:600 9px var(--mono,monospace);letter-spacing:.1em;text-transform:uppercase;color:#8a6f55}',
 '#lat-e>#qa-d-pc .pctop>.k5{display:none!important}',
 '#lat-e>#qa-d-pc .pctabs button{width:auto!important;margin:0!important;padding:3px 8px!important;font-size:9.5px!important;border-radius:999px!important}',
 '#lat-e>#qa-d-pc .pcint{font:italic 11.5px/1.4 Georgia,serif!important;text-transform:none!important;letter-spacing:0!important;color:#6b5140!important}',
 '#lat-e>#qa-d-pc .pcnovo{display:flex;flex-direction:column;gap:6px}',
 '#lat-e>#qa-d-pc .pctabs button.on,#lat-e>#qa-d-pc .pctabs button[aria-selected="true"],#lat-e>#qa-d-pc .pctabs .on{background:#5a3f2c!important;color:#fbf5e6!important}',
 '#lat-e>#qa-d-pc .pcnovo input{min-height:32px!important;height:32px;box-sizing:border-box;padding:0 10px!important;border:1px solid #c9b28a!important;border-radius:8px!important;background:#fffaf0!important;font:13px var(--sans)!important}',
 '#lat-e>#qa-d-pc .pcnovo button{align-self:flex-start;width:auto!important;margin:0!important;padding:5px 14px!important;border-radius:8px!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Foco do dia (ex-Ação do dia): termos mais claros no cartão da Arena ======================= */
var AR_TERMOS={'linha de tiro · treinos e missões':'arena · foco e entregas','Ação do dia':'Foco do dia','minutos de foco hoje':'min de foco hoje','missões abertas':'entregas abertas',
 'frentes ativas':'projetos ativos','Treino na Arena · aguardando o alvo':'sem alvo definido','+ Novo treino':'+ Novo alvo','Um alvo antes de cada flecha.':'Qual é o próximo alvo?',
 'Escolha uma entrega concreta e o primeiro movimento. O fim do treino guarda o ponto de volta.':'Diga o que vai entregar e o primeiro passo. Ao encerrar, fica anotado onde você parou.',
 'Declarar o primeiro treino':'Definir alvo','Fim do treino · relatório do dia':'Encerrar o dia · resumo','Quadro da arena':'Alvos','Nenhum treino neste filtro.':'Nenhum alvo neste filtro.',
 'Ajustar a arena':'Ajustes do foco','Filtro: Hoje e pendentes':'Mostrando: hoje e pendentes'};
function arTermos(){var a=document.getElementById('lat-arena');if(!a)return;var w=document.createTreeWalker(a,NodeFilter.SHOW_TEXT),n;
 while(n=w.nextNode()){var t=n.textContent,k=t.trim();if(AR_TERMOS[k]){n.textContent=t.replace(k,AR_TERMOS[k]);}}}
(function(){var t=null,mo=new MutationObserver(function(){if(t)return;t=requestAnimationFrame(function(){t=null;try{arTermos();}catch(e){}});});
 var n=0,tt=setInterval(function(){var a=document.getElementById('lat-arena');if(a){mo.observe(a,{childList:true,subtree:true,characterData:true});arTermos();clearInterval(tt);}else if(++n>20)clearInterval(tt);},600);})();


/* ======================= Tarefas e Missões em lista única checável =======================
   Botão "lista única" no alto do mural: recolhe os cartões e mostra só os itens marcáveis, em uma lista corrida,
   com a origem de cada um (chalé, diária, conselho, oráculo). Outro toque volta aos cartões. Fica guardado. */
function mmListaOn(){try{return localStorage.getItem('astro_mm_lista')==='1';}catch(e){return false;}}
function mmListaAplica(){var m=document.querySelector('#tp-real #mm-box');if(!m)return;var on=mmListaOn();if(m.classList.contains('mm-lista')!==on)m.classList.toggle('mm-lista',on);
 var b=m.querySelector(':scope>.mm-modo');if(!b){b=document.createElement('button');b.type='button';b.className='mm-modo';m.insertBefore(b,m.firstChild);}
 var t=on?'▦ cartões':'☰ lista única';if(b.textContent!==t){b.textContent=t;b.title=on?'voltar aos cartões':'recolher em uma lista só, para marcar';b.setAttribute('aria-pressed',String(on));}}
tpDobAplica=(function(f0){return function(){var r=f0.apply(this,arguments);try{mmListaAplica();}catch(e){}return r;};})(tpDobAplica);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tp-real .mm-modo');if(!b)return;e.preventDefault();e.stopPropagation();
 try{localStorage.setItem('astro_mm_lista',mmListaOn()?'0':'1');}catch(z){}mmListaAplica();},true);
setTimeout(function(){try{mmListaAplica();}catch(e){}},1500);
(function(){var L='#tp-real #mm-box.mm-lista';var st=document.createElement('style');st.id='mm-lista-css';st.textContent=[
 '#tp-real #mm-box>.mm-modo{order:-1;align-self:flex-end;margin:0 0 -6px!important;padding:4px 11px!important;width:auto!important;border:1px solid #5a3f2c!important;border-radius:999px!important;background:#f4ead2!important;color:#5a3f2c!important;font:700 9px var(--mono,monospace)!important;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}',
 '#tp-real #mm-box>.mm-modo:hover,#tp-real #mm-box>.mm-modo[aria-pressed="true"]{background:#5a3f2c!important;color:#fbf5e6!important}',
 L+'{gap:0!important}',
 L+'>.mm-modo{margin-bottom:8px!important}',
 L+' .mm-grp,'+L+' .mm-prof,'+L+' .tp-dobra{display:none!important}',
 L+' :is(.mm-col,.mm-gab){order:2!important;display:block!important;margin:0!important;padding:0 12px!important;background:#fbf5e6!important;border:1px solid #d6c69c!important;border-top:0!important;border-bottom:0!important;border-radius:0!important;box-shadow:none!important}',
 L+' .mm-chale{order:1!important;border-top:3px solid #5a3f2c!important;border-radius:10px 10px 0 0!important;padding-top:8px!important}',
 L+' .mm-quest{order:2!important}'+L+' .mm-gab{order:3!important}',
 L+' .mm-orac-col{order:4!important;border-bottom:1px solid #d6c69c!important;border-radius:0 0 10px 10px!important;padding-bottom:8px!important}',
 L+' :is(.mm-col,.mm-gab)::before,'+L+' :is(.mm-col,.mm-gab)::after{display:none!important}',
 L+' :is(.mm-col,.mm-gab)>:not(ul){display:none!important}',
 L+' :is(.mm-col,.mm-gab)>ul{margin:0!important;max-height:none!important;-webkit-mask-image:none!important;mask-image:none!important;overflow:visible!important;gap:0!important}',
 L+' :is(.mm-col,.mm-gab)>ul>li{margin:0!important;padding:7px 2px!important;border:0!important;border-bottom:1px dashed #e0d1ad!important;border-radius:0!important;background:none!important;box-shadow:none!important;display:flex;align-items:center;gap:8px}',
 L+' .mm-gab>ul>li small,'+L+' .mm-gab>ul>li .mm-gbar{display:none!important}',
 L+' .mm-gab>ul>li b{font:400 13.5px var(--sans)!important;color:#2a2418}',
 L+' .mm-orac-col li:has(.mm-or-in:placeholder-shown){display:none!important}',
 L+' .mm-orac-col .mm-or-in{border:0!important;background:none!important;padding:0!important;height:auto!important;box-shadow:none!important}',
 L+' li::after{margin-left:auto;flex:none;font:700 8px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#a08b6c}',
 L+' .mm-chale li::after{content:"chalé"}'+L+' .mm-quest li::after{content:"diária"}'+L+' .mm-gab li::after{content:"conselho"}'+L+' .mm-orac-col li::after{content:"oráculo"}',
 L+' li .mm-x{order:3}',
 L+' :is(.mm-col,.mm-gab)>ul>li.mm-vz,'+L+' :is(.mm-col,.mm-gab)>ul:empty{display:none!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Frontão e topo do templo direito no mesmo padrão das molduras =======================
   Frontão: triângulo e letras na cor da moldura (ocre), friso de dentículos logo abaixo e pilastras com capitel e base
   ladeando o banner, no lugar da grega dourada. Templo direito: a Concha vira a cornija (papel do templo, filetes e
   tríglifos na cor da moldura) e assenta direto sobre o friso de dentículos. */
function frontaoMoldura(){var h=document.getElementById('hero-box');if(!h||h.dataset.mold)return;var im;try{im=colSvgs({st:'ionica',c:'#f6d99a',k:'#8a5a14'});}catch(e){return;}
 h.dataset.mold='1';h.style.setProperty('--neo-cap',im.cap);h.style.setProperty('--neo-fuste',im.fuste);h.style.setProperty('--neo-base',im.base);h.style.setProperty('--neo-ent',im.ent);h.style.setProperty('--col-c','#f6d99a');h.style.setProperty('--col-k','#8a5a14');}
/* desligado a pedido: o frontão volta ao visual anterior (dourado) */
(function(){var st=document.createElement('style');st.id='frontao-mold-css';st.textContent=[
 '#hero-box[data-mold] .neo-frontao{height:auto!important}',
 '#hero-box[data-mold] .neo-frontao svg path,#hero-box[data-mold] .neo-frontao svg circle{stroke:var(--col-k)!important}',
 '#hero-box[data-mold] .neo-frontao svg path:first-child{fill:#f4ead2!important;stroke-width:2.6!important}',
 '#hero-box[data-mold] .neo-frontao svg circle[r="7"]{fill:var(--col-k)!important}',
 '#hero-box[data-mold] .neo-frontao svg text{fill:var(--col-k)!important}',
 '#hero-box[data-mold] .neo-arquitrave{height:40px!important;margin:-2px 0 0!important;border:1px solid var(--col-k)!important;border-bottom:0!important;background:var(--neo-ent) 0 0/240px 40px repeat-x,#f4ead2!important;box-shadow:none!important}',
 '#hero-box[data-mold] .bn-slot{position:relative;margin:0 14px!important;padding:0 46px 0!important;border:1px solid var(--col-k);border-top:0;background:',
 '  var(--neo-cap) 2px 0/42px 29px no-repeat,var(--neo-cap) calc(100% - 2px) 0/42px 29px no-repeat,',
 '  var(--neo-fuste) 2px 29px/42px calc(100% - 44px) no-repeat,var(--neo-fuste) calc(100% - 2px) 29px/42px calc(100% - 44px) no-repeat,',
 '  var(--neo-base) 2px 100%/42px 15px no-repeat,var(--neo-base) calc(100% - 2px) 100%/42px 15px no-repeat,#f4ead2!important}',
 '#hero-box[data-mold] .vx-hero::after{display:none!important}',
 '#hero-box[data-mold] .vx-hero{border:0!important;border-radius:0!important;box-shadow:none!important}',
 /* templo direito: Concha como cornija */
 '#tp-painel:has(#tp-real) #tp-friso{background:var(--neo-papel,none),#f4ead2!important;border:0!important;border-top:1px solid var(--tp-k,#9a4a30)!important;border-bottom:1px solid var(--tp-k,#9a4a30)!important;',
 ' box-shadow:inset 0 3px 0 #f4ead2,inset 0 4px 0 var(--tp-k,#9a4a30)!important;padding:6px 0 0!important}',
 '#tp-friso .tf-met{padding:2px 10px 3px!important;border-bottom:1px solid var(--tp-k,#9a4a30)!important}',
 '#tp-friso .tf-m{border-radius:0!important;padding:3px 0!important;background:none!important;box-shadow:none!important}',
 '#tp-friso .tf-m.prox{background:#f4ead2!important;border:1.5px solid var(--tp-k,#9a4a30)!important;box-shadow:0 0 0 2px #f4ead2,0 0 0 3px var(--tp-k,#9a4a30)!important;border-radius:2px!important;margin:0 4px}',
 '#tp-friso .tf-m b{font:700 11px Georgia,serif!important;letter-spacing:.04em}',
 '#tp-friso .tf-tri{width:10px!important;background:repeating-linear-gradient(90deg,var(--tp-k,#9a4a30) 0 2px,transparent 2px 4px)!important;opacity:.9!important;margin:3px 2px!important}',
 '#tp-friso .tf-leg{justify-content:center;padding:4px 10px 5px!important;background:none!important}',
 '#tp-friso .tf-leg span{flex:0 1 auto!important;font:italic 11px Georgia,serif!important;color:#5a3f2c!important}',
 '#tp-entab .te-band{box-shadow:none!important;border-left:0;border-right:0}',
 /* base do painel ocupa o pé mesmo com pouco conteúdo */
 '#tp-painel:has(#tp-real) #tp-real{flex:1 0 auto;display:flex;flex-direction:column}',
 '#tp-real>:is(#tm-painel,#recreio):not([hidden]){flex:1 0 auto}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Fio de Ariadne como rodapé expansível do painel esquerdo; cartões mais largos ======================= */
(function(){var st=document.createElement('style');st.id='fio-rodape-css';st.textContent=[
 '#lat-e{padding-bottom:0!important}',
 '#lat-e>:is(#lat-arena,#lat-band,#lat-cp,#lat-db),#lat-e>#lat-gm>.gm,#lat-e>#lat-vx>.vx-card{margin-left:6px!important;margin-right:6px!important}',
 '#lat-e>.lat-grp{margin-left:8px!important;margin-right:8px!important}',
 '#lat-e>#qa-d-pc{order:99!important;position:sticky!important;bottom:0;z-index:6;margin:4px 0 0!important;border-radius:10px 10px 0 0!important;border-bottom:0!important;',
 ' box-shadow:0 -8px 16px -8px rgba(60,40,20,.35)!important;background:#f4ead2!important}',
 '#lat-e>#qa-d-pc>summary{padding:9px 14px!important}',
 '#lat-e>#qa-d-pc>summary .qa-sk{display:none!important}',
 '#lat-e>#qa-d-pc>summary>b{margin-left:0!important}',
 '#lat-e>#qa-d-pc>summary .qa-ic{width:26px!important;height:26px!important}',
 '#lat-e>#qa-d-pc[open]>summary::after{content:"▾"!important}',
 '#lat-e>#qa-d-pc:not([open])>summary::after{content:"▴"!important}',
 '#lat-e>#qa-d-pc>summary .qa-deus{margin-right:30px}',
 '#lat-e>#qa-d-pc .pctabs button{color:#5a3f2c!important;background:#f4ead2!important;border:1px solid #c9b28a!important}',
 '#lat-e>#qa-d-pc .pctabs button:is(.on,.at,.ativo,[aria-pressed="true"],[aria-selected="true"]){background:#5a3f2c!important;color:#fbf5e6!important;border-color:#5a3f2c!important}',
 '#lat-e>#qa-d-pc[open]>.qa-sb{max-height:min(58vh,520px);overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Fio de Ariadne fixo na tela (pé do painel esquerdo), aberto ou fechado ======================= */
function fioFixo(){var pc=document.getElementById('qa-d-pc'),nav=document.getElementById('nav'),e=document.getElementById('lat-e');if(!pc||!nav||!e||pc.parentNode!==e)return;
 var r=nav.getBoundingClientRect(),sb=nav.offsetWidth-nav.clientWidth;var de=document.documentElement.style;
 de.setProperty('--fio-l',Math.max(0,r.left)+'px');de.setProperty('--fio-w',Math.max(160,r.width-sb)+'px');de.setProperty('--fio-h',pc.offsetHeight+'px');}
window.addEventListener('resize',function(){try{fioFixo();}catch(e){}});
document.addEventListener('toggle',function(e){if(e.target&&e.target.id==='qa-d-pc')setTimeout(function(){try{fioFixo();}catch(z){}},30);},true);
setInterval(function(){try{fioFixo();}catch(e){}},1500);setTimeout(function(){try{fioFixo();}catch(e){}},800);
(function(){var st=document.createElement('style');st.id='fio-fixo-css';st.textContent=[
 '@media(min-width:1380px){#lat-e>#qa-d-pc{position:fixed!important;bottom:0!important;left:var(--fio-l,0px)!important;width:var(--fio-w,290px)!important;z-index:60!important;margin:0!important;box-sizing:border-box}',
 '#lat-e{padding-bottom:calc(var(--fio-h,48px) + 10px)!important}}',
 '@media(max-width:1379px){#lat-e>#qa-d-pc{position:relative!important;bottom:auto!important;border-radius:10px!important;border-bottom:1px solid #d6c69c!important;margin:0 6px!important}}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Faixa do dia na margem direita do painel esquerdo =======================
   A faixa encosta no painel esquerdo (entre ele e a coluna do meio), na altura toda; o templo da direita volta à borda da tela.
   Os cartões de Inspeção e Ronda abrem para a direita, por cima da coluna do meio. */
function diaLado(){var n=document.getElementById('nav');var l=n&&getComputedStyle(n).position==='fixed'?Math.round(n.getBoundingClientRect().right):0;document.body.style.setProperty('--dia-l',l+'px');}
(function(){var st=document.createElement('style');st.id='dia-lado-css';st.textContent=[
 'body.com-dia #dia-faixa{left:var(--dia-l,300px)!important;right:auto!important;top:0!important;bottom:0!important}',
 'body.com-dia .wrap{margin-left:calc(var(--dia-l,300px) + 62px)!important;margin-right:var(--dia-r,460px)!important}',
 'body.com-dia #rod-apps{left:calc(var(--dia-l,300px) + 62px)!important}',
 'body.com-dia #fer-w{right:calc(var(--dia-r,460px) + 14px)!important}',
 '@media(min-width:1380px){body.com-dia .td-disco:not(.td-solto){left:calc(var(--dia-l,300px) + 74px)!important}}'
].join('\n');document.head.appendChild(st);})();
diaBaixo=function(){return 0;};
diaAbre=(function(f0){return function(k){var r=f0.apply(this,arguments);try{var p=document.getElementById('df-pop'),f=document.getElementById('dia-faixa');if(p&&f&&document.body.classList.contains('com-dia')){var fr=f.getBoundingClientRect();p.style.right='auto';p.style.left=(fr.right+8)+'px';}}catch(e){}return r;};})(diaAbre);
window.addEventListener('resize',function(){try{diaLado();}catch(e){}});
setTimeout(function(){try{diaLado();diaPinta();}catch(e){}},600);setTimeout(function(){try{diaLado();}catch(e){}},2500);


/* Operacional cabe na linha do XP: vira um botão redondo no fim dela */
(function(){var st=document.createElement('style');st.id='op-xp-css';st.textContent=[
 '#lat-topo>.lt-r2{display:flex!important;align-items:center;gap:8px}',
 '#lat-topo>.lt-r2>#op-tg{order:99;flex:none;display:flex!important;align-items:center;gap:4px;width:auto!important;height:24px;margin:0 0 0 2px!important;padding:0 8px!important;border:1px solid #5a3f2c!important;border-radius:999px!important;background:#5a3f2c!important;color:#f4ead2!important;cursor:pointer;box-shadow:none!important}',
 '#lat-topo>.lt-r2>#op-tg span{display:inline!important;font:700 8.5px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase}',
 '#lat-topo>.lt-r2>#op-tg span{font-size:0!important}#lat-topo>.lt-r2>#op-tg span::after{content:"OP";font:700 9px var(--mono,monospace);letter-spacing:.14em}',
 '#lat-topo>.lt-r2>#op-tg svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#lat-topo>.lt-r2>#op-tg:hover{background:#2a2418!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Frontão refinado sobre o banner =======================
   Desenho novo, no mesmo dourado do banner: cornija inclinada em três molduras (com fiada de dentículos), tímpano em papel
   com leve degradê, ramos de louro ladeando o medalhão da lira, letras gravadas (Astronáutica · Chalé VII), acrotérios em
   palmeta no ápice e nas pontas, e cornija horizontal (filete, dentículos, três fáscias) que assenta exatamente sobre o banner.
   As linhas esticam com a largura; letras, louros e palmetas não se deformam. */
var NF2_HTML='<svg class="nf-tri" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="nfOuro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1dca0"/><stop offset=".5" stop-color="#d9b25a"/><stop offset="1" stop-color="#b3852f"/></linearGradient><linearGradient id="nfTimp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf5e6"/><stop offset="1" stop-color="#efe2c2"/></linearGradient></defs><path class="t1" d="M0 120L500 4L1000 120Z"/><path class="t2" d="M26 120L500 16L974 120Z"/><path class="t3" d="M44 120L500 26L956 120Z"/><path d="M0 120L500 4L1000 120" fill="none" stroke="#8a6420" stroke-width="1.6" vector-effect="non-scaling-stroke"/><path d="M26 120L500 16L974 120" fill="none" stroke="#8a6420" stroke-width="1" vector-effect="non-scaling-stroke"/><path d="M13 120L500 10L987 120" fill="none" stroke="#ecd394" stroke-width="5" stroke-dasharray="3 5" vector-effect="non-scaling-stroke" opacity=".9"/><path d="M44 120L500 26L956 120" fill="none" stroke="#c99a3d" stroke-width="1.2" vector-effect="non-scaling-stroke"/><path d="M60 120L500 34L940 120" fill="none" stroke="#c99a3d" stroke-width=".8" stroke-dasharray="1 4" vector-effect="non-scaling-stroke" opacity=".8"/></svg><span class="nf-acro nf-acro-c"><svg viewBox="0 0 40 30" aria-hidden="true"><path d="M20 28C20 18 20 10 20 3M20 28C14 22 9 16 6 8M20 28C26 22 31 16 34 8M20 28C16 20 13 13 12 5M20 28C24 20 27 13 28 5" fill="none" stroke="#c99a3d" stroke-width="2.2" stroke-linecap="round"/><path d="M10 29h20" stroke="#8a6420" stroke-width="2.4" stroke-linecap="round"/><circle cx="20" cy="3" r="2.4" fill="#ecd394" stroke="#c99a3d" stroke-width="1"/></svg></span><span class="nf-acro nf-acro-l"><svg viewBox="0 0 40 30" aria-hidden="true"><path d="M20 28C20 18 20 10 20 3M20 28C14 22 9 16 6 8M20 28C26 22 31 16 34 8M20 28C16 20 13 13 12 5M20 28C24 20 27 13 28 5" fill="none" stroke="#c99a3d" stroke-width="2.2" stroke-linecap="round"/><path d="M10 29h20" stroke="#8a6420" stroke-width="2.4" stroke-linecap="round"/><circle cx="20" cy="3" r="2.4" fill="#ecd394" stroke="#c99a3d" stroke-width="1"/></svg></span><span class="nf-acro nf-acro-r"><svg viewBox="0 0 40 30" aria-hidden="true"><path d="M20 28C20 18 20 10 20 3M20 28C14 22 9 16 6 8M20 28C26 22 31 16 34 8M20 28C16 20 13 13 12 5M20 28C24 20 27 13 28 5" fill="none" stroke="#c99a3d" stroke-width="2.2" stroke-linecap="round"/><path d="M10 29h20" stroke="#8a6420" stroke-width="2.4" stroke-linecap="round"/><circle cx="20" cy="3" r="2.4" fill="#ecd394" stroke="#c99a3d" stroke-width="1"/></svg></span><span class="nf-louro nf-louro-l"><svg viewBox="0 0 90 44" aria-hidden="true"><path d="M4 34Q44 26 84 14" fill="none" stroke="#8a6420" stroke-width="1.4" stroke-linecap="round"/><path d="M8 30.0c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M10 31.0c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M19 27.8c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M21 28.8c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M30 25.6c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M32 26.6c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M41 23.4c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M43 24.4c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M52 21.2c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M54 22.2c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M63 19.0c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M65 20.0c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/></svg></span><span class="nf-louro nf-louro-r"><svg viewBox="0 0 90 44" aria-hidden="true"><path d="M4 34Q44 26 84 14" fill="none" stroke="#8a6420" stroke-width="1.4" stroke-linecap="round"/><path d="M8 30.0c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M10 31.0c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M19 27.8c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M21 28.8c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M30 25.6c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M32 26.6c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M41 23.4c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M43 24.4c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M52 21.2c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M54 22.2c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/><path d="M63 19.0c4-7 11-8 15-6-3 6-9 9-15 6z" fill="#c99a3d"/><path d="M65 20.0c5 5 11 5 15 1-5-4-11-4-15-1z" fill="#ecd394" stroke="#c99a3d" stroke-width=".6"/></svg></span><span class="nf-txt nf-txt-l">Astronáutica</span><span class="nf-txt nf-txt-r">Chalé VII</span><div class="nf-cornija" aria-hidden="true"><i class="nf-c1"></i><i class="nf-c2"></i><i class="nf-c3"></i></div>';
function frontaoNovo(){var f=document.querySelector('#hero-box .neo-frontao');if(!f||f.dataset.nf2)return;var lira=f.querySelector('.fr-lira');
 f.dataset.nf2='1';f.classList.add('nf2');f.innerHTML=NF2_HTML;if(lira)f.appendChild(lira);else{try{frontaoLira();}catch(e){}}}
setTimeout(function(){try{frontaoNovo();}catch(e){}},700);setTimeout(function(){try{frontaoNovo();}catch(e){}},2600);
(function(){var st=document.createElement('style');st.id='frontao-nf2-css';st.textContent=[
 '#hero-box .neo-frontao.nf2{position:relative;height:98px!important;margin:14px -6px -2px!important;z-index:2}',
 '#hero-box .nf2 .nf-tri{position:absolute;left:0;right:0;top:0;width:100%;height:80px;display:block;filter:drop-shadow(0 3px 2px rgba(90,60,15,.22))}',
 '#hero-box .nf2 .nf-acro{position:absolute;width:40px;height:30px;line-height:0}',
 '#hero-box .nf2 .nf-acro svg{width:100%;height:100%;display:block}',
 '#hero-box .nf2 .nf-acro-c{left:50%;top:-14px;transform:translateX(-50%);width:34px;height:24px}',
 '#hero-box .nf2 .nf-acro-l{left:-6px;top:52px}',
 '#hero-box .nf2 .nf-acro-r{right:-6px;top:52px}',
 '#hero-box .nf2 .nf-louro{position:absolute;top:34px;width:80px;height:38px;line-height:0}',
 '#hero-box .nf2 .nf-louro svg{width:100%;height:100%;display:block}',
 '#hero-box .nf2 .nf-louro-l{right:calc(50% + 34px)}',
 '#hero-box .nf2 .nf-louro-r{left:calc(50% + 34px);transform:scaleX(-1)}',
 '#hero-box .nf2 .nf-txt{position:absolute;top:56px;font:400 15px/1 Georgia,serif;letter-spacing:.42em;text-transform:uppercase;color:#7a5616;text-shadow:0 1px 0 rgba(255,250,235,.9),0 -1px 0 rgba(120,80,20,.15);white-space:nowrap}',
 '#hero-box .nf2 .nf-txt-l{right:calc(50% + 140px)}',
 '#hero-box .nf2 .nf-txt-r{left:calc(50% + 140px)}',
 '#hero-box .nf2 .fr-lira{top:10px!important;width:54px!important;height:54px!important;z-index:3;border-radius:50%;box-shadow:0 0 0 3px #f6eedb,0 0 0 4.5px #c99a3d,0 0 0 7px #f6eedb,0 0 0 8px #8a6420!important}',
 '#hero-box .nf2 .nf-cornija{position:absolute;left:-2px;right:-2px;top:78px;height:20px;display:flex;flex-direction:column}',
 '#hero-box .nf2 .nf-c1{display:block;height:4px;background:linear-gradient(180deg,#f1dca0,#c99a3d);border:1px solid #8a6420;border-radius:1px}',
 '#hero-box .nf2 .nf-c2{display:block;height:8px;margin:0 6px;background:repeating-linear-gradient(90deg,#c99a3d 0 7px,#f6eedb 7px 11px);border-left:1px solid #8a6420;border-right:1px solid #8a6420}',
 '#hero-box .nf2 .nf-c3{display:block;height:8px;margin:0 3px;background:linear-gradient(180deg,#e4c578 0 2px,#8a6420 2px 3px,#efd9a0 3px 5px,#8a6420 5px 6px,#f6eedb 6px 8px);border-left:1px solid #8a6420;border-right:1px solid #8a6420}',
 '#hero-box .nf2 .neo-arquitrave,#hero-box .nf2>svg:not(.nf-tri){display:none!important}',
 '#hero-box .nf2 .nf-tri path{display:inline!important}',
 '#hero-box .nf2 .nf-tri path.t1{fill:url(#nfOuro)!important;stroke:none!important}',
 '#hero-box .nf2 .nf-tri path.t2{fill:#f6eedb!important;stroke:none!important}',
 '#hero-box .nf2 .nf-tri path.t3{fill:url(#nfTimp)!important;stroke:none!important}',
 '#hero-box .nf2 .nf-tri path:not([class]){fill:none!important}',
 '@media(max-width:900px){#hero-box .nf2 .nf-txt{font-size:11px;letter-spacing:.25em}#hero-box .nf2 .nf-txt-l{right:calc(50% + 110px)}#hero-box .nf2 .nf-txt-r{left:calc(50% + 110px)}#hero-box .nf2 .nf-louro{width:64px}}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Placas dos templos (no alto e nas laterais) nos tons de cada moldura =======================
   A placa do título herda a cor da moldura que ela coroa (azul em Programação, vinho nos Rastreados...); as pílulas laterais
   (O mês, A semana) também. Mesmo desenho da placa do templo direito: papel, filete na cor e anel duplo. */
function placasTons(){Array.prototype.forEach.call(document.querySelectorAll('.wrap>h2.sec.neo-tit'),function(h){var n=h.nextElementSibling;while(n&&!n.classList.contains('neo-moldura'))n=n.nextElementSibling;if(!n)return;
  var cs=getComputedStyle(n),k=cs.getPropertyValue('--col-k').trim()||cs.borderTopColor,c=cs.getPropertyValue('--col-c').trim();if(k&&h.style.getPropertyValue('--pk')!==k){h.style.setProperty('--pk',k);h.style.setProperty('--pc',c||'#f4ead2');h.classList.add('placa-tom');}});}
setTimeout(function(){try{placasTons();}catch(e){}},1200);setTimeout(function(){try{placasTons();}catch(e){}},4000);
(function(){var st=document.createElement('style');st.id='placas-tons-css';st.textContent=[
 'h2.sec.neo-tit.placa-tom{border:1.5px solid var(--pk)!important;background:var(--neo-papel,none),#f4ead2!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px var(--pk),0 6px 12px -6px rgba(40,30,20,.45)!important;color:#2a2418!important}',
 'h2.sec.neo-tit.placa-tom>span{color:var(--pk)!important}',
 '.neo-moldura .mf-alca{border:1.5px solid var(--col-k,#5a3f2c)!important;background:var(--neo-papel,none),#f4ead2!important;color:var(--col-k,#5a3f2c)!important;box-shadow:0 0 0 2px #f4ead2,0 0 0 3px var(--col-k,#5a3f2c)!important}',
 '.neo-moldura .mf-alca span{color:var(--col-k,#5a3f2c)!important}',
 '.neo-moldura .mf-alca:hover,.neo-moldura .mf-alca[aria-expanded="true"]{background:var(--col-k,#5a3f2c)!important;color:#f4ead2!important}',
 '.neo-moldura .mf-alca:hover span,.neo-moldura .mf-alca[aria-expanded="true"] span{color:#f4ead2!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Painéis expansíveis (Bolsa, Bunker 9, Laptop, Enfermaria, Sully) abrem no centro =======================
   Em tela larga ocupam exatamente a coluna do meio, no lugar do templo central: painel esquerdo, faixa do dia,
   templo da direita e rodapé continuam à vista. */
(function(){var st=document.createElement('style');st.id='pd-centro-css';st.textContent=[
 /* casco e mar na largura toda (com um NPC ao lado, só o casco recua: css 32) */
 'body.op-on #rod-apps{left:0!important;right:0!important}',
 '@media(min-width:1380px){',
 ' body.com-dia #painel-dir.pd.on{left:var(--dia-l,300px)!important;right:var(--dia-r,460px)!important}',
 ' body:not(.com-dia) #painel-dir.pd.on{left:300px!important;right:var(--rail-w,460px)!important}',
 ' #painel-dir.pd.on{width:auto!important;max-width:none!important;top:0!important;bottom:71px!important;height:auto!important;transform:none!important;border-radius:0 0 12px 12px;box-shadow:0 0 0 1px #c9b28a,0 18px 40px -12px rgba(40,25,10,.45)!important}',
 '}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Pílula dos painéis (Bolsa, Bunker 9, Laptop, Enfermaria, Sully) desce para o frontão =======================
   Sai da barra do alto e vira a placa do frontão, assentada na cornija sob o medalhão, como as placas dos outros templos.
   A barra do alto some; o botão de ferramentas segue no canto. */
function pilulaNoFrontao(){var _ps=document.querySelectorAll('.pd-pilula');if(_ps.length>1){var _fora=[].filter.call(_ps,function(x){return !x.closest('#tt-indice');})[0]||_ps[0];[].forEach.call(_ps,function(x){if(x!==_fora){[].forEach.call(x.querySelectorAll('button'),function(b){var k=b.dataset.ic||b.dataset.tt;if(k&&!_fora.querySelector('[data-ic="'+k+'"],[data-tt="'+k+'"]'))_fora.appendChild(b);});x.remove();}});}var f=document.querySelector('#hero-box .neo-frontao.nf2'),p=document.querySelector('.pd-pilula');if(!f||!p)return;var pdo=document.querySelector('#painel-dir.pd.on');if(pdo&&window.innerWidth>=1380){var tp=pdo.querySelector('.pd-top');if(tp&&p.parentNode!==tp){tp.insertBefore(p,tp.firstChild);}document.body.classList.add('pil-frontao');return;}if(p.parentNode!==f){f.appendChild(p);}document.body.classList.add('pil-frontao');}
setInterval(function(){try{pilulaNoFrontao();}catch(e){}},1200);setTimeout(function(){try{pilulaNoFrontao();}catch(e){}},900);
(function(){var st=document.createElement('style');st.id='pil-frontao-css';st.textContent=[
 'body.pil-frontao:not(.op-on) #tt-indice{display:none!important}',
 '#hero-box .nf2>.pd-pilula{position:absolute!important;left:50%;top:109px;transform:translateX(-50%);z-index:5;margin:0!important;',
 ' border:1.5px solid #8a6420!important;background:linear-gradient(180deg,#fbf5e6,#f1e4c6)!important;box-shadow:0 0 0 3px #f6eedb,0 0 0 4.5px #c99a3d,0 6px 12px -6px rgba(70,45,10,.5)!important}',
 '#hero-box .nf2>.pd-pilula button{color:#7a5616!important}',
 '#hero-box .nf2>.pd-pilula button:hover{background:#efe1c2!important}',
 '#hero-box .nf2 .fr-lira{top:8px!important}',
 '#hero-box .nf2 .nf-louro{top:32px!important}',
 '#hero-box .nf2 .nf-txt{top:52px!important}',
 '#hero-box .neo-frontao.nf2{margin-top:18px!important;margin-bottom:14px!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Pílula no frontão: botões na horizontal; rodapé sem cartões cortados em telas menores ======================= */
(function(){var st=document.createElement('style');st.id='pil-rod-css';st.textContent=[
 '#hero-box .nf2>.pd-pilula{display:flex!important;flex-direction:row!important;align-items:stretch;height:34px;padding:0!important;border-radius:999px!important;overflow:visible;width:auto!important}',
 '#hero-box .nf2>.pd-pilula>button{position:relative;display:flex!important;justify-content:center!important;align-items:center!important;width:44px!important;min-width:0;height:100%!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid #d9c08a!important;background:transparent!important;border-radius:0!important;box-shadow:none!important}',
 '#hero-box .nf2>.pd-pilula>button:first-child{border-left:0!important;border-radius:999px 0 0 999px!important}',
 '#hero-box .nf2>.pd-pilula>button:last-child{border-radius:0 999px 999px 0!important}',
 '#hero-box .nf2>.pd-pilula>button svg{margin:0!important;flex:none;width:18px!important;height:18px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#hero-box .nf2>.pd-pilula>button img{width:20px!important;height:20px!important;object-fit:contain}',
 '#hero-box .nf2>.pd-pilula>button>:not(svg):not(img):not([class*="badge"]):not([class*="n"]){max-width:20px}',
 /* rodapé: os cartões encolhem em vez de sumirem pela borda */
 '#rod-apps .rod-top{min-width:0}',
 '#rod-apps .rod-reg,#rod-apps .cp-reg{flex:1 1 auto;min-width:0}',
 '#rod-apps .cr-bar{min-width:0;flex-wrap:nowrap}',
 '#rod-apps .cr-bar>.cr-p{flex:1 1 0!important;min-width:0!important;width:auto!important}',
 '#rod-apps .cr-bar>.cr-p .cr-lb{min-width:0;overflow:hidden}',
 '#rod-apps .cr-bar>.cr-p .cr-lb small,#rod-apps .cr-bar>.cr-p .cr-lb b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
 '@media(max-width:1700px){#rod-apps .cr-bar>.cr-sep,#rod-apps .cr-bar>.cr-dt,#rod-apps .cr-bar>.cr-concha{display:none!important}#rod-apps .cr-bar>.cr-p .cr-ico{width:26px!important;height:26px!important;flex:none}}',
 '@media(max-width:1600px){#rod-apps .cr-bar>.cr-p .cr-ico{display:none!important}#rod-apps .cr-bar>.cr-p{padding-left:8px!important;padding-right:6px!important}}'
].join('\n');document.head.appendChild(st);})();


/* Banner: cartão-postal ajustado (centrado na altura, menos inclinado, sem invadir a linha de baixo) e sem as moedas */
(function(){var st=document.createElement('style');st.id='postal-css';st.textContent=[
 '#hero-box .cp-dracmas,#hero-box :has(>i.mosaico):not(.ac-medalha-bt),#hero-box i.mosaico{display:none!important}',
 '#hero-box .cp-postal{top:46px!important;right:48px!important;left:auto!important;width:272px!important;transform:rotate(-2deg)!important}',
 '#hero-box .bn-base{margin-right:340px!important;width:auto!important}',
 '#hero-box .bn-tit,#hero-box .bn-id{max-width:calc(100% - 360px)!important}'
].join('\n');document.head.appendChild(st);})();



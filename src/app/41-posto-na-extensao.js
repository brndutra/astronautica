/* ======================= O Posto na extensão =======================
   O app tira uma foto do que o Posto mostra (texto e botões de cada cartão) e guarda em S.posto, que sobe com o
   registro; a extensão só lê essa foto e distribui pelas abas (Hoje, Arena, Registro). Um botão tocado na extensão
   volta como evento postoClique (cxAplica, no 19) e o app clica o mesmo botão aqui: a lógica fica só no app.
   Botões que abrem conversa, janela ou seletor ficam de fora: esses se usam no app. */
/* [chave, onde, título, botões cujo texto também é conteúdo (antagonista, ronda, valores do rodapé)] */
var POSTO_CARTOES=[['top','#modo-op>.op-top','Posto de comando','.op-antmini,.cx-rdb'],['foco','#modo-op .op-col1','Escudo','.ov-ant'],['fazer','#modo-op .op-fazer','Arena · ofício'],
 ['estudo','#modo-op .op-estudo','Campo de arquearia'],['lado','#modo-op .op-lado','Píthos'],['rod','#rod-reg','Registro do dia','[data-cr-pop]']];
var POSTO_FORA=/^data-(opsair|satir|npchist|opext|fogo|cxa|opreg|antabre|opfx|notr|mfp|tt|cr-pop|fer|opsat|ovant|antvar|opvira)$/;
var POSTO_SEL=/^\[data-[a-z0-9-]+(="[^"\]]*")?\]$/;
function postoSel(n){var a=[].filter.call(n.attributes,function(x){return /^data-/.test(x.name)&&!/^data-(notr|ic|h|i)$/.test(x.name);})[0];
 return a?(a.value?'['+a.name+'="'+a.value.replace(/["\]]/g,'')+'"]':'['+a.name+']'):null;}
/* o Escudo tem frente e verso: os dois lados entram na foto, mesmo o que estiver virado */
function postoVisivel(e){return !!(e.offsetParent||getComputedStyle(e).position==='fixed'||(e.closest&&e.closest('#modo-op .op-col1')&&!e.closest('[hidden]')));}
/* texto do cartão em linhas, como aparece na tela (rótulos em caixa alta continuam em caixa alta), sem os botões */
function postoLinhas(raiz){var L=[],w=document.createTreeWalker(raiz,NodeFilter.SHOW_TEXT,null),n,ult=null,buf='';
 function bloco(e){while(e&&e!==raiz){var d=getComputedStyle(e).display;if(d!=='inline'&&d!=='inline-block'&&d!=='contents')return e;e=e.parentElement;}return raiz;}
 while((n=w.nextNode())){var p=n.parentElement;if(!p||p.closest('button,[role=button],input,select,textarea,svg,style,script,[hidden],.op-sat-slot,#pz-ticker,.npc-hist,[data-opext]')||!postoVisivel(p))continue;
  var t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;if(getComputedStyle(p).textTransform==='uppercase')t=t.toUpperCase();
  var bl=bloco(p);if(bl!==ult&&buf){L.push(buf);buf='';}ult=bl;buf=buf?buf+' '+t:t;}
 if(buf)L.push(buf);var out=[];L.forEach(function(x){x=x.slice(0,160);if(out[out.length-1]!==x)out.push(x);});return out.slice(0,40);}
/* botões de ação direta (sem janela): rótulo, seletor e, se pedem texto, o campo ao lado */
function postoBotoes(raiz){var B=[],vis={};
 [].forEach.call(raiz.querySelectorAll('button,[role=button],input[type=checkbox]'),function(b){if(b.closest('.op-sat-slot,#pz-ticker,.npc-hist')||!postoVisivel(b))return;
  var a=[].filter.call(b.attributes,function(x){return /^data-/.test(x.name);});if(!a.length||a.some(function(x){return POSTO_FORA.test(x.name);}))return;
  var s=postoSel(b);if(!s||vis[s])return;vis[s]=1;
  var l=(b.getAttribute('aria-label')||b.innerText||b.title||'').replace(/\s+/g,' ').trim().slice(0,40);if(!l)return;
  var c=b.parentElement&&b.parentElement.querySelector('input:not([type=checkbox]):not([type=hidden]),textarea'),i=null,ph='';
  if(c){i=postoSel(c);if(!i)return;ph=(c.placeholder||'').slice(0,40);}
  B.push({l:l,s:s,i:i,ph:ph,on:b.classList.contains('on')||b.getAttribute('aria-pressed')==='true'||b.checked===true});});
 return B.slice(0,30);}
function postoFoto(){if(!document.getElementById('modo-op')||!document.body.classList.contains('op-on'))return null;var C={};
 POSTO_CARTOES.forEach(function(c){var n=document.querySelector(c[1]);if(!n)return;var L=postoLinhas(n);
  if(c[3])[].forEach.call(n.querySelectorAll(c[3]),function(b){if(!postoVisivel(b))return;var ps=b.querySelectorAll('small,b,em,p'),t=(ps.length&&!b.offsetParent?[].map.call(ps,function(x){return x.textContent.trim();}).filter(Boolean).join(' · '):b.innerText.replace(/\s*\n\s*/g,' · ')).replace(/\s+/g,' ').trim();if(t)L.push(t.slice(0,120));});
  C[c[0]]={t:c[2],l:L.slice(0,44),b:postoBotoes(n)};});return C;}
/* só grava quando o conteúdo muda (relógios e contagens regressivas não contam) */
var POSTO_K='';
function postoGrava(forca){if(!forca&&document.visibilityState!=='visible')return;var C=postoFoto();if(!C)return;
 var k=JSON.stringify(C).replace(/\d{1,2}:\d{2}|\d+h\d{2}|\d+\s?min\b|\d+%|em \d+h?\d*/g,'#');if(k===POSTO_K&&!forca)return;POSTO_K=k;
 S.posto={em:Date.now(),c:C};try{grava();}catch(e){}}
setInterval(function(){try{postoGrava(false);}catch(e){}},20000);setTimeout(function(){try{postoGrava(false);}catch(e){}},5000);
/* toque vindo da extensão: preenche o campo, se houver, e clica o mesmo botão do Posto */
function postoClique(d){var s=String(d.sel||''),m=s.match(/^\[(data-[a-z0-9-]+)/);if(!POSTO_SEL.test(s)||!m||POSTO_FORA.test(m[1]))return false;
 var b=document.querySelector('#modo-op '+s)||document.querySelector('#rod-reg '+s);if(!b)return false;
 if(d.inp){if(!POSTO_SEL.test(String(d.inp)))return false;var i=document.querySelector('#modo-op '+d.inp);if(!i)return false;i.value=String(d.val||'').slice(0,300);i.dispatchEvent(new Event('input',{bubbles:true}));}
 b.click();setTimeout(function(){try{postoGrava(true);}catch(e){}},900);return true;}

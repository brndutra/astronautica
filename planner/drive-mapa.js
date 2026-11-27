/* ==========================================================================
   Mapa do Drive: as pastas do Meu Drive como um mapa, no Manual de campo
   - árvore com busca, abrir e fechar, e atalho para abrir cada pasta no Drive
   - o mapa vem de um arquivo mapa-do-drive.json (gerado pelo Claude a partir
     do Drive) e fica no registro do app (S.drive.mapa), não no repositório,
     porque o repositório é público
   Depende de window.ASTRO (S, grava, MF_T, cxPinta, esc) e de window.ASTRO_MF.
   ========================================================================== */
(function(){
"use strict";
var A=window.ASTRO;
if(!A)return;
var T;try{T=A.MF_T;}catch(e){return;}
if(!T||T.some(function(t){return t[0]==='mapa';}))return;

/* entra na coleção logo depois do Espaço digital (ou da revisão da semana) */
var j=T.findIndex(function(t){return t[0]==='digital';});if(j<0)j=T.findIndex(function(t){return t[0]==='semana';});
T.splice(j>=0?j+1:T.length,0,['mapa','Mapa do Drive','todas as pastas, com busca e atalho']);

var ST={q:'',abertos:{}};
try{ST.abertos=JSON.parse(localStorage.getItem('astro-drive-abertos')||'{}')||{};}catch(e){}
function salvaAbertos(){try{localStorage.setItem('astro-drive-abertos',JSON.stringify(ST.abertos));}catch(e){}}
function esc(t){try{return A.esc(t);}catch(e){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}}
function S(){try{return A.S;}catch(e){return null;}}
function mapa(){var s=S();return s&&s.drive&&s.drive.mapa;}
function url(id){return 'https://drive.google.com/drive/folders/'+encodeURIComponent(id);}
function norm(t){return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
function conta(ns){var n=0;(ns||[]).forEach(function(x){n+=1+(x.x?0:(x.c&&!x.f?x.c:conta(x.f)));});return n;}
function codigo(ns){var n=0;(ns||[]).forEach(function(x){n+=x.x?(x.c||0):codigo(x.f);});return n;}

/* cores por área (as pastas numeradas da raiz) */
var COR=['#8c6d3f','#2f5d50','#3d5a80','#8c2f2a','#6b4f8a','#a0522d','#3b6e8f','#5c6b2f','#7a5a36','#4f6d7a'];
function cor(i){return COR[i%COR.length];}

/* ---------- estilo ---------- */
var css=document.createElement('style');
css.textContent=[
 '.dm-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:4px 0 12px}',
 '.dm-bar input[type=search]{flex:1 1 220px;min-width:0;padding:8px 10px;border-radius:8px;border:1px solid rgba(120,100,70,.35);background:rgba(255,255,255,.55);font:inherit;color:inherit}',
 '.dm-bar button{padding:7px 12px;border-radius:999px;border:1px solid rgba(120,100,70,.35);background:transparent;font:inherit;font-size:13px;cursor:pointer;color:inherit}',
 '.dm-bar button:hover{background:rgba(120,100,70,.1)}',
 '.dm-info{font-size:12.5px;opacity:.7;margin:-4px 0 10px}',
 '.dm-arv,.dm-arv ul{list-style:none;margin:0;padding:0}',
 '.dm-arv ul{margin-left:14px;padding-left:12px;border-left:1px dashed rgba(120,100,70,.35)}',
 '.dm-arv li{margin:1px 0}',
 '.dm-ln{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:7px;min-height:30px}',
 '.dm-ln:hover{background:rgba(120,100,70,.08)}',
 '.dm-tg{width:22px;height:22px;flex:0 0 22px;border:0;background:transparent;cursor:pointer;color:inherit;opacity:.65;display:grid;place-items:center;padding:0;border-radius:5px}',
 '.dm-tg:hover{opacity:1;background:rgba(120,100,70,.12)}',
 '.dm-tg svg{width:14px;height:14px;transition:transform .15s}',
 '.dm-tg[aria-expanded="true"] svg{transform:rotate(90deg)}',
 '.dm-tg[disabled]{visibility:hidden}',
 '.dm-pt{width:16px;height:13px;flex:0 0 16px;border-radius:2px 3px 3px 3px;position:relative;opacity:.9}',
 '.dm-pt::before{content:"";position:absolute;left:0;top:-3px;width:7px;height:4px;border-radius:2px 2px 0 0;background:inherit}',
 '.dm-n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14.5px}',
 '.dm-n mark{background:rgba(222,176,44,.45);color:inherit;border-radius:2px}',
 '.dm-raiz>li>.dm-ln .dm-n{font-weight:600;font-size:15.5px}',
 '.dm-c{font-size:11.5px;opacity:.6;white-space:nowrap}',
 '.dm-x{font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;padding:1px 6px;border-radius:999px;background:rgba(120,100,70,.14);opacity:.8}',
 '.dm-st{color:#c8961e}',
 '.dm-ab{flex:0 0 auto;font-size:12.5px;text-decoration:none;color:inherit;opacity:.55;padding:3px 8px;border-radius:999px;border:1px solid transparent}',
 '.dm-ln:hover .dm-ab,.dm-ab:focus{opacity:1;border-color:rgba(120,100,70,.35)}',
 '.dm-vz{padding:16px;border:1px dashed rgba(120,100,70,.45);border-radius:10px;line-height:1.5}',
 '.dm-vz b{display:block;margin-bottom:4px}',
 '.dm-pe{font-size:12.5px;opacity:.7;margin-top:14px;line-height:1.45}',
 '@media (hover:none){.dm-ab{opacity:.85}}'
].join('\n');
document.head.appendChild(css);

var SETA='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ---------- busca: quem casa, e os caminhos até lá ---------- */
function filtra(ns,q){var vis={},abre={};
 function anda(x,pai){var meu=q&&norm(x.n).indexOf(q)>=0,filho=false;
  (x.f||[]).forEach(function(y){if(anda(y,x))filho=true;});
  if(meu||filho){vis[x.id]=1;if(filho)abre[x.id]=1;}
  return meu||filho;}
 ns.forEach(function(x){anda(x,null);});
 return {vis:vis,abre:abre};}
function marca(t,q){var n=norm(t),i=q?n.indexOf(q):-1;if(i<0)return esc(t);return esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length));}

function ramo(ns,ci,q,F,raiz){
 return '<ul'+(raiz?' class="dm-arv dm-raiz"':'')+'>'+ns.map(function(x,i){
  if(q&&!F.vis[x.id])return '';
  var c=raiz?cor(i):ci,tem=!!(x.f&&x.f.length),ab=q?!!F.abre[x.id]:!!ST.abertos[x.id];
  var info=x.x?'<span class="dm-x" title="código exportado, sem mapa interno">código · '+x.c+'</span>':
   (x.c&&!tem?'<span class="dm-c">+'+x.c+' subpastas'+(x.r?' · '+esc(x.r):'')+'</span>':(tem?'<span class="dm-c">'+conta(x.f)+'</span>':''));
  return '<li><div class="dm-ln">'+
   '<button type="button" class="dm-tg" data-dmtg="'+esc(x.id)+'" aria-expanded="'+ab+'" aria-label="'+(ab?'fechar ':'abrir ')+esc(x.n)+'"'+(tem?'':' disabled')+'>'+SETA+'</button>'+
   '<i class="dm-pt" style="background:'+c+'" aria-hidden="true"></i>'+
   '<span class="dm-n" title="'+esc(x.n)+'">'+marca(x.n,q)+(x.s?' <span class="dm-st" title="com estrela">★</span>':'')+'</span>'+info+
   '<a class="dm-ab" href="'+url(x.id)+'" target="_blank" rel="noopener" title="Abrir no Drive">abrir ↗</a></div>'+
   (tem&&ab?ramo(x.f,c,q,F,false):'')+'</li>';}).join('')+'</ul>';}

/* ---------- a página ---------- */
window.ASTRO_MF=window.ASTRO_MF||{};
window.ASTRO_MF.mapa=function(){
 var M=mapa(),h='<h3>Mapa do Drive</h3><p class="mf-d">As pastas do seu Drive num lugar só. Toque na seta para descer; "abrir" leva direto à pasta no Drive.</p>';
 var inp='<input type="file" accept=".json,application/json" data-dmarq hidden>';
 if(!M||!Array.isArray(M.nos)){
  return h+'<div class="dm-vz"><b>Ainda sem mapa neste aparelho.</b>Importe o arquivo <code>mapa-do-drive.json</code>. Ele fica no Drive, na pasta <i>_Organizacao</i>, e também foi entregue na conversa com o Claude. Baixe e escolha o arquivo aqui.<div class="dm-bar" style="margin-top:10px"><button type="button" class="cx-pri" data-dm="imp">importar mapa</button></div>'+inp+'</div>'+
   '<p class="dm-pe">O mapa fica guardado no seu registro, que sincroniza com a nuvem. Não vai para o repositório do app, que é público.</p>';}
 var q=norm(ST.q.trim()),F=q?filtra(M.nos,q):null,n=conta(M.nos),nc=codigo(M.nos);
 var corpo=ramo(M.nos,null,q,F,true);
 if(q&&!Object.keys(F.vis).length)corpo='<p class="mf-vz">Nenhuma pasta com "'+esc(ST.q.trim())+'".</p>';
 return h+'<div class="dm-bar"><input type="search" data-dmq placeholder="buscar pasta…" value="'+esc(ST.q)+'" aria-label="Buscar pasta">'+
  '<button type="button" data-dm="tudo">abrir tudo</button><button type="button" data-dm="nada">fechar tudo</button><button type="button" data-dm="imp">importar novo mapa</button>'+inp+'</div>'+
  '<p class="dm-info">'+n.toLocaleString('pt-BR')+' pastas'+(nc?' (mais '+nc.toLocaleString('pt-BR')+' de código, recolhidas)':'')+' · atualizado em '+esc(String(M.gerado||'').split('-').reverse().join('/'))+(M.fonte?' · '+esc(M.fonte):'')+'</p>'+
  corpo+
  '<p class="dm-pe">Pastas de código exportado aparecem fechadas, só com a contagem. Para atualizar, peça ao Claude: "atualize o mapa do Drive", e importe o arquivo novo.</p>';};

/* ---------- ações ---------- */
function repinta(){try{A.cxPinta();}catch(e){}}
function todos(ns,v,o){(ns||[]).forEach(function(x){if(x.f&&x.f.length){if(v)o[x.id]=1;else delete o[x.id];todos(x.f,v,o);}});}
function importa(arq){if(!arq)return;var r=new FileReader();
 r.onload=function(){try{var m=JSON.parse(r.result);if(!m||!Array.isArray(m.nos))throw new Error('formato');
   var s=S();if(!s)return;s.drive=s.drive||{};s.drive.mapa=m;A.grava();ST.q='';repinta();}
  catch(e){alert('Este arquivo não é um mapa do Drive válido.');}};
 r.readAsText(arq);}
function dentro(e){var w=document.getElementById('cx');return w&&w.contains(e.target)&&w.querySelector('.mf-pg [data-dmq],.mf-pg .dm-vz');}
document.addEventListener('click',function(e){if(!dentro(e))return;var b=e.target.closest('[data-dmtg],[data-dm]');if(!b)return;
 var a=b.getAttribute('data-dmtg');
 if(a){e.preventDefault();e.stopPropagation();if(ST.abertos[a])delete ST.abertos[a];else ST.abertos[a]=1;salvaAbertos();repinta();return;}
 a=b.getAttribute('data-dm');e.preventDefault();e.stopPropagation();
 if(a==='imp'){var f=document.querySelector('#cx [data-dmarq]');if(f)f.click();return;}
 var M=mapa();if(!M)return;
 if(a==='tudo'){todos(M.nos,true,ST.abertos);salvaAbertos();repinta();return;}
 if(a==='nada'){ST.abertos={};salvaAbertos();repinta();}},true);
document.addEventListener('change',function(e){var t=e.target;if(t&&t.hasAttribute&&t.hasAttribute('data-dmarq')){importa(t.files&&t.files[0]);t.value='';}},true);
var tq=0;
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.hasAttribute||!t.hasAttribute('data-dmq'))return;ST.q=t.value;clearTimeout(tq);
 tq=setTimeout(function(){var pos=t.selectionStart;repinta();var n=document.querySelector('#cx [data-dmq]');if(n){n.focus();try{n.setSelectionRange(pos,pos);}catch(z){}}},160);},true);
})();

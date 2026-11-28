/* ======================= Cadernos: páginas próprias criadas no Manual =======================
   Molde da Central de Comando: abas no topo, índice das seções à esquerda, cartões no meio e o trilho de
   Atalhos à direita (teclas 1 a 0 abrem cada atalho ali mesmo). Cada seção é um cartão de um destes tipos:
     nota   texto livre com marcação simples (# título, - item, 1. item, > citação, **negrito**, *itálico*, links)
     lista  itens com caixa de marcar
     tab    tabela de consulta em duas colunas (termo → o que é)
     mapa   mapa mental escrito em tópicos (um por linha, recuo de dois espaços ou Tab = um nível)
   Dados em S.cad (vão para a nuvem pelo grava, como o resto do registro):
     S.cad = {L:[{id,n,abas:[{id,n,d,sec:[{id,t,k,v,h}]}],at:[idDaSeção],aAt,em,up}]}
   Abre por cima de tudo (#cad). O Manual mostra o painel "Cadernos" (cadPainelHTML, chamado pelo 36).
   Endereço próprio: #cad=ID abre o caderno direto, inclusive numa aba nova do navegador (botão ↗). */
var CAD_TIPOS=[['nota','Nota','texto livre'],['lista','Lista','itens de marcar'],['tab','Tabela','termo → o que é'],['mapa','Mapa mental','tópicos viram mapa']];
var CAD_ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
var CAD={id:null,aba:null,q:'',ab:{},ed:{},mp:null,gv:0};
function cadId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
function cadD(){S.cad=S.cad&&typeof S.cad==='object'?S.cad:{L:[]};if(!Array.isArray(S.cad.L))S.cad.L=[];return S.cad;}
function cadAch(id){return cadD().L.filter(function(c){return c.id===id;})[0]||null;}
function cadAtual(){return CAD.id?cadAch(CAD.id):null;}
function cadAbaAt(c){c=c||cadAtual();if(!c)return null;var a=c.abas.filter(function(x){return x.id===(CAD.aba||c.aAt);})[0]||c.abas[0];return a||null;}
function cadSec(c,sid){var r=null;(c.abas||[]).some(function(a){return a.sec.some(function(s){if(s.id===sid){r={a:a,s:s};return true;}});});return r;}
/* grava com folga enquanto se digita (o grava manda para a nuvem) */
function cadGrava(ja){var c=cadAtual();if(c)c.up=Date.now();clearTimeout(CAD.gv);if(ja){try{grava();}catch(e){}return;}CAD.gv=setTimeout(function(){try{grava();}catch(e){}},700);}
function cadNovaSec(k){var v=k==='lista'?[]:k==='tab'?[]:k==='mapa'?'':'';var s={id:cadId(),t:'',k:k,v:v};if(k==='tab')s.h=['termo','o que é'];return s;}
function cadNovo(){var D=cadD(),a={id:cadId(),n:'Geral',d:'',sec:[]},c={id:cadId(),n:'',abas:[a],at:[],aAt:a.id,em:hoje(),up:Date.now()};
 D.L.unshift(c);cadGrava(1);cadAbre(c.id,{nome:1});}

/* ---------- marcação simples ---------- */
function cadMdIn(t){return t.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g,'$1<i>$2</i>')
 .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
 .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g,'$1<a href="$2" target="_blank" rel="noopener">$2</a>');}
function cadMd(src){var L=esc(String(src||'')).split('\n'),h='',lst=null;
 function fecha(){if(lst){h+='</'+lst+'>';lst=null;}}
 L.forEach(function(l){var m;
  if(/^\s*$/.test(l)){fecha();h+='<p class="cad-br"></p>';return;}
  if((m=l.match(/^##\s+(.*)/))){fecha();h+='<h5>'+cadMdIn(m[1])+'</h5>';return;}
  if((m=l.match(/^#\s+(.*)/))){fecha();h+='<h4>'+cadMdIn(m[1])+'</h4>';return;}
  if((m=l.match(/^&gt;\s?(.*)/))){fecha();h+='<blockquote>'+cadMdIn(m[1])+'</blockquote>';return;}
  if((m=l.match(/^\s*[-*•]\s+(.*)/))){if(lst!=='ul'){fecha();h+='<ul>';lst='ul';}h+='<li>'+cadMdIn(m[1])+'</li>';return;}
  if((m=l.match(/^\s*\d+[.)]\s+(.*)/))){if(lst!=='ol'){fecha();h+='<ol>';lst='ol';}h+='<li>'+cadMdIn(m[1])+'</li>';return;}
  fecha();h+='<p>'+cadMdIn(l)+'</p>';});
 fecha();return h.replace(/(<p class="cad-br"><\/p>)+$/,'');}

/* ---------- mapa mental: tópicos → árvore → desenho com o centro no meio e ramos dos dois lados ---------- */
function cadArvore(txt,tit){var raiz={t:'',f:[],n:0},pilha=[{d:-1,no:raiz}];
 String(txt||'').split('\n').forEach(function(l){if(!l.trim())return;var ind=l.match(/^[\t ]*/)[0].replace(/\t/g,'  ').length,d=Math.floor(ind/2),t=l.trim().replace(/^[-*•]\s+/,'');
  while(pilha.length>1&&pilha[pilha.length-1].d>=d)pilha.pop();var no={t:t,f:[]};pilha[pilha.length-1].no.f.push(no);pilha.push({d:d,no:no});});
 if(raiz.f.length===1)return raiz.f[0];raiz.t=tit||'centro';return raiz;}
var CAD_MCOR=['#b5762a','#426b94','#a64f3c','#4f7a35','#806d91','#247f83','#b4634b','#5a3f78'];
function cadQuebra(t,max){var p=String(t).split(/\s+/),L=[],cur='';p.forEach(function(w){if((cur+' '+w).trim().length>max&&cur){L.push(cur);cur=w;}else cur=(cur+' '+w).trim();});if(cur)L.push(cur);return L.slice(0,4);}
function cadMapaSVG(txt,tit,col){var R=cadArvore(txt,tit);if(!R.t&&!R.f.length)return '';col=col||{};
 var FS=13,LH=17,PX=10,PY=6,GX=44,GY=10;
 function mede(no,dep,path){no.p=path;no.L=cadQuebra(no.t,dep===0?22:26);var w=0;no.L.forEach(function(l){w=Math.max(w,l.length*(dep===0?8.1:7.1));});
  no.w=Math.round(w+PX*2);no.h=no.L.length*LH+PY*2;no.dep=dep;no.fe=!!col[path];no.f.forEach(function(f,i){mede(f,dep+1,path+'.'+i);});}
 mede(R,0,'0');
 function alt(no){var vis=no.fe?[]:no.f;if(!vis.length){no.H=no.h;return no.H;}var s=0;vis.forEach(function(f){s+=alt(f);});s+=GY*(vis.length-1);no.H=Math.max(no.h,s);return no.H;}
 /* lados: ramos do centro repartidos pela altura, metade à direita e metade à esquerda */
 var dir=[],esq=[],hd=0,he=0;R.f.forEach(function(f,i){f.cor=CAD_MCOR[i%CAD_MCOR.length];alt(f);});
 R.f.slice().sort(function(){return 0;}).forEach(function(f){if(hd<=he){dir.push(f);hd+=f.H+GY;}else{esq.push(f);he+=f.H+GY;}});
 var N=[],E=[],minX=0,maxX=0,minY=0,maxY=0;
 function poe(no,x,y,lado,cor){no.x=x;no.y=y;no.cor=cor;N.push(no);minX=Math.min(minX,lado<0?x-no.w:x);maxX=Math.max(maxX,lado<0?x:x+no.w);minY=Math.min(minY,y-no.h/2);maxY=Math.max(maxY,y+no.h/2);
  if(no.fe)return;var vis=no.f,tot=0;vis.forEach(function(f){tot+=f.H;});tot+=GY*(vis.length-1);var cy=y-tot/2;
  vis.forEach(function(f){var fy=cy+f.H/2,fx=lado>0?x+no.w+GX:x-no.w-GX;E.push([no,f,lado]);poe(f,fx,fy,lado,cor);cy+=f.H+GY;});}
 R.x=-R.w/2;R.y=0;N.push(R);minX=R.x;maxX=R.x+R.w;minY=-R.h/2;maxY=R.h/2;
 function lado(lst,s){var tot=0;lst.forEach(function(f){tot+=f.H;});tot+=GY*(lst.length-1);var cy=-tot/2;
  lst.forEach(function(f){var fy=cy+f.H/2,fx=s>0?R.x+R.w+GX:R.x-GX;E.push([R,f,s]);poe(f,fx,fy,s,f.cor);cy+=f.H+GY;});}
 lado(dir,1);lado(esq,-1);
 var pad=14,W=maxX-minX+pad*2,H=maxY-minY+pad*2,ox=-minX+pad,oy=-minY+pad,s='';
 E.forEach(function(e){var a=e[0],b=e[1],L=e[2],x1,x2,y1=a.y+oy,y2=b.y+oy;
  if(a===R){x1=(L>0?R.x+R.w:R.x)+ox;}else x1=(L>0?a.x+a.w:a.x-a.w)+ox;
  x2=(L>0?b.x:b.x)+ox;var mx=(x1+x2)/2;
  s+='<path d="M'+x1+' '+y1+'C'+mx+' '+y1+' '+mx+' '+y2+' '+x2+' '+y2+'" stroke="'+b.cor+'" stroke-width="'+(a===R?2.6:1.7)+'" fill="none" stroke-linecap="round"/>';});
 N.forEach(function(no){var L=no===R?0:(dir.indexOf(no)>=0||no.x>=0?1:-1),x=(no===R?no.x:(L>0?no.x:no.x-no.w))+ox,y=no.y-no.h/2+oy,c=no.cor||'#2e2418',rz=no===R;
  var tem=no.f.length>0&&!rz;
  s+='<g class="cm-n'+(rz?' cm-r':'')+(tem?' cm-p':'')+'"'+(tem?' data-cadmp="'+no.p+'"':'')+'>'+
   '<rect x="'+x+'" y="'+y+'" width="'+no.w+'" height="'+no.h+'" rx="'+(rz?no.h/2:7)+'" fill="'+(rz?'var(--cd-ink)':no.dep===1?c:'var(--cd-card)')+'" stroke="'+(rz?'var(--cd-ink)':c)+'" stroke-width="'+(no.dep===1?0:1.4)+'"/>';
  no.L.forEach(function(l,i){s+='<text x="'+(x+no.w/2)+'" y="'+(y+PY+LH*(i+1)-4)+'" text-anchor="middle" font-size="'+(rz?14:FS)+'" font-weight="'+(no.dep<=1?700:500)+'" fill="'+(rz||no.dep===1?'#fffdf6':'var(--cd-ink)')+'">'+esc(l)+'</text>';});
  if(no.fe)s+='<circle cx="'+(L>0?x+no.w+7:x-7)+'" cy="'+(no.y+oy)+'" r="6" fill="'+c+'"/><text x="'+(L>0?x+no.w+7:x-7)+'" y="'+(no.y+oy+3.5)+'" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">+</text>';
  s+='</g>';});
 return '<svg class="cad-mapa-svg" viewBox="0 0 '+Math.ceil(W)+' '+Math.ceil(H)+'" width="'+Math.ceil(W)+'" height="'+Math.ceil(H)+'" role="img" aria-label="mapa mental">'+s+'</svg>';}

/* ---------- corpo de cada tipo ---------- */
function cadCorpo(s,ro){var v=s.v;
 if(s.k==='nota'){if(!ro&&CAD.ed[s.id])return '<textarea class="cad-ta" data-cadv="'+s.id+'" rows="6" placeholder="# título&#10;- item&#10;**negrito**, *itálico*, links">'+esc(v||'')+'</textarea><div class="cad-dica">Esc ou clique fora para ver pronto</div>';
  return v&&String(v).trim()?'<div class="cad-md"'+(ro?'':' data-caded="'+s.id+'" title="clique para editar"')+'>'+cadMd(v)+'</div>':(ro?'<p class="cad-vz">vazio</p>':'<button type="button" class="cad-vzb" data-caded="'+s.id+'">escrever…</button>');}
 if(s.k==='lista'){v=Array.isArray(v)?v:[];var ok=v.filter(function(x){return x.ok;}).length;
  return '<ul class="cad-ls">'+v.map(function(x,i){return '<li class="'+(x.ok?'ok':'')+'"><label><input type="checkbox" data-cadck="'+s.id+'|'+i+'"'+(x.ok?' checked':'')+(ro?'':'')+'>'+
   (ro?'<span>'+cadMdIn(esc(x.t))+'</span>':'<input class="cad-li" data-cadli="'+s.id+'|'+i+'" value="'+esc(x.t)+'">')+'</label>'+(ro?'':'<button type="button" class="cad-xs" data-cadlx="'+s.id+'|'+i+'" aria-label="tirar">×</button>')+'</li>';}).join('')+'</ul>'+
   (ro?(v.length?'':'<p class="cad-vz">vazia</p>'):'<input class="cad-add" data-cadladd="'+s.id+'" placeholder="+ item (Enter)">'+(ok?'<button type="button" class="cad-lk" data-cadlimpa="'+s.id+'">tirar os '+ok+' feitos</button>':''));}
 if(s.k==='tab'){v=Array.isArray(v)?v:[];var hd=s.h||['termo','o que é'];
  return '<table class="cad-tb"><thead><tr>'+(ro?'<th>'+esc(hd[0])+'</th><th>'+esc(hd[1])+'</th>':'<th><input data-cadth="'+s.id+'|0" value="'+esc(hd[0])+'"></th><th><input data-cadth="'+s.id+'|1" value="'+esc(hd[1])+'"></th><th></th>')+'</tr></thead><tbody>'+
   v.map(function(r,i){return ro?'<tr><td>'+cadMdIn(esc(r[0]||''))+'</td><td>'+cadMdIn(esc(r[1]||''))+'</td></tr>':
    '<tr><td><textarea rows="1" data-cadtd="'+s.id+'|'+i+'|0">'+esc(r[0]||'')+'</textarea></td><td><textarea rows="1" data-cadtd="'+s.id+'|'+i+'|1">'+esc(r[1]||'')+'</textarea></td><td><button type="button" class="cad-xs" data-cadtx="'+s.id+'|'+i+'" aria-label="tirar linha">×</button></td></tr>';}).join('')+'</tbody></table>'+
   (ro?(v.length?'':'<p class="cad-vz">vazia</p>'):'<button type="button" class="cad-lk" data-cadtadd="'+s.id+'">+ linha</button>');}
 if(s.k==='mapa'){var svg=cadMapaSVG(v,s.t,s.col);
  var vis=svg?'<div class="cad-mapa">'+svg+'</div>':'<p class="cad-vz">'+(ro?'vazio':'escreva os tópicos abaixo: a primeira linha é o centro; cada recuo é um nível')+'</p>';
  /* nos atalhos o mapa vira tópicos recuados, que se leem numa coluna estreita */
  if(ro){if(!svg)return vis;var R=cadArvore(v,s.t);var ul=function(no){return no.f.length?'<ul>'+no.f.map(function(f){return '<li>'+esc(f.t)+ul(f)+'</li>';}).join('')+'</ul>':'';};
   return '<div class="cad-md cad-mtopo"><h4>'+esc(R.t)+'</h4>'+ul(R)+'</div>';}
  return vis+'<div class="cad-mtools"><button type="button" class="cad-lk" data-cadmed="'+s.id+'">'+(CAD.ed[s.id]||!svg?'esconder os tópicos':'editar os tópicos')+'</button>'+(svg?'<button type="button" class="cad-lk" data-cadmtela="'+s.id+'">tela cheia</button>':'')+'</div>'+
   (CAD.ed[s.id]||!svg?'<textarea class="cad-ta cad-mono" data-cadv="'+s.id+'" rows="8" placeholder="Centro do mapa&#10;  Ramo 1&#10;    detalhe&#10;  Ramo 2">'+esc(v||'')+'</textarea><div class="cad-dica">Tab recua · Shift+Tab volta · clique num ramo do mapa para recolher</div>':'');}
 return '';}
function cadTipoNome(k){var t=CAD_TIPOS.filter(function(x){return x[0]===k;})[0];return t?t[1]:k;}
function cadCartao(c,s,i){var st=c.at.indexOf(s.id)>=0;
 return '<section class="cad-pc cad-k-'+s.k+(CAD.ab[s.id]===false?' fechado':'')+'" id="cs-'+s.id+'" data-cads="'+s.id+'">'+
  '<header class="cad-pch"><span class="cad-rn">'+(CAD_ROM[i]||i+1)+'</span><input class="cad-pct" data-cadst="'+s.id+'" value="'+esc(s.t)+'" placeholder="'+esc(cadTipoNome(s.k))+' sem título">'+
  '<span class="cad-pcf"><button type="button" class="'+(st?'on':'')+'" data-cadstar="'+s.id+'" title="'+(st?'tirar dos atalhos':'pôr nos atalhos')+'">'+(st?'★':'☆')+'</button>'+
  '<button type="button" data-cadup="'+s.id+'" title="subir">↑</button><button type="button" data-caddn="'+s.id+'" title="descer">↓</button>'+
  '<button type="button" data-cadmv="'+s.id+'" title="mudar de aba">⇄</button><button type="button" class="cad-del" data-cadsdel="'+s.id+'" title="excluir a seção">✕</button></span></header>'+
  '<div class="cad-pcb">'+cadCorpo(s,false)+'</div></section>';}

/* ---------- a página ---------- */
function cadHTML(){var c=cadAtual();if(!c)return '';var a=cadAbaAt(c),q=CAD.q.trim().toLowerCase(),solo=document.body.classList.contains('cad-solo');
 var bar='<header class="cad-bar">'+
  '<button type="button" class="cad-volta" data-cadsai>'+(solo?'← app':'← Manual')+'</button>'+
  '<div class="cad-brand"><small>caderno</small><input class="cad-nome" data-cadnome value="'+esc(c.n)+'" placeholder="nome do caderno"></div>'+
  '<nav class="cad-abas" role="tablist">'+c.abas.map(function(x){return '<button type="button" role="tab" data-cadaba="'+x.id+'" aria-selected="'+(x===a&&!q)+'">'+esc(x.n||'sem nome')+'<i>'+x.sec.length+'</i></button>';}).join('')+
  '<button type="button" class="cad-abamais" data-cadabanova title="nova aba">+ aba</button></nav>'+
  '<div class="cad-tools"><label class="cad-q"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input type="search" data-cadq placeholder="buscar no caderno" value="'+esc(CAD.q)+'"></label>'+
  (solo?'':'<a class="cad-tb-b" href="#cad='+c.id+'" target="_blank" rel="noopener" title="abrir este caderno numa aba própria do navegador">↗</a>')+
  '<button type="button" class="cad-tb-b cad-m-only" data-cadlado="idx" title="índice">☰</button><button type="button" class="cad-tb-b cad-m-only" data-cadlado="atl" title="atalhos">★</button>'+
  '<button type="button" class="cad-tb-b" data-cadmenu title="mais">⋯</button></div></header>';
 var idx='<aside class="cad-idx"><div class="cad-idxh"><b>'+esc(q?'busca':(a.n||'aba'))+'</b></div>'+
  (q?'':'<ol>'+a.sec.map(function(s,i){return '<li><a href="#" data-cadir="'+s.id+'"><span>'+(CAD_ROM[i]||i+1)+'</span>'+esc(s.t||cadTipoNome(s.k)+' sem título')+'</a></li>';}).join('')+'</ol>')+
  '<div class="cad-novas"><small>nova seção</small>'+CAD_TIPOS.map(function(t){return '<button type="button" data-cadnsec="'+t[0]+'"><b>'+t[1]+'</b><span>'+t[2]+'</span></button>';}).join('')+'</div>'+
  '<div class="cad-outros"><small>outros cadernos</small>'+cadD().L.filter(function(x){return x.id!==c.id;}).slice(0,8).map(function(x){return '<a href="#" data-cadabre="'+x.id+'">'+esc(x.n||'sem nome')+'</a>';}).join('')+
  '<a href="#" data-cadnovo class="cad-novo-l">+ novo caderno</a></div></aside>';
 var main;
 if(q){var R=[];c.abas.forEach(function(x){x.sec.forEach(function(s){var txt=(s.t+' '+(typeof s.v==='string'?s.v:JSON.stringify(s.v||''))).toLowerCase();if(txt.indexOf(q)>=0)R.push([x,s]);});});
  main='<div class="cad-head"><h1>Busca</h1><p>'+R.length+' '+(R.length===1?'seção':'seções')+' com “'+esc(CAD.q)+'”, em todas as abas.</p></div><div class="cad-res">'+
   (R.map(function(r){return '<button type="button" class="cad-rs" data-cadirab="'+r[0].id+'|'+r[1].id+'"><em>'+esc(r[0].n)+' · '+esc(cadTipoNome(r[1].k))+'</em><b>'+esc(r[1].t||'sem título')+'</b></button>';}).join('')||'<p class="cad-vz">nada encontrado</p>')+'</div>';}
 else main='<div class="cad-head"><input class="cad-h1" data-cadaban value="'+esc(a.n)+'" placeholder="nome da aba"><textarea class="cad-h1d" data-cadabad rows="1" placeholder="uma linha sobre o que guarda esta aba (opcional)">'+esc(a.d||'')+'</textarea></div>'+
  (a.sec.length?'<div class="cad-grid">'+a.sec.map(function(s,i){return cadCartao(c,s,i);}).join('')+'</div>':
   '<div class="cad-vazio"><b>Aba vazia.</b><span>Comece por um destes:</span><div>'+CAD_TIPOS.map(function(t){return '<button type="button" data-cadnsec="'+t[0]+'"><b>'+t[1]+'</b><small>'+t[2]+'</small></button>';}).join('')+'</div></div>');
 var ats=c.at.map(function(sid){return cadSec(c,sid);}).filter(Boolean);
 var atl='<aside class="cad-atl"><div class="cad-atlh"><b>Atalhos</b><small>'+(ats.length?'teclas 1–'+(ats.length>=10?'0':ats.length):'☆ nas seções')+'</small></div>'+
  (ats.length?ats.slice(0,10).map(function(x,i){var aberto=CAD.atA===x.s.id;return '<div class="cad-at'+(aberto?' on':'')+'"><button type="button" class="cad-atb" data-cadat="'+x.s.id+'"><kbd>'+((i+1)%10)+'</kbd><span><b>'+esc(x.s.t||'sem título')+'</b><small>'+esc(x.a.n)+' · '+esc(cadTipoNome(x.s.k))+'</small></span><i data-cadirab="'+x.a.id+'|'+x.s.id+'" title="ir para a seção">ir</i></button>'+
   (aberto?'<div class="cad-atc">'+cadCorpo(x.s,true)+'</div>':'')+'</div>';}).join(''):'<p class="cad-vz">Marque ☆ numa seção para tê-la aqui, à mão, de qualquer aba.</p>')+'</aside>';
 var menu=CAD.menu?'<div class="cad-menu" role="menu"><button type="button" data-cadabaren>renomear esta aba</button>'+(c.abas.length>1?'<button type="button" data-cadabadel class="'+(CAD.conf==='aba'?'conf':'')+'">'+(CAD.conf==='aba'?'confirmar: excluir a aba e suas seções':'excluir esta aba')+'</button>':'')+
  '<button type="button" data-cadexp>baixar uma cópia (JSON)</button><button type="button" data-caddel class="'+(CAD.conf==='cad'?'conf':'')+'">'+(CAD.conf==='cad'?'confirmar: excluir o caderno inteiro':'excluir o caderno')+'</button></div>':'';
 var mv='';if(CAD.mv){var cs=cadSec(c,CAD.mv);if(cs)mv='<div class="cad-pop"><div><b>Mudar “'+esc(cs.s.t||'sem título')+'” para a aba:</b>'+c.abas.filter(function(x){return x!==cs.a;}).map(function(x){return '<button type="button" data-cadmvp="'+x.id+'">'+esc(x.n)+'</button>';}).join('')+'<button type="button" data-cadmvp="+">+ aba nova</button><button type="button" class="cad-lk" data-cadmvx>cancelar</button></div></div>';}
 return bar+menu+'<div class="cad-desk">'+idx+'<main class="cad-main">'+main+'</main>'+atl+'</div>'+mv+(CAD.mp?cadTelaHTML(c):'');}
function cadTelaHTML(c){var x=cadSec(c,CAD.mp);if(!x)return '';return '<div class="cad-tela"><header><b>'+esc(x.s.t||'mapa mental')+'</b><span><button type="button" data-cadmz="-">−</button><button type="button" data-cadmz="+">+</button><button type="button" data-cadmtx>fechar</button></span></header><div class="cad-tela-c" style="--z:'+(CAD.mz||1)+'">'+cadMapaSVG(x.s.v,x.s.t,x.s.col)+'</div></div>';}
function cadEl(){var w=document.getElementById('cad');if(!w){w=document.createElement('div');w.id='cad';w.setAttribute('data-notr','');document.body.appendChild(w);}return w;}
function cadPinta(){var w=cadEl(),c=cadAtual();if(!c){w.classList.remove('on');document.documentElement.classList.remove('cad-on');w.innerHTML='';return;}
 var m=w.querySelector('.cad-main'),st=m?m.scrollTop:0,a=document.activeElement,fk=null,sel=null;
 if(a&&w.contains(a)&&a.matches('input,textarea')){fk=['data-cadv','data-cadst','data-cadli','data-cadtd','data-cadth','data-cadq','data-cadnome','data-cadaban','data-cadabad','data-cadladd'].filter(function(k){return a.hasAttribute(k);})[0];if(fk)sel=[fk,a.getAttribute(fk),a.selectionStart,a.selectionEnd];}
 w.className='on'+(CAD.lado?' lado-'+CAD.lado:'');document.documentElement.classList.add('cad-on');w.innerHTML=cadHTML();
 var m2=w.querySelector('.cad-main');if(m2)m2.scrollTop=st;
 if(sel){var f=w.querySelector('['+sel[0]+'="'+sel[1].replace(/"/g,'')+'"]');if(f){f.focus();try{f.setSelectionRange(sel[2],sel[3]);}catch(e){}}}
 [].forEach.call(w.querySelectorAll('textarea'),cadCresce);
 /* mapa maior que a tela (celular): começa mostrando o centro */
 [].forEach.call(w.querySelectorAll('.cad-mapa,.cad-tela-c'),function(m){if(m.scrollWidth>m.clientWidth)m.scrollLeft=(m.scrollWidth-m.clientWidth)/2;});}
function cadCresce(t){if(!t||t.tagName!=='TEXTAREA')return;t.style.height='auto';t.style.height=(t.scrollHeight+2)+'px';}
function cadAbre(id,o){var c=cadAch(id);if(!c)return;o=o||{};CAD.id=id;CAD.aba=c.aAt||c.abas[0].id;CAD.q='';CAD.ed={};CAD.menu=0;CAD.conf='';CAD.mv=null;CAD.mp=null;CAD.atA=null;CAD.lado=null;cadPinta();
 if(o.nome){var n=cadEl().querySelector('[data-cadnome]');if(n)n.focus();}
 if(o.sec)setTimeout(function(){cadVai(o.sec);},30);}
function cadFecha(){CAD.id=null;cadPinta();if(document.body.classList.contains('cad-solo')){document.body.classList.remove('cad-solo');}
 if(/^#cad=/.test(location.hash))try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
 try{if(CX.m==='mf')cxPinta();}catch(e){}}
function cadVai(sid){var c=cadAtual(),x=c&&cadSec(c,sid);if(!x)return;if(CAD.q||CAD.aba!==x.a.id){CAD.q='';CAD.aba=c.aAt=x.a.id;cadPinta();}
 var el=document.getElementById('cs-'+sid);if(el){el.scrollIntoView({behavior:'smooth',block:'start'});el.classList.remove('pisca');void el.offsetWidth;el.classList.add('pisca');}}
function cadSecNova(k){var c=cadAtual(),a=cadAbaAt(c);if(!a)return;var s=cadNovaSec(k);a.sec.push(s);if(k==='nota'||k==='mapa')CAD.ed[s.id]=1;CAD.q='';CAD.lado=null;cadGrava(1);cadPinta();
 var t=document.querySelector('#cs-'+s.id+' [data-cadst]');if(t){t.focus();document.getElementById('cs-'+s.id).scrollIntoView({behavior:'smooth',block:'center'});}}
function cadAt(sid){CAD.atA=CAD.atA===sid?null:sid;cadPinta();}

/* ---------- o painel "Cadernos" no Manual (36) ---------- */
function cadPainelHTML(){var L=cadD().L;
 return '<section class="mf-painel cad-mfp" style="--pi:0"><h3>Cadernos</h3><p>páginas suas: registros, consultas e mapas mentais</p><div class="mf-cards">'+
  L.map(function(c){var n=0;c.abas.forEach(function(a){n+=a.sec.length;});return '<button type="button" class="mf-card cad-mfc" data-cadabre="'+c.id+'" data-mfbusca="'+esc(((c.n||'')+' caderno').toLowerCase())+'"><em>caderno</em><b>'+esc(c.n||'sem nome')+'</b><small>'+c.abas.length+' '+(c.abas.length===1?'aba':'abas')+' · '+n+' '+(n===1?'seção':'seções')+'</small></button>';}).join('')+
  '<button type="button" class="mf-card cad-mfn" data-cadnovo data-mfbusca="novo caderno criar página"><em>novo</em><b>+ Caderno</b><small>abas, seções, atalhos e mapas mentais</small></button></div></section>';}

/* ---------- eventos ---------- */
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;
 var nv=t.closest('[data-cadnovo]');if(nv){e.preventDefault();e.stopPropagation();cadNovo();return;}
 var ab=t.closest('[data-cadabre]');if(ab){e.preventDefault();e.stopPropagation();cadAbre(ab.getAttribute('data-cadabre'));return;}
 var w=document.getElementById('cad');if(!w||!w.contains(t)||!CAD.id)return;
 var c=cadAtual(),a=cadAbaAt(c),b,v;
 if(CAD.menu&&!t.closest('.cad-menu,[data-cadmenu]')){CAD.menu=0;CAD.conf='';cadPinta();if(!t.closest('button,a,input,textarea'))return;}
 if(t.closest('[data-cadsai]')){cadFecha();return;}
 if((b=t.closest('[data-cadirab]'))){e.preventDefault();e.stopPropagation();v=b.getAttribute('data-cadirab').split('|');CAD.lado=null;cadVai(v[1]);return;}
 if((b=t.closest('[data-cadaba]'))){CAD.aba=c.aAt=b.getAttribute('data-cadaba');CAD.q='';CAD.atA=CAD.atA;cadGrava();cadPinta();var m=w.querySelector('.cad-main');if(m)m.scrollTop=0;return;}
 if(t.closest('[data-cadabanova]')){var na={id:cadId(),n:'Nova aba',d:'',sec:[]};c.abas.push(na);CAD.aba=c.aAt=na.id;CAD.q='';cadGrava(1);cadPinta();var h=w.querySelector('[data-cadaban]');if(h){h.focus();h.select();}return;}
 if(t.closest('[data-cadmenu]')){CAD.menu=!CAD.menu;CAD.conf='';cadPinta();return;}
 if(t.closest('[data-cadabaren]')){CAD.menu=0;cadPinta();var h2=w.querySelector('[data-cadaban]');if(h2){h2.focus();h2.select();}return;}
 if(t.closest('[data-cadabadel]')){if(CAD.conf!=='aba'){CAD.conf='aba';cadPinta();return;}var ids=a.sec.map(function(s){return s.id;});c.at=c.at.filter(function(x){return ids.indexOf(x)<0;});
  c.abas=c.abas.filter(function(x){return x!==a;});CAD.aba=c.aAt=c.abas[0].id;CAD.menu=0;CAD.conf='';cadGrava(1);cadPinta();return;}
 if(t.closest('[data-caddel]')){if(CAD.conf!=='cad'){CAD.conf='cad';cadPinta();return;}var D=cadD();D.L=D.L.filter(function(x){return x!==c;});cadGrava(1);cadFecha();return;}
 if(t.closest('[data-cadexp]')){CAD.menu=0;cadPinta();try{var bl=new Blob([JSON.stringify(c,null,1)],{type:'application/json'}),u=URL.createObjectURL(bl),l=document.createElement('a');l.href=u;l.download='caderno-'+(c.n||'sem-nome').toLowerCase().replace(/[^a-z0-9à-ú]+/gi,'-')+'.json';document.body.appendChild(l);l.click();l.remove();setTimeout(function(){URL.revokeObjectURL(u);},2000);}catch(z){}return;}
 if((b=t.closest('[data-cadlado]'))){v=b.getAttribute('data-cadlado');CAD.lado=CAD.lado===v?null:v;cadPinta();return;}
 if(CAD.lado&&!t.closest('.cad-idx,.cad-atl')){CAD.lado=null;cadPinta();return;}
 if((b=t.closest('[data-cadnsec]'))){cadSecNova(b.getAttribute('data-cadnsec'));return;}
 if((b=t.closest('[data-cadir]'))){e.preventDefault();CAD.lado=null;cadVai(b.getAttribute('data-cadir'));return;}
 if((b=t.closest('[data-cadat]'))){cadAt(b.getAttribute('data-cadat'));return;}
 if((b=t.closest('[data-cadstar]'))){v=b.getAttribute('data-cadstar');var i=c.at.indexOf(v);if(i>=0)c.at.splice(i,1);else c.at.push(v);cadGrava(1);cadPinta();return;}
 if((b=t.closest('[data-cadup],[data-caddn]'))){v=b.getAttribute('data-cadup')||b.getAttribute('data-caddn');var x=cadSec(c,v),j=x.a.sec.indexOf(x.s),k=b.hasAttribute('data-cadup')?j-1:j+1;
  if(k>=0&&k<x.a.sec.length){x.a.sec.splice(j,1);x.a.sec.splice(k,0,x.s);cadGrava(1);cadPinta();var el=document.getElementById('cs-'+v);if(el)el.scrollIntoView({block:'nearest'});}return;}
 if((b=t.closest('[data-cadsdel]'))){v=b.getAttribute('data-cadsdel');if(b.className.indexOf('conf')<0){b.className+=' conf';b.textContent='excluir?';setTimeout(function(){if(b.isConnected){b.className='cad-del';b.textContent='✕';}},3000);return;}
  var y=cadSec(c,v);y.a.sec=y.a.sec.filter(function(s){return s!==y.s;});c.at=c.at.filter(function(z){return z!==v;});if(CAD.atA===v)CAD.atA=null;cadGrava(1);cadPinta();return;}
 if((b=t.closest('[data-cadmv]'))){CAD.mv=b.getAttribute('data-cadmv');cadPinta();return;}
 if(t.closest('[data-cadmvx]')){CAD.mv=null;cadPinta();return;}
 if((b=t.closest('[data-cadmvp]'))){var y2=cadSec(c,CAD.mv),dst=b.getAttribute('data-cadmvp'),A2;if(!y2){CAD.mv=null;cadPinta();return;}
  if(dst==='+'){A2={id:cadId(),n:'Nova aba',d:'',sec:[]};c.abas.push(A2);}else A2=c.abas.filter(function(x){return x.id===dst;})[0];
  y2.a.sec=y2.a.sec.filter(function(s){return s!==y2.s;});A2.sec.push(y2.s);CAD.mv=null;cadGrava(1);cadVai(y2.s.id);cadPinta();return;}
 if((b=t.closest('[data-caded]'))){if(t.closest('a'))return;CAD.ed[b.getAttribute('data-caded')]=1;cadPinta();var ta=w.querySelector('[data-cadv="'+b.getAttribute('data-caded')+'"]');if(ta){ta.focus();ta.setSelectionRange(ta.value.length,ta.value.length);}return;}
 if((b=t.closest('[data-cadmed]'))){v=b.getAttribute('data-cadmed');var xs=cadSec(c,v);if(CAD.ed[v]||!cadMapaSVG(xs.s.v,xs.s.t))delete CAD.ed[v];else CAD.ed[v]=1;if(!cadMapaSVG(xs.s.v,xs.s.t))CAD.ed[v]=1;cadPinta();return;}
 if((b=t.closest('[data-cadmtela]'))){CAD.mp=b.getAttribute('data-cadmtela');CAD.mz=1;cadPinta();return;}
 if(t.closest('[data-cadmtx]')){CAD.mp=null;cadPinta();return;}
 if((b=t.closest('[data-cadmz]'))){CAD.mz=Math.max(.4,Math.min(3,(CAD.mz||1)*(b.getAttribute('data-cadmz')==='+'?1.25:.8)));var tc=w.querySelector('.cad-tela-c');if(tc)tc.style.setProperty('--z',CAD.mz);return;}
 if((b=t.closest('[data-cadmp]'))){var sec=t.closest('[data-cads]'),sid=sec?sec.getAttribute('data-cads'):CAD.mp,xm=cadSec(c,sid);if(!xm)return;xm.s.col=xm.s.col||{};var p=b.getAttribute('data-cadmp');if(xm.s.col[p])delete xm.s.col[p];else xm.s.col[p]=1;cadGrava();cadPinta();return;}
 if((b=t.closest('[data-cadlx]'))){v=b.getAttribute('data-cadlx').split('|');var xl=cadSec(c,v[0]);xl.s.v.splice(+v[1],1);cadGrava(1);cadPinta();return;}
 if((b=t.closest('[data-cadlimpa]'))){var xl2=cadSec(c,b.getAttribute('data-cadlimpa'));xl2.s.v=xl2.s.v.filter(function(x){return !x.ok;});cadGrava(1);cadPinta();return;}
 if((b=t.closest('[data-cadtadd]'))){var xt=cadSec(c,b.getAttribute('data-cadtadd'));xt.s.v.push(['','']);cadGrava(1);cadPinta();var tds=w.querySelectorAll('[data-cadtd^="'+xt.s.id+'|'+(xt.s.v.length-1)+'|0"]');if(tds[0])tds[0].focus();return;}
 if((b=t.closest('[data-cadtx]'))){v=b.getAttribute('data-cadtx').split('|');var xt2=cadSec(c,v[0]);xt2.s.v.splice(+v[1],1);cadGrava(1);cadPinta();return;}
 if(t.closest('.cad-tela')&&!t.closest('.cad-tela-c svg,header')){CAD.mp=null;cadPinta();return;}},true);
document.addEventListener('change',function(e){var t=e.target,c=cadAtual();if(!c||!t.closest||!t.closest('#cad'))return;var v;
 if((v=t.getAttribute('data-cadck'))){v=v.split('|');var x=cadSec(c,v[0]);if(x&&x.s.v[+v[1]]){x.s.v[+v[1]].ok=t.checked?1:0;cadGrava(1);cadPinta();}}},true);
document.addEventListener('input',function(e){var t=e.target,c=cadAtual();if(!c||!t.closest||!t.closest('#cad'))return;var v,x;
 if(t.tagName==='TEXTAREA')cadCresce(t);
 if(t.hasAttribute('data-cadq')){CAD.q=t.value;cadPinta();return;}
 if(t.hasAttribute('data-cadnome')){c.n=t.value;cadGrava();return;}
 if(t.hasAttribute('data-cadaban')){var a=cadAbaAt(c);a.n=t.value;var bt=document.querySelector('#cad [data-cadaba="'+a.id+'"]');if(bt&&bt.firstChild)bt.firstChild.nodeValue=t.value||'sem nome';var ih=document.querySelector('#cad .cad-idxh b');if(ih)ih.textContent=t.value||'aba';cadGrava();return;}
 if(t.hasAttribute('data-cadabad')){cadAbaAt(c).d=t.value;cadGrava();return;}
 if((v=t.getAttribute('data-cadst'))){x=cadSec(c,v);if(!x)return;x.s.t=t.value;var li=document.querySelector('#cad [data-cadir="'+v+'"]');if(li&&li.lastChild)li.lastChild.nodeValue=t.value||cadTipoNome(x.s.k)+' sem título';cadGrava();return;}
 if((v=t.getAttribute('data-cadv'))){x=cadSec(c,v);if(!x)return;x.s.v=t.value;cadGrava();
  if(x.s.k==='mapa'){var mp=t.closest('.cad-pc').querySelector('.cad-mapa'),svg=cadMapaSVG(x.s.v,x.s.t,x.s.col);if(mp&&svg)mp.innerHTML=svg;else if(!mp&&svg){CAD.ed[v]=1;cadPinta();}}return;}
 if((v=t.getAttribute('data-cadli'))){v=v.split('|');x=cadSec(c,v[0]);if(x&&x.s.v[+v[1]]){x.s.v[+v[1]].t=t.value;cadGrava();}return;}
 if((v=t.getAttribute('data-cadth'))){v=v.split('|');x=cadSec(c,v[0]);if(x){x.s.h=x.s.h||['',''];x.s.h[+v[1]]=t.value;cadGrava();}return;}
 if((v=t.getAttribute('data-cadtd'))){v=v.split('|');x=cadSec(c,v[0]);if(x&&x.s.v[+v[1]]){x.s.v[+v[1]][+v[2]]=t.value;cadGrava();}return;}},true);
/* nota: ao sair do campo, volta a mostrar pronta */
document.addEventListener('focusout',function(e){var t=e.target,v;if(!t.getAttribute||!(v=t.getAttribute('data-cadv'))||!CAD.id)return;var x=cadSec(cadAtual(),v);
 if(x&&x.s.k==='nota')setTimeout(function(){var a=document.activeElement;if(a&&a.getAttribute&&a.getAttribute('data-cadv')===v)return;delete CAD.ed[v];cadGrava(1);cadPinta();},120);},true);
/* teclado: Esc fecha (nota, menu, tela cheia, caderno); 1–0 abrem os atalhos; Enter adiciona item; Tab recua no mapa */
window.addEventListener('keydown',function(e){if(!CAD.id)return;var t=e.target,c=cadAtual(),dig=t&&t.matches&&t.matches('input,textarea,[contenteditable]'),v;
 if(e.key==='Escape'){e.stopImmediatePropagation();e.preventDefault();
  if(dig&&(v=t.getAttribute('data-cadv'))){var x=cadSec(c,v);if(x&&x.s.k==='nota'){delete CAD.ed[v];cadGrava(1);cadPinta();return;}t.blur();return;}
  if(CAD.mp){CAD.mp=null;cadPinta();return;}if(CAD.mv){CAD.mv=null;cadPinta();return;}if(CAD.menu){CAD.menu=0;cadPinta();return;}if(CAD.lado){CAD.lado=null;cadPinta();return;}
  if(CAD.q){CAD.q='';cadPinta();return;}if(dig){t.blur();return;}cadFecha();return;}
 if(dig){
  if(e.key==='Enter'&&(v=t.getAttribute('data-cadladd'))){e.preventDefault();var s=t.value.trim();if(!s)return;var xl=cadSec(c,v);xl.s.v.push({t:s,ok:0});cadGrava(1);cadPinta();var n=document.querySelector('#cad [data-cadladd="'+v+'"]');if(n){n.value='';n.focus();}return;}
  if(e.key==='Enter'&&t.hasAttribute('data-cadli')){e.preventDefault();var p=t.getAttribute('data-cadli').split('|'),n2=document.querySelector('#cad [data-cadladd="'+p[0]+'"]');if(n2)n2.focus();return;}
  if(e.key==='Tab'&&(v=t.getAttribute('data-cadv'))&&cadSec(c,v)&&cadSec(c,v).s.k==='mapa'){e.preventDefault();var ta=t,st=ta.value,a0=ta.selectionStart,a1=ta.selectionEnd,ls=st.lastIndexOf('\n',a0-1)+1,le=st.indexOf('\n',a1);if(le<0)le=st.length;
   var bloco=st.slice(ls,le).split('\n'),nb=bloco.map(function(l){return e.shiftKey?l.replace(/^( {1,2}|\t)/,''):'  '+l;}).join('\n');
   ta.value=st.slice(0,ls)+nb+st.slice(le);var dd=nb.length-(le-ls);ta.selectionStart=Math.max(ls,a0+(e.shiftKey?Math.min(0,dd):2));ta.selectionEnd=a1+dd;ta.dispatchEvent(new Event('input',{bubbles:true}));return;}
  return;}
 if(/^[0-9]$/.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey){var i=e.key==='0'?9:+e.key-1,sid=c.at.filter(function(z){return cadSec(c,z);})[i];if(sid){e.preventDefault();e.stopImmediatePropagation();cadAt(sid);}return;}
 if(e.key==='/'){var q=document.querySelector('#cad [data-cadq]');if(q){e.preventDefault();q.focus();}}},true);
/* endereço próprio: #cad=ID abre o caderno (aba nova do navegador ou link guardado) */
function cadHash(){var m=location.hash.match(/^#cad=([a-z0-9]+)/i);if(!m)return;var tenta=0;(function vai(){if(cadAch(m[1])){document.body.classList.add('cad-solo');cadAbre(m[1]);return;}if(++tenta<40)setTimeout(vai,500);})();}
window.addEventListener('hashchange',cadHash);setTimeout(cadHash,600);
/* a nuvem pode trocar o registro inteiro: o caderno aberto se redesenha */
setInterval(function(){if(!CAD.id)return;var a=document.activeElement;if(a&&a.closest&&a.closest('#cad')&&a.matches('input,textarea'))return;if(!cadAtual()){cadFecha();return;}
 var c=cadAtual();if(CAD._up!==c.up){CAD._up=c.up;cadPinta();}},3000);

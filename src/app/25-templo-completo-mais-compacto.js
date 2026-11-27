/* ======================= templo completo mais compacto =======================
   Rotina do chalé (Concha, Inspeção, Ronda) e Culture Vulture viram gavetas recolhidas com resumo;
   Prêmios rola por dentro na altura do Arsenal; molduras com menos respiro. */
function clEstado(k,v){var o={};try{o=JSON.parse(localStorage.getItem('astro_cl')||'{}')||{};}catch(e){}if(v===undefined)return o[k]!==undefined?o[k]:1;o[k]=v;try{localStorage.setItem('astro_cl',JSON.stringify(o));}catch(e){}}
function clResumoRt(){var t=0,on=0;try{var T=rtD().toques||[];t=T.length;on=T.filter(function(x){return x.on;}).length;}catch(e){}
 var prox='';try{var a=opMin();var L=(rtD().toques||[]).filter(function(x){return x.on&&rtMin(x.h)>a;}).sort(function(p,q){return rtMin(p.h)-rtMin(q.h);});if(L[0])prox=' · próximo toque '+L[0].h+' '+L[0].n;}catch(e){}
 return on+' de '+t+' toques da concha ligados'+prox;}
function clRotina(){var r1=document.getElementById('tm-r1'),rb=document.getElementById('rt-box');if(!r1||!rb)return;var b=document.getElementById('cl-rt');
 if(!b){b=document.createElement('button');b.type='button';b.id='cl-rt';b.className='cl-bar';
  b.addEventListener('click',function(){var off=!r1.classList.contains('cl-off');r1.classList.toggle('cl-off',off);clEstado('rt',off?1:0);clRotina();});}
 if(r1.firstElementChild!==b)r1.insertBefore(b,r1.firstChild);
 var off=!!clEstado('rt');r1.classList.toggle('cl-off',off);
 var h='<span class="cl-k">rotina do chalé</span><b>Toque da Concha · Inspeção · Ronda</b><small>'+esc(clResumoRt())+'</small><em>'+(off?'abrir ▾':'recolher ▴')+'</em>';
 if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}b.setAttribute('aria-expanded',String(!off));}
function clCulture(){var c=document.getElementById('lat-cv');if(!c)return;var hd=c.querySelector(':scope > header');if(!hd)return;
 if(!hd.dataset.cl){hd.dataset.cl=1;hd.classList.add('cl-hd');hd.setAttribute('role','button');hd.tabIndex=0;
  var t=function(){var off=!c.classList.contains('cl-off');c.classList.toggle('cl-off',off);clEstado('cv',off?1:0);};
  hd.addEventListener('click',t);hd.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t();}});
  var s=document.createElement('em');s.className='cl-seta';hd.appendChild(s);}
 c.classList.toggle('cl-off',!!clEstado('cv'));}
function clTudo(){try{clRotina();}catch(e){}try{clCulture();}catch(e){}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);clTudo();return x;};var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);clTudo();return x;};})();
setTimeout(clTudo,1400);setInterval(function(){try{clRotina();}catch(e){}},60000);

/* ======================= PAINEL DIREITO · padrão único e Sully em diálogo =======================
   Todas as abas (Enfermaria, Laptop, Bolsa de Dracmas, Bunker 9) ganham o mesmo cabeçalho do Laptop,
   a mesma cor de aba, os mesmos cartões, botões e campos. O Sully sai do painel e vira diálogo. */
(function(){for(var i=PD_ABAS.length-1;i>=0;i--)if(PD_ABAS[i][0]==='sat')PD_ABAS.splice(i,1);})();
var PD2_CAB={
 enf:['cuidados de filho de Apolo','Enfermaria','remédios, sono, água, movimento e refeições do ciclo'],
 lap:['painel de estudos','Laptop','tática, concurso, instruções e a Eumátheia, a estante de leitura'],
 fin:['tesouro do chalé','Bolsa de Dracmas','mês, previsão, planejamento e metas · exporte e importe a planilha'],
 b9:['a oficina dos projetos · o corvo vigia','Bunker 9','projetos com critério de conclusão, etapas e prazo']};
satAba=function(){var pd=document.getElementById('painel-dir');if(!pd)return;[].forEach.call(pd.querySelectorAll('[data-pd="sat"],[data-pane="sat"]'),function(n){n.remove();});};
function pd2Cab(){var pd=document.getElementById('painel-dir');if(!pd)return;
 [].forEach.call(pd.querySelectorAll('.pd-pane'),function(p){var k=p.getAttribute('data-pane');if(!PD2_CAB[k])return;p.classList.add('pd2');
  if(k==='lap'){var ec=p.querySelector('.eu-cab');if(ec)ec.classList.add('pd-cab');return;}
  var c=p.querySelector(':scope>.pd-cab');if(!c){c=document.createElement('header');c.className='eu-cab pd-cab';var t=PD2_CAB[k];
   c.innerHTML='<div><span class="eu-k">'+esc(t[0])+'</span><h2>'+esc(t[1])+'</h2><p>'+esc(t[2])+'</p></div>';p.insertBefore(c,p.firstChild);}
  else if(c!==p.firstElementChild)p.insertBefore(c,p.firstChild);});}
(function(){var m0=pdMonta;pdMonta=function(){var pd=m0.apply(this,arguments);try{satAba();pd2Cab();}catch(e){}return pd;};
 var a0=pdAbre;pdAbre=function(k){if(k==='sat'){satDlgAbre();return;}var x=a0.apply(this,arguments);try{pd2Cab();}catch(e){}return x;};})();
/* ---------- Sully em diálogo ---------- */
function satDlg(){var d=document.getElementById('sat-dlg');if(d)return d;
 d=document.createElement('dialog');d.id='sat-dlg';d.className='fc-dlg sat-dlg';d.setAttribute('aria-label','Sully · sátiro');
 d.innerHTML='<button type="button" class="fc-x" aria-label="Fechar">✕</button><div class="sat-dlg-c"></div>';document.body.appendChild(d);
 d.querySelector('.fc-x').onclick=function(){d.close();};d.addEventListener('click',function(e){if(e.target===d)d.close();});return d;}
function satDlgAbre(){var d=satDlg();satPinta();if(!d.open){try{d.showModal();}catch(e){d.setAttribute('open','');}}try{gabBusca(false);}catch(e){}}
satPinta=function(){var d=document.getElementById('sat-dlg'),p=d&&d.querySelector('.sat-dlg-c');if(!p||!d.open&&p.innerHTML)return;var a=document.activeElement;if(a&&p.contains(a)&&a.tagName==='INPUT')return;
 var h='<div id="sat-painel">'+satPainelHTML()+'</div>';if(p._h!==h||(h&&!p.firstChild)){p._h=h;var ds0=[].map.call(p.querySelectorAll('details'),function(x){return x.open;});p.innerHTML=h;[].forEach.call(p.querySelectorAll('details'),function(x,i){if(ds0[i])x.open=true;});}};
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;if(t.closest('[data-satir]')){e.preventDefault();e.stopImmediatePropagation();satDlgAbre();}},true);
setTimeout(function(){try{satAba();pd2Cab();}catch(e){}},1200);

/* ======================= ADEREÇOS HELÊNICOS no painel direito · Rastreados compactos ======================= */
/* Rastreados: a etiqueta do lugar entra dentro da célula do hábito (antes criava uma coluna a mais e desalinhava os dias) */
acAreas=function(){var w=document.getElementById('rt-w');if(!w||!S.hab)return;var nomes={};
 S.hab.forEach(function(h){var a=null;AREAS.forEach(function(r){if(!a&&r[0].test(h.nome||''))a=r[1];});if(a)nomes[(h.nome||'').trim()]=a;});
 [].forEach.call(w.querySelectorAll('tr>.ar-t'),function(x){x.remove();});
 [].forEach.call(w.querySelectorAll('td.h'),function(td){if(td.querySelector('.ar-t'))return;var t='';[].forEach.call(td.childNodes,function(n){if(n.nodeType===3)t+=n.textContent;});t=t.trim()||(td.textContent||'').trim();
  if(nomes[t]){var sp=document.createElement('span');sp.className='ar-t';sp.textContent=nomes[t];td.appendChild(sp);}});};
/* emblemas das abas */
var PD3_EMB={
 enf:'<path d="M12 3v18"/><path d="M9.2 6.5c3.6 0 5.8 1.3 5.8 2.8s-6 1.6-6 3.3 6 1.6 6 3.3-2.2 2.6-5.6 2.6"/><path d="M10 4.2h4"/>',
 lap:'<path d="M6 7.5l2.2 1.6M18 7.5l-2.2 1.6"/><path d="M6.2 9c-.6 6.6 2 11 5.8 11s6.4-4.4 5.8-11c-1.4-1.6-3.4-2.4-5.8-2.4S7.6 7.4 6.2 9z"/><circle cx="9.6" cy="11.4" r="1.8"/><circle cx="14.4" cy="11.4" r="1.8"/><path d="M11.2 14.2l.8 1 .8-1"/>',
 fin:'<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="6.6" stroke-dasharray="1.2 1.6"/><path d="M12 8.2l3.6 7.2H8.4z"/>',
 b9:'<path d="M4.5 13.5h11.5l-2.2 2.8H8.2z"/><path d="M9.5 16.3V19M13 16.3V19M7.5 19.5h8"/><path d="M13.4 3.6l4.6 4.6-1.9 1.9-4.6-4.6z"/><path d="M14.4 7.2L8 13.5"/>'};
var PD3_LETRA={enf:'Ε',lap:'Λ',fin:'Δ',b9:'Β'};
function pd3Svg(k,cls){return '<svg class="'+cls+'" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+PD3_EMB[k]+'</svg>';}
function pd3Orna(){var pd=document.getElementById('painel-dir');if(!pd)return;
 [].forEach.call(pd.querySelectorAll('.pd-pane .pd-cab'),function(c){var k=c.closest('.pd-pane').getAttribute('data-pane');if(!PD3_EMB[k]||c.querySelector('.pd-medal'))return;c.classList.add('pd3');
  var m=document.createElement('span');m.className='pd-medal';m.innerHTML=pd3Svg(k,'pd-medal-i')+'<em>'+PD3_LETRA[k]+'</em>';c.insertBefore(m,c.firstChild);
  var w=document.createElement('span');w.className='pd-marca';w.innerHTML=pd3Svg(k,'')+'<i class="pd-louro"></i>';c.appendChild(w);});}
(function(){var c0=pd2Cab;pd2Cab=function(){c0.apply(this,arguments);try{pd3Orna();}catch(e){}};})();
setTimeout(function(){try{pd3Orna();acAreas();}catch(e){}},1500);

/* ======================= COLUNA DIREITA NOVA · rodapé com o quadro · Agora no pé do índice =======================
   1. A faixa "Agora" vira o rodapé do painel esquerdo.
   2. O Quadro de avisos inteiro (Píthos, Fio de Ariadne, Rumo da Argo, Tabuinhas, Crônicas, Anais) desce para o rodapé expandido.
   3. A coluna direita vira o Templo das Tarefas: moldura grega com duas faces, Tarefas e Missões, ou Recreação. */
/* ---------- 1 · Agora no pé do painel esquerdo ---------- */
tdAgora=(function(f0){return function(){var r=f0.apply(this,arguments),b=document.getElementById('td-agora'),nav=document.getElementById('nav');
 var larga=true;try{larga=(typeof LAT_LARGA!=='undefined'&&LAT_LARGA.matches!=null)?LAT_LARGA.matches:innerWidth>900;}catch(e){}
 if(b&&nav&&larga&&nav.offsetWidth>0&&getComputedStyle(nav).display!=='none'){b.classList.remove('no-indice');b.classList.add('td-ag-pe');if(b.parentNode!==nav||nav.lastElementChild!==b)nav.appendChild(b);}
 else if(b&&b.classList.contains('td-ag-pe')){b.classList.remove('td-ag-pe');var ti=document.getElementById('tt-indice');if(ti){b.classList.add('no-indice');ti.appendChild(b);}}return r;};})(tdAgora);
window.addEventListener('resize',function(){try{tdAgora();}catch(e){}});
/* ---------- 2 · o Quadro de avisos no rodapé expandido ---------- */
function p4Rodape(){var cup=document.getElementById('c-h-cup'),ld=document.getElementById('lat-d'),corpo=document.getElementById('rod-corpo');if(!corpo)return;
 var box=document.getElementById('rod-quadro');if(!box){box=document.createElement('section');box.id='rod-quadro';box.className='rod-quadro';corpo.insertBefore(box,corpo.firstChild);}
 if(cup&&cup.parentNode!==box){box.appendChild(cup);cup.dataset.vxHidden='false';cup.classList.remove('meia');}
 if(ld&&ld.parentNode!==box)box.appendChild(ld);}
qaRail=function(){try{p4Rodape();p4Painel();}catch(e){console.error('rodapé:',e);}};
/* ---------- 3 · o Templo das Tarefas na coluna direita ---------- */
var P4_REC_CAT=[['games','games'],['rpg','RPG'],['serie','série'],['filme','filme'],['leitura','leitura'],['passeio','passeio']];
function p4Rec(){var o=opx();if(!Array.isArray(o.rec))o.rec=[];return o.rec;}
function p4Face(){try{return localStorage.getItem('astro_tm_face')==='rec'?'rec':'tm';}catch(e){return 'tm';}}
function p4Dias(d){var a=new Date(hoje()+'T12:00:00'),b=new Date(d+'T12:00:00');return Math.round((b-a)/864e5);}
function p4TmHTML(){var Q=mmD(),hj=hoje(),fe=Q.feitas[hj]||[],h='';
 var ch=Q.chale.filter(function(c){return !c.ok||c.ok===hj;});
 h+='<section class="tp-sec"><header><span class="tp-k">tarefas do chalé</span><em>'+Q.chale.filter(function(c){return !c.ok;}).length+' abertas</em></header><ul class="tp-l">'+
  (ch.length?ch.map(function(c){var ok=!!c.ok;return '<li class="'+(ok?'ok':'')+'"><button type="button" class="tp-ck" data-tpch="'+esc(c.id)+'" aria-pressed="'+ok+'" aria-label="concluir">'+(ok?'✓':'')+'</button><span>'+esc(c.t)+'</span><small>+3</small></li>';}).join(''):'<li class="tp-vz">nenhuma tarefa aberta</li>')+'</ul>'+
  '<div class="tp-add"><input data-tpnova maxlength="90" placeholder="nova tarefa do chalé"><button type="button" data-tpadd>incluir</button></div></section>';
 h+='<section class="tp-sec"><header><span class="tp-k">quests de hoje</span><em>'+fe.length+'/'+Q.dia.length+'</em></header><ul class="tp-l">'+
  (Q.dia.length?Q.dia.map(function(q){var ok=fe.indexOf(q.id)>=0;return '<li class="'+(ok?'ok':'')+'"><button type="button" class="tp-ck" data-tpq="'+esc(q.id)+'" aria-pressed="'+ok+'" aria-label="cumprir"'+(ok?' disabled':'')+'>'+(ok?'✓':'')+'</button><span>'+esc(q.t)+'</span><small>+5</small></li>';}).join(''):'<li class="tp-vz">nenhuma quest diária</li>')+'</ul></section>';
 var P=Q.prof.filter(function(p){return !p.ok;});
 h+='<section class="tp-sec"><header><span class="tp-k">grandes profecias</span><em>'+P.length+'</em></header>'+(P.length?P.map(function(p){var ps=p.passos||[],ok=ps.filter(function(x){return x.ok;}).length,d=p.prazo?p4Dias(p.prazo):null,pct=ps.length?Math.round(ok/ps.length*100):0,
   prox=ps.map(function(x,i){return {x:x,i:i};}).filter(function(o){return !o.x.ok;}).slice(0,3);
   return '<div class="tp-pf"><div class="tp-pf-h"><b>'+esc(p.t)+'</b>'+(d!=null?'<span class="tp-cd"><b>'+Math.max(0,d)+'</b><small>dias</small></span>':'')+'</div><i class="tp-bar"><em style="width:'+pct+'%"></em></i><small class="tp-pf-n">'+ok+' de '+ps.length+' etapas</small>'+
    (prox.length?'<ul class="tp-l">'+prox.map(function(o){return '<li><button type="button" class="tp-ck" data-tppf="'+esc(p.id)+':'+o.i+'" aria-label="etapa feita"></button><span>'+esc(o.x.t)+'</span><small>+10</small></li>';}).join('')+'</ul>':'')+'</div>';}).join(''):'<p class="tp-vz">nenhuma profecia aberta</p>')+'</section>';
 return h;}
function p4RecHTML(){var o=opx(),R=p4Rec(),M=(S.menu||[]),ate=o.lazerAte||0,agora=Date.now(),h='';
 h+='<section class="tp-sec tp-recreio"><header><span class="tp-k">recreio com hora para acabar</span></header>';
 if(ate>agora){var m=Math.ceil((ate-agora)/60000);h+='<div class="tp-rel"><b>'+m+' min</b><span>'+esc(o.lazerQue||'recreio')+' · acaba às '+new Date(ate).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+'</span><button type="button" data-tpfim>encerrar</button></div>';}
 else h+='<p class="tp-n">Escolha quanto tempo de lazer. No fim, o Hotel Lótus avisa e o recreio fecha.</p><div class="tp-tempos">'+[20,30,45,60,90].map(function(n){return '<button type="button" data-tprec="'+n+'">'+n+' min</button>';}).join('')+'</div>';
 h+='</section>';
 h+='<section class="tp-sec"><header><span class="tp-k">fila do lazer</span><em>'+R.filter(function(x){return !x.ok;}).length+'</em></header><ul class="tp-l">'+
  (R.length?R.map(function(x){var c=P4_REC_CAT.filter(function(k){return k[0]===x.cat;})[0];return '<li class="'+(x.ok?'ok':'')+'"><button type="button" class="tp-ck" data-tprecok="'+esc(x.id)+'" aria-pressed="'+!!x.ok+'" aria-label="feito">'+(x.ok?'✓':'')+'</button><span>'+esc(x.t)+'</span>'+(c?'<em class="tp-cat">'+c[1]+'</em>':'')+'<button type="button" class="tp-x" data-tprecx="'+esc(x.id)+'" aria-label="tirar">✕</button></li>';}).join(''):'<li class="tp-vz">games, séries, RPG, passeios: o que você quer curtir</li>')+'</ul>'+
  '<div class="tp-add"><input data-tprecnova maxlength="80" placeholder="o que entra na fila?"><select data-tpreccat aria-label="tipo">'+P4_REC_CAT.map(function(k){return '<option value="'+k[0]+'">'+k[1]+'</option>';}).join('')+'</select><button type="button" data-tprecadd>incluir</button></div></section>';
 h+='<section class="tp-sec"><header><span class="tp-k">menu de recarga</span><em>'+M.length+'</em></header><ul class="tp-l tp-menu">'+(M.length?M.map(function(m){return '<li><span>'+esc(m)+'</span><button type="button" data-tpmenu="'+esc(m)+'">recarregar 15 min</button></li>';}).join(''):'<li class="tp-vz">monte o menu de recarga na Casa Grande</li>')+'</ul></section>';
 return h;}
function p4PainelHTML(){var f=p4Face();
 return '<div class="tp-fr"><header class="tp-cab"><span class="tp-med">'+(f==='tm'?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19L19 5M15 5h4v4M5 15l4 4M3 17l4 4"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4M6 4h11l-2.5 4L17 12H6"/></svg>')+'</span>'+
  '<div><span class="tp-k">'+(f==='tm'?'mural do chalé 7':'hora livre do campista')+'</span><b>'+(f==='tm'?'Tarefas e Missões':'Recreação')+'</b></div></header>'+
  '<div class="tp-faces" role="tablist"><button type="button" role="tab" data-tpface="tm" aria-selected="'+(f==='tm')+'">Tarefas e Missões</button><button type="button" role="tab" data-tpface="rec" aria-selected="'+(f==='rec')+'">Recreação</button></div>'+
  '<div class="tp-corpo">'+(f==='tm'?p4TmHTML():p4RecHTML())+'</div></div>';}
function p4Painel(){var rail=document.getElementById('rail');if(!rail)return;var p=document.getElementById('tp-painel');
 if(!p){p=document.createElement('section');p.id='tp-painel';p.className='tp-painel';p4Liga(p);}
 if(p.parentNode!==rail||rail.firstElementChild!==p)rail.insertBefore(p,rail.firstChild);
 var a=document.activeElement;if(a&&p.contains(a)&&/INPUT|SELECT/.test(a.tagName))return;var h=p4PainelHTML();if(p._h!==h||(h&&!p.firstChild)){p._h=h;p.innerHTML=h;}}
function p4Repinta(){p4Painel();try{mmSalva();}catch(e){grava();}try{opPinta();}catch(e){}}
function p4Liga(p){
 p.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!p.contains(b))return;var d=b.dataset,Q=mmD(),hj=hoje(),o=opx();
  if(d.tpface){try{localStorage.setItem('astro_tm_face',d.tpface);}catch(z){}p._h='';p4Painel();return;}
  if(d.tpch){var c=Q.chale.filter(function(x){return x.id===d.tpch;})[0];if(c){if(c.ok)c.ok=false;else{c.ok=hj;try{op2XP(3,e);}catch(z){}}}p4Repinta();return;}
  if(d.tpq){var fe=Q.feitas[hj]=Q.feitas[hj]||[];if(fe.indexOf(d.tpq)<0){fe.push(d.tpq);try{op2XP(5,e);}catch(z){}}p4Repinta();return;}
  if(d.tppf){var pp=d.tppf.split(':'),pf=Q.prof.filter(function(x){return x.id===pp[0];})[0];if(pf&&pf.passos[+pp[1]]){pf.passos[+pp[1]].ok=true;try{op2XP(10,e);}catch(z){}}p4Repinta();return;}
  if(d.tpadd!=null){var i=p.querySelector('[data-tpnova]'),t=i&&i.value.trim();if(t){Q.chale.push({id:'c'+Date.now().toString(36),t:t.slice(0,90),ok:false});i.value='';p4Repinta();}return;}
  if(d.tprec){var n=+d.tprec,R=p4Rec(),pend=R.filter(function(x){return !x.ok;})[0];o.lazerAte=Date.now()+n*60000;o.lazerQue=pend?pend.t:'recreio';grava();p._h='';p4Painel();return;}
  if(d.tpfim!=null){o.lazerAte=0;grava();p._h='';p4Painel();return;}
  if(d.tprecok){var x=p4Rec().filter(function(y){return y.id===d.tprecok;})[0];if(x)x.ok=!x.ok;grava();p._h='';p4Painel();return;}
  if(d.tprecx){o.rec=p4Rec().filter(function(y){return y.id!==d.tprecx;});grava();p._h='';p4Painel();return;}
  if(d.tprecadd!=null){var ri=p.querySelector('[data-tprecnova]'),cs=p.querySelector('[data-tpreccat]'),rt=ri&&ri.value.trim();if(rt){p4Rec().push({id:'r'+Date.now().toString(36),t:rt.slice(0,80),cat:cs?cs.value:'games',ok:false});ri.value='';grava();p._h='';p4Painel();}return;}
  if(d.tpmenu){try{if(tdD().foco)tdFocoFim(true);tdFocoIni(15,'recarga · '+d.tpmenu,-1);tdD().foco.pausaModo=true;tdSalva();tdDisco(true);}catch(z){}return;}});
 p.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var t=e.target;if(t.dataset.tpnova!=null){e.preventDefault();var b=p.querySelector('[data-tpadd]');if(b)b.click();}else if(t.dataset.tprecnova!=null){e.preventDefault();var c=p.querySelector('[data-tprecadd]');if(c)c.click();}});}
/* o recreio acaba: aviso do Hotel Lótus */
setInterval(function(){try{var o=opx();if(o.lazerAte&&Date.now()>=o.lazerAte){o.lazerAte=0;grava();tdAvisa('Fechar o Hotel Lótus','o recreio acabou'+(o.lazerQue?' ('+o.lazerQue+')':'')+'. Água, levantar e voltar para a Bússola.');var p=document.getElementById('tp-painel');if(p){p._h='';}}p4Painel();}catch(e){}},20000);
setTimeout(function(){try{qaRail();tdAgora();}catch(e){}},900);
setTimeout(function(){try{qaRail();tdAgora();}catch(e){}},3000);
cerAbre=(function(c0){return function(x){var r=document.getElementById('rod-apps'),q=document.getElementById('rod-quadro');
 if(r&&q){if(x){r.classList.add('aberto');setTimeout(function(){try{q.scrollIntoView({block:'start',behavior:'smooth'});}catch(e){}},320);var i=document.getElementById('r-cap');if(i)try{i.focus({preventScroll:true});}catch(e){}}return;}
 return c0.apply(this,arguments);};})(cerAbre);


/* ======================= Bolsa de Dracmas sem fundo branco · Culture Vulture integrado ao Recreações =======================
   1. O AxisHub mora num shadow DOM com tema próprio (#f4f0e7); no modo claro, o fundo dele fica transparente
      e os cartões ganham o pergaminho do app.
   2. O Culture Vulture usava a classe .cv-card, que é a do balão do corvo (fundo branco, borda preta, layout lado a lado).
      Agora é um cartão .cg-c como os vizinhos, com resumo no cabeçalho, captura rápida e as listas secundárias em gavetas. */
var FIN_SOMBRA_CSS='\n:host(.claro) .axhtml,:host(.claro) .axbody{background:transparent!important}'+
 '\n:host(.claro) .axhtml{--bg:transparent;--paper:#f6eed8;--brass-soft:#efe2c2}';
function finSombra(){var c=document.body.classList.contains('claro');['ax-hub','ax-topo'].forEach(function(id){var h=document.getElementById(id);if(!h)return;h.classList.toggle('claro',c);
 var r=h.shadowRoot;if(r&&!r.getElementById('fin-sombra')){var st=document.createElement('style');st.id='fin-sombra';st.textContent=FIN_SOMBRA_CSS;r.appendChild(st);}});}
new MutationObserver(finSombra).observe(document.body,{attributes:true,attributeFilter:['class']});
setTimeout(finSombra,600);setTimeout(finSombra,2500);
(function(){var a0=pdAbre;pdAbre=function(){var r=a0.apply(this,arguments);try{finSombra();}catch(e){}return r;};})();

var CV_GRUPOS=['','Achados','Prazeres'];
function cvConta(D,k){return (D&&D[k]||[]).filter(function(x){return x&&String(x).trim();}).length;}
function cvAberto(si,v){var o={};try{o=JSON.parse(localStorage.getItem('astro_cv_gav')||'{}')||{};}catch(e){}if(v===undefined)return !!o[si];o[si]=v?1:0;try{localStorage.setItem('astro_cv_gav',JSON.stringify(o));}catch(e){}}
function cvResumo(){var D=cvD();if(!D)return '';var p=CV_SEC[0].c.map(function(c){return c[1]+' '+cvConta(D,c[0]);}).join(' · ');
 var resto=0;CV_SEC.slice(1).forEach(function(sec){if(sec.t==='cols')sec.c.forEach(function(c){resto+=cvConta(D,c[0]);});});
 return p+(resto?' · '+resto+' achado'+(resto>1?'s':'')+' e prazeres':'');}
cvHTML=function(){var D=cvD();if(!D)return '<p class="lat-n">Carregando a estante…</p>';
 var op='';CV_SEC.forEach(function(sec){if(sec.t==='cols')sec.c.forEach(function(c){op+='<option value="'+c[0]+'">'+c[1]+'</option>';});});
 var h='<form class="cv-cap" data-cvcap><input class="cv-cap-in" maxlength="140" placeholder="uma ideia que não pode evaporar: filme, livro, álbum, link…" aria-label="ideia para guardar"><select aria-label="onde guardar">'+op+'</select><button type="submit">guardar</button></form>';
 var gi=0;
 CV_SEC.forEach(function(sec,si){
  if(sec.t==='cols'){
   var cols='<div class="cv-cols">'+sec.c.map(function(c){var arr=D[c[0]]||[],li='',n=Math.min(sec.n,Math.max(arr.filter(Boolean).length+1,3));
     for(var i=0;i<n;i++)li+='<input class="cv-in" data-cv="'+c[0]+':'+i+'" value="'+esc(arr[i]||'')+'" placeholder="…">';
     return '<div class="cv-col"><span class="cv-k">'+c[1]+'<i>'+cvConta(D,c[0])+'</i></span>'+li+'</div>';}).join('')+'</div>';
   if(gi===0)h+=cols;
   else{var tot=sec.c.map(function(c){return c[1]+' '+cvConta(D,c[0]);}).join(' · ');
    h+='<details class="cv-mais" data-cvg="'+si+'"'+(cvAberto(si)?' open':'')+'><summary><b>'+CV_GRUPOS[gi]+'</b><span>'+esc(tot)+'</span></summary>'+cols+'</details>';}
   gi++;}
  else if(sec.t==='txt')h+='<label class="cv-tx"><span class="cv-k">'+sec.l+'</span><textarea data-cvt="'+sec.k+'" rows="2" placeholder="…">'+esc(D[sec.k]||'')+'</textarea></label>';
  else{var sel=D[sec.k]||[];h+='<div class="cv-ch"><span class="cv-k">'+sec.l+'</span>'+sec.o.map(function(o){return '<button type="button" class="'+(sel.indexOf(o)>=0?'on':'')+'" data-cvc="'+sec.k+':'+o+'">'+o+'</button>';}).join('')+'</div>';}});
 return h;};
function cvAjusta(){var c=document.getElementById('lat-cv');if(!c)return;
 if(c.classList.contains('cv-card')){c.classList.remove('cv-card');c.classList.add('cg-c','cv-rc');}
 if(!c.dataset.cvx){c.dataset.cvx=1;
  c.addEventListener('submit',function(e){var f=e.target.closest('[data-cvcap]');if(!f)return;e.preventDefault();var D=cvD();if(!D)return;
   var inp=f.querySelector('input'),v=(inp.value||'').trim(),k=f.querySelector('select').value;if(!v)return;
   var arr=(D[k]=D[k]||[]),i=arr.findIndex(function(x){return !x||!String(x).trim();});if(i<0)i=arr.length;arr[i]=v;
   try{AX.save();}catch(z){}var nome=f.querySelector('select').selectedOptions[0].textContent;inp.value='';
   var b=c.querySelector('#lat-cv-b');if(b){b.innerHTML=cvHTML();var ni=b.querySelector('.cv-cap-in'),ns=b.querySelector('.cv-cap select');if(ns)ns.value=k;if(ni)ni.focus();}
   cvAjustaCab();try{vxMsg('Guardado em '+nome+'. Não evapora mais.');}catch(z){}});
  c.addEventListener('toggle',function(e){var d=e.target;if(d&&d.dataset&&d.dataset.cvg)cvAberto(d.dataset.cvg,d.open);},true);
  c.addEventListener('input',function(){clearTimeout(c._cvt);c._cvt=setTimeout(cvAjustaCab,500);});}
 cvAjustaCab();}
function cvAjustaCab(){var c=document.getElementById('lat-cv');if(!c)return;var d=c.querySelector(':scope > header > div');if(!d)return;
 var sm=d.querySelector('.cv-res');if(!sm){sm=document.createElement('small');sm.className='cv-res';d.appendChild(sm);}var t=cvResumo();if(sm._t!==t||sm.textContent==='' ){sm.textContent=t;sm._t=t;}}
(function(){var c0=cvCard;cvCard=function(){var r=c0.apply(this,arguments);try{cvAjusta();}catch(e){}return r;};})();
(function(){var st=document.createElement('style');st.id='cv-rc-css';st.textContent=[
 '#recreio #lat-cv.cv-rc{display:block!important;background:#f4ead1!important;border:1px solid #d6c69c!important;border-radius:10px!important;padding:10px 12px!important;box-shadow:none!important;animation:none!important;color:inherit}',
 '#lat-cv.cv-rc>header{display:flex!important;align-items:center;gap:10px;margin:0}',
 '#lat-cv.cv-rc>header>div{flex:1;min-width:0}',
 '#lat-cv.cv-rc .cv-res{display:block;margin-top:2px;font:12px Georgia,serif;color:#7a6047;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#lat-cv.cv-rc>.lat-b{margin-top:10px;padding-top:10px;border-top:1px dashed #c9b28a}',
 '#lat-cv.cv-rc .cv-cap{display:flex;gap:6px;margin:0 0 12px}',
 '#lat-cv.cv-rc .cv-cap input{flex:1;min-width:0;height:34px;box-sizing:border-box;border:1px solid #c9b28a;border-radius:8px;background:#fbf3df;padding:0 10px;font:14px Georgia,serif;color:#3b2a1d}',
 '#lat-cv.cv-rc .cv-cap select{width:auto;height:34px;border:1px solid #c9b28a;border-radius:8px;background:#fbf3df;font:13px Georgia,serif;color:#5a3f2c;padding:0 6px}',
 '#lat-cv.cv-rc .cv-cap button{width:auto!important;margin:0!important;height:34px;padding:0 14px!important;border:1px solid #9a6b3a!important;border-radius:8px!important;background:#e9c87a!important;color:#3b2a1d!important;font:700 9px var(--mono,monospace)!important;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}',
 '#lat-cv.cv-rc .cv-k{display:flex;align-items:center;gap:6px}',
 '#lat-cv.cv-rc .cv-k i{font-style:normal;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#e9dcb8;color:#7a5a32;font:700 9px var(--mono,monospace);display:inline-grid;place-items:center;letter-spacing:0}',
 '#lat-cv.cv-rc details.cv-mais{margin:0 0 10px;padding-bottom:4px;border-bottom:1px dashed #c9b28a}',
 '#lat-cv.cv-rc details.cv-mais>summary{list-style:none;cursor:pointer;display:flex;align-items:baseline;gap:10px;padding:4px 0}',
 '#lat-cv.cv-rc details.cv-mais>summary::-webkit-details-marker{display:none}',
 '#lat-cv.cv-rc details.cv-mais>summary b{font:700 9px var(--mono,monospace);letter-spacing:.18em;text-transform:uppercase;color:#9a6b3a}',
 '#lat-cv.cv-rc details.cv-mais>summary span{flex:1;font:12px Georgia,serif;color:#7a6047}',
 '#lat-cv.cv-rc details.cv-mais>summary::after{content:"abrir ▾";font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#5a3f2c}',
 '#lat-cv.cv-rc details.cv-mais[open]>summary::after{content:"recolher ▴"}',
 '#lat-cv.cv-rc details.cv-mais .cv-cols{margin:8px 0 6px;padding-bottom:0;border-bottom:0}',
 '@media(max-width:800px){#lat-cv.cv-rc .cv-cap{flex-wrap:wrap}#lat-cv.cv-rc .cv-cap input{flex-basis:100%}}'
].join('\n');document.head.appendChild(st);})();
setTimeout(function(){try{cvCard();}catch(e){}},1600);


/* ======================= Templo das Tarefas com o teor inteiro · sem selos numerados =======================
   A coluna direita mostrava um resumo próprio. Agora as seções de verdade, Tarefas e Missões (#tm-painel)
   e Recreações (#recreio), mudam para dentro do templo e saem da coluna do meio; as faces só trocam qual aparece.
   O templo reescreve o próprio HTML: as seções saem antes de cada redesenho e voltam logo depois, para não se perderem.
   O selo [01] [02] [03] dos títulos (contador CSS de h2.sec) sai: a ordem antiga dos painéis já não existe. */
var TP_REAL=null;
function tpRealBox(){if(!TP_REAL){TP_REAL=document.getElementById('tp-real');if(!TP_REAL){TP_REAL=document.createElement('div');TP_REAL.id='tp-real';TP_REAL.className='tp-real';}}return TP_REAL;}
function tpReal(){var p=document.getElementById('tp-painel');if(!p)return;var fr=p.querySelector('.tp-fr');if(!fr)return;var box=tpRealBox();
 if(box.parentNode!==fr)fr.appendChild(box);
 var tm=document.getElementById('tm-painel'),rc=document.getElementById('recreio');
 if(tm&&tm.parentNode!==box)box.insertBefore(tm,box.firstChild);
 if(rc&&rc.parentNode!==box){if(tm&&tm.parentNode===box)tm.insertAdjacentElement('afterend',rc);else box.appendChild(rc);}
 box.dataset.face=p4Face();}
(function(){var p0=p4Painel;p4Painel=function(){var box=tpRealBox();if(box.parentNode)box.parentNode.removeChild(box);
 var r;try{r=p0.apply(this,arguments);}finally{try{tpReal();}catch(e){}}return r;};})();
p4TmHTML=function(){return '';};
(function(){var r0=p4RecHTML;p4RecHTML=function(){var h=r0.apply(this,arguments),i=h.indexOf('<section class="tp-sec"><header><span class="tp-k">menu de recarga');return i>=0?h.slice(0,i):h;};})();
(function(){var r0=reorgRecreio;reorgRecreio=function(){var x=r0.apply(this,arguments);try{tpReal();}catch(e){}return x;};})();
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{tpReal();}catch(e){}return x;};})();
setTimeout(function(){try{var p=document.getElementById('tp-painel');if(p)p._h='';p4Painel();}catch(e){}},1000);
setTimeout(function(){try{tpReal();}catch(e){}},3200);
(function(){var st=document.createElement('style');st.id='tp-real-css';st.textContent=[
 'h2.sec::before{content:none!important;display:none!important}',
 '#tp-painel .tp-corpo:empty{display:none}',
 '#tp-real{display:block;margin-top:12px}',
 /* a seção leva a própria construção grega (entablamento, colunas, placa); o templo só cede espaço */
 '#tp-painel:has(#tp-real) .tp-fr{padding-left:8px!important;padding-right:8px!important;background:linear-gradient(180deg,#f7eed8,#f1e4c6)!important}',
 '#tp-painel:has(#tp-real) .tp-cab,#tp-painel:has(#tp-real) .tp-faces{margin-left:12px;margin-right:12px}',
 '#tp-real>:is(#tm-painel,#recreio){margin:0!important;width:auto!important;max-width:none!important;min-height:0!important;padding-left:40px!important;padding-right:40px!important}',
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab .k9{display:none!important}',
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab{max-width:calc(100% - 40px)!important;justify-content:center}',
 '#tp-real[data-face="tm"]>#recreio,#tp-real[data-face="rec"]>#tm-painel{display:none!important}',
 '#tp-real[data-face="tm"]>#tm-painel,#tp-real[data-face="rec"]>#recreio{display:block!important}',
 '#tp-real :is(.tm-r,.rc-g){display:flex!important;flex-direction:column!important;gap:12px!important;grid-template-columns:1fr!important}',
 '#tp-real .tm-lb{margin:14px 0 8px!important}',
 '#tp-real .rc-g>*{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box}',
 '#tp-real .rc-g .lat-c{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box}',
 '#tp-real .mm-h{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:6px!important;grid-template-columns:1fr!important}',
 '#tp-real .mm-h>*{max-width:none!important;width:auto!important}',
 '#tp-real .mm-g{display:flex!important;flex-direction:column!important;gap:12px!important;grid-template-columns:1fr!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Oráculo no Mural · faixa vertical do dia =======================
   1. Missões do Oráculo: as três prioridades do dia (plDia().top, a primeira é a flecha de ouro) ganham coluna no Mural.
   2. Entre a coluna do meio e o Templo das Tarefas, uma faixa vertical com a linha do dia (06h–24h): blocos da Grade,
      toques da Concha, a hora das harpias e o "agora". No alto, o cartão Manhã · antes das atividades; no pé,
      Noite · antes do recolher (os mesmos checklists da Inspeção dos Chalés). */
var OR_PH=['a primeira · flecha de ouro','a segunda','a terceira'];
mmHTML=(function(f0){return function(){var h=f0.apply(this,arguments),x=plDia(hoje()),
 li=x.top.slice(0,3).map(function(t,i){var ok=!!t.ok,tx=(t.t||'').trim();return '<li class="'+(ok?'ok':'')+'"><button type="button" class="mm-ck" data-mmor="'+i+'" aria-label="cumprida"'+(tx?'':' disabled')+'>'+(ok?'✓':'')+'</button><input class="mm-or-in" data-mmorx="'+i+'" value="'+esc(tx)+'" placeholder="'+OR_PH[i]+'" maxlength="90" aria-label="missão '+(i+1)+'"></li>';}).join('');
 var sec='<section class="mm-col mm-orac-col"><span class="mm-k">Oráculo</span><small>missões · as três do dia · a primeira é a flecha de ouro · +5 XP</small><ul class="mm-or">'+li+'</ul><small class="mm-cont">'+x.top.slice(0,3).filter(function(t){return t.ok;}).length+' de 3 cumpridas hoje</small></section>';
 var k=h.indexOf('<section class="mm-col mm-prof">');h=k>=0?h.slice(0,k)+sec+h.slice(k):h;
 var fim=h.lastIndexOf('</div>');var grp='<div class="tm-lb mm-grp mm-grp-t" tabindex="0">tarefas<b class="mm-q" aria-hidden="true">?</b><i class="mm-dica" role="tooltip"><b>Tarefas</b>: Chalé (casa, uma vez), Diárias (voltam todo dia) e Conselho (designações do gabinete).</i></div><div class="tm-lb mm-grp mm-grp-m" tabindex="0">missões<b class="mm-q" aria-hidden="true">?</b><i class="mm-dica" role="tooltip"><b>Missões</b>: o Oráculo, as três do dia. A primeira é a flecha de ouro.</i></div><div class="tm-lb mm-grp mm-grp-d" tabindex="0">desafio<b class="mm-q" aria-hidden="true">?</b><i class="mm-dica" role="tooltip"><b>Desafio</b>: a Profecia, alvo longo com prazo e etapas.</i></div>';
 return fim>=0?h.slice(0,fim)+grp+h.slice(fim):h+grp;};})(mmHTML);
document.addEventListener('click',function(e){var b=e.target.closest('[data-mmor]');if(!b)return;var x=plDia(hoje()),t=x.top[+b.dataset.mmor];if(!t||!(t.t||'').trim())return;t.ok=!t.ok;try{grava();}catch(z){}try{vxRender();}catch(z){}try{mmPinta();}catch(z){}try{diaPinta();}catch(z){}});
document.addEventListener('change',function(e){var i=e.target.closest('[data-mmorx]');if(!i)return;var x=plDia(hoje()),t=x.top[+i.dataset.mmorx];if(!t)return;t.t=i.value.trim().slice(0,90);if(!t.t)t.ok=false;try{grava();}catch(z){}try{mmPinta();}catch(z){}});

var DIA_INI=360,DIA_FIM=1440,DIA_W=62;
function diaPct(m){return Math.max(0,Math.min(100,(m-DIA_INI)/(DIA_FIM-DIA_INI)*100));}
function diaHM(m){return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function diaAtivo(){var r=document.getElementById('rail');if(!r)return false;var c=getComputedStyle(r);return c.display!=='none'&&c.position==='fixed'&&r.offsetWidth>200&&innerWidth>=1100;}
function diaContagem(){var P=rtInsp();return {m:RT_MANHA.filter(function(x){return P.manha[x[0]];}).length,n:PL_FIM.filter(function(x){return P.fim[x[0]];}).length};}
function diaHTML(){var hj=hoje(),tb=S.tb||{},a=opMin(),c=diaContagem(),R=rtD(),h='';
 h+='<button type="button" class="df-cap df-m'+(c.m===RT_MANHA.length?' ok':'')+'" data-dfcard="m" aria-label="Inspeção dos Chalés · manhã, antes das atividades" title="Inspeção dos Chalés · manhã, antes das atividades">'+
  RT_IC.insp+'<b>Inspeção</b><i>'+c.m+'/'+RT_MANHA.length+'</i></button>';
 h+='<div class="df-trilho">';
 TD_H.forEach(function(H){var m0=+H*60,m1=Math.min(m0+180,DIA_FIM),cor=OP_FX_COR[H]||['#eee','#333'],txt=(tb[hj+'|'+H]||'').trim(),st=a>=m1?' passou':(a>=m0?' atual':'');
  h+='<div class="df-seg'+st+'" style="top:'+diaPct(m0)+'%;height:'+(diaPct(m1)-diaPct(m0))+'%;--b:'+cor[0]+';--t:'+cor[1]+'" title="'+esc(H+'–'+(+H+3)+'h · '+tdFaixaNome(H)+(txt?' · '+txt:''))+'"><span>'+esc(tdFaixaNome(H))+'</span></div>';});
 for(var hh=6;hh<=24;hh+=3)h+='<i class="df-h" style="top:'+diaPct(hh*60)+'%">'+String(hh).padStart(2,'0')+'</i>';
 (R.toques||[]).forEach(function(t){if(!t.on)return;var m=rtMin(t.h);if(m<DIA_INI)return;h+='<em class="df-toq'+(a>=m?' foi':'')+'" style="top:'+diaPct(m)+'%" title="'+esc(t.h+' · '+t.n)+'"></em>';});
 var lim=rtMin(R.limite);if(lim>=DIA_INI)h+='<em class="df-lim" style="top:'+diaPct(lim)+'%" title="'+esc(R.limite+' · as harpias começam a ronda')+'"></em>';
 if(a>=DIA_INI&&a<=DIA_FIM)h+='<div class="df-agora" style="top:'+diaPct(a)+'%"><b>'+diaHM(a)+'</b></div>';
 h+='</div>';
 h+='<button type="button" class="df-cap df-n'+(c.n===PL_FIM.length?' ok':'')+'" data-dfcard="n" aria-label="Ronda das Harpias · noite, antes do recolher" title="Ronda das Harpias · noite, antes do recolher">'+
  RT_IC.harpia+'<b>Ronda</b><i>'+c.n+'/'+PL_FIM.length+'</i></button>';
 return h;}
function diaCardHTML(k){var P=rtInsp(),arr=k==='m'?RT_MANHA:PL_FIM,obj=k==='m'?P.manha:P.fim,n=arr.filter(function(x){return obj[x[0]];}).length;
 return '<header><div><span class="df-k">'+(k==='m'?'manhã · antes das atividades':'noite · antes do recolher · harpias às '+esc(rtD().limite))+'</span><b>'+(k==='m'?'Inspeção dos Chalés':'Ronda das Harpias')+'</b></div><em>'+n+'/'+arr.length+'</em><button type="button" class="df-x" data-dfx aria-label="fechar">✕</button></header>'+
  '<ul>'+arr.map(function(x){var ok=!!obj[x[0]];return '<li class="'+(ok?'ok':'')+'"><button type="button" class="mm-ck" data-dfck="'+k+':'+x[0]+'" aria-pressed="'+ok+'">'+(ok?'✓':'')+'</button><span>'+esc(x[1])+'</span></li>';}).join('')+'</ul>'+
  '<p>'+(n===arr.length?(k==='m'?'Manhã aprovada. O chalé 7 pode sair para as atividades.':'Pronto para o recolher. Boa noite, campista.'):(k==='m'?'Feche a lista antes do primeiro bloco.':'Feche a lista antes do toque de recolher.'))+'</p>';}
var DIA_ABERTO='';
function diaPinta(){var f=document.getElementById('dia-faixa'),on=diaAtivo();document.body.classList.toggle('com-dia',on);
 if(!on){if(f)f.hidden=true;diaFecha();return;}
 var r=document.getElementById('rail');document.body.style.setProperty('--dia-r',r.offsetWidth+'px');
 var baixo=diaBaixo();
 if(!f){f=document.createElement('aside');f.id='dia-faixa';f.setAttribute('aria-label','Linha do dia');document.body.appendChild(f);
  f.addEventListener('click',function(e){var b=e.target.closest('[data-dfcard]');if(b){var k=b.dataset.dfcard;if(DIA_ABERTO===k)diaFecha();else diaAbre(k);}});}
 f.hidden=false;f.style.bottom=baixo+'px';var h=diaHTML();if(f._h!==h||(h&&!f.firstChild)){f._h=h;f.innerHTML=h;}
 if(DIA_ABERTO)diaAbre(DIA_ABERTO,true);}
function diaAbre(k,so){var p=document.getElementById('df-pop');
 if(!p){p=document.createElement('div');p.id='df-pop';p.className='df-pop';p.setAttribute('role','dialog');document.body.appendChild(p);
  p.addEventListener('click',function(e){if(e.target.closest('[data-dfx]')){diaFecha();return;}var b=e.target.closest('[data-dfck]');if(!b)return;var q=b.dataset.dfck.split(':'),P=rtInsp();
   if(q[0]==='m'){P.manha[q[1]]=!P.manha[q[1]];if(RT_MANHA.every(function(x){return P.manha[x[0]];}))try{acLouros('Inspeção da manhã','chalé 7 em ordem');}catch(z){}}
   else{P.fim[q[1]]=!P.fim[q[1]];if(PL_FIM.every(function(x){return P.fim[x[0]];}))try{acLouros('Inspeção da noite','pronto para o recolher');}catch(z){}}
   try{grava();}catch(z){}try{var rb=document.getElementById('rt-box');if(rb)rb.innerHTML=rtHTML();}catch(z){}try{vxRender();}catch(z){}diaPinta();});}
 DIA_ABERTO=k;p.dataset.k=k;var h=diaCardHTML(k);if(p._h!==h||(h&&!p.firstChild)){p._h=h;p.innerHTML=h;}p.hidden=false;
 var f=document.getElementById('dia-faixa');if(f){var fr=f.getBoundingClientRect();p.style.right=(innerWidth-fr.left+8)+'px';
  if(k==='m'){p.style.top=(fr.top+8)+'px';p.style.bottom='';}else{p.style.bottom=(innerHeight-fr.bottom+8)+'px';p.style.top='';}}
 Array.prototype.forEach.call(document.querySelectorAll('#dia-faixa [data-dfcard]'),function(b){b.setAttribute('aria-expanded',String(b.dataset.dfcard===k));});
 if(!so){var c=p.querySelector('.mm-ck');if(c)try{c.focus({preventScroll:true});}catch(z){}}}
function diaFecha(){DIA_ABERTO='';var p=document.getElementById('df-pop');if(p)p.hidden=true;
 Array.prototype.forEach.call(document.querySelectorAll('#dia-faixa [data-dfcard]'),function(b){b.setAttribute('aria-expanded','false');});}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&DIA_ABERTO)diaFecha();});
document.addEventListener('pointerdown',function(e){if(!DIA_ABERTO)return;if(e.target.closest('#df-pop,#dia-faixa'))return;diaFecha();});
window.addEventListener('resize',function(){try{diaPinta();}catch(e){}});
setInterval(function(){try{diaPinta();}catch(e){}},30000);
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{diaPinta();}catch(e){}return x;};})();
setTimeout(function(){try{diaPinta();}catch(e){}},1500);setTimeout(function(){try{diaPinta();}catch(e){}},4000);
(function(){var st=document.createElement('style');st.id='dia-css';st.textContent=[
 'body.com-dia .wrap{margin-right:calc(var(--dia-r,390px) + '+DIA_W+'px)!important}',
 'body.com-dia #fer-w{right:calc(var(--dia-r,390px) + '+(DIA_W+14)+'px)!important}',
 '#dia-faixa{position:fixed;top:0;right:var(--dia-r,390px);width:'+DIA_W+'px;z-index:40;display:flex;flex-direction:column;gap:6px;padding:8px 6px;box-sizing:border-box;',
 ' background:linear-gradient(180deg,#f3e8cc,#ecdcb6);border-left:1px solid #c9b28a;border-right:1px solid #c9b28a;box-shadow:inset 0 0 0 3px #f6eed8,inset 0 0 0 4px #d8c39a}',
 '#dia-faixa[hidden]{display:none}',
 '#dia-faixa .df-cap{flex:none;width:100%!important;margin:0!important;padding:6px 2px!important;display:flex;flex-direction:column;align-items:center;gap:2px;border:1px solid #9a6b3a!important;border-radius:8px!important;background:#fbf3df!important;color:#5a3f2c!important;cursor:pointer}',
 '#dia-faixa .df-cap svg{width:20px;height:20px;fill:none;stroke:#9a6b3a;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}',
 '#dia-faixa .df-cap b{font:400 11px Georgia,serif;font-variant:small-caps;letter-spacing:.04em;color:#2a2418}',
 '#dia-faixa .df-cap i{font:700 9px var(--mono,monospace);font-style:normal;color:#8a6f55}',
 '#dia-faixa .df-cap.ok{background:#eef3e2!important;border-color:#7d9a55!important}#dia-faixa .df-cap.ok i{color:#4f7a35}',
 '#dia-faixa .df-cap[aria-expanded="true"]{background:#e9c87a!important}',
 '#dia-faixa .df-trilho{position:relative;flex:1;min-height:200px;margin:4px 0 4px 16px;border-left:2px solid #b89c72}',
 '#dia-faixa .df-seg{position:absolute;left:3px;right:0;box-sizing:border-box;border-radius:5px;background:var(--b);border:1px solid rgba(0,0,0,.06);overflow:hidden;display:flex;align-items:center;justify-content:center}',
 '#dia-faixa .df-seg span{writing-mode:vertical-rl;transform:rotate(180deg);font:700 8px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:var(--t);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-height:100%}',
 '#dia-faixa .df-seg.passou{opacity:.42}#dia-faixa .df-seg.atual{box-shadow:0 0 0 2px #9a6b3a}',
 '#dia-faixa .df-h{position:absolute;left:-17px;transform:translateY(-50%);font:700 7.5px var(--mono,monospace);font-style:normal;color:#8a6f55;letter-spacing:0}',
 '#dia-faixa .df-toq{position:absolute;left:-5px;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:#fbf3df;border:1.5px solid #9a6b3a;z-index:2}',
 '#dia-faixa .df-toq.foi{background:#9a6b3a}',
 '#dia-faixa .df-lim{position:absolute;left:-6px;right:-2px;height:0;border-top:2px dashed #5a3f8a;z-index:2}',
 '#dia-faixa .df-agora{position:absolute;left:-8px;right:-4px;height:0;border-top:2px solid #b4463a;z-index:3}',
 '#dia-faixa .df-agora::before{content:"";position:absolute;left:-3px;top:-5px;width:8px;height:8px;border-radius:50%;background:#b4463a}',
 '#dia-faixa .df-agora b{position:absolute;right:0;top:-15px;padding:0 3px;border-radius:3px;background:#b4463a;color:#fff;font:700 8.5px var(--mono,monospace)}',
 '.df-pop{position:fixed;z-index:60;width:290px;padding:12px 14px;border:1px solid #9a6b3a;border-radius:10px;background:#f7eed8;box-shadow:0 14px 34px rgba(60,40,15,.28),inset 0 0 0 3px #f7eed8,inset 0 0 0 4px #d8c39a;color:#2a2418}',
 '.df-pop[hidden]{display:none}',
 '.df-pop header{display:flex;align-items:flex-start;gap:8px;padding-bottom:8px;border-bottom:1px dashed #c9a45a}',
 '.df-pop header>div{flex:1;min-width:0}.df-pop .df-k{display:block;font:700 8.5px var(--mono,monospace);letter-spacing:.18em;text-transform:uppercase;color:#9a6b3a}',
 '.df-pop header b{display:block;font:400 16px Georgia,serif;font-variant:small-caps;letter-spacing:.03em}',
 '.df-pop header em{font:700 11px var(--mono,monospace);font-style:normal;color:#5a3f2c;border:1px solid #c9a45a;border-radius:999px;padding:1px 7px;background:#fbf5e6}',
 '.df-pop .df-x{width:auto!important;margin:0!important;padding:0 4px!important;border:0!important;background:none!important;color:#8a6f55!important;cursor:pointer}',
 '.df-pop ul{list-style:none;margin:8px 0;padding:0;display:flex;flex-direction:column;gap:5px}',
 '.df-pop li{display:flex;align-items:center;gap:8px;padding:5px 8px;border:1px solid #d8c39a;border-radius:7px;background:#fbf5e6;font:13.5px Georgia,serif}',
 '.df-pop li.ok{background:#eef3e2;border-color:#b8cc94}.df-pop li.ok span{color:#5f6e48;text-decoration:line-through;text-decoration-color:rgba(95,110,72,.5)}',
 '.df-pop .mm-ck{flex:none;width:20px!important;height:20px!important;margin:0!important;padding:0!important;border:1.5px solid #9a6b3a!important;border-radius:50%!important;background:#fffaf0!important;color:#fff!important;font:700 11px/1 sans-serif!important;cursor:pointer;display:grid;place-items:center}',
 '.df-pop .mm-ck[aria-pressed="true"]{background:#5f8a3f!important;border-color:#5f8a3f!important}',
 '.df-pop p{margin:0;font:italic 12.5px Georgia,serif;color:#6b5140}',
 '.mm-or{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}',
 '.mm-or li{display:flex;align-items:center;gap:7px}',
 '.mm-or .mm-or-in{flex:1;min-width:0;height:30px;box-sizing:border-box;padding:0 8px;border:1px solid #c9b28a;border-radius:7px;background:#fffaf0;font:13.5px Georgia,serif;color:#2a2418}',
 '.mm-or li:first-child .mm-or-in{border-color:#c9a227;box-shadow:inset 3px 0 0 #c9a227}',
 '.mm-or li.ok .mm-or-in{background:#eef3e2;color:#5f6e48;text-decoration:line-through}'
].join('\n');document.head.appendChild(st);})();



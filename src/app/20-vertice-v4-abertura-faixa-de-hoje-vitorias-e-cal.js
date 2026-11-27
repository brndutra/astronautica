/* ===== Vértice v4 · abertura, faixa de hoje, vitórias e calibração do tempo =====
   Lê e grava na mesma base (S). Nada antigo é apagado. */
var V4_ROT=["","colapso","baixo","neutro","bom","pico"];
var V4_TETO=[0,0.25,0.5,0.75,1,1];
var V4_FAIXA={"06":["fundo","rota"],"09":["fundo","rota"],"12":["varredura","lâminas"],"15":["varredura","lâminas"],"18":["reentrada","aterrar e fechar"],"21":["reentrada","aterrar e fechar"]};
/* horário do acampamento nas faixas do dia */
V4_FAIXA={"06":["alvorada","alvorada e treino leve"],"09":["treino na arena","treino na arena"],"12":["almoço no pavilhão","almoço no pavilhão"],"15":["atividades","atividades do acampamento"],"18":["jantar","jantar e oferenda à fogueira"],"21":["fogueira","fogueira e toque de recolher"]};
var v4Lam=0;
function v4Leitura(){ return (S.estado&&S.estado[hoje()])|0; }
function v4Teto(){ var k=v4Leitura(); return k?Math.round(vxData().capacity*V4_TETO[k]):vxData().capacity; }
function v4Real(id){ return Math.round(vxData().sessions.filter(function(s){return s.task===id;}).reduce(function(a,s){return a+(s.minutes||0);},0)); }
function v4Lamina(){
 var L=todas().filter(function(f){return f.e==="baixa"&&!S.fichas[f.id];});
 if(!L.length) L=todas().filter(function(f){return !S.fichas[f.id];});
 if(!L.length) return null;
 return L[v4Lam%L.length];
}
function v4CheckHTML(){
 var k=v4Leitura(), h='<div class="vx-card v4-chk'+(k?'':' v4-aberta')+'" id="v4-chk">';
 if(!k){
  h+='<span class="vx-k">Leitura de abertura</span><h3>Como chega a corrente hoje?</h3>'+
     '<p class="vx-muted">Um toque. A leitura decide o teto de foco e o ramo que a tela propõe.</p><div class="v4-es">';
  for(var i=1;i<=5;i++) h+='<button data-v4es="'+i+'"><b>'+i+'</b>'+V4_ROT[i]+'</button>';
  return h+'</div></div>';
 }
 h+='<div class="vx-top"><span class="vx-k">Leitura de abertura · '+k+'/5 · '+V4_ROT[k]+'</span><button data-v4es="0" class="v4-mini">refazer leitura</button></div>';
 h+='<p class="v4-teto">Teto de foco hoje: <b>'+v4Teto()+' min</b><span class="vx-muted"> · '+vxMinutes().toFixed(0)+' já usados</span></p>';
 if(k<=2){
  var f=v4Lamina();
  h+='<p><b>Dia de lâmina.</b> A rota pode esperar. O ramo de hoje é uma ficha de baixa energia, com o pensamento já feito:</p>';
  if(f){
   h+='<div class="v4-lam"><div class="vx-row"><span class="vx-tag">'+f.t+' min</span><b>'+f.h+'</b></div><ol>';
   for(var j=0;j<f.s.length;j++) h+='<li>'+f.s[j]+'</li>';
   h+='</ol><div class="vx-row"><button class="vx-primary" data-v4liq="'+f.id+'">Liquidar lâmina</button><button data-v4troca>outra lâmina</button></div></div>';
  } else h+='<p class="vx-muted">Baralho todo liquidado. Aterramento conta como avanço hoje.</p>';
 } else if(k===5){
  h+='<p><b>Pico.</b> A combustão não avisa. Decida agora onde para: o teto acima é o limite externo deste ciclo.</p>';
 } else {
  h+='<p><b>Dia de rota.</b> Siga o alvo abaixo, um bloco por vez.'+'</p>';
 }
 return h+'</div>';
}
function v4FaixaHTML(){
 var d=new Date(), hr=d.getHours(), H=["06","09","12","15","18","21"], at=null, i;
 for(i=0;i<H.length;i++){ var a=+H[i]; if(hr>=a&&hr<a+3) at=H[i]; }
 var h='<div class="vx-card v4-hoje"><div class="vx-top"><span class="vx-k">Faixa de hoje</span><button data-v4sem class="v4-mini">editar na Semana</button></div><div class="v4-slots">';
 for(i=0;i<H.length;i++){
  var t=(S.tb||{})[hoje()+"|"+H[i]]||"", F=V4_FAIXA[H[i]], cls="v4-s fx-"+H[i]+(H[i]===at?" agora":"")+((at&&H[i]<at)?" foi":"");
  h+='<div class="'+cls+'"><span class="v4-h">'+H[i]+'h</span><span class="v4-t">'+(t?esc(t):'<i>'+F[1]+'</i>')+'</span>'+(H[i]===at?'<span class="v4-ag">agora</span>':'')+'</div>';
 }
 h+='</div>';
 if(at){ var fim=new Date(d); fim.setHours(+at+3,0,0,0); var m=Math.max(0,Math.round((fim-d)/60000)), pct=Math.round((180-m)/180*100);
  h+='<div class="v4-bar"><i style="width:'+pct+'%"></i></div><p class="vx-muted">Faixa de '+V4_FAIXA[at][0]+' · restam <b>'+Math.floor(m/60)+'h'+String(m%60).padStart(2,"0")+'</b> até as '+String((+at+3)%24).padStart(2,"0")+'h.</p>'; }
 else h+='<p class="vx-muted">Fora das faixas. O ciclo está em repouso.</p>';
 return h+'</div>';
}
function v4VitHTML(){
 var v=vxData(), d=hoje(), L=[], i;
 v.sessions.forEach(function(s){ if(s.day===d&&s.result) L.push('Bloco de '+Math.round(s.minutes)+' min: '+esc(s.result)); });
 v.tasks.forEach(function(t){ if(t.completed===d) L.push('Entrega concluída: '+esc(t.title)); });
 (S.hab||[]).forEach(function(x){ if((x.hist||[]).indexOf(d)>=0) L.push('Hábito: '+esc(x.nome)); });
 todas().forEach(function(f){ if(S.fichas[f.id]===d) L.push('Lâmina: '+f.h); });
 var h='<div class="vx-card v4-vit"><h3>Conquistas do Dia</h3>';
 if(!L.length) return h+'<p class="vx-muted">Nenhuma ainda. A primeira aparece aqui sozinha, sem você anotar.</p></div>';
 h+='<ul>'; for(i=0;i<Math.min(L.length,12);i++) h+='<li>'+L[i]+'</li>';
 return h+'</ul>'+(L.length>12?'<p class="vx-muted">e mais '+(L.length-12)+'.</p>':'')+'</div>';
}
function v4Calib(){
 var est=0,real=0,n=0; vxData().tasks.forEach(function(t){ var e=+t.est||0; if(t.status==='done'&&e>0){ est+=e; real+=v4Real(t.id); n++; } });
 return n?{f:real/est,n:n}:null;
}
var v4BaseEdit=vxEdit;
vxEdit=function(t){
 var h=v4BaseEdit(t), c=v4Calib();
 var campo='<label>Estimativa total / minutos<input id="vx-est" type="number" min="0" max="2000" value="'+((t&&t.est)||'')+'"></label>'+
  (c?'<p class="vx-muted vx-wide">Sua calibração: as entregas levam '+c.f.toFixed(1).replace('.',',')+'× o estimado. Multiplique antes de prometer.</p>':'');
 return h.replace('<details class="vx-wide">',campo+'<details class="vx-wide">');
};
var v4BaseRender=vxRender;
vxRender=function(){
 v4BaseRender();
 try{ v4Pos(); }catch(e){ console.error('v4:',e); }
};
function v4Pos(){
 var v=vxData(), body=el('vx-body'); if(!body) return;
 var met=Array.prototype.filter.call(VX.querySelectorAll('.vx-metrics span'),function(s){return /minutos de foco/.test(s.textContent);});
 if(met[0]&&v4Leitura()) met[0].innerHTML='<b>'+Math.round(vxMinutes())+' / '+v4Teto()+'</b>minutos de foco · teto do dia';
 if(v.view==='op'){
  var col=body.querySelector('.vx-grid > div'), side=body.querySelector('.vx-grid > aside');
  if(col) col.insertAdjacentHTML('afterbegin',v4CheckHTML()+v4FaixaHTML());
  if(side) side.insertAdjacentHTML('afterbegin',v4VitHTML());
  var t=vxTask();
  if(t&&!v.edit){
   var ps=body.querySelectorAll('.vx-main p'), alvo=null;
   for(var i=0;i<ps.length;i++) if(ps[i].textContent.indexOf('Próximo movimento')===0) alvo=ps[i];
   var r=v4Real(t.id), e=+t.est||0;
   var tx=e?('<p class="v4-tempo"><b>Tempo:</b> estimado '+e+' min · real '+r+' min'+(r?' ('+(r/e).toFixed(1).replace('.',',')+'×)':'')+'</p>')
           :(r?'<p class="v4-tempo"><b>Tempo real:</b> '+r+' min · sem estimativa (edite a rota para calibrar)</p>':'');
   if(alvo&&tx) alvo.insertAdjacentHTML('afterend',tx);
  }
  var f=el('vx-form'), inp=el('vx-est');
  if(f&&inp) f.addEventListener('submit',function(){ if(document.body.contains(f)) return; var t2=vxTask(); if(t2){ t2.est=clamp(inp.value,0,2000)||0; vxSave(); vxRender(); } });
 }
 if(v.view==='camp'){
  var hs=body.querySelectorAll('h3');
  for(var j=0;j<hs.length;j++) if(hs[j].textContent.indexOf('Relatórios do ECO')===0){
   var c=v4Calib();
   hs[j].insertAdjacentHTML('afterend','<p class="v4-tempo">'+(c?('<b>Calibração do tempo:</b> nas '+c.n+' entregas com estimativa, o real foi '+c.f.toFixed(1).replace('.',',')+'× o previsto.'):'<b>Calibração do tempo:</b> aparece quando houver entregas concluídas com estimativa.')+'</p>');
  }
 }
 VX.querySelectorAll('[data-v4es]').forEach(function(b){ b.onclick=function(){
  var k=+b.dataset.v4es; S.estado=S.estado||{};
  if(!k){ delete S.estado[hoje()]; pinta(); return; }
  S.estado[hoje()]=k; anota("Leitura de abertura: "+k+"/5 — "+V4_ROT[k]+". Teto de foco: "+v4Teto()+" min.",0,false); pinta(); }; });
 VX.querySelectorAll('[data-v4liq]').forEach(function(b){ b.onclick=function(){ liquida(b.dataset.v4liq); pinta(); }; });
 VX.querySelectorAll('[data-v4troca]').forEach(function(b){ b.onclick=function(){ v4Lam++; vxRender(); }; });
 VX.querySelectorAll('[data-v4sem]').forEach(function(b){ b.onclick=function(){ var g=el('h-sem'); if(g) g.scrollIntoView({block:'start',behavior:'smooth'}); }; });
}
/* hábitos: janela de 7 dias no lugar da sequência */
function jan7(hist){ var n=0,i,set={}; (hist||[]).forEach(function(d){set[d]=1;}); for(i=0;i<7;i++) if(set[diaStr(hojeN()-i)]) n++; return n; }
function semKey(){ var d=new Date(), w=(d.getDay()+6)%7; d.setDate(d.getDate()-w); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function habBonus(x,w){ if(w>=5&&x.semOk!==semKey()){ x.semOk=semKey(); return 10; } return 0; }
/* legenda da grade semanal */
function v4Legenda(){ var g=el('tb-g'); if(!g||el('v4-leg')) return;
 g.insertAdjacentHTML('afterend','<div id="v4-leg" class="v4-leg"><span class="fx-06">06–12 · fundo · rota</span><span class="fx-12">12–18 · varredura · lâminas</span><span class="fx-18">18–00 · reentrada · aterrar e fechar</span></div>'); }
(function(){ var p4=pinta; pinta=function(){ p4(); try{ v4Legenda(); }catch(e){} }; })();
setInterval(function(){ try{ if(vxData().view==='op'&&!vxData().edit&&!(document.activeElement&&VX.contains(document.activeElement)&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))) vxRender(); }catch(e){} },60000);
(function(){ var st=document.createElement('style'); st.textContent=
 '#vx .v4-aberta{border-color:var(--red)}'+
 '#vx .v4-es{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:12px}'+
 '#vx .v4-es button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;font-size:11px;letter-spacing:.06em;text-transform:uppercase}'+
 '#vx .v4-es b{font-size:20px}'+
 '#vx .v4-mini{font-size:10px;padding:4px 8px}'+
 '#vx .v4-teto b{font-size:18px}'+
 '#vx .v4-lam{border-left:3px solid var(--red);padding:8px 12px;margin-top:8px}'+
 '#vx .v4-lam ol{margin:8px 0 10px 18px;padding:0}'+
 '#vx .v4-slots{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:10px}'+
 '#vx .v4-s{position:relative;padding:8px 6px 10px;border:1px solid var(--line2,#333);border-radius:4px;min-height:64px;display:flex;flex-direction:column;gap:4px;font-size:12px}'+
 '#vx .v4-s.foi{opacity:.45}'+
 '#vx .v4-s.agora{outline:2px solid var(--red);outline-offset:1px}'+
 '#vx .v4-h{font-family:var(--mono);font-size:10px;letter-spacing:.1em;opacity:.7}'+
 '#vx .v4-t i{opacity:.55}'+
 '#vx .v4-ag{position:absolute;right:6px;top:6px;font-family:var(--mono);font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:var(--red)}'+
 '#vx .v4-bar{height:4px;background:var(--line2,#333);margin:10px 0 6px;border-radius:2px;overflow:hidden}'+
 '#vx .v4-bar i{display:block;height:100%;background:var(--red)}'+
 '#vx .v4-vit ul{margin:8px 0 0 16px;padding:0;line-height:1.5}'+
 '#vx .v4-tempo{font-size:13px}'+
 '.fx-06,.fx-09,#tb-g .tbc.fx-06,#tb-g .tbc.fx-09{background-image:linear-gradient(rgba(86,166,189,.13),rgba(86,166,189,.13))}'+
 '.fx-12,.fx-15,#tb-g .tbc.fx-12,#tb-g .tbc.fx-15{background-image:linear-gradient(rgba(217,161,59,.11),rgba(217,161,59,.11))}'+
 '.fx-18,.fx-21,#tb-g .tbc.fx-18,#tb-g .tbc.fx-21{background-image:linear-gradient(rgba(143,127,196,.12),rgba(143,127,196,.12))}'+
 '.v4-leg{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;font-family:var(--mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase}'+
 '.v4-leg span{padding:4px 8px;border-radius:3px}'+
 '@media(max-width:640px){#vx .v4-slots{grid-template-columns:repeat(3,1fr)}#vx .v4-es button{font-size:9px}}';
 document.head.appendChild(st); })();

try{ montaNav(); }catch(e){ console.error("sum\u00e1rio:",e); }
try{ pinta(); }catch(e){ console.error("pintura:",e);
 var m=el("msg"); if(m) m.textContent="falha ao desenhar um painel \u2014 o restante segue funcionando"; }
try{ montaPomo(); fxLiga(); }catch(e){ console.error("extras:",e); }
/* a abertura sai quando o app terminou de montar (e o Posto já abriu), nunca antes de 1,25 s;
   se algo travar, o CSS a tira sozinho aos 8 s */
document.addEventListener("DOMContentLoaded",function(){ setTimeout(function(){ var b=el("boot"); if(!b) return; b.classList.add("sai");
 setTimeout(function(){ if(b.parentNode) b.parentNode.removeChild(b); },450); },Math.max(0,1250-performance.now())); });
window.addEventListener("resize",spark);
/* ---------- Tudo em tela ----------
   Nada de trocar de página: todas as partes ficam empilhadas numa rolagem só, cada uma com um
   separador. As abas viram um índice fixo no topo que só rola até a parte escolhida. */
var TT_AREAS=['op','camp','est','dos','fin'];
function ttNome(i){var t=TEMAS[apTema()]||{},a=(t.abas||[])[i]||'';var p=a.split(' / ');return {n:p[0]||'',t:p[1]||p[0]||''};}
function ttAlvo(a){return a==='op'?document.getElementById('vx'):document.getElementById('area-'+a);}
function ttSeparadores(){var wr=document.querySelector('.wrap');if(!wr)return;
 TT_AREAS.forEach(function(a,i){if(a==='op')return;var id='area-'+a,sep=document.getElementById(id);
  var prim=Array.prototype.find.call(wr.children,function(n){return n.dataset&&n.dataset.area===a&&n.id!==id&&!n.classList.contains('tt-area');});
  if(!prim)return;
  if(!sep){sep=document.createElement('div');sep.id=id;sep.className='area-sep';}
  var nm=ttNome(i);sep.innerHTML='<span>'+esc(nm.n)+'</span><b>'+esc(nm.t)+'</b>';
  if(sep.nextSibling!==prim)wr.insertBefore(sep,prim);});
 /* a Loja fica por último, depois de todas as outras partes */
 var fs=document.getElementById('area-fin'),fw=document.getElementById('fin-wrap');
 if(fs&&fw&&wr.lastElementChild!==fw){wr.appendChild(fs);wr.appendChild(fw);}}
function ttIndice(){var wr=document.querySelector('.wrap');if(!wr)return;var n=document.getElementById('tt-indice');
 if(!n){n=document.createElement('nav');n.id='tt-indice';n.className='tt-indice';n.setAttribute('aria-label','Índice das partes');
  n.addEventListener('click',function(e){var b=e.target.closest('[data-tt]');if(!b)return;var t=ttAlvo(b.dataset.tt);
   if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-(b.dataset.tt==='op'?8:64),behavior:'smooth'});});
  wr.insertBefore(n,wr.firstChild);}
 n.innerHTML=TT_AREAS.map(function(a,i){var nm=ttNome(i);return '<button type="button" data-tt="'+a+'"><i>'+esc(nm.n)+'</i>'+esc(nm.t)+'</button>';}).join('');
 ttMarca();}
function ttMarca(){var n=document.getElementById('tt-indice');if(!n)return;var at='op',lim=150,melhor=-1e9;
 TT_AREAS.forEach(function(a){var t=ttAlvo(a);if(!t)return;var y=t.getBoundingClientRect().top;if(y<lim&&y>melhor){melhor=y;at=a;}});
 Array.prototype.forEach.call(n.querySelectorAll('[data-tt]'),function(b){b.classList.toggle('at',b.dataset.tt===at);});}
window.addEventListener('scroll',function(){clearTimeout(ttMarca.t);ttMarca.t=setTimeout(ttMarca,60);},{passive:true});
/* a Loja só monta quando chega perto da tela (é pesada) */
function ttLoja(){var fw=finWrap();if(!fw||ttLoja.ok)return;ttLoja.ok=true;
 try{new IntersectionObserver(function(es,ob){if(es.some(function(e){return e.isIntersecting;})){axMonta();ob.disconnect();}},{rootMargin:'900px 0px'}).observe(fw);}catch(e){axMonta();}}
/* partes do painel principal que só existiam nas outras abas: campanha e ajustes */
function ttCss(){if(ttCss.ok)return;ttCss.ok=true;var novas=[];
 Array.prototype.forEach.call(document.styleSheets,function(sh){var rs;try{rs=sh.cssRules;}catch(e){return;}
  Array.prototype.forEach.call(rs||[],function(r){if(r.selectorText&&r.selectorText.indexOf('#vx ')>=0&&r.selectorText.indexOf('vx-tabs')<0)
   novas.push(r.selectorText.split(',').filter(function(x){return x.indexOf('#vx ')>=0;}).map(function(x){return x.replace(/#vx /g,'.tt-area ');}).join(',')+'{'+r.style.cssText+'}');});});
 var st=document.createElement('style');st.id='tt-css';st.textContent=novas.join('\n');document.head.appendChild(st);}
function ttExtras(){ttCss();['tt-camp','tt-dos'].forEach(function(id){var x=document.getElementById(id);if(x)x.remove();});
 var v=vxData(),body=el('vx-body');if(!body||v.edit)return;
 body.insertAdjacentHTML('beforeend','<div id="tt-camp" class="tt-area"><div class="vx-card"><h3>Bunker 9 · projetos e retomadas</h3><p class="vx-muted">A oficina escondida na floresta. Congelar guarda o projeto na bancada e libera uma frente; retomar traz de volta de onde parou.</p>'+vxProjectsHTML()+'</div>'+
  '<div class="vx-card"><h3>Relatórios do dia</h3>'+Object.keys(v.closes).sort().reverse().slice(0,7).map(function(d){var c=v.closes[d];return '<div class="vx-item"><b>'+d+'</b><p>Entrega: '+esc(c.result)+'</p><p>Pendente: '+esc(c.pending)+'</p><p>Próxima: '+esc(c.next)+'</p></div>';}).join('')+
  '<p class="vx-muted">Sessões registradas: '+v.sessions.length+' · Entregas concluídas: '+v.tasks.filter(function(x){return x.status==='done';}).length+'</p></div></div>'+
  '<div id="tt-dos" class="tt-area"><div class="vx-card"><h3>Ajustes e cópia de segurança</h3>'+vxSettingsHTML()+'<div class="vx-row"><button data-vx="export">Exportar registro completo</button><label>Restaurar registro JSON<input id="vx-import" type="file" accept=".json"></label></div></div></div>');
 vxBind();
 /* depois de ligados os botões, cada bloco vai para a sua parte da página */
 var wr=document.querySelector('.wrap');[['tt-camp','camp'],['tt-dos','dos']].forEach(function(p){var x=document.getElementById(p[0]),sep=document.getElementById('area-'+p[1]);
  if(x&&sep&&wr)wr.insertBefore(x,sep.nextSibling);});}
(function(){var l0=vxLayout;vxLayout=function(){var v=vxData();v.view='op';l0();var wr=document.querySelector('.wrap');if(!wr)return;
 Array.prototype.forEach.call(wr.children,function(n){if(n.dataset&&n.dataset.vxHidden==='true')n.dataset.vxHidden='false';});
 try{ttSeparadores();ttIndice();ttLoja();}catch(e){console.error('tudo em tela:',e);}};})();
(function(){var r0=vxRender;vxRender=function(){var v=vxData();v.view='op';r0();try{ttExtras();ttMarca();}catch(e){console.error('tudo em tela:',e);}};})();
vxShow=function(view){var t=ttAlvo(view);if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-64,behavior:'smooth'});};

/* ---------- Painéis laterais + apps ----------
   A Grade semanal sobe para o topo da página. As colunas laterais recebem cartões:
   à esquerda, colar/bandeira/carta, Agenda Google e clima; à direita, Spotify,
   atalhos e respiração. Em tela estreita os cartões viram uma faixa logo abaixo da Grade. */
var LAT_LARGA=window.matchMedia('(min-width:1380px)');
var LAT_IC={
 agenda:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
 clima:'<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="3.2"/><path d="M9 2.5v1.6M9 14v1.5M2.5 9h1.6M14.4 9H16M4.4 4.4l1.1 1.1M12.5 12.5l1 1M4.4 13.6l1.1-1.1M12.5 5.5l1.1-1.1"/><path d="M11 20.5h7.2a3 3 0 0 0 .2-6 4.3 4.3 0 0 0-8.2 1.2A2.4 2.4 0 0 0 11 20.5z"/></svg>',
 musica:'<svg viewBox="0 0 24 24"><path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
 sorteio:'<svg viewBox="0 0 24 24"><rect x="7" y="3.5" width="12" height="16" rx="1.5" transform="rotate(8 13 11.5)"/><rect x="4.5" y="5" width="12" height="16" rx="1.5"/><path d="M10.5 10.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.3 1.3.4-2.6-1.9-1.8 2.6-.4z"/></svg>',
 atalho:'<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5"/></svg>',
 resp:'<svg viewBox="0 0 24 24"><path d="M12 4v8M12 12c-2 0-3.5-1.5-5.5-1.5S3.5 12 3.5 15s1 5 3.5 5 3-2 5-5M12 12c2 0 3.5-1.5 5.5-1.5s3 1.5 3 4.5-1 5-3.5 5-3-2-5-5"/></svg>',
 editar:'<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
 expandir:'<svg viewBox="0 0 24 24"><path d="M10 4H4v6M4 4l6.5 6.5M14 20h6v-6M20 20l-6.5-6.5"/></svg>',
 recolher:'<svg viewBox="0 0 24 24"><path d="M4 10h6V4M10 10 3.5 3.5M20 14h-6v6M14 14l6.5 6.5"/></svg>',
 cruz:'<svg viewBox="0 0 24 24"><path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/></svg>',
 livro:'<svg viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>'
};
var LAT_ATALHOS0=[
 {n:'Planilha do Acampamento',u:'https://docs.google.com/spreadsheets/d/1koY3GLIahpgT685pnGrXXCFAVup-16cEZbTIV-Nh7QY/edit'},
 {n:'Google Agenda',u:'https://calendar.google.com/calendar/r'},
 {n:'Gmail',u:'https://mail.google.com/'},
 {n:'Google Drive',u:'https://drive.google.com/'},
 {n:'Spotify',u:'https://open.spotify.com/'}
];

function latApps(){if(!S.apps||typeof S.apps!=='object')S.apps={spotify:'',agenda:'',cidade:null,atalhos:null};return S.apps;}
function latCard(id,ic,k,t,corpo,ed){return '<section class="lat-c" id="'+id+'"><header><span class="lat-ic">'+LAT_IC[ic]+'</span><div><span class="k9">'+k+'</span><b>'+t+'</b></div>'+
 (ed?'<button type="button" class="lat-ed" data-lat-ed="'+ed+'" aria-label="configurar">'+LAT_IC.editar+'</button>':'')+'</header><div class="lat-b">'+corpo+'</div></section>';}
function latUrl(u){u=String(u||'').trim();return /^https:\/\/[^\s"'<>]+$/.test(u)?u:'';}

/* Spotify: cola o link de playlist, álbum, faixa ou podcast. O player embutido toca aqui mesmo. */
function latSpotifyEmbed(u){var m=String(u||'').match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|episode|show|artist)\/([A-Za-z0-9]+)/);
 return m?'https://open.spotify.com/embed/'+m[1]+'/'+m[2]+'?utm_source=generator&theme=0':'';}
function latSpotifyUri(u){var m=String(u||'').match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|episode|show|artist)\/([A-Za-z0-9]+)/);return m?'spotify:'+m[1]+':'+m[2]:u;}
function latSpotify(){var e=latSpotifyEmbed(latApps().spotify);
 return latCard('lat-spot','musica','Trilha do foco','Spotify',e?
  '<iframe class="lat-spot" src="'+e+'" height="152" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Spotify"></iframe>'+
  '<div class="sp-bt"><a href="'+esc(latSpotifyUri(latApps().spotify))+'">tocar no app do Spotify</a><a href="'+esc(latApps().spotify)+'" target="_blank" rel="noopener">abrir no navegador</a></div>'+
  '<p class="lat-n sp-obs">Se aparecer <b>Prévia</b>, o player embutido não está vendo o seu login: entre em open.spotify.com neste navegador e libere cookies de terceiros para o site, ou toque pelo app.</p>':
  '<p class="lat-n">Cole o link de uma playlist, álbum ou podcast do Spotify. Ele toca aqui, sem sair do app.</p><div class="lat-f"><input data-lat-in="spotify" placeholder="https://open.spotify.com/playlist/…"><button type="button" data-lat-ok="spotify">tocar</button></div>','spotify');}

/* Agenda Google: a visão "agenda" do calendário embutido. Mostra os eventos se o navegador estiver na sua conta Google. */
function latAgenda(){var A=latApps(),ics=A.ics||'',a=A.agenda,src='';
 if(ics){var est=AG.erro?'<p class="lat-n ag-erro">Não consegui atualizar agora ('+esc(AG.erro.slice(0,80))+'). Mostrando a última cópia.</p>':'';
  return latCard('lat-ag','agenda','Oráculo do dia','Agenda Google',est+(AG.quando||AG.ev.length?agListaHTML(7):'<p class="lat-n">Lendo a agenda…</p>')+'<a class="lat-lk" href="https://calendar.google.com/calendar/r/day" target="_blank" rel="noopener">abrir a agenda</a> <button type="button" class="lat-lk ag-at" onclick="window.agAtualiza&&agAtualiza()">atualizar</button>','agenda');}
 if(a){src='https://calendar.google.com/calendar/embed?src='+encodeURIComponent(a)+'&mode=AGENDA&ctz=America%2FCampo_Grande&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&wkst=1&hl=pt_BR';}
 return latCard('lat-ag','agenda','Oráculo do dia','Agenda Google',
  '<p class="lat-n"><b>Para integrar de verdade</b> (eventos na Grade semanal e no spread do mês): no Google Agenda, abra Configurações › a sua agenda › <b>Endereço secreto no formato iCal</b>, copie e cole aqui.</p><div class="lat-f"><input data-lat-in="ics" placeholder="https://calendar.google.com/calendar/ical/…/basic.ics"><button type="button" data-lat-ok="ics">ligar</button></div>'+
  (src?'<iframe class="lat-ag" src="'+src+'" height="260" loading="lazy" title="Google Agenda"></iframe>':''),'agenda');}
window.agAtualiza=function(){agBusca(true);};

/* Clima: Open-Meteo, sem chave. Padrão Campo Grande; a cidade se troca no lápis. */
var LAT_WMO={0:'céu limpo',1:'quase limpo',2:'parcialmente nublado',3:'nublado',45:'neblina',48:'neblina',51:'garoa fraca',53:'garoa',55:'garoa forte',61:'chuva fraca',63:'chuva',65:'chuva forte',66:'chuva gelada',67:'chuva gelada',71:'neve fraca',73:'neve',75:'neve forte',80:'pancadas fracas',81:'pancadas de chuva',82:'pancadas fortes',95:'trovoada',96:'trovoada com granizo',99:'trovoada com granizo'};
function latCidade(){return latApps().cidade||{n:'Campo Grande',lat:-20.4697,lon:-54.6201};}
function latClima(){return latCard('lat-cl','clima','Céu de Zeus','Clima · '+esc(latCidade().n),'<div id="lat-cl-b" class="lat-n">consultando o céu…</div>','clima');}
function latClimaBusca(forca){var c=latCidade(),k='astro_clima',cache=null;try{cache=JSON.parse(localStorage.getItem(k)||'null');}catch(e){}
 if(!forca&&cache&&cache.lat===c.lat&&Date.now()-cache.t<30*60e3){latClimaPinta(cache.d);return;}
 fetch('https://api.open-meteo.com/v1/forecast?latitude='+c.lat+'&longitude='+c.lon+'&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&forecast_days=3&timezone=auto')
  .then(function(r){return r.json();}).then(function(d){try{localStorage.setItem(k,JSON.stringify({t:Date.now(),lat:c.lat,d:d}));}catch(e){}latClimaPinta(d);})
  .catch(function(){var b=document.getElementById('lat-cl-b');if(b)b.textContent='Sem conexão com o céu agora.';});}
function latClimaPinta(d){var b=document.getElementById('lat-cl-b');if(!b||!d||!d.current)return;var cu=d.current,dl=d.daily||{},dias=['dom','seg','ter','qua','qui','sex','sáb'];
 var h='<div class="lat-cl"><b>'+Math.round(cu.temperature_2m)+'°</b><span>'+esc(LAT_WMO[cu.weather_code]||'—')+'<br><small>sensação '+Math.round(cu.apparent_temperature)+'° · umidade '+cu.relative_humidity_2m+'%</small></span></div><div class="lat-cl3">';
 (dl.time||[]).forEach(function(t,i){var dt=new Date(t+'T12:00:00');h+='<div><span>'+(i===0?'hoje':dias[dt.getDay()])+'</span><b>'+Math.round(dl.temperature_2m_max[i])+'° / '+Math.round(dl.temperature_2m_min[i])+'°</b><small>chuva '+(dl.precipitation_probability_max[i]==null?'—':dl.precipitation_probability_max[i]+'%')+'</small></div>';});
 b.className='';b.innerHTML=h+'</div>';}

/* Atalhos: os apps de todo dia num toque. Edita no lápis: uma linha por atalho, "Nome | link". */
function latAtalhos(){var l=latApps().atalhos||LAT_ATALHOS0;
 return latCard('lat-at','atalho','Portais','Atalhos','<div class="lat-ats">'+l.map(function(x){var u=latUrl(x.u);if(!u)return '';var d='';try{d=new URL(u).hostname;}catch(e){}
  return '<a href="'+esc(u)+'" target="_blank" rel="noopener"><img alt="" loading="lazy" src="https://www.google.com/s2/favicons?sz=32&domain='+encodeURIComponent(d)+'"><span>'+esc(x.n||d)+'</span></a>';}).join('')+'</div>'+
  '<textarea class="lat-ta" data-lat-ta rows="6" hidden>'+esc(l.map(function(x){return (x.n||'')+' | '+x.u;}).join('\n'))+'</textarea>','atalhos');}

/* Respiração quadrada 4-4-4-4: para baixar a ansiedade antes de um bloco. */
function latResp(){return latCard('lat-rs','resp','Antes da arena','Respiração','<div class="lat-rs"><div class="lat-bola" id="lat-bola"><span id="lat-rs-t">4 tempos</span></div>'+
 '<p class="lat-n" id="lat-rs-f">Inspira 4, segura 4, solta 4, segura 4. Quatro voltas bastam.</p><button type="button" id="lat-rs-b">começar</button></div>');}
var latRs={on:false,t:0,i:0,v:0};
function latRsPara(){latRs.on=false;clearInterval(latRs.t);var b=document.getElementById('lat-bola'),f=document.getElementById('lat-rs-f'),bt=document.getElementById('lat-rs-b'),tx=document.getElementById('lat-rs-t');
 if(b){b.className='lat-bola';}if(bt)bt.textContent='começar';if(tx)tx.textContent='4 tempos';if(f&&latRs.v)f.textContent=latRs.v+' volta'+(latRs.v>1?'s':'')+' feita'+(latRs.v>1?'s':'')+'. Bom treino.';}
function latRsVai(){var F=[['inspira','in'],['segura','cheio'],['solta','out'],['segura','vazio']];latRs.on=true;latRs.i=0;latRs.v=0;var s=0;
 var bt=document.getElementById('lat-rs-b');if(bt)bt.textContent='parar';
 function passo(){var b=document.getElementById('lat-bola'),tx=document.getElementById('lat-rs-t'),f=document.getElementById('lat-rs-f');if(!b){latRsPara();return;}
  var fase=F[Math.floor(latRs.i/4)%4];b.className='lat-bola '+fase[1];tx.textContent=fase[0]+' · '+(4-latRs.i%4);
  latRs.i++;if(latRs.i%16===0){latRs.v++;if(f)f.textContent='volta '+latRs.v+' de 4';if(latRs.v>=4){setTimeout(latRsPara,1000);clearInterval(latRs.t);}}}
 passo();latRs.t=setInterval(passo,1000);}

function latMonta(){var e=document.getElementById('lat-e'),d=document.getElementById('lat-d');
 if(!e){e=document.createElement('div');e.id='lat-e';e.className='lat';e.innerHTML='<div id="lat-quadro"></div><div id="lat-gm"></div>'+latCard('lat-postal','carta','Cartão-postal do acampamento','Postal do dia','<div id="lat-postal-b"></div>')+latCard('lat-ars','arco','Arsenal do Hékatos','O kit e a forja','<div id="lat-ars-b"></div>')+latCard('lat-dr','moeda','Moeda do acampamento','Dracmas de Ouro','<div id="lat-dr-b"></div>')+latCard('lat-cp','copa','Pontos do chalé 7 por semana','Copa dos Chalés','<div id="lat-cp-b"></div>')+'<div id="lat-ac"></div><div id="lat-vx" class="tt-area"></div>'+latCard('lat-enf-c','cruz','Sono, água, movimento, comida, remédios','Enfermaria do Acampamento','<div id="lat-med"></div><div id="lat-enf"></div>');
  var ap=document.createElement('div');ap.id='lat-apps';ap.className='lat';ap.innerHTML=latAgenda()+latClima()+latSpotify()+latAtalhos();latMonta.apps=ap;}
 if(!d){d=document.createElement('div');d.id='lat-d';d.className='lat';d.innerHTML='<div class="lat-esth"><span class="lat-ic">'+(LAT_IC.laptop||LAT_IC.livro)+'</span><div><span class="k9">painel de estudos</span><b>Laptop de Dédalo</b></div>'+
  '<button type="button" class="lat-ed" id="lat-exp" title="expandir o painel (ou arraste a borda)" aria-label="expandir o painel">'+LAT_IC.expandir+'</button></div><h4 class="lat-sh">Táticas de Guerra <small>concurso TRF3</small></h4><div id="lat-est"></div><h4 class="lat-sh">Grego Antigo e Outras <small>línguas</small></h4><div id="lat-lin"></div>';}
 [e,d].forEach(function(box){if(box.dataset.lig)return;box.dataset.lig='1';
  box.addEventListener('click',function(ev){var t=ev.target.closest('[data-lat-ed],[data-lat-ok],[data-lat-aba],#lat-rs-b,#lat-exp');if(!t)return;
   if(t.id==='lat-exp'){latExpande();return;}
   if(t.dataset.latAba){latAba(t.dataset.latAba);return;}
   if(t.id==='lat-rs-b'){if(latRs.on)latRsPara();else latRsVai();return;}
   if(t.dataset.latOk){var inp=box.querySelector('[data-lat-in="'+t.dataset.latOk+'"]');latSalva(t.dataset.latOk,inp?inp.value:'');return;}
   latEdita(t.dataset.latEd,box);});
  box.addEventListener('keydown',function(ev){if(ev.key==='Enter'&&ev.target.dataset&&ev.target.dataset.latIn){ev.preventDefault();latSalva(ev.target.dataset.latIn,ev.target.value);}});});
 var ap=document.getElementById('lat-apps')||latMonta.apps;
 [ap].forEach(function(box){if(!box||box.dataset.lig)return;box.dataset.lig='1';
  box.addEventListener('click',function(ev){var t=ev.target.closest('[data-lat-ed],[data-lat-ok]');if(!t)return;
   if(t.dataset.latOk){var inp=box.querySelector('[data-lat-in="'+t.dataset.latOk+'"]');latSalva(t.dataset.latOk,inp?inp.value:'');return;}latEdita(t.dataset.latEd,box);});
  box.addEventListener('keydown',function(ev){if(ev.key==='Enter'&&ev.target.dataset&&ev.target.dataset.latIn){ev.preventDefault();latSalva(ev.target.dataset.latIn,ev.target.value);}});});
 return {e:e,d:d,ap:ap};}
function latTroca(id,html){var v=document.getElementById(id);if(v)v.outerHTML=html;}
function latSalva(k,val){var A=latApps();val=String(val||'').trim();
 if(k==='spotify'){if(val&&!latSpotifyEmbed(val)){alert('Esse link não parece do Spotify. Copie em Compartilhar > Copiar link.');return;}A.spotify=val;grava();latTroca('lat-spot',latSpotify());}
 if(k==='ics'){if(val&&!/^https:\/\/calendar\.google\.com\/.+\.ics(\?.*)?$/.test(val)){alert('Esse não parece o endereço iCal do Google Agenda. Ele começa com https://calendar.google.com/calendar/ical/ e termina em .ics.');return;}A.ics=val;grava();latTroca('lat-ag',latAgenda());agBusca(true);return;}
 if(k==='agenda'){if(val&&!/^[^\s@]+@[^\s@]+$/.test(val)){alert('Informe o e-mail ou o ID da agenda.');return;}A.agenda=val;grava();latTroca('lat-ag',latAgenda());}}
function latEdita(k,box){var A=latApps();
 if(k==='spotify'){vxDlg({titulo:'Trilha do foco',texto:'Cole o link de uma playlist, álbum, faixa ou podcast do Spotify. Deixe vazio para tirar.',campos:[{label:'Link do Spotify',valor:A.spotify||''}],ok:'salvar',onOk:function(v){latSalva('spotify',v[0]);}});return;}
 if(k==='agenda'){vxDlg({titulo:'Agenda Google',texto:'Endereço secreto no formato iCal (Configurações da agenda › Integrar agenda). É ele que leva os eventos para a Grade e o spread. Deixe vazio para desligar.',campos:[{label:'Endereço iCal',valor:A.ics||''}],ok:'salvar',onOk:function(v){latSalva('ics',v[0]);}});return;}
 if(k==='clima'){vxDlg({titulo:'Céu de Zeus',texto:'De qual cidade você quer o clima?',campos:[{label:'Cidade',valor:latCidade().n}],ok:'buscar',onOk:function(v){var q=String(v[0]||'').trim();if(!q)return;
   fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&language=pt&name='+encodeURIComponent(q)).then(function(r){return r.json();}).then(function(j){var r=j&&j.results&&j.results[0];
    if(!r){alert('Não achei essa cidade.');return;}A.cidade={n:r.name,lat:r.latitude,lon:r.longitude};grava();latTroca('lat-cl',latClima());latClimaBusca(true);})
    .catch(function(){alert('Sem conexão para buscar a cidade.');});}});return;}
 if(k==='atalhos'){var c=document.getElementById('lat-at'),ta=c&&c.querySelector('[data-lat-ta]'),ats=c&&c.querySelector('.lat-ats');if(!ta)return;
  if(ta.hidden){ta.hidden=false;ats.hidden=true;ta.focus();return;}
  var l=ta.value.split('\n').map(function(x){var p=x.split('|');var u=latUrl((p[1]||p[0]||'').trim());return u?{n:(p[1]?p[0]:'').trim().slice(0,40),u:u}:null;}).filter(Boolean).slice(0,12);
  A.atalhos=l.length?l:null;grava();latTroca('lat-at',latAtalhos());}}

/* coloca cada cartão no lugar. Tela larga: cartões e Quadro de Avisos à esquerda, estudo do concurso à direita.
   Tela estreita: os cartões viram uma faixa abaixo da Grade e o estudo volta para o Partenon. */
function latEstNos(){var r=[];['div.cic','#conc','div.cblocos','div.mapas'].forEach(function(q){Array.prototype.forEach.call(document.querySelectorAll(q),function(n){if(!n.closest('.ax-html')&&r.indexOf(n)<0)r.push(n);});});return r;}
/* o sorteador do baralho vai para a coluna esquerda; a seção Tarefas do chalé fica com a lista das fichas aberta */
function latSorteio(){ferMonta();var me=document.querySelector('.mesa'),c=document.getElementById('fer-sort');if(!me||!c)return;
 if(me.parentNode!==c){me.dataset.vxHidden='false';c.appendChild(me);
  var h=document.getElementById('h-deck'),n=h&&h.nextElementSibling;if(n&&n.classList.contains('narr'))n.classList.add('lat-oculta');}
 /* a lista das fichas e o formulário de nova ficha também saem do corpo: ficam no diálogo, a lista fechada até pedir */
 var g=document.getElementById('grade');if(g&&g.parentNode!==c){g.classList.remove('aberta');c.appendChild(g);}
 var nv=g&&g.nextElementSibling;var novo=document.querySelector('.wrap .novo #n-tit');novo=novo&&novo.closest('.novo');if(novo&&novo.parentNode!==c)c.appendChild(novo);
 var hd=document.getElementById('h-deck');if(hd)hd.classList.add('lat-oculta');}
function latRailCss(){if(latRailCss.ok)return;latRailCss.ok=1;var n=[];
 Array.prototype.forEach.call(document.styleSheets,function(sh){var rs;try{rs=sh.cssRules;}catch(e){return;}
  Array.prototype.forEach.call(rs||[],function(r){var st=r.selectorText;if(!st||!/(\.rail|#rail) /.test(st))return;
   n.push(st.split(',').filter(function(x){return /(\.rail|#rail) /.test(x);}).map(function(x){return x.replace(/\.rail |#rail /g,':is(#lat-quadro,.cp-mural) ');}).join(',')+'{'+r.style.cssText+'}');});});
 var el2=document.createElement('style');el2.id='lat-rail-css';el2.textContent=n.join('\n');document.head.appendChild(el2);}
function latPosiciona(){var m=latMonta(),larga=LAT_LARGA.matches,nav=document.getElementById('nav'),rail=document.getElementById('rail'),wr=document.querySelector('.wrap');if(!wr)return;
 var fx=document.getElementById('lat-faixa');
 if(!fx){fx=document.createElement('div');fx.id='lat-faixa';fx.className='lat-faixa';fx.dataset.area='op';}
 fx.dataset.vxHidden='false';
 var tb=document.getElementById('tm-painel')||document.getElementById('rt-box')||document.querySelector('.wrap > div.rt')||document.getElementById('ws-box')||document.querySelector('.wrap > .tb');if(tb&&tb.parentNode===wr&&fx.previousElementSibling!==tb)wr.insertBefore(fx,tb.nextSibling);
 var ri=document.getElementById('rail-in'),q=m.e.querySelector('#lat-quadro'),est=m.d.querySelector('#lat-est'),nos=latEstNos(),ph=document.getElementById('lat-est-ph');
 latSorteio();
 var enf=m.e.querySelector('#lat-enf'),enos=latEnfNos(),eph=document.getElementById('lat-enf-ph');
 if(!eph&&enos.length&&enos[0].parentNode===wr){eph=document.createElement('i');eph.id='lat-enf-ph';eph.hidden=true;wr.insertBefore(eph,enos[0]);}
 if(!ph&&nos.length&&nos[0].parentNode===wr){ph=document.createElement('i');ph.id='lat-est-ph';ph.hidden=true;var c0=document.getElementById('conc')||nos[0];wr.insertBefore(ph,c0.parentNode===wr?c0:nos[0]);}
 var rc=rodMonta().querySelector('#rod-corpo');if(m.ap&&m.ap.parentNode!==rc)rc.appendChild(m.ap);try{rodBarra();}catch(e){}
 if(larga&&nav&&rail){latRailCss();
  if(m.e.parentNode!==nav)nav.appendChild(m.e);if(m.d.parentNode!==rail)rail.appendChild(m.d);
  if(ri&&q&&ri.parentNode!==q&&!ri.closest('.cp-mural,#cerbox'))q.appendChild(ri);
  nos.forEach(function(n){n.dataset.vxHidden='false';if(n.parentNode!==est)est.appendChild(n);});
  var lin=m.d.querySelector('#lat-lin'),lp=document.querySelector('.wrap > .lp'),hlp=document.getElementById('h-lp');if(lp&&lin){if(!document.getElementById('lat-lin-ph')){var lph=document.createElement('i');lph.id='lat-lin-ph';lph.hidden=true;wr.insertBefore(lph,hlp&&hlp.parentNode===wr?hlp:lp);}if(hlp){hlp.classList.add('lat-oculta');}lp.dataset.vxHidden='false';lin.appendChild(lp);}
  enos.forEach(function(n){n.dataset.vxHidden='false';if(n.matches('h2.sec')||n.classList.contains('narr'))n.classList.add('lat-oculta');if(n.parentNode!==enf)enf.appendChild(n);});
  latAlca();}
 else{if(m.e.parentNode!==fx)fx.appendChild(m.e);if(m.d.parentNode!==fx)fx.appendChild(m.d);
  if(ph){var ref=ph.nextSibling;nos.forEach(function(n){if(n.parentNode===est){wr.insertBefore(n,ref);}});}
  var lph2=document.getElementById('lat-lin-ph'),lp2=document.querySelector('#lat-lin > .lp');if(lph2&&lp2){wr.insertBefore(lp2,lph2.nextSibling);var hl2=document.getElementById('h-lp');if(hl2)hl2.classList.remove('lat-oculta');}
  if(eph){var ref2=eph.nextSibling;enos.forEach(function(n){if(n.parentNode===enf){n.classList.remove('lat-oculta');wr.insertBefore(n,ref2);}});}
  document.body.classList.remove('lat-exp');}
 if(!latPosiciona.clima){latPosiciona.clima=1;latClimaBusca(false);setInterval(function(){latClimaBusca(false);},31*60e3);}}

/* abas do painel direito: estudo do concurso e enfermaria (a parte principal fica só com o registro do dia) */
function latAba(a){try{if(a)localStorage.setItem('astro_lat_aba',a);else a=localStorage.getItem('astro_lat_aba')||'est';}catch(e){a=a||'est';}
 Array.prototype.forEach.call(document.querySelectorAll('[data-lat-aba]'),function(b){var on=b.dataset.latAba===a;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);});
 Array.prototype.forEach.call(document.querySelectorAll('.lat-pn'),function(p){p.hidden=p.id!=='lat-'+a;});
 var r=document.getElementById('rail');if(r)r.scrollTop=0;}
function latEnfNos(){var h=document.getElementById('h-ctn');if(!h)return [];var r=[h],n=h.nextElementSibling;
 while(n&&!(n.matches('h2.sec')||n.classList.contains('area-sep')||n.id==='lat-enf-ph'||n.id==='lat-est-ph')){r.push(n);n=n.nextElementSibling;}
 if(h.closest('#lat-enf'))r=Array.prototype.slice.call(document.getElementById('lat-enf').children);return r;}
/* painel direito expansível: botão (ou duplo clique na borda) abre por cima da página; arrastar a borda ajusta a largura */
function latExpande(forca){var on=typeof forca==='boolean'?forca:!document.body.classList.contains('lat-exp');document.body.classList.toggle('lat-exp',on);
 var b=document.getElementById('lat-exp');if(b){b.innerHTML=on?LAT_IC.recolher:LAT_IC.expandir;b.setAttribute('aria-label',on?'recolher o painel':'expandir o painel');}}
(function(){try{var w=+localStorage.getItem('astro_rail_w');if(w>=300)document.documentElement.style.setProperty('--rail-w',w+'px');}catch(e){}})();
function latAlca(){if(document.getElementById('lat-alca'))return;var h=document.createElement('div');h.id='lat-alca';h.className='lat-alca';h.title='arraste para ajustar · duplo clique expande';document.body.appendChild(h);
 h.addEventListener('dblclick',function(){latExpande();});
 h.addEventListener('pointerdown',function(ev){ev.preventDefault();latExpande(false);h.setPointerCapture(ev.pointerId);document.body.classList.add('lat-arrasta');
  function mv(e){var w=Math.round(window.innerWidth-e.clientX),max=Math.max(320,Math.min(1000,window.innerWidth-620));w=Math.max(300,Math.min(max,w));document.documentElement.style.setProperty('--rail-w',w+'px');}
  function up(e){h.removeEventListener('pointermove',mv);h.removeEventListener('pointerup',up);document.body.classList.remove('lat-arrasta');
   try{localStorage.setItem('astro_rail_w',parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rail-w'),10)||'');}catch(z){}}
  h.addEventListener('pointermove',mv);h.addEventListener('pointerup',up);});}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('lat-exp'))latExpande(false);});


/* ---------- Spread da semana (inspirado no Weekly Spread do AxisHub) ----------
   Abaixo da Grade: foco e metas do mês, e hábitos semanais marcados semana a semana. */

function wsD(){if(!S.ws||typeof S.ws!=='object')S.ws={mes:{},sem:[],mk:{}};S.ws.mes=S.ws.mes||{};S.ws.sem=S.ws.sem||[];S.ws.mk=S.ws.mk||{};return S.ws;}
function wsSemanas(){var hj=hoje(),y=+hj.slice(0,4),m=+hj.slice(5,7)-1,d0=new Date(y,m,1),dim=new Date(y,m+1,0).getDate(),r=[],cur=[];
 for(var d=1;d<=dim;d++){var dt=new Date(y,m,d);cur.push(d);if(dt.getDay()===0||d===dim){r.push(cur);cur=[];}}
 var hoje_d=+hj.slice(8,10),at=0;r.forEach(function(w,i){if(w.indexOf(hoje_d)>=0)at=i;});return {sem:r,at:at,mes:hj.slice(0,7)};}
function wsHTML(){var W=wsD(),Q=wsSemanas(),mv=W.mes[Q.mes]||{},mk=W.mk[Q.mes]||{};
 var cab='<div class="ws-wk">'+Q.sem.map(function(w,i){var feitos=W.sem.filter(function(h){return mk[h.id]&&mk[h.id][i];}).length,tot=W.sem.length,pct=tot?Math.round(feitos/tot*100):0;
  return '<div class="ws-s'+(i===Q.at?' at':'')+'"><span>sem '+(i+1)+'</span><i style="--p:'+pct+'%"></i><b>'+feitos+'/'+tot+'</b></div>';}).join('')+'</div>';
 var lista=W.sem.map(function(h){var row=Q.sem.map(function(w,i){var on=!!(mk[h.id]&&mk[h.id][i]);return '<button type="button" class="ws-c'+(on?' on':'')+(i===Q.at?' at':'')+'" data-ws-mk="'+esc(h.id)+':'+i+'" aria-label="'+esc(h.n)+', semana '+(i+1)+'">'+(on?'✓':'')+'</button>';}).join('');
  return '<div class="ws-h"><span>'+esc(h.n)+'</span><div>'+row+'</div><button type="button" class="ws-x" data-ws-del="'+esc(h.id)+'" aria-label="remover">×</button></div>';}).join('')||'<p class="lat-n">Nenhum hábito semanal ainda. Ex.: faxina do quarto, revisão da semana, ligar para a família.</p>';
 return '<div class="ws-c3 ws-so">'+
  '<section class="ws-card ws-hab"><span class="k9">Hábitos semanais · uma vez por semana (os diários ficam na grade acima)</span>'+cab+lista+'<div class="ws-add"><input data-ws-in placeholder="novo hábito semanal" maxlength="40"><button type="button" data-ws-add>incluir</button></div></section>'+
'</div>';}
function wsPinta(){var tb=document.querySelector('.wrap > .tb');if(!tb)return;var b=document.getElementById('ws-box');
 if(!b){b=document.createElement('div');b.id='ws-box';b.className='ws-box';b.dataset.area='op';
  b.addEventListener('click',function(e){var t=e.target.closest('[data-ws-mk],[data-ws-del],[data-ws-add]');if(!t)return;var W=wsD(),Q=wsSemanas();
   if(t.dataset.wsMk){var p=t.dataset.wsMk.split(':'),mk=W.mk[Q.mes]=W.mk[Q.mes]||{},row=mk[p[0]]=mk[p[0]]||{};row[p[1]]=!row[p[1]];}
   else if(t.dataset.wsDel){W.sem=W.sem.filter(function(h){return h.id!==t.dataset.wsDel;});}
   else{var inp=b.querySelector('[data-ws-in]'),v=inp.value.trim();if(!v)return;W.sem.push({id:'w'+Date.now().toString(36),n:v.slice(0,40)});}
   grava();b.innerHTML=wsHTML();});
  b.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.hasAttribute('data-ws-in')){e.preventDefault();var a=b.querySelector('[data-ws-add]');if(a)a.click();}});
  b.addEventListener('change',function(e){var k=e.target.dataset.wsMes;if(!k)return;var W=wsD(),m=wsSemanas().mes;W.mes[m]=W.mes[m]||{};W.mes[m][k]=e.target.value.slice(0,600);grava();});}
 b.dataset.vxHidden='false';var rt=document.querySelector('.wrap > div.rt');if(rt){if(b.parentNode!==rt)rt.appendChild(b);}else if(b.previousElementSibling!==tb)tb.parentNode.insertBefore(b,tb.nextSibling);
 var a=document.activeElement;if(!(a&&b.contains(a)))b.innerHTML=wsHTML();}

/* ---------- Ferramentas: o que é para mexer e passar o tempo fica num menu, aberto pelo ícone no índice ---------- */
LAT_IC.runa='<svg viewBox="0 0 24 24"><path d="M8 3.5v17M8 7.5l7-4M8 11.5l7-4"/></svg>';
LAT_IC.carta='<svg viewBox="0 0 24 24"><rect x="5.5" y="3" width="13" height="18" rx="1.6"/><circle cx="12" cy="12" r="3"/><path d="M12 5.5v1.5M12 17v1.5"/></svg>';
LAT_IC.caixa='<svg viewBox="0 0 24 24"><path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.3l-8 8a2.1 2.1 0 0 1-3-3l8-8a3.5 3.5 0 0 0-1.6-1.3zM14.5 6.5l3-3 3 3-3 3"/></svg>';
if(!LAT_IC.fogo)LAT_IC.fogo='<svg viewBox="0 0 24 24"><path d="M12 3c3 3.4 4.2 5.9 4.2 8.3a4.2 4.2 0 0 1-8.4 0c0-1.9 1.3-3.4 1.9-5.3.8 1.5 1.5 2.2 2.1 2.4.6-1.6.6-3.4.2-5.4z"/><path d="M5 20.5l14-3.2M5 17.3l14 3.2"/></svg>';
var FER=[
 {id:'sort',n:'Sorteador de tarefas',d:'puxa uma ficha do baralho do chalé',ic:'sorteio'},
 {id:'runas',n:'Mesa de runas',d:'embaralhar e tirar três runas nórdicas',ic:'runa'},
 {id:'carta',n:'Carta do dia',d:'um arcano maior por dia',ic:'carta'},
 {id:'resp',n:'Respiração quadrada',d:'quatro voltas de quatro tempos',ic:'resp'},
 {id:'loja',n:'Loja do acampamento',d:'temas, insígnias e sons com dracmas de ouro',ic:'loja'},
 {id:'arsenal',n:'Arsenal do Hékatos',d:'o kit e a forja, peça por peça',ic:'arco'},
 {id:'ajustes',n:'Ajustes e cópia de segurança',d:'exportar, importar e preferências do app',ic:'insp'}];
function ferMonta(){if(document.getElementById('fer-guarda'))return;
 var g=document.createElement('div');g.id='fer-guarda';g.hidden=true;g.innerHTML='<div id="fer-sort"></div><div id="fer-resp">'+latResp()+'</div><div id="fer-carta"></div><div id="fer-loja"></div><div id="fer-arsenal"></div><div id="fer-recarga"></div><div id="fer-ajustes"></div>';document.body.appendChild(g);drLojaLiga(g.querySelector('#fer-loja'));
 g.querySelector('#fer-resp').addEventListener('click',function(ev){if(ev.target.closest('#lat-rs-b')){if(latRs.on)latRsPara();else latRsVai();}});
 var d=document.createElement('div');d.id='fer-dlg';d.className='fer-dlg';d.hidden=true;
 d.innerHTML='<div class="fer-box" role="dialog" aria-modal="true" aria-labelledby="fer-tt"><header><span class="lat-ic" id="fer-ic"></span><div><span class="k9">Ferramentas</span><b id="fer-tt"></b></div><button type="button" class="lat-ed" id="fer-x" aria-label="fechar">×</button></header><div id="fer-corpo"></div></div>';
 document.body.appendChild(d);
 d.addEventListener('click',function(e){if(e.target===d||e.target.closest('#fer-x'))ferFecha();});
 var w=document.createElement('div');w.id='fer-w';w.className='fer-w';
 w.innerHTML='<button type="button" class="fer-bt" id="fer-bt" aria-haspopup="menu" aria-expanded="false" title="Ferramentas">'+LAT_IC.caixa+'</button>'+
  '<div class="fer-menu" id="fer-menu" role="menu" hidden>'+FER.map(function(f){return '<button type="button" role="menuitem" data-fer="'+f.id+'"><span class="lat-ic">'+LAT_IC[f.ic]+'</span><span><b>'+f.n+'</b><small>'+f.d+'</small></span></button>';}).join('')+'</div>';
 ferPoe.w=w;w.addEventListener('click',function(e){var b=e.target.closest('#fer-bt,[data-fer]');if(!b)return;e.stopPropagation();
  if(b.id==='fer-bt'){ferMenu();return;}ferMenu(false);ferAbre(b.dataset.fer);});
 document.addEventListener('click',function(e){if(!e.target.closest('#fer-w'))ferMenu(false);});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){ferMenu(false);if(!document.getElementById('fer-dlg').hidden)ferFecha();}});
 ferPoe();}
function ferPoe(){var w=document.getElementById('fer-w');if(!w&&ferPoe.w)w=ferPoe.w;if(w&&w.parentNode!==document.body)document.body.appendChild(w);}
function ferMenu(on){var m=document.getElementById('fer-menu'),b=document.getElementById('fer-bt');if(!m)return;on=typeof on==='boolean'?on:m.hidden;m.hidden=!on;if(b)b.setAttribute('aria-expanded',on);}
function ferCarta(){var c=document.getElementById('fer-carta');if(!c)return;c.innerHTML=acCartaHTML();var bt=c.querySelector('[data-ac-carta]');
 if(bt)bt.onclick=function(){if((S.tarot||{}).dia===hoje())return;S.tarot={dia:hoje(),i:acCartaIdx(hoje())};grava();try{vxRender();}catch(e){}ferCarta();var k=AC_ARCANOS[S.tarot.i];acLouros(k[0]+' · '+k[1],'a carta de hoje');};}
function ferAbre(id){var f=FER.filter(function(x){return x.id===id;})[0];if(!f)return;
 if(id==='runas'){var tb=document.getElementById('tirbox'),g=document.getElementById('fer-guarda');if(tb&&g){var w=document.getElementById('fer-runas');if(!w){w=document.createElement('div');w.id='fer-runas';g.appendChild(w);}
   if(!tb.classList.contains('aberto')){var bm=document.getElementById('b-mesa');if(bm)bm.click();}if(tb.parentNode!==w)w.appendChild(tb);tb.hidden=false;tb.style.display='';
   setTimeout(function(){var bk=document.getElementById('cerbk');if(bk&&!document.querySelector('#cerbox.on'))bk.classList.remove('on');},60);}}
 ferFecha(true);if(id==='carta')ferCarta();if(id==='loja')drLojaPinta();
 if(id==='arsenal'){var fa=document.getElementById('fer-arsenal');if(fa)fa.innerHTML='<div class="ars">'+arsHTML()+'</div>';}
 if(id==='ajustes'){var fj=document.getElementById('fer-ajustes'),td=document.getElementById('tt-dos');if(fj){fj.innerHTML='';if(td){td.style.display='';fj.appendChild(td);}else fj.innerHTML='<p class="lat-n">Os ajustes aparecem depois do primeiro desenho da página. Feche e abra de novo.</p>';}}
 if(id==='recarga'){var fr=document.getElementById('fer-recarga'),lr=document.getElementById('lat-rec');if(fr&&lr&&lr.parentNode!==fr){lr.classList.remove('cg-dob');lr.classList.add('fer-rec');fr.appendChild(lr);}}
 var dlg=document.getElementById('fer-dlg'),corpo=document.getElementById('fer-corpo'),no=document.getElementById('fer-'+id);if(!no)return;
 document.getElementById('fer-tt').textContent=f.n;document.getElementById('fer-ic').innerHTML=LAT_IC[f.ic];
 corpo.appendChild(no);dlg.dataset.fer=id;dlg.hidden=false;}
window.ferAbre=function(id){ferAbre(id);};
function ferFecha(quieto){var dlg=document.getElementById('fer-dlg'),g=document.getElementById('fer-guarda'),corpo=document.getElementById('fer-corpo');if(!dlg)return;
 while(corpo&&corpo.firstChild)g.appendChild(corpo.firstChild);dlg.hidden=true;if(!quieto&&latRs.on&&dlg.dataset.fer==='resp')latRsPara();}
(function(){var i0=ttIndice;ttIndice=function(){i0();try{ferMonta();ferPoe();}catch(e){console.error('ferramentas:',e);}};})();

/* ---------- Arsenal do Hékatos: o kit e a forja ----------
   Cada peça do kit evolui com progresso real, medido nos dados do próprio app.
   Nada se compra: a forja de Hefesto só trabalha com o que você já fez. */
var ARS_IC={
 arco:'<svg viewBox="0 0 32 32"><path d="M9 3c9 5 9 21 0 26"/><path d="M9 3v26"/><path d="M5 16h20M21 12.5l4 3.5-4 3.5"/></svg>',
 aljava:'<svg viewBox="0 0 32 32"><path d="M11 9h10l-2 20h-6z"/><path d="M13 9V3M16 9V2M19 9V3"/><path d="M11.5 3.5l1.5-1.5 1.5 1.5M14.5 2.5 16 1l1.5 1.5"/></svg>',
 lamina:'<svg viewBox="0 0 32 32"><path d="M16 2l3 4-1 15h-4L13 6z"/><path d="M10 21h12M16 21v6M13.5 29h5"/></svg>',
 escudo:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12.5"/><circle cx="16" cy="16" r="9"/><circle cx="16" cy="16" r="3"/><path d="M16 7v-2M16 27v-2M7 16H5M27 16h-2M9.6 9.6 8.2 8.2M23.8 23.8l-1.4-1.4M9.6 22.4l-1.4 1.4M23.8 8.2l-1.4 1.4"/></svg>',
 couraca:'<svg viewBox="0 0 32 32"><path d="M10 4h12l3 4-2 3v15l-7 3-7-3V11L7 8z"/><path d="M12 13c2 1.5 6 1.5 8 0M12 18c2 1.5 6 1.5 8 0M16 11v16"/></svg>',
 elmo:'<svg viewBox="0 0 32 32"><path d="M7 20c0-9 4-15 9-15s9 6 9 15l-2 7h-4v-8h-6v8H9z"/><path d="M13 13h6M16 13v6"/><path d="M10 6c2-3 10-3 12 0"/></svg>',
 bolsa:'<svg viewBox="0 0 32 32"><path d="M8 12h16l-2 16H10z"/><path d="M11 12c0-5 10-5 10 0"/><path d="M16 16v7M12.5 19.5h7"/></svg>',
 sandalia:'<svg viewBox="0 0 32 32"><path d="M9 27h11c3 0 5-2 5-4l-9-1-4-17H9z"/><path d="M9 11l6-3M9 16l7-3M10 21l8-2"/></svg>',
 lira:'<svg viewBox="0 0 32 32"><path d="M9 5c-2 6 0 13 4 15M23 5c2 6 0 13-4 15"/><path d="M10 9h12M12 20h8l-1 7h-6z"/><path d="M14 9v11M16 9v11M18 9v11"/></svg>'};
var ARS_KIT=[
 {id:'arco',slot:'Arco',gr:'tóxon',med:'min de estudo fechados',m:function(){var t=0;((S.est&&S.est.blocos)||[]).forEach(function(b){t+=b.min|0;});return t;},
  t:[[0,'Arco curto de teixo','O primeiro arco do chalé 7: leve, honesto, erra quando você erra.'],
     [600,'Arco composto','Madeira, chifre e tendão colados em camadas, como o dos arqueiros citas. Mais força com o mesmo braço.'],
     [3000,'Arco recurvo de bronze celestial','As pontas curvadas devolvem a energia da corda. Fere monstros; mortais nem percebem.'],
     [9000,'Arco solar de Apolo','Presente do pai, entregue a quem treinou todo dia. A flecha sai com a luz do meio-dia.']]},
 {id:'aljava',slot:'Aljava',gr:'faretra',med:'tópicos do edital vistos',m:function(){var n=0,ok=(S.cc&&S.cc.ok)||{};Object.keys(ok).forEach(function(k){n+=(ok[k]||[]).length;});return n;},
  t:[[0,'Aljava de couro, doze flechas','Pontas de ferro, penas de ganso. Cada tópico estudado vira uma flecha a mais.'],
     [40,'Flechas de ponta de bronze','Pontas triangulares que entram fundo. A matéria começa a ficar no alvo.'],
     [120,'Flechas de bronze celestial','Não quebram no impacto e voltam para a aljava depois da luta.'],
     [288,'Aljava que nunca esvazia','O edital inteiro passou pela sua mão. Sempre há mais uma flecha.']]},
 {id:'lamina',slot:'Lâmina',gr:'xíphos',med:'fichas do chalé liquidadas',m:function(){return Object.keys(S.fichas||{}).length;},
  t:[[0,'Faca de acampamento','Corta corda, abre embalagem, resolve o pequeno. Para quando o arco não cabe.'],
     [10,'Xíphos de bronze','A espada curta do hoplita, de dois gumes, para o combate de perto: as pendências da casa.'],
     [30,'Kópis de bronze celestial','Lâmina curvada para a frente, que corta com o peso. Uma tarefa cai a cada golpe.'],
     [80,'Lâmina que nunca cega','Forjada no chalé 9 para quem não deixa pilha crescer.']]},
 {id:'escudo',slot:'Escudo',gr:'aspís',med:'marcações de hábito',m:function(){var n=0;(S.hab||[]).forEach(function(h){n+=(h.hist||[]).length;});return n;},
  t:[[0,'Pelte de vime e couro','O escudo leve dos peltastas, em forma de lua crescente. Segura pouco, mas segura.'],
     [30,'Aspís de madeira e bronze','O escudo redondo do hoplita. Pesado, só funciona se você firmar os pés todo dia.'],
     [100,'Aspís com o sol de Apolo','O emblema do pai no bronze polido. Hábito que já não precisa de vontade.'],
     [250,'Aspís espelhada','Devolve o golpe ao atacante. A rotina defende você nos dias ruins.']]},
 {id:'couraca',slot:'Couraça',gr:'thórax',med:'noites com 7 h de sono ou mais',m:function(){var n=0,o=S.sono||{};Object.keys(o).forEach(function(d){if(+o[d]>=7)n++;});return n;},
  t:[[0,'Quíton de campo','Túnica de linho e nada por cima. Corpo exposto ao cansaço.'],
     [7,'Linotórax','Camadas de linho coladas até virar armadura. Leve, firme, feita de noites bem dormidas.'],
     [30,'Couraça de bronze','O peito protegido. O dia ruim bate e não atravessa.'],
     [90,'Couraça anatômica de bronze celestial','Moldada no seu corpo. Sono em dia é o que a mantém de pé.']]},
 {id:'elmo',slot:'Elmo',gr:'krános',med:'bandeiras capturadas',m:function(){var n=0,o=S.cb||{};Object.keys(o).forEach(function(k){if(o[k]&&o[k].ok)n++;});return n;},
  t:[[0,'Pílos de feltro','O chapéu cônico do soldado leve. Melhor que nada.'],
     [2,'Elmo calcídico','Bronze com aberturas para os ouvidos: você ouve o campo e mira melhor.'],
     [6,'Elmo coríntio','O elmo clássico, que fecha o rosto. Quem vê sabe que você vai até o fim.'],
     [12,'Elmo coríntio de crista dourada','Crista de crina tingida de ouro. Líder de equipe na Captura da Bandeira.']]},
 {id:'bolsa',slot:'Bolsa de cura',gr:'pera',med:'dias com a meta de água',m:function(){var n=0,o=S.agua||{};Object.keys(o).forEach(function(d){if(+o[d]>=8)n++;});return n;},
  t:[[0,'Bolsa de ervas','Folhas secas e um cantil. O filho de Apolo também cura, a começar por si.'],
     [7,'Ataduras e mel da enfermaria','O kit que Quíron aprova: o básico, sempre à mão.'],
     [30,'Frasco de néctar','Um gole restaura o corpo. Hidratação que virou reflexo.'],
     [90,'Ambrosia de emergência','Um quadrado guardado para o pior dia. Você já não chega lá.']]},
 {id:'sandalia',slot:'Pés',gr:'knemídes',med:'etapas de missão concluídas',m:function(){var n=0;(S.proj||[]).forEach(function(p){(p.passos||[]).forEach(function(t){if(t.ok)n++;});});return n;},
  t:[[0,'Sandálias de couro cru','Servem para o caminho, não para a pressa.'],
     [5,'Grevas de bronze','Protegem a canela na marcha longa. As missões começam a andar.'],
     [20,'Grevas gravadas com o sol','Cada etapa concluída deixou uma marca no metal.'],
     [50,'Sandálias aladas emprestadas','Hermes, do chalé 11, emprestou. Missão longa atravessada em dias.']]},
 {id:'lira',slot:'Relíquia',gr:'lýra',med:'min de foco',m:function(){var t=0;try{vxData().sessions.forEach(function(x){t+=x.minutes|0;});}catch(e){}return t;},
  t:[[0,'Flauta de pã','Junco e cera. Uma melodia curta para voltar ao foco.'],
     [300,'Lira de casco de tartaruga','O instrumento que Hermes deu a Apolo. O ritmo do bloco já é seu.'],
     [1500,'Cítara de concerto','Sete cordas, som de templo. Uma hora de foco soa como uma música só.'],
     [5000,'Lira dourada de Apolo','A mente fica quieta quando ela toca. Atenção como dom, não esforço.']]}];
LAT_IC.arco=ARS_IC.arco;
LAT_IC.moeda='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.5"/><path d="M10 9.5h4M12 9.5v5"/></svg>';
LAT_IC.copa='<svg viewBox="0 0 24 24"><path d="M7 4h10v4a5 5 0 0 1-10 0zM7 6H4.5a2.5 2.5 0 0 0 2.8 3.3M17 6h2.5a2.5 2.5 0 0 1-2.8 3.3M12 13v4M8.5 20h7l-1-3h-5z"/></svg>';
LAT_IC.loja='<svg viewBox="0 0 24 24"><path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9c0 2 3.5 2 4 0 .5 2 3.5 2 4 0 .5 2 3.5 2 4 0 .5 2 4 2 4 0"/><path d="M10 20v-5h4v5"/></svg>';
function arsTier(k){var v=k.m()||0,i=0;k.t.forEach(function(t,j){if(v>=t[0])i=j;});return {v:v,i:i};}
function arsNum(v){return Math.round(v).toLocaleString('pt-BR');}
function arsHTML(){var proxima=null;
 var cards=ARS_KIT.map(function(k){var T=arsTier(k),at=k.t[T.i],nx=k.t[T.i+1],pct=100,falta='';
  if(nx){var base=at[0];pct=Math.max(0,Math.min(100,(T.v-base)/(nx[0]-base)*100));falta='faltam '+arsNum(nx[0]-T.v)+' '+k.med;
   var fr=(nx[0]-T.v)/(nx[0]-base);if(!proxima||fr<proxima.fr)proxima={fr:fr,k:k,nx:nx,falta:falta};}
  var pips=k.t.map(function(t,j){return '<i class="'+(j<=T.i?'on':'')+'" title="'+esc(t[1])+'"></i>';}).join('');
  return '<article class="ars-c t'+T.i+'"><div class="ars-ic">'+ARS_IC[k.id]+'</div><div class="ars-tx"><span class="ars-k">'+esc(k.slot)+' · <i>'+esc(k.gr)+'</i></span>'+
   '<b>'+esc(at[1])+'</b><p>'+esc(at[2])+'</p><div class="ars-pips">'+pips+'</div>'+
   (nx?'<div class="ars-bar"><i style="width:'+pct.toFixed(1)+'%"></i></div><small>próxima: <b>'+esc(nx[1])+'</b> · '+falta+'</small>':'<small class="ars-max">forma final · '+arsNum(T.v)+' '+k.med+'</small>')+
   '</div></article>';}).join('');
 return '<header class="ars-h"><div><span class="k9">Arsenal do Hékatos · chalé 7</span><h3>O kit e a forja</h3>'+
  '<p>Nada aqui se compra. A forja de Hefesto trabalha com o que você já fez: cada peça muda de forma quando o progresso real chega à marca.</p></div>'+
  (proxima?'<div class="ars-prox"><span class="k9">mais perto da forja</span><b>'+esc(proxima.nx[1])+'</b><small>'+esc(proxima.falta)+'</small></div>':'')+'</header><div class="ars-g">'+cards+'</div>';}
function arsChecaForja(){var A=S.arsenal=(S.arsenal&&typeof S.arsenal==='object')?S.arsenal:{},novas=[],primeira=!Object.keys(A).length;
 ARS_KIT.forEach(function(k){var i=arsTier(k).i;if(A[k.id]==null||i>A[k.id]){if(A[k.id]!=null&&i>A[k.id])novas.push(k.t[i][1]);A[k.id]=i;}});
 if(novas.length&&!primeira){grava();try{anota('Forja: '+novas.join(', '),0,false);}catch(e){}try{acLouros('Forjado: '+novas[0],'o progresso virou metal');}catch(e){}}
 else if(primeira)grava();}
function arsPinta(){var sep=document.getElementById('area-dos'),wr=document.querySelector('.wrap');if(!sep||!wr){try{arsChecaForja();}catch(e){}return;}var b=document.getElementById('ars-box');
 if(!b){b=document.createElement('section');b.id='ars-box';b.className='ars';b.dataset.area='dos';}
 b.dataset.vxHidden='false';if(sep.nextElementSibling!==b)wr.insertBefore(b,sep.nextSibling);
 b.innerHTML=arsHTML();try{arsChecaForja();}catch(e){}}
(function(){var p0=pinta;pinta=function(){p0();try{arsPinta();mmPinta();latNarrativo();ptPinta();}catch(e){console.error('arsenal:',e);}};})();

/* ---------- Mural de Missões: Tarefa do chalé, Quest e Grande Profecia ----------
   Tarefa do chalé: casa e vida prática, faz uma vez (+3 XP).
   Quest: estudo rápido que renova todo dia, como revisão e exercícios (+5 XP por dia feito).
   Grande Profecia: prova, TCC ou projeto longo, com prazo e etapas (+10 por etapa, +50 ao cumprir e uma conta no colar). */
function mmD(){var Q=S.quests;if(!Q||typeof Q!=='object'){Q=S.quests={chale:[],dia:[],feitas:{},prof:[{id:'pf1',t:'Prova do TRF3 · Analista Judiciário',prazo:'2027-01-31',passos:[],ok:false}]};}
 Q.chale=Q.chale||[];Q.dia=Q.dia||[];Q.feitas=Q.feitas||{};Q.prof=Q.prof||[];return Q;}
function mmId(){return 'q'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
function mmDias(d){var a=new Date(hoje()+'T12:00:00'),b=new Date(d+'T12:00:00');return Math.round((b-a)/864e5);}
function mmDataBR(d){var p=String(d||'').split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:'';}
function mmHTML(){var Q=mmD(),hj=hoje(),fe=Q.feitas[hj]||[];
 var ch=Q.chale.filter(function(t){return !t.ok||t.ok===hj;}).map(function(t){return '<li class="'+(t.ok?'ok':'')+'"><button type="button" class="mm-ck" data-mm-ch="'+t.id+'" aria-label="feita">'+(t.ok?'✓':'')+'</button><span>'+esc(t.t)+'</span><button type="button" class="mm-x" data-mm-del="chale:'+t.id+'" aria-label="tirar">×</button></li>';}).join('');
 var qd=Q.dia.map(function(t){var ok=fe.indexOf(t.id)>=0;return '<li class="'+(ok?'ok':'')+'"><button type="button" class="mm-ck" data-mm-dia="'+t.id+'" aria-label="feita hoje">'+(ok?'✓':'')+'</button><span>'+esc(t.t)+'</span><button type="button" class="mm-x" data-mm-del="dia:'+t.id+'" aria-label="tirar">×</button></li>';}).join('');
 var pf=Q.prof.filter(function(p){return !p.ok||mmDias(p.fim||hj)>-30;}).map(function(p){var n=(p.passos||[]).length,f=(p.passos||[]).filter(function(s){return s.ok;}).length,pct=n?Math.round(f/n*100):0,dd=p.prazo?mmDias(p.prazo):null;
  var prazo=p.prazo?(dd>0?'faltam <b>'+dd+'</b> dias · '+mmDataBR(p.prazo):dd===0?'<b>é hoje</b>':'prazo passou há '+(-dd)+' dias'):'sem prazo';
  return '<article class="mm-pf'+(p.ok?' ok':'')+'"><header><b>'+esc(p.t)+'</b><button type="button" class="mm-x" data-mm-del="prof:'+p.id+'" aria-label="tirar">×</button></header>'+
   '<small class="mm-pz">'+(p.ok?'profecia cumprida · conta no colar':prazo)+'</small><div class="mm-bar"><i style="width:'+(p.ok?100:pct)+'%"></i></div>'+
   '<ul>'+(p.passos||[]).map(function(s,i){return '<li class="'+(s.ok?'ok':'')+'"><button type="button" class="mm-ck" data-mm-pp="'+p.id+':'+i+'">'+(s.ok?'✓':'')+'</button><span>'+esc(s.t)+'</span></li>';}).join('')+'</ul>'+
   (p.ok?'':'<div class="mm-add"><input data-mm-in="passo:'+p.id+'" placeholder="+ etapa" maxlength="80">'+(n&&f===n?'<button type="button" class="mm-cumpre" data-mm-cumpre="'+p.id+'">cumprir a profecia</button>':'')+'</div>')+'</article>';}).join('');
 return '<header class="mm-h"><div><span class="k9">Missões · o que você tem a fazer</span><h3>Mural de Missões</h3></div>'+
  '<p><b>Tarefas</b>: Chalé (casa, uma vez), Diárias (voltam todo dia) e Conselho (designações do gabinete). <b>Missões</b>: o Oráculo, as três do dia. <b>Desafio</b>: a Profecia, alvo longo com prazo e etapas.</p></header>'+
  '<div class="mm-g">'+
  '<section class="mm-col mm-chale"><span class="mm-k">Chalé</span><small>tarefas · casa e vida prática · uma vez · +3 XP</small><ul>'+(ch||'<li class="mm-vz">Nada pendente na casa.</li>')+'</ul>'+
   '<div class="mm-add"><input data-mm-in="chale" placeholder="+ tarefa da casa" maxlength="80"></div>'+
   '<details class="mm-drop" id="mm-drop"'+(function(){try{return localStorage.getItem('astro_mm_drop')==='1'?' open':'';}catch(e){return '';}})()+'><summary><span>Mais tarefas</span><small>baralho do oráculo · Trabalhos de Hércules</small></summary>'+
   '<button type="button" class="mm-orac" data-mm-sort><b>Puxar uma ficha do baralho</b><small>ficha do Oráculo · o sorteio escolhe a próxima tarefa</small></button>'+
   '<span class="mm-dk">Trabalhos de Hércules · metas longas, pagam em dracmas</span><div id="mm-herc-slot"></div></details></section>'+
  '<section class="mm-col mm-quest"><span class="mm-k">Diárias</span><small>tarefas · revisão, exercícios e o que volta todo dia · +5 XP</small><ul>'+(qd||'<li class="mm-vz">Ex.: 10 questões Vunesp, revisar o mapa do dia, ler um artigo de lei seca.</li>')+'</ul>'+
   '<div class="mm-add"><input data-mm-in="dia" placeholder="+ diária" maxlength="80"></div><small class="mm-cont">'+fe.length+' de '+Q.dia.length+' feitas hoje</small></section>'+
  '<section class="mm-col mm-prof"><span class="mm-k">Profecia</span><small>desafio · provas, TCC, projetos longos · +10 por etapa · +50 ao cumprir</small>'+(pf||'<p class="mm-vz">Nenhuma profecia lançada.</p>')+
   '<div class="mm-add mm-novapf"><input data-mm-pf="t" placeholder="+ nova profecia" maxlength="80"><input type="date" data-mm-pf="d" aria-label="prazo"><button type="button" data-mm-novapf>lançar</button></div></section></div>';}
function mmPinta(){var sep=document.getElementById('area-camp'),wr=document.querySelector('.wrap');if(!sep||!wr)return;var b=document.getElementById('mm-box');
 if(!b){b=document.createElement('section');b.id='mm-box';b.className='mm';b.dataset.area='camp';mmLiga(b);}
 b.dataset.vxHidden='false';var tp=tmPainel();if(tp&&b.parentNode!==tp.r2)tp.r2.appendChild(b);try{tmProvas();}catch(e){}
 var a=document.activeElement;if(a&&b.contains(a)&&a.tagName==='INPUT')return;if(!MM_PROV)MM_PROV=document.getElementById('prov');b.innerHTML=mmHTML();try{tmProvas();}catch(e){}}
function mmSalva(foco){grava();var b=document.getElementById('mm-box');if(b){if(!MM_PROV)MM_PROV=document.getElementById('prov');b.innerHTML=mmHTML();try{tmProvas();}catch(e){}if(foco){var n=b.querySelector(foco);if(n)n.focus();}}try{latNarrativo();arsPinta();}catch(e){}}
function mmLiga(b){
 b.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;var Q=mmD(),d=t.dataset,hj=hoje();
  if(d.mmSort!=null){ferAbre('sort');return;}
  if(d.mmCh){var c=Q.chale.filter(function(x){return x.id===d.mmCh;})[0];if(c){c.ok=c.ok?false:hj;}mmSalva();return;}
  if(d.mmDia){var f=Q.feitas[hj]=Q.feitas[hj]||[],i=f.indexOf(d.mmDia);if(i>=0)f.splice(i,1);else f.push(d.mmDia);mmSalva();return;}
  if(d.mmPp){var pp=d.mmPp.split(':'),p=Q.prof.filter(function(x){return x.id===pp[0];})[0];if(p&&p.passos[+pp[1]]){p.passos[+pp[1]].ok=!p.passos[+pp[1]].ok;}mmSalva();return;}
  if(d.mmCumpre){var p2=Q.prof.filter(function(x){return x.id===d.mmCumpre;})[0];if(p2){p2.ok=true;p2.fim=hj;try{anota('Profecia cumprida: '+p2.t,0,false);}catch(z){}try{acLouros('Profecia cumprida','uma conta nova no colar');}catch(z){}}mmSalva();try{vxRender();}catch(z){}return;}
  if(d.mmDel){var k=d.mmDel.split(':');var it=Q[k[0]].filter(function(x){return x.id===k[1];})[0];if(!it)return;if(k[0]==='prof'&&!confirm('Tirar a profecia "'+it.t+'" do mural?'))return;Q[k[0]]=Q[k[0]].filter(function(x){return x!==it;});mmSalva();return;}
  if(d.mmNovapf!=null){var ti=b.querySelector('[data-mm-pf="t"]'),dt=b.querySelector('[data-mm-pf="d"]');if(!ti.value.trim()){ti.focus();return;}Q.prof.push({id:mmId(),t:ti.value.trim().slice(0,80),prazo:dt.value||'',passos:[],ok:false});mmSalva();return;}});
 b.addEventListener('keydown',function(e){var t=e.target;if(e.key!=='Enter'||!t.dataset)return;var Q=mmD(),v=(t.value||'').trim();
  if(t.dataset.mmPf){e.preventDefault();var bt=b.querySelector('[data-mm-novapf]');if(bt)bt.click();return;}
  var k=t.dataset.mmIn;if(!k||!v)return;e.preventDefault();
  if(k==='chale'){Q.chale.push({id:mmId(),t:v.slice(0,80),ok:false});mmSalva('[data-mm-in="chale"]');}
  else if(k==='dia'){Q.dia.push({id:mmId(),t:v.slice(0,80)});mmSalva('[data-mm-in="dia"]');}
  else if(k.indexOf('passo:')===0){var p=Q.prof.filter(function(x){return x.id===k.slice(6);})[0];if(p){p.passos.push({t:v.slice(0,80),ok:false});mmSalva('[data-mm-in="'+k+'"]');}}});}
/* XP das missões entra no nível */
(function(){var g0=gmXP;gmXP=function(){var x=g0(),Q=S.quests||{},q=0;
 (Q.chale||[]).forEach(function(t){if(t.ok)q+=3;});Object.keys(Q.feitas||{}).forEach(function(d){q+=5*((Q.feitas[d]||[]).length);});
 (Q.prof||[]).forEach(function(p){(p.passos||[]).forEach(function(s){if(s.ok)q+=10;});if(p.ok)q+=50;});x.quests=q;x.total+=q;return x;};})();
try{GM_REGRAS.push(['tarefa do Chalé feita','+3'],['Diária feita','+5'],['etapa da Profecia','+10'],['Profecia cumprida','+50']);}catch(e){}
/* profecias cumpridas penduram uma conta especial no colar */
(function(){var c0=acColarHTML;acColarHTML=function(){var h=c0(),P=((S.quests&&S.quests.prof)||[]).filter(function(p){return p.ok;});if(!P.length)return h;
 var ex=P.map(function(p){return '<span class="ac-conta ok ac-prof" style="--cc:#c9a227" title="Profecia: '+esc(p.t)+'">Ω</span>';}).join('');
 return h.replace('</div><p class="ac-nota">',ex+'</div><p class="ac-nota">');};})();

/* ---------- Dracmas de Ouro: moeda do jogo, ganha com horas de foco e estudo ----------
   10 dracmas por hora. Compram temas de chalé, insígnias do crachá e sons ambientes. */
function drMin(){var t=0;try{vxData().sessions.forEach(function(s){t+=s.minutes|0;});}catch(e){}((S.est&&S.est.blocos)||[]).forEach(function(b){t+=b.min|0;});return t;}
function drD(){var L=S.lojaAc;if(!L||typeof L!=='object')L=S.lojaAc={gasto:0,itens:['tema-apolo','ins-sol'],tema:'tema-apolo',ins:'ins-sol'};L.itens=L.itens||[];return L;}
function drSaldo(){return Math.floor(drMin()/60)*10-(drD().gasto|0);}
var DR_LOJA=[
 {id:'tema-apolo',tipo:'tema',n:'Chalé 7 · Apolo',d:'dourado do sol (o seu)',p:0,cor:''},
 {id:'tema-hermes',tipo:'tema',n:'Chalé 11 · Hermes',d:'laranja de estrada',p:80,cor:'#c7783a'},
 {id:'tema-atena',tipo:'tema',n:'Chalé 6 · Atena',d:'cinza de coruja',p:80,cor:'#6f7d8c'},
 {id:'tema-hefesto',tipo:'tema',n:'Chalé 9 · Hefesto',d:'bronze de forja',p:100,cor:'#a5552e'},
 {id:'tema-poseidon',tipo:'tema',n:'Chalé 3 · Poseidon',d:'azul do estreito',p:100,cor:'#3f7f8f'},
 {id:'tema-artemis',tipo:'tema',n:'Chalé 8 · Ártemis',d:'prata da lua',p:120,cor:'#8a8fa8'},
 {id:'ins-sol',tipo:'ins',n:'Sol',d:'a insígnia de Apolo',p:0,g:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>'},
 {id:'ins-lira',tipo:'ins',n:'Lira',d:'música e cura',p:30,g:'<svg viewBox="0 0 24 24"><path d="M7 4c-1.5 4.5 0 9.5 3 11M17 4c1.5 4.5 0 9.5-3 11M8 7h8M9.5 15h5l-.7 5h-3.6z"/></svg>'},
 {id:'ins-arco',tipo:'ins',n:'Arco',d:'mira de longe',p:30,g:'<svg viewBox="0 0 24 24"><path d="M7 3c7 4 7 14 0 18M7 3v18M4 12h15M16 9.5l3 2.5-3 2.5"/></svg>'},
 {id:'ins-coruja',tipo:'ins',n:'Coruja',d:'estratégia de Atena',p:40,g:'<svg viewBox="0 0 24 24"><path d="M6 6l3 2h6l3-2v8a6 6 0 0 1-12 0z"/><circle cx="9.5" cy="11.5" r="1.8"/><circle cx="14.5" cy="11.5" r="1.8"/><path d="M11 15h2l-1 1.5z"/></svg>'},
 {id:'ins-louro',tipo:'ins',n:'Louros',d:'vitória',p:50,g:'<svg viewBox="0 0 24 24"><path d="M8 20c-4-4-4-11 0-15M16 20c4-4 4-11 0-15M6 9l2 1M5.5 13l2.3.5M6.5 17l2-1M18 9l-2 1M18.5 13l-2.3.5M17.5 17l-2-1"/></svg>'},
 {id:'som-fogueira',tipo:'som',n:'Fogueira do acampamento',d:'estalos de lenha',p:40},
 {id:'som-chuva',tipo:'som',n:'Chuva no telhado do chalé',d:'chuva contínua',p:40},
 {id:'som-mar',tipo:'som',n:'Estreito de Long Island',d:'ondas lentas',p:50},
 {id:'som-floresta',tipo:'som',n:'Floresta à noite',d:'grilos e vento',p:50}];
function drItem(id){return DR_LOJA.filter(function(x){return x.id===id;})[0];}
function drAplica(){var L=drD(),t=drItem(L.tema)||DR_LOJA[0],b=document.body;if(!b)return;
 if(t.cor){b.style.setProperty('--red',t.cor);}else b.style.removeProperty('--red');
 var ins=drItem(L.ins)||drItem('ins-sol');Array.prototype.forEach.call(document.querySelectorAll('.vx-hero .ac-cracha b'),function(n){var s=n.querySelector('.dr-ins');if(!s){s=document.createElement('span');s.className='dr-ins';n.insertBefore(s,n.firstChild);}if(s.dataset.i!==ins.id){s.dataset.i=ins.id;s.innerHTML=ins.g;}});}
/* sons ambientes gerados no navegador, sem arquivo */
var drSom={ctx:null,no:null,id:''};
function drRuido(ctx,seg,tipo){var n=ctx.sampleRate*seg,buf=ctx.createBuffer(1,n,ctx.sampleRate),d=buf.getChannelData(0),u=0;
 for(var i=0;i<n;i++){var w=Math.random()*2-1;if(tipo==='marrom'){u=(u+0.02*w)/1.02;d[i]=u*3.5;}else d[i]=w;}return buf;}
function drTocar(id){drParar();if(!id)return;var C=window.AudioContext||window.webkitAudioContext;if(!C)return;var ctx=drSom.ctx||(drSom.ctx=new C());if(ctx.state==='suspended')ctx.resume();
 var g=ctx.createGain();g.gain.value=0.0001;g.connect(ctx.destination);g.gain.linearRampToValueAtTime(0.55,ctx.currentTime+1.5);var nos=[g],tm=[];
 function fonte(tipo){var s=ctx.createBufferSource();s.buffer=drRuido(ctx,4,tipo);s.loop=true;s.start();nos.push(s);return s;}
 if(id==='som-chuva'){var s=fonte('branco'),f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=2200;s.connect(f);f.connect(g);nos.push(f);}
 else if(id==='som-mar'){var s2=fonte('marrom'),f2=ctx.createBiquadFilter(),am=ctx.createGain(),lfo=ctx.createOscillator(),lg=ctx.createGain();f2.type='lowpass';f2.frequency.value=700;
  lfo.frequency.value=0.09;lg.gain.value=0.45;am.gain.value=0.55;lfo.connect(lg);lg.connect(am.gain);lfo.start();s2.connect(f2);f2.connect(am);am.connect(g);nos.push(f2,am,lfo,lg);}
 else if(id==='som-fogueira'){var s3=fonte('marrom'),f3=ctx.createBiquadFilter();f3.type='lowpass';f3.frequency.value=380;var bg=ctx.createGain();bg.gain.value=0.7;s3.connect(f3);f3.connect(bg);bg.connect(g);nos.push(f3,bg);
  var cr=drRuido(ctx,0.05,'branco');tm.push(setInterval(function(){if(Math.random()<0.55){var b=ctx.createBufferSource(),eg=ctx.createGain(),hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=1500+Math.random()*2500;
   b.buffer=cr;eg.gain.value=0.15+Math.random()*0.5;b.connect(hp);hp.connect(eg);eg.connect(g);b.start();}},120));}
 else if(id==='som-floresta'){var s4=fonte('marrom'),f4=ctx.createBiquadFilter();f4.type='bandpass';f4.frequency.value=500;var vg=ctx.createGain();vg.gain.value=0.35;s4.connect(f4);f4.connect(vg);vg.connect(g);nos.push(f4,vg);
  tm.push(setInterval(function(){if(Math.random()<0.6){for(var k=0;k<3;k++){var o=ctx.createOscillator(),eg=ctx.createGain(),t0=ctx.currentTime+k*0.07;o.frequency.value=4200+Math.random()*300;eg.gain.setValueAtTime(0,t0);eg.gain.linearRampToValueAtTime(0.05,t0+0.01);eg.gain.linearRampToValueAtTime(0,t0+0.05);o.connect(eg);eg.connect(g);o.start(t0);o.stop(t0+0.06);}}},400));}
 drSom.no={nos:nos,tm:tm,g:g};drSom.id=id;}
function drParar(){var n=drSom.no;if(!n)return;n.tm.forEach(clearInterval);try{n.g.gain.cancelScheduledValues(0);n.g.gain.value=0;}catch(e){}n.nos.forEach(function(x){try{if(x.stop)x.stop();}catch(e){}try{x.disconnect();}catch(e){}});drSom.no=null;drSom.id='';}
function drLojaHTML(){var L=drD(),sd=drSaldo(),h='<div class="dr-top"><div><span class="k9">saldo</span><b class="dr-sd">'+sd+'</b> <small>dracmas de ouro</small></div><p>10 dracmas por hora de foco ou de estudo · '+arsNum(drMin()/60)+' h no total</p></div>';
 [['tema','Temas de chalé','muda a cor de destaque do app'],['ins','Insígnias do crachá','aparece ao lado do seu nome no banner'],['som','Sons ambientes','tocam enquanto você estuda; um por vez']].forEach(function(g){
  h+='<h4 class="dr-g">'+g[1]+' <small>'+g[2]+'</small></h4><div class="dr-l">'+DR_LOJA.filter(function(x){return x.tipo===g[0];}).map(function(x){var tem=L.itens.indexOf(x.id)>=0,
   ativo=(x.tipo==='tema'&&L.tema===x.id)||(x.tipo==='ins'&&L.ins===x.id)||(x.tipo==='som'&&drSom.id===x.id),
   vis=x.tipo==='tema'?'<i class="dr-cor" style="background:'+(x.cor||'#b98c47')+'"></i>':x.tipo==='ins'?'<i class="dr-gl">'+x.g+'</i>':'<i class="dr-gl">'+CR_IC.sono+'</i>';
   var bt=!tem?'<button type="button" data-dr-compra="'+x.id+'"'+(sd<x.p?' disabled':'')+'>'+x.p+' ◈</button>':
    x.tipo==='som'?'<button type="button" data-dr-som="'+x.id+'">'+(ativo?'parar':'tocar')+'</button>':'<button type="button" data-dr-usa="'+x.id+'"'+(ativo?' disabled':'')+'>'+(ativo?'em uso':'usar')+'</button>';
   return '<div class="dr-i'+(ativo?' on':'')+'">'+vis+'<span><b>'+esc(x.n)+'</b><small>'+esc(x.d)+'</small></span>'+bt+'</div>';}).join('')+'</div>';});
 return h;}
function drLojaPinta(){var c=document.getElementById('fer-loja');if(c)c.innerHTML=drLojaHTML();}
function drLojaLiga(c){c.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var L=drD(),d=b.dataset;
 if(d.drCompra){var x=drItem(d.drCompra);if(!x||drSaldo()<x.p)return;L.gasto=(L.gasto|0)+x.p;L.itens.push(x.id);if(x.tipo==='tema')L.tema=x.id;if(x.tipo==='ins')L.ins=x.id;grava();drAplica();try{acLouros(x.n,'comprado com dracmas de ouro');}catch(z){}}
 else if(d.drUsa){var y=drItem(d.drUsa);if(y.tipo==='tema')L.tema=y.id;if(y.tipo==='ins')L.ins=y.id;grava();drAplica();}
 else if(d.drSom){if(drSom.id===d.drSom)drParar();else drTocar(d.drSom);}
 drLojaPinta();try{latNarrativo();}catch(z){}});}

/* ---------- Copa dos Chalés: horas de estudo por semana viram pontos do chalé 7 ----------
   Atena marca a meta semanal do Partenon (10,5 h); Hermes, a sua média das quatro semanas anteriores. */
function cpSemanas(n){var porDia={};try{vxData().sessions.forEach(function(s){if(s.day)porDia[s.day]=(porDia[s.day]||0)+(s.minutes|0);});}catch(e){}
 ((S.est&&S.est.blocos)||[]).forEach(function(b){if(b.data)porDia[b.data]=(porDia[b.data]||0)+(b.min|0);});
 var d=new Date(hoje()+'T12:00:00'),seg=new Date(d);seg.setDate(d.getDate()-((d.getDay()+6)%7));var out=[];
 for(var w=n-1;w>=0;w--){var ini=new Date(seg);ini.setDate(seg.getDate()-7*w);var m=0;for(var k=0;k<7;k++){var x=new Date(ini);x.setDate(ini.getDate()+k);m+=porDia[x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')]||0;}
  out.push({ini:ini,h:m/60});}return out;}
function cpHTML(){var W=cpSemanas(8),META=10.5,mx=Math.max(META*1.15,1),i,w=260,h=120,bw=w/8;
 W.forEach(function(s){if(s.h>mx)mx=s.h*1.1;});
 var med=W.map(function(s,j){var ant=W.slice(Math.max(0,j-4),j);return ant.length?ant.reduce(function(a,b){return a+b.h;},0)/ant.length:null;});
 var y=function(v){return h-(v/mx)*(h-14);},bars='',pts=[];
 for(i=0;i<8;i++){var s=W[i],bh=h-y(s.h);bars+='<rect x="'+(i*bw+5)+'" y="'+y(s.h)+'" width="'+(bw-10)+'" height="'+Math.max(bh,1)+'" rx="3" class="cp-b'+(i===7?' at':'')+'"><title>'+s.ini.getDate()+'/'+(s.ini.getMonth()+1)+': '+s.h.toFixed(1)+' h</title></rect>';
  if(med[i]!=null)pts.push((i*bw+bw/2)+','+y(med[i]));}
 var at=W[7].h,pts7=Math.round(at*10);
 return '<svg viewBox="0 0 '+w+' '+(h+14)+'" class="cp-svg" role="img" aria-label="Horas de estudo nas últimas 8 semanas">'+bars+
  '<line x1="0" x2="'+w+'" y1="'+y(META)+'" y2="'+y(META)+'" class="cp-atena"/>'+(pts.length>1?'<polyline points="'+pts.join(' ')+'" class="cp-hermes"/>':'')+
  W.map(function(s,j){return '<text x="'+(j*bw+bw/2)+'" y="'+(h+11)+'">'+s.ini.getDate()+'/'+(s.ini.getMonth()+1)+'</text>';}).join('')+'</svg>'+
  '<p class="cp-leg"><span class="a">Apolo · você</span> <b>'+at.toFixed(1)+' h</b> nesta semana = <b>'+pts7+'</b> pontos · <span class="t">Atena: meta 10,5 h</span> · <span class="h">Hermes: sua média de 4 semanas</span></p>';}

/* ---------- Rotina do acampamento: Toque da Concha, Inspeção dos Chalés e Ronda das Harpias ----------
   Concha: soa nos horários do dia (início, refeições no Pavilhão, recolher), com som e aviso do navegador.
   Inspeção: checklist da manhã (antes das atividades) e da noite (o mesmo checklist do toque de recolher).
   Harpias: depois do horário limite, a tela escurece e lembra de encerrar; ficar mais conta como flagrante. */
var RT_TOQUES0=[{h:'06:00',n:'Alvorada · início do dia',on:true},{h:'09:00',n:'Treino na arena · bloco pesado',on:true},{h:'12:00',n:'Almoço no Pavilhão',on:true},
 {h:'15:00',n:'Atividades do acampamento',on:false},{h:'18:00',n:'Jantar no Pavilhão',on:true},{h:'22:00',n:'Toque de recolher nos chalés',on:true}];
var RT_MANHA=[['cama','Cama arrumada'],['agua','Um copo de água'],['remedio','Remédio da manhã'],['grade','Olhei a Grade e as missões do Oráculo'],['mochila','Mochila e roupa prontas']];
function rtD(){var R=S.rotina;if(!R||typeof R!=='object')R=S.rotina={};if(!Array.isArray(R.toques))R.toques=JSON.parse(JSON.stringify(RT_TOQUES0));
 if(!R.limite)R.limite='22:30';R.flagras=R.flagras||{};R.paz=R.paz||{};if(!R.avisa||typeof R.avisa!=='object')R.avisa={ag:true,gr:true,ant:10};return R;}
/* compromissos que também tocam a concha: Agenda Google (com hora) e horários escritos na Grade de hoje (ex.: 6h30, 17h, 14:00) */
function rtGradeHoje(){var hj=hoje(),r=[];Array.prototype.forEach.call(document.querySelectorAll('#tb-g [data-tb^="'+hj+'|"]'),function(c){var v=(c.value||c.textContent||'').trim();if(!v)return;
 var m=v.match(/(?:^|[^\d])(\d{1,2})(?:h(\d{2})?|:(\d{2}))/);if(!m)return;var H=+m[1],M=+(m[2]||m[3]||0);if(H>23||M>59)return;
 r.push({m:H*60+M,h:String(H).padStart(2,'0')+':'+String(M).padStart(2,'0'),t:v.replace(/\s+/g,' '),k:'grade'});});return r;}
function rtCompromissos(){var R=rtD(),A=R.avisa,hj=hoje(),r=[];
 if(A.ag&&typeof AG!=='undefined'&&AG.ev)agDoDia(hj).forEach(function(x){if(x.dia)return;r.push({m:x.ini.getHours()*60+x.ini.getMinutes(),h:agHora(x),t:x.t+(x.loc?' · '+x.loc:''),k:'agenda',id:'ag'+x.ini.getTime()+x.t});});
 if(A.gr)rtGradeHoje().forEach(function(x){x.id='gr'+x.m+x.t;r.push(x);});return r;}
function rtMin(h){var p=String(h||'0:0').split(':');return (+p[0])*60+(+p[1]||0);}
function rtAgora(){var d=new Date();return d.getHours()*60+d.getMinutes();}
function rtProx(){var R=rtD(),a=rtAgora(),L=R.toques.filter(function(t){return t.on;}).sort(function(x,y){return rtMin(x.h)-rtMin(y.h);});
 var C=[];try{C=rtCompromissos().map(function(x){return {h:x.h,n:x.t,m:x.m};});}catch(e){}
 var T=L.map(function(t){return {h:t.h,n:t.n,m:rtMin(t.h)};}).concat(C).sort(function(x,y){return x.m-y.m;});
 for(var i=0;i<T.length;i++)if(T[i].m>a)return T[i];return T[0]||null;}
/* som de concha: sopro grave com harmônicos, subida curta e vibrato */
function rtConcha(){var C=window.AudioContext||window.webkitAudioContext;if(!C)return;var ctx=drSom.ctx||(drSom.ctx=new C());if(ctx.state==='suspended')ctx.resume();
 var t=ctx.currentTime,g=ctx.createGain(),f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=900;f.Q.value=4;g.connect(ctx.destination);f.connect(g);
 g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.35,t+0.35);g.gain.setValueAtTime(0.35,t+1.6);g.gain.exponentialRampToValueAtTime(0.0001,t+2.6);
 var vib=ctx.createOscillator(),vg=ctx.createGain();vib.frequency.value=5.5;vg.gain.value=3;vib.connect(vg);
 [[146.8,1],[293.7,.45],[440.4,.22],[587,.1]].forEach(function(h){var o=ctx.createOscillator(),og=ctx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(h[0]*0.94,t);o.frequency.linearRampToValueAtTime(h[0],t+0.4);
  vg.connect(o.frequency);og.gain.value=h[1];o.connect(og);og.connect(f);o.start(t);o.stop(t+2.7);});vib.start(t);vib.stop(t+2.7);}
function rtAviso(tit,txt){var w=document.getElementById('rt-aviso');if(w)w.remove();w=document.createElement('div');w.id='rt-aviso';w.className='rt-aviso';w.setAttribute('role','status');
 w.innerHTML='<span class="rt-aic">'+RT_IC.concha+'</span><div><b>'+esc(tit)+'</b><small>'+esc(txt)+'</small></div><button type="button" aria-label="fechar">×</button>';
 w.querySelector('button').onclick=function(){w.remove();};document.body.appendChild(w);setTimeout(function(){if(w.parentNode)w.remove();},20000);
 try{if(window.Notification&&Notification.permission==='granted')new Notification(tit,{body:txt,tag:'concha'});}catch(e){}}
function rtTick(){var R=rtD(),a=rtAgora(),hj=hoje(),k='astro_concha_'+hj,feitos;try{feitos=JSON.parse(localStorage.getItem(k)||'[]');}catch(e){feitos=[];}
 R.toques.forEach(function(t){if(!t.on)return;var m=rtMin(t.h);if(a>=m&&a<m+3&&feitos.indexOf(t.h)<0){feitos.push(t.h);try{localStorage.setItem(k,JSON.stringify(feitos));}catch(e){}
  try{rtConcha();}catch(e){}rtAviso('Toque da Concha · '+t.h,t.n);}});
 try{var A=rtD().avisa,ant=A.ant|0;rtCompromissos().forEach(function(x){var m=x.m-ant;if(a>=m&&a<m+3&&feitos.indexOf(x.id)<0){feitos.push(x.id);try{localStorage.setItem(k,JSON.stringify(feitos));}catch(e){}
  try{rtConcha();}catch(e){}rtAviso((x.k==='agenda'?'Compromisso':'Na Grade')+' · '+x.h,(ant&&a<x.m?'em '+(x.m-a)+' min · ':'')+x.t);}});}catch(e){}
 rtHarpias(false);try{rtPintaStatus();}catch(e){}}
/* Ronda das Harpias */
function rtNaRonda(){var R=rtD(),a=rtAgora(),l=rtMin(R.limite);return a>=l||a<5*60;}
function rtDiaRonda(){var d=new Date();if(d.getHours()<5)d.setDate(d.getDate()-1);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function rtHarpias(porAcao){var R=rtD(),dia=rtDiaRonda(),ad='astro_harpia_'+dia,est;try{est=JSON.parse(localStorage.getItem(ad)||'{}');}catch(e){est={};}
 if(!rtNaRonda()){document.body.classList.remove('harpias');return;}
 if(est.ate&&Date.now()<est.ate)return;
 if(est.fechou)return;
 if(!porAcao&&!est.visto)return; /* só aparece quando você mexe no app depois do limite */
 document.body.classList.add('harpias');var o=document.getElementById('rt-harpia');if(o)return;
 o=document.createElement('div');o.id='rt-harpia';o.className='rt-harpia';o.setAttribute('role','alertdialog');
 var n=(R.flagras[dia]|0);
 o.innerHTML='<div class="rt-hbox"><div class="rt-harte">'+arSvg('fogueira')+'</div><span class="rt-hic">'+RT_IC.harpia+'</span><span class="k9">Ronda das Harpias · '+esc(R.limite)+'</span><h3>Campista fora do chalé depois do recolher.</h3>'+
  '<p>As harpias da limpeza já estão patrulhando. O estudo de hoje termina aqui: amanhã a mira agradece o sono.</p>'+(n?'<p class="rt-hf">Flagrantes nesta noite: <b>'+n+'</b></p>':'')+
  '<div class="rt-hb"><button type="button" data-rt-h="fechar">voltar para o chalé</button><button type="button" data-rt-h="mais">só mais 10 minutos</button></div></div>';
 document.body.appendChild(o);
 o.addEventListener('click',function(e){var b=e.target.closest('[data-rt-h]');if(!b)return;
  if(b.dataset.rtH==='fechar'){est.fechou=true;if(!(R.flagras[dia]|0))R.paz[dia]=true;}else{est.ate=Date.now()+10*60e3;R.flagras[dia]=(R.flagras[dia]|0)+1;delete R.paz[dia];}
  try{localStorage.setItem(ad,JSON.stringify(est));}catch(z){}grava();o.remove();document.body.classList.remove('harpias');try{rtPintaStatus();}catch(z){}});}
document.addEventListener('pointerdown',function(e){if(e.target.closest&&e.target.closest('#rt-harpia'))return;if(!rtNaRonda())return;
 var dia=rtDiaRonda(),ad='astro_harpia_'+dia,est;try{est=JSON.parse(localStorage.getItem(ad)||'{}');}catch(z){est={};}if(!est.visto){est.visto=true;try{localStorage.setItem(ad,JSON.stringify(est));}catch(z){}}
 rtHarpias(true);},true);
/* Inspeção dos Chalés */
function rtInsp(){var d=hoje(),p=plDia(d);p.manha=p.manha||{};p.fim=p.fim||{};return p;}
function rtNoitesPaz(){var R=rtD();return Object.keys(R.paz).length;}
var RT_IC={concha:'<svg viewBox="0 0 24 24"><path d="M3.5 14.5c3-1 6-4.5 7.5-9.5 3 2 8 4.5 9.5 9-2.5 3.5-9 5.5-17 .5z"/><path d="M11 5c.5 3.5 2 6.5 4.5 9M11 5c-.5 3.5-.5 7 .5 10.5M11 5c2 2.5 5 5 9.5 9.5"/></svg>',
 insp:'<svg viewBox="0 0 24 24"><path d="M8 4h8v3H8z"/><path d="M6 5.5H5v15h14v-15h-1"/><path d="M8.5 12l2 2 4-4.5M8.5 17h7"/></svg>',
 harpia:'<svg viewBox="0 0 24 24"><path d="M12 7.5c-2 0-3 1.4-3 3.5 0 2.5 1.3 4 3 4s3-1.5 3-4c0-2.1-1-3.5-3-3.5z"/><path d="M9.5 10.5L2.5 6.5c1 3.5 3 6 6.8 7M14.5 10.5l7-4c-1 3.5-3 6-6.8 7M10.5 15l-1 4M13.5 15l1 4M10.8 9.5h.01M13.2 9.5h.01"/></svg>'};
function rtHTML(){var R=rtD(),P=rtInsp(),pm=RT_MANHA.filter(function(x){return P.manha[x[0]];}).length,pn=PL_FIM.filter(function(x){return P.fim[x[0]];}).length,prox=rtProx(),a=rtAgora(),l=rtMin(R.limite);
 var falta=l-a;if(falta<0)falta+=1440;var ronda=rtNaRonda()?'a ronda já começou':'a ronda começa em '+Math.floor(falta/60)+' h '+String(falta%60).padStart(2,'0');
 var lista=function(arr,obj,cls){return '<ul>'+arr.map(function(x){var ok=!!obj[x[0]];return '<li class="'+(ok?'ok':'')+'"><button type="button" class="mm-ck" data-rt-'+cls+'="'+x[0]+'">'+(ok?'✓':'')+'</button><span>'+esc(x[1])+'</span></li>';}).join('')+'</ul>';};
 return ''+
 '<div class="rt-g">'+
 '<section class="mm-col rt-concha"><span class="mm-k">'+RT_IC.concha+' Toque da Concha</span><small id="rt-prox">'+(prox?'próximo: '+esc(prox.h)+' · '+esc(prox.n):'nenhum toque ligado')+'</small>'+
  '<ul class="rt-tq">'+R.toques.map(function(t,i){return '<li class="'+(t.on?'ok':'')+'"><button type="button" class="mm-ck" data-rt-on="'+i+'" aria-label="ligar">'+(t.on?'✓':'')+'</button><input type="time" value="'+esc(t.h)+'" data-rt-h="'+i+'"><span>'+esc(t.n)+'</span></li>';}).join('')+'</ul>'+
  (function(){var A=R.avisa;return '<div class="rt-av"><b class="rt-st">Também tocar nos compromissos</b>'+
   '<label class="'+(A.ag?'ok':'')+'"><button type="button" class="mm-ck" data-rt-av="ag">'+(A.ag?'✓':'')+'</button><span>Agenda Google'+(agIcsUrl()?'':' <em>(não ligada)</em>')+'</span></label>'+
   '<label class="'+(A.gr?'ok':'')+'"><button type="button" class="mm-ck" data-rt-av="gr">'+(A.gr?'✓':'')+'</button><span>horários escritos na Grade de hoje</span></label>'+
   '<label class="rt-ant">avisar <select data-rt-ant>'+[0,5,10,15,30].map(function(n){return '<option value="'+n+'"'+((A.ant|0)===n?' selected':'')+'>'+(n?n+' min antes':'na hora')+'</option>';}).join('')+'</select></label></div>';})()+
  '<div class="mm-add"><button type="button" data-rt-teste>ouvir a concha</button>'+(window.Notification&&Notification.permission!=='granted'?'<button type="button" data-rt-notif>avisar também fora da aba</button>':'')+'</div><small class="rt-obs">Toca enquanto o app estiver aberto em alguma aba.</small></section>'+
 '<section class="mm-col rt-insp"><span class="mm-k">'+RT_IC.insp+' Inspeção dos Chalés</span><small>conselheiros e harpias conferem o chalé 7</small>'+
  '<b class="rt-st">Manhã · antes das atividades <em>'+pm+'/'+RT_MANHA.length+'</em></b>'+lista(RT_MANHA,P.manha,'m')+
  '<div id="rt-cor-slot"></div>'+
  '<p class="rt-sel">'+(pm===RT_MANHA.length&&pn===PL_FIM.length?'Chalé 7 aprovado na inspeção de hoje.':pm===RT_MANHA.length?'Manhã aprovada. Falta a inspeção da noite, na Ronda.':'O chalé ainda não passou pela inspeção.')+'</p></section>'+
 '<section class="mm-col rt-harp"><span class="mm-k">'+RT_IC.harpia+' Ronda das Harpias</span><small id="rt-ronda">'+ronda+'</small>'+
  '<b class="rt-st">Noite · antes do recolher <em>'+pn+'/'+PL_FIM.length+'</em></b>'+lista(PL_FIM,P.fim,'n')+
  '<label class="rt-lim">horário limite para encerrar os estudos <input type="time" value="'+esc(R.limite)+'" data-rt-lim></label>'+
  '<p class="rt-tx">Depois desse horário, se você mexer no app, a tela escurece e as harpias mandam você para o chalé. Pedir mais 10 minutos conta como flagrante.</p>'+
  '<div class="rt-nums"><div><b>'+rtNoitesPaz()+'</b><span>noites em paz</span></div><div><b>'+Object.keys(R.flagras).reduce(function(a2,k){return a2+(R.flagras[k]|0);},0)+'</b><span>flagrantes</span></div></div></section></div>';}
function rtPinta(){var ref=document.querySelector('.wrap > div.rt')||document.getElementById('ws-box'),wr=document.querySelector('.wrap');if(!ref||!wr)return;var b=document.getElementById('rt-box');
 if(!b){b=document.createElement('section');b.id='rt-box';b.className='mm rt';b.dataset.area='op';rtLiga(b);}
 b.dataset.vxHidden='false';var tp=tmPainel(ref);if(b.parentNode!==tp.r1)tp.r1.appendChild(b);
 var a=document.activeElement;if(a&&b.contains(a)&&a.tagName==='INPUT')return;b.innerHTML=rtHTML();}
function rtPintaStatus(){var p=document.getElementById('rt-prox'),r=document.getElementById('rt-ronda');if(!p&&!r)return;var b=document.getElementById('rt-box');var a=document.activeElement;if(b&&!(a&&b.contains(a)))b.innerHTML=rtHTML();}
function rtLiga(b){
 b.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;var R=rtD(),P=rtInsp(),d=t.dataset;
  if(d.rtOn){var q=R.toques[+d.rtOn];q.on=!q.on;}
  else if(d.rtAv){R.avisa[d.rtAv]=!R.avisa[d.rtAv];}
  else if(d.rtM){P.manha[d.rtM]=!P.manha[d.rtM];if(RT_MANHA.every(function(x){return P.manha[x[0]];}))try{acLouros('Inspeção da manhã','chalé 7 em ordem');}catch(z){}}
  else if(d.rtN){P.fim[d.rtN]=!P.fim[d.rtN];if(PL_FIM.every(function(x){return P.fim[x[0]];}))try{acLouros('Inspeção da noite','pronto para o recolher');}catch(z){}grava();try{vxRender();}catch(z){}}
  else if(d.rtTeste!=null){rtConcha();rtAviso('Toque da Concha','assim ela soa nos horários marcados');return;}
  else if(d.rtNotif!=null){try{Notification.requestPermission().then(function(){b.innerHTML=rtHTML();});}catch(z){}return;}
  grava();b.innerHTML=rtHTML();});
 b.addEventListener('change',function(e){var t=e.target,R=rtD();if(t.dataset.rtH){R.toques[+t.dataset.rtH].h=t.value||R.toques[+t.dataset.rtH].h;}else if(t.dataset.rtLim!=null){R.limite=t.value||'22:30';}else if(t.dataset.rtAnt!=null){R.avisa.ant=+t.value||0;}else return;grava();b.innerHTML=rtHTML();});}
/* inspeção da manhã completa vale +5 XP */
(function(){var g0=gmXP;gmXP=function(){var x=g0(),q=0,P=S.plan||{};Object.keys(P).forEach(function(d){var m=P[d]&&P[d].manha;if(m&&RT_MANHA.every(function(i){return m[i[0]];}))q+=5;});x.total+=q;x.insp=q;return x;};})();
try{GM_REGRAS.push(['inspeção da manhã completa','+5']);}catch(e){}
setInterval(function(){try{rtTick();}catch(e){}},30000);setTimeout(function(){try{rtTick();}catch(e){}},3000);

/* ---------- Concept art do acampamento (ilustrações originais em SVG, geradas aqui) ----------
   Paisagens em tons de papel e sépia: vale, arena de arquearia, templo, forja, porto, fogueira e lago.
   Usadas nas faixas de abertura de cada parte, no cartão-postal da coluna esquerda e na ronda das harpias. */
function arRnd(seed){var s=seed>>>0||1;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function arCeu(id,c1,c2,c3){return '<defs><linearGradient id="ceu'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset=".62" stop-color="'+c2+'"/><stop offset="1" stop-color="'+c3+'"/></linearGradient>'+
 '<filter id="pap'+id+'"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .27  0 0 0 0 .16  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>'+
 '<radialGradient id="sol'+id+'"><stop offset="0" stop-color="#fff4cf"/><stop offset=".35" stop-color="#f6d58a" stop-opacity=".9"/><stop offset="1" stop-color="#f6d58a" stop-opacity="0"/></radialGradient></defs>'+
 '<rect width="1200" height="300" fill="url(#ceu'+id+')"/>';}
function arSol(id,x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+(r*3.2)+'" fill="url(#sol'+id+')"/><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#fff1c7" opacity=".95"/>';}
function arMorro(seed,base,amp,cor,op,passo){var R=arRnd(seed),d='M0 300 L0 '+base,x;for(x=0;x<=1200;x+=passo){d+=' Q'+(x+passo/2)+' '+(base-amp*(.4+R()*.9))+' '+(x+passo)+' '+(base-amp*R()*.5);}return '<path d="'+d+' L1200 300Z" fill="'+cor+'" opacity="'+op+'"/>';}
function arPinho(x,y,h,cor){var w=h*.42,s='<g fill="'+cor+'">';for(var i=0;i<3;i++){var yy=y-h*(.25+i*.28),ww=w*(1-i*.25);s+='<path d="M'+(x-ww/2)+' '+(yy+h*.3)+' L'+x+' '+(yy-h*.12)+' L'+(x+ww/2)+' '+(yy+h*.3)+'Z"/>';}return s+'<rect x="'+(x-h*.03)+'" y="'+(y-h*.05)+'" width="'+(h*.06)+'" height="'+(h*.1)+'"/></g>';}
function arPinhos(seed,n,y0,y1,h0,h1,cor){var R=arRnd(seed),s='';for(var i=0;i<n;i++){var x=R()*1200,y=y0+R()*(y1-y0);s+=arPinho(x,y,h0+R()*(h1-h0),cor);}return s;}
function arChale(x,y,w,cor,teto){return '<g><rect x="'+x+'" y="'+(y-w*.55)+'" width="'+w+'" height="'+(w*.55)+'" fill="'+cor+'"/><path d="M'+(x-w*.08)+' '+(y-w*.55)+' L'+(x+w/2)+' '+(y-w*.95)+' L'+(x+w*1.08)+' '+(y-w*.55)+'Z" fill="'+teto+'"/><rect x="'+(x+w*.42)+'" y="'+(y-w*.3)+'" width="'+(w*.16)+'" height="'+(w*.3)+'" fill="#3b2f22" opacity=".7"/></g>';}
function arAgua(y,cor){var s='<rect x="0" y="'+y+'" width="1200" height="'+(300-y)+'" fill="'+cor+'"/>';for(var i=0;i<14;i++){var yy=y+8+i*7;s+='<path d="M'+(i*83%1100)+' '+yy+' h'+(60+i*9%50)+'" stroke="#fff6dc" stroke-width="1.2" opacity=".45"/>';}return s;}
function arGrao(id){return '<rect width="1200" height="300" filter="url(#pap'+id+')"/>';}
var ARTE={
 vale:function(){var id='va';return arCeu(id,'#f1dcae','#f4e6c6','#efe2c4')+arSol(id,930,95,26)+
  '<rect x="0" y="150" width="1200" height="10" fill="#b9c2bb" opacity=".6"/>'+arMorro(11,170,40,'#c9b892',.8,150)+arMorro(12,205,55,'#a99a72',.9,120)+
  arPinhos(5,26,190,215,22,36,'#6f6648')+arPinho(170,165,90,'#5b5240')+'<path d="M150 104 l22 -6 l18 9 l-20 5z" fill="#d9a73a"/>'+
  '<g>'+[0,1,2,3,4,5,6,7,8,9,10,11].map(function(i){var a=Math.PI*(i/11),cx=640+Math.cos(a)*170,cy=250-Math.sin(a)*38;return arChale(cx-14,cy,28,i===6?'#d8b45a':['#cdbb93','#bfae88','#d4c4a0'][i%3],i===6?'#a87d2c':'#8d7a5a');}).join('')+'</g>'+
  arMorro(13,262,18,'#8f8463',1,200)+'<g stroke="#9b4a3a" stroke-width="3" stroke-dasharray="2 7" opacity=".7">'+[0,1,2,3,4].map(function(i){return '<path d="M'+(60+i*20)+' 300 L'+(300+i*30)+' 262"/>';}).join('')+'</g>'+arGrao(id);},
 arena:function(){var id='ar';return arCeu(id,'#f6d9a2','#f5e7c8','#efe3c6')+arSol(id,210,120,30)+arMorro(21,175,45,'#c4b38c',.85,160)+arPinhos(7,30,165,190,24,40,'#6f6648')+
  '<rect x="0" y="210" width="1200" height="90" fill="#cdbf98"/>'+'<path d="M0 232 H1200" stroke="#8d7a5a" stroke-width="2" opacity=".5"/>'+
  [300,560,820].map(function(x,i){return '<g><path d="M'+(x-22)+' 250 l10 -48 M'+(x+22)+' 250 l-10 -48" stroke="#6b5a40" stroke-width="5"/><circle cx="'+x+'" cy="190" r="34" fill="#f4ead2" stroke="#6b5a40" stroke-width="3"/><circle cx="'+x+'" cy="190" r="24" fill="#3f5a6b"/><circle cx="'+x+'" cy="190" r="15" fill="#b4463a"/><circle cx="'+x+'" cy="190" r="6" fill="#e3b545"/>'+(i===1?'<path d="M'+(x-90)+' 150 L'+(x+3)+' 189" stroke="#3b2f22" stroke-width="2.5"/><path d="M'+(x-90)+' 150 l-10 -6 m10 6 l-4 -11" stroke="#a87d2c" stroke-width="2.5"/>':'')+'</g>';}).join('')+
  '<g stroke="#5b5240" stroke-width="3" fill="none"><path d="M1030 260 q-38 -70 0 -140"/><path d="M1030 260 V120" stroke-width="1.2"/></g>'+arGrao(id);},
 partenon:function(){var id='pt';var col='';for(var i=0;i<8;i++)col+='<rect x="'+(470+i*36)+'" y="128" width="16" height="88" fill="#efe4c9" stroke="#8d7a5a" stroke-width="1.2"/>';
  return arCeu(id,'#e9c58f','#f2dcb2','#efe1c2')+arSol(id,1010,150,34)+arMorro(31,190,40,'#c2ae86',.85,150)+arMorro(32,225,30,'#a99a72',.95,180)+
  '<path d="M452 128 L620 78 L788 128Z" fill="#e8dcbe" stroke="#8d7a5a" stroke-width="1.5"/><rect x="452" y="124" width="336" height="10" fill="#d9caa4"/>'+col+'<rect x="440" y="216" width="360" height="12" fill="#d9caa4"/><rect x="428" y="228" width="384" height="10" fill="#cbbb93"/>'+
  [180,300,900,1060].map(function(x){return '<g fill="#7d7356"><circle cx="'+x+'" cy="214" r="22"/><circle cx="'+(x+18)+'" cy="222" r="16"/><rect x="'+(x+2)+'" y="226" width="5" height="22" fill="#5b5240"/></g>';}).join('')+arMorro(33,262,14,'#8f8463',1,240)+arGrao(id);},
 forja:function(){var id='fo';var R=arRnd(9),fa='';for(var i=0;i<30;i++)fa+='<circle cx="'+(600+R()*120-60)+'" cy="'+(150-R()*120)+'" r="'+(1+R()*1.8)+'" fill="#f7b24a" opacity="'+(.4+R()*.6)+'"/>';
  return arCeu(id,'#5b4a5e','#a9746a','#d9a777')+arMorro(41,180,50,'#4a3f3c',.85,150)+arPinhos(17,34,175,215,26,46,'#2f2a28')+
  '<path d="M470 300 L470 220 Q600 120 730 220 L730 300Z" fill="#3a302c"/><path d="M560 300 V240 Q600 205 640 240 V300Z" fill="#f2a13a"/><path d="M575 300 V246 Q600 222 625 246 V300Z" fill="#ffe08a" opacity=".85"/>'+
  '<rect x="650" y="150" width="26" height="70" fill="#3a302c"/><path d="M663 150 q-10 -30 6 -60 q12 -24 -4 -46" stroke="#cfc3b8" stroke-width="6" fill="none" opacity=".35"/>'+fa+
  '<g fill="#221c1a"><path d="M380 270 h70 v-10 h-20 v-14 h28 v-10 h-86 v10 h28 v14 h-20z"/></g>'+arGrao(id);},
 porto:function(){var id='po';return arCeu(id,'#f0c98d','#f5dcae','#e9d6b0')+arSol(id,600,150,32)+'<rect x="0" y="160" width="1200" height="6" fill="#d7b98a" opacity=".6"/>'+arAgua(166,'#9fb0ab')+
  '<path d="M560 166 L640 166 L620 300 L580 300Z" fill="#fff1c7" opacity=".35"/>'+
  [[250,215],[880,230],[1010,205]].map(function(b){return '<g><path d="M'+(b[0]-40)+' '+b[1]+' h80 l-12 16 h-56z" fill="#6b5a40"/><path d="M'+b[0]+' '+b[1]+' V'+(b[1]-70)+'" stroke="#4a3f30" stroke-width="2.5"/><path d="M'+(b[0]+2)+' '+(b[1]-66)+' L'+(b[0]+40)+' '+(b[1]-8)+' H'+(b[0]+2)+'Z" fill="#efe4c9"/></g>';}).join('')+
  '<rect x="0" y="244" width="430" height="10" fill="#7d6a4c"/>'+[20,90,160,230,300,370].map(function(x){return '<rect x="'+x+'" y="244" width="8" height="56" fill="#5b4a36"/>';}).join('')+
  '<g fill="#d9a73a">'+[[120,232],[140,236],[160,230]].map(function(c){return '<ellipse cx="'+c[0]+'" cy="'+c[1]+'" rx="9" ry="3.5"/>';}).join('')+'</g>'+arGrao(id);},
 fogueira:function(){var id='fg';var R=arRnd(4),st='';for(var i=0;i<70;i++)st+='<circle cx="'+(R()*1200)+'" cy="'+(R()*150)+'" r="'+(R()*1.4+.3)+'" fill="#fff4cf" opacity="'+(.3+R()*.7)+'"/>';var fa='';for(i=0;i<26;i++)fa+='<circle cx="'+(600+R()*160-80)+'" cy="'+(200-R()*150)+'" r="'+(1+R()*1.6)+'" fill="#ffc35a" opacity="'+(.3+R()*.7)+'"/>';
  return arCeu(id,'#1d1a2b','#3a2f45','#5a4048')+st+arMorro(51,180,40,'#2a2433',.95,150)+arPinhos(27,30,175,205,24,42,'#1b1722')+
  '<ellipse cx="600" cy="262" rx="420" ry="60" fill="#3b2f2a"/>'+[0,1,2].map(function(r){return '<path d="M'+(250-r*60)+' '+(262+r*14)+' Q600 '+(212+r*20)+' '+(950+r*60)+' '+(262+r*14)+'" stroke="#6b5a4c" stroke-width="7" fill="none"/>';}).join('')+
  '<radialGradient id="fgg"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".8"/><stop offset="1" stop-color="#ffcf6a" stop-opacity="0"/></radialGradient><circle cx="600" cy="230" r="150" fill="url(#fgg)"/>'+
  '<path d="M560 250 Q570 190 600 150 Q615 200 640 250Z" fill="#f2a13a"/><path d="M580 250 Q590 205 602 180 Q612 215 622 250Z" fill="#ffe08a"/><path d="M555 252 l90 -8 M555 244 l90 10" stroke="#5b4030" stroke-width="7"/>'+fa+arGrao(id);},
 lago:function(){var id='la';return arCeu(id,'#e6d2a8','#efe2c4','#e9dcc0')+arSol(id,300,110,22)+arMorro(61,160,45,'#b6a681',.85,150)+arPinhos(37,40,150,175,24,40,'#6f6648')+arAgua(178,'#a8b6ad')+
  '<path d="M640 300 L700 210 H760 L740 300Z" fill="#8d7a5a"/>'+[0,1,2,3].map(function(i){return '<rect x="'+(705+i*14)+'" y="210" width="4" height="90" fill="#5b4a36"/>';}).join('')+
  '<g><path d="M300 238 q60 14 120 0 q-60 8 -120 0z" fill="#9b4a3a"/><path d="M360 232 l18 -16" stroke="#4a3f30" stroke-width="3"/></g><g><path d="M880 214 q44 10 88 0 q-44 6 -88 0z" fill="#3f5a6b"/></g>'+arGrao(id);}};
var ARTE_LEG={vale:['O vale do acampamento','Colina, pinheiro e os chalés em ferradura ao amanhecer.'],arena:['Arena de arquearia','O campo do chalé 7 antes do primeiro treino.'],partenon:['Templo da colina','Onde se estuda para a prova do tribunal.'],
 forja:['A forja na mata','A oficina escondida: fogo aceso, metal esperando forma.'],porto:['Porto do estreito','Barcos no fim da tarde, dracmas na mesa do mercador.'],fogueira:['Fogueira do anfiteatro','Canto à noite, antes do toque de recolher.'],lago:['Lago das canoas','Água parada, píer e duas canoas esperando.']};
var arCache={};
function arUrl(k){if(!arCache[k]){var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice">'+ARTE[k]()+'</svg>';arCache[k]='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';}return arCache[k];}
function arSvg(k){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" class="ar-svg" role="img" aria-label="'+esc(ARTE_LEG[k][0])+'">'+ARTE[k]()+'</svg>';}
var AR_AREA={camp:'arena',est:'partenon',dos:'forja',fin:'porto'};

/* fotos enviadas pelo Bruno (só cenários, sem rosto em primeiro plano), em img/acampamento/ */
var AR_FOTO={pinheiro:['O pinheiro da colina','A fronteira do acampamento: daqui para dentro, ninguém entra sem convite.'],colina:['A colina do pinheiro','O primeiro lugar que se vê ao chegar.'],
 pavilhao:['Pavilhão do refeitório','Os estandartes dos chalés sobre as mesas de pedra. É aqui que a concha chama.'],anfiteatro:['O anfiteatro e a cachoeira','Fogueira à noite, aulas de dia.'],
 templos:['O caminho dos chalés','Templos na mata, estátuas e braseiros acesos.'],armas:['O arsenal','Lâminas e maças esperando quem treina.'],placas:['A placa dos caminhos','Deméter, Hefesto, Poseidon: cada seta é um chalé.'],
 louros:['Louros','A coroa que Apolo dá a quem acerta.'],arquearia:['Campo de arquearia','Fileira de arqueiros, alvos na sombra das árvores.'],taxi:['O táxi das Irmãs Cinzentas','Aceita dracma como pagamento. Não recomenda o cinto.']};
function arFotoUrl(k){return 'url("img/acampamento/'+k+'.jpg")';}
AR_AREA={camp:'f:arquearia',est:'f:templos',dos:'f:armas',fin:'f:taxi'};
function arFaixas(){try{document.body.style.setProperty('--arte-vale',arUrl('vale'));}catch(e){}Object.keys(AR_AREA).forEach(function(a){var s=document.getElementById('area-'+a);if(!s)return;var k=AR_AREA[a];
 if(s.dataset.arte!==k){s.dataset.arte=k;s.classList.add('com-arte');var foto=k.indexOf('f:')===0,kk=foto?k.slice(2):k;s.style.setProperty('--arte',foto?arFotoUrl(kk):arUrl(kk));s.title=(foto?AR_FOTO[kk]:ARTE_LEG[kk])[0];}});
 }
function arPostais(){return Object.keys(AR_FOTO).map(function(k){return 'f:'+k;}).concat(Object.keys(ARTE));}
function arPostalHTML(){var ks=arPostais(),i=(S.postalI==null?Math.floor(Date.now()/864e5):S.postalI)%ks.length,k=ks[i],foto=k.indexOf('f:')===0,kk=foto?k.slice(2):k,L=foto?AR_FOTO[kk]:ARTE_LEG[kk];
 return '<div class="ar-postal">'+(foto?'<img class="ar-svg" src="img/acampamento/'+kk+'.jpg" alt="'+esc(L[0])+'" loading="lazy">':arSvg(kk))+'<div class="ar-leg"><b>'+esc(L[0])+'</b><small>'+esc(L[1])+'</small></div></div><button type="button" class="arsm-v" data-ar-prox>próximo postal</button>';}
document.addEventListener('click',function(e){if(!e.target.closest('[data-ar-prox]'))return;var ks=arPostais();S.postalI=((S.postalI==null?Math.floor(Date.now()/864e5):S.postalI)+1)%ks.length;var c=document.getElementById('lat-postal-b');if(c)c.innerHTML=arPostalHTML();});

/* ---------- Estilo neoclássico: colunas jônicas gravadas, papel creme e tinta preta ----------
   Usado no Pórtico da Profecia (linha do tempo da prova), na Grade semanal, no rastreador de hábitos e no frontão do banner. */
var NEO_TINTA='#5a3f2c',NEO_PAPEL='#f4ead2';
function neoCapitel(x,y,w){var r=w*.17,s='<g fill="none" stroke="'+NEO_TINTA+'" stroke-width="1.3">';
 s+='<rect x="'+(x-w*.62)+'" y="'+y+'" width="'+(w*1.24)+'" height="'+(w*.1)+'" fill="'+NEO_PAPEL+'"/>';
 s+='<path d="M'+(x-w*.5)+' '+(y+w*.1)+' H'+(x+w*.5)+'"/><path d="M'+(x-w*.46)+' '+(y+w*.1)+' q'+(w*.46)+' '+(w*.16)+' '+(w*.92)+' 0" />';
 [-1,1].forEach(function(d){var cx=x+d*w*.48,cy=y+w*.3;s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+NEO_PAPEL+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r*.62)+'"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r*.28)+'" fill="'+NEO_TINTA+'"/>';});
 s+='<path d="M'+(x-w*.42)+' '+(y+w*.46)+' H'+(x+w*.42)+'"/><path d="M'+(x-w*.38)+' '+(y+w*.52)+' H'+(x+w*.38)+'" stroke-width="2"/></g>';return s;}
function neoColuna(x,y0,y1,w){var s='',sh0=y0+w*.56,sh1=y1-w*.22;
 s+='<rect x="'+(x-w*.38)+'" y="'+sh0+'" width="'+(w*.76)+'" height="'+(sh1-sh0)+'" fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="1.3"/>';
 for(var i=1;i<8;i++){var xx=x-w*.38+i*w*.76/8;s+='<path d="M'+xx+' '+(sh0+3)+' V'+(sh1-3)+'" stroke="'+NEO_TINTA+'" stroke-width="'+(i%2?.9:.5)+'" opacity=".75"/>';}
 s+='<path d="M'+(x-w*.38+2)+' '+(sh0+2)+' V'+(sh1-2)+'" stroke="'+NEO_TINTA+'" stroke-width="3" opacity=".25"/>';
 s+='<g fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="1.3"><rect x="'+(x-w*.46)+'" y="'+sh1+'" width="'+(w*.92)+'" height="'+(w*.09)+'" rx="'+(w*.045)+'"/><rect x="'+(x-w*.52)+'" y="'+(sh1+w*.09)+'" width="'+(w*1.04)+'" height="'+(w*.13)+'"/></g>';
 return s+neoCapitel(x,y0,w);}
function neoEntab(w,y,h){var s='<g stroke="'+NEO_TINTA+'" fill="'+NEO_PAPEL+'" stroke-width="1.2"><rect x="0" y="'+y+'" width="'+w+'" height="'+(h*.28)+'"/><rect x="0" y="'+(y+h*.28)+'" width="'+w+'" height="'+(h*.18)+'"/></g><g fill="'+NEO_TINTA+'">';
 for(var x=4;x<w;x+=12)s+='<rect x="'+x+'" y="'+(y+h*.46)+'" width="6" height="'+(h*.2)+'"/>';
 return s+'</g><path d="M0 '+(y+h*.72)+' H'+w+' M0 '+(y+h*.82)+' H'+w+' M0 '+(y+h)+' H'+w+'" stroke="'+NEO_TINTA+'" stroke-width="1.1"/>';}
function neoUrl(svg,vb){return 'url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+vb+'" preserveAspectRatio="none">'+svg+'</svg>')+'")';}
/* peças em imagem para as molduras (CSS) */
var NEO_IMG={};
function neoImgs(){if(NEO_IMG.ok)return;NEO_IMG.ok=1;
 NEO_IMG.ent=neoUrl(neoEntab(240,1,38),'0 0 240 40');
 NEO_IMG.cap='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40">'+neoCapitel(30,2,46)+'</svg>')+'")';
 var fus='<rect x="12.5" y="0" width="35" height="40" fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="1.3"/>';for(var i=1;i<8;i++)fus+='<path d="M'+(12.5+i*35/8)+' 0 V40" stroke="'+NEO_TINTA+'" stroke-width="'+(i%2?.9:.5)+'" opacity=".75"/>';
 NEO_IMG.fuste=neoUrl(fus,'0 0 60 40');
 NEO_IMG.base='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 18"><g fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="1.3"><rect x="9" y="1" width="42" height="5" rx="2.5"/><rect x="6" y="6" width="48" height="10"/></g></svg>')+'")';
 var r=document.documentElement.style;r.setProperty('--neo-ent',NEO_IMG.ent);r.setProperty('--neo-cap',NEO_IMG.cap);r.setProperty('--neo-fuste',NEO_IMG.fuste);r.setProperty('--neo-base',NEO_IMG.base);
 var pap='<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .3 0 0 0 0 .24 0 0 0 0 .15 0 0 0 .12 0"/></filter><rect width="300" height="300" filter="url(#n)"/>';
 r.setProperty('--neo-papel','url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">'+pap+'</svg>')+'")');}
/* Pórtico da Profecia: linha do tempo da prova do TRF3 entre colunas */
function ptData(s){return new Date(s+'T12:00:00');}
function ptHTML(){var ini=ptData('2026-11-01'),fim=ptData('2027-02-03'),hj=ptData(hoje()),Wd=800,H=380,x0=40,x1=760;
 var X=function(d){return x0+(x1-x0)*Math.max(0,Math.min(1,(d-ini)/(fim-ini)));};
 var prova=null;try{var pf=(S.quests&&S.quests.prof||[]).filter(function(p){return p.prazo&&/TRF3/.test(p.t);})[0];if(pf)prova=pf.prazo;}catch(e){}prova=prova||'2027-01-31';
 var dias=Math.max(0,Math.round((ptData(prova)-hj)/864e5));
 var topN=0,ok=(S.cc&&S.cc.ok)||{};Object.keys(ok).forEach(function(k){topN+=(ok[k]||[]).length;});var ed=Math.round(topN/288*100);
 var sem=cpSemanas(14),pts=[],META=10.5,Y=function(h){return 300-Math.min(1,h/META)*170;};
 sem.forEach(function(w){var meio=new Date(w.ini);meio.setDate(meio.getDate()+3);if(meio>=ini&&meio<=hj)pts.push([X(meio),Y(w.h)]);});
 var xh=X(hj);if(!pts.length||pts[pts.length-1][0]<xh-2)pts.push([xh,pts.length?pts[pts.length-1][1]:Y(0)]);pts.unshift([x0,pts[0][1]]);
 var curva=function(P){var d='M'+P[0][0]+' '+P[0][1];for(var i=1;i<P.length;i++){var a=P[i-1],b=P[i],mx=(a[0]+b[0])/2;d+=' C'+mx+' '+a[1]+' '+mx+' '+b[1]+' '+b[0]+' '+b[1];}return d;};
 var fut=[[xh,pts[pts.length-1][1]],[X(ptData('2026-12-20')),Y(9)],[X(ptData('2027-01-29')),Y(10.5)],[X(ptData(prova)),Y(10.5)]].filter(function(p){return p[0]>=xh;});
 var s='<rect width="'+Wd+'" height="'+H+'" fill="'+NEO_PAPEL+'"/>'+neoEntab(Wd,0,40);
 s+='<rect x="250" y="8" width="300" height="24" fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="1.2"/><text x="400" y="25" text-anchor="middle" class="pt-tit">PÓRTICO DA PROFECIA</text>';
 [130,330,530,730].forEach(function(cx){s+=neoColuna(cx-60,62,352,44);});
 var fases=[['INSCRIÇÃO','2026-11-01','2026-11-23'],['BASE','2026-11-24','2027-01-15'],['REVISÃO','2027-01-16','2027-01-30'],['PROVA','2027-01-31','2027-02-03']];
 fases.forEach(function(f,i){var a=X(ptData(f[1])),b=X(ptData(f[2]));s+='<path d="M'+a+' 366 H'+b+'" stroke="'+NEO_TINTA+'" stroke-width="'+(i%2?1:2.2)+'"/><text x="'+((a+b)/2)+'" y="378" text-anchor="middle" class="pt-fase">'+f[0]+'</text>';});
 s+='<path d="'+curva(pts)+'" fill="none" stroke="'+NEO_TINTA+'" stroke-width="2.4"/>';
 if(fut.length>1)s+='<path d="'+curva(fut)+'" fill="none" stroke="'+NEO_TINTA+'" stroke-width="1.6" stroke-dasharray="5 5" opacity=".7"/>';
 pts.slice(1,-1).forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="1.4"/>';});
 [['2026-11-23','inscrição'],['2027-01-29','revisão final'],[prova,'prova']].forEach(function(m){var mx=X(ptData(m[0])),passou=ptData(m[0])<hj,my=mx<=xh?null:null;
  var ty=m[1]==='prova'?338:m[1]==='revisão final'?318:336,ta=m[1]==='inscrição'?'start':'end',dx=m[1]==='inscrição'?10:-10;
  s+='<path d="M'+mx+' 44 V350" stroke="'+NEO_TINTA+'" stroke-width=".8" stroke-dasharray="2 4" opacity=".55"/><circle cx="'+mx+'" cy="350" r="6" fill="'+(passou?NEO_TINTA:NEO_PAPEL)+'" stroke="'+NEO_TINTA+'" stroke-width="1.4"/><rect x="'+(ta==='end'?mx+dx-112:mx+dx-3)+'" y="'+(ty-12)+'" width="115" height="16" fill="'+NEO_PAPEL+'" opacity=".92"/><text x="'+(mx+dx)+'" y="'+ty+'" text-anchor="'+ta+'" class="pt-m">'+m[1]+' · '+m[0].slice(8,10)+'/'+m[0].slice(5,7)+'</text>';});
 var yh=pts[pts.length-1][1],cy=Math.max(130,Math.min(250,yh-80)),cx=Math.max(110,Math.min(690,xh));
 s+='<path d="M'+xh+' '+yh+' L'+cx+' '+(cy+50)+'" stroke="'+NEO_TINTA+'" stroke-width="1.3"/><circle cx="'+xh+'" cy="'+yh+'" r="7" fill="'+NEO_TINTA+'"/>';
 s+='<circle cx="'+cx+'" cy="'+cy+'" r="52" fill="'+NEO_TINTA+'"/><text x="'+cx+'" y="'+(cy-14)+'" text-anchor="middle" class="pt-ck">HOJE</text><text x="'+cx+'" y="'+(cy+14)+'" text-anchor="middle" class="pt-cn">'+dias+'</text><text x="'+cx+'" y="'+(cy+32)+'" text-anchor="middle" class="pt-ck">dias até a prova</text>';
 var c2=cx>400?cx-150:cx+150,ultima=sem[sem.length-1].h;
 s+='<circle cx="'+c2+'" cy="'+(cy+40)+'" r="40" fill="'+NEO_TINTA+'"/><text x="'+c2+'" y="'+(cy+30)+'" text-anchor="middle" class="pt-ck">EDITAL</text><text x="'+c2+'" y="'+(cy+52)+'" text-anchor="middle" class="pt-cn2">'+ed+'%</text><text x="'+c2+'" y="'+(cy+66)+'" text-anchor="middle" class="pt-ck">'+ultima.toFixed(1)+' h na semana</text>';
 return '<svg viewBox="0 0 '+Wd+' '+(H+6)+'" class="pt-svg" role="img" aria-label="Linha do tempo da prova: faltam '+dias+' dias">'+s+'</svg>'+
  '<p class="pt-leg">A linha sobe com as horas de estudo de cada semana (topo = meta de 10,5 h). O traço pontilhado é o ritmo planejado até a prova.</p>';}

/* ---------- Medalhão do ciclo (Táticas de Guerra) ----------
   Círculo com grega em volta, como os medalhões gregos: os blocos da roda formam o anel,
   o bloco em curso fica em dourado e o centro mostra a disciplina da vez. */
function rdAbrev(n){n=String(n||'');var m=n.match(/^Proc\.\s*(\S+)/i);if(m)return ('P'+m[1].slice(0,2)).toUpperCase();if(/^Dir\./i.test(n))return 'DH';if(/^Ética/i.test(n))return 'ÉTI';return n.slice(0,3).toUpperCase();}
function rdPolar(cx,cy,r,a){return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function rdGrega(cx,cy,r0,r1,n,cor){var s='',P=[[0,0],[0,.86],[.74,.86],[.74,.3],[.36,.3],[.36,.6],[.56,.6]];
 for(var i=0;i<n;i++){var a0=-Math.PI/2+i*2*Math.PI/n,da=2*Math.PI/n;
  var pts=P.map(function(p){var a=a0+p[0]*da,r=r0+p[1]*(r1-r0);return rdPolar(cx,cy,r,a).map(function(v){return v.toFixed(1);}).join(' ');});
  s+='<path d="M'+pts.join(' L')+'" fill="none" stroke="'+cor+'" stroke-width="2.1" stroke-linejoin="miter"/>';
  var b0=rdPolar(cx,cy,r0,a0),b1=rdPolar(cx,cy,r0,a0+da);s+='<path d="M'+b0[0].toFixed(1)+' '+b0[1].toFixed(1)+' A'+r0+' '+r0+' 0 0 1 '+b1[0].toFixed(1)+' '+b1[1].toFixed(1)+'" fill="none" stroke="'+cor+'" stroke-width="2.1"/>';}
 return s+'<circle cx="'+cx+'" cy="'+cy+'" r="'+(r1+4)+'" fill="none" stroke="'+cor+'" stroke-width="2.4"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r0-4)+'" fill="none" stroke="'+cor+'" stroke-width="2.4"/>';}
function rdArco(cx,cy,ri,re,a0,a1){var p=function(r,a){return rdPolar(cx,cy,r,a).map(function(v){return v.toFixed(2);}).join(' ');},g=(a1-a0)>Math.PI?1:0;
 return 'M'+p(re,a0)+' A'+re+' '+re+' 0 '+g+' 1 '+p(re,a1)+' L'+p(ri,a1)+' A'+ri+' '+ri+' 0 '+g+' 0 '+p(ri,a0)+'Z';}
function rdHTML(){var T=NEO_TINTA,Pp=NEO_PAPEL,cx=200,cy=200,o=[],at=0,volta=1;try{o=ordemCiclo();at=S.est.at%Math.max(1,o.length);volta=S.est.volta||1;}catch(e){}
 var n=o.length,s='<circle cx="200" cy="200" r="198" fill="'+Pp+'"/>'+rdGrega(cx,cy,166,190,36,T);
 if(!n)return '<svg viewBox="0 0 400 400" class="rd-svg">'+s+'<text x="200" y="205" text-anchor="middle" class="rd-vz">inclua disciplinas para montar a roda</text></svg>';
 var da=2*Math.PI/n,gap=Math.min(.03,da*.12);
 o.forEach(function(id,i){var a0=-Math.PI/2+i*da+gap/2,a1=a0+da-gap,feito=i<at,atual=i===at,nm=discNome(id);
  s+='<path d="'+rdArco(cx,cy,116,158,a0,a1)+'" fill="'+(atual?'#c9a045':feito?T:Pp)+'" stroke="'+T+'" stroke-width="1.2" opacity="'+(feito&&!atual?.82:1)+'"><title>'+String(i+1).padStart(2,'0')+' · '+esc(nm)+(atual?' (em curso)':feito?' (feito nesta volta)':'')+'</title></path>';
  var am=(a0+a1)/2,pt=rdPolar(cx,cy,137,am),rot=am*180/Math.PI+90;if(rot>90&&rot<270)rot+=180;
  s+='<text x="'+pt[0].toFixed(1)+'" y="'+pt[1].toFixed(1)+'" transform="rotate('+rot.toFixed(1)+' '+pt[0].toFixed(1)+' '+pt[1].toFixed(1)+')" text-anchor="middle" dominant-baseline="central" class="rd-ab" fill="'+(feito&&!atual?Pp:T)+'">'+esc(rdAbrev(nm))+'</text>';});
 var aa=-Math.PI/2+at*da+da/2,m1=rdPolar(cx,cy,161,aa),m2=rdPolar(cx,cy,159-0,aa);
 s+='<circle cx="'+m1[0].toFixed(1)+'" cy="'+m1[1].toFixed(1)+'" r="5" fill="#c9a045" stroke="'+T+'" stroke-width="1.4"/>';
 s+='<circle cx="200" cy="200" r="108" fill="'+T+'"/><circle cx="200" cy="200" r="100" fill="none" stroke="'+Pp+'" stroke-width=".8" opacity=".5"/>';
 var nome=discNome(o[at]),pal=nome.split(' '),l1=nome,l2='';if(nome.length>13&&pal.length>1){var meio=Math.ceil(pal.length/2);l1=pal.slice(0,meio).join(' ');l2=pal.slice(meio).join(' ');}
 var dias='';try{var pf=(S.quests&&S.quests.prof||[]).filter(function(p){return p.prazo&&/TRF3/.test(p.t);})[0];var pz=pf?pf.prazo:'2027-01-31';dias=Math.max(0,Math.round((new Date(pz+'T12:00:00')-new Date(hoje()+'T12:00:00'))/864e5));}catch(e){}
 s+='<text x="200" y="146" text-anchor="middle" class="rd-k">VOLTA '+volta+' · BLOCO '+(at+1)+' DE '+n+'</text>';
 s+='<text x="200" y="'+(l2?188:200)+'" text-anchor="middle" class="rd-n">'+esc(l1)+'</text>'+(l2?'<text x="200" y="214" text-anchor="middle" class="rd-n">'+esc(l2)+'</text>':'');
 s+='<path d="M150 232 H250" stroke="'+Pp+'" stroke-width=".8" opacity=".6"/><text x="200" y="252" text-anchor="middle" class="rd-k">'+(n-at)+' BLOCOS PARA FECHAR A VOLTA</text>';
 if(dias!=='')s+='<text x="200" y="272" text-anchor="middle" class="rd-k rd-d">'+dias+' DIAS ATÉ A PROVA</text>';
 return '<svg viewBox="0 0 400 400" class="rd-svg" role="img" aria-label="Roda do ciclo: bloco '+(at+1)+' de '+n+', '+esc(nome)+'">'+s+'</svg>';}
function ptPinta(){var est=document.querySelector('#lat-est');if(!est)return;var b=document.getElementById('pt-box');
 if(!b){b=document.createElement('section');b.id='pt-box';b.className='pt';}if(est.firstChild!==b)est.insertBefore(b,est.firstChild);b.className='rd';b.innerHTML=rdHTML();}
/* frontão sobre o banner */
function neoFrontao(){var hb=document.getElementById('hero-box');if(!hb||hb.querySelector('.neo-frontao'))return;var d=document.createElement('div');d.className='neo-frontao';d.setAttribute('aria-hidden','true');
 d.innerHTML='<svg viewBox="0 0 1000 120" preserveAspectRatio="none"><path d="M10 112 L500 10 L990 112Z" fill="'+NEO_PAPEL+'" stroke="'+NEO_TINTA+'" stroke-width="2"/><path d="M60 104 L500 22 L940 104Z" fill="none" stroke="'+NEO_TINTA+'" stroke-width="1"/>'+
  '<circle cx="500" cy="72" r="20" fill="none" stroke="'+NEO_TINTA+'" stroke-width="1.4"/><circle cx="500" cy="72" r="7" fill="'+NEO_TINTA+'"/>'+[0,1,2,3,4,5,6,7,8,9,10,11].map(function(i){var a=i*Math.PI/6;return '<path d="M'+(500+Math.cos(a)*24)+' '+(72+Math.sin(a)*24)+' L'+(500+Math.cos(a)*31)+' '+(72+Math.sin(a)*31)+'" stroke="'+NEO_TINTA+'" stroke-width="1.4"/>';}).join('')+
  '<text x="330" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="17" letter-spacing="6" fill="'+NEO_TINTA+'">ASTRONÁUTICA</text><text x="670" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="17" letter-spacing="6" fill="'+NEO_TINTA+'">CHALÉ VII</text></svg>'+
  '<div class="neo-arquitrave"></div>';
 var sl=hb.querySelector('.bn-slot');hb.insertBefore(d,sl||hb.firstChild);}
function rtNovoHab(){var rt=document.querySelector('.wrap > div.rt');if(!rt||rt.querySelector('.rt-novo'))return;var cab=rt.querySelector('.cab');
 var f=document.createElement('div');f.className='rt-novo';f.innerHTML='<input placeholder="novo hábito diário (ex.: 20 min de leitura, academia, sem tela às 22h)" maxlength="34"><button type="button">incluir hábito</button>';
 (cab&&cab.nextSibling)?rt.insertBefore(f,cab.nextSibling):rt.appendChild(f);
 var go=function(){var inp=f.querySelector('input'),v=inp.value.trim();if(!v)return;var hi=document.getElementById('hb-in'),hb=document.getElementById('b-hab');if(!hi||!hb)return;hi.value=v;hb.click();inp.value='';try{pinta();}catch(e){}};
 f.querySelector('button').onclick=go;f.querySelector('input').onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();go();}};}
function neoAplica(){neoImgs();try{rtNovoHab();}catch(e){}['.wrap > div.tb','.wrap > div.rt'].forEach(function(q){var n=document.querySelector(q);if(n)n.classList.add('neo-moldura');});
 ['h-sem','h-rast'].forEach(function(id){var h=document.getElementById(id);if(h)h.classList.add('neo-tit');});try{neoFrontao();}catch(e){}try{ptPinta();}catch(e){}}

/* desfazer a limpeza da semana; se a semana de 23–29/11 ficou vazia sem cópia, devolve o plano dela */
var TB_PLANO_2311={"06":["Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","",""],
 "09":["Rota do dia · Bloco 1","Rota do dia · Bloco 1","Rota do dia · Bloco 1","Rota do dia · Bloco 1","Rota do dia · Bloco 1","Comprar máquina + itens","Estudo TRF3 · revisão"],
 "12":["Almoço · ligar natação","Almoço · Bloco 2","Almoço · Bloco 2","Almoço · Bloco 2","Almoço · Bloco 2","Almoço · descanso",""],
 "15":["Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Quarto: montar e fixar","Planejar semana 30/11"],
 "18":["Achar academia no trajeto","Natação (a confirmar)","Academia","Natação (a confirmar)","Livre","Livre","Livre"],
 "21":["Quarto: triar e descartar","Quarto: definir layout","Pesquisar máquina lavar","Quarto: guardar por zona","Livre · games","",""]};
function tbVazia(){var dd=tbSemana();return !Object.keys(S.tb||{}).some(function(k){return dd.indexOf(k.split('|')[0])>=0&&S.tb[k];});}
function tbDesfazHTML(){var B=S.tbBak,dd=tbSemana(),temBak=B&&B.itens&&Object.keys(B.itens).some(function(k){return dd.indexOf(k.split('|')[0])>=0;});
 var plano=dd[0]==='2026-11-23';if(!tbVazia()&&!temBak)return '';
 if(temBak&&!tbVazia())return '<div class="tb-desfaz"><span>Semana limpa há pouco?</span><button type="button" data-tb-desfaz>desfazer a limpeza</button><button type="button" data-tb-esq>dispensar</button></div>';
 if(temBak||plano)return '<div class="tb-desfaz"><span>A grade desta semana está vazia.</span><button type="button" data-tb-desfaz>'+(temBak?'desfazer a limpeza':'restaurar o plano da semana 23–29/11')+'</button></div>';return '';}
function tbDesfazPinta(){var tb=document.querySelector('.wrap > div.tb');if(!tb)return;var w=tb.querySelector('.tb-desfaz-w');if(!w){w=document.createElement('div');w.className='tb-desfaz-w';var cab=tb.querySelector('.tbcab');cab?cab.insertAdjacentElement('afterend',w):tb.insertBefore(w,tb.firstChild);
  w.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
   if(b.dataset.tbEsq!=null){delete S.tbBak;grava();tbDesfazPinta();return;}
   if(b.dataset.tbDesfaz!=null){var B=S.tbBak,dd=tbSemana();S.tb=S.tb||{};
    if(B&&B.itens){Object.keys(B.itens).forEach(function(k){if(!S.tb[k])S.tb[k]=B.itens[k];});delete S.tbBak;}
    else if(dd[0]==='2026-11-23'){Object.keys(TB_PLANO_2311).forEach(function(f){TB_PLANO_2311[f].forEach(function(t,i){var id=dd[i]+'|'+f;if(t&&!S.tb[id])S.tb[id]=t;});});}
    try{anota('Grade semanal restaurada.',0,false);}catch(z){}grava();pinta();}});}
 w.innerHTML=tbDesfazHTML();}
(function(){var p0=pinta;pinta=function(){p0();try{tbDesfazPinta();}catch(e){}};})();
setTimeout(function(){try{tbDesfazPinta();}catch(e){}},500);

/* ---------- Agenda Google integrada de verdade (endereço secreto iCal) ----------
   A função agenda-ics do Supabase busca o .ics; aqui o app lê os eventos e põe na Grade semanal,
   no spread do mês e no cartão da Agenda. Recorrências diárias, semanais, mensais e anuais são expandidas. */
var AG_FN='https://gubpygurtxadsncthttg.supabase.co/functions/v1/agenda-ics?u=';
var AG={ev:[],erro:'',quando:0};
function agIcsUrl(){var a=latApps();return a.ics||'';}
function agData(v,tz){v=String(v||'');var m=v.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?/);if(!m)return null;
 if(!m[4])return {d:new Date(+m[1],+m[2]-1,+m[3]),dia:true};
 if(m[7])return {d:new Date(Date.UTC(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6])),dia:false};
 return {d:new Date(+m[1],+m[2]-1,+m[3],+m[4],+m[5],+m[6]),dia:false};}
function agParse(txt){var L=String(txt).replace(/\r?\n[ \t]/g,'').split(/\r?\n/),out=[],e=null;
 L.forEach(function(l){if(l==='BEGIN:VEVENT'){e={};return;}if(l==='END:VEVENT'){if(e&&e.ini)out.push(e);e=null;return;}if(!e)return;
  var i=l.indexOf(':');if(i<0)return;var k=l.slice(0,i),v=l.slice(i+1),nome=k.split(';')[0];
  if(nome==='SUMMARY')e.t=v.replace(/\\,/g,',').replace(/\;/g,';').replace(/\\n/gi,' ');
  else if(nome==='DTSTART')e.ini=agData(v);else if(nome==='DTEND')e.fim=agData(v);else if(nome==='RRULE')e.rr=v;
  else if(nome==='EXDATE'){e.ex=(e.ex||[]);v.split(',').forEach(function(x){var d=agData(x);if(d)e.ex.push(d.d.toDateString());});}
  else if(nome==='STATUS')e.st=v;else if(nome==='LOCATION')e.loc=v.replace(/\\,/g,',');});
 return out.filter(function(x){return x.st!=='CANCELLED';});}
function agExpande(E,de,ate){var r=[];E.forEach(function(e){var dur=e.fim?(e.fim.d-e.ini.d):(e.ini.dia?864e5:36e5);
 var push=function(d){if(d>=de&&d<=ate&&!(e.ex&&e.ex.indexOf(d.toDateString())>=0))r.push({t:e.t||'(sem título)',ini:new Date(d),fim:new Date(d.getTime()+dur),dia:e.ini.dia,loc:e.loc||''});};
 if(!e.rr){if(e.ini.d<=ate&&new Date(e.ini.d.getTime()+dur)>=de)r.push({t:e.t||'(sem título)',ini:e.ini.d,fim:new Date(e.ini.d.getTime()+dur),dia:e.ini.dia,loc:e.loc||''});return;}
 var P={};e.rr.split(';').forEach(function(p){var kv=p.split('=');P[kv[0]]=kv[1];});var iv=+(P.INTERVAL||1),cnt=P.COUNT?+P.COUNT:1e9,ate2=P.UNTIL?(agData(P.UNTIL)||{d:ate}).d:ate;if(ate2>ate)ate2=ate;
 var DIAS={SU:0,MO:1,TU:2,WE:3,TH:4,FR:5,SA:6},by=P.BYDAY?P.BYDAY.split(',').map(function(x){return DIAS[x.slice(-2)];}):null,n=0,d=new Date(e.ini.d),g=0;
 while(d<=ate2&&n<cnt&&g<3000){g++;
  if(P.FREQ==='WEEKLY'&&by){var semIni=new Date(d);semIni.setDate(d.getDate()-d.getDay());
   for(var k=0;k<7&&n<cnt;k++){var x=new Date(semIni);x.setDate(semIni.getDate()+k);x.setHours(e.ini.d.getHours(),e.ini.d.getMinutes(),0,0);if(x<e.ini.d||x>ate2||by.indexOf(x.getDay())<0)continue;n++;push(x);}
   d.setDate(d.getDate()-d.getDay()+7*iv);d.setHours(e.ini.d.getHours(),e.ini.d.getMinutes(),0,0);continue;}
  n++;push(d);var nd=new Date(d);
  if(P.FREQ==='DAILY')nd.setDate(d.getDate()+iv);else if(P.FREQ==='WEEKLY')nd.setDate(d.getDate()+7*iv);else if(P.FREQ==='MONTHLY')nd.setMonth(d.getMonth()+iv);else if(P.FREQ==='YEARLY')nd.setFullYear(d.getFullYear()+iv);else break;d=nd;}});
 return r.sort(function(a,b){return a.ini-b.ini;});}
function agBusca(forca){var u=agIcsUrl();if(!u){AG.ev=[];return;}var k='astro_ics',c=null;try{c=JSON.parse(localStorage.getItem(k)||'null');}catch(e){}
 var usa=function(txt){var E=agParse(txt),de=new Date();de.setHours(0,0,0,0);de.setDate(de.getDate()-14);var ate=new Date();ate.setDate(ate.getDate()+120);AG.ev=agExpande(E,de,ate);AG.erro='';AG.quando=Date.now();agPintaTudo();};
 if(!forca&&c&&c.u===u&&Date.now()-c.t<20*60e3){usa(c.txt);return;}
 fetch(AG_FN+encodeURIComponent(u)).then(function(r){return r.text().then(function(t){if(!r.ok)throw new Error(t||('erro '+r.status));return t;});})
  .then(function(t){try{localStorage.setItem(k,JSON.stringify({u:u,t:Date.now(),txt:t}));}catch(e){}usa(t);})
  .catch(function(e){AG.erro=String(e.message||e);if(c&&c.u===u)usa(c.txt);else agPintaTudo();});}
function agDoDia(d){var a=new Date(d+'T00:00:00'),b=new Date(d+'T23:59:59');return AG.ev.filter(function(x){return x.ini<=b&&x.fim>a&&!(x.dia&&x.fim.getTime()===a.getTime());});}
function agHora(x){return x.dia?'dia todo':String(x.ini.getHours()).padStart(2,'0')+':'+String(x.ini.getMinutes()).padStart(2,'0');}
var AG_FX=['06','09','12','15','18','21'];
function agFaixa(h){var f='06';AG_FX.forEach(function(x){if(h>=+x)f=x;});return f;}
/* na Grade semanal: compromissos com hora vão para a faixa; os de dia inteiro, para o cabeçalho do dia */
function agNaGrade(){var g=document.getElementById('tb-g');if(!g)return;Array.prototype.forEach.call(g.querySelectorAll('.ag-ev,.ag-dia'),function(n){n.remove();});if(!AG.ev.length)return;
 var dias=tbSemana(),heads=g.querySelectorAll('.tbh');dias.forEach(function(d,i){var evs=agDoDia(d),hd=heads[i+1];
  var tod=evs.filter(function(x){return x.dia;});if(hd&&tod.length){var s=document.createElement('span');s.className='ag-dia';s.title=tod.map(function(x){return x.t;}).join(' · ');s.textContent=tod.length===1?tod[0].t:tod.length+' eventos';hd.appendChild(s);}
  evs.filter(function(x){return !x.dia;}).forEach(function(x){var f=agFaixa(x.ini.getHours()),c=g.querySelector('[data-tb="'+d+'|'+f+'"]');if(!c)return;var cell=c.parentNode,s=document.createElement('span');s.className='ag-ev';s.title=agHora(x)+' · '+x.t+(x.loc?' · '+x.loc:'');s.textContent=agHora(x)+' '+x.t;cell.appendChild(s);});});}
function agListaHTML(dias){var hj=new Date();hj.setHours(0,0,0,0);var ate=new Date(hj);ate.setDate(hj.getDate()+dias);var L=AG.ev.filter(function(x){return x.fim>hj&&x.ini<ate;}).slice(0,40),ult='',h='';
 if(!L.length)return '<p class="lat-n">Nada marcado nos próximos '+dias+' dias.</p>';
 var DS=['dom','seg','ter','qua','qui','sex','sáb'];L.forEach(function(x){var dd=new Date(Math.max(x.ini,hj)),k=dd.toDateString();if(k!==ult){ult=k;h+='<div class="ag-dt">'+(k===hj.toDateString()?'hoje':DS[dd.getDay()])+' · '+dd.getDate()+'/'+(dd.getMonth()+1)+'</div>';}
  h+='<div class="ag-it"><b>'+esc(agHora(x))+'</b><span>'+esc(x.t)+'</span></div>';});return '<div class="ag-lista">'+h+'</div>';}
function agPintaTudo(){try{agNaGrade();}catch(e){}try{compPinta();}catch(e){}var c=document.getElementById('lat-ag');if(c&&agIcsUrl())latTroca('lat-ag',latAgenda());try{wsPinta();}catch(e){}try{rodBarra();}catch(e){}}
(function(){var p0=pinta;pinta=function(){p0();try{agNaGrade();}catch(e){}};})();


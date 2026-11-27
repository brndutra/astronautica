/* ======================= POSTO DE COMANDO · templo helênico =======================
   Quatro cartões emoldurados à grega: Aspís de Apolo (foco) com os Ritos de Héstia (hábitos do dia),
   Arena sob Têmis (gabinete e tarefas), Campo de arquearia sob Atena (estudos do Laptop) e Hermes (captura e agenda). */
var OP_IC={
 sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
 chama:'<path d="M12 21c-4 0-6.5-2.6-6.5-6 0-4 3.5-5.5 3.5-9.5 2.5 1.5 4 3.5 4 6 1-1 1.5-2.2 1.5-3.5 2.3 2 4 4.6 4 7 0 3.4-2.5 6-6.5 6z"/><path d="M12 21c-1.6 0-2.8-1.2-2.8-2.8 0-1.8 1.6-2.6 2.8-4.2 1.2 1.6 2.8 2.4 2.8 4.2 0 1.6-1.2 2.8-2.8 2.8z"/>',
 balanca:'<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-3 6c0 1.7 1.3 3 3 3s3-1.3 3-3zM19 7l-3 6c0 1.7 1.3 3 3 3s3-1.3 3-3z"/>',
 arco:'<path d="M6 3c7 2 11 6 13 13"/><path d="M6 3l13 13"/><path d="M3 21l10-10M3 21v-4M3 21h4"/>',
 asas:'<path d="M12 6v15M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3-6 2-6 4 6 2 6 4-1.3 3-3 3"/><path d="M12 6c-2-3-6-3.5-9-2 2 .5 3.5 1.8 4 3.5M12 6c2-3 6-3.5 9-2-2 .5-3.5 1.8-4 3.5"/>',
 carro:'<circle cx="7" cy="17" r="3.5"/><path d="M7 13.5v7M3.5 17h7"/><path d="M10 15h7l3-6h-5"/><circle cx="19" cy="5" r="2"/>'};
function opIcone(k){return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(OP_IC[k]||'')+'</svg>';}
function opCab(ic,t,p,extra){return '<header class="op-cab"><span class="op-med">'+opIcone(ic)+'</span><div class="op-cabt"><b>'+t+'</b><small>'+p+'</small></div>'+(extra||'')+'</header>';}
/* Ritos de Héstia: os hábitos de hoje, para preencher com um toque */
function opRitosHTML(){var H=S.hab||[],hj=hoje(),feitos=H.filter(function(x){return (x.hist||[]).indexOf(hj)>=0;}).length;
 var cab=opCab('chama','Tear de Penélope','hábitos de hoje','<span class="op-cont">'+feitos+'/'+H.length+'</span>');
 if(!H.length)return cab+'<p class="op-vz">nenhum rito ainda · crie os hábitos na Casa Grande</p>';
 return cab+'<div class="op-ritos-g">'+H.map(function(x,j){var f=(x.hist||[]).indexOf(hj)>=0,w=0;try{w=jan7(x.hist);}catch(e){}
  return '<button type="button" class="op-rito'+(f?' on':'')+'" data-ophb="'+j+'"'+(f?' disabled':'')+' title="'+esc(x.nome)+' · '+w+' de 7 dias"><i>'+(f?'✓':'')+'</i><span>'+esc(x.nome)+'</span><em>'+w+'/7</em></button>';}).join('')+'</div>';}
/* Campo de arquearia: concurso, ciclo, revisões, registros e leitura */
function opEstudoHTML(){var h=hoje(),dias=0,g={pct:0},sem=0,hj=0,q=0,c={};
 try{c=ccBase();dias=Math.max(0,Math.round((ccDia(CONC.prova)-ccDia(h))/864e5));g=ccGeral();sem=ccSemanaMin();hj=ccHojeMin();q=c.q[ccSemKey()]|0;}catch(e){}
 var C=typeof CONC!=='undefined'?CONC:{minDia:60,metaHoras:10,metaQuest:100};
 var bar=function(f){return '<span class="op-bar"><i style="width:'+Math.round(Math.min(1,f)*100)+'%"></i></span>';};
 var hd=opCab('arco','Campo de arquearia','estudos · enigmas da Esfinge','<span class="op-cd"><b>'+dias+'</b><small>dias · prova</small></span>');
 var k='<div class="op-kp"><div><small>hoje</small><b>'+hj+'<i>/'+C.minDia+' min</i></b>'+bar(hj/(C.minDia||1))+'</div>'+
  '<div><small>semana</small><b>'+String(Math.round(sem/6)/10).replace('.',',')+'<i>/'+String(C.metaHoras).replace('.',',')+' h</i></b>'+bar(sem/60/(C.metaHoras||1))+'</div>'+
  '<div><small>edital</small><b>'+g.pct+'<i>%</i></b>'+bar(g.pct/100)+'</div>'+
  '<div><small>questões</small><b>'+q+'<i>/'+C.metaQuest+'</i></b><span class="op-qb"><button type="button" data-opccq="1">+1</button><button type="button" data-opccq="10">+10</button></span></div></div>';
 var E=S.est||{},at=null,nm='',ret='';try{at=blocoAtual();nm=at?discNome(at):'';}catch(e){}
 if(at)(E.blocos||[]).some(function(b){if(b.disc===at&&b.prox){ret=b.prox;return true;}return false;});
 var ci='<div class="op-grp"><span class="op-k">flecha da vez · volta '+(E.volta||1)+'</span>'+(at?'<b class="op-disc">'+esc(nm)+'</b>'+(ret?'<p class="op-ret">retomar: '+esc(ret)+'</p>':'<p class="op-ret op-vz">sem retomada escrita</p>'):'<p class="op-vz">roda vazia · inclua disciplinas no Laptop</p>')+
  '<div class="op-bt2"><button type="button" data-opf="ciclo">foco no ciclo</button><button type="button" data-opreg>registrar bloco</button></div></div>';
 var M=(E.mapas||[]).filter(function(m){try{return !m.next||diaN(m.next)<=hojeN();}catch(e){return false;}});
 var rv='<div class="op-grp"><span class="op-k">revisões de hoje · '+M.length+'</span><ul class="op-rv">'+(M.slice(0,3).map(function(m){
   return '<li><span>'+esc(m.nome)+'</span><button type="button" data-opmo="'+esc(m.id)+'" title="revisado">✓</button><button type="button" data-opmf="'+esc(m.id)+'" title="falhou">✗</button></li>';}).join('')||'<li class="op-vz">nada para revisar hoje</li>')+(M.length>3?'<li class="op-mais">+'+(M.length-3)+' no Laptop</li>':'')+'</ul></div>';
 var B=(E.blocos||[]).slice(0,2),rg='<div class="op-grp"><span class="op-k">últimos registros</span><ul class="op-rg">'+(B.map(function(b){var dn='';try{dn=discNome(b.disc);}catch(e){}
   return '<li><b>'+esc((b.data||'').slice(8)+'/'+(b.data||'').slice(5,7))+'</b><span>'+esc(dn)+' · '+(b.min|0)+' min'+(b.top?' · '+esc(b.top):'')+'</span></li>';}).join('')||'<li class="op-vz">nenhum bloco registrado</li>')+'</ul></div>';
 var L=(S.ler||[]).filter(function(x){return x.st==='lendo';})[0],lv='';
 if(L){var pct=L.pag?Math.min(100,Math.round((L.at|0)/L.pag*100)):0;lv='<div class="op-grp op-livro"><span class="op-k">biblioteca · lendo</span><b>'+esc(L.tit||'')+'</b>'+(L.pag?'<span class="op-bar"><i style="width:'+pct+'%"></i></span><small>pág. '+(L.at|0)+' de '+L.pag+'</small>':'')+'</div>';}
 return hd+k+ci+rv+rg+lv;}
/* Arena sob Têmis: o gabinete primeiro, depois as tarefas do chalé */
opFazerHTML=(function(f0){return function(){var R=[],meta=0,fh=0;try{R=gabResumo();R.forEach(function(r){meta+=r.meta;fh+=Math.min(r.fh,r.meta);});}catch(e){}
 var extra='<span class="op-cont" title="meta do gabinete hoje">'+(meta?fh+'/'+meta:'—')+'</span>';
 return opCab('balanca','Arena · ofício','gabinete · o Labirinto',extra)+(meta?'<span class="op-bar op-bar-g"><i style="width:'+Math.round(fh/meta*100)+'%"></i></span>':'')+f0.apply(this,arguments);};})(opFazerHTML);
opLadoHTML=(function(f0){return function(){return opCab('asas','Píthos de Pandora','captura e agenda')+f0.apply(this,arguments);};})(opLadoHTML);
opLinhaHTML=(function(f0){return function(){return '<header class="op-cab op-cab-l"><span class="op-med">'+opIcone('carro')+'</span><div class="op-cabt"><b>Clepsidra</b><small>linha do dia</small></div></header>'+f0.apply(this,arguments);};})(opLinhaHTML);
/* reorganiza o Posto em quatro colunas e liga os botões novos */
function opReforma(){var o=document.getElementById('modo-op');if(!o||o.dataset.grego)return;o.dataset.grego='1';o.classList.add('op-grego');
 var g=o.querySelector('.op-g');if(!g)return;
 g.innerHTML='<section class="op-c op-col1"><div class="op-foco">'+opCab('sol','Escudo de Aquiles','foco')+'<div class="op-esc"></div><div class="op-foco-c"></div></div><div class="op-ritos"></div></section>'+
  '<section class="op-c op-fazer"></section><section class="op-c op-estudo"></section><section class="op-c op-lado"></section>';
 var t=o.querySelector('.op-top>div:first-child .op-k');if(t)t.innerHTML='posto de comando · chalé 7 · <span class="op-louro">❦</span>';
 o.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var d=b.dataset;
  if(d.ophb!=null){try{latRegClica('#hb-l [data-hb="'+d.ophb+'"]');}catch(z){var x=document.querySelector('#hb-l [data-hb="'+d.ophb+'"]');if(x)x.click();}setTimeout(opPinta,120);return;}
  if(d.opccq){var q=document.querySelector('#conc [data-ccq="'+d.opccq+'"]');if(q)q.click();setTimeout(opPinta,120);return;}
  if(d.opmo||d.opmf){var a=document.querySelector(d.opmo?'[data-mo="'+d.opmo+'"]':'[data-mf="'+d.opmf+'"]');if(a)a.click();setTimeout(opPinta,120);return;}
  if(d.opreg!=null){opModo(false);try{pdAbre('lap');}catch(z){}setTimeout(function(){var f=document.getElementById('b-ci-and');if(f){if(!document.getElementById('b-cf-ok'))f.click();setTimeout(function(){var k=document.getElementById('b-cf-ok')||f;k.scrollIntoView({block:'center',behavior:'smooth'});var m=document.getElementById('cf-m');if(m)try{m.focus({preventScroll:true});}catch(z){}},120);}},250);return;}});}
(function(){var m0=opMonta;opMonta=function(){var o=m0.apply(this,arguments);try{opReforma();}catch(e){console.error(e);}return o;};
 var p0=opPinta;opPinta=function(){p0.apply(this,arguments);var o=document.getElementById('modo-op');if(!o||!document.body.classList.contains('op-on'))return;
  var a=document.activeElement,foco=a&&o.contains(a)&&/INPUT|TEXTAREA/.test(a.tagName);
  var set=function(sel,h){var n=o.querySelector(sel);if(n&&(n._h!==h||!n.firstChild)&&!(foco&&n.contains(a))){n.innerHTML=h;n._h=h;}};
  try{set('.op-ritos',opRitosHTML());}catch(e){}try{set('.op-estudo',opEstudoHTML());}catch(e){console.error(e);}};})();
/* ---------- Diário de bordo (registro diário de ações e notas) no rodapé, ao lado do registro ---------- */
function rodLog(){var top=document.querySelector('#rod-apps .rod-top'),rd=document.querySelector('.regdia');if(!top||!rd)return;
 var b=document.getElementById('rod-log'),p=document.getElementById('rod-log-pop');
 if(!b){b=document.createElement('button');b.type='button';b.id='rod-log';b.className='rod-log';b.setAttribute('aria-expanded','false');b.title='Diário de bordo · o que aconteceu hoje e notas à mão';
  var rr=document.getElementById('rod-reg');top.insertBefore(b,rr?rr.nextSibling:null);
  p=document.createElement('div');p.id='rod-log-pop';p.className='rod-log-pop';p.hidden=true;p.setAttribute('role','dialog');p.setAttribute('aria-label','Diário de bordo');
  p.innerHTML='<header><span class="rl-med"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h11v13a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2v-1h10v1a2 2 0 0 0 2 2"/><path d="M7 4a2 2 0 0 0-2 2v11M10 8h5M10 11h5M10 14h3"/></svg></span><div><span class="rl-k">diário de bordo</span><b class="rl-d"></b></div><button type="button" class="rl-x" aria-label="fechar">×</button></header><div class="rl-slot"></div>';
  document.body.appendChild(p);
  var fecha=function(){p.hidden=true;b.setAttribute('aria-expanded','false');};
  b.addEventListener('click',function(){var on=p.hidden;p.hidden=!on;b.setAttribute('aria-expanded',String(on));if(on){var i=p.querySelector('#rd-in');if(i)setTimeout(function(){try{i.focus({preventScroll:true});}catch(z){}},60);}});
  p.querySelector('.rl-x').addEventListener('click',fecha);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!p.hidden)fecha();});
  document.addEventListener('click',function(e){if(!p.hidden&&!p.contains(e.target)&&!b.contains(e.target))fecha();});}
 else if(b.parentNode!==top)top.insertBefore(b,(document.getElementById('rod-reg')||{}).nextSibling||null);
 var sl=p.querySelector('.rl-slot');if(rd.parentNode!==sl)sl.appendChild(rd);
 var hj=hoje(),n=(S.log||[]).filter(function(x){return x.dia===hj;}).length,man=(S.log||[]).filter(function(x){return x.dia===hj&&x.man;}).length;
 var h='<span class="cr-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h11v13a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2v-1h10v1a2 2 0 0 0 2 2"/><path d="M7 4a2 2 0 0 0-2 2v11M10 8h5M10 11h5"/></svg></span><span class="cr-lb"><small>diário de bordo</small><b>'+n+(man?' <i>· '+man+' à mão</i>':'')+'</b></span>';
 if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}var d=p.querySelector('.rl-d'),t=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});if(d._t!==t||d.textContent==='' ){d.textContent=t;d._t=t;}}
/* a gaveta "o dia · registro" da Grade sai: o registro mora no rodapé */
diaGaveta=function(){var g=document.getElementById('dia-gav');if(g)g.remove();var tb=document.querySelector('.wrap > div.tb');if(tb)tb.classList.remove('gav-dia');try{rodLog();}catch(e){}};
(function(){var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);try{rodLog();}catch(e){}return x;};})();
setTimeout(function(){try{diaGaveta();}catch(e){}},1300);
/* ---------- avisos do sátiro e do corvo num diálogo próprio, por cima de qualquer tela (templo, Posto, painéis) ---------- */
function aveDlg(){var d=document.getElementById('ave-dlg');if(d)return d;d=document.createElement('dialog');d.id='ave-dlg';d.className='ave-dlg';d.setAttribute('aria-label','Avisos do acampamento');
 d.innerHTML='<div class="ad-lista"></div><footer><button type="button" class="ad-q" data-adq>ver o Conselho</button><button type="button" class="ad-ok" data-adok>ok, ouvi</button></footer>';
 document.body.appendChild(d);var limpa=function(){d.querySelector('.ad-lista').innerHTML='';};
 d.addEventListener('click',function(e){var b=e.target.closest('button');if(!b){if(e.target===d){d.close();}return;}
  if(b.dataset.adok!=null)d.close();else if(b.dataset.adq!=null){d.close();try{if(document.body.classList.contains('op-on'))opModo(false);pdAbre('sat');}catch(z){}}});
 d.addEventListener('close',limpa);return d;}
function aveAvisa(quem,tit,linhas,gab){if(!linhas||!linhas.length)return;var d=aveDlg(),L=d.querySelector('.ad-lista'),s=document.createElement('section');
 s.className='ad-msg ad-'+quem;if(gab)s.dataset.gab='1';
 s.innerHTML=(quem==='corvo'?corvoAve():satAvatar('festa'))+'<div><span class="ad-k">'+esc(tit)+'</span><b>'+(quem==='corvo'?'Crá! Entrega expressa.':'Sully diz')+'</b><ul>'+linhas.map(function(l){return '<li>'+esc(l)+'</li>';}).join('')+'</ul></div>';
 L.appendChild(s);while(L.children.length>4)L.firstChild.remove();
 d.querySelector('.ad-q').hidden=!L.querySelector('[data-gab]');
 if(!d.open){try{d.showModal();}catch(e){d.setAttribute('open','');}}
 try{if(window.Notification&&Notification.permission==='granted'&&document.hidden)new Notification(tit,{body:linhas.join('\n'),tag:'astro-'+quem+'-'+Date.now()});}catch(e){}}
corvoDiz=function(linhas,gab){if(!linhas.length)return;var c=corvoCfg(),hm=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
 c.log.unshift({d:hoje(),h:hm,t:linhas});if(c.log.length>25)c.log.length=25;try{grava();}catch(e){}
 aveAvisa('corvo','Polly McCaw · corvo de Apolo · '+hm,linhas,gab);try{satPinta();}catch(e){}};
satToast=function(t){aveAvisa('satiro','Sully Brookhaven · sátiro do Hékatos',[t],true);};
/* cada cartão do Posto vira um pequeno templo: frontão gravado, colunas com capitel e base na cor do seu deus,
   numeral grego de sorte no topo e uma placa com a foto do lugar do acampamento */
var OP_TEMPLO={
 '.op-l':{st:'ionica',c:'#f6d99a',k:'#8a5a14',num:'Α',img:'templos.jpg',numT:'1 · o primeiro raio de Hélio'},
 '.op-col1':{st:'dorica',c:'#f2c3ab',k:'#9a4a30',num:'Ζ',img:'louros.jpg',numT:'7 · o número de Apolo e do chalé 7'},
 '.op-fazer':{st:'dorica',c:'#d8c0c6',k:'#7a4a58',num:'Γ',img:'anfiteatro.jpg',numT:'3 · as três Moiras do prazo'},
 '.op-estudo':{st:'ionica',c:'#b9c2e8',k:'#4a5590',num:'Θ',img:'arquearia.jpg',numT:'9 · as nove Musas'},
 '.op-lado':{st:'corintia',c:'#efe3b4',k:'#7a6a2a',num:'Η',img:'colina.jpg',numT:'8 · os caminhos de Hermes'}};
var OP_TEMPLO_IM={};
function opTemplo(){var o=document.getElementById('modo-op');if(!o)return;try{neoImgs();}catch(e){}
 Object.keys(OP_TEMPLO).forEach(function(sel){var n=o.querySelector(sel);if(!n||n.dataset.templo)return;var cf=OP_TEMPLO[sel],im;
  try{im=OP_TEMPLO_IM[sel]||(OP_TEMPLO_IM[sel]=colSvgs(cf));}catch(e){return;}
  n.dataset.templo='1';n.classList.add('op-templo');n.dataset.num=cf.num;n.title='';
  n.style.setProperty('--t-cap',im.cap);n.style.setProperty('--t-fuste',im.fuste);n.style.setProperty('--t-base',im.base);n.style.setProperty('--t-ent',im.ent);
  n.style.setProperty('--t-c',cf.c);n.style.setProperty('--t-k',cf.k);n.style.setProperty('--t-foto','url("img/acampamento/'+cf.img+'")');
  });}
(function(){var m0=opMonta;opMonta=function(){var o=m0.apply(this,arguments);try{opTemplo();}catch(e){console.error(e);}return o;};})();
/* fuste próprio para os cartões do Posto: só as linhas verticais (sem traço em cima e embaixo, que esticava e virava bloco escuro) */
function opFuste(P,K){var f='<rect x="12.5" y="0" width="35" height="40" fill="'+P+'"/><path d="M12.5 0V40M47.5 0V40" stroke="'+K+'" stroke-width="1.6"/>';
 for(var i=1;i<6;i++)f+='<rect x="'+(12.5+i*35/6-2)+'" y="0" width="4" height="40" fill="'+K+'" opacity=".22"/>';return neoUrl(f,'0 0 60 40');}
opTemplo=(function(f0){return function(){f0.apply(this,arguments);var o=document.getElementById('modo-op');if(!o)return;
 Object.keys(OP_TEMPLO).forEach(function(sel){var n=o.querySelector(sel),cf=OP_TEMPLO[sel];if(!n||n.dataset.fuste)return;n.dataset.fuste='1';n.style.setProperty('--t-fuste',opFuste(cf.c,cf.k));});};})(opTemplo);
/* quests do gabinete também no Mural de Missões */
function mmGabHTML(){var R=[];try{R=gabResumo().filter(function(r){return r.rest||r.fh;});}catch(e){}
 var meta=0,fh=0;R.forEach(function(r){meta+=r.meta;fh+=Math.min(r.fh,r.meta);});
 var li=R.map(function(r){var ok=r.meta&&r.fh>=r.meta,cls=r.venc&&r.rest?'venc':(r.rest&&r.dias<=2?'perto':'');
  return '<li class="mm-gq '+cls+(ok?' ok':'')+'"><span class="mm-ck mm-auto" aria-hidden="true">'+(ok?'✓':'')+'</span><div><b>'+(r.p==='minutar'?'Minutar':'Corrigir')+(r.meta?' '+r.meta+' hoje':'')+' · pauta de '+gabDM(r.s.date)+'</b>'+
   '<small>'+(r.meta?Math.min(r.fh,r.meta)+'/'+r.meta+' hoje · ':'')+r.ok+'/'+r.tot+' feitas · '+(r.rest?r.rest+' restam · '+(r.venc?'prazo venceu em '+gabDM(r.prazo):'prazo '+gabDM(r.prazo)+' ('+r.dias+' dia'+(r.dias===1?'':'s')+' út'+(r.dias===1?'il':'eis')+')'):'tudo entregue')+'</small>'+
   '<span class="mm-gbar"><i style="width:'+(r.tot?Math.round(r.ok/r.tot*100):0)+'%"></i></span></div></li>';}).join('');
 return '<section class="mm-gab"><header><div><span class="mm-k">Conselho</span><small>tarefas · atribuições de Conselheiro-Chefe · o Labirinto · designações nas pautas do Ex Officio · fecham sozinhas ao bater a meta · +10 XP por entrega</small></div>'+
  '<span class="mm-gcont">'+(meta?fh+'/'+meta+' hoje':'—')+'</span><button type="button" data-satir="1">ver processos</button></header>'+
  '<ul>'+(li||'<li class="mm-vz">'+(GAB.em?'Nada com o seu nome em aberto nas pautas publicadas.':'Sully ainda está farejando as pautas…')+'</li>')+'</ul></section>';}
mmHTML=(function(f0){return function(){var h=f0.apply(this,arguments),g='';try{g=mmGabHTML();}catch(e){}return h.replace('<div class="mm-g">',g+'<div class="mm-g">');};})(mmHTML);
satRepinta=(function(f0){return function(){f0.apply(this,arguments);try{var b=document.getElementById('mm-box'),a=document.activeElement;if(b&&!(a&&b.contains(a)&&a.tagName==='INPUT')){var s=b.querySelector('.mm-gab'),h=mmGabHTML();if(s){var t=document.createElement('div');t.innerHTML=h;if(s.outerHTML!==t.firstChild.outerHTML)s.replaceWith(t.firstChild);}else mmPinta();}}catch(e){}};})(satRepinta);
/* ======================= papéis: Kórax = gabinete; Kálamo = a vida do Hékatos =======================
   O corvo é o mensageiro dos deuses para quem o Chase faz umas pontas: só ele fala do gabinete.
   O sátiro cuida do resto: ritos, estudo, revisões e foco. */
function satDia(){var H=S.hab||[],hj=hoje(),f=H.filter(function(x){return (x.hist||[]).indexOf(hj)>=0;}),p=H.filter(function(x){return (x.hist||[]).indexOf(hj)<0;});
 var m=0,meta=90,disc='',rv=[],fo=null,fn=0;try{m=ccHojeMin();meta=CONC.minDia||90;}catch(e){}
 try{var at=blocoAtual();disc=at?discNome(at):'';}catch(e){}
 try{rv=((S.est&&S.est.mapas)||[]).filter(function(x){return !x.next||diaN(x.next)<=hojeN();});}catch(e){}
 try{fo=tdD().foco;fn=tdHojeFoco().n;}catch(e){}
 return {H:H,feitos:f,pend:p,min:m,meta:meta,disc:disc,rv:rv,foco:fo,blocos:fn};}
function satLista(arr,n){var nomes=arr.slice(0,n).map(function(x){return x.nome||x;});return nomes.join(', ')+(arr.length>n?' e mais '+(arr.length-n):'');}
satHumor=function(){var D=satDia(),h=new Date().getHours();
 var ritosOk=D.H.length&&!D.pend.length,estOk=D.min>=D.meta;
 if(ritosOk&&estOk)return 'festa';
 if(h>=21&&D.min===0&&D.pend.length>D.H.length/2)return 'panico';
 if((h>=18&&D.pend.length)||(h>=15&&D.min===0)||D.rv.length>2)return 'alerta';
 return 'calmo';};
satFala=function(){var D=satDia(),h=new Date().getHours(),f=[];
 f.push(h<12?'Bom dia, cara.':h<18?'Boa tarde, cara.':'Noite, cara.');
 if(D.foco)f.push('Você está em foco: '+(D.foco.rot||'bloco')+'. Fico de olho nas harpias.');
 if(D.H.length){if(!D.pend.length)f.push('Todos os '+D.H.length+' ritos de hoje feitos.');else f.push('Ritos: '+D.feitos.length+'/'+D.H.length+'. Falta'+(D.pend.length>1?'m':'')+' '+satLista(D.pend,3)+'.');}
 if(D.min>=D.meta)f.push('Esfinge: '+D.min+' min hoje, meta cumprida.');
 else f.push('Esfinge: '+D.min+'/'+D.meta+' min hoje'+(D.disc?'; a flecha da vez é '+D.disc:'')+'.');
 if(D.rv.length)f.push(D.rv.length+' revis'+(D.rv.length>1?'ões vencem':'ão vence')+' hoje.');
 if(D.blocos)f.push(D.blocos+' bloco'+(D.blocos>1?'s':'')+' de foco no escudo.');
 return {h:satHumor(),t:f.join(' ')};};
/* recados do corvo que não precisam de diálogo (entregas): ficam só nos recados */
function corvoNota(t){var c=corvoCfg(),hm=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});c.log.unshift({d:hoje(),h:hm,t:[t]});if(c.log.length>25)c.log.length=25;}
satXP=function(){var c=satCfg(),hj=hoje(),antes=satNivel(c.xp).n,ganho=0,novos={};
 GAB.ses.forEach(function(s){s.itens.forEach(function(i){if(!i.em)return;var k=s.date+'|'+i.cnj+'|'+i.p;if(c.feitos[k])return;c.feitos[k]=s.date;
  if(c.semente){ganho+=10;var nk=i.p+'|'+s.date;novos[nk]=(novos[nk]||0)+1;}});});
 if(!c.semente)c.semente=hj;
 var R=gabResumo(),meta=0,fh=0;R.forEach(function(r){meta+=r.meta;fh+=Math.min(r.fh,r.meta);});
 if(meta>0&&fh>=meta&&!c.metas[hj]){c.metas[hj]=1;ganho+=30;}
 Object.keys(c.feitos).forEach(function(k){if(c.feitos[k]<gabMais(hj,-90))delete c.feitos[k];});
 Object.keys(c.metas).forEach(function(k){if(k<gabMais(hj,-60))delete c.metas[k];});
 var ks=Object.keys(novos);if(ks.length)corvoNota('Entregas registradas no gabinete: '+ks.map(function(k){var p=k.split('|'),n=novos[k];return n+' '+(p[0]==='minutar'?'minuta'+(n>1?'s':''):'correç'+(n>1?'ões':'ão'))+' ('+gabDM(p[1])+')';}).join(', ')+'. +'+(ganho)+' XP para o Sully.');
 if(ganho){c.xp+=ganho;var nv=satNivel(c.xp);if(nv.n>antes)satToast('Subi para o nível '+nv.n+' · '+nv.nome+'. Sua trilha está ficando mais segura, Hékatos.');}
 try{grava();}catch(e){}try{corvoChecar();}catch(e){console.error(e);}};
/* XP da vida: rito +5, cada 10 min de estudo +2, bloco de foco +5, revisão feita +3 */
function satPessoal(){var c=satCfg(),hj=hoje(),D=satDia();c.dia=c.dia||{};
 var rv=0;try{rv=((S.est&&S.est.mapas)||[]).filter(function(x){return x.ult===hj;}).length;}catch(e){}
 var agora={r:D.feitos.length,m:Math.floor(D.min/10),f:D.blocos,v:rv};
 if(!c.pesSeed){c.pesSeed=hj;c.dia[hj]=agora;try{grava();}catch(e){}return;}
 var st=c.dia[hj]||(c.dia[hj]={r:0,m:0,f:0,v:0}),ganho=0,antes=satNivel(c.xp).n;
 ganho+=Math.max(0,agora.r-st.r)*5+Math.max(0,agora.m-st.m)*2+Math.max(0,agora.f-st.f)*5+Math.max(0,agora.v-(st.v|0))*3;
 c.dia[hj]={r:Math.max(st.r,agora.r),m:Math.max(st.m,agora.m),f:Math.max(st.f,agora.f),v:Math.max(st.v|0,agora.v)};
 Object.keys(c.dia).forEach(function(k){if(k<gabMais(hj,-3))delete c.dia[k];});
 if(ganho){c.xp+=ganho;var nv=satNivel(c.xp);if(nv.n>antes)satToast('Subi para o nível '+nv.n+' · '+nv.nome+'. Cada rito seu é um passo meu.');try{grava();}catch(e){}try{satPinta();}catch(e){}}}
/* lembretes do sátiro: só da vida, uma vez por motivo no dia */
function satLembra(){var c=satCfg(),hj=hoje(),h=new Date().getHours(),D=satDia(),L=[];c.vistos=c.vistos||{};
 var uma=function(k,t){k=k+'|'+hj;if(c.vistos[k])return;c.vistos[k]=hj;L.push(t);};
 if(h>=9&&D.rv.length)uma('rv',(D.rv.length>1?D.rv.length+' revisões vencem':'Uma revisão vence')+' hoje no Campo de arquearia: '+satLista(D.rv,3)+'.');
 if(h>=10&&D.H.length&&!D.feitos.length)uma('r10','Nenhum rito marcado ainda. Comece pelo mais fácil: '+(D.pend[0]&&D.pend[0].nome)+'.');
 if(h>=15&&D.min===0&&D.disc)uma('e15','Nenhuma flecha na Esfinge hoje. Que tal 25 min de '+D.disc+' antes do jantar?');
 if(h>=20&&D.pend.length)uma('r20','Falta'+(D.pend.length>1?'m':'')+' '+D.pend.length+' rito'+(D.pend.length>1?'s':'')+': '+satLista(D.pend,4)+'. Dá tempo antes do toque de recolher.');
 if(D.H.length&&!D.pend.length)uma('rok','Todos os ritos de hoje feitos. Isso merece uma latinha de refri. Para comer, claro.');
 if(D.min>=D.meta)uma('eok','Meta de estudo cumprida: '+D.min+' min. A Esfinge recuou um passo.');
 Object.keys(c.vistos).forEach(function(k){if(c.vistos[k]<gabMais(hj,-7))delete c.vistos[k];});
 if(L.length){try{grava();}catch(e){}aveAvisa('satiro','Sully Brookhaven · sátiro do Hékatos',L,false);}}
function satCiclo(){try{satPessoal();}catch(e){console.error(e);}try{satLembra();}catch(e){console.error(e);}}
setTimeout(satCiclo,2500);setInterval(satCiclo,60000);
window.KALAMO.fala=function(){return satFala();};window.KALAMO.ciclo=satCiclo;
(function(){var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);try{satPessoal();}catch(e){}return x;};})();
/* a ficha conta como o sátiro sobe */
satFicha=(function(f0){return function(){return f0.apply(this,arguments).replace('+10 XP por minuta ou correção sua entregue · +30 XP quando a meta do dia fecha','rito +5 · cada 10 min de estudo +2 · bloco de foco +5 · revisão +3 · entrega no gabinete +10 · meta do gabinete +30')
 .replace('manter o Hékatos vivo, inteiro e dentro do prazo','cuidar do Hékatos: ritos, estudo, foco e descanso. Do gabinete quem fala é o corvo.');};})(satFicha);
/* ======================= companheiros com sotaque americano =======================
   Sully Brookhaven: sátiro aquariano de Long Island (Aquário, a Casa 11 do Hékatos), o protetor.
   Polly McCaw (Pollux): corvo geminiano de Apolo, entregador expresso dos deuses do gabinete. */
satFicha=function(){var c=satCfg(),nv=satNivel(c.xp);
 return '<div class="sat-ficha">'+satAvatar(satHumor())+'<div class="sat-id"><span class="sat-k">sátiro protetor do Hékatos · Brookhaven, Long Island</span><b class="sat-nm">Sully Brookhaven</b>'+
  '<span class="sat-nv">nível '+nv.n+' · '+esc(nv.nome)+'</span><div class="sat-xp" title="'+c.xp+' XP"><i style="width:'+nv.pct+'%"></i></div><small>'+c.xp+' XP'+(nv.ate?' · faltam '+(nv.ate-c.xp)+' para '+esc(SAT_NV[nv.n][1]):' · nível máximo')+'</small></div></div>'+
  '<dl class="sat-tr"><dt>céu</dt><dd>Sol em Aquário, Lua em Peixes. Aquário é o signo da sua Casa 11, a dos amigos: ele é o amigo que o seu mapa pede. "Sully" vem de Sadalsuud, a estrela de Aquário chamada "a sorte das sortes"</dd>'+
  '<dt>origem</dt><dd>cresceu nos brejos de Brookhaven, a meia hora do acampamento. O Conselho o mandou buscar você em Austin; ele odiou o calor do Texas e nunca mais tirou o boné</dd>'+
  '<dt>dom</dt><dd>fareja monstro e procrastinação; sente o Hotel Lótus a três quarteirões</dd>'+
  '<dt>mania</dt><dd>inventa engenhocas com lata reciclada e grava um podcast para as dríades que ninguém pediu</dd>'+
  '<dt>fraqueza</dt><dd>latinha de refrigerante, que ele come junto com a lata, e enchiladas de posto de gasolina</dd>'+
  '<dt>juramento</dt><dd>cuidar do Hékatos: ritos, estudo, foco e descanso. Do gabinete quem fala é a Polly</dd>'+
  '<dt>como sobe</dt><dd>rito +5 · cada 10 min de estudo +2 · bloco de foco +5 · revisão +3 · entrega no gabinete +10 · meta do gabinete +30</dd></dl>';};
satPainelHTML=(function(f0){return function(){return f0.apply(this,arguments).replace('<b>Polly McCaw, corvo de Apolo</b>',
 '<b>Polly McCaw, corvo de Apolo</b><small class="cv-bio">Sol em Gêmeos, ascendente em Libra · entregador expresso dos deuses do gabinete · batizado Pollux, odeia que o chamem de papagaio</small>');};})(satPainelHTML);
/* ======================= os gêmeos McCaw =======================
   Polly (Pollux, o imortal) traz as entregas e avisos; Cass (Castor, o gêmeo mortal) traz as más notícias:
   prazo vencido e meta atrasada. Como no mito, dividem a imortalidade: um dia cada um no céu. */
function corvoAveG(cass){var s=corvoAve();if(!cass)return s;return s.replace('fill="#e8a33c"','fill="#b4463a"').replace('class="cv-ave"','class="cv-ave cv-cass"').replace('</svg>','<path d="M30 20c4-3 10-3 14 0" stroke="#b4463a" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>');}
var CV_RUIM=/vencid|venceu|São 16h|atrasad/i;
corvoDiz=function(linhas,gab){if(!linhas.length)return;var c=corvoCfg(),hm=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
 var ruins=linhas.filter(function(l){return CV_RUIM.test(l);}),boas=linhas.filter(function(l){return !CV_RUIM.test(l);});
 if(boas.length)c.log.unshift({d:hoje(),h:hm,t:boas,q:'polly'});if(ruins.length)c.log.unshift({d:hoje(),h:hm,t:ruins,q:'polly'});if(c.log.length>25)c.log.length=25;try{grava();}catch(e){}
 if(boas.length)aveAvisa('corvo','Polly McCaw · corvo de Apolo · '+hm,boas,gab);
 if(ruins.length)aveAvisa('cass','Polly McCaw · corvo de Apolo · '+hm,ruins,gab);
 try{satPinta();}catch(e){}};
aveAvisa=(function(f0){return function(quem,tit,linhas,gab){if(quem!=='cass')return f0.apply(this,arguments);
 f0.call(this,'corvo',tit,linhas,gab);var d=document.getElementById('ave-dlg'),L=d&&d.querySelector('.ad-lista'),s=L&&L.lastElementChild;
 if(s){s.classList.remove('ad-corvo');s.classList.add('ad-cass');var sv=s.querySelector('svg');var b=s.querySelector('b');if(b)b.textContent='Crá. Notícia ruim, mas melhor saber agora.';}};})(aveAvisa);
satPainelHTML=(function(f0){return function(){var h=f0.apply(this,arguments);
 h=h.replace('<span class="sat-k">recados do corvo</span><b>Polly McCaw, corvo de Apolo</b>','<span class="sat-k">recados do corvo</span><b>Polly McCaw, corvo de Apolo</b>')
  .replace(/<small class="cv-bio">[^<]*<\/small>/,'<small class="cv-bio">Sol em Gêmeos, ascendente em Libra · traz as entregas, os avisos e também as notícias ruins · tem um gêmeo, Cass, que fica no ninho · aparenta 36 · photoplayer: Chris Colfer</small>');
 return h;};})(satPainelHTML);
satFicha=(function(f0){return function(){return f0.apply(this,arguments).replace('<dt>origem</dt>','<dt>idade</dt><dd>58 anos de sátiro, aparenta 29: sátiros envelhecem na metade do ritmo dos humanos</dd><dt>photoplayer</dt><dd>Jeremy Shada (Boise, Idaho; nascido em 21/01/1997, aquariano de carteirinha)</dd><dt>origem</dt>');};})(satFicha);
/* ======================= o fundo do Hall das Epopeias =======================
   Sully é Sátiro Protetor do Comitê dos Cascos Fendidos (o sindicato dos sátiros do Monte Ida);
   os níveis seguem a hierarquia do Comitê. Os gêmeos McCaw descendem do Corvus, o corvo que Apolo
   mandou buscar água na Cratera. */
SAT_NV.splice(0,SAT_NV.length,[0,'Cabrito do Monte Ida'],[100,'Sátiro Protetor Júnior'],[300,'Sátiro Protetor Sênior'],[600,'Sátiro Buscador'],[1000,'Sátiro Ancião'],[1600,'Voz do Comitê dos Cascos Fendidos']);
/* rosto do Sully: cachos ruivos, sardas, chifres curvos, camiseta vermelha com girassol e violão pintado de flores */
satAvatar=function(humor){humor=humor||'calmo';
 var boca={calmo:'<path d="M27 43c3 2.4 7 2.4 10 0"/>',alerta:'<path d="M28 44h8"/>',panico:'<ellipse cx="32" cy="44.5" rx="3.2" ry="2.6" fill="#3b2a1d"/>',festa:'<path d="M26 42c3 4.5 9 4.5 12 0z" fill="#fff"/>'}[humor]||'';
 var olho=humor==='panico'?'<circle cx="25.5" cy="34" r="2.6" fill="#fff"/><circle cx="25.5" cy="34" r="1.3" fill="#3b2a1d"/><circle cx="38.5" cy="34" r="2.6" fill="#fff"/><circle cx="38.5" cy="34" r="1.3" fill="#3b2a1d"/>':
  humor==='festa'?'<path d="M23 34.5c1.5-2 3.5-2 5 0M36 34.5c1.5-2 3.5-2 5 0"/>':'<circle cx="25.5" cy="34" r="1.6" fill="#3b2a1d"/><circle cx="38.5" cy="34" r="1.6" fill="#3b2a1d"/>';
 var sobr=humor==='panico'?'<path d="M22 29l6 1.5M42 29l-6 1.5"/>':humor==='alerta'?'<path d="M22.5 30h6M35.5 30h6"/>':'<path d="M22.5 30c2-1.2 4-1.2 6 0M35.5 30c2-1.2 4-1.2 6 0"/>';
 var sard='<g fill="#c46a3a" stroke="none"><circle cx="23" cy="38" r=".7"/><circle cx="25.5" cy="39.3" r=".7"/><circle cx="21.6" cy="40" r=".6"/><circle cx="41" cy="38" r=".7"/><circle cx="38.5" cy="39.3" r=".7"/><circle cx="42.4" cy="40" r=".6"/></g>';
 return '<svg class="sat-av sat-'+humor+'" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="#3b2a1d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+
  '<path d="M21 22c-5-2-7-7-4-11 1 3 3 5 6 6" fill="#8a6a4a"/><path d="M43 22c5-2 7-7 4-11-1 3-3 5-6 6" fill="#8a6a4a"/>'+
  '<path d="M17 31c-5-1-8-4-8-7 3 0 6 1 9 3M47 31c5-1 8-4 8-7-3 0-6 1-9 3" fill="#f0c9a0"/>'+
  '<path d="M23 50c2 4 5 7 9 7s7-3 9-7" fill="#c8453a"/><circle cx="32" cy="54" r="2.4" fill="#f2b632" stroke-width="1"/><circle cx="32" cy="54" r=".9" fill="#5a3a1a" stroke="none"/>'+
  '<path d="M18 33c0-10 6-15 14-15s14 5 14 15c0 9-5 17-14 17s-14-8-14-17z" fill="#f3d2ad"/>'+
  '<path d="M17.5 29c-2-3-1-7 2-8-1-3 1-6 4-5 0-3 3-5 6-3 1-2.5 4-3 6-1 2-2 5.5-1 6 2 3-1 5.5 1.5 4.5 4.5 3 1 3.5 5 1.5 8-1.5-2-3.5-2.8-5.5-2.4-1-2.2-3.4-3-5.4-2-1.6-1.8-4.4-1.8-6 0-2-1.2-4.4-.6-5.4 1.4-2.2-.4-4.2.4-5.7 2.5z" fill="#e08a3c"/>'+
  sobr+olho+sard+'<path d="M31 37.5c.6 1 1.4 1 2 0"/>'+boca+
  '<g transform="translate(41 41) rotate(28)"><ellipse cx="6" cy="10" rx="6" ry="7.5" fill="#f1dcb4"/><circle cx="6" cy="9" r="2.2" fill="#3b2a1d" stroke="none"/><path d="M6 2V-12" stroke-width="2.2"/><path d="M2 13c1 1 2 1 3 0M7 14c1 .8 2 .8 3 0" stroke="#d0605a" stroke-width="1"/></g></svg>';};
satFicha=(function(f0){return function(){var h=f0.apply(this,arguments);
 h=h.replace('sátiro protetor do Hékatos · Brookhaven, Long Island','Sátiro Protetor do Hékatos · Comitê dos Cascos Fendidos');
 h=h.replace(/<dt>photoplayer<\/dt><dd>[\s\S]*?<\/dd>/,'<dt>photoplayer</dt><dd>Ed Sheeran: aquariano (17/02/1991), ruivo de cachos e sardas, e não larga o violão</dd><dt>aparência</dt><dd>cachos ruivos, sardas, chifres curvos, pernas de cervo malhadas e rabo de leão; camiseta vermelha com um girassol estampado</dd>');
 h=h.replace(/<dt>origem<\/dt><dd>[\s\S]*?<\/dd>/,'<dt>origem</dt><dd>cresceu nos brejos de Brookhaven, Long Island. Na sua visitação, aos 13, quando o seu éter começou a atrair monstros, o Comitê dos Cascos Fendidos o mandou a Austin. Ele se disfarçou de violeiro de rua na Sixth Street e guiou você até a Acrópole do Monte Ida, no extremo leste da ilha. Voltou com sardas novas do sol do Texas</dd>');
 h=h.replace(/<dt>instrumento<\/dt><dd>[\s\S]*?<\/dd>/,'');
 h=h.replace(/<dt>mania<\/dt><dd>/,'<dt>instrumento</dt><dd>violão pintado de flores, o mesmo do disfarce em Austin; a flauta de junco fica para as dríades</dd><dt>sindicato</dt><dd>filiado ao Comitê dos Cascos Fendidos; sonha subir a Sátiro Buscador e ser quem acha Pã</dd><dt>mania</dt><dd>');
 return h;};})(satFicha);
satPainelHTML=(function(f0){return function(){return f0.apply(this,arguments).replace(/(<small class="cv-bio">)/,'$1Netos do Corvus: Apolo mandou o avô buscar água na Cratera, ele parou para esperar os figos amadurecerem, mentiu culpando a Hidra e virou constelação, de penas pretas para sempre. Os gêmeos trabalham para limpar o nome da família: nunca atrasam uma entrega, e o Cass sempre diz a verdade, mesmo quando é ruim. · ');};})(satPainelHTML);
/* ======================= Caixa de Hermes dentro da Biblioteca de Atena =======================
   A caixa mora dentro da Biblioteca, mas a captura fica sempre à vista, numa faixa acima dela,
   com atalho Alt+H de qualquer lugar. A Biblioteca sobe para o topo do Quadro. */
function qaHermesQtd(){return document.querySelectorAll('#rail-in .rlist li:not(.rvz)').length;}
function qaHermesBarra(){var cb=document.getElementById('cerbox'),pc=document.getElementById('qa-d-pc');if(!cb||!pc)return;var b=document.getElementById('qa-hermes');
 if(!b){b=document.createElement('div');b.id='qa-hermes';b.className='qa-hermes';
  b.innerHTML='<span class="qh-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v15M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3-6 2-6 4 6 2 6 4-1.3 3-3 3"/><path d="M12 6c-2-3-6-3.5-9-2 2 .5 3.5 1.8 4 3.5M12 6c2-3 6-3.5 9-2-2 .5-3.5 1.8-4 3.5"/></svg></span>'+
   '<label class="qh-lb"><small>Píthos de Pandora · Alt+H</small><input id="qh-in" maxlength="140" placeholder="despeje antes de perder e aperte Enter" autocomplete="off"></label>'+
   '<button type="button" class="qh-ok" data-qhok>guardar</button><button type="button" class="qh-n" data-qhver title="ver a caixa na Biblioteca de Atena"><b>0</b><small>na caixa</small></button>';
  var guarda=function(){var i=b.querySelector('#qh-in'),r=document.getElementById('r-cap'),bt=document.getElementById('b-rcap');if(!i||!i.value.trim()||!r||!bt)return;
   r.value=i.value.trim();bt.click();i.value='';b.classList.add('ok');setTimeout(function(){b.classList.remove('ok');qaHermesConta();},700);setTimeout(function(){try{i.focus({preventScroll:true});}catch(z){}},60);};
  b.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.id==='qh-in'){e.preventDefault();guarda();}});
  b.addEventListener('click',function(e){if(e.target.closest('[data-qhok]'))guarda();else if(e.target.closest('[data-qhver]')){var d=document.getElementById('qa-d-pc');if(d){d.open=true;var ri=document.getElementById('rail-in');(ri||d).scrollIntoView({block:'nearest',behavior:'smooth'});}}});}
 if(pc.previousElementSibling!==b)pc.insertAdjacentElement('beforebegin',b);qaHermesConta();}
function qaHermesConta(){var b=document.getElementById('qa-hermes');if(!b)return;var n=qaHermesQtd(),e=b.querySelector('.qh-n b');if(e&&e.textContent!==String(n))e.textContent=n;b.classList.toggle('cheia',n>0);}
/* ordem do Quadro: Caixa (faixa) + Biblioteca de Atena, depois Tear das Moiras, Pergaminhos e Crônicas */
latMural=(function(f0){return function(){var pc=document.getElementById('qa-d-pc'),ri=document.getElementById('rail-in');
 if(!pc||!ri)return f0.apply(this,arguments);try{latRailCss();}catch(e){}
 var sb=pc.querySelector(':scope > .qa-sb');if(sb&&sb.firstElementChild!==ri)sb.insertBefore(ri,sb.firstChild);};})(latMural);
qaOrganiza=(function(f0){return function(){f0.apply(this,arguments);var cb=document.getElementById('cerbox'),pc=document.getElementById('qa-d-pc');if(!cb||!pc)return;
 var ri=document.getElementById('rail-in'),sb=pc.querySelector(':scope > .qa-sb');if(ri&&sb&&sb.firstElementChild!==ri){var a=document.activeElement;if(!(a&&ri.contains(a)))sb.insertBefore(ri,sb.firstChild);}
 var bt=cb.querySelector(':scope > .cerbt'),hb=document.getElementById('qa-hermes');
 var alvo=bt?bt.nextElementSibling:cb.firstElementChild;var prim=hb&&hb.parentNode===cb?hb:pc;
 if(alvo!==prim){var a2=document.activeElement;if(!(a2&&prim.contains(a2))){if(bt)bt.insertAdjacentElement('afterend',prim);else cb.insertBefore(prim,cb.firstChild);}}
 if(prim===hb&&hb.nextElementSibling!==pc)hb.insertAdjacentElement('afterend',pc);
 var o=document.getElementById('lat-orb');if(o&&o.parentNode===cb&&pc.nextElementSibling!==o)pc.insertAdjacentElement('afterend',o);
 var nt=document.getElementById('qa-d-nt'),dj=document.getElementById('qa-d-dj'),last=o&&o.parentNode===cb?o:pc;
 [nt,dj].forEach(function(x){if(x&&x.parentNode===cb){if(last.nextElementSibling!==x)last.insertAdjacentElement('afterend',x);last=x;}});
 try{qaHermesBarra();}catch(e){}};})(qaOrganiza);
reorgOrb=function(){var o=document.getElementById('lat-orb'),cb=document.getElementById('cerbox'),pc=document.getElementById('qa-d-pc');if(!o||!cb)return;o.classList.add('qa-orb');
 if(pc&&pc.parentNode===cb){if(pc.nextElementSibling!==o)pc.insertAdjacentElement('afterend',o);}else if(o.parentNode!==cb)cb.appendChild(o);};
/* Alt+H: captura de qualquer lugar (no Posto, vai para a caixa do Posto) */
document.addEventListener('keydown',function(e){if(!(e.altKey&&(e.key==='h'||e.key==='H')))return;e.preventDefault();
 if(document.body.classList.contains('op-on')){var oi=document.querySelector('#modo-op [data-opcap]');if(oi){oi.focus();return;}}
 var i=document.getElementById('qh-in');if(!i){try{qaOrganiza();}catch(z){}i=document.getElementById('qh-in');}if(!i)return;
 i.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(function(){try{i.focus({preventScroll:true});}catch(z){}},250);});
setInterval(function(){try{qaHermesConta();}catch(e){}},3000);
setTimeout(function(){try{qaOrganiza();latMural();}catch(e){}},1300);

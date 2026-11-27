/* ======================= nomes mitológicos sem deuses =======================
   Píthos de Pandora (captura), Fio de Ariadne (registros e retomadas), Rumo da Argo (em andamento),
   Tabuinhas de Cadmo (notas), Crônicas do chalé à moda de Homero (diário). */
QA_SEC.forEach(function(q){if(q[0]==='qa-d-pc'){q[1]='Fio de Ariadne';q[2]='registros diversos · o fio para voltar de onde você saiu';}
 if(q[0]==='qa-d-nt'){q[1]='Tabuinhas de Cadmo';q[2]='notas e rascunhos · buscar, guardar e etiquetar';}});
QA_DEUS['rail-in']=['Píthos de Pandora','o jarro guarda tudo · despeje antes de perder'];QA_DEUS['lat-orb']=['Rumo da Argo','em andamento · o que está navegando agora'];
QA_DEUS['qa-d-pc']=['Ariadne','retomar'];QA_DEUS['qa-d-nt']=['Cadmo','escrita'];QA_DEUS['qa-d-dj']=['Homero','memória'];
function qaNomes(){var map={'qa-d-pc':QA_SEC[0],'qa-d-nt':QA_SEC[1]};Object.keys(map).forEach(function(id){var d=document.getElementById(id),q=map[id];if(!d||!q)return;var su=d.querySelector(':scope > summary');if(!su)return;
  var b=su.querySelector(':scope > b'),k=su.querySelector('.qa-sk'),g=su.querySelector('.qa-deus');if(b&&b.textContent!==q[1])b.textContent=q[1];if(k&&k.textContent!==q[2])k.textContent=q[2];var gd=QA_DEUS[id][0]+' · '+QA_DEUS[id][1];if(g&&g.textContent!==gd)g.textContent=gd;});
 var dj=document.querySelector('#qa-d-dj .qa-deus');if(dj){var t=QA_DEUS['qa-d-dj'][0]+' · '+QA_DEUS['qa-d-dj'][1];if(dj._t!==t||dj.textContent==='' ){dj.textContent=t;dj._t=t;}}
 var nm=document.querySelector('#rail-in .qa-nm');if(nm){var bb=nm.querySelector('b'),ss=nm.querySelector('small');if(bb&&bb.textContent!==QA_DEUS['rail-in'][0])bb.textContent=QA_DEUS['rail-in'][0];if(ss&&ss.textContent!==QA_DEUS['rail-in'][1])ss.textContent=QA_DEUS['rail-in'][1];}
 var h=document.getElementById('h-cup'),sp=h&&h.querySelector('span'),tx='// Pandora, Ariadne, os argonautas e Cadmo guardam o que você deixa aqui';if(sp&&sp.textContent!==tx)sp.textContent=tx;
 Array.prototype.forEach.call(document.querySelectorAll('#rail-in .rcab.cer *'),function(n){if(n.children.length===0&&/Caixa de Hermes/.test(n.textContent))n.textContent=n.textContent.replace('Caixa de Hermes','Píthos de Pandora');});}
qaOrganiza=(function(f0){return function(){f0.apply(this,arguments);try{qaNomes();}catch(e){}};})(qaOrganiza);
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{qaNomes();}catch(e){}return x;};})();
setTimeout(function(){try{qaNomes();}catch(e){}},1500);
/* retrato do Sully (imagem do Bruno) no lugar do desenho; photoplayer Jeremy Shada */
var SAT_SVG=satAvatar;
satAvatar=function(humor){return '<img class="sat-av sat-foto sat-'+(humor||'calmo')+'" src="img/acampamento/sully.webp" alt="" aria-hidden="true">';};
satFicha=(function(f0){return function(){var h=f0.apply(this,arguments);
 h=h.replace(/<dt>photoplayer<\/dt><dd>[\s\S]*?<\/dd>/,'<dt>photoplayer</dt><dd>Jeremy Shada (Boise, Idaho; nascido em 21/01/1997, aquariano de carteirinha)</dd>');
 h=h.replace(/<dt>aparência<\/dt><dd>[\s\S]*?<\/dd>/,'<dt>aparência</dt><dd>cachos escuros, sardas, chifres de carneiro e orelhas pontudas; boné virado para trás, raminho de oliveira no canto da boca e manto preso por um broche de louro. Das coxas para baixo, pernas de cervo malhadas e rabo de leão</dd>');
 return h;};})(satFicha);
setInterval(pintaProgresso,60000);
/* ======================= POSTO DE COMANDO · pacote TDAH =======================
   1 Bússola de Dédalo (uma coisa só) · 2 primeiro passo físico · 3 bateria do dia
   4 contagem até a virada · 5 Escapar de Procusto (19h) · 6 hora de sair de casa
   7 guarda do Hotel Lótus · 8 Hermes por tecla + Estacionamento · 9 processo da vez
   10 no Posto só se executa · 11 flechas do dia e +XP na hora · 12 Fogueira e flecha de ouro
   13 Néctar da Enfermaria (remédio) · 14 modo companhia.
   Guarda tudo em S.opx; lê e grava o mesmo registro do app. */
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.opx=(p&&p.opx&&typeof p.opx==='object')?p.opx:{};return b;};})();
/* o registro já tinha sido carregado (e normalizado sem opx) antes deste trecho: recupera o opx gravado, senão fecho do Procusto, néctar etc. se perdiam a cada recarga */
(function(){try{var raw=JSON.parse(KEY_RAW0||'null');if(!raw||!raw.opx||typeof raw.opx!=='object')return;var o=S.opx;if(!o||typeof o!=='object'){S.opx=raw.opx;return;}Object.keys(raw.opx).forEach(function(k){var v=o[k];if(v==null||(typeof v==='object'&&!Array.isArray(v)&&!Object.keys(v).length))o[k]=raw.opx[k];});grava();}catch(e){}})();

function opx(){var o=S.opx;if(!o||typeof o!=='object')o=S.opx={};
 ['bat','passo','skip','est','fog','proc','procN','adia','arOk'].forEach(function(k){if(!o[k]||typeof o[k]!=='object')o[k]={};});
 o.cfg=o.cfg||{};if(!o.cfg.saida)o.cfg.saida='19:00';if(!o.cfg.ini)o.cfg.ini='12:00';if(o.cfg.traj==null)o.cfg.traj=0;if(!o.cfg.fl)o.cfg.fl=4;
 var lim=diaStr(hojeN()-21);['bat','skip','est','fog','proc','procN','arOk'].forEach(function(k){Object.keys(o[k]).forEach(function(d){if(/^\d{4}-/.test(d)&&d<lim)delete o[k][d];});});
 return o;}
function op2Salva(){try{grava();}catch(e){}}
function op2HM(m){m=((m%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function op2Min(h){var p=String(h||'0:0').split(':');return (+p[0])*60+(+p[1]||0);}
function op2Util(d){try{return gabUtil(d||hoje());}catch(e){var w=new Date((d||hoje())+'T12:00:00').getDay();return w>0&&w<6;}}
function op2Faixa(){var a=opMin(),H0=null;TD_H.forEach(function(x){if(a>=+x*60)H0=x;});return H0;}
function op2Expediente(){var c=opx().cfg,a=opMin();return op2Util()&&a>=op2Min(c.ini)&&a<op2Min(c.saida);}
function op2Bat(){return opx().bat[hoje()]||0;}
function op2Dur(){var b=op2Bat();return b===1?5:(b===3?50:25);}

/* ---------- 1 e 9 · Bússola de Dédalo: a fila e a coisa da vez ---------- */
function op2Fila(){var o=opx(),hj=hoje(),Q=mmD(),fe=Q.feitas[hj]||[],L=[],sk=o.skip[hj]||[],tb=S.tb||{},H0=op2Faixa(),fx=H0?(tb[hj+'|'+H0]||''):'';
 var add=function(x){if(sk.indexOf(x.k)<0&&!L.some(function(y){return y.k===x.k;}))L.push(x);};
 var estudo=/estud|trf|esfinge|concurso|revis|quest/i.test(fx),trab=op2Expediente()||/gabinete|arena|labirinto|bloco [123]|b3/i.test(fx);
 /* fio de Ariadne: onde parei no último expediente */
 if(trab){var ds=Object.keys(o.proc).filter(function(d){return d<hj&&o.proc[d]&&o.proc[d].ar&&!o.arOk[d];}).sort();
  if(ds.length){var d0=ds[ds.length-1];add({k:'ar:'+d0,tag:'fio de Ariadne · retomar',t:o.proc[d0].ar,tipo:'ar',d:d0});}}
 var x=plDia(hj);if(x.top[0]&&(x.top[0].t||'').trim()&&!x.top[0].ok)add({k:'pl:'+hj+':0',tag:'oráculo · flecha de ouro',t:x.top[0].t,tipo:'pl',i:0});
 var gab=function(){try{gabResumo().forEach(function(r){if(!r.rest)return;var ab=r.abertos;if(r.p==='corrigir'){var pr=ab.filter(function(i){return i.mi;});if(pr.length)ab=pr;}
  ab.slice(0,6).forEach(function(i){add({k:'gab:'+i.cnj+':'+r.p,tag:'processo da vez · '+SAT_PAPEL[r.p][1],t:i.cnj,sub:(i.cl||'').replace(/APELAÇÃO CÍVEL/,'ApCiv').replace(/AGRAVO DE INSTRUMENTO/,'AI').replace(/REMESSA NECESSÁRIA CÍVEL/,'RemNec')+(i.as?' · '+i.as:'')+' · sessão '+r.s.nome+(r.venc?' · prazo vencido':' · prazo '+gabDM(r.prazo)),
   tipo:'gab',cnj:i.cnj,cont:'hoje '+Math.min(r.fh,r.meta||r.fh)+'/'+(r.meta||'—')});});});}catch(e){}};
 var prof=function(){Q.prof.filter(function(p){return !p.ok;}).forEach(function(p){var i=(p.passos||[]).findIndex(function(s){return !s.ok;});if(i>=0)add({k:'pf:'+p.id+':'+i,tag:'profecia · próxima etapa',t:p.passos[i].t,sub:p.t,tipo:'pf',id:p.id,i:i});});};
 var quests=function(){Q.dia.forEach(function(q){if(fe.indexOf(q.id)<0)add({k:'q:'+q.id,tag:'diária',t:q.t,tipo:'q',id:q.id});});};
 if(trab)gab();
 if(estudo){prof();quests();}
 [1,2].forEach(function(i){var t=x.top[i];if(t&&(t.t||'').trim()&&!t.ok)add({k:'pl:'+hj+':'+i,tag:'oráculo',t:t.t,tipo:'pl',i:i});});
 quests();
 Q.chale.forEach(function(c){if(!c.ok)add({k:'ch:'+c.id,tag:'chalé',t:c.t,tipo:'ch',id:c.id});});
 prof();
 if(fx)add({k:'fx:'+hj+':'+H0,tag:'faixa de agora · '+tdFaixaNome(H0),t:fx,tipo:'fx'});
 return L;}
function op2Atual(){var o=opx(),f=tdD().foco;if(f&&o.fk){var L=op2Fila(),it=L.filter(function(x){return x.k===o.fk;})[0];if(it)return it;if(o.fkItem&&o.fkItem.k===o.fk)return o.fkItem;}return op2Fila()[0]||null;}
function op2BatHTML(){var b=op2Bat();return '<span class="op-bat" title="bateria do dia">'+[1,2,3].map(function(n){return '<button type="button" data-opbat="'+n+'" class="'+(b===n?'on':'')+'" aria-label="bateria '+n+'">'+'<i></i>'.repeat(n)+'</button>';}).join('')+'</span>';}
function op2BusHTML(){var o=opx(),hj=hoje(),f=tdD().foco,b=op2Bat();
 if(!b)return '<div class="op-bus op-bus-q"><span class="op-k">bússola de dédalo · antes de tudo</span><b class="op-bus-t">Como está a bateria hoje?</b>'+
  '<div class="op-batq"><button type="button" data-opbat="1"><em class="op-bi"><i></i></em><span>baixa</span><small>só adaga: 5 min por vez</small></button><button type="button" data-opbat="2"><em class="op-bi"><i></i><i></i></em><span>média</span><small>flechas de 25 min</small></button><button type="button" data-opbat="3"><em class="op-bi"><i></i><i></i><i></i></em><span>cheia</span><small>arco de Apolo: 50 min</small></button></div>'+
  '<small class="op-bus-n">um toque por dia · sem culpa, a bateria só decide o tamanho do bloco</small></div>';
 var it=op2Atual(),L=op2Fila();
 if(!it)return '<div class="op-bus op-bus-vz"><span class="op-k">bússola de dédalo · agora</span><b class="op-bus-t">Nada na fila.</b><small>Escolha um descanso do Menu de recarga ou acenda a Fogueira mais cedo.</small><div class="op-bus-ft">'+op2BatHTML()+((o.skip[hj]||[]).length?'<button type="button" class="op-lk" data-opbus="reset">voltar os pulados</button>':'')+'</div></div>';
 var em=f&&o.fk===it.k,ps=o.passo[it.k]||'',dur=op2Dur(),resto=Math.max(0,L.length-1);
 var h='<div class="op-bus op-bus-'+it.tipo+(em?' op-bus-em':'')+'"><span class="op-k">bússola de dédalo · '+(em?'em foco':'agora')+'</span><small class="op-bus-tag">'+esc(it.tag)+(it.cont?' · '+esc(it.cont):'')+'</small>'+
  '<b class="op-bus-t">'+esc(it.t)+'</b>'+(it.sub?'<small class="op-bus-sub">'+esc(it.sub)+'</small>':'');
 if(em)h+='<div class="op-passo1"><span>passo 1</span><b>'+esc(ps||'o menor movimento: abrir, pegar, escrever uma linha')+'</b></div>';
 else h+='<label class="op-passo"><span>primeiro passo físico</span><input data-oppasso="'+esc(it.k)+'" value="'+esc(ps)+'" maxlength="80" placeholder="abrir o PJe no processo, pegar o caderno, escrever 1 linha…"></label>';
 h+='<div class="op-bus-bt">'+(em?'<button type="button" class="op-pri" data-opbus="okfim">feito ✓ e encerrar</button><button type="button" data-opbus="parar">parar o foco</button>':
  '<button type="button" class="op-pri" data-opbus="go">'+(b===1?'só 5 minutos':'começar · '+dur+' min')+'</button>'+(it.tipo==='gab'||it.tipo==='fx'?'':'<button type="button" data-opbus="ok">feito ✓</button>')+'<button type="button" data-opbus="skip">não agora</button>')+
  (it.cnj?'<button type="button" class="op-lk" data-opcp="'+esc(it.cnj)+'">copiar nº</button>':'')+'</div>';
 if(b===1&&!em){var M=(S.menu||[]).slice(0,3);if(M.length)h+='<div class="op-rec"><span>menu de recarga</span>'+M.map(function(m){return '<em>'+esc(m)+'</em>';}).join('')+'</div>';}
 h+='<div class="op-bus-ft">'+op2BatHTML()+'<small class="op-bus-n">'+(resto?resto+' na fila, escondidos de propósito':'última da fila')+'</small>'+((o.skip[hj]||[]).length?'<button type="button" class="op-lk" data-opbus="reset">voltar os pulados</button>':'')+
  (opMin()>=18*60&&!o.fog[hj]?'<button type="button" class="op-lk" data-opfog="abre">acender a fogueira</button>':'')+'</div></div>';
 return h;}
function op2Feito(it){var Q=mmD(),hj=hoje(),o=opx(),xp=0;if(!it)return 0;
 if(it.tipo==='pl'){var x=plDia(hj);if(x.top[it.i]){x.top[it.i].ok=true;xp=5;}}
 else if(it.tipo==='ch'){var c=Q.chale.filter(function(y){return y.id===it.id;})[0];if(c){c.ok=hj;xp=3;}}
 else if(it.tipo==='q'){var fe=Q.feitas[hj]=Q.feitas[hj]||[];if(fe.indexOf(it.id)<0){fe.push(it.id);xp=5;}}
 else if(it.tipo==='pf'){var p=Q.prof.filter(function(y){return y.id===it.id;})[0];if(p&&p.passos[it.i]){p.passos[it.i].ok=true;xp=10;}}
 else if(it.tipo==='ar'){o.arOk[it.d]=1;xp=2;}
 else if(it.tipo==='gab'){(o.skip[hj]=o.skip[hj]||[]).push(it.k);}
 try{mmSalva();}catch(e){op2Salva();}return xp;}

/* ---------- 11 · +XP na hora ---------- */
function op2XP(n,ev,txt){if(!n&&!txt)return;var d=document.createElement('div');d.className='op-xp';d.textContent=txt||('+'+n+' XP');
 var x=ev&&ev.clientX?ev.clientX:innerWidth/2,y=ev&&ev.clientY?ev.clientY:innerHeight/2;d.style.left=x+'px';d.style.top=y+'px';document.body.appendChild(d);
 setTimeout(function(){d.classList.add('on');},20);setTimeout(function(){d.remove();},1500);}
(function(){var x0=gmXP;gmXP=function(){var x=x0(),o=S.opx||{},n=0;Object.keys(o.fog||{}).forEach(function(){n+=10;});Object.keys(o.proc||{}).forEach(function(d){if(o.proc[d]&&o.proc[d].em)n+=10;});x.posto=n;x.total+=n;return x;};})();

/* ---------- 12 · Fogueira e flecha de ouro ---------- */
function op2FogModo(){var o=opx(),hj=hoje(),a=opMin();if(o.fog[hj])return false;return a>=21*60||o.fogAberta===hj;}
function op2FogHTML(){var o=opx(),hj=hoje(),E=o.est[hj]||[],am=diaStr(hojeN()+1),pa=plDia(am).top[0]||{},r=o.fogR||{};
 return '<div class="op-fog"><span class="op-k">fogueira · fechar o dia</span><b class="op-bus-t">Três toques e o dia fecha.</b>'+
  '<label><span>o que rendeu</span><input data-opfogi="r" maxlength="120" value="'+esc(r.r||'')+'" placeholder="uma coisa que andou"></label>'+
  '<label><span>o que travou</span><input data-opfogi="t" maxlength="120" value="'+esc(r.t||'')+'" placeholder="sem culpa: só o nome do monstro"></label>'+
  '<label class="op-fog-f"><span>flecha de ouro de amanhã</span><input data-opfogi="f" maxlength="80" value="'+esc(r.f||pa.t||'')+'" placeholder="a primeira coisa que importa amanhã"></label>'+
  (E.length?'<div class="op-est"><span>estacionamento · '+E.length+'</span><ul>'+E.map(function(t,i){return '<li><span>'+esc(t)+'</span><button type="button" data-opest="cx:'+i+'">caixa</button><button type="button" data-opest="x:'+i+'" aria-label="descartar">✕</button></li>';}).join('')+'</ul></div>':'')+
  '<div class="op-bus-bt"><button type="button" class="op-pri" data-opfog="apaga">apagar a fogueira</button>'+(opMin()<21*60?'<button type="button" data-opfog="fecha">ainda não</button>':'')+'</div></div>';}
function op2FogApaga(ev){var o=opx(),hj=hoje(),n=document.getElementById('modo-op'),v=function(k){var i=n&&n.querySelector('[data-opfogi="'+k+'"]');return i?i.value.trim():((o.fogR||{})[k]||'');};
 var f=v('f');if(!f){var i=n&&n.querySelector('[data-opfogi="f"]');if(i){i.focus();i.classList.add('op-falta-v');}return;}
 var am=diaStr(hojeN()+1),x=plDia(am);if(!(x.top[0].t||'').trim())x.top[0]={t:f,ok:false};else if(x.top[0].t!==f){x.top.unshift({t:f,ok:false});x.top=x.top.slice(0,3);}
 var y=plDia(hj);y.rendeu=v('r');y.travou=v('t');(o.est[hj]||[]).forEach(function(t){op2Caixa(t);});delete o.est[hj];
 o.fog[hj]={r:v('r'),t:v('t'),f:f,em:Date.now()};o.fogR=null;o.fogAberta=null;op2Salva();op2XP(10,ev,'+10 XP · fogueira apagada');try{vxRender();}catch(e){}}

/* ---------- 8 · Hermes por tecla e Estacionamento ---------- */
function op2Caixa(t){var r=document.getElementById('r-cap'),b=document.getElementById('b-rcap');if(r&&b){r.value=t;b.click();return true;}S.cap=S.cap||[];S.cap.push({t:t,ts:Date.now()});op2Salva();return true;}
function op2Captura(t){t=String(t||'').trim();if(!t)return '';if(tdD().foco){var o=opx(),hj=hoje();(o.est[hj]=o.est[hj]||[]).push(t.slice(0,140));op2Salva();return 'estacionado · volta na fogueira';}op2Caixa(t.slice(0,140));return 'guardado na caixa de Hermes';}
opCaptura=(function(f0){return function(){var o=document.getElementById('modo-op'),i=o&&o.querySelector('[data-opcap]');if(i&&i.value.trim()&&tdD().foco){op2Captura(i.value);i.value='';op2XP(0,null,'estacionado · volta na fogueira');opPinta();return;}return f0.apply(this,arguments);};})(opCaptura);
function op2Hermes(){var w=document.getElementById('op-hermes');if(!w){w=document.createElement('div');w.id='op-hermes';w.setAttribute('role','dialog');w.setAttribute('aria-label','Caixa de Hermes');
  w.innerHTML='<div class="oph-bx"><span class="op-k">caixa de Hermes · despeje e volte</span><input maxlength="140" placeholder="o que passou pela cabeça?"><small></small></div>';document.body.appendChild(w);
  var i=w.querySelector('input');i.addEventListener('keydown',function(e){if(e.key==='Escape'){w.classList.remove('on');return;}if(e.key!=='Enter')return;e.preventDefault();var m=op2Captura(i.value);i.value='';if(m){w.querySelector('small').textContent=m;setTimeout(function(){w.classList.remove('on');},700);}try{opPinta();}catch(z){}});
  w.addEventListener('click',function(e){if(e.target===w)w.classList.remove('on');});}
 w.querySelector('small').textContent=tdD().foco?'em foco: vai para o estacionamento e volta na fogueira':'Enter guarda · Esc fecha';w.classList.add('on');w.querySelector('input').focus();}
document.addEventListener('keydown',function(e){if(e.key!=='/'||e.ctrlKey||e.metaKey||e.altKey)return;var a=document.activeElement;if(a&&(/INPUT|TEXTAREA|SELECT/.test(a.tagName)||a.isContentEditable))return;e.preventDefault();op2Hermes();});

/* ---------- 13 · Néctar da Enfermaria ---------- */
function op2Doses(){var st=null;try{st=AX.ok&&AX.st&&AX.st();}catch(e){}if(!st||!st.habit)return [];var H=st.habit,d=(typeof nvHoje==='function'?nvHoje():hoje()),L=(H.medsLog&&H.medsLog[d])||[],a=opMin(),o=opx(),R=[];
 (H.medications||[]).forEach(function(m){(m.times||[]).forEach(function(t){var tk=m.id+'@'+t;if(L.indexOf(tk)>=0)return;if(op2Min(t)>a)return;if((o.adia[tk]||0)>Date.now())return;R.push({tk:tk,n:m.name,dose:m.dose||'',h:t});});});return R;}
function op2Tomei(tk){try{var st=AX.st(),H=st.habit,d=(typeof nvHoje==='function'?nvHoje():hoje()),L=(H.medsLog=H.medsLog||{})[d]=(H.medsLog[d]||[]);if(L.indexOf(tk)<0)L.push(tk);AX.save();var tot=0,ok=0;(H.medications||[]).forEach(function(m){(m.times||[]).forEach(function(t){tot++;if(L.indexOf(m.id+'@'+t)>=0)ok++;});});
 if(tot&&ok>=tot){var hb=(S.hab||[]).filter(function(x){return /rem[eé]dio|n[eé]ctar|medica/i.test(x.nome);})[0],hj=hoje();if(hb&&(hb.hist||[]).indexOf(hj)<0){hb.hist=(hb.hist||[]).concat(hj);op2Salva();}}}catch(e){}try{enfPinta(true);}catch(e){}}
function op2Adia(tk){var o=opx();o.adia[tk]=Date.now()+15*60000;op2Salva();}
function op2MedHTML(){var D=op2Doses();if(!D.length)return '';var m=D[0];
 return '<div class="op-nectar"><span class="op-k">néctar da enfermaria · '+esc(m.h)+'</span><b>'+esc(m.n)+(m.dose?' <small>'+esc(m.dose)+'</small>':'')+'</b><div><button type="button" class="op-pri" data-opmed="t:'+esc(m.tk)+'">tomei</button><button type="button" data-opmed="a:'+esc(m.tk)+'">adiar 15 min</button></div>'+(D.length>1?'<small>+'+(D.length-1)+' dose'+(D.length>2?'s':'')+' pendente'+(D.length>2?'s':'')+'</small>':'')+'</div>';}
function op2MedAlarme(){var o=opx(),N=op2Doses().filter(function(m){return !tdJa('med-'+m.tk+'-'+Math.floor((o.adia[m.tk]||0)/60000));});if(!N.length)return;
 tdAvisa('Hora do néctar: '+N.map(function(m){return m.n;}).join(' + '),N.map(function(m){return (m.dose?m.dose+' · ':'')+m.h;}).join(' | '),
  [['tomei',function(){N.forEach(function(m){op2Tomei(m.tk);});try{opPinta();}catch(e){}}],['adiar 15 min',function(){N.forEach(function(m){op2Adia(m.tk);});}]]);}
/* ---------- 4 · contagem até a virada ---------- */
function op2Virada(){var a=opMin(),hj=hoje(),tb=S.tb||{},prox=null;TD_H.forEach(function(H){if(prox==null&&+H*60>a)prox=H;});
 if(prox==null)return {m:1440-a,nome:'meia-noite',txt:''};return {m:+prox*60-a,nome:tdFaixaNome(prox),txt:tb[hj+'|'+prox]||'',H:prox};}
function op2ViradaHTML(){var v=op2Virada(),m=v.m,cls=m<=10?' op-vir-perto':'';
 return '<div class="op-vir'+cls+'"><span>virada em</span><b>'+(m>=60?Math.floor(m/60)+'h'+String(m%60).padStart(2,'0'):m+' min')+'</b><em>depois: '+esc(v.nome)+(v.txt?' · '+esc(v.txt):'')+'</em></div>';}

/* ---------- 5 · Escapar de Procusto ---------- */
function op2ProcAtivo(){if(!document.body.classList.contains('op-on'))return false;if(document.querySelector('#vx-dlg,dialog[open]:not(#op-proc),.ave-dlg[open],#ac-guia'))return false;var o=opx(),hj=hoje(),a=opMin(),s=op2Min(o.cfg.saida);if(!op2Util())return false;if(o.proc[hj])return false;if(a<s||a>=Math.min(s+120,23*60))return false;if((o.procAte||0)>Date.now())return false;return true;}
function op2ProcHTML(){var o=opx(),hj=hoje(),n=o.procN[hj]||0,ck=o.procCk||{};
 return '<div class="opp-bx"><button type="button" class="opp-x" data-opp="x" aria-label="Fechar até amanhã" title="fechar até amanhã">✕</button><span class="op-k">'+esc(o.cfg.saida)+' · fim do expediente</span><h2>Escapar de Procusto</h2><p>Procusto estica o dia até caber na cama dele. Hoje, não: três passos e você sai.</p>'+
  '<label class="opp-ar"><span>fio de Ariadne · onde parei?</span><textarea data-opp="ar" rows="2" maxlength="160" placeholder="processo, peça, próximo passo de amanhã">'+esc(o.procAr||'')+'</textarea></label>'+
  '<label class="opp-ck"><input type="checkbox" data-oppck="salvei"'+(ck.salvei?' checked':'')+'><span>salvei e fechei o PJe e as abas</span></label>'+
  '<label class="opp-ck"><input type="checkbox" data-oppck="levantei"'+(ck.levantei?' checked':'')+'><span>levantei da cadeira</span></label>'+
  '<div class="opp-bt"><button type="button" class="op-pri" data-opp="sai">escapei</button>'+(n<2?'<button type="button" data-opp="mais">mais 15 min ('+(2-n)+')</button>':'')+'<button type="button" class="op-lk" data-opp="folga">hoje não estou no gabinete</button></div></div>';}
function op2Proc(){var w=document.getElementById('op-proc'),on=op2ProcAtivo();
 if(!on){if(w)w.classList.remove('on');var o=opx(),a=opMin(),s=op2Min(o.cfg.saida);if(op2Util()&&!o.proc[hoje()]&&a>=s-15&&a<s&&!tdJa('proc15'))tdAvisa('Procusto: fecha em 15','às '+o.cfg.saida+' o expediente acaba. Anote onde parou.');return;}
 if(!w){w=document.createElement('div');w.id='op-proc';w.setAttribute('role','dialog');w.setAttribute('aria-label','Escapar de Procusto');document.body.appendChild(w);
  w.addEventListener('input',function(e){var t=e.target;if(t.dataset.opp==='ar'){opx().procAr=t.value;op2Salva();}});
  w.addEventListener('change',function(e){var t=e.target;if(t.dataset.oppck){var o=opx();o.procCk=o.procCk||{};o.procCk[t.dataset.oppck]=t.checked;op2Salva();}});
  w.addEventListener('click',function(e){if(e.target===w){var o0=opx();o0.proc[hoje()]={fechou:Date.now()};op2Salva();w.classList.remove('on');return;}var b=e.target.closest('button');if(!b)return;var o=opx(),hj=hoje(),k=b.dataset.opp;
   if(k==='mais'){o.procN[hj]=(o.procN[hj]||0)+1;o.procAte=Date.now()+15*60000;op2Salva();w.classList.remove('on');return;}
   if(k==='folga'){o.proc[hj]={off:1};op2Salva();w.classList.remove('on');return;}
   if(k==='x'){o.proc[hj]={fechou:Date.now()};op2Salva();w.classList.remove('on');return;}
   if(k==='sai'){var ar=(o.procAr||'').trim(),ck=o.procCk||{};if(!ar||!ck.salvei||!ck.levantei){w.querySelector('.opp-bx').classList.add('opp-falta');setTimeout(function(){w.querySelector('.opp-bx').classList.remove('opp-falta');},600);return;}
    o.proc[hj]={em:Date.now(),ar:ar};o.procAr='';o.procCk={};if(tdD().foco)tdFocoFim(true);op2Salva();w.classList.remove('on');op2XP(10,e,'+10 XP · escapou de Procusto');try{vxRender();}catch(z){}}});}
 if(!w.classList.contains('on')){w.innerHTML=op2ProcHTML();w.classList.add('on');tdSom(3);
  try{if(window.Notification&&Notification.permission==='granted'&&document.hidden)new Notification('Escapar de Procusto',{body:'O expediente acabou. Anote onde parou e saia.'});}catch(e){}}}

document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;var w=document.getElementById('op-proc');if(w&&w.classList.contains('on')){var b=w.querySelector('[data-opp="x"]');if(b)b.click();}});
setInterval(function(){var w=document.getElementById('op-proc');if(w&&w.classList.contains('on')&&(!document.body.classList.contains('op-on')||document.querySelector('#vx-dlg,dialog[open]:not(#op-proc)')))w.classList.remove('on');},500);
/* ---------- 6 · hora de sair de casa ---------- */
function op2Saidas(){var o=opx(),c=o.cfg,a=opMin(),hj=hoje(),R=[];if(!(c.traj>0))return R;
 if(op2Util()){var ini=op2Min(c.ini);R.push({sai:ini-c.traj,ev:c.ini,t:'gabinete'});}
 try{agDoDia(hj).forEach(function(x){if(x.dia||!x.loc)return;var m=x.ini.getHours()*60+x.ini.getMinutes();R.push({sai:m-c.traj,ev:agHora(x),t:x.t});});}catch(e){}
 return R.filter(function(r){return r.sai>=a-5;}).sort(function(p,q){return p.sai-q.sai;});}
function op2SaidaHTML(){var o=opx(),c=o.cfg;
 if(!(c.traj>0))return '<div class="op-grp op-traj"><span class="op-k">tênis alados · trajeto</span><div class="op-cap"><input data-optraj type="number" min="5" max="180" placeholder="min de casa ao gabinete"><button type="button" data-optrajb>ok</button></div></div>';
 var R=op2Saidas();if(!R.length)return '';
 return '<div class="op-grp op-traj"><span class="op-k">tênis alados · sair de casa</span><ul class="op-prox">'+R.slice(0,2).map(function(r){return '<li class="op-sai"><b>'+op2HM(r.sai)+'</b><span>sair → '+esc(r.t)+' às '+esc(r.ev)+'</span></li>';}).join('')+'</ul></div>';}
function op2SaidaAlarme(){var a=opMin();op2Saidas().forEach(function(r){var m=r.sai-a;
 if(m<=10&&m>9){if(!tdJa('sai10'+r.sai+r.t))tdAvisa('Em 10 min: sair de casa','para '+r.t+' às '+r.ev+' · calce os tênis alados');}
 else if(m<=0&&m>-1.5){if(!tdJa('sai0'+r.sai+r.t))tdAvisa('Hora de sair','para '+r.t+' às '+r.ev);}});}

/* ---------- 7 · guarda do Hotel Lótus ---------- */
function op2Corrente(){var ses=[];try{(vxData().sessions||[]).forEach(function(x){if(x.day!==hoje())return;var fim=+String(x.id||'').replace(/^td/,'');if(!fim)return;ses.push({ini:fim-(+x.minutes||0)*60000,fim:fim,m:+x.minutes||0});});}catch(e){}
 var f=tdD().foco,now=Date.now();if(f&&!f.pausaModo){var gasto=f.pausa!=null?f.dur-f.pausa:Math.min(f.dur,now-f.ini);ses.push({ini:f.ini,fim:f.ini+gasto,m:gasto/60000,viva:1});}
 ses.sort(function(p,q){return p.fim-q.fim;});if(!ses.length)return null;var i=ses.length-1,tot=ses[i].m,ini=ses[i].ini;
 if(!ses[i].viva&&now-ses[i].fim>10*60000)return null;
 while(i>0&&ses[i-1].fim>=ini-10*60000){i--;tot+=ses[i].m;ini=ses[i].ini;}return {m:tot,ini:ini};}
function op2Lotus(){var c=op2Corrente();if(c&&c.m>=90&&!tdJa('lotus'+Math.floor(c.ini/60000)))
  tdAvisa('Hotel Lótus: 90 min seguidos','água e levantar 2 minutos. O foco volta melhor.',[['pausa de 2 min',function(){if(tdD().foco)tdFocoFim(true);tdFocoIni(2,'pausa · água e levantar',-1);tdD().foco.pausaModo=true;tdSalva();}],['agora não',null]]);
 var a=opMin(),hj=hoje(),tb=S.tb||{};TD_H.forEach(function(H,k){if(!k)return;var m0=+H*60;if(a<m0||a>=m0+2)return;var ant=tb[hj+'|'+TD_H[k-1]]||'';
  if(/livre|games|lazer|s[ée]rie|filme|jogo/i.test(ant)&&!tdJa('lotusfx'+H))tdAvisa('Fechar o Hotel Lótus','o lazer era até as '+H+'h. Agora: '+(tb[hj+'|'+H]||tdFaixaNome(H)));});}

/* ---------- 11 · flechas do dia ---------- */
function op2FlechasHTML(){var n=tdHojeFoco().n,meta=opx().cfg.fl,tot=Math.max(meta,n),s='';
 for(var i=0;i<tot;i++)s+='<i class="'+(i<n?'on':'')+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21L19 5M19 5h-6M19 5v6M5 15l4 4M3 17l4 4"/></svg></i>';
 return '<div class="op-grp op-fl"><span class="op-k">flechas de hoje · '+n+'/'+meta+'</span><div class="op-fls">'+s+'</div>'+(n>=meta?'<small>meta do dia cumprida</small>':'')+'</div>';}

/* ---------- 14 · modo companhia ---------- */
var OP2_FALAS=['Sully está aqui do lado, afiando flechas.','Um bloco de cada vez. Ele também não terminou o dele.','Se a cabeça fugir, aperte / e despeje. Ele guarda.','Respira. Só o passo 1.','Sully lê em silêncio. Você escreve.'];
function op2Ruido(on){try{var A=window.AudioContext||window.webkitAudioContext;if(!A)return;var c=op2Ruido.c||(op2Ruido.c=new A());if(c.state==='suspended')c.resume();
 if(!on){if(op2Ruido.g){op2Ruido.g.gain.setTargetAtTime(0,c.currentTime,.3);var s=op2Ruido.s;setTimeout(function(){try{s.stop();}catch(e){}},1200);op2Ruido.s=null;op2Ruido.g=null;}return;}
 if(op2Ruido.s)return;var n=c.sampleRate*4,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0),l=0;for(var i=0;i<n;i++){var w=Math.random()*2-1;l=(l+0.02*w)/1.02;d[i]=l*3.2;}
 var s=c.createBufferSource();s.buffer=b;s.loop=true;var g=c.createGain();g.gain.value=0;s.connect(g);g.connect(c.destination);s.start();g.gain.setTargetAtTime(.22,c.currentTime,.4);op2Ruido.s=s;op2Ruido.g=g;}catch(e){}}
function op2Comp(on){var w=document.getElementById('op-comp');if(on===false){if(w)w.classList.remove('on');op2Ruido(false);try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}return;}
 if(!w){w=document.createElement('div');w.id='op-comp';w.setAttribute('role','dialog');w.setAttribute('aria-label','Modo companhia');document.body.appendChild(w);
  w.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var k=b.dataset.opc;
   if(k==='sair')op2Comp(false);else if(k==='ruido'){var on2=!op2Ruido.s;op2Ruido(on2);b.classList.toggle('on',on2);}
   else if(k==='go'){tdFocoIni(op2Dur(),(op2Atual()||{}).t||'bloco acompanhado',-1);var f=tdD().foco;if(f){f.acomp=true;tdSalva();}op2CompPinta();}
   else if(k==='fim'){tdFocoFim(true);op2CompPinta();}});}
 w.classList.add('on');op2CompPinta();try{if(w.requestFullscreen&&!document.fullscreenElement)w.requestFullscreen().catch(function(){});}catch(e){}}
function op2CompPinta(){var w=document.getElementById('op-comp');if(!w||!w.classList.contains('on'))return;var f=tdD().foco,d=new Date(),av='';try{av=satAvatar(f?'calmo':'festa');}catch(e){}
 var big=f?tdMMSS(tdFocoRest()):String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'),it=op2Atual(),ps=it?(opx().passo[it.k]||''):'';
 var h='<div class="opc-bx"><div class="opc-sat">'+av+'<span>'+esc(OP2_FALAS[Math.floor(Date.now()/60000)%OP2_FALAS.length])+'</span></div>'+
  '<span class="op-k">'+(f?(f.pausaModo?'pausa':'em foco · acompanhado'):'modo companhia')+'</span><b class="opc-t">'+esc(f?f.rot:(it?it.t:'escolha o bloco'))+'</b><div class="opc-big">'+big+'</div>'+
  (ps?'<p class="opc-ps">passo 1: '+esc(ps)+'</p>':'')+
  '<div class="opc-bt">'+(f?'<button type="button" data-opc="fim">encerrar</button>':'<button type="button" class="op-pri" data-opc="go">começar · '+op2Dur()+' min</button>')+'<button type="button" data-opc="ruido" class="'+(op2Ruido.s?'on':'')+'">ruído marrom</button><button type="button" data-opc="sair">sair</button></div></div>';
 if(w._h!==h||(h&&!w.firstChild)){w.innerHTML=h;w._h=h;}}

/* ---------- pintura: encaixe nas colunas que já existem ---------- */
opFazerHTML=(function(f0){return function(){var h=f0.apply(this,arguments).replace(/<div class="op-add">[\s\S]*?<\/div>\s*$/,'');var aberto=false;try{aberto=localStorage.getItem('astro_op_tudo')==='1';}catch(e){}
 var topo=op2FogModo()?op2FogHTML():op2BusHTML(),ig=h.indexOf('<div class="op-grp'),cab='';if(ig>0){cab=h.slice(0,ig);h=h.slice(ig);}
 return cab+topo+'<details class="op-tudo"'+(aberto?' open':'')+'><summary data-optudo>ver tudo · lista completa</summary><div class="op-tudo-c">'+h+'</div></details>';};})(opFazerHTML);
opFocoHTML=(function(f0){return function(){var h=f0.apply(this,arguments);
 h=/<div class="op-fx">[\s\S]*?<\/div>/.test(h)?h.replace(/(<div class="op-fx">[\s\S]*?<\/div>)/,'$1'+op2ViradaHTML()):h+op2ViradaHTML();
 return op2MedHTML()+h+'<button type="button" class="op-comp-b" data-opcomp>modo companhia</button>';};})(opFocoHTML);
opLadoHTML=(function(f0){return function(){var h=f0.apply(this,arguments),s=op2SaidaHTML(),i=h.indexOf('<div class="op-grp"><span class="op-k">próximos');
 if(s)h=i>=0?h.slice(0,i)+s+h.slice(i):h+s;return h+op2FlechasHTML();};})(opLadoHTML);
opLinhaHTML=(function(f0){return function(){var h=f0.apply(this,arguments),v=op2Virada(),a=opMin(),H0=op2Faixa();if(!H0)return h;var fim=+H0*60+180,m=fim-a;
 return h.replace(/(class="op-v?seg op-atual"[\s\S]*?)(<\/button>)/,'$1<em class="op-falta">faltam '+(m>=60?Math.floor(m/60)+'h'+String(m%60).padStart(2,'0'):m+' min')+'</em>$2');};})(opLinhaHTML);
opPinta=(function(f0){return function(){f0.apply(this,arguments);var o=document.getElementById('modo-op');if(!o||!document.body.classList.contains('op-on'))return;
 var fc=o.querySelector('.op-foco');if(fc)fc.classList.toggle('op-com-nectar',!!o.querySelector('.op-nectar'));
 o.classList.toggle('op-bat1',op2Bat()===1);};})(opPinta);
opMonta=(function(f0){return function(){var novo=!document.getElementById('modo-op'),o=f0.apply(this,arguments);if(!novo||o.dataset.op2)return o;o.dataset.op2=1;
 /* 10 · no Posto só se executa: faixa não leva para a grade */
 o.addEventListener('click',function(e){var b=e.target.closest('button,summary');if(!b||!o.contains(b))return;var d=b.dataset,ox=opx(),hj=hoje();
  if(d.opfx){e.preventDefault();e.stopImmediatePropagation();tdAvisa('A grade se edita no templo','no Posto só se executa. Para mudar a faixa, use “templo completo”.');return;}
  if(d.optudo!=null){e.preventDefault();e.stopImmediatePropagation();var ab=!(b.parentNode&&b.parentNode.open);try{localStorage.setItem('astro_op_tudo',ab?'1':'0');}catch(z){}b.parentNode.open=ab;return;}
  if(d.opbat){e.stopImmediatePropagation();ox.bat[hj]=+d.opbat;op2Salva();opPinta();return;}
  if(d.opbus){e.stopImmediatePropagation();var it=op2Atual(),k=d.opbus;
   if(k==='go'&&it){ox.fk=it.k;ox.fkItem=it;var dur=op2Dur();tdFocoIni(dur,(op2Bat()===1?'5 min · ':'')+it.t,it.tipo==='pl'?it.i:-1);op2Salva();}
   else if(k==='ok'&&it){op2XP(op2Feito(it),e);}
   else if(k==='okfim'&&it){if(tdD().foco)tdFocoFim(true);op2XP(op2Feito(it),e,null);ox.fk=null;ox.fkItem=null;op2Salva();}
   else if(k==='parar'){if(tdD().foco)tdFocoFim(true);ox.fk=null;ox.fkItem=null;op2Salva();}
   else if(k==='skip'&&it){(ox.skip[hj]=ox.skip[hj]||[]).push(it.k);op2Salva();}
   else if(k==='reset'){ox.skip[hj]=[];op2Salva();}
   try{tdDisco(true);}catch(z){}opPinta();return;}
  if(d.opcp){e.stopImmediatePropagation();try{navigator.clipboard.writeText(d.opcp);}catch(z){}op2XP(0,e,'copiado');return;}
  if(d.opfog){e.stopImmediatePropagation();if(d.opfog==='abre'){ox.fogAberta=hj;op2Salva();}else if(d.opfog==='fecha'){ox.fogAberta=null;op2Salva();}else if(d.opfog==='apaga')op2FogApaga(e);opPinta();return;}
  if(d.opest){e.stopImmediatePropagation();var p=d.opest.split(':'),E=ox.est[hj]||[],t=E[+p[1]];if(t!=null){if(p[0]==='cx')op2Caixa(t);E.splice(+p[1],1);op2Salva();}opPinta();return;}
  if(d.opmed){e.stopImmediatePropagation();var q=d.opmed.split(':'),tk=q.slice(1).join(':');if(q[0]==='t'){op2Tomei(tk);op2XP(0,e,'néctar tomado');}else op2Adia(tk);opPinta();return;}
  if(d.opcomp!=null){e.stopImmediatePropagation();op2Comp(true);return;}
  if(d.optrajb!=null){e.stopImmediatePropagation();var ti=o.querySelector('[data-optraj]'),v=ti?+ti.value:0;if(v>0){ox.cfg.traj=Math.round(v);op2Salva();opPinta();}return;}
  /* 11 · +XP na hora nos marcadores que já existiam */
  var Q=mmD();if(d.opch){var c=Q.chale.filter(function(x){return x.id===d.opch;})[0];if(c&&!c.ok)op2XP(3,e);}
  else if(d.opq){if((Q.feitas[hj]||[]).indexOf(d.opq)<0)op2XP(5,e);}
  else if(d.oppp)op2XP(10,e);},true);
 o.addEventListener('input',function(e){var t=e.target;if(t.dataset.oppasso){opx().passo[t.dataset.oppasso]=t.value.slice(0,80);clearTimeout(op2Salva.t);op2Salva.t=setTimeout(op2Salva,400);}
  else if(t.dataset.opfogi){var ox=opx();ox.fogR=ox.fogR||{};ox.fogR[t.dataset.opfogi]=t.value;clearTimeout(op2Salva.t);op2Salva.t=setTimeout(op2Salva,400);}});
 o.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var t=e.target;if(t.dataset.oppasso!=null){e.preventDefault();t.blur();}else if(t.dataset.optraj!=null){e.preventDefault();var b=o.querySelector('[data-optrajb]');if(b)b.click();}},true);
 return o;};})(opMonta);
/* 7 · o fim de um bloco conta como flecha */
tdFocoFim=(function(f0){return function(reg){var f=tdD().foco,conta=reg&&f&&!f.pausaModo&&((f.pausa!=null?f.dur-f.pausa:Date.now()-f.ini)>=30000);var r=f0.apply(this,arguments);if(conta){try{op2XP(0,null,'+1 flecha');}catch(e){}var o=S.opx;if(o&&o.fk&&!tdD().foco){/* mantém a coisa da vez até marcar feito */}}return r;};})(tdFocoFim);
setInterval(function(){try{op2Proc();op2MedAlarme();op2SaidaAlarme();op2Lotus();}catch(e){console.error('posto:',e);}},30000);
setInterval(function(){try{op2CompPinta();}catch(e){}},1000);
setTimeout(function(){try{opx();op2Proc();op2MedAlarme();}catch(e){}},2500);

/* ======================= Clepsidra: o dia escoando =======================
   A água ocupa o que ainda resta do dia (do agora até as 24h) e baixa conforme as horas passam;
   uma gota cai no ponteiro do agora; marcas a cada hora; os blocos de foco de hoje aparecem como
   flechas douradas na lateral; embaixo, o próximo compromisso e quanto falta. */
function clepFocos(){var hj=hoje(),L=[];try{(vxData().sessions||[]).forEach(function(x){if(x.day!==hj)return;var m=/(\d{13})/.exec(String(x.id||''));if(!m)return;var fim=new Date(+m[1]),f=fim.getHours()*60+fim.getMinutes(),ini=f-Math.max(1,+x.minutes||0);L.push({i:ini,f:f,t:(x.result||'foco')+' · '+Math.round(+x.minutes||0)+' min'});});}catch(e){}return L;}
function clepProx(){var a=opMin(),L=[];try{rtD().toques.forEach(function(t){if(t.on&&rtMin(t.h)>a)L.push({m:rtMin(t.h),h:t.h,t:t.n});});}catch(e){}
 try{agDoDia(hoje()).forEach(function(x){if(x.dia)return;var m=x.ini.getHours()*60+x.ini.getMinutes();if(m>a)L.push({m:m,h:agHora(x),t:x.t});});}catch(e){}
 try{rtGradeHoje().forEach(function(x){if(x.m>a)L.push({m:x.m,h:x.h,t:x.t});});}catch(e){}
 L.sort(function(p,q){return p.m-q.m;});return L[0]||null;}
opLinhaHTML=(function(f0){return function(){var h=f0.apply(this,arguments),a=opMin(),ini=360,fim=1440,pct=function(m){return Math.max(0,Math.min(100,(m-ini)/(fim-ini)*100));};
 var p=pct(a),pas=Math.round(p);
 var tk='';for(var hh=7;hh<24;hh++){if(hh%3===0)continue;tk+='<span class="op-tk" style="top:'+pct(hh*60)+'%"></span>';}
 var fo=clepFocos().map(function(x){var t=pct(x.i),b=pct(x.f);return '<i class="op-vfoco" style="top:'+t+'%;height:'+Math.max(.8,b-t)+'%" title="'+esc(x.t)+'"></i>';}).join('');
 var agua=a<fim?'<div class="op-agua" style="top:'+p+'%"><i class="op-gota"></i></div>':'';
 h=h.replace('<div class="op-vhs">','<div class="op-vhs">'+tk).replace('<div class="op-vagora"',agua+fo+'<div class="op-vagora"');
 h=h.replace('<small>linha do dia</small>','<small>o dia escoando · '+pas+'% passou</small>');
 var px=clepProx(),rest=px?px.m-a:0;
 h+='<div class="op-vprox">'+(px?'<small>próximo</small><b>'+esc(px.h)+'</b><span>'+esc(px.t)+'</span><em>em '+(rest>=60?Math.floor(rest/60)+'h'+String(rest%60).padStart(2,'0'):rest+' min')+'</em>':'<small>próximo</small><span>nada mais marcado hoje</span>')+'</div>';
 return h;};})(opLinhaHTML);

/* ======================= Antagonista do bloco pesado =======================
   Todo dia um monstro (ou desafio) é sorteado para o bloco mais pesado. Ele aparece na faixa da Clepsidra,
   anuncia-se num diálogo quando o bloco começa, e vencer dá XP ao Sully e entra nos Diário de bordo.
   Fugir não tem castigo: o monstro volta amanhã. Só criaturas, nenhum deus. */
var ANTAG=[
 {k:'hidra',n:'Hidra de Lerna',o:'pendências que se multiplicam',d:'Feche três cabeças em sequência: três itens terminados sem abrir nenhum novo no meio.'},
 {k:'medusa',n:'Medusa',o:'travar diante da tarefa',d:'Não encare de frente: comece pelo canto mais fácil por 5 minutos, pelo reflexo do escudo.'},
 {k:'minotauro',n:'Minotauro',o:'o processo longo e confuso',d:'Leve o fio de Ariadne: a cada 25 minutos, escreva em uma linha onde você está no labirinto.'},
 {k:'leao',n:'Leão de Nemeia',o:'a tarefa difícil sem atalho',d:'Nada de flecha: 50 minutos corpo a corpo na parte mais difícil, sem trocar de tarefa.'},
 {k:'sereias',n:'Sereias',o:'notificações e feed infinito',d:'Cera nos ouvidos: celular em outro cômodo durante o bloco inteiro.'},
 {k:'empousa',n:'Empousa',o:'a tentação de abrir rede social',d:'Ela se disfarça de "só uma olhadinha": nenhuma rede social até o fim do bloco.'},
 {k:'telquines',n:'Telquines',o:'sistema travando, PJe caindo',d:'Se algo travar, anote e passe para o próximo item. Conserto fica para depois do bloco.'},
 {k:'quimera',n:'Quimera',o:'tarefa com três problemas misturados',d:'Separe as três cabeças no papel antes de começar e resolva uma de cada vez.'},
 {k:'ciclope',n:'Ciclope',o:'teimar num caminho que não rende',d:'Se em 20 minutos não andar, mude de ângulo: outra peça, outro modelo, outra pergunta.'},
 {k:'nevoa',n:'Névoa',o:'cabeça embaçada',d:'Antes da primeira flecha: um copo de água e dois minutos de ar na janela.'},
 {k:'procusto',n:'Procusto',o:'o bloco que estica além da hora',d:'O bloco termina na hora marcada. Nem um minuto a mais na cama de Procusto.'},
 {k:'lotus',n:'Lotófagos',o:'o hiperfoco errado que come as horas',d:'Timer visível do começo ao fim; quando tocar, levante da cadeira.'},
 {k:'harpias',n:'Harpias',o:'bagunça que rouba a atenção',d:'Mesa limpa e só uma aba aberta antes de começar.'},
 {k:'esfinge',n:'Esfinge',o:'questões e enigmas',d:'Dez enigmas em sequência antes de qualquer pausa, sem olhar a resposta no meio.'},
 {k:'caribdis',n:'Caríbdis',o:'o redemoinho do e-mail e do WhatsApp',d:'Caixa de entrada fechada durante o bloco; abra só nos últimos 5 minutos.'},
 {k:'ladon',n:'Ládon',o:'o dragão que guarda a recompensa',d:'A recompensa do dia (café, série, jogo) só depois de vencer este bloco.'},
 {k:'gerioes',n:'Gerião',o:'três frentes ao mesmo tempo',d:'Escolha uma das três frentes e esconda as outras duas até o fim.'},
 {k:'cila',n:'Cila',o:'perder um pedaço de cada vez para as distrações',d:'Toda vez que desviar, risque um tracinho. Termine o bloco com menos de três.'}];
function antD(){S.antag=S.antag||{};var A=S.antag;A.dia=A.dia||{};if(!A.faixa)A.faixa='09';return A;}
function antHoje(){var A=antD(),hj=hoje(),x=A.dia[hj];
 if(!x){var n=0;for(var i=0;i<hj.length;i++)n=(n*31+hj.charCodeAt(i))%9973;var ant=A.ult||'';var m=ANTAG[n%ANTAG.length];if(m.k===ant)m=ANTAG[(n+5)%ANTAG.length];
  x=A.dia[hj]={fx:A.faixa,m:m.k,st:'aberto',rer:0,anun:0};A.ult=m.k;Object.keys(A.dia).forEach(function(k){if(k<gabMais(hj,-20))delete A.dia[k];});try{grava();}catch(e){}}
 return x;}
function antMonstro(k){return ANTAG.filter(function(m){return m.k===k;})[0]||ANTAG[0];}
var ANT_IC='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/><path d="M9.5 17.5L21 6V3h-3L6.5 14.5M11 19l-6-6M8 16l-4 4M5 21l-2-2"/></svg>';
function antDlg(){var d=document.getElementById('ant-dlg');if(d)return d;d=document.createElement('dialog');d.id='ant-dlg';d.className='ave-dlg ant-dlg';d.setAttribute('aria-label','Antagonista do bloco pesado');document.body.appendChild(d);
 d.addEventListener('click',function(e){var b=e.target.closest('button');if(!b){if(e.target===d)d.close();return;}var x=antHoje(),A=antD(),c=b.dataset;
  if(c.antfx){x.fx=c.antfx;A.faixa=c.antfx;x.anun=0;try{grava();}catch(z){}antPinta();try{opPinta();}catch(z){}return;}
  if(c.antrer!=null&&x.rer<1&&x.st==='aberto'){var i=ANTAG.findIndex(function(m){return m.k===x.m;}),j=(i+1+Math.floor(Math.random()*(ANTAG.length-1)))%ANTAG.length;x.m=ANTAG[j].k;x.rer=1;A.ult=x.m;try{grava();}catch(z){}antPinta();try{opPinta();}catch(z){}return;}
  if(c.antok!=null&&x.st==='aberto'){x.st='vencido';var m=antMonstro(x.m);try{var sc=satCfg(),antes=satNivel(sc.xp).n;sc.xp+=20;var nv=satNivel(sc.xp);anota('Antagonista vencido: '+m.n+' no bloco das '+x.fx+'h. +20 XP para o Sully.',0,false,true);grava();if(nv.n>antes)setTimeout(function(){satToast('Subi para o nível '+nv.n+' · '+nv.nome+'. Você derrubou '+(m.n)+', cara!');},400);}catch(z){}
   antPinta();try{opPinta();pinta();}catch(z){}return;}
  if(c.antfuga!=null&&x.st==='aberto'){x.st='fugiu';try{anota('O '+antMonstro(x.m).n+' escapou hoje. Sem castigo: amanhã tem outro.',0,false,true);grava();}catch(z){}antPinta();try{opPinta();}catch(z){}return;}
  if(c.antx!=null)d.close();});
 return d;}
function antPinta(){var d=document.getElementById('ant-dlg');if(!d)return;var x=antHoje(),m=antMonstro(x.m);
 var fxs=(typeof TD_H!=='undefined'?TD_H:['06','09','12','15','18','21']).map(function(H){return '<button type="button" class="'+(x.fx===H?'on':'')+'" data-antfx="'+H+'">'+H+'h<small>'+esc(tdFaixaNome?tdFaixaNome(H):'')+'</small></button>';}).join('');
 var st=x.st==='vencido'?'<p class="ant-st ok">Vencido. +20 XP para o Sully, e já está nos Diário de bordo.</p>':x.st==='fugiu'?'<p class="ant-st">Escapou hoje. Sem castigo: amanhã tem outro.</p>':'';
 d.innerHTML='<div class="ad-lista"><section class="ant-msg"><span class="ant-ic">'+ANT_IC+'</span><div><span class="ad-k">antagonista do bloco pesado · '+x.fx+'h</span><b>'+esc(m.n)+'</b><small>'+esc(m.o)+'</small>'+
  '<p class="ant-des"><em>desafio</em>'+esc(m.d)+'</p>'+st+'</div></section>'+
  '<div class="ant-fx"><span class="ad-k">qual é o bloco mais pesado hoje?</span><div>'+fxs+'</div></div></div>'+
  '<footer>'+(x.st==='aberto'?(x.rer<1?'<button type="button" data-antrer>sortear outro</button>':'')+'<button type="button" data-antfuga>escapou hoje</button><button type="button" class="ad-ok" data-antok>venci</button>':'<button type="button" class="ad-ok" data-antx>fechar</button>')+'</footer>';}
function antAbre(){var d=antDlg();antPinta();if(!d.open){try{d.showModal();}catch(e){d.setAttribute('open','');}}}
/* na Clepsidra: a faixa pesada leva o monstro; embaixo, uma placa para abrir o desafio */
opLinhaHTML=(function(f0){return function(){var h=f0.apply(this,arguments),x=antHoje(),m=antMonstro(x.m);
 var tag='<em class="op-antag'+(x.st!=='aberto'?' '+x.st:'')+'">'+ANT_IC+esc(m.n)+'</em>';
 h=h.replace(new RegExp('(<button type="button" class="op-vseg[^"]*" data-opfx="'+x.fx+'"[^>]*>)'),function(s){return s.replace('class="op-vseg','class="op-vseg op-pesado')+tag;});
 h=h.replace('<div class="op-vprox">','<button type="button" class="op-antbt'+(x.st!=='aberto'?' '+x.st:'')+'" data-antabre><span>'+ANT_IC+'</span><b>'+esc(m.n)+'</b><small>'+(x.st==='vencido'?'vencido':x.st==='fugiu'?'escapou':'bloco das '+x.fx+'h')+'</small></button><div class="op-vprox">');
 return h;};})(opLinhaHTML);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-antabre]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();antAbre();},true);
/* anuncia quando o bloco pesado começa (uma vez por dia) */
function antAnuncia(){var x=antHoje();if(x.anun||x.st!=='aberto')return;var a=opMin(),ini=+x.fx*60;if(a<ini||a>ini+180)return;x.anun=1;try{grava();}catch(e){}antAbre();}
setInterval(function(){try{antAnuncia();}catch(e){}},60000);setTimeout(function(){try{antAnuncia();}catch(e){}},4000);
window.KALAMO.antag=antAbre;


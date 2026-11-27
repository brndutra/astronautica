/* ===== Tools gerais: Comando + Ferramentas (overlay) ===== */
function pdStr(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
let gtActive=null,gtOpenSec={};
function gtSection(id,title,icon,body){const open=!!gtOpenSec[id];return `<section class="gtsec${open?' open':''}"><button type="button" class="gtsech" data-gtsec="${id}"><span class="gtseci">${icon}</span><span class="gtsect">${title}</span><span class="gtseca">${open?'⌄':'›'}</span></button><div class="gtsecbody">${body}</div></section>`;}
const DOCK_META={raven:['o corvo avisa','Notificações',()=>renderRaven()],retomada:['onde você parou','Retomada',()=>renderRetomada()],projetos:['visão geral','Projetos',()=>renderProjetosMain()],captura:['captura rápida','Captura',()=>renderCaptura()],referencias:['referências rápidas','Referências rápidas',()=>renderFerramentas()]};
function renderProjetosRetomadas(){return renderProjetos()+'<div style="height:6px"></div>'+renderRetomada();}
function ravenItems(){const H=state.habit,now=Date.now();let items=[];
  const rc=(H.retomadas||[]).length;if(rc)items.push({ic:'🧭',t:`${rc} para retomar`,s:'onde você parou',k:'retomada'});
  (H.projetos||[]).forEach(p=>{const days=Math.floor((now-(p.last||0))/864e5);if(days>10)items.push({ic:'📊',t:`"${p.name}" abandonado`,s:`há ${days} dias sem toque`,k:'projetos'});else if(days>3)items.push({ic:'📊',t:`"${p.name}" esfriando`,s:`há ${days} dias`,k:'projetos'});});
  (H.captures||[]).forEach(n=>{if(n.done)return;if(n.alarm&&n.alarm<=now)items.push({ic:'⏰',t:n.txt,s:'alarme disparado',k:'captura'});else if(n.date){const dt=new Date(n.date+'T'+(n.time||'23:59'));if(dt.getTime()<=now)items.push({ic:'📅',t:n.txt,s:'prazo vencido',k:'captura'});}});
  return items;}
function renderRaven(){const items=ravenItems();
  let h=`<p class="chelp" style="margin-top:0">O corvo observa o que precisa da sua atenção — projetos parados, retomadas em aberto e alarmes vencidos.</p>`;
  if(!items.length){h+=`<div class="ravenempty">🪶 Nada urgente. Tudo sob controle.</div>`;return h;}
  h+=`<div class="ravenlist">`+items.map(it=>`<button class="ravenitem" data-raven-go="${it.k}"><span class="rvic">${it.ic}</span><span class="rvbd"><span class="rvt">${hesc(it.t)}</span><span class="rvs">${hesc(it.s)}</span></span><span class="rvarr">›</span></button>`).join('')+`</div>`;
  return h;}
function updateRavenBadge(){const b=document.getElementById('ravenBadge');if(!b)return;const n=ravenItems().length;b.textContent=n>9?'9+':String(n);b.style.display=n?'grid':'none';const btn=document.querySelector('.td-raven');if(btn)btn.classList.toggle('alert',n>0);}
function gtIsOpen(){return document.body.classList.contains('dock-open');}
function gtRender(){if(!gtIsOpen()||!gtActive)return;const m=DOCK_META[gtActive];if(!m)return;document.getElementById('dockEb').textContent=m[0];document.getElementById('dockTitle').textContent=m[1];document.getElementById('dockBody').innerHTML=m[2]();updateRavenBadge();}
function openGT(which){if(gtActive===which&&gtIsOpen()){closeGT();return;}gtActive=which;document.body.classList.add('dock-open');document.querySelectorAll('#toolDock .td-ic-btn').forEach(b=>b.classList.toggle('on',b.dataset.dock===which));gtRender();document.getElementById('dockBody').scrollTop=0;}
function closeGT(){document.body.classList.remove('dock-open');gtActive=null;document.querySelectorAll('#toolDock .td-ic-btn').forEach(b=>b.classList.remove('on'));}
function renderCaptura(){
  const H=state.habit,A=state.asgard;let h='';
  const cats=H.qcats,catMap={};cats.forEach(c=>catMap[c.id]=c);
  const all=H.captures||[];
  const areaOpts=`<option value="">área…</option>`+A.areas.map(a=>`<option value="${a.id}">${a.ic} ${a.name}</option>`).join('');
  const goalOpts=`<option value="">meta…</option>`+A.goals.map(g=>`<option value="${g.id}">${hesc(g.title)}</option>`).join('');
  const catOpts=cats.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  const composer=`<div class="hcard capcomposer"><input id="capText" class="qnin" placeholder="Escreva uma nota ou tarefa…"><div class="caprow"><select id="capKind" class="qnsel"><option value="nota">📝 Nota</option><option value="task">☑ Tarefa</option></select><select id="capCat" class="qnsel">${catOpts}</select><select id="capArea" class="qnsel">${areaOpts}</select><select id="capGoal" class="qnsel">${goalOpts}</select></div><div class="caprow"><label class="qnalw"><span class="qnalk">📅</span><input id="capDate" type="date" class="qnsel qnalarm"></label><label class="qnalw"><span class="qnalk">⏰</span><input id="capTime" type="time" class="qnsel qnalarm"></label><button class="qnadd" id="capAdd">+ capturar</button></div></div>`;
  h+=gtSection('cap-new','Capturar','🗒️',composer);
  const pend=all.filter(n=>!n.done);
  let listBody=`<div class="qnfilters"><button class="qnchip${capFilter==='todas'?' on':''}" data-capf="todas">Todas <b>${pend.length}</b></button><button class="qnchip${capFilter==='nota'?' on':''}" data-capf="nota">Notas <b>${pend.filter(n=>n.kind==='nota').length}</b></button><button class="qnchip${capFilter==='task'?' on':''}" data-capf="task">Tarefas <b>${pend.filter(n=>n.kind==='task').length}</b></button><button class="qnchip${capFilter==='done'?' on':''}" data-capf="done">Concluídas <b>${all.filter(n=>n.done).length}</b></button></div>`;
  let list=all.slice();
  if(capFilter==='done')list=list.filter(n=>n.done);else{list=list.filter(n=>!n.done);if(capFilter==='nota'||capFilter==='task')list=list.filter(n=>n.kind===capFilter);}
  list.sort((a,b)=>{const ax=a.date?new Date(a.date+'T'+(a.time||'00:00')).getTime():Infinity;const bx=b.date?new Date(b.date+'T'+(b.time||'00:00')).getTime():Infinity;if(ax!==bx)return ax-bx;return b.created-a.created;});
  if(!list.length){listBody+=`<div class="qnempty">Nada aqui ainda. Capture sua primeira nota ou tarefa.</div>`;}
  else{listBody+=`<div class="qnlist">`+list.map(n=>{const c=catMap[n.cat]||{name:'—',color:'#999'};const a=areaById(n.area),g=goalById(n.goal);
    let assoc='';if(n.date){const dd=new Date(n.date+'T00:00:00');assoc=`<span class="qnalb up">📅 ${dd.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})}${n.time?' '+n.time:''}</span>`;}
    let alarmB='';if(n.alarm){const due=n.alarm<=Date.now();alarmB=`<span class="qnalb ${n.fired||due?'rang':'up'}">⏰ ${qnAlarmLabel(n.alarm)}</span>`;}
    const areaB=a?`<span class="qnarea" style="--cc:${a.color}">${a.ic} ${a.name}</span>`:'';
    const goalB=g?`<span class="qngoal">🎯 ${hesc(g.title)}</span>`:'';
    const check=n.kind==='task'?`<button class="qncheck" data-cap-done="${n.id}" title="${n.done?'reabrir':'concluir'}">✓</button>`:`<span class="capdot" style="--cc:${c.color}"></span>`;
    return `<div class="qnitem${n.done?' done':''}${n.kind==='task'?' istask':''}" style="--cc:${a?a.color:c.color}">${check}<div class="qnbody"><div class="qntop"><span class="qncat"><i style="background:${c.color}"></i>${c.name}</span>${areaB}${goalB}${assoc}${alarmB}<span class="qnwhen">${timeAgo(n.created)}</span></div><div class="qntxt">${hesc(n.txt)}</div></div><div class="qnacts"><button class="qnact" data-cap-edit="${n.id}" title="data · área · meta">✎</button><button class="qnact${n.alarm?' has':''}" data-cap-alarm="${n.id}" title="alarme">⏰</button><button class="qnact" data-cap-del="${n.id}" title="remover">✕</button></div></div>`;
  }).join('')+`</div>`;}
  h+=gtSection('cap-list','Itens capturados','📥',listBody);
  return h;
}
function capAdd(){const t=document.getElementById('capText');if(!t)return;const txt=t.value.trim();if(!txt)return;
  const kind=document.getElementById('capKind').value,cat=document.getElementById('capCat').value,area=document.getElementById('capArea').value||null,goal=document.getElementById('capGoal').value||null,dv=document.getElementById('capDate').value||null,tv=document.getElementById('capTime').value||null;
  state.habit.captures.unshift({id:uid(),kind,txt,cat,area,goal,created:Date.now(),date:dv,time:tv,done:false,alarm:null,fired:false});save();gtRender();}
function openCapEdit(id){capEditId=id;const n=(state.habit.captures||[]).find(x=>x.id===id);if(!n)return;const A=state.asgard;
  document.getElementById('capEditTxt').textContent=n.txt;
  document.getElementById('capEditDate').value=n.date||'';document.getElementById('capEditTime').value=n.time||'';
  document.getElementById('capEditArea').innerHTML=`<option value="">área…</option>`+A.areas.map(a=>`<option value="${a.id}"${a.id===n.area?' selected':''}>${a.ic} ${a.name}</option>`).join('');
  document.getElementById('capEditGoal').innerHTML=`<option value="">meta…</option>`+A.goals.map(g=>`<option value="${g.id}"${g.id===n.goal?' selected':''}>${hesc(g.title)}</option>`).join('');
  openModal('capEditModal');}
function renderProjetosMain(){
  const H=state.habit;const todayStr=pdStr();
  const yy=+mes.split('-')[0],mm=+mes.split('-')[1];const dim=new Date(yy,mm,0).getDate(),fw=new Date(yy,mm-1,1).getDay();
  const dayCount={};H.projetos.forEach(p=>(p.days||[]).forEach(ds=>{const dd=new Date(ds+'T00:00:00');if(dd.getFullYear()===yy&&dd.getMonth()===mm-1)dayCount[dd.getDate()]=(dayCount[dd.getDate()]||0)+1;}));
  const nowD=new Date();let cal='';for(let b=0;b<fw;b++)cal+='<span class="mcd off"></span>';
  for(let d=1;d<=dim;d++){const c=dayCount[d]||0;const isT=(nowD.getFullYear()===yy&&nowD.getMonth()===mm-1&&nowD.getDate()===d);cal+=`<span class="mcd${isT?' today':''}${c>=2?' full':c===1?' part':''}" title="${c} projeto(s)">${d}</span>`;}
  const calBody=`<div class="hcard" style="padding:13px"><div class="ameshd"><span class="al">📆 ${monthLabel(mes)}</span><span class="amesm" style="font-size:10.5px;color:var(--ink-soft);font-weight:600">sincronizado · Semana &amp; Mês</span></div><div class="mcal" style="margin-top:8px"><div class="mcalh">${WD.map(d=>`<span>${d}</span>`).join('')}</div><div class="mcalg">${cal}</div></div></div>`;
  const R=[...H.retomadas].sort((a,b)=>b.ts-a.ts);
  const retomadaBlock=r=>`<div class="pjrt"><div class="pjrtti">${hesc(r.title)}</div><div class="pjrtnx"><b>Próximo:</b> ${hesc(r.next||'—')}</div><div class="pjrtacts"><span class="when">há ${timeAgo(r.ts)}</span><span class="cclink" data-rt-up="${r.id}">↑ retomei agora</span><span class="cclink" data-rt-sched="${r.id}">⏱ agendar</span><span class="cclink" data-rt-edit="${r.id}">editar</span><span class="cclink mut" data-rt-del="${r.id}">remover</span></div></div>`;
  const P=[...H.projetos].sort((a,b)=>a.last-b.last);let cards='';
  P.forEach(p=>{const days=Math.floor((Date.now()-p.last)/864e5);let cls='ok',lab='ativo';if(days>10){cls='cold';lab='abandonado';}else if(days>3){cls='warn';lab='esfriando';}const c=CTXS[p.ctx]||CTXS.pessoal;const today=(p.days||[]).includes(todayStr);const n=(p.days||[]).length;
    const rts=R.filter(r=>r.proj===p.id);
    const rtHTML=rts.length?rts.map(retomadaBlock).join(''):`<button class="pjrtadd" data-pj-rt-add="${p.id}">🧭 + registrar retomada deste projeto</button>`;
    cards+=`<div class="pjcard ${cls}" style="--cc:${c.cor}"><div class="pjcardtop"><span class="pjdot"></span><div class="pjinfo"><div class="pn">${hesc(p.name)}</div><div class="pm">${c.ic} ${c.label} · <b>${n}</b> dia(s) · ${days===0?'hoje':'há '+days+(days===1?' dia':' dias')}</div></div><span class="ccstat ${cls}">${lab}</span><span class="ccx" data-pj-del="${p.id}" title="remover projeto">✕</span></div><div class="pjcardacts"><button class="cclink${today?' mut':''}" data-pj-day="${p.id}">${today?'✓ dediquei hoje':'✋ dediquei hoje'}</button><label class="pjdate" title="registrar outro dia">📅 outro dia<input type="date" data-pj-dayadd="${p.id}"></label></div><div class="pjcardrt">${rtHTML}</div></div>`;});
  cards+=`<button class="pjaddcard" data-pj-add="1">＋ novo projeto</button>`;
  const Rsolta=R.filter(r=>!r.proj);let rinner='';
  if(Rsolta.length){rinner=Rsolta.map(r=>`<div class="ccrow"><div class="body"><div class="ti">${hesc(r.title)}</div><div class="nx"><b>Próximo:</b> ${hesc(r.next||'—')}</div><div class="r">${ctxTag(r.ctx)}<span class="when">há ${timeAgo(r.ts)}</span><span class="cclink" data-rt-link="${r.id}">🗂 vincular projeto</span><span class="cclink" data-rt-up="${r.id}">↑ retomei agora</span><span class="cclink" data-rt-sched="${r.id}">⏱ agendar no dia</span><span class="cclink" data-rt-edit="${r.id}">editar</span><span class="cclink mut" data-rt-del="${r.id}">remover</span></div></div></div>`).join('');
  }else{rinner=`<div class="ccempty">Nenhuma retomada solta — as vinculadas aparecem dentro do próprio projeto.</div>`;}
  rinner+=`<div style="margin-top:10px"><span class="cclink" data-rt-add="1" style="font-size:13px">+ nova retomada solta</span></div>`;
  let h=`<p class="chelp" style="margin-top:0">Cada projeto já traz sua retomada — retome, agende ou edite direto no card, sem precisar procurar em outro lugar.</p>`;
  h+=gtSection('pj-list','Projetos & retomadas','📊',`<div class="pjgrid">${cards}</div>`);
  h+=gtSection('pj-rt-solta','Retomadas soltas','🧭',rinner);
  h+=gtSection('pj-cal','Calendário de dedicação','📅',calBody);
  return h;
}
function renderRetomada(){
  const H=state.habit;const R=[...H.retomadas].sort((a,b)=>b.ts-a.ts);
  let inner='';
  if(R.length){R.forEach(r=>{const proj=r.proj?H.projetos.find(p=>p.id===r.proj):null;const projTag=proj?`<span class="cclink mut" data-rt-link="${r.id}">🗂 ${hesc(proj.name)}</span>`:`<span class="cclink" data-rt-link="${r.id}">🗂 vincular projeto</span>`;
    inner+=`<div class="ccrow"><div class="body"><div class="ti">${hesc(r.title)}</div><div class="nx"><b>Próximo:</b> ${hesc(r.next||'—')}</div><div class="r">${ctxTag(r.ctx)}<span class="when">há ${timeAgo(r.ts)}</span>${projTag}<span class="cclink" data-rt-up="${r.id}">↑ retomei agora</span><span class="cclink" data-rt-sched="${r.id}">⏱ agendar no dia</span><span class="cclink" data-rt-edit="${r.id}">editar</span><span class="cclink mut" data-rt-del="${r.id}">remover</span></div></div></div>`;});
  }else{inner+=`<div class="ccempty">Nada em aberto — adicione o que você quer retomar.</div>`;}
  inner+=`<div style="margin-top:10px"><span class="cclink" data-rt-add="1" style="font-size:13px">+ nova retomada</span></div>`;
  let h=`<p class="chelp" style="margin-top:0">Onde você parou — e o próximo passo concreto.</p>`;
  h+=gtSection('rt-list','Retomadas','🧭',inner);
  return h;
}
function renderProjetos(){
  const H=state.habit;const todayStr=pdStr();
  const yy=+mes.split('-')[0],mm=+mes.split('-')[1];const dim=new Date(yy,mm,0).getDate(),fw=new Date(yy,mm-1,1).getDay();
  const dayCount={};H.projetos.forEach(p=>(p.days||[]).forEach(ds=>{const dd=new Date(ds+'T00:00:00');if(dd.getFullYear()===yy&&dd.getMonth()===mm-1)dayCount[dd.getDate()]=(dayCount[dd.getDate()]||0)+1;}));
  const nowD=new Date();let cal='';for(let b=0;b<fw;b++)cal+='<span class="mcd off"></span>';
  for(let d=1;d<=dim;d++){const c=dayCount[d]||0;const isT=(nowD.getFullYear()===yy&&nowD.getMonth()===mm-1&&nowD.getDate()===d);cal+=`<span class="mcd${isT?' today':''}${c>=2?' full':c===1?' part':''}" title="${c} projeto(s)">${d}</span>`;}
  const calBody=`<div class="hcard" style="padding:13px"><div class="ameshd"><span class="al">📆 ${monthLabel(mes)}</span><span class="amesm" style="font-size:10.5px;color:var(--ink-soft);font-weight:600">sincronizado · Semana &amp; Mês</span></div><div class="mcal" style="margin-top:8px"><div class="mcalh">${WD.map(d=>`<span>${d}</span>`).join('')}</div><div class="mcalg">${cal}</div></div></div>`;
  const P=[...H.projetos].sort((a,b)=>a.last-b.last);let listInner='';
  P.forEach(p=>{const days=Math.floor((Date.now()-p.last)/864e5);let cls='ok',lab='ativo';if(days>10){cls='cold';lab='abandonado';}else if(days>3){cls='warn';lab='esfriando';}const c=CTXS[p.ctx]||CTXS.pessoal;const today=(p.days||[]).includes(todayStr);const n=(p.days||[]).length;
    listInner+=`<div class="ccproj"><span class="ccdot" style="background:${c.cor}"></span><div class="body"><div class="pn">${hesc(p.name)}</div><div class="pm">${c.ic} ${c.label} · <b>${n}</b> dia(s) · ${days===0?'hoje':'há '+days+(days===1?' dia':' dias')}</div></div><span class="ccstat ${cls}">${lab}</span><button class="cclink${today?' mut':''}" data-pj-day="${p.id}">${today?'✓ hoje':'✋ dediquei hoje'}</button><label class="pjdate" title="registrar outro dia">📅<input type="date" data-pj-dayadd="${p.id}"></label><span class="ccx" data-pj-del="${p.id}">✕</span></div>`;});
  listInner+=`<div style="margin-top:10px"><span class="cclink" data-pj-add="1" style="font-size:13px">+ projeto</span></div>`;
  let h=`<p class="chelp" style="margin-top:0">Registre os dias dedicados a cada projeto — aparecem no calendário do mês.</p>`;
  h+=gtSection('pj-cal','Calendário de dedicação','📅',calBody);
  h+=gtSection('pj-list','Projetos','📊',listInner);
  return h;
}
function renderComando(){
  const H=state.habit;let html='';const todayStr=pdStr();
  html+=`<p class="chelp" style="margin-top:0">A próxima ação, a captura de ideias e o radar dos projetos — agora sincronizados com o calendário da <b>Semana</b> e do <b>Mês</b>.</p>`;
  const R=[...H.retomadas].sort((a,b)=>b.ts-a.ts);
  html+=`<div class="ccbanner"><span class="bnum">01</span><div class="bic">🧭</div><div class="bt"><h3>Retomada inteligente</h3><p>Onde você parou — e o próximo passo concreto.</p></div></div>`;
  if(R.length){R.forEach(r=>{const proj=r.proj?H.projetos.find(p=>p.id===r.proj):null;const projTag=proj?`<span class="cclink mut" data-rt-link="${r.id}">🗂 ${hesc(proj.name)}</span>`:`<span class="cclink" data-rt-link="${r.id}">🗂 vincular projeto</span>`;
    html+=`<div class="ccrow"><div class="body"><div class="ti">${hesc(r.title)}</div><div class="nx"><b>Próximo:</b> ${hesc(r.next||'—')}</div><div class="r">${ctxTag(r.ctx)}<span class="when">há ${timeAgo(r.ts)}</span>${projTag}<span class="cclink" data-rt-up="${r.id}">↑ retomei agora</span><span class="cclink" data-rt-sched="${r.id}">⏱ agendar no dia</span><span class="cclink" data-rt-edit="${r.id}">editar</span><span class="cclink mut" data-rt-del="${r.id}">remover</span></div></div></div>`;});
  }else{html+=`<div class="ccempty">Nada em aberto — adicione o que você quer retomar.</div>`;}
  html+=`<div style="margin-top:10px"><span class="cclink" data-rt-add="1" style="font-size:13px">+ nova retomada</span></div>`;
  html+=`<div class="ccbanner"><span class="bnum">02</span><div class="bic">📅</div><div class="bt"><h3>Dedicação aos projetos</h3><p>Registre os dias dedicados a cada projeto — aparecem no calendário do mês.</p></div></div>`;
  const yy=+mes.split('-')[0],mm=+mes.split('-')[1];const dim=new Date(yy,mm,0).getDate(),fw=new Date(yy,mm-1,1).getDay();
  const dayCount={};H.projetos.forEach(p=>(p.days||[]).forEach(ds=>{const dd=new Date(ds+'T00:00:00');if(dd.getFullYear()===yy&&dd.getMonth()===mm-1)dayCount[dd.getDate()]=(dayCount[dd.getDate()]||0)+1;}));
  const nowD=new Date();let cal='';for(let b=0;b<fw;b++)cal+='<span class="mcd off"></span>';
  for(let d=1;d<=dim;d++){const c=dayCount[d]||0;const isT=(nowD.getFullYear()===yy&&nowD.getMonth()===mm-1&&nowD.getDate()===d);cal+=`<span class="mcd${isT?' today':''}${c>=2?' full':c===1?' part':''}" title="${c} projeto(s)">${d}</span>`;}
  html+=`<div class="hcard" style="padding:13px"><div class="ameshd"><span class="al">📆 ${monthLabel(mes)}</span><span class="amesm" style="font-size:10.5px;color:var(--ink-soft);font-weight:600">sincronizado · Semana &amp; Mês</span></div><div class="mcal" style="margin-top:8px"><div class="mcalh">${WD.map(d=>`<span>${d}</span>`).join('')}</div><div class="mcalg">${cal}</div></div></div>`;
  const P=[...H.projetos].sort((a,b)=>a.last-b.last);
  P.forEach(p=>{const days=Math.floor((Date.now()-p.last)/864e5);let cls='ok',lab='ativo';if(days>10){cls='cold';lab='abandonado';}else if(days>3){cls='warn';lab='esfriando';}const c=CTXS[p.ctx]||CTXS.pessoal;const today=(p.days||[]).includes(todayStr);const n=(p.days||[]).length;
    html+=`<div class="ccproj"><span class="ccdot" style="background:${c.cor}"></span><div class="body"><div class="pn">${hesc(p.name)}</div><div class="pm">${c.ic} ${c.label} · <b>${n}</b> dia(s) · ${days===0?'hoje':'há '+days+(days===1?' dia':' dias')}</div></div><span class="ccstat ${cls}">${lab}</span><button class="cclink${today?' mut':''}" data-pj-day="${p.id}">${today?'✓ hoje':'✋ dediquei hoje'}</button><label class="pjdate" title="registrar outro dia">📅<input type="date" data-pj-dayadd="${p.id}"></label><span class="ccx" data-pj-del="${p.id}">✕</span></div>`;});
  html+=`<div style="margin-top:10px"><span class="cclink" data-pj-add="1" style="font-size:13px">+ projeto</span></div>`;
  return html;
}
function renderCulture(){
  const C=state.culture;let h='';
  h+=`<p class="chelp" style="margin-top:0">"Você é aquilo de que gosta." Registre o que quer assistir, ler e ouvir — marque ao consumir.</p>`;
  h+=`<div class="cvgrid">`+CV_GROUPS.map(gr=>{
    let col=`<div class="cvcol"><div class="cvgh">${gr.ic} ${gr.g}</div>`;
    gr.cats.forEach(ct=>{const key=ct[0],items=C.items[key]||[];
      col+=`<div class="cvcat"><div class="cvct">${ct[1]}</div>`;
      col+=items.map(it=>`<div class="cvitem${it.done?' done':''}"><button class="cvchk" data-cv-done="${key}:${it.id}">✓</button><span class="cvtx">${hesc(it.txt)}</span><button class="cvx" data-cv-del="${key}:${it.id}">✕</button></div>`).join('');
      col+=`<input class="cvadd" data-cv-add="${key}" placeholder="+ adicionar…"></div>`;
    });
    return col+`</div>`;
  }).join('')+`</div>`;
  h+=`<div class="cvnotes"><span class="al">Notas</span><textarea class="abox" data-cv-notes placeholder="Recomendações, links, o que dizer numa conversa…">${hesc(C.notes||'')}</textarea></div>`;
  h+=`<div class="cvrefs"><span class="cvrl">Para referência:</span><label class="cvref${C.refs.blog?' on':''}"><input type="checkbox" data-cv-ref="blog"${C.refs.blog?' checked':''}>no blog</label><label class="cvref${C.refs.convo?' on':''}"><input type="checkbox" data-cv-ref="convo"${C.refs.convo?' checked':''}>numa conversa</label><label class="cvref${C.refs.hip?' on':''}"><input type="checkbox" data-cv-ref="hip"${C.refs.hip?' checked':''}>provar hipness</label></div>`;
  return h;
}
function renderFerramentas(){
  const tm=state.habit.toolsMap;let html='';
  html+=`<p class="chelp" style="margin-top:0">Referências rápidas — onde cada coisa mora e blocos livres para organizar.</p>`;
  let mapBody=`<div class="ccmap">`+tm.tools.map(t=>`<div class="cctool"><button class="tlx" data-tool-del="${t.id}" title="remover">✕</button><div class="ic" contenteditable="true" data-tool-edit="${t.id}:ic">${hesc(t.ic)}</div><div class="nm" contenteditable="true" data-tool-edit="${t.id}:nm">${hesc(t.nm)}</div><div class="fn" contenteditable="true" data-tool-edit="${t.id}:fn">${hesc(t.fn)}</div><div class="fr" contenteditable="true" data-tool-edit="${t.id}:fr">${hesc(t.fr)}</div></div>`).join('')+`</div>`;
  mapBody+=`<div style="margin:10px 2px"><span class="cclink" id="toolAdd" style="font-size:13px">+ ferramenta</span></div>`;
  html+=gtSection('rf-map','Mapa de ferramentas','🗺️',mapBody);
  const secs=tm.sections||[];
  let secBody=`<div class="mmsecs">`+secs.map(s=>`<div class="mmsec"><div class="mmsech"><span class="mmtitle" contenteditable="true" data-mmsec-title="${s.id}">${hesc(s.title)}</span><button class="mmsecdel" data-mmsec-del="${s.id}" title="remover seção">✕</button></div><div class="mmcards">${(s.cards||[]).map(c=>`<div class="mmcard" style="--cc:${c.color||'#9a7b3f'}"><span class="mmctext" contenteditable="true" data-mmcard="${s.id}:${c.id}">${hesc(c.text)}</span><button class="mmcdel" data-mmcard-del="${s.id}:${c.id}" title="remover">×</button></div>`).join('')}<button class="mmcadd" data-mmcard-add="${s.id}">＋ bloco</button></div></div>`).join('')+`</div>`;
  secBody+=`<div style="margin:10px 2px"><span class="cclink" id="mmSecAdd" style="font-size:13px">+ nova seção</span></div>`;
  html+=gtSection('rf-secs','Seções livres','🧩',secBody);
  return html;
}
let rtSchedId=null;
function openRtSched(id){rtSchedId=id;const r=state.habit.retomadas.find(x=>x.id===id);if(!r)return;document.getElementById('rtSchedTxt').textContent=r.title;
  const wmon=mondayOf(weekStart),WDl=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];let dopts='';for(let i=0;i<7;i++){const dd=new Date(wmon);dd.setDate(wmon.getDate()+i);dopts+=`<option value="${i}">${WDl[i]} ${dd.getDate()}/${dd.getMonth()+1}</option>`;}
  document.getElementById('rtSchedDay').innerHTML=dopts;let hopts='';for(let h=6;h<=23;h++)hopts+=`<option value="${h}">${String(h).padStart(2,'0')}h</option>`;document.getElementById('rtSchedHour').innerHTML=hopts;
  openModal('rtSchedModal');}
document.querySelectorAll('#toolDock [data-dock]').forEach(b=>b.addEventListener('click',()=>openGT(b.dataset.dock)));
const _projFab=document.getElementById('projFab');if(_projFab)_projFab.onclick=()=>openGT('projetos');
document.getElementById('dockClose').onclick=closeGT;
document.getElementById('mgHandle').onclick=()=>{document.body.classList.toggle('mg-open');renderMgPanel();};
document.getElementById('mgBody').addEventListener('click',e=>{const c=e.target.closest('[data-mgworld]');if(c)selectWorld(c.dataset.mgworld);});
function renderMealModal(){
  const H=state.habit,todayStr=pdStr();
  const presets=document.getElementById('mealPresets');
  presets.innerHTML=(H.mealPresets||[]).map(p=>`<div class="mealpreset"><button class="mealpresetbtn" data-meal-preset="${p.id}">${hesc(p.name)}</button><button class="mealpresetdel" data-meal-preset-del="${p.id}" title="remover">✕</button></div>`).join('')||'<span class="mgtnote">sem presets</span>';
  const log=(H.mealLog[todayStr]||[]).slice().sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99'));
  const le=document.getElementById('mealLogEdit');
  le.innerHTML=log.length?log.map(m=>`<div class="meallogrow"><span class="mlrname">${hesc(m.name)}</span><span class="mlrtime">${hesc(m.time||'—')}</span><button class="mlrdel" data-meal-del="${m.id}" title="remover">✕</button></div>`).join(''):'<div class="mgtnote">Nenhuma refeição registrada hoje.</div>';
}
function openMealModal(){document.getElementById('mealName').value='';document.getElementById('mealTime').value='';renderMealModal();openModal('mealModal');}
document.addEventListener('click',e=>{if(e.target.closest('#mgMealOpen'))openMealModal();});
document.getElementById('wtSchedSet').onclick=()=>{if(!wtSchedId)return;const day=+document.getElementById('wtSchedDay').value;const t=document.getElementById('wtSchedTime').value||'09:00';const mins=timeToMin(t);wtAssignToDay(wtSchedId,day,mins);closeModals();};
document.getElementById('mealSave').onclick=()=>{const name=document.getElementById('mealName').value.trim();if(!name)return;const time=document.getElementById('mealTime').value||'';const todayStr=pdStr();const H=state.habit;(H.mealLog[todayStr]=H.mealLog[todayStr]||[]).push({id:uid(),name,time});save();document.getElementById('mealName').value='';document.getElementById('mealTime').value='';renderMealModal();renderMgPanel();};
document.getElementById('mealPresetAdd').onclick=()=>{const inp=document.getElementById('mealPresetNew');const name=inp.value.trim();if(!name)return;state.habit.mealPresets.push({id:uid(),name});save();inp.value='';renderMealModal();};
document.getElementById('mealPresets').addEventListener('click',e=>{
  const p=e.target.closest('[data-meal-preset]');if(p){document.getElementById('mealName').value=state.habit.mealPresets.find(x=>x.id===p.dataset.mealPreset)?.name||'';return;}
  const pd=e.target.closest('[data-meal-preset-del]');if(pd){state.habit.mealPresets=state.habit.mealPresets.filter(x=>x.id!==pd.dataset.mealPresetDel);save();renderMealModal();return;}
});
document.getElementById('mealLogEdit').addEventListener('click',e=>{const d=e.target.closest('[data-meal-del]');if(!d)return;const todayStr=pdStr();const H=state.habit;H.mealLog[todayStr]=(H.mealLog[todayStr]||[]).filter(x=>x.id!==d.dataset.mealDel);save();renderMealModal();renderMgPanel();});
document.addEventListener('input',e=>{const sp=e.target.closest('#mgSpendLimit');if(sp){const v=sp.value===''?null:+sp.value;state.habit.dailySpendLimit=v;save();}});
document.addEventListener('change',e=>{const mt=e.target.closest('[data-med-take]');if(mt){const today=pdStr();const H=state.habit;const list=(H.medsLog[today]=H.medsLog[today]||[]);const id=mt.dataset.medTake;const ix=list.indexOf(id);if(mt.checked&&ix<0)list.push(id);else if(!mt.checked&&ix>=0)list.splice(ix,1);save();renderMgPanel();}});
document.addEventListener('click',e=>{if(e.target.closest('#mgMedAdd')){const name=prompt('Nome do medicamento:');if(name&&name.trim()){const dose=prompt('Dose (opcional):','')||'';state.habit.medications.push({id:uid(),name:name.trim(),dose:dose.trim()});save();renderMgPanel();}}});
document.addEventListener('click',e=>{if(e.target.closest('#mgSpendAdd')){document.getElementById('gastoNome').value='';document.getElementById('gastoValor').value='';document.getElementById('gastoData').value=pdStr();openModal('gastoModal');}});
document.getElementById('gastoSave').onclick=()=>{
  const nome=document.getElementById('gastoNome').value.trim();
  const v=num(document.getElementById('gastoValor').value);
  const dia=document.getElementById('gastoData').value||pdStr();
  if(!nome||!v)return;
  const mesDoGasto=dia.slice(0,7);
  state.entries.push({id:uid(),tipo:'variavel',mes:mesDoGasto,valor:v,prev:v,efet:v,descricao:nome,meio:null,grupo:'Gasto diário',diaGasto:dia});
  save();closeModals();renderMgPanel();if(mesDoGasto===mes)renderAll();
};
let mgInlineCollapsed=false;
const _mgInlineTog=document.getElementById('mgInlineTog');if(_mgInlineTog)_mgInlineTog.onclick=()=>{mgInlineCollapsed=!mgInlineCollapsed;document.getElementById('mgInline').classList.toggle('collapsed',mgInlineCollapsed);document.getElementById('mgInlineChev').textContent=mgInlineCollapsed?'›':'⌄';};
const _mgBodyHab=document.getElementById('mgBodyHab');if(_mgBodyHab)_mgBodyHab.addEventListener('click',e=>{const c=e.target.closest('[data-mgworld]');if(c)selectWorld(c.dataset.mgworld);});
const _capSave=document.getElementById('capEditSave');if(_capSave)_capSave.onclick=()=>{const n=(state.habit.captures||[]).find(x=>x.id===capEditId);if(n){n.date=document.getElementById('capEditDate').value||null;n.time=document.getElementById('capEditTime').value||null;n.area=document.getElementById('capEditArea').value||null;n.goal=document.getElementById('capEditGoal').value||null;save();}closeModals();gtRender();};
const _capClr=document.getElementById('capEditClear');if(_capClr)_capClr.onclick=()=>{const n=(state.habit.captures||[]).find(x=>x.id===capEditId);if(n){n.date=null;n.time=null;save();}closeModals();gtRender();};
document.getElementById('bmScrim').onclick=closeBlockModal;
document.getElementById('bmDone').onclick=closeBlockModal;
document.getElementById('bmDelete').onclick=()=>{if(bmDay==null||bmId==null)return;const wkv=state.habit.weekPlan[weekKeyOf(weekStart)];if(wkv&&wkv.blocks&&wkv.blocks[bmDay]){wkv.blocks[bmDay]=wkv.blocks[bmDay].filter(x=>x.id!==bmId);save();}closeBlockModal();};
document.getElementById('bmStart').addEventListener('change',bmApplyTimes);
document.getElementById('bmEnd').addEventListener('change',bmApplyTimes);
document.getElementById('bmTitle').addEventListener('input',e=>{const b=schedFindBlock(bmDay,bmId);if(b){b.title=e.target.value;save();}});
document.getElementById('bmDesc').addEventListener('input',e=>{const b=schedFindBlock(bmDay,bmId);if(b){b.desc=e.target.value;save();}});
document.getElementById('bmNota').addEventListener('input',e=>{const b=schedFindBlock(bmDay,bmId);if(b){b.nota=e.target.value;save();}});
document.getElementById('bmArea').addEventListener('change',e=>{const b=schedFindBlock(bmDay,bmId);if(b){b.area=e.target.value;save();}});
document.getElementById('bmIndisp').addEventListener('change',e=>{const b=schedFindBlock(bmDay,bmId);if(b){b.indispensavel=e.target.checked;save();renderMgPanel();}});
document.querySelectorAll('[data-gt-close]').forEach(b=>b.addEventListener('click',closeGT));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&gtIsOpen())closeGT();});
const _rtSet=document.getElementById('rtSchedSet');if(_rtSet)_rtSet.onclick=()=>{const r=state.habit.retomadas.find(x=>x.id===rtSchedId);if(!r){closeModals();return;}const di=+document.getElementById('rtSchedDay').value,hh=+document.getElementById('rtSchedHour').value;const k=weekKeyOf(weekStart);const o=(state.habit.weekPlan[k]=state.habit.weekPlan[k]||{});const ck=di+'-'+hh;o[ck]=(o[ck]?o[ck]+' · ':'')+r.title;r.ts=Date.now();
  if(r.proj){const p=state.habit.projetos.find(x=>x.id===r.proj);if(p){const wmon=mondayOf(weekStart);const dd=new Date(wmon);dd.setDate(wmon.getDate()+di);const ds=pdStr(dd);p.days=p.days||[];if(!p.days.includes(ds))p.days.push(ds);p.last=Date.now();}}
  save();closeModals();gtRender();if(habitMode&&activeHabitTab==='habit')renderHabit();};

/* ===== Yggdrasil — navegação em árvore (overlay) ===== */
const YGG_WORLDS=[
  {id:'alimentacao',nome:'Vanaheim',realm:'Cultura',zona:'copa',glyph:'❖',ac:'#9c7a1e',resumo:'Cultura, Ikigai e decisões — a mente que escolhe.'},
  {id:'habitos',nome:'Miðgard',realm:'Hábitos & Rotina',zona:'ramos',glyph:'❂',ac:'#c2611f',resumo:'Sequências diárias, semanas e comando.'},
  {id:'tarefas',nome:'Niflheim',realm:'Self-Therapy',zona:'ramos',glyph:'☉',ac:'#715a86',resumo:'Desembaralhar o que sente.'},
  {id:'cosmo',nome:'Cosmo',realm:'Aprovação Federal',zona:'ramos',glyph:'✦',ac:'#2d54c8',resumo:'Edital, questões, ciclo e revisão espaçada.'},
  {id:'espelho',nome:'Urðarbrunnr',realm:'Espelho',zona:'raizes',glyph:'ᚱ',ac:'#8a6d3b',resumo:'Mapa astral, numerologia e vocação.'},
  {id:'financeiro',nome:'Niðavellir',realm:'Sistema Financeiro',zona:'raizes',glyph:'❦',ac:'#1f6b46',resumo:'Mês, previsão, planejamento e metas.'},
  {id:'saude',nome:'Jötunheim',realm:'Saúde',zona:'raizes',glyph:'✚',ac:'#a8412f',resumo:'Indicadores, consultas e exames.'},
  {id:'asgard',nome:'Asgard',realm:'Vision Board',zona:'copa',glyph:'⟡',ac:'#9a7b3f',resumo:'Metas e áreas da vida.'},
];
const ACTIVE_WORLDS={financeiro:1,habitos:1,asgard:1,saude:1,tarefas:1,alimentacao:1,espelho:1,cosmo:1};
// Por ora, só o Miðgard fica visível como homepage do app — os demais mundos ficam ocultos (fácil reverter: adicione o id aqui).
const WORLDS_VISIBLE={habitos:1};
const SEED_WORLDS={
  asgard:{nome:'Asgard',realm:'Asgard',glyph:'⟡',ac:'#9a7b3f',acs:'#efe6cf',tabs:[['vision','Vision Board'],['areas','Áreas da Vida'],['metas','Metas'],['decision','Decisão']],rows:[]},
  saude:{nome:'Jötunheim',realm:'Saúde',glyph:'✚',ac:'#a8412f',acs:'#f3ddd5',tabs:[['consultas','Consultas'],['exames','Exames'],['treinos','Treinos'],['receitas','Receitas']],rows:[]},
  alimentacao:{nome:'Vanaheim',realm:'Cultura',glyph:'❖',ac:'#9c7a1e',acs:'#f1e6cf',tabs:[['culture','Culture']],rows:[]},
  tarefas:{nome:'Niflheim',realm:'Niflheim',glyph:'☉',ac:'#715a86',acs:'#e7e0ee',tabs:[['therapy','Self-Therapy'],['ikigai','Ikigai']],rows:[]},
  espelho:{nome:'Urðarbrunnr',realm:'Poço de Urðr',glyph:'ᚱ',ac:'#8a6d3b',acs:'#efe3c8',tabs:[['resumo','Resumo'],['astral','Mapa Astral'],['numero','Numerologia'],['prof','Profissional'],['sintese','Síntese']],rows:[]},
  cosmo:{nome:'Cosmo',realm:'Aprovação Federal',glyph:'✦',ac:'#2d54c8',acs:'#e3e9f7',tabs:[['app','Painel']],rows:[]},
};
let homeMode=true;
function currentWorldId(){return seedWorld?seedWorld:(habitMode?'habitos':'financeiro');}
function enterHome(){homeMode=true;document.documentElement.classList.add('ygg-home');document.documentElement.classList.remove('ygg-world');paintTree();AXD.scrollTo(0,0);}
function goHome(){enterHome();}
function showWorldShell(){homeMode=false;document.documentElement.classList.remove('ygg-home');document.documentElement.classList.add('ygg-world');paintRail();}
function paintRail(){
  const cur=currentWorldId();
  let h='<button class="yr-home" title="Voltar ao hub central">ᛉ</button><div class="yr-nodes">';
  ['copa','ramos','raizes'].forEach((zk,zi)=>{ if(zi)h+='<div class="yr-sep"></div>';
    YGG_WORLDS.filter(w=>w.zona===zk&&WORLDS_VISIBLE[w.id]).forEach(w=>{const act=!!ACTIVE_WORLDS[w.id],sel=w.id===cur;
      h+=`<button class="yr-disc${act?' active':''}${sel?' sel':''}" data-world="${w.id}" style="--wc:${w.ac}" title="${w.nome} · ${w.realm}">${w.glyph}</button>`;});
  });
  h+='</div>';
  document.getElementById('yggRail').innerHTML=h;
}
function paintTree(){
  const cur=homeMode?null:currentWorldId();
  const zones=[['copa','copa'],['ramos','ramos'],['raizes','raízes']];
  let h='';
  zones.forEach(z=>{ h+=`<div class="yzh">${z[1]}</div>`;
    YGG_WORLDS.filter(w=>w.zona===z[0]&&WORLDS_VISIBLE[w.id]).forEach(w=>{
      const act=!!ACTIVE_WORLDS[w.id], sel=w.id===cur;
      h+=`<button class="ynode${act?' active':''}${sel?' sel':''}" data-world="${w.id}" style="--wc:${w.ac}"><span class="ydisc">${w.glyph}</span><span class="yinfo"><span class="yname">${w.nome}</span><span class="yrealm">${w.realm}</span><span class="yres">${w.resumo}</span></span><span class="ybadge${act?' on':''}">${act?(sel?'aqui':'entrar'):'em breve'}</span></button>`;
    });
  });
  document.getElementById('yggNodes').innerHTML=h;
}
function exitSeed(){seedWorld=null;document.documentElement.classList.remove('seed');const r=document.documentElement.style;r.removeProperty('--pos');r.removeProperty('--pos-soft');}
function enterSeed(id){
  const w=SEED_WORLDS[id];if(!w)return;
  seedWorld=id;activeSeedTab=w.tabs[0][0];habitMode=false;annual=false;
  document.documentElement.classList.remove('habit');
  document.documentElement.classList.add('seed');
  const r=document.documentElement.style;r.setProperty('--pos',w.ac);r.setProperty('--pos-soft',w.acs);
  const eb2=document.getElementById('eyebrow');if(eb2)eb2.textContent=w.nome.toLowerCase()+' · '+w.realm.toLowerCase()+' · bruno dutra';
  paintTabs();activateTab(activeSeedTab);AXD.scrollTo(0,0);
}
function selectWorld(id){
  if(id==='financeiro'){exitSeed();habitMode=false;applyMode();}
  else if(id==='habitos'){exitSeed();habitMode=true;annual=false;applyMode();}
  else{enterSeed(id);}
  document.documentElement.classList.toggle('mid',id==='habitos');
  if(id!=='habitos')document.body.classList.remove('mg-open');
  renderMgPanel();
  showWorldShell();AXD.scrollTo(0,0);
}
function mgCard(world,glyph,title,color,body){return `<div class="mgcard" style="--cc:${color}" data-mgworld="${world}"><div class="mgch"><span class="mgglyph">${glyph}</span><span class="mgt">${title}</span></div><div class="mgcb">${body}</div></div>`;}
function renderMgPanel(){
  const el=document.getElementById('mgBody');const elHab=document.getElementById('mgBodyHab');
  if(!el&&!elHab)return;
  const H=state.habit,wkv=H.weekPlan[weekKeyOf(weekStart)]||{},todayIdx=(new Date().getDay()+6)%7,todayStr=pdStr();
  const trId=wkv['treinoDia-'+todayIdx],tr=(state.saude.treinos||[]).find(t=>t.id===trId);
  const meals=[['cafe','Café'],['almoco','Almoço'],['jantar','Jantar']];
  const dieta=meals.map(mm=>{const r=(state.saude.receitas||[]).find(x=>x.id===wkv['dieta-'+todayIdx+'-'+mm[0]]);return `${mm[1]}: ${r?hesc(r.name):'—'}`;}).join('<br>');
  const mpv=(H.monthPlan[mes]=H.monthPlan[mes]||{});
  const goals=(state.asgard.goals||[]).slice(0,3);
  const goalsHTML=goals.length?goals.map(g=>`<div class="mggoal"><span class="mggoaltxt">${hesc(g.title)}</span><span class="mggoalpct">${g.progress||0}%</span></div>`).join(''):'<div class="mggoalempty">Sem metas cadastradas em Asgard.</div>';
  const metasHTML=`<div class="mgmetas"><div class="mgmetash"><span class="al">🎯 Metas do mês/semana</span></div><div class="mggoals">${goalsHTML}</div><textarea class="abox" data-mp="metas" placeholder="Metas e intenções do mês…">${hesc(mpv.metas||'')}</textarea></div>`;
  const cardsHTML=`<div class="mgstack">${metasHTML}</div>`;
  if(el)el.innerHTML=cardsHTML;
  if(elHab)elHab.innerHTML=cardsHTML;
  const MMn=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const calEl=document.getElementById('mgCalInline');
  if(calEl){
    const yy2=+mes.split('-')[0],mm3=+mes.split('-')[1],dim2=new Date(yy2,mm3,0).getDate(),fw2=new Date(yy2,mm3-1,1).getDay(),nowD2=new Date();
    let cal2='';for(let b=0;b<fw2;b++)cal2+='<span class="mcd off"></span>';
    for(let d=1;d<=dim2;d++){let on=0;H.daily.forEach(hb=>{if(hOn(hb.id,d))on++;});const full=H.daily.length&&on===H.daily.length,part=on>0&&!full,isT=(nowD2.getFullYear()===yy2&&nowD2.getMonth()===mm3-1&&nowD2.getDate()===d);cal2+=`<span class="mcd${isT?' today':''}${full?' full':part?' part':''}">${d}</span>`;}
    const wmonNow=mondayOf(weekStart);const weekNum=Math.ceil(wmonNow.getDate()/7);
    calEl.innerHTML=`<div class="mgcal"><div class="mcalh">${WD.map(d=>`<span>${d}</span>`).join('')}</div><div class="mcalg">${cal2}</div></div><div class="mgweeklabel">📍 Semana ${weekNum} de ${MMn[wmonNow.getMonth()]}</div>`;
  }
  const foot=document.getElementById('mgFoot');const footHab=document.getElementById('mgFootHab');
  const quickEl=document.getElementById('mgQuickTrk');
  const today=pdStr();
  if(quickEl){
    const cups=H.hydration[today]||0,hgoal=H.hydrationGoal||8,slp=+(H.sleep[today]||0),sgoal=H.sleepGoal||8;
    const hpct=hgoal?Math.min(100,cups/hgoal*100):0,spct=sgoal?Math.min(100,slp/sgoal*100):0;
    const medsToday=(H.medsLog[today]||[]);
    const medsBody=`<div class="mgmeds">${(H.medications||[]).map(md=>{const taken=medsToday.includes(md.id);return `<label class="mgmedrow${taken?' taken':''}"><input type="checkbox" data-med-take="${md.id}" ${taken?'checked':''}><span class="mgmedn">${hesc(md.name)}</span>${md.dose?`<span class="mgmedd">${hesc(md.dose)}</span>`:''}</label>`;}).join('')||'<span class="mgtnote">sem medicamentos cadastrados</span>'}</div><button class="mgtrkbtn" id="mgMedAdd">＋ medicamento</button>`;
    const trk=(key,ic,label,val,body)=>`<div class="mgtrk${mgTrkOpen[key]?' open':''}"><button class="mgtrkh" data-mgtrk="${key}"><span class="mgtico">${ic}</span><span class="mgtl">${label}</span>${val?`<span class="mgtv">${val}</span>`:''}<span class="mgtchev">⌄</span></button><div class="mgtrkbody">${body}</div></div>`;
    const limitVal=H.dailySpendLimit!=null?H.dailySpendLimit:'';
    const spentToday=(state.entries||[]).filter(e=>e.diaGasto===today).reduce((s,e)=>s+num(e.efet!=null?e.efet:e.valor),0);
    const restante=H.dailySpendLimit!=null?(H.dailySpendLimit-spentToday):null;
    const gastoAlways=`<div class="mggasto"><div class="mggastoh"></div><div class="mggastorow"><span class="mgtico">💰</span><input type="number" min="0" step="10" class="mgspend-in" id="mgSpendLimit" value="${limitVal}" placeholder="0,00"><button class="mgtrkbtn" id="mgSpendAdd">＋</button></div>${restante!=null?`<div class="mggastostatus${restante<0?' over':''}">Gasto hoje: ${fmt0(spentToday)} · Resta: ${fmt0(restante)}</div>`:''}</div>`;
    quickEl.innerHTML=gastoAlways
      +trk('sleep','🌙','Sono',(slp||0)+'h',`<div class="mgbt sleep"><i style="width:${spct}%"></i></div><div class="mgtctl"><span class="mgtnote">registrado na aba Saúde</span></div>`)
      +trk('hydro','💧','Hidratação',cups+'/'+hgoal,`<div class="mgbt hydro"><i style="width:${hpct}%"></i></div><div class="mgtctl"><button class="mgbpm" data-hydro-d="-1">−</button><button class="mgbpm" data-hydro-d="1">+</button><span class="mgtnote">copos de hoje</span></div>`)
      +trk('meds','💊','Medicação',medsToday.length+'/'+(H.medications||[]).length,medsBody);
  }
  if(foot||footHab){
    const todayMeals=(H.mealLog[today]||[]).slice().sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99'));
    const mealChips=todayMeals.length?`<div class="mgmeallog">${todayMeals.map(m=>`<span class="mgmealchip">${hesc(m.name)}${m.time?' · '+hesc(m.time):''}</span>`).join('')}</div>`:'';
    const dietaBody=`<div class="mgdplanned">${dieta}</div>${mealChips}<button class="mgtrkbtn" id="mgMealOpen">🍽 Registrar refeição</button>`;
    const treinoBody=tr?`<b>${hesc(tr.name)}</b>${tr.focus?' · '+hesc(tr.focus):''}`:'<i>sem treino hoje</i>';
    const trk=(key,ic,label,val,body)=>`<div class="mgtrk${mgTrkOpen[key]?' open':''}"><button class="mgtrkh" data-mgtrk="${key}"><span class="mgtico">${ic}</span><span class="mgtl">${label}</span>${val?`<span class="mgtv">${val}</span>`:''}<span class="mgtchev">⌄</span></button><div class="mgtrkbody">${body}</div></div>`;
    const indispBlocks=((wkv.blocks&&wkv.blocks[todayIdx])||[]).filter(b=>b.indispensavel);
    const indispChips=indispBlocks.length?`<div class="mgindispitems">${indispBlocks.map(b=>`<span class="mgindispchip">◆ ${hesc(b.title||'Bloco')}</span>`).join('')}</div>`:'';
    const footHTML=metasHTML
      +`<label class="mgf"><span>◆ Indispensáveis diários</span>${indispChips}<textarea class="abox" data-wp="inegociaveis" placeholder="O que não pode faltar">${hesc(wkv['inegociaveis']||'')}</textarea></label>`
      +`<div class="mgtrks">`
      +trk('treino','🏋','Treino de hoje','',treinoBody)
      +trk('dieta','🍽','Dieta de hoje','',dietaBody)
      +`</div>`;
    if(foot)foot.innerHTML=footHTML;
    if(footHab)footHab.innerHTML=footHTML;
  }
}
let asgGoalId=null;
function goalCard(g,areaMap){const a=areaMap[g.area]||{ic:'•',name:'—',color:'#999'};
  return `<div class="goalcard" style="--cc:${a.color}" data-goal-edit="${g.id}"><div class="gch"><span class="gcarea">${a.ic} ${hesc(a.name)}</span>${g.horizon?`<span class="gchz">${hesc(g.horizon)}</span>`:''}</div><div class="gctitle">${hesc(g.title)}</div>${g.target?`<div class="gctarget">🎯 ${hesc(g.target)}</div>`:''}${g.why?`<div class="gcwhy">${hesc(g.why)}</div>`:''}<div class="gcbar"><i style="width:${g.progress||0}%"></i></div><div class="gcpct">${g.progress||0}% concluído</div></div>`;}
function renderAsgard(){
  const A=state.asgard;const tab=activeSeedTab;const areaMap={};A.areas.forEach(a=>areaMap[a.id]=a);
  let h=`<div class="sec asgsec"><div class="sec-h"><span class="t">${tab==='areas'?'Áreas da Vida':tab==='metas'?'Metas':'Vision Board'}</span><span class="sum" style="font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft)">Asgard · o alto</span></div>`;
  if(tab==='vision'){
    h+=`<div class="asgvision"><span class="al">✦ Minha visão</span><textarea class="abox tall" data-asg-vision placeholder="Quem eu quero ser, a vida que estou construindo, os princípios que me guiam…">${hesc(A.vision||'')}</textarea></div>`;
    h+=`<div class="asgsub">Metas por área</div><div class="asgboard">`+A.goals.map(g=>goalCard(g,areaMap)).join('')+`<button class="asgaddcard" data-goal-add="1">＋ nova meta</button></div>`;
  }else if(tab==='areas'){
    h+=`<p class="chelp" style="margin:2px 2px 10px">As sete áreas que estruturam a sua vida. Toque no nome para renomear.</p><div class="asgareas">`+A.areas.map(a=>{const gs=A.goals.filter(g=>g.area===a.id);return `<div class="asgarea" style="--cc:${a.color}"><div class="aah"><span class="aaic">${a.ic}</span><span class="aanm" contenteditable="true" data-area-edit="${a.id}">${hesc(a.name)}</span><span class="aacount">${gs.length}</span></div>${gs.length?'<div class="aagoals">'+gs.map(g=>`<div class="aagoal" data-goal-edit="${g.id}"><span>${hesc(g.title)}</span><i>${g.progress||0}%</i></div>`).join('')+'</div>':'<div class="aaempty">Sem metas ainda</div>'}</div>`;}).join('')+`</div>`;
  }else{
    h+=`<p class="chelp" style="margin:2px 2px 10px">Suas metas de vida. Toque numa meta para editar progresso, área e horizonte.</p><div class="asgboard">`+A.goals.map(g=>goalCard(g,areaMap)).join('')+`<button class="asgaddcard" data-goal-add="1">＋ nova meta</button></div>`;
  }
  h+=`</div>`;
  document.getElementById('seedApp').innerHTML=h;
}
function openGoal(id){asgGoalId=id;const A=state.asgard;const g=id?A.goals.find(x=>x.id===id):{title:'',area:A.areas[0]&&A.areas[0].id,why:'',target:'',horizon:'',progress:0};
  document.getElementById('goalTitle').value=g.title||'';
  document.getElementById('goalArea').innerHTML=A.areas.map(a=>`<option value="${a.id}"${a.id===g.area?' selected':''}>${a.ic} ${a.name}</option>`).join('');
  document.getElementById('goalWhy').value=g.why||'';document.getElementById('goalTarget').value=g.target||'';document.getElementById('goalHorizon').value=g.horizon||'';
  document.getElementById('goalProg').value=g.progress||0;document.getElementById('goalProgV').textContent=(g.progress||0)+'%';
  document.getElementById('goalDel').style.display=id?'':'none';
  openModal('goalModal');}
let saudeType=null,saudeId=null;
function saudeCard(type,it){const E=hesc;
  if(type==='consultas'){const dt=it.date?new Date(it.date+'T00:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}):'sem data';return `<div class="saudec" data-saude-edit="${type}:${it.id}" style="--cc:#a8412f"><div class="scbadge">🩺 ${dt}${it.time?' · '+E(it.time):''}</div><div class="sctitle">${E(it.what||'Consulta')}</div><div class="scsub">${E(it.doctor||'')}${it.place?' · '+E(it.place):''}</div>${it.notes?`<div class="scpre">${E(it.notes)}</div>`:''}</div>`;}
  if(type==='exames'){const st=it.status||'Pendente';const dt=it.date?new Date(it.date+'T00:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}):'';return `<div class="saudec" data-saude-edit="${type}:${it.id}" style="--cc:#6f5aa8"><div class="scbadge stb" data-st="${E(st)}">${E(st)}</div><div class="sctitle">${E(it.name)}</div><div class="scsub">${dt}${it.result?' · '+E(it.result):''}</div></div>`;}
  if(type==='treinos'){return `<div class="saudec" data-saude-edit="${type}:${it.id}" style="--cc:#3f5d75"><div class="scbadge">🏋️ ${E(it.focus||'')}</div><div class="sctitle">${E(it.name)}</div><div class="scpre">${E((it.exercises||'').split('\n').filter(Boolean).slice(0,4).join(' · '))}</div></div>`;}
  return `<div class="saudec" data-saude-edit="${type}:${it.id}" style="--cc:#2f6f4e"><div class="scbadge">🍳 ${E(it.servings||'?')} porç · ${E(it.kcal||'?')} kcal</div><div class="sctitle">${E(it.name)}</div><div class="scpre">${E((it.ingredients||'').split('\n').filter(Boolean).slice(0,4).join(' · '))}</div></div>`;}
const SAUDE_DESC={consultas:'Agende e acompanhe consultas — com profissional, data, hora e local.',exames:'Cadastre exames, status e resultados.',treinos:'Seus treinos (A/B/C) — viram a aba Treino no rodapé da Semana.',receitas:'Suas receitas — viram a aba Dieta no rodapé da Semana.'};
function renderSaude(){
  const type=activeSeedTab,sc=SAUDE_SCHEMA[type]||SAUDE_SCHEMA.consultas,list=(state.saude[type]||[]);
  let arr=list.slice();if(sc.sort==='date')arr.sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999'));
  let h=`<div class="sec asgsec"><div class="sec-h"><span class="t">${sc.title}s</span><span class="sum" style="font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft)">Jötunheim · Saúde</span></div>`;
  h+=`<p class="chelp" style="margin:2px 2px 12px">${SAUDE_DESC[type]||''}</p>`;
  h+=`<div class="saudegrid">`+arr.map(it=>saudeCard(type,it)).join('')+`<button class="asgaddcard" data-saude-add="${type}">＋ ${sc.title.toLowerCase()}</button></div></div>`;
  document.getElementById('seedApp').innerHTML=h;
}
function openSaudeItem(type,id){saudeType=type;saudeId=id;const sc=SAUDE_SCHEMA[type];const it=id?state.saude[type].find(x=>x.id===id):{};
  document.getElementById('saudeTitle').textContent=(id?'Editar ':'Nova ')+sc.title.toLowerCase();
  let b='';sc.fields.forEach(f=>{const[key,label,kind]=f;const val=hesc(it[key]||'');
    if(kind==='textarea')b+=`<div class="fr"><label>${label}</label><textarea data-sf="${key}" rows="3">${val}</textarea></div>`;
    else if(kind.indexOf('select:')===0){const opts=kind.slice(7).split(',');b+=`<div class="fr"><label>${label}</label><select data-sf="${key}">${opts.map(o=>`<option${o===it[key]?' selected':''}>${o}</option>`).join('')}</select></div>`;}
    else b+=`<div class="fr"><label>${label}</label><input type="${kind}" data-sf="${key}" value="${val}"></div>`;});
  document.getElementById('saudeBody').innerHTML=b;
  document.getElementById('saudeDel').style.display=id?'':'none';
  openModal('saudeModal');}
const PLANNER_TABS={
  culture:{title:'Culture Vulture',desc:'O que assistir, ler e ouvir sem deixar boas ideias evaporarem.',sections:[
    {type:'columns',cols:[['watch','Assistir'],['read','Ler'],['listen','Ouvir']],count:8},
    {type:'columns',cols:[['viral','Vídeos virais'],['sites','Sites'],['podcasts','Podcasts']],count:5},
    {type:'columns',cols:[['cheap','Entretenimento barato'],['trash','Trashy stuff'],['guilty','Guilty pleasures']],count:5},
    {type:'text',key:'notes',title:'Notas',wide:true},
    {type:'choices',key:'reference',title:'Usar como referência',options:['Blog','Conversa casual','Provar hipness']}]},
  therapy:{title:'Self-Therapy',desc:'Desembaralhar um drama do momento sem precisar fingir elegância emocional.',sections:[
    {type:'text',key:'drama',title:'Psicodrama do momento',wide:true},
    {type:'text',key:'feelingAbout',title:'Como eu me sinto sobre isso?',wide:true},
    {type:'choices',key:'feel1',title:'Camada visível',options:['Raiva','Medo','Alegria','Tristeza','Cínico','Impotente','Perseguido','Entorpecido']},
    {type:'choices',key:'feel2',title:'Camada real',options:['Aliviado','Deprimido','Estressado','Alienado','Animado','Invejoso','Envergonhado']},
    {type:'choices',key:'source',title:'Isso provavelmente vem de',options:['Mãe','Pai','Cônjuge','Filhos','Outras pessoas','Eu','Criança interior','Química cerebral','Limites','Má sorte']},
    {type:'columns',cols:[['present','Influências presentes'],['past','Questões antigas']],count:4},
    {type:'text',key:'meaning',title:'O que isso significa',wide:true},
    {type:'choices',key:'breakthrough',title:'Breakthrough',options:['Terapia real','Medicação, por favor','Todo mundo é doido','Estou evoluído']}]},
  ikigai:{title:'Ikigai',desc:'Cruzamento entre amor, talento, necessidade do mundo e dinheiro.',sections:[
    {type:'text',key:'love',title:'O que eu amo'},
    {type:'text',key:'goodAt',title:'No que sou bom'},
    {type:'text',key:'worldNeeds',title:'O que o mundo precisa'},
    {type:'text',key:'paidFor',title:'Pelo que posso ser pago'},
    {type:'text',key:'passion',title:'Paixão'},
    {type:'text',key:'mission',title:'Missão'},
    {type:'text',key:'profession',title:'Profissão'},
    {type:'text',key:'vocation',title:'Vocação'},
    {type:'columns',cols:[['alt1','Alternativa 1'],['alt2','Alternativa 2'],['alt3','Alternativa 3']],count:4}]},
  decision:{title:'Make a Decision',desc:'Decidir sem rodar em círculo: cenários, intuição, prós/contras e próximo passo.',sections:[
    {type:'columns',cols:[['dilemma','Dilema'],['date','Data'],['neededBy','Decidir até']],count:1},
    {type:'choices',key:'importance',title:'Importância',options:['Trivial','Não letal','Vale a pena','Pesado','Life changing']},
    {type:'choices',key:'indecision',title:'Indecisão',options:['Wishy','Washy','Neutro','Partisan','Mind made up']},
    {type:'text',key:'best',title:'Melhor cenário',wide:true},
    {type:'text',key:'worst',title:'Pior cenário',wide:true},
    {type:'columns',cols:[['gut','Gut feelings'],['pros','Prós'],['cons','Contras']],count:7},
    {type:'text',key:'intuitive',title:'Conclusão intuitiva'},
    {type:'text',key:'rational',title:'Conclusão racional'},
    {type:'text',key:'decision',title:'Decisão',wide:true},
    {type:'text',key:'next',title:'Próximos passos',wide:true}]}
};
function mapStore(kind){return kind==='bag'?state.habit.bagMap:state.habit.consumoMap;}
function mapFind(kind,gid,iid){const groups=mapStore(kind);const g=groups.find(x=>x.id===gid);const it=g&&iid?(g.items||[]).find(x=>x.id===iid):null;return{groups,g,it};}
function askMapItem(seed){const name=prompt('Nome do item:',seed?seed.name:'');if(!name||!name.trim())return null;const meta=prompt('Dose, quantidade, frequência ou uso:',seed?seed.meta:'')||'';const note=prompt('Observações:',seed?seed.note:'')||'';return{name:name.trim(),meta:meta.trim(),note:note.trim()};}
function askClosetItem(seed){const name=prompt('Nome da peça/item:',seed?seed.name:'');if(!name||!name.trim())return null;const meta=prompt('Detalhes (tecido, tamanho, ocasião, marca):',seed?seed.meta:'')||'';const color=prompt('Cor ou código (ex: preto, #7a4f86):',seed?seed.color:'')||'';return{name:name.trim(),meta:meta.trim(),color:color.trim(),selected:seed?!!seed.selected:false};}
function askPertence(seed){const name=prompt('Nome do pertence:',seed?seed.name:'');if(!name||!name.trim())return null;const bought=prompt('Data da compra:',seed?seed.bought:'')||'';const place=prompt('Paradeiro:',seed?seed.place:'')||'';return{name:name.trim(),bought:bought.trim(),place:place.trim()};}
function closetSelected(){return (state.habit.closet||[]).flatMap(g=>(g.items||[]).filter(it=>it.selected).map(it=>({...it,cat:g.name,ic:g.ic})));}
function mapHtml(kind,title,lead,groups){
  const count=groups.reduce((s,g)=>s+(g.items?g.items.length:0),0);
  return `<section class="mapsection"><div class="mapsection-head"><div><h4>${title}</h4><p>${lead}</p></div><span class="mapcount">${count} itens</span></div><div class="lifemap">`+
    groups.map(g=>`<div class="lifecard"><div class="lifehead"><div class="lifeico">${g.ic||'•'}</div><div class="lifetitle"><div class="nm">${hesc(g.name)}</div><div class="ct">${hesc(g.hint||'')}</div></div><button class="lifeadd" data-map-add="${kind}:${g.id}">+ item</button></div><div class="lifeitems">${
      (g.items&&g.items.length)?g.items.map(it=>`<div class="lifeitem ${it.checked?'done':''}"><button class="lifecheck" data-map-check="${kind}:${g.id}:${it.id}">✓</button><div class="lifebody"><div class="n">${hesc(it.name)}</div><div class="m">${hesc([it.meta,it.note].filter(Boolean).join(' · '))}</div></div><div class="lifeacts"><button class="cartadd" title="carrinho" data-cart-map="${kind}:${g.id}:${it.id}">🛒</button><button title="editar" data-map-edit="${kind}:${g.id}:${it.id}">✎</button><button title="remover" data-map-del="${kind}:${g.id}:${it.id}">×</button></div></div>`).join(''):`<div class="lifeempty">Nenhum item registrado.</div>`
    }</div></div>`).join('')+`</div></section>`;
}
function renderClosetPanel(H){
  const sel=closetSelected();const groups=H.closet||[];
  let h=`<section class="closetpanel"><div class="closetbar"><div><h4>Meu closet</h4><p>Itens categorizáveis para montar looks, lembrar o que existe e combinar sem depender da memória.</p></div><div class="closetactions"><button data-closet-add-cat="">+ categoria</button><button data-closet-clear="">limpar seleção</button><button class="primary" data-closet-combine="">combinar (${sel.length})</button></div></div>`;
  if(sel.length)h+=`<div class="lookpreview"><span class="lookl">Look montado</span><div class="lookchips">`+sel.map(it=>`<span class="lookchip"><span class="closetswatch" style="${it.color?`background:${hesc(it.color)}`:''}"></span>${hesc(it.name)} <i>${hesc(it.cat)}</i></span>`).join('')+`</div></div>`;
  h+=`<div class="closetgrid">`+groups.map(g=>`<div class="closetcat"><div class="closetcat-head"><div class="lifeico">${g.ic||'👗'}</div><div class="closetcat-title"><div class="nm">${hesc(g.name)}</div><div class="ct">${hesc(g.hint||'')}</div></div><button data-closet-add="${g.id}">+ item</button></div><div class="closetitems">${
    (g.items&&g.items.length)?g.items.map(it=>`<div class="closetitem ${it.selected?'sel':''}"><div class="top"><button class="closetpick" data-closet-select="${g.id}:${it.id}">${it.selected?'✓':'+'}</button><div class="body"><div class="n">${hesc(it.name)}</div><div class="m">${hesc(it.meta||'')}</div></div><div class="closetswatch" style="${it.color?`background:${hesc(it.color)}`:''}"></div></div><div class="acts"><button title="carrinho" data-cart-closet="${g.id}:${it.id}">🛒</button><button title="editar" data-closet-edit="${g.id}:${it.id}">✎</button><button title="remover" data-closet-del="${g.id}:${it.id}">×</button></div></div>`).join(''):`<div class="closetempty">Nenhum item nesta categoria.</div>`
  }</div></div>`).join('')+`</div></section>`;
  return h;
}
function renderPertencesPanel(H){
  const items=H.pertences||[];
  return `<section class="belongpanel"><div class="belongbar"><div><h4>Pertences</h4><p>Registro rápido de compra e paradeiro: onde está, quando entrou na sua vida e o que não pode sumir.</p></div><button data-pert-add="">+ pertence</button></div><div class="belonggrid">`+
    (items.length?items.map(it=>`<div class="belongrow"><div class="stamp">⌁</div><div class="body"><div class="n">${hesc(it.name)}</div><div class="m">${hesc([it.bought?`compra: ${it.bought}`:'',it.place?`paradeiro: ${it.place}`:''].filter(Boolean).join(' · '))}</div></div><div class="acts"><button title="editar" data-pert-edit="${it.id}">✎</button><button title="remover" data-pert-del="${it.id}">×</button></div></div>`).join(''):`<div class="closetempty">Nenhum pertence registrado.</div>`)+
    `</div></section>`;
}
function renderMapaTab(){
  const H=state.habit;
  let h=`<div class="cctitle"><span class="e">mapa de vida</span><span class="t">Mapa</span><span class="ln"></span></div><p class="chelp">O que você veste, carrega e consome — categorizado, combinável e rastreável. Use 🛒 para mandar pro carrinho.</p>`;
  const cart=H.cart||[];
  if(cart.length)h+=`<div class="cartbar"><span class="cartl">🛒 Carrinho · ${cart.length}</span><div class="cartitems">`+cart.map(c=>`<span class="cartchip">${hesc(c.name)}<button data-cart-del="${c.id}">×</button></span>`).join('')+`</div><button class="cartclear" data-cart-clear="">limpar</button></div>`;
  h+=renderClosetPanel(H);
  h+=mapHtml('bag','Itinerário & bagagem','O que levo comigo no dia a dia e nas saídas.',H.bagMap);
  h+=mapHtml('consumo','Consumo & reposição','Suplementos, hábitos de consumo e o que precisa repor.',H.consumoMap);
  h+=renderPertencesPanel(H);
  return h;
}
function renderPlannerTab(id){
  const cfg=PLANNER_TABS[id];if(!cfg)return'';
  const D=(state.planners[id]=state.planners[id]||{});
  let h=`<div class="cctitle"><span class="e">planner</span><span class="t">${cfg.title}</span><span class="ln"></span></div><p class="chelp">${cfg.desc}</p><div class="plnr">`;
  cfg.sections.forEach(s=>{
    if(s.type==='text'){h+=`<div class="plblk${s.wide?' wide':''}"><label class="pll">${s.title}</label><textarea class="plta" data-pln="${id}:${s.key}" placeholder="…">${hesc(D[s.key]||'')}</textarea></div>`;}
    else if(s.type==='choices'){const sel=D[s.key]||[];h+=`<div class="plblk wide"><label class="pll">${s.title}</label><div class="plchips">`+s.options.map(o=>`<button class="plchip${sel.indexOf(o)>=0?' on':''}" data-plc="${id}:${s.key}:${o}">${o}</button>`).join('')+`</div></div>`;}
    else if(s.type==='columns'){h+=`<div class="plcols" style="grid-template-columns:repeat(${s.cols.length},1fr)">`+s.cols.map(c=>{const arr=D[c[0]]||[];let rows='';for(let i=0;i<s.count;i++)rows+=`<input class="plci" data-plcol="${id}:${c[0]}:${i}" value="${hesc(arr[i]||'')}" placeholder="…">`;return `<div class="plcol"><div class="plcolh">${c[1]}</div>${rows}</div>`;}).join('')+`</div>`;}
  });
  return h+`</div>`;
}
function renderEspelho(tab){
  const E=(state.espelho=state.espelho||{});const g=(k,d)=>hesc(E[k]!=null?E[k]:d);
  const ef=(k,d,cls)=>`<span class="esp-ed${cls?' '+cls:''}" contenteditable="true" data-esp="${k}">${g(k,d)}</span>`;
  const eta=(k,d)=>`<textarea class="esp-ta" data-esp="${k}" rows="3" placeholder="…">${g(k,d)}</textarea>`;
  const head=(eb,t)=>`<div class="esp-head"><span class="esp-eb">${eb}</span><h2 class="esp-t">${t}</h2><span class="esp-rune">${'ᚢ ᚱ ᚦ ᚨ ᚱ'}</span></div>`;
  const card=(inner,cls)=>`<div class="esp-card${cls?' '+cls:''}">${inner}</div>`;
  const metric=(b,s)=>`<div class="esp-metric"><b>${b}</b><span>${s}</span></div>`;
  let h=`<div class="espelho">`;
  if(tab==='astral'){
    h+=head('céu natal','Mapa Astral');
    h+=`<div class="esp-grid2">`;
    h+=card(`<h3>Roda natal</h3><div class="esp-wheel"><div class="esp-wheelring"></div><div class="esp-wheelc">céu de<br>nascimento</div></div><p class="esp-cap">Arraste sua imagem do mapa para o espaço acima.</p>`,'esp-wheelcard');
    h+=card(`<h3>Tríade essencial</h3><div class="esp-rows">`+
      `<div class="esp-row"><span class="esp-k">☉ Sol</span><span class="esp-v">${ef('sun','Sagitário · Casa 9')}</span></div>`+
      `<div class="esp-row"><span class="esp-k">↑ Ascendente</span><span class="esp-v">${ef('asc','Áries')}</span></div>`+
      `<div class="esp-row"><span class="esp-k">☾ Lua</span><span class="esp-v">${ef('moon','Escorpião')}</span></div>`+
      `<div class="esp-row"><span class="esp-k">☿ Mercúrio</span><span class="esp-v">${ef('merc','—')}</span></div>`+
      `<div class="esp-row"><span class="esp-k">♀ Vênus</span><span class="esp-v">${ef('venus','—')}</span></div>`+
      `<div class="esp-row"><span class="esp-k">♂ Marte</span><span class="esp-v">${ef('mars','—')}</span></div>`+
      `</div>`);
    h+=`</div>`;
    h+=card(`<h3>Leitura do céu</h3>${eta('astralRead','Fogo dominante: impulso, coragem e fé no sentido. A Casa 9 forma a identidade pelo estudo, filosofia e transmissão de valores.')}`);
  } else if(tab==='numero'){
    h+=head('vibração','Numerologia');
    h+=`<div class="esp-grid3">`+
      card(`<h3>Motivação</h3><div class="esp-num">${ef('mot','2')}</div><p>${ef('motd','Paz, parceria, diplomacia.','esp-sub')}</p>`)+
      card(`<h3>Expressão</h3><div class="esp-num">${ef('exp','6')}</div><p>${ef('expd','Cuidado, estética, serviço.','esp-sub')}</p>`)+
      card(`<h3>Destino</h3><div class="esp-num">${ef('des','—')}</div><p>${ef('desd','Caminho de vida.','esp-sub')}</p>`)+
      `</div>`;
    h+=card(`<h3>Síntese numerológica</h3>${eta('numRead','A motivação 2 suaviza conflitos; a expressão 6 constrói harmonia concreta. Juntas pedem equilíbrio entre acolher e se posicionar.')}`);
  } else if(tab==='prof'){
    h+=head('vocação','Mapa Profissional');
    h+=`<div class="esp-grid2">`+
      card(`<h3>Eixo de atuação</h3><div class="esp-rows">`+
        `<div class="esp-row"><span class="esp-k">Casa 2</span><span class="esp-v">${ef('c2','Valor, triagem, recursos')}</span></div>`+
        `<div class="esp-row"><span class="esp-k">Casa 7</span><span class="esp-v">${ef('c7','Orientação relacional')}</span></div>`+
        `<div class="esp-row"><span class="esp-k">Casa 9</span><span class="esp-v">${ef('c9','Ensino, sentido, direção')}</span></div></div>`)+
      card(`<h3>Direções possíveis</h3><div class="esp-pills">`+['Triagem & guia','Orientação','Ensino','Curadoria','Estratégia'].map((p,i)=>`<span class="esp-pill" contenteditable="true" data-esp="dir${i}">${g('dir'+i,p)}</span>`).join('')+`</div>`)+
      `</div>`;
    h+=card(`<h3>Plano de vocação</h3>${eta('profRead','Explorar sem se dispersar; orientar sem virar dono da verdade; cuidar sem se apagar.')}`);
  } else if(tab==='sintese'){
    h+=head('operacional','Síntese');
    h+=card(`<div class="esp-quote">${ef('synth','Explorar sem se dispersar; orientar sem virar dono da verdade; cuidar sem se apagar.','esp-q')}</div>`,'esp-quotecard');
    h+=`<div class="esp-grid2">`+
      card(`<h3>Princípios diários</h3><ul class="esp-ul">`+[0,1,2].map(i=>`<li contenteditable="true" data-esp="prin${i}">${g('prin'+i,['Decidir o próximo passo, não a vida toda.','Buffer antes de blocos pesados.','Descanso é bloco positivo, não vazio.'][i])}</li>`).join('')+`</ul>`)+
      card(`<h3>Tensão a vigiar</h3><div class="esp-tension"><span>${ef('tA','velocidade')}</span><span class="esp-x">×</span><span>${ef('tB','cautela')}</span></div>${eta('tNote','Quando acelerar demais, voltar ao corpo e ao próximo passo concreto.')}`)+
      `</div>`;
  } else {
    h+=head('primeira página','Resumo da Identidade');
    h+=`<div class="esp-grid2">`;
    h+=card(`<h3>Identidade-base</h3><div class="esp-lead">${ef('lead','O Astronauta que precisa aterrissar — Fogo, busca de sentido e ação direta.','esp-lead-ed')}</div><div class="esp-metrics">`+
      metric('Sagitário + Áries','Impulso, coragem, abrir caminhos.')+
      metric('Casa 9','Estudo, filosofia, transmissão.')+
      metric('Lua em Escorpião','Intensidade e leitura profunda.')+
      metric('Motivação 2','Paz, parceria, diplomacia.')+
      metric('Expressão 6','Cuidado, estética, serviço.')+
      metric('Casa 2 + 7','Valor, triagem, relação.')+
      `</div>`);
    h+=card(`<h3>Selo</h3><div class="esp-seal">${state.espelho.glyph||'ᚱ'}</div><div class="esp-pills">`+['Arquétipo: Astronauta','Função: Agente de orientação','Vocação: triagem + guia','Tensão: velocidade × cautela'].map((p,i)=>`<span class="esp-pill" contenteditable="true" data-esp="rp${i}">${g('rp'+i,p)}</span>`).join('')+`</div>`,'esp-sealcard');
    h+=`</div>`;
    h+=card(`<div class="esp-quote">${ef('quote','Explorar sem se dispersar; orientar sem virar dono da verdade; cuidar sem se apagar.','esp-q')}</div>`,'esp-quotecard');
  }
  h+=`</div>`;return h;
}
function renderSeed(){
  const w=SEED_WORLDS[seedWorld];if(!w)return;
  if(seedWorld==='asgard'){if(activeSeedTab==='decision'){document.getElementById('seedApp').innerHTML=renderPlannerTab('decision');}else{renderAsgard();}return;}
  if(seedWorld==='saude'){renderSaude();return;}
  if(seedWorld==='tarefas'){document.getElementById('seedApp').innerHTML=renderPlannerTab(activeSeedTab==='ikigai'?'ikigai':'therapy');return;}
  if(seedWorld==='alimentacao'){document.getElementById('seedApp').innerHTML=renderPlannerTab('culture');return;}
  if(seedWorld==='espelho'){document.getElementById('seedApp').innerHTML=renderEspelho(activeSeedTab);return;}
  if(seedWorld==='cosmo'){const cosmoSrc=(window.__resources&&window.__resources.cosmoApp)?window.__resources.cosmoApp:'cosmo-aprovacao-federal/app/Aprovacao Federal.html';document.getElementById('seedApp').innerHTML=`<div class="cosmo-launch"><div class="cl-card"><div class="cl-glyph">✦</div><div class="cl-eb">painel de estudos</div><h2 class="cl-t">Aprovação Federal</h2><p class="cl-p">Edital verticalizado, banco de questões, ciclo de horas e revisão espaçada — com sincronização opcional para planilha Google.</p><a class="cl-btn" href="${cosmoSrc}" target="_blank" rel="noopener">Abrir painel ↗</a></div><iframe class="cl-frame" src="${cosmoSrc}" title="Aprovação Federal"></iframe></div>`;return;}
  const t=(w.tabs.find(x=>x[0]===activeSeedTab)||w.tabs[0]);
  let h=`<div class="sec"><div class="sec-h"><span class="t">${t[1]}</span><span class="sum" style="font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft)">${w.realm}</span></div>`;
  w.rows.forEach(r=>{h+=`<div class="row"><div class="d">${r[0]}${r[1]?`<small>${r[1]}</small>`:''}</div><div class="rv"><b class="v" style="color:var(--ink-soft)">—</b></div></div>`;});
  h+=`</div><div class="sec" style="text-align:center;border-style:dashed;border-color:${w.ac};background:${w.acs}"><div style="font-size:28px;line-height:1;color:${w.ac}">${w.glyph}</div><div style="font-family:'Fraunces',serif;font-size:19px;font-weight:500;margin-top:8px">Galho a brotar</div><div style="font-size:13px;line-height:1.55;color:var(--ink-soft);max-width:380px;margin:7px auto 0">${w.nome} ainda não floresceu — mas já vive na árvore, com o mesmo padrão de abas, painéis e tabelas do Sistema Financeiro.</div></div>`;
  document.getElementById('seedApp').innerHTML=h;
}
document.addEventListener('click',e=>{
  const yn=e.target.closest('#yggNodes .ynode');if(yn){selectWorld(yn.dataset.world);return;}
  const rd=e.target.closest('#yggRail .yr-disc');if(rd){selectWorld(rd.dataset.world);return;}
  if(e.target.closest('#yggRail .yr-home')||e.target.closest('#yggClose')){goHome();return;}
  const ga=e.target.closest('[data-goal-add]');if(ga){openGoal(null);return;}
  const ge=e.target.closest('[data-goal-edit]');if(ge){openGoal(ge.dataset.goalEdit);return;}
  const sa=e.target.closest('[data-saude-add]');if(sa){openSaudeItem(sa.dataset.saudeAdd,null);return;}
  const se=e.target.closest('[data-saude-edit]');if(se){const[t,i]=se.dataset.saudeEdit.split(':');openSaudeItem(t,i);return;}
});
document.addEventListener('input',e=>{
  const pn=e.target.closest('[data-pln]');if(pn){const[id,k]=pn.dataset.pln.split(':');(state.planners[id]=state.planners[id]||{})[k]=pn.value;save();return;}
  const pc=e.target.closest('[data-plcol]');if(pc){const[id,k,i]=pc.dataset.plcol.split(':');const D=(state.planners[id]=state.planners[id]||{});const arr=(D[k]=D[k]||[]);arr[+i]=pc.value;save();return;}
});
document.addEventListener('click',e=>{
  const pch=e.target.closest('[data-plc]');if(pch){const[id,k,o]=pch.dataset.plc.split(':');const D=(state.planners[id]=state.planners[id]||{});const arr=(D[k]=D[k]||[]);const ix=arr.indexOf(o);if(ix>=0)arr.splice(ix,1);else arr.push(o);save();if(seedWorld)renderSeed();return;}
  const mAdd=e.target.closest('[data-map-add]');if(mAdd){const[kind,gid]=mAdd.dataset.mapAdd.split(':');const{g}=mapFind(kind,gid);if(g){const it=askMapItem();if(it){g.items=g.items||[];g.items.push({id:uid(),...it,checked:false});save();renderHabit();}}return;}
  const mChk=e.target.closest('[data-map-check]');if(mChk){const[kind,gid,iid]=mChk.dataset.mapCheck.split(':');const{it}=mapFind(kind,gid,iid);if(it){it.checked=!it.checked;save();renderHabit();}return;}
  const mEd=e.target.closest('[data-map-edit]');if(mEd){const[kind,gid,iid]=mEd.dataset.mapEdit.split(':');const{it}=mapFind(kind,gid,iid);if(it){const nv=askMapItem(it);if(nv){Object.assign(it,nv);save();renderHabit();}}return;}
  const mDel=e.target.closest('[data-map-del]');if(mDel){const[kind,gid,iid]=mDel.dataset.mapDel.split(':');const{g}=mapFind(kind,gid,iid);if(g){g.items=(g.items||[]).filter(x=>x.id!==iid);save();renderHabit();}return;}
  const cMap=e.target.closest('[data-cart-map]');if(cMap){const[kind,gid,iid]=cMap.dataset.cartMap.split(':');const{it}=mapFind(kind,gid,iid);if(it){state.habit.cart.push({id:uid(),name:it.name});save();renderHabit();}return;}
  const cClo=e.target.closest('[data-cart-closet]');if(cClo){const[gid,iid]=cClo.dataset.cartCloset.split(':');const g=(state.habit.closet||[]).find(x=>x.id===gid);const it=g&&(g.items||[]).find(x=>x.id===iid);if(it){state.habit.cart.push({id:uid(),name:it.name});save();renderHabit();}return;}
  const cDel=e.target.closest('[data-cart-del]');if(cDel){state.habit.cart=(state.habit.cart||[]).filter(x=>x.id!==cDel.dataset.cartDel);save();renderHabit();return;}
  if(e.target.closest('[data-cart-clear]')){state.habit.cart=[];save();renderHabit();return;}
  if(e.target.closest('[data-closet-add-cat]')){const n=prompt('Nome da categoria:');if(n&&n.trim()){const ic=prompt('Ícone (emoji):','👗')||'👗';state.habit.closet.push({id:uid(),name:n.trim(),ic:ic.trim(),hint:'',items:[]});save();renderHabit();}return;}
  const clAdd=e.target.closest('[data-closet-add]');if(clAdd){const g=(state.habit.closet||[]).find(x=>x.id===clAdd.dataset.closetAdd);if(g){const it=askClosetItem();if(it){g.items=g.items||[];g.items.push({id:uid(),...it});save();renderHabit();}}return;}
  const clSel=e.target.closest('[data-closet-select]');if(clSel){const[gid,iid]=clSel.dataset.closetSelect.split(':');const g=(state.habit.closet||[]).find(x=>x.id===gid);const it=g&&(g.items||[]).find(x=>x.id===iid);if(it){it.selected=!it.selected;save();renderHabit();}return;}
  const clEd=e.target.closest('[data-closet-edit]');if(clEd){const[gid,iid]=clEd.dataset.closetEdit.split(':');const g=(state.habit.closet||[]).find(x=>x.id===gid);const it=g&&(g.items||[]).find(x=>x.id===iid);if(it){const nv=askClosetItem(it);if(nv){Object.assign(it,nv);save();renderHabit();}}return;}
  const clDel=e.target.closest('[data-closet-del]');if(clDel){const[gid,iid]=clDel.dataset.closetDel.split(':');const g=(state.habit.closet||[]).find(x=>x.id===gid);if(g){g.items=(g.items||[]).filter(x=>x.id!==iid);save();renderHabit();}return;}
  if(e.target.closest('[data-closet-clear]')){(state.habit.closet||[]).forEach(g=>(g.items||[]).forEach(it=>it.selected=false));save();renderHabit();return;}
  if(e.target.closest('[data-closet-combine]')){renderHabit();return;}
  if(e.target.closest('[data-pert-add]')){const it=askPertence();if(it){state.habit.pertences.push({id:uid(),...it});save();renderHabit();}return;}
  const pEd=e.target.closest('[data-pert-edit]');if(pEd){const it=(state.habit.pertences||[]).find(x=>x.id===pEd.dataset.pertEdit);if(it){const nv=askPertence(it);if(nv){Object.assign(it,nv);save();renderHabit();}}return;}
  const pDel=e.target.closest('[data-pert-del]');if(pDel){state.habit.pertences=(state.habit.pertences||[]).filter(x=>x.id!==pDel.dataset.pertDel);save();renderHabit();return;}
});
document.addEventListener('input',e=>{
  const gv=e.target.closest('[data-asg-vision]');if(gv){state.asgard.vision=gv.value;save();return;}
  const ae=e.target.closest('[data-area-edit]');if(ae){const a=state.asgard.areas.find(x=>x.id===ae.dataset.areaEdit);if(a){a.name=ae.innerText.trim();save();}return;}
  const gp=e.target.closest('#goalProg');if(gp){document.getElementById('goalProgV').textContent=gp.value+'%';}
  const cvn=e.target.closest('[data-cv-notes]');if(cvn){state.culture.notes=cvn.value;save();return;}
  const rw=e.target.closest('[data-rweak]');if(rw){state.habit.rhythm.weak[+rw.dataset.rweak]=rw.value;save();return;}
  const rf=e.target.closest('[data-rfield]');if(rf){state.habit.rhythm[rf.dataset.rfield]=rf.value;save();return;}
  const rt=e.target.closest('[data-rtheme]');if(rt){const[d,k]=rt.dataset.rtheme.split(':');(state.habit.rhythm.themes[d]=state.habit.rhythm.themes[d]||{})[k]=rt.value;save();return;}
});
(function(){const s=document.getElementById('goalSave');if(s)s.onclick=()=>{const A=state.asgard;const title=document.getElementById('goalTitle').value.trim();if(!title){closeModals();return;}const data={area:document.getElementById('goalArea').value,why:document.getElementById('goalWhy').value.trim(),target:document.getElementById('goalTarget').value.trim(),horizon:document.getElementById('goalHorizon').value.trim(),progress:+document.getElementById('goalProg').value,title};
  if(asgGoalId){const g=A.goals.find(x=>x.id===asgGoalId);if(g)Object.assign(g,data);}else{A.goals.push({id:uid(),...data});}save();closeModals();if(seedWorld==='asgard')renderAsgard();};
  const d=document.getElementById('goalDel');if(d)d.onclick=()=>{if(asgGoalId&&confirm('Excluir esta meta?')){state.asgard.goals=state.asgard.goals.filter(x=>x.id!==asgGoalId);save();closeModals();if(seedWorld==='asgard')renderAsgard();}};})();
(function(){const s=document.getElementById('saudeSave');if(s)s.onclick=()=>{const obj={};document.querySelectorAll('#saudeBody [data-sf]').forEach(el=>obj[el.dataset.sf]=el.value);if(!Object.values(obj).some(v=>(v||'').trim())){closeModals();return;}
  if(saudeId){const it=state.saude[saudeType].find(x=>x.id===saudeId);if(it)Object.assign(it,obj);}else{state.saude[saudeType].push({id:uid(),...obj});}save();closeModals();if(seedWorld==='saude')renderSaude();};
  const d=document.getElementById('saudeDel');if(d)d.onclick=()=>{if(saudeId&&confirm('Excluir este registro?')){state.saude[saudeType]=state.saude[saudeType].filter(x=>x.id!==saudeId);save();closeModals();if(seedWorld==='saude')renderSaude();}};})();

/* Boot */
load();paintTabs();renderAll();refreshSyncBadge();selectWorld('habitos');showWorldShell();qnCheckAlarms();updateRavenBadge();


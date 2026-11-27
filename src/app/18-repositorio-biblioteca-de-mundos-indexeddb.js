/* ===== Repositório / Biblioteca de mundos (IndexedDB) ===== */
(function(){
  const DB_NAME='axishub_repo',STORE='files';let _db=null;
  function db(){return new Promise((res,rej)=>{if(_db)return res(_db);const r=indexedDB.open(DB_NAME,1);
    r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(STORE))d.createObjectStore(STORE,{keyPath:'id'});};
    r.onsuccess=()=>{_db=r.result;res(_db);};r.onerror=()=>rej(r.error);});}
  function tx(m){return db().then(d=>d.transaction(STORE,m).objectStore(STORE));}
  function putFile(rec){return tx('readwrite').then(s=>new Promise((res,rej)=>{const r=s.put(rec);r.onsuccess=()=>res();r.onerror=()=>rej(r.error);}));}
  function allFiles(){return tx('readonly').then(s=>new Promise((res,rej)=>{const r=s.getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);}));}
  function delFile(id){return tx('readwrite').then(s=>new Promise((res,rej)=>{const r=s.delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error);}));}

  const RW=(typeof YGG_WORLDS!=='undefined'?YGG_WORLDS:[]).map(w=>({id:w.id,nome:w.nome,glyph:w.glyph,ac:w.ac}));
  RW.push({id:'geral',nome:'Geral',glyph:'❖',ac:'#7a7163'});
  const wmap={};RW.forEach(w=>wmap[w.id]=w);
  const W=id=>wmap[id]||wmap.geral;

  let _files=[],_filter='todos',_q='',_urls=[],_rvId=null,_rvURL=null;
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function fmtSize(b){if(b<1024)return b+' B';if(b<1048576)return (b/1024).toFixed(0)+' KB';return (b/1048576).toFixed(1)+' MB';}
  function fmtDate(ts){try{return new Date(ts).toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'2-digit'});}catch(e){return '';}}
  function extOf(rec){const m=(rec.name||'').match(/\.([a-z0-9]+)$/i);if(m)return m[1];if((rec.type||'').includes('pdf'))return 'pdf';return (rec.type||'?').split('/').pop()||'?';}
  function isImg(rec){return (rec.type||'').startsWith('image/');}
  function isPdf(rec){return (rec.type||'')==='application/pdf'||/\.pdf$/i.test(rec.name||'');}
  function freshURL(b){const u=URL.createObjectURL(b);_urls.push(u);return u;}
  function clearURLs(){_urls.forEach(u=>URL.revokeObjectURL(u));_urls=[];}

  function renderRail(){
    const counts={todos:_files.length};RW.forEach(w=>counts[w.id]=0);
    _files.forEach(f=>{counts[f.world]=(counts[f.world]||0)+1;});
    let h='<div class="rp-railh">Mundos</div>';
    h+=`<div class="rp-chip${_filter==='todos'?' sel':''}" data-w="todos"><span class="rp-disc" style="--cc:var(--brass)">∗</span><span class="nm">Todos</span><span class="ct">${counts.todos}</span></div>`;
    RW.forEach(w=>{h+=`<div class="rp-chip${_filter===w.id?' sel':''}" data-w="${w.id}"><span class="rp-disc" style="--cc:${w.ac}">${w.glyph}</span><span class="nm">${esc(w.nome)}</span><span class="ct">${counts[w.id]||0}</span></div>`;});
    document.getElementById('rpRail').innerHTML=h;
  }
  function renderGrid(){
    clearURLs();
    const g=document.getElementById('rpGrid');
    let list=_files.slice().sort((a,b)=>b.ts-a.ts);
    if(_filter!=='todos')list=list.filter(f=>f.world===_filter);
    if(_q)list=list.filter(f=>(f.name||'').toLowerCase().includes(_q));
    if(!list.length){
      g.innerHTML=`<div class="rp-empty"><div class="g">▤</div>${_q?'Nenhum arquivo encontrado.':'Nenhum arquivo aqui ainda.<br>Importe seus planners deste mundo.'}</div>`;return;
    }
    g.innerHTML=list.map(f=>{
      const w=W(f.world);
      const thumb=isImg(f)
        ? `<img src="${freshURL(f.blob)}" alt="" loading="lazy">`
        : `<span class="ext" style="--cc:${w.ac}">${esc(extOf(f))}</span>`;
      return `<div class="rp-card" data-id="${f.id}"><div class="rp-thumb"><span class="rp-tag" style="--cc:${w.ac}">${w.glyph}</span>${thumb}</div><div class="rp-cap"><div class="fn">${esc(f.name)}</div><div class="fs">${fmtSize(f.size)} · ${fmtDate(f.ts)}</div></div></div>`;
    }).join('');
  }
  async function refreshMeter(){
    const el=document.getElementById('rpMeter');if(!el)return;
    const n=_files.length,bytes=_files.reduce((s,f)=>s+(f.size||0),0);
    let extra='';
    try{if(navigator.storage&&navigator.storage.estimate){const q=await navigator.storage.estimate();if(q.quota)extra=' · '+((q.usage||0)/q.quota*100).toFixed(0)+'% usado';}}catch(e){}
    el.innerHTML=`${n} arquivo${n===1?'':'s'}<br>${fmtSize(bytes)}${extra}`;
  }
  async function loadAndRender(){_files=await allFiles();renderRail();renderGrid();refreshMeter();}

  function importFiles(list){
    if(!list||!list.length)return;
    const world=(_filter&&_filter!=='todos')?_filter:'geral';
    let pending=list.length;
    [...list].forEach(file=>{
      const rec={id:'f_'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),name:file.name,world,type:file.type||'',size:file.size,ts:Date.now(),blob:file};
      putFile(rec).then(()=>{if(--pending===0)loadAndRender();}).catch(()=>{if(--pending===0)loadAndRender();});
    });
  }

  function openRepo(){loadAndRender();document.getElementById('repoOverlay').classList.add('on');}
  function closeRepo(){document.getElementById('repoOverlay').classList.remove('on');clearURLs();}

  function openViewer(id){
    const rec=_files.find(f=>f.id===id);if(!rec)return;_rvId=id;
    if(_rvURL)URL.revokeObjectURL(_rvURL);_rvURL=URL.createObjectURL(rec.blob);
    const stage=document.getElementById('rvStage');
    if(isImg(rec))stage.innerHTML=`<img src="${_rvURL}" alt="">`;
    else if(isPdf(rec))stage.innerHTML=`<iframe src="${_rvURL}" title="${esc(rec.name)}"></iframe>`;
    else stage.innerHTML=`<div class="rv-generic"><div class="g">▤</div>Pré-visualização indisponível<br>para este tipo de arquivo.</div>`;
    document.getElementById('rvMeta').innerHTML=`<span class="rv-name">${esc(rec.name)}</span><span class="rv-sub">${esc(W(rec.world).nome)} · ${fmtSize(rec.size)} · ${fmtDate(rec.ts)}</span>`;
    const opts=RW.map(w=>`<option value="${w.id}"${w.id===rec.world?' selected':''}>${esc(w.nome)}</option>`).join('');
    document.getElementById('rvTools').innerHTML=`<select id="rvMove" title="Mover para outro mundo">${opts}</select><a class="rv-btn" id="rvDl" href="${_rvURL}" download="${esc(rec.name)}">Baixar</a><button class="rv-btn" id="rvRen">Renomear</button><button class="rv-btn danger" id="rvDel">Excluir</button>`;
    document.getElementById('rvMove').onchange=e=>{rec.world=e.target.value;putFile(rec).then(()=>{loadAndRender();document.getElementById('rvMeta').querySelector('.rv-sub').textContent=`${W(rec.world).nome} · ${fmtSize(rec.size)} · ${fmtDate(rec.ts)}`;});};
    document.getElementById('rvRen').onclick=()=>{const nv=prompt('Novo nome do arquivo:',rec.name);if(nv&&nv.trim()){rec.name=nv.trim();putFile(rec).then(()=>{loadAndRender();document.getElementById('rvMeta').querySelector('.rv-name').textContent=rec.name;});}};
    document.getElementById('rvDel').onclick=()=>{if(confirm('Excluir "'+rec.name+'" definitivamente?')){delFile(rec.id).then(()=>{closeViewer();loadAndRender();});}};
    document.getElementById('rpViewer').classList.add('on');
  }
  function closeViewer(){document.getElementById('rpViewer').classList.remove('on');if(_rvURL){URL.revokeObjectURL(_rvURL);_rvURL=null;}_rvId=null;}

  /* wiring */
  const _rb=document.getElementById('repoBtn');if(_rb)_rb.onclick=openRepo;window.openRepo=openRepo;
  document.getElementById('rpImport').onclick=()=>document.getElementById('rpFile').click();
  document.getElementById('rpFile').onchange=e=>{importFiles(e.target.files);e.target.value='';};
  document.getElementById('rpSearch').oninput=e=>{_q=e.target.value.trim().toLowerCase();renderGrid();};
  document.getElementById('rpRail').addEventListener('click',e=>{const c=e.target.closest('.rp-chip');if(!c)return;_filter=c.dataset.w;renderRail();renderGrid();});
  document.getElementById('rpGrid').addEventListener('click',e=>{const c=e.target.closest('.rp-card');if(c)openViewer(c.dataset.id);});
  document.querySelectorAll('[data-repo-close]').forEach(b=>b.addEventListener('click',closeRepo));
  document.querySelectorAll('[data-rv-close]').forEach(b=>b.addEventListener('click',closeViewer));
  const drop=document.getElementById('rpDrop'),shell=document.querySelector('.rp-shell');
  ['dragenter','dragover'].forEach(ev=>shell.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('hot');}));
  ['dragleave','drop'].forEach(ev=>shell.addEventListener(ev,e=>{e.preventDefault();if(ev==='drop'){importFiles(e.dataTransfer.files);}drop.classList.remove('hot');}));
  document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(document.getElementById('rpViewer').classList.contains('on'))closeViewer();else if(document.getElementById('repoOverlay').classList.contains('on'))closeRepo();});
})();

;

(function(){
 const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
 function clickTab(id){const t=q('.tab[data-tab="'+id+'"]');if(t)t.click();qa('[data-awb-tab]').forEach(b=>b.classList.toggle('on',b.dataset.awbTab===id));}
 function weekLabel(){const d=new Date(), day=(d.getDay()+6)%7, a=new Date(d);a.setDate(d.getDate()-day);const z=new Date(a);z.setDate(a.getDate()+6);const f=x=>x.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','');q('#awbWeekTitle').textContent='Semana '+getWeek(d);q('#awbWeekRange').textContent=f(a)+' — '+f(z);}
 function getWeek(d){const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));x.setUTCDate(x.getUTCDate()+4-(x.getUTCDay()||7));const y=new Date(Date.UTC(x.getUTCFullYear(),0,1));return Math.ceil((((x-y)/86400000)+1)/7)}
 qa('[data-awb-tab]').forEach(b=>b.onclick=()=>clickTab(b.dataset.awbTab));
 const weekDlg=q('#awbWeekDialog'),weekBody=q('#awbWeekDialogBody');
 function refreshAwbTrackers(){try{const k=(typeof pdStr==='function'?pdStr():new Date().toISOString().slice(0,10));const H=state?.habit||{};const sh=H.sleep?.[k]??H.sleepLog?.[k]?.total??H.sleepLog?.[k]?.hours??'';q('#awbSleepVal').textContent=sh?(sh+'h'):'—';const cups=H.hydration?.[k]??0;const goal=H.hydrationGoal||8;q('#awbWaterVal').textContent=cups+'/'+goal;const meds=(H.medications||[]);const done=(H.medsLog?.[k]||[]).length;const expected=meds.reduce((s,m)=>s+Math.max(1,(m.times||[]).length),0);q('#awbMedsVal').textContent=expected?(done+'/'+expected):'0/0';const expense=window.getDailyExpenseTotal?window.getDailyExpenseTotal(k):(H.dailyExpense?.[k]??H.expenses?.[k]??0);q('#awbExpenseVal').textContent='R$ '+Number(expense||0).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:0});}catch(e){}}
 function openWeekPanel(){activeHabitTab='habit';clickTab('habit');weekBody.innerHTML=(typeof renderPlanejador==='function'?renderPlanejador():'<p>Painel semanal indisponível.</p>');weekDlg.classList.add('open');weekDlg.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';refreshAwbTrackers();}
 function syncWeekPanel(){if(weekDlg.classList.contains('open')){weekBody.innerHTML=(typeof renderPlanejador==='function'?renderPlanejador():'<p>Painel semanal indisponível.</p>');refreshAwbTrackers();}}
 function closeWeekPanel(){weekDlg.classList.remove('open');weekDlg.setAttribute('aria-hidden','true');document.body.style.overflow='';}
 q('#awbWeekClose').onclick=closeWeekPanel;document.addEventListener('click',e=>{if(e.target.closest('#awbWeekPanelInline'))openWeekPanel();});weekDlg.onclick=e=>{if(e.target===weekDlg)closeWeekPanel()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&weekDlg.classList.contains('open'))closeWeekPanel()});
 refreshAwbTrackers();
 q('#awbHome').onclick=()=>{if(typeof goHome==='function')goHome();else if(q('#modeBtnTop'))q('#modeBtnTop').click()};
 q('#awbToday').onclick=()=>{const now=new Date(), key=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');if(typeof mes!=='undefined'){try{mes=key;annual=false;if(typeof render==='function')render();if(typeof applyView==='function')applyView()}catch(e){}}clickTab('habit')};
 document.addEventListener('click',e=>{if(!e.target.closest('#awbAddInline'))return;openWeekPanel();setTimeout(()=>{const candidates=['#wtNew','#blockNew','#newBlock','#addBlock','.addmini'];for(const s of candidates){const el=q(s);if(el){el.click();break}}},120)});
 qa('[data-awb-action="projects"]').forEach(b=>b.onclick=()=>{const p=q('#projFab');if(p)p.click();else if(typeof openProjects==='function')openProjects()});
 document.addEventListener('click',e=>{const t=e.target.closest?.('.tab[data-tab]');if(t)qa('[data-awb-tab]').forEach(b=>b.classList.toggle('on',b.dataset.awbTab===t.dataset.tab))});
 window.__syncWeekPanel=syncWeekPanel;
 weekLabel();
})();

;

(function(){const q=s=>document.querySelector(s),pop=q('#awbQuickPop');function key(){return typeof pdStr==='function'?pdStr():new Date().toISOString().slice(0,10)}function refresh(){const H=state.habit,k=key(),sh=H.sleep?.[k]||0,c=H.hydration?.[k]||0,g=H.hydrationGoal||8,m=H.medications||[],d=(H.medsLog?.[k]||[]).length,exp=m.reduce((s,x)=>s+Math.max(1,(x.times||[]).length),0);q('#awbSleepVal').textContent=sh?sh+'h':'—';q('#awbWaterVal').textContent=c+'/'+g;q('#awbMedsVal').textContent=d+'/'+exp;const ex=window.getDailyExpenseTotal?window.getDailyExpenseTotal(k):(H.dailyExpense?.[k]||0);q('#awbExpenseVal').textContent='R$ '+Number(ex).toLocaleString('pt-BR')}function saveAll(){save();refresh();window.__syncWeekPanel?.();if(typeof activeHabitTab!=='undefined'&&activeHabitTab==='sono'&&typeof renderHabit==='function')renderHabit()}function pos(b){const r=b.getBoundingClientRect();pop.style.top=r.bottom+8+'px';pop.style.left=Math.max(8,Math.min(innerWidth-294,r.left))+'px';pop.classList.add('open')}function close(){pop.classList.remove('open')}document.addEventListener('click',e=>{const t=e.target.closest('.awb-tracker');if(t){const H=state.habit,k=key();if(t.id==='awbExpense'){const total=window.getDailyExpenseTotal?window.getDailyExpenseTotal(k):(H.dailyExpense?.[k]||0),items=window.getDailyExpenseEntries?window.getDailyExpenseEntries(k):[];pop.innerHTML='<div class="aqp-head"><div><b>Lançar gasto de hoje</b><small>Total do dia · R$ '+Number(total).toLocaleString('pt-BR',{minimumFractionDigits:2})+'</small></div><button data-aqp-close>×</button></div><div class="aqp-expense-form"><input id="aqpExpenseDesc" placeholder="Descrição do gasto"><div class="aqp-grid"><input id="aqpExpenseInput" type="number" min="0" step="0.01" placeholder="0,00"><select id="aqpExpenseCat"><option>Alimentação</option><option>Transporte</option><option>Casa</option><option>Saúde</option><option>Lazer</option><option>Compras</option><option>Assinaturas</option><option>Outros</option></select></div><div class="aqp-grid"><select id="aqpExpenseMethod"><option>Pix</option><option>Débito</option><option>Crédito</option><option>Dinheiro</option><option>Transferência</option><option>Outro</option></select><button id="aqpExpenseSave">＋ lançar</button></div></div><div class="aqp-day-list">'+(items.length?items.map(x=>'<div><span><b>'+((x.descricao||'Gasto'))+'</b><small>'+((x.sub||x.grupo||'Outros'))+' · '+(x.meio||'—')+'</small></span><strong>R$ '+Number(x.efet??x.valor??0).toLocaleString('pt-BR',{minimumFractionDigits:2})+'</strong><button data-aqp-exp-del="'+x.id+'">×</button></div>').join(''):'<p>Nenhum lançamento hoje.</p>')+'</div>'}else if(t.id==='awbSleep'){pop.innerHTML='<div class="aqp-head"><b>Sono de hoje</b><button data-aqp-close>×</button></div><div class="aqp-row"><input id="aqpSleepInput" type="number" min="0" max="14" step=".5" value="'+(H.sleep?.[k]||'')+'"><button id="aqpSleepSave">Salvar</button></div>'}else if(t.id==='awbWater'){pop.innerHTML='<div class="aqp-head"><b>Hidratação</b><button data-aqp-close>×</button></div><div class="aqp-row"><button data-aqp-water="-1">−</button><input id="aqpWaterInput" type="number" min="0" value="'+(H.hydration?.[k]||0)+'"><button data-aqp-water="1">＋ copo</button></div>'}else{const L=H.medications||[],T=H.medsLog?.[k]||[];pop.innerHTML='<div class="aqp-head"><b>Medicação de hoje</b><button data-aqp-close>×</button></div><div class="aqp-meds">'+(L.map(m=>{const times=(m.times&&m.times.length)?m.times:['sem horário'];return '<div class="aqp-med-group"><b>'+m.name+'</b><small>'+(m.dose||'')+'</small>'+times.map(tm=>{const token=m.id+'@'+tm;return '<label><input type="checkbox" data-aqp-med="'+token+'" '+(T.includes(token)?'checked':'')+'><span>'+tm+'</span><small>'+(m.quantity||1)+' un.</small></label>'}).join('')+'</div>'}).join('')||'<small>Sem medicamentos cadastrados.</small>')+'</div>'}pos(t);e.stopPropagation();return}if(e.target.closest('[data-aqp-close]')){close();return}if(e.target.closest('#aqpExpenseSave')){const v=+(q('#aqpExpenseInput').value||0);if(v>0&&window.addDailyExpenseEntry){window.addDailyExpenseEntry({date:key(),value:v,description:(q('#aqpExpenseDesc').value||'').trim()||'Gasto diário',category:q('#aqpExpenseCat').value||'Outros',method:q('#aqpExpenseMethod').value||null});saveAll();if(typeof renderAll==='function'&&!habitMode)renderAll();close();}return}const delExp=e.target.closest('[data-aqp-exp-del]');if(delExp&&window.deleteDailyExpenseEntry){window.deleteDailyExpenseEntry(delExp.dataset.aqpExpDel);saveAll();close();return}if(e.target.closest('#aqpSleepSave')){state.habit.sleep[key()]=+(q('#aqpSleepInput').value||0);saveAll();renderHabit();close();return}const wd=e.target.closest('[data-aqp-water]');if(wd){const k=key();state.habit.hydration[k]=Math.max(0,(state.habit.hydration[k]||0)+(+wd.dataset.aqpWater));saveAll();q('#aqpWaterInput').value=state.habit.hydration[k];return}if(!e.target.closest('#awbQuickPop'))close()});document.addEventListener('change',e=>{const m=e.target.closest('[data-aqp-med]');if(!m)return;const k=key(),L=(state.habit.medsLog[k]=state.habit.medsLog[k]||[]),i=L.indexOf(m.dataset.aqpMed);if(m.checked&&i<0)L.push(m.dataset.aqpMed);if(!m.checked&&i>=0)L.splice(i,1);saveAll()});setTimeout(refresh,200)})();

;

(function(){
 let editing=null;const q=s=>document.querySelector(s),dlg=q('#healthMedDialog');
 function openMed(id){const H=state.habit,m=id?(H.medications||[]).find(x=>x.id===id):null;editing=id||null;q('#healthMedTitle').textContent=m?'Editar medicação':'Nova medicação';q('#healthMedName').value=m?.name||'';q('#healthMedDose').value=m?.dose||'';q('#healthMedQty').value=m?.quantity||1;q('#healthMedTimes').value=(m?.times||[]).join(', ');dlg.classList.add('open');setTimeout(()=>q('#healthMedName').focus(),40)}
 function closeMed(){dlg.classList.remove('open');editing=null}
 function rerender(){save();renderHabit();if(typeof refreshAwbTrackers==='function')refreshAwbTrackers()}
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-med-add]')){openMed();return}
  const ed=e.target.closest('[data-med-edit]');if(ed){openMed(ed.dataset.medEdit);return}
  const del=e.target.closest('[data-med-del]');if(del){const id=del.dataset.medDel,m=state.habit.medications.find(x=>x.id===id);if(m&&confirm('Excluir '+m.name+'?')){state.habit.medications=state.habit.medications.filter(x=>x.id!==id);Object.keys(state.habit.medsLog||{}).forEach(d=>state.habit.medsLog[d]=(state.habit.medsLog[d]||[]).filter(x=>x!==id&&!String(x).startsWith(id+'@')));rerender()}return}
  if(e.target.closest('[data-health-med-close]')){closeMed();return}
  if(e.target.closest('[data-health-med-save]')){const name=q('#healthMedName').value.trim();if(!name){q('#healthMedName').focus();return}const times=q('#healthMedTimes').value.split(',').map(x=>x.trim()).filter(Boolean).map(x=>/^\d{1,2}:\d{2}$/.test(x)?x.padStart(5,'0'):x);const obj={name,dose:q('#healthMedDose').value.trim(),quantity:Math.max(1,+q('#healthMedQty').value||1),times};if(editing){const m=state.habit.medications.find(x=>x.id===editing);Object.assign(m,obj)}else state.habit.medications.push({id:uid(),...obj});closeMed();rerender();return}
  const ms=e.target.closest('[data-health-month-step]');if(ms){const [y,m]=state.habit.healthMonth.split('-').map(Number),d=new Date(y,m-1+(+ms.dataset.healthMonthStep),1);state.habit.healthMonth=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');rerender();return}
  const day=e.target.closest('[data-health-date]');if(day){const d=day.dataset.healthDate;state.habit.healthMonth=d.slice(0,7);const sl=state.habit.sleep[d]||0,w=state.habit.hydration[d]||0,g=state.habit.dailyExpense?.[d]||0;let ex=0,tk=0;(state.habit.medications||[]).forEach(m=>{ex+=Math.max(1,(m.times||[]).length)*(+(m.quantity||1));tk+=(state.habit.medsLog?.[d]||[]).filter(x=>x===m.id||String(x).startsWith(m.id+'@')).length;});const sr=state.habit.sleepRoutine?.[d]||{},em=({1:'😫 Péssimo',2:'😕 Ruim',3:'😐 Regular',4:'🙂 Bom',5:'😄 Ótimo'}[+sr.satisfaction]||'sem avaliação');alert(new Date(d+'T00:00:00').toLocaleDateString('pt-BR')+'\nSono: '+(sl?sl+'h':'sem registro')+'\nAcordou: '+(sr.wakeTime||'—')+'\nDormir: '+(sr.bedTime||'—')+'\nSatisfação: '+em+'\nHidratação: '+w+' copos\nMedicação: '+tk+'/'+ex+' doses\nGastos: '+(g?'R$ '+Number(g).toLocaleString('pt-BR',{minimumFractionDigits:2}):'sem registro'));return}
 });
 document.addEventListener('change',e=>{
  const mo=e.target.closest('[data-health-month]');if(mo){state.habit.healthMonth=mo.value;rerender();return}
  const dose=e.target.closest('[data-med-dose]');if(dose){const d=pdStr(),L=(state.habit.medsLog[d]=state.habit.medsLog[d]||[]),token=dose.dataset.medDose,i=L.indexOf(token);if(dose.checked&&i<0)L.push(token);if(!dose.checked&&i>=0)L.splice(i,1);rerender();return}
  const goal=e.target.closest('[data-hydro-goal]');if(goal){state.habit.hydrationGoal=Math.max(1,+goal.value||8);rerender();return}
 });
})();

;

(function(){
 const q=s=>document.querySelector(s),pop=q('#awbQuickPop');
 const key=()=>typeof pdStr==='function'?pdStr():new Date().toISOString().slice(0,10);
 const prevKey=k=>{const d=new Date(k+'T12:00:00');d.setDate(d.getDate()-1);return d.toISOString().slice(0,10)};
 const emoji=v=>({1:'😫',2:'😕',3:'😐',4:'🙂',5:'😄'}[+v]||'');
 function ensure(){const H=state.habit;H.sleep=H.sleep||{};H.sleepLog=H.sleepLog||{};H.sleepRoutine=H.sleepRoutine||{};return H}
 function duration(k){const H=ensure(),cur=H.sleepRoutine[k]||{},prev=H.sleepRoutine[prevKey(k)]||{};if(!cur.wakeTime||!prev.bedTime)return 0;const start=new Date(prevKey(k)+'T'+prev.bedTime+':00'),end=new Date(k+'T'+cur.wakeTime+':00');const h=(end-start)/36e5;return h>0&&h<24?Math.round(h*100)/100:0}
 function persist(k){const H=ensure(),r=H.sleepRoutine[k]||{};H.sleepLog[k]=H.sleepLog[k]||{};H.sleepLog[k].wakeTime=r.wakeTime||'';H.sleepLog[k].satisfaction=r.satisfaction||null;H.sleepLog[k].calculatedFromPreviousBedtime=H.sleepRoutine[prevKey(k)]?.bedTime||'';H.sleepLog[k].bedTime=r.bedTime||'';const h=duration(k);if(h)H.sleep[k]=h;else delete H.sleep[k];save();refresh();if(typeof activeHabitTab!=='undefined'&&activeHabitTab==='sono'&&typeof renderHabit==='function')renderHabit()}
 function refresh(){const H=ensure(),k=key(),r=H.sleepRoutine[k]||{},h=duration(k)||H.sleep[k]||0;const el=q('#awbSleepVal');if(el)el.textContent=(h?h.toFixed(1)+'h':'—')+(r.satisfaction?' · '+emoji(r.satisfaction):'')}
 function renderPopup(btn){const H=ensure(),k=key(),r=H.sleepRoutine[k]||{},prev=H.sleepRoutine[prevKey(k)]||{},h=duration(k);pop.classList.add('awb-sleep-popup');pop.innerHTML=`<div class="aqp-head"><b>Sono · hoje</b><button data-aqp-close>×</button></div><div class="aqp-sleep-grid"><label>Hora que acordei<input id="sleepWakeToday" type="time" value="${r.wakeTime||''}"></label><label>Hora que vou dormir<input id="sleepBedToday" type="time" value="${r.bedTime||''}"></label></div><div class="aqp-sat"><small>Satisfação com o sono</small><div class="aqp-sat-row">${[1,2,3,4,5].map(v=>`<button type="button" data-popup-sat="${v}" class="${+r.satisfaction===v?'on':''}">${emoji(v)}</button>`).join('')}</div></div><div class="aqp-sleep-result">${prev.bedTime&&r.wakeTime?`Dormiu de ${prev.bedTime} de ontem até ${r.wakeTime}: <b>${h.toFixed(1)}h</b>`:'Registre hoje a hora de acordar e, diariamente, a hora de dormir. O total será calculado na manhã seguinte.'}</div><div class="aqp-sleep-actions"><button id="saveSleepDaily">Salvar no Saúde</button></div>`;const rc=btn.getBoundingClientRect();pop.style.top=(rc.bottom+8)+'px';pop.style.left=Math.max(8,Math.min(innerWidth-350,rc.left))+'px';pop.classList.add('open')}
 document.addEventListener('click',e=>{const b=e.target.closest('#awbSleep');if(b){e.preventDefault();e.stopImmediatePropagation();renderPopup(b);return}},true);
 document.addEventListener('click',e=>{const sat=e.target.closest('[data-popup-sat]');if(sat){pop.querySelectorAll('[data-popup-sat]').forEach(x=>x.classList.remove('on'));sat.classList.add('on');return}if(e.target.closest('#saveSleepDaily')){const H=ensure(),k=key(),r=(H.sleepRoutine[k]=H.sleepRoutine[k]||{});r.wakeTime=q('#sleepWakeToday').value;r.bedTime=q('#sleepBedToday').value;r.satisfaction=+(pop.querySelector('[data-popup-sat].on')?.dataset.popupSat||0)||null;persist(k);pop.classList.remove('open');return}const ss=e.target.closest('[data-sleep-satisfaction]');if(ss){const H=ensure(),k=key(),r=(H.sleepRoutine[k]=H.sleepRoutine[k]||{});r.satisfaction=+ss.dataset.sleepSatisfaction;persist(k);return}},true);
 document.addEventListener('change',e=>{const f=e.target.closest('[data-sleep-routine]');if(!f)return;const H=ensure(),k=key(),r=(H.sleepRoutine[k]=H.sleepRoutine[k]||{});r[f.dataset.sleepRoutine]=f.value;persist(k)},true);
 setTimeout(refresh,250);window.__refreshSleepDaily=refresh;
})();

;

(function(){
  function removeCalendarRail(){
    document.body.classList.remove('mg-open');
    ['mgDock','mgHandle'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
    document.querySelectorAll('.mgdock,.mg-handle,.mg-cal-inline,.side-rail,.world-rail').forEach(function(el){el.remove();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',removeCalendarRail);else removeCalendarRail();
  new MutationObserver(removeCalendarRail).observe(document.documentElement,{childList:true,subtree:true});
})();

;

(function(){
 const MONTHS=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
 let navYear=(new Date()).getFullYear();
 let initialized=false;
 function monday(date){const d=new Date(date);const day=d.getDay();d.setDate(d.getDate()-(day===0?6:day-1));d.setHours(0,0,0,0);return d}
 function currentBase(){return (typeof weekStart!=='undefined'&&weekStart)?new Date(weekStart):new Date()}
 function setPeriod(date){
   const d=new Date(date);
   if(typeof weekStart!=='undefined')weekStart=monday(d);
   if(typeof mes!=='undefined')mes=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
   if(typeof anoSel!=='undefined')anoSel=d.getFullYear();
   navYear=d.getFullYear();
   if(typeof renderHabit==='function')renderHabit();
   if(typeof updateHeader==='function')updateHeader();
   setTimeout(renderCalendarTabs,10);
 }
 function renderCalendarTabs(){
   const main=document.querySelector('.axhtml.habit main');if(!main)return;
   let box=main.querySelector('.planner-edge-tabs');
   if(!box){box=document.createElement('nav');box.className='planner-edge-tabs';box.setAttribute('aria-label','Selecionar ano e mês');main.prepend(box)}
   const base=currentBase(),activeYear=base.getFullYear(),activeMonth=base.getMonth();
   if(!Number.isFinite(navYear))navYear=activeYear;
   box.innerHTML=`<div class="planner-year-tab"><button type="button" data-planner-year="-1" aria-label="Ano anterior">‹</button><strong>${navYear}</strong><button type="button" data-planner-year="1" aria-label="Próximo ano">›</button><small>ANO</small></div>`+
    MONTHS.map((m,i)=>`<button type="button" class="planner-month-tab ${navYear===activeYear&&i===activeMonth?'active':''}" data-planner-month="${i}" aria-label="Abrir ${m} de ${navYear}">${m}</button>`).join('');
 }
 function initializeToday(){
   if(initialized)return;initialized=true;
   const today=new Date();navYear=today.getFullYear();
   if(typeof weekStart!=='undefined')weekStart=monday(today);
   if(typeof mes!=='undefined')mes=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0');
   if(typeof anoSel!=='undefined')anoSel=today.getFullYear();
   if(typeof renderHabit==='function')renderHabit();
   if(typeof updateHeader==='function')updateHeader();
   setTimeout(renderCalendarTabs,20);
 }
 document.addEventListener('click',e=>{
   const y=e.target.closest('[data-planner-year]');
   if(y){navYear+=Number(y.dataset.plannerYear);renderCalendarTabs();return}
   const m=e.target.closest('[data-planner-month]');
   if(m){const month=Number(m.dataset.plannerMonth);setPeriod(new Date(navYear,month,1));return}
   const w=e.target.closest('[data-wkp]');
   if(w)setTimeout(()=>{navYear=currentBase().getFullYear();renderCalendarTabs()},40);
 },true);
 new MutationObserver(()=>{if(document.documentElement.classList.contains('habit'))renderCalendarTabs()}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initializeToday);else initializeToday();
 setTimeout(initializeToday,100);
})();

;

(function(){
 const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
 const DAYS=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
 const MON=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
 function isoWeek(d){const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));x.setUTCDate(x.getUTCDate()+4-(x.getUTCDay()||7));const y=new Date(Date.UTC(x.getUTCFullYear(),0,1));return Math.ceil((((x-y)/86400000)+1)/7)}
 function day2(n){return String(n).padStart(2,'0')}
 function updateHeaderDate(){
   const d=new Date(), dow=(d.getDay()+6)%7, a=new Date(d), z=new Date(d);
   a.setDate(d.getDate()-dow);z.setDate(a.getDate()+6);
   const title=q('#awbWeekTitle'),range=q('#awbWeekRange');
   if(title)title.textContent=DAYS[d.getDay()]+', '+day2(d.getDate())+' '+MON[d.getMonth()];
   if(range)range.textContent='semana '+isoWeek(d)+' · '+day2(a.getDate())+' '+MON[a.getMonth()]+' — '+day2(z.getDate())+' '+MON[z.getMonth()];
 }
 function clearPanelState(){qa('.awb-nav button').forEach(b=>b.classList.remove('panel-on'))}
 function openContextPanel(kind,button){
   clearPanelState();button?.classList.add('panel-on');
   try{
     if(kind==='mapa'){
       document.body.classList.add('dock-open');
       const eb=q('#dockEb'),tt=q('#dockTitle'),bd=q('#dockBody');
       if(eb)eb.textContent='visão integrada';if(tt)tt.textContent='Mapa';
       if(bd)bd.innerHTML=typeof renderMapaTab==='function'?renderMapaTab():'<p>Mapa indisponível.</p>';
     }else if(kind==='saude'){
       document.body.classList.add('dock-open');
       const eb=q('#dockEb'),tt=q('#dockTitle'),bd=q('#dockBody');
       if(eb)eb.textContent='saúde & recuperação';if(tt)tt.textContent='Saúde';
       if(bd){
         bd.innerHTML=typeof renderSonoSheet==='function'
           ? renderSonoSheet()
           : '<div class="panel-error"><b>Saúde indisponível</b><span>O módulo não foi carregado.</span></div>';
         if(typeof refreshAwbTrackers==='function')refreshAwbTrackers();
       }
     }else if(kind==='projetos'){
       if(typeof openGT==='function')openGT('projetos');
       else document.body.classList.add('dock-open');
     }
   }catch(err){console.error(err)}
 }
 function bind(){
   const map=q('[data-awb-tab="mapa"]'),health=q('[data-awb-tab="sono"]'),projects=q('[data-awb-action="projects"]'),week=q('[data-awb-tab="habit"]');
   if(map)map.onclick=e=>{e.preventDefault();openContextPanel('mapa',map)};
   if(health)health.onclick=e=>{e.preventDefault();openContextPanel('saude',health)};
   if(projects)projects.onclick=e=>{e.preventDefault();openContextPanel('projetos',projects)};
   if(week){const old=week.onclick;week.onclick=e=>{clearPanelState();document.body.classList.remove('dock-open');if(typeof closeGT==='function')closeGT();if(old)old.call(week,e)}}
   const close=q('#dockClose');if(close)close.addEventListener('click',clearPanelState);
 }
 updateHeaderDate();bind();setInterval(updateHeaderDate,60000);
})();

;

(function(){
  const root=document.documentElement;
  const todayKey=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
  const monthOf=d=>String(d||todayKey()).slice(0,7);
  const amount=e=>Number(e.efet!=null?e.efet:(e.valor!=null?e.valor:e.prev))||0;
  const isDaily=e=>!!(e&&(e.source==='weekhub-header'||e.dailyHeader||e.diaGasto));
  window.getDailyExpenseEntries=function(date){return (state.entries||[]).filter(e=>isDaily(e)&&(e.diaGasto||e.dReal||e.dPrev)===date).sort((a,b)=>(a.createdAt||'').localeCompare(b.createdAt||''));};
  window.getDailyExpenseTotal=function(date){return window.getDailyExpenseEntries(date).reduce((sum,e)=>sum+amount(e),0);};
  window.syncDailyExpenseCache=function(date){state.habit=state.habit||{};state.habit.dailyExpense=state.habit.dailyExpense||{};state.habit.dailyExpense[date]=window.getDailyExpenseTotal(date);};
  window.addDailyExpenseEntry=function(o){
    const date=o.date||todayKey(), value=Number(o.value)||0;if(value<=0)return null;
    const entry={id:(typeof uid==='function'?uid():'dh_'+Date.now()),tipo:'variavel',mes:monthOf(date),valor:value,prev:value,efet:value,descricao:o.description||'Gasto diário',meio:o.method||null,dPrev:date,dReal:date,recorrente:false,grupo:'Gastos diários',sub:o.category||'Outros',diaGasto:date,source:'weekhub-header',dailyHeader:true,createdAt:new Date().toISOString()};
    state.entries.push(entry);window.syncDailyExpenseCache(date);if(typeof save==='function')save();return entry;
  };
  window.deleteDailyExpenseEntry=function(id){const e=(state.entries||[]).find(x=>x.id===id),date=e&&(e.diaGasto||e.dReal||e.dPrev);state.entries=(state.entries||[]).filter(x=>x.id!==id);if(date)window.syncDailyExpenseCache(date);if(typeof save==='function')save();};
  // Migrate the old one-value-per-day tracker to proper finance launches once.
  state.habit=state.habit||{};state.habit.dailyExpense=state.habit.dailyExpense||{};
  Object.entries(state.habit.dailyExpense).forEach(([date,val])=>{if(Number(val)>0&&!window.getDailyExpenseEntries(date).length){window.addDailyExpenseEntry({date,value:Number(val),description:'Gasto diário importado',category:'Outros',method:null});}});

  function markNav(which){document.querySelectorAll('.awb-nav button').forEach(b=>b.classList.toggle('on',which==='finance'?b.dataset.awbAction==='finance':b.dataset.awbTab===which));}
  window.openFinanceHub=function(){
    if(typeof closeToolPanel==='function')try{closeToolPanel()}catch(e){}
    seedWorld=null;habitMode=false;annual=false;activeFinanceTab=activeFinanceTab||'mes';mes=monthOf(todayKey());anoSel=Number(mes.slice(0,4));root.classList.add('financehub-page');
    if(typeof applyMode==='function')applyMode();if(typeof renderAll==='function')renderAll();markNav('finance');AXD.scrollTo({top:0,behavior:'smooth'});
  };
  window.openWeekHubPage=function(tab){
    seedWorld=null;habitMode=true;annual=false;root.classList.remove('financehub-page');activeHabitTab=tab||'habit';
    if(typeof applyMode==='function')applyMode();markNav(activeHabitTab);AXD.scrollTo({top:0,behavior:'smooth'});
  };
  document.addEventListener('click',function(e){
    const f=e.target.closest('[data-awb-action="finance"]');if(f){e.preventDefault();e.stopImmediatePropagation();window.openFinanceHub();return;}
    const w=e.target.closest('[data-awb-tab="habit"]');if(w&&!habitMode){e.preventDefault();e.stopImmediatePropagation();window.openWeekHubPage('habit');return;}
  },true);
  // Keep FinanceHub page active state coherent when native tabs change.
  document.addEventListener('click',e=>{const t=e.target.closest('#mainTabs .tab');if(t&&!habitMode)markNav('finance')});
  // Add source tags to daily launches after every render.
  const decorate=()=>document.querySelectorAll('[data-del]').forEach(btn=>{const e=(state.entries||[]).find(x=>x.id===btn.dataset.del);if(e&&isDaily(e)){const row=btn.closest('tr');const first=row&&row.querySelector('td');if(first&&!first.querySelector('.finance-source-tag'))first.insertAdjacentHTML('beforeend',' <span class="finance-source-tag">header · '+(e.diaGasto||'')+'</span>');}});
  const mo=new MutationObserver(()=>requestAnimationFrame(decorate));mo.observe(document.body,{subtree:true,childList:true});decorate();
  if(typeof refreshAwbTrackers==='function')refreshAwbTrackers();
})();

;
/* aberto pela aba Tesouro: vai direto ao FinanceHub */
/* backup: exportar e importar o registro inteiro (chave sfp_bruno_v4) */
(function(){var K='sfp_bruno_v4';function poe(){var nav=document.querySelector('.awb-nav');if(!nav||document.getElementById('fin-bk'))return;
 var w=document.createElement('span');w.id='fin-bk';w.style.cssText='display:inline-flex;gap:6px;margin-left:8px';
 w.innerHTML='<button type="button" id="fin-exp" title="Baixar um arquivo com todos os dados das finanças">\u2913 Exportar</button><button type="button" id="fin-imp" title="Carregar um arquivo de backup">\u2912 Importar</button><input id="fin-arq" type="file" accept="application/json,.json" hidden>';
 nav.appendChild(w);
 document.getElementById('fin-exp').onclick=function(){var v=localStorage.getItem(K)||'{}';var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([v],{type:'application/json'}));a.download='financas-backup-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();};
 var arq=document.getElementById('fin-arq');document.getElementById('fin-imp').onclick=function(){arq.click();};
 arq.onchange=function(){var f=arq.files&&arq.files[0];if(!f)return;f.text().then(function(t){var o;try{o=JSON.parse(t);}catch(e){alert('Arquivo inválido: não é um backup das finanças.');return;}
  if(!o||typeof o!=='object'||!Array.isArray(o.entries)){alert('Arquivo inválido: falta a lista de lançamentos.');return;}
  if(!confirm('Substituir os dados das finanças deste aparelho pelo backup?'))return;localStorage.setItem(K,JSON.stringify(o));location.reload();});};}
 if(document.readyState!=='loading')poe();else document.addEventListener('DOMContentLoaded',poe);})();
;try{var __s0=save;save=function(){var r=__s0.apply(this,arguments);try{axSalvou();}catch(e){}return r;};}catch(e){}
AX.selectWorld=function(id){selectWorld(id);};AX.gt=function(k){openGT(k);};AX.selo=function(){try{updateRavenBadge();}catch(e){}};AX.st=function(){return state;};AX.save=function(){save();};AX.uid=function(){return uid();};
AX.recarrega=function(){try{load();renderAll();if(typeof refreshAwbTrackers==="function")refreshAwbTrackers();if(typeof updateRavenBadge==="function")updateRavenBadge();}catch(e){console.error(e);}};
}/* ===== Peças nativas: Enfermaria com medidores, Captura melhorada, Bunker 9 com o Corvo ===== */
function nvEsc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function nvHoje(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function nvDias(a,b){return Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);}
function nvBRL(v){return 'R$ '+(Number(v)||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});}
function nvMove(){move.apply(null,arguments);try{grava();}catch(e){}}
function nvSalva(){try{grava();}catch(e){}try{pinta();}catch(e){}}

/* ---------------- Enfermaria: medicação e gasto do dia (dados do AxisHub) ---------------- */
var ENF_CATS=['Alimentação','Transporte','Casa','Saúde','Lazer','Compras','Assinaturas','Outros'];
var ENF_FORMAS=['Pix','Débito','Crédito','Dinheiro','Transferência','Outro'];
function enfMedHTML(){var st=AX.st&&AX.st();if(!st)return '<span class="k5">P·05 Medicação</span><div class="sub2">carregando…</div>';
 var H=st.habit,d=nvHoje(),L=(H.medsLog&&H.medsLog[d])||[],meds=H.medications||[],tot=0,ok=0,lin='';
 meds.forEach(function(m){var tk=(m.times&&m.times.length)?m.times.map(function(t){return [m.id+'@'+t,t];}):[[m.id,'']];
  tk.forEach(function(x){tot++;var on=L.indexOf(x[0])>=0;if(on)ok++;
   lin+='<label class="enf-dose'+(on?' on':'')+'"><input type="checkbox" data-enf-dose="'+nvEsc(x[0])+'"'+(on?' checked':'')+'><b>'+nvEsc(m.name)+'</b><small>'+nvEsc([m.dose,x[1]].filter(Boolean).join(' · '))+'</small><button type="button" class="enf-x" data-enf-medx="'+m.id+'" aria-label="Remover '+nvEsc(m.name)+'">✕</button></label>';});});
 return '<span class="k5">P·05 Medicação</span><div class="big2"><span>'+ok+'</span><small> / '+tot+' doses hoje</small></div>'+
  '<div class="sub2">'+(tot&&ok>=tot?'todas tomadas':tot?'faltam <b>'+(tot-ok)+'</b>':'nenhuma medicação cadastrada')+'</div>'+
  '<div class="enf-doses">'+lin+'</div>'+
  '<form class="enf-f" data-enf-medform><input name="n" placeholder="medicação" maxlength="60" required><input name="d" placeholder="dose" maxlength="40"><input name="h" placeholder="horários (08:00, 20:00)" maxlength="60"><button>Adicionar</button></form>'+
  '<button type="button" class="enf-link" data-enf-hist>histórico de saúde do mês</button>';}
function enfGastoHTML(){var d=nvHoje(),it=(window.getDailyExpenseEntries?window.getDailyExpenseEntries(d):[]),tot=0;
 it.forEach(function(e){tot+=Number(e.efet||e.valor||e.prev)||0;});
 var lim=(AX.st&&AX.st()&&AX.st().habit.dailySpendLimit)||0;
 return '<span class="k5">P·06 Gasto do dia</span><div class="big2"><span>'+nvBRL(tot)+'</span><small> hoje</small></div>'+
  '<div class="sub2">'+(it.length?it.length+' lançamento'+(it.length>1?'s':'')+' · entra na planilha do mês':'nada lançado hoje')+(lim?' · limite '+nvBRL(lim):'')+'</div>'+
  '<div class="enf-gl">'+it.map(function(e){return '<div><span><b>'+nvEsc(e.descricao||'Gasto')+'</b><small>'+nvEsc((e.sub||'Outros')+' · '+(e.meio||'—'))+'</small></span><strong>'+nvBRL(e.efet||e.valor)+'</strong><button type="button" class="enf-x" data-enf-gx="'+e.id+'" aria-label="Apagar lançamento">✕</button></div>';}).join('')+'</div>'+
  '<form class="enf-f enf-fg" data-enf-gform><input name="t" placeholder="descrição" maxlength="60"><input name="v" type="number" min="0" step="0.01" placeholder="0,00" required>'+
  '<select name="c">'+ENF_CATS.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select><select name="m">'+ENF_FORMAS.map(function(c){return '<option>'+c+'</option>';}).join('')+'</select><button>Lançar</button></form>';}
function enfPinta(forca){var corpo=document.querySelector('#c-h-ctn .corpo');if(!corpo||!AX.ok)return;
 var a=document.getElementById('enf-med'),b=document.getElementById('enf-gasto');
 if(!a){a=document.createElement('div');a.id='enf-med';corpo.appendChild(a);}
 if(!b){b=document.createElement('div');b.id='enf-gasto';corpo.appendChild(b);}
 var foco=document.activeElement&&(a.contains(document.activeElement)||b.contains(document.activeElement));if(foco&&!forca)return;
 a.innerHTML=enfMedHTML();b.innerHTML=enfGastoHTML();}
function enfMuda(fn){var st=AX.st();fn(st);AX.save();enfPinta(true);}
document.addEventListener('change',function(e){var x=e.target.closest&&e.target.closest('[data-enf-dose]');if(!x)return;var tok=x.getAttribute('data-enf-dose');
 enfMuda(function(st){var d=nvHoje(),H=st.habit;H.medsLog=H.medsLog||{};var L=(H.medsLog[d]=H.medsLog[d]||[]),i=L.indexOf(tok);if(x.checked&&i<0)L.push(tok);if(!x.checked&&i>=0)L.splice(i,1);});});
document.addEventListener('submit',function(e){var f=e.target;
 if(f.matches&&f.matches('[data-enf-medform]')){e.preventDefault();var n=f.n.value.trim();if(!n)return;var ts=f.h.value.split(',').map(function(s){return s.trim();}).filter(Boolean).map(function(s){return /^\d{1,2}:\d{2}$/.test(s)?s.padStart(5,'0'):s;});
  enfMuda(function(st){st.habit.medications=st.habit.medications||[];st.habit.medications.push({id:AX.uid(),name:n,dose:f.d.value.trim(),quantity:1,times:ts});});return;}
 if(f.matches&&f.matches('[data-enf-gform]')){e.preventDefault();var v=parseFloat(String(f.v.value).replace(',','.'));if(!(v>0))return;
  window.addDailyExpenseEntry({value:v,description:f.t.value.trim()||'Gasto diário',category:f.c.value,method:f.m.value});try{AX.recarrega();}catch(z){}enfPinta(true);return;}});
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-enf-medx],[data-enf-gx],[data-enf-hist]');if(!t)return;
 if(t.hasAttribute('data-enf-medx')){e.preventDefault();var id=t.getAttribute('data-enf-medx');enfMuda(function(st){var H=st.habit;H.medications=(H.medications||[]).filter(function(m){return m.id!==id;});Object.keys(H.medsLog||{}).forEach(function(d){H.medsLog[d]=(H.medsLog[d]||[]).filter(function(x){return x!==id&&String(x).indexOf(id+'@')!==0;});});});return;}
 if(t.hasAttribute('data-enf-gx')){window.deleteDailyExpenseEntry(t.getAttribute('data-enf-gx'));try{AX.recarrega();}catch(z){}enfPinta(true);return;}
 if(t.hasAttribute('data-enf-hist')){var b=AX.A&&AX.A.querySelector('[data-awb-tab="sono"]');if(b)b.click();}});
(function(){var c0=pintaCtn;pintaCtn=function(){var r=c0.apply(this,arguments);try{enfPinta();}catch(e){console.error(e);}return r;};})();

/* ---------------- Captura melhorada: categoria, prazo, hora e alarme ---------------- */
var CAP_CATS=[['ideia','Ideia','#9a7b3f'],['tarefa','Tarefa','#2f6f4e'],['lembrete','Lembrete','#b4521c'],['compra','Compra','#7a5cab'],['estudo','Estudo','#3a6ea5']];
var CAP_SEL='ideia',CAP_FILTRO='todas';
function capCat(id){for(var i=0;i<CAP_CATS.length;i++)if(CAP_CATS[i][0]===id)return CAP_CATS[i];return null;}
function capQuando(it){if(!it.p)return null;var hj=nvHoje(),n=nvDias(hj,it.p),agora=new Date(),dt=new Date(it.p+'T'+(it.h||'23:59'));
 if(dt<agora)return ['vencida',n<0?'venceu há '+(-n)+' dia'+(n<-1?'s':''):'venceu hoje'+(it.h?' às '+it.h:''),'v'];
 if(n===0)return ['hoje','hoje'+(it.h?' às '+it.h:''),'h'];if(n===1)return ['amanha','amanhã'+(it.h?' às '+it.h:''),'a'];
 return ['futura',it.p.split('-').reverse().slice(0,2).join('/')+(it.h?' às '+it.h:''),'f'];}
function capOrdem(){var C=S.cap.map(function(it,i){return {it:it,i:i};});
 function peso(x){var q=capQuando(x.it);return q?({v:0,h:1,a:2,f:3})[q[2]]:4;}
 C.sort(function(a,b){var pa=peso(a),pb=peso(b);if(pa!==pb)return pa-pb;if(a.it.p&&b.it.p&&a.it.p!==b.it.p)return a.it.p<b.it.p?-1:1;return a.i-b.i;});
 return C.filter(function(x){if(CAP_FILTRO==='todas')return true;if(CAP_FILTRO==='prazo')return !!x.it.p;return (x.it.c||'')===CAP_FILTRO;});}
pintaCap=function(){var box=document.getElementById('cp-l');if(!box)return;var ent=box.previousElementSibling;
 if(!document.getElementById('cp-mais')&&ent){var m=document.createElement('div');m.id='cp-mais';m.className='cp-mais';
  m.innerHTML='<div class="cp-cats" role="radiogroup" aria-label="Categoria">'+CAP_CATS.map(function(c){return '<button type="button" role="radio" data-cpcat="'+c[0]+'" style="--cc:'+c[2]+'">'+c[1]+'</button>';}).join('')+'</div>'+
   '<label class="cp-q">prazo <input type="date" id="cp-p"></label><label class="cp-q">hora <input type="time" id="cp-h"></label><label class="cp-q cp-al"><input type="checkbox" id="cp-a"> alarme</label>';
  ent.parentNode.insertBefore(m,box);}
 Array.prototype.forEach.call(document.querySelectorAll('[data-cpcat]'),function(b){b.setAttribute('aria-checked',String(b.getAttribute('data-cpcat')===CAP_SEL));});
 var fl='<div class="cp-filtro">'+[['todas','todas'],['prazo','com prazo']].concat(CAP_CATS.map(function(c){return [c[0],c[1]];})).map(function(f){return '<button type="button" data-cpf="'+f[0]+'" aria-pressed="'+(CAP_FILTRO===f[0])+'">'+f[1]+'</button>';}).join('')+'</div>';
 var L=capOrdem(),h=L.map(function(x){var it=x.it,c=capCat(it.c),q=capQuando(it);
  return '<li class="cp-it'+(q?' q-'+q[2]:'')+'" data-cpi="'+x.i+'">'+(c?'<i class="cp-tag" style="--cc:'+c[2]+'">'+c[1]+'</i>':'')+'<span>'+nvEsc(it.t)+'</span>'+(q?'<em class="cp-pz">'+(it.a?'⏰ ':'')+q[1]+'</em>':'')+
   '<button data-cpok="'+x.i+'" title="Resolvida">✓</button><button data-cl="'+x.i+'">vira lâmina</button><button class="x3" data-cx="'+x.i+'" aria-label="Apagar">✕</button></li>';}).join('');
 box.innerHTML=(S.cap.length?fl:'')+(h||'<li class="vz6">'+(S.cap.length?'nada neste filtro':'caixa vazia')+'</li>');
 var bc=el('b-cap');if(bc)bc.onclick=(function(){var v=el('cp-in').value.trim();if(!v)return;var it={t:v,d:hoje(),c:CAP_SEL};var p=el('cp-p').value,hr=el('cp-h').value,al=el('cp-a').checked;
  if(p||hr){it.p=p||nvHoje();if(hr)it.h=hr;}if(al&&it.p){it.a=1;try{if(window.Notification&&Notification.permission==='default')Notification.requestPermission();}catch(e){}}
  S.cap.unshift(it);if(S.cap.length>60)S.cap.length=60;CAP_SEL='ideia';el('cp-in').value='';el('cp-p').value='';el('cp-h').value='';el('cp-a').checked=false;nvMove(0,1,'Captura: '+esc(v),false,-2,0,0);});
 var inp=el('cp-in');if(inp&&!inp.dataset.cpk){inp.dataset.cpk=1;inp.addEventListener('keydown',function(e){if(e.key==='Enter'){var b=el('b-cap');if(b)b.click();}});}};
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-cpcat],[data-cpf],[data-cpok],#cp-l [data-cl],#cp-l [data-cx]');if(!t)return;
 if(t.hasAttribute('data-cpcat')){CAP_SEL=t.getAttribute('data-cpcat');pintaCap();return;}
 if(t.hasAttribute('data-cpf')){CAP_FILTRO=t.getAttribute('data-cpf');pintaCap();return;}
 var k=+(t.getAttribute('data-cpok')||t.getAttribute('data-cl')||t.getAttribute('data-cx')),it=S.cap[k];if(!it)return;e.preventDefault();e.stopImmediatePropagation();
 if(t.hasAttribute('data-cpok')){S.cap.splice(k,1);nvMove(0,1,'Captura resolvida: “'+esc(it.t)+'”.',false,-2,0,0);return;}
 if(t.hasAttribute('data-cl')){S.extras.push({id:'x'+Date.now(),c:'dig',e:'baixa',t:5,h:it.t,p:'',s:['Faça a coisa.'],d:''});S.cap.splice(k,1);nvMove(0,2,'Captura triada: “'+esc(it.t)+'” virou lâmina.',false,-2,0,0);return;}
 if(t.hasAttribute('data-cx')){S.cap.splice(k,1);nvSalva();}},true);
/* alarme: confere a cada 30 s */
function capAlarme(){var agora=new Date(),mud=false;(S.cap||[]).forEach(function(it){if(!it.a||it.f||!it.p||!it.h)return;if(new Date(it.p+'T'+it.h)<=agora){it.f=1;mud=true;capAvisa(it);}});if(mud){try{grava();}catch(e){}try{pintaCap();corvoPinta();}catch(e){}}}
function capAvisa(it){var t=document.getElementById('cap-toast');if(!t){t=document.createElement('div');t.id='cap-toast';t.className='cap-toast';t.setAttribute('role','alert');document.body.appendChild(t);}
 t.innerHTML='<b>⏰ '+nvEsc(it.t)+'</b><small>'+(it.p===nvHoje()?'hoje':it.p.split('-').reverse().join('/'))+' às '+nvEsc(it.h)+'</small><button type="button">ok</button>';t.classList.add('on');
 t.querySelector('button').onclick=function(){t.classList.remove('on');};
 try{if(window.Notification&&Notification.permission==='granted')new Notification('Captura · '+it.t,{body:'agora: '+it.h});}catch(e){}}
setInterval(capAlarme,30000);setTimeout(capAlarme,4000);

/* ---------------- Bunker 9: a oficina dos projetos, com o Corvo ---------------- */
function corvoAlertas(){var hj=nvHoje(),A=[];
 (S.proj||[]).forEach(function(p,i){if(p.est==='concluido')return;var steps=p.passos||[];if(steps.length&&steps.every(function(s){return s.ok;}))return;
  if(p.est==='pausado')return;
  if(p.prazo){var n=nvDias(hj,p.prazo);if(n<0)A.push({n:0,ic:'✶',t:p.nome,s:'prazo venceu há '+(-n)+' dia'+(n<-1?'s':''),go:'p'+i});else if(n<=3)A.push({n:1,ic:'⏳',t:p.nome,s:n===0?'prazo é hoje':'prazo em '+n+' dia'+(n>1?'s':''),go:'p'+i});}
  if(p.waiting&&p.review&&p.review<=hj)A.push({n:1,ic:'⌛',t:p.nome,s:'conferir o impedimento: '+p.waiting,go:'p'+i});
  var u=p.ult||p.aberto;if(u){var dd=nvDias(u,hj);if(dd>14)A.push({n:2,ic:'❄',t:p.nome,s:'abandonado · '+dd+' dias sem avanço',go:'p'+i});else if(dd>7)A.push({n:3,ic:'❄',t:p.nome,s:'esfriando · '+dd+' dias sem avanço',go:'p'+i});}
  if(!steps.filter(function(s){return !s.ok;}).length)A.push({n:3,ic:'◇',t:p.nome,s:'sem próxima etapa definida',go:'p'+i});});
 (S.cap||[]).forEach(function(it){var q=capQuando(it);if(!q)return;if(q[2]==='v')A.push({n:0,ic:'⏰',t:it.t,s:'captura '+q[1],go:'cap'});else if(q[2]==='h')A.push({n:1,ic:'⏰',t:it.t,s:'captura para '+q[1],go:'cap'});});
 return A.sort(function(a,b){return a.n-b.n;});}
function corvoHTML(){var A=corvoAlertas();
 return '<div class="b9-corvo'+(A.length?' tem':'')+'"><div class="b9-ch"><span class="b9-ico" aria-hidden="true">⚑</span><b>O corvo</b><small>'+(A.length?A.length+' aviso'+(A.length>1?'s':''):'nada pedindo atenção')+'</small></div>'+
  (A.length?'<ul>'+A.slice(0,8).map(function(a){return '<li class="n'+a.n+'"><button type="button" data-b9go="'+a.go+'"><i>'+a.ic+'</i><span><b>'+nvEsc(a.t)+'</b><small>'+nvEsc(a.s)+'</small></span></button></li>';}).join('')+'</ul>':'<p>Prazos, projetos parados e capturas vencidas aparecem aqui.</p>')+'</div>';}
function corvoPinta(){var c=document.querySelector('#pj-l .b9-corvo');if(!c)return;var d=document.createElement('div');d.innerHTML=corvoHTML();c.replaceWith(d.firstChild);}
pintaProj=function(){var box=el('pj-l');if(!box)return;var b=el('b-proj');if(b)b.style.display='none';
 var foco=document.activeElement&&box.contains(document.activeElement)&&/INPUT|TEXTAREA/.test(document.activeElement.tagName);if(foco)return;
 var hd=el('h-proj');if(hd&&!hd.dataset.b9){hd.dataset.b9=1;hd.innerHTML='Bunker 9 <span>// a oficina dos projetos &middot; o corvo vigia</span>';}
 var ativos=(S.proj||[]).filter(function(p){return p.est!=='concluido'&&p.est!=='pausado';}).length;
 box.innerHTML='<div class="b9">'+corvoHTML()+'<div class="b9-ofi"><p class="vx-muted">'+ativos+' na bancada &middot; congelar guarda o projeto e libera uma frente.</p>'+vxProjectsHTML()+'</div></div>';
 Array.prototype.forEach.call(box.querySelectorAll('.b9-ofi > .vx-item'),function(it,i){it.id='b9-p'+i;});
 Array.prototype.forEach.call(box.querySelectorAll('[data-step-form]'),function(f){f.onsubmit=function(e){e.preventDefault();var p=S.proj.find(function(p){return p.id===f.dataset.stepForm;}),s=f.elements.step.value.trim();if(s&&p){if(p.est==='concluido')return vxMsg('Reabra o projeto antes de adicionar etapas.');p.passos.push({vid:vxId(),t:s,ok:false});p.ult=hoje();nvSalva();}};});
 ['pedit','ptoggle','pwait','pdone','step','promote'].forEach(function(kind){Array.prototype.forEach.call(box.querySelectorAll('[data-'+kind+']'),function(bt){bt.onclick=function(){vxProjectAction(kind,bt.dataset[kind]);};});});
 try{vxBind();}catch(e){}};
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-b9go]');if(!t)return;var g=t.getAttribute('data-b9go'),alvo=g==='cap'?document.getElementById('cp-l'):document.getElementById('b9-'+g);
 if(alvo){alvo.scrollIntoView({block:'center',behavior:'smooth'});alvo.classList.add('b9-pisca');setTimeout(function(){alvo.classList.remove('b9-pisca');},1600);}});
setInterval(function(){try{corvoPinta();}catch(e){}},60000);

/* ---------------- Grade semanal: foco e metas do mês na linha do "limpar semana" ---------------- */
var MESES_PT=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function tbMesPlano(){var st=AX.st&&AX.st();if(!st)return null;var d=new Date(),k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');st.habit.monthPlan=st.habit.monthPlan||{};return {k:k,m:(st.habit.monthPlan[k]=st.habit.monthPlan[k]||{}),st:st};}
function tbFoco(){var cab=document.querySelector('.tbcab');if(!cab||!AX.ok)return;var P=tbMesPlano();if(!P)return;var w=document.getElementById('tb-mes');
 if(!w){w=document.createElement('div');w.id='tb-mes';w.className='tb-mes';
  w.innerHTML='<label><span>foco de '+MESES_PT[new Date().getMonth()]+'</span><input data-tbm="foco" maxlength="120" placeholder="sem foco definido"></label><label><span>metas do mês</span><input data-tbm="metas" maxlength="160" placeholder="sem metas"></label>';
  var lp=document.getElementById('b-tb-lp');cab.insertBefore(w,lp||null);
  w.addEventListener('change',function(e){var i=e.target.closest('[data-tbm]');if(!i)return;var Q=tbMesPlano();if(!Q)return;Q.m[i.getAttribute('data-tbm')]=i.value.trim();AX.save();});
  w.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.matches('[data-tbm]'))e.target.blur();});}
 Array.prototype.forEach.call(w.querySelectorAll('[data-tbm]'),function(i){if(document.activeElement!==i)i.value=P.m[i.getAttribute('data-tbm')]||'';});}
(function(){var t0=pintaTb;pintaTb=function(){var r=t0.apply(this,arguments);try{tbFoco();}catch(e){}return r;};})();

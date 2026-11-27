/* ===== Planejar ===== */
function renderPlanos(){
  const el=document.getElementById("planList");
  if(!state.plans.length){el.innerHTML=`<div class="empty" style="padding:18px 4px">Nenhum plano ainda.</div>`;return;}
  let h="";state.plans.forEach(p=>{h+=(p.tipo==="viagem"&&p.versoes)?renderViagem(p):renderSimple(p);});
  el.innerHTML=h;
}
function renderSimple(p){
  const parc=num(p.valor)/(p.parcelas||1);const ic=p.tipo==="compra"?"🛍️":"◇";
  return `<div class="plan ${p.ativo?'':'off'}"><div class="ph"><div><div class="ttl">${ic} ${p.titulo}</div><div class="tag">${p.parcelas}x · início ${monthShort(p.inicio||mes)}</div></div><div class="total">${fmt0(num(p.valor))}<small>${fmt0(parc)}/mês</small></div></div><div class="impact">Pesa <b>${fmt0(parc)}</b>/mês de <b>${monthShort(p.inicio||mes)}</b> a <b>${monthShort(addMonths(p.inicio||mes,(p.parcelas||1)-1))}</b>.</div><div class="pacts"><button class="${p.ativo?'on-b':''}" data-toggle="${p.id}">${p.ativo?'Ativo na previsão':'Pausado'}</button><button data-realizar="${p.id}">Realizar</button><button data-delp="${p.id}">Remover</button></div></div>`;
}
function renderViagem(p){
  const vi=p.versaoAtiva||0;const v=p.versoes[vi]||{};
  const rt=(v.roteiro||[]).reduce((s,x)=>s+num(x.custo),0);
  const cx=(v.caixa||[]).reduce((s,x)=>s+num(x.valor),0);
  const total=rt+cx;const parc=total/(v.parcelas||1);
  const pills=p.versoes.map((ver,i)=>`<button class="vpill ${i===vi?'on':''}" data-ver="${p.id}:${i}">${ver.nome}<small>${fmt0(verTotal(ver))}</small></button>`).join("");
  let rrows=(v.roteiro||[]).map(s=>`<tr><td class="dia">${s.dia}</td><td>${s.atividade}</td><td class="num">${fmt0(s.custo)}</td><td><button class="trash" data-delstep="${p.id}:${s.id}">×</button></td></tr>`).join("");
  if(!rrows)rrows='<tr><td colspan="4" class="vempty">Sem etapas. Toque em "+ etapa" para montar o roteiro.</td></tr>';
  let crows=(v.caixa||[]).map(c=>`<tr><td>${c.item}</td><td class="num">${fmt0(c.valor)}</td><td><button class="trash" data-delcx="${p.id}:${c.id}">×</button></td></tr>`).join("");
  if(!crows)crows='<tr><td colspan="3" class="vempty">Sem itens no caixa ainda.</td></tr>';
  return `<div class="vtrip ${p.ativo?'':'off'}">
    <div class="vth"><div><div class="vtt">✈️ ${p.titulo}</div><div class="vsub">${v.parcelas||1}x · início ${monthShort(v.inicio||mes)}</div></div><div class="vtotal">${fmt0(total)}<small>${fmt0(parc)}/mês</small></div></div>
    <div class="vversions">${pills}<button class="vnew" data-vnew="${p.id}">+ versão</button></div>
    <div class="vsection">📅 Roteiro dia a dia</div>
    <table class="vtable"><thead><tr><th>Dia</th><th>Atividade</th><th>Custo</th><th></th></tr></thead><tbody>${rrows}</tbody><tfoot><tr><td colspan="2">Subtotal roteiro</td><td class="num">${fmt0(rt)}</td><td></td></tr></tfoot></table>
    <button class="addmini" data-step="${p.id}">+ etapa do roteiro</button>
    <div class="vsection">📒 Livro-caixa (complementar)</div>
    <table class="vtable"><thead><tr><th>Item</th><th>Valor</th><th></th></tr></thead><tbody>${crows}</tbody><tfoot><tr><td>Subtotal caixa</td><td class="num">${fmt0(cx)}</td><td></td></tr></tfoot></table>
    <button class="addmini" data-cx="${p.id}">+ item do caixa</button>
    <div class="vgrand"><span>Total da versão "${v.nome}"</span><b>${fmt0(total)}</b></div>
    <div class="pacts"><button class="${p.ativo?'on-b':''}" data-toggle="${p.id}">${p.ativo?'Ativo na previsão':'Pausado'}</button><button data-realizar="${p.id}">Realizar</button><button data-delp="${p.id}">Remover viagem</button></div>
  </div>`;
}

/* ===== DESAFIOS ===== */
const NIVEIS=[["Iniciante",0],["Organizado",100],["Planejador",300],["Investidor",600],["Independente",1000],["Livre",1500]];
function nivelDe(s){let n=NIVEIS[0];NIVEIS.forEach(x=>{if(s>=x[1])n=x;});return n;}
function metaCtx(){
  const inc=incomeOf(mes),free=incomeOf(mes)-spendOf(mes)-cardLoad(mes);
  const aporteNYC=(()=>{const p=state.plans.find(x=>x.tipo==="viagem"&&x.ativo);if(!p)return 0;const inf=planInfo(p);return inf.total/inf.parcelas;})();
  return {inc,free,aporteNYC};
}
function dividaOutstanding(k){
  let t=0;
  state.cards.forEach(c=>{const end=addMonths(c.inicio,c.parcelas-1);if(cmp(k,end)<=0){const from=cmp(k,c.inicio)>=0?k:c.inicio;const n=monthDiff(from,end)+1;if(n>0)t+=num(c.valor)*n;}});
  (state.game.consignados||[]).forEach(c=>{if(c.quitado||!c.fim)return;if(cmp(k,c.fim)<=0){const n=monthDiff(k,c.fim)+1;if(n>0)t+=num(c.valor)*n;}});
  return t;
}
/* Cards de desafio (catálogo) */
const CHALLENGES={
  passaporte:{nome:"Passaporte Financeiro — NY",ic:"✈️",fn:(g)=>{
    const guard=g.passaporte*250,meta=30000,pct=Math.round(guard/meta*100);
    let cells="";for(let i=0;i<120;i++)cells+=`<div class="cell ${i<g.passaporte?'f':''}" data-cell="${i}"></div>`;
    return `<div class="quest"><div class="qh"><span class="ic">✈️</span><span class="qt">Passaporte Financeiro — Nova York</span></div><div class="qsub">120 células de R$ 250. Cada vez que guardar, marque uma célula.</div><div class="bar"><i style="width:${pct}%"></i></div><div class="qmeta"><span>Guardado <b>${fmt0(guard)}</b></span><span>Falta <b>${fmt0(meta-guard)}</b></span><span><b>${pct}%</b></span></div><div class="passport">${cells}</div><div class="stepper"><button data-pp="-1">− célula</button><button class="go" data-pp="1">+ R$ 250</button></div></div>`;}},
  liberar:{nome:"Liberar Renda (consignados)",ic:"🔓",fn:(g,ctx)=>{
    const presa=g.consignados.filter(c=>!c.quitado).reduce((s,c)=>s+c.valor,0);
    const livre=g.consignados.filter(c=>c.quitado).reduce((s,c)=>s+c.valor,0);
    let debts="";g.consignados.forEach(c=>{debts+=`<div class="debt ${c.quitado?'done':''}"><span class="dot"></span><div class="dn">${c.nome}<small>${c.quitado?'quitado — renda liberada':'parcela mensal'}</small></div><span class="dv">${fmt0(c.valor)}</span><button data-cons="${c.id}">${c.quitado?'✓':'Quitar'}</button></div>`;});
    return `<div class="quest"><div class="qh"><span class="ic">🔓</span><span class="qt">Liberar Renda</span></div><div class="qsub">Quando os três consignados caírem, sua renda salta para <b>${fmt0(ctx.inc+presa)}</b>.</div>${debts}<div class="libpanel"><div class="presa"><div class="lbl">Renda presa</div><div class="n" style="color:var(--neg)">${fmt0(presa)}</div></div><div class="livre"><div class="lbl">Renda liberada</div><div class="n" style="color:var(--pos)">${fmt0(livre)}</div></div></div></div>`;}},
  cheque:{nome:"Quitar o Cheque Especial",ic:"⛓️",fn:(g)=>{
    const chPct=Math.min(100,Math.round(g.cheque.pago/g.cheque.meta*100));
    return `<div class="quest"><div class="qh"><span class="ic">⛓️</span><span class="qt">Quitar o Cheque Especial</span></div><div class="qsub">Saldo negativo no BB: ${fmt0(g.cheque.meta)}. Registre o quanto abateu.</div><div class="bar"><i style="width:${chPct}%;background:linear-gradient(90deg,var(--neg),var(--gold))"></i></div><div class="qmeta"><span>Abatido <b>${fmt0(g.cheque.pago)}</b></span><span>Resta <b>${fmt0(g.cheque.meta-g.cheque.pago)}</b></span></div><div class="stepper"><button data-ch="-100">− R$ 100</button><button data-ch="-500">− R$ 500</button><button class="go" data-ch="-100000">Quitado!</button></div></div>`;}},
  comprar:{nome:"Posso comprar isso?",ic:"🛒",fn:(g,ctx)=>{
    return `<div class="quest calc"><div class="qh"><span class="ic">🛒</span><span class="qt">Posso comprar isso?</span></div><div class="qsub">Saldo livre previsto: <b>${fmt0(ctx.free)}</b> · meta NY exige <b>${fmt0(ctx.aporteNYC)}</b>/mês.</div><input id="buyVal" inputmode="decimal" placeholder="Valor da compra (R$)"><button class="btn" id="buyBtn" style="margin-top:10px">Avaliar impacto</button><div class="verdict" id="buyVerdict"></div><div class="zhint"><span class="zg">🟢 até ${fmt0(Math.max(0,ctx.free-ctx.aporteNYC)*0.4)}</span><span class="zy">🟡 até ${fmt0(Math.max(0,ctx.free-ctx.aporteNYC))}</span><span class="zr">🔴 acima</span></div></div>`;}},
  semcartao:{nome:"30 dias sem crédito",ic:"🚫",fn:(g)=>{
    const dias=g.semCartao.filter(Boolean).length;let daysH="";g.semCartao.forEach((on,i)=>{daysH+=`<div class="day ${on?'on':''}" data-day="${i}">${i+1}</div>`;});
    return `<div class="quest"><div class="qh"><span class="ic">🚫</span><span class="qt">30 dias sem crédito</span></div><div class="qsub">Sem parcelar, sem crédito, sem PIX crédito. ${dias>=30?'🏅 Missão concluída!':`${dias}/30 dias`}</div><div class="daygrid">${daysH}</div></div>`;}},
  semcheque:{nome:"Conta no positivo",ic:"📈",fn:(g)=>{
    const mc=g.semCheque;return `<div class="quest"><div class="qh"><span class="ic">📈</span><span class="qt">Conta no positivo</span></div><div class="qsub">Dias seguidos sem entrar no cheque especial: <b>${mc}</b>.</div><div class="stepper"><button data-sch="-1">−1 dia</button><button class="go" data-sch="1">+1 dia</button><button data-sch="0">zerar</button></div><div class="medals"><div class="medal ${mc>=30?'win':''}"><div class="em">🥉</div><div class="ml">30 dias</div></div><div class="medal ${mc>=60?'win':''}"><div class="em">🥈</div><div class="ml">60 dias</div></div><div class="medal ${mc>=90?'win':''}"><div class="em">🥇</div><div class="ml">90 dias</div></div></div></div>`;}},
  score:{nome:"Score Financeiro",ic:"⭐",fn:(g)=>{
    const nv=nivelDe(g.score);return `<div class="quest"><div class="qh"><span class="ic">⭐</span><span class="qt">Score Financeiro</span></div><div class="scorebig">${g.score}</div><div class="level">${nv[0]}</div><div class="ladder">${NIVEIS.map(n=>`<span class="${n[0]===nv[0]?'now':''}">${n[0]}</span>`).join("")}</div><div class="scoreacts"><button data-pts="10">Registrei despesas <b>+10</b></button><button data-pts="20">Mês positivo <b>+20</b></button><button data-pts="30">Aportei p/ NY <b>+30</b></button><button data-pts="50">Quitei dívida <b>+50</b></button><button data-pts="100" style="grid-column:1/3">Mês sem cheque especial <b>+100</b></button></div></div>`;}},
  central:{nome:"Central de Economias",ic:"🌱",fn:(g)=>{
    const eco=g.habitos.filter(h=>h.feito).reduce((s,h)=>s+h.eco,0);let habH="";g.habitos.forEach(h=>{habH+=`<div class="habit ${h.feito?'on':''}" data-hab="${h.id}"><div class="box">✓</div><div class="ht">${h.txt}</div><div class="he">${h.eco?fmt0(h.eco):''}</div></div>`;});
    return `<div class="quest"><div class="qh"><span class="ic">🌱</span><span class="qt">Central de Economias</span></div><div class="qsub">Hábitos atômicos: 1% melhor por dia. Economia estimada do mês: <b style="color:var(--pos)">${fmt0(eco)}</b></div>${habH}</div>`;}}
};

function renderMetas(){renderEvolucao();renderMetasPainel();renderBoard();renderLinhaTempo();}

function evoSvg(series,w,h){
  const all=series.flatMap(s=>s.vals);
  let mn=Math.min(0,...all),mx=Math.max(...all,1);const pad=(mx-mn)*0.1||1;mn-=pad;mx+=pad;
  const X=i=>(i/11)*w, Y=v=>h-((v-mn)/(mx-mn))*h;
  let svg=`<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block">`;
  if(mn<0&&mx>0){const zy=Y(0).toFixed(1);svg+=`<line x1="0" y1="${zy}" x2="${w}" y2="${zy}" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="3 3"/>`;}
  series.forEach(s=>{const pts=s.vals.map((v,i)=>`${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    if(s.fill)svg+=`<polygon points="0,${h} ${pts} ${w},${h}" fill="${s.fill}"/>`;
    svg+=`<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`;});
  series.forEach(s=>{const i=11;svg+=`<circle cx="${X(i).toFixed(1)}" cy="${Y(s.vals[i]).toFixed(1)}" r="3.4" fill="${s.color}" stroke="var(--paper)" stroke-width="1.5"/>`;});
  return svg+`</svg>`;
}
function renderEvolucao(){
  const el=document.getElementById("evolucao");
  const mns=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const ks=mns.map((_,i)=>anoSel+"-"+pad(i+1));
  const base=num(state.game.patrimonioBase||0);let saldoAcc=0,invAcc=0;
  const patr=[],div=[],inv=[],sal=[];
  ks.forEach(k=>{saldoAcc+=freeOf(k);invAcc+=investOf(k);div.push(dividaOutstanding(k));sal.push(saldoAcc);inv.push(invAcc);patr.push(base+saldoAcc+invAcc);});
  const COL={patr:'var(--brass)',inv:'#2f6f4e',div:'#a8412f'};
  function delta(arr,goodUp){const d=arr[11]-arr[0];const cls=d===0?'flat':((d>0)===goodUp?'up':'down');return `<div class="sd ${cls}">${d>0?'+':''}${fmtK(d)} no ano</div>`;}
  function stat(lbl,col,val,deltaHtml){return `<div class="evostat"><div class="sl"><i style="background:${col}"></i>${lbl}</div><div class="sv">${fmt0(val)}</div>${deltaHtml}</div>`;}
  let h=`<div class="evo"><div class="evohd"><span class="vsection" style="margin:0">📈 Evolução financeira</span><span class="yearpick"><button data-anom="-1">‹</button><b>${anoSel}</b><button data-anom="1">›</button></span></div>`;
  h+=`<div class="evostats">`;
  h+=stat("Patrimônio",COL.patr,patr[11],delta(patr,true));
  h+=stat("Investido",COL.inv,inv[11],delta(inv,true));
  h+=stat("Dívidas",COL.div,div[11],delta(div,false));
  h+=stat("Saldo acum.","var(--ink)",sal[11],delta(sal,true));
  h+=`</div>`;
  h+=`<div class="evochart">${evoSvg([
    {vals:patr,color:COL.patr,fill:'rgba(154,123,63,.14)'},
    {vals:inv,color:COL.inv},
    {vals:div,color:COL.div}
  ],660,150)}</div>`;
  h+=`<div class="evoxax">`+mns.map((m,i)=>`<span>${i%2===0?m:''}</span>`).join('')+`</div>`;
  h+=`<div class="evolegend"><span><i style="background:${COL.patr}"></i>Patrimônio</span><span><i style="background:${COL.inv}"></i>Investido</span><span><i style="background:${COL.div}"></i>Dívidas</span></div>`;
  function row(lbl,arr,cls){let r=`<tr class="${cls||''}"><td>${lbl}</td>`;arr.forEach(v=>{r+=`<td class="${v<0?'neg-c':''}" title="${fmt0(v)}">${fmtK(v)}</td>`;});return r+"</tr>";}
  h+=`<details class="evodet"><summary>Ver mês a mês</summary><div class="annual"><table><thead><tr><th>Mês</th>`;
  mns.forEach(m=>h+=`<th>${m}</th>`);h+=`</tr></thead><tbody>`;
  h+=row("Patrimônio",patr,"tot")+row("Dívidas",div)+row("Investido",inv)+row("Saldo acum.",sal,"tot");
  h+=`</tbody></table></div></details></div>`;
  el.innerHTML=h;
}

function monthsUntil(d){if(!d)return 0;const t=new Date();const p=d.split("-").map(Number);return Math.max(0,(p[0]-t.getFullYear())*12+(p[1]-1-t.getMonth()));}
function fmtBr(d){if(!d)return"—";const p=d.split("-");return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:"—";}
function renderMetasPainel(){
  const el=document.getElementById("metasPainel");const g=state.game;
  const metas=[
    {h:"curto",nome:"Quitar cheque especial",cat:"Dívida",alvo:num(g.cheque.meta),guard:num(g.cheque.pago),prazo:"2026-06-30"},
    {h:"curto",nome:"Reserva inicial (1 mês)",cat:"Reserva",alvo:Math.round(spendOf(mes))||3000,guard:num(g.reservaGuardado||0),prazo:"2026-09-30"},
    {h:"longo",nome:"Nova York 2026",cat:"Viagem",alvo:30000,guard:g.passaporte*250,prazo:"2026-12-18"},
    {h:"longo",nome:"Reserva de emergência",cat:"Reserva",alvo:15000,guard:num(g.reservaGuardado||0),prazo:"2027-06-01"},
    {h:"longo",nome:"Patrimônio",cat:"Patrimônio",alvo:100000,guard:num(g.patrimonioBase||0),prazo:"2030-12-31"}
  ];
  function tabela(h){
    let t=`<div class="ctblwrap"><table class="ctbl"><thead><tr><th>Meta</th><th>Categoria</th><th class="num">Valor alvo</th><th class="num">Guardado</th><th class="num">Faltante</th><th>Prazo</th><th class="num">Meses</th><th class="num">Aporte/mês</th><th>Progresso</th></tr></thead><tbody>`;
    const rows=metas.filter(m=>m.h===h);
    if(!rows.length)t+=`<tr><td colspan="9" class="cempty">Sem metas.</td></tr>`;
    rows.forEach(m=>{const falta=Math.max(0,m.alvo-m.guard);const mr=monthsUntil(m.prazo);const aporte=falta/Math.max(1,mr);const pct=m.alvo?Math.min(100,Math.round(m.guard/m.alvo*100)):0;
      t+=`<tr><td>${m.nome}</td><td>${m.cat}</td><td class="num">${fmt0(m.alvo)}</td><td class="num">${fmt0(m.guard)}</td><td class="num">${fmt0(falta)}</td><td>${fmtBr(m.prazo)}</td><td class="num">${mr}</td><td class="num">${fmt0(aporte)}</td><td><div class="pwrap"><div class="pbar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div></td></tr>`;});
    return t+`</tbody></table></div>`;
  }
  let h=`<div class="vsection">🎯 Metas, reserva e viagens</div><p class="intro" style="margin:0 2px 6px">Metas com faltante, prazo, aporte necessário e progresso.</p>`;
  h+=`<div class="mlabel">Curto prazo</div>`+tabela("curto");
  h+=`<div class="mlabel">Longo prazo</div>`+tabela("longo");
  el.innerHTML=h;
}

function renderBoard(){
  const el=document.getElementById("board");const g=state.game;const ctx=metaCtx();
  let h=`<div class="vsection">🎮 Board de desafios</div>`;
  if(!g.board.length)h+=`<div class="empty" style="padding:14px 4px">Board vazia. Toque em "+ adicionar desafio" para trazer um card.</div>`;
  else g.board.forEach(id=>{const c=CHALLENGES[id];if(!c)return;h+=`<div class="boardcard">${c.fn(g,ctx)}<button class="rmboard" data-rmboard="${id}">×</button></div>`;});
  el.innerHTML=h;
}

function renderLinhaTempo(){
  const el=document.getElementById("linhaTempo");
  const mns=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const ks=mns.map((_,i)=>anoSel+"-"+pad(i+1));
  const consTot=state.game.consignados.filter(c=>!c.quitado).reduce((s,c)=>s+c.valor,0);
  function row(lbl,fn,cls){let r=`<tr class="${cls||''}"><td>${lbl}</td>`;ks.forEach(k=>{const v=fn(k);r+=`<td class="${v<0?'neg-c':''}" title="${fmt0(v)}">${fmtK(v)}</td>`;});return r+"</tr>";}
  let h=`<div class="yearbar"><span class="vsection" style="margin:0">🧭 Linha do tempo financeira</span><span class="yearpick"><button data-anom="-1">‹</button><b>${anoSel}</b><button data-anom="1">›</button></span></div>`;
  h+=`<div class="annual"><table><thead><tr><th>${anoSel}</th>`;
  mns.forEach(m=>h+=`<th>${m}</th>`);h+=`</tr></thead><tbody>`;
  h+=row("Consignados",()=>consTot);
  h+=row("Cartões",k=>cardLoad(k));
  h+=row("Meta NYC",k=>planLoad(k));
  h+=row("Sobra",k=>freeOf(k),"tot");
  h+=`</tbody></table></div><p class="intro" style="margin-top:8px">Quando os compromissos terminam, a Sobra cresce — é o momento em que você recupera fôlego para investir, trocar de carro ou viajar.</p>`;
  el.innerHTML=h;
}

/* ===== Render geral ===== */
function renderAll(){
  applyView();
  if(!annual)renderMes();
  renderCompromissos();renderPlanos();renderMetas();
}

/* ===== Abas ===== */
const FIN_TABS=[['mes','Mês'],['previsao','Previsão'],['planejar','Planejar'],['desafios','Metas']];
const HAB_TABS=[['habit','WeekHub'],['planejador','Planejador'],['mapa','Mapa'],['sono','Saúde']];
function paintTabs(){
  const tabs=seedWorld?SEED_WORLDS[seedWorld].tabs:(habitMode?HAB_TABS:FIN_TABS);
  const current=seedWorld?activeSeedTab:(habitMode?activeHabitTab:activeFinanceTab);
  const el=document.getElementById('mainTabs');if(el)el.innerHTML=tabs.map(([id,label],i)=>`<button class="tab" role="tab" data-tab="${id}" aria-selected="${id===current||(!current&&i===0)?'true':'false'}">${label}</button>`).join('');
}
function activateTab(id){
  document.querySelectorAll('.tab').forEach(x=>x.setAttribute('aria-selected',x.dataset.tab===id?'true':'false'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
  if(seedWorld){activeSeedTab=id;document.getElementById('p-seed').classList.add('on');renderSeed();updateHeader();return;}
  if(habitMode){activeHabitTab=id;document.getElementById('p-habit').classList.add('on');renderHabit();}
  else{activeFinanceTab=id;document.getElementById('p-'+id).classList.add('on');}
  updateHeader();
}
document.addEventListener('click',e=>{const t=e.target.closest('#mainTabs .tab');if(!t)return;activateTab(t.dataset.tab);});
const _prevM=document.getElementById("prevM");if(_prevM)_prevM.onclick=()=>{
  if(seedWorld){return;}
  if(habitMode){mes=addMonths(mes,-1);anoSel=parseInt(mes);renderHabit();updateHeader();return;}
  if(annual){anoSel--;renderAll();return;}
  mes=addMonths(mes,-1);anoSel=parseInt(mes);renderAll();};
const _nextM=document.getElementById("nextM");if(_nextM)_nextM.onclick=()=>{
  if(seedWorld){return;}
  if(habitMode){mes=addMonths(mes,1);anoSel=parseInt(mes);renderHabit();updateHeader();return;}
  if(annual){anoSel++;renderAll();return;}
  mes=addMonths(mes,1);anoSel=parseInt(mes);renderAll();};
const _viewTog=document.getElementById("viewTog");if(_viewTog)_viewTog.onclick=()=>{annual=!annual;activateTab("mes");renderAll();};

/* ===== Modais ===== */
function openModal(id){document.getElementById(id).classList.add("on");}
function closeModals(){document.querySelectorAll(".modal").forEach(m=>m.classList.remove("on"));}
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeModals));
let entryTipo="entrada";
function fillSubSelect(){
  const sel=document.getElementById("enSub");const grupos=TAX[entryTipo].grupos;let h="";
  Object.keys(grupos).forEach(g=>{h+=`<optgroup label="${g}">`;grupos[g].forEach((s,i)=>{h+=`<option value="${g}|${s}">${s}</option>`;});h+=`</optgroup>`;});
  sel.innerHTML=h;
  const isInv=entryTipo==="investimento",isRec=entryTipo==="entrada";
  document.getElementById("statusWrap").style.display=isInv?"block":"none";
  document.getElementById("dRealWrap").style.display=isInv?"none":"block";
  document.getElementById("lblDPrev").textContent=(!isRec&&!isInv)?"Vencimento":"Data prevista";
  document.getElementById("lblDReal").textContent=isRec?"Data de recebimento":"Data de pagamento";
  document.getElementById("lblPrev").textContent=isInv?"Aporte previsto (R$)":"Valor previsto (R$)";
  document.getElementById("lblEfet").textContent=isInv?"Aporte realizado (R$)":"Valor efetivo (R$)";
}
document.querySelectorAll("#entrySeg button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#entrySeg button").forEach(x=>x.classList.remove("on"));b.classList.add("on");entryTipo=b.dataset.tipo;fillSubSelect();});
function openEntry(t){entryTipo=t||"entrada";document.querySelectorAll("#entrySeg button").forEach(x=>x.classList.toggle("on",x.dataset.tipo===entryTipo));fillSubSelect();["enVal","enEfet","enMeio","enDPrev","enDReal","enDesc"].forEach(i=>document.getElementById(i).value="");document.getElementById("enStatus").value="Previsto";document.getElementById("enRec").checked=false;openModal("entryModal");}
document.getElementById("enSave").onclick=()=>{const v=num(document.getElementById("enVal").value);if(!v)return;const[grupo,sub]=(document.getElementById("enSub").value||"|").split("|");
  const efetRaw=document.getElementById("enEfet").value.trim();const efet=efetRaw?num(efetRaw):null;const isInv=entryTipo==="investimento";
  state.entries.push({id:uid(),tipo:entryTipo,mes,valor:v,prev:v,efet,descricao:document.getElementById("enDesc").value.trim()||null,meio:document.getElementById("enMeio").value.trim()||null,dPrev:document.getElementById("enDPrev").value||null,dReal:isInv?null:(document.getElementById("enDReal").value||null),status:isInv?document.getElementById("enStatus").value:null,recorrente:document.getElementById("enRec").checked,grupo,sub});
  save();closeModals();renderAll();};
document.getElementById("cardNew").onclick=()=>{["cdBand","cdDesc","cdVal"].forEach(i=>document.getElementById(i).value="");document.getElementById("cdParc").value="1";document.getElementById("cdIni").value=mes;openModal("cardModal");};
document.addEventListener('click',e=>{
  if(e.target.closest('#ledgerEditBtn')){ledgerEdit=true;renderLedger();return;}
  if(e.target.closest('#ledgerCancel')){ledgerEdit=false;renderLedger();return;}
  if(e.target.closest('#ledgerSave')){
    document.querySelectorAll('#secEntradas .celledit').forEach(inp=>{
      const en=state.entries.find(x=>x.id===inp.dataset.eid);if(!en)return;
      const f=inp.dataset.f,v=inp.value;
      if(f==='descricao')en.descricao=v.trim()||null;
      else if(f==='prev'){const n=num(v);en.prev=n;en.valor=n;}
      else if(f==='efet'){const t=String(v).trim();en.efet=t===''?null:num(t);}
    });
    ledgerEdit=false;save();renderAll();return;
  }
});
document.getElementById("cdSave").onclick=()=>{const v=num(document.getElementById("cdVal").value);const p=parseInt(document.getElementById("cdParc").value)||1;if(!v)return;state.cards.push({id:uid(),bandeira:document.getElementById("cdBand").value.trim(),descricao:document.getElementById("cdDesc").value.trim(),valor:v,parcelas:p,inicio:document.getElementById("cdIni").value||mes});save();closeModals();renderAll();};
function fillPlanSub(){
  const sel=document.getElementById("plSub");let h="";
  [["variável",TAX.variavel.grupos],["eventual",TAX.anual.grupos]].forEach(([lbl,grupos])=>{
    Object.keys(grupos).forEach(gr=>{h+=`<optgroup label="${gr} · ${lbl}">`;grupos[gr].forEach(s=>{h+=`<option value="${gr}|${s}|${lbl==='eventual'?'anual':'variavel'}">${s}</option>`;});h+=`</optgroup>`;});
  });
  sel.innerHTML=h;
}
document.getElementById("planNew").onclick=()=>{document.getElementById("plTitulo").value="";document.getElementById("plTipo").value="viagem";document.getElementById("plValor").value="";document.getElementById("plParc").value="1";document.getElementById("plInicio").value=mes;document.getElementById("plDPrev").value="";document.getElementById("plMeio").value="";fillPlanSub();openModal("planModal");};
document.getElementById("plSave").onclick=()=>{const v=num(document.getElementById("plValor").value);const p=parseInt(document.getElementById("plParc").value)||1;const tit=document.getElementById("plTitulo").value.trim();const tipo=document.getElementById("plTipo").value;const ini=document.getElementById("plInicio").value||mes;if(!tit)return;
  const[pg,ps,pt]=(document.getElementById("plSub").value||"Outros|Outros|variavel").split("|");
  const std={grupo:pg,sub:ps,catTipo:pt,dPrev:document.getElementById("plDPrev").value||null,meio:document.getElementById("plMeio").value.trim()||null};
  if(tipo==="viagem"){state.plans.push(Object.assign({id:uid(),titulo:tit,tipo:"viagem",ativo:true,versaoAtiva:0,versoes:[{nome:"Versão 1",inicio:ini,parcelas:p,roteiro:[],caixa:v?[{id:uid(),item:"Estimativa inicial",valor:v}]:[]}]},std));}
  else{if(!v)return;state.plans.push(Object.assign({id:uid(),titulo:tit,tipo,valor:v,parcelas:p,inicio:ini,ativo:true},std));}
  save();closeModals();renderAll();};

/* Modais da viagem */
let curPlan=null;
function planById(id){return state.plans.find(p=>p.id===id);}
function realizarPlan(id){const p=planById(id);if(!p)return;const inf=planInfo(p);
  if((inf.parcelas||1)>1){state.cards.push({id:uid(),bandeira:p.meio||"Planejado",descricao:p.titulo,valor:inf.total/inf.parcelas,parcelas:inf.parcelas,inicio:mes});}
  else{state.entries.push({id:uid(),tipo:p.catTipo||"variavel",mes,valor:inf.total,prev:inf.total,efet:inf.total,dPrev:p.dPrev||null,dReal:null,meio:p.meio||null,recorrente:false,grupo:p.grupo||"Outros",sub:p.sub||p.titulo});}
  state.plans=state.plans.filter(x=>x.id!==id);save();renderAll();}
function openVer(id){curPlan=id;document.getElementById("vrNome").value="";document.getElementById("vrParc").value="6";document.getElementById("vrIni").value=mes;document.getElementById("vrCopy").checked=true;openModal("verModal");}
document.getElementById("vrSave").onclick=()=>{const p=planById(curPlan);if(!p)return;const nome=document.getElementById("vrNome").value.trim()||("Versão "+(p.versoes.length+1));const parc=parseInt(document.getElementById("vrParc").value)||1;const ini=document.getElementById("vrIni").value||mes;const copy=document.getElementById("vrCopy").checked;const cur=p.versoes[p.versaoAtiva||0]||{roteiro:[],caixa:[]};
  const nova={nome,inicio:ini,parcelas:parc,roteiro:copy?cur.roteiro.map(s=>({...s,id:uid()})):[],caixa:copy?cur.caixa.map(c=>({...c,id:uid()})):[]};
  p.versoes.push(nova);p.versaoAtiva=p.versoes.length-1;save();closeModals();renderAll();};
function openStep(id){curPlan=id;document.getElementById("stDia").value="1";document.getElementById("stAtiv").value="";document.getElementById("stCusto").value="";openModal("stepModal");}
document.getElementById("stSave").onclick=()=>{const p=planById(curPlan);if(!p)return;const v=p.versoes[p.versaoAtiva||0];if(!document.getElementById("stAtiv").value.trim())return;(v.roteiro=v.roteiro||[]).push({id:uid(),dia:parseInt(document.getElementById("stDia").value)||1,atividade:document.getElementById("stAtiv").value.trim(),custo:num(document.getElementById("stCusto").value)});v.roteiro.sort((a,b)=>a.dia-b.dia);save();closeModals();renderAll();};
function openCaixa(id){curPlan=id;document.getElementById("cxItem").value="";document.getElementById("cxValor").value="";openModal("caixaModal");}
document.getElementById("cxSave").onclick=()=>{const p=planById(curPlan);if(!p)return;const v=p.versoes[p.versaoAtiva||0];const val=num(document.getElementById("cxValor").value);if(!document.getElementById("cxItem").value.trim()||!val)return;(v.caixa=v.caixa||[]).push({id:uid(),item:document.getElementById("cxItem").value.trim(),valor:val});save();closeModals();renderAll();};
let curCons=null;
function openCons(id){curCons=id;const c=id?(state.game.consignados||[]).find(x=>x.id===id):null;document.getElementById("coNome").value=c?(c.nome||""):"";document.getElementById("coVal").value=c?String(num(c.valor)).replace(".",","):"";document.getElementById("coFim").value=(c&&c.fim)?c.fim:"";openModal("consModal");}
document.getElementById("coSave").onclick=()=>{const nome=document.getElementById("coNome").value.trim();const v=num(document.getElementById("coVal").value);const fim=document.getElementById("coFim").value||null;
  if(curCons){const c=(state.game.consignados||[]).find(x=>x.id===curCons);if(!c)return;if(nome)c.nome=nome;if(v)c.valor=v;c.fim=fim;}
  else{if(!nome&&!v)return;(state.game.consignados=state.game.consignados||[]).push({id:uid(),nome:nome||"Compromisso",valor:v,quitado:false,fim});}
  save();closeModals();renderAll();};

/* ===== Delegação ===== */
document.addEventListener("input",e=>{const fi=e.target.closest("[data-fat]");if(fi){const[i,k]=fi.dataset.fat.split(":");const v=fi.value.replace(/[^0-9]/g,"").slice(0,2);if(state.faturas&&state.faturas[i]){state.faturas[i][k]=v;save();}}});
document.addEventListener("click",e=>{
  const g=state.game;
  const add=e.target.closest("[data-add]");if(add){openEntry(add.dataset.add);return;}
  const del=e.target.closest("[data-del]");if(del){state.entries=state.entries.filter(x=>x.id!==del.dataset.del);save();renderAll();return;}
  const delc=e.target.closest("[data-delc]");if(delc){state.cards=state.cards.filter(x=>x.id!==delc.dataset.delc);save();renderAll();return;}
  const ec=e.target.closest("[data-editcons]");if(ec){openCons(ec.dataset.editcons);return;}
  const cn=e.target.closest("#consNew");if(cn){openCons(null);return;}
  const delp=e.target.closest("[data-delp]");if(delp){state.plans=state.plans.filter(x=>x.id!==delp.dataset.delp);save();renderAll();return;}
  const tg=e.target.closest("[data-toggle]");if(tg){const p=state.plans.find(x=>x.id===tg.dataset.toggle);if(p){p.ativo=!p.ativo;save();renderAll();}return;}
  const rz=e.target.closest("[data-realizar]");if(rz){realizarPlan(rz.dataset.realizar);return;}
  const ver=e.target.closest("[data-ver]");if(ver){const[id,i]=ver.dataset.ver.split(":");const p=planById(id);if(p){p.versaoAtiva=parseInt(i);save();renderAll();}return;}
  const vnew=e.target.closest("[data-vnew]");if(vnew){openVer(vnew.dataset.vnew);return;}
  const stp=e.target.closest("[data-step]");if(stp){openStep(stp.dataset.step);return;}
  const cxb=e.target.closest("[data-cx]");if(cxb){openCaixa(cxb.dataset.cx);return;}
  const dst=e.target.closest("[data-delstep]");if(dst){const[id,sid]=dst.dataset.delstep.split(":");const p=planById(id);if(p){const v=p.versoes[p.versaoAtiva||0];v.roteiro=v.roteiro.filter(x=>x.id!==sid);save();renderAll();}return;}
  const dcx=e.target.closest("[data-delcx]");if(dcx){const[id,cid]=dcx.dataset.delcx.split(":");const p=planById(id);if(p){const v=p.versoes[p.versaoAtiva||0];v.caixa=v.caixa.filter(x=>x.id!==cid);save();renderAll();}return;}
  // desafios
  const pp=e.target.closest("[data-pp]");if(pp){g.passaporte=Math.max(0,Math.min(120,g.passaporte+parseInt(pp.dataset.pp)));save();renderMetas();return;}
  const cell=e.target.closest("[data-cell]");if(cell){g.passaporte=parseInt(cell.dataset.cell)+1;save();renderMetas();return;}
  const cons=e.target.closest("[data-cons]");if(cons){const c=g.consignados.find(x=>x.id===cons.dataset.cons);if(c){c.quitado=!c.quitado;save();renderMetas();}return;}
  const ch=e.target.closest("[data-ch]");if(ch){const d=parseInt(ch.dataset.ch);g.cheque.pago=Math.max(0,Math.min(g.cheque.meta,d===-100000?g.cheque.meta:g.cheque.pago-d));save();renderMetas();return;}
  const day=e.target.closest("[data-day]");if(day){const i=parseInt(day.dataset.day);g.semCartao[i]=!g.semCartao[i];save();renderMetas();return;}
  const sch=e.target.closest("[data-sch]");if(sch){const d=parseInt(sch.dataset.sch);g.semCheque=d===0?0:Math.max(0,g.semCheque+d);save();renderMetas();return;}
  const pts=e.target.closest("[data-pts]");if(pts){g.score+=parseInt(pts.dataset.pts);save();renderMetas();return;}
  const hab=e.target.closest("[data-hab]");if(hab){const h=g.habitos.find(x=>x.id===hab.dataset.hab);if(h){h.feito=!h.feito;save();renderMetas();}return;}
  const add2=e.target.closest("#addDesafio");if(add2){openDesafioPicker();return;}
  const rmb=e.target.closest("[data-rmboard]");if(rmb){g.board=g.board.filter(x=>x!==rmb.dataset.rmboard);save();renderMetas();return;}
  const pick=e.target.closest("[data-pick]");if(pick){const id=pick.dataset.pick;if(!g.board.includes(id))g.board.push(id);save();renderMetas();buildDesafioPicker();return;}
  const am=e.target.closest("[data-anom]");if(am){anoSel+=parseInt(am.dataset.anom);renderAnual();renderMetas();return;}
  const ct=e.target.closest("#catTog");if(ct){catOpen=!catOpen;renderCategorias();return;}
  const bb=e.target.closest("#buyBtn");if(bb){evalBuy();return;}
});
function buildDesafioPicker(){
  const g=state.game;
  document.getElementById("desafioPicker").innerHTML=Object.keys(CHALLENGES).map(id=>{const c=CHALLENGES[id];const has=g.board.includes(id);
    return `<div class="pickitem ${has?'has':''}"><span class="pic">${c.ic}</span><span class="pn">${c.nome}</span><button data-pick="${id}">${has?'na board ✓':'adicionar'}</button></div>`;}).join("");
}
function openDesafioPicker(){buildDesafioPicker();openModal("desafioModal");}
function evalBuy(){
  const v=num(document.getElementById("buyVal").value);const out=document.getElementById("buyVerdict");
  const free=incomeOf(mes)-spendOf(mes)-cardLoad(mes);
  const p=state.plans.find(x=>x.tipo==="viagem"&&x.ativo);const aporte=p?(()=>{const inf=planInfo(p);return inf.total/inf.parcelas;})():0;
  const folga=Math.max(0,free-aporte);
  if(!v){out.className="verdict";return;}
  out.classList.add("show");
  if(v<=folga*0.4){out.className="verdict show g";out.innerHTML=`🟢 <b>Pode comprar.</b> Cabe sem atrapalhar o aporte de Nova York. Sobram ${fmt0(folga-v)} de folga.`;}
  else if(v<=folga){out.className="verdict show y";out.innerHTML=`🟡 <b>Dá, mas atenção.</b> Come boa parte da sua folga do mês. Depois dela restam ${fmt0(folga-v)}.`;}
  else{out.className="verdict show r";out.innerHTML=`🔴 <b>Compromete a viagem.</b> Passa da sua folga (${fmt0(folga)}). Para comprar, você atrasaria o aporte de Nova York em ~${(v/Math.max(1,aporte)).toFixed(1)} mês(es).`;}
}

/* ===== Habit tracker (lado girado) ===== */
function hesc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function defaultsHabit(h){
  h=h||{};
  if(!h.daily)h.daily=[
    {id:uid(),name:"Beber 2,5L de água",goal:31},
    {id:uid(),name:"Treino de 30 min",goal:20},
    {id:uid(),name:"Dormir 8 horas",goal:31},
    {id:uid(),name:"5 porções de frutas e vegetais",goal:31},
    {id:uid(),name:"Meditar 15 min",goal:30},
    {id:uid(),name:"Ler 20 páginas",goal:20},
    {id:uid(),name:"2h de trabalho focado",goal:25},
    {id:uid(),name:"Caminhar 10 min",goal:24},
    {id:uid(),name:"1h sem telas",goal:24}];
  if(!h.weekly)h.weekly=[
    {id:uid(),name:"Planejar as refeições"},
    {id:uid(),name:"Treinos da semana"},
    {id:uid(),name:"Lista de tarefas"},
    {id:uid(),name:"Faxina semanal"},
    {id:uid(),name:"Revisar metas"}];
  if(!h.marks)h.marks={};
  if(!h.wmarks)h.wmarks={};
  if(h.notes==null)h.notes="";
  if(!h.qnotes)h.qnotes=[];
  if(!h.todos)h.todos=[];
  if(!h.closet)h.closet=[
    {id:uid(),name:'Camisas & camisetas',ic:'👕',hint:'tops do dia a dia',items:[]},
    {id:uid(),name:'Calças & shorts',ic:'👖',hint:'partes de baixo',items:[]},
    {id:uid(),name:'Calçados',ic:'👟',hint:'tênis, sapatos, botas',items:[]},
    {id:uid(),name:'Acessórios',ic:'🧢',hint:'bonés, óculos, relógios',items:[]}];
  if(!h.pertences)h.pertences=[];
  if(!h.bagMap)h.bagMap=[
    {id:uid(),name:'Mochila / bolsa',ic:'🎒',hint:'o que levo comigo',items:[]},
    {id:uid(),name:'Bolso / carteira',ic:'👛',hint:'essenciais do bolso',items:[]}];
  if(!h.consumoMap)h.consumoMap=[
    {id:uid(),name:'Suplementos',ic:'💊',hint:'vitaminas e suplementos',items:[]},
    {id:uid(),name:'Reposições',ic:'🔁',hint:'o que acaba e precisa repor',items:[]}];
  if(!h.cart)h.cart=[];
  if(!h.rhythm)h.rhythm={
    coverage:{work:6,nutrition:5,movement:3,relations:2,space:3,rest:6,mind:4},
    weak:['','',''],
    checks:[false,false,false,false,false,false],
    correction:'',
    themes:{seg:{t:'Planejamento + foco',d:'Trabalho profundo + organização'},ter:{t:'Produção',d:'Execução e avanço real'},qua:{t:'Comunicação',d:'Relações e alinhamentos'},qui:{t:'Execução admin.',d:'Tarefas e manutenção'},sex:{t:'Fechamento',d:'Review e encerramento'},sab:{t:'Casa + relações',d:'Espaço, movimento e presença'},dom:{t:'Descanso + reset',d:'Recuperação e preparação leve'}}
  };
  if(!h.qcats)h.qcats=[
    {id:'ideia',name:'Ideia',color:'#9a7b3f'},
    {id:'tarefa',name:'Tarefa',color:'#2f6f4e'},
    {id:'lembrete',name:'Lembrete',color:'#b4521c'},
    {id:'compra',name:'Compra',color:'#7a5cab'},
    {id:'estudo',name:'Estudo',color:'#3a6ea5'}];
  if(!h.weekPlan)h.weekPlan={};
  if(!h.monthPlan)h.monthPlan={};
  if(!h.retomadas)h.retomadas=[
    {id:uid(),ctx:'trabalho',title:'Voto pendente — processo destacado',next:'Reler o relatório e marcar os pontos controvertidos',ts:Date.now()-18e6},
    {id:uid(),ctx:'dev',title:'Deprecata — ajuste de release',next:'Abrir o PR e revisar os testes que falharam',ts:Date.now()-108e6},
    {id:uid(),ctx:'rpg',title:'Campanha — próximo arco',next:'Esboçar o gancho do vilão e 3 NPCs',ts:Date.now()-252e6}];
  if(!h.inbox)h.inbox=[
    {id:uid(),txt:'Ver se a passagem pra NY tá com preço bom',ts:Date.now()-24e5},
    {id:uid(),txt:'Ideia de automação pro AppRegional',ts:Date.now()-72e5}];
  if(!h.projetos)h.projetos=[
    {id:uid(),name:'Deprecata',ctx:'dev',last:Date.now()-2*864e5},
    {id:uid(),name:'AppRegional',ctx:'dev',last:Date.now()-9*864e5},
    {id:uid(),name:'Campanha de RPG',ctx:'rpg',last:Date.now()-16*864e5},
    {id:uid(),name:'Planejamento NYC',ctx:'pessoal',last:Date.now()-5*864e5}];
  h.projetos.forEach(p=>{if(!p.days)p.days=[];});
  if(!h.hydration)h.hydration={};
  if(h.hydrationGoal==null)h.hydrationGoal=8;
  if(!h.sleep)h.sleep={};
  if(!h.sleepLog)h.sleepLog={};
  if(h.sleepGoal==null)h.sleepGoal=8;
  if(!h.mealPresets)h.mealPresets=[{id:uid(),name:'Café da manhã'},{id:uid(),name:'Almoço'},{id:uid(),name:'Lanche'},{id:uid(),name:'Jantar'}];
  if(!h.mealLog)h.mealLog={};
  if(h.dailySpendLimit===undefined)h.dailySpendLimit=null;
  if(!h.medications)h.medications=[{id:uid(),name:'Vitamina D',dose:'1 cápsula'}];
  if(!h.medsLog)h.medsLog={};
  if(!h.captures){
    h.captures=[];
    (h.inbox||[]).forEach(it=>h.captures.push({id:it.id||uid(),kind:'nota',txt:it.txt,cat:'ideia',area:null,goal:null,created:it.ts||Date.now(),date:null,time:null,done:false,alarm:null,fired:false}));
    (h.qnotes||[]).forEach(n=>h.captures.push({id:n.id||uid(),kind:'nota',txt:n.txt,cat:n.cat||'ideia',area:null,goal:null,created:n.ts||Date.now(),date:null,time:null,done:!!n.done,alarm:n.alarm||null,fired:!!n.fired}));
  }
  if(!h.toolsMap)h.toolsMap={
    flow:[['Ideias','Caderno / Inbox'],['Conhecimento','OneNote'],['Arquivos','Drive'],['Dados','Excel'],['Código','GitHub'],['Agenda','Calendário'],['Ação','Este app']],
    tools:[
      {id:uid(),ic:'📓',nm:'Caderno',fn:'Captura rápida e pensamento livre.',fr:'Ideias soltas · brainstorm'},
      {id:uid(),ic:'📝',nm:'OneNote',fn:'Base de conhecimento e procedimentos.',fr:'Fluxos · tutoriais · TRF3'},
      {id:uid(),ic:'📁',nm:'Drive',fn:'Arquivos e documentos finais.',fr:'PDFs · anexos · backups'},
      {id:uid(),ic:'📊',nm:'Excel',fn:'Dados, cálculos e controle.',fr:'Planilhas · números'},
      {id:uid(),ic:'🐙',nm:'GitHub',fn:'Código e versionamento.',fr:'Projetos dev · scripts'},
      {id:uid(),ic:'📅',nm:'Calendário',fn:'Compromissos inevitáveis.',fr:'Sessões · reuniões · viagens'},
      {id:uid(),ic:'✅',nm:'Este app',fn:'Orquestrador — não armazena tudo.',fr:'O que fazer · onde · onde parei'}]};
  return h;
}
const WD=['D','S','T','Q','Q','S','S'];
const LIFE_AREAS=[
  {id:'fisica',name:'Física',ic:'🪨',color:'#b4521c'},
  {id:'mental',name:'Mental',ic:'🧠',color:'#3a6ea5'},
  {id:'espiritual',name:'Espiritual',ic:'✦',color:'#7a5cab'},
  {id:'social',name:'Social',ic:'🤝',color:'#c79a3a'},
  {id:'financeira',name:'Financeira',ic:'◈',color:'#2f6f4e'},
  {id:'familiar',name:'Familiar',ic:'⌂',color:'#a8412f'},
  {id:'vocacional',name:'Vocacional',ic:'⚒',color:'#2d6a8a'}];
function defaultsAsgard(a){a=a||{};
  if(!a.areas)a.areas=LIFE_AREAS.map(x=>({...x}));
  if(!a.goals)a.goals=[
    {id:uid(),area:'fisica',title:'Recuperar a melhor forma física',why:'Energia e disposição para tudo o mais.',target:'Treino 4x/semana + 12% BF',progress:35,horizon:'2026'},
    {id:uid(),area:'vocacional',title:'Consolidar carreira na magistratura',why:'Domínio técnico e reconhecimento.',target:'Aprovação + portfólio sólido',progress:55,horizon:'2027'},
    {id:uid(),area:'financeira',title:'Independência financeira',why:'Liberdade para escolher.',target:'Reserva + patrimônio 100k',progress:20,horizon:'2030'}];
  if(a.vision==null)a.vision='';
  return a;}
function areaById(id){return (state.asgard&&state.asgard.areas||LIFE_AREAS).find(a=>a.id===id)||null;}
function goalById(id){return (state.asgard&&state.asgard.goals||[]).find(g=>g.id===id)||null;}
function defaultsSaude(s){s=s||{};
  if(!s.consultas)s.consultas=[
    {id:uid(),what:'Cardiologista — rotina',doctor:'Dr. Almeida',date:'',time:'',place:'Clínica Vita',notes:'Levar exames anteriores.'}];
  if(!s.exames)s.exames=[
    {id:uid(),name:'Hemograma completo',date:'',status:'Pendente',result:'',notes:''},
    {id:uid(),name:'Vitamina D',date:'',status:'Pendente',result:'',notes:''}];
  if(!s.treinos)s.treinos=[
    {id:uid(),name:'Treino A',focus:'Peito · Tríceps',exercises:'Supino reto 4x10\nSupino inclinado 3x12\nCrucifixo 3x15\nTríceps corda 4x12',notes:''},
    {id:uid(),name:'Treino B',focus:'Costas · Bíceps',exercises:'Barra fixa 4x máx\nRemada curvada 4x10\nPuxada frente 3x12\nRosca direta 4x12',notes:''},
    {id:uid(),name:'Treino C',focus:'Pernas · Ombro',exercises:'Agachamento 4x10\nLeg press 4x12\nCadeira extensora 3x15\nDesenvolvimento 4x10',notes:''}];
  if(!s.receitas)s.receitas=[
    {id:uid(),name:'Frango com batata-doce',servings:'2',kcal:'520',ingredients:'200g frango\n300g batata-doce\nazeite, sal, alho',steps:'Asse o frango temperado.\nCozinhe a batata-doce.\nMonte e finalize com azeite.'},
    {id:uid(),name:'Omelete proteico',servings:'1',kcal:'340',ingredients:'3 ovos\n50g queijo\nespinafre',steps:'Bata os ovos.\nLeve à frigideira com o recheio.\nDobre e sirva.'}];
  return s;}
const CV_GROUPS=[
  {g:'Assistir',ic:'🎬',cats:[['movies','Filmes / Séries'],['viral','Vídeos virais'],['cheap','Entretenimento barato']]},
  {g:'Ler',ic:'📚',cats:[['books','Livros / Autores'],['sites','Sites'],['trashy','Coisa rasteira']]},
  {g:'Ouvir',ic:'🎧',cats:[['artists','Artistas / Bandas'],['podcasts','Podcasts'],['guilty','Prazeres culposos']]}];
function defaultsCulture(c){c=c||{};if(!c.items)c.items={};CV_GROUPS.forEach(gr=>gr.cats.forEach(ct=>{if(!c.items[ct[0]])c.items[ct[0]]=[];}));if(c.notes==null)c.notes='';if(!c.refs)c.refs={blog:false,convo:false,hip:false};return c;}
const SAUDE_SCHEMA={
  consultas:{title:'Consulta',icon:'🩺',sort:'date',fields:[['what','Especialidade / Motivo','text'],['doctor','Profissional','text'],['date','Data','date'],['time','Hora','time'],['place','Local','text'],['notes','Observações','textarea']]},
  exames:{title:'Exame',icon:'🧪',sort:'date',fields:[['name','Exame','text'],['date','Data','date'],['status','Status','select:Pendente,Agendado,Feito,Com resultado'],['result','Resultado','text'],['notes','Observações','textarea']]},
  treinos:{title:'Treino',icon:'🏋️',fields:[['name','Nome (ex.: Treino A)','text'],['focus','Foco (grupos musculares)','text'],['exercises','Exercícios','textarea'],['notes','Notas','textarea']]},
  receitas:{title:'Receita',icon:'🍳',fields:[['name','Nome','text'],['servings','Porções','text'],['kcal','Calorias','text'],['ingredients','Ingredientes','textarea'],['steps','Modo de preparo','textarea']]}
};
const WKC=['#c2611f','#9a7b3f','#b4521c','#a8843a','#bd6a24','#8a7a52'];
let inboxDraft='';
const CTXS={
  trabalho:{ic:'⚖️',label:'Trabalho',cor:'#3a4a7a'},
  financas:{ic:'💰',label:'Finanças',cor:'#2f6f4e'},
  rpg:{ic:'🎲',label:'RPG',cor:'#8a3a7a'},
  dev:{ic:'💻',label:'Dev',cor:'#2d6a8a'},
  pessoal:{ic:'✈️',label:'Pessoal',cor:'#b4521c'}};
const TOOLS=[
  {ic:'📓',nm:'Caderno',fn:'Captura rápida e pensamento livre.',fr:'Ideias soltas · brainstorm'},
  {ic:'📝',nm:'OneNote',fn:'Base de conhecimento e procedimentos.',fr:'Fluxos · tutoriais · TRF3'},
  {ic:'📁',nm:'Drive',fn:'Arquivo mestre de documentos.',fr:'PDFs · modelos · planilhas'},
  {ic:'📊',nm:'Excel',fn:'Controle estruturado e quantitativo.',fr:'Finanças · indicadores'},
  {ic:'💻',nm:'GitHub',fn:'Fonte da verdade dos projetos.',fr:'Código · versões · automações'},
  {ic:'🤖',nm:'ChatGPT',fn:'Copiloto cognitivo.',fr:'Estruturar · resumir · planejar'},
  {ic:'📅',nm:'Calendário',fn:'Compromissos inevitáveis.',fr:'Sessões · reuniões · viagens'},
  {ic:'✅',nm:'Este app',fn:'Orquestrador — não armazena tudo.',fr:'O que fazer · onde · onde parei'}];
const FLOW=[['Ideias','Caderno / Inbox'],['Conhecimento','OneNote'],['Arquivos','Drive'],['Dados','Excel'],['Código','GitHub'],['Agenda','Calendário'],['Ação','Este app']];
function ctxTag(k){const c=CTXS[k]||CTXS.pessoal;return `<span class="ctx" style="background:${c.cor}"><span class="ci">${c.ic}</span>${c.label}</span>`;}
function timeAgo(ts){const s=Math.max(0,(Date.now()-ts)/1000);if(s<90)return'agora';const m=s/60;if(m<60)return Math.round(m)+' min';const h=m/60;if(h<24)return Math.round(h)+'h';const d=Math.round(h/24);return d+(d===1?' dia':' dias');}
function pickCtx(){const o=['trabalho','financas','rpg','dev','pessoal'];const n=prompt('Contexto:\n1 ⚖️ Trabalho\n2 💰 Finanças\n3 🎲 RPG\n4 💻 Dev\n5 ✈️ Pessoal','1');return o[parseInt(n)-1]||'pessoal';}
function pickDest(){const o=['Caderno','OneNote','Drive','Excel','GitHub','ChatGPT','Calendário','Virar tarefa'];const n=prompt('Mandar para onde?\n1 Caderno\n2 OneNote\n3 Drive\n4 Excel\n5 GitHub\n6 ChatGPT\n7 Calendário\n8 Virar tarefa','1');return o[parseInt(n)-1];}
function mondayOf(d){const x=new Date(d);const wd=(x.getDay()+6)%7;x.setDate(x.getDate()-wd);x.setHours(0,0,0,0);return x;}
function weekKeyOf(d){const m=mondayOf(d);return m.getFullYear()+'-'+String(m.getMonth()+1).padStart(2,'0')+'-'+String(m.getDate()).padStart(2,'0');}
function hWeeks(){const[y,m]=mes.split('-').map(Number);const dim=new Date(y,m,0).getDate();const weeks=[];let d=1;while(d<=dim){const wk=[];for(let i=0;i<7&&d<=dim;i++,d++)wk.push(d);weeks.push(wk);}return{weeks,y,m,dim};}
function hMarks(){state.habit.marks[mes]=state.habit.marks[mes]||{};return state.habit.marks[mes];}
function hOn(hid,d){const m=state.habit.marks[mes];return !!(m&&m[hid]&&m[hid][d]);}
function ring(pct,size,color){const r=(size-7)/2,c=2*Math.PI*r,off=c*(1-Math.max(0,Math.min(1,pct/100))),s=size/2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${s}" cy="${s}" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="${s}" cy="${s}" r="${r}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 ${s} ${s})"/><text x="${s}" y="${s}" text-anchor="middle" dominant-baseline="central" font-family="Space Mono,monospace" font-weight="700" font-size="${Math.round(size*0.23)}" fill="var(--ink)">${Math.round(pct)}%</text></svg>`;}
function spark(vals,w,h){if(!vals.length)return'';const step=w/Math.max(1,vals.length-1);const pts=vals.map((v,i)=>`${(i*step).toFixed(1)},${(h-(Math.max(0,Math.min(100,v))/100)*h).toFixed(1)}`);const line=pts.join(' ');
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polygon points="0,${h} ${line} ${w},${h}" fill="var(--pos-soft)"/><polyline points="${line}" fill="none" stroke="var(--pos)" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;}
const WKNOTE_META={inegociaveis:{t:'◆ Inegociáveis diários',h:'O que não pode faltar em nenhum dia — treino, leitura, água…'},gratidao:{t:'Gratidão',h:'Três coisas pelas quais sou grato esta semana.'},revisao:{t:'Revisão da semana',h:'O que funcionou, o que drenou energia, o que ajustar.'}};
function openWkNote(field){const m=WKNOTE_META[field]||WKNOTE_META.inegociaveis;const wk=state.habit.weekPlan[weekKeyOf(weekStart)]||{};const box=document.getElementById('wkNoteBox');box.dataset.wp=field;box.value=wk[field]||'';document.getElementById('wkNoteTitle').textContent=m.t;document.getElementById('wkNoteHint').textContent=m.h;openModal('wkNoteModal');setTimeout(()=>box.focus(),60);}
const _wkDone=document.getElementById('wkNoteDone');if(_wkDone)_wkDone.onclick=()=>{closeModals();renderHabit();};
const _qnSet=document.getElementById('qnAlarmSet');if(_qnSet)_qnSet.onclick=()=>{const n=(state.habit.captures||[]).find(x=>x.id===qnAlarmId);if(!n)return;const v=document.getElementById('qnAlarmInput').value;if(v){n.alarm=new Date(v).getTime();n.fired=n.alarm<=Date.now();qnAskNotify();}save();closeModals();gtRender();};
const _qnClr=document.getElementById('qnAlarmClear');if(_qnClr)_qnClr.onclick=()=>{const n=(state.habit.captures||[]).find(x=>x.id===qnAlarmId);if(n){n.alarm=null;n.fired=false;}save();closeModals();gtRender();};
document.addEventListener('keydown',e=>{if(e.key==='Enter'){const t=e.target.closest('#qnText');if(t){e.preventDefault();qnAdd();}const t2=e.target.closest('#tdText');if(t2){e.preventDefault();tdAdd();}const t3=e.target.closest('#capText');if(t3){e.preventDefault();capAdd();}const cv=e.target.closest('[data-cv-add]');if(cv){e.preventDefault();const v=cv.value.trim();if(v){const k=cv.dataset.cvAdd;(state.culture.items[k]=state.culture.items[k]||[]).push({id:uid(),txt:v,done:false});save();gtRender();}}const wa=e.target.closest('#wkAddInput');if(wa){e.preventDefault();const v=wa.value.trim();if(v){state.habit.weekly.push({id:uid(),name:v});save();renderHabit();}}const wt=e.target.closest('#wtInput');if(wt){e.preventDefault();wtAdd();}}});
document.addEventListener('click',e=>{const hd=e.target.closest('[data-hydro]');if(hd){const k=pdStr();const cur=state.habit.hydration[k]||0;const v=+hd.dataset.hydro;state.habit.hydration[k]=(cur===v?v-1:v);save();renderHabit();return;}
  const hdd=e.target.closest('[data-hydro-d]');if(hdd){const k=pdStr();state.habit.hydration[k]=Math.max(0,(state.habit.hydration[k]||0)+(+hdd.dataset.hydroD));save();renderHabit();return;}});
document.addEventListener('input',e=>{const sl=e.target.closest('[data-sleep]');if(sl){const k=pdStr();state.habit.sleep[k]=+sl.value;save();const card=sl.closest('.asleep');if(card){const v=+sl.value;const val=card.querySelector('.trkval');if(val)val.textContent=v?v+'h':'—';const bar=card.querySelector('.slbar i');if(bar)bar.style.width=Math.min(100,(state.habit.sleepGoal?v/state.habit.sleepGoal*100:0)).toFixed(0)+'%';}}});
document.addEventListener('change',e=>{const mv=e.target.closest('[data-td-move]');if(mv){const t=(state.habit.todos||[]).find(x=>x.id===mv.dataset.tdMove);if(t){t.day=mv.value;save();renderHabit();}}
  const trd=e.target.closest('[data-treino-dia]');if(trd){const k=weekKeyOf(weekStart);const o=(state.habit.weekPlan[k]=state.habit.weekPlan[k]||{});o['treinoDia-'+trd.dataset.treinoDia]=trd.value;save();renderHabit();}
  const ddd=e.target.closest('[data-dieta-dia]');if(ddd){const k=weekKeyOf(weekStart);const o=(state.habit.weekPlan[k]=state.habit.weekPlan[k]||{});o['dieta-'+ddd.dataset.dietaDia]=ddd.value;save();renderHabit();}
  const cvr=e.target.closest('[data-cv-ref]');if(cvr){state.culture.refs[cvr.dataset.cvRef]=cvr.checked;save();gtRender();}
  const sto=e.target.closest('[data-slog-toggle]');if(sto){const k=pdStr();const o=(state.habit.sleepLog[k]=state.habit.sleepLog[k]||{});o[sto.dataset.slogToggle]=sto.checked;save();}});
setInterval(qnCheckAlarms,15000);
setInterval(()=>{try{updateRavenBadge();}catch(e){}},20000);
function schedFindBlock(day,id){const wkv=state.habit.weekPlan[weekKeyOf(weekStart)];if(!wkv||!wkv.blocks||!wkv.blocks[day])return null;return wkv.blocks[day].find(b=>b.id===id)||null;}
function wtAdd(){const inp=document.getElementById('wtInput');if(!inp)return;const txt=inp.value.trim();if(!txt)return;const cat=document.getElementById('wtCat')?.value||'ideia';const wk=weekKeyOf(weekStart);const wkv=(state.habit.weekPlan[wk]=state.habit.weekPlan[wk]||{});(wkv.wtasks=wkv.wtasks||[]).unshift({id:uid(),txt,cat,done:false});save();inp.value='';renderHabit();}
function openWtSchedModal(taskId){wtSchedId=taskId;openModal('wtSchedModal');}
function wtAssignToDay(taskId,day,startMin){
  const wk=weekKeyOf(weekStart);const wkv=(state.habit.weekPlan[wk]=state.habit.weekPlan[wk]||{});
  const list=wkv.wtasks||[];const idx=list.findIndex(t=>t.id===taskId);if(idx<0)return;
  const t=list[idx];list.splice(idx,1);
  wkv.blocks=wkv.blocks||{};const dayBlocks=(wkv.blocks[day]=wkv.blocks[day]||[]);
  let st=Math.round(startMin/SCHED_STEP)*SCHED_STEP;st=Math.max(SCHED_START,Math.min(SCHED_END-15,st));
  dayBlocks.push({id:uid(),title:t.txt,desc:'',nota:'',area:'work',color:null,start:st,dur:60});
  save();if(habitMode)renderHabit();
}
let _schedResize=null,wtSchedId=null;
document.addEventListener('input',e=>{const sf=e.target.closest('[data-sbf]');if(sf){const[d,id,k]=sf.dataset.sbf.split(':');const b=schedFindBlock(+d,id);if(b){b[k]=sf.value;save();if(k==='title'){const t=sf.closest('.sblock');}}}
  const pf=e.target.closest('[data-pbf]');if(pf){const[d,id,k]=pf.dataset.pbf.split(':');const b=schedFindBlock(+d,id);if(b){b[k]=pf.value;save();}return;}
  const pd=e.target.closest('[data-pbdur]');if(pd){const[d,id]=pd.dataset.pbdur.split(':');const b=schedFindBlock(+d,id);if(b){let v=Math.round((parseInt(pd.value)||60)/15)*15;v=Math.min(360,Math.max(15,v));b.dur=v;save();updatePbTimes(+d);}return;}
});
document.addEventListener('change',e=>{const sa=e.target.closest('[data-sbarea]');if(sa){const[d,id]=sa.dataset.sbarea.split(':');const b=schedFindBlock(+d,id);if(b){b.area=sa.value;save();paintScheduler();}}
  const pa=e.target.closest('[data-pbarea]');if(pa){const[d,id]=pa.dataset.pbarea.split(':');const b=schedFindBlock(+d,id);if(b){b.area=pa.value;save();renderHabit();}return;}});
document.addEventListener('click',e=>{
  const sad=e.target.closest('[data-sbadd]');if(sad){const day=+sad.dataset.sbadd;const wkv=(state.habit.weekPlan[weekKeyOf(weekStart)]=state.habit.weekPlan[weekKeyOf(weekStart)]||{});wkv.blocks=wkv.blocks||{};const dayBlocks=(wkv.blocks[day]=wkv.blocks[day]||[]);const {items}=schedResolveDay(dayBlocks);const lastEnd=items.length?items[items.length-1].en:SCHED_START;const start=Math.min(lastEnd,SCHED_END-60);const nb={id:uid(),title:'',desc:'',nota:'',area:'work',color:null,start,dur:60};dayBlocks.push(nb);save();paintScheduler();openBlockModal(day,nb.id);return;}
  const sdl=e.target.closest('[data-sbdel]');if(sdl){const[d,id]=sdl.dataset.sbdel.split(':');const wkv=state.habit.weekPlan[weekKeyOf(weekStart)];if(wkv&&wkv.blocks&&wkv.blocks[d]){wkv.blocks[d]=wkv.blocks[d].filter(b=>b.id!==id);save();paintScheduler();}return;}
  const pad=e.target.closest('[data-pbadd]');if(pad){const day=+pad.dataset.pbadd;const wkv=(state.habit.weekPlan[weekKeyOf(weekStart)]=state.habit.weekPlan[weekKeyOf(weekStart)]||{});wkv.blocks=wkv.blocks||{};const dayBlocks=(wkv.blocks[day]=wkv.blocks[day]||[]);const {items}=schedResolveDay(dayBlocks);const lastEnd=items.length?items[items.length-1].en:SCHED_START;const start=Math.min(lastEnd,SCHED_END-60);const nb={id:uid(),title:'',desc:'',nota:'',area:'work',color:null,start,dur:60};dayBlocks.push(nb);save();renderHabit();openBlockModal(day,nb.id);return;}
  const pdl=e.target.closest('[data-pbdel]');if(pdl){const[d,id]=pdl.dataset.pbdel.split(':');const wkv=state.habit.weekPlan[weekKeyOf(weekStart)];if(wkv&&wkv.blocks&&wkv.blocks[d]){wkv.blocks[d]=wkv.blocks[d].filter(b=>b.id!==id);save();renderHabit();}return;}
  const sbo=e.target.closest('[data-sb-open]');if(sbo&&!e.target.closest('.sbresize')){const[d,id]=sbo.dataset.sbOpen.split(':');openBlockModal(+d,id);return;}
  const pbo=e.target.closest('[data-pbopen]');if(pbo){const[d,id]=pbo.dataset.pbopen.split(':');openBlockModal(+d,id);return;}
});
document.addEventListener('pointerdown',e=>{const h=e.target.closest('[data-sbresize]');if(!h)return;const[d,id]=h.dataset.sbresize.split(':');const b=schedFindBlock(+d,id);if(!b)return;_schedResize={day:+d,id,startY:e.clientY,startDur:b.dur||60};h.closest('.sblock').classList.add('is-resizing');try{h.setPointerCapture(e.pointerId);}catch(_){}e.preventDefault();});
document.addEventListener('pointermove',e=>{if(!_schedResize)return;const slotH=16;const delta=(e.clientY-_schedResize.startY)/slotH;let nd=Math.round((_schedResize.startDur+delta*SCHED_STEP)/SCHED_STEP)*SCHED_STEP;nd=Math.min(360,Math.max(SCHED_STEP,nd));const b=schedFindBlock(_schedResize.day,_schedResize.id);if(b&&b.dur!==nd){b.dur=nd;paintScheduler();}});
document.addEventListener('pointerup',()=>{if(_schedResize){save();_schedResize=null;document.querySelectorAll('.sblock.is-resizing').forEach(x=>x.classList.remove('is-resizing'));}});
document.addEventListener('dragstart',e=>{const chip=e.target.closest('[data-wtask]');if(!chip)return;e.dataTransfer.setData('text/plain',chip.dataset.wtask);e.dataTransfer.effectAllowed='move';chip.classList.add('dragging');});
document.addEventListener('dragend',e=>{const chip=e.target.closest('[data-wtask]');if(chip)chip.classList.remove('dragging');document.querySelectorAll('.schcol.dragover').forEach(c=>c.classList.remove('dragover'));});
document.addEventListener('dragover',e=>{const col=e.target.closest('.schcol');if(col){e.preventDefault();col.classList.add('dragover');}});
document.addEventListener('dragleave',e=>{const col=e.target.closest('.schcol');if(col&&!col.contains(e.relatedTarget))col.classList.remove('dragover');});
document.addEventListener('drop',e=>{const col=e.target.closest('.schcol');if(!col)return;e.preventDefault();col.classList.remove('dragover');const taskId=e.dataTransfer.getData('text/plain');if(!taskId)return;const day=+col.dataset.schday;const rect=col.getBoundingClientRect();const y=e.clientY-rect.top;const slotIdx=Math.max(0,Math.min(SCHED_ROWS-1,Math.round(y/16)));const start=SCHED_START+slotIdx*SCHED_STEP;wtAssignToDay(taskId,day,start);});
function tdDayLabel(day,today){if(!day)return 'sem data';const d=new Date(day+'T00:00:00'),t=new Date(today+'T00:00:00');const diff=Math.round((d-t)/864e5);if(diff===0)return 'hoje';if(diff===1)return 'amanhã';if(diff===-1)return 'ontem';if(diff<0)return Math.abs(diff)+'d atrás';return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});}
function tdAdd(){const t=document.getElementById('tdText');if(!t)return;const txt=t.value.trim();if(!txt)return;const day=document.getElementById('tdDay').value||'';state.habit.todos=state.habit.todos||[];state.habit.todos.unshift({id:uid(),txt,day,done:false,ts:Date.now()});save();renderHabit();}
function qnAlarmLabel(ts){const d=new Date(ts),now=new Date();const sameDay=d.toDateString()===now.toDateString();const tm=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');const dp=sameDay?'hoje':d.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});return dp+' '+tm;}
function qnAdd(){const t=document.getElementById('qnText');if(!t)return;const txt=t.value.trim();if(!txt)return;const cat=document.getElementById('qnCat').value;const al=document.getElementById('qnAlarm').value;const alarm=al?new Date(al).getTime():null;if(alarm)qnAskNotify();state.habit.qnotes.unshift({id:uid(),txt,cat,alarm,fired:false,done:false,ts:Date.now()});save();renderHabit();}
function qnAskNotify(){try{if('Notification'in window&&Notification.permission==='default')Notification.requestPermission();}catch(e){}}
function openQnAlarm(id){qnAlarmId=id;const n=(state.habit.captures||[]).find(x=>x.id===id);if(!n)return;document.getElementById('qnAlarmTxt').textContent=n.txt;const inp=document.getElementById('qnAlarmInput');if(n.alarm){const d=new Date(n.alarm);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());inp.value=d.toISOString().slice(0,16);}else if(n.date){const d=new Date(n.date+'T'+(n.time||'09:00'));d.setMinutes(d.getMinutes()-d.getTimezoneOffset());inp.value=d.toISOString().slice(0,16);}else{const d=new Date(Date.now()+36e5);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());inp.value=d.toISOString().slice(0,16);}openModal('qnAlarmModal');}
function qnBeep(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const x=new C();const o= x.createOscillator(),g=x.createGain();o.connect(g);g.connect(x.destination);o.type='sine';o.frequency.value=880;g.gain.setValueAtTime(0.001,x.currentTime);g.gain.exponentialRampToValueAtTime(0.4,x.currentTime+0.02);g.gain.exponentialRampToValueAtTime(0.001,x.currentTime+0.5);o.start();o.stop(x.currentTime+0.52);setTimeout(()=>{const o2=x.createOscillator(),g2=x.createGain();o2.connect(g2);g2.connect(x.destination);o2.type='sine';o2.frequency.value=1175;g2.gain.setValueAtTime(0.001,x.currentTime);g2.gain.exponentialRampToValueAtTime(0.4,x.currentTime+0.02);g2.gain.exponentialRampToValueAtTime(0.001,x.currentTime+0.5);o2.start();o2.stop(x.currentTime+0.52);},260);}catch(e){}}
function qnToast(n){const cats=state.habit.qcats||[];const c=cats.find(x=>x.id===n.cat)||{name:'Nota',color:'#b4521c'};let host=document.getElementById('qnToastHost');if(!host){host=document.createElement('div');host.id='qnToastHost';document.body.appendChild(host);}const el=document.createElement('div');el.className='qntoast';el.style.setProperty('--cc',c.color);el.innerHTML=`<div class="qtic">⏰</div><div class="qtbd"><div class="qtcat">${hesc(c.name)} · alarme</div><div class="qttx">${hesc(n.txt)}</div></div><button class="qtx">✕</button>`;el.querySelector('.qtx').onclick=()=>el.remove();host.appendChild(el);qnBeep();try{if('Notification'in window&&Notification.permission==='granted')new Notification('⏰ '+c.name,{body:n.txt});}catch(e){}setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),400);},9000);}
function qnCheckAlarms(){if(typeof state==='undefined'||!state||!state.habit)return;const now=Date.now();let hit=false;(state.habit.captures||[]).forEach(n=>{if(n.alarm&&!n.fired&&!n.done&&n.alarm<=now){n.fired=true;hit=true;qnToast(n);}});if(hit){save();if(typeof gtRender==='function')gtRender();}}
const RHYTHM_AREAS=[{id:'work',name:'Trabalho',color:'#c95f1c'},{id:'nutrition',name:'Nutrição',color:'#768b43'},{id:'movement',name:'Movimento',color:'#557fb6'},{id:'relations',name:'Relações',color:'#c77276'},{id:'space',name:'Meu Espaço',color:'#b58b3d'},{id:'rest',name:'Descanso',color:'#7658a5'},{id:'mind',name:'Mindfulness',color:'#5e95a7'}];
let pjCollapse={},sonoNoteOpen={},mgTrkOpen={};
const rhm=m=>{const hh=Math.floor(m/60),mm=m%60;return mm?hh+'h'+String(mm).padStart(2,'0'):hh+'h';};
function pjSection(id,title,body,sub){const open=!pjCollapse[id];return `<section class="pjsec${open?'':' col'}"><button type="button" class="pjsech" data-pjsec="${id}"><span class="pjsect">${title}</span>${sub?`<span class="pjsecsub">${sub}</span>`:''}<span class="pjseca">${open?'▾':'▸'}</span></button><div class="pjsecbody">${body}</div></section>`;}
function pjRhythmData(){const wkvR=state.habit.weekPlan[weekKeyOf(weekStart)]||{};const rmins={};RHYTHM_AREAS.forEach(a=>rmins[a.id]=0);let rtot=0;for(let d=0;d<7;d++){((wkvR.blocks&&wkvR.blocks[d])||[]).forEach(b=>{if(rmins[b.area]!=null){rmins[b.area]+=(b.dur||0);rtot+=(b.dur||0);}});}return {wkvR,rmins,rtot};}
function rhythmWheelHTML(){const wheelLabels=RHYTHM_AREAS.map((a,i)=>{const ang=i*51.4286+25.714;return `<span class="rwlabel" style="transform:translate(-50%,-50%) rotate(${ang.toFixed(2)}deg) translateY(-94px) rotate(${(-ang).toFixed(2)}deg)">${a.name}</span>`;}).join('');return `<div class="rwheelwrap"><div class="rwheel"></div>${wheelLabels}<div class="rwcenter">semana<br>integrada</div></div>`;}
function rhythmCoverageHTML(){const {rmins,rtot}=pjRhythmData();const rmax=Math.max(60,...RHYTHM_AREAS.map(a=>rmins[a.id]));return `<div class="rcov2">`+RHYTHM_AREAS.map(a=>{const mn=rmins[a.id];const pct=rmax?mn/rmax*100:0;return `<div class="rcov2row"><span class="rcovl">${a.name}</span><div class="rcbar"><i style="width:${pct.toFixed(0)}%;background:${a.color}"></i></div><span class="rcovv">${mn?rhm(mn):'—'}</span></div>`;}).join('')+`</div><div class="rcovtot">Total planejado: <b>${rtot?rhm(rtot):'0h'}</b></div>`;}
function rhythmBalanceHTML(){const R=state.habit.rhythm;const weakLabels=['Relações','Movimento','Mindfulness'];let h=`<div class="rsubh">Áreas fracas · ação mínima</div>`+weakLabels.map((l,i)=>`<label class="rwk"><span>${l}</span><textarea data-rweak="${i}" placeholder="Ação mínima…">${hesc(R.weak[i]||'')}</textarea></label>`).join('');const checkTxt=['Confirmar quais áreas precisam de reforço.','O theme do dia resolve áreas fracas, não só repete rotina.','Todo bloco tem função e área.','Nenhuma área da roda termina zerada.','Descanso é bloco positivo, não vazio.','Buffers protegem blocos de trabalho pesado.'];h+=`<div class="rsubh" style="margin-top:12px">Balance check</div>`+checkTxt.map((t,i)=>`<label class="rchk${R.checks[i]?' on':''}"><span class="rbox" data-rcheck="${i}">${R.checks[i]?'✓':''}</span><span>${t}</span></label>`).join('')+`<label class="rwk" style="margin-top:7px"><span>Correção estrutural da semana</span><textarea data-rfield="correction" placeholder="O que mudar antes de colocar horários?">${hesc(R.correction||'')}</textarea></label>`;return h;}
function rhythmDaysHTML(){const {wkvR}=pjRhythmData();const R=state.habit.rhythm;const days=[['seg','Segunda'],['ter','Terça'],['qua','Quarta'],['qui','Quinta'],['sex','Sexta'],['sab','Sábado'],['dom','Domingo']];
  return `<div class="rdays">`+days.map((d,di)=>{const t=R.themes[d[0]]||{};const {items}=schedResolveDay((wkvR.blocks&&wkvR.blocks[di])||[]);
    const blocksHTML=items.map(({b,st,en})=>{const a=RHYTHM_AREAS.find(x=>x.id===b.area)||RHYTHM_AREAS[0];const cc=a.color;return `<div class="pbk" style="--cc:${cc}" data-pbopen="${di}:${b.id}"><span class="pbdot"></span><span class="pbttl">${hesc(b.title||'Bloco')}</span><span class="pbtime">${schedTime(st)}–${schedTime(en)}</span><span class="pbarrow">✎</span></div>`;}).join('')||`<div class="pbempty">Sem blocos — adicione abaixo.</div>`;
    return `<div class="rday"><div class="rdayhd"><span class="rdaynm">${d[1]}</span><input class="rdaytheme" data-rtheme="${d[0]}:t" value="${hesc(t.t||'')}" placeholder="Theme do dia"></div><div class="rdayblocks">${blocksHTML}<button class="pbadd" data-pbadd="${di}">＋ bloco</button></div></div>`;}).join('')+`</div>`;
}
function renderPlanejador(){
  const H=state.habit;const{weeks,y,m,dim}=hWeeks();const daily=H.daily;
  const mpv=(H.monthPlan[mes]=H.monthPlan[mes]||{});
  let progBody='<div class="hweeks">';weeks.forEach((wk,wi)=>{const col=WKC[wi%WKC.length];let done=0,poss=wk.length*daily.length;wk.forEach(d=>daily.forEach(hb=>{if(hOn(hb.id,d))done++;}));const pct=poss?done/poss*100:0;progBody+=`<div class="hweekc"><div class="wl">Sem ${wi+1}</div>${ring(pct,62,col)}<div class="wc2"><b>${done}</b>/${poss}</div></div>`;});progBody+='</div>';
  const wm=(H.wmarks[mes]=H.wmarks[mes]||{});let wkBody='<div class="hwkgrid">';weeks.forEach((wk,wi)=>{const col=WKC[wi%WKC.length];wkBody+=`<div class="hwkcol"><div class="hwkh" style="--wc:${col}">Sem ${wi+1}</div>`;H.weekly.forEach(w=>{const on=!!(wm[w.id]&&wm[w.id][wi]);wkBody+=`<div class="hwkitem ${on?'on':''}" data-hw="${w.id}:${wi}"><span class="box">✓</span><span>${hesc(w.name)}</span></div>`;});wkBody+='</div>';});wkBody+='</div>';
  let manageBody='<div class="pjwk">';H.weekly.forEach(w=>{manageBody+=`<div class="pjwkrow"><span>${hesc(w.name)}</span><button class="pjwkdel" data-delwk="${w.id}" title="remover">✕</button></div>`;});manageBody+=`<div class="pjwkadd"><input id="wkAddInput" placeholder="Novo hábito semanal…"><button id="wkAddBtn">+ adicionar</button></div></div>`;
  const focoBody=`<div class="pjfoco"><div class="asec ames"><span class="al">Foco do mês</span><textarea class="abox" data-mp="foco" placeholder="Uma intenção para o mês">${hesc(mpv.foco||'')}</textarea></div><div class="asec"><span class="al">Metas do mês</span><textarea class="abox" data-mp="metas" placeholder="O que quero concluir">${hesc(mpv.metas||'')}</textarea></div></div>`;
  const rodaBody=`<div class="rroda"><div class="rcard rwheelcard">${rhythmWheelHTML()}</div><div class="rcard"><div class="rct">Cobertura por área · blocos</div>${rhythmCoverageHTML()}</div></div>`;
  let main='';
  main+=pjSection('foco','Foco & metas do mês',focoBody,monthLabel(mes));
  main+=pjSection('roda','Roda da semana & cobertura',rodaBody);
  main+=pjSection('balance','Equilíbrio & áreas fracas',rhythmBalanceHTML());
  main+=pjSection('blocos','Blocos da semana',`<p class="chelp" style="margin:-2px 2px 10px">O que você planeja aqui é exatamente o que aparece na planilha da Semana — e a área de cada bloco alimenta a cobertura.</p>`+rhythmDaysHTML(),'sincronizado');
  main+=pjSection('gerir','Gerir hábitos semanais',manageBody);
  let side='';
  side+=pjSection('prog','Progresso das semanas',progBody);
  side+=pjSection('hsem','Hábitos semanais',wkBody);
  let h=`<div class="cctitle"><span class="e">visão do mês</span><span class="t">Planejador</span><span class="ln"></span></div>`;
  h+=`<p class="chelp">Visão mensal organizada em seções minimizáveis — o progresso fica fixo na lateral.</p>`;
  h+=`<div class="pjwrap"><div class="pjmain">${main}</div><aside class="pjside">${side}</aside></div>`;
  return h;
}
function renderSonoSheet(){
  const H=state.habit,today=pdStr();
  H.sleep=H.sleep||{};H.sleepLog=H.sleepLog||{};H.sleepRoutine=H.sleepRoutine||{};H.hydration=H.hydration||{};H.medsLog=H.medsLog||{};H.medications=H.medications||[];
  H.healthMonth=H.healthMonth||today.slice(0,7);
  H.medications.forEach(m=>{if(!m.times)m.times=[];if(m.quantity==null)m.quantity=1;});
  const slp=+(H.sleep[today]||0),SL=(H.sleepLog[today]=H.sleepLog[today]||{}),SR=(H.sleepRoutine[today]=H.sleepRoutine[today]||{});
  const satEmoji=v=>({1:'😫',2:'😕',3:'😐',4:'🙂',5:'😄'}[+v]||'—');
  const prevDate=(()=>{const d=new Date(today+'T12:00:00');d.setDate(d.getDate()-1);return d.toISOString().slice(0,10)})();
  const prevSR=H.sleepRoutine[prevDate]||{};
  const seg=(f,opts,cur)=>`<div class="slseg">${opts.map(o=>`<button class="slsegb${cur===o?' on':''}" data-slog-seg="${f}:${o}">${o}</button>`).join('')}</div>`;
  const chips=(f,opts,arr)=>`<div class="slchips">${opts.map(o=>`<button class="slchip${(arr||[]).indexOf(o)>=0?' on':''}" data-slog-chip="${f}:${o}">${o}</button>`).join('')}</div>`;
  const noteBtn=(f,label,ph)=>{const filled=(SL[f]||'').trim(),open=sonoNoteOpen[f]||!!filled;return `<div class="slnote${open?' open':''}"><button class="slnoteh" data-slnote="${f}"><span class="slnotel">${label}</span>${filled?'<span class="slnotedot"></span>':''}<span class="slnotechev">⌄</span></button><div class="slnotebody"><textarea data-slog="${f}" rows="2" placeholder="${ph}">${hesc(SL[f]||'')}</textarea></div></div>`;};
  const D=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});
  const hm=H.healthMonth,[yy,mm]=hm.split('-').map(Number),days=new Date(yy,mm,0).getDate(),first=(new Date(yy,mm-1,1).getDay()+6)%7;
  const expectedFor=(med)=>Math.max(1,(med.times||[]).length)*(+(med.quantity||1));
  const takenTokens=(date)=>H.medsLog[date]||[];
  const medDoneCount=(date,med)=>{const L=takenTokens(date);return L.filter(x=>x===med.id||String(x).startsWith(med.id+'@')).length;};
  const monthDates=Array.from({length:days},(_,i)=>`${hm}-${String(i+1).padStart(2,'0')}`);
  const sleepVals=monthDates.map(d=>+H.sleep[d]||0).filter(v=>v>0),avg=sleepVals.length?sleepVals.reduce((a,b)=>a+b,0)/sleepVals.length:0;
  const waterVals=monthDates.map(d=>+H.hydration[d]||0),waterAvg=waterVals.length?waterVals.reduce((a,b)=>a+b,0)/waterVals.length:0;const expenseTotal=monthDates.reduce((s,d)=>s+(+H.dailyExpense?.[d]||0),0);
  let medExpected=0,medTaken=0;monthDates.forEach(d=>H.medications.forEach(m=>{medExpected+=expectedFor(m);medTaken+=Math.min(expectedFor(m),medDoneCount(d,m));}));
  const cells=[];for(let i=0;i<first;i++)cells.push('<div class="health-day empty"></div>');
  monthDates.forEach((d,i)=>{const sv=+H.sleep[d]||0,w=+H.hydration[d]||0,g=+(window.getDailyExpenseTotal?window.getDailyExpenseTotal(d):(H.dailyExpense?.[d]||0));let exp=0,done=0;H.medications.forEach(m=>{exp+=expectedFor(m);done+=Math.min(expectedFor(m),medDoneCount(d,m));});const pct=exp?Math.round(done/exp*100):0;cells.push(`<button class="health-day${d===today?' today':''}" data-health-date="${d}"><span class="hdn">${i+1}</span><span class="hdrow sleep">☾ <b>${sv?sv+'h':'—'}</b></span><span class="hdrow satisfaction">${satEmoji(H.sleepRoutine[d]?.satisfaction)} <b>${H.sleepRoutine[d]?.wakeTime||'—'}</b></span><span class="hdrow water">💧 <b>${w}/${H.hydrationGoal||8}</b></span><span class="hdrow med">💊 <b>${exp?done+'/'+exp:'—'}</b></span><span class="hdrow expense">◈ <b>${g?'R$ '+g.toLocaleString('pt-BR',{minimumFractionDigits:2}):'—'}</b></span><i class="hdmedbar"><i style="width:${pct}%"></i></i></button>`);});
  const monthName=new Date(yy,mm-1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  const todayTaken=takenTokens(today);
  const medsHTML=H.medications.map(m=>{const times=(m.times||[]);return `<article class="med-card" data-med-card="${m.id}"><div class="med-card-head"><div><b>${hesc(m.name)}</b><small>${hesc(m.dose||'Sem descrição')} · quantidade ${m.quantity||1}</small></div><div class="med-card-actions"><button data-med-edit="${m.id}" title="Editar">✎</button><button data-med-del="${m.id}" title="Excluir">×</button></div></div><div class="med-times">${times.length?times.map(t=>{const token=m.id+'@'+t,checked=todayTaken.includes(token)||todayTaken.includes(m.id);return `<label class="med-time${checked?' done':''}"><input type="checkbox" data-med-dose="${token}" ${checked?'checked':''}><span>${t}</span><small>${m.quantity||1} un.</small></label>`;}).join(''):`<span class="med-no-time">Sem horário definido</span>`}</div></article>`;}).join('')||'<div class="med-empty">Nenhuma medicação cadastrada.</div>';
  let h=`<div class="cctitle"><span class="e">saúde & recuperação</span><span class="t">Saúde</span><span class="ln"></span></div>`;
  h+=`<p class="chelp">${D} — sono, hidratação e medicação em uma base diária integrada.</p>`;
  h+=`<section class="health-month"><header><div><small>Histórico mensal</small><h3>${monthName}</h3></div><div class="health-month-nav"><button data-health-month-step="-1">‹</button><input type="month" data-health-month value="${hm}"><button data-health-month-step="1">›</button></div></header><div class="health-kpis"><div><small>Sono médio</small><b>${avg?avg.toFixed(1)+'h':'—'}</b></div><div><small>Hidratação média</small><b>${waterAvg.toFixed(1)} copos</b></div><div><small>Adesão medicamentosa</small><b>${medExpected?Math.round(medTaken/medExpected*100)+'%':'—'}</b></div><div><small>Gastos registrados</small><b>${expenseTotal?'R$ '+expenseTotal.toLocaleString('pt-BR',{minimumFractionDigits:2}):'—'}</b></div></div><div class="health-weekdays">${['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(x=>`<span>${x}</span>`).join('')}</div><div class="health-grid">${cells.join('')}</div></section>`;
  h+=`<section class="med-manager"><header><div><small>Tratamento atual</small><h3>Medicações</h3></div><button class="med-add" data-med-add>＋ Adicionar medicação</button></header><div class="med-list">${medsHTML}</div></section>`;
  h+=`<section class="sleep-daily-card"><header><div><small>Registro associado a ${new Date(today+'T12:00:00').toLocaleDateString('pt-BR')}</small><h3>Ritmo diário do sono</h3></div><div class="sleep-calc-pill"><span>Noite calculada</span><b>${slp?slp.toFixed(1)+'h':'aguardando dados'}</b></div></header><div class="sleep-daily-fields"><label><span>Hora que acordei hoje</span><input type="time" data-sleep-routine="wakeTime" value="${hesc(SR.wakeTime||'')}"></label><label><span>Hora que vou dormir hoje</span><input type="time" data-sleep-routine="bedTime" value="${hesc(SR.bedTime||'')}"></label><div class="sleep-origin"><small>Cálculo desta noite</small><b>${prevSR.bedTime?prevSR.bedTime+' de ontem':'hora de dormir de ontem não registrada'} → ${SR.wakeTime||'hora de acordar de hoje'}</b></div></div><div class="sleep-satisfaction"><span>Como foi o sono?</span><div>${[[1,'😫','Péssimo'],[2,'😕','Ruim'],[3,'😐','Regular'],[4,'🙂','Bom'],[5,'😄','Ótimo']].map(x=>`<button type="button" data-sleep-satisfaction="${x[0]}" class="${+SR.satisfaction===x[0]?'on':''}"><b>${x[1]}</b><small>${x[2]}</small></button>`).join('')}</div></div></section>`;
  h+=`<div class="sonopage"><div class="sonocard"><div class="sonoct">Sono de hoje</div><div class="slgrid2"><label class="slf"><span>Deitar</span><input type="time" data-slog="bedtime" value="${hesc(SL.bedtime||'')}"></label><label class="slf"><span>Adormeci</span><input type="time" data-slog="fellAsleep" value="${hesc(SL.fellAsleep||'')}"></label><label class="slf"><span>Acordei</span><input type="time" data-slog="wakeTime" value="${hesc(SL.wakeTime||'')}"></label><label class="slf"><span>Levantei</span><input type="time" data-slog="getOut" value="${hesc(SL.getOut||'')}"></label></div><label class="slf wide"><span>Tempo total de sono (h)</span><input type="number" min="0" max="14" step="0.5" data-sleep="1" value="${slp||''}" placeholder="ex.: 8"></label></div>`;
  h+=`<div class="sonocard"><div class="sonoct">Estado ao acordar</div><div class="slblk"><span class="sll">Qualidade do sono</span>${seg('quality',['Ruim','Média','Boa'],SL.quality)}</div><div class="slblk"><span class="sll">Energia</span>${seg('energy',['Baixa','Média','Alta'],SL.energy)}</div><div class="slblk"><span class="sll">Estado do corpo</span>${seg('bodyState',['Esgotado','Equilibrado','Renovado'],SL.bodyState)}</div></div>`;
  h+=`<div class="sonocard"><div class="sonoct">Hidratação de hoje</div><div class="health-water-now"><button data-hydro-d="-1">−</button><b>${H.hydration[today]||0}<small> / ${H.hydrationGoal||8} copos</small></b><button data-hydro-d="1">＋</button></div><label class="slf wide"><span>Meta diária de copos</span><input type="number" min="1" max="30" data-hydro-goal value="${H.hydrationGoal||8}"></label></div>`;
  h+=`<div class="sonocard"><div class="sonoct">Mente & registros</div><div class="slblk"><span class="sll">Mente antes de dormir</span>${chips('mentalBefore',['Ansioso','Inquieto','Acelerado','Disperso','Calmo','Relaxado'],SL.mentalBefore)}</div><div class="slnotes">${noteBtn('notesBefore','🌙 Antes de dormir','Pensamentos e preocupações…')}${noteBtn('notes','☀ Ao acordar','Sonhos, despertares e sensações…')}</div></div></div>`;
  return h;
}
const SCHED_AREAS={work:{c:'#c95f1c',n:'Trabalho',ic:'◆'},nutrition:{c:'#768b43',n:'Nutrição',ic:'◒'},movement:{c:'#557fb6',n:'Movimento',ic:'▲'},relations:{c:'#c77276',n:'Relações',ic:'✦'},space:{c:'#b58b3d',n:'Meu Espaço',ic:'▣'},rest:{c:'#7658a5',n:'Descanso',ic:'◐'},mind:{c:'#5e95a7',n:'Mindfulness',ic:'✧'}};
const SCHED_START=360,SCHED_END=1320,SCHED_STEP=15,SCHED_ROWS=(1320-360)/15;
function schedTime(m){return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function timeToMin(s){if(!s)return null;const p=s.split(':');return (+p[0])*60+(+(p[1]||0));}
function schedResolveDay(blocks){
  let list=(blocks||[]).slice();
  list.forEach(b=>{if(b.start==null)b.start=SCHED_START;if(b.dur==null)b.dur=60;});
  list.sort((a,b)=>a.start-b.start);
  const items=[],gaps=[];let cur=SCHED_START;
  list.forEach(b=>{
    let st=Math.max(SCHED_START,Math.min(SCHED_END-15,b.start));
    let en=Math.max(st+15,Math.min(SCHED_END,st+(b.dur||60)));
    if(st>cur)gaps.push([cur,st]);
    items.push({b,st,en});
    cur=Math.max(cur,en);
  });
  if(cur<SCHED_END)gaps.push([cur,SCHED_END]);
  return {items,gaps};
}
let bmDay=null,bmId=null;
function openBlockModal(day,id){
  bmDay=day;bmId=id;
  const b=schedFindBlock(day,id);if(!b)return;
  if(b.start==null)b.start=SCHED_START;if(b.dur==null)b.dur=60;
  const en=b.start+b.dur;
  const areaSel=document.getElementById('bmArea');
  areaSel.innerHTML=Object.keys(SCHED_AREAS).map(k=>`<option value="${k}">${SCHED_AREAS[k].ic} ${SCHED_AREAS[k].n}</option>`).join('');
  areaSel.value=b.area||'work';
  document.getElementById('bmTitle').value=b.title||'';
  document.getElementById('bmStart').value=schedTime(b.start);
  document.getElementById('bmEnd').value=schedTime(en);
  document.getElementById('bmDesc').value=b.desc||'';
  document.getElementById('bmNota').value=b.nota||'';
  document.getElementById('bmIndisp').checked=!!b.indispensavel;
  openModal('blockModal');
}
function bmApplyTimes(){
  const b=schedFindBlock(bmDay,bmId);if(!b)return;
  let st=timeToMin(document.getElementById('bmStart').value);
  let en=timeToMin(document.getElementById('bmEnd').value);
  if(st==null||en==null)return;
  st=Math.round(st/15)*15;en=Math.round(en/15)*15;
  st=Math.max(SCHED_START,Math.min(SCHED_END-15,st));
  if(en<=st)en=st+15;en=Math.min(SCHED_END,en);
  b.start=st;b.dur=en-st;save();
}
function closeBlockModal(){closeModals();if(habitMode)renderHabit();bmDay=null;bmId=null;}
function buildSchedulerHTML(){
  const wkv=state.habit.weekPlan[weekKeyOf(weekStart)]||{};
  const wmon=mondayOf(weekStart),WDl=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],today=new Date();
  let axis='<div class="schaxis">';
  for(let i=0;i<SCHED_ROWS;i++){const t=SCHED_START+i*SCHED_STEP;const cls=t%60===0?'hour':(t%30===0?'half':'');axis+=`<div class="schslot ${cls}">${t%60===0?String(t/60).padStart(2,'0')+'h':(t%30===0?':30':'')}</div>`;}
  axis+='</div>';
  let head='<div class="schcorner">15<small>min</small></div>';
  for(let i=0;i<7;i++){const dd=new Date(wmon);dd.setDate(wmon.getDate()+i);const tdy=dd.toDateString()===today.toDateString();const wknd=i>=5;head+=`<div class="schdh${tdy?' today':''}${wknd?' wknd':''}"><span class="schdl">${WDl[i]}</span><span class="schdn">${dd.getDate()}</span></div>`;}
  let cols='';
  for(let i=0;i<7;i++){
    const {items,gaps}=schedResolveDay((wkv.blocks&&wkv.blocks[i])||[]);
    const combined=[...items.map(x=>({...x,kind:'b'})),...gaps.map(g=>({st:g[0],en:g[1],kind:'g'}))].sort((a,b)=>a.st-b.st);
    let inner='';
    combined.forEach(c=>{
      const rs=Math.round((c.st-SCHED_START)/SCHED_STEP)+1,span=Math.round((c.en-c.st)/SCHED_STEP);
      if(c.kind==='g'){inner+=`<div class="sblock flex" style="grid-row:${rs}/span ${span}"><span class="sbflex">Buffer · Flex</span></div>`;return;}
      const b=c.b,a=SCHED_AREAS[b.area]||SCHED_AREAS.work,cc=a.c;
      inner+=`<div class="sblock" style="--cc:${cc};grid-row:${rs}/span ${span}" data-sb-open="${i}:${b.id}"><div class="sbtop"><span class="sbic">${a.ic}</span><span class="sbttl">${hesc(b.title||'Bloco')}</span></div><span class="sbrange">${schedTime(c.st)}–${schedTime(c.en)}</span><div class="sbresize" data-sbresize="${i}:${b.id}" title="arrastar para redimensionar"></div></div>`;
    });
    cols+=`<div class="schcol${i>=5?' wknd':''}" data-schday="${i}">${inner}<button class="sbadd" data-sbadd="${i}">＋ bloco</button></div>`;
  }
  return `<div class="sched"><div class="schhead">${head}</div><div class="schbody">${axis}${cols}</div></div>`;
}
function paintScheduler(){const w=document.querySelector('.wgwrap');if(w)w.innerHTML=buildSchedulerHTML();}
function updatePbTimes(di){const wkv=state.habit.weekPlan[weekKeyOf(weekStart)]||{};const blocks=(wkv.blocks&&wkv.blocks[di])||[];let cur=SCHED_START;blocks.forEach(b=>{let dur=Math.max(15,b.dur||60);if(cur+dur>SCHED_END)dur=Math.max(15,SCHED_END-cur);const el=document.querySelector('[data-pbtime="'+di+':'+b.id+'"]');if(el)el.textContent=schedTime(cur)+'–'+schedTime(cur+dur);cur+=dur;});}
function renderHabit(){
  const el=document.getElementById('habitApp');if(!el)return;
  const sh0=el.querySelector('.hsheet');const prevScroll=sh0?sh0.scrollLeft:0;
  const H=state.habit;const{weeks,y,m,dim}=hWeeks();hMarks();const daily=H.daily;
  const dayPct=[];for(let d=1;d<=dim;d++){let on=0;daily.forEach(h=>{if(hOn(h.id,d))on++;});dayPct.push(daily.length?on/daily.length*100:0);}
  let totDone=0,totGoal=0;daily.forEach(h=>{let c=0;for(let d=1;d<=dim;d++)if(hOn(h.id,d))c++;totDone+=c;totGoal+=(h.goal||dim);});
  const overall=totGoal?totDone/totGoal*100:0;
  let html='',asideHTML='',aside2HTML='',planHTML='',trkbarsHTML='',sonoHTML='',afazeresView='';
  const MOODS=[{e:'·',c:'transparent'},{e:'😣',c:'#c2611f'},{e:'😟',c:'#cb8a3a'},{e:'😐',c:'#9a7b3f'},{e:'🙂',c:'#5b8c5a'},{e:'😄',c:'#2f8a4e'}];

  if(activeHabitTab==='habit'){
    {const MMl=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];const WDl=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
      const wmon=mondayOf(weekStart),wsun=new Date(wmon);wsun.setDate(wmon.getDate()+6);
      const wkkey=weekKeyOf(weekStart),wkv=(H.weekPlan[wkkey]=H.weekPlan[wkkey]||{});
      const _wkEnd=new Date(wmon);_wkEnd.setDate(wmon.getDate()+6);_wkEnd.setHours(23,59,59,999);
      const capByCell={},looseCaps=[];
      (H.captures||[]).forEach(cp=>{if(cp.done||!cp.date)return;const d=new Date(cp.date+'T00:00:00');if(d<wmon||d>_wkEnd)return;const dayIdx=Math.round((d-wmon)/864e5);if(cp.time){const hh=parseInt(cp.time.split(':')[0]);(capByCell[dayIdx+'-'+hh]=capByCell[dayIdx+'-'+hh]||[]).push(cp);}else looseCaps.push({cp,dayIdx});});
      const WDX=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
      let looseListHTML='';if(looseCaps.length){looseListHTML='<div class="wloosecaps">'+looseCaps.map(({cp,dayIdx})=>{const a=areaById(cp.area);return `<span class="wlchip${cp.kind==='task'?' task':''}" data-cap-open="${cp.id}" style="--cc:${a?a.color:'#9a7b3f'}">${cp.kind==='task'?'☑ ':'• '}${hesc(cp.txt)} <i>${WDX[dayIdx]}</i></span>`;}).join('')+'</div>';}
      const wrange=wmon.getMonth()===wsun.getMonth()?`${wmon.getDate()}–${wsun.getDate()} ${MMl[wmon.getMonth()]}`:`${wmon.getDate()} ${MMl[wmon.getMonth()]} – ${wsun.getDate()} ${MMl[wsun.getMonth()]}`;
      let whead='<th class="wgcorner"></th>';
      let todayIdx=-1;for(let i=0;i<7;i++){const dd=new Date(wmon);dd.setDate(wmon.getDate()+i);if(dd.toDateString()===new Date().toDateString())todayIdx=i;}
      const effSel=(selDay==null?todayIdx:selDay);
      const hourPct=5,moodPct=(moodMin?4:9),daysPct=100-hourPct-moodPct;
      const unit=(effSel>=0?daysPct/(6+2.3):daysPct/7);
      for(let i=0;i<7;i++){const dd=new Date(wmon);dd.setDate(wmon.getDate()+i);const tdy=dd.toDateString()===new Date().toDateString();const sel=(i===effSel);const w=(sel?unit*2.3:unit);whead+=`<th class="wgday${tdy?' today':''}${sel?' sel':''}" data-selday="${i}" style="width:${w.toFixed(2)}%" title="${sel?'recolher dia':'destacar dia'}"><span class="wgdl">${WDl[i]}</span><span class="wgdn">${dd.getDate()}</span></th>`;}
      whead+=`<th class="wgmoodh${moodMin?' min':''}" style="width:${moodPct}%"><button class="wgmtog" id="wgMoodTog" title="${moodMin?'expandir coluna de humor':'minimizar coluna de humor'}">${moodMin?'☺':'Humor ◂'}</button></th>`;
      let wrows='';
      for(let hh=6;hh<=23;hh++){let cells='';for(let i=0;i<7;i++){const ck=i+'-'+hh;const chips=(capByCell[ck]||[]).map(cp=>{const a=areaById(cp.area);return `<span class="wgchip${cp.kind==='task'?' task':''}" data-cap-open="${cp.id}" style="--cc:${a?a.color:'#9a7b3f'}" title="${hesc(cp.txt)}">${cp.kind==='task'?'☑ ':''}${hesc(cp.txt)}</span>`;}).join('');cells+=`<td class="wgcell${i===effSel?' selcol':''}">${chips}<div class="wgbox" contenteditable="true" data-wp="${ck}">${hesc(wkv[ck]||'')}</div></td>`;}const mi=+(wkv['mood-'+hh]||0);const MM=MOODS[mi];cells+=`<td class="wgmoodc${moodMin?' min':''}"><button class="moodbtn${mi?' set':''}" data-mood="${hh}" style="--mc:${MM.c}" title="humor às ${String(hh).padStart(2,'0')}h">${moodMin?'':MM.e}</button></td>`;wrows+=`<tr><th class="wghour">${String(hh).padStart(2,'0')}<small>h</small></th>${cells}</tr>`;}
      const looseV=wkv['loose']||'';
      {const tdNow=new Date();const tdStr=tdNow.getFullYear()+'-'+String(tdNow.getMonth()+1).padStart(2,'0')+'-'+String(tdNow.getDate()).padStart(2,'0');
        const todos=(H.todos||[]);const pend=todos.filter(t=>!t.done);
        const dueToday=pend.filter(t=>t.day===tdStr).length,overdue=pend.filter(t=>t.day&&t.day<tdStr).length;
        let alert='';if(overdue)alert=`<div class="tdalert over">⚠ ${overdue} atrasado${overdue>1?'s':''}${dueToday?' · '+dueToday+' hoje':''}</div>`;else if(dueToday)alert=`<div class="tdalert">🔔 ${dueToday} afazer${dueToday>1?'es':''} para hoje</div>`;
        const sorted=todos.slice().sort((a,b)=>{if(a.done!==b.done)return a.done?1:-1;return (a.day||'9999').localeCompare(b.day||'9999');});
        const tdItems=sorted.map(t=>{const st=t.done?'done':(t.day&&t.day<tdStr?'over':(t.day===tdStr?'today':'up'));return `<div class="tditem ${st}"><button class="tdcheck" data-td-done="${t.id}" title="concluir">✓</button><div class="tdbody"><div class="tdtx">${hesc(t.txt)}</div><label class="tdmv"><span class="tdmvl">${tdDayLabel(t.day,tdStr)}</span><input type="date" class="tdmove" data-td-move="${t.id}" value="${t.day||''}"></label></div><button class="tddel" data-td-del="${t.id}" title="remover">✕</button></div>`;}).join('')||`<div class="tdempty">Sem afazeres — adicione um abaixo.</div>`;
        afazeresView=`<div class="atdhd"><span class="al">🔔 Afazeres</span><span class="atdc">${pend.length}</span></div>${alert}<div class="tdcompose"><input id="tdText" class="tdin" placeholder="Novo afazer…"><div class="tdcrow"><input type="date" id="tdDay" class="tddate" value="${tdStr}"><button class="tdadd" id="tdAdd">+ lançar</button></div></div><div class="tdlist">${tdItems}</div>`;}
      const wkBtn=(f,lab)=>`<button class="wknbtn${(wkv[f]||'').trim()?' has':''}" data-wknote="${f}">${lab}</button>`;
      const wknotesHTML=`<div class="wknotes">${wkBtn('revisao','Revisão da semana')}</div>`;
      const SAUDE=state.saude,WDfull=['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
      const footDay=effSel>=0?effSel:0;const footDate=new Date(wmon);footDate.setDate(wmon.getDate()+footDay);
      const trSel=wkv['treinoDia-'+footDay]||'';const trOpts=`<option value="">— escolher treino —</option>`+SAUDE.treinos.map(t=>`<option value="${t.id}"${t.id===trSel?' selected':''}>${hesc(t.name)} · ${hesc(t.focus||'')}</option>`).join('');const trObj=SAUDE.treinos.find(t=>t.id===trSel);
      let treinoView=`<div class="wkfday">🏋 ${WDfull[footDay]} ${footDate.getDate()}/${footDate.getMonth()+1}</div><select class="wkfsel" data-treino-dia="${footDay}">${trOpts}</select>`;
      if(trObj)treinoView+=`<div class="wkfex">${(trObj.exercises||'').split('\n').filter(Boolean).map(l=>`<div class="wkfexl">${hesc(l)}</div>`).join('')}</div>`;else treinoView+=`<div class="wkfhint">Sem treino atribuído — escolha um dos seus treinos (cadastrados no mundo Saúde).</div>`;
      treinoView+=`<div class="wkfweekly"><span class="al">Plano da semana</span><textarea class="abox" data-wp="treino" placeholder="Divisão A/B/C, cardio, descanso…">${hesc(wkv['treino']||'')}</textarea></div>`;
      const meals=[['cafe','Café da manhã'],['almoco','Almoço'],['jantar','Jantar']];
      let dietaView=`<div class="wkfday">🍽 ${WDfull[footDay]} ${footDate.getDate()}/${footDate.getMonth()+1}</div>`;
      meals.forEach(mm=>{const rsel=wkv['dieta-'+footDay+'-'+mm[0]]||'';const ropts=`<option value="">—</option>`+SAUDE.receitas.map(r=>`<option value="${r.id}"${r.id===rsel?' selected':''}>${hesc(r.name)}${r.kcal?' · '+r.kcal+'kcal':''}</option>`).join('');dietaView+=`<div class="wkfmeal"><span class="wkfml">${mm[1]}</span><select class="wkfsel" data-dieta-dia="${footDay}:${mm[0]}">${ropts}</select></div>`;});
      dietaView+=`<div class="wkfweekly"><span class="al">Plano da semana</span><textarea class="abox" data-wp="dieta" placeholder="Refeições, macros, lista do mercado…">${hesc(wkv['dieta']||'')}</textarea></div>`;
      const wkFootHTML=`<div class="wkfoot${wkFootMin?' min':''}"><div class="wkftabs"><button class="wkftab${wkFootTab==='afazeres'?' on':''}" data-wkfoot="afazeres">📋 Afazeres</button><button class="wkftab${wkFootTab==='treino'?' on':''}" data-wkfoot="treino">🏋 Treino do dia</button><button class="wkftab${wkFootTab==='dieta'?' on':''}" data-wkfoot="dieta">🍽 Dieta do dia</button><button class="wkftog" id="wkFootTog">${wkFootMin?'expandir ▾':'recolher ▴'}</button></div><div class="wkfbody">${wkFootTab==='afazeres'?afazeresView:wkFootTab==='dieta'?dietaView:treinoView}</div></div>`;
      const mpv=(H.monthPlan[mes]=H.monthPlan[mes]||{});
      {const fw=new Date(y,m-1,1).getDay(),tdK=new Date();let cal='';
        for(let b=0;b<fw;b++)cal+='<span class="mcd off"></span>';
        for(let d=1;d<=dim;d++){let on=0;daily.forEach(h=>{if(hOn(h.id,d))on++;});const full=daily.length&&on===daily.length;const part=on>0&&!full;const isT=(tdK.getFullYear()===y&&tdK.getMonth()===m-1&&tdK.getDate()===d);cal+=`<span class="mcd${isT?' today':''}${full?' full':part?' part':''}">${d}</span>`;}
        aside2HTML=`<div class="asec ames"><div class="ameshd"><span class="al">📆 Mês</span><span class="amesm">${monthLabel(mes)}</span></div><div class="mcal"><div class="mcalh">${WD.map(d=>`<span>${d}</span>`).join('')}</div><div class="mcalg">${cal}</div></div></div><div class="asec"><span class="al">Foco do mês</span><textarea class="abox" data-mp="foco" placeholder="Uma intenção para o mês">${hesc(mpv.foco||'')}</textarea></div><div class="asec"><span class="al">Metas</span><textarea class="abox" data-mp="metas" placeholder="O que quero concluir">${hesc(mpv.metas||'')}</textarea></div><div class="asec aneg"><span class="al">◆ Inegociáveis diários</span><textarea class="abox tall" data-wp="inegociaveis" placeholder="O que não pode faltar em nenhum dia — treino, leitura, água…">${hesc(wkv['inegociaveis']||'')}</textarea></div>`;}
      const wtasks=(wkv.wtasks||[]);const wtCatOpts=(H.qcats||[]).map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
      const wtCatOf=cid=>(H.qcats||[]).find(c=>c.id===cid)||{name:'—',color:'#999'};
      const wtasksTrayHTML=`<div class="wtray"><div class="wtcompose"><input id="wtInput" class="wtin" placeholder="+ nova tarefa ou nota…"><select id="wtCat" class="wtcatsel">${wtCatOpts}</select><button class="wtadd" id="wtAdd">Adicionar</button></div><div class="wtchips">${wtasks.length?wtasks.map(t=>{const c=wtCatOf(t.cat);return `<div class="wtchip" draggable="true" data-wtask="${t.id}" style="--cc:${c.color}"><span class="wtdot"></span><span class="wttxt">${hesc(t.txt)}</span><span class="wtcatlbl">${hesc(c.name)}</span><button class="wtsched" data-wtsched="${t.id}" title="atribuir dia e horário">📅</button><button class="wtdel" data-wtdel="${t.id}" title="remover">✕</button></div>`;}).join(''):'<span class="wtempty">Nada por aqui — crie uma tarefa e atribua a um dia.</span>'}</div></div>`;
      const looseHTML=`<div class="wloose wloose-head"></div>`;
      planHTML=`<div class="planrow"><section class="planc wplan"><div class="wplan-main"><div class="planhd"><div class="planhl">${wknotesHTML}<button class="weekhub-panel-btn" id="awbWeekPanelInline" type="button"><span>▦</span><b>Painel semanal</b><small>hábitos · metas · blocos</small></button><button class="weekhub-new-block-btn" id="awbAddInline" type="button"><span>＋</span><b>Novo bloco</b><small>criar na semana</small></button></div><div class="weeknav"><button class="wkbtn" data-wkp="-1" aria-label="Semana anterior">‹</button><span class="wkrange" style="font-size:23px;color:#FF7900;font-family:'Bebas Neue';font-weight:500">${wrange}</span><button class="wkbtn" data-wkp="1" aria-label="Próxima semana">›</button></div></div><div class="wgwrap">${buildSchedulerHTML()}</div>${wtasksTrayHTML}${looseHTML}</div></section></div>`;
    }
    {const today=pdStr();const cups=H.hydration[today]||0,hgoal=H.hydrationGoal||8;const slp=+(H.sleep[today]||0),sgoal=H.sleepGoal||8;
      const hpct=hgoal?Math.min(100,cups/hgoal*100):0,spct=sgoal?Math.min(100,slp/sgoal*100):0;
      trkbarsHTML=`<div class="trkbars"><div class="trkbar"><div class="tbh"><span class="tbl">💧 Hidratação</span><span class="tbv">${cups}/${hgoal} copos</span></div><div class="tbtrack hydro"><i style="width:${hpct}%"></i></div><div class="tbctl"><button class="trkbtn" data-hydro-d="-1">−</button><button class="trkbtn" data-hydro-d="1">+</button></div></div><div class="trkbar"><div class="tbh"><span class="tbl">🌙 Sono</span><span class="tbv">${slp?slp+'h':'—'} / ${sgoal}h</span></div><div class="tbtrack sleep"><i style="width:${spct}%"></i></div><div class="tbctl"><span class="tbnote">registre na folha de sono →</span></div></div></div>`;
      const SL=(H.sleepLog[today]=H.sleepLog[today]||{});
      const seg=(f,opts,cur)=>`<div class="slseg">`+opts.map(o=>`<button class="slsegb${cur===o?' on':''}" data-slog-seg="${f}:${o}">${o}</button>`).join('')+`</div>`;
      const chips=(f,opts,arr)=>`<div class="slchips">`+opts.map(o=>`<button class="slchip${(arr||[]).indexOf(o)>=0?' on':''}" data-slog-chip="${f}:${o}">${o}</button>`).join('')+`</div>`;
      sonoHTML=`<div class="asec asono"><div class="asonohd"><span class="al">🌙 Sono — hoje</span><span class="asonosub">${new Date().toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})}</span></div><div class="slgrid2"><label class="slf"><span>Deitar</span><input type="time" data-slog="bedtime" value="${hesc(SL.bedtime||'')}"></label><label class="slf"><span>Adormeci</span><input type="time" data-slog="fellAsleep" value="${hesc(SL.fellAsleep||'')}"></label><label class="slf"><span>Acordei</span><input type="time" data-slog="wakeTime" value="${hesc(SL.wakeTime||'')}"></label><label class="slf"><span>Levantei</span><input type="time" data-slog="getOut" value="${hesc(SL.getOut||'')}"></label></div><label class="slf wide"><span>Tempo total de sono (h)</span><input type="number" min="0" max="14" step="0.5" data-sleep="1" value="${slp||''}" placeholder="ex.: 8"></label><div class="slblk"><span class="sll">Qualidade do sono</span>${seg('quality',['Ruim','Média','Boa'],SL.quality)}</div><div class="slblk"><span class="sll">Energia ao acordar</span>${seg('energy',['Baixa','Média','Alta'],SL.energy)}</div><div class="slblk"><span class="sll">Estado do corpo</span>${seg('bodyState',['Esgotado','Equilibrado','Renovado'],SL.bodyState)}</div><div class="slblk"><span class="sll">Mente antes de dormir</span>${chips('mentalBefore',['Ansioso','Inquieto','Acelerado','Disperso','Calmo','Relaxado','Em paz','Contente'],SL.mentalBefore)}</div><div class="slblk"><span class="sll">Como me senti</span>${chips('feltDuring',['Dormi fundo','Seguro','Descansado','Interrompido'],SL.feltDuring)}</div><div class="slblk2"><label class="sltog"><input type="checkbox" data-slog-toggle="hadDream" ${SL.hadDream?'checked':''}> Tive um sonho</label><label class="slf inl"><span>Acordei ×</span><input type="number" min="0" max="20" data-slog="wokeCount" value="${SL.wokeCount||''}"></label></div><div class="slblk"><span class="sll">Comida/bebida antes</span>${chips('foodBefore',['Chá','Lanche leve','Chocolate','Meditei','Celular','Li um livro'],SL.foodBefore)}</div><label class="slf wide"><span>Notas ao despertar</span><textarea data-slog="notes" rows="2" placeholder="Sonhos, despertares, sensações…">${hesc(SL.notes||'')}</textarea></label></div>`;}
    let h1='<tr><th class="nm">Hábitos diários</th>',h2='<tr><th class="nm"></th>';
    weeks.forEach((wk,wi)=>{const col=WKC[wi%WKC.length];h1+=`<th class="wk" colspan="${wk.length}" style="--wc:${col}">Sem ${wi+1}</th>`;wk.forEach(d=>{const dt=new Date(y,m-1,d);h2+=`<th class="dcol" style="--wc:${col}"><span class="dl">${WD[dt.getDay()]}</span><span class="dn">${d}</span></th>`;});});
    h1+='<th class="goalh">Meta</th><th class="progh">Progresso</th></tr>';h2+='</tr>';
    let body='';
    daily.forEach(h=>{let done=0;let row=`<td class="nm">${hesc(h.name)}<span class="hdel" data-delhab="${h.id}" title="remover">✕</span></td>`;
      weeks.forEach((wk,wi)=>{const col=WKC[wi%WKC.length];wk.forEach(d=>{const on=hOn(h.id,d);if(on)done++;row+=`<td class="cell" style="--wc:${col}"><button class="hbox ${on?'on':''}" data-hd="${h.id}:${d}" aria-label="dia ${d}"></button></td>`;});});
      const goal=h.goal||dim,pct=Math.min(100,goal?done/goal*100:0);
      row+=`<td class="goalc">${goal}</td><td class="progc"><div class="hprog"><div class="hbar"><i style="width:${pct}%"></i></div><span>${done}/${goal}</span></div></td>`;
      body+=`<tr>${row}</tr>`;});
    const span=2+weeks.reduce((s,w)=>s+w.length,0);
    body+=`<tr class="addrow"><td class="nm"><span class="hadd" id="habitAdd">+ novo hábito</span></td><td colspan="${span-1}"><button class="htbltog" id="habitTblTog" aria-expanded="${!habitTableMin}">${habitTableMin?'expandir ▾':'minimizar ▴'}</button></td></tr>`;
    html+=`<div class="hsheet${habitTableMin?' min':''}"><table class="hgrid"><thead>${h1}${h2}</thead><tbody>${body}</tbody></table></div>`;
    html=`<div class="weekhub-stack"><section class="weekhub-sheet">${planHTML}</section><section class="weekhub-habits">${html}</section></div>`;
  }

  if(activeHabitTab==='notas'){
    const cats=H.qcats,catMap={};cats.forEach(c=>catMap[c.id]=c);
    const all=H.qnotes||[];
    html+=`<div class="cctitle"><span class="e">captura rápida</span><span class="t">Notas rápidas</span><span class="ln"></span></div>`;
    html+=`<p class="chelp">Solte qualquer coisa aqui, classifique por categoria e ative um alarme para não esquecer.</p>`;
    html+=`<div class="hcard qncomposer"><input id="qnText" class="qnin" placeholder="Escreva uma nota rápida…" value=""><div class="qnrow"><select id="qnCat" class="qnsel">${cats.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select><label class="qnalw"><span class="qnalk">⏰</span><input id="qnAlarm" type="datetime-local" class="qnsel qnalarm"></label><button class="qnadd" id="qnAdd">+ adicionar</button></div></div>`;
    const pending=all.filter(n=>!n.done);
    html+=`<div class="qnfilters"><button class="qnchip${qnFilter==='todas'?' on':''}" data-qnf="todas">Todas <b>${pending.length}</b></button>${cats.map(c=>`<button class="qnchip${qnFilter===c.id?' on':''}" data-qnf="${c.id}" style="--cc:${c.color}"><i></i>${c.name} <b>${pending.filter(n=>n.cat===c.id).length}</b></button>`).join('')}<button class="qnchip${qnFilter==='done'?' on':''}" data-qnf="done">Concluídas <b>${all.filter(n=>n.done).length}</b></button></div>`;
    let list=all.slice();
    if(qnFilter==='done')list=list.filter(n=>n.done);
    else{list=list.filter(n=>!n.done);if(qnFilter!=='todas')list=list.filter(n=>n.cat===qnFilter);}
    list.sort((a,b)=>{const aa=a.alarm&&!a.done?a.alarm:null,bb=b.alarm&&!b.done?b.alarm:null;if(aa&&bb)return aa-bb;if(aa)return -1;if(bb)return 1;return b.ts-a.ts;});
    if(!list.length){html+=`<div class="qnempty">${qnFilter==='done'?'Nenhuma nota concluída ainda.':'Nada por aqui. Capture sua primeira nota acima.'}</div>`;}
    else{html+=`<div class="qnlist">`+list.map(n=>{const c=catMap[n.cat]||{name:'—',color:'#999'};
      let badge='';if(n.alarm){const due=n.alarm<=Date.now();const st=n.fired||due?'rang':'up';badge=`<span class="qnalb ${st}">⏰ ${qnAlarmLabel(n.alarm)}</span>`;}
      return `<div class="qnitem${n.done?' done':''}" style="--cc:${c.color}"><button class="qncheck" data-qn-done="${n.id}" title="${n.done?'reabrir':'concluir'}">✓</button><div class="qnbody"><div class="qntop"><span class="qncat"><i></i>${c.name}</span>${badge}<span class="qnwhen">${timeAgo(n.ts)}</span></div><div class="qntxt">${hesc(n.txt)}</div></div><div class="qnacts"><button class="qnact${n.alarm?' has':''}" data-qn-alarm="${n.id}" title="alarme">⏰</button><button class="qnact" data-qn-del="${n.id}" title="remover">✕</button></div></div>`;
    }).join('')+`</div>`;}
  }

  if(activeHabitTab==='sono'){html=renderSonoSheet();}
  if(activeHabitTab==='planejador'){html=renderPlanejador();}
  if(activeHabitTab==='mapa'){html=renderMapaTab();}
  renderMgPanel();

  el.innerHTML=html;
  const sh=el.querySelector('.hsheet');if(sh)sh.scrollLeft=prevScroll;
}
function applyMode(){
  document.documentElement.classList.toggle('habit',habitMode);
  paintTabs();
  const btn=document.getElementById('modeBtn');
  if(btn){btn.textContent='ᛉ';btn.title='Abrir a árvore — trocar de mundo';}
  const eb=document.getElementById('eyebrow');if(eb)eb.textContent=habitMode?'WeekHub · controle integrado':'FinanceHub · planner financeiro';
  activateTab(habitMode?activeHabitTab:activeFinanceTab);
}
function toggleMode(){
  habitMode=!habitMode;
  if(habitMode)annual=false;
  applyMode();
  AXD.scrollTo(0,0);
}
const _modeBtn=document.getElementById('modeBtn');if(_modeBtn)_modeBtn.onclick=goHome;
const _modeBtnTop=document.getElementById('modeBtnTop');if(_modeBtnTop)_modeBtnTop.onclick=goHome;
document.addEventListener('click',e=>{
  const hd=e.target.closest('[data-hd]');if(hd){const a=hd.dataset.hd.split(':'),id=a[0],d=a[1];const M=hMarks();M[id]=M[id]||{};if(M[id][d])delete M[id][d];else M[id][d]=1;save();renderHabit();return;}
  const hw=e.target.closest('[data-hw]');if(hw){const a=hw.dataset.hw.split(':'),id=a[0],wi=a[1];const wm=(state.habit.wmarks[mes]=state.habit.wmarks[mes]||{});wm[id]=wm[id]||{};if(wm[id][wi])delete wm[id][wi];else wm[id][wi]=1;save();renderHabit();return;}
  const ah=e.target.closest('#habitAdd');if(ah){const n=prompt('Novo hábito diário:');if(n&&n.trim()){const o=hWeeks();state.habit.daily.push({id:uid(),name:n.trim(),goal:o.dim});save();renderHabit();}return;}
  const dh=e.target.closest('[data-delhab]');if(dh){if(confirm('Remover este hábito?')){state.habit.daily=state.habit.daily.filter(x=>x.id!==dh.dataset.delhab);save();renderHabit();}return;}
  const dwk=e.target.closest('[data-delwk]');if(dwk){if(confirm('Remover este hábito semanal?')){state.habit.weekly=state.habit.weekly.filter(x=>x.id!==dwk.dataset.delwk);save();renderHabit();}return;}
  if(e.target.closest('#wkAddBtn')){const inp=document.getElementById('wkAddInput');const v=(inp.value||'').trim();if(v){state.habit.weekly.push({id:uid(),name:v});save();renderHabit();}return;}
  const cov=e.target.closest('[data-cov]');if(cov){const[a,n]=cov.dataset.cov.split(':');const v=+n;state.habit.rhythm.coverage[a]=(state.habit.rhythm.coverage[a]===v?v-1:v);save();renderHabit();return;}
  const rck=e.target.closest('[data-rcheck]');if(rck){const i=+rck.dataset.rcheck;state.habit.rhythm.checks[i]=!state.habit.rhythm.checks[i];save();renderHabit();return;}
  const ps=e.target.closest('[data-pjsec]');if(ps){const id=ps.dataset.pjsec;pjCollapse[id]=!pjCollapse[id];const sec=ps.closest('.pjsec');if(sec)sec.classList.toggle('col',!!pjCollapse[id]);const ar=ps.querySelector('.pjseca');if(ar)ar.textContent=pjCollapse[id]?'▸':'▾';return;}
  const sn=e.target.closest('[data-slnote]');if(sn){const f=sn.dataset.slnote;sonoNoteOpen[f]=!sonoNoteOpen[f];const wrap=sn.closest('.slnote');if(wrap)wrap.classList.toggle('open',!!sonoNoteOpen[f]);return;}
  const mtk=e.target.closest('[data-mgtrk]');if(mtk){const k=mtk.dataset.mgtrk;mgTrkOpen[k]=!mgTrkOpen[k];const wrap=mtk.closest('.mgtrk');if(wrap)wrap.classList.toggle('open',!!mgTrkOpen[k]);return;}
  const gts=e.target.closest('[data-gtsec]');if(gts){const id=gts.dataset.gtsec;gtOpenSec[id]=!gtOpenSec[id];const sec=gts.closest('.gtsec');if(sec)sec.classList.toggle('open',!!gtOpenSec[id]);const ar=gts.querySelector('.gtseca');if(ar)ar.textContent=gtOpenSec[id]?'⌄':'›';return;}
  const rvg=e.target.closest('[data-raven-go]');if(rvg){openGT(rvg.dataset.ravenGo);return;}
  const rba=e.target.closest('[data-rblock-add]');if(rba){const d=rba.dataset.rblockAdd;const time=prompt('Horário (ex.: 08–10):','');if(time===null)return;const label=prompt('Tarefa / bloco:','');if(label===null)return;const opts=RHYTHM_AREAS.map((a,i)=>(i+1)+' '+a.name).join('\n');const an=prompt('Área:\n'+opts,'1');const area=RHYTHM_AREAS[(parseInt(an)||1)-1]?RHYTHM_AREAS[(parseInt(an)||1)-1].id:'work';const t=(state.habit.rhythm.themes[d]=state.habit.rhythm.themes[d]||{});(t.blocks=t.blocks||[]).push({id:uid(),time:(time||'').trim(),label:(label||'').trim(),area});save();renderHabit();return;}
  const rbx=e.target.closest('[data-rblock-del]');if(rbx){const[d,bid]=rbx.dataset.rblockDel.split(':');const t=state.habit.rhythm.themes[d];if(t&&t.blocks){t.blocks=t.blocks.filter(x=>x.id!==bid);save();renderHabit();}return;}
  const tt=e.target.closest('#habitTblTog');if(tt){habitTableMin=!habitTableMin;renderHabit();return;}
  const wkp=e.target.closest('[data-wkp]');if(wkp){weekStart=new Date(weekStart);weekStart.setDate(weekStart.getDate()+parseInt(wkp.dataset.wkp)*7);renderHabit();return;}
  const mtog=e.target.closest('#wgMoodTog');if(mtog){moodMin=!moodMin;renderHabit();return;}
  const wft=e.target.closest('[data-wkfoot]');if(wft){wkFootTab=wft.dataset.wkfoot;wkFootMin=false;renderHabit();return;}
  const wftog=e.target.closest('#wkFootTog');if(wftog){wkFootMin=!wkFootMin;renderHabit();return;}
  if(e.target.closest('#wtAdd')){wtAdd();return;}
  const wtd=e.target.closest('[data-wtdel]');if(wtd){const wk=weekKeyOf(weekStart);const wkv=state.habit.weekPlan[wk];if(wkv&&wkv.wtasks){wkv.wtasks=wkv.wtasks.filter(t=>t.id!==wtd.dataset.wtdel);save();renderHabit();}return;}
  const wts=e.target.closest('[data-wtsched]');if(wts){openWtSchedModal(wts.dataset.wtsched);return;}
  const ssg=e.target.closest('[data-slog-seg]');if(ssg){const[f,v]=ssg.dataset.slogSeg.split(':');const k=pdStr();const o=(state.habit.sleepLog[k]=state.habit.sleepLog[k]||{});o[f]=(o[f]===v?'':v);save();renderHabit();return;}
  const sch=e.target.closest('[data-slog-chip]');if(sch){const[f,v]=sch.dataset.slogChip.split(':');const k=pdStr();const o=(state.habit.sleepLog[k]=state.habit.sleepLog[k]||{});const arr=(o[f]=o[f]||[]);const i=arr.indexOf(v);if(i>=0)arr.splice(i,1);else arr.push(v);save();renderHabit();return;}
  const wst=e.target.closest('#wkSideTog');if(wst){wkSideMin=!wkSideMin;renderHabit();return;}
  const wkn=e.target.closest('[data-wknote]');if(wkn){openWkNote(wkn.dataset.wknote);return;}
  const sdy=e.target.closest('[data-selday]');if(sdy){const i=+sdy.dataset.selday;selDay=(selDay===i?-1:i);renderHabit();return;}
  if(e.target.closest('#qnAdd')){qnAdd();return;}
  if(e.target.closest('#tdAdd')){tdAdd();return;}
  const td=e.target.closest('[data-td-done]');if(td){const t=(state.habit.todos||[]).find(x=>x.id===td.dataset.tdDone);if(t){t.done=!t.done;save();renderHabit();}return;}
  const tdx=e.target.closest('[data-td-del]');if(tdx){state.habit.todos=(state.habit.todos||[]).filter(x=>x.id!==tdx.dataset.tdDel);save();renderHabit();return;}
  const qf=e.target.closest('[data-qnf]');if(qf){qnFilter=qf.dataset.qnf;renderHabit();return;}
  const qd=e.target.closest('[data-qn-done]');if(qd){const n=(state.habit.qnotes||[]).find(x=>x.id===qd.dataset.qnDone);if(n){n.done=!n.done;save();renderHabit();}return;}
  const qx=e.target.closest('[data-qn-del]');if(qx){state.habit.qnotes=(state.habit.qnotes||[]).filter(x=>x.id!==qx.dataset.qnDel);save();renderHabit();return;}
  const qa=e.target.closest('[data-qn-alarm]');if(qa){openQnAlarm(qa.dataset.qnAlarm);return;}
  const mb=e.target.closest('[data-mood]');if(mb){const k=weekKeyOf(weekStart);const o=(state.habit.weekPlan[k]=state.habit.weekPlan[k]||{});const mk='mood-'+mb.dataset.mood;o[mk]=((+(o[mk]||0))+1)%6;save();renderHabit();return;}
});
document.addEventListener('input',e=>{const nt=e.target.closest('#habitNotes');if(nt){state.habit.notes=nt.value;save();}
  const slg=e.target.closest('[data-slog]');if(slg){const k=pdStr();const o=(state.habit.sleepLog[k]=state.habit.sleepLog[k]||{});o[slg.dataset.slog]=slg.value;save();return;}
  const wp=e.target.closest('[data-wp]');if(wp){const k=weekKeyOf(weekStart);const o=(state.habit.weekPlan[k]=state.habit.weekPlan[k]||{});o[wp.dataset.wp]=(wp.value!==undefined?wp.value:wp.innerText);save();return;}
  const mpf=e.target.closest('[data-mp]');if(mpf){const o=(state.habit.monthPlan[mes]=state.habit.monthPlan[mes]||{});o[mpf.dataset.mp]=mpf.value;save();return;}const ib=e.target.closest('#ccInbox');if(ib){inboxDraft=ib.value;}
  const te=e.target.closest('[data-tool-edit]');if(te){const[id,f]=te.dataset.toolEdit.split(':');const t=(state.habit.toolsMap.tools||[]).find(x=>x.id===id);if(t){t[f]=te.innerText.trim();save();}return;}
  const fe=e.target.closest('[data-flow-edit]');if(fe){const[i,j]=fe.dataset.flowEdit.split(':').map(Number);if(state.habit.toolsMap.flow[i]){state.habit.toolsMap.flow[i][j]=fe.innerText.trim();save();}return;}
  const mst=e.target.closest('[data-mmsec-title]');if(mst){const s=(state.habit.toolsMap.sections||[]).find(x=>x.id===mst.dataset.mmsecTitle);if(s){s.title=mst.innerText.trim();save();}return;}
  const esp=e.target.closest('[data-esp]');if(esp){const k=esp.dataset.esp;(state.espelho=state.espelho||{})[k]=(esp.value!==undefined?esp.value:esp.innerText.trim());save();return;}
  const mct=e.target.closest('[data-mmcard]');if(mct){const[sid,cid]=mct.dataset.mmcard.split(':');const s=(state.habit.toolsMap.sections||[]).find(x=>x.id===sid);const c=s&&(s.cards||[]).find(x=>x.id===cid);if(c){c.text=mct.innerText.trim();save();}return;}});
document.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const ib=e.target.closest('#ccInbox');if(ib){e.preventDefault();const v=ib.value.trim();if(v){state.habit.inbox.unshift({id:uid(),txt:v,ts:Date.now()});inboxDraft='';save();gtRender();}}});
document.addEventListener('change',e=>{const pa=e.target.closest('[data-pj-dayadd]');if(pa){const p=state.habit.projetos.find(x=>x.id===pa.dataset.pjDayadd);if(p&&pa.value){p.days=p.days||[];if(!p.days.includes(pa.value))p.days.push(pa.value);const t=new Date(pa.value).getTime();if(t>(p.last||0))p.last=t;save();gtRender();}}});
document.addEventListener('click',e=>{
  if(e.target.closest('#capAdd')){capAdd();return;}
  const cf=e.target.closest('[data-capf]');if(cf){capFilter=cf.dataset.capf;gtRender();return;}
  const cd=e.target.closest('[data-cap-done]');if(cd){const n=(state.habit.captures||[]).find(x=>x.id===cd.dataset.capDone);if(n){n.done=!n.done;save();gtRender();}return;}
  const cx=e.target.closest('[data-cap-del]');if(cx){state.habit.captures=(state.habit.captures||[]).filter(x=>x.id!==cx.dataset.capDel);save();gtRender();return;}
  const ce=e.target.closest('[data-cap-edit]');if(ce){openCapEdit(ce.dataset.capEdit);return;}
  const ca=e.target.closest('[data-cap-alarm]');if(ca){openQnAlarm(ca.dataset.capAlarm);return;}
  const co=e.target.closest('[data-cap-open]');if(co){openGT('comando');return;}
  const cvd=e.target.closest('[data-cv-done]');if(cvd){const[k,id]=cvd.dataset.cvDone.split(':');const it=(state.culture.items[k]||[]).find(x=>x.id===id);if(it){it.done=!it.done;save();gtRender();}return;}
  const cvx=e.target.closest('[data-cv-del]');if(cvx){const[k,id]=cvx.dataset.cvDel.split(':');state.culture.items[k]=(state.culture.items[k]||[]).filter(x=>x.id!==id);save();gtRender();return;}
  const rtAdd=e.target.closest('[data-rt-add]');if(rtAdd){const t=prompt('O que você quer retomar?');if(t&&t.trim()){const ctx=pickCtx();const nx=prompt('Próximo passo concreto:')||'';state.habit.retomadas.push({id:uid(),ctx,title:t.trim(),next:nx.trim(),ts:Date.now()});save();gtRender();}return;}
  const rtDone=e.target.closest('[data-rt-done]');if(rtDone){const r=state.habit.retomadas.find(x=>x.id===rtDone.dataset.rtDone);if(r){const nx=prompt('Avançou! Qual o próximo passo agora?',r.next||'');if(nx!==null){r.next=nx.trim();r.ts=Date.now();save();gtRender();}}return;}
  const rtEdit=e.target.closest('[data-rt-edit]');if(rtEdit){const r=state.habit.retomadas.find(x=>x.id===rtEdit.dataset.rtEdit);if(r){const nx=prompt('Próximo passo:',r.next||'');if(nx!==null){r.next=nx.trim();save();gtRender();}}return;}
  const rtUp=e.target.closest('[data-rt-up]');if(rtUp){const r=state.habit.retomadas.find(x=>x.id===rtUp.dataset.rtUp);if(r){r.ts=Date.now();if(r.proj){const p=state.habit.projetos.find(x=>x.id===r.proj);if(p){p.days=p.days||[];const ds=pdStr();if(!p.days.includes(ds))p.days.push(ds);p.last=Date.now();}}save();gtRender();}return;}
  const rtSched=e.target.closest('[data-rt-sched]');if(rtSched){openRtSched(rtSched.dataset.rtSched);return;}
  const rtLink=e.target.closest('[data-rt-link]');if(rtLink){const r=state.habit.retomadas.find(x=>x.id===rtLink.dataset.rtLink);if(r){const P=state.habit.projetos;const list=P.map((p,i)=>(i+1)+' '+p.name).join('\n');const n=prompt('Vincular a qual projeto?\n0 nenhum\n'+list,'0');if(n!==null){const idx=parseInt(n)-1;r.proj=(idx>=0&&P[idx])?P[idx].id:null;save();gtRender();}}return;}
  const rtDel=e.target.closest('[data-rt-del]');if(rtDel){state.habit.retomadas=state.habit.retomadas.filter(x=>x.id!==rtDel.dataset.rtDel);save();gtRender();return;}
  const ibAdd=e.target.closest('#ccInboxAdd');if(ibAdd){const inp=document.getElementById('ccInbox');const v=(inp.value||'').trim();if(v){state.habit.inbox.unshift({id:uid(),txt:v,ts:Date.now()});inboxDraft='';save();gtRender();}return;}
  const ibDel=e.target.closest('[data-ib-del]');if(ibDel){state.habit.inbox=state.habit.inbox.filter(x=>x.id!==ibDel.dataset.ibDel);save();gtRender();return;}
  const ibDest=e.target.closest('[data-ib-dest]');if(ibDest){const d=pickDest();if(d){state.habit.inbox=state.habit.inbox.filter(x=>x.id!==ibDest.dataset.ibDest);save();gtRender();}return;}
  const pjAdd=e.target.closest('[data-pj-add]');if(pjAdd){const n=prompt('Nome do projeto:');if(n&&n.trim()){const ctx=pickCtx();state.habit.projetos.push({id:uid(),name:n.trim(),ctx,last:Date.now(),days:[]});save();gtRender();}return;}
  const pjTouch=e.target.closest('[data-pj-touch]');if(pjTouch){const p=state.habit.projetos.find(x=>x.id===pjTouch.dataset.pjTouch);if(p){p.last=Date.now();save();gtRender();}return;}
  const pjRtAdd=e.target.closest('[data-pj-rt-add]');if(pjRtAdd){const pid=pjRtAdd.dataset.pjRtAdd;const p=state.habit.projetos.find(x=>x.id===pid);const t=prompt('O que você quer retomar neste projeto?',p?p.name:'');if(t&&t.trim()){const nx=prompt('Próximo passo concreto:')||'';state.habit.retomadas.push({id:uid(),title:t.trim(),next:nx,ctx:p?p.ctx:'pessoal',proj:pid,ts:Date.now()});save();gtRender();}return;}
  const pjDay=e.target.closest('[data-pj-day]');if(pjDay){const p=state.habit.projetos.find(x=>x.id===pjDay.dataset.pjDay);if(p){p.days=p.days||[];const ds=pdStr();const i=p.days.indexOf(ds);if(i>=0)p.days.splice(i,1);else{p.days.push(ds);p.last=Date.now();}save();gtRender();}return;}
  const pjDel=e.target.closest('[data-pj-del]');if(pjDel){if(confirm('Remover este projeto?')){state.habit.projetos=state.habit.projetos.filter(x=>x.id!==pjDel.dataset.pjDel);save();gtRender();}return;}
  const tlAdd=e.target.closest('#toolAdd');if(tlAdd){state.habit.toolsMap.tools.push({id:uid(),ic:'🔧',nm:'Nova ferramenta',fn:'Para que serve.',fr:'Quando usar'});save();gtRender();return;}
  const tlDel=e.target.closest('[data-tool-del]');if(tlDel){state.habit.toolsMap.tools=state.habit.toolsMap.tools.filter(x=>x.id!==tlDel.dataset.toolDel);save();gtRender();return;}
  const flAdd=e.target.closest('#flowAdd');if(flAdd){state.habit.toolsMap.flow.push(['Etapa','Destino']);save();gtRender();return;}
  if(e.target.closest('#mmSecAdd')){state.habit.toolsMap.sections=state.habit.toolsMap.sections||[];state.habit.toolsMap.sections.push({id:uid(),title:'Nova seção',cards:[]});save();gtRender();return;}
  const msd=e.target.closest('[data-mmsec-del]');if(msd){if(confirm('Remover esta seção?')){state.habit.toolsMap.sections=(state.habit.toolsMap.sections||[]).filter(x=>x.id!==msd.dataset.mmsecDel);save();gtRender();}return;}
  const mca=e.target.closest('[data-mmcard-add]');if(mca){const s=(state.habit.toolsMap.sections||[]).find(x=>x.id===mca.dataset.mmcardAdd);if(s){const cols=['#c95f1c','#768b43','#557fb6','#c77276','#b58b3d','#7658a5','#5e95a7'];(s.cards=s.cards||[]).push({id:uid(),text:'Novo bloco',color:cols[s.cards.length%cols.length]});save();gtRender();}return;}
  const mcd=e.target.closest('[data-mmcard-del]');if(mcd){const[sid,cid]=mcd.dataset.mmcardDel.split(':');const s=(state.habit.toolsMap.sections||[]).find(x=>x.id===sid);if(s){s.cards=(s.cards||[]).filter(x=>x.id!==cid);save();gtRender();}return;}
  const flDel=e.target.closest('[data-flow-del]');if(flDel){state.habit.toolsMap.flow.splice(+flDel.dataset.flowDel,1);save();gtRender();return;}
});


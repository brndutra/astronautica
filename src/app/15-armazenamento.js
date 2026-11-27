/* ===== Armazenamento ===== */
const LS_KEY="sfp_bruno_v4";const _mem={};
const store={get(){try{return localStorage.getItem(LS_KEY);}catch(e){return _mem[LS_KEY]||null;}},
  set(v){try{localStorage.setItem(LS_KEY,v);}catch(e){_mem[LS_KEY]=v;}}};

/* ===== Helpers ===== */
const BRL=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
const BRL0=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
const fmt=n=>BRL.format(n||0), fmt0=n=>BRL0.format(Math.round(n||0));
const fmtN=n=>new Intl.NumberFormat("pt-BR",{maximumFractionDigits:0}).format(Math.round(n||0));
function fmtK(n){n=Math.round(n||0);const a=Math.abs(n);if(a>=1e6)return (n/1e6).toFixed(1).replace(".",",")+"M";if(a>=1000)return (n/1000).toFixed(1).replace(".",",")+"k";return String(n);}
const pad=n=>String(n).padStart(2,"0"), uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const num=s=>{if(typeof s==="number")return s;return parseFloat(String(s||"").replace(/\./g,"").replace(",","."))||0;};
function monthKey(d){return d.getFullYear()+"-"+pad(d.getMonth()+1);}
function addMonths(k,n){const[y,m]=k.split("-").map(Number);return monthKey(new Date(y,m-1+n,1));}
function monthLabel(k){const[y,m]=k.split("-").map(Number);const s=new Date(y,m-1,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});return s.charAt(0).toUpperCase()+s.slice(1);}
function monthShort(k){const[y,m]=k.split("-").map(Number);const s=new Date(y,m-1,1).toLocaleDateString("pt-BR",{month:"short"}).replace(".","");return s.charAt(0).toUpperCase()+s.slice(1)+" "+String(y).slice(2);}
function monthDiff(a,b){const[ay,am]=a.split("-").map(Number);const[by,bm]=b.split("-").map(Number);return(by-ay)*12+(bm-am);}
function cmp(a,b){return a<b?-1:a>b?1:0;}

/* Taxonomia completa (A Grande Planilha do Tesouro) */
const TAX={
  entrada:{label:"Receitas",grupos:{
    "Receitas":["Salário","Aluguel","Pensão","13º salário / Férias","PLR / Bônus / Comissão","Outros"]}},
  investimento:{label:"Investimentos",grupos:{
    "Investimentos":["Emergência","Educação","Aposentadoria","Outros projetos"]}},
  fixo:{label:"Despesas mensais fixas",grupos:{
    "Moradia / Habitação":["Aluguel","Condomínio","Financiamento casa","Diarista/Mensalista","Seguro da casa","IPTU"],
    "Educação":["Colégio","Faculdade","Idiomas / cursos"],
    "Transporte":["Prestação do carro","Seguro do carro","IPVA"],
    "Saúde":["Plano de saúde","Academia"],
    "Outros":["Seguro de vida","Empréstimos","Outros"]}},
  variavel:{label:"Despesas mensais variáveis",grupos:{
    "Habitação":["Luz","Internet / TV","Água","Gás","Telefone / celular","Outros"],
    "Transporte":["Combustível","Estacionamento","Taxi","Ônibus / metrô","Outros"],
    "Alimentação":["Supermercado","Feira / padaria","Outros"],
    "Lazer":["Viagens / Passeios","Cinema / teatro","Restaurantes / bares","Clube","Outros"],
    "Outros":["Tarifas Banco","Outros"]}},
  anual:{label:"Despesas anuais / eventuais",grupos:{
    "Educação":["Material escolar","Uniforme","Outros"],
    "Saúde":["Médico / Hospital","Medicamentos","Outros"],
    "Manutenção / prevenção":["Carro","Casa","Outros"],
    "Vestuário":["Roupas","Calçados","Acessórios","Outros"],
    "Cuidados pessoais":["Corte de cabelo","Estética / Manicure","Farmácia / Drogaria","Outros"],
    "Outros":["Presentes","Outros Impostos","Outros"]}}
};
const GMETA={
  "Receitas":{ic:"💵",cor:"#2f6f4e"},"Investimentos":{ic:"🌱",cor:"#1f6b46"},
  "Moradia / Habitação":{ic:"🏠",cor:"#e15a72"},"Habitação":{ic:"🏠",cor:"#e15a72"},
  "Alimentação":{ic:"🍽️",cor:"#e89a9a"},"Transporte":{ic:"🚲",cor:"#7fb0c0"},
  "Saúde":{ic:"❤️",cor:"#2d8aa0"},"Educação":{ic:"✏️",cor:"#3a4a7a"},
  "Lazer":{ic:"🎮",cor:"#b08bae"},"Vestuário":{ic:"👕",cor:"#9b7fae"},
  "Cuidados pessoais":{ic:"🧴",cor:"#c98a9a"},"Manutenção / prevenção":{ic:"🔧",cor:"#8a8a6a"},
  "Outros":{ic:"◇",cor:"#9a8f78"}
};
function gMeta(g){return GMETA[g]||{ic:"◇",cor:"#9a8f78"};}
const SECBASE={entrada:"#3f8f6b",investimento:"#2f6fb0",fixo:"#6e5aa8",variavel:"#c0338f",anual:"#d2772f"};
const SUBPAL=["#9a7b3f","#2f6f4e","#a8412f","#3a4a7a","#b08bae","#2d8aa0","#c98a9a","#7fb0c0","#8a8a6a","#9b7fae","#c47f3d","#5a8a6a"];
function subColor(sub){const s=String(sub||"");let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return SUBPAL[h%SUBPAL.length];}
function isDespesa(t){return t==="fixo"||t==="variavel"||t==="anual";}

/* ===== Estado ===== */
let state={entries:[],cards:[],plans:[],game:{}};
let mes=monthKey(new Date());
let annual=false;
let habitMode=false,activeHabitTab="habit",activeFinanceTab="mes",habitTableMin=false,moodMin=true,wkSideMin=true,selDay=null;
let qnFilter='todas',qnAlarmId=null,capFilter='todas',capEditId=null,wkFootTab='afazeres',wkFootMin=true;
let weekStart=new Date();
let seedWorld=null,activeSeedTab=null;
let anoSel=new Date().getFullYear();

function defaultsGame(g){
  g=g||{};
  if(g.passaporte==null)g.passaporte=0;
  if(!g.consignados)g.consignados=[
    {id:uid(),nome:"BB Consignado R$ 30.000",valor:1683.84,quitado:false,fim:"2028-04"},
    {id:uid(),nome:"BB Consignado R$ 10.000",valor:812.06,quitado:false,fim:"2026-10"},
    {id:uid(),nome:"BB Consignado R$ 20.000",valor:712.22,quitado:false,fim:"2030-01"},
    {id:uid(),nome:"BB Consignado R$ 6.900",valor:492.44,quitado:false,fim:"2027-11"}];
  if(!g.cheque)g.cheque={meta:3322.69,pago:0};
  if(!g.semCartao)g.semCartao=Array(30).fill(false);
  if(g.semCheque==null)g.semCheque=0;
  if(g.score==null)g.score=0;
  if(!g.habitos)g.habitos=[
    {id:uid(),txt:"Não usar delivery essa semana",eco:120,feito:false},
    {id:uid(),txt:"Levar marmita ao trabalho",eco:200,feito:false},
    {id:uid(),txt:"Sem compra por impulso",eco:150,feito:false},
    {id:uid(),txt:"Fazer mercado com lista",eco:100,feito:false},
    {id:uid(),txt:"Não parcelar nada novo",eco:0,feito:false},
    {id:uid(),txt:"Revisar o orçamento do mês",eco:0,feito:false}];
  if(!g.board)g.board=[];
  if(!g.boardLeanMig){g.board=[];g.boardLeanMig=true;}
  if(g.patrimonioBase==null)g.patrimonioBase=0;
  if(g.reservaGuardado==null)g.reservaGuardado=0;
  return g;
}

function load(){
  const raw=store.get();
  if(raw){try{state=JSON.parse(raw);}catch(e){}}
  if(!raw){seed();}
  state.entries=state.entries||[];state.cards=state.cards||[];state.plans=state.plans||[];
  state.faturas=state.faturas||[{cartao:"Itaú Platinum 0979",fech:"",venc:"23"},{cartao:"BB Smiles Infinite",fech:"",venc:""},{cartao:"BB Fácil Visa",fech:"",venc:""},{cartao:"Inter",fech:"",venc:"05"}];
  state.game=defaultsGame(state.game);
  state.habit=defaultsHabit(state.habit);
  state.asgard=defaultsAsgard(state.asgard);
  state.saude=defaultsSaude(state.saude);
  state.culture=defaultsCulture(state.culture);
  state.espelho=state.espelho||{};
  if(!state.planners)state.planners={};
  if(!raw)save();
}
function save(){store.set(JSON.stringify(state));scheduleSync();}

/* ===== Sincronização com Google Sheets (Apps Script Web App) ===== */
const SYNC_KEY="sfp_sync_url";
let syncUrl="";
try{syncUrl=localStorage.getItem(SYNC_KEY)||"";}catch(e){}
let _syncTimer=null;
function scheduleSync(){if(!syncUrl)return;clearTimeout(_syncTimer);_syncTimer=setTimeout(pushToSheets,900);}
function syncPayload(){
  const P={kind:"sfp",ts:Date.now()};
  // Lançamentos
  P.lancamentos=(state.entries||[]).map(e=>{
    const prev=num(e.prev!=null?e.prev:e.valor);const efet=e.efet!=null?num(e.efet):"";const dif=e.efet!=null?(num(e.efet)-prev):"";
    return {mes:e.mes,natureza:e.tipo,descricao:e.descricao||"",categoria:[e.grupo,e.sub].filter(Boolean).join(" › "),meio:e.meio||"",dataPrev:e.dPrev||"",dataReal:e.tipo==="investimento"?(e.status||""):(e.dReal||""),previsto:prev,efetivo:efet,diferenca:dif,recorrente:e.recorrente?"sim":""};
  });
  // Consignados
  P.consignados=((state.game&&state.game.consignados)||[]).map(c=>{
    const rest=c.fim?Math.max(0,monthDiff(mes,c.fim)+1):"";const saldo=rest!==""?num(c.valor)*rest:"";
    return {divida:c.nome,parcela:num(c.valor),restantes:c.quitado?0:rest,saldoDevedor:c.quitado?0:saldo,termino:c.fim||"",quitado:c.quitado?"sim":""};
  });
  // Parcelamentos
  P.parcelamentos=(state.cards||[]).map(c=>{
    const idx=monthDiff(c.inicio,mes)+1;const atual=(idx>=1&&idx<=c.parcelas)?idx:"";const rest=Math.max(0,c.parcelas-Math.max(0,idx));
    return {compra:c.descricao||"",cartao:c.bandeira||"",valorParcela:num(c.valor),atual:atual,total:c.parcelas,restantes:rest,saldoApagar:num(c.valor)*rest,inicio:c.inicio||""};
  });
  // Faturas
  P.faturas=(state.faturas||[]).map(f=>({cartao:f.cartao,fechamento:f.fech||"",vencimento:f.venc||""}));
  // Planos + roteiro + caixa
  P.planos=[];P.roteiro=[];P.caixa=[];
  (state.plans||[]).forEach(p=>{
    const inf=planInfo(p);const aporte=inf.total/(inf.parcelas||1);
    P.planos.push({titulo:p.titulo,tipo:p.tipo,categoria:[p.grupo,p.sub].filter(Boolean).join(" › "),meio:p.meio||"",dataPrev:p.dPrev||"",parcelas:inf.parcelas,inicio:inf.inicio,total:inf.total,aporteMes:aporte,ativo:p.ativo?"sim":""});
    if(p.tipo==="viagem"&&p.versoes){p.versoes.forEach(v=>{
      (v.roteiro||[]).forEach(s=>P.roteiro.push({viagem:p.titulo,versao:v.nome,dia:s.dia,atividade:s.atividade,custo:num(s.custo)}));
      (v.caixa||[]).forEach(c=>P.caixa.push({viagem:p.titulo,versao:v.nome,item:c.item,valor:num(c.valor)}));
    });}
  });
  // Metas
  const g=state.game||{};
  const metasDef=[
    {h:"Curto",nome:"Quitar cheque especial",cat:"Dívida",alvo:num(g.cheque&&g.cheque.meta),guard:num(g.cheque&&g.cheque.pago),prazo:"2026-06-30"},
    {h:"Curto",nome:"Reserva inicial (1 mês)",cat:"Reserva",alvo:Math.round(spendOf(mes))||3000,guard:num(g.reservaGuardado||0),prazo:"2026-09-30"},
    {h:"Longo",nome:"Nova York 2026",cat:"Viagem",alvo:30000,guard:(g.passaporte||0)*250,prazo:"2026-12-18"},
    {h:"Longo",nome:"Reserva de emergência",cat:"Reserva",alvo:15000,guard:num(g.reservaGuardado||0),prazo:"2027-06-01"},
    {h:"Longo",nome:"Patrimônio",cat:"Patrimônio",alvo:100000,guard:num(g.patrimonioBase||0),prazo:"2030-12-31"}
  ];
  P.metas=metasDef.map(m=>{const falta=Math.max(0,m.alvo-m.guard);const mr=monthsUntil(m.prazo);return {prazoTipo:m.h,meta:m.nome,categoria:m.cat,valorAlvo:m.alvo,guardado:m.guard,faltante:falta,prazo:m.prazo,mesesRestantes:mr,aporteMes:Math.round(falta/Math.max(1,mr)),progresso:m.alvo?Math.round(m.guard/m.alvo*100)+"%":"0%"};});
  // Indicadores
  P.indicadores=[
    ["Score",g.score||0],["Nível",nivelDe(g.score||0)[0]],
    ["Passaporte NY (células)",(g.passaporte||0)+"/120"],["Passaporte NY (guardado)",(g.passaporte||0)*250],
    ["Cheque especial — meta",num(g.cheque&&g.cheque.meta)],["Cheque especial — abatido",num(g.cheque&&g.cheque.pago)],
    ["Dias sem crédito",((g.semCartao||[]).filter(Boolean).length)+"/30"],["Dias seguidos no positivo",g.semCheque||0],
    ["Patrimônio inicial",num(g.patrimonioBase||0)],["Reserva guardada",num(g.reservaGuardado||0)],
    ["Renda líquida atual",incomeOf(mes)],["Economia ao quitar consignados",P.consignados.filter(c=>!c.quitado).reduce((s,c)=>s+c.parcela,0)]
  ];
  return P;
}
function pushToSheets(){if(!syncUrl)return;
  try{fetch(syncUrl,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(syncPayload())});
    const t=document.getElementById("syncTxt");if(t)t.textContent="Drive ✓";}catch(e){}
}
function refreshSyncBadge(){const dot=document.getElementById("syncDot"),txt=document.getElementById("syncTxt");if(!dot)return;if(syncUrl){dot.classList.add("on");if(txt)txt.textContent="Drive";}else{dot.classList.remove("on");if(txt)txt.textContent="local";}}
const _syncBtn=document.getElementById("syncBtn");if(_syncBtn)_syncBtn.onclick=()=>{document.getElementById("syncInput").value=syncUrl;openModal("syncModal");};
document.getElementById("syncSave").onclick=()=>{syncUrl=document.getElementById("syncInput").value.trim();try{localStorage.setItem(SYNC_KEY,syncUrl);}catch(e){}refreshSyncBadge();if(syncUrl)pushToSheets();closeModals();};
document.getElementById("syncTest").onclick=()=>{syncUrl=document.getElementById("syncInput").value.trim();try{localStorage.setItem(SYNC_KEY,syncUrl);}catch(e){}refreshSyncBadge();pushToSheets();};
document.getElementById("syncClear").onclick=()=>{syncUrl="";try{localStorage.removeItem(SYNC_KEY);}catch(e){}refreshSyncBadge();closeModals();};

/* ===== Semente vazia ===== */
function seed(){
  /* versão publicada: começa vazia; os dados reais entram pelo botão Importar ou pela sincronização */
  state.entries=[];state.cards=[];state.plans=[];state.game=defaultsGame({});
}

/* ===== Cálculos ===== */
function entriesOf(k,t){return state.entries.filter(e=>e.tipo===t&&(e.recorrente||e.mes===k));}
function sumEntries(k,t){return entriesOf(k,t).reduce((s,e)=>s+num(e.valor),0);}
function cardLoad(k){let t=0;state.cards.forEach(c=>{const end=addMonths(c.inicio,c.parcelas-1);if(cmp(k,c.inicio)>=0&&cmp(k,end)<=0)t+=num(c.valor);});return t;}
function verTotal(v){return (v.roteiro||[]).reduce((s,x)=>s+num(x.custo),0)+(v.caixa||[]).reduce((s,x)=>s+num(x.valor),0);}
function planInfo(p){
  if(p.tipo==="viagem"&&p.versoes){const v=p.versoes[p.versaoAtiva||0]||{};return {total:verTotal(v),parcelas:v.parcelas||1,inicio:v.inicio||mes};}
  return {total:num(p.valor),parcelas:p.parcelas||1,inicio:p.inicio||mes};
}
function planLoad(k){let t=0;state.plans.forEach(p=>{if(!p.ativo)return;const inf=planInfo(p);const end=addMonths(inf.inicio,inf.parcelas-1);if(cmp(k,inf.inicio)>=0&&cmp(k,end)<=0)t+=inf.total/inf.parcelas;});return t;}
function incomeOf(k){return sumEntries(k,"entrada");}
function investOf(k){return sumEntries(k,"investimento");}
function spendOf(k){return sumEntries(k,"fixo")+sumEntries(k,"variavel")+sumEntries(k,"anual");}
function freeOf(k){return incomeOf(k)-spendOf(k)-investOf(k)-cardLoad(k)-planLoad(k);}

/* ===== Mês ===== */
let catOpen=false;
let ledgerEdit=false;
function fmtDate(s){if(!s)return"";const p=String(s).split("-");return p.length===3?`${p[2]}/${p[1]}`:"";}
function difInfo(e){if(e.efet==null)return null;const dif=num(e.efet)-num(e.prev!=null?e.prev:e.valor);const bom=e.tipo==="fixo"||e.tipo==="variavel"||e.tipo==="anual"?dif<=0:dif>=0;return{dif,bom};}
function renderLedger(){
  const el=document.getElementById("secEntradas");
  ["secFixos"].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML="";});
  const secs=[["Receitas","entrada",1],["Investimentos","investimento",1],["Despesas fixas","fixo",-1],["Despesas variáveis","variavel",-1],["Eventuais / anuais","anual",-1]];
  let h=`<div class="ledgerbar"><span class="lbt">Planilha do mês</span><div class="acts">${ledgerEdit?'<button class="vedit on" id="ledgerSave">✓ Salvar</button><button class="vedit ghost" id="ledgerCancel">Cancelar</button>':'<button class="vedit" id="ledgerEditBtn">✎ Editar células</button>'}</div></div>`;
  h+=`<div class="ctblwrap ledger"><table class="ctbl grouped fam2"><thead><tr><th>Lançamento</th><th>Subcategoria</th><th>Forma</th><th>Data prev.</th><th>Real / status</th><th class="num">Previsto</th><th class="num">Efetivo</th><th class="num">Diferença</th><th></th></tr></thead><tbody>`;
  secs.forEach(s=>h+=sectionRows(s[0],s[1],s[2]));
  const tot=t=>{let p=0,e=0;entriesOf(mes,t).forEach(x=>{p+=num(x.prev!=null?x.prev:x.valor);e+=(x.efet!=null?num(x.efet):0);});return{p,e};};
  const r=tot("entrada"),iv=tot("investimento"),fx=tot("fixo"),vr=tot("variavel"),an=tot("anual"),fat=cardLoad(mes);
  const resP=r.p-iv.p-(fx.p+vr.p+fat+an.p), resE=r.e-iv.e-(fx.e+vr.e+an.e);
  h+=`<tr class="ctot final"><td>Resultado do mês · Receitas − Investimentos − Despesas</td><td></td><td></td><td></td><td></td><td class="num">${fmt0(resP)}</td><td class="num">${fmt0(resE)}</td><td class="num"></td><td></td></tr>`;
  h+=`</tbody></table></div>`;
  el.innerHTML=h;
}
function entryRow(e,tc,isInv){
  const prev=num(e.prev!=null?e.prev:e.valor);
  const di=difInfo(e);
  const d2=isInv?(e.status||"—"):(fmtDate(e.dReal)||"—");
  if(ledgerEdit){
    const pv=(''+prev).replace('.',','), ev=(e.efet!=null?(''+num(e.efet)).replace('.',','):'');
    return `<tr class="erowx ed" style="--gc:${tc}"><td><input class="celledit" data-eid="${e.id}" data-f="descricao" value="${hesc(e.descricao||'')}" placeholder="descrição"></td><td><span class="catdot" style="background:var(--gc)"></span>${e.sub||"—"}</td><td>${e.meio||"—"}</td><td>${fmtDate(e.dPrev)||"—"}</td><td>${d2}</td><td class="num"><input class="celledit num" data-eid="${e.id}" data-f="prev" inputmode="decimal" value="${pv}"></td><td class="num"><input class="celledit num" data-eid="${e.id}" data-f="efet" inputmode="decimal" value="${ev}" placeholder="—"></td><td class="num">${di?(di.dif>0?'+':'')+fmt0(di.dif):"—"}</td><td><button class="editlink" data-del="${e.id}">×</button></td></tr>`;
  }
  return `<tr class="erowx" style="--gc:${tc}"><td>${e.descricao||"—"}${e.recorrente?' <em class="rectag">rec.</em>':''}</td><td><span class="catdot" style="background:var(--gc)"></span>${e.sub||"—"}</td><td>${e.meio||"—"}</td><td>${fmtDate(e.dPrev)||"—"}</td><td>${d2}</td><td class="num">${fmt0(prev)}</td><td class="num">${e.efet!=null?fmt0(num(e.efet)):"—"}</td><td class="num" style="color:${di?(di.bom?'var(--pos)':'var(--neg)'):'var(--ink-soft)'}">${di?(di.dif>0?'+':'')+fmt0(di.dif):"—"}</td><td><button class="editlink" data-del="${e.id}">×</button></td></tr>`;
}
function sectionRows(titulo,tipo,sign){
  const items=entriesOf(mes,tipo);
  const isInv=tipo==="investimento",isRec=tipo==="entrada";
  const P=e=>num(e.prev!=null?e.prev:e.valor), E=e=>(e.efet!=null?num(e.efet):0);
  const base=SECBASE[tipo]||"#9a8f78";
  const order=Object.keys((TAX[tipo]||{grupos:{}}).grupos);
  const groups={};items.forEach(e=>{const g=e.grupo||"Outros";(groups[g]=groups[g]||[]).push(e);});
  const ordered=order.filter(g=>groups[g]).concat(Object.keys(groups).filter(g=>!order.includes(g)));
  let faturas=[],faturaSum=0;
  if(tipo==="variavel"){faturas=state.cards.filter(c=>{const i=monthDiff(c.inicio,mes)+1;return i>=1&&i<=c.parcelas;});faturaSum=faturas.reduce((s,c)=>s+num(c.valor),0);}
  let cons=[],consSum=0;
  if(tipo==="fixo"){cons=(state.game.consignados||[]).filter(c=>!c.quitado&&c.fim&&cmp(mes,c.fim)<=0);consSum=cons.reduce((s,c)=>s+num(c.valor),0);}
  const sPrev=items.reduce((s,e)=>s+P(e),0)+faturaSum, sEfet=items.reduce((s,e)=>s+E(e),0);
  let ti=0;const tone=()=>`color-mix(in srgb, ${base} ${Math.max(45,100-(ti++)*12)}%, white)`;
  let h=`<tr class="gband" style="--secc:${base}"><td colspan="9"><div class="gbandinner"><span>${titulo}</span><b>${sign>0?'+':'−'}${fmt0(sPrev)}</b></div></td></tr>`;
  const hasAny=items.length||faturas.length||cons.length;
  if(faturas.length){const tc=tone();
    h+=`<tr class="grow" style="--gc:${tc}"><td colspan="5"><span class="gic">💳</span>Faturas de cartão</td><td class="num">${fmt0(faturaSum)}</td><td class="num"></td><td class="num"></td><td></td></tr>`;
    faturas.forEach(c=>{const idx=monthDiff(c.inicio,mes)+1;h+=`<tr class="erowx" style="--gc:${tc}"><td>${c.descricao||"Fatura"} <em class="rectag">${c.bandeira}</em></td><td><span class="catdot" style="background:var(--gc)"></span>${c.bandeira}</td><td>Cartão</td><td>—</td><td>${idx}/${c.parcelas}</td><td class="num">${fmt0(num(c.valor))}</td><td class="num">—</td><td class="num">—</td><td></td></tr>`;});}
  ordered.forEach(g=>{const m=gMeta(g);const grp=groups[g];const tc=tone();
    const gp=grp.reduce((s,e)=>s+P(e),0), ge=grp.reduce((s,e)=>s+E(e),0);
    h+=`<tr class="grow" style="--gc:${tc}"><td colspan="5"><span class="gic">${m.ic}</span>${g}</td><td class="num">${fmt0(gp)}</td><td class="num">${ge?fmt0(ge):""}</td><td class="num">${ge?fmt0(ge-gp):""}</td><td></td></tr>`;
    grp.forEach(e=>{const prev=P(e);const di=difInfo(e);const d2=isInv?(e.status||"—"):(fmtDate(e.dReal)||"—");
      h+=`<tr class="erowx" style="--gc:${tc}"><td>${e.descricao||"—"}${e.recorrente?' <em class="rectag">rec.</em>':''}</td><td><span class="catdot" style="background:var(--gc)"></span>${e.sub||"—"}</td><td>${e.meio||"—"}</td><td>${fmtDate(e.dPrev)||"—"}</td><td>${d2}</td><td class="num">${fmt0(prev)}</td><td class="num">${e.efet!=null?fmt0(num(e.efet)):"—"}</td><td class="num" style="color:${di?(di.bom?'var(--pos)':'var(--neg)'):'var(--ink-soft)'}">${di?(di.dif>0?'+':'')+fmt0(di.dif):"—"}</td><td><button class="editlink" data-del="${e.id}">×</button></td></tr>`;});});
  if(cons.length){const tc=tone();
    h+=`<tr class="grow" style="--gc:${tc}"><td colspan="5"><span class="gic">🔒</span>Consignados · em folha</td><td class="num">${fmt0(consSum)}</td><td class="num"></td><td class="num"></td><td></td></tr>`;
    cons.forEach(c=>{const left=monthDiff(mes,c.fim)+1;h+=`<tr class="erowx folha" style="--gc:${tc}"><td>${c.nome}</td><td><span class="catdot" style="background:var(--gc)"></span>em folha</td><td>Folha</td><td>—</td><td>${left} rest.</td><td class="num">${fmt0(num(c.valor))}</td><td class="num">—</td><td class="num">—</td><td></td></tr>`;});}
  {const sd=sEfet-sPrev;h+=`<tr class="ctot"><td>Total ${titulo}</td><td></td><td></td><td></td><td></td><td class="num">${fmt0(sPrev)}</td><td class="num">${fmt0(sEfet)}</td><td class="num">${fmt0(sd)}</td><td></td></tr>`;}
  if(cons.length)h+=`<tr class="folhanote"><td colspan="9">🔒 Consignados (${fmt0(consSum)}/mês) descontados na folha — fora do líquido, não entram no total nem no saldo.</td></tr>`;
  return h;
}
function secList(elId,titulo,tipo,sign){
  const el=document.getElementById(elId);const items=entriesOf(mes,tipo);
  const isInv=tipo==="investimento",isRec=tipo==="entrada",isDesp=!isInv&&!isRec;
  const hPrev=isInv?"Aporte prev.":"Valor prev.";
  const hEfet=isInv?"Aporte real.":"Valor efet.";
  const hD1=isDesp?"Vencimento":"Data prev.";
  const hD2=isRec?"Data Rcto.":isInv?"Status":"Data Pgto.";
  const P=e=>num(e.prev!=null?e.prev:e.valor), E=e=>(e.efet!=null?num(e.efet):0);
  const base=SECBASE[tipo]||"#9a8f78";
  const order=Object.keys((TAX[tipo]||{grupos:{}}).grupos);
  const groups={};items.forEach(e=>{const g=e.grupo||"Outros";(groups[g]=groups[g]||[]).push(e);});
  const ordered=order.filter(g=>groups[g]).concat(Object.keys(groups).filter(g=>!order.includes(g)));
  let faturas=[],faturaSum=0;
  if(tipo==="variavel"){faturas=state.cards.filter(c=>{const i=monthDiff(c.inicio,mes)+1;return i>=1&&i<=c.parcelas;});faturaSum=faturas.reduce((s,c)=>s+num(c.valor),0);}
  let cons=[],consSum=0;
  if(tipo==="fixo"){cons=(state.game.consignados||[]).filter(c=>!c.quitado&&c.fim&&cmp(mes,c.fim)<=0);consSum=cons.reduce((s,c)=>s+num(c.valor),0);}
  const sPrevE=items.reduce((s,e)=>s+P(e),0), sEfetE=items.reduce((s,e)=>s+E(e),0);
  const sPrev=sPrevE+faturaSum, sEfet=sEfetE;
  let ti=0;const tone=()=>`color-mix(in srgb, var(--bc) ${Math.max(45,100-(ti++)*12)}%, white)`;
  let h=`<div class="ctblwrap"><table class="ctbl grouped fam" style="--bc:${base}"><thead><tr><th>Lançamento</th><th>Subcategoria</th><th>Forma</th><th>${hD1}</th><th>${hD2}</th><th class="num">${hPrev}</th><th class="num">${hEfet}</th><th class="num">Diferença</th><th></th></tr></thead><tbody>`;
  h+=`<tr class="gband"><td colspan="9"><div class="gbandinner"><span>${titulo}</span><b>${sign>0?'+':'−'}${fmt0(sPrev)}</b></div></td></tr>`;
  const hasAny=items.length||faturas.length||cons.length;
  if(!hasAny)h+=`<tr><td colspan="9" class="cempty">Nada por aqui. Toque em ＋ Lançamento, no topo.</td></tr>`;
  if(faturas.length){const tc=tone();
    h+=`<tr class="grow" style="--gc:${tc}"><td colspan="5"><span class="gic">💳</span>Faturas de cartão</td><td class="num">${fmt0(faturaSum)}</td><td class="num"></td><td class="num"></td><td></td></tr>`;
    faturas.forEach(c=>{const idx=monthDiff(c.inicio,mes)+1;h+=`<tr class="erowx" style="--gc:${tc}"><td>${c.descricao||"Fatura"} <em class="rectag">${c.bandeira}</em></td><td><span class="catdot" style="background:var(--gc)"></span>${c.bandeira}</td><td>Cartão</td><td>—</td><td>${idx}/${c.parcelas}</td><td class="num">${fmt0(num(c.valor))}</td><td class="num">—</td><td class="num">—</td><td></td></tr>`;});}
  ordered.forEach(g=>{const m=gMeta(g);const grp=groups[g];const tc=tone();
    const gp=grp.reduce((s,e)=>s+P(e),0), ge=grp.reduce((s,e)=>s+E(e),0);
    h+=`<tr class="grow" style="--gc:${tc}"><td colspan="5"><span class="gic">${m.ic}</span>${g}</td><td class="num">${fmt0(gp)}</td><td class="num">${ge?fmt0(ge):""}</td><td class="num">${ge?fmt0(ge-gp):""}</td><td></td></tr>`;
    grp.forEach(e=>{const prev=P(e);const di=difInfo(e);const d2=isInv?(e.status||"—"):(fmtDate(e.dReal)||"—");
      h+=`<tr class="erowx" style="--gc:${tc}"><td>${e.descricao||"—"}${e.recorrente?' <em class="rectag">rec.</em>':''}</td><td><span class="catdot" style="background:var(--gc)"></span>${e.sub||"—"}</td><td>${e.meio||"—"}</td><td>${fmtDate(e.dPrev)||"—"}</td><td>${d2}</td><td class="num">${fmt0(prev)}</td><td class="num">${e.efet!=null?fmt0(num(e.efet)):"—"}</td><td class="num" style="color:${di?(di.bom?'var(--pos)':'var(--neg)'):'var(--ink-soft)'}">${di?(di.dif>0?'+':'')+fmt0(di.dif):"—"}</td><td><button class="editlink" data-del="${e.id}">×</button></td></tr>`;});});
  if(cons.length){const tc=tone();
    h+=`<tr class="grow" style="--gc:${tc}"><td colspan="5"><span class="gic">🔒</span>Consignados · em folha</td><td class="num">${fmt0(consSum)}</td><td class="num"></td><td class="num"></td><td></td></tr>`;
    cons.forEach(c=>{const left=monthDiff(mes,c.fim)+1;h+=`<tr class="erowx folha" style="--gc:${tc}"><td>${c.nome}</td><td><span class="catdot" style="background:var(--gc)"></span>em folha</td><td>Folha</td><td>—</td><td>${left} rest.</td><td class="num">${fmt0(num(c.valor))}</td><td class="num">—</td><td class="num">—</td><td></td></tr>`;});}
  if(hasAny){const sd=sEfet-sPrev;h+=`<tr class="ctot"><td>Total ${titulo}</td><td></td><td></td><td></td><td></td><td class="num">${fmt0(sPrev)}</td><td class="num">${fmt0(sEfet)}</td><td class="num">${fmt0(sd)}</td><td></td></tr>`;}
  if(cons.length)h+=`<tr class="folhanote"><td colspan="9">🔒 Consignados (${fmt0(consSum)}/mês) são descontados na folha — já fora do líquido, não entram no total acima nem no saldo.</td></tr>`;
  h+=`</tbody></table></div>`;
  el.innerHTML=h;
}
function entryPrev(e){return num(e.prev!=null?e.prev:e.valor);}
function entryEfet(e){return e.efet!=null?num(e.efet):entryPrev(e);}
function sumBy(tipo,fn){return entriesOf(mes,tipo).reduce((s,e)=>s+fn(e),0);}
function renderMes(){
  renderLedger();
  const inPrev=sumBy("entrada",entryPrev),inEfet=sumBy("entrada",entryEfet);
  const despPrev=sumBy("fixo",entryPrev)+sumBy("variavel",entryPrev)+sumBy("anual",entryPrev);
  const despEfet=sumBy("fixo",entryEfet)+sumBy("variavel",entryEfet)+sumBy("anual",entryEfet);
  const pc=cardLoad(mes);
  const outPrev=despPrev+pc,outEfet=despEfet+pc;
  const bal=inEfet-outEfet;
  const big=document.getElementById("balBig");big.textContent=fmt0(bal);
  big.style.color=bal>=0?"var(--pos-soft)":"var(--neg-soft)";
  document.getElementById("balInPrev").textContent=fmt0(inPrev);
  document.getElementById("balInEfet").textContent=fmt0(inEfet);
  document.getElementById("balOutPrev").textContent=fmt0(outPrev);
  document.getElementById("balOutEfet").textContent=fmt0(outEfet);
  renderCategorias();
  const mc=document.getElementById("secMesCompromissos");if(mc)mc.innerHTML="";
}
function renderMesCompromissos(){
  const el=document.getElementById("secMesCompromissos");if(!el)return;
  const live=state.cards.filter(c=>{const idx=monthDiff(c.inicio,mes)+1;return idx>=1&&idx<=c.parcelas;});
  const cons=(state.game.consignados||[]).filter(c=>!c.quitado&&c.fim&&cmp(mes,c.fim)<=0);
  if(!live.length&&!cons.length){el.innerHTML="";return;}
  const totConta=cardLoad(mes);
  let h=`<div class="sec-h"><span class="t">Faturas e compromissos do mês</span><span class="sum neg">−${fmt0(totConta)}</span></div>`;
  h+=`<div class="ctblwrap"><table class="ctbl grouped"><thead><tr><th>Cartão / compromisso</th><th>Parcela</th><th class="num">Valor no mês</th><th></th></tr></thead><tbody>`;
  const byCard={};live.forEach(c=>{(byCard[c.bandeira||"Cartão"]=byCard[c.bandeira||"Cartão"]||[]).push(c);});
  Object.keys(byCard).forEach(b=>{const es=byCard[b];const v=es.reduce((s,c)=>s+num(c.valor),0);
    h+=`<tr class="grow" style="--gc:var(--brass)"><td colspan="2"><span class="gic">💳</span>${b}</td><td class="num">${fmt0(v)}</td><td></td></tr>`;
    es.forEach(c=>{const idx=monthDiff(c.inicio,mes)+1;h+=`<tr class="erowx" style="--gc:var(--brass)"><td>${c.descricao||"—"}</td><td>${idx}/${c.parcelas}</td><td class="num">${fmt0(num(c.valor))}</td><td></td></tr>`;});});
  if(live.length)h+=`<tr class="ctot"><td>Total que sai da conta</td><td></td><td class="num">${fmt0(totConta)}</td><td></td></tr>`;
  if(cons.length){const ct=cons.reduce((s,c)=>s+num(c.valor),0);
    h+=`<tr class="grow" style="--gc:#a8412f"><td colspan="2"><span class="gic">🔒</span>Consignados — descontados em folha</td><td class="num">${fmt0(ct)}</td><td></td></tr>`;
    cons.forEach(c=>{const left=monthDiff(mes,c.fim)+1;h+=`<tr class="erowx" style="--gc:#a8412f"><td>${c.nome}</td><td>${left} rest.</td><td class="num">${fmt0(num(c.valor))}</td><td></td></tr>`;});}
  h+=`</tbody></table></div><p class="intro" style="margin:4px 2px 0">Os cartões saem da conta neste mês; os consignados já vêm descontados na folha.</p>`;
  el.innerHTML=h;
}
function bucket503(e){
  if(e.tipo==='investimento')return 'fut';
  const g=e.grupo||'Outros';const sub=e.sub||'';
  if(/empr[eé]stimo|consignad/i.test(sub)||/empr[eé]stimo/i.test(g))return 'fut';
  const WANT={"Lazer":1,"Vestuário":1,"Cuidados pessoais":1};
  if(WANT[g])return 'want';
  return 'need';
}
function renderCategorias(){
  const el=document.getElementById("secCategorias");if(!el)return;
  const renda=entriesOf(mes,'entrada').reduce((s,e)=>s+num(e.prev!=null?e.prev:e.valor),0);
  let need=0,want=0,fut=0;
  ['fixo','variavel','anual'].forEach(t=>entriesOf(mes,t).forEach(e=>{const v=num(e.prev!=null?e.prev:e.valor);const b=bucket503(e);if(b==='want')want+=v;else if(b==='fut')fut+=v;else need+=v;}));
  entriesOf(mes,'investimento').forEach(e=>{fut+=num(e.prev!=null?e.prev:e.valor);});
  want+=cardLoad(mes);
  const buckets=[
    {k:'need',nm:'Necessidades',tg:50,val:need,cor:'#2d8aa0',hint:'moradia · contas · mercado · saúde'},
    {k:'want',nm:'Desejos',tg:30,val:want,cor:'#c0338f',hint:'lazer · restaurantes · cartão'},
    {k:'fut',nm:'Futuro',tg:20,val:fut,cor:'#2f6f4e',hint:'investir · reserva · quitar dívida'}
  ];
  let h=`<div class="rule503"><div class="rhd"><div class="rt">Regra 50 · 30 · 20 <small>vs. seu mês</small></div><div class="rbase">renda do mês<b>${fmt0(renda)}</b></div></div>`;
  if(renda<=0){
    h+=`<div class="rempty">Lance suas <b>receitas</b> do mês para comparar seus gastos ao padrão 50 · 30 · 20.</div></div>`;
    el.innerHTML=h;return;
  }
  buckets.forEach(b=>{
    const pct=b.val/renda*100,ideal=renda*b.tg/100,fillW=Math.min(100,pct);
    let st,cls;
    if(b.k==='fut'){if(pct>=b.tg){st='no caminho';cls='ok';}else{st='abaixo do ideal';cls='under';}}
    else{if(pct<=b.tg){st='dentro';cls='ok';}else{st='acima do ideal';cls='over';}}
    h+=`<div class="r3row"><div class="r3hd"><div class="r3n"><span class="sw" style="background:${b.cor}"></span>${b.nm} <em>${b.tg}% · ${b.hint}</em></div><div class="r3v">${Math.round(pct)}%</div></div>`;
    h+=`<div class="r3bar"><i style="width:${fillW}%;background:${b.cor}"></i><span class="mk" style="left:${b.tg}%"></span></div>`;
    h+=`<div class="r3foot"><span class="tg">real ${fmt0(b.val)} · ideal ${fmt0(ideal)}</span><span class="st ${cls}">${st}</span></div></div>`;
  });
  const sobra=renda-need-want-fut;
  h+=`<div class="rsum"><span class="l">${sobra>=0?'Não alocado / folga':'Estourou a renda em'}</span><span class="v" style="color:${sobra>=0?'var(--pos)':'var(--neg)'}">${fmt0(Math.abs(sobra))}</span></div>`;
  h+=`<div class="rnote">Despesas do mês classificadas em necessidades, desejos (inclui faturas de cartão) e futuro (aportes de investimento). A linha preta marca a meta de cada balde.</div></div>`;
  el.innerHTML=h;
}

/* ===== Anual ===== */
function renderAnual(){
  const el=document.getElementById("anualView");
  const y=anoSel;
  const mns=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const keys=mns.map((_,i)=>y+"-"+pad(i+1));
  const rec=keys.map(incomeOf),gas=keys.map(spendOf),car=keys.map(cardLoad),pl=keys.map(planLoad);
  const sal=keys.map((k,i)=>rec[i]-gas[i]-car[i]-pl[i]);
  let acc=0;const ac=sal.map(s=>acc+=s);
  function tr(lbl,arr,cls){let r=`<tr class="${cls||''}"><td>${lbl}</td>`;arr.forEach(v=>{r+=`<td class="${v<0?'neg-c':''}" title="${fmt0(v)}">${fmtK(v)}</td>`;});return r+"</tr>";}
  let h=`<div class="yearbar"><span class="vsection" style="margin:0">📊 Visão anual</span><span class="yearpick"><button data-anom="-1">‹</button><b>${y}</b><button data-anom="1">›</button></span></div>`;
  h+=`<div class="annual"><table><thead><tr><th>${y}</th>`;
  mns.forEach(m=>h+=`<th>${m}</th>`);h+=`</tr></thead><tbody>`;
  h+=tr("Receitas",rec);h+=tr("Gastos",gas);h+=tr("Cartões",car);h+=tr("Viagens/planos",pl);
  h+=tr("Saldo",sal,"tot");h+=tr("Acumulado",ac,"tot");
  h+=`</tbody></table></div><p class="intro" style="margin-top:10px">Ano de ${y}, mês a mês. As receitas recorrentes e parcelas se distribuem automaticamente.</p>`;
  el.innerHTML=h;
}
function applyView(){
  document.getElementById("mesNormal").style.display=annual?"none":"block";
  document.getElementById("anualView").style.display=annual?"block":"none";
  const vt2=document.getElementById("viewTog");if(vt2){vt2.classList.toggle("on",annual);vt2.textContent=annual?"Mês":"Ano";}
  updateHeader();
  if(annual)renderAnual();
}
function curTab(){const t=document.querySelector('.tab[aria-selected="true"]');return t?t.dataset.tab:"mes";}
function updateHeader(){
  const prev=document.getElementById("prevM"),next=document.getElementById("nextM"),vt=document.getElementById("viewTog"),lab=document.getElementById("monthLabel");
  if(!prev||!next||!vt||!lab)return;
  prev.style.visibility="visible";next.style.visibility="visible";
  if(seedWorld){vt.style.visibility="hidden";prev.style.visibility="hidden";next.style.visibility="hidden";lab.textContent=SEED_WORLDS[seedWorld].nome;return;}
  if(habitMode){vt.style.visibility="hidden";lab.textContent=monthLabel(mes);return;}
  vt.style.visibility=(curTab()==="mes")?"visible":"hidden";
  lab.textContent=annual?(anoSel+" · ano"):monthLabel(mes);
}

/* ===== Cartão ===== */
function commitmentsList(){
  const arr=[];
  (state.game.consignados||[]).forEach(c=>{if(c.quitado)return;arr.push({tipo:"consignado",id:c.id,nome:c.nome,valor:num(c.valor),inicio:mes,fim:c.fim||null});});
  state.cards.forEach(c=>{arr.push({tipo:"parcelamento",id:c.id,nome:c.descricao,band:c.bandeira,valor:num(c.valor),inicio:c.inicio,fim:addMonths(c.inicio,c.parcelas-1)});});
  return arr;
}
function renderCompromissos(){
  const g=state.game;const ativos=(g.consignados||[]).filter(c=>!c.quitado);
  const totC=ativos.reduce((s,c)=>s+num(c.valor),0);
  // ----- Consignados: Dívida | Parcela | Restantes | Saldo devedor | Término -----
  let hc=`<div class="sec-h"><span class="t">Compromissos e consignados</span><span class="sum neg">−${fmt0(totC)}</span></div>`;
  hc+=`<div class="ctblwrap"><table class="ctbl"><thead><tr><th>Dívida</th><th class="num">Parcela</th><th class="num">Restantes</th><th class="num">Saldo devedor</th><th>Término</th><th></th></tr></thead><tbody>`;
  if(!(g.consignados||[]).length)hc+=`<tr><td colspan="6" class="cempty">Nenhum consignado.</td></tr>`;
  else g.consignados.forEach(c=>{const rest=c.fim?Math.max(0,monthDiff(mes,c.fim)+1):null;const saldo=rest!=null?num(c.valor)*rest:null;
    hc+=`<tr style="${c.quitado?'opacity:.45':''}"><td>${c.nome}</td><td class="num">${fmt0(num(c.valor))}</td><td class="num">${c.quitado?0:(rest!=null?rest:"—")}</td><td class="num">${c.quitado?fmt0(0):(saldo!=null?fmt0(saldo):"—")}</td><td>${c.fim?monthShort(c.fim):"a definir"}</td><td><button class="editlink" data-editcons="${c.id}">editar</button></td></tr>`;});
  const saldoTot=(g.consignados||[]).filter(c=>!c.quitado).reduce((s,c)=>s+(c.fim?num(c.valor)*Math.max(0,monthDiff(mes,c.fim)+1):0),0);
  hc+=`<tr class="ctot"><td>TOTAL</td><td class="num">${fmt0(totC)}</td><td class="num"></td><td class="num">${saldoTot?fmt0(saldoTot):"—"}</td><td></td><td></td></tr>`;
  hc+=`</tbody></table></div>`;
  hc+=`<div class="libpanel"><div class="presa"><div class="lbl">Economia futura</div><div class="n" style="color:var(--pos)">${fmt0(totC)}</div></div><div class="livre"><div class="lbl">Renda disponível futura</div><div class="n" style="color:var(--pos)">${fmt0(incomeOf(mes)+totC)}</div></div></div>`;
  hc+=`<div class="tb" style="font-size:11.5px;color:var(--ink-soft);margin-top:8px;line-height:1.5">Some a renda líquida de hoje à economia que cada consignado devolve ao terminar.</div>`;
  hc+=`<button class="addmini" id="consNew">+ Adicionar compromisso</button>`;
  document.getElementById("secConsignados").innerHTML=hc;
  // ----- Parcelamentos: Compra | Cartão | Valor parcela | Parc. atual | Total parc. | Restantes | Saldo a pagar -----
  const totP=cardLoad(mes);
  let hp=`<div class="sec-h"><span class="t">Cartões e parcelas futuras</span><span class="sum neg">−${fmt0(totP)}</span></div>`;
  hp+=`<div class="ctblwrap"><table class="ctbl"><thead><tr><th>Compra</th><th>Cartão</th><th class="num">Parcela</th><th class="num">Atual</th><th class="num">Total</th><th class="num">Rest.</th><th class="num">Saldo</th><th></th></tr></thead><tbody>`;
  if(!state.cards.length)hp+=`<tr><td colspan="8" class="cempty">Nenhum parcelamento. Toque abaixo para adicionar.</td></tr>`;
  else state.cards.forEach(c=>{const idx=monthDiff(c.inicio,mes)+1;const live=idx>=1&&idx<=c.parcelas;const rest=Math.max(0,c.parcelas-Math.max(0,idx));const saldo=num(c.valor)*rest;
    hp+=`<tr style="${live?'':'opacity:.5'}"><td>${c.descricao||"—"}</td><td>${c.bandeira||"—"}</td><td class="num">${fmt0(num(c.valor))}</td><td class="num">${live?idx:"–"}</td><td class="num">${c.parcelas}</td><td class="num">${rest}</td><td class="num">${fmt0(saldo)}</td><td><button class="editlink" data-delc="${c.id}">×</button></td></tr>`;});
  hp+=`<tr class="ctot"><td>TOTAL no mês</td><td></td><td class="num">${fmt0(totP)}</td><td></td><td></td><td></td><td></td><td></td></tr>`;
  hp+=`</tbody></table></div>`;
  document.getElementById("secParcelamentos").innerHTML=hp;
  // ----- Calendário de faturas -----
  let hf=`<div class="sec-h"><span class="t">Calendário de faturas</span></div>`;
  hf+=`<div class="ctblwrap"><table class="ctbl"><thead><tr><th>Cartão</th><th class="num">Fechamento (dia)</th><th class="num">Vencimento (dia)</th></tr></thead><tbody>`;
  (state.faturas||[]).forEach((f,i)=>{hf+=`<tr><td>${f.cartao}</td><td class="num"><input class="dayin" data-fat="${i}:fech" inputmode="numeric" maxlength="2" value="${f.fech||""}" placeholder="–"></td><td class="num"><input class="dayin" data-fat="${i}:venc" inputmode="numeric" maxlength="2" value="${f.venc||""}" placeholder="–"></td></tr>`;});
  hf+=`</tbody></table></div><div class="tb" style="font-size:11.5px;color:var(--ink-soft);margin-top:8px;line-height:1.5">Comprar logo após o <b>fechamento</b> dá quase 40 dias até o <b>vencimento</b>.</div>`;
  document.getElementById("secFaturas").innerHTML=hf;
  // timeline
  document.getElementById("secTimeline").innerHTML=renderTimeline();
}
function consignadoMes(k){return (state.game.consignados||[]).filter(c=>!c.quitado&&c.fim&&cmp(k,c.fim)<=0&&cmp(k,mes)>=0).reduce((s,c)=>s+num(c.valor),0);}
function renderTimeline(){
  const rows=[];
  (state.game.consignados||[]).forEach(c=>{if(c.quitado)return;rows.push({nome:c.nome,tipo:"consignado",inicio:mes,fim:c.fim||null,val:num(c.valor)});});
  const byCard={};state.cards.forEach(c=>{const k=c.bandeira||"Cartão";(byCard[k]=byCard[k]||[]).push(c);});
  Object.keys(byCard).forEach(band=>{const es=byCard[band];let ini=null,fim=null;
    es.forEach(c=>{const s=c.inicio,e=addMonths(c.inicio,c.parcelas-1);if(ini==null||cmp(s,ini)<0)ini=s;if(fim==null||cmp(e,fim)>0)fim=e;});
    rows.push({nome:band,tipo:"parcelamento",inicio:ini,fim:fim,entries:es});});
  const N=18;const cols=[];for(let i=0;i<N;i++)cols.push(addMonths(mes,i));
  function valNow(row){if(row.tipo==="consignado")return row.val;return row.entries.reduce((s,c)=>{const idx=monthDiff(c.inicio,mes)+1;return s+((idx>=1&&idx<=c.parcelas)?num(c.valor):0);},0);}
  const live=rows.map(row=>({row,rem:row.fim?monthDiff(mes,row.fim)+1:N})).filter(x=>x.rem>0).sort((a,b)=>b.rem-a.rem);
  let h=`<div class="tk">`;
  if(!live.length)h+=`<div class="tkempty">Nenhum compromisso ativo. Cartões parcelados e consignados aparecem aqui como faixas de duração.</div>`;
  live.forEach(({row,rem})=>{
    const col=row.tipo==="consignado"?"#a8412f":"var(--brass)";
    const startOff=Math.max(0,monthDiff(mes,row.inicio));
    const endOff=Math.min(N-1,row.fim?monthDiff(mes,row.fim):N-1);
    const leftPct=startOff/N*100, widthPct=Math.max(7,(endOff-startOff+1)/N*100);
    const vn=valNow(row);
    h+=`<div class="tkrow"><div class="tkh"><span class="tkdot" style="background:${col}"></span><span class="tknm">${row.nome}</span><span class="tkval">${vn?fmt0(vn):"—"}<small>/mês</small></span></div>`;
    h+=`<div class="tktrack"><div class="tkfill" style="left:${leftPct}%;width:${widthPct}%;background:linear-gradient(90deg,${col},color-mix(in srgb,${col} 60%,white))"><span class="tkrem">${rem>N?rem+'+':rem} ${rem===1?'mês':'meses'}</span></div></div></div>`;
  });
  if(live.length)h+=`<div class="tkscale">`+cols.map((k,i)=>`<span>${i%3===0?monthShort(k).split(" ")[0]:""}</span>`).join("")+`</div>`;
  const loadNow=cardLoad(mes)+consignadoMes(mes), freeNow=freeOf(mes);
  h+=`<div class="tksum"><div class="tksumc load"><div class="sl">Compromissos neste mês</div><div class="sv">${fmt0(loadNow)}</div><div class="ss">cartões + consignados</div></div><div class="tksumc free"><div class="sl">Saldo livre previsto</div><div class="sv">${fmt0(freeNow)}</div><div class="ss">${monthShort(mes)}</div></div></div>`;
  h+=`</div>`;
  return h;
}


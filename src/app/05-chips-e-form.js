/* chips e form */
(function(){
 var h='<button class="chip" data-c="todos" aria-pressed="true">todos</button>';
 for(var i=0;i<CANAIS.length;i++) h+='<button class="chip" data-c="'+CANAIS[i].id+'" aria-pressed="false">'+CANAIS[i].n+'</button>';
 h+='<button class="chip" id="chip-disp" aria-pressed="false">s&oacute; o que d&aacute; agora</button>';
 el("chips").innerHTML=h;
 var cs=el("chips").querySelectorAll(".chip[data-c]");
 for(var j=0;j<cs.length;j++) cs[j].addEventListener("click",function(){
  filtro=this.getAttribute("data-c");
  for(var k=0;k<cs.length;k++) cs[k].setAttribute("aria-pressed",cs[k]===this?"true":"false");
  pintaDeck();});
 el("chip-disp").addEventListener("click",function(){
  soDisp=!soDisp; this.setAttribute("aria-pressed",soDisp?"true":"false"); pintaDeck();});
 var o="";
 for(var m=0;m<CANAIS.length;m++) o+='<option value="'+CANAIS[m].id+'">'+CANAIS[m].n+'</option>';
 el("n-canal").innerHTML=o;
})();

function liga(id,fn){var b=el(id); if(b) b.addEventListener("click",fn);}
liga("b-cer",function(){ if(S.carga<25)return; move(-18,18,"Cerco: muitos golpes baratos at&eacute; a pilha ceder.",false,6,3,0);});
liga("b-rup",function(){ if(S.carga<LIMIAR||S.usos.rup>=(temAr("rup2")?2:1)||!pm().rup)return; S.usos.rup++;
 if(Math.random()*100<risco()){ S.falsos++;
  move(-35,0,"QUEIMA SECA por satura&ccedil;&atilde;o. Carga cheia, antena entupida &mdash; a corrente saiu inteira e n&atilde;o voltou nada.",true,0,0,1); return; }
 move(-35,pm().rupDom,"Ruptura. Ramos podados, n&oacute; desfeito no ponto exato."+
  (pm().rupDom<45?" Protocolo de leitura: parte do rendimento foi para o estudo.":""),false,10,8,0);});
liga("b-for",function(){ if(S.carga>=LIMIAR||S.carga<35)return; S.falsos++;
 move(-35,0,"QUEIMA SECA. Ruptura for&ccedil;ada sob o ponto de igni&ccedil;&atilde;o &mdash; gasto integral, voo nenhum.",true,0,0,1);});
liga("b-rede",function(){ if(S.usos.rede>=2)return; S.usos.rede++; S.ultCont=hoje(); move(22,2,"Convoca&ccedil;&atilde;o de Rede. Problema dito em voz alta para outra pessoa; fa&iacute;sca restitu&iacute;da.",false,-15,0,0);});
liga("b-ater",function(){ if(S.usos.ater>=2)return; S.usos.ater++; S.ultAter=hoje();
 var g=30*pm().ater; move(g,2,"Aterramento. Corpo, comida, sono ou espa&ccedil;o f&iacute;sico &mdash; recarga no terreno hostil."+
  (g>30?" Protocolo SOLO: o terreno devolve em dobro.":""),false,-8,0,0);});
liga("b-desc",function(){ if(S.usos.desc>=1||S.sat<=0)return; S.usos.desc++;
 move(0,2,"Descarga Controlada. O que foi absorvido virou nome escrito &mdash; a fun&ccedil;&atilde;o que o mapa bloqueou, feita &agrave; m&atilde;o.",false,-35,0,0);});
liga("b-agua",function(){ S.aguaH=(S.aguaH||[]).concat(hoje()); move(-15,0,"&Aacute;gua fervente: descarga involunt&aacute;ria. Ru&iacute;do acumulado saiu antes da decis&atilde;o.",true,-20,0,0);});
liga("b-ater2",function(){ var b1=el("b-ater"); if(b1) b1.click(); });
liga("b-trav",function(){
 if(S.sat<40||S.usos.trav>=1||S.carga<10) return; S.usos.trav++;
 var amp=temAr("cam");
 move(-10,amp?9:6,"Travessia para a C\u00e2mara. Porta fechada, nenhum alvo fora: a corrente virou leitura e levou o ru\u00eddo junto.",false,amp?-18:-14,2,0);});
liga("b-decl",function(){
 if(!S.ign.af.length||S.ign.decl===hoje())return; S.ign.decl=hoje();
 var FO=S.ign.fo||[], fa=FO.length?FO[Math.min(S.ign.foAt,FO.length-1)]:null;
 move(12,1,"Declara\u00e7\u00e3o"+(fa?" \u2014 foco: "+esc(fa.t):"")+". Combust\u00edvel dosado \u00e0 m\u00e3o: o sentido dito antes de a tarefa pedir.",false,-5,0,0);});
liga("b-addaf",function(){ var v=el("ig-naf").value.trim(); if(!v)return;
 S.ign.af.push(v); el("ig-naf").value=""; pinta();});
liga("b-addvi",function(){ var v=el("ig-nvi").value.trim(); if(!v)return;
 S.ign.vi.push(v); el("ig-nvi").value=""; pinta();});
liga("b-eco",function(){ el("eco-q").innerHTML=ecoFala(); });
liga("b-ver",function(){ var g=el("grade"); g.classList.toggle("aberta");
 this.querySelector("strong").textContent=g.classList.contains("aberta")?"Fechar o baralho":"Ver todas as fichas"; });


liga("b-print",function(){ window.print&&window.print(); });
liga("b-repor",function(){ S.fichas={}; S.puxada=null; anota("Baralho reposto. Todas as fichas voltam &agrave; mesa.",0,false); pinta(); });
liga("b-add",function(){
 var t=el("n-tit").value.trim(); if(!t){el("msg").textContent="d&ecirc; um t&iacute;tulo &agrave; ficha";return;}
 var ps=el("n-pas").value.split(";").map(function(x){return x.trim();}).filter(Boolean);
 if(!ps.length) ps=["Fa&ccedil;a a coisa."];
 S.extras.push({id:"x"+Date.now(),c:el("n-canal").value,e:"baixa",t:5,h:t,p:"",s:ps,d:""});
 el("n-tit").value=""; el("n-pas").value="";
 anota("Ficha acrescentada ao baralho: "+t,0,false); pinta();});

liga("b-copy",function(){var ta=el("dump"); ta.value=JSON.stringify(S);
 try{navigator.clipboard.writeText(ta.value).then(function(){el("msg").textContent="estado copiado";},
  function(){ta.select();el("msg").textContent="selecionado — copie com ctrl+c";});}
 catch(e){ta.select();el("msg").textContent="selecionado — copie com ctrl+c";}});
liga("b-load",function(){try{S=normaliza(JSON.parse(el("dump").value));pinta();el("msg").textContent="estado restaurado";}
 catch(e){el("msg").textContent="campo ilegível — cole o json completo";}});

var armado=false,tR=null;
liga("b-reset",function(){var b=el("b-reset");
 if(!armado){armado=true;b.querySelector("strong").textContent="Confirmar: apaga tudo";
  el("msg").textContent="clique de novo em 4s para zerar";
  tR=setTimeout(function(){armado=false;b.querySelector("strong").textContent="Zerar registro";el("msg").textContent="";},4000);return;}
 clearTimeout(tR);armado=false;b.querySelector("strong").textContent="Zerar registro";
 S=limpo();pinta();el("msg").textContent="registro zerado";});

/* Vértice — fluxo operacional v3. Dados anteriores são preservados. */
var VX=document.createElement('section'); VX.id='vx';
document.querySelector('.wrap').prepend(VX);
var vxStyle=document.createElement('style'); vxStyle.textContent=`
#vx{padding:24px 0 40px;color:var(--bone);font-family:var(--sans)}
#vx *{box-sizing:border-box} #vx button,#vx input,#vx select,#vx textarea{font:inherit;color:var(--bone);background:var(--well);border:1px solid var(--line2);border-radius:4px;padding:10px;min-height:42px}
#vx button{cursor:pointer;width:auto;letter-spacing:0;text-transform:none} #vx button:hover{border-color:var(--red)} #vx button:disabled{opacity:.4;cursor:default}
#vx input,#vx textarea,#vx select{width:100%} #vx textarea{min-height:75px;resize:vertical} #vx label{display:grid;gap:6px;font-size:13px} #vx h2{font-size:32px;margin:12px 0} #vx h3{font-size:20px;margin:0 0 14px}
#vx .vx-top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap} #vx .vx-k{font:11px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
#vx .vx-tabs,#vx .vx-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center} #vx .vx-tabs{margin:22px 0} #vx [aria-selected=true],#vx .vx-primary{background:var(--red);color:var(--onred);border-color:var(--red);font-weight:700}
#vx .vx-grid{display:grid;grid-template-columns:1.65fr 1fr;gap:18px} #vx .vx-card{padding:22px;background:var(--panel,var(--well));border:1px solid var(--line2);margin-bottom:16px} #vx .vx-main{border-top:4px solid var(--red)}
#vx .vx-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px} #vx .vx-wide{grid-column:1/-1} #vx .vx-muted{color:var(--dim);font-size:13px;line-height:1.6} #vx .vx-time{font:48px var(--mono);margin:16px 0} #vx .vx-item{padding:14px 0;border-top:1px solid var(--line2)} #vx .vx-item p{margin:6px 0;overflow-wrap:anywhere} #vx .vx-tag{font:11px var(--mono);color:var(--red)} #vx .vx-metrics{display:flex;gap:22px;margin:18px 0;flex-wrap:wrap} #vx .vx-metrics b{display:block;font-size:23px} #vx details{margin:12px 0} #vx summary{cursor:pointer;padding:10px 0} #vx .vx-notice{border-left:3px solid var(--red);padding:12px;margin:12px 0} #vx button:focus-visible,#vx input:focus-visible{outline:2px solid var(--red);outline-offset:3px}
[data-vx-hidden="true"]{display:none!important} .pomo{display:none!important} #b-for{display:none!important} #vx .vx-row input{flex:1;min-width:130px;width:auto} #vx-message{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9999;background:var(--panel2);color:var(--bone);padding:14px 22px;max-width:90vw;border:2px solid var(--red);box-shadow:4px 4px 0 var(--red)} @media(max-width:760px){#vx .vx-grid,#vx .vx-fields{grid-template-columns:1fr}#vx h2{font-size:25px}#vx .vx-card{padding:16px}.rail{display:none!important}.wrap{margin-left:auto!important}}

#vx-dlg{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center}
#vx-dlg .vxd-bk{position:absolute;inset:0;background:rgba(0,0,0,.66)}
#vx-dlg .vxd-bx{position:relative;background:var(--panel);border:1px solid var(--red);padding:18px;width:min(460px,92vw);
 display:flex;flex-direction:column;gap:10px;box-shadow:0 18px 50px rgba(0,0,0,.6)}
#vx-dlg .vxd-t{margin:0;font-family:var(--display);font-size:17px;color:var(--bone)}
#vx-dlg .vxd-d{margin:0;font-family:var(--sans);font-size:13px;line-height:1.5;color:var(--dim)}
#vx-dlg label{display:flex;flex-direction:column;gap:3px;font-family:var(--mono);font-size:8px;letter-spacing:.18em;
 text-transform:uppercase;color:var(--line2)}
#vx-dlg input{background:var(--well);color:var(--bone);border:1px solid var(--line2);font-family:var(--sans);font-size:13px;padding:8px 10px}
#vx-dlg .vxd-bt{display:flex;gap:8px;justify-content:flex-end;margin-top:4px}
#vx-dlg .vxd-bt button{width:auto;padding:7px 14px;border:1px solid var(--line2);background:transparent;
 font-family:var(--mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);cursor:pointer}
#vx-dlg .vxd-bt button[data-dlg-ok]{border-color:var(--red);color:var(--red)}
`; document.head.appendChild(vxStyle);
var vxNorm=normaliza; normaliza=function(p){var b=vxNorm(p); if(p.vx&&typeof p.vx==='object')b.vx=p.vx;return b;};
function vxData(){
 if(!S.vx)S.vx={};var v=S.vx;
 if(!Array.isArray(v.tasks))v.tasks=[];if(!Array.isArray(v.sessions))v.sessions=[];if(!v.closes)v.closes={};if(!v.paid)v.paid={};
 v.limit=clamp(v.limit||3,1,12);v.capacity=clamp(v.capacity||100,10,600);v.view=['op','camp','est','dos','fin'].indexOf(v.view)>=0?v.view:'op';v.filter=v.filter||'today';
 if(!v.migrated){S.proj.forEach(function(p){(p.passos||[]).forEach(function(t,i){t.vid=t.vid||p.id+'-'+i;if(t.ok){t.paid=true;v.paid['step:'+t.vid]=true;}});});v.migrated=true;}
 return v;
}

/* Diálogos próprios: prompt e confirm nativos são bloqueados em visualizador embutido. */
function vxDlg(o){
 var w=document.getElementById('vx-dlg'); if(w) w.remove();
 w=document.createElement('div'); w.id='vx-dlg'; w.setAttribute('role','dialog');
 var campos=(o.campos||[]).map(function(c,i){
  return '<label>'+c.label+'<input data-dlg="'+i+'" type="'+(c.tipo||'text')+'" value="'+esc(c.valor||'')+'" maxlength="200"></label>';
 }).join('');
 w.innerHTML='<div class="vxd-bk"></div><div class="vxd-bx"><p class="vxd-t">'+esc(o.titulo||'')+'</p>'+
  (o.texto?'<p class="vxd-d">'+o.texto+'</p>':'')+campos+
  '<div class="vxd-bt"><button data-dlg-x>cancelar</button><button data-dlg-ok>'+(o.ok||'confirmar')+'</button></div></div>';
 document.body.appendChild(w);
 var ins=w.querySelectorAll('[data-dlg]');
 if(ins.length) try{ ins[0].focus(); }catch(e){}
 function fecha(){ w.remove(); }
 w.querySelector('[data-dlg-x]').addEventListener('click',fecha);
 w.querySelector('.vxd-bk').addEventListener('click',fecha);
 w.addEventListener('keydown',function(e){ if(e.key==='Escape') fecha();
  if(e.key==='Enter'&&e.target.tagName==='INPUT'){ e.preventDefault(); w.querySelector('[data-dlg-ok]').click(); } });
 w.querySelector('[data-dlg-ok]').addEventListener('click',function(){
  var vals=[],i; for(i=0;i<ins.length;i++) vals.push(ins[i].value.trim());
  fecha(); if(o.onOk) o.onOk(vals);
 });
}
function vxConf(texto,onOk){ vxDlg({titulo:'Confirmar',texto:texto,ok:'confirmar',onOk:function(){ onOk(); }}); }
function vxId(){return 'v'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function vxMsg(s){var n=document.getElementById('vx-message');if(!n){n=document.createElement('div');n.id='vx-message';n.setAttribute('role','status');document.body.appendChild(n);}n.textContent=s;clearTimeout(vxMsg.t);vxMsg.t=setTimeout(function(){n.remove();},4500);}
function vxSave(){grava();}
function vxTask(){var v=vxData();return v.tasks.find(function(t){return t.id===v.active;});}
function vxProject(t){return S.proj.find(function(p){return p.id===t.project;});}
function vxReward(key,points,label){var v=vxData();if(v.paid[key])return;v.paid[key]=true;move(0,points,label,false,0,0,0);}
function vxMinutes(){return vxData().sessions.filter(function(s){return s.day===hoje();}).reduce(function(a,s){return a+s.minutes;},0);}
function vxActiveProjects(){return S.proj.filter(function(p){return p.est!=='pausado'&&p.est!=='concluido'&&!((p.passos||[]).length&&p.passos.every(function(x){return x.ok;}));});}
function vxShow(view){vxData().view=view;vxRender();vxSave();window.scrollTo(0,0);}
var VX_AREA={"h-sem":"op","h-painel":"dos","h-dia":"op","h-ctn":"op","h-deck":"op",
 "h-proj":"x","h-prov":"camp","h-rec":"camp","h-rast":"camp","h-wp":"camp","h-rota":"camp","h-apt":"camp","h-orb":"camp","h-cup":"camp","h-mc":"camp",
 "h-conc":"est","h-ciclo":"est","h-mapas":"est","h-lp":"est","h-lim":"dos","h-diag":"dos"};
var VX_ORDEM=["h-dia","h-deck","h-sem","h-ctn","h-cup","h-orb","h-rast","h-wp","h-prov","h-rec","h-rota","h-apt","h-mc","h-proj","h-conc","h-ciclo","h-mapas","h-lp"];
var VX_SEMPRE={anais:1,tirbox:1,"h-sec":1};
function vxArea(id){return VX_AREA[id]||"dos";}
/* Reagrupa as seções uma vez: cada h2.sec leva consigo os blocos que o seguem. */
function vxOrganiza(){var w=document.querySelector('.wrap');if(!w||w.dataset.org)return;w.dataset.org='1';
 var vx=document.getElementById('vx'),head=[],G={},cur=null,ordem=[];
 Array.from(w.children).forEach(function(n){if(n===vx)return;
  if(n.matches('h2.sec')&&n.id){cur=n.id;G[cur]=[n];ordem.push(cur);}else if(cur)G[cur].push(n);else head.push(n);});
 var lore=[];
 (G["h-painel"]||[]).forEach(function(n){if(n.classList.contains('desigbox')||n.classList.contains('prot'))lore.push(n);});
 G["h-painel"]=(G["h-painel"]||[]).filter(function(n){return lore.indexOf(n)<0;});
 function poe(lista,area){lista.forEach(function(n){n.dataset.area=area;w.appendChild(n);});}
 VX_ORDEM.forEach(function(id){if(G[id])poe(G[id],vxArea(id));});
 poe(head,"dos");poe(lore,"dos");
 ordem.forEach(function(id){if(VX_ORDEM.indexOf(id)<0&&G[id])poe(G[id],vxArea(id));});}
function finWrap(){var w=document.getElementById('fin-wrap');if(w)return w;var wr=document.querySelector('.wrap');if(!wr)return null;
 w=document.createElement('section');w.id='fin-wrap';w.dataset.area='fin';
 var vx=document.getElementById('vx');if(vx&&vx.nextSibling)wr.insertBefore(w,vx.nextSibling);else wr.appendChild(w);return w;}
/* ---------- AxisHub dentro do app ----------
   Marcação, CSS (escopado em .ax-html) e scripts vêm dos blocos inertes #ax-tpl e #ax-js.
   Os scripts rodam num escopo próprio: document, location, localStorage e setInterval são
   simulados para que tudo caia dentro de .ax-html, sem iframe. */

function axSel(q){return String(q).replace(/(^|[^\w\-.#])html(?![\w-])/g,'$1.ax-html').replace(/(^|[^\w\-.#])body(?![\w-])/g,'$1.ax-body');}
function axMudou(){clearTimeout(AX.t);AX.t=setTimeout(function(){try{nvPor(FIN_TS,String(Date.now()));nvAgenda();}catch(e){}},400);}
function axMonta(){return;var w=finWrap();if(!w||(AX.raiz&&AX.raiz.isConnected))return;
 var tpl=document.getElementById('ax-tpl'),js=document.getElementById('ax-js');if(!tpl||!js)return;
 var frag=tpl.content.cloneNode(true),css=frag.querySelector('#ax-css');if(css&&!document.getElementById('ax-css-on')){css.id='ax-css-on';document.head.appendChild(css);}
 var H=frag.querySelector('.ax-html');w.insertBefore(H,w.firstChild);AX.raiz=H;var B=H.querySelector('.ax-body');axNav(w,H);
 function ouve(alvo,t,f,o){alvo.addEventListener(t,f,o);AX.ouv.push([alvo,t,f,o]);}
 var doc={readyState:'complete',body:B,documentElement:H,
  getElementById:function(i){return document.getElementById(i);},
  querySelector:function(q){return H.querySelector(axSel(q))||(H.matches(axSel(q))?H:null);},
  querySelectorAll:function(q){return H.querySelectorAll(axSel(q));},
  createElement:function(t){return document.createElement(t);},
  addEventListener:function(t,f,o){if(t==='DOMContentLoaded'||t==='readystatechange'){setTimeout(f,0);return;}ouve(document,t,f,o);},
  removeEventListener:function(t,f,o){document.removeEventListener(t,f,o);}};
 var loc={search:'?hub=fin',hash:'',href:location.href,reload:function(){location.reload();}};
 var ls={getItem:function(k){return localStorage.getItem(k);},key:function(i){return localStorage.key(i);},
  setItem:function(k,v){localStorage.setItem(k,v);if(k===FIN_KEY)axMudou();},
  removeItem:function(k){localStorage.removeItem(k);if(k===FIN_KEY)axMudou();}};
 Object.defineProperty(ls,'length',{get:function(){return localStorage.length;}});
 function si(){var id=setInterval.apply(window,arguments);AX.timers.push(id);return id;}
 function axRola(){var fw=document.getElementById('fin-wrap');if(!fw||!AX.pronto)return;var y=fw.getBoundingClientRect().top+window.scrollY-60;
  if(Math.abs(window.scrollY-y)>40)window.scrollTo({top:y,behavior:'smooth'});}
 AX.pronto=false;setTimeout(function(){AX.pronto=true;},1500);
 try{(new Function('document','location','localStorage','setInterval','__axRola',js.textContent.replace(/window\.scrollTo\(/g,'__axRola('))).call(window,doc,loc,ls,si,axRola);}
 catch(e){console.error('AxisHub:',e);}}
/* sub-abas da Loja: Tesouro, Diário de Bordo, Carga, Enfermaria e Rotas, mais exportar e importar */
var AX_NAV=[['finance','Tesouro'],['habit','Diário de Bordo'],['mapa','Carga'],['sono','Enfermaria'],['projects','Bunker 9']];
function axBotao(k){return AX.raiz&&AX.raiz.querySelector('.awb-nav [data-awb-tab="'+k+'"],.awb-nav [data-awb-action="'+k+'"]');}
function axNavPinta(){var n=document.getElementById('loja-nav');if(!n)return;
 var painel=AX.raiz&&AX.raiz.querySelector('.awb-nav .panel-on');
 Array.prototype.forEach.call(n.querySelectorAll('[data-lj]'),function(b){var o=axBotao(b.dataset.lj);
  b.classList.toggle('at',!!(o&&(painel?o.classList.contains('panel-on'):o.classList.contains('on'))));});}
function axNav(w,H){var n=document.getElementById('loja-nav');
 if(!n){n=document.createElement('nav');n.id='loja-nav';n.className='loja-nav';n.setAttribute('aria-label','Seções da Loja');
  n.innerHTML=AX_NAV.map(function(x){return '<button type="button" data-lj="'+x[0]+'">'+x[1]+'</button>';}).join('')+
   '<span class="lj-sep"></span><button type="button" class="lj-mini" data-lj-x="fin-exp">Exportar</button><button type="button" class="lj-mini" data-lj-x="fin-imp">Importar</button>';
  n.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
   if(b.dataset.lj==='finance'||b.dataset.lj==='habit'){var fx=document.getElementById('dockClose');if(fx&&AX.raiz.querySelector('.awb-nav .panel-on'))fx.click();}
   var o=b.dataset.lj?axBotao(b.dataset.lj):document.getElementById(b.dataset.ljX);if(o)o.click();setTimeout(axNavPinta,60);});}
 w.insertBefore(n,H);
 try{new MutationObserver(axNavPinta).observe(H.querySelector('.awb-nav')||H,{subtree:true,attributes:true,attributeFilter:['class']});}catch(e){}
 setTimeout(axNavPinta,50);}
/* dados das finanças mudaram por fora (nuvem ou extensão): desmonta e monta de novo */
function axRemonta(){try{if(window.AX&&AX.recarrega)AX.recarrega();}catch(e){}return;AX.timers.forEach(clearInterval);AX.timers=[];
 AX.ouv.forEach(function(x){x[0].removeEventListener(x[1],x[2],x[3]);});AX.ouv=[];
 AX.raiz.remove();AX.raiz=null;if(vxData().view==='fin')axMonta();}
function vxLayout(){vxOrganiza();var view=vxData().view;document.body.dataset.vxView=view;
 var fw=finWrap();if(view==='fin'&&fw)axMonta();
 Array.from(document.querySelector('.wrap').children).forEach(function(n){if(n===VX)return;
  if(VX_SEMPRE[n.id]){n.dataset.vxHidden='false';return;}
  n.dataset.vxHidden=String((n.dataset.area||'dos')!==view);});}
function vxField(id,label,value,type){return '<label>'+label+'<input id="'+id+'" type="'+(type||'text')+'" value="'+esc(value||'')+'" maxlength="300"></label>';}
function vxOptions(sel){return '<option value="">Sem projeto</option>'+S.proj.filter(function(p){return p.est!=='concluido';}).map(function(p){return '<option value="'+esc(p.id)+'" '+(sel===p.id?'selected':'')+'>'+esc(p.nome)+'</option>';}).join('');}
function vxEdit(t){t=t||{};return '<form id="vx-form" class="vx-fields">'+vxField('vx-title','Entrega / alvo do ciclo',t.title)+vxField('vx-done','Concluído quando…',t.done)+vxField('vx-next','Primeira ação concreta',t.next)+vxField('vx-date','Planejado para',t.date||hoje(),'date')+'<label>Projeto<select id="vx-project">'+vxOptions(t.project)+'</select></label><label>Operação<select id="vx-mode"><option '+(t.mode==='cerco'?'selected':'')+' value="cerco">Cerco · avanço gradual</option><option '+(t.mode==='ruptura'?'selected':'')+' value="ruptura">Ruptura · resolver o nó</option></select></label><details class="vx-wide"><summary>Varredura de futuros · preparar o caminho</summary><div class="vx-fields">'+vxField('vx-obstacle','Obstáculo provável',t.obstacle)+vxField('vx-response','Se acontecer, vou…',t.response)+vxField('vx-minimum','Versão mínima da entrega',t.minimum)+vxField('vx-due','Prazo real (opcional)',t.due,'date')+'</div></details><div class="vx-row vx-wide"><button class="vx-primary" type="submit">'+(t.id?'Salvar rota':'Declarar rota')+'</button><button type="button" data-vx="cancel">Cancelar</button></div></form>';}
function vxRender(){
 var v=vxData(),t=vxTask(),open=v.tasks.filter(function(x){return x.status!=='done';});
 VX.innerHTML='<div class="vx-top"><div><span class="vx-k">Astronáutica · ciclo '+hoje()+'</span><h2>Escolha o ramo. Faça o movimento.</h2></div><div class="vx-k">'+esc(S.cod)+'<br>Domínio '+S.dominio+' · Lastro '+S.lastro+'</div></div><div class="vx-tabs" role="tablist" aria-label="Vistas"><button role="tab" aria-selected="'+(v.view==='op')+'" data-view="op">01 / Operação</button><button role="tab" aria-selected="'+(v.view==='camp')+'" data-view="camp">02 / Campanha</button><button role="tab" aria-selected="'+(v.view==='est')+'" data-view="est">03 / Estudo</button><button role="tab" aria-selected="'+(v.view==='dos')+'" data-view="dos">04 / Arquivo do mutante</button><button role="tab" aria-selected="'+(v.view==='fin')+'" data-view="fin">05 / Loja</button></div><div class="vx-metrics"><span><b>'+S.carga+'</b>Carga percebida</span><span><b>'+Math.round(vxMinutes())+' / '+v.capacity+'</b>minutos de foco hoje</span><span><b>'+open.length+'</b>rotas abertas</span><span><b>'+vxActiveProjects().length+' / '+v.limit+'</b>frentes ativas</span></div><div id="vx-body"></div>';
 var body=el('vx-body');
 if(v.view==='op'){
 var main='<div class="vx-card vx-main"><div class="vx-top"><span class="vx-k">Alvo do ciclo / '+(t?esc(t.status):'aguardando rota')+'</span><button data-vx="new">+ Nova rota</button></div>';
 if(v.edit){main+=vxEdit(v.edit==='new'?null:t);}
 else if(t){main+='<h2>'+esc(t.title)+'</h2><p><b>Concluído quando:</b> '+esc(t.done)+'</p><p><b>Próximo movimento:</b> '+esc(t.anchor||t.next)+'</p>'+(t.result?'<p class="vx-muted">Último avanço: '+esc(t.result)+'</p>':'')+(t.status==='waiting'?'<div class="vx-notice">Aguardando '+esc(t.who||t.block)+' · verificar em '+esc(t.review||'data a definir')+'<br>'+esc(t.unblock||'')+'</div>':'')+'<div class="vx-row"><span class="vx-tag">'+esc(t.mode)+' · '+esc((vxProject(t)||{}).nome||'rota independente')+'</span><button data-vx="edit">Editar rota</button></div>';
 if(t.obstacle)main+='<details><summary>Varredura de futuros</summary><p>'+esc(t.obstacle)+'</p><p>Resposta: '+esc(t.response||'a definir')+'</p><p>Entrega mínima: '+esc(t.minimum||'a definir')+'</p></details>';
 if(t.status!=='done'){main+='<div class="vx-time" id="vx-clock">00:00</div><div class="vx-row"><button data-start="2">Ignição 2 min</button><button data-start="5">5 min</button><button data-start="10">10 min</button><button class="vx-primary" data-start="25">Foco 25 min</button><button data-vx="pause">Pausar / retomar</button><button data-vx="finish-block">Encerrar bloco</button></div><div class="vx-fields" style="margin-top:16px">'+vxField('vx-result','Resultado deste avanço',t.draftResult)+vxField('vx-anchor','Âncora · ao voltar, faça isto',t.anchor)+'</div><div class="vx-row" style="margin-top:12px"><button data-vx="anchor">Salvar âncora</button><button data-vx="complete">Concluir entrega</button><button data-vx="block">Registrar impedimento</button></div>';
 }else main+='<p class="vx-notice">Entrega concluída. O ramo agora faz parte do seu domínio.</p><button data-vx="reopen">Reabrir sem pontuar novamente</button>';
 if(v.blocking)main+='<form id="vx-block-form" class="vx-fields">'+vxField('vx-block','Impedimento',t.block)+vxField('vx-who','Pessoa / informação / recurso necessário',t.who)+vxField('vx-review','Rever em',t.review||hoje(),'date')+vxField('vx-unblock','Próximo movimento para destravar',t.unblock)+'<button class="vx-primary">Salvar impedimento</button></form>';
 }else main+='<h2>Uma rota antes de qualquer disparo.</h2><p class="vx-muted">Escolha uma entrega concreta e seu primeiro movimento. O ECO preservará o ponto de retorno.</p><button class="vx-primary" data-vx="new">Declarar primeira rota</button>';
 main+='</div>';
 var side='<div class="vx-card"><h3>Radar de campo</h3><div class="vx-row"><button data-filter="today">Hoje</button><button data-filter="all">Todas</button><button data-filter="waiting">Aguardando</button><button data-filter="done">Concluídas</button></div><div class="vx-muted">Filtro: '+esc({today:'Hoje e pendentes',all:'Todas as rotas',waiting:'Aguardando',done:'Concluídas'}[v.filter])+'</div>';
 var list=v.tasks.filter(function(x){return v.filter==='all'||(v.filter==='done'?x.status==='done':v.filter==='waiting'?x.status==='waiting':x.status!=='done'&&x.date<=hoje());});
 side+=list.map(function(x){return '<div class="vx-item"><span class="vx-tag">'+esc(x.status==='waiting'?'aguardando':x.status==='done'?'concluída':'pronta')+(x.due&&x.due<hoje()&&x.status!=='done'?' · prazo vencido':'')+'</span><p>'+esc(x.title)+'</p><button data-select="'+x.id+'">'+(x.id===v.active?'Em foco':'Abrir rota')+'</button>'+(x.status==='waiting'?'<button data-unblock="'+x.id+'">Liberar</button>':'')+'</div>';}).join('')||'<p class="vx-muted">Nenhuma rota neste filtro.</p>';
 side+='</div><div class="vx-card"><h3>Captura rápida</h3><form id="vx-capture-form"><label>Uma ideia, sem interromper a operação<input id="vx-capture" required maxlength="300"></label><button>Guardar</button></form>'+S.cap.slice(0,5).map(function(c,i){return '<div class="vx-item"><p>'+esc(c.t)+'</p><button data-capture="'+i+'">Transformar em rota</button></div>';}).join('')+'</div>';
 var yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);var yd=yesterday.getFullYear()+'-'+String(yesterday.getMonth()+1).padStart(2,'0')+'-'+String(yesterday.getDate()).padStart(2,'0');if(v.closes[yd])main='<div class="vx-notice"><b>Âncora do último ciclo:</b> '+esc(v.closes[yd].next)+'</div>'+main;body.innerHTML='<div class="vx-grid"><div>'+main+vxCloseHTML()+'</div><aside>'+side+vxSettingsHTML()+'</aside></div>';
 }else if(v.view==='camp'){
 body.innerHTML='<div class="vx-card"><h3>Campanha / frentes e resultados</h3><p class="vx-muted">Os registros abaixo compartilham as mesmas etapas e operações. Congelar preserva o projeto e libera uma frente.</p>'+vxProjectsHTML()+'</div><div class="vx-card"><h3>Relatórios do ECO</h3>'+Object.keys(v.closes).sort().reverse().slice(0,7).map(function(d){var c=v.closes[d];return '<div class="vx-item"><b>'+d+'</b><p>Entrega: '+esc(c.result)+'</p><p>Pendente: '+esc(c.pending)+'</p><p>Próxima ignição: '+esc(c.next)+'</p></div>';}).join('')+'<p class="vx-muted">Sessões registradas: '+v.sessions.length+' · Entregas concluídas: '+v.tasks.filter(function(x){return x.status==='done';}).length+'</p></div>';
 }else if(v.view==='fin'){body.innerHTML='';
 }else if(v.view==='est'){body.innerHTML='<div class="vx-card vx-est"><h3>Estudo / concurso, idiomas e runas</h3><p class="vx-muted">A roda do concurso gira por peso de incidência. A revisão de mapas devolve a matéria antiga no dia certo. Idiomas e runas ficam na Decodificação, logo abaixo.</p></div>';
 }else{body.innerHTML='<div class="vx-card"><h3>Arquivo do mutante</h3><p class="vx-muted">Ficha, poderes, ECO, limitador, criptonita e o painel antigo de Carga, Saturação e Lastro ficam aqui, fora do uso diário. A operação está na primeira aba.</p>'+vxSettingsHTML()+'<div class="vx-row"><button data-vx="export">Exportar registro completo</button><label>Restaurar registro JSON<input id="vx-import" type="file" accept=".json"></label><button data-vx="theme">Alternar claro / escuro</button></div></div>';}
 vxLayout();vxBind();vxClock();document.body.dataset.vxView=v.view;
}
function vxCloseHTML(){var c=vxData().closes[hoje()]||{};return '<details class="vx-card"><summary>Fechamento do ciclo · relatório do ECO'+(c.result?' · salvo':'')+'</summary><form id="vx-close-form" class="vx-fields">'+vxField('vx-close-result','O que foi entregue?',c.result)+vxField('vx-close-pending','O que ficou pendente?',c.pending)+vxField('vx-close-next','Primeira ação de amanhã',c.next)+'<button class="vx-primary">Salvar fechamento</button></form></details>';}
function vxSettingsHTML(){var v=vxData();return '<details class="vx-card"><summary>Calibrar o campo</summary><form id="vx-settings" class="vx-fields">'+vxField('vx-capacity','Capacidade de foco / minutos por dia',v.capacity,'number')+vxField('vx-limit','Limite de projetos ativos',v.limit,'number')+vxField('vx-charge','Carga percebida / 0 a 100',S.carga,'number')+'<button>Salvar calibração</button></form><p class="vx-muted">Carga e saturação são sinais de planejamento. Domínio reconhece avanços; Lastro libera recompensas. Ajuste a capacidade ao seu dia.</p></details>';}
function vxProjectsHTML(){var h='<form id="vx-project-form" class="vx-fields">'+vxField('vx-pname','Novo projeto','')+vxField('vx-pdone','Critério de conclusão','')+vxField('vx-pdate','Prazo','', 'date')+'<button>Criar projeto</button></form>';h+=S.proj.map(function(p){var steps=p.passos||[],done=p.est==='concluido'||steps.length&&steps.every(function(s){return s.ok;});return '<div class="vx-item"><div class="vx-top"><h3>'+esc(p.nome)+'</h3><span class="vx-tag">'+(done?'concluído':p.est==='pausado'?'reserva':p.waiting?'aguardando':'ativo')+'</span></div><p class="vx-muted">'+esc(p.criterion||'Defina o critério de conclusão.')+' · Prazo: '+esc(p.prazo||'sem prazo')+'</p><div class="vx-row"><button data-pedit="'+p.id+'">Editar critério / prazo</button><button data-ptoggle="'+p.id+'">'+(p.est==='pausado'?'Retomar':'Congelar')+'</button><button data-pwait="'+p.id+'">'+(p.waiting?'Liberar impedimento':'Aguardando')+'</button><button data-pdone="'+p.id+'">'+(done?'Reabrir projeto':'Concluir projeto')+'</button></div>'+(p.waiting?'<p class="vx-notice">'+esc(p.waiting)+' · verificar: '+esc(p.review||'a definir')+'</p>':'')+steps.map(function(s,i){return '<div class="vx-item"><div class="vx-row"><button data-step="'+p.id+'|'+i+'">'+(s.ok?'✓ Concluída':'Marcar feita')+'</button><span>'+esc(s.t)+'</span>'+(!s.ok?'<button data-promote="'+p.id+'|'+i+'">'+(p.next===i?'Próxima ação · abrir':'Executar esta etapa')+'</button>':'')+'</div></div>';}).join('')+'<form data-step-form="'+p.id+'" class="vx-row"><input name="step" required maxlength="200" aria-label="Nova etapa" placeholder="Próxima etapa concreta"><button>Adicionar etapa</button></form></div>';}).join('');return h;}
function vxTimerStop(){var v=vxData();if(v.timer&&v.timer.running){v.timer.remaining=Math.max(0,v.timer.end-Date.now());v.timer.running=false;vxSave();}}
function vxRecordBlock(result){var v=vxData(),tm=v.timer;if(!tm)return;vxTimerStop();var minutes=Math.max(0,(tm.total-tm.remaining)/60000);if(minutes>0)v.sessions.push({id:tm.id,day:hoje(),task:tm.task,minutes:Math.round(minutes*100)/100,result:result||''});v.timer=null;vxSave();}
function vxClock(){var v=vxData(),tm=v.timer,n=el('vx-clock');if(!tm){if(n)n.textContent='Pronto';return;}var left=tm.running?Math.max(0,tm.end-Date.now()):tm.remaining;if(n)n.textContent=pmFmt(left/1000)+(tm.running?'':' · pausa');if(tm.running&&left<=0){tm.remaining=0;tm.running=false;vxSave();vxMsg('Bloco encerrado. Registre o avanço e preserve sua âncora.');} }
function vxStart(min){var v=vxData(),t=vxTask();var project=t&&vxProject(t);if(project&&(project.est==='pausado'||project.waiting||project.est==='concluido'))return vxMsg('Retome ou libere o projeto na Campanha antes de começar.');if(!t||t.status==='done'||t.status==='waiting')return vxMsg('Libere o impedimento antes de começar.');if(v.timer)return vxMsg('Encerre o bloco atual ou retome a pausa antes de iniciar outro.');v.timer={id:vxId(),task:t.id,total:min*60000,remaining:min*60000,end:Date.now()+min*60000,running:true};t.status='active';vxSave();vxClock();if(vxMinutes()+min>v.capacity)vxMsg('Este bloco ultrapassa sua capacidade planejada. Você pode ajustar ou encerrar mais cedo.');}
function vxBind(){
 VX.querySelectorAll('[data-view]').forEach(function(b){b.onclick=function(){vxShow(b.dataset.view);};});
 VX.querySelectorAll('[data-start]').forEach(function(b){b.onclick=function(){vxStart(+b.dataset.start);};});
 VX.querySelectorAll('[data-filter]').forEach(function(b){b.onclick=function(){vxData().filter=b.dataset.filter;vxRender();vxSave();};});
 VX.querySelectorAll('[data-select]').forEach(function(b){b.onclick=function(){var v=vxData();if(v.timer&&v.timer.task!==b.dataset.select)return vxMsg('Encerre o bloco e salve a âncora antes de trocar de rota.');v.active=b.dataset.select;v.edit=null;v.blocking=false;vxRender();vxSave();};});
 VX.querySelectorAll('[data-unblock]').forEach(function(b){b.onclick=function(){vxData().tasks.find(function(t){return t.id===b.dataset.unblock;}).status='ready';vxRender();vxSave();};});
 VX.querySelectorAll('[data-capture]').forEach(function(b){b.onclick=function(){var v=vxData();if(v.timer)return vxMsg('Encerre o bloco antes de declarar outra rota.');v.capture=+b.dataset.capture;v.edit='new';vxRender();el('vx-title').value=S.cap[v.capture].t;};});
 VX.querySelectorAll('[data-vx]').forEach(function(b){b.onclick=function(){vxAction(b.dataset.vx);};});
 var f=el('vx-form');if(f)f.onsubmit=function(e){e.preventDefault();var v=vxData(),title=el('vx-title').value.trim(),done=el('vx-done').value.trim(),next=el('vx-next').value.trim();if(!title||!done||!next)return vxMsg('Preencha entrega, critério de conclusão e primeira ação.');var project=el('vx-project').value,p=S.proj.find(function(p){return p.id===project;});if(p&&p.est==='pausado')return vxMsg('Retome o projeto na Campanha antes de iniciar a rota.');var t=v.edit==='new'?{id:vxId(),status:'ready'}:vxTask();Object.assign(t,{title:title,done:done,next:next,date:el('vx-date').value||hoje(),due:el('vx-due').value,project:project,mode:el('vx-mode').value,obstacle:el('vx-obstacle').value,response:el('vx-response').value,minimum:el('vx-minimum').value});if(v.edit==='new')v.tasks.push(t);v.active=t.id;v.edit=null;if(v.capture!=null){S.cap.splice(v.capture,1);v.capture=null;}S.ign.decl=hoje();vxRender();vxSave();};
 f=el('vx-capture-form');if(f)f.onsubmit=function(e){e.preventDefault();var t=el('vx-capture').value.trim();if(t)S.cap.unshift({t:t,d:hoje()});vxRender();vxSave();};
 ['vx-result','vx-anchor'].forEach(function(id){var n=el(id);if(n)n.oninput=function(){var t=vxTask();if(t){t[id==='vx-result'?'draftResult':'anchor']=n.value;vxSave();}};});
 f=el('vx-block-form');if(f)f.onsubmit=function(e){e.preventDefault();var t=vxTask(),block=el('vx-block').value.trim();if(!block||!el('vx-unblock').value.trim())return vxMsg('Defina o impedimento e o movimento para destravar.');vxRecordBlock(t.draftResult);Object.assign(t,{status:'waiting',block:block,who:el('vx-who').value,review:el('vx-review').value,unblock:el('vx-unblock').value});vxData().blocking=false;vxRender();vxSave();};
 f=el('vx-close-form');if(f)f.onsubmit=function(e){e.preventDefault();if(vxData().timer)return vxMsg('Encerre a operação em curso antes de fechar o ciclo.');var c={result:el('vx-close-result').value.trim(),pending:el('vx-close-pending').value.trim(),next:el('vx-close-next').value.trim()};if(!c.result||!c.next)return vxMsg('Registre o resultado e a primeira ação de amanhã.');vxData().closes[hoje()]=c;vxSave();vxMsg('Ciclo registrado. Sua próxima ignição está preservada.');};
 f=el('vx-settings');if(f)f.onsubmit=function(e){e.preventDefault();var v=vxData();v.capacity=clamp(el('vx-capacity').value,10,600);v.limit=clamp(el('vx-limit').value,1,12);S.carga=clamp(el('vx-charge').value,0,100);pinta();vxMsg('Campo calibrado.');};
 f=el('vx-project-form');if(f)f.onsubmit=function(e){e.preventDefault();var name=el('vx-pname').value.trim(),criterion=el('vx-pdone').value.trim();if(!name||!criterion)return vxMsg('Defina nome e critério de conclusão.');var reserved=vxActiveProjects().length>=vxData().limit;S.proj.push({id:vxId(),nome:name,criterion:criterion,prazo:el('vx-pdate').value,passos:[],aberto:hoje(),ult:hoje(),est:reserved?'pausado':'ativo'});pinta();if(reserved)vxMsg('Projeto criado na reserva: limite de frentes atingido.');};
 VX.querySelectorAll('[data-step-form]').forEach(function(f){f.onsubmit=function(e){e.preventDefault();var p=S.proj.find(function(p){return p.id===f.dataset.stepForm;}),s=f.elements.step.value.trim();if(s){if(p.est==='concluido')return vxMsg('Reabra o projeto antes de adicionar etapas.');p.passos.push({vid:vxId(),t:s,ok:false});pinta();}};});
 ['pedit','ptoggle','pwait','pdone','step','promote'].forEach(function(kind){VX.querySelectorAll('[data-'+kind+']').forEach(function(b){b.onclick=function(){vxProjectAction(kind,b.dataset[kind]);};});});
 f=el('vx-import');if(f)f.onchange=async function(){var previous=S;try{var data=JSON.parse(await f.files[0].text());if(typeof data.carga!=='number'||!Array.isArray(data.proj))throw Error('Formato inválido');pmStop();S=normaliza(data);cicloNovo();pinta();vxMsg('Registro restaurado.');}catch(e){S=previous;pinta();vxMsg('Arquivo inválido. O registro atual foi preservado.');}};
}
function vxAction(a){var v=vxData(),t=vxTask();
 if(a==='new'){if(v.timer)return vxMsg('Encerre o bloco atual antes de abrir outra rota.');v.edit='new';v.capture=null;}
 if(a==='edit')v.edit='edit';if(a==='cancel'){v.edit=null;v.capture=null;}
 if(a==='pause'){if(!v.timer)return vxMsg('Inicie uma ignição ou bloco de foco.');if(v.timer.running)vxTimerStop();else if(v.timer.remaining>0){v.timer.end=Date.now()+v.timer.remaining;v.timer.running=true;}}
 if(a==='anchor'){vxSave();return vxMsg('Âncora preservada.');}
 if(a==='block'){vxTimerStop();v.blocking=!v.blocking;}
 if(a==='finish-block'){if(!v.timer)return vxMsg('Nenhum bloco em curso.');if(!t.draftResult)return vxMsg('Descreva o avanço realizado, mesmo que parcial.');var sid=v.timer.id;vxRecordBlock(t.draftResult);t.result=t.draftResult;t.draftResult='';if(t.status==='active')t.status='ready';vxReward('session:'+sid,3,'Avanço registrado: '+esc(t.result));}
 if(a==='complete'){if(!t||t.status==='done')return;if(!t.draftResult&&!t.result)return vxMsg('Registre o resultado que atende ao critério da entrega.');
  if(!t.okConf){ vxConf('A entrega atende ao critério: <b>'+esc(t.done||'')+'</b>?',function(){ t.okConf=true; vxAction('complete'); }); return; }
  t.okConf=false;vxRecordBlock(t.draftResult||t.result);t.result=t.draftResult||t.result;t.draftResult='';t.status='done';t.completed=hoje();var p=vxProject(t);if(p){p.ult=hoje();if(p.revival){p.revival=false;vxReward('revive:'+p.id+':'+p.revivalId,3,'Projeto retomado por avanço real.');}if(t.stepId){var st=p.passos.find(function(x){return x.vid===t.stepId;});if(st){if(st.paid)v.paid['step:'+st.vid]=true;st.ok=true;st.paid=true;}}}vxReward(t.stepId?'step:'+t.stepId:'task:'+t.id,t.mode==='ruptura'?15:10,'Entrega concluída: '+esc(t.title));if(t.mode==='ruptura')S.usos.rup=Math.max(1,S.usos.rup);}
 if(a==='reopen')t.status='ready';
 if(a==='theme'){el('b-tema').click();return;}
 if(a==='export'){var txt=JSON.stringify(S,null,2),nome='vertice-registro-'+hoje()+'.json';
      function baixaLink(){try{var blob=new Blob([txt],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=nome;link.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);}catch(e){}}
      if(window.claude&&claude.use){Promise.resolve(claude.use('downloads')).then(function(d){if(d&&d.save){return d.save({filename:nome,data:txt});}baixaLink();}).catch(function(){baixaLink();});}else{baixaLink();}
      return;}
 pinta();
}
function vxProjectAction(kind,key){var parts=key.split('|'),p=S.proj.find(function(p){return p.id===parts[0];}),i=+parts[1],v=vxData();if(!p)return;
 if(kind==='pedit'){vxDlg({titulo:'Projeto: '+p.nome,ok:'gravar',
  campos:[{label:'Critério de conclusão',valor:p.criterion||''},{label:'Prazo',valor:p.prazo||'',tipo:'date'}],
  onOk:function(vals){ p.criterion=vals[0]; p.prazo=vals[1]||null; vxSave(); pinta(); }}); return;}
 if(kind==='ptoggle'){if(p.est==='concluido')return vxMsg('Projeto concluído: reabra para retomar.');if(p.est==='pausado'){if(vxActiveProjects().length>=v.limit)return vxMsg('Congele outra frente ou ajuste o limite antes de retomar.');p.est='ativo';p.revival=true;p.revivalId=vxId();}else{if(v.timer&&vxTask()&&vxTask().project===p.id)return vxMsg('Encerre o bloco antes de congelar o projeto.');p.est='pausado';}}
 if(kind==='pwait'){ if(p.waiting){ p.waiting=''; }
  else { vxDlg({titulo:'Aguardando — '+p.nome,ok:'marcar',
   campos:[{label:'De quem ou do que depende',valor:''},{label:'Verificar em',valor:hoje(),tipo:'date'}],
   onOk:function(vals){ if(!vals[0]) return vxMsg('Diga de quem ou do que depende.');
    if(!vals[1]) return vxMsg('Informe a data de verificação.');
    p.waiting=vals[0]; p.review=vals[1]; vxSave(); pinta(); }}); return; } }
 if(kind==='pdone'){if(v.timer&&vxTask()&&vxTask().project===p.id)return vxMsg('Encerre o bloco antes de alterar o projeto.');if(p.est==='concluido'||p.passos.length&&p.passos.every(function(s){return s.ok;})){p.est='ativo';if(vxActiveProjects().length>v.limit)p.est='pausado';p.passos.push({vid:vxId(),t:'Revisar entrega reaberta',ok:false});}else{if(p.passos.some(function(s){return !s.ok;}))return vxMsg('Conclua as etapas antes de encerrar o projeto.');if(!p.criterion)return vxMsg('Defina o critério de conclusão.');
  vxConf('O resultado atende a: <b>'+esc(p.criterion)+'</b>?',function(){ p.est='concluido'; p.completed=hoje(); vxSave(); pinta(); }); return;}}
 if(kind==='step'){if(v.timer)return vxMsg('Encerre o bloco antes de alterar etapas.');var s=p.passos[i];s.vid=s.vid||vxId();s.ok=!s.ok;p.ult=hoje();if(s.ok&&!s.paid){s.paid=true;if(p.revival){p.revival=false;vxReward('revive:'+p.id+':'+p.revivalId,3,'Projeto retomado por avanço real.');}vxReward('step:'+s.vid,5,'Etapa concluída: '+esc(s.t));}v.tasks.filter(function(t){return t.stepId===s.vid;}).forEach(function(t){t.status=s.ok?'done':'ready';});if(!s.ok&&p.est==='concluido')p.est='pausado';}
 if(kind==='promote'){if(v.timer)return vxMsg('Encerre o bloco antes de trocar de rota.');if(p.est==='pausado'||p.waiting)return vxMsg('Retome ou libere o projeto antes de executar.');var s=p.passos[i];s.vid=s.vid||vxId();p.next=i;var t=v.tasks.find(function(t){return t.stepId===s.vid;});if(!t){t={id:vxId(),title:s.t,done:s.t+' — etapa finalizada',next:s.t,date:hoje(),project:p.id,stepId:s.vid,mode:'cerco',status:'ready'};v.tasks.push(t);}v.active=t.id;v.view='op';}
 pinta();
}
/* A camada antiga continua disponível, usando a mesma base. */
var vxOldPaint=pinta;pinta=function(){vxData();vxOldPaint();vxRender();grava();};
var vxOldEst=estProj;estProj=function(p){if(p.est==='concluido'||(p.passos||[]).length&&p.passos.every(function(s){return s.ok;}))return{c:'concluido',sig:'OK',n:'concluído',d:'entrega preservada'};if(p.waiting)return{c:'pausado',sig:'AGD',n:'aguardando',d:p.waiting};return vxOldEst(p);};
pintaProj=function(){el('pj-l').innerHTML='<p class="vx-muted">Projetos e etapas estão no início da Campanha.</p>';el('b-proj').style.display='none';};
setInterval(vxClock,1000);
setInterval(function(){if(S.ciclo!==hoje()){cicloNovo();pinta();}},30000);
/* Navegação transversal resolve a vista antes de deslocar a página. */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-ir]');if(!b)return;var id=b.getAttribute('data-ir'),target=el(id);if(!target)return;vxShow(vxArea(id));target.scrollIntoView({block:'start',behavior:'smooth'});},true);


/* ---------- Nuvem: sincronização do registro com o Supabase ----------
   O registro continua salvo no navegador. Com login, cada gravação também
   sobe para a tabela vertice_estado (uma linha por usuário, protegida por RLS).
   Regra: compara o _ts do registro com a última versão sincronizada (base).
   Só a nuvem mudou -> baixa. Só o aparelho mudou -> envia. Os dois -> fica o
   mais recente e o outro vai para uma cópia de segurança local. */
var NUVEM={url:"https://gubpygurtxadsncthttg.supabase.co",chave:"sb_publishable_O9whelpXkVZ8tvgD_8t2EA_LPaeDcmy",tabela:"vertice_estado",
 lib:"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js"};
var nv={cli:null,user:null,est:"off",quando:null,t:null,pronto:false,ocupado:false};
var NV_BASE=KEY+"-nuvem-base", NV_COPIA=KEY+"-conflito";
function nvAtivo(){return /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(NUVEM.url)&&NUVEM.chave.length>20;}
function nvLer(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function nvPor(k,v){try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}catch(e){}}
function nvBase(){var b=nvLer(NV_BASE);if(!b)return null;try{return JSON.parse(b);}catch(e){return null;}}
function nvBaseSet(p){var b=nvBase()||{};if(!nv.user)return;if(b.u!==nv.user.id)b={u:nv.user.id};for(var k in p)b[k]=p[k];nvPor(NV_BASE,JSON.stringify(b));}
/* Finanças (AxisHub, aba Tesouro): mesma origem, chave própria e relógio próprio. */
var FIN_KEY='sfp_bruno_v4',FIN_TS=FIN_KEY+'__ts';
function nvFinLer(){var v=nvLer(FIN_KEY);if(!v)return null;try{return JSON.parse(v);}catch(e){return null;}}
function nvFinTs(){return +(nvLer(FIN_TS)||0);}
window.addEventListener('storage',function(e){if(e.key===FIN_KEY){nvPor(FIN_TS,String(Date.now()));nvAgenda();}});
function nvFinAplica(obj,ts){try{localStorage.setItem(FIN_KEY,JSON.stringify(obj));}catch(e){}nvPor(FIN_TS,String(ts));nvBaseSet({fts:ts});
 try{if(window.AX&&AX.recarrega)AX.recarrega();}catch(e){}}
/* devolve true quando as finanças deste aparelho precisam subir */
function nvFinResolve(row){var rf=+row.fin_ts||0,lf=nvFinTs(),R=row.financas,L=nvFinLer(),b=nvBase(),bf=(b&&nv.user&&b.u===nv.user.id&&b.fts!=null)?b.fts:null;
 if(!R&&!L)return false; if(!R)return true; if(!L){nvFinAplica(R,rf);return false;}
 if(bf===null){if(rf>=lf){nvPor(FIN_KEY+'-conflito',JSON.stringify(L));nvFinAplica(R,rf);return false;}return true;}
 var rc=rf>bf,lc=lf>bf; if(rc&&!lc){nvFinAplica(R,rf);return false;} if(lc&&!rc)return true;
 if(rc&&lc){if(rf>=lf){nvPor(FIN_KEY+'-conflito',JSON.stringify(L));nvFinAplica(R,rf);return false;}nvPor(FIN_KEY+'-conflito',JSON.stringify(R));return true;}
 return false;}
(function(){var g0=grava;grava=function(){if(nv.pronto)S._ts=Date.now();g0();if(nv.pronto)nvAgenda();};})();
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b._ts=+(p&&p._ts)||0;return b;};})();
(function(){var r0=vxRender;vxRender=function(){r0();vxTema();nvChip();};})();
/* Tema claro/escuro sempre à mão no cabeçalho; usa o mesmo botão da barra antiga. */
function vxTema(){var top=VX&&VX.querySelector('.vx-top'),orig=document.getElementById('b-tema');if(!top||!orig)return;
 var b=document.getElementById('vx-tema');
 if(!b){b=document.createElement('button');b.id='vx-tema';b.type='button';b.className='vx-tema';
  b.onclick=function(){orig.click();setTimeout(vxTema,0);};top.appendChild(b);}
 var claro=document.body.classList.contains('claro');
 b.innerHTML='<i aria-hidden="true">'+(claro?'\u263E':'\u2600')+'</i>'+(claro?'modo escuro':'modo claro');
 b.setAttribute('aria-label',claro?'Mudar para o modo escuro':'Mudar para o modo claro');}

function nvChip(){var top=VX&&VX.querySelector('.vx-top');if(!top||!nvAtivo())return;
 var c=document.getElementById('nv-chip');
 if(!c){c=document.createElement('button');c.id='nv-chip';c.type='button';c.onclick=nvPainel;top.appendChild(c);}
 var hm=nv.quando?String(nv.quando.getHours()).padStart(2,'0')+':'+String(nv.quando.getMinutes()).padStart(2,'0'):'';
 var T={off:['só neste aparelho','entrar para sincronizar'],ok:['sincronizado',hm],env:['enviando…',''],
  baixa:['atualizando…',''],erro:['sem conexão','tenta de novo sozinho'],carregando:['nuvem','carregando…']}[nv.est]||['nuvem',''];
 c.className='nv-chip nv-'+nv.est;c.innerHTML='<i></i><b>'+T[0]+'</b>'+(T[1]?'<span>'+T[1]+'</span>':'');
 c.setAttribute('aria-label','Sincronização: '+T[0]+(T[1]?', '+T[1]:''));}
function nvEstado(e){nv.est=e;if(e==='ok')nv.quando=new Date();nvChip();}

function nvInicia(){nv.pronto=true;if(!nvAtivo())return;nvEstado('carregando');
 var s=document.createElement('script');s.src=NUVEM.lib;s.async=true;
 s.onload=function(){try{nv.cli=window.supabase.createClient(NUVEM.url,NUVEM.chave,{auth:{persistSession:true,autoRefreshToken:true}});}catch(e){nvEstado('erro');return;}
  nv.cli.auth.getSession().then(function(r){nv.user=r.data&&r.data.session?r.data.session.user:null;
   if(nv.user)nvPuxa(true);else nvEstado('off');});
  nv.cli.auth.onAuthStateChange(function(ev,ses){var u=ses?ses.user:null;var mudou=(u&&u.id)!==(nv.user&&nv.user.id);nv.user=u;
   if(!u){nvEstado('off');return;} if(mudou)nvPuxa(true);});};
 s.onerror=function(){nvEstado('erro');};
 document.head.appendChild(s);
 document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible'&&nv.user)nvPuxa(false);});
 window.addEventListener('online',function(){if(nv.user)nvPuxa(false);});}

function nvAgenda(){if(!nv.user||!nv.cli)return;clearTimeout(nv.t);nv.t=setTimeout(nvEnvia,2500);}
/* junta numa versão vencedora o que só existe na outra: chaves que faltam e fotos (Panteão, fundos, placas, quadro de visão) */
var NV_FOTOS=['fundos','ptImg','placas','visFotos','ptNota'];
function nvJunta(w,l){var mudou=false;if(!w||!l||typeof w!=='object'||typeof l!=='object')return mudou;
 Object.keys(l).forEach(function(k){if(k==='_ts')return;
  if(!(k in w)||w[k]==null){if(l[k]!=null){w[k]=l[k];mudou=true;}return;}
  if(NV_FOTOS.indexOf(k)<0)return;var a=w[k],b=l[k];
  if(Array.isArray(a)&&Array.isArray(b)){b.forEach(function(x){if(x&&a.indexOf(x)<0){a.push(x);mudou=true;}});return;}
  if(a&&b&&typeof a==='object'&&typeof b==='object'){Object.keys(b).forEach(function(q){if(a[q]==null&&b[q]!=null){a[q]=b[q];mudou=true;}});}});
 if(typeof l.retrato==='string'&&l.retrato&&!w.retrato){w.retrato=l.retrato;mudou=true;}
 return mudou;}
/* antes de enviar, confere se a nuvem mudou desde a última sincronização deste aparelho: se mudou, puxa e junta em vez de sobrescrever */
function nvEnvia(){if(!nv.user||!nv.cli||nv.ocupado)return;nv.ocupado=true;nvEstado('env');
 nv.cli.from(NUVEM.tabela).select('atualizado').eq('user_id',nv.user.id).maybeSingle().then(function(q){
  var base=nvBase(),meu=(base&&base.u===nv.user.id&&base.ts!=null)?base.ts:null,cts=q&&q.data?Date.parse(q.data.atualizado)||0:0;
  if(q&&!q.error&&q.data&&meu!==null&&cts>meu+5){nv.ocupado=false;nvPuxa(false);return;}
  nvEnviaJa();},function(){nvEnviaJa();});}
function nvEnviaJa(){
 var ts=S._ts||Date.now(),dados=JSON.parse(JSON.stringify(S)),fin=nvFinLer(),fts=nvFinTs();
 var row={user_id:nv.user.id,dados:dados,atualizado:new Date(ts).toISOString()};if(fin){row.financas=fin;row.fin_ts=fts||Date.now();}
 nv.cli.from(NUVEM.tabela).upsert(row,{onConflict:'user_id'})
  .then(function(r){nv.ocupado=false;if(r.error){nvEstado('erro');return;}nvBaseSet(fin?{ts:ts,fts:row.fin_ts}:{ts:ts});nvEstado('ok');
   if((S._ts||0)>ts)nvAgenda();},function(){nv.ocupado=false;nvEstado('erro');});}
function nvAplica(dados,ts){S=normaliza(dados);S._ts=ts;
 try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}
 nvBaseSet({ts:ts});try{pinta();}catch(e){} nvEstado('ok');}
function nvPuxa(primeira){if(!nv.user||!nv.cli||nv.ocupado)return;nvEstado('baixa');
 nv.cli.from(NUVEM.tabela).select('dados,atualizado,financas,fin_ts').eq('user_id',nv.user.id).maybeSingle().then(function(r){
  if(r.error){nvEstado('erro');return;}
  var base=nvBase(),meu=(base&&base.u===nv.user.id&&base.ts!=null)?base.ts:null,loc=S._ts||0;
  if(!r.data){nvEnvia();return;}
  var finSobe=nvFinResolve(r.data);
  if(!r.data.dados){nvEnvia();return;}
  var rts=+(r.data.dados&&r.data.dados._ts)||Date.parse(r.data.atualizado)||0;
  if(meu===null){ /* primeiro encontro deste aparelho com esta conta */
   nvEscolhe(r.data.dados,rts);return;}
  var nuvemMudou=rts>meu,aquiMudou=loc>meu;
  if(nuvemMudou&&!aquiMudou){nvAplica(r.data.dados,rts);if(finSobe)nvEnvia();return;}
  if(aquiMudou&&!nuvemMudou){nvEnvia();return;}
  if(nuvemMudou&&aquiMudou){
   if(rts>=loc){nvPor(NV_COPIA,JSON.stringify(S));var D=JSON.parse(JSON.stringify(r.data.dados)),jun=nvJunta(D,S);nvAplica(D,rts);
    if(jun){S._ts=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}nvEnviaJa();}
    vxMsg('Havia mudanças nos dois lados. Ficou a versão mais recente, da nuvem'+(jun?', com as fotos e os campos que só este aparelho tinha':'')+'; a deste aparelho foi guardada como cópia.');}
   else{nvPor(NV_COPIA,JSON.stringify(r.data.dados));var jun2=nvJunta(S,r.data.dados);if(jun2){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}try{pinta();}catch(e){}}nvEnviaJa();vxMsg('Havia mudanças nos dois lados. Ficou a versão mais recente, deste aparelho'+(jun2?', com as fotos e os campos que só a nuvem tinha':'')+'; a da nuvem foi guardada como cópia.');}
   return;}
  if(finSobe){nvEnvia();return;}
  nvEstado('ok');},function(){nvEstado('erro');});}

function nvDlg(titulo,texto,corpo,botoes){var w=document.getElementById('vx-dlg');if(w)w.remove();
 w=document.createElement('div');w.id='vx-dlg';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');
 w.innerHTML='<div class="vxd-bk"></div><div class="vxd-bx nv-dlg"><p class="vxd-t">'+titulo+'</p>'+(texto?'<p class="vxd-d">'+texto+'</p>':'')+(corpo||'')+
  '<p class="nv-erro" role="alert"></p><div class="vxd-bt">'+botoes.map(function(b,i){return '<button data-nvb="'+i+'"'+(b.forte?' data-dlg-ok':'')+'>'+b.t+'</button>';}).join('')+'</div></div>';
 document.body.appendChild(w);
 function fecha(){w.remove();}
 w.querySelector('.vxd-bk').onclick=fecha;
 w.addEventListener('keydown',function(e){if(e.key==='Escape')fecha();});
 botoes.forEach(function(b,i){w.querySelector('[data-nvb="'+i+'"]').onclick=function(){b.f?b.f(w,fecha):fecha();};});
 var f=w.querySelector('input');if(f)try{f.focus();}catch(e){}
 return w;}
function nvErro(w,t){var e=w.querySelector('.nv-erro');if(e)e.textContent=t;}
function nvCampos(w){return{email:(w.querySelector('#nv-email')||{}).value.trim(),senha:(w.querySelector('#nv-senha')||{}).value};}
function nvPainel(){if(!nv.cli){vxMsg(nvAtivo()?'A nuvem ainda está carregando.':'Nuvem não configurada.');return;}
 if(nv.user){var hm=nv.quando?nv.quando.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'ainda não';
  nvDlg('Sincronização','Conectado como <b>'+esc(nv.user.email||'')+'</b>. Última sincronização: '+hm+'.','',
   [{t:'fechar'},{t:'sair da conta',f:function(w,fecha){nv.cli.auth.signOut().then(function(){fecha();vxMsg('Saiu da conta. O registro continua neste aparelho.');});}},
    {t:'sincronizar agora',forte:true,f:function(w,fecha){fecha();nvPuxa(false);}}]);return;}
 var corpo='<label>E-mail<input id="nv-email" type="email" autocomplete="email" maxlength="200"></label>'+
  '<label>Senha<input id="nv-senha" type="password" autocomplete="current-password" minlength="8" maxlength="200"></label>';
 nvDlg('Entrar para sincronizar','Com login, o registro fica igual no celular, no computador e na extensão. Sem login, ele continua só neste aparelho.',corpo,
  [{t:'cancelar'},
   {t:'criar conta',f:function(w){var c=nvCampos(w);if(!c.email||c.senha.length<8)return nvErro(w,'Informe o e-mail e uma senha de 8 caracteres ou mais.');
    if(w._cri)return;w._cri=1;nvErro(w,'Criando…');nv.cli.auth.signUp({email:c.email,password:c.senha,options:{emailRedirectTo:location.origin+location.pathname}}).then(function(r){w._cri=0;      if(r.error&&/already|registered|exists/i.test(r.error.message))return nvErro(w,'Esse e-mail já tem conta. Use "entrar".');
     if(r.error)return nvErro(w,r.error.message);
     if(r.data&&r.data.session){w.remove();vxMsg('Conta criada. Sincronizando.');}
     else nvErro(w,'Conta criada. Confirme pelo link enviado ao seu e-mail e depois entre aqui.');});}},
   {t:'entrar',forte:true,f:function(w,fecha){var c=nvCampos(w);if(!c.email||!c.senha)return nvErro(w,'Informe e-mail e senha.');
    nvErro(w,'Entrando…');nv.cli.auth.signInWithPassword({email:c.email,password:c.senha}).then(function(r){
     if(r.error&&/not confirmed/i.test(r.error.message)){nvErro(w,'Reenviando o link de confirmação…');try{nv.cli.auth.resend({type:'signup',email:c.email,options:{emailRedirectTo:location.origin+location.pathname}}).then(function(q){nvErro(w,q&&q.error?('Seu e-mail ainda não foi confirmado e o reenvio falhou: '+q.error.message):'Seu e-mail ainda não foi confirmado. Reenviei o link: abra o e-mail e clique nele. Mesmo que a página aberta dê erro, a conta fica confirmada. Depois volte aqui e toque em entrar.');});}catch(z){nvErro(w,'Seu e-mail ainda não foi confirmado. Abra o link enviado ao seu e-mail e depois entre aqui.');}return;}
     if(r.error)return nvErro(w,r.error.message==='Invalid login credentials'?'E-mail ou senha não conferem.':r.error.message);
     fecha();vxMsg('Conectado. Sincronizando.');});}}]);
 var w=document.getElementById('vx-dlg');w.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.tagName==='INPUT'){e.preventDefault();w.querySelector('[data-dlg-ok]').click();}});}
function nvEscolhe(dadosNuvem,rts){
 var dn=new Date(rts),dl=new Date(S._ts||Date.now());
 function f(d){return d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});}
 nvDlg('Qual registro vale?','Já existe um registro na nuvem (gravado em '+f(dn)+') e outro neste aparelho (gravado em '+f(dl)+'). O que não for escolhido fica guardado como cópia neste aparelho.','',
  [{t:'usar o deste aparelho',f:function(w,fecha){fecha();nvPor(NV_COPIA,JSON.stringify(dadosNuvem));S._ts=Date.now();nvEnvia();}},
   {t:'usar o da nuvem',forte:true,f:function(w,fecha){fecha();nvPor(NV_COPIA,JSON.stringify(S));nvAplica(dadosNuvem,rts);}}]);
 nvEstado('ok');}
setTimeout(function(){try{nvInicia();}catch(e){console.error('nuvem:',e);}},0);

/* ---------- Painel do concurso (trazido do Contest Hall do DexBoard) ----------
   Dados fixos do edital ficam no código; o progresso fica em S.cc:
   ok[mat] = índices dos tópicos vistos, mc[marco] = feito, q[semana] = questões. */
var CONC={"nome": "TRF3 2026 · Analista Judiciário – Área Judiciária (JFMS)", "banca": "VUNESP", "edital": "Edital nº 1/2026", "url": "https://www.in.gov.br/web/dou/-/edital-n-1-de-23-de-outubro-de-2026-740280249", "prova": "2027-01-31", "turno": "tarde", "insc": ["2026-11-04", "2026-11-23"], "taxa": "R$ 160", "minDia": 90, "metaHoras": 10.5, "metaQuest": 100, "gerais": {"q": 24, "peso": 1, "min": 12}, "espec": {"q": 36, "peso": 2, "min": 18}, "notaMin": 6, "marcos": [{"d": "2026-11-23", "k": "insc", "t": "Inscrição na Vunesp e pagamento da taxa"}, {"d": "2027-01-29", "k": "rev", "t": "Revisão final: uma passada por todo o edital e uma discursiva"}, {"d": "2027-01-31", "k": "prova", "t": "Provas objetiva e discursiva, à tarde"}], "rotina": ["Estudo matinal às 6h30, todos os dias", "Bloco de questões Vunesp de 1h aos sábados, às 8h"], "mat": [{"c": "Português", "g": "G", "n": "Língua Portuguesa e Raciocínio Analítico", "o": 2, "p": 1, "s": 30, "pa": false, "t": ["Redação Oficial", "Ortografia e acentuação", "Emprego do sinal indicativo de crase", "Compreensão e interpretação de textos de gêneros variados", "Relação do texto com seu contexto histórico", "Denotação e conotação", "Discurso direto, discurso indireto e discurso indireto livre", "Intertextualidade", "Figuras de linguagem", "Morfossintaxe", "Elementos estruturais e processos de formação de palavras", "Sinonímia e antonímia", "Pontuação", "Pronomes", "Concordância nominal e concordância verbal", "Flexão nominal e flexão verbal", "Vozes do verbo", "Correlação de tempos e modos verbais", "Regência nominal e regência verbal", "Coordenação e subordinação", "Conectivos", "Coesão e coerência", "Redação (confronto e reconhecimento de frases corretas e incorretas; organização e reorganização de orações e períodos; equivalência e transformação de estruturas)", "Raciocínio analítico e argumentação", "Uso do senso crítico na argumentação", "Tipos de argumentos: falaciosos e apelativos", "Comunicação eficiente de argumentos"]}, {"c": "RLM", "g": "G", "n": "Raciocínio Lógico-Matemático", "o": 3, "p": 1, "s": 30, "pa": true, "t": ["Estrutura lógica de relações arbitrárias entre pessoas, lugares, objetos ou eventos fictícios; deduzir novas informações das relações fornecidas e avaliar as condições usadas para estabelecer a estrutura daquelas relações", "Compreensão e elaboração da lógica das situações por meio de: raciocínio verbal, raciocínio matemático, raciocínio sequencial, orientação espacial e temporal, formação de conceitos, discriminação de elementos", "Compreensão do processo lógico que, a partir de um conjunto de hipóteses, conduz, de forma válida, a conclusões determinadas", "Noções básicas de proporcionalidade e porcentagem: problemas envolvendo regra de três simples, cálculos de porcentagem, acréscimos e descontos"]}, {"c": "Ética e Integridade", "g": "G", "n": "Ética no Serviço Público e Integridade", "o": 4, "p": 1, "s": 30, "pa": false, "t": ["Fundamentos: Ética e integridade: conceito, princípios, valores", "Ética, moral, democracia e exercício da cidadania", "Ética no contexto público", "Regime Disciplinar Federal: Lei nº 8.112/1990 e suas alterações (deveres, proibições, acumulação, responsabilidades, penalidades)", "Combate à Corrupção e Improbidade: Lei nº 8.429/1992 (atos de improbidade administrativa), com as alterações da Lei nº 14.230/2021", "Lei nº 12.846/2013 (Lei Anticorrupção)", "Processo Administrativo: Lei nº 9.784/1999 (conceitos, princípios, direitos e deveres dos administrados)", "Normas Deontológicas e Integridade na Justiça Federal da 3ª Região: Código de Conduta da Justiça Federal (Resolução CJF nº 147/2011), atuação e composição do Comitê Gestor do Código de Conduta da JF3R (Portaria CJF nº 116/2012 e Portaria PRES nº 4.657/2026)", "Diretrizes dos Sistemas de Integridade do Poder Judiciário (Resolução CNJ nº 410/2021) e Governança Colaborativa no âmbito da JF3R (Resolução PRES nº 426/2021)", "Ambiente de Trabalho: Política de Prevenção e Enfrentamento do Assédio e da Discriminação (Resolução CNJ nº 351/2020) e as Comissões locais de Prevenção e Enfrentamento do Assédio no TRF3 e Seções Judiciárias vinculadas", "Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 e alterações)", "Lei de Acesso à Informação (Lei nº 12.527/2011 e alterações)"]}, {"c": "Dir. Humanos", "g": "G", "n": "Noções de Direitos Humanos e Fundamentais e de Acessibilidade", "o": 5, "p": 1, "s": 30, "pa": true, "t": ["Teoria geral dos direitos fundamentais", "Direitos Humanos e Direitos Fundamentais", "Declaração Universal dos Direitos Humanos", "Agenda 2030 da ONU", "Decreto nº 6.949/2009 (Convenção Internacional sobre os Direitos das Pessoas com Deficiência)", "Resolução CNJ nº 401/2021; Inclusão, direitos e garantias legais e constitucionais das pessoas com deficiência (Lei nº 13.146/2015; Lei nº 11.126/2005 e Constituição Federal)", "Normas gerais e critérios básicos para a promoção da acessibilidade das pessoas com deficiência ou com mobilidade reduzida (Lei nº 10.098/2000; Lei nº 10.048/2000; Lei nº 7.853/1989; Decreto nº 5.296/2004)", "Prioridade de atendimento às pessoas com deficiência (Lei nº 10.048/2000; Lei nº 14.364/2022; Decreto nº 5.296/2004)", "Normas de apoio às pessoas com deficiência e sua integração social (Lei nº 7.853/1989 e Decreto nº 3.298/1999)"]}, {"c": "Informática e IA", "g": "G", "n": "Informática, Inteligência Artificial e Inovação", "o": 6, "p": 1, "s": 30, "pa": true, "t": ["MS-Office 365: conceito de pastas, diretórios, arquivos e atalhos, área de trabalho, área de transferência, manipulação de arquivos e pastas, uso dos menus, programas e aplicativos, interação com o conjunto de aplicativos MS-Office 365", "MS-Office 365 – Word: estrutura básica dos documentos, edição e formatação de textos, cabeçalhos, parágrafos, fontes, colunas, marcadores simbólicos e numéricos, tabelas, impressão, controle de quebras e numeração de páginas, legendas, índices, inserção de objetos, campos predefinidos, caixas de texto", "MS-Office 365 – Excel: estrutura básica das planilhas, conceitos de células, linhas, colunas, pastas e gráficos, elaboração de tabelas e gráficos, uso de fórmulas, funções e macros, impressão, inserção de objetos, campos predefinidos, controle de quebras e numeração de páginas, obtenção de dados externos, classificação de dados", "MS-Office 365 - PowerPoint: estrutura e formatação de apresentações; inserção de textos, imagens, tabelas, gráficos e SmartArt; organização de slides; criação e personalização de modelos e temas; aplicação de transições e animações; hiperlinks; inserção de áudio e vídeo; apresentação de slides; impressão e exportação em PDF; recursos para apresentações em ambiente institucional", "MS-Office 365 – OneDrive: conceito, armazenamento, sincronização de arquivos, compartilhamento e colaboração, integração com outros aplicativos do pacote MS-Office 365", "MS-Office 365 – SharePoint: conceito, armazenamento de documentos, arquivos e outros tipos de conteúdo em bibliotecas de documentos, facilitando o acesso e a colaboração", "Correio Eletrônico: uso de correio eletrônico, preparo e envio de mensagens, anexação de arquivos", "Conceito da plataforma Microsoft Teams e suas funcionalidades integradas, como reuniões online com recursos de videoconferência, agendamento de compromissos e eventos e chats", "Conceitos básicos de segurança da informação, abrangendo os princípios de confidencialidade, integridade e disponibilidade", "Resolução CNJ nº 615/2025", "Conceitos e definições: sistemas de IA, IA generativa, modelos de linguagem de larga escala e agentes", "Riscos e desafios da IA generativa: desinformação, violação de direitos autorais, vieses, impacto no trabalho e compartilhamento de dados sensíveis", "Resoluções CNJ nºs 395/2021 (Política de Gestão da Inovação), 615/2025, com as alterações da Resolução CNJ nº 674/2026 (Diretrizes para o desenvolvimento, utilização e governança de soluções desenvolvidas com recursos de inteligência artificial no Poder Judiciário) e 647/2025 (Acesso a dados pessoais constantes dos sistemas informatizados do CNJ)", "Portaria CNJ nº 379/2024 (capítulo 1 ao capítulo 4, e Anexo II)", "Noções básicas de redes de inovação, laboratórios de inovação, metodologia de inovação (design thinking) e inovação aberta"]}, {"c": "Sustentabilidade", "g": "G", "n": "Sustentabilidade e Meio Ambiente", "o": 7, "p": 1, "s": 30, "pa": true, "t": ["Noções de sustentabilidade: o princípio do desenvolvimento sustentável na CF/88; Objetivos de Desenvolvimento Sustentável – ONU; contratações sustentáveis na Lei nº 14.133/2021", "Política Nacional sobre Mudança do Clima (Lei nº 12.187/2009)", "Resolução nº 433/2021, do Conselho Nacional de Justiça (Política Nacional do Poder Judiciário para o Clima e Meio Ambiente)", "Resolução nº 709/2021 do Conselho da Justiça Federal (Política de Sustentabilidade da Justiça Federal)"]}, {"c": "Proc. Civil", "g": "E", "n": "Direito Processual Civil", "o": 0, "p": 2, "s": 60, "pa": false, "t": ["Código de Processo Civil (Lei n° 13.105/2015 e suas alterações)", "Teoria Geral e Parte Geral: princípios gerais, fontes, eficácia, aplicação e interpretação da lei processual civil", "Direito processual intertemporal", "Jurisdição: conceito, características, natureza jurídica, princípios e limites", "Competência: critérios determinadores; competência absoluta e relativa; modificações e meios de declaração de incompetência", "Conflitos de competência e de atribuições", "Competência originária dos tribunais superiores", "Da ação e do processo: elementos da ação, legitimidade e interesse; classificação e critérios identificadores", "Concurso e cumulação de ações", "Conexão e continência", "Relação jurídica processual e pressupostos processuais", "Processo e procedimento", "Objeto do processo, mérito, questão principal, questões preliminares e prejudiciais", "Sujeitos processuais: partes e procuradores; capacidade e legitimação; deveres e responsabilidades; representação e substituição processual", "Despesas, honorários advocatícios, multas e gratuidade da justiça", "Litisconsórcio", "Intervenção de terceiros: assistência; denunciação da lide; chamamento ao processo; incidente de desconsideração da personalidade jurídica; amicus curiae", "Juiz: poderes, deveres, responsabilidades, impedimento e suspeição", "Auxiliares da Justiça (perito, intérprete e tradutor)", "Funções essenciais à justiça: Ministério Público, Advocacia Pública e Defensoria Pública", "Prerrogativas da Fazenda Pública em juízo", "Atos processuais: forma, tempo, lugar, prazos e nulidades", "Comunicação dos atos processuais: citação, cartas, intimações, meios eletrônicos, Domicílio Judicial Eletrônico e Diário de Justiça Eletrônico Nacional – DJEN (Lei nº 14.195/2021; Resoluções CNJ nº 455/2022 e nº 569/2024 e suas atualizações)", "Cooperação judiciária nacional: atos concertados e auxílio direto (Resolução CNJ nº 350/2020)", "Tutela provisória: tutela de urgência (cautelar e antecipada) e tutela de evidência", "Processo de conhecimento e procedimento comum: formação, suspensão e extinção do processo", "Petição inicial: requisitos e pedido", "Indeferimento da petição inicial e improcedência liminar do pedido", "Contestação, reconvenção e revelia", "Providências preliminares, saneamento e julgamento conforme o estado do processo", "Provas: distribuição do ônus da prova; fatos que independem de prova; produção antecipada da prova; exame e valoração da prova", "Meios de prova: depoimento pessoal; confissão; exibição de documento ou coisa; prova documental; documentos eletrônicos; prova testemunhal; prova pericial; inspeção judicial", "Sentença e coisa julgada: conceito, classificações, elementos, efeitos e publicação da sentença", "Julgamento das ações relativas às prestações de fazer, de não fazer e de entregar coisa", "Remessa necessária", "Coisa julgada: conceito, espécies e limites", "Recursos e meios de impugnação: disposições gerais; apelação, agravo de instrumento, agravo interno, embargos de declaração, recurso especial e recurso extraordinário", "Repercussão geral, recursos repetitivos e Súmula Vinculante", "Ação rescisória e reclamação constitucional", "Execução e cumprimento de sentença: liquidação de sentença (espécies e procedimento)", "Cumprimento de sentença e meios de impugnação (impugnação ao cumprimento de sentença)", "Processo de execução de título extrajudicial: princípios gerais e espécies", "Execução por quantia certa: citação, arresto, penhora, depósito, avaliação, expropriação de bens e satisfação do crédito", "Execução de obrigação de fazer, de não fazer e de entregar coisa", "Defesas do executado: embargos à execução e exceção de pré-executividade", "Suspensão e extinção do processo de execução", "Remição da execução", "Fazenda Pública em juízo e execução fiscal: execução contra a Fazenda Pública (regime constitucional, legal e regulamentar de precatórios e requisições de pequeno valor – Emenda Constitucional nº 136/2025 e Resolução CJF nº 983/2026 e suas atualizações); execução fiscal (Lei nº 6.830/1980)", "Procedimentos especiais do Código de Processo Civil: generalidades, características e espécies; ação de consignação em pagamento; embargos de terceiro; ação monitória; restauração de autos", "Ações constitucionais e processo coletivo: ação popular; ação civil pública; mandado de segurança individual e coletivo; mandado de injunção; habeas data", "Jurisdição constitucional nos tribunais e processos nos tribunais: o processo civil nos sistemas de controle da constitucionalidade (ação direta de inconstitucionalidade – ADI; ação declaratória de constitucionalidade – ADC; declaração incidental de inconstitucionalidade)", "Incidente de assunção de competência - IAC", "Incidente de arguição de inconstitucionalidade", "Incidente de resolução de demandas repetitivas - IRDR"]}, {"c": "Civil", "g": "E", "n": "Direito Civil", "o": 8, "p": 2, "s": 60, "pa": false, "t": ["Lei: eficácia; aplicação no tempo e no espaço; interpretação", "Lei de Introdução às Normas do Direito brasileiro", "Pessoas naturais: personalidade e capacidade", "Direitos da personalidade", "Pessoas jurídicas", "Domicílio civil", "Bens", "Fatos jurídicos", "Negócios jurídicos", "Atos jurídicos lícitos", "Atos ilícitos", "Prescrição e decadência", "Direito das obrigações", "Contratos: disposições gerais; compra e venda; prestação de serviço; empreitada; mandato; transação", "Responsabilidade civil", "Penhor, hipoteca e anticrese"]}, {"c": "Constitucional", "g": "E", "n": "Direito Constitucional", "o": 9, "p": 2, "s": 60, "pa": false, "t": ["Princípios fundamentais da República Federativa do Brasil", "Direitos e garantias fundamentais: direitos e deveres individuais e coletivos; direitos sociais; nacionalidade; direitos políticos", "Remédios constitucionais e ações constitucionais: habeas corpus; habeas data; mandado de segurança; mandado de injunção; ação popular; ação civil pública", "Organização político-administrativa: disposições gerais; bens e competências da União, estados, Distrito Federal e municípios", "Intervenção federal", "Administração Pública: disposições gerais; servidores públicos", "Organização dos Poderes", "Poder Executivo: atribuições e responsabilidades do Presidente da República", "Poder Legislativo: órgãos e atribuições; processo legislativo; fiscalização contábil, financeira e orçamentária", "Poder Judiciário: disposições gerais; Supremo Tribunal Federal; Conselho Nacional de Justiça; Superior Tribunal de Justiça; Tribunais Regionais Federais e juízes federais; Juizados Especiais Federais; tribunais e juízes dos estados; tribunais e juízes do trabalho; Conselho Superior da Justiça do Trabalho", "Funções essenciais à Justiça: Ministério Público; Advocacia Pública; Advocacia; Defensoria Pública", "Controle de constitucionalidade: sistemas difuso e concentrado; ação direta de inconstitucionalidade - ADI; ação declaratória de constitucionalidade - ADC; arguição de descumprimento de preceito fundamental – ADPF", "Efeitos da declaração de inconstitucionalidade", "Ordem econômica e financeira: princípios gerais da atividade econômica", "Finanças Públicas: normas gerais; regime constitucional dos precatórios (art. 100 da Constituição Federal e emendas constitucionais vigentes); dos orçamentos", "Ordem social: disposição geral; seguridade social (saúde, previdência social e assistência social)"]}, {"c": "Administrativo", "g": "E", "n": "Direito Administrativo e Administração Pública", "o": 10, "p": 2, "s": 60, "pa": false, "t": ["Regime jurídico administrativo", "Princípios constitucionais e legais da Administração Pública", "Princípios administrativos implícitos", "Lei de Introdução às Normas do Direito brasileiro (Decreto-Lei nº 4.657/1942) e sua aplicação na Administração Pública", "Poderes da Administração Pública", "Poderes e deveres dos administradores públicos", "Uso e abuso do poder", "Lei de abuso de autoridade (Lei nº 13.869/2019)", "Organização da administração direta e indireta", "Órgãos públicos", "Aspectos gerais da administração direta", "Autarquias", "Empresas públicas e sociedades de economia mista", "Fundações públicas", "Consórcios públicos", "Agências reguladoras e executivas (Lei nº 13.848/2019 e suas alterações)", "Entes de colaboração e entidades paraestatais", "Ato administrativo: conceito, características, atributos, elementos, requisitos de validade, classificação, formação, efeitos e extinção (revogação, invalidação, convalidação, cassação e caducidade)", "Licitações e contratos administrativos (Lei nº 14.133/2021 e suas alterações): princípios, objetivos, contratação direta (dispensa e inexigibilidade), modalidades de licitação, critérios de julgamento e fases do procedimento", "Contratos administrativos: formalização, execução, alteração, extinção e sanções administrativas", "Processo administrativo: Lei nº 9.784/1999", "Controle da Administração Pública: classificações relativas ao controle; controle externo e procedimentos de tomadas de contas", "Lei de Improbidade Administrativa (Lei nº 8.429/1992, com as alterações da Lei nº 14.230/2021)", "Serviço público: conceito, classificação, princípios, formas de delegação (regime jurídico da concessão e da permissão – Lei nº 8.987/1995), extinção, reversão dos bens e direitos dos usuários", "Parcerias público-privadas (Lei nº 11.079/2004)", "Agentes públicos: classificação; cargo, emprego e função pública; provimento, investidura, exercício e afastamentos", "Direito de greve", "Regime constitucional dos servidores públicos na Constituição Federal", "Regime de emprego público e disposições da CLT aplicáveis", "Responsabilidade civil, administrativa e penal dos agentes públicos", "Processo administrativo disciplinar", "Regime jurídico dos servidores públicos civis da União, das autarquias e das fundações públicas federais (Lei nº 8.112/1990 e suas alterações)", "Gestão por processos", "Gestão de riscos", "Gestão de projetos", "Processos de análise e tomada de decisão", "Gerenciamento de crise", "Compliance: conceitos, suporte da alta administração, código de conduta, controles internos, treinamento e comunicação", "Gestão Estratégica do Poder Judiciário (Resolução CNJ nº 325/2020 e as diretrizes normativas para o ciclo subsequente do CNJ)", "Ferramentas de análise para gestão e planejamento estratégico, tático e operacional: Balanced Scorecard – BSC, estratégias, indicadores de gestão, gestão de projetos e gestão por competências"]}, {"c": "Tributário", "g": "E", "n": "Direito Tributário", "o": 1, "p": 2, "s": 60, "pa": false, "t": ["Normas gerais de Direito Tributário", "Fontes do Direito Tributário", "Norma tributária: vigência, aplicação, interpretação e integração", "Tributo: conceito, natureza jurídica e espécies", "Hipótese de incidência: conceito e aspectos", "Fato gerador", "Obrigações tributárias: conceito e espécies, sujeitos ativo e passivo", "Obrigação principal e acessória", "Crédito tributário: conceito, natureza, lançamento, modalidades e revisão do lançamento, suspensão, extinção e exclusão do crédito tributário", "Responsabilidade tributária", "O Sistema Tributário Nacional: limitações constitucionais ao poder de tributar, imunidade tributária, competência tributária, tributos federais", "A Reforma Tributária do consumo: Emenda Constitucional nº 132/2023 e suas leis complementares de regulamentação (Leis Complementares nº 214/2025 e nº 227/2025)", "Imposto sobre Bens e Serviços – IBS, Contribuição Social sobre Bens e Serviços – CBS e Imposto Seletivo – IS", "Administração tributária: fiscalização, certidões negativas e sigilo fiscal", "Garantias e privilégios do crédito tributário", "Processo Tributário: processo administrativo tributário (Lei Complementar nº 227/2025)", "Processo judicial tributário: ações de iniciativa do Fisco (Execução Fiscal – Lei nº 6.830/1980 e cautelar fiscal) e ações de iniciativa do contribuinte (ações declaratória, anulatória, de repetição de indébito, de consignação em pagamento e Mandado de Segurança)", "Cobrança da dívida ativa: inscrição, presunção de legitimidade e a transação tributária federal (Lei nº 13.988/2020 e suas alterações)"]}, {"c": "Penal", "g": "E", "n": "Direito Penal", "o": 11, "p": 2, "s": 60, "pa": true, "t": ["Princípios de Direito Penal", "Aplicação da lei penal", "Crime", "Imputabilidade penal", "Concurso de pessoas", "Penas: espécies de pena, regimes de pena e substituições da pena", "Ação penal", "Extinção da punibilidade: causas de extinção e o Acordo de Não Persecução Penal - ANPP", "Crimes contra o patrimônio: furto, roubo, apropriação indébita, estelionato e outras fraudes", "Crimes contra a fé pública: moeda falsa, falsidade de títulos e outros papéis públicos, falsidade documental", "Crimes praticados por funcionário público e por particular contra a Administração em geral", "Crimes contra a Administração da justiça", "Crimes contra a ordem tributária e econômica (Lei nº 8.137/1990)", "Crimes ambientais (Lei nº 9.605/1998)", "Crimes em licitações e contratos administrativos (arts. 337-E a 337-P do Código Penal, introduzidos pela Lei nº 14.133/2021)", "Lavagem de dinheiro (Lei nº 9.613/1998)", "Organizações criminosas (Lei nº 12.850/2013)"]}, {"c": "Proc. Penal", "g": "E", "n": "Direito Processual Penal", "o": 12, "p": 2, "s": 60, "pa": true, "t": ["Sistemas processuais penais: o sistema acusatório e o Juiz das Garantias (arts. 3º-A a 3º-F do CPP)", "Inquérito policial: natureza, início, dinâmica, prazos de conclusão e arquivamento", "Ação penal: conceito, espécies, condições, denúncia e queixa", "Competência: territorial, absoluta e relativa; competência por prerrogativa de função; modificações, conexão, continência e exceções", "Questões e processos incidentes: restituição das coisas apreendidas e medidas assecuratórias", "Prova: teoria geral da prova, sistemas de valoração e exame de corpo de delito", "Cadeia de custódia da prova (arts. 158-A a 158-F do CPP)", "Busca e apreensão", "Prisão, medidas cautelares e liberdade provisória: prisão em flagrante, prisão preventiva e audiência de custódia", "Atos processuais: forma, tempo e prazos", "Comunicação dos atos processuais: citações e intimações", "Instrução criminal: procedimento comum (ordinário e sumário) e o procedimento nos Juizados Especiais Cíveis e Criminais Federais (Lei nº 10.259/2001 e Lei nº 9.099/1995)", "Sentença penal: conceito, elementos, requisitos e publicação", "Nulidades processuais penais", "Meios de impugnação: recursos em geral; recursos em espécie e ações impugnativas autônomas (habeas corpus e revisão criminal)", "Execução penal: aspectos gerais da Lei nº 7.210/1984 e o regime dos estabelecimentos penais federais (Lei nº 11.671/2008)"]}, {"c": "Previdenciário", "g": "E", "n": "Direito Previdenciário", "o": 13, "p": 2, "s": 60, "pa": true, "t": ["Seguridade social: origem e evolução legislativa no Brasil, conceito, organização e princípios constitucionais", "Aspectos constitucionais da previdência social (arts. 201 e 202 da Constituição Federal)", "Organização da assistência social: Benefício de Prestação Continuada – BPC (Lei nº 8.742/1993 e suas alterações)", "Regimes de previdência social", "Regime Geral da Previdência Social - RGPS: beneficiários, prestações e benefícios em espécie, custeio e financiamento (Leis nº 8.212/1991 e nº 8.213/1991 e suas alterações)", "Regulamento da Previdência Social (Decreto nº 3.048/1999 e suas alterações)", "Previdência social do servidor público (Regime Próprio – RPPS): noções gerais, benefícios, custeio e as diretrizes da Lei nº 9.717/1998 e suas alterações", "Previdência complementar: regime das entidades fechadas e abertas (Leis Complementares nº 108/2001 e nº 109/2001)", "Regime de Previdência Complementar dos Servidores Públicos Federais (Lei nº 12.618/2012 e suas alterações)", "Processo judicial previdenciário e assistencial no âmbito dos Juizados Especiais Federais (Lei nº 10.259/2001)", "Cumprimento de sentença e execução em matéria previdenciária: Requisições de Pequeno Valor – RPV e precatórios judiciais"]}, {"c": "Ambiental", "g": "E", "n": "Direito Ambiental", "o": 14, "p": 2, "s": 60, "pa": false, "t": ["Direito ambiental constitucional", "Meio ambiente como direito fundamental", "Princípios estruturantes do estado de direito ambiental", "Competências ambientais legislativa e material", "Política Nacional de Meio Ambiente", "Objetivos", "Instrumentos de proteção (técnicos e econômicos)", "SISNAMA: estrutura e funcionamento", "Lei nº 6.938/1981 e suas alterações", "Decreto nº 99.274/1990 e suas alterações", "Resolução do CONAMA nº 1/1986 e suas alterações (relatório de impacto ambiental - EIA-RIMA)", "Resolução do CONAMA nº 237/1997 (licenciamento ambiental)", "Recursos hídricos", "Lei nº 9.433/1997 e suas alterações (instrumentos de gestão de recursos hídricos)", "Recursos florestais", "Lei nº 12.651/2012 e suas alterações", "Resoluções do CONAMA nº 302/2002 e 303/2002", "Lei nº 11.284/2006 e suas alterações (gestão de florestas públicas)", "Significado de gestão e de concessão florestal", "Espaços territoriais especialmente protegidos", "Áreas de preservação permanente e reserva legal", "Lei nº 9.985/2000 e suas alterações (SNUC)", "Responsabilidades", "Efeito, impacto e dano ambiental", "Poluição", "Responsabilidade administrativa, civil e penal", "Tutela processual", "Crimes ambientais: espécies e sanções penais previstas", "Súmulas e jurisprudência vinculante do STF e STJ"]}]};
function ccKey(m){return m.c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function ccBase(){var c=S.cc;if(!c||typeof c!=='object')c=S.cc={};c.ok=c.ok||{};c.mc=c.mc||{};c.q=c.q||{};c.aberta=c.aberta||{};return c;}
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.cc=(p&&p.cc&&typeof p.cc==='object')?p.cc:{};return b;};})();
function ccDia(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2]);}
function ccSeg(s){var d=ccDia(s),w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return d;}
function ccIso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function ccBr(s){var p=s.split('-');return p[2]+'/'+p[1]+'/'+p[0];}
function ccProg(m){var v=(ccBase().ok[ccKey(m)]||[]).length;return{v:v,t:m.t.length,f:m.t.length?v/m.t.length:0};}
function ccGeral(){var sw=0,sp=0,v=0,t=0;CONC.mat.forEach(function(m){var p=ccProg(m);sw+=m.p*p.f;sp+=m.p;v+=p.v;t+=p.t;});return{pct:sp?Math.round(sw/sp*100):0,v:v,t:t};}
function ccSemanaMin(){var ini=ccSeg(hoje()),fim=new Date(ini);fim.setDate(fim.getDate()+7);var a=ccIso(ini),b=ccIso(fim),m=0;
 ((S.est&&S.est.blocos)||[]).forEach(function(x){if(x.data>=a&&x.data<b)m+=(x.min|0);});return m;}
function ccHojeMin(){var h=hoje(),m=0;((S.est&&S.est.blocos)||[]).forEach(function(x){if(x.data===h)m+=(x.min|0);});return m;}
function ccSemKey(){return ccIso(ccSeg(hoje()));}

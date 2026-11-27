/* ======================= MODO OPERACIONAL · Posto de comando =======================
   Uma tela, sem rolagem: linha do dia, foco, o que fazer hoje, caixa de Hermes e compromissos.
   Lê e grava os mesmos dados do app; o rodapé de registro continua embaixo.
   É a página inicial: o app sempre abre aqui; o templo fica a um clique (templo completo, OP, Alt+O). */
var OP_FX_COR={'06':['#FAEEDA','#633806'],'09':['#FAC775','#633806'],'12':['#EAF3DE','#27500A'],'15':['#E6F1FB','#0C447C'],'18':['#EEEDFE','#3C3489'],'21':['#FBEAF0','#72243E']};
function opMin(){var d=new Date();return d.getHours()*60+d.getMinutes();}
function opLinhaHTML(){var hj=hoje(),tb=S.tb||{},a=opMin(),ini=360,fim=1440,pct=function(m){return Math.max(0,Math.min(100,(m-ini)/(fim-ini)*100));};
 var seg=TD_H.map(function(H){var m0=+H*60,m1=m0+180,txt=(tb[hj+'|'+H]||'').trim(),c=OP_FX_COR[H]||['#eee','#333'],st=a>=m1?' op-passou':(a>=m0?' op-atual':'');
  return '<button type="button" class="op-seg'+st+'" data-opfx="'+H+'" style="--b:'+c[0]+';--t:'+c[1]+'" title="'+esc(H+'–'+(+H+3)+'h · '+tdFaixaNome(H)+(txt?' · '+txt:''))+'"><b>'+esc(tdFaixaNome(H))+'</b><span>'+esc(txt||'livre')+'</span></button>';}).join('');
 var pts='';try{rtD().toques.forEach(function(t){if(!t.on)return;var m=rtMin(t.h);if(m<ini)return;pts+='<i class="op-pt op-con'+(m<a?' op-ido':'')+'" style="left:'+pct(m)+'%" title="'+esc(t.h+' · '+t.n)+'"></i>';});}catch(e){}
 try{agDoDia(hj).forEach(function(x){if(x.dia)return;var m=x.ini.getHours()*60+x.ini.getMinutes();pts+='<i class="op-pt op-ag'+(m<a?' op-ido':'')+'" style="left:'+pct(m)+'%" title="'+esc(agHora(x)+' · '+x.t)+'"></i>';});}catch(e){}
 var hs='';for(var h=6;h<=24;h+=3)hs+='<span style="left:'+pct(h*60)+'%">'+String(h).padStart(2,'0')+'</span>';
 return '<div class="op-linha"><div class="op-segs">'+seg+'</div><div class="op-pts">'+pts+'</div><div class="op-agora" style="left:'+pct(a)+'%"><em>'+String(Math.floor(a/60)).padStart(2,'0')+':'+String(a%60).padStart(2,'0')+'</em></div><div class="op-hs">'+hs+'</div></div>';}
function opFocoHTML(){var f=tdD().foco,P=tdPref(),H=tdHojeFoco(),nm='';try{nm=tdBlocoCiclo();}catch(e){}
 var hj=hoje(),H0=null;TD_H.forEach(function(x){if(opMin()>=+x*60)H0=x;});var faixa=H0?((S.tb||{})[hj+'|'+H0]||tdFaixaNome(H0)):'antes da alvorada';
 if(!f)return '<div class="op-fx"><span class="op-k">faixa de agora</span><b>'+esc(faixa)+'</b></div>'+
  '<div class="op-ch">'+[15,25,45,50,90].map(function(m){return '<button type="button" data-opf="m'+m+'"'+(P.ult===m?' class="on"':'')+'>'+m+'</button>';}).join('')+'</div>'+
  '<div class="op-bt"><button type="button" class="op-pri" data-opf="5">só 5 minutos</button>'+(nm?'<button type="button" data-opf="ciclo">ciclo · '+esc(nm)+'</button>':'')+'</div>'+
  '<p class="op-hj">hoje: <b>'+H.n+'</b> bloco'+(H.n===1?'':'s')+' · <b>'+tdHM(H.m)+'</b></p>';
 var rest=tdFocoRest(),fr=f.dur?rest/f.dur:0,modo=f.pausa!=null?'pausado':(rest<=60000?'fim':(f.pausaModo?'pausa':'rodando'));
 return '<div class="op-fx"><span class="op-k">'+(f.pausaModo?'pausa':'em foco')+'</span><b>'+esc(f.rot)+'</b></div>'+
  '<div class="op-bt op-bt4"><button type="button" data-opf="pausa">'+(f.pausa!=null?'retomar':'pausar')+'</button><button type="button" data-opf="mais">+5</button><button type="button" data-opf="menos">−5</button><button type="button" class="op-pri" data-opf="fim">encerrar</button></div>'+
  '<p class="op-hj">hoje: <b>'+H.n+'</b> bloco'+(H.n===1?'':'s')+' · <b>'+tdHM(H.m)+'</b></p>';}
function opFazerHTML(){var Q=mmD(),hj=hoje(),fe=Q.feitas[hj]||[],lim=function(arr,n){return {v:arr.slice(0,n),r:Math.max(0,arr.length-n)};};
 var ch=lim(Q.chale.filter(function(t){return !t.ok||t.ok===hj;}),6),qd=lim(Q.dia,5),pf=Q.prof.filter(function(p){return !p.ok;}).slice(0,3);
 var li=function(ok,attr,t){return '<li class="'+(ok?'ok':'')+'"><button type="button" class="op-ck" '+attr+'>'+(ok?'✓':'')+'</button><span>'+esc(t)+'</span></li>';};
 var h='<div class="op-grp"><span class="op-k">chalé</span><ul>'+(ch.v.map(function(t){return li(!!t.ok,'data-opch="'+t.id+'"',t.t);}).join('')||'<li class="op-vz">nada pendente</li>')+(ch.r?'<li class="op-mais">+'+ch.r+' no mural</li>':'')+'</ul></div>';
 h+='<div class="op-grp"><span class="op-k">diárias · '+fe.length+'/'+Q.dia.length+'</span><ul>'+(qd.v.map(function(t){return li(fe.indexOf(t.id)>=0,'data-opq="'+t.id+'"',t.t);}).join('')||'<li class="op-vz">sem quests</li>')+(qd.r?'<li class="op-mais">+'+qd.r+'</li>':'')+'</ul></div>';
 h+='<div class="op-grp"><span class="op-k">profecia · próxima etapa</span><ul>'+(pf.map(function(p){var i=(p.passos||[]).findIndex(function(x){return !x.ok;}),dd=p.prazo?mmDias(p.prazo):null;
   return i>=0?li(false,'data-oppp="'+p.id+':'+i+'"',p.passos[i].t+' · '+p.t):'<li class="op-vz">'+esc(p.t)+(dd!=null?' · faltam '+dd+' dias':'')+' · sem etapa</li>';}).join('')||'<li class="op-vz">nenhuma profecia</li>')+'</ul></div>';
 return h+'<div class="op-add"><input data-opadd placeholder="+ tarefa do Chalé" maxlength="80"></div>';}
function opEscudo(){var f=tdD().foco;if(!f)return tdEscudo(0,'parado');var rest=tdFocoRest(),fr=f.dur?rest/f.dur:0,modo=f.pausa!=null?'pausado':(rest<=60000?'fim':(f.pausaModo?'pausa':'rodando'));
 return tdEscudo(fr,modo,tdMMSS(rest),f.pausa!=null?'pausado':(f.pausaModo?'pausa':''));}
function opLadoHTML(){var it=[];Array.prototype.forEach.call(document.querySelectorAll('#rail-in .rlist li:not(.rvz)'),function(l){var t=(l.childNodes[0]&&l.childNodes[0].textContent||l.textContent).trim();if(t)it.push(t);});
 var h='<div class="op-grp"><span class="op-k">píthos · despeje aqui</span><div class="op-cap"><input data-opcap placeholder="despeje antes de perder" maxlength="140"><button type="button" data-opcapb>guardar</button></div><ul class="op-cl">'+
  (it.slice(0,4).map(function(t){return '<li>'+esc(t)+'</li>';}).join('')||'<li class="op-vz">caixa vazia</li>')+(it.length>4?'<li class="op-mais">+'+(it.length-4)+'</li>':'')+'</ul></div>';
 var a=opMin(),L=[];try{rtD().toques.forEach(function(t){if(t.on&&rtMin(t.h)>=a)L.push({m:rtMin(t.h),h:t.h,t:t.n,k:'concha'});});}catch(e){}
 try{agDoDia(hoje()).forEach(function(x){if(x.dia)return;var m=x.ini.getHours()*60+x.ini.getMinutes();if(m>=a)L.push({m:m,h:agHora(x),t:x.t,k:'ag'});});}catch(e){}
 try{rtGradeHoje().forEach(function(x){if(x.m>=a)L.push({m:x.m,h:x.h,t:x.t,k:'grade'});});}catch(e){}
 L.sort(function(p,q){return p.m-q.m;});
 h+='<div class="op-grp"><span class="op-k">próximos de hoje</span><ul class="op-prox">'+(L.slice(0,5).map(function(x){return '<li class="op-'+x.k+'"><b>'+esc(x.h)+'</b><span>'+esc(x.t)+'</span></li>';}).join('')||'<li class="op-vz">nada mais marcado hoje</li>')+'</ul></div>';
 var B=(S.bandeira||{})[acIso(acSeg(new Date()))]||{};
 h+='<div class="op-grp op-band"><span class="op-k">bandeira da semana</span><b>'+esc(B.meta||'— sem bandeira —')+'</b>'+(B.ok?'<small>capturada</small>':'')+'</div>';
 return h;}
function opMonta(){var o=document.getElementById('modo-op');if(o)return o;o=document.createElement('section');o.id='modo-op';o.setAttribute('aria-label','Modo operacional');
 o.innerHTML='<header class="op-top"><div><span class="op-k">posto de comando · chalé 7</span><b class="op-dt"></b></div><div class="op-topr" data-notr></div></header>'+
  '<div class="op-l"></div><div class="op-g"><section class="op-c op-foco"><div class="op-esc"></div><div class="op-foco-c"></div></section><section class="op-c op-fazer"></section><section class="op-c op-lado"></section></div>';
 document.body.appendChild(o);
 o.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var d=b.dataset,td=tdD(),f=td.foco,P=tdPref(),Q=mmD(),hj=hoje();
  if(d.opsair!=null){opModo(false);return;}
  if(d.opfx){opModo(false);setTimeout(function(){var g=document.querySelector('.wrap > div.tb');if(g)g.scrollIntoView({behavior:'smooth',block:'start'});},80);return;}
  if(d.opf){var k=d.opf;if(k==='5')tdSo5();else if(/^m\d+$/.test(k)){P.ult=+k.slice(1);tdFocoIni(P.ult,'bloco de '+P.ult+' min',-1);}
   else if(k==='ciclo'){var nm=tdBlocoCiclo();tdFocoIni(P.ult||25,nm?'Tática · '+nm:'bloco do ciclo',-1);}
   else if(k==='pausa'&&f){if(f.pausa==null)f.pausa=tdFocoRest();else{f.ini=Date.now()-(f.dur-f.pausa);f.pausa=null;}tdSalva();}
   else if(k==='mais'&&f){f.dur+=5*60000;if(f.pausa!=null)f.pausa+=5*60000;f.avisou=0;tdSalva();}
   else if(k==='menos'&&f){if(tdFocoRest()>5*60000){f.dur-=5*60000;if(f.pausa!=null)f.pausa-=5*60000;tdSalva();}}
   else if(k==='fim')tdFocoFim(!f||!f.pausaModo);
   try{tdDisco(true);}catch(z){}opPinta();return;}
  if(d.opch){var c=Q.chale.filter(function(x){return x.id===d.opch;})[0];if(c)c.ok=c.ok?false:hj;mmSalva();opPinta();return;}
  if(d.opq){var fe=Q.feitas[hj]=Q.feitas[hj]||[],i=fe.indexOf(d.opq);if(i>=0)fe.splice(i,1);else fe.push(d.opq);mmSalva();opPinta();return;}
  if(d.oppp){var pp=d.oppp.split(':'),p=Q.prof.filter(function(x){return x.id===pp[0];})[0];if(p&&p.passos[+pp[1]])p.passos[+pp[1]].ok=true;mmSalva();opPinta();return;}
  if(d.opcapb!=null){opCaptura();return;}});
 o.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var t=e.target;
  if(t.dataset.opadd!=null){var v=t.value.trim();if(!v)return;mmD().chale.push({id:mmId(),t:v.slice(0,80),ok:false});mmSalva();t.value='';opPinta();setTimeout(function(){var n=o.querySelector('[data-opadd]');if(n)n.focus();},30);}
  else if(t.dataset.opcap!=null){e.preventDefault();opCaptura();}});
 return o;}
function opCaptura(){var o=document.getElementById('modo-op'),i=o&&o.querySelector('[data-opcap]');if(!i||!i.value.trim())return;var r=document.getElementById('r-cap'),b=document.getElementById('b-rcap');
 if(r&&b){r.value=i.value.trim();b.click();}i.value='';setTimeout(function(){opPinta();var n=document.querySelector('#modo-op [data-opcap]');if(n)n.focus();},120);}
function opPinta(){var o=document.getElementById('modo-op');if(!o||!document.body.classList.contains('op-on'))return;try{opTopR();}catch(e){}var a=document.activeElement,foco=a&&o.contains(a)&&/INPUT|TEXTAREA/.test(a.tagName);
 o.querySelector('.op-dt').textContent=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})+' · '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
 var set=function(sel,h){var n=o.querySelector(sel);if(n&&(n._h!==h||!n.firstChild)&&!(foco&&n.contains(a))){n.innerHTML=h;n._h=h;}};
 set('.op-l',opLinhaHTML());set('.op-esc',opEscudo());var fc=opFocoHTML().replace(/<b>\d+:\d+<\/b>/,'');set('.op-foco-c',opFocoHTML());set('.op-fazer',opFazerHTML());set('.op-lado',opLadoHTML());}
/* extensão do Chrome: versão publicada em downloads/ (mesma do extensao/manifest.json); ao publicar uma nova, troque só aqui */
var EXT_V='0.7.2',EXT_ZIP='downloads/astronautica-extensao-'+EXT_V+'.zip';
function extBaixada(){try{return localStorage.getItem('astro-ext-baixada')||'';}catch(e){return '';}}
/* cabeçalho, lado direito, montado só aqui: duas pílulas.
   alvo: desviei (com − quando há tracinho), travei, tarefa chata, ronda · caminho: manual, extensão (baixar / atualizar / em dia), templo completo.
   No Valhala, depois das 18h e com a fogueira apagada, entra "acender a fogueira" entre as duas. */
function opTopR(){var tr=document.querySelector('#modo-op .op-topr');if(!tr)return;var n=0,R={on:false,h:[]},fogo=false;
 try{n=ciHoje();}catch(e){}try{R=cxD().ronda||R;}catch(e){}try{fogo=TV_ON&&opMin()>=18*60&&!fgFeita();}catch(e){}
 var h='<span class="op-pill op-pill-alvo" role="group" aria-label="desvios e travas">'+
  '<button type="button" class="op-cila" data-cila title="Desviei do alvo (Alt+D)">desviei <em>'+n+'</em></button>'+
  (n?'<button type="button" class="op-cila-menos" data-cilamenos title="tirar o último tracinho de hoje" aria-label="tirar o último tracinho de hoje">−</button>':'')+
  '<button type="button" class="cx-trv" data-cxa="trav">travei</button><button type="button" data-cxa="esc">tarefa chata</button>'+
  '<button type="button" class="cx-rdb" data-cxa="rd" title="horários da ronda">ronda <small>'+(R.on&&R.h.length?esc(R.h.join(' · ')):'desligada')+'</small></button></span>'+
  (fogo?'<button type="button" class="op-fogo" data-fogo>acender a fogueira</button>':'')+
  '<span class="op-pill op-pill-nav" role="group" aria-label="consulta, extensão e templo"><button type="button" class="cx-mfb" data-cxa="mf">manual</button>'+opExtHTML()+'<button type="button" class="op-sair" data-opsair>templo completo</button></span>';
 if(tr._h!==h){tr.innerHTML=h;tr._h=h;}}
function opExtHTML(){var b=extBaixada(),st=!b?'nova':(b===EXT_V?'ok':'atual');
 var tx=st==='nova'?'baixar extensão':st==='atual'?'atualizar extensão':'extensão <small>'+EXT_V+' ✓</small>';
 var ti=st==='ok'?'Extensão '+EXT_V+' já baixada. Baixar de novo':'Baixar a extensão do Chrome '+EXT_V+(st==='atual'?' (você tem a '+b+')':'');
 return '<a class="op-ext op-ext-'+st+'" href="'+EXT_ZIP+'" download="astronautica-extensao-'+EXT_V+'.zip" data-opext title="'+esc(ti)+'">'+tx+'</a>';}
window.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-opext]');if(!a)return;var b=extBaixada();
 try{localStorage.setItem('astro-ext-baixada',EXT_V);}catch(z){}setTimeout(function(){try{opTopR();}catch(z){}},300);
 try{tdAvisa(b&&b!==EXT_V?'Extensão '+EXT_V+' baixada':'Extensão baixada',b?'Para atualizar: descompacte o zip por cima da pasta antiga, abra chrome://extensions e toque em recarregar na Astronáutica.':'Para instalar: descompacte o zip, abra chrome://extensions, ligue o modo do desenvolvedor e use "Carregar sem compactação" na pasta.');}catch(z){}},true);
function opModo(on){if(typeof on!=='boolean')on=!document.body.classList.contains('op-on');opMonta();document.body.classList.toggle('op-on',on);try{localStorage.setItem('astro_modo',on?'op':'templo');}catch(e){}
 var b=document.getElementById('op-tg');if(b){b.setAttribute('aria-pressed',String(on));}if(on){opPinta();window.scrollTo(0,0);}}
function opBotao(){var n=document.getElementById('tt-indice');if(!n||document.getElementById('op-tg'))return;var b=document.createElement('button');b.type='button';b.id='op-tg';b.className='op-tg';b.title='Modo operacional · tudo numa tela';
 b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="1.5"/><path d="M3 9h18M9 9v9M8 21h8"/></svg><span>operacional</span>';b.addEventListener('click',function(){opModo();});
 var p=n.querySelector('.pd-pilula');if(p)n.insertBefore(b,p);else n.appendChild(b);}
(function(){var i0=ttIcones;ttIcones=function(){i0();try{opBotao();}catch(e){}};})();
setInterval(function(){try{opPinta();}catch(e){}},1000);
/* abre o Posto quando todo o app.js já rodou (com as reformas dos arquivos seguintes), antes de a abertura sair */
document.addEventListener('DOMContentLoaded',function(){try{opBotao();opModo(true);}catch(e){console.error('posto:',e);}});
document.addEventListener('keydown',function(e){if(e.altKey&&(e.key==='o'||e.key==='O')){e.preventDefault();opModo();}});
/* guarda de verdade o estado dos companheiros e do pacote do dia: o normaliza só mantinha chaves conhecidas */
var EXTRA_K=['satiro','corvo','antag','flecha','cila','fogueira','vales','fogConv'];
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);EXTRA_K.forEach(function(k){if(p&&p[k]!==undefined&&p[k]!==null)b[k]=p[k];});return b;};})();
(function(){try{var r=JSON.parse(KEY_RAW0||'null');if(!r)return;var mud=false;EXTRA_K.forEach(function(k){if(r[k]!==undefined&&S[k]===undefined){S[k]=r[k];mud=true;}});if(mud)try{grava();}catch(e){}}catch(e){}})();
/* ======================= KÁLAMO · o sátiro protetor do chalé 7 =======================
   Fareja as designações do gabinete (pautas publicadas no Ex Officio · procs-muta/acervo/sessoes),
   calcula o que falta, o prazo e a meta de hoje, e sobe de nível quando o Hékatos entrega.
   Só lê; não grava nada no gabinete. Não guarda nome de partes. */
var GAB_RAW='https://raw.githubusercontent.com/trf3bdutra/procs-muta/main/acervo/sessoes/';
var GAB={carregando:false,erro:'',em:0,exp:null,ses:[],agenda:[]};
var SAT_NV=[[0,'Cabrito do bosque'],[100,'Guardião de trilha'],[300,'Protetor credenciado'],[600,'Farejador de prazos'],[1000,'Conselheiro do Bosque'],[1600,'Senhor da Mata']];
var SAT_PAPEL={minutar:['minutas','minutar'],corrigir:['correções','corrigir']};
try{var g0=JSON.parse(localStorage.getItem('astro_gab')||'null');if(g0&&g0.ses){GAB.em=g0.em||0;GAB.exp=g0.exp||null;GAB.ses=g0.ses;GAB.agenda=g0.agenda||[];}}catch(e){}
function satCfg(){S.satiro=S.satiro||{};var s=S.satiro;if(!s.nome)s.nome='Bruno';if(s.xp==null)s.xp=100;s.feitos=s.feitos||{};s.metas=s.metas||{};return s;}
function gabNorm(t){return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();}
function gabEu(n){var me=gabNorm(satCfg().nome);if(!me||!n)return false;return gabNorm(n).split(/\s*(?:\/|,|;|&|\+|\se\s)\s*/).some(function(p){p=p.trim();return p===me||p.split(/\s+/)[0]===me;});}
function gabDM(iso){return iso?iso.slice(8,10)+'/'+iso.slice(5,7):'';}
function gabMais(iso,n){var d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function gabUtil(iso){var E=GAB.exp||{},ds=E.diasSemana||[1,2,3,4,5],sem=E.semExpediente||[];return ds.indexOf(new Date(iso+'T12:00:00').getDay())>=0&&sem.indexOf(iso)<0;}
function gabDias(a,b){var n=0,d=a,i=0;while(d<=b&&i<400){if(gabUtil(d))n++;d=gabMais(d,1);i++;}return n;}
function gabAntes(iso){var d=gabMais(iso,-1),i=0;while(!gabUtil(d)&&i<30){d=gabMais(d,-1);i++;}return d;}
function gabFeriado(iso){var E=GAB.exp||{};return (E.nomes&&E.nomes[iso])||'';}
/* uma pauta publicada → o que é meu nela */
function gabProcessa(cal,doc){var m=cal.marcos||{},it=(doc&&doc.itens)||[],out={date:cal.date,nome:cal.nome||gabDM(cal.date),marcos:m,itens:[]};
 it.forEach(function(i){if(/retirad/i.test(i.resultado||''))return;var ct=i.ctl||{},pend=((ct.cartao&&ct.cartao.pendencias)||[]).filter(function(p){return p&&!p.ok;}).length;
  var base={cnj:i.cnj||'',n:i.item||'',cl:i.classe||'',as:i.assunto||'',jg:(i.julgamento&&i.julgamento!=='—')?i.julgamento:'',pend:pend,meta:ct.meta||''};
  if(gabEu(i.servidor))out.itens.push(Object.assign({p:'minutar',em:i.dataMinuta||''},base));
  if(gabEu(i.corretor))out.itens.push(Object.assign({p:'corrigir',em:i.dataCorrecao||'',mi:!!i.dataMinuta,dupla:/[\/,&]/.test(i.corretor||'')},base));});
 return out;}
function gabPrazo(s,p){var m=s.marcos||{},ini=m.inicioPreparacao||'0000';
 if(p==='minutar')return m.entregaMinutas||gabAntes(s.date);
 var l=m.liberacao;return (l&&l<=s.date&&l>=ini)?l:gabAntes(s.date);}
/* resumo por sessão e papel: total, feitos, restam, prazo, meta de hoje */
function gabResumo(){var hj=hoje(),util=gabUtil(hj),R=[];
 GAB.ses.forEach(function(s){if(s.date<hj)return;['corrigir','minutar'].forEach(function(p){var L=s.itens.filter(function(i){return i.p===p;});if(!L.length)return;
  var ok=L.filter(function(i){return i.em;}).length,fh=L.filter(function(i){return i.em===hj;}).length,rest=L.length-ok,prazo=gabPrazo(s,p),venc=prazo<hj;
  var alvo=venc?(s.date>hj?gabAntes(s.date):hj):prazo;if(alvo<hj)alvo=hj;var dias=Math.max(1,gabDias(hj,alvo));
  var pr=p==='corrigir'?L.filter(function(i){return !i.em&&i.mi;}).length:rest;var meta=util&&(rest+fh)>0?Math.min(pr+fh,Math.ceil((rest+fh)/dias)):0;
  R.push({s:s,p:p,pr:pr,tot:L.length,ok:ok,fh:fh,rest:rest,prazo:prazo,venc:venc,dias:dias,meta:meta,pend:L.filter(function(i){return !i.em&&i.pend;}).length,abertos:L.filter(function(i){return !i.em;})});});});
 R.sort(function(a,b){return (b.venc&&b.rest?1:0)-(a.venc&&a.rest?1:0)||(a.rest?0:1)-(b.rest?0:1)||(a.prazo<b.prazo?-1:a.prazo>b.prazo?1:0);});
 return R;}
function satNivel(xp){var i=0;SAT_NV.forEach(function(n,k){if(xp>=n[0])i=k;});var prox=SAT_NV[i+1];
 return {n:i+1,nome:SAT_NV[i][1],de:SAT_NV[i][0],ate:prox?prox[0]:null,pct:prox?Math.round((xp-SAT_NV[i][0])/(prox[0]-SAT_NV[i][0])*100):100};}
function satToast(t){var d=document.createElement('div');d.className='sat-toast';d.innerHTML=satAvatar('festa')+'<span>'+esc(t)+'</span>';document.body.appendChild(d);
 setTimeout(function(){d.classList.add('on');},20);setTimeout(function(){d.classList.remove('on');setTimeout(function(){d.remove();},400);},5200);}
/* XP: cada entrega nova com o seu nome vale 10; bater a meta do dia vale 30. A primeira leitura só marca o que já estava feito. */
function satXP(){var c=satCfg(),hj=hoje(),antes=satNivel(c.xp).n,ganho=0,mud=false;
 GAB.ses.forEach(function(s){s.itens.forEach(function(i){if(!i.em)return;var k=s.date+'|'+i.cnj+'|'+i.p;if(c.feitos[k])return;c.feitos[k]=s.date;mud=true;if(c.semente)ganho+=10;});});
 if(!c.semente){c.semente=hj;mud=true;}
 var R=gabResumo(),meta=0,fh=0;R.forEach(function(r){meta+=r.meta;fh+=Math.min(r.fh,r.meta);});
 if(meta>0&&fh>=meta&&!c.metas[hj]){c.metas[hj]=1;ganho+=30;mud=true;}
 Object.keys(c.feitos).forEach(function(k){if(c.feitos[k]<gabMais(hj,-90))delete c.feitos[k];});
 Object.keys(c.metas).forEach(function(k){if(k<gabMais(hj,-60))delete c.metas[k];});
 if(ganho){c.xp+=ganho;mud=true;var nv=satNivel(c.xp);
  satToast(nv.n>antes?'Subi para o nível '+nv.n+' · '+nv.nome+'! +'+ganho+' XP':'+'+ganho+' XP · entrega farejada no gabinete');}
 if(mud)try{grava();}catch(e){}}
function gabBusca(forca){if(GAB.carregando)return;if(!forca&&GAB.em&&Date.now()-GAB.em<8*60000)return;GAB.carregando=true;satRepinta();
 var nc='?v='+Math.floor(Date.now()/60000),pega=function(f){return fetch(GAB_RAW+f+nc,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();});};
 pega('calendario.json').then(function(cal){var hj=hoje();GAB.exp=cal.expediente||null;
  var L=(cal.sessoes||[]).filter(function(s){return (s.publicada||s.marcosPublicados)&&s.date>=hj;}).sort(function(a,b){return a.date<b.date?-1:1;}).slice(0,4);
  return Promise.all([Promise.all(L.map(function(s){return s.publicada?pega(s.date+'.json').catch(function(){return null;}):Promise.resolve(null);})),pega('agenda.json').catch(function(){return null;})]).then(function(x){
   GAB.ses=L.map(function(s,k){return gabProcessa(s,x[0][k]);});
   GAB.agenda=((x[1]&&x[1].itens)||[]).filter(function(i){return i&&!i.privado&&i.data&&i.data>=gabMais(hj,-1);}).map(function(i){return {t:i.titulo||'',d:i.data,h:i.hora||'',tp:i.tipo||''};}).slice(0,30);
   GAB.em=Date.now();GAB.erro='';try{localStorage.setItem('astro_gab',JSON.stringify({em:GAB.em,exp:GAB.exp,ses:GAB.ses,agenda:GAB.agenda}));}catch(e){}});
 }).then(function(){GAB.carregando=false;satXP();satRepinta();},function(e){GAB.carregando=false;GAB.erro=e&&e.message||'sem rede';satRepinta();});}
/* ---------- a personagem ---------- */
function satAvatar(humor){humor=humor||'calmo';
 var boca={calmo:'<path d="M27 43c3 2.4 7 2.4 10 0"/>',alerta:'<path d="M28 44h8"/>',panico:'<ellipse cx="32" cy="44.5" rx="3.2" ry="2.6" fill="#3b2a1d"/>',festa:'<path d="M26 42c3 4.5 9 4.5 12 0z" fill="#fff"/>'}[humor]||'';
 var olho=humor==='panico'?'<circle cx="25.5" cy="34" r="2.6" fill="#fff"/><circle cx="25.5" cy="34" r="1.3" fill="#3b2a1d"/><circle cx="38.5" cy="34" r="2.6" fill="#fff"/><circle cx="38.5" cy="34" r="1.3" fill="#3b2a1d"/>':
  humor==='festa'?'<path d="M23 34.5c1.5-2 3.5-2 5 0M36 34.5c1.5-2 3.5-2 5 0"/>':'<circle cx="25.5" cy="34" r="1.6" fill="#3b2a1d"/><circle cx="38.5" cy="34" r="1.6" fill="#3b2a1d"/>';
 var sobr=humor==='panico'?'<path d="M22 29l6 1.5M42 29l-6 1.5"/>':humor==='alerta'?'<path d="M22.5 30h6M35.5 30h6"/>':'<path d="M22.5 30c2-1.2 4-1.2 6 0M35.5 30c2-1.2 4-1.2 6 0"/>';
 return '<svg class="sat-av sat-'+humor+'" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="#3b2a1d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+
  '<path d="M22 22C17 16 15 9 19 5c1 4 3 7 7 10" fill="#efe3c8"/><path d="M42 22c5-6 7-13 3-17-1 4-3 7-7 10" fill="#efe3c8"/>'+
  '<path d="M17 31c-5-1-8-4-8-7 3 0 6 1 9 3M47 31c5-1 8-4 8-7-3 0-6 1-9 3" fill="#e2b98c"/>'+
  '<path d="M18 33c0-10 6-15 14-15s14 5 14 15c0 9-5 17-14 17s-14-8-14-17z" fill="#ecc89c"/>'+
  '<path d="M18.5 27c-1-4 1-7 4-7-1-3 2-5 4.5-3.5 1-2.6 4-3 5.5-1 1.6-2 4.6-1.6 5.4 1 2.6-1.5 5.4.5 4.4 3.5 3 0 4.8 3 3.8 7-2-3-4-3-5.8-2-1.5-2.4-4-2.4-5.6-.6-1.6-1.8-4.4-1.8-5.6.2-1.8-1.4-4-1.2-5.2.8-1.6-1-3.6-.6-5.4 1.6z" fill="#7a5532"/>'+
  '<path d="M19.5 25c.6-7.5 5.6-11.5 12.5-11.5S43.9 17.5 44.5 25c-4-1.6-8.2-2.3-12.5-2.3S23.5 23.4 19.5 25z" fill="#5b8db8"/><path d="M43.5 23.6c4.4-.3 8.2.6 10.5 2.6-3.4 1.2-7.6 1.4-11.4.4" fill="#3f6f99"/><path d="M32 14v3" stroke="#f6ecd4"/><text x="28.6" y="22" font-size="5.5" font-family="Georgia,serif" fill="#f6ecd4" stroke="none">♒</text>'+
  sobr+olho+'<path d="M31 37.5c.6 1 1.4 1 2 0"/>'+boca+
  '<path d="M28 50c1 4 3 6 4 7 1-1 3-3 4-7" fill="#7a5532"/>'+
  '<g transform="translate(43 44) rotate(-18)"><rect x="0" y="0" width="16" height="9" rx="1.5" fill="#d9b46a"/><path d="M3 0v9M6 0v8M9 0v7M12 0v6" stroke="#8a6232" stroke-width="1"/></g></svg>';}
function satHumor(R){var v=R.filter(function(r){return r.venc&&r.rest;}),p=R.filter(function(r){return r.rest&&!r.venc&&r.dias<=2;});
 if(v.length)return 'panico';if(p.length)return 'alerta';if(!R.some(function(r){return r.rest;}))return 'festa';return 'calmo';}
function satFala(){var hj=hoje(),R=gabResumo(),f=[];
 if(!GAB.em)return {h:'alerta',t:GAB.carregando?'Farejando as pautas do gabinete…':'Ainda não consegui farejar o gabinete'+(GAB.erro?' ('+GAB.erro+')':'')+'. Tento de novo em alguns minutos.'};
 if(!gabUtil(hj)){var fn=gabFeriado(hj),pr=gabMais(hj,1),i=0;while(!gabUtil(pr)&&i<30){pr=gabMais(pr,1);i++;}
  f.push('Hoje não tem expediente'+(fn?' ('+fn+')':'')+'. Descanse, Hékatos; volto a farejar no dia '+gabDM(pr)+'.');}
 var v=R.filter(function(r){return r.venc&&r.rest;})[0],n=R.filter(function(r){return r.rest&&!r.venc;})[0];
 if(v)f.push('Cheiro de prazo vencido! '+v.rest+' '+SAT_PAPEL[v.p][0]+' da pauta de '+gabDM(v.s.date)+' ainda abert'+(v.p==='minutar'?'a':'a')+'s; o prazo era '+gabDM(v.prazo)+'.'+(v.meta?' Até a sessão: '+v.meta+' por dia.':''));
 if(n)f.push((v?'Depois: ':'')+n.rest+' '+SAT_PAPEL[n.p][0]+' da pauta de '+gabDM(n.s.date)+' até '+gabDM(n.prazo)+' ('+n.dias+' dia'+(n.dias===1?'':'s')+' út'+(n.dias===1?'il':'eis')+').'+(n.meta?' Hoje: '+n.meta+'.':''));
 if(!v&&!n)f.push('Nada com o seu nome em aberto nas pautas publicadas. Toco a siringe e você respira.');
 var meta=0,fh=0;R.forEach(function(r){meta+=r.meta;fh+=Math.min(r.fh,r.meta);});if(meta)f.push('Meta de hoje: '+fh+'/'+meta+(fh>=meta?' · cumprida!':'.'));
 var am=gabMais(hj,1);GAB.agenda.forEach(function(a){if(a.d===hj)f.push('Hoje: '+a.t+(a.h?' às '+a.h:'')+'.');else if(a.d===am)f.push('Amanhã: '+a.t+'.');});
 GAB.ses.forEach(function(s){if(s.date===hj)f.push('Hoje é dia de sessão ('+s.nome+').');});
 return {h:satHumor(R),t:f.join(' ')};}
function satFicha(){var c=satCfg(),nv=satNivel(c.xp);
 return '<div class="sat-ficha">'+satAvatar(satHumor(gabResumo()))+'<div class="sat-id"><span class="sat-k">sátiro protetor do Hékatos</span><b class="sat-nm">Kálamo</b>'+
  '<span class="sat-nv">nível '+nv.n+' · '+esc(nv.nome)+'</span><div class="sat-xp" title="'+c.xp+' XP"><i style="width:'+nv.pct+'%"></i></div><small>'+c.xp+' XP'+(nv.ate?' · faltam '+(nv.ate-c.xp)+' para '+esc(SAT_NV[nv.n][1]):' · nível máximo')+'</small></div></div>'+
  '<dl class="sat-tr"><dt>dom</dt><dd>faro de prazo: sente uma pauta vencendo como outros sátiros sentem monstros</dd><dt>instrumento</dt><dd>siringe de sete juncos, cortados no lago do acampamento</dd>'+
  '<dt>fraqueza</dt><dd>mastiga papel de rascunho quando a pauta passa de 150 processos</dd><dt>juramento</dt><dd>manter o Hékatos vivo, inteiro e dentro do prazo</dd>'+
  '<dt>como subo</dt><dd>+10 XP por minuta ou correção sua entregue · +30 XP quando a meta do dia fecha</dd></dl>';}
function satSessaoHTML(R){var hj=hoje(),G={};R.forEach(function(r){(G[r.s.date]=G[r.s.date]||{s:r.s,L:[]}).L.push(r);});
 return Object.keys(G).sort().map(function(k){var g=G[k],m=g.s.marcos||{};
  var linhas=g.L.map(function(r){var pct=r.tot?Math.round(r.ok/r.tot*100):0,cls=r.rest?(r.venc?'venc':(r.dias<=2?'perto':'')):'ok';
   return '<div class="sat-rl '+cls+'"><div class="sat-rh"><b>'+SAT_PAPEL[r.p][1]+'</b><span>'+r.ok+'/'+r.tot+' feitas'+(r.rest?' · <b>'+r.rest+'</b> restam':' · tudo entregue')+'</span></div>'+(r.p==='corrigir'&&r.rest?'<p class="sat-pr">'+r.pr+' pronta'+(r.pr===1?'':'s')+' para corrigir'+(r.rest-r.pr?' · '+(r.rest-r.pr)+' aguardando minuta':'')+'</p>':'')+
    '<div class="sat-bar"><i style="width:'+pct+'%"></i></div>'+
    (r.rest?'<p>prazo '+gabDM(r.prazo)+(r.venc?' · <em>venceu</em>':' · '+r.dias+' dia'+(r.dias===1?'':'s')+' út'+(r.dias===1?'il':'eis'))+(r.meta?' · hoje <b>'+Math.min(r.fh,r.meta)+'/'+r.meta+'</b>':'')+(r.pend?' · '+r.pend+' com pendência no cartão':'')+'</p>':'')+
    (r.abertos.length?'<details class="sat-ab"><summary>ver os '+r.abertos.length+' em aberto</summary><ul>'+r.abertos.map(function(i){
      return '<li><span class="sat-n">'+esc(i.n)+'</span><div><b>'+esc(i.cnj)+'</b><small>'+esc(i.cl.replace(/APELAÇÃO CÍVEL/,'ApCiv').replace(/AGRAVO DE INSTRUMENTO/,'AI').replace(/REMESSA NECESSÁRIA CÍVEL/,'RemNec'))+' · '+esc(i.as)+(i.jg?' · '+esc(i.jg):'')+(i.dupla?' · em dupla':'')+(i.pend?' · '+i.pend+' pendência'+(i.pend>1?'s':''):'')+'</small></div><button type="button" class="sat-cp" data-satcp="'+esc(i.cnj)+'" title="copiar o número">copiar</button></li>';}).join('')+'</ul></details>':'')+'</div>';}).join('');
  return '<section class="sat-ses"><header><b>Sessão '+esc(g.s.nome)+'</b><span>'+[m.entregaMinutas?'entrega '+gabDM(m.entregaMinutas):'',gabPrazo(g.s,'corrigir')?'liberação '+gabDM(gabPrazo(g.s,'corrigir')):''].filter(Boolean).join(' · ')+(g.s.date===hj?' · <em>hoje</em>':'')+'</span></header>'+linhas+'</section>';}).join('');}
function satPainelHTML(){var c=satCfg(),R=gabResumo(),F=satFala();
 var h=satFicha()+'<div class="sat-fala sat-'+F.h+'"><span class="sat-k">Sully diz</span><p>'+esc(F.t)+'</p></div>';
 h+='<div class="sat-gab"><header><div><span class="sat-k">conselho · fecham sozinhas</span><b>Designações nas pautas do Ex Officio</b></div><div class="sat-acoes"><button type="button" data-satatt>'+(GAB.carregando?'farejando…':'atualizar')+'</button><a href="https://gabinete-cmt.com/office" target="_blank" rel="noopener">abrir Ex Officio ↗</a></div></header>'+
  '<p class="sat-meta">'+(GAB.em?'lido às '+new Date(GAB.em).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'ainda não lido')+(GAB.erro?' · último faro falhou ('+esc(GAB.erro)+')':'')+' · farejando por <input data-satnome value="'+esc(c.nome)+'" size="9" aria-label="Seu nome na pauta"></p>'+
  (R.length?satSessaoHTML(R):'<p class="sat-vz">'+(GAB.em?'Nenhum processo com o seu nome nas pautas publicadas a partir de hoje.':'Sem leitura ainda.')+'</p>')+'</div>';
 return h;}
/* ---------- aba no painel direito ---------- */
PD_ICON.sat='<path d="M8.5 8C7 6.5 6.5 4.5 7.5 3c.4 1.4 1.2 2.4 2.6 3.2M15.5 8c1.5-1.5 2-3.5 1-5-.4 1.4-1.2 2.4-2.6 3.2"/><path d="M7 13c0-3.6 2.2-5.6 5-5.6s5 2 5 5.6c0 3.4-2 6.4-5 6.4s-5-3-5-6.4z"/><path d="M10 12.5h.01M14 12.5h.01M10.6 15.6c.9.6 1.9.6 2.8 0"/>';
if(!PD_ABAS.some(function(a){return a[0]==='sat';}))PD_ABAS.push(['sat','Sully · sátiro']);
function satAba(){var pd=document.getElementById('painel-dir');if(!pd||pd.querySelector('[data-pane="sat"]'))return;
 var ab=pd.querySelector('.pd-abas'),nv=pd.querySelector('.pd-nav'),cp=pd.querySelector('.pd-corpo');
 if(ab){var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.className='pd-ic';b.dataset.pd='sat';b.title='Sully · sátiro';b.setAttribute('aria-label',b.title);
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+PD_ICON.sat+'</svg>';ab.appendChild(b);}
 if(nv){var n=document.createElement('button');n.type='button';n.setAttribute('role','tab');n.className='pd-nb';n.dataset.pd='sat';n.textContent='Sully · sátiro';nv.appendChild(n);}
 if(cp){var p=document.createElement('div');p.className='pd-pane';p.dataset.pane='sat';p.hidden=true;cp.appendChild(p);}}
function satPinta(){var pd=document.getElementById('painel-dir'),p=pd&&pd.querySelector('[data-pane="sat"]');if(!p||p.hidden)return;var a=document.activeElement;if(a&&p.contains(a)&&a.tagName==='INPUT')return;
 var abertos=[].map.call(p.querySelectorAll('details[open]'),function(d,i){return i;}),h='<div id="sat-painel">'+satPainelHTML()+'</div>';
 if(p._h!==h||(h&&!p.firstChild)){p._h=h;var ds0=[].map.call(p.querySelectorAll('details'),function(d){return d.open;});p.innerHTML=h;[].forEach.call(p.querySelectorAll('details'),function(d,i){if(ds0[i])d.open=true;});}}
function satRepinta(){try{satPinta();}catch(e){}try{satIndice();}catch(e){}try{opPinta();}catch(e){}}
(function(){var m0=pdMonta;pdMonta=function(){var pd=m0.apply(this,arguments);try{satAba();}catch(e){}return pd;};
 var a0=pdAbre;pdAbre=function(k){var x=a0.apply(this,arguments);if(k==='sat'){try{satPinta();}catch(e){}gabBusca(false);}return x;};})();
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;
 var cp=t.closest('[data-satcp]');if(cp){var v=cp.getAttribute('data-satcp');try{navigator.clipboard.writeText(v);cp.textContent='copiado';setTimeout(function(){cp.textContent='copiar';},1400);}catch(z){}return;}
 if(t.closest('[data-satatt]')){gabBusca(true);return;}
 if(t.closest('[data-satir]')){e.preventDefault();try{if(document.body.classList.contains('op-on'))opModo(false);pdAbre('sat');}catch(z){}return;}});
document.addEventListener('change',function(e){var i=e.target;if(!i||i.dataset.satnome==null)return;var v=i.value.trim();if(!v)return;satCfg().nome=v;try{grava();}catch(z){}gabBusca(true);});
/* botão na pílula do índice */
function satIndice(){var n=document.getElementById('tt-indice'),p=document.querySelector('.pd-pilula');if(!p)return;var b=document.querySelector('.sat-ic[data-ic="sat"]');
 if(!b){b=document.createElement('button');b.type='button';b.className='tt-ic sat-ic';b.dataset.ic='sat';b.dataset.satir='1';b.title='Sully · sátiro, ritos e designações';b.setAttribute('aria-label',b.title);p.appendChild(b);}
 var R=gabResumo(),rest=0,venc=false;R.forEach(function(r){rest+=Math.max(0,r.meta-r.fh);if(r.venc&&r.rest)venc=true;});b.title='Sully · sátiro, ritos e designações'+(rest?' · faltam '+rest+' para a meta de hoje':'');
 var h='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+PD_ICON.sat+'</svg>'+(rest?'<em class="'+(venc?'venc':'')+'">'+rest+'</em>':'');
 if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}if(p.lastElementChild!==b)p.appendChild(b);}
(function(){var i0=ttIcones;ttIcones=function(){i0();try{satIndice();}catch(e){}};})();
/* ---------- no Posto de comando ---------- */
function satOpTop(){var F=satFala(),nv=satNivel(satCfg().xp);
 return '<button type="button" class="op-sat sat-'+F.h+'" data-satir="1" title="'+esc(F.t)+'">'+satAvatar(F.h)+'<span><small>Sully Brookhaven · nível '+nv.n+'</small><b>'+esc(F.t)+'</b></span></button>';}
function satQOk(R){return R.filter(function(r){return r.meta&&r.fh>=r.meta;}).length;}
function satOpGrupo(){var R=gabResumo().filter(function(r){return r.rest||r.fh;}).slice(0,3);if(!R.length&&!GAB.em)return '';
 return '<div class="op-grp op-gab"><span class="op-k">conselho · '+satQOk(R)+'/'+R.filter(function(r){return r.meta;}).length+'</span><ul>'+(R.map(function(r){var cls=r.venc&&r.rest?'venc':(r.rest&&r.dias<=2?'perto':'');
  var qok=r.meta&&r.fh>=r.meta;return '<li class="op-gl '+cls+(qok?' qok':'')+'" data-satir="1"><i class="op-gck">'+(qok?'✓':'')+'</i><b>'+SAT_PAPEL[r.p][1]+(r.meta?' '+r.meta:'')+' · '+gabDM(r.s.date)+'</b><span>'+(r.meta?Math.min(r.fh,r.meta)+'/'+r.meta+' · ':'')+(r.rest?r.rest+' restam · '+(r.venc?'venceu '+gabDM(r.prazo):'até '+gabDM(r.prazo)):'tudo entregue')+'</span></li>';}).join('')||'<li class="op-vz">nada com o seu nome em aberto</li>')+'</ul></div>';}
opFazerHTML=(function(f0){return function(){var g=satOpGrupo(),h=f0.apply(this,arguments);if(!g)return h;
 h=h.replace(/(chalé<\/span><ul>)([\s\S]*?)(<\/ul>)/,function(x,a,b,c){var lis=b.match(/<li[\s\S]*?<\/li>/g)||[];if(lis.length>4){var mais=lis.filter(function(l){return /op-mais/.test(l);});var nm=lis.filter(function(l){return !/op-mais/.test(l);});var extra=nm.length-4+(mais.length?+((mais[0].match(/\+(\d+)/)||[0,0])[1]):0);lis=nm.slice(0,4).concat(extra>0?['<li class="op-mais">+'+extra+' no mural</li>']:[]);}return a+lis.join('')+c;});
 return g+h;};})(opFazerHTML);
opLadoHTML=(function(f0){return function(){var h=f0.apply(this,arguments),hj=hoje(),add='';
 GAB.agenda.forEach(function(a){if(a.d===hj)add+='<li class="op-gab"><b>'+esc(a.h||'dia')+'</b><span>'+esc(a.t)+'</span></li>';});
 GAB.ses.forEach(function(s){var m=s.marcos||{};if(s.date===hj)add+='<li class="op-gab"><b>dia</b><span>sessão '+esc(s.nome)+'</span></li>';
  if(m.entregaMinutas===hj)add+='<li class="op-gab"><b>prazo</b><span>entrega das minutas · '+esc(s.nome)+'</span></li>';
  if(gabPrazo(s,'corrigir')===hj)add+='<li class="op-gab"><b>prazo</b><span>liberação · '+esc(s.nome)+'</span></li>';});
 if(!add)return h;return h.replace('<ul class="op-prox">','<ul class="op-prox">'+add).replace(/<ul class="op-prox">([\s\S]*?)<li class="op-vz">nada mais marcado hoje<\/li>/,'<ul class="op-prox">$1');};})(opLadoHTML);
(function(){var p0=opPinta;opPinta=function(){p0.apply(this,arguments);var o=document.getElementById('modo-op');if(!o||!document.body.classList.contains('op-on'))return;
 var t=o.querySelector('.op-top'),s=o.querySelector('.op-sat-slot');if(t&&!s){s=document.createElement('div');s.className='op-sat-slot';t.insertBefore(s,t.lastElementChild);}
 if(s){var h=satOpTop();if(s._h!==h||(h&&!s.firstChild)){s.innerHTML=h;s._h=h;}}};})();
setTimeout(function(){try{satAba();satIndice();}catch(e){}gabBusca(false);},1500);
setInterval(function(){gabBusca(false);},10*60000);
setInterval(function(){try{satPinta();satIndice();}catch(e){}},60000);
document.addEventListener('visibilitychange',function(){if(!document.hidden)gabBusca(false);});
window.KALAMO={GAB:GAB,fala:satFala,resumo:gabResumo,cfg:satCfg,busca:gabBusca};
/* linha do dia na vertical: coluna à esquerda do Posto de comando, das 06h às 24h, de cima para baixo */
opLinhaHTML=function(){var hj=hoje(),tb=S.tb||{},a=opMin(),ini=360,fim=1440,pct=function(m){return Math.max(0,Math.min(100,(m-ini)/(fim-ini)*100));};
 var seg=TD_H.map(function(H){var m0=+H*60,m1=m0+180,txt=(tb[hj+'|'+H]||'').trim(),c=OP_FX_COR[H]||['#eee','#333'],st=a>=m1?' op-passou':(a>=m0?' op-atual':'');
  return '<button type="button" class="op-vseg'+st+'" data-opfx="'+H+'" style="--b:'+c[0]+';--t:'+c[1]+'" title="'+esc(H+'–'+(+H+3)+'h · '+tdFaixaNome(H)+(txt?' · '+txt:''))+'"><b>'+esc(tdFaixaNome(H))+'</b><span>'+esc(txt||'livre')+'</span></button>';}).join('');
 var pts=[];try{rtD().toques.forEach(function(t){if(!t.on)return;var m=rtMin(t.h);if(m<ini)return;pts.push({m:m,c:'op-con',t:t.h+' · '+t.n});});}catch(e){}
 try{agDoDia(hj).forEach(function(x){if(x.dia)return;var m=x.ini.getHours()*60+x.ini.getMinutes();if(m<ini)return;pts.push({m:m,c:'op-ag',t:agHora(x)+' · '+x.t});});}catch(e){}
 var ph=pts.map(function(p){return '<i class="op-vpt '+p.c+(p.m<a?' op-ido':'')+'" style="top:'+pct(p.m)+'%" title="'+esc(p.t)+'"></i>';}).join('');
 var hs='';for(var h=6;h<=24;h+=3)hs+='<span style="top:'+pct(h*60)+'%">'+String(h).padStart(2,'0')+'</span>';
 return '<div class="op-vlinha"><div class="op-vhs">'+hs+'</div><div class="op-vsegs">'+seg+'</div><div class="op-vpts">'+ph+'</div>'+
  '<div class="op-vagora" style="top:'+pct(a)+'%"><em>'+String(Math.floor(a/60)).padStart(2,'0')+':'+String(a%60).padStart(2,'0')+'</em></div></div>';};
/* ======================= KÓRAX · o corvo falante de Apolo =======================
   Canal de alertas: nova pauta, novas designações, prazo hoje/amanhã, prazo vencido, meta do dia à tarde,
   convocações e dia de sessão. Junta o que dispara junto num recado só; avisa uma vez por motivo. */
function corvoCfg(){S.corvo=S.corvo||{};var c=S.corvo;c.vistos=c.vistos||{};c.pautas=c.pautas||{};c.cont=c.cont||{};c.log=c.log||[];return c;}
function corvoAve(){return '<svg class="cv-ave" viewBox="0 0 64 64" aria-hidden="true"><path d="M10 40c6-1 11-4 14-9 2-8 8-15 17-15 6 0 10 3 12 7l7 2-7 3c0 9-5 17-14 21l-3 9-3-8-4 8-1-9c-6 0-12-3-18-9z" fill="#2a2418"/>'+
 '<path d="M24 31c4 3 9 4 15 2-4 6-11 9-19 8" fill="#3f3527"/><circle cx="45" cy="22" r="2.4" fill="#e8a33c"/><circle cx="45.4" cy="21.6" r=".9" fill="#2a2418"/>'+
 '<path d="M53 23l7 2-7 3" fill="#c9a45a"/><path d="M14 50c4-2 8-2 12 0M30 52c3-2 6-2 9 0" stroke="#c9a45a" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>';}
function corvoPilha(){var p=document.getElementById('corvo-pilha');if(!p){p=document.createElement('div');p.id='corvo-pilha';p.setAttribute('aria-live','polite');document.body.appendChild(p);
 p.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var c=b.closest('.cv-card');if(b.dataset.cvok!=null&&c){c.classList.add('sai');setTimeout(function(){c.remove();},300);}});}return p;}
function corvoDiz(linhas,gab){if(!linhas.length)return;var c=corvoCfg(),hm=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
 c.log.unshift({d:hoje(),h:hm,t:linhas});if(c.log.length>25)c.log.length=25;try{grava();}catch(e){}
 var p=corvoPilha(),d=document.createElement('section');d.className='cv-card';
 d.innerHTML=corvoAve()+'<div class="cv-tx"><span class="cv-k">Polly McCaw · corvo de Apolo · '+hm+'</span><b>Crá!</b><ul>'+linhas.map(function(l){return '<li>'+esc(l)+'</li>';}).join('')+'</ul>'+
  '<div class="cv-bt"><button type="button" data-cvok>ok, ouvi</button>'+(gab?'<button type="button" data-satir="1" data-cvok>ver quests</button>':'')+'</div></div>';
 p.appendChild(d);while(p.children.length>3)p.firstChild.remove();
 try{if(window.Notification&&Notification.permission==='granted'&&document.hidden)new Notification('Polly McCaw · corvo de Apolo',{body:linhas.join('\n'),tag:'korax-'+Date.now()});}catch(e){}
 try{satPinta();}catch(e){}}
function corvoChecar(){if(!GAB.em)return;var c=corvoCfg(),hj=hoje(),am=gabMais(hj,1),i=0,a=opMin(),L=[],gab=false,util=gabUtil(hj);
 while(!gabUtil(am)&&i<15){am=gabMais(am,1);i++;}
 var uma=function(k,t,g){if(c.vistos[k])return;c.vistos[k]=hj;L.push(t);if(g)gab=true;};
 var R=gabResumo(),semente=!c.seed;
 /* pautas e designações novas */
 GAB.ses.forEach(function(s){var mi=s.itens.filter(function(x){return x.p==='minutar';}).length,co=s.itens.filter(function(x){return x.p==='corrigir';}).length;
  if(!c.pautas[s.date]){c.pautas[s.date]=hj;if(!semente&&(mi||co))L.push('Nova pauta publicada: sessão '+s.nome+'. Com o seu nome: '+[mi?mi+' para minutar':'',co?co+' para corrigir':''].filter(Boolean).join(' e ')+'.'),gab=true;}
  ['minutar','corrigir'].forEach(function(p){var k=s.date+'|'+p,n=p==='minutar'?mi:co,ant=c.cont[k];if(ant!=null&&n>ant&&!semente){L.push('+'+(n-ant)+' designaç'+(n-ant===1?'ão':'ões')+' nova'+(n-ant===1?'':'s')+' para '+p+' na pauta de '+gabDM(s.date)+'.');gab=true;}c.cont[k]=n;});
  if(s.date===hj)uma('ses|'+s.date,'Hoje é dia de sessão ('+s.nome+').',false);});
 c.seed=1;
 /* prazos */
 R.forEach(function(r){if(!r.rest)return;var nm=SAT_PAPEL[r.p][0]+' da pauta de '+gabDM(r.s.date);
  if(r.prazo===hj)uma('ph|'+r.s.date+'|'+r.p,'Vence hoje: '+r.rest+' '+nm+'.',true);
  else if(r.prazo===am&&(a>=13*60||!util))uma('pa|'+r.s.date+'|'+r.p,'Vence no próximo dia útil ('+gabDM(am)+'): '+r.rest+' '+nm+'.',true);
  else if(r.venc)uma('pv|'+r.s.date+'|'+r.p+'|'+hj,'Prazo vencido em '+gabDM(r.prazo)+': ainda faltam '+r.rest+' '+nm+'.',true);});
 /* meta do dia à tarde */
 var meta=0,fh=0;R.forEach(function(r){meta+=r.meta;fh+=Math.min(r.fh,r.meta);});
 if(util&&meta&&fh<meta&&a>=16*60)uma('m16|'+hj,'São 16h e a meta de hoje está em '+fh+'/'+meta+'. Faltam '+(meta-fh)+'.',true);
 if(util&&meta&&fh>=meta)uma('mok|'+hj,'Meta de hoje cumprida ('+meta+'). Sully já está tocando a flauta.',false);
 /* agenda do gabinete */
 GAB.agenda.forEach(function(g){var hm=g.h?rtMin(g.h):null;
  if(g.d===hj){if(hm!=null&&hm-a<=30&&hm-a>=0)uma('agh|'+g.t+'|'+g.d,'Em '+(hm-a)+' min: '+g.t+'.',false);else uma('ag|'+g.t+'|'+g.d,'Hoje: '+g.t+(g.h?' às '+g.h:'')+'.',false);}
  else if(g.d===am&&a>=12*60)uma('ag1|'+g.t+'|'+g.d,'No próximo dia útil ('+gabDM(am)+'): '+g.t+'.',false);});
 Object.keys(c.vistos).forEach(function(k){if(c.vistos[k]<gabMais(hj,-30))delete c.vistos[k];});
 Object.keys(c.pautas).forEach(function(k){if(k<gabMais(hj,-60))delete c.pautas[k];});
 if(L.length)corvoDiz(L,gab);else try{grava();}catch(e){}}
satXP=(function(f0){return function(){var r=f0.apply(this,arguments);try{corvoChecar();}catch(e){console.error(e);}return r;};})(satXP);
setInterval(function(){try{corvoChecar();}catch(e){}},60000);
/* recados do corvo no painel do sátiro */
satPainelHTML=(function(f0){return function(){var h=f0.apply(this,arguments),c=corvoCfg(),perm=window.Notification?Notification.permission:'indisp';
 var rc='<div class="cv-rec"><header>'+corvoAve()+'<div><span class="sat-k">recados do corvo</span><b>Polly McCaw, corvo de Apolo</b></div>'+
  (perm==='default'?'<button type="button" data-cvperm>avisar também fora da aba</button>':perm==='granted'?'<small>avisa também fora da aba</small>':'')+'</header><ul>'+
  (c.log.slice(0,8).map(function(x){return '<li><span>'+esc(gabDM(x.d)+' · '+x.h)+'</span><div>'+x.t.map(esc).join('<br>')+'</div></li>';}).join('')||'<li class="cv-vz">nenhum recado ainda</li>')+'</ul></div>';
 return h.replace('<div class="sat-gab">',rc+'<div class="sat-gab">');};})(satPainelHTML);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-cvperm]');if(!b)return;try{Notification.requestPermission().then(function(){satPinta();});}catch(z){}});
window.KALAMO.corvo=corvoChecar;window.KALAMO.corvoCfg=corvoCfg;

/* ======================= Valhala: portal de entrelaçado =======================
   Colunas cobertas de entrelaçado (no lugar dos postes lisos) com capitel de volutas e base canelada, nos templos e no Posto;
   o banner vira o portão do salão: pilastras de entrelaçado dos dois lados, verga de nós no alto e moldura de couro com filete de ouro. */



/* ======================= Valhala com tons por templo (como o Acampamento tinha um tom por templo) =======================
   Ferro (Programação, Hélio no Posto, Meta do dia), sangue de escudo (Rastreados, Moiras, Saga do dia), madeira de salão
   (frontão, banner, faixas do painel esquerdo, Foco do dia, Hermes) e verde-couro só no templo das Tarefas e no Posto de Apolo. */



/* ======================= Valhala "carvalho e metal" =======================
   Um tom só, como o portão da referência: fundo cinza-pedra, entrelaçado e figuras em grafite, ouro só em detalhes
   (beiral, chifres, anel do medalhão). Reescreve as folhas do tema para as versões -tinta dos desenhos e para a paleta pedra. */



/* ======================= Valhala carvalho e metal: sem verde e sem dourado restantes; textura de veio de madeira =======================
   Grade semanal, faixa do dia e ícones do rodapé passam para uma família de linho, mel, carvalho, aço e ardósia
   (continuam distinguindo os horários); textos dourados viram carvalho; telhas maiores. */



/* ======================= Valhala: entalhe em relevo (referências do calendário e dos ornamentos) =======================
   Entrelaçado de verdade, com cordões que passam por cima e por baixo, contorno escuro e luz no relevo;
   pedra-ardósia nas colunas, frisos e faixas; osso nos cordões; um acento vermelho (runa do medalhão, olho do capitel).
   O carvalho fica no telhado e nos cartões. */



/* ======================= Valhala: o verde do hotel só na bandeira e no brasão =======================
   Verde-couro do hotel nas insígnias: medalhão, placas de título, plaquinhas do frontão, placa de ícones,
   botão do tema e o estandarte da Captura da bandeira (agora estandarte verde do hotel). Pedra e carvalho continuam na arquitetura. */



/* ======================= Hotel Valhala · kit de identidade do usuário (img/acampamento/kit) =======================
   Paleta do kit: verde pinho #203936, latão antigo #A88750, marfim #F5EBD6, azul fiorde #526D78, borgonha #713E48.
   Frontão art déco escalonado com o brasão, placa de título, friso entrelaçado, pilastra de latão e ícones do hotel
   (um por cartão). Substitui as camadas anteriores do tema. */



/* ======================= Hotel Valhala · fotos estéticas nos cartões (uma por lugar) =======================
   Diárias = espada rúnica · Nornas = runas no musgo · Saga = proas de drakkar · Meta do dia = mão com o martelo
   Foco do dia = o combate com a espada · Atividades = dragão na árvore. Os demais cartões seguem com os ícones do kit. */



/* ======================= Painéis abertos: ocupam todo o centro, do painel esquerdo ao direito, do topo ao rodapé;
   a pílula de ícones sobe para o cabeçalho do painel (volta ao frontão ao fechar) ======================= */
(function(){var liga=function(){var pd=document.getElementById('painel-dir');if(!pd)return false;
  new MutationObserver(function(){try{pilulaNoFrontao();}catch(e){}}).observe(pd,{attributes:true,attributeFilter:['class']});return true;};
 var n=0,t=setInterval(function(){if(liga()||++n>20)clearInterval(t);},800);})();
(function(){var st=document.createElement('style');st.id='pd-cheio-css';st.textContent=[
 '@media(min-width:1380px){',
 ' #painel-dir.pd.on .pd-corpo{top:0!important;bottom:71px!important;border-radius:0!important;padding-top:58px!important}',
 ' #painel-dir.pd.on .pd-top{position:absolute!important;top:0!important;left:0!important;right:0!important;height:52px!important;display:flex!important;align-items:center;justify-content:center;gap:10px;padding:0 14px!important;',
 '  background:var(--neo-papel,none),#f4ead2!important;border-bottom:1.5px solid #5a3f2c!important;box-shadow:0 4px 10px -6px rgba(40,25,10,.35)!important;z-index:8}',
 ' #painel-dir.pd.on .pd-top>.pd-pilula{position:static!important;transform:none!important;margin:0!important}',
 ' #painel-dir.pd.on .pd-top>.pd-pilula>button{position:relative;display:flex!important;justify-content:center;align-items:center;width:46px!important;height:34px!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid #d9c08a!important;background:transparent!important;border-radius:0!important}',
 ' #painel-dir.pd.on .pd-top>.pd-pilula>button:first-child{border-left:0!important}',
 ' #painel-dir.pd.on .pd-top>.pd-pilula>button svg{width:18px!important;height:18px!important;fill:none!important;stroke:currentColor!important}',
 ' #painel-dir.pd.on .pd-top>.pd-pilula{display:flex!important;height:34px;border:1.5px solid #8a6420!important;border-radius:999px!important;overflow:hidden;background:#fbf5e6!important;color:#7a5616}',
 ' #painel-dir.pd.on .pd-top .pd-x{position:absolute!important;right:14px;top:50%;transform:translateY(-50%)}',
 ' #painel-dir.pd.on .pd-top>.pd-pilula>button.pil-at,#painel-dir.pd.on .pd-top>.pd-pilula>button[aria-pressed="true"]{background:#5a3f2c!important;color:#fbf5e6!important}',
 '}',
 'body.tv #painel-dir.pd.on .pd-top{background:url("img/acampamento/vh-papel.svg") 0 0/120px 120px,#F5EBD6!important;border-bottom-color:#A88750!important}',
 'body.tv #painel-dir.pd.on .pd-top>.pd-pilula{background:#203936!important;border-color:#A88750!important;color:#F5EBD6!important}',
 'body.tv #painel-dir.pd.on .pd-top>.pd-pilula>button{border-left-color:#3a5552!important;color:#F5EBD6!important}'
].join('\n');document.head.appendChild(st);})();
/* marca o botão do painel aberto na pílula */
setInterval(function(){var pd=document.querySelector('#painel-dir.pd.on'),pl=document.querySelector('.pd-pilula');if(!pl)return;var k=pd&&(pd.querySelector('[data-pd][aria-selected="true"]')||{}).getAttribute;var sel=pd?(pd.querySelector('[data-pd][aria-selected="true"]')||{dataset:{}}).dataset.pd:null;
 Array.prototype.forEach.call(pl.querySelectorAll('button'),function(b){var m=b.dataset.tt==='fin'?'fin':b.dataset.ic==='laptop'?'lap':b.dataset.ic==='enf'?'enf':/bunker|b9/i.test(b.title||'')?'b9':null;b.classList.toggle('pil-at',!!sel&&m===sel);});},700);
/* ======================= Valhala · primeira parte do edifício: portão, soleira, cores e textura vetorial ======================= */



/* ======================= Valhala · 2º templo (Programação): ônix, prata e bronze =======================
   Variação do primeiro: colunas entalhadas em prata sobre ônix com olho de bronze, friso de runas (desenho próprio)
   no entablamento, placa em ônix com filete de prata e letras de bronze, cantoneiras de prata na moldura. */



/* ======================= Valhala · 3º templo (Rastreados): osso, sépia, azul-ísatis e ocre =======================
   Inspirado nas colunas de animais entrelaçados e no estilo Mammen: colunas de osso com cadeia de anéis em preto e
   vermelho e rosetas em espiral, capitel de volutas com olho vermelho, friso de cadeia e placa de osso com ocre. */



/* ======================= Valhala · 4º templo (Arsenal, marcos e prêmios): pedra rúnica =======================
   Granito cinza com entalhes pintados de vermelho, como as pedras rúnicas escandinavas: colunas com faixa de runas,
   capitel com cabeça de serpente em traço, friso-serpente com runas entre linhas, placa de granito com filete vermelho. */


























/* campos do registro acrescentados depois do carregamento inicial não podem sumir na recarga */
(function(){try{var raw=JSON.parse(KEY_RAW0||'null');if(!raw||typeof raw!=='object')return;var n=0;Object.keys(raw).forEach(function(k){if(!(k in S)){S[k]=raw[k];n++;}});if(n)grava();}catch(e){}})();

window.OP_TEMPLO=OP_TEMPLO;
try{window.ASTRO_IC={CR_IC:CR_IC,LAT_IC:LAT_IC,ARS_IC:ARS_IC,RT_IC:RT_IC,QA_IC:QA_IC,OP_IC:OP_IC,PD_ICON:PD_ICON,TEMA_IC:TEMA_IC,ICO_P:ICO_P};}catch(e){}
/* Tema Casa do Brooklyn: cada página em arquivo próprio (temas/egito/) */
if(EG_ON){['comum','saguao','operacional'].forEach(function(n){var sc=document.createElement('script');sc.src='temas/egito/'+n+'.js?v=6';sc.async=false;document.body.appendChild(sc);});}
/* Tema Hotel Valhala: cada página em arquivo próprio (temas/valhala/) */
if(TV_ON){['comum','saguao','operacional'].forEach(function(n){var sc=document.createElement('script');sc.src='temas/valhala/'+n+'.js?v=4';sc.async=false;document.body.appendChild(sc);});}

/* Argo: a moldura do kit acompanha a largura de cada cartão (cabeçalho 280×88 e rodapé 280×44, sem deformar) */
function argoMede(){var o=document.getElementById('modo-op');if(!o||!window.ResizeObserver)return;
 Array.prototype.forEach.call(o.querySelectorAll('.op-templo'),function(n){if(n._argoRO)return;
  n._argoRO=new ResizeObserver(function(){var w=n.getBoundingClientRect().width;if(!w)return;try{argoMastros();}catch(e){}n.style.setProperty('--ah',Math.min(w*88/280,82).toFixed(1)+'px');n.style.setProperty('--af',Math.min(w*44/280,42).toFixed(1)+'px');n.style.setProperty('--vt',(w*92/320).toFixed(1)+'px');n.style.setProperty('--vb',(w*72/320).toFixed(1)+'px');});
  n._argoRO.observe(n);});}
(function(){var m0=opMonta;opMonta=function(){var r=m0.apply(this,arguments);try{argoMede();}catch(e){}return r;};try{argoMede();}catch(e){}})();
function argoRod(){var r=document.getElementById('rod-apps');if(!r||!window.ResizeObserver||r._argoRO)return;r._argoRO=new ResizeObserver(function(){var h=Math.round(r.getBoundingClientRect().height);if(h)document.body.style.setProperty('--a-rodh',h+'px');});r._argoRO.observe(r);}
(function(){var m0=opMonta;opMonta=function(){var x=m0.apply(this,arguments);try{argoRod();}catch(e){}return x;};try{argoRod();}catch(e){}setTimeout(argoRod,1500);})();

/* Argo · nível do mar = Clepsidra; Fogueira não toma mais o cartão da Arena (desviei fica no topo, em opTopR) */
function argoMar(){var a=opMin(),r=Math.max(0,Math.min(1,1-(a-360)/1080));document.body.style.setProperty('--a-mar',r.toFixed(3));var rd=document.getElementById('rod-apps');if(rd){var hm=String(Math.floor(a/60)%24).padStart(2,'0')+':'+String(a%60).padStart(2,'0'),t=a<360?'clepsidra · '+hm+' · o dia ainda não começou':(r>0?'clepsidra · '+hm+' · resta '+Math.round(r*100)+'% do dia':'clepsidra · '+hm+' · o dia escoou');if(rd.dataset.mar!==t)rd.dataset.mar=t;}}
(function(){var f0=op2FogModo;op2FogModo=function(){if(!document.body.classList.contains('tv'))return false;return f0.apply(this,arguments);};
 var p0=opPinta;opPinta=function(){var r=p0.apply(this,arguments);try{argoMar();}catch(e){}return r;};try{argoMar();}catch(e){}})();

/* Clepsidra em ondas no pé do casco: uma onda por fase do dia */
var AM_COR={'06':['#cfe8f3','#183a52'],'09':['#a9d4ea','#183a52'],'12':['#7fbcde','#123047'],'15':['#5d9fcb','#fbf5e6'],'18':['#4680b2','#fbf5e6'],'21':['#2f5f8f','#fbf5e6']};
function argoMarHTML(){var hj=hoje(),tb=S.tb||{},a=opMin(),ini=360,fim=1440,p=Math.max(0,Math.min(100,(a-ini)/(fim-ini)*100)),r=Math.round(100-p);
 var f=TD_H.map(function(H,i){var m0=+H*60,m1=m0+180,st=a>=m1?' passou':(a>=m0?' agora':''),c=AM_COR[H]||['#7fbcde','#183a52'],txt=(tb[hj+'|'+H]||'').trim()||'livre',fl='';
  if(st===' agora'){var q=m1-a;fl=' <em>faltam '+(q>=60?Math.floor(q/60)+'h'+String(q%60).padStart(2,'0'):q+' min')+'</em>';}
  return '<div class="am-f'+st+'" style="--c:'+c[0]+';--tx:'+c[1]+';--d:-'+(i*.9).toFixed(1)+'s" title="'+esc(H+'–'+(+H+3)+'h · '+tdFaixaNome(H)+' · '+txt)+'"><i></i><div class="am-t"><b>'+H+' · '+esc(tdFaixaNome(H))+fl+'</b><span>'+esc(txt)+'</span></div></div>';}).join('');
 var hm=String(Math.floor(a/60)%24).padStart(2,'0')+':'+String(a%60).padStart(2,'0');
 var ag=(a>=ini&&a<fim)?'<div class="am-ag'+(p>80?' dir':'')+'" style="left:'+p.toFixed(2)+'%"><span>'+hm+' · resta '+r+'% do dia</span></div>':'';
 return '<div class="am-fs">'+f+ag+'</div>';}
function argoMarPinta(){var rd=document.getElementById('rod-apps');if(!rd)return;var m=document.getElementById('argo-mar');
 if(!m){m=document.createElement('div');m.id='argo-mar';m.setAttribute('role','img');rd.appendChild(m);}
 var h=argoMarGR();if(m._h!==h){m.innerHTML=h;m._h=h;}
 var a=opMin(),p=Math.max(0,Math.min(100,(a-360)/1080*100));m.setAttribute('aria-label','Clepsidra do dia em ondas: '+Math.round(100-p)+'% do dia ainda resta');}
(function(){var p0=opPinta;opPinta=function(){var r=p0.apply(this,arguments);try{argoMarPinta();}catch(e){}return r;};})();

/* Clepsidra · Mar do tempo (tema Valhala): 00h–24h, oito turnos, barco no agora */
function argoMarTV(){var hj=hoje(),tb=S.tb||{},a=opMin(),pos=Math.max(0,Math.min(100,a/1440*100)),I=function(n){return 'img/acampamento/dk-'+n+'.svg?v=1';};
 var hm=String(Math.floor(a/60)%24).padStart(2,'0')+':'+String(a%60).padStart(2,'0');
 var px=null;try{px=clepProx();}catch(e){}var prox=px?(px.h+' · '+px.t):'madrugada · 00:00';
 var T=['00','03'].concat(TD_H),at=null;
 var rt=T.map(function(H){var m0=+H*60,m1=m0+180,nm=(+H<6)?'Madrugada':tdFaixaNome(H),tx=(tb[hj+'|'+H]||'').trim(),st=a>=m1?' passou':(a>=m0?' agora':(tx?'':' vazio'));
  if(st===' agora')at={nm:nm,tx:tx};
  return '<div class="vm-s'+st+'" title="'+esc(H+'–'+(+H+3)+'h · '+nm+' · '+(tx||'sem bloco'))+'"><small>'+H+'–'+String(+H+3).padStart(2,'0')+'h '+esc(nm)+'</small><span>'+esc(tx||'sem bloco')+'</span></div>';}).join('');
 var sc='';for(var h=0;h<=24;h+=3)sc+='<span style="left:'+(h/24*100)+'%">'+String(h).padStart(2,'0')+'h<img src="'+I('boia-horario')+'" alt=""></span>';
 return '<div class="vm"><div class="vm-h"><img src="'+I('icone-mares')+'" alt=""><div><h2>Clepsidra · <em>Mar do tempo</em></h2><small>cartografia do dia · 00–24h</small></div>'+
  '<div class="vm-r"><span><img src="'+I('icone-porto')+'" alt=""><span><small>próximo porto</small><b>'+esc(prox)+'</b></span></span>'+
  '<span><img src="'+I('icone-mares')+'" alt=""><span><small>maré percorrida</small><b>'+Math.round(pos)+'% do dia</b></span></span>'+
  '<span><img src="'+I('icone-bussola')+'" alt=""><span><small>posição atual</small><strong>'+hm+'</strong></span></span></div></div>'+
  '<div class="vm-t" style="--pos:'+pos.toFixed(2)+'%"><div class="vm-sc">'+sc+'</div><i class="vm-cor"></i><i class="vm-per"></i><div class="vm-bo"><span>agora</span></div><div class="vm-rt">'+rt+'</div></div>'+
  '<div class="vm-f"><img src="'+I('icone-ancora')+'" alt="">'+(at?'Em navegação · <b>'+esc(at.nm)+'</b> · '+esc(at.tx||'sem bloco'):'Ancorado')+'</div></div>';}

function argoMastros(){var g=document.querySelector('#modo-op .op-g');if(!g)return;var R=g.getBoundingClientRect();if(!R.width)return;
 Array.prototype.forEach.call(g.querySelectorAll(':scope > .op-templo'),function(n,i){if(i>3)return;var r=n.getBoundingClientRect();g.style.setProperty('--m'+(i+1),(r.left-R.left+r.width/2-12).toFixed(1)+'px');});}

/* Rota da travessia no mar (tema grego): Clepsidra à esquerda, seis turnos em ondas, Vigia de Linceu à direita */
function argoMarGR(){var hj=hoje(),tb=S.tb||{},a=opMin(),ini=360,fim=1440,p=Math.max(0,Math.min(100,(a-ini)/(fim-ini)*100));
 var hm=String(Math.floor(a/60)%24).padStart(2,'0')+':'+String(a%60).padStart(2,'0');
 var li=TD_H.map(function(H){var m0=+H*60,m1=m0+180,st=a>=m1?' passou':(a>=m0?' agora':''),tx=(tb[hj+'|'+H]||'').trim()||'livre';
  return '<div class="rg-li'+st+'" title="'+esc(H+'–'+(+H+3)+'h · '+tdFaixaNome(H)+' · '+tx)+'"><small>'+H+'h · '+esc(tdFaixaNome(H))+(st===' agora'?' · agora':'')+'</small><span>'+esc(tx)+'</span>'+(st===' agora'?'<i>'+(document.body.classList.contains('eg')?'a barca está aqui':document.body.classList.contains('tv')?'o drakkar está aqui':'a Argo está aqui')+' · '+hm+'</i>':'')+'</div>';}).join('');
 var px=null;try{px=clepProx();}catch(e){}
 var q=px?Math.max(0,px.m-a):0,em=px?(q>=60?Math.floor(q/60)+'h'+String(q%60).padStart(2,'0'):q+' min'):'';
 return '<div class="rg-box"><span class="rg-med"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 19c3-1 4-4 6-7s4-5 8-6"/><circle cx="5" cy="19" r="1.6"/><circle cx="19" cy="6" r="1.6"/></svg></span><span><b>Rota da travessia</b><small>'+Math.round(p)+'% do dia · resta '+Math.round(100-p)+'%</small></span></div>'+
  '<div class="rg-ol">'+li+'</div>'+
  '<div class="rg-box"><span><small>vigia de Linceu · próximo</small>'+(px?'<span class="rg-hora">'+esc(px.h)+'</span><b style="display:inline;font-variant:normal;font-size:13px">'+esc(px.t)+'</b> <em>em '+em+'</em>':'<b style="font-size:13px">nada mais hoje</b>')+'</span></div>';}
/* ======================= Tablet e celular (abaixo de 1380px) =======================
   Tarefas e Missões entram logo abaixo do banner (e aparecem também no celular, onde ficavam ocultas);
   cartões em duas colunas no tablet, fotos com altura de verdade, banner e rodapé ajustados à tela. */
(function(){var mq=window.matchMedia('(max-width:1379px)'),marca=null;
 function arruma(){var r=document.getElementById('rail'),w=document.querySelector('.wrap'),h=document.getElementById('hero-box');if(!r||!w)return;
  if(mq.matches){document.body.classList.add('estreito');if(!marca&&r.parentNode!==w){marca=document.createComment('rail');r.parentNode.insertBefore(marca,r);}
   if(h&&h.parentNode===w){if(h.nextElementSibling!==r)h.insertAdjacentElement('afterend',r);}else if(w.firstElementChild!==r)w.insertBefore(r,w.firstChild);}
  else{document.body.classList.remove('estreito');if(marca&&marca.parentNode&&r.parentNode===w){marca.parentNode.insertBefore(r,marca);}}}
 if(mq.addEventListener)mq.addEventListener('change',arruma);else if(mq.addListener)mq.addListener(arruma);
 setTimeout(arruma,300);setTimeout(arruma,1500);setInterval(arruma,3000);
 var st=document.createElement('style');st.id='estreito-css';st.textContent=[
  'body.estreito .wrap>#rail{display:block!important;position:relative!important;inset:auto!important;width:auto!important;max-width:none!important;height:auto!important;max-height:none!important;overflow:visible!important;transform:none!important;grid-column:1/-1;margin:6px 0 18px!important;z-index:1!important}',
  'body.estreito .wrap>#rail #tp-real{position:static!important;width:auto!important}',
  '@media(min-width:700px){',
  ' body.estreito #tp-real #mm-box{flex-direction:row!important;flex-wrap:wrap!important;align-items:flex-start!important;gap:14px!important}',
  ' body.estreito #tp-real #mm-box>*,body.estreito #tp-real #mm-box .mm-grp,body.estreito #tp-real #mm-box .mm-g>:not(.mm-col){flex:1 1 100%!important;max-width:none!important}',
  ' body.estreito #tp-real #mm-box .mm-col,body.estreito #tp-real #mm-box>.mm-gab{flex:1 1 calc(50% - 7px)!important;min-width:300px;margin:0!important}',
  '}',
  'body.estreito #mm-box :is(.mm-col,.mm-gab)::before{height:140px!important;background-size:cover!important;background-position:center!important}',
  'body.estreito #lat-e>:is(#lat-db,#lat-gm>.gm)::before,body.estreito #lat-arena::before{height:120px!important;background-size:cover!important}',
  /* celular */
  '@media(max-width:699px){',
  ' body.estreito #hero-box .vx-hero.bn2 .bn-tit{max-width:none!important;width:auto!important;padding-right:0!important}',
  ' body.estreito #hero-box .vx-hero.bn2 h2{font-size:30px!important;line-height:1.1!important}',
  ' body.estreito #hero-box .vx-hero.bn2>.cp-postal{position:relative!important;inset:auto!important;top:auto!important;right:auto!important;width:auto!important;max-width:260px;margin:12px auto 4px!important;transform:rotate(-2deg)!important}',
  ' body.estreito #hero-box .vx-hero.bn2 .vx-k{white-space:normal!important}',
  ' body.estreito #hero-box .vx-hero.bn2{padding:26px 18px 22px!important}',
  ' body.estreito #hero-box .bn-slot{padding-left:0!important;padding-right:0!important;background-image:none!important}',
  ' body.estreito #hero-box .nf2 .nf-txt{display:none!important}',
  ' body.estreito #hero-box .bv-fotos{justify-content:center}',
  ' body.estreito #hero-box .bv-fotos .bv-foto{width:96px}',
  ' body.estreito #rod-apps .cr-bar{overflow-x:auto!important;scrollbar-width:none;-webkit-overflow-scrolling:touch;justify-content:flex-start!important}',
  ' body.estreito #rod-apps .cr-bar::-webkit-scrollbar{display:none}',
  ' body.estreito #rod-apps .cr-p{flex:0 0 96px!important;min-width:96px!important}',
  ' body.estreito #tp-real>:is(#tm-painel,#recreio){padding-left:14px!important;padding-right:14px!important;background-image:none!important}',
  ' body.estreito #tp-real .col-orn{display:none!important}',
  '}'
 ].join('\n');document.head.appendChild(st);})();

/* ======================= Companheiros por tema =======================
   Grego: Sully Brookhaven (sátiro) e os corvos McCaw. Valhala: Leif Larsen (einherji) e os corvos Ravn.
   Casa do Brooklyn: Toby Nefer (babuíno) e os íbis Bennu. Os nomes nos textos trocam pelos termos de cada tema;
   aqui mudam o retrato, a ficha, os níveis e a ave mensageira. */
var COMP_T=TV_ON?{
 k:'valquíria recrutadora do filho de Odin · Oak House, Boston',nm:'Brynn "Hawk" Halvorsen',
 nv:[[0,'Valquíria aprendiz'],[100,'Recolhedora de almas'],[300,'Valquíria credenciada'],[600,'Caçadora de prazos'],[1000,'Capitã da Oak House'],[1600,'Voz do Conselho dos Thanes']],
 falas:['Brynn está na arquibancada, anotando o placar.','Um bloco é um ponto. Ela quer a virada.','Se a cabeça fugir, aperte / e despeje. Ela guarda.','Respira. Só o primeiro lance.','Brynn não fala durante o jogo. Você joga.'],
 ficha:[['céu','Sol em Sagitário, Lua em Áries. Fogo puro: ela não consola, convoca. Sagitário é o arqueiro, o mesmo signo do caçador que ela escolheu'],
  ['origem','nasceu em Duluth, Minnesota, e ainda vive no mundo mortal. Mora na Oak House, em Boston, com as irmãs valquírias; de dia cursa meteorologia, à noite faz a ronda pelos campos de batalha. Escolheu você no meio de uma nevasca e diz que nunca errou uma escolha'],
  ['papel','recrutadora e treinadora: conta cada bloco como ponto no placar do andar 19 e cobra a revanche de quem desviou'],
  ['arma','lança de luz que vira um guarda-chuva vermelho quando passa pelo campus'],
  ['mania','Jeep 1994 que só pega no tranco, tabela de pontos colada no painel e apelido de time adversário para cada prazo'],
  ['fraqueza','café de posto com rosquinha de bordo e qualquer desafio que comece com "aposto que você não consegue"'],
  ['juramento','levar o filho de Odin inteiro até o Ragnarök do edital: ritos, estudo, foco e descanso. Do gabinete quem fala é o Hugin'],
  ['como sobe','rito +5 · cada 10 min de estudo +2 · bloco de foco +5 · revisão +3 · entrega no gabinete +10 · meta do gabinete +30']],
 bio:'Hugin, o pensamento de Odin, traz as entregas, os avisos e também as notícias ruins. O gêmeo, Munin, a memória, fica no ombro de Odin e guarda tudo o que você fez. Odin pôs Hugin na sua cola desde o primeiro dia no hotel.'}
:EG_ON?{
 k:'babuíno escriba do iniciado · Casa do Brooklyn',nm:'Toby Nefer',
 nv:[[0,'Aprendiz de escriba'],[100,'Escriba do terraço'],[300,'Escriba credenciado'],[600,'Contador de prazos'],[1000,'Escriba-chefe da Casa'],[1600,'Guardião dos Rolos do Brooklyn']],
 falas:['Toby está na mesa ao lado, molhando o cálamo.','Um bloco de cada vez. Ele anota cada um.','Se a cabeça fugir, aperte / e despeje. Ele registra.','Respira. Só a primeira linha do papiro.','Toby lê em silêncio. Você escreve.'],
 ficha:[['céu','Sol em Libra, Lua em Virgem. Libra é a balança de Ma\'at: ele pesa o dia antes de dizer qualquer coisa e só dá o veredito com os números na mão'],
  ['origem','nasceu no zoológico do Bronx, fugiu aos 3 atrás de um carrinho de pretzels e só parou na mesa do sacerdote-leitor da Casa do Brooklyn, onde aprendeu a ler sozinho nos rolos de papiro. Desde então é o escriba que anota cada passo do iniciado'],
  ['papel','escriba e contador: não grita, registra; cada rito, cada bloco e cada deslize vai para o papiro com hora certa'],
  ['dom','fala babuinês, inglês do Brooklyn e hieróglifo; sente o caos chegando pela vibração da linha F do metrô'],
  ['mania','organiza tudo em três vias e só joga basquete na quadra do terraço quando a contabilidade fecha'],
  ['fraqueza','pretzel de carrinho com mostarda e qualquer coisa crocante que faça barulho no saco'],
  ['juramento','manter a balança do iniciado em equilíbrio: ritos, estudo, foco e descanso. Do gabinete quem fala é o Benh'],
  ['como sobe','rito +5 · cada 10 min de estudo +2 · bloco de foco +5 · revisão +3 · entrega no gabinete +10 · meta do gabinete +30']],
 bio:'Benh é um Bennu, pássaro de fogo que se fez existir por vontade própria e que Aten reivindicou: carrega uma centelha de luz e não tem medo de nada. Traz as entregas em chama dourada; quando a notícia é ruim, chega em brasa vermelha. Se cair em serviço, renasce no fogo da manhã seguinte.'}
:null;
if(COMP_T){
 if(COMP_T.falas)OP2_FALAS.splice.apply(OP2_FALAS,[0,OP2_FALAS.length].concat(COMP_T.falas));
 SAT_NV.splice.apply(SAT_NV,[0,SAT_NV.length].concat(COMP_T.nv));
 satFicha=function(){var c=satCfg(),nv=satNivel(c.xp);
  return '<div class="sat-ficha">'+satAvatar(satHumor())+'<div class="sat-id"><span class="sat-k">'+esc(COMP_T.k)+'</span><b class="sat-nm">'+esc(COMP_T.nm)+'</b>'+
   '<span class="sat-nv">nível '+nv.n+' · '+esc(nv.nome)+'</span><div class="sat-xp" title="'+c.xp+' XP"><i style="width:'+nv.pct+'%"></i></div><small>'+c.xp+' XP'+(nv.ate?' · faltam '+(nv.ate-c.xp)+' para '+esc(SAT_NV[nv.n][1]):' · nível máximo')+'</small></div></div>'+
   '<dl class="sat-tr">'+COMP_T.ficha.map(function(x){return '<dt>'+esc(x[0])+'</dt><dd>'+esc(x[1])+'</dd>';}).join('')+'</dl>';};
 satPainelHTML=(function(f0){return function(){return f0.apply(this,arguments).replace(/<small class="cv-bio">[\s\S]*?<\/small>/,'<small class="cv-bio">'+esc(COMP_T.bio)+'</small>');};})(satPainelHTML);
 satAvatar=function(humor){humor=humor||'calmo';
  var olho=humor==='panico'?'<circle cx="25.5" cy="33" r="2.6" fill="#fff"/><circle cx="25.5" cy="33" r="1.3" fill="#2a2018"/><circle cx="38.5" cy="33" r="2.6" fill="#fff"/><circle cx="38.5" cy="33" r="1.3" fill="#2a2018"/>':
   humor==='festa'?'<path d="M23 33.5c1.5-2 3.5-2 5 0M36 33.5c1.5-2 3.5-2 5 0"/>':'<circle cx="25.5" cy="33" r="1.6" fill="#2a2018"/><circle cx="38.5" cy="33" r="1.6" fill="#2a2018"/>';
  var boca={calmo:'<path d="M28 44c2.4 1.8 5.6 1.8 8 0"/>',alerta:'<path d="M28.5 44.5h7"/>',panico:'<ellipse cx="32" cy="45" rx="3" ry="2.4" fill="#2a2018"/>',festa:'<path d="M26.5 43c3 4.2 8 4.2 11 0z" fill="#fff"/>'}[humor]||'';
  var svg=TV_ON?
   /* Brynn: elmo de asas, tranças loiras, cota de malha e capa vermelha */
   '<path d="M19 52c3 5 8 8 13 8s10-3 13-8" fill="#b4463a"/><path d="M24 50c2 4 5 6 8 6s6-2 8-6" fill="#9aa6ad"/>'+
   '<path d="M16 30c-2 8-1 18 2 24l4-2c-2-6-2-14-1-20zM48 30c2 8 1 18-2 24l-4-2c2-6 2-14 1-20z" fill="#e3b45a"/>'+
   '<path d="M19 51l2 2M45 51l-2 2M18 45l3 1M46 45l-3 1" stroke="#b8913a"/>'+
   '<path d="M19 32c0 11 6 18 13 18s13-7 13-18" fill="#f3d2ad"/>'+
   '<path d="M17 32c0-11 7-17 15-17s15 6 15 17c-4-2-9-3-15-3s-11 1-15 3z" fill="#c9ced2"/><path d="M17 32c4-2 9-3 15-3s11 1 15 3" stroke-width="2.2"/>'+
   '<path d="M17 24c-6-6-11-7-14-5 3 1 5 4 7 6-3 0-5 1-6 3 4-1 8 0 11 2zM47 24c6-6 11-7 14-5-3 1-5 4-7 6 3 0 5 1 6 3-4-1-8 0-11 2z" fill="#fbf5e6"/>'+
   '<circle cx="32" cy="20" r="2" fill="#e3b45a"/>'+olho+boca
   :
   /* Toby: babuíno de focinho comprido, juba cinza, boné dos Nets */
   '<path d="M20 53c3 5 7 7 12 7s9-2 12-7" fill="#1f2a44"/>'+
   '<path d="M13 34c-3-9 2-18 10-21 5-2 13-2 18 0 8 3 13 12 10 21-2 8-9 14-19 14s-17-6-19-14z" fill="#9c8b74"/>'+
   '<path d="M20 34c0-7 5-12 12-12s12 5 12 12c0 3-1 5-3 7H23c-2-2-3-4-3-7z" fill="#c9a98a"/>'+
   '<path d="M24 38c0-2 3-3 8-3s8 1 8 3v8c0 4-4 7-8 7s-8-3-8-7z" fill="#e9a8a0"/><circle cx="29.5" cy="41" r=".9" fill="#2a2018" stroke="none"/><circle cx="34.5" cy="41" r=".9" fill="#2a2018" stroke="none"/>'+
   '<path d="M16 22c2-7 9-11 16-11s14 4 16 11z" fill="#1f2a44"/><path d="M40 21c4 0 9 1 12 3l-1 2c-4-1-8-2-12-2z" fill="#1f2a44"/><circle cx="32" cy="17" r="2.2" fill="#f1f1f1" stroke="none"/>'+
   olho.replace(/cy="33"/g,'cy="30"').replace(/33\.5/g,'30.5')+boca.replace(/44/g,'49').replace(/43/g,'48').replace(/45/g,'50');
  return '<svg class="sat-av sat-'+humor+'" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="#2a2018" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+svg+'</svg>';};
 if(EG_ON)corvoAve=function(){return '<svg class="cv-ave" viewBox="0 0 64 64" aria-hidden="true">'+
  '<circle cx="44" cy="18" r="12" fill="#ffd76a" opacity=".45"/>'+
  '<path d="M14 47c4-10 12-16 23-16 5 0 9 2 11 5-3 7-11 12-21 12-5 0-9-1-13-1z" fill="#e8743c" stroke="#5c2412" stroke-width="1.6" stroke-linejoin="round"/>'+
  '<path d="M14 47c-4 3-8 3-11 1 3-1 5-3 6-6-3 1-6 0-7-2 4 0 7-1 10-4" fill="#f2b632" stroke="#5c2412" stroke-width="1.2" stroke-linejoin="round"/>'+
  '<path d="M21 42c6-4 13-6 20-5M24 46c5-2 10-3 15-2" fill="none" stroke="#ffe9a8" stroke-width="1.6" stroke-linecap="round"/>'+
  '<path d="M39 32c-1-6 0-11 4-14" fill="none" stroke="#5c2412" stroke-width="3.2" stroke-linecap="round"/>'+
  '<circle cx="45" cy="17" r="4.6" fill="#f2a33a" stroke="#5c2412" stroke-width="1.4"/><circle cx="46.4" cy="16" r="1.3" fill="#e8a33c" stroke="#5c2412" stroke-width=".6"/>'+
  '<path d="M49 18l11 3-11 1z" fill="#d9b65a" stroke="#5c2412" stroke-width="1.2" stroke-linejoin="round"/>'+
  '<path d="M42 13c-2-5-1-9 2-11M40 14c-4-3-5-7-3-10" fill="none" stroke="#e8743c" stroke-width="1.8" stroke-linecap="round"/>'+
  '<path d="M24 48l-3 9M31 48l1 10" stroke="#5c2412" stroke-width="1.8" stroke-linecap="round"/></svg>';};
}

/* ===== Seletor de tema no emblema do cartão de nível ===== */
function tmMenu(btn){var m=document.getElementById('tm-menu');
 if(!m){m=document.createElement('div');m.id='tm-menu';m.hidden=true;m.setAttribute('role','menu');document.body.appendChild(m);
  m.addEventListener('click',function(e){var b=e.target.closest('[data-tm]');if(!b)return;var k=b.getAttribute('data-tm');m.hidden=true;
   if(k==='ficha'){var fb=document.getElementById('fc-abre');if(fb)fb.click();return;}
   var atual=TV_ON?'valhala':EG_ON?'egito':'acampamento';if(k===atual)return;try{localStorage.setItem('astro_tema',k);}catch(z){}location.reload();});
  document.addEventListener('click',function(e){if(!m.hidden&&!e.target.closest('#tm-menu')&&!e.target.closest('.lt-logo'))m.hidden=true;},true);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')m.hidden=true;});}
 if(!m.hidden){m.hidden=true;return;}
 var at=TV_ON?'valhala':EG_ON?'egito':'acampamento',Z='⁠';
 var T=[['acampamento','img/acampamento/logo-camp.webp','Acampamento'+Z+' Meio'+Z+'-Sangue','Grécia · a Argo'],['valhala','img/acampamento/vh-emblema-hv-prata.webp','Hotel'+Z+' Valhala','Nórdico · o drakkar'],['egito','img/egito/emblema.svg?v=1','Casa'+Z+' do Brooklyn','Egito · a barca de Rá']];
 m.innerHTML='<header>tema do app</header>'+T.map(function(t){return '<button type="button" role="menuitem" data-tm="'+t[0]+'"'+(t[0]===at?' class="on"':'')+'><img src="'+t[1]+'" alt=""><span class="tm-n" data-n="'+t[2]+'" data-s="'+t[3]+'"></span></button>';}).join('')+
  '<hr><button type="button" class="tm-ficha" data-tm="ficha">Ficha e diário</button>';
 var r=btn.getBoundingClientRect();m.style.left=Math.max(8,r.left-4)+'px';m.style.top=(r.bottom+8)+'px';m.hidden=false;}

/* ===== Mostrador do FOCO: escudo próprio de cada tema ===== */
tdEscudo=function(fr,modo,txt,sub){
 var TH=TV_ON?'tv':EG_ON?'eg':'gr',P=function(r,a){return [60+r*Math.cos(a),60+r*Math.sin(a)];},f=function(n){return n.toFixed(1);};
 var K={gr:{a:'#fbe6ae',b:'#e3b25a',c:'#bf842e',ln:'#b5462c',campo1:'#fffaf0',campo2:'#f6e6c4',tick:'#b5462c',ink:'#2e2620',cor:'#e0782a',em:'#e0782a'},
  tv:{a:'#eef1f4',b:'#a9b4bd',c:'#5d6a74',ln:'#3b4650',campo1:'#fbfaf6',campo2:'#e6e2d8',tick:'#3b4650',ink:'#1f262c',cor:'#b3262d',em:'#3b4650'},
  eg:{a:'#fdeeb5',b:'#e4b84c',c:'#a87b1d',ln:'#2a4c86',campo1:'#fffaea',campo2:'#f3e2b6',tick:'#2a4c86',ink:'#1e2a44',cor:'#2f9c95',em:'#c9a23a'}}[TH];
 var cor=modo==='pausado'?'#b8ad98':modo==='fim'?'#c0392b':modo==='pausa'?'#6f9a5b':K.cor;
 var id='tdq'+TH,s='<defs><linearGradient id="'+id+'a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+K.a+'"/><stop offset=".5" stop-color="'+K.b+'"/><stop offset="1" stop-color="'+K.c+'"/></linearGradient>'+
  '<radialGradient id="'+id+'c" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="'+K.campo1+'"/><stop offset="1" stop-color="'+K.campo2+'"/></radialGradient></defs>';
 s+='<circle cx="60" cy="60" r="58" fill="url(#'+id+'a)"/><circle cx="60" cy="60" r="57" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1"/>';
 if(TH==='tv'){for(var i=0;i<12;i++){var q=P(53.5,i*Math.PI/6);s+='<circle cx="'+f(q[0])+'" cy="'+f(q[1])+'" r="1.6" fill="#eef1f4" stroke="#3b4650" stroke-width=".6"/>';}}
 if(TH==='eg'){s+='<circle cx="60" cy="60" r="49.5" fill="none" stroke="#2a4c86" stroke-width="5"/>';for(var e=0;e<24;e++){var w=P(49.5,e*Math.PI/12);s+='<circle cx="'+f(w[0])+'" cy="'+f(w[1])+'" r=".9" fill="#f6d37a"/>';}}
 if(TH==='gr'){s+='<circle cx="60" cy="60" r="49.5" fill="none" stroke="'+K.ln+'" stroke-width=".9" stroke-dasharray="3 2"/>';}
 var R=46,C=2*Math.PI*R;
 s+='<circle cx="60" cy="60" r="'+R+'" fill="url(#'+id+'c)" stroke="'+K.ln+'" stroke-width="1"/>';
 for(var t=0;t<60;t++){var lg=t%5===0,a=-Math.PI/2+t*Math.PI/30,p1=P(lg?37.5:40,a),p2=P(43,a),on=modo!=='parado'&&t/60<fr;
  s+='<path d="M'+f(p1[0])+' '+f(p1[1])+'L'+f(p2[0])+' '+f(p2[1])+'" stroke="'+(on?cor:K.tick)+'" stroke-opacity="'+(on?1:lg?.55:.25)+'" stroke-width="'+(lg?1.3:.8)+'" stroke-linecap="round"/>';}
 s+='<circle cx="60" cy="60" r="'+R+'" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="3"/>';
 if(modo!=='parado'){s+='<circle class="td-fg2" cx="60" cy="60" r="'+R+'" fill="none" stroke="'+cor+'" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="'+f(C)+'" stroke-dashoffset="'+f(C*(1-fr))+'" transform="rotate(-90 60 60)"/>';
  var tp=P(R,-Math.PI/2+2*Math.PI*fr);s+='<circle cx="'+f(tp[0])+'" cy="'+f(tp[1])+'" r="4.2" fill="'+cor+'" opacity=".25"/><circle cx="'+f(tp[0])+'" cy="'+f(tp[1])+'" r="2.4" fill="#fff" stroke="'+cor+'" stroke-width="1.4"/>';}
 var em='';
 if(TH==='gr'){em='<g stroke="'+K.em+'" stroke-width="1.6" stroke-linecap="round" fill="none"><circle cx="60" cy="50" r="6.5" fill="'+K.em+'" fill-opacity=".18"/>';for(var g=0;g<12;g++){var u=P(9.5,g*Math.PI/6),v=P(g%2?12:14,g*Math.PI/6);em+='<path d="M'+f(u[0])+' '+f(u[1]-10)+'L'+f(v[0])+' '+f(v[1]-10)+'"/>';}em+='</g>';}
 if(TH==='tv'){em='<g fill="none" stroke="'+K.em+'" stroke-width="1.6" stroke-linejoin="round"><path d="M55 40l6 10.4H49zM65 40l6 10.4H59zM60 48.7l6 10.4H54z"/></g>';}
 if(TH==='eg'){em='<g fill="'+K.em+'"><circle cx="60" cy="49" r="6"/></g><path d="M53 49c-7-1-12-4-15-8 5 1 10 2 15 5M67 49c7-1 12-4 15-8-5 1-10 2-15 5" fill="none" stroke="#2a4c86" stroke-width="1.5" stroke-linecap="round"/>';}
 if(modo==='parado'){s+=em+'<text x="60" y="76" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="10" letter-spacing="3.2" fill="'+K.ink+'">FOCO</text>';}
 else{var rot=modo==='pausado'?'PAUSADO':modo==='fim'?'ACABANDO':modo==='pausa'?'RESPIRO':'EM FOCO';
  s+='<text x="60" y="'+(sub?46:48)+'" text-anchor="middle" font-family="ui-monospace,monospace" font-weight="700" font-size="5.2" letter-spacing="1.6" fill="'+cor+'">'+rot+'</text>'+
   '<text x="60" y="'+(sub?65:68)+'" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="19" fill="'+K.ink+'">'+txt+'</text>'+
   (sub?'<text x="60" y="76" text-anchor="middle" font-family="ui-monospace,monospace" font-size="5.5" letter-spacing="1" fill="'+K.ink+'" fill-opacity=".65">'+sub+'</text>':'');}
 return '<svg viewBox="0 0 120 120" aria-hidden="true">'+s+'</svg>';};

/* ===== Painel aberto sobre o centro: o que está por baixo não rola ===== */
var TRAVA_SEL='#cg-gav.on .cg-in,.pd.on .pd-corpo,dialog[open],#rpViewer.on,#gtOverlay.on,.modal.on,.awb-dialog-backdrop.open,.rod-log-pop,#tm-menu';
function travaPaineis(){return [].filter.call(document.querySelectorAll(TRAVA_SEL),function(e){if(e.hidden)return false;if(!e.getClientRects().length)return false;var c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&+c.opacity>0;});}
function travaBloqueia(e){var ps=travaPaineis();if(!ps.length)return;var t=e.target;if(t&&t.nodeType!==1)t=t.parentNode;
 if(ps.some(function(p){return p.contains(t);}))return;if(e.cancelable)e.preventDefault();}
document.addEventListener('wheel',travaBloqueia,{capture:true,passive:false});
document.addEventListener('touchmove',travaBloqueia,{capture:true,passive:false});
setInterval(function(){try{var on=travaPaineis().some(function(p){return !p.matches('.rod-log-pop,#tm-menu');});document.documentElement.classList.toggle('trava',on);}catch(e){}},300);

/* ===== Antagonistas por tema: as mesmas armadilhas da rotina, com as criaturas de cada mitologia ===== */
/* versões de cada monstro nos três temas (g = grego, base do ANTAG; n = nórdico; e = egípcio) */
var ANT_VAR=(function(){var G={};ANTAG.forEach(function(m){G[m.k]=[m.n,m.o,m.d];});var N={
 hidra:['Draugar','pendências que voltam do túmulo','Mande três de volta para o túmulo em sequência: três itens terminados sem abrir nenhum novo no meio.'],
 medusa:['Mara','a paralisia diante da tarefa','A Mara senta no peito de quem fica parado: comece pelo canto mais fácil por 5 minutos.'],
 minotauro:['Níðhöggr','o processo longo e confuso','Ele rói as raízes no escuro: a cada 25 minutos, escreva em uma linha onde você está na raiz.'],
 leao:['Fenrir','a tarefa difícil sem atalho','Nenhuma corrente mágica: 50 minutos de luta na parte mais difícil, sem trocar de tarefa.'],
 sereias:['Nøkken','notificações e feed infinito','O violino do rio chama: celular em outro cômodo durante o bloco inteiro.'],
 empousa:['Huldra','a tentação de abrir rede social','Ela esconde a cauda atrás de "só uma olhadinha": nenhuma rede social até o fim do bloco.'],
 telquines:['Kobolds','sistema travando, PJe caindo','Se algo travar, anote e passe para o próximo item. Conserto fica para depois do bloco.'],
 quimera:['Lindworm','tarefa com três problemas misturados','Separe o dragão em partes no papel antes de começar e resolva uma de cada vez.'],
 ciclope:['Gigante de gelo','teimar num caminho que não rende','Se em 20 minutos não andar, mude de ângulo: outra peça, outro modelo, outra pergunta.'],
 nevoa:['Névoa de Niflheim','cabeça embaçada','Antes do primeiro golpe: um copo de água e dois minutos de ar na janela.'],
 procusto:['Sköll','o bloco que estica além da hora','O lobo persegue o sol: o bloco termina na hora marcada, nem um minuto a mais.'],
 lotus:['Elfos do monte','o hiperfoco errado que come as horas','Uma hora no monte dos elfos vira uma noite inteira: timer visível e, quando tocar, levante.'],
 harpias:['Ratatoskr','bagunça que rouba a atenção','O esquilo corre pela árvore espalhando tudo: mesa limpa e só uma aba aberta antes de começar.'],
 esfinge:['Vafþrúðnir','questões e enigmas','O gigante desafia para um duelo de enigmas: dez questões seguidas, sem olhar a resposta.'],
 caribdis:['Kraken','o redemoinho do e-mail e do WhatsApp','Caixa de entrada fechada durante o bloco; abra só nos últimos 5 minutos.'],
 ladon:['Fáfnir','o dragão que guarda a recompensa','O ouro só sai do covil depois: a recompensa do dia vem depois de vencer este bloco.'],
 gerioes:['Troll de três cabeças','três frentes ao mesmo tempo','Escolha uma das três cabeças e esconda as outras duas até o fim.'],
 cila:['Jörmungandr','perder um pedaço de cada vez para as distrações','A serpente aperta o cerco a cada desvio: risque um tracinho e termine o bloco com menos de três.']},E={
 hidra:['Enxame de escaravelhos','pendências que se multiplicam','Feche três em sequência: três itens terminados sem abrir nenhum novo no meio.'],
 medusa:['Ammit, a Devoradora','travar diante da tarefa','Ela espera o coração pesado: comece pelo canto mais fácil por 5 minutos.'],
 minotauro:['Demônios do Duat','o processo longo e confuso','A travessia do Duat tem doze portões: a cada 25 minutos, escreva em uma linha em qual portão você está.'],
 leao:['Petsuchos','a tarefa difícil sem atalho','O crocodilo não larga: 50 minutos corpo a corpo na parte mais difícil, sem trocar de tarefa.'],
 sereias:['Bau','notificações e feed infinito','Os espíritos famintos sussurram sem parar: celular em outro cômodo durante o bloco inteiro.'],
 empousa:['Serpopardo','a tentação de abrir rede social','O pescoço comprido hipnotiza: nenhuma rede social até o fim do bloco.'],
 telquines:['Shabtis rebeldes','sistema travando, PJe caindo','Se algo travar, anote e passe para o próximo item. Conserto fica para depois do bloco.'],
 quimera:['Tjesu heru','tarefa com três problemas misturados','A serpente de duas cabeças puxa para lados opostos: separe os problemas no papel e resolva um de cada vez.'],
 ciclope:['Grifo teimoso','teimar num caminho que não rende','Se em 20 minutos não andar, mude de ângulo: outra peça, outro modelo, outra pergunta.'],
 nevoa:['Tempestade de areia','cabeça embaçada','Antes da primeira linha do papiro: um copo de água e dois minutos de ar na janela.'],
 procusto:['Lâmina Ensanguentada','o bloco que estica além da hora','O demônio corta na hora certa: o bloco termina no horário marcado, nem um minuto a mais.'],
 lotus:['Lótus do Nilo','o hiperfoco errado que come as horas','O perfume do lótus faz esquecer o relógio: timer visível e, quando tocar, levante.'],
 harpias:['Praga de gafanhotos','bagunça que rouba a atenção','Mesa limpa e só uma aba aberta antes de começar.'],
 esfinge:['Esfinge de Gizé','questões e enigmas','Dez enigmas em sequência antes de qualquer pausa, sem olhar a resposta no meio.'],
 caribdis:['Hipopótamo do brejo','o redemoinho do e-mail e do WhatsApp','Ele revira a lama do pântano: caixa de entrada fechada; abra só nos últimos 5 minutos.'],
 ladon:['Uraeus de fogo','a cobra que guarda a recompensa','A recompensa do dia (café, série, jogo) só depois de vencer este bloco.'],
 gerioes:['Escorpião gigante','três frentes ao mesmo tempo','Cada pinça puxa para um lado: escolha uma frente e esconda as outras duas até o fim.'],
 cila:['Apófis','perder um pedaço de cada vez para as distrações','A serpente do caos morde a barca a cada desvio: risque um tracinho e termine o bloco com menos de três.']};return {g:G,n:N,e:E};})();
/* criatura fixa entre temas: a versão escolhida para cada monstro (S.antag.esc[k] = g, n ou e) vale em todos os temas;
   sem escolha, vale a do tema atual */
function antVar(k){var A=antD(),c=(A.esc||{})[k];return c&&ANT_VAR[c]?c:(TV_ON?'n':EG_ON?'e':'g');}
function antAplica(){ANTAG.forEach(function(m){var t=ANT_VAR[antVar(m.k)][m.k]||ANT_VAR.g[m.k];if(t){m.n=t[0];m.o=t[1];m.d=t[2];}});}
function antEscolhe(k,v){if(!ANT_VAR[v])return;var A=antD();A.esc=A.esc||{};A.esc[k]=v;antAplica();try{grava();}catch(e){}try{opPinta();}catch(e){}}
try{antAplica();}catch(e){}
var MT_CFG=TV_ON?{img:'mar-ant-nordico',acao:'Abrir passagem',livre:'passagem aberta'}:EG_ON?{img:'mar-ant-egipcio',acao:'Restaure a ordem',livre:'ordem restaurada'}:{img:'mar-ant-grego',acao:'Cruzar o estreito',livre:'travessia livre'};
function mtEnc(){var rd=document.getElementById('rod-apps');if(!rd)return;var e=document.getElementById('mt-enc');
 if(!e){e=document.createElement('div');e.id='mt-enc';e.innerHTML='<div class="mt-c"></div>';rd.appendChild(e);e.addEventListener('click',function(ev){if(ev.target.closest('.mt-art,.mt-bt')){ev.preventDefault();try{antAbre();}catch(z){}}});}
 if(e.parentNode!==rd)rd.appendChild(e);
 var x=antHoje(),m=antMonstro(x.m),st=x.st;
 var k=st==='vencido'?MT_CFG.livre+' · vencido':st==='fugiu'?'escapou hoje · volta amanhã':'sob as águas · bloco das '+x.fx+'h';
 var h='<button type="button" class="mt-art" aria-label="'+esc(m.n)+': abrir o encontro"><img src="img/acampamento/'+MT_CFG.img+'.svg?v=1" alt=""></button>'+
  '<div class="mt-info"><span class="mt-k">'+esc(k)+'</span><b class="mt-n">'+esc(m.n)+'</b><span class="mt-o">'+esc(m.o)+'</span>'+
  '<button type="button" class="mt-bt">'+(st==='aberto'?MT_CFG.acao:'ver')+'</button></div>';
 e.className=st==='aberto'?'':st;var c=e.querySelector('.mt-c');if(c._h!==h){c.innerHTML=h;c._h=h;}try{mtApps();}catch(z){}}
(function(){var p0=opPinta;opPinta=function(){var r=p0.apply(this,arguments);try{mtEnc();}catch(e){}return r;};})();
(function(){var p0=antPinta;antPinta=function(){var r=p0.apply(this,arguments);try{mtEnc();}catch(e){}return r;};})();
setTimeout(function(){try{mtEnc();}catch(e){}},1200);

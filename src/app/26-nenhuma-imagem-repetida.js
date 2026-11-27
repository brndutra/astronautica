/* ======================= nenhuma imagem repetida =======================
   Cada foto do acampamento aparece num lugar só. Onde havia repetição, entra uma ilustração própria em sépia:
   Diárias (relógio de sol), Culture Vulture (máscaras), e as cinco placas do Posto de comando
   (aurora de Hélio, arco de Apolo, fios das Moiras, pergaminho das Musas, caminhos de Hermes). O louro sai do fundo da Profecia. */
(function(){var T={'.op-l':'ilustra-aurora.svg','.op-col1':'ilustra-arco-apolo.svg','.op-fazer':'ilustra-moiras.svg','.op-estudo':'ilustra-musas.svg','.op-lado':'ilustra-hermes.svg'};
 try{Object.keys(T).forEach(function(k){if(OP_TEMPLO[k])OP_TEMPLO[k].img=T[k];});}catch(e){}
 var st=document.createElement('style');st.id='img-unicas-css';st.textContent=[
  '#mm-box .mm-quest{--mm-img:url("img/acampamento/ilustra-relogio-sol.svg")!important}',
  '#recreio #lat-cv,#lat-cv{--c-img:url("img/acampamento/ilustra-mascaras.svg")!important}',
  '.mm-prof{background:linear-gradient(180deg,rgba(251,247,236,.8),var(--panel) 130px)!important}',
  '#modo-op .op-ritos>.op-cab,#modo-op .op-foco~* .op-cab{--t-foto:none!important}'
 ].join('\n');document.head.appendChild(st);
 /* numa coluna do Posto com dois cabeçalhos, a placa com foto fica só no primeiro */
 function opUmaFoto(){Array.prototype.forEach.call(document.querySelectorAll('.op-templo,.op-c'),function(col){Array.prototype.forEach.call(col.querySelectorAll('.op-cab'),function(c,i){if(i>0)c.style.setProperty('--t-foto','none');});});}
 try{var t0=opTemplo;opTemplo=function(){var r=t0.apply(this,arguments);try{opUmaFoto();}catch(e){}return r;};}catch(e){}
 setTimeout(function(){try{if(typeof opTemplo==='function')opTemplo();}catch(e){}},1200);})();


/* ======================= placa da moldura = título e seletor do templo =======================
   O cabeçalho e o seletor de faces do Templo das Tarefas saem; a placa no entablamento da seção mostra as duas faces,
   com a atual em destaque, e a troca acontece ali. O recreio com hora e a fila do lazer ficam depois da seção. */
var TP_FACES=[['tm','Tarefas e Missões'],['rec','Recreação']];
function tpPlaca(){var box=document.getElementById('tp-real');if(!box)return;var f=p4Face();
 Array.prototype.forEach.call(box.querySelectorAll(':scope>:is(#tm-painel,#recreio)>.tm-cab'),function(cab){var n=cab.querySelector(':scope>.tp-placa');
  if(!n){n=document.createElement('nav');n.className='tp-placa';n.setAttribute('role','tablist');n.setAttribute('aria-label','faces do templo');cab.appendChild(n);}
  var h=TP_FACES.map(function(x){return '<button type="button" role="tab" data-tpface="'+x[0]+'" aria-selected="'+(x[0]===f)+'">'+x[1]+'</button>';}).join('<i aria-hidden="true">·</i>');
  if(n._h!==h||(h&&!n.firstChild)){n._h=h;n.innerHTML=h;}});}
(function(){var t0=tpReal;tpReal=function(){var r=t0.apply(this,arguments);try{tpPlaca();}catch(e){}return r;};})();
setTimeout(function(){try{tpPlaca();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='tp-placa-css';st.textContent=[
 '#tp-painel:has(#tp-real) .tp-cab,#tp-painel:has(#tp-real) .tp-faces{display:none!important}',
 '#tp-painel:has(#tp-real) .tp-fr{display:flex;flex-direction:column;padding-top:22px!important}',
 '#tp-painel:has(#tp-real) #tp-real{order:1;margin-top:0}',
 '#tp-painel:has(#tp-real) .tp-corpo{order:2;margin:14px 12px 0}',
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab>:not(.tp-placa){display:none!important}',
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab{max-width:calc(100% - 28px)!important;width:max-content!important;justify-content:center;padding:6px 12px!important}',
 '#tp-real .tp-placa{display:flex;align-items:baseline;justify-content:center;gap:6px;flex-wrap:nowrap;min-width:0}',
 '#tp-real .tp-placa i{font-style:normal;color:#9a6b3a}',
 '#tp-real .tp-placa button{width:auto!important;margin:0!important;padding:0 2px!important;border:0!important;background:none!important;cursor:pointer;white-space:nowrap;',
 ' font:400 13px Georgia,serif!important;font-variant:small-caps;letter-spacing:.04em;color:#8a6f55!important}',
 '#tp-real .tp-placa button[aria-selected="true"]{font-size:17px!important;color:#2a2418!important;font-weight:400}',
 '#tp-real .tp-placa button:not([aria-selected="true"]):hover{color:#5a3f2c!important;text-decoration:underline;text-underline-offset:3px}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Toque da Concha vira friso sobre o templo =======================
   Inspeção e Ronda já moram na faixa do dia; o que sobra da Rotina do chalé, a Concha, vira um friso no alto do Templo
   das Tarefas: os toques do dia como métopas, o já tocado esmaecido e o próximo em ouro. O cartão da rotina sai do Mural;
   clicar no friso abre as configurações da Concha (o mesmo #rt-box, só com a coluna da Concha). */
function frisoNome(n){n=String(n||'').split(' · ')[0];if(/recolher/i.test(n))return 'Recolher';return n.split(' ')[0];}
function frisoHTML(){var R=rtD(),a=rtAgora(),L=R.toques.filter(function(t){return t.on;}).sort(function(x,y){return rtMin(x.h)-rtMin(y.h);}),prox=null;
 L.forEach(function(t){if(!prox&&rtMin(t.h)>a)prox=t;});
 var p=rtProx(),falta=p?((p.m!=null?p.m:rtMin(p.h))-a):0;if(falta<0)falta+=1440;
 return '<div class="tf-met">'+(L.length?L.map(function(t){var m=rtMin(t.h),cls=t===prox?' prox':(m<=a?' foi':'');return '<span class="tf-m'+cls+'" title="'+esc(t.h+' · '+t.n)+'"><b>'+esc(t.h)+'</b><i>'+esc(frisoNome(t.n))+'</i></span>';}).join('<em class="tf-tri" aria-hidden="true"></em>'):'<span class="tf-vz">nenhum toque ligado</span>')+'</div>'+
  '<div class="tf-leg">'+RT_IC.concha+'<span>Toque da Concha'+(p?' · próximo '+esc(p.h)+' · '+esc(p.n)+' · em '+(falta>=60?Math.floor(falta/60)+'h'+String(falta%60).padStart(2,'0'):falta+' min'):'')+'</span><b>ajustar ▾</b></div>';}
var TP_FRISO=null;
function tpFriso(){var p=document.getElementById('tp-painel');if(!p)return;var fr=p.querySelector('.tp-fr');if(!fr)return;
 if(!TP_FRISO){TP_FRISO=document.createElement('button');TP_FRISO.type='button';TP_FRISO.id='tp-friso';TP_FRISO.className='tp-friso';TP_FRISO.setAttribute('aria-expanded','false');TP_FRISO.setAttribute('aria-label','Toque da Concha · ajustar os toques');
  TP_FRISO.addEventListener('click',function(e){e.stopPropagation();concha(!document.body.classList.contains('concha-aberta'));});}
 if(TP_FRISO.parentNode!==fr||fr.firstElementChild!==TP_FRISO)fr.insertBefore(TP_FRISO,fr.firstChild);
 var h=frisoHTML();if(TP_FRISO._h!==h||(h&&!TP_FRISO.firstChild)){TP_FRISO._h=h;TP_FRISO.innerHTML=h;}}
function concha(on){document.body.classList.toggle('concha-aberta',!!on);if(TP_FRISO)TP_FRISO.setAttribute('aria-expanded',String(!!on));
 if(on&&TP_FRISO){var r=TP_FRISO.getBoundingClientRect();document.body.style.setProperty('--concha-top',Math.round(r.bottom+6)+'px');document.body.style.setProperty('--concha-right',Math.round(innerWidth-r.right)+'px');document.body.style.setProperty('--concha-w',Math.round(r.width)+'px');
  try{var b=document.getElementById('rt-box');if(b)b.innerHTML=rtHTML();}catch(e){}}}
document.addEventListener('pointerdown',function(e){if(!document.body.classList.contains('concha-aberta'))return;if(e.target.closest('#tm-r1,#tp-friso'))return;concha(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('concha-aberta'))concha(false);});
(function(){var t0=tpReal;tpReal=function(){var r=t0.apply(this,arguments);try{tpFriso();}catch(e){}return r;};})();
setInterval(function(){try{tpFriso();}catch(e){}},30000);setTimeout(function(){try{tpFriso();}catch(e){}},1600);
['click','change'].forEach(function(ev){document.addEventListener(ev,function(e){if(e.target.closest&&e.target.closest('#tm-r1'))setTimeout(function(){try{tpFriso();}catch(z){}},60);},true);});
/* o horário das harpias passa para o cartão da Ronda, na faixa do dia */
diaCardHTML=(function(f0){return function(k){var h=f0.apply(this,arguments);if(k!=='n')return h;var R=rtD();
 return h.replace('</ul>','</ul><label class="df-lim">as harpias começam a ronda às <input type="time" data-dflim value="'+esc(R.limite)+'"></label>');};})(diaCardHTML);
document.addEventListener('change',function(e){var i=e.target.closest('[data-dflim]');if(!i)return;var R=rtD();R.limite=i.value||'22:30';try{grava();}catch(z){}try{diaPinta();}catch(z){}});
(function(){var st=document.createElement('style');st.id='tp-friso-css';st.textContent=[
 '#tp-real #tm-r1,#tp-real .tm-lb:has(+ #tm-r1){display:none!important}',
 '#tp-painel:has(#tp-real) #tp-friso{order:0}',
 '#tp-friso{display:block;width:auto!important;margin:0 4px 12px!important;padding:0!important;border:1px solid #9a7b4a!important;border-radius:4px!important;cursor:pointer;text-align:left;color:#2a2418;',
 ' background:linear-gradient(180deg,#efe0bb,#e6d3a6)!important;box-shadow:inset 0 2px 0 #f7eed8,inset 0 -2px 0 #c9a45a,0 2px 0 #b9a77a}',
 '#tp-friso .tf-met{display:flex;align-items:stretch;padding:5px 6px 4px;border-bottom:1px solid #c9a45a}',
 '#tp-friso .tf-m{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:1px;padding:3px 0;border-radius:3px}',
 '#tp-friso .tf-m b{font:700 11px var(--mono,monospace);color:#5a3f2c;letter-spacing:.02em}',
 '#tp-friso .tf-m i{font:400 10.5px Georgia,serif;font-style:normal;font-variant:small-caps;color:#6b5140;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
 '#tp-friso .tf-m.foi{opacity:.45}',
 '#tp-friso .tf-m.prox{background:#e9c87a;box-shadow:inset 0 0 0 1px #9a6b3a}#tp-friso .tf-m.prox b{color:#2a1c05}',
 '#tp-friso .tf-tri{flex:none;width:8px;margin:2px 1px;background:repeating-linear-gradient(90deg,#9a7b4a 0 1.5px,transparent 1.5px 3.2px);opacity:.75}',
 '#tp-friso .tf-vz{flex:1;text-align:center;font:italic 12px Georgia,serif;color:#8a6f55}',
 '#tp-friso .tf-leg{display:flex;align-items:center;gap:6px;padding:4px 8px 5px}',
 '#tp-friso .tf-leg svg{flex:none;width:15px;height:15px;fill:none;stroke:#9a6b3a;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#tp-friso .tf-leg span{flex:1;min-width:0;font:10.5px var(--sans);color:#5a4433;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#tp-friso .tf-leg b{flex:none;font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#9a6b3a}',
 '#tp-friso[aria-expanded="true"] .tf-leg b{color:#2a1c05}',
 /* configurações da Concha: o #tm-r1 vira cartão flutuante só com a coluna da Concha */
 'body.concha-aberta #tp-real #tm-r1{display:block!important;position:fixed;top:var(--concha-top,80px);right:var(--concha-right,20px);width:var(--concha-w,340px);max-height:calc(100vh - var(--concha-top,80px) - 90px);overflow:auto;z-index:65;',
 ' margin:0!important;padding:10px!important;background:#f7eed8!important;border:1px solid #9a6b3a!important;border-radius:10px!important;box-shadow:0 14px 34px rgba(60,40,15,.28)!important}',
 'body.concha-aberta #tp-real #tm-r1 #cl-rt{display:none!important}',
 'body.concha-aberta #tp-real #tm-r1 #rt-box{display:block!important;margin:0!important}',
 'body.concha-aberta #tp-real #tm-r1 .rt-g{display:block!important}',
 'body.concha-aberta #tp-real #tm-r1 .rt-g>:not(.rt-concha){display:none!important}',
 'body.concha-aberta #tp-real #tm-r1 .rt-concha::before{display:none!important}',
 '.df-pop .df-lim{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 8px;font:12.5px Georgia,serif;color:#5a3f2c}',
 '.df-pop .df-lim input{height:28px;padding:0 6px;border:1px solid #c9b28a;border-radius:6px;background:#fffaf0;font:12px var(--mono,monospace)}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Templo das Tarefas: rolagem só dentro da moldura e embasamento no pé =======================
   A coluna direita não rola mais; quem rola é a moldura do templo. O friso da Concha fica preso no alto, a placa
   logo abaixo dele, e no pé entra o embasamento (crepidoma em três degraus) com o resumo da face atual. */
function tpBaseTexto(){var f=p4Face(),hj=hoje();
 if(f==='rec'){var o=opx(),R=p4Rec(),ate=o.lazerAte||0,n=R.filter(function(x){return !x.ok;}).length;
  return (ate>Date.now()?'recreio até '+new Date(ate).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'sem recreio marcado')+' · fila do lazer '+n+' · menu '+((S.menu||[]).length);}
 var Q=mmD(),fe=Q.feitas[hj]||[],x=plDia(hj),or=x.top.slice(0,3).filter(function(t){return t.ok;}).length,ch=Q.chale.filter(function(c){return !c.ok;}).length,cons='';
 try{var meta=0,fh=0;gabResumo().forEach(function(r){meta+=r.meta||0;fh+=Math.min(r.fh,r.meta||0);});if(meta)cons=' · conselho '+fh+'/'+meta;}catch(e){}
 return 'chalé '+ch+' · diárias '+fe.length+'/'+Q.dia.length+' · oráculo '+or+'/3'+cons;}
var TP_BASE=null;
function tpBase(){var p=document.getElementById('tp-painel');if(!p)return;var fr=p.querySelector('.tp-fr');if(!fr||!document.getElementById('tp-real'))return;
 if(!TP_BASE){TP_BASE=document.createElement('footer');TP_BASE.id='tp-base';TP_BASE.className='tp-base';TP_BASE.innerHTML='<span class="tb-d tb-d1"></span><div class="tb-d tb-d2"><div class="tb-ag"></div></div><span class="tb-d tb-d3"></span>';}
 if(TP_BASE.parentNode!==fr||fr.lastElementChild!==TP_BASE)fr.appendChild(TP_BASE);
 tpAgoraNaBase();}
/* o cartão Agora sai do pé do painel esquerdo e vira o rodapé do templo, no degrau do meio */
function tpAgoraNaBase(){var b=document.getElementById('td-agora'),slot=TP_BASE&&TP_BASE.querySelector('.tb-ag');if(!b||!slot||!TP_BASE.isConnected)return;
 b.classList.remove('td-ag-pe','no-indice');b.classList.add('td-ag-base');if(b.parentNode!==slot)slot.appendChild(b);}
(function(){var a0=tdAgora;tdAgora=function(){var r=a0.apply(this,arguments);try{tpAgoraNaBase();}catch(e){}return r;};})();
(function(){var t0=tpReal;tpReal=function(){var r=t0.apply(this,arguments);try{tpBase();}catch(e){}return r;};})();
setInterval(function(){try{tpBase();}catch(e){}},20000);setTimeout(function(){try{tpBase();}catch(e){}},1700);
['click','change'].forEach(function(ev){document.addEventListener(ev,function(e){if(e.target.closest&&e.target.closest('#tp-painel'))setTimeout(function(){try{tpBase();}catch(z){}},120);},true);});
(function(){var st=document.createElement('style');st.id='tp-rola-css';st.textContent=[
 '#rail:has(#tp-real){overflow:hidden!important}',
 '#tp-painel:has(#tp-real){height:100%;box-sizing:border-box;padding:12px 10px 12px!important;display:flex;flex-direction:column}',
 '#tp-painel:has(#tp-real) .tp-fr{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#c9a45a transparent;padding-bottom:0!important}',
 '#tp-painel:has(#tp-real) .tp-fr::-webkit-scrollbar{width:6px}#tp-painel:has(#tp-real) .tp-fr::-webkit-scrollbar-thumb{background:#c9a45a;border-radius:3px}',
 /* friso preso no alto da moldura, placa logo abaixo */
 '#tp-painel:has(#tp-real) #tp-friso{position:sticky;top:-22px;z-index:6;margin-top:-22px!important;box-shadow:inset 0 2px 0 #f7eed8,inset 0 -2px 0 #c9a45a,0 2px 0 #b9a77a,0 8px 10px -6px rgba(70,45,15,.35)!important}',
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab{position:sticky!important;top:58px!important;z-index:5;left:auto!important;right:auto!important;transform:none!important;margin:0 auto 10px!important;width:max-content!important;max-width:calc(100% - 28px)!important}',
 '#mm-box .mm-orac-col{--mm-img:url("img/acampamento/ilustra-oraculo.svg")}',
 '#tp-real .mm-gab>ul{max-height:248px;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#c9a45a transparent;padding-right:4px;margin-right:-4px;-webkit-mask-image:linear-gradient(180deg,#000 calc(100% - 18px),transparent);mask-image:linear-gradient(180deg,#000 calc(100% - 18px),transparent)}',
 '#tp-real .mm-gab>ul::-webkit-scrollbar{width:5px}#tp-real .mm-gab>ul::-webkit-scrollbar-thumb{background:#c9a45a;border-radius:3px}',
 /* embasamento: três degraus, o do meio com o resumo */
 '#tp-painel:has(#tp-real) #tp-base{order:9;position:sticky;bottom:0;z-index:6;margin:12px -8px 0;display:flex;flex-direction:column;align-items:stretch}',
 '#tp-base .tb-d{display:block;border:1px solid #9a7b4a;border-bottom:0;background:linear-gradient(180deg,#efe0bb,#e2cc98)}',
 '#tp-base .tb-d1{height:7px;margin:0 16px}',
 '#tp-base .tb-d2{margin:0 8px;padding:0}',
 '#tp-base #td-agora.td-ag-base{position:relative;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:3px 8px;margin:0;padding:7px 10px 8px;background:none;border:0;box-shadow:none;font:12.5px var(--sans);color:#3b2a1d}',
 '#tp-base #td-agora.td-ag-base::before{display:none}',
 '#tp-base #td-agora.td-ag-base .td-ag-k{grid-column:1;padding:2px 8px;border-radius:999px;background:#3b2a1d;color:#f4ead1;font:700 9px var(--mono,monospace);letter-spacing:.18em;text-transform:uppercase}',
 '#tp-base #td-agora.td-ag-base>b{grid-column:2;font:400 15px Georgia,serif;font-variant:small-caps;letter-spacing:.04em;color:#2a2418;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#tp-base #td-agora.td-ag-base .td-ag-av{grid-column:3;grid-row:1;width:auto!important;margin:0!important;padding:2px 8px!important;border:1px solid #b89c72!important;border-radius:999px;background:transparent!important;color:#5a3f2c!important;font-size:10.5px!important;white-space:nowrap}',
 '#tp-base #td-agora.td-ag-base .td-ag-t{grid-column:1/-1;color:#5a4433;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#tp-base #td-agora.td-ag-base .td-ag-bar{grid-column:1/-1;display:block;height:5px;border-radius:999px;background:#e3d3b0;overflow:hidden}',
 '#tp-base #td-agora.td-ag-base .td-ag-bar em{display:block;height:100%;background:linear-gradient(90deg,#c9a45a,#e8a33c)}',
 '#tp-base #td-agora.td-ag-base .td-ag-p{grid-column:1/-1;font-size:11.5px;color:#6b5140;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
 '#nav:has(~#rail #tp-base #td-agora) {padding-bottom:0}',
 '#tp-base .tb-d2 em{display:block;font:700 9px var(--mono,monospace);font-style:normal;letter-spacing:.12em;text-transform:uppercase;color:#5a3f2c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#tp-base .tb-d3{height:9px;margin:0;border-bottom:1px solid #9a7b4a;background:repeating-linear-gradient(90deg,#e6d3a6 0 22px,#d9c08c 22px 23px)}'
].join('\n');document.head.appendChild(st);})();

/* ======================= pacote do dia: Primeira flecha, Tracinhos da Cila, Sono por horário, Fogueira ======================= */
function dHoje(){return hoje();}
function dAmanha(){return gabMais(hoje(),1);}
function dHM(m){m=((m%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function dMin(s){if(!s||!/^\d{1,2}:\d{2}$/.test(s))return null;return +s.split(':')[0]*60+ +s.split(':')[1];}
function dToast(t,el){var d=document.createElement('div');d.className='d-toast';d.textContent=t;document.body.appendChild(d);
 if(el&&el.getBoundingClientRect){var r=el.getBoundingClientRect();d.style.left=Math.min(innerWidth-260,Math.max(10,r.left))+'px';d.style.top=(r.bottom+8)+'px';}
 setTimeout(function(){d.classList.add('on');},10);setTimeout(function(){d.classList.remove('on');setTimeout(function(){d.remove();},300);},2600);}
function dXP(n){try{var c=satCfg(),antes=satNivel(c.xp).n;c.xp+=n;var nv=satNivel(c.xp);if(nv.n>antes)setTimeout(function(){satToast('Subi para o nível '+nv.n+' · '+nv.nome+'. Isso é trabalho em equipe, cara.');},500);}catch(e){}}

/* ---------- 1. Primeira flecha ---------- */
function pfD(){var f=S.flecha;return f&&f.d===dHoje()&&f.t?f:null;}
function pfHTML(){var f=pfD();if(!f)return '<div class="pf-vz"><small>primeira flecha</small><span>escolha na Fogueira de hoje à noite</span></div>';
 if(f.ok)return '<div class="pf-ok"><small>primeira flecha</small><span>✓ '+esc(f.t)+'</span></div>';
 return '<div class="pf-on"><small>primeira flecha de hoje</small><b>'+esc(f.t)+'</b><div class="pf-bt"><button type="button" data-pf5>só 5 minutos</button><button type="button" data-pfok>acertei</button></div></div>';}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-pf5],[data-pfok]');if(!b)return;var f=pfD();if(!f)return;e.preventDefault();
 if(b.hasAttribute('data-pf5')){try{tdFocoIni(5,'Primeira flecha · '+f.t);}catch(z){}dToast('Cinco minutos. Só começar já vale.',b);}
 else{f.ok=1;try{anota('Primeira flecha acertada: '+esc(f.t)+'. +10 XP para o Sully.',0,false,true);}catch(z){}dXP(10);try{grava();}catch(z){}dToast('Flecha no alvo. +10 XP.',b);}
 try{opPinta();}catch(z){}try{pfTemplo();}catch(z){}},true);
/* no templo: placa logo acima do índice do dia, enquanto a flecha não for acertada */
function pfTemplo(){var f=pfD(),n=document.getElementById('pf-templo'),hb=document.getElementById('hero-box');if(!hb)return;
 if(!f||f.ok){if(n)n.remove();return;}
 if(!n){n=document.createElement('div');n.id='pf-templo';n.className='pf-templo';hb.insertAdjacentElement('beforebegin',n);}
 var h=pfHTML();if(n._h!==h||(h&&!n.firstChild)){n.innerHTML=h;n._h=h;}}

/* ---------- 4. Tracinhos da Cila ---------- */
function ciD(){S.cila=S.cila||{};var c=S.cila;c.dia=c.dia||{};return c;}
function ciHoje(){return (ciD().dia[dHoje()]||[]).length;}
function ciMarca(el){var c=ciD(),hj=dHoje(),a=opMin();(c.dia[hj]=c.dia[hj]||[]).push(a);
 Object.keys(c.dia).forEach(function(k){if(k<gabMais(hj,-42))delete c.dia[k];});try{grava();}catch(e){}
 var n=c.dia[hj].length,fr=['Tracinho anotado. Sem culpa: volta pro alvo.','Anotado. A Cila só ganha se você não voltar.','Desviou, percebeu, voltou. Isso é treino.','Mais um tracinho. Respira e retoma de onde parou.'];
 dToast(n+'º tracinho · '+fr[n%fr.length],el);try{opPinta();}catch(e){}try{satPinta();}catch(e){}}
function ciMapaHTML(){var c=ciD(),F=['06','09','12','15','18','21'],DS=['seg','ter','qua','qui','sex','sáb','dom'],M={},max=0,tot=0;
 Object.keys(c.dia).forEach(function(k){if(k<gabMais(dHoje(),-28))return;var wd=(new Date(k+'T12:00:00').getDay()+6)%7;c.dia[k].forEach(function(m){var fi=Math.max(0,Math.min(5,Math.floor((m-360)/180)));var key=wd+'|'+fi;M[key]=(M[key]||0)+1;if(M[key]>max)max=M[key];tot++;});});
 var g='<div class="ci-grid"><span></span>'+F.map(function(f){return '<span class="ci-h">'+f+'h</span>';}).join('');
 DS.forEach(function(d,wi){g+='<span class="ci-d">'+d+'</span>';F.forEach(function(f,fi){var v=M[wi+'|'+fi]||0;g+='<i style="--a:'+(max?(v/max):0).toFixed(2)+'" title="'+d+' '+f+'h · '+v+'">'+(v||'')+'</i>';});});g+='</div>';
 var top=Object.keys(M).sort(function(a,b){return M[b]-M[a];})[0],frase='Ainda sem tracinhos: toque em "desviei" no Posto, ou Alt+D, sempre que perceber que saiu do alvo.';
 if(top){var p=top.split('|');frase='Nas últimas 4 semanas, '+tot+' tracinho'+(tot>1?'s':'')+'. A Cila ataca mais '+['nas segundas','nas terças','nas quartas','nas quintas','nas sextas','nos sábados','nos domingos'][+p[0]]+' entre '+F[+p[1]]+'h e '+(+F[+p[1]]+3)+'h: vale pôr ali um bloco mais leve ou um antagonista.';}
 return '<div class="ci-mapa"><header><span class="sat-k">tracinhos da Cila</span><b>Onde a atenção escapa</b><small>hoje: '+ciHoje()+'</small></header>'+g+'<p>'+frase+'</p></div>';}
satPainelHTML=(function(f0){return function(){var h=f0.apply(this,arguments);return h.replace('<div class="cv-rec">',ciMapaHTML()+'<div class="cv-rec">');};})(satPainelHTML);
document.addEventListener('keydown',function(e){if(e.altKey&&(e.key==='d'||e.key==='D')){e.preventDefault();ciMarca(document.querySelector('#modo-op [data-cila]'));}});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-cila]');if(!b)return;e.preventDefault();ciMarca(b);},true);

/* ---------- Posto de comando: flecha no Escudo ---------- */
(function(){var p0=opPinta;opPinta=function(){p0.apply(this,arguments);var o=document.getElementById('modo-op');if(!o||!document.body.classList.contains('op-on'))return;
 var fc=o.querySelector('.op-foco'),hd=fc&&fc.querySelector(':scope > .op-cab');
 if(hd){var pf=fc.querySelector(':scope > .op-pflecha');if(!pf){pf=document.createElement('div');pf.className='op-pflecha';hd.insertAdjacentElement('afterend',pf);}var h=pfHTML();if(pf._h!==h||(h&&!pf.firstChild)){pf.innerHTML=h;pf._h=h;}}
 /* desviei e fogueira do topo: agora em opTopR (22) */
};})();

/* ---------- Sono: hora de deitar e de acordar no cartão do rodapé, com cálculo automático ---------- */
function snUlt(){var H=S.sonoHM||{},k=Object.keys(H).sort().pop();return k?H[k]:null;}
latRegHTML=(function(f0){var w=function(){var h=f0.apply(this,arguments),u=snUlt(),reg=S.sono&&S.sono[dHoje()]!==undefined;
 var d=(u&&u.d)||'23:30',a=(u&&u.a)||'07:00';
 var novo='<p>Que horas você deitou e acordou?</p><div class="sn-hm"><label>deitei<input type="time" data-sn="d" value="'+d+'"></label><label>acordei<input type="time" data-sn="a" value="'+a+'"></label></div>'+
  '<p class="sn-calc" data-sncalc>'+snTexto(d,a)+'</p>'+(reg?'<p class="sn-ja">sono de hoje já registrado: '+String(S.sono[dHoje()]).replace('.',',')+' h</p>':'<button type="button" class="cr-t" data-snok>registrar sono</button>');
 return h.replace(/<p>Horas dormidas na última noite<\/p><div class="cr-row">[\s\S]*?<\/div>/,novo);};w.aberto=f0.aberto;return w;})(latRegHTML);
function snHoras(d,a){var dm=dMin(d),am=dMin(a);if(dm==null||am==null)return null;var m=am-dm;if(m<=0)m+=1440;return m;}
function snTexto(d,a){var m=snHoras(d,a);if(m==null)return 'preencha os dois horários';var h=Math.round(m/3)/20;
 return '= <b>'+Math.floor(m/60)+'h'+String(m%60).padStart(2,'0')+'</b> de sono ('+String(h.toFixed(1)).replace('.',',')+' h)'+(m<360?' · abaixo de 6 h, pega leve hoje':m>=420?' · noite cheia':'');}
document.addEventListener('input',function(e){var i=e.target;if(!i||!i.dataset||!i.dataset.sn)return;var pop=i.closest('.cr-pop');if(!pop)return;
 var d=pop.querySelector('[data-sn="d"]').value,a=pop.querySelector('[data-sn="a"]').value,c=pop.querySelector('[data-sncalc]');if(c)c.innerHTML=snTexto(d,a);});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-snok]');if(!b)return;e.preventDefault();e.stopPropagation();var pop=b.closest('.cr-pop');
 var d=pop.querySelector('[data-sn="d"]').value,a=pop.querySelector('[data-sn="a"]').value,m=snHoras(d,a);if(m==null)return;
 var sd=document.getElementById('sn-d'),sa=document.getElementById('sn-a');if(!sd||!sa)return;sd.value=d;sa.value=a;
 try{latRegClica('#b-sonoh');latRegClica('#b-sono');}catch(z){var x=document.getElementById('b-sonoh');if(x)x.click();var y=document.getElementById('b-sono');if(y)y.click();}
 latRegHTML.aberto='';try{latRegPinta();}catch(z){}dToast('Sono registrado: '+String((Math.round(m/3)/20).toFixed(1)).replace('.',',')+' h.');},true);

/* ---------- 6. Fogueira: fechar o dia em um minuto ---------- */
function fgD(){S.fogueira=S.fogueira||{};return S.fogueira;}
function fgFeita(){return !!fgD()[dHoje()];}
function fgVenci(){var V=[],hj=dHoje();
 try{var D=satDia();if(D.feitos.length)V.push(D.feitos.length+' rito'+(D.feitos.length>1?'s':'')+' de '+D.H.length);if(D.min)V.push(D.min+' min de estudo');if(D.blocos)V.push(D.blocos+' bloco'+(D.blocos>1?'s':'')+' de foco');}catch(e){}
 try{var fh=0;gabResumo().forEach(function(r){fh+=r.fh;});if(fh)V.push(fh+' entrega'+(fh>1?'s':'')+' no gabinete');}catch(e){}
 try{var x=antHoje();if(x.st==='vencido')V.push('venceu '+antMonstro(x.m).n);}catch(e){}
 try{var f=pfD();if(f&&f.ok)V.push('acertou a primeira flecha');}catch(e){}
 try{var n=(S.log||[]).filter(function(l){return l.dia===hj&&!l.bad;}).length;if(n)V.push(n+' registro'+(n>1?'s':'')+' nos Anais');}catch(e){}
 return V;}
function fgFica(){var F=[];try{var D=satDia();if(D.pend.length)F.push(D.pend.length+' rito'+(D.pend.length>1?'s':'')+' ('+satLista(D.pend,2)+')');if(D.min<D.meta)F.push((D.meta-D.min)+' min de estudo');}catch(e){}
 try{gabResumo().forEach(function(r){if(r.rest)F.push(r.rest+' '+SAT_PAPEL[r.p][0]+' da pauta de '+gabDM(r.s.date));});}catch(e){}return F.slice(0,5);}
function fgSugestoes(){var S2=[];try{var R=gabResumo().filter(function(r){return r.rest;});if(R[0])S2.push((R[0].p==='minutar'?'Minutar ':'Corrigir ')+Math.max(1,Math.min(R[0].rest,R[0].meta||3))+' da pauta de '+gabDM(R[0].s.date));}catch(e){}
 try{var D=satDia();if(D.disc)S2.push('25 min de '+D.disc);if(D.pend[0])S2.push(D.pend[0].nome);}catch(e){}
 try{var c=(document.querySelector('#rail-in .rlist li:not(.rvz)')||{}).textContent;if(c)S2.push(c.trim().slice(0,60));}catch(e){}return S2.slice(0,4);}
var FG_BAU=[{t:'dr',v:15,n:'15 dracmas de ouro'},{t:'dr',v:30,n:'30 dracmas de ouro'},{t:'xp',v:20,n:'+20 XP para o Sully'},{t:'vale',n:'vale pausa longa: 30 minutos sem culpa amanhã'},{t:'vale',n:'vale episódio: um episódio de série sem contar como fuga'},{t:'dr',v:50,n:'50 dracmas: o baú veio cheio'}];
function fgAbre(){var d=document.getElementById('fg-dlg');if(!d){d=document.createElement('dialog');d.id='fg-dlg';d.className='ave-dlg fg-dlg';d.setAttribute('aria-label','Fogueira: fechar o dia');document.body.appendChild(d);
  d.addEventListener('click',function(e){var b=e.target.closest('button');if(!b){if(e.target===d)d.close();return;}
   if(b.dataset.fgsug){d.querySelector('#fg-flecha').value=b.dataset.fgsug;return;}
   if(b.hasAttribute('data-fgx')){d.close();return;}
   if(b.hasAttribute('data-fgok'))fgFecha(d);});}
 var V=fgVenci(),F=fgFica(),SG=fgSugestoes(),fx=S.flecha&&S.flecha.d===dAmanha()?S.flecha.t:'';
 d.innerHTML='<div class="ad-lista"><section class="fg-msg"><span class="fg-chama"></span><div><span class="ad-k">fogueira do chalé · '+new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})+'</span><b>Fechar o dia</b><small>um minuto, três toques, nenhuma culpa</small></div></section>'+
  '<div class="fg-bloco"><span class="ad-k">1 · venci</span>'+(V.length?'<ul class="fg-v">'+V.map(function(v){return '<li>'+esc(v)+'</li>';}).join('')+'</ul>':'<p class="fg-vz">Dia difícil também conta: você está aqui fechando.</p>')+'<input id="fg-mais" maxlength="90" placeholder="mais alguma vitória? (opcional)"></div>'+
  '<div class="fg-bloco"><span class="ad-k">2 · fica para amanhã</span>'+(F.length?'<ul class="fg-f">'+F.map(function(v){return '<li>'+esc(v)+'</li>';}).join('')+'</ul><p class="fg-nota">Continua tudo onde está. Amanhã é outro dia, não uma dívida.</p>':'<p class="fg-vz">Nada pendurado. Raro e merecido.</p>')+'</div>'+
  '<div class="fg-bloco"><span class="ad-k">3 · primeira flecha de amanhã</span><input id="fg-flecha" maxlength="80" placeholder="a primeira coisa que você vai fazer" value="'+esc(fx)+'">'+(SG.length?'<div class="fg-sug">'+SG.map(function(s){return '<button type="button" data-fgsug="'+esc(s)+'">'+esc(s)+'</button>';}).join('')+'</div>':'')+'</div></div>'+
  '<footer><button type="button" data-fgx>depois</button><button type="button" class="ad-ok" data-fgok>acender e abrir o baú</button></footer>';
 if(!d.open){try{d.showModal();}catch(e){d.setAttribute('open','');}}}
function fgFecha(d){var hj=dHoje(),V=fgVenci(),mais=(d.querySelector('#fg-mais').value||'').trim(),fl=(d.querySelector('#fg-flecha').value||'').trim();if(mais)V.push(mais);
 if(fl)S.flecha={d:dAmanha(),t:fl,ok:0};
 var p=FG_BAU[Math.floor(Math.random()*FG_BAU.length)];
 if(p.t==='dr'){var L=drD();L.bonus=(L.bonus|0)+p.v;}else if(p.t==='xp')dXP(p.v);else{S.vales=S.vales||[];S.vales.push({d:hj,n:p.n});}
 fgD()[hj]={v:V,f:fl,b:p.n};Object.keys(fgD()).forEach(function(k){if(k<gabMais(hj,-60))delete fgD()[k];});
 try{anota('Fogueira acesa. Venci: '+esc(V.join(', ')||'estar aqui')+'.'+(fl?' Primeira flecha de amanhã: '+esc(fl)+'.':'')+' Baú: '+esc(p.n)+'.',0,false,true);}catch(e){}
 try{grava();}catch(e){}try{drAplica();}catch(e){}
 d.querySelector('.ad-lista').innerHTML='<section class="fg-bau"><div class="fg-cofre"><i></i></div><span class="ad-k">o baú da fogueira</span><b>'+esc(p.n)+'</b>'+(fl?'<p>Amanhã cedo, a primeira flecha estará no seu escudo: <em>'+esc(fl)+'</em></p>':'<p>Sem flecha escolhida: amanhã o Sully te ajuda a decidir.</p>')+'<p class="fg-boa">Agora é tela longe e cama. Boa noite, Hékatos.</p></section>';
 d.querySelector('footer').innerHTML='<button type="button" class="ad-ok" data-fgx>boa noite</button>';
 try{opPinta();pinta();}catch(e){}}
drSaldo=(function(f0){return function(){return f0.apply(this,arguments)+(drD().bonus|0);};})(drSaldo);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-fogo]');if(!b)return;e.preventDefault();fgAbre();},true);
/* às 21h a fogueira se oferece sozinha, uma vez */
function fgConvida(){var hj=dHoje();if(fgFeita()||opMin()<21*60)return;S.fogConv=S.fogConv||'';if(S.fogConv===hj)return;S.fogConv=hj;try{grava();}catch(e){}fgAbre();}
setInterval(function(){try{fgConvida();}catch(e){}try{pfTemplo();}catch(e){}},60000);setTimeout(function(){try{fgConvida();pfTemplo();}catch(e){}},4500);
/* ======================= Antagonista integrado à Fogueira =======================
   Durante o dia, a carta só mostra o desafio e o "venci" (recompensa na hora). O veredito do dia (venci ou escapou),
   a carta de amanhã (virar, escolher o bloco, trocar 1×) e o registro no Bestiário moram na Fogueira. */
function antRegistra(x,d){x=x||antHoje();if(x.st!=='vencido'||x.best)return;var A=antD();A.best=A.best||{};var b=A.best[x.m]=A.best[x.m]||{n:0,dias:[]};
 b.n++;b.dias.push(d||hoje());if(b.dias.length>20)b.dias=b.dias.slice(-20);x.best=1;try{grava();}catch(e){}}
function antVence(){var x=antHoje();if(x.st!=='aberto')return;x.st='vencido';var m=antMonstro(x.m);
 try{var sc=satCfg(),antes=satNivel(sc.xp).n;sc.xp+=20;var nv=satNivel(sc.xp);anota('Antagonista vencido: '+m.n+' no bloco das '+x.fx+'h. +20 XP para o Sully.',0,false,true);
  if(nv.n>antes)setTimeout(function(){try{satToast('Subi para o nível '+nv.n+' · '+nv.nome+'. Você derrubou '+m.n+', cara!');}catch(z){}},400);}catch(e){}
 antRegistra(x);try{grava();}catch(e){}try{antPinta();opPinta();pinta();}catch(e){}}
function antFoge(){var x=antHoje();if(x.st!=='aberto')return;x.st='fugiu';try{anota('O '+antMonstro(x.m).n+' escapou hoje. Sem castigo: amanhã tem outro.',0,false,true);grava();}catch(e){}try{antPinta();opPinta();}catch(e){}}
function antSorteia(d){var A=antD(),x=A.dia[d];
 if(!x){var n=0;for(var i=0;i<d.length;i++)n=(n*31+d.charCodeAt(i))%9973;var m=ANTAG[n%ANTAG.length];if(m.k===(A.ult||''))m=ANTAG[(n+5)%ANTAG.length];
  x=A.dia[d]={fx:A.faixa,m:m.k,st:'aberto',rer:0,anun:0,fog:1};A.ult=m.k;try{grava();}catch(e){}}
 return x;}
function fgAntHTML(){var x=antHoje(),m=antMonstro(x.m),am=antSorteia(dAmanha()),ma=antMonstro(am.m),h1='',h2;
 if(x.st==='aberto')h1='<div class="fg-ant" id="fg-ant-hj"><p>O antagonista de hoje, <b>'+esc(m.n)+'</b> ('+esc(m.o)+', bloco das '+x.fx+'h), caiu?</p><div class="fg-sug"><button type="button" data-fgantv>venci · +20 XP</button><button type="button" data-fgantf>escapou</button></div></div>';
 else if(x.st==='fugiu')h1='<div class="fg-ant" id="fg-ant-hj"><p class="fg-nota">'+esc(m.n)+' escapou hoje. Sem castigo: amanhã tem outro.</p></div>';
 else h1='<div class="fg-ant" id="fg-ant-hj"></div>';
 var fx=(typeof TD_H!=='undefined'?TD_H:['06','09','12','15','18','21']).map(function(H){return '<button type="button" class="'+(am.fx===H?'on':'')+'" data-fgantfx="'+H+'">'+H+'h</button>';}).join('');
 h2='<div class="fg-bloco fg-ant" id="fg-ant-am"><span class="ad-k">4 · carta de amanhã</span>'+
  (am.vista?'<p><b>'+esc(ma.n)+'</b> · '+esc(ma.o)+'</p><p class="fg-nota"><em>desafio</em> '+esc(ma.d)+'</p><span class="ad-k">vai guardar o bloco</span><div class="fg-sug fg-antfx">'+fx+'</div>'+(am.rer<1?'<div class="fg-sug"><button type="button" data-fgantrer>sortear outra (1×)</button></div>':'')
   :'<button type="button" class="fg-verso" data-fgantvira><span>virar a carta</span></button>')+'</div>';
 return [h1,h2];}
function fgAntPinta(d){if(!d)return;var L=d.querySelector('.ad-lista');if(!L||L.querySelector('.fg-bau'))return;var h=fgAntHTML(),bl=L.querySelectorAll('.fg-bloco');
 var a=d.querySelector('#fg-ant-hj'),b=d.querySelector('#fg-ant-am'),t=document.createElement('div');
 t.innerHTML=h[0];var n1=t.firstChild;if(a)a.replaceWith(n1);else if(bl[0]){var mais=bl[0].querySelector('#fg-mais');bl[0].insertBefore(n1,mais||null);}
 t.innerHTML=h[1];var n2=t.firstChild;if(b)b.replaceWith(n2);else L.appendChild(n2);}
fgAbre=(function(f0){return function(){var r=f0.apply(this,arguments);var d=document.getElementById('fg-dlg');if(!d)return r;
 if(!d._ant){d._ant=1;d.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var c=b.dataset,am;
  if(c.fgantv!=null){antVence();}
  else if(c.fgantf!=null){antFoge();}
  else if(c.fgantvira!=null){am=antSorteia(dAmanha());am.vista=1;try{grava();}catch(z){}}
  else if(c.fgantfx){am=antSorteia(dAmanha());am.fx=c.fgantfx;antD().faixa=c.fgantfx;try{grava();}catch(z){}}
  else if(c.fgantrer!=null){am=antSorteia(dAmanha());if(am.rer<1){var i=ANTAG.findIndex(function(m){return m.k===am.m;}),j=(i+1+Math.floor(Math.random()*(ANTAG.length-1)))%ANTAG.length;am.m=ANTAG[j].k;am.rer=1;antD().ult=am.m;try{grava();}catch(z){}}}
  else return;
  /* o passo 1 lista as vitórias: refaz só ele quando o veredito muda */
  if(c.fgantv!=null){var bl=d.querySelector('.fg-bloco'),ul=bl&&bl.querySelector('ul.fg-v,.fg-vz'),V=fgVenci();if(ul){var n=document.createElement('ul');n.className='fg-v';n.innerHTML=V.map(function(v){return '<li>'+esc(v)+'</li>';}).join('');ul.replaceWith(n);}}
  fgAntPinta(d);});}
 try{fgAntPinta(d);}catch(e){}return r;};})(fgAbre);
fgFecha=(function(f0){return function(d){try{tbkTranca(dAmanha(),'fogueira');}catch(e){}var x=antHoje();if(x.st==='aberto')antFoge();var am=antSorteia(dAmanha());var r=f0.apply(this,arguments);
 try{antRegistra(x);grava();var bau=d.querySelector('.fg-bau');if(bau){var p=document.createElement('p');p.className='fg-ant-bau';
  p.innerHTML=(x.st==='vencido'?'A carta de <b>'+esc(antMonstro(x.m).n)+'</b> foi guardada no Bestiário. ':'')+'Amanhã, <b>'+esc(antMonstro(am.m).n)+'</b> guarda o bloco das '+am.fx+'h. A grade de amanhã está trancada.';
  bau.insertBefore(p,bau.querySelector('.fg-boa'));}}catch(e){}return r;};})(fgFecha);
/* no meio do dia: sem "escapou" (o veredito é na Fogueira); o venci fica, para a recompensa vir na hora */
antPinta=(function(f0){return function(){var r=f0.apply(this,arguments);try{antRegistra();var d=document.getElementById('ant-dlg');if(d){var f=d.querySelector('[data-antfuga]');if(f)f.remove();
 var ft=d.querySelector('footer');if(ft&&!ft.querySelector('.ant-fog')){var s=document.createElement('small');s.className='ant-fog';s.textContent='o veredito do dia e a carta de amanhã ficam na Fogueira';ft.insertBefore(s,ft.firstChild);}}}catch(e){}return r;};})(antPinta);
(function(){var st=document.createElement('style');st.id='fg-ant-css';st.textContent=[
 '.fg-dlg .fg-ant p{margin:4px 0;font:14px/1.45 Georgia,serif;color:#2a2418}',
 '.fg-dlg .fg-ant .fg-sug button.on{background:#2a2418!important;color:#f4ead2!important;border-color:#2a2418!important}',
 '.fg-dlg .fg-ant em{font:700 9px var(--mono,monospace);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:#9a6b3a}',
 '.fg-dlg .fg-verso{width:120px!important;height:160px;margin:4px 0!important;padding:0!important;border:0!important;border-radius:10px!important;cursor:pointer;display:grid;place-items:end center;',
 ' background:repeating-linear-gradient(45deg,rgba(212,173,79,.25) 0 6px,transparent 6px 12px),linear-gradient(160deg,#2b6b43,#123321)!important;box-shadow:0 0 0 2px #d4ad4f,0 0 0 4px #123321,0 6px 14px -6px rgba(0,0,0,.5)!important}',
 '.fg-dlg .fg-verso span{margin-bottom:12px;padding:4px 10px;border-radius:999px;background:#d4ad4f;font:700 9px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#1d2a10}',
 '.fg-dlg .fg-ant-bau{font:14px/1.45 Georgia,serif;color:#2a2418}',
 '.ant-dlg footer .ant-fog{flex:1;align-self:center;font:italic 12px Georgia,serif;color:#8a6f55}'
].join('\n');document.head.appendChild(st);})();
/* ---------- verso do Escudo: a criatura do dia e o que tira do alvo (desviei, travei, tarefa chata, ronda) ----------
   O Escudo (.op-col1) tem frente (foco) e verso; o botão "virar" troca e o lado fica guardado.
   A criatura: nome, o que ela representa, o desafio, o bloco e o estado; tocar abre o "venci / escapou".
   Embaixo, as três versões (grega, nórdica, egípcia): a escolhida vale em todos os temas (antEscolhe, no 30). */
var OP_VERSO=(function(){try{return localStorage.getItem('astro-escudo-verso')==='1';}catch(e){return false;}})();
function opVersoHTML(){var x=antHoje(),m=antMonstro(x.m),st=x.st,n=0,R={on:false,h:[]};try{n=ciHoje();}catch(e){}try{R=cxD().ronda||R;}catch(e){}
 var vs=['g','n','e'].map(function(v){var t=ANT_VAR[v][m.k];if(!t)return '';var on=antVar(m.k)===v;return '<button type="button" class="'+(on?'on':'')+'" data-antvar="'+m.k+'|'+v+'" title="'+esc(t[2])+'"><small>'+({g:'grega',n:'nórdica',e:'egípcia'})[v]+'</small>'+esc(t[0])+'</button>';}).join('');
 return '<span class="ov-k">verso do escudo · o que tira do alvo</span>'+
  '<button type="button" class="ov-ant'+(st!=='aberto'?' '+st:'')+'" data-ovant><i aria-hidden="true">'+esc(m.n.charAt(0))+'</i><span><small>criatura do dia · bloco das '+esc(x.fx)+'h'+(st==='vencido'?' · vencida':st==='fugiu'?' · escapou':'')+'</small><b>'+esc(m.n)+'</b><em>'+esc(m.o)+'</em><p>'+esc(m.d)+'</p></span></button>'+
  '<div class="ov-var"><span class="ov-k">a sua versão desta criatura · vale em todos os temas</span><div>'+vs+'</div></div>'+
  '<span class="op-pill op-pill-alvo" role="group" aria-label="desvios e travas">'+
  '<button type="button" class="op-cila" data-cila title="Desviei do alvo (Alt+D)">desviei <em>'+n+'</em></button>'+
  (n?'<button type="button" class="op-cila-menos" data-cilamenos title="tirar o último tracinho de hoje" aria-label="tirar o último tracinho de hoje">−</button>':'')+
  '<button type="button" class="cx-trv" data-cxa="trav">travei</button><button type="button" data-cxa="esc">tarefa chata</button>'+
  '<button type="button" class="cx-rdb" data-cxa="rd" title="horários da ronda">ronda <small>'+(R.on&&R.h.length?esc(R.h.join(' · ')):'desligada')+'</small></button></span>';}
function opVerso(){var c=document.querySelector('#modo-op .op-col1');if(!c)return;var v=c.querySelector(':scope>.op-verso'),b=c.querySelector(':scope>.op-vira');
 if(!v){v=document.createElement('div');v.className='op-verso';v.setAttribute('data-notr','');c.appendChild(v);}
 if(!b){b=document.createElement('button');b.type='button';b.className='op-vira';b.dataset.opvira='1';c.appendChild(b);}
 var cs=getComputedStyle(c);[['t','paddingTop'],['r','paddingRight'],['b','paddingBottom'],['l','paddingLeft']].forEach(function(x){var v=cs[x[1]];if(c.style.getPropertyValue('--ov-'+x[0])!==v)c.style.setProperty('--ov-'+x[0],v);});
 c.classList.toggle('ov-virado',OP_VERSO);var bh=OP_VERSO?'⟲ frente':'⟲ verso';if(b.textContent!==bh)b.textContent=bh;b.title=OP_VERSO?'voltar ao foco':'criatura do dia, desviei e travei';
 var h=opVersoHTML();if(v._h!==h){v.innerHTML=h;v._h=h;}}
opPinta=(function(f0){return function(){var r=f0.apply(this,arguments);try{opVerso();}catch(e){}return r;};})(opPinta);
antPinta=(function(f0){return function(){var r=f0.apply(this,arguments);try{opVerso();}catch(e){}return r;};})(antPinta);
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-opvira],[data-ovant],[data-antvar]');if(!t||!t.closest('#modo-op'))return;e.preventDefault();e.stopPropagation();
 if(t.dataset.opvira){OP_VERSO=!OP_VERSO;try{localStorage.setItem('astro-escudo-verso',OP_VERSO?'1':'0');}catch(z){}opVerso();return;}
 if(t.hasAttribute('data-ovant')){try{antAbre();}catch(z){}return;}
 var kv=t.dataset.antvar.split('|');antEscolhe(kv[0],kv[1]);},true);
(function(){var st=document.createElement('style');st.id='op-verso-css';var C='html body #modo-op .op-col1';st.textContent=[
 C+'{position:relative}',
 C+'.ov-virado>:not(.op-verso):not(.op-vira){visibility:hidden!important;pointer-events:none!important}',C+':not(.ov-virado)>.op-verso{display:none!important}',
 C+'>.op-vira{position:absolute;top:6px;right:8px;z-index:6;width:auto!important;height:24px;margin:0!important;padding:0 10px!important;border:1px solid #5a3f2c!important;border-radius:999px!important;background:#fffdf6!important;color:#5a3f2c!important;font:700 9.5px var(--mono,monospace)!important;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}',
 C+'>.op-vira:hover{background:#5a3f2c!important;color:#fffdf6!important}',
 C+'>.op-verso{position:absolute;z-index:5;top:var(--ov-t,84px);right:var(--ov-r,15px);bottom:var(--ov-b,48px);left:var(--ov-l,15px);display:flex;flex-direction:column;gap:7px;min-width:0;padding:2px 0 4px;box-sizing:border-box;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin}',
 C+' .ov-k{font:700 9px var(--mono,monospace);letter-spacing:.16em;text-transform:uppercase;color:#8a6f55}',
 C+' .ov-ant{all:unset;box-sizing:border-box;display:flex;gap:10px;align-items:flex-start;padding:10px;border-radius:14px;background:#2a2418;box-shadow:0 0 0 1px #c9a45a;color:#f4ead2;cursor:pointer}',
 C+' .ov-ant:hover{box-shadow:0 0 0 2px #e9c870}',
 C+' .ov-ant>i{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:linear-gradient(180deg,#3a5a6a,#1e3a44);box-shadow:0 0 0 1.5px #c9a45a;font:700 18px Georgia,serif;font-style:normal;color:#e9c870}',
 C+' .ov-ant>span{display:flex;flex-direction:column;gap:3px;min-width:0}',
 C+' .ov-ant small{font:700 8.5px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#e9c870}',
 C+' .ov-ant>span{flex:1}',C+' .ov-ant b{font:700 17px/1.1 Georgia,serif;overflow-wrap:anywhere}',C+' .ov-ant em{font:italic 13px Georgia,serif;opacity:.85}',C+' .ov-ant p{margin:3px 0 0;font:12px/1.35 var(--sans,system-ui);opacity:.9}',
 C+' .ov-ant.vencido{background:linear-gradient(160deg,#e2bd5c,#8a6a1e);color:#1d1406}',C+' .ov-ant.vencido small{color:#3a2a08}',C+' .ov-ant.fugiu{filter:grayscale(.8);opacity:.8}',
 C+' .ov-var>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;margin-top:5px}',
 C+' .ov-var button{all:unset;box-sizing:border-box;display:flex;flex-direction:column;gap:2px;padding:5px 8px;border-radius:9px;border:1px solid rgba(90,63,44,.35);background:#fffdf6;color:#2a2418;font:600 12px/1.15 Georgia,serif;cursor:pointer}',
 C+' .ov-var button small{font:700 8px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#8a6f55}',
 C+' .ov-var button.on{border-color:#2a2418;box-shadow:0 0 0 1px #2a2418;background:#f3e6c6}',
 C+' .op-verso .op-pill-alvo{display:flex;flex-wrap:wrap;gap:6px;height:auto;max-width:100%;border:0;border-radius:0;background:transparent;box-shadow:none;overflow:visible}',
 C+' .op-verso .op-pill-alvo>button{height:27px;border:1.5px solid #2e2620!important;border-radius:999px;background:#fffdf6}',
 C+' .op-verso .op-pill-alvo>.cx-trv{background:#2e2620;color:#fffdf6}',
 /* a criatura mora no verso do Escudo: sai o card do rodapé e o botão da linha */
 'body.op-on #mt-enc,#modo-op .op-antbt{display:none!important}'
].join('\n');document.head.appendChild(st);})();
/* no rodapé, ao lado dos Anais */
function fgRod(){var top=document.querySelector('#rod-apps .rod-top'),lg=document.getElementById('rod-log');if(!top||!lg)return;var b=document.getElementById('rod-fogo');
 if(!b){b=document.createElement('button');b.type='button';b.id='rod-fogo';b.className='rod-log rod-fogo';b.dataset.fogo='1';b.title='Fogueira: fechar o dia';}
 if(lg.nextSibling!==b)lg.insertAdjacentElement('afterend',b);var f=fgFeita(),h='<span class="cr-ico fg-ic"></span><span class="cr-lb"><small>fogueira</small><b>'+(f?'acesa ✓':'fechar o dia')+'</b></span>';if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}}
(function(){var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);try{fgRod();pfTemplo();}catch(e){}return x;};})();
setTimeout(function(){try{fgRod();}catch(e){}},1600);
/* o Sully lembra a primeira flecha */
satFala=(function(f0){return function(){var r=f0.apply(this,arguments),f=pfD();if(f&&!f.ok)r.t=r.t.replace(/^([^.]*\.)/,'$1 Primeira flecha: '+f.t+'.');return r;};})(satFala);
window.KALAMO.fogueira=fgAbre;window.KALAMO.cila=ciMarca;


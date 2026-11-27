/* ===== Envelope lacrado na capa e caderno com abas laterais, cantos de página e capa que abre ===== */
var EV_IC={
 sol:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="7"/><path d="M20 4v6M20 30v6M4 20h6M30 20h6M8.7 8.7l4.2 4.2M27.1 27.1l4.2 4.2M8.7 31.3l4.2-4.2M27.1 12.9l4.2-4.2"/></svg>',
 arco:'<svg viewBox="0 0 40 40"><path d="M10 5c14 4 18 26 0 30"/><path d="M10 5v30"/><path d="M6 20h28M29 16l5 4-5 4"/></svg>',
 ansuz:'<svg viewBox="0 0 40 40"><path d="M14 5v30M14 6l12 8M14 15l12 8"/></svg>',
 valknut:'<svg viewBox="0 0 40 40"><path d="M20 6l12 20H8z"/><path d="M14 14l12 20H2z" transform="translate(4 -2) scale(.8)"/><path d="M26 14l12 20H14z" transform="translate(-2 -2) scale(.8)"/></svg>',
 ankh:'<svg viewBox="0 0 40 40"><ellipse cx="20" cy="11" rx="6" ry="7"/><path d="M20 18v18M10 21h20"/></svg>',
 pena:'<svg viewBox="0 0 40 40"><path d="M28 4C16 8 12 20 12 34"/><path d="M28 4c-2 10-8 16-16 20M22 8l-7 3M25 14l-9 4"/></svg>'};
var EV_CFG=TV_ON?{cod:'VLH 1912',tag:['correspondência particular','corvos de Odin'],selos:[['ansuz','runa'],['valknut','']],carimbo:'CORVOS DE ODIN · BOSTON',
  dest:[['DEST.','Chase Maverick Duke'],['END.','Andar 19 · Hotel Valhala'],['REM.','Helgi · gerência do hotel']],
  capa:['saga do einherji','Diário de Bordo'],emb:'valknut'}
 :EG_ON?{cod:'BRK 2112',tag:['correspondência particular','correio de Thoth'],selos:[['ankh','selo'],['pena','']],carimbo:'CORREIO DE THOTH · BROOKLYN',
  dest:[['DEST.','Chase Maverick Duke'],['END.','Nomo 21 · Casa do Brooklyn'],['REM.','Amós Kane · Casa do Brooklyn']],
  capa:['papiro do iniciado','Diário de Papiro'],emb:'ankh'}
 :{cod:'CMS 0712',tag:['correspondência particular','correio de Íris'],selos:[['sol','selo'],['arco','']],carimbo:'CORREIO DE ÍRIS · LONG ISLAND',
  dest:[['DEST.','Chase Maverick Duke'],['END.','Chalé 7 · Acampamento Meio-Sangue'],['REM.','Quíron · Casa Grande']],
  capa:['diário do semideus','Caderno de Campo'],emb:'sol'};
function evCarimbo(t){return '<svg viewBox="0 0 132 74" aria-hidden="true"><defs><path id="evArc" d="M14 37a23 23 0 1 1 46 0a23 23 0 1 1 -46 0"/></defs>'+
 '<circle cx="37" cy="37" r="31" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2"/><circle cx="37" cy="37" r="19" fill="none" stroke="currentColor" stroke-width="1.4"/>'+
 '<text font-family="Courier New,monospace" font-size="6.6" font-weight="700" letter-spacing="1" fill="currentColor"><textPath href="#evArc">'+t+'</textPath></text>'+
 '<text x="37" y="40" text-anchor="middle" font-family="Courier New,monospace" font-size="8" font-weight="700" fill="currentColor">'+(new Date().getDate())+'·'+['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][new Date().getMonth()]+'</text>'+
 '<path d="M70 22c10-5 20 5 30 0s20-5 30 0M70 32c10-5 20 5 30 0s20-5 30 0M70 42c10-5 20 5 30 0s20-5 30 0M70 52c10-5 20 5 30 0s20-5 30 0" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';}
function evMonta(){var ci=document.querySelector('#lv .lv-capa-in');if(!ci||ci.dataset.ev)return;ci.dataset.ev='1';ci.classList.add('ev');var C=EV_CFG;
 function el(cls,html){var d=document.createElement('div');d.className=cls;d.setAttribute('data-notr','');d.innerHTML=html;return d;}
 ci.appendChild(el('ev-cod',C.cod));
 ci.appendChild(el('ev-selos',C.selos.map(function(s){return '<span class="ev-selo"><span>'+EV_IC[s[0]]+(s[1]?'<i>'+s[1]+'</i>':'')+'</span></span>';}).join('')));
 ci.appendChild(el('ev-carimbo',evCarimbo(C.carimbo)));
 var cf=document.getElementById('lv-cofre');
 if(cf)ci.insertBefore(el('ev-dest',C.dest.map(function(r){return '<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join('')),cf);
 var lac=ci.querySelector('.lv-lacre');if(lac&&(TV_ON||EG_ON)){var cs=TV_ON?['#b8423a','#7d1b1b','#3d0a0a','#f0c9a8']:['#4f86c9','#1f4e8c','#0c2547','#e9cf86'];
  var pts=[];for(var k=0;k<24;k++){var a=k/24*Math.PI*2,r=k%2?44:47.5;pts.push((50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1));}
  var ic=EV_IC[TV_ON?'valknut':'ankh'].replace(/^<svg[^>]*>|<\/svg>$/g,'');
  lac.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="evWax" cx="38%" cy="32%" r="75%"><stop offset="0%" stop-color="'+cs[0]+'"/><stop offset="55%" stop-color="'+cs[1]+'"/><stop offset="100%" stop-color="'+cs[2]+'"/></radialGradient></defs>'+
   '<polygon points="'+pts.join(' ')+'" fill="url(#evWax)"/><circle cx="50" cy="50" r="30" fill="none" stroke="'+cs[2]+'" stroke-opacity=".55" stroke-width="3"/><circle cx="50" cy="50" r="27" fill="none" stroke="'+cs[3]+'" stroke-opacity=".35" stroke-width="1"/>'+
   '<g transform="translate(30 30)" fill="none" stroke="'+cs[3]+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".9">'+ic+'</g></svg>';}
 if(lac){lac.title='abrir o lacre';lac.addEventListener('click',function(){var i=document.getElementById('cf-s1');if(i)i.focus();});}}
function evLivro(){var lv=document.getElementById('lv-livro');if(!lv||lv.dataset.ev)return;lv.dataset.ev='1';
 var seta={prev:'<svg viewBox="0 0 32 32"><path d="M26 9c-2 10-10 15-19 13"/><path d="M12 16l-6 6 7 4"/></svg>',prox:'<svg viewBox="0 0 32 32"><path d="M6 9c2 10 10 15 19 13"/><path d="M20 16l6 6-7 4"/></svg>'};
 var a=lv.querySelector('.lv-ant'),p=lv.querySelector('.lv-prox');if(a)a.innerHTML=seta.prev;if(p)p.innerHTML=seta.prox;
 var b=document.createElement('button');b.type='button';b.className='lv-fecha';b.setAttribute('data-notr','');b.textContent='fechar o diário';
 b.addEventListener('click',function(){var v=lv.querySelector('.lv-fo-bt');if(v)v.click();});lv.appendChild(b);}
function evCapaAbre(){var sp=document.getElementById('lv-spread');if(!sp||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var old=sp.querySelector('.lv-abre');if(old)old.remove();
 var d=document.createElement('div');d.className='lv-abre';d.setAttribute('data-notr','');
 var e=EV_IC[EV_CFG.emb].replace('<svg ','<svg stroke="currentColor" fill="none" stroke-width="1.4" ');
 d.innerHTML='<div class="lv-abre-in"><svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="2"><path d="M100 6L192 60 100 114 8 60z"/><path d="M100 18L172 60 100 102 28 60z" stroke-width="1"/><path d="M8 60h30M162 60h30" stroke-width="1.4"/>'+
  '<g transform="translate(76 36) scale(1.2)">'+e.replace(/^<svg[^>]*>|<\/svg>$/g,'')+'</g></svg><b>'+EV_CFG.capa[0]+'</b><i>'+EV_CFG.capa[1]+'</i></div>';
 sp.appendChild(d);d.addEventListener('animationend',function(){d.remove();});setTimeout(function(){if(d.parentNode)d.remove();},2200);}
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-fodiario]'))setTimeout(function(){evLivro();evCapaAbre();},30);},true);
(function(){function tenta(){evMonta();evLivro();}
 document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#fc-abre,[data-fcabre],.lt-logo'))setTimeout(tenta,60);},true);
 var lvE0=typeof lvEstado==='function'?lvEstado:null;
 if(lvE0)lvEstado=function(){var r=lvE0.apply(this,arguments);try{tenta();}catch(z){}return r;};
 setTimeout(tenta,1500);})();

/* a fichinha do campista (nome e chalé) sai: o botão dela abre o Guia do Campista */
acEditaCampista=function(){try{acGuia();}catch(e){}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.ac-medalha-bt,.ac-cracha-bt,#lat-topo .lt-logo');if(!b)return;e.preventDefault();e.stopPropagation();try{acGuia();}catch(z){}},true);
setInterval(function(){Array.prototype.forEach.call(document.querySelectorAll('.ac-medalha-bt,.ac-cracha-bt'),function(b){if(b.title!=='Guia do Campista')b.title='Guia do Campista';});},2000);
/* Em andamento não some quando o Mural se redesenha; nota, lista e foto na linha do Sincronizado */
var ORB_GUARDA=null;
(function(){var r0=vxRender;vxRender=function(){var w=document.getElementById('orb-mural');if(w){if(!ORB_GUARDA){ORB_GUARDA=document.createElement('div');ORB_GUARDA.hidden=true;document.body.appendChild(ORB_GUARDA);}ORB_GUARDA.appendChild(w);}
 var x=r0.apply(this,arguments);try{rodRearruma();}catch(e){}try{pinbarSobe();}catch(e){}return x;};})();
(function(){var q0=rodRearruma;rodRearruma=function(){if(!document.getElementById('orbp')){var o=document.createElement('div');o.className='orb';o.id='orbp';var w=document.getElementById('orb-mural');(w||document.body).appendChild(o);try{pintaOrb();}catch(e){}}
 return q0.apply(this,arguments);};})();
function pinbarSobe(){var nv=document.querySelector('#hero-box .vx-hero.bn2 .bn-tit #nv-chip'),bar=document.querySelector('#hero-box .vx-hero.bn2 .cp-pinbar');if(!nv||!bar)return;if(nv.nextElementSibling!==bar)nv.insertAdjacentElement('afterend',bar);}
setTimeout(function(){try{pinbarSobe();}catch(e){}},1200);setInterval(function(){try{pinbarSobe();}catch(e){}},1300);
(function(){var st=document.createElement('style');st.id='mural-linha-css';var R='html body:not(.zz9):not(.zz8) #hero-box#hero-box .vx-hero.bn2';st.textContent=[
 R+' #orb-mural{width:360px!important;max-width:none!important}',
 R+' .bn-tit>.cp-pinbar{display:inline-flex!important;flex-wrap:nowrap!important;align-items:center;gap:4px!important;margin:0 0 0 8px!important;padding:0!important;border:0!important;vertical-align:middle;position:static!important;transform:none!important}',
 R+' .bn-tit>.cp-pinbar>span{display:none!important}',
 R+' .bn-tit>.cp-pinbar>button{height:19px!important;min-height:0!important;padding:0 6px!important;font-size:10.5px!important;line-height:1!important}',
 R+' .bn-tit>.cp-pinbar{gap:3px!important;margin-left:6px!important}',
 R+' .bn-tit>.cp-pinbar::before,'+R+' .bn-tit>.cp-pinbar::after{display:none!important}',
 /* registros do diário: o × de apagar sempre à vista */
 'html body #rod-pan #rd-l .rd-x{opacity:.55!important;visibility:visible!important}',
 'html body #rod-pan #rd-l .rdi:hover .rd-x,html body #rod-pan #rd-l .rd-x:focus{opacity:1!important}'
 ].join('\n');document.head.appendChild(st);})();

/* botão próprio da Ficha e do Diário na faixa do nível */
function fcAbreJa(){try{if(typeof fcAbreDlg==='function'){fcAbreDlg();return;}}catch(z){}var b=document.getElementById('fc-abre');if(b)b.click();}
function fcTg(){var pt=document.getElementById('pt-tg');if(!pt||!pt.parentNode)return;var b=document.getElementById('fc-tg');
 if(!b){b=document.createElement('button');b.type='button';b.id='fc-tg';b.title=(typeof FO_CFG!=='undefined'?FO_CFG.t:'Ficha')+' e diário';b.setAttribute('aria-label',b.title);b.setAttribute('data-notr','');
  b.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M9 7h7M9 10.5h5"/></svg>';
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();fcAbreJa();});}
 if(b.previousElementSibling!==pt)pt.parentNode.insertBefore(b,pt.nextSibling);}
setTimeout(fcTg,800);setInterval(fcTg,2500);

/* placa do frontão e placa do painel direito como tábua de inscrição (tabula ansata) integrada ao templo, em todos os temas */
(function(){var st=document.createElement('style');st.id='placas-templo-css';
 var P=TV_ON?{k:'#a88750',k2:'#d4bd82',f:'linear-gradient(180deg,#2c4c47 0%,#203936 55%,#18302d 100%)',tx:'#e9d6a6',ac:'#fbeec6',sh:'rgba(8,18,16,.55)'}
  :EG_ON?{k:'#c9a23a',k2:'#e7c86e',f:'linear-gradient(180deg,#27508f 0%,#1e3a6e 55%,#172f5a 100%)',tx:'#f0dcaa',ac:'#fff4d2',sh:'rgba(8,16,40,.55)'}
  :{k:'#8a5a14',k2:'#c99a3d',f:'linear-gradient(180deg,#fdf6e3 0%,#f3e4bf 55%,#e8d4a4 100%)',tx:'#6b4413',ac:'#3b2a10',sh:'rgba(60,40,15,.35)'};
 var E=24,clip=function(e){return 'polygon(0 50%,'+e+'px 3px,'+e+'px 0,calc(100% - '+e+'px) 0,calc(100% - '+e+'px) 3px,100% 50%,calc(100% - '+e+'px) calc(100% - 3px),calc(100% - '+e+'px) 100%,'+e+'px 100%,'+e+'px calc(100% - 3px))';};
 var A='html body:not(.zz9):not(.zz8):not(.zz7) #hero-box#hero-box .neo-frontao .pd-pilula.pd-pilula.pil-placa',
  B='html body:not(.zz9):not(.zz8):not(.zz7) #tp-painel .tp-banda .tp-placa.tp-placa';
 var placa=function(S,e,h){return [
  S+'{isolation:isolate;box-sizing:border-box!important;height:'+h+'px!important;min-height:0!important;padding:0 '+(e+10)+'px!important;border:0!important;border-radius:0!important;background:'+P.k+'!important;box-shadow:none!important;outline:0!important;clip-path:'+clip(e)+';filter:drop-shadow(0 4px 6px '+P.sh+')}',
  S+'::before{content:""!important;display:block!important;position:absolute!important;inset:1.5px!important;z-index:-2!important;clip-path:'+clip(e-1)+';background:radial-gradient(circle at '+Math.round(e*.55)+'px 50%,'+P.k+' 0 2.2px,transparent 2.8px),radial-gradient(circle at calc(100% - '+Math.round(e*.55)+'px) 50%,'+P.k+' 0 2.2px,transparent 2.8px),'+P.f+'!important;border:0!important;transform:none!important;width:auto!important;height:auto!important}',
  S+'::after{content:""!important;display:block!important;position:absolute!important;top:4px!important;bottom:4px!important;left:'+(e+2)+'px!important;right:'+(e+2)+'px!important;z-index:-1!important;border:1px solid '+P.k2+'!important;box-shadow:inset 0 0 0 1px '+P.k+'33!important;background:none!important;border-radius:0!important;transform:none!important;width:auto!important;height:auto!important}'];};
 st.textContent=[].concat(
  placa(A,E,48),
  [A+' .tt-ic{color:'+P.tx+'!important;background:none!important;border:0!important;box-shadow:none!important}',
   A+' .tt-ic svg{stroke:'+P.tx+'!important;opacity:.9}',A+' .tt-ic:hover svg{stroke:'+P.ac+'!important;opacity:1}',
   A+' .bn-telas{border-color:'+P.k2+'!important}',
   A+' .bn-telas button{color:'+P.tx+'!important;opacity:.78;font-variant:small-caps!important;letter-spacing:.06em!important}',
   A+' .bn-telas button[aria-selected=true]{color:'+P.ac+'!important;opacity:1}',
   A+' .bn-telas i,'+A+' .pil-orn{color:'+P.k2+'!important}'],
  [B+'{isolation:auto;box-sizing:border-box!important;height:28px!important;min-height:0!important;margin:0!important;padding:0 16px!important;display:flex!important;align-items:center;gap:8px;clip-path:none!important;filter:none!important;border:1.5px solid '+P.k+'!important;border-radius:7px!important;background:'+P.f+'!important;box-shadow:0 0 0 2px '+(TV_ON?'#203936':EG_ON?'#1e3a6e':'#f4ead2')+',0 0 0 3px '+P.k2+',0 3px 6px -2px '+P.sh+'!important}',
   B+'::before,'+B+'::after{content:none!important;display:none!important}',
   B+' button{color:'+P.tx+'!important;opacity:.75;font-variant:small-caps!important;letter-spacing:.06em!important;background:none!important;border:0!important;box-shadow:none!important}',
   B+' button[aria-selected=true],'+B+' button[aria-pressed=true],'+B+' button.on{color:'+P.ac+'!important;opacity:1}',
   B+' i,'+B+' span[aria-hidden]{color:'+P.k2+'!important}',
   /* Em andamento: largura própria (não encolhe dentro do bloco do folheto) */
   'html body:not(.zz9):not(.zz8) #hero-box#hero-box .vx-hero.bn2 #orb-mural{flex:none!important;width:360px!important;max-width:none!important;align-self:flex-start}']
 ).join('\n');document.head.appendChild(st);})();
/* Em andamento: cada mudança fica no histórico (data, campo, valor); clicar no cartão abre o histórico inteiro */
document.addEventListener('change',function(e){var i=e.target;if(!i||!i.getAttribute||!i.hasAttribute('data-ob'))return;var k=i.getAttribute('data-ob'),v=(i.value||'').trim(),ant=((S.atu||{})[k]||'').trim();if(v===ant)return;
 S.atuH=S.atuH||[];S.atuH.push({k:k,v:v,ant:ant,em:new Date().toISOString()});if(S.atuH.length>600)S.atuH=S.atuH.slice(-600);setTimeout(function(){try{grava();}catch(z){}},50);},true);
function omHistAbre(){var d=document.getElementById('om-hist');
 if(!d){d=document.createElement('dialog');d.id='om-hist';d.className='om-hist';d.setAttribute('data-notr','');document.body.appendChild(d);
  d.addEventListener('click',function(e){if(e.target===d||e.target.closest('[data-omx]'))d.close();});}
 var nome={};ORB.forEach(function(o){nome[o[0]]=o[1];});var A=S.atu||{},H=(S.atuH||[]).slice().reverse();
 var dt=function(s){var x=new Date(s);return x.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'})+' · '+String(x.getHours()).padStart(2,'0')+'h'+String(x.getMinutes()).padStart(2,'0');};
 var cont={};(S.atuH||[]).forEach(function(h){cont[h.k]=(cont[h.k]||0)+1;});
 d.innerHTML='<header><div><span class="omh-k">em andamento</span><b>Histórico</b></div><button type="button" data-omx aria-label="fechar">×</button></header>'+
  '<section class="omh-agora">'+ORB.map(function(o){var u=null;for(var i=0;i<H.length;i++)if(H[i].k===o[0]){u=H[i];break;}
   return '<div><small>'+esc(o[1])+'</small><b>'+(A[o[0]]?esc(A[o[0]]):'—')+'</b><i>'+(u?'desde '+esc(dt(u.em)):'sem registro de data')+(cont[o[0]]?' · '+cont[o[0]]+' mudança'+(cont[o[0]]>1?'s':''):'')+'</i></div>';}).join('')+'</section>'+
  '<h5>linha do tempo</h5>'+(H.length?'<ol class="omh-l">'+H.map(function(h){return '<li><time>'+esc(dt(h.em))+'</time><span class="omh-c">'+esc(nome[h.k]||h.k)+'</span><span class="omh-v">'+(h.v?esc(h.v):'<em>limpou o campo</em>')+(h.ant?'<s>'+esc(h.ant)+'</s>':'')+'</span></li>';}).join('')+'</ol>':'<p class="omh-n">Ainda não há mudanças registradas. A partir de agora, cada vez que você trocar um campo do Em andamento, a troca entra aqui com data e hora.</p>');
 if(!d.open){if(d.showModal)d.showModal();else d.setAttribute('open','');}}
window.addEventListener('click',function(e){var c=e.target.closest&&e.target.closest('#orb-mural');if(!c||e.target.closest('input'))return;e.preventDefault();e.stopPropagation();omHistAbre();},true);

/* Panteão: escolher a imagem de fundo do painel inicial (Mural) de cada tema */
var FD_TEMAS=[['acampamento','Acampamento Meio-Sangue'],['valhala','Hotel Valhala'],['egito','Casa do Brooklyn']];
function fdTema(){return TV_ON?'valhala':EG_ON?'egito':'acampamento';}
function fdAplica(){var u=(S.fundos||{})[fdTema()]||'',st=document.getElementById('fundo-mural-css');
 if(!st){st=document.createElement('style');st.id='fundo-mural-css';document.head.appendChild(st);}
 var k=u?u.length+':'+u.slice(-40):'';if(st._k===k)return;st._k=k;
 st.textContent=u?'html body #hero-box#hero-box .vx-hero.bn2::before{background:url("'+u+'") center/cover no-repeat!important;opacity:.92!important;filter:none!important}':'';}
setTimeout(function(){try{fdAplica();}catch(e){}},1200);setInterval(function(){try{fdAplica();}catch(e){}},2500);
function fdHTML(){var F=S.fundos||{},at=fdTema();
 return '<section class="pt-fd"><div class="pt-fd-k">fundo do painel inicial · escolha uma imagem para cada tema</div><div class="pt-fd-g">'+FD_TEMAS.map(function(t){var u=F[t[0]];
  return '<div class="pt-fd-c'+(t[0]===at?' at':'')+'"><div class="pt-fd-img"'+(u?' style="background-image:url(\''+u+'\')"':'')+'>'+(u?'':'<span>padrão do tema</span>')+'</div><b>'+esc(t[1])+(t[0]===at?' · atual':'')+'</b>'+
   '<div class="pt-fd-ac"><button type="button" data-fdesc="'+t[0]+'">escolher imagem</button>'+(u?'<button type="button" data-fdpad="'+t[0]+'">voltar ao padrão</button>':'')+'</div></div>';}).join('')+
  '</div><input type="file" accept="image/*" hidden data-fdarq></section>';}
function fdPoe(){var w=document.getElementById('panteao');if(!w||!w.classList.contains('on'))return;var bx=w.querySelector('.pt-box');if(!bx)return;var s=bx.querySelector('.pt-fd'),h=fdHTML();
 if(s&&s._h===h)return;var n=document.createElement('div');n.innerHTML=h;var ns=n.firstChild;ns._h=h;if(s)s.replaceWith(ns);else{var bu=bx.querySelector('.pt-busca');if(bu)bu.insertAdjacentElement('beforebegin',ns);else bx.appendChild(ns);}}
(function(){var p0=panteaoAbre;panteaoAbre=function(){var r=p0.apply(this,arguments);try{fdPoe();}catch(e){}return r;};})();
setInterval(function(){try{fdPoe();}catch(e){}},1500);
var FD_ALVO='';
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#panteao [data-fdesc],#panteao [data-fdpad]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(b.dataset.fdpad){S.fundos=S.fundos||{};delete S.fundos[b.dataset.fdpad];try{grava();}catch(z){}fdAplica();fdPoe();return;}
 FD_ALVO=b.dataset.fdesc;var a=document.querySelector('#panteao [data-fdarq]');if(a)a.click();},true);
document.addEventListener('change',function(e){var a=e.target;if(!a||!a.matches||!a.matches('#panteao [data-fdarq]'))return;var f=a.files&&a.files[0];a.value='';if(!f||!FD_ALVO)return;var alvo=FD_ALVO;
 importar(f,1400,function(url){S.fundos=S.fundos||{};S.fundos[alvo]=url;try{grava();}catch(z){}fdAplica();fdPoe();});});
(function(){var st=document.createElement('style');st.id='om-hist-pt-fd-css';st.textContent=[
 '#om-hist{width:min(640px,94vw);max-height:86vh;padding:0;border:1.5px solid #8a5a14;border-radius:4px;background:#fbf5e6;color:#3b2a1d;box-shadow:0 0 0 3px #fbf5e6,0 0 0 4px #c99a3d,0 24px 60px -18px rgba(30,20,10,.6)}',
 '#om-hist::backdrop{background:rgba(30,20,10,.45)}',
 '#om-hist>header{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px;background:#fbf5e6;border-bottom:1px solid #c99a3d}',
 '#om-hist .omh-k{display:block;font:700 8.5px var(--mono,monospace);letter-spacing:.22em;text-transform:uppercase;color:#9a6b3a}',
 '#om-hist header b{font:700 20px Georgia,serif}',
 '#om-hist [data-omx]{all:unset;width:28px;height:28px;display:grid;place-items:center;border:1px solid #8a5a14;border-radius:50%;cursor:pointer;font:17px/1 Georgia,serif;color:#8a5a14}',
 '#om-hist [data-omx]:hover{background:#8a5a14;color:#fbf5e6}',
 '#om-hist .omh-agora{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:14px 18px 6px}',
 '#om-hist .omh-agora>div{padding:8px 10px;border:1px solid #d9c7a3;background:#fffaf0}',
 '#om-hist .omh-agora small{display:block;font:700 7.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#9a6b3a}',
 '#om-hist .omh-agora b{display:block;margin:2px 0;font:600 14px Georgia,serif;overflow-wrap:anywhere}',
 '#om-hist .omh-agora i{font:italic 10.5px Georgia,serif;color:#8a6f55}',
 '#om-hist h5{margin:10px 18px 4px;font:700 8.5px var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase;color:#9a6b3a}',
 '#om-hist .omh-l{list-style:none;margin:0;padding:0 18px 18px;display:flex;flex-direction:column}',
 '#om-hist .omh-l li{display:grid;grid-template-columns:130px 92px 1fr;gap:10px;align-items:baseline;padding:7px 0;border-bottom:1px dashed #d9c7a3}',
 '#om-hist .omh-l time{font:600 10px var(--mono,monospace);color:#8a6f55}',
 '#om-hist .omh-c{font:700 8px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#9a6b3a}',
 '#om-hist .omh-v{font:14px Georgia,serif;overflow-wrap:anywhere}#om-hist .omh-v s{margin-left:8px;font-size:12px;color:#a08b6c}',
 '#om-hist .omh-n{margin:0 18px 18px;font:italic 13px Georgia,serif;color:#8a6f55}',
 '#orb-mural{cursor:pointer}#orb-mural input{cursor:text}',
 '#panteao .pt-fd{padding:10px 12px 12px;border:1px solid #d8c8a6;border-radius:10px;background:#fffdf7}',
 '#panteao .pt-fd-k{margin-bottom:8px;font:700 9px var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase;color:#9a6b3a}',
 '#panteao .pt-fd-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
 '#panteao .pt-fd-c{display:flex;flex-direction:column;gap:6px}',
 '#panteao .pt-fd-c.at .pt-fd-img{outline:2px solid #8a5a14;outline-offset:2px}',
 '#panteao .pt-fd-img{height:92px;border:1px solid #c9b28a;border-radius:6px;background:repeating-linear-gradient(45deg,#f4ead2 0 8px,#efe2c2 8px 16px) center/cover;display:grid;place-items:center}',
 '#panteao .pt-fd-img span{font:italic 12px Georgia,serif;color:#8a6f55}',
 '#panteao .pt-fd-c b{font:600 13px Georgia,serif}',
 '#panteao .pt-fd-ac{display:flex;gap:6px;flex-wrap:wrap}',
 '#panteao .pt-fd-ac button{all:unset;cursor:pointer;padding:4px 10px;border:1px solid #8a5a14;border-radius:999px;font:700 8.5px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#5a3a10}',
 '#panteao .pt-fd-ac button:hover{background:#8a5a14;color:#fbf5e6}'
 ].join('\n');document.head.appendChild(st);})();
/* ===== Companhia II: escudeiro de tarefa chata, botão "travei" (com a ponte entre blocos), ronda do sidekick e fogueira acompanhada ===== */
var CX_SK=TV_ON?{nm:'Brynn',o:'a'}:EG_ON?{nm:'Toby',o:'o'}:{nm:'Sully',o:'o'};
var CX_FIO=(typeof TRIO_NM!=='undefined'&&TRIO_NM[2])?TRIO_NM[2][2].split(' · ')[0]:'Fio de Ariadne';
function cxD(){var o=opx();o.cx=o.cx||{};var c=o.cx;c.listas=c.listas||{};
 if(!c.ronda||typeof c.ronda!=='object')c.ronda={h:['10:30','15:00','17:30'],on:true,log:{}};c.ronda.log=c.ronda.log||{};
 var lim=diaStr(hojeN()-14);Object.keys(c.ronda.log).forEach(function(d){if(d<lim)delete c.ronda.log[d];});return c;}
var CX_PRE=[
 ['Louça',['juntar tudo na pia','só os copos','só os talheres','só os pratos','as panelas','secar e guardar','passar um pano na pia']],
 ['Roupa',['juntar a roupa num cesto','separar claras e escuras','pôr na máquina','estender','dobrar só as camisetas','guardar o resto']],
 ['Quarto',['lixo num saco','roupa no cesto','copos e pratos para a cozinha','uma superfície limpa','outra superfície','cama arrumada']],
 ['Papelada',['juntar os papéis numa pilha','jogar fora o óbvio','separar: pagar, arquivar, ler','resolver um do "pagar"','arquivar o resto']],
 ['Caixa de entrada',['apagar o óbvio','arquivar o que não pede ação','responder o que leva menos de 2 min','anotar o resto como tarefa']],
 ['Compras',['ver o que falta','fazer a lista','separar por seção','pedir ou ir','guardar tudo']]];
var CX_ESC_F=['Só essa. A próxima eu seguro.','Feito vale mais que perfeito.','Isso. Carimbado.','Mais uma e a gente respira.','Você já passou da metade do caminho mais difícil: começar.','Não precisa gostar. Só precisa ir.','Uma de cada vez. Eu conto as outras.'];
var CX_HUM=['inteiro','cansado','agitado','pra baixo','orgulhoso'];
var CX={m:null,p:null,st:{},tm:null};
function cxAv(h){var a='';try{a=satAvatar(h||'calmo');}catch(e){}return '<span class="cx-av">'+a+'</span>';}
function cxMMSS(s){s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function cxEl(){var w=document.getElementById('cx');if(w)return w;w=document.createElement('div');w.id='cx';w.setAttribute('role','dialog');w.setAttribute('aria-modal','true');w.setAttribute('aria-label','Companhia');w.setAttribute('data-notr','');document.body.appendChild(w);
 w.addEventListener('click',function(e){cxClick(e);});
 w.addEventListener('keydown',function(e){if(e.key==='Escape'){cxFecha();return;}if(e.key==='Enter'&&e.target.matches('input[data-cxok]')){e.preventDefault();var b=w.querySelector('[data-cx="'+e.target.getAttribute('data-cxok')+'"]');if(b)b.click();}});
 w.addEventListener('input',function(e){var t=e.target;if(t.name)CX.st[t.name]=t.type==='checkbox'?t.checked:t.value;});
 w.addEventListener('change',function(e){var t=e.target;if(t.name)CX.st[t.name]=t.type==='checkbox'?t.checked:t.value;});
 return w;}
function cxAbre(m,p,st){CX.m=m;CX.p=p;CX.st=st||{};cxTimer(0);var w=cxEl();w.classList.add('on');cxPinta();
 setTimeout(function(){var i=w.querySelector('input:not([type=checkbox]),textarea');if(i)try{i.focus({preventScroll:true});}catch(e){}},60);}
function cxFecha(){var w=document.getElementById('cx');if(w)w.classList.remove('on');cxTimer(0);try{op2Ruido(false);}catch(e){}CX.m=null;}
function cxVai(p,extra){CX.p=p;if(extra)for(var k in extra)CX.st[k]=extra[k];cxTimer(0);cxPinta();
 setTimeout(function(){var w=document.getElementById('cx'),i=w&&w.querySelector('input:not([type=checkbox]),textarea');if(i)try{i.focus({preventScroll:true});}catch(e){}},60);}
/* cronômetro regressivo (seg) ou progressivo (seg<0 = só relógio) */
function cxTimer(seg,fim){clearInterval(CX.tm);CX.tm=null;if(!seg)return;CX.st.t0=Date.now();CX.st.dur=seg;
 CX.tm=setInterval(function(){var w=document.getElementById('cx');if(!w||!w.classList.contains('on')){clearInterval(CX.tm);return;}
  var el=w.querySelector('.cx-big[data-cxrel]'),pas=(Date.now()-CX.st.t0)/1000;
  if(seg<0){if(el)el.textContent=cxMMSS(pas);return;}
  var r=seg-pas;if(el)el.textContent=cxMMSS(r);if(r<=0){clearInterval(CX.tm);CX.tm=null;try{navigator.vibrate&&navigator.vibrate(200);}catch(e){}if(fim)fim();}},250);}
function cxAtual(){try{return op2Atual()||null;}catch(e){return null;}}
function cxDiario(t){try{anota(esc(t),0,false,true);}catch(e){}try{grava();}catch(e){}}
function cxXP(){try{satXP();}catch(e){}}
function cxBt(k,t,pri){return '<button type="button" data-cx="'+k+'"'+(pri?' class="cx-pri"':'')+'>'+t+'</button>';}
function cxFrame(kick,fala,corpo,bots,hum){
 return '<div class="cx-bx"><div class="cx-sk">'+cxAv(hum)+'<div class="cx-bl"><small>'+esc(CX_SK.nm)+'</small><span>'+esc(fala)+'</span></div></div>'+
  '<span class="cx-k">'+kick+'</span>'+corpo+'<div class="cx-bt">'+bots+'</div></div>'+
  '<button type="button" class="cx-x" data-cx="sair" aria-label="fechar">×</button>'+
  '<button type="button" class="cx-ruido'+((typeof op2Ruido!=='undefined'&&op2Ruido.s)?' on':'')+'" data-cx="ruido">ruído marrom</button>';}
function cxPinta(){var w=cxEl(),m=CX.m,p=CX.p,s=CX.st,h='';
 /* ---------- escudeiro ---------- */
 if(m==='esc'&&p==='ini'){var L=cxD().listas,pre=CX_PRE.concat(Object.keys(L).filter(function(n){return !CX_PRE.some(function(x){return x[0]===n;});}).map(function(n){return [n,L[n]];}));
  h=cxFrame('tarefa chata · escudeiro','Qual é a chata de hoje? Eu parto em migalhas e a gente vai uma por vez.',
   '<div class="cx-chips">'+pre.map(function(x,i){return '<button type="button" data-cxpre="'+i+'">'+esc(x[0])+'</button>';}).join('')+'</div>'+
   '<input name="nome" maxlength="60" placeholder="ou escreva a tarefa" value="'+esc(s.nome||'')+'">'+
   '<textarea name="lista" rows="5" placeholder="migalhas, uma por linha (opcional: sem lista, eu parto em cinco)">'+esc(s.lista||'')+'</textarea>',
   cxBt('escgo','começar',1)+cxBt('sair','agora não'));
  w._pre=pre;}
 else if(m==='esc'&&p==='vai'){var n=s.L.length,i=s.i;
  h=cxFrame('tarefa chata · '+esc(s.nome),CX_ESC_F[i%CX_ESC_F.length],
   '<span class="cx-pos">migalha '+(i+1)+' de '+n+'</span><b class="cx-t cx-t-g">'+esc(s.L[i])+'</b>'+
   '<div class="cx-selos">'+s.L.map(function(x,j){return '<i class="'+(s.f[j]===1?'ok':s.f[j]===2?'pul':j===i?'at':'')+'" title="'+esc(x)+'"></i>';}).join('')+'</div>'+
   '<span class="cx-big cx-mini" data-cxrel>'+cxMMSS((Date.now()-(s.ini||Date.now()))/1000)+'</span>',
   cxBt('escok','feito',1)+cxBt('escpula','pular')+cxBt('escfim','parar aqui · já valeu'),i>=n-1?'festa':'calmo');}
 else if(m==='esc'&&p==='fim'){var ok=s.f.filter(function(x){return x===1;}).length,min=Math.max(1,Math.round((Date.now()-s.ini)/60000));
  h=cxFrame('tarefa domada',ok===s.L.length?'Tudo. Do começo ao fim. Isso merece registro.':'Parou na hora certa. O que foi feito, foi feito.',
   '<b class="cx-t">'+esc(s.nome)+'</b><span class="cx-big cx-mini">'+ok+'/'+s.L.length+'</span><p class="cx-p">'+min+' min · entrou no diário de bordo</p>',
   cxBt('esc0','outra tarefa')+cxBt('sair','fechar',1),'festa');}
 /* ---------- travei ---------- */
 else if(m==='trav'&&p==='ini'){var it=cxAtual();
  h=cxFrame('travei · sem castigo','Travou? Normal. Me diz o que está pegando'+(it?' com '+it.t:'')+'.',
   '<div class="cx-op">'+[['tr1','não sei por onde começar','o menor gesto e cinco minutos'],['trgr','a tarefa é grande demais','eu parto em migalhas'],['pt1','acabei de trocar de tarefa','a ponte: guardar, respirar, seguir'],['nv1','cabeça embaçada','três minutos de pausa guiada']].map(function(x){return '<button type="button" data-cx="'+x[0]+'"><b>'+x[1]+'</b><small>'+x[2]+'</small></button>';}).join('')+'</div>',
   cxBt('sair','já passou'),'alerta');}
 else if(m==='trav'&&p==='gesto'){var it2=s.tarefa?null:cxAtual(),ps=it2?((opx().passo||{})[it2.k]||''):'';if(s.gesto==null)s.gesto=ps;
  h=cxFrame('travei · o menor gesto','Qual é o menor gesto possível? Não o trabalho: só o gesto.',
   (it2?'<b class="cx-t">'+esc(it2.t)+'</b>':'<input name="tarefa" maxlength="80" placeholder="qual tarefa?" value="'+esc(s.tarefa||'')+'">')+
   '<input name="gesto" data-cxok="tr2" maxlength="80" placeholder="ex.: abrir o arquivo" value="'+esc(s.gesto||'')+'">'+
   '<div class="cx-chips">'+['abrir o arquivo','ler só o título','escrever uma frase feia','separar o material','pôr o fone'].map(function(x){return '<button type="button" data-cxgesto="'+esc(x)+'">'+esc(x)+'</button>';}).join('')+'</div>',
   cxBt('tr2','só 5 minutos',1)+cxBt('trav0','voltar'));}
 else if(m==='trav'&&p==='cinco'){
  h=cxFrame('travei · cinco minutos','Cinco minutos de lado. Depois disso pode parar: já valeu.',
   (s.gesto?'<b class="cx-t">'+esc(s.gesto)+'</b>':'')+'<span class="cx-big" data-cxrel>'+cxMMSS(300)+'</span>',
   cxBt('tr3','parar · valeu'),'calmo');}
 else if(m==='trav'&&p==='depois'){
  h=cxFrame('travei · cinco minutos feitos','Pronto, a pedra saiu do lugar. Segue ou para, as duas valem.',
   '<b class="cx-t">'+esc(s.gesto||'cinco minutos')+'</b>',
   cxBt('trbloco','continuar · bloco de '+op2Dur()+' min',1)+cxBt('tr2','mais 5')+cxBt('sair','parar · valeu'),'festa');}
 /* ponte entre blocos */
 else if(m==='trav'&&p==='ponte1'){var it3=cxAtual();
  h=cxFrame('ponte · '+esc(CX_FIO),'Antes de largar a anterior: onde você parou? Uma linha basta, eu guardo.',
   '<input name="ant" maxlength="70" placeholder="a tarefa anterior" value="'+esc(s.ant||'')+'">'+
   '<input name="onde" data-cxok="pt2" maxlength="140" placeholder="onde parei e qual o próximo passo" value="'+esc(s.onde||'')+'">',
   cxBt('pt2','guardar e seguir',1)+cxBt('pt2s','pular')+cxBt('trav0','voltar'));}
 else if(m==='trav'&&p==='ponte2'){
  h=cxFrame('ponte · água e de pé','Levanta, bebe água, olha para longe. Trinta segundos.',
   '<span class="cx-big" data-cxrel>00:30</span>',cxBt('pt3','pronto',1),'calmo');}
 else if(m==='trav'&&p==='ponte3'){var it4=cxAtual(),ps4=it4?((opx().passo||{})[it4.k]||''):'';
  h=cxFrame('ponte · o próximo',it4?'Agora é esse. Só o primeiro gesto.':'Qual é o próximo? Escolhe um e eu fico junto.',
   (it4?'<b class="cx-t">'+esc(it4.t)+'</b>'+(ps4?'<p class="cx-p">passo 1: '+esc(ps4)+'</p>':''):'<input name="tarefa" maxlength="80" placeholder="o próximo bloco" value="'+esc(s.tarefa||'')+'">'),
   cxBt('tr1','começar com 5 minutos',1)+cxBt('trbloco','começar o bloco')+cxBt('sair','fechar'));}
 /* névoa */
 else if(m==='trav'&&p==='nevoa'){var N=['água: um copo inteiro','janela ou ar: três respirações fundas','olhos fechados: inspira 4, solta 6','ombros soltos, mandíbula solta'],k=Math.min(N.length-1,Math.floor(((Date.now()-(s.t0||Date.now()))/1000)/45));
  h=cxFrame('névoa · pausa guiada','Três minutos. Não precisa pensar em nada: eu conto.',
   '<b class="cx-t" data-cxnv>'+esc(N[k])+'</b><span class="cx-big" data-cxrel>03:00</span>',cxBt('tr1','já clareou',1)+cxBt('trav0','voltar'),'calmo');}
 /* ---------- ronda: horários ---------- */
 else if(m==='rd'){var R=cxD().ronda,np=(window.Notification?Notification.permission:'');
  h=cxFrame('ronda d'+CX_SK.o+' '+esc(CX_SK.nm),'Eu passo nos horários marcados e pergunto onde você está. Três toques, nenhum sermão.',
   '<input name="horas" data-cxok="rdok" maxlength="80" value="'+esc(s.horas!=null?s.horas:R.h.join(', '))+'" placeholder="10:30, 15:00, 17:30">'+
   '<label class="cx-ck"><input type="checkbox" name="liga"'+((s.liga!=null?s.liga:R.on)?' checked':'')+'> ronda ligada</label>'+
   (np&&np!=='granted'&&np!=='denied'?'<button type="button" class="cx-lk" data-cx="rdnot">avisar também com notificação do navegador</button>':''),
   cxBt('rdok','guardar',1)+cxBt('sair','fechar'));}
 /* ---------- fogueira acompanhada ---------- */
 else if(m==='fog'){var V=[],F=[],SG=[];try{V=fgVenci();F=fgFica();SG=fgSugestoes();}catch(e){}
  var passo={'1':1,'2':2,'3':3,'4':4,'5':5}[p]||1,kk='fogueira acompanhada · '+passo+' de 5';
  if(passo===1)h=cxFrame(kk,'Antes de apagar o dia: o que você venceu? Dia difícil também conta.',
   (V.length?'<ul class="cx-ul">'+V.map(function(v){return '<li>'+esc(v)+'</li>';}).join('')+'</ul>':'<p class="cx-p">Você está aqui fechando o dia. Isso já é vitória.</p>')+
   '<textarea name="mais" rows="2" maxlength="300" placeholder="mais alguma vitória? (opcional)">'+esc(s.mais||'')+'</textarea>',cxBt('fg2','seguir',1)+cxBt('sair','depois'),'festa');
  else if(passo===2)h=cxFrame(kk,'O que travou hoje? Sem castigo: é só para saber onde mexer amanhã.',
   (F.length?'<p class="cx-p">ficou para amanhã: '+esc(F.slice(0,4).join(' · '))+'</p>':'')+
   '<textarea name="trav" rows="3" maxlength="400" placeholder="o que travou (opcional)">'+esc(s.trav||'')+'</textarea>',cxBt('fg3','seguir',1)+cxBt('fg1','voltar'),'calmo');
  else if(passo===3)h=cxFrame(kk,'Como você está chegando ao fim do dia?',
   '<div class="cx-chips">'+CX_HUM.map(function(x){return '<button type="button" data-cxhum="'+x+'"'+(s.hum===x?' class="on"':'')+'>'+x+'</button>';}).join('')+'</div>'+
   '<input name="humt" maxlength="140" placeholder="uma linha sobre isso (opcional)" value="'+esc(s.humt||'')+'">',cxBt('fg4','seguir',1)+cxBt('fg2','voltar'),'calmo');
  else if(passo===4){if(s.flecha==null)s.flecha=(S.flecha&&S.flecha.d===dAmanha())?S.flecha.t:'';
   h=cxFrame(kk,'Qual é a primeira flecha de amanhã? Só uma.',
   '<input name="flecha" data-cxok="fg5" maxlength="80" placeholder="a primeira coisa que você vai fazer" value="'+esc(s.flecha||'')+'">'+
   (SG.length?'<div class="cx-chips">'+SG.map(function(x){return '<button type="button" data-cxfl="'+esc(x)+'">'+esc(x)+'</button>';}).join('')+'</div>':''),cxBt('fg5','seguir',1)+cxBt('fg3','voltar'),'calmo');}
  else{var tem=!!S.cofre,aberto=!!(typeof CF!=='undefined'&&CF.chave);if(s.bordo==null)s.bordo=true;if(s.jor==null)s.jor=aberto;
   h=cxFrame(kk,'Fogueira pronta. Toque de recolher às 23h30: telas para baixo, eu fico de guarda.',
   '<label class="cx-ck"><input type="checkbox" name="bordo"'+(s.bordo?' checked':'')+'> guardar no diário de bordo</label>'+
   (tem?'<label class="cx-ck"><input type="checkbox" name="jor"'+(s.jor?' checked':'')+'> guardar também no diário, no Registro do dia (cifrado)</label>'+
    (aberto?'':'<input type="password" name="senha" data-cxok="fgok" placeholder="senha da ficha (só se marcar o diário)" autocomplete="current-password">'):'<p class="cx-p">Para guardar no diário cifrado, crie a senha na Ficha.</p>')+
   '<span class="cx-msg" data-cxmsg></span>',cxBt('fgok','acender a fogueira',1)+cxBt('fg4','voltar'),'festa');}}
 if(w._h!==h){w.innerHTML=h;w._h=h;}}
async function cxFogFecha(){var s=CX.st,V=[];try{V=fgVenci();}catch(e){}
 if(s.jor&&S.cofre&&!(CF&&CF.chave)){var sn=s.senha||'';try{var k=await cfDeriva(sn,cfU8(S.cofre.sal));if(await cfDecifra(S.cofre.chk,k)!=='hekatos')throw 0;CF.chave=k;}catch(e){var m=document.querySelector('#cx [data-cxmsg]');if(m)m.textContent='Senha incorreta. Corrija ou desmarque o diário.';return;}}
 var tx='Venci: '+(V.concat(s.mais?[s.mais]:[]).join('; ')||'estar aqui fechando o dia')+(s.trav?'\nTravou: '+s.trav:'')+((s.hum||s.humt)?'\nComo cheguei: '+[s.hum,s.humt].filter(Boolean).join(' · '):'')+(s.flecha?'\nAmanhã, primeira flecha: '+s.flecha:'');
 if(s.jor&&CF&&CF.chave){try{var o=await cfCifra(tx),n=new Date(),P=rgPer('dia');o.tp='dia';o.per=P.k;o.em=n.toLocaleDateString('pt-BR')+' · '+String(n.getHours()).padStart(2,'0')+'h'+String(n.getMinutes()).padStart(2,'0');o.rot=o.em;S.dsd=S.dsd||[];S.dsd.push(o);try{rgPinta('dia');}catch(e){}}catch(e){}}
 if(s.bordo){var nt=[s.trav?'Travou: '+s.trav:'',(s.hum||s.humt)?'Cheguei '+[s.hum,s.humt].filter(Boolean).join(' · '):''].filter(Boolean).join('. ');if(nt)try{anota(esc(nt),0,false,true);}catch(e){}}
 try{grava();}catch(e){}
 cxFecha();try{fgAbre();var d=document.getElementById('fg-dlg');if(d){var a=d.querySelector('#fg-mais'),b=d.querySelector('#fg-flecha');if(a)a.value=s.mais||'';if(b)b.value=s.flecha||'';
   if(!s.bordo){var a0=anota;anota=function(){};try{fgFecha(d);}finally{anota=a0;}}else fgFecha(d);}}catch(e){}
 cxXP();}
function cxClick(e){var b=e.target.closest('button');if(!b)return;var s=CX.st,k=b.getAttribute('data-cx');
 if(b.hasAttribute('data-cxpre')){var x=(cxEl()._pre||[])[+b.getAttribute('data-cxpre')];if(x){s.nome=x[0];s.lista=x[1].join('\n');cxPinta();}return;}
 if(b.hasAttribute('data-cxgesto')){s.gesto=b.getAttribute('data-cxgesto');cxPinta();return;}
 if(b.hasAttribute('data-cxhum')){s.hum=s.hum===b.getAttribute('data-cxhum')?'':b.getAttribute('data-cxhum');cxPinta();return;}
 if(b.hasAttribute('data-cxfl')){s.flecha=b.getAttribute('data-cxfl');cxPinta();return;}
 if(!k)return;
 if(k==='sair'){cxFecha();return;}
 if(k==='ruido'){try{var on=!op2Ruido.s;op2Ruido(on);b.classList.toggle('on',on);}catch(z){}return;}
 /* escudeiro */
 if(k==='esc0'){CX.m='esc';cxVai('ini',{nome:'',lista:''});return;}
 if(k==='escgo'){var nome=(s.nome||'').trim()||'tarefa chata',L=(s.lista||'').split('\n').map(function(x){return x.trim();}).filter(Boolean);
  if(!L.length)L=['separar o que precisa','a primeira parte','a segunda parte','o que sobrou','conferir e guardar'];
  if(!CX_PRE.some(function(x){return x[0]===nome&&x[1].join('\n')===L.join('\n');})){var LS=cxD().listas;LS[nome]=L;var ks=Object.keys(LS);if(ks.length>12)delete LS[ks[0]];try{grava();}catch(z){}}
  cxVai('vai',{nome:nome,L:L,i:0,f:[],ini:Date.now()});cxTimer(-1);return;}
 if(k==='escok'||k==='escpula'){s.f[s.i]=k==='escok'?1:2;if(s.i>=s.L.length-1){cxEscFim();return;}s.i++;cxPinta();cxTimer(-1);return;}
 if(k==='escfim'){cxEscFim();return;}
 /* travei */
 if(k==='trav0'){CX.m='trav';cxVai('ini');return;}
 if(k==='tr1'){CX.m='trav';cxVai('gesto');return;}
 if(k==='trgr'){var it=cxAtual();CX.m='esc';cxVai('ini',{nome:it?it.t:'',lista:''});return;}
 if(k==='tr2'){var g=(s.gesto||'').trim();var it2=cxAtual();if(g&&it2){try{opx().passo[it2.k]=g;}catch(z){}}
  cxVai('cinco');cxTimer(300,function(){cxDiario('Travei e fiz 5 minutos de lado'+(g?': '+g:'')+'.');cxVai('depois');});return;}
 if(k==='tr3'){cxDiario('Travei e fiz um pedaço dos 5 minutos'+(s.gesto?': '+s.gesto:'')+'.');cxFecha();return;}
 if(k==='trbloco'){var it3=cxAtual(),rot=(it3&&it3.t)||(s.tarefa||'').trim()||s.gesto||'bloco acompanhado';cxFecha();try{tdFocoIni(op2Dur(),rot,-1);}catch(z){}try{pinta();}catch(z){}return;}
 if(k==='pt1'){CX.m='trav';var a=cxAtual();cxVai('ponte1',{ant:s.ant||(a?a.t:'')});return;}
 if(k==='pt2'||k==='pt2s'){if(k==='pt2'&&(s.onde||'').trim()){S.pc=S.pc||{ret:[],plat:[],cred:[],qr:[],reg:[]};S.pc.ret=(S.pc.ret||[]).concat({o:(s.ant||'tarefa anterior').trim(),d:s.onde.trim(),data:hoje()});cxDiario(CX_FIO+': '+(s.ant||'tarefa anterior')+' — '+s.onde.trim());}
  cxVai('ponte2');cxTimer(30,function(){cxVai('ponte3');});return;}
 if(k==='pt3'){cxVai('ponte3');return;}
 if(k==='nv1'){CX.m='trav';cxVai('nevoa',{t0:Date.now()});var N=['água: um copo inteiro','janela ou ar: três respirações fundas','olhos fechados: inspira 4, solta 6','ombros soltos, mandíbula solta'];
  cxTimer(180,function(){cxVai('gesto');});var iv=setInterval(function(){var w=document.getElementById('cx'),el=w&&w.querySelector('[data-cxnv]');if(!el||CX.p!=='nevoa'){clearInterval(iv);return;}el.textContent=N[Math.min(N.length-1,Math.floor((Date.now()-s.t0)/45000))];},1000);return;}
 /* ronda */
 if(k==='rdnot'){try{Notification.requestPermission().then(function(){cxPinta();});}catch(z){}return;}
 if(k==='rdok'){var R=cxD().ronda,hs=String(s.horas!=null?s.horas:R.h.join(',')).split(/[,;\s]+/).map(function(x){var m=x.match(/^(\d{1,2})(?:[:h](\d{2}))?$/);return m?String(+m[1]).padStart(2,'0')+':'+(m[2]||'00'):'';}).filter(function(x){return x&&x<'24';});
  R.h=hs.filter(function(x,i){return hs.indexOf(x)===i;}).sort();R.on=s.liga!=null?!!s.liga:R.on;try{grava();}catch(z){}cxFecha();cxRondaPinta();return;}
 /* fogueira */
 if(/^fg[1-5]$/.test(k)){CX.m='fog';cxVai(k.slice(2));return;}
 if(k==='fgok'){cxFogFecha();return;}}
function cxEscFim(){var s=CX.st,ok=s.f.filter(function(x){return x===1;}).length;cxTimer(0);
 cxDiario('Escudeiro: '+s.nome+' — '+ok+' de '+s.L.length+' migalhas.');if(ok)cxXP();CX.p='fim';cxPinta();}

/* ---------- ronda: o sidekick passa nos horários e pergunta onde você está ---------- */
function cxRondaHoje(){var R=cxD().ronda,d=hoje();R.log[d]=R.log[d]||{};return R.log[d];}
function cxRondaVence(){var R=cxD().ronda;if(!R.on||!R.h.length)return null;var n=new Date(),hm=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0'),L=cxRondaHoje();
 if(CX.snz&&Date.now()>=CX.snz.t&&!CX.snz.mostrou)return {h:CX.snz.h,volta:1};
 for(var i=R.h.length-1;i>=0;i--){var h=R.h[i];if(hm>=h){var lim=op2HM(op2Min(h)+40);if(hm<lim&&!L[h])return {h:h};break;}}return null;}
function cxRondaPinta(){var r=cxRondaVence(),t=document.getElementById('cx-ronda');
 if(!r){if(t&&!t.classList.contains('resp'))t.remove();return;}
 if(!t){t=document.createElement('div');t.id='cx-ronda';t.setAttribute('role','alertdialog');t.setAttribute('data-notr','');document.body.appendChild(t);
  t.addEventListener('click',function(e){var b=e.target.closest('[data-rd]');if(!b)return;var v=b.getAttribute('data-rd'),h=t.getAttribute('data-h');
   if(v==='cfg'){cxAbre('rd',null,{});return;}
   var L=cxRondaHoje();L[h]=v;try{grava();}catch(z){}
   if(v==='pausa'){CX.snz={h:h,t:Date.now()+10*60000};}else if(CX.snz&&CX.snz.h===h)CX.snz=null;
   if(v==='bloco'||v==='voltei'){cxXP();t.classList.add('resp');t.querySelector('.rd-q').textContent=v==='voltei'?'Bem-vindo de volta. Segue comigo.':'Isso. Segue, eu volto mais tarde.';t.querySelector('.rd-bt').innerHTML='';setTimeout(function(){t.remove();},3500);return;}
   if(v==='pausa'){t.classList.add('resp');t.querySelector('.rd-q').textContent='Pausa de 10 minutos. Eu chamo.';t.querySelector('.rd-bt').innerHTML='';setTimeout(function(){t.remove();},3500);return;}
   if(v==='desviei'){t.remove();cxAbre('trav','ini');}});}
 if(t.classList.contains('resp'))return;
 var hk=(r.volta?'v':'')+r.h;if(t._k===hk)return;t._k=hk;t.setAttribute('data-h',r.h);if(r.volta)CX.snz.mostrou=1;
 t.innerHTML='<div class="rd-av">'+cxAv(r.volta?'calmo':'alerta')+'</div><div class="rd-c"><small>ronda das '+r.h+' · '+esc(CX_SK.nm)+'</small><span class="rd-q">'+(r.volta?'Fim da pausa. Volta comigo?':'Onde você está agora?')+'</span>'+
  '<div class="rd-bt">'+(r.volta?'<button type="button" data-rd="voltei" class="cx-pri">voltei</button><button type="button" data-rd="desviei">travei</button>':
   '<button type="button" data-rd="bloco" class="cx-pri">no bloco</button><button type="button" data-rd="desviei">desviei</button><button type="button" data-rd="pausa">pausa</button>')+'</div></div>'+
  '<button type="button" class="rd-cfg" data-rd="cfg" title="horários da ronda" aria-label="horários da ronda">⚙</button>';
 if(document.hidden&&window.Notification&&Notification.permission==='granted'){try{new Notification(CX_SK.nm+' · ronda das '+r.h,{body:r.volta?'Fim da pausa. Volta comigo?':'Onde você está agora?',tag:'astro-ronda'});}catch(z){}}}
setInterval(function(){try{cxRondaPinta();}catch(e){}},20000);setTimeout(function(){try{cxRondaPinta();}catch(e){}},4000);

/* ---------- onde ficam os botões ---------- */
satPainelHTML=(function(f0){return function(){var h=f0.apply(this,arguments),R=cxD().ronda;
 return h+'<div class="cx-sat"><span>ronda d'+CX_SK.o+' '+esc(CX_SK.nm)+': <b>'+(R.on&&R.h.length?esc(R.h.join(' · ')):'desligada')+'</b></span><button type="button" data-cxa="rd">horários</button><button type="button" data-cxa="esc">tarefa chata</button><button type="button" data-cxa="trav">travei</button></div>';};})(satPainelHTML);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-cxa]');if(b){e.preventDefault();e.stopPropagation();var a=b.getAttribute('data-cxa');cxAbre(a,a==='rd'?null:'ini',{});return;}
 var f=e.target.closest&&e.target.closest('[data-fgcx]');if(f){e.preventDefault();e.stopPropagation();var d=document.getElementById('fg-dlg');if(d&&d.open)d.close();cxAbre('fog','1',{});}},true);
fgAbre=(function(f0){return function(){var r=f0.apply(this,arguments);var d=document.getElementById('fg-dlg'),ft=d&&d.querySelector('footer');
 if(ft&&!ft.querySelector('[data-fgcx]')){var b=document.createElement('button');b.type='button';b.className='fg-cx';b.setAttribute('data-fgcx','');b.setAttribute('data-notr','');b.textContent='fazer com '+CX_SK.o+' '+CX_SK.nm;ft.insertBefore(b,ft.firstChild);}
 return r;};})(fgAbre);


/* ===== O friso do Toque da Concha abre o "Hoje": a linha do dia (concha, agenda e grade) com caixa para virar toque, as missões e tarefas do dia e os próximos compromissos ===== */
var HOJE_ABERTO=(function(){try{return localStorage.getItem('astro_hoje_pan')!=='0';}catch(e){return true;}})();
function hojeItens(){var hj=hoje(),it=[],R=rtD();
 R.toques.forEach(function(t,i){it.push({m:rtMin(t.h),h:t.h,t:t.n,k:'concha',ti:i,on:!!t.on});});
 try{agDoDia(hj).forEach(function(x){if(x.dia)it.push({m:-1,h:'dia todo',t:x.t,k:'agenda'});else it.push({m:x.ini.getHours()*60+x.ini.getMinutes(),h:agHora(x),t:x.t+(x.loc?' · '+x.loc:''),k:'agenda'});});}catch(e){}
 try{rtGradeHoje().forEach(function(x){it.push({m:x.m,h:x.h,t:x.t,k:'grade'});});}catch(e){}
 var vis={};it=it.filter(function(x){if(x.k==='concha')return true;var k=x.h+'|'+x.t;var dup=R.toques.some(function(t){return t.h===x.h&&t.n===x.t;});if(dup||vis[k])return false;vis[k]=1;return true;});
 it.forEach(function(x){if(x.k!=='concha')x.on=false;});
 it.sort(function(p,q){return p.m-q.m;});return it;}
function hojeHTML(){var hj=hoje(),a=rtAgora(),it=hojeItens(),Q=mmD(),fe=Q.feitas[hj]||[],P=plDia(hj),lig=false;try{lig=!!agIcsUrl();}catch(e){}
 var ck=function(on,attr,tit){return '<button type="button" class="hj-ck'+(on?' on':'')+'" '+attr+' aria-pressed="'+on+'" title="'+tit+'">'+(on?'✓':'')+'</button>';};
 var marc=false,l1=it.map(function(x){var ag='';if(!marc&&x.m>a){marc=true;ag='<li class="hj-agora"><span>agora · '+String(Math.floor(a/60)).padStart(2,'0')+':'+String(a%60).padStart(2,'0')+'</span></li>';}
  var pode=x.m>=0;return ag+'<li class="hj-'+x.k+(x.m>=0&&x.m<a?' passou':'')+'">'+(pode?ck(x.on,x.k==='concha'?'data-hjt="'+x.ti+'"':'data-hjadd="'+esc(x.h)+'" data-hjn="'+esc(x.t)+'"',x.on?'é toque da concha · desmarcar':'marcar como toque da concha'):'<i class="hj-ck0"></i>')+'<b>'+esc(x.h)+'</b><span>'+esc(x.t)+'</span><em>'+(x.k==='concha'?'concha':x.k==='grade'?'grade':'agenda')+'</em></li>';}).join('')+(marc?'':'<li class="hj-agora"><span>agora</span></li>');
 var tm=[];(P.top||[]).forEach(function(t,i){if((t.t||'').trim())tm.push('<li class="'+(t.ok?'ok':'')+'">'+ck(!!t.ok,'data-hjtop="'+i+'"','missão do dia')+'<span>'+esc(t.t)+'</span><em>missão</em></li>');});
 Q.dia.forEach(function(q){var ok=fe.indexOf(q.id)>=0;tm.push('<li class="'+(ok?'ok':'')+'">'+ck(ok,'data-hjq="'+esc(q.id)+'"','diária')+'<span>'+esc(q.t)+'</span><em>diária</em></li>');});
 Q.chale.filter(function(c){return !c.ok||c.ok===hj;}).forEach(function(c){var ok=!!c.ok;tm.push('<li class="'+(ok?'ok':'')+'">'+ck(ok,'data-hjch="'+esc(c.id)+'"','tarefa')+'<span>'+esc(c.t)+'</span><em>tarefa</em></li>');});
 return '<section class="hj-c hj-dia"><header><span>hoje · '+new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'short'})+'</span><small>a caixa vira toque da concha</small></header><ol>'+l1+'</ol></section>'+
  '<section class="hj-c hj-mis"><header><span>missões e tarefas do dia</span><small>'+tm.length+'</small></header>'+(tm.length?'<ul>'+tm.join('')+'</ul>':'<p class="hj-n">Nada marcado para hoje.</p>')+'</section>'+
  '<section class="hj-c hj-prox"><header><span>compromissos · próximos dias</span></header>'+(lig?agListaHTML(10):'<p class="hj-n">Ligue a Agenda Google no rodapé para os compromissos aparecerem aqui e na Grade.</p>')+'</section>';}
function hojePinta(){var bl=document.getElementById('tp-friso-bloco'),fz=document.getElementById('tp-friso');if(!bl||!fz)return;var hj=bl.querySelector('.cb-hoje');if(!hj)return;
 hj.classList.add('hj-grade');hj.hidden=!HOJE_ABERTO;fz.classList.toggle('hj-aberto',HOJE_ABERTO);if(!HOJE_ABERTO)return;var h=hojeHTML();if(hj._hj!==h){hj._hj=h;hj._h=h;hj.innerHTML=h;}}
function hojeRepinta(){try{grava();}catch(e){}try{tpFriso();}catch(e){}try{diaPinta();}catch(e){}try{var p=document.getElementById('tp-painel');if(p){p._h='';p4Painel();}}catch(e){}try{var b=document.getElementById('rt-box');if(b)b.innerHTML=rtHTML();}catch(e){}hojePinta();}
document.addEventListener('click',function(e){var fz=e.target.closest&&e.target.closest('#tp-friso-bloco > #tp-friso');
 if(fz){if(e.target.closest('.tf-leg b'))return;e.preventDefault();e.stopPropagation();HOJE_ABERTO=!HOJE_ABERTO;try{localStorage.setItem('astro_hoje_pan',HOJE_ABERTO?'1':'0');}catch(z){}hojePinta();return;}
 var b=e.target.closest&&e.target.closest('#tp-friso-bloco .hj-grade .hj-ck');if(!b)return;e.preventDefault();e.stopPropagation();var d=b.dataset,R=rtD(),hj=hoje(),Q=mmD();
 if(d.hjt!=null){var t=R.toques[+d.hjt];if(t)t.on=!t.on;}
 else if(d.hjadd!=null){var ex=R.toques.filter(function(t){return t.h===d.hjadd&&t.n===d.hjn;})[0];if(ex)ex.on=!ex.on;else R.toques.push({h:d.hjadd,n:d.hjn,on:true});}
 else if(d.hjtop!=null){var x=plDia(hj).top[+d.hjtop];if(x)x.ok=!x.ok;}
 else if(d.hjq!=null){var fe=Q.feitas[hj]=Q.feitas[hj]||[],ix=fe.indexOf(d.hjq);if(ix>=0)fe.splice(ix,1);else{fe.push(d.hjq);try{op2XP(5,e);}catch(z){}}}
 else if(d.hjch!=null){var c=Q.chale.filter(function(y){return y.id===d.hjch;})[0];if(c){if(c.ok)c.ok=false;else{c.ok=hj;try{op2XP(3,e);}catch(z){}}}}
 try{mmSalva();}catch(z){}hojeRepinta();},true);
compRodHTML=(function(c0){return function(){if(document.getElementById('tp-friso-bloco')&&!document.body.classList.contains('tela-prog'))return hojeHTML();return c0.apply(this,arguments);};})(compRodHTML);
(function(){var t0=tpFriso;tpFriso=function(){var r=t0.apply(this,arguments);try{hojePinta();}catch(e){}return r;};})();
setTimeout(function(){try{hojePinta();}catch(e){}},1700);setInterval(function(){try{hojePinta();}catch(e){}},2500);
(function(){var st=document.createElement('style');st.id='hoje-pan-css';var k=TV_ON?'#5a3c22':EG_ON?'#1e3a6e':'#8a5a14',k2=TV_ON?'#7a5c12':EG_ON?'#c9a23a':'#b0561e',bg=TV_ON?'#f5ebd6':EG_ON?'#f7ecd2':'#fbf5e6';
 st.textContent=[
 'html body.tela-prog div.wrap>div.tb #comp-rod{display:none!important}',
 '#tp-friso-bloco>#tp-friso .tf-leg::after{content:"▾ hoje";margin-left:8px;font:700 9px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:'+k2+'}',
 '#tp-friso-bloco>#tp-friso.hj-aberto .tf-leg::after{content:"▴ hoje"}',
 'html body #tp-friso-bloco .cb-hoje.hj-grade{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr) minmax(0,.8fr);gap:0;max-height:300px;overflow:hidden;padding:0!important}',
 '#tp-friso-bloco .cb-hoje.hj-grade[hidden]{display:none!important}',
 'html body #tp-friso-bloco .cb-hoje.hj-grade>.hj-c{padding:10px 14px 12px!important;overflow-y:auto;max-height:300px;scrollbar-width:thin;box-sizing:border-box;min-width:0}',
 '#tp-friso-bloco .hj-grade .hj-c{min-width:0;padding:10px 14px 12px;overflow-y:auto;max-height:300px;scrollbar-width:thin;box-sizing:border-box}',
 '#tp-friso-bloco .hj-grade .hj-c+.hj-c{border-left:1px dashed '+k+'}',
 '#tp-friso-bloco .hj-grade header{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin:0 0 6px;padding-bottom:5px;border-bottom:1px solid '+k+'}',
 '#tp-friso-bloco .hj-grade header span{font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:'+k2+'}',
 '#tp-friso-bloco .hj-grade header small{font:italic 10.5px Georgia,serif;color:#8a6f55}',
 '#tp-friso-bloco .hj-grade ol,#tp-friso-bloco .hj-grade ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:3px}',
 '#tp-friso-bloco .hj-grade li{display:grid;grid-template-columns:20px 44px minmax(0,1fr) auto;align-items:center;gap:6px;font:13px var(--sans,system-ui);color:#2a2418}',
 '#tp-friso-bloco .hj-grade .hj-mis li{grid-template-columns:20px minmax(0,1fr) auto}',
 '#tp-friso-bloco .hj-grade li b{font:700 12px var(--mono,monospace);color:#3b2a1d}',
 '#tp-friso-bloco .hj-grade li span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
 '#tp-friso-bloco .hj-grade li em{font:700 7.5px var(--mono,monospace);font-style:normal;letter-spacing:.1em;text-transform:uppercase;color:#9a8a70}',
 '#tp-friso-bloco .hj-grade li.passou{opacity:.5}#tp-friso-bloco .hj-grade li.ok span{text-decoration:line-through;opacity:.6}',
 '#tp-friso-bloco .hj-grade .hj-agora{display:block}#tp-friso-bloco .hj-grade .hj-agora span{display:block;font:700 8px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#b4463a;border-top:1px solid #b4463a;padding-top:2px;margin:2px 0}',
 '#tp-friso-bloco .hj-grade .hj-ck{display:grid!important;place-items:center;width:18px!important;height:18px!important;min-height:0!important;margin:0!important;padding:0!important;border:1.5px solid '+k+'!important;border-radius:4px!important;background:#fffaf0!important;color:#fff!important;font:700 11px/1 system-ui!important;cursor:pointer;box-shadow:none!important}',
 '#tp-friso-bloco .hj-grade .hj-ck.on{background:'+k+'!important}',
 '#tp-friso-bloco .hj-grade .hj-ck0{display:block;width:18px}',
 '#tp-friso-bloco .hj-grade .hj-n{margin:0;font:italic 12px Georgia,serif;color:#6b5140}',
 '@media(max-width:1100px){html body #tp-friso-bloco .cb-hoje.hj-grade{grid-template-columns:1fr}#tp-friso-bloco .hj-grade .hj-c+.hj-c{border-left:0;border-top:1px dashed '+k+'}}'
].join('\n');document.head.appendChild(st);})();

/* Registro rápido com o mesmo rodapé-base do painel direito: degrau estreito em cima, pedra em gradiente, preso no pé do painel de borda a borda */
(function(){var st=document.createElement('style');st.id='trio-base-css';var T='html body #lat-e>#lat-trio#lat-trio';st.textContent=[
 T+'{position:sticky!important;bottom:0!important;z-index:22;margin:12px -12px 0!important;width:auto!important;max-width:none!important;padding:9px 12px 10px!important;border:1px solid #9a7b4a!important;border-bottom:0!important;border-top:1px solid #9a7b4a!important;border-radius:0!important;background:linear-gradient(180deg,#efe0bb,#e2cc98)!important;box-shadow:none!important;overflow:visible}',
 T+'::before{content:"";position:absolute;left:8px;right:8px;top:-8px;height:7px;border:1px solid #9a7b4a;border-bottom:0;background:linear-gradient(180deg,#efe0bb,#e6d3a6)}',
 T+' .tr-cab small{color:#7a4a20!important}',
 T+' .tr-ic{background:#f4ead2!important;border-color:#9a7b4a!important}',
 'body.tv '+T+',body.tv '+T+'::before{border-color:#6e4426!important;background:linear-gradient(180deg,#e9dfcc,#d8c9ad)!important}',
 'body.eg '+T+',body.eg '+T+'::before{border-color:#c9a23a!important;background:linear-gradient(180deg,#f4e4c0,#e6cf9e)!important}'
].join('\n');document.head.appendChild(st);})();

/* ===== Placa do frontão: Finanças · Projetos · Enfermaria | telas | Concurso · Instruções · Eumátheia (os três abrem como painéis próprios, mesmo morando no Laptop) ===== */
var EU_BTS=[['conc','Concurso · edital, provas e ciclo','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v3h3M9 10h6M9 13h6M9 16h3"/><circle cx="16" cy="17" r="2.2"/></svg>','Concurso'],
 ['inst','Instruções · idiomas e aprendizado','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z"/><path d="M20 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z"/><path d="M6.5 13l1.8-5 1.8 5M7 11.5h2.6"/></svg>','Instruções'],
 ['ler','Eumátheia · estante de leitura','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6c3-1.5 6-1.5 9 0v13c-3-1.5-6-1.5-9 0z"/><path d="M21 6c-3-1.5-6-1.5-9 0v13c3-1.5 6-1.5 9 0z"/></svg>','Eumátheia']];
pdPilula=function(){var n=document.getElementById('tt-indice');var p=document.querySelector('.pd-pilula');
 var q=function(sel){return (p&&p.querySelector(sel))||(n&&n.querySelector(sel));};
 var fin=q('[data-tt="fin"]'),b9=q('[data-ic="b9"]'),lap=q('[data-ic="laptop"]'),enf=q('[data-ic="enf"]');if(!fin&&!b9&&!enf)return;
 if(!p){if(!n)return;p=document.createElement('div');p.className='pd-pilula';p.setAttribute('role','group');p.setAttribute('aria-label','Painéis');n.insertBefore(p,fin||b9||enf);}
 var tt={fin:'Bolsa de Dracmas · finanças',b9:'Bunker 9 · projetos',enf:'Enfermaria · saúde'};
 [[fin,'fin'],[b9,'b9'],[enf,'enf']].forEach(function(x){if(x[0]){x[0].title=tt[x[1]];x[0].setAttribute('aria-label',tt[x[1]]);}});
 var eus=EU_BTS.map(function(e){var b=p.querySelector('[data-eusolo="'+e[0]+'"]');if(!b){b=document.createElement('button');b.type='button';b.className='tt-ic eu-bt';b.dataset.eusolo=e[0];b.innerHTML=e[2];}b.title=e[1];b.setAttribute('aria-label',e[1]);return b;});
 var tel=p.querySelector('.bn-telas');
 var ord=[fin,b9,enf,tel].concat(eus,[lap]).filter(Boolean);ord.forEach(function(b,i){if(p.children[i]!==b)p.insertBefore(b,p.children[i]||null);});
 if(lap)lap.classList.add('eu-lap-oculto');};
bnTelaBotoes=(function(b0){return function(){var r=b0.apply(this,arguments);try{pdPilula();}catch(e){}return r;};})(bnTelaBotoes);
function euSoloAbre(k){var pd=document.getElementById('painel-dir');if(pd&&pd.classList.contains('on')&&pd.classList.contains('eu-um')&&pd.dataset.euk===k){try{pdFecha();}catch(e){}return;}
 try{pdAbre('lap');}catch(e){}pd=document.getElementById('painel-dir');try{euAba(k);}catch(e){}if(pd){pd.classList.add('eu-um');pd.dataset.euk=k;}
 var eu=document.getElementById('eum'),nm=(EU_BTS.filter(function(x){return x[0]===k;})[0]||[])[3];if(eu&&nm){var h=eu.querySelector('.eu-cab h2'),kk=eu.querySelector('.eu-cab .eu-k');if(h)h.textContent=nm;if(kk)kk.textContent='painel · ligado ao Laptop';}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-eusolo]');if(b){e.preventDefault();e.stopImmediatePropagation();euSoloAbre(b.dataset.eusolo);return;}
 var o=e.target.closest&&e.target.closest('.pd-pilula button,#tt-indice button');if(o&&!o.dataset.eusolo){var pd=document.getElementById('painel-dir');if(pd){pd.classList.remove('eu-um');var eu=document.getElementById('eum');if(eu){var h=eu.querySelector('.eu-cab h2'),kk=eu.querySelector('.eu-cab .eu-k');if(h)h.textContent='Laptop';if(kk)kk.textContent='painel de estudos';}}}},true);
setTimeout(function(){try{pdPilula();bnTelaBotoes();}catch(e){}},1500);setInterval(function(){try{pdPilula();}catch(e){}},2000);
(function(){var st=document.createElement('style');st.id='eu-bts-css';st.textContent=[
 '.pd-pilula .eu-lap-oculto{display:none!important}',
 '.pd-pilula .eu-bt svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#painel-dir.eu-um .eu-nav,#painel-dir.eu-um .eu-cab p,#painel-dir.eu-um .eu-nova{display:none!important}'
].join('\n');document.head.appendChild(st);})();

/* Hora livre: recreio e fila do lazer viram a faixa de cima do rodapé-base do painel direito (só com a aba aberta); fim do templo 2 encosta no rodapé */
function tpbAltura(){var b=document.getElementById('tp-base'),fr=document.querySelector('#tp-painel .tp-fr');if(!b||!fr)return;var v=b.offsetHeight+'px';if(fr.style.getPropertyValue('--tpb-h')!==v)fr.style.setProperty('--tpb-h',v);}
setInterval(function(){try{tpbAltura();}catch(e){}},1000);setTimeout(function(){try{tpbAltura();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='rec-faixa-css';var C='html body #tp-painel .tp-corpo:has(.tp-rod-tg)';st.textContent=[
 C+'{position:sticky!important;bottom:var(--tpb-h,94px)!important;z-index:7!important;order:8!important;margin:12px -8px 0!important;padding:0 10px 6px!important;border:1px solid #9a7b4a!important;border-bottom:0!important;border-radius:0!important;background:linear-gradient(180deg,#f3e7c8,#efe0bb)!important;box-shadow:0 -8px 16px -12px rgba(60,40,20,.45)!important}',
 C+' .tp-rod-tg span{color:#7a4a20!important}',
 'html body #tp-painel:has(#tp-real) #tp-base{margin-top:0!important}',
 'html body #tp-painel .tp-corpo:has(.tp-rod-tg)+#tp-base,html body #tp-painel .tp-corpo:has(.tp-rod-tg)~#tp-base{margin-top:0!important}',
 'body.tv '+C+'{border-color:#6e4426!important;background:linear-gradient(180deg,#efe5d2,#e9dfcc)!important}',
 'body.eg '+C+'{border-color:#c9a23a!important;background:linear-gradient(180deg,#f7ebcd,#f4e4c0)!important}',
 /* templo 2: degraus encostam no rodapé */
 'html body .wrap>#rt-base{margin-bottom:26px!important}',

 'html body .wrap{padding-bottom:var(--rod-h,0px)!important}'
].join('\n');document.head.appendChild(st);})();

/* base do templo principal sem os dois degraus */
(function(){var st=document.createElement('style');st.id='bn-sem-degraus-css';var R='html body:not(.zz9):not(.zz8):not(.zz7):not(.zz6):not(.zz5) #hero-box#hero-box>.bn-rod';st.textContent=[
 R+'::before,'+R+'::after{display:none!important;content:none!important}',
 R+'{margin-bottom:18px!important}'
].join('\n');document.head.appendChild(st);})();
/* Modo noturno: fotos em fundo de cartão (::before/::after ou no próprio elemento) voltam às cores reais */
function noiteFotos(){if(!document.documentElement.classList.contains('noite'))return;var RX=/\.(webp|jpe?g|png)/i;
 document.querySelectorAll('body *').forEach(function(e){if(e.closest('svg'))return;var cs=getComputedStyle(e);
  if(RX.test(cs.backgroundImage)){if((e.innerText||'').trim().length<=24)e.classList.add('nt-e');}
  if(RX.test(getComputedStyle(e,'::before').backgroundImage))e.classList.add('nt-b');
  if(RX.test(getComputedStyle(e,'::after').backgroundImage))e.classList.add('nt-a');});}
(function(){var t=null;setInterval(function(){if(document.documentElement.classList.contains('noite'))noiteFotos();},5000);
 var a0=aplicaTema;aplicaTema=function(){var r=a0.apply(this,arguments);clearTimeout(t);t=setTimeout(noiteFotos,300);return r;};setTimeout(noiteFotos,1500);})();

/* ===== Toque da Concha + Hoje + Compromissos numa gaveta que sobe do pé do templo da direita, entre os pilares ===== */
function cgMede(){var g=document.getElementById('cg-gav');if(!g)return;var sec=null;[].some.call(document.querySelectorAll('#tp-real>section'),function(x){if(x.getClientRects().length&&getComputedStyle(x).display!=='none'){sec=x;return true;}});
 var fr=document.querySelector('#tp-painel .tp-fr'),base=document.getElementById('tp-base');if(!fr)return;var rf=fr.getBoundingClientRect(),L,R;
 if(sec){var r=sec.getBoundingClientRect(),c=getComputedStyle(sec);L=r.left+parseFloat(c.paddingLeft)-14;R=r.right-parseFloat(c.paddingRight)+14;}else{L=rf.left+30;R=rf.right-30;}
 var bt=base&&base.getClientRects().length?base.getBoundingClientRect().top:innerHeight,topo=Math.max(rf.top,0)+120;
 g.style.setProperty('--cg-l',Math.round(L)+'px');g.style.setProperty('--cg-w',Math.round(R-L)+'px');g.style.setProperty('--cg-b',Math.round(innerHeight-bt)+'px');g.style.setProperty('--cg-h',Math.max(200,Math.round(bt-topo))+'px');}
function cgHTML(){var fz='';try{fz=frisoHTML();}catch(e){}var met=(fz.match(/<div class="tf-met">[\s\S]*?<\/div>/)||[''])[0];
 var R=rtD(),a=rtAgora(),p=null,falta=0;try{p=rtProx();falta=p?((p.m!=null?p.m:rtMin(p.h))-a):0;if(falta<0)falta+=1440;}catch(e){}
 var hj='',px='';try{hj=compHojeHTML();}catch(e){}try{px=agIcsUrl()?agListaHTML(10):'<p class="comp-n">Ligue a Agenda Google (cartão da Agenda, endereço iCal) para os compromissos aparecerem aqui e na Grade.</p>';}catch(e){}
 return '<div class="cg-cab">'+RT_IC.concha+'<div><small>toques · hoje · compromissos</small><b>'+esc(new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'short'}))+'</b></div><button type="button" data-cgx aria-label="fechar">×</button></div>'+
  '<div class="cg-corpo">'+met+'<div class="cg-prox"><span>'+(p?'próximo '+esc(p.h)+' · '+esc(p.n)+' · em '+(falta>=60?Math.floor(falta/60)+'h'+String(falta%60).padStart(2,'0'):falta+' min'):'nenhum toque ligado')+'</span><button type="button" data-cgaj>ajustar</button></div>'+
  '<h6>hoje</h6>'+hj+'<h6>compromissos · próximos dias</h6><div class="cg-prox-dias">'+px+'</div></div>';}
function cgPinta(){var g=document.getElementById('cg-gav');if(!g||!g.classList.contains('on'))return;var c=g.querySelector('.cg-in'),h=cgHTML();if(c._h!==h){var st=c.querySelector('.cg-corpo');var sc=st?st.scrollTop:0;c.innerHTML=h;c._h=h;var st2=c.querySelector('.cg-corpo');if(st2)st2.scrollTop=sc;}}
function cgAbre(on){var g=document.getElementById('cg-gav');
 if(!g){g=document.createElement('div');g.id='cg-gav';g.innerHTML='<div class="cg-in" role="dialog" aria-label="Toque da Concha, hoje e compromissos"></div>';document.body.appendChild(g);
  g.addEventListener('click',function(e){if(e.target.closest('[data-cgx]')){cgAbre(false);return;}if(e.target.closest('[data-cgaj]')){cgAbre(false);setTimeout(function(){try{concha(true);}catch(z){}},50);}});}
 if(on===undefined)on=!g.classList.contains('on');cgMede();if(on){g.classList.add('on');cgPinta();}else g.classList.remove('on');document.body.classList.toggle('cg-on',on);}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('#tp-base #td-agora');if(!t)return;e.preventDefault();e.stopImmediatePropagation();try{concha(false);}catch(z){}cgAbre();},true);
document.addEventListener('pointerdown',function(e){var g=document.getElementById('cg-gav');if(!g||!g.classList.contains('on'))return;if(e.target.closest('#cg-gav .cg-in,#tp-base #td-agora'))return;cgAbre(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var g=document.getElementById('cg-gav');if(g&&g.classList.contains('on'))cgAbre(false);}});
window.addEventListener('resize',function(){try{cgMede();}catch(e){}});setInterval(function(){try{cgMede();cgPinta();}catch(e){}},30000);

/* ===== Panteão: fichas completas dos personagens nos três temas; patronos justificados pelo mapa natal (20/12/2000, 14h10, Colíder) e pela matriz do destino ===== */
var PT_DADOS={
 'Você (banner)':{
  1:[['quem é','Chase Maverick Duke, o Hékatos ("o que acerta de longe"), filho de Apolo, Chalé 7'],['nascimento','20/12/2000, 14h10 · Sol a 29° de Sagitário, Ascendente em Áries, Lua em Escorpião'],['origem','Austin, Texas; reclamado na primeira fogueira'],['dons','a flecha que já sabe o alvo · a escuta do oráculo · o canto que reúne · o mestre do templo'],['ponto fraco','a queima: muito fogo, pouco chão'],['talismã','a dracma do Grau 29']],
  2:[['quem é','Chase Maverick Duke, einherji do Andar 19, filho de Ullr'],['como chegou','caiu em batalha no último dia do sol em Sagitário, na véspera do solstício, e a valquíria Brynn o recolheu na nevasca'],['arma','arco de teixo de Ýdalir, o vale dos teixos de Ullr, e o anel de juramento'],['dons','mira no inverno, palavra jurada, leitura do campo'],['ponto fraco','a queima: luta até cair, e o Banquete é obrigatório'],['talismã','uma runa Eihwaz (o teixo) gravada em osso']],
  3:[['quem é','Chase Maverick Duke, iniciado da Casa do Brooklyn, mago do caminho de Neith, Nomo 21'],['como chegou','um sacerdote-leitor percebeu o sol do último grau no seu ba e o trouxe ao terraço'],['arma','arco de Neith, varinha de marfim e cajado de sicômoro'],['dons','o hieróglifo que já sabe o alvo · o véu levantado · a balança justa'],['ponto fraco','a queima: muito Rá, pouco Nilo'],['talismã','um amuleto do escudo e das flechas cruzadas de Neith']]},
 'Patrono':{
  1:[['Apolo · pai','deus do sol, do arco, da profecia e da cura'],['por quê','já é o pai do Hékatos; a justificativa está na Ficha do campista']],
  2:[['Ullr · pai','deus do inverno, do arco, da neve e dos juramentos; enteado de Thor, filho de Sif'],['o solstício','você nasceu a 20/12, na véspera do solstício de inverno do norte, com o Sol no último grau de Sagitário: é a porta do inverno, o reino de Ullr'],['o juramento','os nórdicos juravam "pelo anel de Ullr". No centro da sua matriz está o Arcano 5, o Hierofante, guardião da lei, e Marte em Libra na Casa 7 é a ação pela justiça: o tribunal é o seu anel de juramento'],['a glória','Ullr quer dizer "glória". Seu Meio do Céu em Capricórnio pede reconhecimento sério e duradouro, e o Sol no grau 29 dá a sensação de missão'],['Odin · patrono do hotel','senhor de Valhala, o andarilho que busca o saber a qualquer preço'],['o enforcado','no topo da matriz está o Arcano 12, o Enforcado: Odin pendurado nove noites em Yggdrasil para ganhar as runas. É o sacrifício escolhido em troca de saber, os seus meses de estudo'],['o dia de Odin','quarta-feira é o dia de Mercúrio no latim e o dia de Odin (Woden) no germânico. Seu Mercúrio está em Sagitário na Casa 9, a do saber distante: o andarilho que estuda'],['o olho no poço','o caminho de vida 7 e a Sacerdotisa (Arcano 2) na matriz são o buscador que troca um olho pela sabedoria no poço de Mímir']],
  3:[['Neith · patrona','deusa de Saís, criadora, tecelã e arqueira, a mais antiga do Egito'],['a juíza','no Julgamento entre Hórus e Set, os deuses pediram a Neith que arbitrasse, e ela decidiu o trono. Sua matriz abre no Arcano 20, o Julgamento, e tem o Hierofante no centro: o tribunal é o seu campo'],['o véu','em Saís se lia "ninguém levantou o meu véu". O Arcano 2, a Sacerdotisa, é o saber velado, o oráculo calado da sua matriz'],['a tecelã','Neith tece o mundo no tear. Vênus, Urano e Netuno em Aquário na Casa 10 são quem tece os próprios sistemas, apps e processos no trabalho'],['Rá · patrono do nomo','o sol que navega de dia na barca e atravessa o Duat à noite'],['o sol alto','você nasceu às 14h10, com o Sol na Casa 9, ainda alto no céu: Rá em plena barca do dia'],['o fim do ciclo','o Sol no grau 29, o último do signo, é a hora em que a barca de Rá chega ao fim do trecho e se prepara para renascer'],['o fogo do começo','Ascendente em Áries: o criador que se ergue do caos e dá o primeiro passo']]},
 'Guardião':{
  1:[['quem é','Sully Brookhaven, sátiro protetor designado pelo Conselho dos Cascos Fendidos'],['céu','Sol em Aquário: o amigo leal e um pouco excêntrico'],['jeito','casual, fala "cara", toca flauta quando você termina um bloco'],['função no app','conta ritos, designações e XP; fala no Posto de comando'],['fraqueza','enchiladas e latinhas']],
  2:[['quem é','Brynn "Hawk" Halvorsen, valquíria recrutadora da Oak House, em Boston'],['céu','Sol em Sagitário, Lua em Áries: fogo puro, ela convoca em vez de consolar'],['jeito','fala em placar, revanche e glória; te chama de einherji'],['função no app','conta ritos e blocos como pontos no placar do andar 19'],['fraqueza','café de posto com rosquinha de bordo e qualquer aposta']],
  3:[['quem é','Toby Nefer, babuíno escriba de Thoth na Casa do Brooklyn'],['céu','Sol em Libra, Lua em Virgem: pesa o dia na balança de Ma\'at antes de falar'],['jeito','não grita, registra; te chama de iniciado'],['função no app','anota cada rito, bloco e deslize no papiro'],['fraqueza','pretzel de carrinho com mostarda']]},
 'Mensageiro':{
  1:[['quem é','Polly McCaw, corvo de Apolo'],['céu','Sol em Gêmeos, ascendente em Libra'],['função no app','traz entregas, avisos e más notícias'],['família','o gêmeo, Cass, fica no ninho']],
  2:[['quem é','Hugin, o pensamento de Odin'],['função no app','traz entregas, avisos e más notícias'],['família','o gêmeo, Munin, a memória, fica no ombro de Odin e guarda o que você fez'],['jeito','chega primeiro e fala pouco: "Crá."']],
  3:[['quem é','Benh, um Bennu, pássaro de fogo reivindicado por Aten'],['função no app','traz entregas em chama dourada; nas más notícias chega em brasa'],['dom','se cair em serviço, renasce no fogo da manhã seguinte'],['jeito','"Krrok."']]},
 'Diretor':{
  1:[['quem é','Quíron, o centauro que treina heróis desde Aquiles'],['função','diretor de atividades; a voz da Casa Grande'],['jeito','paciente, firme, um professor antes de tudo']],
  2:[['quem é','Helgi, gerente do Hotel Valhala'],['função','cuida dos andares, dos einherjar e do banquete'],['jeito','burocrático, dramático, leal ao hotel']],
  3:[['quem é','Amós Kane, sacerdote-leitor e chefe da Casa do Brooklyn'],['função','guarda o nomo e orienta os iniciados'],['jeito','calmo, jazzista, sempre de chapéu']]},
 'Oráculo':{
  1:[['quem é','o Oráculo de Delfos, no sótão da Casa Grande'],['função','dá as missões em versos de viés']],
  2:[['quem são','as Nornas: Urðr (o que foi), Verðandi (o que é) e Skuld (o que será)'],['função','tecem as missões ao pé de Yggdrasil']],
  3:[['o que é','o Livro de Thoth, o saber guardado em feitiços'],['função','dá as missões como palavras de poder']]},
 'Ronda da noite':{
  1:[['quem são','as harpias da limpeza'],['função','depois do toque de recolher, devoram quem ainda está fora do chalé']],
  2:[['quem são','as valquírias de plantão'],['função','recolhem quem ficou acordado além da hora']],
  3:[['quem são','os shabtis, servos de argila animados por magia'],['função','fecham a casa e mandam o iniciado para o aposento']]}
};
ptFichaExtra=(function(f0){return function(papel,i){var a=null;try{a=f0.apply(this,arguments);}catch(e){}var d=PT_DADOS[papel]&&PT_DADOS[papel][i];
 if(!d)return a;if(!a)return d;var vis={};a.forEach(function(x){vis[x[0]]=1;});return a.concat(d.filter(function(x){return !vis[x[0]];}));};})(ptFichaExtra);
/* painel 2 (Rastreados) cresce até que, no fim da rolagem, a faixa das horas do templo 1 encoste no topo da tela */
function rtAltura(){var rt=document.querySelector('.wrap > div.rt'),bl=document.querySelector('#hero-box #tp-friso-bloco')||document.querySelector('#hero-box #tp-friso');if(!rt)return;
 if(!bl||innerWidth<1380||!bl.offsetParent){if(rt.style.minHeight){rt.style.removeProperty('min-height');}return;}
 var hj=bl.querySelector('.cb-hoje'),hjH=0;if(hj&&!hj.hidden&&hj.offsetParent){var c=getComputedStyle(hj);hjH=hj.getBoundingClientRect().height+parseFloat(c.marginTop||0)+parseFloat(c.marginBottom||0);}
 var fim=document.getElementById('rt-base');if(!fim||fim.previousElementSibling!==rt)fim=rt;var cf=getComputedStyle(fim),rodH=parseFloat(getComputedStyle(document.body).getPropertyValue('--rod-h'))||0;
 var fimDoc=fim.getBoundingClientRect().bottom+scrollY+parseFloat(cf.marginBottom||0)+rodH,topoDoc=bl.getBoundingClientRect().top+scrollY;
 var novo=Math.max(0,Math.round(innerHeight-rodH-236)),at=parseFloat(rt.style.minHeight)||0;
 if(Math.abs(novo-at)>1)rt.style.setProperty('min-height',novo+'px','important');}
setTimeout(function(){try{rtAltura();}catch(e){}},1900);setInterval(function(){try{rtAltura();}catch(e){}},1300);window.addEventListener('resize',function(){try{rtAltura();}catch(e){}});
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#tp-friso,#tp-friso-bloco'))setTimeout(function(){try{rtAltura();}catch(z){}},60);});

/* o bloco da Concha entra no templo: fica dentro da colunata, entre as bases dos pilares */
tpFriso=(function(f0){return function(){var r=f0.apply(this,arguments);try{var sl=document.querySelector('#hero-box .bn-slot'),bl=document.getElementById('tp-friso-bloco');
 if(sl&&bl){if(bl.parentNode!==sl||sl.lastElementChild!==bl)sl.appendChild(bl);['margin-left','margin-right','width'].forEach(function(p){bl.style.removeProperty(p);});
  var rod=document.querySelector('#hero-box > .bn-rod');if(rod&&sl.nextElementSibling!==rod)sl.insertAdjacentElement('afterend',rod);}}catch(e){}return r;};})(tpFriso);
setTimeout(function(){try{tpFriso();}catch(e){}},1700);setInterval(function(){try{var sl=document.querySelector('#hero-box .bn-slot'),bl=document.getElementById('tp-friso-bloco');if(sl&&bl&&bl.parentNode!==sl)tpFriso();}catch(e){}},1500);

/* Fogueira: o botão da cronologia abre o diálogo direto (o rodapé não tem mais o botão antigo) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-dffogo]');if(!b)return;if(document.getElementById('rod-fogo'))return;e.preventDefault();try{fgAbre();}catch(z){}},true);
/* ===== rodada: friso dentro do templo, telas padronizadas, Templo I/II, painel direito com pilares em todos os temas ===== */
ABAS_NOMES.vis='Mural';ABAS_NOMES.prog='Programação';
/* uma só placa de telas: a que fica no frontão (ou, com painel lateral aberto, a do topo do banner) */
(function(){var b0=bnTelaBotoes;bnTelaBotoes=function(){var r=b0.apply(this,arguments);try{var hb=document.getElementById('hero-box');if(!hb)return r;
 var keep=hb.querySelector('.pd-pilula .bn-telas')||hb.querySelector('.bn-telas.bn-placa')||hb.querySelector('.bn-telas');
 [].forEach.call(document.querySelectorAll('.bn-telas'),function(x){if(x!==keep)x.remove();});}catch(e){}return r;};})();
setInterval(function(){try{bnTelaBotoes();}catch(e){}},1300);
/* sem minimizar banner */
try{document.body.classList.remove('bn-mini');localStorage.setItem('astro_bn_min','0');}catch(e){}
bnMin=function(){document.body.classList.remove('bn-mini');};
/* friso das horas + toque dentro do templo principal, entre as bases dos pilares */
(function(){var f0=tpFriso;tpFriso=function(){var r=f0.apply(this,arguments);try{var sl=document.querySelector('#hero-box .bn-slot'),bl=document.getElementById('tp-friso-bloco');
 if(sl&&bl&&(bl.parentNode!==sl||sl.lastElementChild!==bl)){sl.appendChild(bl);['margin-left','margin-right','width'].forEach(function(k){bl.style.removeProperty(k);});}
 var rod=document.querySelector('#hero-box > .bn-rod');if(sl&&rod&&sl.nextElementSibling!==rod)sl.insertAdjacentElement('afterend',rod);}catch(e){}return r;};})();
setInterval(function(){try{tpFriso();}catch(e){}},1100);
/* Rastreio */
function rastNome(){var h=document.getElementById('h-rast');if(!h)return;if(h._rn!==1||h.textContent!=='Rastreio'){h.setAttribute('data-notr','');h.textContent='Rastreio';h._rn=1;}}
setInterval(function(){try{rastNome();}catch(e){}},1200);setTimeout(function(){try{rastNome();}catch(e){}},800);
/* alternar entre Templo I e Templo II: um seletor no alto de cada templo (no lugar do antigo "minimizar banner" e na linha do Rastreio) */
function tplNavHTML(n){return '<button type="button" data-tpl="1" aria-pressed="'+(n===1)+'" title="Templo I · Mural e Programação">Templo I</button><i aria-hidden="true">·</i><button type="button" data-tpl="2" aria-pressed="'+(n===2)+'" title="Templo II · Rastreio">Templo II</button>';}
function tplNav(){var hb=document.getElementById('hero-box'),rt=document.querySelector('.wrap > div.rt');if(!hb||!rt)return;
 var row=hb.querySelector('#bn-min')||hb.querySelector('.bn-row'),cab=rt.querySelector(':scope > .cab');
 [[row,1,'tpl-a'],[cab,2,'tpl-b']].forEach(function(x){if(!x[0])return;var n=document.getElementById(x[2]);
  if(!n){n=document.createElement('nav');n.id=x[2];n.className='tpl-nav';n.setAttribute('data-notr','');n.setAttribute('aria-label','Templos');}
  var h=tplNavHTML(x[1]);if(n._h!==h){n._h=h;n.innerHTML=h;}
  if(x[1]===1){if(n.parentNode!==hb){hb.appendChild(n);}}else if(n.parentNode!==x[0])x[0].appendChild(n);});}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.tpl-nav [data-tpl]');if(!b)return;e.preventDefault();e.stopPropagation();
 var hb=document.getElementById('hero-box'),rt=document.querySelector('.wrap > div.rt');
 if(b.dataset.tpl==='1'&&hb)scrollTo({top:Math.max(0,hb.getBoundingClientRect().top+scrollY-8),behavior:'smooth'});else if(rt)scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'});},true);
setTimeout(function(){try{tplNav();}catch(e){}},1500);setInterval(function(){try{tplNav();}catch(e){}},1200);
(function(){var st=document.createElement('style');st.id='rodada-templos-css';
 var k=TV_ON?'#203936':EG_ON?'#1e3a6e':'#8a5a14',c=TV_ON?'#d4bd82':EG_ON?'#c9a23a':'#e9c97c',bg=TV_ON?'#203936':EG_ON?'#1e3a6e':'#fbf3df',tx=TV_ON||EG_ON?'#f3e2b0':'#5a3a10',sub=TV_ON||EG_ON?'rgba(243,226,176,.6)':'#a08050';
 var S2='html body:not(.zz9):not(.zz8) #tp-painel#tp-painel #tp-real>:is(#tm-painel,#recreio,#tesouro)';
 st.textContent=[
 '#hero-box .bn-min .bn-a,#hero-box #bn-min .bn-a{display:none!important}#hero-box #bn-min{pointer-events:none!important}',
 'body.bn-mini #hero-box .bn-slot{display:block!important}',
 /* friso dentro do templo */
 'html body #hero-box#hero-box .bn-slot>#tp-friso-bloco{position:relative;z-index:3;display:block!important;margin:0!important;width:100%!important;max-width:none!important;box-sizing:border-box}',
 /* seletor Templo I · Templo II */
 '.tpl-nav{display:inline-flex;align-items:baseline;gap:6px;padding:3px 12px 2px;background:'+bg+';border:1.5px solid '+k+';box-shadow:0 0 0 2px '+bg+',0 0 0 3px '+c+';white-space:nowrap;z-index:34}',
 '#hero-box>#tpl-a{position:absolute;top:8px;right:64px}',
 '.wrap>div.rt>.cab>#tpl-b{margin-left:auto;align-self:center}',
 'html body:not(.zz9):not(.zz8) .tpl-nav.tpl-nav button{all:unset;width:auto!important;height:auto!important;min-height:0!important;margin:0!important;padding:0 2px!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;cursor:pointer;font:400 12px Georgia,serif!important;font-variant:small-caps!important;letter-spacing:.05em!important;text-transform:none!important;color:'+sub+'!important}',
 'html body:not(.zz9):not(.zz8) .tpl-nav.tpl-nav button[aria-pressed=true]{font-size:14px!important;font-weight:700!important;color:'+tx+'!important;cursor:default}',
 '.tpl-nav i{font-style:normal;color:'+c+'}',
 /* painel direito: as seções deixam aparecer os pilares em todos os temas */
 S2+'{background-color:transparent!important;border-left:0!important;border-right:0!important;outline:0!important;box-shadow:none!important}',
 'html body:not(.zz9):not(.zz8) #tp-painel#tp-painel .tp-fr{border:0!important;outline:0!important;box-shadow:none!important}',
 'html body:not(.zz9):not(.zz8) #tp-painel#tp-painel #tp-real{border:0!important;outline:0!important;box-shadow:none!important;background-color:transparent!important}',
 /* Valhala: placa principal com o fundo da placa HOTEL VALHALA */
 TV_ON?'html body.tv:not(.zz9):not(.zz8) #hero-box#hero-box .pd-pilula.pil-placa,html body.tv:not(.zz9):not(.zz8) #hero-box#hero-box .bn-telas.bn-placa{background:#203936!important;border:1px solid #a88750!important;box-shadow:0 0 0 2px #203936,0 0 0 3px #d4bd82,0 6px 12px -6px rgba(10,20,18,.55)!important}':''
 ].join('\n');document.head.appendChild(st);})();

/* Hoje: ao acionar, a faixa do Toque sobe e revela o painel embaixo dela (o templo não cresce) */
try{if(localStorage.getItem('astro_hoje_pan')===null){HOJE_ABERTO=false;}}catch(e){}
function hojeSobe(){var bl=document.getElementById('tp-friso-bloco');if(!bl)return;var hj=bl.querySelector('.cb-hoje');var h=hj&&!hj.hidden&&hj.offsetParent?hj.offsetHeight:0;
 var v=h+'px';if(bl.style.getPropertyValue('--hj-h')!==v)bl.style.setProperty('--hj-h',v);bl.classList.toggle('hj-sobe',h>0);}
window.addEventListener('click',function(e){var fz=e.target.closest&&e.target.closest('#hero-box .bn-slot #tp-friso');if(!fz)return;e.preventDefault();e.stopPropagation();
 if(e.target.closest('.tf-leg b')&&!/hoje/i.test(e.target.textContent)){try{concha(true);}catch(z){}return;}
 HOJE_ABERTO=!HOJE_ABERTO;try{localStorage.setItem('astro_hoje_pan',HOJE_ABERTO?'1':'0');}catch(z){}try{hojePinta();}catch(z){}hojeSobe();},true);
setInterval(function(){try{hojeSobe();}catch(e){}},700);
(function(){var st=document.createElement('style');st.id='hoje-sobe-css';var B='html body #hero-box#hero-box .bn-slot>#tp-friso-bloco';st.textContent=[
 B+'{transition:transform .35s ease}',
 B+'>#tp-friso{padding-bottom:0!important;'+(TV_ON?'background-image:none!important;background-color:#f4ead2!important;':'')+'}',
 'html body.tv:not(.zz9) #hero-box#hero-box .bn-slot:has(>#tp-friso-bloco){padding-bottom:0!important}',
 B+'>#tp-friso{display:block!important;width:100%!important;max-width:none!important;margin:0!important;box-sizing:border-box!important}',
 B+' .cb-hoje.hj-grade{position:absolute!important;left:0;right:0;top:100%;z-index:4;background:#fbf5e6;box-shadow:0 -1px 0 rgba(0,0,0,.08)}',
 B+'.hj-sobe{transform:translateY(calc(-1 * var(--hj-h,0px)));z-index:20;box-shadow:0 -8px 18px -8px rgba(40,25,10,.45)}'
].join('\n');document.head.appendChild(st);})();

/* faixa do Toque no visual da moldura de cada tema; Registrar alinhado */
(function(){var st=document.createElement('style');st.id='friso-moldura-css';
 var P=TV_ON?{bg:'linear-gradient(180deg,#f1e2c2,#e6d2a8)',k:'#5a3c22',k2:'#203936',tx:'#3a2414',pr:'#203936',prt:'#f3e2b0'}:EG_ON?{bg:'linear-gradient(180deg,#f6ead0,#ecdcb4)',k:'#1e3a6e',k2:'#c9a23a',tx:'#1e3a6e',pr:'#1e3a6e',prt:'#f3e2b0'}:{bg:'linear-gradient(180deg,#fbf0d4,#f1dfae)',k:'#8a5a14',k2:'#c99a3d',tx:'#5a3a10',pr:'#8a5a14',prt:'#fff4d6'};
 var F='html body:not(.zz9):not(.zz8) #hero-box#hero-box .bn-slot>#tp-friso-bloco>#tp-friso';
 st.textContent=[
 F+'{background:'+P.bg+'!important;border:1.5px solid '+P.k+'!important;border-radius:0!important;box-shadow:inset 0 0 0 2px rgba(255,250,235,.55),inset 0 0 0 3px '+P.k2+',0 -2px 8px -4px rgba(40,25,10,.35)!important}',
 F+' .tf-met{border-bottom:1px solid '+P.k+'!important;padding:6px 8px 5px!important}',
 F+' .tf-m b{color:'+P.tx+'!important}'+F+' .tf-m i{color:'+P.tx+'!important;opacity:.75}',
 F+' .tf-m.prox{background:'+P.pr+'!important;box-shadow:inset 0 0 0 1px '+P.k2+'!important}'+F+' .tf-m.prox b,'+F+' .tf-m.prox i{color:'+P.prt+'!important;opacity:1}',
 F+' .tf-tri{background:repeating-linear-gradient(90deg,'+P.k+' 0 1.5px,transparent 1.5px 3.2px)!important}',
 F+' .tf-leg span{color:'+P.tx+'!important}'+F+' .tf-leg svg{stroke:'+P.k+'!important}'+F+' .tf-leg b{color:'+P.k+'!important}',
 'html body #hero-box#hero-box>.bn-rod .regdia .rdent{display:flex!important;align-items:center!important;gap:8px}',
 'html body #hero-box#hero-box>.bn-rod .regdia .rdent button{align-self:center!important;margin:0!important}'
 ].join('\n');document.head.appendChild(st);})();

/* Toque da Concha no visual da moldura de cada tema; frontão do templo inicial sempre por cima; Registrar alinhado */
(function(){var st=document.createElement('style');st.id='friso-moldura2-css';
 var k=TV_ON?'#3a2414':EG_ON?'#1e3a6e':'#8a5a14',c=TV_ON?'#d4bd82':EG_ON?'#c9a23a':'#e9c97c',bg=TV_ON?'#f4ead2':EG_ON?'#f6efd9':'#fbf3df',hi=TV_ON?'#203936':EG_ON?'#1e3a6e':'#8a5a14',tx=TV_ON?'#f3e2b0':EG_ON?'#f3e2b0':'#fff8e6';
 var F='html body:not(.zz9):not(.zz8) #hero-box#hero-box .bn-slot>#tp-friso-bloco';
 st.textContent=[
 F+'{border:1.5px solid '+k+'!important;border-bottom:0!important;border-radius:0!important;background:'+bg+'!important;box-shadow:0 0 0 2px '+bg+',0 0 0 3px '+c+'!important}',
 F+'.hj-sobe{box-shadow:0 0 0 2px '+bg+',0 0 0 3px '+c+',0 -10px 18px -8px rgba(40,25,10,.45)!important}',
 F+'>#tp-friso{border:0!important;border-radius:0!important;background:'+bg+'!important;box-shadow:none!important}',
 F+' #tp-friso .tf-met{border-bottom:1px solid '+k+'!important}',
 F+' #tp-friso .tf-m b{color:'+k+'!important}',F+' #tp-friso .tf-m i{color:'+k+'!important;opacity:.75}',
 F+' #tp-friso .tf-m.prox{background:'+hi+'!important;box-shadow:inset 0 0 0 1px '+c+'!important}',F+' #tp-friso .tf-m.prox b,'+F+' #tp-friso .tf-m.prox i{color:'+tx+'!important;opacity:1}',
 F+' #tp-friso .tf-tri{background:repeating-linear-gradient(90deg,'+k+' 0 1.5px,transparent 1.5px 3.2px)!important}',
 F+' #tp-friso .tf-leg svg{stroke:'+k+'!important}'+F+' #tp-friso .tf-leg b{color:'+k+'!important}',F+' #tp-friso .tf-leg span{color:'+k+'!important}',
 F+' .cb-hoje.hj-grade{background:'+bg+'!important;border-top:1px solid '+k+'!important}',
 /* frontão e suas placas acima de tudo no templo inicial */
 'html body #hero-box#hero-box>.neo-frontao{position:relative!important;z-index:45!important}',
 'html body #hero-box#hero-box>.neo-frontao .pd-pilula{z-index:46!important}',
 /* Registrar alinhado ao campo e aos demais botões */
 'html body #hero-box#hero-box>.bn-rod .regdia .rdent{display:flex!important;align-items:center!important}',
 'html body #hero-box#hero-box>.bn-rod .regdia .rdent>button{align-self:center!important;margin-top:0!important;margin-bottom:0!important}'
 ].join('\n');document.head.appendChild(st);})();

/* Rodapé expansível sem Trilha do foco e sem a faixa do Píthos; Em andamento ao lado do Diário de bordo; Crônicas no campo da semana da Programação */
function rodRearruma(){var rod=document.querySelector('#hero-box > .bn-rod'),orb=document.getElementById('orbp');
 if(rod&&orb){var w=rod.querySelector(':scope > .br-orb');if(!w){w=document.createElement('div');w.className='br-orb';w.innerHTML='<span class="br-k">em andamento</span>';rod.appendChild(w);}if(orb.parentNode!==w)w.appendChild(orb);}
 var dj=document.getElementById('qa-d-dj'),cab=document.querySelector('.wrap > div.tb .tbcab');
 if(dj&&cab){var dt=cab.querySelector('.tb-dt');if(dj.parentNode!==cab){if(dt)dt.insertAdjacentElement('afterend',dj);else cab.appendChild(dj);dj.classList.add('dj-sem');}
  var sb=dj.querySelector(':scope > .qa-sb'),a=dj.querySelector('summary .qa-sk'),g=dj.querySelector('summary .qa-deus'),t=[a&&a.textContent,g&&g.textContent].filter(Boolean).join(' · ');if(sb&&sb.getAttribute('data-sub')!==t)sb.setAttribute('data-sub',t);}}
setTimeout(function(){try{rodRearruma();}catch(e){}},1600);setInterval(function(){try{rodRearruma();}catch(e){}},1200);
document.addEventListener('pointerdown',function(e){var d=document.getElementById('qa-d-dj');if(d&&d.open&&d.classList.contains('dj-sem')&&!d.contains(e.target))d.open=false;});
(function(){var st=document.createElement('style');st.id='rod-rearruma-css';
 var k=TV_ON?'#f3e2b0':EG_ON?'#f3e2b0':'#8a5a14',kb=TV_ON?'#3a2414':EG_ON?'#c9a23a':'#8a5a14',fd=TV_ON?'rgba(255,240,215,.12)':EG_ON?'rgba(255,240,200,.12)':'rgba(255,248,225,.55)',tx=TV_ON||EG_ON?'#f3e2b0':'#5a3a10';
 var R='html body:not(.zz9):not(.zz8) #hero-box#hero-box>.bn-rod';
 st.textContent=[
 '#lat-spot,#qa-hermes,#lat-orb{display:none!important}',
 /* faixa da base: diário compacto + em andamento */
 R+'{display:flex!important;align-items:center!important;gap:10px!important;padding-left:28px!important;padding-right:28px!important}',
 R+' .br-db{flex:1 1 auto!important;min-width:0!important;gap:6px!important}',
 R+' .br-k{font-size:7.5px!important;letter-spacing:.14em!important;white-space:normal!important;max-width:60px;line-height:1.25}',
 R+' .br-slot{flex:1 1 auto!important;min-width:150px!important;width:auto!important}',
 R+' .regdia .rdent input{flex:1 1 auto!important;min-width:90px!important;width:auto!important}',
 R+' .regdia .rdent{gap:4px!important}',
 R+' .regdia .rdent input{height:30px!important;min-height:0!important;padding:0 8px!important;font-size:12px!important}',
 R+' .regdia .rdent>button{height:30px!important;min-height:0!important;padding:0 7px!important;font-size:11px!important;flex:none!important}',
 R+' .br-ver{height:30px!important;padding:0 8px!important;font-size:9px!important}',
 R+' .br-gav button{padding:3px 8px!important}',
 R+'>.br-orb{flex:0 0 228px;display:flex;flex-direction:column;gap:2px;padding-left:10px;border-left:1px solid '+kb+'}',
 R+'>.br-orb>.br-k{font:700 7.5px var(--mono,monospace)!important;letter-spacing:.18em!important;text-transform:uppercase;color:'+tx+';opacity:.8;max-width:none}',
 R+' .br-orb #orbp{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:2px 4px!important;margin:0!important;padding:0!important;border:0!important;background:none!important}',
 R+' .br-orb #orbp .ob{display:flex!important;flex-direction:column;min-width:0;padding:1px 5px 2px!important;margin:0!important;border:1px solid '+kb+'!important;border-radius:3px!important;background:'+fd+'!important;box-shadow:none!important;height:auto!important;min-height:0!important}',
 R+' .br-orb #orbp .ob .k8{font:600 6.5px var(--mono,monospace)!important;letter-spacing:.12em!important;text-transform:uppercase;color:'+tx+'!important;opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0!important}',
 R+' .br-orb #orbp .ob input{all:unset;width:100%;font:11px Georgia,serif;color:'+tx+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 /* Crônicas no campo da semana (Programação) */
 '.tbcab{position:relative;flex-wrap:nowrap!important}',
 '.tbcab>.k9,.tbcab .tb-dt,.tbcab .tb-dt *,.tbcab>button{white-space:nowrap!important}',
 '.tbcab>.tbsub{flex:1 1 auto!important;min-width:0!important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap!important}',
 '.tbcab>#qa-d-dj.dj-sem{position:relative;flex:none;margin:0 0 0 6px!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important;align-self:center}',
 '.tbcab>#qa-d-dj.dj-sem>summary{display:flex!important;align-items:center;gap:6px;min-height:0!important;padding:3px 9px!important;border:1px solid var(--line2,#b9a77a)!important;border-radius:3px;background:var(--panel,#fbf5e6)!important;cursor:pointer;list-style:none}',
 '.tbcab>#qa-d-dj.dj-sem>summary::-webkit-details-marker{display:none}',
 '.tbcab>#qa-d-dj.dj-sem>summary .qa-ic{width:16px!important;height:16px!important}',
 '.tbcab>#qa-d-dj.dj-sem>summary .qa-sk,.tbcab>#qa-d-dj.dj-sem>summary .qa-deus{display:none!important}',
 '.tbcab>#qa-d-dj.dj-sem>summary b{font:700 11.5px Georgia,serif!important;white-space:nowrap}',
 '.tbcab>#qa-d-dj.dj-sem>summary::after{display:none!important}',
 '.tbcab>#qa-d-dj.dj-sem>.qa-sb{position:absolute;right:0;top:calc(100% + 6px);z-index:40;width:400px;max-width:70vw;padding:10px 12px!important;background:var(--panel,#fbf5e6);border:1px solid var(--line2,#b9a77a);box-shadow:0 10px 24px -10px rgba(30,20,10,.5)}',
 '.tbcab>#qa-d-dj.dj-sem>.qa-sb::before{content:attr(data-sub);display:block;margin-bottom:6px;font:600 8px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;opacity:.7}'
 ].join('\n');document.head.appendChild(st);})();


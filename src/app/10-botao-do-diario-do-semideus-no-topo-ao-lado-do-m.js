
/* ---------- botão do Diário do Semideus no topo, ao lado do modo claro/escuro ---------- */
var DS_IR=false;
function dsVai(){var dh=document.querySelector('#fc-dlg .cf-dh');if(!dh)return false;dh.scrollIntoView({block:'start',behavior:'smooth'});var t=document.getElementById('cf-nova');if(t)setTimeout(function(){try{t.focus({preventScroll:true});}catch(e){}},350);return true;}
function dsAbreDiario(){fcAbreDlg();setTimeout(function(){if(CF.chave){dsVai();}else{DS_IR=true;var s=document.getElementById('cf-s1');if(s){s.scrollIntoView({block:'center'});s.focus();}}},60);}
cfDiario=(function(d0){return function(){var r=d0.apply(this,arguments);if(DS_IR&&CF.chave){DS_IR=false;setTimeout(dsVai,80);}return r;};})(cfDiario);
function dsBotao(){var t=document.getElementById('vx-tema');if(!t||document.getElementById('vx-diario'))return;
 var b=document.createElement('button');b.type='button';b.id='vx-diario';b.className='vx-tema vx-ic';b.title='Diário do Semideus';b.setAttribute('aria-label','Abrir o Diário do Semideus');
 b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/><path d="M12 6.5c1.6 1.3 2 2.6.9 3.9-.6.7-1.8.7-2.3-.1-.4-.6-.2-1.3.4-1.8"/></svg>';
 b.addEventListener('click',dsAbreDiario);t.parentNode.insertBefore(b,t.nextSibling);}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{dsBotao();}catch(e){}return x;};try{dsBotao();}catch(e){}})();

/* ---------- Planner do dia (tema Astronáutica) ----------
   Relógio, calendário do mês, três prioridades e checklist de fim de dia,
   no topo do Convés. Dados em S.plan[dia] = {top:[{t,ok}×3], fim:{chave:true}}.
   Cada prioridade concluída vale +5 XP; checklist completo vale +10 XP. */
var PL_FIM=[['ciclo','Fechei o ciclo no app'],['amanha','Anotei a próxima ação de amanhã'],['grade','Conferi a grade de amanhã'],
 ['ordem','Deixei mesa e quarto em ordem'],['tela','Telas desligadas até as 22h']];
var PL_DIAS=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
var PL_MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.plan=(p&&p.plan&&typeof p.plan==='object')?p.plan:{};return b;};})();
function plDia(d){S.plan=S.plan||{};var x=S.plan[d];if(!x){x=S.plan[d]={top:[{t:'',ok:false},{t:'',ok:false},{t:'',ok:false}],fim:{}};}
 x.top=Array.isArray(x.top)?x.top:[];while(x.top.length<3)x.top.push({t:'',ok:false});x.fim=x.fim||{};return x;}
(function(){var x0=gmXP;gmXP=function(){var x=x0(),p=0;Object.keys(S.plan||{}).forEach(function(d){var o=S.plan[d]||{};
  (o.top||[]).forEach(function(t){if(t&&t.ok&&(t.t||'').trim())p+=5;});
  if(o.fim&&PL_FIM.every(function(f){return o.fim[f[0]];}))p+=10;});x.plano=p;x.total+=p;return x;};})();
GM_REGRAS.push(['prioridade do dia concluída','+5'],['checklist de fim de dia completo','+10']);
function plDois(n){return String(n).padStart(2,'0');}
function plRelogio(){var d=new Date();return '<div class="pl-flip" aria-label="'+plDois(d.getHours())+':'+plDois(d.getMinutes())+'"><b>'+plDois(d.getHours())+'</b><b>'+plDois(d.getMinutes())+'</b><b class="s">'+plDois(d.getSeconds())+'</b></div>';}
function plCal(){var h=hoje(),p=h.split('-'),y=+p[0],m=+p[1]-1,hd=+p[2],ini=new Date(y,m,1),off=ini.getDay(),dias=new Date(y,m+1,0).getDate(),i,c='';
 var marcos={};try{(CONC.marcos||[]).forEach(function(k){marcos[k.d]=k.t;});}catch(e){}
 c+='<div class="pl-cal-h">'+PL_MESES[m]+' '+y+'</div><div class="pl-cal">'+['D','S','T','Q','Q','S','S'].map(function(x){return '<i>'+x+'</i>';}).join('');
 for(i=0;i<off;i++)c+='<span></span>';
 for(i=1;i<=dias;i++){var ds=y+'-'+plDois(m+1)+'-'+plDois(i),cls=(i===hd?'hj':'')+(marcos[ds]?' mc':'')+(ds<h?' foi':'');
  c+='<span class="'+cls+'"'+(marcos[ds]?' title="'+esc(marcos[ds])+'"':'')+'>'+i+'</span>';}
 return c+'</div>';}
function plHTML(){var h=hoje(),x=plDia(h),d=new Date(),ok=x.top.filter(function(t){return t.ok&&(t.t||'').trim();}).length,
 fimOk=PL_FIM.filter(function(f){return x.fim[f[0]];}).length;
 var html='<div class="pl-row" id="pl-row">';
 html+='<div class="pl-w pl-clock"><span class="pl-k">'+PL_DIAS[d.getDay()]+'</span><div id="pl-relogio">'+plRelogio()+'</div><span class="pl-sub">'+d.getDate()+' de '+PL_MESES[d.getMonth()]+'</span></div>';
 html+='<div class="pl-w pl-calw">'+plCal()+'</div>';
 html+='<div class="pl-w pl-top"><div class="pl-wh"><span class="pl-k">três prioridades</span><b class="pl-n">'+ok+'/3</b></div><ol>'+
  x.top.slice(0,3).map(function(t,i){return '<li class="'+(t.ok?'ok':'')+'"><input type="checkbox" data-plt="'+i+'" aria-label="Prioridade '+(i+1)+' concluída"'+(t.ok?' checked':'')+'>'+
   '<input type="text" data-pltx="'+i+'" maxlength="80" placeholder="'+(i===0?'a que mais importa hoje':'prioridade '+(i+1))+'" value="'+esc(t.t||'').replace(/"/g,'&quot;')+'"></li>';}).join('')+'</ol></div>';
 html+='<div class="pl-w pl-fim"><div class="pl-wh"><span class="pl-k">fim do dia</span><b class="pl-n">'+fimOk+'/'+PL_FIM.length+'</b></div><ul>'+
  PL_FIM.map(function(f){return '<li class="'+(x.fim[f[0]]?'ok':'')+'"><label><input type="checkbox" data-plf="'+f[0]+'"'+(x.fim[f[0]]?' checked':'')+'><span>'+f[1]+'</span></label></li>';}).join('')+'</ul></div>';
 return html+'</div>';}
function plPos(){if(apTema()!=='astro')return;var v=vxData();if(v.view!=='op'||v.edit)return;var body=document.getElementById('vx-body');if(!body||document.getElementById('pl-row'))return;
 body.insertAdjacentHTML('afterbegin',plHTML());var row=document.getElementById('pl-row');
 row.addEventListener('change',function(e){var t=e.target,x=plDia(hoje());
  if(t.dataset.plt!=null){x.top[+t.dataset.plt].ok=t.checked;grava();vxRender();return;}
  if(t.dataset.pltx!=null){x.top[+t.dataset.pltx].t=t.value.trim();grava();return;}
  if(t.dataset.plf){x.fim[t.dataset.plf]=t.checked;if(t.checked&&PL_FIM.every(function(f){return x.fim[f[0]];}))try{anota('Fim do dia fechado: checklist completo.',0,false);}catch(z){}grava();vxRender();}});
 row.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.dataset.pltx!=null){e.preventDefault();e.target.blur();}});}
setInterval(function(){var r=document.getElementById('pl-relogio');if(r&&document.visibilityState==='visible')r.innerHTML=plRelogio();},1000);
(function(){var r0=vxRender;vxRender=function(){r0();try{plPos();}catch(e){console.error('planner:',e);}};})();
/* enfeites do cabeçalho no visual do acampamento (só aparecem no modo claro) */
function cpEnfeita(){var h=document.querySelector('.vx-hero');if(!h||h.querySelector('.cp-postal'))return;
 h.insertAdjacentHTML('beforeend','<div class="cp-postal" aria-hidden="true"><div class="fr"><div><small>Greetings from</small><b>Camp<br>Half-Blood</b><span>Long Island, N.Y.</span></div></div><svg class="cp-selo" viewBox="0 0 44 52"><defs><mask id="cpSeloM"><rect width="44" height="52" fill="#fff"/><g fill="#000">'+[4,12,20,28,36,44].map(function(x){return '<circle cx="'+x+'" cy="0" r="2.2"/><circle cx="'+x+'" cy="52" r="2.2"/>';}).join('')+[4,12,20,28,36,44,52].map(function(y){return '<circle cx="0" cy="'+y+'" r="2.2"/><circle cx="44" cy="'+y+'" r="2.2"/>';}).join('')+'</g></mask></defs><rect width="44" height="52" fill="#fffdf4" mask="url(#cpSeloM)"/><rect x="5" y="5" width="34" height="42" fill="#2d4a6c"/><circle cx="22" cy="22" r="9" fill="#f2a33a"/><g stroke="#f2a33a" stroke-width="1.3" stroke-linecap="round">'+[0,1,2,3,4,5,6,7].map(function(i){var a=i*Math.PI/4;return '<path d="M'+(22+12*Math.cos(a)).toFixed(1)+' '+(22+12*Math.sin(a)).toFixed(1)+' L'+(22+15*Math.cos(a)).toFixed(1)+' '+(22+15*Math.sin(a)).toFixed(1)+'"/>';}).join('')+'</g><path d="M14 22h16M26 18l4 4-4 4" stroke="#2d4a6c" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="22" y="43" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="7" fill="#fff4d4">ΔΩ · 3¢</text></svg><svg class="cp-carimbo" viewBox="0 0 58 40" fill="none" stroke="#3a2f4a" stroke-width="1.2"><circle cx="18" cy="20" r="15"/><circle cx="18" cy="20" r="11"/><text x="18" y="18" text-anchor="middle" font-family="Georgia,serif" font-size="4.6" fill="#3a2f4a" stroke="none">LONG IS.</text><text x="18" y="25" text-anchor="middle" font-family="Georgia,serif" font-size="4.6" fill="#3a2f4a" stroke="none">N.Y.</text><path d="M33 12q6-3 12 0t12 0M33 20q6-3 12 0t12 0M33 28q6-3 12 0t12 0"/></svg></div>'+
  '<div class="cp-dracmas" title="dracmas"><i class="mosaico">Δ</i><i class="mosaico">Ω</i><i class="mosaico">Ψ</i><i class="mosaico">Δ</i></div>');}
(function(){var r0=vxRender;vxRender=function(){r0();try{cpEnfeita();}catch(e){console.error('cabeçalho:',e);}};})();
/* ---------- Acampamento: horário do dia, colar de contas, Captura da Bandeira e Guia do Campista ---------- */
var AC_MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
var AC_GLIFOS=['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ω','Ψ','Φ','Σ','☉','☾','✦'];
var AC_CORES=['#d99b52','#c9a227','#7f9a68','#6b8fb3','#b86b5a','#9a7bb0'];
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);
 b.colar=(p&&p.colar&&typeof p.colar==='object')?p.colar:{};b.bandeira=(p&&p.bandeira&&typeof p.bandeira==='object')?p.bandeira:{};
 b.guiaVisto=!!(p&&p.guiaVisto);return b;};})();
(function(){var x0=gmXP;gmXP=function(){var x=x0(),f=0;Object.keys(S.bandeira||{}).forEach(function(k){if(S.bandeira[k]&&S.bandeira[k].ok)f+=20;});
 x.bandeira=f;x.total+=f;return x;};})();
GM_REGRAS.push(['bandeira da semana capturada','+20']);
function acDois(n){return String(n).padStart(2,'0');}
function acMesK(d){return d.getFullYear()+'-'+acDois(d.getMonth()+1);}
function acSeg(d){d=new Date(d);var w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);d.setHours(0,0,0,0);return d;}
function acIso(d){return d.getFullYear()+'-'+acDois(d.getMonth()+1)+'-'+acDois(d.getDate());}
function acColarHTML(){var hoje0=new Date(),ano=hoje0.getFullYear(),atual=hoje0.getMonth(),C=S.colar||{},h='',n=0;
 for(var m=0;m<12;m++){var k=ano+'-'+acDois(m+1),c=C[k],fut=m>atual;if(c&&c.t)n++;
  var est=fut?'fut':(c&&c.t?'ok':'sem'),cor=c&&c.c?c.c:AC_CORES[m%AC_CORES.length];
  h+='<button type="button" class="ac-conta '+est+(m===atual?' atual':'')+'" data-ac-mes="'+k+'"'+(fut?' disabled':'')+
   ' title="'+AC_MES[m]+(c&&c.t?': '+esc(c.t):fut?' (ainda não chegou)':' (sem conta)')+'"'+(est==='ok'?' style="--cc:'+cor+'"':'')+'>'+
   (est==='ok'?esc(c.g||'Δ'):'')+'</button>';}
 var at=C[ano+'-'+acDois(atual+1)];
 return '<div class="ac-card ac-colar"><div class="ac-cab"><span class="ac-k">colar de contas · '+ano+'</span><b class="ac-n">'+n+'/12</b></div>'+
  '<div class="ac-fio">'+h+'</div>'+
  '<p class="ac-nota">'+(at&&at.t?'Conta de '+AC_MES[atual]+': <b>'+esc(at.t)+'</b>.':'A conta de <b>'+AC_MES[atual]+'</b> ainda está em branco. Toque nela e escreva o marco do mês.')+'</p></div>';}
function acBandeiraHTML(){var seg=acSeg(new Date()),k=acIso(seg),B=S.bandeira||{},b=B[k]||{},sex=new Date(seg);sex.setDate(sex.getDate()+4);
 var hj=new Date();hj.setHours(0,0,0,0);var faltam=Math.round((sex-hj)/864e5);
 var prazo=b.ok?'capturada':(faltam>0?'faltam '+faltam+(faltam===1?' dia':' dias')+' para sexta':faltam===0?'é hoje, sexta':'passou de sexta: ainda dá até domingo');
 var hist='';for(var i=4;i>=1;i--){var d=new Date(seg);d.setDate(d.getDate()-7*i);var x=B[acIso(d)];
  hist+='<i class="ac-flag '+(x&&x.ok?'ok':x&&x.meta?'perdida':'vazia')+'" title="semana de '+acDois(d.getDate())+'/'+acDois(d.getMonth()+1)+(x&&x.meta?': '+esc(x.meta):'')+'"></i>';}
 return '<div class="ac-card ac-band'+(b.ok?' ok':'')+'"><div class="ac-cab"><span class="ac-k">captura da bandeira · semana de '+acDois(seg.getDate())+'/'+acDois(seg.getMonth()+1)+'</span><b class="ac-n">+20 XP</b></div>'+
  '<input class="ac-meta" data-ac-meta="'+k+'" maxlength="90" placeholder="qual é a bandeira desta semana?" value="'+esc(b.meta||'').replace(/"/g,'&quot;')+'">'+
  '<div class="ac-linha"><label class="ac-chk"><input type="checkbox" data-ac-ok="'+k+'"'+(b.ok?' checked':'')+(b.meta?'':' disabled')+'><span>bandeira capturada</span></label>'+
  '<span class="ac-prazo">'+prazo+'</span></div><div class="ac-hist"><span>últimas semanas</span>'+hist+'</div></div>';}
function acPos(){var v=vxData();if(v.view!=='op'||v.edit)return;var body=document.getElementById('vx-body');if(!body||document.getElementById('ac-row'))return;
 var html='<div class="ac-row" id="ac-row">'+acColarHTML()+acBandeiraHTML()+'</div>',pl=document.getElementById('pl-row');
 if(pl)pl.insertAdjacentHTML('afterend',html);else body.insertAdjacentHTML('afterbegin',html);
 var row=document.getElementById('ac-row');
 row.addEventListener('click',function(e){var c=e.target.closest('[data-ac-mes]');if(!c||c.disabled)return;var k=c.dataset.acMes,at=(S.colar||{})[k]||{},m=+k.slice(5)-1;
  vxDlg({titulo:'Conta de '+AC_MES[m],texto:'Toda conta guarda o marco do mês: a vitória, a virada ou o que você sobreviveu. Símbolos: '+AC_GLIFOS.join(' '),
   campos:[{label:'Marco do mês',valor:at.t||''},{label:'Símbolo da conta',valor:at.g||AC_GLIFOS[m%AC_GLIFOS.length]}],ok:'pendurar no colar',
   onOk:function(vals){S.colar=S.colar||{};if(!vals[0]){delete S.colar[k];}else S.colar[k]={t:vals[0].slice(0,90),g:(Array.from(vals[1]||'Δ')[0]||'Δ'),c:at.c||AC_CORES[m%AC_CORES.length]};
    grava();vxRender();if(vals[0])acLouros('Conta de '+AC_MES[m],'pendurada no colar');}});});
 row.addEventListener('change',function(e){var t=e.target;
  if(t.dataset.acMeta){S.bandeira=S.bandeira||{};var b=S.bandeira[t.dataset.acMeta]=S.bandeira[t.dataset.acMeta]||{};b.meta=t.value.trim().slice(0,90);if(!b.meta)b.ok=false;grava();vxRender();return;}
  if(t.dataset.acOk){var b2=(S.bandeira||{})[t.dataset.acOk];if(!b2)return;b2.ok=t.checked;b2.quando=t.checked?hoje():null;grava();
   if(t.checked){try{anota('Bandeira da semana capturada: '+esc(b2.meta)+'.',0,false);}catch(z){}acLouros('Bandeira capturada','+20 XP');}vxRender();}});
 row.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.dataset.acMeta){e.preventDefault();e.target.blur();}});}
(function(){var r0=vxRender;vxRender=function(){r0();try{acPos();}catch(e){console.error('acampamento:',e);}};})();


/* Guia do Campista */
var AC_GUIA=[
 ['Bem-vindo, meio-sangue','Se você abriu isto, o pior já passou: alguém te reconheceu, você chegou inteiro e ganhou um chalé. Este app é o acampamento inteiro no bolso. Ele não exige que você seja um herói o dia todo. Exige só o próximo passo.'],
 ['As regras da casa','<ol><li><b>Um bloco de cada vez.</b> Quíron nunca cobrou a lista inteira de ninguém.</li><li><b>Três missões por dia, no máximo.</b> Profecias longas demais terminam mal.</li><li><b>Dia ruim também conta.</b> Sobreviver é uma atividade oficial do acampamento.</li><li><b>Anote antes de esquecer.</b> A Névoa apaga tudo o que fica só na cabeça.</li><li><b>Fechou o dia, apaga a fogueira.</b> O checklist de fim de dia existe por um motivo.</li></ol>'],
 ['O dia no acampamento','<ul class="ac-horas"><li><b>06h</b> alvorada e treino leve</li><li><b>09h</b> treino na arena: o bloco mais pesado do dia</li><li><b>12h</b> almoço no pavilhão</li><li><b>15h</b> atividades do acampamento</li><li><b>18h</b> jantar e oferenda à fogueira</li><li><b>21h</b> fogueira e toque de recolher</li></ul>A faixa de agora aparece na Casa Grande e na extensão. O que você escreve na Semana vira a escala de cada faixa.'],
 ['As abas e os painéis','<ul><li><b>Casa Grande</b>: o banner com o mural e o registro do dia, a Grade semanal, o spread do mês e o rastreador de hábitos.</li><li><b>Missões</b>: o Mural de Missões (tarefas do Chalé, Diárias e do Conselho, as missões do Oráculo e o desafio da Profecia) e o Bunker 9, com projetos e retomadas.</li><li><b>Laptop de Dédalo</b>, à direita: Táticas de Guerra (concurso e roda do ciclo) e Grego Antigo e Outras (línguas).</li><li><b>Arsenal</b>: o kit do Hékatos e a forja abrem pelo menu de ferramentas ou pelo cartão do Arsenal, à esquerda.</li><li><b>Bolsa de Dracmas</b>: o seu dinheiro de verdade, com Diário de Bordo, Carga, Enfermaria e Bunker 9.</li><li><b>À esquerda</b>: nível, arsenal, Dracmas de Ouro, Copa dos Chalés, colar, bandeira, vitórias e a Enfermaria do Acampamento.</li></ul>'],
 ['Dracmas, XP e nível','Foco, estudo, hábitos, missões e etapas rendem XP. A cada 100 XP você sobe de nível. As <b>Dracmas de Ouro</b> são a moeda do acampamento: 10 por hora de foco ou de estudo. Com elas você compra temas de chalé, insígnias do crachá e sons ambientes na Loja do acampamento (ícone de ferramentas, no alto). A <b>Bolsa de Dracmas</b> é outra coisa: é o seu dinheiro de verdade, na aba 05.'],
 ['Colar de contas','No fim de cada verão os campistas ganham uma conta com o símbolo do que viveram. Aqui é uma por mês: toque na conta do mês, escreva o marco e escolha o símbolo. Em dezembro você tem o ano inteiro pendurado no pescoço.'],
 ['Captura da Bandeira','Toda semana tem uma bandeira: a meta que, se cair até sexta, vale a semana. Escreva qual é na segunda, capture até sexta (com tolerância até domingo) e ganhe +20 XP. As bandeiras das últimas semanas ficam marcadas embaixo.'],
 ['A extensão','Pelo atalho Alt+Shift+A você abre o acampamento de qualquer aba do navegador: treino com timer, ciclo de estudos, humor, contadores, captura, hábitos e gastos. Tudo chega aqui na próxima sincronização.']];
function acGuia(){var w=document.getElementById('ac-guia');if(w)w.remove();w=document.createElement('div');w.id='ac-guia';w.setAttribute('role','dialog');w.setAttribute('aria-label','Guia do Campista');
 w.innerHTML='<div class="acg-bk"></div><div class="acg-bx"><button type="button" class="acg-x" aria-label="Fechar">✕</button>'+
  '<span class="acg-k">guia de sobrevivência</span><h2>Guia do Campista</h2>'+
  '<nav class="acg-ix">'+AC_GUIA.map(function(g,i){return '<button type="button" data-acg="'+i+'">'+g[0]+'</button>';}).join('')+'</nav>'+
  '<div class="acg-corpo">'+AC_GUIA.map(function(g,i){return '<section id="acg-'+i+'"><h3>'+g[0]+'</h3><div>'+g[1]+'</div></section>';}).join('')+'</div></div>';
 document.body.appendChild(w);
 function fecha(){w.remove();if(!S.guiaVisto){S.guiaVisto=true;grava();}}
 w.querySelector('.acg-x').onclick=fecha;w.querySelector('.acg-bk').onclick=fecha;
 w.addEventListener('keydown',function(e){if(e.key==='Escape')fecha();});
 w.querySelector('.acg-ix').onclick=function(e){var b=e.target.closest('[data-acg]');if(!b)return;var t=w.querySelector('#acg-'+b.dataset.acg);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});};
 try{w.querySelector('.acg-x').focus();}catch(e){}}
function acGuiaBotao(){var h=document.querySelector('.vx-hero');if(!h||h.querySelector('.cp-guia'))return;
 h.insertAdjacentHTML('beforeend','<button type="button" class="cp-guia">Guia do Campista</button>');h.querySelector('.cp-guia').onclick=acGuia;}
(function(){var r0=vxRender;vxRender=function(){r0();try{acGuiaBotao();}catch(e){console.error('guia:',e);}};})();
setTimeout(function(){try{if(!S.guiaVisto)acGuia();}catch(e){}},1200);
/* ---------- Referências do acampamento: medalhão do Chalé 7, louros, carta do dia e mosaico ---------- */
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);
 b.campista=(p&&p.campista&&typeof p.campista==='object')?p.campista:{nome:'Duke',chale:'7'};
 b.tarot=(p&&p.tarot&&typeof p.tarot==='object')?p.tarot:{};b.louro=(p&&p.louro&&typeof p.louro==='object')?p.louro:{};return b;};})();
function acCampista(){S.campista=S.campista||{nome:'Duke',chale:'7'};return S.campista;}
/* medalhão: sol de raios ondulados num anel de grega */
function acMedalha(nivel,px){var c=acCampista(),u='',i,R=86,n=30,w=2*Math.PI*R/n,sx=w/24;
 for(i=0;i<n;i++)u+='<g transform="rotate('+(i*360/n)+' 100 100) translate('+(100-w/2).toFixed(2)+' '+(100-R-6)+') scale('+sx.toFixed(3)+')"><path d="M0 11H22V1H6V8H17V5H11"/></g>';
 var raios='';for(i=0;i<12;i++)raios+='<path transform="rotate('+(i*30)+' 100 82)" d="M100 58c-5-5 5-9 0-14s5-9 0-14"/>';
 return '<svg class="ac-medalha" viewBox="0 0 200 200" width="'+(px||92)+'" height="'+(px||92)+'" role="img" aria-label="Medalhão do Chalé '+esc(c.chale)+': '+esc(c.nome)+', nível '+nivel+'">'+
  '<defs><radialGradient id="acOuro" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fbe7a1"/><stop offset=".6" stop-color="#e0b65a"/><stop offset="1" stop-color="#b07f2c"/></radialGradient></defs>'+
  '<circle cx="100" cy="100" r="97" fill="url(#acOuro)" stroke="#8a5f1e" stroke-width="2"/>'+
  '<g fill="none" stroke="#7a5418" stroke-width="2.4" stroke-linecap="square" opacity=".85">'+u+'</g>'+
  '<circle cx="100" cy="100" r="72" fill="#f6e7b6" stroke="#8a5f1e" stroke-width="2"/>'+
  '<g fill="none" stroke="#b47a22" stroke-width="3.2" stroke-linecap="round">'+raios+'</g>'+
  '<circle cx="100" cy="82" r="19" fill="#e9b54a" stroke="#a46d1c" stroke-width="2.5"/>'+
  '<text x="100" y="89" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="21" fill="#5b3814">'+nivel+'</text>'+
  '<text x="100" y="132" text-anchor="middle" font-family="Georgia,serif" font-weight="900" font-size="22" letter-spacing="3" fill="#6b4413">'+esc(String(c.nome).toUpperCase().slice(0,12))+'</text>'+
  '<text x="100" y="152" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="11" letter-spacing="2.5" fill="#8a5f1e">CHALÉ '+esc(c.chale)+'</text></svg>';}
function acEditaCampista(){var c=acCampista();
 vxDlg({titulo:'Ficha do campista',texto:'Como o acampamento te chama e em qual chalé você dorme.',campos:[{label:'Nome de campista',valor:c.nome},{label:'Chalé',valor:c.chale}],ok:'gravar',
  onOk:function(v){c.nome=(v[0]||'Duke').slice(0,16);c.chale=(v[1]||'7').slice(0,4);grava();vxRender();}});}
function acMedalhaPos(){var x=gmXP(),nv=gmNivel(x.total),c=acCampista();
 var g=document.querySelector('#lat-gm .gm-l')||document.querySelector('#vx .gm:not(.gm-c) .gm-l');
 if(g&&!g.querySelector('.ac-medalha-bt')){g.classList.add('ac-tem-medalha');g.insertAdjacentHTML('afterbegin','<button type="button" class="ac-medalha-bt mosaico" title="Editar ficha do campista">'+acMedalha(nv.n,92)+'</button>');
  g.querySelector('.ac-medalha-bt').onclick=acEditaCampista;}
 var h=document.querySelector('.vx-hero');if(!h)return;var k=h.querySelector(':scope>.vx-k');
 if(k&&!k.querySelector('.ac-cracha-bt')){k.classList.add('ac-cracha');
  k.innerHTML='<button type="button" class="ac-cracha-bt" title="Editar ficha do campista">'+acMedalha(nv.n,46)+'</button><span><b>Chase Maverick '+esc(c.nome)+' · o Hékatos</b><br>Chalé '+esc(c.chale)+' · nível '+nv.n+' · '+x.total+' XP</span>';
  k.querySelector('.ac-cracha-bt').onclick=acEditaCampista;}}
/* o cartão de nível e o cabeçalho são redesenhados por outras partes do app: o medalhão volta sempre que somem */
var acDecT=0;function acDecora(){clearTimeout(acDecT);acDecT=setTimeout(function(){try{acMedalhaPos();}catch(e){console.error('medalhão:',e);}},30);}
(function(){var r0=vxRender;vxRender=function(){r0();acDecora();try{acLouroMeta();}catch(e){}};})();
try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;if(t.closest&&t.closest('.ac-medalha-bt,.ac-cracha-bt'))continue;acDecora();return;}})
 .observe(document.getElementById('vx')||document.body,{childList:true,subtree:true});}catch(e){}

/* coroa de louros nas conquistas */
function acCoroa(){var f='',i,lado;for(lado=-1;lado<=1;lado+=2)for(i=0;i<9;i++){var a=(118+i*15)*Math.PI/180,x=100+lado*Math.cos(a)*-62,y=100+Math.sin(a)*62,
  rot=(lado<0?(118+i*15)+90:-(118+i*15)-90);
  f+='<ellipse cx="'+(x).toFixed(1)+'" cy="'+(y).toFixed(1)+'" rx="11" ry="4.6" transform="rotate('+((lado<0?(i*15+28):-(i*15+28))).toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>';}
 return '<svg class="ac-coroa" viewBox="0 0 200 200" aria-hidden="true"><path d="M58 150C30 120 34 70 70 46M142 150c28-30 24-80-12-104" fill="none" stroke="#4f6b3a" stroke-width="3" stroke-linecap="round"/>'+
  '<g fill="#6f8d4f" stroke="#3f5a2e" stroke-width="1.2">'+f+'</g><path d="M92 156c4 6 12 6 16 0" fill="none" stroke="#b98c47" stroke-width="4" stroke-linecap="round"/></svg>';}
function acLouros(titulo,sub){var w=document.getElementById('ac-louros');if(w)w.remove();w=document.createElement('div');w.id='ac-louros';w.setAttribute('role','status');
 w.innerHTML='<div class="acl-bx">'+acCoroa()+'<b>'+esc(titulo)+'</b>'+(sub?'<span>'+esc(sub)+'</span>':'')+'</div>';document.body.appendChild(w);
 w.onclick=function(){w.remove();};setTimeout(function(){w.classList.add('sai');},2300);setTimeout(function(){w.remove();},2900);}
function acLouroMeta(){var d=hoje();S.louro=S.louro||{};if(S.louro.meta===d)return;try{if(!gmDiaOk(d))return;}catch(e){return;}
 S.louro.meta=d;grava();acLouros('Meta do dia batida','o acampamento inteiro viu');}

/* carta do dia: Arcanos Maiores, sorteada uma vez por dia */
var AC_ARCANOS=[['0','O Louco','✦','Pule primeiro. O mapa se desenha no caminho.'],['I','O Mago','Δ','As ferramentas já estão na mesa. Escolha uma e comece.'],
 ['II','A Sacerdotisa','☾','Antes de agir, escute o que ficou em silêncio.'],['III','A Imperatriz','❦','Cuide do que está crescendo. Regar também é trabalho.'],
 ['IV','O Imperador','▣','Hoje a estrutura vence a vontade. Monte a grade e siga.'],['V','O Hierofante','Ψ','Volte ao método que já funcionou. Tradição também é atalho.'],
 ['VI','Os Enamorados','∞','Uma escolha de cada vez. Dizer sim a uma coisa é dizer não a outra.'],['VII','O Carro','Λ','Segure as rédeas e vá. Movimento resolve mais que plano.'],
 ['VIII','A Força','Ω','Coragem é fazer com calma o que dá medo.'],['IX','O Eremita','◌','Um bloco sozinho, em silêncio, rende mais que o dia inteiro com barulho.'],
 ['X','A Roda da Fortuna','◎','O ciclo gira. Aproveite a subida e não brigue com a descida.'],['XI','A Justiça','Σ','Feche as contas: o que você prometeu, o que você entregou.'],
 ['XII','O Enforcado','Θ','Pausa não é derrota. Às vezes o ângulo certo vem de cabeça para baixo.'],['XIII','A Morte','Φ','Encerre algo hoje. O que termina abre espaço.'],
 ['XIV','A Temperança','≈','Nem tudo nem nada: a dose certa é a que dá para repetir amanhã.'],['XV','O Diabo','Ξ','Note a corrente que te prende a uma tela. Solte um elo.'],
 ['XVI','A Torre','Π','Se algo desabar, era frágil. Reconstrua com tijolo melhor.'],['XVII','A Estrela','✧','Esperança com tarefa: um passo pequeno na direção certa.'],
 ['XVIII','A Lua','◑','Nem todo medo é aviso. Confira antes de fugir.'],['XIX','O Sol','☉','Dia de brilhar sem pedir licença. Mostre o que fez.'],
 ['XX','O Julgamento','Γ','Olhe para trás com gentileza e chame a próxima versão de você.'],['XXI','O Mundo','◯','Um ciclo se fecha. Comemore antes de abrir outro.']];
function acCartaIdx(d){var h=0,s=d+'|'+(acCampista().nome||'');for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h%22;}
function acCartaHTML(){var d=hoje(),T=S.tarot||{},vira=T.dia===d,c=AC_ARCANOS[acCartaIdx(d)];
 return '<div class="ac-card ac-tarot"><div class="ac-cab"><span class="ac-k">carta do dia</span><b class="ac-n">'+(vira?c[0]:'?')+'</b></div>'+
  '<div class="ac-tarot-c"><button type="button" class="ac-carta'+(vira?' aberta':'')+'" data-ac-carta aria-label="'+(vira?esc(c[1]):'Tirar a carta do dia')+'">'+
  (vira?'<span class="tn">'+c[0]+'</span><span class="tg">'+c[2]+'</span><span class="tt">'+esc(c[1])+'</span>':'<span class="tv mosaico"></span>')+'</button>'+
  '<p class="ac-nota">'+(vira?'<b>'+esc(c[1])+'.</b> '+esc(c[3]):'Toque na carta para tirar o arcano de hoje. Ele muda à meia-noite.')+'</p></div></div>';}
(function(){var r0=vxRender;vxRender=function(){r0();try{var row=document.getElementById('ac-row');if(row&&!row.querySelector('.ac-tarot')){row.insertAdjacentHTML('beforeend',acCartaHTML());
  row.querySelector('[data-ac-carta]').onclick=function(){if((S.tarot||{}).dia===hoje())return;S.tarot={dia:hoje(),i:acCartaIdx(hoje())};grava();vxRender();
   var c=AC_ARCANOS[S.tarot.i];acLouros(c[0]+' · '+c[1],'a carta de hoje');};}}catch(e){console.error('carta:',e);}};})();


/* ---------- Ícones no lugar de emoji ----------
   Todo emoji que aparece na tela (app, Cofre, dados salvos) vira um ícone em SVG de traço fino,
   na cor do texto. Em títulos, dicas, campos e opções, onde não cabe SVG, o emoji só sai. */
var ICO_P={
 cal:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 graf:'<path d="M4 20V11M10 20V5M16 20v-7M21 20H3"/>',
 pasta:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 nota:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h5"/>',
 livro:'<path d="M5 5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2z"/><path d="M5 20a2 2 0 0 0 2 1h12v-3"/>',
 aviao:'<path d="M2.5 12.5l19-8-5.5 15-3.5-6z"/><path d="M12.5 13.5l9-9"/>',
 bussola:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
 mapa:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
 pino:'<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
 carrinho:'<path d="M3 4h2l2.4 11h10.6l2-8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
 sacola:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
 cartao:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
 moeda:'<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.4-.9-1.4-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2.1-.6-2.5-1.5M12 6.5v11"/>',
 cadeado:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 aberto:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.6-1.8"/>',
 corrente:'<rect x="2.5" y="9" width="10" height="6" rx="3"/><rect x="11.5" y="9" width="10" height="6" rx="3"/>',
 f5:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8 14c1.2 1.7 2.5 2.5 4 2.5s2.8-.8 4-2.5z"/>',
 f4:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8.5 14.5c1 1 2.2 1.6 3.5 1.6s2.5-.6 3.5-1.6"/>',
 f3:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15.5h6"/>',
 f2:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 16.3c1-.8 2-1.2 3-1.2s2 .4 3 1.2"/>',
 f1:'<circle cx="12" cy="12" r="9"/><path d="M8 9l2 1.5L8 12M16 9l-2 1.5 2 1.5M8.5 17c1.2-1.5 2.3-2.1 3.5-2.1s2.3.6 3.5 2.1"/>',
 lua:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 prato:'<circle cx="12" cy="13" r="5.5"/><path d="M3.5 4v5a2 2 0 0 0 2 2v9M5.5 4v4M20.5 4c-1.5 0-2.5 2-2.5 5s1 3 2.5 3v8"/>',
 relogio:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',
 alvo:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 medalha:'<circle cx="12" cy="15" r="5"/><path d="M8.5 3l2.5 7M15.5 3L13 10"/>',
 estrela:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
 broto:'<path d="M12 20v-8M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 12c0-3 2.5-5 6-5 0 3-2.5 5-6 5z"/>',
 pilula:'<path d="M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7z"/><path d="M7 10l7 7"/>',
 saude:'<path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/>',
 tela:'<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
 jogo:'<rect x="3" y="8" width="18" height="9" rx="4.5"/><path d="M8 11v3M6.5 12.5h3M15.5 12h.01M17.5 13.5h.01"/>',
 gota:'<path d="M12 3.5s6 6.5 6 10.5a6 6 0 0 1-12 0c0-4 6-10.5 6-10.5z"/>',
 peso:'<path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
 mao:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 10.5V4.5a1.5 1.5 0 0 1 3 0v6M14 10.5v-4a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6 7-2.8 0-4.5-1.8-6-4.5L3.4 13a1.5 1.5 0 0 1 2.6-1.5L8 14"/>',
 roupa:'<path d="M8 4L3 7l2 4 2-1v10h10V10l2 1 2-4-5-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4z"/>',
 casa:'<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
 ferramenta:'<path d="M14 6a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 0-2-2z"/>',
 verde:'<circle cx="12" cy="12" r="6.5" fill="#5e8a4f" stroke="none"/>',
 amarelo:'<circle cx="12" cy="12" r="6.5" fill="#d8b44a" stroke="none"/>',
 vermelho:'<circle cx="12" cy="12" r="6.5" fill="#b2472f" stroke="none"/>',
 proibido:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
 ok:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8 12.5l3 3 5-6"/>',
 sino:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 coracao:'<path d="M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7.5 4.5 4.5 0 0 1 19.5 10C19.5 15.5 12 20 12 20z"/>',
 lapis:'<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
 ciclo:'<path d="M4 10a8 8 0 0 1 14-3.5L20 8M20 14a8 8 0 0 1-14 3.5L4 16"/><path d="M20 4v4h-4M4 20v-4h4"/>',
 mente:'<path d="M9.5 4A3 3 0 0 0 6.5 7 3 3 0 0 0 4.5 12a3 3 0 0 0 2 5 3 3 0 0 0 5.5 1.5V5.5A2 2 0 0 0 9.5 4zM14.5 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-5.5 1.5"/>',
 caixa:'<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1.5 2h5l1.5-2h5"/>',
 pena:'<path d="M20 4C10 4 6 10 5 19M20 4c0 8-5 12-11 12M5 19l-1.5 1.5"/>',
 alerta:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
 fogo:'<path d="M12 21c4 0 6.5-2.6 6.5-6 0-4-3-6-4.5-9-.8 2.2-2.2 3.4-3.5 4C10 8 9.5 6 10 3.5 7 5.5 5.5 9.5 5.5 14.5 5.5 18.4 8 21 12 21z"/>',
 balanca:'<path d="M12 4v16M7 20h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>',
 ponto:'<circle cx="12" cy="12" r="3.5"/>'};
var ICO_M={};(function(){var g={cal:'📅📆🗓',graf:'📊📈📉',pasta:'🗂📁📂',nota:'📝📋🗒',livro:'📚📒📓📖',aviao:'✈',bussola:'🧭',mapa:'🗺',pino:'📍📌',
 carrinho:'🛒',sacola:'🛍🎒👛👜',cartao:'💳',moeda:'💰💵💸🪙',cadeado:'🔒🔐',aberto:'🔓',corrente:'⛓',f5:'😄😀😁🤩',f4:'🙂☺😊',f3:'😐😶',f2:'😕😟🙁',f1:'😫😣😩😖',
 lua:'🌙🌛',prato:'🍽🍳🥗',relogio:'⏰⏱⏳⌛⌚⏲',alvo:'🎯',medalha:'🏅🥇🥈🥉🏆',estrela:'⭐🌟',broto:'🌱🌿',pilula:'💊',saude:'🩺🧪🧴🏥',tela:'💻🖥',
 jogo:'🎮🎲🧩🎬🎧🤖',gota:'💧',peso:'🏋🚲🏃',mao:'✋🤝👋',roupa:'👗👕👖👟🧢👚',casa:'🏠🏡',ferramenta:'🔧⚒🛠',verde:'🟢',amarelo:'🟡',vermelho:'🔴',
 proibido:'🚫⛔',ok:'✅',sino:'🔔',coracao:'❤',lapis:'✏',ciclo:'🔁🔄',mente:'🧠',caixa:'📥📦',pena:'🪶',alerta:'⚠',fogo:'🔥',balanca:'⚖'};
 for(var k in g)Array.from(g[k]).forEach(function(c){ICO_M[c]=k;});})();
var ICO_FONTE='(?:[\\u{1F000}-\\u{1FAFF}]|[\\u231A\\u231B\\u23F0-\\u23FA\\u2705\\u2708\\u270B\\u270F\\u2696\\u2692\\u26A0\\u2764\\u2B50\\u263A\\u26D3\\u26D4])\\uFE0F?(?:\\u200D(?:[\\u{1F000}-\\u{1FAFF}]|[\\u2640\\u2642\\u2695])\\uFE0F?)*';
var ICO_RE=new RegExp(ICO_FONTE,'gu'),ICO_T=new RegExp(ICO_FONTE,'u');
var ICO_PULA={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,TITLE:1,NOSCRIPT:1,TEMPLATE:1};
function icoSvg(c){var k=ICO_M[Array.from(c)[0]]||'ponto';return '<svg class="ico ico-'+k+'" viewBox="0 0 24 24" aria-hidden="true">'+ICO_P[k]+'</svg>';}
function icoNo(t){var p=t.parentNode,v=t.nodeValue;if(!p||!v||!ICO_T.test(v))return;
 if(ICO_PULA[p.nodeName]||(p.closest&&p.closest('svg'))){if(p.nodeName!=='SCRIPT'&&p.nodeName!=='STYLE')t.nodeValue=v.replace(ICO_RE,'').replace(/^\s+/,'');return;}
 var tp=document.createElement('template');
 tp.innerHTML=v.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}).replace(ICO_RE,icoSvg);
 p.replaceChild(tp.content,t);}
function icoAttr(e){['title','placeholder','aria-label','alt'].forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);
 if(v&&ICO_T.test(v))e.setAttribute(a,v.replace(ICO_RE,'').replace(/\s+/g,' ').trim());});}
function icoVarre(n){if(n.nodeType===3){icoNo(n);return;}if(n.nodeType!==1||ICO_PULA[n.nodeName])return;
 var w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),l=[],x;while((x=w.nextNode()))if(ICO_T.test(x.nodeValue))l.push(x);l.forEach(icoNo);
 icoAttr(n);Array.prototype.forEach.call(n.querySelectorAll('[title],[placeholder],[aria-label],[alt]'),icoAttr);}
try{icoVarre(document.body);new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='characterData')icoNo(m.target);
 else Array.prototype.forEach.call(m.addedNodes,icoVarre);});}).observe(document.body,{childList:true,subtree:true,characterData:true});}catch(e){console.error('ícones:',e);}


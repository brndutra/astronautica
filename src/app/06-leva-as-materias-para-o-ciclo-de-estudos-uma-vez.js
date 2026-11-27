/* Leva as matérias para o ciclo de estudos uma vez, sem duplicar as que já existem. */
function ccSemeia(){var c=ccBase();if(c.semeado)return;S.est=S.est||{};S.est.disc=Array.isArray(S.est.disc)?S.est.disc:[];
 var nomes={};S.est.disc.forEach(function(d){nomes[(d.nome||'').toLowerCase()]=1;});var n=0;
 CONC.mat.forEach(function(m,i){if(nomes[m.c.toLowerCase()])return;S.est.disc.push({id:'d'+Date.now()+'_'+i,nome:m.c,peso:m.g==='E'?4:2,min:0});n++;});
 c.semeado=1;return n;}
function ccBarra(f,cls){return '<span class="cc-bar '+(cls||'')+'"><i style="width:'+Math.round(f*100)+'%"></i></span>';}
function ccPinta(){var box=document.getElementById('conc');if(!box)return;var c=ccBase(),h=hoje();
 var dias=Math.round((ccDia(CONC.prova)-ccDia(h))/864e5),g=ccGeral(),sem=ccSemanaMin(),hj=ccHojeMin(),q=c.q[ccSemKey()]|0;
 var html='<div class="cc-top"><div class="cc-hd"><span class="k5">'+esc(CONC.banca)+' &middot; '+esc(CONC.edital)+'</span><h3>'+esc(CONC.nome)+'</h3>'+
  '<a class="cc-link" href="'+CONC.url+'" target="_blank" rel="noopener noreferrer">abrir o edital no DOU ↗</a></div>'+
  '<div class="cc-cd"><b>'+(dias>=0?dias:0)+'</b><span>'+(dias>0?'dias até a prova':dias===0?'é hoje':'prova realizada')+'</span><small>'+ccBr(CONC.prova)+' &middot; '+esc(CONC.turno)+'</small></div></div>';
 html+='<div class="cc-kpis">'+
  '<div class="cc-k k-ed"><span>edital visto</span><b>'+g.pct+'%</b><small>'+g.v+' de '+g.t+' tópicos, ponderado por peso</small>'+ccBarra(g.pct/100)+'</div>'+
  '<div class="cc-k k-dia"><span>hoje</span><b>'+hj+' / '+CONC.minDia+' min</b><small>blocos fechados no ciclo</small>'+ccBarra(Math.min(1,hj/CONC.minDia))+'</div>'+
  '<div class="cc-k k-sem"><span>semana</span><b>'+(Math.round(sem/6)/10).toString().replace('.',',')+' / '+String(CONC.metaHoras).replace('.',',')+' h</b><small>desde segunda</small>'+ccBarra(Math.min(1,sem/60/CONC.metaHoras))+'</div>'+
  '<div class="cc-k k-q"><span>questões da semana</span><b>'+q+' / '+CONC.metaQuest+'</b>'+
   '<span class="cc-qb"><button data-ccq="-10" aria-label="menos 10 questões">−10</button><button data-ccq="1" aria-label="mais 1 questão">+1</button><button data-ccq="10" aria-label="mais 10 questões">+10</button></span>'+ccBarra(Math.min(1,q/CONC.metaQuest))+'</div></div>';
 var alerta='';
 if(!c.mc.insc&&h>CONC.insc[1])alerta='<p class="cc-alerta">As inscrições fecharam em '+ccBr(CONC.insc[1])+' e a inscrição não está marcada como feita. Se você se inscreveu, marque abaixo.</p>';
 html+='<div class="cc-dois"><div class="cc-card"><h4>Marcos</h4>'+alerta+'<ul class="cc-mc">'+CONC.marcos.map(function(m){
   var dd=Math.round((ccDia(m.d)-ccDia(h))/864e5),st=c.mc[m.k]?'feito':dd<0?'passou':dd===0?'hoje':'em '+dd+' dia'+(dd===1?'':'s');
   return '<li class="'+(c.mc[m.k]?'ok':'')+'"><label><input type="checkbox" data-ccm="'+m.k+'"'+(c.mc[m.k]?' checked':'')+'><span><b>'+ccBr(m.d)+'</b> '+esc(m.t)+'</span></label><em>'+st+'</em></li>';}).join('')+'</ul>'+
  '<h4>Rotina</h4><ul class="cc-rot">'+CONC.rotina.map(function(r){return '<li>'+esc(r)+'</li>';}).join('')+'</ul></div>'+
  '<div class="cc-card"><h4>Prova</h4><table class="cc-tab"><thead><tr><th>bloco</th><th>questões</th><th>peso</th><th>mínimo</th></tr></thead><tbody>'+
   '<tr><td>Conhecimentos gerais</td><td>'+CONC.gerais.q+'</td><td>'+CONC.gerais.peso+'</td><td>'+CONC.gerais.min+'</td></tr>'+
   '<tr><td>Conhecimentos específicos</td><td>'+CONC.espec.q+'</td><td>'+CONC.espec.peso+'</td><td>'+CONC.espec.min+'</td></tr></tbody></table>'+
   '<p class="cc-nota">Nota mínima: '+CONC.notaMin+'. Inscrições: '+ccBr(CONC.insc[0])+' a '+ccBr(CONC.insc[1])+', taxa '+esc(CONC.taxa)+'.</p>'+
   '<p class="cc-nota">As matérias já estão no ciclo de estudos logo abaixo: específicas com peso 4, gerais com peso 2.</p></div></div>';
 html+='<div class="cc-ed"><div class="cc-edh"><h4>Edital verticalizado</h4><span>marque cada tópico quando tiver passado por ele</span></div>';
 [['E','Conhecimentos específicos'],['G','Conhecimentos gerais']].forEach(function(gr){
  html+='<div class="cc-gr g-'+gr[0]+'"><span class="k5">'+gr[1]+'</span>';
  CONC.mat.filter(function(m){return m.g===gr[0];}).sort(function(a,b){return a.o-b.o;}).forEach(function(m){
   var k=ccKey(m),p=ccProg(m),vis=c.ok[k]||[],ab=c.aberta[k];
   html+='<details class="cc-mat'+(p.f===1?' cheia':'')+'" data-ccd="'+k+'"'+(ab?' open':'')+'><summary><b>'+esc(m.c)+'</b><span class="cc-mn">'+esc(m.n)+'</span>'+
    '<span class="cc-pc">'+p.v+'/'+p.t+'</span>'+ccBarra(p.f)+'</summary><ol>'+
    m.t.map(function(t,i){var on=vis.indexOf(i)>=0;return '<li class="'+(on?'ok':'')+'"><label><input type="checkbox" data-cct="'+k+'|'+i+'"'+(on?' checked':'')+'><span>'+esc(t)+'</span></label></li>';}).join('')+
    '</ol></details>';});
  html+='</div>';});
 html+='</div>';
 box.innerHTML=html;}
function ccLiga(){var box=document.getElementById('conc');if(!box||box.dataset.lig)return;box.dataset.lig='1';
 box.addEventListener('change',function(e){var t=e.target,c=ccBase();
  if(t.dataset.cct){var p=t.dataset.cct.split('|'),k=p[0],i=+p[1],a=c.ok[k]=c.ok[k]||[],j=a.indexOf(i);
   if(t.checked&&j<0)a.push(i);if(!t.checked&&j>=0)a.splice(j,1);
   var m=CONC.mat.filter(function(x){return ccKey(x)===k;})[0];
   if(m&&t.checked&&a.length===m.t.length)try{anota('Matéria fechada no edital: '+esc(m.c)+'.',0,false);}catch(x){}
   grava();ccPinta();return;}
  if(t.dataset.ccm){c.mc[t.dataset.ccm]=t.checked;grava();ccPinta();}});
 box.addEventListener('click',function(e){var b=e.target.closest('[data-ccq]');if(!b)return;var c=ccBase(),k=ccSemKey();
  c.q[k]=Math.max(0,(c.q[k]|0)+(+b.dataset.ccq));grava();ccPinta();});
 box.addEventListener('toggle',function(e){var d=e.target;if(!d.dataset||!d.dataset.ccd)return;ccBase().aberta[d.dataset.ccd]=d.open;try{localStorage.setItem(KEY,JSON.stringify(S));}catch(x){}},true);}
(function(){var p0=pinta;pinta=function(){var n=0;try{n=ccSemeia();}catch(e){}p0();try{ccLiga();ccPinta();}catch(e){console.error('concurso:',e);}if(n)grava();};})();

/* ---------- Gamificação simples: XP, nível e sequência ----------
   O XP é calculado do que já está registrado, sem contador paralelo:
   foco e estudo +1 a cada 10 min por bloco; tópico do edital +2;
   etapa de projeto +10; hábito marcado no dia +5.
   Nível sobe a cada 100 XP. A sequência conta dias seguidos com a meta do dia:
   pelo menos 1 bloco de foco ou de estudo e até 3 hábitos marcados. */
var GM_SEQ='sequência';
var GM_TIT=['Epsilon','Delta','Gama','Beta','Alfa','Ômega'];
var GM_REGRAS=[['bloco de foco ou de estudo','+1 a cada 10 min'],['tópico do edital marcado','+2'],['etapa de projeto concluída','+10'],['hábito do dia','+5']];
function gmDiaFoco(d){var n=0;try{vxData().sessions.forEach(function(s){if(s.day===d&&(s.minutes||0)>=1)n++;});}catch(e){}
 ((S.est&&S.est.blocos)||[]).forEach(function(b){if(b.data===d&&(b.min|0)>0)n++;});return n;}
function gmDiaHab(d){return (S.hab||[]).filter(function(h){return (h.hist||[]).indexOf(d)>=0;}).length;}
function gmMetaHab(){return Math.min(3,(S.hab||[]).length);}
function gmDiaOk(d){return gmDiaFoco(d)>=1&&gmDiaHab(d)>=gmMetaHab();}
function gmXP(){var x={foco:0,estudo:0,topicos:0,etapas:0,habitos:0};
 try{vxData().sessions.forEach(function(s){x.foco+=Math.floor((s.minutes||0)/10);});}catch(e){}
 ((S.est&&S.est.blocos)||[]).forEach(function(b){x.estudo+=Math.floor((b.min|0)/10);});
 var ok=(S.cc&&S.cc.ok)||{};Object.keys(ok).forEach(function(k){x.topicos+=2*(ok[k]||[]).length;});
 (S.proj||[]).forEach(function(p){(p.passos||[]).forEach(function(t){if(t.ok)x.etapas+=10;});});
 (S.hab||[]).forEach(function(h){x.habitos+=5*((h.hist||[]).length);});
 x.total=x.foco+x.estudo+x.topicos+x.etapas+x.habitos;return x;}
function gmNivel(xp){var n=Math.floor(xp/100)+1;return{n:n,t:GM_TIT[Math.min(GM_TIT.length-1,Math.floor((n-1)/3))],no:xp%100};}
function gmSeq(){var h=hoje(),i=0,dia=hojeN(),s=0;
 if(!gmDiaOk(h))dia--; /* hoje ainda em aberto não quebra a sequência */
 for(i=0;i<730;i++){if(gmDiaOk(diaStr(dia-i)))s++;else break;}return s;}
function gmCard(compacto){var x=gmXP(),nv=gmNivel(x.total),sq=gmSeq(),h=hoje(),f=gmDiaFoco(h),hb=gmDiaHab(h),mh=gmMetaHab();
 var barra='<span class="gm-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+nv.no+'" aria-label="XP no nível"><i style="width:'+nv.no+'%"></i></span>';
 var meta='<ul class="gm-meta"><li class="'+(f>=1?'ok':'')+'">'+(f>=1?'✓':'○')+' 1 bloco de foco ou de estudo</li>'+
  (mh?'<li class="'+(hb>=mh?'ok':'')+'">'+(hb>=mh?'✓':'○')+' '+mh+' hábito'+(mh>1?'s':'')+' <small>'+Math.min(hb,mh)+'/'+mh+'</small></li>':'')+'</ul>';
 if(compacto)return '<div class="gm gm-c"><div class="gm-l"><b>Nível '+nv.n+'</b> <span>'+nv.t+'</span></div>'+barra+
  '<div class="gm-r"><span>'+nv.no+'/100 XP</span><span class="gm-sq">\u{1F525} '+sq+' dia'+(sq===1?'':'s')+'</span></div>'+meta+'</div>';
 return '<div class="gm"><div class="gm-top"><div class="gm-l"><span class="k5">nível</span><b>'+nv.n+'</b><span>'+nv.t+'</span></div>'+
  '<div class="gm-mid">'+barra+'<small>'+nv.no+'/100 XP para o nível '+(nv.n+1)+' &middot; '+x.total+' XP no total</small></div>'+
  '<div class="gm-sq"><span class="k5">'+GM_SEQ+'</span><b>\u{1F525} '+sq+'</b><span>dia'+(sq===1?'':'s')+' seguidos</span></div></div>'+
  '<div class="gm-bot"><div><span class="k5">meta do dia</span>'+meta+'</div>'+
  '<details class="gm-regras"><summary>como ganha XP</summary><ul>'+GM_REGRAS.map(function(r){return '<li><span>'+r[0]+'</span><b>'+r[1]+'</b></li>';}).join('')+'</ul></details></div></div>';}
function gmPinta(){
 /* topo: o bloco "Domínio · Lastro" passa a mostrar nível e XP */
 var x=gmXP(),nv=gmNivel(x.total);
 if(VX)Array.prototype.forEach.call(VX.querySelectorAll('.vx-k'),function(k){if(/dom[ií]nio|n[ií]vel/i.test(k.textContent)&&k.querySelector('br'))k.innerHTML=esc(S.cod||'')+'<br>N\u00edvel '+nv.n+' &middot; '+x.total+' XP';});
 /* a métrica de Carga sai: nível e sequência já estão no cartão logo abaixo */
 var m=VX&&VX.querySelector('.vx-metrics span');if(m&&/carga/i.test(m.textContent))m.remove();
 var top=VX&&VX.querySelector('.vx-metrics');if(top){var c=document.getElementById('gm-vx');if(!c){c=document.createElement('div');c.id='gm-vx';}top.parentNode.insertBefore(c,top.nextSibling);c.innerHTML=gmCard(false);}}
(function(){var r0=vxRender;vxRender=function(){r0();try{gmPinta();}catch(e){console.error('gam:',e);}};})();
(function(){var p0=pinta;pinta=function(){p0();try{gmPinta();}catch(e){console.error('gam:',e);}};})();

/* ---------- Tema do app: Astronáutica (inspirado na Argonáutica) ----------
   O tema troca a moldura (nome do app, abas, sumário, frase de abertura, títulos
   de nível) e a paleta. Os dados são os mesmos; a escolha fica em S.ap e sincroniza. */
var TEMAS={
 astro:{nome:'Astron\u00e1utica',app:'Astron\u00e1utica',titulo:'Astron\u00e1utica',
  abas:['01 / Casa Grande','02 / Miss\u00f5es','Laptop','03 / Arsenal','04 / Bolsa de Dracmas'],
  grupos:['Casa Grande','Miss\u00f5es','Laptop','Arsenal'],frase:'Uma flecha de cada vez.',sumario:'Astron\u00e1utica',
  niveis:['Indeterminado','Reclamado','Campista','Conselheiro','Her\u00f3i','Constela\u00e7\u00e3o'],seq:'dias no acampamento',estudo:'Laptop',arquivo:'Arsenal',
  /* nomes do acampamento: troca só rótulos fixos da moldura, nunca o que o usuário escreveu */
  rotulos:[
   ['Rotina','Escala do chal\u00e9'],['h\u00e1bitos e menu de recarga','h\u00e1bitos e o que recarrega'],
   ['Varredura','Tarefas do chal\u00e9'],['Continente','Enfermaria'],['Semana','Programa\u00e7\u00e3o'],
   ['Opera\u00e7\u00e3o di\u00e1ria','Casa Grande'],['h\u00e1bitos, projetos e menu de recarga','h\u00e1bitos, projetos e o que recarrega'],
   ['Baralho de Varredura','Tarefas do chal\u00e9'],['Protocolos de conten\u00e7\u00e3o','Enfermaria'],['refor\u00e7o do portador','cuidados de filho de Apolo'],
   ['Leitura de abertura','chamada da manh\u00e3'],['Como chega a corrente hoje?','Como voc\u00ea chega \u00e0 fogueira hoje?'],
   ['tr\u00eas prioridades','tr\u00eas miss\u00f5es do dia'],['fim do dia','toque de recolher'],
   ['rotas abertas','miss\u00f5es abertas'],['ASTROMANTE','CHASE MAVERICK DUKE \u00b7 H\u00c9KATOS'],
   ['C\u00e9rebro','Quadro de avisos'],['\u00d3rbita','Em andamento'],['Em \u00f3rbita','Em andamento'],
   ['Grade','Rastreados'],['Rastreador de h\u00e1bitos','Rastreados'],
   ['Provas','Prova\u00e7\u00f5es'],['Pr\u00eamios','Recompensas'],['Rota','Profecia'],['Declara\u00e7\u00e3o de rota','Profecia do ciclo'],
   ['Of\u00edcios','Atividades'],['Aptid\u00f5es','Atividades do acampamento'],
   ['abrir c\u00e9rebro','abrir o quadro'],['Sujeito','Ficha do campista'],['Linhas ativas','Dons'],['os tr\u00eas poderes secund\u00e1rios','os dons secund\u00e1rios de Apolo'],['N\u00facleo','Fogo interno'],['carga, dom\u00ednio e as a\u00e7\u00f5es do ciclo','energia, dom\u00ednio e a\u00e7\u00f5es do ciclo'],['Limitador','Ponto fraco'],['o hardware e os drenos','o que trava e o que drena'],['Diagn\u00f3stico','Or\u00e1culo'],['vetores, arquivo, parecer e vulnerabilidade','leituras, hist\u00f3rico e parecer'],['designa\u00e7\u00e3o, origem e kit','registro, chal\u00e9 e atributos']]}};
var AP_ARQ=/^(Arquivo do mutante|Porão)$/;
function apTema(){return 'astro';}
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.ap=(p&&p.ap==='astro')?'astro':'astro-novo';return b;};})();
function apDados(){var t=TEMAS[apTema()];
 /* registro que vinha do tema Mutante: muda uma vez para o modo claro de planner */
 if(S.ap!=='astro'){S.ap='astro';if(!document.body.classList.contains('claro'))setTimeout(function(){var bt=document.getElementById('b-tema');if(bt)bt.click();},0);}
document.body.dataset.skin=apTema();document.title=t.titulo;
 if(typeof GM_TIT!=='undefined')GM_TIT.splice.apply(GM_TIT,[0,GM_TIT.length].concat(t.niveis));
 if(typeof GM_SEQ!=='undefined')GM_SEQ=t.seq;}
var AP_ROT_SEL='#nav-l button b,#nav-l button span,#nav-l button small,#nav-l button i,h2.sec,h2.sec span,.pl-k,#vx .vx-k,#vx .vx-metrics span,#vx .vx-card h2,#vx .vx-card h3,#vx .vx-card .k5,#vx .vx-card span,#vx .vx-card small,#rail .k9,#rail button';
function apRotulos(){var t=TEMAS[apTema()];if(!t.rotulos)return;
 var mapa={};t.rotulos.forEach(function(r){mapa[r[0].toLowerCase()]=r[1];});
 Array.prototype.forEach.call(document.querySelectorAll(AP_ROT_SEL),function(el){
  Array.prototype.forEach.call(el.childNodes,function(n){if(n.nodeType!==3)return;
   var v=n.nodeValue,tr=v.trim();if(!tr)return;
   var novo=mapa[tr.toLowerCase()];
   if(novo==null){var m=tr.match(/^(.*?)(\s*(?:\u00b7|\/\/).*)$/);if(m&&mapa[m[1].trim().toLowerCase()]!=null)novo=mapa[m[1].trim().toLowerCase()]+m[2];}
   if(novo==null){var m2=tr.match(/^(\/\/\s*)(.*)$/);if(m2&&mapa[m2[2].trim().toLowerCase()]!=null)novo=m2[1]+mapa[m2[2].trim().toLowerCase()];}
   if(novo==null&&/^ASTROMANTE/.test(tr))novo=tr.replace('ASTROMANTE','CHASE MAVERICK DUKE \u00b7 H\u00c9KATOS');
   if(novo!=null&&tr===tr.toUpperCase()&&tr!==tr.toLowerCase())novo=novo.toUpperCase();
   if(novo!=null&&novo!==tr)n.nodeValue=v.replace(tr,novo);});});}
function apTextos(){var t=TEMAS[apTema()];if(!VX)return;try{apRotulos();}catch(e){}
 var ordem=['op','camp','est','dos'];
 ordem.concat(['fin']).forEach(function(v,i){var b=VX.querySelector('.vx-tabs [data-view="'+v+'"]');if(b&&t.abas[i])b.textContent=t.abas[i];});
 var h=VX.querySelector('.vx-top h2');if(h)h.textContent=t.frase;
 Array.prototype.forEach.call(VX.querySelectorAll('.vx-k'),function(k){if(!k.querySelector('br')&&/Vértice|Astronáutica/.test(k.textContent))
  k.textContent=k.textContent.replace(/Vértice|Astronáutica/,t.app);});
 var c3=VX.querySelector('.vx-est h3');if(c3)c3.textContent=t.estudo+' / concurso, idiomas e runas';
 Array.prototype.forEach.call(VX.querySelectorAll('.vx-card h3'),function(x){if(AP_ARQ.test(x.textContent))x.textContent=t.arquivo;});
 var nb=document.querySelector('#nav .navh b');if(nb)nb.textContent=t.sumario;
 ordem.forEach(function(v,i){var g=document.querySelector('.nva.a-'+v+' .nvgn');if(g)g.textContent=t.grupos[i];});
 var top=VX.querySelector('.vx-top');if(!top)return;top.classList.add('vx-hero');
 if(Object.keys(TEMAS).length<2)return;
 var s=document.getElementById('vx-ap');
 if(!s){var w=document.createElement('label');w.className='vx-ap';w.innerHTML='<span>tema</span><select id="vx-ap" aria-label="Tema do app"></select>';
  top.appendChild(w);s=w.querySelector('select');
  s.innerHTML=Object.keys(TEMAS).map(function(k){return '<option value="'+k+'">'+TEMAS[k].nome+'</option>';}).join('');
  s.onchange=function(){S.ap=s.value;
   /* a Astronáutica nasce clara, como um planner; o botão de modo continua valendo */
   if(s.value==='astro'&&!document.body.classList.contains('claro')){var bt=document.getElementById('b-tema');if(bt)bt.click();}
   grava();vxRender();try{pinta();}catch(e){}};}
 var tb=document.getElementById('vx-tema');if(tb&&tb.nextSibling!==s.parentNode)top.insertBefore(s.parentNode,tb.nextSibling);
 s.value=apTema();}
(function(){var r0=vxRender;vxRender=function(){apDados();r0();try{apTextos();}catch(e){console.error('tema:',e);}};})();
(function(){if(typeof pinta!=='function')return;var p0=pinta;pinta=function(){var r=p0.apply(this,arguments);try{apRotulos();}catch(e){}return r;};})();
/* a moldura é redesenhada em vários pontos; um observador reaplica os nomes depois de cada redesenho */
(function(){var pend=0;function vez(){pend=0;try{apRotulos();}catch(e){}}
 function agenda(){if(!pend)pend=setTimeout(vez,30);}
 if(window.MutationObserver)new MutationObserver(agenda).observe(document.documentElement,{childList:true,subtree:true});
 setTimeout(vez,0);})();

/* ---------- Alter ego: Chase Maverick Duke, o Hékatos (ficha na Profecia) ---------- */
var HK_FICHA='<div class="hk-cab"><span class="hk-k">alter ego &middot; filho de Apolo</span>'+
 '<h3>Chase Maverick Duke <i>o H&eacute;katos</i></h3>'+
 '<p class="hk-sub">&ldquo;O que acerta de longe.&rdquo; Nascido em Austin, Texas, no &uacute;ltimo grau do fogo.</p></div>'+
 '<blockquote class="hk-af">Eu sou H&eacute;katos. Eu escolho o alvo, firmo os p&eacute;s e acerto de longe. O que &eacute; meu j&aacute; est&aacute; a caminho, e eu caminho at&eacute; ele todos os dias.</blockquote>'+
 '<div class="hk-gr"><div><b>Quem eu sou</b><ul>'+
 '<li>Miro antes de soltar: escolho o alvo do dia e ignoro o resto da pilha.</li>'+
 '<li>Estudo como quem treina arco: todo dia, no mesmo hor&aacute;rio, sem esperar vontade.</li>'+
 '<li>Leio as pessoas e uso isso a meu favor, sem me perder nelas.</li>'+
 '<li>Sou o guardi&atilde;o da lei: o meu lugar no tribunal j&aacute; &eacute; meu.</li>'+
 '<li>Firmo os p&eacute;s antes de correr: durmo, bebo &aacute;gua, como e treino o corpo.</li>'+
 '<li>N&atilde;o preciso de aplauso para saber que acertei.</li>'+
 '<li>Re&uacute;no gente com leveza: o meu humor &eacute; for&ccedil;a.</li></ul></div>'+
 '<div><b>Faz &middot; n&atilde;o faz</b><table>'+
 '<tr><td>fecha um bloco de foco antes de abrir o celular</td><td>come&ccedil;a o dia respondendo aos outros</td></tr>'+
 '<tr><td>termina o expediente no hor&aacute;rio</td><td>leva trabalho para a noite</td></tr>'+
 '<tr><td>decide sozinho as pequenas coisas</td><td>pede opini&atilde;o para validar o &oacute;bvio</td></tr>'+
 '<tr><td>para quando o corpo pede</td><td>queima at&eacute; apagar</td></tr>'+
 '<tr><td>revisa a mat&eacute;ria no dia certo</td><td>acumula para a v&eacute;spera</td></tr></table></div></div>'+
 '<div class="hk-gr"><div><b>Gatilho</b><p>Antes de cada bloco, toque no colar ou na dracma e diga: <em>&ldquo;H&eacute;katos mira.&rdquo;</em></p></div>'+
 '<div><b>Visualiza&ccedil;&atilde;o &middot; 2 min de manh&atilde;</b><p>Campo de arquearia ao amanhecer, n&eacute;voa baixa. P&eacute;s firmes, corda puxada, respira&ccedil;&atilde;o. A flecha crava no centro dourado, e o som do impacto vira uma porta se abrindo: o seu nome na lista de aprovados do TRF3.</p></div></div>';
function hkFicha(){var h=document.getElementById('h-rota');if(!h)return;
 var f=document.getElementById('hk-ficha');
 if(!f){f=document.createElement('div');f.id='hk-ficha';f.className='hk';f.innerHTML=HK_FICHA;h.parentNode.insertBefore(f,h.nextSibling);}
 f.setAttribute('data-area',h.getAttribute('data-area')||'camp');
 f.style.display=(h.offsetParent===null&&getComputedStyle(h).display==='none')?'none':'';}
(function(){var r0=vxRender;vxRender=function(){r0();try{hkFicha();}catch(e){}};})();
setTimeout(function(){try{hkFicha();}catch(e){}},0);

/* ---------- Ficha do campista (topo do Arsenal) ---------- */
function fcAttr(n,v,src){var b='';for(var i=1;i<=10;i++)b+='<i'+(i<=v?' class="on"':'')+'></i>';
 return '<div class="fc-at"><span>'+n+'</span><span class="fc-bar">'+b+'</span><b>'+v+'</b><small>'+src+'</small></div>';}
var FC_HTML='<div class="fc-top"><div><span class="fc-k">Acampamento Meio-Sangue &middot; Long Island Sound</span>'+
 '<h3>Ficha do Campista</h3></div><div class="fc-stamp">Reclamado</div></div>'+
 '<div class="fc-grid">'+
 '<div class="fc-f"><span>Nome de registro</span><b>Chase Maverick Duke</b></div>'+
 '<div class="fc-f"><span>T&iacute;tulo</span><b>H&eacute;katos &middot; &ldquo;o que acerta de longe&rdquo;</b></div>'+
 '<div class="fc-f"><span>Progenitor divino</span><b>Apolo</b></div>'+
 '<div class="fc-f"><span>Chal&eacute;</span><b>Apolo &middot; sol, arco, m&uacute;sica e cura</b></div>'+
 '<div class="fc-f"><span>Nascimento</span><b>20/12/2000 &middot; 14h10 &middot; Sol a 29&deg; de Sagit&aacute;rio</b></div>'+
 '<div class="fc-f"><span>Cidade natal</span><b>Austin, Texas</b></div>'+
 '<div class="fc-f"><span>Respons&aacute;vel mortal</span><b>m&atilde;e &middot; revisora de contratos</b></div>'+
 '<div class="fc-f"><span>Chegada</span><b>aos 13 anos, escoltado por um s&aacute;tiro</b></div>'+
 '<div class="fc-f"><span>Reclama&ccedil;&atilde;o</span><b>na primeira fogueira, um sol dourado sobre a cabe&ccedil;a</b></div>'+
 '<div class="fc-f"><span>Situa&ccedil;&atilde;o</span><b>campista de ver&atilde;o &middot; instrutor de arquearia</b></div>'+
 '<div class="fc-f"><span>Arma</span><b>arco curto de teixo &middot; bolsa de cura da enfermaria</b></div>'+
 '<div class="fc-f"><span>Colar</span><b id="fc-colar">uma conta por Captura da bandeira vencida</b></div>'+
 '</div>'+
 '<div class="fc-sec"><b>Atributos</b>'+
 fcAttr('Mira',9,'Sol e Merc&uacute;rio em Sagit&aacute;rio')+fcAttr('Percep&ccedil;&atilde;o',9,'Lua em Escorpi&atilde;o, Casa 7')+
 fcAttr('Saber',8,'Casa 9 &middot; caminho de vida 7')+fcAttr('Iniciativa',8,'Ascendente em &Aacute;ries')+
 fcAttr('Inova&ccedil;&atilde;o',9,'Urano e V&ecirc;nus em Aqu&aacute;rio na Casa 10, a da carreira')+fcAttr('Carisma',7,'V&ecirc;nus em Aqu&aacute;rio, Casa 10')+fcAttr('Autoridade',7,'Meio do C&eacute;u em Capric&oacute;rnio')+
 fcAttr('Resist&ecirc;ncia',4,'nenhum planeta pessoal em terra')+'</div>'+
 '<div class="fc-two"><div class="fc-sec"><b>Dons</b><ul>'+
 '<li><em>A flecha que sabe o alvo</em> &middot; escolhe o que importa na pilha</li>'+
 '<li><em>A escuta do or&aacute;culo</em> &middot; l&ecirc; a sala antes de algu&eacute;m falar</li>'+
 '<li><em>A palavra que re&uacute;ne</em> &middot; agrega gente pelo humor e pela conversa</li>'+
 '<li><em>O mestre do templo</em> &middot; ensina e guarda a regra</li>'+
 '<li><em>A centelha de Urano</em> &middot; inventa o atalho que ningu&eacute;m viu e constr&oacute;i as pr&oacute;prias ferramentas</li></ul></div>'+
 '<div class="fc-sec"><b>Atividades</b><ul>'+
 '<li>Arquearia &middot; <em>mestre</em></li><li>Captura da bandeira &middot; <em>olheiro</em></li>'+
 '<li>Fogueira &middot; <em>puxa a conversa e as hist&oacute;rias</em></li><li>Enfermaria &middot; <em>cura os outros, esquece de si</em></li></ul></div></div>'+
 '<div class="fc-two"><div class="fc-sec fc-falha"><b>Falha fatal</b><p>A queima: corre no sol at&eacute; se consumir. Agrava com o impulso de &Aacute;ries e a vontade de aplauso. Corre&ccedil;&atilde;o: firmar os p&eacute;s antes de soltar a flecha.</p></div>'+
 '<div class="fc-sec"><b>Matriz do destino</b><p>20 Julgamento &middot; 12 Enforcado &middot; 2 Sacerdotisa &middot; 7 Carro &middot; <em>centro 5, Hierofante</em></p></div></div>'+
 '<div class="fc-sec fc-prof"><b>Miss&atilde;o atual &middot; a prova do tribunal</b><p>Do Texas ao estreito, o arqueiro do &uacute;ltimo grau<br>atravessa o inverno com a lei debaixo do bra&ccedil;o.<br>Fala de vi&eacute;s e acerta de frente;<br>queima se corre, vence se rege.</p></div>'+
 '<p class="fc-obs"><span>Obs. do conselheiro:</span> excelente na mira e na leitura de campo. Lembrar de dormir, beber &aacute;gua e comer antes dos treinos.</p>';

/* ===== Laptop: painel geral de estudos, com a Eumátheia (leitura) ===== */
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.fr=(p&&Array.isArray(p.fr))?p.fr:[];b.ler=(p&&Array.isArray(p.ler))?p.ler:[];return b;};})();
var EU_ABAS=[['geral','Painel geral'],['tatica','Tática'],['conc','Concurso'],['inst','Instruções'],['ler','Eumátheia']];
var EU_CARD={tatica:['c-h-ciclo','c-h-mapas'],conc:['c-h-conc'],inst:['c-h-lp']};
var EU_AB='geral';
function euEsc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function euDias(a,b){return Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);}
function euBr(d){var p=d.split('-');return p[2]+'/'+p[1];}
function euMonta(){var pane=document.querySelector('#painel-dir [data-pane="lap"]');if(!pane)return null;var eu=document.getElementById('eum');
 if(!eu){eu=document.createElement('section');eu.id='eum';eu.className='eum';
  eu.innerHTML='<header class="eu-cab"><div><span class="eu-k">painel de estudos</span><h2>Laptop</h2><p>tática, concurso, instruções e a Eumátheia, a estante de leitura</p></div>'+
   '<a class="eu-nova" href="?laptop" target="_blank" rel="noopener">abrir em nova aba ↗</a></header>'+
   '<nav class="eu-nav" role="tablist">'+EU_ABAS.map(function(a){return '<button type="button" role="tab" data-eu="'+a[0]+'">'+a[1]+'</button>';}).join('')+'</nav>'+
   '<div class="eu-pg" data-eupg="geral"></div><div class="eu-pg" data-eupg="tatica"><div id="eu-fichas"></div></div><div class="eu-pg" data-eupg="conc"></div><div class="eu-pg" data-eupg="inst"></div><div class="eu-pg" data-eupg="ler"></div>';
  pane.insertBefore(eu,pane.firstChild);
  eu.addEventListener('click',function(e){var t=e.target.closest('[data-eu]');if(t){euAba(t.getAttribute('data-eu'));return;}
   var g=e.target.closest('[data-eugo]');if(g){euAba(g.getAttribute('data-eugo'));}});}
 Object.keys(EU_CARD).forEach(function(k){var pg=eu.querySelector('[data-eupg="'+k+'"]');EU_CARD[k].forEach(function(id){var c=document.getElementById(id);if(c&&c.parentNode!==pg){if(k==='tatica')pg.insertBefore(c,document.getElementById('eu-fichas'));else pg.appendChild(c);}});});
 return eu;}
function euAba(k){var eu=euMonta();if(!eu)return;EU_AB=k;
 Array.prototype.forEach.call(eu.querySelectorAll('[data-eu]'),function(b){b.setAttribute('aria-selected',String(b.getAttribute('data-eu')===k));});
 Array.prototype.forEach.call(eu.querySelectorAll('[data-eupg]'),function(p){p.hidden=p.getAttribute('data-eupg')!==k;});
 if(k==='geral')euGeral();if(k==='tatica')euFichas();if(k==='ler')lerPinta();
 var c=document.querySelector('#painel-dir .pd-corpo');if(c&&!document.body.classList.contains('eu-solo'))c.scrollTop=0;else window.scrollTo(0,0);}
/* ---- painel geral ---- */
function euGeral(){var pg=document.querySelector('[data-eupg="geral"]');if(!pg)return;var h=hoje();
 var dias=euDias(h,CONC.prova),g=ccGeral(),sem=ccSemanaMin(),hj=ccHojeMin();
 var M=(S.est&&S.est.mapas)||[],rev=M.filter(function(m){return !m.next||diaN(m.next)<=hojeN();});
 var at=blocoAtual(),F=S.fr||[],fh=F.filter(function(f){return f.prox&&f.prox<=h;});
 var stat=function(k,v,s,cor,go){return '<button type="button" class="eu-st" style="--c:'+cor+'"'+(go?' data-eugo="'+go+'"':'')+'><small>'+k+'</small><b>'+v+'</b><span>'+s+'</span></button>';};
 var prox=CONC.marcos.filter(function(m){return m.d>=h;}).map(function(m){var n=euDias(h,m.d);return '<div class="eu-dl'+(n<=7?' perto':'')+'"><b>'+euEsc(m.t)+'</b><span>'+euBr(m.d)+' &middot; '+(n===0?'hoje':'em '+n+' dia'+(n>1?'s':''))+'</span></div>';}).join('');
 var mats=CONC.mat.slice().sort(function(a,b){return (b.p-a.p)||(a.c<b.c?-1:1);}).map(function(m){var p=ccProg(m);return '<div class="eu-mat" data-eugo="conc"><b>'+euEsc(m.c)+'</b><small>'+euEsc(m.n)+'</small><i><em style="width:'+Math.round(p.f*100)+'%"></em></i><span>'+p.v+'/'+p.t+' &middot; peso '+m.p+'</span></div>';}).join('');
 pg.innerHTML='<div class="eu-stats">'+
   stat('até a prova',dias>0?dias:'—',dias>0?'dias · '+euBr(CONC.prova):'prova realizada','var(--a-est)','conc')+
   stat('hoje',hj+' min','meta '+CONC.minDia+' min','var(--red)','tatica')+
   stat('semana',(Math.round(sem/6)/10).toString().replace('.',',')+' h','meta '+String(CONC.metaHoras).replace('.',',')+' h','var(--a-camp)','tatica')+
   stat('edital visto',g.pct+'%',g.v+' de '+g.t+' tópicos','var(--a-dos)','conc')+
   stat('revisões hoje',rev.length+fh.length,rev.length+' mapas · '+fh.length+' fichas','var(--a-fin)','tatica')+'</div>'+
  '<div class="eu-duo"><div class="eu-box"><h3>Próximo bloco</h3>'+(at?'<p class="eu-bloco">'+euEsc(discNome(at))+'</p><p class="eu-mut">volta '+S.est.volta+' do ciclo</p><button type="button" class="eu-bt" data-eugo="tatica">ir para a tática</button>':'<p class="eu-mut">monte a roda na Tática</p>')+'</div>'+
   '<div class="eu-box"><h3>Prazos</h3>'+(prox||'<p class="eu-mut">nenhum prazo à frente</p>')+'</div></div>'+
  '<div class="eu-box"><h3>Disciplinas do edital</h3><div class="eu-mats">'+mats+'</div></div>'+
  '<div class="eu-box"><h3>Rotina de estudo</h3><ul class="eu-rot">'+CONC.rotina.map(function(r){return '<li>'+euEsc(r)+'</li>';}).join('')+'</ul></div>';}
/* ---- fichas de revisão (Tática) ---- */
var EU_FED=null;
function euFichas(){var box=document.getElementById('eu-fichas');if(!box)return;var h=hoje(),F=(S.fr=S.fr||[]);
 var D=(S.est&&S.est.disc)||[];var opt=D.map(function(d){return '<option value="'+d.id+'">'+euEsc(d.nome)+'</option>';}).join('');
 var lista=F.slice().sort(function(a,b){return (a.prox||'9')<(b.prox||'9')?-1:1;}).map(function(f){var i=F.indexOf(f),due=f.prox&&f.prox<=h;
  var ck=[['rev','revisado'],['rec','recordado'],['ent','entendido']].map(function(c){return '<label><input type="checkbox" data-frck="'+i+'|'+c[0]+'"'+(f[c[0]]?' checked':'')+'> '+c[1]+'</label>';}).join('');
  return '<article class="eu-fr'+(due?' due':'')+'"><header><b>'+euEsc(f.top)+'</b><span>'+euEsc(discNome(f.disc))+(f.prox?' &middot; '+(due?'revisar hoje':'revisar em '+euBr(f.prox)):'')+'</span></header>'+
   (f.vis?'<p>'+euEsc(f.vis)+'</p>':'')+(f.pts?'<ul>'+f.pts.split('\n').filter(Boolean).map(function(p){return '<li>'+euEsc(p)+'</li>';}).join('')+'</ul>':'')+
   (f.res?'<p class="eu-res">'+euEsc(f.res)+'</p>':'')+'<div class="eu-ck">'+ck+'<span class="eu-nota">'+[1,2,3,4,5].map(function(n){return '<button type="button" data-frn="'+i+'|'+n+'" aria-pressed="'+((f.nota|0)>=n)+'">★</button>';}).join('')+'</span>'+
   '<button type="button" data-frr="'+i+'">revisei · próxima</button><button type="button" class="eu-x" data-frx="'+i+'" aria-label="Apagar ficha">✕</button></div></article>';}).join('');
 box.innerHTML='<div class="sec-card eu-frc"><h2 class="sec">Fichas de revisão <span>// estude para entender, não para decorar</span></h2>'+
  '<form class="eu-frf" data-frform><select name="disc" required>'+(opt||'<option value="">inclua disciplinas na roda</option>')+'</select><input name="top" maxlength="90" placeholder="tópico" required>'+
  '<textarea name="vis" rows="2" maxlength="400" placeholder="visão geral em 3 linhas"></textarea><textarea name="pts" rows="3" maxlength="600" placeholder="pontos-chave (um por linha)"></textarea>'+
  '<textarea name="res" rows="2" maxlength="400" placeholder="resumo com as suas palavras"></textarea><label class="eu-q">próxima revisão <input type="date" name="prox"></label><button>Guardar ficha</button></form>'+
  '<div class="eu-frl">'+(lista||'<p class="eu-mut">nenhuma ficha ainda</p>')+'</div></div>';}
function euFrSalva(){try{grava();}catch(e){}euFichas();}
document.addEventListener('submit',function(e){var f=e.target;if(!f.matches||!f.matches('[data-frform]'))return;e.preventDefault();var t=f.top.value.trim();if(!t)return;
 var p=f.prox.value;if(!p){var d=new Date();d.setDate(d.getDate()+1);p=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
 (S.fr=S.fr||[]).unshift({id:'fr'+Date.now(),disc:f.disc.value,top:t,vis:f.vis.value.trim(),pts:f.pts.value.trim(),res:f.res.value.trim(),prox:p,n:0,d:hoje()});euFrSalva();});
document.addEventListener('change',function(e){var c=e.target.closest&&e.target.closest('[data-frck]');if(!c)return;var a=c.getAttribute('data-frck').split('|'),f=S.fr[+a[0]];if(f){f[a[1]]=c.checked;euFrSalva();}});
var EU_PASSO=[1,3,7,15,30,60];
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-frn],[data-frr],[data-frx]');if(!t)return;
 if(t.hasAttribute('data-frn')){var a=t.getAttribute('data-frn').split('|'),f=S.fr[+a[0]];if(f){f.nota=+a[1];euFrSalva();}return;}
 if(t.hasAttribute('data-frr')){var f2=S.fr[+t.getAttribute('data-frr')];if(f2){f2.n=(f2.n|0)+1;var d=new Date();d.setDate(d.getDate()+EU_PASSO[Math.min(f2.n,EU_PASSO.length-1)]);f2.prox=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');f2.rev=true;euFrSalva();}return;}
 if(t.hasAttribute('data-frx')){S.fr.splice(+t.getAttribute('data-frx'),1);euFrSalva();}});
/* ---- liga ao painel direito e ao modo "nova aba" ---- */
(function(){var a0=pdAbre;pdAbre=function(k){var r=a0.apply(this,arguments);if(k==='lap'){try{euAba(EU_AB);}catch(e){console.error(e);}}return r;};})();
(function(){var p0=pinta;pinta=function(){var r=p0.apply(this,arguments);try{var eu=document.getElementById('eum');if(eu&&EU_AB==='geral'&&!eu.contains(document.activeElement))euGeral();}catch(e){}return r;};})();
function euSolo(){if(!/[?&](laptop|eumatheia)\b/.test(location.search))return;document.body.classList.add('eu-solo');document.title='Laptop · Astronáutica';if(/eumatheia/.test(location.search))EU_AB='ler';
 try{pdAbre('lap');}catch(e){}var a=document.querySelector('.eu-nova');if(a){a.textContent='voltar ao Astronáutica';a.href='./';a.removeAttribute('target');}}
setTimeout(euSolo,0);

/* ---------------- Eumátheia: a estante de leitura ---------------- */
var LER_ST=[['pilha','Na pilha'],['lendo','Lendo'],['lido','Lido'],['desejo','Desejo']];
var LER_FMT=['Físico','E-book','Audiobook'];
var LER_FILTRO='lendo';
function lerAno(){return String(new Date().getFullYear());}
function lerBarras(itens,chave,ops){var tot=itens.length||1;return ops.map(function(o){var n=itens.filter(function(x){return (x[chave]||'')===o;}).length;return '<div class="ler-bar"><span>'+euEsc(o)+'</span><i><em style="width:'+Math.round(n/tot*100)+'%"></em></i><b>'+n+'</b></div>';}).join('');}
function lerPinta(){var pg=document.querySelector('[data-eupg="ler"]');if(!pg)return;var L=(S.ler=S.ler||[]),a=lerAno();
 var lendo=L.filter(function(x){return x.st==='lendo';}),pilha=L.filter(function(x){return x.st==='pilha';}),lidos=L.filter(function(x){return x.st==='lido'&&(x.fim||'').slice(0,4)===a;}),des=L.filter(function(x){return x.st==='desejo';});
 var pgs=pilha.reduce(function(s,x){return s+(x.pag|0);},0);
 var gens=[];L.forEach(function(x){if(x.gen&&gens.indexOf(x.gen)<0)gens.push(x.gen);});
 var escolha=pilha.length?pilha[(new Date().getDate())%pilha.length]:null;
 var st=function(k,v,s,c){return '<div class="eu-st" style="--c:'+c+'"><small>'+k+'</small><b>'+v+'</b><span>'+s+'</span></div>';};
 var vis=L.map(function(x,i){return {x:x,i:i};}).filter(function(o){return LER_FILTRO==='todos'||o.x.st===LER_FILTRO;});
 var linhas=vis.map(function(o){var x=o.x,i=o.i,pct=x.pag?Math.min(100,Math.round((x.at|0)/x.pag*100)):0;
  return '<article class="ler-it st-'+x.st+'"><div class="ler-capa" style="--h:'+((x.tit||'').length*37%360)+'">'+euEsc((x.tit||'?').slice(0,1))+'</div><div class="ler-tx"><b>'+euEsc(x.tit)+'</b><span>'+euEsc([x.aut,x.gen,x.fmt].filter(Boolean).join(' · '))+'</span>'+
   (x.st==='lendo'&&x.pag?'<div class="ler-pr"><i><em style="width:'+pct+'%"></em></i><label>pág. <input type="number" min="0" max="'+x.pag+'" value="'+(x.at|0)+'" data-lerpg="'+i+'"> de '+x.pag+'</label></div>':x.pag?'<span>'+x.pag+' páginas</span>':'')+
   (x.st==='desejo'&&x.preco?'<span>'+euEsc(x.preco)+'</span>':'')+'</div>'+
   '<div class="ler-ac"><select data-lerst="'+i+'">'+LER_ST.map(function(s){return '<option value="'+s[0]+'"'+(s[0]===x.st?' selected':'')+'>'+s[1]+'</option>';}).join('')+'</select><button type="button" class="eu-x" data-lerx="'+i+'" aria-label="Remover">✕</button></div></article>';}).join('');
 pg.innerHTML='<div class="eu-box ler-cab"><span class="eu-k">a estante</span><h3 class="ler-h">Eumátheia</h3><p class="eu-mut">a facilidade de aprender &middot; o que está na pilha, o que você está lendo e o que já leu</p></div>'+
  '<div class="eu-stats">'+st('lendo',lendo.length,lendo.length?euEsc(lendo[0].tit):'nada aberto','var(--a-est)')+st('na pilha',pilha.length,pgs+' páginas esperando','var(--a-dos)')+st('lidos em '+a,lidos.length,'livros terminados','var(--a-camp)')+st('desejo',des.length,'para comprar','var(--a-fin)')+
   '<div class="eu-st" style="--c:var(--red)"><small>leitura do dia</small><b class="ler-pick">'+(escolha?euEsc(escolha.tit):'—')+'</b><span>'+(escolha?'sorteado da pilha':'a pilha está vazia')+'</span></div></div>'+
  '<div class="eu-duo"><div class="eu-box"><h3>Por formato</h3>'+lerBarras(L.filter(function(x){return x.st!=='desejo';}),'fmt',LER_FMT)+'</div><div class="eu-box"><h3>Por gênero</h3>'+(gens.length?lerBarras(L.filter(function(x){return x.st!=='desejo';}),'gen',gens):'<p class="eu-mut">os gêneros aparecem quando você cadastrar livros</p>')+'</div></div>'+
  '<div class="eu-box"><h3>Acrescentar livro</h3><form class="ler-f" data-lerform><input name="tit" placeholder="título" maxlength="90" required><input name="aut" placeholder="autor" maxlength="60"><input name="gen" placeholder="gênero" maxlength="30" list="ler-gens"><datalist id="ler-gens">'+gens.map(function(g){return '<option value="'+euEsc(g)+'">';}).join('')+'</datalist>'+
   '<select name="fmt">'+LER_FMT.map(function(f){return '<option>'+f+'</option>';}).join('')+'</select><input name="pag" type="number" min="0" placeholder="páginas"><select name="st">'+LER_ST.map(function(s){return '<option value="'+s[0]+'">'+s[1]+'</option>';}).join('')+'</select><input name="preco" placeholder="preço (desejo)" maxlength="20"><button>Guardar</button></form></div>'+
  '<div class="eu-box"><div class="ler-fl">'+[['lendo','Lendo'],['pilha','Na pilha'],['lido','Lidos'],['desejo','Desejo'],['todos','Todos']].map(function(f){return '<button type="button" data-lerf="'+f[0]+'" aria-pressed="'+(LER_FILTRO===f[0])+'">'+f[1]+' <small>'+(f[0]==='todos'?L.length:L.filter(function(x){return x.st===f[0];}).length)+'</small></button>';}).join('')+'</div>'+
   '<div class="ler-l">'+(linhas||'<p class="eu-mut">nada aqui ainda</p>')+'</div></div>';}
function lerSalva(){try{grava();}catch(e){}lerPinta();}
document.addEventListener('submit',function(e){var f=e.target;if(!f.matches||!f.matches('[data-lerform]'))return;e.preventDefault();var t=f.tit.value.trim();if(!t)return;
 var o={id:'l'+Date.now(),tit:t,aut:f.aut.value.trim(),gen:f.gen.value.trim(),fmt:f.fmt.value,pag:+f.pag.value||0,st:f.st.value,preco:f.preco.value.trim(),d:hoje(),at:0};if(o.st==='lendo')o.ini=hoje();if(o.st==='lido')o.fim=hoje();
 (S.ler=S.ler||[]).unshift(o);LER_FILTRO=o.st;lerSalva();});
document.addEventListener('change',function(e){var s=e.target.closest&&e.target.closest('[data-lerst],[data-lerpg]');if(!s)return;
 if(s.hasAttribute('data-lerst')){var x=S.ler[+s.getAttribute('data-lerst')];if(!x)return;x.st=s.value;if(x.st==='lendo'&&!x.ini)x.ini=hoje();if(x.st==='lido'){x.fim=hoje();if(x.pag)x.at=x.pag;try{nvMove(0,2,'Leitura concluída: “'+euEsc(x.tit)+'”.',false,0,0,0);}catch(z){}}lerSalva();return;}
 var y=S.ler[+s.getAttribute('data-lerpg')];if(!y)return;y.at=Math.max(0,+s.value||0);if(y.pag&&y.at>=y.pag){y.st='lido';y.fim=hoje();try{nvMove(0,2,'Leitura concluída: “'+euEsc(y.tit)+'”.',false,0,0,0);}catch(z){}}lerSalva();});
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-lerf],[data-lerx]');if(!t)return;
 if(t.hasAttribute('data-lerf')){LER_FILTRO=t.getAttribute('data-lerf');lerPinta();return;}
 S.ler.splice(+t.getAttribute('data-lerx'),1);lerSalva();});

/* ---------------- seletor de aba e de instrução no topo do Laptop ---------------- */
var EU_INST=[['pn','Painel de línguas'],['ru','Runas'],['se','Sessões'],['vo','Vocabulário'],['gr','Gramática'],['re','Recursos'],['cv','Conversação'],['te','Testes'],['sm','Semana']];
function euSel(){var cab=document.querySelector('#eum .eu-cab');if(!cab)return;var s=document.getElementById('eu-sel');
 if(!s){var w=document.createElement('label');w.className='eu-selw';w.innerHTML='<span>ir para</span><select id="eu-sel" aria-label="Escolher aba ou instrução"></select>';
  var nova=cab.querySelector('.eu-nova');var box=document.createElement('div');box.className='eu-cab-ac';cab.appendChild(box);box.appendChild(w);if(nova)box.appendChild(nova);
  s=w.querySelector('select');
  s.addEventListener('change',function(){var v=s.value.split(':');if(v[0]==='inst'&&v[1]){try{lpTab=v[1];}catch(e){}euAba('inst');try{pintaLP();}catch(e){}}else euAba(v[0]);});}
 var cur=EU_AB==='inst'?'inst:'+(typeof lpTab!=='undefined'?lpTab:'pn'):EU_AB;
 s.innerHTML=EU_ABAS.filter(function(a){return a[0]!=='inst';}).slice(0,3).map(function(a){return '<option value="'+a[0]+'">'+a[1]+'</option>';}).join('')+
  '<optgroup label="Instruções">'+EU_INST.map(function(t){return '<option value="inst:'+t[0]+'">'+t[1]+'</option>';}).join('')+'</optgroup>'+
  '<option value="ler">Eumátheia · leitura</option>';
 s.value=cur;}
(function(){var a0=euAba;euAba=function(k){var r=a0.apply(this,arguments);try{euSel();}catch(e){}return r;};})();
(function(){var p0=pintaLP;pintaLP=function(){var r=p0.apply(this,arguments);try{if(EU_AB==='inst')euSel();}catch(e){}return r;};})();
/* ===== Kit TDAH: tempo visível, alarmes, estimado × real, só 5 minutos, corrente, sem castigo, despejo, companhia ===== */
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);var t=(p&&p.td&&typeof p.td==='object')?p.td:{};
 b.td={foco:t.foco||null,cor:Array.isArray(t.cor)?t.cor:[],cl:(t.cl&&typeof t.cl==='object')?t.cl:{},avFx:t.avFx!==false};return b;};})();
function tdD(){S.td=S.td||{foco:null,cor:[],cl:{},avFx:true};S.td.cor=S.td.cor||[];S.td.cl=S.td.cl||{};return S.td;}
function tdEsc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function tdMMSS(ms){ms=Math.max(0,Math.round(ms/1000));return String(Math.floor(ms/60)).padStart(2,'0')+':'+String(ms%60).padStart(2,'0');}
function tdHM(min){min=Math.max(0,Math.round(min));return (min>=60?Math.floor(min/60)+'h'+String(min%60).padStart(2,'0'):min+' min');}
function tdSalva(){try{grava();}catch(e){}}

/* ---------- avisos (toast + notificação + som) ---------- */
function tdSom(n){try{var A=window.AudioContext||window.webkitAudioContext;if(!A)return;var c=tdSom.c||(tdSom.c=new A());for(var i=0;i<(n||2);i++){var o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=i%2?660:880;o.connect(g);g.connect(c.destination);var t=c.currentTime+i*0.22;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.25,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+0.2);o.start(t);o.stop(t+0.21);}}catch(e){}}
function tdAvisa(tit,sub,acoes,som){var box=document.getElementById('td-toasts');if(!box){box=document.createElement('div');box.id='td-toasts';box.setAttribute('aria-live','assertive');document.body.appendChild(box);}
 var t=document.createElement('div');t.className='td-toast';t.setAttribute('role','alert');
 t.innerHTML='<b>'+tdEsc(tit)+'</b>'+(sub?'<small>'+tdEsc(sub)+'</small>':'')+'<div class="td-ta"></div>';
 var ac=t.querySelector('.td-ta');(acoes||[['ok',null]]).forEach(function(a){var b=document.createElement('button');b.type='button';b.textContent=a[0];b.onclick=function(){t.remove();if(a[1])a[1]();};ac.appendChild(b);});
 box.appendChild(t);if(som!==false)tdSom(3);
 try{if(window.Notification&&Notification.permission==='granted'&&document.visibilityState!=='visible')new Notification(tit,{body:sub||''});}catch(e){}
 if(!acoes||acoes.length<2)setTimeout(function(){if(t.parentNode)t.remove();},60000);}

/* ---------- disco de foco (tempo visível) ---------- */
function tdFocoRest(){var f=tdD().foco;if(!f)return 0;return f.pausa!=null?f.pausa:Math.max(0,f.ini+f.dur-Date.now());}
function tdFocoIni(min,rot,pi){var td=tdD();td.foco={id:Date.now(),ini:Date.now(),dur:min*60000,pausa:null,rot:rot||'foco',pi:(pi==null?-1:pi),acomp:!!(td.foco&&td.foco.acomp),base:min};tdSalva();tdDisco(true);
 try{if(window.Notification&&Notification.permission==='default')Notification.requestPermission();}catch(e){}}
function tdFocoFim(registrar){var td=tdD(),f=td.foco;if(!f)return;var gasto=(f.pausa!=null?f.dur-f.pausa:Math.min(f.dur,Date.now()-f.ini))/60000;
 if(registrar&&gasto>=0.5){var h=hoje();try{var v=vxData();v.sessions.push({id:f.id?'tdf'+f.id:'td'+Date.now(),day:h,task:null,minutes:Math.round(gasto*100)/100,result:f.rot+(f.acomp?' (acompanhado)':'')});vxSave();}catch(e){}
  if(f.pi>=0){try{var x=plDia(h),t=x.top[f.pi];if(t){t.real=Math.round(((t.real||0)+gasto)*10)/10;}}catch(e){}}}
 td.foco=null;tdSalva();tdDisco(true);try{vxRender();}catch(e){}}
function tdDisco(forca){var d=document.getElementById('td-disco');if(!d){d=document.createElement('div');d.id='td-disco';d.className='td-disco';document.body.appendChild(d);
  d.addEventListener('click',function(e){var b=e.target.closest('[data-tdf]');if(!b){if(e.target.closest('.td-ring'))d.classList.toggle('aberto');return;}var k=b.getAttribute('data-tdf'),f=tdD().foco;
   if(k==='5')tdSo5();else if(k==='25'||k==='50')tdFocoIni(+k,'bloco de '+k+' min',-1);
   else if(k==='pausa'&&f){if(f.pausa==null){f.pausa=tdFocoRest();}else{f.ini=Date.now()-(f.dur-f.pausa);f.pausa=null;}tdSalva();}
   else if(k==='mais'&&f){f.dur+=5*60000;if(f.pausa!=null)f.pausa+=5*60000;tdSalva();}
   else if(k==='fim')tdFocoFim(true);
   else if(k==='acomp'){var td=tdD();if(td.foco)td.foco.acomp=!td.foco.acomp;tdSalva();}
   tdDisco(true);});}
 var f=tdD().foco,R=36,C=2*Math.PI*R;
 if(!f){if(forca||d.dataset.m!=='parado'){d.dataset.m='parado';d.classList.remove('rodando','aberto');
   d.innerHTML='<button type="button" class="td-ring td-vazio" aria-label="Abrir o foco"><svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="'+R+'" class="td-bg"/></svg><span>foco</span></button>'+
    '<div class="td-menu"><b>Começar</b><button type="button" data-tdf="5">só 5 minutos</button><button type="button" data-tdf="25">25 min</button><button type="button" data-tdf="50">50 min</button>'+
    '<a href="https://www.focusmate.com/" target="_blank" rel="noopener">estudar acompanhado ↗</a><small>para ligar a uma prioridade, use o ▶ ao lado dela</small></div>';}
  return;}
 var rest=tdFocoRest(),fr=f.dur?rest/f.dur:0;
 if(d.dataset.m!=='rodando')d.classList.remove('aberto');
 if(forca||d.dataset.m!=='rodando'){d.dataset.m='rodando';d.classList.add('rodando');
  d.innerHTML='<button type="button" class="td-ring" aria-label="Controles do foco"><svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="'+R+'" class="td-bg"/><circle cx="42" cy="42" r="'+R+'" class="td-fg" stroke-dasharray="'+C+'" transform="rotate(-90 42 42)"/></svg><span class="td-t"></span></button>'+
   '<div class="td-menu"><b class="td-rot"></b><button type="button" data-tdf="pausa" class="td-pb"></button><button type="button" data-tdf="mais">+5 min</button><button type="button" data-tdf="fim">encerrar e registrar</button>'+
   '<button type="button" data-tdf="acomp" class="td-ac"></button><a href="https://www.focusmate.com/" target="_blank" rel="noopener">abrir o Focusmate ↗</a></div>';}
 var fg=d.querySelector('.td-fg');if(fg)fg.setAttribute('stroke-dashoffset',String(C*(1-fr)));
 d.querySelector('.td-t').textContent=tdMMSS(rest);d.querySelector('.td-rot').textContent=f.rot;
 d.querySelector('.td-pb').textContent=f.pausa!=null?'retomar':'pausar';d.querySelector('.td-ac').textContent=f.acomp?'✓ acompanhado':'marcar acompanhado';
 d.classList.toggle('pausado',f.pausa!=null);d.classList.toggle('fim',rest<=60000&&f.pausa==null);
 if(rest<=0&&f.pausa==null&&!f.avisou){f.avisou=1;tdSalva();
  tdAvisa('Tempo! '+f.rot,'terminou o bloco de '+Math.round(f.dur/60000)+' min',[['concluí',function(){if(f.pi>=0){try{var x=plDia(hoje());if(x.top[f.pi])x.top[f.pi].ok=true;}catch(e){}}tdFocoFim(true);}],['mais 5',function(){var g=tdD().foco;if(g){g.dur+=5*60000;g.avisou=0;tdSalva();tdDisco(true);}}],['parar',function(){tdFocoFim(true);}]]);}}
function tdSo5(){var x=plDia(hoje()),i=x.top.findIndex(function(t){return (t.t||'').trim()&&!t.ok;});
 var alvo=i>=0?x.top[i].t:'';tdAvisa('Só 5 minutos'+(alvo?': '+alvo:''),'qual é o menor primeiro passo? Faça só ele. Se der vontade, continue.',[['começar',function(){tdFocoIni(5,alvo?'5 min · '+alvo:'só 5 minutos',i);}],['agora não',null]],false);}
setInterval(function(){try{tdDisco(false);}catch(e){}},1000);

/* ---------- prioridades: estimado × real, ▶ e "só 5 minutos" ---------- */
function tdRazao(){var h=hojeN(),se=0,sr=0,n=0;for(var k=0;k<14;k++){var o=(S.plan||{})[diaStr(h-k)];if(!o)continue;(o.top||[]).forEach(function(t){if(t&&t.est>0&&t.real>0&&t.ok){se+=t.est;sr+=t.real;n++;}});}return n>=2?{r:sr/se,n:n}:null;}
function tdPrior(){var w=document.querySelector('#pl-row .pl-top');if(!w||w.dataset.td)return;w.dataset.td=1;var x=plDia(hoje());
 Array.prototype.forEach.call(w.querySelectorAll('ol li'),function(li,i){var t=x.top[i]||{};var s=document.createElement('span');s.className='td-est';
  s.innerHTML='<input type="number" min="1" max="600" inputmode="numeric" data-tdest="'+i+'" value="'+(t.est||'')+'" placeholder="min" aria-label="Minutos estimados"><button type="button" data-tdgo="'+i+'" aria-label="Começar o timer desta prioridade">▶</button>'+(t.real?'<i title="tempo real">'+tdHM(t.real)+'</i>':'');li.appendChild(s);});
 var r=tdRazao(),p=document.createElement('div');p.className='td-real';
 p.innerHTML='<button type="button" data-td5>só 5 minutos</button><span>'+(r?'você leva <b>'+String(Math.round(r.r*10)/10).replace('.',',')+'×</b> o que estima ('+r.n+' tarefas, 14 dias)':'estime os minutos e use o ▶: o app aprende o seu tempo real')+'</span>';w.appendChild(p);
 w.addEventListener('change',function(e){var n=e.target.closest('[data-tdest]');if(!n)return;var y=plDia(hoje()),k=+n.getAttribute('data-tdest');if(y.top[k]){y.top[k].est=Math.max(0,+n.value||0);tdSalva();}});
 w.addEventListener('click',function(e){if(e.target.closest('[data-td5]')){tdSo5();return;}var g=e.target.closest('[data-tdgo]');if(!g)return;var y=plDia(hoje()),k=+g.getAttribute('data-tdgo'),t=y.top[k];
  if(!t||!(t.t||'').trim()){tdAvisa('Escreva a prioridade antes','o timer fica ligado a ela',null,false);return;}var r2=tdRazao(),m=t.est||25;tdFocoIni(m,t.t,k);
  if(r2&&r2.r>1.3&&t.est)tdAvisa('Pelo seu histórico, isso leva uns '+Math.round(t.est*r2.r)+' min','o timer começou com os '+t.est+' que você estimou',null,false);});}

/* ---------- fim do dia: despejo e gratidão ---------- */
function tdFim(){var w=document.querySelector('#pl-row .pl-fim');if(!w||w.dataset.td)return;w.dataset.td=1;var x=plDia(hoje());var b=document.createElement('div');b.className='td-noite';
 b.innerHTML='<label><span>despejo da cabeça</span><textarea data-tdn="desp" rows="2" placeholder="o que está rodando aí? uma coisa por linha">'+tdEsc(x.desp||'')+'</textarea></label>'+
  '<button type="button" data-tddesp>mandar para a caixa</button><label><span>gratidão</span><textarea data-tdn="grat" rows="2" placeholder="um detalhe que vale guardar">'+tdEsc(x.grat||'')+'</textarea></label>';w.appendChild(b);
 b.addEventListener('change',function(e){var t=e.target.closest('[data-tdn]');if(!t)return;var y=plDia(hoje());y[t.getAttribute('data-tdn')]=t.value.trim();tdSalva();});
 b.addEventListener('click',function(e){if(!e.target.closest('[data-tddesp]'))return;var ta=b.querySelector('[data-tdn="desp"]'),L=ta.value.split('\n').map(function(s){return s.trim();}).filter(Boolean);if(!L.length)return;
  L.reverse().forEach(function(t){S.cap.unshift({t:t.slice(0,140),d:hoje(),c:'ideia'});});if(S.cap.length>60)S.cap.length=60;ta.value='';var y=plDia(hoje());y.desp='';tdSalva();
  tdAvisa(L.length+' ite'+(L.length>1?'ns':'m')+' na caixa','amanhã você tria no Quadro de avisos. Agora pode dormir.',null,false);try{pinta();}catch(z){}});}

/* ---------- barra "agora" + alarmes 30 / 10 / 0 ---------- */
var TD_H=['06','09','12','15','18','21'];
function tdFaixaNome(h){try{if(typeof FX_NOMES!=='undefined'&&FX_NOMES[h])return FX_NOMES[h];}catch(e){}return h+'h';}
function tdAgoraHTML(){var d=new Date(),hr=d.getHours(),at=null,prox=null,i;for(i=0;i<TD_H.length;i++){var a=+TD_H[i];if(hr>=a&&hr<a+3)at=TD_H[i];if(a>hr&&prox==null)prox=TD_H[i];}
 var tb=S.tb||{},h=hoje();var txt=function(k){return tb[h+'|'+k]||'';};
 var s='';if(at){var fim=new Date(d);fim.setHours(+at+3,0,0,0);var m=(fim-d)/60000,pct=Math.round((180-m)/180*100);
  s+='<span class="td-ag-k">agora</span><b>'+tdFaixaNome(at)+'</b><span class="td-ag-t">'+(txt(at)?tdEsc(txt(at)):'faixa livre')+'</span><i class="td-ag-bar"><em style="width:'+pct+'%"></em></i>';}
 else s+='<span class="td-ag-k">agora</span><b>repouso</b><span class="td-ag-t">fora das faixas</span>';
 if(prox){var pd=new Date(d);pd.setHours(+prox,0,0,0);var mm=(pd-d)/60000;s+='<span class="td-ag-p">próxima: <b>'+tdFaixaNome(prox)+'</b> às '+prox+'h · em '+tdHM(mm)+(txt(prox)?' · '+tdEsc(txt(prox)):'')+'</span>';}
 s+='<button type="button" class="td-ag-av" data-tdav aria-pressed="'+tdD().avFx+'" title="Avisos 10 min antes e na hora de cada faixa">'+(tdD().avFx?'🔔 avisos ligados':'🔕 avisos desligados')+'</button>';return s;}
function tdAgora(){var wr=document.querySelector('.wrap');if(!wr)return;var b=document.getElementById('td-agora');
 if(!b){b=document.createElement('div');b.id='td-agora';b.className='td-agora';b.addEventListener('click',function(e){if(!e.target.closest('[data-tdav]'))return;var td=tdD();td.avFx=!td.avFx;tdSalva();b.innerHTML=tdAgoraHTML();
   if(td.avFx){try{if(window.Notification&&Notification.permission==='default')Notification.requestPermission();}catch(z){}}});}
 var ti=document.getElementById('tt-indice');if(ti){b.classList.add('no-indice');if(b.parentNode!==ti||ti.lastElementChild!==b)ti.appendChild(b);}
 else if(b.parentNode!==wr||wr.firstElementChild!==b)wr.insertBefore(b,wr.firstChild);var h=tdAgoraHTML();if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}}
function tdJa(k){var key='td-av-'+hoje();try{var o=JSON.parse(localStorage.getItem(key)||'{}');if(o[k])return true;o[k]=1;localStorage.setItem(key,JSON.stringify(o));}catch(e){if(tdJa.m&&tdJa.m[k])return true;(tdJa.m=tdJa.m||{})[k]=1;}return false;}
function tdAlarmes(){var d=new Date(),agora=d.getTime(),h=hoje(),tb=S.tb||{};
 if(tdD().avFx)TD_H.forEach(function(H){var t=new Date(d);t.setHours(+H,0,0,0);var m=(t-agora)/60000,o=tb[h+'|'+H]||'';
  if(m<=10&&m>9){if(!tdJa('fx'+H+'-10'))tdAvisa('Em 10 min: '+tdFaixaNome(H),o?o:'feche o que está aberto e prepare a transição');}
  else if(m<=0&&m>-1.5){if(!tdJa('fx'+H+'-0'))tdAvisa('Agora: '+tdFaixaNome(H),o?'vai: '+o:'começa a próxima faixa');}});
 (S.cap||[]).forEach(function(it,i){if(!it.a||!it.p||!it.h||it.p!==h)return;var t=new Date(it.p+'T'+it.h).getTime(),m=(t-agora)/60000;
  if(m<=30&&m>29){if(!tdJa('c'+it.t+'-30'))tdAvisa('Em 30 min: '+it.t,'às '+it.h);}
  else if(m<=10&&m>9){if(!tdJa('c'+it.t+'-10'))tdAvisa('Em 10 min: '+it.t,'às '+it.h+' · prepare-se');}});}
setInterval(function(){try{tdAgora();tdAlarmes();}catch(e){}},30000);

/* ---------- corrente de hábitos (encadeados) ---------- */
function tdCorrente(){var card=document.getElementById('c-h-dia');if(!card)return;var w=document.getElementById('td-cor');
 if(!w){w=document.createElement('div');w.id='td-cor';w.className='td-cor';var h2=card.querySelector('h2.sec');card.insertBefore(w,h2?h2.nextSibling:card.firstChild);
  w.addEventListener('change',function(e){var c=e.target.closest('[data-tdck]');if(!c)return;var td=tdD(),d=hoje();td.cl[d]=td.cl[d]||{};td.cl[d][c.getAttribute('data-tdck')]=c.checked;
   var tot=td.cor.length,ok=td.cor.filter(function(p){return td.cl[d][p.id];}).length;if(tot&&ok===tot){try{anota('Corrente completa: '+tot+' passos encadeados.',0,false);}catch(z){}}tdSalva();tdCorrente();});
  w.addEventListener('submit',function(e){e.preventDefault();var i=w.querySelector('input[name=p]'),v=i.value.trim();if(!v)return;tdD().cor.push({id:'p'+Date.now(),t:v});i.value='';tdSalva();tdCorrente();});
  w.addEventListener('click',function(e){var x=e.target.closest('[data-tdcx]');if(x){var k=x.getAttribute('data-tdcx');tdD().cor=tdD().cor.filter(function(p){return p.id!==k;});tdSalva();tdCorrente();return;}
   var u=e.target.closest('[data-tdcu]');if(u){var C=tdD().cor,j=C.findIndex(function(p){return p.id===u.getAttribute('data-tdcu');});if(j>0){var t=C[j];C[j]=C[j-1];C[j-1]=t;tdSalva();tdCorrente();}}});}
 var td=tdD(),d=hoje(),cl=td.cl[d]||{},C=td.cor,ok=C.filter(function(p){return cl[p.id];}).length;
 w.innerHTML='<div class="td-cor-h"><span class="td-k">corrente do dia</span><b>'+ok+'/'+C.length+'</b><small>cada passo puxa o próximo: depois de um, vem o outro</small></div>'+
  '<ol>'+C.map(function(p,i){return '<li class="'+(cl[p.id]?'ok':'')+'">'+(i?'<span class="td-dep">depois</span>':'<span class="td-dep">começa</span>')+'<label><input type="checkbox" data-tdck="'+p.id+'"'+(cl[p.id]?' checked':'')+'> '+tdEsc(p.t)+'</label>'+
   (i?'<button type="button" data-tdcu="'+p.id+'" aria-label="Subir">↑</button>':'')+'<button type="button" data-tdcx="'+p.id+'" aria-label="Remover">✕</button></li>';}).join('')+'</ol>'+
  '<form class="td-cor-f"><input name="p" maxlength="60" placeholder="'+(C.length?'e depois disso…':'primeiro elo: ex. acordar')+'"><button>encadear</button></form>';}

/* ---------- sequência sem castigo: o total vem primeiro ---------- */
function tdSemCastigo(){var el=document.querySelector('#gm-vx .gm-sq');if(!el||typeof gmDiaOk!=='function')return;var h=hojeN(),tot=0,rec=0,run=0;
 for(var i=730;i>=0;i--){if(gmDiaOk(diaStr(h-i))){tot++;run++;if(run>rec)rec=run;}else if(i>0)run=0;}
 var sq=gmSeq();el.innerHTML='<span class="k5">dias no acampamento</span><b>'+tot+'</b><span>'+(sq?'sequência de '+sq+' · recorde '+rec:(tot?'hoje é dia de recomeço · o total continua':'o primeiro dia conta'))+'</span>';el.classList.add('td-sq');}
(function(){var p0=gmPinta;gmPinta=function(){p0.apply(this,arguments);try{tdSemCastigo();}catch(e){}};})();

/* ---------- uma captura só: o cartão do topo sai; tudo vai para a caixa do Quadro ---------- */
function tdCapturaUnica(){var f=document.getElementById('vx-capture-form');if(f){var c=f.closest('.vx-card');if(c)c.style.display='none';}
 var r=document.getElementById('r-cap');if(r&&!r.dataset.td){r.dataset.td=1;r.placeholder='caixa única · despeje antes de perder';}}

/* ---------- liga tudo ---------- */
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{tdPrior();tdFim();tdCapturaUnica();tdAgora();}catch(e){console.error('tdah:',e);}return x;};})();
(function(){var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);try{tdCorrente();tdCapturaUnica();}catch(e){console.error('tdah:',e);}return x;};})();
setTimeout(function(){try{tdDisco(true);tdAgora();tdCorrente();tdPrior();tdFim();tdCapturaUnica();tdSemCastigo();tdAlarmes();}catch(e){console.error('tdah:',e);}},0);

/* ---------- Caixa de entrada da extensão do Chrome ----------
   A extensão nunca grava o registro inteiro: ela deposita eventos em
   vertice_inbox. O app, já sincronizado, aplica cada evento no registro
   (ou nas finanças), grava e apaga o evento da fila. */
var NV_FEITOS=KEY+'-caixa-feitos';
function cxFeitos(){try{return JSON.parse(localStorage.getItem(NV_FEITOS)||'[]');}catch(e){return [];}}
function cxMarca(ids){var a=cxFeitos().concat(ids).slice(-300);try{localStorage.setItem(NV_FEITOS,JSON.stringify(a));}catch(e){}}
function cxGasto(d){var k='sfp_bruno_v4',st;try{st=JSON.parse(localStorage.getItem(k)||'null');}catch(e){st=null;}
 if(!st||!Array.isArray(st.entries))return false;var v=+d.valor||0;if(!v||!d.descricao)return false;var dia=d.dia||hoje();
 st.entries.push({id:'ext'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),tipo:'variavel',mes:dia.slice(0,7),valor:v,prev:v,efet:v,
  descricao:String(d.descricao).slice(0,80),meio:null,grupo:'Gasto diário',diaGasto:dia});
 try{localStorage.setItem(k,JSON.stringify(st));localStorage.setItem(k+'__ts',String(Date.now()));}catch(e){return false;}
 try{if(window.AX&&AX.recarrega)AX.recarrega();}catch(e){}
 return true;}
function cxAplica(ev){var d=ev.dados||{},dia=d.dia||hoje();
 switch(ev.tipo){
  case 'captura':if(!d.t)return false;S.cap=S.cap||[];S.cap.unshift({t:String(d.t).slice(0,300),d:dia});return true;
  case 'agua':S.agua=S.agua||{};S.agua[dia]=Math.max(0,(+S.agua[dia]||0)+(+d.d===-1?-1:1));return true;
  case 'habito':var h=(S.hab||[]).filter(function(x){return x.id===d.id;})[0];if(!h)return false;h.hist=h.hist||[];if(h.hist.indexOf(dia)<0)h.hist.push(dia);return true;
  case 'foco':var m=Math.max(1,Math.min(240,+d.min||0));vxData().sessions.push({id:'ext'+ev.id,day:dia,task:'extensao',minutes:m,result:String(d.tarefa||'foco pela extensão').slice(0,120)});return true;
  case 'prioridade':if(typeof plDia!=='function')return false;var x=plDia(dia),i=+d.i;if(!x.top[i])return false;x.top[i].ok=!!d.ok;return true;
  case 'gasto':return cxGasto(d);
  case 'humor':var hv=+d.v|0;if(hv<1||hv>5)return false;S.estado=S.estado||{};S.estado[dia]=hv;
   anota('Humor pela extensão: '+hv+'/5'+(d.nota?' — '+esc(String(d.nota).slice(0,120)):'')+'.',0,false);return true;
  case 'contador':return cxCont(d,dia);
  case 'ciclo':return cxCiclo(d,dia);
  case 'focoApp':return cxFocoApp(d,dia);
  case 'postoClique':return postoClique(d);}
 return false;}
/* Um cronômetro só: a extensão manda ini, pausa, segue e fim do bloco (id = início do bloco).
   Conflito (o app já tem outro bloco): vale o do app; devolver true grava e a extensão passa a mostrar o do app. */
function cxFocoApp(d,dia){var td=tdD(),f=td.foco,id=+d.id,meu=!!f&&(f.id||f.ini)===id;
 if(d.acao==='ini'){var dur=Math.max(1,Math.min(240,+d.min||25))*60000;if(f)return !meu;if(Date.now()>=+d.ini+dur)return false;
  td.foco={id:id,ini:+d.ini,dur:dur,pausa:null,rot:String(d.rot||'foco pela extensão').slice(0,80),pi:-1,acomp:false,base:dur/60000};try{tdDisco(true);}catch(e){}return true;}
 if(d.acao==='pausa'){if(!meu)return !!f;if(f.pausa==null)f.pausa=Math.max(0,+d.resta||0);return true;}
 if(d.acao==='segue'){if(!meu)return !!f;if(f.pausa!=null){f.ini=+d.fimEm-f.dur;f.pausa=null;}return true;}
 if(d.acao==='fim'){var m=Math.max(0,Math.min(240,+d.min||0));if(meu){f.pausa=Math.max(0,f.dur-m*60000);tdFocoFim(true);return true;}
  var v=vxData(),sid='tdf'+id;if(m<1||v.sessions.some(function(s){return s.id===sid;}))return !!f;
  v.sessions.push({id:sid,day:dia,task:'extensao',minutes:m,result:String(d.rot||'foco pela extensão').slice(0,120)});return true;}
 return false;}
/* Contadores criados na extensão: S.cont.def (lista) e S.cont.dia[AAAA-MM-DD][id] (valor do dia). */
function cxCont(d,dia){if(!d.id)return false;S.cont=S.cont||{};var C=S.cont;C.def=Array.isArray(C.def)?C.def:[];C.dia=C.dia||{};
 if(d.acao==='remover'){C.def=C.def.filter(function(x){return x.id!==d.id;});return true;}
 var df=C.def.filter(function(x){return x.id===d.id;})[0];
 if(!df){df={id:String(d.id).slice(0,40),n:String(d.n||'contador').slice(0,30),u:String(d.u||'vezes').slice(0,20),meta:Math.max(1,+d.meta|0||10)};C.def.push(df);}
 else{if(d.n)df.n=String(d.n).slice(0,30);if(d.meta)df.meta=Math.max(1,+d.meta|0);}
 var o=C.dia[dia]=C.dia[dia]||{};o[df.id]=Math.max(0,(+o[df.id]||0)+(+d.d===-1?-1:1));return true;}
/* Ciclo de estudos pela extensão: fecha o bloco com os minutos do foco ou pula a vez.
   Só avança a roda se o bloco informado ainda for o da vez. */
function cxCiclo(d,dia){var E=S.est;if(!E||!Array.isArray(E.disc)||typeof ordemCiclo!=='function')return false;var o=ordemCiclo();if(!o.length)return false;
 var at=blocoAtual();
 if(d.acao==='pular'){if(d.disc&&d.disc!==at)return false;E.at++;if(E.at%o.length===0)E.volta++;anota('Bloco pulado pela extensão.',0,false);return true;}
 if(d.acao!=='fechar')return false;
 var m=Math.max(1,Math.min(400,+d.min|0)),D=E.disc.filter(function(x){return x.id===d.disc;})[0];if(!D)return false;
 D.min=(D.min|0)+m;E.blocos=Array.isArray(E.blocos)?E.blocos:[];
 E.blocos.unshift({id:'b'+Date.now()+Math.random().toString(36).slice(2,5),data:dia,h:hora(),disc:D.id,min:m,plat:'',top:'',como:'foco pela extensão',quest:'',prox:'',volta:E.volta});
 if(E.blocos.length>60)E.blocos.length=60;
 if(d.disc===at){E.at++;if(E.at%o.length===0)E.volta++;}
 anota('Bloco fechado pela extensão — '+esc(D.nome)+': '+m+' min.',0,false);return true;}
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);if(p&&p.cont&&typeof p.cont==='object')b.cont=p.cont;return b;};})();
/* Mostra os contadores da extensão no painel do corpo, abaixo da leitura do ciclo. */
function ctPinta(){var box=document.querySelector('.corpo');if(!box)return;var c=document.getElementById('ext-ct'),C=S.cont,defs=(C&&Array.isArray(C.def))?C.def:[];
 if(!defs.length){if(c)c.remove();return;}
 if(!c){c=document.createElement('div');c.id='ext-ct';c.style.gridColumn='span 2';box.appendChild(c);}
 var v=(C.dia&&C.dia[hoje()])||{};
 c.innerHTML='<span class="k5">Contadores da extensão</span>'+defs.map(function(x){var n=+v[x.id]||0,p=Math.min(100,Math.round(n/x.meta*100));
  return '<div style="display:grid;grid-template-columns:1fr auto;gap:4px 10px;align-items:baseline;margin-top:10px"><b style="font-family:var(--sans);font-size:13px;color:var(--bone)">'+esc(x.n)+'</b>'+
   '<span style="font-family:var(--mono);font-size:10px;color:var(--dim)">'+n+' / '+x.meta+' '+esc(x.u)+'</span>'+
   '<div style="grid-column:span 2;height:5px;background:var(--well);border:1px solid var(--line2)"><i style="display:block;height:100%;width:'+p+'%;background:var(--red)"></i></div></div>';}).join('');}
(function(){var p0=pinta;pinta=function(){p0();try{ctPinta();}catch(e){console.error('contadores:',e);}};})();
var cxRodando=false;
function nvCaixa(){if(cxRodando||!nv.user||!nv.cli||nv.est!=='ok')return;var b=nvBase();if(!b||b.u!==nv.user.id||b.ts==null)return;cxRodando=true;
 nv.cli.from('vertice_inbox').select('id,tipo,dados,criado').order('id',{ascending:true}).limit(100).then(function(r){
  if(r.error||!r.data||!r.data.length){cxRodando=false;return;}
  var feitos=cxFeitos(),ids=[],mudou=false,n=0;
  r.data.forEach(function(ev){ids.push(ev.id);if(feitos.indexOf(ev.id)>=0)return;if(cxAplica(ev)){mudou=true;n++;}});
  cxMarca(ids);if(mudou){grava();try{pinta();}catch(e){}vxMsg(n+' registro'+(n>1?'s':'')+' da extensão aplicado'+(n>1?'s':'')+'.');}
  nv.cli.from('vertice_inbox').delete().in('id',ids).then(function(){cxRodando=false;},function(){cxRodando=false;});
 },function(){cxRodando=false;});}
setInterval(function(){if(document.visibilityState==='visible')nvCaixa();},30000);
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')setTimeout(nvCaixa,1500);});
(function(){var e0=nvEstado;nvEstado=function(e){e0(e);if(e==='ok')setTimeout(nvCaixa,300);};})();

/* campos novos (apps, spread da semana, mural, arsenal) entram na normalização antes do primeiro carregamento */
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);if(p&&p.rotina&&typeof p.rotina==='object')b.rotina=p.rotina;if(p&&p.quests&&typeof p.quests==='object')b.quests=p.quests;if(p&&p.lojaAc&&typeof p.lojaAc==='object')b.lojaAc=p.lojaAc;return b;};})();
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.arsenal=(p&&p.arsenal&&typeof p.arsenal==='object')?p.arsenal:{};return b;};})();
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);var a=(p&&p.apps&&typeof p.apps==='object')?p.apps:{};
 b.apps={spotify:typeof a.spotify==='string'?a.spotify:'',agenda:typeof a.agenda==='string'?a.agenda:'',ics:typeof a.ics==='string'?a.ics:'',
  cidade:(a.cidade&&typeof a.cidade==='object'&&isFinite(a.cidade.lat))?a.cidade:null,
  atalhos:Array.isArray(a.atalhos)?a.atalhos.filter(function(x){return x&&x.u;}).slice(0,12):null};return b;};})();
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);var w=(p&&p.ws&&typeof p.ws==='object')?p.ws:{};
 b.ws={mes:(w.mes&&typeof w.mes==='object')?w.mes:{},sem:Array.isArray(w.sem)?w.sem.filter(function(x){return x&&x.id&&x.n;}).slice(0,12):[],mk:(w.mk&&typeof w.mk==='object')?w.mk:{},rev:(w.rev&&typeof w.rev==='object')?w.rev:{}};return b;};})();
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);b.pins=Array.isArray(p&&p.pins)?p.pins.filter(function(x){return x&&x.id&&(x.t==='nota'||x.t==='foto'||x.t==='lista');}).slice(0,30):[];return b;};})();
/* Pontes de Hermes (pontes.js): S.pz guarda o que as integrações trazem; window.ASTRO dá ao módulo acesso ao registro */
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);if(p&&p.pz&&typeof p.pz==='object')b.pz=p.pz;return b;};})();
window.ASTRO={get S(){return S;},grava:function(){grava();},pinta:function(){pinta();},vxData:function(){return vxData();},vxMsg:function(m){vxMsg(m);},vxDlg:function(o){vxDlg(o);},
 mmD:function(){return mmD();},mmPinta:function(){try{mmPinta();}catch(e){}},hoje:function(){return hoje();},esc:function(t){return esc(t);},
 /* manual de campo e cofre, para os arquivos à parte (planner/papel.js e planner/caneta.js) */
 get MF_T(){return MF_T;},get MF_C(){return MF_C;},cxPinta:function(){try{cxPinta();}catch(e){}},
 cofre:{aberto:function(){return !!CF.chave;},cifra:function(t){return cfCifra(t);},decifra:function(o){return cfDecifra(o);}}};
/* ---------- Ficha do Campista como livro: cada seção é uma página, duas por vez ----------
   Capa de couro trancada (a senha do cofre abre). Aberto, mostra as páginas lado a lado,
   com fitas marcadoras por seção e setas para virar. As páginas largas (Reinos e Dossiê)
   ocupam as duas folhas. Em tela estreita, uma página por vez. */
var LV={pg:0,alvo:null,folhaT:0};
var LV_FOLHAS=[
 {id:'registro',sec:'Registro',cap:'Capítulo I',t:'Registro do campista'},
 {id:'atrib',sec:'Atributos',cap:'Capítulo II',t:'Atributos'},
 {id:'dons',sec:'Dons',cap:'Capítulo III',t:'Dons e atividades'},
 {id:'destino',sec:'Destino',cap:'Capítulo IV',t:'Falha, matriz e missão'},
 {id:'diario',sec:'Diário',cap:'Capítulo V',t:'Diário do Semideus'},
 {id:'folha',sec:'Diário',cap:'Capítulo V',t:'Folha livre'},
 {id:'reinos',sec:'Reinos',cap:'Capítulo VI',t:'Reinos da árvore',dupla:true},
 {id:'dos-id',sec:'Dossiê',cap:'Apêndice',t:'Dossiê · identidade',dupla:true},
 {id:'dos-ficha',sec:'Dossiê',cap:'Apêndice',t:'Dossiê · dons e técnicas',dupla:true},
 {id:'dos-painel',sec:'Dossiê',cap:'Apêndice',t:'Dossiê · fogo interno',dupla:true},
 {id:'dos-lim',sec:'Dossiê',cap:'Apêndice',t:'Dossiê · ponto fraco',dupla:true},
 {id:'dos-diag',sec:'Dossiê',cap:'Apêndice',t:'Dossiê · oráculo',dupla:true}];
LV_FOLHAS.splice(7,0,{id:'profecia',sec:'Profecia',cap:'Capítulo VII',t:'Profecia do ciclo',dupla:true});
/* Diário: registro do dia, da semana, do mês e andamentos, cada um na sua página */
(function(){var i=LV_FOLHAS.findIndex(function(f){return f.id==='diario';});if(i<0)return;LV_FOLHAS[i].t='Registro do dia';
 LV_FOLHAS.splice(i+1,0,{id:'reg-sem',sec:'Diário',cap:'Capítulo V',t:'Registro da semana'},{id:'reg-mes',sec:'Diário',cap:'Capítulo V',t:'Registro do mês'},{id:'andam',sec:'Diário',cap:'Capítulo V',t:'Andamentos'});})();
var LV_DOS_CORTE={'h-sec':'dos-ficha','h-painel':'dos-painel','h-lim':'dos-lim','h-diag':'dos-diag'};
/* Bestiário: as criaturas do antagonista do dia, vencidas na Arena e registradas na Fogueira */
(function(){var i=LV_FOLHAS.findIndex(function(f){return f.id==='profecia';});LV_FOLHAS.splice(i<0?LV_FOLHAS.length:i+1,0,{id:'bestiario',sec:'Bestiário',cap:'Capítulo VIII',t:'Bestiário',dupla:true});})();
var LV_BEST_SEL=null;
function lvBestHTML(){if(typeof ANTAG==='undefined')return '';var A=(typeof antD==='function')?antD():{dia:{}},B=A.best||{},hj=null;try{hj=antHoje();}catch(e){}
 var ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
 var fug={};Object.keys(A.dia||{}).forEach(function(d){var x=A.dia[d];if(x&&x.st==='fugiu'&&!B[x.m])fug[x.m]=1;});
 var ven=0,cards=ANTAG.map(function(m,i){var b=B[m.k],st=b?'v':(hj&&hj.m===m.k&&hj.st==='aberto')?'j':fug[m.k]?'e':'u';if(b)ven++;
  return '<button type="button" class="bt-c bt-'+st+(LV_BEST_SEL===m.k?' on':'')+'" data-btsel="'+m.k+'"'+(st==='u'?' disabled':'')+'><small>'+ROM[i]+(st==='v'?' · '+b.n+'×':st==='j'?' · hoje':st==='e'?' · escapou':'')+'</small><b>'+(st==='u'?'?':esc(m.n))+'</b></button>';}).join('');
 var sel=LV_BEST_SEL&&(B[LV_BEST_SEL]||(hj&&hj.m===LV_BEST_SEL)||fug[LV_BEST_SEL])?LV_BEST_SEL:null,det='';
 if(sel){var m=antMonstro(sel),b=B[sel];det='<div class="bt-det"><span class="bt-k">'+(b?'vencido '+b.n+'×':'ainda não vencido')+'</span><b>'+esc(m.n)+'</b><p><em>armadilha</em>'+esc(m.o)+'</p><p><em>desafio</em>'+esc(m.d)+'</p>'+
  (b&&b.dias.length?'<p><em>caiu em</em>'+b.dias.slice().reverse().map(function(d){return d.slice(8,10)+'/'+d.slice(5,7);}).join(' · ')+'</p>':'')+'</div>';}
 var reg=[];Object.keys(B).forEach(function(k){(B[k].dias||[]).forEach(function(d){reg.push({k:k,d:d});});});reg.sort(function(a,b){return a.d<b.d?1:-1;});
 var lst=reg.slice(0,12).map(function(r){var m=antMonstro(r.k),x=(A.dia||{})[r.d];return '<li><small>'+r.d.slice(8,10)+'/'+r.d.slice(5,7)+'</small><span><b>'+esc(m.n)+'</b>'+(x?' · bloco das '+x.fx+'h':'')+' · '+esc(m.o)+'</span><small>+20 XP</small></li>';}).join('');
 return '<div class="bt"><div class="bt-col"><div class="bt-top"><span class="bt-k">'+ven+' de '+ANTAG.length+' vencidos</span></div><div class="bt-g">'+cards+'</div>'+det+'</div>'+
  '<div class="bt-col"><span class="bt-k">registro das caçadas</span>'+(lst?'<ul class="bt-reg">'+lst+'</ul>':'<p class="bt-vz">Nenhuma criatura vencida ainda. A primeira vitória entra aqui, com o dia e o bloco.</p>')+
  '<p class="bt-nota">O veredito de cada dia e a carta de amanhã ficam na Fogueira.</p></div></div>';}
function lvBestPinta(){var c=lvCorpo('bestiario');if(!c)return;if(!c._lig){c._lig=1;c.addEventListener('click',function(e){var b=e.target.closest('[data-btsel]');if(!b)return;LV_BEST_SEL=LV_BEST_SEL===b.dataset.btsel?null:b.dataset.btsel;lvBestPinta();});}
 var h=lvBestHTML();if(c._h!==h){c._h=h;c.innerHTML=h;}}
lvPinta=(function(f0){return function(){var r=f0.apply(this,arguments);try{var v=document.querySelector('#lv [data-folha="bestiario"]');if(v&&!v.hidden)lvBestPinta();}catch(e){}return r;};})(lvPinta);
(function(){var st=document.createElement('style');st.id='lv-best-css';st.textContent=[
 '#lv .lv-fita[data-lvsec="Bestiário"]{--c:#8a6a1e}',
 '#lv .bt{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:22px}',
 '@media(max-width:880px){#lv .bt{grid-template-columns:1fr}}',
 '#lv .bt-col{display:flex;flex-direction:column;gap:10px;min-width:0}',
 '#lv .bt-k{font:700 9.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#8a6f55}',
 '#lv .bt-g{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}',
 '@media(max-width:560px){#lv .bt-g{grid-template-columns:repeat(3,minmax(0,1fr))}}',
 '#lv .bt-c{height:92px;width:auto!important;margin:0!important;padding:6px!important;border-radius:7px!important;display:flex;flex-direction:column;justify-content:flex-end;gap:2px;text-align:left;cursor:pointer;border:0!important}',
 '#lv .bt-c small{font:600 8px var(--mono,monospace);letter-spacing:.06em}',
 '#lv .bt-c b{font:700 11px/1.15 Georgia,serif}',
 '#lv .bt-v{background:linear-gradient(160deg,#e2bd5c,#8a6a1e)!important;color:#1d1406;box-shadow:0 0 0 1.5px #5a4210}',
 '#lv .bt-j{background:linear-gradient(160deg,#2b6b43,#123321)!important;color:#f3e6c4;box-shadow:0 0 0 2px #d4ad4f}',
 '#lv .bt-e{background:#cfc6b0!important;color:#4a4438;box-shadow:inset 0 0 0 1px #8a8070}',
 '#lv .bt-u{background:repeating-linear-gradient(135deg,rgba(90,63,44,.08) 0 6px,transparent 6px 12px)!important;color:#a08e72;box-shadow:inset 0 0 0 1px rgba(90,63,44,.3);align-items:center;justify-content:center;cursor:default}',
 '#lv .bt-u b{font-size:20px}',
 '#lv .bt-c.on{outline:2.5px solid #2a2418;outline-offset:2px}',
 '#lv .bt-det{padding:10px 12px;border-radius:8px;background:rgba(255,250,235,.6);border:1px solid rgba(90,63,44,.3)}',
 '#lv .bt-det b{display:block;font:700 17px Georgia,serif;margin:2px 0 4px}',
 '#lv .bt-det p{margin:3px 0;font:13px/1.45 Georgia,serif;color:#2a2418}',
 '#lv .bt-det em{display:inline-block;min-width:74px;font:700 9px var(--mono,monospace);font-style:normal;letter-spacing:.12em;text-transform:uppercase;color:#9a6b3a}',
 '#lv .bt-reg{list-style:none;margin:0;padding:0}',
 '#lv .bt-reg li{display:grid;grid-template-columns:44px 1fr auto;gap:8px;padding:7px 0;border-bottom:1px dotted rgba(90,63,44,.45);font:13px/1.35 Georgia,serif;color:#2a2418}',
 '#lv .bt-reg small{font:600 10px var(--mono,monospace);color:#6f5a45}',
 '#lv .bt-vz,#lv .bt-nota{margin:0;font:italic 13px/1.5 Georgia,serif;color:#5a4636}'
].join('\n');document.head.appendChild(st);})();
var LV_ESTREITO=window.matchMedia?window.matchMedia('(max-width: 880px)'):{matches:false};
var LV_SOL='<svg viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="lvWax" cx="38%" cy="32%" r="75%"><stop offset="0%" stop-color="#d8a94a"/><stop offset="45%" stop-color="#a87a2a"/><stop offset="100%" stop-color="#6b4a16"/></radialGradient></defs>'+
 '<path fill="url(#lvWax)" d="M50 6c7 0 9 6 16 8s12-2 16 5-1 11 2 17 8 7 6 15-9 8-11 15 1 12-5 16-11-2-17 1-8 8-15 8-9-5-16-7-12 3-17-3 1-11-2-17-8-7-6-15 9-8 11-15-1-12 5-16 11 2 17-1 7-6 13-6z"/>'+
 '<circle cx="50" cy="50" r="27" fill="none" stroke="#5a3a10" stroke-width="2" opacity=".5"/><g stroke="#fbe6b0" stroke-width="2.4" stroke-linecap="round" opacity=".9"><circle cx="50" cy="50" r="9" fill="none"/>'+
 '<path d="M50 30v7M50 63v7M30 50h7M63 50h7M36 36l5 5M59 59l5 5M64 36l-5 5M41 59l-5 5"/></g></svg>';
var LV_ASTRO='<svg class="lv-astro" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="36" stroke-dasharray="2 4"/><circle cx="50" cy="50" r="18"/><path d="M50 2v96M2 50h96"/><path d="M50 14l3 7-3 3-3-3z" fill="currentColor" stroke="none" opacity=".7"/></svg>';
var LV_ICO={prev:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',prox:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
 tranca:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'};
function lvCorpo(id){return document.querySelector('#lv [data-folha="'+id+'"] .lv-corpo');}
function lvEstrutura(){var c=document.getElementById('fc-dlg-c');if(!c)return null;var lv=document.getElementById('lv');if(lv&&lv.parentNode===c)return lv;
 if(!lv){lv=document.createElement('div');lv.id='lv';lv.className='lv';
  var fitas=[];LV_FOLHAS.forEach(function(f){if(fitas.indexOf(f.sec)<0)fitas.push(f.sec);});
  lv.innerHTML='<div class="lv-capa" id="lv-capa"><div class="lv-capa-in"><span class="lv-capa-k">Acampamento Meio-Sangue &middot; chal&eacute; 7</span>'+
   '<h2>Ficha do Campista</h2><span class="lv-capa-s">e Di&aacute;rio do Semideus</span><div class="lv-lacre">'+LV_SOL+'</div><div id="lv-cofre"></div>'+
   '<span class="lv-capa-p">registro particular &middot; s&oacute; abre com a senha</span></div></div>'+
   '<div class="lv-livro" id="lv-livro" hidden><div class="lv-topo"><nav class="lv-fitas" aria-label="Seções da ficha">'+
   fitas.map(function(s,i){return '<button type="button" class="lv-fita f'+i+'" data-lvsec="'+s+'">'+s+'</button>';}).join('')+'</nav>'+
   '<button type="button" class="lv-tr" data-lvtr title="Trancar a ficha">'+LV_ICO.tranca+'<span>trancar</span></button></div>'+
   '<div class="lv-spread" id="lv-spread">'+LV_FOLHAS.map(function(f,i){return '<section class="lv-folha" data-folha="'+f.id+'"'+(f.dupla?' data-dupla="1"':'')+' hidden>'+
    '<header class="lv-cab"><span class="lv-cap">'+f.cap+'</span><span class="lv-t">'+f.t+'</span></header><div class="lv-corpo"></div><footer class="lv-num">&mdash; '+(i+1)+' &mdash;</footer></section>';}).join('')+
   '<section class="lv-folha lv-branca" data-folha="branca" hidden><div class="lv-corpo">'+LV_ASTRO+'<p>verso em branco</p></div></section>'+
   '<div class="lv-gutter" aria-hidden="true"></div>'+
   '<button type="button" class="lv-canto lv-ant" data-lvvai="-1" aria-label="Página anterior">'+LV_ICO.prev+'</button>'+
   '<button type="button" class="lv-canto lv-prox" data-lvvai="1" aria-label="Próxima página">'+LV_ICO.prox+'</button></div>'+
   '<div class="lv-pe"><button type="button" data-lvvai="-1">'+LV_ICO.prev+'<span>anterior</span></button><span class="lv-pos" id="lv-pos"></span><button type="button" data-lvvai="1"><span>pr&oacute;xima</span>'+LV_ICO.prox+'</button></div></div>'+
   '<div id="lv-guarda" hidden></div>';
  lv.addEventListener('click',function(e){var t=e.target.closest('[data-lvvai],[data-lvsec],[data-lvtr],[data-lvpapel]');if(!t)return;
   if(t.hasAttribute('data-lvvai')){lvVira(+t.getAttribute('data-lvvai'));return;}
   if(t.hasAttribute('data-lvsec')){lvIrSec(t.getAttribute('data-lvsec'));return;}
   if(t.hasAttribute('data-lvtr')){var d=document.getElementById('fc-dlg');CF.chave=null;try{cfTela();}catch(z){}lvEstado();return;}
   if(t.hasAttribute('data-lvpapel')){lvPapel(t.getAttribute('data-lvpapel'));}});
  lv.addEventListener('input',function(e){if(e.target.id==='lv-folha-ed')lvFolhaSalva();});
  var x0=0;lv.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  lv.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>70&&!e.target.closest('input,textarea,[contenteditable="true"]'))lvVira(dx<0?1:-1);},{passive:true});}
 c.insertBefore(lv,c.firstChild);return lv;}

/* cofre (senha) mora na capa */
function lvCofre(){var h=document.getElementById('lv-cofre');if(!h)return;var c=document.getElementById('cf-cofre');
 if(!c){c=document.createElement('div');c.id='cf-cofre';c.className='cf';
  c.addEventListener('click',function(e){if(e.target.hasAttribute('data-cfok'))cfAbre();if(e.target.hasAttribute('data-cftr')){CF.chave=null;cfTela();}});
  c.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.tagName==='INPUT')cfAbre();});
  if(!lvCofre.lig){lvCofre.lig=1;document.addEventListener('click',function(e){if(e.target.hasAttribute&&e.target.hasAttribute('data-cfadd'))cfAdd();});}
  h.appendChild(c);cfTela();}
 if(c.parentNode!==h)h.appendChild(c);}

/* leva cada parte da ficha para a sua página */
function lvMonta(){var lv=lvEstrutura();if(!lv)return;lvCofre();
 var f=document.getElementById('fc-ficha');
 if(!f){f=document.createElement('div');f.id='fc-ficha';f.className='fc';f.innerHTML=FC_HTML;}
 f.hidden=false;f.style.display='';
 var reg=lvCorpo('registro');if(f.parentNode!==reg)reg.appendChild(f);
 if(!f.dataset.lv){f.dataset.lv='1';
  var at=f.querySelector(':scope > .fc-sec');if(at)lvCorpo('atrib').appendChild(at);
  var dois=f.querySelectorAll(':scope > .fc-two');if(dois[0])lvCorpo('dons').appendChild(dois[0]);
  var dest=lvCorpo('destino');if(dois[1])dest.appendChild(dois[1]);
  Array.prototype.forEach.call(f.querySelectorAll(':scope > .fc-prof, :scope > .fc-obs'),function(n){dest.appendChild(n);});}
 var di=document.getElementById('cf-diario');if(di&&di.parentNode!==lvCorpo('diario'))lvCorpo('diario').appendChild(di);
 lvFolhaMonta();
 var rs=axReinosSec();if(rs&&rs.parentNode!==lvCorpo('reinos'))lvCorpo('reinos').appendChild(rs);
 var arq=document.getElementById('arq-antigo');
 if(arq){var g=document.getElementById('lv-guarda');if(arq.parentNode!==g)g.appendChild(arq);
  var filhos=Array.prototype.filter.call(arq.children,function(n){return n.tagName!=='SUMMARY';});
  if(filhos.length){var alvo='dos-id';filhos.forEach(function(n){if(LV_DOS_CORTE[n.id])alvo=LV_DOS_CORTE[n.id];n.dataset.vxHidden='false';lvCorpo(alvo).appendChild(n);});}
  arq.hidden=true;}
 lvEstado();}
function lvFolhas(){return LV_FOLHAS.filter(function(f){if(f.id.indexOf('dos-')===0||f.id==='reinos'){var c=lvCorpo(f.id);return c&&c.children.length>0;}return true;});}
function lvSpreads(){var L=lvFolhas(),r=[],i=0;
 if(LV_ESTREITO.matches)return L.map(function(f){return [f.id];});
 while(i<L.length){var a=L[i];if(a.dupla){r.push([a.id]);i++;continue;}var b=L[i+1];
  if(b&&!b.dupla){r.push([a.id,b.id]);i+=2;}else{r.push([a.id,'branca']);i++;}}
 return r;}
function lvEstado(){var capa=document.getElementById('lv-capa'),liv=document.getElementById('lv-livro');if(!capa||!liv)return;
 var aberto=!!CF.chave;if(capa.hidden!==aberto)capa.hidden=aberto;if(liv.hidden!==!aberto)liv.hidden=!aberto;
 var d=document.getElementById('fc-dlg');if(d)d.classList.toggle('lv-aberta',aberto);
 if(aberto){if(LV.alvo){var a=LV.alvo;LV.alvo=null;lvIrNo(a);}lvPinta();}}
function lvPinta(anim){var S2=lvSpreads();if(!S2.length)return;LV.pg=Math.max(0,Math.min(LV.pg,S2.length-1));
 try{localStorage.setItem('astro_lv_pg',LV.pg);}catch(e){}
 var vis=S2[LV.pg],L=lvFolhas();
 Array.prototype.forEach.call(document.querySelectorAll('#lv .lv-folha'),function(s){var id=s.getAttribute('data-folha'),k=vis.indexOf(id);
  var lado=k<0?'':(vis.length===1?'dupla':(k===0?'esq':'dir'));
  if(s.hidden!==(k<0))s.hidden=k<0;if((s.getAttribute('data-lado')||'')!==lado)s.setAttribute('data-lado',lado);
  if(k>=0&&!anim)s.scrollTop=0;});
 var sp=document.getElementById('lv-spread');if(sp){sp.classList.toggle('so1',vis.length===1);
  if(anim){sp.classList.remove('vira-p','vira-a');void sp.offsetWidth;sp.classList.add(anim>0?'vira-p':'vira-a');
   Array.prototype.forEach.call(sp.querySelectorAll('.lv-folha:not([hidden])'),function(s){s.scrollTop=0;});}}
 var secs=vis.map(function(id){var f=LV_FOLHAS.filter(function(x){return x.id===id;})[0];return f&&f.sec;});
 Array.prototype.forEach.call(document.querySelectorAll('#lv [data-lvsec]'),function(b){var on=secs.indexOf(b.getAttribute('data-lvsec'))>=0;if(b.classList.contains('on')!==on)b.classList.toggle('on',on);});
 var nums=vis.filter(function(id){return id!=='branca';}).map(function(id){return L.map(function(f){return f.id;}).indexOf(id)+1;});
 var pos=document.getElementById('lv-pos'),txt='página'+(nums.length>1?'s ':' ')+nums.join('–')+' de '+L.length;if(pos&&pos.textContent!==txt)pos.textContent=txt;
 Array.prototype.forEach.call(document.querySelectorAll('#lv [data-lvvai]'),function(b){var v=+b.getAttribute('data-lvvai');var off=(v<0&&LV.pg===0)||(v>0&&LV.pg===S2.length-1);if(b.disabled!==off)b.disabled=off;});
 if(vis.indexOf('folha')>=0)lvFolhaCarrega();}
function lvVira(d){var n=lvSpreads().length;var p=Math.max(0,Math.min(n-1,LV.pg+d));if(p===LV.pg)return;LV.pg=p;lvPinta(d);}
function lvIrNo(id){var S2=lvSpreads();for(var i=0;i<S2.length;i++){if(S2[i].indexOf(id)>=0){var d=i>LV.pg?1:-1;LV.pg=i;lvPinta(d);return true;}}return false;}
function lvIrSec(sec){var f=lvFolhas().filter(function(x){return x.sec===sec;})[0];if(f)lvIrNo(f.id);}
/* vai até a página que contém um elemento (atalhos do sumário para o Dossiê) */
function lvIrEl(elId){var el=document.getElementById(elId);var s=el&&el.closest('.lv-folha');if(!s)return false;lvIrNo(s.getAttribute('data-folha'));setTimeout(function(){try{el.scrollIntoView({block:'start',behavior:'smooth'});}catch(e){}},120);return true;}
try{var p0=+localStorage.getItem('astro_lv_pg');if(p0>0)LV.pg=p0;}catch(e){}
if(LV_ESTREITO.addEventListener)LV_ESTREITO.addEventListener('change',function(){LV.pg=0;lvPinta();});

/* folha livre: anotações à mão, cifradas com a mesma chave do diário */
function lvFolhaMonta(){var c=lvCorpo('folha');if(!c||document.getElementById('lv-folha-ed'))return;var m='dots';try{m=localStorage.getItem('astro_lv_papel')||'dots';}catch(e){}
 c.innerHTML='<div class="lv-ferr" role="toolbar" aria-label="Estilo do papel">'+
  [['dots','Pontilhado','<circle cx="5" cy="5" r="1.3"/><circle cx="12" cy="5" r="1.3"/><circle cx="19" cy="5" r="1.3"/><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/><circle cx="5" cy="19" r="1.3"/><circle cx="12" cy="19" r="1.3"/><circle cx="19" cy="19" r="1.3"/>'],
   ['grid','Quadriculado','<path d="M3 8h18M3 16h18M8 3v18M16 3v18" fill="none"/>'],['lines','Pautado','<path d="M4 7h16M4 12h16M4 17h16" fill="none"/>'],['blank','Liso','<rect x="4" y="4" width="16" height="16" rx="2" fill="none"/>']]
  .map(function(p){return '<button type="button" data-lvpapel="'+p[0]+'" title="'+p[1]+'" aria-label="'+p[1]+'" aria-pressed="'+(m===p[0])+'"><svg viewBox="0 0 24 24" aria-hidden="true">'+p[2]+'</svg></button>';}).join('')+
  '<span class="lv-ferr-n">anota&ccedil;&otilde;es de campo &middot; cifradas</span></div>'+
  '<div class="lv-tela '+m+'" id="lv-folha-ed" contenteditable="true" spellcheck="false" data-ph="esboços, mapas, flechas, listas soltas, o que vier à cabeça…"></div>'+
  '<span class="lv-salvo" id="lv-salvo"></span>';}
function lvPapel(m){var t=document.getElementById('lv-folha-ed');if(!t)return;t.className='lv-tela '+m;try{localStorage.setItem('astro_lv_papel',m);}catch(e){}
 Array.prototype.forEach.call(document.querySelectorAll('#lv [data-lvpapel]'),function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-lvpapel')===m));});}
async function lvFolhaCarrega(){var t=document.getElementById('lv-folha-ed');if(!t||!CF.chave||t.dataset.ok)return;t.dataset.ok='1';
 var o=S.cofre&&S.cofre.folha;if(!o){t.innerText='';return;}try{t.innerText=await cfDecifra(o);}catch(e){t.innerText='';}}
function lvFolhaSalva(){clearTimeout(LV.folhaT);var m=document.getElementById('lv-salvo');if(m)m.textContent='…';
 LV.folhaT=setTimeout(async function(){var t=document.getElementById('lv-folha-ed');if(!t||!CF.chave||!S.cofre)return;
  try{S.cofre.folha=await cfCifra(t.innerText);grava();if(m)m.textContent='guardada';}catch(e){if(m)m.textContent='não consegui guardar';}},800);}
function lvFolhaLimpa(){var t=document.getElementById('lv-folha-ed');if(t){t.innerText='';delete t.dataset.ok;}}

/* as funções antigas de encaixe passam a usar o livro */
fcFicha=function(){fcDlg();lvMonta();
 /* no Arsenal fica só o cartão que abre o livro */
 var s=arsSec();if(s&&!document.getElementById('fc-abre')){s.innerHTML='<button type="button" id="fc-abre" class="fc-abre"><img alt="" src="'+(typeof ARTE_R!=='undefined'?ARTE_R:'')+'">'+
  '<span><b>Ficha do Campista</b><small>e Diário do Semideus · abre com senha</small></span><i>🔒 abrir</i></button>';
  document.getElementById('fc-abre').onclick=fcAbreDlg;}};
cfMonta=function(){fcDlg();lvMonta();};
arqNoDialogo=function(){lvMonta();};
axReinosSec=function(){var s=document.getElementById('fc-reinos');
 if(!s){s=document.createElement('section');s.id='fc-reinos';s.className='fc-reinos';
  s.innerHTML='<div class="fc-k">os reinos da árvore &middot; só você vê</div><h3>Reinos da árvore</h3><div class="fc-reino-bt">'+
   AX_REINOS.map(function(r){return '<button type="button" data-reino="'+r[0]+'" aria-pressed="false"><b>'+r[1]+'</b><small>'+r[2]+'</small></button>';}).join('')+
   '</div><div id="fc-reino-palco" hidden></div>';
  s.addEventListener('click',function(e){var b=e.target.closest('[data-reino]');if(!b)return;if(b.getAttribute('aria-pressed')==='true'){axReinoSai();return;}axReino(b.getAttribute('data-reino'));});}
 var c=lvCorpo('reinos');if(c&&s.parentNode!==c)c.appendChild(s);s.hidden=false;return s;};
(function(){var t0=cfTela;cfTela=function(){t0.apply(this,arguments);if(!CF.chave)lvFolhaLimpa();try{lvEstado();}catch(e){}};})();
/* o Dossiê saiu do <details>: a tradução para o acampamento percorre as páginas dele */
dossieCamp=function(){Array.prototype.forEach.call(document.querySelectorAll('#lv .lv-folha[data-folha^="dos-"] .lv-corpo'),function(root){
 var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n;
 while((n=tw.nextNode())){var v=n.nodeValue;if(!v||!v.trim())continue;var nv=dsTraduz(v);if(nv!==v)n.nodeValue=nv;}
 Array.prototype.forEach.call(root.querySelectorAll('[placeholder]'),function(i){var v=i.getAttribute('placeholder'),nv=dsTraduz(v);if(nv!==v)i.setAttribute('placeholder',nv);});});};
/* botão do Diário no topo: abre direto na página do diário */
dsVai=function(){if(!lvIrNo('diario'))return false;var t=document.getElementById('cf-nova');if(t)setTimeout(function(){try{t.focus({preventScroll:true});}catch(e){}},380);return true;};
/* atalhos do sumário que apontavam para o arquivo antigo: abrem o livro na página certa */
window.addEventListener('click',function(e){var nb=e.target.closest&&e.target.closest('#nav-l [data-nv]');if(!nb)return;var k=nb.getAttribute('data-nv');
 if(!ARQ_NV[k])return;if(CF.chave){setTimeout(function(){lvIrEl(k);},80);return;}var el=document.getElementById(k),s=el&&el.closest('.lv-folha');LV.alvo=s?s.getAttribute('data-folha'):null;},true);
cfDiario=(function(d0){return function(){var r=d0.apply(this,arguments);try{lvMonta();}catch(e){}return r;};})(cfDiario);
document.addEventListener('keydown',function(e){var d=document.getElementById('fc-dlg');if(!d||!d.open||!CF.chave)return;
 var t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
 if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();lvVira(1);}if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();lvVira(-1);}});


/* ---------- junção das duas versões (esta conversa + a outra) ----------
   Painel direito de ícones fica só com Bolsa de Dracmas e Bunker 9: Enfermaria e Laptop de Dédalo
   já moram nos painéis laterais e não podem ser disputados pelos dois. */
PD_ABAS.splice(0,PD_ABAS.length,['fin','Bolsa de Dracmas'],['b9','Bunker 9'],['lap','Laptop'],['enf','Enfermaria']);
/* a Enfermaria volta ao painel direito expansível: sai do cartão da esquerda, leva junto a medicação do dia */
latEnfNos=function(){return [];};
function enfMed(){var pd=document.getElementById('painel-dir'),pane=pd&&pd.querySelector('[data-pane="enf"]'),med=document.getElementById('lat-med');
 if(!pane||!med)return;med.classList.add('enf-med');if(pane.firstChild!==med)pane.insertBefore(med,pane.firstChild);}
(function(){var m0=pdMonta;pdMonta=function(){var pd=m0.apply(this,arguments);try{enfMed();}catch(e){}return pd;};
 var a0=pdAbre;pdAbre=function(k){var x=a0.apply(this,arguments);try{enfMed();}catch(e){}return x;};})();
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tt-indice [data-ic="enf"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{pdAbre('enf');}catch(z){}},true);
/* o Laptop de Dédalo agora é o Eumátheia do painel direito: a coluna direita antiga não pega mais as peças de estudo */
latEstNos=function(){return [];};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tt-indice [data-ic="laptop"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{pdAbre('lap');}catch(z){}},true);
/* Bunker 9 ganha um ícone no índice (no lugar da faixa de ícones do painel direito) */
(function(){var i0=ttIcones;ttIcones=function(){i0();var n=document.getElementById('tt-indice');if(!n||n.querySelector('[data-ic="b9"]'))return;
 var b=document.createElement('button');b.type='button';b.className='tt-ic';b.dataset.ic='b9';b.title='Bunker 9 · projetos e retomadas';b.setAttribute('aria-label',b.title);
 b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+PD_ICON.b9+'</svg>';
 var f=n.querySelector('[data-tt="fin"]');if(f&&f.nextSibling)n.insertBefore(b,f.nextSibling);else n.appendChild(b);
 b.addEventListener('click',function(e){e.stopPropagation();try{pdAbre('b9');}catch(z){}});};})();
/* o ícone da Bolsa no índice abre a Bolsa de Dracmas no painel direito */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tt-indice [data-tt="fin"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{pdAbre('fin');}catch(z){}},true);

/* modo claro/escuro: botão sol/lua na linha de cima do banner, fora do frontão */
var TEMA_IC={sol:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/></svg>',
 lua:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>'};
function temaIc(){var bm=document.getElementById('bn-min');if(!bm)return;var row=bm.parentNode;
 if(!row.classList.contains('bn-row')){var r=document.createElement('div');r.className='bn-row';row.insertBefore(r,bm);r.appendChild(bm);row=r;}
 var b=document.getElementById('tema-ic');
 if(!b){b=document.createElement('button');b.type='button';b.id='tema-ic';b.className='tema-ic';row.insertBefore(b,bm);
  b.addEventListener('click',function(){var o=document.getElementById('b-tema');if(o)o.click();setTimeout(temaIc,0);});}
 var claro=!document.documentElement.classList.contains('noite'),h=claro?TEMA_IC.lua:TEMA_IC.sol;if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}
 b.title=claro?'Mudar para o modo escuro':'Mudar para o modo claro';b.setAttribute('aria-label',b.title);}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{temaIc();}catch(e){}return x;};setTimeout(function(){try{temaIc();}catch(e){}},300);})();

/* a caixa única de captura sai do banner e entra no topo do Quadro de avisos (coluna direita): um quadro só */
latMural=function(){var ri=document.getElementById('rail-in'),cb=document.getElementById('cerbox');if(!ri||!cb)return;try{latRailCss();}catch(e){}
 var bt=cb.querySelector('.cerbt');if(bt){if(bt.nextElementSibling!==ri)bt.insertAdjacentElement('afterend',ri);}else if(ri.parentNode!==cb)cb.insertBefore(ri,cb.firstChild);
 var m=document.querySelector('.vx-hero .cp-mural');if(m&&!m.querySelector(':scope > :not(#rail-in)'))m.classList.add('cp-vazio');};
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{latMural();}catch(e){}return x;};})();

/* data, semana e próximo toque da concha saem do rodapé e vão para a linha do "limpar semana" da Grade */
function tbData(){var tb=document.querySelector('.wrap > div.tb'),cab=tb&&tb.querySelector('.tbcab');if(!cab)return;var w=cab.querySelector('.tb-dt');
 if(!w){w=document.createElement('div');w.className='tb-dt';var bt=cab.querySelector('#b-tb-lp');bt?cab.insertBefore(w,bt):cab.appendChild(w);
  w.addEventListener('click',function(e){if(e.target.closest('.cr-concha')){var r=document.getElementById('rt-box');if(r)r.scrollIntoView({behavior:'smooth',block:'start'});}});}
 var pt=null;try{pt=rtProx();}catch(e){}
 var h=crData()+(pt?'<button type="button" class="cr-concha" title="próximo toque: '+esc(pt.h+' · '+pt.n)+'">'+RT_IC.concha+'<span><small>concha</small><b>'+esc(pt.h)+'</b></span></button>':'');
 if(w._h!==h||(h&&!w.firstChild)){w.innerHTML=h;w._h=h;}}
(function(){var p0=pinta;pinta=function(){p0();try{tbData();}catch(e){}};})();
setInterval(function(){try{tbData();}catch(e){}},60e3);setTimeout(function(){try{tbData();}catch(e){}},700);

/* Corrente do dia mora dentro da Inspeção dos Chalés. A rotina redesenha o cartão inteiro a cada clique;
   a corrente é guardada e devolvida ao encaixe, e os cliques dela não chegam à rotina. */
var RT_COR=null;
function rtCorEncaixa(){var sl=document.getElementById('rt-cor-slot');if(!sl)return;var c=document.getElementById('td-cor')||RT_COR;
 if(!c){try{tdCorrente();}catch(e){}c=document.getElementById('td-cor');}if(!c)return;RT_COR=c;
 if(!c.dataset.rtIsola){c.dataset.rtIsola='1';['click','change','input','keydown'].forEach(function(t){c.addEventListener(t,function(e){e.stopPropagation();});});}
 if(c.parentNode!==sl)sl.appendChild(c);}
(function(){var t0=tdCorrente;tdCorrente=function(){if(RT_COR&&!RT_COR.isConnected){var sl=document.getElementById('rt-cor-slot');if(sl)sl.appendChild(RT_COR);}var x=t0.apply(this,arguments);try{rtCorEncaixa();}catch(e){}return x;};
 var p0=rtPinta;rtPinta=function(){var x=p0.apply(this,arguments);try{rtCorEncaixa();var b=document.getElementById('rt-box');if(b&&!b.dataset.rtCorObs){b.dataset.rtCorObs='1';new MutationObserver(function(){if(RT_COR&&!RT_COR.isConnected)rtCorEncaixa();}).observe(b,{childList:true});}}catch(e){}return x;};})();

/* ---------- Tarefas e Missões num painel 3×2 (rotina em cima, mural embaixo) + Trabalhos de Hércules ---------- */
function tmPainel(ref){var wr=document.querySelector('.wrap');if(!wr)return null;var p=document.getElementById('tm-painel');
 if(!p){p=document.createElement('section');p.id='tm-painel';p.dataset.area='op';
  p.innerHTML='<header class="tm-cab"><span class="k9">o dia no acampamento</span><b>Tarefas e Missões</b></header>'+
   '<div class="tm-lb">tarefas &middot; a rotina do chal&eacute;</div><div class="tm-r" id="tm-r1"></div>'+
   '<div class="tm-lb">miss&otilde;es</div><div class="tm-r" id="tm-r2"></div>'+
   '<div class="tm-lb">trabalhos de H&eacute;rcules &middot; metas longas, pagam em dracmas</div><div class="tm-r" id="tm-r3"></div>';}
 p.dataset.vxHidden='false';ref=ref||document.querySelector('.wrap > div.rt');
 if(ref&&ref.parentNode===wr&&ref.nextElementSibling!==p)wr.insertBefore(p,ref.nextSibling);
 return {p:p,r1:p.querySelector('#tm-r1'),r2:p.querySelector('#tm-r2'),r3:p.querySelector('#tm-r3')};}
var MM_PROV=null;
function tmProvas(){var pv=document.getElementById('prov')||MM_PROV,sl=document.getElementById('mm-herc-slot');if(!pv)return;MM_PROV=pv;if(sl&&pv.parentNode!==sl){sl.appendChild(pv);try{pintaProvas();}catch(e){}}}
document.addEventListener('toggle',function(e){if(e.target&&e.target.id==='mm-drop'){try{localStorage.setItem('astro_mm_drop',e.target.open?'1':'0');}catch(z){}}},true);
/* ---------- Quadro de avisos como coluna fixa à direita (tela larga); na estreita volta ao corpo ---------- */
function qaRail(){var cup=document.getElementById('c-h-cup'),rail=document.getElementById('rail'),wr=document.querySelector('.wrap');if(!cup||!rail||!wr)return;
 var ph=document.getElementById('qa-ph');if(!ph&&cup.parentNode===wr){ph=document.createElement('i');ph.id='qa-ph';ph.hidden=true;wr.insertBefore(ph,cup);}
 if(LAT_LARGA.matches){if(rail.firstElementChild!==cup)rail.insertBefore(cup,rail.firstChild);cup.dataset.vxHidden='false';cup.classList.remove('meia');}
 else if(ph&&cup.parentNode!==wr)wr.insertBefore(cup,ph.nextSibling);}
(function(){var p0=latPosiciona;latPosiciona=function(){p0.apply(this,arguments);try{qaRail();tmProvas();}catch(e){console.error('qa:',e);}};})();
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{qaRail();tmProvas();}catch(e){}return x;};})();
setTimeout(function(){if(typeof LAT_LARGA!=='undefined'&&LAT_LARGA.addEventListener)LAT_LARGA.addEventListener('change',function(){try{qaRail();}catch(e){}});},0);
/* a aba Missões do índice leva ao painel de Tarefas e Missões */
setTimeout(function(){if(typeof ttAlvo==='function'){var a0=ttAlvo;ttAlvo=function(a){if(a==='camp'){var p=document.getElementById('tm-painel');if(p)return p;}return a0(a);};}},0);
/* "abrir o quadro" no banner: com a coluna à direita, só leva até ela */
(function(){var c0=cerAbre;cerAbre=function(x){var cup=document.getElementById('c-h-cup');
 if(x&&cup&&cup.closest('#rail')){cup.scrollIntoView({block:'start',behavior:'smooth'});cup.classList.add('pisca');setTimeout(function(){cup.classList.remove('pisca');},1400);return;}
 return c0.apply(this,arguments);};})();

ler(); cicloNovo();
/* Semente da semana 23–29/11/2026: preenche só células vazias e cria os projetos uma vez. */
(function(){ try{
 var FLAG="seed|semana-2026-11-23"; S.tb=S.tb||{}; if(S.tb[FLAG]) return;
 var D=["2026-11-23","2026-11-24","2026-11-25","2026-11-26","2026-11-27","2026-11-28","2026-11-29"];
 var G={
  "06":["Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","Estudo TRF3 6h30–8h","",""],
  "09":["Rota do dia · Bloco 1","Rota do dia · Bloco 1","Rota do dia · Bloco 1","Rota do dia · Bloco 1","Rota do dia · Bloco 1","Comprar máquina + itens","Estudo TRF3 · revisão"],
  "12":["Almoço · ligar natação","Almoço · Bloco 2","Almoço · Bloco 2","Almoço · Bloco 2","Almoço · Bloco 2","Almoço · descanso",""],
  "15":["Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Bloco 3 · fechar às 17h","Quarto: montar e fixar","Planejar semana 30/11"],
  "18":["Achar academia no trajeto","Natação (a confirmar)","Academia","Natação (a confirmar)","Livre","Livre","Livre"],
  "21":["Quarto: triar e descartar","Quarto: definir layout","Pesquisar máquina lavar","Quarto: guardar por zona","Livre · games","",""]
 };
 var f,i,id; for(f in G) for(i=0;i<7;i++){ id=D[i]+"|"+f; if(G[f][i]&&!S.tb[id]) S.tb[id]=G[f][i]; }
 var P=[
  {nome:"Casa nova · quarto pronto",criterion:"Quarto arrumado, cada coisa com lugar definido e máquina de lavar instalada.",
   passos:["Triar e descartar o que não fica","Definir o layout do quarto","Pesquisar e escolher a máquina de lavar","Comprar a máquina e os itens que faltam","Guardar tudo por zona","Montar e fixar o que faltar"]},
  {nome:"Rotina nova · corpo",criterion:"Natação e academia com dia e horário fixos na grade semanal.",
   passos:["Ligar para a natação: horários e preço","Achar academia no trajeto do trabalho","Visitar a academia e fechar plano","Lançar os horários fixos na grade"]}
 ];
 S.proj=Array.isArray(S.proj)?S.proj:[];
 var ativos=S.proj.filter(function(p){return p.est==="ativo";}).length, lim=(S.vx&&S.vx.limit)||3, n=0;
 P.forEach(function(q){
  if(S.proj.some(function(p){return p.nome===q.nome;})) return; n++;
  S.proj.push({id:"p"+Date.now()+n,nome:q.nome,criterion:q.criterion,prazo:"2026-11-29",
   passos:q.passos.map(function(t,k){return {vid:"s"+Date.now()+n+"_"+k,t:t,ok:false};}),
   aberto:hoje(),ult:hoje(),est:(ativos++<lim)?"ativo":"pausado"}); });
 S.tb[FLAG]="1"; grava();
}catch(e){ console.error("semente da semana:",e); } })();



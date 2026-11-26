/* ==========================================================================
   Caduceu de Hermes: integrações externas do Astronáutica (nomes do universo de Rick Riordan)
   - Hefesto TV (RSS via rss2json): faixa discreta acima do rodapé
   - Hermes Express (Raindrop.io): fila de leitura em blocos de 15 min no Laptop
   - Águas do Lete (Readwise): destaques viram Tabuinhas de Cadmo (notas); revisão espaçada vira quest diária
   - Relógio-escudo de Tyson (Toggl Track): entradas viram sessões da Linha de Tiro (dracmas e Copa)
   - Tênis alados · Maia! (Strava): minutos de atividade entram no medidor de Movimento
   - Acampamento Júpiter (Habitica): hábitos do app ↔ dailies do Habitica
   As chaves ficam só neste aparelho (localStorage). O que é registro (sessões,
   minutos, notas, mapeamentos) vai para S.pz e sincroniza pela nuvem.
   O app expõe window.ASTRO de dentro do script principal.
   ========================================================================== */
(function(){
'use strict';
var A=window.ASTRO;if(!A)return;
var FN='https://gubpygurtxadsncthttg.supabase.co/functions/v1/pontes';
var CHV='astro-pontes-v1',RSS_CACHE='astro-rss-cache-v1';
var ST={};/* estado de cada ponte nesta sessão: {ok,msg,t} */

/* ---------- utilidades ---------- */
function esc(t){return A.esc(t==null?'':String(t));}
function hoje(){return A.hoje();}
function dstr(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function diasAtras(n){var d=new Date();d.setDate(d.getDate()-n);return dstr(d);}
function hm(min){min=Math.round(min||0);var h=Math.floor(min/60),m=min%60;return h?h+'h'+(m?String(m).padStart(2,'0'):''):m+' min';}
function quando(t){if(!t)return '';var s=Math.round((Date.now()-t)/60000);return s<1?'agora':s<60?'há '+s+' min':'há '+Math.round(s/60)+' h';}
function cf(){try{return JSON.parse(localStorage.getItem(CHV)||'{}')||{};}catch(e){return {};}}
function cfSet(k,v){var c=cf();if(v==null||v==='')delete c[k];else c[k]=v;try{localStorage.setItem(CHV,JSON.stringify(c));}catch(e){}}
function Z(){var S=A.S;if(!S.pz||typeof S.pz!=='object')S.pz={};var z=S.pz;
 z.rss=z.rss||{feeds:PADRAO_RSS.slice(),filtro:'',on:true};
 z.rd=z.rd||{col:0,tag:'',lidos:{}};z.rd.lidos=z.rd.lidos||{};
 z.rw=z.rw||{pool:[],visto:{},ult:'',dia:null};
 z.tg=z.tg||{tag:'',env:false,enviados:[]};
 z.sv=z.sv||{ativ:{}};z.sv.ativ=z.sv.ativ||{};
 z.hb=z.hb||{map:{},on:true};z.hb.map=z.hb.map||{};
 return z;}
function marca(k,ok,msg){ST[k]={ok:ok,msg:msg||'',t:Date.now()};pintaPontes();}
function salva(){try{A.grava();}catch(e){}}
function repinta(){try{A.pinta();}catch(e){}pintaLaptop();pintaPontes();}

/* chamada pela função pontes do Supabase (Readwise, Raindrop, Toggl, Strava) */
function ponte(alvo,metodo,caminho,auth,corpo){
 return fetch(FN,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({alvo:alvo,metodo:metodo,caminho:caminho,auth:auth,corpo:corpo})})
  .then(function(r){return r.text().then(function(t){var d=null;try{d=JSON.parse(t);}catch(e){d=t;}
   if(!r.ok){var m=(d&&(d.erro||d.message||d.error||d.detail||d.errorMessage))||('erro '+r.status);if(r.status===401||r.status===403)m='chave recusada ('+r.status+')';throw new Error(String(m).slice(0,120));}
   return d;});});}

/* ======================= Hefesto TV (RSS) ======================= */
var PADRAO_RSS=['https://www.conjur.com.br/rss.xml','https://www.jota.info/feed','https://res.stj.jus.br/hrestp-c-portalp/RSS.xml'];
var RSS={itens:[],quando:0};
function rssBusca(forca){var z=Z().rss;if(!z.on||!z.feeds.length){RSS.itens=[];pintaTicker();return;}
 var cache=null;try{cache=JSON.parse(localStorage.getItem(RSS_CACHE)||'null');}catch(e){}
 var chave=z.feeds.join('|');
 if(!forca&&cache&&cache.k===chave&&Date.now()-cache.t<30*60e3){RSS.itens=cache.itens;RSS.quando=cache.t;pintaTicker();return;}
 Promise.all(z.feeds.map(function(u){return fetch('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(u))
   .then(function(r){return r.json();}).then(function(d){if(d.status!=='ok')throw new Error(d.message||'feed');
    var fonte=(d.feed&&d.feed.title)||u.replace(/^https?:\/\/(www\.)?/,'').split('/')[0];
    return (d.items||[]).slice(0,15).map(function(i){return {t:String(i.title||'').trim(),l:i.link,d:i.pubDate,f:String(fonte).slice(0,40)};});})
   .catch(function(){return [];});}))
  .then(function(listas){var vistos={},it=[].concat.apply([],listas).filter(function(i){if(!i.t||!/^https?:/.test(i.l||'')||vistos[i.l])return false;vistos[i.l]=1;return true;});
   it.sort(function(a,b){return new Date(String(b.d).replace(' ','T'))-new Date(String(a.d).replace(' ','T'));});
   RSS.itens=it.slice(0,40);RSS.quando=Date.now();
   try{localStorage.setItem(RSS_CACHE,JSON.stringify({k:chave,t:RSS.quando,itens:RSS.itens}));}catch(e){}
   marca('rss',it.length>0,it.length?it.length+' notícias':'nenhum feed respondeu');pintaTicker();});}
function rssFiltrados(){var f=(Z().rss.filtro||'').trim(),re=null;if(f){try{re=new RegExp(f,'i');}catch(e){re=null;}}
 return RSS.itens.filter(function(i){return !re||re.test(i.t);}).slice(0,12);}
function pintaTicker(){var z=Z().rss,t=document.getElementById('pz-ticker'),it=rssFiltrados(),oculto=localStorage.getItem('astro-rss-oculto')===hoje();
 if(!z.on||!it.length||oculto){if(t)t.remove();document.body.classList.remove('pz-com-ticker');return;}
 if(!t){t=document.createElement('div');t.id='pz-ticker';t.setAttribute('role','region');t.setAttribute('aria-label','Hefesto TV');document.body.appendChild(t);
  t.addEventListener('click',function(e){if(e.target.closest('.pz-tk-x')){localStorage.setItem('astro-rss-oculto',hoje());pintaTicker();}});}
 var lin=it.map(function(i){return '<a href="'+esc(i.l)+'" target="_blank" rel="noopener noreferrer"><i>'+esc(i.f)+'</i>'+esc(i.t)+'</a>';}).join('<span class="pz-tk-s">·</span>');
 t.innerHTML='<span class="pz-tk-k">Hefesto TV · ao vivo</span><div class="pz-tk-v"><div class="pz-tk-trilho" style="--pz-dur:'+Math.max(40,it.length*9)+'s">'+lin+'<span class="pz-tk-s">·</span>'+lin+'</div></div><button type="button" class="pz-tk-x" title="esconder até amanhã" aria-label="esconder o boletim até amanhã">✕</button>';
 document.body.classList.add('pz-com-ticker');posTicker();}
function posTicker(){var t=document.getElementById('pz-ticker'),r=document.getElementById('rod-apps');if(!t)return;
 var h=r?Math.max(0,window.innerHeight-r.getBoundingClientRect().top):0;t.style.bottom=h+'px';}

/* ======================= Hermes Express (Raindrop) ======================= */
var RD={itens:[],ler:null};
function rdBusca(){var tok=cf().rd;if(!tok){RD.itens=[];return Promise.resolve();}var z=Z().rd;
 var q='raindrops/'+(parseInt(z.col,10)||0)+'?perpage=40&sort=-created'+(z.tag?'&search='+encodeURIComponent('#'+z.tag):'');
 return ponte('raindrop','GET',q,'Bearer '+tok).then(function(d){
  RD.itens=((d&&d.items)||[]).filter(function(i){return (i.tags||[]).indexOf('lido')<0&&!z.lidos[i._id];})
   .map(function(i){return {id:i._id,t:i.title||i.link,l:i.link,dom:i.domain||'',tags:i.tags||[]};});
  marca('rd',true,RD.itens.length+' na fila');pintaLaptop();})
 .catch(function(e){marca('rd',false,e.message);});}
function rdLer(id){var it=RD.itens.filter(function(i){return i.id===id;})[0];if(!it)return;
 RD.ler={id:id,ini:Date.now()};window.open(it.l,'_blank','noopener');pintaLaptop();}
function rdLido(id){var it=RD.itens.filter(function(i){return i.id===id;})[0],z=Z().rd;if(!it)return;
 var min=0;if(RD.ler&&RD.ler.id===id){min=Math.min(15,Math.max(1,Math.round((Date.now()-RD.ler.ini)/60000)));RD.ler=null;}
 z.lidos[id]=hoje();
 var ks=Object.keys(z.lidos);if(ks.length>400)ks.slice(0,ks.length-400).forEach(function(k){delete z.lidos[k];});
 if(min){try{A.vxData().sessions.push({id:'rd'+id+'-'+Date.now().toString(36),day:hoje(),task:'leitura',minutes:min,result:('leitura: '+it.t).slice(0,120)});}catch(e){}}
 RD.itens=RD.itens.filter(function(i){return i.id!==id;});salva();repinta();
 A.vxMsg(min?'Leitura registrada: '+min+' min na Linha de Tiro.':'Marcado como lido.');
 var tok=cf().rd;if(tok)ponte('raindrop','PUT','raindrop/'+id,'Bearer '+tok,{tags:it.tags.concat('lido')}).catch(function(){});}

/* ======================= Águas do Lete (Readwise) ======================= */
function rwSync(){var tok=cf().rw;if(!tok)return Promise.resolve();var z=Z().rw,pag=0,novos=0,livros=0;
 function vai(cursor){var q='export/?'+(z.ult?'updatedAfter='+encodeURIComponent(z.ult):'')+(cursor?'&pageCursor='+encodeURIComponent(cursor):'');
  return ponte('readwise','GET',q,'Token '+tok).then(function(d){pag++;
   (d.results||[]).forEach(function(b){var hs=(b.highlights||[]).filter(function(h){return !h.is_deleted&&h.text;});if(!hs.length)return;
    livros++;novos+=rwNota(b,hs);
    hs.forEach(function(h){if(!z.pool.some(function(p){return p.id===h.id;}))z.pool.push({id:h.id,t:String(h.text).slice(0,500),l:String(b.title||'').slice(0,80),a:String(b.author||'').slice(0,60)});});});
   if(d.nextPageCursor&&pag<6)return vai(d.nextPageCursor);});}
 var inicio=new Date().toISOString();
 return vai(null).then(function(){if(z.pool.length>300)z.pool=z.pool.slice(-300);z.ult=inicio;
  rwQuest();salva();marca('rw',true,novos?novos+' destaques novos em '+livros+' tabuinha'+(livros>1?'s':''):'em dia');repinta();})
 .catch(function(e){marca('rw',false,e.message);});}
/* uma tabuinha (nota) por livro, etiquetada rw:<id> */
function rwNota(b,hs){var S=A.S;S.notas=S.notas||[];var tag='rw:'+b.user_book_id,n=S.notas.filter(function(x){return (x.tags||[]).indexOf(tag)>=0;})[0],c=0;
 var cab=(b.author?b.author+' · ':'')+(b.category||'')+(b.source_url?' · '+b.source_url:'');
 if(!n){n={t:String(b.title||'Destaques').slice(0,60),b:cab+'\n',tags:['readwise',tag],d:hoje()};S.notas.unshift(n);}
 hs.forEach(function(h){var linha='“'+String(h.text).trim()+'”'+(h.note?'\n  ↳ '+String(h.note).trim():'');if(n.b.indexOf(String(h.text).trim().slice(0,80))<0){n.b+='\n'+linha+'\n';c++;}});
 if(n.b.length>9000)n.b=n.b.slice(0,9000)+'\n…';return c;}
/* revisão espaçada: 5 por dia, os menos vistos primeiro */
function rwDia(){var z=Z().rw,hj=hoje();if(z.dia&&z.dia.d===hj)return z.dia;if(!z.pool.length)return null;
 var ord=z.pool.slice().sort(function(a,b){var va=z.visto[a.id]||'',vb=z.visto[b.id]||'';return va<vb?-1:va>vb?1:(a.id%97)-(b.id%97);});
 z.dia={d:hj,ids:ord.slice(0,5).map(function(p){return p.id;}),ok:[]};salva();return z.dia;}
function rwRevisto(id){var z=Z().rw,d=rwDia();if(!d)return;if(d.ok.indexOf(id)<0)d.ok.push(id);z.visto[id]=hoje();
 var ks=Object.keys(z.visto);if(ks.length>600)ks.sort(function(a,b){return z.visto[a]<z.visto[b]?-1:1;}).slice(0,ks.length-600).forEach(function(k){delete z.visto[k];});
 if(d.ok.length>=d.ids.length){try{var Q=A.mmD(),f=Q.feitas[hoje()]=Q.feitas[hoje()]||[];if(f.indexOf('pz-rw')<0)f.push('pz-rw');A.mmPinta();}catch(e){}A.vxMsg('Você escapou do Lete: revisão das Tabuinhas feita, quest cumprida.');}
 salva();repinta();}
var RW_QUEST='Fuga do Lete · revisão das Tabuinhas (Readwise)';
function rwQuest(){try{var Q=A.mmD(),q=Q.dia.filter(function(x){return x.id==='pz-rw';})[0];
 if(q&&q.t!==RW_QUEST){q.t=RW_QUEST;salva();A.mmPinta();}
 else if(!q&&cf().rw){Q.dia.push({id:'pz-rw',t:RW_QUEST});A.mmPinta();}}catch(e){}}

/* ======================= Linha de Tiro ↔ Toggl Track ======================= */
function tgAuth(){return 'Basic '+btoa(cf().tg+':api_token');}
var TG={atual:null};
function tgSync(){if(!cf().tg)return Promise.resolve();var z=Z().tg,v=A.vxData(),mud=0,novas=0;
 var wid=cf().tgw?Promise.resolve(cf().tgw):ponte('toggl','GET','me',tgAuth()).then(function(me){cfSet('tgw',me.default_workspace_id);return me.default_workspace_id;});
 return wid.then(function(w){
  return ponte('toggl','GET','me/time_entries?start_date='+diasAtras(14)+'&end_date='+diasAtras(-1),tgAuth()).then(function(lista){
   (lista||[]).forEach(function(e){var tags=e.tags||[];
    if(e.duration==null||e.duration<0)return;
    if(tags.indexOf('astronautica')>=0)return;/* foi o app que mandou: já está contado */
    if(z.tag&&tags.indexOf(z.tag)<0)return;
    var id='tg'+e.id,min=Math.round(e.duration/60*100)/100,dia=dstr(new Date(e.start)),s=v.sessions.filter(function(x){return x.id===id;})[0];
    if(min<1)return;
    if(s){if(s.minutes!==min||s.day!==dia){s.minutes=min;s.day=dia;mud++;}}
    else{v.sessions.push({id:id,day:dia,task:'toggl',minutes:min,result:String(e.description||'Toggl').slice(0,120)});novas++;}});
   return ponte('toggl','GET','me/time_entries/current',tgAuth()).then(function(c){TG.atual=c&&c.id?c:null;},function(){TG.atual=null;});})
  .then(function(){return z.env?tgEnvia(w):null;});})
 .then(function(){if(novas||mud){salva();}var hj=v.sessions.filter(function(s){return /^tg/.test(String(s.id))&&s.day===hoje();}).reduce(function(a,s){return a+(+s.minutes||0);},0);
  marca('tg',true,(novas?novas+' blocos novos · ':'')+'hoje '+hm(hj)+' pelo Toggl');repinta();})
 .catch(function(e){marca('tg',false,e.message);});}
/* manda ao Toggl os blocos feitos no app (opcional), com a etiqueta astronautica */
function tgEnvia(w){var z=Z().tg,v=A.vxData(),lim=diasAtras(2),fila=v.sessions.filter(function(s){var id=String(s.id||'');
  return s.day>=lim&&!/^tg/.test(id)&&(+s.minutes||0)>=1&&z.enviados.indexOf(id)<0;}).slice(0,10);
 return fila.reduce(function(p,s){return p.then(function(){var seg=Math.round(s.minutes*60),ini=s.day===hoje()?new Date(Date.now()-seg*1000):new Date(s.day+'T12:00:00');
  return ponte('toggl','POST','workspaces/'+w+'/time_entries',tgAuth(),{created_with:'Astronautica',description:String(s.result||'foco · Astronáutica').slice(0,120),tags:['astronautica'],workspace_id:+w,start:ini.toISOString(),duration:seg})
   .then(function(){z.enviados.push(String(s.id));if(z.enviados.length>500)z.enviados=z.enviados.slice(-500);});});},Promise.resolve())
  .then(function(){if(fila.length)salva();});}

/* ======================= Movimento (Strava) ======================= */
function svRedirect(){return location.origin+location.pathname;}
function svConecta(){var c=cf();if(!c.sv_id||!c.sv_sec){pzConfig('sv');return;}
 location.href='https://www.strava.com/oauth/authorize?client_id='+encodeURIComponent(c.sv_id)+'&response_type=code&approval_prompt=auto&scope=activity:read_all&state=astro-strava&redirect_uri='+encodeURIComponent(svRedirect());}
function svVolta(){var p=new URLSearchParams(location.search);if(p.get('state')!=='astro-strava')return;
 var code=p.get('code'),c=cf();history.replaceState(null,'',location.pathname);
 if(!code){marca('sv',false,'autorização negada no Strava');return;}
 ponte('strava-oauth','POST','token?client_id='+encodeURIComponent(c.sv_id)+'&client_secret='+encodeURIComponent(c.sv_sec)+'&code='+encodeURIComponent(code)+'&grant_type=authorization_code')
  .then(function(t){cfSet('sv_tok',{a:t.access_token,r:t.refresh_token,e:t.expires_at});A.vxMsg('Maia! Os tênis alados estão ligados ao Strava.');svSync();})
  .catch(function(e){marca('sv',false,e.message);});}
function svToken(){var c=cf(),t=c.sv_tok;if(!t)return Promise.reject(new Error('Strava não ligado'));
 if(t.e*1000>Date.now()+300e3)return Promise.resolve(t.a);
 return ponte('strava-oauth','POST','token?client_id='+encodeURIComponent(c.sv_id)+'&client_secret='+encodeURIComponent(c.sv_sec)+'&refresh_token='+encodeURIComponent(t.r)+'&grant_type=refresh_token')
  .then(function(n){cfSet('sv_tok',{a:n.access_token,r:n.refresh_token,e:n.expires_at});return n.access_token;});}
function svSync(){if(!cf().sv_tok)return Promise.resolve();var S=A.S,z=Z().sv,depois=Math.floor((Date.now()-14*864e5)/1000);
 return svToken().then(function(a){return ponte('strava','GET','athlete/activities?after='+depois+'&per_page=100','Bearer '+a);})
  .then(function(lista){var novo={},lim=diasAtras(14);
   (lista||[]).forEach(function(x){var d=String(x.start_date_local||'').slice(0,10);if(!d)return;novo[d]=(novo[d]||0)+Math.round((x.moving_time||0)/60);});
   S.ativ=S.ativ||{};var dias={};Object.keys(novo).concat(Object.keys(z.ativ)).forEach(function(d){if(d>=lim)dias[d]=1;});
   Object.keys(dias).forEach(function(d){var antes=z.ativ[d]||0,agora=novo[d]||0;if(antes===agora)return;S.ativ[d]=Math.max(0,(+S.ativ[d]||0)-antes+agora);if(agora)z.ativ[d]=agora;else delete z.ativ[d];});
   Object.keys(z.ativ).forEach(function(d){if(d<lim)delete z.ativ[d];});
   salva();marca('sv',true,'hoje '+hm(novo[hoje()]||0)+' de movimento');repinta();})
  .catch(function(e){marca('sv',false,e.message);});}

/* ======================= Espelho do Habitica ======================= */
var HB={tarefas:[],fila:[],rodando:false};
function hbHeaders(){var c=cf();return {'x-api-user':c.hb_user,'x-api-key':c.hb_key,'x-client':c.hb_user+'-Astronautica','Content-Type':'application/json'};}
function hbGet(q){return fetch('https://habitica.com/api/v3/'+q,{headers:hbHeaders()}).then(function(r){return r.json().then(function(d){if(!d.success)throw new Error(r.status===401?'chave recusada (401)':(d.message||'erro '+r.status));return d.data;});});}
function hbNome(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function hbSync(){var c=cf();if(!c.hb_user||!c.hb_key)return Promise.resolve();var S=A.S,z=Z().hb,hj=hoje(),mud=0;
 return hbGet('tasks/user?type=dailys').then(function(ts){HB.tarefas=(ts||[]).map(function(t){return {id:t.id,n:t.text,ok:!!t.completed,due:t.isDue!==false};});
  (S.hab||[]).forEach(function(h){if(z.map[h.id]===undefined){var m=HB.tarefas.filter(function(t){return hbNome(t.n)===hbNome(h.nome);})[0];if(m){z.map[h.id]=m.id;mud++;}}});
  (S.hab||[]).forEach(function(h){var tid=z.map[h.id];if(!tid)return;var t=HB.tarefas.filter(function(x){return x.id===tid;})[0];if(!t)return;h.hist=h.hist||[];var feito=h.hist.indexOf(hj)>=0;
   if(t.ok&&!feito){h.hist.push(hj);mud++;}/* Habitica → app */
   else if(feito&&!t.ok&&t.due&&HB.fila.indexOf(tid)<0)HB.fila.push(tid);/* app → Habitica */});
  if(mud)salva();marca('hb',true,HB.tarefas.length+' dailies · '+Object.keys(z.map).filter(function(k){return z.map[k];}).length+' ligadas');repinta();hbFila();})
 .catch(function(e){marca('hb',false,e.message);});}
/* uma marcação por vez, com 30 s entre chamadas, como pede o Habitica para scripts automáticos */
function hbFila(){if(HB.rodando||!HB.fila.length)return;HB.rodando=true;var tid=HB.fila.shift();
 fetch('https://habitica.com/api/v3/tasks/'+tid+'/score/up',{method:'POST',headers:hbHeaders()}).then(function(r){return r.json();})
  .then(function(d){if(d&&d.success){var t=HB.tarefas.filter(function(x){return x.id===tid;})[0];if(t)t.ok=true;}},function(){})
  .then(function(){setTimeout(function(){HB.rodando=false;hbFila();},30000);pintaPontes();});}

/* ======================= agenda das sincronizações ======================= */
var SYNC={rss:rssBusca,rd:rdBusca,rw:rwSync,tg:tgSync,sv:svSync,hb:hbSync};
var ULT={};
function ciclo(forca){if(document.visibilityState!=='visible'&&!forca)return;var agora=Date.now(),
 int={rss:30*60e3,rd:20*60e3,rw:60*60e3,tg:15*60e3,sv:60*60e3,hb:10*60e3},atraso=0;
 Object.keys(SYNC).forEach(function(k){if(!forca&&ULT[k]&&agora-ULT[k]<int[k])return;ULT[k]=agora;setTimeout(function(){try{SYNC[k](false);}catch(e){}},atraso);atraso+=1200;});}
function agora(k){ULT[k]=Date.now();try{return SYNC[k](true);}catch(e){}}

/* ======================= Laptop: Estante de Hermes ======================= */
function pintaLaptop(){var p=document.querySelector('#painel-dir .pd-pane[data-pane="lap"]');if(!p)return;var box=document.getElementById('pz-lap');
 if(!box){box=document.createElement('section');box.id='pz-lap';box.className='pz-lap';p.appendChild(box);
  box.addEventListener('click',function(e){var b=e.target.closest('[data-pz]');if(!b)return;var a=b.dataset.pz,id=b.dataset.id;
   if(a==='rd-ler')rdLer(+id);else if(a==='rd-lido')rdLido(+id);else if(a==='rw-ok')rwRevisto(+id);else if(a==='cfg')pzConfig(b.dataset.k);else if(a==='sync')agora(b.dataset.k);});}
 else if(box.parentNode!==p)p.appendChild(box);
 var c=cf(),h='<div class="pz-lap-h"><span class="pz-k">notas de Dédalo</span><b>Entregas e memória</b><small>o que o Hermes Express trouxe para ler · as Tabuinhas que o Lete ainda não apagou</small></div>';
 /* fila de leitura */
 h+='<div class="pz-col"><h5>Hermes Express <small>fila de leitura · Raindrop</small></h5>';
 if(!c.rd)h+='<p class="pz-n">Ligue o Raindrop para puxar os artigos e julgados que você salvou. <button type="button" class="pz-lk" data-pz="cfg" data-k="rd">ligar</button></p>';
 else if(!RD.itens.length)h+='<p class="pz-n">'+(ST.rd&&!ST.rd.ok?'Não consegui ler a fila: '+esc(ST.rd.msg)+'.':'Fila vazia. Salve algo no Raindrop'+(Z().rd.tag?' com a etiqueta #'+esc(Z().rd.tag):'')+' e ele aparece aqui.')+' <button type="button" class="pz-lk" data-pz="sync" data-k="rd">atualizar</button></p>';
 else h+='<ol class="pz-fila">'+RD.itens.slice(0,6).map(function(i){var lendo=RD.ler&&RD.ler.id===i.id,min=lendo?Math.floor((Date.now()-RD.ler.ini)/60000):0;
  return '<li class="'+(lendo?'lendo':'')+'"><div><a href="'+esc(i.l)+'" target="_blank" rel="noopener noreferrer">'+esc(i.t)+'</a><small>'+esc(i.dom)+(lendo?' · lendo há '+min+' de 15 min':'')+'</small></div>'+
   (lendo?'':'<button type="button" data-pz="rd-ler" data-id="'+i.id+'">ler 15 min</button>')+'<button type="button" class="pz-sec" data-pz="rd-lido" data-id="'+i.id+'">lido</button></li>';}).join('')+'</ol>'+
  (RD.itens.length>6?'<p class="pz-n">mais '+(RD.itens.length-6)+' na fila</p>':'');
 h+='</div>';
 /* revisão do dia */
 h+='<div class="pz-col"><h5>Águas do Lete <small>revisão do dia · Readwise</small></h5>';
 var d=c.rw?rwDia():null,z=Z().rw;
 if(!c.rw)h+='<p class="pz-n">Ligue o Readwise: seus destaques do Kindle, de PDFs e de artigos viram Tabuinhas de Cadmo e uma revisão de cinco por dia. <button type="button" class="pz-lk" data-pz="cfg" data-k="rw">ligar</button></p>';
 else if(!d)h+='<p class="pz-n">'+(ST.rw&&!ST.rw.ok?'Não consegui ler o Readwise: '+esc(ST.rw.msg)+'.':'Buscando os destaques…')+'</p>';
 else{var feitos=d.ok.length;h+='<p class="pz-prog"><b>'+feitos+'/'+d.ids.length+'</b> revistos hoje'+(feitos>=d.ids.length?' · quest cumprida ✓':'')+'</p><ul class="pz-rev">'+
  d.ids.map(function(id){var p=z.pool.filter(function(x){return x.id===id;})[0];if(!p)return '';var ok=d.ok.indexOf(id)>=0;
   return '<li class="'+(ok?'ok':'')+'"><blockquote>'+esc(p.t)+'</blockquote><div><small>'+esc(p.l)+(p.a?' · '+esc(p.a):'')+'</small>'+(ok?'<span class="pz-ok">✓ revisto</span>':'<button type="button" data-pz="rw-ok" data-id="'+id+'">revisto</button>')+'</div></li>';}).join('')+'</ul>';}
 h+='</div>';
 if(box._h!==h){box._h=h;box.innerHTML=h;}}

/* ======================= Pontes no painel de apps (rodapé) ======================= */
var IC={
 rss:'<path d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8"/><circle cx="6" cy="18" r="1.6"/>',
 rd:'<path d="M12 3c3 4 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 9 7 12 3z"/>',
 rw:'<path d="M6 4h9l3 3v13H6z"/><path d="M9 10h6M9 13.5h6M9 17h4"/>',
 tg:'<circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.5 1.6M10 3h4"/>',
 sv:'<path d="M4 18l5-10 4 7 2-3 5 6"/>',
 hb:'<path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z"/>'};
var NOMES={rss:['Hefesto TV','RSS jurídico na faixa de baixo'],rd:['Hermes Express','Raindrop · fila de leitura no Laptop'],rw:['Águas do Lete','Readwise · Tabuinhas e revisão espaçada'],
 tg:['Relógio-escudo de Tyson','Toggl Track · blocos viram dracmas'],sv:['Tênis alados · Maia!','Strava · minutos de Movimento'],hb:['Acampamento Júpiter','Habitica · hábitos espelhados']};
function ligado(k){var c=cf();return k==='rss'?(Z().rss.on&&Z().rss.feeds.length>0):k==='hb'?!!(c.hb_user&&c.hb_key):k==='sv'?!!c.sv_tok:!!c[k];}
function pintaPontes(){var ap=document.getElementById('lat-apps');if(!ap)return;var box=document.getElementById('pz-pontes');
 if(!box){box=document.createElement('section');box.id='pz-pontes';box.className='lat-c pz-pontes';ap.appendChild(box);
  box.addEventListener('click',function(e){var b=e.target.closest('[data-pz]');if(!b)return;e.stopPropagation();var a=b.dataset.pz,k=b.dataset.k;
   if(a==='cfg')pzConfig(k);else if(a==='sync'){if(k==='todas')ciclo(true);else agora(k);}else if(a==='sv-ligar')svConecta();else if(a==='hb-map')hbMapa();});}
 var h='<header><span class="lat-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17c3-6 15-6 18 0M6 15.2V19M18 15.2V19M12 13v6"/></svg></span><div><span class="k9">integrações · George e Martha atendem</span><b>Caduceu de Hermes</b></div>'+
  '<button type="button" class="pz-lk" data-pz="sync" data-k="todas" title="sincronizar tudo agora">sincronizar</button></header><div class="lat-b"><ul class="pz-lista">'+
  Object.keys(NOMES).map(function(k){var on=ligado(k),s=ST[k],cls=!on?'off':s?(s.ok?'ok':'erro'):'esp';
   var est=!on?'desligado':s?esc(s.msg)+(s.t?' · '+quando(s.t):''):'aguardando a primeira leitura';
   var extra='';if(k==='sv'&&cf().sv_id&&!cf().sv_tok)extra='<button type="button" class="pz-lk" data-pz="sv-ligar">autorizar no Strava</button>';
   if(k==='hb'&&on)extra='<button type="button" class="pz-lk" data-pz="hb-map">ligar hábitos</button>';
   if(k==='tg'&&TG.atual)est+=' · rodando: '+esc(TG.atual.description||'sem nome')+' ('+hm((Date.now()-new Date(TG.atual.start))/60000)+')';
   return '<li class="pz-'+cls+'"><span class="pz-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+IC[k]+'</svg></span>'+
    '<div><b>'+NOMES[k][0]+'</b><small>'+NOMES[k][1]+'</small><em>'+est+'</em></div><span class="pz-bt">'+extra+'<button type="button" class="pz-lk" data-pz="cfg" data-k="'+k+'">'+(on?'ajustar':'ligar')+'</button></span></li>';}).join('')+
  '</ul><p class="lat-n pz-rodape">As chaves ficam só neste aparelho. O que entra no app (blocos, minutos, notas) sincroniza pela nuvem.</p></div>';
 if(box._h!==h){box._h=h;box.innerHTML=h;}}

/* ======================= configuração (diálogos) ======================= */
function pzConfig(k){var c=cf(),z=Z();
 var dlg=function(o){A.vxDlg(o);setTimeout(function(){var w=document.getElementById('vx-dlg');if(!w)return;w.classList.add('pz-dlg');
  Array.prototype.forEach.call(w.querySelectorAll('input'),function(i,n){if(o.campos[n]&&o.campos[n].max)i.maxLength=o.campos[n].max;});},0);};
 if(k==='rss')dlg({titulo:'Hefesto TV · boletim jurídico',texto:'Feeds RSS separados por vírgula (ConJur, JOTA, STJ, CJF, Diário Oficial…). O filtro é opcional: só passam os títulos que batem com ele, por exemplo <b>trf3|previdenci|inss|stj|stf</b>. Deixe os feeds vazios para desligar a faixa.',
  campos:[{label:'Feeds',valor:z.rss.feeds.join(', '),max:2000},{label:'Filtro de assuntos (opcional)',valor:z.rss.filtro||'',max:300}],ok:'salvar',
  onOk:function(v){z.rss.feeds=v[0].split(/[\s,]+/).filter(function(u){return /^https:\/\/\S+$/.test(u);}).slice(0,8);z.rss.filtro=v[1];z.rss.on=z.rss.feeds.length>0;
   try{if(v[1])new RegExp(v[1],'i');}catch(e){z.rss.filtro='';A.vxMsg('Filtro inválido; ficou sem filtro.');}
   localStorage.removeItem('astro-rss-oculto');salva();agora('rss');pintaPontes();}});
 else if(k==='rd')dlg({titulo:'Hermes Express · Raindrop',texto:'No Raindrop, abra <b>Configurações › Integrações › For developers › Create new app</b>, entre no app criado e clique em <b>Create test token</b>. Cole o token aqui. Etiqueta e coleção são opcionais: com a etiqueta <b>ler</b>, só entra na fila o que você marcar com #ler. Ao clicar em “lido”, o item ganha a etiqueta #lido e sai da fila.',
  campos:[{label:'Test token',valor:c.rd||'',tipo:'password'},{label:'Etiqueta (opcional, sem #)',valor:z.rd.tag||''},{label:'ID da coleção (0 = todas)',valor:String(z.rd.col||0)}],ok:'salvar',
  onOk:function(v){cfSet('rd',v[0]);z.rd.tag=v[1].replace(/^#/,'');z.rd.col=parseInt(v[2],10)||0;salva();agora('rd');pintaPontes();pintaLaptop();}});
 else if(k==='rw')dlg({titulo:'Águas do Lete · Readwise',texto:'Pegue o token em <b>readwise.io/access_token</b> e cole aqui. Cada livro ou artigo com destaques vira uma Tabuinha de Cadmo (nota com a etiqueta readwise), e cinco destaques por dia viram a quest <b>Fuga do Lete</b> (+5 XP).',
  campos:[{label:'Access token',valor:c.rw||'',tipo:'password'}],ok:'salvar',
  onOk:function(v){cfSet('rw',v[0]);if(v[0]){rwQuest();agora('rw');}salva();pintaPontes();pintaLaptop();}});
 else if(k==='tg')dlg({titulo:'Relógio-escudo de Tyson · Toggl Track',texto:'O token fica em <b>track.toggl.com › Profile settings › API Token</b>. Cada entrada encerrada no Toggl vira um bloco na Linha de Tiro (10 dracmas por hora e pontos da Copa dos Chalés). Com a etiqueta, só contam as entradas marcadas com ela. Se ligar o envio, os blocos feitos no app também vão para o Toggl, com a etiqueta astronautica, sem contar em dobro.',
  campos:[{label:'API token',valor:c.tg||'',tipo:'password'},{label:'Só a etiqueta (opcional)',valor:z.tg.tag||''},{label:'Mandar os blocos do app ao Toggl? (sim/não)',valor:z.tg.env?'sim':'não'}],ok:'salvar',
  onOk:function(v){if(v[0]!==c.tg)cfSet('tgw',null);cfSet('tg',v[0]);z.tg.tag=v[1];z.tg.env=/^s/i.test(v[2]);salva();agora('tg');pintaPontes();}});
 else if(k==='sv')dlg({titulo:'Tênis alados · Strava',texto:'1. Em <b>strava.com/settings/api</b>, crie um app; em <b>Authorization Callback Domain</b>, ponha <b>'+esc(location.hostname)+'</b>.<br>2. Cole aqui o Client ID e o Client Secret e salve.<br>3. Clique em <b>autorizar no Strava</b>.<br>Natação, academia, corrida e caminhada somam no medidor de Movimento. O Strava exige assinatura ativa de quem cria o app.',
  campos:[{label:'Client ID',valor:c.sv_id||''},{label:'Client Secret',valor:c.sv_sec||'',tipo:'password'}],ok:'salvar',
  onOk:function(v){if(v[0]!==c.sv_id||v[1]!==c.sv_sec)cfSet('sv_tok',null);cfSet('sv_id',v[0]);cfSet('sv_sec',v[1]);pintaPontes();if(v[0]&&v[1]&&!cf().sv_tok)svConecta();}});
 else if(k==='hb')dlg({titulo:'Acampamento Júpiter · Habitica',texto:'Em <b>habitica.com › Configurações › Site Data (API)</b>, copie o <b>User ID</b> e o <b>API Token</b>. Dailies do Habitica com o mesmo nome de um hábito do app se ligam sozinhas; as outras você liga em “ligar hábitos”. Marcou de um lado, marca do outro.',
  campos:[{label:'User ID',valor:c.hb_user||''},{label:'API Token',valor:c.hb_key||'',tipo:'password'}],ok:'salvar',
  onOk:function(v){cfSet('hb_user',v[0]);cfSet('hb_key',v[1]);agora('hb');pintaPontes();}});}
/* mapa hábito do app → daily do Habitica */
function hbMapa(){var S=A.S,z=Z().hb,w=document.getElementById('pz-hbmapa');if(w)w.remove();
 if(!HB.tarefas.length){A.vxMsg('Ainda não li as dailies do Habitica. Tente “sincronizar”.');return;}
 w=document.createElement('div');w.id='pz-hbmapa';w.className='pz-modal';w.setAttribute('role','dialog');w.setAttribute('aria-label','Ligar hábitos ao Habitica');
 var op=function(sel){return '<option value="">não ligar</option>'+HB.tarefas.map(function(t){return '<option value="'+esc(t.id)+'"'+(t.id===sel?' selected':'')+'>'+esc(t.n)+'</option>';}).join('');};
 w.innerHTML='<div class="pz-mbk"></div><div class="pz-mbx"><p class="vxd-t">Meio-Sangue ↔ Acampamento Júpiter</p><p class="vxd-d">Escolha a daily do Habitica que espelha cada hábito do app.</p>'+
  ((S.hab||[]).map(function(h){return '<label class="pz-hbl"><span>'+esc(h.nome)+'</span><select data-h="'+esc(h.id)+'">'+op(z.map[h.id]||'')+'</select></label>';}).join('')||'<p class="vxd-d">Você ainda não tem hábitos no app.</p>')+
  '<div class="vxd-bt"><button type="button" data-x>cancelar</button><button type="button" data-ok>salvar</button></div></div>';
 document.body.appendChild(w);
 var fecha=function(){w.remove();};w.querySelector('.pz-mbk').onclick=fecha;w.querySelector('[data-x]').onclick=fecha;
 w.addEventListener('keydown',function(e){if(e.key==='Escape')fecha();});
 w.querySelector('[data-ok]').onclick=function(){Array.prototype.forEach.call(w.querySelectorAll('select[data-h]'),function(s){z.map[s.dataset.h]=s.value||null;});salva();fecha();agora('hb');};}

/* ======================= arranque ======================= */
function arranca(){try{Z();}catch(e){return setTimeout(arranca,800);}
 svVolta();
 try{var c=JSON.parse(localStorage.getItem(RSS_CACHE)||'null');if(c&&c.itens){RSS.itens=c.itens;RSS.quando=c.t;}}catch(e){}
 pintaTicker();pintaPontes();pintaLaptop();
 setTimeout(function(){ciclo(true);},2500);
 setInterval(function(){ciclo(false);},60e3);
 setInterval(function(){pintaPontes();pintaLaptop();posTicker();},5000);
 document.addEventListener('visibilitychange',function(){if(document.visibilityState==='visible')setTimeout(function(){ciclo(false);},1500);});
 window.addEventListener('resize',posTicker);
 /* hábito marcado no app vai para o Habitica sem esperar o ciclo */
 var ultHab='';setInterval(function(){try{var s=JSON.stringify((A.S.hab||[]).map(function(h){return (h.hist||[]).indexOf(hoje())>=0;}));if(ultHab&&s!==ultHab&&cf().hb_key)hbSync();ultHab=s;}catch(e){}},8000);}
window.PONTES={sync:function(k){return k?agora(k):ciclo(true);},estado:function(){return JSON.parse(JSON.stringify(ST));}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',arranca);else arranca();
})();

/* ======================= Time blocking: blocos com início e fim de verdade =======================
   Cada bloco tem dia, início, fim e texto (S.blk[dia] = [{id,i,f,t}], minutos desde 00:00).
   A grade da Programação desenha cada bloco do tamanho da duração; clicar no vazio cria, clicar edita,
   arrastar move (inclusive para outro dia) e a alça de baixo muda a duração, de 15 em 15 minutos.
   Compatível com o resto do app: cada faixa de 3h (S.tb) continua recebendo o resumo dos blocos que
   começam nela, então Faixa Agora, avisos, Posto, Rota e "limpar/desfazer semana" seguem funcionando.
   Se S.tb mudar por fora (limpar, desfazer, plano da semana), os blocos daquela faixa são refeitos a partir dele. */
var TBK={px:26,ini:360,fim:1440,ed:null,arr:null};
function tbkD(){S.blk=S.blk||{};S.blkSrc=S.blkSrc||{};return S.blk;}
/* tranca: planejou, trancou. Dia passado é imutável; destrancar hoje ou depois exige "replanejar" com o motivo, que vai para os Anais */
function tbkTr(d){S.blkTr=S.blkTr||{};return d<hoje()||!!S.blkTr[d];}
function tbkTranca(d,por){S.blkTr=S.blkTr||{};S.blkTr[d]={em:Date.now(),por:por||'mão'};Object.keys(S.blkTr).forEach(function(k){if(k<gabMais(hoje(),-30))delete S.blkTr[k];});}
function tbkAviso(t,el){try{dToast(t,el);}catch(e){}}
var TBK_LOCK='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',TBK_OPEN='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="1.6"/><path d="M8 11V8a4 4 0 0 1 7.6-1.7"/></svg>';
function tbkHM(m){m=Math.max(0,Math.min(1440,Math.round(m)));return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function tbkMin(v){var m=/^(\d{1,2}):(\d{2})$/.exec(String(v||''));return m?Math.min(1440,+m[1]*60+ +m[2]):null;}
function tbkFaixa(i){var H=null;TD_H.forEach(function(x){if(i>=+x*60)H=x;});return H||TD_H[0];}
function tbkTurno(H){return (H==='06'||H==='09')?'f':(H==='12'||H==='15')?'v':'r';}
function tbkId(){return 'b'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}
/* lê o horário escrito no texto da faixa: "6h30–8h", "15-17", "fechar às 17h" */
function tbkImporta(H,t){var s=+H*60,e=Math.min(1440,s+180),i=s,f=e,m;
 m=/(\d{1,2})(?:h|:)?(\d{2})?\s*(?:–|—|-|até|a)\s*(\d{1,2})(?:h|:)?(\d{2})?/.exec(t);
 if(m){var a=+m[1]*60+(+m[2]||0),b=+m[3]*60+(+m[4]||0);if(b===0)b=1440;if(a>=s-30&&a<e&&b>a&&b<=e+60){i=a;f=Math.min(1440,b);}}
 else if((m=/fech\w*\s+(?:às|as|a)\s+(\d{1,2})(?:h|:)?(\d{2})?/i.exec(t))){var b2=+m[1]*60+(+m[2]||0);if(b2>s&&b2<=e)f=b2;}
 return {id:tbkId(),i:i,f:f,t:t};}
function tbkDoDia(d){var B=tbkD();return (B[d]||[]).slice().sort(function(a,b){return a.i-b.i||a.f-b.f;});}
/* traz para os blocos o que mudou em S.tb por fora */
function tbkSincroniza(dias){var B=tbkD(),tb=S.tb||{},mudou=false;
 dias.forEach(function(d){TD_H.forEach(function(H){var k=d+'|'+H,v=tb[k]||'',src=S.blkSrc[k];
  if(src===undefined){if(v&&!(B[d]||[]).some(function(b){return tbkFaixa(b.i)===H;})){(B[d]=B[d]||[]).push(tbkImporta(H,v));}S.blkSrc[k]=v;mudou=true;}
  else if(src!==v){B[d]=(B[d]||[]).filter(function(b){return tbkFaixa(b.i)!==H;});if(v)B[d].push(tbkImporta(H,v));S.blkSrc[k]=v;mudou=true;}});
  if(B[d]&&!B[d].length)delete B[d];});
 return mudou;}
/* resumo de cada faixa do dia em S.tb, para quem lê a grade antiga */
function tbkEspelho(d){var tb=S.tb=S.tb||{},L=tbkDoDia(d);TD_H.forEach(function(H){var k=d+'|'+H,s=+H*60,e=Math.min(1440,s+180),bs=L.filter(function(b){return tbkFaixa(b.i)===H;}),v='';
  if(bs.length===1&&bs[0].i===s&&bs[0].f===e)v=bs[0].t;
  else v=bs.map(function(b){return /\d{1,2}(h|:)\d{0,2}/.test(b.t)?b.t:tbkHM(b.i)+' '+b.t;}).join(' · ');
  if(v)tb[k]=v;else delete tb[k];S.blkSrc[k]=v;});}
function tbkSalva(dias){(dias||[]).forEach(function(d){if(d)tbkEspelho(d);});try{grava();}catch(e){}try{pinta();}catch(e){tbkPinta();}}
function tbkAcha(id){var B=tbkD(),r=null;Object.keys(B).some(function(d){var x=(B[d]||[]).filter(function(b){return b.id===id;})[0];if(x){r={d:d,b:x};return true;}});return r;}
/* faixas sobrepostas lado a lado */
function tbkRaias(L){var out=[],grupo=[],fimG=-1;function fecha(){var raias=[];grupo.forEach(function(b){var r=0;while(raias[r]!=null&&raias[r]>b.i)r++;raias[r]=b.f;b._r=r;});grupo.forEach(function(b){b._n=raias.length;out.push(b);});grupo=[];}
 L.forEach(function(b){if(b.i>=fimG&&grupo.length){fecha();fimG=-1;}grupo.push(b);fimG=Math.max(fimG,b.f);});if(grupo.length)fecha();return out;}
function tbkPinta(){var g=el('tb-g');if(!g)return;var dias=tbSemana(),hj=hoje();if(tbkSincroniza(dias)){try{grava();}catch(e){}}
 g.classList.add('tbk');var H0=TBK.ini,H1=TBK.fim,alt=g.clientHeight;TBK.px=alt>260?Math.max(18,Math.min(36,Math.floor((alt-44)/((H1-H0)/60)))):26;
 var px=TBK.px,y=function(m){return Math.round((m-H0)/60*px);},h='',agora=new Date(),am=agora.getHours()*60+agora.getMinutes();
 h+='<div class="tbk-cab"><span></span>'+dias.map(function(d,i){var tod=[];try{tod=agDoDia(d).filter(function(x){return x.dia;});}catch(e){}
  var tr=tbkTr(d),pas=d<hj;return '<div class="tbk-dh'+(d===hj?' hoje':'')+(tr?' tr':'')+'">'+(pas?'':'<button type="button" class="tbk-lk'+(tr?' on':'')+'" data-tbklock="'+d+'" title="'+(tr?'dia trancado · replanejar':'trancar o dia')+'" aria-label="'+(tr?'replanejar o dia':'trancar o dia')+'">'+(tr?TBK_LOCK:TBK_OPEN)+'</button>')+'<small>'+TBD[i]+(d===hj?' · hoje':'')+'</small><b>'+(+d.slice(8))+'</b>'+(tod.length?'<i title="'+esc(tod.map(function(x){return x.t;}).join(' · '))+'">'+esc(tod.length===1?tod[0].t:tod.length+' eventos')+'</i>':'')+'</div>';}).join('')+'</div>';
 h+='<div class="tbk-corpo" style="height:'+y(H1)+'px;--tbk-h:'+px+'px"><div class="tbk-eixo">';
 TD_H.forEach(function(H){var s=+H*60;h+='<div class="tbk-fx fx-'+tbkTurno(H)+'" style="top:'+y(s)+'px;height:'+(y(Math.min(H1,s+180))-y(s))+'px"><b>'+H+'</b><small>'+esc(tdFaixaNome(H))+'</small></div>';});
 h+='</div>';
 dias.forEach(function(d){var L=tbkRaias(tbkDoDia(d));var trc=tbkTr(d);h+='<div class="tbk-col'+(d===hj?' hoje':'')+(trc?' tr':'')+'" data-tbkdia="'+d+'">';
  try{agDoDia(d).filter(function(x){return !x.dia;}).forEach(function(x){var a=Math.max(H0,(x.ini.toDateString()===new Date(d+'T12:00:00').toDateString())?x.ini.getHours()*60+x.ini.getMinutes():H0),b=Math.min(H1,(x.fim.toDateString()===new Date(d+'T12:00:00').toDateString())?x.fim.getHours()*60+x.fim.getMinutes():H1);
   if(b<=H0||a>=H1||b<=a)return;h+='<div class="tbk-ag" style="top:'+y(a)+'px;height:'+Math.max(14,y(b)-y(a))+'px" title="'+esc(agHora(x)+' · '+x.t)+'"><span>'+esc(agHora(x)+' '+x.t)+'</span></div>';});}catch(e){}
  L.forEach(function(b){var top=y(Math.max(H0,b.i)),hh=Math.max(14,y(Math.min(H1,b.f))-top),w=100/b._n,cur=(d===hj&&am>=b.i&&am<b.f),foi=(d<hj)||(d===hj&&am>=b.f);
   h+='<div class="tbk-b fx-'+tbkTurno(tbkFaixa(b.i))+(cur?' agora':'')+(foi?' foi':'')+(hh<30?' curto':'')+'" data-tbkb="'+b.id+'" style="top:'+top+'px;height:'+hh+'px;left:calc('+(b._r*w)+'% + 2px);width:calc('+w+'% - 4px)" title="'+esc(tbkHM(b.i)+'–'+tbkHM(b.f)+' · '+b.t)+'">'+
    '<small>'+tbkHM(b.i)+'–'+tbkHM(b.f)+'</small><span>'+esc(b.t||'sem título')+'</span>'+(trc?'':'<i class="tbk-rz" aria-hidden="true"></i>')+(d===hj&&foi&&b.f<1440?'<button type="button" class="tbk-mv" data-tbkmv="'+b.id+'" title="ficou para trás · mover para o próximo horário livre">mover</button>':'')+'</div>';});
  if(d===hj&&am>=H0&&am<H1)h+='<div class="tbk-agora" style="top:'+y(am)+'px"></div>';
  h+='</div>';});
 h+='</div>';g.innerHTML=h;TBK.ed=null;
 var n=0,min=0;dias.forEach(function(d){tbkDoDia(d).forEach(function(b){n++;min+=b.f-b.i;});});
 var sub=el('tb-sub');if(sub)sub.innerHTML=n?('<b>'+n+'</b> blocos · '+(Math.round(min/6)/10).toString().replace('.',',')+' h planejadas · clique no vazio para criar, arraste para mover'):'clique num horário vazio para criar um bloco';}
/* editor do bloco */
function tbkEdita(id,foco){var g=el('tb-g'),a=tbkAcha(id);if(!g||!a)return;var be=g.querySelector('[data-tbkb="'+id+'"]');var p=document.getElementById('tbk-ed');if(p)p.remove();
 p=document.createElement('div');p.id='tbk-ed';p.className='tbk-ed';p.setAttribute('data-tbkid',id);
 p.innerHTML='<input class="tbk-t" maxlength="60" placeholder="o que ocupa este bloco" value="'+esc(a.b.t)+'">'+
  '<div class="tbk-hs"><label>início<input type="time" step="900" class="tbk-i" value="'+tbkHM(a.b.i)+'"></label><label>fim<input type="time" step="900" class="tbk-f" value="'+tbkHM(a.b.f===1440?1439:a.b.f)+'"></label></div>'+
  '<div class="tbk-bt"><button type="button" data-tbkrep>repetir seg → sex</button><button type="button" data-tbkdel>excluir</button><button type="button" class="ok" data-tbkok>pronto</button></div>';
 g.appendChild(p);var r=be?be.getBoundingClientRect():null,gr=g.getBoundingClientRect();
 var left=r?Math.min(r.left-gr.left+g.scrollLeft,g.scrollWidth-250):60,top=r?r.bottom-gr.top+g.scrollTop+4:60;if(r&&top+150>g.scrollTop+g.clientHeight)top=Math.max(0,r.top-gr.top+g.scrollTop-150);
 p.style.left=Math.max(0,left)+'px';p.style.top=top+'px';TBK.ed=id;if(foco!==false){var t=p.querySelector('.tbk-t');t.focus();t.select();}}
function tbkFechaEd(salvar){var p=document.getElementById('tbk-ed');if(!p)return;var id=p.getAttribute('data-tbkid'),a=tbkAcha(id);p.remove();TBK.ed=null;if(!a)return;
 if(salvar!==false){var t=(p.querySelector('.tbk-t').value||'').trim(),i=tbkMin(p.querySelector('.tbk-i').value),f=tbkMin(p.querySelector('.tbk-f').value);if(f===1439)f=1440;
  if(i!=null)a.b.i=Math.max(TBK.ini,i);if(f!=null)a.b.f=Math.min(TBK.fim,f);if(a.b.f<=a.b.i)a.b.f=Math.min(TBK.fim,a.b.i+15);a.b.t=t;}
 if(!a.b.t){tbkD()[a.d]=tbkD()[a.d].filter(function(b){return b.id!==id;});}
 tbkSalva([a.d]);}
function tbkCria(d,m){var B=tbkD(),i=Math.max(TBK.ini,Math.min(TBK.fim-30,Math.round(m/30)*30)),b={id:tbkId(),i:i,f:Math.min(TBK.fim,i+60),t:''};(B[d]=B[d]||[]).push(b);tbkPinta();tbkEdita(b.id);}
function tbkRepete(id){var a=tbkAcha(id);if(!a)return;var dias=tbSemana().slice(0,5),B=tbkD(),n=0;
 dias.forEach(function(d){if(d===a.d)return;var L=B[d]||[];if(L.some(function(b){return b.i===a.b.i&&b.t===a.b.t;}))return;L.push({id:tbkId(),i:a.b.i,f:a.b.f,t:a.b.t});B[d]=L;n++;});
 tbkSalva(dias.concat([a.d]));try{anota('Bloco "'+a.b.t+'" repetido em '+n+' dia'+(n===1?'':'s')+' da semana.',0,false);}catch(e){}}
/* arrastar: mover (também para outro dia) e mudar a duração pela alça */
function tbkLiga(g){if(g._tbk)return;g._tbk=1;
 g.addEventListener('pointerdown',function(e){if(e.button!==0||e.target.closest('#tbk-ed'))return;var be=e.target.closest('[data-tbkb]'),col=e.target.closest('[data-tbkdia]');if(!col)return;
  if(TBK.ed&&!be){tbkFechaEd();return;}
  if(e.target.closest('[data-tbkmv]'))return;
  if(tbkTr(col.getAttribute('data-tbkdia'))){if(!e.target.closest('[data-tbkb]')||true)tbkAviso(col.getAttribute('data-tbkdia')<hoje()?'Dia que passou fica como foi.':'Dia trancado. Para mudar, use o cadeado: replanejar.',col);return;}
  var a=be?tbkAcha(be.getAttribute('data-tbkb')):null;TBK.arr={x:e.clientX,y:e.clientY,be:be,a:a,dia:col.getAttribute('data-tbkdia'),col:col,rz:!!e.target.closest('.tbk-rz'),mov:false,i0:a?a.b.i:0,f0:a?a.b.f:0};
  if(be){try{be.setPointerCapture(e.pointerId);}catch(z){}}});
 g.addEventListener('pointermove',function(e){var R=TBK.arr;if(!R||!R.be)return;var dy=e.clientY-R.y,dx=e.clientX-R.x;if(!R.mov&&Math.abs(dy)<5&&Math.abs(dx)<5)return;R.mov=true;
  var dm=Math.round(dy/TBK.px*60/15)*15,px=TBK.px,y=function(m){return Math.round((m-TBK.ini)/60*px);};
  if(R.rz){R.f=Math.max(R.i0+15,Math.min(TBK.fim,R.f0+dm));R.i=R.i0;}else{var dur=R.f0-R.i0;R.i=Math.max(TBK.ini,Math.min(TBK.fim-dur,R.i0+dm));R.f=R.i+dur;
   var cols=g.querySelectorAll('[data-tbkdia]');Array.prototype.forEach.call(cols,function(c){var r=c.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<r.right&&c!==R.be.parentNode){c.appendChild(R.be);R.dia=c.getAttribute('data-tbkdia');}});}
  R.be.style.top=y(R.i)+'px';R.be.style.height=Math.max(14,y(R.f)-y(R.i))+'px';R.be.classList.add('arrasta');var sm=R.be.querySelector('small');if(sm)sm.textContent=tbkHM(R.i)+'–'+tbkHM(R.f);});
 g.addEventListener('pointerup',function(e){var R=TBK.arr;TBK.arr=null;if(!R)return;
  if(R.be&&R.a){if(R.mov){var d0=R.a.d;R.a.b.i=R.i;R.a.b.f=R.f;if(R.dia!==d0){tbkD()[d0]=tbkD()[d0].filter(function(b){return b!==R.a.b;});(tbkD()[R.dia]=tbkD()[R.dia]||[]).push(R.a.b);}tbkSalva([d0,R.dia]);}
   else tbkEdita(R.a.b.id);return;}
  if(!R.be&&Math.abs(e.clientY-R.y)<5){var r=R.col.getBoundingClientRect();tbkCria(R.dia,TBK.ini+(e.clientY-r.top)/TBK.px*60-15);}});
 g.addEventListener('click',function(e){var lk=e.target.closest('[data-tbklock]');if(lk){tbkCadeado(lk.getAttribute('data-tbklock'),lk);return;}
  var mv=e.target.closest('[data-tbkmv]');if(mv){e.stopPropagation();tbkMove(mv.getAttribute('data-tbkmv'),mv);return;}
  var b=e.target.closest('#tbk-ed button');if(!b)return;var id=TBK.ed;
  if(b.hasAttribute('data-tbkok'))tbkFechaEd();
  else if(b.hasAttribute('data-tbkdel')){var a=tbkAcha(id);document.getElementById('tbk-ed').remove();TBK.ed=null;if(a){tbkD()[a.d]=tbkD()[a.d].filter(function(x){return x.id!==id;});tbkSalva([a.d]);}}
  else if(b.hasAttribute('data-tbkrep')){tbkFechaEd();tbkRepete(id);}});
 g.addEventListener('keydown',function(e){if(!e.target.closest('#tbk-ed'))return;if(e.key==='Enter'){e.preventDefault();tbkFechaEd();}else if(e.key==='Escape'){e.preventDefault();var a=tbkAcha(TBK.ed);if(a&&!a.b.t)tbkFechaEd();else{document.getElementById('tbk-ed').remove();TBK.ed=null;}}});}
function tbkCadeado(d,el){if(d<hoje())return;S.blkTr=S.blkTr||{};
 if(!S.blkTr[d]){tbkTranca(d,'mão');try{anota('Grade de '+d.slice(8,10)+'/'+d.slice(5,7)+' trancada.',0,false);}catch(e){}try{grava();}catch(e){}tbkPinta();return;}
 var m=prompt('Replanejar '+d.slice(8,10)+'/'+d.slice(5,7)+': o que mudou?');if(m==null)return;m=m.trim();if(!m){tbkAviso('Escreva em poucas palavras o que mudou para destrancar.',el);return;}
 delete S.blkTr[d];S.blkRep=S.blkRep||[];S.blkRep.push({d:d,em:Date.now(),m:m.slice(0,140)});if(S.blkRep.length>60)S.blkRep=S.blkRep.slice(-60);
 try{anota('Replanejou '+d.slice(8,10)+'/'+d.slice(5,7)+': '+m.slice(0,140)+'.',0,false,true);}catch(e){}try{grava();}catch(e){}tbkPinta();}
/* bloco que ficou para trás: vai para o próximo horário livre de hoje (gesto explícito, vale mesmo com o dia trancado) */
function tbkMove(id,el){var a=tbkAcha(id);if(!a||a.d!==hoje())return;var dur=a.b.f-a.b.i,d=new Date(),ini=Math.ceil((d.getHours()*60+d.getMinutes())/15)*15,L=tbkDoDia(a.d).filter(function(b){return b!==a.b;}),t=Math.max(ini,TBK.ini),ok=null;
 while(t+dur<=TBK.fim){var bate=L.filter(function(b){return b.i<t+dur&&b.f>t;});if(!bate.length){ok=t;break;}t=Math.max.apply(null,bate.map(function(b){return b.f;}));}
 if(ok==null){tbkAviso('Não coube mais hoje: '+a.b.t+'. Fica para a Fogueira decidir.',el);return;}
 var de=tbkHM(a.b.i);a.b.i=ok;a.b.f=ok+dur;try{anota('Ficou para trás: '+a.b.t+' saiu das '+de+' e foi para as '+tbkHM(ok)+'.',0,false);}catch(e){}tbkSalva([a.d]);}
pintaTb=function(){if(TBK.ed||TBK.arr)return;var g=el('tb-g');if(!g)return;try{tbkLiga(g);tbkPinta();}catch(e){try{console.error(e);}catch(z){}}
 lig("b-tb-lp",function(){var kk,dd=tbSemana(),bak={},n=0;for(kk in (S.tb||{}))if(dd.indexOf(kk.split("|")[0])>=0){bak[kk]=S.tb[kk];n++;}if(!n)return;
  if(!confirm("Limpar os blocos desta semana? Dá para desfazer logo depois."))return;S.tbBak={quando:Date.now(),itens:bak};for(kk in bak)delete S.tb[kk];
  anota("Grade semanal limpa (dá para desfazer).",0,false);grava();pinta();});
 try{tbFoco();}catch(e){}};
document.addEventListener('pointerdown',function(e){if(TBK.ed&&!e.target.closest('#tb-g'))tbkFechaEd();},true);
setTimeout(function(){try{pintaTb();}catch(e){}},400);
/* os eventos da agenda já entram desenhados na grade, na hora certa */
agNaGrade=function(){var g=el('tb-g'),k=AG.ev.length+'|'+AG.quando;if(!g||g._agk===k||TBK.ed||TBK.arr)return;g._agk=k;try{tbkPinta();}catch(e){}};
/* a Rota e o Posto leem os horários direto dos blocos */
rtGradeHoje=function(){return tbkDoDia(hoje()).map(function(b){return {m:b.i,h:tbkHM(b.i),t:b.t,k:'grade'};});};
setInterval(function(){try{var g=el('tb-g'),n=g&&g.querySelector('.tbk-agora');if(!n||TBK.ed||TBK.arr)return;var d=new Date(),m=d.getHours()*60+d.getMinutes();n.style.top=Math.round((m-TBK.ini)/60*TBK.px)+'px';}catch(e){}},60000);
(function(){var st=document.createElement('style');st.id='tbk-css';var G='html body #tb-g.tbk';st.textContent=[
 G+'{display:block!important;position:relative;background:none!important;border:0!important;gap:0;filter:none!important;overflow-y:auto;overflow-x:hidden;user-select:none;-webkit-user-select:none;padding-bottom:4px}',
 'html body.tela-prog div.wrap>div.tb.tb #tb-g.tbk{flex:1 1 auto!important;min-height:240px!important}',
 G+' .tbk-cab{position:sticky;top:0;z-index:5;display:grid;grid-template-columns:64px repeat(7,minmax(0,1fr));gap:3px;padding:2px 0 6px;background:var(--bg,#f4ead2)}',
 G+' .tbk-dh{display:flex;flex-direction:column;align-items:center;gap:0;padding:3px 0;border-radius:7px;min-width:0}',
 G+' .tbk-dh small{font:700 9px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;opacity:.75}',
 G+' .tbk-dh b{font:700 15px Georgia,serif}',
 G+' .tbk-dh i{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:500 9.5px var(--sans,system-ui);font-style:normal;padding:0 4px;border-radius:4px;background:rgba(90,63,44,.12)}',
 G+' .tbk-dh.hoje{background:#2a2418;color:#f4ead2}'+G+' .tbk-dh.hoje small{color:#e9c870;opacity:1}',
 G+' .tbk-corpo{position:relative;display:grid;grid-template-columns:64px repeat(7,minmax(0,1fr));gap:3px;background-image:repeating-linear-gradient(180deg,rgba(90,63,44,.16) 0 1px,transparent 1px var(--tbk-h,26px));background-size:calc(100% - 64px) 100%;background-position:right top;background-repeat:no-repeat}',
 G+' .tbk-eixo{position:relative}',
 G+' .tbk-fx{position:absolute;left:0;right:6px;display:flex;flex-direction:column;align-items:flex-end;padding-top:1px;border-top:1.5px solid rgba(90,63,44,.45);font:700 10px var(--mono,monospace)}',
 G+' .tbk-fx small{font:600 8.5px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase;opacity:.75;text-align:right}',
 G+' .tbk-col{position:relative;border-radius:6px;background:rgba(255,250,235,.25);cursor:copy}',
 G+' .tbk-col.hoje{background:rgba(42,36,24,.07);box-shadow:inset 0 0 0 1.5px rgba(42,36,24,.55)}',
 G+' .tbk-b{position:absolute;box-sizing:border-box;display:flex;flex-direction:column;gap:1px;padding:3px 6px 6px;border-radius:7px;overflow:hidden;cursor:grab;color:#24190f;box-shadow:0 1px 0 rgba(255,255,255,.55) inset,0 2px 5px -3px rgba(60,35,15,.4);touch-action:none}',
 G+' .tbk-b small{font:600 8.5px var(--mono,monospace);letter-spacing:.03em;opacity:.72;white-space:nowrap}',
 G+' .tbk-b span{font:500 11.5px/1.25 var(--sans,system-ui);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4}',
 G+' .tbk-b.curto{flex-direction:row;align-items:center;gap:5px;padding:1px 6px}'+G+' .tbk-b.curto span{-webkit-line-clamp:1;white-space:nowrap;text-overflow:ellipsis}',
 G+' .tbk-b.fx-f{background:#f7dcc2;border:1px solid #c98a5c}'+G+' .tbk-b.fx-v{background:#dde8cc;border:1px solid #8fa673}'+G+' .tbk-b.fx-r{background:#e4dcf1;border:1px solid #9b8cc2}',
 G+' .tbk-b.foi{opacity:.55}',
 G+' .tbk-b.agora{box-shadow:0 0 0 2px #2a2418,0 4px 10px -4px rgba(0,0,0,.45);z-index:2}',
 G+' .tbk-b.arrasta{z-index:6;cursor:grabbing;box-shadow:0 0 0 2px #8a5a14,0 10px 20px -8px rgba(0,0,0,.5);opacity:.95}',
 G+' .tbk-rz{position:absolute;left:0;right:0;bottom:0;height:7px;cursor:ns-resize;background:linear-gradient(0deg,rgba(42,36,24,.18),transparent)}',
 G+' .tbk-ag{position:absolute;right:2px;width:46%;box-sizing:border-box;padding:1px 4px;border-radius:5px;border:1px dashed rgba(42,36,24,.55);background:rgba(255,255,255,.55);font:600 9px/1.2 var(--sans,system-ui);color:#2a2418;overflow:hidden;pointer-events:none;z-index:3}',
 G+' .tbk-agora{position:absolute;left:-3px;right:-3px;height:2px;background:#c8553d;z-index:4;pointer-events:none}'+G+' .tbk-agora::before{content:"";position:absolute;left:-4px;top:-4px;width:10px;height:10px;border-radius:50%;background:#c8553d}',
 G+' .tbk-dh{position:relative}',
 G+' .tbk-lk{position:absolute;bottom:2px;right:2px;display:grid;place-items:center;width:18px!important;height:18px;margin:0!important;padding:0!important;border:0!important;border-radius:50%!important;background:none!important;color:inherit!important;opacity:.45;cursor:pointer}',
 G+' .tbk-lk svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}',
 G+' .tbk-lk.on{opacity:1;color:#8a5a14!important}'+G+' .tbk-dh.hoje .tbk-lk.on{color:#e9c870!important}',
 G+' .tbk-lk:hover{opacity:1}',
 G+' .tbk-col.tr{cursor:not-allowed}'+G+' .tbk-col.tr .tbk-b{cursor:default}',
 G+' .tbk-col.tr:not(.hoje){background:repeating-linear-gradient(135deg,rgba(90,63,44,.05) 0 6px,transparent 6px 12px)}',
 G+' .tbk-mv{position:absolute;right:3px;bottom:3px;width:auto!important;margin:0!important;padding:1px 7px!important;border:1px solid #9a4a30!important;border-radius:999px!important;background:#fbeee4!important;color:#9a4a30!important;font:700 8.5px var(--mono,monospace)!important;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;opacity:0;transition:opacity .15s}',
 G+' .tbk-b:hover .tbk-mv,'+G+' .tbk-mv:focus{opacity:1}',
 G+' .tbk-ed{position:absolute;z-index:20;width:240px;padding:10px;border-radius:10px;background:#fbf3df;border:1.5px solid #5a3f2c;box-shadow:0 12px 26px -10px rgba(0,0,0,.5);display:flex;flex-direction:column;gap:8px;user-select:text}',
 G+' .tbk-ed .tbk-t{width:100%!important;box-sizing:border-box;margin:0!important;padding:6px 8px!important;border:1px solid #c9a45a!important;border-radius:6px!important;background:#fff!important;font:14px Georgia,serif!important;color:#2a2418!important}',
 G+' .tbk-ed .tbk-hs{display:flex;gap:8px}'+G+' .tbk-ed label{flex:1;display:flex;flex-direction:column;gap:2px;font:700 8.5px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#8a6f55}',
 G+' .tbk-ed input[type=time]{width:100%!important;box-sizing:border-box;margin:0!important;padding:4px 6px!important;border:1px solid #c9a45a!important;border-radius:6px!important;background:#fff!important;font:13px var(--mono,monospace)!important;color:#2a2418!important}',
 G+' .tbk-ed .tbk-bt{display:flex;gap:6px;flex-wrap:wrap}',
 G+' .tbk-ed button{width:auto!important;margin:0!important;padding:5px 9px!important;border:1px solid #5a3f2c!important;border-radius:999px!important;background:none!important;color:#5a3f2c!important;font:600 10.5px var(--sans,system-ui)!important;cursor:pointer}',
 G+' .tbk-ed button.ok{margin-left:auto!important;background:#2a2418!important;color:#f4ead2!important}',
 G+' .tbk-ed button[data-tbkdel]{border-color:#9a4a30!important;color:#9a4a30!important}'
].join('\n');document.head.appendChild(st);})();
setInterval(function(){agBusca(false);},21*60e3);setTimeout(function(){agBusca(false);},1500);

/* ---------- Rodapé expansível com os apps (Agenda, Clima, Spotify, Atalhos) ---------- */
function rodMonta(){var r=document.getElementById('rod-apps');if(r)return r;r=document.createElement('section');r.id='rod-apps';r.className='rod';
 r.innerHTML='<div class="rod-top"><div class="rod-reg" id="rod-reg"></div><button type="button" class="rod-bar" id="rod-bar" aria-expanded="false"><span class="rod-k">apps</span><span class="rod-mini" id="rod-mini"></span><span class="rod-seta">abrir ▴</span></button></div><div class="rod-corpo" id="rod-corpo"></div>';
 document.body.appendChild(r);r.querySelector('#rod-bar').onclick=function(){var on=!r.classList.contains('aberto');r.classList.toggle('aberto',on);this.setAttribute('aria-expanded',on);r.querySelector('.rod-seta').textContent=on?'fechar ▾':'abrir ▴';try{localStorage.setItem('astro_rod',on?'1':'0');}catch(e){}};
 try{if(localStorage.getItem('astro_rod')==='1'){r.classList.add('aberto');r.querySelector('.rod-seta').textContent='fechar ▾';}}catch(e){}
 document.body.classList.add('com-rodape');return r;}
function rodBarra(){var m=document.getElementById('rod-mini');if(!m)return;var h='',c=null;try{c=JSON.parse(localStorage.getItem('astro_clima')||'null');}catch(e){}
 if(c&&c.d&&c.d.current)h+='<span>'+CR_IC.agua.replace('<svg','<svg class="rod-ic"')+Math.round(c.d.current.temperature_2m)+'° '+esc(LAT_WMO[c.d.current.weather_code]||'')+'</span>';
 var hj=hoje(),pr=AG.ev.filter(function(x){return x.fim>new Date();})[0];if(pr)h+='<span>'+LAT_IC.agenda.replace('<svg','<svg class="rod-ic"')+esc((pr.ini.toDateString()===new Date().toDateString()?'':pr.ini.getDate()+'/'+(pr.ini.getMonth()+1)+' ')+agHora(pr)+' '+pr.t)+'</span>';
 else if(!agIcsUrl())h+='<span>'+LAT_IC.agenda.replace('<svg','<svg class="rod-ic"')+'agenda não ligada</span>';
 if(latApps().spotify)h+='<span>'+LAT_IC.musica.replace('<svg','<svg class="rod-ic"')+'trilha pronta</span>';
 m.innerHTML=h;}
setInterval(function(){try{rodBarra();}catch(e){}},60e3);

/* ---------- Compromissos: gaveta que sai da coluna direita da Grade semanal ----------
   Junta o Toque da Concha e a Agenda Google numa linha do dia, mais os próximos dias. */
function compHojeHTML(){var hj=hoje(),it=[],R=rtD(),a=rtAgora();
 R.toques.forEach(function(t){if(t.on)it.push({m:rtMin(t.h),h:t.h,t:t.n,k:'concha'});});
 agDoDia(hj).forEach(function(x){if(x.dia)it.unshift({m:-1,h:'dia todo',t:x.t,k:'agenda'});else it.push({m:x.ini.getHours()*60+x.ini.getMinutes(),h:agHora(x),t:x.t+(x.loc?' · '+x.loc:''),k:'agenda'});});
 try{if(rtD().avisa.gr)rtGradeHoje().forEach(function(x){it.push(x);});}catch(e){}
 it.sort(function(p,q){return p.m-q.m;});var marc=false;
 return '<ol class="comp-dia">'+it.map(function(x){var agora='';if(!marc&&x.m>a){marc=true;agora='<li class="comp-agora"><span>agora · '+String(Math.floor(a/60)).padStart(2,'0')+':'+String(a%60).padStart(2,'0')+'</span></li>';}
  return agora+'<li class="comp-'+x.k+(x.m>=0&&x.m<a?' passou':'')+'"><i>'+(x.k==='concha'?RT_IC.concha:x.k==='grade'?RT_IC.insp:LAT_IC.agenda)+'</i><b>'+esc(x.h)+'</b><span>'+esc(x.t)+'</span></li>';}).join('')+(marc?'':'<li class="comp-agora"><span>agora</span></li>')+'</ol>';}
function compHTML(){var lig=!!agIcsUrl();
 return '<header><span class="k9">Compromissos</span><b>Hoje no acampamento</b><button type="button" class="comp-x" data-comp-x aria-label="fechar">×</button></header>'+compHojeHTML()+
  '<h5>Próximos dias</h5>'+(lig?agListaHTML(14):'<p class="comp-n">Ligue a Agenda Google no rodapé (cartão da Agenda, endereço iCal) para os seus compromissos aparecerem aqui e na Grade.</p>')+
  '<p class="comp-n">Os horários da concha se ajustam no cartão Toque da Concha.</p>';}
function compRodHTML(){var lig=!!agIcsUrl();
 return '<div class="cr2-hoje"><span class="k9">hoje · '+new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'short'})+'</span>'+compHojeHTML()+'</div>'+
  '<div class="cr2-prox"><span class="k9">compromissos · próximos dias</span>'+(lig?agListaHTML(10):'<p class="comp-n">Ligue a Agenda Google no rodapé (cartão da Agenda, endereço iCal) para os compromissos aparecerem aqui e na Grade.</p>')+'</div>';}
function compRod(){var tb=document.querySelector('.wrap > div.tb');if(!tb)return;var r=document.getElementById('comp-rod');
 if(!r){r=document.createElement('footer');r.id='comp-rod';r.className='comp-rod';}
 var lg=document.getElementById('v4-leg');if(lg&&lg.parentNode===tb){if(lg.nextElementSibling!==r)tb.insertBefore(r,lg.nextSibling);}else if(r.parentNode!==tb)tb.appendChild(r);
 r.innerHTML=compRodHTML();}
function compPinta(){try{compRod();}catch(e){}return;var tb=document.querySelector('.wrap > div.tb');if(!tb)return;var g=tb.querySelector('.comp-gaveta'),al=tb.querySelector('.comp-alca');
 if(!al){al=document.createElement('button');al.type='button';al.className='comp-alca';al.setAttribute('aria-expanded','false');al.innerHTML='<span>compromissos</span>';tb.appendChild(al);
  al.onclick=function(){var on=!tb.classList.contains('comp-aberto');tb.classList.toggle('comp-aberto',on);al.setAttribute('aria-expanded',on);if(on)compPinta();};}
 if(!g){g=document.createElement('aside');g.className='comp-gaveta';g.setAttribute('aria-label','Compromissos');tb.appendChild(g);
  g.addEventListener('click',function(e){if(e.target.closest('[data-comp-x]')){tb.classList.remove('comp-aberto');al.setAttribute('aria-expanded','false');}});}
 if(tb.classList.contains('comp-aberto')||!g.firstChild)g.innerHTML=compHTML();}
(function(){var p0=pinta;pinta=function(){p0();try{compPinta();}catch(e){}};})();
setInterval(function(){try{compPinta();}catch(e){}},60e3);

/* ---------- Foco e metas do mês: faixa acima da Grade, editada num diálogo ---------- */
function mfPinta(){var h=document.getElementById('h-sem'),wr=document.querySelector('.wrap');if(!h||!wr)return;var b=document.getElementById('mf-faixa');
 if(!b){b=document.createElement('div');b.id='mf-faixa';b.className='mf-faixa';b.dataset.area='op';b.addEventListener('click',function(e){if(e.target.closest('[data-mf]'))mfAbre();});}
 b.dataset.vxHidden='false';var tb0=document.querySelector('.wrap > div.tb');if(!tb0)return;b.className='mf-gav';if(b.parentNode!==tb0)tb0.appendChild(b);
 if(!b.dataset.gav){b.dataset.gav='1';b.addEventListener('click',function(e){var a=e.target.closest('[data-gav]');if(!a)return;var k=a.getAttribute('data-gav'),on=!tb0.classList.contains('gav-'+k);
  tb0.classList.remove('gav-mes','gav-sem','gav-dia');if(on){tb0.classList.add('gav-'+k);var i=b.querySelector('.mf-g-'+k+' input');if(i)setTimeout(function(){try{i.focus({preventScroll:true});}catch(z){}},320);}
  Array.prototype.forEach.call(b.querySelectorAll('.mf-alca'),function(x){x.setAttribute('aria-expanded',String(tb0.classList.contains('gav-'+x.getAttribute('data-gav'))));});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')tb0.classList.remove('gav-mes','gav-sem','gav-dia');});}
 var foco=document.activeElement;if(foco&&b.contains(foco)&&foco.tagName==='INPUT')return;
 var W=wsD(),m=wsSemanas().mes,v=W.mes[m]||{},MS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
 var RS=revSemana(),R=(wsD().rev||{})[RS.k]||{};
 var P=null;try{P=(typeof tbMesPlano==='function'&&window.AX&&AX.ok)?tbMesPlano():null;}catch(e){}
 var vf=(P&&P.m.foco)||(v.foco||'').split('\n')[0],vm=(P&&P.m.metas)||(v.metas||'').split('\n').filter(Boolean).join(' · ');
 var nm=MS[+m.slice(5)-1],om=tb0.classList.contains('gav-mes'),os=tb0.classList.contains('gav-sem');
 b.innerHTML='<button type="button" class="mf-alca mf-alca-mes" data-gav="mes" aria-expanded="'+om+'"><span>o mês · '+nm+'</span></button>'+
  '<aside class="mf-g mf-g-mes" aria-label="O mês"><header><span class="k9">o mês</span><b>'+nm.charAt(0).toUpperCase()+nm.slice(1)+'</b><button type="button" class="comp-x" data-gav="mes" aria-label="fechar">×</button></header>'+
  '<label><small>foco</small><input data-mfm="foco" maxlength="120" placeholder="uma intenção para o mês" value="'+esc(vf)+'"></label>'+
  '<label><small>metas</small><input data-mfm="metas" maxlength="160" placeholder="o que quero concluir" value="'+esc(vm)+'"></label>'+
  '<p class="comp-n">Fica gravado junto com o plano do mês da Bolsa de Dracmas.</p></aside>'+
  '<button type="button" class="mf-alca mf-alca-sem" data-gav="sem" aria-expanded="'+os+'"><span>a semana · '+RS.rot+'</span></button>'+
  '<aside class="mf-g mf-g-sem" aria-label="Review da semana"><header><span class="k9">review da semana</span><b>'+RS.rot+'</b><button type="button" class="comp-x" data-gav="sem" aria-label="fechar">×</button></header>'+
  [['ok','funcionou','o que deu certo'],['trava','travou','o que emperrou'],['ajuste','ajustar','o que muda na próxima']].map(function(x){return '<label><small>'+x[1]+'</small><input data-rev="'+x[0]+'" maxlength="140" placeholder="'+x[2]+'" value="'+esc(R[x[0]]||'')+'"></label>';}).join('')+'</aside>';
 if(!b.dataset.rev){b.dataset.rev='1';var t=0;b.addEventListener('input',function(e){var k=e.target.dataset&&e.target.dataset.rev;if(!k)return;var W=wsD(),key=revSemana().k;W.rev=W.rev||{};W.rev[key]=W.rev[key]||{};W.rev[key][k]=e.target.value;clearTimeout(t);t=setTimeout(grava,500);});
  /* foco e metas: mesmo lugar do AxisHub (plano do mês) e do registro do app */
  b.addEventListener('change',function(e){var k=e.target.dataset&&e.target.dataset.mfm;if(!k)return;var val=e.target.value.trim();
   try{var Q=(typeof tbMesPlano==='function'&&window.AX&&AX.ok)?tbMesPlano():null;if(Q){Q.m[k]=val;AX.save();}}catch(z){}
   var W=wsD(),mm=wsSemanas().mes;W.mes[mm]=W.mes[mm]||{};W.mes[mm][k]=val;grava();});
  b.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.dataset&&(e.target.dataset.mfm||e.target.dataset.rev))e.target.blur();});}}
/* semana corrente (segunda a domingo) para a review */
function revSemana(){var d=new Date(),x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));var f=new Date(x);f.setDate(x.getDate()+6);
 var p=function(n){return String(n).padStart(2,'0');},MS=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
 return {k:x.getFullYear()+'-'+p(x.getMonth()+1)+'-'+p(x.getDate()),rot:x.getDate()+(x.getMonth()===f.getMonth()?'':' '+MS[x.getMonth()])+'–'+f.getDate()+' '+MS[f.getMonth()]};}
function mfAbre(){var W=wsD(),m=wsSemanas().mes,v=W.mes[m]||{},d=document.getElementById('mf-dlg');
 if(!d){d=document.createElement('div');d.id='mf-dlg';d.className='fer-dlg';document.body.appendChild(d);
  d.addEventListener('click',function(e){if(e.target===d||e.target.closest('[data-mf-x]')){d.hidden=true;return;}
   if(e.target.closest('[data-mf-ok]')){var W2=wsD(),m2=wsSemanas().mes;W2.mes[m2]=W2.mes[m2]||{};W2.mes[m2].foco=d.querySelector('[data-mf-f]').value.slice(0,600);W2.mes[m2].metas=d.querySelector('[data-mf-m]').value.slice(0,600);grava();d.hidden=true;mfPinta();}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')d.hidden=true;});}
 d.innerHTML='<div class="fer-box mf-box" role="dialog" aria-modal="true"><header><span class="lat-ic">'+LAT_IC.copa+'</span><div><span class="k9">o mês</span><b>Foco e metas</b></div><button type="button" class="lat-ed" data-mf-x aria-label="fechar">×</button></header>'+
  '<label>Foco do mês<textarea data-mf-f rows="3" placeholder="Uma intenção para o mês">'+esc(v.foco||'')+'</textarea></label><label>Metas do mês<textarea data-mf-m rows="5" placeholder="O que quero concluir, uma por linha">'+esc(v.metas||'')+'</textarea></label>'+
  '<div class="mf-bt"><button type="button" data-mf-x>cancelar</button><button type="button" data-mf-ok>salvar</button></div></div>';
 d.hidden=false;var t=d.querySelector('textarea');if(t)t.focus();}
/* o Partenon deixou de existir como parte: o estudo mora no Laptop de Dédalo, à direita */
var TT_ORIG=['op','camp','est','dos','fin'];
TT_AREAS=['op','camp','fin'];
ttNome=function(i){var a=TT_AREAS[i],j=TT_ORIG.indexOf(a),t=TEMAS[apTema()]||{},x=(t.abas||[])[j]||'',p=x.split(' / ');return {n:String(i+1).padStart(2,'0'),t:p[1]||p[0]||''};};

/* índice: Bolsa de Dracmas vira ícone; atalhos em ícone para o Laptop de Dédalo e a Enfermaria (bastão de Asclépio) */
LAT_IC.bolsa='<svg viewBox="0 0 24 24"><path d="M9 3.5h6l-1.4 3h-3.2z"/><path d="M10.4 6.5C6.5 8.2 4.5 11.5 4.5 14.8c0 3.4 3 5.2 7.5 5.2s7.5-1.8 7.5-5.2c0-3.3-2-6.6-5.9-8.3"/><path d="M8.5 6.5h7"/><circle cx="12" cy="14.2" r="2.6"/><path d="M12 12.8v2.8"/></svg>';
LAT_IC.laptop='<svg viewBox="0 0 24 24"><rect x="5" y="4.5" width="14" height="10" rx="1.2"/><path d="M2.8 18.5h18.4l-1.6-3.5H4.4z"/><path d="M10 16.8h4"/></svg>';
LAT_IC.asclepio='<svg viewBox="0 0 24 24"><path d="M12 4.5v17" stroke-width="2.2"/><circle cx="12" cy="3.6" r="1.3"/><path d="M12.6 19.5c-3.2-.3-4.6-1.3-4.6-2.4 0-1.6 7.8-1.4 7.8-3.6 0-1.9-7.6-1.5-7.6-3.6 0-1.8 6.6-1.7 6.6-3.5"/><path d="M14.2 6.4c.9 0 1.9-.5 2.2-1.3l-1.6-.6c-.6-.1-1 .4-.6 1.9z" fill="currentColor"/></svg>';
LAT_IC.cruz=LAT_IC.asclepio;
function ttIcones(){var n=document.getElementById('tt-indice');if(!n)return;var f=n.querySelector('[data-tt="fin"]');
 if(f&&!f.classList.contains('tt-ic')){f.classList.add('tt-ic');f.title='Bolsa de Dracmas';f.setAttribute('aria-label','Bolsa de Dracmas');f.innerHTML=LAT_IC.bolsa;}
 if(!document.querySelector('#tt-indice [data-ic="laptop"],.pd-pilula [data-ic="laptop"]')){[['laptop','Laptop de Dédalo · painel de estudos',LAT_IC.laptop],['enf','Enfermaria do Acampamento',LAT_IC.asclepio]].forEach(function(x){
  var b=document.createElement('button');b.type='button';b.className='tt-ic';b.dataset.ic=x[0];b.title=x[1];b.setAttribute('aria-label',x[1]);b.innerHTML=x[2];n.appendChild(b);});
  n.addEventListener('click',function(e){var b=e.target.closest('[data-ic]');if(!b)return;
   if(b.dataset.ic==='laptop'){if(LAT_LARGA.matches){latExpande();var r=document.getElementById('rail');if(r)r.scrollTop=0;}else{var le=document.getElementById('lat-est');if(le)le.scrollIntoView({behavior:'smooth'});}}
   else{var c=document.getElementById('lat-enf-c');if(c){c.scrollIntoView({behavior:'smooth',block:'start'});c.classList.add('pisca');setTimeout(function(){c.classList.remove('pisca');},1400);}}});}}
(function(){var i0=ttIndice;ttIndice=function(){i0();try{ttIcones();}catch(e){}};})();
setTimeout(function(){try{ttIcones();}catch(e){}},600);
/* ---------- Casa Grande enxuta ----------
   Sai o que repetia outro painel (hábitos de 7 dias, toque de recolher, chamada da manhã,
   faixa de hoje, capturas, projetos). O motor de foco vira o Treino na Arena. Profecia,
   recarga, Em andamento e Atividades viram cartões do painel esquerdo. O Mapa de campo sai;
   Provações viram os Trabalhos de Hércules e Recompensas viram Prêmios, ambos em dracmas. */
LAT_IC.prof='<svg viewBox="0 0 24 24"><path d="M12 3c2 2.3 2 4.4 0 6-2-1.6-2-3.7 0-6z"/><path d="M5.5 10.5h13l-2 3h-9z"/><path d="M9 13.5l-2.6 7M15 13.5l2.6 7M12 13.5v7"/></svg>';
LAT_IC.fogo='<svg viewBox="0 0 24 24"><path d="M12 3c3 3.4 4.2 5.9 4.2 8.3a4.2 4.2 0 0 1-8.4 0c0-1.9 1.3-3.4 1.9-5.3.8 1.5 1.5 2.2 2.1 2.4.6-1.6.6-3.4.2-5.4z"/><path d="M5 20.5l14-3.2M5 17.3l14 3.2"/></svg>';
LAT_IC.giro='<svg viewBox="0 0 24 24"><path d="M19.2 8.5A8 8 0 1 0 20 14"/><path d="M19.5 3.8v4.7h-4.7"/><circle cx="12" cy="12" r="2.3"/></svg>';
LAT_IC.alvo='<svg viewBox="0 0 24 24"><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4.6"/><circle cx="11" cy="13" r="1.3"/><path d="M12.5 11.5L20 4M16.5 4H20v3.5"/></svg>';

/* rótulos do motor de foco: só textos fixos da tela, nunca o que o usuário escreveu */
var TR_ROT=[[/^Alvo do ciclo \/ aguardando rota$/,'Treino na Arena · aguardando o alvo'],[/^Alvo do ciclo \/ /,'Treino na Arena · '],
 [/^\+ Nova rota$/,'+ Novo treino'],[/^Editar rota$/,'Editar treino'],[/^Abrir rota$/,'Abrir treino'],
 [/^Uma rota antes de qualquer disparo\.$/,'Um alvo antes de cada flecha.'],
 [/^Escolha uma entrega concreta e seu primeiro movimento\. O ECO preservará o ponto de retorno\.$/,'Escolha uma entrega concreta e o primeiro movimento. O fim do treino guarda o ponto de volta.'],
 [/^Declarar primeira rota$/,'Declarar o primeiro treino'],[/^Ignição 2 min$/,'Aquecer 2 min'],
 [/^Radar de campo$/,'Quadro da arena'],[/^Nenhuma rota neste filtro\.$/,'Nenhum treino neste filtro.'],[/^Filtro: Todas as rotas$/,'Filtro: Todos os treinos'],
 [/^(\S+) · rota independente$/,'$1 · treino avulso'],[/^Fechamento do ciclo · relatório do ECO/,'Fim do treino · relatório do dia'],
 [/^Calibrar o campo$/,'Ajustar a arena'],[/^Salvar calibração$/,'Salvar ajustes'],
 [/^Carga e saturação são sinais de planejamento\..*$/,'A capacidade é o teto de minutos de foco do dia. Cada hora de foco rende 10 dracmas de ouro.'],
 [/^Entrega concluída\. O ramo agora faz parte do seu domínio\.$/,'Entrega concluída. Mais uma flecha no alvo.'],
 [/^Varredura de futuros · preparar o caminho$/,'Plano de batalha · preparar o caminho'],[/^Varredura de futuros$/,'Plano de batalha'],
 [/^Entrega \/ alvo do ciclo$/,'Entrega / alvo do treino'],[/^Âncora do último ciclo:$/,'Âncora do último treino:']];
function trRotulos(){var b=document.getElementById('vx-body');if(!b)return;
 var w=document.createTreeWalker(b,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;
  /* títulos e textos das rotas são do usuário */
  if(p.closest('.vx-main > p:not(.vx-muted):not(.vx-notice),.vx-item > p'))return NodeFilter.FILTER_REJECT;
  if(p.closest('.vx-main > h2')&&n.nodeValue.trim()!=='Uma rota antes de qualquer disparo.')return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}}),n,l=[];
 while((n=w.nextNode()))l.push(n);
 l.forEach(function(n){var v=n.nodeValue,t=v.trim(),nv=t;TR_ROT.forEach(function(r){nv=nv.replace(r[0],r[1]);});if(nv!==t)n.nodeValue=v.replace(t,nv);});
 /* o teto de foco da chamada da manhã aparece no cabeçalho do treino */
 var k=b.querySelector('.vx-main > .vx-top .vx-k');if(k&&!k.querySelector('.tr-teto')&&typeof v4Leitura==='function'&&v4Leitura()){var s=document.createElement('small');s.className='tr-teto';s.textContent=' · teto hoje '+v4Teto()+' min';k.appendChild(s);}}

/* cartões novos do painel esquerdo; dobrar fica salvo por cartão */
var CG_CARDS=[
 {id:'lat-prof',ic:'prof',k:'Hékatos · focos, afirmações e visualizações',t:'Profecia do ciclo',apos:'#lat-gm',dobra:true},
 {id:'lat-orb',ic:'giro',k:'assistindo, ouvindo, estudando',t:'Em andamento',apos:'#lat-cp'},
 {id:'lat-apt',ic:'alvo',k:'em treino e pretendidas',t:'Atividades do acampamento',apos:'#lat-orb'},
 {id:'lat-rec',ic:'fogo',k:'montado num dia bom, usado num dia ruim',t:'Menu de recarga',apos:'#lat-enf-c'}];
function cgDobras(){try{return JSON.parse(localStorage.getItem('astro_cg_dobra')||'{}')||{};}catch(e){return {};}}
function cgCard(c){var d=cgDobras(),dob=c.id in d?!!d[c.id]:!!c.dobra;
 var s=document.createElement('div');s.innerHTML=latCard(c.id,c.ic,c.k,c.t,'<div class="cg-b"></div>');s=s.firstChild;s.classList.add('cg-c');s.classList.toggle('cg-dob',dob);
 var hd=s.querySelector('header'),bt=document.createElement('button');bt.type='button';bt.className='lat-ed cg-dobra';bt.setAttribute('aria-label','abrir ou fechar');bt.setAttribute('aria-expanded',String(!dob));
 bt.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 9.5l6 6 6-6"/></svg>';hd.appendChild(bt);
 hd.addEventListener('click',function(ev){if(ev.target.closest('a,input'))return;var on=!s.classList.contains('cg-dob');s.classList.toggle('cg-dob',on);bt.setAttribute('aria-expanded',String(!on));
  var x=cgDobras();x[c.id]=on;try{localStorage.setItem('astro_cg_dobra',JSON.stringify(x));}catch(e){}});
 return s;}
function cgPoe(box,nos){nos.forEach(function(n){if(!n)return;n.dataset.vxHidden='false';n.style.display='';if(n.parentNode!==box)box.appendChild(n);});}
function cgFora(n){if(n){n.classList.add('cg-fora');n.dataset.vxHidden='true';}}
/* um título de seção e os blocos dele logo em seguida (só os do tipo esperado) */
function cgSecao(id,sel){var h=document.getElementById(id),r=[];if(!h)return r;r.push(h);var n=h.nextElementSibling;
 while(n&&n.matches(sel)){r.push(n);n=n.nextElementSibling;}return r;}
function cgCards(){var e=document.getElementById('lat-e');if(!e)return;
 CG_CARDS.forEach(function(c){if(document.getElementById(c.id))return;var ref=e.querySelector(c.apos),s=cgCard(c);if(ref&&ref.parentNode===e)e.insertBefore(s,ref.nextSibling);else e.appendChild(s);});
 var B=function(id){return document.querySelector('#'+id+' .cg-b');};
 /* Profecia: ficha do Hékatos, a declaração do dia e focos/afirmações/visualizações */
 var rota=cgSecao('h-rota','#hk-ficha,.narr,.ign'),narr=rota.filter(function(n){return n.classList.contains('narr');})[0],cor=narr&&narr.querySelector('.corrente');
 cgPoe(B('lat-prof'),[document.getElementById('hk-ficha'),cor,document.querySelector('.ign')]);
 rota.forEach(function(n){if(n.id!=='hk-ficha'&&!n.classList.contains('ign'))cgFora(n);});
 /* Em andamento */
 cgSecao('h-orb','#orbp').forEach(function(n){if(n.id==='orbp')cgPoe(B('lat-orb'),[n]);else cgFora(n);});
 /* Atividades: filtro, lista e formulário */
 cgSecao('h-apt','.aptcab,.apt,.aptnovo').forEach(function(n){if(n.matches('.aptcab,.apt,.aptnovo'))cgPoe(B('lat-apt'),[n]);else cgFora(n);});
 /* Menu de recarga sai da antiga Operação diária; os hábitos de 7 dias ficam escondidos (o registro do dia ainda os usa) */
 cgPoe(B('lat-rec'),[document.getElementById('mn-l'),document.getElementById('mn-add')]);
 cgSecao('h-dia','.op3').forEach(cgFora);
 /* Projetos ficam no Bunker 9 do painel direito */
 cgSecao('h-mc','.narr,.mc').forEach(cgFora);
 /* Trabalhos e Prêmios: títulos no tema */
 var hp=document.getElementById('h-prov');if(hp&&!hp.dataset.cg){hp.dataset.cg=1;hp.innerHTML='Trabalhos de Hércules <span>// metas longas · pagam em dracmas de ouro</span>';}
 var hr=document.getElementById('h-rec');if(hr&&!hr.dataset.cg){hr.dataset.cg=1;hr.innerHTML='Prêmios da Casa Grande <span>// trocados por dracmas de ouro</span>';}}
(function(){var h0=hkFicha;hkFicha=function(){h0();var f=document.getElementById('hk-ficha');if(f&&f.closest('#lat-prof'))f.style.display='';};})();
(function(){var p0=latPosiciona;latPosiciona=function(){p0.apply(this,arguments);try{cgCards();}catch(e){console.error('cg:',e);}};})();
(function(){var r0=vxRender;vxRender=function(){r0();try{cgCards();trRotulos();}catch(e){console.error('cg:',e);}};})();

/* ---------- Trabalhos de Hércules: as provas antigas, contadas pelo app do acampamento ----------
   Pagam em dracmas de ouro (metade do antigo valor em lastro, para a loja não inflar). */
var TRAB={pv1:['Os estábulos de Áugias','Cumprir 20 tarefas do Chalé.'],
 pv2:['O leão de Nemeia','Sete dias com a Enfermaria em 70 ou mais.'],
 pv3:['A corça de Cerineia','Declarar a Profecia em 10 ciclos.'],
 pv4:['As aves do Estínfalo','Levar 30 termos ao estágio dominado em Grego Antigo e Outras.'],
 pv5:['O javali de Erimanto','Fechar 3 voltas do ciclo de estudo em Táticas de Guerra.'],
 pv6:['A Hidra de Lerna','Dez ciclos sem estourar o teto de foco.']};
function trabPaga(P){return Math.round(P.pg/2);}
(function(){var d0=drSaldo;drSaldo=function(){return d0()+(drD().bonus|0);};})();
pintaProvas=function(){var h='',i;
 for(i=0;i<PROVAS.length;i++){var P=PROVAS[i],T=TRAB[P.id]||[P.n,P.d],v=0;try{v=P.f()|0;}catch(e){v=0;}
  v=Math.max(0,Math.min(P.alvo,v));var pc=Math.round(v/P.alvo*100),paga=!!S.provas[P.id],pronta=v>=P.alvo;
  h+='<div class="pv'+(paga?' paga':(pronta?' pronta':''))+'"><div class="pvt"><b>'+T[0]+'</b><span class="pvp">'+trabPaga(P)+' <i>dracmas</i></span></div><p>'+T[1]+'</p>'+
   '<div class="pvb"><i style="width:'+pc+'%"></i></div><div class="pvf"><span>'+v+' / '+P.alvo+'</span>'+
   (paga?'<span class="pvok">cumprido em '+S.provas[P.id]+'</span>':'<button data-pv="'+P.id+'"'+(pronta?'':' disabled')+'>'+(pronta?'receber':'em curso')+'</button>')+'</div></div>';}
 var box=el('prov');if(!box)return;box.innerHTML=h;
 Array.prototype.forEach.call(box.querySelectorAll('[data-pv]'),function(b){b.addEventListener('click',function(){var id=this.getAttribute('data-pv'),P=PROVAS.filter(function(x){return x.id===id;})[0];
  if(!P||S.provas[id])return;var v2=0;try{v2=P.f()|0;}catch(e){}if(v2<P.alvo)return;
  var L=drD();S.provas[id]=hoje();L.bonus=(L.bonus|0)+trabPaga(P);
  move(0,8,'Trabalho cumprido: '+(TRAB[id]||[P.n])[0]+'. '+trabPaga(P)+' dracmas de ouro na bolsa.',false,0,1,0);});});};
/* ---------- Prêmios da Casa Grande: mesmos prêmios, agora comprados com dracmas ---------- */
var PREM_NOME={0:'Tarde livre no lago'};
pintaRw=function(){var h='',sd=drSaldo();
 for(var i=0;i<RECOMPENSAS.length;i++){var r=RECOMPENSAS[i],got=!!S.premios[i],paga=sd>=r.c;
  h+='<div class="rwc'+(got?' got':(paga?'':' lock'))+'"><span class="lv">'+(got?'resgatado em '+S.premios[i]:'prêmio da Casa Grande')+'</span><h4>'+(PREM_NOME[i]||r.h)+'</h4><p>'+r.p+'</p>'+
   '<span class="preco">'+r.c+' <i>dracmas</i></span><button data-r="'+i+'"'+((got||!paga)?' disabled':'')+'><strong>'+(got?'Resgatado':(paga?'Resgatar':'faltam '+(r.c-sd)+' dracmas'))+'</strong></button></div>';}
 var box=el('rw');if(!box)return;box.innerHTML=h;
 Array.prototype.forEach.call(box.querySelectorAll('button[data-r]'),function(b){b.addEventListener('click',function(){var k=this.getAttribute('data-r'),rr=RECOMPENSAS[k];
  if(!rr||S.premios[k]||drSaldo()<rr.c)return;var L=drD();L.gasto=(L.gasto|0)+rr.c;S.premios[k]=hoje();
  anota('Prêmio resgatado: '+(PREM_NOME[k]||rr.h)+' — '+rr.c+' dracmas de ouro.',0,false);pinta();});});};
setTimeout(function(){try{cgCards();trRotulos();pintaProvas();pintaRw();}catch(e){console.error('cg:',e);}},0);

/* a Grade semanal é o painel principal: logo abaixo do índice */
function latGradeTopo(){var wr=document.querySelector('.wrap'),h=document.getElementById('h-sem'),ix=document.getElementById('tt-indice');if(!wr||!h)return;
 var tb=h.nextElementSibling&&h.nextElementSibling.classList.contains('tb')?h.nextElementSibling:document.querySelector('.wrap > .tb');
 [h,tb].forEach(function(n){if(n){n.dataset.area='op';n.dataset.vxHidden='false';}});
 var hb=bnBox(),ant=ix||null;
 if(hb){var r0=ant?ant.nextSibling:wr.firstChild;if(hb!==r0)wr.insertBefore(hb,r0);ant=hb;}
 var ref=ant?ant.nextSibling:wr.firstChild;if(h!==ref)wr.insertBefore(h,ref);
 if(tb&&h.nextElementSibling!==tb)wr.insertBefore(tb,h.nextSibling);
 try{wsPinta();}catch(e){console.error('spread:',e);}
 try{mfPinta();compPinta();}catch(e){console.error('foco do mês:',e);}
 try{rtPinta();}catch(e){console.error('rotina:',e);}
 try{arFaixas();}catch(e){console.error('arte:',e);}
 try{neoAplica();}catch(e){console.error('neoclássico:',e);}
 /* rastreador de hábitos (grade mensal) logo abaixo do painel da semana */
 try{var hr=document.getElementById('h-rast'),rt=hr&&hr.nextElementSibling&&hr.nextElementSibling.classList.contains('rt')?hr.nextElementSibling:document.querySelector('.wrap > .rt'),wb=tb;
  if(hr&&wb){[hr,rt].forEach(function(n){if(n){n.dataset.area='op';n.dataset.vxHidden='false';}});if(wb.nextElementSibling!==hr)wr.insertBefore(hr,wb.nextSibling);if(rt&&hr.nextElementSibling!==rt)wr.insertBefore(rt,hr.nextSibling);}}catch(e){console.error('rastreador:',e);}
 try{arsPinta();}catch(e){console.error('arsenal:',e);}
 try{mmPinta();}catch(e){console.error('mural de missões:',e);}}
ttAlvo=function(a){return a==='op'?(document.getElementById('hero-box')||document.getElementById('h-sem')||document.getElementById('vx')):document.getElementById('area-'+a);};

/* colar, bandeira e carta na coluna da esquerda: a linha nasce no Casa Grande a cada redesenho e muda de casa */
/* mural de avisos (o Quadro de Avisos) dentro do cabeçalho da Casa Grande */
function latMural(){var ri=document.getElementById('rail-in'),h=document.querySelector('.vx-hero');if(!ri||!h)return;latRailCss();
 var m=h.querySelector('.cp-mural');if(!m){m=document.createElement('div');m.className='cp-mural';h.appendChild(m);}
 if(ri.parentNode!==m)m.appendChild(ri);}

/* registro do dia no cabeçalho: humor, água, sono, movimento, refeições e hábitos num lugar só.
   Cada botão aciona o registro original da Enfermaria e da Escala do chalé, então os dados são os mesmos. */
/* registro do dia no formato do cabeçalho do Cofre (AxisHub): quadrados com ícone e borda colorida, data e semana ao lado;
   cada quadrado abre um balão com o registro. Os botões acionam os registros originais da Enfermaria e da Escala do chalé. */
var CR_IC={humor:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 14.2c1.8 2 5.2 2 7 0M9 9.8h.01M15 9.8h.01"/></svg>',
 agua:'<svg viewBox="0 0 24 24"><path d="M12 3.5c3.5 4.4 5.5 7.6 5.5 10.3a5.5 5.5 0 0 1-11 0c0-2.7 2-5.9 5.5-10.3z"/></svg>',
 sono:'<svg viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/></svg>',
 mov:'<svg viewBox="0 0 24 24"><circle cx="14" cy="4.5" r="1.8"/><path d="M8 21l3.5-6.5 3 2.5V21M6.5 11l3-3.5 4 1 2.5 3.5 3 .5M11.5 14.5l1.5-5"/></svg>',
 ref:'<svg viewBox="0 0 24 24"><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 1.5-2.5 4-2.5 7h3v11"/></svg>',
 gasto:'<svg viewBox="0 0 24 24"><path d="M12 3.5l8.5 8.5-8.5 8.5L3.5 12z"/><path d="M12 8l4 4-4 4-4-4z"/></svg>',
 med:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
 hab:'<svg viewBox="0 0 24 24"><path d="M4.5 12.5l4.5 4.5 10.5-10.5"/></svg>'};
var CR_K=[['humor','Humor'],['agua','Água'],['sono','Sono'],['mov','Movimento'],['ref','Refeições'],['gasto','Gastos'],['med','Medicação'],['hab','Hábitos']];
function crTx(id){var e=document.getElementById(id);return e?e.textContent.trim():'';}
function crVal(k){var hj=hoje();
 if(k==='humor'){var v=(S.estado&&S.estado[hj])||0;return v?v+'/5':'—';}
 if(k==='agua')return (crTx('ag-n')||'0')+'/8';
 if(k==='sono'){var x=crTx('sn-h');return x&&x!=='—'?x+'h':'—';}
 if(k==='mov')return (crTx('at-n')||'0')+'min';
 if(k==='ref')return (crTx('rf-n')||'0')+'/3';
 if(k==='gasto')return latGastoHoje().replace('R$ ','');
 if(k==='med'){var M=latMeds();if(!M.meds.length)return '—';var tot=0;M.meds.forEach(function(m){tot+=(m.times&&m.times.length)?m.times.length:1;});var L=(M.H.medsLog&&M.H.medsLog[hj])||[];return L.length+'/'+tot;}
 if(k==='hab'){var H=S.hab||[];if(!H.length)return '—';return H.filter(function(x){return (x.hist||[]).indexOf(hj)>=0;}).length+'/'+H.length;}}
function crCtl(k){var hj=hoje(),i,h='';
 if(k==='humor'){var v=(S.estado&&S.estado[hj])||0;for(i=1;i<=5;i++)h+='<button type="button" class="cr-n'+(v===i?' on':'')+'" data-cr-es="'+i+'" title="'+esc((typeof ESTR!=='undefined'&&ESTR[i])||'')+'">'+i+'</button>';return '<p>Como você chega à fogueira hoje?</p><div class="cr-row">'+h+'</div>';}
 if(k==='agua')return '<p>Copos de água hoje · meta 8</p><div class="cr-row"><button type="button" class="cr-n" data-cr-ag="-" aria-label="menos um copo">−</button><b class="cr-big">'+esc(crTx('ag-n')||'0')+'</b><button type="button" class="cr-n" data-cr-ag="+" aria-label="mais um copo">+</button></div>';
 if(k==='sono')return '<p>Horas dormidas na última noite</p><div class="cr-row"><input type="number" min="0" max="14" step="0.5" placeholder="horas" data-cr-in="sono"><button type="button" class="cr-t" data-cr-ok="sono">registrar</button></div>';
 if(k==='mov')return '<p>Minutos de movimento · hoje '+esc(crTx('at-n')||'0')+' min</p><div class="cr-row"><input type="number" min="0" max="300" step="5" placeholder="min" data-cr-in="ativ"><button type="button" class="cr-t" data-cr-ok="ativ">somar</button></div>';
 if(k==='ref')return '<p>Refeições feitas hoje</p><div class="cr-row">'+['m','t','n'].map(function(x,j){var o=document.querySelector('.corpo [data-rf2="'+x+'"]'),on=o&&o.getAttribute('aria-pressed')==='true';return '<button type="button" class="cr-t'+(on?' on':'')+'" data-cr-rf="'+x+'">'+['manhã','tarde','noite'][j]+'</button>';}).join('')+'</div>';
 if(k==='gasto')return '<p>Gastos de hoje · '+esc(latGastoHoje())+' · vão para a Loja</p><div class="cr-row"><input type="text" placeholder="o quê" data-cr-in="gdesc" style="width:120px!important"><input type="text" inputmode="decimal" placeholder="R$" data-cr-in="gval" style="width:70px!important"><button type="button" class="cr-t" data-cr-ok="gasto">lançar</button></div>';
 if(k==='med')return '<p>Doses de hoje</p><div class="cr-row">'+latMedHTML()+'</div>';
 if(k==='hab')return '<p>Hábitos de hoje</p><div class="cr-row">'+((S.hab||[]).map(function(x,j){var f=(x.hist||[]).indexOf(hj)>=0;return '<button type="button" class="cr-t'+(f?' on':'')+'" data-cr-hb="'+j+'"'+(f?' disabled':'')+'>'+esc(x.nome)+'</button>';}).join('')||'<small>nenhum hábito ainda</small>')+'</div>';
 return '';}
function crData(){var d=new Date(),dias=['dom','seg','ter','qua','qui','sex','sáb'],ms=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
 var seg=new Date(d);seg.setDate(d.getDate()-((d.getDay()+6)%7));var dom=new Date(seg);dom.setDate(seg.getDate()+6);
 var t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));var dn=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-dn);var y0=new Date(Date.UTC(t.getUTCFullYear(),0,1));var sem=Math.ceil(((t-y0)/864e5+1)/7);
 return '<div class="cr-dt"><b>'+dias[d.getDay()]+', '+d.getDate()+' '+ms[d.getMonth()]+'</b><small>semana '+sem+'</small></div>';}
function latRegHTML(){var ab=latRegHTML.aberto||'';
 var bar=CR_K.map(function(k){return '<button type="button" class="cr-p cr-'+k[0]+(ab===k[0]?' on':'')+'" data-cr-pop="'+k[0]+'" title="'+k[1]+'" aria-expanded="'+(ab===k[0])+'"><span class="cr-ico">'+CR_IC[k[0]]+'</span><span class="cr-lb"><small>'+k[1]+'</small><b>'+esc(crVal(k[0]))+'</b></span></button>';}).join('');
 var pt=null;try{pt=rtProx();}catch(e){}
 return '<div class="cr-bar">'+bar+'<span class="cr-sep"></span>'+crData()+(pt?'<span class="cr-concha" title="próximo Toque da Concha">'+RT_IC.concha+'<span><small>concha</small><b>'+esc(pt.h)+'</b></span></span>':'')+'</div>'+
  (ab?'<div class="cr-pop" data-k="'+ab+'"><header><b>'+CR_K.filter(function(x){return x[0]===ab;})[0][1]+'</b><button type="button" class="cr-px" data-cr-pop="'+ab+'" aria-label="fechar">×</button></header>'+crCtl(ab)+'</div>':'');}
/* gastos e medicação vêm do Cofre (Loja): mesmo armazenamento do AxisHub */
function latAx(){try{return JSON.parse(localStorage.getItem('sfp_bruno_v4')||'null');}catch(e){return null;}}
function latAxGrava(st){try{localStorage.setItem('sfp_bruno_v4',JSON.stringify(st));localStorage.setItem('sfp_bruno_v4__ts',String(Date.now()));}catch(e){return false;}try{axRemonta();}catch(e){}return true;}
function latGastoHoje(){var st=latAx(),hj=hoje(),t=0;if(st&&Array.isArray(st.entries))st.entries.forEach(function(x){if(x.diaGasto===hj)t+=+x.efet||+x.valor||0;});
 return 'R$ '+t.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});}
function latMeds(){var st=latAx(),H=st&&st.habit;return {st:st,H:H,meds:(H&&Array.isArray(H.medications))?H.medications:[]};}
function latMedHTML(){var M=latMeds(),hj=hoje();if(!M.meds.length)return '<small>cadastre em Loja › Enfermaria</small>';
 var L=(M.H.medsLog&&M.H.medsLog[hj])||[],out='';
 M.meds.forEach(function(m){var ts=(m.times&&m.times.length)?m.times:[''];ts.forEach(function(t){var tok=t?m.id+'@'+t:m.id,on=L.indexOf(tok)>=0;
  out+='<button type="button" class="cr-t'+(on?' on':'')+'" data-cr-med="'+esc(tok)+'">'+esc((m.name||'remédio').slice(0,18))+(t?' '+esc(t):'')+'</button>';});});return out;}
function latMedToggle(tok){var M=latMeds(),hj=hoje();if(!M.H)return;M.H.medsLog=M.H.medsLog||{};var L=M.H.medsLog[hj]=M.H.medsLog[hj]||[],i=L.indexOf(tok);
 if(i>=0)L.splice(i,1);else L.push(tok);latAxGrava(M.st);latRegPinta();}
function latRegPinta(){Array.prototype.forEach.call(document.querySelectorAll('.cp-reg'),function(r){var a=document.activeElement;if(a&&r.contains(a)&&a.tagName==='INPUT')return;r.innerHTML=latRegHTML();var pp=r.querySelector('.cr-pop'),pb=pp&&r.querySelector('.cr-p.on');if(pp&&pb)pp.style.left=Math.max(0,Math.min(r.clientWidth-pp.offsetWidth,pb.offsetLeft))+'px';});}
document.addEventListener('click',function(e){if(!e.isTrusted||!latRegHTML.aberto||!e.target.isConnected||e.target.closest('.cp-reg'))return;latRegHTML.aberto='';latRegPinta();});
function latRegClica(q){var o=document.querySelector(q);if(o&&!o.disabled)o.click();setTimeout(latRegPinta,60);}
function latReg(){var h=document.querySelector('.vx-hero');if(!h)return;var r=document.querySelector('.cp-reg'),slot=rodMonta().querySelector('#rod-reg');
 if(!r){r=document.createElement('div');r.className='cp-reg';slot.appendChild(r);
  r.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var d=b.dataset;
   if(d.crPop){latRegHTML.aberto=latRegHTML.aberto===d.crPop?'':d.crPop;r.innerHTML=latRegHTML();var pp=r.querySelector('.cr-pop');if(pp){var pb=r.querySelector('.cr-p[data-cr-pop="'+d.crPop+'"]');if(pb)pp.style.left=Math.max(0,Math.min(r.clientWidth-pp.offsetWidth,pb.offsetLeft))+'px';var fi=pp.querySelector('input');if(fi)fi.focus();}return;}
   if(d.crEs)latRegClica('#es-b [data-es="'+d.crEs+'"]');
   else if(d.crAg)latRegClica(d.crAg==='+'?'#b-ag-p':'#b-ag-m');
   else if(d.crRf)latRegClica('.corpo [data-rf2="'+d.crRf+'"]');
   else if(d.crHb)latRegClica('#hb-l [data-hb="'+d.crHb+'"]');
   else if(d.crMed)latMedToggle(d.crMed);
   else if(d.crOk)latRegOk(r,d.crOk);});
  r.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.dataset.crIn){e.preventDefault();e.stopPropagation();latRegOk(r,e.target.dataset.crIn);}});}
 if(slot&&r.parentNode!==slot)slot.appendChild(r);
 r.innerHTML=latRegHTML();}
function latRegOk(r,k){
 if(k==='gasto'||k==='gdesc'||k==='gval'){var de=r.querySelector('[data-cr-in="gdesc"]'),va=r.querySelector('[data-cr-in="gval"]'),v=parseFloat(String(va.value).replace(/\./g,'').replace(',','.'));
  if(!de.value.trim()){de.focus();return;}if(!(v>0)){va.focus();return;}
  if(cxGasto({dia:hoje(),descricao:de.value.trim(),valor:v})){de.value='';va.value='';va.blur();latRegPinta();}else alert('Não consegui gravar o gasto: abra a Loja uma vez para iniciar o Cofre.');return;}
 var inp=r.querySelector('[data-cr-in="'+k+'"]');if(!inp||!inp.value)return;var alvo=document.getElementById(k==='sono'?'sn-in':'at-in');if(!alvo)return;
 alvo.value=inp.value;inp.value='';inp.blur();latRegClica(k==='sono'?'#b-sono':'#b-ativ');}
(function(){var p0=pinta;pinta=function(){p0();try{latRegPinta();}catch(e){}};})();

/* ---------- Mural do banner: notas e fotos presas com tacha, arrastáveis ---------- */

var PIN_COR=['#f3e3a6','#f2d3c6','#dde5e8','#efe6d2'];
var PIN_MAX_FOTOS=8;
function pinsD(){if(!Array.isArray(S.pins))S.pins=[];return S.pins;}
function pinHTML(p){var st='left:'+(+p.x||0).toFixed(2)+'%;top:'+(+p.y||0).toFixed(2)+'%;--r:'+(+p.r||0)+'deg;--pc:'+(p.c||PIN_COR[0]);
 var corpo='';
 if(p.t==='foto')corpo='<img src="'+esc(p.img||'')+'" alt="" draggable="false"><p contenteditable="true" spellcheck="false" data-pin-txt data-ph="legenda">'+esc(p.txt||'')+'</p>';
 else if(p.t==='lista')corpo='<b class="cp-pin-k">lista</b><ul>'+(p.itens||[]).map(function(it,i){return '<li class="'+(it.ok?'ok':'')+'"><button type="button" data-pin-ck="'+i+'" aria-label="marcar">'+(it.ok?'✓':'')+'</button><span>'+esc(it.t)+'</span></li>';}).join('')+'</ul><input data-pin-add placeholder="+ item" maxlength="60">';
 else corpo='<p contenteditable="true" spellcheck="false" data-pin-txt data-ph="escreva aqui">'+esc(p.txt||'')+'</p>';
 return '<div class="cp-pin cp-pin-'+p.t+'" data-pin="'+esc(p.id)+'" style="'+st+'"><i class="cp-tacha" aria-hidden="true"></i>'+corpo+'<button type="button" class="cp-pin-x" data-pin-del aria-label="tirar do mural">×</button></div>';}
function pinsPinta(){var h=document.querySelector('.vx-hero');if(!h)return;
 var L=h.querySelector('.cp-pins');if(!L){L=document.createElement('div');L.className='cp-pins';h.appendChild(L);pinsLiga(L,h);}
 var bar=h.querySelector('.cp-pinbar');if(!bar){bar=document.createElement('div');bar.className='cp-pinbar';
  bar.innerHTML='<span>prender no mural</span><button type="button" data-pin-novo="nota">nota</button><button type="button" data-pin-novo="lista">lista</button><button type="button" data-pin-novo="foto">foto</button><input type="file" accept="image/*" hidden data-pin-arq>';
  bar.addEventListener('click',function(e){var b=e.target.closest('[data-pin-novo]');if(!b)return;var t=b.dataset.pinNovo;
   if(t==='foto'){if(pinsD().filter(function(x){return x.t==='foto';}).length>=PIN_MAX_FOTOS){alert('O mural já tem '+PIN_MAX_FOTOS+' fotos. Tire uma antes de prender outra.');return;}bar.querySelector('[data-pin-arq]').click();return;}
   pinNovo({t:t,txt:'',itens:[]});});
  bar.querySelector('[data-pin-arq]').addEventListener('change',function(e){var f=e.target.files&&e.target.files[0];e.target.value='';if(!f)return;
   importar(f,460,function(url){pinNovo({t:'foto',img:url,txt:''});});});}
 var mu=h.querySelector('.cp-mural');if(mu&&bar.parentNode!==mu)mu.appendChild(bar);else if(!mu&&!bar.parentNode)h.appendChild(bar);
 var a=document.activeElement;if(a&&L.contains(a)&&!pinsPinta.forca)return;pinsPinta.forca=false;
 L.innerHTML=pinsD().map(pinHTML).join('');}
function pinNovo(o){var P=pinsD();o.id='p'+Date.now().toString(36);o.x=8+Math.random()*30;o.y=10+Math.random()*45;o.r=Math.round((Math.random()*8-4)*10)/10;o.c=PIN_COR[P.length%PIN_COR.length];
 P.push(o);grava();pinsPinta.forca=true;pinsPinta();
 var el2=document.querySelector('.cp-pin[data-pin="'+o.id+'"] [data-pin-txt],.cp-pin[data-pin="'+o.id+'"] [data-pin-add]');if(el2&&o.t!=='foto')el2.focus();}
function pinAcha(id){return pinsD().filter(function(x){return x.id===id;})[0];}
function pinsLiga(L,h){
 L.addEventListener('click',function(e){var pe=e.target.closest('.cp-pin');if(!pe)return;var p=pinAcha(pe.dataset.pin);if(!p)return;
  if(e.target.closest('[data-pin-del]')){if((p.txt||p.img||(p.itens||[]).length)&&!confirm('Tirar do mural?'))return;S.pins=pinsD().filter(function(x){return x!==p;});grava();pinsPinta.forca=true;pinsPinta();return;}
  var ck=e.target.closest('[data-pin-ck]');if(ck){var it=p.itens[+ck.dataset.pinCk];if(it){it.ok=!it.ok;grava();pinsPinta.forca=true;pinsPinta();}}});
 L.addEventListener('focusout',function(e){var t=e.target;if(!t.hasAttribute||!t.hasAttribute('data-pin-txt'))return;var p=pinAcha(t.closest('.cp-pin').dataset.pin);if(!p)return;
  var v=t.innerText.replace(/\n{3,}/g,'\n\n').trim().slice(0,400);if(v!==(p.txt||'')){p.txt=v;grava();}});
 L.addEventListener('keydown',function(e){var t=e.target;
  if(t.hasAttribute('data-pin-add')&&e.key==='Enter'){e.preventDefault();var v=t.value.trim();if(!v)return;var p=pinAcha(t.closest('.cp-pin').dataset.pin);if(!p)return;p.itens=p.itens||[];if(p.itens.length>=12)return;p.itens.push({t:v,ok:false});grava();t.value='';
   var L2=t.closest('.cp-pins');L2.innerHTML=pinsD().map(pinHTML).join('');var n=L2.querySelector('.cp-pin[data-pin="'+p.id+'"] [data-pin-add]');if(n)n.focus();}
  if(t.hasAttribute('data-pin-txt')&&e.key==='Escape')t.blur();});
 /* arrastar: segure a nota em qualquer ponto fora do texto em edição */
 L.addEventListener('pointerdown',function(e){var pe=e.target.closest('.cp-pin');if(!pe||e.button>0)return;
  if(e.target.closest('[data-pin-del],[data-pin-ck],[data-pin-add]'))return;
  var txt=e.target.closest('[data-pin-txt]');if(txt&&document.activeElement===txt)return;
  e.preventDefault();var r=h.getBoundingClientRect(),x0=e.clientX,y0=e.clientY,bx=pe.offsetLeft,by=pe.offsetTop,mov=false;
  pe.setPointerCapture(e.pointerId);
  function mv(ev){var dx=ev.clientX-x0,dy=ev.clientY-y0;if(!mov&&Math.abs(dx)+Math.abs(dy)<5)return;mov=true;pe.classList.add('arrasta');
   var x=Math.max(-2,Math.min(96,(bx+dx)/r.width*100)),y=Math.max(-2,Math.min(94,(by+dy)/r.height*100));pe.style.left=x+'%';pe.style.top=y+'%';}
  function up(){pe.removeEventListener('pointermove',mv);pe.removeEventListener('pointerup',up);pe.removeEventListener('pointercancel',up);pe.classList.remove('arrasta');
   var p=pinAcha(pe.dataset.pin);if(!p)return;
   if(mov){p.x=parseFloat(pe.style.left);p.y=parseFloat(pe.style.top);var P=pinsD();P.splice(P.indexOf(p),1);P.push(p);grava();pe.parentNode.appendChild(pe);}
   else if(txt){txt.focus();var sel=window.getSelection();if(sel){var rg=document.createRange();rg.selectNodeContents(txt);rg.collapse(false);sel.removeAllRanges();sel.addRange(rg);}}}
  pe.addEventListener('pointermove',mv);pe.addEventListener('pointerup',up);pe.addEventListener('pointercancel',up);});}
function latAc(){latMural();try{pinsPinta();}catch(e){console.error('mural:',e);}try{latReg();}catch(e){console.error('registro do dia:',e);}if(!LAT_LARGA.matches)return;var row=document.getElementById('ac-row'),box=document.getElementById('lat-ac');if(row&&box&&row.parentNode!==box)box.appendChild(row);
 var vit=document.querySelector('#vx-body .vx-grid > aside .v4-vit'),lv=document.getElementById('lat-vx');if(vit&&lv&&vit.parentNode!==lv){lv.innerHTML='';lv.appendChild(vit);}
 latNarrativo();}
/* coluna esquerda narrativa: cartão de nível com o medalhão e o resumo do Arsenal */
document.addEventListener('click',function(e){var b=e.target.closest('#lat-med [data-cr-med]');if(b){latMedToggle(b.dataset.crMed);latNarrativo();}});
function latNarrativo(){var g=document.getElementById('lat-gm');if(g){g.innerHTML=gmCard(false);try{acMedalhaPos();}catch(e){}}
 var a=document.getElementById('lat-ars-b');if(a)a.innerHTML=arsMini();
 var dr=document.getElementById('lat-dr-b');if(dr)dr.innerHTML='<div class="dr-mini"><b>'+drSaldo()+'</b><span>dracmas de ouro<br><small>10 por hora de foco ou estudo</small></span></div><button type="button" class="arsm-v" onclick="ferAbre(\'loja\')">abrir a loja do acampamento</button>';
 var cp=document.getElementById('lat-cp-b');if(cp)cp.innerHTML=cpHTML();
 var pc=document.getElementById('lat-postal-b');if(pc&&!pc.firstChild)pc.innerHTML=arPostalHTML();
 var md=document.getElementById('lat-med');if(md)md.innerHTML='<div class="lat-medh"><span class="k9">remédios de hoje</span><div class="cr-row">'+latMedHTML()+'</div></div>';
 try{drAplica();}catch(e){}}
function arsMini(){var prox=null,h='<div class="arsm-g">'+ARS_KIT.map(function(k){var T=arsTier(k),nx=k.t[T.i+1];
  if(nx){var fr=(nx[0]-T.v)/(nx[0]-k.t[T.i][0]);if(!prox||fr<prox.fr)prox={fr:fr,k:k,nx:nx,f:arsNum(nx[0]-T.v)+' '+k.med};}
  return '<div class="arsm t'+T.i+'" title="'+esc(k.slot+': '+k.t[T.i][1])+'"><span>'+ARS_IC[k.id]+'</span><i>'+k.t.map(function(t,j){return '<em class="'+(j<=T.i?'on':'')+'"></em>';}).join('')+'</i></div>';}).join('')+'</div>';
 if(prox)h+='<p class="arsm-p">Mais perto da forja: <b>'+esc(prox.nx[1])+'</b>. Faltam '+esc(prox.f)+'.</p>';
 return h+'<button type="button" class="arsm-v" onclick="window.ferAbre&&ferAbre(\'arsenal\')">abrir o Arsenal</button>';}

/* ---------- Banner acima da Grade, minimizável ----------
   O cabeçalho da Casa Grande nasce dentro do #vx a cada redesenho; aqui ele muda para #hero-box, acima da Grade semanal.
   As regras de estilo do #vx são copiadas para #hero-box, com a mesma força. */
function bnBox(){var b=document.getElementById('hero-box');if(b)return b;
 b=document.createElement('section');b.id='hero-box';b.dataset.area='op';b.dataset.vxHidden='false';
 b.innerHTML='<button type="button" class="bn-min" id="bn-min" aria-expanded="true"><span class="bn-t">Uma flecha de cada vez.</span><span class="bn-a">minimizar banner</span></button><div class="bn-slot"></div>';
 b.querySelector('#bn-min').addEventListener('click',function(){bnMin(!document.body.classList.contains('bn-mini'));});
 bnCss();try{if(localStorage.getItem('astro_bn_min')==='1')document.body.classList.add('bn-mini');}catch(e){}bnRotulo();return b;}
function bnMin(on){document.body.classList.toggle('bn-mini',on);try{localStorage.setItem('astro_bn_min',on?'1':'0');}catch(e){}bnRotulo();}
function bnRotulo(){var b=document.getElementById('bn-min');if(!b)return;var on=document.body.classList.contains('bn-mini');b.setAttribute('aria-expanded',!on);
 b.querySelector('.bn-a').textContent=on?'abrir banner':'minimizar banner';}
function bnCss(){if(document.getElementById('bn-css'))return;var out=[];
 function troca(sel){return sel.split(',').filter(function(x){return x.indexOf('#vx ')>=0;}).map(function(x){return x.replace(/#vx /g,'#hero-box ');}).join(',');}
 function varre(rs,dest){Array.prototype.forEach.call(rs||[],function(r){
  if(r.selectorText&&r.selectorText.indexOf('#vx ')>=0&&r.selectorText.indexOf('vx-tabs')<0){var t=troca(r.selectorText);if(t)dest.push(t+'{'+r.style.cssText+'}');}
  else if(r.media&&r.cssRules){var inn=[];varre(r.cssRules,inn);if(inn.length)dest.push('@media '+r.media.mediaText+'{'+inn.join('\n')+'}');}});}
 Array.prototype.forEach.call(document.styleSheets,function(sh){var rs;try{rs=sh.cssRules;}catch(e){return;}varre(rs,out);});
 var st=document.createElement('style');st.id='bn-css';st.textContent=out.join('\n');document.head.appendChild(st);}
function bnMove(){var hero=document.querySelector('#vx .vx-hero'),b=bnBox(),slot=b&&b.querySelector('.bn-slot');if(!slot)return;
 var solto=slot.querySelector(':scope>.cp-reg');if(solto)b.appendChild(solto);if(!hero)return;
 var reg=hero.nextElementSibling&&hero.nextElementSibling.classList.contains('cp-reg')?hero.nextElementSibling:null;
 slot.innerHTML='';slot.appendChild(hero);if(reg)b.appendChild(reg);
 var t=hero.querySelector('h2');if(t)b.querySelector('.bn-t').textContent=t.textContent.trim();}
(function(){var r0=vxRender;vxRender=function(){var b=document.getElementById('hero-box');if(b){var v=b.querySelector('.vx-hero'),g=b.querySelector('.cp-reg');
  if(v){var ri=v.querySelector('#rail-in'),q=document.getElementById('lat-quadro');if(ri&&q)q.appendChild(ri);v.remove();}if(g)g.remove();}
 r0();try{bnMove();latGradeTopo();}catch(e){console.error('banner:',e);}};})();
(function(){var r0=vxRender;vxRender=function(){var ri0=document.getElementById('rail-in'),q0=document.getElementById('lat-quadro');if(ri0&&q0&&ri0.closest('.cp-mural'))q0.appendChild(ri0);var velho=document.querySelector('#lat-ac #ac-row');if(velho)velho.remove();var lv=document.getElementById('lat-vx');if(lv)lv.innerHTML='';r0();try{latGradeTopo();latPosiciona();latAc();}catch(e){console.error('laterais:',e);}};})();
(function(){var l0=vxLayout;vxLayout=function(){l0();try{latGradeTopo();latPosiciona();}catch(e){console.error('laterais:',e);}};})();
(function(){var p0=pintaRail;pintaRail=function(){p0();try{latPosiciona();}catch(e){}};})();
setTimeout(function(){try{latGradeTopo();latPosiciona();latAc();latMural();bnMove();latGradeTopo();}catch(e){console.error('laterais:',e);}},0);
(function(){try{var r=JSON.parse(localStorage.getItem(KEY)||'null');if(!r)return;var b=normaliza(r);['pins','apps','ws'].forEach(function(k){if(S[k]===undefined||(k==='pins'&&!S.pins.length))S[k]=b[k];});}catch(e){}})();
(LAT_LARGA.addEventListener?LAT_LARGA.addEventListener('change',function(){latPosiciona();try{vxRender();}catch(e){}}):0);
/* ---------- reorganização da coluna esquerda ----------
   Profecia do ciclo vira página da Ficha; Postal do dia sai; Em andamento entra no Quadro de avisos;
   Arsenal, Dracmas e Prêmios formam o Tesouro do chalé, a seção final da página. */
function reorgProf(){var p=document.getElementById('lat-prof'),c=document.querySelector('#lv [data-folha="profecia"] .lv-corpo');if(!p||!c)return;
 p.classList.remove('cg-dob');p.classList.add('lv-prof');if(p.parentNode!==c)c.appendChild(p);}
lvMonta=(function(m0){return function(){var x=m0.apply(this,arguments);try{reorgProf();}catch(e){}return x;};})(lvMonta);
function reorgOrb(){var o=document.getElementById('lat-orb'),cb=document.getElementById('cerbox');if(!o||!cb)return;
 var ri=document.getElementById('rail-in');o.classList.add('qa-orb');if(ri&&ri.parentNode===cb){if(ri.nextElementSibling!==o)ri.insertAdjacentElement('afterend',o);}else if(o.parentNode!==cb)cb.appendChild(o);}
function reorgTesouro(){var wr=document.querySelector('.wrap');if(!wr)return;var t=document.getElementById('tesouro');
 if(!t){t=document.createElement('section');t.id='tesouro';t.className='tesouro';t.dataset.area='op';
  t.innerHTML='<header class="ts-cab"><span class="ts-k">o tesouro do chalé 7</span><h2>Arsenal, dracmas e prêmios</h2><p>O que o treino rende: a forja do Hékatos, a moeda do acampamento, e o que ela compra.</p></header>'+
   '<div class="ts-g"><div class="ts-col" id="ts-a"></div><div class="ts-col" id="ts-b"></div></div>';}
 t.dataset.vxHidden='false';var tbx=document.getElementById('tp-real');if(tbx){if(t.parentNode!==tbx)tbx.appendChild(t);}else if(wr.lastElementChild!==t)wr.appendChild(t);
 var a=t.querySelector('#ts-a'),b=t.querySelector('#ts-b');
 var poe=function(col,ids){ids.forEach(function(id){var n=document.getElementById(id);if(!n)return;n.hidden=false;n.dataset.vxHidden='false';if(n.parentNode!==col)col.appendChild(n);});
  ids.forEach(function(id,i){var n=document.getElementById(id);if(n&&i&&n.previousElementSibling!==document.getElementById(ids[i-1]))col.appendChild(n);});};
 poe(a,['lat-ars','lat-dr']);poe(b,['c-h-rec']);
 Array.prototype.forEach.call(wr.querySelectorAll(':scope > .area-cab'),function(ac){var n=ac.nextElementSibling,vis=false;while(n&&!n.classList.contains('area-cab')&&n.id!=='tesouro'){if(n.offsetHeight>2){vis=true;break;}n=n.nextElementSibling;}ac.classList.toggle('ts-oculta',!vis);});}
/* Treino na Arena vira um cartão na coluna esquerda, logo abaixo do nível */
function reorgArena(){var vx=document.getElementById('vx'),e=document.getElementById('lat-e');if(!vx||!e)return;var c=document.getElementById('lat-arena');
 if(!c){var t=document.createElement('div');t.innerHTML=latCard('lat-arena','arco','linha de tiro · treinos e missões','Ação do dia','<div id="lat-arena-b"></div>');c=t.firstChild;}
 var gm=document.getElementById('lat-gm');if(gm&&gm.parentNode===e){if(gm.nextElementSibling!==c)e.insertBefore(c,gm.nextSibling);}else if(c.parentNode!==e)e.insertBefore(c,e.firstChild);
 var bx=c.querySelector('#lat-arena-b');if(vx.parentNode!==bx){vx.dataset.vxHidden='false';bx.appendChild(vx);}}
/* os ícones do painel direito numa pílula só: Bolsa, Bunker 9, Laptop e Enfermaria */
function pdPilula(){var n=document.getElementById('tt-indice');if(!n)return;var p=n.querySelector('.pd-pilula');if(!p&&document.querySelector('.pd-pilula'))return;
 var bs=[n.querySelector('[data-tt="fin"]'),n.querySelector('[data-ic="b9"]'),n.querySelector('[data-ic="laptop"]'),n.querySelector('[data-ic="enf"]')].filter(Boolean);if(!bs.length)return;
 if(!p){p=document.createElement('div');p.className='pd-pilula';p.setAttribute('role','group');p.setAttribute('aria-label','Painéis laterais');n.insertBefore(p,bs[0]);}
 bs.forEach(function(b,i){if(p.children[i]!==b)p.insertBefore(b,p.children[i]||null);});
 var tt={fin:'Bolsa de Dracmas',b9:'Bunker 9',laptop:'Laptop · Eumátheia',enf:'Enfermaria'};bs.forEach(function(b){var k=b.dataset.ic||b.dataset.tt;if(tt[k]){b.title=tt[k];b.setAttribute('aria-label',tt[k]);}});}
(function(){var i0=ttIcones;ttIcones=function(){i0();try{pdPilula();}catch(e){}};})();
/* banner inicial arrumado: título e data, identidade com ações, base com notas e colar */
function bnArruma(){var h=document.querySelector('#hero-box .vx-hero');if(!h)return;h.classList.add('bn2');
 var h2=h.querySelector(':scope > div > h2');if(!h2)return;var tit=h2.parentNode;tit.classList.add('bn-tit');
 var k=tit.querySelector('.vx-k');if(k&&!k.dataset.bn){var m=(k.textContent.match(/(\d{4})-(\d{2})-(\d{2})/)||[]);
  if(m.length){var d=new Date(+m[1],+m[2]-1,+m[3]);k.textContent='ciclo de '+d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});}k.dataset.bn='1';}
 var nv=h.querySelector('#nv-chip');if(nv&&k&&nv.previousElementSibling!==k)k.insertAdjacentElement('afterend',nv);
 var id=h.querySelector(':scope > .bn-id');if(!id){id=document.createElement('div');id.className='bn-id';}
 if(tit.nextElementSibling!==id)tit.insertAdjacentElement('afterend',id);
 ['.cp-guia','.cp-pinbar'].forEach(function(q){var n=h.querySelector(':scope > '+q)||id.querySelector(':scope > '+q);if(n&&n.parentNode!==id)id.appendChild(n);});
 var base=h.querySelector(':scope > .bn-base');if(!base){base=document.createElement('div');base.className='bn-base';h.appendChild(base);}
 ['.ac-cracha','.cp-dracmas'].forEach(function(q){var n=h.querySelector(':scope > '+q)||id.querySelector(':scope > '+q);if(n&&n.parentNode!==base)base.appendChild(n);});
 var cr=base.querySelector('.ac-cracha');if(cr&&base.firstElementChild!==cr)base.insertBefore(cr,base.firstChild);
 var fi=h.querySelector('#vx-diario');if(fi&&base.firstElementChild!==fi){fi.classList.add('bn-ficha');base.insertBefore(fi,base.firstChild);}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{bnArruma();}catch(e){}return x;};})();
setTimeout(function(){try{bnArruma();}catch(e){}},80);setTimeout(function(){try{bnArruma();}catch(e){}},1000);
/* Quadro de visão no banner (os três temas): uma foto para visualizar e cartões com as afirmações (as mesmas da Declaração de rota) */
var BV_I=0;
function bvEsc(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function bvFotos(){if(S.visFoto&&!Array.isArray(S.visFotos)){S.visFotos=[S.visFoto];delete S.visFoto;}if(!Array.isArray(S.visFotos))S.visFotos=[];return S.visFotos;}
/* fotos de exemplo por tema: aparecem só enquanto o espaço está vazio; clicar troca pela sua */
var WM='https://commons.wikimedia.org/wiki/Special:FilePath/';
window.bvFalha=function(im){var b=im.parentNode;if(b)b.innerHTML='<span class="bv-vazio"><b>+</b>sua foto</span>';};
function bvPadrao(){return EG_ON?[[WM+'Felucca_R08.jpg?width=600','feluca no Nilo ao pôr do sol'],[WM+'Philae_Temple_R01.jpg?width=600','quiosque de Trajano, Philae'],[WM+'Hypostyle_karnak_colonne.jpg?width=600','coluna pintada de Karnak']]
 :TV_ON?[['img/acampamento/vh-fotos/salao-ouro.webp','o salão dourado'],['img/acampamento/vh-fotos/drakkar.webp','proas do drakkar'],['img/acampamento/vh-fotos/torre.webp','a torre acima das nuvens']]
 :[['img/acampamento/arquearia.jpg','a linha de tiro'],['img/acampamento/fogueira-noite.webp','a fogueira da noite'],['img/acampamento/templos.jpg','os templos do bosque']];}
function bvHTML(){var ig=S.ign||{},af=ig.af||[],vi=ig.vi||[],n=af.length,F=bvFotos(),P=bvPadrao();if(BV_I>=n||BV_I<0)BV_I=0;
 var fs='';for(var q=0;q<3;q++){var u=F[q],pd=!u&&P[q],leg=vi[q]?bvEsc(vi[q]):(pd?pd[1]:(q?'':'o que você quer ver acontecer'));
  fs+='<figure class="bv-foto bv-f'+q+(pd?' bv-pad':'')+'"><button type="button" class="bv-fbt" data-bv="foto" data-bq="'+q+'" title="'+(u?'trocar esta foto':'pôr a sua foto aqui')+'">'+(u?'<img src="'+u+'" alt="visualização '+(q+1)+'">':pd?'<img src="'+pd[0]+'" alt="'+pd[1]+'" loading="lazy" referrerpolicy="no-referrer" onerror="bvFalha(this)"><span class="bv-troca">+ sua foto</span>':'<span class="bv-vazio"><b>+</b>foto '+(q+1)+'</span>')+'</button><figcaption>'+leg+'</figcaption>'+(u?'<button type="button" class="bv-x" data-bv="tira" data-bq="'+q+'" title="tirar esta foto" aria-label="tirar a foto '+(q+1)+'">×</button>':'')+'</figure>';}
 var a=n?bvEsc(af[BV_I]):'Escreva a primeira afirmação: curta, no presente, em primeira pessoa.';
 return '<div class="bv-fotos">'+fs+'</div>'+
  '<div class="bv-af'+(n?'':' bv-af-vazio')+'"><span class="bv-k">afirmação'+(n?' · '+(BV_I+1)+' de '+n:'')+'</span><p class="bv-txt">'+a+'</p>'+
  '<div class="bv-nav">'+(n>1?'<button type="button" data-bv="ant" aria-label="afirmação anterior">‹</button><button type="button" data-bv="prox" aria-label="próxima afirmação">›</button>':'')+'<button type="button" data-bv="nova" class="bv-mais">+ afirmação</button></div>'+(n?'<div class="bv-acoes"><button type="button" data-bv="edita" class="bv-ed" title="editar esta afirmação" aria-label="editar esta afirmação"><svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg></button><button type="button" data-bv="apaga" class="bv-del" title="excluir esta afirmação" aria-label="excluir esta afirmação"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>':'')+
  '<form class="bv-form" hidden><input maxlength="160" placeholder="eu…" aria-label="nova afirmação"><button type="submit">ok</button></form></div>'+
  '<input type="file" accept="image/*" class="bv-arq" hidden>';}
function bvFoto(f,w,q){if(!f)return;var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var M=600,k=Math.min(1,M/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);
 try{var F=bvFotos();F[q]=c.toDataURL('image/jpeg',.78);for(var z=0;z<3;z++)if(F[z]===undefined)F[z]=null;grava();}catch(e){}w._h=null;bvPinta();};im.src=r.result;};r.readAsDataURL(f);}
function bvPinta(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var w=h.querySelector(':scope > .bn-visao');
 if(!w){w=document.createElement('div');w.className='bn-visao';
  w.addEventListener('click',function(e){var b=e.target.closest('[data-bv]');if(!b)return;var k=b.dataset.bv,n=((S.ign||{}).af||[]).length;
   if(k==='foto'){var ar=w.querySelector('.bv-arq');ar.dataset.q=b.dataset.bq||'0';ar.value='';ar.click();return;}
   if(k==='tira'){var F=bvFotos();F[+(b.dataset.bq||0)]=null;try{grava();}catch(z){}w._h=null;bvPinta();return;}
   if(k==='ant'){BV_I=(BV_I-1+n)%n;w._h=null;bvPinta();return;}
   if(k==='prox'){BV_I=(BV_I+1)%n;w._h=null;bvPinta();return;}
   if(k==='nova'){var f=w.querySelector('.bv-form');delete f.dataset.ed;f.hidden=false;f.querySelector('input').value='';f.querySelector('input').focus();}
   if(k==='edita'){var af0=((S.ign||{}).af||[]);if(!af0.length)return;var f2=w.querySelector('.bv-form'),i2=f2.querySelector('input');f2.dataset.ed=String(BV_I);f2.hidden=false;i2.value=af0[BV_I]||'';i2.focus();i2.select();return;}
   if(k==='apaga'){if(!b.classList.contains('arm')){b.classList.add('arm');b.title='clique de novo para excluir';clearTimeout(b._t);b._t=setTimeout(function(){b.classList.remove('arm');b.title='excluir esta afirmação';},3500);return;}
    var af1=((S.ign||{}).af||[]);if(!af1.length)return;af1.splice(BV_I,1);if(BV_I>=af1.length)BV_I=Math.max(0,af1.length-1);try{grava();}catch(z){}try{pinta();}catch(z){}w._h=null;bvPinta();return;}});
  w.addEventListener('change',function(e){if(e.target.classList.contains('bv-arq'))bvFoto(e.target.files&&e.target.files[0],w,+(e.target.dataset.q||0));});
  w.addEventListener('submit',function(e){e.preventDefault();var i=e.target.querySelector('input'),v=(i.value||'').trim();if(!v)return;S.ign=S.ign||{};S.ign.af=S.ign.af||[];var fm=e.target,ed=fm.dataset&&fm.dataset.ed!=null?+fm.dataset.ed:-1;if(ed>=0&&ed<S.ign.af.length){S.ign.af[ed]=v.slice(0,160);BV_I=ed;delete fm.dataset.ed;}else{S.ign.af.push(v.slice(0,160));BV_I=S.ign.af.length-1;}fm.hidden=true;i.value='';try{grava();}catch(z){}try{pinta();}catch(z){}w._h=null;document.activeElement&&document.activeElement.blur();bvPinta();});
  w.addEventListener('keydown',function(e){if(e.key==='Escape'){var f=w.querySelector('.bv-form');if(f)f.hidden=true;}});}
 var base=h.querySelector(':scope > .bn-base');if(base){if(w.nextElementSibling!==base)h.insertBefore(w,base);}else if(w.parentNode!==h)h.appendChild(w);
 if(w.contains(document.activeElement)&&document.activeElement.tagName==='INPUT')return;var x=bvHTML();if(w._h!==x){w.innerHTML=x;w._h=x;}}
setInterval(function(){try{bvPinta();}catch(e){}},1500);setTimeout(function(){try{bvPinta();}catch(e){}},1100);
setInterval(function(){try{var n=((S.ign||{}).af||[]).length,w=document.querySelector('#hero-box .bn-visao');if(n>1&&w&&!w.matches(':hover')&&!w.contains(document.activeElement)){BV_I=(BV_I+1)%n;bvPinta();}}catch(e){}},16000);
(function(){var st=document.createElement('style');st.id='bn-visao-css';st.textContent=[
 '#hero-box#hero-box .bn-visao button{min-height:0!important;height:auto!important;width:auto;margin:0!important;box-shadow:none!important;text-transform:none!important;letter-spacing:0!important}',
 '#hero-box#hero-box .bn-visao .bv-fbt{width:100%!important;padding:0!important;border:0!important;border-radius:0!important;background:#efe3c6;display:block!important}',
 '#hero-box#hero-box .bn-visao .bv-nav button,#hero-box#hero-box .bn-visao .bv-form button{padding:3px 11px!important;border-radius:999px!important;font:600 12px system-ui,sans-serif!important;line-height:1.3!important}',
 '#hero-box#hero-box .bn-visao .bv-x{width:22px!important;height:22px!important;padding:0!important;border-radius:50%!important;display:grid!important;place-items:center!important}',
 '#hero-box .bn-visao{position:relative;z-index:2;display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;align-items:center;max-width:640px;margin:14px 0 6px}',
 '#hero-box .bv-fotos{display:flex;align-items:center;padding:6px 4px 2px 2px}',
 '#hero-box .bv-fotos .bv-foto{width:104px;flex:none}',
 '#hero-box .bv-fotos .bv-foto+.bv-foto{margin-left:-26px}',
 '#hero-box .bv-f0{transform:rotate(-5deg)!important;z-index:1}#hero-box .bv-f1{transform:rotate(1.5deg) translateY(-6px)!important;z-index:2}#hero-box .bv-f2{transform:rotate(6deg)!important;z-index:1}',
 '#hero-box .bv-fotos .bv-foto:hover{transform:rotate(0) translateY(-8px) scale(1.12)!important;z-index:5}',
 '#hero-box .bv-foto{position:relative;margin:0;padding:6px 6px 22px;background:#fffdf7;box-shadow:2px 3px 0 #d9c7a3,3px 7px 16px rgba(60,40,20,.28);transform:rotate(-2.2deg);transition:transform .2s}',
 
 '#hero-box .bv-fbt{display:block;width:100%;aspect-ratio:4/3;padding:0;margin:0;border:0;background:#efe3c6;cursor:pointer;overflow:hidden}',
 '#hero-box .bv-fbt img{display:block;width:100%;height:100%;object-fit:cover}',
 '#hero-box .bv-vazio{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:2px;font:600 9px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#8a6f55}',
 '#hero-box .bv-vazio b{font:400 22px/1 Georgia,serif}',
 '#hero-box .bv-foto figcaption{position:absolute;left:6px;right:6px;bottom:4px;font:italic 9.5px Georgia,serif;color:#5a3f2c;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#hero-box .bv-x{position:absolute;top:-9px;right:-9px;width:22px;height:22px;border-radius:50%;border:1px solid #5a3f2c;background:#fbf3df;color:#5a3f2c;font:700 13px/1 system-ui,sans-serif;cursor:pointer}',
 '#hero-box .bv-af{position:relative;display:flex;flex-direction:column;gap:6px;padding:12px 18px 10px;border:1.5px solid #5a3f2c;border-radius:10px;background:linear-gradient(180deg,#fbf3df,#f1e4c3);box-shadow:0 0 0 3px #fbf3df,0 0 0 4px #c9a45a,0 8px 16px -8px rgba(60,40,20,.4)}',
 '#hero-box .bv-k{font:700 9px var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase;color:#9a6b3a}',
 '#hero-box .bv-txt{margin:0;font:italic 400 19px/1.35 Georgia,serif;color:#2a2418}',
 '#hero-box .bv-af:not(.bv-af-vazio) .bv-txt::before{content:"\\201C"}#hero-box .bv-af:not(.bv-af-vazio) .bv-txt::after{content:"\\201D"}',
 '#hero-box .bv-af-vazio .bv-txt{font-size:14px;color:#8a6f55}',
 '#hero-box .bv-nav{display:flex;gap:6px;margin-top:auto}',
 '#hero-box .bv-nav button,#hero-box .bv-form button{border:1px solid #c9b28a;border-radius:999px;background:#fbf3df;padding:3px 11px;font:600 12px system-ui,sans-serif;color:#5a3f2c;cursor:pointer}',
 '#hero-box .bv-nav button:hover{background:#5a3f2c;color:#fbf3df}',
 '#hero-box .bv-mais{margin-left:auto}',
 '#hero-box .bv-form{display:flex;gap:6px}#hero-box .bv-form[hidden]{display:none}',
 '#hero-box .bv-form input{flex:1;min-width:0;border:1px solid #c9b28a;border-radius:8px;background:#fffdf7;padding:5px 9px;font:14px Georgia,serif}',
 /* refino dos cartões do banner: postal e folheto com sombra e leve inclinação, sobem ao passar o cursor */
 '#hero-box .cp-postal,#hero-box .vx-hero.bn2 .bn-id .cp-guia{transition:transform .2s,box-shadow .2s}',
 '#hero-box .cp-postal:hover{transform:rotate(0) translateY(-3px)!important}',
 '#hero-box .vx-hero.bn2 .bn-id .cp-guia:hover{transform:rotate(0) translateY(-2px)!important}',
 '@media(max-width:900px){#hero-box .bn-visao{grid-template-columns:1fr;gap:12px}#hero-box .bv-txt{font-size:16px}}'
].join('\n');document.head.appendChild(st);})();

/* Registro do dia vira a terceira gaveta da Grade semanal (o dia, a semana, o mês) */
function diaGaveta(){var tb=document.querySelector('.wrap > div.tb'),rd=document.querySelector('.regdia');if(!tb||!rd)return;var g=document.getElementById('dia-gav');
 if(!g){g=document.createElement('div');g.id='dia-gav';g.className='mf-gav dia-gav';
  g.innerHTML='<button type="button" class="mf-alca mf-alca-dia" data-gavd aria-expanded="false"><span>o dia · registro</span></button>'+
   '<aside class="mf-g mf-g-dia" aria-label="Registro do dia"><header><span class="k9">registro do dia</span><b>Hoje</b><button type="button" class="comp-x" data-gavd aria-label="fechar">×</button></header><div class="dia-slot"></div></aside>';
  g.addEventListener('click',function(e){if(!e.target.closest('[data-gavd]'))return;var on=!tb.classList.contains('gav-dia');tb.classList.remove('gav-mes','gav-sem','gav-dia');if(on)tb.classList.add('gav-dia');
   g.querySelector('.mf-alca-dia').setAttribute('aria-expanded',String(on));if(on){var i=g.querySelector('#rd-in');if(i)setTimeout(function(){try{i.focus({preventScroll:true});}catch(z){}},320);}});}
 if(g.parentNode!==tb)tb.appendChild(g);var sl=g.querySelector('.dia-slot');if(rd.parentNode!==sl)sl.appendChild(rd);
 var b=g.querySelector('header b');if(b){var t=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'short'});if(b._t!==t||b.textContent==='' ){b.textContent=t;b._t=t;}}}
(function(){var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);try{diaGaveta();}catch(e){}return x;};})();
setTimeout(function(){try{diaGaveta();}catch(e){}},120);
/* Quadro de avisos reorganizado por frequência de uso:
   caixa de entrada e em andamento abertos; retomadas, notas e diário em seções que abrem e fecham */
var QA_SEC=[['qa-d-pc','Biblioteca de Atena','registros diversos · onde as coisas ficam quando você sai','ret'],['qa-d-nt','Pergaminhos','notas e rascunhos · buscar, guardar e etiquetar','nota'],['qa-d-dj','Crônicas do chalé','diário · uma entrada por ciclo, a semana em quadrinhos','diario']];
function qaOrganiza(){var cb=document.getElementById('cerbox');if(!cb)return;
 var sb=cb.querySelector('.sb'),pcs=document.querySelector('.pcs');
 if(sb){if(sb.children[0]&&!sb.children[0].id)sb.children[0].id='qa-nt-in';if(sb.children[1]&&!sb.children[1].id)sb.children[1].id='qa-dj-in';}
 var nos={'qa-d-pc':pcs,'qa-d-nt':document.getElementById('qa-nt-in'),'qa-d-dj':document.getElementById('qa-dj-in')};
 var aberto={};try{aberto=JSON.parse(localStorage.getItem('astro_qa_sec')||'{}')||{};}catch(e){}
 var ref=document.getElementById('lat-orb');if(!ref||ref.parentNode!==cb)ref=document.getElementById('rail-in');
 QA_SEC.forEach(function(q){var no=nos[q[0]];if(!no)return;var d=document.getElementById(q[0]);
  if(!d){d=document.createElement('details');d.id=q[0];d.className='qa-sec';if(aberto[q[0]])d.open=true;
   d.innerHTML='<summary><span class="qa-sk">'+q[2]+'</span><b>'+q[1]+'</b></summary><div class="qa-sb"></div>';
   d.addEventListener('toggle',function(){var a={};try{a=JSON.parse(localStorage.getItem('astro_qa_sec')||'{}')||{};}catch(e){}a[q[0]]=d.open;try{localStorage.setItem('astro_qa_sec',JSON.stringify(a));}catch(e){}});}
  var bx=d.querySelector('.qa-sb');if(no.parentNode!==bx)bx.appendChild(no);
  if(ref&&ref.parentNode===cb){if(ref.nextElementSibling!==d)ref.insertAdjacentElement('afterend',d);}else if(d.parentNode!==cb)cb.appendChild(d);ref=d;});
 if(sb&&!sb.children.length)sb.hidden=true;
 var h=document.getElementById('h-cup'),sp=h&&h.querySelector('span');if(sp&&sp.textContent.indexOf('Moiras')<0)sp.textContent='// Hermes, as Moiras, Atena e Apolo guardam o que você deixa aqui';}
/* Recreações: painel próprio depois de Missões, com Atividades do acampamento e Menu de recarga */
function reorgRecreio(){var wr=document.querySelector('.wrap'),tp=document.getElementById('tm-painel');if(!wr||!tp)return;var r=document.getElementById('recreio');
 if(!r){r=document.createElement('section');r.id='recreio';r.className='neo-moldura rc-neo';r.dataset.area='op';
  r.innerHTML='<header class="tm-cab"><b>Recreações</b><span class="k9">atividades em treino e menu de recarga</span></header><div class="rc-g"><div class="rc-a"></div><div class="rc-b"></div></div>';}
 r.dataset.vxHidden='false';if(tp.nextElementSibling!==r)tp.insertAdjacentElement('afterend',r);
 var a=r.querySelector('.rc-a'),b=r.querySelector('.rc-b');
 [['lat-apt',a],['lat-rec',b]].forEach(function(x){var n=document.getElementById(x[0]);if(!n)return;n.hidden=false;n.dataset.vxHidden='false';n.classList.remove('cg-dob','fer-rec');if(n.parentNode!==x[1])x[1].appendChild(n);});}
function reorg(){try{var tp=document.getElementById('tm-painel');if(tp)tp.classList.add('neo-moldura','tm-neo');}catch(e){}try{reorgProf();}catch(e){}try{reorgArena();}catch(e){}try{qaOrganiza();}catch(e){}try{pdPilula();}catch(e){}try{reorgOrb();}catch(e){}try{reorgTesouro();}catch(e){}try{reorgRecreio();}catch(e){}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);reorg();return x;};var p0=pinta;pinta=function(){var x=p0.apply(this,arguments);reorg();return x;};})();
setTimeout(reorg,50);setTimeout(reorg,900);
/* ---------- o templo em níveis: um destaque por andar e o fio de ouro que desce com a rolagem ---------- */
var TEMPLO=[['frontao','Frontão','#hero-box'],['entab','Entablamento','#h-sem'],['colun','Colunata','#tm-painel'],['atrio','Átrio','#recreio'],['tesouro','Tesouro','#tesouro']];
function temploMarca(){var map={'#hero-box':'frontao','#h-sem':'entab','.wrap > div.tb':'entab','#h-rast':'entab','.wrap > div.rt':'entab','#tm-painel':'colun','#recreio':'atrio','#tesouro':'tesouro','#lat-arena':'colun'};
 Object.keys(map).forEach(function(q){var n=document.querySelector(q);if(n&&n.dataset.nivel!==map[q])n.dataset.nivel=map[q];});
 var f=document.getElementById('templo-fio');if(!f){f=document.createElement('div');f.id='templo-fio';f.setAttribute('aria-hidden','true');f.innerHTML='<i></i><b></b>';document.body.appendChild(f);}
 temploFio();}
function temploFio(){var f=document.getElementById('templo-fio'),wr=document.querySelector('.wrap');if(!f||!wr)return;var r=wr.getBoundingClientRect();var c0=wr.firstElementChild,cl=r.left;Array.prototype.some.call(wr.children,function(n){var b=n.getBoundingClientRect();if(b.width>200){cl=b.left;return true;}return false;});f.style.left=Math.max(0,Math.round((r.left+cl)/2)-6)+'px';
 var meio=window.innerHeight*0.45,atual=TEMPLO[0];TEMPLO.forEach(function(t){var n=document.querySelector(t[2]);if(n&&n.offsetParent!==null&&n.getBoundingClientRect().top<meio)atual=t;});
 if(f.dataset.nivel!==atual[0]){f.dataset.nivel=atual[0];f.querySelector('b').textContent=atual[1];}}
window.addEventListener('scroll',function(){temploFio();},{passive:true,capture:true});window.addEventListener('resize',temploFio);
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{temploMarca();}catch(e){}return x;};})();
setTimeout(function(){try{temploMarca();}catch(e){}},300);setTimeout(function(){try{temploMarca();}catch(e){}},1500);
/* ---------- imagens novas: lâminas do Arsenal, lira no frontão, emblema do acampamento, pedras das runas ---------- */
function arsLaminaImg(cls){try{var k=ARS_KIT.filter(function(x){return x.id==='lamina';})[0],i=arsTier(k).i;return '<img class="'+cls+'" src="img/acampamento/lamina'+i+'.webp" alt="'+esc(k.t[i][1])+'" loading="lazy">';}catch(e){return '';}}
arsHTML=(function(a0){return function(){var h=a0.apply(this,arguments);try{var im=arsLaminaImg('ars-limg');if(im)h=h.split('<div class="ars-ic">'+ARS_IC.lamina+'</div>').join('<div class="ars-ic ars-ic-img">'+im+'</div>');}catch(e){}return h;};})(arsHTML);
arsMini=(function(a0){return function(){var h=a0.apply(this,arguments);try{var im=arsLaminaImg('ars-mimg');if(im)h=h.split(ARS_IC.lamina).join(im);}catch(e){}return h;};})(arsMini);
function frontaoLira(){var f=document.querySelector('#hero-box .neo-frontao');if(!f||f.querySelector('.fr-lira'))return;var i=document.createElement('img');i.className='fr-lira';i.src='img/acampamento/lira.webp';i.alt='Lira de Apolo · chalé 7';f.appendChild(i);f.classList.add('com-lira');}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{frontaoLira();}catch(e){}return x;};})();
setTimeout(function(){try{frontaoLira();var a=document.getElementById('lat-ars-b');if(a)a.innerHTML=arsMini();}catch(e){}},400);
/* Captura da bandeira volta à vista: cartão próprio na coluna esquerda, com a bandeira do acampamento */
function bandCard(){var e=document.getElementById('lat-e');if(!e||typeof acBandeiraHTML!=='function')return;var c=document.getElementById('lat-band');
 if(!c){var t=document.createElement('div');t.innerHTML=latCard('lat-band','alvo','desafio da semana · +20 XP','Captura da bandeira','<div id="lat-band-b"></div>');c=t.firstChild;
  c.addEventListener('change',function(ev){var x=ev.target;
   if(x.dataset.acMeta){S.bandeira=S.bandeira||{};var b=S.bandeira[x.dataset.acMeta]=S.bandeira[x.dataset.acMeta]||{};b.meta=x.value.trim().slice(0,90);if(!b.meta)b.ok=false;grava();bandPinta(true);try{vxRender();}catch(z){}return;}
   if(x.dataset.acOk){var b2=(S.bandeira||{})[x.dataset.acOk];if(!b2)return;b2.ok=x.checked;b2.quando=x.checked?hoje():null;grava();
    if(x.checked){try{anota('Bandeira da semana capturada: '+esc(b2.meta)+'.',0,false);}catch(z){}try{acLouros('Bandeira capturada','+20 XP');}catch(z){}}bandPinta(true);try{vxRender();}catch(z){}}});
  c.addEventListener('keydown',function(ev){if(ev.key==='Enter'&&ev.target.dataset.acMeta){ev.preventDefault();ev.target.blur();}});}
 var ar=document.getElementById('lat-arena'),ref=ar&&ar.parentNode===e?ar:document.getElementById('lat-gm');if(ref&&ref.parentNode===e){if(ref.nextElementSibling!==c)e.insertBefore(c,ref.nextSibling);}else if(c.parentNode!==e)e.appendChild(c);
 bandPinta(false);}
function bandPinta(forca){var b=document.getElementById('lat-band-b');if(!b)return;var a=document.activeElement;if(!forca&&a&&b.contains(a))return;
 var h='<div class="band-g"><div class="band-mastro"><img src="img/acampamento/bandeira.webp" alt="Bandeira do acampamento"></div><div class="band-x">'+acBandeiraHTML()+'</div></div>';
 if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}var card=document.getElementById('lat-band');if(card)card.classList.toggle('band-ok',!!b.querySelector('.ac-band.ok'));}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{bandCard();}catch(e){}return x;};})();
setTimeout(function(){try{bandCard();}catch(e){}},500);
/* ---------- mais imagens e ícones nos painéis; Guia do Campista como folheto ---------- */
var QA_IC_VELHO={'rail-in':'<path d="M4 13h4l2 3h4l2-3h4"/><path d="M5 13l2-7h10l2 7v6H5z"/>','qa-d-pc':'<rect x="4" y="4" width="16" height="5" rx="1"/><rect x="4" y="10" width="16" height="5" rx="1"/><rect x="4" y="16" width="16" height="4" rx="1"/><path d="M10 6.5h4M10 12.5h4"/>',
 'qa-d-nt':'<path d="M18 3l3 3-11 11-4 1 1-4z"/><path d="M4 21h16"/>','qa-d-dj':'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11M9 8h6"/>'};
function qaIcones(){Object.keys(QA_IC).forEach(function(id){var n=document.getElementById(id);if(!n)return;var alvo=id==='rail-in'?n.querySelector('.rcab.cer'):n.querySelector(':scope > summary');if(!alvo||alvo.querySelector('.qa-ic'))return;
 var s=document.createElement('span');s.className='qa-ic';s.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+QA_IC[id]+'</svg>';alvo.insertBefore(s,alvo.firstChild);});}
var GUIA_FOTO={0:['colina','A colina do pinheiro'],2:['pavilhao','O pavilhão do refeitório'],3:['templos','Os chalés'],4:['louros','Louros'],6:['bandeira','A bandeira do acampamento']};
function guiaFolheto(){var g=document.getElementById('ac-guia');if(!g||g.dataset.folheto)return;var bx=g.querySelector('.acg-bx');if(!bx)return;g.dataset.folheto='1';g.classList.add('folheto');
 var k=bx.querySelector('.acg-k'),h2=bx.querySelector('h2');if(k&&h2){var cab=document.createElement('header');cab.className='acg-cab';cab.innerHTML='<img src="img/acampamento/logo-camp.webp" alt="">';var tx=document.createElement('div');tx.appendChild(k);tx.appendChild(h2);
  var sub=document.createElement('p');sub.className='acg-sub';sub.textContent='folheto oficial · leia, dobre e guarde no bolso da mochila';tx.appendChild(sub);cab.appendChild(tx);var lira=document.createElement('img');lira.src='img/acampamento/lira.webp';lira.className='acg-lira';lira.alt='';cab.appendChild(lira);bx.insertBefore(cab,bx.querySelector('.acg-ix'));}
 Object.keys(GUIA_FOTO).forEach(function(i){var sec=bx.querySelector('#acg-'+i);if(!sec||sec.querySelector('.acg-foto'))return;var f=GUIA_FOTO[i],ext=f[0]==='bandeira'?'webp':'jpg';
  var fig=document.createElement('figure');fig.className='acg-foto'+(f[0]==='bandeira'?' acg-band':'');fig.innerHTML='<img src="img/acampamento/'+f[0]+'.'+ext+'" alt="" loading="lazy"><figcaption>'+f[1]+'</figcaption>';var h3=sec.querySelector('h3');if(h3)h3.insertAdjacentElement('afterend',fig);else sec.insertBefore(fig,sec.firstChild);});}
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.cp-guia,[data-guia]'))setTimeout(guiaFolheto,30);});
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{qaIcones();guiaFolheto();}catch(e){}return x;};})();
setTimeout(function(){try{qaIcones();}catch(e){}},900);
/* ---------- colunas coloridas por painel (cartela pastel) e adornos de sorte e sucesso ---------- */
var COL_PAINEL={
 tb:{q:'.wrap > div.tb',st:'ionica',c:'#b9c2e8',k:'#4a5590',num:'Ζ',numT:'7 · o número de Apolo e do chalé 7',sim:['sol','lira']},
 rt:{q:'.wrap > div.rt',st:'ionica',c:'#d8c0c6',k:'#7a4a58',num:'Θ',numT:'9 · as nove Musas',sim:['louro','estrela']},
 tm:{q:'#tm-painel',st:'dorica',c:'#f2c3ab',k:'#9a4a30',num:'Γ',numT:'3 · as três missões do Oráculo',sim:['arco','nike']},
 rc:{q:'#recreio',st:'corintia',c:'#efe3b4',k:'#7a6a2a',num:'ΙΒ',numT:'12 · os doze olimpianos',sim:['louro','lira']},
 ts:{q:'#tesouro',st:'ionica',c:'#e6c47e',k:'#7a5418',num:'Ζ',numT:'7 · o número de Apolo',sim:['louro','estrela']}};
var COL_SIM={sol:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
 lira:'<path d="M7 4c-2 3-2 8 1 11h8c3-3 3-8 1-11"/><path d="M8 15v4h8v-4M10 7v8M12 6v9M14 7v8"/>',
 louro:'<path d="M12 21V8"/><path d="M12 10c-3-1-5-3-5-6 3 0 5 2 5 6zM12 10c3-1 5-3 5-6-3 0-5 2-5 6zM12 15c-3-1-5-3-5-5 3 0 5 2 5 5zM12 15c3-1 5-3 5-5-3 0-5 2-5 5z"/>',
 estrela:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
 arco:'<path d="M6 3c8 3 8 15 0 18"/><path d="M6 3v18M3 12h17M17 9l3 3-3 3"/>',
 nike:'<path d="M3 15c4-1 7-4 9-9 1 4 0 7-2 9 3-1 6-1 11 1-5 2-9 3-13 2-2 0-4-1-5-3z"/>'};
function colSvgs(cf){var P=cf.c,K=cf.k,cap='',ent='';
 if(cf.st==='dorica'){cap='<g fill="'+P+'" stroke="'+K+'" stroke-width="1.3"><rect x="5" y="2" width="50" height="9"/><path d="M9 11 Q30 26 51 11 Z"/><rect x="13" y="19" width="34" height="4"/><rect x="13" y="25" width="34" height="3"/></g>';}
 else if(cf.st==='corintia'){cap='<g fill="'+P+'" stroke="'+K+'" stroke-width="1.2"><rect x="6" y="2" width="48" height="6"/><path d="M12 8h36l-4 30H16z"/>'+
   '<path d="M14 9c-6 0-8 6-3 7M46 9c6 0 8 6 3 7" fill="none"/><path d="M22 38c-3-6-1-12 4-14-1 5 0 9-4 14zM38 38c3-6 1-12-4-14 1 5 0 9 4 14zM30 37c-4-7-3-14 0-19 3 5 4 12 0 19z"/><path d="M18 38c-2-3-2-6 0-8M42 38c2-3 2-6 0-8" fill="none"/></g>';}
 else{var t0=NEO_TINTA,p0=NEO_PAPEL;NEO_TINTA=K;NEO_PAPEL=P;cap=neoCapitel(30,2,46);NEO_TINTA=t0;NEO_PAPEL=p0;}
 var fus='<rect x="12.5" y="0" width="35" height="40" fill="'+P+'" stroke="'+K+'" stroke-width="1.3"/>';for(var i=1;i<6;i++)fus+='<rect x="'+(12.5+i*35/6-2)+'" y="0" width="4" height="40" fill="'+K+'" opacity=".22"/>';
 var base='<g fill="'+P+'" stroke="'+K+'" stroke-width="1.3"><rect x="9" y="1" width="42" height="5" rx="2.5"/><rect x="6" y="6" width="48" height="10"/></g>';
 var t0b=NEO_TINTA,p0b=NEO_PAPEL;NEO_TINTA=K;NEO_PAPEL=P;ent=neoEntab(240,1,38);NEO_TINTA=t0b;NEO_PAPEL=p0b;
 var vb='0 0 60 '+(cf.st==='corintia'?40:40);
 return {cap:'url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+vb+'">'+cap+'</svg>')+'")',fuste:neoUrl(fus,'0 0 60 40'),
  base:'url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 18">'+base+'</svg>')+'")',ent:neoUrl(ent,'0 0 240 40')};}
var COL_CACHE={};
function colAplica(){if(typeof neoImgs==='function')neoImgs();Object.keys(COL_PAINEL).forEach(function(k){var cf=COL_PAINEL[k],n=document.querySelector(cf.q);if(!n||!n.classList.contains('neo-moldura'))return;
 var im=COL_CACHE[k]||(COL_CACHE[k]=colSvgs(cf));if(n.dataset.col!==k){n.dataset.col=k;n.style.setProperty('--neo-cap',im.cap);n.style.setProperty('--neo-fuste',im.fuste);n.style.setProperty('--neo-base',im.base);n.style.setProperty('--neo-ent',im.ent);n.style.setProperty('--col-c',cf.c);n.style.setProperty('--col-k',cf.k);}
 if(!n.querySelector(':scope > .col-orn')){var sv=function(nm){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+COL_SIM[nm]+'</svg>';};
  var o=document.createElement('div');o.className='col-orn';o.setAttribute('aria-hidden','true');
  o.innerHTML='<i class="co-med co-l" title="'+cf.numT+'">'+cf.num+'</i><i class="co-med co-r" title="'+cf.numT+'">'+cf.num+'</i><i class="co-sim co-sl">'+sv(cf.sim[0])+'</i><i class="co-sim co-sr">'+sv(cf.sim[1])+'</i>';
  n.appendChild(o);}});
 var ts=document.getElementById('tesouro');if(ts)ts.classList.add('neo-moldura');if(false){var c=ts.querySelector('.ts-cab');if(c){var o2=document.createElement('div');o2.className='ts-orn';o2.setAttribute('aria-hidden','true');
  o2.innerHTML='<i>'+'<svg viewBox="0 0 24 24">'+COL_SIM.louro+'</svg></i><b title="7 · o número de Apolo">Ζ</b><i><svg viewBox="0 0 24 24">'+COL_SIM.estrela+'</svg></i><b title="12 · os doze olimpianos">ΙΒ</b><i><svg viewBox="0 0 24 24">'+COL_SIM.louro+'</svg></i>';c.insertBefore(o2,c.firstChild);}}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{colAplica();}catch(e){console.error('colunas:',e);}return x;};})();
setTimeout(function(){try{colAplica();}catch(e){}},400);setTimeout(function(){try{colAplica();}catch(e){}},1600);
/* Quadro de avisos com nomes do acampamento e emblemas dos deuses */
var QA_IC={'rail-in':'<path d="M12 3v18"/><circle cx="12" cy="4" r="1.4"/><path d="M8 7c2 2 6 2 8 0M7 11c3 3 7 3 10 0M9 15c2 1.5 4 1.5 6 0"/><path d="M5 6l3-2M19 6l-3-2"/>',
 'lat-orb':'<path d="M7 3h10M7 21h10"/><path d="M9 3c0 5 6 6 6 9s-6 4-6 9M15 3c0 5-6 6-6 9s6 4 6 9"/>',
 'qa-d-pc':'<path d="M12 20c-4 0-7-3-7-7 0-3 2-6 4-7l3 2 3-2c2 1 4 4 4 7 0 4-3 7-7 7z"/><circle cx="9.5" cy="12" r="1.6"/><circle cx="14.5" cy="12" r="1.6"/><path d="M11 15.5l1 1 1-1"/>',
 'qa-d-nt':'<path d="M7 4h11v14a2 2 0 0 1-2 2H6"/><path d="M7 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2"/><path d="M10 8h5M10 11h5M10 14h3"/>',
 'qa-d-dj':'<circle cx="12" cy="12" r="4"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>'};
var QA_DEUS={'rail-in':['Caixa de Hermes','o mensageiro leva tudo · despeje antes de perder'],'lat-orb':['Tear das Moiras','em andamento · os fios que estão girando agora'],
 'qa-d-pc':['Atena','sabedoria'],'qa-d-nt':['Hermes','escrita'],'qa-d-dj':['Apolo','memória']};
function qaDeuses(){var ri=document.getElementById('rail-in');if(ri){var c=ri.querySelector('.rcab.cer');if(c&&!c.querySelector('.qa-nm')){var t=document.createElement('span');t.className='qa-nm';t.innerHTML='<b>'+QA_DEUS['rail-in'][0]+'</b><small>'+QA_DEUS['rail-in'][1]+'</small>';c.appendChild(t);}}
 var o=document.getElementById('lat-orb');if(o){var hd=o.querySelector('header');if(hd){var b=hd.querySelector('b'),k=hd.querySelector('.k9');if(b&&b.textContent!==QA_DEUS['lat-orb'][0])b.textContent=QA_DEUS['lat-orb'][0];if(k&&k.textContent!==QA_DEUS['lat-orb'][1])k.textContent=QA_DEUS['lat-orb'][1];
  var ic=hd.querySelector('.lat-ic');if(ic&&!ic.dataset.qa){ic.dataset.qa=1;ic.innerHTML='<svg viewBox="0 0 24 24">'+QA_IC['lat-orb']+'</svg>';}}}
 ['qa-d-pc','qa-d-nt','qa-d-dj'].forEach(function(id){var d=document.getElementById(id);if(!d)return;var su=d.querySelector(':scope > summary');if(!su||su.querySelector('.qa-deus'))return;var g=document.createElement('span');g.className='qa-deus';g.textContent=QA_DEUS[id][0]+' · '+QA_DEUS[id][1];su.appendChild(g);});}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{qaIcones();qaDeuses();}catch(e){}return x;};})();
setTimeout(function(){try{qaIcones();qaDeuses();}catch(e){}},1000);
/* faixa fixa no topo da coluna esquerda, alinhada ao índice e à faixa Agora: identidade e nível */
function latTopo(){var e=document.getElementById('lat-e');if(!e||typeof gmXP!=='function')return;var t=document.getElementById('lat-topo');
 if(!t){t=document.createElement('div');t.id='lat-topo';t.addEventListener('click',function(ev){if(ev.target.closest('.lt-logo')){try{acEditaCampista();}catch(z){}}});}
 if(e.firstElementChild!==t)e.insertBefore(t,e.firstChild);
 var x=gmXP(),nv=gmNivel(x.total),sq=gmSeq(),tot=0;try{var h=hojeN();for(var i=730;i>=0;i--)if(gmDiaOk(diaStr(h-i)))tot++;}catch(z){}
 var html='<div class="lt-r1"><button type="button" class="lt-logo" title="Ficha do campista"><img src="img/acampamento/logo-camp.webp" alt=""></button>'+
  '<div class="lt-id"><b>Nível '+nv.n+'</b><small>'+esc(nv.t)+'</small></div>'+
  '<div class="lt-dias" title="dias no acampamento · sequência atual"><b>'+tot+'</b><small>'+(sq?'seq. '+sq:'dias')+'</small></div></div>'+
  '<div class="lt-r2"><span class="lt-k">xp</span><span class="lt-bar"><i style="width:'+nv.no+'%"></i></span><span class="lt-n">'+nv.no+'/100</span><span class="lt-t">'+x.total+' no total</span></div>';
 if(t._h!==html||(html&&!t.firstChild)){t.innerHTML=html;t._h=html;}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{latTopo();}catch(e){}return x;};})();
setTimeout(function(){try{latTopo();}catch(e){}},300);setInterval(function(){try{latTopo();}catch(e){}},60e3);
/* dracmas no cabeçalho do XP: moeda com o saldo ao lado da barra; o total de XP vai para a dica do número; clique abre a loja */
function ltDracma(){var r=document.querySelector('#lat-topo>.lt-r2');if(!r||typeof drSaldo!=='function')return;var b=document.getElementById('lt-dr');
 if(!b){b=document.createElement('button');b.type='button';b.id='lt-dr';b.title='dracmas de ouro · 10 por hora de foco ou estudo · abrir a loja';b.addEventListener('click',function(){try{ferAbre('loja');}catch(e){}});}
 var t=r.querySelector('.lt-t');if(b.parentNode!==r){if(t)t.insertAdjacentElement('afterend',b);else r.appendChild(b);}
 var n=r.querySelector('.lt-n');if(n&&t&&n.title!==t.textContent+' de XP')n.title=t.textContent+' de XP';
 var v=String(drSaldo());if(b._v!==v||!b.firstChild){b._v=v;b.innerHTML='<i aria-hidden="true"></i><b>'+v+'</b>';}}
latTopo=(function(f0){return function(){var r=f0.apply(this,arguments);try{ltDracma();}catch(e){}return r;};})(latTopo);
setInterval(function(){try{ltDracma();}catch(e){}},5e3);
(function(){var st=document.createElement('style');st.id='lt-dracma-css';st.textContent=[
 '#lat-topo>.lt-r2>.lt-t{display:none!important}',
 '#lat-topo>.lt-r2>.lt-bar{min-width:24px}',
 '#lat-topo>.lt-r2>#lt-dr{order:98;flex:none;display:flex!important;align-items:center;gap:5px;width:auto!important;height:24px;margin:0!important;padding:0 9px 0 4px!important;border:1px solid #8a5a14!important;border-radius:999px!important;background:#f4ead2!important;color:#5a3f2c!important;cursor:pointer;font:700 12px Georgia,serif!important;box-shadow:none!important}',
 '#lat-topo>.lt-r2>#lt-dr i{width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f6dc8c,#c9962e 62%,#8a5a14);box-shadow:inset 0 0 0 1.2px #8a5a14,inset 0 0 0 3px #f1d27c}',
 '#lat-topo>.lt-r2>#lt-dr:hover{background:#ead9b0!important}'
].join('\n');document.head.appendChild(st);})();
/* ---------- roda do ciclo de volta à Tática: medalhão circular; a lista de blocos fica num menu abaixo ---------- */
function ciCirculo(){var r=document.getElementById('ci-roda');if(!r||!r.parentNode)return;var c=document.getElementById('ci-circ');
 if(!c){c=document.createElement('div');c.id='ci-circ';c.className='rd ci-circ';r.parentNode.insertBefore(c,r);}
 var det=document.getElementById('ci-det');if(!det){det=document.createElement('details');det.id='ci-det';det.className='ci-det';det.innerHTML='<summary>todos os blocos da volta · pular para um</summary>';c.insertAdjacentElement('afterend',det);}
 if(r.parentNode!==det)det.appendChild(r);var h='';try{h=rdHTML();}catch(e){}if(c._h!==h||(h&&!c.firstChild)){c.innerHTML=h;c._h=h;}}
pintaCiclo=(function(p0){return function(){var x=p0.apply(this,arguments);try{ciCirculo();}catch(e){}return x;};})(pintaCiclo);
setTimeout(function(){try{ciCirculo();}catch(e){}},600);

/* ---------- disco de foco como escudo grego (aspís): bronze, grega, sol de Apolo; mais tempos e funções ---------- */
function tdPref(){var td=tdD();td.pref=td.pref||{pomo:true,som:true,ult:25};return td.pref;}
function tdHojeFoco(){var n=0,m=0;try{(vxData().sessions||[]).forEach(function(x){if(x.day===hoje()){n++;m+=+x.minutes||0;}});}catch(e){}return {n:n,m:Math.round(m)};}
function tdBlocoCiclo(){try{var id=blocoAtual();return id?discNome(id):'';}catch(e){return '';}}
function tdEscudo(fr,modo,txt,sub){var cx=60,cy=60,T='#5a3f2c',ouro='#e2b85a';
 var s='<defs><radialGradient id="tdBr" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#f1d08a"/><stop offset=".55" stop-color="#c38f3c"/><stop offset="1" stop-color="#7c5218"/></radialGradient>'+
  '<radialGradient id="tdCampo" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#fbf3df"/><stop offset="1" stop-color="#ead9b0"/></radialGradient></defs>';
 s+='<circle cx="60" cy="60" r="58" fill="url(#tdBr)" stroke="'+T+'" stroke-width="1.6"/>';
 s+=(typeof rdGrega==='function'?rdGrega(cx,cy,43,51,16,'#5a3f2c'):'');
 var R=55,C=2*Math.PI*R;
 s+='<circle cx="60" cy="60" r="'+R+'" fill="none" stroke="rgba(60,35,10,.35)" stroke-width="3.2"/>';
 if(modo!=='parado')s+='<circle class="td-fg2" cx="60" cy="60" r="'+R+'" fill="none" stroke="'+(modo==='pausado'?'#bdb3a0':modo==='fim'?'#c0392b':modo==='pausa'?'#7fa36a':'#fff2c8')+'" stroke-width="3.6" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+(C*(1-fr)).toFixed(1)+'" transform="rotate(-90 60 60)"/>';
 s+='<circle cx="60" cy="60" r="37" fill="url(#tdCampo)" stroke="'+T+'" stroke-width="1.4"/>';
 if(modo==='parado'){s+='<g fill="none" stroke="#9a6b3a" stroke-width="1.6" stroke-linecap="round"><circle cx="60" cy="52" r="8"/>';for(var i=0;i<12;i++){var a=i*Math.PI/6,p1=rdPolar(60,52,11,a),p2=rdPolar(60,52,15.5,a);s+='<path d="M'+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+' L'+p2[0].toFixed(1)+' '+p2[1].toFixed(1)+'"/>';}s+='</g>';
  s+='<text x="60" y="81" text-anchor="middle" class="td-st1">FOCO</text>';}
 else{s+='<text x="60" y="'+(sub?63:66)+'" text-anchor="middle" class="td-st2">'+txt+'</text>'+(sub?'<text x="60" y="77" text-anchor="middle" class="td-st3">'+sub+'</text>':'');
  for(var j=0;j<4;j++){var q=rdPolar(60,60,31,-Math.PI/2+j*Math.PI/2);s+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="1.4" fill="#9a6b3a"/>';}}
 return '<svg viewBox="0 0 120 120" aria-hidden="true">'+s+'</svg>';}
tdDisco=function(forca){var d=document.getElementById('td-disco');
 if(!d){d=document.createElement('div');d.id='td-disco';d.className='td-disco td-aspis';document.body.appendChild(d);
  d.addEventListener('click',function(e){var b=e.target.closest('[data-tdf]');if(!b){if(e.target.closest('.td-ring'))d.classList.toggle('aberto');return;}
   var k=b.getAttribute('data-tdf'),td=tdD(),f=td.foco,P=tdPref();
   if(k==='5')tdSo5();
   else if(/^m\d+$/.test(k)){var m=+k.slice(1);P.ult=m;tdFocoIni(m,'bloco de '+m+' min',-1);}
   else if(k==='livre'){var inp=d.querySelector('[data-tdmin]'),v=Math.max(1,Math.min(240,parseInt(inp&&inp.value,10)||0));if(!v){if(inp)inp.focus();return;}P.ult=v;tdFocoIni(v,'bloco de '+v+' min',-1);}
   else if(k==='ciclo'){var nm=tdBlocoCiclo();tdFocoIni(P.ult||25,nm?'Tática · '+nm:'bloco do ciclo',-1);}
   else if(k==='pausa5'){tdFocoIni(5,'pausa curta',-1);var g=tdD().foco;if(g)g.pausaModo=1;}
   else if(k==='pausa15'){tdFocoIni(15,'pausa longa',-1);var g2=tdD().foco;if(g2)g2.pausaModo=1;}
   else if(k==='pomo'){P.pomo=!P.pomo;}
   else if(k==='som'){P.som=!P.som;}
   else if(k==='pausa'&&f){if(f.pausa==null){f.pausa=tdFocoRest();}else{f.ini=Date.now()-(f.dur-f.pausa);f.pausa=null;}}
   else if(k==='mais'&&f){f.dur+=5*60000;if(f.pausa!=null)f.pausa+=5*60000;f.avisou=0;}
   else if(k==='menos'&&f){var r=tdFocoRest();if(r>5*60000){f.dur-=5*60000;if(f.pausa!=null)f.pausa-=5*60000;}}
   else if(k==='fim')tdFocoFim(!(f&&f.pausaModo));
   else if(k==='descarta'){td.foco=null;}
   else if(k==='acomp'&&f){f.acomp=!f.acomp;}
   tdSalva();tdDisco(true);});
  d.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.tdmin!=null){e.preventDefault();var b=d.querySelector('[data-tdf="livre"]');if(b)b.click();}});}
 d.classList.add('td-aspis');var f=tdD().foco,P=tdPref(),H=tdHojeFoco();
 if(!f){if(forca||d.dataset.m!=='parado'){d.dataset.m='parado';d.classList.remove('rodando','pausado','fim','em-pausa');var nm=tdBlocoCiclo();
   d.innerHTML='<button type="button" class="td-ring" aria-label="Abrir o foco" title="clique para abrir · arraste para mover · duplo clique volta ao canto">'+tdEscudo(0,'parado')+'</button>'+
    '<div class="td-menu"><header><span>aspís do foco</span><b>Começar um bloco</b></header>'+
    '<div class="td-chips">'+[15,25,45,50,90].map(function(m){return '<button type="button" data-tdf="m'+m+'"'+(P.ult===m?' class="on"':'')+'>'+m+'</button>';}).join('')+'</div>'+
    '<div class="td-livre"><input type="number" min="1" max="240" inputmode="numeric" data-tdmin placeholder="min" aria-label="Minutos"><button type="button" data-tdf="livre">começar</button></div>'+
    '<button type="button" class="td-l td-5" data-tdf="5">só 5 minutos · o menor passo</button>'+
    (nm?'<button type="button" class="td-l" data-tdf="ciclo">bloco do ciclo · <b>'+tdEsc(nm)+'</b> · '+(P.ult||25)+' min</button>':'')+
    '<div class="td-dois"><button type="button" class="td-l" data-tdf="pausa5">pausa curta · 5</button><button type="button" class="td-l" data-tdf="pausa15">pausa longa · 15</button></div>'+
    '<div class="td-opt"><button type="button" data-tdf="pomo" aria-pressed="'+!!P.pomo+'">'+(P.pomo?'✓ ':'')+'pausa ao terminar</button><button type="button" data-tdf="som" aria-pressed="'+!!P.som+'">'+(P.som?'✓ ':'')+'som</button></div>'+
    '<footer><span>hoje</span><b>'+H.n+' bloco'+(H.n===1?'':'s')+' · '+tdHM(H.m)+'</b><a href="https://www.focusmate.com/" target="_blank" rel="noopener">estudar acompanhado ↗</a></footer></div>';}
  return;}
 var rest=tdFocoRest(),fr=f.dur?rest/f.dur:0,modo=f.pausa!=null?'pausado':(rest<=60000?'fim':(f.pausaModo?'pausa':'rodando'));
 if(d.dataset.m!=='rodando')d.classList.remove('aberto');
 if(forca||d.dataset.m!=='rodando'){d.dataset.m='rodando';d.classList.add('rodando');
  d.innerHTML='<button type="button" class="td-ring" aria-label="Controles do foco"></button>'+
   '<div class="td-menu"><header><span class="td-rotk"></span><b class="td-rot"></b></header>'+
   '<div class="td-grid"><button type="button" data-tdf="pausa" class="td-pb"></button><button type="button" data-tdf="mais">+5 min</button><button type="button" data-tdf="menos">−5 min</button><button type="button" data-tdf="acomp" class="td-ac"></button></div>'+
   '<button type="button" class="td-l td-5" data-tdf="fim">encerrar e registrar</button><button type="button" class="td-l" data-tdf="descarta">descartar sem registrar</button>'+
   '<footer><span>hoje</span><b>'+H.n+' bloco'+(H.n===1?'':'s')+' · '+tdHM(H.m)+'</b><a href="https://www.focusmate.com/" target="_blank" rel="noopener">abrir o Focusmate ↗</a></footer></div>';}
 var ring=d.querySelector('.td-ring'),svg=tdEscudo(fr,modo,tdMMSS(rest),f.pausa!=null?'pausado':(f.pausaModo?'pausa':''));if(ring.dataset.s!==svg){ring.dataset.s=svg;ring.innerHTML=svg;}
 d.querySelector('.td-rot').textContent=f.rot;d.querySelector('.td-rotk').textContent=f.pausaModo?'respire · pausa':'em foco';
 d.querySelector('.td-pb').textContent=f.pausa!=null?'retomar':'pausar';d.querySelector('.td-ac').textContent=f.acomp?'✓ acompanhado':'acompanhado';
 d.classList.toggle('pausado',f.pausa!=null);d.classList.toggle('fim',modo==='fim');d.classList.toggle('em-pausa',!!f.pausaModo);
 if(rest<=0&&f.pausa==null&&!f.avisou){f.avisou=1;tdSalva();
  if(f.pausaModo){tdAvisa('Fim da pausa','de volta ao treino?',[['novo bloco',function(){tdFocoFim(false);tdFocoIni(P.ult||25,'bloco de '+(P.ult||25)+' min',-1);}],['parar',function(){tdFocoFim(false);}]],P.som);}
  else tdAvisa('Tempo! '+f.rot,'terminou o bloco de '+Math.round(f.dur/60000)+' min',[['concluí'+(P.pomo?' · pausa':''),function(){if(f.pi>=0){try{var x=plDia(hoje());if(x.top[f.pi])x.top[f.pi].ok=true;}catch(e){}}tdFocoFim(true);if(P.pomo){tdFocoIni(5,'pausa curta',-1);var g=tdD().foco;if(g){g.pausaModo=1;tdSalva();}}}],['mais 5',function(){var g=tdD().foco;if(g){g.dur+=5*60000;g.avisou=0;tdSalva();tdDisco(true);}}],['parar',function(){tdFocoFim(true);}]],P.som);}};
/* escudo do foco arrastável: arraste pelo escudo; a posição fica guardada; duplo clique volta ao canto */
function tdPosAplica(){var d=document.getElementById('td-disco');if(!d)return;var p=null;try{p=JSON.parse(localStorage.getItem('astro_disco_pos')||'null');}catch(e){}
 if(!p){['left','top','bottom','right'].forEach(function(k){d.style.removeProperty(k);});d.classList.remove('td-solto','td-cima');return;}
 var w=d.querySelector('.td-ring')?104:104,x=Math.max(4,Math.min(window.innerWidth-w-4,p.x)),y=Math.max(4,Math.min(window.innerHeight-w-4,p.y));
 d.classList.add('td-solto');d.style.setProperty('left',x+'px','important');d.style.setProperty('top',y+'px','important');d.style.setProperty('bottom','auto','important');d.style.setProperty('right','auto','important');
 d.classList.toggle('td-cima',y<window.innerHeight/2);d.classList.toggle('td-dir',x>window.innerWidth/2);}
(function(){var arr=null;
 document.addEventListener('pointerdown',function(e){var r=e.target.closest&&e.target.closest('#td-disco .td-ring');if(!r||e.button>0)return;var d=document.getElementById('td-disco'),b=r.getBoundingClientRect();
  arr={x0:e.clientX,y0:e.clientY,dx:e.clientX-b.left,dy:e.clientY-b.top,mov:false,id:e.pointerId};},true);
 document.addEventListener('pointermove',function(e){if(!arr)return;if(!arr.mov&&Math.hypot(e.clientX-arr.x0,e.clientY-arr.y0)<6)return;arr.mov=true;e.preventDefault();
  var d=document.getElementById('td-disco');d.classList.add('td-arrastando');d.classList.remove('aberto');
  var p={x:e.clientX-arr.dx,y:e.clientY-arr.dy};try{localStorage.setItem('astro_disco_pos',JSON.stringify(p));}catch(z){}tdPosAplica();},{passive:false});
 document.addEventListener('pointerup',function(){if(!arr)return;var m=arr.mov;arr=null;var d=document.getElementById('td-disco');if(d)d.classList.remove('td-arrastando');
  if(m){var bloq=function(ev){ev.stopPropagation();ev.preventDefault();document.removeEventListener('click',bloq,true);};document.addEventListener('click',bloq,true);setTimeout(function(){document.removeEventListener('click',bloq,true);},50);}});
 document.addEventListener('dblclick',function(e){if(!(e.target.closest&&e.target.closest('#td-disco .td-ring')))return;try{localStorage.removeItem('astro_disco_pos');}catch(z){}tdPosAplica();var d=document.getElementById('td-disco');if(d)d.classList.remove('aberto');});
 window.addEventListener('resize',tdPosAplica);})();
tdDisco=(function(t0){return function(){var x=t0.apply(this,arguments);try{var d=document.getElementById('td-disco');if(d&&!d.dataset.pos){d.dataset.pos=1;tdPosAplica();}}catch(e){}return x;};})(tdDisco);
setTimeout(tdPosAplica,400);
/* Crônicas do chalé: apagar uma entrada (dois toques: ✕ e depois "apagar?") */
function djApagaBotoes(){var h=document.getElementById('dj-h');if(!h)return;Array.prototype.forEach.call(h.children,function(r){var b=r.querySelector('b');if(!b||r.querySelector('[data-djx]'))return;
 var x=document.createElement('button');x.type='button';x.className='dj-x';x.dataset.djx=b.textContent.trim();x.title='apagar esta entrada';x.setAttribute('aria-label','Apagar a entrada de '+x.dataset.djx);x.textContent='✕';r.appendChild(x);});}
document.addEventListener('click',function(e){var x=e.target.closest&&e.target.closest('[data-djx]');if(!x)return;e.preventDefault();e.stopPropagation();
 if(!x.classList.contains('conf')){x.classList.add('conf');x.textContent='apagar?';setTimeout(function(){if(x.isConnected){x.classList.remove('conf');x.textContent='✕';}},4000);return;}
 var d=x.dataset.djx;if(S.diario&&S.diario[d]!=null){delete S.diario[d];grava();try{anota('Crônica de '+d+' apagada.',0,false);}catch(z){}}
 if(d===hoje()){var t=document.getElementById('dj-t');if(t)t.value='';}try{pinta();}catch(z){}djApagaBotoes();},true);
(function(){var p0=pinta;pinta=function(){var r=p0.apply(this,arguments);try{djApagaBotoes();}catch(e){}return r;};})();
setTimeout(djApagaBotoes,800);
/* ---------- Culture Vulture no Recreações (mesmos dados do reino Vanaheim: state.planners.culture) ---------- */
var CV_SEC=[{t:'cols',c:[['watch','Assistir'],['read','Ler'],['listen','Ouvir']],n:8},{t:'cols',c:[['viral','Vídeos virais'],['sites','Sites'],['podcasts','Podcasts']],n:5},
 {t:'cols',c:[['cheap','Entretenimento barato'],['trash','Trashy stuff'],['guilty','Guilty pleasures']],n:5},{t:'txt',k:'notes',l:'Notas'},{t:'chips',k:'reference',l:'Usar como referência',o:['Blog','Conversa casual','Provar hipness']}];
function cvD(){try{if(!AX.ok)return null;var st=AX.st();st.planners=st.planners||{};return st.planners.culture=st.planners.culture||{};}catch(e){return null;}}
function cvHTML(){var D=cvD();if(!D)return '<p class="lat-n">Carregando a estante…</p>';var h='';
 CV_SEC.forEach(function(sec,si){if(sec.t==='cols'){h+='<div class="cv-cols">'+sec.c.map(function(c){var arr=D[c[0]]||[],li='';var n=Math.max(1,arr.filter(Boolean).length+1);n=Math.min(sec.n,Math.max(n,3));
   for(var i=0;i<n;i++)li+='<input class="cv-in" data-cv="'+c[0]+':'+i+'" value="'+esc(arr[i]||'')+'" placeholder="…">';return '<div class="cv-col"><span class="cv-k">'+c[1]+'</span>'+li+'</div>';}).join('')+'</div>';}
  else if(sec.t==='txt')h+='<label class="cv-tx"><span class="cv-k">'+sec.l+'</span><textarea data-cvt="'+sec.k+'" rows="2" placeholder="…">'+esc(D[sec.k]||'')+'</textarea></label>';
  else{var sel=D[sec.k]||[];h+='<div class="cv-ch"><span class="cv-k">'+sec.l+'</span>'+sec.o.map(function(o){return '<button type="button" class="'+(sel.indexOf(o)>=0?'on':'')+'" data-cvc="'+sec.k+':'+o+'">'+o+'</button>';}).join('')+'</div>';}});
 return h;}
function cvCard(){var rc=document.getElementById('recreio');if(!rc)return;var g=rc.querySelector('.rc-g');if(!g)return;var c=document.getElementById('lat-cv');
 if(!c){var t=document.createElement('div');t.innerHTML=latCard('lat-cv','alvo','assistir, ler e ouvir sem deixar boas ideias evaporarem','Culture Vulture','<div id="lat-cv-b"></div>');c=t.firstChild;c.classList.add('cv-card');
  var tm=0;c.addEventListener('input',function(e){var D=cvD();if(!D)return;var x=e.target;
   if(x.dataset.cv){var p=x.dataset.cv.split(':'),arr=(D[p[0]]=D[p[0]]||[]);arr[+p[1]]=x.value;var col=x.parentNode,ins=col.querySelectorAll('.cv-in');if(x===ins[ins.length-1]&&x.value&&ins.length<8){var n=document.createElement('input');n.className='cv-in';n.placeholder='…';n.dataset.cv=p[0]+':'+ins.length;col.appendChild(n);}}
   else if(x.dataset.cvt!=null)D[x.dataset.cvt]=x.value;clearTimeout(tm);tm=setTimeout(function(){try{AX.save();}catch(z){}},400);});
  c.addEventListener('click',function(e){var b=e.target.closest('[data-cvc]');if(!b)return;var D=cvD();if(!D)return;var p=b.dataset.cvc.split(':'),arr=(D[p[0]]=D[p[0]]||[]),i=arr.indexOf(p[1]);if(i>=0)arr.splice(i,1);else arr.push(p[1]);b.classList.toggle('on',i<0);try{AX.save();}catch(z){}});}
 if(c.parentNode!==g)g.appendChild(c);var b=c.querySelector('#lat-cv-b'),a=document.activeElement;if(a&&c.contains(a))return;var h=cvHTML();if(b._h!==h||(h&&!b.firstChild)){b.innerHTML=h;b._h=h;}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{cvCard();}catch(e){}return x;};})();
setTimeout(function(){try{cvCard();}catch(e){}},1200);setTimeout(function(){try{cvCard();}catch(e){}},3000);

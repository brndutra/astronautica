/* ======================= Posto: "Cheguei no gabinete" e as cinco áreas da vida, cronometradas =======================
   No cabeçalho do Posto, entre a data e o placar:
     Cheguei   marca a hora de chegada ao gabinete, liga a área Gabinete e pergunta a missão do dia (uma frase).
               Depois mostra "no gabinete desde 08:12" e a missão (clique para rever ou trocar).
     Áreas     Gabinete, Tática, Oficina, Família, Corpo e descanso. Um toque liga a área (e desliga a que estava
               ligada); outro toque na mesma desliga. A ligada mostra o tempo correndo.
     Semana    a faixa fina embaixo é a distribuição da semana (seg a dom) por área; clique para ver as horas.
   Dados em S.area (vão para a nuvem pelo grava): {at:{a,i}|null, seg:[{a,i,f}], d:{'AAAA-MM-DD':{ch:'HH:MM',m:'missão'}}}.
   Segmentos de mais de 70 dias saem sozinhos. */
var AREAS_V=[['gab','Gabinete','#426b94'],['tat','Tática','#a64f3c'],['ofi','Oficina','#806d91'],['fam','Família','#4f7a35'],['cor','Corpo e descanso','#b5762a']];
var AR={pop:null};
function arD(){var A=S.area&&typeof S.area==='object'?S.area:(S.area={});if(!Array.isArray(A.seg))A.seg=[];if(!A.d||typeof A.d!=='object')A.d={};if(A.at&&!A.at.a)A.at=null;return A;}
function arArea(k){return AREAS_V.filter(function(x){return x[0]===k;})[0]||AREAS_V[0];}
function arHM(ms){var m=Math.max(0,Math.round(ms/60000)),h=Math.floor(m/60);return h?h+'h'+(m%60?String(m%60).padStart(2,'0'):''):m+'min';}
function arRel(ms){var s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h+':'+String(m).padStart(2,'0');}
function arAgoraHM(){var n=new Date();return String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');}
function arPara(){var A=arD();if(!A.at)return;var f=Date.now();if(f-A.at.i>=30000)A.seg.push({a:A.at.a,i:A.at.i,f:f});A.at=null;
 var lim=f-70*864e5;A.seg=A.seg.filter(function(s){return s.f>lim;});}
function arLiga(k){var A=arD();if(A.at&&A.at.a===k){arPara();}else{arPara();A.at={a:k,i:Date.now()};}try{grava();}catch(e){}arPinta(1);}
/* início da semana (segunda, 00:00) */
function arSemIni(){var n=new Date();n.setHours(0,0,0,0);var w=(n.getDay()+6)%7;n.setDate(n.getDate()-w);return n.getTime();}
/* minutos por área num intervalo [a,b) — com a área ligada contando até agora */
function arSoma(a,b){var A=arD(),T={},L=A.seg.slice();if(A.at)L.push({a:A.at.a,i:A.at.i,f:Date.now()});
 L.forEach(function(s){var i=Math.max(s.i,a),f=Math.min(s.f,b);if(f>i)T[s.a]=(T[s.a]||0)+(f-i);});return T;}
function arSemanaHTML(){var ini=arSemIni(),T=arSoma(ini,ini+7*864e5),tot=0;AREAS_V.forEach(function(x){tot+=T[x[0]]||0;});
 return '<button type="button" class="ar-sem" data-arsem title="distribuição da semana'+(tot?' · '+arHM(tot):'')+'">'+(tot?AREAS_V.map(function(x){var v=T[x[0]]||0;return v?'<i style="flex:'+v+';background:'+x[2]+'"></i>':'';}).join(''):'<i class="vz"></i>')+'</button>';}
function arHTML(){var A=arD(),hj=hoje(),D=A.d[hj]||{},at=A.at;
 var ch=D.ch?'<button type="button" class="ar-ch ok" data-archm title="'+esc(D.m?'missão: '+D.m:'escrever a missão do dia')+'"><small>no gabinete desde</small><b>'+esc(D.ch)+'</b>'+(D.m?'':'<em>missão?</em>')+'</button>':
  '<button type="button" class="ar-ch" data-arch title="marca a hora, liga o Gabinete e pergunta a missão do dia">cheguei</button>';
 var bts=AREAS_V.map(function(x){var on=at&&at.a===x[0];return '<button type="button" class="ar-a'+(on?' on':'')+'" data-ar="'+x[0]+'" style="--ar:'+x[2]+'" title="'+esc(x[1])+(on?' · ligada desde '+new Date(at.i).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})+' (toque para desligar)':' (toque para ligar)')+'">'+
  '<i aria-hidden="true"></i><span>'+esc(x[0]==='cor'?'Corpo':x[1])+'</span>'+(on?'<b data-arrel>'+arRel(Date.now()-at.i)+'</b>':'')+'</button>';}).join('');
 return ch+'<span class="ar-g"><span class="ar-bts" role="group" aria-label="áreas da vida">'+bts+'</span>'+arSemanaHTML()+'</span>';}
function arPopHTML(){var A=arD(),hj=hoje(),D=A.d[hj]||{};
 if(AR.pop==='m')return '<div class="ar-pop ar-pm"><small>missão do dia · '+esc(D.ch?'chegada '+D.ch:'hoje')+'</small><b>Qual é a única coisa que, feita hoje, faz o dia valer?</b>'+
  '<input data-armi maxlength="140" placeholder="uma frase, um verbo no começo" value="'+esc(D.m||'')+'"><span class="ar-pb"><button type="button" class="ar-ok" data-armok>guardar</button><button type="button" data-arpx>depois</button></span></div>';
 if(AR.pop==='s'){var ini=arSemIni(),T=arSoma(ini,ini+7*864e5),tot=0,DS=['seg','ter','qua','qui','sex','sáb','dom'],mx=0,dias=[];AREAS_V.forEach(function(x){tot+=T[x[0]]||0;});
  for(var i=0;i<7;i++){var t=arSoma(ini+i*864e5,ini+(i+1)*864e5),s=0;AREAS_V.forEach(function(x){s+=t[x[0]]||0;});mx=Math.max(mx,s);dias.push([t,s]);}
  return '<div class="ar-pop ar-ps"><small>semana · '+arHM(tot)+' registradas</small><ul>'+AREAS_V.map(function(x){var v=T[x[0]]||0;return '<li style="--ar:'+x[2]+'"><i></i><span>'+esc(x[1])+'</span><b>'+(v?arHM(v):'—')+'</b><em>'+(tot?Math.round(v/tot*100):0)+'%</em></li>';}).join('')+'</ul>'+
   '<div class="ar-dias">'+dias.map(function(d,i){return '<span title="'+DS[i]+' · '+arHM(d[1])+'"><span class="ar-col" style="height:'+(mx?Math.max(2,Math.round(d[1]/mx*56)):2)+'px">'+AREAS_V.map(function(x){var v=d[0][x[0]]||0;return v?'<i style="flex:'+v+';background:'+x[2]+'"></i>':'';}).join('')+'</span><small>'+DS[i]+'</small></span>';}).join('')+'</div>'+
   '<button type="button" class="ar-lk" data-arpx>fechar</button></div>';}
 return '';}
function arPinta(forca){if(!document.body.classList.contains('op-on'))return;var t=document.querySelector('#modo-op .op-top');if(!t)return;var el=t.querySelector('.op-areas');
 if(!el){el=document.createElement('div');el.className='op-areas';el.setAttribute('data-notr','');var tr=t.querySelector('.op-topr');t.insertBefore(el,t.children[1]||tr);}
 if(el.contains(document.activeElement)&&document.activeElement.matches('input')&&!forca){var r=el.querySelector('[data-arrel]'),A=arD();if(r&&A.at)r.textContent=arRel(Date.now()-A.at.i);return;}
 var h=arHTML()+arPopHTML();if(el._h!==h){el.innerHTML=h;el._h=h;if(AR.pop==='m'){var i=el.querySelector('[data-armi]');if(i&&forca){i.focus();i.select();}}}}
function arMissao(){var i=document.querySelector('#modo-op [data-armi]');if(!i)return;var A=arD(),hj=hoje();A.d[hj]=A.d[hj]||{};var v=i.value.trim(),era=A.d[hj].m;A.d[hj].m=v;AR.pop=null;try{grava();}catch(e){}
 if(v&&v!==era){try{cxDiario('Missão do dia: '+v);}catch(e){}}arPinta(1);}
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;var b;
 if(!t.closest('#modo-op .op-areas')){if(AR.pop){AR.pop=null;arPinta(1);}return;}
 if(t.closest('[data-arch]')){var A=arD(),hj=hoje();A.d[hj]=A.d[hj]||{};A.d[hj].ch=arAgoraHM();if(!A.at||A.at.a!=='gab'){arPara();A.at={a:'gab',i:Date.now()};}
  try{cxDiario('Cheguei no gabinete às '+A.d[hj].ch+'.');}catch(z){}try{grava();}catch(z){}AR.pop='m';arPinta(1);return;}
 if(t.closest('[data-archm]')){AR.pop=AR.pop==='m'?null:'m';arPinta(1);return;}
 if(t.closest('[data-arsem]')){AR.pop=AR.pop==='s'?null:'s';arPinta(1);return;}
 if(t.closest('[data-armok]')){arMissao();return;}
 if(t.closest('[data-arpx]')){AR.pop=null;arPinta(1);return;}
 if((b=t.closest('[data-ar]'))){arLiga(b.getAttribute('data-ar'));return;}},true);
document.addEventListener('keydown',function(e){var t=e.target;if(!t.matches||!t.matches('#modo-op [data-armi]'))return;
 if(e.key==='Enter'){e.preventDefault();arMissao();}else if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();AR.pop=null;arPinta(1);}},true);
setInterval(function(){try{arPinta();}catch(e){}},1000);

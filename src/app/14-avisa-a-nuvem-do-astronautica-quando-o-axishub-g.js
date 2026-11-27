var AX={ok:false};window.AX=AX;
/* avisa a nuvem do Astronáutica quando o AxisHub grava */
function axSalvou(){try{if(typeof nvPor==='function'&&typeof FIN_TS!=='undefined'){nvPor(FIN_TS,String(Date.now()));if(typeof nvAgenda==='function')nvAgenda();}}catch(e){}}
function axEspelho(els){
 var cl={add:function(){var a=arguments;els.forEach(function(e){e.classList.add.apply(e.classList,a);});},
  remove:function(){var a=arguments;els.forEach(function(e){e.classList.remove.apply(e.classList,a);});},
  toggle:function(c,f){var r;els.forEach(function(e){r=(f===undefined)?e.classList.toggle(c):e.classList.toggle(c,f);});return r;},
  contains:function(c){return els[0].classList.contains(c);},
  replace:function(a,b){els.forEach(function(e){e.classList.replace(a,b);});}};
 var st={setProperty:function(k,v,p){els.forEach(function(e){e.style.setProperty(k,v,p);});},
  removeProperty:function(k){els.forEach(function(e){e.style.removeProperty(k);});},
  getPropertyValue:function(k){return els[0].style.getPropertyValue(k);}};
 return new Proxy(els[0],{get:function(t,k){
   if(k==='classList')return cl;if(k==='style')return st;if(k==='__axMirror')return els;
   if(k==='className')return t.className;
   var v=t[k];return typeof v==='function'?v.bind(t):v;},
  set:function(t,k,v){if(k==='className'){els.forEach(function(e){e.className=v;});return true;}t[k]=v;return true;}});}
function axInit(){
 if(AX.ok)return;var wr=document.querySelector('.wrap');var pane=document.querySelector('#painel-dir [data-pane="fin"]');
 if(!wr||!pane)return;AX.ok=true;
 /* fontes no documento (não funcionam dentro de shadow root) */
 var fs=document.createElement('style');fs.id='ax-fontes';fs.textContent=AX_FONTES;document.head.appendChild(fs);
 var CLS='habit mid ygg-world';
 function raiz(host,html,extra){var r=host.attachShadow({mode:'open'});
  r.innerHTML='<style>'+AX_CSS+extra+'</style><div class="axhtml '+CLS+'"><div class="axbody">'+html+'</div></div>';
  return r;}
 var hA=document.createElement('div');hA.id='ax-topo';wr.insertBefore(hA,wr.firstChild);
 var hB=document.createElement('div');hB.id='ax-hub';pane.appendChild(hB);
 var A=raiz(hA,AX_TOPO,'\n.axhtml,.axbody{background:transparent!important;min-height:0!important;height:auto!important;width:auto!important;padding:0!important;margin:0!important;overflow:visible!important}'+
  '\n.axis-weekbar{position:relative!important;inset:auto!important;width:auto!important;height:auto!important;min-height:62px;flex-wrap:wrap!important;row-gap:10px!important;margin:0 0 14px!important;border-radius:18px!important;border:1px solid var(--line,#d8d0bf)!important;z-index:5!important}'+
  '\n:host(.na-ficha) .axis-weekbar,:host(.sem-barra) .axis-weekbar{display:none!important}#awbRaven{display:inline-flex!important;align-items:center;gap:2px;white-space:nowrap}.awb-nav #ravenBadge{position:static!important;inset:auto!important;transform:none!important;box-shadow:none!important;border:0!important}.awb-badge{display:none;margin-left:4px;min-width:16px;height:16px;border-radius:8px;background:#c2611f;color:#fff;font:700 10px system-ui;place-items:center;padding:0 4px}'+
  '\n.awb-nav [data-awb-tab="habit"],.awb-nav [data-awb-tab="mapa"]{display:none!important}'+
  '\n.awb-nav{flex:1 1 auto!important;overflow:visible!important;flex-wrap:wrap}.awb-trackers{margin-left:0!important;flex-wrap:wrap}.awb-status{margin-left:auto!important}');
 var B=raiz(hB,AX_HUB,'\n.axhtml,.axbody{min-height:0!important;height:auto!important;padding-top:0!important;padding-left:0!important}\n.axhtml:not(.habit) .planner-edge-tabs{display:none!important}'+
  '\n:host(.na-ficha) .axhtml,:host(.na-ficha) .axbody{background:transparent!important}:host(.na-ficha) .wrap{display:block!important;padding:0!important;margin:0!important;max-width:none!important;width:auto!important}'+
  ':host(.na-ficha) .wrap>header{display:block!important;position:static!important;width:auto!important;height:auto!important;min-height:0!important;padding:0 0 10px!important;margin:0!important;border:0!important;background:none!important;box-shadow:none!important;overflow:visible!important}'+
  ':host(.na-ficha) .wrap>header>.brandline,:host(.na-ficha) .wrap>header>.monthnav,:host(.na-ficha) .wrap>header>#mgQuickTrk{display:none!important}'+
  ':host(.na-ficha) #flipzone,:host(.na-ficha) main{margin:0!important;width:auto!important;max-width:none!important}');
 AX.A=A;AX.B=B;
 var hh=[A.querySelector('.axhtml'),B.querySelector('.axhtml')],bb=[A.querySelector('.axbody'),B.querySelector('.axbody')];
 var DE=axEspelho(hh),BO=axEspelho(bb);
 var raizes=[A,B];
 function todos(sel){var o=[];raizes.forEach(function(r){Array.prototype.push.apply(o,r.querySelectorAll(sel));});return o;}
 var CHAVES=/^key/;
 var D=new Proxy(document,{get:function(t,k){
  switch(k){
   case 'getElementById':return function(id){return A.getElementById(id)||B.getElementById(id);};
   case 'querySelector':return function(sel){return A.querySelector(sel)||B.querySelector(sel);};
   case 'querySelectorAll':return todos;
   case 'getElementsByClassName':return function(c){return todos('.'+c.trim().split(/\s+/).join('.'));};
   case 'body':return BO;
   case 'documentElement':return DE;
   case 'readyState':return 'complete';
   case 'activeElement':return A.activeElement||B.activeElement||document.activeElement;
   case 'addEventListener':return function(tp,fn,op){
     if(tp==='DOMContentLoaded'||tp==='readystatechange'||tp==='load'){setTimeout(fn,0);return;}
     if(CHAVES.test(tp)){document.addEventListener(tp,fn,op);return;}
     A.addEventListener(tp,fn,op);B.addEventListener(tp,fn,op);};
   case 'removeEventListener':return function(tp,fn,op){document.removeEventListener(tp,fn,op);A.removeEventListener(tp,fn,op);B.removeEventListener(tp,fn,op);};
  }
  var v=t[k];return typeof v==='function'?v.bind(t):v;}});
 var AXD={scrollTo:function(x,y){var c=document.querySelector('#painel-dir .pd-corpo');var top=(typeof x==='object'&&x)?x.top:y;if(c&&document.getElementById('painel-dir').classList.contains('on'))c.scrollTo({top:top||0});}};
 var MO=function(fn){var mo=new window.MutationObserver(fn);var o0=mo.observe.bind(mo);mo.observe=function(t,op){if(t&&t.__axMirror)t.__axMirror.forEach(function(n){o0(n,op);});else o0(t,op);};return mo;};
 try{AXRUN(D,AXD,MO);}catch(e){console.error('AxisHub:',e);}
 AX.financas=function(){try{if(!DE.classList.contains('financehub-page')||DE.classList.contains('habit'))window.openFinanceHub();}catch(e){}};
 AX.financas();
 try{axBotoesExtra();AX.selo();setInterval(AX.selo,60000);}catch(e){}
 hA.classList.add('sem-barra');try{axFinTopo();}catch(e){}try{enfPinta();}catch(e){}try{tbFoco();}catch(e){}try{pintaProj();}catch(e){}
 /* barra do topo: abas e ações do AxisHub abrem o painel direito */
 window.addEventListener('click',function(e){var p=e.composedPath&&e.composedPath();var t=p&&p[0];if(!t||!t.closest||t.getRootNode()!==A)return;var b=t.closest('[data-awb-action="finance"]');if(b&&typeof pdAbre==='function')setTimeout(function(){pdAbre('fin');},0);},true);
}
/* com o painel do AxisHub aberto, a barra sobe para dentro dele; fechado, volta ao topo da página */
function axEncaixa(dentro){var h=document.getElementById('ax-topo');if(!h)return;dentro=false;if(dentro===false&&AX.financas&&document.getElementById('painel-dir')&&document.getElementById('painel-dir').classList.contains('largo'))AX.financas();
 if(dentro){var c=document.querySelector('#painel-dir .pd-corpo'),hub=document.getElementById('ax-hub');var pane=hub&&hub.parentNode;if(pane&&h.parentNode!==pane)pane.insertBefore(h,hub);}
 else{var wr=document.querySelector('.wrap');if(wr&&h.parentNode!==wr)wr.insertBefore(h,wr.firstChild);}}
/* ---- os quatro reinos dentro da Ficha do Campista ---- */
var AX_REINOS=[['espelho','Urðarbrunnr','Espelho · mapa astral, numerologia e vocação'],['tarefas','Niflheim','Self-therapy · desembaralhar o que sente'],['asgard','Asgard','Vision board · áreas da vida e metas']];
AX.noReino=false;
function axReino(id){if(!AX.ok)return;var palco=document.getElementById('fc-reino-palco');if(!palco)return;
 var hB=document.getElementById('ax-hub'),hA=document.getElementById('ax-topo');
 hA.classList.add('na-ficha');hB.classList.add('na-ficha');palco.appendChild(hA);palco.appendChild(hB);AX.noReino=true;
 try{AX.B.querySelector('.axhtml').classList.remove('financehub-page');AX.A.querySelector('.axhtml').classList.remove('financehub-page');AX.selectWorld(id);}catch(e){console.error(e);}
 Array.prototype.forEach.call(document.querySelectorAll('[data-reino]'),function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-reino')===id));});
 palco.hidden=false;palco.scrollIntoView({block:'start',behavior:'smooth'});}
function axReinoSai(){if(!AX.noReino)return;AX.noReino=false;var hB=document.getElementById('ax-hub'),hA=document.getElementById('ax-topo');
 var pane=document.querySelector('#painel-dir [data-pane="fin"]');if(pane&&hB){hB.classList.remove('na-ficha');pane.appendChild(hB);}
 if(hA){hA.classList.remove('na-ficha');var wr=document.querySelector('.wrap');if(wr)wr.insertBefore(hA,wr.firstChild);}
 try{AX.selectWorld('financeiro');}catch(e){}if(AX.financas)AX.financas();
 var palco=document.getElementById('fc-reino-palco');if(palco)palco.hidden=true;
 Array.prototype.forEach.call(document.querySelectorAll('[data-reino]'),function(b){b.setAttribute('aria-pressed','false');});}
function axReinosSec(){var c=document.getElementById('fc-dlg-c');if(!c)return null;var s=document.getElementById('fc-reinos');
 if(!s){s=document.createElement('section');s.id='fc-reinos';s.className='fc-reinos';
  s.innerHTML='<div class="fc-k">os reinos da árvore &middot; só você vê</div><h3>Reinos da árvore</h3><div class="fc-reino-bt">'+
   AX_REINOS.map(function(r){return '<button type="button" data-reino="'+r[0]+'" aria-pressed="false"><b>'+r[1]+'</b><small>'+r[2]+'</small></button>';}).join('')+
   '</div><div id="fc-reino-palco" hidden></div>';
  s.addEventListener('click',function(e){var b=e.target.closest('[data-reino]');if(!b)return;if(b.getAttribute('aria-pressed')==='true'){axReinoSai();return;}axReino(b.getAttribute('data-reino'));});}
 var arq=document.getElementById('arq-antigo');if(arq&&arq.parentNode===c){if(s.nextSibling!==arq)c.insertBefore(s,arq);}else if(s.parentNode!==c)c.appendChild(s);
 s.hidden=!(typeof CF!=='undefined'&&CF.chave);return s;}
/* barra: corvo e captura rápida ao lado de Projetos */
function axBotoesExtra(){if(!AX.A)return;var nav=AX.A.querySelector('.awb-nav');if(!nav||AX.A.getElementById('awbRaven'))return;var pj=nav.querySelector('[data-awb-action="projects"]');
 function bt(id,txt,k){var b=document.createElement('button');b.type='button';b.id=id;b.innerHTML=txt;b.addEventListener('click',function(){AX.gt(k);});return b;}
 var r=bt('awbRaven','\u2691 Corvo <span id="ravenBadge" class="awb-badge"></span>','raven');
 var cp=bt('awbCaptura','\u270e Captura','captura');
 if(pj&&pj.nextSibling){nav.insertBefore(cp,pj.nextSibling);nav.insertBefore(r,cp);}else{nav.appendChild(r);nav.appendChild(cp);}
 try{AX.gt&&0;}catch(e){}}
/* painel Finanças: abas do AxisHub (Mês, Previsão, Planejar, Metas) e backup no topo do painel */
var AX_FTABS=[['mes','Mês'],['previsao','Previsão'],['planejar','Planejar'],['desafios','Metas']];
function axFinTopo(){var top=document.querySelector('#painel-dir [data-pane="fin"]');if(!top||document.getElementById('pd-fin'))return;
 var w=document.createElement('div');w.id='pd-fin';w.className='pd-fin';
 w.innerHTML='<div class="pd-ft" role="tablist">'+AX_FTABS.map(function(t,i){return '<button type="button" role="tab" data-ftab="'+t[0]+'" aria-selected="'+(i===0)+'">'+t[1]+'</button>';}).join('')+'</div>'+
  '<span class="pd-bk"><button type="button" data-fbk="fin-exp">Exportar</button><button type="button" data-fbk="fin-imp">Importar</button></span>';
 top.insertBefore(w,top.firstChild);
 w.addEventListener('click',function(e){var t=e.target.closest('[data-ftab]');if(t){var k=t.getAttribute('data-ftab');AX.financas();var tb=AX.B.querySelector('.tab[data-tab="'+k+'"]');if(tb)tb.click();
   Array.prototype.forEach.call(w.querySelectorAll('[data-ftab]'),function(b){b.setAttribute('aria-selected',String(b===t));});var c=document.querySelector('#painel-dir .pd-corpo');if(c)c.scrollTop=0;return;}
  var k2=e.target.closest('[data-fbk]');if(k2){var b=AX.A.getElementById(k2.getAttribute('data-fbk'));if(b)b.click();}});}

function AXRUN(document,AXD,MutationObserver){


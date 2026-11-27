/* ==========================================================================
   Caneta: escrever e desenhar à mão na Folha livre da Ficha do Campista
   - camada de tinta por cima do papel (pontilhado, quadriculado, pautado, liso)
   - sensível à pressão; borracha (também a ponta-borracha da caneta); desfazer
   - com caneta de tablet, só a caneta escreve e o dedo rola a página
   - sem caneta (mouse ou dedo), o próprio ponteiro escreve
   - a tinta fica cifrada no cofre, com a mesma senha do diário (S.cofre.tinta)
   Depende de window.ASTRO (S, grava, cofre), exposto pelo index.html.
   ========================================================================== */
(function(){
"use strict";
var A=window.ASTRO;
if(!A||!A.cofre)return;

var CORES=[['#23314f','tinta azul-escura'],['#8c2f2a','tinta vermelha'],['#2f5d50','tinta verde'],['rgba(222,176,44,.38)','marca-texto','m']];
var ESP={fina:1.6,media:2.8};
var ST={on:false,cor:0,esp:'fina',borr:false,tr:[],desf:[],caneta:false,ok:false,salvoT:0,atual:null,rolar:null,borrando:false,removidos:null};
try{var P0=JSON.parse(localStorage.getItem('astro-caneta')||'{}');if(P0.cor>=0&&P0.cor<CORES.length)ST.cor=P0.cor;if(ESP[P0.esp])ST.esp=P0.esp;}catch(e){}
function prefs(){try{localStorage.setItem('astro-caneta',JSON.stringify({cor:ST.cor,esp:ST.esp}));}catch(e){}}

/* ---------- estilo ---------- */
var css=document.createElement('style');
css.textContent=[
 '.cn-wrap{position:relative}',
 '.cn-wrap>canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;border-radius:3px;z-index:2}',
 '.cn-wrap.on>canvas{pointer-events:auto;touch-action:none;cursor:crosshair}',
 '.cn-wrap.on.borr>canvas{cursor:cell}',
 '.cn-wrap.on .lv-tela{caret-color:transparent}',
 '.cn-wrap.tinta .lv-tela:empty::after{content:none}',
 '#lv .lv-ferr{flex-wrap:wrap;row-gap:6px}',
 '.cn-sep{width:1px;height:20px;background:var(--lv-linha,#c9b48a);margin:0 6px}',
 '.cn-ops{display:flex;align-items:center;gap:4px}',
 '.cn-ops[hidden]{display:none!important}',
 '#lv .lv-ferr button.cn-cor{width:24px;height:24px;border-radius:50%;border:1.5px solid rgba(60,35,12,.25);padding:0}',
 '#lv .lv-ferr button.cn-cor i{display:block;width:14px;height:14px;margin:auto;border-radius:50%}',
 '#lv .lv-ferr button.cn-cor[aria-pressed="true"]{border-color:var(--lv-cera,#8c2f2a);box-shadow:0 0 0 2px rgba(140,47,42,.15)}',
 '#lv .lv-ferr button.cn-esp b{display:block;border-radius:9px;background:currentColor}',
 '.cn-dica{flex-basis:100%;font-family:"EB Garamond",Georgia,serif;font-style:italic;font-size:13px;color:var(--lv-soft,#7a6a55)}'
].join('\n');
document.head.appendChild(css);

/* ---------- ícones (mesmo traço da barra do papel) ---------- */
function ico(d){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';}
var IC={
 caneta:ico('M15.5 4.5l4 4L9 19H5v-4z M13.5 6.5l4 4'),
 borr:ico('M8 20h11 M4.5 14.5l8-8a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8L11 18H7.5z M8 11l5 5'),
 desf:ico('M9 7L4.5 11.5 9 16 M5 11.5h9a5 5 0 0 1 0 10h-2'),
 limpa:ico('M5 7h14 M10 7V5h4v2 M7 7l1 12h8l1-12')
};

function el(id){return document.getElementById(id);}
function S(){try{return A.S;}catch(e){return null;}}
function msg(t){var m=el('lv-salvo');if(m)m.textContent=t;}

/* ---------- montagem na Folha livre ---------- */
var W={wrap:null,cv:null,cx:null,tela:null,ops:null,bt:null,dica:null,ro:null};
function monta(){
 var tela=el('lv-folha-ed');if(!tela)return false;
 if(W.tela===tela&&W.wrap&&W.wrap.isConnected)return true;
 var ferr=tela.parentNode&&tela.parentNode.querySelector('.lv-ferr');
 var wrap=document.createElement('div');wrap.className='cn-wrap';
 tela.parentNode.insertBefore(wrap,tela);wrap.appendChild(tela);
 var cv=document.createElement('canvas');cv.setAttribute('aria-label','tinta da folha');wrap.appendChild(cv);
 W.wrap=wrap;W.cv=cv;W.cx=cv.getContext('2d');W.tela=tela;
 if(ferr&&!ferr.querySelector('[data-cn]')){
  var n=ferr.querySelector('.lv-ferr-n');
  var h='<span class="cn-sep" aria-hidden="true"></span>'+
   '<button type="button" data-cn="on" title="Escrever à caneta" aria-label="Escrever à caneta" aria-pressed="false">'+IC.caneta+'</button>'+
   '<span class="cn-ops" hidden>'+
   CORES.map(function(c,i){return '<button type="button" class="cn-cor" data-cncor="'+i+'" title="'+c[1]+'" aria-label="'+c[1]+'" aria-pressed="'+(i===ST.cor)+'"><i style="background:'+c[0]+'"></i></button>';}).join('')+
   '<button type="button" class="cn-esp" data-cnesp="fina" title="Traço fino" aria-label="Traço fino" aria-pressed="'+(ST.esp==='fina')+'"><b style="width:4px;height:4px"></b></button>'+
   '<button type="button" class="cn-esp" data-cnesp="media" title="Traço médio" aria-label="Traço médio" aria-pressed="'+(ST.esp==='media')+'"><b style="width:8px;height:8px"></b></button>'+
   '<button type="button" data-cn="borr" title="Borracha" aria-label="Borracha" aria-pressed="false">'+IC.borr+'</button>'+
   '<button type="button" data-cn="desf" title="Desfazer" aria-label="Desfazer">'+IC.desf+'</button>'+
   '<button type="button" data-cn="limpa" title="Apagar toda a tinta" aria-label="Apagar toda a tinta">'+IC.limpa+'</button>'+
   '</span>';
  var tmp=document.createElement('span');tmp.innerHTML=h;
  while(tmp.firstChild)ferr.insertBefore(tmp.firstChild,n||null);
  var d=document.createElement('span');d.className='cn-dica';d.hidden=true;ferr.appendChild(d);
  ferr.addEventListener('click',barra);
  W.ops=ferr.querySelector('.cn-ops');W.bt=ferr.querySelector('[data-cn="on"]');W.dica=d;}
 /* o papel desenha por baixo; o canvas acompanha o tamanho da folha */
 if(W.ro)W.ro.disconnect();
 if(window.ResizeObserver){W.ro=new ResizeObserver(function(){tamanho();});W.ro.observe(wrap);}
 /* a tinta não vira a página: o gesto de arrastar fica com a caneta */
 ['touchstart','touchmove','touchend'].forEach(function(t){cv.addEventListener(t,function(e){if(ST.on)e.stopPropagation();},{passive:true});});
 cv.addEventListener('pointerdown',baixa);
 cv.addEventListener('pointermove',move);
 cv.addEventListener('pointerup',sobe);
 cv.addEventListener('pointercancel',sobe);
 cv.addEventListener('contextmenu',function(e){if(ST.on)e.preventDefault();});
 modo(false);tamanho();
 return true;}

function barra(e){var b=e.target.closest('button');if(!b)return;var a;
 if((a=b.getAttribute('data-cncor'))!=null){ST.cor=+a;ST.borr=false;prefs();pinta();return;}
 if((a=b.getAttribute('data-cnesp'))){ST.esp=a;ST.borr=false;prefs();pinta();return;}
 a=b.getAttribute('data-cn');if(!a)return;
 if(a==='on'){modo(!ST.on);return;}
 if(a==='borr'){ST.borr=!ST.borr;pinta();return;}
 if(a==='desf'){desfaz();return;}
 if(a==='limpa'){if(!ST.tr.length)return;ST.desf.push({t:'limpa',l:ST.tr.slice()});ST.tr=[];redesenha();guarda();msg('tinta apagada · dá para desfazer');}}

function modo(on){ST.on=!!on;if(!ST.on)ST.borr=false;pinta();
 if(W.dica){W.dica.hidden=!ST.on;W.dica.textContent=ST.caneta?'com caneta: só a ponta escreve; o dedo rola a página. Toque na caneta de novo para voltar ao texto.':'escreva com o mouse, o dedo ou a caneta. Toque na caneta de novo para voltar ao texto.';}
 if(ST.on&&W.tela&&document.activeElement===W.tela)W.tela.blur();}

function pinta(){if(!W.wrap)return;
 W.wrap.classList.toggle('on',ST.on);W.wrap.classList.toggle('borr',ST.on&&ST.borr);
 if(W.bt)W.bt.setAttribute('aria-pressed',String(ST.on));
 if(W.ops){W.ops.hidden=!ST.on;
  Array.prototype.forEach.call(W.ops.querySelectorAll('[data-cncor]'),function(b){b.setAttribute('aria-pressed',String(!ST.borr&&+b.getAttribute('data-cncor')===ST.cor));});
  Array.prototype.forEach.call(W.ops.querySelectorAll('[data-cnesp]'),function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-cnesp')===ST.esp));});
  var bb=W.ops.querySelector('[data-cn="borr"]');if(bb)bb.setAttribute('aria-pressed',String(ST.borr));}}

/* ---------- tamanho e desenho ---------- */
function largura(){return W.cv?W.cv.clientWidth:0;}
function tamanho(){var cv=W.cv;if(!cv)return;var r=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;
 var pw=Math.round(w*r),ph=Math.round(h*r);if(cv.width!==pw||cv.height!==ph){cv.width=pw;cv.height=ph;}
 W.cx.setTransform(r,0,0,r,0,0);altura();redesenha();}
/* a folha cresce para caber a tinta */
function altura(extra){if(!W.tela)return;var w=largura();if(!w)return;var max=0;
 ST.tr.forEach(function(s){for(var i=1;i<s.p.length;i+=3)if(s.p[i]>max)max=s.p[i];});
 var need=Math.max(460,Math.ceil(max*w+90+(extra||0)));
 var cur=parseFloat(W.tela.style.minHeight)||460;if(need>cur||(!extra&&need<cur-40))W.tela.style.minHeight=need+'px';}

function traco(cx,s,w){var p=s.p,n=p.length/3;if(!n)return;var cor=CORES[s.c]?CORES[s.c][0]:CORES[0][0],m=CORES[s.c]&&CORES[s.c][2]==='m';
 cx.strokeStyle=cor;cx.fillStyle=cor;cx.lineCap='round';cx.lineJoin='round';
 var lw=function(pr){return Math.max(.6,s.w*w*(m?1:(.45+pr*1.1)));};
 if(n===1){cx.beginPath();cx.arc(p[0]*w,p[1]*w,lw(p[2])/2,0,Math.PI*2);cx.fill();return;}
 if(m){cx.lineWidth=s.w*w;cx.beginPath();cx.moveTo(p[0]*w,p[1]*w);
  for(var j=1;j<n;j++){var mx=(p[(j-1)*3]+p[j*3])/2*w,my=(p[(j-1)*3+1]+p[j*3+1])/2*w;cx.quadraticCurveTo(p[(j-1)*3]*w,p[(j-1)*3+1]*w,mx,my);}
  cx.lineTo(p[(n-1)*3]*w,p[(n-1)*3+1]*w);cx.stroke();return;}
 var cx0=p[0]*w,cy0=p[1]*w;
 if(n===2){cx.lineWidth=lw((p[2]+p[5])/2);cx.beginPath();cx.moveTo(cx0,cy0);cx.lineTo(p[3]*w,p[4]*w);cx.stroke();return;}
 for(var i=1;i<n-1;i++){var x1=p[i*3]*w,y1=p[i*3+1]*w,mx2=(x1+p[(i+1)*3]*w)/2,my2=(y1+p[(i+1)*3+1]*w)/2;
  cx.lineWidth=lw(p[i*3+2]);cx.beginPath();cx.moveTo(cx0,cy0);cx.quadraticCurveTo(x1,y1,mx2,my2);cx.stroke();cx0=mx2;cy0=my2;}
 cx.lineWidth=lw(p[(n-1)*3+2]);cx.beginPath();cx.moveTo(cx0,cy0);cx.lineTo(p[(n-1)*3]*w,p[(n-1)*3+1]*w);cx.stroke();}
function redesenha(){var cx=W.cx,cv=W.cv;if(!cx)return;var w=largura();cx.clearRect(0,0,cv.width,cv.height);
 if(W.wrap)W.wrap.classList.toggle('tinta',ST.tr.length>0||!!ST.atual);
 ST.tr.forEach(function(s){traco(cx,s,w);});if(ST.atual)traco(cx,ST.atual,w);}

/* ---------- ponteiro ---------- */
function ponto(e){var r=W.cv.getBoundingClientRect(),w=r.width||1;
 var pr=e.pointerType==='pen'?(e.pressure>0?e.pressure:.5):.5;
 return [(e.clientX-r.left)/w,(e.clientY-r.top)/w,pr];}
function ehBorracha(e){return ST.borr||(e.pointerType==='pen'&&((e.buttons&32)||e.button===5));}
function baixa(e){if(!ST.on)return;
 if(e.pointerType==='pen'&&!ST.caneta){ST.caneta=true;modo(true);}
 /* palma e dedo: com caneta, o dedo só rola a folha */
 if(e.pointerType==='touch'&&ST.caneta){var f=W.wrap.closest('.lv-folha');ST.rolar={y:e.clientY,f:f,id:e.pointerId};try{W.cv.setPointerCapture(e.pointerId);}catch(z){}e.preventDefault();return;}
 if(ST.atual)return;
 e.preventDefault();try{W.cv.setPointerCapture(e.pointerId);}catch(z){}
 if(ehBorracha(e)){ST.borrando=e.pointerId;ST.removidos=[];apaga(ponto(e));return;}
 var q=ponto(e);ST.atual={c:ST.cor,w:(CORES[ST.cor][2]==='m'?14:ESP[ST.esp])/largura(),p:q,id:e.pointerId};redesenha();}
function move(e){if(!ST.on)return;
 if(ST.rolar&&e.pointerId===ST.rolar.id){var dy=e.clientY-ST.rolar.y;ST.rolar.y=e.clientY;if(ST.rolar.f)ST.rolar.f.scrollTop-=dy;return;}
 if(ST.borrando===e.pointerId){apaga(ponto(e));return;}
 var s=ST.atual;if(!s||s.id!==e.pointerId)return;e.preventDefault();
 var lista=e.getCoalescedEvents?e.getCoalescedEvents():[e];if(!lista.length)lista=[e];
 var w=largura(),cx=W.cx;
 lista.forEach(function(ev){var q=ponto(ev),n=s.p.length;var lx=s.p[n-3],ly=s.p[n-2];
  if(Math.hypot((q[0]-lx)*w,(q[1]-ly)*w)<.9)return;s.p.push(q[0],q[1],q[2]);});
 redesenhaFim(s,w,cx);
 var h=W.cv.clientHeight;if(s.p[s.p.length-2]*w>h-70)altura(260);}
/* desenha só o pedaço novo do traço, sem refazer a folha inteira */
function redesenhaFim(s,w,cx){var n=s.p.length/3;if(n<2)return;
 if(CORES[s.c]&&CORES[s.c][2]==='m'){redesenha();return;}
 var k=Math.max(0,n-3),sub={c:s.c,w:s.w,p:s.p.slice(k*3)};traco(cx,sub,w);}
function sobe(e){
 if(ST.rolar&&e.pointerId===ST.rolar.id){ST.rolar=null;return;}
 if(ST.borrando===e.pointerId){ST.borrando=false;if(ST.removidos&&ST.removidos.length){ST.desf.push({t:'apaga',l:ST.removidos});guarda();}ST.removidos=null;return;}
 var s=ST.atual;if(!s||s.id!==e.pointerId)return;ST.atual=null;delete s.id;
 s.p=s.p.map(function(v,i){return i%3===2?Math.round(v*10)/10:Math.round(v*10000)/10000;});
 ST.tr.push(s);ST.desf.push({t:'add',s:s});if(ST.desf.length>200)ST.desf.shift();
 redesenha();altura();guarda();}
function apaga(q){var w=largura(),r=10,ant=ST.tr.length;
 ST.tr=ST.tr.filter(function(s){for(var i=0;i<s.p.length;i+=3){if(Math.hypot((s.p[i]-q[0])*w,(s.p[i+1]-q[1])*w)<r+s.w*w){ST.removidos.push(s);return false;}}return true;});
 if(ST.tr.length!==ant)redesenha();}
function desfaz(){var a=ST.desf.pop();if(!a)return;
 if(a.t==='add'){var i=ST.tr.lastIndexOf(a.s);if(i>=0)ST.tr.splice(i,1);}
 else if(a.t==='apaga'||a.t==='limpa'){ST.tr=ST.tr.concat(a.l);}
 redesenha();altura();guarda();}

/* ---------- guardar e carregar (cifrado no cofre) ---------- */
function guarda(){clearTimeout(ST.salvoT);msg('…');
 ST.salvoT=setTimeout(async function(){var s=S();if(!s||!s.cofre||!A.cofre.aberto())return;
  try{var j=JSON.stringify({v:1,tr:ST.tr});s.cofre.tinta=ST.tr.length?await A.cofre.cifra(j):null;if(!ST.tr.length)delete s.cofre.tinta;A.grava();msg('tinta guardada');}
  catch(e){msg('não consegui guardar a tinta');}},900);}
async function carrega(){ST.ok=true;var s=S(),o=s&&s.cofre&&s.cofre.tinta;ST.tr=[];ST.desf=[];
 if(o){try{var d=JSON.parse(await A.cofre.decifra(o));if(d&&Array.isArray(d.tr))ST.tr=d.tr.filter(function(t){return t&&Array.isArray(t.p);});}catch(e){ST.tr=[];}}
 tamanho();}
function esquece(){ST.tr=[];ST.desf=[];ST.atual=null;ST.ok=false;clearTimeout(ST.salvoT);if(ST.on)modo(false);redesenha();
 if(W.tela)W.tela.style.minHeight='';}

/* ---------- vigia: a Folha livre aparece quando o livro abre ---------- */
function vigia(){
 var aberto=false;try{aberto=A.cofre.aberto();}catch(e){}
 if(!aberto){if(ST.ok||ST.tr.length)esquece();return;}
 if(!monta())return;
 var sec=W.wrap.closest('.lv-folha'),livro=el('lv-livro');
 var visivel=sec&&!sec.hidden&&(!livro||!livro.hidden);
 if(visivel&&!ST.ok)carrega();
 else if(visivel&&W.cv&&W.cv.width!==Math.round(W.cv.clientWidth*(window.devicePixelRatio||1)))tamanho();}
setInterval(vigia,700);
document.addEventListener('visibilitychange',vigia);
vigia();

/* atalho de teclado: Ctrl+Z desfaz a tinta quando a caneta está ligada */
document.addEventListener('keydown',function(e){if(!ST.on)return;if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&(e.key==='z'||e.key==='Z')){e.preventDefault();desfaz();}});
})();

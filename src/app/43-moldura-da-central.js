/* ======================= Moldura da central: frontão, pilares e base do templo do tema =======================
   Um módulo só para a moldura das abas da central (Manual e os seis painéis). As peças vêm do próprio templo do
   tema: o frontão (.neo-frontao, sem a placa de navegação) e os pilares (fundos de capitel, fuste e base da .bn-slot)
   são copiados com o estilo já calculado pelo navegador, então a moldura muda com o tema sem repetir regras.
   A base é a cornija do frontão, esticada no pé. Camadas: fundo escuro (328) · moldura (329) · folha (330/331). */
var MOLD=null,MOLD_K='';
function moldCopia(a){var b=a.cloneNode(false);
 if(a.nodeType===1){b.removeAttribute('id');var cs=getComputedStyle(a),t='';for(var i=0;i<cs.length;i++){var p=cs[i];t+=p+':'+cs.getPropertyValue(p)+';';}b.setAttribute('style',t);if(!/^(svg|img|path|g|circle|rect|text|use|polygon|line|ellipse)$/i.test(a.tagName))b.style.overflow='visible';b.removeAttribute('class');
  [].forEach.call(b.attributes,function(x){if(/^(data-|on|aria-)/.test(x.name))b.removeAttribute(x.name);});}
 [].forEach.call(a.childNodes,function(n){if(n.nodeType===1&&(n.classList.contains('pd-pilula')||n.matches('button,input,select,textarea')))return;b.appendChild(n.nodeType===1?moldCopia(n):n.cloneNode(true));});return b;}
function moldMonta(){if(MOLD)return MOLD;var hb=document.getElementById('hero-box'),f=hb&&hb.querySelector('.neo-frontao'),sl=hb&&hb.querySelector('.bn-slot');if(!f||!sl)return null;
 var r=f.getBoundingClientRect();if(!r.width||!r.height)return null;
 var fc=moldCopia(f);fc.style.margin='0';fc.style.position='absolute';fc.style.left='0';fc.style.top='0';fc.style.width=r.width+'px';fc.style.height=r.height+'px';fc.style.transformOrigin='0 0';fc.style.overflow='visible';
 var cor=f.querySelector('.nf-cornija'),cr=cor&&cor.getBoundingClientRect(),cc=cor?moldCopia(cor):null;
 if(cc){cc.style.position='absolute';cc.style.left='0';cc.style.top='0';cc.style.margin='0';cc.style.width=cr.width+'px';cc.style.height=cr.height+'px';cc.style.transformOrigin='0 0';}
 var s=getComputedStyle(sl),pw=parseFloat(String(s.backgroundSize).split(',')[0])||44;
 /* quanto as peças do frontão passam da caixa dele (letreiros e acrotérios), para caber inteiro na moldura */
 var exL=0,exR=0;[].forEach.call(f.querySelectorAll('*'),function(n){if(n.closest('.pd-pilula'))return;var q=n.getBoundingClientRect();if(!q.width)return;exL=Math.max(exL,r.left-q.left);exR=Math.max(exR,q.right-r.right);});
 var pap=getComputedStyle(hb).backgroundColor;if(!pap||/rgba\(0, 0, 0, 0\)|transparent/.test(pap))pap='#f4ead2';
 MOLD={pap:pap,exL:Math.ceil(exL),exR:Math.ceil(exR),w:r.width,h:r.height,front:fc,base:cc,bw:cr?cr.width:0,bh:cr?Math.max(10,cr.height):14,pw:pw,
  pil:{backgroundImage:s.backgroundImage,backgroundSize:s.backgroundSize,backgroundPosition:s.backgroundPosition,backgroundRepeat:s.backgroundRepeat}};
 return MOLD;}
/* qual aba da central está aberta agora (o Templo já tem a moldura dele) */
function moldAba(){var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on')&&cx.classList.contains('mf'))return 'manual';try{var k=ctAtiva();return k&&CT_PD.indexOf(k)>=0?k:'';}catch(e){return '';}}
function moldPinta(forca){var at=moldAba(),k=at+'|'+innerWidth+'x'+innerHeight;if(k===MOLD_K&&!forca)return;MOLD_K=k;
 var el=document.getElementById('ct-mold'),fd=document.getElementById('ct-mold-fundo'),M=at?moldMonta():null;
 if(!at||!M){document.body.classList.remove('com-moldura');if(el)el.hidden=true;if(fd)fd.hidden=true;return;}
 if(!el){fd=document.createElement('div');fd.id='ct-mold-fundo';document.body.appendChild(fd);
  el=document.createElement('div');el.id='ct-mold';el.setAttribute('aria-hidden','true');el.setAttribute('data-notr','');el.innerHTML='<div class="cm-front"></div><div class="cm-pil"></div><div class="cm-base"></div>';document.body.appendChild(el);
  Object.keys(M.pil).forEach(function(p){el.querySelector('.cm-pil').style[p]=M.pil[p];});}
 el.hidden=false;fd.hidden=false;document.body.classList.add('com-moldura');
 var W=el.getBoundingClientRect().width,kf=W/(M.w+M.exL+M.exR),th=Math.round(M.h*kf),fr=el.querySelector('.cm-front');
 fr.style.setProperty('--mold-pap',M.pap);fr.innerHTML=(TV_ON||EG_ON)?'':'<i class="cm-tim"></i>';var c=M.front.cloneNode(true);c.style.transform='translateX('+(M.exL*kf)+'px) scale('+kf+')';fr.appendChild(c);fr.style.height=th+'px';
 var bs=el.querySelector('.cm-base');bs.innerHTML='';if(M.base){var b=M.base.cloneNode(true);b.style.transform='scale('+(W/M.bw)+',1)';bs.appendChild(b);}
 var R=document.documentElement.style;R.setProperty('--mold-t',th+'px');R.setProperty('--mold-s',(M.pw+10)+'px');R.setProperty('--mold-b',M.bh+'px');}
setInterval(function(){try{moldPinta(false);}catch(e){}},250);
window.addEventListener('resize',function(){try{moldPinta(true);}catch(e){}});

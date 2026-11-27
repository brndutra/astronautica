/* ======================= Moldura da central: o próprio templo do tema =======================
   A moldura de todas as abas da central é o templo de verdade (#hero-box): frontão, pilares e a faixa da base
   com semana, mês e diário de bordo, todos funcionando. Nada é copiado.
   body.ct-on     central aberta: fundo escuro (#ct-fundo) e a .wrap vira folha fixa e centralizada, com zoom
                  para o templo caber inteiro na altura da tela.
   body.ct-templo Mural, Programação ou Rastreio (o 42 marca qual). Só o #hero-box fica na .wrap; a grade da
                  Programação (.wrap>.tb) entra no miolo pelo 31/32, e o Rastreio (.wrap>.rt com a base #rt-base) é
                  posto no miolo daqui (--ct-rx/ry/rw/rh/rb, em medidas da .wrap).
   body.ct-painel Manual ou um dos seis painéis: da .wrap fica só o #hero-box, e a folha da aba cobre o miolo
                  entre os pilares, do frontão até a faixa da base (--ct-x/y/w/h, medidos aqui).
   A barra de abas (#ct-barra) fica no lugar da placa de navegação do frontão (que some na central),
   com as cores da placa do tema (--placa-*, no 32). Camadas: fundo 328 · templo 329 · folha 331 · barra 333. */
function ctAba(){var B=document.body;if(B.classList.contains('ct-templo'))return B.classList.contains('ct-rast')?'rast':BN_TELA==='prog'?'prog':'mural';
 var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on')&&cx.classList.contains('mf'))return 'manual';
 try{var k=ctAtiva();return k&&CT_PD.indexOf(k)>=0?k:'';}catch(e){return '';}}
var CT_PLACA=30;
function ctPx(el,p,v){var t=Math.round(v*100)/100+'px';if(el.style.getPropertyValue(p)!==t)el.style.setProperty(p,t,'important');}
function ctMoldura(){var at=ctAba(),B=document.body,on=!!at,w=document.querySelector('.wrap'),hb=document.getElementById('hero-box');
 if(!w||!hb)on=false;
 B.classList.toggle('ct-on',on);B.classList.toggle('ct-painel',on&&CT_TP.indexOf(at)<0);
 var fd=document.getElementById('ct-fundo'),br=document.getElementById('ct-barra');
 if(!on){if(fd)fd.hidden=true;if(br)br.hidden=true;if(w&&w._ctz){w._ctz=0;['zoom','left','top','width','height'].forEach(function(p){w.style.removeProperty(p);});}return;}
 if(!fd){fd=document.createElement('div');fd.id='ct-fundo';document.body.appendChild(fd);fd.addEventListener('click',ctFecha);}
 if(!br){br=document.createElement('div');br.id='ct-barra';br.setAttribute('data-notr','');br.innerHTML='<nav class="ct-abas" role="tablist"></nav><button type="button" class="ct-tx" aria-label="fechar">✕</button>';document.body.appendChild(br);
  br.querySelector('.ct-tx').addEventListener('click',ctFecha);}
 fd.hidden=false;br.hidden=false;
 var nav=br.querySelector('.ct-abas'),h=ctAbasHTML(at);if(nav._h!==h){nav.innerHTML=h;nav._h=h;}
 /* folha: mesma largura de sempre; zoom para o #hero-box inteiro caber na altura (as medidas da .wrap vão divididas pelo zoom) */
 var L=Math.max(16,innerWidth/2-620),W=innerWidth-2*L,H=innerHeight-28;if(innerWidth<=760){L=0;W=innerWidth;H=innerHeight;}
 var z=w.currentCSSZoom||1,hh=hb.getBoundingClientRect().height/z,k=Math.min(1,Math.max(.55,Math.floor(H/hh*100)/100));
 if(Math.abs(k-(w._ctz||0))>.004){w._ctz=k;w.style.setProperty('zoom',String(k),'important');}
 /* papel do templo só do frontão para baixo: em volta do telhado aparece o fundo escuro */
 var fr=(hb.querySelector('.neo-frontao')||hb).getBoundingClientRect(),wr=w.getBoundingClientRect(),ft=Math.round((fr.bottom-wr.top)/k+w.scrollTop-4)+'px';
 /* o papel termina no pé da faixa da base */
 var rdb=hb.querySelector('.bn-rod'),fb=rdb&&rdb.offsetParent?Math.round((rdb.getBoundingClientRect().bottom-wr.top)/k+w.scrollTop)+'px':'100000px';
 if(w.style.getPropertyValue('--ct-fb')!==fb)w.style.setProperty('--ct-fb',fb);
 if(w.style.getPropertyValue('--ct-ft')!==ft)w.style.setProperty('--ct-ft',ft);
 if(!w._ctp){var bg=getComputedStyle(document.body).backgroundColor;w._ctp=(!bg||/rgba\(0, 0, 0, 0\)/.test(bg))?'#f4ead2':bg;w.style.setProperty('--ct-papel',w._ctp);}
 ctPx(w,'left',L/k);ctPx(w,'top',(innerWidth<=760?0:14)/k);ctPx(w,'width',W/k);ctPx(w,'height',H/k);
 /* a distância da placa ao pé do frontão fica guardada: com um painel aberto, a placa sai do frontão (vai para o topo do painel, no 30) */
 var pl=hb.querySelector('.nf2>.pd-pilula'),nr=nav.getBoundingClientRect(),zz=hb.currentCSSZoom||1;
 if(pl){var pr=pl.getBoundingClientRect();if(pr.height)CT_PLACA=(pr.top+pr.height/2-fr.bottom)/zz;}
 var cy=Math.max(fr.bottom+CT_PLACA*zz,(innerWidth<=760?6:14)+nr.height/2);
 br.style.setProperty('--ct-by',Math.round(cy)+'px');br.style.setProperty('--ct-L',L+'px');
 /* miolo entre os pilares: do pé da barra até o topo da faixa da base */
 var vx=hb.querySelector('.vx-hero')||hb,vr=vx.getBoundingClientRect(),rd=hb.querySelector('.bn-rod'),rr=rd&&rd.offsetParent?rd.getBoundingClientRect():null;
 var y=Math.max(vr.top,cy+nr.height/2+8),y2=rr?rr.top-8:vr.bottom,R=document.documentElement.style;
 R.setProperty('--ct-x',Math.round(vr.left)+'px');R.setProperty('--ct-w',Math.round(vr.width)+'px');R.setProperty('--ct-y',Math.round(y)+'px');R.setProperty('--ct-h',Math.max(120,Math.round(y2-y))+'px');
 /* Rastreio no miolo, com a base de hábito semanal (#rt-base) no pé; medidas na escala da .wrap */
 if(at==='rast'){var rb=document.getElementById('rt-base'),rbh=rb?rb.offsetHeight+10:0;
  [['--ct-rx',(vr.left-wr.left)/k],['--ct-ry',(y-wr.top)/k],['--ct-rw',vr.width/k],['--ct-rh',(y2-y)/k-rbh],['--ct-rb',(y2-wr.top)/k-rbh+10]].forEach(function(v){var t=Math.round(v[1])+'px';if(w.style.getPropertyValue(v[0])!==t)w.style.setProperty(v[0],t);});}}
setInterval(function(){try{ctMoldura();}catch(e){}},250);
window.addEventListener('resize',function(){try{ctMoldura();}catch(e){}});

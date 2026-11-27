/* ===== rodada: degraus de pilar a pilar no tom dos pilares, placa das telas no topo do banner (cópia da placa do 2º painel),
   telas renomeadas, pílula do frontão 2 + 2 com ornamento no meio, sidekick ao lado do modo noturno, 2º painel grego laranja, fotos paradas ===== */
ABAS_NOMES.vis=TV_ON?'Sonhos de Baldr':EG_ON?'Visões de Ísis':'Sonhos de Morfeu';
ABAS_NOMES.prog=TV_ON?'Carro de Dagr':EG_ON?'Horas de Rá':'Dança das Horas';
bnTelaBotoes=function(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;
 var w=document.querySelector('#hero-box .bn-telas');if(!w){w=document.createElement('div');w.className='bn-telas';w.setAttribute('role','tablist');w.setAttribute('data-notr','');}
 if(w.parentNode!==h)h.appendChild(w);w.classList.remove('no-front');w.classList.add('bn-placa');
 var x='<button type="button" role="tab" data-bntela="visao" aria-selected="'+(BN_TELA!=='prog')+'">'+ABAS_NOMES.vis+'</button><i aria-hidden="true">·</i><button type="button" role="tab" data-bntela="prog" aria-selected="'+(BN_TELA==='prog')+'">'+ABAS_NOMES.prog+'</button>';
 if(w._h!==x||!w.firstChild){w.innerHTML=x;w._h=x;}
 var ref=document.getElementById('h-rast');if(ref){var c=getComputedStyle(ref),sp=ref.querySelector('span'),cs=sp?getComputedStyle(sp):null;
  var v=[c.backgroundImage,c.backgroundColor,c.borderTopColor,c.borderTopWidth,c.boxShadow,c.color,cs?cs.color:c.color].join('|');
  if(w._ref!==v){w._ref=v;w.style.setProperty('--pl-bgi',c.backgroundImage);w.style.setProperty('--pl-bgc',c.backgroundColor);w.style.setProperty('--pl-bd',c.borderTopWidth+' solid '+c.borderTopColor);w.style.setProperty('--pl-sh',c.boxShadow);w.style.setProperty('--pl-cor',c.color);w.style.setProperty('--pl-sub',cs?cs.color:c.color);}}};
/* sidekick ao lado do modo noturno */
function sidekickMove(){var sk=document.querySelector('.sat-ic[data-satir]'),mo=document.getElementById('tema-ic');if(!sk||!mo)return;if(mo.nextElementSibling!==sk)mo.insertAdjacentElement('afterend',sk);sk.classList.add('sk-topo');}
/* pílula do frontão: dois de cada lado com um ornamento no meio */
var PIL_ORN=TV_ON?'ᛟ':EG_ON?'☥':'✦';
function pilulaOrn(){var p=document.querySelector('#hero-box .pd-pilula');if(!p)return;var bs=p.querySelectorAll(':scope > button.tt-ic:not(.sat-ic)'),o=p.querySelector(':scope > .pil-orn');
 if(!o){o=document.createElement('span');o.className='pil-orn';o.setAttribute('aria-hidden','true');o.textContent=PIL_ORN;}
 if(bs.length>=4){if(bs[1].nextElementSibling!==o)bs[1].insertAdjacentElement('afterend',o);}else if(o.parentNode)o.remove();}
/* 2º painel do Acampamento com moldura laranja */
function rtLaranja(){if(TV_ON||EG_ON||typeof COL_PAINEL==='undefined')return;var cf=COL_PAINEL.rt;if(!cf||cf.k==='#1f4e8a')return;cf.c='#bcd0ec';cf.k='#1f4e8a';try{delete COL_CACHE.rt;}catch(e){}
 var n=document.querySelector(cf.q);if(n){n.dataset.col='';}try{colAplica();}catch(e){}var h=document.getElementById('h-rast');if(h){h.style.setProperty('--pk','#1f4e8a');h.style.setProperty('--pc','#bcd0ec');}}
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{sidekickMove();pilulaOrn();}catch(e){}return x;};})();
setTimeout(function(){try{sidekickMove();pilulaOrn();rtLaranja();bnTelaBotoes();}catch(e){}},1400);setInterval(function(){try{sidekickMove();pilulaOrn();rtLaranja();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='bn-rodada2-css';var R='#hero-box#hero-box>.bn-rod',P='#hero-box#hero-box .bn-telas.bn-placa';
 var pal=TV_ON?{c1:'#dcc09a',c2:'#c49c6e',k:'#5a3c22',h:'#efdcbf'}:EG_ON?{c1:'#3a5f9e',c2:'#2a4c86',k:'#c9a23a',h:'#6f8fc6'}:{c1:'#f6dfa6',c2:'#e9c97c',k:'#8a5a14',h:'#fff1c8'};
 st.textContent=[
 /* placa das telas, no centro do friso superior do banner */
 P+'{position:absolute!important;left:50%!important;top:0!important;transform:translate(-50%,-50%)!important;z-index:33;display:flex!important;align-items:baseline;gap:8px;width:auto!important;margin:0!important;padding:4px 22px 3px!important;border-radius:0!important;',
 ' border:var(--pl-bd,1.5px solid #5a3f2c)!important;background-image:var(--pl-bgi,none)!important;background-color:var(--pl-bgc,#f4ead2)!important;box-shadow:var(--pl-sh,none)!important;white-space:nowrap}',
 P+' button{width:auto!important;min-height:0!important;height:auto!important;margin:0!important;padding:0 2px!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;cursor:pointer;',
 ' font:400 13px Georgia,serif!important;font-variant:small-caps;letter-spacing:.04em!important;text-transform:none!important;color:var(--pl-sub,#8a6f55)!important}',
 P+' button[aria-selected=true]{font:700 15px Georgia,serif!important;font-variant:normal;color:var(--pl-cor,#2a2418)!important}',
 P+' button:not([aria-selected=true]):hover{text-decoration:underline;text-underline-offset:3px}',
 P+' i{font-style:normal;color:var(--pl-sub,#9a6b3a)}',
 /* faixa de pilar a pilar, estática, no tom dos pilares */
 R+'{margin:0 14px 24px!important;padding:8px 52px 9px!important;border:0!important;border-top:2px solid '+pal.k+'!important;border-bottom:1px solid '+pal.k+'!important;background:linear-gradient(180deg,'+pal.h+' 0 3px,'+pal.c1+' 3px,'+pal.c2+')!important;box-shadow:inset 0 -2px 0 rgba(0,0,0,.08)!important;gap:10px!important;transition:none!important}',
 R+'::after{left:-8px;right:-8px;bottom:-11px;height:10px;background:linear-gradient(180deg,'+pal.c1+','+pal.c2+')!important;border-top:1px solid '+pal.k+'!important;box-shadow:none!important}',
 R+'::before{left:-16px;right:-16px;bottom:-22px;height:10px;background:linear-gradient(180deg,'+pal.c2+','+pal.c2+')!important;border-top:1px solid '+pal.k+'!important;box-shadow:none!important}',
 '#hero-box>.bn-rod .br-k{color:'+(EG_ON?'#f3e2b0':pal.k)+'!important}',
 '#hero-box>.bn-rod .br-db{border-left:1px solid '+pal.k+'!important;min-width:260px}',
 '#hero-box>.bn-rod .br-slot{min-width:150px}',
 '#hero-box#hero-box>.bn-rod .br-gav button{padding:2px 10px!important}',
 '#hero-box#hero-box>.bn-rod .br-gav b{font-size:12px}',
 '@media(max-width:1379px){'+R+'{margin:0 0 24px!important;padding:8px 12px 9px!important}}',
 /* pílula: 2 + ornamento + 2 */
 '#hero-box .pd-pilula .pil-orn{display:grid;place-items:center;width:26px;font:400 15px Georgia,serif;color:#a37a2c;pointer-events:none}',
 'body.tv #hero-box .pd-pilula .pil-orn{color:#d4ad4f}body.eg #hero-box .pd-pilula .pil-orn{color:#c9a23a}',
 /* sidekick ao lado do modo noturno */
 '.bn-row>.sat-ic.sk-topo{position:relative!important;margin:0 0 0 6px!important}',
 /* fotos do quadro de visão paradas: não recentralizam quando a afirmação muda de tamanho */
 '#hero-box .bn-visao{align-items:start!important}',
 '#hero-box .bv-af{min-height:150px;box-sizing:border-box}',
 '#hero-box .bv-fotos .bv-foto{transition:none!important}',
 '#hero-box .bv-fotos .bv-foto:hover{transition:transform .2s!important}'
].join('\n');document.head.appendChild(st);})();

/* ajustes: placa das telas dentro do friso; Rastreados ao lado do mês; Hoje/Compromissos fixo no pé do templo; sem vão antes do rodapé */
(function(){var d=document.querySelectorAll('.sat-ic[data-ic="sat"]');for(var i=1;i<d.length;i++)d[i].remove();})();
function rastreadosNaLinha(){var h=document.getElementById('h-rast'),rt=document.querySelector('.wrap > div.rt'),cab=rt&&rt.querySelector(':scope > .cab');if(!h||!cab)return;if(cab.firstElementChild!==h)cab.insertBefore(h,cab.firstChild);}
function semVao(){var r=document.getElementById('rod-apps'),w=document.querySelector('.wrap');if(!w)return;var hh=0;if(r&&getComputedStyle(r).display!=='none'&&!r.classList.contains('aberto'))hh=r.offsetHeight;var tk=document.getElementById('pz-ticker');if(tk&&tk.offsetParent&&getComputedStyle(tk).position==='fixed'&&!(r&&r.contains(tk)))hh+=tk.offsetHeight;
 var v=Math.max(0,hh)+'px';if(document.body.style.getPropertyValue('--rod-h')!==v)document.body.style.setProperty('--rod-h',v);}
setTimeout(function(){try{rastreadosNaLinha();semVao();}catch(e){}},1500);setInterval(function(){try{rastreadosNaLinha();semVao();}catch(e){}},1500);
window.addEventListener('resize',function(){try{semVao();}catch(e){}});
(function(){var st=document.createElement('style');st.id='ajustes3-css';var T='html body.tela-prog div.wrap>div.tb.tb:not(#x1):not(#x2)';st.textContent=[
 '#hero-box#hero-box .bn-telas.bn-placa{top:8px!important;transform:translateX(-50%)!important}',
 /* Rastreados à esquerda do mês */
 '.wrap>div.rt>.cab{display:flex!important;align-items:center!important;gap:14px!important;flex-wrap:wrap}',
 '.wrap>div.rt>.cab>#h-rast{order:-1;position:static!important;display:inline-flex!important;align-items:baseline;gap:6px;width:auto!important;max-width:none!important;margin:0 6px 0 0!important;transform:none!important;left:auto!important;top:auto!important;flex:none}',
 /* Hoje · Compromissos: painel de tamanho fixo no pé do templo, de lado a lado */
 T+' #comp-rod{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin:12px 0 0!important;height:210px!important;overflow-y:auto!important;scrollbar-width:thin}',
 /* sem vão entre o último templo e o rodapé */
 '.wrap{padding-bottom:var(--rod-h,0px)!important}',
 '.wrap>:last-child{margin-bottom:0!important}',
 'body.com-rodape{padding-bottom:0!important}'
].join('\n');document.head.appendChild(st);})();

/* Arsenal: a placa das abas aparece por cima do entablamento, com o mesmo visual da placa das outras faces; sidekick legível no topo */
function tsPlacaVisu(){var ts=document.querySelector('#tp-real>#tesouro>.ts-cab'),ref=document.querySelector('#tp-real>#tm-painel>.tm-cab')||document.querySelector('#tp-real>#recreio>.tm-cab');if(!ts||!ref)return;var c=getComputedStyle(ref);
 var v=[c.backgroundImage,c.backgroundColor,c.borderTopWidth,c.borderTopColor,c.boxShadow,c.borderRadius].join('|');if(ts._v===v)return;ts._v=v;
 ts.style.setProperty('background-image',c.backgroundImage,'important');ts.style.setProperty('background-color',c.backgroundColor,'important');ts.style.setProperty('border',c.borderTopWidth+' solid '+c.borderTopColor,'important');ts.style.setProperty('box-shadow',c.boxShadow,'important');ts.style.setProperty('border-radius',c.borderRadius,'important');}
setInterval(function(){try{tsPlacaVisu();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='ts-placa-css';st.textContent=[
 '#tp-real>#tesouro>.ts-cab{z-index:40!important;width:max-content!important;max-width:calc(100% - 28px)!important}',
 '.bn-row>.sat-ic.sk-topo{display:inline-flex!important;align-items:center;gap:4px;width:auto!important;height:34px!important;min-width:34px;padding:0 8px!important;border-radius:10px!important}',
 '.bn-row>.sat-ic.sk-topo svg{display:block!important;width:18px!important;height:18px!important;flex:none}'
].join('\n');document.head.appendChild(st);})();

/* Panteão: cada personagem/objeto ganha imagem escolhida por você (miniatura na tabela) e uma ficha expandida com tudo o que se sabe dele */
var PT_TEMAS=['Acampamento Meio-Sangue','Hotel Valhala','Casa do Brooklyn'];
function ptK(papel,i){return papel+'|'+i;}
function ptD(){S.ptImg=S.ptImg||{};S.ptNota=S.ptNota||{};return S;}
function ptLinha(papel){for(var g=0;g<PANTEAO.length;g++)for(var r=0;r<PANTEAO[g][1].length;r++)if(PANTEAO[g][1][r][0]===papel)return {g:PANTEAO[g][0],r:PANTEAO[g][1][r]};return null;}
function ptFichaExtra(papel,i){var at=TV_ON?2:EG_ON?3:1;if(papel==='Guardião'&&i===at&&typeof COMP_T!=='undefined'&&COMP_T&&COMP_T.ficha)return COMP_T.ficha;
 if(papel==='Mensageiro'&&i===at&&typeof COMP_T!=='undefined'&&COMP_T&&COMP_T.bio)return [['bio',COMP_T.bio]];return null;}
function ptDetHTML(papel){var L=ptLinha(papel);if(!L)return '';ptD();var ex=function(x){return String(x||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
 return '<div class="pt-det-g">'+[1,2,3].map(function(i){var k=ptK(papel,i),im=S.ptImg[k],fx=ptFichaExtra(papel,i);
  return '<section class="pt-det-c"><button type="button" class="pt-img" data-ptimg="'+ex(k)+'" title="'+(im?'trocar a imagem':'escolher uma imagem')+'">'+(im?'<img src="'+im+'" alt="">':'<span><b>+</b>imagem</span>')+'</button>'+
   (im?'<button type="button" class="pt-img-x" data-ptimgx="'+ex(k)+'" aria-label="tirar a imagem">×</button>':'')+
   '<span class="pt-det-t">'+PT_TEMAS[i-1]+'</span><b class="pt-det-n">'+ex(L.r[i])+'</b>'+
   '<dl><dt>papel</dt><dd>'+ex(L.r[0])+'</dd><dt>grupo</dt><dd>'+ex(L.g)+'</dd>'+(L.r[4]?'<dt>no app</dt><dd>'+ex(L.r[4])+'</dd>':'')+(fx?fx.map(function(x){return '<dt>'+ex(x[0])+'</dt><dd>'+ex(x[1])+'</dd>';}).join(''):'')+'</dl>'+
   '<label class="pt-nota"><span>suas anotações</span><textarea data-ptnota="'+ex(k)+'" rows="3" placeholder="o que mais você quer guardar sobre ele">'+ex(S.ptNota[k]||'')+'</textarea></label></section>';}).join('')+'</div>';}
function ptMiniaturas(){var w=document.getElementById('panteao');if(!w)return;ptD();Array.prototype.forEach.call(w.querySelectorAll('tr.pt-r'),function(tr){var papel=tr.querySelector('th').textContent;tr.dataset.papel=papel;tr.title='clique para ver a ficha completa';
  [1,2,3].forEach(function(i){var td=tr.querySelector('td.pt-c'+i);if(!td)return;var im=S.ptImg[ptK(papel,i)],t=td.querySelector(':scope>img.pt-mini');if(im){if(!t){t=document.createElement('img');t.className='pt-mini';t.alt='';td.insertBefore(t,td.firstChild);}if(t.getAttribute('src')!==im)t.src=im;}else if(t)t.remove();});});}
function ptAbreDet(tr){var nx=tr.nextElementSibling;if(nx&&nx.classList.contains('pt-det')){nx.remove();tr.classList.remove('pt-aberta');return;}
 var d=document.createElement('tr');d.className='pt-det';d.innerHTML='<td colspan="5">'+ptDetHTML(tr.dataset.papel)+'</td>';tr.insertAdjacentElement('afterend',d);tr.classList.add('pt-aberta');}
function ptRepintaDet(papel){var w=document.getElementById('panteao');if(!w)return;Array.prototype.forEach.call(w.querySelectorAll('tr.pt-r.pt-aberta'),function(tr){if(tr.dataset.papel!==papel)return;var d=tr.nextElementSibling;if(d&&d.classList.contains('pt-det'))d.firstChild.innerHTML=ptDetHTML(papel);});ptMiniaturas();}
(function(){var a0=panteaoAbre;panteaoAbre=function(){var r=a0.apply(this,arguments);try{ptMiniaturas();}catch(e){}return r;};})();
var PT_ARQ=null;
document.addEventListener('click',function(e){var w=document.getElementById('panteao');if(!w||!w.contains(e.target))return;
 var bi=e.target.closest('[data-ptimg]');if(bi){e.preventDefault();e.stopPropagation();if(!PT_ARQ){PT_ARQ=document.createElement('input');PT_ARQ.type='file';PT_ARQ.accept='image/*';PT_ARQ.hidden=true;document.body.appendChild(PT_ARQ);
   PT_ARQ.addEventListener('change',function(){var f=PT_ARQ.files&&PT_ARQ.files[0],k=PT_ARQ.dataset.k;if(!f||!k)return;var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var M=320,z=Math.min(1,M/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*z);c.height=Math.round(im.height*z);c.getContext('2d').drawImage(im,0,0,c.width,c.height);ptD().ptImg[k]=c.toDataURL('image/jpeg',.78);try{grava();}catch(z2){}ptRepintaDet(k.split('|')[0]);};im.src=rd.result;};rd.readAsDataURL(f);});}
  PT_ARQ.dataset.k=bi.dataset.ptimg;PT_ARQ.value='';PT_ARQ.click();return;}
 var bx=e.target.closest('[data-ptimgx]');if(bx){e.preventDefault();e.stopPropagation();delete ptD().ptImg[bx.dataset.ptimgx];try{grava();}catch(z){}ptRepintaDet(bx.dataset.ptimgx.split('|')[0]);return;}
 if(e.target.closest('.pt-det,button,input,textarea,a'))return;var tr=e.target.closest('tr.pt-r');if(tr){ptMiniaturas();ptAbreDet(tr);}},true);
document.addEventListener('input',function(e){var t=e.target;if(!t.dataset||t.dataset.ptnota==null)return;ptD().ptNota[t.dataset.ptnota]=t.value.slice(0,2000);clearTimeout(t._g);t._g=setTimeout(function(){try{grava();}catch(z){}},500);});
(function(){var st=document.createElement('style');st.id='pt-det-css';st.textContent=[
 '#panteao tr.pt-r{cursor:pointer}#panteao tr.pt-r:hover>*{background:rgba(201,164,90,.12)}#panteao tr.pt-r.pt-aberta>*{background:rgba(201,164,90,.18)}',
 '#panteao img.pt-mini{width:26px;height:26px;border-radius:50%;object-fit:cover;vertical-align:middle;margin:-4px 7px -4px 0;border:1px solid #c9a45a}',
 '#panteao tr.pt-det>td{padding:10px 12px 14px!important;background:#fbf6ea!important;border-bottom:1px solid #d9c7a3}',
 '#panteao .pt-det-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
 '#panteao .pt-det-c{position:relative;display:flex;flex-direction:column;gap:6px;padding:10px;border:1px solid #d9c7a3;border-radius:8px;background:#fffdf7}',
 '#panteao .pt-img{display:block;width:100%;aspect-ratio:16/9;max-height:170px;padding:0;border:1px dashed #b89c72;border-radius:6px;background:#f4ead2;cursor:pointer;overflow:hidden}',
 '#panteao .pt-img img{display:block;width:100%;height:100%;object-fit:cover}',
 '#panteao .pt-img span{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;font:700 9px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#8a6f55}#panteao .pt-img span b{font:400 22px Georgia,serif}',
 '#panteao .pt-img-x{position:absolute;top:4px;right:4px;width:22px;height:22px;padding:0;border:1px solid #5a3f2c;border-radius:50%;background:#fbf3df;color:#5a3f2c;cursor:pointer;font:700 13px/1 system-ui}',
 '#panteao .pt-det-t{font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#9a6b3a}',
 '#panteao .pt-det-n{font:700 15px Georgia,serif;color:#2a2418}',
 '#panteao .pt-det-c dl{display:grid;grid-template-columns:auto 1fr;gap:3px 8px;margin:0;font-size:12.5px}#panteao .pt-det-c dt{font:700 8.5px var(--mono,monospace);letter-spacing:.1em;text-transform:uppercase;color:#8a6f55;padding-top:3px}#panteao .pt-det-c dd{margin:0;color:#3b2a1d}',
 '#panteao .pt-nota span{display:block;font:700 8.5px var(--mono,monospace);letter-spacing:.1em;text-transform:uppercase;color:#8a6f55;margin:4px 0 3px}',
 '#panteao .pt-nota textarea{width:100%;box-sizing:border-box;padding:6px 8px;border:1px solid #c9b28a;border-radius:6px;background:#fffaf0;font:13px var(--sans,system-ui);resize:vertical}',
 '@media(max-width:800px){#panteao .pt-det-g{grid-template-columns:1fr}}'
].join('\n');document.head.appendChild(st);})();

/* Painel direito: um só par de pilares para Missões, Hora livre e Arsenal, do friso superior (fixo) até o rodapé do painel; as seções não rolam os pilares junto */
function tpPilares(){var fr=document.querySelector('#tp-painel .tp-fr'),tm=document.getElementById('tm-painel'),fz=document.getElementById('tp-friso');if(!fr||!tm)return;
 var cs=getComputedStyle(tm);['--neo-cap','--neo-fuste','--neo-base'].forEach(function(v){var x=cs.getPropertyValue(v).trim();if(x&&fr.style.getPropertyValue(v)!==x)fr.style.setProperty(v,x);});
 var t=(fz?fz.offsetHeight:0)+'px';if(fr.style.getPropertyValue('--pil-top')!==t)fr.style.setProperty('--pil-top',t);}
setTimeout(function(){try{tpPilares();}catch(e){}},1600);setInterval(function(){try{tpPilares();}catch(e){}},2000);
(function(){var st=document.createElement('style');st.id='tp-pilares-css';var S2='html body #tp-painel #tp-real>:is(#tm-painel,#recreio,#tesouro)';st.textContent=[
 '#tp-painel:has(#tp-real) .tp-fr{background:var(--neo-cap) left 6px top var(--pil-top,70px)/36px 25px no-repeat,var(--neo-cap) right 6px top var(--pil-top,70px)/36px 25px no-repeat,',
 ' var(--neo-fuste) left 6px top calc(var(--pil-top,70px) + 25px)/36px calc(100% - var(--pil-top,70px) - 38px) no-repeat,var(--neo-fuste) right 6px top calc(var(--pil-top,70px) + 25px)/36px calc(100% - var(--pil-top,70px) - 38px) no-repeat,',
 ' var(--neo-base) left 6px bottom 0/36px 13px no-repeat,var(--neo-base) right 6px bottom 0/36px 13px no-repeat,linear-gradient(180deg,#f7eed8,#f1e4c6)!important;background-attachment:scroll!important}',
 '#tp-painel #tp-friso{position:sticky!important;top:0!important;z-index:30}',
 /* as seções perdem os próprios pilares e ficam transparentes nas laterais */
 S2+'{background:var(--neo-ent) left top/240px 40px repeat-x,linear-gradient(90deg,transparent 0 40px,#f4ead2 40px calc(100% - 40px),transparent calc(100% - 40px))!important;border-left:0!important;border-right:0!important;box-shadow:none!important}',
 S2+'>.col-orn{display:none!important}',
 S2+'::before,'+S2+'::after{background-image:none!important}',
 '#tp-painel:has(#tp-real) .tp-fr{padding-left:0!important;padding-right:0!important}',
 S2+'{margin:0 6px!important}'
].join('\n');document.head.appendChild(st);})();

/* Placa das telas e degraus do templo estilizados por tema (sobrepõe a cópia genérica) */
(function(){var st=document.createElement('style');st.id='bn-tema-placa-css';var P='html body:not(.zz9):not(.zz8) #hero-box#hero-box .bn-telas.bn-placa',R='html body:not(.zz9):not(.zz8) #hero-box#hero-box>.bn-rod';
 var placa=TV_ON?[P+'{background:linear-gradient(180deg,#256139,#1d4a2c)!important;border:1.5px solid #d4ad4f!important;box-shadow:0 0 0 3px #123321,0 0 0 4.5px #d4ad4f,0 6px 12px -6px rgba(0,0,0,.5)!important}',P+' button{color:#e9c870!important}',P+' button[aria-selected=true]{color:#f3e6c4!important}',P+' i{color:#d4ad4f!important}',
   P+'::before,'+P+'::after{content:"ᛟ";font:400 12px Georgia,serif;color:#d4ad4f;margin:0 2px}']
  :EG_ON?[P+'{background:#f7ecd2!important;border:2px solid #1e3a6e!important;border-radius:999px!important;padding:4px 26px 3px!important;box-shadow:0 0 0 3px #f7ecd2,0 0 0 4.5px #c9a23a,0 6px 12px -6px rgba(20,20,40,.45)!important}',P+' button{color:#2a4c86!important}',P+' button[aria-selected=true]{color:#1e3a6e!important}',P+' i{color:#c9a23a!important}',
   P+'::after{content:"";position:absolute;right:-9px;top:50%;width:6px;height:70%;transform:translateY(-50%);border-radius:2px;background:#1e3a6e}']
  :[P+'{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #8a5a14!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px #8a5a14,0 6px 12px -6px rgba(40,30,20,.45)!important}',P+' button{color:#9a6b3a!important}',P+' button[aria-selected=true]{color:#2a2418!important}',P+' i{color:#8a5a14!important}'];
 var base=TV_ON?[R+'{border-top:2px solid #3a2414!important;border-bottom:1px solid #3a2414!important;background:repeating-linear-gradient(90deg,rgba(0,0,0,0) 0 22px,rgba(46,28,16,.25) 22px 23px),linear-gradient(180deg,#b07a4a 0 3px,#8a5a34 3px,#6e4426)!important}',
   R+'::after{background:linear-gradient(180deg,#7a4e2c,#5a3a20)!important;border-top-color:#3a2414!important}',R+'::before{background:linear-gradient(180deg,#5f6366,#4a4e52)!important;border-top-color:#2e3134!important}',
   R+' .br-k{color:#f1e6cf!important}',R+' .br-db{border-left-color:#e2c69c!important}']
  :EG_ON?[R+'{border-top:3px solid #c9a23a!important;border-bottom:1px solid #c9a23a!important;background:linear-gradient(180deg,#3a5f9e,#2a4c86)!important}',
   R+'::after{background:linear-gradient(180deg,#ecd7a8,#dcc086)!important;border-top-color:#c9a23a!important}',R+'::before{background:linear-gradient(180deg,#d9c08c,#c9a86a)!important;border-top-color:#a87b1d!important}',
   R+' .br-k{color:#f3e2b0!important}',R+' .br-db{border-left-color:#c9a23a!important}']
  :[R+'{border-top:2px solid #8a5a14!important;border-bottom:1px solid #8a5a14!important;background:linear-gradient(180deg,#fff1c8 0 3px,#f6dfa6 3px,#e9c97c)!important}',
   R+'::after{background:linear-gradient(180deg,#f2d690,#e3c06f)!important;border-top-color:#8a5a14!important}',R+'::before{background:linear-gradient(180deg,#e3c06f,#d4ad58)!important;border-top-color:#8a5a14!important}',
   R+' .br-k{color:#8a5a14!important}',R+' .br-db{border-left-color:#8a5a14!important}'];
 st.textContent=placa.concat(base).join('\n');document.head.appendChild(st);})();
/* Mostrador do foco no Egito: colar usekh de lápis, turquesa e cornalina, sol alado com uraei e FOCO num cartucho */
if(EG_ON){(function(){var t0=tdEscudo;tdEscudo=function(fr,modo,txt,sub){var P=function(r,a){return [60+r*Math.cos(a),60+r*Math.sin(a)];},f=function(n){return n.toFixed(2);};
 var cor=modo==='pausado'?'#b8ad98':modo==='fim'?'#c0392b':modo==='pausa'?'#6f9a5b':'#2f9c95';
 var s='<defs><linearGradient id="egq1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdeeb5"/><stop offset=".5" stop-color="#e4b84c"/><stop offset="1" stop-color="#9a6e16"/></linearGradient>'+
  '<radialGradient id="egq2" cx="45%" cy="38%" r="72%"><stop offset="0" stop-color="#fffaea"/><stop offset="1" stop-color="#ecd8a6"/></radialGradient></defs>';
 s+='<circle cx="60" cy="60" r="59" fill="url(#egq1)"/><circle cx="60" cy="60" r="58" fill="none" stroke="#fff3c9" stroke-opacity=".7" stroke-width=".8"/>';
 var C=['#2a4c86','#e4b84c','#2f9c95','#e4b84c','#b5462c','#e4b84c'],n=48;
 for(var i=0;i<n;i++){var a0=-Math.PI/2+i*2*Math.PI/n,a1=a0+2*Math.PI/n,o0=P(56,a0),o1=P(56,a1),i1=P(47.5,a1),i0=P(47.5,a0);
  s+='<path d="M'+f(o0[0])+' '+f(o0[1])+'A56 56 0 0 1 '+f(o1[0])+' '+f(o1[1])+'L'+f(i1[0])+' '+f(i1[1])+'A47.5 47.5 0 0 0 '+f(i0[0])+' '+f(i0[1])+'Z" fill="'+C[i%6]+'"/>';}
 for(var j=0;j<n;j++){var d=P(56.8,-Math.PI/2+(j+.5)*2*Math.PI/n);s+='<circle cx="'+f(d[0])+'" cy="'+f(d[1])+'" r="1.05" fill="#fff3c9" stroke="#9a6e16" stroke-width=".35"/>';}
 s+='<circle cx="60" cy="60" r="47.5" fill="none" stroke="#9a6e16" stroke-width="1"/><circle cx="60" cy="60" r="56" fill="none" stroke="#9a6e16" stroke-width=".8"/>';
 var R=46;s+='<circle cx="60" cy="60" r="'+R+'" fill="url(#egq2)"/>';
 for(var t=0;t<12;t++){var a=-Math.PI/2+t*Math.PI/6,p1=P(40,a),p2=P(44.5,a),on=modo!=='parado'&&t/12<fr;s+='<path d="M'+f(p1[0])+' '+f(p1[1])+'L'+f(p2[0])+' '+f(p2[1])+'" stroke="'+(on?cor:'#1e3a6e')+'" stroke-width="'+(t%3===0?2.2:1.2)+'" stroke-linecap="round" stroke-opacity="'+(on?1:.7)+'"/>';}
 if(modo!=='parado'){var CC=2*Math.PI*R;s+='<circle class="td-fg2" cx="60" cy="60" r="'+R+'" fill="none" stroke="'+cor+'" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="'+f(CC)+'" stroke-dashoffset="'+f(CC*(1-fr))+'" transform="rotate(-90 60 60)"/>';}
 var sol='<g><path d="M60 46.5c-4 0-6.5-2.6-6.5-5.8M60 46.5c4 0 6.5-2.6 6.5-5.8" fill="none" stroke="#1e3a6e" stroke-width="0"/>'+
  '<path d="M54 44c-7-.5-14-3.4-20-8.4 3 .2 6 .9 9 2.2-2-.2-4 .1-5.6.7 4 .8 8 2.2 11.4 4.3-2.4.1-4.4.6-6 1.4 3.8.2 7.4.9 11.2 2.3z" fill="#2a4c86"/>'+
  '<path d="M66 44c7-.5 14-3.4 20-8.4-3 .2-6 .9-9 2.2 2-.2 4 .1 5.6.7-4 .8-8 2.2-11.4 4.3 2.4.1 4.4.6 6 1.4-3.8.2-7.4.9-11.2 2.3z" fill="#2a4c86"/>'+
  '<path d="M40 38.4c4 1.2 8 3 11.4 5M80 38.4c-4 1.2-8 3-11.4 5" stroke="#e4b84c" stroke-width=".7" fill="none"/>'+
  '<circle cx="60" cy="43.5" r="5.6" fill="#c0392b" stroke="#9a6e16" stroke-width=".9"/>'+
  '<path d="M54.6 46.5c.2 2.4 1.2 3.4 1.2 5M65.4 46.5c-.2 2.4-1.2 3.4-1.2 5" stroke="#2f9c95" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>';
 if(modo==='parado'){s+=sol+'<rect x="39" y="64" width="42" height="15" rx="7.5" fill="#fffaea" stroke="#1e3a6e" stroke-width="1.4"/><path d="M83.5 65.5v12" stroke="#1e3a6e" stroke-width="1.8" stroke-linecap="round"/>'+
   '<text x="60" y="75" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="8.6" letter-spacing="2.6" fill="#1e3a6e">FOCO</text>';}
 else{var rot=modo==='pausado'?'PAUSADO':modo==='fim'?'ACABANDO':modo==='pausa'?'RESPIRO':'EM FOCO';
  s+='<text x="60" y="'+(sub?46:48)+'" text-anchor="middle" font-family="ui-monospace,monospace" font-weight="700" font-size="5.2" letter-spacing="1.6" fill="'+cor+'">'+rot+'</text>'+
   '<text x="60" y="'+(sub?65:68)+'" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="19" fill="#1e2a44">'+txt+'</text>'+
   (sub?'<text x="60" y="76" text-anchor="middle" font-family="ui-monospace,monospace" font-size="5.5" letter-spacing="1" fill="#1e2a44" fill-opacity=".65">'+sub+'</text>':'');}
 return '<svg viewBox="0 0 120 120" aria-hidden="true">'+s+'</svg>';};})();}

/* Modo noturno: o app fica sempre na paleta clara dos temas; a noite é um filtro de luz baixa sobre a página inteira */
aplicaTema=(function(a0){return function(){var noite=S.tema!=='claro';S.tema='claro';try{a0.apply(this,arguments);}finally{S.tema=noite?'escuro':'claro';}
 document.body.classList.add('claro');document.documentElement.classList.toggle('noite',noite);
 var b=document.getElementById('b-tema');if(b){b.innerHTML=noite?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';b.setAttribute('title',noite?'modo claro':'modo noturno');}
 try{temaIc();}catch(e){}};})(aplicaTema);
try{aplicaTema();}catch(e){}
/* cartões do painel esquerdo quase encostando nas bordas */
(function(){var st=document.createElement('style');st.id='lat-largo-css';st.textContent=[
 'html body #lat-e>:is(section,div,.lat-c,#lat-trio,#lat-gm,#lat-arena,#lat-db,.lat-grp-s){margin-left:4px!important;margin-right:4px!important;width:auto!important;max-width:none!important;box-sizing:border-box!important}',
 'html body #lat-e{padding-left:0!important;padding-right:0!important}','html body #lat-e>#lat-gm{padding-left:0!important;padding-right:0!important}','html body #lat-e>#lat-gm>*{margin-left:0!important;margin-right:0!important;width:auto!important;max-width:none!important}'
].join('\n');document.head.appendChild(st);})();

/* embasamento do templo: mesma largura da colunata, degraus visíveis com respiro antes do próximo templo, controles gravados na pedra */
(function(){var st=document.createElement('style');st.id='bn-embasamento-css';var R='html body:not(.zz9):not(.zz8):not(.zz7) #hero-box#hero-box>.bn-rod';
 var k=TV_ON?'#3a2414':EG_ON?'#c9a23a':'#8a5a14',tx=TV_ON?'#f1e6cf':EG_ON?'#f3e2b0':'#5a3a10',fd=TV_ON?'rgba(255,240,215,.12)':EG_ON?'rgba(255,240,200,.12)':'rgba(255,248,225,.45)';
 st.textContent=[
 R+'{margin:0 0 40px!important;padding:9px 56px 10px!important}',
 R+'::after{left:-12px!important;right:-12px!important;bottom:-13px!important;height:12px!important;box-shadow:0 1px 0 '+k+'!important}',
 R+'::before{left:-24px!important;right:-24px!important;bottom:-26px!important;height:12px!important;box-shadow:0 1px 0 '+k+',0 6px 10px -6px rgba(40,25,10,.45)!important}',
 R+' .br-gav button{background:'+fd+'!important;border:1px solid '+k+'!important;border-radius:3px!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.18)!important;color:'+tx+'!important}',
 R+' .br-gav button i{color:'+tx+'!important;opacity:.75}',
 R+' .br-gav button b{color:'+tx+'!important}',
 R+' .br-gav button.on{background:'+k+'!important}'+R+' .br-gav button.on i,'+R+' .br-gav button.on b{color:#fbf5e6!important}',
 R+' .regdia .rdent input{border:1px solid '+k+'!important;border-radius:3px!important;box-shadow:inset 0 1px 3px rgba(0,0,0,.2)!important}',
 R+' .regdia .rdent button,'+R+' .br-ver{border:1px solid '+k+'!important;border-radius:3px!important;background:'+fd+'!important;color:'+tx+'!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.18)!important}'
].join('\n');document.head.appendChild(st);})();

/* ===== Painel direito: mesma faixa superior e mesmos pilares nas três abas; só a cor muda com a aba ===== */
var FACE_COR=TV_ON?{tm:{c:'#d9b48c',k:'#5a3c22'},rec:{c:'#b9cbbd',k:'#1d4a2c'},ars:{c:'#e2cd8a',k:'#7a5c12'}}
 :EG_ON?{tm:{c:'#b9c9e8',k:'#1e3a6e'},rec:{c:'#b6e0da',k:'#1f625c'},ars:{c:'#f0d58a',k:'#8a6a14'}}
 :{tm:{c:'#eaa66a',k:'#8a4414'},rec:{c:'#e2b47c',k:'#7a4c1c'},ars:{c:'#d6a25a',k:'#6a4512'}};
var FACE_SVG={};
function tpBanda(){var p=document.getElementById('tp-painel'),fr=p&&p.querySelector('.tp-fr');if(!fr)return;var fz=document.getElementById('tp-friso');if(fz&&fz.parentNode!==fr)fz=null;
 var b=fr.querySelector(':scope>.tp-banda');if(!b){b=document.createElement('div');b.className='tp-banda';b.setAttribute('data-notr','');}
 if(fz&&fz.parentNode===fr){if(fz.nextElementSibling!==b)fz.insertAdjacentElement('afterend',b);}else if(fr.firstElementChild!==b)fr.insertBefore(b,fr.firstChild);
 var f=p4Face(),h='<nav class="tp-placa" role="tablist">'+TP_FACES.map(function(x){return '<button type="button" role="tab" data-tpface="'+x[0]+'" aria-selected="'+(x[0]===f)+'">'+x[1]+'</button>';}).join('<i aria-hidden="true">·</i>')+'</nav>';
 if(b._h!==h||!b.firstChild){b._h=h;b.innerHTML=h;}
 var cf=FACE_COR[f]||FACE_COR.tm,im=FACE_SVG[f];if(!im){try{im=FACE_SVG[f]=colSvgs({st:'dorica',c:cf.c,k:cf.k});}catch(e){return;}}
 if(fr.dataset.face!==f){fr.dataset.face=f;fr.style.setProperty('--neo-cap',im.cap);fr.style.setProperty('--neo-fuste',im.fuste);fr.style.setProperty('--neo-base',im.base);fr.style.setProperty('--neo-ent',im.ent);fr.style.setProperty('--fc-k',cf.k);fr.style.setProperty('--fc-c',cf.c);}
 var t=((fz?fz.offsetHeight:0)+b.offsetHeight)+'px';if(fr.style.getPropertyValue('--pil-top')!==t)fr.style.setProperty('--pil-top',t);
 fr.style.setProperty('--fz-h',(fz?fz.offsetHeight:0)+'px');}
tpPilares=function(){try{tpBanda();}catch(e){}};
(function(){var t0=tpReal;tpReal=function(){var r=t0.apply(this,arguments);try{tpBanda();}catch(e){}return r;};})();
setTimeout(function(){try{tpBanda();}catch(e){}},1300);setInterval(function(){try{tpBanda();}catch(e){}},900);
(function(){var st=document.createElement('style');st.id='tp-banda-css';var S2='html body #tp-painel #tp-real>:is(#tm-painel,#recreio,#tesouro)';st.textContent=[
 '#tp-painel .tp-fr>.tp-banda{position:sticky;top:var(--fz-h,0px);z-index:29;display:flex;justify-content:center;align-items:center;height:46px;margin:0;padding:0 10px;box-sizing:border-box;background:var(--neo-ent) left top/240px 40px repeat-x,#f4ead2;border-bottom:1.5px solid var(--fc-k,#5a3f2c)}',
 '#tp-painel .tp-banda .tp-placa{display:flex;align-items:baseline;gap:6px;padding:5px 14px 4px;background:var(--neo-papel,none),#f4ead2;border:1.5px solid var(--fc-k,#5a3f2c);box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px var(--fc-k,#5a3f2c),0 6px 12px -6px rgba(40,30,20,.45);white-space:nowrap}',
 '#tp-painel .tp-banda .tp-placa button{width:auto!important;margin:0!important;padding:0 2px!important;border:0!important;background:none!important;box-shadow:none!important;cursor:pointer;font:400 12.5px Georgia,serif!important;font-variant:small-caps;letter-spacing:.04em;color:#8a6f55!important;text-transform:none!important}',
 '#tp-painel .tp-banda .tp-placa button[aria-selected=true]{font-size:16px!important;color:#2a2418!important}',
 '#tp-painel .tp-banda .tp-placa i{font-style:normal;color:var(--fc-k,#9a6b3a)}',
 /* as placas e entablamentos próprios das seções saem */
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab,#tp-real>#tesouro>.ts-cab{display:none!important}',
 S2+'{background:linear-gradient(90deg,transparent 0 40px,#f4ead2 40px calc(100% - 40px),transparent calc(100% - 40px))!important;padding-top:14px!important}',
 '#tp-painel:has(#tp-real) .tp-fr{padding-top:0!important}'
].join('\n');document.head.appendChild(st);})();

/* ===== Painel direito: sai a faixa inferior (entablamento com os dois símbolos e a régua da fase); os capitéis encostam direto na faixa grega ===== */
(function(){var st=document.createElement('style');st.id='tp-sem-entab-css';st.textContent=[
 '#tp-painel #tp-entab{display:none!important}',
 '#tp-real>:is(#tm-painel,#recreio,#tesouro)::after{content:none!important;display:none!important}',
 'html body #tp-painel #tp-real>:is(#tm-painel,#recreio,#tesouro){border-top:0!important}',
 /* cartões centrados: a barra de rolagem reserva o mesmo espaço dos dois lados (painel esquerdo, templo da direita e Prêmios) */
 'html body nav#nav.navdr,html body #tp-painel:has(#tp-real) .tp-fr.tp-fr,html body #tp-real #c-h-rec#c-h-rec{scrollbar-gutter:stable both-edges!important}'
].join('\n');document.head.appendChild(st);})();

/* ===== Frontão: pílula e placa numa peça só — dois botões de cada lado e as telas no meio ===== */
pilulaOrn=function(){var o=document.querySelector('#hero-box .pd-pilula > .pil-orn');if(o)o.remove();};
bnTelaBotoes=function(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var pil=document.querySelector('#hero-box .pd-pilula');
 var w=document.querySelector('#hero-box .bn-telas');if(!w){w=document.createElement('div');w.className='bn-telas';w.setAttribute('role','tablist');w.setAttribute('data-notr','');}
 w.classList.remove('no-front');
 if(pil){w.classList.remove('bn-placa');w.classList.add('na-pilula');var bs=pil.querySelectorAll(':scope > button.tt-ic:not(.sat-ic)');if(bs.length>=2){if(bs[1].nextElementSibling!==w)bs[1].insertAdjacentElement('afterend',w);}else if(w.parentNode!==pil)pil.appendChild(w);pil.classList.add('pil-placa');}
 else{w.classList.add('bn-placa');w.classList.remove('na-pilula');if(w.parentNode!==h)h.appendChild(w);}
 var x='<button type="button" role="tab" data-bntela="visao" aria-selected="'+(BN_TELA!=='prog')+'">'+ABAS_NOMES.vis+'</button><i aria-hidden="true">·</i><button type="button" role="tab" data-bntela="prog" aria-selected="'+(BN_TELA==='prog')+'">'+ABAS_NOMES.prog+'</button>';
 if(w._h!==x||!w.firstChild){w.innerHTML=x;w._h=x;}};
(function(){var st=document.createElement('style');st.id='pil-placa-css';var Q='html body:not(.zz9):not(.zz8) #hero-box#hero-box .pd-pilula.pil-placa',W=Q+'>.bn-telas.na-pilula';
 var pal=TV_ON?{bg:'linear-gradient(180deg,#256139,#1d4a2c)',k:'#d4ad4f',ring:'#123321',tx:'#f3e6c4',sub:'#e9c870',ic:'#e9c870'}:EG_ON?{bg:'#f7ecd2',k:'#1e3a6e',ring:'#f7ecd2',tx:'#1e3a6e',sub:'#2a4c86',ic:'#1e3a6e'}:{bg:'var(--neo-papel,none),#f4ead2',k:'#8a5a14',ring:'#f4ead2',tx:'#2a2418',sub:'#9a6b3a',ic:'#5a3f2c'};
 st.textContent=[
 Q+'{width:auto!important;height:auto!important;padding:3px 8px!important;gap:2px!important;align-items:center!important;background:'+pal.bg+'!important;border:1.5px solid '+pal.k+'!important;border-radius:'+(EG_ON?'999px':'2px')+'!important;box-shadow:0 0 0 3px '+pal.ring+',0 0 0 4.5px '+(EG_ON?'#c9a23a':pal.k)+',0 6px 12px -6px rgba(40,30,20,.45)!important}',
 Q+'::before,'+Q+'::after{display:none!important;content:none!important}',
 Q+'>button.tt-ic{color:'+pal.ic+'!important;border:0!important;background:none!important;box-shadow:none!important}',
 Q+'>button.tt-ic+button.tt-ic{border-left:0!important}',
 W+'{position:static!important;transform:none!important;display:flex!important;align-items:baseline;gap:7px;margin:0 8px!important;padding:0 10px!important;border:0!important;border-left:1px solid '+pal.k+'!important;border-right:1px solid '+pal.k+'!important;border-radius:0!important;background:none!important;box-shadow:none!important;white-space:nowrap}',
 W+' button{width:auto!important;min-height:0!important;height:auto!important;margin:0!important;padding:0 2px!important;border:0!important;background:none!important;box-shadow:none!important;cursor:pointer;font:400 12.5px Georgia,serif!important;font-variant:small-caps;letter-spacing:.04em!important;text-transform:none!important;color:'+pal.sub+'!important}',
 W+' button[aria-selected=true]{font:700 14.5px Georgia,serif!important;font-variant:normal;color:'+pal.tx+'!important}',
 W+' i{font-style:normal;color:'+pal.k+'}'
].join('\n');document.head.appendChild(st);})();

/* tela Programação: o que é da Visão sai de vez (nada vaza por baixo); faixa da base mais larga */
(function(){var st=document.createElement('style');st.id='prog-limpa-css';st.textContent=[
 'body.tela-prog #hero-box .vx-hero.bn2>:not(.bn-telas):not(.vx-tema):not(.bn-rod){display:none!important}',
 'html body:not(.zz9):not(.zz8):not(.zz7):not(.zz6) #hero-box#hero-box>.bn-rod{margin:0 -10px 40px!important;padding:12px 64px 13px!important}',
 '@media(max-width:1379px){html body:not(.zz9):not(.zz8):not(.zz7):not(.zz6) #hero-box#hero-box>.bn-rod{margin:0 0 40px!important;padding:10px 14px!important}}'
].join('\n');document.head.appendChild(st);})();

/* altura única para as duas telas do banner (Visão e Semana); na Semana a grade cabe nela e o painel Hoje ocupa o resto, rolando por dentro */
var BN_H=660;
bnTelaPos=function(){var tb=document.querySelector('.wrap > div.tb'),h=document.querySelector('#hero-box .vx-hero.bn2'),wr=document.querySelector('.wrap');
 if(!tb||!h||!wr)return;if(BN_TELA!=='prog'||document.body.classList.contains('bn-mini')||document.body.classList.contains('bn-verso'))return;
 var cs=getComputedStyle(h),pl=parseFloat(cs.paddingLeft)||40,pr=parseFloat(cs.paddingRight)||40,pt=52,pb=24;
 var hr=h.getBoundingClientRect(),wrr=wr.getBoundingClientRect();
 var x=Math.round(hr.left-wrr.left+pl),y=Math.round(hr.top-wrr.top+pt),w=Math.round(hr.width-pl-pr),hh=Math.round(hr.height-pt-pb);
 var k=x+'|'+y+'|'+w+'|'+hh;if(tb._tp!==k){tb._tp=k;tb.style.setProperty('--tl-x',x+'px');tb.style.setProperty('--tl-y',y+'px');tb.style.setProperty('--tl-w',w+'px');tb.style.setProperty('--tl-h',hh+'px');}};
(function(){var st=document.createElement('style');st.id='bn-altura-unica-css';var T='html body.tela-prog div.wrap>div.tb.tb:not(#x1):not(#x2):not(#x3)';st.textContent=[
 '@media(min-width:700px){html body #hero-box#hero-box .vx-hero.bn2,html body.tela-prog #hero-box#hero-box .vx-hero.bn2{height:'+BN_H+'px!important;min-height:'+BN_H+'px!important;max-height:'+BN_H+'px!important}}',
 T+'{height:var(--tl-h,560px)!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}',
 T+'>:not(#comp-rod){flex:none}',
 T+' #comp-rod{flex:1 1 auto!important;min-height:0!important;height:auto!important;overflow-y:auto!important}',
 '#hero-box .bv-fotos .bv-foto{width:clamp(110px,10.5vw,210px)!important}',
 '#hero-box#hero-box .vx-hero.bn2{flex-wrap:nowrap!important}'
].join('\n');document.head.appendChild(st);})();

/* banner em telas médias: cartão-postal menor, título com mais espaço, fotos e afirmação proporcionais */
(function(){var st=document.createElement('style');st.id='bn-medio-css';st.textContent=[
 '@media(max-width:1760px){',
 ' #hero-box .vx-hero.bn2 .cp-postal{scale:.74;transform-origin:100% 0}',
 ' #hero-box#hero-box .vx-hero.bn2 .bn-tit{max-width:calc(100% - 250px)!important}',
 ' #hero-box .vx-hero.bn2 .bn-tit h2{font-size:clamp(28px,2.5vw,44px)!important;line-height:1.08!important}',
 ' #hero-box .bv-fotos .bv-foto{width:clamp(92px,8.6vw,210px)!important}',
 ' #hero-box .bn-visao{grid-template-columns:auto minmax(190px,1fr)!important}',
 '}'
].join('\n');document.head.appendChild(st);})();

/* fundo do banner por tema: mapa das Nove Moradas na Yggdrasil (Valhala) e mapa do Nilo em papiro (Casa do Brooklyn) */
(function(){if(!TV_ON&&!EG_ON)return;var st=document.createElement('style');st.id='bn-fundo-tema-css';
 st.textContent=TV_ON?[
  'html body.tv #vx .vx-hero.bn2::before{background:url("img/acampamento/vh-mapa-yggdrasil.svg?v=1") center/cover no-repeat!important;border-color:#cdbf9f!important;filter:none!important;opacity:.42!important}',
  'html body.tv #hero-box#hero-box .vx-hero.bn2{background-color:#f1e8d6!important}'
 ].join('\n'):[
  'html body.eg #vx .vx-hero.bn2::before{background:url("img/egito/mapa-nilo.svg?v=1") center/cover no-repeat!important;border-color:#d9c48e!important;filter:none!important;opacity:.45!important}',
  'html body.eg #hero-box#hero-box .vx-hero.bn2{background-image:repeating-linear-gradient(0deg,rgba(150,120,60,.07) 0 1px,transparent 1px 7px),repeating-linear-gradient(90deg,rgba(150,120,60,.05) 0 1px,transparent 1px 11px)!important;background-color:#f6ead0!important}'
 ].join('\n');document.head.appendChild(st);})();

/* Fogueira vira a peça final da faixa do dia, logo abaixo da Ronda */
(function(){var d0=diaHTML;diaHTML=function(){var h=d0.apply(this,arguments),f=false;try{f=fgFeita();}catch(e){}
 return h+'<button type="button" class="df-fogo'+(f?' ok':'')+'" data-dffogo title="fechar o dia"><span class="dff-ic" aria-hidden="true"></span><b>Fogueira</b><i>'+(f?'acesa ✓':'fechar o dia')+'</i></button>';};})();
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-dffogo]');if(!b)return;e.preventDefault();e.stopPropagation();var r=document.getElementById('rod-fogo');if(r)r.click();},true);
(function(){var st=document.createElement('style');st.id='df-fogo-css';st.textContent=[
 'body:not(.op-on) #rod-apps #rod-fogo{display:none!important}',
 '#dia-faixa .df-fogo{flex:none;position:relative;z-index:2;display:flex!important;flex-direction:column;align-items:center;gap:1px;width:100%!important;margin:4px 0 0!important;padding:5px 2px 4px!important;border:1px solid #9a4a30!important;border-radius:8px!important;background:linear-gradient(180deg,#fbe7c8,#f3caa0)!important;color:#5c2412!important;cursor:pointer;box-shadow:0 0 0 2px #fbf3df,0 0 0 3px #9a4a30!important}',
 '#dia-faixa .df-fogo .dff-ic{width:22px;height:18px;background:radial-gradient(ellipse at 50% 85%,#ffd768 0 18%,#f08a24 36%,transparent 62%),linear-gradient(transparent 70%,#6e4426 70% 82%,transparent 82%);border-radius:40% 40% 10% 10%}',
 '#dia-faixa .df-fogo b{font:700 7px var(--mono,monospace);letter-spacing:.06em;text-transform:uppercase}',
 '#dia-faixa .df-fogo i{font:700 7px var(--mono,monospace);font-style:normal;opacity:.85}',
 '#dia-faixa .df-fogo.ok{background:linear-gradient(180deg,#e9f3dc,#cfe5b7)!important;border-color:#4f7a3a!important;color:#2e4a20!important}',
 'body.tv #dia-faixa .df-fogo{border-color:#6e4426!important;background:linear-gradient(180deg,#f3e2c4,#e2c49a)!important;color:#3a2414!important;box-shadow:0 0 0 2px #f4ead2,0 0 0 3px #6e4426!important}',
 'body.eg #dia-faixa .df-fogo{border-color:#1e3a6e!important;background:linear-gradient(180deg,#f7ecd2,#ecd7a8)!important;color:#1e3a6e!important;box-shadow:0 0 0 2px #f7ecd2,0 0 0 3px #c9a23a!important}'
].join('\n');document.head.appendChild(st);})();

/* Toque da Concha (toques do dia) sai do painel direito e vira o friso logo acima da base do templo principal */
tpFriso=function(){var sl=document.querySelector('#hero-box .bn-slot'),rod=document.querySelector('#hero-box > .bn-rod');if(!sl)return;
 if(!TP_FRISO){TP_FRISO=document.createElement('button');TP_FRISO.type='button';TP_FRISO.id='tp-friso';TP_FRISO.className='tp-friso';TP_FRISO.setAttribute('aria-expanded','false');TP_FRISO.setAttribute('aria-label','Toque da Concha · ajustar os toques');
  TP_FRISO.addEventListener('click',function(e){e.stopPropagation();concha(!document.body.classList.contains('concha-aberta'));});}
 if(sl.nextElementSibling!==TP_FRISO)sl.insertAdjacentElement('afterend',TP_FRISO);if(rod&&TP_FRISO.nextElementSibling!==rod)TP_FRISO.insertAdjacentElement('afterend',rod);
 var h=frisoHTML();if(TP_FRISO._h!==h||(h&&!TP_FRISO.firstChild)){TP_FRISO._h=h;TP_FRISO.innerHTML=h;}};
setTimeout(function(){try{tpFriso();}catch(e){}},1500);setInterval(function(){try{tpFriso();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='friso-base-css';st.textContent=[
 '#hero-box>#tp-friso{position:relative!important;top:auto!important;display:block;width:100%;box-sizing:border-box;margin:0!important;padding:0!important;z-index:6}',
 '@media(min-width:1380px){#hero-box>#tp-friso{margin:0 -10px!important}}',
 '#hero-box>#tp-friso+.bn-rod{border-top-width:1px!important}'
].join('\n');document.head.appendChild(st);})();

/* base do templo inicial com a mesma largura do friso do templo seguinte; segundo templo ganha base própria com o incluidor de hábito semanal */
function baseAlinha(){var rod=document.querySelector('#hero-box > .bn-rod'),hb=document.getElementById('hero-box'),rt=document.querySelector('.wrap > div.rt');if(!rod||!hb||!rt||innerWidth<1380)return;
 var a=hb.getBoundingClientRect(),b=rt.getBoundingClientRect();var l=Math.round(b.left-a.left),r=Math.round(a.right-b.right),v=l+'|'+r;if(rod._al===v)return;rod._al=v;
 rod.style.setProperty('margin-left',l+'px','important');rod.style.setProperty('margin-right',r+'px','important');var fz=document.querySelector('#hero-box > #tp-friso-bloco')||document.querySelector('#hero-box > #tp-friso');if(fz){fz.style.setProperty('margin-left',l+'px','important');fz.style.setProperty('margin-right','0px','important');fz.style.setProperty('width','calc(100% - '+(l+r)+'px)','important');}}
function rtBase(){var rt=document.querySelector('.wrap > div.rt');if(!rt)return;var b=document.getElementById('rt-base');
 if(!b){b=document.createElement('div');b.id='rt-base';b.className='rt-base';b.innerHTML='<span class="rb-k">hábito semanal</span><input data-rbin maxlength="40" placeholder="novo hábito semanal (ex.: faxina do quarto, ligar para a família)"><button type="button" data-rbadd>incluir</button>';}
 if(rt.nextElementSibling!==b)rt.insertAdjacentElement('afterend',b);}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-rbadd]');if(!t)return;e.preventDefault();var i=document.querySelector('#rt-base [data-rbin]'),v=i&&i.value.trim();if(!v)return;
 var wi=document.querySelector('#ws-box [data-ws-in]'),wa=document.querySelector('#ws-box [data-ws-add]');if(!wi||!wa)return;wi.value=v;wa.click();i.value='';},true);
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.hasAttribute&&e.target.hasAttribute('data-rbin')){e.preventDefault();var a=document.querySelector('#rt-base [data-rbadd]');if(a)a.click();}});
setTimeout(function(){try{baseAlinha();rtBase();}catch(e){}},1600);setInterval(function(){try{baseAlinha();rtBase();}catch(e){}},1200);window.addEventListener('resize',function(){try{baseAlinha();}catch(e){}});
(function(){var st=document.createElement('style');st.id='rt-base-css';var k=TV_ON?'#3a2414':EG_ON?'#c9a23a':'#1f4e8a',bg=TV_ON?'linear-gradient(180deg,#b07a4a 0 3px,#8a5a34 3px,#6e4426)':EG_ON?'linear-gradient(180deg,#3a5f9e,#2a4c86)':'linear-gradient(180deg,#e3ecf8 0 3px,#bcd0ec 3px,#9fb8de)',tx=TV_ON||EG_ON?'#f3e2b0':'#14305a',st1=TV_ON?'#7a4e2c':EG_ON?'#ecd7a8':'#aac2e4',st2=TV_ON?'#5f6366':EG_ON?'#d9c08c':'#8eaad4';
 st.textContent=[
 '#ws-box .ws-add{display:none!important}',
 '.wrap>#rt-base{position:relative;display:flex;align-items:center;gap:10px;margin:0 0 40px!important;padding:11px 56px 12px;border-top:2px solid '+k+';border-bottom:1px solid '+k+';background:'+bg+';box-sizing:border-box}',
 '.wrap>#rt-base::after,.wrap>#rt-base::before{content:"";position:absolute;pointer-events:none;border-top:1px solid '+k+'}',
 '.wrap>#rt-base::after{left:-12px;right:-12px;bottom:-13px;height:12px;background:'+st1+'}',
 '.wrap>#rt-base::before{left:-24px;right:-24px;bottom:-26px;height:12px;background:'+st2+';box-shadow:0 6px 10px -6px rgba(40,25,10,.45)}',
 '#rt-base .rb-k{flex:none;font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:'+tx+'}',
 '#rt-base input{flex:1;min-width:0;height:32px;box-sizing:border-box;padding:0 10px;border:1px solid '+k+';border-radius:3px;background:#fffaf0;font:13px var(--sans,system-ui);box-shadow:inset 0 1px 3px rgba(0,0,0,.2)}',
 '#rt-base button{flex:none;width:auto!important;height:32px;margin:0!important;padding:0 14px!important;border:1px solid '+k+'!important;border-radius:3px!important;background:rgba(255,248,225,.5)!important;color:'+tx+'!important;font:700 10px var(--mono,monospace)!important;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;box-shadow:inset 0 1px 2px rgba(0,0,0,.18)!important}',
 '.wrap>div.rt{margin-bottom:0!important}',
 '@media(max-width:1379px){.wrap>#rt-base{padding:10px 14px}}'
].join('\n');document.head.appendChild(st);})();

/* Toque da Concha + Hoje · Compromissos numa peça só, logo acima da base do templo principal */
var TP_BLOCO=null;
tpFriso=function(){var sl=document.querySelector('#hero-box .bn-slot'),rod=document.querySelector('#hero-box > .bn-rod');if(!sl)return;
 if(!TP_FRISO){TP_FRISO=document.createElement('button');TP_FRISO.type='button';TP_FRISO.id='tp-friso';TP_FRISO.className='tp-friso';TP_FRISO.setAttribute('aria-expanded','false');TP_FRISO.setAttribute('aria-label','Toque da Concha · ajustar os toques');
  TP_FRISO.addEventListener('click',function(e){e.stopPropagation();concha(!document.body.classList.contains('concha-aberta'));});}
 if(!TP_BLOCO){TP_BLOCO=document.createElement('section');TP_BLOCO.id='tp-friso-bloco';TP_BLOCO.className='tp-friso-bloco';TP_BLOCO.innerHTML='<div class="cb-hoje"></div>';}
 if(TP_FRISO.parentNode!==TP_BLOCO)TP_BLOCO.insertBefore(TP_FRISO,TP_BLOCO.firstChild);
 if(sl.nextElementSibling!==TP_BLOCO)sl.insertAdjacentElement('afterend',TP_BLOCO);if(rod&&TP_BLOCO.nextElementSibling!==rod)TP_BLOCO.insertAdjacentElement('afterend',rod);
 var h=frisoHTML();if(TP_FRISO._h!==h||(h&&!TP_FRISO.firstChild)){TP_FRISO._h=h;TP_FRISO.innerHTML=h;}
 var hj=TP_BLOCO.querySelector('.cb-hoje'),x='';try{x=compRodHTML();}catch(e){}if(hj._h!==x){hj._h=x;hj.innerHTML=x;}};
setTimeout(function(){try{tpFriso();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='concha-hoje-css';var k=TV_ON?'#6e4426':EG_ON?'#1e3a6e':'#9a4a30';st.textContent=[
 '#hero-box>#tp-friso-bloco{position:relative;z-index:6;box-sizing:border-box;margin:0;background:#fbf6ea;border:1px solid '+k+';border-bottom:0}',
 '#hero-box>#tp-friso-bloco>#tp-friso{position:relative!important;top:auto!important;width:100%!important;margin:0!important;display:block}',
 '#tp-friso-bloco .cb-hoje{max-height:170px;overflow-y:auto;scrollbar-width:thin;padding:8px 14px 10px;border-top:1px solid '+k+'}',
 '#tp-friso-bloco .cb-hoje>*{margin:0!important;max-width:none!important;width:auto!important;border:0!important;box-shadow:none!important;background:none!important;padding:0!important}',
 '#tp-friso-bloco .cb-hoje:empty{display:none}',
 'html body.tela-prog div.wrap>div.tb.tb #comp-rod{display:none!important}',
 'body.tv #hero-box>#tp-friso-bloco{background:#f5efe2}body.eg #hero-box>#tp-friso-bloco{background:#f8eed6}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Tarefas e Missões: cartões organizados, padronizados e espaçados =======================
   Ordem pelos grupos (Tarefas: Chalé, Diárias, Conselho · Missões: Oráculo · Desafio: Profecia), um rótulo por grupo,
   o mesmo cartão para todos (fundo, borda, faixa de cor no alto, raio, respiro), títulos e subtítulos iguais. */
(function(){var st=document.createElement('style');st.id='mm-padrao-css';st.textContent=[
 '#tp-real .tm-lb:has(+ #tm-r2){display:none!important}',
 '#tp-real #mm-box{display:flex!important;flex-direction:column;gap:14px;margin:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}',
 '#tp-real #mm-box>.mm-g{display:contents!important}',
 '#tp-real #mm-box .mm-h{order:0;margin:0 0 2px!important}',
 '#tp-real #mm-box .mm-grp-t{order:1}#tp-real #mm-box .mm-chale{order:2}#tp-real #mm-box .mm-quest{order:3}#tp-real #mm-box .mm-gab{order:4}',
 '#tp-real #mm-box .mm-grp-m{order:5}#tp-real #mm-box .mm-orac-col{order:6}#tp-real #mm-box .mm-grp-d{order:7}#tp-real #mm-box .mm-prof{order:8}',
 '#tp-real #mm-box .mm-grp{margin:6px 0 -4px!important}',
 /* um só cartão */
 '#tp-real #mm-box :is(.mm-col,.mm-gab){--mc:#9a6b3a;position:relative;display:flex!important;flex-direction:column;gap:0;margin:0!important;padding:12px 14px 14px!important;box-sizing:border-box;',
 ' background:#fbf5e6!important;border:1px solid #d6c69c!important;border-top:3px solid var(--mc)!important;border-radius:10px!important;box-shadow:0 1px 0 #e9dcbc!important;overflow:hidden}',
 '#tp-real #mm-box .mm-chale{--mc:#9a6b3a}#tp-real #mm-box .mm-quest{--mc:#427d91}#tp-real #mm-box .mm-gab{--mc:#7a4a58}#tp-real #mm-box .mm-orac-col{--mc:#6b5a9a}#tp-real #mm-box .mm-prof{--mc:#b98c47}',
 '#tp-real #mm-box .mm-col::before{margin:-12px -14px 12px!important;height:78px!important;border-bottom:2px solid var(--mc)!important}',
 /* cabeçalho de cada cartão: título e subtítulo iguais */
 '#tp-real #mm-box :is(.mm-col,.mm-gab) .mm-k{display:block;margin:0!important;font:400 17px/1.25 Georgia,serif!important;font-variant:small-caps;letter-spacing:.03em;color:#2a2418!important}',
 '#tp-real #mm-box .mm-col>.mm-k+small,#tp-real #mm-box .mm-gab>header small{display:block;margin:3px 0 10px!important;font:700 8.5px/1.5 var(--mono,monospace)!important;letter-spacing:.12em;text-transform:uppercase;color:var(--mc)!important}',
 '#tp-real #mm-box .mm-gab>header{display:flex!important;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:0 0 8px!important;padding:0!important;border:0!important}',
 '#tp-real #mm-box .mm-gab>header>div{flex:1 1 100%;min-width:0}',
 '#tp-real #mm-box .mm-gab>header small{margin-bottom:4px!important}',
 /* listas, campos e rodapés iguais */
 '#tp-real #mm-box :is(.mm-col,.mm-gab) ul{display:flex;flex-direction:column;gap:6px;margin:0 0 10px!important;padding:0!important}',
 '#tp-real #mm-box :is(.mm-col,.mm-gab) ul:last-child{margin-bottom:0!important}',
 '#tp-real #mm-box .mm-vz{margin:0!important;font:italic 12.5px/1.45 Georgia,serif!important;color:#6b5140!important}',
 '#tp-real #mm-box :is(.mm-add input,.mm-or-in){height:32px!important;box-sizing:border-box;padding:0 10px!important;border:1px solid #c9b28a!important;border-radius:8px!important;background:#fffaf0!important;font:13px var(--sans)!important;color:#2a2418!important}',
 '#tp-real #mm-box .mm-add{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px!important}',
 '#tp-real #mm-box .mm-add input{flex:1 1 140px;min-width:0}',
 '#tp-real #mm-box .mm-cont{display:block;margin:2px 0 0!important;font:700 8.5px var(--mono,monospace)!important;letter-spacing:.12em;text-transform:uppercase;color:#8a6f55!important}',
 '#tp-real #mm-box .mm-drop{margin:4px 0 0!important}',
 '#tp-real #mm-box .mm-pf{margin:0 0 10px!important}'
].join('\n');document.head.appendChild(st);})();
setTimeout(function(){try{mmPinta();}catch(e){}},1300);


/* faixa do dia: o pé dela segue a barra FECHADA do rodapé (barra + faixa de notícias), não o rodapé aberto;
   abrir e fechar os apps não muda mais a altura da faixa */
function diaBaixo(){var rod=document.getElementById('rod-apps');if(!rod||getComputedStyle(rod).display==='none')return 0;var h=0;
 Array.prototype.forEach.call(rod.children,function(c){if(!c.classList.contains('rod-corpo')&&getComputedStyle(c).position!=='absolute')h+=c.offsetHeight;});
 var cs=getComputedStyle(rod);h+=(parseFloat(cs.borderTopWidth)||0)+(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);return Math.round(h);}
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#rod-bar'))setTimeout(function(){try{diaPinta();}catch(z){}},380);});
window.addEventListener('resize',function(){try{diaPinta();}catch(z){}});
setTimeout(function(){try{diaPinta();}catch(z){}},2500);


/* ======================= Templo: entablamento fixo com a placa em cima; Concha com as cores da moldura =======================
   A faixa grega do alto (com os dois símbolos) vira uma peça fixa logo abaixo da Concha; a placa do painel pousa sobre ela,
   centrada, e só o conteúdo rola por baixo. A Concha pega o vermelho/terracota da moldura em que está encaixada. */
var TP_ENTAB=null;
function tpCamada1(bg){var i=bg.indexOf('url(');if(i<0)return '';var d=0,q=null;for(var j=i;j<bg.length;j++){var c=bg[j];if(q){if(c===q)q=null;continue;}if(c==='"'||c==="'"){q=c;continue;}if(c==='(')d++;else if(c===')'){d--;if(!d)return bg.slice(i,j+1);}}return '';}
function tpEntab(){var p=document.getElementById('tp-painel');if(!p)return;var fr=p.querySelector('.tp-fr'),re=document.getElementById('tp-real');if(!fr||!re||!re.isConnected)return;
 var sec=re.querySelector(':scope>#tm-painel:not([hidden])')||re.querySelector(':scope>#recreio');
 Array.prototype.forEach.call(re.querySelectorAll(':scope>:is(#tm-painel,#recreio)'),function(x){if(x.offsetParent&&x.offsetHeight)sec=x;});if(!sec)return;
 if(!TP_ENTAB){TP_ENTAB=document.createElement('div');TP_ENTAB.id='tp-entab';TP_ENTAB.setAttribute('aria-hidden','true');TP_ENTAB.innerHTML='<i class="te-band"></i><span class="te-s te-sl"></span><span class="te-s te-sr"></span>';}
 if(TP_ENTAB.parentNode!==fr||TP_ENTAB.nextElementSibling!==re)fr.insertBefore(TP_ENTAB,re);
 var cs=getComputedStyle(sec),band=tpCamada1(cs.backgroundImage);
 var k=(band.match(/stroke=\\?["']?(?:%23|#)([0-9a-fA-F]{6})/)||[])[1],c=(band.match(/fill=\\?["']?(?:%23|#)([0-9a-fA-F]{6})/)||[])[1];
 var ck=cs.getPropertyValue('--col-k').trim(),cc=cs.getPropertyValue('--col-c').trim();
 p.style.setProperty('--tp-k',k?'#'+k:(ck||'#9a4a30'));p.style.setProperty('--tp-c',c?'#'+c:(cc||'#f2c3ab'));
 var bd=TP_ENTAB.querySelector('.te-band');if(bd._b!==band){bd._b=band;bd.style.backgroundImage=band||'none';}
 var src=sec.querySelectorAll('.col-orn .co-sim');['.te-sl','.te-sr'].forEach(function(q,i){var t=TP_ENTAB.querySelector(q),o=src[i];var h=o?o.innerHTML:'';if(t._h!==h||(h&&!t.firstChild)){t._h=h;t.innerHTML=h;}});
 var ml=parseFloat(cs.marginLeft)||0,mr=parseFloat(cs.marginRight)||0;TP_ENTAB.style.marginLeft=ml+'px';TP_ENTAB.style.marginRight=mr+'px';
 var fz=document.getElementById('tp-friso'),fh=fz&&fz.parentNode===fr?fz.offsetHeight:0;p.style.setProperty('--tp-fh',fh+'px');
 p.style.setProperty('--tp-smt',(parseFloat(cs.marginTop)||0)+'px');
 var cab=sec.querySelector(':scope>.tm-cab');p.style.setProperty('--tp-pw',(cab?cab.offsetWidth:220)+'px');}
(function(){var st=document.createElement('style');st.id='tp-entab-css';st.textContent=[
 /* a Concha encosta na faixa: sem vão por onde o conteúdo apareça */
 '#tp-painel:has(#tp-real) #tp-friso{margin-bottom:0!important;border-color:var(--tp-k,#9a4a30)!important;background:linear-gradient(180deg,#fbf3df,#f4e6c8)!important;',
 ' box-shadow:inset 0 3px 0 var(--tp-k,#9a4a30),inset 0 4px 0 #fbf3df,inset 0 5px 0 var(--tp-k,#9a4a30),0 0 0 1px #f7eed8!important;padding-top:5px!important}',
 '#tp-friso .tf-met{border-bottom:1px solid var(--tp-k,#9a4a30)!important}',
 '#tp-friso .tf-m b{color:var(--tp-k,#9a4a30)!important}',
 '#tp-friso .tf-m.prox{background:var(--tp-c,#f2c3ab)!important;box-shadow:inset 0 0 0 1px var(--tp-k,#9a4a30)!important}#tp-friso .tf-m.prox b,#tp-friso .tf-m.prox i{color:#3a160c!important}',
 '#tp-friso .tf-tri{background:repeating-linear-gradient(90deg,var(--tp-k,#9a4a30) 0 1.5px,transparent 1.5px 3.2px)!important;opacity:.85!important}',
 '#tp-friso .tf-leg svg{stroke:var(--tp-k,#9a4a30)!important}#tp-friso .tf-leg b{color:var(--tp-k,#9a4a30)!important}',
 '#tp-friso[aria-expanded="true"]{background:var(--tp-c,#f2c3ab)!important}',
 /* o entablamento fixo */
 '#tp-entab{position:sticky;z-index:6;top:calc(var(--tp-fh,60px) - 22px);height:48px;margin-top:0;margin-bottom:calc(-48px - var(--tp-smt,14px) + 8px);padding-top:8px;box-sizing:border-box;pointer-events:none;',
 ' background:linear-gradient(180deg,#f7eed8,#f3e7cb)}',
 '#tp-entab .te-band{display:block;height:40px;background-repeat:repeat-x;background-size:240px 40px;background-color:#f1e4c6;box-shadow:0 7px 9px -7px rgba(70,35,15,.45)}',
 '#tp-entab .te-s{position:absolute;top:20px;width:22px;height:22px;display:grid;place-items:center;border-radius:50%;background:#f4ead2;border:1px solid var(--tp-k,#9a4a30);box-shadow:0 0 0 2px #f4ead2}',
 '#tp-entab .te-s:empty{display:none}',
 '#tp-entab .te-s svg{width:14px;height:14px;fill:none;stroke:var(--tp-k,#9a4a30);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#tp-entab .te-sl{left:calc(50% - var(--tp-pw,220px)/2 - 34px)}#tp-entab .te-sr{right:calc(50% - var(--tp-pw,220px)/2 - 34px)}',
 '#tp-real>:is(#tm-painel,#recreio)>.col-orn .co-sim{visibility:hidden}',
 /* a placa pousa sobre a faixa */
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab{top:calc(var(--tp-fh,60px) - 22px + 11px)!important;z-index:7!important;margin:-55px auto 18px!important;',
 ' border-color:var(--tp-k,#9a4a30)!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px var(--tp-k,#9a4a30),0 6px 12px -6px rgba(70,35,15,.5)!important}'
].join('\n');document.head.appendChild(st);})();
tpFriso=(function(f0){return function(){var r=f0.apply(this,arguments);try{tpEntab();}catch(e){}return r;};})(tpFriso);
p4Painel=(function(f0){return function(){var r=f0.apply(this,arguments);try{tpEntab();}catch(e){}return r;};})(p4Painel);
window.addEventListener('resize',function(){try{tpEntab();}catch(e){}});
setTimeout(function(){try{tpEntab();}catch(e){}},1600);setTimeout(function(){try{tpEntab();}catch(e){}},4000);


/* ======================= Desfazer: tracinho, hábitos, tarefas e registros do dia =======================
   Antes de cada ação dessas guarda uma cópia do estado; se algo mudou, aparece "desfazer" por 8 s. Ctrl+Z desfaz a última.
   O Registro do dia ganha × em cada linha de hoje. */
var DZ={pilha:[],t:null};
var DZ_ACOES=[['[data-cila]','Tracinho anotado'],['[data-cilamenos]','Tracinho retirado'],['[data-rthx]','Hábito excluído'],['[data-hb]','Hábito marcado'],['[data-hx],[data-delhab],[data-ws-del]','Hábito removido'],
 ['[data-hd],[data-hw],[data-ws-mk]','Hábito alterado'],['#b-hab,[data-ws-add]','Hábito criado'],['[data-mm-ch],[data-mm-cumpre],[data-mm-dia],[data-mm-pp]','Tarefa marcada'],
 ['[data-mm-del]','Tarefa removida'],['[data-dfck]','Inspeção alterada'],['#b-rd','Registro anotado'],['[data-rdx]','Registro apagado'],['[data-lvx],[data-lcx],[data-px]','Item removido'],
 ['#tp-real input[type=checkbox],.rt input[type=checkbox]','Marcação alterada']];
function dzEstado(){try{return JSON.stringify(S);}catch(e){return '';}}
function dzArma(rot){var a=dzEstado();if(!a)return;setTimeout(function(){if(dzEstado()===a)return;DZ.pilha.push({a:a,rot:rot});if(DZ.pilha.length>20)DZ.pilha.shift();dzToast(rot+'.',true);},90);}
function dzRepinta(){['pinta','vxRender','mmPinta','opPinta','diaPinta','tpFriso','tdAgora','rodLog','p4Painel'].forEach(function(n){try{var f={pinta:typeof pinta==='function'?pinta:null,vxRender:typeof vxRender==='function'?vxRender:null,mmPinta:typeof mmPinta==='function'?mmPinta:null,
  opPinta:typeof opPinta==='function'?opPinta:null,diaPinta:typeof diaPinta==='function'?diaPinta:null,tpFriso:typeof tpFriso==='function'?tpFriso:null,tdAgora:typeof tdAgora==='function'?tdAgora:null,rodLog:typeof rodLog==='function'?rodLog:null,p4Painel:typeof p4Painel==='function'?p4Painel:null}[n];if(f)f();}catch(e){}});}
function dzDesfaz(){var u=DZ.pilha.pop();if(!u){dzToast('Nada para desfazer.',false);return;}var o;try{o=JSON.parse(u.a);}catch(e){return;}
 Object.keys(S).forEach(function(k){delete S[k];});for(var k in o)S[k]=o[k];try{grava();}catch(e){}dzRepinta();dzToast('Desfeito: '+u.rot.toLowerCase()+'.',false);}
function dzToast(t,comBotao){var d=document.getElementById('dz-toast');if(!d){d=document.createElement('div');d.id='dz-toast';d.setAttribute('role','status');document.body.appendChild(d);
  d.addEventListener('click',function(e){if(e.target.closest('[data-dz]')){e.stopPropagation();dzDesfaz();}});}
 d.innerHTML='<span>'+esc(t)+'</span>'+(comBotao?'<button type="button" data-dz>desfazer</button>':'');d.classList.add('on');clearTimeout(DZ.t);DZ.t=setTimeout(function(){d.classList.remove('on');},comBotao?8000:2600);}
window.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest||t.closest('#dz-toast'))return;
 for(var i=0;i<DZ_ACOES.length;i++){var el=t.closest(DZ_ACOES[i][0]);if(el&&!el.disabled){dzArma(DZ_ACOES[i][1]);return;}}},true);
window.addEventListener('keydown',function(e){var tg=e.target||{},ed=tg.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName||'');
 if(e.altKey&&(e.key==='d'||e.key==='D')){dzArma('Tracinho anotado');return;}
 if(e.key==='Enter'&&ed&&tg.matches&&tg.matches('#rd-in,#hb-in,[data-ws-in],[data-mm-in]')){dzArma(tg.id==='rd-in'?'Registro anotado':tg.matches('[data-mm-in]')?'Tarefa criada':'Hábito criado');return;}
 if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&(e.key==='z'||e.key==='Z')&&!ed&&DZ.pilha.length){e.preventDefault();dzDesfaz();}},true);
/* × nas linhas de hoje do Registro do dia */
pintaRegDia=(function(f0){return function(){var r=f0.apply(this,arguments);try{var l=document.getElementById('rd-l');if(l){var hoy=hoje(),ix=[];for(var i=0;i<S.log.length&&ix.length<24;i++)if(S.log[i].dia===hoy)ix.push(i);
  Array.prototype.forEach.call(l.querySelectorAll('.rdi'),function(row,k){if(ix[k]==null||row.querySelector('[data-rdx]'))return;var b=document.createElement('button');b.type='button';b.className='rd-x';b.dataset.rdx=ix[k];b.title='apagar esta linha';b.setAttribute('aria-label','apagar esta linha');b.textContent='×';row.appendChild(b);});}}catch(e){}return r;};})(pintaRegDia);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-rdx]');if(!b)return;e.preventDefault();e.stopPropagation();var i=+b.dataset.rdx;if(S.log[i]){S.log.splice(i,1);try{grava();}catch(z){}try{pintaRegDia();}catch(z){}try{rodLog();}catch(z){}}});
(function(){var st=document.createElement('style');st.id='dz-css';st.textContent=[
 '#dz-toast{position:fixed;left:50%;bottom:92px;z-index:400;transform:translate(-50%,12px);opacity:0;pointer-events:none;display:flex;align-items:center;gap:12px;padding:9px 10px 9px 16px;border:1px solid #5a3f2c;border-radius:10px;background:#2a2418;color:#f4ead2;font:13px var(--sans);box-shadow:0 12px 28px -8px rgba(0,0,0,.45);transition:opacity .2s,transform .2s}',
 '#dz-toast.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}',
 '#dz-toast button{margin:0;padding:5px 11px;border:1px solid #e9c87a;border-radius:7px;background:transparent;color:#e9c87a;font:700 10px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;cursor:pointer;width:auto!important}',
 '#dz-toast button:hover{background:#e9c87a;color:#2a2418}',
 '.rdi{position:relative}.rdi .rd-x{margin:0 0 0 6px;padding:0 6px;min-width:0;width:auto!important;height:20px;border:0;border-radius:5px;background:transparent;color:#a08b6c;font:15px/1 Georgia,serif;cursor:pointer;opacity:0;transition:opacity .15s}',
 '.rdi:hover .rd-x,.rdi .rd-x:focus{opacity:1}.rdi .rd-x:hover{background:#9a4a30;color:#fff}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Imagens estéticas nos cartões; vetor só na Fogueira do rodapé =======================
   Cada foto num lugar só. Tarefas e Missões: Chalé = chalé de Apolo, Diárias = alvos no bosque, Conselho = Quíron entre estandartes,
   Oráculo = raios entre as árvores, Profecia = colar de contas. Concha = pavilhão, Inspeção = dentro do chalé, Ronda = fogueira à noite.
   Atividades = canoas, Recarga = refeitório com bandeirolas, Culture Vulture = anfiteatro no bosque. Posto: Hélio = armadura no lago,
   Apolo = linha de tiro pintada, Tática = hoplitas, Hermes = trilha dos templos (Moiras segue com o fuso ilustrado).
   Rodapé: o cartão da Fogueira ganha o forno vetorial (terracota e creme). */
(function(){var T={'.op-l':'armadura-lago.webp','.op-col1':'arquearia-pintura.webp','.op-estudo':'ilustra-musas.svg'};
 try{Object.keys(T).forEach(function(k){if(OP_TEMPLO[k])OP_TEMPLO[k].img=T[k];});}catch(e){}
 var I=function(n){return 'url("img/acampamento/'+n+'")';};
 var st=document.createElement('style');st.id='fotos-cartoes-css';st.textContent=[
 '#mm-box .mm-chale{--mm-img:'+I('chale-apolo.webp')+'!important;--mm-pos:center 40%}',
 '#mm-box .mm-quest{--mm-img:'+I('alvos-bosque.webp')+'!important;--mm-pos:center 57%}',
 '#mm-box .mm-gab{--mm-img:'+I('quiron-estandartes.webp')+'!important;--mm-pos:center 38%}',
 '#mm-box .mm-orac-col{--mm-img:'+I('raios-quiron.webp')+'!important;--mm-pos:center 42%}',
 '#mm-box .mm-prof{--mm-img:'+I('contas-colar.webp')+'!important;--mm-pos:center 46%}',
 '#mm-box :is(.mm-col,.mm-gab)::before{background-position:var(--mm-pos,center)!important;background-size:cover!important}',
 '#tp-real #mm-box .mm-gab::before{content:"";display:block;flex:none;height:78px;margin:-12px -14px 12px;background:var(--mm-img) var(--mm-pos,center)/cover no-repeat;border-bottom:2px solid var(--mc);filter:sepia(.15)}',
 '#rt-box .rt-insp{--rt-img:'+I('chale-interior.webp')+'!important}#rt-box .rt-insp::before{background-position:center 28%!important}',
 '#rt-box .rt-harp{--rt-img:'+I('anfiteatro.jpg')+'!important}',
 '#recreio #lat-apt,#lat-apt{--c-img:'+I('canoas.webp')+'!important}#lat-apt::before{background-position:center 45%!important}',
 '#lat-rec{--c-img:'+I('refeitorio-bandeirolas.webp')+'!important}#lat-rec::before{background-position:center 38%!important}',
 '#recreio #lat-cv,#lat-cv{--c-img:'+I('anfiteatro-bosque.webp')+'!important}#lat-cv::before{background-position:center 55%!important}',
 /* Fogueira do rodapé: o forno vetorial no lugar da bolinha */
 '#rod-apps .rod-fogo .fg-ic{width:44px!important;height:30px!important;flex:none;border:0!important;border-radius:0!important;box-shadow:none!important;background:'+I('vet-forno.svg')+' center/contain no-repeat!important}',
 '#rod-apps .rod-fogo .fg-ic>*{display:none!important}',
 '#rod-apps .rod-fogo .fg-ic::before,#rod-apps .rod-fogo .fg-ic::after{content:none!important}'
 ].join('\n');document.head.appendChild(st);})();


/* ======================= Rodapé sem o cartão de Hábitos; placa dos Rastreados centrada no entablamento ======================= */
(function(){var st=document.createElement('style');st.id='rod-rast-css';st.textContent=[
 '#rod-apps .cr-bar>.cr-hab{display:none!important}',
 '.wrap>.tb.neo-moldura+#h-rast,#h-rast.neo-tit{margin:-4px auto -32px!important;width:max-content!important;max-width:calc(100% - 120px)!important}',
 '.wrap>.rt.neo-moldura,.wrap>#rt-box .rt.neo-moldura{padding-top:48px!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Tirar tracinho e excluir hábito =======================
   "desviei" ganha um − ao lado (retira o último tracinho de hoje). Na grade mensal dos Rastreados, cada hábito ganha um ×:
   o primeiro toque pergunta "excluir?", o segundo exclui (e ainda dá para desfazer). */
function ciMenos(){var c=ciD(),hj=dHoje(),L=c.dia[hj]||[];if(!L.length)return;L.pop();if(!L.length)delete c.dia[hj];try{grava();}catch(e){}try{opPinta();}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-cilamenos]');if(!b)return;e.preventDefault();e.stopPropagation();ciMenos();},false);
pintaRastro=(function(f0){return function(){var r=f0.apply(this,arguments);try{var w=document.getElementById('rt-w');if(w){var tds=w.querySelectorAll('tbody tr:not(.tot)>td.h');
  Array.prototype.forEach.call(tds,function(td,i){if(td.querySelector('[data-rthx]'))return;var x=document.createElement('button');x.type='button';x.className='rt-hx';x.dataset.rthx=i;x.title='excluir hábito';x.setAttribute('aria-label','excluir hábito');x.textContent='×';td.appendChild(x);});}}catch(e){}return r;};})(pintaRastro);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-rthx]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(!b.classList.contains('conf')){b.classList.add('conf');b.textContent='excluir?';clearTimeout(b._t);b._t=setTimeout(function(){b.classList.remove('conf');b.textContent='×';},3500);return;}
 var i=+b.dataset.rthx;if(S.hab&&S.hab[i]){var nm=S.hab[i].nome;S.hab.splice(i,1);try{grava();}catch(z){}try{pinta();}catch(z){}}},false);
(function(){var st=document.createElement('style');st.id='ci-hab-css';st.textContent=[
 '.rtg td.h{position:relative;padding-right:22px!important}',
 '.rtg td.h .rt-hx{position:absolute;right:2px;top:50%;transform:translateY(-50%);margin:0;padding:0 5px;width:auto!important;min-width:0;height:18px;border:0;border-radius:4px;background:transparent;color:#a08b6c;font:14px/1 Georgia,serif;cursor:pointer;opacity:0;transition:opacity .15s}',
 '.rtg tr:hover td.h .rt-hx,.rtg td.h .rt-hx:focus,.rtg td.h .rt-hx.conf{opacity:1}',
 '.rtg td.h .rt-hx:hover{background:#9a4a30;color:#fff}',
 '.rtg td.h .rt-hx.conf{background:#9a4a30;color:#fff;font:700 9px var(--mono,monospace);letter-spacing:.1em;text-transform:uppercase;padding:0 6px;right:2px;z-index:2}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Templo da direita sem o fundo bege em volta =======================
   Sai a moldura bege (fundo, borda, filetes e respiro) entre o trilho e o templo; o templo encosta nas bordas. */
(function(){var st=document.createElement('style');st.id='tp-sem-bege-css';st.textContent=[
 '#tp-painel:has(#tp-real){padding:0!important;background:none!important}',
 '#tp-painel:has(#tp-real) .tp-fr{background:none!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:0!important}',
 '#tp-painel:has(#tp-real) .tp-fr::before,#tp-painel:has(#tp-real) .tp-fr::after{display:none!important}',
 '#tp-painel:has(#tp-real) #tp-friso{top:0!important;margin:0!important;border-radius:0!important;border-left:0!important;border-right:0!important}',
 '#tp-entab{top:var(--tp-fh,60px)!important;height:40px!important;padding-top:0!important;margin-bottom:calc(-40px - var(--tp-smt,14px))!important;background:none!important}',
 '#tp-real>:is(#tm-painel,#recreio)>.tm-cab{top:calc(var(--tp-fh,60px) + 3px)!important}',
 '#tp-real>:is(#tm-painel,#recreio){margin-left:0!important;margin-right:0!important}',
 '#rail:has(#tp-real){background:none!important;box-shadow:none!important;padding-bottom:0!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Mural sem o texto de abertura: a explicação vira etiqueta ao passar o cursor nos grupos =======================
   E o painel esquerdo refeito: grupos HOJE e SEMANA, cartões no mesmo padrão do templo, Arena sem caixas dentro de caixas. */
(function(){var st=document.createElement('style');st.id='mm-dica-lat-css';st.textContent=[
 '#tp-real #mm-box .mm-h{display:none!important}',
 '#tp-real #mm-box .mm-grp-t{margin-top:2px!important}',
 '#mm-box .mm-grp{position:relative;cursor:help;outline:0}',
 '#mm-box .mm-grp .mm-q{display:inline-grid;place-items:center;width:13px;height:13px;margin:0 6px 0 5px;border:1px solid currentColor;border-radius:50%;font:700 8px/1 var(--sans);letter-spacing:0;opacity:.7;vertical-align:1px}',
 '#mm-box .mm-grp .mm-dica{position:absolute;left:0;top:calc(100% + 6px);z-index:30;width:max-content;max-width:300px;padding:8px 11px;border:1px solid #5a3f2c;border-radius:8px;background:#2a2418;color:#f4ead2;',
 ' font:400 12px/1.45 var(--sans);font-style:normal;letter-spacing:0;text-transform:none;white-space:normal;box-shadow:0 10px 22px -8px rgba(0,0,0,.45);opacity:0;transform:translateY(-3px);pointer-events:none;transition:opacity .15s,transform .15s}',
 '#mm-box .mm-grp .mm-dica b{color:#e9c87a;font-weight:700}',
 '#mm-box .mm-grp:hover .mm-dica,#mm-box .mm-grp:focus .mm-dica{opacity:1;transform:none}',
 /* ---------- painel esquerdo ---------- */
 '#lat-e{display:flex!important;flex-direction:column;gap:12px;padding-bottom:16px!important}',
 '#lat-e>*{margin-top:0!important;margin-bottom:0!important}',
 '#lat-e>#lat-topo{order:0}#lat-e>.lat-grp-h{order:1}#lat-e>#lat-gm{order:2}#lat-e>#lat-arena{order:3}#lat-e>#lat-vx{order:4}#lat-e>.lat-grp-s{order:5}#lat-e>#lat-band{order:6}#lat-e>#lat-cp{order:7}',
 '#lat-e>.lat-grp{margin:2px 12px -4px!important;display:flex;align-items:center;gap:8px;font:700 8.5px var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase;color:#9a7b4a}',
 '#lat-e>.lat-grp::after{content:"";flex:1;height:1px;background:#c9b28a}',
 /* um só cartão */
 '#lat-e>:is(#lat-arena,#lat-band,#lat-cp),#lat-e>#lat-gm>.gm,#lat-e>#lat-vx>.vx-card{--lc:#9a6b3a;margin-left:12px!important;margin-right:12px!important;padding:12px 14px!important;box-sizing:border-box;background:#fbf5e6!important;',
 ' border:1px solid #d6c69c!important;border-top:3px solid var(--lc)!important;border-radius:10px!important;box-shadow:0 1px 0 #e9dcbc!important}',
 '#lat-e>#lat-gm,#lat-e>#lat-vx{margin:0!important;padding:0!important}',
 '#lat-e>#lat-gm>.gm{--lc:#b98c47}#lat-e>#lat-arena{--lc:#a4532f}#lat-e>#lat-vx>.vx-card{--lc:#5f7a3a}#lat-e>#lat-band{--lc:#7a4a58}#lat-e>#lat-cp{--lc:#427d91}',
 '#lat-e>#lat-arena{padding-top:0!important;overflow:hidden}',
 '#lat-e>#lat-arena::before{margin-left:-14px!important;margin-right:-14px!important}',
 /* cabeçalhos iguais */
 '#lat-e .lat-c>header{margin:0 0 10px!important;padding:0!important}',
 '#lat-e #lat-gm .gm-bot>div:first-child>:first-child{display:block;margin:0 0 4px;font:700 8.5px var(--mono,monospace)!important;letter-spacing:.14em;text-transform:uppercase;color:var(--lc)!important}',
 '#lat-e #lat-vx .vx-card h3{margin:0 0 6px!important;font:400 16px/1.25 Georgia,serif!important;font-variant:small-caps;letter-spacing:.03em;color:#2a2418!important}',
 '#lat-e #lat-vx .vx-card h3::before{content:"hoje · aparecem sozinhas";display:block;margin:0 0 3px;font:700 8.5px var(--mono,monospace);font-variant:normal;letter-spacing:.14em;text-transform:uppercase;color:var(--lc)}',
 '#lat-e #lat-vx .vx-muted{margin:0!important;font:italic 12.5px/1.45 Georgia,serif!important;color:#6b5140!important}',
 /* Arena: sem caixas dentro de caixas */
 '#lat-arena #vx-body .vx-card,#lat-arena #vx-body details,#lat-arena #vx-body>div>section,#lat-arena #vx-body .vx-main,#lat-arena #vx-body .vx-side>*{background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important;margin:0!important;padding:10px 0!important}',
 '#lat-arena #vx-body .vx-card+.vx-card,#lat-arena #vx-body details,#lat-arena #vx-body .vx-side>*+*{border-top:1px dashed #c9b28a!important}',
 '#lat-arena .vx-metrics{margin:0 0 4px!important;padding:0 0 10px!important;border-bottom:1px dashed #c9b28a}',
 '#lat-arena #vx-body h3{font:400 16px/1.25 Georgia,serif!important;font-variant:small-caps;color:#2a2418!important;margin:0 0 8px!important}',
 '#lat-arena #vx-body .vx-row,#lat-arena #vx-body [class*="filtro"],#lat-arena #vx-body .vx-filters{flex-wrap:wrap;gap:5px!important}',
 '#lat-arena #vx-body button:not(.vx-primary){padding:4px 10px!important;font-size:12px!important;min-height:0!important;border-radius:999px!important}',
 /* Copa mais baixa */
 '#lat-cp #lat-cp-b svg{max-height:92px}',
 '#lat-arena .vx-metrics{border-bottom:0!important;padding-bottom:4px!important}',
 '#lat-arena #vx-body .vx-card:has(>h3) .vx-row{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px!important;margin-bottom:6px}',
 '#lat-arena #vx-body .vx-card:has(>h3) .vx-row button{width:100%!important;margin:0!important;padding:5px 0!important;font-size:12px!important;white-space:nowrap;display:flex!important;justify-content:center;align-items:center}',
 '#lat-arena #vx-body h2{margin:6px 0 6px!important;font:400 18px/1.25 Georgia,serif!important;color:#2a2418!important}',
 '#lat-arena #vx-body p{font-size:12.5px!important;line-height:1.45!important}'
].join('\n');document.head.appendChild(st);})();
function latGrupos(){var e=document.getElementById('lat-e');if(!e)return;[['lat-grp-h','hoje'],['lat-grp-s','a semana']].forEach(function(g){if(!e.querySelector(':scope>.'+g[0])){var d=document.createElement('div');d.className='lat-grp '+g[0];d.textContent=g[1];e.appendChild(d);}});}
setTimeout(function(){try{latGrupos();}catch(e){}},1200);setTimeout(function(){try{latGrupos();}catch(e){}},4000);


/* ======================= Recolher os tópicos do painel direito; Ação do dia mais compacta =======================
   Cada cartão das duas faces (Tarefas e Missões, Recreação) ganha um botão ▾ no canto: recolhe até ficar só o título.
   Tocar no rótulo do grupo (Tarefas, Missões, Desafio) recolhe ou abre o grupo inteiro. O estado fica guardado. */
var TP_DOB_K=['mm-chale','mm-quest','mm-gab','mm-orac-col','mm-prof','lat-apt','lat-rec','lat-cv'];
var TP_DOB_G={'mm-grp-t':['mm-chale','mm-quest','mm-gab'],'mm-grp-m':['mm-orac-col'],'mm-grp-d':['mm-prof']};
function tpDobD(){try{return JSON.parse(localStorage.getItem('astro_tp_dobra')||'{}')||{};}catch(e){return {};}}
function tpDobSalva(d){try{localStorage.setItem('astro_tp_dobra',JSON.stringify(d));}catch(e){}}
function tpDobCard(k){var r=document.getElementById('tp-real');if(!r)return null;return r.querySelector('#'+k)||r.querySelector('.'+k);}
function tpDobAplica(){var r=document.getElementById('tp-real');if(!r)return;var D=tpDobD();
 TP_DOB_K.forEach(function(k){var c=tpDobCard(k);if(!c)return;var b=c.querySelector(':scope>.tp-dobra');
  if(!b){b=document.createElement('button');b.type='button';b.className='tp-dobra';b.dataset.tpdob=k;c.insertBefore(b,c.firstChild);}
  var on=!!D[k];if(c.classList.contains('tp-dob')!==on)c.classList.toggle('tp-dob',on);var t=on?'abrir':'recolher';if(b.title!==t){b.title=t;b.setAttribute('aria-label',t);b.setAttribute('aria-expanded',String(!on));}});
 Object.keys(TP_DOB_G).forEach(function(g){var l=r.querySelector('.'+g);if(!l)return;var todos=TP_DOB_G[g].every(function(k){return D[k];});if(l.classList.contains('grp-dob')!==todos)l.classList.toggle('grp-dob',todos);});}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tp-real .tp-dobra');
 if(b){e.preventDefault();e.stopPropagation();var D=tpDobD(),k=b.dataset.tpdob;D[k]=!D[k];if(!D[k])delete D[k];tpDobSalva(D);tpDobAplica();return;}
 var g=e.target.closest&&e.target.closest('#tp-real .mm-grp');if(g){var key=Object.keys(TP_DOB_G).filter(function(x){return g.classList.contains(x);})[0];if(!key)return;
  var D2=tpDobD(),fechar=!TP_DOB_G[key].every(function(k){return D2[k];});TP_DOB_G[key].forEach(function(k){if(fechar)D2[k]=1;else delete D2[k];});tpDobSalva(D2);tpDobAplica();}},true);
(function(){var t=null,mo=new MutationObserver(function(){if(t)return;t=requestAnimationFrame(function(){t=null;try{tpDobAplica();}catch(e){}});});
 var liga=function(){var p=document.getElementById('tp-painel');if(p){mo.observe(p,{childList:true,subtree:true});tpDobAplica();return true;}return false;};
 if(!liga())setTimeout(liga,1500);})();
(function(){var st=document.createElement('style');st.id='tp-dobra-css';st.textContent=[
 '#tp-real :is(.mm-col,.mm-gab,.lat-c){position:relative}',
 '#tp-real .tp-dobra{position:absolute;top:7px;right:7px;z-index:4;margin:0!important;padding:0!important;width:24px!important;min-width:0;height:24px;display:grid;place-items:center;border:1px solid rgba(90,63,44,.45)!important;border-radius:50%!important;',
 ' background:rgba(251,245,230,.92)!important;color:#5a3f2c;cursor:pointer;box-shadow:0 2px 6px -2px rgba(40,25,10,.4)}',
 '#tp-real .tp-dobra::before{content:"−";font:700 15px/1 var(--sans)}',
 '#tp-real .tp-dob>.tp-dobra::before{content:"+"}',
 '#tp-real .tp-dob::after{display:none!important}',
 '#tp-real .tp-dobra:hover{background:#5a3f2c!important;color:#fbf5e6}',
 /* recolhido: só o título */
 '#tp-real .tp-dob::before{display:none!important}',
 '#tp-real .mm-col.tp-dob>:not(.mm-k):not(.mm-k + small):not(.tp-dobra){display:none!important}',
 '#tp-real .mm-col.tp-dob>.mm-k+small{margin-bottom:0!important}',
 '#tp-real :is(.mm-gab,.lat-c).tp-dob>:not(header):not(.tp-dobra){display:none!important}',
 '#tp-real :is(.mm-gab,.lat-c).tp-dob>header{margin-bottom:0!important}',
 '#tp-real #mm-box .tp-dob{padding-top:12px!important;padding-bottom:12px!important;padding-right:40px!important}',
 '#tp-real #mm-box .mm-grp{cursor:pointer}#tp-real #mm-box .mm-grp.grp-dob{opacity:.65}',
 '#tp-real #mm-box .mm-grp::before{content:"▾";margin-right:5px;font-size:9px;display:inline-block;transition:transform .15s}#tp-real #mm-box .mm-grp.grp-dob::before{transform:rotate(-90deg)}',
 /* ---------- Ação do dia mais compacta ---------- */
 '#lat-e>#lat-arena::before{height:52px!important;margin-bottom:8px!important}',
 '#lat-arena>header{margin-bottom:6px!important}',
 '#lat-arena .vx-metrics{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px!important;margin:0!important;padding:0 0 6px!important}',
 '#lat-arena .vx-metrics>*{padding:2px 0 2px 7px!important;margin:0!important;min-width:0}',
 '#lat-arena .vx-metrics b,#lat-arena .vx-metrics strong{font-size:15px!important;line-height:1.1!important}',
 '#lat-arena .vx-metrics span,#lat-arena .vx-metrics small{font-size:9.5px!important;line-height:1.2!important}',
 '#lat-arena #vx-body .vx-card,#lat-arena #vx-body details,#lat-arena #vx-body .vx-main,#lat-arena #vx-body .vx-side>*{padding:7px 0!important}',
 '#lat-arena #vx-body h2{margin:3px 0 4px!important;font-size:15px!important}',
 '#lat-arena #vx-body h3{margin:0 0 5px!important;font-size:14px!important}',
 '#lat-arena #vx-body p{margin:0 0 6px!important;font-size:11.5px!important;line-height:1.35!important}',
 '#lat-arena #vx-body .vx-primary{padding:5px 12px!important;font-size:12px!important;min-height:0!important}',
 '#lat-arena #vx-body details>summary{font-size:12px!important;padding:0!important}',
 '#lat-arena #vx-body .vx-card:has(>h3) .vx-row{gap:4px!important;margin-bottom:4px!important}',
 '#lat-arena #vx-body .vx-card:has(>h3) .vx-row button{padding:3px 0!important;font-size:11px!important}',
 '#lat-arena #vx-body [class*="vx-k"],#lat-arena #vx-body .vx-top span{font-size:9px!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Conquistas do Dia como rodapé da meta do dia ======================= */
function gmVit(){var gm=document.querySelector('#lat-gm .gm');if(!gm)return;var all=document.querySelectorAll('.v4-vit');if(!all.length)return;
 var nova=null;Array.prototype.forEach.call(all,function(v){if(!gm.contains(v))nova=v;});
 if(nova){Array.prototype.forEach.call(gm.querySelectorAll('.v4-vit'),function(v){v.remove();});gm.appendChild(nova);}
 var v=gm.querySelector('.v4-vit');if(v){v.classList.add('gm-vit');var h=v.querySelector('h3');if(h&&h.textContent!=='Conquistas do Dia')h.textContent='Conquistas do Dia';if(gm.lastElementChild!==v)gm.appendChild(v);}}
(function(){var t=null,mo=new MutationObserver(function(){if(t)return;t=requestAnimationFrame(function(){t=null;try{gmVit();}catch(e){}});});
 var liga=function(){var e=document.getElementById('lat-e');if(e){mo.observe(e,{childList:true,subtree:true});gmVit();return true;}return false;};if(!liga())setTimeout(liga,1500);})();
(function(){var st=document.createElement('style');st.id='gm-vit-css';st.textContent=[
 '#lat-e>#lat-vx{display:none!important}',
 '#lat-gm .gm .gm-vit{margin:10px 0 0!important;padding:9px 0 0!important;background:none!important;border:0!important;border-top:1px dashed #c9b28a!important;border-radius:0!important;box-shadow:none!important}',
 '#lat-gm .gm .gm-vit h3{margin:0 0 4px!important;font:700 8.5px var(--mono,monospace)!important;letter-spacing:.14em;text-transform:uppercase;color:#5f7a3a!important}',
 '#lat-gm .gm .gm-vit h3::before{content:"✦ ";}',
 '#lat-gm .gm .gm-vit .vx-muted{margin:0!important;font:italic 12px/1.4 Georgia,serif!important;color:#6b5140!important}',
 '#lat-gm .gm .gm-vit ul{margin:2px 0 0 16px!important;padding:0!important;font-size:12.5px;line-height:1.45}',
 '#lat-arena .vx-metrics span{display:flex!important;flex-direction:column;gap:1px}',
 '#lat-arena .vx-metrics b{font-size:14px!important}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Diário de bordo (ex-Anais do dia) no painel esquerdo, logo abaixo da meta do dia =======================
   O registro com hora sai do rodapé e vira um cartão fixo; o botão do rodapé fica oculto (só serve de âncora para a Fogueira). */
rodLog=function(){var top=document.querySelector('#rod-apps .rod-top'),rd=document.querySelector('.regdia'),e=document.getElementById('lat-e');
 if(top){var b=document.getElementById('rod-log');if(!b){b=document.createElement('button');b.type='button';b.id='rod-log';b.className='rod-log';b.hidden=true;var rr=document.getElementById('rod-reg');top.insertBefore(b,rr?rr.nextSibling:null);}b.hidden=true;}
 var p=document.getElementById('rod-log-pop');if(p)p.hidden=true;
 if(!e||!rd)return;var c=document.getElementById('lat-db');
 if(!c){c=document.createElement('section');c.id='lat-db';c.className='lat-c lat-db';c.innerHTML='<header><span class="lat-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h11v13a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2v-1h10v1a2 2 0 0 0 2 2"/><path d="M7 4a2 2 0 0 0-2 2v11M10 8h5M10 11h5M10 14h3"/></svg></span><div><span class="lat-k">registro com hora · ações entram sozinhas</span><h3 class="lat-t">Diário de bordo</h3></div></header><div class="lat-b db-slot"></div>';e.appendChild(c);}
 var sl=c.querySelector('.db-slot');if(rd.parentNode!==sl)sl.appendChild(rd);};
setTimeout(function(){try{rodLog();}catch(e){}},1400);setTimeout(function(){try{rodLog();}catch(e){}},4200);
(function(){var st=document.createElement('style');st.id='lat-db-css';st.textContent=[
 '#rod-apps #rod-log{display:none!important}',
 '#lat-e>#lat-gm{order:2}#lat-e>#lat-db{order:3}#lat-e>#lat-arena{order:4}#lat-e>#lat-vx{order:5}#lat-e>.lat-grp-s{order:6}#lat-e>#lat-band{order:7}#lat-e>#lat-cp{order:8}',
 '#lat-e>#lat-db{--lc:#6b5a9a;margin:0 12px!important;padding:12px 14px!important;box-sizing:border-box;background:#fbf5e6!important;border:1px solid #d6c69c!important;border-top:3px solid var(--lc)!important;border-radius:10px!important;box-shadow:0 1px 0 #e9dcbc!important}',
 '#lat-db>header{display:flex;align-items:center;gap:9px;margin:0 0 8px}',
 '#lat-db .lat-ic{flex:none;width:30px;height:30px;display:grid;place-items:center;border:1px solid #c9b28a;border-radius:50%;background:#f4ead2}',
 '#lat-db .lat-ic svg{width:16px;height:16px;fill:none;stroke:var(--lc);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
 '#lat-db .lat-k{display:block;font:700 8.5px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--lc)}',
 '#lat-db .lat-t{margin:1px 0 0;font:700 15px/1.2 Georgia,serif;color:#2a2418}',
 '#lat-db .regdia{margin:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}',
 '#lat-db .regdia .mcab2 .k9{display:none!important}',
 '#lat-db .regdia .mcab2{margin:0 0 6px!important;padding:0!important;border:0!important}',
 '#lat-db .regdia .rdsub{font:italic 11.5px Georgia,serif!important;color:#6b5140!important;text-transform:none!important;letter-spacing:0!important}',
 '#lat-db .regdia .rdent{display:flex;gap:6px;margin:0 0 8px!important}',
 '#lat-db .regdia .rdent input{flex:1;min-width:0;height:32px;box-sizing:border-box;padding:0 10px!important;border:1px solid #c9b28a!important;border-radius:8px!important;background:#fffaf0!important;font:13px var(--sans)!important}',
 '#lat-db .regdia .rdent button{flex:none;height:32px;margin:0!important;padding:0 12px!important;width:auto!important;border-radius:8px!important}',
 '#lat-db .regdia .rdl{max-height:220px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}'
].join('\n');document.head.appendChild(st);})();



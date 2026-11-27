/* Valhala · comum a todas as páginas: tons, materiais, kit, ícones aplicados
   Carregado só quando o tema Hotel Valhala está ligado. */
(function(){var TV_ON=true,OP_TEMPLO=window.OP_TEMPLO||{};
if(TV_ON){(function(){var A=[['#tt-indice [data-tt="fin"]','r_f'],['#tt-indice [data-ic="b9"]','mjolnir'],['#tt-indice [data-ic="laptop"]','olho'],['#tt-indice [data-ic="enf"]','r_b'],['#tt-indice [data-ic="sat"]','chifre'],
 ['#lat-db .lat-ic','r_a'],['#lat-arena .lat-ic','r_t'],['#lat-e .lat-ic','r_o'],['.qa-ic','ponte'],['.co-sim.co-sl','valknut'],['.co-sim.co-sr','vegvisir'],['.cr-concha','chifre'],['.ico.ico-sino','chifre'],['#fer-bt','mjolnir'],['.cv-ave','corvo'],['#op-tg','drakkar'],['#painel-dir [data-pane="fin"] .pd-medal','r_f'],['#painel-dir [data-pane="fin"] .pd-marca','r_f'],['#painel-dir [data-pane="lap"] .pd-medal','olho'],['#painel-dir [data-pane="lap"] .pd-marca','olho'],['#painel-dir [data-pane="enf"] .pd-medal','r_b'],['#painel-dir [data-pane="enf"] .pd-marca','r_b'],['#painel-dir [data-pane="b9"] .pd-medal','mjolnir'],['#painel-dir [data-pane="b9"] .pd-marca','mjolnir']];
 function vh(){var S=window.VH_SIMB;if(!S)return;A.forEach(function(a){Array.prototype.forEach.call(document.querySelectorAll(a[0]),function(el){var sv=el.tagName==='svg'?el:el.querySelector('svg');if(!sv||sv.getAttribute('data-vh')===a[1])return;
  sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('fill','none');sv.setAttribute('stroke','currentColor');sv.setAttribute('stroke-linecap','round');sv.setAttribute('stroke-linejoin','round');if(!sv.getAttribute('stroke-width'))sv.setAttribute('stroke-width','1.7');sv.innerHTML=S[a[1]];sv.setAttribute('data-vh',a[1]);});});}
 var t=null;new MutationObserver(function(){if(t)return;t=setTimeout(function(){t=null;try{vh();}catch(e){}},250);}).observe(document.body,{childList:true,subtree:true});
 setTimeout(vh,300);setTimeout(vh,1500);})();}
if(TV_ON){(function(){var I=function(n){return 'url("img/acampamento/'+n+'?v=3")';};var st=document.createElement('style');st.id='tv-portal-css';st.textContent=[
 'body.tv .neo-moldura{--neo-fuste:'+I('vh-fuste.svg')+'!important;--neo-cap:'+I('vh-capitel.svg')+'!important;--neo-base:'+I('vh-base.svg')+'!important}',
 'body.tv #modo-op .op-templo{--t-fuste:'+I('vh-fuste.svg')+'!important;--t-cap:'+I('vh-capitel.svg')+'!important;--t-base:'+I('vh-base.svg')+'!important}',
 'body.tv #hero-box .bn-slot{position:relative;margin:0 6px!important;padding:0 50px!important;background:',
 '  '+I('vh-capitel.svg')+' 2px 0/46px 31px no-repeat,'+I('vh-capitel.svg')+' calc(100% - 2px) 0/46px 31px no-repeat,',
 '  '+I('vh-fuste.svg')+' 2px 31px/46px 40px repeat-y,'+I('vh-fuste.svg')+' calc(100% - 2px) 31px/46px 40px repeat-y,#e9e6d6!important}',
 'body.tv #hero-box .bn-slot::after{content:"";position:absolute;left:2px;right:2px;bottom:0;height:14px;background:'+I('vh-base.svg')+' 0 0/46px 14px no-repeat,'+I('vh-base.svg')+' 100% 0/46px 14px no-repeat}',
 'body.tv #hero-box .vx-hero{border:2px solid #1d4a2c!important;box-shadow:inset 0 0 0 3px #e9e6d6,inset 0 0 0 4.5px #d4ad4f!important;border-radius:4px!important}',
 'body.tv #hero-box .vx-hero::after{-webkit-mask-size:24px 24px!important;mask-size:24px 24px!important;background:#1d4a2c!important;opacity:.85}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var I=function(n){return 'url("img/acampamento/'+n+'.svg?v=4")';};
 var tom=function(sel,t,k){return sel+'{--neo-fuste:'+I('vh-fuste-'+t)+'!important;--neo-cap:'+I('vh-capitel-'+t)+'!important;--neo-base:'+I('vh-base-'+t)+'!important;--neo-ent:'+I('vh-escudos-'+t)+'!important;--col-k:'+k+'!important;border-color:'+k+'!important}';};
 var op=function(sel,t,k){return 'body.tv #modo-op '+sel+'.op-templo{--t-fuste:'+I('vh-fuste-'+t)+'!important;--t-cap:'+I('vh-capitel-'+t)+'!important;--t-base:'+I('vh-base-'+t)+'!important;--t-ent:'+I('vh-escudos-'+t)+'!important;--t-k:'+k+'!important}';};
 var st=document.createElement('style');st.id='tv-tons-css';st.textContent=[
  tom('body.tv .wrap>.tb.neo-moldura','ferro','#2d3a4a'),tom('body.tv .wrap>.rt.neo-moldura,body.tv .wrap>#rt-box .rt.neo-moldura','sangue','#6a1e1e'),
  op('.op-l','ferro','#2d3a4a'),op('.op-fazer','sangue','#6a1e1e'),op('.op-estudo','madeira','#5b3b22'),op('.op-lado','ferro','#2d3a4a'),
  'body.tv #modo-op .op-l{--t-foto:'+I('vh-sol-ferro')+'!important}body.tv #modo-op .op-fazer{--t-foto:'+I('vh-fuso-sangue')+'!important}body.tv #modo-op .op-estudo{--t-foto:'+I('vh-olho-madeira')+'!important}body.tv #modo-op .op-lado{--t-foto:'+I('vh-valknut-ferro')+'!important}',
  /* placas no tom do seu templo */
  'body.tv h2.sec.neo-tit.placa-tom{background:linear-gradient(180deg,color-mix(in srgb,var(--pk) 82%,#fff),var(--pk))!important;box-shadow:0 0 0 3px #e9e6d6,0 0 0 4.5px #d4ad4f!important}',
  /* frontão e banner em madeira com ouro */
  'body.tv .vh-telhado{background:'+I('vh-telha-madeira')+' 0 0/24px 16px repeat,#3a2414!important}',
  'body.tv .vh-viga{background:'+I('vh-no-h-madeira')+' 0 0/32px 16px repeat-x,#5b3b22!important}',
  'body.tv #hero-box .nf2 .nf-txt{background:#3a2414!important;box-shadow:0 0 0 2px #3a2414!important}',
  'body.tv #hero-box .nf2>.pd-pilula{background:linear-gradient(180deg,#6e4a2c,#4a2f1a)!important;box-shadow:0 0 0 3px #3a2414,0 0 0 4.5px #d4ad4f,0 6px 12px -6px rgba(0,0,0,.6)!important}',
  'body.tv #hero-box .nf2>.pd-pilula button{border-left-color:#7a5636!important}',
  'body.tv #hero-box .bn-slot{background:'+I('vh-capitel-madeira')+' 2px 0/46px 31px no-repeat,'+I('vh-capitel-madeira')+' calc(100% - 2px) 0/46px 31px no-repeat,'+I('vh-fuste-madeira')+' 2px 31px/46px 40px repeat-y,'+I('vh-fuste-madeira')+' calc(100% - 2px) 31px/46px 40px repeat-y,#e9e6d6!important}',
  'body.tv #hero-box .bn-slot::after{background:'+I('vh-base-madeira')+' 0 0/46px 14px no-repeat,'+I('vh-base-madeira')+' 100% 0/46px 14px no-repeat!important}',
  'body.tv #hero-box .vx-hero{border-color:#5b3b22!important}body.tv #hero-box .vx-hero::after{background:#5b3b22!important}',
  /* painel esquerdo: faixas de madeira e cartões em tons variados */
  '@media(min-width:1380px){body.tv #nav.navdr{background-image:'+I('vh-no-v-madeira')+','+I('vh-no-v-madeira')+'!important}}',
  'body.tv #lat-e>#lat-gm>.gm{--lf:'+I('vh-elmo-ferro')+';--lc:#2d3a4a}',
  'body.tv #lat-e>#lat-db{--lf:'+I('vh-livro-sangue')+';--lc:#6a1e1e}',
  'body.tv #lat-arena{--c-img:'+I('vh-runas-madeira')+'!important}body.tv #lat-e>#lat-arena{--lc:#5b3b22}',
  'body.tv #lat-ars{--c-img:'+I('vh-escudo-ferro')+'!important}',
  'body.tv #rod-apps .rod-fogo .fg-ic{background-image:'+I('vh-valknut-sangue')+'!important}'
 ].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var MAP=[[/#(1d4a2c|2d3a4a|6a1e1e|5b3b22|1f2c45)/gi,'#5a3c22'],[/#(123321|3a2414|1b2430|3f1010|143a22|4a2f1a)/gi,'#3b2717'],[/#(256139|6e4a2c|26365a)/gi,'#7a5230'],[/#(3f6f4a|7a5636|3a4a6a)/gi,'#8a6a48'],[/#cfd8bd/gi,'#e3dccf'],[/#e9e6d6/gi,'#ece6dc'],[/#d4ad4f/gi,'#a9b1b8']];
 var conv=function(t){t=t.replace(/vh-([a-z0-9-]+?)(-ferro|-sangue|-madeira)?\.svg/g,function(m,n){return 'vh-'+n+'-carvalho.svg';});MAP.forEach(function(p){t=t.replace(p[0],p[1]);});return t;};
 var faz=function(){Array.prototype.forEach.call(document.querySelectorAll('style[id^="tv-"]'),function(st){if(st.id==='tv-pedra-css'||st.dataset.tinta)return;st.textContent=conv(st.textContent);st.dataset.tinta='1';});
  try{Object.keys(OP_TEMPLO).forEach(function(k){var i=OP_TEMPLO[k];if(i.img&&/^vh-/.test(i.img)&&!/-carvalho/.test(i.img))i.img=i.img.replace(/(-ferro|-sangue|-madeira)?\.svg$/,'-carvalho.svg');});}catch(e){}};
 faz();setTimeout(faz,50);
 var st=document.createElement('style');st.id='tv-pedra-css';st.textContent=[
  'body.tv{background-color:#e9e2d6!important}',
  'body.tv .wrap,body.tv #nav.navdr,body.tv #rail{background-color:#e9e2d6!important}',
  'body.tv #hero-box .vx-hero{background:linear-gradient(135deg,#f3eee5,#e6dfd2)!important}',
  'body.tv :is(.lat-c,#lat-gm>.gm,#lat-db,#mm-box .mm-col,#mm-box .mm-gab,.neo-moldura){background-color:#f7f3ec!important}',
  'body.tv .vh-beiral{background:linear-gradient(180deg,#e3e7ea,#8b949c)!important}',
  'body.tv #hero-box .nf2 .nf-txt{background:#4a3220!important;color:#e3e7ea!important;border-color:#9aa3ab!important;box-shadow:0 0 0 2px #4a3220!important}',
  'body.tv #hero-box .nf2>.pd-pilula{background:linear-gradient(180deg,#5f4129,#4a3220)!important;border-color:#9aa3ab!important;box-shadow:0 0 0 3px #2f1f12,0 0 0 4.5px #9aa3ab,0 6px 12px -6px rgba(0,0,0,.5)!important}',
  'body.tv #hero-box .nf2>.pd-pilula button{color:#e3e7ea!important;border-left-color:#6a4a2e!important}',
  'body.tv h2.sec.neo-tit.placa-tom,body.tv #tp-real>:is(#tm-painel,#recreio)>.tm-cab{background:linear-gradient(180deg,#5f4129,#4a3220)!important;border-color:#9aa3ab!important;color:#f7f3ec!important;box-shadow:0 0 0 3px #e9e2d6,0 0 0 4.5px #4a3220!important}',
  'body.tv h2.sec.neo-tit.placa-tom>span,body.tv #tp-real .tm-cab .tp-placa button{color:#e3e7ea!important}',
  'body.tv #lat-e>:is(#lat-arena,#lat-band,#lat-cp,#lat-db),body.tv #lat-e>#lat-gm>.gm,body.tv #mm-box :is(.mm-col,.mm-gab){--lc:#4a3220!important;--mc:#4a3220!important}',
  'body.tv #hero-box .cp-postal .fr{background:linear-gradient(rgba(20,20,18,.2),rgba(20,20,18,.45)),#34424d!important}',
  'body.tv #lat-topo>.lt-r2>#tv-tg{background:#4a3220!important;color:#e3e7ea!important;border-color:#9aa3ab!important}',
  'body.tv #nav.navdr,body.tv #lat-e,body.tv #lat-topo,body.tv .lat,body.tv #rail #tp-painel{background-color:#e9e2d6!important}',
  'body.tv #lat-e>:is(#lat-arena,#lat-band,#lat-cp,#lat-db,#qa-d-pc),body.tv #lat-e>#lat-gm>.gm,body.tv #tp-real #mm-box :is(.mm-col,.mm-gab),body.tv #tp-real .lat-c{background:#faf7f1!important;border-color:#d8cdbb!important;border-top-color:#4a3220!important}',
  'body.tv #lat-e>:is(#lat-gm>.gm,#lat-db)::before,body.tv #tp-real #mm-box :is(.mm-col,.mm-gab)::before{border-bottom-color:#4a3220!important}',
  'body.tv #hero-box .vx-hero,body.tv #hero-box .bn-slot{background-color:#efe9df!important}',
  'body.tv #hero-box .vx-hero{background:linear-gradient(135deg,#f5f1ea,#e7e0d3)!important}',
  'body.tv #tp-real>:is(#tm-painel,#recreio){background-color:#efe9df!important}',
  'body.tv #rod-apps,body.tv #rod-apps .rod-top{background:#ece6dc!important}'
 ].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var st=document.createElement('style');st.id='tv-sem-verde-css';st.textContent=[
 'body.tv #tb-g .tbc.fx-06{background-color:#f3ead9!important}body.tv #tb-g .tbc.fx-09{background-color:#eee0c6!important}body.tv #tb-g .tbc.fx-12{background-color:#e7d8c2!important}',
 'body.tv #tb-g .tbc.fx-15{background-color:#e3e7ea!important}body.tv #tb-g .tbc.fx-18{background-color:#d9dee3!important}body.tv #tb-g .tbc.fx-21{background-color:#e9dccf!important}',
 'body.tv .mf-faixa *,body.tv [class*="fx-"]:not(.tbc){filter:saturate(.25)}',
 'body.tv #dia-faixa{background:linear-gradient(180deg,#efe8dc,#e4dbcb)!important;border-color:#a8927a!important;box-shadow:inset 0 0 0 3px #f5f0e8,inset 0 0 0 4px #c9b9a3!important}',
 'body.tv #dia-faixa .df-seg:nth-of-type(1){background:#f3ead9!important}body.tv #dia-faixa .df-seg:nth-of-type(2){background:#eee0c6!important}body.tv #dia-faixa .df-seg:nth-of-type(3){background:#e7d8c2!important}',
 'body.tv #dia-faixa .df-seg:nth-of-type(4){background:#e3e7ea!important}body.tv #dia-faixa .df-seg:nth-of-type(5){background:#d9dee3!important}body.tv #dia-faixa .df-seg:nth-of-type(6){background:#e9dccf!important}',
 'body.tv #dia-faixa .df-seg,body.tv #dia-faixa .df-seg *{color:#4a3220!important}',
 'body.tv #dia-faixa .df-cap{border-color:#5a3c22!important;background:#faf7f1!important;color:#4a3220!important}',
 'body.tv #rod-apps .cr-p .cr-ico{border-color:#7a5230!important;color:#5a3c22!important}body.tv #rod-apps .cr-p .cr-ico svg{stroke:#5a3c22!important}',
 'body.tv #rod-apps .cr-p:nth-child(even) .cr-ico{border-color:#6f7880!important}body.tv #rod-apps .cr-p:nth-child(even) .cr-ico svg{stroke:#4b545c!important}',
 'body.tv #rod-apps .cr-p{border-bottom-color:#c9b9a3!important;box-shadow:none!important}body.tv #rod-apps .cr-p::after{background:#7a5230!important}',
 'body.tv #lat-gm .gm .gm-vit h3,body.tv #hero-box .vx-k,body.tv #hero-box .ac-cracha,body.tv #hero-box .ac-cracha *,body.tv #mm-box .mm-grp{color:#7a5230!important}',
 'body.tv .vh-viga{border-color:#3e454c!important;box-shadow:0 2px 0 #8b949c!important}',
 'body.tv .vh-telhado{background-size:36px 24px!important}',
 'body.tv #td-disco .td-ring{filter:sepia(.35) saturate(.6) hue-rotate(-8deg)}',
 'body.tv #hero-box .vx-hero::before{filter:sepia(.4) saturate(.5)}',
 'body.tv .vx-hero .vx-k,body.tv #hero-box span.vx-k{color:#7a5230!important}',
 'body.tv #lat-e>#lat-arena::before,body.tv #lat-e>:is(#lat-gm>.gm,#lat-db)::before{border-bottom-color:#5a3c22!important}',
 'body.tv #td-agora .td-ag-bar i,body.tv #tp-base .td-ag-bar i{background:#7a5230!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var I=function(n){return 'url("img/acampamento/'+n+'.svg?v=6")';};var st=document.createElement('style');st.id='vale-entalhe-css';st.textContent=[
 'body.tv .neo-moldura{--neo-fuste:'+I('vh-fuste-entalhe')+'!important;--neo-cap:'+I('vh-capitel-entalhe')+'!important;--neo-base:'+I('vh-base-entalhe')+'!important;--neo-ent:'+I('vh-ent-entalhe')+'!important;--col-k:#34424d!important;border-color:#34424d!important}',
 'body.tv .wrap>.tb.neo-moldura,body.tv .wrap>.rt.neo-moldura,body.tv .wrap>#rt-box .rt.neo-moldura{--neo-fuste:'+I('vh-fuste-entalhe')+'!important;--neo-cap:'+I('vh-capitel-entalhe')+'!important;--neo-base:'+I('vh-base-entalhe')+'!important;--neo-ent:'+I('vh-ent-entalhe')+'!important;--col-k:#34424d!important}',
 'body.tv #modo-op .op-templo{--t-fuste:'+I('vh-fuste-entalhe')+'!important;--t-cap:'+I('vh-capitel-entalhe')+'!important;--t-base:'+I('vh-base-entalhe')+'!important;--t-ent:'+I('vh-ent-entalhe')+'!important;--t-k:#34424d!important}',
 'body.tv #hero-box .bn-slot{background:'+I('vh-capitel-entalhe')+' 2px 0/46px 31px no-repeat,'+I('vh-capitel-entalhe')+' calc(100% - 2px) 0/46px 31px no-repeat,'+I('vh-fuste-entalhe')+' 2px 31px/46px 40px repeat-y,'+I('vh-fuste-entalhe')+' calc(100% - 2px) 31px/46px 40px repeat-y,#efe9df!important}',
 'body.tv #hero-box .bn-slot::after{background:'+I('vh-base-entalhe')+' 0 0/46px 14px no-repeat,'+I('vh-base-entalhe')+' 100% 0/46px 14px no-repeat!important}',
 'body.tv .vh-viga{background:'+I('vh-no-h-entalhe')+' 0 0/40px 20px repeat-x,#34424d!important;height:20px!important;border-color:#151b20!important;box-shadow:0 2px 0 #151b20!important}',
 '@media(min-width:1380px){body.tv #nav.navdr{background-image:'+I('vh-no-v-entalhe')+','+I('vh-no-v-entalhe')+'!important;background-size:20px 40px!important;padding-left:20px!important;padding-right:20px!important}}',
 'body.tv #tp-friso{background:'+I('vh-no-h-entalhe')+' 0 100%/40px 20px repeat-x,#efe9df!important;padding-bottom:20px!important}',
 'body.tv #hero-box .vx-hero::after{background:#34424d!important}body.tv #hero-box .vx-hero{border-color:#34424d!important}',
 'body.tv #hero-box .nf2 .fr-lira{box-shadow:0 0 0 3px #efe9df,0 0 0 5px #34424d!important}',
 'body.tv h2.sec.neo-tit.placa-tom,body.tv #tp-real>:is(#tm-painel,#recreio)>.tm-cab{background:linear-gradient(180deg,#46576443,#34424d),#34424d!important;border-color:#151b20!important;color:#f3ece0!important;box-shadow:inset 0 0 0 2px #34424d,inset 0 0 0 3px #e4d9c6,0 0 0 2px #151b20!important}',
 'body.tv h2.sec.neo-tit.placa-tom>span,body.tv #tp-real .tm-cab .tp-placa button{color:#e4d9c6!important}',
 'body.tv #hero-box .nf2 .nf-txt{background:#34424d!important;border-color:#e4d9c6!important;color:#f3ece0!important;box-shadow:0 0 0 2px #151b20!important}',
 'body.tv #hero-box .nf2>.pd-pilula{background:linear-gradient(180deg,#46576a,#2a353e)!important;border-color:#e4d9c6!important;box-shadow:0 0 0 3px #151b20,0 6px 12px -6px rgba(0,0,0,.5)!important}',
 'body.tv #hero-box .nf2>.pd-pilula button{color:#f3ece0!important;border-left-color:#566672!important}',
 'body.tv #lat-topo>.lt-r2>#tv-tg{background:#34424d!important;color:#e4d9c6!important;border-color:#151b20!important}',
 'body.tv #rod-apps .rod-fogo .fg-ic{background-image:'+I('vh-bindrune-entalhe')+'!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var I=function(n){return 'url("img/acampamento/'+n+'.svg?v=7")';};var st=document.createElement('style');st.id='vale-hotel-css';st.textContent=[
 'body.tv #hero-box .nf2 .fr-lira{content:'+I('vh-bindrune-hotel')+'!important}',
 'body.tv #lat-band .band-mastro img{content:'+I('vh-estandarte')+';object-fit:contain}',
 'body.tv #lat-e>#lat-band{--lc:#1f4d2e!important;border-top-color:#1f4d2e!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var K=function(n){return 'url("img/acampamento/'+(/^vh-/.test(n)?'':'kit/')+n+'.svg?v=2")';};
 var P='#203936',L='#A88750',LL='#D4BD82',M='#F5EBD6',M2='#EFE3CA',F='#526D78',B='#713E48';
 var ic=function(sel,n,v){return 'body.tv '+sel+'{'+v+':'+K(n)+'!important}';};
 var st=document.createElement('style');st.id='kit-valhala-css';st.textContent=[
  /* superfícies */
  'body.tv{background-color:'+M+'!important}',
  'body.tv .wrap,body.tv #nav.navdr,body.tv #lat-e,body.tv #lat-topo,body.tv #rail,body.tv #rail #tp-painel{background-color:'+M+'!important}',
  'body.tv #lat-e>:is(#lat-arena,#lat-band,#lat-cp,#lat-db,#qa-d-pc),body.tv #lat-e>#lat-gm>.gm,body.tv #tp-real #mm-box :is(.mm-col,.mm-gab),body.tv #tp-real .lat-c{background:#FBF6EA!important;border-color:#DCC9A0!important;border-top-color:'+P+'!important}',
  'body.tv .neo-moldura,body.tv #tp-real>:is(#tm-painel,#recreio){background-color:'+M2+'!important;border-color:'+L+'!important}',
  'body.tv #rod-apps,body.tv #rod-apps .rod-top{background:'+M2+'!important}',
  /* frontão do kit */
  'body.tv #hero-box .nf2 .fr-lira{content:'+K('brasao-yggdrasil')+'!important;background:none!important;box-shadow:none!important;border-radius:0!important;width:92px!important;height:92px!important;top:30px!important}',
  'body.tv #hero-box .nf2 .nf-txt{background:'+P+'!important;border:1.5px solid '+L+'!important;box-shadow:0 0 0 2px '+P+',0 0 0 3px #D4BD82!important;padding:5px 8px 5px 14px!important;color:'+M+'!important;font-size:13px!important;text-shadow:none!important}',
  'body.tv .vh-viga{display:block!important;background:'+K('vh-no-h-kit')+' 0 0/40px 20px repeat-x,'+P+'!important;height:20px!important;border-color:'+L+'!important;box-shadow:0 2px 0 '+L+'!important}',
  'body.tv .vh-beiral{background:linear-gradient(180deg,#D4BD82,'+L+')!important}',
  'body.tv .vh-chifres{filter:sepia(.9) saturate(1.6) brightness(.85) drop-shadow(0 2px 2px rgba(0,0,0,.35))!important}',
  'body.tv #hero-box .neo-frontao.nf2{margin-bottom:22px!important}',
  'body.tv #hero-box .nf2>.pd-pilula{top:auto!important;bottom:-20px!important;background:'+P+'!important;border:1.5px solid '+L+'!important;box-shadow:0 0 0 3px '+M+',0 0 0 4px '+L+'!important}',
  'body.tv #hero-box .nf2>.pd-pilula button{color:'+M+'!important;border-left-color:#3a5552!important}',
  'body.tv #hero-box .nf2>.pd-pilula button:hover{background:#2c4b47!important}',
  /* banner: pilastras de latão, moldura e entrelaçado em latão */
  'body.tv #hero-box .bn-slot{background:'+K('vh-capitel-kit')+' 2px 0/46px 31px no-repeat,'+K('vh-capitel-kit')+' calc(100% - 2px) 0/46px 31px no-repeat,'+K('vh-fuste-kit')+' 2px 31px/46px 40px repeat-y,'+K('vh-fuste-kit')+' calc(100% - 2px) 31px/46px 40px repeat-y,'+M+'!important}',
  'body.tv #hero-box .bn-slot::after{background:'+K('vh-base-kit')+' 0 0/46px 14px no-repeat,'+K('vh-base-kit')+' 100% 0/46px 14px no-repeat!important}',
  'body.tv #hero-box .vx-hero{background:linear-gradient(135deg,#FBF4E4,#F1E5CC)!important;border:1.5px solid '+L+'!important;box-shadow:inset 0 0 0 4px #FBF4E4,inset 0 0 0 5px '+LL+'!important}',
  'body.tv #hero-box .vx-hero::after{background:'+L+'!important;opacity:.75}',
  'body.tv #hero-box .cp-postal .fr{background:'+P+'!important;border-color:'+L+'!important}',
  /* templos: pilastra, friso entrelaçado, placa de título */
  'body.tv .neo-moldura,body.tv .wrap>.tb.neo-moldura,body.tv .wrap>.rt.neo-moldura,body.tv .wrap>#rt-box .rt.neo-moldura{--neo-fuste:'+K('vh-fuste-kit')+'!important;--neo-cap:'+K('vh-capitel-kit')+'!important;--neo-base:'+K('vh-base-kit')+'!important;--neo-ent:'+K('vh-ent-kit')+'!important;--col-k:'+P+'!important}',
  'body.tv #modo-op .op-templo{--t-fuste:'+K('vh-fuste-kit')+'!important;--t-cap:'+K('vh-capitel-kit')+'!important;--t-base:'+K('vh-base-kit')+'!important;--t-ent:'+K('vh-ent-kit')+'!important;--t-k:'+P+'!important}',
  'body.tv h2.sec.neo-tit.placa-tom,body.tv #tp-real>:is(#tm-painel,#recreio)>.tm-cab{background:'+K('placa-titulo')+' center/100% 100% no-repeat!important;border:0!important;box-shadow:none!important;padding-left:44px!important;padding-right:44px!important;color:'+M+'!important}',
  'body.tv h2.sec.neo-tit.placa-tom>span,body.tv #tp-real .tm-cab .tp-placa button{color:'+LL+'!important}',
  'body.tv #tp-friso{background:'+K('vh-no-h-kit')+' 0 100%/40px 20px repeat-x,'+M+'!important;padding-bottom:20px!important}',
  '@media(min-width:1380px){body.tv #nav.navdr{background-image:'+K('vh-no-v-kit')+','+K('vh-no-v-kit')+'!important;background-size:20px 40px!important;background-repeat:repeat-y!important;background-position:left top,right top!important;padding-left:20px!important;padding-right:20px!important}}',
  /* ícones do hotel nos cartões (um por lugar) */
  'body.tv :is(#mm-box .mm-col,#mm-box .mm-gab,#rt-box .rt-concha,#rt-box .rt-insp,#rt-box .rt-harp,#lat-apt,#lat-rec,#lat-cv,#lat-ars,#lat-arena,#lat-e>#lat-gm>.gm,#lat-e>#lat-db)::before{background-size:auto 60px!important;background-repeat:no-repeat!important;background-position:center!important;background-color:#ECE0C4!important;filter:none!important;border-bottom:1.5px solid '+L+'!important}',
  ic('#mm-box .mm-chale','porta-suite','--mm-img'),ic('#mm-box .mm-quest','elevador','--mm-img'),ic('#mm-box .mm-gab','corvos','--mm-img'),ic('#mm-box .mm-orac-col','brasao-yggdrasil','--mm-img'),ic('#mm-box .mm-prof','valquiria','--mm-img'),
  ic('#rt-box .rt-concha','recepcao','--rt-img'),ic('#rt-box .rt-insp','chave-hospede','--rt-img'),ic('#rt-box .rt-harp','b-valquiria','--rt-img'),
  ic('#lat-apt','treinamento','--c-img'),ic('#lat-rec','banquete','--c-img'),ic('#lat-cv','bifrost','--c-img'),ic('#lat-ars','b-treinamento','--c-img'),ic('#lat-arena','mostrador','--c-img'),
  ic('#lat-e>#lat-gm>.gm','placa-andar','--lf'),ic('#lat-e>#lat-db','registro','--lf'),
  'body.tv #modo-op .op-l{--t-foto:'+K('b-chave-suite')+'!important}body.tv #modo-op .op-col1{--t-foto:'+K('b-brasao')+'!important}body.tv #modo-op .op-fazer{--t-foto:'+K('b-recepcao')+'!important}body.tv #modo-op .op-estudo{--t-foto:'+K('b-registro-hospede')+'!important}body.tv #modo-op .op-lado{--t-foto:'+K('b-elevador')+'!important}',
  'body.tv #rod-apps .rod-fogo .fg-ic{background:'+K('b-banquete')+' center/contain no-repeat!important}',
  /* textos e acentos */
  'body.tv .vx-hero .vx-k,body.tv #hero-box span.vx-k,body.tv #mm-box .mm-grp,body.tv #lat-gm .gm .gm-vit h3{color:#8A6D3B!important}',
  'body.tv #lat-topo>.lt-r2>#tv-tg{background:'+P+'!important;color:'+LL+'!important;border-color:'+L+'!important}',
  /* grade e faixa do dia no tom do kit */
  'body.tv #tb-g .tbc.fx-06{background-color:#F7EEDB!important}body.tv #tb-g .tbc.fx-09{background-color:#F0E2C2!important}body.tv #tb-g .tbc.fx-12{background-color:#E8DCC4!important}',
  'body.tv #tb-g .tbc.fx-15{background-color:#DFE6E8!important}body.tv #tb-g .tbc.fx-18{background-color:#D6DFE3!important}body.tv #tb-g .tbc.fx-21{background-color:#EEDDE0!important}',
  'body.tv #dia-faixa .df-seg:nth-of-type(1){background:#F7EEDB!important}body.tv #dia-faixa .df-seg:nth-of-type(2){background:#F0E2C2!important}body.tv #dia-faixa .df-seg:nth-of-type(3){background:#E8DCC4!important}',
  'body.tv #dia-faixa .df-seg:nth-of-type(4){background:#DFE6E8!important}body.tv #dia-faixa .df-seg:nth-of-type(5){background:#D6DFE3!important}body.tv #dia-faixa .df-seg:nth-of-type(6){background:#EEDDE0!important}',
  'body.tv #dia-faixa .df-seg,body.tv #dia-faixa .df-seg *{color:'+P+'!important}',
  'body.tv #rod-apps .cr-p .cr-ico{border-color:'+L+'!important}body.tv #rod-apps .cr-p .cr-ico svg{stroke:'+P+'!important}',
  'body.tv #rod-apps .cr-p:nth-child(even) .cr-ico{border-color:'+F+'!important}'
 ].join('\n');document.head.appendChild(st);})();}
})();

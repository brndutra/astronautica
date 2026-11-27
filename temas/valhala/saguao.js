/* Valhala · Saguão (página principal): frontão, banner, templos, cartões, cronologia, painéis
   Carregado só quando o tema Hotel Valhala está ligado. */
(function(){var TV_ON=true,OP_TEMPLO=window.OP_TEMPLO||{};
if(TV_ON){(function(){var F=function(n){return 'url("img/acampamento/vh-fotos/'+n+'.webp")';};var st=document.createElement('style');st.id='vh-fotos-css';st.textContent=[
 'body.tv #mm-box .mm-quest{--mm-img:'+F('espada')+'!important}body.tv #mm-box .mm-orac-col{--mm-img:'+F('runas')+'!important}body.tv #mm-box .mm-prof{--mm-img:'+F('drakkar')+'!important}',
 'body.tv #lat-e>#lat-gm>.gm{--lf:'+F('mjolnir')+'!important}body.tv #lat-arena{--c-img:'+F('combate')+'!important}body.tv #lat-apt{--c-img:'+F('dragao')+'!important}',
 'body.tv :is(#mm-box .mm-quest,#mm-box .mm-orac-col,#mm-box .mm-prof,#lat-e>#lat-gm>.gm,#lat-arena,#lat-apt)::before{background-size:cover!important;filter:saturate(.85)!important}',
 'body.tv #mm-box .mm-quest::before{background-position:center 42%!important}body.tv #mm-box .mm-orac-col::before{background-position:center 55%!important}body.tv #mm-box .mm-prof::before{background-position:center 32%!important}',
 'body.tv #lat-e>#lat-gm>.gm::before{background-position:center 45%!important}body.tv #lat-arena::before{background-position:58% 40%!important}body.tv #lat-apt::before{background-position:center 30%!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=3")';};var st=document.createElement('style');st.id='vh-parte1-css';st.textContent=[
 'body.tv .vh-telhado{background:'+U('vh-telha-veio')+' 0 0/32px 20px repeat,#3b2717!important}',
 'body.tv .vh-beiral{background:linear-gradient(180deg,#e2cf98,#A88750 55%,#7d6030)!important}',
 /* portão: moldura de entrelaçado com cantoneiras de latão em volta do banner */
 'body.tv #hero-box#hero-box .vx-hero::after{display:none!important}',
 'body.tv #hero-box#hero-box .vx-hero{border:0!important;border-radius:0!important;padding:34px 40px 30px!important;box-shadow:inset 0 0 0 20px transparent,0 0 0 1.5px #203936!important;background:',
 '  '+U('vh-canto-tl')+' 22px 22px/46px 46px no-repeat,'+U('vh-canto-tr')+' calc(100% - 22px) 22px/46px 46px no-repeat,'+U('vh-canto-bl')+' 22px calc(100% - 22px)/46px 46px no-repeat,'+U('vh-canto-br')+' calc(100% - 22px) calc(100% - 22px)/46px 46px no-repeat,',
 '  '+U('vh-no-h-kit')+' 0 0/40px 20px repeat-x,'+U('vh-no-h-kit')+' 0 100%/40px 20px repeat-x,'+U('vh-no-v-kit')+' 0 0/20px 40px repeat-y,'+U('vh-no-v-kit')+' 100% 0/20px 40px repeat-y,',
 '  '+U('vh-papel')+' 0 0/120px 120px!important}',
 'body.tv #hero-box#hero-box .vx-hero::before{opacity:.35!important}',
 /* soleira de pedra fechando o portão */
 'body.tv #hero-box .bn-slot{padding-bottom:30px!important}',
 'body.tv #hero-box .bn-slot::before{content:"";position:absolute;left:-6px;right:-6px;bottom:0;height:30px;background:'+U('vh-soleira')+' 0 0/120px 30px repeat-x;border-bottom:2px solid #203936;box-shadow:0 3px 6px -3px rgba(0,0,0,.4);z-index:1}',
 'body.tv #hero-box .bn-slot::after{bottom:30px!important}',
 'body.tv #hero-box .bn-slot{background-color:#F1E6CF!important}',
 'body.tv #hero-box{margin-bottom:6px!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=1")';};var T='body.tv .wrap>.tb.neo-moldura';var st=document.createElement('style');st.id='vh-templo2-css';st.textContent=[
 T+'{--neo-fuste:'+U('vh-fuste-onix-tom')+'!important;--neo-cap:'+U('vh-capitel-onix-tom')+'!important;--neo-base:'+U('vh-base-onix-tom')+'!important;--neo-ent:'+U('vh-runas-onix-tom')+'!important;--col-k:#b9c2dc!important;border-color:#b9c2dc!important;',
 ' box-shadow:inset 0 0 0 1px #3d4a6b,inset 0 0 0 3px #b9c2dc!important;background-color:#f6efe0!important}',
 'body.tv h2.sec.neo-tit#h-sem{background:#b9c2dc!important;border:1.5px solid #3d4a6b!important;color:#75809e!important;box-shadow:0 0 0 3px #f6efe0,0 0 0 4.5px #b9c2dc,0 0 0 6px #75809e!important;padding-left:30px!important;padding-right:30px!important}',
 'body.tv h2.sec.neo-tit#h-sem>span{color:#3d4a6b!important}',
 'body.tv h2.sec.neo-tit#h-sem::before,body.tv h2.sec.neo-tit#h-sem::after{content:"ᛟ"!important;display:inline-block!important;position:static!important;margin:0 10px;color:#75809e;font:400 14px Georgia,serif;background:none!important;width:auto!important;height:auto!important;border:0!important}',
 T+'>.col-orn .co-sim{background:#b9c2dc!important;border-color:#3d4a6b!important}'+T+'>.col-orn .co-sim svg{stroke:#75809e!important}',
 T+'>.col-orn .co-med{background:#b9c2dc!important;border-color:#3d4a6b!important;color:#75809e!important;box-shadow:0 0 0 3px #f6efe0,0 0 0 4px #75809e!important}',
 T+' .tbcab{border-bottom:1px solid #3d4a6b!important}',
 T+' .mf-alca{border-color:#b9c2dc!important;background:#b9c2dc!important;color:#75809e!important;box-shadow:0 0 0 2px #f6efe0,0 0 0 3px #3d4a6b!important}',
 T+' .mf-alca span{color:#75809e!important}',
 T+' #tb-g .tbh{background:#dbdbde!important;color:#b9c2dc!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=3")';};var T='body.tv .wrap>.rt.neo-moldura,body.tv .wrap>#rt-box .rt.neo-moldura';var st=document.createElement('style');st.id='vh-templo3-css';st.textContent=[
 '/* Rastreados no Valhala: drakkar — casco de tábuas com rebites, proa de ouro entalhada, cabeça de dragão, escudos e mar */',
 ':is('+T+'){--neo-fuste:'+U('vh-fuste-drakkar-tom')+'!important;--neo-cap:'+U('vh-capitel-drakkar-tom')+'!important;--neo-base:'+U('vh-base-drakkar-tom')+'!important;--neo-ent:'+U('vh-ent-drakkar-tom')+'!important;--col-k:#7a5c12!important;border-color:#7a5c12!important;background-size:240px 40px,42px 29px,42px 29px,42px 40px,42px 40px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;',
 ' box-shadow:inset 0 0 0 1px #e2cd8a,inset 0 0 0 3px #f6efe0!important;background-color:#f6efe0!important}',
 'body.tv h2.sec.neo-tit#h-rast{background:repeating-linear-gradient(180deg,#e2cd8a 0 8px,#7a5c12 8px 9px,#ede0b9 9px 17px,#7a5c12 17px 18px)!important;border:2px solid #7a5c12!important;color:#f6efe0!important;text-shadow:0 1px 0 #7a5c12;box-shadow:0 0 0 2px #e2cd8a,0 0 0 3.5px #7a5c12!important;padding-left:34px!important;padding-right:34px!important}',
 'body.tv h2.sec.neo-tit#h-rast>span{color:#ede0b9!important}',
 'body.tv h2.sec.neo-tit#h-rast::before,body.tv h2.sec.neo-tit#h-rast::after{content:""!important;display:inline-block!important;position:static!important;vertical-align:-3px;margin:0 9px;width:16px!important;height:16px!important;background:'+U('vh-escudo-drakkar-tom')+' center/16px 16px no-repeat!important;border:0!important}',
 ':is('+T+')>.col-orn .co-sim,:is('+T+')>.col-orn .co-med{background:#e2cd8a!important;border-color:#7a5c12!important;color:#a98f48!important}',
 ':is('+T+')>.col-orn .co-sim svg{stroke:#a98f48!important}',
 ':is('+T+') .rtg td.c.on5{background:#e2cd8a!important;box-shadow:inset 0 0 0 1px #ede0b9}',
 ':is('+T+') .rtg th,:is('+T+') .rtg td.h{color:#7a5c12!important}',
 ':is('+T+') .cab{background:#ede0b9!important;border-bottom:1.5px solid #e2cd8a!important}',
 ':is('+T+') .cab button{border-color:#7a5c12!important;color:#7a5c12!important;background:#f6efe0!important}',
 ':is('+T+') .rt-novo button,:is('+T+') .ws-box button{background:#7a5c12!important;color:#ede0b9!important;border-color:#7a5c12!important}',
 ':is('+T+') .rt-novo input,:is('+T+') .ws-box input{border-color:#e2cd8a!important;background:#f6efe0!important}',
 ':is('+T+') .ws-box i,:is('+T+') .ws-box .ws-c{border-color:#e2cd8a!important}',
 ':is('+T+') .vzr{color:#ede0b9!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=2")';};var T='body.tv #tesouro.neo-moldura';var st=document.createElement('style');st.id='vh-templo4-css';st.textContent=[
 T+'{--neo-fuste:'+U('vh-fuste-runa-tom')+'!important;--neo-cap:'+U('vh-capitel-runa-tom')+'!important;--neo-base:'+U('vh-base-runa-tom')+'!important;--neo-ent:'+U('vh-ent-runa-tom')+'!important;--col-k:#cfae8e!important;border-color:#cfae8e!important;',
 ' box-shadow:inset 0 0 0 1px #906e53,inset 0 0 0 3px #f6efe0!important;background-color:#f6efe0!important}',
 T+' .ts-cab{background:'+U('vh-granito-tom')+' 0 0/120px 120px!important;border:1.5px solid #cfae8e!important;box-shadow:0 0 0 3px #f6efe0,0 0 0 4.5px #906e53!important}',
 T+' .ts-cab h2{color:#906e53!important}'+T+' .ts-cab .ts-k{color:#906e53!important}',
 T+' .ts-cab h2::before,'+T+' .ts-cab h2::after{content:"ᚱ";margin:0 9px;color:#906e53;font:400 14px Georgia,serif}',
 T+'>.col-orn .co-sim,'+T+'>.col-orn .co-med{background:#e4d2bb!important;border-color:#cfae8e!important;color:#906e53!important}',
 T+'>.col-orn .co-sim svg{stroke:#906e53!important}',
 T+' :is(.lat-c,.sec-card){background:#f6efe0!important;border-color:#e4d2bb!important;border-top:3px solid #906e53!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=2")';};var T='body.tv #tp-real>#tm-painel#tm-painel';var st=document.createElement('style');st.id='vh-templo5-css';st.textContent=[
 '/* Tarefas e Missões no Valhala: portal de madeira ancestral, futhark antigo entalhado em sulco #dcaaa3 nas colunas e no lintel, Yggdrasil nos galhos do capitel e nas raízes da base; fundo liso, sem imagem. Lazer do Salão mantém o kit. */',
 T+'{--neo-fuste:'+U('vh-fuste-ygg-tom')+'!important;--neo-cap:'+U('vh-capitel-ygg-tom')+'!important;--neo-base:'+U('vh-base-ygg-tom')+'!important;--neo-ent:'+U('vh-ent-ygg-tom')+'!important;--col-k:#780806!important;border-color:#780806!important;',
 ' background-size:576px 40px,42px 29px,42px 29px,42px 576px,42px 576px,42px 15px,42px 15px,auto,auto!important;',
 ' background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;',
 ' box-shadow:inset 0 0 0 1px #780806,inset 0 0 0 3px #dcaaa3!important}',
 T+'>.tm-cab{background:'+U('vh-chifres-portao-tom')+' left 4px center/32px 28px no-repeat,'+U('vh-chifres-portao-tom')+' right 4px center/32px 28px no-repeat,repeating-linear-gradient(180deg,transparent 0 5px,rgba(47,44,39,.13) 5px 6px),linear-gradient(180deg,#dcaaa3,#a5514d)!important;border:1.5px solid #780806!important;box-shadow:inset 0 0 0 2px #dcaaa3,0 0 0 2px #780806,0 0 0 3.5px #780806!important;color:#f6efe0!important;text-shadow:0 1px 0 #780806;padding-left:42px!important;padding-right:42px!important}',
 T+'>.tm-cab .k9,'+T+'>.tm-cab .tp-placa button{color:#780806!important}',
 T+'>.tm-cab .tp-placa button[aria-selected="true"],'+T+'>.tm-cab .tp-placa .on{color:#f6efe0!important}',
 T+'>.col-orn .co-sim,'+T+'>.col-orn .co-med{background:#dcaaa3!important;border-color:#780806!important;color:#780806!important;box-shadow:0 0 0 1.5px #a5514d!important}',
 T+'>.col-orn .co-sim svg{stroke:#780806!important}',
 T+' .mm-modo{background:#dcaaa3!important;color:#f6efe0!important;border-color:#780806!important;box-shadow:0 0 0 1px #a5514d!important}',
 T+' #mm-box :is(.mm-col,.mm-gab){border-color:#780806!important;border-top-color:#dcaaa3!important;box-shadow:0 6px 18px rgba(6,10,28,.45)!important}',
 T+' #mm-box :is(.mm-col,.mm-gab)::before{border-bottom-color:#dcaaa3!important}',
 T+'::after{background:#dcaaa3!important;box-shadow:0 -1px 0 #780806,0 1px 0 #780806!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var st=document.createElement('style');st.id='vh-harmonia-css';st.textContent=[
 '/* Valhala com a harmonia dos templos gregos: cada templo um matiz (tom escuro nos traços, tom claro nas colunas) sobre creme; placas creme com borda e subtítulo no tom escuro */',
 'body.tv h2.sec.neo-tit#h-sem{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #3d4a6b!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px #3d4a6b,0 6px 12px -6px rgba(40,30,20,.45)!important;color:#2a2418!important;text-shadow:none!important}',
 'body.tv h2.sec.neo-tit#h-sem>span,body.tv h2.sec.neo-tit#h-sem .k9,body.tv h2.sec.neo-tit#h-sem .ts-k{color:#3d4a6b!important}',
 'body.tv h2.sec.neo-tit#h-rast{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #7a5c12!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px #7a5c12,0 6px 12px -6px rgba(40,30,20,.45)!important;color:#2a2418!important;text-shadow:none!important}',
 'body.tv h2.sec.neo-tit#h-rast>span,body.tv h2.sec.neo-tit#h-rast .k9,body.tv h2.sec.neo-tit#h-rast .ts-k{color:#7a5c12!important}',
 'body.tv #tesouro.neo-moldura .ts-cab{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #5c3a22!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px #5c3a22,0 6px 12px -6px rgba(40,30,20,.45)!important;color:#2a2418!important;text-shadow:none!important}',
 'body.tv #tesouro.neo-moldura .ts-cab>span,body.tv #tesouro.neo-moldura .ts-cab .k9,body.tv #tesouro.neo-moldura .ts-cab .ts-k{color:#5c3a22!important}',
 'body.tv #tp-real>#tm-painel#tm-painel>.tm-cab{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #780806!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px #780806,0 6px 12px -6px rgba(40,30,20,.45)!important;color:#2a2418!important;text-shadow:none!important}',
 'body.tv #tp-real>#tm-painel#tm-painel>.tm-cab>span,body.tv #tp-real>#tm-painel#tm-painel>.tm-cab .k9,body.tv #tp-real>#tm-painel#tm-painel>.tm-cab .ts-k{color:#780806!important}',
 'body.tv #tesouro.neo-moldura .ts-cab h2{color:#2a2418!important}',
 'body.tv '+'h2.sec.neo-tit#h-sem::before,body.tv h2.sec.neo-tit#h-sem::after{color:#3d4a6b!important}',
 'body.tv #tesouro.neo-moldura .ts-cab h2::before,body.tv #tesouro.neo-moldura .ts-cab h2::after{color:#5c3a22!important}',
 'body.tv #tp-real>#tm-painel#tm-painel>.tm-cab{background:var(--neo-papel,none),#f4ead2!important;padding-left:30px!important;padding-right:30px!important}',
 'body.tv #tp-real>#tm-painel#tm-painel>.tm-cab .tp-placa button{color:#780806!important}body.tv #tp-real>#tm-painel#tm-painel>.tm-cab .tp-placa button[aria-selected="true"]{color:#2a2418!important}',
 'body.tv :is(.wrap>.tb.neo-moldura,.wrap>.rt.neo-moldura,#tesouro.neo-moldura,#tp-real>#tm-painel#tm-painel){background-color:#f0e5cd!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=3")';};var S='body.tv #tp-real>#recreio#recreio';var st=document.createElement('style');st.id='vh-salao-heroi-css';st.textContent=[
 '/* Lazer do Salão: a casa viking — telhado de escamas com cumeeira em zigue-zague, postes entalhados, cabeças de lobo e varanda, em verdete sobre creme. Primeiro painel central (banner): portão em verde pinho sobre creme — os andares seguem verde, azul, dourado e marrom. Mesmo padrão de tons dos templos gregos. */',
 S+'{--neo-fuste:'+U('vh-fuste-salao')+'!important;--neo-cap:'+U('vh-capitel-salao')+'!important;--neo-base:'+U('vh-base-salao')+'!important;--neo-ent:'+U('vh-ent-salao')+'!important;--col-k:#1f5550!important;border-color:#1f5550!important;background-size:240px 40px,42px 29px,42px 29px,42px 20px,42px 20px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f0e5cd!important;box-shadow:inset 0 0 0 1px #a9cfc8!important}',
 S+'::after{background:#1f5550!important;box-shadow:none!important}',
 S+'>.tm-cab{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #1f5550!important;box-shadow:0 0 0 3px #f4ead2,0 0 0 4.5px #1f5550,0 6px 12px -6px rgba(40,30,20,.45)!important;color:#2a2418!important;text-shadow:none!important;padding-left:30px!important;padding-right:30px!important}',
 S+'>.tm-cab .k9,'+S+'>.tm-cab .tp-placa button{color:#1f5550!important}'+S+'>.tm-cab .tp-placa button[aria-selected="true"]{color:#2a2418!important}',
 S+'>.col-orn .co-sim,'+S+'>.col-orn .co-med{background:#d3e1d5!important;border-color:#1f5550!important;color:#1f5550!important;box-shadow:none!important}',
 S+'>.col-orn .co-sim svg{stroke:#1f5550!important}',
 S+' .lat-c{border-color:#d8cdbb!important;border-top-color:#1f5550!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=1")';};var F='body.tv #dia-faixa#dia-faixa';var st=document.createElement('style');st.id='vh-totem-css';st.textContent=[
 '/* Faixa da cronologia do dia no Valhala: totem de ídolo — rosto barbado com elmo de chifres no alto, poste de madeira com veios e anéis, sulco entalhado no trilho, discos rúnicos nos toques e o pé do poste na relva; madeira sobre creme */',
 F+'{background:'+U('vh-idolo-borda')+' left 2px top/8px 40px repeat-y,'+U('vh-idolo-borda')+' right 2px top/8px 40px repeat-y,linear-gradient(180deg,#f4ead2,#efe1c9)!important;border:1px solid #6e4426!important;box-shadow:inset 0 0 0 1px #d9ae86!important}',
 F+' .df-trilho{border-left:0!important;background:'+U('vh-idolo-sulco')+' left top/5px 16px repeat-y!important}',
 F+' .df-toq{width:11px!important;height:11px!important;left:-3px!important;margin-top:-1.5px;border:0!important;border-radius:50%!important;background:'+U('vh-idolo-marca')+' center/100% 100% no-repeat!important;box-shadow:0 1px 2px rgba(60,40,10,.35)!important}',
 F+' .df-toq:not(.foi){opacity:.55}',
 F+' .df-h{color:#6e4426!important}',
 F+' .df-cap{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #6e4426!important;border-radius:6px!important;box-shadow:0 0 0 2px #f4ead2,0 0 0 3px #6e4426!important;color:#2a2418!important}',
 F+' .df-cap>i{color:#6e4426!important}',
 F+' .df-cap>svg{display:none!important}',
 F+' .df-cap::before{content:"";display:block;width:34px;height:29px;margin:-3px 0 -1px;background:'+U('vh-idolo-cabeca')+' center/contain no-repeat}',
 F+' .df-cap.df-n::before{background-image:'+U('vh-idolo-pe')+'}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var F=function(n){return 'url("img/acampamento/vh-fotos/'+n+'.webp?v=1")';};var C='background-size:cover!important;background-repeat:no-repeat!important;filter:saturate(.85)!important;';var st=document.createElement('style');st.id='vh-fotos2-css';st.textContent=[
 '/* fotos nórdicas nos cartões que ainda estavam com ícone */',
 'body.tv #mm-box#mm-box .mm-chale::before{background-image:'+F('quarto')+'!important;background-position:center 58%!important;'+C+'}',
 'body.tv #mm-box#mm-box .mm-gab::before{background-image:'+F('thing')+'!important;background-position:center 40%!important;'+C+'}',
 'body.tv #lat-apt#lat-apt::before{background-image:'+F('salao-ouro')+'!important;background-position:center 38%!important;'+C+'}',
 'body.tv #lat-e>#lat-db#lat-db::before{background-image:'+F('porto')+'!important;background-position:center 45%!important;'+C+'}',
 'body.tv #rt-box#rt-box .rt-insp::before{background-image:'+F('torre')+'!important;background-position:78% 30%!important;'+C+'}',
 'body.tv #lat-cv#lat-cv::before{background-image:'+F('vila')+'!important;background-position:center 55%!important;'+C+'}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var st=document.createElement('style');st.id='vh-fotos-altas-css';st.textContent=[
 '/* fotos dos cartões ocupam toda a largura e ganham mais altura */',
 'body.tv #mm-box#mm-box :is(.mm-chale,.mm-quest,.mm-orac-col,.mm-prof,.mm-gab)::before{height:132px!important;background-size:cover!important;background-repeat:no-repeat!important}',
 'body.tv #lat-e#lat-e>:is(#lat-db,#lat-gm>.gm)::before{height:112px!important;background-size:cover!important;background-repeat:no-repeat!important}',
 'body.tv #lat-e#lat-e>#lat-arena::before,body.tv #lat-arena#lat-arena::before{height:96px!important;background-size:cover!important;background-repeat:no-repeat!important}',
 'body.tv #tp-real :is(#lat-apt,#lat-cv)#lat-apt::before,body.tv #tp-real #lat-apt#lat-apt::before,body.tv #tp-real #lat-cv#lat-cv::before{height:128px!important;background-size:cover!important;background-repeat:no-repeat!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=1")';};var H='body.tv #hero-box#hero-box .nf2';var st=document.createElement('style');st.id='vh-frontao-camadas-css';st.textContent=[
 '/* frontão com o emblema HV do hotel; medalhão do topo em prata */',
 'body.tv.tv .vh-telhado{background:url("img/acampamento/vh-telha-verde.svg?v=1") 0 0/36px 24px repeat,#143a33!important}',
 H+' .fr-lira{content:url("img/acampamento/vh-emblema-hv.webp?v=1")!important;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}',
 'body.tv #lat-topo .lt-logo img{content:url("img/acampamento/vh-emblema-hv-prata.webp?v=1")!important;border-radius:50%}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var st=document.createElement('style');st.id='vh-paineis-css';st.textContent=[
 '/* painéis que abrem sobre o centro, no Valhala: friso de runas no lugar da grega, medalhão com símbolo nórdico e runa no selo, sem coroa de louros */',
 'body.tv #painel-dir .pd3{--mea:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'12\'%3E%3Cpath transform=\'translate%282 1%29 scale%28.55%29\' d=\'M1 1V17M1 1L8 5M1 6L8 10\' fill=\'none\' stroke=\'black\' stroke-width=\'2.4\' stroke-linecap=\'round\'/%3E%3Ccircle cx=\'13\' cy=\'6\' r=\'1\' fill=\'black\'/%3E%3Cpath transform=\'translate%2818 1%29 scale%28.55%29\' d=\'M1 1V17M1 3L8 7M1 8L8 12\' fill=\'none\' stroke=\'black\' stroke-width=\'2.4\' stroke-linecap=\'round\'/%3E%3Ccircle cx=\'29\' cy=\'6\' r=\'1\' fill=\'black\'/%3E%3Cpath transform=\'translate%2834 1%29 scale%28.55%29\' d=\'M1 1V17M1 1L7 5L1 9L7 13L1 17\' fill=\'none\' stroke=\'black\' stroke-width=\'2.4\' stroke-linecap=\'round\'/%3E%3Ccircle cx=\'45\' cy=\'6\' r=\'1\' fill=\'black\'/%3E%3Cpath transform=\'translate%2850 1%29 scale%28.55%29\' d=\'M1 1V17M8 1V17M1 1L8 8M8 1L1 8\' fill=\'none\' stroke=\'black\' stroke-width=\'2.4\' stroke-linecap=\'round\'/%3E%3Ccircle cx=\'61\' cy=\'6\' r=\'1\' fill=\'black\'/%3E%3Cpath transform=\'translate%2866 1%29 scale%28.55%29\' d=\'M1 17L7 9L4.5 3L2 9L8 17\' fill=\'none\' stroke=\'black\' stroke-width=\'2.4\' stroke-linecap=\'round\'/%3E%3Ccircle cx=\'77\' cy=\'6\' r=\'1\' fill=\'black\'/%3E%3Cpath d=\'M0 11.4H80\' stroke=\'black\' stroke-width=\'1\'/%3E%3C/svg%3E")!important}',
 'body.tv #painel-dir .pd3::before{height:12px!important;-webkit-mask-size:80px 12px!important;mask-size:80px 12px!important}',
 'body.tv #painel-dir .pd-louro{display:none!important}',
 'body.tv #painel-dir .pd-medal>em{font-size:0!important;position:relative}',
 'body.tv #painel-dir .pd-medal>em::before{content:"";position:absolute;inset:3px 5px;background:currentColor;-webkit-mask:var(--vh-runa) center/contain no-repeat;mask:var(--vh-runa) center/contain no-repeat}',
 'body.tv #painel-dir.pd.on .pd-top>.pd-pilula{background:linear-gradient(180deg,#7a5636,#5a3c22)!important;border-color:#D4BD82!important;color:#F5EBD6!important}',
 'body.tv #painel-dir.pd.on .pd-top>.pd-pilula>button{border-left-color:#8a6644!important;color:#F5EBD6!important}',
 'body.tv #painel-dir [data-pane="fin"] .pd-medal>em{--vh-runa:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 9 18\'%3E%3Cpath d=\'M1 1V17M1 1L8 5M1 6L8 10\' fill=\'none\' stroke=\'black\' stroke-width=\'1.7\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")}',
 'body.tv #painel-dir [data-pane="lap"] .pd-medal>em{--vh-runa:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 9 18\'%3E%3Cpath d=\'M1 1V17M1 3L8 7M1 8L8 12\' fill=\'none\' stroke=\'black\' stroke-width=\'1.7\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")}',
 'body.tv #painel-dir [data-pane="enf"] .pd-medal>em{--vh-runa:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 9 18\'%3E%3Cpath d=\'M1 1V17M1 1L7 5L1 9L7 13L1 17\' fill=\'none\' stroke=\'black\' stroke-width=\'1.7\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")}',
 'body.tv #painel-dir [data-pane="b9"] .pd-medal>em{--vh-runa:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 9 18\'%3E%3Cpath d=\'M1 1V17M8 1V17M1 1L8 8M8 1L1 8\' fill=\'none\' stroke=\'black\' stroke-width=\'1.7\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var R1='M0 11H22M4 2V10M4 2L8 4.5M4 5L8 7.5M14 2V10M14 2L17.5 4.5L14 7L17.5 10',R2='M0 11H22M4 2V10M4 2L8 4.5M4 5L8 7.5M14 2V10M14 2L17.5 4.5L14 7L17.5 10';
 /* Valhala: a grega embutida no CSS vira faixa de runas (ᚠ ᚱ) com a mesma cor e tamanho */
 function troca(){Array.prototype.forEach.call(document.querySelectorAll('style'),function(st){var t=st.textContent;if(t.indexOf('V2H15V8H8V5H11')<0&&t.indexOf('H22V1H6V8H17V5H11')<0)return;
  st.textContent=t.split('M0 11H22M3 11V2H15V8H8V5H11').join(R1).split('M0 11H22V1H6V8H17V5H11').join(R2);});}
 troca();setTimeout(troca,1500);setTimeout(troca,5000);})();}
if(TV_ON){(function(){var K=function(n){return 'url("img/acampamento/'+n+'.svg?v=2")';};var st=document.createElement('style');st.id='vh-banner-teto-css';st.textContent=[
 '/* banner com pilares e moldura em madeira marrom e trança dourada; encostado no teto, com a pílula na emenda, e fechado embaixo pela mesma trança */',
 'body.tv #hero-box .neo-frontao.nf2{margin-bottom:0!important}',
 'body.tv #hero-box .bn-slot::before{background:'+K('vh-no-h-marrom')+' 0 0/40px 20px repeat-x,#5a3c22!important;height:20px!important;border-top:1.5px solid #A88750!important;border-bottom:2px solid #A88750!important;box-shadow:0 3px 6px -3px rgba(0,0,0,.4)!important}',
 'body.tv #hero-box .bn-slot{padding-bottom:22px!important}',
 'body.tv #hero-box#hero-box .vx-hero{box-shadow:inset 0 0 0 20px transparent,0 0 0 1.5px #5a3c22!important}',
 'body.tv #hero-box#hero-box .vx-hero::before{top:20px!important;bottom:20px!important;right:20px!important;height:auto!important;max-height:none!important}',
 'body.tv #hero-box .bn-slot{background:'+K('vh-capitel-marrom')+' 2px 0/46px 31px no-repeat,'+K('vh-capitel-marrom')+' calc(100% - 2px) 0/46px 31px no-repeat,'+K('vh-fuste-marrom')+' 2px 31px/46px 40px repeat-y,'+K('vh-fuste-marrom')+' calc(100% - 2px) 31px/46px 40px repeat-y,#f1e6cf!important}',
 'body.tv #hero-box .bn-slot::after{background:'+K('vh-base-marrom')+' 0 0/46px 14px no-repeat,'+K('vh-base-marrom')+' 100% 0/46px 14px no-repeat!important}',
 'body.tv #hero-box#hero-box .vx-hero{background-image:url("img/acampamento/vh-canto-tl.svg?v=3"),url("img/acampamento/vh-canto-tr.svg?v=3"),url("img/acampamento/vh-canto-bl.svg?v=3"),url("img/acampamento/vh-canto-br.svg?v=3"),'+K('vh-no-h-marrom')+','+K('vh-no-h-marrom')+','+K('vh-no-v-marrom')+','+K('vh-no-v-marrom')+',url("img/acampamento/vh-papel.svg?v=3")!important}'
].join('\n');document.head.appendChild(st);})();}
if(TV_ON){(function(){var st=document.createElement('style');st.id='vh-bandeira-css';st.textContent='body.tv #lat-band-b img[src*="bandeira"]{content:url("img/acampamento/vh-emblema-hv.webp?v=1")!important;object-fit:contain!important;border-radius:50%}';document.head.appendChild(st);})();}

(function(){var st=document.createElement('style');st.id='vh-visao-css';st.textContent=[
 '/* Valhala: quadro de visão em pinho e latão, afirmação gravada como placa rúnica */',
 'body.tv #hero-box .bv-foto{background:#203936!important;padding:6px 6px 24px!important;box-shadow:0 0 0 1.5px #A88750,3px 7px 16px rgba(0,0,0,.35)!important}',
 'body.tv #hero-box .bv-foto figcaption{color:#e9c87a!important}',
 'body.tv #hero-box#hero-box .bn-visao .bv-fbt{background:#2c4b47!important}body.tv #hero-box .bv-vazio{color:#D4BD82!important}',
 'body.tv #hero-box .bv-af{background:#F5EBD6!important;border:1.5px solid #203936!important;border-radius:4px!important;box-shadow:0 0 0 3px #F5EBD6,0 0 0 4.5px #A88750,0 8px 16px -8px rgba(0,0,0,.4)!important}',
 'body.tv #hero-box .bv-af::before,body.tv #hero-box .bv-af::after{content:"ᛟ";position:absolute;top:8px;font:400 13px Georgia,serif;color:#A88750}body.tv #hero-box .bv-af::before{right:12px}body.tv #hero-box .bv-af::after{right:30px;content:"ᚱ"}',
 'body.tv #hero-box .bv-k{color:#5a3c22!important}',
 'body.tv #hero-box#hero-box .bn-visao .bv-nav button,body.tv #hero-box#hero-box .bn-visao .bv-form button{border-color:#A88750!important;background:#203936!important;color:#F5EBD6!important}',
 'body.tv #hero-box .bv-nav button:hover{background:#A88750!important;color:#203936!important}',
 'body.tv #hero-box .vx-hero.bn2 .bn-id .cp-guia{border-top:5px solid #203936!important}'
].join('\n');document.head.appendChild(st);})();

/* cronologia do dia: o próprio totem — a cabeça do ídolo (elmo de chifres, barba entalhada) É a ponta (Inspeção) e o pé cravado na relva sobre a laje É a base (Ronda); poste de madeira escura com runas entalhadas nas laterais */
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=3")';};var F='body.tv #dia-faixa#dia-faixa';var st=document.createElement('style');st.id='vh-totem2-css';st.textContent=[
 F+'{background:none!important;border:0!important;box-shadow:none!important;padding:0 2px!important;gap:0!important}',
 F+'::before{content:"";position:absolute;z-index:0;left:calc(2px + (100% - 4px)*.1167);right:calc(2px + (100% - 4px)*.1167);top:60px;bottom:46px;background:'+U('vh-totem-runas')+' left 3px top 8px/9px 150px repeat-y,'+U('vh-totem-runas')+' right 3px top 80px/9px 150px repeat-y,repeating-linear-gradient(90deg,transparent 0 6px,rgba(46,28,16,.35) 6px 7px,transparent 7px 13px),linear-gradient(90deg,#3a2414,#6e4426 40%,#5a3820 60%,#2e1c10)!important;box-shadow:inset 0 0 0 1px #2e1c10}',
 F+'>*{position:relative;z-index:1}',
 F+' .df-cap{border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;padding:0!important;overflow:visible}',
 F+' .df-cap::before{display:none!important}',
 F+' .df-cap>svg{display:none!important}',
 F+' .df-cap.df-m{height:60px!important;background:'+U('vh-totem-topo')+' center bottom/100% 100% no-repeat!important;justify-content:flex-end!important;padding-bottom:2px!important;gap:0!important}',
 F+' .df-cap.df-m b{font:700 6.5px var(--mono,monospace)!important;letter-spacing:.06em!important;text-transform:uppercase;color:#3a2414!important;line-height:1!important}',
 F+' .df-cap.df-m i{font:700 7.5px var(--mono,monospace)!important;color:#3a2414!important;font-style:normal;line-height:1.1!important}',
 F+' .df-cap.df-m.ok{filter:drop-shadow(0 0 4px #f2d27a)}',
 F+' .df-cap.df-n{height:46px!important;background:'+U('vh-totem-pe')+' center top/100% 100% no-repeat!important;justify-content:flex-end!important;padding-bottom:2px!important;gap:0!important}',
 F+' .df-cap.df-n b{font:700 6.5px var(--mono,monospace)!important;letter-spacing:.06em!important;text-transform:uppercase;color:#f1e6cf!important;line-height:1!important}',
 F+' .df-cap.df-n i{font:700 7.5px var(--mono,monospace)!important;color:#ecd27e!important;font-style:normal;line-height:1.1!important}',
 F+' .df-cap.df-n.ok i{color:#9fe3a5!important}',
 F+' .df-cap:hover{filter:brightness(1.1)}',
 F+' .df-trilho{background:none!important;margin:6px 15px!important}',
 F+' .df-seg{background:color-mix(in srgb,var(--b) 30%,#3a2414)!important;border:1px solid rgba(226,198,156,.3)!important;border-radius:2px!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.55)!important}',
 F+' .df-seg span{color:#f1e6cf!important}',
 F+' .df-seg.atual{box-shadow:0 0 0 1.5px #ecd27e,inset 0 1px 2px rgba(0,0,0,.5)!important}',
 F+' .df-h{color:#e2c69c!important}',
 F+' .df-toq{background:#ecd27e!important;opacity:.8}',
 F+' .df-agora{border-top-color:#ecd27e!important}'+F+' .df-agora::before{background:#ecd27e!important}'+F+' .df-agora b{background:#ecd27e!important;color:#2b1d0e!important}'
].join('\n');document.head.appendChild(st);})();}
})();

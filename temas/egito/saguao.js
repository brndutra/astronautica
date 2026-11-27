/* Nomo do Brooklyn · Saguão (página principal): frontão em pilono com sol alado, banner com colunas de papiro, templos em cores de faiança, vinhetas nos cartões, cronologia em obelisco.
   Carregado só quando o tema egípcio está ligado. */
(function(){
var U=function(n){return 'url("img/egito/'+n+'.svg?v=1")';};
var H='body.eg #hero-box#hero-box .nf2';
var st=document.createElement('style');st.id='eg-saguao-css';st.textContent=[
 /* frontão: pilono com cornija de gola, arquitrave de hieróglifos e sol alado de Hórus de Behdet */
 H+'>svg.nf-tri,'+H+' .nf-acro,'+H+' .nf-louro,'+H+' .nf-cornija{display:none!important}',
 H+'{background:'+U('sol-alado')+' center 34px/380px 88px no-repeat,'+U('ent-lapis')+' 0 100%/360px 60px repeat-x,linear-gradient(180deg,transparent 0 22px,#e6cf9a 22px,#d9bf8c)!important;border-bottom:3px solid #1e3a6e!important;clip-path:polygon(3% 0,97% 0,100% 100%,0 100%)}',
 H+' .fr-lira{content:'+U('emblema')+'!important;background:none!important;box-shadow:0 2px 6px rgba(0,0,0,.35)!important;border-radius:50%!important}',
 H+' .nf-txt{background:#f7ecd2!important;border:2px solid #1e3a6e!important;border-radius:999px!important;box-shadow:0 0 0 2px #f7ecd2,0 0 0 3.5px #c9a23a!important;color:#1e3a6e!important;padding:4px 14px!important;letter-spacing:.32em!important;text-shadow:none!important}',
 /* banner: colunas de papiro e moldura de lótus */
 'body.eg #hero-box .bn-slot{background:'+U('capitel-lapis')+' 2px 0/46px 31px no-repeat,'+U('capitel-lapis')+' calc(100% - 2px) 0/46px 31px no-repeat,'+U('fuste-lapis')+' 2px 31px/46px 132px repeat-y,'+U('fuste-lapis')+' calc(100% - 2px) 31px/46px 132px repeat-y!important;padding:0 50px!important}',
 'body.eg #hero-box#hero-box .vx-hero{border:0!important;border-radius:0!important;background:'+U('ent-ocre')+' 0 0/240px 40px repeat-x,linear-gradient(0deg,#1e3a6e 0 6px,#c9a23a 6px 8px,transparent 8px),#f7ecd2!important;box-shadow:0 0 0 1.5px #6e4f10!important;padding-top:48px!important}',
 'body.eg #hero-box#hero-box .vx-hero.bn2 .bn-id .cp-guia::before{content:"folheto do nomo · brooklyn"!important}',
 'body.eg #hero-box .cp-postal .fr{background:linear-gradient(160deg,#2a4c86,#1e3a6e)!important}',
 'body.eg #hero-box .cp-postal{background:linear-gradient(160deg,#2a4c86,#1e3a6e)!important;border:2px solid #c9a23a!important;color:#f7ecd2!important}',
 'body.eg #hero-box .cp-postal *{color:#f7ecd2!important}',
 /* templos: uma cor de faiança por andar, como os gregos */
 'body.eg .wrap>.tb.neo-moldura{--neo-fuste:'+U('fuste-lapis')+'!important;--neo-cap:'+U('capitel-lapis')+'!important;--neo-base:'+U('base-lapis')+'!important;--neo-ent:'+U('ent-lapis')+'!important;--col-k:#1e3a6e!important;border-color:#1e3a6e!important;background-size:240px 40px,42px 29px,42px 29px,42px 120px,42px 120px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f5e9cc!important;box-shadow:inset 0 0 0 1px #c9a23a!important}',
 'body.eg .wrap>.tb.neo-moldura>.col-orn .co-sim,body.eg .wrap>.tb.neo-moldura>.col-orn .co-med{background:#c3d0ea!important;border-color:#1e3a6e!important;color:#1e3a6e!important;box-shadow:0 0 0 1.5px #c9a23a!important}',
 'body.eg .wrap>.tb.neo-moldura :is(.mm-col,.mm-gab,.lat-c){border-top-color:#1e3a6e!important}',
 'body.eg .wrap>.rt.neo-moldura{--neo-fuste:'+U('fuste-turquesa')+'!important;--neo-cap:'+U('capitel-turquesa')+'!important;--neo-base:'+U('base-turquesa')+'!important;--neo-ent:'+U('ent-turquesa')+'!important;--col-k:#1f625c!important;border-color:#1f625c!important;background-size:240px 40px,42px 29px,42px 29px,42px 120px,42px 120px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f5e9cc!important;box-shadow:inset 0 0 0 1px #c9a23a!important}',
 'body.eg .wrap>.rt.neo-moldura>.col-orn .co-sim,body.eg .wrap>.rt.neo-moldura>.col-orn .co-med{background:#c5e4de!important;border-color:#1f625c!important;color:#1f625c!important;box-shadow:0 0 0 1.5px #c9a23a!important}',
 'body.eg .wrap>.rt.neo-moldura :is(.mm-col,.mm-gab,.lat-c){border-top-color:#1f625c!important}',
 'body.eg .wrap>#rt-box .rt.neo-moldura{--neo-fuste:'+U('fuste-turquesa')+'!important;--neo-cap:'+U('capitel-turquesa')+'!important;--neo-base:'+U('base-turquesa')+'!important;--neo-ent:'+U('ent-turquesa')+'!important;--col-k:#1f625c!important;border-color:#1f625c!important;background-size:240px 40px,42px 29px,42px 29px,42px 120px,42px 120px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f5e9cc!important;box-shadow:inset 0 0 0 1px #c9a23a!important}',
 'body.eg .wrap>#rt-box .rt.neo-moldura>.col-orn .co-sim,body.eg .wrap>#rt-box .rt.neo-moldura>.col-orn .co-med{background:#c5e4de!important;border-color:#1f625c!important;color:#1f625c!important;box-shadow:0 0 0 1.5px #c9a23a!important}',
 'body.eg .wrap>#rt-box .rt.neo-moldura :is(.mm-col,.mm-gab,.lat-c){border-top-color:#1f625c!important}',
 'body.eg #tesouro.neo-moldura{--neo-fuste:'+U('fuste-terracota')+'!important;--neo-cap:'+U('capitel-terracota')+'!important;--neo-base:'+U('base-terracota')+'!important;--neo-ent:'+U('ent-terracota')+'!important;--col-k:#7e3420!important;border-color:#7e3420!important;background-size:240px 40px,42px 29px,42px 29px,42px 120px,42px 120px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f5e9cc!important;box-shadow:inset 0 0 0 1px #c9a23a!important}',
 'body.eg #tesouro.neo-moldura>.col-orn .co-sim,body.eg #tesouro.neo-moldura>.col-orn .co-med{background:#efcdbb!important;border-color:#7e3420!important;color:#7e3420!important;box-shadow:0 0 0 1.5px #c9a23a!important}',
 'body.eg #tesouro.neo-moldura :is(.mm-col,.mm-gab,.lat-c){border-top-color:#7e3420!important}',
 'body.eg #tp-real>#tm-painel#tm-painel{--neo-fuste:'+U('fuste-ocre')+'!important;--neo-cap:'+U('capitel-ocre')+'!important;--neo-base:'+U('base-ocre')+'!important;--neo-ent:'+U('ent-ocre')+'!important;--col-k:#6e4f10!important;border-color:#6e4f10!important;background-size:240px 40px,42px 29px,42px 29px,42px 120px,42px 120px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f5e9cc!important;box-shadow:inset 0 0 0 1px #c9a23a!important}',
 'body.eg #tp-real>#tm-painel#tm-painel>.col-orn .co-sim,body.eg #tp-real>#tm-painel#tm-painel>.col-orn .co-med{background:#f0deb0!important;border-color:#6e4f10!important;color:#6e4f10!important;box-shadow:0 0 0 1.5px #c9a23a!important}',
 'body.eg #tp-real>#tm-painel#tm-painel :is(.mm-col,.mm-gab,.lat-c){border-top-color:#6e4f10!important}',
 'body.eg #tp-real>#recreio#recreio{--neo-fuste:'+U('fuste-malaquita')+'!important;--neo-cap:'+U('capitel-malaquita')+'!important;--neo-base:'+U('base-malaquita')+'!important;--neo-ent:'+U('ent-malaquita')+'!important;--col-k:#2c5236!important;border-color:#2c5236!important;background-size:240px 40px,42px 29px,42px 29px,42px 120px,42px 120px,42px 15px,42px 15px,auto,auto!important;background-repeat:repeat-x,no-repeat,no-repeat,repeat-y,repeat-y,no-repeat,no-repeat,repeat,repeat!important;background-color:#f5e9cc!important;box-shadow:inset 0 0 0 1px #c9a23a!important}',
 'body.eg #tp-real>#recreio#recreio>.col-orn .co-sim,body.eg #tp-real>#recreio#recreio>.col-orn .co-med{background:#d3e6d3!important;border-color:#2c5236!important;color:#2c5236!important;box-shadow:0 0 0 1.5px #c9a23a!important}',
 'body.eg #tp-real>#recreio#recreio :is(.mm-col,.mm-gab,.lat-c){border-top-color:#2c5236!important}',
 'body.eg h2.sec.neo-tit#h-sem{--pk:#1e3a6e!important}body.eg h2.sec.neo-tit#h-rast{--pk:#1f625c!important}body.eg #tesouro.neo-moldura .ts-cab{--pk:#7e3420!important}body.eg #tp-real>#tm-painel>.tm-cab{--pk:#6e4f10!important}body.eg #tp-real>#recreio>.tm-cab{--pk:#2c5236!important}',

 /* vinhetas egípcias nos cartões */
 'body.eg #mm-box#mm-box .mm-chale::before{background-image:'+U('vin-quarto')+'!important}',
 'body.eg #mm-box#mm-box .mm-quest::before{background-image:'+U('vin-diarias')+'!important}',
 'body.eg #mm-box#mm-box .mm-gab::before{background-image:'+U('vin-thing')+'!important}',
 'body.eg #mm-box#mm-box .mm-orac-col::before{background-image:'+U('vin-nornas')+'!important}',
 'body.eg #mm-box#mm-box .mm-prof::before{background-image:'+U('vin-saga')+'!important}',
 'body.eg #lat-e#lat-e>#lat-gm>.gm::before{background-image:'+U('vin-meta')+'!important}',
 'body.eg #lat-e#lat-e>#lat-db::before{background-image:'+U('vin-diario')+'!important}',
 'body.eg #lat-arena#lat-arena::before{background-image:'+U('vin-foco')+'!important}',
 'body.eg #lat-apt#lat-apt::before{background-image:'+U('vin-atividades')+'!important}',
 'body.eg #lat-cv#lat-cv::before{background-image:'+U('vin-cultura')+'!important}',
 'body.eg #lat-rec#lat-rec::before{background-image:'+U('vin-menu')+'!important}',
 'body.eg #lat-ars#lat-ars::before{background-image:'+U('vin-arsenal')+'!important}',
 'body.eg #rt-box#rt-box .rt-concha::before{background-image:'+U('vin-concha')+'!important}',
 'body.eg #rt-box#rt-box .rt-insp::before{background-image:'+U('vin-insp')+'!important}',
 'body.eg #rt-box#rt-box .rt-harp::before{background-image:'+U('vin-harp')+'!important}',

 'body.eg :is(#mm-box .mm-col,#mm-box .mm-gab,#lat-e>#lat-db,#lat-e>#lat-gm>.gm,#lat-arena,#lat-apt,#lat-cv,#lat-rec,#lat-ars,#rt-box .rt-concha,#rt-box .rt-insp,#rt-box .rt-harp)::before{background-repeat:no-repeat!important;background-size:cover!important;background-position:center!important}',
 'body.eg #mm-box#mm-box :is(.mm-chale,.mm-quest,.mm-orac-col,.mm-prof,.mm-gab)::before{height:132px!important}',
 'body.eg #lat-e#lat-e>:is(#lat-db,#lat-gm>.gm)::before{height:112px!important}',
 'body.eg #lat-arena#lat-arena::before{height:96px!important}',
 'body.eg #tp-real #lat-apt#lat-apt::before,body.eg #tp-real #lat-cv#lat-cv::before{height:128px!important}',
 /* fotos (Wikimedia Commons, licenças livres; créditos em temas/egito/CREDITOS.md). Se a foto não carregar, a vinheta aparece por baixo */
 'body.eg #mm-box#mm-box .mm-chale::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Philae_08.jpg?width=900"),'+U('vin-quarto')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #mm-box#mm-box .mm-quest::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Hypostyle_karnak_colonne.jpg?width=900"),'+U('vin-diarias')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #mm-box#mm-box .mm-gab::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Ptolemy_before_Isis_%26_Osiris%2C_Dendera_Temple.jpg?width=900"),'+U('vin-thing')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #mm-box#mm-box .mm-orac-col::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/BD_Weighing_of_the_Heart.jpg?width=900"),'+U('vin-nornas')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #mm-box#mm-box .mm-prof::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Felucca_R08.jpg?width=900"),'+U('vin-saga')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #lat-e#lat-e>#lat-gm>.gm::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/%C3%84gyptischer_Maler_um_1360_v._Chr._001.jpg?width=900"),'+U('vin-meta')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #lat-e#lat-e>#lat-db::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/ASWAN_RIVER_NILE.jpg?width=900"),'+U('vin-diario')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #lat-arena#lat-arena::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Hathor_Temple_Reliefs_at_Dendera_%28XIV%29.jpg?width=900"),'+U('vin-foco')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #lat-apt#lat-apt::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Philae_Temple_R01.jpg?width=900"),'+U('vin-atividades')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #lat-cv#lat-cv::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/Dendera_Temple.jpg?width=900"),'+U('vin-cultura')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 'body.eg #rt-box#rt-box .rt-insp::before{background-image:url("https://commons.wikimedia.org/wiki/Special:FilePath/QV66_Khepri_Tomb_of_Nefertari_entrance.jpg?width=900"),'+U('vin-insp')+'!important;background-size:cover,cover!important;background-position:center 45%,center!important;filter:saturate(.9) sepia(.12)!important}',
 /* cronologia do dia: obelisco de granito rosa com piramídio dourado */
 'body.eg #dia-faixa#dia-faixa{background:'+U('obelisco-borda')+' left 2px top/8px 60px repeat-y,'+U('obelisco-borda')+' right 2px top/8px 60px repeat-y,linear-gradient(180deg,#f2e2d6,#ead2c6)!important;border:1px solid #5a2c22!important}',
 'body.eg #dia-faixa#dia-faixa .df-trilho{border-left:0!important;background:'+U('obelisco-sulco')+' left top/5px 16px repeat-y!important}',
 'body.eg #dia-faixa#dia-faixa .df-toq{width:11px!important;height:11px!important;left:-3px!important;border:0!important;border-radius:50%!important;background:'+U('obelisco-marca')+' center/100% 100% no-repeat!important}',
 'body.eg #dia-faixa#dia-faixa .df-toq:not(.foi){opacity:.55}',
 'body.eg #dia-faixa#dia-faixa .df-h{color:#5a2c22!important}',
 'body.eg #dia-faixa#dia-faixa .df-cap{background:#f7ecd2!important;border:1.5px solid #5a2c22!important;border-radius:6px!important;box-shadow:0 0 0 2px #f7ecd2,0 0 0 3px #c9a23a!important;color:#2b1d0e!important}',
 'body.eg #dia-faixa#dia-faixa .df-cap>svg{display:none!important}',
 'body.eg #dia-faixa#dia-faixa .df-cap::before{content:"";display:block;width:34px;height:29px;margin:-3px 0 -1px;background:'+U('obelisco-topo')+' center/contain no-repeat}',
 'body.eg #dia-faixa#dia-faixa .df-cap.df-n::before{background-image:'+U('obelisco-pe')+'}'
].join('\n');document.head.appendChild(st);

(function(){var st=document.createElement('style');st.id='eg-visao-css';st.textContent=[
 '/* Nomo do Brooklyn: foto em moldura de lápis-lazúli e ouro, afirmação dentro de um cartucho */',
 'body.eg #hero-box .bv-foto{background:#1e3a6e!important;padding:6px 6px 24px!important;box-shadow:0 0 0 2px #c9a23a,3px 7px 16px rgba(20,20,40,.35)!important}',
 'body.eg #hero-box .bv-foto figcaption{color:#ecd27e!important}',
 'body.eg #hero-box#hero-box .bn-visao .bv-fbt{background:#2a4c86!important}body.eg #hero-box .bv-vazio{color:#ecd27e!important}',
 'body.eg #hero-box .bv-af{background:#f7ecd2!important;border:2px solid #1e3a6e!important;border-radius:40px!important;padding:12px 30px 10px!important;box-shadow:0 0 0 3px #f7ecd2,0 0 0 4.5px #c9a23a,0 5px 0 -1px #1e3a6e,0 10px 18px -8px rgba(30,20,5,.4)!important}',
 'body.eg #hero-box .bv-af::before{content:"☥";position:absolute;left:12px;top:50%;transform:translateY(-50%);font:400 16px Georgia,serif;color:#c9a23a}',
 'body.eg #hero-box .bv-k{color:#1e3a6e!important}',
 'body.eg #hero-box#hero-box .bn-visao .bv-nav button,body.eg #hero-box#hero-box .bn-visao .bv-form button{border-color:#c9a23a!important;background:#1e3a6e!important;color:#ecd27e!important}',
 'body.eg #hero-box .bv-nav button:hover{background:#c9a23a!important;color:#1e3a6e!important}',
 'body.eg #hero-box .vx-hero.bn2 .bn-id .cp-guia{border-top:5px solid #1e3a6e!important;background:linear-gradient(180deg,#f7ecd2,#ecdcb4)!important}'
].join('\n');document.head.appendChild(st);})();
})();

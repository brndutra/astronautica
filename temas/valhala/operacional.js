/* Valhala · modo operacional: o drakkar (proa, popa, casco)
   Carregado só quando o tema Hotel Valhala está ligado. */
(function(){var TV_ON=true,OP_TEMPLO=window.OP_TEMPLO||{};
if(TV_ON){(function(){var U=function(n){return 'url("img/acampamento/'+n+'.svg?v=1")';};var O='body.tv.op-on #modo-op';var st=document.createElement('style');st.id='vh-op-drakkar-css';st.textContent=[
 '/* Modo operacional no Valhala como drakkar: a coluna da extrema esquerda é a proa (cabeça de dragão), a da extrema direita é a popa (voluta), o rodapé é o casco com escudos na amurada; casco de madeira, escudos coloridos e ondas, como na referência do drakkar */',
 O+' .op-l,'+O+' .op-g{position:relative}',
 O+' .op-l::after,'+O+' .op-g::after{content:""!important;display:block!important;position:absolute!important;top:-36px!important;bottom:-26px!important;width:46px!important;height:auto!important;z-index:4!important;pointer-events:none!important;padding:128px 0 48px!important;box-sizing:border-box!important;opacity:1!important;border:0!important;transform:none!important;',
 '  background-color:transparent!important;background-position:left top,left bottom,left top!important;background-size:46px 130px,46px 50px,46px 29px!important;background-repeat:no-repeat,no-repeat,repeat-y!important;background-origin:border-box,border-box,content-box!important;background-clip:border-box,border-box,content-box!important}',
 O+' .op-l::after{left:-8px!important;right:auto!important;width:66px!important;top:-34px!important;padding-top:118px!important;background-size:66px 120px,66px 40px,66px 22px!important;background-image:'+U('vh-nav-proa-dragao')+','+U('vh-nav-quilha-dragao')+','+U('vh-nav-haste-dragao')+'!important}',
 O+' .op-g::after{right:-8px!important;left:auto!important;background-image:'+U('vh-nav-popa')+','+U('vh-nav-quilha-d')+','+U('vh-nav-haste-popa')+'!important}',
 /* casco no rodapé */
 'body.tv.op-on #rod-apps{background:'+U('vh-nav-escudos')+' 0 1px/80px 17px repeat-x,'+U('vh-nav-ondas')+' 0 100%/60px 12px repeat-x,'+U('vh-nav-casco')+' 0 0/120px 100% repeat-x,#c47c45!important;border-top:2px solid #4a2a14!important;box-shadow:0 -3px 10px -4px rgba(40,25,10,.45)!important}',
 'body.tv.op-on #rod-apps .rod-top{background:transparent!important;padding-top:10px!important}',
 'body.tv.op-on #rod-apps :is(.cr-p,#rod-fogo){background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #4a2a14!important;border-radius:5px!important;box-shadow:0 0 0 2px #f4ead2,0 0 0 3px #4a2a14,0 4px 8px -4px rgba(30,20,10,.5)!important}',
 'body.tv.op-on #rod-apps #rod-bar{background:var(--neo-papel,none),#f4ead2!important;border:1.5px solid #4a2a14!important;border-radius:5px!important;margin:6px 4px 4px 8px!important;height:auto!important;box-shadow:0 0 0 2px #f4ead2,0 0 0 3px #4a2a14!important}'
].join('\n');document.head.appendChild(st);})();}
})();

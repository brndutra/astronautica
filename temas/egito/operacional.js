/* Casa do Brooklyn · modo operacional: a Barca de Rá — proa e popa em umbela de papiro nas colunas das pontas, casco dourado com amuletos sobre as águas do Nilo no rodapé.
   Carregado só quando o tema egípcio está ligado. */
(function(){
var U=function(n){return 'url("img/egito/'+n+'.svg?v=1")';};var O='body.eg.op-on #modo-op';
try{var cores=[['.op-l','#5a2c22'],['.op-col1','#1e3a6e'],['.op-fazer','#7e3420'],['.op-estudo','#1f625c'],['.op-lado','#6e4f10']];cores.forEach(function(c){var x=(window.OP_TEMPLO||{})[c[0]];if(x){x.k=c[1];x.c='#f5e9cc';}});}catch(e){}
var st=document.createElement('style');st.id='eg-operacional-css';st.textContent=[
 'body.eg #modo-op .op-templo{--t-fuste:'+U('fuste-ocre')+'!important;--t-cap:'+U('capitel-ocre')+'!important;--t-base:'+U('base-ocre')+'!important;--t-ent:'+U('ent-ocre')+'!important;--t-k:#6e4f10!important}',
 O+' .op-l,'+O+' .op-g{position:relative}',
 O+' .op-l::after,'+O+' .op-g::after{content:""!important;display:block!important;position:absolute!important;top:-36px!important;bottom:-26px!important;width:66px!important;height:auto!important;z-index:4!important;pointer-events:none!important;padding:122px 0 40px!important;box-sizing:border-box!important;opacity:1!important;border:0!important;transform:none!important;background-color:transparent!important;background-position:left top,left bottom,left top!important;background-size:66px 124px,66px 40px,66px 22px!important;background-repeat:no-repeat,no-repeat,repeat-y!important;background-origin:border-box,border-box,content-box!important;background-clip:border-box,border-box,content-box!important}',
 O+' .op-l::after{left:-24px!important;right:auto!important;background-image:'+U('barca-proa')+','+U('barca-quilha-e')+','+U('barca-haste')+'!important}',
 O+' .op-g::after{right:-24px!important;left:auto!important;background-image:'+U('barca-popa')+','+U('barca-quilha-d')+','+U('barca-haste')+'!important}',
 'body.eg.op-on #rod-apps{background:'+U('barca-amuletos')+' 0 1px/120px 20px repeat-x,'+U('barca-casco')+' 0 0/120px 100% repeat-x,#d8b35a!important;border-top:2px solid #6e4f10!important;box-shadow:0 -3px 10px -4px rgba(40,25,10,.45)!important}',
 'body.eg.op-on #rod-apps .rod-top{background:transparent!important;padding-top:10px!important}',
 'body.eg.op-on #rod-apps :is(.cr-p,#rod-fogo,#rod-bar){background:#f7ecd2!important;border:1.5px solid #6e4f10!important;border-radius:5px!important;box-shadow:0 0 0 2px #f7ecd2,0 0 0 3px #c9a23a,0 4px 8px -4px rgba(30,20,10,.5)!important}'
].join('\n');document.head.appendChild(st);
})();

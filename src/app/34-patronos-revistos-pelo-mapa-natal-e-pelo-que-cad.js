/* ===== Patronos revistos pelo mapa natal e pelo que cada panteão valoriza: Apolo, Odin e Thoth ===== */
PT_DADOS['Você (banner)'][2]=[['quem é','Chase Maverick Duke, o Sanngetall ("o que acerta a verdade", um dos nomes de Odin), einherji do Andar 19, filho de Odin'],['como chegou','caiu defendendo a palavra dada numa nevasca de dezembro, no último dia do sol em Sagitário; a valquíria Brynn o recolheu'],['arma','arco de freixo e uma lança com runas gravadas'],['dons','o olho no poço · os dois corvos · o hidromel da poesia · a runa da lei'],['ponto fraco','a queima: luta até cair, e o Banquete é obrigatório'],['talismã','a runa Ansuz, a runa de Odin e da palavra']];
PT_DADOS['Você (banner)'][3]=[['quem é','Chase Maverick Duke, o Neb-Medu ("o senhor da palavra"), iniciado da Casa do Brooklyn, mago do caminho de Thoth'],['como chegou','um sacerdote-leitor viu um íbis no seu ba e o trouxe ao terraço do nomo'],['instrumentos','paleta de escriba e cálamo, varinha de marfim, cajado de sicômoro'],['dons','o cálamo que acerta · o olho da lua · a palavra que faz (heka) · o guardião de Maat'],['ponto fraco','a queima: muito Rá, pouco Nilo'],['talismã','um amuleto do íbis']];
PT_DADOS['Patrono'][2]=[['Odin · pai','o Pai de Todos: sabedoria, runas, poesia e a palavra; o andarilho que paga caro pelo saber'],['o planeta','Mercúrio, a mente, está em Sagitário na Casa 9, a do saber distante. Quarta-feira é o dia de Mercúrio no latim e o dia de Odin no germânico'],['o centro do mapa','Sol e Mercúrio juntos na Casa 9: estudo, Direito e o quadro inteiro. Odin trocou um olho pela sabedoria no poço de Mímir; você troca horas de descanso pelo estudo do concurso'],['a Lua','Lua em Escorpião, na Casa 7: Odin é o deus dos segredos e do seiðr, o que lê o que está escondido'],['o que Valhala valoriza','a palavra dada e o saber conquistado com sacrifício. É o seu trabalho (escrever decisões) e a sua prova (o concurso)'],['ponto de atenção','Odin também é astúcia fria. O seu Marte em Libra pede justiça, não manobra: é esse o lado a vigiar']];
PT_DADOS['Patrono'][3]=[['Thoth · caminho','o deus íbis da escrita, da lei, da lua e da magia; escriba dos deuses'],['o planeta','os gregos chamavam Thoth de Hermes Trismegisto, o Mercúrio "três vezes grande". O seu Mercúrio está em Sagitário na Casa 9, a da lei e do saber'],['a Lua','Thoth também é deus da lua, o que conta o tempo e guarda os segredos: a sua Lua em Escorpião'],['o que o Egito valoriza','Maat, a justiça, e a escrita. O escriba era a profissão mais respeitada do Egito, e você escreve decisões para um desembargador: é um escriba da justiça'],['a balança','no julgamento das almas, Thoth registra o veredito diante da balança de Maat. Marte em Libra na Casa 7 é a sua ação pela justiça'],['o guardião','o babuíno é o animal sagrado de Thoth: Toby, o seu guardião, serve o próprio patrono'],['ponto de atenção','Thoth é medida e paciência; o Ascendente em Áries quer correr']];

/* ===== Mensageiros e vozes dos guardiões: retratos de Sully, Brynn e Toby; avisos no balão do guardião; central de mensagens por panteão ===== */
var NPC=(function(){var T=TV_ON?'norse':EG_ON?'egypt':'greek';var D={
 greek:{t:T,nome:'Sully Brookhaven',curto:'Sully',papel:'sátiro protetor · Meio-Sangue',img:'img/acampamento/sully-retrato.webp',msg:'Íris',ic:'<path d="M3 23a13 13 0 0 1 26 0M7 23a9 9 0 0 1 18 0M11 23a5 5 0 0 1 10 0M3 26h26"/>',ok:'Vamos lá',
  orn:'M0 6H5V1H10V6H15V1H20',c:{ink:'#53391f',gold:'#b58a4f',paper:'#fff5dc',dark:'#4a3525',acc:'#974c36'}},
 norse:{t:T,nome:'Brynn Halvorsen',curto:'Brynn',papel:'valquíria recrutadora · Valhala',img:'img/acampamento/brynn-retrato.webp',msg:'Hugin',ic:'<path d="M4 8l9 3 3 5 3-5 9-3-4 12-8 7-8-7zM16 16v11M11 11l-2-5 7 4 7-4-2 5"/>',ok:'Partiu',
  orn:'M0 3Q5 -2 10 3T20 3M0 3Q5 8 10 3T20 3',c:{ink:'#264a42',gold:'#ac9660',paper:'#f3f2e5',dark:'#203d39',acc:'#335f51'}},
 egypt:{t:T,nome:'Toby Nefer',curto:'Toby',papel:'escriba de Thoth · Brooklyn',img:'img/egito/toby-retrato.webp',msg:'Benh',ic:'<path d="M8 29c0-9 2-15 10-19L30 8l-10-3c-2-4-10-3-12 2-2 4 0 7 2 9M13 29v-8l9-9"/><circle cx="12" cy="7" r="1"/>',ok:'Registrado',
  orn:'M0 6L5 1L10 6L15 1L20 6',c:{ink:'#263e60',gold:'#b89443',paper:'#fff5db',dark:'#223c55',acc:'#215783'}}};return D[T];})();
function npcIc(){return '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">'+NPC.ic+'</svg>';}
function npcOrn(){var p='';for(var i=0;i<16;i++)p+='<path d="'+NPC.orn+'" transform="translate('+(i*20)+',0)"/>';return '<div class="npc-orn" aria-hidden="true"><svg viewBox="0 0 320 7" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width=".9">'+p+'</svg></div>';}
/* retrato do guardião em todo lugar que o app desenha o sidekick */
satAvatar=function(humor){return '<img class="sat-av sat-foto sat-'+(humor||'calmo')+'" src="'+NPC.img+'" alt="" aria-hidden="true">';};
/* histórico de mensagens */
function npcHist(){try{var a=JSON.parse(localStorage.getItem('astro_npc_hist')||'[]');return Array.isArray(a)?a:[];}catch(e){return [];}}
function npcGrava(a){try{localStorage.setItem('astro_npc_hist',JSON.stringify(a.slice(0,40)));}catch(e){}}
function npcHora(){var d=new Date();return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);}
function npcRegistra(tit,sub,quem){var a=npcHist();a.unshift({id:Date.now()+''+Math.round(Math.random()*999),tit:String(tit||''),sub:String(sub||''),quem:quem||'npc',h:npcHora(),d:new Date().toDateString(),lido:false});npcGrava(a);try{npcPinta();}catch(e){}}
/* aviso: balão do guardião, no canto do templo, sem cobrir o frontão */
tdAvisa=function(tit,sub,acoes,som){var box=document.getElementById('td-toasts');if(!box){box=document.createElement('div');box.id='td-toasts';box.setAttribute('aria-live','assertive');document.body.appendChild(box);}
 box.classList.add('npc-box');var t=document.createElement('div');t.className='npc-toast'+(acoes&&acoes.length>1?' npc-card':'');t.setAttribute('role','alert');
 t.innerHTML=npcOrn()+'<button type="button" class="npc-x" aria-label="Dispensar aviso">×</button><span class="npc-hr">agora · '+npcHora()+'</span><img class="npc-av" src="'+NPC.img+'" alt="Retrato de '+tdEsc(NPC.curto)+'"><div class="npc-nm">'+tdEsc(NPC.curto)+'</div><div class="npc-lb">'+tdEsc(tit)+'</div>'+(sub?'<div class="npc-say">'+tdEsc(sub)+'</div>':'')+'<div class="npc-ac"></div>';
 var ac=t.querySelector('.npc-ac'),L=acoes||[['ok',null]];L.forEach(function(a,i){var b=document.createElement('button');b.type='button';b.textContent=(a[0]==='ok'?NPC.ok:a[0]);if(i===0)b.className='pri';b.onclick=function(){t.remove();if(a[1])a[1]();};ac.appendChild(b);});
 t.querySelector('.npc-x').onclick=function(){t.remove();};
 box.appendChild(t);while(box.children.length>3)box.firstChild.remove();if(som!==false){try{tdSom(3);}catch(e){}}npcRegistra(tit,sub,'npc');
 try{if(window.Notification&&Notification.permission==='granted'&&document.visibilityState!=='visible')new Notification(NPC.curto+' · '+tit,{body:sub||'',icon:NPC.img});}catch(e){}
 if(!acoes||acoes.length<2)setTimeout(function(){if(t.parentNode)t.remove();},60000);};
/* avisos do diálogo do guardião (Sully/corvo) também entram no histórico */
(function(){var a0=aveAvisa;aveAvisa=function(quem,tit,linhas,gab){try{if(linhas&&linhas.length)npcRegistra(linhas[0],linhas.slice(1).join(' · '),quem==='corvo'?'msg':'npc');}catch(e){}return a0.apply(this,arguments);};})();
/* central de mensagens: mensageiro ao lado do guardião */
var NPC_F='all';
function npcPinta(){var b=document.getElementById('npc-ic'),a=npcHist(),n=a.filter(function(x){return !x.lido;}).length;
 if(b){var c=b.querySelector('.npc-n');c.textContent=n;c.hidden=!n;}
 var p=document.getElementById('npc-pop');if(!p||p.hidden)return;
 var L=a.filter(function(x){return NPC_F==='all'||!x.lido;});
 p.querySelector('.npc-lista').innerHTML=L.length?L.map(function(x){var av=x.quem==='msg'?'<span class="npc-mav">'+npcIc()+'</span>':'<img class="npc-mav" src="'+NPC.img+'" alt="">';
  return '<div class="npc-it'+(x.lido?' lido':'')+'" data-npcid="'+esc(x.id)+'" role="button" tabindex="0">'+av+'<div><div class="npc-de">'+esc(x.quem==='msg'?NPC.msg+' · mensageiro':NPC.curto+' · '+NPC.papel)+'</div><b>'+esc(x.tit)+'</b>'+(x.sub?'<p>'+esc(x.sub)+'</p>':'')+'<small>'+esc((x.d===new Date().toDateString()?'hoje':'antes')+' · '+x.h)+'</small></div><i class="npc-dot"></i></div>';}).join(''):'<p class="npc-vz">Nenhuma mensagem neste filtro.</p>';
 p.querySelector('.npc-ct').textContent=n+(n===1?' não lida':' não lidas');
 [].forEach.call(p.querySelectorAll('[data-npcf]'),function(x){x.setAttribute('aria-pressed',String(x.dataset.npcf===NPC_F));});}
function npcCentral(){var sk=document.querySelector('.sat-ic[data-satir]');var b=document.getElementById('npc-ic');
 if(!b){b=document.createElement('button');b.type='button';b.id='npc-ic';b.className='tt-ic npc-ic';b.title='Mensagens de bordo · '+NPC.msg;b.setAttribute('aria-label','Mensagens de bordo');b.setAttribute('data-notr','');b.innerHTML=npcIc()+'<span class="npc-n" hidden>0</span>';}
 if(sk&&sk.nextElementSibling!==b)sk.insertAdjacentElement('afterend',b);else if(!sk&&!b.parentNode)return;
 var p=document.getElementById('npc-pop');if(!p){p=document.createElement('section');p.id='npc-pop';p.hidden=true;p.setAttribute('aria-label','Mensagens de bordo');
  p.innerHTML=npcOrn()+'<div class="npc-cab"><span class="npc-selo">'+npcIc()+'</span><div><small>'+esc(NPC.msg)+' · '+esc(NPC.curto)+'</small><b>Mensagens de bordo</b></div><button type="button" class="npc-x" data-npcx aria-label="Fechar">×</button></div><div class="npc-tabs"><button type="button" data-npcf="all">Todas</button><button type="button" data-npcf="new">Novas</button></div><div class="npc-lista"></div><div class="npc-pe"><span class="npc-ct"></span><button type="button" data-npclidas>Marcar lidas</button></div>';document.body.appendChild(p);}
 npcPinta();}
function npcPos(){var b=document.getElementById('npc-ic'),p=document.getElementById('npc-pop');if(!b||!p||p.hidden)return;var r=b.getBoundingClientRect();p.style.top=Math.round(r.bottom+10)+'px';p.style.left=Math.round(Math.max(8,Math.min(innerWidth-p.offsetWidth-8,r.left+r.width/2-40)))+'px';}
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;
 if(t.closest('#npc-ic')){e.preventDefault();e.stopPropagation();var p=document.getElementById('npc-pop');if(!p)return;p.hidden=!p.hidden;npcPinta();npcPos();return;}
 var p2=document.getElementById('npc-pop');if(!p2||p2.hidden)return;
 if(t.closest('[data-npcx]')){p2.hidden=true;return;}
 var f=t.closest('[data-npcf]');if(f){NPC_F=f.dataset.npcf;npcPinta();return;}
 if(t.closest('[data-npclidas]')){var a=npcHist();a.forEach(function(x){x.lido=true;});npcGrava(a);npcPinta();return;}
 var it=t.closest('[data-npcid]');if(it){var a2=npcHist();a2.forEach(function(x){if(x.id===it.dataset.npcid)x.lido=true;});npcGrava(a2);npcPinta();return;}
 if(!t.closest('#npc-pop'))p2.hidden=true;},true);
setTimeout(function(){try{npcCentral();}catch(e){}},1700);setInterval(function(){try{npcCentral();npcPos();}catch(e){}},1500);window.addEventListener('resize',function(){try{npcPos();}catch(e){}});
(function(){var c=NPC.c,st=document.createElement('style');st.id='npc-css';st.textContent=[
 ':root{--npc-ink:'+c.ink+';--npc-gold:'+c.gold+';--npc-paper:'+c.paper+';--npc-dark:'+c.dark+';--npc-acc:'+c.acc+'}',
 '.npc-orn{height:7px;background:var(--npc-dark);color:var(--npc-gold);overflow:hidden}.npc-orn svg{display:block;width:100%;height:100%}',
 /* balão do guardião */
 '#td-toasts.npc-box{position:fixed!important;top:auto!important;left:auto!important;right:var(--npc-r,380px)!important;bottom:calc(var(--rod-h,70px) + 16px)!important;transform:none!important;z-index:80!important;display:flex;flex-direction:column;gap:10px;width:360px;max-width:calc(100vw - 24px);pointer-events:none}',
 '.npc-toast{position:relative;pointer-events:auto;color:var(--npc-ink);background:var(--npc-paper);border:1px solid var(--npc-gold);border-left:4px solid var(--npc-gold);border-radius:6px;box-shadow:0 10px 26px -8px rgba(30,20,10,.45),inset 0 0 0 3px var(--npc-paper),inset 0 0 0 4px rgba(0,0,0,.06);padding:0 14px 12px;overflow:visible;font-family:Georgia,serif;animation:npcIn .35s ease}',
 '.npc-toast .npc-orn{margin:0 -14px 10px;border-radius:5px 5px 0 0}',
 '.npc-toast::after{content:"";position:absolute;bottom:-6px;right:31px;width:10px;height:10px;background:var(--npc-paper);border-right:1px solid var(--npc-gold);border-bottom:1px solid var(--npc-gold);transform:rotate(45deg)}',
 '@keyframes npcIn{from{opacity:0;transform:translateY(10px)}}',
 '.npc-av{float:left;width:50px;height:50px;margin:0 11px 4px 0;border-radius:8px;object-fit:cover;object-position:50% 30%;border:2px solid var(--npc-gold);background:var(--npc-dark)}',
 '.npc-nm{font-weight:700;font-size:15px}',
 '.npc-lb{font:600 9px system-ui;letter-spacing:1.4px;text-transform:uppercase;opacity:.75;margin-top:2px}',
 '.npc-say{clear:both;font-size:14.5px;line-height:1.35;margin:9px 0 10px}',
 '.npc-hr{float:right;margin:2px 22px 0 0;font:600 8px system-ui;letter-spacing:1.2px;text-transform:uppercase;opacity:.6}',
 '.npc-toast .npc-x,#npc-pop .npc-x{position:absolute;right:7px;top:10px;border:0;background:none;color:var(--npc-ink);font:18px system-ui;line-height:1;cursor:pointer;padding:0 3px}',
 '.npc-ac{clear:both;display:flex;gap:7px;flex-wrap:wrap}',
 /* cartão de diálogo: chamados que pedem decisão */
 '.npc-toast.npc-card{padding-left:112px;min-height:150px;border-left-width:1px}',
 '.npc-toast.npc-card .npc-orn{margin-left:-112px}',
 '.npc-toast.npc-card .npc-av{float:none;position:absolute;left:0;top:7px;bottom:auto;width:98px;height:calc(100% - 7px);object-position:50% 25%;margin:0;border:0;border-right:2px solid var(--npc-gold);border-radius:0 0 0 5px}',
 '.npc-toast.npc-card .npc-lb{border-bottom:1px solid var(--npc-gold);padding-bottom:5px;margin-bottom:2px}',
 '.npc-toast.npc-card::after{display:none}',
 '.npc-ac button,#npc-pop .npc-pe button,#npc-pop .npc-tabs button{font:600 10px system-ui;letter-spacing:.3px;padding:6px 10px;border-radius:4px;border:1px solid var(--npc-gold);background:transparent;color:var(--npc-ink);cursor:pointer}',
 '.npc-ac button.pri{background:var(--npc-dark);border-color:var(--npc-dark);color:var(--npc-paper)}',
 /* botão do mensageiro e central */
 '#npc-ic{position:relative}#npc-ic svg{width:18px;height:18px}',
 '#npc-ic .npc-n{position:absolute;top:-4px;right:-5px;min-width:15px;height:15px;padding:0 3px;border-radius:8px;background:var(--npc-acc);color:#fff;font:700 9px/15px system-ui;text-align:center;box-shadow:0 0 0 2px var(--npc-paper)}#npc-ic .npc-n[hidden]{display:none}',
 '#npc-pop{position:fixed;z-index:90;width:360px;max-width:calc(100vw - 16px);max-height:min(560px,calc(100vh - 120px));display:flex;flex-direction:column;color:var(--npc-ink);background:var(--npc-paper);border:1px solid var(--npc-gold);border-radius:8px;box-shadow:0 14px 34px -10px rgba(30,20,10,.5),inset 0 0 0 3px var(--npc-paper),inset 0 0 0 4px rgba(0,0,0,.08);overflow:hidden;font-family:Georgia,serif}',
 '#npc-pop[hidden]{display:none!important}',
 '#npc-pop .npc-orn{height:12px;border-bottom:2px solid var(--npc-gold)}',
 '#npc-pop .npc-cab{position:relative;display:flex;align-items:center;gap:10px;padding:14px 14px 10px;border-bottom:1px dotted var(--npc-gold)}',
 '#npc-pop .npc-selo{width:42px;height:42px;flex:none;display:grid;place-items:center;border-radius:50%;border:1px solid var(--npc-gold);outline:1px dotted var(--npc-gold);outline-offset:3px;color:var(--npc-acc)}#npc-pop .npc-selo svg{width:28px;height:28px}',
 '#npc-pop .npc-cab small{display:block;font:600 9px system-ui;letter-spacing:1.2px;text-transform:uppercase;color:var(--npc-acc)}#npc-pop .npc-cab b{font-weight:400;font-size:18px}',
 '#npc-pop .npc-tabs{display:flex;gap:4px;padding:9px 14px 2px}#npc-pop .npc-tabs button{border-color:transparent}#npc-pop .npc-tabs button[aria-pressed=true]{border-color:var(--npc-gold);background:rgba(0,0,0,.04)}',
 '#npc-pop .npc-lista{flex:1;min-height:0;overflow-y:auto;padding:0 14px;scrollbar-width:thin}',
 '#npc-pop .npc-it{position:relative;display:grid;grid-template-columns:40px 1fr;gap:10px;padding:11px 0;border-bottom:1px dotted var(--npc-gold);cursor:pointer}#npc-pop .npc-it:last-child{border-bottom:0}',
 '#npc-pop .npc-mav{width:38px;height:38px;border-radius:50%;object-fit:cover;object-position:50% 30%;border:1px solid var(--npc-gold);display:grid;place-items:center;color:var(--npc-acc)}#npc-pop span.npc-mav svg{width:24px;height:24px}',
 '#npc-pop .npc-de{font:600 8.5px system-ui;letter-spacing:.9px;text-transform:uppercase;color:var(--npc-acc);margin-bottom:3px}',
 '#npc-pop .npc-it b{display:block;font-size:13.5px;padding-right:12px}#npc-pop .npc-it p{margin:3px 0;font-size:12px;opacity:.8;line-height:1.4}#npc-pop .npc-it small{font:600 8px system-ui;letter-spacing:.8px;text-transform:uppercase;opacity:.6}',
 '#npc-pop .npc-dot{position:absolute;right:1px;top:16px;width:6px;height:6px;border-radius:50%;background:var(--npc-acc)}#npc-pop .npc-it.lido .npc-dot{display:none}#npc-pop .npc-it.lido{opacity:.75}',
 '#npc-pop .npc-vz{padding:18px 0;opacity:.7;font-size:13px}',
 '#npc-pop .npc-pe{display:flex;align-items:center;justify-content:space-between;padding:10px 14px 12px;border-top:1px dotted var(--npc-gold)}#npc-pop .npc-ct{font:600 8.5px system-ui;letter-spacing:.8px;text-transform:uppercase;opacity:.7}',
 'body.noite .npc-toast,body.noite #npc-pop{filter:none}',
 'html body:not(.zz9):not(.zz8) :is(.npc-toast,#npc-pop) button{width:auto!important;min-width:0!important;height:auto!important;min-height:0!important;margin:0!important;box-shadow:none!important;text-transform:none!important}',
 'html body:not(.zz9):not(.zz8) :is(.npc-toast,#npc-pop) .npc-x{position:absolute!important;left:auto!important;right:7px!important;top:10px!important;padding:0 3px!important;border:0!important;background:none!important;font:18px/1 system-ui!important;color:var(--npc-ink)!important}',
 'html body:not(.zz9):not(.zz8) .npc-toast .npc-ac button{padding:6px 10px!important;font:600 10px system-ui!important;border:1px solid var(--npc-gold)!important;background:transparent!important;color:var(--npc-ink)!important;border-radius:4px!important}',
 'html body:not(.zz9):not(.zz8) .npc-toast .npc-ac button.pri{background:var(--npc-dark)!important;border-color:var(--npc-dark)!important;color:var(--npc-paper)!important}'
 ].join('\n');document.head.appendChild(st);})();
/* o balão fica no canto do templo central, à esquerda do painel direito */
function npcCanto(){var tp=document.getElementById('tp-painel'),b=document.getElementById('td-toasts');if(!b)return;var r=tp&&tp.offsetParent?Math.max(12,Math.round(innerWidth-tp.getBoundingClientRect().left+16)):16;b.style.setProperty('--npc-r',r+'px');}
setInterval(function(){try{npcCanto();}catch(e){}},1500);window.addEventListener('resize',function(){try{npcCanto();}catch(e){}});

/* verso do cartão-postal: ícone para baixar a extensão do Chrome */
(function(){var c0=cpVerso;cpVerso=function(){var r=c0.apply(this,arguments);try{var v=document.querySelector('#hero-box .cp-postal>.cp-verso');if(v&&!v.querySelector('.cpv-ext')){var a=document.createElement('a');a.className='cpv-ext';a.href='downloads/astronautica-extensao-0.7.1.zip';a.setAttribute('download','astronautica-extensao-0.7.1.zip');a.title='Baixar a extensão do Chrome (Alt+Shift+A)';a.setAttribute('aria-label','Baixar a extensão do Chrome');
 a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h3a2 2 0 1 1 4 0h2v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H6v-4a2 2 0 1 0 0-4V4z"/><path d="M12 9v6m-2.5-2.5L12 15l2.5-2.5"/></svg>';v.appendChild(a);}}catch(e){}return r;};})();
window.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.cpv-ext'))e.stopPropagation();},true);
(function(){var st=document.createElement('style');st.id='cpv-ext-css';var k=TV_ON?'#203936':EG_ON?'#1e3a6e':'#8a5a14';st.textContent=[
 '#hero-box .cp-postal .cp-verso .cpv-ext{position:absolute;top:8px;right:8px;z-index:4;width:28px;height:28px;display:grid;place-items:center;border-radius:50%;border:1px solid '+k+';background:rgba(255,250,236,.92);color:'+k+';box-shadow:0 2px 6px -2px rgba(30,20,10,.4);text-decoration:none;cursor:pointer}',
 '#hero-box .cp-postal .cp-verso .cpv-ext:hover{background:'+k+';color:#fff8e6}',
 '#hero-box .cp-postal .cp-verso .cpv-ext svg{width:17px;height:17px}'
].join('\n');document.head.appendChild(st);})();

/* ===== Diário do Semideus em páginas: registro do dia, da semana, do mês e andamentos (tudo cifrado com a senha do cofre) ===== */
var RG_MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function rgPer(tp,d){d=d||new Date();var p2=function(n){return String(n).padStart(2,'0');};
 if(tp==='sem'){var k=acSemana(d),a=new Date(k+'T12:00:00'),b=new Date(a);b.setDate(a.getDate()+6);return {k:k,t:'semana de '+p2(a.getDate())+'/'+p2(a.getMonth()+1)+' a '+p2(b.getDate())+'/'+p2(b.getMonth()+1)};}
 if(tp==='mes')return {k:d.getFullYear()+'-'+p2(d.getMonth()+1),t:RG_MES[d.getMonth()]+' de '+d.getFullYear()};
 if(tp==='and')return {k:'and',t:'frentes em curso'};
 return {k:hoje(),t:d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})};}
var RG_CFG={dia:{pg:'diario',gui:['o que aconteceu hoje','o que venci','o que travou','como estou chegando ao fim do dia'],ph:'Registro do dia: fatos, vitórias, o que travou e como você está.'},
 sem:{pg:'reg-sem',gui:['as vitórias da semana','o que ficou para trás e por quê','o foco da próxima semana'],ph:'Balanço da semana.'},
 mes:{pg:'reg-mes',gui:['as conquistas do mês','o que mudou em mim e na rotina','a meta do próximo mês'],ph:'Balanço do mês.'},
 and:{pg:'andam',gui:['em que pé está cada frente','o próximo passo concreto','o que está travando'],ph:'Andamento de uma frente: onde está e qual o próximo passo.'}};
var RG_FRENTES=['Concurso TRF3','Gabinete','Apps e ferramentas','Corpo e saúde','Línguas e runas','Casa','Outra'];
function rgPainel(){var o=[];try{var x=gmXP(),nv=gmNivel(x.total);o.push(['nível '+nv.n,x.total+' XP']);}catch(e){}
 try{o.push([gmSeq()+' dias','sequência']);}catch(e){}
 try{var D=satDia();o.push([D.feitos.length+'/'+D.H.length,'ritos hoje']);o.push([D.min+'/'+D.meta,'min de estudo hoje']);o.push([(D.blocos||0)+'','blocos de foco hoje']);o.push([D.rv.length+'','revisões hoje']);}catch(e){}
 return o.length?'<div class="rg-pn">'+o.map(function(x){return '<div><b>'+esc(x[0])+'</b><small>'+esc(x[1])+'</small></div>';}).join('')+'</div>':'';}
async function rgPinta(tp){var C=RG_CFG[tp],corpo=lvCorpo(C.pg);if(!corpo)return;var w=corpo.querySelector(':scope>.rg[data-rg="'+tp+'"]');
 if(!w){w=document.createElement('div');w.className='rg';w.setAttribute('data-rg',tp);corpo.appendChild(w);
  w.addEventListener('click',function(e){if(e.target.closest('[data-rgadd]'))rgAdd(tp);});}
 if(!CF.chave){w.innerHTML='<p class="rg-gui">Abra o cofre para ler e escrever.</p>';return;}
 var P=rgPer(tp),L=(S.dsd||[]).filter(function(e){return (e.tp||'dia')===tp;}),it=[];
 for(var i=L.length-1;i>=0;i--){var e=L[i],t='';try{t=await cfDecifra(e);}catch(z){t='(entrada cifrada com outra senha)';}
  var atual=tp!=='and'&&e.per===P.k;it.push('<li'+(atual?' class="atual"':'')+'><time>'+esc(e.rot||e.em||'')+'</time>'+(e.fr?'<span class="rg-fr">'+esc(e.fr)+'</span>':'')+'<p>'+esc(t)+'</p></li>');}
 var ta=w.querySelector('textarea'),rasc=ta?ta.value:'';
 w.innerHTML='<span class="rg-k">'+(tp==='dia'?'hoje':tp==='sem'?'esta semana':tp==='mes'?'este mês':'andamentos')+'</span><b class="rg-per">'+esc(P.t)+'</b>'+
  (tp==='and'?rgPainel():'')+'<ul class="rg-gui">'+C.gui.map(function(g){return '<li>'+esc(g)+'</li>';}).join('')+'</ul>'+
  '<textarea rows="4" placeholder="'+esc(C.ph)+'"></textarea>'+
  '<div class="rg-ac">'+(tp==='and'?'<select data-rgfr>'+RG_FRENTES.map(function(f){return '<option>'+esc(f)+'</option>';}).join('')+'</select>':'')+'<button type="button" data-rgadd>guardar</button><small>cifrado com a sua senha</small></div>'+
  '<ol class="rg-lista">'+(it.join('')||'<li class="vz">Nada registrado ainda.</li>')+'</ol>';
 if(rasc)w.querySelector('textarea').value=rasc;}
async function rgAdd(tp){var w=document.querySelector('#lv .rg[data-rg="'+tp+'"]');if(!w||!CF.chave)return;var ta=w.querySelector('textarea'),t=(ta.value||'').trim();if(!t)return;
 var o=await cfCifra(t),n=new Date(),P=rgPer(tp);o.tp=tp;o.per=P.k;o.em=n.toLocaleDateString('pt-BR')+' · '+String(n.getHours()).padStart(2,'0')+'h'+String(n.getMinutes()).padStart(2,'0');
 o.rot=(tp==='dia'?o.em:P.t+' · '+o.em);var fr=w.querySelector('[data-rgfr]');if(fr)o.fr=fr.value;
 S.dsd=S.dsd||[];S.dsd.push(o);try{grava();}catch(e){}try{anota(tp==='dia'?'Registro do dia no diário':tp==='sem'?'Registro da semana no diário':tp==='mes'?'Registro do mês no diário':'Andamento registrado no diário',0,false);}catch(e){}
 ta.value='';rgPinta(tp);}
function rgTudo(){['dia','sem','mes','and'].forEach(function(tp){try{rgPinta(tp);}catch(e){}});}
(function(){var c0=cfDiario;cfDiario=async function(){var r=await c0.apply(this,arguments);try{rgTudo();}catch(e){}return r;};})();
(function(){var e0=lvEstado;lvEstado=function(){var r=e0.apply(this,arguments);try{if(CF.chave&&!document.querySelector('#lv .rg[data-rg="dia"] .rg-per'))rgTudo();}catch(e){}return r;};})();
setInterval(function(){try{if(CF.chave){var w=document.querySelector('#lv .rg[data-rg="and"]');if(w&&!w.contains(document.activeElement)){var pn=w.querySelector('.rg-pn'),h=rgPainel();if(pn&&h)pn.outerHTML=h;}}}catch(e){}},60000);

/* ===== A ficha abre como folheto (três dobras, por tema); o diário abre como livro ===== */
var FO_CFG=TV_ON?{k:'folheto do hotel · andar 19',t:'Registro do Einherji',d:'abrir o diário da saga'}:EG_ON?{k:'folheto da casa · nomo 21',t:'Papiro do Iniciado',d:'abrir o diário de papiro'}:{k:'folheto do acampamento · chalé 7',t:'Ficha do Campista',d:'abrir o Diário do Semideus'};
/* caderno de papel em PDF, com o visual do tema de cada ficha (planner/pdf/caderno-g-*.pdf) */
var FO_PDF=TV_ON?{f:'nordico',n:'Caderno G · Hotel Valhala.pdf'}:EG_ON?{f:'egipcio',n:'Caderno G · Casa do Brooklyn.pdf'}:{f:'grego',n:'Caderno G · Acampamento Meio-Sangue.pdf'};
var LV_MODO='ficha',FO_IDS=['registro','atrib','dons','destino'];
lvFolhas=(function(f0){return function(){return f0.apply(this,arguments).filter(function(f){return FO_IDS.indexOf(f.id)<0;});};})(lvFolhas);
function foMonta(){var lv=document.getElementById('lv');if(!lv)return null;var fo=document.getElementById('fo');
 if(!fo){fo=document.createElement('div');fo.id='fo';fo.className='fo';fo.setAttribute('data-notr','');fo.setAttribute('translate','no');fo.hidden=true;
  fo.innerHTML='<div class="fo-cab"><div><span class="fo-k">'+esc(FO_CFG.k)+'</span><b>'+esc(FO_CFG.t)+'</b></div><div class="fo-ac">'+
   '<button type="button" data-fodiario><svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2z"/></svg>'+esc(FO_CFG.d)+'</button>'+
   '<button type="button" data-fopdf title="Manual, um mês e cinco semanas, em A4 com marcas de corte"><svg viewBox="0 0 24 24"><path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19h14"/></svg>baixar o caderno</button>'+
   '<button type="button" data-fomonta title="Escolher quantos meses e semanas imprimir"><svg viewBox="0 0 24 24"><path d="M7 8V4h10v4"/><rect x="4" y="8" width="16" height="8" rx="1.5"/><path d="M7 13h10v7H7z"/></svg>montar folhas</button>'+
'<button type="button" data-lvtr><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>trancar</button></div></div>'+
   '<div class="fo-dobras"><div class="fo-p" data-fop="1"></div><div class="fo-p" data-fop="2"></div><div class="fo-p" data-fop="3"></div></div>';
  lv.appendChild(fo);
  fo.addEventListener('click',function(e){if(e.target.closest('[data-fodiario]')){LV_MODO='diario';lvEstado();try{lvIrSec('Diário');}catch(z){}}
   if(e.target.closest('[data-fopdf]')){var a=document.createElement('a');a.href='planner/pdf/caderno-g-'+FO_PDF.f+'.pdf';a.download=FO_PDF.n;document.body.appendChild(a);a.click();a.remove();}
   if(e.target.closest('[data-fomonta]')){var u='planner/imprimir.html?tema='+FO_PDF.f,w=window.open(u,'_blank','noopener');if(!w)location.href=u;}});}
 var map={registro:1,atrib:2,dons:3,destino:3};
 FO_IDS.forEach(function(id){var sec=lv.querySelector('.lv-folha[data-folha="'+id+'"]'),p=fo.querySelector('[data-fop="'+map[id]+'"]');if(sec&&p&&sec.parentNode!==p)p.appendChild(sec);});
 var pq=lv.querySelector('#fc-ficha > .fc-pq'),ca=lvCorpo('atrib');if(pq&&ca)ca.appendChild(pq);
 var tp=lv.querySelector('.lv-topo');if(tp&&!tp.querySelector('.lv-fo-bt')){var b=document.createElement('button');b.type='button';b.className='lv-fo-bt';b.textContent='‹ '+FO_CFG.t;b.addEventListener('click',function(){LV_MODO='ficha';lvEstado();});var tr=tp.querySelector('[data-lvtr]');tp.insertBefore(b,tr||null);}
 return fo;}
lvEstado=(function(e0){return function(){var r=e0.apply(this,arguments);try{var fo=foMonta(),liv=document.getElementById('lv-livro'),ab=!!CF.chave;if(!ab)LV_MODO='ficha';
  if(fo&&liv){var fi=ab&&LV_MODO==='ficha';if(fo.hidden!==!fi)fo.hidden=!fi;if(ab&&liv.hidden!==fi)liv.hidden=fi;}}catch(e){}return r;};})(lvEstado);

/* topo do templo: clima compacto ao lado do modo escuro; Sully + mensagens num cartão só do outro lado do frontão; sem o seletor Templo I · II; Ferramentas no rodapé; × nos painéis do Toque */
function clTopo(){var row=document.querySelector('#hero-box .bn-row'),cl=document.getElementById('lat-cl');if(!row||!cl)return;
 var w=document.getElementById('cl-topo');if(!w){w=document.createElement('div');w.id='cl-topo';w.className='cl-topo';w.setAttribute('data-notr','');}
 if(w.parentNode!==row)row.appendChild(w);if(cl.parentNode!==w)w.appendChild(cl);
 var b=cl.querySelector('.lat-cl>b'),s=cl.querySelector('.lat-cl>span');cl.title=b&&s?('Clima · '+latCidade().n+' · '+b.textContent+' '+(s.firstChild&&s.firstChild.nodeValue||'')).trim():'Clima';
 var te=document.getElementById('tema-ic'),sk=row.querySelector('.sk-topo');
 if(te){var c=getComputedStyle(te),v=c.backgroundColor+'|'+c.borderTopColor+'|'+c.color;if(w._v!==v){w._v=v;row.style.setProperty('--ct-bg',c.backgroundColor);row.style.setProperty('--ct-bd',c.borderTopColor);row.style.setProperty('--ct-tx',c.color);}}
 if(sk){var c2=getComputedStyle(sk),v2=c2.backgroundColor+'|'+c2.borderTopColor;if(row._v2!==v2){row._v2=v2;row.style.setProperty('--sn-bg',c2.backgroundColor);row.style.setProperty('--sn-bd',c2.borderTopColor);}}}
function clTopoAbre(on){var w=document.getElementById('cl-topo');if(!w)return;on=typeof on==='boolean'?on:!w.classList.contains('cl-aberto');w.classList.toggle('cl-aberto',on);document.body.classList.toggle('cl-topo-aberto',on);}
window.addEventListener('click',function(e){var w=document.getElementById('cl-topo');if(!w||!e.target.closest)return;
 var ed=e.target.closest('#cl-topo [data-lat-ed]');if(ed){e.preventDefault();e.stopPropagation();clTopoAbre(false);try{latEdita('clima');}catch(z){}return;}
 if(e.target.closest('#cl-topo')){e.preventDefault();e.stopPropagation();clTopoAbre();return;}
 if(w.classList.contains('cl-aberto'))clTopoAbre(false);},true);
document.addEventListener('keydown',function(e){if(e.key==='Escape')clTopoAbre(false);});
setTimeout(function(){try{clTopo();}catch(e){}},900);setInterval(function(){try{clTopo();}catch(e){}},1200);
/* Ferramentas: o botão mora no rodapé, na ponta direita da faixa de cima */
ferPoe=function(){var w=document.getElementById('fer-w')||ferPoe.w;if(!w)return;var t=document.querySelector('#rod-apps .rod-top');
 if(t){if(w.parentNode!==t||t.lastElementChild!==w)t.appendChild(w);}else if(w.parentNode!==document.body)document.body.appendChild(w);};
setTimeout(function(){try{ferPoe();}catch(e){}},1000);setInterval(function(){try{ferPoe();}catch(e){}},1500);
/* × para fechar os painéis do Toque da Concha */
function toqueX(){var hj=document.querySelector('#tp-friso-bloco .cb-hoje');
 if(hj&&!hj.hidden&&!hj.querySelector(':scope>.tq-x')){var x=document.createElement('button');x.type='button';x.className='tq-x';x.setAttribute('data-tqx','hoje');x.setAttribute('aria-label','Fechar o painel do Toque da Concha');x.title='fechar';x.textContent='×';hj.appendChild(x);}
 var r1=document.getElementById('tm-r1');if(r1&&document.body.classList.contains('concha-aberta')&&!r1.querySelector(':scope>.tq-x')){var y=document.createElement('button');y.type='button';y.className='tq-x';y.setAttribute('data-tqx','concha');y.setAttribute('aria-label','Fechar o ajuste do Toque da Concha');y.title='fechar';y.textContent='×';r1.insertBefore(y,r1.firstChild);}}
(function(){var h0=hojePinta;hojePinta=function(){var r=h0.apply(this,arguments);try{toqueX();}catch(e){}return r;};var c0=concha;concha=function(){var r=c0.apply(this,arguments);try{toqueX();}catch(e){}return r;};})();
setInterval(function(){try{toqueX();}catch(e){}},700);
window.addEventListener('click',function(e){var x=e.target.closest&&e.target.closest('.tq-x[data-tqx]');if(!x)return;e.preventDefault();e.stopPropagation();
 if(x.dataset.tqx==='concha'){try{concha(false);}catch(z){}return;}
 HOJE_ABERTO=false;try{localStorage.setItem('astro_hoje_pan','0');}catch(z){}try{hojePinta();}catch(z){}try{hojeSobe();}catch(z){}},true);
(function(){var st=document.createElement('style');st.id='topo-rodape-css';var k=TV_ON?'#203936':EG_ON?'#1e3a6e':'#8a5a14';
 var R='html body:not(.zz9):not(.zz8) #hero-box#hero-box .bn-row',C=R+'>#cl-topo>#lat-cl';
 st.textContent=[
 /* sem o seletor Templo I · Templo II */
 'html body .tpl-nav{display:none!important}',
 /* ordem na faixa do topo: modo escuro, clima | ... | Sully + mensagens */
 R+'{column-gap:0!important;gap:0!important}'+R+'>#tema-ic{order:1}'+R+'>#cl-topo{order:2}'+R+'>.sk-topo{order:10;margin-left:auto!important}'+R+'>#npc-ic{order:11}'+R+'>#bn-min{order:20;margin-left:6px!important}',
 'body.cl-topo-aberto #hero-box#hero-box .bn-row{z-index:60!important}',
 /* cartão único Sully + mensagens */
 R+'>.sk-topo.sk-topo,'+R+'>#npc-ic#npc-ic{height:34px!important;min-height:34px!important;background:var(--sn-bg)!important;border:1px solid var(--sn-bd)!important;box-shadow:none!important}',
 R+'>.sk-topo.sk-topo{border-radius:10px 0 0 10px!important;border-right:0!important;margin-right:0!important}',
 R+'>#npc-ic#npc-ic{border-radius:0 10px 10px 0!important;margin-left:0!important;width:40px!important;position:relative}',
 R+'>#npc-ic#npc-ic::before{content:"";position:absolute;left:0;top:7px;bottom:7px;border-left:1px solid var(--sn-bd)}',
 /* clima compacto */
 R+'>#cl-topo{position:relative;height:34px;margin-left:8px;flex:none}',
 C+'{display:flex!important;align-items:center;gap:6px;height:34px;box-sizing:border-box;margin:0!important;padding:0 10px 0 5px!important;border:1px solid var(--ct-bd)!important;border-radius:10px!important;background:var(--ct-bg)!important;box-shadow:none!important;cursor:pointer;white-space:nowrap;min-width:0;width:auto!important}',
 C+'>header{display:contents!important}',
 C+'>header>div,'+C+'>header>.lat-ed{display:none!important}',
 C+'>header>.lat-ic{width:24px!important;height:24px!important;min-width:0!important;margin:0!important;border:0!important;background:none!important;display:grid!important;place-items:center;color:var(--ct-tx)}',
 C+'>header>.lat-ic svg{width:17px!important;height:17px!important}',
 C+' .lat-b{margin:0!important;padding:0!important}',
 C+' .lat-cl{display:flex!important;align-items:baseline;gap:5px}',
 C+' .lat-cl>b{font-size:17px!important;line-height:1!important}',
 C+' .lat-cl>span{font-size:11px!important;line-height:1!important}',
 C+' .lat-cl small,'+C+' .lat-cl br,'+C+' .lat-cl3{display:none!important}',
 C+' .lat-n{font-size:11px!important;margin:0!important}',
 /* aberto: o cartão inteiro cai do topo */
 R+'>#cl-topo.cl-aberto>#lat-cl{position:absolute;top:0;left:0;z-index:61;display:block!important;width:270px!important;height:auto;padding:10px 12px 12px!important;white-space:normal;cursor:default;box-shadow:0 14px 30px -10px rgba(40,25,10,.45)!important}',
 R+'>#cl-topo.cl-aberto>#lat-cl>header{display:flex!important;align-items:center;gap:8px;margin-bottom:8px}',
 R+'>#cl-topo.cl-aberto>#lat-cl>header>div{display:block!important;flex:1}',
 R+'>#cl-topo.cl-aberto>#lat-cl>header>.lat-ed{display:grid!important;cursor:pointer}',
 R+'>#cl-topo.cl-aberto>#lat-cl .lat-cl>b{font-size:30px!important}',
 R+'>#cl-topo.cl-aberto>#lat-cl .lat-cl>span{font-size:12px!important;line-height:1.35!important}',
 R+'>#cl-topo.cl-aberto>#lat-cl .lat-cl small,'+R+'>#cl-topo.cl-aberto>#lat-cl .lat-cl br{display:revert!important}',
 R+'>#cl-topo.cl-aberto>#lat-cl .lat-cl3{display:grid!important}',
 /* rodapé aberto: cartões alinhados, mesma altura por linha */
 'html body #rod-apps #lat-apps{align-items:stretch!important;align-content:start!important}',
 'html body #rod-apps #lat-apps>.lat-c{margin:0!important;height:auto!important;box-sizing:border-box}',
 'html body #rod-apps #rod-quadro{margin-bottom:12px!important}',
 'html body #rod-apps #rod-quadro hr,html body #rod-apps #rod-quadro>*{max-width:none!important}',
 /* Ferramentas dentro do rodapé */
 'html body #rod-apps .rod-top>#fer-w#fer-w{position:relative!important;top:auto!important;right:auto!important;left:auto!important;bottom:auto!important;z-index:5!important;flex:none;display:flex;align-items:center;padding:0 10px 0 6px}',
 'html body #rod-apps .rod-top>#fer-w .fer-menu{top:auto!important;bottom:calc(100% + 8px)!important;right:4px!important;max-height:calc(100vh - 140px);overflow:auto}',
 /* × dos painéis do Toque */
 'html body #tp-friso-bloco .cb-hoje{position:relative}',
 'html body:not(.zz9):not(.zz8) .tq-x.tq-x{all:unset;position:absolute!important;top:4px;right:6px;z-index:6;width:24px;height:24px;display:grid;place-items:center;border-radius:50%;border:1px solid '+k+';background:rgba(255,250,236,.95);color:'+k+';font:17px/1 Georgia,serif;cursor:pointer;box-sizing:border-box}',
 'html body:not(.zz9):not(.zz8) .tq-x.tq-x:hover{background:'+k+';color:#fff8e6}',
 'html body.concha-aberta #tp-real #tm-r1>.tq-x{position:sticky!important;float:right;top:4px;margin:4px 4px -28px 0}'
 ].join('\n');document.head.appendChild(st);})();
/* altura fixa dos dois templos: nada de dentro muda o tamanho deles */
(function(){var st=document.createElement('style');st.id='templos-fixos-css';st.textContent=[
 '@media(min-width:700px){',
 ' html body #hero-box#hero-box{box-sizing:border-box!important;height:1022px!important;min-height:1022px!important;max-height:1022px!important}',
 ' html body #hero-box#hero-box>.bn-slot{height:731px!important;min-height:731px!important;max-height:731px!important;box-sizing:border-box!important}',
 ' html body .wrap>div.rt.rt{box-sizing:border-box!important;height:623px!important;min-height:623px!important;max-height:623px!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}',
 ' html body .wrap>div.rt.rt>:not(#rt-w):not(.col-orn){flex:none!important}',
 ' html body .wrap>div.rt.rt>#rt-w{flex:1 1 0!important;min-height:0!important;height:auto!important;max-height:none!important;overflow:auto!important}',
 '}'].join('\n');document.head.appendChild(st);})();

/* Em andamento sai da base e vai para o Mural; Crônicas do chalé e o Diário de bordo viram um painel só */
rodRearruma=function(){var orb=document.getElementById('orbp'),v=document.querySelector('#hero-box .vx-hero.bn2 .bn-id')||document.querySelector('#hero-box .vx-hero.bn2');
 if(orb&&v){var w=document.getElementById('orb-mural');if(!w){w=document.createElement('section');w.id='orb-mural';w.className='orb-mural';w.setAttribute('data-notr','');w.innerHTML='<span class="om-k">em andamento</span>';}
  var pb=v.querySelector(':scope > .cp-pinbar');if(w.parentNode!==v||(pb&&w.nextElementSibling!==pb)){if(pb)v.insertBefore(w,pb);else v.appendChild(w);}if(orb.parentNode!==w)w.appendChild(orb);}
 var vel=document.querySelector('#hero-box > .bn-rod > .br-orb');if(vel&&!vel.querySelector('#orbp'))vel.remove();
 rodPanPoe();};
var ROD_PAN='';
function rodPanPoe(){var rod=document.querySelector('#hero-box > .bn-rod');if(!rod)return;var p=document.getElementById('rod-pan');
 if(!p){p=document.createElement('section');p.id='rod-pan';p.className='rod-pan';p.hidden=true;p.setAttribute('data-notr','');
  p.innerHTML='<header><span class="rp-k"></span><b class="rp-t"></b><button type="button" class="rp-x" data-rpx aria-label="fechar">×</button></header><div class="rp-c rp-sem"></div><div class="rp-c rp-mes"></div><div class="rp-c rp-reg"><div class="rp-col rp-hoje"><h5>registros de hoje</h5></div><div class="rp-col rp-cron"><h5>crônicas do chalé · uma entrada por ciclo</h5></div></div>';
  p.addEventListener('input',function(e){var k=e.target.dataset&&e.target.dataset.rprev;if(!k)return;var W=wsD(),key=revSemana().k;W.rev=W.rev||{};W.rev[key]=W.rev[key]||{};W.rev[key][k]=e.target.value;clearTimeout(rodPanPoe.t);rodPanPoe.t=setTimeout(function(){try{grava();}catch(z){}},500);});
  p.addEventListener('change',function(e){var k=e.target.dataset&&e.target.dataset.rpmes;if(!k)return;var val=e.target.value.trim();
   try{var Q=(typeof tbMesPlano==='function'&&window.AX&&AX.ok)?tbMesPlano():null;if(Q){Q.m[k]=val;AX.save();}}catch(z){}
   var W=wsD(),mm=wsSemanas().mes;W.mes[mm]=W.mes[mm]||{};W.mes[mm][k]=val;try{grava();}catch(z){}});
  p.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.tagName==='INPUT')e.target.blur();});}
 if(p.parentNode!==rod)rod.appendChild(p);
 var rl=document.getElementById('rd-l'),hj=p.querySelector('.rp-hoje');if(rl&&rl.parentNode!==hj)hj.appendChild(rl);
 var dj=document.getElementById('qa-d-dj'),cr=p.querySelector('.rp-cron');if(dj){dj.classList.remove('dj-sem');if(dj.parentNode!==cr)cr.appendChild(dj);if(!dj.open)dj.open=true;}
 var n=rl?rl.querySelectorAll(':scope > *:not(.rdvz):not(.empty)').length:0,vb=rod.querySelector('.br-ver'),vt=n?'registros ('+n+')':'registros';if(vb&&vb.textContent!==vt)vb.textContent=vt;
 Array.prototype.forEach.call(rod.querySelectorAll('[data-brg],[data-brver]'),function(b){var k=b.dataset.brg||'reg',on=!p.hidden&&ROD_PAN===k;b.classList.toggle('rp-on',on);b.setAttribute('aria-expanded',String(on));});}
function rodPanConteudo(k){var p=document.getElementById('rod-pan');if(!p)return;var foco=document.activeElement;if(foco&&p.contains(foco)&&foco.tagName==='INPUT')return;
 var MS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
 if(k==='sem'){var RS=revSemana(),R=(wsD().rev||{})[RS.k]||{};p.querySelector('.rp-k').textContent='review da semana';p.querySelector('.rp-t').textContent=RS.rot;
  p.querySelector('.rp-sem').innerHTML=[['ok','funcionou','o que deu certo'],['trava','travou','o que emperrou'],['ajuste','ajustar','o que muda na próxima']].map(function(x){return '<label><small>'+x[1]+'</small><input data-rprev="'+x[0]+'" maxlength="140" placeholder="'+x[2]+'" value="'+esc(R[x[0]]||'')+'"></label>';}).join('');}
 if(k==='mes'){var W=wsD(),m=wsSemanas().mes,v=W.mes[m]||{},P=null;try{P=(typeof tbMesPlano==='function'&&window.AX&&AX.ok)?tbMesPlano():null;}catch(e){}
  var vf=(P&&P.m.foco)||(v.foco||'').split('\n')[0],vm=(P&&P.m.metas)||(v.metas||'').split('\n').filter(Boolean).join(' · '),nm=MS[+m.slice(5)-1];
  p.querySelector('.rp-k').textContent='o mês';p.querySelector('.rp-t').textContent=nm.charAt(0).toUpperCase()+nm.slice(1);
  p.querySelector('.rp-mes').innerHTML='<label><small>foco</small><input data-rpmes="foco" maxlength="120" placeholder="uma intenção para o mês" value="'+esc(vf)+'"></label><label><small>metas</small><input data-rpmes="metas" maxlength="160" placeholder="o que quero concluir" value="'+esc(vm)+'"></label><p class="rp-n">Fica gravado junto com o plano do mês da Bolsa de Dracmas.</p>';}
 if(k==='reg'){p.querySelector('.rp-k').textContent='diário de bordo';p.querySelector('.rp-t').textContent=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'short'});}}
function rodPanAbre(k){var p=document.getElementById('rod-pan');if(!p){rodPanPoe();p=document.getElementById('rod-pan');}if(!p)return;
 if(k==null||(!p.hidden&&ROD_PAN===k)){p.hidden=true;ROD_PAN='';rodPanPoe();return;}
 ROD_PAN=k;p.dataset.modo=k;p.hidden=false;rodPanConteudo(k);rodPanPoe();var i=k!=='reg'&&p.querySelector('.rp-'+k+' input');if(i)setTimeout(function(){try{i.focus({preventScroll:true});}catch(z){}},60);}
window.addEventListener('click',function(e){if(!e.target.closest)return;var g=e.target.closest('#hero-box .bn-rod [data-brg],#hero-box .bn-rod [data-brver]');
 if(g){e.preventDefault();e.stopPropagation();rodPanAbre(g.dataset.brg||'reg');return;}
 if(e.target.closest('#rod-pan [data-rpx]')){e.preventDefault();e.stopPropagation();rodPanAbre(null);return;}
 var p=document.getElementById('rod-pan');if(p&&!p.hidden&&!e.target.closest('#rod-pan')&&!e.target.closest('#hero-box .bn-rod'))rodPanAbre(null);},true);
document.addEventListener('keydown',function(e){var p=document.getElementById('rod-pan');if(e.key==='Escape'&&p&&!p.hidden)rodPanAbre(null);});
(function(){var b0=bnRod;bnRod=function(){var r=b0.apply(this,arguments);try{rodPanPoe();}catch(e){}return r;};var q0=qaOrganiza;qaOrganiza=function(){var r=q0.apply(this,arguments);try{rodPanPoe();}catch(e){}return r;};})();
setTimeout(function(){try{rodRearruma();}catch(e){}},1700);
(function(){var st=document.createElement('style');st.id='rod-pan-css';
 var P=TV_ON?{k:'#3a2414',bg:'#f4ead2',tx:'#3a2414',ac:'#203936',fd:'rgba(255,250,235,.7)'}:EG_ON?{k:'#1e3a6e',bg:'#f6efd9',tx:'#1e3a6e',ac:'#1e3a6e',fd:'rgba(255,250,235,.7)'}:{k:'#8a5a14',bg:'#fbf3df',tx:'#5a3a10',ac:'#8a5a14',fd:'rgba(255,248,225,.75)'};
 var R='html body:not(.zz9):not(.zz8) #hero-box#hero-box',RP=R+' #rod-pan';
 st.textContent=[
 /* Em andamento no lugar do folheto do Guia do Campista (o Guia foi para a Ficha do Campista) */
 R+' .vx-hero.bn2 .bn-id>.cp-guia{display:none!important}',
 'html body.tela-prog #hero-box #orb-mural{display:none!important}',
 R+' .vx-hero.bn2 #orb-mural{position:relative;z-index:3;display:block;width:286px;box-sizing:border-box;margin:0 0 10px;padding:8px 26px 10px 14px;border:1px solid #b89c72;border-radius:2px;color:#3b2a1d;transform:rotate(-1.6deg);transition:transform .2s,box-shadow .2s;'+
  'background:linear-gradient(90deg,transparent 33%,rgba(90,63,44,.13) 33.3%,transparent 34%,transparent 66%,rgba(90,63,44,.13) 66.3%,transparent 67%),linear-gradient(180deg,#fbf3df,#efe1c0);box-shadow:2px 3px 0 #d9c7a3,3px 6px 14px rgba(60,40,20,.22)}',
 R+' .vx-hero.bn2 #orb-mural:focus-within,'+R+' .vx-hero.bn2 #orb-mural:hover{transform:rotate(0deg) translateY(-2px);box-shadow:2px 3px 0 #d9c7a3,4px 10px 20px rgba(60,40,20,.28)}',
 R+' .vx-hero.bn2 #orb-mural::after{content:"";position:absolute;top:-1px;right:-1px;width:16px;height:16px;background:linear-gradient(225deg,#efe6d2 50%,#d9c7a3 50%);border-left:1px solid #b89c72;border-bottom:1px solid #b89c72;border-radius:0 0 0 2px}',
 R+' #orb-mural>.om-k{display:block;margin:0 0 6px;font:700 8.5px var(--mono,monospace);letter-spacing:.2em;text-transform:uppercase;color:#9a6b3a}',
 R+' #orb-mural #orbp{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:4px 6px!important;margin:0!important;padding:0!important;border:0!important;background:none!important}',
 R+' #orb-mural #orbp .ob{display:flex!important;flex-direction:column;min-width:0;padding:0 0 2px!important;margin:0!important;border:0!important;border-bottom:1px dashed rgba(90,63,44,.35)!important;border-radius:0!important;background:none!important;box-shadow:none!important;height:auto!important;min-height:0!important}',
 R+' #orb-mural #orbp .ob .k8{font:600 6.5px var(--mono,monospace)!important;letter-spacing:.12em!important;text-transform:uppercase;color:#9a6b3a!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0!important}',
 R+' #orb-mural #orbp .ob input{all:unset;width:100%;font:600 12px Georgia,serif;color:#3b2a1d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 R+'>.bn-rod>.br-orb{display:none!important}',
 /* botões da base acesos quando o painel deles está aberto */
 R+'>.bn-rod .br-gav button.rp-on,'+R+'>.bn-rod .br-ver.rp-on{background:'+P.ac+'!important;border-color:'+P.ac+'!important}',
 R+'>.bn-rod .br-gav button.rp-on i,'+R+'>.bn-rod .br-gav button.rp-on b,'+R+'>.bn-rod .br-ver.rp-on{color:#fbf5e6!important;opacity:1}',
 R+'>.bn-rod .br-gav button:not(.rp-on){background:'+P.fd+'!important}'+R+'>.bn-rod .br-gav button:not(.rp-on) i,'+R+'>.bn-rod .br-gav button:not(.rp-on) b{color:'+P.tx+'!important}',
 R+'>.bn-rod .regdia .rdl{display:none!important}',
 /* o painel que abre acima da base */
 RP+'{position:absolute;left:0;right:0;bottom:calc(100% + 10px);z-index:60;box-sizing:border-box;max-height:400px;overflow:auto;padding:10px 14px 12px;background:'+P.bg+';border:1.5px solid '+P.k+';box-shadow:0 0 0 2px '+P.bg+',0 0 0 3px '+P.k+'66,0 -10px 26px -10px rgba(40,25,10,.5);color:'+P.tx+';scrollbar-width:thin;text-align:left}',
 RP+'[hidden]{display:none!important}',
 R+'>.bn-rod.bn-rod:has(>#rod-pan:not([hidden])){z-index:90!important}',
 RP+'>header{display:flex;align-items:baseline;gap:10px;margin:0 0 8px;padding-bottom:6px;border-bottom:1px solid '+P.k+'55}',
 RP+'>header .rp-k{font:700 8.5px var(--mono,monospace);letter-spacing:.22em;text-transform:uppercase;opacity:.8}',
 RP+'>header .rp-t{flex:1;font:700 15px Georgia,serif}',
 RP+'>header .rp-x{all:unset;width:24px;height:24px;display:grid;place-items:center;border:1px solid '+P.k+';border-radius:50%;font:16px/1 Georgia,serif;cursor:pointer;color:'+P.k+'}',
 RP+'>header .rp-x:hover{background:'+P.k+';color:#fbf5e6}',
 RP+'>.rp-c{display:none}',
 RP+'[data-modo=sem]>.rp-sem,'+RP+'[data-modo=mes]>.rp-mes{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}',
 RP+'[data-modo=reg]>.rp-reg{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:14px}',
 RP+' label{display:flex;flex-direction:column;gap:3px;margin:0}',
 RP+' label small{font:700 8px var(--mono,monospace);letter-spacing:.16em;text-transform:uppercase;opacity:.75}',
 RP+' label input{all:unset;box-sizing:border-box;width:100%;height:32px;padding:0 9px;border:1px solid '+P.k+'88;border-radius:3px;background:'+P.fd+';font:13px Georgia,serif;color:'+P.tx+'}',
 RP+' label input:focus{border-color:'+P.k+';box-shadow:0 0 0 2px '+P.k+'33}',
 RP+' .rp-n{grid-column:1/-1;margin:0;font-size:11px;opacity:.7}',
 RP+' h5{margin:0 0 6px;font:700 8px var(--mono,monospace);letter-spacing:.18em;text-transform:uppercase;opacity:.8}',
 RP+' .rp-hoje #rd-l{display:flex!important;max-height:300px;overflow:auto;position:static!important;border:1px solid '+P.k+'44;background:transparent}',
 RP+' .rp-cron #qa-d-dj{margin:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}',
 RP+' .rp-cron #qa-d-dj>summary{display:none!important}',
 RP+' .rp-cron #qa-d-dj>.qa-sb{display:block!important;position:static!important;width:auto!important;max-width:none!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}',
 RP+' .rp-cron #qa-d-dj>.qa-sb::before{display:none!important}',
 RP+' .rp-cron #dj-t{width:100%!important;box-sizing:border-box;min-height:54px}'
 ].join('\n');document.head.appendChild(st);})();
/* elementos encostados viram uma pílula só, em todos os temas */
function pilulasJuntas(){var cab=document.querySelector('.wrap > div.rt > .cab'),h=document.getElementById('h-rast');
 if(cab&&h){var c=getComputedStyle(h),v=c.backgroundColor+'|'+c.borderTopColor+'|'+c.color;if(cab._pv!==v){cab._pv=v;cab.style.setProperty('--pj-bg',c.backgroundColor);cab.style.setProperty('--pj-bd',c.borderTopColor);cab.style.setProperty('--pj-tx',c.color);}}
 var rod=document.querySelector('#hero-box > .bn-rod'),bt=rod&&rod.querySelector('.br-gav button:not(.rp-on)');
 if(rod&&bt){var c2=getComputedStyle(bt),v2=c2.borderTopColor;if(rod._pv!==v2){rod._pv=v2;rod.style.setProperty('--pj-bd',c2.borderTopColor);}}}
setTimeout(function(){try{pilulasJuntas();}catch(e){}},1500);setInterval(function(){try{pilulasJuntas();}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='pilulas-juntas-css';
 var C='html body:not(.zz9):not(.zz8) .wrap>div.rt>.cab',B='html body:not(.zz9):not(.zz8) #hero-box#hero-box>.bn-rod';
 st.textContent=[
 /* Templo II: Rastreio · ‹ › · mês */
 C+'{column-gap:0!important}',
 C+'>#h-rast{margin:0!important;border-radius:999px 0 0 999px!important;border-right:0!important;box-shadow:none!important;height:32px!important;box-sizing:border-box!important;align-items:center}',
 C+'>.nav{display:flex!important;gap:0!important;margin:0!important;align-self:center}',
 C+'>.nav>button{margin:0!important;height:32px!important;box-sizing:border-box!important;border-radius:0!important;border:1px solid var(--pj-bd)!important;border-right:0!important;background:var(--pj-bg)!important;color:var(--pj-tx)!important;box-shadow:none!important}',
 C+'>#rt-mes{display:flex!important;align-items:center;height:32px;box-sizing:border-box;margin:0!important;padding:0 16px 0 12px!important;border:1px solid var(--pj-bd)!important;border-radius:0 999px 999px 0!important;background:var(--pj-bg)!important;align-self:center;white-space:nowrap}',
 /* Templo II: novo hábito · incluir hábito */
 C.replace('>.cab','>.rt-novo')+'{gap:0!important;column-gap:0!important}',
 C.replace('>.cab','>.rt-novo')+'>input{margin:0!important;border-radius:999px 0 0 999px!important;border-right:0!important;box-shadow:none!important}',
 C.replace('>.cab','>.rt-novo')+'>button{margin:0!important;border-radius:0 999px 999px 0!important;box-shadow:none!important}',
 /* base: Semana · Mês */
 B+' .br-gav{gap:0!important}',
 B+' .br-gav>button{margin:0!important;border-radius:0!important;box-shadow:none!important}',
 B+' .br-gav>button:first-child{border-radius:999px 0 0 999px!important;padding-left:14px!important}',
 B+' .br-gav>button:last-child{border-radius:0 999px 999px 0!important;border-left:0!important;padding-right:14px!important}',
 /* base: diário · Registrar · registros */
 B+' .br-db{gap:6px!important}',
 B+' .br-db .br-slot{margin:0!important}',
 B+' .br-db .regdia .rdent{gap:0!important}',
 B+' .br-db .regdia .rdent>input{border-radius:999px 0 0 999px!important;border-right:0!important;margin:0!important;box-shadow:none!important;border-color:var(--pj-bd)!important}',
 B+' .br-db .regdia .rdent>button{border-radius:0!important;margin:0!important;height:30px!important;box-shadow:none!important;border:1px solid var(--pj-bd)!important}',
 B+' .br-db>.br-ver{margin-left:-6px!important;border-radius:0 999px 999px 0!important;border-left:0!important;box-shadow:none!important;border-color:var(--pj-bd)!important}'
 ].join('\n');document.head.appendChild(st);})();
/* um painel só para o Toque: sai a gaveta lateral (toques · hoje · compromissos); o cartão Agora abre o Hoje que expande dentro do templo */
cgAbre=function(on){var g=document.getElementById('cg-gav');if(g)g.classList.remove('on');document.body.classList.remove('cg-on');if(on===false)return;
 HOJE_ABERTO=true;try{localStorage.setItem('astro_hoje_pan','1');}catch(z){}try{hojePinta();}catch(z){}try{hojeSobe();}catch(z){}
 var fz=document.getElementById('tp-friso');if(fz)try{fz.scrollIntoView({behavior:'smooth',block:'center'});}catch(z){}};
/* "ajustar" abre o editor dos toques onde ele cabe na tela (antes abria embaixo do rodapé e parecia não funcionar) */
(function(){var c0=concha;concha=function(on){var r=c0.apply(this,arguments);try{if(on&&TP_FRISO){var q=TP_FRISO.getBoundingClientRect(),H=Math.min(460,innerHeight-160),top=q.bottom+6;
 if(top+H>innerHeight-90)top=Math.max(70,q.top-H-6);document.body.style.setProperty('--concha-top',Math.round(top)+'px');}}catch(e){}return r;};})();
/* a faixa de compromissos não sobrescreve mais o painel Hoje (as duas disputavam a mesma caixa) */
(function(){var t0=tpFriso;tpFriso=function(){var hj=document.querySelector('#tp-friso-bloco .cb-hoje');if(hj){try{hj._h=compRodHTML();}catch(e){}}
 var r=t0.apply(this,arguments);hj=document.querySelector('#tp-friso-bloco .cb-hoje');
 if(hj&&HOJE_ABERTO&&!hj.querySelector('.hj-dia')){hj._hj='';try{hojePinta();}catch(e){}}return r;};})();
(function(){var st=document.createElement('style');st.id='toque-um-painel-css';st.textContent=[
 '#cg-gav{display:none!important}',
 'html body.concha-aberta #tp-real #tm-r1{max-height:min(460px,calc(100vh - 160px))!important}'
 ].join('\n');document.head.appendChild(st);})();

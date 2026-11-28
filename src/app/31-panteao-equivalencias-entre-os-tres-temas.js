/* ======================= Panteão · equivalências entre os três temas ======================= */
var PANTEAO=[["Personagens próprios do app", [["Você (banner)", "Chase Maverick Duke · o Hékatos", "Chase Maverick Duke · Sanngetall, filho de Odin", "Chase Maverick Duke · mago do caminho de Thoth", "nível, XP e ficha"], ["Guardião", "Sully Brookhaven · sátiro protetor, Aquário", "Brynn Halvorsen · valquíria recrutadora, Sagitário", "Toby Nefer · babuíno escriba, Libra", "ritos e designações"], ["Mensageiro", "Polly McCaw · corvo de Apolo (Cass fica no ninho)", "Hugin · corvo de Odin (Munin fica com Odin)", "Benh · Bennu de Aten (chega em brasa nas más notícias)", "avisos, entregas e más notícias"]]], ["Patronos e guias", [["Patrono", "Apolo", "Odin", "Thoth", "pai divino · arsenal e campo de tiro"], ["Diretor", "Quíron", "Helgi", "Amós", "Casa Grande"], ["Conselho", "Conselheiro-Chefe", "Thane-Chefe", "Sacerdote-Leitor Chefe", "designações do gabinete"], ["Oráculo", "Oráculo", "Nornas", "Livro de Thoth", "missões"], ["Ronda da noite", "Harpias", "Valquírias", "Shabtis", "recolher"]]], ["Painéis e objetos", [["Laptop / Bússola", "Dédalo", "Blitzen", "Ptah", "painel de estudos"], ["Retomar", "Fio de Ariadne", "Novelo de Frigg", "Nó de Ísis", "de onde você parou"], ["Captura", "Píthos de Pandora", "Poço de Mímir", "Vaso canópico", "caixa de entrada"], ["Anotações", "Tabuinhas de Cadmo", "Tábuas rúnicas de Hearthstone", "Papiros de Thoth", "notas"], ["Hábitos", "Tear de Penélope", "Tear de Frigg", "Tear de Neith", "rastreados"], ["Disco de foco", "Escudo de Aquiles", "Escudo de Odin", "Olho de Hórus", "foco"], ["Integrações", "Hermes Express · George e Martha", "Correio dos Corvos · Hugin e Munin", "Correio de Thoth · najas de Uadjet", "apps ligados"], ["Notícias", "Hefesto TV", "Rádio Bifröst", "Rádio de Ptah", "leituras"], ["Clima", "Céu de Zeus", "Céu de Thor", "Céu de Nut", "tempo"], ["Relógio-escudo", "Tyson", "Blitzen", "Bes (amuleto)", "arsenal"], ["Moeda", "Dracmas", "Marcos de ouro", "Debens de ouro", "loja e prêmios"], ["Bolsa", "Bolsa de Dracmas", "Tesouro de Andvari", "Tesouro do Faraó", "finanças"], ["Calçado", "Tênis alados", "Botas de Víðarr", "Sandálias de Hórus", "trajeto"]]], ["Lugares e rotina", [["Casa", "Acampamento Meio-Sangue", "Hotel Valhala", "Casa do Brooklyn", "o app"], ["Seu lugar", "Chalé 7", "Andar 19", "Nomo 21", "quarto / aposento"], ["Sede", "Casa Grande", "Saguão", "Grande Salão", ""], ["Refeições", "Pavilhão / Refeitório", "Salão do Banquete", "Terraço", ""], ["Fim do dia", "Fogueira", "Banquete", "Braseiro", "fechar o dia"], ["Toque", "Concha", "Gjallarhorn", "Sistro", "avisos de hora"], ["Amanhecer", "Alvorada", "Despertar", "Nascer de Rá", "06h"], ["Ampulheta", "Clepsidra", "Ampulheta de Sól", "Relógio de água de Karnak", "o dia escoando"], ["Oficina", "Bunker 9", "Forja de Nidavellir", "Oficina de Ptah", "projetos"], ["Desafio do dia", "Captura da bandeira", "Combate do dia", "Duelo do dia", "vitórias"], ["Navio (operacional)", "Argo", "Drakkar", "Barca de Rá", "modo operacional"]]], ["Monstros e provas", [["Fim de expediente", "Procusto", "Procusto", "Procusto", "diálogo das 19h"], ["Enigmas", "Esfinge", "Fenrir", "Esfinge", "estudos"], ["Metas longas", "Trabalhos de Hércules", "Façanhas de Thor", "Provas de Hórus", ""], ["1ª prova", "Hidra de Lerna", "Jörmungandr", "Apófis", ""], ["2ª prova", "Leão de Nemeia", "Lobo Fenrir", "Leoa Sekhmet", ""], ["3ª prova", "Javali de Erimanto", "Javali Sæhrímnir", "Crocodilo de Sobek", ""], ["4ª prova", "Corça de Cerineia", "Cervo Eikthyrnir", "Íbis de Thoth", ""], ["5ª prova", "Aves do Estínfalo", "Águias de Hræsvelgr", "Demônios-pássaro do Duat", ""], ["6ª prova", "Estábulos de Áugias", "Salões de Útgarda", "Salões do Duat", ""]]], ["Arsenal", [["Arma", "Xíphos de bronze", "Espada de ferro", "Khopesh de bronze", ""], ["Escudo", "Aspís de madeira e bronze", "Escudo redondo de tília", "Escudo de couro de hipopótamo", ""], ["Elmo", "Elmo calcídico", "Elmo de ferro", "Coroa azul (khepresh)", ""], ["Couraça", "Linotórax", "Cota de malha", "Couraça de linho", ""], ["Instrumento", "Lira de casco de tartaruga", "Harpa de Bragi", "Harpa do templo", ""]]]];
function panteaoAbre(){var at=TV_ON?2:(typeof EG_ON!=='undefined'&&EG_ON)?3:1,ex=function(x){return String(x).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});};
 var h='<div class="pt-box" role="dialog" aria-label="Panteão · equivalências entre temas"><button type="button" class="pt-x" aria-label="fechar">×</button>'+
  '<span class="pt-k">panteão · o mesmo app em três mitologias</span><h2>Equivalências entre temas</h2>'+
  '<input class="pt-busca" type="search" placeholder="buscar personagem, lugar ou objeto…" aria-label="buscar">'+
  '<div class="pt-tab"><table><thead><tr><th>Papel</th>'+[['acampamento','Acampamento Meio-Sangue'],['valhala','Hotel Valhala'],['egito','Casa do Brooklyn']].map(function(t,i){return '<th class="pt-c'+(i+1)+(at===i+1?' pt-at':'')+'"><button type="button" data-pt="'+t[0]+'" title="'+(at===i+1?'tema atual':'mudar para este tema')+'">'+t[1]+(at===i+1?' · atual':'')+'</button></th>';}).join('')+'<th>No app</th></tr></thead>';
 PANTEAO.forEach(function(g){h+='<tbody><tr class="pt-g"><td colspan="5">'+ex(g[0])+'</td></tr>'+g[1].map(function(r){return '<tr class="pt-r"><th>'+ex(r[0])+'</th>'+[1,2,3].map(function(i){return '<td class="pt-c'+i+(at===i?' pt-at':'')+'">'+ex(r[i])+'</td>';}).join('')+'<td class="pt-o">'+ex(r[4])+'</td></tr>';}).join('')+'</tbody>';});
 h+='</table></div></div>';
 var w=document.getElementById('panteao');if(!w){w=document.createElement('div');w.id='panteao';w.setAttribute('data-notr','');w.setAttribute('translate','no');document.body.appendChild(w);
  w.addEventListener('click',function(e){if(e.target===w||e.target.closest('.pt-x')){w.classList.remove('on');return;}var b=e.target.closest('[data-pt]');if(b){try{localStorage.setItem('astro_tema',b.dataset.pt);}catch(z){}location.reload();}});
  w.addEventListener('input',function(e){if(!e.target.classList.contains('pt-busca'))return;var q=e.target.value.trim().toLowerCase();
   [].forEach.call(w.querySelectorAll('tbody'),function(tb){var n=0;[].forEach.call(tb.querySelectorAll('.pt-r'),function(r){var ok=!q||r.textContent.toLowerCase().indexOf(q)>=0;r.hidden=!ok;if(ok)n++;});tb.hidden=!n;});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')w.classList.remove('on');});}
 w.innerHTML=h;w.classList.add('on');w.querySelector('.pt-busca').focus();}
function panteaoBotao(){var r=document.querySelector('#lat-topo>.lt-r2');if(!r)return;var b=document.getElementById('pt-tg');
 if(!b){b=document.createElement('button');b.type='button';b.id='pt-tg';b.title='Panteão · equivalências entre os temas';b.setAttribute('aria-label',b.title);
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>';b.addEventListener('click',panteaoAbre);}
 var tv=document.getElementById('tv-tg');if(tv&&tv.parentNode===r){if(tv.nextElementSibling!==b)tv.insertAdjacentElement('afterend',b);}else if(b.parentNode!==r)r.appendChild(b);}
setInterval(function(){try{panteaoBotao();}catch(e){}},1500);setTimeout(function(){try{panteaoBotao();}catch(e){}},900);
(function(){var st=document.createElement('style');st.id='panteao-css';st.textContent=[
 '#lat-topo>.lt-r2>#pt-tg{order:101;flex:none;display:grid!important;place-items:center;width:26px!important;height:24px;margin:0!important;padding:0!important;border:1px solid #5a3f2c!important;border-radius:999px!important;background:#f4ead2!important;color:#5a3f2c!important;cursor:pointer}',
 '#lat-topo>.lt-r2>#pt-tg svg{width:14px;height:14px}',
 '#panteao{position:fixed;inset:0;z-index:400;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(30,20,10,.55)}#panteao.on{display:flex}',
 '#panteao .pt-box{position:relative;display:flex;flex-direction:column;gap:8px;width:min(1100px,100%);max-height:92vh;padding:22px 24px 18px;border:2px solid #5a3f2c;border-radius:14px;background:#f6eedb;box-shadow:0 0 0 4px #f6eedb,0 0 0 5.5px #c9a45a,0 24px 60px rgba(20,10,0,.45);color:#2a2418}',
 '#panteao .pt-x{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;border:1.5px solid #5a3f2c;background:#fbf3df;color:#5a3f2c;font:700 18px/1 system-ui,sans-serif;cursor:pointer}',
 '#panteao .pt-k{font:700 9px var(--mono,monospace);letter-spacing:.22em;text-transform:uppercase;color:#9a6b3a}',
 '#panteao h2{margin:0;font:400 28px Georgia,serif;font-variant:small-caps;letter-spacing:.04em}',
 '#panteao .pt-busca{max-width:380px;border:1px solid #c9b28a;border-radius:999px;background:#fffdf7;padding:7px 14px;font:14px system-ui,sans-serif}',
 '#panteao .pt-tab{overflow:auto;border:1px solid #d8c8a6;border-radius:10px;background:#fffdf7}',
 '#panteao table{width:100%;border-collapse:collapse;font:14px/1.35 Georgia,serif}',
 '#panteao thead th{position:sticky;top:0;z-index:1;padding:0;background:#efe3c6;border-bottom:2px solid #5a3f2c;text-align:left}',
 '#panteao thead th:first-child,#panteao thead th:last-child{padding:10px 12px;font:700 10px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#5a3f2c}',
 '#panteao thead button{display:block;width:100%;padding:10px 12px;border:0;background:transparent;text-align:left;font:700 13px Georgia,serif;cursor:pointer;color:inherit}',
 '#panteao thead .pt-c1 button{color:#8a5a1e}#panteao thead .pt-c2 button{color:#1f4a3c}#panteao thead .pt-c3 button{color:#1e3a6e}',
 '#panteao thead button:hover{text-decoration:underline}',
 '#panteao .pt-c1.pt-at{background:#fbefd6}#panteao .pt-c2.pt-at{background:#e8f1ec}#panteao .pt-c3.pt-at{background:#e6ecf7}',
 '#panteao thead .pt-c1.pt-at{box-shadow:inset 0 -3px 0 #c9a45a}#panteao thead .pt-c2.pt-at{box-shadow:inset 0 -3px 0 #1f4a3c}#panteao thead .pt-c3.pt-at{box-shadow:inset 0 -3px 0 #1e3a6e}',
 '#panteao .pt-g td{padding:12px 12px 4px;font:700 10px var(--mono,monospace);letter-spacing:.18em;text-transform:uppercase;color:#9a6b3a;background:#fffdf7}',
 '#panteao .pt-r>*{padding:6px 12px;border-bottom:1px solid #eee2c8;vertical-align:top}',
 '#panteao .pt-r>th{font:600 12px system-ui,sans-serif;color:#5a3f2c;white-space:nowrap}',
 '#panteao .pt-o{font:italic 12px Georgia,serif;color:#8a6f55}',
 '#panteao .pt-r:hover>*{background:#f7eedb}',
 '@media(max-width:760px){#panteao{padding:6px}#panteao .pt-box{padding:16px 12px 12px;max-height:96vh}#panteao .pt-o,#panteao thead th:last-child{display:none}#panteao table{font-size:13px}}'
].join('\n');document.head.appendChild(st);})();

/* Panteão: antagonistas do bloco pesado nos três temas; atalho no menu de temas */
(function(){if(typeof PANTEAO==='undefined')return;var R=[['pendências que se multiplicam','Hidra de Lerna','Draugar','Enxame de escaravelhos'],['travar diante da tarefa','Medusa','Mara','Ammit, a Devoradora'],['o processo longo e confuso','Minotauro','Níðhöggr','Demônios do Duat'],['a tarefa difícil sem atalho','Leão de Nemeia','Fenrir','Petsuchos'],['notificações e feed infinito','Sereias','Nøkken','Bau'],['a tentação de abrir rede social','Empousa','Huldra','Serpopardo'],['sistema travando','Telquines','Kobolds','Shabtis rebeldes'],['três problemas misturados','Quimera','Lindworm','Tjesu heru'],['teimar num caminho que não rende','Ciclope','Gigante de gelo','Grifo teimoso'],['cabeça embaçada','Névoa','Névoa de Niflheim','Tempestade de areia'],['o bloco que estica','Procusto','Sköll','Lâmina Ensanguentada'],['hiperfoco que come as horas','Lotófagos','Elfos do monte','Lótus do Nilo'],['bagunça que rouba a atenção','Harpias','Ratatoskr','Praga de gafanhotos'],['questões e enigmas','Esfinge','Vafþrúðnir','Esfinge de Gizé'],['redemoinho do e-mail','Caríbdis','Kraken','Hipopótamo do brejo'],['o dragão da recompensa','Ládon','Fáfnir','Uraeus de fogo'],['três frentes ao mesmo tempo','Gerião','Troll de três cabeças','Escorpião gigante'],['desvios, um pedaço de cada vez','Cila','Jörmungandr','Apófis']];
 PANTEAO.push(['Antagonistas do bloco pesado (no mar do modo operacional)',R.map(function(r){return [r[0],r[1],r[2],r[3],'sorteado a cada dia'];})]);})();
(function(){var t0=tmMenu;tmMenu=function(btn){t0(btn);var m=document.getElementById('tm-menu');if(!m||m.hidden||typeof panteaoAbre!=='function'||m.querySelector('[data-tm="panteao"]'))return;
 var f=m.querySelector('.tm-ficha');if(f)f.insertAdjacentHTML('beforebegin','<button type="button" class="tm-ficha" data-tm="panteao">Panteão · equivalências</button>');};
 document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tm-menu [data-tm="panteao"]');if(!b)return;e.stopImmediatePropagation();document.getElementById('tm-menu').hidden=true;try{panteaoAbre();}catch(z){}},true);})();

/* Panteão: ocupa a tela toda, linhas compactas, contador e aviso de rolagem */
(function(){var st=document.createElement('style');st.id='panteao-cheio-css';st.textContent=[
 '#panteao{padding:8px!important}',
 '#panteao .pt-box{width:min(1240px,100%)!important;height:calc(100vh - 16px)!important;max-height:none!important;padding:16px 20px 12px!important;gap:6px!important}',
 '#panteao h2{font-size:22px!important}',
 '#panteao .pt-tab{flex:1;min-height:0}',
 '#panteao .pt-r>*{padding:3px 12px!important}',
 '#panteao .pt-g td{padding:8px 12px 2px!important;position:sticky;top:38px;z-index:1}',
 '#panteao table{font-size:13.5px!important}',
 '#panteao .pt-conta{font:600 10px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#8a6f55}'
].join('\n');document.head.appendChild(st);
 setInterval(function(){var w=document.getElementById('panteao');if(!w||!w.classList.contains('on'))return;var b=w.querySelector('.pt-busca');if(!b)return;var c=w.querySelector('.pt-conta');if(!c){c=document.createElement('span');c.className='pt-conta';b.insertAdjacentElement('afterend',c);}
  var n=w.querySelectorAll('.pt-r:not([hidden])').length,t=w.querySelectorAll('.pt-r').length,x=(n===t?t+' equivalências · role a tabela para ver todas':n+' de '+t+' equivalências');if(c.textContent!==x)c.textContent=x;},300);})();

/* Apps: no modo operacional o botão sai do casco e vai para o mar */
function mtApps(){var b=document.getElementById('rod-bar'),e=document.getElementById('mt-enc'),top=document.querySelector('#rod-apps .rod-top');if(!b)return;
 if(document.body.classList.contains('op-on')&&e){if(b.parentNode!==e)e.insertBefore(b,e.firstChild);}
 else if(top&&b.parentNode!==top){var reg=document.getElementById('rod-reg');if(reg&&reg.parentNode===top)reg.insertAdjacentElement('afterend',b);else top.appendChild(b);}}
setInterval(function(){try{mtApps();}catch(e){}},800);
/* Guardião: retrato redondo e balões de fala no lugar da faixa */
satOpTop=function(){var F=satFala(),nv=satNivel(satCfg().xp),nm=(COMP_T&&COMP_T.nm?COMP_T.nm.replace(/\s*"[^"]*"\s*/,' '):'Sully Brookhaven').split(' ')[0];
 var fr=String(F.t).split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9])/).filter(Boolean),bal=[];
 if(fr.length){bal.push(fr[0]);if(fr.length>1)bal.push(fr.slice(1,3).join(' '));if(fr.length>3)bal.push(fr.slice(3).join(' '));}
 return '<button type="button" class="op-sat op-sat2 sat-'+F.h+'" data-satir="1" title="'+esc(F.t)+'"><span class="sat-circ">'+satAvatar(F.h)+'<span class="sat-tag">'+esc(nm)+' · nv '+nv.n+'</span></span>'+
  '<span class="sat-bals">'+bal.map(function(t,i){return '<span class="bl-w"><span class="bl" style="--i:'+i+'"><i>'+esc(t)+'</i></span></span>';}).join('')+'</span></button>';};

/* ===== Registro rápido: Píthos (captura), Tabuinhas (notas) e Fio (retomadas) num cartão com abas ===== */
var TRIO_NM=TV_ON?[['p','Mímir','Poço de Mímir · captura','captura'],['n','Runas','Tábuas rúnicas · notas','notas'],['f','Novelo','Novelo de Frigg · retomadas','retomadas']]:EG_ON?[['p','Vaso','Vaso canópico · captura','captura'],['n','Papiros','Papiros de Thoth · notas','notas'],['f','Nó de Ísis','Nó de Ísis · retomadas','retomadas']]:[['p','Píthos','Píthos de Pandora · captura','captura'],['n','Tabuinhas','Tabuinhas de Cadmo · notas','notas'],['f','Fio','Fio de Ariadne · retomadas','retomadas']];
var TRIO_TAB=(function(){try{return localStorage.getItem('astro_trio')||'p';}catch(e){return 'p';}})();
function trioCard(){var e=document.getElementById('lat-e');if(!e)return null;var c=document.getElementById('lat-trio');
 if(!c){c=document.createElement('section');c.id='lat-trio';c.className='lat-trio';
  c.innerHTML='<div class="tr-cab"><span class="tr-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></span><div><small>captura · notas · retomadas</small><b>Registro rápido</b></div></div>'+
   '<div class="tr-tabs" role="tablist">'+TRIO_NM.map(function(t){return '<button type="button" role="tab" data-tr="'+t[0]+'" title="'+t[2]+'"><b data-n="'+t[1]+'"></b><small>'+t[3]+'</small></button>';}).join('')+'</div>'+
   '<div class="tr-p" data-trp="p"></div><div class="tr-p" data-trp="n"></div><div class="tr-p" data-trp="f"></div>';
  c.addEventListener('click',function(ev){var b=ev.target.closest('[data-tr]');if(!b)return;TRIO_TAB=b.dataset.tr;try{localStorage.setItem('astro_trio',TRIO_TAB);}catch(z){}trioAbas();});}
 var db=document.getElementById('lat-db');if(db&&db.parentNode===e){if(db.nextElementSibling!==c)db.insertAdjacentElement('afterend',c);try{var o=getComputedStyle(db).order;if(c.style.order!==o)c.style.order=o;}catch(z){}}else if(c.parentNode!==e)e.appendChild(c);
 return c;}
function trioAbas(){var c=document.getElementById('lat-trio');if(!c)return;[].forEach.call(c.querySelectorAll('[data-tr]'),function(b){var on=b.dataset.tr===TRIO_TAB;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);});
 [].forEach.call(c.querySelectorAll('[data-trp]'),function(p){p.hidden=p.dataset.trp!==TRIO_TAB;});}
function trioPainel(k){var c=trioCard();return c?c.querySelector('[data-trp="'+k+'"]'):null;}
fioNoPainel=function(){var pc=document.getElementById('qa-d-pc'),sl=trioPainel('f');if(!pc||!sl)return;if(pc.parentNode!==sl){var a=document.activeElement;if(a&&pc.contains(a)&&pc.parentNode)return;sl.appendChild(pc);}pc.classList.remove('lat-fio');if(!pc.open)pc.open=true;};
pithosNoDiario=function(){var sl0=trioPainel('p'),ri=document.getElementById('rail-in');if(!sl0||!ri)return;var f=sl0.querySelector(':scope>.db-pithos');
 if(!f){var velho=document.querySelector('#lat-db>.db-pithos');if(velho){f=velho;}else{f=document.createElement('div');f.className='db-pithos';f.innerHTML='<div class="dp-cab"><span class="dp-k">Píthos de Pandora</span><small>o jarro guarda tudo · despeje antes de perder</small><i class="dp-n"></i></div><div class="dp-slot"></div>';}sl0.appendChild(f);}
 var sl=f.querySelector('.dp-slot'),novos=['.rcap','.rlist','.rbt'].map(function(q){return ri.querySelector(':scope>'+q);});
 if(novos.some(function(x){return x;})){sl.innerHTML='';novos.forEach(function(x){if(x)sl.appendChild(x);});var cc=ri.querySelector(':scope>.rcab.cer');if(cc)cc.remove();}
 var n=sl.querySelectorAll('.rlist li:not(.rvz)').length,ni=f.querySelector('.dp-n'),t=n+' na caixa';if(ni&&ni._t!==t){ni.textContent=t;ni._t=t;}
 var tb=document.querySelector('#lat-trio [data-tr="p"] small');if(tb){var tx=n?'captura · '+n:'captura';if(tb.textContent!==tx)tb.textContent=tx;}};
function trioNotas(){var nt=document.getElementById('qa-d-nt'),sl=trioPainel('n');if(!nt||!sl)return;if(nt.parentNode!==sl){var a=document.activeElement;if(a&&nt.contains(a)&&nt.parentNode)return;sl.appendChild(nt);}if(!nt.open)nt.open=true;}
function trioArruma(){try{trioCard();fioNoPainel();pithosNoDiario();trioNotas();trioAbas();}catch(e){}}
setInterval(trioArruma,700);setTimeout(trioArruma,600);
/* ===== Registro rápido · Compras: cola o link, o app traz nome, preço, loja e foto ===== */
TRIO_NM.push(TV_ON?['c','Feira','Feira de Birka · compras','compras']:EG_ON?['c','Mercado','Mercado de Mênfis · compras','compras']:['c','Ágora','Ágora · compras','compras']);
function cpD(){S.compras=S.compras||[];return S.compras;}
function cpBRL(n){return n==null?'':'R$ '+Number(n).toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function cpLimpa(u){try{var x=new URL(u);Array.from(x.searchParams.keys()).forEach(function(k){if(/^(utm_|fbclid|gclid|epik|pp$|ref$|mc_)/i.test(k))x.searchParams.delete(k);});x.hash='';return x.toString();}catch(e){return u;}}
function cpHTML(){var L=cpD(),q=L.filter(function(x){return !x.ok;}),f=L.filter(function(x){return x.ok;}),tot=0,sem=0;q.forEach(function(x){if(x.preco!=null)tot+=x.preco;else sem++;});
 var it=function(x){return '<li class="cp-it'+(x.ok?' ok':'')+(x.lendo?' lendo':'')+'" data-cpid="'+x.id+'">'+(x.img?'<img src="'+esc(x.img)+'" alt="" loading="lazy">':'<i class="cp-sem"></i>')+
  '<div class="cp-tx"><a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">'+esc(x.t||'lendo a página…')+'</a><small>'+esc(x.loja||'')+(x.erro?' · '+esc(x.erro):'')+'</small></div>'+
  '<b class="cp-pr" data-cppreco title="clique para corrigir o preço">'+(x.preco!=null?cpBRL(x.preco):'R$ ?')+'</b>'+
  '<span class="cp-bt"><button type="button" data-cpok title="'+(x.ok?'voltar para a lista':'marcar como comprado')+'">'+(x.ok?'↺':'✓')+'</button><button type="button" data-cpx title="remover">✕</button></span></li>';};
 return '<form class="cp-add" data-cpadd><input name="u" type="url" inputmode="url" placeholder="cole o link do produto" autocomplete="off"><button type="submit">guardar</button></form>'+
  (q.length?'<div class="cp-tot"><span>'+q.length+' na lista</span><b>'+cpBRL(tot)+(sem?' + '+sem+' sem preço':'')+'</b></div><ul class="cp-l">'+q.map(it).join('')+'</ul>':'<p class="cp-vz">Lista vazia. Cole o link de algo que você quer comprar: o nome, o preço e a foto vêm sozinhos.</p>')+
  (f.length?'<details class="cp-f"><summary>comprados · '+f.length+'</summary><ul class="cp-l">'+f.slice(-12).reverse().map(it).join('')+'</ul></details>':'');}
function cpPinta(){var c=trioCard();if(!c)return;var p=c.querySelector('[data-trp="c"]');if(!p){p=document.createElement('div');p.className='tr-p';p.setAttribute('data-trp','c');c.appendChild(p);trioAbas();}
 if(!p._lig){p._lig=1;
  p.addEventListener('submit',function(e){var f=e.target.closest('[data-cpadd]');if(!f)return;e.preventDefault();var u=(f.u.value||'').trim();if(!/^https?:\/\//i.test(u)){f.u.focus();return;}cpNovo(u);f.u.value='';});
  p.addEventListener('click',function(e){var li=e.target.closest('[data-cpid]');if(!li)return;var x=cpD().filter(function(y){return y.id===li.dataset.cpid;})[0];if(!x)return;
   if(e.target.closest('[data-cpx]')){S.compras=cpD().filter(function(y){return y!==x;});cpSalva();return;}
   if(e.target.closest('[data-cpok]')){x.ok=!x.ok;x.dok=x.ok?hoje():null;if(x.ok){try{anota('Comprado: '+(x.t||x.url)+(x.preco!=null?' ('+cpBRL(x.preco)+')':'')+'.',0,false);}catch(z){}}cpSalva();return;}
   if(e.target.closest('[data-cppreco]')){var v=prompt('Preço de "'+(x.t||'item')+'" (em R$):',x.preco!=null?String(x.preco).replace('.',','):'');if(v==null)return;var n=parseFloat(String(v).replace(/\./g,'').replace(',','.'));x.preco=isFinite(n)&&n>0?Math.round(n*100)/100:null;cpSalva();}});}
 var h=cpHTML();if(p._h!==h){var a=document.activeElement,foco=a&&p.contains(a)&&a.name==='u',val=foco?a.value:'';p._h=h;p.innerHTML=h;if(foco){var i=p.querySelector('[name=u]');i.value=val;i.focus();}}
 var tb=c.querySelector('[data-tr="c"] small');if(tb){var n=cpD().filter(function(x){return !x.ok;}).length,tx=n?'compras · '+n:'compras';if(tb.textContent!==tx)tb.textContent=tx;}}
function cpSalva(){try{grava();}catch(e){}cpPinta();}
function cpNovo(u){var x={id:'c'+Date.now().toString(36),url:cpLimpa(u),t:'',img:null,preco:null,loja:'',d:hoje(),ok:false,lendo:1};try{x.loja=new URL(u).hostname.replace(/^www\./,'');}catch(e){}cpD().unshift(x);cpSalva();cpLe(x);}
function cpLe(x){fetch('/api/produto?url='+encodeURIComponent(x.url)).then(function(r){return r.json();}).then(function(d){delete x.lendo;
  if(d&&d.ok){x.t=d.titulo||x.t;x.img=d.img||null;if(d.preco!=null)x.preco=d.preco;x.loja=d.loja||x.loja;if(d.url)x.url=d.url;delete x.erro;}
  else{x.erro=(d&&d.erro)||'sem dados';if(!x.t)x.t=x.url.replace(/^https?:\/\/(www\.)?/,'').slice(0,60);}cpSalva();})
 .catch(function(){delete x.lendo;x.erro='sem conexão';if(!x.t)x.t=x.url.replace(/^https?:\/\/(www\.)?/,'').slice(0,60);cpSalva();});}
setInterval(function(){try{cpPinta();}catch(e){}},1500);setTimeout(function(){try{cpPinta();}catch(e){}},700);
(function(){var st=document.createElement('style');st.id='cp-css';var P='#lat-trio [data-trp="c"]';st.textContent=[
 '#lat-trio .tr-tabs{grid-template-columns:repeat(4,minmax(0,1fr))!important}',
 P+' .cp-add{display:flex;gap:6px;margin:0 0 8px}',
 P+' .cp-add input{flex:1;min-width:0;margin:0!important;padding:6px 9px!important;border:1px solid #c9b28a!important;border-radius:8px!important;background:#fffaf0!important;font:12.5px var(--sans,system-ui)!important;color:#2a2418!important}',
 P+' .cp-add button{flex:none;width:auto!important;margin:0!important;padding:6px 10px!important;border:0!important;border-radius:8px!important;background:#5a3f2c!important;color:#f4ead2!important;font:700 10px var(--mono,monospace)!important;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}',
 P+' .cp-tot{display:flex;justify-content:space-between;align-items:baseline;margin:0 2px 6px;font:700 9px var(--mono,monospace);letter-spacing:.1em;text-transform:uppercase;color:#8a6f55}',
 P+' .cp-tot b{font:700 13px Georgia,serif;letter-spacing:0;text-transform:none;color:#2a2418}',
 P+' .cp-l{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}',
 P+' .cp-it{display:grid;grid-template-columns:44px minmax(0,1fr) auto;grid-template-rows:auto auto;column-gap:8px;align-items:center;padding:6px;border-radius:9px;background:#fffaf0;border:1px solid #e2d4b0}',
 P+' .cp-it>img,'+P+' .cp-it>.cp-sem{grid-row:1/3;width:44px;height:44px;border-radius:6px;object-fit:cover;background:#efe4c8}',
 P+' .cp-tx{min-width:0;display:flex;flex-direction:column;gap:1px}',
 P+' .cp-tx a{font:600 12.5px/1.25 Georgia,serif;color:#2a2418;text-decoration:none;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}',
 P+' .cp-tx a:hover{text-decoration:underline}',
 P+' .cp-tx small{font:600 9.5px var(--mono,monospace);color:#8a6f55;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 P+' .cp-pr{grid-column:3;grid-row:1;font:700 12.5px var(--mono,monospace);color:#2f6f4e;white-space:nowrap;cursor:pointer}',
 P+' .cp-bt{grid-column:2/4;grid-row:2;display:flex;justify-content:flex-end;gap:4px}',
 P+' .cp-bt button{width:22px!important;height:22px;margin:0!important;padding:0!important;border:1px solid #c9b28a!important;border-radius:50%!important;background:#fff!important;color:#5a3f2c!important;font:12px/1 var(--sans,system-ui)!important;cursor:pointer}',
 P+' .cp-it.ok{opacity:.65}'+P+' .cp-it.ok .cp-tx a{text-decoration:line-through}',
 P+' .cp-it.lendo{animation:cpPulsa 1.2s ease-in-out infinite}@keyframes cpPulsa{50%{opacity:.55}}',
 P+' .cp-vz{margin:4px 2px;font:italic 12.5px/1.45 Georgia,serif;color:#5a4636}',
 P+' .cp-f{margin-top:8px}'+P+' .cp-f summary{cursor:pointer;font:700 9px var(--mono,monospace);letter-spacing:.1em;text-transform:uppercase;color:#8a6f55;margin:0 2px 6px}'
].join('\n');document.head.appendChild(st);})();
/* Banner: mesma altura nos três temas e fotos do quadro de visão maiores */
(function(){var st=document.createElement('style');st.id='bn-altura-css';st.textContent=[
 '@media(min-width:700px){#hero-box#hero-box .vx-hero.bn2{height:590px!important;min-height:590px!important;max-height:590px!important;box-sizing:border-box!important;overflow:hidden}}',
 '#hero-box .bn-visao{max-width:940px!important;gap:28px!important;margin:16px 0 8px!important}',
 '#hero-box .bv-fotos{padding:10px 8px 4px 4px!important}',
 '#hero-box .bv-fotos .bv-foto{width:clamp(118px,12.5vw,206px)!important;padding:7px 7px 24px!important}',
 '#hero-box .bv-fotos .bv-foto+.bv-foto{margin-left:-30px!important}',
 '#hero-box .bv-fotos .bv-foto:hover{transform:rotate(0) translateY(-10px) scale(1.18)!important}',
 '#hero-box .bv-foto figcaption{font-size:10.5px!important}',
 '#hero-box .bv-pad .bv-fbt{position:relative}',
 '#hero-box .bv-troca{position:absolute;right:5px;bottom:5px;padding:2px 7px;border-radius:999px;background:rgba(20,14,8,.62);color:#fff7e2;font:600 9px var(--mono,monospace);letter-spacing:.08em;text-transform:uppercase;opacity:0;transition:opacity .2s}',
 '#hero-box .bv-pad:hover .bv-troca{opacity:1}',
 '@media(max-width:699px){#hero-box .bv-fotos .bv-foto{width:31vw!important}#hero-box .bv-fotos .bv-foto+.bv-foto{margin-left:-6vw!important}}'
].join('\n');document.head.appendChild(st);})();

/* Banner: organizar — arrastar título, folheto, cartão-postal, fotos, afirmação e crachá; posição guardada por tema */
var BNM_EL=[['tit','.bn-tit','título'],['id','.bn-id','folheto'],['postal','.cp-postal','cartão-postal'],['fotos','.bv-fotos','fotos'],['af','.bv-af','afirmação'],['base','.bn-base','crachá']];
function bnmTema(){return EG_ON?'egito':TV_ON?'valhala':'acampamento';}
function bnmPos(){S.bnPos=S.bnPos||{};var t=bnmTema();S.bnPos[t]=S.bnPos[t]||{};return S.bnPos[t];}
function bnmAplica(){var P=bnmPos(),st=document.getElementById('bnm-pos');if(!st){st=document.createElement('style');st.id='bnm-pos';document.head.appendChild(st);}
 var c=BNM_EL.map(function(e){var v=P[e[0]];return v?'#hero-box .vx-hero.bn2 '+e[1]+'{translate:'+(v[0]|0)+'px '+(v[1]|0)+'px}':'';}).join('\n');if(st.textContent!==c)st.textContent=c;}
function bnmBotao(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var b=h.querySelector(':scope > .bnm-tg');
 if(!b){b=document.createElement('div');b.className='bnm-tg';b.setAttribute('data-notr','');
  b.innerHTML='<button type="button" data-bnm="tg" title="arrastar os elementos do banner">✥ organizar</button><button type="button" data-bnm="rs" title="voltar tudo ao lugar original">restaurar</button><button type="button" data-bnm="ok">pronto</button>';
  h.appendChild(b);}}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-bnm]');if(!t)return;e.preventDefault();e.stopPropagation();var k=t.dataset.bnm;
   if(k==='tg')document.body.classList.add('bn-movendo');
   if(k==='ok')document.body.classList.remove('bn-movendo');
   if(k==='rs'){S.bnPos[bnmTema()]={};try{grava();}catch(z){}bnmAplica();}},true);
(function(){var arr=null;
 document.addEventListener('pointerdown',function(e){if(!document.body.classList.contains('bn-movendo'))return;if(e.target.closest('.bnm-tg'))return;
  var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h||!h.contains(e.target))return;
  for(var i=0;i<BNM_EL.length;i++){var el=e.target.closest(BNM_EL[i][1]);if(el&&h.contains(el)){var v=bnmPos()[BNM_EL[i][0]]||[0,0];arr={k:BNM_EL[i][0],el:el,x0:e.clientX,y0:e.clientY,v0:v.slice(),hr:h.getBoundingClientRect(),er:el.getBoundingClientRect()};el.classList.add('bnm-ativo');e.preventDefault();e.stopPropagation();try{el.setPointerCapture(e.pointerId);}catch(z){}return;}}},true);
 document.addEventListener('pointermove',function(e){if(!arr)return;var dx=e.clientX-arr.x0,dy=e.clientY-arr.y0,H=arr.hr,R=arr.er;
  dx=Math.max(H.left-R.left,Math.min(H.right-R.right,dx));dy=Math.max(H.top-R.top,Math.min(H.bottom-R.bottom,dy));
  bnmPos()[arr.k]=[Math.round(arr.v0[0]+dx),Math.round(arr.v0[1]+dy)];bnmAplica();},true);
 document.addEventListener('pointerup',function(){if(!arr)return;arr.el.classList.remove('bnm-ativo');arr=null;try{grava();}catch(z){}},true);
 document.addEventListener('click',function(e){if(document.body.classList.contains('bn-movendo')&&!e.target.closest('.bnm-tg')&&e.target.closest('#hero-box .vx-hero.bn2')){e.preventDefault();e.stopPropagation();}},true);
 document.addEventListener('keydown',function(e){if(e.key==='Escape')document.body.classList.remove('bn-movendo');});})();
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{bnmBotao();bnmAplica();}catch(e){}return x;};})();
setTimeout(function(){try{bnmBotao();bnmAplica();}catch(e){}},1300);setInterval(function(){try{bnmBotao();}catch(e){}},3000);
(function(){var st=document.createElement('style');st.id='bnm-css';st.textContent=[
 '#hero-box#hero-box .bnm-tg{position:absolute!important;left:auto!important;right:60px!important;top:12px!important;bottom:auto!important;margin:0!important;width:auto!important;transform:none!important;z-index:30;display:flex;gap:6px;opacity:0;transition:opacity .2s}','body.tela-prog #hero-box .bnm-tg{display:none!important}',
 '#hero-box .vx-hero.bn2:hover .bnm-tg,body.bn-movendo #hero-box .bnm-tg{opacity:1}',
 '#hero-box#hero-box .bnm-tg button{width:auto!important;min-height:0!important;margin:0!important;padding:3px 10px!important;border:1px solid #8a6f55!important;border-radius:999px!important;background:#fbf5e6!important;color:#5a3f2c!important;font:700 9px var(--mono,monospace)!important;letter-spacing:.1em!important;text-transform:uppercase!important;cursor:pointer;box-shadow:none!important}',
 '#hero-box .bnm-tg [data-bnm=rs],#hero-box .bnm-tg [data-bnm=ok]{display:none}',
 'body.bn-movendo #hero-box .bnm-tg [data-bnm=rs],body.bn-movendo #hero-box .bnm-tg [data-bnm=ok]{display:inline-block}body.bn-movendo #hero-box .bnm-tg [data-bnm=tg]{display:none}',
 'body.bn-movendo #hero-box .vx-hero.bn2 :is(.bn-tit,.bn-id,.cp-postal,.bv-fotos,.bv-af,.bn-base){outline:1.5px dashed #b07a3a;outline-offset:3px;cursor:move;touch-action:none;user-select:none}',
 'body.bn-movendo #hero-box .vx-hero.bn2 .bnm-ativo{outline-style:solid;z-index:20}'
].join('\n');document.head.appendChild(st);})();

/* Rodapé no modo operacional: gaveta de apps aberta fica em papel (não no laranja do casco) e a proa/popa somem enquanto ela está aberta; encontro no mar com placa legível */
(function(){var st=document.createElement('style');st.id='rod-aberto-css';st.textContent=[
 'body:not(.tv).op-on #rod-apps.aberto{background:repeating-linear-gradient(0deg,rgba(47,127,146,.16) 0 1px,transparent 1px 16.5px) 0 100%/100% 66px no-repeat,linear-gradient(#efe5cf,#e6dcc2) 0 100%/100% 66px no-repeat,linear-gradient(#f6eedb,#efe3c6)!important}',
 'html body.tv.op-on #rod-apps.rod.aberto{background:linear-gradient(#f3ead8,#e9dcc2)!important}',
 'body.op-on #rod-apps.aberto .rod-top::before,body.op-on #rod-apps.aberto .rod-top::after{display:none!important}',
 '#mt-enc .mt-info{background:rgba(9,28,36,.82)!important;border:1px solid rgba(236,210,126,.55)!important;border-radius:7px!important;padding:6px 10px 7px!important;box-shadow:0 4px 12px rgba(0,0,0,.35)!important;backdrop-filter:blur(2px)}',
 '#mt-enc .mt-k{color:#e9dcc2!important;opacity:1!important;text-shadow:0 1px 2px #000}',
 '#mt-enc .mt-n{color:#ffd978!important;text-shadow:0 1px 2px #000!important;-webkit-text-stroke:0!important}',
 '#mt-enc .mt-o{color:#f6efe0!important;opacity:1!important;text-shadow:0 1px 2px #000}'
].join('\n');document.head.appendChild(st);})();

/* Botão de tema (abre o menu dos três temas) e Panteão sobem para a faixa do nível */
function topoBotoes(){var r1=document.querySelector('#lat-topo .lt-r1');if(!r1)return;var g=r1.querySelector(':scope>.lt-bts');
 if(!g){g=document.createElement('span');g.className='lt-bts';}if(g.parentNode!==r1||g!==r1.lastElementChild)r1.appendChild(g);
 ['tv-tg','pt-tg'].forEach(function(id){var b=document.getElementById(id);if(b&&b.parentNode!==g)g.appendChild(b);});
 var tv=document.getElementById('tv-tg');if(tv&&tv.title!=='Trocar o tema'){tv.title='Trocar o tema';tv.setAttribute('aria-label','Trocar o tema');}}
(function(){var t0=tvBotao;tvBotao=function(){t0.apply(this,arguments);topoBotoes();};})();
(function(){if(typeof panteaoBotao!=='function')return;var p0=panteaoBotao;panteaoBotao=function(){p0.apply(this,arguments);topoBotoes();};})();
(function(){var l0=latTopo;latTopo=function(){var x=l0.apply(this,arguments);try{topoBotoes();}catch(e){}return x;};})();
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#tv-tg,[data-tmenu]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{tmMenu(b);}catch(z){}},true);
setTimeout(topoBotoes,1000);
/* Banner com telas: Visão (o banner de sempre) e Programação (a grade semanal sai do seu painel, perde a moldura e passa a morar dentro do banner).
   A grade continua no mesmo lugar do DOM (.wrap > div.tb), só é posta sobre a área do banner, para não quebrar quem a procura por esse seletor. */
var BN_TELA='visao';try{BN_TELA=localStorage.getItem('astro_bn_tela')||'visao';}catch(e){}
function bnTelaSet(t){BN_TELA=t;try{localStorage.setItem('astro_bn_tela',t);}catch(e){}document.body.classList.toggle('tela-prog',t==='prog');bnTelaBotoes();bnTelaPos();}
function bnTelaBotoes(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var w=h.querySelector(':scope > .bn-telas');
 if(!w){w=document.createElement('div');w.className='bn-telas';w.setAttribute('role','tablist');h.appendChild(w);}
 var x='<button type="button" role="tab" data-bntela="visao" aria-selected="'+(BN_TELA!=='prog')+'">Visão</button><button type="button" role="tab" data-bntela="prog" aria-selected="'+(BN_TELA==='prog')+'">Programação</button>';
 if(w._h!==x||!w.firstChild){w.innerHTML=x;w._h=x;}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-bntela]');if(b){e.preventDefault();e.stopPropagation();bnTelaSet(b.dataset.bntela);return;}
 if(e.target.closest&&e.target.closest('[data-opfx]'))setTimeout(function(){bnTelaSet('prog');var hb=document.getElementById('hero-box');if(hb)hb.scrollIntoView({behavior:'smooth',block:'start'});},120);},true);
function bnTelaPos(){var tb=document.querySelector('.wrap > div.tb'),h=document.querySelector('#hero-box .vx-hero.bn2'),wr=document.querySelector('.wrap');
 if(!tb||!h||!wr)return;if(BN_TELA!=='prog'||document.body.classList.contains('bn-mini')){h.style.removeProperty('--bn-ph');return;}
 var cs=getComputedStyle(h),pl=parseFloat(cs.paddingLeft)||40,pr=parseFloat(cs.paddingRight)||40,pt=52,pb=26;
 var hr=h.getBoundingClientRect(),wrr=wr.getBoundingClientRect();
 var ph=Math.max(590,Math.ceil(tb.offsetHeight+pt+pb));if(h.style.getPropertyValue('--bn-ph')!==ph+'px')h.style.setProperty('--bn-ph',ph+'px');
 hr=h.getBoundingClientRect();
 var x=Math.round(hr.left-wrr.left+pl),y=Math.round(hr.top-wrr.top+pt),w=Math.round(hr.width-pl-pr);
 if(tb._tp!==x+'|'+y+'|'+w){tb._tp=x+'|'+y+'|'+w;tb.style.setProperty('--tl-x',x+'px');tb.style.setProperty('--tl-y',y+'px');tb.style.setProperty('--tl-w',w+'px');}}
document.body.classList.toggle('tela-prog',BN_TELA==='prog');
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{bnTelaBotoes();bnTelaPos();}catch(e){}return x;};})();
setTimeout(function(){try{bnTelaBotoes();bnTelaPos();}catch(e){}},1200);setInterval(function(){try{bnTelaBotoes();bnTelaPos();}catch(e){}},700);
window.addEventListener('resize',function(){try{bnTelaPos();}catch(e){}});
/* pilares do banner no Acampamento: os mesmos da Programação (jônicos azuis), já que o banner grego não tinha */
function bnPilares(){if(TV_ON||EG_ON)return;var sl=document.querySelector('#hero-box .bn-slot');if(!sl||sl.dataset.pil==='2')return;var cf={st:'ionica',c:'#f6d99a',k:'#8a5a14'},im;try{im=colSvgs(cf);}catch(e){return;}
 sl.dataset.pil='2';sl.style.setProperty('--pl-cap',im.cap);sl.style.setProperty('--pl-fuste',im.fuste);sl.style.setProperty('--pl-base',im.base);sl.style.setProperty('--pl-k',cf.k);}
setTimeout(function(){try{bnPilares();}catch(e){}},900);setInterval(function(){try{bnPilares();}catch(e){}},3000);
(function(){var st=document.createElement('style');st.id='bn-telas-css';var T='html body.tela-prog div.wrap>div.tb.tb:not(#x1):not(#x2)';st.textContent=[
 '#hero-box#hero-box .bn-telas{position:absolute!important;top:12px!important;left:50%!important;right:auto!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:31;display:flex!important;gap:0;margin:0!important;width:auto!important;padding:2px;border:1px solid #8a6f55;border-radius:999px;background:#fbf5e6;box-shadow:0 2px 6px -3px rgba(60,40,20,.35)}',
 '#hero-box#hero-box .bn-telas button{width:auto!important;min-height:0!important;height:auto!important;margin:0!important;padding:4px 14px!important;border:0!important;border-radius:999px!important;background:transparent!important;color:#5a3f2c!important;font:700 9.5px var(--mono,monospace)!important;letter-spacing:.14em!important;text-transform:uppercase!important;cursor:pointer;box-shadow:none!important}',
 '#hero-box#hero-box .bn-telas button[aria-selected=true]{background:#5a3f2c!important;color:#fbf5e6!important}',
 'body.tv #hero-box#hero-box .bn-telas{border-color:#A88750;background:#F5EBD6}body.tv #hero-box#hero-box .bn-telas button[aria-selected=true]{background:#203936!important;color:#F5EBD6!important}',
 'body.eg #hero-box#hero-box .bn-telas{border-color:#c9a23a;background:#f7ecd2}body.eg #hero-box#hero-box .bn-telas button[aria-selected=true]{background:#1e3a6e!important;color:#ecd27e!important}',
 '.wrap>#h-sem{display:none!important}',
 'body:not(.tela-prog) .wrap>div.tb{display:none!important}',
 'body.bn-mini .wrap>div.tb{display:none!important}',
 '@media(min-width:700px){body.tela-prog #hero-box#hero-box .vx-hero.bn2{height:var(--bn-ph,590px)!important;min-height:var(--bn-ph,590px)!important;max-height:none!important}}',
 'body.tela-prog #hero-box .vx-hero.bn2>:not(.bn-telas):not(.vx-tema){visibility:hidden!important;pointer-events:none!important}',
 T+'{position:absolute!important;left:var(--tl-x,0)!important;top:var(--tl-y,0)!important;width:var(--tl-w,100%)!important;max-width:none!important;margin:0!important;padding:0!important;z-index:40!important;border:0!important;border-radius:0!important;background:none!important;box-shadow:none!important;outline:0!important;overflow:visible!important;contain:none!important;clip-path:none!important}',
 T+'::before,'+T+'::after{display:none!important}',
 T+'>.col-orn{display:none!important}',
 T+' .tbcab{margin-top:0!important}',
 T+' .mf-alca-mes,'+T+' .mf-alca-sem{left:auto!important;right:-44px!important}',
 T+' .mf-alca-sem{top:calc(50% - 100px)!important}'+T+' .mf-alca-mes{top:calc(50% + 100px)!important}',
 '@media(min-width:1380px){'+T+' .mf-alca-mes,'+T+' .mf-alca-sem{right:-89px!important}}',
 /* pilares jônicos no banner grego */
 'body:not(.tv):not(.eg) #hero-box .bn-slot[data-pil]{position:relative;padding:0 46px!important;background:var(--pl-cap) 2px 0/42px 29px no-repeat,var(--pl-cap) calc(100% - 2px) 0/42px 29px no-repeat,var(--pl-fuste) 2px 29px/42px calc(100% - 44px) no-repeat,var(--pl-fuste) calc(100% - 2px) 29px/42px calc(100% - 44px) no-repeat,var(--pl-base) 2px 100%/42px 15px no-repeat,var(--pl-base) calc(100% - 2px) 100%/42px 15px no-repeat!important}',
 '@media(max-width:1379px){body:not(.tv):not(.eg) #hero-box .bn-slot[data-pil]{padding:0!important;background:none!important}}'
].join('\n');document.head.appendChild(st);})();

/* Faixa inferior fixa do banner (nas duas telas): Semana e Mês (as gavetas da grade) e o Diário de bordo (sai do cartão do painel esquerdo e mora aqui) */
var BN_ROD_H=58;
function bnRod(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var rs=document.querySelectorAll('#hero-box .bn-rod'),r=rs[0]||null;for(var ri=1;ri<rs.length;ri++){var rd0=rs[ri].querySelector('.regdia');if(rd0&&r)r.querySelector('.br-slot').appendChild(rd0);rs[ri].remove();}
 if(!r){r=document.createElement('div');r.className='bn-rod';r.innerHTML='<div class="br-gav"><button type="button" data-brg="sem"><i>semana</i><b>—</b></button><button type="button" data-brg="mes"><i>mês</i><b>—</b></button></div><div class="br-db"><span class="br-k">diário de bordo · hoje</span><div class="br-slot"></div><button type="button" class="br-ver" data-brver aria-expanded="false" title="ver o que já foi registrado hoje">ver</button></div>';}
 var bsl=document.querySelector('#hero-box .bn-slot');if(bsl){var anc=bsl;while(anc.nextElementSibling&&/^(tp-friso|tp-friso-bloco|hoje-pan)$/.test(anc.nextElementSibling.id))anc=anc.nextElementSibling;if(anc.nextElementSibling!==r)anc.insertAdjacentElement('afterend',r);}else if(r.parentNode!==h)h.appendChild(r);
 var a=function(q){var e=document.querySelector(q+' span');return e?e.textContent.trim():'';};
 var ts=(a('.mf-alca-sem').replace(/^a semana\s*·?\s*/i,'')||'esta semana'),tm=(a('.mf-alca-mes').replace(/^o m[eê]s\s*·?\s*/i,'')||'este mês');
 var bs=r.querySelector('[data-brg=sem] b'),bm=r.querySelector('[data-brg=mes] b');if(bs.textContent!==ts)bs.textContent=ts;if(bm.textContent!==tm)bm.textContent=tm;
 var tb=document.querySelector('.wrap > div.tb');r.querySelector('[data-brg=sem]').classList.toggle('on',!!(tb&&tb.classList.contains('gav-sem')));r.querySelector('[data-brg=mes]').classList.toggle('on',!!(tb&&tb.classList.contains('gav-mes')));
 var rd=document.querySelector('.regdia'),sl=r.querySelector('.br-slot');if(rd&&rd.parentNode!==sl)sl.appendChild(rd);
 var n=rd?rd.querySelectorAll('.rdl > *:not(.empty)').length:0,vb=r.querySelector('.br-ver'),vt=n?'ver ('+n+')':'ver';if(vb.textContent!==vt)vb.textContent=vt;}
rodLog=function(){var b=document.getElementById('rod-log');if(b)b.hidden=true;var p=document.getElementById('rod-log-pop');if(p)p.hidden=true;var c=document.getElementById('lat-db');if(c)c.hidden=true;try{bnRod();}catch(e){}};
document.addEventListener('click',function(e){var g=e.target.closest&&e.target.closest('[data-brg]');
 if(g){e.preventDefault();e.stopPropagation();var k=g.dataset.brg,abre=function(){var al=document.querySelector('.mf-alca-'+k);if(al)al.click();setTimeout(function(){try{bnRod();}catch(z){}},60);};
  if(BN_TELA!=='prog'){bnTelaSet('prog');setTimeout(abre,180);}else abre();return;}
 var v=e.target.closest&&e.target.closest('[data-brver]');if(v){e.preventDefault();e.stopPropagation();var r=v.closest('.bn-rod'),on=!r.classList.contains('ver');r.classList.toggle('ver',on);v.setAttribute('aria-expanded',String(on));return;}
 var rr=document.querySelector('#hero-box .bn-rod.ver');if(rr&&!rr.contains(e.target)){rr.classList.remove('ver');var vv=rr.querySelector('.br-ver');if(vv)vv.setAttribute('aria-expanded','false');}},true);
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{bnRod();}catch(e){}return x;};})();
setTimeout(function(){try{rodLog();}catch(e){}},1500);setInterval(function(){try{bnRod();}catch(e){}},1000);
(function(){var st=document.createElement('style');st.id='bn-rod-css';var H=BN_ROD_H;st.textContent=[
 '#lat-e>#lat-db{display:none!important}',
 '@media(min-width:700px){#hero-box#hero-box .vx-hero.bn2{height:600px!important;min-height:600px!important;max-height:600px!important;padding-bottom:'+(30+H)+'px!important}',
 ' body.tela-prog #hero-box#hero-box .vx-hero.bn2{height:calc(var(--bn-ph,590px) + '+H+'px)!important;min-height:calc(var(--bn-ph,590px) + '+H+'px)!important;max-height:none!important}',
 ' #hero-box#hero-box .bn-rod{position:absolute!important;left:46px!important;right:46px!important;bottom:12px!important;top:auto!important;height:'+(H-14)+'px;margin:0!important;width:auto!important}}',
 '#hero-box#hero-box .bn-rod{z-index:45;display:flex!important;align-items:center;gap:12px;box-sizing:border-box;padding:6px 10px;border:1px solid #c9b28a;border-radius:10px;background:#fbf5e6;box-shadow:0 2px 8px -5px rgba(60,40,20,.4);visibility:visible!important;pointer-events:auto!important}',
 '#hero-box .bn-rod .br-gav{display:flex;gap:6px;flex:none}',
 '#hero-box#hero-box .bn-rod button{width:auto!important;min-height:0!important;margin:0!important;box-shadow:none!important;text-transform:none!important;letter-spacing:0!important;cursor:pointer}',
 '#hero-box#hero-box .bn-rod .br-gav button{display:flex!important;flex-direction:column;align-items:flex-start;gap:0;height:auto!important;padding:3px 12px!important;border:1px solid #8a6f55!important;border-radius:8px!important;background:#f4ead2!important;color:#3b2a1d!important}',
 '#hero-box .bn-rod .br-gav i{font:700 8px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;font-style:normal;color:#9a6b3a}',
 '#hero-box .bn-rod .br-gav b{font:600 12.5px Georgia,serif;white-space:nowrap}',
 '#hero-box#hero-box .bn-rod .br-gav button.on{background:#5a3f2c!important;color:#fbf5e6!important}#hero-box .bn-rod .br-gav button.on i{color:#ecd9b4}',
 '#hero-box .bn-rod .br-db{position:relative;flex:1;min-width:0;display:flex;align-items:center;gap:8px;padding-left:12px;border-left:1px dashed #c9b28a}',
 '#hero-box .bn-rod .br-k{flex:none;font:700 8px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#6b5a9a}',
 '#hero-box .bn-rod .br-slot{flex:1;min-width:0}',
 '#hero-box .bn-rod .regdia{margin:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}',
 '#hero-box .bn-rod .regdia .mcab2{display:none!important}',
 '#hero-box .bn-rod .regdia .rdent{display:flex;gap:6px;margin:0!important}',
 '#hero-box .bn-rod .regdia .rdent input{flex:1;min-width:0;height:30px;box-sizing:border-box;padding:0 10px!important;border:1px solid #c9b28a!important;border-radius:8px!important;background:#fffaf0!important;font:13px var(--sans)!important}',
 '#hero-box#hero-box .bn-rod .regdia .rdent button{flex:none;height:30px!important;padding:0 12px!important;border-radius:8px!important}',
 '#hero-box .bn-rod .regdia .rdl{display:none}',
 '#hero-box .bn-rod.ver .regdia .rdl{display:block;position:absolute;left:0;right:0;bottom:calc(100% + 12px);max-height:260px;overflow-y:auto;padding:10px 12px;border:1px solid #c9b28a;border-radius:10px;background:#fbf5e6;box-shadow:0 10px 24px -10px rgba(40,25,10,.45);scrollbar-width:thin;z-index:50}',
 '#hero-box#hero-box .bn-rod .br-ver{flex:none;height:30px!important;padding:0 12px!important;border:1px solid #6b5a9a!important;border-radius:8px!important;background:#f4ead2!important;color:#6b5a9a!important;font:700 9px var(--mono,monospace)!important;letter-spacing:.1em!important;text-transform:uppercase!important}',
 'html body.tela-prog div.wrap>div.tb.tb:not(#x1):not(#x2) .mf-alca{display:none!important}',
 'body.tv #hero-box#hero-box .bn-rod{border-color:#A88750;background:#F5EBD6}body.tv #hero-box#hero-box .bn-rod .br-gav button.on{background:#203936!important}',
 'body.eg #hero-box#hero-box .bn-rod{border-color:#c9a23a;background:#f7ecd2}body.eg #hero-box#hero-box .bn-rod .br-gav button.on{background:#1e3a6e!important}',
 '@media(max-width:699px){#hero-box#hero-box .bn-rod{position:relative!important;flex-wrap:wrap;margin:10px 0 0!important}#hero-box .bn-rod .br-db{flex-basis:100%;border-left:0;padding-left:0}}'
].join('\n');document.head.appendChild(st);})();

/* Verso do banner: o crachá (nome, chalé, nível e XP) e a ficha saem da frente e ficam no verso do cartão; vira com um giro */
var BN_VERSO=false;
function bnVersoBt(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var b=h.querySelector(':scope > .bn-vira');
 if(!b){b=document.createElement('button');b.type='button';b.className='bn-vira';b.dataset.bnvira='1';h.appendChild(b);}
 var t=BN_VERSO?'↻ frente':'↻ verso';if(b.textContent!==t)b.textContent=t;b.title=BN_VERSO?'voltar para a frente do banner':'virar o banner: ficha do campista no verso';}
function bnVira(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;h.classList.add('bn-girando');
 setTimeout(function(){BN_VERSO=!BN_VERSO;document.body.classList.toggle('bn-verso',BN_VERSO);bnVersoBt();try{bnTelaPos();}catch(e){}h.classList.remove('bn-girando');},190);}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-bnvira]');if(!b)return;e.preventDefault();e.stopPropagation();bnVira();},true);
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{bnVersoBt();}catch(e){}return x;};})();
setTimeout(function(){try{bnVersoBt();}catch(e){}},1200);setInterval(function(){try{bnVersoBt();}catch(e){}},2000);
(function(){var st=document.createElement('style');st.id='bn-verso-css';var V='body.bn-verso #hero-box .vx-hero.bn2';st.textContent=[
 '#hero-box .vx-hero.bn2{transition:transform .19s ease-in;transform-origin:50% 50%}',
 '#hero-box .vx-hero.bn2.bn-girando{transform:perspective(1400px) rotateY(88deg)!important}',
 '#hero-box#hero-box .bn-vira{position:absolute!important;top:12px!important;left:60px!important;right:auto!important;bottom:auto!important;z-index:32;width:auto!important;min-height:0!important;margin:0!important;padding:3px 12px!important;border:1px solid #8a6f55!important;border-radius:999px!important;background:#fbf5e6!important;color:#5a3f2c!important;font:700 9px var(--mono,monospace)!important;letter-spacing:.12em!important;text-transform:uppercase!important;cursor:pointer;box-shadow:none!important}',
 /* frente: sem crachá */
 'body:not(.bn-verso) #hero-box .vx-hero.bn2>.bn-base{display:none!important}',
 /* verso: só o crachá, grande e no centro; a grade e a frente somem */
 V+'>:not(.bn-base):not(.bn-vira):not(.bn-rod):not(.vx-tema){visibility:hidden!important;pointer-events:none!important}',
 'body.bn-verso .wrap>div.tb{display:none!important}',
 '@media(min-width:700px){body.bn-verso #hero-box#hero-box .vx-hero.bn2{height:600px!important;min-height:600px!important;max-height:600px!important}}',
 V+'>.bn-base{position:absolute!important;left:50%!important;top:46%!important;translate:none!important;transform:translate(-50%,-50%) scale(1.75)!important;transform-origin:50% 50%;display:flex!important;flex-direction:column!important;align-items:center!important;gap:10px!important;width:auto!important;margin:0!important;padding:18px 26px 16px!important;border:1px solid #c9a45a!important;border-radius:10px!important;background:#fbf5e6!important;box-shadow:0 0 0 3px #fbf5e6,0 0 0 4px #c9a45a,0 10px 26px -12px rgba(60,40,20,.45)!important;text-align:center!important;visibility:visible!important}',
 V+'>.bn-base::before{content:"verso · ficha";font:700 7px var(--mono,monospace);letter-spacing:.24em;text-transform:uppercase;color:#9a6b3a}',
 V+'>.bn-base *{text-align:center!important}',
 'body.tv.bn-verso #hero-box .vx-hero.bn2>.bn-base{border-color:#A88750!important;background:#F5EBD6!important;box-shadow:0 0 0 3px #F5EBD6,0 0 0 4px #A88750,0 10px 26px -12px rgba(0,0,0,.45)!important}',
 'body.eg.bn-verso #hero-box .vx-hero.bn2>.bn-base{border-color:#c9a23a!important;background:#f7ecd2!important;box-shadow:0 0 0 3px #f7ecd2,0 0 0 4px #c9a23a,0 10px 26px -12px rgba(20,20,40,.45)!important}',
 'body.bn-verso #hero-box .bnm-tg,body.bn-verso #hero-box .bn-telas{display:none!important}'
].join('\n');document.head.appendChild(st);})();

/* Painel direito com três abas: Missões, Hora livre e Arsenal (o Tesouro sai da coluna do meio e vira a terceira face do templo).
   Na Hora livre, o recreio com hora e a fila do lazer viram um rodapé fixo, que expande e recolhe. Nomes das abas por tema. */
var ABAS_NOMES=TV_ON?{tm:'Sagas',rec:'Folga',ars:'Tesouro',vis:'Visões',prog:'Escala do andar'}:EG_ON?{tm:'Papiros',rec:'Terraço',ars:'Tesouro',vis:'Visões',prog:'Escala da Casa'}:{tm:'Missões',rec:'Hora livre',ars:'Arsenal',vis:'Visões',prog:'Escala do chalé'};
TP_FACES.length=0;TP_FACES.push(['tm',ABAS_NOMES.tm],['rec',ABAS_NOMES.rec],['ars',ABAS_NOMES.ars]);
p4Face=function(){try{var v=localStorage.getItem('astro_tm_face');return v==='rec'||v==='ars'?v:'tm';}catch(e){return 'tm';}};
(function(){var r0=p4RecHTML;p4RecHTML=function(){if(p4Face()!=='rec')return '';var h=r0.apply(this,arguments),o=opx(),ate=o.lazerAte||0,n=p4Rec().filter(function(x){return !x.ok;}).length;
 var st=ate>Date.now()?'recreio até '+new Date(ate).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'fila '+n;
 return '<button type="button" class="tp-rod-tg" data-tprod><span>recreio com hora · fila do lazer</span><b>'+st+'</b><i aria-hidden="true">▴</i></button><div class="tp-rod-c">'+h+'</div>';};})();
(function(){var t0=tpReal;tpReal=function(){var r=t0.apply(this,arguments);var box=tpRealBox(),ts=document.getElementById('tesouro');if(ts&&ts.parentNode!==box)box.appendChild(ts);
 var p=document.getElementById('tp-painel');if(p){var ab='0';try{ab=localStorage.getItem('astro_rec_rod')||'0';}catch(e){}p.classList.toggle('rod-aberto',ab==='1');}return r;};})();
(function(){var t0=tpPlaca;tpPlaca=function(){var r=t0.apply(this,arguments);var box=document.getElementById('tp-real'),ts=document.getElementById('tesouro');if(!box||!ts)return r;var cab=ts.querySelector(':scope>.ts-cab');if(!cab)return r;
 var n=cab.querySelector(':scope>.tp-placa');if(!n){n=document.createElement('nav');n.className='tp-placa';n.setAttribute('role','tablist');cab.appendChild(n);}
 var f=p4Face(),h=TP_FACES.map(function(x){return '<button type="button" role="tab" data-tpface="'+x[0]+'" aria-selected="'+(x[0]===f)+'">'+x[1]+'</button>';}).join('<i aria-hidden="true">·</i>');
 if(n._h!==h||(h&&!n.firstChild)){n._h=h;n.innerHTML=h;}return r;};})();
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-tprod]');if(t){e.preventDefault();e.stopPropagation();var p=document.getElementById('tp-painel');if(!p)return;var on=!p.classList.contains('rod-aberto');p.classList.toggle('rod-aberto',on);try{localStorage.setItem('astro_rec_rod',on?'1':'0');}catch(z){}return;}
 var f=e.target.closest&&e.target.closest('#tesouro [data-tpface]');if(f){e.preventDefault();e.stopPropagation();try{localStorage.setItem('astro_tm_face',f.dataset.tpface);}catch(z){}var pp=document.getElementById('tp-painel');if(pp)pp._h='';p4Painel();try{tpPlaca();}catch(z){}}},true);
/* nomes das telas do banner */
bnTelaBotoes=function(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var w=h.querySelector(':scope > .bn-telas');
 if(!w){w=document.createElement('div');w.className='bn-telas';w.setAttribute('role','tablist');w.setAttribute('data-notr','');h.appendChild(w);}
 var x='<button type="button" role="tab" data-bntela="visao" aria-selected="'+(BN_TELA!=='prog')+'">'+ABAS_NOMES.vis+'</button><button type="button" role="tab" data-bntela="prog" aria-selected="'+(BN_TELA==='prog')+'">'+ABAS_NOMES.prog+'</button>';
 if(w._h!==x||!w.firstChild){w.innerHTML=x;w._h=x;}};
setTimeout(function(){try{var p=document.getElementById('tp-painel');if(p)p._h='';p4Painel();tpPlaca();reorgTesouro();}catch(e){}},1700);
setInterval(function(){try{var n=document.querySelectorAll('#tp-real .tp-placa');Array.prototype.forEach.call(n,function(x){x.setAttribute('data-notr','');});}catch(e){}},1500);
(function(){var st=document.createElement('style');st.id='abas3-css';st.textContent=[
 '#tp-real[data-face="ars"]>#tm-painel,#tp-real[data-face="ars"]>#recreio{display:none!important}',
 '#tp-real:not([data-face="ars"])>#tesouro{display:none!important}',
 '#tp-real[data-face="ars"]>#tesouro{display:block!important;margin:0!important;width:auto!important;max-width:none!important;padding-left:40px!important;padding-right:40px!important}',
 '#tp-real>#tesouro .ts-g{display:grid!important;grid-template-columns:1fr!important;gap:12px!important}',
 '#tp-real>#tesouro>.ts-cab>:not(.tp-placa){display:none!important}',
 '#tp-real>#tesouro>.ts-cab{display:flex!important;justify-content:center;margin:0 0 12px!important;padding:6px 12px!important}',
 '#tp-real .tp-placa button{font-size:12.5px!important}#tp-real .tp-placa button[aria-selected="true"]{font-size:16px!important}',
 /* rodapé fixo e expansível da Hora livre */
 '#tp-painel .tp-corpo:has(.tp-rod-tg){position:sticky!important;bottom:0;z-index:25;margin:12px 0 0!important;padding:0 10px 8px!important;background:#fbf5e6;border:1px solid #c9b28a;border-radius:10px 10px 0 0;box-shadow:0 -10px 20px -12px rgba(60,40,20,.45)}',
 '#tp-painel .tp-rod-tg{display:flex!important;align-items:center;gap:8px;width:100%!important;margin:0!important;padding:9px 4px 8px!important;border:0!important;background:none!important;cursor:pointer;box-shadow:none!important;text-transform:none!important;letter-spacing:0!important}',
 '#tp-painel .tp-rod-tg span{flex:1;text-align:left;font:700 9px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#9a6b3a}',
 '#tp-painel .tp-rod-tg b{font:600 12.5px Georgia,serif;color:#3b2a1d}',
 '#tp-painel .tp-rod-tg i{font-style:normal;color:#9a6b3a;transition:transform .2s}',
 '#tp-painel.rod-aberto .tp-rod-tg i{transform:rotate(180deg)}',
 '#tp-painel:not(.rod-aberto) .tp-rod-c{display:none}',
 '#tp-painel.rod-aberto .tp-rod-c{max-height:min(56vh,460px);overflow-y:auto;scrollbar-width:thin;border-top:1px dashed #c9b28a;padding-top:8px}',
 'body.tv #tp-painel .tp-corpo:has(.tp-rod-tg){background:#F5EBD6;border-color:#A88750}',
 'body.eg #tp-painel .tp-corpo:has(.tp-rod-tg){background:#f7ecd2;border-color:#c9a23a}'
].join('\n');document.head.appendChild(st);})();

/* A faixa Semana · Mês · Diário de bordo vira o embasamento do templo: degraus de pedra sob os pilares, fora do cartão */
(function(){var st=document.createElement('style');st.id='bn-degraus-css';var R='#hero-box#hero-box>.bn-rod';st.textContent=[
 '@media(min-width:700px){#hero-box#hero-box .vx-hero.bn2{height:560px!important;min-height:560px!important;max-height:560px!important;padding-bottom:30px!important}',
 ' body.tela-prog #hero-box#hero-box .vx-hero.bn2{height:var(--bn-ph,560px)!important;min-height:var(--bn-ph,560px)!important;max-height:none!important}',
 ' body.bn-verso #hero-box#hero-box .vx-hero.bn2{height:560px!important;min-height:560px!important;max-height:560px!important}}',
 R+'{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;top:auto!important;height:auto!important;width:auto!important;margin:0 6px 24px!important;padding:9px 18px 10px!important;border:0!important;border-radius:0!important;',
 ' border-top:2px solid #b8955a!important;background:linear-gradient(180deg,#f6e9c9,#ead6a9)!important;box-shadow:inset 0 1px 0 #fff6dd,inset 0 -1px 0 #c9a96a!important;z-index:5}',
 R+'::before,'+R+'::after{content:"";position:absolute;pointer-events:none;background:linear-gradient(180deg,#efdcb2,#e0c793);border-top:1px solid #b8955a;box-shadow:inset 0 1px 0 #fbefd2}',
 R+'::after{left:-10px;right:-10px;bottom:-11px;height:11px}',
 R+'::before{left:-20px;right:-20px;bottom:-22px;height:11px;background:linear-gradient(180deg,#e6d0a0,#d4b97f)}',
 '#hero-box>.bn-rod .br-k{color:#7a5a24!important}',
 '#hero-box>.bn-rod .br-db{border-left-color:#b8955a!important}',
 'body.bn-mini #hero-box>.bn-rod{display:none!important}',
 'body.tv '+R+'{border-top-color:#6e4426!important;background:linear-gradient(180deg,#e9dfcc,#d8c9ad)!important;box-shadow:inset 0 1px 0 #f6efe0,inset 0 -1px 0 #a8927a!important}',
 'body.tv '+R+'::before,body.tv '+R+'::after{background:linear-gradient(180deg,#ddd0b5,#c8b691);border-top-color:#6e4426}',
 'body.eg '+R+'{border-top-color:#1e3a6e!important;background:linear-gradient(180deg,#f4e4c0,#e6cf9e)!important;box-shadow:inset 0 1px 0 #fbf0d6,inset 0 -1px 0 #c9a23a!important}',
 'body.eg '+R+'::before,body.eg '+R+'::after{background:linear-gradient(180deg,#ecd7a8,#dcc086);border-top-color:#c9a23a}',
 '@media(max-width:1379px){'+R+'{margin:0 0 24px!important}}'
].join('\n');document.head.appendChild(st);})();

/* Telas no frontão (na linha da pílula de botões) e crachá no verso do cartão-postal, que vira ao clicar */
bnTelaBotoes=function(){var h=document.querySelector('#hero-box .vx-hero.bn2');if(!h)return;var pil=document.querySelector('#hero-box .pd-pilula'),box=pil&&pil.parentNode||h;
 var w=document.querySelector('#hero-box .bn-telas');if(!w){w=document.createElement('div');w.className='bn-telas';w.setAttribute('role','tablist');w.setAttribute('data-notr','');}
 if(w.parentNode!==box)box.appendChild(w);w.classList.toggle('no-front',!!pil);
 var x='<button type="button" role="tab" data-bntela="visao" aria-selected="'+(BN_TELA!=='prog')+'">'+ABAS_NOMES.vis+'</button><button type="button" role="tab" data-bntela="prog" aria-selected="'+(BN_TELA==='prog')+'">'+ABAS_NOMES.prog+'</button>';
 if(w._h!==x||!w.firstChild){w.innerHTML=x;w._h=x;}
 if(pil){var bx=pil.offsetLeft+pil.offsetWidth+10,by=pil.offsetTop+Math.round((pil.offsetHeight-(w.offsetHeight||26))/2);var v=bx+'|'+by;if(w._p!==v){w._p=v;w.style.setProperty('--bt-x',bx+'px');w.style.setProperty('--bt-y',by+'px');}}};
function cpVerso(){var c=document.querySelector('#hero-box .cp-postal');if(!c)return;c.removeAttribute('aria-hidden');c.setAttribute('role','button');c.setAttribute('tabindex','0');c.title=c.classList.contains('virado')?'voltar para a frente do cartão':'virar o cartão: seus dados no verso';
 var v=c.querySelector(':scope>.cp-verso');if(!v){v=document.createElement('div');v.className='cp-verso';c.appendChild(v);}
 var cr=document.querySelector('#hero-box .ac-cracha span'),fi=document.getElementById('vx-diario');
 var x='<span class="cpv-k">verso · ficha</span><div class="cpv-t">'+(cr?cr.innerHTML:'')+'</div>'+(fi?'<button type="button" class="cpv-fi" data-cpficha>abrir a ficha</button>':'')+'<i class="cpv-sel" aria-hidden="true"></i>';
 if(v._h!==x){v._h=x;v.innerHTML=x;}}
document.addEventListener('click',function(e){var f=e.target.closest&&e.target.closest('[data-cpficha]');if(f){e.preventDefault();e.stopPropagation();var b=document.getElementById('vx-diario');if(b)b.click();return;}
 if(document.body.classList.contains('bn-movendo'))return;var c=e.target.closest&&e.target.closest('#hero-box .cp-postal');if(!c)return;e.preventDefault();
 c.classList.remove('cp-gira');void c.offsetWidth;c.classList.add('cp-gira');setTimeout(function(){c.classList.toggle('virado');cpVerso();},170);setTimeout(function(){c.classList.remove('cp-gira');},360);});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.classList&&e.target.classList.contains('cp-postal')){e.preventDefault();e.target.click();}});
(function(){var r0=vxRender;vxRender=function(){var x=r0.apply(this,arguments);try{cpVerso();bnTelaBotoes();}catch(e){}return x;};})();
setTimeout(function(){try{cpVerso();bnTelaBotoes();}catch(e){}},1300);setInterval(function(){try{cpVerso();bnTelaBotoes();}catch(e){}},1200);
BN_VERSO=false;document.body.classList.remove('bn-verso');
(function(){var st=document.createElement('style');st.id='cp-verso-css';st.textContent=[
 '#hero-box .bn-vira{display:none!important}',
 '#hero-box#hero-box .bn-telas.no-front{position:absolute!important;left:var(--bt-x,0)!important;top:var(--bt-y,0)!important;transform:none!important;z-index:6}',
 '#hero-box .cp-postal{cursor:pointer;pointer-events:auto!important}',
 '@keyframes cpGira{0%{scale:1 1}50%{scale:0 1}100%{scale:1 1}}',
 '#hero-box .cp-postal.cp-gira{animation:cpGira .34s ease-in-out}',
 '#hero-box .cp-postal .cp-verso{display:none}',
 '#hero-box .cp-postal.virado>:not(.cp-verso){visibility:hidden!important}',
 '#hero-box .cp-postal.virado .cp-verso{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;position:absolute;inset:0;z-index:3;padding:12px 16px;box-sizing:border-box;text-align:center;background:repeating-linear-gradient(0deg,transparent 0 21px,rgba(154,107,58,.16) 21px 22px),#fbf5e6;border-radius:inherit;color:#3b2a1d}',
 '#hero-box .cp-verso .cpv-k{font:700 8px var(--mono,monospace);letter-spacing:.22em;text-transform:uppercase;color:#9a6b3a}',
 '#hero-box .cp-verso .cpv-t{font:600 15px/1.35 Georgia,serif}#hero-box .cp-verso .cpv-t b{font-weight:700}#hero-box .cp-verso .cpv-t br+*,#hero-box .cp-verso .cpv-t small{font:12px var(--mono,monospace)}',
 '#hero-box#hero-box .cp-verso .cpv-fi{width:auto!important;min-height:0!important;margin:2px 0 0!important;padding:3px 12px!important;border:1px solid #8a6f55!important;border-radius:999px!important;background:#f4ead2!important;color:#5a3f2c!important;font:700 9px var(--mono,monospace)!important;letter-spacing:.1em!important;text-transform:uppercase!important;box-shadow:none!important;cursor:pointer}',
 '#hero-box#hero-box .cp-postal .cp-verso,#hero-box#hero-box .cp-postal .cp-verso *{font-family:Georgia,serif!important;text-shadow:none!important;-webkit-text-stroke:0!important;letter-spacing:normal!important;text-transform:none!important;color:#3b2a1d!important;transform:none!important;line-height:1.3!important}',
 '#hero-box#hero-box .cp-postal .cp-verso .cpv-k{font:700 8px var(--mono,monospace)!important;letter-spacing:.22em!important;text-transform:uppercase!important;color:#9a6b3a!important}',
 '#hero-box#hero-box .cp-postal .cp-verso .cpv-t{font-size:13px!important;font-weight:400!important}',
 '#hero-box#hero-box .cp-postal .cp-verso .cpv-t b{display:block;font-size:17px!important;font-weight:700!important;margin-bottom:3px}',
 '#hero-box#hero-box .cp-postal .cp-verso .cpv-t svg{width:14px;height:14px;vertical-align:-2px}',
 '#hero-box#hero-box .cp-postal .cp-verso .cpv-fi{font:700 9px var(--mono,monospace)!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:#5a3f2c!important}',
 '#hero-box .cp-verso .cpv-sel{position:absolute;top:10px;right:12px;width:30px;height:36px;border:1.5px dashed #c9a45a;border-radius:3px}',
 'body.tv #hero-box .cp-postal.virado .cp-verso{background:repeating-linear-gradient(0deg,transparent 0 21px,rgba(168,135,80,.2) 21px 22px),#F5EBD6}',
 'body.eg #hero-box .cp-postal.virado .cp-verso{background:repeating-linear-gradient(0deg,transparent 0 21px,rgba(30,58,110,.14) 21px 22px),#f7ecd2}'
].join('\n');document.head.appendChild(st);})();

/* Registro rápido vira rodapé fixo e expansível do painel esquerdo */
function trioRod(){var c=document.getElementById('lat-trio');if(!c)return;var ab='0';try{ab=localStorage.getItem('astro_trio_rod')||'0';}catch(e){}c.classList.toggle('aberto',ab==='1');var cab=c.querySelector('.tr-cab');if(cab){cab.setAttribute('role','button');cab.setAttribute('tabindex','0');cab.setAttribute('aria-expanded',String(ab==='1'));}}
document.addEventListener('click',function(e){var cab=e.target.closest&&e.target.closest('#lat-trio .tr-cab');if(!cab)return;var c=document.getElementById('lat-trio'),on=!c.classList.contains('aberto');try{localStorage.setItem('astro_trio_rod',on?'1':'0');}catch(z){}trioRod();if(on){var i=c.querySelector('.tr-p:not([hidden]) input,.tr-p input');if(i)setTimeout(function(){try{i.focus();}catch(z){}},30);}},true);
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.closest&&e.target.closest('#lat-trio .tr-cab')===e.target){e.preventDefault();e.target.click();}});
setTimeout(trioRod,1500);setInterval(function(){try{trioRod();}catch(e){}},2000);
(function(){var st=document.createElement('style');st.id='trio-rod-css';st.textContent=[
 '#lat-e>#lat-trio{position:sticky!important;bottom:0!important;order:99!important;z-index:22;margin-top:auto!important;box-shadow:0 -10px 20px -12px rgba(60,40,20,.45)!important;border-radius:10px 10px 0 0!important}',
 '#lat-trio .tr-cab{cursor:pointer;margin:0!important}',
 '#lat-trio .tr-cab::after{content:"▴";margin-left:auto;color:#9a4a30;transition:transform .2s}',
 '#lat-trio.aberto .tr-cab::after{transform:rotate(180deg)}',
 '#lat-trio.aberto .tr-cab{margin:0 0 10px!important}',
 '#lat-trio:not(.aberto) :is(.tr-tabs,.tr-p){display:none!important}'
].join('\n');document.head.appendChild(st);})();


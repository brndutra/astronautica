/* ======================= Diálogos do Sully e do corvo mais compactos =======================
   Sully: cabeçalho menor; "Sully diz" fica à vista; ficha, Tracinhos da Cila, recomendações e gabinete viram seções
   que abrem e fecham (estado guardado). Corvo/avisos: avatar menor e só o recado mais novo aberto; os anteriores
   mostram só o título e abrem ao toque. */
var SAT_DOB=[['dl.sat-tr','Ficha do Sully','céu, idade, origem, dom, juramento, como sobe'],['.ci-mapa','Tracinhos da Cila','onde a atenção escapa'],['.cv-rec',null,''],['.sat-gab',null,'']];
function satDobEst(){try{return JSON.parse(localStorage.getItem('astro_sat_dob')||'{}')||{};}catch(e){return {};}}
function satDobra(){var c=document.querySelector('#sat-dlg #sat-painel');if(!c)return;var E=satDobEst();
 SAT_DOB.forEach(function(q,i){var el=c.querySelector(':scope>'+q[0]);if(!el||el.parentNode.classList.contains('sat-dob'))return;
  var t=q[1];if(!t){var h=el.querySelector('h3,h4,.k9,b,strong');t=h?h.textContent.trim().slice(0,48):'mais';}
  var d=document.createElement('details');d.className='sat-dob';d.dataset.k=i;if(E[i])d.open=true;
  d.innerHTML='<summary><b>'+esc(t)+'</b>'+(q[2]?'<small>'+esc(q[2])+'</small>':'')+'</summary>';el.parentNode.insertBefore(d,el);d.appendChild(el);
  d.addEventListener('toggle',function(){var E2=satDobEst();if(d.open)E2[i]=1;else delete E2[i];try{localStorage.setItem('astro_sat_dob',JSON.stringify(E2));}catch(z){}});});}
satPinta=(function(f0){return function(){var r=f0.apply(this,arguments);try{satDobra();}catch(e){}return r;};})(satPinta);
document.addEventListener('click',function(e){var m=e.target.closest&&e.target.closest('#ave-dlg .ad-msg');if(!m||e.target.closest('button,a'))return;if(m===m.parentNode.lastElementChild)return;m.classList.toggle('ad-aberta');});
(function(){var st=document.createElement('style');st.id='sat-corvo-compacto-css';st.textContent=[
 '#sat-dlg{max-width:min(680px,94vw)!important}',
 '#sat-dlg .sat-ficha{padding:10px 14px!important;gap:12px!important;align-items:center}',
 '#sat-dlg .sat-ficha img.sat-foto,#sat-dlg .sat-ficha .sat-av{width:64px!important;height:72px!important}',
 '#sat-dlg .sat-ficha b,#sat-dlg .sat-ficha h2,#sat-dlg .sat-ficha h3{font-size:19px!important}',
 '#sat-dlg #sat-painel{display:flex;flex-direction:column;gap:8px}',
 '#sat-dlg #sat-painel>*{margin:0!important}',
 '#sat-dlg .sat-dob{border:1px solid #d6c69c;border-radius:10px;background:#fbf5e6;overflow:hidden}',
 '#sat-dlg .sat-dob>summary{display:flex;align-items:baseline;gap:8px;padding:9px 14px;cursor:pointer;list-style:none;position:relative;padding-right:36px}',
 '#sat-dlg .sat-dob>summary::-webkit-details-marker{display:none}',
 '#sat-dlg .sat-dob>summary::after{content:"+";position:absolute;right:12px;top:50%;transform:translateY(-50%);font:700 15px var(--sans);color:#5a3f2c}',
 '#sat-dlg .sat-dob[open]>summary::after{content:"−"}',
 '#sat-dlg .sat-dob>summary b{font:700 14px Georgia,serif;color:#2a2418}',
 '#sat-dlg .sat-dob>summary small{font:700 8.5px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:#9a7b4a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#sat-dlg .sat-dob>:not(summary){margin:0!important;border:0!important;border-top:1px dashed #d6c69c!important;border-radius:0!important;box-shadow:none!important}',
 '#sat-dlg .sat-dob dl.sat-tr{padding:10px 14px!important;font-size:12.5px}',
 '#sat-dlg .sat-fala{padding:8px 14px!important}',
 /* avisos do corvo e do sátiro */
 '#ave-dlg{max-width:min(460px,94vw)!important}',
 '#ave-dlg .ad-lista{display:flex;flex-direction:column;gap:6px}',
 '#ave-dlg .ad-msg{padding:8px 10px!important;gap:10px!important;align-items:flex-start}',
 '#ave-dlg .ad-msg>img,#ave-dlg .ad-msg>svg,#ave-dlg .ad-msg>.sat-av,#ave-dlg .ad-msg>:first-child:not(div){width:40px!important;height:40px!important;flex:none}',
 '#ave-dlg .ad-msg ul{margin:4px 0 0 16px!important;font-size:12.5px!important;line-height:1.4}',
 '#ave-dlg .ad-msg b{font-size:14px!important}',
 '#ave-dlg .ad-msg:not(:last-child):not(.ad-aberta){cursor:pointer;opacity:.8}',
 '#ave-dlg .ad-msg:not(:last-child):not(.ad-aberta) ul{display:none!important}',
 '#ave-dlg .ad-msg:not(:last-child):not(.ad-aberta) b::after{content:" ▸";font-size:11px;color:#9a7b4a}',
 '#ave-dlg footer{padding-top:8px!important}'
].join('\n');document.head.appendChild(st);})();


/* Meta do dia com a falange de hoplitas; Diário de bordo com a fogueira à noite (cada foto num lugar só) */
(function(){var st=document.createElement('style');st.id='lat-fotos-css';st.textContent=[
 '#lat-e>#lat-gm>.gm,#lat-e>#lat-db{overflow:hidden}',
 '#lat-e>#lat-gm>.gm::before,#lat-e>#lat-db::before{content:"";display:block;height:70px;margin:-12px -14px 10px;background:var(--lf) var(--lfp,center)/cover no-repeat;border-bottom:2px solid var(--lc);filter:sepia(.12)}',
 '#lat-e>#lat-gm>.gm{--lf:url("img/acampamento/hoplitas.webp");--lfp:center 28%}',
 '#lat-e>#lat-db{--lf:url("img/acampamento/fogueira-noite.webp");--lfp:center 62%}'
].join('\n');document.head.appendChild(st);})();


/* ======================= Painéis expansíveis cobrem todo o centro logo abaixo do frontão =======================
   Ao abrir (pelos botões da placa do frontão), a página volta ao topo e o painel ocupa a coluna do meio inteira,
   do pé do frontão até o rodapé; o frontão com a placa continua à vista para trocar de painel. */
function pdTopo(){var pd=document.getElementById('painel-dir'),f=document.querySelector('#hero-box .neo-frontao');if(!pd)return;var t=0;
 if(f&&f.offsetParent){var r=f.getBoundingClientRect(),pl=f.querySelector('.pd-pilula'),bt=r.bottom;if(pl){bt=Math.max(bt,pl.getBoundingClientRect().bottom);}t=Math.max(0,Math.round(bt+6));}document.documentElement.style.setProperty('--pd-top',t+'px');}
(function(){var era=false,liga=function(){var pd=document.getElementById('painel-dir');if(!pd)return false;
  new MutationObserver(function(){var on=pd.classList.contains('on');if(on&&!era){try{window.scrollTo({top:0,behavior:'instant'});}catch(e){window.scrollTo(0,0);}}era=on;pdTopo();}).observe(pd,{attributes:true,attributeFilter:['class']});return true;};
 var n=0,t=setInterval(function(){if(liga()||++n>20)clearInterval(t);},800);
 window.addEventListener('scroll',function(){if(document.querySelector('#painel-dir.on'))pdTopo();},{passive:true});window.addEventListener('resize',pdTopo);})();
(function(){var st=document.createElement('style');st.id='pd-sob-frontao-css';st.textContent=[
 '@media(min-width:1380px){',
 ' body.com-dia #painel-dir.pd.on .pd-corpo{left:var(--dia-l,300px)!important;right:var(--dia-r,460px)!important}',
 ' body:not(.com-dia) #painel-dir.pd.on .pd-corpo{left:300px!important;right:var(--rail-w,460px)!important}',
 ' #painel-dir.pd.on .pd-corpo{top:var(--pd-top,0px)!important;bottom:71px!important;width:auto!important;max-width:none!important;height:auto!important;transform:none!important;border-radius:12px!important;box-shadow:0 0 0 1px #c9b28a,0 18px 40px -12px rgba(40,25,10,.45)!important;overflow:auto}',
 ' #painel-dir.pd.on .pd-abas{display:none!important}',
 ' #painel-dir.pd.on{pointer-events:none}#painel-dir.pd.on .pd-corpo{pointer-events:auto}',
 '}'
].join('\n');document.head.appendChild(st);})();


/* a placa do frontão abre os painéis (os atalhos antigos só ouviam a barra do alto) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#hero-box .pd-pilula button,#painel-dir .pd-pilula button');if(!b)return;if(b.closest('#painel-dir')&&/sully|s[áa]tiro|einherji/i.test(b.title||'')){return;}
 var k=b.dataset.tt==='fin'?'fin':b.dataset.ic==='laptop'?'lap':b.dataset.ic==='enf'?'enf':null;if(!k)return;e.preventDefault();e.stopImmediatePropagation();
 try{var pd=document.getElementById('painel-dir');if(pd&&pd.classList.contains('on')&&pd.querySelector('[data-pd="'+k+'"][aria-selected="true"]'))pdFecha();else pdAbre(k);}catch(z){}},true);


/* ======================= Painel esquerdo com faixas gregas nas laterais; painéis do centro sem a barra de títulos ======================= */
(function(){var st=document.createElement('style');st.id='nav-grega-css';st.textContent=[
 '@media(min-width:1380px){',
 ' #nav.navdr{background-image:__GK__,__GK__!important;background-repeat:repeat-y!important;background-size:14px 14px!important;background-position:left top,right top!important;background-attachment:scroll!important;padding-left:14px!important;padding-right:14px!important;box-sizing:border-box}',
 '}',
 /* painel aberto no centro: some a barra com os nomes (a placa do frontão já troca); o × fica no canto */
 '#painel-dir.pd.on .pd-top{position:absolute!important;top:10px;right:12px;left:auto!important;height:auto!important;padding:0!important;margin:0!important;border:0!important;background:none!important;z-index:6;width:auto!important}',
 '#painel-dir.pd.on .pd-top .pd-nav{display:none!important}'
].join('\n').split('__GK__').join('url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%3E%3Crect%20width%3D%2214%22%20height%3D%2214%22%20fill%3D%22%23f1e4c6%22/%3E%3Cpath%20d%3D%22M3%200V11H11V4H6V8H8%22%20fill%3D%22none%22%20stroke%3D%22%23c99a3d%22%20stroke-width%3D%221.5%22/%3E%3Cpath%20d%3D%22M0.75%200V14M13.25%200V14%22%20stroke%3D%22%238a6420%22%20stroke-width%3D%221%22/%3E%3C/svg%3E")');document.head.appendChild(st);})();
fioFixo=(function(f0){return function(){f0.apply(this,arguments);try{var nav=document.getElementById('nav');if(nav&&matchMedia('(min-width:1380px)').matches){var r=nav.getBoundingClientRect(),sb=nav.offsetWidth-nav.clientWidth,de=document.documentElement.style;de.setProperty('--fio-l',(Math.max(0,r.left)+14)+'px');de.setProperty('--fio-w',Math.max(160,r.width-sb-28)+'px');}}catch(e){}};})(fioFixo);


/* ======================= Tema alternativo HOTEL VALHALA =======================
   Botão ᛟ ao lado do OP alterna entre Acampamento e Valhala (fica guardado; a troca recarrega a página).
   No Valhala: vocabulário nórdico em toda a interface (Andar 19, Nornas, Saga, Thing, Gjallarhorn, Banquete, Poço de Mímir...),
   paleta azul-noite, madeira e ouro, frisos de escudos no lugar dos dentículos, postes de madeira entalhada no lugar das
   pilastras, entrelaçado no lugar da grega, medalhão do valknut no frontão e vetores nórdicos no lugar das fotos. */
var TV_ON=(function(){try{return localStorage.getItem('astro_tema')==='valhala';}catch(e){return false;}})();
var EG_ON=(function(){try{return localStorage.getItem('astro_tema')==='egito';}catch(e){return false;}})();
var TV_TERMOS=[["Acampamento Meio-Sangue", "Hotel Valhala"], ["Uma flecha de cada vez.", "Uma batalha de cada vez."], ["acampamento Meio-Sangue", "hotel Valhala"], ["uma flecha de cada vez.", "uma batalha de cada vez."], ["Folheto do acampamento", "Folheto do hotel"], ["corvos gêmeos de Apolo", "corvos gêmeos de Odin"], ["folheto do acampamento", "folheto do hotel"], ["Inspeção dos chalés", "Inspeção dos quartos"], ["o jarro guarda tudo", "o poço guarda tudo"], ["Captura da bandeira", "Combate do dia"], ["Captura da Bandeira", "Combate do Dia"], ["inspeção dos chalés", "inspeção dos quartos"], ["captura da bandeira", "combate do dia"], ["captura da Bandeira", "combate do Dia"], ["bandeira capturada", "combate vencido"], ["Campo de arquearia", "Campo de tiro de Ullr"], ["Missões do Oráculo", "Missões das Nornas"], ["acender a fogueira", "servir o banquete"], ["Acender a fogueira", "Servir o banquete"], ["campo de arquearia", "campo de tiro de Ullr"], ["missões do Oráculo", "missões das Nornas"], ["Long Island, N.Y.", "Boston, Mass."], ["Ficha do campista", "Ficha do einherji"], ["Ronda das Harpias", "Ronda das Valquírias"], ["Conselheiro-Chefe", "Thane-Chefe"], ["conselheiro-chefe", "thane-chefe"], ["Píthos de Pandora", "Poço de Mímir"], ["Ariadne · retomar", "Heimdall · retomar"], ["Escudo de Aquiles", "Escudo de Odin"], ["Bússola de Dédalo", "Bússola de Heimdall"], ["long Island, N.Y.", "boston, Mass."], ["ficha do campista", "ficha do einherji"], ["ronda das Harpias", "ronda das Valquírias"], ["conselheiro-Chefe", "thane-Chefe"], ["píthos de Pandora", "poço de Mímir"], ["ariadne · retomar", "heimdall · retomar"], ["escudo de Aquiles", "escudo de Odin"], ["bússola de Dédalo", "bússola de Heimdall"], ["Bússola de Dédalo", "Bússola de Heimdall"], ["BÚSSOLA DE DÉDALO", "BÚSSOLA DE HEIMDALL"], ["Guia do Campista", "Manual do Einherji"], ["Tarefas do Chalé", "Tarefas do Quarto"], ["Bolsa de Dracmas", "Tesouro de Andvari"], ["Tear de Penélope", "Tear de Frigg"], ["Posto de comando", "Mesa do Thane"], ["Mural de Missões", "Mural das Sagas"], ["guia do Campista", "manual do Einherji"], ["tarefas do Chalé", "tarefas do Quarto"], ["bolsa de Dracmas", "tesouro de Andvari"], ["tear de Penélope", "tear de Frigg"], ["posto de comando", "mesa do Thane"], ["mural de Missões", "mural das Sagas"], ["Camp Half-Blood", "Hotel Valhalla"], ["Toque da Concha", "Toque do Gjallarhorn"], ["Diário de bordo", "Saga do dia"], ["Copa dos Chalés", "Placar dos Andares"], ["dracmas de ouro", "marcos de ouro"], ["Sátiro Protetor", "Einherji Guardião"], ["camp Half-Blood", "hotel Valhalla"], ["toque da Concha", "toque do Gjallarhorn"], ["diário de bordo", "saga do dia"], ["copa dos Chalés", "placar dos Andares"], ["sátiro Protetor", "einherji Guardião"], ["Fio de Ariadne", "Novelo de Frigg"], ["corvo de Apolo", "corvo de Odin"], ["fio de Ariadne", "novelo de Frigg"], ["na Casa Grande", "no Saguão"], ["da Casa Grande", "do Saguão"], ["Linha de tiro", "Campo de tiro"], ["arco de Apolo", "lança de Odin"], ["abrir cérebro", "abrir o poço"], ["linha de tiro", "campo de tiro"], ["a Casa Grande", "o Saguão"], ["Astronáutica", "Hotel Valhala"], ["ASTRONÁUTICA", "HOTEL VALHALA"], ["Tênis alados", "Botas de Víðarr"], ["astronáutica", "hotel Valhala"], ["tênis alados", "botas de Víðarr"], ["Long Island", "Boston"], ["acampamento", "hotel"], ["Acampamento", "Hotel"], ["da Fogueira", "do Banquete"], ["da fogueira", "do banquete"], ["na Fogueira", "no Banquete"], ["na fogueira", "no banquete"], ["Casa Grande", "Saguão"], ["long Island", "boston"], ["casa Grande", "saguão"], ["HALF-BLOOD", "VALHALLA"], ["Half-Blood", "Valhalla"], ["Hefesto TV", "Rádio Bifröst"], ["Refeitório", "Salão do Banquete"], ["a Fogueira", "o Banquete"], ["a fogueira", "o banquete"], ["half-Blood", "valhalla"], ["hefesto TV", "rádio Bifröst"], ["refeitório", "salão do Banquete"], ["Chalé VII", "Andar XIX"], ["CHALÉ VII", "ANDAR XIX"], ["campistas", "einherjar"], ["Recreação", "Lazer do Salão"], ["Clepsidra", "Ampulheta de Sól"], ["chalé VII", "andar XIX"], ["recreação", "lazer do Salão"], ["clepsidra", "ampulheta de Sól"], ["campista", "einherji"], ["Campista", "Einherji"], ["Fogueira", "Banquete"], ["fogueira", "banquete"], ["Profecia", "Saga"], ["profecia", "saga"], ["Conselho", "Thing"], ["conselho", "thing"], ["Bunker 9", "Forja de Nidavellir"], ["Alvorada", "Despertar"], ["Pavilhão", "Salão"], ["bunker 9", "forja de Nidavellir"], ["alvorada", "despertar"], ["pavilhão", "salão"], ["Chalé 7", "Andar 19"], ["chalé 7", "andar 19"], ["Harpias", "Valquírias"], ["harpias", "valquírias"], ["Oráculo", "Nornas"], ["oráculo", "nornas"], ["dracmas", "marcos"], ["Dracmas", "Marcos"], ["Esfinge", "Fenrir"], ["Cérebro", "Poço"], ["esfinge", "fenrir"], ["cérebro", "poço"], ["Concha", "Gjallarhorn"], ["concha", "gjallarhorn"], ["Chalés", "Andares"], ["chalés", "andares"], ["sátiro", "einherji"], ["Sátiro", "Einherji"], ["Quíron", "Helgi"], ["Píthos", "Mímir"], ["quíron", "helgi"], ["píthos", "mímir"], ["Chalé", "Quarto"], ["chalé", "quarto"], ["Apolo", "Odin"], ["apolo", "odin"], ["Camp", "Hotel"], ["CAMP", "HOTEL"], ["camp", "hotel"]];
/* termos genéricos (por último) e versões em CAIXA ALTA de todos os termos */
TV_TERMOS=TV_TERMOS.concat([["Hékatos · “o que acerta de longe”", "Sanngetall · “o que acerta a verdade”"], ["Arsenal do Hékatos", "Arsenal do Sanngetall"], ["“Hékatos mira.”", "“Sanngetall mira.”"], ["o Hékatos", "filho de Odin"], ["HÉKATOS", "SANNGETALL"], ["Hékatos", "Sanngetall"], ["Odin · sol, arco, música e cura", "Odin · sabedoria, runas, poesia e batalha"], ["Diário do Semideus", "Diário do Einherji"], ["Semideus", "Einherji"], ["semideus", "einherji"], ["Caduceu de Hermes", "Cajado rúnico de Odin"], ["Céu de Zeus", "Céu de Thor"], ["Hermes Express", "Correio dos Corvos"], ["George e Martha atendem", "Hugin e Munin atendem"], ["Laptop de Dédalo", "Laptop de Blitzen"], ["bússola de dédalo", "bússola de Blitzen"], ["Bússola de Dédalo", "Bússola de Blitzen"], ["Dédalo", "Blitzen"], ["Rumo da Argo", "Rumo do Banana Grande"], ["Trabalhos de Hércules", "Façanhas de Thor"], ["trabalhos de Hércules", "façanhas de Thor"], ["A Hidra de Lerna", "Jörmungandr, a Serpente do Mundo"], ["A corça de Cerineia", "O cervo Eikthyrnir"], ["As aves do Estínfalo", "As águias de Hræsvelgr"], ["O javali de Erimanto", "O javali Sæhrímnir"], ["O leão de Nemeia", "O lobo Fenrir"], ["Os estábulos de Áugias", "Os salões de Útgarda"], ["Lira de casco de tartaruga", "Harpa de Bragi"], ["Flauta de pã", "Flauta de osso"], ["Aspís de madeira e bronze", "Escudo redondo de tília"], ["Xíphos de bronze", "Espada de ferro"], ["Elmo calcídico", "Elmo de ferro"], ["Linotórax", "Cota de malha"], ["Grevas de bronze", "Perneiras de couro"], ["Quíton de campo", "Túnica de lã"], ["Pelte de vime e couro", "Escudo leve de vime"], ["Pílos de feltro", "Gorro de lã"], ["Sandálias de couro cru", "Botas de couro cru"], ["Flechas de ponta de bronze", "Flechas de ponta de ferro"], ["Tabuinhas de Cadmo", "Tábuas rúnicas de Hearthstone"], ["Relógio-escudo de Tyson", "Relógio-escudo de Blitzen"], ["Hotel Júpiter", "Hotel Valhala"]]).concat([['Long Island Sound','Boston'],['Acampamento','Hotel'],['acampamento','hotel'],['Meio-Sangue','Einherji'],['meio-sangue','einherji'],['meio-sangues','einherjar'],['Chalé de Apolo','Andar 19'],['chalé de Apolo','andar 19'],['Chalé','Quarto'],['chalé','quarto'],['Chalés','Quartos'],['chalés','quartos'],['Quíron','Helgi']]);
if(EG_ON&&window.EG_TERMOS)TV_TERMOS=window.EG_TERMOS.slice();
if(TV_ON)TV_TERMOS=[["Vigia de Linceu","Vigia de Heimdall"],["vigia de Linceu","vigia de Heimdall"],["Tracinhos da Cila","Tracinhos de Jörmungandr"],["tracinhos da Cila","tracinhos de Jörmungandr"],["A Cila","Jörmungandr"],["a Cila","Jörmungandr"],["da Cila","de Jörmungandr"],["Cila e Caríbdis","Jörmungandr e o Kraken"],["Cass McCaw · o gêmeo da Polly", "Munin · a memória de Odin"], ["Polly McCaw · corvo de Apolo", "Hugin · o pensamento de Odin"], ["Polly e Cass McCaw, corvos gêmeos de Apolo", "Hugin e Munin, os corvos de Odin"], ["Polly e Cass McCaw", "Hugin e Munin"], ["Polly McCaw, corvo de Apolo", "Hugin, corvo de Odin"], ["Polly McCaw", "Hugin"], ["Cass McCaw", "Munin"], ["os gêmeos McCaw", "Hugin e Munin"], ["gêmeos McCaw", "Hugin e Munin"], ["Sully Brookhaven · sátiro do Hékatos", "Brynn Halvorsen · valquíria do filho de Odin"], ["Sully Brookhaven", "Brynn Halvorsen"], ["Sully · sátiro", "Brynn · valquíria"], ["Sátiro Protetor", "Valquíria Recrutadora"], ["sátiro Protetor", "valquíria Recrutadora"], ["o sátiro", "a valquíria"], ["do sátiro", "da valquíria"], ["ao sátiro", "à valquíria"], ["sátiros", "valquírias"], ["sátiro", "valquíria"], ["Ficha do Sully", "Ficha da Brynn"], ["XP para o Sully", "XP para a Brynn"], ["para o Sully", "para a Brynn"], ["o Sully", "a Brynn"], ["do Sully", "da Brynn"], ["ao Sully", "à Brynn"], ["no Sully", "na Brynn"], ["Sully", "Brynn"], ["Polly", "Hugin"], ["Cass", "Munin"], ["Noite, cara.", "Noite, einherji. Placar do dia:"], ["Bom dia, cara.", "De pé, einherji."], ["Boa tarde, cara.", "Segundo tempo, einherji."], ["Isso é trabalho em equipe, cara.", "Isso é placar de time, einherji."], [", cara!", ", einherji!"], ["mastro de Dodona", "mastro de Yggdrasil"], ["Comitê dos Cascos Fendidos", "Conselho dos Thanes"], ["já está tocando a flauta", "já está batendo a lança no escudo"]].concat(TV_TERMOS);
(function(){var up={};TV_TERMOS.forEach(function(t){up[t[0]]=1;});var ex=[];TV_TERMOS.forEach(function(t){var U=t[0].toUpperCase();if(U!==t[0]&&!up[U]){up[U]=1;ex.push([U,t[1].toUpperCase()]);}});TV_TERMOS=TV_TERMOS.concat(ex);})();
var TV_RX=TV_TERMOS.map(function(t){var e=t[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return [new RegExp('(^|[^0-9A-Za-zÀ-ÿ])'+e+'(?![0-9A-Za-zÀ-ÿ])','g'),t[1]];});
function tvTxt(t){if(!t||t.length<3)return t;var o=t;for(var i=0;i<TV_RX.length;i++){if(o.indexOf(TV_TERMOS[i][0])<0)continue;o=o.replace(TV_RX[i][0],function(m,p){return p+TV_RX[i][1];});}return o;}
/* Valhala: traduz na gravação; texto igual ao da tela não regrava (evita laço gravar-grego / traduzir) */
if(TV_ON||EG_ON){(function(){var d=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');if(!d||!d.set)return;Object.defineProperty(Node.prototype,'textContent',{configurable:true,enumerable:d.enumerable,get:d.get,set:function(v){if(typeof v==='string'&&this.nodeType===1&&!/^(SCRIPT|STYLE|TEXTAREA)$/.test(this.nodeName)){v=tvTxt(v);var c=this.childNodes;if(c.length===1&&c[0].nodeType===3&&c[0].nodeValue===v)return;}d.set.call(this,v);}});})();}
/* Valhala: ícones viram runas do futhark antigo e símbolos nórdicos (Vegvísir, Valknut, Mjölnir, escudo, chifre, drakkar, corvo) */
if(TV_ON){(function(){var S={"solroda": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 3.5v17M3.5 12h17\"/>", "mani": "<path d=\"M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z\"/>", "valknut": "<path d=\"M9 4.5l4.6 8H4.4zM15 4.5l4.6 8h-9.2zM12 10.2l4.6 8H7.4z\"/>", "vegvisir": "<circle cx=\"12\" cy=\"12\" r=\"1.8\"/><path d=\"M15.0 12.0L21.5 12.0M19.0 10.4L19.0 13.6\"/><path d=\"M14.1 14.1L18.7 18.7M18.1 15.8L15.8 18.1\"/><path d=\"M12.0 15.0L12.0 21.5M13.6 19.0L10.4 19.0\"/><path d=\"M9.9 14.1L5.3 18.7M8.2 18.1L5.9 15.8\"/><path d=\"M9.0 12.0L2.5 12.0M5.0 13.6L5.0 10.4\"/><path d=\"M9.9 9.9L5.3 5.3M5.9 8.2L8.2 5.9\"/><path d=\"M12.0 9.0L12.0 2.5M10.4 5.0L13.6 5.0\"/><path d=\"M14.1 9.9L18.7 5.3M15.8 5.9L18.1 8.2\"/>", "mjolnir": "<path d=\"M11 3h2v8h-2z\"/><path d=\"M5.5 11h13l-1.6 6.5c-1.8 2.4-8 2.4-9.8 0z\"/><path d=\"M9 14.5h6\"/>", "elmo": "<path d=\"M5 15c0-5.5 3-10 7-10s7 4.5 7 10z\"/><path d=\"M5 15h14M12 5v13M9.5 18h5\"/>", "machado": "<path d=\"M7 21L16.5 5\"/><path d=\"M14 3.5c3 .3 5.6 2.5 6.5 6.2-2.2.2-4.3-.2-6.2-1.3\"/>", "escudo": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><circle cx=\"12\" cy=\"12\" r=\"2.2\"/><path d=\"M12 3.5v6.3M12 14.2v6.3M3.5 12h6.3M14.2 12h6.3\"/>", "drakkar": "<path d=\"M3 15h18c-1.2 3-4.5 5-9 5s-7.8-2-9-5z\"/><path d=\"M12 15V4M12 5l6 7h-6\"/><path d=\"M3 15c-1.3-2.2-.3-4.5 2-4.5M21 15c1.3-2.2.3-4.5-2-4.5\"/>", "chifre": "<path d=\"M3.5 6.5c7 0 12.5 3.5 15.5 11l2-1C18 8 11.5 4 3.5 4z\"/><path d=\"M3.5 4v2.5M7 5v2M10.5 6v2.5\"/>", "espada": "<path d=\"M12 2.5l1.4 2.5v10.5h-2.8V5z\"/><path d=\"M8 15.5h8M12 15.5V20M10.3 21h3.4\"/>", "arco": "<path d=\"M8 3c8 4 8 14 0 18\"/><path d=\"M8 3v18M4 12h14M15 9l3 3-3 3\"/>", "arvore": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M12 20V7M12 12L7.5 7.5M12 12l4.5-4.5M12 9.5L9.5 5M12 9.5L14.5 5M12 16.5l-4 3.5M12 16.5l4 3.5\"/>", "corvo": "<path d=\"M3.5 14c3-1 5.5-4 9.5-4 3 0 5 1.8 7.5 2-1 2-3.2 3-6 3l-3 5-1-4.5c-2.3 0-4.5-.6-7-1.5z\"/><path d=\"M15 11.6h.01\"/>", "olho": "<path d=\"M3 12c3-4 6-6 9-6s6 2 9 6c-3 4-6 6-9 6s-6-2-9-6z\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/>", "ponte": "<path d=\"M3 19c0-8 4-13 9-13s9 5 9 13M6.5 19c0-5.5 2.5-9.5 5.5-9.5s5.5 4 5.5 9.5M10 19c0-3 1-5 2-5s2 2 2 5\"/>", "cota": "<path d=\"M6 4l6 3 6-3 1.5 7-2.5 9H7L4.5 11z\"/><path d=\"M8 10.5h8M7.5 13.5h9M8 16.5h8\"/>", "r_f": "<path d=\"M0 0V16M0 0L7 4M0 5L7 9\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_u": "<path d=\"M0 16V0L7 5V16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_th": "<path d=\"M0 0V16M0 4L6 8L0 12\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_a": "<path d=\"M0 0V16M0 2L7 6M0 7L7 11\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_r": "<path d=\"M0 0V16M0 0L6 4L0 8L7 16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_k": "<path d=\"M7 3L1 8L7 13\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_g": "<path d=\"M0 2L7 14M7 2L0 14\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_w": "<path d=\"M0 0V16M0 0L6 4L0 8\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_h": "<path d=\"M0 0V16M7 0V16M0 5L7 10\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_n": "<path d=\"M3.5 0V16M0 5L7 10\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_i": "<path d=\"M3.5 0V16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_j": "<path d=\"M3 2L0 6L3 10M4 6L7 10L4 14\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_ei": "<path d=\"M3.5 0V16M3.5 0L7 3M3.5 16L0 13\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_p": "<path d=\"M0 0V16M0 0L4 3L7 0M0 16L4 13L7 16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_z": "<path d=\"M3.5 0V16M0 0L3.5 5L7 0\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_s": "<path d=\"M6 0L1 5L6 10L1 16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_t": "<path d=\"M3.5 0V16M0 4L3.5 0L7 4\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_b": "<path d=\"M0 0V16M0 0L6 4L0 8L6 12L0 16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_e": "<path d=\"M0 0V16M7 0V16M0 0L3.5 5L7 0\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_m": "<path d=\"M0 0V16M7 0V16M0 0L7 7M7 0L0 7\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_l": "<path d=\"M0 0V16M0 0L7 5\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_ng": "<path d=\"M3.5 2L7 8L3.5 14L0 8Z\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_d": "<path d=\"M0 0V16M7 0V16M0 0L7 16M7 0L0 16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>", "r_o": "<path d=\"M0 16L6 8L3.5 2L1 8L7 16\" transform=\"translate(8.5 4)\" stroke-width=\"1.9\"/>"};var M={"CR_IC": {"humor": "r_w", "agua": "r_l", "sono": "r_ng", "mov": "r_r", "ref": "chifre", "gasto": "r_f", "med": "r_u", "hab": "r_j"}, "LAT_IC": {"agenda": "r_d", "clima": "r_s", "musica": "chifre", "sorteio": "r_p", "atalho": "r_e", "resp": "r_a", "livro": "r_o"}, "ARS_IC": {"arco": "arco", "aljava": "r_t", "lamina": "espada", "escudo": "escudo", "couraca": "cota", "elmo": "elmo", "bolsa": "r_f", "sandalia": "r_e", "lira": "chifre"}, "RT_IC": {"concha": "chifre", "insp": "vegvisir", "harpia": "valknut"}, "QA_IC": {"rail-in": "ponte", "lat-orb": "olho", "qa-d-pc": "corvo", "qa-d-nt": "r_a", "qa-d-dj": "r_d"}, "OP_IC": {"sol": "solroda", "chama": "r_k", "balanca": "r_t", "arco": "arco", "asas": "corvo", "carro": "r_e"}, "PD_ICON": {"enf": "r_b", "lap": "vegvisir", "fin": "r_f", "b9": "mjolnir", "sat": "chifre"}, "TEMA_IC": {"sol": "solroda", "lua": "mani"}, "ICO_P": {"cal": "r_d", "graf": "r_t", "pasta": "r_o", "nota": "r_a", "livro": "r_o", "aviao": "r_r", "bussola": "vegvisir", "mapa": "vegvisir", "pino": "r_t", "carrinho": "r_f", "sacola": "r_f", "cartao": "r_f", "moeda": "r_f", "cadeado": "r_th", "aberto": "r_ng", "corrente": "r_n", "f5": "r_w", "f4": "r_j", "f3": "r_i", "f2": "r_n", "f1": "r_th", "lua": "mani", "prato": "chifre", "relogio": "r_j", "alvo": "arco", "medalha": "valknut", "estrela": "r_s", "broto": "r_b", "pilula": "r_b", "saude": "r_u", "tela": "r_a", "jogo": "r_p", "gota": "r_l", "peso": "r_u", "mao": "r_m", "roupa": "cota", "casa": "r_o", "ferramenta": "mjolnir", "sino": "chifre", "coracao": "r_w", "ciclo": "r_j", "mente": "olho", "caixa": "r_o", "pena": "r_a", "fogo": "r_k", "balanca": "r_t"}};var F={"CR_IC": 24, "LAT_IC": 24, "ARS_IC": 24, "RT_IC": 24, "TEMA_IC": 24};
var D={CR_IC:typeof CR_IC!=='undefined'?CR_IC:null,LAT_IC:typeof LAT_IC!=='undefined'?LAT_IC:null,ARS_IC:typeof ARS_IC!=='undefined'?ARS_IC:null,RT_IC:typeof RT_IC!=='undefined'?RT_IC:null,QA_IC:typeof QA_IC!=='undefined'?QA_IC:null,OP_IC:typeof OP_IC!=='undefined'?OP_IC:null,PD_ICON:typeof PD_ICON!=='undefined'?PD_ICON:null,TEMA_IC:typeof TEMA_IC!=='undefined'?TEMA_IC:null,ICO_P:typeof ICO_P!=='undefined'?ICO_P:null};
Object.keys(M).forEach(function(n){var d=D[n];if(!d)return;Object.keys(M[n]).forEach(function(k){if(!(k in d))return;var g=S[M[n][k]];if(!g)return;d[k]=F[n]?'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+g+'</svg>':g;});});
window.VH_SIMB=S;})();}

function tvNo(root){if(!root)return;var _e=root.nodeType===3?root.parentNode:root;if(_e&&_e.closest&&_e.closest('[data-notr]'))return;if(root.nodeType===3){var p=root.parentNode;if(p&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName))return;var n=tvTxt(root.nodeValue);if(n!==root.nodeValue)root.nodeValue=n;return;}
 if(root.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(root.nodeName))return;
 var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),x;while(x=w.nextNode()){var pp=x.parentNode;if(pp&&/^(SCRIPT|STYLE|TEXTAREA)$/.test(pp.nodeName))continue;if(pp&&pp.closest&&pp.closest('[data-notr]'))continue;var v=tvTxt(x.nodeValue);if(v!==x.nodeValue)x.nodeValue=v;}
 var at=root.querySelectorAll?[root].concat([].slice.call(root.querySelectorAll('[title],[placeholder],[aria-label]'))):[];
 at.forEach(function(e){['title','placeholder','aria-label'].forEach(function(a){var v=e.getAttribute&&e.getAttribute(a);if(v){var n2=tvTxt(v);if(n2!==v)e.setAttribute(a,n2);}});});}
function tvBotao(){var r=document.querySelector('#lat-topo>.lt-r2');if(!r)return;var b=document.getElementById('tv-tg');
 if(!b){b=document.createElement('button');b.type='button';b.id='tv-tg';b.className='tv-tg';b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 3v18M4 10h16"/></svg>';
  b.addEventListener('click',function(){try{localStorage.setItem('astro_tema',TV_ON?'egito':EG_ON?'acampamento':'valhala');}catch(e){}location.reload();});}
 b.title=TV_ON?'Tema Casa do Brooklyn (Crônicas dos Kane)':EG_ON?'Voltar ao Acampamento Meio-Sangue':'Tema Hotel Valhala';b.setAttribute('aria-label',b.title);if(b.parentNode!==r)r.appendChild(b);}
setInterval(function(){try{tvBotao();}catch(e){}},1500);setTimeout(function(){try{tvBotao();}catch(e){}},800);
(function(){var st=document.createElement('style');st.id='tv-botao-css';st.textContent=[
 '#lat-topo>.lt-r2>#tv-tg{order:100;flex:none;display:grid!important;place-items:center;width:26px!important;height:24px;margin:0!important;padding:0!important;border:1px solid #1d4a2c!important;border-radius:999px!important;background:#f4ead2!important;color:#1d4a2c!important;cursor:pointer}',
 '#lat-topo>.lt-r2>#tv-tg svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linejoin:round}',
 'body.tv #lat-topo>.lt-r2>#tv-tg{background:#1d4a2c!important;color:#e9c87a!important;border-color:#d4ad4f!important}'
].join('\n');document.head.appendChild(st);})();
if(EG_ON){document.body.classList.add('eg');
 (function(){var fila=[],t=null;var mo=new MutationObserver(function(rs){rs.forEach(function(r){if(r.type==='characterData')fila.push(r.target);else r.addedNodes.forEach(function(n){fila.push(n);});});
  if(t)return;t=setTimeout(function(){t=null;var f=fila;fila=[];mo.disconnect();try{f.forEach(tvNo);}catch(e){}mo.observe(document.body,{childList:true,subtree:true,characterData:true});},120);});
  tvNo(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true});
  setTimeout(function(){mo.disconnect();tvNo(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true});},3000);})();
 try{document.title=tvTxt(document.title);}catch(e){}}
if(TV_ON){document.body.classList.add('tv');
 (function(){var fila=[],t=null;var mo=new MutationObserver(function(rs){rs.forEach(function(r){if(r.type==='characterData')fila.push(r.target);else r.addedNodes.forEach(function(n){fila.push(n);});});
  if(t)return;t=setTimeout(function(){t=null;var f=fila;fila=[];mo.disconnect();try{f.forEach(tvNo);}catch(e){}mo.observe(document.body,{childList:true,subtree:true,characterData:true});},120);});
  tvNo(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true});
  setTimeout(function(){mo.disconnect();tvNo(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true});},3000);})();
 try{document.title=tvTxt(document.title);}catch(e){}
 var I=function(n){return 'url("img/acampamento/'+n+'")';};
 try{['.op-l','.op-col1','.op-fazer','.op-estudo'].forEach(function(k,i){if(OP_TEMPLO[k]){OP_TEMPLO[k].img=['vh-sol.svg','vh-martelo.svg','vh-fuso.svg','vh-olho.svg'][i];OP_TEMPLO[k].c='#d9c58a';OP_TEMPLO[k].k='#1d4a2c';}});}catch(e){}
 (function(){var st=document.createElement('style');st.id='tv-css';st.textContent=[
  /* paleta */
  'body.tv{--n-frontao:#b08a2e;--n-entab:#1d4a2c;--n-colun:#8e2a2a;--n-atrio:#3f5a3a;--n-tesouro:#b08a2e;background-color:#e9e6d6!important}',
  'body.tv .neo-moldura{--col-k:#1d4a2c!important;--col-c:#d9c58a!important;--neo-ent:'+I('vh-escudos.svg')+'!important;--neo-cap:'+I('vh-capitel.svg')+'!important;--neo-fuste:'+I('vh-fuste.svg')+'!important;--neo-base:'+I('vh-base.svg')+'!important}',
  'body.tv .wrap>.tb.neo-moldura{--col-k:#1d4a2c!important}body.tv .wrap>.rt.neo-moldura{--col-k:#8e2a2a!important}',
  'body.tv #tp-real>:is(#tm-painel,#recreio){--col-k:#3f5a3a!important;--col-c:#cfd8bd!important}',
  /* frontão: telhado de escudos dourados, tímpano azul-noite, valknut */
  'body.tv #hero-box .nf2 .nf-tri path.t3{fill:#1d4a2c!important}body.tv #hero-box .nf2 .nf-tri path.t2{fill:#d4ad4f!important}',
  'body.tv #hero-box .nf2 .nf-txt{color:#e9c87a!important;text-shadow:0 1px 0 rgba(0,0,0,.5)!important}',
  'body.tv #hero-box .nf2 .nf-louro,body.tv #hero-box .nf2 .nf-acro{display:none!important}',
  'body.tv #hero-box .nf2 .fr-lira{content:'+I('vh-bindrune.svg')+';box-shadow:0 0 0 3px #1d4a2c,0 0 0 4.5px #d4ad4f!important}',
  'body.tv #hero-box .nf2 .nf-c2{background:radial-gradient(circle at 50% 50%,#d4ad4f 0 3px,#8a6a1e 3px 4px,transparent 4.5px) 0 0/12px 8px,#1d4a2c!important}',
  'body.tv #hero-box .nf2>.pd-pilula{border-color:#d4ad4f!important;background:linear-gradient(180deg,#256139,#143a22)!important;box-shadow:0 0 0 3px #1d4a2c,0 0 0 4.5px #d4ad4f,0 6px 12px -6px rgba(0,0,0,.6)!important}',
  'body.tv #hero-box .nf2>.pd-pilula button{color:#e9c87a!important;border-left-color:#3f6f4a!important}',
  /* banner: entrelaçado no lugar da grega */
  'body.tv #hero-box .vx-hero::after{-webkit-mask-image:'+I('vh-no.svg')+'!important;mask-image:'+I('vh-no.svg')+'!important;-webkit-mask-size:24px 24px!important;mask-size:24px 24px!important;background:#1d4a2c!important}',
  'body.tv #hero-box .vx-hero h2{color:#143a22!important}',
  /* painel esquerdo: faixas de entrelaçado */
  '@media(min-width:1380px){body.tv #nav.navdr{background-image:'+I('vh-no-v.svg')+','+I('vh-no-v.svg')+'!important;background-size:14px 24px!important}}',
  /* placas e cartões: ouro sobre azul */
  'body.tv h2.sec.neo-tit.placa-tom,body.tv #tp-real>:is(#tm-painel,#recreio)>.tm-cab{--pk:#1d4a2c}',
  'body.tv #lat-e>:is(#lat-arena,#lat-band,#lat-cp,#lat-db),body.tv #lat-e>#lat-gm>.gm{--lc:#1d4a2c}',
  'body.tv #lat-e>#lat-db{--lc:#8e2a2a}body.tv #lat-e>#lat-arena{--lc:#b08a2e}',
  /* vetores nórdicos no lugar das fotos (um por lugar) */
  'body.tv #mm-box .mm-chale{--mm-img:'+I('vh-salao.svg')+'!important;--mm-pos:center}body.tv #mm-box .mm-quest{--mm-img:'+I('vh-machado.svg')+'!important;--mm-pos:center}',
  'body.tv #mm-box .mm-gab{--mm-img:'+I('vh-corvo.svg')+'!important;--mm-pos:center}body.tv #mm-box .mm-orac-col{--mm-img:'+I('vh-yggdrasil.svg')+'!important;--mm-pos:center}',
  'body.tv #mm-box .mm-prof{--mm-img:'+I('vh-drakkar.svg')+'!important;--mm-pos:center}',
  'body.tv #mm-box :is(.mm-col,.mm-gab)::before{filter:none!important}',
  'body.tv #rt-box .rt-concha{--rt-img:'+I('vh-chifre.svg')+'!important}body.tv #rt-box .rt-insp{--rt-img:'+I('vh-tocha.svg')+'!important}body.tv #rt-box .rt-harp{--rt-img:'+I('vh-asa.svg')+'!important}',
  'body.tv #rt-box :is(.rt-concha,.rt-insp,.rt-harp)::before{background-position:center!important;filter:none!important}',
  'body.tv #lat-apt{--c-img:'+I('vh-lancas.svg')+'!important}body.tv #lat-rec{--c-img:'+I('vh-caneca.svg')+'!important}body.tv #lat-cv{--c-img:'+I('vh-harpa.svg')+'!important}',
  'body.tv #lat-ars{--c-img:'+I('vh-escudo.svg')+'!important}body.tv #lat-arena{--c-img:'+I('vh-runas.svg')+'!important}',
  'body.tv :is(#lat-apt,#lat-rec,#lat-cv,#lat-ars,#lat-arena)::before{background-position:center!important;filter:none!important}',
  'body.tv #lat-e>#lat-gm>.gm{--lf:'+I('vh-elmo.svg')+';--lfp:center}body.tv #lat-e>#lat-db{--lf:'+I('vh-livro.svg')+';--lfp:center}',
  'body.tv #lat-e>#lat-gm>.gm::before,body.tv #lat-e>#lat-db::before{filter:none!important}',
  /* fogueira do rodapé vira o salão do banquete; Concha do friso */
  'body.tv #rod-apps .rod-fogo .fg-ic{background-image:'+I('vh-valknut.svg')+'!important;background-size:cover!important;border-radius:6px!important}',
  'body.tv #hero-box#hero-box .vx-hero.bn2 .bn-id .cp-guia::before{content:"folheto do hotel · andar 19"!important}',
  'body.tv #modo-op .op-templo{--t-cap:'+I('vh-capitel.svg')+'!important;--t-fuste:'+I('vh-fuste.svg')+'!important;--t-base:'+I('vh-base.svg')+'!important;--t-ent:'+I('vh-escudos.svg')+'!important;--t-k:#1d4a2c!important}',
  'body.tv #hero-box .nf2 .nf-tri path.t3{fill:#1d4a2c!important}',
  'body.tv #hero-box .vx-hero{background:radial-gradient(ellipse at 30% 20%,rgba(255,255,255,.35),transparent 60%),linear-gradient(135deg,#f1ecd8,#e4dcc0)!important}',
  'body.tv #hero-box .vx-hero h2{font-family:Georgia,serif!important;letter-spacing:.01em}',
  /* postal */
  'body.tv #hero-box .cp-postal .fr{background:linear-gradient(rgba(10,15,30,.35),rgba(10,15,30,.55)),'+I('vh-salao.svg')+' center/cover!important}'
 ].join('\n');document.head.appendChild(st);})();
}


/* ======================= Valhala: frontão em arquitetura nórdica (empena de stavkirke) e adornos =======================
   Empena íngreme de telhas em escama, beiral dourado, tábuas cruzadas com cabeças de dragão no alto, viga de entrelaçado,
   medalhão com runa-amarração (desenho próprio) e entrelaçado no lugar da grega também nas placas e no Posto. */
function tvFrontao(){if(!TV_ON)return;var f=document.querySelector('#hero-box .neo-frontao.nf2');if(!f)return;var l0=f.querySelector('.fr-lira');if(l0&&l0.tagName==='IMG'&&l0.getAttribute('src')!=='img/acampamento/vh-bindrune-hotel.svg')l0.src='img/acampamento/vh-bindrune-hotel.svg';if(f.querySelector('.vh-front'))return;
 var d=document.createElement('div');d.className='vh-front';d.setAttribute('aria-hidden','true');d.innerHTML='<i class="vh-beiral"></i><i class="vh-telhado"></i><i class="vh-chifres"></i><i class="vh-viga"></i>';f.insertBefore(d,f.firstChild);
 var l=f.querySelector('.fr-lira');}
if(TV_ON){setInterval(function(){try{tvFrontao();}catch(e){}},1200);setTimeout(function(){try{tvFrontao();}catch(e){}},700);
 (function(){var I=function(n){return 'url("img/acampamento/'+n+'")';};var st=document.createElement('style');st.id='tv-nordico-css';st.textContent=[
  'body.tv #hero-box .nf2 .nf-tri,body.tv #hero-box .nf2 .nf-cornija,body.tv #hero-box .nf2 .nf-acro,body.tv #hero-box .nf2 .nf-louro{display:none!important}',
  'body.tv #hero-box .neo-frontao.nf2{height:120px!important;margin-top:34px!important}',
  'body.tv .vh-front{position:absolute;inset:0;pointer-events:none}',
  'body.tv .vh-beiral{position:absolute;left:-4px;right:-4px;top:0;height:102px;background:linear-gradient(180deg,#e9c870,#b58a2e);clip-path:polygon(0 100%,50% 0,100% 100%);filter:drop-shadow(0 3px 2px rgba(0,0,0,.3))}',
  'body.tv .vh-telhado{position:absolute;left:14px;right:14px;top:10px;height:92px;background:'+I('vh-telha.svg')+' 0 0/24px 16px repeat,#123321;clip-path:polygon(0 100%,50% 0,100% 100%)}',
  'body.tv .vh-chifres{position:absolute;left:50%;top:-34px;width:150px;height:76px;transform:translateX(-50%);background:'+I('vh-chifres.svg')+' center/contain no-repeat;filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))}',
  'body.tv .vh-viga{position:absolute;left:-6px;right:-6px;top:100px;height:18px;background:'+I('vh-no-h.svg')+' 0 0/32px 16px repeat-x,#1d4a2c;border:1px solid #8a6a1e;box-shadow:0 2px 0 #b58a2e}',
  'body.tv #hero-box .nf2 .fr-lira{top:4px!important;width:52px!important;height:52px!important;background:none!important;box-shadow:0 0 0 3px #123321,0 0 0 5px #d4ad4f!important}',
  'body.tv #hero-box .nf2 .nf-txt{top:58px!important;padding:4px 6px 4px 12px;font-size:13px!important;letter-spacing:.42em!important;color:#f3d88a!important;background:#123321;border:1px solid #d4ad4f;box-shadow:0 0 0 2px #123321;text-shadow:none!important}',
  'body.tv #hero-box .nf2 .nf-txt-l{right:calc(50% + 70px)!important}body.tv #hero-box .nf2 .nf-txt-r{left:calc(50% + 70px)!important}',
  'body.tv #hero-box .nf2>.pd-pilula{top:96px!important}',
  /* placas e réguas com entrelaçado */
  'body.tv h2.sec.neo-tit.placa-tom,body.tv #tp-real>:is(#tm-painel,#recreio)>.tm-cab{border-color:#d4ad4f!important;background:linear-gradient(180deg,#256139,#1d4a2c)!important;color:#f3e6c4!important;box-shadow:0 0 0 3px #123321,0 0 0 4.5px #d4ad4f!important}',
  'body.tv h2.sec.neo-tit.placa-tom>span,body.tv #tp-real .tm-cab .tp-placa button{color:#e9c870!important}',
  'body.tv #tp-real .tm-cab .tp-placa button[aria-pressed="true"],body.tv #tp-real .tm-cab .tp-placa .on{color:#fff!important}',
  'body.tv #modo-op .op-gr,body.tv #modo-op>header+*{background-image:'+I('vh-no-h.svg')+'!important}',
  'body.tv #tp-friso{background:'+I('vh-no-h.svg')+' 0 100%/32px 16px repeat-x,#f3ecd6!important;padding-bottom:16px!important}'
 ].join('\n');document.head.appendChild(st);})();}



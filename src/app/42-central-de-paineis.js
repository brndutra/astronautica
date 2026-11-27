/* ======================= Central: as três telas do templo, o Manual e os seis painéis como abas =======================
   Mural · Programação · Rastreio · Manual · Concurso · Instruções · Leitura · Enfermaria · Finanças · Projetos.
   Cada aba tem nome base (igual em todos os temas) e, embaixo, o nome do tema quando houver.
   Os painéis continuam sendo os mesmos (mesmo código e mesmos campos). A moldura de todas as abas é o próprio
   templo do tema, e a barra fica na cornija do frontão: os dois são do 43 (ctMoldura). pdAbre/pdFecha (09) e
   euSoloAbre (33) chamam ctPinta, que marca o painel lateral como folha da central. */
var CT_ABAS=[['mural','Mural',''],['prog','Programação',''],['rast','Rastreio',''],['manual','Manual',''],['conc','Concurso',''],['inst','Instruções',''],['ler','Leitura','Eumátheia'],['enf','Enfermaria',''],
 ['fin','Finanças',TV_ON?'Tesouro de Andvari':EG_ON?'Tesouro do Faraó':'Bolsa de Dracmas'],['b9','Projetos',TV_ON?'Forja de Nidavellir':EG_ON?'Oficina de Ptah':'Bunker 9']];
var CT_PD=['conc','inst','ler','enf','fin','b9'],CT_TP=['mural','prog','rast'];
function ctIcone(k){var eu=(typeof EU_BTS!=='undefined')?EU_BTS.filter(function(x){return x[0]===k;})[0]:null;if(eu)return eu[2];
 var p=k==='mural'?'<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>':k==='prog'?'<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4M9 10v10M15 10v10"/>':k==='rast'?'<path d="M4 19V5M4 19h16"/><path d="M7 15l4-4 3 3 5-6"/>':k==='manual'?'<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8 12h8M8 15h8M8 18h5"/>':(typeof PD_ICON!=='undefined'&&PD_ICON[k])||'';
 return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';}
/* nome do tema embaixo (Mural e Programação pegam o nome das telas do templo, quando o tema troca) */
function ctSub(a){var n=typeof ABAS_NOMES!=='undefined'?ABAS_NOMES:{};var t=a[0]==='mural'?n.vis:a[0]==='prog'?n.prog:a[2];return t&&t!==a[1]?t:'';}
function ctAbasHTML(at){return CT_ABAS.map(function(a){var sb=ctSub(a);return '<button type="button" role="tab" data-ct="'+a[0]+'" aria-selected="'+(a[0]===at)+'">'+ctIcone(a[0])+
 '<span><b>'+esc(a[1])+'</b>'+(sb?'<small>'+esc(sb)+'</small>':'')+'</span></button>';}).join('');}
/* aba ativa do painel lateral: os três de estudo moram no Laptop */
function ctAtiva(){var pd=document.getElementById('painel-dir');if(!pd||!pd.classList.contains('on'))return null;
 var b=pd.querySelector('.pd-nb[aria-selected="true"]')||pd.querySelector('[data-pd][aria-selected="true"]'),k=b&&b.getAttribute('data-pd');
 if(k==='lap')return (pd.classList.contains('eu-um')&&pd.dataset.euk)||'conc';return k;}
function ctPinta(){var pd=document.getElementById('painel-dir');if(!pd)return;var k=ctAtiva();pd.classList.toggle('central',!!k&&CT_PD.indexOf(k)>=0);try{ctMoldura();}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-ct]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(b.getAttribute('aria-selected')==='true')return;var k=b.getAttribute('data-ct'),pd=document.getElementById('painel-dir');
 if(CT_TP.indexOf(k)>=0){try{pdFecha();}catch(z){}try{var cx0=document.getElementById('cx');if(cx0&&cx0.classList.contains('on'))cxFecha();}catch(z){}ctTemploAbre(k);return;}
 ctTemploFecha();
 if(k==='manual'){try{pdFecha();}catch(z){}mfAbre();try{ctMoldura();}catch(z){}return;}
 try{var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on'))cxFecha();}catch(z){}
 if(pd){pd.classList.remove('eu-um');delete pd.dataset.euk;}
 if(k==='conc'||k==='inst'||k==='ler')euSoloAbre(k);else pdAbre(k);try{ctMoldura();}catch(z){}},true);
/* Templo: Mural, Programação e Rastreio abrem por cima do operacional (body.ct-templo; no Rastreio, também body.ct-rast).
   Mural e Programação são as duas telas do templo (bnTelaSet, no 31); o Rastreio sai de baixo do templo e entra no miolo. */
function ctTemploAbre(k){k=k||(BN_TELA==='prog'?'prog':'mural');var B=document.body;B.classList.toggle('ct-rast',k==='rast');
 if((BN_TELA==='prog')!==(k==='prog'))bnTelaSet(k==='prog'?'prog':'visao');
 B.classList.add('ct-templo');try{ctMoldura();}catch(e){}}
function ctTemploFecha(){document.body.classList.remove('ct-templo','ct-rast');try{ctMoldura();}catch(e){}}
/* fechar a central inteira (fundo escuro, ✕ e Esc): Templo, Manual e painel */
function ctFecha(){ctTemploFecha();try{var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on')&&cx.classList.contains('mf'))cxFecha();}catch(e){}
 try{var pd=document.getElementById('painel-dir');if(pd&&pd.classList.contains('central'))pdFecha();}catch(e){}try{ctMoldura();}catch(e){}}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('ct-on')&&!document.querySelector('dialog[open]'))ctFecha();});
/* o botão "templo completo" do operacional abre o templo do mesmo jeito */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#modo-op [data-opsair]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();ctTemploAbre();},true);

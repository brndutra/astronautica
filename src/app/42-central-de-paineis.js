/* ======================= Central: Templo, Manual e os seis painéis como abas =======================
   Templo · Manual · Concurso · Instruções · Leitura · Enfermaria · Finanças · Projetos.
   Cada aba tem nome base (igual em todos os temas) e, embaixo, o nome do tema quando houver.
   Os painéis continuam sendo os mesmos (mesmo código e mesmos campos). A moldura de todas as abas é o próprio
   templo do tema, e a barra fica na cornija do frontão: os dois são do 43 (ctMoldura). pdAbre/pdFecha (09) e
   euSoloAbre (33) chamam ctPinta, que marca o painel lateral como folha da central. */
var CT_ABAS=[['templo','Templo',''],['manual','Manual',''],['conc','Concurso',''],['inst','Instruções',''],['ler','Leitura','Eumátheia'],['enf','Enfermaria',''],
 ['fin','Finanças',TV_ON?'Tesouro de Andvari':EG_ON?'Tesouro do Faraó':'Bolsa de Dracmas'],['b9','Projetos',TV_ON?'Forja de Nidavellir':EG_ON?'Oficina de Ptah':'Bunker 9']];
var CT_PD=['conc','inst','ler','enf','fin','b9'];
function ctIcone(k){var eu=(typeof EU_BTS!=='undefined')?EU_BTS.filter(function(x){return x[0]===k;})[0]:null;if(eu)return eu[2];
 var p=k==='templo'?'<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>':k==='manual'?'<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8 12h8M8 15h8M8 18h5"/>':(typeof PD_ICON!=='undefined'&&PD_ICON[k])||'';
 return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';}
function ctAbasHTML(at){return CT_ABAS.map(function(a){var x='<button type="button" role="tab" data-ct="'+a[0]+'" aria-selected="'+(a[0]===at)+'">'+ctIcone(a[0])+
 '<span><b>'+esc(a[1])+'</b>'+(a[2]?'<small>'+esc(a[2])+'</small>':'')+'</span></button>';
 /* na aba Templo, as duas telas do templo (Mural e Programação) ficam logo ao lado, no lugar da placa do frontão */
 if(a[0]==='templo'&&at==='templo'&&typeof ABAS_NOMES!=='undefined')x+='<span class="ct-telas">'+[['visao',ABAS_NOMES.vis],['prog',ABAS_NOMES.prog]].map(function(t){
  return '<button type="button" data-bntela="'+t[0]+'" aria-selected="'+((BN_TELA==='prog')===(t[0]==='prog'))+'">'+esc(t[1])+'</button>';}).join('<i>·</i>')+'</span>';
 return x;}).join('');}
/* aba ativa do painel lateral: os três de estudo moram no Laptop */
function ctAtiva(){var pd=document.getElementById('painel-dir');if(!pd||!pd.classList.contains('on'))return null;
 var b=pd.querySelector('.pd-nb[aria-selected="true"]')||pd.querySelector('[data-pd][aria-selected="true"]'),k=b&&b.getAttribute('data-pd');
 if(k==='lap')return (pd.classList.contains('eu-um')&&pd.dataset.euk)||'conc';return k;}
function ctPinta(){var pd=document.getElementById('painel-dir');if(!pd)return;var k=ctAtiva();pd.classList.toggle('central',!!k&&CT_PD.indexOf(k)>=0);try{ctMoldura();}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-ct]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(b.getAttribute('aria-selected')==='true')return;var k=b.getAttribute('data-ct'),pd=document.getElementById('painel-dir');
 if(k==='templo'){try{pdFecha();}catch(z){}try{cxFecha();}catch(z){}ctTemploAbre();return;}
 ctTemploFecha();
 if(k==='manual'){try{pdFecha();}catch(z){}mfAbre();try{ctMoldura();}catch(z){}return;}
 try{var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on'))cxFecha();}catch(z){}
 if(pd){pd.classList.remove('eu-um');delete pd.dataset.euk;}
 if(k==='conc'||k==='inst'||k==='ler')euSoloAbre(k);else pdAbre(k);try{ctMoldura();}catch(z){}},true);
/* Templo: a página do templo abre como aba da central, por cima do operacional (body.ct-templo). Fechar volta ao operacional. */
function ctTemploAbre(){document.body.classList.add('ct-templo');try{ctMoldura();}catch(e){}var w=document.querySelector('.wrap');if(w)w.scrollTop=0;}
function ctTemploFecha(){document.body.classList.remove('ct-templo');try{ctMoldura();}catch(e){}}
/* fechar a central inteira (fundo escuro, ✕ e Esc): Templo, Manual e painel */
function ctFecha(){ctTemploFecha();try{var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on')&&cx.classList.contains('mf'))cxFecha();}catch(e){}
 try{var pd=document.getElementById('painel-dir');if(pd&&pd.classList.contains('central'))pdFecha();}catch(e){}try{ctMoldura();}catch(e){}}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('ct-on')&&!document.querySelector('dialog[open]'))ctFecha();});
/* o botão "templo completo" do operacional abre o templo do mesmo jeito */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#modo-op [data-opsair]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();ctTemploAbre();},true);

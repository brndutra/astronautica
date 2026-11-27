/* ======================= Central: Manual e os seis painéis como abas =======================
   Manual · Concurso · Instruções · Leitura · Enfermaria · Finanças · Projetos.
   Cada aba tem nome base (igual em todos os temas) e, embaixo, o nome do tema quando houver.
   Os painéis continuam sendo os mesmos (mesmo código e mesmos campos): com um deles aberto, o painel
   lateral vira uma folha centralizada (classe .central) com esta barra no topo. O Manual desenha a mesma
   barra no começo do seu HTML (mfHTML, no 36). pdAbre/pdFecha (09) e euSoloAbre (33) chamam ctPinta. */
var CT_ABAS=[['templo','Templo',''],['manual','Manual',''],['conc','Concurso',''],['inst','Instruções',''],['ler','Leitura','Eumátheia'],['enf','Enfermaria',''],
 ['fin','Finanças',TV_ON?'Tesouro de Andvari':EG_ON?'Tesouro do Faraó':'Bolsa de Dracmas'],['b9','Projetos',TV_ON?'Forja de Nidavellir':EG_ON?'Oficina de Ptah':'Bunker 9']];
var CT_PD=['conc','inst','ler','enf','fin','b9'];
function ctIcone(k){var eu=(typeof EU_BTS!=='undefined')?EU_BTS.filter(function(x){return x[0]===k;})[0]:null;if(eu)return eu[2];
 var p=k==='templo'?'<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>':k==='manual'?'<path d="M5 4h10l4 4v12H5z"/><path d="M15 4v4h4M8 12h8M8 15h8M8 18h5"/>':(typeof PD_ICON!=='undefined'&&PD_ICON[k])||'';
 return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';}
function ctAbasHTML(at){return CT_ABAS.map(function(a){return '<button type="button" role="tab" data-ct="'+a[0]+'" aria-selected="'+(a[0]===at)+'">'+ctIcone(a[0])+
 '<span><b>'+esc(a[1])+'</b>'+(a[2]?'<small>'+esc(a[2])+'</small>':'')+'</span></button>';}).join('');}
/* aba ativa do painel lateral: os três de estudo moram no Laptop */
function ctAtiva(){var pd=document.getElementById('painel-dir');if(!pd||!pd.classList.contains('on'))return null;
 var b=pd.querySelector('.pd-nb[aria-selected="true"]')||pd.querySelector('[data-pd][aria-selected="true"]'),k=b&&b.getAttribute('data-pd');
 if(k==='lap')return (pd.classList.contains('eu-um')&&pd.dataset.euk)||'conc';return k;}
function ctPinta(){var pd=document.getElementById('painel-dir');if(!pd)return;var k=ctAtiva(),cen=!!k&&CT_PD.indexOf(k)>=0;pd.classList.toggle('central',cen);
 var c=pd.querySelector('.pd-corpo');if(!c)return;var bar=c.querySelector(':scope>.ct-abas');if(!cen){if(bar)bar.remove();return;}
 if(!bar){bar=document.createElement('nav');bar.className='ct-abas';bar.setAttribute('role','tablist');bar.setAttribute('data-notr','');c.insertBefore(bar,c.firstChild);}
 var h=ctAbasHTML(k);if(bar._h!==h){bar.innerHTML=h;bar._h=h;}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-ct]');if(!b)return;e.preventDefault();e.stopPropagation();
 if(b.getAttribute('aria-selected')==='true')return;var k=b.getAttribute('data-ct'),pd=document.getElementById('painel-dir');
 if(k==='templo'){try{pdFecha();}catch(z){}try{cxFecha();}catch(z){}ctTemploAbre();return;}
 ctTemploFecha();
 if(k==='manual'){try{pdFecha();}catch(z){}mfAbre();return;}
 try{var cx=document.getElementById('cx');if(cx&&cx.classList.contains('on'))cxFecha();}catch(z){}
 if(pd){pd.classList.remove('eu-um');delete pd.dataset.euk;}
 if(k==='conc'||k==='inst'||k==='ler')euSoloAbre(k);else pdAbre(k);},true);
/* clicar no fundo escuro fora da folha fecha a central */
document.addEventListener('click',function(e){var pd=document.getElementById('painel-dir');if(pd&&e.target===pd&&pd.classList.contains('central'))pdFecha();});
/* Templo: a página do templo abre como folha da central, por cima do operacional (body.ct-templo):
   a .wrap vira a folha centralizada, com fundo escuro e a barra da central no topo. Fechar volta ao operacional. */
function ctTemploAbre(){var n=document.getElementById('ct-templo');
 if(!n){n=document.createElement('div');n.id='ct-templo';n.setAttribute('data-notr','');n.innerHTML='<nav class="ct-abas" role="tablist">'+ctAbasHTML('templo')+'</nav><button type="button" class="ct-tx" aria-label="fechar">✕</button>';document.body.appendChild(n);
  n.addEventListener('click',function(e){if(e.target===n||e.target.closest('.ct-tx'))ctTemploFecha();});}
 document.body.classList.add('ct-templo');var w=document.querySelector('.wrap');if(w)w.scrollTop=0;}
function ctTemploFecha(){document.body.classList.remove('ct-templo');}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('ct-templo')&&!document.querySelector('dialog[open]'))ctTemploFecha();});
/* o botão "templo completo" do operacional abre o templo do mesmo jeito */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#modo-op [data-opsair]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();ctTemploAbre();},true);

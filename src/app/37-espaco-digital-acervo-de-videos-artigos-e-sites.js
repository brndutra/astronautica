/* ===== Espaço digital: acervo de vídeos, artigos e sites; pastas do Drive; faxina; nome de arquivo ===== */
var DG_TP={video:'vídeo',artigo:'artigo',site:'site',curso:'curso',podcast:'podcast',doc:'documento'};
var DG_ST={quero:'quero ver',vendo:'em andamento',visto:'visto'};
var DG_COR={azul:['#6f9fd8','estudo'],menta:['#7cc7a8','projetos'],lavanda:['#b39ddb','pessoal'],amarelo:['#e6c56e','importante'],cinza:['#9a9a9a','arquivo']};
var DG_FX_S=['abrir a pasta Downloads','separar o que fica','mover o importante para a pasta certa','apagar o resto'];
var DG_FX_K=['ter uma pasta principal','seguir a estrutura de pastas numeradas','usar nomes padronizados','salvar cada arquivo na pasta certa','tirar as duplicatas','fazer backup do que importa','revisar e limpar sempre','manter simples e constante'];
var DG_FX_M=['apagar arquivos inúteis','organizar o que chegou','renomear o que está fora do padrão','conferir o backup na nuvem','esvaziar a lixeira','ver o espaço usado'];
function dgD(){var m=mfD();m.dg=m.dg||{};var g=m.dg;g.links=g.links||[];g.pastas=g.pastas||[];g.fx=g.fx||{ck:{}};g.fx.ck=g.fx.ck||{};return g;}
function dgTipo(u){u=String(u||'').toLowerCase();if(/youtu\.?be|vimeo|tiktok|instagram\.com\/reel/.test(u))return 'video';if(/spotify|podcast|anchor\.fm/.test(u))return 'podcast';if(/docs\.google|drive\.google\.com\/file/.test(u))return 'doc';if(/\.pdf($|\?)|scielo|jusbrasil|conjur|migalhas|medium\.com|substack/.test(u))return 'artigo';if(/udemy|coursera|alura|hotmart|estrategia|gran/.test(u))return 'curso';return 'site';}
function dgHost(u){try{return new URL(u).hostname.replace(/^www\./,'');}catch(e){return u;}}
function dgDias(d){if(!d)return null;return Math.round((new Date(hoje()+'T12:00:00')-new Date(d+'T12:00:00'))/864e5);}
function dgNorm(u){u=String(u||'').trim();if(u&&!/^https?:\/\//i.test(u))u='https://'+u;return u;}
function dgPagina(){var g=dgD(),ab=CX.st.dg||'acervo',h='<h3>Espaço digital</h3><p class="mf-d">Um lugar só para o que você quer ver, ler e guardar, e para as pastas que você usa. Organizar hoje é achar fácil amanhã.</p>'+
 '<div class="mf-vis">'+[['acervo','acervo · vídeos, artigos, sites'],['pastas','pastas do Drive'],['faxina','faxina'],['nome','nome de arquivo']].map(function(x){return '<button type="button" data-dgab="'+x[0]+'"'+(ab===x[0]?' class="on"':'')+'>'+x[1]+'</button>';}).join('')+'</div>';
 if(ab==='acervo'){var f=CX.st.dgf||'',fs=CX.st.dgs||'',q=(CX.st.dgq||'').toLowerCase(),L=g.links.filter(function(x){return (!f||x.tp===f)&&(!fs||x.st===fs)&&(!q||(x.t+' '+(x.as||'')+' '+(x.n||'')+' '+x.u).toLowerCase().indexOf(q)>=0);});
  h+='<div class="mf-add"><input data-dgin="url" maxlength="400" placeholder="cole o link (vídeo, artigo, site) · Enter"><input data-dgin="as" maxlength="40" placeholder="assunto (opcional)" style="flex:0 1 200px"><button type="button" class="cx-pri" data-dg="add">guardar</button></div>'+
   '<div class="dg-fil"><input name="dgq" maxlength="60" placeholder="buscar" value="'+esc(CX.st.dgq||'')+'" style="flex:1 1 180px">'+
   '<span>'+['', 'video','artigo','site','curso','podcast','doc'].map(function(k){return '<button type="button" data-dgf="'+k+'"'+(f===k?' class="on"':'')+'>'+(k?DG_TP[k]:'todos')+'</button>';}).join('')+'</span>'+
   '<span>'+['','quero','vendo','visto'].map(function(k){return '<button type="button" data-dgs="'+k+'"'+(fs===k?' class="on"':'')+'>'+(k?DG_ST[k]:'qualquer')+'</button>';}).join('')+'</span></div>'+
   '<ul class="dg-lst">'+(L.length?L.map(function(x){return '<li class="dg-it st-'+x.st+'"><span class="dg-tp">'+DG_TP[x.tp]+'</span><div class="dg-c"><a href="'+esc(x.u)+'" target="_blank" rel="noopener">'+esc(x.t)+'</a><small>'+esc(dgHost(x.u))+(x.as?' · '+esc(x.as):'')+' · '+esc(x.d.split('-').reverse().join('/'))+'</small>'+
     '<input data-dgnota="'+x.id+'" maxlength="200" placeholder="nota (opcional)" value="'+esc(x.n||'')+'"></div>'+
     '<button type="button" class="dg-st" data-dgst="'+x.id+'" title="mudar o andamento">'+DG_ST[x.st]+'</button><button type="button" class="mf-del" data-dgdel="'+x.id+'" aria-label="apagar">×</button></li>';}).join(''):'<li class="mf-vz">'+(g.links.length?'Nada com esse filtro.':'Cole o primeiro link. Vídeos do YouTube ganham o título sozinhos.')+'</li>')+'</ul>'+
   '<p class="mf-d mf-s">'+g.links.filter(function(x){return x.st==='quero';}).length+' na fila para ver · '+g.links.filter(function(x){return x.st==='visto';}).length+' vistos.</p>';}
 else if(ab==='pastas'){var P=g.pastas.slice().sort(function(a,b){return (b.fav|0)-(a.fav|0);});
  h+='<p class="mf-d mf-s">Abra a pasta no Drive, copie o endereço e cole aqui. Poucas pastas grandes e numeradas, cada categoria com a mesma cor em todo lugar.</p>'+
   '<div class="mf-add"><input data-dgin="pn" maxlength="40" placeholder="nome (ex.: 01_Estudo)" style="flex:0 1 220px"><input data-dgin="pu" maxlength="400" placeholder="link da pasta no Drive"><button type="button" class="cx-pri" data-dg="padd">guardar</button></div>'+
   '<div class="dg-cores">'+Object.keys(DG_COR).map(function(k){return '<button type="button" data-dgcor="'+k+'"'+((CX.st.dgcor||'azul')===k?' class="on"':'')+'><i style="background:'+DG_COR[k][0]+'"></i>'+DG_COR[k][1]+'</button>';}).join('')+'</div>'+
   '<div class="dg-ps">'+(P.length?P.map(function(x){return '<div class="dg-p" style="--c:'+(DG_COR[x.cor]||DG_COR.azul)[0]+'"><a href="'+esc(x.u)+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><b>'+esc(x.n)+'</b><small>'+(DG_COR[x.cor]||DG_COR.azul)[1]+'</small></a>'+
     '<button type="button" class="dg-fav'+(x.fav?' on':'')+'" data-dgfav="'+x.id+'" title="fixar">★</button><button type="button" class="mf-del" data-dgpdel="'+x.id+'" aria-label="apagar">×</button></div>';}).join(''):'<p class="mf-vz">Nenhuma pasta ainda. Sugestão: 01_Estudo, 02_Projetos, 03_Pessoal, 04_Recursos e 05_Arquivo.</p>')+'</div>';}
 else if(ab==='faxina'){var F=g.fx,ds=dgDias(F.sem),dm=dgDias(F.mes);
  h+='<div class="mf-gr mf-gr2"><div class="mf-cd"><b>Downloads · toda semana</b><small>'+(ds==null?'nunca feita':ds===0?'feita hoje':'última há '+ds+' dia'+(ds>1?'s':''))+(ds!=null&&ds>7?' · está na hora':'')+'</small>'+
   DG_FX_S.map(function(t,i){return mfChk('dgs|'+i,F.ck['s'+i],t);}).join('')+'<small>10 minutos por semana.</small></div>'+
   '<div class="mf-cd"><b>Montar o sistema · uma vez</b>'+DG_FX_K.map(function(t,i){return mfChk('dgk|'+i,F.ck['k'+i],t);}).join('')+'</div>'+
   '<div class="mf-cd"><b>Revisão do mês</b><small>'+(dm==null?'nunca feita':dm===0?'feita hoje':'última há '+dm+' dias')+(dm!=null&&dm>30?' · está na hora':'')+'</small>'+
   DG_FX_M.map(function(t,i){return mfChk('dgm|'+i,F.ck['m'+i],t);}).join('')+'</div></div>';}
 else{var dt=hoje(),pj=(CX.st.dgp||'Projeto').trim().replace(/\s+/g,'-'),as=(CX.st.dga||'Assunto').trim().replace(/\s+/g,'-'),v=(CX.st.dgv||'1').trim(),ext=(CX.st.dge||'pdf').replace(/^\./,''),nm=dt+'_'+pj+'_'+as+'_V'+v+'.'+ext;
  h+='<p class="mf-d mf-s">Data invertida primeiro: os arquivos se ordenam sozinhos. A versão no fim acaba com o "final_final".</p>'+
   '<div class="dg-nm"><input name="dgp" maxlength="40" placeholder="projeto" value="'+esc(CX.st.dgp||'')+'"><input name="dga" maxlength="40" placeholder="assunto" value="'+esc(CX.st.dga||'')+'"><input name="dgv" maxlength="4" placeholder="versão" value="'+esc(CX.st.dgv||'')+'"><input name="dge" maxlength="6" placeholder="extensão" value="'+esc(CX.st.dge||'')+'"></div>'+
   '<div class="dg-out"><code>'+esc(nm)+'</code><button type="button" class="cx-pri" data-dgcp="'+esc(nm)+'">copiar</button></div>';}
 return h;}
/* entra na coleção do manual */
MF_T.splice(MF_T.findIndex(function(t){return t[0]==='semana';})+1,0,['digital','Espaço digital','vídeos, artigos, sites, pastas do Drive']);
MF_T.splice(MF_T.findIndex(function(t){return t[0]==='c-auto';}),0,['c-digital','Organização digital','pastas, nomes, nuvem, cores, faxina']);
MF_C['c-digital']=['Organização digital','Sistemas simples para uma vida digital limpa. Organizar hoje é achar fácil amanhã.',[
 ['Pastas',['Uma pasta principal e poucas categorias grandes, numeradas: 01_Estudo, 02_Projetos, 03_Pessoal, 04_Recursos, 05_Arquivo.','Dentro de cada uma, só o necessário: matérias, anotações, provas, livros; ou finanças, metas, diário, saúde.']],
 ['Nome de arquivo',['Fórmula: AAAA-MM-DD_Projeto_Assunto_Versão.','Exemplo: 2026-11-27_Concurso_Processo-Civil_V1.pdf.','Data, assunto e versão deixam tudo fácil de buscar.']],
 ['Nuvem',['Tudo o que importa tem cópia fora do computador.','Para o que é vital, dois serviços.','Backup automático sempre que der.']],
 ['Cores',['Azul: estudo. Menta: projetos. Lavanda: pessoal. Amarelo: importante. Cinza: arquivo.','A mesma cor em todos os aparelhos.']],
 ['Favoritos',['Fixe só o que você usa todo dia. Favorito demais é bagunça com estrela.']],
 ['Faxina',['Downloads toda semana, 10 minutos: abrir, guardar o que presta, apagar o resto.','Uma vez por mês: apagar, organizar, renomear, conferir backup, esvaziar a lixeira, ver o espaço.']],
 ['Dicas',['Um lugar só para cada coisa, sem duplicatas.','Busca e etiquetas no lugar de cavar pastas.','Área de trabalho quase vazia.','Um pouco todo dia rende mais que uma arrumação gigante.']],
 ['Por que organizar',['Menos tempo procurando, menos estresse.','Mais foco: nada de arquivo solto chamando atenção.','Sem duplicatas.','Tudo acha-se rápido.']],
 ['Por tipo, dentro das pastas',['PDF: livros, artigos, guias.','Texto: anotações, trabalhos, documentos.','Planilha: dados, orçamentos.','Apresentação: slides, relatórios.','Imagem: capturas de tela, diagramas.','Subpasta por matéria ou projeto, cada tipo no seu lugar.']],
 ['Sistema constante',['Nuvem com backup automático.','Sincronizar computador, tablet e celular.','Atalhos e estrela nas pastas de uso diário.','Cor ou etiqueta nas pastas (opcional).','Uma pasta de backup ou um disco externo.']],
 ['Arquivo morto',['Revise toda semana ou ao menos uma vez por mês.','Apague o que não serve mais.','Mova o que é velho para o Arquivo, por ano.','Regra de ouro: se não precisa agora, provavelmente não vai precisar depois.']],
 ['Ferramentas',['Google Drive ou OneDrive para guardar e sincronizar.','Notion para notas, arquivos e tarefas.','Raindrop.io para links da web: aqui o Espaço digital faz esse papel.']]],
 [['digital','espaço digital']]];
(function(p0){mfPagina=function(p){if(p==='digital')return dgPagina();return p0.apply(this,arguments);};})(mfPagina);
async function dgAdd(){var w=cxEl(),i=w.querySelector('[data-dgin="url"]'),a=w.querySelector('[data-dgin="as"]'),u=dgNorm(i&&i.value);if(!u)return;var g=dgD();
 if(g.links.some(function(x){return x.u===u;})){i.value='';return;}
 var it={id:mfId(),u:u,t:dgHost(u),tp:dgTipo(u),as:(a&&a.value||'').trim(),st:'quero',d:hoje()};g.links.unshift(it);mfSalva();cxPinta();
 var j=cxEl().querySelector('[data-dgin="url"]');if(j)j.focus();
 if(it.tp==='video'||/youtube|youtu\.be|vimeo/.test(u)){try{var r=await fetch('https://noembed.com/embed?url='+encodeURIComponent(u));var o=await r.json();if(o&&o.title){it.t=o.title+(o.author_name?' · '+o.author_name:'');mfSalva();cxPinta();}}catch(e){}}}
document.addEventListener('click',function(e){var w=document.getElementById('cx');if(!w||!w.classList.contains('on')||CX.m!=='mf'||CX.p!=='digital'||!w.contains(e.target))return;var b=e.target.closest('button');if(!b)return;var g=dgD(),a;
 if((a=b.getAttribute('data-dgab'))){CX.st.dg=a;cxPinta();return;}
 var k=b.getAttribute('data-dg');if(k==='add'){dgAdd();return;}
 if(k==='padd'){var n=w.querySelector('[data-dgin="pn"]'),u=w.querySelector('[data-dgin="pu"]'),nv=(n.value||'').trim(),uv=dgNorm(u.value);if(!nv||!uv)return;g.pastas.push({id:mfId(),n:nv,u:uv,cor:CX.st.dgcor||'azul',fav:0});mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-dgf'))!=null){CX.st.dgf=a;cxPinta();return;}
 if((a=b.getAttribute('data-dgs'))!=null){CX.st.dgs=a;cxPinta();return;}
 if((a=b.getAttribute('data-dgst'))){var x=g.links.filter(function(y){return y.id===a;})[0];if(x){x.st=x.st==='quero'?'vendo':x.st==='vendo'?'visto':'quero';if(x.st==='visto'){try{anota('Visto: '+esc(x.t),0,false,true);}catch(z){}cxXP();}mfSalva();cxPinta();}return;}
 if((a=b.getAttribute('data-dgdel'))){g.links=g.links.filter(function(y){return y.id!==a;});mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-dgcor'))){CX.st.dgcor=a;cxPinta();return;}
 if((a=b.getAttribute('data-dgfav'))){var p=g.pastas.filter(function(y){return y.id===a;})[0];if(p){p.fav=p.fav?0:1;mfSalva();cxPinta();}return;}
 if((a=b.getAttribute('data-dgpdel'))){g.pastas=g.pastas.filter(function(y){return y.id!==a;});mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-dgcp'))){try{navigator.clipboard.writeText(a);b.textContent='copiado';}catch(z){}return;}},true);
document.addEventListener('change',function(e){var t=e.target;if(!t.closest||!t.closest('#cx')||CX.m!=='mf'||CX.p!=='digital')return;var g=dgD(),a;
 if((a=t.getAttribute('data-dgnota'))){var x=g.links.filter(function(y){return y.id===a;})[0];if(x){x.n=t.value;mfSalva();}return;}
 if((a=t.getAttribute('data-mfck'))&&/^dgk\|/.test(a)){g.fx.ck['k'+a.split('|')[1]]=t.checked?1:0;mfSalva();cxPinta();return;}
 if((a=t.getAttribute('data-mfck'))&&/^dg[sm]\|/.test(a)){var P=a.split('|'),s=P[0]==='dgs'?'s':'m',N=s==='s'?DG_FX_S.length:DG_FX_M.length;g.fx.ck[s+P[1]]=t.checked?1:0;
  var ok=0;for(var i=0;i<N;i++)if(g.fx.ck[s+i])ok++;if(ok===N){g.fx[s==='s'?'sem':'mes']=hoje();for(var j=0;j<N;j++)delete g.fx.ck[s+j];cxDiario(s==='s'?'Faxina dos Downloads feita.':'Revisão digital do mês feita.');cxXP();}
  mfSalva();cxPinta();e.stopImmediatePropagation();}},true);
document.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var t=e.target;if(!t.closest||!t.closest('#cx')||CX.p!=='digital')return;var a=t.getAttribute('data-dgin');
 if(a==='url'||a==='as'){e.preventDefault();dgAdd();}else if(a==='pn'||a==='pu'){e.preventDefault();var b=document.querySelector('#cx [data-dg="padd"]');if(b)b.click();}},true);
/* busca e gerador de nome redesenham ao digitar */
document.addEventListener('input',function(e){var t=e.target;if(!t.closest||!t.closest('#cx')||CX.m!=='mf'||CX.p!=='digital')return;if(/^dg[qpave]$/.test(t.name||'')){CX.st[t.name]=t.value;clearTimeout(dgAdd._t);dgAdd._t=setTimeout(cxPinta,180);}});

/* ===== Manual de campo III: ferramentas tiradas dos livros (TCC para TDAH adulto, kit de ferramentas) e dos cadernos ===== */
var M3_DK=TV_ON?'Runas de missão':EG_ON?'Óstracos de missão':'Cartas de missão';
function m3(){var m=mfD();m.abc=m.abc||[];m.foco=m.foco||{};m.foco.med=m.foco.med||[];m.foco.dist=m.foco.dist||[];m.probl=m.probl||[];m.pens=m.pens||[];m.cartas=m.cartas||{};m.humor=m.humor||{};
 m.tempo=m.tempo||[];m.ped=m.ped||[];m.treino=m.treino||{};m.trilho=m.trilho||{};m.ctrl=m.ctrl||[];
 var lim=diaStr(hojeN()-30);Object.keys(m.cartas).forEach(function(d){if(d<lim)delete m.cartas[d];});var lh=diaStr(hojeN()-60);Object.keys(m.humor).forEach(function(d){if(d<lh)delete m.humor[d];});return m;}
function m3B(k,t,cl,tit){return '<button type="button" data-m3="'+k+'"'+(cl?' class="'+cl+'"':'')+(tit?' title="'+esc(tit)+'"':'')+'>'+t+'</button>';}
function m3Ach(L,id){return L.filter(function(x){return x.id===id;})[0];}
function m3Hr(){var d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function m3Msg(){var t=CX.st.m3msg;return t?'<p class="m3-msg">'+esc(t)+'</p>':'';}
function m3Emb(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function m3Fol(){var M=m3().foco.med.slice(-5).map(function(x){return x.min;}).sort(function(a,b){return a-b;});if(!M.length)return 0;return Math.max(3,Math.round(M[Math.floor(M.length/2)]));}

var M3_DESC=[['Faço depois, com mais vontade.','A vontade costuma chegar depois de começar, quase nunca antes. Dez minutos e você decide se segue.'],
 ['Funciono melhor sob pressão.','Sob pressão sai, mas cobra caro: sono, pressa, erro. Dez minutos agora deixam a pressão de amanhã menor.'],
 ['Preciso de um tempão livre para isso.','Não precisa terminar hoje. Só abrir e dar o primeiro passo. Tempo livre grande quase nunca aparece.'],
 ['Antes vou só checar uma coisinha.','A coisinha vira prêmio: primeiro os dez minutos, depois ela, com hora para acabar.'],
 ['Não vai ficar bom.','Rascunho ruim dá para melhorar. Página em branco não. A meta dos dez minutos é um rascunho feio.'],
 ['Estou cansado demais.','Escolha a versão mais leve da tarefa. Se em dez minutos não render, pare sem culpa: você tentou.'],
 ['Nem sei por onde começar.','Então a tarefa dos dez minutos é só descobrir o primeiro passo e escrever.'],
 ['Ainda tem tempo.','Tem. É por isso que dá para fazer agora, sem correria.']];
var M3_FUGA=['celular','vídeo','redes','lanche','conversar','arrumar outra coisa','e-mail'];
var M3_ERR=[['tn','tudo ou nada','ou perfeito ou fracasso'],['gen','generalizar','um tropeço vira "sempre" ou "nunca"'],['fil','filtro escuro','só o que deu errado aparece'],['dsc','descontar o bom','o que deu certo "não conta"'],
 ['mente','ler mentes','certeza do que o outro pensa de mim'],['prev','prever o pior','certeza de que vai dar errado'],['cat','catastrofizar','um erro vira desastre'],['emo','sinto, logo é','a emoção vira prova'],
 ['dev','"eu deveria"','cobrança que vira castigo'],['rot','rótulo','"sou um desastre" no lugar de "errei isso"'],['pes','tomar para si','a culpa é toda minha']];
var M3_PERG=['Que prova eu tenho a favor? E contra?','O que eu diria a um amigo nessa situação?','Qual é o pior, o melhor e o mais provável?','Isso vai importar daqui a um ano?','Qual é o próximo passo útil, mesmo pequeno?'];
var M3_CAT={casa:'casa',vida:'papelada e vida',foco:'foco',corpo:'corpo',dig:'digital',cab:'cabeça'};
var M3_CARTAS=[['casa',5,'Recolha 5 coisas fora do lugar e devolva cada uma ao seu canto.'],['casa',10,'Só a superfície da mesa: tire tudo o que não é de lá.'],['casa',5,'Roupas do chão para o cesto ou o cabide.'],['casa',2,'Leve copos e pratos para a pia.'],
 ['casa',10,'Lave só 10 itens da louça. Pode parar no décimo.'],['casa',2,'Esvazie um lixo.'],['casa',2,'Arrume a cama, do jeito mais simples.'],['casa',10,'Uma gaveta: tire o que não é dela.'],['casa',2,'Abra a janela e deixe o ar trocar.'],
 ['casa',5,'Guarde o que está parado numa sacola ou mochila.'],['casa',5,'Passe um pano na pia do banheiro.'],['casa',5,'Ponha a roupa para lavar ou para secar.'],
 ['vida',5,'Abra uma correspondência ou notificação parada.'],['vida',5,'Pague ou agende uma conta.'],['vida',5,'Responda a mensagem que você está evitando, em uma frase.'],['vida',10,'Marque a consulta ou o serviço que está adiado.'],
 ['vida',15,'Papéis soltos em três montes: agir, guardar, jogar fora.'],['vida',5,'Confira um pedido ou uma entrega.'],['vida',2,'Anote os gastos de hoje.'],['vida',2,'Ponha um lembrete para amanhã com hora e nome claro.'],
 ['foco',2,'Feche as abas que não são desta tarefa.'],['foco',2,'Escreva o próximo passo da tarefa grande.'],['foco',2,'Celular em outro cômodo por um bloco.'],['foco',15,'Um bloco de 15 minutos numa coisa só.'],
 ['foco',2,'Escreva como é "pronto" para a tarefa de agora.'],['foco',5,'Despeje a cabeça por 3 minutos, sem organizar.'],['foco',5,'Escolha as 3 prioridades de amanhã.'],['foco',10,'Dez minutos na tarefa que você está empurrando.'],
 ['corpo',2,'Beba um copo d\'água inteiro.'],['corpo',2,'Alongue pescoço e ombros.'],['corpo',10,'Caminhe 10 minutos.'],['corpo',2,'Faça 10 agachamentos.'],['corpo',5,'Cinco minutos de luz natural.'],
 ['corpo',10,'Coma algo com proteína.'],['corpo',2,'Escove os dentes agora.'],['corpo',10,'Banho rápido, só o básico.'],
 ['dig',5,'Apague 20 fotos inúteis.'],['dig',5,'Arquive 10 e-mails.'],['dig',10,'Limpe a área de trabalho do computador.'],['dig',2,'Silencie um grupo que só distrai.'],['dig',10,'Mova os downloads para as pastas certas.'],['dig',2,'Desinstale um app que você não usa.'],
 ['cab',2,'Três respirações lentas, soltando o ar mais devagar do que puxou.'],['cab',2,'Escreva uma vitória de hoje, por menor que seja.'],['cab',2,'Mande uma mensagem boa para alguém.'],['cab',2,'Escreva numa linha o que está pesando.'],
 ['cab',5,'Cinco minutos sem tela, só olhando pela janela.'],['cab',2,'Diga a você o que diria a um amigo no seu lugar.']].map(function(x,i){return {id:'k'+i,c:x[0],min:x[1],t:x[2]};});
var M3_HUM={v:['energia alta · desagradável','#d9705a',['irritado','ansioso','tenso','frustrado','sobrecarregado','agitado'],'Baixe a ativação antes de decidir qualquer coisa: respiração quadrada, água, andar dois minutos. Depois, uma tarefa curta e concreta.',[['calma','kit de calma'],['cartas','uma carta de 2 min']]],
 a:['energia alta · agradável','#d9b36a',['animado','focado','empolgado','orgulhoso','confiante','curioso'],'Boa hora para o difícil. Escolha a A do dia e proteja o bloco. Cuidado com o hiperfoco sem fim: ponha um alarme de saída.',[['abc','triagem A · B · C'],['foco','bloco de foco']]],
 z:['energia baixa · desagradável','#6f8fc9',['cansado','triste','desanimado','entediado','sozinho','travado'],'Comece pela versão mínima. Corpo primeiro: água, luz, mexer. Uma carta de dois minutos já conta.',[['cartas','tirar uma carta'],['pausa','pausa e água']]],
 g:['energia baixa · agradável','#7fb07a',['calmo','tranquilo','satisfeito','grato','relaxado','leve'],'Bom para rotina, revisão e conversa. Aproveite para planejar sem pressa.',[['plan','planejador do dia'],['semana','revisão da semana']]]};
var M3_SEQ=[['Fazer café',['encher a chaleira','ligar o fogo','pôr o pó no filtro','despejar a água quente','servir na xícara']],
 ['Mandar um e-mail com anexo',['abrir o e-mail','escrever o destinatário','escrever o assunto','anexar o arquivo','conferir o anexo','enviar']],
 ['Lavar roupa',['separar por cor','pôr na máquina','pôr o sabão','escolher o ciclo','ligar','estender']],
 ['Sair de casa',['conferir chave, carteira e celular','desligar as luzes','fechar as janelas','trancar a porta','chamar o elevador']],
 ['Preparar a semana',['ver a agenda','despejar as pendências','escolher as 3 prioridades','dar hora para cada uma','deixar a segunda pronta']],
 ['Tomar banho',['separar a toalha','separar a roupa','ligar o chuveiro','lavar','secar','vestir']]];
var M3_COR=[['vermelho','#e0574a'],['azul','#4a8fe0'],['verde','#4fb36a'],['amarelo','#e8c445']];
var M3_OPO=[['medo','fugir, evitar','aproximar aos poucos, fazer o que dá medo em pedaço pequeno'],['raiva','atacar, responder na hora','afastar-se um pouco, falar baixo, esperar o corpo baixar'],
 ['tristeza','sumir, ficar parado','sair, mexer o corpo, procurar alguém'],['vergonha','se esconder','contar a alguém de confiança, cabeça erguida'],['culpa (sem motivo)','se punir','agir como quem não errou e seguir'],['ansiedade','checar sem parar','decidir uma vez e soltar o controle']];
var M3_PED={c:['a caminho','#d9b36a'],h:['chegou','#7fb07a'],k:['conferido','#888'],d:['devolver','#d9705a'],x:['devolvido','#888']};

function m3Pag(p){var m=m3(),D=mfDia(),h='',S=CX.st;
 if(p==='abc'){var L=m.abc,A=L.filter(function(x){return x.r==='A'&&!x.ok;}),soltos=m.dump.filter(function(x){return !x.ok&&!L.some(function(y){return y.de===x.id;});}).length;
  var it=function(x){return '<li class="mf-it m3-abc'+(x.ok?' ok':'')+'"><span class="m3-r">'+['A','B','C'].map(function(r){return '<button type="button" data-m3="abcr|'+x.id+'|'+r+'" class="r-'+r+(x.r===r?' on':'')+'">'+r+'</button>';}).join('')+'</span>'+
   '<span class="mf-tx">'+esc(x.t)+(x.hr?' <small class="m3-tag">'+esc(x.hr)+'</small>':'')+'</span>'+(x.r==='A'&&!x.ok?m3B('abch|'+x.id,'dar hora','','vai para a agenda de hoje'):'')+(!x.ok?m3B('abcgo|'+x.id,'começar'):'')+
   '<button type="button" class="mf-ok" data-m3="abcok|'+x.id+'">'+(x.ok?'✓':'○')+'</button><button type="button" class="mf-del" data-m3="abcdel|'+x.id+'" aria-label="apagar">×</button></li>';};
  var grp=function(r,t){var G=L.filter(function(x){return (x.r||'')===r;});if(!G.length)return '';return '<span class="mf-k">'+t+' · '+G.filter(function(x){return !x.ok;}).length+'</span><ul class="mf-lst">'+G.map(it).join('')+'</ul>';};
  h='<h3>Triagem A · B · C</h3><p class="mf-d">Uma lista só, olhada todo dia. Primeiro escreva tudo. Só depois dê a nota: A tem que sair hoje ou logo; B importa, mas pode esperar; C seria bom. As A ganham hora na agenda. Os C esperam os A.</p>'+m3Msg()+
   '<div class="mf-add"><input name="abct" maxlength="120" placeholder="uma tarefa · Enter para guardar" value="'+esc(S.abct||'')+'">'+m3B('abcadd','guardar')+(soltos?m3B('abcdump','trazer do despejo ('+soltos+')'):'')+'</div>'+
   (A.length>3?'<p class="m3-alerta">'+A.length+' tarefas A. Se tudo é A, nada é A: rebaixe para B o que aguenta até amanhã.</p>':'')+
   (L.length?grp('A','A · hoje ou logo')+grp('B','B · importa, pode esperar')+grp('C','C · seria bom')+grp('','sem nota ainda')+'<div class="mf-vis">'+m3B('abclimpa','tirar os feitos')+'</div>':'<p class="mf-vz">Lista vazia. Escreva a primeira tarefa ou traga o despejo.</p>')+
   '<div class="mf-cd"><b>Armadilha do C</b><span>O C é rápido e dá sensação de dia produtivo. Se ainda há A aberto, o C espera. O app avisa quando isso acontecer.</span></div>';}
 else if(p==='foco'){var F=m.foco,fol=m3Fol(),fm=S.fm||'';
  h='<h3>Fôlego de foco</h3><p class="mf-d">Todo mundo tem um tempo que aguenta numa tarefa chata antes de a cabeça sair. Meça o seu, trabalhe em blocos desse tamanho e empurre para a margem as distrações que aparecem no meio.</p>';
  if(fm==='med')h+='<div class="mf-cd m3-centro"><b>Medindo</b><span>Faça uma tarefa sem graça e ignore o cronômetro. Quando perceber que a cabeça saiu, toque no botão.</span><span class="cx-big" data-cxrel>00:00</span>'+m3B('fmstop','me distraí','cx-pri')+m3B('fmx','cancelar')+'</div>';
  else if(fm==='blk')h+='<div class="mf-cd m3-centro"><b>Bloco de '+S.fmin+' min</b><span>Apareceu outra coisa na cabeça? Escreva aqui e volte. Ela espera o sino.</span><span class="cx-big" data-cxrel>'+cxMMSS(S.fmin*60)+'</span>'+
   '<div class="mf-add"><input name="fdt" maxlength="100" placeholder="a distração, em poucas palavras · Enter" value="'+esc(S.fdt||'')+'">'+m3B('fdadd','guardar para depois')+'</div>'+
   (F.dist.length?'<ul class="m3-dl">'+F.dist.map(function(x){return '<li>'+esc(x.t)+'</li>';}).join('')+'</ul>':'')+m3B('fmfim','encerrar o bloco')+'</div>';
  else if(fm==='rev'){var pend=F.dist.filter(function(x){return !x.f;});
   h+='<div class="mf-cd"><b>Sino. Hora de olhar as distrações</b><span>Para cada uma: precisa ser agora, vai para a lista ou pode soltar?</span>'+(pend.length?'<ul class="mf-lst">'+pend.map(function(x){return '<li class="mf-it"><span class="mf-tx">'+esc(x.t)+'</span>'+m3B('fdv|'+x.id+'|a','agora')+m3B('fdv|'+x.id+'|l','para a lista')+m3B('fdv|'+x.id+'|s','soltar')+'</li>';}).join('')+'</ul>':'<span>Tudo resolvido.</span>')+
    '<div class="mf-vis">'+m3B('fmnovo|'+S.fmin,'outro bloco igual','cx-pri')+m3B('fmx','fechar')+'</div></div>';}
  else{h+='<div class="mf-gr mf-gr2"><div class="mf-cd"><b><i>1</i>Medir o fôlego</b><span>Cronômetro sobe; você toca quando se distrair. Repita em dias diferentes: o app usa a mediana das últimas cinco.</span>'+m3B('fmmed','medir agora','cx-pri')+
    (F.med.length?'<div class="m3-barras">'+F.med.slice(-10).map(function(x){return '<i style="height:'+Math.min(100,x.min*3)+'%" title="'+esc(x.d)+': '+x.min+' min"><small>'+x.min+'</small></i>';}).join('')+'</div>':'')+'</div>'+
    '<div class="mf-cd"><b><i>2</i>Bloco do tamanho do fôlego</b><span>'+(fol?'Seu fôlego hoje: <b>'+fol+' min</b>. Toda semana, tente 1 ou 2 minutos a mais.':'Sem medida ainda. Comece com 15 e meça depois.')+'</span><div class="cx-chips">'+
    [fol||15,(fol||15)+2,25,45].filter(function(v,i,a){return a.indexOf(v)===i;}).map(function(v){return m3B('fmnovo|'+v,v+' min');}).join('')+'</div></div>'+
    '<div class="mf-cd mf-wide"><b>Adiar a distração</b><span>No bloco, cada pensamento que puxa para fora vai para a margem, numa linha. Você não briga com ele nem obedece: anota e volta. No sino, decide o que fazer com cada um. Pergunte de vez em quando: estou fazendo o que decidi fazer?</span></div></div>';}}
 else if(p==='probl'){var P=m.probl.filter(function(x){return !x.fim;})[0],R=m.probl.filter(function(x){return x.fim;}).slice(0,5);
  h='<h3>Resolver um problema</h3><p class="mf-d">Quando a tarefa trava porque há um problema no meio, saia da cabeça e vá para o papel: nomear, listar saídas sem julgar, pesar, escolher e partir em passos.</p>';
  if(!P)h+=m3B('pbnovo','novo problema','cx-pri');
  else{var esc1=P.sol.filter(function(x){return x.id===P.esc;})[0];
   h+='<div class="mf-cd"><b><i>1</i>Qual é o problema?</b><textarea data-m3f="pb|'+P.id+'|p" rows="2" placeholder="em uma ou duas frases, o mais concreto possível">'+esc(P.p||'')+'</textarea></div>'+
    '<div class="mf-cd"><b><i>2</i>Todas as saídas, sem julgar</b><span>Vale saída boba. Julgar vem depois.</span>'+
    (P.sol.length?'<div class="m3-sols">'+P.sol.map(function(x){return '<div class="m3-sol'+(P.esc===x.id?' on':'')+'"><b>'+esc(x.t)+'</b><input data-m3f="pbs|'+P.id+'|'+x.id+'|pro" maxlength="100" placeholder="prós" value="'+esc(x.pro||'')+'"><input data-m3f="pbs|'+P.id+'|'+x.id+'|con" maxlength="100" placeholder="contras" value="'+esc(x.con||'')+'">'+
     '<span class="m3-nt">'+[1,2,3,4,5].map(function(n){return '<button type="button" data-m3="pbn|'+x.id+'|'+n+'"'+(x.n===n?' class="on"':'')+'>'+n+'</button>';}).join('')+'</span>'+m3B('pbe|'+x.id,P.esc===x.id?'escolhida ✓':'escolher')+'</div>';}).join('')+'</div>':'')+
    '<div class="mf-add"><input name="pbs" maxlength="100" placeholder="uma saída · Enter" value="'+esc(S.pbs||'')+'">'+m3B('pbsadd','pôr na lista')+'</div></div>'+
    (P.sol.length>1?'<p class="mf-d mf-s">Dê nota de 1 a 5 a cada saída depois de ver prós e contras. A maior nota não decide sozinha: você decide.</p>':'')+
    (esc1?'<div class="mf-cd"><b><i>3</i>Passos para: '+esc(esc1.t)+'</b><textarea data-m3f="pb|'+P.id+'|ps" rows="4" placeholder="um passo por linha, cada um pequeno o bastante para começar hoje">'+esc(P.ps||'')+'</textarea>'+
     '<div class="mf-vis">'+m3B('pbdump','mandar os passos para o despejo','cx-pri')+m3B('pbfim','concluir')+'</div></div>':'')+m3B('pbdel','descartar este problema');}
  if(R.length)h+='<span class="mf-k">resolvidos</span><div class="mf-gr">'+R.map(function(x){var e=x.sol.filter(function(y){return y.id===x.esc;})[0];return '<div class="mf-cd"><small>'+esc(x.d)+'</small><b>'+esc(x.p||'sem nome')+'</b>'+(e?'<span>saída: '+esc(e.t)+'</span>':'')+'</div>';}).join('')+'</div>';}
 else if(p==='pens'){var er=S.ps_er||[];
  h='<h3>Registro de pensamentos</h3><p class="mf-d">Não é pensar positivo, é pensar com precisão. Um pensamento automático duro costuma vir de um erro de leitura. Pegue o pensamento no ato, dê nome ao erro e escreva uma versão mais justa.</p>'+m3Msg()+
   '<div class="mf-gr mf-gr2"><div class="mf-cd"><b><i>1</i>Situação</b><input name="ps_sit" maxlength="140" placeholder="o que estava acontecendo" value="'+esc(S.ps_sit||'')+'"></div>'+
   '<div class="mf-cd"><b><i>2</i>Pensamento automático</b><input name="ps_pen" maxlength="160" placeholder="a frase que passou pela cabeça" value="'+esc(S.ps_pen||'')+'"></div>'+
   '<div class="mf-cd"><b><i>3</i>Emoção e força</b><input name="ps_emo" maxlength="60" placeholder="ex.: culpa, ansiedade, raiva" value="'+esc(S.ps_emo||'')+'"><span class="m3-nt m3-nt10">'+[1,2,3,4,5,6,7,8,9,10].map(function(n){return '<button type="button" data-m3="psi|i0|'+n+'"'+(S.ps_i0===n?' class="on"':'')+'>'+n+'</button>';}).join('')+'</span></div>'+
   '<div class="mf-cd"><b><i>4</i>Qual erro?</b><div class="cx-chips">'+M3_ERR.map(function(x){return '<button type="button" data-m3="pse|'+x[0]+'" title="'+esc(x[2])+'"'+(er.indexOf(x[0])>=0?' class="on"':'')+'>'+esc(x[1])+'</button>';}).join('')+'</div>'+
    (er.length?'<small>'+er.map(function(k){var e=M3_ERR.filter(function(x){return x[0]===k;})[0];return e?esc(e[1])+': '+esc(e[2]):'';}).join(' · ')+'</small>':'')+'</div>'+
   '<div class="mf-cd mf-wide"><b><i>5</i>Versão mais justa</b><ul class="m3-perg">'+M3_PERG.map(function(q){return '<li>'+esc(q)+'</li>';}).join('')+'</ul><textarea name="ps_alt" rows="2" placeholder="o que é mais provável e mais útil pensar">'+esc(S.ps_alt||'')+'</textarea>'+
    '<span>Força da emoção agora:</span><span class="m3-nt m3-nt10">'+[1,2,3,4,5,6,7,8,9,10].map(function(n){return '<button type="button" data-m3="psi|i1|'+n+'"'+(S.ps_i1===n?' class="on"':'')+'>'+n+'</button>';}).join('')+'</span>'+m3B('psok','guardar o registro','cx-pri')+'</div></div>'+
   (m.pens.length?'<span class="mf-k">últimos registros</span><div class="mf-gr">'+m.pens.slice(0,8).map(function(x){return '<div class="mf-cd"><button type="button" class="mf-del" data-m3="psdel|'+x.id+'" aria-label="apagar">×</button><small>'+esc(x.d)+(x.i0?' · '+x.i0+(x.i1?' → '+x.i1:''):'')+'</small><b>'+esc(x.pen||x.sit||'')+'</b>'+
    (x.er&&x.er.length?'<span class="m3-tags">'+x.er.map(function(k){var e=M3_ERR.filter(function(y){return y[0]===k;})[0];return e?'<i>'+esc(e[1])+'</i>':'';}).join('')+'</span>':'')+(x.alt?'<span>'+esc(x.alt)+'</span>':'')+'</div>';}).join('')+'</div>':'');}
 else if(p==='dez'){var dz=S.dz||'',it0=cxAtual(),dd=S.dzd==null?-1:+S.dzd;if(S.dzt==null&&it0)S.dzt=it0.t;
  h='<h3>Só 10 minutos</h3><p class="mf-d">Procrastinar é fugir de um desconforto, não preguiça. O desconforto é normal e passa depois que você começa. Combine só dez minutos. No fim, você decide se segue.</p>';
  if(dz==='on')h+='<div class="mf-cd m3-centro"><b>'+esc(S.dzt||'a tarefa')+'</b><span class="cx-big" data-cxrel>10:00</span><span>Só isso. O resto da tarefa não existe agora.</span>'+(S.dzf?'<small>depois: '+esc(S.dzf)+' por 5 min, com hora para acabar</small>':'')+m3B('dzfim','parar antes')+'</div>';
  else if(dz==='fim')h+='<div class="mf-cd m3-centro"><b>Dez minutos feitos.</b><span>Começar era a parte difícil, e ela já foi.</span>'+(S.dzf?'<span>Agora o prêmio: '+esc(S.dzf)+' por 5 minutos.</span>':'')+'<div class="mf-vis">'+m3B('dzmais','mais 10 minutos','cx-pri')+m3B('dzpara','parar com honra')+'</div></div>';
  else h+='<div class="mf-cd"><b><i>1</i>A tarefa</b><input name="dzt" maxlength="90" placeholder="o que você está empurrando" value="'+esc(S.dzt||'')+'"></div>'+
   '<div class="mf-cd"><b><i>2</i>O que você está dizendo a si mesmo?</b><div class="m3-desc">'+M3_DESC.map(function(x,i){return '<button type="button" data-m3="dzd|'+i+'"'+(dd===i?' class="on"':'')+'>'+esc(x[0])+'</button>';}).join('')+'</div>'+(dd>=0?'<p class="m3-resp">'+esc(M3_DESC[dd][1])+'</p>':'')+'</div>'+
   '<div class="mf-cd"><b><i>3</i>A fuga vira prêmio</b><span>A coisa para onde você costuma fugir fica para depois dos dez minutos.</span><div class="cx-chips">'+M3_FUGA.map(function(x){return '<button type="button" data-m3="dzf|'+esc(x)+'"'+(S.dzf===x?' class="on"':'')+'>'+esc(x)+'</button>';}).join('')+'</div></div>'+
   m3B('dzgo','começar os 10 minutos','cx-pri');}
 else if(p==='cartas'){var hj=m.cartas[hoje()]||[],cc=S.cc||'',ct=+S.ct||0,F2=M3_CARTAS.filter(function(x){return (!cc||x.c===cc)&&(!ct||x.min<=ct);}),C=S.cid?M3_CARTAS.filter(function(x){return x.id===S.cid;})[0]:null;
  h='<h3>'+esc(M3_DK)+'</h3><p class="mf-d">Missões pequenas, prontas, para quando a cabeça não consegue escolher. Filtre pelo tempo que você tem, tire uma carta e faça só ela.</p>'+
   '<div class="cx-chips">'+m3B('ccat|','todas',cc?'':'on')+Object.keys(M3_CAT).map(function(k){return m3B('ccat|'+k,M3_CAT[k],cc===k?'on':'');}).join('')+'</div>'+
   '<div class="cx-chips">'+[[0,'qualquer tempo'],[2,'até 2 min'],[5,'até 5 min'],[10,'até 10 min']].map(function(x){return m3B('ctem|'+x[0],x[1],ct===x[0]?'on':'');}).join('')+'</div>'+
   (C?'<div class="m3-carta"><small>'+esc(M3_CAT[C.c])+' · '+C.min+' min</small><b>'+esc(C.t)+'</b><div class="mf-vis">'+m3B('cfeito','feito','cx-pri')+m3B('cgo','começar com timer')+m3B('ctira','outra carta')+'</div></div>':
    '<div class="m3-carta m3-verso">'+m3B('ctira','tirar uma carta','cx-pri')+'<small>'+F2.length+' cartas neste monte</small></div>')+
   '<p class="mf-d mf-s">Hoje: '+hj.length+(hj.length===1?' missão cumprida':' missões cumpridas')+'.</p>';}
 else if(p==='humor'){var HJ=m.humor[hoje()]||[],ul=HJ[HJ.length-1],S14=[];for(var i=13;i>=0;i--){var dk=diaStr(hojeN()-i),L2=m.humor[dk]||[];S14.push([dk,L2.length?L2[L2.length-1].q:'']);}
  h='<h3>Medidor de humor</h3><p class="mf-d">Duas perguntas: quanta energia há no corpo e quão agradável está. Dar nome exato ao que sente já baixa a intensidade e mostra o que fazer a seguir.</p>'+
   '<div class="m3-hum"><span class="m3-hy">energia ↑</span><span class="m3-hx">desagradável ← → agradável</span>'+['v','a','z','g'].map(function(q){var Q=M3_HUM[q];return '<div class="m3-hq q-'+q+'" style="--q:'+Q[1]+'"><small>'+esc(Q[0])+'</small><div>'+Q[2].map(function(w){return '<button type="button" data-m3="hum|'+q+'|'+esc(w)+'">'+esc(w)+'</button>';}).join('')+'</div></div>';}).join('')+'</div>'+
   (ul?'<div class="mf-cd" style="border-color:'+M3_HUM[ul.q][1]+'"><b>Agora: '+esc(ul.w)+' <small class="m3-tag">'+esc(ul.h)+'</small></b><span>'+esc(M3_HUM[ul.q][3])+'</span><div class="mf-vis">'+M3_HUM[ul.q][4].map(function(u){return '<button type="button" data-mfp="'+u[0]+'">'+esc(u[1])+'</button>';}).join('')+'</div></div>':'<p class="mf-vz">Toque na palavra que mais se parece com agora.</p>')+
   (HJ.length>1?'<p class="mf-d mf-s">Hoje: '+HJ.map(function(x){return esc(x.h)+' '+esc(x.w);}).join(' · ')+'</p>':'')+
   '<span class="mf-k">últimos 14 dias</span><div class="mf-sem m3-sem">'+S14.map(function(x){return '<span title="'+x[0]+'"><i style="background:'+(x[1]?M3_HUM[x[1]][1]:'transparent')+'"></i><small>'+x[0].slice(8)+'</small></span>';}).join('')+'</div>';}
 else if(p==='calma'){var cm=S.cm||'';
  var vol=m3B('cm|','← voltar ao kit');
  if(cm==='resp')h='<h3>Respiração quadrada</h3><p class="mf-d">Quatro tempos para puxar, quatro segurando, quatro soltando, quatro vazio. Siga o ponto. Três a cinco voltas bastam.</p><div class="m3-quad"><i></i><span class="q1">puxa</span><span class="q2">segura</span><span class="q3">solta</span><span class="q4">vazio</span></div>'+
   '<div class="mf-cd"><b>Suspiro duplo</b><span>Para baixar rápido: duas puxadas curtas pelo nariz, uma em cima da outra, e uma soltada longa pela boca. Uma a três vezes.</span></div>'+vol;
  else if(cm==='54321'){var st=+S.c5||0,SN=[[5,'coisas que você vê'],[4,'coisas que você pode tocar'],[3,'sons que você ouve'],[2,'cheiros (ou lembre de dois)'],[1,'gosto na boca, ou uma coisa boa sobre você']];
   h='<h3>Aterrar · 5 4 3 2 1</h3><p class="mf-d">Quando a cabeça dispara, traga a atenção para os sentidos. Diga em voz baixa ou só pense.</p>'+(st<5?'<div class="m3-carta"><small>passo '+(st+1)+' de 5</small><b class="m3-n">'+SN[st][0]+'</b><span>'+SN[st][1]+'</span>'+m3B('c5|'+(st+1),'próximo','cx-pri')+'</div>':'<div class="m3-carta"><b>De volta ao chão.</b><span>Respire uma vez devagar e escolha o próximo passo pequeno.</span>'+m3B('c5|0','de novo')+'</div>')+vol;}
  else if(cm==='ctrl'){h='<h3>Círculo de controle</h3><p class="mf-d">Escreva a preocupação e decida onde ela mora. O que é seu ganha um passo. O que não é, você nomeia e solta.</p>'+
   '<div class="mf-add"><input name="ctt" maxlength="120" placeholder="uma preocupação · Enter" value="'+esc(S.ctt||'')+'">'+m3B('ctadd','pôr no círculo')+'</div>'+
   (m.ctrl.length?'<div class="mf-gr">'+m.ctrl.map(function(x){return '<div class="mf-cd m3-ct ct-'+(x.k||'n')+'"><button type="button" class="mf-del" data-m3="ctdel|'+x.id+'" aria-label="apagar">×</button><b>'+esc(x.t)+'</b><div class="cx-chips">'+[['m','depende de mim'],['p','em parte'],['n','não depende']].map(function(o){return m3B('ctk|'+x.id+'|'+o[0],o[1],x.k===o[0]?'on':'');}).join('')+'</div>'+
    (x.k==='m'||x.k==='p'?'<input data-m3f="ct|'+x.id+'|ps" maxlength="100" placeholder="o próximo passo que é meu" value="'+esc(x.ps||'')+'">':x.k==='n'?'<span>Não é seu para resolver. Dá para cuidar de como você reage. Solte quando conseguir.</span>':'')+'</div>';}).join('')+'</div>':'<p class="mf-vz">Nada no círculo por enquanto.</p>')+vol;}
  else if(cm==='opo')h='<h3>Ação oposta</h3><p class="mf-d">Toda emoção traz um impulso. Quando o impulso piora as coisas, faça o contrário dele, de leve, por alguns minutos. Funciona melhor quando a emoção não combina com os fatos.</p><div class="mf-gr">'+
   M3_OPO.map(function(x){return '<div class="mf-cd"><b>'+esc(x[0])+'</b><small>impulso: '+esc(x[1])+'</small><span>oposto: '+esc(x[2])+'</span></div>';}).join('')+'</div>'+vol;
  else if(cm==='pare')h='<h3>PARE</h3><p class="mf-d">Para o momento em que você vai reagir no impulso.</p><div class="mf-gr">'+[['P','Pare','não faça nada por um instante. Mãos paradas.'],['A','Afaste-se','um passo atrás, uma respiração longa.'],['R','Repare','o que está acontecendo, dentro e fora, sem julgar.'],['E','Escolha','o que ajuda agora e o que você quer amanhã.']].map(function(x){return '<div class="mf-cd"><b><i>'+x[0]+'</i>'+x[1]+'</b><span>'+x[2]+'</span></div>';}).join('')+'</div>'+vol;
  else h='<h3>Kit de calma</h3><p class="mf-d">Para quando a emoção sobe antes da cabeça. Primeiro baixar o corpo, depois pensar.</p><div class="mf-gr mf-gr2">'+
   [['resp','Respiração quadrada','4 tempos cada lado, com o ponto andando'],['54321','Aterrar 5 4 3 2 1','os sentidos puxam a atenção de volta'],['ctrl','Círculo de controle','o que é meu, o que não é'],['opo','Ação oposta','fazer o contrário do impulso'],['pare','PARE','antes de reagir no impulso']].map(function(x){return '<div class="mf-cd"><b>'+x[1]+'</b><span>'+x[2]+'</span>'+m3B('cm|'+x[0],'abrir','cx-pri')+'</div>';}).join('')+
   '<div class="mf-cd"><b>Pensamento que pesa</b><span>Quando a emoção vem de uma frase na cabeça.</span><button type="button" data-mfp="pens">registro de pensamentos</button></div></div>';}
 else if(p==='tempo'){var T=m.tempo.filter(function(x){return x.real;}).slice(0,15),se=0,sr=0;T.forEach(function(x){se+=x.est;sr+=x.real;});var fat=se?sr/se:0;
  h='<h3>Estimado × real</h3><p class="mf-d">Com TDAH o relógio interno erra, quase sempre para menos. Estime, cronometre e deixe os números mostrarem o seu fator de correção.</p>'+
   (fat?'<div class="mf-cd m3-centro"><b>Seu fator: ×'+fat.toFixed(1).replace('.',',')+'</b><span>'+(fat>1.15?'Você costuma precisar de mais tempo do que acha. Uma estimativa de 20 min pede '+Math.round(20*fat)+' na agenda.':fat<0.85?'Você costuma superestimar. Dá para marcar blocos menores.':'Suas estimativas estão boas. Mantenha a folga.')+'</span><small>'+T.length+' medições</small></div>':'');
  if(S.tm==='on')h+='<div class="mf-cd m3-centro"><b>'+esc(S.tmt||'tarefa')+'</b><small>estimativa: '+S.tme+' min</small><span class="cx-big" data-cxrel>00:00</span>'+m3B('tmstop','terminei','cx-pri')+m3B('tmx','cancelar')+'</div>';
  else h+='<div class="mf-cd"><b>Nova medição</b><input name="tmt" maxlength="90" placeholder="a tarefa" value="'+esc(S.tmt||'')+'"><span>Quanto tempo você acha que leva?</span><div class="cx-chips">'+[5,10,15,20,30,45,60,90].map(function(v){return m3B('tme|'+v,v+' min',+S.tme===v?'on':'');}).join('')+'</div>'+m3B('tmgo','começar a cronometrar','cx-pri')+'</div>';
  if(T.length)h+='<span class="mf-k">últimas</span><ul class="mf-lst">'+T.map(function(x){var r=x.real/x.est;return '<li class="mf-it"><span class="mf-tx">'+esc(x.t)+' <small class="m3-tag">'+esc(x.d.slice(5).split('-').reverse().join('/'))+'</small></span><span class="m3-er'+(r>1.3?' alto':r<0.8?' baixo':'')+'">'+x.est+' → '+x.real+' min</span><button type="button" class="mf-del" data-m3="tmdel|'+x.id+'" aria-label="apagar">×</button></li>';}).join('')+'</ul>';}
 else if(p==='ped'){var hj2=hoje(),cpz=[];try{cpz=cpD().filter(function(x){return x.ok&&!m.ped.some(function(y){return y.cp===x.id;});}).slice(-6);}catch(z){}
  var it2=function(x){var at=x.st==='c'&&x.prev&&x.prev<hj2,dv=x.dev&&(x.st==='h'||x.st==='d')?diaN(x.dev)-hojeN():null;
   return '<li class="mf-it m3-ped'+(x.st==='k'||x.st==='x'?' ok':'')+'"><button type="button" class="m3-pst" data-m3="pdst|'+x.id+'" style="--c:'+M3_PED[x.st][1]+'">'+M3_PED[x.st][0]+'</button><span class="mf-tx">'+esc(x.t)+(x.loja?' <small class="m3-tag">'+esc(x.loja)+'</small>':'')+
    (x.prev&&x.st==='c'?'<small class="m3-tag'+(at?' m3-at':'')+'">'+(at?'atrasado · ':'')+'chega até '+esc(x.prev.slice(5).split('-').reverse().join('/'))+'</small>':'')+(dv!=null?'<small class="m3-tag'+(dv<=3?' m3-at':'')+'">'+(dv<0?'prazo de devolução passou':'devolver em '+dv+' dia'+(dv===1?'':'s'))+'</small>':'')+'</span>'+
    '<button type="button" class="mf-del" data-m3="pddel|'+x.id+'" aria-label="apagar">×</button></li>';};
  var ab=m.ped.filter(function(x){return x.st!=='k'&&x.st!=='x';}),fe=m.ped.filter(function(x){return x.st==='k'||x.st==='x';});
  h='<h3>Pedidos e devoluções</h3><p class="mf-d">Compra feita sai da cabeça e entra aqui: o que vem, até quando chega e até quando dá para devolver. Toque no status para avançar.</p>'+
   '<div class="mf-cd"><b>Novo pedido</b><div class="m3-pdf"><input name="pdi" maxlength="90" placeholder="o que você comprou" value="'+esc(S.pdi||'')+'"><input name="pdl" maxlength="40" placeholder="loja" value="'+esc(S.pdl||'')+'">'+
   '<label><small>chega até</small><input type="date" name="pdc" value="'+esc(S.pdc||'')+'"></label><label><small>devolver até (se houver)</small><input type="date" name="pdv" value="'+esc(S.pdv||'')+'"></label></div>'+m3B('pdadd','guardar o pedido','cx-pri')+'</div>'+
   (cpz.length?'<div class="mf-cd"><b>Comprados na lista de compras</b><span>Quer acompanhar a entrega?</span><div class="cx-chips">'+cpz.map(function(x){return m3B('pdcp|'+x.id,esc((x.t||x.url||'item').slice(0,40)));}).join('')+'</div></div>':'')+
   (ab.length?'<ul class="mf-lst">'+ab.map(it2).join('')+'</ul>':'<p class="mf-vz">Nada a caminho.</p>')+
   (fe.length?'<details class="m3-det"><summary>encerrados · '+fe.length+'</summary><ul class="mf-lst">'+fe.slice(0,15).map(it2).join('')+'</ul></details>':'');}
 else if(p==='treino'){var tg=S.tg||'',B=m.treino;
  var vol2=m3B('tg|','← voltar aos treinos');
  if(tg==='seq'){var sq=S.sq;if(!sq){var ri=Math.floor(Math.random()*M3_SEQ.length);sq=S.sq={i:ri,ord:m3Emb(M3_SEQ[ri][1].map(function(_,k){return k;})),got:[],err:0,t0:Date.now()};}var R2=M3_SEQ[sq.i],fim2=sq.got.length===R2[1].length;
   h='<h3>Ordem das etapas</h3><p class="mf-d">Planejar é pôr passos em ordem. Toque nas etapas na sequência certa.</p><div class="mf-cd"><b>'+esc(R2[0])+'</b>'+
    (sq.got.length?'<ol class="m3-ok">'+sq.got.map(function(k){return '<li>'+esc(R2[1][k])+'</li>';}).join('')+'</ol>':'')+
    (fim2?'<span>Pronto em '+Math.round(sq.fimT/1000)+' s'+(sq.err?', com '+sq.err+' tropeço'+(sq.err>1?'s':''):', sem erro')+'.</span>'+m3B('sqnovo','outra rotina','cx-pri'):'<div class="cx-chips m3-sq">'+sq.ord.filter(function(k){return sq.got.indexOf(k)<0;}).map(function(k){return m3B('sq|'+k,esc(R2[1][k]),S.sqe===k?'m3-erro':'');}).join('')+'</div>')+'</div>'+vol2;}
  else if(tg==='cor'){var cr=S.cr;
   h='<h3>Cor da tinta</h3><p class="mf-d">Toque na cor da tinta, não na palavra escrita. Treina frear o automático. Vinte rodadas.</p>';
   if(!cr||cr.fim)h+='<div class="m3-carta">'+(cr&&cr.fim?'<b>'+cr.ok+' de 20 em '+(cr.t/1000).toFixed(1).replace('.',',')+' s</b>'+(B.cor?'<small>seu recorde: '+B.cor.ok+' de 20 em '+(B.cor.t/1000).toFixed(1).replace('.',',')+' s</small>':''):'')+m3B('crgo',cr?'de novo':'começar','cx-pri')+'</div>';
   else h+='<div class="m3-carta"><small>'+(cr.n+1)+' de 20</small><b class="m3-stroop" style="color:'+M3_COR[cr.k][1]+'">'+M3_COR[cr.w][0]+'</b><div class="m3-cores">'+m3Emb(M3_COR.map(function(_,i){return i;})).map(function(i){return '<button type="button" data-m3="cr|'+i+'">'+M3_COR[i][0]+'</button>';}).join('')+'</div></div>';
   h+=vol2;}
  else if(tg==='dig'){var dg=S.dg;
   h='<h3>Memória de trabalho</h3><p class="mf-d">Veja os números, espere sumirem e digite. A cada acerto, um a mais. Dois erros seguidos encerram.'+(B.dig?' Recorde: '+B.dig+' dígitos.':'')+'</p>';
   if(!dg||dg.fim)h+='<div class="m3-carta">'+(dg&&dg.fim?'<b>Você chegou a '+dg.max+' dígitos'+(dg.inv?' ao contrário':'')+'.</b>':'')+'<div class="mf-vis">'+m3B('dggo|0','na ordem','cx-pri')+m3B('dggo|1','ao contrário')+'</div></div>';
   else h+='<div class="m3-carta"><small>'+dg.n+' dígitos'+(dg.inv?' · digite ao contrário':'')+'</small>'+(dg.show?'<b class="m3-n">'+dg.seq.split('').join(' ')+'</b>':'<input name="dga" inputmode="numeric" maxlength="14" autocomplete="off" placeholder="digite e Enter" value="'+esc(S.dga||'')+'">'+m3B('dgok','conferir','cx-pri'))+(dg.msg?'<span>'+esc(dg.msg)+'</span>':'')+'</div>';
   h+=vol2;}
  else h='<h3>Treino das funções executivas</h3><p class="mf-d">Joguinhos curtos que exercitam planejar, frear o impulso e segurar informação na cabeça. É aquecimento, não prova: três minutos antes de um bloco já valem.</p><div class="mf-gr mf-gr2">'+
   [['seq','Ordem das etapas','planejamento e sequência'],['cor','Cor da tinta','frear o automático'],['dig','Memória de trabalho','segurar e manipular números']].map(function(x){return '<div class="mf-cd"><b>'+x[1]+'</b><span>'+x[2]+'</span>'+m3B('tg|'+x[0],'jogar','cx-pri')+'</div>';}).join('')+'</div>';}
 else if(p==='trilho'){var TR=m.trilho;
  if(S.tr1)h='<h3>De volta aos trilhos</h3>'+(TR.frase?'<p class="m3-frase">'+esc(TR.frase)+'</p>':'<p class="m3-frase">Sair dos trilhos faz parte. Voltar é a habilidade.</p>')+
   '<div class="mf-cd m3-centro"><b>Primeiro passo</b><span>'+esc(TR.passo||'Abrir a lista de hoje e escolher uma coisa pequena.')+'</span>'+m3B('trgo','fazer agora · 5 min','cx-pri')+'</div>'+
   (TR.func?'<div class="mf-cd"><b>O que costuma funcionar comigo</b><span>'+esc(TR.func)+'</span></div>':'')+(TR.pess?'<div class="mf-cd"><b>Quem pode me ajudar</b><span>'+esc(TR.pess)+'</span></div>':'')+
   '<div class="mf-vis"><button type="button" data-mfp="cartas">tirar uma carta</button><button type="button" data-mfp="listas">despejar a cabeça</button>'+m3B('tr0','fechar')+'</div>';
  else h='<h3>Plano de volta aos trilhos</h3><p class="mf-d">Escreva agora, num dia bom, o plano para o dia ruim. Quando a rotina desandar, você só segue o que já está escrito.</p>'+
   '<div class="mf-gr mf-gr2">'+[['sinais','Sinais de que estou saindo dos trilhos','ex.: parei de olhar a lista, durmo tarde, celular o tempo todo'],['func','O que mais funciona comigo','ex.: lista A·B·C de manhã, blocos de 20 min, caminhar'],['passo','O primeiro passo de volta','ex.: abrir a lista e escolher uma A pequena'],['pess','Quem pode me ajudar','uma pessoa e como pedir'],['frase','Uma frase gentil para mim','o que eu diria a um amigo']].map(function(x){return '<label class="mf-cd"><b>'+x[1]+'</b><textarea data-m3f="tr|'+x[0]+'" rows="2" placeholder="'+esc(x[2])+'">'+esc(TR[x[0]]||'')+'</textarea></label>';}).join('')+'</div>'+
   m3B('tr1','saí dos trilhos agora','cx-pri');}
 else return null;
 return h;}

/* consulta por assunto */
MF_C['c-pensar']=['Pensamentos que travam','Situação, pensamento automático, emoção, e então a fuga. O elo que dá para mexer é o pensamento.',[
 ['Como o ciclo funciona',['Uma situação acontece: prazo, crítica, tarefa chata.','Passa uma frase rápida pela cabeça, quase sem perceber.','A frase traz emoção: culpa, medo, desânimo.','A emoção puxa para fugir, e a fuga confirma a frase.']],
 ['Erros comuns de leitura',M3_ERR.map(function(x){return x[1][0].toUpperCase()+x[1].slice(1)+': '+x[2]+'.';})],
 ['Perguntas que destravam',M3_PERG],
 ['O que não é',['Não é fingir que está tudo bem.','É trocar uma frase exagerada por uma mais exata e mais útil.']]],
 [['pens','registro de pensamentos'],['calma','kit de calma']]];
MF_C['c-procr']=['Procrastinação','Não é preguiça. É fugir de um desconforto, com alívio na hora e culpa depois.',[
 ['O ciclo',['Tarefa traz desconforto: tédio, dúvida, medo de fazer mal.','A fuga dá alívio na hora.','A tarefa continua lá, maior.','A culpa pesa e a próxima fuga fica mais provável.']],
 ['Como quebrar',['Combine só dez minutos. No fim, decida.','Aceite o desconforto: ele é normal e passa depois de começar.','A fuga vira prêmio para depois do bloco.','Parta a tarefa até o primeiro passo ser óbvio.','Prenda o começo num gatilho: se der 9h, então eu abro o arquivo.']],
 ['Frases que enganam',M3_DESC.map(function(x){return x[0]+' → '+x[1];})],
 ['Pense no depois',['Como vai ser a noite com a tarefa feita?','Imagine o alívio, não só o esforço.']]],
 [['dez','só 10 minutos'],['abc','triagem A · B · C'],['@trav','travei']]];
MF_C['c-distr']=['Distração e ambiente','Mais fácil mudar o lugar do que a força de vontade.',[
 ['Fôlego de foco',['Meça quanto tempo aguenta numa tarefa chata.','Trabalhe em blocos desse tamanho e aumente um ou dois minutos por semana.','Tarefas longas viram vários blocos com pausa curta.']],
 ['Adiar a distração',['Papel ao lado. Pensamento que puxa para fora vira uma linha.','Volte à tarefa sem resolver o que anotou.','No fim do bloco: faço agora, vai para a lista ou solto.']],
 ['Ambiente',['Um lugar fixo para chave, carteira, remédio e fone, perto da porta.','Tirar a tentação da vista: celular em outro cômodo, abas fechadas.','Lembretes fora da cabeça: alarme com nome claro, bilhete onde você vai passar.','Lugar de trabalho só para trabalhar, quando der.']],
 ['Tecnologia',['Ligue a tela com um plano: para que você abriu?','Transições são a hora de maior risco: entre uma tarefa e outra, decida o próximo antes de pegar o celular.','Marque hora para a distração em vez de lutar contra ela o dia todo.']],
 ['Pergunta-âncora',['De tempos em tempos: estou fazendo o que decidi fazer?']]],
 [['foco','fôlego de foco'],['digital','espaço digital']]];
MF_C['c-hiper']=['Hiperfoco','A atenção que some na tarefa chata às vezes gruda numa interessante e não solta.',[
 ['Lado bom',['Rende muito quando cai na tarefa certa.','Dá para aproveitar em projeto criativo e estudo de assunto que prende.']],
 ['Lado ruim',['As horas somem: fome, sede, sono e compromissos passam.','Gruda na coisa errada: jogo, vídeo, detalhe sem importância.','Sair dele dá irritação.']],
 ['Como apontar',['Escolha antes onde quer mergulhar.','Água e lanche por perto.','Alarme de saída marcado antes de começar, longe do alcance.']],
 ['Como sair',['Quando o alarme tocar, anote em uma linha onde parou e o próximo passo.','Levante e mude de lugar.','Combine com alguém a hora de parar, se ajudar.']]],
 [['foco','fôlego de foco'],['tempo','estimado × real']]];
MF_C['c-apoio']=['Apoio de fora','Cérebro com TDAH funciona melhor com andaimes fora da cabeça. Usar apoio não é fraqueza.',[
 ['Lembretes externos',['Agenda única, olhada todo dia.','Alarmes com nome da ação, não "lembrete".','Bilhete no lugar onde a ação acontece.']],
 ['Gente junto',['Trabalhar ao lado de alguém, mesmo em silêncio, ajuda a começar.','Contar o plano a alguém cria um compromisso leve.','Pedir que alguém pergunte "fez?" no fim do dia.']],
 ['Automatizar',['Contas no débito automático.','Compras recorrentes programadas.','Modelos prontos para o que se repete.']]],
 [['ifwoop','se-então'],['ped','pedidos e devoluções']]];
MF_C['c-trilho']=['Manter o que funciona','Recaída faz parte do caminho. O plano é voltar mais rápido, não nunca cair.',[
 ['As habilidades centrais',['Agenda e lista única, olhadas todo dia, com A, B e C.','Partir tarefa grande em passos.','Blocos do tamanho do fôlego, com a distração adiada.','Pegar o pensamento que trava e trocar por um mais justo.']],
 ['Sinais de alerta',['Parar de olhar a lista.','Dormir cada vez mais tarde.','Voltar a fugir das mesmas tarefas.','Culpa crescendo.']],
 ['Volta mínima',['Uma habilidade só, a que mais funcionou.','Um passo pequeno hoje.','Revisão da semana no domingo.']],
 ['Gentileza',['Um dia ruim não apaga os bons.','Recomeçar é a habilidade, não o fracasso.']]],
 [['trilho','plano de volta aos trilhos'],['semana','revisão da semana']]];

/* organiza a coleção em grupos e encaixa as ferramentas novas */
(function(){var I={};MF_T.forEach(function(t){if(t[0]!=='#')I[t[0]]=t;});
 var nv=[['abc','Triagem A · B · C','uma lista, nota A, B ou C, A com hora'],['tempo','Estimado × real','estime, cronometre, ache seu fator'],['ped','Pedidos e devoluções','o que vem, quando chega, até quando devolver'],
  ['foco','Fôlego de foco','medir o foco e adiar a distração'],['dez','Só 10 minutos','a desculpa, a resposta e o timer'],['cartas',M3_DK,'missões pequenas para tirar e fazer'],['probl','Resolver um problema','saídas, prós e contras, passos'],
  ['humor','Medidor de humor','energia × agrado, palavra e o que fazer'],['calma','Kit de calma','respirar, aterrar, controle, ação oposta'],['pens','Registro de pensamentos','pegar a frase dura e trocar por uma justa'],['trilho','Volta aos trilhos','o plano do dia ruim, escrito no dia bom'],['treino','Treino executivo','sequência, cor da tinta, memória']];
 nv.forEach(function(t){I[t[0]]=t;});
 var G=[['coleção · planejar',['plan','listas','abc','tempo','semana','ped','digital']],['coleção · fazer',['foco','dez','cartas','pausa','energia','ifwoop','probl','fim','pilhas']],['coleção · cabeça e corpo',['humor','calma','pens','trilho','treino']],['companhia',['@trav','@esc','@ponte']]];
 var usado={},novo=[];G.forEach(function(g){novo.push(['#',g[0]]);g[1].forEach(function(k){if(I[k]){novo.push(I[k]);usado[k]=1;}});});
 var ci=-1;for(var k=0;k<MF_T.length;k++){if(MF_T[k][0]==='#'&&/consulta/.test(MF_T[k][1])){ci=k;break;}}
 var antes=ci>=0?MF_T.slice(0,ci):MF_T.slice(),resto=ci>=0?MF_T.slice(ci):[];
 antes.forEach(function(t){if(t[0]!=='#'&&!usado[t[0]]){var g=novo.findIndex(function(x){return x[0]==='#'&&x[1]==='coleção · cabeça e corpo';});novo.splice(g,0,t);usado[t[0]]=1;}});
 var ca=resto.findIndex(function(t){return t[0]==='c-auto';});var cons=[['c-procr','Procrastinação','o ciclo da fuga e como quebrar'],['c-pensar','Pensamentos que travam','erros de leitura e perguntas'],['c-distr','Distração e ambiente','fôlego, adiar, lugar fixo, tecnologia'],['c-hiper','Hiperfoco','apontar e sair do mergulho'],['c-apoio','Apoio de fora','lembretes, gente junto, automatizar'],['c-trilho','Manter o que funciona','recaída, sinais e volta mínima']];
 if(ca<0)ca=resto.length;resto.splice.apply(resto,[ca,0].concat(cons));
 MF_T.length=0;novo.concat(resto).forEach(function(t){MF_T.push(t);});})();

/* a página nova entra antes das antigas */
mfPagina=(function(f0){return function(p){var r=m3Pag(p);return r!=null?r:f0.apply(this,arguments);};})(mfPagina);

/* ações */
function m3Ent(n){var S=CX.st,m=m3(),v=(S[n]||'').trim();var el0=cxEl().querySelector('[name="'+n+'"]');if(el0&&n!=='dga'&&n!=='pdi'&&v)el0.value='';
 if(n==='abct'){if(!v)return;m.abc.unshift({id:mfId(),t:v,r:'',d:hoje()});S.abct='';}
 else if(n==='fdt'){if(!v)return;m.foco.dist.push({id:mfId(),t:v});S.fdt='';}
 else if(n==='pbs'){var P=m.probl.filter(function(x){return !x.fim;})[0];if(!P||!v)return;P.sol.push({id:mfId(),t:v});S.pbs='';}
 else if(n==='ctt'){if(!v)return;m.ctrl.unshift({id:mfId(),t:v,k:''});S.ctt='';}
 else if(n==='dga'){m3Dig();return;}
 else if(n==='pdi'){m3Ped();return;}
 else return;mfSalva();cxPinta();var f=cxEl().querySelector('[name="'+n+'"]');if(f)f.focus();}
function m3Ped(){var S=CX.st,m=m3(),t=(S.pdi||'').trim();if(!t)return;m.ped.unshift({id:mfId(),t:t,loja:(S.pdl||'').trim(),prev:S.pdc||'',dev:S.pdv||'',st:'c',d:hoje()});S.pdi=S.pdl=S.pdc=S.pdv='';mfSalva();cxPinta();}
function m3Dig(){var S=CX.st,dg=S.dg,m=m3();if(!dg||dg.show||dg.fim)return;var v=(S.dga||'').replace(/\D/g,''),alvo=dg.inv?dg.seq.split('').reverse().join(''):dg.seq;S.dga='';
 if(v===alvo){dg.max=dg.n;dg.n++;dg.err=0;dg.msg='Certo. Agora '+dg.n+'.';}else{dg.err++;dg.msg='Era '+alvo.split('').join(' ')+'.';if(dg.err>=2){dg.fim=1;if(!dg.inv&&(!m.treino.dig||dg.max>m.treino.dig)){m.treino.dig=dg.max;mfSalva();}cxPinta();return;}}
 m3DigMostra();}
function m3DigMostra(){var dg=CX.st.dg,s='';for(var i=0;i<dg.n;i++)s+=Math.floor(Math.random()*10);dg.seq=s;dg.show=1;cxPinta();clearTimeout(m3DigMostra._t);m3DigMostra._t=setTimeout(function(){if(CX.st.dg===dg){dg.show=0;cxPinta();var f=cxEl().querySelector('[name="dga"]');if(f)f.focus();}},600+dg.n*650);}
function m3CorRod(){var cr=CX.st.cr,w=Math.floor(Math.random()*4),k=Math.floor(Math.random()*4);if(Math.random()<.8)while(k===w)k=Math.floor(Math.random()*4);cr.w=w;cr.k=k;}

document.addEventListener('click',function(e){var w=document.getElementById('cx');if(!w||!w.classList.contains('on')||CX.m!=='mf'||!w.contains(e.target))return;var b=e.target.closest('[data-m3]');if(!b)return;
 e.stopPropagation();var P=b.getAttribute('data-m3').split('|'),k=P[0],m=m3(),S=CX.st,D=mfDia(),x;S.m3msg='';
 if(k==='abcadd'){m3Ent('abct');return;}
 if(k==='abcdump'){m.dump.filter(function(y){return !y.ok&&!m.abc.some(function(z){return z.de===y.id;});}).forEach(function(y){m.abc.push({id:mfId(),t:y.t,r:y.q==='a'?'A':y.q==='p'?'B':y.q==='c'?'C':'',de:y.id,d:hoje()});});}
 else if(k==='abcr'){x=m3Ach(m.abc,P[1]);if(x)x.r=x.r===P[2]?'':P[2];}
 else if(k==='abcok'){x=m3Ach(m.abc,P[1]);if(!x)return;x.ok=x.ok?0:1;if(x.ok){if(x.r==='C'&&m.abc.some(function(y){return y.r==='A'&&!y.ok;}))S.m3msg='Armadilha do C: esse era fácil, e ainda tem A aberto. Próximo: uma A.';cxXP();try{anota('Feito: '+esc(x.t),0,false,true);}catch(z){}
   if(x.de){var dd=mfAch(x.de);if(dd)dd.ok=1;}}}
 else if(k==='abcdel'){m.abc=m.abc.filter(function(y){return y.id!==P[1];});}
 else if(k==='abclimpa'){m.abc=m.abc.filter(function(y){return !y.ok;});}
 else if(k==='abcgo'){x=m3Ach(m.abc,P[1]);cxAbre('trav','gesto',{tarefa:x?x.t:''});return;}
 else if(k==='abch'){x=m3Ach(m.abc,P[1]);if(!x)return;D.plan=D.plan||{pr:['','','','',''],h:{}};var hn=new Date().getHours(),hr=null;for(var i=Math.max(6,hn+(new Date().getMinutes()>30?1:0));i<=22;i++){var kk=String(i).padStart(2,'0');if(!(D.plan.h[kk]||'').trim()){hr=kk;break;}}
  if(!hr){S.m3msg='A agenda de hoje está cheia até as 22h. Escolha o que sai para essa A entrar.';cxPinta();return;}D.plan.h[hr]=x.t;x.hr=hr+':00';var pi=D.plan.pr.findIndex(function(t){return !(t||'').trim();});if(pi>=0&&D.plan.pr.indexOf(x.t)<0)D.plan.pr[pi]=x.t;S.m3msg='"'+x.t+'" foi para as '+hr+':00 no planejador do dia.';}
 else if(k==='fmmed'){S.fm='med';cxPinta();cxTimer(-1);return;}
 else if(k==='fmstop'){var mn=Math.max(1,Math.round((Date.now()-S.t0)/60000*10)/10);mn=Math.round(mn);m.foco.med.push({d:hoje(),min:mn});m.foco.med=m.foco.med.slice(-30);S.fm='';cxTimer(0);S.m3msg='';mfSalva();cxPinta();return;}
 else if(k==='fmx'){S.fm='';cxTimer(0);m.foco.dist=m.foco.dist.filter(function(y){return !y.f;});mfSalva();cxPinta();return;}
 else if(k==='fmnovo'){S.fmin=+P[1]||15;S.fm='blk';m.foco.dist=m.foco.dist.filter(function(y){return !y.f;});mfSalva();cxPinta();cxTimer(S.fmin*60,function(){S.fm='rev';cxXP();try{anota('Bloco de foco de '+S.fmin+' min.',0,false,true);}catch(z){}try{navigator.vibrate&&navigator.vibrate([200,100,200]);}catch(z){}cxPinta();});return;}
 else if(k==='fdadd'){m3Ent('fdt');return;}
 else if(k==='fmfim'){cxTimer(0);S.fm='rev';}
 else if(k==='fdv'){x=m3Ach(m.foco.dist,P[1]);if(!x)return;x.f=P[2];if(P[2]==='l')m.dump.unshift({id:mfId(),t:x.t,d:hoje()});if(P[2]==='a'){S.m3msg='Faça "'+x.t+'" agora e volte.';}}
 else if(k==='pbnovo'){m.probl.unshift({id:mfId(),d:hoje(),p:'',sol:[],esc:'',ps:''});}
 else if(k==='pbsadd'){m3Ent('pbs');return;}
 else if(k==='pbn'||k==='pbe'){var Pb=m.probl.filter(function(y){return !y.fim;})[0];if(!Pb)return;x=m3Ach(Pb.sol,P[1]);if(!x)return;if(k==='pbn')x.n=x.n===+P[2]?0:+P[2];else Pb.esc=Pb.esc===x.id?'':x.id;}
 else if(k==='pbdump'){var Pb2=m.probl.filter(function(y){return !y.fim;})[0];if(!Pb2)return;var ps=(Pb2.ps||'').split('\n').map(function(t){return t.trim();}).filter(Boolean);ps.reverse().forEach(function(t){m.dump.unshift({id:mfId(),t:t,d:hoje()});});S.m3msg=ps.length+' passos no despejo.';}
 else if(k==='pbfim'){var Pb3=m.probl.filter(function(y){return !y.fim;})[0];if(Pb3){Pb3.fim=1;cxXP();cxDiario('Problema resolvido no papel: '+(Pb3.p||''));}}
 else if(k==='pbdel'){var Pb4=m.probl.filter(function(y){return !y.fim;})[0];if(Pb4)m.probl=m.probl.filter(function(y){return y!==Pb4;});}
 else if(k==='psi'){S['ps_'+P[1]]=S['ps_'+P[1]]===+P[2]?0:+P[2];cxPinta();return;}
 else if(k==='pse'){S.ps_er=S.ps_er||[];var ei=S.ps_er.indexOf(P[1]);if(ei>=0)S.ps_er.splice(ei,1);else S.ps_er.push(P[1]);cxPinta();return;}
 else if(k==='psok'){if(!(S.ps_pen||'').trim()&&!(S.ps_sit||'').trim())return;m.pens.unshift({id:mfId(),d:hoje(),sit:S.ps_sit||'',pen:S.ps_pen||'',emo:S.ps_emo||'',i0:S.ps_i0||0,er:(S.ps_er||[]).slice(),alt:S.ps_alt||'',i1:S.ps_i1||0});m.pens=m.pens.slice(0,60);
  ['ps_sit','ps_pen','ps_emo','ps_i0','ps_er','ps_alt','ps_i1'].forEach(function(n){delete S[n];});S.m3msg='Registro guardado. Pensamento pego no ato é pensamento que perde força.';cxXP();}
 else if(k==='psdel'){m.pens=m.pens.filter(function(y){return y.id!==P[1];});}
 else if(k==='dzd'){S.dzd=+S.dzd===+P[1]&&S.dzd!=null?null:+P[1];cxPinta();return;}
 else if(k==='dzf'){S.dzf=S.dzf===P[1]?'':P[1];cxPinta();return;}
 else if(k==='dzgo'||k==='dzmais'){S.dz='on';cxPinta();cxTimer(600,function(){S.dz='fim';cxXP();try{navigator.vibrate&&navigator.vibrate([200,100,200]);}catch(z){}cxPinta();});return;}
 else if(k==='dzfim'){cxTimer(0);S.dz='fim';cxPinta();return;}
 else if(k==='dzpara'){try{anota('Dez minutos em: '+esc(S.dzt||'tarefa')+'.',0,false,true);}catch(z){}S.dz='';S.m3msg='';cxPinta();return;}
 else if(k==='ccat'){S.cc=P[1];S.cid='';cxPinta();return;}
 else if(k==='ctem'){S.ct=+P[1];S.cid='';cxPinta();return;}
 else if(k==='ctira'){var hj=m.cartas[hoje()]||[],cc=S.cc||'',ct=+S.ct||0,F=M3_CARTAS.filter(function(y){return (!cc||y.c===cc)&&(!ct||y.min<=ct)&&y.id!==S.cid;}),F2=F.filter(function(y){return hj.indexOf(y.id)<0;});var pool=F2.length?F2:F;if(pool.length)S.cid=pool[Math.floor(Math.random()*pool.length)].id;cxPinta();return;}
 else if(k==='cfeito'){if(!S.cid)return;m.cartas[hoje()]=m.cartas[hoje()]||[];if(m.cartas[hoje()].indexOf(S.cid)<0)m.cartas[hoje()].push(S.cid);var cd=M3_CARTAS.filter(function(y){return y.id===S.cid;})[0];cxXP();try{anota('Missão: '+esc(cd?cd.t:''),0,false,true);}catch(z){}S.cid='';}
 else if(k==='cgo'){var cd2=M3_CARTAS.filter(function(y){return y.id===S.cid;})[0];if(cd2)cxAbre('trav','gesto',{tarefa:cd2.t});return;}
 else if(k==='hum'){var hj3=m.humor[hoje()]=m.humor[hoje()]||[];hj3.push({h:m3Hr(),q:P[1],w:P[2]});}
 else if(k==='cm'){S.cm=P[1];cxPinta();var pg=cxEl().querySelector('.mf-pg');if(pg)pg.scrollTop=0;return;}
 else if(k==='c5'){S.c5=+P[1];cxPinta();return;}
 else if(k==='ctadd'){m3Ent('ctt');return;}
 else if(k==='ctk'){x=m3Ach(m.ctrl,P[1]);if(x)x.k=x.k===P[2]?'':P[2];}
 else if(k==='ctdel'){m.ctrl=m.ctrl.filter(function(y){return y.id!==P[1];});}
 else if(k==='tme'){S.tme=+P[1];cxPinta();return;}
 else if(k==='tmgo'){if(!(S.tmt||'').trim()||!S.tme){S.m3msg='Escreva a tarefa e escolha uma estimativa.';cxPinta();return;}S.tm='on';cxPinta();cxTimer(-1);S.tm0=S.t0;return;}
 else if(k==='tmstop'){var rl=Math.max(1,Math.round((Date.now()-(S.tm0||S.t0))/60000));m.tempo.unshift({id:mfId(),t:S.tmt.trim(),est:S.tme,real:rl,d:hoje()});m.tempo=m.tempo.slice(0,60);cxTimer(0);S.tm='';S.tmt='';S.tme=0;cxXP();}
 else if(k==='tmx'){cxTimer(0);S.tm='';cxPinta();return;}
 else if(k==='tmdel'){m.tempo=m.tempo.filter(function(y){return y.id!==P[1];});}
 else if(k==='pdadd'){m3Ped();return;}
 else if(k==='pdcp'){var it=null;try{it=cpD().filter(function(y){return y.id===P[1];})[0];}catch(z){}if(it)m.ped.unshift({id:mfId(),t:it.t||it.url,loja:it.loja||'',prev:'',dev:'',st:'c',cp:it.id,d:hoje()});}
 else if(k==='pdst'){x=m3Ach(m.ped,P[1]);if(!x)return;var O={c:'h',h:'k',k:'d',d:'x',x:'c'};x.st=O[x.st]||'c';if(x.st==='h'){try{anota('Chegou: '+esc(x.t)+'.',0,false,true);}catch(z){}}}
 else if(k==='pddel'){m.ped=m.ped.filter(function(y){return y.id!==P[1];});}
 else if(k==='tg'){S.tg=P[1];S.sq=null;S.cr=null;S.dg=null;cxPinta();return;}
 else if(k==='sqnovo'){S.sq=null;cxPinta();return;}
 else if(k==='sq'){var sq=S.sq,R=M3_SEQ[sq.i],nx=+P[1];if(nx===sq.got.length){sq.got.push(nx);S.sqe=null;if(sq.got.length===R[1].length){sq.fimT=Date.now()-sq.t0;cxXP();}}else{sq.err++;S.sqe=nx;}cxPinta();return;}
 else if(k==='crgo'){S.cr={n:0,ok:0,t0:Date.now()};m3CorRod();cxPinta();return;}
 else if(k==='cr'){var cr=S.cr;if(!cr||cr.fim)return;if(+P[1]===cr.k)cr.ok++;cr.n++;if(cr.n>=20){cr.fim=1;cr.t=Date.now()-cr.t0;var bc=m.treino.cor;if(!bc||cr.ok>bc.ok||(cr.ok===bc.ok&&cr.t<bc.t)){m.treino.cor={ok:cr.ok,t:cr.t};mfSalva();}cxXP();}else m3CorRod();cxPinta();return;}
 else if(k==='dggo'){S.dg={n:3,max:0,err:0,inv:P[1]==='1'};S.dga='';m3DigMostra();return;}
 else if(k==='dgok'){m3Dig();return;}
 else if(k==='tr1'){S.tr1=1;try{anota('Saí dos trilhos e abri o plano de volta.',0,false,true);}catch(z){}cxPinta();return;}
 else if(k==='tr0'){S.tr1=0;cxPinta();return;}
 else if(k==='trgo'){cxAbre('trav','gesto',{tarefa:m.trilho.passo||'o primeiro passo de volta'});return;}
 else return;
 mfSalva();cxPinta();},true);
document.addEventListener('change',function(e){var t=e.target;if(!t.closest||!t.closest('#cx')||CX.m!=='mf')return;var a=t.getAttribute('data-m3f');if(!a)return;var P=a.split('|'),m=m3(),x;
 if(P[0]==='pb'){x=m3Ach(m.probl,P[1]);if(x)x[P[2]]=t.value;}
 else if(P[0]==='pbs'){var pb=m3Ach(m.probl,P[1]);x=pb&&m3Ach(pb.sol,P[2]);if(x)x[P[3]]=t.value;}
 else if(P[0]==='ct'){x=m3Ach(m.ctrl,P[1]);if(x)x[P[2]]=t.value;}
 else if(P[0]==='tr'){m.trilho[P[1]]=t.value;}
 mfSalva();},true);
document.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var t=e.target;if(!t.closest||!t.closest('#cx')||CX.m!=='mf')return;var n=t.name;
 if(['abct','fdt','pbs','ctt','dga','pdi'].indexOf(n)>=0){e.preventDefault();e.stopPropagation();m3Ent(n);}},true);
/* trocar de página encerra o que estava cronometrando */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-mfp]');if(!b||CX.m!=='mf')return;var S=CX.st;S.fm='';S.dz='';S.tm='';S.tr1=0;S.cm='';S.tg='';S.m3msg='';},true);

/* páginas do Manual de campo vindas de arquivos à parte (planner/drive-mapa.js etc.):
   window.ASTRO_MF[id]() devolve o HTML da página; S.drive guarda o mapa do Drive */
(function(p0){mfPagina=function(p){var x=window.ASTRO_MF&&window.ASTRO_MF[p];if(typeof x==='function'){try{return x();}catch(e){console.error('mf '+p,e);return '';}}return p0.apply(this,arguments);};})(mfPagina);
(function(){var n0=normaliza;normaliza=function(p){var b=n0(p);if(p&&p.drive&&typeof p.drive==='object')b.drive=p.drive;return b;};})();

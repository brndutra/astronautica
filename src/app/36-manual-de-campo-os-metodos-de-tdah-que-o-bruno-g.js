/* ===== Manual de campo: os métodos de TDAH que o Bruno guardou, em versão que funciona ===== */
var MF_NM=['Manual','ferramentas e consulta'];
var MF_T=[['#','coleção · para usar'],['plan','Planejador do dia','prioridades, despejo e agenda por hora'],['listas','Duas listas','despejo, 1 grande + 2 pequenas, matriz'],['fim','Fechar o expediente','fechar o expediente em seis passos'],['pilhas','Empilhar hábitos','âncora + passos pequenos, higiene'],
 ['pausa','Pausa e água','sprints, mexer o corpo, vitórias'],['energia','Energia do momento','a tarefa certa para a bateria'],['ifwoop','Se-então e WOOP','gatilhos, plano para o obstáculo, pronto'],['semana','Revisão da semana','revisar, analisar, cortar, ajustar, seguir'],
 ['@trav','Travei','abre a companhia'],['@esc','Tarefa chata','migalhas com o sidekick'],['@ponte','Trocar de tarefa','a ponte em seis passos'],
 ['#','consulta · por assunto'],['c-comecar','Começar e destravar','por que travei e o método de cada causa'],['c-prior','Prioridades','o que importa, matriz, 80/20, clareza'],['c-tempo','Tempo e blocos','2 minutos, Parkinson, blocos para TDAH'],
 ['c-troca','Trocar de tarefa','por que é difícil e a rampa para o próximo'],['c-habito','Hábitos e rotinas','empilhar, âncora, versão mínima, recomeço'],['c-energia','Energia','zonas de energia e o que combina'],['c-fim','Encerrar o dia','soltar o trabalho e dormir melhor'],
 ['c-higiene','Higiene com TDAH','menos atrito, lembrete, gentileza'],['c-auto','Automatizar','fluxos que dá para tirar da cabeça']];
var MF_C={
 'c-comecar':['Começar e destravar','Primeiro descubra por que travou. Cada causa tem um método.',[
  ['Por que travei?',['Tarefa grande demais → elefante: parta em pedaços e comece pelo menor.','Sem vontade de começar → 5 minutos: timer curto e só começar.','Tarefa desagradável → sapo primeiro: a pior vai antes de tudo.','Não sei o que fazer → próxima ação: uma ação física e concreta, agora.','Tarefas demais → 1 a 3 prioridades: uma principal e no máximo duas menores.']],
  ['Por que não estou fazendo?',['Sem energia: a ação vem antes da motivação.','Meta grande demais: transforme num resultado concreto (SMART).','Não vejo o caminho: desejo → resultado → obstáculo → plano (WOOP).','Muita coisa aberta: limite o que está em andamento.']],
  ['Para não empacar',['Regra dos 15 minutos: 15 minutos sem avançar? Troque de abordagem ou peça ajuda.','Nomeie o bloqueio: falta saber, falta alguém, falta recurso ou é medo?','Aja sobre ele: busque a informação, pergunte, delegue ou mude o plano.']],
  ['Regra de ouro',['A motivação vem depois da ação. Dê o primeiro passo, por menor que seja.']]],
  [['@trav','travei'],['@esc','tarefa chata'],['listas','duas listas'],['ifwoop','WOOP']]],
 'c-prior':['Prioridades','Fazer menos coisas, com mais foco. Foco é decisão, não sensação.',[
  ['Matriz de Eisenhower',['Urgente e importante: fazer agora.','Importante sem pressa: planejar.','Urgente sem importância: delegar.','Nem um nem outro: cortar.']],
  ['Fórmula do dia',['1 tarefa grande, que move o ponteiro.','+ 2 pequenas, passos importantes.','+ rotina: exercício, estudo, planejamento.']],
  ['80/20',['Poucas decisões trazem quase todo o resultado. Ache as de hoje e comece por elas.','Delegue ou corte o resto.']],
  ['Fluxo da clareza',['Capturar: tudo para fora, sem editar (10 min no máximo).','Agrupar: juntar o que é parecido em 4 a 7 grupos.','Avaliar: impacto e esforço; alto impacto e baixo esforço primeiro.','Priorizar: escolher 3 e definir o resultado de cada uma.','Planejar: só o próximo passo, nos próximos 7 dias.','Revisar: toda semana, meia hora.']],
  ['SMART',['Específica, mensurável, alcançável, relevante e com prazo.']],
  ['Sim ou não',['Se não é um "sim, claro", é não: agora não (agenda), não eu (delega), nunca (corta).']]],
  [['listas','duas listas e matriz'],['plan','planejador do dia'],['semana','revisão da semana']]],
 'c-tempo':['Tempo e blocos','O cérebro com TDAH enxerga mal o tempo. Torne o tempo visível e curto.',[
  ['Regras rápidas',['2 minutos: menos que isso, faz agora; mais, agenda ou delega.','Parkinson: a tarefa cresce até ocupar o tempo dado; dê prazos curtos.','Caixa de tempo: horário marcado para uma tarefa só (ex.: 10h às 11h).','Pomodoro: 25 de foco, 5 de pausa; a cada 4, uma pausa longa.']],
  ['Blocos para TDAH',['Blocos de 20 a 45 minutos. Bloco longo demais assusta.','10 minutos de transição entre blocos.','Cronômetro visível, melhor que alarme de celular.','Pequena recompensa no fim: música, lanche, alongar.','Planeje só 60% do dia; o resto é folga.','Bloco perdido é dado, não fracasso: recomece no próximo.']],
  ['Lotes',['Junte o que é parecido: e-mails em dois horários, ligações num bloco, pessoas num horário fixo.','Trocar de contexto custa caro.']],
  ['Hora de ouro',['A prioridade nº 1 antes de abrir e-mail ou mensagem.','O impulso da manhã se acumula pelo dia.']],
  ['Modelo de dia possível',['Acordar e reset: água, luz, remédio, começo calmo.','Bloco de foco 1: a tarefa mais importante, uma só.','Transição: alongar, água.','Bloco de descanso: pausa sem culpa.','Bloco de foco 2.','Almoço longe da tela.','Bloco de foco 3: segunda prioridade.','Tarefas leves, estudo ou planejar amanhã.','Fechar o ciclo e reset da noite.','Descanso conta como parte do plano.']]],
  [['plan','planejador do dia'],['pausa','pausa e água'],['energia','energia do momento']]],
 'c-troca':['Trocar de tarefa','O difícil não é parar: é recomeçar em outro lugar. Construa uma rampa para o próximo.',[
  ['Por que é difícil',['Inércia: a atenção fica presa no que estava fazendo.','Resíduo: parte da cabeça continua na tarefa anterior.','Próximo passo nebuloso.','Pouca dopamina: o novo ainda não recompensa.','Trocar gasta energia.']],
  ['Como aparece',['Ficar tempo demais numa coisa só.','Evitar a próxima, rolar a tela no lugar de trocar.','Irritação quando interrompido.','Esquecer o que vinha depois.']],
  ['O que atrapalha',['"Ainda não terminei."','"Vou perder onde parei."','"O próximo é chato."','"Não sei o próximo passo."','"Esqueci por que tinha que trocar."']],
  ['Reset rápido',['1 · Pausa.','2 · Respira.','3 · Salva onde parou.','4 · Dá nome ao próximo.','5 · Escolhe um gesto-ponte.','6 · Começa por 5 minutos.']],
  ['Gestos-ponte',['Abrir o arquivo.','Escrever o título.','Levantar.','Trocar de aba.','Mudar de lugar.','Mandar um e-mail.','Pôr um timer de 5 minutos.']],
  ['O que não é',['Preguiça, falta de cuidado, defeito de caráter ou drama.']]],
  [['@ponte','fazer a ponte agora']]],
 'c-habito':['Hábitos e rotinas','Rotina não é perfeição, é apoio. Comece pequeno, mantenha simples, ajuste sempre.',[
  ['Empilhar',['Fórmula: depois de [hábito atual], eu vou [hábito novo].','Use hábitos que já acontecem sozinhos: café, escovar os dentes, abrir o notebook.']],
  ['Montar a rotina',['Escolha a âncora: acordar, café, chegar em casa, deitar.','Escolha 1 a 3 hábitos pequenos, de 5 a 10 minutos.','Empilhe sempre na mesma ordem.','Tire o atrito: prepare antes.','Acompanhe com leveza, do jeito que for divertido.','Revise e ajuste.']],
  ['Para colar',['Comece minúsculo: 30 segundos.','Seja específico: plano vago é hábito esquecido.','Um de cada vez.','Comemore as pequenas vitórias.','Versão mínima para dia ruim: consistência vale mais que intensidade.']],
  ['Quando dá errado',['"Esqueço": deixe a pista mais visível.','"Não tenho tempo": encolha o hábito.','"Enjoei": troque o hábito, mantenha a pilha.','"Falhei um dia": normal, recomece na âncora.']],
  ['Recomeço rápido',['Respira: você não está atrasado.','Não refaça a rotina inteira: volte só na âncora.','Um passo pequeno; o impulso vem depois.','Seja gentil: o cérebro está fazendo o que pode.']]],
  [['pilhas','empilhar hábitos'],['ifwoop','se-então']]],
 'c-energia':['Energia','Não é sobre tempo, é sobre energia. Use a energia como dado.',[
  ['Zonas',['Alta: foco profundo, criar, resolver o difícil, decisões grandes.','Média: rotina, comunicação, organizar.','Baixa: tarefas simples, manutenção, vitórias rápidas.','Esgotada: só recuperar, sem forçar produtividade.']],
  ['Montar o dia pela energia',['Mapeie as zonas do seu dia por uma semana.','Liste e classifique as tarefas: alta, média, baixa, recuperação.','Encaixe cada tarefa no bloco de energia certo.','Deixe folga entre blocos.','Ajuste todo dia sem culpa.']],
  ['Check-in de 2 minutos',['Como está a energia agora?','Qual é a prioridade?','Que energia ela pede?','É a hora certa para ela?','Qual é uma coisa que dá para fazer agora?']],
  ['Vazamentos de energia',['Rolar a tela, fazer várias coisas ao mesmo tempo, aceitar demais.','Descanso é produtivo: agende como qualquer tarefa.']]],
  [['energia','energia do momento'],['plan','planejador do dia']]],
 'c-fim':['Encerrar o dia','Fechar o ciclo deixa a cabeça soltar o trabalho, dormir melhor e chegar amanhã com foco.',[
  ['Seis passos',['Esvaziar a cabeça: despejo de tudo, sem organizar.','Revisar e fechar o que é urgente.','Planejar amanhã: agenda, 1 a 3 prioridades, primeiro bloco.','Arrumar o espaço: mesa, coisas no lugar, abas fechadas.','Avisar a equipe e encerrar.','Desligar: notebook fechado, notificações em silêncio, respirar e alongar.']],
  ['Linha do tempo (20 a 30 min)',['5 min despejo.','10 min revisar, fechar e planejar.','5 min arrumar o espaço.','5 min avisar e encerrar.','2 a 5 min desligar.']],
  ['Extras',['Cronômetro de encerramento.','Checklist igual todo dia: rotina tira peso da cabeça.','Celular em outro cômodo à noite.']]],
  [['fim','fechar o expediente'],['listas','despejo']]],
 'c-higiene':['Higiene com TDAH','Dificuldade com higiene não é preguiça: é o cérebro. Trabalhe com ele.',[
  ['Menos energia para começar',['Produtos à vista e à mão.','Produtos 2 em 1.','Mesmo horário todo dia.','Deixar pronto na véspera.','Música, podcast ou audiolivro junto.']],
  ['Empilhar',['Escovar os dentes depois do café.','Lavar o rosto depois do banheiro.','Desodorante antes de se vestir.','Pele ou remédio depois de escovar os dentes.']],
  ['Com dopamina',['Cheiros, texturas e sabores de que você gosta.','Trocar de produto de vez em quando.','Cronômetro ou app com som e visual bons.','Recompensa depois da rotina.']],
  ['Baixar a régua',['Meio feito é melhor que nada.','Enxaguante conta, lenço umedecido conta, xampu seco conta.','Escovar por 30 segundos conta.','Um dia bom não apaga os ruins, e um ruim não apaga os bons.']],
  ['Lembretes e menos passos',['Alarme, bilhete no espelho, checklist, quadro de rotina.','Escova no box, desodorante onde se veste, lenços perto da cama.','Itens duplicados: banheiro, mochila, carro, trabalho.']],
  ['Sentidos e gentileza',['Temperatura da água, textura da pasta, cheiro forte, cabelo molhado: adapte o que incomoda.','Vergonha piora. Constância vale mais que perfeição.']],
  ['Rotina simples',['Manhã: dentes, rosto, desodorante.','Noite: banho ou enxágue, dentes.','Quando der: xampu seco, lenços, trocar de roupa.']]],
  [['pilhas','pilhas de higiene']]],
 'c-auto':['Automatizar','Tirar da cabeça o que pode virar fluxo.',[
  ['Triagem de e-mail',['Separar por remetente importante, "pede ação" e rascunho de resposta.']],
  ['Resumo de reunião',['Transcrever, tirar as ações e os responsáveis e mandar para a lista de tarefas.']],
  ['Extração de documentos',['Notas, recibos e PDFs viram linhas numa planilha de gastos.']],
  ['Escrita em série',['Texto ou áudio vira rascunho, posts e agenda de publicação.']]],[]]};
function mfD(){var c=cxD();c.mf=c.mf||{};var m=c.mf;m.dump=m.dump||[];m.dia=m.dia||{};m.pilhas=m.pilhas||[];m.ifs=m.ifs||[];m.woop=m.woop||{};m.sem=m.sem||{};
 var lim=diaStr(hojeN()-30);Object.keys(m.dia).forEach(function(d){if(d<lim)delete m.dia[d];});return m;}
function mfDia(){var m=mfD(),d=hoje();m.dia[d]=m.dia[d]||{};return m.dia[d];}
function mfSalva(){try{grava();}catch(e){}}
function mfId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,5);}
var MF_Q={a:['fazer agora','urgente e importante'],p:['planejar','importante, sem pressa'],d:['delegar','urgente, não importante'],c:['cortar','nem urgente nem importante']};
var MF_FIM=[['Esvaziar a cabeça',['despejar tudo o que está na cabeça (Duas listas)','incluir preocupações e ideias soltas, sem organizar']],
 ['Revisar e fechar',['olhar a lista do dia','fechar ou dar o próximo passo no que é urgente','mandar os últimos retornos']],
 ['Planejar amanhã',['ver a agenda de amanhã','escolher 1 a 3 prioridades','marcar o primeiro bloco']],
 ['Arrumar o espaço',['mesa sem tralha','coisas de volta no lugar','fechar as abas']],
 ['Avisar e encerrar',['deixar recado claro para a equipe','avisar quando volta a responder']],
 ['Desligar',['fechar o notebook','silenciar as notificações','respirar fundo e alongar']]];
var MF_PRE=[['Manhã','acordar',['beber água','tomar o remédio da manhã','me vestir'],'só a água'],['Café','fazer o café',['um copo d\'água inteiro'],'meio copo'],['Dentes','escovar os dentes',['1 minuto de respiração'],'3 respirações'],
 ['Foco','abrir o notebook',['escrever as 3 prioridades'],'escrever 1'],['Porta','abrir a porta para sair',['10 agachamentos'],'3 agachamentos'],['Noite','apagar a luz',['lembrar 3 coisas boas do dia'],'lembrar 1'],
 ['Sobrecarga','me sentir sobrecarregado',['3 respirações fundas'],'1 respiração'],['Higiene · manhã','sair da cama',['escovar os dentes','lavar o rosto','desodorante'],'só os dentes'],['Higiene · noite','chegar em casa',['banho ou enxágue rápido','escovar os dentes'],'enxaguar a boca'],
 ['Estudo','almoçar',['abrir o caderno de questões','fazer 5 questões'],'1 questão']];
var MF_EN={alta:['alta','foco profundo, criar, problema difícil, decisão grande','minuta difícil, conteúdo novo do concurso, questões'],
 media:['média','rotina, comunicação, organizar','e-mails, conferência de minutas, revisão espaçada'],
 baixa:['baixa','tarefa simples, manutenção, vitória rápida','triagem, arquivar, lançar movimentos, leitura leve'],
 vazia:['esgotada','só recuperar: nada de forçar produtividade','caminhar, alongar, deitar, respirar, escrever no diário']};
function mfChk(k,on,t){return '<label class="mf-ck"><input type="checkbox" data-mfck="'+k+'"'+(on?' checked':'')+'><span>'+esc(t)+'</span></label>';}
function mfPagina(p){var m=mfD(),D=mfDia(),h='';
 if(p==='listas'){var v=CX.st.vis||'lista',G=m.dump.filter(function(x){return x.st==='g'&&!x.ok;}),P=m.dump.filter(function(x){return x.st==='p'&&!x.ok;});
  var item=function(x){return '<li class="mf-it'+(x.ok?' ok':'')+'"><button type="button" class="mf-st st-'+(x.st||'n')+'" data-mfst="'+x.id+'" title="hoje: grande, pequena ou nada">'+(x.st==='g'?'grande':x.st==='p'?'pequena':'hoje?')+'</button>'+
   '<span class="mf-tx">'+esc(x.t)+'</span><button type="button" class="mf-q q-'+(x.q||'n')+'" data-mfq="'+x.id+'" title="matriz">'+(x.q?MF_Q[x.q][0]:'matriz')+'</button>'+
   '<button type="button" class="mf-ok" data-mfok="'+x.id+'" title="feito">'+(x.ok?'✓':'○')+'</button><button type="button" class="mf-del" data-mfdel="'+x.id+'" aria-label="apagar">×</button></li>';};
  h='<h3>Duas listas</h3><p class="mf-d">Despeje tudo, sem ordem e sem julgar. Depois escolha 1 grande e até 2 pequenas: essa é a lista de hoje. O resto espera sem culpa.</p>'+
   '<div class="mf-hoje"><span class="mf-k">fórmula do dia · 1 grande + 2 pequenas + rotina</span>'+
   (G.concat(P).length?G.concat(P).map(function(x){return '<div class="mf-hj"><b class="st-'+x.st+'">'+(x.st==='g'?'grande':'pequena')+'</b><span>'+esc(x.t)+'</span><button type="button" data-mfgo="'+x.id+'">começar · 5 min</button><button type="button" data-mfok="'+x.id+'">feito</button></div>';}).join(''):'<p class="mf-vz">Marque "hoje?" em até 3 itens do despejo.</p>')+'</div>'+
   '<div class="mf-add"><input data-mfin="dump" maxlength="120" placeholder="uma coisa por vez · Enter para soltar"><button type="button" data-mf="dumpadd">soltar</button></div>'+
   '<p class="mf-d mf-s">Leva menos de 2 minutos? Faz agora e marca ○. Mais que isso: escolhe, planeja ou corta.</p>'+
   '<div class="mf-vis"><button type="button" data-mfvis="lista"'+(v==='lista'?' class="on"':'')+'>lista</button><button type="button" data-mfvis="matriz"'+(v==='matriz'?' class="on"':'')+'>matriz</button><button type="button" data-mf="limpa">tirar os feitos</button></div>';
  if(v==='matriz'){h+='<div class="mf-mz"><span class="mz-l mz-u">urgente</span><span class="mz-l mz-nu">sem pressa</span>'+['a','p','d','c'].map(function(q){var L=m.dump.filter(function(x){return x.q===q&&!x.ok;});
    return '<div class="mz-c mz-'+q+'"><b>'+MF_Q[q][0]+'</b><small>'+MF_Q[q][1]+'</small><ul>'+L.map(function(x){return '<li data-mfq="'+x.id+'">'+esc(x.t)+'</li>';}).join('')+'</ul></div>';}).join('')+
   '</div><p class="mf-d mf-s">Toque num item para mudar de quadrado. Sem quadrado: '+m.dump.filter(function(x){return !x.q&&!x.ok;}).length+' itens na lista.</p>';}
  else h+='<ul class="mf-lst">'+(m.dump.length?m.dump.map(item).join(''):'<li class="mf-vz">Cabeça vazia por aqui. Solte a primeira coisa.</li>')+'</ul>';}
 else if(p==='fim'){var F=D.fim||{},tot=0,ok=0;MF_FIM.forEach(function(b,i){b[1].forEach(function(t,j){tot++;if(F[i+'.'+j])ok++;});});
  h='<h3>'+('Fechar o expediente')+'</h3><p class="mf-d">O cérebro com TDAH não desliga sozinho do trabalho. Fechar o ciclo deixa a noite livre. De 20 a 30 minutos, sempre na mesma ordem.</p>'+
   '<div class="mf-bar"><i style="width:'+Math.round(ok/tot*100)+'%"></i><span>'+ok+' de '+tot+'</span></div>'+
   (CX.st.fimT?'<span class="cx-big cx-mini" data-cxrel>25:00</span>':'<button type="button" class="mf-tm" data-mf="fimT">cronômetro de 25 min</button>')+
   '<div class="mf-gr">'+MF_FIM.map(function(b,i){return '<div class="mf-cd"><b><i>'+(i+1)+'</i>'+b[0]+'</b>'+b[1].map(function(t,j){return mfChk('fim|'+i+'.'+j,F[i+'.'+j],t);}).join('')+'</div>';}).join('')+'</div>'+
   (ok===tot?'<p class="mf-fe">Expediente encerrado. O resto é amanhã.</p>':'');}
 else if(p==='pilhas'){var PL=D.pl||{};
  h='<h3>Empilhar hábitos</h3><p class="mf-d">Prenda o hábito novo num que você já faz. Fórmula: depois de [hábito atual], eu vou [hábito novo]. Comece pequeno: 30 segundos bastam.</p>'+
   '<div class="mf-pls">'+(m.pilhas.length?m.pilhas.map(function(x){var f=PL[x.id]||[],n=x.p.filter(function(_,i){return f[i];}).length;
    return '<div class="mf-cd mf-pl'+(n===x.p.length?' ok':'')+'"><button type="button" class="mf-del" data-mfpldel="'+x.id+'" aria-label="apagar">×</button><small>'+esc(x.n||'')+'</small><b>Depois de '+esc(x.a)+', eu vou:</b>'+
     x.p.map(function(t,i){return mfChk('pl|'+x.id+'|'+i,f[i],t);}).join('')+(x.min?'<span class="mf-min">dia ruim: '+esc(x.min)+' já conta</span>':'')+'</div>';}).join(''):'<p class="mf-vz">Nenhuma pilha ainda. Escolha uma pronta ou monte a sua.</p>')+'</div>'+
   '<span class="mf-k">prontas</span><div class="cx-chips mf-chips">'+MF_PRE.map(function(x,i){return '<button type="button" data-mfpre="'+i+'">'+esc(x[0])+'</button>';}).join('')+'</div>'+
   '<span class="mf-k">montar</span><div class="mf-form"><input name="pla" maxlength="60" placeholder="depois de… (âncora: algo que você já faz todo dia)" value="'+esc(CX.st.pla||'')+'">'+
   '<textarea name="plp" rows="3" placeholder="eu vou… (um passo por linha, no máximo 4)">'+esc(CX.st.plp||'')+'</textarea><input name="plm" maxlength="60" placeholder="versão mínima, para dia ruim (opcional)" value="'+esc(CX.st.plm||'')+'"><button type="button" class="cx-pri" data-mf="pladd">guardar a pilha</button></div>'+
   '<div class="mf-cd mf-rr"><b>Caiu da rotina?</b><span>Respira. Não refaça tudo: volte só na âncora e faça um passo pequeno. O impulso vem depois da ação. Recomeçar é normal.</span></div>';}
 else if(p==='pausa'){var Pz=D.pz||(D.pz={sp:0,ag:0,fx:[],mv:[],vit:[]}),MV=['levantar e alongar','buscar água andando','10 agachamentos'],FX=['apertar a bolinha','rabiscar','girar a caneta','alongar os dedos','mexer os pés'];
  h='<h3>Pausa e água</h3><p class="mf-d">Blocos curtos com pausa de verdade. A pausa faz parte do plano, não é prêmio.</p>'+
   '<div class="mf-gr mf-gr2"><div class="mf-cd"><b>Sprints de foco</b><div class="mf-pies">'+[0,1,2,3,4,5,6,7].map(function(i){return '<button type="button" class="mf-pie'+(i<Pz.sp?' on':'')+'" data-mfsp="'+(i+1)+'" aria-label="sprint '+(i+1)+'"></button>';}).join('')+'</div><small>toque a cada bloco de 20 a 45 min</small></div>'+
   '<div class="mf-cd"><b>Água</b><div class="mf-gotas">'+[0,1,2,3,4,5,6,7].map(function(i){return '<button type="button" class="mf-gota'+(i<Pz.ag?' on':'')+'" data-mfag="'+(i+1)+'" aria-label="copo '+(i+1)+'"></button>';}).join('')+'</div><small>'+Pz.ag+' de 8 copos</small></div>'+
   '<div class="mf-cd"><b>Mexer as mãos</b><div class="cx-chips mf-chips">'+FX.map(function(x){return '<button type="button" data-mffx="'+esc(x)+'"'+(Pz.fx.indexOf(x)>=0?' class="on"':'')+'>'+esc(x)+'</button>';}).join('')+'</div></div>'+
   '<div class="mf-cd"><b>Mexer o corpo</b>'+MV.map(function(t,i){return mfChk('mv|'+i,Pz.mv[i],t);}).join('')+'</div></div>'+
   '<div class="mf-cd mf-vit"><b>Vitórias de hoje</b>'+(Pz.vit.length?'<ul>'+Pz.vit.map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul>':'')+'<div class="mf-add"><input data-mfin="vit" maxlength="100" placeholder="uma vitória, por menor que seja"><button type="button" data-mf="vitadd">guardar</button></div></div>';}
 else if(p==='energia'){var e=D.en||'',S7=[];for(var i=6;i>=0;i--){var dk=diaStr(hojeN()-i);S7.push([dk,(m.dia[dk]||{}).en||'']);}
  h='<h3>Energia do momento</h3><p class="mf-d">Planeje com a energia, não só com o relógio. A tarefa certa na energia certa rende mais com menos briga.</p>'+
   '<div class="mf-en">'+Object.keys(MF_EN).map(function(k){return '<button type="button" class="en-'+k+(e===k?' on':'')+'" data-mfen="'+k+'"><b>'+MF_EN[k][0]+'</b></button>';}).join('')+'</div>'+
   (e?'<div class="mf-cd"><b>Combina com: '+esc(MF_EN[e][1])+'</b><span>Exemplos: '+esc(MF_EN[e][2])+'.</span>'+(e==='vazia'?'<span>Descansar também é produtivo. Amanhã a bateria é outra.</span>':'<button type="button" data-cxa="trav">escolher e começar</button>')+'</div>':'<p class="mf-vz">Como está a bateria agora?</p>')+
   '<div class="mf-sem">'+S7.map(function(x){return '<span class="en-'+(x[1]||'n')+'" title="'+x[0]+'"><i></i><small>'+x[0].slice(8)+'</small></span>';}).join('')+'</div>'+
   '<div class="mf-cd"><b>Para o dia render</b><span>Proteja as horas de energia alta para o que importa. Nas baixas, faça menos sem culpa. Deixe 10 minutos de transição entre blocos. Planeje só 60% do dia: o resto é folga para o imprevisto.</span></div>';}
 else if(p==='ifwoop'){var W=m.woop,DP=D.pronto||'';
  h='<h3>Se-então e WOOP</h3><p class="mf-d">Prender a ação num gatilho e prever o tropeço antes que ele venha.</p><div class="mf-gr mf-gr2">'+
   '<div class="mf-cd mf-wide"><b>Se-então</b><span>Se [situação], então eu [ação].</span>'+(m.ifs.length?'<ul class="mf-ifs">'+m.ifs.map(function(x){return '<li><span>se <b>'+esc(x.s)+'</b>, então eu <b>'+esc(x.e)+'</b></span><button type="button" class="mf-del" data-mfifdel="'+x.id+'" aria-label="apagar">×</button></li>';}).join('')+'</ul>':'')+
    '<div class="mf-add"><input name="ifs" maxlength="70" placeholder="se… (ex.: chegar em casa às 19h)" value="'+esc(CX.st.ifs||'')+'"><input name="ife" data-cxok="ifadd" maxlength="70" placeholder="então eu… (ex.: estudo 20 min)" value="'+esc(CX.st.ife||'')+'"><button type="button" data-cx="ifadd">guardar</button></div></div>'+
   '<div class="mf-cd mf-wide"><b>WOOP</b><span>Desejo, melhor resultado, obstáculo interno e o plano para quando ele vier.</span><div class="mf-woop">'+[['w','desejo'],['o','melhor resultado'],['ob','obstáculo interno'],['p','plano: se o obstáculo vier, então eu…']].map(function(x){return '<label><small>'+x[1]+'</small><input data-mfw="'+x[0]+'" maxlength="120" value="'+esc(W[x[0]]||'')+'"></label>';}).join('')+'</div></div>'+
   '<div class="mf-cd"><b>Definição de pronto</b><span>Antes de começar, escreva como é "terminado".</span><input data-mfpronto maxlength="120" placeholder="hoje termina quando…" value="'+esc(DP)+'"></div>'+
   '<div class="mf-cd"><b>Caixa de tempo</b><span>A tarefa cresce até ocupar o tempo dado. Prazo curto e visível.</span><button type="button" data-mf="box25">caixa de 25 min</button></div></div>';}
 else if(p==='plan'){var PL=D.plan||(D.plan={pr:['','','','',''],h:{}}),HR=[];for(var hh=6;hh<=22;hh++)HR.push(String(hh).padStart(2,'0'));
  h='<h3>Planejador do dia</h3><p class="mf-d">Esvaziar a cabeça, escolher o que importa e dar hora para isso. '+esc(new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'}))+'.</p>'+
   '<div class="mf-plan"><div class="mf-cd"><b>Prioridades</b>'+PL.pr.map(function(t,i){return '<label class="mf-pr"><i>'+(i+1)+'</i><input data-mfpr="'+i+'" maxlength="90" value="'+esc(t)+'"></label>';}).join('')+
   '<b>Despejo</b><span>'+m.dump.filter(function(x){return !x.ok;}).length+' itens soltos no despejo.</span><button type="button" data-mfp="listas">abrir as duas listas</button></div>'+
   '<div class="mf-cd"><b>Agenda</b>'+HR.map(function(x){return '<label class="mf-hr"><i>'+x+':00</i><input data-mfhr="'+x+'" maxlength="80" value="'+esc(PL.h[x]||'')+'"></label>';}).join('')+'</div></div>';}
 else if(MF_C[p]){var C=MF_C[p];
  h='<h3>'+esc(C[0])+'</h3><p class="mf-d">'+esc(C[1])+'</p>'+(C[3].length?'<div class="mf-usar"><span class="mf-k">usar</span>'+C[3].map(function(u){return '<button type="button" class="cx-pri" data-mfp="'+u[0]+'">'+esc(u[1])+'</button>';}).join('')+'</div>':'')+
   '<div class="mf-gr mf-cons">'+C[2].map(function(sx){return '<div class="mf-cd"><b>'+esc(sx[0])+'</b><ul>'+sx[1].map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul></div>';}).join('')+'</div>';}
 else if(p==='semana'){var sk=acSemana(),SW=m.sem[sk]||{},Q=[['rev','Revisar','o que aconteceu na semana'],['ana','Analisar','o que funcionou, o que não e por quê'],['rem','Remover','o que cortar, delegar ou adiar'],['aju','Ajustar','planos, metas, sistema'],['seg','Seguir','o foco da próxima semana']];
  h='<h3>Revisão da semana</h3><p class="mf-d">Uma vez por semana, meia hora. A clareza some sem ritmo. Semana de '+esc(rgPer('sem').t.replace('semana de ',''))+'.</p>'+
   '<div class="mf-rv">'+Q.map(function(x,i){return '<label class="mf-cd"><b><i>'+(i+1)+'</i>'+x[1]+'</b><small>'+x[2]+'</small><textarea data-mfsem="'+x[0]+'" rows="2">'+esc(SW[x[0]]||'')+'</textarea></label>';}).join('')+'</div>'+
   '<button type="button" class="cx-pri" data-mf="semok">'+(SW.ok?'guardado no diário de bordo ✓':'guardar no diário de bordo')+'</button>';}
 return h;}
/* painel do manual: cartões agrupados por momento; cada leitura fica junto das ferramentas do mesmo assunto.
   Página que não estiver em nenhum grupo (acrescentada por outro arquivo) cai em "Mais". "~" = o painel. */
var MF_PAINEL=[
 ['Planejar o dia','esvaziar a cabeça, escolher e dar hora',['plan','listas','abc','tempo','semana','c-prior','c-tempo']],
 ['Fazer e manter o foco','começar, sustentar e respirar entre blocos',['foco','dez','cartas','pausa','energia','c-energia','c-distr','c-hiper']],
 ['Travou?','a causa, a saída e a companhia',['@trav','@esc','@ponte','probl','ifwoop','c-comecar','c-procr','c-troca']],
 ['Cabeça e corpo','humor, calma e o dia ruim',['humor','calma','pens','trilho','treino','c-trilho','c-higiene']],
 ['Hábitos e fim do dia','o que repete e como fechar',['pilhas','fim','c-habito','c-fim']],
 ['Organização e apoio','papel, digital e o que tira da cabeça',['ped','digital','mapa','c-papel','c-digital','c-apoio','c-auto']]];
function mfItem(id){return MF_T.filter(function(t){return t[0]===id;})[0];}
function mfGrupos(){var usados={},G=MF_PAINEL.map(function(g){var it=g[2].map(mfItem).filter(Boolean);it.forEach(function(t){usados[t[0]]=1;});return [g[0],g[1],it];});
 var resto=MF_T.filter(function(t){return t[0]!=='#'&&!usados[t[0]];});if(resto.length)G.push(['Mais','o que entrou depois',resto]);return G.filter(function(g){return g[2].length;});}
function mfTipo(id){return id[0]==='@'?['companhia','mf-tc']:/^c-/.test(id)?['leitura','mf-tl']:['ferramenta','mf-tf'];}
function mfCard(t){var tp=mfTipo(t[0]);return '<button type="button" class="mf-card '+tp[1]+'" data-mfp="'+t[0]+'" data-mfbusca="'+esc((t[1]+' '+(t[2]||'')).toLowerCase())+'"><em>'+tp[0]+'</em><b>'+esc(t[1])+'</b><small>'+esc(t[2]||'')+'</small></button>';}
function mfPainelHTML(){var q=(CX.st.mfq||'').toLowerCase();
 return '<header class="mf-cab">'+'<div class="mf-sk">'+cxAv('calmo')+'<div><small>'+esc(MF_NM[1])+'</small><b>'+esc(MF_NM[0])+'</b></div></div>'+
  '<input type="search" class="mf-q" data-mfq placeholder="procurar: travei, prioridade, dormir…" value="'+esc(CX.st.mfq||'')+'"></header>'+
  '<div class="mf-paineis">'+mfGrupos().map(function(g,i){return '<section class="mf-painel" style="--pi:'+i+'"><h3>'+esc(g[0])+'</h3><p>'+esc(g[1])+'</p><div class="mf-cards">'+g[2].map(mfCard).join('')+'</div></section>';}).join('')+'</div>';}
function mfFiltra(){var w=cxEl(),q=(CX.st.mfq||'').toLowerCase().trim();
 [].forEach.call(w.querySelectorAll('.mf-card'),function(c){c.hidden=!!q&&c.getAttribute('data-mfbusca').indexOf(q)<0;});
 [].forEach.call(w.querySelectorAll('.mf-painel'),function(s){s.hidden=!!q&&!s.querySelector('.mf-card:not([hidden])');});}
function mfHTML(){var p=CX.p;if(p!=='~'&&!MF_T.some(function(t){return t[0]===p&&p!=='#';}))p=CX.p='~';
 var ct='<nav class="ct-abas" role="tablist" data-notr>'+ctAbasHTML('manual')+'</nav>';
 if(p==='~')return ct+'<div class="cx-bx mf-bx mf-home">'+mfPainelHTML()+'</div><button type="button" class="cx-x" data-cx="sair" aria-label="fechar">×</button>';
 var g=mfGrupos().filter(function(g){return g[2].some(function(t){return t[0]===p;});})[0]||['','',[]];
 return ct+'<div class="cx-bx mf-bx"><nav class="mf-top"><button type="button" class="mf-volta" data-mfp="~">← painel</button><span class="mf-gn">'+esc(g[0])+'</span>'+
  '<span class="mf-viz">'+g[2].filter(function(t){return t[0][0]!=='@';}).map(function(t){return '<button type="button" class="'+(t[0]===p?'on':'')+'" data-mfp="'+t[0]+'">'+esc(t[1])+'</button>';}).join('')+'</span></nav>'+
  '<section class="mf-pg">'+mfPagina(p)+'</section></div><button type="button" class="cx-x" data-cx="sair" aria-label="fechar">×</button>';}
document.addEventListener('input',function(e){if(!e.target.matches||!e.target.matches('#cx [data-mfq]'))return;CX.st.mfq=e.target.value;mfFiltra();});
function mfDump(){var w=cxEl(),i=w.querySelector('[data-mfin="dump"]'),t=i&&i.value.trim();if(!t)return;mfD().dump.unshift({id:mfId(),t:t,d:hoje()});mfSalva();cxPinta();var j=cxEl().querySelector('[data-mfin="dump"]');if(j)j.focus();}
function mfVit(){var w=cxEl(),i=w.querySelector('[data-mfin="vit"]'),t=i&&i.value.trim();if(!t)return;var D=mfDia();D.pz=D.pz||{sp:0,ag:0,fx:[],mv:[],vit:[]};D.pz.vit.push(t);mfSalva();cxPinta();}
function mfAch(id){return mfD().dump.filter(function(x){return x.id===id;})[0];}
/* cliques e campos do manual */
document.addEventListener('click',function(e){var w=document.getElementById('cx');if(!w||!w.classList.contains('on')||CX.m!=='mf'||!w.contains(e.target))return;var b=e.target.closest('button,li[data-mfq]');if(!b)return;var m=mfD(),D=mfDia(),a;
 if((a=b.getAttribute('data-mfp'))){e.stopPropagation();if(a==='@trav'){cxAbre('trav','ini',{});return;}if(a==='@esc'){cxAbre('esc','ini',{});return;}if(a==='@ponte'){cxAbre('trav','ponte1',{});return;}if(a==='@trav'||a==='#')return;CX.p=a;cxTimer(0);cxPinta();var pg=w.querySelector('.mf-pg');if(pg)pg.scrollTop=0;return;}
 var k=b.getAttribute('data-mf');
 if(k==='dumpadd'){mfDump();return;}if(k==='vitadd'){mfVit();return;}
 if(k==='limpa'){m.dump=m.dump.filter(function(x){return !x.ok;});mfSalva();cxPinta();return;}
 if(k==='fimT'){CX.st.fimT=1;cxPinta();cxTimer(1500,function(){try{navigator.vibrate&&navigator.vibrate([200,100,200]);}catch(z){}});return;}
 if(k==='box25'){cxFecha();try{tdFocoIni(25,'caixa de 25 min',-1);}catch(z){}try{pinta();}catch(z){}return;}
 if(k==='pladd'){var an=(CX.st.pla||'').trim(),ps=(CX.st.plp||'').split('\n').map(function(x){return x.trim();}).filter(Boolean).slice(0,4);if(!an||!ps.length)return;m.pilhas.push({id:mfId(),n:'',a:an,p:ps,min:(CX.st.plm||'').trim()});CX.st.pla=CX.st.plp=CX.st.plm='';mfSalva();cxPinta();return;}
 if(k==='semok'){var SW=m.sem[acSemana()]||{};var t=['rev','ana','rem','aju','seg'].map(function(x){return SW[x];}).filter(Boolean);if(!t.length)return;SW.ok=1;m.sem[acSemana()]=SW;cxDiario('Revisão da semana: '+t.join(' · '));cxPinta();return;}
 if((a=b.getAttribute('data-mfst'))){var x=mfAch(a);if(!x)return;var nx=x.st==='g'?'p':x.st==='p'?'':'g';var g=m.dump.filter(function(y){return y.st==='g'&&!y.ok&&y!==x;}).length,pq=m.dump.filter(function(y){return y.st==='p'&&!y.ok&&y!==x;}).length;
  if(nx==='g'&&g>=1)nx=pq<2?'p':'';if(nx==='p'&&pq>=2)nx='';x.st=nx;mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfq'))){var x2=mfAch(a);if(!x2)return;var O=['','a','p','d','c'];x2.q=O[(O.indexOf(x2.q||'')+1)%O.length];mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfok'))){var x3=mfAch(a);if(!x3)return;x3.ok=x3.ok?0:1;if(x3.ok){cxXP();try{anota('Feito: '+esc(x3.t),0,false,true);}catch(z){}}mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfdel'))){m.dump=m.dump.filter(function(y){return y.id!==a;});mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfgo'))){var x4=mfAch(a);cxAbre('trav','gesto',{tarefa:x4?x4.t:''});return;}
 if((a=b.getAttribute('data-mfpre'))){var P=MF_PRE[+a];if(P){m.pilhas.push({id:mfId(),n:P[0],a:P[1],p:P[2].slice(),min:P[3]});mfSalva();cxPinta();}return;}
 if((a=b.getAttribute('data-mfpldel'))){m.pilhas=m.pilhas.filter(function(y){return y.id!==a;});mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfvis'))){CX.st.vis=a;cxPinta();return;}
 if((a=b.getAttribute('data-mfsp'))){D.pz=D.pz||{sp:0,ag:0,fx:[],mv:[],vit:[]};D.pz.sp=D.pz.sp===+a?+a-1:+a;mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfag'))){D.pz=D.pz||{sp:0,ag:0,fx:[],mv:[],vit:[]};D.pz.ag=D.pz.ag===+a?+a-1:+a;mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mffx'))){D.pz=D.pz||{sp:0,ag:0,fx:[],mv:[],vit:[]};var i=D.pz.fx.indexOf(a);if(i>=0)D.pz.fx.splice(i,1);else D.pz.fx.push(a);mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfen'))){D.en=D.en===a?'':a;mfSalva();cxPinta();return;}
 if((a=b.getAttribute('data-mfifdel'))){m.ifs=m.ifs.filter(function(y){return y.id!==a;});mfSalva();cxPinta();return;}},true);
document.addEventListener('change',function(e){var t=e.target;if(!t.closest||!t.closest('#cx')||CX.m!=='mf')return;var D=mfDia(),m=mfD(),a;
 if((a=t.getAttribute('data-mfck'))){var P=a.split('|');
  if(P[0]==='fim'){D.fim=D.fim||{};D.fim[P[1]]=t.checked?1:0;var tot=0,ok=0;MF_FIM.forEach(function(b,i){b[1].forEach(function(_,j){tot++;if(D.fim[i+'.'+j])ok++;});});if(ok===tot&&!D.fimOk){D.fimOk=1;cxDiario('Expediente encerrado em seis passos.');cxXP();}}
  else if(P[0]==='pl'){D.pl=D.pl||{};D.pl[P[1]]=D.pl[P[1]]||[];D.pl[P[1]][+P[2]]=t.checked?1:0;if(t.checked)cxXP();}
  else if(P[0]==='mv'){D.pz=D.pz||{sp:0,ag:0,fx:[],mv:[],vit:[]};D.pz.mv[+P[1]]=t.checked?1:0;}
  mfSalva();cxPinta();return;}
 if((a=t.getAttribute('data-mfw'))){m.woop[a]=t.value;mfSalva();return;}
 if((a=t.getAttribute('data-mfpr'))!=null){D.plan=D.plan||{pr:['','','','',''],h:{}};D.plan.pr[+a]=t.value;mfSalva();return;}
 if((a=t.getAttribute('data-mfhr'))){D.plan=D.plan||{pr:['','','','',''],h:{}};D.plan.h[a]=t.value;mfSalva();return;}
 if(t.hasAttribute('data-mfpronto')){D.pronto=t.value;mfSalva();return;}
 if((a=t.getAttribute('data-mfsem'))){var sk=acSemana();m.sem[sk]=m.sem[sk]||{};m.sem[sk][a]=t.value;m.sem[sk].ok=0;mfSalva();return;}},true);
document.addEventListener('keydown',function(e){if(e.key!=='Enter')return;var t=e.target;if(!t.closest||!t.closest('#cx')||CX.m!=='mf')return;
 if(t.getAttribute('data-mfin')==='dump'){e.preventDefault();mfDump();}else if(t.getAttribute('data-mfin')==='vit'){e.preventDefault();mfVit();}},true);
/* se-então (usa o data-cx do cxClick) */
(function(c0){cxClick=function(e){var b=e.target.closest('button');if(b&&b.getAttribute('data-cx')==='ifadd'){var s=(CX.st.ifs||'').trim(),en=(CX.st.ife||'').trim();if(s&&en){mfD().ifs.push({id:mfId(),s:s,e:en});CX.st.ifs=CX.st.ife='';mfSalva();cxPinta();}return;}return c0.apply(this,arguments);};})(cxClick);
/* o manual desenha dentro da mesma moldura da companhia */
(function(p0){cxPinta=function(){if(CX.m==='mf'){var w=cxEl(),h=mfHTML(),pg=w.querySelector('.mf-pg'),st=pg?pg.scrollTop:0;if(w._h!==h){var foco=document.activeElement&&w.contains(document.activeElement)?document.activeElement.getAttribute('data-mfin')||document.activeElement.name:null;w.innerHTML=h;w._h=h;var pg2=w.querySelector('.mf-pg');if(pg2)pg2.scrollTop=st;if(foco){var f=w.querySelector('[data-mfin="'+foco+'"],[name="'+foco+'"]');if(f){f.focus();try{var L=f.value.length;f.setSelectionRange(L,L);}catch(z){}}}}w.classList.add('mf');return;}cxEl().classList.remove('mf');return p0.apply(this,arguments);};})(cxPinta);

/* ---------- travei com as sete causas e a ponte em seis passos ---------- */
(function(p0){cxPinta=function(){var w=cxEl();
 if(CX.m==='trav'&&CX.p==='ini'){var it=cxAtual(),h=cxFrame('travei · sem castigo','Travou? Normal. Me diz o que está pegando'+(it?' com '+it.t:'')+'.',
   '<div class="cx-op cx-op7">'+[['trgr','a tarefa é grande demais','elefante: eu parto em migalhas'],['tr5','não tenho vontade','cinco minutos e pode parar'],['trsapo','é desagradável','sapo primeiro: a pior, agora, curtinha'],['tr1','não sei o próximo passo','o menor gesto possível'],['trmuitas','são tarefas demais','duas listas: 1 grande + 2 pequenas'],['pt1','acabei de trocar de tarefa','a ponte: salvar, respirar, seguir'],['nv1','cabeça embaçada','três minutos de pausa guiada']].map(function(x){return '<button type="button" data-cx="'+x[0]+'"><b>'+x[1]+'</b><small>'+x[2]+'</small></button>';}).join('')+'</div>',
   cxBt('sair','já passou'),'alerta');if(w._h!==h){w.innerHTML=h;w._h=h;}w.classList.remove('mf');return;}
 if(CX.m==='trav'&&CX.p==='ponte3'){var it4=cxAtual(),s=CX.st;if(s.gesto==null)s.gesto='';
  var h2=cxFrame('ponte · o próximo e o primeiro gesto',it4?'Agora é esse. Escolhe a rampa: um gesto bobo e cinco minutos.':'Qual é o próximo? Dá um nome e escolhe a rampa.',
   (it4?'<b class="cx-t">'+esc(it4.t)+'</b>':'<input name="tarefa" maxlength="80" placeholder="o próximo, com nome claro" value="'+esc(s.tarefa||'')+'">')+
   '<input name="gesto" data-cxok="tr2" maxlength="80" placeholder="o gesto-ponte" value="'+esc(s.gesto||'')+'">'+
   '<div class="cx-chips">'+['abrir o arquivo','escrever o título','levantar','trocar de aba','mudar de lugar','mandar um e-mail'].map(function(x){return '<button type="button" data-cxgesto="'+esc(x)+'">'+esc(x)+'</button>';}).join('')+'</div>',
   cxBt('tr2','começar · 5 min',1)+cxBt('trbloco','começar o bloco')+cxBt('sair','fechar'));if(w._h!==h2){w.innerHTML=h2;w._h=h2;}w.classList.remove('mf');return;}
 if(CX.m==='trav'&&CX.p==='ponte2'){var h3=cxFrame('ponte · pausa e respiro','Pausa. Três respirações fundas, um gole d\'água. Trinta segundos e a gente nomeia o próximo.','<span class="cx-big" data-cxrel>00:30</span>',cxBt('pt3','pronto',1),'calmo');if(w._h!==h3){w.innerHTML=h3;w._h=h3;}return;}
 if(CX.m==='trav'&&CX.p==='gesto'&&CX.st.sapo){var r=p0.apply(this,arguments),bl=w.querySelector('.cx-bl span');if(bl)bl.textContent='Sapo primeiro: a mais chata, agora, só cinco minutos. Qual é o primeiro gesto?';return r;}
 return p0.apply(this,arguments);};})(cxPinta);
(function(c0){cxClick=function(e){var b=e.target.closest('button'),k=b&&b.getAttribute('data-cx');
 if(k==='tr5'){CX.m='trav';cxVai('gesto',{sapo:0});return;}
 if(k==='trsapo'){CX.m='trav';cxVai('gesto',{sapo:1});return;}
 if(k==='trmuitas'){CX.m='mf';CX.st={};cxVai('listas');return;}
 if(k==='tr1'){CX.st.sapo=0;}
 return c0.apply(this,arguments);};})(cxClick);

/* ---------- acesso: botão na faixa do nível e no topo do Posto ---------- */
function mfAbre(p){cxAbre('mf',p||'~',{});}
function mfTg(){var fc=document.getElementById('fc-tg')||document.getElementById('pt-tg');if(!fc||!fc.parentNode)return;var b=document.getElementById('mf-tg');
 if(!b){b=document.createElement('button');b.type='button';b.id='mf-tg';b.title=MF_NM[0]+' · manual de campo';b.setAttribute('aria-label',b.title);b.setAttribute('data-notr','');
  b.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z"/><path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"/><path d="M9 8l2 2 4-4M9 14h6M9 17h4"/></svg>';
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();mfAbre();});}
 if(b.previousElementSibling!==fc)fc.parentNode.insertBefore(b,fc.nextSibling);}
setTimeout(mfTg,900);setInterval(mfTg,2500);

/* ======================= NPCs por gatilho no cabeçalho do Posto =======================
   Cabeçalho limpo: só o retrato. O guardião e o antagonista do dia falam quando algo acontece
   (virada de bloco, 5 min antes da próxima, fim de bloco, vitória, desvio, ociosidade, convite da Fogueira),
   um de cada vez; o balão fica 30 s e se recolhe. Durante um bloco ninguém fala, exceto na virada.
   No máximo 4 falas por hora e nunca a mesma fala duas vezes no dia. Clicar no ponto do retrato mostra as últimas falas. */
var NPC_FALA={ativo:null,hist:false}; /* estado das falas; NPC (retrato, nome, ícone) é do 34 */
function npcD(){var d=null;try{d=JSON.parse(localStorage.getItem('astro_npc')||'null');}catch(e){}if(!d||d.d!==hoje())d={d:hoje(),ditos:{},log:(d&&d.log)||[],novo:0,antV:0,ocioso:0};return d;}
function npcFalaGrava(d){d.log=d.log.slice(-30);try{localStorage.setItem('astro_npc',JSON.stringify(d));}catch(e){}}
function npcNome(){try{return (COMP_T&&COMP_T.nm?COMP_T.nm.replace(/\s*"[^"]*"\s*/,' '):'Sully Brookhaven').split(' ')[0];}catch(e){return 'Sully';}}
function npcFala(k,quem,t,prio){var d=npcD(),ag=Date.now();if(d.ditos[k])return;var h1=d.log.filter(function(x){return ag-x.em<3600e3;}).length;if(h1>=4&&!prio)return;
 d.ditos[k]=1;var m={k:k,quem:quem,t:t,em:ag};d.log.push(m);d.novo=(d.novo|0)+1;npcFalaGrava(d);NPC_FALA.ativo={m:m,ate:ag+30000};npcFalaPinta();}
function npcFalaPinta(){try{if(document.body.classList.contains('op-on'))opPinta();}catch(e){}}
function npcAgora(){var d=new Date();return d.getHours()*60+d.getMinutes();}
function npcTick(){if(!document.body.classList.contains('op-on')){if(NPC_FALA.ativo)NPC_FALA.ativo=null;return;}var hj=hoje(),a=npcAgora(),L=[];try{L=tbkDoDia(hj);}catch(e){}var nm=npcNome(),dentro=L.filter(function(b){return a>=b.i&&a<b.f;})[0];
 if(NPC_FALA.ativo&&Date.now()>NPC_FALA.ativo.ate){NPC_FALA.ativo=null;npcFalaPinta();}
 /* manhã: primeira abertura do dia */
 if(a>=300&&a<720){var p=L.filter(function(b){return b.f>a;})[0];npcFala('bom-dia','g','Bom dia. '+(p?'Primeiro bloco: '+p.t+', às '+tbkHM(p.i)+'.':'Nada na grade hoje. Quer montar o dia?'));}
 L.forEach(function(b){
  if(a>=b.i-5&&a<b.i&&!(dentro&&dentro.f>b.i))npcFala('pre-'+b.id+'-'+b.i,'g','Em '+(b.i-a)+' min: '+b.t+'. Feche o que está aberto.',1);
  if(a>=b.i&&a<b.i+2)npcFala('ini-'+b.id+'-'+b.i,'g','Agora: '+b.t+', até '+tbkHM(b.f)+'. Só isso.',1);
  if(a>=b.f&&a<b.f+2&&!L.some(function(c){return c.i===b.f;}))npcFala('fim-'+b.id+'-'+b.f,'g','Fim de '+b.t+'. Respira: cinco minutos longe da tela.',1);});
 /* vitória sobre o antagonista */
 try{var x=antHoje(),m=antMonstro(x.m);if(x.st==='vencido'){var dd=npcD();if(!dd.antV){dd.antV=1;npcFalaGrava(dd);npcFala('ant-v','a',m.n+': desta vez você venceu. Amanhã volto com outra cara.',1);setTimeout(function(){npcFala('ant-v-g','g','+20 XP. Mandou bem, cara.',1);},31000);}}
  else if(x.st==='aberto'&&!dentro&&a>=+x.fx*60-10&&a<+x.fx*60)npcFala('ant-pre','a',m.n+' espera no bloco das '+x.fx+'h. '+m.d);}catch(e){}
 /* ociosidade: fora de bloco, entre 07h e 21h, só depois de 45 min parado */
 if(!dentro&&a>=420&&a<1260){var dd2=npcD();if(!dd2.ocioso)dd2.ocioso=Date.now(),npcFalaGrava(dd2);else if(Date.now()-dd2.ocioso>45*60e3){npcFala('oc-'+Math.floor(a/120),'g','Nada marcado agora. Escolhe a próxima flecha ou descansa de verdade.');dd2.ocioso=Date.now();npcFalaGrava(dd2);}}
 else{var dd3=npcD();if(dd3.ocioso){dd3.ocioso=0;npcFalaGrava(dd3);}}
 /* noite: convite da Fogueira */
 try{if(a>=1260&&!fgFeita()&&!dentro)npcFala('fogueira','g','A Fogueira está acesa quando você quiser fechar o dia. Um minuto, sem culpa.');}catch(e){}}
/* desvio anotado: o guardião puxa de volta, sem sermão */
if(typeof ciMarca==='function'){ciMarca=(function(f0){return function(){var r=f0.apply(this,arguments);try{var a=npcAgora(),b=tbkDoDia(hoje()).filter(function(x){return a>=x.i&&a<x.f;})[0];npcFala('desvio-'+Date.now(),'g','Anotado. Volta para '+(b?b.t:'o que estava fazendo')+'.',1);}catch(e){}return r;};})(ciMarca);}
satOpTop=(function(f0){return function(){var h=f0.apply(this,arguments),i=h.indexOf('<span class="sat-bals">'),j=i<0?-1:h.indexOf('</button>',i);if(i<0||j<0)return h;
 var d=npcD(),at=NPC_FALA.ativo,mid;
 if(at){var quem=at.m.quem==='a'?(function(){try{return antMonstro(antHoje().m).n;}catch(e){return '';}})():'';
  mid='<span class="sat-bals npc-on"><span class="bl-w"><span class="bl npc-'+at.m.quem+'" style="--i:0"><i>'+(quem?'<b>'+esc(quem)+'</b> ':'')+esc(quem&&at.m.t.indexOf(quem+':')===0?at.m.t.slice(quem.length+1).trim():at.m.t)+'</i></span></span></span>';}
 /* sem fala ativa o guardião não fica no cabeçalho: sobra só o marcador das falas do dia (some se não houve nenhuma) */
 else{var b0=h.indexOf('<button type="button" class="op-sat');if(b0<0||b0>i)return h;
  return h.slice(0,b0)+(d.log.length?'<span class="op-sat2 npc-fora"><span class="npc-pt'+(d.novo?' novo':'')+'" data-npchist title="últimas falas de '+esc(npcNome())+'">'+(d.novo?d.novo:'···')+'</span></span>':'')+h.slice(j+9);}
 return h.slice(0,i).replace('class="op-sat op-sat2','class="op-sat op-sat2 npc-vem')+mid+h.slice(j);};})(satOpTop);
function npcFalaHist(alvo){var o=document.getElementById('npc-hist');if(o){o.remove();return;}var d=npcD();d.novo=0;npcFalaGrava(d);o=document.createElement('div');o.id='npc-hist';o.className='npc-hist';
 var nm=npcNome(),an='';try{an=antMonstro(antHoje().m).n;}catch(e){}
 o.innerHTML='<b>últimas falas</b><ul>'+d.log.slice(-8).reverse().map(function(m){var dt=new Date(m.em);return '<li><small>'+String(dt.getHours()).padStart(2,'0')+':'+String(dt.getMinutes()).padStart(2,'0')+' · '+esc(m.quem==='a'?an:nm)+'</small><span>'+esc(m.t)+'</span></li>';}).join('')+'</ul>';
 document.body.appendChild(o);var r=alvo.getBoundingClientRect();o.style.left=Math.max(8,Math.min(innerWidth-330,r.left-20))+'px';o.style.top=(r.bottom+8)+'px';npcFalaPinta();}
window.addEventListener('click',function(e){var p=e.target.closest&&e.target.closest('[data-npchist]');if(p){e.preventDefault();e.stopImmediatePropagation();npcFalaHist(p);return;}var o=document.getElementById('npc-hist');if(o&&!e.target.closest('#npc-hist'))o.remove();},true);
setInterval(function(){try{npcTick();}catch(e){}},15000);setTimeout(function(){try{npcTick();}catch(e){}},2500);
(function(){var st=document.createElement('style');st.id='npc-css';var B='html body #modo-op .op-sat2';st.textContent=[
 B+' .sat-bals.npc-on .bl{animation:npcEntra .45s cubic-bezier(.2,.9,.3,1.3) both}',
 '@keyframes npcEntra{from{opacity:0;transform:translateX(-14px) scale(.9)}to{opacity:1;transform:none}}',
 B+' .sat-bals.npc-on .bl{max-width:460px!important;font-style:normal!important}',
 B+' .sat-bals.npc-on .bl b{font:700 12px Georgia,serif;margin-right:4px}',
 B+' .bl.npc-a{background:#1f2a22!important;color:#f3e6c4!important;border-color:#d4ad4f!important}',
 B+' .bl-w:has(.npc-a)::before{background:#1f2a22!important;border-color:#d4ad4f!important}',
 '@keyframes npcSai{from{opacity:0;transform:translateY(-10px) scale(.94)}to{opacity:1;transform:none}}',
 B+'.npc-vem{animation:npcSai .4s cubic-bezier(.2,.9,.3,1.2) both}',
 B+'.npc-fora{display:flex;align-items:center;justify-content:center;min-width:28px}',
 B+' .npc-pt{display:grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;border:1.5px solid #2e2620;background:#fffdf6;font:700 10px var(--mono,monospace);color:#5a3f2c;cursor:pointer}',
 B+' .npc-pt.novo{background:#c8553d;border-color:#c8553d;color:#fff;animation:npcPulsa 1.6s ease-in-out infinite}',
 '@keyframes npcPulsa{50%{box-shadow:0 0 0 4px rgba(200,85,61,.25)}}',
 '.npc-hist{position:fixed;z-index:90;width:310px;max-height:60vh;overflow:auto;padding:10px 12px;border-radius:12px;background:#fffdf6;border:1.5px solid #2e2620;box-shadow:0 14px 30px -12px rgba(0,0,0,.5);color:#2a2418}',
 '.npc-hist>b{display:block;margin-bottom:6px;font:700 9px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#8a6f55}',
 '.npc-hist ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}',
 '.npc-hist li{display:flex;flex-direction:column;gap:1px;padding-bottom:6px;border-bottom:1px dotted rgba(90,63,44,.35)}',
 '.npc-hist small{font:600 9.5px var(--mono,monospace);color:#8a6f55}.npc-hist span{font:13px/1.35 Georgia,serif}'
].join('\n');document.head.appendChild(st);})();


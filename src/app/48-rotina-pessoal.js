/* ======================= Rotina pessoal combinada (a partir de 29/11/2026) =======================
   Entra na mesma lista de compromissos da Agenda Google (AG.ev), pelo trgJunta da parte 47.
   Semana-base:
     seg–sex  Alvorada 05:30 · café e plano 06:00 · ciclo 1 06:30–08:00 · ciclo 2 08:15–09:45 (ter/qui: natação)
              · 3º bloco 09:45–10:20 · banho e ida 10:20 · noite (seg–qui): treino 18:00, banho e jantar 18:45,
              tarefa útil e cuidados 19:45 (ter: RLM; qui: Português), Fogueira 20:30, leitura 21:00, deitar 21:45
     sex e sáb à noite: Escala (sair e explorar) · sáb: recuperação, à tarde jogos, HQs e escrita
     dom: parque ao ar livre de manhã, à tarde espiritualidade, receita e finanças, à noite preparação da semana
   Matérias (esta semana): seg Tributário e Português · ter Previdenciário · qua Constitucional e Francês
   · qui Administrativo · sex Ambiental e Tributário. Treinos em sequência A→B→C→D (nunca dois dias sem treinar). */
var ROT_INI='2026-11-29';
var ROT_EST={1:['Tributário','Português'],2:['Previdenciário',null],3:['Constitucional','Francês'],4:['Administrativo',null],5:['Ambiental','Tributário']};
var ROT_TREINO={1:'A · peito e tríceps',2:'B · costas e bíceps',3:'C · pernas',4:'D · ombros'};
function rotEventos(de,ate){var r=[],x=new Date(Math.max(+de,+trgD(ROT_INI)));x.setHours(0,0,0,0);
 var H=function(hm,min,t,loc){r.push(trgHora(x,hm,min,t,loc));};
 while(x<=ate){var w=x.getDay();
  if(w>=1&&w<=5){var E=ROT_EST[w];
   H('05:30',30,'Alvorada: luz, água, sonho, vácuo, corda, orações e afirmações');
   H('06:00',30,'Café da manhã e plano do dia (bateria, missão, caixas)');
   H('06:30',90,'Estudo · ciclo 1 · '+E[0]);
   if(E[1])H('08:15',90,'Estudo · ciclo 2 · '+E[1]);else H('08:15',90,'Natação');
   if(E[1])H('09:45',35,'Revisão e flashcards');
   H('10:20',40,'Banho, lanche e ida ao gabinete');
   if(w<=4){H('18:00',45,'Treino '+ROT_TREINO[w]+' (seguir a sequência)','Pleno Vigor');
    H('18:45',60,'Banho e jantar');
    if(w===2)H('19:45',25,'RLM (bônus, se a noite sobrar)');else if(w===4)H('19:45',25,'Português (bônus, se a noite sobrar)');
    else H('19:45',30,'Tarefa útil (10 min) e cuidados pessoais');
    H('20:30',30,'Fogueira: fechar o dia, gastos e roupa de amanhã');
    H('21:00',45,'Desacelerar: leitura (Percy Jackson) e chá, telas apagadas');
    H('21:45',15,'Deitar · dormir às 22h');}
   else{H('19:30',180,'Escala: sair e explorar (Sabores, Movimento, Cultura, Tribo)');}}
  if(w===6){H('14:00',180,'Tarde livre: jogos, HQs e escrita');H('19:30',180,'Escala: sair e explorar (Sabores, Movimento, Cultura, Tribo)');}
  if(w===0){H('07:00',90,'Parque ao ar livre: corrida ou caminhada, sol e grama');
   H('14:00',90,'Espiritualidade: universo, runas e tarô');H('16:00',90,'Receita da semana e finanças');
   H('19:00',90,'Preparação da semana: roupa, marmitas e plano no app');H('21:45',15,'Deitar · dormir às 22h');}
  x.setDate(x.getDate()+1);}
 return r.filter(function(e){return e.fim>=de&&e.ini<=ate;});}

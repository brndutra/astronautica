/* ======================= Calendário da Turma Regional de MS e prazos do gabinete =======================
   Sessões oficiais (Comunicado da Presidência da TRgMS de 23/11/2026, SEI 0033702-60.2026.4.03.8000: calendário 2027)
   e os prazos combinados para cada sessão, contados da data da sessão (dia não útil recua para o dia útil anterior):
     peço dia = data de recebimento do comunicado ("pautar até")  ·  designação = dia útil seguinte ao peço dia
     minutas prontas = 10 dias antes  ·  correções feitas = 7 dias antes  ·  liberação dos votos = 5 dias antes
     votar nos processos dos outros gabinetes = 3 dias antes  ·  imprimir votos com sustentação oral = dia útil anterior
     pós-sessão (inteiro teor, confirmação do diretor, chamados) = dia útil seguinte
   Fixos: Vigília (segunda e quinta, 11h, 15 min: pauta, atrasos, retiradas, chamados) · Inteligência (terça, 14h–16h)
   · presenças no EGP (dia 5; não útil → dia útil anterior).
   Entra na mesma lista de compromissos da Agenda Google (AG.ev, parte 20): aparece na Grade, no spread do mês,
   no card da agenda e no Posto. Não duplica o que já vier igual da Agenda Google. Feriados não estão na conta. */
var TRG_SES=[
 /* [data da sessão, recebimento (peço dia), tipo] — 'p' presencial sexta 10h; 'v' virtual assíncrona (até a data final) */
 ['2026-11-30','', 'x','14:00'],                 /* sessão remarcada de 27/11 para 30/11, às 14h */
 ['2026-12-15','', 'x',''],                      /* [VALIDAR] horário e tipo */
 ['2027-01-29','2026-12-09','p'],['2027-02-12','2027-01-08','p'],['2027-02-26','2027-01-22','p'],
 ['2027-03-12','2027-02-04','p'],['2027-03-22','2027-02-16','v','2027-03-24'],['2027-04-02','2027-02-26','p'],
 ['2027-04-16','2027-03-10','p'],['2027-04-30','2027-03-29','p'],['2027-05-14','2027-04-09','p'],
 ['2027-05-24','2027-04-19','v','2027-05-26'],['2027-06-04','2027-04-30','p'],['2027-06-18','2027-05-13','p'],
 ['2027-07-02','2027-05-31','p'],['2027-07-16','2027-06-14','p'],['2027-07-30','2027-06-28','p'],
 ['2027-08-13','2027-07-09','p'],['2027-08-23','2027-07-20','v','2027-08-25'],['2027-09-03','2027-07-29','p'],
 ['2027-09-17','2027-08-13','p'],['2027-10-01','2027-08-25','p'],['2027-10-15','2027-09-10','p'],
 ['2027-10-27','2027-09-20','v','2027-10-29'],['2027-11-12','2027-10-07','p'],['2027-11-26','2027-10-20','p'],
 ['2027-12-01','2027-10-26','v','2027-12-01'],['2027-12-10','2027-11-04','p']];
/* prazos avulsos combinados */
var TRG_AVULSOS=[['2026-11-30','Monocráticas: entregar as minutas do mês']];
function trgD(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2]);}
function trgUtilAntes(d){d=new Date(d);while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()-1);return d;}
function trgUtilDepois(d){d=new Date(d);do{d.setDate(d.getDate()+1);}while(d.getDay()===0||d.getDay()===6);return d;}
function trgMenos(d,n){var x=new Date(d);x.setDate(x.getDate()-n);return trgUtilAntes(x);}
function trgDM(d){return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0');}
function trgDia(d,t){var a=new Date(d);a.setHours(0,0,0,0);var b=new Date(a);b.setDate(b.getDate()+1);return {t:t,ini:a,fim:b,dia:true,loc:'',trg:1};}
function trgHora(d,hm,min,t,loc){var p=hm.split(':'),a=new Date(d);a.setHours(+p[0],+p[1],0,0);return {t:t,ini:a,fim:new Date(a.getTime()+min*60e3),dia:false,loc:loc||'',trg:1};}
function trgEventos(de,ate){var r=[];
 TRG_SES.forEach(function(s){var d=trgD(s[0]),dm=trgDM(d),tipo=s[2];
  if(tipo==='v'){var f=trgD(s[3]),fim=new Date(f);fim.setDate(fim.getDate()+1);r.push({t:'Sessão virtual TRgMS (assíncrona, até '+trgDM(f)+')',ini:d,fim:fim,dia:true,loc:'Ambiente virtual',trg:1});}
  else if(tipo==='p')r.push(trgHora(d,'10:00',240,'Sessão de julgamento TRgMS','Campo Grande/MS · presencial'));
  else if(s[3])r.push(trgHora(d,s[3],210,'Sessão de julgamento TRgMS',''));
  else r.push(trgDia(d,'Sessão de julgamento TRgMS [confirmar horário]'));
  if(s[1]){var pd=trgD(s[1]);r.push(trgDia(pd,'Peço dia · pauta de '+dm));r.push(trgDia(trgUtilDepois(pd),'Designação · pauta de '+dm));}
  r.push(trgDia(trgMenos(d,10),'Minutas prontas · sessão de '+dm));
  r.push(trgDia(trgMenos(d,7),'Correções feitas · sessão de '+dm));
  r.push(trgDia(trgMenos(d,5),'Liberação dos votos · sessão de '+dm+' (resumo ao Dr. Muta)'));
  r.push(trgDia(trgMenos(d,3),'Votar nos outros gabinetes · sessão de '+dm));
  r.push(trgDia(trgMenos(d,1),'Imprimir votos com sustentação oral · sessão de '+dm));
  r.push(trgDia(trgUtilDepois(tipo==='v'?trgD(s[3]):d),'Pós-sessão de '+dm+': inteiro teor, confirmação do diretor, chamados'));});
 TRG_AVULSOS.forEach(function(a){r.push(trgDia(trgD(a[0]),a[1]));});
 /* fixos semanais e mensais */
 var x=new Date(de);x.setHours(0,0,0,0);
 while(x<=ate){var w=x.getDay();
  if(w===1||w===4)r.push(trgHora(x,'11:00',15,'Vigília: pauta, atrasos, retiradas e chamados','Gabinete'));
  if(w===2)r.push(trgHora(x,'14:00',120,'Inteligência: acervo, temas repetidos e modelos','Gabinete'));
  if(x.getDate()===1){var c=new Date(x.getFullYear(),x.getMonth(),5);r.push(trgDia(trgUtilAntes(c),'Presenças do mês anterior no EGP'));}
  x.setDate(x.getDate()+1);}
 return r.filter(function(e){return e.fim>=de&&e.ini<=ate;});}
/* junta à lista da Agenda Google, sem repetir o que já vier de lá (mesmo título e mesmo início) */
function trgJunta(){if(typeof AG==='undefined')return;var de=new Date();de.setHours(0,0,0,0);de.setDate(de.getDate()-14);var ate=new Date();ate.setDate(ate.getDate()+120);
 var base=AG.ev.filter(function(e){return !e.trg;}),k={};base.forEach(function(e){k[e.t+'|'+(+e.ini)]=1;});
 AG.ev=base.concat(trgEventos(de,ate).filter(function(e){return !k[e.t+'|'+(+e.ini)];})).sort(function(a,b){return a.ini-b.ini;});}
(function(){var b0=agBusca;agBusca=function(){var r=b0.apply(this,arguments);trgJunta();return r;};
 var p0=agPintaTudo;agPintaTudo=function(){trgJunta();return p0.apply(this,arguments);};})();
setTimeout(function(){trgJunta();try{agPintaTudo();}catch(e){}},1200);

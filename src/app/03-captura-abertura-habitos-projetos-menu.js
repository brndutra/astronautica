/* ===== captura, abertura, hábitos, projetos, menu ===== */
function seq(hist){ if(!hist||!hist.length) return 0;
 var set={},i; for(i=0;i<hist.length;i++) set[hist[i]]=1;
 var n=0,d=hojeN();
 if(!set[hoje()]) d=d-1;
 while(set[diaStr(d)]){ n++; d--; }
 return n; }
function diaStr(n){ var d=new Date(n*864e5); return d.getUTCFullYear()+"-"+String(d.getUTCMonth()+1).padStart(2,"0")+"-"+String(d.getUTCDate()).padStart(2,"0"); }
function pintaCap(){
 var h="",i,C=S.cap;
 for(i=0;i<C.length;i++) h+='<li><span>'+esc(C[i].t)+'</span>'+
   '<button data-cl="'+i+'">vira lâmina</button><button class="x3" data-cx="'+i+'">✕</button></li>';
 el("cp-l").innerHTML=h||'<li class="vz6">caixa vazia</li>';
 lig("b-cap",function(){ var v=el("cp-in").value.trim(); if(!v)return;
  S.cap.unshift({t:v,d:hoje()}); if(S.cap.length>60) S.cap.length=60;
  el("cp-in").value=""; move(0,1,"Captura: "+esc(v),false,-2,0,0);});
 var n=document.querySelectorAll("[data-cl]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var k=+this.getAttribute("data-cl"), it=S.cap[k];
  S.extras.push({id:"x"+Date.now(),c:"dig",e:"baixa",t:5,h:it.t,p:"",s:["Faça a coisa."],d:""});
  S.cap.splice(k,1); move(0,2,"Captura triada: “"+esc(it.t)+"” virou lâmina.",false,-2,0,0);});
 n=document.querySelectorAll("[data-cn]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var k=+this.getAttribute("data-cn"), it=S.cap[k];
  S.notas.unshift({t:it.t.slice(0,60),b:it.t,tags:["captura"],d:hoje()});
  S.cap.splice(k,1); move(0,2,"Captura arquivada como nota.",false,-2,1,0);});
 n=document.querySelectorAll("[data-cx]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  S.cap.splice(+this.getAttribute("data-cx"),1); pinta();});
 var inp=el("cp-in");
 if(inp) inp.addEventListener("keydown",function(e){ if(e.key==="Enter"){ var b=el("b-cap"); if(b) b.click(); }});
}
var DIRC=[
 ["agua","Oito copos de \u00e1gua",function(d){return ((S.agua&&S.agua[d])||0)>=8;}],
 ["ativ","Vinte minutos de corpo",function(d){return ((S.ativ&&S.ativ[d])||0)>=20;}],
 ["sono","Sete horas de sono registradas",function(d){return ((S.sono&&S.sono[d])||0)>=7;}],
 ["ref","Tr\u00eas refei\u00e7\u00f5es marcadas",function(d){var q=(S.refs&&S.refs[d])||{};return (q.m?1:0)+(q.t?1:0)+(q.n?1:0)>=3;}]
];
function misNova(){
 var d=hoje(), n=diaN(d), c=DIRC[n%DIRC.length][0], pesada=S.carga>=LIMIAR;
 S.mis={d:d,c:c,r:pesada?"rup":"decl",pago:0};
}
function misCont(){ var i; for(i=0;i<DIRC.length;i++) if(DIRC[i][0]===(S.mis&&S.mis.c)) return DIRC[i]; return DIRC[0]; }
function fichaHoje(){ var k; for(k in S.fichas) if(S.fichas[k]===hoje()) return true; return false; }
function misEstado(){
 if(!S.mis||S.mis.d!==hoje()) misNova();
 var d=hoje(), C=misCont();
 var a=C[2](d), b=fichaHoje();
 var c=(S.mis.r==="rup")?(S.usos.rup>=1&&S.ign.decl===d):(S.ign.decl===d);
 return {a:a,b:b,c:c,n:(a?1:0)+(b?1:0)+(c?1:0),rot:C[1]};
}
function checaMis(){
 var m=misEstado();
 if(m.n===3&&!S.mis.pago){ S.mis.pago=1;
  var ant=S.carga; S.carga=clamp(S.carga+15,0,100); S.sat=clamp(S.sat-10,0,100);
  S.hist.push(S.carga); if(S.hist.length>28)S.hist.shift();
  anota("Sinergia de circuito: as tr\u00eas diretivas fecharam no mesmo ciclo. Continente, ru\u00eddo e rota alinhados \u2014 retorno sem consumir uso.",S.carga-ant,false);
 }
}
function pintaMis(){
 var m=misEstado(), rot=[
  ["Conten\u00e7\u00e3o",m.rot,m.a,"h-ctn","manter o continente de p\u00e9"],
  ["Varredura","Liquidar uma l\u00e2mina do baralho",m.b,"h-deck","limpar ru\u00eddo sem gastar poder"],
  [(S.mis.r==="rup")?"Ruptura":"Rota",(S.mis.r==="rup")?"Declarar a rota e romper o n\u00f3 mais denso":"Declarar a rota do dia",m.c,"h-rota",(S.mis.r==="rup")?"carga estava em linha na abertura":"carga sob o limiar na abertura \u2014 diretiva leve"]
 ],h="",i;
 for(i=0;i<rot.length;i++) h+='<div class="dr'+(rot[i][2]?" ok":"")+'">'+
  '<span class="dk">'+rot[i][0]+'</span>'+
  '<b>'+rot[i][1]+'</b>'+
  '<i>'+rot[i][4]+'</i>'+
  '<div class="dft"><span class="mk">'+(rot[i][2]?"cumprida":"em aberto")+'</span>'+
  '<button data-ir="'+rot[i][3]+'">ir</button></div></div>';
 el("mis").innerHTML=h;
 el("mis-n").textContent=m.n+"/3";
 el("mis-s").className="sin "+(S.mis.pago?"on":(m.n===3?"on":""));
 el("mis-s").innerHTML=S.mis.pago
  ? "Sinergia de circuito aplicada: +15 de carga e &minus;10 de satura&ccedil;&atilde;o, sem consumir uso di&aacute;rio."
  : "Fechar as tr&ecirc;s libera a <b>sinergia de circuito</b>: +15 de carga e &minus;10 de satura&ccedil;&atilde;o, sem consumir uso di&aacute;rio.";
}
function pintaAbertura(){
 var on=S.carga>=LIMIAR, D=venc().length, p=patente(), f;
 var pend=[]; if(!S.ign.decl||S.ign.decl!==hoje()) pend.push("declarar a rota");
 if(D) pend.push(D+" termo"+(D>1?"s":"")+" para revisar");
 if(desde(S.ultAter)>=2) pend.push("pousar");
 if(on) f='Mutação <b>em linha</b>. A Ruptura está aberta — use nela o nó mais denso do dia, não o mais urgente.';
 else if(S.carga>=25) f='Carga sob o limiar. O poder principal não abre, mas <b>o baralho abre</b> — e Cerco ainda roda.';
 else f='Carga no chão. Hoje é <b>dia de lâmina</b>: uma carta, três passos, nada de decisão.';
 if(S.sat>=60) f+=' Antena saturada: processe antes de disparar.';
 if((S.gasto|0)>=70) f+=' Queima do ciclo no teto — amanhã nasce devendo.';
 if(pend.length) f+=' Pendente: '+pend.join(", ")+'.';
 el("ab-f").innerHTML=f;
 el("ab-m").innerHTML=
  '<div><span class="v2">'+S.carga+'</span><span class="k7">carga</span></div>'+
  '<div><span class="v2">'+S.dominio+'</span><span class="k7">domínio</span></div>'+
  '<div><span class="v2">'+(S.cap.length)+'</span><span class="k7">na caixa</span></div>';
}
function pintaHab(){
 var h="",i,j,H=S.hab;
 for(i=0;i<H.length;i++){ var x=H[i], st=seq(x.hist), feito=(x.hist||[]).indexOf(hoje())>=0, g="";
  for(j=6;j>=0;j--) g+='<i class="'+(((x.hist||[]).indexOf(diaStr(hojeN()-j))>=0)?"on2":"")+'"></i>';
  h+='<div class="hb"><span class="n6">'+esc(x.nome)+'</span><span class="grid7">'+g+'</span>'+
     '<span class="sq" title="dias feitos nos últimos 7">'+jan7(x.hist)+'/7</span>'+
     '<button data-hb="'+i+'"'+(feito?' disabled':'')+'>'+(feito?"feito":"marcar")+'</button>'+
     '<button class="x4" data-hx="'+i+'">✕</button></div>'; }
 el("hb-l").innerHTML=h||'<div class="travado" style="color:var(--line2)">nenhum hábito registrado</div>';
 lig("b-hab",function(){ var v=el("hb-in").value.trim(); if(!v)return;
  S.hab.push({id:"h"+Date.now(),nome:v,hist:[]}); el("hb-in").value=""; pinta();});
 var n=document.querySelectorAll("[data-hb]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var x=S.hab[+this.getAttribute("data-hb")];
  if((x.hist||[]).indexOf(hoje())>=0) return;
  x.hist=(x.hist||[]).concat(hoje()); if(x.hist.length>400) x.hist=x.hist.slice(-400);
  var w7=jan7(x.hist), bonus=habBonus(x,w7);
  move(0,3+bonus,"Hábito: "+esc(x.nome)+" — "+w7+" de 7 dias"+(bonus?", semana cumprida.":"."),false,0,0,0);});
 n=document.querySelectorAll("[data-hx]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S.hab.splice(+this.getAttribute("data-hx"),1); pinta();});
}
function estProj(x){
 var par=desde(x.ult||x.aberto||S.inicio);
 if(x.est==="pausado") return {c:"pausado",sig:"CNG",n:"congelamento",d:"rota pausada por decis\u00e3o"};
 if(par>=10) return {c:"nocaute",sig:"NOC",n:"nocaute",d:"parado h\u00e1 "+par+" dias \u2014 reanimar ou encerrar"};
 if(par>=4) return {c:"travado",sig:"PAR",n:"paralisia",d:"sem etapa h\u00e1 "+par+" dias"};
 return {c:"ativo",sig:"ATV",n:"ativo",d:par===0?"tocado neste ciclo":("\u00faltimo toque h\u00e1 "+par+" dias")};
}
function pintaProj(){
 var h="",i,j,P=S.proj;
 for(i=0;i<P.length;i++){ var x=P[i], ps=x.passos||[], ok=0;
  for(j=0;j<ps.length;j++) if(ps[j].ok) ok++;
  var pc=ps.length?Math.round(ok/ps.length*100):0, dd=x.prazo?(diaN(x.prazo)-hojeN()):null;
  var E=estProj(x);
  h+='<div class="pj '+E.c+'"><div class="tp2"><span class="n7">'+esc(x.nome)+'</span><span class="pz">'+
     (dd===null?"sem prazo":(dd>=0?dd+" dias":"vencido h\u00e1 "+(-dd)))+'</span></div>';
  h+='<div class="pest"><span class="eb '+E.c+'">'+E.sig+'</span><span class="et">'+E.n+'</span>'+
     '<span class="ed">'+E.d+'</span>'+
     '<button data-pv="'+i+'">'+(E.c==="pausado"?"retomar":"congelar")+'</button>'+
     (E.c==="nocaute"?'<button class="rev" data-prv="'+i+'">reanimar</button>':'')+'</div>';
  h+='<div class="pb3"><i style="width:'+pc+'%"></i></div>';
  h+='<div class="tp2" style="font-family:var(--mono);font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--dim)"><span>'+ok+' de '+ps.length+' etapas</span><button class="x4" data-px="'+i+'" style="border:0;background:transparent;color:var(--line2);width:auto;padding:0">remover</button></div>';
  h+='<ul>';
  for(j=0;j<ps.length;j++) h+='<li class="'+(ps[j].ok?"feito":"")+'"><span class="cb" data-pt="'+i+'|'+j+'"></span><span>'+esc(ps[j].t)+'</span><button data-pr="'+i+'|'+j+'">✕</button></li>';
  h+='</ul>';
  h+='<div style="display:flex;gap:6px;margin-top:8px"><input data-pn="'+i+'" maxlength="70" placeholder="nova etapa" style="flex:1;background:var(--well);color:var(--bone);border:1px solid var(--line2);font-family:var(--sans);font-size:12.5px;padding:6px 9px"><button data-pa="'+i+'" style="width:auto;padding:6px 10px;font-family:var(--mono);font-size:9px;letter-spacing:.12em">somar</button></div></div>';
 }
 el("pj-l").innerHTML=h||'<div class="travado" style="color:var(--line2)">nenhum projeto aberto</div>';
 lig("b-proj",function(){ var v=el("pj-n").value.trim(); if(!v)return;
  S.proj.push({id:"p"+Date.now(),nome:v,prazo:el("pj-d").value||null,passos:[],aberto:hoje(),ult:hoje(),est:"ativo"});
  el("pj-n").value=""; anota("Projeto aberto: "+esc(v)+".",0,false); pinta();});
 var n=document.querySelectorAll("[data-pv]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var k=+this.getAttribute("data-pv"), x=S.proj[k];
  if(x.est==="pausado"){ x.est="ativo"; x.ult=hoje();
   anota("Projeto retomado: "+esc(x.nome)+". Rota volta a correr.",0,false); }
  else { x.est="pausado";
   anota("Projeto congelado: "+esc(x.nome)+". Pausa declarada n\u00e3o conta como abandono.",0,false); }
  pinta(); });
 n=document.querySelectorAll("[data-prv]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var x=S.proj[+this.getAttribute("data-prv")]; x.est="ativo"; x.ult=hoje();
  move(-3,6,"Projeto reanimado: "+esc(x.nome)+". Nocaute desfeito com um toque, n\u00e3o com um plano.",false,0,1,0); });
 n=document.querySelectorAll("[data-pa]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var k=+this.getAttribute("data-pa"), f=document.querySelector('[data-pn="'+k+'"]'), v=f?f.value.trim():"";
  if(!v)return; S.proj[k].passos=(S.proj[k].passos||[]).concat({t:v,ok:false}); pinta();});
 n=document.querySelectorAll("[data-pt]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var q=this.getAttribute("data-pt").split("|"), st=S.proj[+q[0]].passos[+q[1]];
  st.ok=!st.ok;
  S.proj[+q[0]].ult=hoje();
  if(st.ok) move(-4,5,"Etapa concluída em "+esc(S.proj[+q[0]].nome)+": "+esc(st.t),false,0,1,0);
  else pinta();});
 n=document.querySelectorAll("[data-pr]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var q=this.getAttribute("data-pr").split("|"); S.proj[+q[0]].passos.splice(+q[1],1); pinta();});
 n=document.querySelectorAll("[data-px]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S.proj.splice(+this.getAttribute("data-px"),1); pinta();});
}
function pintaMenu(){
 var h="",i,M=S.menu, alto=S.carga>=LIMIAR;
 for(i=0;i<M.length;i++) h+='<div><span>'+esc(M[i])+'</span>'+
   '<button data-mu="'+i+'"'+(S.usos.menu>=1?' disabled':'')+'>usar</button>'+
   '<button class="x5" data-mx="'+i+'">✕</button></div>';
 el("mn-l").innerHTML=h||'<div><span style="color:var(--line2)">menu vazio</span></div>';
 el("mn-add").innerHTML = alto
  ? '<div class="ent" style="display:flex;gap:7px"><input id="mn-in" maxlength="60" placeholder="o que te devolve o corpo" style="flex:1;background:var(--well);color:var(--bone);border:1px solid var(--line2);font-family:var(--sans);font-size:13.5px;padding:8px 10px"><button id="b-menu" style="width:auto"><strong>Somar</strong></button></div>'
  : '<p class="travado">Trancado. O menu s&oacute; se monta com carga acima de '+LIMIAR+' &mdash; a lista boa se escreve no dia bom, n&atilde;o no dia ruim.</p>';
 lig("b-menu",function(){ var v=el("mn-in").value.trim(); if(!v)return;
  S.menu.push(v); el("mn-in").value=""; pinta();});
 var n=document.querySelectorAll("[data-mu]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  if(S.usos.menu>=1) return; S.usos.menu=1;
  move(8,0,"Menu de recarga: "+esc(S.menu[+this.getAttribute("data-mu")])+".",false,-4,0,0);});
 n=document.querySelectorAll("[data-mx]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S.menu.splice(+this.getAttribute("data-mx"),1); pinta();});
}

var FASES=[
 ["IGNI\u00c7\u00c3O","a primeira queima, sem controle","IGNITER"],
 ["DERIVA","deslocamento sem propuls\u00e3o pr\u00f3pria","DRIFTER"],
 ["ASTROMANTE","opera lendo padr\u00e3o, n\u00e3o for\u00e7ando","ASTROMANCER"],
 ["APOGEU","pot\u00eancia m\u00e1xima, dist\u00e2ncia m\u00e1xima do ch\u00e3o","APOGEE"],
 ["REENTRADA","sobrevive \u00e0 volta","VOIDWALKER"]
];
function equil(){
 var i,c=contencao().v, sat=100-S.sat;
 var h=(S.hist||[]).slice(-7), m=0; for(i=0;i<h.length;i++) m+=h[i];
 m=h.length?m/h.length:S.carga;
 var est=Math.max(0,Math.round(100-Math.abs(m-65)*2.2));
 var P=S.proj||[], viva=0; for(i=0;i<P.length;i++) if(estProj(P[i]).c!=="nocaute") viva++;
 var fr=P.length?Math.round(viva/P.length*100):100;
 var lim=Math.max(0,100-((S.falsos|0)*25+(S.queimas|0)*12));
 return {v:clamp(Math.round(c*.30+sat*.20+est*.15+fr*.15+lim*.20),0,100),
         c:c,s:sat,e:est,f:fr,l:lim,md:Math.round(m)};
}
function teto(v){ return v<30?1:(v<50?2:(v<70?3:4)); }
function faseIdx(){
 var i,base=0;
 for(i=0;i<PATENTES.length;i++) if(S.dominio>=PATENTES[i].min){ base=4-i; break; }
 var f=Math.min(base,teto(equil().v));
 if(f===4&&S.falsos>0) f=3;
 return f;
}
function faseBase(){ var i; for(i=0;i<PATENTES.length;i++) if(S.dominio>=PATENTES[i].min) return 4-i; return 0; }
function pintaArco(){
 var f=faseIdx(),h="",i;
 for(i=0;i<FASES.length;i++) h+='<div class="fa'+(i===f?" atual":(i<f?" feita":""))+'">'+
  '<span class="ix2">['+String(i+1).padStart(2,"0")+']</span>'+
  '<span class="nm8">'+FASES[i][0]+'</span>'+
  '<span class="en8">'+FASES[i][2]+'</span>'+
  '<span class="ds">'+(i===4&&S.falsos>0?"travada por queima seca":FASES[i][1])+'</span></div>';
 el("arco").innerHTML=h;
 var E=equil(), base=faseBase(), t=teto(E.v), preso=(t<base), C=[
  ["conten\u00e7\u00e3o",E.c,"30%"],["ru\u00eddo sob controle",E.s,"20%"],
  ["carga est\u00e1vel",E.e,"15%"],["frentes vivas",E.f,"15%"],["sem queima",E.l,"20%"]],k,g="";
 for(k=0;k<C.length;k++) g+='<div class="eqi"><span class="eqn">'+C[k][0]+'<i>'+C[k][2]+'</i></span>'+
  '<div class="eqb2"><i style="width:'+C[k][1]+'%"></i></div><span class="eqv">'+C[k][1]+'</span></div>';
 el("eqb").innerHTML='<div class="eqtop"><span class="k9">Equil\u00edbrio do registro</span>'+
  '<span class="eqg">'+E.v+'<small>/100</small></span>'+
  '<span class="eqs'+(preso?" preso":"")+'">'+
   (preso?("manto retido em "+FASES[t][0]+" \u2014 o dom\u00ednio j\u00e1 d\u00e1 "+FASES[base][0])
         :("manto liberado at\u00e9 "+FASES[t][0]))+'</span></div><div class="eqgrid">'+g+'</div>'+
  '<p class="eqp">A fase n\u00e3o sobe s\u00f3 por dom\u00ednio acumulado. O dom\u00ednio diz at\u00e9 onde voc\u00ea pode ir; '+
  'o equil\u00edbrio dos registradores diz at\u00e9 onde o portador aguenta ficar. Vale o menor dos dois.</p>';
}
function dias7ok(f){ var n=0,i; for(i=0;i<7;i++){ var d=diaStr(hojeN()-i); if(f(d)) n++; } return n; }
function contencao(){
 var a=dias7ok(function(d){ return ((S.sono&&S.sono[d])||0)>=7; });
 var b=dias7ok(function(d){ return ((S.agua&&S.agua[d])||0)>=8; });
 var c=dias7ok(function(d){ return ((S.ativ&&S.ativ[d])||0)>=20; });
 var e=dias7ok(function(d){ var q=(S.refs&&S.refs[d])||{}; return (q.m?1:0)+(q.t?1:0)+(q.n?1:0)>=3; });
 return {v:Math.round((a+b+c+e)/28*100),a:a,b:b,c:c,e:e};
}
function limComb(){ return 50+Math.round(contencao().v/100*30)+(temAr("reg")?10:0); }
function pintaCtn(){
 var C=contencao(), L=limComb();
 el("ct-v").textContent=C.v; el("ct-b").style.width=C.v+"%"; el("ct-l").textContent=L;
 var st=el("ct-s");
 if(C.v>=70){ st.textContent="continente firme"; st.style.cssText="background:var(--line2);color:var(--bone)"; }
 else if(C.v>=35){ st.textContent="continente parcial"; st.style.cssText="background:var(--redd);color:var(--bone)"; }
 else { st.textContent="sem continente"; st.style.cssText="background:var(--red);color:#150a04"; }
 var Q=[["P\u00b701","sono \u2265 7h",C.a],["P\u00b702","meta de \u00e1gua",C.b],["P\u00b703","movimento \u2265 20min",C.c],["P\u00b704","tr\u00eas refei\u00e7\u00f5es",C.e]],h="",i;
 for(i=0;i<Q.length;i++) h+='<div><span class="c2">['+Q[i][0]+']</span><span class="n9">'+Q[i][2]+'<span style="font-size:12px;color:var(--dim)">/7</span></span><span class="l9">'+Q[i][1]+'</span></div>';
 el("ct-q").innerHTML=h;
}
function agDef(n){ var hoy=hoje(); S.agua=S.agua||{};
 var a=S.agua[hoy]||0; n=clamp(n,0,12); S.agua[hoy]=n;
 if(a<8&&n>=8) move(4,3,"\u00c1gua: meta de 8 copos cumprida. Mat\u00e9ria atravessou o corpo o dia inteiro.",false,-3,0,0);
 else pinta();
}
function pintaCorpo(){
 var i,hoy=hoje(),S7=[],A7=[];
 for(i=6;i>=0;i--){ var d=diaStr(hojeN()-i);
  S7.push([d,(S.sono&&S.sono[d])||0]); A7.push([d,(S.agua&&S.agua[d])||0]); }
 var hj=(S.sono&&S.sono[hoy])||0;
 el("sn-h").textContent=hj?hj:"\u2014";
 var som=0,q=0; for(i=0;i<7;i++) if(S7[i][1]){som+=S7[i][1];q++;}
 var med=q?(som/q).toFixed(1):null;
 el("sn-m").innerHTML=med?("m\u00e9dia de 7 dias <b>"+med+" h</b>"+(hj&&hj<5?" &middot; <b>d\u00e9ficit</b>":"")):"sem registro nesta semana";
 var g="";
 for(i=0;i<7;i++){ var v=S7[i][1], alt=Math.round(Math.min(1,v/9)*48);
  g+='<div class="'+(v>=7?"ok3":(v?"bx":""))+'" style="height:'+Math.max(2,alt)+'px"><span>'+S7[i][0].slice(8)+'</span></div>'; }
 el("sn-g").innerHTML=g;
 var an=(S.agua&&S.agua[hoy])||0;
 el("ag-n").textContent=an;
 el("ag-m").innerHTML=an>=8?"meta cumprida &middot; <b>pouso parcial</b>":("faltam <b>"+(8-an)+"</b> para a meta");
 g="";
 for(i=0;i<7;i++){ var w=Math.min(1,A7[i][1]/8);
  g+='<div><i style="height:'+Math.round(w*28)+'px"></i><span>'+A7[i][0].slice(8)+'</span></div>'; }
 el("ag-g").innerHTML=g;
 var hm=(S.sonoHM&&S.sonoHM[hoy])||{};
 if(el("sn-d").value==="" && hm.d) el("sn-d").value=hm.d;
 if(el("sn-a").value==="" && hm.a) el("sn-a").value=hm.a;
 lig("b-sonoh",function(){
  var d=el("sn-d").value, a=el("sn-a").value;
  if(!d||!a){ el("msg").textContent="preencha dormi e acordei"; return; }
  var dm=+d.slice(0,2)*60+ +d.slice(3,5), am=+a.slice(0,2)*60+ +a.slice(3,5);
  var min=am-dm; if(min<=0) min+=1440;
  S.sonoHM=S.sonoHM||{}; S.sonoHM[hoy]={d:d,a:a};
  el("sn-in").value=(Math.round(min/3)/20).toFixed(1);
  el("msg").textContent="dormiu "+(min/60).toFixed(1)+" h \u2014 confirme em registrar sono";
  grava();
 });
 lig("b-sono",function(){
  if(S.sono&&S.sono[hoy]!==undefined){ el("msg").textContent="sono do ciclo j\u00e1 registrado"; return; }
  var v=parseFloat(el("sn-in").value)||0; if(v<=0)return;
  S.sono=S.sono||{}; S.sono[hoy]=v;
  if(v>=7){ S.ultAter=hoy;
   move(6,2,"Sono de "+v+" h. O corpo pousou sozinho \u2014 vale como aterramento.",false,-4,0,0); }
  else if(v<5) move(-6,1,"Sono de "+v+" h. D\u00e9ficit: o ciclo come\u00e7a devendo.",true,6,0,0);
  else move(0,1,"Sono de "+v+" h. Abaixo do ideal, acima do cr\u00edtico.",false,0,0,0);
 });
 var cp="",ci,an2=(S.agua&&S.agua[hoy])||0;
 for(ci=1;ci<=8;ci++) cp+='<button data-cp="'+ci+'" class="'+(ci<=an2?"on":"")+'" aria-label="copo '+ci+'"></button>';
 el("ag-c").innerHTML=cp;
 var nc=document.querySelectorAll("[data-cp]");
 for(ci=0;ci<nc.length;ci++) nc[ci].addEventListener("click",function(){
  var v=+this.getAttribute("data-cp"), a=(S.agua&&S.agua[hoy])||0; agDef(v===a?v-1:v); });
 lig("b-ag-p",function(){ agDef(((S.agua&&S.agua[hoy])||0)+1); });
 lig("b-ag-m",function(){ agDef(((S.agua&&S.agua[hoy])||0)-1); });
}
function pintaCorpo2(){
 var i,hoy=hoje();
 var hj=(S.ativ&&S.ativ[hoy])||0, sem=0;
 for(i=0;i<7;i++){ var d=diaStr(hojeN()-i); sem+=(S.ativ&&S.ativ[d])||0; }
 el("at-n").textContent=hj;
 el("at-m").innerHTML="semana <b>"+sem+" min</b>"+(hj>=20?" &middot; pouso carimbado":"");
 var g="";
 for(i=6;i>=0;i--){ var d2=diaStr(hojeN()-i), v=(S.ativ&&S.ativ[d2])||0, alt=Math.round(Math.min(1,v/60)*48);
  g+='<div class="'+(v>=20?"ok3":(v?"bx":""))+'" style="height:'+Math.max(2,alt)+'px"><span>'+d2.slice(8)+'</span></div>'; }
 el("at-g").innerHTML=g;
 lig("b-ativ",function(){ var v=parseInt(el("at-in").value,10)||0; if(v<=0)return;
  S.ativ=S.ativ||{}; var antes=(S.ativ[hoy]||0); S.ativ[hoy]=antes+v;
  if(antes<20 && S.ativ[hoy]>=20){ S.ultAter=hoy;
   move(8,Math.round(v/5),"Atividade f\u00edsica: "+v+" min. Corpo em uso \u2014 pouso carimbado.",false,-5,0,0); }
  else move(0,Math.round(v/6),"Atividade f\u00edsica: "+v+" min.",false,-2,0,0);
 });

 var R=(S.refs&&S.refs[hoy])||{}, n=(R.m?1:0)+(R.t?1:0)+(R.n?1:0);
 el("rf-n").textContent=n;
 el("rf-m").innerHTML=n>=3?"dia completo &middot; <b>sem buraco</b>":(n===0?"nenhuma registrada":("falta <b>"+(3-n)+"</b>"));
 var b=document.querySelectorAll("[data-rf2]");
 for(i=0;i<b.length;i++){ var k=b[i].getAttribute("data-rf2");
  b[i].setAttribute("aria-pressed", R[k]?"true":"false");
  if(b[i].getAttribute("data-lig"))continue; b[i].setAttribute("data-lig","1");
  b[i].addEventListener("click",function(){
   var kk=this.getAttribute("data-rf2");
   S.refs=S.refs||{}; S.refs[hoy]=S.refs[hoy]||{};
   S.refs[hoy][kk]=!S.refs[hoy][kk];
   var q=S.refs[hoy], t=(q.m?1:0)+(q.t?1:0)+(q.n?1:0);
   if(q[kk]&&t===3) move(3,2,"Tr\u00eas refei\u00e7\u00f5es no ciclo. O corpo n\u00e3o foi esquecido.",false,-2,0,0);
   else pinta();
  });
 }
 g="";
 for(i=6;i>=0;i--){ var d3=diaStr(hojeN()-i), q2=(S.refs&&S.refs[d3])||{}, c="";
  ["m","t","n"].forEach(function(z){ c+='<i class="'+(q2[z]?"on4":"")+'"></i>'; });
  g+='<div>'+c+'<span>'+d3.slice(8)+'</span></div>'; }
 el("rf-g").innerHTML=g;
}

/* ===== cronômetro, progresso, estado ===== */
var PM={min:25,modo:25,fim:0,rest:25*60,run:false,tid:null};
function pmFmt(sg){ sg=Math.max(0,Math.round(sg));
 return String(Math.floor(sg/60)).padStart(2,"0")+":"+String(sg%60).padStart(2,"0"); }
function pmPinta(){
 var r=el("pm-rel"); if(!r) return;
 r.textContent=pmFmt(PM.rest);
 r.className="rel"+(PM.run?" run":"");
 var tot=PM.modo*60;
 el("pm-bar").style.width=Math.min(100,Math.round((1-PM.rest/tot)*100))+"%";
 el("pm-go").querySelector("strong").textContent=PM.run?"pausar":"iniciar";
 var b=document.querySelectorAll("[data-pm]"),i;
 for(i=0;i<b.length;i++) b[i].setAttribute("aria-pressed", (+b[i].getAttribute("data-pm")===PM.modo)?"true":"false");
 var n=(S.usos.pomo|0);
 el("pm-blk").innerHTML = n===0 ? "nenhum bloco fechado neste ciclo"
  : (n>=4 ? "<b>"+n+" blocos</b> — daqui em diante você queima reserva"
          : n+" bloco"+(n>1?"s":"")+" fechado"+(n>1?"s":"")+" neste ciclo");
}
function pmTick(){
 if(!PM.run) return;
 PM.rest=(PM.fim-Date.now())/1000;
 if(PM.rest<=0){ PM.rest=0; pmStop(); pmFecha(); }
 pmPinta();
}
function pmStop(){ PM.run=false; if(PM.tid){clearInterval(PM.tid);PM.tid=null;} }
function pmFecha(){
 if(PM.modo===25){ S.usos.pomo=(S.usos.pomo|0)+1;
  var n=S.usos.pomo;
  move(-6,8,"Bloco de foco fechado ("+n+" no ciclo)."+(n>=4?" Limite externo atingido — pare agora, não depois.":""),n>=4,0,1,0);
  PM.modo=(n%4===0)?15:5;
 } else { move(2,0,"Pausa cumprida. O limite veio de fora, como tem que vir.",false,-2,0,0); PM.modo=25; }
 PM.rest=PM.modo*60; pmPinta();
}
function montaPomo(){
 var b=document.querySelectorAll("[data-pm]"),i;
 for(i=0;i<b.length;i++) b[i].addEventListener("click",function(){
  pmStop(); PM.modo=+this.getAttribute("data-pm"); PM.rest=PM.modo*60; pmPinta(); });
 el("pm-go").addEventListener("click",function(){
  if(PM.run){ pmStop(); }
  else { PM.fim=Date.now()+PM.rest*1000; PM.run=true; PM.tid=setInterval(pmTick,250); }
  pmPinta(); });
 el("pm-rs").addEventListener("click",function(){ pmStop(); PM.rest=PM.modo*60; pmPinta(); });
 pmPinta();
}
function pintaProgresso(){
 var now=new Date(), y=now.getFullYear();
 var ini=new Date(y,0,1), fim=new Date(y+1,0,1);
 var pa=(now-ini)/(fim-ini);
 var im=new Date(y,now.getMonth(),1), fm=new Date(y,now.getMonth()+1,1);
 var pm=(now-im)/(fm-im);
 var dw=(now.getDay()+6)%7, ps=(dw+ (now.getHours()*60+now.getMinutes())/1440)/7;
 var L=[["ano",pa],["mês",pm],["semana",ps]],h="",i;
 for(i=0;i<L.length;i++){ var v=Math.round(L[i][1]*100);
  h+='<div class="lp2"><div class="tp3"><span>'+L[i][0]+'</span><b>'+v+'%</b></div>'+
     '<div class="bb"><i style="width:'+v+'%"></i></div></div>'; }
 var p=patente();
 h+='<div class="lp2" style="border-top:1px solid var(--line);padding-top:13px"><div class="tp3"><span>patente &middot; '+p.n+'</span><b>'+S.dominio+'</b></div>'+
    '<div class="bb"><i style="width:'+(proximo()?Math.min(100,Math.round((1-proximo()/Math.max(1,proximo()+S.dominio))*100)):100)+'%"></i></div></div>';
 el("prog").innerHTML=h;
}
var ESTR=["","colapso","baixo","neutro","bom","pico"];
function pintaEstado(){
 var i,hoy=hoje(), v=(S.estado&&S.estado[hoy])||0;
 el("es-n").textContent=v||"—";
 el("es-m").innerHTML=v?("<b>"+ESTR[v]+"</b>"):"sem leitura hoje";
 var g="";
 for(i=6;i>=0;i--){ var d=diaStr(hojeN()-i), w=(S.estado&&S.estado[d])||0;
  g+='<div><i class="'+(w?"e"+w:"")+'"></i><span>'+d.slice(8)+'</span></div>'; }
 el("es-g").innerHTML=g;
 g="";
 for(i=1;i<=5;i++) g+='<button data-es="'+i+'" aria-pressed="'+(v===i)+'"><strong>'+i+'</strong></button>';
 el("es-b").innerHTML=g;
 var b=document.querySelectorAll("[data-es]");
 for(i=0;i<b.length;i++) b[i].addEventListener("click",function(){
  var k=+this.getAttribute("data-es"); S.estado=S.estado||{}; S.estado[hoy]=k;
  anota("Estado do ciclo: "+k+"/5 — "+ESTR[k]+".",0,false); pinta(); });
}
var RTM=null;
var MESES=["janeiro","fevereiro","mar\u00e7o","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
var NTF="";
var ORB=[["foco","Em foco"],["ass","Assistindo"],["ouv","Ouvindo"],
 ["est","Estudando"],["pen","Pensando em"],["alm","Almejando"]];
function pintaOrb(){
 var h="",i;
 for(i=0;i<ORB.length;i++){ var k=ORB[i][0], v=(S.atu&&S.atu[k])||"";
  h+='<div class="ob'+(v?" cheio":"")+'"><span class="k8">'+ORB[i][1]+'</span>'+
     '<input data-ob="'+k+'" maxlength="70" value="'+esc(v).replace(/"/g,"&quot;")+'" placeholder="\u2014"></div>'; }
 el("orbp").innerHTML=h;
 var n=document.querySelectorAll("[data-ob]");
 for(i=0;i<n.length;i++) n[i].addEventListener("change",function(){
  S.atu=S.atu||{}; S.atu[this.getAttribute("data-ob")]=this.value.trim(); pinta(); });
}
var WPK={corpo:"corpo",vinculo:"v\u00ednculo",oficio:"of\u00edcio",recurso:"recurso",mente:"mente"};
var wpF="mes";
function ym(d){ return d.slice(0,7); }
function pintaWp(){
 var i,h="",hoy=hoje(),n=hojeN();
 var F=[["dia","Dia"],["sem","Semana"],["mes","M\u00eas"]];
 h=""; for(i=0;i<F.length;i++) h+='<button data-wf="'+F[i][0]+'" class="'+(wpF===F[i][0]?"at":"")+'">'+F[i][1]+'</button>';
 el("wp-f").innerHTML=h;
 var lim=wpF==="dia"?0:(wpF==="sem"?6:30);
 var L=(S.wp||[]).filter(function(x){ var dd=n-diaN(x.data); return dd>=0&&dd<=lim; });
 el("wp-n").textContent=L.length+(L.length===1?" marco":" marcos");
 h="";
 for(i=0;i<L.length;i++) h+='<div class="wi"><span class="wd">'+L[i].data.slice(8)+"."+L[i].data.slice(5,7)+
  ' &middot; '+L[i].h+' &middot; '+WPK[L[i].k]+'</span><b>'+esc(L[i].t)+'</b>'+
  '<button data-wx="'+L[i].id+'" aria-label="remover">\u2715</button></div>';
 el("wp-l").innerHTML=h||'<div class="wvaz">nenhum marco no per\u00edodo. O que mudou de lugar hoje?</div>';
 el("wp-ym").textContent=ym(hoy);
 var r=el("wp-r"); if(document.activeElement!==r) r.value=(S.rev&&S.rev[ym(hoy)])||"";
 var nn=document.querySelectorAll("[data-wf]");
 for(i=0;i<nn.length;i++) nn[i].addEventListener("click",function(){ wpF=this.getAttribute("data-wf"); pinta(); });
 nn=document.querySelectorAll("[data-wx]");
 for(i=0;i<nn.length;i++) nn[i].addEventListener("click",function(){
  var id=this.getAttribute("data-wx");
  S.wp=(S.wp||[]).filter(function(x){return x.id!==id;}); pinta(); });
 lig("b-wp",function(){ var t=el("wp-t").value.trim(); if(!t)return;
  S.wp=(S.wp||[]).concat({id:"w"+Date.now(),data:hoje(),h:hora(),t:t,k:el("wp-k").value});
  S.wp.sort(function(a,b){ return a.data<b.data?1:(a.data>b.data?-1:0); });
  el("wp-t").value="";
  move(0,3,"Marco de rota registrado \u2014 "+WPK[el("wp-k").value]+": "+esc(t),false,0,1,0); });
 r.addEventListener("change",function(){ S.rev=S.rev||{}; S.rev[ym(hoje())]=this.value; grava(); });
}
var GL="\u16A0\u16A2\u16A6\u16A8\u16B1\u16B2\u16B7\u16B9\u16BA\u16BE\u16C1\u16C3\u16C7\u16C8\u16C9\u16CB\u16CF\u16D2\u16D6\u16D7\u16DA\u16DC\u16DE\u16DF0123456789\u03a3";
var RN=null, RT=null, TKi=0, TKj=0, TKt=0;
var TKS=[
 "\u03a3\u00b709\u00b729\u00b720.12\u00b77 :: leitura de ramifica\u00e7\u00e3o aberta",
 "conten\u00e7\u00e3o 2 \u00b7 4 \u00b7 5 \u00b7 8 :: runas de apoio carregadas",
 "igni\u00e7\u00e3o em 60 :: abaixo disso, o leque n\u00e3o abre",
 "ramos podados : 1 \u00b7 ramos guardados : n :: nada se perde",
 "\u16C1\u16A2\u16BE\u16DA :: parar \u00b7 corpo \u00b7 freio \u00b7 fluxo"
];
function anima(){ return S.anim!==false && !(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
function chuva(){
 var c=el("rain"); if(!c||!c.getContext) return;
 var x=c.getContext("2d"); if(!x) return;
 var W=c.width,H=c.height,P=12,col=Math.floor(W/9),i;
 if(!RN||RN.length!==col){ RN=[]; for(i=0;i<col;i++) RN.push(Math.random()*-30); }
 x.fillStyle="rgba(0,0,0,.22)"; x.fillRect(0,0,W,H);
 x.font="10px ui-monospace, monospace";
 for(i=0;i<col;i++){
  var g=GL.charAt(Math.floor(Math.random()*GL.length)), y=RN[i]*P;
  if(y>0&&y<H+P){ x.fillStyle=ACCA(.85); x.fillText(g,i*9+1,y);
   x.fillStyle=ACCA(.25); x.fillText(GL.charAt(Math.floor(Math.random()*GL.length)),i*9+1,y-P); }
  RN[i]+= (y>H+P*4||Math.random()>.985) ? -RN[i]+Math.random()*-6 : 1;
 }
}
function tick(){
 var e=el("tick"); if(!e) return;
 var alvo=TKS[TKi], n=TKj;
 e.innerHTML=alvo.slice(0,n).replace(/</g,"&lt;")+'<span class="cur">\u2588</span>';
 if(n<alvo.length){ TKj+=2; }
 else { TKt++; if(TKt>14){ TKt=0; TKj=0; TKi=(TKi+1)%TKS.length; } }
}
function fxLiga(){
 if(RT){ clearInterval(RT); RT=null; }
 var b=el("b-anim"); if(b) b.setAttribute("aria-pressed", anima()?"true":"false");
 if(!anima()){ var c=el("rain"); if(c&&c.getContext){ var x=c.getContext("2d"); if(x) x.clearRect(0,0,c.width,c.height); }
  var e=el("tick"); if(e) e.textContent=TKS[0]; return; }
 RT=setInterval(function(){ if(document.hidden) return; chuva(); tick(); },70);
}
var temaOn=false;
function aplicaDuo(){
 var on=S.duo!==false;
 document.body.classList.toggle("semduo",!on);
 var b=el("b-duo"); if(b){ b.setAttribute("aria-pressed",on?"true":"false");
  b.setAttribute("title", on?"duotone ligado":"duotone desligado"); }
}
function aplicaTema(){
 var c=(S.tema==="claro");
 document.body.classList.toggle("claro",c);
 var b=el("b-tema");
 if(b){ b.innerHTML=c
  ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>'
  : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7"/></svg>';
  b.setAttribute("title", c?"modo escuro":"modo claro");
  b.setAttribute("aria-label", c?"Alternar para modo escuro":"Alternar para modo claro"); }
 var m=document.querySelector('meta[name="color-scheme"]'); if(m) m.setAttribute("content",c?"light":"dark");
}
function pintaTema(){
 if(!temaOn){ temaOn=true;
  lig("b-tema",function(){ S.tema=(S.tema==="claro")?"escuro":"claro"; grava(); aplicaTema(); spark(); });
  lig("b-duo",function(){ S.duo=(S.duo===false); grava(); aplicaDuo(); }); }
 aplicaTema(); aplicaDuo();
}
var tirAb=false, tirOn=false, tbNovo=false;
function tirAbre(x){ tirAb=!!x;
 var b=el("tirbox"), k=el("cerbk");
 if(b) b.classList.toggle("aberto",tirAb);
 if(k) k.classList.toggle("on",tirAb||cerAb);
 document.body.style.overflow=(tirAb||cerAb)?"hidden":"";
 if(tirAb){ pintaTir(); var i=el("tb-q"); if(i&&i.focus) try{i.focus();}catch(e){} }
}
function pintaTir(){
 var sl=el("tb-slots"); if(!sl) return;
 var A=S.run.aberta, i, h="";
 for(i=0;i<3;i++){ var c=A?A[i]:null;
  h+='<div class="ps'+(c?(tbNovo?" rev":""):" vz5")+'"><span class="p3">'+POS[i]+'</span>'+
     '<span class="g3">'+(c!==null&&c!==undefined?RUNAS[c][0]:"\u16EC")+'</span>'+
     (c!==null&&c!==undefined?'<span class="n3">'+RUNAS[c][1]+'</span>':'<span class="l3">vazio</span>')+'</div>';
 }
 sl.innerHTML=h;
 var est=el("tb-rst"); if(est){ var n=0; for(i=0;i<RUNAS.length;i++) if(nivR(i)>0) n++;
  est.textContent=RUNAS.length-n+" por abrir"; }
 var lt=el("tb-leit");
 if(lt){ lt.innerHTML=A?('<div class="tirfrm" style="margin-top:12px"><label><span>Leitura &middot; o que esse arranjo torna vis&iacute;vel</span>'+
   '<textarea id="tb-l" style="width:100%;min-height:72px;background:var(--well);color:var(--bone);border:1px solid var(--line2);font-family:var(--sans);font-size:13px;padding:9px">'+esc(S.run.l||"")+'</textarea></label>'+
   '<button id="b-tbsave"><strong>Arquivar tiragem</strong></button></div>')
  :'<div class="vz2" style="margin-top:12px">nenhuma tiragem aberta &middot; a mesa devolve enquadramento, n&atilde;o resposta</div>';
  lig("b-tbsave",function(){ if(!S.run.aberta)return;
   var t=el("tb-l");
   S.run.tir=(S.run.tir||[]).concat({data:hoje(),q:S.run.q||"",c:S.run.aberta,l:t?t.value.trim():""});
   S.run.aberta=null; S.run.q=""; S.run.l=""; tbNovo=false;
   move(0,4,"Tiragem arquivada na mesa. Enquadramento registrado.",false,-6,1,0);});
 }
 tbNovo=false;
}
function tbTirar(){
 var pool=[],k; for(k=0;k<RUNAS.length;k++) pool.push(k);
 var tres=[]; for(k=0;k<3;k++) tres.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
 var q=el("tb-q"); S.run.aberta=tres; S.run.q=q?q.value.trim():""; S.run.l="";
 tbNovo=anima();
 move(-3,0,"Tiragem aberta na mesa: "+tres.map(function(z){return RUNAS[z][1];}).join(", ")+".",false,-4,1,0);
}
function pintaMesa(){
 if(tirOn) return; tirOn=true;
 lig("b-mesa",function(){ tirAbre(!tirAb); });
 lig("b-tirx",function(){ tirAbre(false); });
 lig("b-tbtirar",function(){
  var d=el("tb-deck"), b=el("b-tbtirar");
  if(!anima()){ tbTirar(); return; }
  if(d) d.classList.add("emb");
  if(b) b.disabled=true;
  setTimeout(function(){ if(d) d.classList.remove("emb"); if(b) b.disabled=false; tbTirar(); },560);
 });
 document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&tirAb) tirAbre(false); });
}
function pintaArs(){
 var L=el("loja"); if(!L) return;
 var i,h='<div class="ljcab"><span class="k9">Arsenal &middot; aquisi&ccedil;&otilde;es</span>'+
  '<span class="ljsl">lastro dispon&iacute;vel <b>'+(S.lastro|0)+'</b> &middot; dom&iacute;nio <b>'+S.dominio+'</b></span></div>'+
  '<p class="ljnota">Cada m&oacute;dulo altera a mecânica do dossi&ecirc;, n&atilde;o o texto. O lastro vem do dom&iacute;nio acumulado; a patente destrava a prateleira.</p>'+
  '<div class="ljgrid">';
 for(i=0;i<ARS.length;i++){
  var a=ARS[i], tem=temAr(a[0]), pode=S.dominio>=a[4], paga=(S.lastro|0)>=a[3];
  h+='<div class="lj'+(tem?" tem":(pode?"":" trav"))+'">'+
     '<div class="ljt"><b>'+a[1]+'</b><i>'+a[2]+'</i></div>'+
     '<p class="ljd">'+a[5]+'</p>'+
     '<p class="ljef">'+a[6]+'</p>'+
     '<div class="ljp">'+
      (tem?'<span class="ljok">em posse</span>'
         :'<span class="ljc">'+a[3]+' de lastro</span>'+
          (pode?'':'<span class="ljr">exige dom&iacute;nio '+a[4]+'</span>')+
          '<button data-arc="'+a[0]+'"'+((pode&&paga)?'':' disabled')+'><strong>'+(paga?"Adquirir":"lastro insuficiente")+'</strong></button>')+
     '</div></div>';
 }
 L.innerHTML=h+'</div>';
 var n=L.querySelectorAll("[data-arc]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var k=this.getAttribute("data-arc"), a=arsItem(k);
  if(!a||temAr(k)) return;
  if(S.dominio<a[4]||(S.lastro|0)<a[3]) return;
  S.lastro=(S.lastro|0)-a[3];
  S.ars=(S.ars||[]).concat(k);
  anota("Arsenal: "+a[1]+" adquirido por "+a[3]+" de lastro. Efeito ativo \u2014 "+a[6]+".",0,false);
  pinta();
 });
}
var cerAb=false, cerOn=false;
function cerAbre(x){ cerAb=!!x;
 var b=el("cerbox"), k=el("cerbk");
 if(b) b.classList.toggle("aberto",cerAb);
 if(k) k.classList.toggle("on",cerAb);
 document.body.style.overflow=cerAb?"hidden":"";
 if(cerAb){ var i=el("r-cap")||el("cp-in"); if(i&&i.focus) try{i.focus();}catch(e){} }
}
function pintaCer(){
 if(cerOn) return; cerOn=true;
 lig("b-cer2",function(){ cerAbre(!cerAb); });
 lig("b-cerx",function(){ cerAbre(false); });
 var k=el("cerbk"); if(k) k.addEventListener("click",function(){ cerAbre(false); tirAbre(false); fpAbre(false); });
 document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&cerAb) cerAbre(false); });
}
var fpOn=false;
function pintaFp(){
 if(fpOn) return; fpOn=true;
 lig("b-fichap",function(){ var e=el("h-sec"); fpAbre(!e.classList.contains("on"));
  if(e.classList.contains("on")) e.scrollIntoView({block:"nearest",behavior:"smooth"}); });
 lig("b-fichapx",function(){ fpAbre(false); });
 document.addEventListener("keydown",function(e){ if(e.key==="Escape"){ var f=el("h-sec"); if(f&&f.classList.contains("on")) fpAbre(false); } });
}
var fxOn=false;
function pintaFx(){
 if(!fxOn){ fxOn=true;
  lig("b-anim",function(){ S.anim=(S.anim===false); grava(); fxLiga(); }); }
 var b=el("b-anim"); if(b) b.setAttribute("aria-pressed", anima()?"true":"false");
}
var pcTab="ret";
var PCT=[
 ["ret","Retomadas","Onde voc\u00ea parou. Um registro por frente aberta \u2014 ler isto deve bastar para voltar sem reler nada.",
  [["o","frente"],["d","onde parou"]]],
 ["plat","Plataformas","Onde a coisa vive: sistema, site, pasta. Sem isso, metade do tempo de retomada \u00e9 ca\u00e7ada.",
  [["o","plataforma"],["d","para que serve"]]],
 ["cred","Acessos","Qual servi\u00e7o e <b>onde a credencial est\u00e1 guardada</b>. Nenhuma senha entra aqui \u2014 este arquivo \u00e9 texto aberto no navegador.",
  [["o","servi\u00e7o"],["d","onde est\u00e1 a credencial"]]],
 ["qr","Refer\u00eancia r\u00e1pida","Atalho, comando, f\u00f3rmula, n\u00famero que voc\u00ea sempre reprocura.",
  [["o","o qu\u00ea"],["d","como"]]],
 ["reg","Registros","O que mudou no sistema e quando. Serve de hist\u00f3rico quando algo quebra.",
  [["o","altera\u00e7\u00e3o"],["d","detalhe"]]]
];
function pcDef(k){ var i; for(i=0;i<PCT.length;i++) if(PCT[i][0]===k) return PCT[i]; return PCT[0]; }
function pintaPC(){
 S.pc=S.pc||{ret:[],plat:[],cred:[],qr:[],reg:[]};
 var D=pcDef(pcTab), L=S.pc[pcTab]||[], i,h="";
 for(i=0;i<PCT.length;i++) h+='<button data-pct="'+PCT[i][0]+'" class="'+(pcTab===PCT[i][0]?"at":"")+'">'+
  PCT[i][1]+'<i>'+((S.pc[PCT[i][0]]||[]).length)+'</i></button>';
 el("pc-t").innerHTML=h;
 el("pc-i").innerHTML=D[2];
 h="";
 for(i=0;i<L.length;i++){
  var par=desde(L[i].data), noc=par>=10;
  h+='<div class="pcit'+(noc?" noc":"")+'"><div class="pcl"><b>'+esc(L[i].o)+'</b>'+
     '<span>'+esc(L[i].d)+'</span></div>'+
     '<div class="pcr"><span class="pcd">'+L[i].data.slice(8)+"."+L[i].data.slice(5,7)+
     (pcTab==="ret"?(" \u00b7 "+(noc?"nocaute \u00b7 "+par+"d":(par===0?"hoje":par+"d"))):"")+'</span>'+
     (pcTab==="ret"?'<button class="tc" data-pcu="'+i+'">tocar</button>':'')+
     '<button data-pcx="'+i+'" aria-label="remover">\u2715</button></div></div>';
 }
 el("pc-b").innerHTML=h||'<div class="pcvaz">nada guardado aqui ainda</div>';
 el("pc-n").innerHTML='<input id="pc-o" maxlength="60" placeholder="'+D[3][0][1]+'">'+
  '<input id="pc-d" maxlength="90" placeholder="'+D[3][1][1]+'">'+
  '<button id="b-pc"><strong>Guardar</strong></button>';
 var n=document.querySelectorAll("[data-pct]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ pcTab=this.getAttribute("data-pct"); pinta(); });
 n=document.querySelectorAll("[data-pcx]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  S.pc[pcTab].splice(+this.getAttribute("data-pcx"),1); pinta(); });
 n=document.querySelectorAll("[data-pcu]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var it=S.pc[pcTab][+this.getAttribute("data-pcu")]; it.data=hoje();
  move(0,2,"Retomada tocada: "+esc(it.o)+". Frente volta para o presente.",false,0,0,0); });
 lig("b-pc",function(){ var o=el("pc-o").value.trim(), d=el("pc-d").value.trim();
  if(!o)return;
  S.pc[pcTab]=(S.pc[pcTab]||[]).concat({o:o,d:d,data:hoje()});
  el("pc-o").value=""; el("pc-d").value="";
  if(pcTab==="ret") move(0,2,"Retomada registrada: "+esc(o),false,-2,1,0);
  else { anota("Armazenamento \u00b7 "+pcDef(pcTab)[1]+": "+esc(o)+".",0,false); pinta(); } });
}
var anAb=false, anOn=false;
function anAbre(x){ anAb=!!x;
 var b=el("anais"), k=el("cerbk");
 if(b) b.classList.toggle("aberto",anAb);
 if(k) k.classList.toggle("on",anAb||cerAb);
 document.body.style.overflow=(anAb||cerAb)?"hidden":"";
}
var LVE={fila:"na fila",lendo:"lendo",lido:"lido",parado:"parado"};
function pintaAnais(){
 if(!anOn){ anOn=true;
  lig("b-anais",function(){ cerAbre(false); anAbre(true); });
  lig("b-anaisx",function(){ anAbre(false); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&anAb) anAbre(false); });
  var k=el("cerbk"); if(k) k.addEventListener("click",function(){ if(anAb) anAbre(false); });
 }
 var i,h="",L=S.livro||[],C=S.lic||[],lendo=0,lidos=0;
 for(i=0;i<L.length;i++){ if(L[i].e==="lendo") lendo++; if(L[i].e==="lido") lidos++; }
 el("lv-sub").innerHTML='<b>'+lendo+'</b> em leitura &middot; <b>'+lidos+'</b> fechados &middot; '+L.length+' no registro';
 for(i=0;i<L.length;i++){ var x=L[i];
  h+='<div class="ani e-'+x.e+'"><div class="anti"><b>'+esc(x.t)+'</b>'+(x.a?'<span class="anau">'+esc(x.a)+'</span>':'')+'</div>'+
   '<div class="anac"><span class="anst">'+LVE[x.e]+'</span>'+
   '<span class="andat">'+(x.d||"").slice(8)+'.'+(x.d||"").slice(5,7)+'</span>'+
   '<button data-lvp="'+i+'">avan&ccedil;ar</button><button class="anx" data-lvx="'+i+'">\u2715</button></div></div>';
 }
 el("lv-l").innerHTML=h||'<div class="anvz">nenhum t\u00edtulo no livro</div>';
 h=""; var dias=0, ano=hoje().slice(0,4), prox=null;
 for(i=0;i<C.length;i++){ var c=C[i], d=(c.i&&c.f)?(diaN(c.f)-diaN(c.i)+1):0;
  if((c.i||"").slice(0,4)===ano) dias+=d;
  if(c.i&&diaN(c.i)>hojeN()&&(prox===null||diaN(c.i)<diaN(prox))) prox=c.i;
  var corrente=(c.i&&c.f&&diaN(c.i)<=hojeN()&&diaN(c.f)>=hojeN());
  h+='<div class="ani'+(corrente?" agora":"")+'"><div class="anti"><b>'+esc(c.n)+'</b>'+
   (c.o?'<span class="anau">'+esc(c.o)+'</span>':'')+'</div>'+
   '<div class="anac"><span class="anst">'+(c.i||"?").slice(8)+'.'+(c.i||"").slice(5,7)+' \u2192 '+(c.f||"?").slice(8)+'.'+(c.f||"").slice(5,7)+'</span>'+
   '<span class="andat">'+(d?d+"d":"")+'</span>'+
   '<button class="anx" data-lcx="'+i+'">\u2715</button></div></div>';
 }
 el("lc-l").innerHTML=h||'<div class="anvz">nenhum per\u00edodo registrado</div>';
 el("lc-sub").innerHTML='<b>'+dias+'</b> dias em '+ano+(prox?' &middot; pr\u00f3ximo em '+prox.slice(8)+'.'+prox.slice(5,7):'');
 lig("b-lv",function(){ var t=el("lv-t").value.trim(); if(!t)return;
  S.livro=(S.livro||[]).concat({t:t,a:el("lv-a").value.trim(),e:el("lv-e").value,d:hoje()});
  el("lv-t").value=""; el("lv-a").value="";
  anota("Livro: "+esc(t)+" \u2014 "+LVE[el("lv-e").value]+".",0,false); pinta(); });
 lig("b-lc",function(){ var n2=el("lc-n").value.trim(); if(!n2)return;
  S.lic=(S.lic||[]).concat({n:n2,i:el("lc-i").value||null,f:el("lc-f").value||null,o:el("lc-o").value.trim()});
  S.lic.sort(function(a,b2){ return (a.i||"")<(b2.i||"")?1:-1; });
  el("lc-n").value=""; el("lc-o").value="";
  anota("Licen\u00e7a registrada: "+esc(n2)+".",0,false); pinta(); });
 var n=document.querySelectorAll("[data-lvp]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  var x2=S.livro[+this.getAttribute("data-lvp")], ord=["fila","lendo","lido"];
  var k2=ord.indexOf(x2.e); x2.e=ord[Math.min(ord.length-1,(k2<0?0:k2)+1)];
  if(x2.e==="lido") move(0,6,"Livro fechado: "+esc(x2.t)+".",false,0,1,0); else pinta(); });
 n=document.querySelectorAll("[data-lvx]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  S.livro.splice(+this.getAttribute("data-lvx"),1); pinta(); });
 n=document.querySelectorAll("[data-lcx]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  S.lic.splice(+this.getAttribute("data-lcx"),1); pinta(); });
}
function pintaRegDia(){
 var h="",i,n=0,hoy=hoje();
 for(i=0;i<S.log.length;i++){ var L=S.log[i];
  if(L.dia!==hoy) continue; n++;
  if(n>24) break;
  h+='<div class="rdi'+(L.man?" man":"")+(L.bad?" bad":"")+'">'+
   '<span class="rdh">'+L.t+'</span>'+
   '<span class="rdt">'+L.d+'</span>'+
   (L.v?'<span class="rdv '+(L.v>0?"up":"dn")+'">'+(L.v>0?"+":"")+L.v+'</span>':'')+
   '</div>';
 }
 el("rd-l").innerHTML=h||'<div class="rdvz">nada registrado neste ciclo</div>';
 el("rd-sub").innerHTML=n?("<b>"+n+"</b> entradas hoje &middot; autom\u00e1ticas e escritas \u00e0 m\u00e3o"):"as a\u00e7\u00f5es entram sozinhas; o resto voc\u00ea escreve";
 lig("b-rd",function(){ var v=el("rd-in").value.trim(); if(!v)return;
  el("rd-in").value="";
  move(0,1,esc(v),false,0,0,0);
  S.log[0].man=true; grava(); });
 var ri=el("rd-in");
 if(ri) ri.addEventListener("keydown",function(e){ if(e.key==="Enter"){ var b=el("b-rd"); if(b) b.click(); }});
}
function pintaSB(){
 var i,j,N=S.notas,tags={},h="";
 for(i=0;i<N.length;i++) for(j=0;j<(N[i].tags||[]).length;j++) tags[N[i].tags[j]]=(tags[N[i].tags[j]]||0)+1;
 var ks=Object.keys(tags).sort();
 h="";
 for(i=0;i<ks.length;i++) h+='<button data-tg="'+esc(ks[i])+'" aria-pressed="'+(NTF===ks[i])+'">'+esc(ks[i])+' '+tags[ks[i]]+'</button>';
 el("nt-tg").innerHTML=h;
 var q=(el("nt-q").value||"").toLowerCase();
 h="";
 for(i=0;i<N.length;i++){ var n=N[i];
  if(NTF && (n.tags||[]).indexOf(NTF)<0) continue;
  if(q && (n.t+" "+n.b+" "+(n.tags||[]).join(" ")).toLowerCase().indexOf(q)<0) continue;
  h+='<div class="nt" id="nt'+i+'"><div class="ti" data-no="'+i+'"><strong>'+esc(n.t)+'</strong><span>'+esc(n.d)+'</span></div>'+
     '<div class="bd">'+esc(n.b)+'</div>';
  if((n.tags||[]).length){ h+='<div class="tg2">'; for(j=0;j<n.tags.length;j++) h+='<i>'+esc(n.tags[j])+'</i>'; h+='</div>'; }
  h+='<button class="rmn" data-nx="'+i+'">remover</button></div>';
 }
 el("nt-l").innerHTML=h||'<div class="nt"><span style="font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--line2)">arquivo vazio</span></div>';
 lig("b-nota",function(){ var t=el("nt-t").value.trim(), b=el("nt-b").value.trim();
  if(!t&&!b)return;
  var g=el("nt-g").value.split(",").map(function(x){return x.trim().toLowerCase();}).filter(Boolean);
  S.notas.unshift({t:t||b.slice(0,40),b:b,tags:g,d:hoje()});
  el("nt-t").value="";el("nt-b").value="";el("nt-g").value="";
  move(0,3,"Nota arquivada: "+esc(t||b.slice(0,40)),false,-3,1,0);});
 var n2=document.querySelectorAll("[data-no]");
 for(i=0;i<n2.length;i++) n2[i].addEventListener("click",function(){
  var k=this.getAttribute("data-no"); el("nt"+k).classList.toggle("ab"); });
 n2=document.querySelectorAll("[data-nx]");
 for(i=0;i<n2.length;i++) n2[i].addEventListener("click",function(){
  S.notas.splice(+this.getAttribute("data-nx"),1); pinta(); });
 n2=document.querySelectorAll("[data-tg]");
 for(i=0;i<n2.length;i++) n2[i].addEventListener("click",function(){
  var t2=this.getAttribute("data-tg"); NTF=(NTF===t2)?"":t2; pintaSB(); });
 var qi=el("nt-q"); if(qi) qi.addEventListener("input",function(){ pintaSB(); });

 var hoy=hoje(), feito=S.diario&&S.diario[hoy];
 el("dj-t").value=feito||"";
 h="";
 for(i=6;i>=0;i--){ var d=diaStr(hojeN()-i);
  h+='<div><i class="'+((S.diario&&S.diario[d])?"on6":"")+'"></i><span>'+d.slice(8)+'</span></div>'; }
 el("dj-g").innerHTML=h;
 var ds=Object.keys(S.diario||{}).sort().reverse().slice(0,14);
 h="";
 for(i=0;i<ds.length;i++) h+='<div><b>'+ds[i]+'</b><span>'+esc(S.diario[ds[i]])+'</span></div>';
 el("dj-h").innerHTML=h;
 lig("b-diario",function(){ var v=el("dj-t").value.trim(); if(!v)return;
  var novo=!(S.diario&&S.diario[hoy]);
  S.diario=S.diario||{}; S.diario[hoy]=v;
  if(novo) move(0,4,"Ciclo registrado no di\u00e1rio. O que foi absorvido virou texto.",false,-8,1,0);
  else pinta(); });
}
function pintaRastro(){
 if(!RTM) RTM=hoje().slice(0,7);
 var Y=+RTM.slice(0,4), M=+RTM.slice(5,7), dias=new Date(Y,M,0).getDate();
 el("rt-mes").textContent=MESES[M-1]+" "+Y;
 if(!S.hab.length){ el("rt-w").innerHTML='<div class="vzr">nenhum h\u00e1bito ainda \u2014 crie o primeiro no campo acima e marque os dias na grade</div>'; el("rt-kpi").innerHTML=""; return; }
 var i,d,h='<table class="rtg"><thead><tr><th class="h">H\u00e1bito</th>';
 for(d=1;d<=dias;d++){ var dw=new Date(Y,M-1,d).getDay();
  h+='<th class="d'+((dw===0||dw===6)?" fds":"")+'">'+d+'</th>'; }
 h+='<th class="d" style="width:auto;padding:0 9px">%</th></tr></thead><tbody>';
 var feitosT=0, possT=0, colT=[];
 for(d=1;d<=dias;d++) colT.push(0);
 var hojeStr=hoje(), hn=hojeN();
 for(i=0;i<S.hab.length;i++){ var x=S.hab[i], H=x.hist||[], n=0;
  h+='<tr><td class="h">'+esc(x.nome)+'</td>';
  for(d=1;d<=dias;d++){
   var ds=RTM+"-"+String(d).padStart(2,"0"), on=H.indexOf(ds)>=0, fut=diaN(ds)>hn;
   if(on){ n++; colT[d-1]++; }
   h+='<td class="c'+(on?" on5":"")+(ds===hojeStr?" hoje2":"")+(fut?" fut":"")+'"'+(fut?"":' data-rc="'+i+'|'+ds+'"')+'></td>';
  }
  var poss=Math.min(dias, (RTM===hojeStr.slice(0,7))?+hojeStr.slice(8):dias);
  feitosT+=n; possT+=poss;
  h+='<td class="r2"><b>'+n+'</b>/'+poss+' &middot; '+(poss?Math.round(n/poss*100):0)+'%</td></tr>';
 }
 h+='<tr class="tot"><td class="h">dia</td>';
 for(d=1;d<=dias;d++){ var q=colT[d-1], cl=q===0?"q1":(q>=S.hab.length?"q3":"q2");
  h+='<td class="'+cl+'">'+(q||"")+'</td>'; }
 h+='<td class="r2"></td></tr></tbody></table>';
 el("rt-w").innerHTML=h;
 var cem=0;
 for(d=0;d<dias;d++) if(colT[d]===S.hab.length&&S.hab.length) cem++;
 var melhor=0;
 for(i=0;i<S.hab.length;i++){ var ord=(S.hab[i].hist||[]).slice().sort(), run=0, prev=null, j;
  for(j=0;j<ord.length;j++){ var dn=diaN(ord[j]); run=(prev!==null&&dn===prev+1)?run+1:1; if(run>melhor) melhor=run; prev=dn; } }
 el("rt-kpi").innerHTML=
  '<div><span class="v4">'+(possT?Math.round(feitosT/possT*100):0)+'%</span><span class="l4">do m\u00eas</span></div>'+
  '<div><span class="v4">'+feitosT+'</span><span class="l4">marca\u00e7\u00f5es</span></div>'+
  '<div><span class="v4">'+cem+'</span><span class="l4">dias 100%</span></div>'+
  '<div><span class="v4">'+melhor+'</span><span class="l4">melhor sequ\u00eancia</span></div>';
 var c=document.querySelectorAll("[data-rc]");
 for(i=0;i<c.length;i++) c[i].addEventListener("click",function(){
  var q2=this.getAttribute("data-rc").split("|"), x2=S.hab[+q2[0]], ds2=q2[1];
  x2.hist=x2.hist||[];
  var k=x2.hist.indexOf(ds2);
  if(k>=0){ x2.hist.splice(k,1); pinta(); return; }
  x2.hist.push(ds2);
  if(ds2===hoje()){ var w7=jan7(x2.hist), bonus=habBonus(x2,w7);
   move(0,3+bonus,"H\u00e1bito: "+esc(x2.nome)+" \u2014 "+w7+" de 7 dias"+(bonus?", semana cumprida.":"."),false,0,0,0); }
  else pinta();
 });
 lig("rt-p",function(){ var Y2=+RTM.slice(0,4),M2=+RTM.slice(5,7)-1; if(M2<1){M2=12;Y2--;}
  RTM=Y2+"-"+String(M2).padStart(2,"0"); pintaRastro(); });
 lig("rt-n",function(){ var Y3=+RTM.slice(0,4),M3=+RTM.slice(5,7)+1; if(M3>12){M3=1;Y3++;}
  RTM=Y3+"-"+String(M3).padStart(2,"0"); pintaRastro(); });
}
function pintaHabTab(){
 var alvo=el("hb-tab"); if(!alvo) return;
 if(!S.hab.length){ alvo.innerHTML=""; return; }
 var mes=hoje().slice(0,7), h='<table class="hbt"><thead><tr><th>Hábito</th><th class="r">Mês</th><th class="r">%</th><th class="r">Melhor</th><th></th></tr></thead><tbody>',i,j;
 for(i=0;i<S.hab.length;i++){ var x=S.hab[i], H=x.hist||[], n=0, melhor=0, run=0, prev=null;
  for(j=0;j<H.length;j++) if(H[j].slice(0,7)===mes) n++;
  var ord=H.slice().sort();
  for(j=0;j<ord.length;j++){ var dn=diaN(ord[j]);
   run=(prev!==null&&dn===prev+1)?run+1:1; if(run>melhor) melhor=run; prev=dn; }
  var dias=new Date(+mes.slice(0,4),+mes.slice(5,7),0).getDate();
  var pc=Math.round(n/dias*100);
  h+='<tr><td>'+esc(x.nome)+'</td><td class="r">'+n+'/'+dias+'</td><td class="r">'+pc+'%</td><td class="r">'+melhor+'</td>'+
     '<td><div class="bb2"><i style="width:'+pc+'%"></i></div></td></tr>'; }
 alvo.innerHTML=h+'</tbody></table>';
}

function ingles(c){ var i; for(i=0;i<SUG.length;i++) if(SUG[i][0]===c) return SUG[i][2];
 for(i=0;i<FASES.length;i++) if(FASES[i][0]===c) return FASES[i][2]; return ""; }
function pintaCod(){
 var c=(S.modo==="fase")?FASES[faseIdx()][0]:(S.cod||"ASTROMANTE"), en=ingles(c);
 var inv=(S.idi==="en"&&en), tit=inv?en:c, sub=inv?c:en;
 el("cod").textContent=tit;
 el("cod2").innerHTML=esc(tit)+(sub?'<br><span class="coden">'+esc(sub)+'</span>':"");
 el("coden").textContent=sub||""; el("coden").style.display=sub?"block":"none";
 el("m-en").setAttribute("aria-pressed",S.idi==="en");
 el("m-pt").setAttribute("aria-pressed",S.idi!=="en");
 lig("m-en",function(){ S.idi="en"; pinta();});
 lig("m-pt",function(){ S.idi="pt"; pinta();});
 el("m-fase").setAttribute("aria-pressed",S.modo==="fase");
 el("m-fixo").setAttribute("aria-pressed",S.modo!=="fase");
 lig("m-fase",function(){ S.modo="fase";
  anota("Designa\u00e7\u00e3o passa a acompanhar a fase: "+FASES[faseIdx()][0]+".",0,false); pinta();});
 lig("m-fixo",function(){ S.modo="fixo"; pinta();});
 pintaArco();
 var i,h="";
 for(i=0;i<SUG.length;i++) h+='<button data-sg="'+i+'" title="'+SUG[i][1]+'">'+SUG[i][0]+
  ' <span class="en9">\u00b7 '+SUG[i][2]+'</span></button>';
 el("sug").innerHTML=h;
 var n=document.querySelectorAll("[data-sg]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  el("cod-in").value=SUG[+this.getAttribute("data-sg")][0]; });
 lig("b-etim",function(){ el("etimb").classList.toggle("on"); });
 var ci=el("cod-in"); if(ci&&document.activeElement!==ci&&!ci.value) ci.value=c;
 lig("b-cod",function(){ var v=el("cod-in").value.trim().toUpperCase(); if(!v)return;
  var ant=S.cod||"ASTROMANTE"; S.cod=v;
  anota("Designa\u00e7\u00e3o alterada: "+esc(ant)+" \u2192 "+esc(v)+".",0,false);
  el("desig").classList.remove("on"); pinta(); });
}
function pintaPP(){
 var A=S.ign.af, V=S.ign.vi, feita=S.ign.decl===hoje();
 var ativa=A.length?A[Math.min(S.ign.at,A.length-1)]:null;
 el("pp-pw").innerHTML=
  '<span class="n">'+(ativa?esc(ativa).slice(0,78)+(ativa.length>78?"\u2026":""):"Nenhum ramo declarado")+
   '<small>afirma\u00e7\u00e3o corrente</small></span><span class="s '+(ativa?"on":"off")+'">'+(ativa?"carregado":"vazio")+'</span>'+
  '<span class="n">Rotas no registro<small>'+A.length+' em palavra \u00b7 '+V.length+' em imagem</small></span>'+
   '<span class="s '+((A.length+V.length)?"on":"off")+'">'+(A.length+V.length)+'</span>'+
  '<span class="n">Declara\u00e7\u00e3o do ciclo<small>dizer o alvo antes do colapso</small></span>'+
   '<span class="s '+(feita?"on":"off")+'">'+(feita?"feita":"pendente")+'</span>';
 var bd2=el("b-decl2");
 if(bd2){ bd2.disabled=!A.length||feita;
  lig("b-decl2",function(){ var b2=el("b-decl"); if(b2&&!b2.disabled) b2.click();
   else { var h2=el("h-rota"); if(h2) h2.scrollIntoView({block:"start",behavior:"smooth"}); } }); }
}
function pintaIgn(){
 var A=S.ign.af, V=S.ign.vi, FO=S.ign.fo||[], i, h;
 var ativa=A.length?A[Math.min(S.ign.at,A.length-1)]:null;
 var fat=FO.length?FO[Math.min(S.ign.foAt,FO.length-1)]:null;
 h=""; for(i=0;i<FO.length;i++) h+='<li class="'+(i===S.ign.foAt?"at":"")+'">'+
   '<span class="hz">'+esc(FO[i].h||"m\u00eas")+'</span>'+
   '<span class="tx" data-fo="'+i+'">'+esc(FO[i].t)+'</span>'+
   '<button class="x" data-rfo="'+i+'" aria-label="remover">&#10005;</button></li>';
 el("ig-fo").innerHTML=h||'<li class="vazio2">nenhum foco fixado</li>';
 var fe=el("ig-foco");
 if(fe) fe.innerHTML=fat?('<span class="k9">Foco em curso &middot; '+esc(fat.h||"m\u00eas")+'</span><b>'+esc(fat.t)+'</b>')
   :'<span class="k9">Sem foco fixado</span><b class="vaz9">a afirma\u00e7\u00e3o fica sem destino: fixe ao lado o que ela serve</b>';
 var q=el("ig-ativa");
 if(ativa){ q.className="q"; q.textContent=ativa; }
 else { q.className="q vaz"; q.textContent="Nenhuma afirma\u00e7\u00e3o registrada. Escreva a primeira abaixo \u2014 a muta\u00e7\u00e3o roda a sentido, e o sentido precisa estar escrito em algum lugar."; }
 h=""; for(i=0;i<A.length;i++) h+='<li class="'+(i===S.ign.at?"at":"")+'"><span class="ix">'+
   String(i+1).padStart(2,"0")+'</span><span class="tx" data-af="'+i+'">'+esc(A[i])+
   '</span><button class="x" data-raf="'+i+'" aria-label="remover">&#10005;</button></li>';
 el("ig-af").innerHTML=h||'<li class="vazio2">vazio</li>';
 h=""; for(i=0;i<V.length;i++) h+='<li><span class="ix">'+String(i+1).padStart(2,"0")+
   '</span><span class="tx">'+esc(V[i])+'</span><button class="x" data-rvi="'+i+'" aria-label="remover">&#10005;</button></li>';
 el("ig-vi").innerHTML=h||'<li class="vazio2">vazio</li>';
 el("b-decl").disabled=!A.length||S.ign.decl===hoje();
 var n=document.querySelectorAll("[data-af]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S.ign.at=+this.getAttribute("data-af"); pinta(); });
 n=document.querySelectorAll("[data-raf]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ var k=+this.getAttribute("data-raf");
  S.ign.af.splice(k,1); if(S.ign.at>=S.ign.af.length) S.ign.at=Math.max(0,S.ign.af.length-1); pinta(); });
 n=document.querySelectorAll("[data-rvi]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S.ign.vi.splice(+this.getAttribute("data-rvi"),1); pinta(); });
 n=document.querySelectorAll("[data-fo]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S.ign.foAt=+this.getAttribute("data-fo"); pinta(); });
 n=document.querySelectorAll("[data-rfo]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ var k=+this.getAttribute("data-rfo");
  S.ign.fo.splice(k,1); if(S.ign.foAt>=S.ign.fo.length) S.ign.foAt=Math.max(0,S.ign.fo.length-1); pinta(); });
 lig("b-addfo",function(){ var v=el("ig-nfo").value.trim(); if(!v)return;
  S.ign.fo=(S.ign.fo||[]).concat({t:v,h:el("ig-hfo").value});
  S.ign.foAt=S.ign.fo.length-1; el("ig-nfo").value="";
  anota("Foco fixado: "+esc(v)+" ("+el("ig-hfo").value+").",0,false); pinta(); });
}


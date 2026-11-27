function imgDe(k,v){ return v||PAD[k]||null; }
function frameHTML(src,tag,cap,alvo,semTroca){
 var h='';
 if(src) h+='<img src="'+src+'" alt=""><div class="duo"></div><div class="gr2"></div>'+
   '<button class="rmf" data-rf="'+alvo+'" aria-label="remover">\u2715</button>';
 else h+='<div class="vazf"><span>'+tag+'</span><span style="color:var(--line2)">sem registro visual</span></div>';
 h+='<div class="scan"></div><i class="ct2"></i><i class="ct3"></i><i class="ct4"></i><i class="ct5"></i>';
 h+='<span class="tagf">'+tag+'</span>';
 if(src) h+='<div class="capf"><span>'+cap[0]+'</span><b>'+cap[1]+'</b></div>';
 if(!semTroca) h+='<label><span>'+(src?"trocar":"importar imagem")+'</span><input type="file" accept="image/*" data-fi="'+alvo+'" style="position:absolute;width:1px;height:1px;opacity:0"></label>';
 return h;
}
function importar(file,maxW,cb){
 var fr=new FileReader();
 fr.onload=function(ev){ var im=new Image();
  im.onload=function(){ var r=Math.min(1,maxW/im.width), w=Math.round(im.width*r), h=Math.round(im.height*r);
   var cv=document.createElement("canvas"); cv.width=w; cv.height=h;
   var cx2=cv.getContext("2d"); if(!cx2) return;
   cx2.drawImage(im,0,0,w,h);
   try{ cb(cv.toDataURL("image/jpeg",0.72)); }catch(e){}
  };
  im.onerror=function(){ var m=el("msg"); if(m) m.textContent="imagem ileg\u00edvel"; };
  im.src=ev.target.result; };
 fr.readAsDataURL(file);
}
function pintaPlacas(){
 var n=document.querySelectorAll("[data-pl]"),i;
 for(i=0;i<n.length;i++){ var k=n[i].getAttribute("data-pl"), src=imgDe(k,(S.placas||{})[k]);
  n[i].innerHTML=(src?'<img src="'+src+'" alt=""><div class="duo2"></div><button class="rmp" data-pr2="'+k+'">\u2715</button>'
                     :'<div class="vz7">sem placa</div>')+
   '<div class="sc2"></div><i class="cx a"></i><i class="cx b"></i>'+
   '<label><span>'+(src?"trocar":"placa")+'</span><input type="file" accept="image/*" data-pi="'+k+'" data-w="'+(n[i].getAttribute("data-w")||300)+'"></label>';
 }
 n=document.querySelectorAll("[data-pi]");
 for(i=0;i<n.length;i++) n[i].addEventListener("change",function(){
  var k=this.getAttribute("data-pi"), f=this.files&&this.files[0]; if(!f) return;
  var w=+(this.getAttribute("data-w")||0)||300;
  importar(f,w,function(d){ S.placas=S.placas||{}; S.placas[k]=d; pinta(); }); });
 n=document.querySelectorAll("[data-pr2]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){
  S.placas=S.placas||{}; S.placas[this.getAttribute("data-pr2")]=null; pinta(); });
}
function pintaFrames(){
 var c=(S.modo==="fase")?FASES[faseIdx()][0]:(S.cod||"ASTROMANTE");
 if(S.idi==="en"&&ingles(c)) c=ingles(c);
 el("fr-ret").innerHTML=frameHTML(imgDe("retrato",S.retrato),"[subj_01]",["registro visual do sujeito",c],"retrato");
 el("fr-fx").innerHTML=frameHTML(imgDe("faixa",S.faixa),"[camp_00]",["faixa de campo \u00b7 arquivo \u03a3",S.ciclo],"faixa",true);
 var n=document.querySelectorAll("[data-fi]"),i;
 for(i=0;i<n.length;i++) n[i].addEventListener("change",function(){
  var k=this.getAttribute("data-fi"), f=this.files&&this.files[0]; if(!f) return;
  importar(f, k==="faixa"?880:420, function(d){ S[k]=d; pinta(); });
 });
 n=document.querySelectorAll("[data-rf]");
 for(i=0;i<n.length;i++) n[i].addEventListener("click",function(){ S[this.getAttribute("data-rf")]=null; pinta(); });
}


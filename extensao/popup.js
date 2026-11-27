/* Astronáutica · janela da extensão (popup, painel lateral ou janela solta)
   Lê o estado do app e a fila de eventos ainda não aplicados; tudo o que a pessoa marca
   vira evento em vertice_inbox. Quem grava o registro é sempre o app. */
var $ = function (id) { return document.getElementById(id); };
var DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
/* humor: o mesmo 1 a 5 da "leitura do ciclo" do app (5 pico ... 1 colapso) */
var HUM = [[5, 'Radiante', '#d8b44a'], [4, 'Firme', '#6f8a57'], [3, 'Morno', '#c9b48a'], [2, 'Nublado', '#7d8fa3'], [1, 'Esgotado', '#9b5a46']];
var CORES = ['#d99b52', '#d8c16e', '#7f9a68', '#6b8fb3', '#b86b5a', '#9a7bb0'];
var CONT_PADRAO = [{ id: 'c-flexoes', n: 'Flexões', u: 'repetições', meta: 30 }, { id: 'c-leitura', n: 'Leitura', u: 'páginas', meta: 20 }];
var AGUA_META = 8, CIRC = 2 * Math.PI * 47;
/* refúgio, modo de abertura e tamanho */
var MODO = new URLSearchParams(location.search).get('modo') || 'popup';
var TEMA = 'greek', T = temaDe('greek'), ZOOM = 1, ZOOMS = [0.85, 0.92, 1, 1.1, 1.2, 1.32];
/* foco e pausas (mesmos padrões do segundo plano) */
var CF = { foco: 25, curta: 5, longa: 15, ciclo: 4, auto: true, som: 'nenhum', toque: 0, insiste: 10, aviso5: true }, POMO = 0, FOCO_ATUAL = null;
var estado = null, fila = [], contDefs = [], relogio = null;

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function aviso(t, erro) { var m = $('msg'); m.textContent = t; m.className = erro ? 'erro' : ''; clearTimeout(aviso.t); aviso.t = setTimeout(function () { m.textContent = ''; }, 3500); }
function num(v) { v = String(v || '').replace(/[^\d,.-]/g, ''); if (v.indexOf(',') >= 0) v = v.replace(/\./g, '').replace(',', '.'); return +v || 0; }
function diaMenos(n) { var d = new Date(); d.setDate(d.getDate() - n); return d; }

/* ---------- eventos ---------- */
async function manda(tipo, dados, ok) {
  fila.push({ tipo: tipo, dados: Object.assign({ dia: hojeStr() }, dados) });
  pintaTudo();
  try { await API.evento(tipo, dados); aviso(ok); }
  catch (e) {
    if (/Entre na sua conta/.test(e.message)) { mostraLogin(); return; }
    chrome.runtime.sendMessage({ t: 'pendente', tipo: tipo, dados: dados });
    aviso('Sem conexão: guardado, sai assim que a rede voltar.');
  }
}
function naFila(tipo, soHoje) {
  var d = hojeStr();
  return fila.filter(function (e) { return e.tipo === tipo && (!soHoje || (e.dados || {}).dia === d); });
}

/* ---------- leituras derivadas (estado do app + fila ainda não aplicada) ---------- */
function aguaHoje() {
  var v = estado && estado.agua ? (+estado.agua[hojeStr()] || 0) : 0;
  naFila('agua', true).forEach(function (e) { v = Math.max(0, v + (e.dados.d === -1 ? -1 : 1)); });
  return v;
}
function humorDe(dia) {
  var v = estado && estado.estado ? (+estado.estado[dia] || 0) : 0;
  fila.forEach(function (e) { if (e.tipo === 'humor' && e.dados.dia === dia) v = +e.dados.v || v; });
  return v;
}
function contValor(id) {
  var d = hojeStr(), base = estado && estado.cont && estado.cont.dia && estado.cont.dia[d] ? (+estado.cont.dia[d][id] || 0) : 0;
  naFila('contador', true).forEach(function (e) { if (e.dados.id === id && e.dados.acao !== 'remover') base = Math.max(0, base + (+e.dados.d || 0)); });
  return base;
}
function sessoesHoje() {
  var d = hojeStr();
  var s = ((estado && estado.ses) || []).filter(function (x) { return x && x.day === d; })
    .map(function (x) { return { t: x.result || x.task || 'foco', min: +x.minutes || 0 }; });
  return s.concat(naFila('foco', true).map(function (e) { return { t: e.dados.tarefa || 'foco', min: +e.dados.min || 0 }; }))
    .concat(naFila('focoApp', true).filter(function (e) { return e.dados.acao === 'fim' && +e.dados.min >= 1; }).map(function (e) { return { t: e.dados.rot || 'foco', min: +e.dados.min || 0 }; }));
}
function dracmas() {
  var n = sessoesHoje().length;
  if (aguaHoje() >= AGUA_META) n++;
  contDefs.forEach(function (c) { if (contValor(c.id) >= c.meta) n++; });
  return n;
}

/* ciclo: mesma ordem do app (peso maior primeiro; peso 4 ou 5 ocupa duas casas) */
function ordemCiclo() {
  var est = (estado && estado.est) || {};
  var D = (est.disc || []).slice().sort(function (a, b) { return (b.peso - a.peso) || (a.nome < b.nome ? -1 : 1); });
  var o = [];
  D.forEach(function (x) { for (var k = 0; k < Math.max(1, Math.round(x.peso / 2)); k++) o.push(x); });
  return o;
}
function cicloAgora() {
  var est = (estado && estado.est) || {}, o = ordemCiclo();
  if (!o.length) return null;
  var at = est.at | 0, volta = est.volta || 1;
  naFila('ciclo').forEach(function () { at++; if (at % o.length === 0) volta++; });
  return { o: o, i: at % o.length, volta: volta, blocos: est.blocos || [] };
}

/* ---------- pintura ---------- */
function mostraLogin() { $('login').hidden = false; $('painel').hidden = true; $('sair').hidden = true; }

function pintaCab() {
  var s = sessoesHoje(), h = '';
  for (var i = 0; i < Math.min(8, Math.max(8, s.length)); i++) {
    var b = s[i];
    if (i === 7 && s.length > 8) { h += '<span class="conta mais">+' + (s.length - 7) + '</span>'; break; }
    h += b ? '<span class="conta" title="' + esc(b.t) + ' · ' + b.min + ' min" style="background:' + CORES[i % CORES.length] + '"></span>' : '<span class="conta vazia"></span>';
  }
  $('fio').innerHTML = h;
  $('dracmas').textContent = dracmas();
}

function pintaAgora() {
  var f = faixaDe(), tb = (estado && estado.tb) || {}, d = hojeStr(), el = $('agora');
  if (!f) { el.innerHTML = '<small>fora das faixas</small><b>' + esc(T.dorme) + '</b><span>A próxima faixa começa às 06h.</span>'; return; }
  var i = FAIXAS.indexOf(f), prox = FAIXAS[i + 1], txt = tb[d + '|' + f], txp = prox ? tb[d + '|' + prox] : '';
  el.innerHTML = '<small>agora · ' + esc(T.fx[f] || f + 'h') + ' · ' + f + 'h às ' + String((+f + 3) % 24).padStart(2, '0') + 'h</small><b>' + (txt ? esc(txt) : 'Nada marcado na escala') + '</b>' +
    (prox ? '<span>depois, às ' + prox + 'h: ' + (txp ? esc(txp) : 'livre') + '</span>' : '');
}

async function pintaFoco() {
  var fo = (await chrome.storage.local.get('foco')).foco;
  if (fo && fo.tot == null && fo.fim) fo = { tot: fo.min * 60000, acum: 0, ini: fo.inicio, tarefa: fo.tarefa };
  clearInterval(relogio);
  $('parado').hidden = !!fo; $('rodando').hidden = !fo;
  $('anel').classList.toggle('pausa', !!(fo && fo.descanso));
  $('modo').textContent = fo && fo.descanso ? 'pausa' : 'foco';
  var s = sessoesHoje(), min = s.reduce(function (a, x) { return a + x.min; }, 0);
  FOCO_ATUAL = fo;
  $('fstat').innerHTML = '<b>' + s.length + (s.length === 1 ? ' bloco' : ' blocos') + '</b> · <b>' + min + '</b> min hoje' +
    (fo && fo.passo && !fo.descanso ? '<span class="f-passo">passo: ' + esc(fo.passo) + '</span>' : '');
  var pm = (await chrome.storage.local.get('pomo')).pomo || {}; POMO = pm.dia === hojeStr() ? pm.n | 0 : 0;
  var nc = Math.max(1, CF.ciclo), feitos = POMO % nc, dots = '';
  for (var k = 0; k < nc; k++) dots += '<i class="' + (k < feitos ? 'ok' : '') + '"></i>';
  $('pomo').innerHTML = dots + '<span>' + (nc - feitos) + (nc - feitos === 1 ? ' bloco' : ' blocos') + ' até a pausa longa</span>';
  $('passo').hidden = !!fo;
  pintaPassos(); pintaGuardiao();
  if (!fo) { $('tempo').textContent = String(CF.foco).padStart(2, '0') + ':00'; $('tlabel').textContent = 'pronto'; $('arco').style.strokeDashoffset = 0; return; }
  if (fo.tarefa && !$('tarefa').value) $('tarefa').value = fo.tarefa;
  var tick = function () {
    var r = Math.max(0, Math.round((fo.tot - fo.acum - (fo.ini ? Date.now() - fo.ini : 0)) / 1000));
    $('tempo').textContent = String(Math.floor(r / 60)).padStart(2, '0') + ':' + String(r % 60).padStart(2, '0');
    $('tlabel').textContent = !fo.ini ? 'parado' : (fo.descanso ? 'respira' : (fo.disc ? 'ciclo' : 'treinando'));
    $('arco').style.strokeDashoffset = CIRC * (1 - r / (fo.tot / 1000));
    $('pp').textContent = fo.ini ? 'pausar' : 'retomar';
    if (!r) clearInterval(relogio);
  };
  tick(); relogio = setInterval(tick, 500);
}

function pintaCiclo() {
  var c = cicloAgora(), box = $('ciclo');
  $('cbt').hidden = !c;
  if (!c) { $('volta').textContent = 'vazio'; box.innerHTML = '<p class="vazio">Inclua disciplinas no Ciclo de estudos do app para a roda aparecer aqui.</p>'; return; }
  $('volta').textContent = 'volta ' + c.volta;
  var cur = c.o[c.i], h = '', n = Math.min(5, c.o.length);
  for (var k = 0; k < n; k++) {
    var x = c.o[(c.i + k) % c.o.length];
    var tot = (x.min | 0) + naFila('ciclo').filter(function (e) { return e.dados.acao === 'fechar' && e.dados.disc === x.id; }).reduce(function (a, e) { return a + (+e.dados.min || 0); }, 0);
    h += '<li class="' + (k === 0 ? 'vez' : '') + '"><span class="n">' + (((c.i + k) % c.o.length) + 1) + '</span>' +
      '<span class="m">' + esc(x.nome) + (k === 0 ? ' <span class="tag">na vez</span>' : '') + '</span>' +
      '<span class="q">' + (Math.round(tot / 6) / 10) + ' h</span>';
    if (k === 0) {
      var ult = c.blocos.filter(function (b) { return b.disc === x.id && (b.prox || '').trim(); })[0];
      if (ult) h += '<span class="dica">retomar: ' + esc(ult.prox) + '</span>';
    }
    h += '</li>';
  }
  var falta = c.o.length - c.i;
  box.innerHTML = '<ol class="ciclo">' + h + '</ol><p class="cfalta">' + falta + (falta === 1 ? ' bloco' : ' blocos') + ' até fechar a volta · peso maior aparece mais vezes</p>';
  $('treinar').dataset.disc = cur.id; $('treinar').dataset.nome = cur.nome;
}

function pintaHumor() {
  var v = humorDe(hojeStr());
  $('humor').innerHTML = HUM.map(function (x) {
    return '<button data-h="' + x[0] + '" title="' + x[1] + '" aria-pressed="' + (v === x[0]) + '"><i style="background:' + x[2] + '"></i>' + x[1] + '</button>';
  }).join('');
  var h = '';
  for (var i = 6; i >= 0; i--) {
    var d = diaMenos(i), w = humorDe(hojeStr(d)), c = HUM.filter(function (x) { return x[0] === w; })[0];
    h += '<div title="' + (c ? c[1] : 'sem registro') + '"><i style="' + (c ? 'background:' + c[2] + ';border:0' : '') + '"></i>' + (i === 0 ? 'hoje' : DIAS[d.getDay()]) + '</div>';
  }
  $('semana').innerHTML = h;
}

function linhaCont(id, nome, un, meta, v, removivel) {
  var p = Math.min(100, Math.round(v / meta * 100));
  return '<div class="ct' + (v >= meta ? ' ok' : '') + '"><div class="nm">' + esc(nome) +
    (removivel ? ' <button class="x" data-rm="' + esc(id) + '" title="remover contador" aria-label="remover ' + esc(nome) + '">✕</button>' : '') +
    '<span>meta ' + meta + ' ' + esc(un) + (v >= meta ? ' · fechou' : '') + '</span></div>' +
    '<div class="ctl"><button data-c="' + esc(id) + '" data-d="-1" aria-label="menos ' + esc(nome) + '">−</button><b>' + v + '</b>' +
    '<button data-c="' + esc(id) + '" data-d="1" aria-label="mais ' + esc(nome) + '">+</button></div>' +
    '<div class="barra"><i style="width:' + p + '%"></i></div></div>';
}
function pintaCont() {
  var h = linhaCont('agua', 'Água', 'copos', AGUA_META, aguaHoje(), false);
  contDefs.forEach(function (c) { h += linhaCont(c.id, c.n, c.u, c.meta, contValor(c.id), true); });
  $('cont').innerHTML = h;
}

function pintaTop() {
  var p = estado && estado.plan && estado.plan[hojeStr()], top = (p && p.top) || [], ol = $('top');
  naFila('prioridade', true).forEach(function (e) { if (top[e.dados.i]) top[e.dados.i].ok = !!e.dados.ok; });
  var com = top.filter(function (t) { return t && (t.t || '').trim(); });
  if (!com.length) { ol.innerHTML = '<li class="vazio">Defina as três missões do dia ' + esc(T.naSede) + ' do app.</li>'; return; }
  ol.innerHTML = top.map(function (t, i) {
    if (!t || !(t.t || '').trim()) return '';
    return '<li class="' + (t.ok ? 'ok' : '') + '"><label><input type="checkbox" data-pri="' + i + '"' + (t.ok ? ' checked' : '') + '><span>' + esc(t.t) + '</span></label></li>';
  }).join('');
}
function pintaHabitos() {
  var hs = (estado && estado.hab) || [], d = hojeStr(), ul = $('habitos');
  var marc = naFila('habito', true).map(function (e) { return e.dados.id; });
  if (!hs.length) { ul.innerHTML = '<li class="vazio">Nenhum hábito cadastrado no app.</li>'; return; }
  /* últimos 7 dias, de seis dias atrás até hoje */
  var dias = [], k, dt;
  for (k = 6; k >= 0; k--) { dt = new Date(); dt.setDate(dt.getDate() - k); dias.push(dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0')); }
  var ini = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  ul.innerHTML = hs.map(function (h) {
    var hist = h.hist || [], feito = hist.indexOf(d) >= 0 || marc.indexOf(h.id) >= 0, seq = 0;
    var bol = dias.map(function (x, i) {
      var ok = hist.indexOf(x) >= 0 || (x === d && feito), dd = new Date(x + 'T12:00');
      return '<i class="rb' + (ok ? ' ok' : '') + (x === d ? ' hoje' : '') + '" title="' + ini[dd.getDay()] + ' ' + x.slice(8) + '"></i>';
    }).join('');
    for (k = dias.length - 1; k >= 0; k--) { if (hist.indexOf(dias[k]) >= 0 || (dias[k] === d && feito)) seq++; else if (dias[k] !== d) break; }
    return '<li class="' + (feito ? 'ok' : '') + '"><label><input type="checkbox" data-hab="' + esc(h.id) + '"' + (feito ? ' checked disabled' : '') + '><span>' + esc(h.nome) + '</span></label><span class="rbs">' + bol + '</span>' + (seq > 1 ? '<b class="rseq">' + seq + 'd</b>' : '') + '</li>';
  }).join('');
}

/* blocos do dia: cada faixa com o que está na grade; dá para focar direto num bloco */
function pintaDia() {
  var tb = (estado && estado.tb) || {}, d = hojeStr(), h = new Date().getHours(), at = faixaDe(), vistoProx = false;
  $('dia').innerHTML = FAIXAS.map(function (f) {
    var v = tb[d + '|' + f] || '', fim = +f + 3, st = f === at ? 'agora' : (fim <= h ? 'foi' : '');
    var prox = !st && !vistoProx; if (prox) vistoProx = true;
    return '<li class="' + st + (prox ? ' prox' : '') + '"><b>' + f + '<small>h</small></b><div><span>' + esc(T.fx[f] || '') + (st === 'agora' ? ' · agora' : prox ? ' · a seguir' : '') + '</span><em>' + (v ? esc(v) : 'livre') + '</em></div>' +
      (st !== 'foi' && v ? '<button type="button" data-diaf="' + f + '" title="focar neste bloco">focar</button>' : '') + '</li>';
  }).join('');
  var n = FAIXAS.filter(function (f) { return tb[d + '|' + f]; }).length;
  $('dia-k').textContent = n ? n + ' de ' + FAIXAS.length + ' na grade' : 'grade vazia';
}

function pintaTudo() {
  pintaCab(); pintaAgora(); pintaCiclo(); pintaHumor(); pintaCont(); pintaTop(); pintaHabitos(); pintaFoco(); pintaGuardiao(); pintaDia();
  pintaToque(); pintaAtu(); pintaCaps(); pintaVerso(); pintaPosto();
}

/* ---------- o Posto do app, distribuído pelas abas ----------
   O app guarda em dados.posto uma foto do que o Posto mostra (texto e botões de cada cartão).
   Aqui só se lê; um botão vira o evento postoClique e o app clica o mesmo botão quando aplica a fila. */
var POSTO_ABAS = { hoje: ['top', 'fazer', 'lado'], arena: ['foco', 'estudo'], reg: ['rod'] };
function escP(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function pintaPosto() {
  var P = estado && estado.posto, em = P && P.em ? new Date(P.em) : null, velho = em && Date.now() - em > 15 * 60000;
  Object.keys(POSTO_ABAS).forEach(function (aba) {
    var box = $('posto-' + aba); if (!box) return;
    if (!P || !P.c) { box.innerHTML = '<p class="pst-vz">Abra o app uma vez para o Posto aparecer aqui.</p>'; return; }
    var h = POSTO_ABAS[aba].map(function (k) {
      var c = P.c[k]; if (!c) return '';
      /* título: o nome do cartão (1ª linha), menos no cabeçalho e no rodapé; horário + compromisso numa linha só */
      var ls = (c.l || []).slice(), tit = (k === 'top' || k === 'rod' || !ls.length) ? c.t : ls.shift(), jun = [];
      ls.forEach(function (x, i) { if (/^\d{1,2}:\d{2}$/.test(x) && ls[i + 1] && !/^\d{1,2}:\d{2}$/.test(ls[i + 1])) { ls[i + 1] = x + ' · ' + ls[i + 1]; return; } jun.push(x); });
      var cx = function (x) { return /[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(x) && x === x.toUpperCase(); };
      var L = jun.map(function (x) {
        var kv = x.match(/^([A-ZÁÉÍÓÚÂÊÔÃÕÇ ]{3,}) · (.*[\d—].*)$/);
        if (kv) return '<p class="pst-kv"><b>' + escP(kv[1]) + '</b><span>' + escP(kv[2]) + '</span></p>';
        return cx(x) && x.length > 2 ? '<b class="pst-k">' + escP(x) + '</b>' : '<p>' + escP(x) + '</p>'; }).join('');
      var B = (c.b || []).map(function (b) {
        var at = ' data-psel="' + escP(b.s) + '" data-plab="' + escP(b.l) + '"' + (b.i ? ' data-pinp="' + escP(b.i) + '"' : '');
        if (b.i) return '<div class="linha pst-in"><input placeholder="' + escP(b.ph || '') + '" maxlength="300"><button class="pri"' + at + '>' + escP(b.l) + '</button></div>';
        return '<button class="pst-b' + (b.on ? ' on' : '') + '"' + at + '>' + escP(b.l) + '</button>'; }).join('');
      return '<div class="card pst"><h2>' + escP(tit) + '</h2>' + L + (B ? '<div class="pst-bs">' + B + '</div>' : '') + '</div>';
    }).join('');
    box.innerHTML = h + '<p class="pst-em">' + (em ? 'como o app mostrou às ' + String(em.getHours()).padStart(2, '0') + ':' + String(em.getMinutes()).padStart(2, '0') + (velho ? ' · abra o app para atualizar' : '') : '') + ' · os toques valem quando o app estiver aberto</p>';
  });
}
/* a extensão relê a nuvem a cada 30 s (background): a aba aberta acompanha */
try { chrome.storage.onChanged.addListener(function (ch) { if (ch.estado && ch.estado.newValue && ch.estado.newValue.dados) { estado = ch.estado.newValue.dados; try { pintaTudo(); } catch (e) { } } }); } catch (e) { }
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-psel]'); if (!b) return;
  e.preventDefault();
  var d = { sel: b.dataset.psel }, inp = b.dataset.pinp;
  if (inp) { var i = b.parentNode.querySelector('input'); if (!i || !i.value.trim()) { if (i) i.focus(); return; } d.inp = inp; d.val = i.value.trim(); i.value = ''; }
  b.classList.add('pst-ida'); b.disabled = true;
  manda('postoClique', d, 'Enviado ao app: ' + b.dataset.plab + '.');
});

/* passos da tarefa: guardados na extensão, por tarefa */
var PASSOS = { chave: '', itens: [] };
function chaveTarefa() { return ((FOCO_ATUAL && !FOCO_ATUAL.descanso && FOCO_ATUAL.tarefa) || ($('tarefa') && $('tarefa').value) || '').trim().toLowerCase(); }
async function lerPassos() {
  var k = chaveTarefa(), A = (await chrome.storage.local.get('passos')).passos || {};
  PASSOS = { chave: k, itens: (A[k] || []).slice() }; return PASSOS;
}
async function gravaPassos(P) {
  var A = (await chrome.storage.local.get('passos')).passos || {};
  if (P.itens.length) A[P.chave] = P.itens; else delete A[P.chave];
  var ks = Object.keys(A); if (ks.length > 30) ks.slice(0, ks.length - 30).forEach(function (k) { delete A[k]; });
  await chrome.storage.local.set({ passos: A });
}
function proximoPasso() { for (var i = 0; i < PASSOS.itens.length; i++) if (!PASSOS.itens[i].ok) return PASSOS.itens[i]; return null; }
async function pintaPassos() {
  if (!$('passos')) return;
  await lerPassos();
  var nome = (FOCO_ATUAL && !FOCO_ATUAL.descanso && FOCO_ATUAL.tarefa) || $('tarefa').value.trim();
  $('passos-de').textContent = nome ? nome.slice(0, 28) : 'escreva a tarefa no foco';
  var prox = proximoPasso();
  $('passos').innerHTML = PASSOS.itens.map(function (it, i) {
    return '<li class="' + (it.ok ? 'ok' : '') + (it === prox ? ' prox' : '') + '"><button type="button" class="p-ck" data-pi="' + i + '" data-a="ok" aria-label="concluir">' + (it.ok ? '✓' : '') + '</button>' +
      '<span>' + esc(it.t) + (it.min ? ' <small>' + it.min + ' min</small>' : '') + '</span>' +
      (it.ok ? '' : '<button type="button" class="p-go" data-pi="' + i + '" data-a="focar" title="focar só neste pedaço' + (it.min ? ' por ' + it.min + ' min' : '') + '">focar</button>') +
      '<button type="button" class="x" data-pi="' + i + '" data-a="rm" aria-label="tirar">✕</button></li>';
  }).join('') || '<li class="vazio">Nenhum pedaço ainda. Comece pelo menor possível.</li>';
}

/* Toque do dia: faixa das horas do templo, com o próximo toque e a linha de hoje */
function pintaToque() {
  var tb = (estado && estado.tb) || {}, d = hojeStr(), agora = new Date(), h = agora.getHours(), at = faixaDe(), prox = null;
  FAIXAS.forEach(function (f) { if (+f > h && prox == null) prox = f; });
  $('tq-met').innerHTML = FAIXAS.map(function (f, i) {
    var cl = f === at ? 'agora' : (+f + 3 <= h ? 'foi' : '');
    return (i ? '<span class="tq-tri" aria-hidden="true"></span>' : '') + '<div class="tq-m ' + cl + '" title="' + esc(tb[d + '|' + f] || 'livre') + '"><b>' + f + ':00</b><i>' + esc(T.fx[f] || '') + '</i></div>';
  }).join('');
  var txt;
  if (prox) {
    var alvo = new Date(agora); alvo.setHours(+prox, 0, 0, 0);
    var m = Math.round((alvo - agora) / 60000), dur = m >= 60 ? Math.floor(m / 60) + 'h' + String(m % 60).padStart(2, '0') : m + ' min';
    txt = 'Toque ' + (T.toque === 'Concha' ? 'da ' : 'do ') + T.toque + ' · próximo ' + prox + ':00 · ' + (T.fx[prox] || '') + ' · em ' + dur;
  } else txt = 'Toque ' + (T.toque === 'Concha' ? 'da ' : 'do ') + T.toque + ' · amanhã às 06:00 · ' + T.fx['06'];
  $('tq-txt').textContent = txt;
  if (at) {
    var ini = new Date(agora); ini.setHours(+at, 0, 0, 0);
    var dec = (agora - ini) / 60000, falta = Math.max(0, Math.round(180 - dec));
    $('tq-bar').style.width = Math.min(100, Math.round(dec / 180 * 100)) + '%';
    $('tq-falta').textContent = 'faltam ' + (falta >= 60 ? Math.floor(falta / 60) + 'h' + String(falta % 60).padStart(2, '0') : falta + ' min') + ' de ' + (T.fx[at] || at + 'h') + (falta <= 15 ? ' · hora de fechar com calma' : '');
    $('tq-fx').hidden = false; $('tq-fx').classList.toggle('fim', falta <= 15);
  } else $('tq-fx').hidden = true;
  $('tq-dia').innerHTML = FAIXAS.map(function (f) {
    var v = tb[d + '|' + f] || '';
    return '<li class="' + (f === at ? 'agora' : (+f + 3 <= h ? 'foi' : '')) + '"><b>' + f + ':00</b><span>' + esc(T.fx[f] || '') + '</span><em>' + (v ? esc(v) : '—') + '</em></li>';
  }).join('');
}
/* Em andamento (leitura do app) */
var ORB = [['foco', 'Em foco'], ['ass', 'Assistindo'], ['ouv', 'Ouvindo'], ['est', 'Estudando'], ['pen', 'Pensando em'], ['alm', 'Almejando']];
function pintaAtu() {
  var a = (estado && estado.atu) || {};
  $('atu').innerHTML = ORB.map(function (o) { var v = a[o[0]] || ''; return '<div class="ob' + (v ? ' cheio' : '') + '"><span>' + o[1] + '</span><b>' + (v ? esc(v) : '—') + '</b></div>'; }).join('');
}
/* últimas capturas do Quadro */
function pintaCaps() {
  var L = naFila('captura').map(function (e) { return { t: e.dados.t, d: e.dados.dia, nova: 1 }; }).reverse()
    .concat(((estado && estado.cap) || []).slice(0, 6));
  $('caps').innerHTML = L.slice(0, 5).map(function (c) { return '<li' + (c.nova ? ' class="nova"' : '') + '><span>' + esc(c.t) + '</span><small>' + esc(c.d === hojeStr() ? 'hoje' : (c.d || '')) + '</small></li>'; }).join('') || '<li class="vazio">Nada pregado ainda.</li>';
}
/* verso do cartão-postal: contas do dia */
function pintaVerso() {
  var s = sessoesHoje(), min = s.reduce(function (a, x) { return a + x.min; }, 0), dr = dracmas();
  $('pv-t').textContent = s.length + (s.length === 1 ? ' bloco' : ' blocos') + ' · ' + min + ' min · ' + dr + ' ' + (dr === 1 ? T.moeda1 : T.moeda.toLowerCase()) + ' hoje';
}
/* mensagens de bordo: o que o segundo plano avisou */
async function pintaMsgs() {
  var L = (await chrome.storage.local.get('msgs')).msgs || [], n = L.filter(function (m) { return !m.lido; }).length;
  $('m-n').hidden = !n; $('m-n').textContent = n;
  $('msgs-de').textContent = T.mensageiro + ' · ' + T.guardiao.nome;
  $('msgs-ct').textContent = n + (n === 1 ? ' não lida' : ' não lidas');
  $('msgs-l').innerHTML = L.slice(0, 30).map(function (m) {
    return '<li class="' + (m.lido ? 'lido' : '') + '"><img src="' + esc(T.guardiao.img) + '" alt=""><div><b>' + esc(m.tit) + '</b><p>' + esc(m.txt) + '</p><small>' + esc(m.h) + '</small></div></li>';
  }).join('') || '<li class="vazio">Nenhuma mensagem ainda. Os avisos das faixas e do foco aparecem aqui.</li>';
}
function mostraFace(f) {
  document.querySelectorAll('#faces [data-face]').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.face === f)); });
  document.querySelectorAll('.aba').forEach(function (a) { a.classList.toggle('on', a.dataset.face === f); });
}

/* guardião: uma fala de acordo com o dia */
function pintaGuardiao() {
  var g = T.guardiao, f = T.falas, h = new Date().getHours(), n = sessoesHoje().length, a = aguaHoje(), fala, px = proximoPasso();
  if (FOCO_ATUAL && FOCO_ATUAL.descanso) fala = 'Pausa: levante, beba água, olhe para longe. O próximo bloco espera.';
  else if (px) fala = 'Próximo pedaço: ' + px.t + (px.min ? ' (' + px.min + ' min)' : '') + '. Só ele.';
  else if (h >= 21) fala = f.fim;
  else if (n > 0 && (h < 10 || a >= AGUA_META || n % 2)) fala = f.foco.replace('{n}', n).replace('{b}', n === 1 ? 'bloco' : 'blocos');
  else if (estado && h >= 10 && a < AGUA_META) fala = f.agua.replace('{n}', AGUA_META - a);
  else fala = f.ini[new Date().getDate() % f.ini.length];
  $('g-img').src = g.img; $('g-img').alt = 'Retrato de ' + g.nome;
  $('g-nome').textContent = g.completo; $('g-papel').textContent = g.papel; $('g-fala').textContent = fala;
}

/* aplica o refúgio escolhido: textos, cores, guardião */
function aplicaTema(k) {
  TEMA = TEMAS[k] ? k : 'greek'; T = temaDe(TEMA);
  document.body.dataset.tema = TEMA;
  try { pintaFrontao(TEMA, T.guardiao); } catch (e) { }
  document.title = 'Astronáutica · ' + T.rotulo;
  document.querySelectorAll('[data-tx]').forEach(function (el) { var v = T[el.dataset.tx]; if (v != null) el.textContent = v; });
  document.querySelectorAll('[data-tx-html]').forEach(function (el) { var v = T[el.dataset.txHtml]; if (v != null) el.innerHTML = v; });
  $('dracmas').title = T.moeda + ' de hoje: uma por bloco de foco, uma por meta de contador batida';
  $('tema').value = TEMA;
  if (!$('painel').hidden) pintaTudo(); else pintaGuardiao();
  try { pintaMsgs(); } catch (e) { }
}
function aplicaZoom(z) { ZOOM = z; document.documentElement.style.zoom = z; document.documentElement.style.setProperty('--z', z); }


/* contadores: a lista vive na extensão; a do app entra quando existir */
async function carregaContadores() {
  var g = await chrome.storage.local.get(['contadores', 'contRemovidos']);
  var lista = g.contadores || CONT_PADRAO.slice(), fora = g.contRemovidos || [];
  ((estado && estado.cont && estado.cont.def) || []).forEach(function (c) {
    if (fora.indexOf(c.id) < 0 && !lista.some(function (x) { return x.id === c.id; })) lista.push({ id: c.id, n: c.n, u: c.u || 'vezes', meta: +c.meta || 10 });
  });
  contDefs = lista.filter(function (c) { return fora.indexOf(c.id) < 0; });
  await chrome.storage.local.set({ contadores: contDefs });
}

async function carrega() {
  var s = await API.sessao();
  if (!s) { mostraLogin(); return; }
  $('login').hidden = true; $('painel').hidden = false; $('sair').hidden = false;
  if (CFG.app) { $('abrir').href = CFG.app; $('abrir').hidden = false; }
  var cache = (await chrome.storage.local.get('estado')).estado;
  if (cache) estado = cache.dados;
  await carregaContadores(); pintaTudo();
  try {
    var r = await Promise.all([API.estado(), API.fila()]);
    estado = r[0]; fila = r[1];
    await carregaContadores(); pintaTudo();
  } catch (e) { if (!cache) aviso('Sem conexão com a nuvem agora.', true); }
}

/* ---------- ações ---------- */
document.addEventListener('DOMContentLoaded', async function () {
  document.body.classList.add('modo-' + MODO);
  try { $('bm-v').textContent = 'v' + chrome.runtime.getManifest().version; } catch (e) { }
  var pref = await chrome.storage.local.get(['tema', 'zoom', 'clique', 'layout']);
  function aplicaLayout(v) {
    v = v === 'templo' ? 'templo' : 'compacto';
    document.body.classList.toggle('lay-compacto', v === 'compacto');
    document.body.classList.toggle('lay-templo', v === 'templo');
    $('layout').value = v; $('lay-t').textContent = v === 'compacto' ? 'templo' : 'painel';
    $('lay').title = v === 'compacto' ? 'Abrir o templo completo (com rolagem)' : 'Ver tudo numa tela só, sem rolagem';
    if (MODO === 'popup' && v === 'compacto' && ZOOM > 1.1) aplicaZoom(1.1);
  }
  aplicaLayout(pref.layout);
  $('cap').placeholder = 'captura · despeje antes de perder'; $('g-desc').placeholder = 'gasto · almoço, uber…';
  $('lay').onclick = function () { var v = document.body.classList.contains('lay-compacto') ? 'templo' : 'compacto'; aplicaLayout(v); chrome.storage.local.set({ layout: v }); };
  $('layout').onchange = function () { aplicaLayout(this.value); chrome.storage.local.set({ layout: this.value }); };
  aplicaTema(pref.tema || 'greek');
  aplicaZoom(+pref.zoom || 1);
  if (MODO === 'popup' && document.body.classList.contains('lay-compacto') && ZOOM > 1.1) aplicaZoom(1.1);
  $('clique').value = pref.clique || 'popup';
  if (MODO === 'lateral') { $('m-lateral').classList.add('atual'); $('m-lateral').title = 'Você está no painel lateral'; }
  if (MODO === 'janela') { $('m-janela').classList.add('atual'); $('m-janela').title = 'Você está na janela solta'; }

  /* tamanho */
  /* no popup o Chrome limita a 800×600: no painel numa tela só o tamanho para em 110% para nada ficar cortado */
  function zMax() { return MODO === 'popup' && document.body.classList.contains('lay-compacto') ? ZOOMS.indexOf(1.1) : ZOOMS.length - 1; }
  function passo(dir) {
    var i = ZOOMS.indexOf(ZOOM); if (i < 0) i = 2;
    if (dir > 0 && i >= zMax()) { aviso('No popup o painel vai até 110%. Para ampliar mais, abra a janela solta.'); return; }
    i = Math.max(0, Math.min(zMax(), i + dir));
    aplicaZoom(ZOOMS[i]); chrome.storage.local.set({ zoom: ZOOMS[i] });
  }
  $('z-menos').onclick = function () { passo(-1); };
  $('z-mais').onclick = function () { passo(1); };
  /* painel lateral: o Chrome só abre dentro do gesto do clique, então a janela do navegador é descoberta antes */
  var JAN_NORMAL = null;
  try { chrome.windows.getLastFocused({ windowTypes: ['normal'] }, function (w) { JAN_NORMAL = w ? w.id : null; }); } catch (e) { }
  $('m-lateral').onclick = function () {
    if (MODO === 'lateral') return;
    if (JAN_NORMAL == null || !chrome.sidePanel) { aviso('O painel lateral pede o Chrome 116 ou mais novo.', true); return; }
    chrome.sidePanel.open({ windowId: JAN_NORMAL }).then(function () {
      if (MODO === 'popup') window.close();
      else if (MODO === 'janela') chrome.windows.getCurrent(function (w) { chrome.windows.remove(w.id); });
    }, function () { aviso('Não deu para abrir o painel lateral nesta janela.', true); });
  };
  $('m-janela').onclick = function () {
    if (MODO === 'janela') return;
    chrome.runtime.sendMessage({ t: 'janela' }, function () { if (MODO === 'popup') window.close(); });
  };
  $('m-ajustes').onclick = function () {
    var a = $('ajustes'); a.hidden = !a.hidden; this.setAttribute('aria-expanded', String(!a.hidden));
  };
  $('tema').onchange = function () { aplicaTema(this.value); chrome.storage.local.set({ tema: TEMA }); };
  $('clique').onchange = function () {
    chrome.storage.local.set({ clique: this.value });
    chrome.runtime.sendMessage({ t: 'clique', v: this.value });
    aviso(this.value === 'popup' ? 'O ícone abre o popup.' : this.value === 'lateral' ? 'O ícone abre o painel lateral.' : 'O ícone abre a janela solta.');
  };
  chrome.storage.onChanged.addListener(function (m) { if (m.tema && m.tema.newValue && m.tema.newValue !== TEMA) aplicaTema(m.tema.newValue); if (m.msgs) pintaMsgs(); });

  /* faces do templo */
  var face = (await chrome.storage.local.get('face')).face || 'hoje';
  mostraFace(face);
  $('faces').onclick = function (e) { var b = e.target.closest('[data-face]'); if (!b) return; mostraFace(b.dataset.face); chrome.storage.local.set({ face: b.dataset.face }); };
  /* cartão-postal vira */
  $('postal').onclick = function () { this.classList.toggle('virado'); };
  $('postal').onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); } };
  /* faixa do Toque sobe e revela a linha de hoje */
  $('tq-leg').onclick = function () { var l = $('tq-dia'); l.hidden = !l.hidden; this.setAttribute('aria-expanded', String(!l.hidden)); this.querySelector('b').textContent = l.hidden ? 'hoje ▾' : 'hoje ▴'; };
  /* mensagens de bordo */
  pintaMsgs();
  $('m-msgs').onclick = async function () {
    var c = $('msgs'); c.hidden = !c.hidden; this.setAttribute('aria-expanded', String(!c.hidden));
    if (!c.hidden) pintaMsgs();
  };
  $('msgs-lidas').onclick = async function () {
    var L = (await chrome.storage.local.get('msgs')).msgs || [];
    L.forEach(function (m) { m.lido = true; }); await chrome.storage.local.set({ msgs: L }); pintaMsgs();
  };
  setInterval(function () { try { pintaToque(); pintaDia(); } catch (e) { } }, 30000);

  var d = new Date();
  $('data').textContent = DIAS[d.getDay()] + ' · ' + d.getDate() + ' ' + MESES[d.getMonth()];
  $('arco').style.strokeDasharray = CIRC;

  document.querySelectorAll('.abas button').forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll('.abas button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      document.querySelectorAll('.aba').forEach(function (a) { a.classList.toggle('on', a.id === b.dataset.aba); });
      chrome.storage.local.set({ aba: b.dataset.aba });
    };
  });

  $('entrar').onclick = async function () {
    var em = $('email').value.trim(), se = $('senha').value;
    if (!em || !se) { aviso('Informe e-mail e senha.', true); return; }
    $('entrar').disabled = true;
    try { await API.entra(em, se); chrome.runtime.sendMessage({ t: 'reagendar' }); await carrega(); }
    catch (e) { aviso(/Invalid login/.test(e.message) ? 'E-mail ou senha não conferem.' : e.message, true); }
    $('entrar').disabled = false;
  };
  $('senha').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('entrar').click(); });
  $('sair').onclick = async function () { await API.sai(); mostraLogin(); };

  /* foco */
  function inicia(min, extra) {
    var m = Object.assign({ t: 'focoIniciar', min: min, tarefa: $('tarefa').value.trim(), passo: $('passo').value.trim() }, extra || {});
    chrome.runtime.sendMessage(m, function () {
      pintaFoco();
      aviso(m.descanso ? 'Pausa iniciada. Levante e beba água.' : 'Bloco iniciado. O aviso chega no fim.');
    });
  }
  document.querySelectorAll('[data-min]').forEach(function (b) { b.onclick = function () { inicia(+b.dataset.min); }; });
  $('pausa5').onclick = function () { inicia(CF.curta, { descanso: true, tarefa: 'pausa' }); };

  /* sorteio: quando não se sabe por onde começar */
  $('sorteio').onclick = function () {
    var op = [], d = hojeStr(), p = estado && estado.plan && estado.plan[d];
    ((p && p.top) || []).forEach(function (t) { if (t && (t.t || '').trim() && !t.ok) op.push(t.t.trim()); });
    ((estado && estado.hab) || []).forEach(function (hb) { if ((hb.hist || []).indexOf(d) < 0) op.push(hb.nome); });
    var c = cicloAgora(); if (c) op.push(c.o[c.i].nome);
    var fx = faixaDe(), tb = (estado && estado.tb) || {}; if (fx && tb[d + '|' + fx]) op.push(tb[d + '|' + fx]);
    var px = proximoPasso(); if (px) op.push(px.t);
    if (!op.length) { aviso('Nada para sortear: defina missões ou hábitos no app.', true); return; }
    var x = op[Math.floor(Math.random() * op.length)];
    $('tarefa').value = x; $('g-fala').textContent = 'Sorteei: ' + x + '. Começa só pelo primeiro passo.';
    $('passo').focus(); aviso('Sorteado: ' + x); pintaPassos();
  };

  /* botões claros para mover: janela solta e painel lateral */
  $('b-soltar').onclick = function () { $('m-janela').click(); };
  $('b-lateral').onclick = function () { $('m-lateral').click(); };
  if (MODO === 'janela') $('b-soltar').hidden = true;
  if (MODO === 'lateral') $('b-lateral').hidden = true;
  /* focar direto num bloco do dia */
  $('dia').onclick = function (e) {
    var b = e.target.closest('[data-diaf]'); if (!b) return;
    var v = ((estado && estado.tb) || {})[hojeStr() + '|' + b.dataset.diaf] || '';
    $('tarefa').value = v; inicia(CF.foco);
  };

  /* passos da tarefa */
  var tTarefa = null;
  $('tarefa').addEventListener('input', function () { clearTimeout(tTarefa); tTarefa = setTimeout(function () { pintaPassos().then(pintaGuardiao); }, 400); });
  $('p-add').onclick = async function () {
    var t = $('p-novo').value.trim(), mi = parseInt($('p-min').value, 10) || 0; if (!t) return;
    var P = await lerPassos(); P.itens.push({ t: t, min: mi, ok: false }); await gravaPassos(P);
    $('p-novo').value = ''; $('p-min').value = ''; pintaPassos(); pintaGuardiao();
  };
  $('p-novo').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('p-add').click(); });
  $('passos').onclick = async function (e) {
    var b = e.target.closest('[data-pi]'); if (!b) return;
    var P = await lerPassos(), i = +b.dataset.pi, it = P.itens[i]; if (!it) return;
    if (b.dataset.a === 'ok') { it.ok = !it.ok; }
    else if (b.dataset.a === 'rm') { P.itens.splice(i, 1); }
    else if (b.dataset.a === 'focar') { $('passo').value = it.t; inicia(it.min || CF.foco, { passo: it.t }); }
    await gravaPassos(P); pintaPassos(); pintaGuardiao();
  };

  /* preferências de foco */
  function cfPinta() {
    $('c-foco').value = CF.foco; $('c-curta').value = CF.curta; $('c-longa').value = CF.longa; $('c-ciclo').value = CF.ciclo;
    $('c-auto').checked = !!CF.auto; $('c-som').value = CF.som; $('c-toque').value = String(CF.toque); $('c-insiste').value = String(CF.insiste); $('c-aviso5').checked = !!CF.aviso5;
    var b25 = document.querySelector('#parado [data-min]'); b25.dataset.min = CF.foco; b25.textContent = CF.foco + ' min';
    $('pausa5').textContent = 'pausa ' + CF.curta;
  }
  function cfLe() {
    function n(id, a, b, d) { var v = parseInt($(id).value, 10); return isNaN(v) ? d : Math.max(a, Math.min(b, v)); }
    CF = { foco: n('c-foco', 5, 120, 25), curta: n('c-curta', 1, 30, 5), longa: n('c-longa', 5, 60, 15), ciclo: n('c-ciclo', 2, 8, 4), auto: $('c-auto').checked,
      som: $('c-som').value, toque: +$('c-toque').value || 0, insiste: +$('c-insiste').value || 0, aviso5: $('c-aviso5').checked };
    chrome.storage.local.set({ cfgFoco: CF }); chrome.runtime.sendMessage({ t: 'reagendar' }); cfPinta(); pintaFoco();
  }
  CF = Object.assign({}, CF, (await chrome.storage.local.get('cfgFoco')).cfgFoco || {});
  cfPinta();
  document.querySelectorAll('.aj-foco input,.aj-foco select').forEach(function (x) { x.addEventListener('change', cfLe); });
  $('c-testar').onclick = function () { var v = $('c-som').value; if (v === 'nenhum') { aviso('Escolha um som primeiro.'); return; } chrome.runtime.sendMessage({ t: 'testeSom', tipo: v }); aviso('Tocando 4 segundos de ' + $('c-som').selectedOptions[0].text + '.'); };
  $('c-sino').onclick = function () { chrome.runtime.sendMessage({ t: 'testeSom', tipo: 'sino' }); };
  $('pp').onclick = function () { chrome.runtime.sendMessage({ t: 'focoPausa' }, function () { pintaFoco(); }); };
  $('enc').onclick = function () {
    chrome.runtime.sendMessage({ t: 'focoEncerrar' }, function (r) {
      $('tarefa').value = '';
      if (r && !r.descanso && r.min) {
        fila.push({ tipo: 'foco', dados: { dia: hojeStr(), min: r.min, tarefa: 'foco' } });
        aviso(r.min + ' min de foco enviados ao app' + (r.ciclo ? ', e o bloco do ciclo fechou.' : '.'));
      } else aviso(r && r.descanso ? 'Pausa encerrada.' : 'Encerrado.');
      API.fila().then(function (f) { fila = f; pintaTudo(); }, pintaTudo);
    });
  };
  chrome.storage.onChanged.addListener(function (mud) { if (mud.foco) { pintaFoco(); if (!mud.foco.newValue) API.fila().then(function (f) { fila = f; pintaTudo(); }, function () { }); } });

  /* ciclo */
  $('treinar').onclick = function () {
    var b = $('treinar'); if (!b.dataset.disc) return;
    $('tarefa').value = b.dataset.nome;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inicia(50, { disc: b.dataset.disc, tarefa: b.dataset.nome });
  };
  $('pular').onclick = function () {
    var c = cicloAgora(); if (!c) return;
    var cur = c.o[c.i];
    manda('ciclo', { acao: 'pular', disc: cur.id }, 'Bloco pulado. A ordem não espera.');
  };

  /* humor */
  $('humor').onclick = function (e) {
    var b = e.target.closest('[data-h]'); if (!b) return;
    var v = +b.dataset.h, x = HUM.filter(function (h) { return h[0] === v; })[0];
    manda('humor', { v: v }, 'Humor anotado: ' + x[1].toLowerCase() + '.');
  };
  $('hok').onclick = function () {
    var v = humorDe(hojeStr()), n = $('hnota').value.trim();
    if (!v) { aviso('Escolha como está antes.', true); return; }
    if (!n) return;
    manda('humor', { v: v, nota: n }, 'Nota anotada no registro do app.'); $('hnota').value = '';
  };
  $('hnota').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('hok').click(); });

  /* contadores */
  $('cont').onclick = async function (e) {
    var rm = e.target.closest('[data-rm]');
    if (rm) {
      var id = rm.dataset.rm, g = await chrome.storage.local.get('contRemovidos'), fora = g.contRemovidos || [];
      fora.push(id); contDefs = contDefs.filter(function (c) { return c.id !== id; });
      await chrome.storage.local.set({ contRemovidos: fora, contadores: contDefs });
      manda('contador', { id: id, acao: 'remover' }, 'Contador removido.');
      return;
    }
    var b = e.target.closest('[data-c]'); if (!b) return;
    var cid = b.dataset.c, dv = +b.dataset.d;
    if (cid === 'agua') {
      if (dv < 0 && !aguaHoje()) return;
      var antes = aguaHoje();
      manda('agua', dv < 0 ? { d: -1 } : {}, dv < 0 ? '−1 copo.' : (antes + 1 === AGUA_META ? 'Meta de água fechada: +1 ' + T.moeda1 + '.' : '+1 copo registrado.'));
      return;
    }
    var c = contDefs.filter(function (x) { return x.id === cid; })[0]; if (!c) return;
    var v0 = contValor(cid); if (dv < 0 && !v0) return;
    manda('contador', { id: c.id, n: c.n, u: c.u, meta: c.meta, d: dv },
      dv > 0 && v0 + 1 === c.meta ? c.n + ': meta do dia fechada, +1 ' + T.moeda1 + '.' : c.n + ': ' + (v0 + dv) + '.');
  };
  $('add').onclick = async function () {
    var n = $('novo').value.trim(), m = parseInt($('novoMeta').value, 10) || 10;
    if (!n) { aviso('Dê um nome ao contador.', true); return; }
    contDefs.push({ id: 'c' + Date.now().toString(36), n: n, u: 'vezes', meta: m });
    await chrome.storage.local.set({ contadores: contDefs });
    $('novo').value = ''; $('novoMeta').value = ''; pintaCont(); aviso('Contador criado.');
  };

  /* registro */
  $('cap-ok').onclick = function () {
    var t = $('cap').value.trim(); if (!t) return;
    manda('captura', { t: t }, 'Pregado no ' + T.quadro + '.'); $('cap').value = '';
  };
  $('cap').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('cap-ok').click(); });
  $('habitos').addEventListener('change', function (e) {
    var id = e.target.dataset.hab; if (!id || !e.target.checked) return;
    manda('habito', { id: id }, 'Treino marcado.');
  });
  $('top').addEventListener('change', function (e) {
    var i = e.target.dataset.pri; if (i == null) return;
    manda('prioridade', { i: +i, ok: e.target.checked }, e.target.checked ? 'Missão cumprida.' : 'Missão reaberta.');
  });
  $('g-ok').onclick = function () {
    var desc = $('g-desc').value.trim(), v = num($('g-val').value);
    if (!desc || !v) { aviso('Informe o gasto e o valor.', true); return; }
    manda('gasto', { descricao: desc, valor: v }, 'R$ ' + v.toFixed(2).replace('.', ',') + ' lançado: ' + T.loja + '.');
    $('g-desc').value = ''; $('g-val').value = '';
  };

  carrega();
});

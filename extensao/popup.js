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
  return s.concat(naFila('foco', true).map(function (e) { return { t: e.dados.tarefa || 'foco', min: +e.dados.min || 0 }; }));
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
  $('fstat').innerHTML = '<b>' + s.length + (s.length === 1 ? ' bloco' : ' blocos') + '</b> · <b>' + min + '</b> min hoje';
  if (!fo) { $('tempo').textContent = '25:00'; $('tlabel').textContent = 'pronto'; $('arco').style.strokeDashoffset = 0; return; }
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
    return '<button data-h="' + x[0] + '" aria-pressed="' + (v === x[0]) + '"><i style="background:' + x[2] + '"></i>' + x[1] + '</button>';
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
  ul.innerHTML = hs.map(function (h) {
    var feito = (h.hist || []).indexOf(d) >= 0 || marc.indexOf(h.id) >= 0;
    return '<li class="' + (feito ? 'ok' : '') + '"><label><input type="checkbox" data-hab="' + esc(h.id) + '"' + (feito ? ' checked disabled' : '') + '><span>' + esc(h.nome) + '</span></label></li>';
  }).join('');
}

function pintaTudo() {
  pintaCab(); pintaAgora(); pintaCiclo(); pintaHumor(); pintaCont(); pintaTop(); pintaHabitos(); pintaFoco(); pintaGuardiao();
  pintaToque(); pintaAtu(); pintaCaps(); pintaVerso();
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
  var g = T.guardiao, f = T.falas, h = new Date().getHours(), n = sessoesHoje().length, a = aguaHoje(), fala;
  if (h >= 21) fala = f.fim;
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
function aplicaZoom(z) { ZOOM = z; document.documentElement.style.zoom = z; }


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
  var pref = await chrome.storage.local.get(['tema', 'zoom', 'clique']);
  aplicaTema(pref.tema || 'greek');
  aplicaZoom(+pref.zoom || 1);
  $('clique').value = pref.clique || 'popup';
  if (MODO === 'lateral') { $('m-lateral').classList.add('atual'); $('m-lateral').title = 'Você está no painel lateral'; }
  if (MODO === 'janela') { $('m-janela').classList.add('atual'); $('m-janela').title = 'Você está na janela solta'; }

  /* tamanho */
  function passo(dir) {
    var i = ZOOMS.indexOf(ZOOM); if (i < 0) i = 2;
    i = Math.max(0, Math.min(ZOOMS.length - 1, i + dir));
    aplicaZoom(ZOOMS[i]); chrome.storage.local.set({ zoom: ZOOMS[i] });
  }
  $('z-menos').onclick = function () { passo(-1); };
  $('z-mais').onclick = function () { passo(1); };
  /* painel lateral: precisa do gesto do clique, por isso abre daqui mesmo */
  $('m-lateral').onclick = async function () {
    if (MODO === 'lateral') return;
    try {
      var w = await chrome.windows.getCurrent();
      await chrome.sidePanel.open({ windowId: w.id });
      if (MODO === 'popup') window.close();
      else if (MODO === 'janela') chrome.windows.remove(w.id);
    } catch (e) { aviso('O painel lateral pede o Chrome 116 ou mais novo.', true); }
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
  setInterval(function () { try { pintaToque(); } catch (e) { } }, 30000);

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
    var m = Object.assign({ t: 'focoIniciar', min: min, tarefa: $('tarefa').value.trim() }, extra || {});
    chrome.runtime.sendMessage(m, function () {
      pintaFoco();
      aviso(m.descanso ? 'Pausa iniciada. Levante e beba água.' : 'Bloco iniciado. O aviso chega no fim.');
    });
  }
  document.querySelectorAll('[data-min]').forEach(function (b) { b.onclick = function () { inicia(+b.dataset.min); }; });
  $('pausa5').onclick = function () { inicia(5, { descanso: true, tarefa: 'pausa' }); };
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

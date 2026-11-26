/* Astronáutica · janela da extensão */
var $ = function (id) { return document.getElementById(id); };
var DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
var estado = null, relogio = null;

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function aviso(t, erro) { var m = $('msg'); m.textContent = t; m.className = erro ? 'erro' : ''; clearTimeout(aviso.t); aviso.t = setTimeout(function () { m.textContent = ''; }, 3500); }
function num(v) { v = String(v || '').replace(/[^\d,.-]/g, ''); if (v.indexOf(',') >= 0) v = v.replace(/\./g, '').replace(',', '.'); return +v || 0; }

/* envia o evento; sem rede, deixa guardado para o segundo plano mandar depois */
async function manda(tipo, dados, ok) {
  try { await API.evento(tipo, dados); aviso(ok); }
  catch (e) {
    if (/Entre na sua conta/.test(e.message)) { mostraLogin(); return; }
    chrome.runtime.sendMessage({ t: 'pendente', tipo: tipo, dados: dados });
    aviso('Sem conexão: guardado, sai assim que a rede voltar.');
  }
}

function mostraLogin() { $('login').hidden = false; $('painel').hidden = true; $('sair').hidden = true; }

function pintaAgora() {
  var f = faixaDe(), tb = (estado && estado.tb) || {}, d = hojeStr(), el = $('agora');
  if (!f) { el.className = 'agora'; el.innerHTML = '<small>fora das faixas</small><b>Ciclo em repouso</b><span>A próxima faixa começa às 06h.</span>'; return; }
  var i = FAIXAS.indexOf(f), prox = FAIXAS[i + 1], txt = tb[d + '|' + f], txp = prox ? tb[d + '|' + prox] : '';
  el.className = 'agora f' + f;
  el.innerHTML = '<small>agora · ' + f + 'h às ' + String((+f + 3) % 24).padStart(2, '0') + 'h</small><b>' + (txt ? esc(txt) : 'Nada marcado na grade') + '</b>' +
    (prox ? '<span>depois, às ' + prox + 'h: ' + (txp ? esc(txp) : 'livre') + '</span>' : '');
}

function pintaTop() {
  var p = estado && estado.plan && estado.plan[hojeStr()], top = (p && p.top) || [], ol = $('top');
  var com = top.filter(function (t) { return t && (t.t || '').trim(); });
  if (!com.length) { ol.innerHTML = '<li class="vazio">Defina as três prioridades no Convés do app.</li>'; return; }
  ol.innerHTML = top.map(function (t, i) {
    if (!t || !(t.t || '').trim()) return '';
    return '<li class="' + (t.ok ? 'ok' : '') + '"><label><input type="checkbox" data-pri="' + i + '"' + (t.ok ? ' checked' : '') + '><span>' + esc(t.t) + '</span></label></li>';
  }).join('');
}

function pintaHabitos() {
  var hs = (estado && estado.hab) || [], d = hojeStr(), ul = $('habitos');
  if (!hs.length) { ul.innerHTML = '<li class="vazio">Nenhum hábito cadastrado no app.</li>'; }
  else ul.innerHTML = hs.map(function (h) {
    var feito = (h.hist || []).indexOf(d) >= 0;
    return '<li class="' + (feito ? 'ok' : '') + '"><label><input type="checkbox" data-hab="' + esc(h.id) + '"' + (feito ? ' checked disabled' : '') + '><span>' + esc(h.nome) + '</span></label></li>';
  }).join('');
  var a = estado && estado.agua ? (+estado.agua[d] || 0) : 0;
  $('agua-n').textContent = '(' + a + ')';
}

async function pintaFoco() {
  var fo = (await chrome.storage.local.get('foco')).foco;
  $('foco-parado').hidden = !!fo; $('foco-rodando').hidden = !fo;
  clearInterval(relogio);
  if (!fo) return;
  $('foco-nome').textContent = fo.tarefa || 'foco';
  var tick = function () {
    var s = Math.max(0, Math.round((fo.fim - Date.now()) / 1000));
    $('foco-resta').textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    if (!s) { clearInterval(relogio); pintaFoco(); }
  };
  tick(); relogio = setInterval(tick, 1000);
}

async function carrega() {
  var s = await API.sessao();
  if (!s) { mostraLogin(); return; }
  $('login').hidden = true; $('painel').hidden = false; $('sair').hidden = false;
  if (CFG.app) { $('abrir').href = CFG.app; $('abrir').hidden = false; }
  var cache = (await chrome.storage.local.get('estado')).estado;
  if (cache) { estado = cache.dados; pintaAgora(); pintaTop(); pintaHabitos(); }
  pintaFoco();
  try { estado = await API.estado(); pintaAgora(); pintaTop(); pintaHabitos(); }
  catch (e) { if (!cache) aviso('Sem conexão com a nuvem agora.', true); }
}

document.addEventListener('DOMContentLoaded', function () {
  var d = new Date();
  $('data').textContent = DIAS[d.getDay()] + ', ' + d.getDate() + ' ' + MESES[d.getMonth()];

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

  document.querySelectorAll('[data-min]').forEach(function (b) {
    b.onclick = function () {
      chrome.runtime.sendMessage({ t: 'focoIniciar', min: +b.dataset.min, tarefa: $('foco-tarefa').value.trim() }, function () { pintaFoco(); aviso('Foco iniciado. O aviso chega no fim.'); });
    };
  });
  $('foco-parar').onclick = function () {
    chrome.runtime.sendMessage({ t: 'focoEncerrar' }, function (r) { pintaFoco(); if (r && r.min) aviso(r.min + ' min de foco enviados ao app.'); });
  };

  $('cap-ok').onclick = function () {
    var t = $('cap').value.trim(); if (!t) return;
    manda('captura', { t: t }, 'Guardado no Cérebro.'); $('cap').value = '';
  };
  $('cap').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('cap-ok').click(); });

  $('agua').onclick = function () {
    manda('agua', {}, '+1 copo registrado.');
    var d = hojeStr(); estado = estado || {}; estado.agua = estado.agua || {}; estado.agua[d] = (+estado.agua[d] || 0) + 1; pintaHabitos();
  };

  $('habitos').addEventListener('change', function (e) {
    var id = e.target.dataset.hab; if (!id || !e.target.checked) return;
    e.target.disabled = true; e.target.closest('li').className = 'ok';
    manda('habito', { id: id }, 'Hábito marcado.');
  });
  $('top').addEventListener('change', function (e) {
    var i = e.target.dataset.pri; if (i == null) return;
    e.target.closest('li').className = e.target.checked ? 'ok' : '';
    manda('prioridade', { i: +i, ok: e.target.checked }, e.target.checked ? 'Prioridade concluída.' : 'Prioridade reaberta.');
  });

  $('g-ok').onclick = function () {
    var desc = $('g-desc').value.trim(), v = num($('g-val').value);
    if (!desc || !v) { aviso('Informe o gasto e o valor.', true); return; }
    manda('gasto', { descricao: desc, valor: v }, 'Gasto de R$ ' + v.toFixed(2).replace('.', ',') + ' enviado ao Tesouro.');
    $('g-desc').value = ''; $('g-val').value = '';
  };

  carrega();
});

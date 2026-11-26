/* Astronáutica · segundo plano: aviso de cada faixa do dia e timer de foco. */
importScripts('api.js');

function proximaFaixa(agora) {
  agora = agora || new Date();
  for (var i = 0; i < FAIXAS.length; i++) {
    var d = new Date(agora); d.setHours(+FAIXAS[i], 0, 0, 0);
    if (d > agora) return d;
  }
  var a = new Date(agora); a.setDate(a.getDate() + 1); a.setHours(+FAIXAS[0], 0, 0, 0); return a;
}
function agendaFaixa() { chrome.alarms.create('faixa', { when: proximaFaixa().getTime() }); }

function avisa(id, titulo, texto) {
  chrome.notifications.create(id + '-' + Date.now(), { type: 'basic', iconUrl: 'icones/icone-128.png', title: titulo, message: texto, priority: 1 });
}

async function avisaFaixa() {
  var f = faixaDe(); if (!f) return;
  var e = null;
  try { e = await API.estado(); } catch (err) { e = ((await chrome.storage.local.get('estado')).estado || {}).dados || null; }
  var txt = e && e.tb ? e.tb[hojeStr() + '|' + f] : '';
  var fim = String((+f + 3) % 24).padStart(2, '0');
  avisa('faixa', 'Faixa das ' + f + 'h às ' + fim + 'h', txt ? txt : 'Nada marcado na grade para esta faixa.');
}

async function badge() {
  var fo = (await chrome.storage.local.get('foco')).foco;
  if (!fo) { chrome.action.setBadgeText({ text: '' }); return; }
  var resta = Math.max(0, Math.ceil((fo.fim - Date.now()) / 60000));
  chrome.action.setBadgeBackgroundColor({ color: '#d9822b' });
  chrome.action.setBadgeText({ text: String(resta) });
}

async function focoIniciar(min, tarefa) {
  var agora = Date.now();
  await chrome.storage.local.set({ foco: { inicio: agora, fim: agora + min * 60000, min: min, tarefa: tarefa || '' } });
  chrome.alarms.create('foco-fim', { when: agora + min * 60000 });
  chrome.alarms.create('tick', { periodInMinutes: 1 });
  badge();
}
async function focoEncerrar(concluido) {
  var fo = (await chrome.storage.local.get('foco')).foco;
  if (!fo) return { ok: false };
  var feitos = Math.round((Math.min(Date.now(), fo.fim) - fo.inicio) / 60000);
  await chrome.storage.local.remove('foco');
  chrome.alarms.clear('foco-fim'); chrome.alarms.clear('tick'); badge();
  if (feitos >= 1) {
    try { await API.evento('foco', { min: feitos, tarefa: fo.tarefa || 'foco pela extensão' }); }
    catch (e) { await guardaPendente('foco', { min: feitos, tarefa: fo.tarefa || 'foco pela extensão' }); }
  }
  if (concluido) avisa('foco', 'Bloco de foco concluído', feitos + ' min registrados. Levante, beba água e escolha o próximo passo.');
  return { ok: true, min: feitos };
}

/* eventos que falharam (sem rede) ficam guardados e saem na próxima chance */
async function guardaPendente(tipo, dados) {
  var p = (await chrome.storage.local.get('pendentes')).pendentes || [];
  p.push({ tipo: tipo, dados: Object.assign({ dia: hojeStr() }, dados) });
  await chrome.storage.local.set({ pendentes: p.slice(-200) });
}
async function enviaPendentes() {
  var p = (await chrome.storage.local.get('pendentes')).pendentes || [];
  if (!p.length) return;
  var resto = [];
  for (var i = 0; i < p.length; i++) {
    try { await API.evento(p[i].tipo, p[i].dados); } catch (e) { resto.push(p[i]); }
  }
  await chrome.storage.local.set({ pendentes: resto });
}

chrome.runtime.onInstalled.addListener(function () { agendaFaixa(); chrome.alarms.create('pendentes', { periodInMinutes: 5 }); });
chrome.runtime.onStartup.addListener(function () { agendaFaixa(); chrome.alarms.create('pendentes', { periodInMinutes: 5 }); badge(); });

chrome.alarms.onAlarm.addListener(function (a) {
  if (a.name === 'faixa') { avisaFaixa(); agendaFaixa(); }
  else if (a.name === 'foco-fim') { focoEncerrar(true); }
  else if (a.name === 'tick') { badge(); }
  else if (a.name === 'pendentes') { enviaPendentes(); }
});

chrome.runtime.onMessage.addListener(function (msg, _de, responde) {
  if (msg.t === 'focoIniciar') { focoIniciar(msg.min, msg.tarefa).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'focoEncerrar') { focoEncerrar(false).then(responde); return true; }
  if (msg.t === 'pendente') { guardaPendente(msg.tipo, msg.dados).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'reagendar') { agendaFaixa(); responde({ ok: true }); }
});

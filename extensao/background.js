/* Acampamento Meio-Sangue · segundo plano: aviso de cada faixa do dia, timer de foco e pausa. */
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

/* Estado do foco: tot = duração total, acum = tempo já corrido antes do trecho atual,
   ini = início do trecho atual (null quando pausado). */
async function lerFoco() {
  var fo = (await chrome.storage.local.get('foco')).foco;
  if (fo && fo.tot == null && fo.fim) fo = { tot: fo.min * 60000, acum: 0, ini: fo.inicio, min: fo.min, tarefa: fo.tarefa || '' };
  return fo || null;
}
function restaMs(fo, agora) { return Math.max(0, fo.tot - fo.acum - (fo.ini ? (agora || Date.now()) - fo.ini : 0)); }

async function badge() {
  var fo = await lerFoco();
  if (!fo) { chrome.action.setBadgeText({ text: '' }); return; }
  chrome.action.setBadgeBackgroundColor({ color: fo.descanso ? '#1d3c6b' : '#b98c47' });
  chrome.action.setBadgeText({ text: fo.ini ? String(Math.ceil(restaMs(fo) / 60000)) : 'II' });
}

async function envia(tipo, dados) {
  try { await API.evento(tipo, dados); } catch (e) { await guardaPendente(tipo, dados); }
}

async function focoIniciar(m) {
  var agora = Date.now(), min = +m.min || 25;
  var fo = { tot: min * 60000, acum: 0, ini: agora, min: min, tarefa: m.tarefa || '', descanso: !!m.descanso, disc: m.disc || null };
  await chrome.storage.local.set({ foco: fo });
  chrome.alarms.create('foco-fim', { when: agora + fo.tot });
  chrome.alarms.create('tick', { periodInMinutes: 1 });
  badge();
}
async function focoPausa() {
  var fo = await lerFoco(); if (!fo) return { ok: false };
  var agora = Date.now();
  if (fo.ini) { fo.acum += agora - fo.ini; fo.ini = null; chrome.alarms.clear('foco-fim'); }
  else { fo.ini = agora; chrome.alarms.create('foco-fim', { when: agora + restaMs(fo, agora) }); }
  await chrome.storage.local.set({ foco: fo });
  badge();
  return { ok: true, pausado: !fo.ini };
}
async function focoEncerrar(concluido) {
  var fo = await lerFoco();
  if (!fo) return { ok: false };
  var feitos = Math.round((concluido ? fo.tot : fo.tot - restaMs(fo)) / 60000);
  await chrome.storage.local.remove('foco');
  chrome.alarms.clear('foco-fim'); chrome.alarms.clear('tick'); badge();
  if (!fo.descanso && feitos >= 1) {
    var tarefa = fo.tarefa || 'foco pela extensão';
    await envia('foco', { min: feitos, tarefa: tarefa });
    /* bloco do ciclo só fecha com pelo menos 5 min de estudo */
    if (fo.disc && feitos >= 5) await envia('ciclo', { acao: 'fechar', disc: fo.disc, min: feitos });
  }
  if (concluido) {
    if (fo.descanso) avisa('foco', 'Pausa encerrada', 'Hora de voltar para a Arena.');
    else avisa('foco', 'Bloco concluído', feitos + ' min registrados. Levante, beba água e escolha o próximo passo.');
  }
  return { ok: true, min: feitos, descanso: !!fo.descanso, ciclo: !!(fo.disc && feitos >= 5) };
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
  if (msg.t === 'focoIniciar') { focoIniciar(msg).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'focoPausa') { focoPausa().then(responde); return true; }
  if (msg.t === 'focoEncerrar') { focoEncerrar(false).then(responde); return true; }
  if (msg.t === 'pendente') { guardaPendente(msg.tipo, msg.dados).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'reagendar') { agendaFaixa(); responde({ ok: true }); }
});

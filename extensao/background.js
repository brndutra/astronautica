/* Astronáutica · segundo plano.
   Avisos de cada faixa (e 5 min antes), ciclo de foco com pausa curta e longa, avisos que insistem
   com botões (Feito / Adiar), som ambiente e toques suaves durante o foco, e o modo de abrir
   (popup, painel lateral ou janela solta). */
importScripts('api.js', 'temas.js');

async function tema() { return temaDe((await chrome.storage.local.get('tema')).tema); }
var CFG_FOCO = { foco: 25, curta: 5, longa: 15, ciclo: 4, auto: true, som: 'nenhum', toque: 0, insiste: 10, aviso5: true };
async function cfg() { return Object.assign({}, CFG_FOCO, (await chrome.storage.local.get('cfgFoco')).cfgFoco || {}); }
var PAUSA_ATIVA = ['Levante, alongue o pescoço e os ombros.', 'Beba um copo de água.', 'Olhe para longe por 20 segundos.', 'Dê uma volta curta e respire fundo três vezes.', 'Solte as mãos: abra e feche os punhos dez vezes.', 'Guarde o celular longe da mesa.'];
function hhmm(d) { return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }

/* ---------- faixas ---------- */
function proximaFaixa(agora) {
  agora = agora || new Date();
  for (var i = 0; i < FAIXAS.length; i++) {
    var d = new Date(agora); d.setHours(+FAIXAS[i], 0, 0, 0);
    if (d > agora) return d;
  }
  var a = new Date(agora); a.setDate(a.getDate() + 1); a.setHours(+FAIXAS[0], 0, 0, 0); return a;
}
async function agendaFaixa() {
  var p = proximaFaixa(), c = await cfg();
  chrome.alarms.create('faixa', { when: p.getTime() });
  var pre = p.getTime() - 5 * 60000;
  if (c.aviso5 && pre > Date.now()) chrome.alarms.create('pre-faixa', { when: pre }); else chrome.alarms.clear('pre-faixa');
}
async function textoFaixa(f) {
  var e = null;
  try { e = await API.estado(); } catch (err) { e = ((await chrome.storage.local.get('estado')).estado || {}).dados || null; }
  return e && e.tb ? (e.tb[hojeStr() + '|' + f] || '') : '';
}
function nomeToque(T) { return 'Toque ' + (T.toque === 'Concha' ? 'da ' : 'do ') + T.toque; }

/* ---------- avisos: guardião, histórico, botões e insistência ---------- */
async function avisa(tipo, titulo, texto, o) {
  o = o || {};
  var T = await tema(), id = tipo + '-' + Date.now();
  var n = { type: 'basic', iconUrl: T.guardiao.img, title: T.guardiao.nome + ' · ' + titulo, message: texto, contextMessage: T.rotulo, priority: o.botoes ? 2 : 1 };
  if (o.botoes) { n.buttons = o.botoes.map(function (b) { return { title: b[0] }; }); n.requireInteraction = true; }
  chrome.notifications.create(id, n);
  var d = new Date(), L = (await chrome.storage.local.get('msgs')).msgs || [];
  L.unshift({ tit: titulo, txt: texto, h: hhmm(d) + ' · ' + d.getDate() + '/' + (d.getMonth() + 1), lido: false });
  var g = { msgs: L.slice(0, 40) };
  if (o.botoes) {
    var P = (await chrome.storage.local.get('pend')).pend || {};
    P[id] = { tipo: tipo, titulo: titulo, texto: texto, acoes: o.botoes.map(function (b) { return b[1]; }), dados: o.dados || {}, vezes: o.vezes || 0, botoes: o.botoes };
    Object.keys(P).slice(0, -12).forEach(function (k) { delete P[k]; });
    g.pend = P;
    var c = await cfg();
    if (o.insiste !== false && c.insiste > 0 && (o.vezes || 0) < 3) chrome.alarms.create('insiste|' + id, { delayInMinutes: c.insiste });
  }
  await chrome.storage.local.set(g);
  return id;
}
async function resolve(id) {
  var P = (await chrome.storage.local.get('pend')).pend || {}, x = P[id];
  if (x) { delete P[id]; await chrome.storage.local.set({ pend: P }); }
  chrome.alarms.clear('insiste|' + id); chrome.notifications.clear(id);
  return x;
}
async function insiste(id) {
  var P = (await chrome.storage.local.get('pend')).pend || {}, x = P[id];
  if (!x) return;
  delete P[id]; await chrome.storage.local.set({ pend: P }); chrome.notifications.clear(id);
  avisa(x.tipo, x.titulo, 'Ainda esperando: ' + x.texto, { botoes: x.botoes, dados: x.dados, vezes: (x.vezes || 0) + 1 });
}
/* o que cada botão faz */
async function age(acao, dados) {
  var c = await cfg();
  if (acao === 'focar') return focoIniciar({ min: c.foco, tarefa: dados.tarefa || '' });
  if (acao === 'adiarFaixa') return chrome.alarms.create('faixa-adiada|' + (dados.f || ''), { delayInMinutes: 10 });
  if (acao === 'pausaCurta') return focoIniciar({ min: c.curta, descanso: true, tarefa: 'pausa' });
  if (acao === 'pausaLonga') return focoIniciar({ min: c.longa, descanso: true, tarefa: 'pausa' });
  if (acao === 'maisPausa') return focoIniciar({ min: 5, descanso: true, tarefa: 'pausa' });
  if (acao === 'pularPausa') { await focoEncerrar(false, true); return focoIniciar({ min: c.foco, tarefa: dados.tarefa || '' }); }
  if (acao === 'encerrarDia') return focoEncerrar(false, true);
  if (acao === 'visto') return;
}
chrome.notifications.onButtonClicked.addListener(async function (id, i) {
  var x = await resolve(id); if (!x) return;
  await age(x.acoes[i], x.dados || {});
});
chrome.notifications.onClosed.addListener(async function (id, peloUsuario) {
  if (peloUsuario) { var P = (await chrome.storage.local.get('pend')).pend || {}; if (P[id]) resolve(id); }
});
chrome.notifications.onClicked.addListener(function (id) { resolve(id); });

async function avisaFaixa(adiada) {
  var f = adiada || faixaDe(); if (!f) return;
  var txt = await textoFaixa(f), T = await tema(), nm = T.fx[f] || '';
  var fim = String((+f + 3) % 24).padStart(2, '0');
  avisa('faixa', nomeToque(T) + ' · ' + (nm ? nm + ', ' : '') + f + 'h às ' + fim + 'h', txt ? txt : 'Nada marcado na grade para esta faixa.',
    { botoes: [['Começar o foco', 'focar'], ['Adiar 10 min', 'adiarFaixa']], dados: { tarefa: txt || nm, f: f } });
}
async function avisaPreFaixa() {
  var p = proximaFaixa(), f = String(p.getHours()).padStart(2, '0'), T = await tema(), txt = await textoFaixa(f);
  avisa('pre', 'Em 5 min · ' + (T.fx[f] || f + 'h'), (txt ? txt + '. ' : '') + 'Feche o que está fazendo com calma.', {});
}

/* ---------- foco: tot = duração total, acum = tempo já corrido, ini = início do trecho atual (null = pausado) ---------- */
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
/* blocos de hoje no ciclo (para a pausa longa) */
async function pomo(soma) {
  var p = (await chrome.storage.local.get('pomo')).pomo || {};
  if (p.dia !== hojeStr()) p = { dia: hojeStr(), n: 0 };
  if (soma) { p.n++; await chrome.storage.local.set({ pomo: p }); }
  return p.n;
}

/* ---------- um cronômetro só com o app ----------
   O foco do app (dados.td.foco: id, ini, dur, pausa = ms restantes quando pausado) manda: se o app tem um bloco,
   a extensão mostra e avisa o mesmo bloco. Foco começado, pausado, retomado ou encerrado aqui vira evento focoApp
   na fila; o app aplica no próprio cronômetro e registra os minutos uma vez só. Pausas de descanso ficam só aqui.
   mudouEm: hora da última ação feita aqui; enquanto a nuvem for mais velha que ela, vale o que está aqui. */
async function espelhaApp(af, ts) {
  var fo = await lerFoco(), agora = Date.now(), fim = (await chrome.storage.local.get('focoFim')).focoFim || {};
  if (fo && fo.mudouEm && ts && ts < fo.mudouEm) return;
  if (af && af.dur) {
    var id = af.id || af.ini, pausado = af.pausa != null, resta = pausado ? af.pausa : af.ini + af.dur - agora;
    if (fim.id === id && ts < fim.em + 1) return;
    if (!pausado && resta <= 0) return;
    var meu = fo && fo.id === id;
    if (meu && !!fo.ini === !pausado && Math.abs(restaMs(fo, agora) - resta) < 3000) { if (!fo.visto) { fo.visto = true; await chrome.storage.local.set({ foco: fo }); } return; }
    var novo = { id: id, org: meu ? fo.org : 'app', visto: true, tot: af.dur, acum: pausado ? af.dur - af.pausa : 0, ini: pausado ? null : af.ini,
      min: af.base || Math.round(af.dur / 60000), tarefa: (meu && fo.tarefa) || af.rot || 'foco', passo: (meu && fo.passo) || '', disc: (meu && fo.disc) || null, descanso: !!af.pausaModo };
    await chrome.storage.local.set({ foco: novo });
    chrome.alarms.clear('toque-int');
    if (pausado) { chrome.alarms.clear('foco-fim'); som({ t: 'parar' }); }
    else { chrome.alarms.create('foco-fim', { when: agora + resta }); chrome.alarms.create('tick', { periodInMinutes: 1 }); }
    badge(); return;
  }
  /* o app não tem bloco: se o daqui veio do app ou o app já o tinha visto, foi encerrado lá */
  if (fo && (fo.org === 'app' || fo.visto)) {
    await chrome.storage.local.remove('foco');
    chrome.alarms.clear('foco-fim'); chrome.alarms.clear('tick'); chrome.alarms.clear('toque-int'); som({ t: 'parar' }); badge();
  }
}
async function espelhoAgora() { try { await API.estado(); } catch (e) { } }

async function focoIniciar(m) {
  var agora = Date.now(), min = +m.min || 25, c = await cfg();
  var fo = { tot: min * 60000, acum: 0, ini: agora, min: min, tarefa: m.tarefa || '', passo: m.passo || '', descanso: !!m.descanso, disc: m.disc || null };
  if (!fo.descanso) { fo.id = agora; fo.org = 'ext'; fo.mudouEm = agora; }
  await chrome.storage.local.set({ foco: fo });
  if (!fo.descanso) envia('focoApp', { acao: 'ini', id: fo.id, ini: agora, min: min, rot: fo.tarefa || 'foco pela extensão' });
  chrome.alarms.create('foco-fim', { when: agora + fo.tot });
  chrome.alarms.create('tick', { periodInMinutes: 1 });
  chrome.alarms.clear('toque-int');
  if (!fo.descanso) {
    if (c.som && c.som !== 'nenhum') som({ t: 'som', tipo: c.som });
    if (+c.toque > 0) chrome.alarms.create('toque-int', { periodInMinutes: +c.toque });
  } else som({ t: 'parar' });
  badge();
}
async function focoPausa() {
  var fo = await lerFoco(); if (!fo) return { ok: false };
  var agora = Date.now(), c = await cfg();
  if (fo.ini) { fo.acum += agora - fo.ini; fo.ini = null; chrome.alarms.clear('foco-fim'); chrome.alarms.clear('toque-int'); som({ t: 'parar' }); }
  else {
    fo.ini = agora; chrome.alarms.create('foco-fim', { when: agora + restaMs(fo, agora) });
    if (!fo.descanso) { if (c.som && c.som !== 'nenhum') som({ t: 'som', tipo: c.som }); if (+c.toque > 0) chrome.alarms.create('toque-int', { periodInMinutes: +c.toque }); }
  }
  if (fo.id && !fo.descanso) { fo.mudouEm = agora; envia('focoApp', fo.ini ? { acao: 'segue', id: fo.id, fimEm: agora + restaMs(fo, agora) } : { acao: 'pausa', id: fo.id, resta: restaMs(fo, agora) }); }
  await chrome.storage.local.set({ foco: fo });
  badge();
  return { ok: true, pausado: !fo.ini };
}
async function focoEncerrar(concluido, quieto) {
  var fo = await lerFoco();
  if (!fo) return { ok: false };
  var feitos = Math.round((concluido ? fo.tot : fo.tot - restaMs(fo)) / 60000);
  await chrome.storage.local.remove('foco');
  chrome.alarms.clear('foco-fim'); chrome.alarms.clear('tick'); chrome.alarms.clear('toque-int'); som({ t: 'parar' }); badge();
  if (fo.id && !fo.descanso) {
    /* bloco ligado ao app: o app encerra o mesmo bloco e registra os minutos uma vez só */
    await chrome.storage.local.set({ focoFim: { id: fo.id, em: Date.now() } });
    await envia('focoApp', { acao: 'fim', id: fo.id, min: Math.max(0, feitos), rot: fo.tarefa || 'foco pela extensão' });
    if (fo.disc && feitos >= 5) await envia('ciclo', { acao: 'fechar', disc: fo.disc, min: feitos });
  } else if (!fo.descanso && feitos >= 1) {
    var tarefa = fo.tarefa || 'foco pela extensão';
    await envia('foco', { min: feitos, tarefa: tarefa });
    /* bloco do ciclo só fecha com pelo menos 5 min de estudo */
    if (fo.disc && feitos >= 5) await envia('ciclo', { acao: 'fechar', disc: fo.disc, min: feitos });
  }
  if (concluido && !quieto) {
    var c = await cfg(), T = await tema();
    if (fo.descanso) {
      som({ t: 'sino' });
      avisa('pausa-fim', 'Pausa encerrada', T.voltar, { botoes: [['Voltar ao foco · ' + c.foco + ' min', 'focar'], ['Mais 5 min de pausa', 'maisPausa']], dados: { tarefa: (await chrome.storage.local.get('ultTarefa')).ultTarefa || '' } });
    } else {
      var n = await pomo(true), longa = n % Math.max(1, c.ciclo) === 0, dica = PAUSA_ATIVA[n % PAUSA_ATIVA.length];
      await chrome.storage.local.set({ ultTarefa: fo.tarefa || '' });
      som({ t: 'sino' });
      if (c.auto) {
        await focoIniciar({ min: longa ? c.longa : c.curta, descanso: true, tarefa: 'pausa' });
        avisa('foco-fim', 'Bloco ' + n + ' concluído · pausa ' + (longa ? 'longa' : 'curta') + ' de ' + (longa ? c.longa : c.curta) + ' min', feitos + ' min registrados. ' + dica,
          { botoes: [['Pular a pausa', 'pularPausa'], ['Encerrar por hoje', 'encerrarDia']], dados: { tarefa: fo.tarefa || '' }, insiste: false });
      } else {
        avisa('foco-fim', 'Bloco ' + n + ' concluído', feitos + ' min registrados. ' + dica,
          { botoes: [[(longa ? 'Pausa longa · ' + c.longa : 'Pausa · ' + c.curta) + ' min', longa ? 'pausaLonga' : 'pausaCurta'], ['Mais um bloco', 'focar']], dados: { tarefa: fo.tarefa || '' } });
      }
    }
  }
  return { ok: true, min: feitos, descanso: !!fo.descanso, ciclo: !!(fo.disc && feitos >= 5) };
}

/* ---------- som: um documento fora da tela toca o ambiente e os toques ---------- */
async function som(msg) {
  try {
    if (msg.t === 'parar') {
      var tem = chrome.offscreen && chrome.offscreen.hasDocument ? await chrome.offscreen.hasDocument() : false;
      if (!tem) return;
    } else if (chrome.offscreen) {
      var ja = chrome.offscreen.hasDocument ? await chrome.offscreen.hasDocument() : false;
      if (!ja) await chrome.offscreen.createDocument({ url: 'offscreen.html', reasons: ['AUDIO_PLAYBACK'], justification: 'Som ambiente e toques suaves durante o foco.' });
    } else return;
    chrome.runtime.sendMessage(Object.assign({ alvo: 'som' }, msg)).catch(function () { });
  } catch (e) { }
}

/* ---------- eventos que falharam (sem rede) ficam guardados e saem na próxima chance ---------- */
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

/* ---------- modos de abrir ---------- */
async function aplicaClique(v) {
  v = v || (await chrome.storage.local.get('clique')).clique || 'popup';
  await chrome.action.setPopup({ popup: v === 'popup' ? 'popup.html' : '' });
  try { await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: v === 'lateral' }); } catch (e) { }
}
/* janela solta: móvel e redimensionável; volta no último lugar e tamanho */
async function abreJanela() {
  var g = await chrome.storage.local.get(['janelaId', 'janelaPos']);
  if (g.janelaId) {
    try { await chrome.windows.update(g.janelaId, { focused: true, drawAttention: true }); return; } catch (e) { }
  }
  var p = g.janelaPos || { width: 420, height: 720 };
  var o = { url: 'popup.html?modo=janela', type: 'popup', width: Math.max(320, p.width | 0), height: Math.max(360, p.height | 0) };
  if (p.left != null) { o.left = p.left | 0; o.top = p.top | 0; }
  var w;
  try { w = await chrome.windows.create(o); } catch (e) { delete o.left; delete o.top; w = await chrome.windows.create(o); }
  await chrome.storage.local.set({ janelaId: w.id });
}
chrome.windows.onBoundsChanged.addListener(async function (w) {
  var g = await chrome.storage.local.get('janelaId');
  if (g.janelaId === w.id) chrome.storage.local.set({ janelaPos: { left: w.left, top: w.top, width: w.width, height: w.height } });
});
chrome.windows.onRemoved.addListener(async function (id) {
  var g = await chrome.storage.local.get('janelaId');
  if (g.janelaId === id) chrome.storage.local.remove('janelaId');
});
chrome.action.onClicked.addListener(async function (tab) {
  var v = (await chrome.storage.local.get('clique')).clique || 'popup';
  if (v === 'janela') abreJanela();
  else if (v === 'lateral') { try { await chrome.sidePanel.open({ windowId: tab.windowId }); } catch (e) { } }
});

chrome.runtime.onInstalled.addListener(function () { agendaFaixa(); chrome.alarms.create('pendentes', { periodInMinutes: 5 }); aplicaClique(); });
chrome.runtime.onStartup.addListener(function () { agendaFaixa(); chrome.alarms.create('pendentes', { periodInMinutes: 5 }); badge(); aplicaClique(); });

chrome.alarms.onAlarm.addListener(function (a) {
  if (a.name === 'faixa') { avisaFaixa(); agendaFaixa(); }
  else if (a.name === 'pre-faixa') { avisaPreFaixa(); }
  else if (a.name.indexOf('faixa-adiada|') === 0) { avisaFaixa(a.name.split('|')[1] || null); }
  else if (a.name.indexOf('insiste|') === 0) { insiste(a.name.slice(8)); }
  else if (a.name === 'foco-fim') { focoEncerrar(true); }
  else if (a.name === 'toque-int') { som({ t: 'sino', leve: true }); }
  else if (a.name === 'tick') { badge(); }
  else if (a.name === 'espelho') { espelhoAgora(); }
  else if (a.name === 'pendentes') { enviaPendentes(); }
});

chrome.runtime.onMessage.addListener(function (msg, _de, responde) {
  if (msg.alvo === 'som') return;
  if (msg.t === 'espelho') { espelhaApp(msg.fo, msg.ts).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'focoIniciar') { focoIniciar(msg).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'focoPausa') { focoPausa().then(responde); return true; }
  if (msg.t === 'focoEncerrar') { focoEncerrar(false).then(responde); return true; }
  if (msg.t === 'pendente') { guardaPendente(msg.tipo, msg.dados).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'reagendar') { agendaFaixa(); responde({ ok: true }); }
  if (msg.t === 'janela') { abreJanela().then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'clique') { aplicaClique(msg.v).then(function () { responde({ ok: true }); }); return true; }
  if (msg.t === 'testeSom') { som({ t: msg.tipo === 'sino' ? 'sino' : 'som', tipo: msg.tipo }); if (msg.tipo !== 'sino') setTimeout(function () { som({ t: 'parar' }); }, 4000); responde({ ok: true }); }
  if (msg.t === 'pomo') { pomo(false).then(function (n) { responde({ n: n }); }); return true; }
});

/* lê o foco do app a cada 30 s (e logo ao acordar) */
chrome.alarms.create('espelho', { periodInMinutes: 0.5 });
espelhoAgora();

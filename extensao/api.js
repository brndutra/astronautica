/* Astronáutica · acesso ao Supabase sem bibliotecas externas.
   A extensão só lê o estado e deposita eventos na fila vertice_inbox;
   quem aplica os eventos no registro é o app. */
var CFG = {
  url: 'https://gubpygurtxadsncthttg.supabase.co',
  chave: 'sb_publishable_O9whelpXkVZ8tvgD_8t2EA_LPaeDcmy',
  /* endereço do app publicado; vazio esconde o botão "abrir o app" */
  app: 'https://oargonauta.pro'
};
var FAIXAS = ['06', '09', '12', '15', '18', '21'];

function hojeStr(d) {
  d = d || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function faixaDe(d) {
  var h = (d || new Date()).getHours(), at = null;
  FAIXAS.forEach(function (f) { if (h >= +f && h < +f + 3) at = f; });
  return at;
}

var API = {
  async _auth(tipo, corpo) {
    var r = await fetch(CFG.url + '/auth/v1/token?grant_type=' + tipo, {
      method: 'POST', headers: { apikey: CFG.chave, 'Content-Type': 'application/json' }, body: JSON.stringify(corpo)
    });
    var j = await r.json().catch(function () { return {}; });
    if (!r.ok || !j.access_token) throw new Error(j.error_description || j.msg || 'Falha ao entrar.');
    var s = { access_token: j.access_token, refresh_token: j.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: { id: j.user.id, email: j.user.email } };
    await chrome.storage.local.set({ sessao: s });
    return s;
  },
  entra: function (email, senha) { return API._auth('password', { email: email, password: senha }); },
  async sessao() {
    var s = (await chrome.storage.local.get('sessao')).sessao;
    if (!s) return null;
    if (Date.now() / 1000 > s.expires_at - 60) {
      try { s = await API._auth('refresh_token', { refresh_token: s.refresh_token }); }
      catch (e) { await chrome.storage.local.remove('sessao'); return null; }
    }
    return s;
  },
  sai: function () { return chrome.storage.local.remove(['sessao', 'estado']); },
  async _rest(caminho, opcoes) {
    var s = await API.sessao();
    if (!s) throw new Error('Entre na sua conta.');
    opcoes = opcoes || {};
    opcoes.headers = Object.assign({ apikey: CFG.chave, Authorization: 'Bearer ' + s.access_token, 'Content-Type': 'application/json' }, opcoes.headers || {});
    var r = await fetch(CFG.url + '/rest/v1/' + caminho, opcoes);
    if (!r.ok) { var t = await r.text(); throw new Error('Servidor: ' + r.status + ' ' + t.slice(0, 120)); }
    return r.status === 204 || r.status === 201 ? null : r.json();
  },
  /* lê só o que a extensão mostra, sem trazer o registro inteiro */
  async estado() {
    var s = await API.sessao(); if (!s) return null;
    var sel = 'tb:dados->tb,hab:dados->hab,plan:dados->plan,agua:dados->agua,ap:dados->ap';
    var rows = await API._rest('vertice_estado?select=' + encodeURIComponent(sel) + '&user_id=eq.' + s.user.id);
    var e = rows && rows[0] ? rows[0] : {};
    await chrome.storage.local.set({ estado: { em: Date.now(), dados: e } });
    return e;
  },
  evento: function (tipo, dados) {
    dados = Object.assign({ dia: hojeStr() }, dados || {});
    return API._rest('vertice_inbox', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ tipo: tipo, dados: dados }) });
  }
};

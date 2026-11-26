// Pontes de Hermes: repassa ao serviço certo as chamadas que o navegador não pode fazer
// direto por causa do CORS (Readwise, Raindrop, Toggl Track e Strava).
// Só aceita os quatro destinos abaixo, com caminhos simples, para não virar um proxy aberto.
// A chave de cada serviço vem do próprio app em cada chamada e não é guardada aqui.
// Publicada no projeto Supabase "vertice" com verify_jwt = false, como a agenda-ics.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
};

const DESTINOS: Record<string, string> = {
  readwise: 'https://readwise.io/api/v2/',
  raindrop: 'https://api.raindrop.io/rest/v1/',
  toggl: 'https://api.track.toggl.com/api/v9/',
  strava: 'https://www.strava.com/api/v3/',
  'strava-oauth': 'https://www.strava.com/oauth/',
};
const METODOS = ['GET', 'POST', 'PUT', 'PATCH'];
const CAMINHO = /^[A-Za-z0-9_\-\/\.\?=&%:,+]{0,400}$/;

function resp(corpo: string, status = 200, tipo = 'application/json; charset=utf-8') {
  return new Response(corpo, { status, headers: { ...CORS, 'Content-Type': tipo } });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return resp('{"erro":"use POST"}', 405);
  let p: { alvo?: string; metodo?: string; caminho?: string; auth?: string; corpo?: unknown };
  try { p = await req.json(); } catch { return resp('{"erro":"corpo inválido"}', 400); }
  const base = DESTINOS[String(p.alvo || '')];
  const metodo = String(p.metodo || 'GET').toUpperCase();
  const caminho = String(p.caminho || '');
  if (!base) return resp('{"erro":"destino não permitido"}', 400);
  if (!METODOS.includes(metodo)) return resp('{"erro":"método não permitido"}', 400);
  if (!CAMINHO.test(caminho) || caminho.includes('..') || caminho.includes('//') || caminho.startsWith('/')) {
    return resp('{"erro":"caminho inválido"}', 400);
  }
  if (p.alvo === 'strava-oauth' && !/^token(\?|$)/.test(caminho)) return resp('{"erro":"caminho inválido"}', 400);
  const alvo = new URL(caminho, base);
  if (!alvo.toString().startsWith(base)) return resp('{"erro":"caminho inválido"}', 400);

  const h: Record<string, string> = { 'User-Agent': 'astronautica-pontes', 'Accept': 'application/json' };
  if (p.auth) h['Authorization'] = String(p.auth).slice(0, 600);
  let body: string | undefined;
  if (p.corpo !== undefined && metodo !== 'GET') { body = JSON.stringify(p.corpo); h['Content-Type'] = 'application/json'; }
  try {
    const r = await fetch(alvo.toString(), { method: metodo, headers: h, body });
    if (r.status === 204 || r.status === 205 || r.status === 304) return resp('{"ok":true}', 200);
    const txt = await r.text();
    if (txt.length > 6_000_000) return resp('{"erro":"resposta grande demais"}', 413);
    return resp(txt, r.status, r.headers.get('content-type') || 'application/json; charset=utf-8');
  } catch {
    return resp('{"erro":"falha ao falar com o serviço"}', 502);
  }
});

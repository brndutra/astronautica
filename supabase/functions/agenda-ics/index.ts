// Busca o endereço secreto iCal de uma agenda Google e devolve o texto com CORS,
// para o app Astronáutica ler os eventos no navegador.
// Só aceita endereços de calendar.google.com, para não virar um proxy aberto.
// Publicada no projeto Supabase "vertice" com verify_jwt = false.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  const u = new URL(req.url).searchParams.get('u') || '';
  let alvo: URL;
  try { alvo = new URL(u); } catch { return new Response('endereço inválido', { status: 400, headers: CORS }); }
  if (alvo.protocol !== 'https:' || alvo.hostname !== 'calendar.google.com' || !alvo.pathname.endsWith('.ics')) {
    return new Response('só aceito o endereço iCal (.ics) de calendar.google.com', { status: 400, headers: CORS });
  }
  try {
    const r = await fetch(alvo.toString(), { headers: { 'User-Agent': 'astronautica-agenda' } });
    if (!r.ok) return new Response('a agenda respondeu ' + r.status, { status: 502, headers: CORS });
    const txt = await r.text();
    if (txt.length > 4_000_000) return new Response('agenda grande demais', { status: 413, headers: CORS });
    return new Response(txt, { headers: { ...CORS, 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'max-age=300' } });
  } catch (e) {
    return new Response('falha ao buscar a agenda', { status: 502, headers: CORS });
  }
});

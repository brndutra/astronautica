/* Lê a página de um produto e devolve nome, preço, loja e foto, para a aba Compras do Registro rápido.
   GET /api/produto?url=https://loja.com.br/produtos/...
   Só aceita http(s) para endereços públicos; lê no máximo 1,5 MB; desiste em 8 s. */
const LIMITE = 1500000;

function privado(host) {
  host = String(host || '').toLowerCase().replace(/^\[|\]$/g, '');
  if (!host || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) return true;
  if (host === '::1' || host.startsWith('fc') || host.startsWith('fd') || host.startsWith('fe80')) return true;
  const m = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const a = +m[1], b = +m[2];
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127);
}

function limpaUrl(u) {
  try {
    const x = new URL(u);
    [...x.searchParams.keys()].forEach((k) => { if (/^(utm_|fbclid|gclid|epik|pp$|ref$|mc_)/i.test(k)) x.searchParams.delete(k); });
    x.hash = '';
    return x.toString();
  } catch (e) { return u; }
}

function decodifica(t) {
  return String(t || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/\s+/g, ' ').trim();
}

function metas(html) {
  const out = {};
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const k = (tag.match(/\b(?:property|name|itemprop)\s*=\s*["']([^"']+)["']/i) || [])[1];
    const v = (tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i) || [])[1];
    if (k && v != null && !(k.toLowerCase() in out)) out[k.toLowerCase()] = decodifica(v);
  }
  return out;
}

function numero(v) {
  if (v == null) return null;
  let s = String(v).replace(/[^\d.,]/g, '');
  if (!s) return null;
  if (s.includes(',') && s.includes('.')) s = s.lastIndexOf(',') > s.lastIndexOf('.') ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (s.includes(',')) s = s.replace(',', '.');
  const n = parseFloat(s);
  return isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : null;
}

function jsonLd(html) {
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      let d = JSON.parse(m[1].trim());
      const lista = [].concat(d['@graph'] || d);
      for (const x of lista) {
        const tipo = [].concat(x && x['@type'] || []).join(' ');
        if (/Product/i.test(tipo)) {
          const of = [].concat(x.offers || [])[0] || {};
          return {
            title: x.name, img: [].concat(x.image || [])[0],
            preco: numero(of.price || of.lowPrice || (of.priceSpecification || {}).price), moeda: of.priceCurrency,
            loja: (x.brand && (x.brand.name || x.brand)) || null,
          };
        }
      }
    } catch (e) { /* bloco inválido: segue */ }
  }
  return {};
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const bruto = String((req.query && req.query.url) || '');
  let alvo;
  try { alvo = new URL(bruto); } catch (e) { res.status(400).json({ ok: false, erro: 'link inválido' }); return; }
  if (!/^https?:$/.test(alvo.protocol) || privado(alvo.hostname)) { res.status(400).json({ ok: false, erro: 'link não permitido' }); return; }
  const url = limpaUrl(alvo.toString());
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(url, {
      redirect: 'follow', signal: ctl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AstronauticaCompras/1.0)', 'Accept': 'text/html,application/xhtml+xml', 'Accept-Language': 'pt-BR,pt;q=0.9' },
    });
    const fim = new URL(r.url || url);
    if (privado(fim.hostname)) { res.status(400).json({ ok: false, erro: 'link não permitido' }); return; }
    let html = '';
    const leitor = r.body && r.body.getReader ? r.body.getReader() : null;
    if (leitor) {
      const dec = new TextDecoder('utf-8');
      let n = 0;
      for (;;) { const { done, value } = await leitor.read(); if (done) break; n += value.length; html += dec.decode(value, { stream: true }); if (n > LIMITE) { try { ctl.abort(); } catch (e) {} break; } }
    } else html = (await r.text()).slice(0, LIMITE);
    const M = metas(html), J = jsonLd(html);
    const titulo = M['og:title'] || J.title || decodifica((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]) || fim.hostname;
    let img = M['og:image:secure_url'] || M['og:image'] || J.img || M['twitter:image'] || null;
    if (img) { try { img = new URL(img, fim).toString().replace(/^http:/, 'https:'); } catch (e) { img = null; } }
    let preco = numero(M['product:price:amount'] || M['og:price:amount'] || M['price'] || J.preco);
    if (preco == null) { const k = Object.keys(M).find((x) => /(^|:)price$/.test(x)); if (k) preco = numero(M[k]); }
    if (preco == null && M['twitter:data1'] && /R\$|\d/.test(M['twitter:data1'])) preco = numero(M['twitter:data1']);
    const moeda = M['product:price:currency'] || M['og:price:currency'] || J.moeda || 'BRL';
    const loja = M['og:site_name'] || J.loja || fim.hostname.replace(/^www\./, '');
    const canon = M['og:url'] ? limpaUrl(new URL(M['og:url'], fim).toString()) : limpaUrl(fim.toString());
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    res.status(200).json({ ok: true, url: canon, titulo: String(titulo).slice(0, 160), img, preco, moeda, loja: String(loja).slice(0, 80) });
  } catch (e) {
    res.status(200).json({ ok: false, url, erro: e && e.name === 'AbortError' ? 'a loja demorou demais' : 'não consegui ler a página' });
  } finally { clearTimeout(t); }
};

/* Astronáutica · frontões da extensão.
   Cada refúgio tem a sua arquitetura no alto do templo; os ornamentos são botões:
   o medalhão do tímpano abre as Mensagens de bordo, o ornamento do ápice abre as preferências
   e os ornamentos das pontas fixam no painel lateral e soltam a janela. */
var FR_IC = {
  lateral: '<path d="M4 6h16v12H4zM15 6v12"/>',
  janela: '<path d="M5 9h9v9H5zM9 5h10v10M13 11l6-6"/>',
  ajustes: '<circle cx="12" cy="12" r="2.6"/><path d="M12 4v2.4M12 17.6V20M4 12h2.4M17.6 12H20M6.3 6.3l1.7 1.7M16 16l1.7 1.7M6.3 17.7 8 16M16 8l1.7-1.7"/>'
};
function frIcone(k, cor) { return '<svg class="fr-ic" viewBox="0 0 24 24" fill="none" stroke="' + cor + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + FR_IC[k] + '</svg>'; }

/* folhas de louro ao longo de um arco (tímpano grego) */
function frLouro(lado) {
  var s = '', n = 9, i, t, x, y, a, sx = lado < 0 ? -1 : 1;
  for (i = 0; i < n; i++) {
    t = i / (n - 1);
    x = 110 + sx * (30 + t * 62); y = 70 - Math.sin(t * Math.PI * 0.85) * 34 - t * 4;
    a = sx * (-60 + t * 70);
    s += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="7" ry="2.6" transform="rotate(' + (a - 20).toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" fill="#c99a3d"/>' +
      '<ellipse cx="' + (x + sx * 1).toFixed(1) + '" cy="' + (y + 3).toFixed(1) + '" rx="6" ry="2.3" transform="rotate(' + (a + 30).toFixed(0) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" fill="#a87a28"/>';
  }
  return '<path d="M' + (110 + sx * 26) + ' 74 Q' + (110 + sx * 70) + ' 62 ' + (110 + sx * 94) + ' 32" fill="none" stroke="#8a5a14" stroke-width="1.6"/>' + s;
}

var FRONTOES = {
  greek: {
    /* frontão dórico: cornija inclinada em três faixas, tímpano de mármore, cornija horizontal com dentículos */
    teto: '<defs><linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e8d8b0"/></linearGradient>' +
      '<pattern id="gd" width="9" height="7" patternUnits="userSpaceOnUse"><rect x="1.5" y="0" width="6" height="7" fill="#e9c97c"/></pattern></defs>' +
      '<polygon points="0,90 180,2 360,90" fill="#6e4410"/><polygon points="5,88 180,7 355,88" fill="#e9c97c"/><polygon points="11,86 180,12 349,86" fill="#8a5a14"/>' +
      '<polygon points="16,84 180,17 344,84" fill="#f3e2b3"/><polygon points="22,84 180,22 338,84" fill="url(#gm)"/>' +
      '<rect x="0" y="84" width="360" height="16" fill="#8a5a14"/><rect x="0" y="86" width="360" height="7" fill="url(#gd)"/><rect x="0" y="95" width="360" height="2" fill="#e9c97c"/>',
    timpano: function () { return frLouro(-1) + frLouro(1) + '<path d="M86 74h48" stroke="#8a5a14" stroke-width="1.4"/><path d="M98 76q12 6 24 0" fill="none" stroke="#c99a3d" stroke-width="1.6"/>'; },
    apice: '<svg viewBox="0 0 40 40"><path d="M20 30C12 26 6 18 8 8c4 6 7 11 9 18M20 30c8-4 14-12 12-22-4 6-7 11-9 18M20 30c-3-8-4-16 0-26 4 10 3 18 0 26" fill="#e9c97c" stroke="#6e4410" stroke-width="1.2"/><path d="M8 34q12-8 24 0" fill="none" stroke="#6e4410" stroke-width="2"/><circle cx="20" cy="30" r="8.5" fill="#fbf3df" stroke="#6e4410" stroke-width="1.4"/></svg>',
    ponta: function (lado) {
      var g = '<path d="M20 26C10 22 6 12 9 3c3 8 6 14 11 23M20 26c-2-8-1-16 4-22-1 8-2 15-4 22" fill="#e9c97c" stroke="#6e4410" stroke-width="1.2"/>';
      return '<svg viewBox="0 0 40 44">' + (lado < 0 ? g : '<g transform="translate(40 0) scale(-1 1)">' + g + '</g>') +
        '<rect x="7" y="26" width="26" height="16" rx="1" fill="#8a5a14"/><rect x="9" y="28" width="22" height="12" fill="#fbf3df"/></svg>';
    },
    friso: 'linear-gradient(90deg,transparent 0 6px,#8a5a14 6px 8px,transparent 8px 10px,#8a5a14 10px 12px,transparent 12px 14px,#8a5a14 14px 16px,transparent 16px 22px) 0 0/44px 100%,linear-gradient(#f3e2b3,#e9d6a3)',
    cor: '#6e4410'
  },
  norse: {
    /* telhado de casa longa: escamas de madeira, beirais entalhados com nós, viga do beiral */
    teto: '<defs><pattern id="ns" width="14" height="10" patternUnits="userSpaceOnUse"><rect width="14" height="10" fill="#2f5a4d"/><path d="M0 10a7 7 0 0 1 14 0" fill="#3e7363" stroke="#1b3a32" stroke-width="1.2"/><path d="M-7 5a7 7 0 0 1 14 0M7 5a7 7 0 0 1 14 0" fill="#3e7363" stroke="#1b3a32" stroke-width="1.2"/></pattern></defs>' +
      '<polygon points="0,92 180,0 360,92" fill="#2a1a0e"/><polygon points="14,88 180,12 346,88" fill="url(#ns)"/>' +
      '<polyline points="2,92 180,3 358,92" fill="none" stroke="#7a4e2c" stroke-width="8"/><polyline points="2,92 180,3 358,92" fill="none" stroke="#d4bd82" stroke-width="1.3" stroke-dasharray="3 3"/>' +
      '<polyline points="10,92 180,10 350,92" fill="none" stroke="#5a3c22" stroke-width="2"/>' +
      '<rect x="0" y="86" width="360" height="14" fill="#5a3c22"/><rect x="0" y="88" width="360" height="1.5" fill="#d4bd82"/><rect x="0" y="96" width="360" height="1.5" fill="#d4bd82"/>',
    timpano: function () {
      return '<path d="M46 76L110 14M174 76L110 14" stroke="#7a4e2c" stroke-width="3"/><path d="M110 14l-4 8h8z" fill="#d4bd82"/>' +
        '<circle cx="110" cy="46" r="33" fill="none" stroke="#d4bd82" stroke-width="1.2" stroke-dasharray="1 3"/>' +
        '<circle cx="110" cy="46" r="38" fill="none" stroke="#1b3a32" stroke-width="2"/>';
    },
    apice: '<svg viewBox="0 0 40 40"><path d="M20 30C14 22 8 16 4 6c4 1 7 4 8 8 1-5 4-8 8-9M20 30c6-8 12-14 16-24-4 1-7 4-8 8-1-5-4-8-8-9" fill="#7a4e2c" stroke="#2a1a0e" stroke-width="1.2"/><circle cx="7" cy="8" r="1.2" fill="#d4bd82"/><circle cx="33" cy="8" r="1.2" fill="#d4bd82"/><circle cx="20" cy="30" r="8.5" fill="#203936" stroke="#d4bd82" stroke-width="1.4"/></svg>',
    ponta: function () { return '<svg viewBox="0 0 40 44"><rect x="4" y="30" width="32" height="10" fill="#5a3c22"/><circle cx="20" cy="22" r="15" fill="#7a4e2c" stroke="#2a1a0e" stroke-width="1.5"/><circle cx="20" cy="22" r="11.5" fill="#203936" stroke="#d4bd82" stroke-width="1.2"/></svg>'; },
    friso: 'repeating-linear-gradient(45deg,transparent 0 5px,rgba(212,189,130,.85) 5px 6.5px,transparent 6.5px 11px),repeating-linear-gradient(-45deg,transparent 0 5px,rgba(212,189,130,.85) 5px 6.5px,transparent 6.5px 11px),#203936',
    cor: '#d4bd82'
  },
  egypt: {
    /* pilono: duas torres com gola egípcia e toro, portal central com lintel */
    teto: '<defs><linearGradient id="ec" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a4c86"/><stop offset=".5" stop-color="#3a5f9e"/><stop offset="1" stop-color="#c9a23a"/></linearGradient>' +
      '<pattern id="ef" width="12" height="20" patternUnits="userSpaceOnUse"><rect width="12" height="20" fill="#efe2bf"/><rect x="5" width="2" height="20" fill="#e2d2a6"/></pattern>' +
      '<pattern id="eg" width="10" height="12" patternUnits="userSpaceOnUse"><rect width="10" height="12" fill="#3a5f9e"/><rect x="3" width="4" height="12" fill="#c9a23a"/><rect x="4.2" width="1.6" height="12" fill="#2a8a7e"/></pattern></defs>' +
      '<polygon points="0,100 12,24 128,24 140,100" fill="url(#ef)" stroke="#c9a23a" stroke-width="2"/><polygon points="220,100 232,24 348,24 360,100" fill="url(#ef)" stroke="#c9a23a" stroke-width="2"/>' +
      '<path d="M6 24Q4 10 0 6h140q-4 4-6 18z" fill="url(#eg)" stroke="#1e3a6e" stroke-width="1.5"/><path d="M226 24q-2-14-6-18h140q-4 4-6 18z" fill="url(#eg)" stroke="#1e3a6e" stroke-width="1.5"/>' +
      '<rect x="4" y="24" width="132" height="4" fill="#c9a23a"/><rect x="224" y="24" width="132" height="4" fill="#c9a23a"/>' +
      '<rect x="134" y="44" width="92" height="56" fill="#e8d9b0" stroke="#c9a23a" stroke-width="1.5"/><path d="M130 44q2-10-2-14h104q-4 4-2 14z" fill="url(#eg)" stroke="#1e3a6e" stroke-width="1.4"/>' +
      '<path d="M30 40v50M50 40v50M310 40v50M330 40v50" stroke="#1e3a6e" stroke-width="1" opacity=".25"/>',
    timpano: function () {
      var w = '', i;
      for (i = 0; i < 6; i++) {
        w += '<path d="M' + (92 - i * 1) + ' ' + (40 + i * 3) + 'Q' + (60 - i * 4) + ' ' + (26 + i * 5) + ' ' + (8 + i * 6) + ' ' + (22 + i * 5) + '" fill="none" stroke="' + (i % 2 ? '#c9a23a' : '#1e3a6e') + '" stroke-width="2.6"/>';
        w += '<path d="M' + (128 + i * 1) + ' ' + (40 + i * 3) + 'Q' + (160 + i * 4) + ' ' + (26 + i * 5) + ' ' + (212 - i * 6) + ' ' + (22 + i * 5) + '" fill="none" stroke="' + (i % 2 ? '#c9a23a' : '#1e3a6e') + '" stroke-width="2.6"/>';
      }
      return w + '<path d="M84 52q-4-10 2-16q2 6-1 10M136 52q4-10-2-16q-2 6 1 10" fill="#2a8a7e" stroke="#1e3a6e" stroke-width="1"/>';
    },
    apice: '<svg viewBox="0 0 40 40"><rect x="6" y="14" width="28" height="22" rx="11" fill="#f3e2b0" stroke="#1e3a6e" stroke-width="2"/><path d="M8 38h24" stroke="#1e3a6e" stroke-width="2"/><circle cx="20" cy="25" r="8" fill="#fbf3df" stroke="#c9a23a" stroke-width="1.2"/><circle cx="20" cy="7" r="5" fill="#c9a23a" stroke="#1e3a6e" stroke-width="1.2"/></svg>',
    ponta: function (lado) {
      var f = lado < 0 ? 'M22 4h14l-4 5 4 5H22z' : 'M18 4H4l4 5-4 5h14z', x = lado < 0 ? 20 : 20;
      return '<svg viewBox="0 0 40 44"><path d="M' + x + ' 2v40" stroke="#5a3c22" stroke-width="2.2"/><path d="' + f + '" fill="#9a3d2a" stroke="#1e3a6e" stroke-width="1"/><circle cx="20" cy="27" r="11" fill="#1e3a6e" stroke="#c9a23a" stroke-width="1.6"/></svg>';
    },
    friso: 'linear-gradient(90deg,#1e3a6e 0 4px,#c9a23a 4px 6px,#2a8a7e 6px 10px,#c9a23a 10px 12px,#9a3d2a 12px 16px,#c9a23a 16px 18px) 0 0/18px 100%',
    cor: '#f3e2b0'
  }
};

function pintaFrontao(tema, guardiao) {
  var F = FRONTOES[tema] || FRONTOES.greek, h = document.querySelector('.frontao');
  if (!h) return;
  h.querySelector('.fr-teto').innerHTML = '<svg viewBox="0 0 360 100" preserveAspectRatio="none" aria-hidden="true">' + F.teto + '</svg>';
  h.querySelector('.fr-timpano').innerHTML = '<svg viewBox="0 0 220 80" aria-hidden="true">' + F.timpano() + '</svg>';
  var ic = tema === 'greek' ? '#6e4410' : '#f3e2b0';
  h.querySelector('#m-ajustes .fr-orn').innerHTML = F.apice + frIcone('ajustes', tema === 'greek' ? '#6e4410' : tema === 'norse' ? '#d4bd82' : '#1e3a6e');
  h.querySelector('#m-lateral .fr-orn').innerHTML = F.ponta(-1) + frIcone('lateral', tema === 'greek' ? '#6e4410' : ic);
  h.querySelector('#m-janela .fr-orn').innerHTML = F.ponta(1) + frIcone('janela', tema === 'greek' ? '#6e4410' : ic);
  h.querySelector('.fr-friso').style.background = F.friso;
  var im = h.querySelector('#fr-g'); if (im && guardiao) { im.src = guardiao.img; im.alt = ''; }
}

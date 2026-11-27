/* Astronáutica · som do foco, gerado aqui mesmo (sem arquivos de áudio):
   ruído marrom, chuva, tique-taque e o sino suave dos toques. */
var ctx = null, ambiente = null;
function ac() { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); return ctx; }
function ruido(seg, tipo) {
  var c = ac(), n = Math.floor(c.sampleRate * seg), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0), ult = 0, i;
  for (i = 0; i < n; i++) {
    var w = Math.random() * 2 - 1;
    if (tipo === 'marrom') { ult = (ult + 0.02 * w) / 1.02; d[i] = ult * 3.2; }
    else d[i] = w;
  }
  return b;
}
function para() {
  if (!ambiente) return;
  try { ambiente.ganho.gain.setTargetAtTime(0, ac().currentTime, 0.3); } catch (e) { }
  var a = ambiente; ambiente = null;
  setTimeout(function () { try { a.fontes.forEach(function (f) { f.stop(); }); } catch (e) { } if (a.iv) clearInterval(a.iv); }, 900);
}
function toca(tipo) {
  para();
  var c = ac(), g = c.createGain(); g.gain.value = 0; g.connect(c.destination);
  var a = { ganho: g, fontes: [], iv: null };
  if (tipo === 'marrom' || tipo === 'chuva') {
    var s = c.createBufferSource(); s.buffer = ruido(6, tipo === 'marrom' ? 'marrom' : 'branco'); s.loop = true;
    if (tipo === 'chuva') {
      var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 0.6; s.connect(f); f.connect(g);
      /* pingos soltos por cima do chiado */
      a.iv = setInterval(function () {
        var p = c.createBufferSource(), pg = c.createGain(), pf = c.createBiquadFilter();
        p.buffer = ruido(0.05, 'branco'); pf.type = 'highpass'; pf.frequency.value = 2500 + Math.random() * 3000;
        pg.gain.setValueAtTime(0.05 + Math.random() * 0.08, c.currentTime); pg.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05);
        p.connect(pf); pf.connect(pg); pg.connect(g); p.start();
      }, 90);
    } else s.connect(g);
    s.start(); a.fontes.push(s);
    g.gain.setTargetAtTime(tipo === 'marrom' ? 0.22 : 0.16, c.currentTime, 0.8);
  } else if (tipo === 'tique') {
    var lado = 0;
    g.gain.value = 1;
    a.iv = setInterval(function () {
      var o = c.createOscillator(), og = c.createGain(), t = c.currentTime;
      o.type = 'square'; o.frequency.value = lado++ % 2 ? 1500 : 1900;
      og.gain.setValueAtTime(0.025, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      o.connect(og); og.connect(g); o.start(t); o.stop(t + 0.04);
    }, 1000);
  }
  ambiente = a;
}
function sino(leve) {
  var c = ac(), t = c.currentTime, v = leve ? 0.07 : 0.16;
  [[660, 0], [990, 0.02], [1320, 0.04]].forEach(function (x) {
    var o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = x[0];
    g.gain.setValueAtTime(0.0001, t + x[1]); g.gain.exponentialRampToValueAtTime(v, t + x[1] + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + x[1] + (leve ? 1.2 : 2.2));
    o.connect(g); g.connect(c.destination); o.start(t + x[1]); o.stop(t + x[1] + 2.4);
  });
}
chrome.runtime.onMessage.addListener(function (m) {
  if (!m || m.alvo !== 'som') return;
  if (m.t === 'som') toca(m.tipo);
  else if (m.t === 'parar') para();
  else if (m.t === 'sino') sino(!!m.leve);
});

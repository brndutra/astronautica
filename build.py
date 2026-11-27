#!/usr/bin/env python3
"""Monta o Astronáutica a partir dos arquivos separados.

  src/css/NN-*.css  ->  app.css   (na ordem dos números)
  src/app/NN-*.js   ->  app.js    (na ordem dos números; o código roda num escopo só,
                                   por isso as partes são juntadas e não carregadas soltas)
  index.html        ->  só a marcação; o build atualiza o ?v= de app.css e app.js

Depois de qualquer mudança em src/:   python3 build.py
Só conferir se está tudo em dia:       python3 build.py --check
Nunca edite app.css nem app.js à mão: eles são gerados.
"""
import hashlib, os, re, sys

R = os.path.dirname(os.path.abspath(__file__))


def junta(pasta, ext):
    d = os.path.join(R, 'src', pasta)
    nomes = sorted(f for f in os.listdir(d) if f.endswith(ext))
    return nomes, ''.join(open(os.path.join(d, f), encoding='utf8').read() for f in nomes)


def v(txt):
    return hashlib.sha1(txt.encode('utf8')).hexdigest()[:8]


pc, css = junta('css', '.css')
pj, js = junta('app', '.js')
idx_p = os.path.join(R, 'index.html')
idx = open(idx_p, encoding='utf8').read()
novo = re.sub(r'href="app\.css\?v=[0-9a-f]+"', 'href="app.css?v=%s"' % v(css), idx, count=1)
novo = re.sub(r'src="app\.js\?v=[0-9a-f]+"', 'src="app.js?v=%s"' % v(js), novo, count=1)
assert 'app.css?v=' in novo and 'app.js?v=' in novo, 'index.html perdeu o link de app.css ou o script de app.js'


def le(n):
    p = os.path.join(R, n)
    return open(p, encoding='utf8').read() if os.path.exists(p) else ''


if '--check' in sys.argv:
    ok = le('app.css') == css and le('app.js') == js and novo == idx
    print('em dia' if ok else 'DESATUALIZADO: rode  python3 build.py')
    sys.exit(0 if ok else 1)

open(os.path.join(R, 'app.css'), 'w', encoding='utf8').write(css)
open(os.path.join(R, 'app.js'), 'w', encoding='utf8').write(js)
open(idx_p, 'w', encoding='utf8').write(novo)
print('app.css: %d partes, %d KB · app.js: %d partes, %d KB' % (len(pc), len(css) // 1024, len(pj), len(js) // 1024))

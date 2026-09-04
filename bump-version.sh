#!/bin/sh
# Оновлює ?v=... у посиланнях на css/js.
# Запускати після кожної зміни в assets/js або assets/css,
# щоб браузери гарантовано взяли нову версію.
python3 - <<'PY'
import re, glob, hashlib
h = hashlib.md5()
for f in sorted(glob.glob('assets/js/*.js') + glob.glob('assets/css/*.css')):
    h.update(open(f, 'rb').read())
ver = h.hexdigest()[:8]
for page in ['index.html', 'course.html']:
    s = open(page, encoding='utf-8').read()
    s = re.sub(r'(assets/(?:js|css)/[a-zA-Z0-9._-]+\.(?:js|css))(\?v=[a-z0-9]+)?', r'\1?v=' + ver, s)
    open(page, 'w', encoding='utf-8').write(s)
print('версія оновлена:', ver)
PY

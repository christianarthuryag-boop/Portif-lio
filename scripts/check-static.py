#!/usr/bin/env python3
"""Verifica estrutura e destinos locais sem acessar rede ou dados privados."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.errors = path, set(), [], []
        self.count = {'h1': 0, 'main': 0, 'title': 0}
        self.lang = False
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in self.count: self.count[tag] += 1
        if tag == 'html': self.lang = a.get('lang') == 'pt-BR'
        if 'id' in a:
            if a['id'] in self.ids: self.errors.append('ID duplicado: ' + a['id'])
            self.ids.add(a['id'])
        if tag == 'img':
            for key in ('alt', 'width', 'height'):
                if key not in a: self.errors.append('Imagem sem ' + key)
        if a.get('target') == '_blank' and not {'noopener','noreferrer'} <= set(a.get('rel','').split()):
            self.errors.append('Link externo sem proteção')
        if tag == 'form': self.errors.append('Formulário inesperado')
        for key in ('href', 'src', 'poster'):
            if key in a: self.links.append(a[key])

pages = {p.resolve(): Document(p) for p in ROOT.rglob('*.html') if not any(x in p.parts for x in ['node_modules','.local'])}
errors, external = [], set()
for path, doc in pages.items():
    errors += [f'{path.relative_to(ROOT)}: {e}' for e in doc.errors]
    if not doc.lang: errors.append('Idioma ausente: ' + str(path))
    for tag, count in doc.count.items():
        if count != 1: errors.append(f'{path.name}: {tag} deve aparecer uma vez, encontrado {count}')
    for link in doc.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            external.add(link)
            continue
        if not link or link == '#': errors.append('Destino vazio em ' + str(path))
        target = (path.parent / unquote(url.path)).resolve() if url.path else path
        if target.is_dir(): target /= 'index.html'
        if not target.exists(): errors.append('Destino inexistente: ' + link)
        if url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append('Âncora inexistente: ' + link)
for p in ROOT.rglob('*'):
    if any(x in p.parts for x in ['.git','node_modules','.local']): continue
    if p.is_file() and (p.name == '.env' or p.suffix in ['.sqlite','.db','.pem','.key']): errors.append('Arquivo sensível inesperado: ' + str(p.relative_to(ROOT)))
    if p.is_file() and p.suffix in ['.html','.js','.css','.md']:
        s = p.read_text(errors='replace')
        if re.search(r'gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----', s):
            errors.append('Possível segredo em ' + str(p.relative_to(ROOT)))
print(f'{len(pages)} páginas verificadas: h1/main/title, idioma, imagens, IDs, âncoras e arquivos locais.')
print('Destinos externos identificados (disponibilidade não testada):')
for link in sorted(external): print(' - ' + link)
if errors:
    raise SystemExit('\n'.join(errors))
print('APROVADO: estrutura e links locais; nenhum padrão de segredo ou arquivo sensível encontrado. Não é auditoria exaustiva de segredos.')

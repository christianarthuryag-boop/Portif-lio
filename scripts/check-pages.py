#!/usr/bin/env python3
"""Valida o artefato e resolve links sob /Portif-lio/ sem publicar nem usar rede."""
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
BASE = 'https://pages.example.invalid/Portif-lio/'
allowed = set(json.loads((ROOT / 'scripts/site-files.json').read_text())['files']) | {'.nojekyll'}
actual = {str(p.relative_to(DIST)) for p in DIST.rglob('*') if p.is_file()}
assert actual == allowed, f'Artefato divergente: {actual.symmetric_difference(allowed)}'

class Resources(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ['href', 'src', 'poster'] and value:
                self.links.append(value)

checked = 0
for file in DIST.rglob('*'):
    if file.suffix == '.html':
        links = Resources(file.read_text()).links
    elif file.suffix == '.css':
        links = [x.strip(' \"\'') for x in re.findall(r'url\(([^)]+)\)', file.read_text())]
    else:
        continue
    current = BASE + file.relative_to(DIST).as_posix()
    for link in links:
        if urlsplit(link).scheme or link.startswith('//'):
            continue
        resolved = urljoin(current, link)
        assert resolved.startswith(BASE), f'Link sai do subcaminho Pages: {link}'
        relative = unquote(urlsplit(resolved).path.removeprefix('/Portif-lio/'))
        target = DIST / relative
        if target.is_dir(): target /= 'index.html'
        assert target.is_file(), f'Recurso ausente sob /Portif-lio/: {relative}'
        checked += 1
for svg in DIST.rglob('*.svg'):
    element = ET.parse(svg).getroot()
    for node in element.iter():
        assert node.tag.rsplit('}', 1)[-1] not in ['script', 'foreignObject'], f'SVG ativo: {svg}'
        assert not any(key.startswith('on') for key in node.attrib), f'Evento inline em {svg}'
        for key, value in node.attrib.items():
            if key.rsplit('}', 1)[-1] == 'href':
                assert value.startswith('#'), f'Referência SVG externa em {svg}'
print(f'APROVADO: {len(actual)} arquivos exatos; {checked} referências locais sob /Portif-lio/; SVGs sem código ativo ou referências externas.')
print('Validação estática de subcaminho. Não é teste HTTP, de navegador ou deploy remoto.')

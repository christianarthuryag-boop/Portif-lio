#!/usr/bin/env python3
"""Monta dist/ apenas com arquivos públicos explicitamente permitidos."""
import hashlib
import json
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / 'dist'
FILES = json.loads((ROOT / 'scripts/site-files.json').read_text())['files']
ALLOWED_EXTENSIONS = {'.html', '.css', '.js', '.svg', '.webp', '.mp4'}
assert len(FILES) == len(set(FILES)), 'Manifesto com duplicatas'
for name in FILES:
    relative = Path(name)
    assert not relative.is_absolute() and '..' not in relative.parts, 'Caminho inseguro'
    assert relative.suffix in ALLOWED_EXTENSIONS, 'Extensão inesperada'
    assert not any(part.startswith('.') for part in relative.parts), 'Dotfile inesperado'
    source = ROOT / relative
    assert source.is_file(), f'Arquivo ausente: {name}'
    assert not any(part.is_symlink() for part in [source, *source.parents]), 'Symlink recusado'
# dist é uma saída descartável gerada por este script, nunca a raiz do checkout.
assert DESTINATION.parent == ROOT and DESTINATION.name == 'dist'
assert not DESTINATION.is_symlink(), 'Destino symlink recusado'
if DESTINATION.exists():
    assert (DESTINATION / '.nojekyll').is_file(), 'dist existente não reconhecido; revisar antes de substituir'
    shutil.rmtree(DESTINATION)
DESTINATION.mkdir()
manifest = []
for name in FILES:
    source, target = ROOT / name, DESTINATION / name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    manifest.append({'path': name, 'bytes': target.stat().st_size,
                     'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
(DESTINATION / '.nojekyll').touch()
(ROOT / '.local').mkdir(exist_ok=True)
(ROOT / '.local/build-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Pacote local pronto: dist/ com {len(FILES)} arquivos permitidos + .nojekyll.')
print('Excluídos: .git, .local, docs, scripts, github-profile, backups e imagens antigas não utilizadas.')

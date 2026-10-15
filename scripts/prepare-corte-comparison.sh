#!/usr/bin/env bash
# Preserva somente arquivos públicos da demo anterior. Sem checkout ou reset.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
comparison_baseline=5f910d9
for comparison_file in demos/corte-prime/index.html demos/corte-prime/style.css demos/corte-prime/demo.js assets/favicon.svg; do
  comparison_destination=".local/before/$comparison_file"
  mkdir -p -- "$(dirname -- "$comparison_destination")"
  git show "$comparison_baseline:$comparison_file" > "$comparison_destination"
done
node scripts/capture-corte-prime.cjs --prepare-only

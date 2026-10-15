'use strict';
// Renderiza versões Git anteriores sem checkout, reset ou alteração de histórico.
// Somente .local/ recebe arquivos e capturas; nada é publicado.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const baseline = '5f910d9'; // Portfólio aprovado antes deste refinamento.
const beforeRoot = path.join(root, '.local', 'before');
const output = path.join(root, '.local', 'comparacao');
const widths = [320, 390, 768, 1440];
if (!fs.existsSync(path.join(beforeRoot, 'demos/corte-prime/index.html'))) {
  throw new Error('Execute bash scripts/prepare-corte-comparison.sh antes das capturas.');
}
fs.mkdirSync(output, { recursive: true });

// A comparação ao vivo também permite revisão quando o sandbox bloqueia capturas.
const comparison = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Corte Prime — revisão antes e depois</title><style>body{margin:24px;background:#151515;color:#eee;font:16px/1.5 system-ui}p{color:#bbb}main{display:grid;grid-template-columns:1fr 1fr;gap:20px}iframe{width:100%;height:80vh;border:1px solid #666;background:#111;box-sizing:border-box}h2{font-size:18px}@media(max-width:750px){main{grid-template-columns:1fr}}</style><h1>Corte Prime · antes e depois</h1><p>Comparação ao vivo, não capturas. Versão anterior: ${baseline}. Redimensione a janela para revisar. Nenhuma reserva ou publicação.</p><main><section><h2>Antes</h2><iframe title="Demo anterior" src="before/demos/corte-prime/index.html"></iframe></section><section><h2>Depois</h2><iframe title="Demo refinada" src="../demos/corte-prime/index.html"></iframe></section></main></html>`;
fs.writeFileSync(path.join(root, '.local', 'revisao.html'), comparison);
if (process.argv.includes('--prepare-only')) {
  console.log('Comparação ao vivo criada em .local/revisao.html. Capturas não executadas.');
  process.exit(0);
}

(async () => {
  const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || 'playwright');
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    for (const [label, location] of [
      ['antes', path.join(beforeRoot, 'demos/corte-prime/index.html')],
      ['depois', path.join(root, 'demos/corte-prime/index.html')]
    ]) {
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(pathToFileURL(location).href);
        await page.locator('img').evaluateAll(images => Promise.all(images.map(image => {
          image.loading = 'eager';
          return image.decode();
        })));
        await page.screenshot({ path: path.join(output, `corte-prime-${label}-${width}.png`), fullPage: true });
      }
    }
    const images = widths.map(width => `<h2>${width} px</h2><section><figure><figcaption>Antes</figcaption><a href="corte-prime-antes-${width}.png"><img src="corte-prime-antes-${width}.png" alt="Corte Prime anterior em ${width} pixels"></a></figure><figure><figcaption>Depois</figcaption><a href="corte-prime-depois-${width}.png"><img src="corte-prime-depois-${width}.png" alt="Corte Prime refinado em ${width} pixels"></a></figure></section>`).join('');
    fs.writeFileSync(path.join(output, 'index.html'), `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Corte Prime — capturas comparativas</title><style>body{background:#151515;color:#eee;font:16px system-ui;margin:25px}section{display:grid;grid-template-columns:1fr 1fr;gap:20px}figure{margin:0}img{width:100%;height:auto}figcaption{margin-bottom:10px}</style><h1>Corte Prime — antes e depois</h1>${images}</html>`);
    console.log('Oito capturas geradas. Abra .local/comparacao/index.html.');
  } finally { await browser.close(); }
})().catch(error => {
  console.error('Capturas não concluídas:', error.message);
  process.exitCode = 1;
});

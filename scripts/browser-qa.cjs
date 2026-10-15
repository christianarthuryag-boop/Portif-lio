'use strict';
// Execute no host com Playwright já instalado. Nenhuma dependência de produção.
// PLAYWRIGHT_CORE_PATH permite reutilizar uma instalação local existente.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || 'playwright');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '.local', 'qa');
const viewportWidths = [320, 390, 768, 1440];
const base = process.env.PORTFOLIO_QA_URL || pathToFileURL(root + '/').href;
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  const errors = [];
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  try {
    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 900 });
      for (const [name, location] of [['portfolio', 'index.html'], ['corte-prime', 'demos/corte-prime/index.html'], ['pata-e-afeto', 'demos/pata-e-afeto/index.html']]) {
        await page.goto(new URL(location, base).href);
        await page.locator('img').evaluateAll(images => Promise.all(images.map(img => { img.loading = 'eager'; return img.decode(); })));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${name}: overflow em ${width}`);
        assert.equal(await page.locator('h1').count(), 1);
        await page.screenshot({ path: path.join(output, `${name}-${width}.png`), fullPage: true });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(new URL('index.html', base).href);
    const menu = page.locator('.menu-toggle');
    await menu.click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    await page.locator('#menu a').first().focus();
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await menu.evaluate(el => el === document.activeElement), true);
    await menu.click();
    await page.locator('#menu a').first().click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    const opener = page.locator('.video-trigger');
    await opener.click();
    const dialog = page.locator('#demo-modal');
    assert.equal(await dialog.evaluate(el => el.open), true);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await dialog.evaluate(el => el.contains(document.activeElement)), true, 'Foco deve permanecer no modal');
    await page.keyboard.press('Escape');
    assert.equal(await dialog.evaluate(el => el.open), false);
    assert.equal(await opener.evaluate(el => el === document.activeElement), true);
    assert.equal(await dialog.locator('video').evaluate(el => el.paused), true);
    await opener.click();
    await page.locator('.close-modal').click();
    assert.equal(await opener.evaluate(el => el === document.activeElement), true);
    await opener.click();
    await page.mouse.click(2, 2);
    assert.equal(await dialog.evaluate(el => el.open), false);
    await page.goto(new URL('demos/corte-prime/index.html', base).href);
    const service = page.locator('[data-service]').first();
    await service.click();
    assert.equal(await page.locator('#service-dialog').evaluate(el => el.open), true);
    assert.equal(await page.locator('#service-title').textContent(), 'Corte masculino');
    await page.keyboard.press('Escape');
    assert.equal(await service.evaluate(el => el === document.activeElement), true);
    const demoMenu = page.locator('.menu-toggle');
    await demoMenu.click();
    assert.equal(await demoMenu.getAttribute('aria-expanded'), 'true');
    await page.locator('#menu a').first().focus();
    await page.keyboard.press('Escape');
    assert.equal(await demoMenu.getAttribute('aria-expanded'), 'false');
    assert.equal(await demoMenu.evaluate(el => el === document.activeElement), true);
    await demoMenu.click();
    await page.locator('#menu a[href="#galeria"]').click();
    assert.equal(await demoMenu.getAttribute('aria-expanded'), 'false');
    for (const imageLink of await page.locator('[data-gallery]').all()) {
      await imageLink.click();
      const galleryDialog = page.locator('#gallery-dialog');
      assert.equal(await galleryDialog.evaluate(el => el.open), true);
      await galleryDialog.locator('img').evaluate(img => img.decode());
      assert.equal(await galleryDialog.locator('img').getAttribute('alt'), await imageLink.locator('img').getAttribute('alt'));
      await page.keyboard.press('Shift+Tab');
      assert.equal(await galleryDialog.evaluate(el => el.contains(document.activeElement)), true);
      await page.keyboard.press('Escape');
      assert.equal(await imageLink.evaluate(el => el === document.activeElement), true);
    }
    for (const trigger of await page.locator('[data-service]').all()) {
      await trigger.click();
      assert.equal(await page.locator('#service-dialog').evaluate(el => el.open), true);
      await page.locator('#service-dialog .close').first().click();
      assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    }
    assert.equal(await page.locator('form, input, select').count(), 0);
    await page.goto(new URL('demos/pata-e-afeto/index.html', base).href);
    const petMenu = page.locator('.menu-toggle');
    await petMenu.click();
    assert.equal(await petMenu.getAttribute('aria-expanded'), 'true');
    await page.locator('#menu a').first().focus();
    await page.keyboard.press('Escape');
    assert.equal(await petMenu.getAttribute('aria-expanded'), 'false');
    assert.equal(await petMenu.evaluate(el => el === document.activeElement), true);
    await petMenu.click();
    await page.locator('#menu a[href="#galeria"]').click();
    assert.equal(await petMenu.getAttribute('aria-expanded'), 'false');
    for (const trigger of await page.locator('[data-service]').all()) {
      await trigger.click();
      const booking = page.locator('#booking-dialog');
      assert.equal(await booking.evaluate(el => el.open), true);
      for (const choice of await booking.locator('[data-choice]').all()) {
        await choice.click();
        assert.equal(await choice.getAttribute('aria-pressed'), 'true');
        assert.equal(await booking.locator('[aria-pressed="true"]').count(), 1);
        assert.match(await booking.locator('[role="status"]').textContent(), /selecionado/);
      }
      await page.keyboard.press('Escape');
      assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    }
    for (const imageLink of await page.locator('[data-gallery]').all()) {
      await imageLink.click();
      const enlarged = page.locator('#gallery-dialog');
      assert.equal(await enlarged.evaluate(el => el.open), true);
      await enlarged.locator('img').evaluate(image => image.decode());
      await page.keyboard.press('Shift+Tab');
      assert.equal(await enlarged.evaluate(el => el.contains(document.activeElement)), true);
      await page.keyboard.press('Escape');
      assert.equal(await imageLink.evaluate(el => el === document.activeElement), true);
    }
    assert.equal(await page.locator('form, input, select').count(), 0);
    assert.equal(await page.locator('a[href^="tel:"], a[href*="wa.me"]').count(), 0);
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
    const fallback = await noJS.newPage();
    await fallback.goto(new URL('index.html', base).href);
    assert.equal(await fallback.locator('#menu').isVisible(), true);
    assert.equal(await fallback.locator('h1').isVisible(), true);
    assert.equal(await fallback.locator('.video-trigger').isVisible(), false);
    await fallback.goto(new URL('demos/corte-prime/index.html', base).href);
    assert.equal(await fallback.locator('#menu').isVisible(), true);
    assert.equal(await fallback.locator('.booking button').isVisible(), false);
    assert.equal(await fallback.locator('[data-gallery]').count(), 3);
    await fallback.goto(new URL('demos/pata-e-afeto/index.html', base).href);
    assert.equal(await fallback.locator('#menu').isVisible(), true);
    assert.equal(await fallback.locator('.contact button').isVisible(), false);
    assert.equal(await fallback.locator('[data-gallery]').count(), 3);
    await noJS.close();
    assert.deepEqual(errors, [], 'Erros de console ou JavaScript');
    console.log('APROVADO: 3 páginas em 4 larguras, menu, modais, foco, Escape, console e fallback sem JS.');
    console.log(`Capturas em ${output}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

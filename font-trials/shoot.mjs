import pw from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pw;
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = 'file://' + path.join(__dirname, 'preview.html');

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 360 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

const panels = await page.$$('section.panel');
for (let i = 0; i < panels.length; i++) {
  const out = path.join(__dirname, `option-${i + 1}.png`);
  await panels[i].screenshot({ path: out });
  console.log('wrote', out);
}

await browser.close();

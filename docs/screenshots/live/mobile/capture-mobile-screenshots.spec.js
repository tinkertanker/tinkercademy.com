const path = require('path');
const { test } = require('@playwright/test');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (error) {
  ({ chromium } = require('@playwright/test'));
}

const BRAVE_PATH = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const OUT_DIR = __dirname;
const SITEMAP_URL = 'https://tinkercademy.com/sitemap.xml';

test('capture mobile screenshots for the live sitemap', async () => {
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const uniqueUrls = [...new Set(urls)];
  const failures = [];
  const browser = await chromium.launch({
    executablePath: BRAVE_PATH,
    headless: true,
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      locale: 'en-GB',
    });

    const page = await context.newPage();

    for (const loc of uniqueUrls) {
      const routeUrl = new URL(loc);
      const filename = screenshotName(routeUrl.pathname);
      const outputPath = path.join(OUT_DIR, filename);

      try {
        await page.goto(loc, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await page.evaluate(async () => {
          window.scrollTo(0, document.documentElement.scrollHeight || document.body.scrollHeight || 0);
          await new Promise((resolve) => setTimeout(resolve, 400));
          window.scrollTo(0, 0);
          await new Promise((resolve) => setTimeout(resolve, 400));
        });
        await page.screenshot({ path: outputPath, fullPage: true });
        process.stdout.write(`SHOT ${routeUrl.pathname} -> ${filename}\n`);
      } catch (error) {
        failures.push({ url: loc, filename, error: error instanceof Error ? error.message : String(error) });
        process.stdout.write(`FAIL ${routeUrl.pathname}: ${error instanceof Error ? error.message : String(error)}\n`);
      }
    }
  } finally {
    await browser.close();
  }

  process.stdout.write(`SUMMARY ${JSON.stringify({ total: uniqueUrls.length, failures: failures.length, ok: uniqueUrls.length - failures.length })}\n`);
  if (failures.length) {
    process.stdout.write(`FAILURES ${JSON.stringify(failures, null, 2)}\n`);
  }
});

function screenshotName(pathname) {
  if (pathname === '/' || pathname === '') {
    return 'home.png';
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return 'home.png';
  }

  if (segments[0] === 'programmes') {
    return `programme-${segments.slice(1).map(slugifySegment).join('-')}.png`;
  }

  if (segments[0] === 'tutorials') {
    return `tutorial-${segments.slice(1).map(slugifySegment).join('-')}.png`;
  }

  return `${segments.map(slugifySegment).join('-')}.png`;
}

function slugifySegment(input) {
  return decodeURIComponent(input)
    .replace(/[µμ]/g, 'mu')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

import { chromium } from 'playwright-core';

const outDir =
  'C:/Users/HP/AppData/Local/Temp/claude/d--zProjects-Ahinsa-Group/966e3903-ed7f-4cf1-a468-ad28bf4cd4dd/scratchpad';

const browser = await chromium.launch({ channel: 'msedge', headless: true });

for (const slug of ['green-valley-orchid', 'green-valley-lake-city']) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  const errors = [];
  const failedReqs = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => failedReqs.push(r.url() + ' :: ' + r.failure()?.errorText));
  page.on('response', (r) => { if (r.status() >= 400) failedReqs.push(r.status() + ' ' + r.url()); });

  await page.goto(`http://localhost:5199/projects/${slug}`, { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  const overviewSection = page.locator('section:has-text("Project Overview")').first();
  const imgCount = await overviewSection.locator('img').count();
  console.log(`\n=== ${slug} ===`);
  console.log('img elements in overview section:', imgCount);

  if (imgCount > 0) {
    const img = overviewSection.locator('img').first();
    const info = await img.evaluate((el) => ({
      src: el.currentSrc || el.src,
      naturalWidth: el.naturalWidth,
      naturalHeight: el.naturalHeight,
      complete: el.complete,
      rectW: el.getBoundingClientRect().width,
      rectH: el.getBoundingClientRect().height,
      computedOpacity: getComputedStyle(el).opacity,
      computedDisplay: getComputedStyle(el).display,
    }));
    console.log('image info:', info);
  } else {
    console.log('outerHTML of overview image container:');
    const html = await overviewSection.locator('.img-zoom').first().evaluate((el) => el.outerHTML.slice(0, 500));
    console.log(html);
  }

  console.log('console/page errors:', errors.length ? errors : '(none)');
  console.log('failed requests:', failedReqs.length ? failedReqs : '(none)');

  await overviewSection.screenshot({ path: `${outDir}/debug-${slug}.png` }).catch((e) => console.log('screenshot failed:', e.message));
  await page.close();
}

await browser.close();
console.log('\ndone');

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { STATIC_PAGES, fullTitle, metaTags, pageUrl } from './src/data/seo'

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** index.html with one page's title, meta tags, canonical link and structured data in <head>. */
function withPageHead(html, meta) {
  const tags = metaTags(meta)
  // index.html carries the homepage's copies of these tags — drop them first.
  for (const [attr, key] of tags) {
    html = html.replace(new RegExp(`\\s*<meta ${attr}="${key}"[^>]*>`, 'g'), '')
  }
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(fullTitle(meta))}</title>`)
  const head = [
    ...tags.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`),
    `<link rel="canonical" href="${escapeAttr(pageUrl(meta))}" />`,
    meta.jsonLd &&
      `<script type="application/ld+json" id="page-jsonld">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean)
  return html.replace(/\s*<\/head>/, `\n${head.map((t) => `    ${t}`).join('\n')}\n  </head>`)
}

/**
 * Writes an HTML file for each page in STATIC_PAGES (src/data/seo.js) — the
 * built index.html with that page's head already filled in, so crawlers and
 * link previews that never run JavaScript still get its title, description,
 * photo and structured data. /rohit-jain/ becomes dist/rohit-jain/index.html;
 * the app takes over from there exactly as it does on every other page.
 */
function staticPageHeads() {
  let outDir
  return {
    name: 'static-page-heads',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    writeBundle() {
      const html = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      for (const meta of STATIC_PAGES) {
        const file = resolve(outDir, `.${meta.path}index.html`)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, withPageHead(html, meta))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), staticPageHeads()],
  build: {
    // Vite 6's default browser support. Vite 7 raised it to 2022-era browsers,
    // which would leave phones stuck on older versions (e.g. iOS 15) behind.
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  server: {
    port: 5173,
    host: true,
  },
})

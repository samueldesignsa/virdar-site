/**
 * Post-build prerendering script.
 *
 * Launches headless Chrome via Puppeteer, renders the built SPA,
 * extracts the fully-rendered HTML from #root, and injects it into
 * dist/index.html so that crawlers see real content without JavaScript.
 *
 * React 19 hydrates seamlessly on top of the prerendered markup.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname, join, extname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')
const indexPath = resolve(distDir, 'index.html')

function startStaticServer(port) {
  return new Promise((done) => {
    const server = createServer((req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url)
      if (!existsSync(filePath)) filePath = filePath + '.html'
      if (!existsSync(filePath)) {
        res.writeHead(404)
        res.end('Not found')
        return
      }
      const ext = extname(filePath)
      const types = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.json': 'application/json',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
      }
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' })
      res.end(readFileSync(filePath))
    })
    server.listen(port, () => done(server))
  })
}

async function prerender() {
  const PORT = 4567
  console.log('[prerender] Starting static server on port', PORT)
  const server = await startStaticServer(PORT)

  console.log('[prerender] Launching headless browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })

    console.log('[prerender] Navigating to page...')
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // Wait for Framer Motion entrance animations to settle
    await new Promise((r) => setTimeout(r, 2000))

    console.log('[prerender] Extracting rendered HTML...')
    const rootHTML = await page.evaluate(() => {
      const root = document.getElementById('root')
      return root ? root.innerHTML : ''
    })

    if (!rootHTML || rootHTML.length < 100) {
      throw new Error('Prerendered HTML is too short — rendering likely failed')
    }

    // Read the original index.html and inject prerendered content
    let html = readFileSync(indexPath, 'utf-8')
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${rootHTML}</div>`
    )
    writeFileSync(indexPath, html, 'utf-8')

    console.log(`[prerender] Injected ${rootHTML.length} characters of prerendered HTML`)
    console.log('[prerender] Done!')
  } finally {
    await browser.close()
    server.close()
  }
}

prerender().catch((err) => {
  console.error('[prerender] Failed:', err.message)
  process.exit(1)
})

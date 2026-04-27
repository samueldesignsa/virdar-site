import puppeteer from 'puppeteer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SVG_DIR = path.join(__dirname, 'svg')
const PNG_DIR = path.join(__dirname, 'png')

const TARGETS = [
  { svg: 'mark-on-dark.svg',         out: 'mark-on-dark-1024.png',         width: 1024, height: 1024, transparent: false },
  { svg: 'mark-on-dark.svg',         out: 'mark-on-dark-800.png',          width: 800,  height: 800,  transparent: false },
  { svg: 'mark-on-dark.svg',         out: 'mark-on-dark-400.png',          width: 400,  height: 400,  transparent: false },
  { svg: 'mark-on-light.svg',        out: 'mark-on-light-1024.png',        width: 1024, height: 1024, transparent: false },
  { svg: 'mark-transparent.svg',     out: 'mark-transparent-1024.png',     width: 1024, height: 1024, transparent: true  },
  { svg: 'mark-transparent.svg',     out: 'mark-transparent-512.png',      width: 512,  height: 512,  transparent: true  },
  { svg: 'wordmark-on-dark.svg',     out: 'wordmark-on-dark-1200.png',     width: 1200, height: 320,  transparent: false },
  { svg: 'wordmark-on-light.svg',    out: 'wordmark-on-light-1200.png',    width: 1200, height: 320,  transparent: false },
  { svg: 'wordmark-transparent.svg', out: 'wordmark-transparent-1200.png', width: 1200, height: 320,  transparent: true  },
  { svg: 'banner-twitter.svg',       out: 'banner-twitter-1500x500.png',   width: 1500, height: 500,  transparent: false },
  { svg: 'banner-linkedin.svg',      out: 'banner-linkedin-1128x191.png',  width: 1128, height: 191,  transparent: false },
  { svg: 'banner-facebook.svg',      out: 'banner-facebook-820x312.png',   width: 820,  height: 312,  transparent: false },
  { svg: 'banner-youtube.svg',       out: 'banner-youtube-2560x1440.png',  width: 2560, height: 1440, transparent: false },
]

const html = (svgContent, w, h, transparent) => `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  html, body { margin: 0; padding: 0; ${transparent ? 'background: transparent;' : ''} }
  body { width: ${w}px; height: ${h}px; display: flex; }
  svg { display: block; width: ${w}px; height: ${h}px; }
</style>
</head>
<body>${svgContent}</body>
</html>
`

async function run() {
  await fs.mkdir(PNG_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    for (const target of TARGETS) {
      const svgPath = path.join(SVG_DIR, target.svg)
      const svgContent = await fs.readFile(svgPath, 'utf-8')

      const page = await browser.newPage()
      await page.setViewport({ width: target.width, height: target.height, deviceScaleFactor: 1 })
      await page.setContent(html(svgContent, target.width, target.height, target.transparent), {
        waitUntil: 'networkidle0',
      })
      await page.evaluateHandle('document.fonts.ready')

      const buffer = await page.screenshot({
        type: 'png',
        omitBackground: target.transparent,
        clip: { x: 0, y: 0, width: target.width, height: target.height },
      })

      const outPath = path.join(PNG_DIR, target.out)
      await fs.writeFile(outPath, buffer)
      const kb = (buffer.length / 1024).toFixed(0)
      console.log(`  ${target.out}  (${target.width}x${target.height}, ${kb}KB)`)
      await page.close()
    }
  } finally {
    await browser.close()
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

/* eslint-disable no-console */
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const publicDir = path.join(projectRoot, 'public')
const worksPath = path.join(publicDir, 'configuration', 'works.json')
const outPath = path.join(publicDir, 'sitemap.xml')

// Load .env.production for production builds, fallback to .env
const envFile = path.join(projectRoot, '.env.production')
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile })
} else {
  dotenv.config()
}

const SITE_URL = process.env.VITE_SITE_URL || ''
const langs = ['cs', 'en']

function url(loc, priority = '0.7', changefreq = 'weekly') {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

function buildAbsoluteUrl(p) {
  if (SITE_URL) return `${SITE_URL}${p}`
  // Fallback to path-only if SITE_URL not provided (not ideal for production)
  return p
}

async function main() {
  const now = new Date().toISOString()
  const urls = []

  // Root
  urls.push(url(buildAbsoluteUrl('/'), '1.0', 'daily'))

  // Static per language routes
  for (const lang of langs) {
    urls.push(url(buildAbsoluteUrl(`/${lang}`), '0.9', 'weekly'))
    urls.push(url(buildAbsoluteUrl(`/${lang}/about`), '0.6', 'monthly'))
    urls.push(url(buildAbsoluteUrl(`/${lang}/contact`), '0.6', 'monthly'))
  }

  // Collection and work detail routes from works.json
  const raw = fs.readFileSync(worksPath, 'utf-8')
  const works = JSON.parse(raw)
  const collectionIds = new Set()

  for (const w of works) {
    if (!w?.published) continue
    const workId = w.id
    for (const lang of langs) {
      urls.push(url(buildAbsoluteUrl(`/${lang}/work/${workId}`), '0.8', 'weekly'))
    }
    if (Array.isArray(w.collections)) {
      for (const c of w.collections) {
        if (c?.id) collectionIds.add(c.id)
      }
    }
  }

  for (const cid of collectionIds) {
    for (const lang of langs) {
      urls.push(url(buildAbsoluteUrl(`/${lang}/works/${cid}`), '0.7', 'weekly'))
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>\n`

  fs.writeFileSync(outPath, xml)
  console.log(`Generated sitemap: ${outPath} (${urls.length} urls) at ${now}`)
}

main().catch((e) => {
  console.error('Failed generating sitemap:', e)
  process.exit(1)
})






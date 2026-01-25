import type { Plugin, ViteDevServer } from 'vite'
import * as fs from 'fs'
import * as path from 'path'

interface GridItem {
  id: string
  type: 'TEXT' | 'IMAGE'
  title?: string
  description?: { size?: string; text?: string }
  image?: { imgPath: string; imgAlt: string }
}

interface CollectionWork {
  id: string
  pageHeader: {
    title: string
    bgImage?: string
    classNames?: Record<string, string | string[]>
  }
  title: string
  presentation: {
    presentationDescription: string
    presentationImages: { imgPath: string; imgAlt: string }[]
    presentationType: 'oneLeft' | 'oneRight' | 'twoImages'
    classNames: Record<string, string>
  }
  workDetails: {
    mainText?: string
    smallText?: string
    gridItems: GridItem[]
  }
}

interface WorkTexts {
  title: string
  presentationDescription: string
  mainText: string
  smallText: string
  gridItemTitle: string
  gridItemSize: string
  gridItemText: string
}

// Extended type with actual text values for admin editing
interface CollectionWorkWithTexts extends CollectionWork {
  texts: WorkTexts      // Czech texts
  textsEn: WorkTexts    // English texts
}

const WORKS_FILE_PATH = './src/configuration/jeraby-works.ts'
const LOCALIZATIONS_CS_PATH = './src/localizations/loc/common/collections/jeraby/cs/jeraby.ts'
const LOCALIZATIONS_EN_PATH = './src/localizations/loc/common/collections/jeraby/en/jeraby.ts'
const IMAGES_BASE_PATH = './public/images/collections/jeraby'
const ENV_FILE_PATH = './.env'

// DeepL API configuration
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate' // Use api.deepl.com for paid plans

// Read API key from .env file
function getDeepLApiKey(): string | null {
  try {
    if (!fs.existsSync(ENV_FILE_PATH)) {
      return null
    }
    const content = fs.readFileSync(ENV_FILE_PATH, 'utf-8')
    const match = content.match(/^DEEPL_API_KEY=(.+)$/m)
    if (match && match[1] && match[1] !== 'your-api-key-here') {
      return match[1].trim()
    }
    return null
  } catch {
    return null
  }
}

function parseLocalizationsFile(filePath: string = LOCALIZATIONS_CS_PATH): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const content = fs.readFileSync(filePath, 'utf-8')

  // Extract the object content
  const match = content.match(/export default \{([\s\S]*)\}/)
  if (!match) {
    throw new Error('Could not parse localizations file')
  }

  const result: Record<string, string> = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    // Match patterns like: 'key': 'value', or 'key': "value",
    const keyValueMatch = line.match(/^\s*'([^']+)':\s*['"](.*)['"],?\s*$/)
    if (keyValueMatch) {
      result[keyValueMatch[1]] = keyValueMatch[2]
    }
  }

  return result
}

function generateLocalizationsFile(localizations: Record<string, string>): string {
  const lines: string[] = ['export default {']

  // Sort keys for consistent output
  const sortedKeys = Object.keys(localizations).sort((a, b) => {
    // Extract work number for sorting
    const getWorkNum = (key: string) => {
      const match = key.match(/jeraby-(\d+)/)
      return match ? parseInt(match[1]) : 0
    }
    return getWorkNum(b) - getWorkNum(a) // Descending order (newest first)
  })

  for (const key of sortedKeys) {
    const value = localizations[key].replace(/'/g, "\\'") // Escape single quotes
    lines.push(`  '${key}': '${value}',`)
  }

  lines.push('}')
  return lines.join('\n')
}

// DeepL translation function
async function translateWithDeepL(texts: string[], apiKey: string): Promise<string[]> {
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY is not set. Add it to your .env file.')
  }

  // Filter out empty texts and keep track of indices
  const nonEmptyTexts: { index: number; text: string }[] = []
  texts.forEach((text, index) => {
    if (text && text.trim()) {
      nonEmptyTexts.push({ index, text })
    }
  })

  if (nonEmptyTexts.length === 0) {
    return texts.map(() => '')
  }

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: nonEmptyTexts.map(t => t.text),
      source_lang: 'CS',
      target_lang: 'EN',
      preserve_formatting: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`DeepL API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  const translations = data.translations as { text: string }[]

  // Reconstruct the full array with empty strings for originally empty texts
  const result: string[] = texts.map(() => '')
  nonEmptyTexts.forEach((item, idx) => {
    result[item.index] = translations[idx]?.text || ''
  })

  return result
}

function parseWorksFile(): CollectionWork[] {
  const content = fs.readFileSync(WORKS_FILE_PATH, 'utf-8')

  const arrayStartMatch = content.match(/const jeraby:\s*CollectionWork\[\]\s*=\s*\[/)
  if (!arrayStartMatch) {
    throw new Error('Could not find jeraby array in works file')
  }

  const arrayStart = arrayStartMatch.index! + arrayStartMatch[0].length - 1

  let depth = 0
  let arrayEnd = -1
  for (let i = arrayStart; i < content.length; i++) {
    if (content[i] === '[') depth++
    if (content[i] === ']') {
      depth--
      if (depth === 0) {
        arrayEnd = i + 1
        break
      }
    }
  }

  if (arrayEnd === -1) {
    throw new Error('Could not find end of jeraby array')
  }

  const arrayContent = content.slice(arrayStart, arrayEnd)

  let jsonContent = arrayContent
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
    .replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')
    .replace(/,(\s*[}\]])/g, '$1')

  try {
    return JSON.parse(jsonContent)
  } catch (e) {
    console.error('Failed to parse works file:', e)
    throw new Error('Failed to parse works file as JSON')
  }
}

// Get actual text values for a work from localizations
function getWorkTexts(work: CollectionWork, localizations: Record<string, string>, defaultTitle: string = ''): WorkTexts {
  const id = work.id
  return {
    title: localizations[`jeraby.collection.works.${id}.title`] || defaultTitle,
    presentationDescription: localizations[`jeraby.collection.works.${id}.presentationDescription`] || '',
    mainText: localizations[`jeraby.collection.works.${id}.workDetails.main.text`] || '',
    smallText: localizations[`jeraby.collection.works.${id}.workDetails.small.text`] || '',
    gridItemTitle: localizations[`jeraby.collection.works.${id}.workDetails.gridItems.1.title`] || '',
    gridItemSize: localizations[`jeraby.collection.works.${id}.workDetails.gridItems.1.size`] || '',
    gridItemText: localizations[`jeraby.collection.works.${id}.workDetails.gridItems.1.text`] || '',
  }
}

// Update localizations for a work
function setWorkTexts(workId: string, texts: WorkTexts, localizations: Record<string, string>): void {
  if (texts.title) localizations[`jeraby.collection.works.${workId}.title`] = texts.title
  if (texts.presentationDescription) localizations[`jeraby.collection.works.${workId}.presentationDescription`] = texts.presentationDescription
  if (texts.mainText) localizations[`jeraby.collection.works.${workId}.workDetails.main.text`] = texts.mainText
  if (texts.smallText) localizations[`jeraby.collection.works.${workId}.workDetails.small.text`] = texts.smallText
  if (texts.gridItemTitle) localizations[`jeraby.collection.works.${workId}.workDetails.gridItems.1.title`] = texts.gridItemTitle
  if (texts.gridItemSize) localizations[`jeraby.collection.works.${workId}.workDetails.gridItems.1.size`] = texts.gridItemSize
  if (texts.gridItemText) localizations[`jeraby.collection.works.${workId}.workDetails.gridItems.1.text`] = texts.gridItemText
}

// Generate i18n keys for a work based on its ID
function generateWorkKeys(workId: string): Partial<CollectionWork> {
  return {
    pageHeader: {
      title: `jeraby.collection.works.${workId}.title`,
      bgImage: '/images/crane-icon-white.png',
      classNames: {
        bg: ['bg-[#6b7280]'],
        title: ['mt-[10vh]', 'md:mt-[1vh]', 'text-4xl', 'sm:text-6xl', 'text-white', 'font-semi-bold']
      }
    },
    title: `jeraby.collection.works.${workId}.title`,
    presentation: {
      presentationDescription: `jeraby.collection.works.${workId}.presentationDescription`,
      presentationImages: [],
      presentationType: 'twoImages',
      classNames: {}
    },
    workDetails: {
      mainText: `jeraby.collection.works.${workId}.workDetails.main.text`,
      smallText: `jeraby.collection.works.${workId}.workDetails.small.text`,
      gridItems: [{
        id: '1',
        type: 'TEXT',
        title: `jeraby.collection.works.${workId}.workDetails.gridItems.1.title`,
        description: {
          size: `jeraby.collection.works.${workId}.workDetails.gridItems.1.size`,
          text: `jeraby.collection.works.${workId}.workDetails.gridItems.1.text`
        }
      }]
    }
  }
}

function serializeWork(work: CollectionWork, indent: string = '  '): string {
  const lines: string[] = []
  lines.push(`${indent}{`)
  lines.push(`${indent}  id: '${work.id}',`)
  lines.push(`${indent}  `)

  // pageHeader
  lines.push(`${indent}  pageHeader: {`)
  lines.push(`${indent}    title: '${work.pageHeader.title}',`)
  if (work.pageHeader.bgImage) {
    lines.push(`${indent}    bgImage: '${work.pageHeader.bgImage}',`)
  }
  if (work.pageHeader.classNames) {
    lines.push(`${indent}    classNames: {`)
    for (const [key, value] of Object.entries(work.pageHeader.classNames)) {
      if (Array.isArray(value)) {
        lines.push(`${indent}      '${key}': [${value.map(v => `'${v}'`).join(', ')}],`)
      } else {
        lines.push(`${indent}      '${key}': '${value}',`)
      }
    }
    lines.push(`${indent}    }`)
  }
  lines.push(`${indent}  },`)

  lines.push(`${indent}  title: '${work.title}',`)
  lines.push(`${indent}  `)

  // presentation
  lines.push(`${indent}  presentation: {`)
  lines.push(`${indent}    presentationDescription: '${work.presentation.presentationDescription}',`)
  lines.push(`${indent}    presentationImages: [${work.presentation.presentationImages.map(img => `{
${indent}      imgPath: '${img.imgPath}',
${indent}      imgAlt: '${img.imgAlt}',
${indent}    }`).join(', ')}],`)
  lines.push(`${indent}    presentationType: '${work.presentation.presentationType}',`)
  lines.push(`${indent}    classNames: {`)
  for (const [key, value] of Object.entries(work.presentation.classNames || {})) {
    lines.push(`${indent}      '${key}': '${value}',`)
  }
  lines.push(`${indent}    },`)
  lines.push(`${indent}  },`)

  // workDetails
  lines.push(`${indent}  workDetails: {`)
  if (work.workDetails.mainText) {
    lines.push(`${indent}    mainText: '${work.workDetails.mainText}',`)
  }
  if (work.workDetails.smallText) {
    lines.push(`${indent}    smallText: '${work.workDetails.smallText}',`)
  }
  lines.push(`${indent}    gridItems: [`)
  for (const item of work.workDetails.gridItems) {
    lines.push(`${indent}    {`)
    lines.push(`${indent}      id: '${item.id}',`)
    lines.push(`${indent}      type: '${item.type}',`)
    if (item.title) {
      lines.push(`${indent}      title: '${item.title}',`)
    }
    if (item.description) {
      lines.push(`${indent}      description: {`)
      if (item.description.size) {
        lines.push(`${indent}        size: '${item.description.size}',`)
      }
      if (item.description.text) {
        lines.push(`${indent}        text: '${item.description.text}',`)
      }
      lines.push(`${indent}      },`)
    }
    if (item.image) {
      lines.push(`${indent}      image: {`)
      lines.push(`${indent}        imgPath: '${item.image.imgPath}',`)
      lines.push(`${indent}        imgAlt: '${item.image.imgAlt}',`)
      lines.push(`${indent}      },`)
    }
    lines.push(`${indent}    }, `)
  }
  lines.push(`${indent}    ]`)
  lines.push(`${indent}  }`)
  lines.push(`${indent}}`)

  return lines.join('\n')
}

function generateWorksFile(works: CollectionWork[]): string {
  const lines: string[] = []
  lines.push(`import { CollectionWork } from "../types/index"`)
  lines.push('')
  lines.push('const jeraby: CollectionWork[] = [')

  for (let i = 0; i < works.length; i++) {
    lines.push(serializeWork(works[i]))
    if (i < works.length - 1) {
      lines.push(',')
    }
  }

  lines.push(']')
  lines.push('export default jeraby')
  lines.push('')

  return lines.join('\n')
}

async function parseMultipartFormData(req: any): Promise<{ fields: Record<string, string>, files: { fieldname: string, filename: string, data: Buffer }[] }> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => {
      const body = Buffer.concat(chunks)
      const contentType = req.headers['content-type'] || ''
      const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/)

      if (!boundaryMatch) {
        reject(new Error('No boundary found in content-type'))
        return
      }

      const boundary = boundaryMatch[1] || boundaryMatch[2]
      const parts = body.toString('binary').split(`--${boundary}`)

      const fields: Record<string, string> = {}
      const files: { fieldname: string, filename: string, data: Buffer }[] = []

      for (const part of parts) {
        if (part.trim() === '' || part.trim() === '--') continue

        const headerEnd = part.indexOf('\r\n\r\n')
        if (headerEnd === -1) continue

        const headers = part.slice(0, headerEnd)
        const content = part.slice(headerEnd + 4).replace(/\r\n$/, '')

        const nameMatch = headers.match(/name="([^"]+)"/)
        const filenameMatch = headers.match(/filename="([^"]+)"/)

        if (nameMatch) {
          if (filenameMatch) {
            files.push({
              fieldname: nameMatch[1],
              filename: filenameMatch[1],
              data: Buffer.from(content, 'binary')
            })
          } else {
            fields[nameMatch[1]] = content
          }
        }
      }

      resolve({ fields, files })
    })
    req.on('error', reject)
  })
}

export default function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api',
    configureServer(server: ViteDevServer) {
      // GET works with texts (both Czech and English)
      server.middlewares.use('/__admin/api/works', async (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }

        try {
          const works = parseWorksFile()
          const csLocalizations = parseLocalizationsFile(LOCALIZATIONS_CS_PATH)
          const enLocalizations = parseLocalizationsFile(LOCALIZATIONS_EN_PATH)

          // Combine works with their text values (Czech and English)
          const worksWithTexts: CollectionWorkWithTexts[] = works.map(work => ({
            ...work,
            texts: getWorkTexts(work, csLocalizations, ''),
            textsEn: getWorkTexts(work, enLocalizations, '')
          }))

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(worksWithTexts))
        } catch (e) {
          console.error('Error loading works:', e)
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })

      // POST works (save) - also saves localizations (both Czech and English)
      server.middlewares.use('/__admin/api/works', async (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(chunk)
          }
          const body = Buffer.concat(chunks).toString()
          const worksWithTexts: CollectionWorkWithTexts[] = JSON.parse(body)

          // Load existing localizations
          const csLocalizations = parseLocalizationsFile(LOCALIZATIONS_CS_PATH)
          const enLocalizations = parseLocalizationsFile(LOCALIZATIONS_EN_PATH)
          const works: CollectionWork[] = []

          for (const workWithTexts of worksWithTexts) {
            const { texts, textsEn, ...work } = workWithTexts

            // Update i18n keys to match the work ID (in case ID was changed)
            work.pageHeader.title = `jeraby.collection.works.${work.id}.title`
            work.title = `jeraby.collection.works.${work.id}.title`
            work.presentation.presentationDescription = `jeraby.collection.works.${work.id}.presentationDescription`
            if (work.workDetails.mainText) {
              work.workDetails.mainText = `jeraby.collection.works.${work.id}.workDetails.main.text`
            }
            if (work.workDetails.smallText) {
              work.workDetails.smallText = `jeraby.collection.works.${work.id}.workDetails.small.text`
            }

            // Update first grid item (TEXT type) keys
            const textGridItem = work.workDetails.gridItems.find(item => item.type === 'TEXT')
            if (textGridItem) {
              textGridItem.title = `jeraby.collection.works.${work.id}.workDetails.gridItems.1.title`
              if (textGridItem.description) {
                textGridItem.description.size = `jeraby.collection.works.${work.id}.workDetails.gridItems.1.size`
                textGridItem.description.text = `jeraby.collection.works.${work.id}.workDetails.gridItems.1.text`
              }
            }

            // Update image grid items alt texts
            for (const item of work.workDetails.gridItems) {
              if (item.type === 'IMAGE' && item.image) {
                item.image.imgAlt = `jeraby.collection.works.${work.id}.workDetails.${work.id}/${item.id}.imgAlt`
              }
            }

            // Update presentation images alt texts
            work.presentation.presentationImages.forEach((img, idx) => {
              img.imgAlt = `jeraby.collection.works.${work.id}.presentationImages.${idx + 1}.imgAlt`
            })

            works.push(work)

            // Update Czech localizations with actual text values
            if (texts) {
              setWorkTexts(work.id, texts, csLocalizations)
            }

            // Update English localizations with actual text values
            if (textsEn) {
              setWorkTexts(work.id, textsEn, enLocalizations)
            }
          }

          // Save works file
          const worksFileContent = generateWorksFile(works)
          fs.writeFileSync(WORKS_FILE_PATH, worksFileContent, 'utf-8')

          // Save Czech localizations file
          const csLocFileContent = generateLocalizationsFile(csLocalizations)
          fs.writeFileSync(LOCALIZATIONS_CS_PATH, csLocFileContent, 'utf-8')

          // Save English localizations file (ensure collection title exists)
          if (!enLocalizations['jeraby.collection.title']) {
            enLocalizations['jeraby.collection.title'] = 'Cranes'
          }
          const enLocFileContent = generateLocalizationsFile(enLocalizations)
          fs.writeFileSync(LOCALIZATIONS_EN_PATH, enLocFileContent, 'utf-8')

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
        } catch (e) {
          console.error('Error saving works:', e)
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })

      // POST upload image
      server.middlewares.use('/__admin/api/upload', async (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          const { fields, files } = await parseMultipartFormData(req)
          const workId = fields.workId

          if (!workId) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'workId is required' }))
            return
          }

          const workDir = path.join(IMAGES_BASE_PATH, workId)

          if (!fs.existsSync(workDir)) {
            fs.mkdirSync(workDir, { recursive: true })
          }

          const existingFiles = fs.readdirSync(workDir)
          const numbers = existingFiles
            .map(f => parseInt(f.match(/^(\d+)\./)?.[1] || '0'))
            .filter(n => !isNaN(n))
          const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1

          const uploadedPaths: string[] = []

          for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const ext = path.extname(file.filename) || '.jpg'
            const newFilename = `${nextNumber + i}${ext}`
            const filePath = path.join(workDir, newFilename)

            fs.writeFileSync(filePath, file.data)
            uploadedPaths.push(`/images/collections/jeraby/${workId}/${newFilename}`)
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, paths: uploadedPaths }))
        } catch (e) {
          console.error('Upload error:', e)
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })

      // GET existing images for a work
      server.middlewares.use('/__admin/api/images', async (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }

        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`)
          const workId = url.searchParams.get('workId')

          if (!workId) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'workId is required' }))
            return
          }

          const workDir = path.join(IMAGES_BASE_PATH, workId)

          if (!fs.existsSync(workDir)) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ images: [] }))
            return
          }

          const files = fs.readdirSync(workDir)
            .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
            .map(f => `/images/collections/jeraby/${workId}/${f}`)

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ images: files }))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })

      // GET env config - check if API key is configured in .env
      server.middlewares.use('/__admin/api/env-config', async (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }

        const envKey = getDeepLApiKey()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          hasDeepLKey: !!envKey,
          keyPreview: envKey ? `${envKey.slice(0, 8)}...` : null
        }))
      })

      // POST translate - Translate Czech texts to English using DeepL
      server.middlewares.use('/__admin/api/translate', async (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(chunk)
          }
          const body = Buffer.concat(chunks).toString()
          const { workIds, apiKey: providedKey } = JSON.parse(body) as { workIds: string[], apiKey?: string }

          // Use .env key if available, otherwise use provided key
          const apiKey = getDeepLApiKey() || providedKey

          if (!apiKey) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'DeepL API key is required. Add DEEPL_API_KEY to .env file or enter it manually.' }))
            return
          }

          if (!workIds || workIds.length === 0) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'No work IDs provided' }))
            return
          }

          // Load Czech localizations
          const csLocalizations = parseLocalizationsFile(LOCALIZATIONS_CS_PATH)
          const enLocalizations = parseLocalizationsFile(LOCALIZATIONS_EN_PATH)

          // Collect all texts to translate for the specified works
          const textsToTranslate: { key: string; text: string }[] = []

          for (const workId of workIds) {
            const keys = [
              `jeraby.collection.works.${workId}.title`,
              `jeraby.collection.works.${workId}.presentationDescription`,
              `jeraby.collection.works.${workId}.workDetails.main.text`,
              `jeraby.collection.works.${workId}.workDetails.small.text`,
              `jeraby.collection.works.${workId}.workDetails.gridItems.1.title`,
              `jeraby.collection.works.${workId}.workDetails.gridItems.1.size`,
              `jeraby.collection.works.${workId}.workDetails.gridItems.1.text`,
            ]

            for (const key of keys) {
              const csText = csLocalizations[key]
              if (csText) {
                textsToTranslate.push({ key, text: csText })
              }
            }
          }

          if (textsToTranslate.length === 0) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, translated: 0 }))
            return
          }

          // Translate using DeepL
          const translations = await translateWithDeepL(
            textsToTranslate.map(t => t.text),
            apiKey
          )

          // Update English localizations
          textsToTranslate.forEach((item, idx) => {
            if (translations[idx]) {
              enLocalizations[item.key] = translations[idx]
            }
          })

          // Ensure collection title exists
          if (!enLocalizations['jeraby.collection.title']) {
            enLocalizations['jeraby.collection.title'] = 'Cranes'
          }

          // Save English localizations file
          const enFileContent = generateLocalizationsFile(enLocalizations)
          fs.writeFileSync(LOCALIZATIONS_EN_PATH, enFileContent, 'utf-8')

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            success: true,
            translated: textsToTranslate.length,
            works: workIds
          }))
        } catch (e) {
          console.error('Translation error:', e)
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })

      // GET translation status - check which works have English translations
      server.middlewares.use('/__admin/api/translation-status', async (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }

        try {
          const enLocalizations = parseLocalizationsFile(LOCALIZATIONS_EN_PATH)
          const works = parseWorksFile()

          const status: Record<string, boolean> = {}
          for (const work of works) {
            const key = `jeraby.collection.works.${work.id}.title`
            status[work.id] = !!enLocalizations[key]
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status }))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(e) }))
        }
      })
    }
  }
}

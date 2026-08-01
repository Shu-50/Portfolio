import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync, mkdirSync, unlinkSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const CONTENT_FILE = resolve(root, 'src/data/defaultContent.js')
const UPLOADS_DIR = resolve(root, 'public/uploads')

const readBody = (req) =>
  new Promise((res, rej) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => res(Buffer.concat(chunks)))
    req.on('error', rej)
  })

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '') || 'file'

const json = (res, code, obj) => {
  res.statusCode = code
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(obj))
}

/**
 * Dev-only content API — this is what lets /dev edit the site with no database.
 * Saves write src/data/defaultContent.js, uploads land in public/uploads/.
 * Only exists under `npm run dev`; the deployed site is read-only.
 */
function devContentApi() {
  return {
    name: 'dev-content-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__dev-api', async (req, res) => {
        try {
          const url = new URL(req.url, 'http://x')

          if (req.method === 'POST' && url.pathname === '/save-content') {
            const content = JSON.parse((await readBody(req)).toString('utf8'))
            if (!content || typeof content !== 'object' || !content.profile) {
              return json(res, 400, { error: 'Invalid content payload' })
            }
            const banner =
              '// THE content of the site — /dev edits save directly into this file.\n' +
              `// Last saved from the dev panel: ${new Date().toISOString()}\n` +
              '// Publish by committing this file (plus any new files in public/uploads).\n'
            writeFileSync(
              CONTENT_FILE,
              `${banner}\nconst defaultContent = ${JSON.stringify(content, null, 2)};\n\nexport default defaultContent;\n`
            )
            return json(res, 200, { ok: true })
          }

          if (req.method === 'POST' && url.pathname === '/upload') {
            const folder = slug(url.searchParams.get('folder') || 'misc')
            const name = slug(url.searchParams.get('name') || 'file')
            const body = await readBody(req)
            if (!body.length) return json(res, 400, { error: 'Empty file' })
            const dir = resolve(UPLOADS_DIR, folder)
            mkdirSync(dir, { recursive: true })
            const fileName = `${Date.now()}-${name}`
            writeFileSync(resolve(dir, fileName), body)
            return json(res, 200, { url: `/uploads/${folder}/${fileName}` })
          }

          if (req.method === 'POST' && url.pathname === '/delete-asset') {
            const { url: assetUrl } = JSON.parse((await readBody(req)).toString('utf8'))
            // Only files we uploaded may be deleted — never /gallery, /Resume.pdf etc.
            if (typeof assetUrl === 'string' && assetUrl.startsWith('/uploads/')) {
              const target = resolve(root, 'public', ...assetUrl.slice(1).split('/'))
              if (target.startsWith(UPLOADS_DIR) && existsSync(target)) unlinkSync(target)
            }
            return json(res, 200, { ok: true })
          }

          json(res, 404, { error: 'Unknown dev-api route' })
        } catch (err) {
          json(res, 500, { error: err.message })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devContentApi()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Keep the heavy libraries out of the entry chunk so the page paints fast
        // on mobile — three/drei only arrive with the background.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/three|@react-three|@react-spring/.test(id)) return 'vendor-three'
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'vendor-motion'
          if (/react-router/.test(id)) return 'vendor-router'
          if (/react-dom|scheduler/.test(id)) return 'vendor-react'
        },
      },
    },
  },
})

/**
 * lib/architecture/page-store.ts
 *
 * Per-page content store.
 *
 * KEY ARCHITECTURE DECISIONS:
 *
 * 1. Each page's content is stored as a standalone entry keyed by pageId.
 *    There is NO giant "all docs" object.  This means:
 *    - Fetching page X does not load pages Y or Z.
 *    - Saving page X does not touch pages Y or Z.
 *    - At scale (1000+ pages), this is critical for performance.
 *
 * 2. Content is pure Plate.js JSON — no heading IDs stored.
 *    Heading anchors are generated dynamically at render time from text.
 *    (see helpers.ts → generateHeadingId)
 *
 * 3. This mock uses an in-memory Map.
 *    In production: replace the Map with API calls to your backend.
 *    The function signatures (getPageContent / savePageContent) stay the same.
 */

import type { DocPage, PlateContent } from './types'
import { PROJECT_ID } from './nav-tree'

// ─── Initial mock content ────────────────────────────────────────────────────

const INITIAL_PAGES: DocPage[] = [
  {
    id: 'page_customize_overview',
    projectId: PROJECT_ID,
    slug: 'customize/overview',
    title: 'Overview',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'Customization Overview' }] },
      { type: 'p', children: [{ text: 'Hyperdocs gives you full control over the look and feel of your documentation site.' }] },
      { type: 'h2', children: [{ text: 'What you can customize' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Fonts — system fonts or custom web fonts' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Colors — primary brand color, backgrounds, borders' }] },
      { type: 'p', indent: 1, listStyleType: 'disc', children: [{ text: 'Logo — SVG or raster image' }] },
    ],
  },
  {
    id: 'page_customize_fonts',
    projectId: PROJECT_ID,
    slug: 'customize/fonts',
    title: 'Fonts',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'Fonts' }] },
      { type: 'p', children: [{ text: 'Configure the typography for your docs site.' }] },
      { type: 'h2', children: [{ text: 'System Fonts' }] },
      { type: 'p', children: [{ text: 'By default, Hyperdocs uses the system font stack for fast loading with no extra network requests.' }] },
      { type: 'h2', children: [{ text: 'Local Fonts' }] },
      { type: 'p', children: [{ text: 'You can bundle a local font using Next.js localFont or @font-face.' }] },
      {
        type: 'code_block',
        lang: 'json',
        children: [
          { type: 'code_line', children: [{ text: '"fonts": {' }] },
          { type: 'code_line', children: [{ text: '  "sans": "Inter",' }] },
          { type: 'code_line', children: [{ text: '  "mono": "JetBrains Mono"' }] },
          { type: 'code_line', children: [{ text: '}' }] },
        ],
      },
      { type: 'h2', children: [{ text: 'Google Fonts' }] },
      { type: 'p', children: [{ text: 'Specify any Google Font by name. Hyperdocs will load it automatically.' }] },
    ],
  },
  {
    id: 'page_customize_colors',
    projectId: PROJECT_ID,
    slug: 'customize/colors',
    title: 'Colors',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'Colors' }] },
      { type: 'p', children: [{ text: 'Set your brand color and Hyperdocs will generate a consistent palette.' }] },
      { type: 'h2', children: [{ text: 'Primary Color' }] },
      { type: 'p', children: [{ text: 'The primary color is used for active nav items, links, and call-to-action buttons.' }] },
      {
        type: 'code_block',
        lang: 'json',
        children: [
          { type: 'code_line', children: [{ text: '"colors": {' }] },
          { type: 'code_line', children: [{ text: '  "primary": "#f26522"' }] },
          { type: 'code_line', children: [{ text: '}' }] },
        ],
      },
    ],
  },
  {
    id: 'page_api_authentication',
    projectId: PROJECT_ID,
    slug: 'api/authentication',
    title: 'Authentication',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'Authentication' }] },
      { type: 'p', children: [{ text: 'All API requests require a Bearer token in the Authorization header.' }] },
      { type: 'h2', children: [{ text: 'API Keys' }] },
      {
        type: 'code_block',
        lang: 'bash',
        children: [
          { type: 'code_line', children: [{ text: 'curl -H "Authorization: Bearer YOUR_API_KEY" \\' }] },
          { type: 'code_line', children: [{ text: '     https://api.hyperdocs.io/v1/projects' }] },
        ],
      },
      { type: 'h2', children: [{ text: 'OAuth 2.0' }] },
      { type: 'p', children: [{ text: 'For user-facing integrations, use the OAuth 2.0 authorization code flow.' }] },
    ],
  },
  {
    id: 'page_api_endpoints',
    projectId: PROJECT_ID,
    slug: 'api/endpoints',
    title: 'Endpoints',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'API Endpoints' }] },
      { type: 'p', children: [{ text: 'Base URL: https://api.hyperdocs.io/v1' }] },
      { type: 'h2', children: [{ text: 'Projects' }] },
      { type: 'p', children: [{ text: 'GET /projects — List all projects for the authenticated user.' }] },
      { type: 'h2', children: [{ text: 'Pages' }] },
      { type: 'p', children: [{ text: 'GET /projects/:id/pages — Fetch all pages for a project.' }] },
      { type: 'p', children: [{ text: 'PUT /projects/:id/pages/:pageId — Update a single page.' }] },
    ],
  },
  {
    id: 'page_guides_quickstart',
    projectId: PROJECT_ID,
    slug: 'guides/quickstart',
    title: 'Quickstart',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'Quickstart' }] },
      { type: 'p', children: [{ text: 'Get your docs site live in under 5 minutes.' }] },
      { type: 'h2', children: [{ text: 'Step 1 — Connect your repo' }] },
      { type: 'p', children: [{ text: 'Sign in with GitHub and select the repository you want to document.' }] },
      { type: 'h2', children: [{ text: 'Step 2 — Generate docs' }] },
      { type: 'p', children: [{ text: 'Click Generate and our AI will analyse your codebase.' }] },
      { type: 'h2', children: [{ text: 'Step 3 — Publish' }] },
      { type: 'p', children: [{ text: 'Hit Publish. Your docs go live on your Hyperdocs subdomain instantly.' }] },
    ],
  },
  {
    id: 'page_guides_deployment',
    projectId: PROJECT_ID,
    slug: 'guides/deployment',
    title: 'Deployment',
    updatedAt: new Date().toISOString(),
    content: [
      { type: 'h1', children: [{ text: 'Deployment' }] },
      { type: 'p', children: [{ text: 'Hyperdocs supports multiple deployment targets.' }] },
      { type: 'h2', children: [{ text: 'Hyperdocs Cloud' }] },
      { type: 'p', children: [{ text: 'Zero-config hosted deployment. Just click Publish.' }] },
      { type: 'h2', children: [{ text: 'Self-hosted' }] },
      { type: 'p', children: [{ text: 'Export a static build and deploy to any static host (Vercel, Netlify, S3).' }] },
    ],
  },
]

// ─── In-memory store ─────────────────────────────────────────────────────────
// Replace this Map with API calls when the backend is ready.
// Function signatures below do NOT change — only the implementation swaps.

const pageStore = new Map<string, DocPage>(
  INITIAL_PAGES.map(p => [p.id, p])
)

/** Fetch a single page's content by its stable ID */
export function getPageById(pageId: string): DocPage | undefined {
  return pageStore.get(pageId)
}

/** Fetch a single page by its full URL slug (e.g. "customize/fonts") */
export function getPageBySlug(slug: string): DocPage | undefined {
  for (const page of pageStore.values()) {
    if (page.slug === slug) return page
  }
  return undefined
}

/**
 * Save ONE page's content.
 *
 * ONLY the targeted page is updated — no other pages are touched.
 * This is the autosave contract: one save call = one page update.
 * The backend equivalent would be: PUT /pages/:pageId { content }
 */
export function savePageContent(pageId: string, content: PlateContent): void {
  const existing = pageStore.get(pageId)
  if (!existing) {
    console.warn(`[HyperDocs] savePageContent: unknown pageId "${pageId}"`)
    return
  }

  const updatedAt = new Date().toISOString()
  pageStore.set(pageId, { ...existing, content, updatedAt })

  // Simulate the payload that would be sent to the backend
  const payload = { projectId: existing.projectId, pageId, content, updatedAt }

}

/** Return all pages (for debugging only — not used in production renders) */
export function getAllPages(): DocPage[] {
  return [...pageStore.values()]
}

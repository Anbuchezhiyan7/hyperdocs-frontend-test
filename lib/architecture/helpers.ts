/**
 * lib/architecture/helpers.ts
 *
 * Pure utility functions for HyperDocs frontend architecture.
 */

import type { PlateBlock, PublishPayload } from './types'
import { getPageBySlug as _getPageBySlug, savePageContent as _save } from './page-store'
import type { PlateContent } from './types'
import { PROJECT_ID } from './nav-tree'
import { apiPublishDocs } from '@/lib/api/docs'

// ─── Heading anchor generation ───────────────────────────────────────────────

/**
 * Generates a URL-safe anchor ID from a heading's text.
 *
 * WHY NOT STORE THESE IN THE DB?
 * If anchors were stored, renaming a heading would require a migration to keep
 * the old anchor alive for backwards compatibility (existing shared links would
 * break otherwise).  By generating them dynamically from the current text, the
 * anchor always reflects the actual heading — and we can add a "custom anchor"
 * escape hatch later if truly needed without polluting every heading record.
 *
 * Examples:
 *   "Local Fonts"    → "local-fonts"
 *   "OAuth 2.0"      → "oauth-2-0"
 *   "  My  Heading " → "my-heading"
 */
export function generateHeadingId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')  // replace non-alphanumeric with space
    .trim()
    .replace(/\s+/g, '-')           // collapse spaces to hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens
}

/**
 * Extracts all headings from a Plate.js content array and returns
 * { text, level, id } for building the "On this page" table of contents.
 *
 * Anchors are generated here at render time — never stored.
 */
export function extractHeadings(content: PlateContent): Array<{ id: string; text: string; level: 1 | 2 | 3 }> {
  const headings: Array<{ id: string; text: string; level: 1 | 2 | 3 }> = []

  for (const block of content) {
    if (block.type === 'h1' || block.type === 'h2' || block.type === 'h3') {
      const text = extractText(block)
      if (text) {
        headings.push({
          id: generateHeadingId(text),
          text,
          level: Number(block.type[1]) as 1 | 2 | 3,
        })
      }
    }
  }

  return headings
}

/** Recursively extracts plain text from a Plate block tree */
function extractText(node: PlateBlock | { text: string }): string {
  if ('text' in node) return node.text as string
  return ((node as PlateBlock).children ?? []).map(c => extractText(c as PlateBlock)).join('')
}

// ─── Page lookup ─────────────────────────────────────────────────────────────

/**
 * Get a page by its full URL slug.
 *
 * Examples:
 *   getPageBySlug('customize/fonts')     → DocPage | undefined
 *   getPageBySlug('api/authentication')  → DocPage | undefined
 */
export function getPageBySlug(slug: string) {
  // Normalise: strip leading slash if present
  const clean = slug.replace(/^\//, '')
  const page = _getPageBySlug(clean)

  if (page) {
    const headings = extractHeadings(page.content)

  } else {
    console.warn(`[HyperDocs] getPageBySlug: no page found for slug "${clean}"`)
  }

  return page
}

// ─── Save ────────────────────────────────────────────────────────────────────

/**
 * Autosave a single page.
 *
 * This ONLY updates the specified page — no other pages are affected.
 * In production this fires after a debounce (e.g. 1 second after last keystroke).
 */
export function savePageContent(pageId: string, content: PlateContent): void {

  _save(pageId, content)
}

// ─── Publish ─────────────────────────────────────────────────────────────────

/**
 * Publish the project.
 *
 * WHY ONLY SEND projectId?
 *
 * The backend already has the authoritative content — it should never trust
 * a client payload containing the full doc tree (security + consistency risk).
 * Sending only the projectId tells the backend: "the user has finished editing,
 * please build and deploy whatever is in your store for this project."
 *
 * This also keeps the publish request tiny and fast regardless of doc size.
 * A 1000-page site publishes with the exact same payload as a 1-page site.
 */
export async function publishProject(projectId: string = PROJECT_ID): Promise<void> {
  await apiPublishDocs()
}

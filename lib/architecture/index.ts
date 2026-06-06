/**
 * lib/architecture/index.ts
 *
 * Public API for the HyperDocs frontend architecture layer.
 * Import from here — not from individual files.
 *
 * Example:
 *   import { getPageBySlug, savePageContent, publishProject } from '@/lib/architecture'
 */

// Types
export type { DocPage, NavNode, PlateBlock, PlateContent, PlateText, SavePagePayload, PublishPayload } from './types'

// Navigation
export { NAV_NODES_FLAT, buildNavTree, getFullSlug, PROJECT_ID } from './nav-tree'

// Page content
export { getPageById, getPageBySlug as getPageBySlugRaw, getAllPages } from './page-store'

// Helpers (primary public API)
export { generateHeadingId, extractHeadings, getPageBySlug, savePageContent, publishProject } from './helpers'


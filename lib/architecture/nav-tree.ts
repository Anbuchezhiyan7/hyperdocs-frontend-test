/**
 * lib/architecture/nav-tree.ts
 *
 * Mock navigation tree.
 *
 * This is the ONLY thing the sidebar needs to render.
 * Notice there is zero content here — just IDs, slugs, titles, ordering.
 * In production this would come from a single lightweight API call like:
 *   GET /api/projects/:projectId/nav
 */

import type { NavNode } from './types'

export const PROJECT_ID = 'proj_hyperdocs_demo'

/**
 * Flat representation — each node knows its parentId.
 * This is how it would be stored in a database (no recursive nesting).
 * Use buildNavTree() to convert to the nested tree the sidebar renders.
 */
export const NAV_NODES_FLAT: NavNode[] = [
  // ── Customize ──────────────────────────────────────────────────────────
  {
    id: 'folder_customize',
    slug: 'customize',
    title: 'Customize',
    type: 'folder',
    order: 0,
    parentId: null,
  },
  {
    id: 'page_customize_overview',
    slug: 'overview',
    title: 'Overview',
    type: 'page',
    order: 0,
    parentId: 'folder_customize',
  },
  {
    id: 'page_customize_fonts',
    slug: 'fonts',
    title: 'Fonts',
    type: 'page',
    order: 1,
    parentId: 'folder_customize',
  },
  {
    id: 'page_customize_colors',
    slug: 'colors',
    title: 'Colors',
    type: 'page',
    order: 2,
    parentId: 'folder_customize',
  },

  // ── API Reference ───────────────────────────────────────────────────────
  {
    id: 'folder_api',
    slug: 'api',
    title: 'API Reference',
    type: 'folder',
    order: 1,
    parentId: null,
  },
  {
    id: 'page_api_authentication',
    slug: 'authentication',
    title: 'Authentication',
    type: 'page',
    order: 0,
    parentId: 'folder_api',
  },
  {
    id: 'page_api_endpoints',
    slug: 'endpoints',
    title: 'Endpoints',
    type: 'page',
    order: 1,
    parentId: 'folder_api',
  },

  // ── Guides ─────────────────────────────────────────────────────────────
  {
    id: 'folder_guides',
    slug: 'guides',
    title: 'Guides',
    type: 'folder',
    order: 2,
    parentId: null,
  },
  {
    id: 'page_guides_quickstart',
    slug: 'quickstart',
    title: 'Quickstart',
    type: 'page',
    order: 0,
    parentId: 'folder_guides',
  },
  {
    id: 'page_guides_deployment',
    slug: 'deployment',
    title: 'Deployment',
    type: 'page',
    order: 1,
    parentId: 'folder_guides',
  },
]

/**
 * Converts the flat node list into a nested tree for the sidebar renderer.
 *
 * In production: call this once after fetching the nav manifest,
 * memoize the result, and pass the tree to the sidebar component.
 */
export function buildNavTree(nodes: NavNode[] = NAV_NODES_FLAT): NavNode[] {
  const map = new Map<string, NavNode>()
  const roots: NavNode[] = []

  // Clone nodes so we don't mutate the source
  nodes.forEach(n => map.set(n.id, { ...n, children: n.type === 'folder' ? [] : undefined }))

  map.forEach(node => {
    if (node.parentId === null) {
      roots.push(node)
    } else {
      const parent = map.get(node.parentId)
      if (parent?.children) parent.children.push(node)
    }
  })

  // Sort by order at each level
  const sort = (list: NavNode[]) => {
    list.sort((a, b) => a.order - b.order)
    list.forEach(n => n.children && sort(n.children))
  }
  sort(roots)

  return roots
}

/**
 * Returns the full URL slug for a page node by walking up the parent chain.
 *
 * Example: page_customize_fonts → "customize/fonts"
 */
export function getFullSlug(pageId: string, nodes: NavNode[] = NAV_NODES_FLAT): string {
  const nodeMap = new Map(nodes.map(n => [n.id, n]))
  const segments: string[] = []
  let current = nodeMap.get(pageId)
  while (current) {
    segments.unshift(current.slug)
    current = current.parentId ? nodeMap.get(current.parentId) : undefined
  }
  return segments.join('/')
}

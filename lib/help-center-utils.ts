import { NavItem } from '@/lib/docs-context'

export type SearchResult = {
  page: NavItem
  href: string
  breadcrumb: string[]
  fullText: string
}

export function extractText(nodes: unknown[]): string {
  if (!Array.isArray(nodes)) return ''
  let out = ''
  for (const node of nodes) {
    if (typeof node !== 'object' || node === null) continue
    const n = node as Record<string, unknown>
    if (typeof n.text === 'string') out += n.text + ' '
    if (Array.isArray(n.children)) out += extractText(n.children)
  }
  return out
}

export function buildSearchIndex(
  items: NavItem[],
  getPathSegments: (id: string) => string[]
): SearchResult[] {
  const results: SearchResult[] = []

  function traverse(list: NavItem[], ancestors: string[]) {
    for (const item of list) {
      if (item.type === 'page') {
        const segments = getPathSegments(item.id)
        results.push({
          page: item,
          href: '/' + segments.join('/'),
          breadcrumb: ancestors,
          fullText: extractText((item.content ?? []) as unknown[]),
        })
      } else if (item.type === 'folder' && item.children) {
        traverse(item.children, [...ancestors, item.title])
      }
    }
  }

  traverse(items, [])
  return results
}

function headingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/**
 * Walks the Plate.js node list and returns the ID of the heading
 * that is nearest (above) the first node whose text contains the query.
 * Falls back to the first heading on the page if no closer match is found.
 */
export function findMatchingAnchor(nodes: unknown[], query: string): string | null {
  if (!Array.isArray(nodes) || !query.trim()) return null
  const lower = query.toLowerCase()
  let lastHeadingId: string | null = null
  let firstHeadingId: string | null = null

  for (const node of nodes) {
    if (typeof node !== 'object' || node === null) continue
    const n = node as Record<string, unknown>
    const type = n.type as string | undefined

    if (type === 'h1' || type === 'h2' || type === 'h3') {
      const children = (n.children ?? []) as Record<string, unknown>[]
      const text = children.map((c) => c.text ?? '').join('')
      const id = headingId(text)
      lastHeadingId = id
      if (firstHeadingId === null) firstHeadingId = id
      if (text.toLowerCase().includes(lower)) return id
    } else {
      const nodeText = extractText([node])
      if (nodeText.toLowerCase().includes(lower)) return lastHeadingId
    }
  }

  return firstHeadingId
}

export function getSnippet(text: string, query: string): string {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text.slice(0, 130).trim()
  const start = Math.max(0, idx - 40)
  const end = Math.min(text.length, idx + 100)
  return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '')
}

export function getFirstPageHref(
  folder: NavItem,
  getPathSegments: (id: string) => string[]
): string | null {
  if (!folder.children) return null
  for (const child of folder.children) {
    if (child.type === 'page') {
      return '/' + getPathSegments(child.id).join('/')
    }
    if (child.type === 'folder') {
      const res = getFirstPageHref(child, getPathSegments)
      if (res) return res
    }
  }
  return null
}

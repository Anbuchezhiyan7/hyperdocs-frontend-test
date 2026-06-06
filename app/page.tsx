import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCachedPublicDocs } from '@/lib/server-cache'
import type { NavItem } from '@/lib/docs-context'

/** Server-safe helper — finds the first page path in the nav tree */
function getFirstPagePath(items: NavItem[]): string | null {
  function firstPage(list: NavItem[]): NavItem | null {
    for (const item of list) {
      if (item.type === 'page') return item
      if (item.children) {
        const found = firstPage(item.children)
        if (found) return found
      }
    }
    return null
  }
  function getSegs(list: NavItem[], targetId: string, prefix: string[] = []): string[] | null {
    for (const item of list) {
      const current = [...prefix, item.slug]
      if (item.id === targetId) return current
      if (item.children) {
        const found = getSegs(item.children, targetId, current)
        if (found) return found
      }
    }
    return null
  }
  const page = firstPage(items)
  if (!page) return null
  const segs = getSegs(items, page.id)
  return segs ? segs.join('/') : null
}

export default async function RootPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('hd_user_id')?.value

  const docs = userId ? await getCachedPublicDocs(userId) : null

  const path = (docs && docs.length > 0 ? getFirstPagePath(docs) : null) ?? 'getting-started/introduction'
  redirect('/' + path)
}

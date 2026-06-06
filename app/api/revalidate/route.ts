import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { CACHE_TAG_PUBLIC_DOCS, CACHE_TAG_SITE_SETTINGS } from '@/lib/server-cache'

export async function POST(req: Request) {
  const { tag } = await req.json().catch(() => ({}))
  if (tag === 'site-settings') {
    revalidateTag(CACHE_TAG_SITE_SETTINGS, { expire: 0 })
  } else {
    revalidateTag(CACHE_TAG_PUBLIC_DOCS, { expire: 0 })
  }
  // Also bust the Next.js router client cache for the entire layout tree,
  // so the next full-page navigation picks up fresh initialDocs from the server.
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, ts: Date.now() })
}

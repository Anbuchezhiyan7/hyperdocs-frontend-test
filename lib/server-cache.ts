import { unstable_cache } from 'next/cache'
import { fetchPublicDocs } from '@/lib/api/docs'
import { fetchSettings } from '@/lib/api/settings'

export const CACHE_TAG_PUBLIC_DOCS = 'public-docs'
export const CACHE_TAG_SITE_SETTINGS = 'public-settings'

/**
 * Cached version of fetchPublicDocs.
 * Keyed by userId, tagged with 'public-docs'.
 * Revalidated immediately when /api/revalidate is called after publish.
 */
export const getCachedPublicDocs = (userId: string) =>
  unstable_cache(
    () => fetchPublicDocs(userId),
    ['public-docs', userId],
    { tags: [CACHE_TAG_PUBLIC_DOCS], revalidate: 3600 }
  )()

/**
 * Cached version of fetchSettings.
 * Keyed by userId, tagged with 'site-settings'.
 */
export const getCachedSettings = (userId: string) =>
  unstable_cache(
    () => fetchSettings(userId),
    ['site-settings', userId],
    { tags: [CACHE_TAG_SITE_SETTINGS], revalidate: 3600 }
  )()

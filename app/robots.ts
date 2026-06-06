import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { isPlatformDomain } from '@/lib/seo'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isPlatform = isPlatformDomain(host)

  if (isPlatform) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  }
}

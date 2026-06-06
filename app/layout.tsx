import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import './globals.css'
import { DocsProvider } from '@/lib/docs-context'
import { ThemeProvider } from '@/lib/theme-context'
import { NavConfigProvider } from '@/lib/nav-config-context'
import { SiteConfigProvider } from '@/lib/site-config-context'
import { DocRouterProvider } from '@/lib/doc-router'
import { QueryProvider } from '@/lib/query-provider'
import { mapSettingsToNavConfig, mapSettingsToSiteConfig } from '@/lib/settings-utils'
import { getCachedPublicDocs, getCachedSettings } from '@/lib/server-cache'
import { isPlatformDomain } from '@/lib/seo'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const plusJakartaSans = Plus_Jakarta_Sans({ variable: '--font-admin', subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isPlatform = isPlatformDomain(host)

  const baseMetadata: Metadata = {
    title: 'Hyperdocs | Public Documentation Software for SaaS Teams',
    description: 'Hyperdocs is public documentation software for Product docs, API Docs and Help centers. Built to be easy to write, read and maintain',
    icons: { icon: '/images/favicon.png' },
  }

  if (isPlatform) {
    return {
      ...baseMetadata,
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    }
  }

  return {
    ...baseMetadata,
    robots: {
      index: true,
      follow: true,
    },
  }
}


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('hd_user_id')?.value

  const settings = userId ? await getCachedSettings(userId) : null
  const initialNavConfig = settings ? mapSettingsToNavConfig(settings) : undefined
  const initialSiteConfig = settings ? mapSettingsToSiteConfig(settings) : undefined
  const accentColor = settings?.general?.accent_color ?? null

  // Seed initial docs from server cache — TanStack Query persister takes over client-side.
  const initialDocs = userId ? await getCachedPublicDocs(userId) : null

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${plusJakartaSans.variable} h-full`}
      style={accentColor ? ({ '--hd-accent': accentColor } as React.CSSProperties) : undefined}
    >
      <head>
        {initialSiteConfig?.faviconUrl && (
          <link rel="icon" href={initialSiteConfig.faviconUrl} />
        )}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('hd-theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})();`
        }} />
      </head>
      <body className="h-full antialiased">
        <ThemeProvider>
          <SiteConfigProvider initialData={initialSiteConfig}>
            <NavConfigProvider initialData={initialNavConfig}>
              {/* QueryProvider must wrap DocsProvider so DocsProvider can use useQuery */}
              <QueryProvider initialDocs={initialDocs} userId={userId ?? null}>
                <DocsProvider initialDocs={initialDocs} userId={userId ?? null}>
                  <DocRouterProvider>
                    {children}
                  </DocRouterProvider>
                </DocsProvider>
              </QueryProvider>
            </NavConfigProvider>
          </SiteConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

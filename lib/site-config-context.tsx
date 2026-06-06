'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface SiteConfig {
  organizationName: string
  logoUrl: string        // fallback logo (no theme specificity)
  logoUrlDark: string   // logo for dark mode
  logoUrlLight: string  // logo for light mode
  logoLinkUrl: string   // href for logo in header & footer
  faviconUrl: string
  description: string
}

const DEFAULT: SiteConfig = {
  organizationName: 'Hyperdocs',
  logoUrl: '',
  logoUrlDark: '',
  logoUrlLight: '',
  logoLinkUrl: '',
  faviconUrl: '',
  description: 'A personal space to share thoughts, ideas, and insights through writing. Explore articles created to inform, express, and inspire.',
}
const STORAGE_KEY = 'hd_site_config'

interface SiteConfigContextType {
  siteConfig: SiteConfig
  setSiteConfig: (c: SiteConfig) => void
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  siteConfig: DEFAULT,
  setSiteConfig: () => {},
})

export function SiteConfigProvider({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData?: SiteConfig
}) {
  const [siteConfig, setSiteConfigState] = useState<SiteConfig>(initialData ?? DEFAULT)

  useEffect(() => {
    // Only fall back to localStorage if no server-provided initialData
    if (!initialData) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) setSiteConfigState(JSON.parse(stored))
      } catch { /* ignore */ }
    }
  }, [])

  function setSiteConfig(c: SiteConfig) {
    setSiteConfigState(c)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
    } catch { /* ignore */ }
  }

  return (
    <SiteConfigContext.Provider value={{ siteConfig, setSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  return useContext(SiteConfigContext)
}

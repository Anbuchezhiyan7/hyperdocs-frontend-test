'use client'

import React, { createContext, useContext, useState } from 'react'

export interface HeaderNavItem {
  id: string
  label: string
  url: string
}

export interface HeaderCTA {
  label: string
  url: string
  buttonColor: string
  bgColor: string
  enabled: boolean
}

export interface FooterLink {
  id: string
  label: string
  url: string
}

export interface FooterSection {
  id: string
  name: string
  links: FooterLink[]
}

export interface NavConfig {
  headerItems: HeaderNavItem[]
  headerCTA: HeaderCTA
  footerSections: FooterSection[]
}

const DEFAULT_CONFIG: NavConfig = {
  headerItems: [
    { id: 'h1', label: 'Header 1', url: 'https://hyperdocs.io' },
    { id: 'h2', label: 'Header 2', url: 'https://hyperdocs.io/blog-auto-technical-seo' },
    { id: 'h3', label: 'Header 3', url: 'https://hyperdocs.io/blog-lead-magnet' },
  ],
  headerCTA: {
    label: 'Get Started',
    url: 'https://hyperdocs.io',
    buttonColor: '#ffffff',
    bgColor: '#f26522',
    enabled: true,
  },
  footerSections: [
    {
      id: 'fs1',
      name: 'Quick Links',
      links: [
        { id: 'fl1', label: 'Footer 1', url: 'https://hyperdocs.io' },
        { id: 'fl2', label: 'Footer 2', url: 'https://hyperdocs.io/' },
        { id: 'fl3', label: 'Footer 3', url: 'https://hyperdocs.io/' },
      ],
    },
  ],
}

interface NavConfigContextType {
  config: NavConfig
  setConfig: (config: NavConfig) => void
}

const NavConfigContext = createContext<NavConfigContextType>({
  config: DEFAULT_CONFIG,
  setConfig: () => { },
})

export function NavConfigProvider({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData?: NavConfig
}) {
  const [config, setConfigState] = useState<NavConfig>(initialData ?? DEFAULT_CONFIG)

  function setConfig(newConfig: NavConfig) {
    setConfigState(newConfig)
  }

  return (
    <NavConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </NavConfigContext.Provider>
  )
}

export function useNavConfig() {
  return useContext(NavConfigContext)
}

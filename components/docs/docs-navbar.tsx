'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useNavConfig } from '@/lib/nav-config-context'
import { useSiteConfig } from '@/lib/site-config-context'
import { useTheme } from '@/lib/theme-context'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { IconMenu } from '@/components/shared/icons'
import { SearchTrigger } from '@/components/help-center/search-trigger'
import { SearchModal } from '@/components/help-center/search-modal'
import { useDocs } from '@/lib/docs-context'
import { buildSearchIndex } from '@/lib/help-center-utils'
import { useDocRouter } from '@/lib/doc-router'

export function DocsNavbar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { pathname, navigate } = useDocRouter()
  const { config } = useNavConfig()
  const { siteConfig } = useSiteConfig()
  const { resolvedTheme } = useTheme()
  const { items, getPathSegments } = useDocs()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const searchIndex = useMemo(
    () => buildSearchIndex(items, getPathSegments),
    [items, getPathSegments]
  )

  /* Ctrl+K / Cmd+K global shortcut */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e?.ctrlKey || e?.metaKey) && e?.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function navigateTo(href: string) {
    setIsSearchOpen(false)
    navigate(href)
  }

  const activeLogo = resolvedTheme === 'dark'
    ? (siteConfig.logoUrlDark || siteConfig.logoUrl)
    : (siteConfig.logoUrlLight || siteConfig.logoUrl)

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-hd-border bg-[color-mix(in_srgb,var(--hd-bg)_95%,transparent)] backdrop-blur-sm">
        {/* Left side */}
        <div className="flex flex-1 items-center">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-hd-border text-hd-muted mr-3"
            onClick={onMenuToggle}
          >
            <IconMenu />
          </button>

          {/* Logo */}
          <Link href={siteConfig.logoLinkUrl || '/'} className="flex items-center gap-2 no-underline shrink-0">
            <span className="font-bold text-sm text-hd-text">
              {siteConfig.organizationName || 'Hyperdocs'}
            </span>
            {/* {activeLogo ? (
              <img src={activeLogo} alt={siteConfig?.organizationName} className=" w-[200px] h-[40px] object-contain" />
            ) : (
              <span className="font-bold text-sm text-hd-text">{siteConfig.organizationName || 'Hyperdocs'}</span>
            )} */}
          </Link>
        </div>

        {/* Middle — Search bar */}
        <div className="flex justify-center px-4">
          <div className="w-full sm:w-[360px] hidden sm:block">
            <SearchTrigger variant="navbar" onClick={() => setIsSearchOpen(true)} />
          </div>
        </div>

        {/* Right side — Nav links, CTA, dark mode toggle */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          {/* Desktop nav links */}
          {config.headerItems.length > 0 && (
            <nav className="hidden lg:flex items-center gap-0.5 mr-2">
              {config.headerItems.map((item) => {
                const isActive = item.url.startsWith('/') && pathname.startsWith('/' + item.url.split('/')[1])
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.url.startsWith('http') ? '_blank' : undefined}
                    rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-all duration-150 hover:bg-hd-surface ${isActive
                      ? 'font-semibold text-hd-accent bg-[color-mix(in_srgb,var(--hd-accent)_8%,transparent)]'
                      : 'text-hd-text hover:text-hd-text'
                      }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
          )}

          {/* Mobile nav dropdown */}
          {config.headerItems.length > 0 && (
            <div className="relative lg:hidden">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-hd-muted hover:bg-hd-surface"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
              {mobileNavOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-hd-bg border border-hd-border rounded-lg shadow-lg py-1 z-50">
                  {config.headerItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block px-4 py-2 text-sm font-medium text-hd-text hover:bg-hd-surface no-underline"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Header CTA */}
          {config.headerCTA.enabled && (
            <a
              href={config.headerCTA.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center whitespace-nowrap px-2 py-1 sm:px-4 sm:py-1.5 rounded md:rounded-lg text-[11px] sm:text-sm font-bold no-underline transition-opacity hover:opacity-90"
              style={{ background: config.headerCTA.bgColor, color: config.headerCTA.buttonColor }}
            >
              {config.headerCTA.label}
            </a>
          )}

          {/* Mobile search trigger */}
          <button
            className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-hd-muted hover:bg-hd-surface"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <ThemeToggle />
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
        searchIndex={searchIndex}
      />
    </>
  )
}

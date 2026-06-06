'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDocs } from '@/lib/docs-context'
import { buildSearchIndex } from '@/lib/help-center-utils'
import { DocsNavbar } from '@/components/docs/docs-navbar'
import { TabBar } from '@/components/docs/nav-tabs'
import { DocsFooter } from '@/components/docs/docs-footer'
import { SearchTrigger } from '@/components/help-center/search-trigger'
import { SearchModal } from '@/components/help-center/search-modal'
import { TopicGrid } from '@/components/help-center/topic-grid'

export default function HelpCenterPage() {
  const { items, getPathSegments } = useDocs()
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const topFolders = items.filter((i) => i.type === 'folder')

  const searchIndex = useMemo(
    () => buildSearchIndex(items, getPathSegments),
    [items, getPathSegments]
  )

  /* Ctrl+K / Cmd+K global shortcut */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function navigateTo(href: string) {
    setIsSearchOpen(false)
    router.push(href)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--hd-bg)',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "var(--font-inter, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",
      }}
    >
      <DocsNavbar onMenuToggle={() => {}} />
      <TabBar />

      <main style={{ flex: 1, padding: '0 24px 80px' }}>
        {/* Hero */}
        <div
          style={{
            textAlign: 'center',
            padding: '72px 24px 48px',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontSize: '34px',
              fontWeight: 700,
              color: 'var(--hd-text)',
              margin: '0 0 12px',
              letterSpacing: '-0.02em',
            }}
          >
            Help Center
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--hd-text-soft)',
              margin: '0 0 32px',
              lineHeight: '1.6',
            }}
          >
            Browse the docs or search for anything to get started quickly.
          </p>

          <SearchTrigger onClick={() => setIsSearchOpen(true)} />
        </div>

        {/* Topic grid */}
        <TopicGrid
          folders={topFolders}
          getPathSegments={getPathSegments}
          onNavigate={navigateTo}
        />
      </main>

      <DocsFooter />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
        searchIndex={searchIndex}
      />
    </div>
  )
}

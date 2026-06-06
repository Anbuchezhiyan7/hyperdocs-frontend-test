'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import { AdminNav } from '@/components/admin/admin-nav'
import { EditorSidebar } from '@/components/admin/editor-sidebar'
import { DocsProvider } from '@/lib/docs-context'
import { PublishPanel } from '@/components/admin/publish-panel'
import { useChangelogStore } from '@/lib/store/useChangelogStore'
import { useQuery } from '@tanstack/react-query'
import { apiGetSettings } from '@/lib/api/auth'



type Section = 'dashboard' | 'home' | 'editor' | 'domain' | 'git' | 'git-sync' | 'settings' | 'general' | 'navigation' | 'changelog' | 'analytics' | 'help-center'

/* ------------------------------------------------------------------ */
/*  Dummy panels for Domain & Settings                                  */
/* ------------------------------------------------------------------ */

import { useAppStore } from '@/lib/store/useAppStore'
import { useHomeStore } from '@/lib/store/useHomeStore'
import { NotificationBell } from '@/components/admin/notification-bell'
import { ViewDocsButton } from '@/components/admin/view-docs-button'
import { EditorOverlay } from '@/components/admin/editor-overlay'
import { GitSyncWebSocket } from '@/components/admin/git-sync-websocket'
import { ThemeSelector } from '@/components/shared/theme-toggle'



function ChangelogSaveButton() {
  const { triggerSave } = useChangelogStore()
  return (
    <button
      onClick={triggerSave}
      id="changelog-save-btn"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-none cursor-pointer text-[0.8rem] font-semibold transition-all duration-150"
      style={{ background: '#f26522', color: '#fff' }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
      Save
    </button>
  )
}

function ChangelogPreviewButton() {
  return (
    <a
      href="/changelog"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hd-accent hover:border-hd-accent-hover text-hd-admin-text hover:text-hd-text text-[0.8rem] font-medium no-underline hover:bg-hd-surface transition-all duration-150"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
      Preview
    </a>
  )
}

function HomeSaveButton() {
  const { triggerSave } = useHomeStore()
  return (
    <button
      onClick={triggerSave}
      id="home-save-btn"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-none cursor-pointer text-[0.8rem] font-semibold transition-all duration-150"
      style={{ background: '#f26522', color: '#fff' }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
      Save
    </button>
  )
}

function HomePreviewButton() {
  return (
    <a
      href="/test-content"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hd-accent hover:border-hd-accent-hover text-hd-admin-text hover:text-hd-text text-[0.8rem] font-medium no-underline hover:bg-hd-surface transition-all duration-150"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
      Preview
    </a>
  )
}



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const { settings, setSettings } = useAppStore()

  useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await apiGetSettings()
      if (response.success) setSettings(response.data)
      return response.data
    },
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  let section: Section = 'dashboard'
  if (pathname.includes('/admin/editor')) {
    section = 'editor'
  } else if (pathname.includes('/admin/domain')) {
    section = 'domain'
  } else if (pathname.includes('/admin/git-integration')) {
    section = 'git'
  } else if (pathname.includes('/admin/git-sync')) {
    section = 'git-sync'
  } else if (pathname.includes('/admin/navigation')) {
    section = 'navigation'
  } else if (pathname.includes('/admin/general')) {
    section = 'general'
  } else if (pathname.includes('/admin/settings')) {
    section = 'settings'
  } else if (pathname.includes('/admin/changelog')) {
    section = 'changelog'
  } else if (pathname.includes('/admin/analytics')) {
    section = 'analytics'
  } else if (pathname.includes('/admin/home')) {
    section = 'home'
  } else if (pathname === '/admin' || pathname.startsWith('/admin/dashboard')) {
    section = 'dashboard'
  }

  return (
    <DocsProvider mode="admin">
      <GitSyncWebSocket />
      <div
        className="h-screen overflow-hidden bg-hd-admin-bg flex flex-col"
        style={{ fontFamily: "var(--font-admin, 'Plus Jakarta Sans', sans-serif)" }}
      >

        {/* ── Top navbar ── */}
        <header className="flex items-center justify-between px-4 h-12 shrink-0 border-b border-hd-admin-border bg-hd-admin-nav z-30">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 select-none no-underline">
              <Image
                src="/images/favicon.png"
                alt="Hyperdocs"
                width={26}
                height={26}
                className="h-[26px] w-[26px] object-contain rounded-md"
                priority
              />
              <span className="font-bold text-[1.05rem] text-hd-text tracking-tight leading-none">Hyperdocs</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSelector />
            <NotificationBell />
            <ViewDocsButton />
            {section === 'editor' && <PublishPanel />}
            {/* {section === 'changelog' && <ChangelogPreviewButton />}
            {section === 'changelog' && <ChangelogSaveButton />}
            {section === 'home' && <HomePreviewButton />}
            {section === 'home' && <HomeSaveButton />} */}
          </div>
        </header>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          closeButton={true}
          pauseOnHover={false}
          theme="dark"
        />

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* 1. Admin nav — always visible */}
          <AdminNav activeSection={section} />

          {/* 2. Sidebar + main wrapped in relative container for overlay */}
          <div className="flex flex-1 overflow-hidden relative min-w-0">
            {section === 'editor' && <EditorSidebar />}

            <main className="flex-1 overflow-hidden flex flex-col min-w-0">
              {children}
            </main>

            {/* Single overlay covering sidebar + editor when no doc mode */}
            {/* {section === 'editor' && <EditorOverlay />} */}
          </div>
        </div>
      </div>
    </DocsProvider>
  )
}

'use client'

import React, { useState } from 'react'
import { DocsNavbar } from '@/components/docs/docs-navbar'
import { TabBar } from '@/components/docs/nav-tabs'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsFooter } from '@/components/docs/docs-footer'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hd-bg)', maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <DocsNavbar onMenuToggle={() => setSidebarOpen(true)} />
      <TabBar />

      <div style={{ display: 'flex', position: 'relative' }}>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 40 }}
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left sidebar */}
        <aside
          style={{
            position: 'sticky',
            top: '99px',
            height: 'calc(100vh - 99px)',
            width: '240px',
            flexShrink: 0,
          }}
          className="hidden lg:block"
        >
          <DocsSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Mobile sidebar drawer */}
        <aside
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '256px',
            paddingTop: '56px',
            zIndex: 50,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.2s',
          }}
          className="lg:hidden"
        >
          <DocsSidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {children}
      </div>
      <DocsFooter />
    </div>
  )
}

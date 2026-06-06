'use client'

import { NavItem } from '@/lib/docs-context'
import { getFirstPageHref } from '@/lib/help-center-utils'

interface TopicGridProps {
  folders: NavItem[]
  getPathSegments: (id: string) => string[]
  onNavigate: (href: string) => void
}

export function TopicGrid({ folders, getPathSegments, onNavigate }: TopicGridProps) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--hd-text)',
          marginBottom: '16px',
          letterSpacing: '-0.005em',
        }}
      >
        Featured topics
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '14px',
        }}
      >
        {folders.map((folder) => {
          const href = getFirstPageHref(folder, getPathSegments)
          return (
            <TopicCard
              key={folder.id}
              title={folder.title}
              href={href}
              onNavigate={onNavigate}
            />
          )
        })}
      </div>
    </div>
  )
}

function TopicCard({
  title,
  href,
  onNavigate,
}: {
  title: string
  href: string | null
  onNavigate: (href: string) => void
}) {
  return (
    <button
      onClick={() => href && onNavigate(href)}
      style={{
        padding: '24px 20px',
        background: 'var(--hd-surface)',
        border: '1px solid var(--hd-border)',
        borderRadius: '10px',
        cursor: href ? 'pointer' : 'default',
        textAlign: 'left',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        if (href) {
          e.currentTarget.style.borderColor = 'var(--hd-accent)'
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--hd-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--hd-text)',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </div>
    </button>
  )
}

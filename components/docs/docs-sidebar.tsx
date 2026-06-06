'use client'

import React, { useState } from 'react'
import { NavItem, useDocs } from '@/lib/docs-context'
import { useDocRouter } from '@/lib/doc-router'
import { IconChevronRight } from '@/components/shared/icons'

function NavItemRow({
  item,
  depth,
  currentPath,
  onNavigate,
}: {
  item: NavItem
  depth: number
  currentPath: string
  onNavigate?: () => void
}) {
  const { getPathSegments } = useDocs()
  const { navigate } = useDocRouter()
  const [open, setOpen] = useState(depth === 0)

  const segments = getPathSegments(item.id)
  const href = '/' + segments.join('/')

  const isActive = item.type === 'page' && currentPath === href
  const isParentOfActive =
    item.type === 'folder' &&
    item.children?.some((child) => {
      const childSegs = getPathSegments(child.id)
      return currentPath.startsWith('/' + childSegs.join('/'))
    })

  React.useEffect(() => {
    if (isParentOfActive) setOpen(true)
  }, [isParentOfActive])

  if (item.type === 'folder') {
    return (
      <div style={{ marginBottom: depth === 0 ? '4px' : 0 }}>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: depth === 0 ? '10px 8px 4px' : '4px 8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{
            fontSize: depth === 0 ? '11.5px' : '13px',
            fontWeight: depth === 0 ? 700 : 600,
            letterSpacing: depth === 0 ? '0.09em' : '0.01em',
            textTransform: depth === 0 ? 'uppercase' : 'none',
            color: isParentOfActive ? 'var(--hd-text)' : depth === 0 ? 'var(--hd-muted-light)' : 'var(--hd-text-soft)',
          }}>
            {item.title}
          </span>
          <IconChevronRight
            open={open}
            width="12"
            height="12"
            stroke={isParentOfActive ? 'var(--hd-text-soft)' : 'var(--hd-muted-light)'}
            strokeWidth="2.5"
            style={{ flexShrink: 0 }}
          />
        </button>

        {open && (
          <div style={{ paddingLeft: depth === 0 ? '0' : '12px', marginBottom: depth === 0 ? '8px' : 0 }}>
            {item.children?.map((child) => (
              <NavItemRow
                key={child.id}
                item={child}
                depth={depth + 1}
                currentPath={currentPath}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Page link — uses our custom navigate() to bypass Next.js router entirely.
  // Content renders the same frame as the click (no RSC fetch, no suspension).
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        navigate(href)
        if (onNavigate) onNavigate()
      }}
      style={{
        display: 'block',
        padding: '6px 10px 6px 12px',
        marginBottom: 1,
        fontSize: '14px',
        lineHeight: '1.5',
        letterSpacing: '-0.01em',
        borderRadius: '6px',
        borderLeft: isActive ? '2px solid var(--hd-accent)' : '2px solid transparent',
        background: isActive ? 'var(--hd-accent-light)' : 'transparent',
        color: isActive ? 'var(--hd-accent)' : 'var(--hd-text-soft)',
        fontWeight: isActive ? 500 : 400,
        transition: 'all 0.1s',
        textDecoration: 'none',
        marginLeft: depth > 1 ? '8px' : 0,
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          (e.currentTarget as HTMLAnchorElement).style.background = 'var(--hd-surface)'
          ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--hd-text)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--hd-text-soft)'
        }
      }}
    >
      {item.title}
    </a>
  )
}

export function DocsSidebar({ onClose }: { onClose?: () => void }) {
  const { pathname } = useDocRouter()
  const { items } = useDocs()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--hd-bg)', borderRight: '1px solid var(--hd-border-soft)', fontFamily: "var(--font-inter, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)" }}>
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px 24px' }}>
        {items.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            depth={0}
            currentPath={pathname}
            onNavigate={onClose}
          />
        ))}
      </nav>
    </div>
  )
}

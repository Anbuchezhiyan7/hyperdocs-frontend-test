'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDocs, firstPage } from '@/lib/docs-context'
import { IconPage, IconInfoCircle } from '@/components/shared/icons'

function Tab({
  label,
  href,
  icon,
  isActive,
}: {
  label: string
  href: string
  icon: React.ReactNode
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: '6px',
        padding: '0 14px',
        fontSize: '13.5px',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? 'var(--hd-accent)' : 'var(--hd-text-soft)',
        borderBottom: isActive ? '2px solid var(--hd-accent)' : '2px solid transparent',
        textDecoration: 'none',
        transition: 'color 0.15s, border-color 0.15s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--hd-text)'
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--hd-text-soft)'
      }}
    >
      {icon}
      {label}
    </Link>
  )
}

export function TabBar() {
  const pathname = usePathname()
  const { items, getPathSegments } = useDocs()

  const isHelpCenter = pathname === '/help-center'

  const firstDocPage = firstPage(items)
  const docsHref = firstDocPage
    ? '/' + getPathSegments(firstDocPage.id).join('/')
    : '/'

  return (
    <div
      style={{
        position: 'sticky',
        top: '57px',
        zIndex: 29,
        display: 'flex',
        alignItems: 'stretch',
        height: '42px',
        padding: '0 24px',
        borderBottom: '1px solid var(--hd-border)',
        background: 'color-mix(in srgb, var(--hd-bg) 95%, transparent)',
        backdropFilter: 'blur(8px)',
        gap: '4px',
      }}
    >
      <Tab
        label="Documentation"
        href={docsHref}
        isActive={!isHelpCenter}
        icon={
          <IconPage
            width="14"
            height="14"
            stroke={!isHelpCenter ? 'var(--hd-accent)' : 'var(--hd-text-soft)'}
            strokeWidth="2"
          />
        }
      />
      <Tab
        label="Help Center"
        href="/help-center"
        isActive={isHelpCenter}
        icon={
          <IconInfoCircle
            width="14"
            height="14"
            stroke={isHelpCenter ? 'var(--hd-accent)' : 'var(--hd-text-soft)'}
            strokeWidth="2.5"
          />
        }
      />
    </div>
  )
}

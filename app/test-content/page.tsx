'use client'

import React, { useEffect, useState } from 'react'
// @ts-ignore
import * as LucideIcons from 'lucide-react/dist/cjs/lucide-react'

import { useTheme } from '@/lib/theme-context'

const STORAGE_KEY = 'hd_home_content'

/* ------------------------------------------------------------------ */
/*  Lucide dynamic icon renderer                                        */
/* ------------------------------------------------------------------ */
function LucideIcon({ name, size = 22, color }: { name: string; size?: number; color?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name]
  if (!Icon) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Fallback = (LucideIcons as any)['Sparkles']
    if (!Fallback) return null
    return <Fallback size={size} color={color} strokeWidth={1.8} />
  }
  return <Icon size={size} color={color} strokeWidth={1.8} />
}

/* ------------------------------------------------------------------ */
/*  Card renderer — user side (accent icon color)                       */
/* ------------------------------------------------------------------ */
function CardView({ icon, title, description, url }: {
  icon?: string
  title?: string
  description?: string
  url?: string
}) {
  const cardContent = (
    <div
      style={{
        border: '1px solid var(--hd-border)',
        borderRadius: 14,
        padding: '18px 20px',
        background: 'var(--hd-bg)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--hd-border-soft)'
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--hd-border)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Icon with accent color */}
      <div style={{ marginBottom: 10 }}>
        <LucideIcon name={icon ?? 'Sparkles'} size={22} color="var(--hd-accent)" />
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--hd-text)', marginBottom: 5 }}>
        {title ?? 'New Card'}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--hd-muted)', lineHeight: 1.6, flex: 1 }}>
        {description ?? ''}
      </div>
    </div>
  )

  if (url) {
    const href = url.startsWith('http') ? url : `https://${url}`
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', flex: 1, height: '100%' }}>
        {cardContent}
      </a>
    )
  }
  return <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>{cardContent}</div>
}

/* ------------------------------------------------------------------ */
/*  Node renderer                                                        */
/* ------------------------------------------------------------------ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RenderNode({ node }: { node: Record<string, any> }) {
  const type = node.type as string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const text = (node.children as { text?: string }[] | undefined)?.map((c: any) => c.text ?? '').join('') ?? ''

  if (type === 'h1') return (
    <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--hd-text)', margin: '0 0 8px', lineHeight: 1.2 }}>
      {text}
    </h1>
  )
  if (type === 'h2') return (
    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--hd-text)', margin: '28px 0 8px', lineHeight: 1.3 }}>
      {text}
    </h2>
  )
  if (type === 'h3') return (
    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--hd-text)', margin: '20px 0 6px' }}>
      {text}
    </h3>
  )
  if (type === 'p') return (
    <p style={{ fontSize: '1rem', color: 'var(--hd-text-soft)', margin: '0 0 16px', lineHeight: 1.7 }}>
      {text}
    </p>
  )
  if (type === 'blockquote') return (
    <blockquote style={{
      borderLeft: '3px solid var(--hd-accent)', background: 'var(--hd-accent-light)',
      padding: '10px 18px', borderRadius: '0 10px 10px 0', margin: '16px 0',
      color: 'var(--hd-text-soft)', fontStyle: 'italic', fontSize: '0.95rem',
    }}>
      {text}
    </blockquote>
  )

  // Single card
  if (type === 'card') {
    return (
      <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardView
          icon={node.icon}
          title={node.title}
          description={node.description}
          url={node.url}
        />
      </div>
    )
  }

  // Column Group
  if (type === 'column_group') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = node.children ?? []
    return (
      <div style={{ display: 'flex', gap: 24, margin: '16px 0', width: '100%' }}>
        {children.map((child: any, i: number) => (
          <RenderNode key={child.id || i} node={child} />
        ))}
      </div>
    )
  }

  // Column
  if (type === 'column') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children = node.children ?? []
    return (
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {children.map((child: any, i: number) => (
          <RenderNode key={child.id || i} node={child} />
        ))}
      </div>
    )
  }


  return null
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function TestContentPage() {
  const [content, setContent] = useState<Record<string, unknown>[] | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setContent(JSON.parse(raw))
      } else {
        setContent([])
      }
    } catch {
      setContent([])
    }
  }, [])

  if (!mounted || content === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hd-bg)', color: 'var(--hd-muted)', fontFamily: 'inherit' }}>
        Loading preview…
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hd-bg)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', borderBottom: '1px solid var(--hd-border)',
        background: 'var(--hd-admin-nav)',
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--hd-muted)' }}>
          👁 Preview — test-content
        </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--hd-text-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 6,
              marginRight: 10,
              transition: 'background 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--hd-surface)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            {resolvedTheme === 'dark' ? <LucideIcons.Sun size={15} /> : <LucideIcons.Moon size={15} />}
          </button>
          <button
            onClick={() => window.close()}
            style={{
              fontSize: '0.78rem', padding: '5px 12px', borderRadius: 7,
              border: '1px solid var(--hd-border)', background: 'transparent',
              color: 'var(--hd-text-soft)', cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 32px 80px' }}>
        {content.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 80, color: 'var(--hd-muted)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.4 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <p style={{ fontSize: '0.9rem' }}>No saved content yet. Go to <strong>Home Editor</strong> and hit <strong>Save</strong> first.</p>
          </div>
        ) : (
          content.map((node, i) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <RenderNode key={(node.id as string) ?? i} node={node as Record<string, any>} />
          ))
        )}
      </div>
    </div>
  )
}

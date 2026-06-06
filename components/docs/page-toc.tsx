'use client'

import React, { useEffect, useState } from 'react'

type Heading = { id: string; text: string; level: number }

export function PageToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-20px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav style={{ position: 'sticky', top: '80px', fontFamily: "var(--font-inter, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)" }}>
      {/* Label */}
      <p style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--hd-muted-light)',
        marginBottom: '12px',
      }}>
        On this page
      </p>

      {/* Items with left track line */}
      <div style={{ position: 'relative', paddingLeft: '12px' }}>
        {/* Vertical track */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'var(--hd-border-soft)',
        }} />

        {headings.map((h) => {
          const isActive = activeId === h.id
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveId(h.id)
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                history.pushState(null, '', `#${h.id}`)
              }}
              style={{
                display: 'block',
                position: 'relative',
                paddingLeft: h.level === 3 ? '16px' : '8px',
                paddingTop: '4px',
                paddingBottom: '4px',
                fontSize: '13px',
                lineHeight: '1.45',
                color: isActive ? 'var(--hd-accent)' : 'var(--hd-muted)',
                fontWeight: isActive ? 500 : 400,
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--hd-text-soft)' }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--hd-muted)' }}
            >
              {/* Active indicator dot on track */}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  left: '-16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '16px',
                  borderRadius: '2px',
                  background: 'var(--hd-accent)',
                }} />
              )}
              {h.text}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

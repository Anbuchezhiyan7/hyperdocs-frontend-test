'use client'

import React, { useState, useRef, useEffect } from 'react'
// @ts-ignore
import * as LucideIcons from 'lucide-react/dist/cjs/lucide-react'

/* ------------------------------------------------------------------ */
/*  Dynamic list of all Lucide icons                                   */
/* ------------------------------------------------------------------ */
export const ALL_LUCIDE_ICONS = Object.keys(LucideIcons)
  .filter(name => /^[A-Z]/.test(name))
  .sort()

function getLucideIcon(name: string): React.FC<{ size?: number; color?: string; strokeWidth?: number }> | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icon = (LucideIcons as any)[name]
  return icon ?? null
}

/* ------------------------------------------------------------------ */
/*  Icon Picker Panel                                                   */
/* ------------------------------------------------------------------ */
interface IconPickerProps {
  selectedIcon: string
  onSelect: (name: string) => void
  onRemove: () => void
}

export function IconPicker({ selectedIcon, onSelect, onRemove }: IconPickerProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = ALL_LUCIDE_ICONS.filter(n =>
    !query || n.toLowerCase().includes(query.toLowerCase())
  )

  const displayList = filtered.slice(0, 160)
  if (selectedIcon && filtered.includes(selectedIcon) && !displayList.includes(selectedIcon)) {
    displayList.push(selectedIcon)
  }

  return (
    <div style={{ padding: '12px 0 8px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', marginBottom: 8 }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--hd-admin-muted)' }}>
          Icons
        </span>
        <button
          onClick={onRemove}
          style={{
            fontSize: '0.72rem', fontWeight: 600, color: '#ef4444',
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Remove
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '0 12px', marginBottom: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg
            width="13" height="13"
            viewBox="0 0 24 24" fill="none" stroke="var(--hd-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search icons..."
            style={{
              width: '100%', paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
              fontSize: '0.8rem', borderRadius: 8, border: '1px solid var(--hd-border)',
              background: 'var(--hd-surface)', color: 'var(--hd-text)', outline: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
        </div>
        {/* Circle color swatch */}
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hd-surface)', border: '1px solid var(--hd-border)', flexShrink: 0 }} />
      </div>

      {/* Icon grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)',
        gap: 2, padding: '0 12px',
        maxHeight: 200, overflowY: 'auto',
      }}>
        {displayList.map(name => {
          const Icon = getLucideIcon(name)
          if (!Icon) return null
          const isSelected = name === selectedIcon
          return (
            <button
              key={name}
              title={name}
              onClick={() => onSelect(name)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: 6, border: 'none',
                background: isSelected ? 'var(--hd-accent-light)' : 'transparent',
                color: isSelected ? 'var(--hd-accent)' : 'var(--hd-text)',
                cursor: 'pointer', transition: 'background 0.1s',
              }}
              onMouseEnter={e => {
                if (!isSelected) e.currentTarget.style.background = 'var(--hd-surface)'
              }}
              onMouseLeave={e => {
                if (!isSelected) e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={15} strokeWidth={1.8} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Render a Lucide icon by name                                        */
/* ------------------------------------------------------------------ */
export function LucideIconByName({
  name,
  size = 20,
  color,
  strokeWidth = 1.8,
}: {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
}) {
  const Icon = getLucideIcon(name)
  if (!Icon) {
    // Fallback: sparkles
    const Fallback = getLucideIcon('BookOpenText')
    if (!Fallback) return null
    return <Fallback size={size} color={color} strokeWidth={strokeWidth} />
  }
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}

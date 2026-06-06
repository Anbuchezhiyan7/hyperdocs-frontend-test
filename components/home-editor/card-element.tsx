'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { PlateElement } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'
import { useEditorRef } from 'platejs/react'
import { IconPicker, LucideIconByName } from './icon-picker'

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface CardData {
  icon?: string
  title?: string
  description?: string
  url?: string
}

/* ------------------------------------------------------------------ */
/*  Card Popover (three-dots panel)                                     */
/* ------------------------------------------------------------------ */
function CardPopover({
  data,
  onSave,
  onClose,
  onDelete,
}: {
  data: CardData
  onSave: (d: CardData) => void
  onClose: () => void
  onDelete: () => void
}) {
  const [view, setView] = useState<'main' | 'icons'>('main')
  const [icon, setIcon] = useState(data.icon ?? 'Sparkles')
  const [url, setUrl] = useState(data.url ?? '')
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      contentEditable={false}
      style={{
        position: 'absolute', top: 40, right: 0, zIndex: 999,
        width: 300,
        background: 'var(--hd-admin-nav)',
        border: '1px solid var(--hd-admin-border)',
        borderRadius: 12,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        fontSize: '0.82rem',
      }}
    >
      {view === 'icons' ? (
        <>
          {/* Back button row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', borderBottom: '1px solid var(--hd-admin-border)' }}>
            <button
              onClick={() => setView('main')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--hd-admin-text)', fontSize: '0.8rem', padding: 0, fontFamily: 'inherit' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          </div>
          <IconPicker
            selectedIcon={icon}
            onSelect={(name) => { setIcon(name); setView('main') }}
            onRemove={() => { setIcon(''); setView('main') }}
          />
        </>
      ) : (
        <>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderBottom: '1px solid var(--hd-admin-border)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--hd-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--hd-text)' }}>Edit Card Attributes</span>
          </div>

          {/* Content section */}
          <div style={{ padding: '14px 14px 0' }}>
            <p style={{ margin: '0 0 10px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--hd-admin-muted)' }}>Content</p>

            {/* Icon picker trigger */}
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--hd-text-soft)', marginBottom: 5, fontWeight: 500 }}>
                <LucideIconByName name="Sparkles" size={12} color="var(--hd-muted)" />
                Icon
              </label>
              <button
                onClick={() => setView('icons')}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8,
                  border: '1px solid var(--hd-border)', background: 'var(--hd-surface)',
                  color: 'var(--hd-text)', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', fontFamily: 'inherit',
                }}
              >
                {icon ? (
                  <>
                    <LucideIconByName name={icon} size={14} color="var(--hd-accent)" />
                    <span>{icon}</span>
                  </>
                ) : (
                  <span style={{ color: 'var(--hd-muted)' }}>Select an icon…</span>
                )}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hd-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* URL */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--hd-text-soft)', marginBottom: 5, fontWeight: 500 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hd-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                URL
              </label>
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="example.com"
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8,
                  border: '1px solid var(--hd-border)', background: 'var(--hd-surface)',
                  color: 'var(--hd-text)', fontSize: '0.8rem', outline: 'none', fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px 12px',
            borderTop: '1px solid var(--hd-admin-border)',
          }}>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this card?')) {
                  onDelete()
                  onClose()
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '7px 0', border: 'none', background: 'transparent',
                color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={onClose}
                style={{
                  padding: '7px 14px', borderRadius: 8, border: '1px solid var(--hd-border)',
                  background: 'transparent', color: 'var(--hd-text-soft)', cursor: 'pointer',
                  fontSize: '0.8rem', fontFamily: 'inherit',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => { onSave({ icon, url }); onClose() }}
                style={{
                  padding: '7px 16px', borderRadius: 8, border: 'none',
                  background: '#f26522', color: '#fff', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Card Element — single card                                          */
/* ------------------------------------------------------------------ */
export function CardElement({ children, ...props }: PlateElementProps) {
  const element = props.element as unknown as CardData & { type: string }
  const editor = useEditorRef()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const icon = element.icon ?? 'Sparkles'
  const title = element.title ?? 'New Card'
  const description = element.description ?? 'Enter your card description here'

  const handleSave = useCallback((data: CardData) => {
    editor.tf.setNodes(
      { ...data } as Parameters<typeof editor.tf.setNodes>[0],
      { at: [], match: (n) => n === props.element }
    )
  }, [editor, props.element])

  const handleDelete = useCallback(() => {
    editor.tf.removeNodes({ at: [], match: (n) => n === props.element })
  }, [editor, props.element])

  return (
    <PlateElement as="div" {...props} className="my-3" style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <div
        contentEditable={false}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          border: '1px solid var(--hd-border)',
          borderRadius: 12,
          padding: '14px 16px',
          background: 'var(--hd-bg)',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          ...(hovered ? { borderColor: 'var(--hd-border-soft)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' } : {}),
        }}
      >
        {/* Three-dots button */}
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
          style={{
            position: 'absolute', top: 10, right: 10,
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 4, borderRadius: 6, color: 'var(--hd-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered || open ? 1 : 0,
            transition: 'opacity 0.15s, background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--hd-surface)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          title="Edit card"
        >
          {/* Three dots */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
          </svg>
        </button>

        {/* Icon */}
        <div style={{ marginBottom: 8 }}>
          <LucideIconByName name={icon} size={20} color="var(--hd-text-soft)" strokeWidth={1.8} />
        </div>

        {/* Title */}
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--hd-text)', marginBottom: 4 }}>
          {title}
        </div>

        {/* Description */}
        <div style={{ fontSize: '0.82rem', color: 'var(--hd-muted)', lineHeight: 1.5, flex: 1 }}>
          {description}
        </div>

        {/* Popover */}
        {open && (
          <CardPopover
            data={{ icon, url: (element as CardData).url ?? '' }}
            onSave={handleSave}
            onClose={() => setOpen(false)}
            onDelete={handleDelete}
          />
        )}
      </div>
      {children}
    </PlateElement>
  )
}

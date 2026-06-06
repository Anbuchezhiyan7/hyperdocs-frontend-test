'use client'

import React, { useState } from 'react'
import { PlateElement, useEditorRef } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'

function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url)
}

function getYouTubeEmbedUrl(url: string): string {
  if (url.includes('youtube.com/embed/')) return url
  const watchMatch = url.match(/youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  return url
}

function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif|ico)(\?.*)?$/i.test(url)
}

function HoverOverlay({ visible, onDelete }: { visible: boolean; onDelete: () => void }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 12,
      background: 'rgba(0,0,0,0.35)',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.18s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: visible ? 'auto' : 'none',
      zIndex: 10,
    }}>
      <button
        onMouseDown={e => { e.preventDefault(); onDelete() }}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '9px 18px', borderRadius: 8,
          border: 'none', background: 'rgba(239,68,68,0.9)', color: '#fff',
          cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
        Delete
      </button>
    </div>
  )
}

export function MediaEmbedElement({ children, ...props }: PlateElementProps) {
  const url = (props.element as { url?: string }).url ?? ''
  const [hovered, setHovered] = useState(false)
  const editor = useEditorRef()

  function handleDelete() {
    editor.tf.removeNodes({ match: (n) => n === props.element, at: [] })
  }

  return (
    <PlateElement as="div" {...props} className="my-5">
      <div
        contentEditable={false}
        style={{ position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isYouTubeUrl(url) ? (
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--hd-border)',
            background: '#000',
          }}>
            <iframe
              src={getYouTubeEmbedUrl(url)}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              title="YouTube embed"
            />
            <HoverOverlay visible={hovered} onDelete={handleDelete} />
          </div>
        ) : isImageUrl(url) ? (
          <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
            <img
              src={url}
              alt="embed"
              style={{ width: '100%', display: 'block', borderRadius: 10, border: '1px solid var(--hd-border)' }}
            />
            <HoverOverlay visible={hovered} onDelete={handleDelete} />
          </div>
        ) : (
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            background: '#f8f8f8',
            borderRadius: 10,
            border: '1px solid var(--hd-border)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hd-accent)', fontSize: '0.875rem', wordBreak: 'break-all', flex: 1 }}>
              {url}
            </a>
            {hovered && (
              <button
                onMouseDown={e => { e.preventDefault(); handleDelete() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px', borderRadius: 6,
                  border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                  cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      {children}
    </PlateElement>
  )
}

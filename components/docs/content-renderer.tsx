'use client'

import React, { useEffect, useRef } from 'react'
import { CALLOUT_CONFIG, type CalloutVariant } from '@/lib/callout-plugin'

/* ------------------------------------------------------------------ */
/*  Types matching Plate.js node shapes                                  */
/* ------------------------------------------------------------------ */

type PlateNode = {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  children?: PlateNode[]
  url?: string
  lang?: string
  indent?: number
  listStyleType?: string
  [key: string]: unknown
}

/* ------------------------------------------------------------------ */
/*  Highlight helper                                                    */
/* ------------------------------------------------------------------ */

function renderHighlightedText(text: string, query: string): React.ReactNode {
  if (!query.trim() || !text) return <>{text}</>
  const lowerQuery = query.toLowerCase()
  const lowerText = text.toLowerCase()
  
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let matchIndex = lowerText.indexOf(lowerQuery)
  
  while (matchIndex !== -1) {
    if (matchIndex > lastIndex) {
      parts.push(<React.Fragment key={lastIndex}>{text.substring(lastIndex, matchIndex)}</React.Fragment>)
    }
    parts.push(
      <mark key={matchIndex + 'match'} style={{ 
        color: 'var(--hd-accent)', 
        fontWeight: 600, 
        backgroundColor: 'color-mix(in srgb, var(--hd-accent) 15%, transparent)', 
        padding: '0 2px', 
        borderRadius: '3px' 
      }}>
        {text.substring(matchIndex, matchIndex + query.length)}
      </mark>
    )
    lastIndex = matchIndex + query.length
    matchIndex = lowerText.indexOf(lowerQuery, lastIndex)
  }
  
  if (lastIndex < text.length) {
    parts.push(<React.Fragment key={lastIndex}>{text.substring(lastIndex)}</React.Fragment>)
  }
  
  return <>{parts}</>
}

/* ------------------------------------------------------------------ */
/*  Callout icon renderer                                               */
/* ------------------------------------------------------------------ */

function CalloutDocIcon({ variant, color }: { variant: CalloutVariant; color: string }) {
  const s = { width: 18, height: 18 }
  switch (variant) {
    case 'check':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" /></svg>
    case 'tip':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>
    case 'warning':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
    case 'danger':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    default:
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
  }
}

/* ------------------------------------------------------------------ */
/*  Leaf text renderer (inline marks)                                   */
/* ------------------------------------------------------------------ */

function renderLeaf(node: PlateNode, idx: number, searchQuery?: string): React.ReactNode {
  if (node.text === undefined) return null
  let el: React.ReactNode = node.text || '\u200B'
  
  if (searchQuery && node.text) {
    el = renderHighlightedText(node.text, searchQuery)
  }
  
  if (node.bold) el = <strong key={`b-${idx}`} style={{ color: 'var(--hd-text)', fontWeight: 700 }}>{el}</strong>
  if (node.italic) el = <em key={`i-${idx}`}>{el}</em>
  if (node.underline) el = <u key={`u-${idx}`}>{el}</u>
  if (node.strikethrough) el = <s key={`s-${idx}`}>{el}</s>
  if (node.code) el = (
    <code
      key={`c-${idx}`}
      style={{
        background: 'var(--hd-accent-light)',
        color: 'var(--hd-accent)',
        border: '1px solid var(--hd-accent-mid)',
        borderRadius: '4px',
        padding: '1px 6px',
        fontSize: '0.85em',
        fontFamily: 'monospace',
      }}
    >
      {el}
    </code>
  )
  return <React.Fragment key={idx}>{el}</React.Fragment>
}

function renderInline(children: PlateNode[] | undefined, searchQuery?: string): React.ReactNode {
  if (!children) return null
  return children.map((child, i) => renderLeaf(child, i, searchQuery))
}

/* ------------------------------------------------------------------ */
/*  Extract headings for TOC                                            */
/* ------------------------------------------------------------------ */

export function extractHeadings(nodes: PlateNode[]): { id: string; text: string; level: number }[] {
  const result: { id: string; text: string; level: number }[] = []
  for (const node of nodes) {
    if (node.type === 'h1' || node.type === 'h2' || node.type === 'h3') {
      const text = node.children?.map((c) => c.text ?? '').join('') ?? ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      result.push({ id, text, level: node.type === 'h1' ? 1 : node.type === 'h2' ? 2 : 3 })
    }
    if (node.children && node.type !== 'h1' && node.type !== 'h2' && node.type !== 'h3') {
      result.push(...extractHeadings(node.children))
    }
  }
  return result
}

/* ------------------------------------------------------------------ */
/*  Block renderer                                                      */
/* ------------------------------------------------------------------ */

function renderBlock(node: PlateNode, idx: number, searchQuery?: string): React.ReactNode {
  switch (node.type) {
    case 'h1': {
      const text = node.children?.map((c) => c.text ?? '').join('') ?? ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return (
        <h1
          key={idx}
          id={id}
          className="text-3xl font-bold mt-8 mb-4 scroll-mt-28"
          style={{ color: 'var(--hd-text)' }}
        >
          {renderInline(node.children, searchQuery)}
        </h1>
      )
    }

    case 'h2': {
      const text = node.children?.map((c) => c.text ?? '').join('') ?? ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return (
        <h2
          key={idx}
          id={id}
          className="text-2xl font-semibold mt-7 mb-3 pb-2 scroll-mt-28"
          style={{ color: 'var(--hd-text)', borderBottom: '1px solid var(--hd-border)' }}
        >
          {renderInline(node.children, searchQuery)}
        </h2>
      )
    }

    case 'h3': {
      const text = node.children?.map((c) => c.text ?? '').join('') ?? ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return (
        <h3
          key={idx}
          id={id}
          className="text-xl font-semibold mt-5 mb-2 scroll-mt-28"
          style={{ color: 'var(--hd-text)' }}
        >
          {renderInline(node.children, searchQuery)}
        </h3>
      )
    }

    case 'p': {
      // Indent-based list items
      if (node.listStyleType) {
        const isOrdered =
          node.listStyleType === 'decimal' ||
          node.listStyleType === 'lower-alpha' ||
          node.listStyleType === 'lower-roman'

        return (
          <div
            key={idx}
            className="flex items-start gap-2.5 my-1 text-[15px] leading-7"
            style={{
              paddingLeft: `${((node.indent as number) ?? 1) * 1.25}rem`,
              color: 'var(--hd-text-soft)',
            }}
          >
            <span
              className="flex-shrink-0 mt-0.5"
              style={{
                color: 'var(--hd-accent)',
                fontSize: '0.75rem',
                fontWeight: 600,
                minWidth: '1rem',
                textAlign: 'center',
              }}
            >
              {isOrdered ? `${(node.listStart as number) ?? 1}.` : '•'}
            </span>
            <span>{renderInline(node.children, searchQuery)}</span>
          </div>
        )
      }

      const text = node.children?.map((c) => c.text ?? '').join('')
      if (!text) return <div key={idx} className="h-3" />

      return (
        <p key={idx} className="leading-7 mb-4 text-[15px]" style={{ color: 'var(--hd-text-soft)' }}>
          {renderInline(node.children, searchQuery)}
        </p>
      )
    }

    case 'callout': {
      const variant = (node.variant as CalloutVariant) ?? 'info'
      const cfg = CALLOUT_CONFIG[variant]
      const text = node.children?.map((c) => c.text ?? '').join('') ?? ''
      if (!text.trim()) return null
      return (
        <div
          key={idx}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            borderLeft: `4px solid ${cfg.border}`,
            borderRadius: 10,
            padding: '12px 16px',
            margin: '12px 0',
            color: cfg.textColor,
          }}
        >
          <span style={{ marginTop: 2, flexShrink: 0 }}>
            <CalloutDocIcon variant={variant} color={cfg.iconColor} />
          </span>
          <span style={{ flex: 1, fontSize: '0.925rem', lineHeight: 1.65 }}>
            {renderInline(node.children, searchQuery)}
          </span>
        </div>
      )
    }

    case 'blockquote':
      return (
        <blockquote
          key={idx}
          className="my-5 px-5 py-3 text-sm rounded-r-xl italic"
          style={{
            borderLeft: '3px solid var(--hd-accent)',
            background: 'var(--hd-accent-light)',
            color: 'var(--hd-muted)',
          }}
        >
          {node.children?.map((child, i) => renderBlock(child, i, searchQuery))}
        </blockquote>
      )

    case 'code_block':
      return (
        <div
          key={idx}
          className="my-5 rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--hd-border)' }}
        >
          {(node.lang as string) && (
            <div
              className="flex items-center justify-between px-4 py-2 text-xs font-medium"
              style={{ background: 'var(--hd-surface)', color: 'var(--hd-muted)', borderBottom: '1px solid var(--hd-border)' }}
            >
              <span>{node.lang as string}</span>
              <button
                onClick={() => {
                  const text = node.children
                    ?.map((line) => line.children?.map((c) => c.text ?? '').join('') ?? '')
                    .join('\n') ?? ''
                  navigator.clipboard.writeText(text)
                }}
                className="flex items-center gap-1 hover:opacity-70"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </button>
            </div>
          )}
          <pre
            className="p-4 overflow-x-auto text-sm font-mono leading-relaxed"
            style={{ background: '#1e1e2e', color: '#cdd6f4' }}
          >
            <code>
              {node.children?.map((line) => line.children?.map((c) => c.text ?? '').join('') ?? '').join('\n')}
            </code>
          </pre>
        </div>
      )

    case 'table': {
      const rows = node.children ?? []
      const [headerRow, ...dataRows] = rows
      return (
        <div
          key={idx}
          className="my-5 overflow-x-auto rounded-xl"
          style={{ border: '1px solid var(--hd-border)' }}
        >
          <table className="w-full text-sm">
            {headerRow && (
              <thead>
                <tr style={{ background: 'var(--hd-surface)' }}>
                  {headerRow.children?.map((cell, ci) => (
                    <th
                      key={ci}
                      className="px-4 py-3 text-left font-semibold"
                      style={{ color: 'var(--hd-text)', borderBottom: '1px solid var(--hd-border)' }}
                    >
                      {cell.children?.map((c, i) => renderBlock(c, i, searchQuery))}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: '1px solid var(--hd-border)' }}>
                  {row.children?.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3" style={{ color: 'var(--hd-text-soft)' }}>
                      {cell.children?.map((c, i) => renderBlock(c, i, searchQuery))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    case 'img': {
      const url = node.url as string
      return url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={idx}
          src={url}
          alt={(node.alt as string) ?? ''}
          className="my-5 max-w-full rounded-xl"
          style={{ border: '1px solid var(--hd-border)' }}
        />
      ) : null
    }

    case 'media_embed': {
      const url = node.url as string
      if (!url) return null
      const isYT = /(?:youtube\.com|youtu\.be)/.test(url)
      const isImg = /\.(jpg|jpeg|png|gif|webp|svg|bmp|avif|ico)(\?.*)?$/i.test(url)
      if (isYT) {
        const embedUrl = url.includes('youtube.com/embed/')
          ? url
          : (() => {
              const watchMatch = url.match(/youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/)
              if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
              const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
              if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
              return url
            })()
        return (
          <div key={idx} className="my-5" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--hd-border)', background: '#000' }}>
            <iframe src={embedUrl} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen title="YouTube embed" />
          </div>
        )
      }
      if (isImg) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={idx} src={url} alt="embed" className="my-5 w-full rounded-xl" style={{ border: '1px solid var(--hd-border)' }} />
        )
      }
      return (
        <div key={idx} className="my-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: 'var(--hd-surface)', border: '1px solid var(--hd-border)' }}>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hd-accent)', wordBreak: 'break-all' }}>{url}</a>
        </div>
      )
    }

    case 'button': {
      const btnText = node.label as string || 'Button'
      const btnUrl = node.url as string
      const bgColor = node.bgColor as string || '#f26522'
      const textColor = node.textColor as string || '#ffffff'
      const btnEl = (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 28px',
            borderRadius: 8,
            background: bgColor,
            color: textColor,
            fontWeight: 600,
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            textDecoration: 'none',
          }}
        >
          {btnText}
        </span>
      )
      return (
        <div key={idx} className="my-4" style={{ display: 'flex', justifyContent: 'center' }}>
          {btnUrl ? (
            <a href={btnUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              {btnEl}
            </a>
          ) : btnEl}
        </div>
      )
    }

    case 'hr':
      return <hr key={idx} className="my-8" style={{ borderColor: 'var(--hd-border)' }} />

    default:
      // Try to render children for unknown wrapper types
      if (node.children) {
        return (
          <div key={idx}>
            {node.children.map((child, i) => renderBlock(child, i, searchQuery))}
          </div>
        )
      }
      return null
  }
}

/* ------------------------------------------------------------------ */
/*  Main content renderer                                               */
/* ------------------------------------------------------------------ */

export function ContentRenderer({ nodes, searchQuery }: { nodes: unknown[], searchQuery?: string }) {
  return (
    <article>
      {(nodes as PlateNode[]).map((node, i) => renderBlock(node, i, searchQuery))}
    </article>
  )
}

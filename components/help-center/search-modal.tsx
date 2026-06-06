'use client'

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { IconSearch, IconPage } from '@/components/shared/icons'
import { SearchResult, getSnippet, findMatchingAnchor } from '@/lib/help-center-utils'

/* ------------------------------------------------------------------ */
/*  Result item                                                         */
/* ------------------------------------------------------------------ */

function ResultItem({
  result,
  query,
  isActive,
  onClick,
  itemRef,
}: {
  result: SearchResult
  query: string
  isActive: boolean
  onClick: () => void
  itemRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={itemRef}
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 16px',
        background: isActive
          ? 'color-mix(in srgb, var(--hd-accent) 8%, transparent)'
          : 'transparent',
        borderLeft: isActive ? '2px solid var(--hd-accent)' : '2px solid transparent',
        border: 'none',
        borderBottom: '1px solid color-mix(in srgb, var(--hd-border) 60%, transparent)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background 0.1s',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = 'color-mix(in srgb, var(--hd-surface) 60%, transparent)'
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = 'transparent'
      }}
    >
      {/* Page icon */}
      <div
        style={{
          width: '32px',
          height: '32px',
          flexShrink: 0,
          marginTop: '1px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          background: isActive
            ? 'color-mix(in srgb, var(--hd-accent) 15%, transparent)'
            : 'color-mix(in srgb, var(--hd-surface) 80%, transparent)',
          border: '1px solid color-mix(in srgb, var(--hd-border) 50%, transparent)',
        }}
      >
        <IconPage
          width="14"
          height="14"
          stroke={isActive ? 'var(--hd-accent)' : 'var(--hd-text-soft)'}
          strokeWidth="2"
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: '11px',
            color: 'var(--hd-muted)',
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexWrap: 'wrap',
          }}
        >
          {result.breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ opacity: 0.5 }}>›</span>}
              <span>{crumb}</span>
            </React.Fragment>
          ))}
          {result.breadcrumb.length > 0 && <span style={{ opacity: 0.5 }}>›</span>}
          <span style={{ color: isActive ? 'var(--hd-accent)' : 'var(--hd-muted)' }}>
            {result.page.title}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: isActive ? 'var(--hd-accent)' : 'var(--hd-text)',
            marginBottom: '3px',
            letterSpacing: '-0.01em',
          }}
        >
          {result.page.title}
        </div>

        {/* Snippet */}
        <div
          style={{
            fontSize: '12.5px',
            color: 'var(--hd-text-soft)',
            lineHeight: '1.5',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {getSnippet(result.fullText, query)}
        </div>
      </div>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Keyboard hint footer                                                */
/* ------------------------------------------------------------------ */

function KbdHint({ label, keys }: { label: string; keys: string[] }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--hd-muted)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
        {keys.map((k) => (
          <kbd
            key={k}
            style={{
              padding: '2px 5px',
              fontFamily: 'inherit',
              fontSize: '10px',
              background: 'color-mix(in srgb, var(--hd-surface) 80%, transparent)',
              border: '1px solid var(--hd-border)',
              borderRadius: '4px',
              color: 'var(--hd-muted)',
            }}
          >
            {k}
          </kbd>
        ))}
      </span>
      {label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Modal                                                               */
/* ------------------------------------------------------------------ */

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (href: string) => void
  searchIndex: SearchResult[]
}

export function SearchModal({ isOpen, onClose, onNavigate, searchIndex }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const activeItemRef = useRef<HTMLButtonElement>(null)

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    const lower = q.toLowerCase()
    return searchIndex
      .filter(
        (r) =>
          r.page.title.toLowerCase().includes(lower) ||
          r.fullText.toLowerCase().includes(lower)
      )
      .slice(0, 8)
  }, [query, searchIndex])

  function navigateWithAnchor(result: SearchResult) {
    const anchor = findMatchingAnchor(
      (result.page.content ?? []) as unknown[],
      query
    )
    const qs = query.trim() ? `?highlight=${encodeURIComponent(query.trim())}` : ''
    const hash = anchor ? '#' + anchor : ''
    onNavigate(result.href + qs + hash)
  }

  /* Reset when opening */
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [isOpen])

  /* Reset active index when results change */
  useEffect(() => {
    setActiveIndex(0)
  }, [results.length])

  /* Scroll active item into view */
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[activeIndex]) {
        navigateWithAnchor(results[activeIndex])
      }
    },
    [results, activeIndex, onClose, onNavigate, query]
  )

  if (!isOpen) return null

  return (
    /* Overlay */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        fontFamily: "var(--font-inter, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",
      }}
    >
      {/* Glass panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          maxWidth: '620px',
          margin: '0 16px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'color-mix(in srgb, var(--hd-bg) 82%, transparent)',
          backdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid color-mix(in srgb, var(--hd-border) 70%, transparent)',
          boxShadow:
            '0 32px 64px -12px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Search input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid color-mix(in srgb, var(--hd-border) 60%, transparent)',
          }}
        >
          <IconSearch
            width="18"
            height="18"
            stroke="var(--hd-muted)"
            strokeWidth="2"
            style={{ flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '16px',
              color: 'var(--hd-text)',
              fontFamily: 'inherit',
            }}
          />
          <kbd
            onClick={onClose}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              fontFamily: 'inherit',
              color: 'var(--hd-muted)',
              background: 'color-mix(in srgb, var(--hd-surface) 80%, transparent)',
              border: '1px solid var(--hd-border)',
              borderRadius: '6px',
              cursor: 'pointer',
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {results.map((result, i) => (
              <ResultItem
                key={result.href}
                result={result}
                query={query}
                isActive={i === activeIndex}
                itemRef={i === activeIndex ? activeItemRef : undefined}
                onClick={() => navigateWithAnchor(result)}
              />
            ))}
          </div>
        ) : query.trim() ? (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--hd-muted)',
              fontSize: '14px',
            }}
          >
            No results for &ldquo;<strong style={{ color: 'var(--hd-text)' }}>{query}</strong>&rdquo;
          </div>
        ) : (
          <div
            style={{
              padding: '32px 20px',
              textAlign: 'center',
              color: 'var(--hd-muted)',
              fontSize: '13.5px',
            }}
          >
            Start typing to search across all documentation
          </div>
        )}

        {/* Footer hints */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '10px 16px',
            borderTop: '1px solid color-mix(in srgb, var(--hd-border) 50%, transparent)',
            background: 'color-mix(in srgb, var(--hd-surface) 40%, transparent)',
          }}
        >
          <KbdHint label="navigate" keys={['↑', '↓']} />
          <KbdHint label="open" keys={['↵']} />
          <KbdHint label="close" keys={['Esc']} />
        </div>
      </div>
    </div>
  )
}

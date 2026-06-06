'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorRef } from 'platejs/react'
import { getDOMSelectionBoundingClientRect } from '@platejs/floating'
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  H2Plugin,
  H3Plugin,
  BlockquotePlugin,
} from '@platejs/basic-nodes/react'
import { toggleList, ListStyleType } from '@platejs/list'

/* ------------------------------------------------------------------ */
/*  Helpers                                                              */
/* ------------------------------------------------------------------ */

function isInH1(): boolean {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return false
  let node: Node | null = sel.anchorNode
  while (node) {
    if (node.nodeType === 1 && (node as Element).tagName === 'H1') return true
    node = node.parentNode
  }
  return false
}

/* ------------------------------------------------------------------ */
/*  Turn-into dropdown items                                            */
/* ------------------------------------------------------------------ */

const TURN_INTO_ITEMS = [
  { label: 'Text', type: 'p', icon: '¶' },
  { label: 'Heading 2', type: 'h2', icon: 'H₂' },
  { label: 'Heading 3', type: 'h3', icon: 'H₃' },
  { label: 'Bulleted list', type: 'bulleted', icon: '•' },
  { label: 'Numbered list', type: 'numbered', icon: '1.' },
  { label: 'Code', type: 'code_block', icon: '</>' },
  { label: 'Quote', type: 'blockquote', icon: '❝' },
]

/* ------------------------------------------------------------------ */
/*  Floating toolbar                                                    */
/* ------------------------------------------------------------------ */

export function FloatingToolbar() {
  const editor = useEditorRef()
  const [isExpanded, setIsExpanded] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const [showTurnInto, setShowTurnInto] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback(() => {
    const sel = window.getSelection()
    const expanded = sel && sel.rangeCount > 0 && !sel.isCollapsed
    
    setIsExpanded(!!expanded)

    if (!expanded || isInH1()) {
      setPos(null)
      setShowTurnInto(false)
      return
    }
    const rect = getDOMSelectionBoundingClientRect()
    if (!rect || rect.width === 0) { setPos(null); return }
    setPos({ top: rect.top + window.scrollY - 44, left: rect.left + rect.width / 2 })
  }, [])

  useEffect(() => {
    document.addEventListener('selectionchange', updatePosition)
    window.addEventListener('resize', updatePosition)
    return () => {
      document.removeEventListener('selectionchange', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [updatePosition])

  // Close turn-into when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setShowTurnInto(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!pos || !isExpanded) return null

  function toggleMark(key: string) {
    if (!editor) return
    // @ts-expect-error dynamic mark
    editor.tf.toggleMark({ key })
  }

  function setBlock(type: string) {
    if (!editor) return
    setShowTurnInto(false)
    if (type === 'bulleted') {
      toggleList(editor as Parameters<typeof toggleList>[0], { listStyleType: ListStyleType.Disc })
    } else if (type === 'numbered') {
      toggleList(editor as Parameters<typeof toggleList>[0], { listStyleType: ListStyleType.Decimal })
    } else {
      editor.tf.toggleBlock(type)
    }
  }

  return (
    <div
      ref={toolbarRef}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        background: '#1a1a1a',
        border: '1px solid #2e2e2e',
        borderRadius: 8,
        padding: '4px 5px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        userSelect: 'none',
      }}
      onMouseDown={e => e.preventDefault()}
    >
      {/* Turn into */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowTurnInto(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '3px 8px', borderRadius: 5, border: 'none',
            background: showTurnInto ? '#2e2e2e' : 'transparent',
            color: '#ccc', fontSize: '0.75rem', fontWeight: 500,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          Turn into
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: showTurnInto ? 'rotate(180deg)' : 'none', transition: 'transform 0.12s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showTurnInto && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, marginTop: 4,
            background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8,
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)', overflow: 'hidden',
            minWidth: 180, zIndex: 300,
          }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 12px 4px' }}>
              Turn into
            </p>
            {TURN_INTO_ITEMS.map(item => (
              <button
                key={item.type}
                onMouseDown={e => { e.preventDefault(); setBlock(item.type) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '7px 12px', border: 'none',
                  background: 'transparent', cursor: 'pointer', textAlign: 'left',
                  fontSize: '0.85rem', color: '#333',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: '0.75rem', color: '#888', width: 20, textAlign: 'center', fontFamily: 'monospace' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 18, background: '#333', margin: '0 3px', flexShrink: 0 }} />

      {/* Mark buttons */}
      {[
        { key: BoldPlugin.key, title: 'Bold', label: <strong style={{ fontSize: '0.8rem' }}>B</strong> },
        { key: ItalicPlugin.key, title: 'Italic', label: <em style={{ fontSize: '0.8rem' }}>I</em> },
        { key: UnderlinePlugin.key, title: 'Underline', label: <u style={{ fontSize: '0.8rem' }}>U</u> },
        { key: StrikethroughPlugin.key, title: 'Strikethrough', label: <s style={{ fontSize: '0.8rem' }}>S</s> },
        {
          key: CodePlugin.key, title: 'Inline code', label: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
          )
        },
      ].map(btn => (
        <button
          key={btn.key}
          title={btn.title}
          onMouseDown={e => { e.preventDefault(); toggleMark(btn.key) }}
          style={{
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 5, border: 'none', background: 'transparent', color: '#ccc',
            cursor: 'pointer', flexShrink: 0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2e2e2e'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#ccc' }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}

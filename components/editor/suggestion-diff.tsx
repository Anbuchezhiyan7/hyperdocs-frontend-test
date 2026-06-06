'use client'

/**
 * Shared AI suggestion diff UI for Plate.js editor elements.
 *
 * When a block node carries a `before` string field the element renders
 * an inline card that shows the old text (before) next to the new text
 * (children), and lets the author Accept or Decline the suggestion.
 *
 * Accept  → sets `before: null`, keeps current children text.
 * Decline → replaces children text with the `before` value, sets `before: null`.
 */

import React from 'react'
import { useEditorRef } from 'platejs/react'

/* ------------------------------------------------------------------ */
/*  Hook — encapsulates accept / decline logic for any block element   */
/* ------------------------------------------------------------------ */

// Accept the raw Slate element node (not full PlateElementProps) so the hook
// works correctly after `children` has been destructured out in each component.
type SlateElementNode = Record<string, unknown> & {
  before?: string | null
  children?: { text?: string }[]
}

export function useSuggestion(elementNode: SlateElementNode) {
  const editor = useEditorRef()

  const before = elementNode.before ?? null

  // Flatten all leaf text in children (handles mixed rich-text leaves)
  const afterText = (elementNode.children ?? [])
    .map((c) => c.text ?? '')
    .join('')

  const hasSuggestion = before != null && before !== ''

  function handleAccept() {
    // Keep current children as-is; just clear the suggestion marker.
    editor.tf.setNodes(
      { before: null } as any,
      { match: (n) => n === elementNode, at: [] }
    )
  }

  function handleDecline() {
    if (!hasSuggestion) return
    const beforeText = before as string

    // `setNodes` cannot write Slate children — children are structural nodes.
    // Find the element's path, remove its children, insert a fresh text node,
    // then clear the `before` marker.
    const path = editor.api.findPath(elementNode as any)
    if (!path) return

    const childCount = elementNode.children?.length ?? 1

    editor.tf.withoutNormalizing(() => {
      // Remove existing children last → first to keep indices stable
      for (let i = childCount - 1; i >= 0; i--) {
        editor.tf.removeNodes({ at: [...path, i] })
      }
      // Re-insert a single plain-text node with the original content
      editor.tf.insertNodes({ text: beforeText }, { at: [...path, 0] })
      // Clear the suggestion marker on the parent element
      editor.tf.setNodes({ before: null } as any, { at: path })
    })
  }

  return { before, afterText, hasSuggestion, handleAccept, handleDecline }
}

/* ------------------------------------------------------------------ */
/*  Shared diff card UI                                                 */
/* ------------------------------------------------------------------ */

export function SuggestionDiffCard({
  beforeText,
  afterText,
  onAccept,
  onDecline,
}: {
  beforeText: string
  afterText: string
  onAccept: () => void
  onDecline: () => void
}) {
  return (
    <div
      contentEditable={false}
      style={{
        margin: '4px 0 6px',
        borderRadius: 10,
        border: '1px solid var(--hd-border)',
        overflow: 'hidden',
        background: 'var(--hd-bg)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        userSelect: 'none',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '7px 12px',
          background: 'var(--hd-surface)',
          borderBottom: '1px solid var(--hd-border)',
        }}
      >
        {/* Sparkle icon */}
        <svg
          width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="#f26522" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f26522', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          AI Suggestion
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--hd-muted)', marginLeft: 2 }}>
          — review and accept or decline
        </span>
      </div>

      {/* ── Before / After columns ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Before */}
        <div style={{ borderRight: '1px solid var(--hd-border)', padding: '10px 12px' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#f87171', marginBottom: 6 }}>
            Before
          </div>
          <div style={{
            fontSize: '0.82rem', lineHeight: 1.6,
            color: 'var(--hd-text-soft)',
            background: 'rgba(248,113,113,0.07)',
            borderLeft: '3px solid #f87171',
            borderRadius: '0 5px 5px 0',
            padding: '6px 10px',
          }}>
            {beforeText}
          </div>
        </div>

        {/* After */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#4ade80', marginBottom: 6 }}>
            After
          </div>
          <div style={{
            fontSize: '0.82rem', lineHeight: 1.6,
            color: 'var(--hd-text-soft)',
            background: 'rgba(74,222,128,0.07)',
            borderLeft: '3px solid #4ade80',
            borderRadius: '0 5px 5px 0',
            padding: '6px 10px',
          }}>
            {afterText}
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        gap: 8, padding: '8px 12px',
        borderTop: '1px solid var(--hd-border)',
        background: 'var(--hd-bg)',
      }}>
        {/* Decline */}
        <button
          onMouseDown={(e) => { e.preventDefault(); onDecline() }}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 14px', borderRadius: 6,
            border: '1px solid var(--hd-border)',
            background: 'var(--hd-bg)',
            color: 'var(--hd-text-soft)',
            fontSize: '0.78rem', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Decline
        </button>

        {/* Accept */}
        <button
          onMouseDown={(e) => { e.preventDefault(); onAccept() }}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 14px', borderRadius: 6,
            border: 'none',
            background: '#f26522', color: '#fff',
            fontSize: '0.78rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 2px 8px rgba(242,101,34,0.3)',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Accept
        </button>
      </div>
    </div>
  )
}

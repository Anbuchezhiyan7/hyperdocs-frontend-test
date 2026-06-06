'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useEditorRef } from 'platejs/react'
import { TablePlugin } from '@platejs/table/react'
import {
  insertTableRow,
  insertTableColumn,
  deleteRow,
  deleteColumn,
  deleteTable,
} from '@platejs/table'
import { Tooltip } from 'antd'

/* ---- Icon helpers ---- */
function IconArrowUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  )
}
function IconArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  )
}
function IconArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  )
}
function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
function IconX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  )
}

/* ---- Toolbar button ---- */
function TBtn({
  tooltip,
  onClick,
  danger = false,
  children,
}: {
  tooltip: string
  onClick: () => void
  danger?: boolean
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <Tooltip title={tooltip} placement="top" mouseEnterDelay={0.4} arrow={false}>
      <button
        onMouseDown={e => { e.preventDefault(); onClick() }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: 5, border: 'none', cursor: 'pointer',
          background: hovered ? (danger ? 'rgba(239,68,68,0.08)' : '#f0f0f0') : 'transparent',
          color: hovered ? (danger ? '#ef4444' : '#1a1a1a') : (danger ? '#aaa' : '#666'),
          transition: 'background 0.12s, color 0.12s',
        }}
      >
        {children}
      </button>
    </Tooltip>
  )
}

function Sep() {
  return <div style={{ width: 1, height: 16, background: '#e8e8e8', margin: '0 2px' }} />
}

export function TableFloatingToolbar() {
  const editor = useEditorRef()
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update() {
      if (!editor.selection) { setPos(null); return }

      const tableEntry = editor.api.above({ match: (n: Record<string, unknown>) => n.type === TablePlugin.key })
      if (!tableEntry) { setPos(null); return }

      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) { setPos(null); return }

      let node: Node | null = sel.anchorNode
      let tableEl: HTMLElement | null = null
      while (node) {
        if (node.nodeType === 1) {
          const el = node as HTMLElement
          if (el.tagName === 'TABLE') { tableEl = el; break }
        }
        node = node.parentNode
      }
      if (!tableEl) { setPos(null); return }

      const rect = tableEl.getBoundingClientRect()
      setPos({ top: rect.bottom + 8, left: rect.left })
    }

    document.addEventListener('selectionchange', update)
    return () => document.removeEventListener('selectionchange', update)
  }, [editor])

  if (!pos) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 8,
        padding: '3px 4px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        userSelect: 'none',
      }}
      onMouseDown={e => e.preventDefault()}
    >
      {/* Row operations */}
      <TBtn tooltip="Insert row above" onClick={() => insertTableRow(editor as Parameters<typeof insertTableRow>[0], { before: true })}>
        <IconArrowUp />
      </TBtn>
      <TBtn tooltip="Insert row below" onClick={() => insertTableRow(editor as Parameters<typeof insertTableRow>[0])}>
        <IconArrowDown />
      </TBtn>
      <TBtn tooltip="Delete row" danger onClick={() => deleteRow(editor as Parameters<typeof deleteRow>[0])}>
        <IconX />
      </TBtn>

      <Sep />

      {/* Column operations */}
      <TBtn tooltip="Insert column left" onClick={() => insertTableColumn(editor as Parameters<typeof insertTableColumn>[0], { before: true })}>
        <IconArrowLeft />
      </TBtn>
      <TBtn tooltip="Insert column right" onClick={() => insertTableColumn(editor as Parameters<typeof insertTableColumn>[0])}>
        <IconArrowRight />
      </TBtn>
      <TBtn tooltip="Delete column" danger onClick={() => deleteColumn(editor as Parameters<typeof deleteColumn>[0])}>
        <IconX />
      </TBtn>

      <Sep />

      {/* Delete table */}
      <TBtn tooltip="Delete table" danger onClick={() => deleteTable(editor as Parameters<typeof deleteTable>[0])}>
        <IconTrash />
      </TBtn>
    </div>
  )
}

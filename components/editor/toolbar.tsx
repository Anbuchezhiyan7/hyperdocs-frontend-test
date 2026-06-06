'use client'

import React from 'react'
import { useEditorRef } from 'platejs/react'
import {
  H1Plugin,
  H2Plugin,
  H3Plugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  BlockquotePlugin,
  CodePlugin,
} from '@platejs/basic-nodes/react'
import { toggleList, ListStyleType } from '@platejs/list'

type ToolbarButtonProps = {
  title: string
  onClick: () => void
  children: React.ReactNode
  variant?: 'default' | 'active'
}

function ToolbarButton({ title, onClick, children, variant = 'default' }: ToolbarButtonProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <button
      title={title}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-100"
      style={{
        background: variant === 'active'
          ? 'var(--hd-accent-light)'
          : hovered ? 'var(--hd-surface)' : 'transparent',
        color: variant === 'active'
          ? 'var(--hd-accent)'
          : hovered ? 'var(--hd-text)' : 'var(--hd-muted)',
      }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-4 mx-1 bg-gray-200" />
}

export function EditorToolbar() {
  const editor = useEditorRef()

  function toggleMark(key: string) {
    if (!editor) return
    // @ts-expect-error dynamic mark toggling
    editor.tf.toggleMark({ key })
  }

  function setBlock(type: string) {
    if (!editor) return
    editor.tf.toggleBlock(type)
  }

  function insertTable() {
    if (!editor) return
    // @ts-expect-error table insert api
    editor.tf.insert.table({ rowCount: 3, colCount: 3 })
  }

  function insertImage() {
    if (!editor) return
    const url = prompt('Enter image URL:')
    if (url) {
      // @ts-expect-error media insert api
      editor.tf.insert.imageFromFiles?.()
      // Fallback: insert image node directly
      editor.tf.insertNodes([{ type: 'img', url, children: [{ text: '' }] }] as Parameters<typeof editor.tf.insertNodes>[0])
    }
  }

  function toggleBulletList() {
    if (!editor) return
    toggleList(editor as Parameters<typeof toggleList>[0], { listStyleType: ListStyleType.Disc })
  }

  function toggleNumberedList() {
    if (!editor) return
    toggleList(editor as Parameters<typeof toggleList>[0], { listStyleType: ListStyleType.Decimal })
  }

  return (
    <div
      className="flex items-center gap-0.5 px-3 py-2 border-b flex-wrap"
      style={{ borderColor: 'var(--hd-border)', background: 'var(--hd-bg)' }}
    >
      {/* Headings */}
      <ToolbarButton title="Heading 1" onClick={() => setBlock(H1Plugin.key)}>
        <span className="font-bold text-[11px]">H1</span>
      </ToolbarButton>
      <ToolbarButton title="Heading 2" onClick={() => setBlock(H2Plugin.key)}>
        <span className="font-bold text-[11px]">H2</span>
      </ToolbarButton>
      <ToolbarButton title="Heading 3" onClick={() => setBlock(H3Plugin.key)}>
        <span className="font-bold text-[11px]">H3</span>
      </ToolbarButton>

      <Divider />

      {/* Marks */}
      <ToolbarButton title="Bold (Ctrl+B)" onClick={() => toggleMark(BoldPlugin.key)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        </svg>
      </ToolbarButton>
      <ToolbarButton title="Italic (Ctrl+I)" onClick={() => toggleMark(ItalicPlugin.key)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" />
        </svg>
      </ToolbarButton>
      <ToolbarButton title="Underline (Ctrl+U)" onClick={() => toggleMark(UnderlinePlugin.key)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line x1="4" y1="21" x2="20" y2="21" />
        </svg>
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" onClick={() => toggleMark(StrikethroughPlugin.key)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><path d="M16 6C16 6 14.5 4 12 4s-5 1-5 4c0 5 10 3 10 8s-3 4-5 4-5-2-5-2" />
        </svg>
      </ToolbarButton>
      <ToolbarButton title="Inline Code" onClick={() => toggleMark(CodePlugin.key)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      </ToolbarButton>

      <Divider />

      {/* Bullet list */}
      <ToolbarButton title="Bullet List" onClick={toggleBulletList}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
          <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      </ToolbarButton>

      {/* Numbered list */}
      <ToolbarButton title="Numbered List" onClick={toggleNumberedList}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
          <path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
      </ToolbarButton>

      <Divider />

      {/* Blockquote */}
      <ToolbarButton title="Blockquote" onClick={() => setBlock(BlockquotePlugin.key)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </ToolbarButton>

      {/* Table */}
      <ToolbarButton title="Insert Table" onClick={insertTable}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      </ToolbarButton>

      {/* Image */}
      <ToolbarButton title="Insert Image" onClick={insertImage}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      </ToolbarButton>
    </div>
  )
}

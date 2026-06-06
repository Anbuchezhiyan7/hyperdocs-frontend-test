'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useEditorRef } from 'platejs/react'

export function PlusInsertButton() {
  const editor = useEditorRef()
  const [buttonPos, setButtonPos] = useState<{ top: number; left: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const showMenuRef = useRef(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoveredBlockRef = useRef<Element | null>(null)

  const cancelHide = useCallback(() => {
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null }
  }, [])

  const scheduleHide = useCallback((delay = 300) => {
    if (showMenuRef.current) return
    cancelHide()
    hideTimerRef.current = setTimeout(() => setButtonPos(null), delay)
  }, [cancelHide])

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (showMenuRef.current) return
      if (btnRef.current?.contains(e.target as Node)) { cancelHide(); return }

      const editorEl = document.querySelector('[data-slate-editor]')
      if (!editorEl) return

      const editorRect = editorEl.getBoundingClientRect()
      const BUTTON_ZONE = 48

      const inZone =
        e.clientX >= editorRect.left - BUTTON_ZONE &&
        e.clientX <= editorRect.right &&
        e.clientY >= editorRect.top &&
        e.clientY <= editorRect.bottom

      if (!inZone) { scheduleHide(200); return }
      if (e.clientX < editorRect.left) { cancelHide(); return }

      // Find top-level block under cursor
      let block: Element | null = null
      let node: Node | null = e.target as Node
      while (node) {
        if (node.nodeType === 1) {
          const el = node as Element
          if (el === editorEl) break
          if (el.getAttribute('data-slate-node') === 'element') {
            const parentEl: HTMLElement | null = el.parentElement
            if (parentEl === editorEl || parentEl?.hasAttribute('data-slate-editor')) { block = el; break }
          }
        }
        node = node.parentNode
      }

      if (!block) {
        let el: Element | null = (e.target as Element).closest?.('[data-slate-node="element"]') ?? null
        while (el) {
          const parentEl: HTMLElement | null = el.parentElement
          if (parentEl === editorEl || parentEl?.hasAttribute('data-slate-editor')) { block = el; break }
          el = parentEl
        }
      }

      if (!block) { scheduleHide(200); return }
      if (block.tagName === 'H1' || (block as HTMLElement).dataset.type === 'h1') { scheduleHide(200); return }

      cancelHide()
      hoveredBlockRef.current = block
      const rect = block.getBoundingClientRect()
      setButtonPos({
        top: rect.top + rect.height / 2 - 11,
        left: editorRect.left - 32,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [scheduleHide, cancelHide])

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()

    const editorEl = document.querySelector('[data-slate-editor]')
    if (!editorEl || !hoveredBlockRef.current) return

    // Find hovered block index among top-level editor children
    const blocks = Array.from(editorEl.querySelectorAll(':scope > [data-slate-node="element"]'))
    const index = blocks.indexOf(hoveredBlockRef.current)
    if (index === -1) return

    const insertPath = [index + 1]

    // Insert new empty paragraph below the hovered block
    editor.tf.insertNodes(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { type: 'p', children: [{ text: '' }] } as any,
      { at: insertPath }
    )

    // Explicitly select the start of the new paragraph and type '/'
    requestAnimationFrame(() => {
      try {
        editor.tf.select({ path: [...insertPath, 0], offset: 0 })
        editor.tf.insertText('/')
      } catch { /* ignore if path stale */ }
    })
  }

  if (!buttonPos) return null

  return (
    <button
      ref={btnRef}
      onMouseDown={handleClick}
      onMouseEnter={e => {
        cancelHide()
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#aaa'
        ;(e.currentTarget as HTMLButtonElement).style.color = '#333'
      }}
      onMouseLeave={e => {
        scheduleHide(300)
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#ddd'
        ;(e.currentTarget as HTMLButtonElement).style.color = '#888'
      }}
      style={{
        position: 'fixed',
        top: buttonPos.top,
        left: buttonPos.left,
        width: 22,
        height: 22,
        borderRadius: 5,
        border: '1.5px solid #ddd',
        background: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        fontSize: '1rem',
        lineHeight: 1,
        zIndex: 100,
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        transition: 'border-color 0.1s, color 0.1s',
      }}
      title="Insert block below"
    >
      +
    </button>
  )
}

'use client'

import React from 'react'
import { PlateElement, PlateLeaf, useSelected, useFocused, useEditorRef } from 'platejs/react'
import type { PlateElementProps, PlateLeafProps } from 'platejs/react'
import { apiDeleteImage } from '@/lib/api/settings'
import { SuggestionDiffCard, useSuggestion } from './suggestion-diff'
import {
  useTableElement,
  useTableCellElement,
  useTableCellElementResizable,
  useTableColSizes,
  TablePlugin,
  TableProvider,
} from '@platejs/table/react'
import { ResizeHandle } from '@platejs/resizable'

function isEmpty(element: PlateElementProps['element']): boolean {
  const children = element.children as { text?: string }[] | undefined
  return !children || (children.length === 1 && (children[0].text ?? '') === '')
}

/* -------------------- Block elements -------------------- */

const BODY_PLACEHOLDER = 'Start writing or Type / for widgets'

export function H1Element({ children, ...props }: PlateElementProps) {
  const selected = useSelected()
  const focused = useFocused()
  const showPlaceholder = selected && focused && isEmpty(props.element)
  const { before, afterText, hasSuggestion, handleAccept, handleDecline } = useSuggestion(props.element as any)
  return (
    <PlateElement
      as="h1"
      {...props}
      className="font-bold mb-6"
      style={{ color: 'var(--hd-text)', fontSize: '2rem', lineHeight: 1.25, marginTop: 0, position: 'relative' }}
      data-placeholder={showPlaceholder ? 'Enter Page title' : undefined}
    >
      {hasSuggestion && (
        <SuggestionDiffCard
          beforeText={before!}
          afterText={afterText}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      {children}
    </PlateElement>
  )
}

export function H2Element({ children, ...props }: PlateElementProps) {
  const selected = useSelected()
  const focused = useFocused()
  const showPlaceholder = selected && focused && isEmpty(props.element)
  const { before, afterText, hasSuggestion, handleAccept, handleDecline } = useSuggestion(props.element as any)
  return (
    <PlateElement as="h2" {...props} className="text-2xl font-semibold mt-6 mb-2"
      style={{ color: 'var(--hd-text)', position: 'relative' }}
      data-placeholder={showPlaceholder ? BODY_PLACEHOLDER : undefined}
    >
      {hasSuggestion && (
        <SuggestionDiffCard
          beforeText={before!}
          afterText={afterText}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      {children}
    </PlateElement>
  )
}

export function H3Element({ children, ...props }: PlateElementProps) {
  const selected = useSelected()
  const focused = useFocused()
  const showPlaceholder = selected && focused && isEmpty(props.element)
  const { before, afterText, hasSuggestion, handleAccept, handleDecline } = useSuggestion(props.element as any)
  return (
    <PlateElement as="h3" {...props} className="text-xl font-semibold mt-5 mb-2"
      style={{ color: 'var(--hd-text)', position: 'relative' }}
      data-placeholder={showPlaceholder ? BODY_PLACEHOLDER : undefined}
    >
      {hasSuggestion && (
        <SuggestionDiffCard
          beforeText={before!}
          afterText={afterText}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      {children}
    </PlateElement>
  )
}

export function ParagraphElement({ children, ...props }: PlateElementProps) {
  const selected = useSelected()
  const focused = useFocused()
  const showPlaceholder = selected && focused && isEmpty(props.element)
  const { before, afterText, hasSuggestion, handleAccept, handleDecline } = useSuggestion(props)
  return (
    <PlateElement as="div" {...props} className="my-1 leading-7"
      style={{ color: 'var(--hd-text-soft)', position: 'relative' }}
      data-placeholder={showPlaceholder ? BODY_PLACEHOLDER : undefined}
    >
      {hasSuggestion && (
        <SuggestionDiffCard
          beforeText={before!}
          afterText={afterText}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      {children}
    </PlateElement>
  )
}

export function BlockquoteElement({ children, ...props }: PlateElementProps) {
  const { before, afterText, hasSuggestion, handleAccept, handleDecline } = useSuggestion(props)
  return (
    <PlateElement
      as="blockquote"
      {...props}
      className="my-4 px-5 py-3 rounded-r-xl italic text-sm"
      style={{
        borderLeft: '3px solid var(--hd-accent)',
        background: 'var(--hd-accent-light)',
        color: 'var(--hd-text-soft)',
      }}
    >
      {hasSuggestion && (
        <SuggestionDiffCard
          beforeText={before!}
          afterText={afterText}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      {children}
    </PlateElement>
  )
}

export function HrElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement as="div" {...props}>
      <hr className="my-6" style={{ borderColor: 'var(--hd-border)' }} />
      {children}
    </PlateElement>
  )
}

/* -------------------- Code block -------------------- */

export function CodeBlockElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement
      as="div"
      {...props}
      className="my-4 rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--hd-border)' }}
    >
      <div
        className="px-4 py-2 text-xs font-medium flex items-center justify-between"
        style={{ background: 'var(--hd-surface)', color: 'var(--hd-muted)', borderBottom: '1px solid var(--hd-border)' }}
      >
        <span>Code</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono" style={{ background: '#1e1e2e', color: '#cdd6f4' }}>
        <code>{children}</code>
      </pre>
    </PlateElement>
  )
}

export function CodeLineElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement as="div" {...props}>
      {children}
    </PlateElement>
  )
}

/* -------------------- Table -------------------- */

function TableElementInner({ children, ...props }: PlateElementProps) {
  const { props: tableProps } = useTableElement()
  const colSizes = useTableColSizes(props.element as Parameters<typeof useTableColSizes>[0])

  return (
    <PlateElement as="div" {...props} className="my-5" style={{ overflowX: 'visible' }}>
      <div className="group/table relative w-fit">
        <table
          {...tableProps}
          style={{
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            tableLayout: 'fixed',
            height: '1px',
          }}
        >
          {colSizes && colSizes.length > 0 && (
            <colgroup>
              {colSizes.map((size, i) => (
                <col key={i} style={{ width: size > 0 ? size : undefined }} />
              ))}
            </colgroup>
          )}
          <tbody>{children}</tbody>
        </table>
      </div>
    </PlateElement>
  )
}

export function TableElement(props: PlateElementProps) {
  return (
    <TableProvider>
      <TableElementInner {...props} />
    </TableProvider>
  )
}

export function TableRowElement({ children, ...props }: PlateElementProps) {
  return (
    <PlateElement as="tr" {...props}>
      {children}
    </PlateElement>
  )
}

function TableCellContent({
  as,
  children,
  props,
}: {
  as: 'td' | 'th'
  children: React.ReactNode
  props: PlateElementProps
}) {
  const { colIndex, colSpan, minHeight, rowIndex, selected, width } = useTableCellElement()
  const { minColumnWidth } = useEditorRef().getPlugin({ key: TablePlugin.key }).options as { minColumnWidth?: number }

  const { hiddenLeft, leftProps, rightProps } = useTableCellElementResizable({
    colIndex,
    colSpan: colSpan ?? 1,
    rowIndex,
  })

  const cellWidth = width || undefined

  return (
    <PlateElement
      as={as}
      {...props}
      style={{
        position: 'relative',
        padding: '12px 16px',
        border: '1px solid var(--hd-border)',
        background: selected ? 'rgba(59,130,246,0.07)' : as === 'th' ? 'var(--hd-bg-soft)' : 'var(--hd-bg)',
        color: as === 'th' ? 'var(--hd-text)' : 'var(--hd-text-soft)',
        fontWeight: as === 'th' ? 600 : 400,
        minWidth: cellWidth ?? (minColumnWidth ?? 160),
        maxWidth: cellWidth,
        minHeight: minHeight ?? 48,
        verticalAlign: 'top',
        textAlign: 'left',
        fontSize: '0.9rem',
        height: '100%',
        overflow: 'visible',
      }}
    >
      <div style={{ position: 'relative', zIndex: 20, height: '100%' }}>
        {children}
      </div>
      {/* Resize handles container */}
      <div
        className="group"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        contentEditable={false}
      >
        {/* Right resize handle */}
        <ResizeHandle
          {...rightProps}
          data-col={colIndex}
          style={{
            position: 'absolute', top: -4, right: -4,
            width: 8, height: 'calc(100% + 8px)', cursor: 'col-resize',
            background: 'transparent', zIndex: 30, pointerEvents: 'all',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.35)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        />
        {/* Left resize handle */}
        {!hiddenLeft && (
          <ResizeHandle
            {...leftProps}
            style={{
              position: 'absolute', top: 0, left: -4,
              width: 8, height: '100%', cursor: 'col-resize',
              background: 'transparent', zIndex: 30, pointerEvents: 'all',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.35)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          />
        )}
      </div>
    </PlateElement>
  )
}

export function TableCellElement(props: PlateElementProps) {
  useTableCellElement()
  return <TableCellContent as="td" props={props}>{props.children}</TableCellContent>
}

export function TableCellHeaderElement(props: PlateElementProps) {
  useTableCellElement()
  return <TableCellContent as="th" props={props}>{props.children}</TableCellContent>
}

/* -------------------- Image -------------------- */

export function ImageElement({ children, ...props }: PlateElementProps) {
  const url = (props.element as unknown as { url?: string }).url
  const alt = (props.element as unknown as { alt?: string }).alt
  const imageId = (props.element as unknown as { image_id?: string }).image_id
  const uploading = (props.element as unknown as { uploading?: boolean }).uploading
  const [hovered, setHovered] = React.useState(false)
  const editor = useEditorRef()

  function handleDelete() {
    // Fire API delete if we have a server-tracked image_id
    if (imageId) {
      apiDeleteImage(imageId) // fire-and-forget: remove from editor immediately
    }
    editor.tf.removeNodes({ match: (n) => n === props.element, at: [] })
  }

  return (
    <PlateElement as="div" {...props} className="my-5">
      {uploading ? (
        <div
          contentEditable={false}
          style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '160px', background: 'var(--hd-surface)', border: '1px solid var(--hd-border)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin w-7 h-7 text-hd-accent" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm font-semibold text-hd-text-soft">Uploading image...</span>
          </div>
        </div>
      ) : url ? (
        <div
          contentEditable={false}
          style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', display: 'inline-block', width: '100%' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={alt ?? ''}
            style={{ width: '100%', display: 'block', borderRadius: 10, border: '1px solid var(--hd-border)' }}
          />
          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 10,
            background: 'rgba(0,0,0,0.35)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.18s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: hovered ? 'auto' : 'none',
          }}>
            <button
              onMouseDown={e => { e.preventDefault(); handleDelete() }}
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
        </div>
      ) : null}
      {children}
    </PlateElement>
  )
}

/* -------------------- Leaves (marks) -------------------- */

export function BoldLeaf({ children, ...props }: PlateLeafProps) {
  return (
    <PlateLeaf as="strong" {...props} className="font-bold" style={{ color: 'var(--hd-text)' }}>
      {children}
    </PlateLeaf>
  )
}

export function ItalicLeaf({ children, ...props }: PlateLeafProps) {
  return (
    <PlateLeaf as="em" {...props} className="italic">
      {children}
    </PlateLeaf>
  )
}

export function UnderlineLeaf({ children, ...props }: PlateLeafProps) {
  return (
    <PlateLeaf as="u" {...props} className="underline underline-offset-2">
      {children}
    </PlateLeaf>
  )
}

export function StrikethroughLeaf({ children, ...props }: PlateLeafProps) {
  return (
    <PlateLeaf as="s" {...props} className="line-through opacity-60">
      {children}
    </PlateLeaf>
  )
}

export function CodeLeaf({ children, ...props }: PlateLeafProps) {
  return (
    <PlateLeaf
      as="code"
      {...props}
      className="rounded px-1.5 py-0.5 text-[0.85em] font-mono"
      style={{
        background: 'var(--hd-accent-light)',
        color: 'var(--hd-accent)',
        border: '1px solid var(--hd-accent-mid)',
      }}
    >
      {children}
    </PlateLeaf>
  )
}

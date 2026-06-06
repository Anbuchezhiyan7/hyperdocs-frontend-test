'use client'

import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDocsChangesStore, FileChange, ChangeType } from '@/lib/store/useDocsChangesStore'
import { apiPublishDocs } from '@/lib/api/docs'
import { useDocs, NavItem } from '@/lib/docs-context'

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                  */
/* ------------------------------------------------------------------ */

type ValidationIssue = {
  id: string
  title: string
  itemType: 'page' | 'folder'
  reason: 'empty-folder' | 'empty-page'
}

/** Recursively extract all text from a Plate.js block tree */
function extractText(node: any): string {
  if (typeof node?.text === 'string') return node.text
  if (Array.isArray(node?.children)) return node.children.map(extractText).join('')
  return ''
}

/** Returns true if the page has no meaningful content */
function isPageEmpty(content: unknown[] | undefined): boolean {
  if (!content || content.length === 0) return true
  const allText = content.map(extractText).join('').trim()
  return allText === ''
}

/** Walks the full tree and returns all empty folders + empty pages */
function findIssues(items: NavItem[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  function walk(nodes: NavItem[]) {
    for (const node of nodes) {
      if (node.type === 'folder') {
        const hasChildren = node.children && node.children.length > 0
        if (!hasChildren) {
          issues.push({ id: node.id, title: node.title, itemType: 'folder', reason: 'empty-folder' })
        } else {
          walk(node.children!)
        }
      } else {
        if (isPageEmpty(node.content as unknown[] | undefined)) {
          issues.push({ id: node.id, title: node.title, itemType: 'page', reason: 'empty-page' })
        }
      }
    }
  }

  walk(items)
  return issues
}

/**
 * Recursively scans all blocks across all pages to detect any block
 * that still has a non-null `before` field (unresolved AI suggestion).
 */
function countPendingSuggestions(items: NavItem[]): number {
  let count = 0

  function scanBlocks(blocks: any[]) {
    for (const block of blocks) {
      if (block && typeof block === 'object') {
        if (block.before != null && block.before !== '') {
          count++
        }
        if (Array.isArray(block.children)) {
          scanBlocks(block.children)
        }
      }
    }
  }

  function walkPages(nodes: NavItem[]) {
    for (const node of nodes) {
      if (node.type === 'page' && Array.isArray(node.content)) {
        scanBlocks(node.content as any[])
      } else if (node.type === 'folder' && node.children) {
        walkPages(node.children)
      }
    }
  }

  walkPages(items)
  return count
}

/* ------------------------------------------------------------------ */
/*  Icon helpers                                                        */
/* ------------------------------------------------------------------ */

function IconFile() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function IconFolder() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function IconWarn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Change badge                                                        */
/* ------------------------------------------------------------------ */

const BADGE: Record<ChangeType, { label: string; color: string; bg: string }> = {
  created: { label: 'New', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  modified: { label: 'Modified', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  deleted: { label: 'Deleted', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  renamed: { label: 'Renamed', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  moved: { label: 'Moved', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
}

function ChangeBadge({ type }: { type: ChangeType }) {
  const { label, color, bg } = BADGE[type]
  return (
    <span style={{ fontSize: '0.65rem', fontWeight: 600, color, background: bg, border: `1px solid ${color}33`, borderRadius: 4, padding: '1px 5px', lineHeight: 1.5, letterSpacing: '0.02em', flexShrink: 0 }}>
      {label}
    </span>
  )
}

function ChangeRow({ change }: { change: FileChange }) {
  const Icon = change.itemType === 'folder' ? IconFolder : IconFile
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', fontSize: '0.78rem', color: 'var(--hd-admin-text, #9ca3af)' }}>
      <Icon />
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{change.title}</span>
      <ChangeBadge type={change.changeType} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Validation warning modal                                            */
/* ------------------------------------------------------------------ */

function ValidationModal({ issues, onClose }: { issues: ValidationIssue[]; onClose: () => void }) {
  const emptyFolders = issues.filter((i) => i.reason === 'empty-folder')
  const emptyPages = issues.filter((i) => i.reason === 'empty-page')

  return (
    /* Backdrop */
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: 'var(--hd-admin-nav, #1a1a1a)', border: '1px solid var(--hd-admin-border, #2e2e2e)', borderRadius: 12, width: 380, maxWidth: '90vw', boxShadow: '0 16px 48px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 18px 12px', borderBottom: '1px solid var(--hd-admin-border, #2e2e2e)' }}>
          <IconWarn />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--hd-text, #e5e7eb)' }}>Cannot publish yet</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hd-admin-text, #9ca3af)', marginTop: 2 }}>
              Fix the following issues before publishing
            </div>
          </div>
        </div>

        {/* Issues list */}
        <div style={{ padding: '12px 18px', maxHeight: 280, overflowY: 'auto' }}>
          {emptyFolders.length > 0 && (
            <>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Empty folders ({emptyFolders.length})
              </div>
              {emptyFolders.map((issue) => (
                <div key={issue.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--hd-admin-border, #2e2e2e)' }}>
                  <div style={{ marginTop: 1, flexShrink: 0, color: '#f59e0b' }}><IconFolder /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--hd-text, #e5e7eb)' }}>{issue.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--hd-admin-text, #9ca3af)', marginTop: 1 }}>
                      Empty folder — add at least one page, or delete it
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {emptyPages.length > 0 && (
            <div style={{ marginTop: emptyFolders.length > 0 ? 12 : 0 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Empty pages ({emptyPages.length})
              </div>
              {emptyPages.map((issue) => (
                <div key={issue.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--hd-admin-border, #2e2e2e)' }}>
                  <div style={{ marginTop: 1, flexShrink: 0, color: '#f87171' }}><IconFile /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--hd-text, #e5e7eb)' }}>{issue.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--hd-admin-text, #9ca3af)', marginTop: 1 }}>
                      Empty page — add content, or delete it
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--hd-admin-border, #2e2e2e)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '7px 20px', borderRadius: 7, border: 'none', background: 'var(--hd-admin-border, #2e2e2e)', color: 'var(--hd-text, #e5e7eb)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Publish panel dropdown                                              */
/* ------------------------------------------------------------------ */

export function PublishPanel() {
  const [open, setOpen] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const { changes, clearChanges } = useDocsChangesStore()
  const { items } = useDocs()

  const count = changes.length

  // Close panel on outside click
  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  async function handlePublish() {
    // ── Check for unresolved AI suggestions ─────────────────────────
    const suggestionCount = countPendingSuggestions(items)
    if (suggestionCount > 0) {
      setOpen(false)
      toast.warning(
        `${suggestionCount} AI suggestion${suggestionCount !== 1 ? 's' : ''} need your review. Accept or decline all suggestions before publishing.`,
        {
          autoClose: 6000,
          style: { fontSize: '0.82rem' },
        }
      )
      return
    }

    // ── Validate structure ───────────────────────────────────────────
    const issues = findIssues(items)
    if (issues.length > 0) {
      setValidationIssues(issues)
      return
    }

    // ── Proceed with publish ─────────────────────────────────────────
    setPublishing(true)
    try {
      const res = await apiPublishDocs()
      if (res.success) {
        // Bust the public-docs cache so visitors see updated content immediately
        await fetch('/api/revalidate', { method: 'POST' })
        clearChanges()
        setOpen(false)
        toast.success('Docs published successfully!', { autoClose: 3000, style: { fontSize: '0.82rem' } })
      } else {
        toast.error(res.message || 'Publish failed. Please try again.', { autoClose: 4000, style: { fontSize: '0.82rem' } })
      }
    } catch {
      toast.error('Publish failed. Please try again.', { autoClose: 4000, style: { fontSize: '0.82rem' } })
    } finally {
      setPublishing(false)
    }
  }

  return (
    <>
      {/* Validation warning modal (rendered outside dropdown so it's always centred) */}
      {validationIssues.length > 0 && (
        <ValidationModal issues={validationIssues} onClose={() => setValidationIssues([])} />
      )}

      <div ref={panelRef} style={{ position: 'relative' }}>
        {/* ── Trigger button ── */}
        <button
          onClick={() => count > 0 && setOpen((v) => !v)}
          disabled={count === 0}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px 5px 14px', borderRadius: 8, border: 'none', background: count > 0 ? '#f26522' : 'var(--hd-admin-border, #2e2e2e)', color: count > 0 ? '#fff' : 'var(--hd-admin-text, #6b7280)', fontWeight: 600, fontSize: '0.8rem', cursor: count > 0 ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'opacity 0.15s' }}
          onMouseEnter={(e) => count > 0 && (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => count > 0 && (e.currentTarget.style.opacity = '1')}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          Publish
          {count > 0 && (
            <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '0 5px', fontSize: '0.7rem', fontWeight: 700, lineHeight: 1.6 }}>
              {count}
            </span>
          )}
          <IconChevron open={open} />
        </button>

        {/* ── Dropdown panel ── */}
        {open && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 280, background: 'var(--hd-admin-nav, #1a1a1a)', border: '1px solid var(--hd-admin-border, #2a2a2a)', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.45)', zIndex: 200, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--hd-admin-border, #2a2a2a)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--hd-text, #e5e7eb)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Changes to publish</span>
              {count > 0 && <span style={{ color: 'var(--hd-admin-text, #6b7280)', fontWeight: 400 }}>{count} file{count !== 1 ? 's' : ''}</span>}
            </div>

            {/* Changes list */}
            <div style={{ maxHeight: 280, overflowY: 'auto' }}>
              {count === 0 ? (
                <div style={{ padding: '20px 12px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--hd-admin-text, #6b7280)' }}>
                  No unpublished changes
                </div>
              ) : (
                changes.slice().sort((a, b) => b.timestamp - a.timestamp).map((change) => <ChangeRow key={change.id} change={change} />)
              )}
            </div>

            {/* Publish button */}
            <div style={{ padding: '10px 12px', borderTop: '1px solid var(--hd-admin-border, #2a2a2a)' }}>
              <button
                onClick={handlePublish}
                disabled={publishing || count === 0}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 7, border: 'none', background: count === 0 ? 'var(--hd-admin-border, #2a2a2a)' : '#f26522', color: count === 0 ? 'var(--hd-admin-text, #6b7280)' : '#fff', fontWeight: 600, fontSize: '0.82rem', cursor: count === 0 || publishing ? 'not-allowed' : 'pointer', opacity: publishing ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'inherit', transition: 'opacity 0.15s' }}
              >
                {publishing ? (
                  <>
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Publishing…
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Publish
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

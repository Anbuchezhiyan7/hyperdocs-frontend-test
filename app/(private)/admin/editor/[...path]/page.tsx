'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useDocs, IncomingChange } from '@/lib/docs-context'
import { PlateEditor } from '@/components/editor/plate-editor'
import { PROJECT_ID } from '@/lib/architecture'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { useAppStore } from '@/lib/store/useAppStore'
import { apiGetSettings } from '@/lib/api/auth'



/* ------------------------------------------------------------------ */
/*  Diff helpers                                                        */
/* ------------------------------------------------------------------ */

function blockToText(block: Record<string, unknown>): string {
  const children = (block.children as Record<string, unknown>[]) ?? []
  return children.map(child => {
    if (typeof child.text === 'string') return child.text
    return blockToText(child as Record<string, unknown>)
  }).join('')
}

type DiffEntry = { status: 'added' | 'removed' | 'unchanged'; block: unknown }

function computeDiff(oldBlocks: unknown[], newBlocks: unknown[]): DiffEntry[] {
  const oldTexts = new Map<string, number>()
  for (const b of oldBlocks) {
    const t = blockToText(b as Record<string, unknown>).trim()
    if (t) oldTexts.set(t, (oldTexts.get(t) ?? 0) + 1)
  }
  const result: DiffEntry[] = []
  for (const b of newBlocks) {
    const t = blockToText(b as Record<string, unknown>).trim()
    if (t && oldTexts.has(t) && oldTexts.get(t)! > 0) {
      oldTexts.set(t, oldTexts.get(t)! - 1)
      result.push({ status: 'unchanged', block: b })
    } else {
      result.push({ status: 'added', block: b })
    }
  }
  return result
}

/* ------------------------------------------------------------------ */
/*  Block preview renderer                                              */
/* ------------------------------------------------------------------ */

function BlockPreview({ block, status }: { block: unknown; status: 'added' | 'removed' | 'unchanged' }) {
  const b = block as Record<string, unknown>
  const text = blockToText(b)
  if (!text.trim()) return null

  const type = b.type as string
  const isAdded = status === 'added'

  const style: React.CSSProperties = {
    padding: '4px 8px 4px 10px',
    borderRadius: 4,
    marginBottom: 2,
    fontSize: isAdded ? '0.82rem' : '0.78rem',
    lineHeight: 1.5,
    background: isAdded ? 'rgba(34,197,94,0.1)' : 'transparent',
    borderLeft: isAdded ? '3px solid #22c55e' : '3px solid transparent',
    color: isAdded ? '#166534' : 'var(--hd-muted)',
    fontWeight: type === 'h1' ? 700 : type === 'h2' ? 600 : type === 'h3' ? 600 : 400,
    fontFamily: type === 'code_block' || type === 'code_line' ? 'monospace' : 'inherit',
  }

  return <div style={style}>{isAdded && <span style={{ color: '#22c55e', marginRight: 4, fontWeight: 700 }}>+</span>}{text}</div>
}

/* ------------------------------------------------------------------ */
/*  Review banner + diff panel                                          */
/* ------------------------------------------------------------------ */

function ReviewPanel({
  change,
  currentContent,
  onAccept,
  onReject,
}: {
  change: IncomingChange
  currentContent: unknown[]
  onAccept: () => void
  onReject: () => void
}) {
  const [showDiff, setShowDiff] = useState(false)
  const [confirmRejectOpen, setConfirmRejectOpen] = useState(false)
  const diff = showDiff ? computeDiff(currentContent, change.newContent) : []
  const addedCount = showDiff
    ? diff.filter(d => d.status === 'added').length
    : computeDiff(currentContent, change.newContent).filter(d => d.status === 'added').length

  return (
    <>
      {/* Banner */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, padding: '8px 20px',
        background: 'rgba(242,101,34,0.08)',
        borderBottom: '1px solid rgba(242,101,34,0.2)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#c04e10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
          <span style={{ fontSize: '0.9rem', color: 'var(--hd-text)', fontWeight: 500 }}>
            Incoming changes from{' '}
            <code style={{ background: 'rgba(242,101,34,0.12)', border: '1px solid rgba(242,101,34,0.3)', borderRadius: 3, padding: '1px 7px', fontSize: '0.85rem', color: '#c04e10' }}>
              {change.branchName}
            </code>
            {' '}<span style={{ color: 'var(--hd-text-soft)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{change.commitSha}</span>
          </span>
          <button
            onClick={() => setShowDiff(v => !v)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '0.85rem', color: 'var(--hd-text-soft)',
              display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
            }}
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: showDiff ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {showDiff ? 'Hide' : `Show diff`}
            {!showDiff && addedCount > 0 && (
              <span style={{ background: '#22c55e', color: '#fff', borderRadius: 8, fontSize: '0.75rem', padding: '0 6px', fontWeight: 700 }}>
                +{addedCount}
              </span>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => setConfirmRejectOpen(true)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid var(--hd-border)',
              background: 'var(--hd-bg)', color: 'var(--hd-text-soft)', fontSize: '0.85rem', cursor: 'pointer',
            }}
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            style={{
              padding: '6px 16px', borderRadius: 6, border: 'none',
              background: '#f26522', color: '#fff', fontSize: '0.85rem',
              fontWeight: 600, cursor: 'pointer',
            }}
          >
            Accept All
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmRejectOpen}
        title="Reject incoming changes?"
        description={`This will discard all incoming changes from "${change.branchName}" for this page. This action cannot be undone.`}
        confirmText="Reject changes"
        cancelText="Keep reviewing"
        danger
        onConfirm={() => { setConfirmRejectOpen(false); onReject() }}
        onCancel={() => setConfirmRejectOpen(false)}
      />

      {/* Diff panel */}
      {showDiff && (
        <div style={{
          borderBottom: '1px solid var(--hd-border)',
          background: 'var(--hd-bg-soft)',
          flexShrink: 0,
          maxHeight: 280,
          overflowY: 'auto',
          padding: '12px 20px',
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Current */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hd-muted)', margin: '0 0 8px', paddingLeft: 10 }}>
                Current
              </p>
              <div>
                {(currentContent as unknown[]).slice(0, 12).map((b, i) => (
                  <BlockPreview key={i} block={b} status="unchanged" />
                ))}
                {currentContent.length > 12 && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--hd-muted)', padding: '4px 10px', fontStyle: 'italic' }}>
                    +{currentContent.length - 12} more blocks
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 1, background: 'var(--hd-border)', flexShrink: 0 }} />

            {/* Incoming */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#22c55e', margin: '0 0 8px', paddingLeft: 10 }}>
                Incoming
              </p>
              <div>
                {diff.map((entry, i) => (
                  <BlockPreview key={i} block={entry.block} status={entry.status} />
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--hd-muted)', margin: '10px 0 0', borderTop: '1px solid var(--hd-border)', paddingTop: 8, fontStyle: 'italic' }}>
            {addedCount} new block{addedCount !== 1 ? 's' : ''} ·{' '}
            Accept to load into editor, then edit freely and publish.
          </p>
        </div>
      )}
    </>
  )
}


export default function AdminEditorPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { findByPath, updateContent, pendingChanges, acceptChange, rejectChange, saveStatus, isLoading, reloadStructure } = useDocs()
  const [publishing, setPublishing] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latestContent = useRef<Record<string, unknown>[]>([])

  const { settings, setSettings } = useAppStore()

  useEffect(() => {
    if (settings?.user_id) return

    const fetchSettings = async () => {
      try {
        const response = await apiGetSettings()
        if (response.success && response.data) {
          setSettings(response.data)
        }
      } catch (err) {
        console.error('Error fetching settings in editor:', err)
      }
    }
    fetchSettings()
  }, [setSettings, settings?.user_id])

  useEffect(() => {
    reloadStructure()
  }, [reloadStructure])


  const resolvedParams = React.use(params)
  const pathSegments = resolvedParams.path ?? []
  const page = findByPath(pathSegments)
  const pendingChange = page ? pendingChanges.find(c => c.pageId === page.id) ?? null : null

  // Clear debounce timer when page changes
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [page?.id])

  const handleChange = useCallback(
    (value: Record<string, unknown>[]) => {
      if (!page || page.type !== 'page') return

      // Store latest value without triggering any re-renders
      latestContent.current = value

      // Debounce everything — only fires 1s after last keystroke
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        // Update context once after typing stops (not on every keystroke)
        updateContent(page.id, latestContent.current)

        const payload = {
          projectId: PROJECT_ID,
          pageId: page.id,
          title: page.title,
          path: pathSegments.join('/'),
          blocks: latestContent.current.length,
          content: latestContent.current,
        }
      }, 1000)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page?.id, page?.title, updateContent]
  )

  if (isLoading) {
    return (
      <div className="flex-1 p-16 max-w-[900px] mx-auto w-full">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-12 bg-hd-border-soft rounded-lg w-1/3 mb-4"></div>
          <div className="h-4 bg-hd-border-soft rounded w-full"></div>
          <div className="h-4 bg-hd-border-soft rounded w-5/6"></div>
          <div className="h-4 bg-hd-border-soft rounded w-4/6 mb-6"></div>
          <div className="h-48 bg-hd-border-soft rounded-xl w-full"></div>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--hd-text-soft)' }}>
        <div className="text-center">
          <svg className="mx-auto mb-3 opacity-20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
          <p className="text-sm">Page not found.</p>
          <p className="text-xs mt-1 opacity-50">Select a page from the sidebar.</p>
        </div>
      </div>
    )
  }

  if (page.type === 'folder') {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--hd-text-soft)' }}>
        <div className="text-center">
          <svg className="mx-auto mb-3 opacity-20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <p className="text-sm">Select a page inside this folder to edit.</p>
        </div>
      </div>
    )
  }

  // Key changes when review state changes so editor re-mounts with updated content
  const editorKey = page.id + ':' + (pendingChange ? 'review' : 'normal')

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--hd-bg)' }}>

      {/* Page header bar */}
      <div
        className="flex items-center justify-between px-6 py-2 border-b flex-shrink-0"
        style={{ borderColor: 'var(--hd-border)', background: 'var(--hd-bg)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-medium truncate" style={{ color: 'var(--hd-text)' }}>
            {page.title}
          </span>
          <span className="text-xs hidden sm:inline" style={{ color: 'var(--hd-muted)' }}>
            /{pathSegments.join('/')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={'/' + pathSegments.join('/')}
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:opacity-70"
            style={{ borderColor: 'var(--hd-border)', color: 'var(--hd-text-soft)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Open in docs
          </a>

          {/* Autosave status */}
          {saveStatus !== 'idle' && (
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: saveStatus === 'saved' ? '#22c55e' : '#aaa' }}
            >
              {saveStatus === 'saving' ? (
                <>
                  <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Saved
                </>
              )}
            </span>
          )}


          {/* Publish */}
          {/* <button
            disabled={publishing}
            onClick={async () => {
              setPublishing(true)
              try {
                await publishProject(PROJECT_ID)
                toast.success('Docs published successfully!', {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  style: { fontSize: '0.82rem' },
                })
              } catch {
                toast.error('Failed to publish docs. Please try again.', {
                  position: 'top-right',
                  autoClose: 4000,
                  style: { fontSize: '0.82rem' },
                })
              } finally {
                setPublishing(false)
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: '#f26522', color: '#fff' }}
          >
            {publishing ? (
              <>
                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
          </button> */}
        </div>
      </div>


      {/* Review banner + diff panel */}
      {/* {pendingChange && (
        <ReviewPanel
          change={pendingChange}
          currentContent={(page.content ?? []) as unknown[]}
          onAccept={() => acceptChange(pendingChange.id)}
          onReject={() => rejectChange(pendingChange.id)}
        />
      )} */}

      {/* Plate editor */}
      <div className="flex-1 overflow-hidden">
        <PlateEditor
          key={editorKey}
          initialValue={(page.content ?? []) as Record<string, unknown>[]}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

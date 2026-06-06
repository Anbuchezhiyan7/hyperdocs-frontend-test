'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import { useDocs, NavItem, firstPage } from '@/lib/docs-context'
import { BranchUpdatesModal } from './branch-updates-modal'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Tooltip } from 'antd'
import { IconChevronRight, IconFolder, IconPage } from '@/components/shared/icons'
import { useAppStore } from '@/lib/store/useAppStore'




function CreateInput({ placeholder, onConfirm, onCancel, depth }: {
  placeholder: string; onConfirm: (t: string) => void; onCancel: () => void; depth: number
}) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { ref.current?.focus() }, [])

  return (
    <div style={{ paddingLeft: `${0.75 + depth * 1}rem`, paddingTop: 4, paddingBottom: 4 }}>
      <input
        ref={ref}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && value.trim()) onConfirm(value.trim())
          if (e.key === 'Escape') onCancel()
        }}
        onBlur={() => { if (value.trim()) onConfirm(value.trim()); else onCancel() }}
        placeholder={placeholder}
        style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #f26522', outline: 'none', color: 'var(--hd-text)', fontSize: '0.82rem', caretColor: '#f26522', width: '100%' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Drag state (shared ref passed down)                                 */
/* ------------------------------------------------------------------ */

interface DragState {
  draggedId: string | null
  draggedTitle: string
}

/* ------------------------------------------------------------------ */
/*  Drop indicator position                                             */
/* ------------------------------------------------------------------ */

type DropPos = 'before' | 'after' | 'inside' | null

/* ------------------------------------------------------------------ */
/*  Local tree helpers for delete navigation                           */
/* ------------------------------------------------------------------ */

/** Returns a new tree with the item (and all descendants) removed. */
function removeFromTree(items: NavItem[], id: string): NavItem[] {
  return items
    .filter((i) => i.id !== id)
    .map((i) => ({ ...i, children: i.children ? removeFromTree(i.children, id) : undefined }))
}

/** Finds the slug-path segments to a node by id within a tree. */
function getSegsInTree(items: NavItem[], targetId: string, prefix: string[] = []): string[] | null {
  for (const item of items) {
    const cur = [...prefix, item.slug]
    if (item.id === targetId) return cur
    if (item.children) {
      const found = getSegsInTree(item.children, targetId, cur)
      if (found) return found
    }
  }
  return null
}

/* ------------------------------------------------------------------ */
/*  Single tree item                                                    */
/* ------------------------------------------------------------------ */

function TreeItem({
  item, depth, activePath, onNavigate, dragState, onDropped,
}: {
  item: NavItem
  depth: number
  activePath: string
  onNavigate: (path: string) => void
  dragState: React.MutableRefObject<DragState>
  onDropped: (draggedId: string, toTitle: string, pos: 'before' | 'after' | 'inside') => void
}) {
  const router = useRouter()
  const { createPage, createFolder, deleteItem, renameItem, getPathSegments, moveItem, items } = useDocs()
  const [open, setOpen] = useState(depth === 0)
  const [hovered, setHovered] = useState(false)
  const [creating, setCreating] = useState<null | 'page' | 'folder'>(null)
  const [renaming, setRenaming] = useState(false)
  const [dropPos, setDropPos] = useState<DropPos>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const rowRef = useRef<HTMLDivElement>(null)

  const pathSegments = getPathSegments(item.id)
  const itemPath = '/admin/editor/' + pathSegments.join('/')
  const isActive = item.type === 'page' && activePath === itemPath

  // Navigate away if the active page is the deleted item or inside the deleted folder
  async function handleDelete() {
    setConfirmDeleteOpen(false)

    // Does the current URL fall inside the item being deleted?
    const activeIsUnder = activePath === itemPath || activePath.startsWith(itemPath + '/')

    const toastId = toast.loading('Deleting...')
    try {
      await deleteItem(item.id)
      toast.update(toastId, { render: 'Deleted successfully', type: 'success', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
    } catch {
      toast.update(toastId, { render: 'Failed to delete', type: 'error', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
      return
    }

    if (activeIsUnder) {
      // Compute remaining tree after deletion to find the next page
      const remaining = removeFromTree(items, item.id)
      const next = firstPage(remaining)
      if (next) {
        const segs = getPathSegments(next.id)
        // getPathSegments still works because items state updates async;
        // fall back to a fresh search if segs is empty
        if (segs.length) {
          router.replace('/admin/editor/' + segs.join('/'))
        } else {
          // find path manually in remaining tree
          const fallbackSegs = getSegsInTree(remaining, next.id)
          if (fallbackSegs) router.replace('/admin/editor/' + fallbackSegs.join('/'))
          else router.replace('/admin/editor')
        }
      } else {
        router.replace('/admin/editor')
      }
    }
  }

  async function handleCreate(type: 'page' | 'folder', title: string) {
    const toastId = toast.loading(`Creating ${type}...`)
    try {
      if (type === 'page') {
        const { item: newItem, req } = createPage(item.type === 'folder' ? item.id : null, title)
        const segs = getPathSegments(newItem.id)
        if (segs.length) onNavigate('/admin/editor/' + segs.join('/'))
        await req
      } else {
        const { req } = createFolder(item.type === 'folder' ? item.id : null, title)
        await req
      }
      toast.update(toastId, { render: 'Created successfully', type: 'success', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
    } catch {
      toast.update(toastId, { render: 'Failed to create', type: 'error', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
    }
    setCreating(null)
    setOpen(true)
  }

  /* ── Drag events ── */

  function handleDragStart(e: React.DragEvent) {
    dragState.current = { draggedId: item.id, draggedTitle: item.title }
    e.dataTransfer.effectAllowed = 'move'
    // small visual delay so the ghost image captures the pre-drag style
    setTimeout(() => {
      if (rowRef.current) rowRef.current.style.opacity = '0.4'
    }, 0)
  }

  function handleDragEnd() {
    dragState.current = { draggedId: null, draggedTitle: '' }
    if (rowRef.current) rowRef.current.style.opacity = '1'
    setDropPos(null)
  }

  function getDropPosition(e: React.DragEvent): DropPos {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const relY = e.clientY - rect.top
    const pct = relY / rect.height
    if (item.type === 'folder' && pct > 0.25 && pct < 0.75) return 'inside'
    return pct < 0.5 ? 'before' : 'after'
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (dragState.current.draggedId === item.id) return
    e.dataTransfer.dropEffect = 'move'
    setDropPos(getDropPosition(e))
  }

  function handleDragLeave() {
    setDropPos(null)
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const { draggedId, draggedTitle } = dragState.current
    if (!draggedId || draggedId === item.id) { setDropPos(null); return }

    const pos = getDropPosition(e)
    if (!pos) { setDropPos(null); return }

    const toastId = toast.loading('Moving...')
    try {
      await moveItem(draggedId, item.id, pos)
      setDropPos(null)
      toast.update(toastId, { render: `"${draggedTitle}" moved successfully`, type: 'success', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
      onDropped(draggedId, item.title, pos)
    } catch {
      toast.update(toastId, { render: 'Failed to move', type: 'error', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
      setDropPos(null)
    }
  }

  /* ── Drop indicator styles ── */
  const dropBorderTop = dropPos === 'before' ? '2px solid #f26522' : undefined
  const dropBorderBottom = dropPos === 'after' ? '2px solid #f26522' : undefined
  const dropBg = dropPos === 'inside' ? 'rgba(242,101,34,0.1)' : undefined

  return (
    <div>
      <div
        ref={rowRef}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          paddingLeft: `${0.5 + depth * 1}rem`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderTop: dropBorderTop,
          borderBottom: dropBorderBottom,
          background: dropBg,
          borderRadius: dropPos === 'inside' ? 4 : undefined,
          cursor: 'grab',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {depth > 0 && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, width: 1, left: `${0.5 + (depth - 1) * 1 + 0.5}rem`, background: 'var(--hd-admin-border)' }} />
        )}

        <button
          onClick={() => item.type === 'folder' ? setOpen(o => !o) : onNavigate(itemPath)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, flex: 1,
            padding: '5px 6px 5px 0',
            borderRadius: 4, border: 'none', cursor: 'pointer', fontSize: '0.82rem',
            color: isActive ? '#f26522' : hovered ? 'var(--hd-text)' : 'var(--hd-admin-text)',
            background: isActive ? 'rgba(242,101,34,0.12)' : 'transparent',
            textAlign: 'left',
          }}
        >
          <span style={{ width: 22, flexShrink: 0, color: isActive ? '#f26522' : hovered ? 'var(--hd-admin-text)' : 'var(--hd-admin-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {item.type === 'folder' ? <IconChevronRight open={open} /> : null}
          </span>
          <span style={{ flexShrink: 0, color: isActive ? '#f26522' : hovered ? 'var(--hd-admin-text)' : 'var(--hd-admin-muted)' }}>
            {item.type === 'folder' ? <IconFolder /> : <IconPage />}
          </span>
          {renaming ? (
            <input
              autoFocus
              defaultValue={item.title}
              onClick={e => e.stopPropagation()}
              onBlur={async (e) => {
                const val = e.target.value || item.title
                if (val !== item.title) {
                  const toastId = toast.loading('Renaming...')
                  try {
                    await renameItem(item.id, val)
                    toast.update(toastId, { render: 'Renamed successfully', type: 'success', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
                  } catch {
                    toast.update(toastId, { render: 'Failed to rename', type: 'error', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
                  }
                }
                setRenaming(false)
              }}
              onKeyDown={async (e) => {
                e.stopPropagation()
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value || item.title
                  if (val !== item.title) {
                    const toastId = toast.loading('Renaming...')
                    try {
                      await renameItem(item.id, val)
                      toast.update(toastId, { render: 'Renamed successfully', type: 'success', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
                    } catch {
                      toast.update(toastId, { render: 'Failed to rename', type: 'error', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
                    }
                  }
                  setRenaming(false)
                }
                if (e.key === 'Escape') setRenaming(false)
              }}
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #f26522', outline: 'none', color: 'var(--hd-text)', fontSize: '0.82rem', flex: 1 }}
            />
          ) : (
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
          )}
        </button>

        {hovered && !renaming && (
          <div style={{ display: 'flex', gap: 2, paddingRight: 4, flexShrink: 0 }}>
            {item.type === 'folder' && (
              <>
                <HoverBtn title="New page" onClick={e => { e.stopPropagation(); setCreating('page'); setOpen(true) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </HoverBtn>
                <HoverBtn title="New folder" onClick={e => { e.stopPropagation(); setCreating('folder'); setOpen(true) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </HoverBtn>
              </>
            )}
            <HoverBtn title="Rename" onClick={e => { e.stopPropagation(); setRenaming(true) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </HoverBtn>
            <HoverBtn title="Delete" danger onClick={e => { e.stopPropagation(); setConfirmDeleteOpen(true) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </HoverBtn>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title={`Delete "${item.title}"?`}
        description={
          item.type === 'folder'
            ? 'This will permanently delete this folder and all pages inside it. This action cannot be undone.'
            : 'This will permanently delete this page. This action cannot be undone.'
        }
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
      />

      {item.type === 'folder' && open && (
        <div>
          {creating && (
            <CreateInput
              placeholder={creating === 'page' ? 'New page title...' : 'New folder title...'}
              onConfirm={title => handleCreate(creating, title)}
              onCancel={() => setCreating(null)}
              depth={depth + 1}
            />
          )}
          {item.children?.map(child => (
            <TreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              activePath={activePath}
              onNavigate={onNavigate}
              dragState={dragState}
              onDropped={onDropped}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function HoverBtn({ title, onClick, danger, children }: {
  title: string; onClick: (e: React.MouseEvent) => void; danger?: boolean; children: React.ReactNode
}) {
  const [h, setH] = useState(false)
  return (
    <Tooltip title={title} placement="top" mouseEnterDelay={0.4} arrow={false}>
      <button
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 3, border: 'none', cursor: 'pointer',
          background: h ? (danger ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)') : 'transparent',
          color: h ? (danger ? '#f87171' : 'var(--hd-text)') : 'var(--hd-admin-muted)',
        }}
      >
        {children}
      </button>
    </Tooltip>
  )
}

/* ------------------------------------------------------------------ */
/*  Editor sidebar (file tree panel)                                   */
/* ------------------------------------------------------------------ */

export function EditorSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { items, createPage, createFolder, getPathSegments, pendingChanges, rejectChange, dismissAllChanges } = useDocs()
  const [creating, setCreating] = useState<null | 'page' | 'folder'>(null)
  const [showModal, setShowModal] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(300)
  const { settings } = useAppStore()
  const documentMode = settings?.general?.document_mode


  function handleResizeMouseDown(e: React.MouseEvent) {
    isResizing.current = true
    startX.current = e.clientX
    startWidth.current = sidebarWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    function onMouseMove(ev: MouseEvent) {
      if (!isResizing.current) return
      const delta = ev.clientX - startX.current
      const newWidth = Math.min(500, Math.max(200, startWidth.current + delta))
      setSidebarWidth(newWidth)
    }
    function onMouseUp() {
      isResizing.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  // Shared drag state — a ref so it doesn't cause re-renders
  const dragState = useRef<DragState>({ draggedId: null, draggedTitle: '' })

  // After a move, items update and we re-navigate to the item's new path
  const pendingNav = useRef<{ id: string; title: string; toTitle: string; pos: 'before' | 'after' | 'inside' } | null>(null)

  useEffect(() => {
    if (!pendingNav.current) return
    const { id, title, toTitle, pos } = pendingNav.current
    pendingNav.current = null

    // Compute new path from updated tree
    const segs = getPathSegments(id)
    if (segs.length) router.replace('/admin/editor/' + segs.join('/'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]) // runs after moveItem triggers re-render with new tree

  function handleDropped(draggedId: string, toTitle: string, pos: 'before' | 'after' | 'inside') {
    const dragged = dragState.current
    pendingNav.current = { id: draggedId, title: dragged.draggedTitle, toTitle, pos }
  }

  function navigate(path: string) { router.push(path) }

  async function handleRootCreate(type: 'page' | 'folder', title: string) {
    const toastId = toast.loading(`Creating ${type}...`)
    try {
      if (type === 'page') {
        const { item, req } = createPage(null, title)
        navigate('/admin/editor/' + item.slug)
        await req
      } else {
        const { req } = createFolder(null, title)
        await req
      }
      toast.update(toastId, { render: 'Created successfully', type: 'success', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
    } catch {
      toast.update(toastId, { render: 'Failed to create', type: 'error', isLoading: false, autoClose: 2500, style: { fontSize: '0.82rem' } })
    }
    setCreating(null)
  }

  return (
    <div style={{ width: sidebarWidth, flexShrink: 0, height: '100%', background: 'var(--hd-admin-sidebar)', borderRight: '1px solid var(--hd-admin-border)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px 6px', flexShrink: 0 }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hd-admin-muted)' }}>
          Files
        </span>
        <div style={{ display: 'flex', gap: 2 }}>
          <HoverBtn title="New page" onClick={() => setCreating('page')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </HoverBtn>
          <HoverBtn title="New folder" onClick={() => setCreating('folder')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </HoverBtn>
        </div>
      </div>

      {/* Tree */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '2px 4px' }}>
        {creating && (
          <CreateInput
            placeholder={creating === 'page' ? 'New page title...' : 'New folder title...'}
            onConfirm={title => handleRootCreate(creating, title)}
            onCancel={() => setCreating(null)}
            depth={0}
          />
        )}
        {items.map(item => (
          <TreeItem
            key={item.id}
            item={item}
            depth={0}
            activePath={pathname}
            onNavigate={navigate}
            dragState={dragState}
            onDropped={handleDropped}
          />
        ))}
      </nav>

      {/* Branch Updates button */}
      {/* {pendingChanges.length > 0 && (
        <div style={{ borderTop: '1px solid var(--hd-admin-border)', padding: '10px 8px', flexShrink: 0 }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 7,
              border: '1px solid rgba(242,101,34,0.25)',
              background: 'rgba(242,101,34,0.07)',
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f26522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--hd-admin-text)', flex: 1 }}>
              Branch Updates
            </span>
            <span style={{
              background: '#f26522', color: '#fff', borderRadius: 10,
              fontSize: '0.68rem', fontWeight: 700,
              padding: '1px 7px', minWidth: 18, textAlign: 'center',
            }}>
              {pendingChanges.length}
            </span>
          </button>
        </div>
      )} */}

      {/* Modal */}
      {showModal && (
        <BranchUpdatesModal
          changes={pendingChanges}
          onReject={(id) => rejectChange(id)}
          onDismissAll={() => { dismissAllChanges(); setShowModal(false) }}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Resize handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        style={{
          position: 'absolute', top: 0, right: 0, width: 4, height: '100%',
          cursor: 'col-resize', zIndex: 10,
          background: 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(242,101,34,0.4)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      />
    </div>
  )
}

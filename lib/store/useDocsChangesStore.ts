'use client'

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type ChangeType = 'created' | 'modified' | 'deleted' | 'renamed' | 'moved'

export type FileChange = {
  id: string
  title: string
  itemType: 'page' | 'folder'
  changeType: ChangeType
  timestamp: number
}

type DocsChangesState = {
  changes: FileChange[]
  addChange: (change: Omit<FileChange, 'timestamp'>) => void
  clearChanges: () => void
}

/* ------------------------------------------------------------------ */
/*  Deduplication logic                                                 */
/* ------------------------------------------------------------------ */

/**
 * Merges a new change into the existing list.
 * Rules:
 *  - created → modified    = stay 'created'  (net: still new file)
 *  - created → deleted     = remove entirely (net: no change, file never existed)
 *  - created → renamed     = stay 'created', update title
 *  - modified → deleted    = 'deleted'
 *  - modified → renamed    = 'renamed', update title
 *  - deleted → created     = 'created'       (re-created after delete)
 *  - anything else: update to latest changeType + title
 */
function mergeChange(existing: FileChange[], next: Omit<FileChange, 'timestamp'>): FileChange[] {
  const idx = existing.findIndex((c) => c.id === next.id)

  if (idx === -1) {
    // No prior entry → just add it
    return [...existing, { ...next, timestamp: Date.now() }]
  }

  const prev = existing[idx]

  // created → deleted: cancel out, remove from list
  if (prev.changeType === 'created' && next.changeType === 'deleted') {
    return existing.filter((_, i) => i !== idx)
  }

  // created → modified / renamed / moved: keep 'created', update title
  if (prev.changeType === 'created' && (next.changeType === 'modified' || next.changeType === 'renamed' || next.changeType === 'moved')) {
    const updated = { ...prev, title: next.title, timestamp: Date.now() }
    return existing.map((c, i) => (i === idx ? updated : c))
  }

  // default: update to latest changeType + title
  const updated: FileChange = { ...prev, title: next.title, changeType: next.changeType, timestamp: Date.now() }
  return existing.map((c, i) => (i === idx ? updated : c))
}

/* ------------------------------------------------------------------ */
/*  Store                                                               */
/* ------------------------------------------------------------------ */

export const useDocsChangesStore = create<DocsChangesState>()(
  devtools(
    persist(
      (set) => ({
        changes: [],

        addChange: (change) =>
          set((state) => ({ changes: mergeChange(state.changes, change) })),

        clearChanges: () => set({ changes: [] }),
      }),
      {
        name: 'hyperdocs-docs-changes', // localStorage key
      }
    ),
    { name: 'DocsChangesStore' }
  )
)

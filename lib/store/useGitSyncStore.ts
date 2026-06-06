'use client'

import { create } from 'zustand'

type GitSyncState = {
  pendingCommits: number
  hasChangesDetected: boolean
  setPendingCommits: (count: number) => void
  setHasChangesDetected: (val: boolean) => void
  clearNotification: () => void
}

export const useGitSyncStore = create<GitSyncState>((set) => ({
  pendingCommits: 0,
  hasChangesDetected: false,
  setPendingCommits: (count) => set({ pendingCommits: count }),
  setHasChangesDetected: (val) => set({ hasChangesDetected: val }),
  clearNotification: () => set({ pendingCommits: 0, hasChangesDetected: false }),
}))

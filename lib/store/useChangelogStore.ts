import { create } from 'zustand'

export type ChangelogTag = {
  id: string
  label: string
  color: string   // hex color
  icon: string    // emoji or single char
}

export type ChangelogEntry = {
  dateKey: string    // "YYYY-MM-DD"
  label: string      // "28 May 2026"
  content: Record<string, unknown>[]
  tags: ChangelogTag[]
}

type ChangelogStore = {
  entries: ChangelogEntry[]
  activeKey: string
  saveSignal: number
  allTags: ChangelogTag[]

  setActiveKey: (key: string) => void
  updateEntryContent: (dateKey: string, content: Record<string, unknown>[]) => void
  updateEntryDate: (dateKey: string, newDateKey: string, newLabel: string) => void
  addEntry: (entry: ChangelogEntry) => void
  updateEntryTags: (dateKey: string, tags: ChangelogTag[]) => void
  triggerSave: () => void
  initEntries: (entries: ChangelogEntry[]) => void
  addGlobalTag: (tag: ChangelogTag) => void
}

export const useChangelogStore = create<ChangelogStore>((set) => ({
  entries: [],
  activeKey: '',
  saveSignal: 0,
  allTags: [
    { id: 'tag-new-releases', label: 'New releases', color: '#f26522', icon: 'Rocket' },
    { id: 'tag-improvements', label: 'Improvements', color: '#8b5cf6', icon: 'Sparkles' },
    { id: 'tag-fixes', label: 'Fixes', color: '#10b981', icon: 'Wrench' },
  ],

  setActiveKey: (key) => set({ activeKey: key }),

  updateEntryContent: (dateKey, content) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.dateKey === dateKey ? { ...e, content } : e
      ),
    })),

  updateEntryDate: (dateKey, newDateKey, newLabel) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.dateKey === dateKey ? { ...e, dateKey: newDateKey, label: newLabel } : e
      ),
      activeKey: state.activeKey === dateKey ? newDateKey : state.activeKey,
    })),

  updateEntryTags: (dateKey, tags) =>
    set((state) => ({
      entries: state.entries.map((e) =>
        e.dateKey === dateKey ? { ...e, tags } : e
      ),
    })),

  addEntry: (entry) =>
    set((state) => {
      if (state.entries.some((e) => e.dateKey === entry.dateKey)) return state
      return {
        entries: [entry, ...state.entries],
        activeKey: entry.dateKey,
      }
    }),

  triggerSave: () => set((state) => ({ saveSignal: state.saveSignal + 1 })),

  initEntries: (entries) =>
    set((state) => ({
      entries,
      activeKey: state.activeKey || entries[0]?.dateKey || '',
    })),

  addGlobalTag: (tag) =>
    set((state) => {
      if (state.allTags.some((t) => t.id === tag.id)) return state
      return { allTags: [...state.allTags, tag] }
    }),
}))

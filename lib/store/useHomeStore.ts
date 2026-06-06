import { create } from 'zustand'

interface HomeStore {
  saveSignal: number
  triggerSave: () => void
}

export const useHomeStore = create<HomeStore>((set) => ({
  saveSignal: 0,
  triggerSave: () => set((s) => ({ saveSignal: s.saveSignal + 1 })),
}))

'use client'

import React, { useEffect, useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { PlateEditor } from '@/components/editor/plate-editor'
import { useChangelogStore, ChangelogEntry, ChangelogTag } from '@/lib/store/useChangelogStore'
import { LucideIconByName } from '@/components/home-editor/icon-picker'

// Modular components and utils
import { CalendarPicker } from '@/components/changelog/calendar-picker'
import { CreateTagModal } from '@/components/changelog/create-tag-modal'
import { toKey, toLabel, fromKey, defaultContent, defaultEntries } from '@/lib/utils/changelog-date'

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */
export default function ChangelogPage() {
  const router = useRouter()
  const { entries, allTags, saveSignal, updateEntryContent, updateEntryDate, addEntry, updateEntryTags, initEntries, addGlobalTag } = useChangelogStore()
  
  // Menu/Modal States
  const [menuOpen, setMenuOpen] = useState(false)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [tagPickerTargetKey, setTagPickerTargetKey] = useState<string | null>(null)
  const [tagPickerAnchor, setTagPickerAnchor] = useState<{ top: number; left: number } | null>(null)
  const [picker, setPicker] = useState<{anchorTop:number; anchorLeft:number; targetKey:string}|null>(null)


  // Initialize from LocalStorage or Default Entries
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hyperdocs_changelog_entries_v2')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.length > 0) {
            initEntries(parsed)
            return
          }
        } catch (e) {
          // Fallback to defaults
        }
      }
    }
    initEntries(defaultEntries(allTags))
  }, [])

  // Handle Global Save Signal from Header
  useEffect(() => {
    if (saveSignal === 0) return
    if (typeof window !== 'undefined') {
      const groupedByYear = entries.reduce((acc, entry) => {
        const year = entry.dateKey.split('-')[0]
        if (!acc[year]) acc[year] = []
        acc[year].push(entry)
        return acc
      }, {} as Record<string, typeof entries>)

      console.log('Saving raw changelog entries:', entries)
      console.log('Saving changelog entries (grouped by year):', groupedByYear)

      localStorage.setItem('hyperdocs_changelog_entries_v2', JSON.stringify(entries))
      toast.success('Changelog updated successfully!', { autoClose: 2500, style: { fontSize: '0.82rem' } })
      router.push('/changelog')
    }
  }, [saveSignal, entries, router])

  // Insert a new Changelog Entry
  const handleInsertUpdate = () => {
    const now = new Date()
    // Find a unique key
    let finalDate = now
    let finalKey = toKey(finalDate)
    let counter = 0
    while (entries.some(e => e.dateKey === finalKey)) {
      counter++
      finalDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - counter)
      finalKey = toKey(finalDate)
    }

    const label = toLabel(finalDate)
    const newEntry: ChangelogEntry = {
      dateKey: finalKey,
      label,
      tags: [],
      content: defaultContent("Product update", "See what's new and improved in our latest update.", ["Describe your update here..."])
    }
    
    addEntry(newEntry)
    toast.success(`Changelog entry added for ${label}`)
  }

  // Handle Calendar Date Picker Change
  const handleConfirmDate = (date: Date) => {
    if (!picker) return
    const dateKey = toKey(date)
    const label = toLabel(date)

    if (dateKey !== picker.targetKey && entries.some(e => e.dateKey === dateKey)) {
      toast.warn(`${label} already has a changelog entry.`, { autoClose: 2000 })
      setPicker(null)
      return
    }

    updateEntryDate(picker.targetKey, dateKey, label)
    setPicker(null)
  }

  // Create Tag Handler
  const handleCreateTag = (label: string, icon: string, color: string) => {
    const tagId = 'tag-' + label.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const newTag: ChangelogTag = {
      id: tagId,
      label,
      color,
      icon,
    }

    addGlobalTag(newTag)
    toast.success(`Tag "${label}" created!`)
  }

  // Toggle tag on a specific entry
  const toggleEntryTag = (entryKey: string, tag: ChangelogTag) => {
    const entry = entries.find(e => e.dateKey === entryKey)
    if (!entry) return

    const exists = entry.tags.some(t => t.id === tag.id)
    const updatedTags = exists 
      ? entry.tags.filter(t => t.id !== tag.id)
      : [...entry.tags, tag]

    updateEntryTags(entryKey, updatedTags)
  }

  const pickerInitDate = picker?.targetKey ? fromKey(picker.targetKey) : new Date()

  // Handle outside clicks to close tag picker dropdown
  useEffect(() => {
    const handleOutside = () => {
      setTagPickerTargetKey(null)
      setTagPickerAnchor(null)
    }
    if (tagPickerTargetKey) {
      window.addEventListener('click', handleOutside)
      return () => window.removeEventListener('click', handleOutside)
    }
  }, [tagPickerTargetKey])

  return (
    <div className="flex-1 flex flex-col h-full bg-hd-bg relative overflow-hidden" style={{ fontFamily: "var(--font-admin, sans-serif)" }}>
      
      {/* ── Sub Header Bar ── */}
      <div className="flex justify-between items-center px-8 py-3 border-b border-hd-admin-border bg-hd-admin-nav shrink-0 z-20">
        <div>
          <h1 className="text-base font-bold text-hd-text">Changelog Editor</h1>
          <p className="text-[0.7rem] text-hd-admin-muted">Manage product updates and releases in a chronological layout.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleInsertUpdate}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-hd-accent hover:bg-hd-accent-hover transition-colors flex items-center gap-1.5 border-none cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Insert Update
          </button>
          
          {/* Three dots menu */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
              className="p-1.5 rounded-lg hover:bg-hd-surface text-hd-admin-text hover:text-hd-text transition-colors border-none cursor-pointer bg-transparent flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-44 bg-hd-admin-nav border border-hd-admin-border rounded-lg shadow-lg z-50 py-1">
                  <button 
                    onClick={() => { setMenuOpen(false); setIsTagModalOpen(true); }}
                    className="w-full text-left px-3.5 py-2 text-xs text-hd-text hover:bg-hd-surface transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                  >
                    <span>🏷️</span> Create new tag
                  </button>
                  <button 
                    onClick={() => { setMenuOpen(false); handleInsertUpdate(); }}
                    className="w-full text-left px-3.5 py-2 text-xs text-hd-text hover:bg-hd-surface transition-colors flex items-center gap-2 border-none bg-transparent cursor-pointer"
                  >
                    <span>➕</span> Insert update
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Scrollable Workspace ── */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 pb-32">
          {entries.length === 0 ? (
            <div className="text-center py-20 text-hd-muted text-sm border border-dashed border-hd-admin-border rounded-xl">
              No entries found. Click "Insert Update" to add your first release block.
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.dateKey} className="flex flex-col md:flex-row gap-8 pb-10 border-b border-hd-admin-border/60 last:border-none last:pb-0">
                
                {/* Left side: Date + Tags + Plus */}
                <div className="w-full md:w-48 shrink-0 flex flex-col items-start pt-2">
                  {/* Date click triggers picker */}
                  <button
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setPicker({
                        anchorTop: rect.bottom + window.scrollY,
                        anchorLeft: rect.left + window.scrollX,
                        targetKey: entry.dateKey
                      })
                    }}
                    className="text-sm font-semibold text-hd-admin-muted hover:text-hd-accent transition-colors bg-transparent border-none cursor-pointer p-0 mb-3 flex items-center gap-1.5"
                    title="Click to edit date"
                  >
                    {entry.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </button>

                  {/* Render Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5 max-w-full">
                    {entry.tags.map((tag) => (
                      <span 
                        key={tag.id} 
                        style={{ background: `${tag.color}15`, color: tag.color, borderColor: `${tag.color}25` }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-medium border border-solid select-none"
                      >
                        <LucideIconByName name={tag.icon} size={11} color={tag.color} />
                        <span>{tag.label}</span>
                        {/* Remove tag button */}
                        <button 
                          onClick={() => toggleEntryTag(entry.dateKey, tag)}
                          className="bg-transparent border-none p-0 cursor-pointer text-current opacity-60 hover:opacity-100 flex items-center justify-center ml-0.5"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Plus Symbol */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTagPickerAnchor({
                          top: rect.bottom + window.scrollY,
                          left: rect.left + window.scrollX
                        })
                        setTagPickerTargetKey(entry.dateKey)
                      }}
                      className="w-6 h-6 rounded-full border border-solid border-hd-admin-border bg-transparent text-hd-admin-text hover:text-hd-accent hover:border-hd-accent flex items-center justify-center cursor-pointer transition-all"
                      title="Add tag"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>

                    {/* Tag Dropdown Picker */}
                    {tagPickerTargetKey === entry.dateKey && tagPickerAnchor && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: 'fixed',
                          top: Math.min(tagPickerAnchor.top, (typeof window !== 'undefined' ? window.innerHeight : 800) - 260),
                          left: Math.min(tagPickerAnchor.left, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 240),
                        }}
                        className="w-48 bg-hd-admin-nav border border-hd-admin-border rounded-lg shadow-lg z-50 py-1"
                      >
                        <div className="px-3 py-1.5 text-[0.65rem] font-bold text-hd-admin-muted uppercase tracking-wider border-b border-hd-admin-border">
                          Select Tag
                        </div>
                        <div className="max-h-40 overflow-y-auto py-1">
                          {allTags.map(tag => {
                            const isSelected = entry.tags.some(t => t.id === tag.id)
                            return (
                              <button
                                key={tag.id}
                                onClick={() => toggleEntryTag(entry.dateKey, tag)}
                                className="w-full text-left px-3 py-1.5 text-xs text-hd-text hover:bg-hd-surface transition-colors flex items-center justify-between border-none bg-transparent cursor-pointer"
                              >
                                <span className="flex items-center gap-1.5">
                                  <LucideIconByName name={tag.icon} size={12} color={tag.color} />
                                  <span style={{ color: tag.color }}>{tag.label}</span>
                                </span>
                                {isSelected && (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--hd-accent)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                )}
                              </button>
                            )
                          })}
                        </div>
                        <div className="border-t border-hd-admin-border px-2.5 py-1.5">
                          <button
                            onClick={() => { setTagPickerTargetKey(null); setIsTagModalOpen(true); }}
                            className="w-full py-1 text-center text-[0.7rem] font-semibold text-hd-accent hover:text-hd-accent-hover bg-transparent border-none cursor-pointer"
                          >
                            + Create Tag
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: PlateEditor */}
                <div className="flex-1 min-w-0 border border-solid border-hd-admin-border rounded-xl overflow-hidden bg-hd-bg relative group">
                  <PlateEditor 
                    key={entry.dateKey} 
                    initialValue={entry.content} 
                    onChange={(newVal) => updateEntryContent(entry.dateKey, newVal)}
                  />

                  {/* Clean entry delete option */}
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this update block?")) {
                        useChangelogStore.setState((state) => ({
                          entries: state.entries.filter(e => e.dateKey !== entry.dateKey)
                        }))
                        toast.success("Entry removed")
                      }
                    }}
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-lg bg-transparent hover:bg-red-500/10 text-hd-admin-muted hover:text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer"
                    title="Delete update block"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Date Picker Floating Modal ── */}
      {picker && (
        <CalendarPicker
          initialDate={pickerInitDate}
          anchorTop={picker.anchorTop}
          anchorLeft={picker.anchorLeft}
          onConfirm={handleConfirmDate}
          onCancel={() => setPicker(null)}
          confirmLabel="Update"
        />
      )}

      {/* ── Create Tag Modal ── */}
      <CreateTagModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        onCreateTag={handleCreateTag}
      />

    </div>
  )
}

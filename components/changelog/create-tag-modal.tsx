import React, { useState } from 'react'
import { IconPicker, LucideIconByName } from '@/components/home-editor/icon-picker'

interface CreateTagModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTag: (label: string, icon: string, color: string) => void
}

const PRESET_COLORS = [
  '#f26522', // Orange
  '#ef4444', // Red
  '#ec4899', // Pink
  '#a855f7', // Purple
  '#3b82f6', // Blue
  '#0ea5e9', // Sky Blue
  '#14b8a6', // Teal
  '#10b981', // Green
  '#eab308', // Yellow
  '#6b7280', // Grey
]

export function CreateTagModal({ isOpen, onClose, onCreateTag }: CreateTagModalProps) {
  const [newTagLabel, setNewTagLabel] = useState('')
  const [newTagIcon, setNewTagIcon] = useState('Tag')
  const [newTagColor, setNewTagColor] = useState('#f26522')
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTagLabel.trim()) return
    onCreateTag(newTagLabel.trim(), newTagIcon, newTagColor)
    setNewTagLabel('')
    setNewTagIcon('Tag')
    setNewTagColor('#f26522')
    setIsIconPickerOpen(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="w-[440px] bg-hd-surface border border-hd-border rounded-xl shadow-2xl overflow-hidden p-6 relative">
        {/* Close */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none p-1 text-hd-admin-muted hover:text-hd-text cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <h2 className="text-xl font-bold text-hd-text mb-1">Create tag</h2>
        <p className="text-xs text-hd-muted mb-6">Tags can help group and organize content by topics.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex gap-4 items-end">
            {/* Icon selection button */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <label className="text-xs font-semibold text-hd-text-soft">Icon</label>
              <button
                type="button"
                onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
                className="w-12 h-10 rounded-lg border border-solid border-hd-border bg-hd-bg flex items-center justify-center cursor-pointer hover:border-hd-accent"
              >
                <LucideIconByName name={newTagIcon} size={18} color={newTagColor} />
              </button>
            </div>

            {/* Label input */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-semibold text-hd-text-soft">Label</label>
              <input
                type="text"
                value={newTagLabel}
                onChange={(e) => setNewTagLabel(e.target.value)}
                placeholder="sample tag"
                autoFocus
                className="h-10 px-3 rounded-lg border border-solid border-hd-border bg-hd-bg text-hd-text text-sm outline-none focus:border-hd-accent box-border w-full"
                required
              />
            </div>
          </div>

          {/* Icon Picker list */}
          {isIconPickerOpen && (
            <div className="border border-solid border-hd-border rounded-lg bg-hd-bg overflow-hidden max-h-56 overflow-y-auto">
              <IconPicker
                selectedIcon={newTagIcon}
                onSelect={(name) => { setNewTagIcon(name); setIsIconPickerOpen(false); }}
                onRemove={() => { setNewTagIcon('Tag'); setIsIconPickerOpen(false); }}
              />
            </div>
          )}

          {/* Color list */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-hd-text-soft">Color</label>
            <div className="flex flex-wrap gap-2.5">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewTagColor(c)}
                  style={{ background: c }}
                  className={`w-6 h-6 rounded-full border-none cursor-pointer transition-transform relative ${newTagColor === c ? 'scale-115 ring-2 ring-hd-accent/50 ring-offset-2' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Live Preview pill */}
          <div className="border-t border-b border-solid border-hd-border/60 py-4 mt-2 flex items-center justify-center">
            <span 
              style={{ background: `${newTagColor}15`, color: newTagColor, borderColor: `${newTagColor}25` }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-solid"
            >
              <LucideIconByName name={newTagIcon} size={12} color={newTagColor} />
              <span>{newTagLabel || 'sample tag'}</span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-solid border-hd-border bg-transparent text-hd-text text-xs font-medium cursor-pointer hover:bg-hd-surface transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg border-none bg-hd-accent hover:bg-hd-accent-hover text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

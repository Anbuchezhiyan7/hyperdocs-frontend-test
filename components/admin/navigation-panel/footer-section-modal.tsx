import React, { useState, useRef } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Modal } from '@/components/shared/modal'
import { InputField } from './shared-ui'
import { FooterSection } from '@/lib/nav-config-context'

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export const footerLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Link label is required'),
  url: z.string()
    .min(1, 'URL is required')
    .regex(/^https?:\/\/.+/, 'Enter a valid URL (https://...)'),
})

export const footerSectionSchema = z.object({
  name: z.string().min(1, 'Section name is required'),
  links: z.array(footerLinkSchema)
    .min(1, 'Please add at least one link before saving'),
})

export interface FooterLinkField {
  id: string
  label: string
  url: string
}

export interface FooterSectionFormData {
  name: string
  links: FooterLinkField[]
}

export interface FooterSectionModalProps {
  initial?: FooterSection
  onSave: (data: FooterSectionFormData) => Promise<void>
  onClose: () => void
}

export function FooterSectionModal({
  initial,
  onSave,
  onClose,
}: FooterSectionModalProps) {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<FooterSectionFormData>({
    resolver: zodResolver(footerSectionSchema),
    defaultValues: {
      name: initial?.name ?? '',
      links: initial?.links.map(l => ({ id: l.id, label: l.label, url: l.url })) ?? [],
    },
  })
  const { fields, append, remove, move } = useFieldArray({ control, name: 'links' })

  // Simple DnD state
  const dragIdx = useRef<number | null>(null)

  function onDragStart(i: number) { dragIdx.current = i }
  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    if (dragIdx.current !== null && dragIdx.current !== i) {
      move(dragIdx.current, i)
      dragIdx.current = i
    }
  }

  async function onSubmit(data: FooterSectionFormData) {
    setSaving(true)
    try {
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  const arrayError = errors.links as any

  return (
    <Modal title="Footer Menu Item" onClose={onClose} width={520}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <InputField
          label="Name"
          required
          placeholder="e.g. Quick Links"
          error={errors.name?.message}
          {...register('name')}
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[0.82rem] font-semibold text-hd-text">Add Links</label>
            <button
              type="button"
              onClick={() => append({ id: genId(), label: '', url: 'https://hyperdocs.io' })}
              className="px-3 py-1 rounded-lg border border-hd-border text-[0.78rem] font-semibold text-hd-text bg-transparent hover:bg-hd-surface cursor-pointer transition-colors flex items-center gap-1"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add +
            </button>
          </div>

          {fields.length === 0 && (
            <div className={`py-6 text-center text-[0.8rem] border border-dashed rounded-xl ${
              arrayError ? 'border-red-300 text-red-500 bg-red-500/5' : 'border-hd-border text-hd-muted'
            }`}>
              No links yet — click Add + to get started.
            </div>
          )}

          {arrayError?.message && (
            <p className="text-red-500 text-[0.75rem] mt-1.5 font-medium text-center">
              {arrayError.message}
            </p>
          )}

          <div className="flex flex-col gap-2">
            {fields.map((field, i) => (
              <div
                key={field.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={e => onDragOver(e, i)}
                className="flex items-center gap-2 group"
              >
                {/* Drag handle */}
                <div className="w-5 flex items-center justify-center text-hd-muted cursor-grab opacity-40 group-hover:opacity-80 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                  </svg>
                </div>

                <input
                  placeholder="Link label"
                  {...register(`links.${i}.label`)}
                  className={`flex-[0.8] px-3 py-2 rounded-lg border text-sm outline-none bg-hd-bg text-hd-text placeholder:text-hd-muted transition-colors ${
                    errors.links?.[i]?.label ? 'border-red-400 focus:border-red-500' : 'border-hd-border focus:border-[#f26522]'
                  }`}
                />
                <input
                  placeholder="https://hyperdocs.io"
                  {...register(`links.${i}.url`)}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm outline-none bg-hd-bg text-hd-text placeholder:text-hd-muted transition-colors ${
                    errors.links?.[i]?.url ? 'border-red-400 focus:border-red-500' : 'border-hd-border focus:border-[#f26522]'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="w-7 h-7 shrink-0 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-none bg-transparent cursor-pointer transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-hd-border bg-transparent text-hd-text-soft text-sm font-semibold cursor-pointer hover:bg-hd-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-[#f26522] hover:bg-[#d95318] text-white text-sm font-bold border-none cursor-pointer transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {saving && (
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
              </svg>
            )}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

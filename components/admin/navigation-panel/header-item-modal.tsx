import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Modal } from '@/components/shared/modal'
import { InputField } from './shared-ui'
import { HeaderNavItem } from '@/lib/nav-config-context'

export const headerItemSchema = z.object({
  label: z.string().min(1, 'Menu name is required'),
  url: z.string()
    .min(1, 'URL is required')
    .regex(/^https?:\/\/.+/, 'Enter a valid URL (https://...)'),
})

export interface HeaderItemFormData {
  label: string
  url: string
}

export interface HeaderItemModalProps {
  initial?: HeaderNavItem
  onSave: (data: HeaderItemFormData) => Promise<void>
  onClose: () => void
}

export function HeaderItemModal({
  initial,
  onSave,
  onClose,
}: HeaderItemModalProps) {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<HeaderItemFormData>({
    resolver: zodResolver(headerItemSchema),
    defaultValues: { label: initial?.label ?? '', url: initial?.url ?? 'https://hyperdocs.io' },
  })

  async function onSubmit(data: HeaderItemFormData) {
    setSaving(true)
    try {
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title={initial ? 'Edit Menu Item' : 'Add Menu Item'} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          label="Menu Name"
          required
          placeholder="e.g. Documentation"
          error={errors.label?.message}
          {...register('label')}
        />
        <InputField
          label="URL"
          required
          placeholder="https://hyperdocs.io"
          error={errors.url?.message}
          {...register('url')}
        />
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

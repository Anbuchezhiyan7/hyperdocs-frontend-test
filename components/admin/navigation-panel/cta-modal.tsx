import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Modal } from '@/components/shared/modal'
import { InputField, ColorPickerInput } from './shared-ui'
import { NavConfig } from '@/lib/nav-config-context'

export const ctaSchema = z.object({
  label: z.string().min(1, 'Button label is required'),
  url: z.string()
    .min(1, 'URL is required')
    .regex(/^https?:\/\/.+/, 'Enter a valid URL (https://...)'),
  buttonColor: z.string().min(1, 'Button color is required'),
  bgColor: z.string().min(1, 'Background color is required'),
})

export interface CTAFormData {
  label: string
  url: string
  buttonColor: string
  bgColor: string
}

export interface CTAModalProps {
  initial: NavConfig['headerCTA']
  onSave: (data: CTAFormData) => Promise<void>
  onClose: () => void
}

export function CTAModal({
  initial,
  onSave,
  onClose,
}: CTAModalProps) {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<CTAFormData>({
    resolver: zodResolver(ctaSchema),
    defaultValues: {
      label: initial.label,
      url: initial.url,
      buttonColor: initial.buttonColor,
      bgColor: initial.bgColor,
    },
  })

  const watchedLabel = watch('label')
  const watchedBgColor = watch('bgColor')
  const watchedBtnColor = watch('buttonColor')

  async function onSubmit(data: CTAFormData) {
    setSaving(true)
    try {
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title="Configure Header CTA" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Live Preview */}
        <div className="rounded-xl border border-hd-border bg-hd-surface p-4 flex flex-col items-center gap-2">
          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-hd-muted">Live Preview</span>
          <button
            type="button"
            className="px-5 py-2 rounded-lg text-sm font-bold border-none cursor-default"
            style={{ background: watchedBgColor, color: watchedBtnColor }}
          >
            {watchedLabel || 'Button Label'}
          </button>
        </div>

        <InputField
          label="Button Label"
          required
          placeholder="Get Started"
          error={errors.label?.message}
          {...register('label')}
        />
        <InputField
          label="Redirect URL"
          required
          placeholder="https://hyperdocs.io"
          error={errors.url?.message}
          {...register('url')}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.82rem] font-semibold text-hd-text mb-1.5">Button Color</label>
            <Controller
              name="buttonColor"
              control={control}
              render={({ field }) => <ColorPickerInput value={field.value} onChange={field.onChange} />}
            />
          </div>
          <div>
            <label className="block text-[0.82rem] font-semibold text-hd-text mb-1.5">Background Color</label>
            <Controller
              name="bgColor"
              control={control}
              render={({ field }) => <ColorPickerInput value={field.value} onChange={field.onChange} />}
            />
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
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

import React from 'react'
import { ImageAsset } from '@/lib/api/settings'

export interface ImageUploadSectionProps {
  label: string
  hint: string
  uploadLabel: string
  asset: ImageAsset | null
  uploading: boolean
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export function ImageUploadSection({
  label,
  hint,
  uploadLabel,
  asset,
  uploading,
  onFileChange,
  onRemove,
  inputRef,
}: ImageUploadSectionProps) {
  return (
    <div>
      <label className="block text-[0.82rem] font-bold text-hd-text mb-1">{label}</label>
      <p className="text-[0.82rem] text-hd-muted mb-3">{hint}</p>
      <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />

      {uploading ? (
        <div className="flex items-center justify-center w-full max-w-[320px] h-[100px] rounded-xl border-2 border-dashed border-hd-border bg-hd-surface">
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin text-[#f26522]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
            </svg>
            <span className="text-[0.75rem] text-hd-muted font-medium">Uploading…</span>
          </div>
        </div>
      ) : asset?.url ? (
        <div className="flex items-center gap-5 p-4 rounded-xl border border-hd-border bg-hd-surface w-full max-w-[420px] shadow-sm">
          <div className="w-16 h-16 rounded-lg logo-checkerboard flex items-center justify-center border border-hd-border-soft overflow-hidden p-2 shrink-0">
            <img src={asset.url} alt={label} className="max-h-full max-w-full object-contain rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[0.8rem] font-bold text-hd-text">{label}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-hd-border bg-hd-bg text-[0.78rem] font-semibold text-hd-text cursor-pointer hover:bg-hd-surface transition-all shadow-sm"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="px-3 py-1.5 rounded-lg border border-transparent bg-transparent text-[0.78rem] font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/5 cursor-pointer transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 w-full max-w-[320px] h-[100px] rounded-xl border-2 border-dashed border-hd-border bg-transparent hover:border-[#f26522] hover:bg-hd-surface cursor-pointer transition-all group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-hd-muted group-hover:text-[#f26522] transition-colors">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-[0.78rem] font-semibold text-hd-muted group-hover:text-hd-text transition-colors">{uploadLabel}</span>
        </button>
      )}
    </div>
  )
}

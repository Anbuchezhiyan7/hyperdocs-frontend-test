import React, { useRef } from 'react'

export function ColorPickerInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-hd-border bg-hd-bg cursor-pointer w-full"
      onClick={() => inputRef.current?.click()}
    >
      <div
        className="w-5 h-5 rounded-md border border-black/10 shrink-0"
        style={{ background: value }}
      />
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="sr-only absolute pointer-events-none"
      />
      <span className="text-sm text-hd-text font-mono">{value.toUpperCase()}</span>
    </div>
  )
}

export function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-500 text-[0.73rem] mt-1 font-medium">{msg}</p>
}

export function InputField({
  label,
  required,
  placeholder,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="block text-[0.82rem] font-semibold text-hd-text mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        placeholder={placeholder}
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-hd-bg text-hd-text placeholder:text-hd-muted ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-hd-border focus:border-[#f26522]'
        }`}
      />
      <FieldError msg={error} />
    </div>
  )
}

export function ActionBtn({ onClick, danger, children }: { onClick: () => void; danger?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors cursor-pointer bg-transparent ${
        danger
          ? 'border-hd-border text-red-400 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'border-hd-border text-hd-muted hover:border-hd-text-soft hover:text-hd-text hover:bg-hd-surface'
      }`}
    >
      {children}
    </button>
  )
}

export function DeleteConfirm({ label, onConfirm, onCancel, loading }: {
  label: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}) {
  return (
    <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-hd-bg border border-hd-border rounded-2xl pt-7 px-7 pb-6 max-w-[360px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-hd-text m-0 mb-2">Delete &ldquo;{label}&rdquo;?</h3>
        <p className="text-[0.82rem] text-hd-muted m-0 mb-6 leading-relaxed">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button onClick={onCancel} disabled={loading} className="flex-1 p-[9px] rounded-lg border border-hd-border bg-transparent text-hd-text-soft text-sm cursor-pointer font-medium hover:bg-hd-surface transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 p-[9px] rounded-lg border-none bg-red-500 hover:bg-red-600 text-white text-sm cursor-pointer font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
            {loading && (
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
              </svg>
            )}
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

import React, { useRef } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface AccentColorFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
}

export function AccentColorField<T extends FieldValues>({ control, name }: AccentColorFieldProps<T>) {
  return (
    <div>
      <label className="block text-[0.82rem] font-bold text-hd-text mb-2">
        Brand Colour <span className="text-red-500">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2 items-start">
            <label className="flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white border border-hd-border rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer shadow-sm hover:border-hd-muted transition-colors relative overflow-hidden">
              <input
                type="color"
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div
                className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20 relative z-10 pointer-events-none"
                style={{ background: field.value }}
              />
              <span className="relative z-10 pointer-events-none">{field.value?.toUpperCase()}</span>
            </label>
            <span className="text-[0.75rem] text-hd-muted">
              Primary brand color for buttons, links, and highlights on your documentation site.
            </span>
          </div>
        )}
      />
    </div>
  )
}

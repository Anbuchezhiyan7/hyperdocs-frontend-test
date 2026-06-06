'use client'

import React, { useState, useRef, useEffect } from 'react'
import { PlateElement } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'
import { useComboboxInput } from '@platejs/combobox/react'
import { useEditorRef } from 'platejs/react'
import { InsertMenu } from './insert-menu'

export function SlashInputElement({ children, ...props }: PlateElementProps) {
  const editor = useEditorRef()
  const [filter, setFilter] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const { props: inputProps } = useComboboxInput({
    ref: inputRef,
    cancelInputOnEscape: true,
    cancelInputOnBlur: false,
    onCancelInput: () => {
      // Remove the slash_input node and restore cursor
      editor.tf.removeNodes({ match: (n: Record<string, unknown>) => n.type === 'slash_input' })
    },
  })

  function handleClose() {
    editor.tf.removeNodes({ match: (n: Record<string, unknown>) => n.type === 'slash_input' })
  }

  return (
    <PlateElement {...props} as="span">
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span contentEditable={false} style={{ display: 'inline-block', position: 'relative' }}>
          <input
            ref={inputRef}
            {...inputProps}
            placeholder="Search blocks..."
            onChange={e => { (inputProps as any).onChange?.(e); setFilter(e.target.value) }}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: 'inherit', fontFamily: 'inherit', color: '#666',
              width: Math.max(filter.length * 9 + 80, 120),
              padding: 0,
            }}
          />
          {/* Dropdown */}
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 200 }}>
            <InsertMenu filter={filter} onClose={handleClose} />
          </div>
        </span>
      </span>
      {children}
    </PlateElement>
  )
}

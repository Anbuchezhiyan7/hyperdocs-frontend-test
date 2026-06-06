'use client'

import React, { useState } from 'react'
import { PlateElement, useEditorRef, useSelected } from 'platejs/react'
import type { PlateElementProps } from 'platejs/react'
import type { ButtonElement as ButtonNode } from '@/lib/button-plugin'
import { ButtonModal, ButtonModalValues } from './button-modal'

export function ButtonElement({ children, ...props }: PlateElementProps) {
  const editor = useEditorRef()
  const element = props.element as unknown as ButtonNode
  const selected = useSelected()
  const [editOpen, setEditOpen] = useState(false)

  function handleUpdate(values: ButtonModalValues) {
    editor.tf.setNodes(
      { label: values.label, url: values.url, bgColor: values.bgColor, textColor: values.textColor } as Record<string, unknown>,
      { match: (n) => n === props.element, at: [] }
    )
  }

  function handleDelete() {
    editor.tf.removeNodes({ match: (n) => n === props.element, at: [] })
  }

  const bgColor = element.bgColor || '#f26522'
  const textColor = element.textColor || '#ffffff'
  const label = element.label || 'Button'

  return (
    <PlateElement as="div" {...props} className="my-4">
      <div contentEditable={false} className="flex flex-col items-center gap-[6px]">
        {/* The button */}
        <div
          onClick={() => setEditOpen(true)}
          className={`inline-flex items-center py-2.5 px-7 rounded-lg font-semibold text-[0.9rem] cursor-pointer select-none transition-shadow duration-150 ${
            selected
              ? 'shadow-[0_0_0_2px_var(--btn-shadow),0_2px_8px_rgba(0,0,0,0.12)] outline outline-2 outline-offset-2'
              : 'shadow-[0_2px_8px_rgba(0,0,0,0.12)] outline-none'
          }`}
          style={{
            background: bgColor,
            color: textColor,
            outlineColor: selected ? bgColor : undefined,
            '--btn-shadow': `${bgColor}55`,
          } as React.CSSProperties}
        >
          {label}
        </div>

        {/* Edit hint */}
        {selected && (
          <div className="flex gap-2 items-center">
            <button
              onMouseDown={e => { e.preventDefault(); setEditOpen(true) }}
              className="px-2.5 py-[3px] rounded-[5px] border border-[#e0e0e0] bg-white text-[#555] text-[0.75rem] cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onMouseDown={e => { e.preventDefault(); handleDelete() }}
              className="px-2.5 py-[3px] rounded-[5px] border-none bg-red-500/10 text-[#ef4444] text-[0.75rem] cursor-pointer font-semibold hover:bg-red-500/20 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <ButtonModal
        open={editOpen}
        initialValues={{ label, url: element.url || '', bgColor, textColor }}
        onClose={() => setEditOpen(false)}
        onConfirm={(values) => { handleUpdate(values); setEditOpen(false) }}
      />

      {children}
    </PlateElement>
  )
}
